import { useEffect, useState } from "react";
import useAxiosSecure from "../useAxiosSecure";

function useGetAllBlogCategories({
  isEdited = false,
  isDeleted = false,
  setLoading = () => {},
  isShowModal,
}) {
  const [blogCategories, setBlogCategories] = useState([]);

  const axiosSecure = useAxiosSecure();

  useEffect(() => {
    const fetchBlogCategories = async () => {
      try {
        setLoading(true);
        const res = await axiosSecure.get("/blog-category");

        if (res.status === 200 || res.status === 201) {
          setBlogCategories(res.data.data);
          setLoading(false);
        }
      } catch (error) {
        console.error("Error fetching blogCategories:", error);
        setLoading(false);
        throw new Error("Failed to fetch blogCategories");
      }
    };

    fetchBlogCategories();
  }, [axiosSecure, isDeleted, isEdited, isShowModal]);

  return blogCategories;
}

export default useGetAllBlogCategories;
