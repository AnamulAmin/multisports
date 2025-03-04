const data = {
  _id: {
    $oid: "679308b862001bc1772ccec3",
  },
  name: "Hamid",
  phone: "3737337",
  address: "Dhhd",
  city_id: "22",
  city_name: "Gazipur",
  zone_id: "859",
  area_id: "12892",
  area_name: "BonMala Road",
  special_instruction: "",
  items: [
    {
      _id: "676a48cdbf8de11cc5de2edc",
      productTitle: "Bangladesh Striped Team Jersey",
      shortDescription:
        "<p>A stylish Bangladesh&nbsp;jersey with white stripes, designed for team&nbsp;</p>",
      fullDescription:
        "<p>Show off your team spirit with the Blue Striped Team Jersey. This sporty design features bold white stripes that stand out, whether you're playing on the field or cheering from the sidelines. The premium synthetic fabric is soft, lightweight, and moisture-wicking, ensuring you stay cool and comfortable even during intense activities. The jersey's medium length and regular fit provide a versatile and flattering look. With its timeless design and superior functionality, this jersey is perfect for athletes, fans, and casual wearers alike.</p>",
      specification:
        "<p>Fabric: Lightweight synthetic material designed for enhanced airflow</p><p>Gender: Male</p><p>Fit Type: Regular Fit for unrestricted movement</p><p>Length: Medium for balanced coverage and style</p><p>Neck Design: V-neck with contrasting trim for added style</p><p>Sleeve Style: Raglan sleeves for increased shoulder mobility</p><p>Care Instructions: Hand wash recommended; avoid direct sunlight while drying</p><p>Design Details: White stripes along the shoulders and sleeves</p><p>Note: The color is the same as the picture. However, it may slightly differ due to lighting.</p>",
      returnPolicy: "undefined",
      price: 1000,
      discountPrice: 0,
      rewardPoints: 0,
      stock: 38,
      productCode: "",
      metaTitle: "",
      metaKeywords: "",
      isFeatured: false,
      metaDescription: "",
      specialOffer: false,
      discount: 0,
      hasVariants: false,
      thumbnail: "product/1735018696305-1T.jpg",
      gallery: [
        "67889b0d8d08a6c8089fb1a1",
        "67889b0e8d08a6c8089fb1a3",
        "67889b0f8d08a6c8089fb1a5",
        "67889b108d08a6c8089fb1a7",
      ],
      category: "MENS",
      brandValue: "NO-BRAND",
      productColorValue: [""],
      productSizeValue: [""],
      productFlagValue: "",
      subcategory: "jersey",
      childCategory: "sdfsd",
      isRecommended: false,
      isNew: false,
      wishCount: 20,
      sellingCount: 0,
      updatedAt: "2025-01-23T02:10:09.849Z",
      __v: 0,
      colorAndSize: [
        {
          color: {
            value: "#A52A2A",
            label: "Brown",
          },
          size: [
            {
              value: "S",
              label: "S",
              quantity: 5,
            },
          ],
          quantity: 5,
        },
        {
          color: {
            value: "#F5F5DC",
            label: "Beige",
          },
          size: [
            {
              value: "xl",
              label: "xl",
              quantity: 8,
            },
          ],
          quantity: 8,
        },
        {
          color: {
            value: "#F5F5DC",
            label: "Beige",
          },
          size: [
            {
              value: "lg",
              label: "lg",
              quantity: 8,
            },
          ],
          quantity: 8,
        },
      ],
      color: "#F5F5DC",
      size: "xl",
      quantity: 2,
      colorName: "Beige",
    },
  ],
  payment_method: "cash",
  total: "2120",
  status: "Pending",
  deliveryCharge: "120",
  itemPerDiscount: "0",
  discount: "0.00",
  coupon: "WELCOME30",
  totalItems: 2,
  orderOverview:
    "Order Summary:\n          - Customer: Hamid\n          - Contact: 3737337\n          - Address: Dhhd, BonMala Road, Gazipur\n          - Items: \n            \n              - 2 x Bangladesh Striped Team Jersey @ 1000 each\n                Description: A stylish Bangladesh jersey with white stripes, designed for team\n          - Payment Method: cash\n          - Total Price: 2120\n          - Order Date: 2025-01-24",
  createdAt: {
    $date: "2025-01-24T03:27:52.486Z",
  },
  updatedAt: {
    $date: "2025-01-24T03:27:52.486Z",
  },
  __v: 0,
};

const generateEmailTemplate = ({
  name,
  phone,
  address,
  cityName,
  areaName,
  items,
  paymentMethod,
  total,
  deliveryCharge,
  coupon,
  createdAt,
}) => `

    <div class="email-container">
        <div class="header">
            <h1>Thank You for Your Order!</h1>
        </div>
        <div class="content">
            <h2>Hi ${name},</h2>
            <p>Thank you for shopping with us. Here are your order details:</p>
            <div class="order-details">
                <h3>Order Summary</h3>
                <p><strong>Order Date:</strong> ${new Date(
                  createdAt
                ).toLocaleDateString()}</p>
                <p><strong>Delivery Address:</strong> ${address}, ${areaName}, ${cityName}</p>
                <p><strong>Contact:</strong> ${phone}</p>
                <table>
                    <thead>
                        <tr>
                            <th>Product</th>
                            <th>Quantity</th>
                            <th>Price</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${items
                          .map(
                            (item) => `
                        <tr>
                            <td>${item.productTitle}</td>
                            <td>${item.quantity}</td>
                            <td>${item.price}</td>
                        </tr>
                        `
                          )
                          .join("")}
                    </tbody>
                </table>
                <p><strong>Delivery Charge:</strong> $${deliveryCharge}</p>
                <p><strong>Total Amount:</strong> $${total}</p>
                ${
                  coupon
                    ? `<p><strong>Coupon Applied:</strong> ${coupon}</p>`
                    : ""
                }
                <p><strong>Payment Method:</strong> ${paymentMethod}</p>
            </div>
        </div>
        <div class="footer">
            <p>&copy; 2025 Your Company Name. All rights reserved.</p>
        </div>
    </div>
`;

document.getElementById("root").innerHTML = generateEmailTemplate(data);
