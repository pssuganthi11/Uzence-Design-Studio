import React, { useState } from "react";

interface Column {
  key: string;
  header: string;
}

interface Row {
  [key: string]: any;
}

interface DataTableProps {
  data: Row[];
  columns: Column[];
  loading?: boolean;
  selectable?: "single" | "multiple"; // row selection mode
}

const DataTable: React.FC<DataTableProps> = ({
  data,
  columns,
  loading = false,
  selectable = "multiple",
}) => {
  const [selectedRows, setSelectedRows] = useState<number[]>([]);

  const toggleRow = (idx: number) => {
    if (selectable === "single") {
      setSelectedRows([idx]);
    } else {
      setSelectedRows((prev) =>
        prev.includes(idx) ? prev.filter((i) => i !== idx) : [...prev, idx]
      );
    }
  };

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full border border-gray-300 bg-white rounded-lg shadow-md overflow-hidden">
        <thead className="bg-gray-200 text-gray-700">
          <tr>
            {selectable && (
              <th className="px-4 py-2 border border-gray-300"></th>
            )}
            {columns.map((col) => (
              <th
                key={col.key}
                className="px-4 py-2 border border-gray-300 text-left font-semibold"
              >
                {col.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {loading ? (
            <tr>
              <td
                colSpan={columns.length + (selectable ? 1 : 0)}
                className="text-center py-6 text-gray-500"
              >
                Loading...
              </td>
            </tr>
          ) : data.length === 0 ? (
            <tr>
              <td
                colSpan={columns.length + (selectable ? 1 : 0)}
                className="text-center py-6 text-gray-500"
              >
                No records found
              </td>
            </tr>
          ) : (
            data.map((row, idx) => (
              <tr
                key={idx}
                className={`hover:bg-gray-100 transition-colors duration-200 ${
                  selectedRows.includes(idx) ? "bg-blue-100" : ""
                }`}
              >
                {selectable && (
                  <td className="px-4 py-2 border border-gray-300">
                    <input
                      type={selectable === "single" ? "radio" : "checkbox"}
                      checked={selectedRows.includes(idx)}
                      onChange={() => toggleRow(idx)}
                    />
                  </td>
                )}
                {columns.map((col) => (
                  <td
                    key={col.key}
                    className="px-4 py-2 border border-gray-300"
                  >
                    {row[col.key]}
                  </td>
                ))}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default DataTable;
