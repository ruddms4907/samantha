import { useState } from 'react';
import { ImageBackground, Pressable, StyleSheet, Text, View } from 'react-native';
import { useRouter } from 'expo-router';

import { t } from '../i18n';

/** Companion 의 성별. docs/PRODUCT.md 4장 — 두 Companion 은 서로 독립된 인물이다. */
type CompanionGender = 'male' | 'female';

/**
 * 함께 시작할 Companion 을 고르는 화면.
 * '변경'이 아니라 '선택'이다. 고르지 않은 쪽의 데이터도 그대로 유지된다.
 */
export function CompanionSelectScreen() {
  const router = useRouter();
  const [selected, setSelected] = useState<CompanionGender | null>(null);

  return (
    <ImageBackground
      source={require('../../assets/onboarding-bg.png')}
      style={styles.background}
      resizeMode="cover"
    >
      <View style={styles.scrim} />

      <View style={styles.content}>
        <View style={styles.header}>
          <Text style={styles.title}>{t('companionSelect.title')}</Text>
          <Text style={styles.description}>{t('companionSelect.description')}</Text>
        </View>

        <View style={styles.choices}>
          <ChoiceCard
            label={t('companionSelect.him')}
            sublabel={t('companionSelect.himSub')}
            isSelected={selected === 'male'}
            onPress={() => setSelected('male')}
          />
          <ChoiceCard
            label={t('companionSelect.her')}
            sublabel={t('companionSelect.herSub')}
            isSelected={selected === 'female'}
            onPress={() => setSelected('female')}
          />
        </View>

        <Pressable
          accessibilityRole="button"
          accessibilityState={{ disabled: selected === null }}
          disabled={selected === null}
          onPress={() => router.push('/companion-name')}
          style={({ pressed }) => [
            styles.nextButton,
            selected === null && styles.nextButtonDisabled,
            pressed && styles.nextButtonPressed,
          ]}
        >
          <Text style={[styles.nextLabel, selected === null && styles.nextLabelDisabled]}>
            {t('companionSelect.next')}
          </Text>
        </Pressable>
      </View>
    </ImageBackground>
  );
}

type ChoiceCardProps = {
  label: string;
  sublabel: string;
  isSelected: boolean;
  onPress: () => void;
};

function ChoiceCard({ label, sublabel, isSelected, onPress }: ChoiceCardProps) {
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityState={{ selected: isSelected }}
      onPress={onPress}
      style={({ pressed }) => [
        styles.card,
        isSelected && styles.cardSelected,
        pressed && styles.cardPressed,
      ]}
    >
      <Text style={[styles.cardLabel, isSelected && styles.cardLabelSelected]}>{label}</Text>
      <Text style={styles.cardSublabel}>{sublabel}</Text>
    </Pressable>
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
    backgroundColor: 'rgba(24, 14, 42, 0.34)',
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: '26%',
    paddingBottom: '13%',
    paddingHorizontal: 28,
  },
  header: {
    alignItems: 'center',
  },
  title: {
    fontSize: 26,
    fontWeight: '300',
    letterSpacing: 2,
    color: '#ffffff',
    textShadowColor: 'rgba(30, 14, 52, 0.4)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 14,
  },
  description: {
    marginTop: 18,
    fontSize: 14,
    lineHeight: 22,
    textAlign: 'center',
    color: 'rgba(255, 255, 255, 0.78)',
  },
  choices: {
    flexDirection: 'row',
    gap: 18,
  },
  card: {
    width: 138,
    height: 168,
    borderRadius: 24,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.5)',
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardSelected: {
    borderWidth: 1.5,
    borderColor: '#ffffff',
    backgroundColor: 'rgba(255, 255, 255, 0.22)',
  },
  cardPressed: {
    backgroundColor: 'rgba(255, 255, 255, 0.16)',
  },
  cardLabel: {
    fontSize: 30,
    fontWeight: '200',
    letterSpacing: 2,
    color: 'rgba(255, 255, 255, 0.92)',
  },
  cardLabelSelected: {
    color: '#ffffff',
    fontWeight: '300',
  },
  cardSublabel: {
    marginTop: 10,
    fontSize: 14,
    letterSpacing: 3,
    color: 'rgba(255, 255, 255, 0.7)',
  },
  nextButton: {
    width: '100%',
    height: 56,
    borderRadius: 28,
    borderWidth: 1.5,
    borderColor: 'rgba(255, 255, 255, 0.9)',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  nextButtonDisabled: {
    borderColor: 'rgba(255, 255, 255, 0.28)',
    backgroundColor: 'rgba(255, 255, 255, 0.04)',
  },
  nextButtonPressed: {
    backgroundColor: 'rgba(255, 255, 255, 0.22)',
  },
  nextLabel: {
    fontSize: 17,
    fontWeight: '400',
    letterSpacing: 4,
    color: '#ffffff',
  },
  nextLabelDisabled: {
    color: 'rgba(255, 255, 255, 0.4)',
  },
});
