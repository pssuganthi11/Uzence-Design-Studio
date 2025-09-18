import type { Meta, StoryObj } from "@storybook/react";
import DataTable from "./DataTable";

const meta: Meta<typeof DataTable> = {
  title: "Components/DataTable",
  component: DataTable,
};
export default meta;

type Story = StoryObj<typeof DataTable>;

export const Default: Story = {
  args: {
    columns: [
      { key: "id", header: "ID" },
      { key: "name", header: "Name" },
      { key: "mobile", header: "Mobile Number" },
    ],
    data: [
      { id: 1, name: "Anand", mobile: "9876543210" },
      { id: 2, name: "Balu", mobile: "8765432109" },
      { id: 3, name: "Chandru", mobile: "7654321098" },
    ],
    loading: false,
    selectable: "multiple",
  },
};
