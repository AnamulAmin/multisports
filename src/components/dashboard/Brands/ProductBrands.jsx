import { useState, useEffect, useCallback } from "react";
import { FiEdit, FiTrash2 } from "react-icons/fi";
import Modal from "../../../shared/Modal/Modal";
import CreateBrandForm from "./Forms/CreateBrandForm";
import useGetAllProductBrands from "../../../Hook/GetDataHook/useGetAllProductBrands";
import CellImage from "../../../shared/ImageComponents/CellImage";
import Swal from "sweetalert2";
import EditBrandForm from "./Forms/EditBrandForm";
import TableSkeleton from "../../../components library/TableSkeleton";
import { IoAddCircle } from "react-icons/io5";
import { FaRetweet } from "react-icons/fa6";
import DeleteButton from "../../../components library/DeleteButton";
import EditButton from "../../../components library/EditButton";
import { HiArrowCircleDown, HiArrowCircleUp } from "react-icons/hi";
import toast from "react-hot-toast";
import useAxiosSecure from "../../../Hook/useAxiosSecure";
import Mpagination from "../../../shared/Mpagination";
import BgBlurModal from "../../../shared/Modal/BgBlurModal";
const ProductBrands = () => {
  // State management
  const [Brands, setBrands] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isEdited, setIsEdited] = useState(false);
  const [isDeleted, setIsDeleted] = useState(false);
  const [isShowModal, setIsShowModal] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const [targetId, setTargetId] = useState("");
  const itemsPerPage = 10;
  const axiosSecure = useAxiosSecure();
  // Sort configuration
  const [sortConfig, setSortConfig] = useState({ key: "id", direction: "asc" });

  // Fetch product brands with custom hook
  const productBrands = useGetAllProductBrands({
    isEdited,
    isDeleted,
    setLoading,
    isShowModal,
  });

  const { paginatedData, paginationControls } = Mpagination({
    totalData: productBrands,
  });

  // Sorting handler
  const handleSort = (key) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });
  };

  // Sorted data based on configuration
  const sortedCategories = useCallback(() => {
    const sortedData = [...productBrands];
    sortedData.sort((a, b) => {
      if (a[sortConfig.key] < b[sortConfig.key])
        return sortConfig.direction === "asc" ? -1 : 1;
      if (a[sortConfig.key] > b[sortConfig.key])
        return sortConfig.direction === "asc" ? 1 : -1;
      return 0;
    });
    return sortedData;
  }, [productBrands, sortConfig]);

  const handleEdit = (id) => {
    setTargetId(id);
    setIsEdited(true);
  };

  const handleDelete = async (id) => {
    try {
      Swal.fire({
        title: "Are you sure you want to delete this?",
        text: "This action cannot be undone!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#d33",
        cancelButtonColor: "#3085d6",
        confirmButtonText: "Yes, delete it!",
        cancelButtonText: "No, cancel!",
      }).then(async (result) => {
        if (result.isConfirmed) {
          try {
            const res = await axiosSecure.delete(`/product-brands/${id}`);

            if (res.status === 200 || res.status === 201) {
              setIsDeleted((prev) => !prev);

              toast.success("Item deleted successfully!");
            }
          } catch (error) {
            toast.error("Error deleting user!");
          }
        }
      });
    } catch (error) {
      toast.error("Error deleting Item!");
    }
  };

  return (
    <>
      <div className="container mx-auto p-6 pt-0">
        <div className="flex justify-between items-center mb-9">
          <h1 className="text-3xl header font-semibold">Brand List</h1>
          <div className="flex gap-4">
            <button
              className="customSaveButton"
              onClick={() => setIsShowModal(true)}
            >
              <span className="flex items-center gap-1">
                <IoAddCircle /> Add New Brand
              </span>
            </button>
            {/* <button className="customCancelButton">
              <span className="flex items-center gap-1">
                <FaRetweet /> Rearrange Brand
              </span>
            </button> */}
          </div>
        </div>

        {/* Loading Spinner */}
        {loading ? (
          <div>
            <TableSkeleton></TableSkeleton>
          </div>
        ) : (
          <div className="overflow-x-auto relative shadow-md sm:rounded-lg">
            <table className="w-full text-sm text-center text-gray-500">
              <thead className="bg-gray-100 text-lg">
                <tr>
                  <td
                    className="border flex justify-center items-center gap-2 text-lg p-2 text-center cursor-pointer"
                    onClick={() => handleSort("id")}
                  >
                    SL{" "}
                    {sortConfig.key === "id" &&
                      (sortConfig.direction === "asc" ? (
                        <HiArrowCircleUp className="text-[#087D6D] " />
                      ) : (
                        <HiArrowCircleDown className="text-[#E68923]" />
                      ))}
                  </td>
                  <td
                    className="border p-2 text-center cursor-pointer"
                    onClick={() => handleSort("brandName")}
                  >
                    Name{" "}
                    {sortConfig.key === "brandName" &&
                      (sortConfig.direction === "asc" ? "🔼" : "🔽")}
                  </td>
                  <td className="border p-2 text-center">Logo</td>
                  <td className="border p-2 text-center">Banner</td>
                  <td
                    className="border p-2 text-center cursor-pointer"
                    onClick={() => handleSort("category")}
                  >
                    Category{" "}
                    {sortConfig.key === "category" &&
                      (sortConfig.direction === "asc" ? "🔼" : "🔽")}
                  </td>
                  <td
                    className="border p-2 text-center cursor-pointer"
                    onClick={() => handleSort("subcategory")}
                  >
                    Subcategory{" "}
                    {sortConfig.key === "subcategory" &&
                      (sortConfig.direction === "asc" ? "🔼" : "🔽")}
                  </td>
                  <td
                    className="border p-2 text-center cursor-pointer"
                    onClick={() => handleSort("slug")}
                  >
                    Slug{" "}
                    {sortConfig.key === "slug" &&
                      (sortConfig.direction === "asc" ? "🔼" : "🔽")}
                  </td>
                  <td className="border p-2 text-center">Action</td>
                </tr>
              </thead>
              <tbody>
                {paginatedData?.length > 0 &&
                  paginatedData.map((brand, index) => (
                    <tr key={brand.id} className="border-b">
                      <td className="border p-2">
                        {index + 1 + currentPage * itemsPerPage}
                      </td>
                      <td className="border p-2">{brand.brandName}</td>
                      <td className="border p-2 flex justify-center">
                        <div className="rounded-full border border-gray-200 max-w-20 overflow-hidden">
                          <CellImage
                            width={400}
                            height={400}
                            src={brand.logo}
                            alt="Logo"
                          />
                        </div>
                      </td>
                      <td className="border p-2 ">
                        <div className="flex justify-center">
                          <CellImage
                            width={400}
                            height={400}
                            src={brand.banner}
                            alt="Banner"
                          />
                        </div>
                      </td>
                      <td className="border p-2">
                        <span className="border p-2 rounded-xl border-[#087d6d2d] font-semibold">
                          {brand.category}
                        </span>
                      </td>
                      <td className="border p-2">{brand.subcategory}</td>
                      <td className="border p-2">{brand.slug}</td>
                      <td className="border p-2">
                        <div className="flex justify-center space-x-2">
                          <EditButton
                            onClick={() => handleEdit(brand._id)}
                          ></EditButton>
                          <DeleteButton
                            onClick={() => handleDelete(brand._id)}
                          ></DeleteButton>
                        </div>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        )}

        {paginationControls}
      </div>

      {/* Modal for Adding/Editing Brand */}
      <BgBlurModal isShowModal={isShowModal} setIsShowModal={setIsShowModal}>
        <CreateBrandForm
          isShowModal={isShowModal}
          setIsShowModal={setIsShowModal}
        />
      </BgBlurModal>

      <BgBlurModal isShowModal={isEdited} setIsShowModal={setIsEdited}>
        <EditBrandForm
          isShowModal={isEdited}
          setIsShowModal={setIsEdited}
          targetId={targetId}
        />
      </BgBlurModal>
    </>
  );
};

export default ProductBrands;
