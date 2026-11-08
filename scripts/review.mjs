// Headless review of a campaign's emails. Usage: node scripts/review.mjs <campaign folder>
// Runs `claude -p` with a JSON schema, saves the result to review/findings.json,
// prints a one-line summary and exits 1 if any finding is high severity.
import { spawnSync, execFileSync } from "node:child_process";
import { existsSync, readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { dirname, join } from "node:path";

const folder = process.argv[2];
if (!folder) {
  console.error("Usage: node scripts/review.mjs <campaign folder>");
  process.exit(2);
}

const schemaText = JSON.stringify(JSON.parse(readFileSync("review/findings.schema.json", "utf8")));

// On Windows `claude` is a .cmd wrapper that Node cannot spawn directly, so find the real binary.
function claudeBinary() {
  if (process.env.CLAUDE_BIN) return process.env.CLAUDE_BIN;
  if (process.platform !== "win32") return "claude";
  try {
    const wrapper = execFileSync("where", ["claude.cmd"], { encoding: "utf8" }).split(/\r?\n/)[0].trim();
    const exe = join(dirname(wrapper), "node_modules", "@anthropic-ai", "claude-code", "bin", "claude.exe");
    if (existsSync(exe)) return exe;
  } catch {}
  return "claude";
}

let prompt = `Review every email in ${folder} against brand/voice.md and .claude/rules/emails.md. Report only real problems.`;

// A second review of the same folder should not repeat itself: feed it the earlier findings.
if (existsSync("review/findings.json")) {
  try {
    const earlier = JSON.parse(readFileSync("review/findings.json", "utf8"));
    if (earlier.folder === folder && Array.isArray(earlier.findings) && earlier.findings.length > 0) {
      prompt += `

These are findings from the last review. Report only problems that are new or still not fixed. Don't repeat ones that were fixed.
${JSON.stringify(earlier.findings, null, 2)}`;
    }
  } catch {}
}

const run = spawnSync(
  claudeBinary(),
  ["-p", prompt, "--output-format", "json", "--json-schema", schemaText, "--allowedTools", "Read,Glob,Grep"],
  { encoding: "utf8", maxBuffer: 50 * 1024 * 1024 },
);

if (run.error || run.status !== 0) {
  console.error(`review failed: ${run.error?.message ?? run.stderr?.trim() ?? `exit ${run.status}`}`);
  process.exit(2);
}

let output;
try {
  output = JSON.parse(run.stdout);
} catch {
  console.error("review failed: claude did not return JSON.");
  process.exit(2);
}

// The output may be one JSON object, or a list whose last item is the result.
const result = Array.isArray(output) ? output.findLast((item) => item.type === "result") ?? output.at(-1) : output;
const structured = result?.structured_output;
if (!structured || !Array.isArray(structured.findings)) {
  console.error("review failed: no structured_output with a findings list in the result.");
  process.exit(2);
}

mkdirSync("review", { recursive: true });
writeFileSync("review/findings.json", JSON.stringify({ folder, ...structured }, null, 2) + "\n");

const counts = { high: 0, medium: 0, low: 0 };
for (const finding of structured.findings) counts[finding.severity] += 1;
console.log(`${folder}: ${structured.findings.length} findings (${counts.high} high, ${counts.medium} medium, ${counts.low} low)`);

process.exit(counts.high > 0 ? 1 : 0);
