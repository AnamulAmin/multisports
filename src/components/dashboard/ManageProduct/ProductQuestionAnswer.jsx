import { useState } from "react";
import { FiEdit, FiTrash2 } from "react-icons/fi";

const initialData = [
  {
    id: 1,
    image: "/images/product1.png",
    product: "Smartphone",
    customerName: "John Doe",
    email: "john.doe@gmail.com",
    question: "Is this product available in black?",
    answer: "Yes, this product is available in black.",
  },
  {
    id: 2,
    image: "/images/product2.png",
    product: "Laptop",
    customerName: "Jane Smith",
    email: "jane.smith@gmail.com",
    question: "Does this laptop come with a warranty?",
    answer: "Yes, this laptop comes with a 1-year warranty.",
  },
  // Add more data if needed
];

export default function ProductQuestionAnswer() {
  const [questions, setQuestions] = useState(initialData);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // Filter questions based on the search term
  const filteredQuestions = questions.filter((question) =>
    question.product.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredQuestions.slice(
    indexOfFirstItem,
    indexOfLastItem
  );

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleDelete = (id) => {
    setQuestions(questions.filter((question) => question.id !== id));
  };

  const handleEdit = (id) => {
    // Implement edit functionality here
  };

  return (
    <div className="min-h-screen bg-gray-100 p-10">
      <div className="max-w-7xl mx-auto bg-white p-8 shadow-md rounded-md">
        <h1 className="text-2xl font-bold mb-5">Questions & Answers</h1>

        {/* Search Input */}
        <div className="mb-4">
          <input
            type="text"
            placeholder="Search by product..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full p-2 border rounded-md"
          />
        </div>

        {/* Questions Table */}
        <table className="min-w-full table-auto border-collapse">
          <thead>
            <tr className="bg-gray-200">
              <th className="p-2 border">SL</th>
              <th className="p-2 border">Image</th>
              <th className="p-2 border">Product</th>
              <th className="p-2 border">{`Customer's Name`}</th>
              <th className="p-2 border">Email</th>
              <th className="p-2 border">Question</th>
              <th className="p-2 border">Answer From Admin</th>
              <th className="p-2 border">Action</th>
            </tr>
          </thead>
          <tbody>
            {currentItems.length > 0 ? (
              currentItems.map((question, index) => (
                <tr key={question.id} className="border-b">
                  <td className="p-2 border">
                    {index + 1 + (currentPage - 1) * itemsPerPage}
                  </td>
                  <td className="p-2 border">
                    <img
                      src={question.image}
                      alt={question.product}
                      className="w-16 h-16 object-contain"
                    />
                  </td>
                  <td className="p-2 border">{question.product}</td>
                  <td className="p-2 border">{question.customerName}</td>
                  <td className="p-2 border">{question.email}</td>
                  <td className="p-2 border">{question.question}</td>
                  <td className="p-2 border">{question.answer}</td>
                  <td className="p-2 border">
                    <div className="flex space-x-2">
                      <button
                        className="text-yellow-500 hover:text-yellow-700"
                        onClick={() => handleEdit(question.id)}
                      >
                        <FiEdit />
                      </button>
                      <button
                        className="text-red-500 hover:text-red-700"
                        onClick={() => handleDelete(question.id)}
                      >
                        <FiTrash2 />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="8" className="text-center p-4">
                  No data available in the table
                </td>
              </tr>
            )}
          </tbody>
        </table>

        {/* Pagination */}
        <div className="mt-4 flex justify-between">
          <span>
            Showing {indexOfFirstItem + 1} to{" "}
            {Math.min(indexOfLastItem, filteredQuestions.length)} of{" "}
            {filteredQuestions.length} entries
          </span>
          <div className="flex space-x-2">
            {Array.from(
              { length: Math.ceil(filteredQuestions.length / itemsPerPage) },
              (_, index) => (
                <button
                  key={index}
                  onClick={() => handlePageChange(index + 1)}
                  className={`px-3 py-1 border rounded-md ${
                    currentPage === index + 1
                      ? "bg-blue-500 text-white"
                      : "bg-gray-100"
                  }`}
                >
                  {index + 1}
                </button>
              )
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
