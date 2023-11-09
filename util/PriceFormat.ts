const formatPrice = (amount: number) => {
  return new Intl.NumberFormat("en", {
    style: "currency",
    currency: "EUR",
  }).format(amount / 100);
};

export default formatPrice;
