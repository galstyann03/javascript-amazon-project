export const cart = [];

export function addToCart(productId) {
  let matchingItem;

  cart.forEach(cartItem => {
    if (cartItem.productId === productId) matchingItem = cartItem;
  });

  const quantity = +document.querySelector(`.js-quantity-selector-${productId}`).value;

  if (matchingItem) {
    matchingItem.quantity += quantity;
  } else {
    cart.push({
      productId,
      quantity
    });
  }
}