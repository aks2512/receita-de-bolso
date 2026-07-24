import { fireEvent, render } from "@testing-library/react-native";
import React from "react";
import { Header } from "./header";

describe("Header", () => {
  it("renders title and buttons when callbacks are provided", () => {
    const onBack = jest.fn();
    const onExport = jest.fn();
    const onEdit = jest.fn();
    const onRemove = jest.fn();

    const { getByText, getAllByRole } = render(
      <Header
        name="Teste"
        onBack={onBack}
        onExport={onExport}
        onEdit={onEdit}
        onRemove={onRemove}
      />,
    );

    expect(getByText("Teste")).toBeTruthy();
    expect(getAllByRole("button").length).toBeGreaterThanOrEqual(3);
  });

  it("calls callbacks when buttons are pressed", () => {
    const onBack = jest.fn();
    const onExport = jest.fn();
    const onEdit = jest.fn();
    const onRemove = jest.fn();

    const { getByLabelText } = render(
      <Header
        name="Teste"
        onBack={onBack}
        onExport={onExport}
        onEdit={onEdit}
        onRemove={onRemove}
      />,
    );

    fireEvent.press(getByLabelText("Voltar"));
    fireEvent.press(getByLabelText("Exportar"));
    fireEvent.press(getByLabelText("Editar"));
    fireEvent.press(getByLabelText("Deletar"));

    expect(onBack).toHaveBeenCalled();
    expect(onExport).toHaveBeenCalled();
    expect(onEdit).toHaveBeenCalled();
    expect(onRemove).toHaveBeenCalled();
  });
});
