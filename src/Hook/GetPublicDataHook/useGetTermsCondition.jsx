import { useEffect, useState } from "react";
import useAxiosPublic from "../useAxiosPublic";

function useGetTermsCondition({
  isEdited = false,
  isDeleted = false,
  isShowModal,
}) {
  const [content, setContent] = useState("");

  const axiosPublic = useAxiosPublic();
  useEffect(() => {
    const fetchShippingPolicy = async () => {
      const response = await axiosPublic.get("/terms_condition");
      const data = response?.data?.data;
      data;
      setContent(data[0]?.content);
    };

    fetchShippingPolicy();
  }, [axiosPublic, isDeleted, isEdited, isShowModal]);

  return content;
}

export default useGetTermsCondition;
