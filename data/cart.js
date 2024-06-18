// loading the cart from localStorage or giving its default value
export let cart = JSON.parse(localStorage.getItem("cart")) || [{
  productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
  quantity: 2
}, {
  productId: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
  quantity: 1
}];

// function for saving the cart in the localStorage
function saveToStorage() {
  localStorage.setItem("cart", JSON.stringify(cart));
}

// function for adding to cart by the selected quantity
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

  saveToStorage();
}

// function for removing from cart
 export function removeFromCart(productId) {
  cart = cart.filter(cartItem => cartItem.productId !== productId);
  saveToStorage();
}

// functin to calculate the cart quantity
export function calculateCartQunatity() {
  return cart.reduce((acc, cartItem) => {
    return acc + cartItem.quantity;
  }, 0);
}