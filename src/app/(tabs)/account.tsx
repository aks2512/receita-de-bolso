import { KeyForm } from "@/components/forms/key-form";
import { STORAGE_KEYS } from "@/utils/storage-keys";
import * as SecureStore from "expo-secure-store";

export default function Account() {
  const savedKey = SecureStore.getItem(STORAGE_KEYS.gemini_key);

  return (
    <KeyForm
      type={savedKey ? "edit" : "register"}
      formData={{ key: savedKey || "" }}
    />
  );
}
