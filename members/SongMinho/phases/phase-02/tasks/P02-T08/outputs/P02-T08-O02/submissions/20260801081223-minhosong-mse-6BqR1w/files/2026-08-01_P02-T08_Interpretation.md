# P02-T08 GIDL and Electric-Field Interpretation

- Date: 2026-08-01
- Dataset: Actual Sentaurus Workbench / SVisual output
- Simulation node: `n33_des`

## GIDL sweep conditions

- Drain bias: 1.0 V
- Gate sweep stop: -0.4 V
- Gate work function: 4.70 eV
- Temperature: 300 K

## GIDL current trend

The raw dataset contains 546 points.

- Current near Vg = -4e-06 V: 3.1015371000E-15 A
- Current at Vg = -0.4 V: 2.9205558000E-14 A
- Increase from near 0 V to -0.4 V: approximately 9.4165 times

The linear and logarithmic plots are consistent with the raw CSV. As the gate
voltage becomes more negative, the storage-terminal current increases, which is
the expected sweep-direction trend for the configured GIDL test.

## Electric-field and BTBT localization

The full-device electric-field magnitude plot shows the strongest field near the
upper storage-node/channel junction adjacent to the gate-oxide edge. The hotspot
zoom and probe captures confirm that the localized field maximum occurs inside
the gate-oxide region near this junction.

The ElectricField-Y component reaches a larger positive magnitude than the
ElectricField-X component around the hotspot, indicating that the Y-direction
component is the dominant contribution to the local field magnitude in this view.

The Band2BandGeneration contour is concentrated around the same upper
junction/oxide-edge area, spatially supporting the interpretation that the GIDL
current is associated with the high-field junction region.

## Recorded maximum field

- Field variable: `Abs(ElectricField-V)`
- Emax: `6.214192111197E+06 V/cm`
- X: `0.0200006359906 um`
- Y: `0.00612816299077 um`
- Region: `R.GateOxide`
- Location: upper SN-channel junction near gate-oxide edge

The contour legend displays an upper scale value of approximately `6.227E+06
V/cm`, while the probe reports the field at the selected mesh location. This
small difference is consistent with a color-scale maximum versus a specific
probe-coordinate value and does not indicate conflicting results.

## Image handling

All PNG files in this package are the actual uploaded Sentaurus/SVisual captures.
They were not cropped, resized, corrected, enhanced, regenerated, annotated, or
AI-generated. Only filenames and folder locations were changed.
