import { Colors } from "@/constants/theme";
import { generateRecipePDF } from "@/utils/export";
import { RecipeForm } from "@/validations/recipe-schema";
import { Image } from "expo-image";
import { Link } from "expo-router";
import React from "react";
import { Pressable, StyleSheet, useColorScheme, View } from "react-native";
import { ThemedText } from "./themed-text";

type Props = {
  recipes: RecipeForm[];
};

export const Recipes = ({ recipes }: Props) => {
  const scheme = useColorScheme();
  const colors =
    scheme === undefined || scheme === null ? Colors.light : Colors[scheme];

  return (
    <View style={styles.container}>
      <ThemedText type="subtitle">Receitas</ThemedText>
      <View style={styles.list}>
        {recipes.map((item) => (
          <Link
            key={item.id}
            href={{
              pathname: "/recipes/[id]",
              params: { id: item.id as string, name: item.name },
            }}
            style={styles.link}
          >
            <View style={styles.item}>
              <View>
                <ThemedText
                  style={styles.item_time}
                  type="small"
                  themeColor="terciary"
                >
                  {item.time} min
                </ThemedText>
                <Image
                  style={styles.item_image}
                  source={item.image}
                  alt={item.name}
                />
                <Pressable
                  style={styles.item_export}
                  onPress={async () => await generateRecipePDF(item)}
                >
                  <Image
                    style={{ width: 30, height: 30 }}
                    source={require("@/assets/images/icons/export.svg")}
                    alt="Exportar"
                  />
                </Pressable>
              </View>
              <View
                style={{
                  ...styles.item_content,
                  backgroundColor: colors.secondary,
                }}
              >
                <ThemedText type="default" themeColor="quinary">
                  {item.name}
                </ThemedText>
              </View>
            </View>
          </Link>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    flexDirection: "column",
    gap: 8,
  },
  list: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 16,
  },
  link: {
    lineHeight: 0,
    fontSize: 0,
  },
  item: {
    position: "relative",
    width: "100%",
    maxWidth: 352,
    minWidth: 300,
    borderRadius: 8,
    alignSelf: "flex-start",
    overflow: "hidden",
  },
  item_time: {
    position: "absolute",
    top: 10,
    left: 10,
    zIndex: 1,
    padding: 8,
    borderRadius: 8,
    backgroundColor: "#ffffff",
  },
  item_export: {
    position: "absolute",
    top: 10,
    right: 10,
    zIndex: 1,
    padding: 4,
    borderRadius: 8,
    backgroundColor: "#ffffff",
  },
  item_image: {
    lineHeight: 0,
    width: "100%",
    height: 200,
  },
  item_content: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
  },
});
