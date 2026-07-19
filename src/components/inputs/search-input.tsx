import { Colors, Spacing } from "@/constants/theme";
import { Image } from "expo-image";
import React, { ComponentProps } from "react";
import { Controller } from "react-hook-form";
import {
  Platform,
  StyleSheet,
  TextInput,
  useColorScheme,
  View,
} from "react-native";

type Props = Omit<ComponentProps<typeof TextInput>, "style"> & {
  name: string;
  control: any;
};

export const SearchInput = ({ name, control, ...rest }: Props) => {
  const scheme = useColorScheme();
  const colors =
    scheme === undefined || scheme === null ? Colors.light : Colors[scheme];

  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <View
          style={{
            ...styles.container,
            borderColor: colors.quaternary,
            backgroundColor: colors.white,
          }}
        >
          <TextInput
            placeholderTextColor={colors.quinary}
            style={{ ...styles.input, color: colors.quaternary }}
            onChangeText={field.onChange}
            value={field.value}
            {...rest}
          />
          <Image
            style={styles.image}
            alt="Pesquisar"
            source={require("@/assets/images/icons/search.svg")}
          />
        </View>
      )}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    position: "relative",
    width: "100%",
    paddingHorizontal: Spacing.three,
    paddingVertical: Spacing.two,
    borderWidth: 1,
    borderRadius: 8,
    gap: 8,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  input: {
    width: "100%",
    fontSize: 14,
    fontWeight: "300",
    ...Platform.select({
      web: {
        outlineStyle: "none" as any,
      },
    }),
  },
  image: {
    width: 24,
    height: 24,
    position: "absolute",
    right: 16,
  },
});
