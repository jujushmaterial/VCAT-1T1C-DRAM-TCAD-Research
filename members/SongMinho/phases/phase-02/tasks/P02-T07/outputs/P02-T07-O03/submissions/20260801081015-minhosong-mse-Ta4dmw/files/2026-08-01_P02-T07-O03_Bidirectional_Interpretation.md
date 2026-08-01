# P02-T07 Bidirectional Id–Vg Interpretation

- Date: 2026-08-01
- Evidence type: Sentaurus Workbench / SVisual actual output
- Raw dataset rows: 539

## Conditions visible in the SWB capture

- Forward node: n26
- Reverse node: n28
- Drain bias: 1.0 V
- Work function: 4.70 eV
- Temperature: 300 K
- Gate sweep stop: 1.0 V

## Result

The forward trace (`storage TotalCurrent(ForwardIdVg_n26_des)`) and reverse trace
(`bitline TotalCurrent(ReverseIdVg_n28_des)`) nearly overlap in both the linear
and logarithmic plots.

- Maximum row-wise absolute current difference: 6.9161000000E-09 A
- Maximum relative difference for current above 1E-12 A: 0.148325 %
- Forward current at the final point: 8.4764497000E-06 A
- Reverse current at the final point: 8.4701465000E-06 A
- Relative difference at the final point: 0.074361 %

Within this simulation split, no meaningful forward/reverse current asymmetry is
observed over the plotted gate-voltage range. The traces remain distinguishable
through their legend labels and CSV column names even though they visually overlap.

## Note

The SVisual screenshots retain the original generic axis labels (`X`, `Y`).
No labels, annotations, pixels, crop, contrast, or resolution were modified.
