import { useEffect, useState } from "react";
import useAxiosSecure from "../useAxiosSecure";

function useGetAllProductBrands({
  isEdited = false,
  isDeleted = false,
  setLoading = () => {},
  isShowModal = false,
}) {
  const [productBrands, setProductBrands] = useState([]);

  const axiosSecure = useAxiosSecure();

  useEffect(() => {
    const fetchProductBrands = async () => {
      try {
        setLoading(true);
        const res = await axiosSecure.get("/product-brands");

        if (res.status === 200 || res.status === 201) {
          setProductBrands(res.data.data);
          setLoading(false);
        }
      } catch (error) {
        console.error("Error fetching productBrands:", error);
        setLoading(false);
        throw new Error("Failed to fetch productBrands");
      }
    };

    fetchProductBrands();
  }, [axiosSecure, isDeleted, isEdited, isShowModal]);

  return productBrands;
}

export default useGetAllProductBrands;
