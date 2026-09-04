import { useState } from 'react';
import {
  ImageBackground,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';

import { t } from '../i18n';

const MAX_NAME_LENGTH = 12;

/**
 * Companion 의 이름을 짓는 화면.
 * docs/PRODUCT.md 4장 — 각 Companion 의 이름은 사용자가 직접 짓는다.
 *
 * 아직 저장 기능이 없다. 계정과 데이터베이스는 Phase 3 에서 붙인다.
 */
export function CompanionNameScreen() {
  const [name, setName] = useState('');
  const trimmedName = name.trim();
  const canSubmit = trimmedName.length > 0;

  return (
    <ImageBackground
      source={require('../../assets/onboarding-bg.png')}
      style={styles.background}
      resizeMode="cover"
    >
      <View style={styles.scrim} />

      <KeyboardAvoidingView
        style={styles.flex}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <View style={styles.content}>
          <View style={styles.header}>
            <Text style={styles.title}>{t('companionName.title')}</Text>
            <Text style={styles.description}>{t('companionName.description')}</Text>
          </View>

          <TextInput
            value={name}
            onChangeText={setName}
            placeholder={t('companionName.placeholder')}
            placeholderTextColor="rgba(255, 255, 255, 0.45)"
            style={styles.input}
            maxLength={MAX_NAME_LENGTH}
            autoCorrect={false}
            returnKeyType="done"
          />

          <Pressable
            accessibilityRole="button"
            accessibilityState={{ disabled: !canSubmit }}
            disabled={!canSubmit}
            style={({ pressed }) => [
              styles.doneButton,
              !canSubmit && styles.doneButtonDisabled,
              pressed && styles.doneButtonPressed,
            ]}
          >
            <Text style={[styles.doneLabel, !canSubmit && styles.doneLabelDisabled]}>
              {t('companionName.done')}
            </Text>
          </Pressable>
        </View>
      </KeyboardAvoidingView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor: '#2b2140',
  },
  flex: {
    flex: 1,
  },
  scrim: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(24, 14, 42, 0.38)',
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: '30%',
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
    marginTop: 16,
    fontSize: 14,
    lineHeight: 22,
    textAlign: 'center',
    color: 'rgba(255, 255, 255, 0.78)',
  },
  input: {
    width: '100%',
    height: 58,
    borderRadius: 29,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.45)',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    paddingHorizontal: 24,
    fontSize: 18,
    letterSpacing: 1,
    textAlign: 'center',
    color: '#ffffff',
  },
  doneButton: {
    width: '100%',
    height: 56,
    borderRadius: 28,
    borderWidth: 1.5,
    borderColor: 'rgba(255, 255, 255, 0.9)',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  doneButtonDisabled: {
    borderColor: 'rgba(255, 255, 255, 0.28)',
    backgroundColor: 'rgba(255, 255, 255, 0.04)',
  },
  doneButtonPressed: {
    backgroundColor: 'rgba(255, 255, 255, 0.22)',
  },
  doneLabel: {
    fontSize: 17,
    fontWeight: '400',
    letterSpacing: 4,
    color: '#ffffff',
  },
  doneLabelDisabled: {
    color: 'rgba(255, 255, 255, 0.4)',
  },
});
