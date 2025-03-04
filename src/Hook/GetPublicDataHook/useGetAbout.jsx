import { useEffect, useState } from "react";
import useAxiosPublic from "../useAxiosPublic";

function useGetAbout({ isEdited = false, isDeleted = false, isShowModal }) {
  const [content, setContent] = useState("");

  const axiosPublic = useAxiosPublic();
  useEffect(() => {
    const fetchShippingPolicy = async () => {
      const response = await axiosPublic.get("/about-us");
      const data = response?.data?.data[0];

      setContent(data);
    };

    fetchShippingPolicy();
  }, [axiosPublic, isDeleted, isEdited, isShowModal]);

  return content;
}

export default useGetAbout;
