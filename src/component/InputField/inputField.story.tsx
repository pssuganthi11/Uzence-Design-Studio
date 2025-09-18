import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import InputField, { type InputFieldProps } from "./InputField";

const meta: Meta<typeof InputField> = {
  title: "Components/InputField",
  component: InputField,
  argTypes: {
    variant: {
      control: "select",
      options: ["outlined", "filled", "ghost"],
    },
    size: {
      control: "select",
      options: ["sm", "md", "lg"],
    },
  },
};
export default meta;

type Story = StoryObj<typeof InputField>;

export const Default: Story = {
  render: (args: InputFieldProps) => {
    const [value, setValue] = useState("");
    return (
      <InputField
        {...args}
        label="Name"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Enter your name"
        helperText="This is a helper text"
      />
    );
  },
};

export const Password: Story = {
  render: () => {
    const [password, setPassword] = useState("");
    return (
      <InputField
        label="Password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        passwordToggle
        placeholder="Enter password"
      />
    );
  },
};

export const Invalid: Story = {
  render: () => {
    const [value, setValue] = useState("wrong");
    return (
      <InputField
        label="Email"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        invalid
        errorMessage="Invalid email format"
      />
    );
  },
};

export const Loading: Story = {
  render: () => (
    <InputField label="Loading" value="..." onChange={() => {}} loading />
  ),
};

export const Disabled: Story = {
  render: () => (
    <InputField label="Disabled" value="N/A" onChange={() => {}} disabled />
  ),
};
