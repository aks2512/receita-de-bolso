import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { fireEvent, render, waitFor } from "@testing-library/react-native";
import React from "react";
import { RecipeForm } from "./recipe-form";

const mockCreateMutate = jest.fn();
const mockUpdateMutate = jest.fn();

jest.mock("@/requests/create-recipe", () => ({
  useCreateRecipe: () => ({ mutate: mockCreateMutate, isPending: false }),
}));

jest.mock("@/requests/update-recipe", () => ({
  useUpdateRecipe: () => ({ mutate: mockUpdateMutate, isPending: false }),
}));

function renderWithQuery(ui: React.ReactElement) {
  const qc = new QueryClient();
  return render(<QueryClientProvider client={qc}>{ui}</QueryClientProvider>);
}

describe("RecipeForm", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("calls create mutation when valid formData is provided and Save is pressed", async () => {
    const validRecipe = {
      name: "Bolo",
      description: "Delicioso",
      category: { label: "Doce", value: "doce" },
      ingredients: [{ description: "Farinha" }],
      steps: [{ description: "Misturar" }],
      time: "30",
      image: null,
    };

    const { getByText } = renderWithQuery(
      <RecipeForm type="register" formData={validRecipe as any} />,
    );

    fireEvent.press(getByText("Salvar"));

    await waitFor(() => {
      expect(mockCreateMutate).toHaveBeenCalledTimes(1);
      expect(mockCreateMutate).toHaveBeenCalledWith(
        expect.objectContaining({ name: "Bolo" }),
      );
    });
  });

  it("shows validation errors when required fields are missing", async () => {
    const { getByText, getAllByText } = renderWithQuery(
      <RecipeForm type="register" />,
    );

    fireEvent.press(getByText("Salvar"));

    await waitFor(() => {
      const errors = getAllByText("Campo obrigatório");
      expect(errors.length).toBeGreaterThanOrEqual(1);
      expect(mockCreateMutate).not.toHaveBeenCalled();
    });
  });

  it("adds and removes ingredient inputs", async () => {
    const { getAllByLabelText, getByLabelText } = renderWithQuery(
      <RecipeForm type="register" />,
    );

    // initially X ingredient inputs
    const before = getAllByLabelText(/ingredient-/).length;

    fireEvent.press(getByLabelText("add-ingredient"));

    await waitFor(() => {
      expect(getAllByLabelText(/ingredient-/).length).toBeGreaterThan(before);
    });

    // remove items until we return to the original count (safe cap to avoid infinite loop)
    let current = getAllByLabelText(/ingredient-/).length;
    const maxIterations = 5;
    let iter = 0;
    while (current > before && iter < maxIterations) {
      const removes = getAllByLabelText(/remove-ingredient-/);
      const lastRemove = removes[removes.length - 1];
      fireEvent.press(lastRemove);
      // wait for a decrease
      // eslint-disable-next-line no-await-in-loop
      await waitFor(() => {
        const now = getAllByLabelText(/ingredient-/).length;
        expect(now).toBeLessThanOrEqual(current);
      });
      current = getAllByLabelText(/ingredient-/).length;
      iter++;
    }

    expect(current).toBe(before);
  });

  it("adds and removes step inputs", async () => {
    const { getAllByLabelText, getByLabelText } = renderWithQuery(
      <RecipeForm type="register" />,
    );

    const beforeSteps = getAllByLabelText(/step-/).length;

    fireEvent.press(getByLabelText("add-step"));

    await waitFor(() => {
      expect(getAllByLabelText(/step-/).length).toBeGreaterThan(beforeSteps);
    });

    let currentSteps = getAllByLabelText(/step-/).length;
    const maxStepIters = 5;
    let stepIter = 0;
    while (currentSteps > beforeSteps && stepIter < maxStepIters) {
      const stepRemoves = getAllByLabelText(/remove-step-/);
      const lastStepRemove = stepRemoves[stepRemoves.length - 1];
      fireEvent.press(lastStepRemove);
      // eslint-disable-next-line no-await-in-loop
      await waitFor(() => {
        const now = getAllByLabelText(/step-/).length;
        expect(now).toBeLessThanOrEqual(currentSteps);
      });
      currentSteps = getAllByLabelText(/step-/).length;
      stepIter++;
    }

    expect(currentSteps).toBe(beforeSteps);
  });

  it("calls update mutation when editing and Save is pressed", async () => {
    const editRecipe = {
      id: "abc-1",
      name: "Bolo Edit",
      description: "Desc",
      category: { label: "Doce", value: "doce" },
      ingredients: [{ description: "Farinha" }],
      steps: [{ description: "Misturar" }],
      time: "20",
    };

    const { getByText } = renderWithQuery(
      <RecipeForm type="edit" formData={editRecipe as any} />,
    );

    fireEvent.press(getByText("Salvar"));

    await waitFor(() => {
      expect(mockUpdateMutate).toHaveBeenCalledTimes(1);
      expect(mockUpdateMutate).toHaveBeenCalledWith(
        expect.objectContaining({ name: "Bolo Edit" }),
      );
    });
  });
});
