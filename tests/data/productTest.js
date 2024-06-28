import { products, Product, Clothing, Appliance, loadProductsFetch } from "../../data/products.js";

describe('test suite: Product', () => {
  let product = new Product({
    id: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
    image: "images/products/athletic-cotton-socks-6-pairs.jpg",
    keywords: ['socks', 'sports', 'apparel'],
    name: "Black and Gray Athletic Cotton Socks - 6 Pairs",
    priceCents: 1090,
    rating: { stars: 4.5, count: 87 }
  });

  beforeAll(async () => {
    await loadProductsFetch();
  });

  it('has the correct properties', () => {
    expect(product.id).toEqual(products[0].id);
    expect(product.image).toEqual(products[0].image);
    expect(product.name).toEqual(products[0].name);
    expect(product.rating).toEqual(products[0].rating);
    expect(product.priceCents).toEqual(products[0].priceCents);
  });

  it('gets the stars url', () => {
    expect(product.getStarsUrl()).toEqual(products[0].getStarsUrl());
  });

  it('gets the price', () => {
    expect(product.getPrice()).toEqual(products[0].getPrice());
  });

  it('does not display any extra info', () => {
    expect(product.extraInfoHTML()).toEqual("");
  });
});

describe('test suite: Clothing', () => {
  let clothing = new Clothing(  {
    id: "83d4ca15-0f35-48f5-b7a3-1ea210004f2e",
    image: "images/products/adults-plain-cotton-tshirt-2-pack-teal.jpg",
    name: "Adults Plain Cotton T-Shirt - 2 Pack",
    rating: {
      stars: 4.5,
      count: 56
    },
    priceCents: 799,
    keywords: [
      "tshirts",
      "apparel",
      "mens"
    ],
    type: "clothing",
    sizeChartLink: "images/clothing-size-chart.png"
  });

  beforeAll(async () => {
    await loadProductsFetch();
  });

  it('has the correct properties', () => {
    expect(clothing.id).toEqual(products[2].id);
    expect(clothing.image).toEqual(products[2].image);
    expect(clothing.sizeChartLink).toEqual(products[2].sizeChartLink);
  });

  it('gets the stars url', () => {
    expect(clothing.getStarsUrl()).toEqual(products[2].getStarsUrl());
  });

  it('gets the price', () => {
    expect(clothing.getPrice()).toEqual(products[2].getPrice());
  });

  it('displays a size chart link in extraInfoHTML', () => {
    expect(clothing.extraInfoHTML()).toContain(`<a href="${products[2].sizeChartLink}" target="_blank">`);
    expect(clothing.extraInfoHTML()).toContain(`Size chart`);
  });
});

describe('test suite: Appliance', () => {
  let appliance = new Appliance({
    id: "54e0eccd-8f36-462b-b68a-8182611d9add",
    image: "images/products/black-2-slot-toaster.jpg",
    name: "2 Slot Toaster - Black",
    rating: {
      stars: 5,
      count: 2197
    },
    priceCents: 1899,
    keywords: [
      "toaster",
      "kitchen",
      "appliances"
    ],
    type: "appliance",
    instructionsLink: "images/appliance-instructions.png",
    warrantyLink: "images/appliance-warranty.png"
  });

  beforeAll(async () => {
    await loadProductsFetch();
  });

  it('has the correct properties', () => {
    expect(appliance.id).toEqual(products[3].id);
    expect(appliance.image).toEqual(products[3].image);
  });

  it('gets the stars url', () => {
    expect(appliance.getStarsUrl()).toEqual(products[3].getStarsUrl());
  });

  it('gets the price', () => {
    expect(appliance.getPrice()).toEqual(products[3].getPrice());
  });

  it('displays instructions and warranty in extraInfoHTML', () => {
    expect(appliance.extraInfoHTML()).toContain(`<a href="images/appliance-instructions.png" target="_blank">`);
    expect(appliance.extraInfoHTML()).toContain(`Instructions`);
    expect(appliance.extraInfoHTML()).toContain(`<a href="images/appliance-warranty.png"`);
    expect(appliance.extraInfoHTML()).toContain(`Warranty`);
  });
});
