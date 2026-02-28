

const productStore = {
  "orbea-laufey-h10": {
    oldPrice: 280000,
    newPrice: 260000
  },
 
  "orbea-laufey-h30": {
    oldPrice: 7495,
    newPrice: 7495
  },

  "orbea-laufey-h-ltd": {
    oldPrice: 11495,
    newPrice: 11495
  },

  "orbea-occam-sl-h30": {
    oldPrice: 13500,
    newPrice: 12995
  },

  "orbea-occam-lt-h30": {
    oldPrice: 13995,
    newPrice: 13000
  },

  "orbea-occam-sl-h10": {
    oldPrice: 13995,
    newPrice: 13995,
    sellerNumber: +254716060708
  },

  "orbea-occam-lt-h10": {
    newPrice: 560995
  },

  "orbea-occam-sl-m30": {
    oldPrice: 19495,
    newPrice: 19495
  }
};

function calculateDiscount(oldPrice, newPrice) {
  return oldPrice > newPrice
    ? Math.round(((oldPrice - newPrice) / oldPrice) * 100)
    : 0;
}

function syncProduct(productName) {
  const product = productStore[productName];
  const discount = calculateDiscount(product.oldPrice, product.newPrice);

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
        oldMain.style.display = "inline"; // force visible
      }
      if (discMain) {
        discMain.textContent = `-${discount}%`;
        discMain.style.display = "block"; // force visible
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
        oldCard.style.display = "inline"; // force visible
      }
      if (discCard) {
        discCard.textContent = `-${discount}%`;
        discCard.style.display = "block"; // force visible
      }
    } else {
      if (oldCard) oldCard.remove();
      if (discCard) discCard.remove();
    }
  });
}

document.addEventListener("DOMContentLoaded", () => {
  Object.keys(productStore).forEach(syncProduct);
});
