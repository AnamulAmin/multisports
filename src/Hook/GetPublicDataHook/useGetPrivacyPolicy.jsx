import { useEffect, useState } from "react";
import useAxiosPublic from "../useAxiosPublic";

function useGetPrivacyPolicy({
  isEdited = false,
  isDeleted = false,

  isShowModal,
}) {
  const [content, setContent] = useState("");

  const axiosPublic = useAxiosPublic();
  useEffect(() => {
    const fetchShippingPolicy = async () => {
      const response = await axiosPublic.get("/privacy_policy");
      const data = response?.data?.data;

      setContent(data[0]?.content);
    };

    fetchShippingPolicy();
  }, [axiosPublic, isDeleted, isEdited, isShowModal]);

  return content;
}

export default useGetPrivacyPolicy;
