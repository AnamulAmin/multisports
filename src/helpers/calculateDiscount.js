function calculateDiscounts(cart, discounts, isMach) {
  const cartTotal = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  let totalDiscount = 0;
  let appliedDiscounts = [];

  // Percentage-based Discount
  if (
    discounts.percentageDiscountActive &&
    cartTotal > discounts.orderAboveForPercentageDiscount
  ) {
    const percentageDiscount = (cartTotal * discounts.percentageDiscount) / 100;
    totalDiscount += percentageDiscount;
    appliedDiscounts.push({
      type: "Percentage-based Discount",
      amount: percentageDiscount.toFixed(2),
    });
  }

  // Flat Discount
  if (
    discounts.flatDiscountActive &&
    cartTotal > Number(discounts.orderAboveForFlatDiscount)
  ) {
    totalDiscount += Number(discounts.flatDiscount);
    appliedDiscounts.push({
      type: "Flat Discount",
      amount: Number(discounts.flatDiscount).toFixed(2),
    });
  }

  // Item-based Discounts
  if (discounts.itemDiscountsActive) {
    cart.forEach((item) => {
      const itemDiscount = discounts.itemDiscounts.find(
        (d) => d.id === item.id
      );
      if (itemDiscount && item.quantity >= itemDiscount.buy) {
        const freeItems =
          Math.floor(item.quantity / itemDiscount.buy) * itemDiscount.free;
        const freeValue = freeItems * item.price;
        totalDiscount += freeValue;
        appliedDiscounts.push({
          type: "Item-based Discount",
          itemId: item.id,
          amount: freeValue.toFixed(2),
        });
      }
    });
  }

  // Time-based Discounts (Happy Hour)
  if (discounts.happyHourActive) {
    const now = new Date();
    const currentTime = `${now.getHours().toString().padStart(2, "0")}:${now
      .getMinutes()
      .toString()
      .padStart(2, "0")}`;

    currentTime, discounts.happyHourStart, discounts.happyHourEnd;
    if (
      currentTime >= discounts.happyHourStart &&
      currentTime <= discounts.happyHourEnd
    ) {
      const happyHourDiscount =
        (cartTotal * Number(discounts.happyHourDiscount)) / 100;
      totalDiscount += happyHourDiscount;
      appliedDiscounts.push({
        type: "Happy Hour Discount",
        amount: happyHourDiscount.toFixed(2),
      });
    }
  }

  // Loyalty Discount
  if (discounts.loyaltyDiscountActive) {
    const loyaltyDiscount =
      (cartTotal * Number(discounts.loyaltyDiscount)) / 100;
    totalDiscount += loyaltyDiscount;
    appliedDiscounts.push({
      type: "Loyalty Discount",
      amount: loyaltyDiscount.toFixed(2),
    });
  }

  // (isMach, "isMach", discounts, discounts?.promoCodeDiscount);
  // Promo Code Discount
  if (discounts.promoCodeActive && isMach && discounts?.promoCodeDiscount) {
    // (isMach, "isMach");
    totalDiscount += Number(discounts?.promoCodeDiscount);
    appliedDiscounts.push({
      type: "Promo Code Discount",
      amount: Number(discounts?.promoCodeDiscount).toFixed(2),
    });
  }

  // Calculate the discounted total
  const discountedTotal = Math.max(0, cartTotal - totalDiscount);

  return {
    totalDiscount: totalDiscount.toFixed(2),
    discountedTotal: discountedTotal.toFixed(2),
    appliedDiscounts,
  };
}

export default calculateDiscounts;
