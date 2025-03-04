import { useEffect, useState } from "react";
import useAxiosPublic from "../useAxiosPublic";

function useGetAllProductBrandsPublic({
  isEdited = false,
  isDeleted = false,
  setLoading = () => {},
  isShowModal = false,
}) {
  const [productBrands, setProductBrands] = useState([]);

  const axiosSecure = useAxiosPublic();

  useEffect(() => {
    const fetchProductBrands = async () => {
      try {
        setLoading(true);
        const res = await axiosSecure.get("/product-brands");

        if (res.status === 200 || res.status === 201) {
          const data = res.data.data;
          data, "res brands";
          setProductBrands(data);
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

export default useGetAllProductBrandsPublic;
