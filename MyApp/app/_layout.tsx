// app/_layout.tsx
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Stack } from 'expo-router';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useEffect, useRef } from 'react';
import { BackHandler, Platform } from 'react-native';
import 'react-native-reanimated';

import { useColorScheme } from '@/hooks/useColorScheme';
import { LanguageProvider } from '../LanguageContext';
import { useKeepAwake } from 'expo-keep-awake';
// @ts-ignore
import KeyEvent from 'react-native-keyevent';

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  // 1) Kiosk-like keep-awake
  useKeepAwake();

  // 2) Font + splash screen
  const colorScheme = useColorScheme();
  const [fontsLoaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  useEffect(() => {
    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  // 3) Volume-button exit listener (Android)
  const VOLUME_UP = 24;
  const VOLUME_DOWN = 25;
  const upPressed = useRef(false);
  const downPressed = useRef(false);

  useEffect(() => {
    if (Platform.OS === 'android') {
      KeyEvent.onKeyDownListener((event: { keyCode: number }) => {
        if (event.keyCode === VOLUME_UP) {
          upPressed.current = true;
        }
        if (event.keyCode === VOLUME_DOWN) {
          downPressed.current = true;
        }
        if (upPressed.current && downPressed.current) {
          BackHandler.exitApp();
        }
      });

      KeyEvent.onKeyUpListener((event: { keyCode: number }) => {
        if (
          event.keyCode === VOLUME_UP ||
          event.keyCode === VOLUME_DOWN
        ) {
          upPressed.current = false;
          downPressed.current = false;
        }
      });
    }

    return () => {
      if (Platform.OS === 'android') {
        KeyEvent.removeKeyDownListener();
        KeyEvent.removeKeyUpListener();
      }
    };
  }, []);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <LanguageProvider>
      <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
        {/* skrivamo status bar */}
        <StatusBar hidden />

        {/* tvoj glavni navigator */}
        <Stack>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen name="+not-found" />
        </Stack>
      </ThemeProvider>
    </LanguageProvider>
  );
}
