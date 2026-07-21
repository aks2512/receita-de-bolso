import { useColorScheme } from "react-native";

import { Colors, Spacing } from "@/constants/theme";
import { Image } from "expo-image";
import { Tabs } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function AppTabs() {
  const scheme = useColorScheme();
  const colors =
    Colors[scheme === undefined || scheme === null ? "light" : scheme];
  const insets = useSafeAreaInsets();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.quaternary,
        tabBarStyle: {
          borderWidth: 1,
          backgroundColor: colors.white,
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
            fontSize: 16,
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
        name="new-recipe"
        options={{
          title: "Nova Receita",
          tabBarLabelStyle: {
            marginTop: 4,
            fontSize: 16,
            fontWeight: "regular",
            height: 40,
          },
          tabBarIcon: ({ color }) => (
            <Image
              source={require("@/assets/images/tabIcons/recipe.svg")}
              style={{ width: 40, height: 40, tintColor: color }}
            />
          ),
        }}
      />

      <Tabs.Screen
        name="account"
        options={{
          title: "Conta",
          tabBarLabelStyle: {
            marginTop: 4,
            fontSize: 16,
            fontWeight: "regular",
            height: 40,
          },
          tabBarIcon: ({ color }) => (
            <Image
              source={require("@/assets/images/tabIcons/account.svg")}
              style={{ width: 40, height: 40, tintColor: color }}
            />
          ),
        }}
      />
    </Tabs>
  );
}
