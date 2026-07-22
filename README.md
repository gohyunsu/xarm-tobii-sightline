# Sightline-xArm

Sightline-xArm은 xArm 화면 기반 원격조작에서 Tobii gaze를 **robot command가 아닌 inspection-coverage 신호**로 사용해 필요한 보조 camera view만 제시하는 독립 HRI 연구 사이트다.

이 프로젝트는 VLA와 BEAVER에 의존하지 않는다.

## 공개 사이트

<https://gohyunsu.github.io/xarm-tobii-sightline/>

`main` 브랜치에 변경사항이 push되면 GitHub Actions가 정적 사이트를 GitHub Pages로 자동 배포한다.

## 핵심 질문

> 가려진 물체를 xArm으로 집어 옮기는 화면 기반 원격조작에서, 운영자가 아직 확인하지 않은 접촉 영역과 로봇의 기하학적 위험을 결합해 필요한 보조 시점만 제시하면, 수동 전환·항상 켜진 다중뷰·기하 기반 자동뷰보다 조작 오류와 시각적 전환 비용을 줄일 수 있는가?

## 사이트 구조

- `index.html`: 한 문장 주제, 문제, 작동 원리, 공백, 후보 기여
- `foundations/`: xArm, teleoperation camera, Tobii, AOI와 해석 경계
- `study/`: RQ, C0–C3 조건, task, measures, analysis, validity
- `system/`: rig, 권한 경계, risk/coverage, sync, Sightline Episodes, safety
- `evidence/related-work.html`: 계열별 문헌 지도와 검색 filter
- `evidence/media.html`: 공식 장비 영상, 선행연구 그림, 자체 도해와 provenance
- `operations/roadmap.html`: Gate, 12주 계획, 장비, 역할, 위험
- `docs/RESEARCH_CONTEXT.md`: 이후 계속 참고할 단일 맥락 문서

## 로컬 확인

정적 사이트이므로 repository root에서 다음처럼 실행한다.

```bash
python3 -m http.server 8877 --bind 127.0.0.1
```

그 뒤 `http://127.0.0.1:8877/`을 연다. 외부 이미지와 영상은 네트워크가 있어야 표시된다.

## 상태

현재는 연구 질문·비교조건·시스템·데이터·Gate를 정리한 **구현 가능한 연구 명세**다. 물리 xArm/Tobii 통합이나 사람 대상 결과가 아니다. 실제 장비 SKU, Tobii analytical-use 권한, 동기화, 안전, 윤리 검토를 통과하기 전 데이터 수집을 시작하지 않는다.

## 라이선스

- 코드: [MIT](LICENSE)
- 자체 문서와 SVG: [CC BY 4.0](CONTENT_LICENSE.md)
- 외부 이미지·영상: 각 원저작자 소유. [provenance](docs/MEDIA_PROVENANCE.md) 참조
