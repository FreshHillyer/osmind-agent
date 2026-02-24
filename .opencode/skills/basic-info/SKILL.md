---
name: basic-info
description: Collect basic system information via bash (CPU, memory, disk, network)
---

# basic-info — System Information Collection

**Capability dependency**: bash (available on Client or local)

**Activation**: Always when bash is available.

## Collection Commands (Placeholder)

Run these bash commands to gather system information. Use `bash` or `osmind_bash` tool.

```bash
# CPU info
lscpu

# Memory
free -h

# Disk usage
df -h

# Network interfaces
ip addr
# or: ifconfig (if ip not available)

# Hostname
hostname

# OS release (Linux)
cat /etc/os-release 2>/dev/null || uname -a
```

## Output

Aggregate command outputs into structured format for Phase 4 analysis.
