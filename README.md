# Sightline-xArm

Sightline-xArm is an independent HRI research atlas for **gaze-informed selective camera assistance** during screen-based xArm teleoperation. Tobii gaze is treated as limited inspection evidence, never as a robot command.

The project does not depend on VLA or BEAVER.

## Public site

<https://gohyunsu.github.io/xarm-tobii-sightline/>

Every push to `main` deploys the static site through GitHub Actions and GitHub Pages.

## Exact research question

> During screen-based xArm teleoperation of occluded pick-and-place tasks, can an auxiliary view triggered by the combination of geometric risk and missing inspection of a critical region reduce manipulation errors and visual-switching cost relative to manual switching, persistent multiview, and geometry-only assistance?

The decisive comparison is **C3 Sightline versus C2 geometry-only**. If C3 does not improve a prespecified physical or visual-cost outcome over C2, the project does not claim incremental value from gaze.

## Site structure

- `index.html` — exact proposition, concrete scenario, mechanism, gap, conditional contribution
- `foundations/` — teleoperation, xArm, camera geometry, eye tracking, gaze measures, AOIs, adaptive-interface risks
- `study/` — research questions, C0–C3 conditions, physical tasks, outcomes, power, analysis, validity
- `system/` — rig, software authority, risk/coverage, synchronization, Sightline Episodes, privacy, safety
- `methods/math.html` — TeX specification of gaze uncertainty, coverage, risk, trigger FSM, synchronization, and causal estimands
- `evidence/related-work.html` — claim-by-claim literature map with interactive filters
- `evidence/media.html` — official videos/images, prior-work figures, and eleven original diagrams with provenance
- `operations/roadmap.html` — readiness status, six go/no-go gates, 12-week path, equipment, roles, risks
- `docs/RESEARCH_CONTEXT.md` — persistent project context for later development

## Original visualizations

The repository includes eleven SVG diagrams covering the concrete decision window, visual-failure taxonomy, authority boundary, gaze construct ladder, experimental conditions, trial timing, physical rig, synchronized schema, analysis model, research gates, and literature gap.

They are proposal schematics, not collected results.

## Local preview

```bash
python3 -m http.server 8877 --bind 127.0.0.1
```

Then open <http://127.0.0.1:8877/>. Remotely embedded manufacturer and publication media require network access; all core logic remains available in local text and SVGs.

## Current status

This release is an **implementable research specification**, not a validated xArm/Tobii system and not a human-study result. Human gaze collection is gated by exact hardware inventory, analytical-use rights, end-to-end synchronization, independent robot safety controls, task validity, and institutional ethics determination.

## Licensing

- Code: [MIT](LICENSE)
- Original documentation and SVGs: [CC BY 4.0](CONTENT_LICENSE.md)
- External images and videos: owned by their original sources; see [media provenance](docs/MEDIA_PROVENANCE.md)
