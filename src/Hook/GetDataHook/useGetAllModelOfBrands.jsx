import { useEffect, useState } from "react";
import useAxiosSecure from "../useAxiosSecure";

function useGetAllModelOfBrands({
  isEdited = false,
  isDeleted = false,
  setLoading = () => {},
  isShowModal = false,
}) {
  const [modelOfBrand, setModelOfBrand] = useState([]);

  const axiosSecure = useAxiosSecure();

  useEffect(() => {
    const fetchModelOfBrand = async () => {
      try {
        setLoading(true);
        const res = await axiosSecure.get("/model-brands");

        if (res.status === 200 || res.status === 201) {
          setModelOfBrand(res.data.data);
          setLoading(false);
        }
      } catch (error) {
        console.error("Error fetching ModelOfBrand:", error);
        setLoading(false);
        throw new Error("Failed to fetch ModelOfBrand");
      }
    };

    fetchModelOfBrand();
  }, [axiosSecure, isDeleted, isEdited, setModelOfBrand, isShowModal]);

  return modelOfBrand;
}

export default useGetAllModelOfBrands;
