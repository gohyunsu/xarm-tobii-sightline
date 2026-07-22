# Sightline-xArm research context

Last updated: 23 July 2026
Document role: the canonical context that future design, implementation, and discussion should consult.

## 1. Project identity

Sightline-xArm is an independent human–robot interaction study. It does not depend on BEAVER, VLA training, or natural-language robot control. The intended platform combines an xArm manipulator, a screen-based Tobii eye tracker, multiple fixed cameras, an operator monitor, an explicit motion controller, and independent physical safety controls.

The project must not be introduced as “controlling xArm with Tobii.” That phrase collapses the work into a crowded gaze-to-command or target-selection literature and overinterprets where a person looks as intent or approval.

The precise research question is:

> During screen-based xArm teleoperation under self-occlusion and depth ambiguity, can a non-command interface that combines geometric risk with recent inspection evidence for task-critical screen regions present only the needed auxiliary view, reducing manipulation errors and visual-switching cost relative to manual switching, always-on multiview, and geometry-only adaptation?

The operator moves xArm with an explicit controller. Tobii gaze neither generates robot commands nor selects a target. Its only proposed role is to provide limited, uncertainty-aware evidence that task-relevant screen regions were recently sampled. The system may use that measurement, together with geometric risk, to change the camera layout.

## 2. Concrete operating scene

The operator cannot see the workbench directly and approaches a block while watching an overhead camera. During the final approximately three centimeters, the gripper occludes the contact surface and the overhead view makes the vertical gap ambiguous. A side or wrist view could resolve the ambiguity, but showing all views continuously can shrink useful imagery and increase visual search.

When geometric risk exceeds a prespecified threshold and recent valid gaze does not overlap the phase-critical contact AOI sufficiently, the interface enlarges a side or wrist stream in a stable picture-in-picture location. The operator then explicitly continues, corrects, or stops with the controller.

The intervention output is a camera/UI layout. It is not robot motion, a grasp command, target selection, consent, or safety approval.

## 3. Why the question matters

In teleoperation, cameras act as mediated sensory access. A single view is vulnerable to robot self-occlusion, ambiguous depth, poor contact visibility, and camera–control frame mismatch. Multiple simultaneous views increase available information but can also reduce each panel’s size, fragment spatial attention, increase transitions, and impose search cost.

Geometry-based adaptive-view methods already optimize visibility and occlusion. They do not usually model whether the operator has already inspected the evidence needed for the present task phase. Eye-tracking studies, conversely, often model gaze behavior, target intention, or direct control without causally comparing an online view-assistance policy against a geometry-only policy.

Sightline therefore asks two distinct questions:

1. Is the current robot–scene geometry visually risky?
2. Is there recent, valid evidence that the operator inspected the screen region needed to judge that risk?

The research value lies in isolating the incremental contribution of the second question on a physical xArm, not in combining two devices.

## 4. Core constructs and interpretation boundary

- **Geometric risk:** a UI-trigger variable combining TCP/target distance, time-to-contact, main-view occlusion, task phase, and possibly pose uncertainty. It is not a safety certificate.
- **Area of interest (AOI):** a versioned screen polygon for the target, gripper, contact edge, destination, or other evidence required by the current task phase.
- **Inspection coverage:** uncertainty-aware overlap of valid gaze with required AOIs in a recent time window.
- **Inspection deficit:** a measurement state in which coverage is below a preregistered threshold while data quality remains adequate.
- **Assist:** enlargement or emphasis of an already available side/wrist stream. It is not gaze-servo camera motion.
- **Sightline Episode:** a synchronized record linking gaze, rendered UI, camera identity, controller input, robot telemetry, AOIs, scene truth, events, and outcomes.

The following equalities are prohibited:

- gaze = attention
- fixation = comprehension
- AOI coverage = correct judgment
- missing gaze = negligence
- gaze location = intent
- inspection deficit = unsafe state
- model risk = certified safety

## 5. Experimental conditions and decisive comparison

The proposed confirmatory study uses four within-participant interface conditions.

| Condition | Display policy | Scientific role |
|---|---|---|
| C0 Manual switch | Operator selects a view with an explicit button | Measures the cost and omissions of manual control |
| C1 Always multi | Overhead, side, and wrist streams are continuously visible | Maximizes availability while exposing visual-allocation cost |
| C2 Geometry-only | Geometry, occlusion, and task phase trigger the auxiliary view | Strong adaptive baseline without gaze |
| C3 Sightline | C2 plus a task-critical inspection deficit | Tests the incremental value of gaze-derived evidence |

The primary contrast is C3−C2. C0 and C1 are necessary context, but they do not isolate the Tobii contribution.

If C3 does not improve prespecified manipulation or false-continuation outcomes over C2 without unacceptable workload or disruption, the project must not claim successful gaze-aware assistance. Benefits of C2 over C1 would support geometry-adaptive multiview design, not a gaze contribution.

## 6. Task battery

1. **Pick and place:** the gripper or arm occludes the target during final approach. Outcomes include wrong grasp, drop, bin-wall contact, and placement deviation.
2. **Stacking:** overhead imagery makes vertical gap and edge alignment ambiguous. Outcomes include collision, tilt, unstable placement, and offset.
3. **Low-force slot insertion:** side/wrist evidence is needed for contact-surface alignment. Outcomes include rim contact, correction count, and failed insertion.

Press-fit, high-force insertion, sharp tools, fragile objects, and unconstrained contact are out of scope.

Occlusion level, target tolerance, distractor count, and scene layout are manipulated. Camera encoding, control mapping, frame alignment, display latency, and controller gain remain matched across interface conditions.

## 7. Hypotheses and refutation

- **H1:** Always-on multiview may improve success over manual switching but increase gaze/view transitions and workload.
- **H2:** Geometry-only and Sightline conditions retain the useful task information of always-on multiview while reducing display transitions.
- **H3:** Sightline reduces false continuation and contact errors relative to geometry-only specifically when required evidence was not recently inspected.
- **H4:** Benefits are larger for novices and high-occlusion trials, while experts or clear-view trials may show no benefit or disruption.

Refutation criteria are fixed before the confirmatory study. A null or harmful C3−C2 result becomes a boundary-condition result, not a reason to redefine the primary outcome. The dataset, synchronization method, quality audit, and negative comparison can remain valid contributions.

## 8. Candidate contributions

Only validated findings may be claimed:

1. A non-command selective-view trigger combining geometric risk and task-critical inspection deficit.
2. A physical xArm comparison separating manual, always-on multiview, geometry-only adaptation, and gaze-plus-geometry adaptation.
3. A synchronized Sightline Episodes schema and quality-reporting protocol spanning gaze, UI, camera, controller, robot, scene truth, and faults.
4. Boundary conditions showing when assistance helps, is neutral, or disrupts performance as a function of occlusion, expertise, task phase, and gaze quality.

## 9. System and authority boundaries

The recommended physical layout uses an xArm and gripper, fixed overhead and side cameras, an optional wrist RGB-D camera, a separate operator monitor with Tobii, an explicit controller, a physical barrier, and an E-stop. The participant remains outside the cell and has no direct view of the task.

Software responsibilities remain separate:

- **Tobii capture client:** exports read-only gaze samples, validity, calibration, and timing metadata. It has no robot credentials.
- **ROS 2 backend:** manages robot state, cameras, controller input, velocity/workspace guards, and skill execution. It does not subscribe to gaze.
- **Experiment orchestrator:** manages task phase, AOI version, risk, coverage, condition, cue eligibility, and event time.
- **Operator UI:** renders controlled camera streams and records cues, manual switches, overrides, and visibility. It hides the gaze cursor during trials.

On gaze loss, C3 degrades to C2. On synchronization failure, online gaze triggering stops and the session enters shadow-logging mode. A sensor failure must never increase automation.

## 10. Data and analysis

Minimum tables or streams are episodes, gaze, robot_state, control_input, ui_events, camera_frames, aoi_frames, scene_truth, outcomes, and quality. Original device timestamps and common-clock transforms are both retained. Trial start, assist on/off, manual switch, grasp, release, contact, correction, and fault events share stable identifiers.

Primary outcomes include task success, contact, drop, placement deviation, false continuation, and completion time. Visual-behavior outcomes include critical-AOI coverage, time to first evidence view, and gaze/view transitions. Automation costs include cue count, camera churn, ignored cue, override, and false assist. NASA-TLX, surprise, and perceived control are secondary. Pupil measures remain exploratory because luminance, fatigue, and individual physiology confound them.

Mixed-effects models include participant and scene/task variation. Sample size is not chosen arbitrarily: a 6–8 participant technical pilot estimates variance and tests task validity, followed by simulation-based power analysis for the minimum effect of interest in H3.

## 11. Mandatory gates

1. Audit the exact xArm model, gripper, firmware, control mode, Tobii SKU, supported OS, cameras, and controller.
2. Confirm the legal route for storing, analyzing, and transmitting gaze data through Tobii Analytical Use/SDLA or Pro SDK terms.
3. Validate low-speed limits, workspace bounds, barrier, dead-man behavior, E-stop, and recovery procedures.
4. Demonstrate clock residuals below the preregistered threshold during sustained recording.
5. Establish non-ceiling/non-floor task difficulty under high and low occlusion.
6. Obtain IRB or institutional ethics determination, consent language, retention schedule, deletion process, and public-release boundary.

No human online-adaptation study begins before all applicable gates pass.

## 12. Decisions inherited from related work

- Multi-camera ergonomics means simple multiview display is not novel; measure both performance and visual/cognitive cost.
- Geometry-based adaptive viewpoint research makes C2 mandatory.
- Gaze and intention research requires uncertainty-aware AOIs and forbids treating gaze as a mental-state label.
- Camera frame-misalignment research requires matched view/control mapping across conditions.
- Gaze control and shared-autonomy research make target selection a crowded contribution; Sightline stays with inspection-aware presentation.

The detailed literature ledger and claim-specific consequences live in [RELATED_WORK.md](RELATED_WORK.md) and the site’s Evidence Map.

## 13. Explicit exclusions

- VLA training, foundation-model fine-tuning, or natural-language robot command
- Integration with BEAVER or repackaging previous BEAVER results
- Gaze-based target selection, robot steering, or camera servo control
- Classification of operator intent, attention, understanding, or approval
- Human–robot physical collaboration inside the same cell
- Medical, industrial-safety, or certification claims
- Performance or safety claims before empirical results exist

## 14. Next decision sequence

The first real task is an inventory, license, and safety audit—not model development. The recommended order is:

1. inventory and license gate;
2. recorder and synchronization audit;
3. fixed-layout C0/C1 prototype;
4. geometry-only C2 baseline;
5. C3 shadow mode with no online effect;
6. technical pilot and task refinement;
7. preregistration and confirmatory study.

Operational progress and exit criteria are maintained on the site Roadmap.
