import { Input } from "@/components/inputs/input";
import { ThemedButton } from "@/components/themed-button";
import { ThemedView } from "@/components/themed-view";
import { Colors, MaxContentWidth, Spacing } from "@/constants/theme";
import { STORAGE_KEYS } from "@/utils/storage-keys";
import { IKeyForm, KeySchema } from "@/validations/key-schema";
import { yupResolver } from "@hookform/resolvers/yup";
import { useRouter } from "expo-router";
import * as SecureStore from "expo-secure-store";
import { useForm } from "react-hook-form";
import { Alert, Platform, ScrollView, StyleSheet, View } from "react-native";
import { KeyboardAvoidingView } from "react-native-keyboard-controller";
import { SafeAreaView } from "react-native-safe-area-context";
import { Header } from "../header";

type Props = {
  type?: "register" | "edit";
  formData?: Partial<IKeyForm>;
};

export function KeyForm({ type = "register", formData }: Props) {
  const router = useRouter();

  const { control, handleSubmit, reset } = useForm({
    mode: "onChange",
    resolver: yupResolver(KeySchema),
    defaultValues: { key: formData?.key || "" },
  });

  const onSubmit = async (form: IKeyForm) => {
    try {
      if (type === "register") {
        await SecureStore.setItemAsync(STORAGE_KEYS.gemini_key, form.key);
        Alert.alert("Sucesso", "API key adicionado com sucesso!");
        router.replace("/(tabs)");
      } else {
        await SecureStore.setItemAsync(STORAGE_KEYS.gemini_key, form.key);
        Alert.alert("Sucesso", "API key editada com sucesso!");
      }
    } catch (error) {
      Alert.alert("Erro", "Não foi possível salvar a API key");
    }
  };

  return (
    <KeyboardAvoidingView style={{ flex: 1 }} behavior="padding">
      <ThemedView style={styles.container}>
        <SafeAreaView style={styles.safeArea}>
          <ScrollView
            style={styles.scrollView}
            contentContainerStyle={styles.scrollContent}
            showsVerticalScrollIndicator={false}
          >
            <ThemedView style={styles.main}>
              <Header name="Conta" />
              <View style={styles.input_group}>
                <Input
                  name="key"
                  label="Gemini API key"
                  control={control}
                  placeholder="Digite a API key"
                />
              </View>
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
    backgroundColor: Colors.background,
  },
  safeArea: {
    flex: 1,
    paddingHorizontal: Spacing.four,
    alignItems: "center",
    maxWidth: MaxContentWidth,
  },
  scrollView: {
    width: "100%",
  },
  scrollContent: {},
  main: {
    alignItems: "stretch",
    justifyContent: "flex-start",
    flex: 1,
    gap: Spacing.three,
    width: "100%",
    backgroundColor: Colors.background,
  },
  input_group: {
    gap: Spacing.two,
  },
});
