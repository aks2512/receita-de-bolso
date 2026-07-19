export function onlyNumbersMask(value?: string) {
  return value?.replace(/[0-9]+/, "$1");
}
