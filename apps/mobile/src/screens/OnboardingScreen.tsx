import { ImageBackground, Pressable, StyleSheet, Text, View } from 'react-native';
import { useRouter } from 'expo-router';

import { t } from '../i18n';

/**
 * 첫 진입 화면.
 * 배경은 이미지이고, 글자와 버튼은 코드로 그린다.
 * (이미지에 글자를 박으면 문구 변경과 다국어 대응이 불가능해진다)
 */
export function OnboardingScreen() {
  const router = useRouter();

  return (
    <ImageBackground
      source={require('../../assets/onboarding-bg.png')}
      style={styles.background}
      resizeMode="cover"
    >
      {/* 기기마다 잘리는 영역이 달라도 글자가 읽히도록 아주 옅게 덮는다 */}
      <View style={styles.scrim} />

      <View style={styles.content}>
        <View style={styles.header}>
          <Text style={styles.title}>{t('app.title')}</Text>
          <View style={styles.divider} />
          <Text style={styles.tagline}>{t('onboarding.tagline')}</Text>
        </View>

        <Pressable
          accessibilityRole="button"
          onPress={() => router.push('/companion-select')}
          style={({ pressed }) => [styles.startButton, pressed && styles.startButtonPressed]}
        >
          <Text style={styles.startLabel}>{t('onboarding.start')}</Text>
        </Pressable>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor: '#2b2140',
  },
  scrim: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(24, 14, 42, 0.12)',
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: '40%',
    paddingBottom: '13%',
  },
  header: {
    alignItems: 'center',
  },
  title: {
    fontSize: 46,
    fontWeight: '200',
    letterSpacing: 6,
    color: '#ffffff',
    textShadowColor: 'rgba(40, 20, 70, 0.35)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 16,
  },
  divider: {
    width: 48,
    height: 2,
    marginTop: 26,
    borderRadius: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.85)',
  },
  tagline: {
    marginTop: 22,
    fontSize: 17,
    fontWeight: '300',
    letterSpacing: 1.2,
    color: 'rgba(255, 255, 255, 0.94)',
    textShadowColor: 'rgba(40, 20, 70, 0.3)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 10,
  },
  startButton: {
    width: 152,
    height: 152,
    borderRadius: 76,
    borderWidth: 1.5,
    borderColor: 'rgba(255, 255, 255, 0.9)',
    backgroundColor: 'rgba(255, 255, 255, 0.07)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  startButtonPressed: {
    backgroundColor: 'rgba(255, 255, 255, 0.18)',
    borderColor: '#ffffff',
  },
  startLabel: {
    fontSize: 22,
    fontWeight: '300',
    letterSpacing: 2,
    color: '#ffffff',
  },
});
