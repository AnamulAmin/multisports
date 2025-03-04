import { useEffect, useState } from "react";
import useAxiosSecure from "../useAxiosSecure";

function useGetAllWishlist({
  isEdited = false,
  isDeleted = false,
  setLoading = () => {},
  isShowModal = false,
  query = "",
}) {
  const [wishlist, setWishlist] = useState([]);
  const [totalItems, setTotalItems] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [totalPricesByStatus, setTotalPricesByStatus] = useState({});

  const axiosSecure = useAxiosSecure();

  useEffect(() => {
    const fetchWishlist = async () => {
      try {
        setLoading(true);
        const res = await axiosSecure.get(`/wishlist?${query}`);

        if (res.status === 200 || res.status === 201) {
          setWishlist(res.data.data);
          setLoading(false);
          setTotalItems(res.data.totalItems);
          setItemsPerPage(res.data.totalPages);
          setTotalPricesByStatus(res.data.totalPricesByStatus);
        }
      } catch (error) {
        console.error("Error fetching wishlist:", error);
        setLoading(false);
        throw new Error("Failed to fetch wishlist");
      }
    };

    fetchWishlist();
  }, [axiosSecure, isDeleted, isEdited, isShowModal, query]);

  return { wishlist, totalItems, itemsPerPage, totalPricesByStatus };
}

export default useGetAllWishlist;
