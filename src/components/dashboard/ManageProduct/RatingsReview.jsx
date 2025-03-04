import { useState } from "react";
import { FiEdit, FiTrash2 } from "react-icons/fi";
import { IoIosSearch } from "react-icons/io";
import EditButton from "../../../components library/EditButton";
import DeleteButton from "../../../components library/DeleteButton";

const initialData = [
  {
    id: 1,
    image: "/images/product1.png",
    product: "Smartphone",
    rating: 4,
    review: "Great product, value for money!",
    reply: "Thank you for your feedback!",
    customer: "John Doe",
    name: "Smartphone X",
    status: "Approved",
  },
  {
    id: 2,
    image: "/images/product2.png",
    product: "Laptop",
    rating: 5,
    review: "Excellent performance!",
    reply: "We are glad you liked it!",
    customer: "Jane Smith",
    name: "Laptop Pro",
    status: "Approved",
  },
  // Add more review entries as needed
];

export default function RatingsReview() {
  const [reviews, setReviews] = useState(initialData);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // Filter reviews based on the search term
  const filteredReviews = reviews.filter((review) =>
    review.product.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredReviews.slice(indexOfFirstItem, indexOfLastItem);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className=" p-6 pt-0">
      <div className="">
        <h1 className="text-3xl font-semibold mb-9">Ratings & Review</h1>

        <div className="bg-white border rounded-full px-3 mb-6 md:py-2 py-1 md:gap-2 gap-1 flex-row-reverse justify-between flex">
          <input
            type="text"
            className="outline-none w-full bg-white"
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search here ..."
          />
          <IoIosSearch className="text-2xl text-gray-400" />
        </div>

        {/* Review Table */}
        <table className="min-w-full table-auto border-collapse">
          <thead>
            <tr className="bg-gray-200 text-center">
              <td className="p-2 border">SL</td>
              <td className="p-2 border">Image</td>
              <td className="p-2 border">Product</td>
              <td className="p-2 border">Rating</td>
              <td className="p-2 border">Review</td>
              <td className="p-2 border">Reply From Admin</td>
              <td className="p-2 border">Customer</td>
              <td className="p-2 border">Name</td>
              <td className="p-2 border">Status</td>
              <td className="p-2 border">Action</td>
            </tr>
          </thead>
          <tbody>
            {currentItems.length > 0 ? (
              currentItems.map((review, index) => (
                <tr key={review.id} className="border-b text-center">
                  <td className="p-2 border">
                    {index + 1 + (currentPage - 1) * itemsPerPage}
                  </td>
                  <td className="p-2 border">
                    <img
                      src={review.image}
                      alt={review.product}
                      className="w-16 h-16 object-contain"
                    />
                  </td>
                  <td className="p-2 border">{review.product}</td>
                  <td className="p-2 border">{review.rating}</td>
                  <td className="p-2 border">{review.review}</td>
                  <td className="p-2 border">{review.reply}</td>
                  <td className="p-2 border">{review.customer}</td>
                  <td className="p-2 border">{review.name}</td>
                  <td className="p-2 border">
                    <span className="border px-2 rounded-lg pb-1 text-white bg-[#236c23a5] border-[#56ce5696]">
                      {review.status}
                    </span>
                  </td>
                  <td className="p-2 border">
                    <div className="flex justify-center space-x-2">
                      <EditButton></EditButton>
                      <DeleteButton></DeleteButton>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="10" className="text-center p-4">
                  No data available in table
                </td>
              </tr>
            )}
          </tbody>
        </table>

        {/* Pagination */}
        <div className="mt-4 flex justify-between">
          <span>
            Showing {indexOfFirstItem + 1} to{" "}
            {Math.min(indexOfLastItem, filteredReviews.length)} of{" "}
            {filteredReviews.length} entries
          </span>
          <div className="flex space-x-2">
            {Array.from(
              { length: Math.ceil(filteredReviews.length / itemsPerPage) },
              (_, index) => (
                <button
                  key={index}
                  onClick={() => handlePageChange(index + 1)}
                  className={`px-3 py-1 border rounded-xl ${
                    currentPage === index + 1
                      ? "bg-[#087D6D] text-white"
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
