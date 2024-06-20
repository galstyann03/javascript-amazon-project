import dayjs from "https://unpkg.com/dayjs@1.11.10/esm/index.js";
export const deliveryOptions = [{
  id: "1",
  deliveryDays: 7,
  priceCents: 0
}, {
  id: "2",
  deliveryDays: 3,
  priceCents: 499
}, {
  id: "3",
  deliveryDays: 1,
  priceCents: 999
}];

// function for getting the specified delivery option from the array
export function getDeliveryOption(deliveryOptionId) {
  return deliveryOptions.find(deliveryOption => deliveryOptionId === deliveryOption.id) || deliveryOptions[0];
}

// function that takes the deliveryOption, calculates the delivery date, and formats it.
export function calculateDeliveryDate(deliveryOption) {
  let {deliveryDays: remainingDays} = deliveryOption;
  let deliveryDate = dayjs();

  while (remainingDays > 0) {
    deliveryDate = deliveryDate.add(1, "day");

    if(!isWeekend(deliveryDate)) {
      remainingDays--;
    }
  }

  return deliveryDate.format("dddd, MMMM D");
}

// function for checking the weekend days for skipping them 
function isWeekend(date) {
  return date.format("dddd") === "Saturday" || date.format("dddd") === "Sunday";
}