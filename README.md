# Samantha

AI Companion 서비스. 사용자와 지속적으로 대화하며 서로를 알아가고,
과거 대화와 중요한 정보를 기억하고, 시간이 지남에 따라 관계와 성격이 발전한다.

> **상태: Phase 2 완료 — 앱 껍데기가 실제 기기에서 동작합니다. 다음은 Phase 3 (계정 + DB).**
> 온보딩 화면 3개까지 만들어져 있고, 아직 저장 기능이 없어 앱을 끄면 입력이 사라집니다.
> 이 저장소를 처음 받았다면 아래 "지금 어디까지 왔나"를 먼저 읽으세요.

---

## 지금 어디까지 왔나

| Phase | 내용 | 상태 |
|---|---|---|
| 0 | 개발 도구 설치 | ✅ 완료 |
| 1 | 저장소 + 핵심 문서 | ✅ 완료 |
| 2 | 앱 껍데기 + 개발 규칙 (Expo/TS/CI) | ✅ 완료 |
| 3 | 인증 + DB 스키마 v1 + RLS | 🟨 진행 중 |
| 4 | AI 대화 (서버 경유) | ⬜ |
| 5 | 장기 기억 시스템 | ⬜ |
| 6 | 관계·성격 발전 | ⬜ |
| 7 | 구독 결제 (인앱결제) | ⬜ |
| 8 | 베타 → 한국 출시 | ⬜ |
| 9 | 다국어 / 해외 확장 | ⬜ |

---

## 기술 스택

- **앱**: React Native + Expo (Development Build), TypeScript (strict)
- **백엔드**: 독립 백엔드 애플리케이션 (서버 측 비즈니스 로직 — AI 대화, 기억, 관계, 결제 검증, 알림)
- **관리자 화면**: Admin Console (Web) — 운영 설정 변경용. **미구현, 구조상 자리만 확보**
- **데이터**: Supabase (PostgreSQL + Auth + RLS)
- **형상관리**: Git / GitHub

## 확정된 원칙 (변경하려면 결정 기록을 남길 것)

1. **AI API Key는 앱에 절대 넣지 않는다.** 앱 → 서버 → AI 모델 순서로만 호출한다.
2. **Expo Go를 쓰지 않는다.** 처음부터 EAS Development Build 로 개발한다.
   (결제·푸시·음성 등 네이티브 기능이 Expo Go에서 동작하지 않기 때문)
3. **RLS(Row Level Security)가 없는 테이블은 만들지 않는다.**
4. **DB는 Supabase 대시보드에서 직접 수정하지 않는다.** 모든 변경은
   `supabase/migrations/` 의 SQL 파일로 남기고 커밋한다.
5. **안전·연령·개인정보 정책은 기능을 만든 뒤에 붙이지 않는다.** 설계 단계에 포함한다.

---

## 문서 지도

프로젝트의 모든 판단 근거는 이 저장소 안에 있다.
특정 대화나 특정 사람의 기억에 의존하지 않는다.

| 문서 | 내용 | 상태 |
|---|---|---|
| `CLAUDE.md` | AI 협업 및 개발 규칙 | ✅ 작성됨 |
| `docs/DEVELOPMENT.md` | 개발 환경 세팅, 실행, 자주 나는 오류 | ✅ 작성됨 |
| `docs/PRODUCT.md` | 무엇을, 누구에게, 왜 만드는가 | ✅ 작성됨 |
| `docs/ARCHITECTURE.md` | 시스템 구조와 데이터 흐름 | ✅ 작성됨 |
| `docs/DATABASE.md` | 테이블 설계, RLS, 마이그레이션 규칙 | ✅ 작성됨 |
| `docs/SECURITY.md` | 키 관리와 금지 사항 | ✅ 작성됨 |
| `docs/SAFETY.md` | AI 안전, 위기 대응, 연령 정책 | ✅ 작성됨 |
| `docs/AI_SYSTEM.md` | 모델, 프롬프트, 기억 파이프라인 | ⬜ 예정 |
| `docs/DECISIONS/` | 기술 결정 기록 (선택지·장단점·이유) | ✅ 0001~0003 |

---

## 개발 시작하기

**처음 세팅하거나 빌드가 안 되면 `docs/DEVELOPMENT.md` 를 먼저 본다.**
겪었던 오류와 해결법이 전부 거기에 있다.

```bash
cd apps/mobile
npm install
npx expo run:ios --device     # 아이폰 실기기에 설치 + 실행
```

이미 설치되어 있다면 개발 서버만 켜면 된다.

```bash
cd apps/mobile
npx expo start --dev-client
```

올리기 전 검사:

```bash
npm run typecheck && npm run lint && npm run format:check
```

### 현재 구현된 화면

| 주소 | 화면 |
|---|---|
| `/` | 시작 (Him / Her) |
| `/companion-select` | Companion 선택 (Him / Her) |
| `/companion-name` | 이름 짓기 |

> 아직 **계정과 데이터베이스가 없어서 선택한 내용이 저장되지 않는다.** (Phase 3)
