import { useEffect, useState } from "react";
import useAxiosPublic from "../useAxiosPublic";

function useGetAllBagBanners({
  isEdited = false,
  isDeleted = false,
  setLoading = () => {},
  isShowModal,
}) {
  const [banners, setBanners] = useState([]);

  const axiosSecure = useAxiosPublic();

  useEffect(() => {
    const fetchBanners = async () => {
      try {
        setLoading(true);
        const res = await axiosSecure.get("/bag-banners");

        if (res.status === 200 || res.status === 201) {
          setBanners(res.data.data);
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

  return banners;
}

export default useGetAllBagBanners;
