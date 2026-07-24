import { ConfigForm } from "@/components/forms/config-form";
import { useConfigStore } from "@/stores/useConfigStore";
import { STORAGE_KEYS } from "@/utils/storage-keys";
import * as SecureStore from "expo-secure-store";

export default function Config() {
  const savedKey = SecureStore.getItem(STORAGE_KEYS.gemini_key);
  const config = useConfigStore((state) => state.config);

  return (
    <ConfigForm
      type={savedKey ? "edit" : "register"}
      formData={{ gemini_api_key: savedKey || "", ...config }}
    />
  );
}
