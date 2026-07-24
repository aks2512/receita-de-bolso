import { Input } from "@/components/inputs/input";
import { ThemedButton } from "@/components/themed-button";
import { ThemedView } from "@/components/themed-view";
import { MaxContentWidth, Spacing } from "@/constants/theme";
import { useThemeColors } from "@/hooks/use-theme-colors";
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
        Alert.alert("Sucesso", "API key adicionado com sucesso!");
        router.replace("/(tabs)");
      } else {
        await SecureStore.setItemAsync(
          STORAGE_KEYS.gemini_key,
          form.gemini_api_key,
        );
        Alert.alert("Sucesso", "API key editada com sucesso!");
      }
    } catch {
      Alert.alert("Erro", "Não foi possível salvar a API key");
    }
  };

  useEffect(() => {
    const subscription = watch((values) => {
      setConfig({
        theme: values.theme || "light",
        font_size: values.font_size || 100,
        letter_case: values.letter_case || "capitalize",
        font_weight: values.font_weight || "default",
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
              <Header name="Configuração" />

              <ThemedView style={styles.input_group}>
                <ThemeSelector name="theme" label="Tema" control={control} />
                <RangeInput
                  name="font_size"
                  control={control}
                  label="Tamanho da fonte"
                  minimumValue={80}
                  maximumValue={150}
                  step={1}
                  unit="%"
                />
                <LetterCaseSelector
                  name="letter_case"
                  label="Caixa de letra"
                  control={control}
                />
                <WeightSelector
                  name="font_weight"
                  label="Peso da fonte"
                  control={control}
                />
              </ThemedView>
              <Input
                name="key"
                label="Gemini API key"
                control={control}
                placeholder="Digite a API key"
              />
              <ThemedButton
                type="title"
                themeColor="primary"
                onPress={handleSubmit(onSubmit)}
              >
                Salvar
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
