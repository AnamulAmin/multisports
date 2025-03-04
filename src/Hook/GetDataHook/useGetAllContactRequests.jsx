import { useEffect, useState, useCallback } from "react";
import useAxiosSecure from "../useAxiosSecure";

function useGetAllContactRequests({
  searchQuery = "",
  isEdited = false,
  isDeleted = false,
  setLoading = () => {},
  isShowModal,
}) {
  const [contactRequests, setContactRequests] = useState([]);
  const [refetchToggle, setRefetchToggle] = useState(false); // State to trigger refetch
  const axiosSecure = useAxiosSecure();

  const fetchContactRequests = useCallback(async () => {
    try {
      setLoading(true);

      // Add search query to the API endpoint
      const endpoint = searchQuery
        ? `/contact-requests?search=${encodeURIComponent(searchQuery)}`
        : "/contact-requests";

      const res = await axiosSecure.get(endpoint);

      if (res.status === 200 || res.status === 201) {
        setContactRequests(res.data.data); // Assuming data is in `res.data.data`
      }

      setLoading(false);
    } catch (error) {
      console.error("Error fetching contact requests:", error);
      setLoading(false);
      throw new Error("Failed to fetch contact requests");
    }
  }, [axiosSecure, searchQuery]);

  // Automatically fetch data on dependencies change
  useEffect(() => {
    fetchContactRequests();
  }, [fetchContactRequests, isDeleted, isEdited, isShowModal, refetchToggle]);

  // Refetch function to manually trigger fetching
  const refetch = () => {
    setRefetchToggle((prev) => !prev);
  };

  return { contactRequests, refetch };
}

export default useGetAllContactRequests;
