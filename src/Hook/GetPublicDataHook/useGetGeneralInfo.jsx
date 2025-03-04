import { useEffect, useState } from "react";
import useAxiosPublic from "../useAxiosPublic";

function useGetGeneralInfo({
  isEdited = false,
  isDeleted = false,
  isShowModal,
}) {
  const [info, setInfo] = useState("");

  const axiosPublic = useAxiosPublic();
  useEffect(() => {
    const fetchData = async () => {
      const response = await axiosPublic.get("/general-info");
      const data = response?.data?.data;
      data[0], "social links";
      setInfo(data[0]);
    };

    fetchData();
  }, [axiosPublic, isDeleted, isEdited, isShowModal]);

  return info;
}

export default useGetGeneralInfo;
