export const RECIPE_CATEGORIES = [
  {
    textKey: "categories_all",
    image: require("@/assets/images/icons/all.svg"),
    value: "all",
  },
  {
    textKey: "categories_salads",
    image: require("@/assets/images/icons/salads.svg"),
    value: "salads",
  },
  {
    textKey: "categories_soups",
    image: require("@/assets/images/icons/soups.svg"),
    value: "soups",
  },
  {
    textKey: "categories_pastas",
    image: require("@/assets/images/icons/pastas.svg"),
    value: "pastas",
  },
  {
    textKey: "categories_breads",
    image: require("@/assets/images/icons/breads.svg"),
    value: "breads",
  },
  {
    textKey: "categories_asian",
    image: require("@/assets/images/icons/asian.svg"),
    value: "asian",
  },
  {
    textKey: "categories_cakes",
    image: require("@/assets/images/icons/cakes.svg"),
    value: "cakes",
  },
  {
    textKey: "categories_cookies",
    image: require("@/assets/images/icons/cookies.svg"),
    value: "cookies",
  },
  {
    textKey: "categories_desserts",
    image: require("@/assets/images/icons/desserts.svg"),
    value: "desserts",
  },
  {
    textKey: "categories_drinks",
    image: require("@/assets/images/icons/drinks.svg"),
    value: "drinks",
  },
];

export const RECIPE_CATEGORIES_OPTIONS = RECIPE_CATEGORIES.filter(
  (category) => category.value !== "all",
).map((category) => ({ labelKey: category.textKey, value: category.value }));
