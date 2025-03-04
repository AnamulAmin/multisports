import { useEffect, useState } from "react";
import { CSVLink } from "react-csv";
import { IoIosSearch } from "react-icons/io";
import { RxDownload } from "react-icons/rx";
import DeleteButton from "../../../components library/DeleteButton";
import useGetAllCustomers from "../../../Hook/GetDataHook/useGetAllCustomers";
import useDebounce from "../../../Hook/useDebounce";
import moment from "moment";
import BgBlurModal from "../../../shared/Modal/BgBlurModal";
import CustomerDetail from "./Forms/CustomerDetail";
import EditButton from "../../../components library/EditButton";
import { baseImageUrl } from "../../../apis/apis";
import { ColorRing } from "react-loader-spinner";
import useExportToExcel from "../../../config/Export/useExportToExcel";
import Pagination from "../../partial/Pagination/Pagination";

export default function CustomersList() {
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

  const [csvHeaders, setCsvHeaders] = useState([]);

  const { customers, totalItems, totalPages } = useGetAllCustomers({
    isShowModal: isShowModal,
    isDeleted,
    setLoading,
    query: `page=${currentPage}&search=${debouncedValue}&currentPage=${currentPage}&limit=${itemsPerPage}`,
  });

  const exportToExcel = useExportToExcel({ data: customers });

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

  useEffect(() => {
    const initialCsvHeaders = [];

    for (let i = 0; i < customers.length; i++) {
      const customer = customers[i];
      for (let key in customer) {
        if ([...initialCsvHeaders, "_id", "__v"].includes(key)) continue;
        initialCsvHeaders.push({
          label: key,
          key: key,
        });
      }
    }
    setCsvHeaders(initialCsvHeaders);
  }, [customers]);

  return (
    <div className="p-6 pt-0">
      <div className="w-full">
        <div className="flex items-center mb-9 justify-between">
          <h1 className="text-3xl font-semibold ">Customers List</h1>
          {/* Download as Excel (CSV) Button */}
          <div className="flex gap-4 items-center justify-center">
            <div className=" flex justify-end">
              <button
                onClick={exportToExcel}
                className="flex items-center gap-2 bg-yellow-400 py-2 px-4 rounded-full hover:bg-yellow-500"
              >
                <RxDownload />
                Download as Excel
              </button>
            </div>
            <div className=" flex justify-end">
              <CSVLink
                data={customers}
                headers={csvHeaders}
                filename="customers_list.csv"
                className="customSaveButton"
              >
                <span className="flex items-center gap-2">
                  <RxDownload />
                  Download as CSV
                </span>
              </CSVLink>
            </div>
          </div>
        </div>
        {/* Search Input */}
        <div className="bg-white border rounded-full px-3 mb-6 md:py-2 py-1 md:gap-2 gap-1 flex-row-reverse justify-between flex">
          <input
            type="text"
            className="outline-none w-full bg-white"
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search here ..."
          />
          <IoIosSearch className="text-2xl text-gray-400" />
        </div>

        {/* Customers Table */}
        <table className="min-w-full table-auto border-collapse bg-white shadow rounded-md">
          <thead>
            <tr className="bg-gray-200 text-center">
              <td className="p-2 border">SL</td>
              <td className="p-2 border">Image</td>
              <td className="p-2 border">Name</td>
              <td className="p-2 border">Email</td>
              <td className="p-2 border">Phone</td>
              <td className="p-2 border">Created At</td>
              <td className="p-2 border">Action</td>
            </tr>
          </thead>
          <tbody>
            {customers.length > 0 && !loading ? (
              customers.map((customer, index) => (
                <tr key={customer.id} className="border-b">
                  <td className="p-2 border">{index + 1}</td>
                  <td className="p-2 border">
                    <div className="avatar w-full flex items-center justify-center mb-5 ">
                      <div className="w-24 rounded ">
                        <img
                          src={
                            customer?.photourl
                              ? `${baseImageUrl}/${customer.photourl}`
                              : "/no-image.png"
                          }
                        />
                      </div>
                    </div>
                  </td>
                  <td className="p-2 border">{customer.username}</td>
                  <td className="p-2 border">{customer.email}</td>
                  <td className="p-2 border">{customer.contact_no || "-"}</td>
                  <td className="p-2 border">
                    {moment(customer.register_date).format("YYYY-MM-DD")}
                  </td>
                  <td className="p-2 border ">
                    <div className="flex justify-center space-x-2">
                      <EditButton
                        onClick={() => handleEdit(customer)}
                      ></EditButton>
                      <DeleteButton
                        onClick={() => handleDelete(customer.id)}
                      ></DeleteButton>
                    </div>
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
      </div>
      <Pagination
        currentPage={currentPage}
        totalItems={totalItems}
        itemsPerPage={itemsPerPage}
        setCurrentPage={setCurrentPage}
      />

      <BgBlurModal isShowModal={isShowModal} setIsShowModal={setIsShowModal}>
        <CustomerDetail
          singleData={singleData}
          isShow={isShowModal}
          setIsShow={setIsShowModal}
        />
      </BgBlurModal>
    </div>
  );
}
