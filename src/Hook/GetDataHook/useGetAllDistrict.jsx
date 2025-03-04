import { useEffect, useState } from "react";
import useAxiosSecure from "../useAxiosSecure";

function useGetAllDistrict({
  isEdited = false,
  isDeleted = false,
  setLoading = () => {},
  isShowModal,
}) {
  const [district, setDistrict] = useState([]);

  const axiosSecure = useAxiosSecure();

  useEffect(() => {
    const fetchDistrict = async () => {
      try {
        setLoading(true);
        const res = await axiosSecure.get("/district");

        if (res.status === 200 || res.status === 201) {
          setDistrict(res.data);
          setLoading(false);
        }
      } catch (error) {
        console.error("Error fetching district:", error);
        setLoading(false);
        throw new Error("Failed to fetch district");
      }
    };

    fetchDistrict();
  }, [axiosSecure, isDeleted, isEdited, isShowModal]);

  return district;
}

export default useGetAllDistrict;
