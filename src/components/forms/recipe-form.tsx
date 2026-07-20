import { ImageInput } from "@/components/inputs/image-input";
import { Input } from "@/components/inputs/input";
import Select from "@/components/inputs/select";
import { ThemedButton } from "@/components/themed-button";
import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { RECIPE_CATEGORIES_OPTIONS } from "@/constants/categories";
import { Colors, MaxContentWidth, Spacing } from "@/constants/theme";
import { useRecipeStore } from "@/stores/useRecipeStore";
import { onlyNumbersMask } from "@/utils/masks";
import { IRecipeForm, RecipeSchema } from "@/validations/recipe-schema";
import { yupResolver } from "@hookform/resolvers/yup";
import { Image } from "expo-image";
import { useRouter } from "expo-router";
import { useFieldArray, useForm } from "react-hook-form";
import {
  Alert,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  useColorScheme,
  View,
} from "react-native";
import { KeyboardAvoidingView } from "react-native-keyboard-controller";
import { SafeAreaView } from "react-native-safe-area-context";
import { Header } from "../header";

type Props = {
  type?: "register" | "edit";
  formData?: IRecipeForm;
};

export function RecipeForm({ type = "register", formData }: Props) {
  const addRecipe = useRecipeStore((state) => state.addRecipe);
  const editRecipe = useRecipeStore((state) => state.editRecipe);
  const router = useRouter();
  const scheme = useColorScheme();
  const colors =
    scheme === undefined || scheme === null ? Colors.light : Colors[scheme];

  const {
    control,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm({
    mode: "onChange",
    resolver: yupResolver(RecipeSchema),
    defaultValues: formData
      ? { id: formData.id as string, ...formData }
      : {
          id: undefined,
          ingredients: [
            {
              name: "",
              quantity: "",
            },
          ],
          steps: [
            {
              description: "",
            },
          ],
        },
  });

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
    try {
      if (type === "register") {
        addRecipe(form);
        Alert.alert("Sucesso", "Receita adicionada à sua lista local!");
        reset();
        router.replace("/(tabs)");
      } else {
        editRecipe(form);
        Alert.alert("Sucesso", "Receita editada com sucesso!");
        reset();
        router.replace(`/recipes/${formData?.id}`);
      }
    } catch (error) {
      Alert.alert("Erro", "Não foi possível salvar a receita na lista.");
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
              <Header
                name={type === "register" ? "Nova receita" : "Editar receita"}
                onBack={
                  type === "edit"
                    ? () => router.replace(`/recipes/${formData?.id}`)
                    : undefined
                }
              />
              <View style={styles.input_group}>
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
                  description="(minutos)"
                  maskFunction={onlyNumbersMask}
                  control={control}
                  placeholder="Digite o tempo"
                />
              </View>
              <View style={styles.ingredients_container}>
                <View style={styles.ingredients_header}>
                  <ThemedText type="subtitle" themeColor="terciary">
                    Ingredientes
                  </ThemedText>
                  <View style={styles.buttons}>
                    <Pressable
                      style={{
                        ...styles.button,
                        backgroundColor: colors.primary,
                      }}
                      onPress={() =>
                        ingredientAppend({
                          name: "",
                          quantity: "",
                        })
                      }
                    >
                      <Image
                        style={{ width: 16, height: 16 }}
                        source={require("@/assets/images/icons/plus.svg")}
                        alt="Adicionar"
                      />
                    </Pressable>
                    {ingredientFields.length > 0 && (
                      <Pressable
                        style={{
                          ...styles.button,
                          backgroundColor: colors.primary,
                        }}
                        onPress={() =>
                          ingredientRemove(ingredientFields.length - 1)
                        }
                      >
                        <Image
                          style={{ width: 16, height: 16 }}
                          source={require("@/assets/images/icons/remove.svg")}
                          alt="Remover"
                        />
                      </Pressable>
                    )}
                  </View>
                </View>
                <View style={styles.ingredients_inputs}>
                  {ingredientFields.map((field, index) => (
                    <View key={field.id} style={styles.ingredients_input_group}>
                      <Input
                        control={control}
                        name={`ingredients.${index}.name`}
                        placeholder="Digite o ingrediente"
                      />
                      <Input
                        control={control}
                        name={`ingredients.${index}.quantity`}
                        placeholder="Digite o quantidade"
                      />
                    </View>
                  ))}
                  {errors.ingredients?.message && (
                    <ThemedText type="small" themeColor="warning">
                      {errors.ingredients?.message}
                    </ThemedText>
                  )}
                </View>
              </View>
              <View style={styles.steps_container}>
                <View style={styles.steps_header}>
                  <ThemedText type="subtitle" themeColor="terciary">
                    Preparo
                  </ThemedText>
                  <View style={styles.buttons}>
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
                    {stepFields.length > 0 && (
                      <Pressable
                        style={{
                          ...styles.button,
                          backgroundColor: colors.primary,
                        }}
                        onPress={() => stepRemove(stepFields.length - 1)}
                      >
                        <Image
                          style={{ width: 16, height: 16 }}
                          source={require("@/assets/images/icons/remove.svg")}
                          alt="Remover"
                        />
                      </Pressable>
                    )}
                  </View>
                </View>
                <View style={styles.steps_inputs}>
                  {stepFields.map((field, index) => (
                    <View key={field.id} style={styles.ingredients_input_group}>
                      <Input
                        control={control}
                        name={`steps.${index}.description`}
                        placeholder="Digite a descrição"
                      />
                    </View>
                  ))}
                  {errors.steps?.message && (
                    <ThemedText type="small" themeColor="warning">
                      {errors.steps?.message}
                    </ThemedText>
                  )}
                </View>
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
  ingredients_container: {
    gap: Spacing.two,
  },
  ingredients_header: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  ingredients_inputs: {
    gap: Spacing.three,
  },
  ingredients_input_group: {
    gap: Spacing.two,
  },
  steps_container: {
    gap: Spacing.two,
  },
  steps_header: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  steps_inputs: {
    gap: Spacing.two,
  },
  button: {
    padding: Spacing.two,
    borderRadius: Spacing.two,
  },
  buttons: {
    flexDirection: "row",
    gap: Spacing.two,
  },
});
