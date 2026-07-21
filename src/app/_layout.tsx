import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import * as SplashScreen from "expo-splash-screen";
import { useColorScheme } from "react-native";

import { AnimatedSplashOverlay } from "@/components/animated-icon";
import { useUpdate } from "@/hooks/use-update";
import { Stack, useRouter } from "expo-router";
import { useShareIntent } from "expo-share-intent";
import { StatusBar } from "expo-status-bar";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { KeyboardProvider } from "react-native-keyboard-controller";
import { SafeAreaProvider } from "react-native-safe-area-context";

import { Poppins_600SemiBold, useFonts } from "@expo-google-fonts/poppins";

import {
  OpenSans_300Light,
  OpenSans_400Regular,
} from "@expo-google-fonts/open-sans";
import { useEffect } from "react";

SplashScreen.preventAutoHideAsync();

const App = () => {
  const router = useRouter();
  const { hasShareIntent, shareIntent, resetShareIntent } = useShareIntent();

  const isLoading = useUpdate();
  const colorScheme = useColorScheme();

  const [loaded] = useFonts({
    Poppins_600SemiBold,
    OpenSans_400Regular,
    OpenSans_300Light,
  });

  if (!loaded && isLoading) return null;

  useEffect(() => {
    (async () => {
      if (hasShareIntent && shareIntent.files) {
        router.push({
          pathname: "/new-recipe",
          params: { type: "photo", content: shareIntent.files?.[0]?.path },
        });
        resetShareIntent();
      }
    })();
  }, [hasShareIntent, shareIntent]);

  return (
    <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
      <AnimatedSplashOverlay />
      <GestureHandlerRootView style={{ flex: 1 }}>
        <KeyboardProvider>
          <SafeAreaProvider>
            <StatusBar />
            <Stack
              screenOptions={{
                animation: "fade",
                headerShown: false,
                gestureEnabled: false,
                contentStyle: {
                  backgroundColor: "#F9F9F9",
                },
              }}
            />
          </SafeAreaProvider>
        </KeyboardProvider>
      </GestureHandlerRootView>
    </ThemeProvider>
  );
};

export default App;
