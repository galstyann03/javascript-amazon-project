import { validDeliveryOption } from "./deliveryOptions.js";

function Cart(localStorageKey) {

  const cart = {
    cartItems: undefined,
  
    // loading the cart from localStorage or giving it a default value
    loadFromStorage() {
      this.cartItems = JSON.parse(localStorage.getItem(localStorageKey)) || [{
        productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
        quantity: 2,
        deliveryOptionId: "1"
      }, {
        productId: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
        quantity: 1,
        deliveryOptionId: "2"
      }];
    },
  
    // function for saving the cart in the localStorage
    saveToStorage() {
      localStorage.setItem(localStorageKey, JSON.stringify(this.cartItems));
    },
  
    
    // function for adding to cart by the selected quantity - tested
    addToCart(productId) {
      const matchingItem = this.cartItems.find(cartItem => cartItem.productId === productId);
  
      const quantity = +document.querySelector(`.js-quantity-selector-${productId}`).value;
  
      if (matchingItem) {
        matchingItem.quantity += quantity;
      } else {
        this.cartItems.push({
          productId,
          quantity: 1,
          deliveryOptionId: "1"
        });
      }
  
      this.saveToStorage();
    },
  
    // function for removing from cart - tested
    removeFromCart(productId) {
      this.cartItems = this.cartItems.filter(cartItem => cartItem.productId !== productId);
      this.saveToStorage();
    },
  
    // function to calculate the cart quantity
    calculateCartQuantity() {
      return this.cartItems.reduce((acc, cartItem) => {
        return acc + cartItem.quantity;
      }, 0);
    },
  
    // function for updating the product quantity to new one 
    updateQuantity(productId, newQuantity) {
      this.cartItems.forEach(cartItem => {
        if (cartItem.productId === productId) {
          cartItem.quantity = newQuantity;
        }
      });
      this.saveToStorage();
    },
  
    // function for updating the delivery options in the cart - tested
    updateDeliveryOption(productId, deliveryOptionId) {
      const product = this.cartItems.find(cartItem => cartItem.productId === productId);
  
      if (!product || !validDeliveryOption(deliveryOptionId)) return;
  
      product.deliveryOptionId = deliveryOptionId;
      this.saveToStorage();
    }
  };

  return cart;
}

const cart = Cart("cart-oop");
const businessCart = Cart("cart-business");


cart.loadFromStorage();
businessCart.loadFromStorage();

console.log(cart);
console.log(businessCart);