import { useEffect, useState } from "react";
import useAxiosPublic from "../useAxiosPublic";

function useGetAllShoesBanners({
  isEdited = false,
  isDeleted = false,
  setLoading = () => {},
  isShowModal,
}) {
  const [shoes, setShoes] = useState([]);

  const axiosSecure = useAxiosPublic();

  useEffect(() => {
    const fetchBanners = async () => {
      try {
        setLoading(true);
        const res = await axiosSecure.get("/shoes-banners");

        if (res.status === 200 || res.status === 201) {
          setShoes(res.data.data);
          setLoading(false);
        }
      } catch (error) {
        console.error("Error fetching banners:", error);
        setLoading(false);
        throw new Error("Failed to fetch banners");
      }
    };

    fetchBanners();
  }, [axiosSecure, isDeleted, isEdited, isShowModal]);

  return shoes;
}

export default useGetAllShoesBanners;
