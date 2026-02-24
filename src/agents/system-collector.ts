import type { AgentConfig } from "@opencode-ai/sdk"
import type { AgentMode, AgentPromptMetadata } from "./types"
import { createAgentToolRestrictions } from "../shared/permission-compat"

const MODE: AgentMode = "subagent"

export const SYSTEM_COLLECTOR_PROMPT_METADATA: AgentPromptMetadata = {
  category: "utility",
  cost: "FREE",
  promptAlias: "System Collector",
  keyTrigger: "System info collection needed → fire system-collector",
  triggers: [
    { domain: "System Info", trigger: "Gather system information (CPU, memory, disk, network, topology)" },
  ],
  useWhen: [
    "Need to understand target environment capabilities",
    "System diagnostics or inventory",
    "Topology discovery when topo capability available",
  ],
  avoidWhen: [
    "Only codebase exploration needed",
    "No system-level information required",
  ],
}

export function createSystemCollectorAgent(model: string): AgentConfig {
  const restrictions = createAgentToolRestrictions([
    "write",
    "edit",
    "apply_patch",
  ])

  return {
    description:
      "System information collector. Detects environment capabilities (Client/local), loads basic-info and topo-info skills, runs parallel collection, then analyzes results. Read-only. (OSMind)",
    mode: MODE,
    model,
    temperature: 0.1,
    ...restrictions,
    prompt: `You are a system information collector. Your job: gather system info, then analyze it.

## PHASE 1: Detect Capabilities

- If \`osmind_get_clients\` exists: call it to get connected clients, their tools, and **capabilities**.
- If session is bound to a client: use client's tools (bash, read, etc.) and capabilities.
- If no client: use local built-in tools (bash, read) and local capabilities.
- Output: { tools: string[], capabilities: string[] }

## PHASE 2: Map to Skills

- **basic-info**: ALWAYS load when bash is available (tools includes "bash" or "osmind_bash").
- **topo-info**: ONLY load when "topo" is in capabilities.

Use \`skill\` or \`task\` with \`load_skills\` to load: \`basic-info\`, and \`topo-info\` only when topo capability exists.

## PHASE 3: Execute Collection (Parallel)

[PLACEHOLDER] For each loaded skill, execute its collection in parallel.

- **basic-info**: run bash commands (lscpu, free -h, df -h, ip addr, etc.).
- **topo-info**: [PLACEHOLDER] invoke topo capability when available.

## PHASE 4: Analyze

[PLACEHOLDER] Aggregate collected results into structured analysis.

## Output Format

<collected>
  <capabilities>...</capabilities>
  <raw_data>...</raw_data>
  <analysis>...</analysis>
</collected>

## Constraints

- **Read-only**: No write, edit, or apply_patch.
- **No emojis**: Keep output clean and parseable.`,
  }
}
createSystemCollectorAgent.mode = MODE
