import { OnboardingScreen } from '../src/screens/OnboardingScreen';

// 앱을 켰을 때 처음 보이는 화면.
// 라우트 파일은 얇게 두고, 화면 내용은 src/screens 에서 관리한다.
export default function IndexRoute() {
  return <OnboardingScreen />;
}
