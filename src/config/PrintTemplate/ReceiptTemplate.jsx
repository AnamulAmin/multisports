import moment from "moment";
import { forwardRef } from "react";

const ReceiptTemplate = forwardRef(({ profileData, data: order }, ref) => {
  const subtotal =
    order?.items?.reduce((sum, item) => sum + item.price * item.quantity, 0) ||
    0;
  const deliveryCharge = parseFloat(order?.deliveryCharge) || 0;
  const discount = parseFloat(order?.discount) || 0;
  const total = subtotal + deliveryCharge - discount;

  return (
    <div
      ref={ref}
      style={{
        fontFamily: "'fakeReceipt'",
        width: "80mm",
        margin: "auto",
        padding: "16px",
        fontSize: "12px",
        color: "#1f1f39",
        backgroundColor: "white",
      }}
    >
      {/* Company Header */}
      <div style={{ textAlign: "center", marginBottom: "8px" }}>
        <h2 style={{ fontSize: "16px", fontWeight: "bold", margin: 0 }}>
          {profileData?.company_name}
        </h2>
        <p style={{ margin: "2px 0" }}>{profileData?.address}</p>
        <p style={{ margin: "2px 0" }}>
          Tel: {profileData?.phone} | Email: {profileData?.email}
        </p>

        <hr style={{ margin: "8px 0", borderTop: "1px dashed #626262" }} />
      </div>

      {/* Order Info */}
      <div style={{ marginBottom: "8px" }}>
        <p style={{ margin: "2px 0" }}>
          <strong>Invoice :</strong> {order?.invoice_id}
        </p>
        <p style={{ margin: "2px 0" }}>
          <strong>Date:</strong> {order?.order_date}
        </p>
        <hr style={{ margin: "8px 0", borderTop: "1px dashed #626262" }} />
      </div>

      {/* Customer Info */}
      <div
        style={{
          marginBottom: "8px",
          display: "flex",
          // flexDirection: "column",
          flexWrap: "wrap",
          gap: "8px",
        }}
      >
        <p style={{ margin: "2px 0", fontWeight: "bold" }}>Bill To:</p>
        <p style={{ margin: "2px 0" }}>{order?.name}</p>
        <p style={{ margin: "2px 0" }}>Contact: {order?.phone}</p>
        <p style={{ margin: "2px 0" }}>
          {order?.address}, {order?.area_name}, {order?.city_name}
        </p>
        <hr style={{ margin: "8px 0", borderTop: "1px dashed #626262" }} />
      </div>

      {/* Items Table */}
      <table
        style={{
          width: "100%",
          borderCollapse: "collapse",
          marginBottom: "8px",
        }}
      >
        <thead>
          <tr style={{ borderBottom: "1px dashed #626262" }}>
            <th style={{ textAlign: "left", padding: "2px 0" }}>Product</th>
            <th style={{ textAlign: "center", padding: "2px 0" }}>Qty</th>
            <th style={{ textAlign: "right", padding: "2px 0" }}>Price</th>
            <th style={{ textAlign: "right", padding: "2px 0" }}>Total</th>
          </tr>
        </thead>
        <tbody>
          {order?.items?.map((item, index) => (
            <tr key={index} style={{ borderBottom: "1px dashed #ddd" }}>
              <td style={{ padding: "4px 0" }}>{item.productTitle}</td>
              <td style={{ textAlign: "center", padding: "4px 0" }}>
                {item.quantity}
              </td>
              <td style={{ textAlign: "right", padding: "4px 0" }}>
                ৳{item.price}
              </td>
              <td style={{ textAlign: "right", padding: "4px 0" }}>
                ৳{item.price * item.quantity}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Totals */}
      <div style={{ marginBottom: "12px" }}>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <span>Subtotal:</span>
          <span>৳{subtotal}</span>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <span>Delivery Charge:</span>
          <span>৳{deliveryCharge}</span>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <span>Discount:</span>
          <span>-৳{discount}</span>
        </div>
        <hr style={{ margin: "8px 0", borderTop: "1px dashed #626262" }} />
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            fontWeight: "bold",
          }}
        >
          <span>Total:</span>
          <span>৳{total}</span>
        </div>
      </div>

      {/* Footer */}
      <div style={{ textAlign: "center", marginTop: "12px" }}>
        <p style={{ margin: "4px 0" }}>
          Payment Method:{" "}
          <strong>{order?.payment_method?.toUpperCase()}</strong>
        </p>
        <p style={{ margin: "4px 0", fontStyle: "italic" }}>
          Thank you for your purchase!
        </p>
        <p style={{ fontSize: "10px", margin: "8px 0 0 0" }}>
          {profileData?.footer_copyright}
        </p>
      </div>
    </div>
  );
});

export default ReceiptTemplate;
