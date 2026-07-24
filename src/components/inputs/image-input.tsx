import { Spacing } from "@/constants/theme";
import { useThemeColors } from "@/hooks/use-theme-colors";
import { useTranslation } from "@/i18n/useTranslation";
import { Image } from "expo-image";
import * as ImagePicker from "expo-image-picker";
import { Controller } from "react-hook-form";
import { Alert, Pressable, StyleSheet } from "react-native";
import { ThemedText } from "../themed-text";
import { ThemedView } from "../themed-view";

type Props = {
  name: string;
  label?: string;
  description?: string;
  control: any;
};

export function ImageInput({ name, label, control, description }: Props) {
  const colors = useThemeColors();

  const { t } = useTranslation();

  const pickFromLibrary = async (): Promise<string | null> => {
    const permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (!permissionResult.granted) {
      Alert.alert(t("permission_needed"), t("permission_gallery"));
      return null;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      allowsEditing: true,
      aspect: [388, 210],
      quality: 0.8,
    });

    if (!result.canceled && result.assets && result.assets.length > 0) {
      return result.assets[0].uri;
    }
    return null;
  };

  const pickFromCamera = async (): Promise<string | null> => {
    const permissionResult = await ImagePicker.requestCameraPermissionsAsync();

    if (!permissionResult.granted) {
      Alert.alert(t("permission_needed"), t("permission_camera"));
      return null;
    }

    const result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [388, 210],
      quality: 0.8,
    });

    if (!result.canceled && result.assets && result.assets.length > 0) {
      return result.assets[0].uri;
    }
    return null;
  };

  const pickImage = (onChange: (uri: string | null) => void) => {
    Alert.alert(t("add_image_title"), t("add_image_question"), [
      {
        text: t("image_camera"),
        onPress: async () => onChange(await pickFromCamera()),
      },
      {
        text: t("image_gallery"),
        onPress: async () => onChange(await pickFromLibrary()),
      },
      { text: t("cancel"), style: "cancel" },
    ]);
  };

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => {
        return (
          <ThemedView
            style={[styles.container, { backgroundColor: colors.background }]}
          >
            <ThemedView
              style={[
                styles.label_container,
                { backgroundColor: colors.background },
              ]}
            >
              {label && <ThemedText themeColor="terciary">{label}</ThemedText>}
              {description && (
                <ThemedText type="small" themeColor="quaternary">
                  {description}
                </ThemedText>
              )}
            </ThemedView>
            <Pressable
              style={{
                ...styles.image_box,
                backgroundColor: colors.secondary,
              }}
              onPress={() => pickImage(field.onChange)}
            >
              {field.value ? (
                <ThemedView type="secondary" style={styles.preview_container}>
                  <Image
                    source={{ uri: field.value }}
                    style={styles.preview_image}
                  />
                  <Pressable
                    style={{
                      ...styles.button,
                      backgroundColor: colors.warning,
                    }}
                    onPress={() => field.onChange(null)}
                  >
                    <Image
                      style={{ width: 16, height: 16 }}
                      source={require("@/assets/images/icons/trash.svg")}
                      alt={t("remove")}
                    />
                  </Pressable>
                </ThemedView>
              ) : (
                <ThemedView
                  type="secondary"
                  style={[styles.placeholder_container]}
                >
                  <Image
                    style={{ width: 100, height: 100 }}
                    source={require("@/assets/images/icons/upload.svg")}
                    alt={t("upload_image")}
                  />
                  <ThemedText themeColor="quaternary">
                    {t("upload_image")}
                  </ThemedText>
                </ThemedView>
              )}
            </Pressable>
            {error && (
              <ThemedText type="small" themeColor="warning">
                {error.message}
              </ThemedText>
            )}
          </ThemedView>
        );
      }}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    gap: Spacing.two,
  },
  label_container: {
    flexDirection: "row",
    alignItems: "center",
    gap: Spacing.two,
  },
  image_box: {
    width: "100%",
    height: 212,
    borderRadius: Spacing.two,
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
    gap: Spacing.two,
  },
  preview_container: {
    width: "100%",
    height: "100%",
    position: "relative",
  },
  preview_image: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
  },
  placeholder_container: {
    alignItems: "center",
    justifyContent: "center",
    padding: Spacing.two,
  },
  button: {
    position: "absolute",
    top: Spacing.two,
    right: Spacing.two,
    padding: Spacing.two,
    borderRadius: Spacing.two,
  },
});
