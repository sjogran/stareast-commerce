const { findProductsByIds } = require("../model/productModel");

function checkout({ productIds, paymentMethod }) {
  if (!Array.isArray(productIds) || productIds.length === 0) {
    throw new Error("productIds must be a non-empty array");
  }

  if (!["cash", "credit_card"].includes(paymentMethod)) {
    throw new Error("paymentMethod must be cash or credit_card");
  }

  const products = findProductsByIds(productIds);
  if (products.length !== productIds.length) {
    throw new Error("One or more products were not found");
  }

  const subtotal = products.reduce((total, product) => total + product.price, 0);
  const discount = paymentMethod === "cash" ? subtotal * 0.1 : 0;
  const total = subtotal - discount;

  return {
    products,
    paymentMethod,
    subtotal,
    discount,
    total
  };
}

module.exports = {
  checkout
};
