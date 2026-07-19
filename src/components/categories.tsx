import { Colors } from "@/constants/theme";
import { Image } from "expo-image";
import {
  Pressable,
  ScrollView,
  StyleSheet,
  useColorScheme,
  View,
} from "react-native";
import { ThemedText } from "./themed-text";

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
  const scheme = useColorScheme();
  const colors =
    scheme === undefined || scheme === null ? Colors.light : Colors[scheme];

  return (
    <View style={styles.container}>
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
            <View
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
            </View>
            <ThemedText key={index} type="small">
              {category.text}
            </ThemedText>
          </Pressable>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "column",
    gap: 8,
    overflowX: "auto",
  },
  categories_content_container: {
    display: "flex",
    gap: 10,
    alignItems: "flex-start",
  },
  category_container: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    gap: 4,
  },
  category_image: {
    width: 80,
    height: 80,
    borderRadius: 8,
    padding: 10,
  },
});
