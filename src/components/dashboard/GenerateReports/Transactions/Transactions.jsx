import moment from "moment";
import { useEffect, useState } from "react";
import useExportToExcel from "../../../../config/Export/useExportToExcel";
import Mtitle from "../../../../shared/Mtitle";
import ReportFilter from "./components/ReportFilter/ReportFilter";
import InvoiceTableTopBtn from "./components/InvoiceTableTopBtn/InvoiceTableTopBtn";
import { PDFDownloadLink } from "@react-pdf/renderer";
import MonthlyInvoicePdfTemplate from "./components/InvoicePdfTemplate/MonthlyInvoicePdfTemplate";
import InvoicePdfTemplate from "./components/InvoicePdfTemplate/InvoicePdfTemplate";
import { PiInvoice, PiMicrosoftExcelLogo } from "react-icons/pi";
import InvoiceRow from "./components/InvoiceRow/InvoiceRow";
import useAxiosSecure from "../../../../Hook/useAxiosSecure";

const Transactions = () => {
  const [isDeleteTransaction, setIsDeleteTransaction] = useState(false);
  const [isShowAddTransaction, setIsShowAddTransaction] = useState(false);
  const [startDate, setStartDate] = useState(moment().format("YYYY-MM-DD"));
  const [endDate, setEndDate] = useState(moment().format("YYYY-MM-DD"));
  const [isSubmit, setIsSubmit] = useState(false);
  const [transactionType, setTransactionType] = useState("");
  const [search, setSearch] = useState("");
  const [isAddFilterWithSearch, setIsAddFilterWithSearch] = useState(false);
  const [timeFrame, setTimeFrame] = useState("");
  const [receiver, setReceiver] = useState("");
  const [loading, setLoading] = useState(false);
  const [transactionData, setTransactionData] = useState([]);
  const [summary, setSummary] = useState([]);
  const [receivers, setReceivers] = useState([]);
  const [method_summary, setMethod_summary] = useState([]);
  const [cumulativeBalance, setCumulativeBalance] = useState({});
  const axiosSecure = useAxiosSecure();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const res = await axiosSecure.get(`/transaction`, {
          params: {
            start_date: startDate,
            end_date: endDate,
            transaction_type: transactionType,
            time_frame: timeFrame,
            search,
            isAddFilterWithSearch,
          },
        });

        const formattedData = Array.isArray(res?.data?.data)
          ? res.data.data
          : res?.data?.data
          ? [res.data.data]
          : [];

        setTransactionData(formattedData);
        setSummary(res?.data?.summary || []);
        setMethod_summary(res?.data?.method_summary || []);
        setCumulativeBalance(res?.data?.cumulativeBalance || {});
      } catch (error) {
        console.error("Error fetching transaction data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [
    axiosSecure,
    startDate,
    endDate,
    transactionType,
    timeFrame,
    search,
    isAddFilterWithSearch,
    isSubmit,
    isDeleteTransaction,
    isShowAddTransaction,
  ]);

  const exportToExcel = useExportToExcel({ data: transactionData });

  return (
    <div className="p-3">
      <Mtitle title="Invoices and Billings" />
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        <ReportFilter
          startDate={startDate}
          setStartDate={setStartDate}
          endDate={endDate}
          setEndDate={setEndDate}
          setIsSubmit={setIsSubmit}
          setReceiver={setReceiver}
          summary={summary}
          receivers={receivers?.[0]}
          setTimeFrame={setTimeFrame}
          setSearch={setSearch}
          setIsAddFilterWithSearch={setIsAddFilterWithSearch}
          search={search}
          isAddFilterWithSearch={isAddFilterWithSearch}
          method_summary={method_summary}
          cumulativeBalance={cumulativeBalance}
          summary_type="transactions"
        />
        <div className="col-span-2 bg-white rounded-xl shadow p-4 pt-2 ">
          <div className="flex justify-between items-center gap-5 border-b pb-4">
            <h3 className="md:text-lg font-semibold">Invoices Billing</h3>
            <div className="flex items-center gap-5">
              <InvoiceTableTopBtn>
                {timeFrame === "monthly" ? (
                  <PDFDownloadLink
                    document={
                      <MonthlyInvoicePdfTemplate
                        data={transactionData}
                        summary={summary[0]}
                        cumulativeBalance={cumulativeBalance}
                        method_summary={method_summary}
                        profileData={{}}
                      />
                    }
                    fileName="transactions.pdf"
                  >
                    {({ loading }) =>
                      loading ? "Loading document..." : "Download PDF"
                    }
                  </PDFDownloadLink>
                ) : (
                  <PDFDownloadLink
                    document={
                      <InvoicePdfTemplate
                        transactions={transactionData}
                        summary={summary[0]}
                        cumulativeBalance={cumulativeBalance}
                        method_summary={method_summary}
                        profileData={{}}
                      />
                    }
                    fileName="transactions.pdf"
                  >
                    {({ loading }) =>
                      loading ? "Loading document..." : "Download PDF"
                    }
                  </PDFDownloadLink>
                )}
              </InvoiceTableTopBtn>
              <InvoiceTableTopBtn>
                <button onClick={exportToExcel} className="font-semibold">
                  Export To Excel
                </button>
                <PiMicrosoftExcelLogo size={24} />
              </InvoiceTableTopBtn>
              <InvoiceTableTopBtn>
                <button
                  onClick={() => setIsShowAddTransaction(true)}
                  className="font-semibold"
                >
                  Add New Invoice
                </button>
                <PiInvoice size={24} />
              </InvoiceTableTopBtn>
            </div>
          </div>
          <div className=" grid grid-cols-12 justify-between items-center gap-5 border-b border-gray-200 pb-2">
            {timeFrame === "monthly" ? (
              <>
                <b className="col-span-2">Date</b>
                <b className="col-span-2 text-center">Discount</b>
                <b className="col-span-2 text-center">Delivery Fee</b>
                <b className="col-span-2 text-center">Total Items</b>
                <b className="col-span-2 text-center">Per Discount</b>

                <b className="col-span-2 text-right">Total</b>
              </>
            ) : (
              <>
                <b className="md:text-base  text-xs font-semibold pt-2    pb-1 col-span-1">
                  SL.No.
                </b>
                <b className=" md:text-base  text-xs font-semibold pt-2  ml-2 pb-1 col-span-2">
                  Username
                </b>

                <b className=" md:text-base  text-xs font-semibold pt-2 pb-1 col-span-2  hidden md:block text-center">
                  TotalItems
                </b>
                <b className=" md:text-base  text-xs font-semibold pt-2 pb-1 col-span-2 text-center">
                  Discount
                </b>
                <b className=" md:text-base  text-xs font-semibold pt-2 pb-1 col-span-2 text-center">
                  Pay Method
                </b>

                <b className=" md:text-base  text-xs font-semibold pt-2 pb-1 col-span-2 text-center">
                  Amount
                </b>
                <b className=" md:text-base  text-xs font-semibold pt-2 pb-1 col-span-1 text-right pr-6">
                  Action
                </b>
              </>
            )}
          </div>
          <div className="mt-4">
            {transactionData.length > 0 ? (
              transactionData.map((item, index) => (
                <InvoiceRow
                  key={index}
                  data={item}
                  setIsDeleteTransaction={setIsDeleteTransaction}
                  timeFrame={timeFrame}
                  index={index}
                />
              ))
            ) : (
              <div className="flex justify-center items-center h-96">
                <div className="text-center">
                  <h1 className="text-2xl font-semibold">
                    No Transactions Found
                  </h1>
                  <p className="text-gray-500 text-sm mt-2">
                    No transactions match your search criteria.
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Transactions;
