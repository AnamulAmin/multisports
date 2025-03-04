import { useEffect, useState } from "react";
import useAxiosSecure from "../useAxiosSecure";

function useGetAllCustomers({
  isEdited = false,
  isDeleted = false,
  setLoading = () => {},
  isShowModal = false,
  query = "",
}) {
  const [customers, setCustomers] = useState([]);
  const [totalItems, setTotalItems] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [totalPricesByStatus, setTotalPricesByStatus] = useState({});

  const axiosSecure = useAxiosSecure();

  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        setLoading(true);
        const res = await axiosSecure.get(`/users/customers?${query}`);

        if (res.status === 200 || res.status === 201) {
          setCustomers(res.data.data);
          setLoading(false);
          setTotalItems(res.data.totalItems);
          setItemsPerPage(res.data.totalPages);
          setTotalPricesByStatus(res.data.totalPricesByStatus);
        }
      } catch (error) {
        console.error("Error fetching customers:", error);
        setLoading(false);
        throw new Error("Failed to fetch customers");
      }
    };

    fetchCustomers();
  }, [axiosSecure, isDeleted, isEdited, isShowModal, query]);

  return { customers, totalItems, itemsPerPage, totalPricesByStatus };
}

export default useGetAllCustomers;
