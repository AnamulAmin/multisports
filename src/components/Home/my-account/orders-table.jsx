import { motion } from "framer-motion";
import { useSsrCompatible } from "../../../Hook/use-ssr-compatible";
import useWindowSize from "react-use/lib/useWindowSize";
import { fadeInTop } from "../../utils/motion/fade-in-top";
import { Link } from "react-router-dom";
import useAxiosSecure from "../../../Hook/useAxiosSecure";
import { useEffect, useState } from "react";
import { useAuth } from "../../../providers/AuthProvider";
import moment from "moment";
import GlobalLoading from "../../../components library/GlobalLoading";
import { ColorRing } from "react-loader-spinner";
import SelectInput from "../../partial/Headers/FilterHeader/SelectInput/SelectInput";

const OrdersTable = () => {
  const { width } = useSsrCompatible(useWindowSize(), { width: 0, height: 0 });
  const [orders, setOrders] = useState(null);
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState("");

  const [isEmptyOrder, setIsEmptyOrder] = useState(false);

  const { user } = useAuth();

  width, "width  order 3434";

  const axiosSecure = useAxiosSecure();

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        setLoading(true);
        const res = await axiosSecure.get(
          `/orders/user/${user?._id}?status=${status}`
        );
        res, "res orders";

        if (res.status === 200 || res.status === 201) {
          setOrders(res.data.data);
          setLoading(false);
        } else {
          setIsEmptyOrder(true);
        }
      } catch (error) {
        console.error("Error fetching orders:", error);
        setLoading(false);
        setIsEmptyOrder(true);
        throw new Error("Failed to fetch orders");
      }
    };
    if (user?._id) {
      fetchOrders();
    }
  }, [axiosSecure, user?._id, status]);

  if (!orders)
    return (
      <div className="flex justify-center items-center w-full  py-28">
        <ColorRing
          visible={true}
          height="80"
          width="80"
          ariaLabel="color-ring-loading"
          wrapperStyle={{}}
          wrapperClass="color-ring-wrapper"
          colors={["#e15b64", "#f47e60", "#f8b26a", "#abbd81", "#849b87"]}
        />
      </div>
    );

  return (
    <div className="w-full flex flex-col px-5">
      <div className="flex justify-between items-center mb-9">
        <h2 className="mb-6 text-lg font-bold md:text-xl xl:text-2xl text-heading xl:mb-8">
          Order
        </h2>

        <SelectInput onChange={(e) => setStatus(e.target.value)}>
          <option value="" disabled className="text-gray-400">
            Order Status
          </option>
          <option value="">All</option>
          <option value="Pending">Pending</option>
          <option value="Packaging">Packaging</option>
          <option value="Packed">Send To Courier</option>
          <option value="DeliveredToCourier">Delivered</option>
          <option value="Cancelled">Cancelled</option>
          <option value="Completed">Completed</option>
        </SelectInput>
      </div>
      {orders?.length > 0 && (
        <motion.div
          layout
          initial="from"
          animate="to"
          exit="from"
          //@ts-ignore
          variants={fadeInTop(0.35)}
          className={`w-full flex flex-col`}
        >
          {width >= 1025 ? (
            <table>
              <thead className="text-sm lg:text-base">
                <tr>
                  <th className="p-4 font-semibold bg-gray-100 text-heading ltr:text-left rtl:text-right ltr:first:rounded-tl-md rtl:first:rounded-tr-md">
                    Order
                  </th>
                  <th className="p-4 font-semibold bg-gray-100 text-heading ltr:text-left rtl:text-right lg:text-center">
                    Date
                  </th>
                  <th className="p-4 font-semibold bg-gray-100 text-heading ltr:text-left rtl:text-right lg:text-center">
                    Status
                  </th>
                  <th className="p-4 font-semibold bg-gray-100 text-heading ltr:text-left rtl:text-right lg:text-center">
                    Total
                  </th>
                  <th className="p-4 font-semibold bg-gray-100 text-heading ltr:text-left rtl:text-right ltr:lg:text-right rtl:lg:text-left ltr:last:rounded-tr-md rtl:last:rounded-tl-md">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="text-sm lg:text-base">
                {orders?.length > 0 &&
                  orders.map((order, index) => (
                    <tr
                      key={order._id}
                      className="border-b border-gray-300 last:border-b-0"
                    >
                      <td className="px-4 py-5 ltr:text-left rtl:text-right">
                        <Link
                          to={`/my-account/orders/${order._id}`}
                          className="underline hover:no-underline text-body"
                        >
                          #{order._id.slice(-6)}
                        </Link>
                      </td>
                      <td className="px-4 py-5 ltr:text-left rtl:text-right lg:text-center text-heading">
                        {moment(order?.createdAt).format(
                          "MMMM Do YYYY, h:mm:ss a"
                        )}
                      </td>
                      <td className="px-4 py-5 ltr:text-left rtl:text-right lg:text-center text-heading">
                        {order.status == "DeliveredToCourier"
                          ? "Delivered to Courier"
                          : order.status}
                      </td>
                      <td className="px-4 py-5 ltr:text-left rtl:text-right lg:text-center text-heading">
                        ৳ {order.total} in {order.totalItems || 0} items
                      </td>
                      <td className="px-4 py-5 ltr:text-right rtl:text-left text-heading">
                        <Link
                          to={`/my-account/orders/${order._id}`}
                          className="text-sm leading-4 bg-gray-200 text-black  px-4 py-2.5 inline-block rounded-md hover:text-white hover:bg-gray-600"
                        >
                          View
                        </Link>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          ) : (
            <div className="w-full space-y-4">
              {orders?.length > 0 &&
                orders.map((order, index) => (
                  <ul
                    key={order._id}
                    className="flex flex-col px-4 pt-5 pb-6 space-y-5 text-sm font-semibold border border-gray-300 rounded-md text-heading"
                  >
                    <li className="flex items-center justify-between">
                      Order
                      <span className="font-normal">
                        <Link
                          to={`/my-account/orders/${order._id}`}
                          className="underline hover:no-underline text-body"
                        >
                          #{order._id}
                        </Link>
                      </span>
                    </li>
                    <li className="flex items-center justify-between">
                      <span className="font-normal">{order.createdAt}</span>
                    </li>
                    <li className="flex items-center justify-between">
                      <span className="font-normal">{order.status}</span>
                    </li>
                    <li className="flex items-center justify-between">
                      <span className="font-normal">{order.total}</span>
                    </li>
                    <li className="flex items-center justify-between">
                      <span className="font-normal">
                        <Link
                          to={`/my-account/orders/${order._id}`}
                          className="text-sm leading-4 bg-gray-200 text-black   px-4 py-2.5 inline-block rounded-md hover:text-white hover:bg-gray-600"
                        >
                          View
                        </Link>
                      </span>
                    </li>
                  </ul>
                ))}
            </div>
          )}
        </motion.div>
      )}
      {orders?.length === 0 && (
        <div className="flex justify-center col-span-2 flex-col items-center">
          <div className="text-center text-gray-500 text-3xl">
            <img
              src={"/no_order.jpg"}
              alt="No Products Available"
              width={300}
              height={300}
            />
            <span className="text-center">No Order Available!</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrdersTable;
