import { useEffect, useState } from "react";
import useAxiosPublic from "../useAxiosPublic";

function useGetAllDistrict({
  isEdited = false,
  isDeleted = false,
  setLoading = () => {},
  isShowModal,
}) {
  const [district, setDistrict] = useState([]);

  const axiosPublic = useAxiosPublic();

  useEffect(() => {
    const fetchDistrict = async () => {
      try {
        setLoading(true);
        const res = await axiosPublic.get("/district");

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
  }, [axiosPublic, isDeleted, isEdited, isShowModal]);

  return district;
}

export default useGetAllDistrict;
