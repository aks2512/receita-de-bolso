export function onlyNumbersMask(value?: string) {
  return value?.replace(/\D/g, "") || "";
}
