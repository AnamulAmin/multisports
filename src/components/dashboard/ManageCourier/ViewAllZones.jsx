import { useState, useEffect, useCallback } from "react";

import useAxiosSecure from "../../../Hook/useAxiosSecure";
import { Link, useParams } from "react-router-dom";
import Swal from "sweetalert2";

export default function ViewAllZones() {
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 30;
  const [courierCities, setCourierCities] = useState([]);
  const [sortConfig, setSortConfig] = useState({ key: "id", direction: "asc" });
  const axiosSecure = useAxiosSecure();

  const { city_id } = useParams();

  const sortedcourierCities = useCallback(() => {
    const sortedData = [...courierCities];
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
  }, [courierCities, sortConfig]);

  const paginatedData = useCallback(() => {
    const offset = currentPage * itemsPerPage;
    return sortedcourierCities().slice(offset, offset + itemsPerPage);
  }, [currentPage, itemsPerPage, courierCities, sortedcourierCities]);

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
    const fetchCourierCities = async () => {
      try {
        const res = await axiosSecure.get(`/courier/zones/${city_id}`);

        if (res.status === 200 || res.status === 201) {
          setCourierCities(res.data?.data?.data?.data);
        }
      } catch (error) {
        console.error("Error fetching courierCities:", error);
        throw new Error("Failed to fetch courierCities");
      }
    };

    fetchCourierCities();
  }, [axiosSecure, city_id]);

  const handleSubmitAllZonesData = async (e) => {
    e.preventDefault();
    const formData = {
      city_id: city_id,
      items: courierCities,
    };

    try {
      const res = await axiosSecure.post(`/zones/multiple`, formData);

      if (res.status === 200 || res.status === 201) {
        Swal.fire({
          title: "Success!",
          text: "Zones updated successfully",
          icon: "success",
          confirmButtonText: "Ok",
        });
      }
    } catch (err) {
      Swal.fire({
        title: "Error!",
        text: "Something went wrong!",
        icon: "error",
        confirmButtonText: "Ok",
      });
    }
  };

  return (
    <div className="p-6 pt-0">
      <div className="breadcrumbs text-sm">
        <ul>
          <li>
            <Link to={`/dashboard`}>Dashboard</Link>
          </li>
          <li>
            <Link to={`/dashboard/view-all-cities`}>Cities</Link>
          </li>
          <li>Zones</li>
        </ul>

        <button
          className="btn btn-sm btn-primary"
          onClick={handleSubmitAllZonesData}
        >
          Submit All Zones Data
        </button>
      </div>
      <div className="">
        <h1 className="text-3xl header font-semibold mb-9">Zone List</h1>

        <table className="min-w-full shadow table-auto border-collapse">
          <thead className="text-lg">
            <tr>
              <td className="border flex justify-center items-center gap-2 text-lg p-2 text-center cursor-pointer">
                SL{" "}
              </td>
              <td
                className="border p-2 text-center cursor-pointer"
                onClick={() => handleSort("zone_name")}
              >
                Zone Name{" "}
                {sortConfig.key === "zone_name" &&
                  (sortConfig.direction === "asc" ? "🔼" : "🔽")}
              </td>

              <td
                className="border p-2 text-center cursor-pointer"
                onClick={() => handleSort("zone_id")}
              >
                Zone ID{" "}
                {sortConfig.key === "zone_id" &&
                  (sortConfig.direction === "asc" ? "🔼" : "🔽")}
              </td>
              <td className="border p-2 text-center cursor-pointer">Action</td>
            </tr>
          </thead>
          <tbody>
            {paginatedData()?.length > 0 &&
              paginatedData().map((item, index) => (
                <tr key={item.id} className="border-b text-center">
                  <td className="border p-2 ">
                    {index + 1 + currentPage * itemsPerPage}
                  </td>
                  <td className="border p-2">{item.zone_name}</td>
                  <td className="border p-2">{item.zone_id}</td>

                  <td className="border p-2">
                    <Link
                      className="px-2 py-1 bg-green-600 rounded-md text-white hover:bg-green-500"
                      to={`/dashboard/area/${item?.zone_id}`}
                    >
                      View Area
                    </Link>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>

        {/* Pagination */}
        <div className="mt-5 flex justify-center space-x-2">
          {Array.from({
            length: Math.ceil(courierCities.length / itemsPerPage),
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
