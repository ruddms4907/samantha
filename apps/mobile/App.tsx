import { StatusBar } from 'expo-status-bar';

import { OnboardingScreen } from './src/screens/OnboardingScreen';

export default function App() {
  return (
    <>
      <StatusBar style="light" />
      <OnboardingScreen />
    </>
  );
}
