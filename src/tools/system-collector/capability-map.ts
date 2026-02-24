/**
 * Maps environment capabilities to system-collector skills.
 * Used by system-collector agent in Phase 2 to determine which skills to load.
 *
 * [PLACEHOLDER] Actual capability detection (getCollectionCapabilities) to be
 * implemented when Gateway/Client capability registration is ready.
 */

export const CAPABILITY_TO_SKILLS: Record<string, string[]> = {
  bash: ["basic-info"], // 有 bash 即加载 basic-info
  topo: ["topo-info"], // 有 topo capability 才加载 topo-info
}

/**
 * Returns skill names to load based on available tools and capabilities.
 * [PLACEHOLDER] tools and capabilities would come from osmind_get_clients
 * or session binding in Phase 1.
 */
export function getSkillsForCapabilities(
  tools: string[],
  capabilities: string[] = []
): string[] {
  const skills = new Set<string>()

  // basic-info: load when bash is available
  const hasBash = tools.some((t) => t === "bash" || t === "osmind_bash")
  if (hasBash) {
    CAPABILITY_TO_SKILLS.bash.forEach((s) => skills.add(s))
  }

  // topo-info: load only when topo capability exists
  if (capabilities.includes("topo")) {
    CAPABILITY_TO_SKILLS.topo.forEach((s) => skills.add(s))
  }

  return Array.from(skills)
}
