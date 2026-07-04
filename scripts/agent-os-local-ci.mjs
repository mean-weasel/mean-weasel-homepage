import { spawnSync } from "node:child_process";
import process from "node:process";

const repo = process.cwd();
const agentOsPrefix = process.env.AGENT_OS_PREFIX;
const agentOsBin = process.env.AGENT_OS_BIN || "agent-os";

function run(label, command, args, options = {}) {
  console.log(`\n==> ${label}`);
  const result = spawnSync(command, args, {
    cwd: repo,
    env: process.env,
    stdio: "inherit",
    shell: false,
    ...options,
  });

  if (result.error) {
    console.error(`\n${label} failed to start: ${result.error.message}`);
    if (!agentOsPrefix && command === agentOsBin) {
      console.error(
        "Set AGENT_OS_PREFIX=/path/to/agent-os to dogfood an unpacked Agent OS checkout, or set AGENT_OS_BIN to an installed agent-os executable."
      );
    }
    process.exit(1);
  }

  if (result.status !== 0) {
    console.error(`\n${label} failed with exit code ${result.status}`);
    process.exit(result.status ?? 1);
  }
}

function agentOsArgs(args) {
  if (agentOsPrefix) {
    return {
      command: "npm",
      args: ["exec", "--prefix", agentOsPrefix, "--", "agent-os", ...args],
    };
  }

  return {
    command: agentOsBin,
    args,
  };
}

function runAgentOs(label, args) {
  const invocation = agentOsArgs(args);
  run(label, invocation.command, invocation.args);
}

runAgentOs("agent-os doctor", ["doctor", "--repo", repo, "--json"]);
runAgentOs("agent-os validate-profile", ["validate-profile", "--repo", repo, "--json"]);
runAgentOs("agent-os profile-enrichment", [
  "profile-enrichment",
  "--repo",
  repo,
  "--format",
  "markdown",
]);
runAgentOs("agent-os preflight", ["preflight", "--repo", repo, "--json"]);
run("repo verify", "npm", ["run", "verify"]);

console.log("\nAgent OS local CI gate passed.");
