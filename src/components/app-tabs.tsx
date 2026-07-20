import { useColorScheme } from "react-native";

import { Colors } from "@/constants/theme";
import { Image } from "expo-image";
import { Tabs } from "expo-router";

export default function AppTabs() {
  const scheme = useColorScheme();
  const colors =
    Colors[scheme === undefined || scheme === null ? "light" : scheme];

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
          height: 140,
          flexDirection: "row",
          paddingTop: 16,
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
            height: 20,
            fontSize: 16,
            fontWeight: "regular",
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
            height: 20,
            fontSize: 16,
          },
          tabBarIcon: ({ color }) => (
            <Image
              source={require("@/assets/images/tabIcons/recipe.svg")}
              style={{ width: 40, height: 40, tintColor: color }}
            />
          ),
        }}
      />
    </Tabs>
  );
}
