# Seeing changes live

To see UI changes, always use the `agent-desktop` CLI (installed globally) instead of taking screenshots.
- First time in a session: run `agent-desktop skills get desktop` and `agent-desktop skills get platform` to load the guide.
- Loop: `agent-desktop snapshot --app "<app>" -i --compact` → act on `@ref` → snapshot again to verify.
- In PowerShell quote refs: `'@s8f3k2p9:e1'`. Use `--headed` only when physical input is truly needed.
- Use `agent-desktop screenshot` only when the visual look itself (colors, layout) must be checked.
