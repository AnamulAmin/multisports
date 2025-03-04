import { useEffect, useState } from "react";
import useAxiosSecure from "../useAxiosSecure";

function useGetAllOrders({
  isEdited = false,
  isDeleted = false,
  setLoading = () => {},
  isShowModal = false,
  query = "",
  currentPage = 1,
}) {
  const [orders, setOrders] = useState([]);
  const [totalItems, setTotalItems] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [totalPricesByStatus, setTotalPricesByStatus] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const axiosSecure = useAxiosSecure();

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        setLoading(true);
        setIsLoading(true);
        const res = await axiosSecure.get(`/orders?${query}`);

        ("res");

        if (res.status === 200 || res.status === 201) {
          setOrders(res.data.data);
          setLoading(false);
          setTotalItems(res.data.totalItems);
          setItemsPerPage(res.data.totalPages);
          setTotalPricesByStatus(res.data.totalPricesByStatus);
        }
      } catch (error) {
        console.error("Error fetching orders:", error);
        setLoading(false);
        throw new Error("Failed to fetch orders");
      } finally {
        setIsLoading(false);
        setLoading(false);
      }
    };

    fetchOrders();
  }, [axiosSecure, isDeleted, isEdited, isShowModal, query, currentPage]);

  return { orders, totalItems, itemsPerPage, totalPricesByStatus, isLoading };
}

export default useGetAllOrders;
