import { forwardRef } from "react";

const A4PrintContent = forwardRef(({ profileData, data: order }, ref) => {
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
        fontFamily: "'Helvetica', 'Arial', sans-serif",
        width: "210mm",
        minHeight: "297mm",
        margin: 0,
        padding: "5mm 7mm",
        backgroundColor: "white",
        boxSizing: "border-box",
        position: "relative",
      }}
    >
      {/* Header Section */}
      <header
        style={{
          marginBottom: "25px",
          borderBottom: "2px solid #2c3e50",
          paddingBottom: "15px",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
          }}
        >
          <div>
            <h1 style={{ fontSize: "28px", margin: 0, color: "#2c3e50" }}>
              {profileData?.company_name}
            </h1>
            <p style={{ fontSize: "11px", margin: "3px 0" }}>
              {profileData?.address} | Tel: {profileData?.phone}
            </p>
          </div>

          <div style={{ textAlign: "right" }}>
            <h2 style={{ fontSize: "24px", margin: 0, color: "#e74c3c" }}>
              ORDER INVOICE
            </h2>
            <p style={{ fontSize: "12px", margin: "5px 0 0 0" }}>
              Invoice #: {order?.invoice_id}
            </p>
            <p style={{ fontSize: "12px", margin: "2px 0" }}>
              Date: {order?.order_date}
            </p>
          </div>
        </div>
      </header>

      {/* Customer & Shipping Info */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "25px",
          marginBottom: "25px",
        }}
      >
        <div>
          <h3
            style={{ fontSize: "14px", margin: "0 0 8px 0", color: "#34495e" }}
          >
            Bill To:
          </h3>
          <p style={{ fontSize: "12px", margin: "4px 0" }}>{order?.name}</p>
          <p style={{ fontSize: "12px", margin: "4px 0" }}>
            Contact: {order?.phone}
          </p>
          <p style={{ fontSize: "12px", margin: "4px 0" }}>
            {order?.address}
            <br />
            {order?.area_name}, {order?.city_name}
          </p>
        </div>

        <div>
          <h3
            style={{ fontSize: "14px", margin: "0 0 8px 0", color: "#34495e" }}
          >
            Order Details:
          </h3>
          <p style={{ fontSize: "12px", margin: "4px 0" }}>
            <strong>Payment Method:</strong>{" "}
            {order?.payment_method?.toUpperCase()}
          </p>
          <p style={{ fontSize: "12px", margin: "4px 0" }}>
            <strong>Status:</strong> {order?.status}
          </p>
          <p style={{ fontSize: "12px", margin: "4px 0" }}>
            <strong>Items:</strong> {order?.totalItems}
          </p>
        </div>
      </div>

      {/* Order Items Table */}
      <table
        style={{
          width: "100%",
          borderCollapse: "collapse",
          marginBottom: "25px",
          fontSize: "12px",
        }}
      >
        <thead>
          <tr
            style={{
              backgroundColor: "#f8f9fa",
              borderBottom: "2px solid #e9ecef",
              borderTop: "2px solid #e9ecef",
            }}
          >
            <th
              style={{ textAlign: "left", padding: "12px 8px", width: "45%" }}
            >
              Product
            </th>
            <th
              style={{ textAlign: "center", padding: "12px 8px", width: "15%" }}
            >
              Color/Size
            </th>
            <th
              style={{ textAlign: "center", padding: "12px 8px", width: "10%" }}
            >
              Qty
            </th>
            <th
              style={{ textAlign: "right", padding: "12px 8px", width: "15%" }}
            >
              Unit Price
            </th>
            <th
              style={{ textAlign: "right", padding: "12px 8px", width: "15%" }}
            >
              Total
            </th>
          </tr>
        </thead>
        <tbody>
          {order?.items?.map((item, index) => (
            <tr key={index} style={{ borderBottom: "1px solid #e9ecef" }}>
              <td style={{ padding: "12px 8px", verticalAlign: "top" }}>
                <div style={{ fontWeight: "500" }}>{item.productTitle}</div>
                <div
                  style={{
                    fontSize: "11px",
                    color: "#7f8c8d",
                    marginTop: "4px",
                  }}
                >
                  {item.shortDescription?.replace(/<[^>]+>/g, "")}
                </div>
              </td>
              <td style={{ textAlign: "center", padding: "12px 8px" }}>
                {item.colorName && <div>{item.colorName}</div>}
                {item.size && <div>Size: {item.size}</div>}
              </td>
              <td style={{ textAlign: "center", padding: "12px 8px" }}>
                {item.quantity}
              </td>
              <td style={{ textAlign: "right", padding: "12px 8px" }}>
                ৳{item.price.toFixed(2)}
              </td>
              <td style={{ textAlign: "right", padding: "12px 8px" }}>
                ৳{(item.price * item.quantity).toFixed(2)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Totals Section */}
      <div
        style={{
          float: "right",
          width: "300px",
          marginTop: "20px",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            margin: "6px 0",
          }}
        >
          <span>Subtotal:</span>
          <span>৳{subtotal.toFixed(2)}</span>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            margin: "6px 0",
          }}
        >
          <span>Shipping:</span>
          <span>৳{deliveryCharge.toFixed(2)}</span>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            margin: "6px 0",
          }}
        >
          <span>Discount:</span>
          <span style={{ color: "#e74c3c" }}>-৳{discount.toFixed(2)}</span>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            margin: "15px 0",
            padding: "12px 0",
            borderTop: "2px solid #2c3e50",
            borderBottom: "2px solid #2c3e50",
            fontWeight: "bold",
            fontSize: "14px",
          }}
        >
          <span>Total Payable:</span>
          <span>৳{total.toFixed(2)}</span>
        </div>
      </div>

      {/* Footer Section */}
      <div
        style={{
          position: "absolute",
          bottom: "15mm",
          left: "20mm",
          right: "20mm",
          paddingTop: "15px",
          borderTop: "1px solid #ddd",
          fontSize: "10px",
          color: "#7f8c8d",
        }}
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: "20px",
          }}
        >
          <div>
            <strong>Payment Instructions:</strong>
            <p style={{ margin: "4px 0" }}>
              Please make checks payable to {profileData?.company_name}
              <br />
              Bank transfer details available on request
            </p>
          </div>
          <div>
            <strong>Order Policy:</strong>
            <p style={{ margin: "4px 0" }}>
              Goods must be returned within 14 days
              <br />
              Subject to restocking fee
            </p>
          </div>
          <div>
            <strong>Authorized Signature:</strong>
            <div
              style={{
                height: "40px",
                marginTop: "10px",
                borderBottom: "1px solid #000",
              }}
            ></div>
          </div>
        </div>
        <p style={{ textAlign: "center", marginTop: "15px" }}>
          {profileData?.footer_copyright}
        </p>
      </div>
    </div>
  );
});

export default A4PrintContent;
