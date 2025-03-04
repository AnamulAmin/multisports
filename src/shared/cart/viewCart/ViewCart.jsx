import React, { useContext } from "react";
import CartItemComponent from "../CartItemComponent";
import { IoHome } from "react-icons/io5";
import { AuthContext } from "../../../providers/AuthProvider";

export default function ViewCart() {
  const { cartItems, removeFromCart, updateCartQuantity, totalPrice } =
    useContext(AuthContext);
  return (
    <div
      className="border-b pb-4 h-full overflow-auto"
      style={{ scrollbarWidth: "thin" }}
    >
      {cartItems?.length > 0 &&
        cartItems?.map((item, index) => (
          <CartItemComponent
          index = {index}
            item={item}
            updateCartQuantity={updateCartQuantity}
            removeFromCart={removeFromCart}
            key={index}
          />
        ))}
    </div>
  );
}
