# Sightline-xArm related-work ledger

Last checked: 23 July 2026

## Core judgment

The gap is not the hardware combination “xArm + Tobii.” Gaze-based robot control, passive gaze analysis, geometry-based adaptive viewpoints, and multi-camera human-factors studies already exist. Sightline’s candidate contribution is a non-command closed loop that presents an auxiliary view only when geometry is risky and task-critical screen inspection evidence is deficient, evaluated directly against a matched geometry-only policy on a physical xArm.

## Literature families and design consequences

| Family | Representative work | Established result or capability | Consequence for Sightline |
|---|---|---|---|
| Multi-camera ergonomics | [Operational performance, cognitive load, visual attention, and usability… (Applied Ergonomics, 2026)](https://www.sciencedirect.com/science/article/pii/S0003687025001838) | Compares performance, cognitive load, visual attention, and usability across camera modes | Always-on multiview is a strong baseline; measure transition and workload cost |
| Adaptive viewpoint | [Rakita et al., RSS 2019](https://graphics.cs.wisc.edu/Papers/2019/RMG19a/) | Optimizes viewpoint around task geometry and occlusion | Geometry-only C2 is mandatory; C3−C2 isolates gaze |
| Camera mapping | [Resolving Camera Frame Misalignment (2021)](https://arxiv.org/abs/2105.08466) | Shows performance cost from camera/control frame misalignment | Keep camera mapping, gain, and layout matched across conditions |
| Gaze intention | [Fuchs & Belardinelli, 2021](https://www.frontiersin.org/journals/neurorobotics/articles/10.3389/fnbot.2021.647930/full) | Estimates pick-and-place intention from gaze in simulation | Model gaze uncertainty and sequence; never equate gaze with intent |
| Visual-attention theory | [SEEV in HRI (2024)](https://onlinelibrary.wiley.com/doi/abs/10.1002/hfm.21017) | Explains allocation through salience, effort, expectancy, and value | Include task value and view-switch effort in AOI and outcome design |
| Multi-view gaze analysis | [Gaze tracking in multi-view teleoperation](https://pmc.ncbi.nlm.nih.gov/articles/PMC8521448/) | Characterizes gaze behavior across teleoperation views | Sightline must add online causal assistance, not only passive logging |
| Direct camera control | [Gaze-contingent Cartesian camera control](https://pmc.ncbi.nlm.nih.gov/articles/PMC3988881/) | Directly controls a robotic camera using gaze | Gaze-camera servo is not a novel or desired contribution |
| Assistive gaze arms | [Scoping review (2024)](https://pmc.ncbi.nlm.nih.gov/articles/PMC10909843/) | Maps gaze-control approaches for assistive robot arms | Restrict gaze to inspection evidence rather than target/action command |
| Goal prediction | [Gaze Complements Control Input, RSS 2022](https://www.ri.cmu.edu/app/uploads/2022/05/aronson_gaze_to_goal_rss22_camera_ready.pdf) | Shows gaze can complement control input for goal prediction | Test incremental value over robot/geometry variables through ablation |
| Recent gaze manipulation | [GazeGrasp (2025)](https://arxiv.org/abs/2501.07255), [GAMMA (2026)](https://arxiv.org/abs/2601.05336) | Uses gaze for target or manipulation assistance | Keep claims distinct from gaze-conditioned action and recheck nearest neighbors |
| Robot platform | [xarm_ros2](https://github.com/xArm-Developer/xarm_ros2) | Provides ROS 2, MoveIt, and camera-calibration examples | Supports implementation feasibility; example calibration is not experimental calibration |
| Eye-tracker access | [Tobii Pro SDK](https://developer.tobii.com/tobii-pro-sdk/), [SDLA](https://developer.tobii.com/pc-gaming/sdla/) | Defines access paths and analytical-use constraints | License confirmation is a research-start gate |

## Nearest-neighbor test

Sightline remains differentiated only if all of the following are true:

1. Gaze changes presentation, not robot or camera motion authority.
2. The trigger is task-phase-specific inspection evidence, not generic dwell or saliency.
3. Geometry-only adaptation uses the same risk model, stream, cue style, and display location.
4. The experiment isolates C3−C2 on physical manipulation outcomes and automation cost.
5. Gaze quality, missingness, cue timing, and event precedence are reported.

If any condition is removed, the work may collapse into established gaze control, passive analytics, or adaptive-viewpoint research.

## Claim-to-evidence requirements

| Candidate claim | Minimum comparison and evidence |
|---|---|
| “Selective views improve on always-on multiview” | C2/C3 versus C1; task-success non-inferiority plus lower transition/workload cost |
| “Gaze adds value” | C3−C2 with matched risk, cue, layout, stream, and timing |
| “The interface reduces errors” | Blinded contact/drop/deviation scoring and mixed-effects analysis across people and scenes |
| “The trigger measures inspection” | Valid calibration, uncertainty-aware AOIs, temporal precedence, and convergent task evidence |
| “Workload is lower” | NASA-TLX together with view/gaze transitions and automation-event counts |
| “The system is safe” | Not a claim supported by this study; maintain an independent physical safety case |

## Primary threats from the literature

- **Novelty threat:** geometry-only adaptation may explain all benefit.
- **Construct threat:** center bias or task layout may masquerade as inspection coverage.
- **Causal threat:** the cue itself captures gaze and changes subsequent measurement.
- **Transfer threat:** simulator or single-scene effects may not survive physical variation.
- **Usability threat:** automatic view changes may disrupt spatial memory more than they help.
- **Licensing threat:** access to a consumer tracker does not imply analytical-use permission.

## Ongoing search axes

- gaze-aware adaptive viewpoints and selective camera presentation;
- multi-camera teleoperation with eye tracking;
- physical-manipulator gaze assistance with geometry-only ablation;
- AOI uncertainty and dynamic screen-layout methods;
- automation surprise, mode confusion, and view-switch cost;
- current Tobii analytical-use and SDK conditions;
- xArm teleoperation safety, calibration, and synchronization practice.

For every added paper, record task, physical versus simulation setting, robot, camera condition, sample size, gaze role, authority path, outcome, limitation, and its exact consequence for Sightline.
