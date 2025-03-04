import { useEffect, useState } from "react";
import useAxiosPublic from "../useAxiosPublic";

function useGetAllProducts({
  isEdited = false,
  isDeleted = false,
  isShowModal = false,
  query = "",
}) {
  const [products, setProducts] = useState([]);
  const [totalItems, setTotalItems] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(false);

  const axiosSecure = useAxiosPublic();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const res = await axiosSecure.get(`/products/public?${query}`);

        if (res.status === 200 || res.status === 201) {
          setProducts(res.data.data);
          setLoading(false);
          setTotalItems(res.data.totalItems);
          setTotalPages(res.data.totalPages);
        }
      } catch (error) {
        console.error("Error fetching Products:", error);
        setLoading(false);
        throw new Error("Failed to fetch Products");
      }
    };

    fetchProducts();
  }, [axiosSecure, isDeleted, isEdited, isShowModal, query]);

  return { products, totalItems, totalPages, loading };
}

export default useGetAllProducts;
