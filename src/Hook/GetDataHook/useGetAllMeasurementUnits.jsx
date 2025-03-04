import { useEffect, useState } from "react";
import useAxiosSecure from "../useAxiosSecure";

function useGetAllMeasurementUnits({
  isEdited = false,
  isDeleted = false,
  setLoading = () => {},
  isShowModal,
}) {
  const [measurementUnits, setMeasurementUnits] = useState([]);

  const axiosSecure = useAxiosSecure();

  useEffect(() => {
    const fetchMeasurementUnits = async () => {
      try {
        setLoading(true);
        const res = await axiosSecure.get("/measurement-units");

        if (res.status === 200 || res.status === 201) {
          setMeasurementUnits(res.data.data);
          setLoading(false);
        }
      } catch (error) {
        console.error("Error fetching MeasurementUnits:", error);
        setLoading(false);
        throw new Error("Failed to fetch MeasurementUnits");
      }
    };

    fetchMeasurementUnits();
  }, [axiosSecure, isDeleted, isEdited, isShowModal]);

  return measurementUnits;
}

export default useGetAllMeasurementUnits;
