# P02-T09 Mesh Independence — Error and Selection

## Conditions

- Structure: 2D axisymmetric Single-WF VCAT
- MeshScale: Coarse 2.0, Medium 1.0, Fine 0.5
- Drain bias: 0.05 V and 1.00 V
- Gate sweep: approximately 0 V to 1.00 V
- Common WF: 4.70 eV
- Common temperature: 300 K
- The same SDevice physics and balanced continuation code were used for all six nodes.

## Extraction method

- **Vth:** logarithmic interpolation at |Id| = 1E-7 A
- **SS:** regression over |Id| = 1E-12 to 1E-8 A
- **Ioff:** first exported point at Vg = 0.00035 V, treated as Vg ≈ 0 V
- **Ion:** Vg = 1.00 V
- **DIBL:** (Vth at Vd=0.05 V − Vth at Vd=1.00 V) / 0.95

## Fine-referenced results

- **Medium maximum Ion error:** 0.842%
- **Medium DIBL relative error:** 1.285%
- **Coarse maximum Ion error:** 1.896%
- **Coarse DIBL relative error:** 3.466%
- Both Medium and Coarse satisfy the current project DC acceptance limits relative to Fine.

## Selection

**Recommended baseline: Medium, MeshScale=1.0.**

Medium is closer to Fine than Coarse in the most discriminating reported quantities, including Ion at Vd=1.00 V and DIBL, while avoiding the substantially higher point count and runtime burden of the Fine mesh. Coarse also passes the present DC thresholds and may be suitable for screening, but this task does not establish its accuracy for local electric-field peaks or other spatially sensitive quantities.

## Verification and limitations

- The six exported curves all reach Vg=1.00 V.
- Stage 1, 2, and 3 data were merged without current-value modification.
- The first exported voltage is 0.00035 V rather than exactly 0 V, so Ioff is labeled as Vg≈0 V.
- The mesh logs in this package were transcribed from the text pasted in the research chat; the original server log files were not directly uploaded.
- The recommendation above is based on the supplied DC Id–Vg results and project-specific acceptance criteria, not on an external standard.
