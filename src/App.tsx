import React, { useState } from "react";
import "./index.css";
import InputField from "./component/InputField/InputField";
import DataTable from "./component/Datatable/DataTable";

function App() {
  // States for input fields
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [mobile,setMobile] = useState("");

  // Table data
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const columns = [
    { key: "id", header: "ID" },
    { key: "name", header: "Name" },
    { key: "mobile", header: "Mobile Number" },
  ];

  const [activeComponent, setActiveComponent] = useState<
    "input" | "table" | null
  >(null);

  // Handle form submit
const handleSubmit = (e: React.FormEvent) => {
  e.preventDefault();
  if (!name || !email || !password || !mobile) return;

  setLoading(true);

  // simulate API
  setTimeout(() => {
    const newEntry = {
      id: data.length + 1,
      name,
      role: "User",
      mobile, // include mobile number
    };

    setData([...data, newEntry]);
    setLoading(false);

    // clear inputs
    setName("");
    setEmail("");
    setPassword("");
    setMobile("");

    // switch to table view
    setActiveComponent("table");
  }, 1000);
};


  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200 p-4 sm:p-6 md:p-8">
      <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-6 sm:mb-8 text-gray-800 text-center">
        React UI Components
      </h1>

      {/* Toggle buttons */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6 sm:mb-8 w-full max-w-xs sm:max-w-md md:max-w-lg">
        <button
          onClick={() => setActiveComponent("input")}
          className={`w-full sm:w-auto px-6 py-2 rounded-lg font-medium shadow-md transition-all 
            ${
              activeComponent === "input"
                ? "bg-blue-600 text-white scale-105"
                : "bg-white text-blue-600 border border-blue-600 hover:bg-blue-50"
            }`}
        >
          Show Input
        </button>

        <button
          onClick={() => setActiveComponent("table")}
          className={`w-full sm:w-auto px-6 py-2 rounded-lg font-medium shadow-md transition-all 
            ${
              activeComponent === "table"
                ? "bg-green-600 text-white scale-105"
                : "bg-white text-green-600 border border-green-600 hover:bg-green-50"
            }`}
        >
          Show Table
        </button>
      </div>

      {/* Component container */}
      <div className="w-full max-w-full sm:max-w-3xl bg-white p-6 md:p-8 rounded-lg shadow-lg overflow-x-auto">
        {activeComponent === "input" && (
          <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
            <InputField
              label="Name"
              placeholder="Enter your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              helperText="This is a helper text"
              clearable
              variant="outlined"
              size="md"
            />

            <InputField
              label="Email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              invalid={email !== "" && !email.includes("@")}
              errorMessage="Invalid email format"
              clearable
              variant="filled"
              size="md"
            />

            <InputField
              label="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              passwordToggle
              placeholder="Enter password"
              variant="outlined"
              size="md"
            />

            <InputField
              label="Mobile Number"
              value={mobile}
              onChange={(e) => setMobile(e.target.value)}
              mobile
              clearable
              helperText="Enter a 10-digit mobile number"
              invalid={mobile !== "" && !/^\d{10}$/.test(mobile)}
              errorMessage="Mobile number must be 10 digits"
            />

            <button
              type="submit"
              className="mt-2 w-full bg-blue-600 text-white font-semibold py-2 px-4 rounded-md shadow hover:bg-blue-700 transition-colors"
            >
              Submit
            </button>
          </form>
        )}

        {activeComponent === "table" && (
          <DataTable
            data={data}
            columns={columns}
            loading={loading}
            selectable="multiple"
          />
        )}
      </div>
    </div>
  );
}

export default App;
