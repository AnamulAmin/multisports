import React from "react";
import { AiOutlineDelete } from "react-icons/ai";
import { FiEdit } from "react-icons/fi";
import toast from "react-hot-toast";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../../../../Hook/useAxiosSecure";

function InvoiceRow({
  data,
  setIsDeleteTransaction = () => {},
  timeFrame,
  index,
}) {
  const axiosSecure = useAxiosSecure();
  const handleInvoiceDelete = async (id) => {
    try {
      Swal.fire({
        title: "Do you want to Delete the item?",

        showCancelButton: true,
        confirmButtonText: "Delete",
      }).then(async (result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
          const res = await axiosSecure.delete(`/transaction/delete/${id}`);
          setIsDeleteTransaction((prev) => !prev);
          toast.success("Invoice Deleted Successfully");
        } else if (result.isDenied) {
          Swal.fire("Changes are not saved", "", "info");
        }
      });
    } catch (error) {
      toast.error("Member Deleted Failed");
      console.error("res 16561", error);
    }
  };
  return (
    <>
      {timeFrame === "daily" ? (
        <div className="grid font-normal grid-cols-12 rounded-md hover:bg-gray-50   text-xs md:text-lg text-center border mb-1 px-2">
          <div className="py-2 pt-3 text-left col-span-1 space-y-1 ">
            <h3 className=" text-xs md:text-lg  font-normal">{index + 1}</h3>
          </div>
          <div className="py-2 pt-3 text-left space-y-1  col-span-2">
            <h5 className="text-md first-letter:capitalize    mr-3">
              {data?.name}
            </h5>
          </div>

          <div className="py-2 pt-3  hidden md:block col-span-2">
            <h5 className="ml-3   "> {data?.totalItems || 0}</h5>
          </div>

          <div className="py-2 pt-3 col-span-2">
            <h5>{data?.discount || 0}</h5>
          </div>

          <div className="py-2 pt-3  col-span-2">
            <h5>{data?.payment_method}</h5>
          </div>
          <div className="py-2 pt-3 col-span-2">
            <h5>{data?.total}</h5>
          </div>

          <div className="py-2 text-right col-span-1">
            <button
              className="flex  text-red-500  transition-all duration-500 items-center gap-3 flex-row-reverse text-2xl hover:bg-red-200 p-2 rounded-lg"
              onClick={() => handleInvoiceDelete(data._id)}
            >
              <AiOutlineDelete />
            </button>
          </div>
        </div>
      ) : (
        <tr className="grid grid-cols-12 items-center justify-between border border-gray-400    hover:bg-blue-100 text-lg font-semibold">
          <div className="col-span-2 text-left ">{data.date}</div>
          <div className="text-center col-span-2 border-l border-gray-400 ">
            {data?.discount}
          </div>

          <div className="col-span-2 text-center border-l border-gray-400">
            {data?.totalDeliveryFee}
          </div>
          <div className="col-span-2 text-center border-l border-gray-400">
            {data?.totalItems || 0}
          </div>
          <div className="col-span-2 text-center border-l border-gray-400">
            {data?.totalItemPerDiscount}
          </div>
          <div className="col-span-2 text-right border-l border-gray-400">
            {data?.total}
          </div>
        </tr>
      )}
    </>
  );
}

export default InvoiceRow;
