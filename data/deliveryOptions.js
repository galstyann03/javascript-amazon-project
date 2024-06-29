import dayjs from "https://unpkg.com/dayjs@1.11.10/esm/index.js";

class DeliveryService {
  deliveryOptions;

  constructor() {
    this.deliveryOptions = [{
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
  }

  // Method for getting the specified delivery option
  getDeliveryOption(deliveryOptionId) {
    return this.deliveryOptions.find(deliveryOption => deliveryOptionId === deliveryOption.id) || this.deliveryOptions[0];
  }

  // Method that takes the deliveryOption, calculates the delivery date, and formats it
  calculateDeliveryDate(deliveryOption) {
    let { deliveryDays: remainingDays } = deliveryOption;
    let deliveryDate = dayjs();
  
    while (remainingDays > 0) {
      deliveryDate = deliveryDate.add(1, "day");
  
      if (!this.#isWeekend(deliveryDate)) {
        remainingDays--;
      }
    }
  
    return deliveryDate.format("dddd, MMMM D");
  }

  // Method for checking weekend days
  #isWeekend(date) {
    return date.day() === 0 || date.day() === 6;
  }

  // Method that checks if the deliveryOptionId exists
  validDeliveryOption(deliveryOptionId) {
    return this.deliveryOptions.some(option => deliveryOptionId === option.id);
  }
}

export const deliveryService = new DeliveryService();