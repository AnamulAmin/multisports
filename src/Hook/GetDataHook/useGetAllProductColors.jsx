import { useEffect, useState } from "react";
import useAxiosSecure from "../useAxiosSecure";

function useGetAllProductColors({
  isEdited = false,
  isDeleted = false,
  setLoading = () => {},
  isShowModal,
}) {
  const [productColors, setProductColors] = useState([]);

  const axiosSecure = useAxiosSecure();

  useEffect(() => {
    const fetchProductColors = async () => {
      try {
        setLoading(true);
        const res = await axiosSecure.get("/product-color");

        if (res.status === 200 || res.status === 201) {
          setProductColors(res.data.data);
          setLoading(false);
        }
      } catch (error) {
        console.error("Error fetching ProductColors:", error);
        setLoading(false);
        throw new Error("Failed to fetch ProductColors");
      }
    };

    fetchProductColors();
  }, [axiosSecure, isDeleted, isEdited, isShowModal]);

  return productColors;
}

export default useGetAllProductColors;
