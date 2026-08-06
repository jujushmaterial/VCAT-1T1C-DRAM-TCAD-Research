# PROVENANCE

## User-provided evidence
1. Workbench parameter screenshot:
   - Lg = 0.028 µm
   - DMG_Gap = 0.001 µm
2. Generated SProcess code:
   - gateS mask = `-Lg/2` to `-DMG_Gap/2`
   - gateD mask = `+DMG_Gap/2` to `+Lg/2`
   - gateS = Titanium
   - gateD = Tungsten

## Derived values
The numerical gate boundaries and metal lengths were calculated directly from the
above applied parameters. No TCAD simulation was rerun while preparing this package.

## Important discrepancy
The SProcess comment recommends `DMG_Gap=0.003 µm`, but the Workbench screenshot
shows the actual applied value `0.001 µm`. The package uses the applied Workbench value.
