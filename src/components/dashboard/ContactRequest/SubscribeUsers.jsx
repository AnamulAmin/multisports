import { useState } from "react";
import { IoIosSearch } from "react-icons/io";
import DeleteButton from "../../../components library/DeleteButton";

export default function SubscribedUsersList() {
  // Sample data (replace with your actual data or fetch from an API)
  const initialData = [
    {
      id: 1,
      email: "user1@mail.com",
      subscribedOn: "2024-01-15",
    },
    {
      id: 2,
      email: "user2@mail.com",
      subscribedOn: "2024-01-18",
    },
    {
      id: 3,
      email: "user3@mail.com",
      subscribedOn: "2024-01-19",
    },
    // Add more user data as needed
  ];

  const [data, setData] = useState(initialData);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState("");

  // Pagination logic
  const totalPages = Math.ceil(data.length / itemsPerPage);
  const startIdx = (currentPage - 1) * itemsPerPage;
  const currentData = data.slice(startIdx, startIdx + itemsPerPage);

  // Handle search functionality
  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    const filteredData = initialData.filter((item) =>
      item.email.toLowerCase().includes(e.target.value.toLowerCase())
    );
    setData(filteredData);
    setCurrentPage(1); // Reset to first page on search
  };

  return (
    <div className="p-6 pt-0">
      <div className="">
        <div className="flex mb-9 justify-between items-center">
          <h1 className="text-3xl font-semibold">Subscribed Users List</h1>
          {/* Download as Excel Button */}
          <div className="mt-6">
            <button className="customSaveButton">Download As Excel</button>
          </div>
        </div>

        {/* Search Input */}
        <div className="bg-white border rounded-full px-3 mb-6 md:py-2 py-1 md:gap-2 gap-1 flex-row-reverse justify-between flex">
          <input
            type="text"
            value={searchTerm}
            className="outline-none w-full bg-white"
            onChange={handleSearch}
            placeholder="Search by title or description..."
          />
          <IoIosSearch className="text-2xl text-gray-400" />
        </div>

        {/* Subscribed Users Table */}
        <table className="min-w-full table-auto border-collapse bg-white shadow-md rounded-md">
          <thead>
            <tr className="bg-gray-200 text-center">
              <td className="p-2 border">SL</td>
              <td className="p-2 border">Email</td>
              <td className="p-2 border">Subscribed On</td>
              <td className="p-2 border">Action</td>
            </tr>
          </thead>
          <tbody>
            {currentData.length > 0 ? (
              currentData.map((item, index) => (
                <tr key={item.id} className="border-b text-center">
                  <td className="p-2 border">{startIdx + index + 1}</td>
                  <td className="p-2 border">{item.email}</td>
                  <td className="p-2 border">{item.subscribedOn}</td>
                  <td className="p-2 border">
                    <DeleteButton></DeleteButton>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="text-center p-4">
                  No data available in the table
                </td>
              </tr>
            )}
          </tbody>
        </table>

        {/* Pagination */}
        <div className="flex justify-between items-center mt-6">
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className="bg-gray-300 py-2 px-4 rounded-md hover:bg-gray-400 disabled:opacity-50"
          >
            Previous
          </button>
          <span>
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={() =>
              setCurrentPage((prev) => Math.min(prev + 1, totalPages))
            }
            disabled={currentPage === totalPages}
            className="bg-gray-300 py-2 px-4 rounded-md hover:bg-gray-400 disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
