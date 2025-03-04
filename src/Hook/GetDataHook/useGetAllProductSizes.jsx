import { useEffect, useState } from "react";
import useAxiosSecure from "../useAxiosSecure";

function useGetAllProductSizes({
  isEdited = false,
  isDeleted = false,
  setLoading = () => {},
  isShowModal,
}) {
  const [productSizes, setProductSizes] = useState([]);

  const axiosSecure = useAxiosSecure();

  useEffect(() => {
    const fetchProductSizes = async () => {
      try {
        setLoading(true);
        const res = await axiosSecure.get("/product-size");

        if (res.status === 200 || res.status === 201) {
          setProductSizes(res.data.data);
          setLoading(false);
        }
      } catch (error) {
        console.error("Error fetching ProductSizes:", error);
        setLoading(false);
        throw new Error("Failed to fetch ProductSizes");
      }
    };

    fetchProductSizes();
  }, [axiosSecure, isDeleted, isEdited, isShowModal]);

  return productSizes;
}

export default useGetAllProductSizes;
