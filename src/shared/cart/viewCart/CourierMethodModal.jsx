import { useCallback, useEffect, useState } from "react";
import useAxiosSecure from "../../../Hook/useAxiosSecure";
import toast from "react-hot-toast";
import Swal from "sweetalert2";

export default function CourierMethodModal({
  setIsShow,
  targetId,
  setIsEdited,
}) {
  const [courierMethod, setCourierMethod] = useState("");
  const axiosSecure = useAxiosSecure();
  const [loading, setLoading] = useState(false);

  const handleStatusChange = async () => {
    try {
      await axiosSecure.put(`/orders/update/${targetId}`, { status: "Packed" });
      toast.success("Order status updated successfully!");
      setIsShow(false);
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };

  // useEffect(() => {
  //   const handleChangeStatus = async () => {
  //     try {
  //       setLoading(true);
  //       console.log(targetId, "targetId");
  //       const response = await axiosSecure.put(`/orders/${targetId}`, {
  //         status: "Accepted",
  //         courierMethod,
  //       });

  //       if (response.status === 200 || response.status === 201) {
  //         toast.success("Order status updated successfully!");
  //         setIsShow(false);
  //         setLoading(false);
  //       }
  //       setLoading(false);
  //     } catch (error) {
  //       console.error("Error updating status:", error);
  //       setLoading(false);
  //       setIsShow(false);
  //     }
  //   };

  //   if (targetId && courierMethod) {
  //     handleChangeStatus();
  //   }
  // }, [courierMethod, targetId, axiosSecure, setIsShow]);

  const handleChangeStatus = useCallback(
    (courier_method) => {
      console.log(courier_method, "e.target.value");
      async function handleCrud() {
        try {
          setLoading(true);

          const response = await axiosSecure.put(`/orders/update/${targetId}`, {
            status: "Packed",
            courierMethod: courier_method,
          });

          if (response.status === 200 || response.status === 201) {
            toast.success("Order status updated successfully!");
            setIsShow(false);
            setLoading(false);
            setIsEdited((prev) => !prev);
          }
          setLoading(false);
        } catch (error) {
          console.error("Error updating status:", error);
          setLoading(false);
          setIsShow(false);
          Swal.fire({
            title: "Error",
            text: error.message,
            icon: "error",
            confirmButtonText: "OK",
          });
        }
      }
      handleCrud();
    },
    [courierMethod, targetId, axiosSecure, setIsShow]
  );

  return (
    <div className="shadow-lg p-6 rounded-md mt-40 bg-white justify-center ">
      <h2 className="text-xl font-bold mb-4 pb-4 border-b border-black text-nowrap">
        Select Courier
      </h2>

      <div className="flex gap-4 justify-center">
        <button
          disabled={loading}
          className="p-12 rounded-md border-2 border-gray-200 bg-white hover:bg-gray-100"
          onClick={() => {
            setCourierMethod("SteadFast");
            handleChangeStatus("SteadFast");
          }}
        >
          <img src={"/stead_fast.svg"} alt="pathao" className="w-full h-full" />
        </button>
        <button
          disabled={loading}
          className="p-12 rounded-md border-2 border-gray-200 bg-white hover:bg-gray-100"
          onClick={() => {
            setCourierMethod("Pathao");
            handleChangeStatus("Pathao");
          }}
        >
          <img
            src={"/logo_pathao.svg"}
            alt="pathao"
            className="w-full h-full"
          />
        </button>
        {/* <button
          disabled={loading}
          className="p-12 rounded-md border-2 border-gray-200  hover:bg-gray-100 bg-green-200"
          onClick={handleStatusChange}
        >
          <h2 className="text-center font-bold uppercase">
            Personalized Courier
          </h2>
        </button> */}
      </div>
    </div>
  );
}
