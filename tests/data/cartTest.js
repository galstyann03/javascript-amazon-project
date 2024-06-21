import { addToCart, cart, loadFromStorage, removeFromCart, updateDeliveryOption } from "../../data/cart.js";

const productId1 = "e43638ce-6aa0-4b85-b27f-e1d07eb678c6";
const productId2 = "15b6fc6f-327a-4ec4-896f-486349e85a3d";

describe('test suite: addToCart', () => {
  let inputElement;
  beforeEach(() => {
    inputElement = document.createElement("input");
    inputElement.className = `js-quantity-selector-${productId1}`;
    inputElement.value = 1;
    document.body.appendChild(inputElement);

    spyOn(document, "querySelector").and.callFake(selector => {
      if (selector === `.js-quantity-selector-${productId1}`) return inputElement;
      return null;
    });
    spyOn(localStorage, "setItem"); 
  });

  afterEach(() => {
    document.body.removeChild(inputElement);
  });

  it("adds an existing product to the cart", () => {
    spyOn(localStorage, "getItem").and.callFake(() => {
      return JSON.stringify([{
        productId: productId1,
        quantity: 1,
        deliveryOptionId: "1"
      }]);
    });
    loadFromStorage();

    addToCart(productId1);
    expect(cart.length).toEqual(1);
    expect(localStorage.setItem).toHaveBeenCalledTimes(1);
    expect(localStorage.setItem).toHaveBeenCalledWith("cart", JSON.stringify([{
      productId: productId1,
      quantity: 2,
      deliveryOptionId: "1"
    }]));
    expect(cart[0].productId).toEqual(productId1);
    expect(cart[0].quantity).toEqual(2);
  });
  
  it("adds a new product to the cart", () => {
    spyOn(localStorage, "getItem").and.callFake(() => {
      return JSON.stringify([]);
    });
    loadFromStorage();
    
    addToCart(productId1);
    expect(cart.length).toEqual(1);
    expect(localStorage.setItem).toHaveBeenCalledTimes(1);
    expect(localStorage.setItem).toHaveBeenCalledWith("cart", JSON.stringify([{
      productId: productId1,
      quantity: 1,
      deliveryOptionId: "1"
    }]));
    expect(cart[0].productId).toEqual(productId1);
    expect(cart[0].quantity).toEqual(1);
  });
});

describe('test suite: removeFromCart', () => {
  beforeEach(() => {
    spyOn(localStorage, "setItem");
    spyOn(localStorage, "getItem").and.callFake(() => {
      return JSON.stringify([{
        productId: productId1,
        quantity: 2,
        deliveryOptionId: "1"
      }, {
        productId: productId2,
        quantity: 1,
        deliveryOptionId: "2"
      }]);
    });
    loadFromStorage();
  });

  it("removes a product from the cart", () => {
    removeFromCart(productId1);
    expect(cart.length).toEqual(1);
    expect(localStorage.setItem).toHaveBeenCalledTimes(1);
    expect(localStorage.setItem).toHaveBeenCalledWith("cart", JSON.stringify([{
      productId: productId2,
      quantity: 1,
      deliveryOptionId: "2"
    }]));
    expect(cart[0].productId).toEqual(productId2);
    expect(cart[0].quantity).toEqual(1);
  });

  it("does nothing if product is not in the cart", () => {
    removeFromCart("does not exist");
    expect(cart.length).toEqual(2);
    expect(localStorage.setItem).toHaveBeenCalledTimes(1);
    expect(localStorage.setItem).toHaveBeenCalledWith("cart", JSON.stringify([{
      productId: productId1,
      quantity: 2,
      deliveryOptionId: "1"
    }, {
      productId: productId2,
      quantity: 1,
      deliveryOptionId: "2"
    }]));
    expect(cart[0].productId).toEqual(productId1);
    expect(cart[1].productId).toEqual(productId2);
    expect(cart[0].quantity).toEqual(2);
    expect(cart[1].quantity).toEqual(1);
  });
});

describe('test suite: updateDeliveryOption', () => {
  beforeEach(() => {
    spyOn(localStorage, "setItem");
    spyOn(localStorage, "getItem").and.callFake(() => {
      return JSON.stringify([{
        productId: productId1,
        quantity: 2,
        deliveryOptionId: "1"
      }, {
        productId: productId2,
        quantity: 1,
        deliveryOptionId: "2"
      }]);
    });
    loadFromStorage();
  });

  it('update the delivery option of the product in the cart', () => {
    updateDeliveryOption(productId1, "3");
    expect(cart.length).toEqual(2);
    expect(localStorage.setItem).toHaveBeenCalledTimes(1);
    expect(localStorage.setItem).toHaveBeenCalledWith("cart", JSON.stringify([{
      productId: productId1,
      quantity: 2,
      deliveryOptionId: "3"
    }, {
      productId: productId2,
      quantity: 1,
      deliveryOptionId: "2"
    }]));
    expect(cart[0].productId).toEqual(productId1);
    expect(cart[0].quantity).toEqual(2);
    expect(cart[0].deliveryOptionId).toEqual("3");
    expect(cart[1].productId).toEqual(productId2);
    expect(cart[1].quantity).toEqual(1);
    expect(cart[1].deliveryOptionId).toEqual("2");
  });

  it('does nothing if the product is not in the cart', () => {
    updateDeliveryOption("does not exist", "3");
    expect(cart.length).toEqual(2);
    expect(localStorage.setItem).toHaveBeenCalledTimes(0);
    expect(cart[0].productId).toEqual(productId1);
    expect(cart[0].quantity).toEqual(2);
    expect(cart[0].deliveryOptionId).toEqual("1");
    expect(cart[1].productId).toEqual(productId2);
    expect(cart[1].quantity).toEqual(1);
    expect(cart[1].deliveryOptionId).toEqual("2");
  });

  it('does nothing if the deliveryOptionId does not exist', () => {
    updateDeliveryOption(productId1, "does not exist");
    expect(cart.length).toEqual(2);
    expect(localStorage.setItem).toHaveBeenCalledTimes(0);
    expect(cart[0].productId).toEqual(productId1);
    expect(cart[0].quantity).toEqual(2);
    expect(cart[0].deliveryOptionId).toEqual("1");
    expect(cart[1].productId).toEqual(productId2);
    expect(cart[1].quantity).toEqual(1);
    expect(cart[1].deliveryOptionId).toEqual("2");
  });
});