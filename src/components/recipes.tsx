import { Spacing } from "@/constants/theme";
import { useThemeColors } from "@/hooks/use-theme-colors";
import { useTranslation } from "@/i18n/useTranslation";
import { generateRecipePDF } from "@/utils/export";
import { IRecipeForm } from "@/validations/recipe-schema";
import { Image } from "expo-image";
import { Link } from "expo-router";
import React from "react";
import { Pressable, StyleSheet } from "react-native";
import { ThemedText } from "./themed-text";
import { ThemedView } from "./themed-view";

type Props = {
  recipes: IRecipeForm[];
};

export const Recipes = ({ recipes }: Props) => {
  const colors = useThemeColors();
  const { t } = useTranslation();

  return (
    <ThemedView
      style={[styles.container, { backgroundColor: colors.background }]}
    >
      <ThemedText type="subtitle">{t("recipes")}</ThemedText>
      {recipes.length > 0 ? (
        <ThemedView
          style={[styles.list, { backgroundColor: colors.background }]}
        >
          {recipes.map((item) => (
            <Link
              key={item.id}
              href={{
                pathname: "/recipes/[id]",
                params: { id: item.id as string, name: item.name },
              }}
              style={styles.link}
            >
              <ThemedView style={styles.item}>
                <ThemedView>
                  {item.time && (
                    <ThemedText
                      style={styles.item_time}
                      type="small"
                      themeColor="terciary"
                    >
                      {item.time} min
                    </ThemedText>
                  )}
                  <Image
                    style={styles.item_image}
                    source={
                      item.image || require("@/assets/images/no-image.png")
                    }
                    alt={item.name}
                  />
                  <Pressable
                    style={styles.item_export}
                    onPress={async () => await generateRecipePDF(item)}
                  >
                    <Image
                      style={{ width: 30, height: 30 }}
                      source={require("@/assets/images/icons/export.svg")}
                      alt={t("export")}
                    />
                  </Pressable>
                </ThemedView>
                <ThemedView
                  style={{
                    ...styles.item_content,
                    backgroundColor: colors.secondary,
                  }}
                >
                  <ThemedText style={styles.item_text} themeColor="quinary">
                    {item.name}
                  </ThemedText>
                </ThemedView>
              </ThemedView>
            </Link>
          ))}
        </ThemedView>
      ) : (
        <ThemedText>{t("no_recipe_found")}</ThemedText>
      )}
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    flexDirection: "column",
    gap: Spacing.two,
  },
  list: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    gap: Spacing.three,
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
    borderRadius: Spacing.two,
    alignSelf: "flex-start",
    overflow: "hidden",
  },
  item_time: {
    position: "absolute",
    top: Spacing.two,
    left: Spacing.two,
    zIndex: 1,
    padding: Spacing.two,
    borderRadius: Spacing.two,
    backgroundColor: "#ffffff",
  },
  item_export: {
    position: "absolute",
    top: Spacing.two,
    right: Spacing.two,
    zIndex: 1,
    padding: Spacing.one,
    borderRadius: Spacing.two,
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
    padding: Spacing.three,
  },
  item_text: {
    flex: 0,
  },
});
