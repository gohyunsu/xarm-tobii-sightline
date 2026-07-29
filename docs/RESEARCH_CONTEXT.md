# GazePick Research Context

## Stable project identity

**Short name:** GazePick
**Repository name:** `gazepick`
**Technical subtitle:** Selective gaze–language grounding for guarded robot manipulation

## Final application topic

The project is motivated by high-mix, low-volume manufacturing and logistics scenes in which multiple identical or similar parts coexist. Language alone may not uniquely identify the intended part. Explicit clicking, coordinate entry, or repeated confirmation may interrupt the workflow, while selecting the wrong referent can produce a mechanically correct action on the wrong object.

The operator looks at the intended source object in the robot-camera view and states the destination. Tobii measurements are represented with uncertainty and fused with language and image evidence. The system accepts, clarifies, or abstains before motion. A guarded deterministic skill is the mandatory action baseline; a frozen or adapted VLA is a conditional policy extension. An independent xArm guard controls whether any proposal may execute.

The manufacturing/logistics framing is a motivating scenario, not yet evidence about regional prevalence, throughput, or economic benefit. A matched-team or industry-partner interview and representative workcell observation must validate the actual objects, current interaction, error consequence, and acceptable timing.

Preferred matching university: Busan Shared University.
Technical categories: Artificial Intelligence and Intelligent Manufacturing Robots.

## Research questions

### Primary

> Under controlled visual ambiguity, can calibrated gaze–language fusion reduce wrong-referent activation at a useful decision coverage compared with language only and nearest-object gaze snapping?

### Secondary interaction question

> Compared with an explicit click, how much target-decision time or manual input does selective gaze save, and what clarification or confirmation cost does uncertainty add?

### Conditional policy question

> With the accepted referent held fixed, do frozen or xArm-adapted VLA policies improve held-out pick-and-place outcomes enough to justify their data, compute, latency, and complexity over a guarded deterministic skill?

## Roles of the components

- Tobii provides probabilistic evidence about **which source object** the operator references.
- Language specifies **what action** to perform and **which destination** to use.
- Candidate grounding combines gaze mass over object masks with language/vision compatibility.
- The guarded skill is the reference action policy.
- A VLA, if used, produces an action or skill proposal. It does not authorize motion.
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

## Research direction hierarchy

### A — core contribution

Selective multimodal referent grounding:

1. calibrated screen-to-camera gaze measurement and uncertainty;
2. candidate posterior from gaze, language, and optional vision evidence;
3. accept, clarify, abstain, and click-fallback behavior;
4. matched language-only, nearest-gaze, and explicit-click baselines;
5. risk–coverage, calibration, decision time, and wrong-referent activation evidence.

This study is valid without VLA fine-tuning.

### B — earned extension

Uncertainty-preserving visual policy interface:

- compare hard contour, soft heatmap, and candidate-posterior representations;
- keep accepted referent, policy backbone, training data, and scenes matched;
- enter only after the core selective-reference result is established.

### C — stretch extension

Low-data xArm adaptation value curve:

- compare frozen and LoRA/OFT-adapted policies at multiple demonstration budgets;
- report held-out success, latency, invalid output, intervention, and guard rejection;
- enter only after inference, data, embodiment-adapter, and compute gates pass.

## Research contribution boundary

Gaze-conditioned VLA is not new. Gaze2Act (May 2026) already presents cross-view gaze grounding, perception-level gaze prompting, action-level gaze conditioning, and real Unitree G1 evaluations across object-, part-, compositional-, and dynamic-intent tasks.

Point-VLA (December 2025) and VP-VLA (March 2026) further show that explicit visual prompts can resolve VLA referential ambiguity. GazeVLA (April 2026) uses gaze as a learned human-intention representation. GazePick must therefore earn a narrower contribution:

1. calibrated screen-based Tobii-to-camera mapping with explicit measurement, calibration, and render-transform uncertainty;
2. candidate posterior calibration, top-two ambiguity, abstention, and explicit confirmation;
3. a matched physical xArm referent-interface comparison using one guarded action skill;
4. held-out evidence across object similarity, spacing, layouts, object instances, users, and gaze quality;
5. a synchronized and auditable xArm episode schema.

The VLA comparison is a separate second stage. If nearest-gaze snapping matches selective fusion, the project must not claim uncertainty-aware fusion value. If a guarded skill matches the VLA, the project must conclude that VLA was unnecessary for the defined task. If adaptation does not improve over the frozen policy on locked held-out trials, the project must not claim a fine-tuning benefit.

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

### Stage A — referent interface; guarded skill fixed

- R0: language only;
- R1: nearest-object gaze snap;
- R2: calibrated selective gaze–language fusion;
- R3: explicit click.

Primary contrasts:

- R2 versus R0: gaze–language value beyond words;
- R2 versus R1: uncertainty-aware fusion value beyond classical gaze snapping;
- R2 versus R3: gaze reliability and interaction cost relative to clicking;
- selective R2 versus forced R2: abstention value.

### Stage B — action policy; accepted referent fixed

- P0: guarded deterministic pick/place skill;
- P1: frozen visually prompted VLA;
- P2: xArm-adapted VLA.

Conditional contrasts:

- P1 versus P0: frozen VLA value beyond a transparent skill;
- P2 versus P1: robot-specific adaptation value.

## Outcome hierarchy

Primary:

- wrong-referent activation risk at prespecified coverage;
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

The core team owns Tobii acquisition/calibration, gaze–language grounding, conditional VLA adaptation, xArm control, synchronized data, and quantitative evaluation.

The matched team contributes regional manufacturing/logistics requirements, representative objects and work scenarios, UI/data visualization, and safety/fixture design. Both teams jointly validate the application premise, construct episodes, evaluate R0–R3, and enter P0–P2 only if the policy-stage gates pass.

## Current status

The repository is an implementation-ready specification. It is not yet a validated physical system, completed dataset, human-subject study, or certified safety solution.

## Immediate gates

1. confirm exact Tobii/xArm/GPU models, SDK, license, and safety/ethics route;
2. freeze the V1 workcell, objects, language grammar, and confirmation protocol;
3. validate screen-to-camera mapping on independent markers;
4. validate the industrial premise with a partner interview and representative workcell/task;
5. complete clicked-target guarded xArm skills and fault tests;
6. close R0–R3 offline and a selective gaze-to-skill end-to-end loop;
7. lock and evaluate the Stage A protocol before VLA integration;
8. reproduce frozen VLA inference and benchmark compute/latency;
9. collect balanced, replayable adaptation episodes only after the schema and policy gates pass.
