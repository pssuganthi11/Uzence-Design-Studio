import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import DataTable from "./DataTable";

test("renders table with id, name, and mobile number", () => {
  const columns = [
    { key: "id", header: "ID" },
    { key: "name", header: "Name" },
    { key: "mobileNumber", header: "Mobile Number" },
  ];

  const data = [
    { id: 1, name: "Arun", mobileNumber: "9999999999" },
  ];

  render(<DataTable columns={columns} data={data} />);

  expect(screen.getByText("ID")).toBeInTheDocument();
  expect(screen.getByText("Name")).toBeInTheDocument();
  expect(screen.getByText("Mobile Number")).toBeInTheDocument();

  expect(screen.getByText("1")).toBeInTheDocument();
  expect(screen.getByText("Arun")).toBeInTheDocument();
  expect(screen.getByText("9999999999")).toBeInTheDocument();
});
