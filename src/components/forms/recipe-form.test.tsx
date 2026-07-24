import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import { RecipeForm } from './recipe-form';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const mockCreateMutate = jest.fn();
const mockUpdateMutate = jest.fn();

jest.mock('@/requests/create-recipe', () => ({
  useCreateRecipe: () => ({ mutate: mockCreateMutate, isPending: false }),
  useUpdateRecipe: () => ({ mutate: mockUpdateMutate, isPending: false }),
}));

function renderWithQuery(ui: React.ReactElement) {
  const qc = new QueryClient();
  return render(<QueryClientProvider client={qc}>{ui}</QueryClientProvider>);
}

describe('RecipeForm', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('calls create mutation when valid formData is provided and Save is pressed', async () => {
    const validRecipe = {
      name: 'Bolo',
      description: 'Delicioso',
      category: { label: 'Doce', value: 'doce' },
      ingredients: [{ description: 'Farinha' }],
      steps: [{ description: 'Misturar' }],
      time: '30',
      image: null,
    };

    const { getByText } = renderWithQuery(
      <RecipeForm type="register" formData={validRecipe as any} />,
    );

    fireEvent.press(getByText('Salvar'));

    await waitFor(() => {
      expect(mockCreateMutate).toHaveBeenCalledTimes(1);
      expect(mockCreateMutate).toHaveBeenCalledWith(
        expect.objectContaining({ name: 'Bolo' }),
      );
    });
  });

  it('shows validation errors when required fields are missing', async () => {
    const { getByText, getAllByText } = renderWithQuery(
      <RecipeForm type="register" />,
    );

    fireEvent.press(getByText('Salvar'));

    await waitFor(() => {
      const errors = getAllByText('Campo obrigatório');
      expect(errors.length).toBeGreaterThanOrEqual(1);
      expect(mockCreateMutate).not.toHaveBeenCalled();
    });
  });
});
