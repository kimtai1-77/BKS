

// Run once on page load
document.addEventListener("DOMContentLoaded", () => {
  
  updateCarouselDiscounts();
  selectImageFromThumbnails();
  goHome();
  initMainContScrollbar();
})




function gotoPage(url) {
    window.location.href = url;
}




function updateCarouselDiscounts() {
  const carousels = document.querySelectorAll(".carousel");

  carousels.forEach(carousel => {
    const cards = carousel.querySelectorAll(".card");

    cards.forEach(card => {
      const oldPriceEl = card.querySelector(".card-old-price");
      const newPriceEl = card.querySelector(".card-price");
      const discountEl = card.querySelector(".card-discount");

      // Skip cards without full price/discount structure
      if (!oldPriceEl || !newPriceEl || !discountEl) return;

      // Extract numeric values only
      const oldPrice = parseFloat(oldPriceEl.textContent.replace(/[^0-9.]/g, ""));
      const newPrice = parseFloat(newPriceEl.textContent.replace(/[^0-9.]/g, ""));

      if (oldPrice > newPrice) {
        const discount = Math.round(((oldPrice - newPrice) / oldPrice) * 100);
        discountEl.textContent = `${discount}% Off`;
        discountEl.style.display = "block";
        oldPriceEl.style.display = "inline"; // show old price
      } else {
        discountEl.style.display = "none";
        oldPriceEl.style.display = "none"; // hide old price if equal or less
      }
    });
  });
}



// ---------former function that works with the colour dots--------
/*function selectBikeByColour() {
  const mainImg = document.querySelector('.main-product-img');
  const colorDots = document. querySelectorAll('.color');
  const imagesSource = document.querySelectorAll('.bike-images-cont img');
  const colorName = document.querySelector('.color-name');

  // look for ID in the source
  const copperSrc = Array.from(imagesSource).find(img => img.id === 'copper')?.src;
  const silverSrc = Array.from(imagesSource).find(img => img.id === 'silver')?.src;
  const spaceshipGreenSrc = Array.from(imagesSource).find(img => img.id === 'spaceship-green')?.src;
  const lavenderSrc = Array.from(imagesSource).find(img => img.id === 'lavender')?.src;
  const jetBlackSrc = Array.from(imagesSource).find(img => img.id === 'jet-black')?.src;
  const royalAmethystSrc = Array.from(imagesSource).find(img => img.id === 'royal-amethyst')?.src;
  const ivorySrc = Array.from(imagesSource).find(img => img.id === 'ivory-white')?.src;
  const escapeGreenSrc = Array.from(imagesSource).find(img => img.id === 'escape-green')?.src;

  colorDots.forEach(color => {
    color.addEventListener('click', () => {
      // first remove active from all dots
      colorDots.forEach(dot => dot.classList.remove('active'));
      color.classList.add('active');

      // fade out
      mainImg.style.opacity = 0;

      // after fade-out completes, swap src and fade back in
      setTimeout(() => {
        if (color.classList.contains('copper')) {
          mainImg.src = copperSrc;
          colorName.textContent = 'Metallic Cinammon (Matt)';
        } else if (color.classList.contains('silver')) {
          mainImg.src = silverSrc;
          colorName.textContent = 'Smooth Silver (Matt)'
        } else if (color.classList.contains('spaceship-green')) {
          mainImg.src = spaceshipGreenSrc;
          colorName.textContent = 'Spaceship Green (Gloss)';
        } else if (color.classList.contains('lavender')) {
          mainImg.src = lavenderSrc;
          colorName.textContent = 'Digital Lavender';
        } else if (color.classList.contains('jet-black')) {
          mainImg.src = jetBlackSrc;
          colorName.textContent = 'Tanzanite (Matt-Gloss)';
        } else if (color.classList.contains('royal-amethyst')) {
          mainImg.src = royalAmethystSrc;
          colorName.textContent = 'Sunset Carbon View (Matt)';
        } else if (color.classList.contains('ivory-white')) {
          mainImg.src = ivorySrc;
          colorName.textContent = 'Ivory White';
        } else if (color.classList.contains('escape-green')) {
          mainImg.src = escapeGreenSrc;
          colorName.textContent = 'Escape Green';
        }

        // wait for the new image to load before fading in
        mainImg.onload = () => {
          mainImg.style.opacity = 1;
        };
      }, 300); // matches your CSS transition duration
    });
  });

  // handle thumbnail clicks
  imagesSource.forEach(scrollImg => {
    scrollImg.style.cursor = 'pointer';

    scrollImg.addEventListener('click', () => {
      // fade out
      mainImg.style.opacity = 0;
      colorName.textContent = ("");

      setTimeout(() => {
        const tempSrc = mainImg.src;
        const tempAlt = mainImg.alt;
        mainImg.src = scrollImg.src;
        mainImg.alt = scrollImg.alt;
        scrollImg.src = tempSrc;
        scrollImg.alt = tempAlt;

        // update active dot if this thumbnail has a matching ID
        colorDots.forEach(dot => {
          dot.classList.remove('active');
          if (scrollImg.id && dot. classList.contains(scrollImg.id)) {
            dot.classList.add('active');
          }
        });

        mainImg.onload = () => {
          mainImg.style.opacity = 1;
        };
      }, 300);
    });
  });
}*/





function selectImageFromThumbnails() {
  const mainImg = document.querySelector('.main-product-img');
  const thumbnails = document.querySelectorAll('.bike-images-cont img');
  const colorName = document.querySelector('.color-name');

  thumbnails.forEach(thumb => {
    thumb.style.cursor = 'pointer';

    thumb.addEventListener('click', () => {
      // fade out
      mainImg.style.opacity = 0;

      setTimeout(() => {
        // update main image directly from thumbnail
        mainImg.src = thumb.src;
        mainImg.alt = thumb.alt;

        // optional: show a name from alt or id
        if (colorName) {
          colorName.textContent = thumb.alt || thumb.id || "";
        }

        // fade back in once loaded
        mainImg.onload = () => {
          mainImg.style.opacity = 1;
        };
      }, 300); // match your CSS transition duration
    });
  });
}






// Toggle mobile menu and overlay 

function toggleMobileMenu() {
    const menu = document.querySelector('.mobile-menu');
    const overlay = document.querySelector('.mobile-overlay');
    const hamburgerIcon = document.querySelector('.icon-hamburger');
    const closeIcon = document.querySelector('.icon-close');
    const body = document.body;

    // toggle menu + overlay
    menu.classList.toggle('active');
    overlay.classList.toggle('active');
    body.classList.toggle('lock-scroll'); // lock/unlock scroll

    // toggle icons
    if (menu.classList.contains('active')) {
        hamburgerIcon.style.display = 'none';
        closeIcon.style.display = 'block';
    } else {
        hamburgerIcon.style.display = 'block';
        closeIcon.style.display = 'none';
    }
}

// attach click listener to hamburger button
document.querySelector('.hamburger-btn').addEventListener('click', toggleMobileMenu);

// attach click listener to overlay (closes menu when background is clicked)
document.querySelector('.mobile-overlay').addEventListener('click', toggleMobileMenu);





// Toggle bike size units
// Get both unit options
const unitOptions = document.querySelectorAll('.toggle-measurement-unit .unit-option');
const sizeRanges = document.querySelectorAll('.size-range');

unitOptions.forEach(option => {
    option.addEventListener('click', () => {
        // Remove active from both
        unitOptions.forEach(currentItem => currentItem.classList.remove('active'));
        // Add active to clicked one
        option.classList.add('active');

        // Update all size ranges based on selected unit
        const unit = option.dataset.unit;
        sizeRanges.forEach(range => {
            if (unit === 'cm') {
                range.textContent = range.dataset.cm + ' cm';
            } else {
                range.textContent = range.dataset.feet;
            }
        });
    });
});





// make selected frame size box active
const sizeBoxes = document.querySelectorAll('.size-box');

sizeBoxes.forEach(currentItem => {
    currentItem.addEventListener('click', () => {
        // remove active from all boxes
        sizeBoxes.forEach(sizeBox => sizeBox.classList.remove('active'));
        // add active to clicked size box
        currentItem.classList.add('active');
    });
});





// increment / decrement quantity

document.addEventListener('DOMContentLoaded', () => {
  // quantity increment/decrement
  document.querySelectorAll('.quantity-box').forEach(box => {
    const input = box.querySelector('.quantity');
    const increment = box.querySelector('.increment');
    const decrement = box.querySelector('.decrement');

    increment.addEventListener('click', () => {
      input.value = parseInt(input.value, 10) + 1;
    });

    decrement.addEventListener('click', () => {
      input.value = Math.max(parseInt(input.value, 10) - 1, parseInt(input.min, 10));
    });
  });

  // make selected size box active
  const sizeBoxes = document.querySelectorAll('.size-box');
  sizeBoxes.forEach(currentItem => {
    currentItem.addEventListener('click', () => {
      sizeBoxes.forEach(sizeBox => sizeBox.classList.remove('active'));
      currentItem.classList.add('active');
    });
  });

  // open sizing-menu
  const sizingGuide = document.querySelector('.sizing-guide');
  const sizingMenu = document.querySelector('.sizing-menu');
  const arrows = sizingGuide.querySelectorAll('svg');
  const arrowDown = arrows[0]; // first SVG
  const arrowUp = arrows[1];   // second SVG

  sizingGuide.addEventListener('click', () => {
    const isOpen = sizingMenu.classList.toggle('open');

    if (isOpen) {
      arrowDown.style.display = 'none';
      arrowUp.style.display = 'inline';
    } else {
      arrowDown.style.display = 'inline';
      arrowUp.style.display = 'none';
    }
  });
});



// thumbs-up on like button click
const likeBtn = document.getElementById("like");

// store original HTML to restore later
const originalHTML = likeBtn.innerHTML;

likeBtn.addEventListener("click", () => {
  likeBtn.classList.toggle("active");

  if (likeBtn.classList.contains("active")) {
    for (let i = 0; i < 5; i++) {
      createHeart();
  }
    likeBtn.innerHTML = `Liked!`;
  } else {
    likeBtn.innerHTML = originalHTML;
  } 
});

function createHeart() {
  const like = document.createElement("div");
  like.classList.add("likes");
  like.textContent = "👍";

  // Random size
  const size = Math.random() * 30 + 15; // 15px–45px
  like.style.fontSize = size + "px";

  // Random color
  const colors = ["#782c64", "#e18b76", "#a4a2a2", "#52190b", "#F5B27A"];
  like.style.color = colors[Math.floor(Math.random() * colors.length)];

 // get button position 
  const rect = likeBtn.getBoundingClientRect();

  // random X across 80% button width
  const spread = rect.width * 0.6;
  const x = rect.left + (rect.width - spread) / 2 + Math.random() * spread;
  const y = rect.top + rect.height / 2; // position to start throwing hearts
  
  // place heart at button center 
  like.style.left = x + "px"; 
  like.style.top = y + "px";

  // random sideways drift
  const drift = (Math.random() - 0.5) * 100 + "px"; // -50px to +50px 
  like.style.setProperty("--drift", drift);

  document.body.appendChild(like);

  // Remove after animation
  setTimeout(() => {
    heart.remove();
  }, 2500);
}




// make div scrollbar behave like a webkit scrollbar

function initMainContScrollbar() {
  const container = document.querySelector(".bike-images-cont");
  const fill = document.querySelector(".scrollbar-fill");

  function updateScrollbar() {
    const visible = container.clientWidth; // part of the container that's visible
    const total = container.scrollWidth;  // entire container width

    if (total <= visible) {
    fill.style.width = "0%"; // hide thumb if no scrolling needed
    return;
  }

    // thumb width = visible portion of the container
    const thumbwidth = (visible / total) * 100;

    // thumb position = scroll progress
    const scrollProgress = (container.scrollLeft / (total - visible)) * 100;   // calculates how much you've scrolled as a percentage of total width

    fill.style.width = thumbwidth + "%";
    fill.style.transform = `translateX(${scrollProgress}%)`; // moves the thumb alonth the track to match scroll position
  }

  container.addEventListener("scroll", updateScrollbar);
  window.addEventListener("resize", updateScrollbar); // recalculate on resize

  updateScrollbar(); // initialize on page load
}





