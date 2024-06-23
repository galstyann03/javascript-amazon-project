import renderOrderSummary from "./checkout/orderSummary.js";
import renderPaymentSummary from "./checkout/paymentSummary.js";
import { loadProducts } from "../data/products.js";
import { loadCart } from "../data/cart.js";

// promises are better compared with callbacks, they flatten our code

Promise.all([
  new Promise(resolve => {
    loadProducts(() => {
      resolve("value1");
    });
  }),
  new Promise(resolve => {
    loadCart(() => {
      resolve();
    });
  })

]).then(values => {
  console.log(values);
  renderOrderSummary();
  renderPaymentSummary();
});


// nested callback handling of async code in not a good idea

// loadProducts(() => {
//   loadCart(() => {
//     renderOrderSummary();
//     renderPaymentSummary();
//   });
// });