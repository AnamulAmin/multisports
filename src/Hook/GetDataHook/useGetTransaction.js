import { useEffect, useState } from "react";
import useAxiosSecure from "../useAxiosSecure";

function useGetTransaction({
  query = "",
  id = "",
  isShowAddTransaction = false,
  isShowEdit = false,
  isDeleteTransaction = false,
  isSubmit = false,
  slashQuery = "",
  isShowAddPackage = false,
  isShowEditMember = false,
  isDeleteInvoice = false,
  startDate,
  setLoading = () => {},
}) {
  const [transactionData, setTransactionData] = useState([]);
  const [summary, setSummary] = useState([]);
  const [receivers, setReceivers] = useState([]);
  const [method_summary, setMethod_summary] = useState([]);
  const [cumulativeBalance, setCumulativeBalance] = useState({});

  const axiosSecure = useAxiosSecure();

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);

        const res = await axiosSecure.get(
          `/transaction${(slashQuery && "/" + slashQuery) || ""}${
            (id && "/" + id) || ""
          }${(query && "?" + query) || ""}`
        );

        "Raw Response:", res?.data;

        // Format transaction data properly
        const formattedData = Array.isArray(res?.data?.data)
          ? res?.data?.data
          : typeof res?.data?.data === "object"
          ? [res?.data?.data]
          : [];

        "Formatted Transaction Data:", formattedData;

        // Set state with fetched data
        setTransactionData(formattedData);
        setSummary(res?.data?.summary || []);
        setReceivers(res?.data?.receivers || []);
        setMethod_summary(res?.data?.method_summary || []);
        setCumulativeBalance(res?.data?.cumulativeBalance || {});

        setLoading(false);
      } catch (error) {
        console.error("Error fetching transaction data:", error);
        setLoading(false);
      }
    }

    fetchData();
  }, [
    axiosSecure,
    id,
    query,
    isShowEdit,
    isShowAddTransaction,
    isDeleteTransaction,
    isSubmit,
    slashQuery,
    isShowAddPackage,
    isShowEditMember,
    isDeleteInvoice,
    startDate,
    setLoading,
  ]);

  return {
    transactionData,
    summary,
    receivers,
    method_summary,
    cumulativeBalance,
  };
}

export default useGetTransaction;
