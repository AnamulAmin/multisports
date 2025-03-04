import { useEffect, useState } from "react";
import useAxiosSecure from "../useAxiosSecure";

function useGetExistQueries({ query = `` }) {
  // const [existQueries, setCategories] = useState([]);
  const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([]);
  const [subcategories, setSubcategories] = useState([]);
  const [colors, setColors] = useState([]);
  const [sizes, setSizes] = useState([]);
  const [highestPrice, setHighestPrice] = useState({});
  const axiosSecure = useAxiosSecure();

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await axiosSecure.get(`/categories/exist_queries?`);

        if (res.status === 200 || res.status === 201) {
          setCategories(res.data?.categories);
          setBrands(res.data?.brands);
          setSubcategories(res.data?.subcategories);
          setColors(
            res.data?.colors
              .map((item) => (item?.colorValue != undefined ? item : false))
              .filter((item) => item != false)
          );
          setSizes(
            res.data?.sizes
              .map((item) => (item?.sizeValue != undefined ? item : false))
              .filter((item) => item != false)
          );
          setHighestPrice(res.data?.highestPrice);
        }
      } catch (error) {
        console.error("Error fetching categories:", error);
        throw new Error("Failed to fetch categories");
      }
    };

    fetchCategories();
  }, [axiosSecure, query]);

  return { categories, brands, subcategories, colors, sizes, highestPrice };
}

export default useGetExistQueries;
