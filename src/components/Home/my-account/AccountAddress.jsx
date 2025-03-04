import { useEffect, useState } from "react";
import useGetAllShippingAddress from "../../../Hook/GetDataHook/useGetAllShippingAddress";
import CreateShippingAddress from "./CreateShippingAddress";
import BgBlurModal from "../../../shared/Modal/BgBlurModal";
import { FaEdit } from "react-icons/fa";
import { IoMdClose } from "react-icons/io";
import { MdDeleteForever } from "react-icons/md";
import Swal from "sweetalert2";
import toast from "react-hot-toast";
import useAxiosSecure from "../../../Hook/useAxiosSecure";
import { useAuth } from "../../../providers/AuthProvider";

export default function AccountAddress({ isShow, setIsShow }) {
  const { user } = useAuth();
  const [isShowModal, setIsShowModal] = useState();
  const [singleData, setSingleData] = useState(null);
  const [currentAddress, setCurrentAddress] = useState(null);
  const [isDeleted, setIsDeleted] = useState(false);

  const address = useGetAllShippingAddress({
    isEdited: isShowModal,
    isDeleted,
    param: user?._id ? `user/${user?._id}` : null,
  });

  //

  const axiosSecure = useAxiosSecure();

  const handleEdit = (data) => {
    setSingleData(data);
    setIsShowModal(true);
  };

  const handleDefaultAddress = (data) => {
    setCurrentAddress(data);
    localStorage.setItem("shippingAddress", JSON.stringify(data));
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
            const res = await axiosSecure.delete(`/shipping/${id}`);

            if (res.status === 200 || res.status === 201) {
              setIsDeleted((prev) => !prev);
              toast.success("Address deleted successfully!");
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

  useEffect(() => {
    const storedAddress = localStorage.getItem("shippingAddress");
    if (storedAddress) {
      const address = JSON.parse(storedAddress);
      setCurrentAddress(address);
    }
  }, []);

  return (
    <>
      <div className="bg-white p-4 rounded-2xl">
        <div className="flex justify-between items-center gap-4 mb-4">
          <h2 className="text-2xl font-bold ">Shipping Address</h2>
          {setIsShow && (
            <button onClick={() => setIsShow(false)}>
              <IoMdClose size={30} />
            </button>
          )}
        </div>
        <div className="bg-white p-4 rounded-2xl grid grid-cols-2 gap-4 border min-h-[400px]">
          {address?.length > 0 &&
            address.map((item, index) => (
              <div
                className={`border p-6 rounded-md border-r border-gray-200 hover:bg-gray-100 ${
                  item?._id === currentAddress?._id ? "bg-gray-200" : ""
                }`}
                key={index}
              >
                <div className="flex justify-end gap-4 items-center text-sm  mb-3">
                  <button
                    className="btn btn-sm bg-red-300 "
                    onClick={() => handleDelete(item._id)}
                    title="Delete"
                  >
                    <MdDeleteForever />
                  </button>
                  <button
                    className="btn btn-sm"
                    onClick={() => handleEdit(item)}
                    title="Edit"
                  >
                    <FaEdit />
                  </button>
                  <input
                    type="checkbox"
                    checked={item?._id === currentAddress?._id}
                    className="checkbox checkbox-accent checkbox-md"
                    onChange={() => handleDefaultAddress(item)}
                    title="Default Shipping Address"
                  />
                </div>
                <div className="flex justify-between text-sm text-gray-500">
                  <b className="font-bold text-lg">Name</b>
                  <span className="font-medium">{item.recipientName}</span>
                </div>
                <div className="flex justify-between text-sm text-gray-500 ">
                  <b className="font-bold text-lg">Phone</b>
                  <span className="font-medium">{item.contact_number}</span>
                </div>
                <div className="flex justify-between text-sm text-gray-500 ">
                  <b className="font-bold text-lg">Secondary Number</b>
                  <span className="font-medium">
                    {item.secondaryContactNumber}
                  </span>
                </div>
                <div className="flex justify-between text-sm text-gray-500 ">
                  <b className="font-bold text-lg">City</b>
                  <span className="font-medium">{item.city_name}</span>
                </div>
                <div className="flex justify-between text-sm text-gray-500 ">
                  <b className="font-bold text-lg">Zone</b>
                  <span className="font-medium">{item.zone_name}</span>
                </div>
                <div className="flex justify-between text-sm text-gray-500">
                  <b className="font-bold text-lg">Area</b>
                  <span className="font-medium">{item.area_name}</span>
                </div>

                <div className="flex justify-between text-sm text-gray-500 ">
                  <b className="font-bold text-lg">Address</b>
                  <span className="font-medium">{item.address}</span>
                </div>
              </div>
            ))}
          <button
            onClick={() => setIsShowModal(true)}
            className="border  rounded-md border-r border-gray-200 btn"
          >
            Add
          </button>
        </div>
      </div>

      <BgBlurModal isShowModal={isShowModal} setIsShowModal={setIsShowModal}>
        <CreateShippingAddress
          addressData={singleData}
          isShowModal={isShowModal}
          setIsShowModal={setIsShowModal}
        />
      </BgBlurModal>
    </>
  );
}
