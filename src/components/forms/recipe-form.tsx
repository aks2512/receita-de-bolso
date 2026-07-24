import { ImageInput } from "@/components/inputs/image-input";
import { Input } from "@/components/inputs/input";
import Select from "@/components/inputs/select";
import { ThemedButton } from "@/components/themed-button";
import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { RECIPE_CATEGORIES_OPTIONS } from "@/constants/categories";
import { MaxContentWidth, Spacing } from "@/constants/theme";
import { useThemeColors } from "@/hooks/use-theme-colors";
import { useCreateRecipe } from "@/requests/create-recipe";
import { useUpdateRecipe } from "@/requests/update-recipe";
import { onlyNumbersMask } from "@/utils/masks";
import { IRecipeForm, RecipeSchema } from "@/validations/recipe-schema";
import { yupResolver } from "@hookform/resolvers/yup";
import { useQueryClient } from "@tanstack/react-query";
import { Image } from "expo-image";
import { useRouter } from "expo-router";
import { useEffect } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import {
  Alert,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
} from "react-native";
import { KeyboardAvoidingView } from "react-native-keyboard-controller";
import { SafeAreaView } from "react-native-safe-area-context";
import { Header } from "../header";

type Props = {
  type?: "register" | "edit";
  formData?: Partial<IRecipeForm>;
};

export function RecipeForm({ type = "register", formData }: Props) {
  const queryClient = useQueryClient();
  const router = useRouter();
  const colors = useThemeColors();

  const { mutate: createMutate, isPending: createIsPending } = useCreateRecipe({
    onSuccess: async () => {
      Alert.alert("Sucesso", "Receita adicionada à sua lista local!");
      await queryClient.invalidateQueries({ queryKey: ["get-recipes"] });
      reset();
      router.replace("/(tabs)");
    },
    onError: () => {
      Alert.alert("Erro", "Não foi possível salvar a receita na lista.");
    },
  });

  const { mutate: updateMutate, isPending: updateIsPending } = useUpdateRecipe({
    onSuccess: async () => {
      Alert.alert("Sucesso", "Receita editada com sucesso!");
      reset();
      await queryClient.invalidateQueries({ queryKey: ["get-recipes"] });
      await queryClient.invalidateQueries({
        queryKey: ["get-recipe", formData?.id],
      });
      router.replace(`/recipes/${formData?.id}`);
    },
    onError: () => {
      Alert.alert("Erro", "Não foi possível salvar a receita na lista.");
    },
  });

  const {
    control,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm({
    mode: "onChange",
    resolver: yupResolver(RecipeSchema),
    defaultValues: {
      id: undefined,
      ingredients: [
        {
          description: "",
        },
      ],
      steps: [
        {
          description: "",
        },
      ],
    },
  });

  useEffect(() => {
    reset(formData);
  }, [formData]);

  const {
    fields: ingredientFields,
    append: ingredientAppend,
    remove: ingredientRemove,
  } = useFieldArray({
    name: "ingredients",
    control,
  });

  const {
    fields: stepFields,
    append: stepAppend,
    remove: stepRemove,
  } = useFieldArray({
    name: "steps",
    control,
  });

  const onSubmit = async (form: IRecipeForm) => {
    if (type === "register") {
      createMutate(form);
    } else {
      updateMutate(form);
    }
  };

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
              <Header
                name={type === "register" ? "Nova receita" : "Editar receita"}
                onBack={
                  type === "edit"
                    ? () => router.replace(`/recipes/${formData?.id}`)
                    : () => router.replace("/")
                }
              />
              <ThemedView
                style={[
                  styles.input_group,
                  { backgroundColor: colors.background },
                ]}
              >
                <ImageInput name="image" label="Imagem" control={control} />
                <Input
                  name="name"
                  label="Nome"
                  control={control}
                  placeholder="Digite o nome"
                />
                <Input
                  name="description"
                  label="Descrição"
                  description="(opcional)"
                  control={control}
                  placeholder="Digite a descrição"
                />
                <Select
                  name="category"
                  label="Categoria"
                  control={control}
                  placeholder="Selecione a categoria"
                  options={RECIPE_CATEGORIES_OPTIONS}
                />
                <Input
                  name="time"
                  label="Tempo de preparo"
                  keyboardType="number-pad"
                  description="(opcional)"
                  maskFunction={onlyNumbersMask}
                  control={control}
                  placeholder="Digite o tempo em minutos"
                />
                <ThemedView
                  style={[
                    styles.field_array_container,
                    { backgroundColor: colors.background },
                  ]}
                >
                  <ThemedText type="subtitle" themeColor="terciary">
                    Ingredientes
                  </ThemedText>
                  <ThemedView
                    style={[
                      styles.field_array_inputs,
                      { backgroundColor: colors.background },
                    ]}
                  >
                    {ingredientFields.map((field, index) => (
                      <ThemedView
                        key={field.id}
                        style={[
                          styles.field_array_input_container,
                          { backgroundColor: colors.background },
                        ]}
                      >
                        <ThemedView
                          style={[
                            styles.buttons,
                            { backgroundColor: colors.background },
                          ]}
                        >
                          {ingredientFields.length - 1 === index && (
                            <Pressable
                              style={{
                                ...styles.button,
                                backgroundColor: colors.primary,
                              }}
                              onPress={() =>
                                ingredientAppend({
                                  description: "",
                                })
                              }
                            >
                              <Image
                                style={{ width: 16, height: 16 }}
                                source={require("@/assets/images/icons/plus.svg")}
                                alt="Adicionar"
                              />
                            </Pressable>
                          )}
                          {ingredientFields.length > 0 &&
                            index !== 0 &&
                            ingredientFields.length - 1 === index && (
                              <Pressable
                                style={{
                                  ...styles.button,
                                  backgroundColor: colors.warning,
                                }}
                                onPress={() => ingredientRemove(index)}
                              >
                                <Image
                                  style={{ width: 16, height: 16 }}
                                  source={require("@/assets/images/icons/trash.svg")}
                                  alt="Remover"
                                />
                              </Pressable>
                            )}
                        </ThemedView>
                        <Input
                          control={control}
                          name={`ingredients.${index}.description`}
                          placeholder="Digite a descrição"
                        />
                      </ThemedView>
                    ))}
                    {errors.steps?.message && (
                      <ThemedText type="small" themeColor="warning">
                        {errors.steps?.message}
                      </ThemedText>
                    )}
                  </ThemedView>
                </ThemedView>
                <ThemedView
                  style={[
                    styles.field_array_container,
                    { backgroundColor: colors.background },
                  ]}
                >
                  <ThemedText type="subtitle" themeColor="terciary">
                    Preparo
                  </ThemedText>
                  <ThemedView style={styles.field_array_inputs}>
                    {stepFields.map((field, index) => (
                      <ThemedView
                        key={field.id}
                        style={[
                          styles.field_array_input_container,
                          { backgroundColor: colors.background },
                        ]}
                      >
                        <ThemedView
                          style={[
                            styles.buttons,
                            { backgroundColor: colors.background },
                          ]}
                        >
                          {stepFields.length - 1 === index && (
                            <Pressable
                              style={{
                                ...styles.button,
                                backgroundColor: colors.primary,
                              }}
                              onPress={() =>
                                stepAppend({
                                  description: "",
                                })
                              }
                            >
                              <Image
                                style={{ width: 16, height: 16 }}
                                source={require("@/assets/images/icons/plus.svg")}
                                alt="Adicionar"
                              />
                            </Pressable>
                          )}
                          {stepFields.length > 0 &&
                            index !== 0 &&
                            stepFields.length - 1 === index && (
                              <Pressable
                                style={{
                                  ...styles.button,
                                  backgroundColor: colors.warning,
                                }}
                                onPress={() => stepRemove(index)}
                              >
                                <Image
                                  style={{ width: 16, height: 16 }}
                                  source={require("@/assets/images/icons/trash.svg")}
                                  alt="Remover"
                                />
                              </Pressable>
                            )}
                        </ThemedView>
                        <Input
                          control={control}
                          name={`steps.${index}.description`}
                          placeholder="Digite a descrição"
                        />
                      </ThemedView>
                    ))}
                    {errors.steps?.message && (
                      <ThemedText type="small" themeColor="warning">
                        {errors.steps?.message}
                      </ThemedText>
                    )}
                  </ThemedView>
                </ThemedView>
              </ThemedView>
              <ThemedButton
                type="title"
                themeColor="primary"
                disabled={createIsPending || updateIsPending}
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
  field_array_container: {
    gap: Spacing.two,
  },
  field_array_inputs: {
    gap: Spacing.two,
  },
  field_array_input_container: {
    width: "100%",
    alignItems: "flex-end",
    gap: Spacing.one,
  },
  buttons: {
    width: "auto",
    flexDirection: "row",
    gap: Spacing.two,
  },
  button: {
    padding: Spacing.two,
    borderRadius: Spacing.two,
  },
});
