import { validDeliveryOption } from "./deliveryOptions.js";

export class Cart {
  cartItems;
  #localStorageKey;

  constructor(localStorageKey) {
    this.#localStorageKey = localStorageKey;
    this.#loadFromStorage();
  }

  // loading the cart from localStorage or giving it a default value
  #loadFromStorage() {
    this.cartItems = JSON.parse(localStorage.getItem(this.#localStorageKey)) || [{
      productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
      quantity: 2,
      deliveryOptionId: "1"
    }, {
      productId: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
      quantity: 1,
      deliveryOptionId: "2"
    }];
  }

  // function for saving the cart in the localStorage
  #saveToStorage() {
    localStorage.setItem(this.#localStorageKey, JSON.stringify(this.cartItems));
  }

  // function for adding to cart by the selected quantity - tested
  addToCart(productId, quantity = 1) {
    const matchingItem = this.cartItems.find(cartItem => cartItem.productId === productId);

    if (matchingItem) {
      matchingItem.quantity += quantity;
    } else {
      this.cartItems.push({
        productId,
        quantity,
        deliveryOptionId: "1"
      });
    }

    this.#saveToStorage();
  }

  // function for removing from cart - tested
  removeFromCart(productId) {
    this.cartItems = this.cartItems.filter(cartItem => cartItem.productId !== productId);
    this.#saveToStorage();
  }

  // function to calculate the cart quantity
  calculateCartQuantity() {
    return this.cartItems.reduce((acc, cartItem) => {
      return acc + cartItem.quantity;
    }, 0);
  }

  // function for updating the product quantity to new one 
  updateQuantity(productId, newQuantity) {
    this.cartItems.forEach(cartItem => {
      if (cartItem.productId === productId) {
        cartItem.quantity = newQuantity;
      }
    });
    this.#saveToStorage();
  }

  // function for updating the delivery options in the cart - tested
  updateDeliveryOption(productId, deliveryOptionId) {
    const product = this.cartItems.find(cartItem => cartItem.productId === productId);

    if (!product || !validDeliveryOption(deliveryOptionId)) return;

    product.deliveryOptionId = deliveryOptionId;
    this.#saveToStorage();
  }
}

export const cart = new Cart("cart");

export async function loadCartFetch() {
  try {
    const response = await fetch("https://supersimplebackend.dev/cart");
    if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
    console.log("Cart loaded successfully.");
  } catch (error) {
    console.error("Unexpected error:", error.message);
    throw error;
  }
}