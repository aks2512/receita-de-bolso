import { useConfigStore } from "@/stores/useConfigStore";
import { Locale, TranslationKeys, translations } from "./translations";

export function useTranslation() {
  const config = useConfigStore((state) => state.config);
  const language = config?.language ?? "pt";
  const locale = (language.value || "pt") as Locale;

  function t(key: TranslationKeys) {
    return translations[locale]?.[key] ?? key;
  }

  return { t, locale };
}
