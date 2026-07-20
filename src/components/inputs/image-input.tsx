import { Colors, Spacing } from "@/constants/theme";
import { Image } from "expo-image";
import * as ImagePicker from "expo-image-picker";
import { Controller } from "react-hook-form";
import {
  Alert,
  Pressable,
  StyleSheet,
  useColorScheme,
  View,
} from "react-native";
import { ThemedText } from "../themed-text";

type Props = {
  name: string;
  label?: string;
  description?: string;
  control: any;
  error?: string;
};

export function ImageInput({
  name,
  label,
  control,
  description,
  error,
}: Props) {
  const scheme = useColorScheme();
  const colors =
    scheme === undefined || scheme === null ? Colors.light : Colors[scheme];

  const pickImage = async () => {
    const permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (permissionResult.granted === false) {
      Alert.alert(
        "Permissão necessária",
        "Você precisa permitir o acesso à galeria para escolher uma foto.",
      );
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      allowsEditing: true,
      aspect: [388, 210],
      quality: 0.8,
    });

    if (!result.canceled && result.assets && result.assets.length > 0) {
      const firstAsset = { ...result.assets[0] };
      const selectedUri = firstAsset.uri;
      return selectedUri;
    }
    return null;
  };

  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => {
        return (
          <View style={styles.container}>
            <View style={styles.label_container}>
              {label && <ThemedText themeColor="terciary">{label}</ThemedText>}
              {description && (
                <ThemedText type="small" themeColor="quaternary">
                  {description}
                </ThemedText>
              )}
            </View>
            <Pressable
              style={{ ...styles.image_box, backgroundColor: colors.secondary }}
              onPress={async () => field.onChange(await pickImage())}
            >
              {field.value ? (
                <View style={styles.preview_container}>
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
                      alt="Remover"
                    />
                  </Pressable>
                </View>
              ) : (
                <View style={styles.placeholder_container}>
                  <Image
                    style={{ width: 100, height: 100 }}
                    source={require("@/assets/images/icons/upload.svg")}
                    alt="Upload"
                  />
                  <ThemedText themeColor="quaternary">
                    Faça o upload de uma imagem
                  </ThemedText>
                </View>
              )}
            </Pressable>
            {error && (
              <ThemedText type="small" themeColor="warning">
                {error}
              </ThemedText>
            )}
          </View>
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
  },
  button: {
    position: "absolute",
    top: Spacing.two,
    right: Spacing.two,
    padding: Spacing.two,
    borderRadius: Spacing.two,
  },
});
