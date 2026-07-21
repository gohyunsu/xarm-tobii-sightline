# Related work map

확인 기준일: 2026-07-22

## 핵심 판정

Sightline-xArm의 연구 공백은 `xArm + Tobii`라는 장비 조합이 아니다. gaze-based robot control, passive gaze analysis, geometry-based adaptive viewpoint, multi-camera human-factors는 각각 이미 존재한다. 후보 기여는 `기하 위험이 높은데 task-critical AOI의 검사 근거가 부족한 순간에만 보조 view를 제시하는 non-command closed loop`를 physical xArm에서 geometry-only와 직접 비교하는 것이다.

## 계열별 문헌

| 계열 | 문헌 | 이미 한 일 | 우리 설계에 주는 결정 |
|---|---|---|---|
| Multi-camera ergonomics | [Operational performance, cognitive load, visual attention, and usability… (Applied Ergonomics, 2026)](https://www.sciencedirect.com/science/article/pii/S0003687025001838) | 35명과 5개 camera mode에서 수행·인지부하·시각주의·usability 비교 | 단순 multi-camera UI는 신규성 부족. always-multi를 강한 baseline으로 두고 transition/workload 측정 |
| Adaptive viewpoint | [Rakita et al., RSS 2019](https://graphics.cs.wisc.edu/Papers/2019/RMG19a/) | occlusion을 줄이는 viewpoint optimization | geometry-only C2 필수. C3−C2가 gaze의 incremental value |
| Camera mapping | [Resolving Camera Frame Misalignment (2021)](https://arxiv.org/abs/2105.08466) | camera/control frame misalignment의 성능 비용과 correction | camera mapping을 condition 간 고정 |
| Gaze intention | [Fuchs & Belardinelli, 2021](https://www.frontiersin.org/journals/neurorobotics/articles/10.3389/fnbot.2021.647930/full) | simulated pick-place에서 gaze-based intention estimation | gaze uncertainty와 AOI sequence 반영; gaze=intent 금지 |
| Visual attention model | [SEEV in HRI (2024)](https://onlinelibrary.wiley.com/doi/abs/10.1002/hfm.21017) | salience, effort, expectancy, value로 attention allocation 설명 | task value와 view-switch effort를 AOI 설계·측정에 포함 |
| Multi-view gaze | [Gaze tracking in multi-view teleoperation](https://pmc.ncbi.nlm.nih.gov/articles/PMC8521448/) | multi-view teleoperation의 gaze behavior 분석 | passive logging에서 online view assistance로 확장하되 인과 비교 필요 |
| Direct camera control | [Gaze-contingent Cartesian camera control](https://pmc.ncbi.nlm.nih.gov/articles/PMC3988881/) | gaze로 robotic camera를 직접 제어 | gaze-camera servo를 신규 기여로 주장하지 않음 |
| Assistive gaze arms | [Scoping review (2024)](https://pmc.ncbi.nlm.nih.gov/articles/PMC10909843/) | assistive robotic arm의 gaze control 계열 정리 | target/control보다 inspection coverage로 역할 제한 |
| Goal prediction | [Gaze Complements Control Input, RSS 2022](https://www.ri.cmu.edu/app/uploads/2022/05/aronson_gaze_to_goal_rss22_camera_ready.pdf) | gaze가 control input의 goal prediction을 보완 | robot-only 대비 gaze incremental value를 ablation으로 검증 |
| Recent gaze manipulation | [GazeGrasp (2025)](https://arxiv.org/abs/2501.07255), [GAMMA (2026)](https://arxiv.org/abs/2601.05336) | gaze 기반 target/manipulation assistance | 최신 직접 이웃과 claim/setting을 최종 원문으로 계속 비교 |
| Platform | [xarm_ros2](https://github.com/xArm-Developer/xarm_ros2) | ROS 2, MoveIt, D435i eye-in-hand와 calibration example | 구현 가능성 근거. sample calibration은 실험에 재사용하지 않음 |
| Eye-tracker access | [Tobii Pro SDK](https://developer.tobii.com/tobii-pro-sdk/), [SDLA](https://developer.tobii.com/pc-gaming/sdla/) | gaze data access와 analytical-use 권한 설명 | 라이선스 확인을 연구 착수 Gate로 둠 |

## 주장별 최소 근거

| 주장 | 필요한 비교/증거 |
|---|---|
| “선택적 view가 always-multi보다 낫다” | C2/C3−C1, task success 비열등성과 transition/workload 감소 |
| “gaze가 추가 가치가 있다” | C3−C2, 같은 risk model·cue/layout·camera stream |
| “오류를 줄인다” | blinded scoring, contact/drop/deviation, mixed model, task/participant random effects |
| “인지부하가 낮다” | NASA-TLX와 visual switching을 함께 보고, pupil만으로 주장하지 않음 |
| “안전하다” | 본 연구로 주장하지 않음. safety layer와 UI experiment를 분리 |

## 계속 추적할 검색 축

- `adaptive camera viewpoint teleoperation occlusion human study`
- `multi camera robot teleoperation visual attention eye tracking`
- `gaze contingent interface robotic manipulation inspection`
- `gaze aware shared autonomy manipulation 2025 2026`
- `task critical AOI gaze monitoring teleoperation`

새 논문을 추가할 때는 제목/연도뿐 아니라 task, physical/simulation, robot, camera condition, sample size, gaze role, outcome, limitation, Sightline에 대한 역할을 기록한다.
