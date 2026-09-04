// 한국어 문구 사전.
// 사용자에게 보이는 문자열은 화면 코드에 직접 쓰지 않고 여기에 키로 모은다.
// (CLAUDE.md 「코드 규칙」, docs/ARCHITECTURE.md 11장 국제화)
export const ko = {
  'app.title': 'Him / Her',

  'onboarding.tagline': "I'm listening.",
  'onboarding.start': 'start',

  'companionSelect.title': '누구와 먼저 시작할까요',
  'companionSelect.description':
    '나중에 언제든 상대를 바꿀 수 있어요.\n각자와의 이야기는 따로 쌓입니다.',
  'companionSelect.him': 'Him',
  'companionSelect.himSub': '그',
  'companionSelect.her': 'Her',
  'companionSelect.herSub': '그녀',
  'companionSelect.next': '다음',

  'companionName.title': '어떻게 부를까요',
  'companionName.description': '이 이름으로 부르게 됩니다.',
  'companionName.placeholder': '이름',
  'companionName.done': '시작하기',
} as const;

export type StringKey = keyof typeof ko;
