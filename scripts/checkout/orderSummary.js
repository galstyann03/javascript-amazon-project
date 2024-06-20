import { cart, removeFromCart, calculateCartQuantity, updateQuantity, updateDeliveryOption } from "../../data/cart.js";
import { getProduct } from "../../data/products.js";
import formatCurrency from "../utils/money.js";
import dayjs from "https://unpkg.com/dayjs@1.11.10/esm/index.js";
import { deliveryOptions, getDeliveryOption } from "../../data/deliveryOptions.js";
import renderPaymentSummary from "./paymentSummary.js";

// generating HTML for checkout page
export default function renderOrderSummary() {
  let cartSummaryHTML = ``;

  cart.forEach(cartItem => {
    const {productId} = cartItem;
    const matchingProduct = getProduct(productId);

    const deliveryOptionId = cartItem.deliveryOptionId;
    const deliveryOption = getDeliveryOption(deliveryOptionId);

    const today = dayjs();
    const deliveryDate = today.add(deliveryOption.deliveryDays, "days");
    const dateString = deliveryDate.format('dddd, MMMM D');

    cartSummaryHTML += `
      <div class="cart-item-container js-cart-item-container-${matchingProduct.id}">
        <div class="delivery-date">
          Delivery date: ${dateString}
        </div>

        <div class="cart-item-details-grid">
          <img class="product-image"
            src=${matchingProduct.image}>

          <div class="cart-item-details">
            <div class="product-name">
              ${matchingProduct.name}
            </div>
            <div class="product-price">
              $${formatCurrency(matchingProduct.priceCents)}
            </div>
            <div class="product-quantity">
              <span>
                Quantity: <span class="quantity-label js-quantity-label-${matchingProduct.id}">${cartItem.quantity}</span>
              </span>
              <span class="update-quantity-link link-primary js-update-link" data-product-id="${matchingProduct.id}">
                Update
              </span>
              <input class="quantity-input js-quantity-input-${matchingProduct.id}">
              <span class="save-quantity-link js-save-link link-primary" data-product-id=${matchingProduct.id}>Save</span>
              <span class="delete-quantity-link link-primary js-delete-link" data-product-id="${matchingProduct.id}">
                Delete
              </span>
            </div>
          </div>

          <div class="delivery-options">
            <div class="delivery-options-title">
              Choose a delivery option:
            </div>
            ${deliveryOptionsHTML(matchingProduct, cartItem)}
          </div>
        </div>
      </div>
    `;
  });

  // an html generation for the delivery options section
  function deliveryOptionsHTML(matchingProduct, cartItem) {
    let html = ""; 

    deliveryOptions.forEach(deliveryOption => {
      const today = dayjs();
      const deliveryDate = today.add(deliveryOption.deliveryDays, "days");
      const dateString = deliveryDate.format('dddd, MMMM D');
      const priceString = deliveryOption.priceCents === 0 ? "FREE" : `$${formatCurrency(deliveryOption.priceCents)} -`;

      const isChecked = deliveryOption.id === cartItem.deliveryOptionId;

      html += `
        <div class="delivery-option js-delivery-option" data-product-id="${matchingProduct.id}" data-delivery-option-id="${deliveryOption.id}">
          <input type="radio" ${isChecked ? "checked" : ""}
            class="delivery-option-input"
            name="delivery-option-${matchingProduct.id}">
          <div>
            <div class="delivery-option-date">
              ${dateString}
            </div>
            <div class="delivery-option-price">
              ${priceString} Shipping
            </div>
          </div>
        </div>
      `
    });
  return html;
  }

  document.querySelector(".js-order-summary").innerHTML = cartSummaryHTML;

  // event listeners for delete links
  document.querySelectorAll(".js-delete-link").forEach(link => {
    link.addEventListener("click", () => {
      const {productId} = link.dataset;
      removeFromCart(productId);
      document.querySelector(`.js-cart-item-container-${productId}`).remove();
      updateCartQuantity();
      renderPaymentSummary();
    });
  });

  // function that updates the quantity showed at the top of the page 
  function updateCartQuantity() {
    const cartQuantity = calculateCartQuantity();
    document.querySelector(".js-return-to-home-link").innerHTML = `${cartQuantity} items`;
  }
  updateCartQuantity();

  // event listeners for update links
  document.querySelectorAll(".js-update-link").forEach(link => {
    link.addEventListener("click", () => {
      const {productId} = link.dataset;
      document.querySelector(`.js-cart-item-container-${productId}`).classList.add("is-editing-quantity");
    });
  });

  // an event listener function for save link
  function eventListener(productId) {
    const newQuantity = +document.querySelector(`.js-quantity-input-${productId}`).value;

    if (newQuantity < 0 || newQuantity >= 1000) {
      alert("Quantity must be at least 0 and less than 1000");
      return;
    }

    updateQuantity(productId, newQuantity);

    document.querySelector(`.js-cart-item-container-${productId}`).classList.remove("is-editing-quantity");
    document.querySelector(`.js-quantity-label-${productId}`).innerHTML = newQuantity;

    updateCartQuantity();
    renderPaymentSummary();
  }

  // event listeners for save links
  document.querySelectorAll(".js-save-link").forEach(link => {
    const {productId} = link.dataset;
    link.addEventListener("click", () => {
      eventListener(productId);
    });

    // event listeners for input fields
    document.querySelector(`.js-quantity-input-${productId}`).addEventListener("keydown", event => {
      if (event.key === "Enter") eventListener(productId);
    });
  });


  // event listeners for delivery options
  document.querySelectorAll(".js-delivery-option").forEach(elem => {
    elem.addEventListener("click", () => {
      const {productId, deliveryOptionId} = elem.dataset;
      updateDeliveryOption(productId, deliveryOptionId);
      renderOrderSummary();
    });
  });
}