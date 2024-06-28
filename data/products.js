import formatCurrency from '../scripts/utils/money.js';

// function for getting the specified product from the products array
export function getProduct(productId) {
  return products.find(product => productId === product.id);
}

export class Product {
  id;
  image;
  name;
  rating;
  priceCents;

  constructor(productDetails) {
    this.id = productDetails.id;
    this.image = productDetails.image;
    this.name = productDetails.name;
    this.rating = productDetails.rating;
    this.priceCents = productDetails.priceCents;
  }

  getStarsUrl() {
    return `images/ratings/rating-${this.rating.stars * 10}.png`;
  }

  getPrice() {
    return `$${formatCurrency(this.priceCents)}`;
  }

  extraInfoHTML() {
    return "";
  }
}

export class Clothing extends Product {
  sizeChartLink;

  constructor(productDetails) {
    super(productDetails);
    this.sizeChartLink = productDetails.sizeChartLink;
  }

  extraInfoHTML() {
    return `
      <a href="${this.sizeChartLink}" target="_blank">Size chart</a>
    `;
  }
}

export class Appliance extends Product {
  instructionsLink;
  warrantyLink;

  constructor(productDetails) {
    super(productDetails);
    this.instructionsLink = productDetails.instructionsLink;
    this.warrantyLink = productDetails.warrantyLink;
  }

  extraInfoHTML() {
    return `
      <a href="${this.instructionsLink}" target="_blank">Instructions</a>
      <a href="${this.warrantyLink}" target="_blank">Warranty</a>
    `;
  }
}


export let products = [];

// code for loading products using fetch API
export async function loadProductsFetch() {
  try {
    const response = await fetch("https://supersimplebackend.dev/products");
    if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);

    const productsData = await response.json();
    products = productsData.map(productDetails => {
      if (productDetails.keywords.includes("apparel")) return new Clothing(productDetails);
      if (productDetails.keywords.includes("appliances")) return new Appliance(productDetails);
      return new Product(productDetails);
    });

    console.log("Products loaded successfully.")
  } catch (error) {
    console.error("Unexpected error:", error.message);
    throw error;
  }
}