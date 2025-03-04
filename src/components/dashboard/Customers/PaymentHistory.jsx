import { useState } from "react";
import { IoIosSearch } from "react-icons/io";

export default function PaymentHistory() {
  const initialData = [
    {
      id: 1,
      paymentThrough: "Visa",
      transactionId: "TXN123456",
      cardType: "Credit",
      cardBrand: "Visa",
      amount: "BDT 500",
      storeAmount: "BDT 480",
      currency: "BDT",
      bankTranId: "BANK123",
      datetime: "2024-01-01 12:30:00",
      status: "Success",
    },
    {
      id: 2,
      paymentThrough: "MasterCard",
      transactionId: "TXN654321",
      cardType: "Debit",
      cardBrand: "MasterCard",
      amount: "BDT 800",
      storeAmount: "BDT 780",
      currency: "BDT",
      bankTranId: "BANK654",
      datetime: "2024-01-02 14:30:00",
      status: "Success",
    },
    // Add more payment entries as needed
  ];

  const [data, setData] = useState(initialData);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(15);
  const [searchTerm, setSearchTerm] = useState("");

  // Pagination Logic
  const totalPages = Math.ceil(data.length / itemsPerPage);
  const startIdx = (currentPage - 1) * itemsPerPage;
  const currentData = data.slice(startIdx, startIdx + itemsPerPage);

  // Handle Search
  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    const filteredData = initialData.filter(
      (item) =>
        item.transactionId
          .toLowerCase()
          .includes(e.target.value.toLowerCase()) ||
        item.bankTranId.toLowerCase().includes(e.target.value.toLowerCase()) ||
        item.paymentThrough.toLowerCase().includes(e.target.value.toLowerCase())
    );
    setData(filteredData);
    setCurrentPage(1); // Reset to first page on search
  };

  return (
    <div className="p-6 pt-0">
      <div className="">
        <h1 className="text-3xl font-semibold mb-9">Order Payment History</h1>

        {/* Search Input */}

        <div className="bg-white border rounded-full px-3 mb-6 md:py-2 py-1 md:gap-2 gap-1 flex-row-reverse justify-between flex">
          <input
            type="text"
            className="outline-none w-full bg-white"
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search by transaction ID, bank tran ID, or payment method..."
          />
          <IoIosSearch className="text-2xl text-gray-400" />
        </div>

        {/* Payment History Table */}
        <table className="min-w-full table-auto border-collapse bg-white shadow rounded-md">
          <thead>
            <tr className="bg-gray-200 text-center">
              <td className="p-2 border">SL</td>
              <td className="p-2 border">Payment Tdrough</td>
              <td className="p-2 border">Transaction ID</td>
              <td className="p-2 border">Card Type</td>
              <td className="p-2 border">Card Brand</td>
              <td className="p-2 border">Amount</td>
              <td className="p-2 border">Store Amount</td>
              <td className="p-2 border">Currency</td>
              <td className="p-2 border">Bank Tran ID</td>
              <td className="p-2 border">Datetime</td>
              <td className="p-2 border">Status</td>
            </tr>
          </thead>
          <tbody>
            {currentData.length > 0 ? (
              currentData.map((item, index) => (
                <tr key={item.id} className="border-b text-center">
                  <td className="p-2 border">{startIdx + index + 1}</td>
                  <td className="p-2 border">{item.paymentThrough}</td>
                  <td className="p-2 border">{item.transactionId}</td>
                  <td className="p-2 border">{item.cardType}</td>
                  <td className="p-2 border">{item.cardBrand}</td>
                  <td className="p-2 border">{item.amount}</td>
                  <td className="p-2 border">{item.storeAmount}</td>
                  <td className="p-2 border">{item.currency}</td>
                  <td className="p-2 border">{item.bankTranId}</td>
                  <td className="p-2 border">{item.datetime}</td>
                  <td className="p-2 py-4 border">
                    <span className="bg-[#31B349] text-white px-2 py-1 rounded-lg">
                      {item.status}
                    </span>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="11" className="text-center p-4">
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
