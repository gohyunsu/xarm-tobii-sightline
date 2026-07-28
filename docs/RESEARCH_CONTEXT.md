# GazePick Research Context

## Stable project identity

**Short name:** GazePick
**Repository name:** `gazepick`
**Technical subtitle:** Uncertainty-aware gaze–language VLA pick-and-place on xArm

## Final application topic

The project addresses high-mix, low-volume manufacturing and logistics scenes in which multiple identical or similar parts coexist. Language alone may not uniquely identify the intended part. Explicit clicking, coordinate entry, or repeated confirmation interrupts the workflow and can still produce wrong-object picks.

The operator looks at the intended source object in the robot-camera view and states the destination. Tobii measurements are represented with uncertainty and fused with language and image evidence. A VLA or hybrid policy proposes a pick-and-place behavior; an independent xArm guard controls whether that behavior may execute.

Preferred matching university: Busan Shared University.
Technical categories: Artificial Intelligence and Intelligent Manufacturing Robots.

## Exact research question

> In cluttered scenes containing similar objects, does uncertainty-aware fusion of screen-based Tobii gaze and language reduce target-selection time and wrong-object picks on a physical xArm, compared with language-only and classical gaze-to-object interfaces—and does xArm-specific VLA adaptation add value beyond gaze prompting alone?

## Roles of the components

- Tobii provides probabilistic evidence about **which source object** the operator references.
- Language specifies **what action** to perform and **which destination** to use.
- Candidate grounding combines gaze mass over object masks with language/vision compatibility.
- The VLA produces an action or skill proposal. It does not authorize motion.
- The xArm execution guard checks confirmation, freshness, workspace, path, speed, robot state, watchdog, and faults.
- Physical controls, supervision, and E-stop remain independent of gaze/VLA.

## Scope

### Version 1

- screen-based gaze on one fixed robot-camera feed;
- three to six tabletop source candidates with controlled similarity;
- two visually distinct, known destination trays/bins;
- source selected primarily by gaze, destination explicitly stated by language;
- visible target proposal and explicit confirmation;
- constrained top-grasp, lift, transport, place, and retreat;
- physical xArm evaluation with synchronized episode logs.

### Deferred extensions

- egocentric-to-exocentric gaze mapping;
- dynamic intent changes during motion;
- part-level grasp reference;
- destination selected by a second gaze event;
- open-world objects and unconstrained dialogue;
- industrial safety certification or unattended operation.

## Research contribution boundary

Gaze-conditioned VLA is not new. Gaze2Act (May 2026) already presents cross-view gaze grounding, perception-level gaze prompting, action-level gaze conditioning, and real Unitree G1 evaluations across object-, part-, compositional-, and dynamic-intent tasks.

GazePick must therefore earn a narrower contribution:

1. calibrated screen-based Tobii-to-camera mapping with explicit measurement, calibration, and render-transform uncertainty;
2. candidate posterior calibration, top-two ambiguity, abstention, and explicit confirmation;
3. matched physical xArm comparisons across language-only, classical gaze snapping, frozen gaze-prompt VLA, xArm-adapted VLA, and click oracle;
4. held-out evidence across object similarity, spacing, layouts, object instances, users, and gaze quality;
5. a synchronized and auditable xArm episode schema.

If classical gaze plus guarded skills matches the VLA, the project must conclude that VLA was unnecessary for the defined task. If adaptation does not improve over the frozen prompt on locked held-out trials, the project must not claim a fine-tuning benefit.

## Implementation ladder

### L0 — grounded guarded-skill MVP

Candidate masks, gaze posterior, explicit confirmation, and deterministic xArm pick/place skills. This validates hardware, interaction, timing, logging, and safety.

### L1 — frozen VLA with visual gaze prompting

Render a target contour or uncertainty heatmap into the camera image and provide a structured instruction to a frozen VLA. Compare with L0.

### L2 — xArm-specific parameter-efficient adaptation

Collect balanced xArm episodes and adapt a compatible VLA through LoRA or OFT. Lock the data manifest, action convention, normalization, validation strategy, and checkpoint before evaluation.

### L3 — action-level gaze conditioning

Inject gaze-derived spatial features into the action head. This overlaps strongly with Gaze2Act and is a separate research stretch, not a hackathon dependency.

## Required comparisons

- B0: language only
- B1: classical gaze-to-object snap plus guarded skill
- B2: uncertainty-aware visual gaze prompt plus frozen VLA
- B3: same gaze representation plus xArm-adapted VLA
- B4: explicit click plus matched policy/skill as an interface oracle

Primary contrasts:

- B2 versus B0: gaze value under ambiguity;
- B2 versus B1: VLA value beyond classical grounding;
- B3 versus B2: adaptation value;
- B2/B3 versus B4: gaze reliability and interaction cost relative to clicking.

## Outcome hierarchy

Primary:

- wrong-object pick rate;
- time from interaction start to accepted referent.

Secondary:

- pre-motion referent accuracy;
- coverage and selective risk;
- pick, transport, placement, and end-to-end success;
- total completion time;
- clarification, confirmation, and click-fallback counts;
- Brier score, negative log likelihood, and calibration;
- workload/preference when an approved human study is conducted.

## Dataset principles

- Store complete attempted episodes, including abstentions and failures.
- Preserve raw gaze, mapped gaze, calibration, display/render geometry, camera frames, audio/transcript, candidates, posterior, robot state, proposed/executed actions, UI events, guard decisions, outcomes, and quality.
- Group entire episodes, scenes, object instances, and users across train/validation/test according to the generalization claim.
- Never randomly split nearby frames from one trajectory.
- Keep raw human data and model checkpoints out of the public Git repository.

## Team split

The core team owns Tobii acquisition/calibration, gaze–language grounding, VLA adaptation, xArm control, synchronized data, and quantitative evaluation.

The matched team contributes regional manufacturing/logistics requirements, representative objects and work scenarios, UI/data visualization, and safety/fixture design. Both teams jointly construct demonstration data and compare language-only, gaze, and fine-tuned conditions.

## Current status

The repository is an implementation-ready specification. It is not yet a validated physical system, completed dataset, human-subject study, or certified safety solution.

## Immediate gates

1. confirm exact Tobii/xArm/GPU models, SDK, license, and safety/ethics route;
2. freeze the V1 workcell, objects, language grammar, and confirmation protocol;
3. validate screen-to-camera mapping on independent markers;
4. complete clicked-target guarded xArm skills and fault tests;
5. close a gaze-snap end-to-end loop before VLA integration;
6. reproduce frozen VLA inference and benchmark compute/latency;
7. collect balanced, replayable episodes only after the schema passes.
