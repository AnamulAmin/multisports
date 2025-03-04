import { useEffect, useState } from "react";
import useAxiosSecure from "../useAxiosSecure";

function useGetAllCategories({ query = `` }) {
  const [categories, setCategories] = useState([]);
  const axiosSecure = useAxiosSecure();

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await axiosSecure.get(`/categories?${query || ""}`);

        if (res.status === 200 || res.status === 201) {
          setCategories(res.data.data);
        }
      } catch (error) {
        console.error("Error fetching categories:", error);
        throw new Error("Failed to fetch categories");
      }
    };

    fetchCategories();
  }, [axiosSecure, query]);

  return categories;
}

export default useGetAllCategories;
