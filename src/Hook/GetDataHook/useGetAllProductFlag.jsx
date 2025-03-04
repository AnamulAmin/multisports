import { useEffect, useState } from "react";
import useAxiosSecure from "../useAxiosSecure";

function useGetAllProductFlag({
  isEdited = false,
  isDeleted = false,
  setLoading = () => {},
  isShowModal,
}) {
  const [productFlags, setProductFlags] = useState([]);

  const axiosSecure = useAxiosSecure();

  useEffect(() => {
    const fetchProductFlags = async () => {
      try {
        setLoading(true);
        const res = await axiosSecure.get("/product-flag");

        if (res.status === 200 || res.status === 201) {
          setProductFlags(res.data.data);
          setLoading(false);
        }
      } catch (error) {
        console.error("Error fetching ProductFlags:", error);
        setLoading(false);
        throw new Error("Failed to fetch ProductFlags");
      }
    };

    fetchProductFlags();
  }, [axiosSecure, isDeleted, isEdited, isShowModal]);

  return productFlags;
}

export default useGetAllProductFlag;
