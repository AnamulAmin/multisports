import { useState } from "react";
import { FiEdit, FiTrash2 } from "react-icons/fi";
import { IoIosSearch } from "react-icons/io";
import EditButton from "../../../components library/EditButton";
import DeleteButton from "../../../components library/DeleteButton";

// Sample SMTP configurations (can be fetched from an API)
const initialConfigurations = [
  {
    id: 1,
    hostServer: "smtp.gmail.com",
    port: 587,
    email: "getupadgency@gmail.com",
    password: "xrdjusszqmqjgpvn",
    mailFromName: "Getup",
    mailFromEmail: "sales@fejmo.com",
    encryption: "TLS",
    status: "Active",
  },
  // Add more configurations if needed
];

export default function EmailConfigurations() {
  const [configurations, setConfigurations] = useState(initialConfigurations);
  const [searchTerm, setSearchTerm] = useState("");
  const [message, setMessage] = useState("");

  // Filter configurations based on the search term
  const filteredConfigurations = configurations.filter(
    (config) =>
      config.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      config.hostServer.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Handle delete action
  const handleDelete = (id) => {
    const updatedConfigurations = configurations.filter(
      (config) => config.id !== id
    );
    setConfigurations(updatedConfigurations);
    setMessage("Email configuration deleted successfully!");
  };

  // Handle adding new email server configuration (for simplicity, adding a static one)
  const handleAddEmailServer = () => {
    const newConfig = {
      id: configurations.length + 1,
      hostServer: "smtp.newserver.com",
      port: 465,
      email: "newemail@domain.com",
      password: "newpassword123",
      mailFromName: "New Server",
      mailFromEmail: "mail@domain.com",
      encryption: "SSL",
      status: "Inactive",
    };
    setConfigurations([...configurations, newConfig]);
    setMessage("New email server configuration added successfully!");
  };

  return (
    <div className="p-6 pt-0">
      <div className="">
        <div className="flex justify-between items-center mb-9">
          <h1 className="text-3xl font-semibold">SMTP Email Configurations</h1>
          <div className="flex justify-end">
            <button className="customSaveButton" onClick={handleAddEmailServer}>
              + Add Email Server
            </button>
          </div>
        </div>
        {/* Search Input */}
        <div className="bg-white border rounded-full px-3 mb-6 md:py-2 py-1 md:gap-2 gap-1 flex-row-reverse justify-between flex">
          <input
            type="text"
            value={searchTerm}
            className="outline-none w-full bg-white"
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search by title or description..."
          />
          <IoIosSearch className="text-2xl text-gray-400" />
        </div>

        {/* Email Configurations Table */}
        <table className="min-w-full table-auto border-collapse bg-white shadow rounded-md">
          <thead>
            <tr className="bg-gray-200 text-center">
              <td className="p-2 border">SL</td>
              <td className="p-2 border">Host Server</td>
              <td className="p-2 border">Port</td>
              <td className="p-2 border">Email</td>
              <td className="p-2 border">Password</td>
              <td className="p-2 border">Mail From Name</td>
              <td className="p-2 border">Mail From Email</td>
              <td className="p-2 border">Encryption</td>
              <td className="p-2 border">Status</td>
              <td className="p-2 border">Action</td>
            </tr>
          </thead>
          <tbody>
            {filteredConfigurations.length > 0 ? (
              filteredConfigurations.map((config, index) => (
                <tr key={config.id} className="border-b text-center">
                  <td className="p-2 border">{index + 1}</td>
                  <td className="p-2 border">{config.hostServer}</td>
                  <td className="p-2 border">{config.port}</td>
                  <td className="p-2 border">{config.email}</td>
                  <td className="p-2 border">{config.password}</td>
                  <td className="p-2 border">{config.mailFromName}</td>
                  <td className="p-2 border">{config.mailFromEmail}</td>
                  <td className="p-2 border">{config.encryption}</td>
                  <td className="p-2 border">
                    <span
                      className={`px-2 py-1 rounded-md ${
                        config.status === "Active"
                          ? "bg-[#A8CE3A] text-white"
                          : "bg-red-500 text-white"
                      }`}
                    >
                      {config.status}
                    </span>
                  </td>
                  <td className="p-2 py-3 border">
                    <div className="flex justify-center space-x-1">
                      <EditButton></EditButton>
                      <DeleteButton onClick={() => handleDelete(config.id)} />
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="10" className="text-center p-4">
                  No data available in the table
                </td>
              </tr>
            )}
          </tbody>
        </table>

        {/* Success/Info Message */}
        {message && <p className="mt-4 text-green-500">{message}</p>}
      </div>
    </div>
  );
}
