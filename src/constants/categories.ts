export const RECIPE_CATEGORIES = [
  {
    text: "Todos",
    image: require("@/assets/images/icons/all.svg"),
    value: "all",
  },
  {
    text: "Saladas",
    image: require("@/assets/images/icons/salads.svg"),
    value: "salads",
  },
  {
    text: "Sopas",
    image: require("@/assets/images/icons/soups.svg"),
    value: "soups",
  },
  {
    text: "Massas",
    image: require("@/assets/images/icons/pastas.svg"),
    value: "pastas",
  },
  {
    text: "Pães",
    image: require("@/assets/images/icons/breads.svg"),
    value: "breads",
  },
  {
    text: "Oriental",
    image: require("@/assets/images/icons/asian.svg"),
    value: "asian",
  },
  {
    text: "Bolos",
    image: require("@/assets/images/icons/cakes.svg"),
    value: "cakes",
  },
  {
    text: "Biscoitos",
    image: require("@/assets/images/icons/cookies.svg"),
    value: "cookies",
  },
  {
    text: "Sobremesas",
    image: require("@/assets/images/icons/desserts.svg"),
    value: "desserts",
  },
  {
    text: "Bebidas",
    image: require("@/assets/images/icons/drinks.svg"),
    value: "drinks",
  },
];

export const RECIPE_CATEGORIES_OPTIONS = RECIPE_CATEGORIES.filter(
  (category) => category.value !== "all",
).map((category) => ({ label: category.text, value: category.value }));
