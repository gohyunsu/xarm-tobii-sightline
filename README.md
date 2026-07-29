# GazePick

GazePick is a research and implementation atlas for **selective gaze–language reference grounding in guarded physical robot manipulation**.

The operator looks at a target object in the robot-camera view and names the destination. Tobii gaze provides a probabilistic referent cue; language specifies the task and destination; the system accepts, clarifies, or abstains before an independently guarded xArm layer executes. A VLA is a conditional action-policy extension, not a prerequisite for the core reference study.

## Public site

<https://gohyunsu.github.io/gazepick/>

Every push to `main` deploys the static site through GitHub Actions and GitHub Pages.

## Research questions

> **Primary:** Under controlled visual ambiguity, can calibrated gaze–language fusion reduce wrong-referent activation at a useful decision coverage compared with language only and nearest-object gaze snapping?

> **Conditional policy question:** With the accepted referent held fixed, do frozen or xArm-adapted VLA policies improve held-out pick-and-place outcomes enough to justify their cost and complexity over a guarded deterministic skill?

## What each component means

- **Tobii:** measures where the operator is likely looking on the displayed robot-camera image. It narrows the referent; it never directly commands motion.
- **Language:** states the manipulation goal and destination, such as “put it in the blue bin.”
- **Grounding:** maps a noisy gaze distribution and language evidence to probabilities over candidate source objects.
- **Action policy:** begins with a deterministic guarded pick/place skill; frozen and adapted VLAs are separately evaluated alternatives.
- **Guarded xArm layer:** checks workspace, speed, gripper, confidence, confirmation, and fault state before execution.

## Site map

- `index.html` — research brief, scenario, question, contribution, and success criteria
- `direction/` — reviewed thesis, candidate ideas, hypotheses, staged experiments, scope, and stop rules
- `foundations/` — beginner-friendly concepts: pick-and-place, gaze measurement, referring expressions, VLA, uncertainty, and safety
- `interaction/` — one complete human–robot episode, interface states, confirmation, and failure recovery
- `system/` — hardware/software architecture, coordinate transforms, object grounding, xArm execution, timing, and safety
- `methods/data.html` — episode schema, demonstration collection, VLA integration ladder, LoRA/OFT plan, and rigorous mathematical specification
- `study/` — two-stage interface/policy comparisons, factors, metrics, analysis, and refutation rules
- `evidence/related-work.html` — searchable primary-source evidence map and explicit novelty boundary
- `operations/roadmap.html` — July–November execution plan, workstreams, decision log, study curriculum, risks, and definition of done

## Research position

Gaze-conditioned VLA control is not itself novel: Gaze2Act demonstrated object-, part-, and dynamic-intent conditioning on a real Unitree G1 in 2026. GazePick therefore tests a narrower, falsifiable contribution:

1. calibrated **screen-to-camera gaze uncertainty** for an xArm workcell;
2. **probabilistic grounding with abstention and confirmation** under similar-object ambiguity;
3. a physical referent-interface comparison that holds the guarded action skill fixed;
4. an auditable xArm episode dataset and a separate policy comparison that tests whether lightweight VLA adaptation is—or is not—worthwhile.

The manufacturing/logistics scenario is a motivation to validate with the matched team or an industry partner; it is not yet evidence about regional prevalence, throughput, or economic benefit.

## Local preview

```bash
python3 -m http.server 8877 --bind 127.0.0.1
```

Open <http://127.0.0.1:8877/>. External publication and manufacturer media require network access; every core explanation remains available as text and original SVG diagrams.

Validate page language, navigation, local links, fragments, IDs, and image alternative text:

```bash
python3 scripts/validate_site.py
```

## Status

This repository is an implementation-ready research specification, not a completed experiment or certified industrial safety system. Claims are conditional on physical xArm evaluation.

## Licensing

- Code: [MIT](LICENSE)
- Original documentation and diagrams: [CC BY 4.0](CONTENT_LICENSE.md)
- External media: retained by original owners and linked with provenance in `docs/MEDIA_PROVENANCE.md`
