import { ImageInput } from "@/components/inputs/image-input";
import { Input } from "@/components/inputs/input";
import Select from "@/components/inputs/select";
import { ThemedButton } from "@/components/themed-button";
import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { RECIPE_CATEGORIES_OPTIONS } from "@/constants/categories";
import { MaxContentWidth, Spacing } from "@/constants/theme";
import { useThemeColors } from "@/hooks/use-theme-colors";
import { translations } from "@/i18n/translations";
import { useTranslation } from "@/i18n/useTranslation";
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
  const { t } = useTranslation();

  const { mutate: createMutate, isPending: createIsPending } = useCreateRecipe({
    onSuccess: async () => {
      Alert.alert(t("success_recipe_added"), t("success_recipe_added"));
      await queryClient.invalidateQueries({ queryKey: ["get-recipes"] });
      reset();
      router.replace("/(tabs)");
    },
    onError: () => {
      Alert.alert(t("error_recipe_save"), t("error_recipe_save"));
    },
  });

  const { mutate: updateMutate, isPending: updateIsPending } = useUpdateRecipe({
    onSuccess: async () => {
      Alert.alert(t("success_recipe_edited"), t("success_recipe_edited"));
      reset();
      await queryClient.invalidateQueries({ queryKey: ["get-recipes"] });
      await queryClient.invalidateQueries({
        queryKey: ["get-recipe", formData?.id],
      });
      router.replace(`/recipes/${formData?.id}`);
    },
    onError: () => {
      Alert.alert(t("error_recipe_save"), t("error_recipe_save"));
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

  const categoryOptions = RECIPE_CATEGORIES_OPTIONS.map((option) => ({
    ...option,
    label: t(option.labelKey as keyof typeof translations.pt),
  }));

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
                name={type === "register" ? t("new_recipe") : t("edit_recipe")}
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
                <ImageInput name="image" label={t("image")} control={control} />
                <Input
                  name="name"
                  label={t("name")}
                  control={control}
                  placeholder={t("enter_name")}
                />
                <Input
                  name="description"
                  label={t("description")}
                  description={t("optional")}
                  control={control}
                  placeholder={t("enter_description")}
                />
                <Select
                  name="category"
                  label={t("category")}
                  control={control}
                  placeholder={t("select_category")}
                  options={categoryOptions}
                />
                <Input
                  name="time"
                  label={t("prep_time")}
                  keyboardType="number-pad"
                  description={t("optional")}
                  maskFunction={onlyNumbersMask}
                  control={control}
                  placeholder={t("enter_time")}
                />
                <ThemedView
                  style={[
                    styles.field_array_container,
                    { backgroundColor: colors.background },
                  ]}
                >
                  <ThemedText type="subtitle" themeColor="terciary">
                    {t("ingredients")}
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
                              accessibilityLabel={t("add_ingredient")}
                              accessibilityRole="button"
                              testID="add-ingredient"
                            >
                              <Image
                                style={{ width: 16, height: 16 }}
                                source={require("@/assets/images/icons/plus.svg")}
                                alt={t("add")}
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
                                accessibilityLabel={t("remove_ingredient")}
                                accessibilityRole="button"
                                testID={`remove-ingredient-${index}`}
                              >
                                <Image
                                  style={{ width: 16, height: 16 }}
                                  source={require("@/assets/images/icons/trash.svg")}
                                  alt={t("remove")}
                                />
                              </Pressable>
                            )}
                        </ThemedView>
                        <Input
                          control={control}
                          name={`ingredients.${index}.description`}
                          placeholder={t("enter_description")}
                          accessibilityLabel={`ingredient-${index}`}
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
                    {t("preparation")}
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
                              accessibilityLabel={t("add_step")}
                              accessibilityRole="button"
                              testID="add-step"
                            >
                              <Image
                                style={{ width: 16, height: 16 }}
                                source={require("@/assets/images/icons/plus.svg")}
                                alt={t("add")}
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
                                accessibilityLabel={t("remove_step")}
                                accessibilityRole="button"
                                testID={`remove-step-${index}`}
                              >
                                <Image
                                  style={{ width: 16, height: 16 }}
                                  source={require("@/assets/images/icons/trash.svg")}
                                  alt={t("remove")}
                                />
                              </Pressable>
                            )}
                        </ThemedView>
                        <Input
                          control={control}
                          name={`steps.${index}.description`}
                          placeholder={t("enter_description")}
                          accessibilityLabel={`step-${index}`}
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
