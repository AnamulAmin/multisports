import { useState } from "react";
import { FiTrash2 } from "react-icons/fi";
import { IoIosSearch } from "react-icons/io";
import DeleteButton from "../../../components library/DeleteButton";

// Sample SMS history data (could be fetched from an API)
const initialSmsHistory = [
  {
    id: 1,
    template: "Order Confirmation",
    sendingType: "Specific Customer",
    contact: "1234567890",
    smsReceivers: 1,
    orderCountRange: "1 - 5",
    orderValueRange: "1000 - 5000",
    sentAt: "2024-03-15 10:30:00 am",
  },
  {
    id: 2,
    template: "Welcome Message",
    sendingType: "Everyone",
    contact: "N/A",
    smsReceivers: 100,
    orderCountRange: "N/A",
    orderValueRange: "N/A",
    sentAt: "2024-03-14 09:00:00 am",
  },
  // Add more SMS history records if needed
];

export default function SmsHistory() {
  const [smsHistory, setSmsHistory] = useState(initialSmsHistory);
  const [searchTerm, setSearchTerm] = useState("");
  const [message, setMessage] = useState("");

  // Function to filter SMS history based on the search term
  const filteredHistory = smsHistory.filter(
    (sms) =>
      sms.template.toLowerCase().includes(searchTerm.toLowerCase()) ||
      sms.contact.includes(searchTerm)
  );

  // Function to remove an SMS history entry
  const handleDelete = (id) => {
    const updatedHistory = smsHistory.filter((sms) => sms.id !== id);
    setSmsHistory(updatedHistory);
    setMessage("SMS history deleted successfully!");
  };

  // Function to remove all SMS before 15 days (for simplicity, removing all in this example)
  const handleRemoveAllBefore15Days = () => {
    setSmsHistory([]);
    setMessage("All SMS history before 15 days removed!");
  };

  return (
    <div className="p-6 pt-0">
      <div className="">
        <div className="mb-9  flex justify-between">
          <h1 className="text-3xl font-semibold">View All SMS History</h1>
          <div className="flex  justify-end">
            <button
              className="customCancelButton"
              onClick={handleRemoveAllBefore15Days}
            >
              Remove All SMS Before 15 Days
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
            placeholder="Search by template or contact..."
          />
          <IoIosSearch className="text-2xl text-gray-400" />
        </div>

        {/* SMS History Table */}
        <table className="min-w-full table-auto border-collapse bg-white shadow-md rounded-md">
          <thead>
            <tr className="bg-gray-200 text-center">
              <td className="p-2 border">SL</td>
              <td className="p-2 border">SMS Template</td>
              <td className="p-2 border">Sending Type</td>
              <td className="p-2 border">Contact</td>
              <td className="p-2 border">SMS Receivers</td>
              <td className="p-2 border">Order Count Range</td>
              <td className="p-2 border">Order Value Range</td>
              <td className="p-2 border">Sent At</td>
              <td className="p-2 border">Action</td>
            </tr>
          </thead>
          <tbody>
            {filteredHistory.length > 0 ? (
              filteredHistory.map((sms, index) => (
                <tr key={sms.id} className="border-b text-center">
                  <td className="p-2 border">{index + 1}</td>
                  <td className="p-2 border">{sms.template}</td>
                  <td className="p-2 border">{sms.sendingType}</td>
                  <td className="p-2 border">{sms.contact}</td>
                  <td className="p-2 border">{sms.smsReceivers}</td>
                  <td className="p-2 border">{sms.orderCountRange}</td>
                  <td className="p-2 border">{sms.orderValueRange}</td>
                  <td className="p-2 border">{sms.sentAt}</td>
                  <td className="p-2 py-3 border">
                    <DeleteButton onClick={() => handleDelete(sms.id)} />
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="9" className="text-center p-4">
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
