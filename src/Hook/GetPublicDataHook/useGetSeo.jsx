import { useEffect, useState } from "react";
import useAxiosPublic from "../useAxiosPublic";

function useGetSeo({ isEdited = false, isDeleted = false, isShowModal }) {
  const [content, setContent] = useState("");

  const axiosPublic = useAxiosPublic();
  useEffect(() => {
    const fetchData = async () => {
      const response = await axiosPublic.get("/website-seo");
      const data = response?.data?.data;

      setContent(data[0]);
    };

    fetchData();
  }, [axiosPublic, isDeleted, isEdited, isShowModal]);

  return content;
}

export default useGetSeo;
