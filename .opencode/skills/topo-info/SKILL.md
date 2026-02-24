---
name: topo-info
description: Collect topology information (requires topo capability)
---

# topo-info — Topology Information Collection

**Capability dependency**: topo (Client or local must have `topo` capability)

**Activation**: ONLY when "topo" is in capabilities. Do not load if topo is not available.

## Collection (Placeholder)

[PLACEHOLDER] Topology discovery logic depends on topo capability implementation.

When topo capability is available:
- Invoke topo-specific collection (script, API, or tool)
- Gather network topology, service dependencies, or similar structural info
- Output format TBD when topo capability is implemented

## Notes

- This skill is a placeholder. Actual implementation awaits topo capability in Gateway/Client.
- See plan section "七、Client Capability 注册" for topo registration design.
