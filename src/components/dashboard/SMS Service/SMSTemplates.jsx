import { useState } from "react";
import { FiEdit, FiTrash2 } from "react-icons/fi";
import { IoIosSearch } from "react-icons/io";
import EditButton from "../../../components library/EditButton";
import DeleteButton from "../../../components library/DeleteButton";

// Sample SMS templates data (can be fetched from an API)
const initialTemplates = [
  {
    id: 1,
    title: "Welcome Message",
    description: "Thank you for signing up. We are excited to have you!",
    createdAt: "2024-03-01",
  },
  {
    id: 2,
    title: "Order Confirmation",
    description: "Your order has been confirmed and will be processed shortly.",
    createdAt: "2024-03-02",
  },
  // Add more templates if needed
];

export default function SMSTemplates() {
  const [templates, setTemplates] = useState(initialTemplates);
  const [searchTerm, setSearchTerm] = useState("");
  const [message, setMessage] = useState("");

  // Filter SMS templates based on the search term
  const filteredTemplates = templates.filter(
    (template) =>
      template.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      template.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Handle deletion of a template
  const handleDelete = (id) => {
    const updatedTemplates = templates.filter((template) => template.id !== id);
    setTemplates(updatedTemplates);
    setMessage("Template deleted successfully!");
  };

  // Handle creating a new template (for simplicity, it just adds a placeholder template)
  const handleCreateNewTemplate = () => {
    const newTemplate = {
      id: templates.length + 1,
      title: "New Template",
      description: "This is a new SMS template.",
      createdAt: new Date().toISOString().split("T")[0],
    };
    setTemplates([...templates, newTemplate]);
    setMessage("New template created successfully!");
  };

  return (
    <div className="p-6 pt-0">
      <div className="">
        <div className="mb-9 flex justify-between items-center ">
          <h1 className="text-3xl font-semibold">View All SMS Templates</h1>
          <div className="flex justify-end">
            <button
              className="customSaveButton"
              onClick={handleCreateNewTemplate}
            >
              + Create New Template
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

        {/* SMS Templates Table */}
        <table className="min-w-full table-auto border-collapse bg-white shadow-md rounded-md">
          <thead>
            <tr className="bg-gray-200 text-center">
              <td className="p-2 border">SL</td>
              <td className="p-2 border">Template Title</td>
              <td className="p-2 border">Template Description</td>
              <td className="p-2 border">Created At</td>
              <td className="p-2 border">Action</td>
            </tr>
          </thead>
          <tbody>
            {filteredTemplates.length > 0 ? (
              filteredTemplates.map((template, index) => (
                <tr key={template.id} className="border-b text-center">
                  <td className="p-2 border">{index + 1}</td>
                  <td className="p-2 border">{template.title}</td>
                  <td className="p-2 border">{template.description}</td>
                  <td className="p-2 border">{template.createdAt}</td>
                  <td className="p-2 border">
                    <div className="flex justify-center space-x-2">
                      <EditButton />
                      <DeleteButton onClick={() => handleDelete(template.id)} />
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="text-center p-4">
                  No data available in table
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
