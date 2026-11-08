// PreToolUse hook for the resend MCP server. Reads the tool call as JSON on stdin.
// Exit 2 blocks the call (the reason on stderr goes back to Claude); exit 0 allows it.

const SEND_TOOLS = ["send-email", "send-batch-emails"];
const ALWAYS_BLOCKED = ["send-broadcast", "create-automation", "send-inbox-draft", "send-new-inbox-email"];

const block = (reason) => {
  console.error(`send-guard: blocked. ${reason}`);
  process.exit(2);
};

let raw = "";
for await (const chunk of process.stdin) raw += chunk;

let call;
try {
  call = JSON.parse(raw);
} catch {
  block("could not read the tool call, so nothing is sent.");
}

const toolName = String(call.tool_name ?? "").replace(/^mcp__resend__/, "");
const input = call.tool_input ?? {};
const myEmail = (process.env.MY_EMAIL ?? "").trim().toLowerCase();

// "Name <a@b.com>" or "a@b.com" -> "a@b.com"
const bare = (addr) => {
  const match = String(addr).match(/<([^>]+)>/);
  return (match ? match[1] : String(addr)).trim().toLowerCase();
};

const allowed = (addr) => addr.endsWith("@resend.dev") || (myEmail !== "" && addr === myEmail);

const addressesOf = (message) =>
  ["to", "cc", "bcc"].flatMap((field) => {
    const value = message?.[field];
    if (value == null) return [];
    return (Array.isArray(value) ? value : [value]).map(bare);
  });

if (ALWAYS_BLOCKED.includes(toolName)) {
  block(`${toolName} can reach whole lists of people, so it is never allowed here.`);
}

if (SEND_TOOLS.includes(toolName)) {
  // send-batch-emails may carry a list of messages (at the top level or under "emails")
  const messages =
    toolName === "send-batch-emails"
      ? Array.isArray(input) ? input : (input.emails ?? input.messages ?? [input])
      : [input];

  const addresses = messages.flatMap(addressesOf);
  if (addresses.length === 0) block("no recipient address found, so the send is not allowed.");

  const bad = addresses.find((addr) => !allowed(addr));
  if (bad) {
    block(`${bad} is not allowed. Only addresses ending in @resend.dev, or my own email (MY_EMAIL), may receive mail.`);
  }
}

process.exit(0);
