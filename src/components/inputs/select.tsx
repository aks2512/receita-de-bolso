import { Colors, Spacing } from "@/constants/theme";
import { Option } from "@/types/option";
import React from "react";
import { Controller } from "react-hook-form";
import { StyleSheet, useColorScheme, View } from "react-native";
import { Dropdown } from "react-native-element-dropdown";
import { ThemedText } from "../themed-text";

type Props = {
  control: any;
  name: string;
  label?: string;
  placeholder: string;
  description?: string;
  options: Option[];
};

export default function Select({
  control,
  name,
  label,
  description,
  options,
  placeholder,
}: Props) {
  const scheme = useColorScheme();
  const colors =
    scheme === undefined || scheme === null ? Colors.light : Colors[scheme];

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <View style={styles.container}>
          <View style={styles.label_container}>
            {label && <ThemedText themeColor="terciary">{label}</ThemedText>}
            {description && (
              <ThemedText type="small" themeColor="quaternary">
                {description}
              </ThemedText>
            )}
          </View>
          <Dropdown
            style={{ ...styles.dropdown, borderColor: colors.quaternary }}
            placeholderStyle={{
              ...styles.placeholder_text,
              color: colors.quinary,
            }}
            selectedTextStyle={{
              ...styles.selected_text,
              color: colors.terciary,
            }}
            iconColor={colors.terciary}
            itemContainerStyle={styles.item}
            itemTextStyle={{ ...styles.item_text, color: colors.terciary }}
            inputSearchStyle={styles.input_search}
            containerStyle={{ ...styles.menu, borderColor: colors.quaternary }}
            data={options}
            maxHeight={300}
            labelField="label"
            valueField="value"
            placeholder={placeholder}
            value={field.value}
            onChange={field.onChange}
          />
          {error?.message && (
            <ThemedText type="small" themeColor="warning">
              {error.message}
            </ThemedText>
          )}
        </View>
      )}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    flexDirection: "column",
    gap: Spacing.two,
  },
  label_container: {
    flexDirection: "row",
    alignItems: "center",
    gap: Spacing.two,
  },
  dropdown: {
    borderWidth: 1,
    borderRadius: Spacing.two,
    paddingHorizontal: Spacing.two,
    paddingVertical: Spacing.three,
    backgroundColor: "#ffffff",
  },
  menu: {
    borderWidth: 1,
    borderRadius: Spacing.two,
    shadowColor: "transparent",
    shadowOpacity: 0,
    shadowRadius: 0,
    shadowOffset: { width: 0, height: 0 },
    elevation: 0,
    marginTop: 6,
    padding: 0,
    gap: 0,
    overflow: "hidden",
  },
  placeholder_text: {
    fontSize: 14,
    fontWeight: 300,
  },
  item: {
    paddingHorizontal: Spacing.two,
  },
  item_text: {
    fontSize: 14,
    fontWeight: 300,
  },
  selected_text: {
    fontSize: 14,
    fontWeight: 300,
  },
  input_search: {
    height: 40,
    fontSize: 14,
    fontWeight: 300,
  },
});
