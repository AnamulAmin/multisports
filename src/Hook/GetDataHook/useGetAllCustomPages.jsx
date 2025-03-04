import { useEffect, useState } from "react";
import useAxiosSecure from "../useAxiosSecure";

function useGetAllCustomPages({
  isEdited = false,
  isDeleted = false,
  setLoading = () => {},
  isShowModal = false,
  query = "",
}) {
  const [customPagesData, setCustomPagesData] = useState([]);

  const axiosSecure = useAxiosSecure();

  useEffect(() => {
    const fetchCustomPagesData = async () => {
      try {
        setLoading(true);
        const res = await axiosSecure.get(`/custom-pages?${query}`);

        if (res.status === 200 || res.status === 201) {
          setCustomPagesData(res.data.data);
          setLoading(false);
        }
      } catch (error) {
        console.error("Error fetching customPagesData:", error);
        setLoading(false);
        throw new Error("Failed to fetch customPagesData");
      }
    };

    fetchCustomPagesData();
  }, [axiosSecure, isDeleted, isEdited, isShowModal, query]);

  return customPagesData;
}

export default useGetAllCustomPages;
