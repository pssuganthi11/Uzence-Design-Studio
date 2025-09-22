import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import InputField from "./InputField";

test("renders input with label", () => {
  render(
    <InputField
      label="Username"
      value=""
      onChange={() => {}}
      placeholder="Enter username"
    />
  );

  expect(screen.getByLabelText("Username")).toBeInTheDocument();
});

test("calls onChange when typing", () => {
  const handleChange = jest.fn();
  render(
    <InputField
      label="Username"
      value=""
      onChange={handleChange}
      placeholder="Enter username"
    />
  );

  fireEvent.change(screen.getByPlaceholderText("Enter username"), {
    target: { value: "John" },
  });
  expect(handleChange).toHaveBeenCalled();
});
