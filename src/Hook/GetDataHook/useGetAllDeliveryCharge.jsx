import { useEffect, useState } from "react";
import useAxiosSecure from "../useAxiosSecure";

function useGetAllDeliveryCharge({
  isEdited = false,
  isDeleted = false,
  setLoading = () => {},
  isShowModal,
}) {
  const [deliveryCharge, setDeliveryCharge] = useState([]);

  const axiosSecure = useAxiosSecure();

  useEffect(() => {
    const fetchDeliveryCharge = async () => {
      try {
        setLoading(true);
        const res = await axiosSecure.get("/delivery-charge");

        if (res.status === 200 || res.status === 201) {
          setDeliveryCharge(res.data);
          setLoading(false);
        }
      } catch (error) {
        console.error("Error fetching deliveryCharge:", error);
        setLoading(false);
        throw new Error("Failed to fetch deliveryCharge");
      }
    };

    fetchDeliveryCharge();
  }, [axiosSecure, isDeleted, isEdited, isShowModal]);

  return deliveryCharge;
}

export default useGetAllDeliveryCharge;
