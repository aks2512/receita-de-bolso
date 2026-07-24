// hooks/use-theme-colors.ts
import { Colors } from "@/constants/theme";
import { useConfigStore } from "@/stores/useConfigStore";
import { useColorScheme } from "react-native";

export function useThemeColors() {
  const config = useConfigStore((state) => state.config);
  const systemScheme = useColorScheme();

  const scheme = config.theme ? config.theme : (systemScheme ?? "light");

  return Colors[scheme as "light" | "dark"];
}
