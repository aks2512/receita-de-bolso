import { RecipeSchema } from "./recipe-schema";

describe("RecipeSchema", () => {
  it("validates a correct recipe payload", async () => {
    const validRecipe = {
      name: "Bolo de cenoura",
      description: "Uma receita simples",
      category: { label: "Doce", value: "doce" },
      ingredients: [{ description: "Cenoura" }],
      steps: [{ description: "Bater no liquidificador" }],
    };

    await expect(RecipeSchema.validate(validRecipe)).resolves.toEqual(
      expect.objectContaining({
        name: "Bolo de cenoura",
      }),
    );
  });

  it("rejects when required fields are missing", async () => {
    const invalidRecipe = {
      name: "",
      category: null,
      ingredients: [],
      steps: [],
    };

    await expect(RecipeSchema.validate(invalidRecipe)).rejects.toBeTruthy();
  });
});
