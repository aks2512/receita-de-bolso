import { useConfigStore } from "@/stores/useConfigStore";
import { Locale, translations } from "./translations";

export function useTranslation() {
  const config = useConfigStore((state) => state.config);
  console.log({ language: config.language });
  const language = config?.language ?? "pt";
  const locale = (language || "pt") as Locale;

  function t(key: keyof (typeof translations)[Locale]) {
    return translations[locale]?.[key] ?? key;
  }

  return { t, locale };
}
