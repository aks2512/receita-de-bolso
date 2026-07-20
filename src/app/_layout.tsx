import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import * as SplashScreen from "expo-splash-screen";
import { useColorScheme } from "react-native";

import { AnimatedSplashOverlay } from "@/components/animated-icon";
import { useUpdate } from "@/hooks/use-update";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { KeyboardProvider } from "react-native-keyboard-controller";
import { SafeAreaProvider } from "react-native-safe-area-context";

import { Poppins_600SemiBold, useFonts } from "@expo-google-fonts/poppins";

// 2. Importe os pesos da Open Sans
import {
  OpenSans_300Light,
  OpenSans_400Regular,
} from "@expo-google-fonts/open-sans";

SplashScreen.preventAutoHideAsync();

const App = () => {
  const isLoading = useUpdate();
  const colorScheme = useColorScheme();

  const [loaded] = useFonts({
    Poppins_600SemiBold,
    OpenSans_400Regular,
    OpenSans_300Light,
  });

  if (!loaded && isLoading) return null;

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
