import { Input } from "@/components/inputs/input";
import Select from "@/components/inputs/select";
import { ThemedButton } from "@/components/themed-button";
import { ThemedView } from "@/components/themed-view";
import { LANGUAGE_OPTIONS } from "@/constants/languages";
import { MaxContentWidth, Spacing } from "@/constants/theme";
import { useThemeColors } from "@/hooks/use-theme-colors";
import { translations } from "@/i18n/translations";
import { useTranslation } from "@/i18n/useTranslation";
import { useConfigStore } from "@/stores/useConfigStore";
import { STORAGE_KEYS } from "@/utils/storage-keys";
import { ConfigSchema, IConfigForm } from "@/validations/config-schema";
import { yupResolver } from "@hookform/resolvers/yup";
import { useRouter } from "expo-router";
import * as SecureStore from "expo-secure-store";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { Alert, Platform, ScrollView, StyleSheet } from "react-native";
import { KeyboardAvoidingView } from "react-native-keyboard-controller";
import { SafeAreaView } from "react-native-safe-area-context";
import { Header } from "../header";
import { LetterCaseSelector } from "../inputs/letter-case-selector";
import { RangeInput } from "../inputs/range-input";
import { ThemeSelector } from "../inputs/theme-selector";
import { WeightSelector } from "../inputs/weight-selector";

type Props = {
  type?: "register" | "edit";
  formData: IConfigForm;
};

export function ConfigForm({ type = "register", formData }: Props) {
  const colors = useThemeColors();
  const router = useRouter();
  const setConfig = useConfigStore((state) => state.setConfig);
  const { t } = useTranslation();

  const languageOptions = LANGUAGE_OPTIONS.map((option) => ({
    ...option,
    label: t(option.labelKey as keyof typeof translations.pt),
  }));

  const { control, handleSubmit, watch } = useForm({
    mode: "onChange",
    resolver: yupResolver(ConfigSchema),
    defaultValues: formData,
  });

  const onSubmit = async (form: IConfigForm) => {
    try {
      if (type === "register") {
        await SecureStore.setItemAsync(
          STORAGE_KEYS.gemini_key,
          form.gemini_api_key,
        );
        Alert.alert(t("success_api_added"), t("success_api_added"));
        router.replace("/(tabs)");
      } else {
        await SecureStore.setItemAsync(
          STORAGE_KEYS.gemini_key,
          form.gemini_api_key,
        );
        Alert.alert(t("success_api_edited"), t("success_api_edited"));
      }
    } catch {
      Alert.alert(t("error_api_save"), t("error_api_save"));
    }
  };

  useEffect(() => {
    const subscription = watch((values) => {
      setConfig({
        theme: values.theme || "light",
        font_size: values.font_size || 100,
        letter_case: values.letter_case || "capitalize",
        font_weight: values.font_weight || "default",
        language: values.language || "pt",
      });
    });
    return () => subscription.unsubscribe();
  }, [watch]);

  return (
    <KeyboardAvoidingView style={{ flex: 1 }} behavior="padding">
      <ThemedView
        style={[styles.container, { backgroundColor: colors.background }]}
      >
        <SafeAreaView style={styles.safeArea}>
          <ScrollView
            style={styles.scroll_view}
            contentContainerStyle={styles.scroll_content}
            showsVerticalScrollIndicator={false}
          >
            <ThemedView
              style={[styles.main, { backgroundColor: colors.background }]}
            >
              <Header name={t("configuration")} />

              <ThemedView style={styles.input_group}>
                <ThemeSelector
                  name="theme"
                  label={t("theme")}
                  control={control}
                />
                <RangeInput
                  name="font_size"
                  control={control}
                  label={t("font_size")}
                  minimumValue={80}
                  maximumValue={150}
                  step={1}
                  unit="%"
                />
                <LetterCaseSelector
                  name="letter_case"
                  label={t("letter_case")}
                  control={control}
                />
                <WeightSelector
                  name="font_weight"
                  label={t("font_weight")}
                  control={control}
                />
                <Select
                  name="language"
                  control={control}
                  label={t("language")}
                  placeholder={t("language")}
                  options={languageOptions}
                />
              </ThemedView>
              <Input
                name="key"
                label={t("api_key")}
                control={control}
                placeholder={t("api_key")}
              />
              <ThemedButton
                type="title"
                themeColor="primary"
                onPress={handleSubmit(onSubmit)}
              >
                {t("save")}
              </ThemedButton>
            </ThemedView>
          </ScrollView>
        </SafeAreaView>
      </ThemedView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    flexDirection: "row",
    ...Platform.select({
      web: {
        paddingTop: 100,
      },
    }),
  },
  safeArea: {
    flex: 1,
    paddingHorizontal: Spacing.four,
    alignItems: "center",
    maxWidth: MaxContentWidth,
  },
  scroll_view: {
    width: "100%",
  },
  scroll_content: {},
  main: {
    alignItems: "stretch",
    justifyContent: "flex-start",
    flex: 1,
    gap: Spacing.three,
    width: "100%",
  },
  input_group: {
    gap: Spacing.two,
  },
});
