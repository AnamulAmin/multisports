import { useEffect, useState } from "react";
import useAxiosSecure from "../useAxiosSecure";

function useGetAllSystemUsers({
  isEdited = false,
  isDeleted = false,
  setLoading = () => {},
  isShowModal = false,
  query = "",
}) {
  const [systemUsers, setSystemUsers] = useState([]);

  const axiosSecure = useAxiosSecure();

  useEffect(() => {
    const fetchSystemUsers = async () => {
      try {
        setLoading(true);
        const res = await axiosSecure.get(`/users/system-user?${query}`);

        if (res.status === 200 || res.status === 201) {
          setSystemUsers(res.data.data);
          setLoading(false);
        }
      } catch (error) {
        console.error("Error fetching systemUsers:", error);
        setLoading(false);
        throw new Error("Failed to fetch systemUsers");
      }
    };

    fetchSystemUsers();
  }, [axiosSecure, isDeleted, isEdited, isShowModal, query]);

  return systemUsers;
}

export default useGetAllSystemUsers;
