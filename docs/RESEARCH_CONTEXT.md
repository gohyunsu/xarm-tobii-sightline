# Sightline-xArm 연구 맥락

마지막 갱신: 2026-07-22  
문서 역할: 이후 대화와 구현에서 계속 참고할 단일 연구 맥락 문서

## 1. 이 프로젝트의 정체성

Sightline-xArm은 VLA, 자연어 명령, BEAVER와 독립된 인간–로봇 상호작용(HRI) 연구다. 보유하거나 확보 가능한 xArm, 화면 기반 Tobii eye tracker, 복수의 고정 카메라를 이용한다.

이 연구를 “Tobii로 xArm을 제어한다”라고 소개하면 안 된다. 그 표현은 이미 연구가 많은 gaze-to-command/target-selection 계열과 혼동되고, 눈이 머문 곳을 사용자의 의도나 승인으로 과대 해석하게 만든다.

정확한 연구 질문은 다음과 같다.

> 가려진 물체를 xArm으로 집어 옮기는 화면 기반 원격조작에서, 운영자가 아직 확인하지 않은 접촉 영역과 로봇의 기하학적 위험을 결합해 필요한 보조 시점만 제시하면, 수동 전환·항상 켜진 다중뷰·기하 기반 자동뷰보다 조작 오류와 시각적 전환 비용을 줄일 수 있는가?

작업자는 controller로 xArm을 직접 움직인다. Tobii gaze는 로봇 명령이나 target selection을 만들지 않는다. gaze의 유일한 역할은 현재 task phase에서 필수인 화면 영역이 최근에 관찰되었는지를 제한적으로 측정하는 것이다. system은 그 측정과 robot geometry risk를 결합해 side/wrist camera를 picture-in-picture로 보여줄지 결정한다.

## 2. 구체적 사용 장면

운영자는 작업대를 직접 보지 않고 overhead video를 보며 xArm gripper를 블록 쪽으로 이동한다. 마지막 약 3 cm에서 gripper가 접촉면을 가리고, overhead video만으로 z-gap이 모호하다. 운영자가 contact AOI나 side view를 아직 충분히 확인하지 않았고 robot risk가 threshold를 넘으면 side/wrist view가 같은 화면 위치에서 확대된다. 운영자는 controller로 계속, 수정, 중지한다.

개입의 출력은 `camera/UI layout`이다. `robot motion`, `grasp command`, `safety approval`이 아니다.

## 3. 왜 의미가 있는가

원격조작에서 카메라는 감각기관이다. 단일 시점은 robot self-occlusion과 depth ambiguity에 약하다. 그러나 여러 camera를 항상 동시에 표시하면 각 video가 작아지고 visual search, gaze transition, cognitive load가 증가할 수 있다. 최근 Applied Ergonomics 연구는 복수 camera의 성공률 이득과 시각/인지 비용이 함께 나타날 수 있음을 보여준다.

기하 기반 adaptive viewpoint도 이미 존재한다. 이들은 대상 visibility와 occlusion을 개선하지만 운영자가 이미 필요한 증거를 확인했는지는 모른다. 반대로 eye tracking 연구는 gaze behavior 또는 target intention을 다루지만 camera assistance의 시점을 폐루프로 검증하는 연구는 상대적으로 좁다.

Sightline은 `지금 물리적으로 위험한가?`와 `판단에 필요한 화면 증거를 최근에 검사했는가?`를 동시에 묻는다. 기술 결합 자체가 아니라 geometry-only 기준선에 gaze가 주는 incremental value를 물리 xArm 실험으로 분리하는 데 의미가 있다.

## 4. 핵심 개념과 해석 경계

- `Risk`: TCP/target 거리, time-to-contact, main-view occlusion, task phase를 결합한 UI trigger 변수. safety certificate가 아니다.
- `AOI`: 현재 task phase에서 판단에 필요한 target, gripper, contact surface, destination 등의 화면 polygon.
- `Inspection coverage`: 최근 시간창에서 유효 gaze가 필수 AOI와 겹친 정도. coverage 부족은 이해 부족이나 부주의를 의미하지 않는다.
- `Inspection deficit`: coverage가 사전 threshold보다 낮은 측정 상태.
- `Assist`: 필요한 side/wrist stream의 확대·강조. robot이나 camera motor의 gaze servo가 아니다.
- `Sightline Episode`: gaze, UI, camera, controller, robot telemetry, AOI와 task outcome을 공통 trial/clock으로 연결한 기록 단위.

다음 등식은 모두 금지한다.

- gaze = intent
- gaze = attention
- gaze = understanding
- gaze = approval
- assist not shown = safe

## 5. 실험 조건과 핵심 비교

본 실험은 within-subject로 네 조건을 비교한다.

| 조건 | 화면 정책 | 목적 |
|---|---|---|
| C0 Manual switch | 운영자가 버튼으로 view 선택 | 명시적 control의 비용과 놓침 |
| C1 Always multi | overhead/side/wrist 동시 표시 | 정보 최대화와 visual cost |
| C2 Geometry-only | risk/occlusion/task phase로 보조 view | gaze 없는 강한 adaptive 기준선 |
| C3 Sightline | C2 + critical AOI inspection deficit | gaze의 incremental value |

가장 중요한 contrast는 C3−C2다. C3가 C2보다 task errors, false continuation, view/gaze transitions, selective workload를 개선하지 못하면 Tobii contribution을 주장하지 않는다. C1−C0, C2−C1만 지지되면 adaptive multi-camera UI 연구일 뿐 gaze 연구의 기여는 아니다.

## 6. 과제 battery

1. Pick-and-place: robot/gripper가 target을 가리는 self-occlusion. wrong grasp, drop, bin wall contact를 측정한다.
2. Stacking: overhead에서 z-gap과 edge alignment가 모호한 작업. collision, tilt, placement offset을 측정한다.
3. Low-force slot insertion: side/wrist evidence가 필요한 접촉면 정렬. rim contact와 failed insertion을 측정한다. press-fit과 고힘 작업은 제외한다.

Occlusion(high/low), target tolerance, distractor 수를 조절한다. camera/control frame alignment는 모든 조건에서 같게 유지한다.

## 7. 가설과 반증

- H1: Always-multi는 manual보다 task success를 높일 수 있지만 gaze transition과 workload도 늘린다.
- H2: C2/C3는 C1의 task success를 유지하면서 view/gaze transitions를 줄인다.
- H3: C3는 C2보다 필수 AOI가 실제 미검사인 trial의 false continuation과 contact error를 줄인다.
- H4: C3 이득은 novice/high-occlusion에서 크고 expert/clear-view에서는 작거나 방해가 될 수 있다.

반증 조건은 사후에 완화하지 않는다. H3가 지지되지 않으면 `gaze-aware assistance`를 성공으로 포장하지 않는다. 동기화 데이터셋, 부정 결과, threshold/skill/occlusion 경계, geometry-only UI 지침으로 기여 범위를 낮춘다.

## 8. 후보 기여

검증되었을 때만 다음을 주장한다.

1. Geometry risk와 task-critical inspection deficit을 결합한 non-command selective-view trigger.
2. physical xArm의 제한된 telemanipulation에서 manual, always-multi, geometry-only, gaze+geometry를 분리한 인과 비교.
3. gaze–UI–camera–controller–robot–fault를 동기화한 Sightline Episodes schema와 품질 보고 규칙.
4. occlusion, expertise, gaze quality에 따라 보조가 도움/방해가 되는 경계 조건.

## 9. 시스템 경계

권장 물리 구성은 xArm + gripper, 고정 overhead/side camera, 선택적 wrist RGB-D camera, 별도 operator monitor와 Tobii, controller와 physical E-stop이다. 참가자는 robot cell 밖에 있고 작업대를 직접 보지 않는다.

소프트웨어는 분리한다.

- Tobii capture client: gaze sample/validity/calibration metadata를 read-only stream으로 보낸다. robot credential을 갖지 않는다.
- ROS 2 backend: robot state, camera, controller, velocity/workspace guard를 관리한다. gaze topic을 subscribe하지 않는다.
- Experiment orchestrator: task phase, AOI version, risk/coverage, condition, event clock을 관리한다.
- Operator UI: camera stream을 렌더링하고 cue/override를 기록한다. gaze cursor는 실험 중 숨긴다.

gaze failure 시 C3는 C2 geometry-only로 내려간다. sync failure 시 online trigger를 끄고 shadow logging으로 내려간다. 센서 실패가 automation 증가로 이어져서는 안 된다.

## 10. 데이터와 분석

최소 stream/table은 `episodes`, `gaze`, `robot_state`, `control_input`, `ui_events`, `aoi_frames`, `outcomes`, `quality`다. 원 device timestamp와 공통 clock 변환값을 모두 보존한다. trial start, assist on/off, manual switch, grasp, release, contact, fault는 공통 event ID로 연결한다.

주 결과는 success/contact/drop/placement deviation과 completion time이다. visual behavior는 critical-AOI coverage, time-to-first-view, gaze/view transitions를 본다. automation cost는 cue count, camera churn, ignored cue, override, false assist를 본다. NASA-TLX, surprise, control feeling은 보조 지표다. pupil은 luminance와 피로 교란 때문에 탐색 분석으로만 사용한다.

participant와 scene/task를 random effect로 둔 mixed-effects model을 사용한다. 참가자 수는 임의로 고정하지 않는다. 6–8명 기술 파일럿에서 effect/variance를 얻고 H3의 최소 관심효과에 대한 simulation-based power analysis 뒤 confirmatory sample을 정한다.

## 11. 필수 Gate

1. 실제 xArm model/gripper/firmware/control mode와 Tobii SKU/OS/camera inventory.
2. Tobii gaze 저장·분석·전송에 필요한 Analytical Use/SDLA 또는 Pro SDK 권한.
3. low-speed/acceleration, workspace, barrier, dead-man, E-stop과 recovery 절차.
4. gaze/camera/controller/robot end-to-end synchronization residual.
5. high/low occlusion에서 ceiling/floor가 없는 task validity.
6. IRB 또는 기관 윤리 판단, 동의·보관·폐기·공개 범위.

Gate 미통과 상태에서 사람 대상 online adaptation을 시작하지 않는다.

## 12. 선행연구에서 얻은 결정

- 2026 Applied Ergonomics multi-camera study: 단순 multi-view UI는 이미 직접 평가됐다. success뿐 아니라 saccade/cognitive load를 함께 측정한다.
- Rakita et al., RSS 2019: geometry-based adaptive viewpoint는 강한 baseline이다. C2를 생략하지 않는다.
- Fuchs & Belardinelli, 2021: gaze와 intention의 관계가 연구됐지만 gaze point의 불확실성·AOI sequence를 고려해야 한다. gaze를 마음의 정답으로 쓰지 않는다.
- Camera frame misalignment 연구: view policy 효과와 control-camera 축 불일치를 혼동하지 않게 condition 간 mapping을 고정한다.
- Gaze control/shared autonomy 계열: target selection은 혼잡한 기여 영역이다. Sightline은 inspection-aware view presentation으로 범위를 좁힌다.

전체 링크와 역할별 평가는 `docs/RELATED_WORK.md`와 사이트의 `evidence/related-work.html`을 따른다.

## 13. 프로젝트에서 하지 않는 것

- VLA 학습, foundation model fine-tuning, 자연어 robot command
- BEAVER와의 통합 또는 기존 BEAVER 결과의 재포장
- gaze-only target selection, gaze click, gaze-to-robot motion
- 운영자의 의도·주의·이해·승인 판정
- 사람과 robot이 같은 cell에서 접촉하는 협동작업
- 의료/산업 안전 시스템 또는 certification 주장
- 결과가 나오기 전 성능·안전·효과 주장

## 14. 다음 의사결정

첫 번째 실제 작업은 코딩이 아니라 inventory/license audit다. 그 뒤 recorder와 sync audit를 먼저 만들고, C0/C1/C2 baseline, C3 shadow mode, 기술 파일럿, confirmatory study 순으로 간다. 전체 진행률은 `operations/roadmap.html`에서 관리한다.
