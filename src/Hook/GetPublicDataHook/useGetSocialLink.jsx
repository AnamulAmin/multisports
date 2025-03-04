import { useEffect, useState } from "react";
import useAxiosPublic from "../useAxiosPublic";

function useGetSocialLink({
  isEdited = false,
  isDeleted = false,
  isShowModal,
}) {
  const [content, setContent] = useState("");

  const axiosPublic = useAxiosPublic();
  useEffect(() => {
    const fetchShippingPolicy = async () => {
      const response = await axiosPublic.get("/social-link");
      const data = response?.data?.data;
      data[0], "social links";
      setContent(data[0]);
    };

    fetchShippingPolicy();
  }, [axiosPublic, isDeleted, isEdited, isShowModal]);

  return content;
}

export default useGetSocialLink;
