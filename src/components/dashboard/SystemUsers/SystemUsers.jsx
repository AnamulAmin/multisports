import { useState } from "react";
import BgBlurModal from "../../../shared/Modal/BgBlurModal";
import SystemUserRegistration from "../MemberRegistration/SystemUserRegistration";
import useGetAllSystemUsers from "../../../Hook/GetDataHook/useGetAllSystemUsers";
import EditSystemUser from "../MemberRegistration/EditSystemUser/EditSystemUser";
import toast from "react-hot-toast";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../Hook/useAxiosSecure";
import EditButton from "../../../components library/EditButton";
import DeleteButton from "../../../components library/DeleteButton";
import { IoIosSearch } from "react-icons/io";

export default function SystemUsers() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [targetId, setTargetId] = useState(null);
  const [isEditShowModel, setIsEditShowModel] = useState(false);
  const [isDeleted, setIsDeleted] = useState(false);

  const axiosSecure = useAxiosSecure();

  const handleEdit = (id) => {
    setTargetId(id);
    setIsEditShowModel(true);
  };

  const systemUsers = useGetAllSystemUsers({
    isDeleted,
    isEdited: isEditShowModel,
    isShowModal: isModalOpen,
  });

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
            const res = await axiosSecure.delete(`/users/system-user/${id}`);

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
    <div className="p-6 pt-0">
      <div className="flex items-center justify-between  mb-9">
        <h1 className="text-3xl font-semibold border-l-[5px] border-blue-400 pl-3">System Users List</h1>
        <div className="flex gap-5 justify-between">
          {/* Search Input */}
          <div className="bg-white border rounded-2xl px-3  md:py-2 py-1 md:gap-2 gap-1 flex-row-reverse justify-between flex">
            <input
              type="text"
              className="outline-none w-full bg-white"
              // onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search here ..."
            />
            <IoIosSearch className="text-2xl text-gray-400" />
          </div>
          <button
            className="customSaveButton "
            onClick={() => setIsModalOpen(true)}
          >
            + Add New User
          </button>
        </div>
      </div>

      <table className="min-w-full table-auto">
        <thead>
          <tr className="bg-white text-left font-semibold">
            {/* <td className="p-3 border">Serial</td> */}
            <td className="p-3 pl-5 border border-gray-100 ">Name</td>
            <td className="p-3 pl-5 border border-gray-100">Email</td>
            <td className="p-3 pl-5 border border-gray-100">Phone</td>
            <td className="p-3 pl-5 border border-gray-100">Address</td>
            <td className="p-3 pl-5 border border-gray-100">User Type</td>
            <td className="p-3 pl-5 border border-gray-100">Action</td>
          </tr>
        </thead>
        <tbody>
          {systemUsers?.length > 0 &&
            systemUsers.map((user, index) => (
              <tr key={user.id} className="bg-white text-gray-600 font-[500] text-left">
                {/* <td className="p-3 pl-5 border border-gray-100">{index + 1}</td> */}
                <td className="p-3 pl-5 border border-gray-100">{user.username}</td>
                <td className="p-3 pl-5 border border-gray-100">{user.email}</td>
                <td className="p-3 pl-5 border border-gray-100">{user.contact_no}</td>
                <td className="p-3 pl-5 border border-gray-100">{user.address}</td>
                <td className="p-3 pl-5 border border-gray-100">
                  <span
                    className={`capitalize px-3 py-1 rounded-full text-sm font-medium ${user.role === "admin"
                      ? "bg-green-100 text-green-600"
                      : user.role === "front desk"
                        ? "bg-blue-100 text-blue-600"
                        : user.role === "member"
                          ? "bg-red-100 text-red-600"
                          : "bg-blue-100 text-blue-500"
                      }`}
                  >
                    {user.role}
                  </span>
                </td>

                <td className="p-3 pl-5 py-3 border border-gray-100 space-x-3">
                  <EditButton onClick={() => handleEdit(user._id)} />
                  <DeleteButton onClick={() => handleDelete(user._id)} />
                </td>
              </tr>
            ))}
        </tbody>
      </table>

      <BgBlurModal
        isShowModal={isEditShowModel}
        setIsShowModal={setIsEditShowModel}
      >
        <EditSystemUser
          isShow={isEditShowModel}
          setIsShow={setIsEditShowModel}
          targetId={targetId}
        />
      </BgBlurModal>
      <BgBlurModal isShowModal={isModalOpen} setIsShowModal={setIsModalOpen}>
        <SystemUserRegistration
          isShow={isModalOpen}
          setIsShow={setIsModalOpen}
        />
      </BgBlurModal>
    </div>
  );
}
