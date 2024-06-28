import renderOrderSummary from "./checkout/orderSummary.js";
import renderPaymentSummary from "./checkout/paymentSummary.js";
import { loadProductsFetch } from "../data/products.js";
import { loadCartFetch } from "../data/cart.js";

// handling async code using async await syntax
async function loadPage() {
  try {
    await Promise.all([
      loadProductsFetch(),
      loadCartFetch()
    ]);
  } catch (error) {
    console.log("unexpected error: Please try again later.");
  }

  renderOrderSummary();
  renderPaymentSummary();
}
loadPage();

// promises are better compared with callbacks, they flatten our code
// Promise.all([
//   loadProductsFetch(),
//   new Promise(resolve => {
//     loadCart(() => {
//       resolve();
//     });
//   })
// ]).then(() => {
//   renderOrderSummary();
//   renderPaymentSummary();
// });


// nested callback handling of async code in not a good idea -- callback hell
// loadProducts(() => {
//   loadCart(() => {
//     renderOrderSummary();
//     renderPaymentSummary();
//   });
// });