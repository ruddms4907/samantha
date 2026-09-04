import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';

/**
 * 앱 전체의 화면 껍데기.
 * 화면마다 상단 바를 쓰지 않으므로 headerShown 을 끈다.
 */
export default function RootLayout() {
  return (
    <>
      <StatusBar style="light" />
      <Stack screenOptions={{ headerShown: false }} />
    </>
  );
}
