import { useContext, useState, useEffect } from "react";
import { IoHome } from "react-icons/io5";
import { AuthContext, useAuth } from "../../../providers/AuthProvider";
import Container from "../../../shared/Container";
import ShippingForm from "../Shipping/ShippingForm";
import ViewCart from "../../../shared/cart/viewCart/ViewCart";
import Summary from "../../../shared/cart/viewCart/Summary";
import { Link } from "react-router-dom";
import BgBlurModal from "../../../shared/Modal/BgBlurModal";
import AccountAddress from "../my-account/AccountAddress";
import PromotionalBanner from "../../UI/PromotionalBanner";

export default function CheckoutPage() {
  const { cartItems } = useContext(AuthContext);
  const { user } = useAuth();

  const [shippingAddress, setShippingAddress] = useState(null);
  const [isShippingEdit, setIsShippingEdit] = useState(false);

  useEffect(() => {
    const localShippingAddress = localStorage.getItem("shippingAddress");
    if (localShippingAddress) {
      setShippingAddress(JSON.parse(localShippingAddress));
    }
  }, [isShippingEdit]);

  return (
    <Container>
      {cartItems.length > 0 ? (
        <div>
          <div className="text-base md:w-full w-[90%] mx-auto text-gray-500 md:mb-8 border-b border-gray-300 flex gap-3 items-center mt-10 pb-4 ">
            <IoHome /> Multisports {`>`} Checkout
          </div>
          <div className="w-[90%] mx-auto md:max-w-[75%] md:inline-block">
            {shippingAddress ? (
              <div className="w-full mx-auto p-6 border rounded-lg shadow-md mb-12 bg-white relative">
                <h2 className="text-3xl font-semibold text-gray-600 mb-6">
                  Shipping Address
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6 rounded-lg">
                  {/* Left Section */}
                  <div className="border p-6 rounded-lg bg-white shadow-sm">
                    <div className="mb-4 flex gap-3 items-center">
                      <p className="text-lg font-semibold text-gray-600">
                        Name :
                      </p>
                      <span className="text-xl font-medium text-gray-900">
                        {shippingAddress.recipientName}
                      </span>
                    </div>
                    <div className="mb-4 flex gap-3 items-center">
                      <p className="text-lg font-semibold text-gray-600">
                        Phone :
                      </p>
                      <span className="text-lg font-medium text-gray-900">
                        {shippingAddress.contact_number}
                      </span>
                    </div>
                    <div className="mb-4 flex gap-3 items-center">
                      <p className="text-lg font-semibold text-gray-600">
                        City :
                      </p>
                      <span className="text-lg font-medium text-gray-900">
                        {shippingAddress.city_name}
                      </span>
                    </div>
                    <div className="mb-4 flex gap-3 items-center">
                      <p className="text-lg font-semibold text-gray-600">
                        Zone :
                      </p>
                      <span className="text-lg font-medium text-gray-900">
                        {shippingAddress.zone_name}
                      </span>
                    </div>
                  </div>

                  {/* Right Section */}
                  <div className="border p-6 rounded-lg bg-white shadow-sm">
                    <div className="mb-4 flex gap-3 items-center">
                      <p className="text-lg font-semibold text-gray-600">
                        Area :
                      </p>
                      <span className="text-lg font-medium text-gray-900">
                        {shippingAddress.area_name || "----"}
                      </span>
                    </div>
                    <div className="mb-4 flex gap-3 items-center">
                      <p className="text-lg font-semibold text-gray-600">
                        Address :
                      </p>
                      <span className="text-lg font-medium text-gray-900">
                        {shippingAddress.address}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Edit Button */}
                <button
                  className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-lg shadow-md absolute top-6 right-6"
                  onClick={() => setIsShippingEdit(true)}
                >
                  Edit
                </button>
              </div>
            ) : (
              <ShippingForm
                setShippingAddress={setShippingAddress}
                shippingAddress={shippingAddress}
                setIsShippingEdit={setIsShippingEdit}
              />
            )}

            <div
              className="w-full max-h-[500px] overflow-auto"
              style={{ scrollbarWidth: "thin" }}
            >
              <ViewCart />
            </div>
          </div>
          <div className="w-[90%] mx-auto md:max-w-[23%] md:sticky md:top-[150px]  md:inline-block md:float-right">
            <Summary shippingAddress={shippingAddress} cartItems={cartItems} />
          </div>
        </div>
      ) : (
        <div className="flex justify-center items-center flex-col h-full gap-4 py-20">
          <img src={"/nodata.jpg"} alt={"No Data"} width={400} height={400} />
          <h3>Empty Cart</h3>
          <p>Please Add Product to View</p>
          <Link
            to={"/"}
            className="bg-blue-500 text-white hover:bg-neutral-800 rounded-lg py-2 px-5"
          >
            Go To Home
          </Link>

          <PromotionalBanner />
        </div>
      )}

      <BgBlurModal
        isShowModal={isShippingEdit}
        setIsShowModal={setIsShippingEdit}
      >
        {user ? (
          <AccountAddress setIsShow={setIsShippingEdit} />
        ) : (
          <ShippingForm
            shippingAddress={shippingAddress}
            setShippingAddress={setShippingAddress}
            setIsShowModal={setIsShippingEdit}
            isShowModal={isShippingEdit}
          />
        )}
      </BgBlurModal>
    </Container>
  );
}
