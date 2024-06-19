// loading the cart from localStorage or giving its default value
export let cart = JSON.parse(localStorage.getItem("cart")) || [{
  productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
  quantity: 2,
  deliveryOptionId: "1"
}, {
  productId: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
  quantity: 1,
  deliveryOptionId: "2"
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
      quantity,
      deliveryOptionId: "1"
    });
  }

  saveToStorage();
}

// function for removing from cart
 export function removeFromCart(productId) {
  cart = cart.filter(cartItem => cartItem.productId !== productId);
  saveToStorage();
}

// function to calculate the cart quantity
export function calculateCartQunatity() {
  return cart.reduce((acc, cartItem) => {
    return acc + cartItem.quantity;
  }, 0);
}

// function for updating the product quantity to new one 
export function updateQuantity(productId, newQuantity) {
  cart.forEach(cartItem => {
    if (cartItem.productId === productId) {
      cartItem.quantity = newQuantity;
    }
  });
  saveToStorage();
}

// function for updating the delivery options in the cart
export function updateDeliveryOption(productId, deliveryOptionId) {
  cart.forEach(cartItem => {
    if (cartItem.productId === productId) {
      cartItem.deliveryOptionId = deliveryOptionId;
    }
  });
  saveToStorage();
}