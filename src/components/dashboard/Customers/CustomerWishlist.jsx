import { useEffect, useState } from "react";
import { IoIosSearch } from "react-icons/io";
import useExportToExcel from "../../../config/Export/useExportToExcel";
import useGetAllWishlist from "../../../Hook/GetDataHook/useGetAllWishlist";
import moment from "moment";
import useDebounce from "../../../Hook/useDebounce";
import CellImage from "../../../shared/ImageComponents/CellImage";
import Pagination from "../../partial/Pagination/Pagination";
import { ColorRing } from "react-loader-spinner";

export default function CustomerWishlist() {
  // const [customers, setCustomers] = useState(initialCustomers);
  const [searchTerm, setSearchTerm] = useState("");
  const [message, setMessage] = useState("");
  const [isShowModal, setIsShowModal] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [singleData, setSingleData] = useState(null);
  const [itemsPerPage, setItemsPerPage] = useState(15);

  const [isDeleted, setIsDeleted] = useState(false);
  const [loading, setLoading] = useState(false);
  const debouncedValue = useDebounce(searchTerm, 200);

  const { wishlist, totalItems } = useGetAllWishlist({
    isShowModal: isShowModal,
    isDeleted,
    setLoading,
    query: `page=${currentPage}&search=${debouncedValue}&currentPage=${currentPage}&limit=${itemsPerPage}`,
  });

  const handleEdit = (data) => {
    setSingleData(data);
    setIsShowModal(true);
  };

  // Handle customer deletion
  const handleDelete = (id) => {
    // setCustomers(customers.filter((customer) => customer.id !== id));
    setMessage("Customer deleted successfully!");
  };

  // if (loading) {
  //   return <GlobalLoading />;
  // }

  return (
    <div className="p-6 pt-0">
      <div className="">
        <h1 className="text-3xl font-semibold mb-9">WishList</h1>

        {/* Search Input */}
        <div className="bg-white border rounded-full px-3 mb-6 md:py-2 py-1 md:gap-2 gap-1 flex-row-reverse justify-between flex">
          <input
            type="text"
            className="outline-none w-full bg-white"
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search by product, customer name, or email..."
          />
          <IoIosSearch className="text-2xl text-gray-400" />
        </div>

        {/* Wishlist Table */}
        <table className="min-w-full table-auto border-collapse bg-white shadow rounded-md">
          <thead>
            <tr className="bg-gray-200 text-center">
              <td className="p-2 border">SL</td>
              <td className="p-2 border">Category</td>
              <td className="p-2 border">Image</td>
              <td className="p-2 border">Product</td>
              <td className="p-2 border">Customer Name</td>
              <td className="p-2 border">Email</td>
              <td className="p-2 border">Contact</td>
              <td className="p-2 border">Created At</td>
            </tr>
          </thead>
          <tbody>
            {wishlist.length > 0 && !loading ? (
              wishlist.map((item, index) => (
                <tr key={item.id} className="border-b text-center">
                  <td className="p-2 border">{index + 1}</td>
                  <td className="p-2 border">{item?.product_id?.category}</td>
                  <td className="p-2 border">
                    <CellImage src={item?.product_id?.thumbnail} />
                  </td>
                  <td className="p-2 border">
                    {item?.product_id?.productTitle || "-"}
                  </td>
                  <td className="p-2 border">{item?.userId?.username}</td>
                  <td className="p-2 border">{item.email}</td>
                  <td className="p-2 border">
                    {(item?.userId?.contact_no ||
                      item?.userId?.contact_no !== "false") &&
                      item?.userId?.contact_no}
                    {(item?.userId?.phoneNumber ||
                      item?.userId?.phoneNumber !== "false") &&
                      item?.userId?.phoneNumber}
                  </td>
                  <td className="p-2 border">
                    {moment(item.createdAt).format("DD-MM-YYYY")}
                  </td>
                </tr>
              ))
            ) : (
              <>
                {!loading && (
                  <tr>
                    <td colSpan="9" className="text-center p-4">
                      No data available in the table
                    </td>
                  </tr>
                )}
              </>
            )}
          </tbody>
        </table>
      </div>
      {loading && (
        <div className="flex justify-center items-center w-full py-28">
          <ColorRing
            visible={true}
            height="80"
            width="80"
            ariaLabel="color-ring-loading"
            wrapperStyle={{}}
            wrapperClass="color-ring-wrapper"
            colors={["#e15b64", "#f47e60", "#f8b26a", "#abbd81", "#849b87"]}
          />
        </div>
      )}
      <Pagination
        currentPage={currentPage}
        totalItems={totalItems}
        itemsPerPage={itemsPerPage}
        setCurrentPage={setCurrentPage}
      />
    </div>
  );
}
