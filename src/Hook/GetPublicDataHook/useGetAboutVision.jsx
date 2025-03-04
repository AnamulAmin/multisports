import { useEffect, useState } from "react";
import useAxiosPublic from "../useAxiosPublic";

function useGetAboutVision({
  isEdited = false,
  isDeleted = false,
  isShowModal,
}) {
  const [contentVision, setContentVision] = useState("");

  const axiosPublic = useAxiosPublic();
  useEffect(() => {
    const fetchShippingPolicy = async () => {
      const response = await axiosPublic.get("/about-vision");
      const data = response?.data?.data[0];
      data;
      setContentVision(data);
    };

    fetchShippingPolicy();
  }, [axiosPublic, isDeleted, isEdited, isShowModal]);

  return contentVision;
}

export default useGetAboutVision;
