# DEVELOPMENT — 개발 환경과 실행 방법

> 새 컴퓨터에서 처음 시작하거나, 빌드가 안 될 때 이 문서를 본다.
> 여기 적힌 문제들은 실제로 겪은 것들이다. 같은 걸 두 번 겪지 않기 위해 남긴다.

- 최종 수정: 2026-09-04
- 대상: macOS

---

## 1. 처음 한 번만 하는 세팅

### 1.1 Xcode

App Store 에서 Xcode 를 설치한 뒤, 터미널에서 라이선스에 동의한다.

```bash
sudo xcodebuild -license accept
```

> ⚠️ 동의하지 않으면 **`git` 을 포함한 모든 개발 명령이 멈춘다.**
> `You have not agreed to the Xcode license agreements` 오류가 그것이다.

이어서 iOS 플랫폼을 내려받는다. Xcode 26 부터는 **본체와 별도로 받아야 한다.**

```bash
xcodebuild -downloadPlatform iOS
```

또는 `Xcode → Settings → Components → iOS` 에서 다운로드.
(용량이 크다. 7~10GB)

### 1.2 Homebrew

```bash
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
```

설치 후 안내에 따라 PATH 를 등록한다.

```bash
echo 'eval "$(/opt/homebrew/bin/brew shellenv zsh)"' >> ~/.zprofile
eval "$(/opt/homebrew/bin/brew shellenv zsh)"
```

### 1.3 CocoaPods

```bash
brew install cocoapods
```

> ⚠️ **`gem install cocoapods` 로 설치하지 말 것.**
> macOS 내장 Ruby 는 2.6 이라 최신 CocoaPods 의 요구 버전(3.1+)에 못 미친다.
> Homebrew 판은 자체 Ruby 를 함께 설치하므로 이 문제가 없다.

### 1.4 Node.js

버전 관리자(nvm)로 설치한다. 저장소의 `.nvmrc` 가 버전을 고정한다.

```bash
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.7/install.sh | bash
# 터미널을 새로 연 뒤
nvm install --lts
nvm alias default 'lts/*'
```

저장소 폴더에서 `nvm use` 를 실행하면 `.nvmrc` 에 적힌 버전으로 맞춰진다.

### 1.5 저장소 준비

```bash
git clone git@github.com:ruddms4907/samantha.git
cd samantha/apps/mobile
npm install
```

> ⚠️ **저장소 폴더 경로에 한글이나 공백을 쓰지 않는다.**
> iOS 빌드 도구가 한글 경로를 처리하지 못해 CocoaPods 가 실패한다.
> (`incompatible character encodings: BINARY (ASCII-8BIT) and UTF-8`)

---

## 2. iOS 실기기에서 실행하기 (무료 Apple ID)

### 2.1 Xcode 에 Apple ID 등록

`Xcode → Settings(⌘,) → Apple Accounts → 계정 선택`

- 유료 Apple Developer 등록이 없으면 `Personal Team` 으로 표시된다.
- `Manage Certificates…` → `[+]` → `Apple Development` 로 인증서를 만든다.

### 2.2 서명 인증서가 "유효하지 않다"고 나올 때

```bash
security find-identity -v -p codesigning
# 0 valid identities found  ← 인증서는 있는데 신뢰되지 않는 상태
```

애플의 중간 인증서(WWDR G3)가 없어서 생기는 문제다. 애플 공식 배포처에서 받아 넣는다.

```bash
curl -o AppleWWDRCAG3.cer https://www.apple.com/certificateauthority/AppleWWDRCAG3.cer
security import AppleWWDRCAG3.cer -k ~/Library/Keychains/login.keychain-db
```

### 2.3 빌드할 때마다 키체인 창이 수십 개 뜰 때

서명할 파일 수만큼 허락을 묻기 때문이다. 한 번만 영구 허용하면 된다.

```bash
security set-key-partition-list -S apple-tool:,apple:,codesign: -s ~/Library/Keychains/login.keychain-db
```

실행하면 로그인 암호를 묻는다. 출력이 16진수 덩어리로 길게 나오는 것이 정상이다.

### 2.4 아이폰 설정

**개발자 모드를 켠다.** (iOS 16 이상)

```
설정 → 개인정보 보호 및 보안 → 개발자 모드 → 켜기 → 재부팅
```

- 이 항목은 맥에 한 번 연결해서 빌드를 시도해야 나타난다.
- **개발 중에는 계속 켜 둔다.** 끄면 앱이 실행되지 않는다.

앱을 처음 설치한 뒤에는 개발자를 신뢰해야 한다.

```
설정 → 일반 → VPN 및 기기 관리 → Apple Development: <계정> → 신뢰
```

### 2.5 실행

```bash
cd apps/mobile
npx expo run:ios --device
```

기기 식별자를 직접 지정할 수도 있다.

```bash
xcrun xctrace list devices          # 식별자 확인
npx expo run:ios --device "<UDID>"
```

> ⚠️ **무료 Apple ID 로 설치한 앱은 7일 후 만료된다.** 다시 빌드하면 된다.
> 푸시 알림과 인앱결제는 무료 계정으로 테스트할 수 없다.
> 이 제약을 없애려면 Apple Developer Program($99/년) 등록이 필요하다. (Phase 6 전까지)

---

## 3. 매일 하는 작업

```bash
cd apps/mobile
npx expo start --dev-client     # 개발 서버 실행
```

서버가 떠 있으면 코드를 고치는 즉시 아이폰 화면에 반영된다. 재설치가 필요 없다.

### 올리기 전에 검사

```bash
npm run typecheck    # 타입 오류
npm run lint         # 코드 문제
npm run format       # 서식 정리
```

GitHub Actions 가 push 마다 같은 검사를 실행한다. (`.github/workflows/ci.yml`)

---

## 4. 자주 나는 오류

| 증상 | 원인 | 해결 |
|---|---|---|
| `You have not agreed to the Xcode license` | Xcode 라이선스 미동의 | `sudo xcodebuild -license accept` |
| `incompatible character encodings` | **폴더 경로에 한글** | 경로를 영문으로 변경 |
| `iOS 26.x is not installed` | iOS 플랫폼 미설치 | `xcodebuild -downloadPlatform iOS` |
| `Developer Mode disabled` | 아이폰 개발자 모드 꺼짐 | 아이폰 설정에서 켜고 재부팅 |
| `No profiles for '...' were found` | 번들 ID 중복 또는 프로파일 없음 | 번들 ID 변경 또는 `-allowProvisioningUpdates` |
| `cannot be registered ... not available` | **번들 ID 를 다른 사람이 선점** | 겹치지 않는 번들 ID 로 변경 |
| `0 valid identities found` | WWDR 중간 인증서 없음 | 2.2 참조 |
| 키체인 창이 계속 뜸 | codesign 권한 미허용 | 2.3 참조 |
| `Unable to resolve module ...` | **개발 서버 캐시가 낡음** | 서버 종료 후 `npx expo start --clear` |
| `CoreDeviceService was unable to locate a device` | USB 연결 세션 끊김 | 케이블 뽑았다 다시 꽂기 |
| `Port 8081 is running this app in another window` | 개발 서버 중복 실행 | 기존 서버 종료 후 재실행 |

> **패키지를 새로 설치한 뒤에는 개발 서버를 반드시 다시 켠다.**
> 서버가 옛 모듈 목록을 들고 있어 "모듈을 찾을 수 없다"는 오류가 난다.
>
> **네이티브 모듈이 추가된 경우에는 앱을 다시 빌드해야 한다.** (`npx expo run:ios`)

---

## 5. 현재 환경 (2026-09-04 기준)

| 항목 | 버전 |
|---|---|
| Node.js | v24.20.0 (`.nvmrc`) |
| Expo SDK | 57 |
| React Native | 0.86 |
| TypeScript | 6.0 (strict) |
| Xcode | 26.6 |
| CocoaPods | 1.17.0 (Homebrew) |
| 번들 ID | `com.himher120402.app` |

---

## 6. 변경 이력

| 날짜 | 내용 |
|---|---|
| 2026-09-04 | 최초 작성. macOS 개발 환경 세팅과 iOS 실기기 실행 절차 |
