import { useState } from "react";
import { FiEdit, FiTrash2 } from "react-icons/fi";
import { IoIosSearch } from "react-icons/io";
import EditButton from "../../../components library/EditButton";
import DeleteButton from "../../../components library/DeleteButton";

// Sample promo code data (can be fetched from an API)
const initialPromoCodes = [
  {
    id: 1,
    title: "25% OFF Promo",
    effectiveDate: "2024-01-01",
    expiryDate: "2024-12-31",
    type: "Percentage",
    value: 25,
    minSpend: 1000,
    code: "SAVE25",
    status: "Active",
  },
  {
    id: 2,
    title: "Flat $50 OFF",
    effectiveDate: "2024-02-15",
    expiryDate: "2024-08-15",
    type: "Fixed",
    value: 50,
    minSpend: 500,
    code: "FLAT50",
    status: "Inactive",
  },
  // Add more promo codes as needed
];

export default function ViewAllPromoCode() {
  const [promoCodes, setPromoCodes] = useState(initialPromoCodes);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // Filter promo codes based on the search term
  const filteredPromoCodes = promoCodes.filter(
    (promo) =>
      promo.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      promo.code.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredPromoCodes.slice(
    indexOfFirstItem,
    indexOfLastItem
  );

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleDelete = (id) => {
    setPromoCodes(promoCodes.filter((promo) => promo.id !== id));
  };

  return (
    <div className="p-6 pt-0">
      <div className="">
        <h1 className="text-3xl font-semibold mb-9">Promo Codes</h1>

        {/* Search Input */}
        <div className="">
          {/* Search Input */}
          <div className="bg-white border rounded-full px-3 mb-6 md:py-2 py-1 md:gap-2 gap-1 flex-row-reverse justify-between flex">
            <input
              type="text"
              value={searchTerm}
              className="outline-none w-full bg-white"
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search by title or code..."
            />
            <IoIosSearch className="text-2xl text-gray-400" />
          </div>
        </div>

        {/* Promo Codes Table */}
        <table className="min-w-full table-auto border-collapse bg-white shadow rounded-md">
          <thead>
            <tr className="bg-gray-200 text-center">
              <td className="p-2 border">SL</td>
              <td className="p-2 border">Title</td>
              <td className="p-2 border">Effective Date</td>
              <td className="p-2 border">Expiry Date</td>
              <td className="p-2 border">Type</td>
              <td className="p-2 border">Value</td>
              <td className="p-2 border">Min. Spend</td>
              <td className="p-2 border">Code</td>
              <td className="p-2 border">Status</td>
              <td className="p-2 border">Action</td>
            </tr>
          </thead>
          <tbody>
            {currentItems.length > 0 ? (
              currentItems.map((promo, index) => (
                <tr key={promo.id} className="border-b text-center">
                  <td className="p-2 border">
                    {index + 1 + (currentPage - 1) * itemsPerPage}
                  </td>
                  <td className="p-2 border">{promo.title}</td>
                  <td className="p-2 border">{promo.effectiveDate}</td>
                  <td className="p-2 border">{promo.expiryDate}</td>
                  <td className="p-2 border">{promo.type}</td>
                  <td className="p-2 border">
                    {promo.type === "Percentage"
                      ? `${promo.value}%`
                      : `$${promo.value}`}
                  </td>
                  <td className="p-2 border">৳ {promo.minSpend.toFixed(2)}</td>
                  <td className="p-2 border">{promo.code}</td>
                  <td>
                    <span
                      className={`text-white  p-2  rounded-xl py-1 ${
                        promo.status === "Active"
                          ? "bg-[#A8CE3A]"
                          : "bg-red-500"
                      }`}
                    >
                      {promo.status}
                    </span>
                  </td>

                  <td className="p-2 border py-3">
                    <div className="flex justify-center space-x-2">
                      <EditButton></EditButton>
                      <DeleteButton
                        onClick={() => handleDelete(promo.id)}
                      ></DeleteButton>
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

        {/* Pagination */}
        <div className="mt-4 flex justify-between">
          <span>
            Showing {indexOfFirstItem + 1} to{" "}
            {Math.min(indexOfLastItem, filteredPromoCodes.length)} of{" "}
            {filteredPromoCodes.length} entries
          </span>
          <div className="flex space-x-2">
            {Array.from(
              { length: Math.ceil(filteredPromoCodes.length / itemsPerPage) },
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
