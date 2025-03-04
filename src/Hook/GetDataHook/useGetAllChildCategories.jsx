import { useEffect, useState } from "react";
import useAxiosSecure from "../useAxiosSecure";

function useGetAllChildCategories({ isEdited = false, isDeleted = false }) {
  const [childCategories, setChildCategories] = useState([]);

  const axiosSecure = useAxiosSecure();

  useEffect(() => {
    const fetchChildCategories = async () => {
      try {
        const res = await axiosSecure.get("/child-categories");

        if (res.status === 200 || res.status === 201) {
          setChildCategories(res.data.data);
        }
      } catch (error) {
        console.error("Error fetching ChildCategories:", error);
        throw new Error("Failed to fetch ChildCategories");
      }
    };

    fetchChildCategories();
  }, [axiosSecure, isDeleted, isEdited]);

  return childCategories;
}

export default useGetAllChildCategories;
