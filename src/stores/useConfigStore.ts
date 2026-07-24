import { STORAGE_KEYS } from "@/utils/storage-keys";
import { IConfigForm } from "@/validations/config-schema";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

type ConfigState = {
  config: Omit<IConfigForm, "gemini_api_key">;
  setConfig: (config: Omit<IConfigForm, "gemini_api_key">) => void;
};

export const useConfigStore = create<ConfigState>()(
  persist(
    (set) => ({
      config: {
        theme: "light",
        font_size: 100,
        letter_case: "none",
        font_weight: "default",
        language: "pt",
      },
      setConfig: (newConfig) =>
        set(() => ({
          config: newConfig,
        })),
    }),
    {
      name: STORAGE_KEYS.config,
      storage: createJSONStorage(() => AsyncStorage),
    },
  ),
);
