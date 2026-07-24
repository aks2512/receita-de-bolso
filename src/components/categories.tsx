import { Spacing } from "@/constants/theme";
import { useThemeColors } from "@/hooks/use-theme-colors";
import { Image } from "expo-image";
import { Pressable, ScrollView, StyleSheet } from "react-native";
import { ThemedText } from "./themed-text";
import { ThemedView } from "./themed-view";

type Props = {
  categories?: {
    text: string;
    image: any;
    value: string;
  }[];
  onChange: (value: string) => void;
  selected: string;
};

export const Categories = ({ categories, selected, onChange }: Props) => {
  const colors = useThemeColors();

  return (
    <ThemedView
      style={[styles.container, { backgroundColor: colors.background }]}
    >
      <ThemedText type="subtitle">Categorias</ThemedText>
      <ScrollView
        horizontal
        contentContainerStyle={styles.categories_content_container}
        showsHorizontalScrollIndicator={false}
      >
        {categories?.map((category, index) => (
          <Pressable
            key={category.value}
            onPress={() => onChange(category.value)}
            style={styles.category_container}
          >
            <ThemedView
              style={{
                ...styles.category_image,
                backgroundColor:
                  category.value === selected
                    ? colors.primary
                    : colors.secondary,
              }}
            >
              <Image
                style={{
                  width: 60,
                  height: 60,
                  tintColor:
                    category.value === selected
                      ? colors.white
                      : colors.terciary,
                }}
                source={category.image}
                alt={category.text}
              />
            </ThemedView>
            <ThemedText key={index} type="small">
              {category.text}
            </ThemedText>
          </Pressable>
        ))}
      </ScrollView>
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    gap: Spacing.two,
    overflowX: "auto",
  },
  categories_content_container: {
    gap: Spacing.two,
    alignItems: "flex-start",
  },
  category_container: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    gap: Spacing.one,
  },
  category_image: {
    width: 80,
    height: 80,
    borderRadius: Spacing.two,
    padding: Spacing.two,
  },
});
