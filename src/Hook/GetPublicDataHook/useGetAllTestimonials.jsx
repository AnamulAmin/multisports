import { useEffect, useState } from "react";
import useAxiosSecure from "../useAxiosSecure";
import useAxiosPublic from "../useAxiosPublic";

function useGetAllTestimonials({
  isEdited = false,
  isDeleted = false,
  setLoading = () => {},
  isShowModal,
}) {
  const [testimonials, setTestimonials] = useState([]);

  const axiosSecure = useAxiosPublic();

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        setLoading(true);
        const res = await axiosSecure.get("/testimonials");

        if (res.status === 200 || res.status === 201) {
          setTestimonials(res.data.data);
          setLoading(false);
        }
      } catch (error) {
        console.error("Error fetching testimonials:", error);
        setLoading(false);
        throw new Error("Failed to fetch testimonials");
      }
    };

    fetchTestimonials();
  }, [axiosSecure, isDeleted, isEdited, isShowModal]);

  return testimonials;
}

export default useGetAllTestimonials;
