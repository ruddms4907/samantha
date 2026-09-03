// ESLint 설정 — 코드에서 실수를 찾아내는 도구
// 규칙 근거: docs/SECURITY.md, CLAUDE.md 「코드 규칙」
const expoConfig = require('eslint-config-expo/flat');
const prettierConfig = require('eslint-config-prettier');
const tsPlugin = require('@typescript-eslint/eslint-plugin');

module.exports = [
  ...expoConfig,
  // prettier 와 겹치는 서식 규칙을 끈다. 서식은 prettier 가 담당한다.
  prettierConfig,
  {
    ignores: ['node_modules/*', 'dist/*', '.expo/*'],
  },
  {
    files: ['**/*.ts', '**/*.tsx'],
    plugins: { '@typescript-eslint': tsPlugin },
    rules: {
      // any 를 쓰지 않는다 (CLAUDE.md 코드 규칙)
      '@typescript-eslint/no-explicit-any': 'error',
      // 쓰지 않는 변수는 오류로 다룬다. _ 로 시작하는 것만 예외
      '@typescript-eslint/no-unused-vars': [
        'error',
        { argsIgnorePattern: '^_', varsIgnorePattern: '^_' },
      ],
    },
  },
];
