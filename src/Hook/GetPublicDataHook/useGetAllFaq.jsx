import { useEffect, useState } from "react";
import useAxiosPublic from "../useAxiosPublic";

function useGetAllFaq({
  isEdited = false,
  isDeleted = false,
  setLoading = () => {},
  isShowModal,
}) {
  const [content, setContent] = useState([]);

  const axiosSecure = useAxiosPublic();

  useEffect(() => {
    const fetchContent = async () => {
      try {
        setLoading(true);
        const res = await axiosSecure.get("/faq");

        if (res.status === 200 || res.status === 201) {
          setContent(res.data.data);
          setLoading(false);
        }
      } catch (error) {
        console.error("Error fetching content:", error);
        setLoading(false);
        throw new Error("Failed to fetch content");
      }
    };

    fetchContent();
  }, [axiosSecure, isDeleted, isEdited, isShowModal]);

  return content;
}

export default useGetAllFaq;
