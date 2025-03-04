import BgBlurModal from "../../../shared/Modal/BgBlurModal";
import useGetAllTestimonials from "../../../Hook/GetDataHook/useGetAllTestimonials";

import { useState } from "react";
import EditTestimonialsForm from "./EditTestimonialsForm";
import { FiEdit } from "react-icons/fi";
import Swal from "sweetalert2";
import toast from "react-hot-toast";

import CellImage from "../../../shared/ImageComponents/CellImage";
import { FiEdit3 } from "react-icons/fi";
import { AiOutlineDelete } from "react-icons/ai";
import useAxiosSecure from "../../../Hook/useAxiosSecure";
import { IoIosSearch } from "react-icons/io";
import DeleteButton from "../../../components library/DeleteButton";
import EditButton from "../../../components library/EditButton";
import Mpagination from "../../../shared/Mpagination";

export default function ViewAllTestimonials() {
  // Testimonials data
  // const [testimonials, setTestimonials] = useState([
  //   {
  //     id: 1,
  //     image: "/user1.jpg", // Use actual image paths
  //     customer: "Nike Mardson",
  //     designation: "Web Developer",
  //     rating: 5,
  //     testimonial: "Lorem ipsum dolor sit amet consectetur adipisicing elit...",
  //   },
  //   {
  //     id: 2,
  //     image: "/user2.jpg",
  //     customer: "Selina Gomez",
  //     designation: "Software Engineer",
  //     rating: 4,
  //     testimonial: "Expedita in recusandae sit officia...",
  //   },
  //   {
  //     id: 3,
  //     image: "/user3.jpg",
  //     customer: "Hilary Duff",
  //     designation: "Founder & CEO",
  //     rating: 4,
  //     testimonial: "Labore voluptatem qui est aliquid...",
  //   },
  //   // Add more testimonials here as needed
  // ]);
  const [isShowModal, setIsShowModal] = useState(false);
  const [targetId, setTargetId] = useState("");
  const [isDeleted, setIsDeleted] = useState(false);

  const testimonials = useGetAllTestimonials({ isShowModal, isDeleted });

  const { paginatedData, paginationControls } = Mpagination({
    totalData: testimonials,
  });

  const axiosSecure = useAxiosSecure();

  // Change to how many you want to display per page

  // Search state
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);

  // Get current items (testimonials)
  const currentTestimonials =
    testimonials?.length > 0 &&
    testimonials.filter((testimonial) =>
      testimonial?.customerName.toLowerCase().includes(searchTerm.toLowerCase())
    );

  const handleEdit = (id) => {
    setTargetId(id);
    setIsShowModal(true);
  };

  const handleDelete = async ({ id, file_key }) => {
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
            const res = await axiosSecure.delete(`/testimonials/${id}`);

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
      <h1 className="text-3xl font-semibold mb-9">Testimonials</h1>

      {/* <div className="bg-white border rounded-full px-3 mb-6 md:py-2 py-1 md:gap-2 gap-1 flex-row-reverse justify-between flex">
        <input
          type="text"
          value={searchTerm}
          className="outline-none w-full bg-white"
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search by customer name..."
        />
        <IoIosSearch className="text-2xl text-gray-400" />
      </div> */}

      {/* Testimonials Table */}
      <div className="overflow-x-auto">
        <div className=" rounded-xl py-1">
          <table className="min-w-full table-auto border-collapse bg-white shadow rounded-md">
            <thead className="bg-gray-200 text-center">
              <tr className=" border-b">
                <td className="p-2 pl-4">SL</td>
                <td className="p-2">Image</td>
                <td className="p-2">Customer</td>
                <td className="p-2">Designation</td>
                <td className="p-2">Rating</td>
                <td className="p-2">Action</td>
              </tr>
            </thead>
            <tbody>
              {paginatedData.length > 0 ? (
                paginatedData.map((testimonial, index) => (
                  <tr key={testimonial.id} className="text-center">
                    <td className="p-2 border pl-5">{index + 1}</td>
                    <td className="p-2 border">
                      {testimonial?.image ? (
                        <div className="flex justify-center">
                          <div>
                            <CellImage
                              width={400}
                              height={400}
                              src={testimonial.image}
                              alt={testimonial.customerName}
                              loading="lazy"
                            />
                          </div>
                        </div>
                      ) : (
                        <div className="py-6 px-3">
                          <span className="loading loading-spinner text-gray-400 loading-sm"></span>
                        </div>
                      )}
                    </td>

                    <td className="p-2 border">{testimonial?.customerName}</td>
                    <td className="p-2 border">{testimonial?.designation}</td>
                    <td className="p-2 border">
                      {"★".repeat(testimonial?.rating)}{" "}
                      {"☆".repeat(5 - testimonial?.rating)}
                    </td>
                    <td className="p-2 border">
                      <div className="flex justify-center gap-2">
                        <EditButton
                          onClick={() => handleEdit(testimonial._id)}
                        />
                        <DeleteButton
                          onClick={() =>
                            handleDelete({
                              id: testimonial?._id,
                              file_key: testimonial?.key,
                            })
                          }
                        />
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7" className="text-center p-32">
                    No testimonials available.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {paginationControls}

      <BgBlurModal isShowModal={isShowModal} setIsShowModal={setIsShowModal}>
        <EditTestimonialsForm
          testimonialId={targetId}
          isShow={isShowModal}
          setIsShow={setIsShowModal}
        />
      </BgBlurModal>
    </div>
  );
}
