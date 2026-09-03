import { ko, type StringKey } from './ko';

// 현재 제공 언어는 한국어뿐이다. (docs/PRODUCT.md 8장)
// 언어가 늘어나면 사용자 계정의 locale 에 따라 사전을 고르도록 이 파일만 고친다.
const dictionary = ko;

export function t(key: StringKey): string {
  return dictionary[key];
}

export type { StringKey };
