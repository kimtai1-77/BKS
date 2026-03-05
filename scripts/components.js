/**
 * components Store - Component products with pricing and discount calculations
 */
const componentStore = {
  "Oneup carbon handlebars 780mm": {
    newPrice: 12000
  },
  
  "Nukeproof 29 30mm wheels": {
    newPrice: 68000
  },

  "Ergon saddle": {
    newPrice: 9500
  },

  "PNW alloy pedals": {
    newPrice: 12800
  },

  "Shimano M6100 brake set": {
    oldPrice: 35000,
    newPrice: 28000
  },

  "SRAM GX 12-spd derailleur": {
    oldPrice: 25000,
    newPrice: 19500
  },

  "Rockshox Reverb wireless dropper-post": {
    oldPrice: 65000,
    newPrice: 60000
  },

  "FUNN stem": {
    newPrice: 6400
  },

  "CaneCreek headset": {
    newPrice: 9600
  },

  "Fox 36 160mm fork": {
    oldPrice: 85000,
    newPrice: 82000
  },

  "Michelin Wild Enduro tires": {
    oldPrice: 19000,
    newPrice: 17200
  },

  "SRAM GX 12-spd shifter": {
    newPrice: 9500
  }
};

/**
 * calculateDiscount - Calculates percentage discount
 * @param {number} oldPrice - Original price
 * @param {number} newPrice - Discounted price
 * @returns {number} Discount percentage
 */
function calculateComponentDiscount(oldPrice, newPrice) {
  return oldPrice > newPrice
    ? Math.round(((oldPrice - newPrice) / oldPrice) * 100)
    : 0;
}

/**
 * syncComponentProduct - Updates DOM elements with component pricing and discount info
 * Matches both main page and carousel elements
 */
function syncComponentProduct(productName) {
  const product = componentStore[productName];
  if (!product) return;
  
  const discount = calculateComponentDiscount(product.oldPrice, product.newPrice);

  const elements = document.querySelectorAll(`[data-product="${productName}"]`);

  elements.forEach(el => {
    // Main page selectors
    const oldMain = el.querySelector(".old-price");
    const newMain = el.querySelector(".new-price");
    const discMain = el.querySelector(".discount-tab");

    if (newMain) newMain.textContent = `KES. ${product.newPrice}`;

    if (product.newPrice < product.oldPrice) {
      if (oldMain) {
        oldMain.textContent = `KES. ${product.oldPrice}`;
        oldMain.style.display = "inline";
      }
      if (discMain) {
        discMain.textContent = `-${discount}%`;
        discMain.style.display = "block";
      }
    } else {
      if (oldMain) oldMain.remove();
      if (discMain) discMain.remove();
    }

    // Carousel selectors
    const oldCard = el.querySelector(".card-old-price");
    const newCard = el.querySelector(".card-price");
    const discCard = el.querySelector(".card-discount");

    if (newCard) newCard.textContent = `KES. ${product.newPrice}`;

    if (product.newPrice < product.oldPrice) {
      if (oldCard) {
        oldCard.textContent = `KES. ${product.oldPrice}`;
        oldCard.style.display = "inline";
      }
      if (discCard) {
        discCard.textContent = `-${discount}%`;
        discCard.style.display = "block";
      }
    } else {
      if (oldCard) oldCard.remove();
      if (discCard) discCard.remove();
    }
  });
}

/**
 * Initialize on page load - Syncs all component products
 */
document.addEventListener("DOMContentLoaded", () => {
  Object.keys(componentStore).forEach(syncComponentProduct);
});
