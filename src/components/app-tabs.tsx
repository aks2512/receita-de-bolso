import { Spacing } from "@/constants/theme";
import { useThemeColors } from "@/hooks/use-theme-colors";
import { useConfigStore } from "@/stores/useConfigStore";
import { Image } from "expo-image";
import { Tabs } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function AppTabs() {
  const config = useConfigStore((state) => state.config);
  const fontSizeMult = config.font_size / 100;
  const colors = useThemeColors();
  const insets = useSafeAreaInsets();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.quaternary,
        tabBarStyle: {
          borderWidth: 1,
          backgroundColor: colors.background,
          borderColor: colors.secondary,
          justifyContent: "center",
          alignItems: "baseline",
          height: 120 + insets.bottom,
          flexDirection: "row",
          paddingTop: Spacing.three,
          paddingBottom: insets.bottom > 0 ? insets.bottom : Spacing.three,
        },
        headerShown: false,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarLabelStyle: {
            marginTop: 4,
            fontSize: 16 * fontSizeMult,
            fontWeight: "regular",
            height: 40,
          },
          tabBarIcon: ({ color }) => (
            <Image
              source={require("@/assets/images/tabIcons/home.svg")}
              style={{ width: 40, height: 40, tintColor: color }}
            />
          ),
        }}
      />

      <Tabs.Screen
        name="config"
        options={{
          title: "Configuração",
          tabBarLabelStyle: {
            marginTop: 4,
            fontSize: 16 * fontSizeMult,
            fontWeight: "regular",
            height: 40,
          },
          tabBarIcon: ({ color }) => (
            <Image
              source={require("@/assets/images/tabIcons/config.svg")}
              style={{ width: 40, height: 40, tintColor: color }}
            />
          ),
        }}
      />
    </Tabs>
  );
}
