import { useEffect, useState } from "react";
import useAxiosPublic from "../useAxiosPublic";

function useGetAllBlogs({
  isEdited = false,
  isDeleted = false,
  setLoading = () => {},
  isShowModal,
}) {
  const [blogs, setBlogs] = useState([]);

  const axiosSecure = useAxiosPublic();

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        setLoading(true);
        const res = await axiosSecure.get("/blog");

        if (res.status === 200 || res.status === 201) {
          setBlogs(res.data.data);
          setLoading(false);
        }
      } catch (error) {
        console.error("Error fetching blogs:", error);
        setLoading(false);
        throw new Error("Failed to fetch blogs");
      }
    };

    fetchBlogs();
  }, [axiosSecure, isDeleted, isEdited, isShowModal]);

  return blogs;
}

export default useGetAllBlogs;
