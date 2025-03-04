import moment from "moment";
import getAbsoluteDescription from "./getAbsoluteDEscription";

function generateOrderOverview(order) {
  if (order) {
    const {
      name,
      phone,
      address,
      city_name,
      area_name,
      items,
      payment_method,
      total,
      createdAt,
    } = order;

    // Format the item details, including descriptions
    const itemDetails = items.map((item) => {
      const { productTitle, quantity, price, shortDescription } = item;
      const cleanDescription = getAbsoluteDescription(shortDescription); // Remove HTML tags
      return `
              - ${quantity} x ${productTitle} @ ${price} each
                Description: ${cleanDescription.trim()}`;
    });

    // Format order date
    const orderDate = moment().format("YYYY-MM-DD");

    // Build the summary
    const summary = `
          Order Summary:
          - Customer: ${name}
          - Contact: ${phone}
          - Address: ${address}, ${area_name}, ${city_name}
          - Items: 
            ${itemDetails.join("\n")}
          - Payment Method: ${payment_method}
          - Total Price: ${total}
          - Order Date: ${orderDate}
          `;

    return summary.trim();
  } else {
    return "";
  }
}

export default generateOrderOverview;
