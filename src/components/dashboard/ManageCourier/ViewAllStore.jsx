import { useState, useEffect, useCallback } from "react";

import useAxiosSecure from "../../../Hook/useAxiosSecure";

export default function ViewAllStores() {
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 30;
  const [courierStore, setCourierStore] = useState([]);
  const [sortConfig, setSortConfig] = useState({ key: "id", direction: "asc" });
  const axiosSecure = useAxiosSecure();

  const sortedcourierStore = useCallback(() => {
    const sortedData = [...courierStore];
    sortedData.sort((a, b) => {
      if (a[sortConfig.key] < b[sortConfig.key]) {
        return sortConfig.direction === "asc" ? -1 : 1;
      }
      if (a[sortConfig.key] > b[sortConfig.key]) {
        return sortConfig.direction === "asc" ? 1 : -1;
      }
      return 0;
    });
    return sortedData;
  }, [courierStore, sortConfig]);

  const paginatedData = useCallback(() => {
    const offset = currentPage * itemsPerPage;
    return sortedcourierStore().slice(offset, offset + itemsPerPage);
  }, [currentPage, itemsPerPage, courierStore, sortedcourierStore]);

  const handleSort = (key) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });
  };

  const handlePageClick = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  useEffect(() => {
    const fetchCourierStore = async () => {
      try {
        const res = await axiosSecure.get("/courier/store");

        if (res.status === 200 || res.status === 201) {
          setCourierStore(res.data?.data?.data?.data);
        }
      } catch (error) {
        console.error("Error fetching courierStore:", error);
        throw new Error("Failed to fetch courierStore");
      }
    };

    fetchCourierStore();
  }, [axiosSecure]);

  return (
    <div className="p-6 pt-0">
      <div className="">
        <h1 className="text-3xl header font-semibold mb-9">Store List</h1>
        <table className="min-w-full shadow table-auto border-collapse">
          <thead className="text-lg">
            <tr>
              <td className="border flex justify-center items-center gap-2 text-lg p-2 text-center cursor-pointer">
                SL{" "}
              </td>
              <td
                className="border p-2 text-center cursor-pointer"
                onClick={() => handleSort("store_name")}
              >
                Store Name{" "}
                {sortConfig.key === "store_name" &&
                  (sortConfig.direction === "asc" ? "🔼" : "🔽")}
              </td>
              <td
                className="border p-2 text-center cursor-pointer"
                onClick={() => handleSort("store_address")}
              >
                Store Address{" "}
                {sortConfig.key === "store_address" &&
                  (sortConfig.direction === "asc" ? "🔼" : "🔽")}
              </td>
              <td
                className="border p-2 text-center cursor-pointer"
                onClick={() => handleSort("city_id")}
              >
                City ID{" "}
                {sortConfig.key === "city_id" &&
                  (sortConfig.direction === "asc" ? "🔼" : "🔽")}
              </td>
              <td
                className="border p-2 text-center cursor-pointer"
                onClick={() => handleSort("zone_id")}
              >
                Zone Id
                {sortConfig.key === "zone_id" &&
                  (sortConfig.direction === "asc" ? "🔼" : "🔽")}
              </td>
              <td
                className="border p-2 text-center cursor-pointer"
                onClick={() => handleSort("hub_id")}
              >
                Hub Id
                {sortConfig.key === "hub_id" &&
                  (sortConfig.direction === "asc" ? "🔼" : "🔽")}
              </td>
            </tr>
          </thead>
          <tbody>
            {paginatedData()?.length > 0 &&
              paginatedData().map((item, index) => (
                <tr key={item.id} className="border-b text-center">
                  <td className="border p-2 ">
                    {index + 1 + currentPage * itemsPerPage}
                  </td>
                  <td className="border p-2">{item.store_name}</td>
                  <td className="border p-2">{item.store_address}</td>
                  <td className="border p-2">{item.city_id}</td>
                  <td className="border p-2">{item.zone_id}</td>
                  <td className="border p-2">{item.hub_id}</td>
                </tr>
              ))}
          </tbody>
        </table>

        {/* Pagination */}
        <div className="mt-5 flex justify-center space-x-2">
          {Array.from({
            length: Math.ceil(courierStore.length / itemsPerPage),
          }).map((_, pageIndex) => (
            <button
              key={pageIndex}
              onClick={() => handlePageClick(pageIndex)}
              className={`px-3 py-1 border rounded-md ${
                currentPage === pageIndex
                  ? "bg-blue-500 text-white"
                  : "hover:bg-gray-200"
              }`}
            >
              {pageIndex + 1}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
