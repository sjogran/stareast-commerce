const products = [
  { id: 1, name: "T-Shirt", price: 50 },
  { id: 2, name: "Sneakers", price: 200 },
  { id: 3, name: "Backpack", price: 120 }
];

function getProducts() {
  return products;
}

function findProductsByIds(productIds) {
  return products.filter((product) => productIds.includes(product.id));
}

module.exports = {
  getProducts,
  findProductsByIds
};
