import { useState } from "react";
import { FiTrash2 } from "react-icons/fi";

// Sample notification data (can be fetched from an API)
const initialNotifications = [
  {
    id: 1,
    channel: "/topics/example",
    title: "2% Discount",
    description: "এই ডিসকাউন্টে আমাদের সাথেই থাকুন এবং ২% ছাড় উপভোগ করুন!",
    sentAt: "2024-03-17 08:06:03 am",
  },
  {
    id: 2,
    channel: "/topics/promo",
    title: "5% Discount",
    description: "Special 5% Discount only for loyal customers!",
    sentAt: "2024-02-15 10:30:00 am",
  },
  // Add more notification data here
];

export default function PreviousNotifications() {
  const [notifications, setNotifications] = useState(initialNotifications);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // Filter notifications based on search term
  const filteredNotifications = notifications.filter(
    (notification) =>
      notification.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      notification.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredNotifications.slice(
    indexOfFirstItem,
    indexOfLastItem
  );

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleDelete = (id) => {
    setNotifications(
      notifications.filter((notification) => notification.id !== id)
    );
  };

  const handleRemoveOldNotifications = () => {
    // Assume removing notifications older than 15 days (you can customize the logic based on your requirement)
    const today = new Date();
    const cutoffDate = new Date(today.setDate(today.getDate() - 15));
    const updatedNotifications = notifications.filter((notification) => {
      const notificationDate = new Date(notification.sentAt);
      return notificationDate >= cutoffDate;
    });
    setNotifications(updatedNotifications);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-10">
      <div className="max-w-7xl mx-auto bg-white p-8 shadow-md rounded-md">
        <h1 className="text-2xl font-bold mb-5">
          View All Previous Push Notifications
        </h1>

        {/* Search Input */}
        <div className="mb-4">
          <input
            type="text"
            placeholder="Search by title or description..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full p-2 border rounded-md"
          />
        </div>

        {/* Remove Notifications Older than 15 Days */}
        <div className="mb-4 text-right">
          <button
            onClick={handleRemoveOldNotifications}
            className="bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-700"
          >
            Remove All Notifications Before 15 days
          </button>
        </div>

        {/* Notifications Table */}
        <table className="min-w-full table-auto border-collapse bg-white shadow-md rounded-md">
          <thead>
            <tr className="bg-gray-200">
              <th className="p-2 border">SL</th>
              <th className="p-2 border">Notification Channel</th>
              <th className="p-2 border">Notification Title</th>
              <th className="p-2 border">Notification Description</th>
              <th className="p-2 border">Sent At</th>
              <th className="p-2 border">Action</th>
            </tr>
          </thead>
          <tbody>
            {currentItems.length > 0 ? (
              currentItems.map((notification, index) => (
                <tr key={notification.id} className="border-b">
                  <td className="p-2 border">
                    {index + 1 + (currentPage - 1) * itemsPerPage}
                  </td>
                  <td className="p-2 border">{notification.channel}</td>
                  <td className="p-2 border">{notification.title}</td>
                  <td className="p-2 border">{notification.description}</td>
                  <td className="p-2 border">{notification.sentAt}</td>
                  <td className="p-2 border">
                    <button
                      className="text-red-500 hover:text-red-700"
                      onClick={() => handleDelete(notification.id)}
                    >
                      <FiTrash2 />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="text-center p-4">
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
            {Math.min(indexOfLastItem, filteredNotifications.length)} of{" "}
            {filteredNotifications.length} entries
          </span>
          <div className="flex space-x-2">
            {Array.from(
              {
                length: Math.ceil(filteredNotifications.length / itemsPerPage),
              },
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
