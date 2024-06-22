import { products, Product, Clothing, Appliance } from "../../data/products.js";

describe('test suite: Product', () => {
  let product;
  beforeEach(() => {
    product = new Product(products[0]);
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
  let clothing;
  beforeEach(() => {
    clothing = new Clothing(products[2]);
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
  let appliance;
  beforeEach(() => {
    appliance = new Appliance(products[3]);
  });

  it('has the correct properties', () => {
    expect(appliance.id).toEqual(products[3].id);
    expect(appliance.image).toEqual(products[3].image);
    expect(appliance.instructionsLink).toEqual(products[3].instructionsLink);
    expect(appliance.warrantyLink).toEqual(products[3].warrantyLink);
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
