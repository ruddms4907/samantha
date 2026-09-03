// 한국어 문구 사전.
// 사용자에게 보이는 문자열은 화면 코드에 직접 쓰지 않고 여기에 키로 모은다.
// (CLAUDE.md 「코드 규칙」, docs/ARCHITECTURE.md 11장 국제화)
export const ko = {
  'app.title': 'Him / Her',
  'onboarding.tagline': "I'm listening.",
  'onboarding.start': 'start',
} as const;

export type StringKey = keyof typeof ko;
