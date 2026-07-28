# GazePick

GazePick is a research and implementation atlas for an **uncertainty-aware, gaze–language-conditioned VLA pick-and-place system on xArm**.

The operator looks at a target object in the robot-camera view and names the destination. Tobii gaze provides a probabilistic referent cue; language specifies the task and destination; a vision-language-action policy proposes the behavior; an independently guarded xArm layer validates and executes it. Ambiguous intent must lead to abstention or explicit confirmation, not a guess.

## Public site

<https://gohyunsu.github.io/gazepick-xarm/>

Every push to `main` deploys the static site through GitHub Actions and GitHub Pages.

## Exact research question

> In cluttered scenes containing similar objects, does uncertainty-aware fusion of screen-based Tobii gaze and language reduce target-selection time and wrong-object picks on a physical xArm, compared with language-only and classical gaze-to-object interfaces—and does xArm-specific VLA adaptation add value beyond gaze prompting alone?

## What each component means

- **Tobii:** measures where the operator is likely looking on the displayed robot-camera image. It narrows the referent; it never directly commands motion.
- **Language:** states the manipulation goal and destination, such as “put it in the blue bin.”
- **Grounding:** maps a noisy gaze distribution and language evidence to probabilities over candidate source objects.
- **VLA:** converts the visual scene, instruction, and gaze representation into an action proposal.
- **Guarded xArm layer:** checks workspace, speed, gripper, confidence, confirmation, and fault state before execution.

## Site map

- `index.html` — research brief, scenario, question, contribution, and success criteria
- `foundations/` — beginner-friendly concepts: pick-and-place, gaze measurement, referring expressions, VLA, uncertainty, and safety
- `interaction/` — one complete human–robot episode, interface states, confirmation, and failure recovery
- `system/` — hardware/software architecture, coordinate transforms, object grounding, xArm execution, timing, and safety
- `methods/data.html` — episode schema, demonstration collection, VLA integration ladder, LoRA/OFT plan, and rigorous mathematical specification
- `study/` — baselines, factors, splits, metrics, hypotheses, analysis, and refutation rules
- `evidence/related-work.html` — searchable primary-source evidence map and explicit novelty boundary
- `operations/roadmap.html` — July–November execution plan, workstreams, decision log, study curriculum, risks, and definition of done

## Research position

Gaze-conditioned VLA control is not itself novel: Gaze2Act demonstrated object-, part-, and dynamic-intent conditioning on a real Unitree G1 in 2026. GazePick therefore tests a narrower, falsifiable contribution:

1. calibrated **screen-to-camera gaze uncertainty** for an xArm workcell;
2. **probabilistic grounding with abstention and confirmation** under similar-object ambiguity;
3. a physical comparison of language-only, classical gaze snapping, gaze prompting, and xArm-adapted VLA conditions;
4. an auditable xArm episode dataset and evidence about when lightweight adaptation is—or is not—worthwhile.

## Local preview

```bash
python3 -m http.server 8877 --bind 127.0.0.1
```

Open <http://127.0.0.1:8877/>. External publication and manufacturer media require network access; every core explanation remains available as text and original SVG diagrams.

## Status

This repository is an implementation-ready research specification, not a completed experiment or certified industrial safety system. Claims are conditional on physical xArm evaluation.

## Licensing

- Code: [MIT](LICENSE)
- Original documentation and diagrams: [CC BY 4.0](CONTENT_LICENSE.md)
- External media: retained by original owners and linked with provenance in `docs/MEDIA_PROVENANCE.md`
