import { useEffect, useState } from "react";
import useAxiosPublic from "../useAxiosPublic";

function useGetAllSubCategories({ query = ``, activeCategory = "" }) {
  const [subcategories, setSubCategories] = useState([]);

  const axiosSecure = useAxiosPublic();

  useEffect(() => {
    const fetchSubCategories = async () => {
      try {
        const res = await axiosSecure.get(`/subcategories?${query || ""}`);

        if (res.status === 200 || res.status === 201) {
          setSubCategories(res.data.data);
        }
      } catch (error) {
        console.error("Error fetching Subcategories:", error);
        throw new Error("Failed to fetch Subcategories");
      }
    };

    fetchSubCategories();
  }, [axiosSecure, activeCategory, query]);

  return subcategories;
}

export default useGetAllSubCategories;
