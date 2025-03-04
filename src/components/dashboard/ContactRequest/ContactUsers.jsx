import { useState } from "react";
import { IoIosSearch } from "react-icons/io";
import Swal from "sweetalert2";
import DeleteButton from "../../../components library/DeleteButton"; // Update if necessary
import useGetAllContactRequests from "../../../Hook/GetDataHook/useGetAllContactRequests";
import useAxiosSecure from "../../../Hook/useAxiosSecure";

export default function ContactRequestsList() {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [statusFilter, setStatusFilter] = useState("All"); // Add status filter state
  const [hoveredMessage, setHoveredMessage] = useState(null);

  const handleMouseEnter = (message) => {
    setHoveredMessage(message);
  };

  const handleMouseLeave = () => {
    setHoveredMessage(null);
  };

  const { contactRequests: data, refetch } = useGetAllContactRequests({
    searchQuery: "example",
    setLoading: (isLoading) => console.log(isLoading),
  });

  // Filtered data based on the search term and status filter
  const filteredData = data
    .filter(
      (item) =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.company.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .filter((item) => {
      if (statusFilter === "All") return true;
      return item.status === statusFilter;
    });

  // Pagination logic
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const startIdx = (currentPage - 1) * itemsPerPage;
  const currentData = filteredData.slice(startIdx, startIdx + itemsPerPage);
  const axiosSecure = useAxiosSecure();

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1); // Reset to the first page on search
  };

  const handleStatusFilterChange = (e) => {
    setStatusFilter(e.target.value); // Update the status filter when dropdown changes
    setCurrentPage(1); // Reset to the first page on filter change
  };

  const handleDelete = async (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const response = await axiosSecure.delete(`/contact-requests/${id}`);
          if (response.status === 200) {
            refetch();
            Swal.fire(
              "Deleted!",
              "The contact request has been deleted.",
              "success"
            );
          } else {
            Swal.fire(
              "Failed!",
              "The contact request could not be deleted.",
              "error"
            );
          }
        } catch (error) {
          Swal.fire(
            "Error!",
            "Something went wrong. Please try again later.",
            "error"
          );
        }
      }
    });
  };

  const handleServe = async (id) => {
    const result = await Swal.fire({
      title: "Mark as Served?",
      text: "This will update the status to 'Served'.",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, mark as served!",
    });

    if (result.isConfirmed) {
      try {
        const response = await axiosSecure.put(
          `/contact-requests/${id}/mark-served`
        );

        if (response.status === 200 || response.status === 201) {
          Swal.fire(
            "Updated!",
            "The contact request has been marked as served.",
            "success"
          );
          refetch();
        } else {
          Swal.fire(
            "Error!",
            "There was an issue marking the request as served.",
            "error"
          );
        }
      } catch (error) {
        console.error("Error marking as served:", error);
        Swal.fire(
          "Error!",
          "There was an issue marking the request as served.",
          "error"
        );
      }
    }
  };

  return (
    <div className="p-6 pt-0">
      <div>
        <h1 className="text-3xl font-semibold mb-9">Contact Requests List</h1>

        {/* Search and Status Filter Dropdown */}
        <div className="flex w-full mb-6 space-x-4">
          {/* Search Input */}
          <div className="bg-white flex-1 border rounded-full px-3 md:py-2 py-1 md:gap-2 gap-1 flex-row-reverse items-center justify-between flex">
            <input
              type="text"
              value={searchTerm}
              className="outline-none w-full bg-white"
              onChange={handleSearch}
              placeholder="Search by name, email, or company..."
            />
            <IoIosSearch className="text-2xl text-gray-400" />
          </div>
          <div className="border rounded-full">
            <select
              value={statusFilter}
              onChange={handleStatusFilterChange}
              className="bg-white px-5 pr-10 outline-none focus:outline-none select rounded-full py-2"
            >
              <option value="All">All</option>
              <option value="Served">Served</option>
              <option value="Not Served">Not Served</option>
            </select>
          </div>
        </div>

        {/* Loading State */}
        {isLoading ? (
          <div className="text-center text-gray-500">Loading...</div>
        ) : (
          <div>
            {/* Contact Requests Table */}
            <table className="min-w-full table-auto border-collapse bg-white shadow rounded-md">
              <thead>
                <tr className="bg-gray-200 text-center">
                  <td className="p-2 border">SL</td>
                  <td className="p-2 border">Name</td>
                  <td className="p-2 border">Email</td>
                  <td className="p-2 border">Phone</td>
                  <td className="p-2 border">Company</td>
                  <td className="p-2 border">Message</td>
                  <td className="p-2 border">Status</td>
                  <td className="p-2 border">Actions</td>
                </tr>
              </thead>
              <tbody>
                {currentData.length > 0 ? (
                  currentData.map((item, index) => (
                    <tr key={index} className="border-b text-center">
                      <td className="p-2 border">{startIdx + index + 1}</td>
                      <td className="p-2 border">{item.name}</td>
                      <td className="p-2 border">{item.email}</td>
                      <td className="p-2 border">{item.phone}</td>
                      <td className="p-2 border">{item.company}</td>
                      <td className="p-2 border">{item.message}</td>
                      <td className="p-2 border">
                        <span
                          onClick={() => {
                            if (item.status !== "Served") handleServe(item._id);
                          }}
                          className={`inline-block px-3 py-1 rounded-full text-sm ${
                            item.status === "Served"
                              ? "bg-[#A8CE3A] text-white"
                              : "bg-red-500 cursor-pointer text-white"
                          }`}
                        >
                          {item.status}
                        </span>
                      </td>

                      <td className="p-2 border">
                        <DeleteButton onClick={() => handleDelete(item._id)} />
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="8" className="text-center p-36">
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
        )}
      </div>
    </div>
  );
}
