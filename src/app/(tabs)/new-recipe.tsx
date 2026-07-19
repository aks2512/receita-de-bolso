import { ImageInput } from "@/components/inputs/image-input";
import { Input } from "@/components/inputs/input";
import Select from "@/components/inputs/select";
import { ThemedButton } from "@/components/themed-button";
import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { RECIPE_CATEGORIES_OPTIONS } from "@/constants/categories";
import {
  BottomTabInset,
  Colors,
  MaxContentWidth,
  Spacing,
} from "@/constants/theme";
import { useRecipeStore } from "@/stores/useRecipeStore";
import { RecipeForm, RecipeSchema } from "@/validations/recipe-schema";
import { yupResolver } from "@hookform/resolvers/yup";
import { Image } from "expo-image";
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
import { SafeAreaView } from "react-native-safe-area-context";

export default function NewRecipe() {
  const addRecipe = useRecipeStore((state) => state.addRecipe);

  const scheme = useColorScheme();
  const colors =
    scheme === undefined || scheme === null ? Colors.light : Colors[scheme];

  // const formData = {
  //   id: undefined,
  //   category: { _index: 4, label: "Bolos", value: "cakes" },
  //   description: "Produto industrial ",
  //   image:
  //     "file:///data/user/0/host.exp.exponent/cache/ImagePicker/2e09e0ee-768c-4e28-99aa-ffd0fd9cdfee.jpeg",
  //   ingredients: [{ name: "Amendoim", quantity: "200 gramas" }],
  //   name: "Paçoca ",
  //   steps: [{ description: "Amassar amendoim " }],
  //   time: "20",
  // };

  const {
    control,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm({
    mode: "onChange",
    resolver: yupResolver(RecipeSchema),
    defaultValues: {
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

  const onSubmit = async (form: RecipeForm) => {
    try {
      addRecipe(form);
      Alert.alert("Sucesso", "Receita adicionada à sua lista local!");
      reset();
    } catch (error) {
      Alert.alert("Erro", "Não foi possível salvar a receita na lista.");
    }
  };

  return (
    <ThemedView style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          <ThemedView style={styles.main}>
            <ThemedText type="title" style={styles.title}>
              Nova receita
            </ThemedText>
            <View style={styles.input_group}>
              <ImageInput name="image" label="Imagem" control={control} />
              <Input
                name="name"
                label="Nome"
                control={control}
                placeholder="Digite o nome"
                error={errors?.name?.message}
              />
              <Input
                name="description"
                label="Descrição"
                description="(opcional)"
                control={control}
                placeholder="Digite a descrição"
                error={errors?.description?.message}
              />
              <Select
                name="category"
                label="Categoria"
                control={control}
                placeholder="Selecione a categoria"
                error={errors?.time?.message}
                options={RECIPE_CATEGORIES_OPTIONS}
              />
              <Input
                name="time"
                label="Tempo de preparo"
                description="(tempo em minutos)"
                control={control}
                placeholder="Digite o tempo de preparo"
                error={errors?.time?.message}
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
  scrollContent: {
    paddingBottom: BottomTabInset + Spacing.three,
  },
  main: {
    alignItems: "stretch",
    justifyContent: "flex-start",
    flex: 1,
    gap: Spacing.three,
    width: "100%",
  },
  title: {
    textAlign: "left",
  },
  input_group: {
    gap: Spacing.two,
  },
  ingredients_container: {
    gap: 8,
  },
  ingredients_header: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  ingredients_inputs: {
    gap: 16,
  },
  ingredients_input_group: {
    gap: 8,
  },
  steps_container: {
    gap: 8,
  },
  steps_header: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  steps_inputs: {
    gap: 8,
  },
  button: {
    padding: 8,
    borderRadius: 8,
  },
  buttons: {
    flexDirection: "row",
    gap: 8,
  },
});
