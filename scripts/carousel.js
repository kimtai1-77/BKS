// ========================================
// CAROUSEL FUNCTIONALITY (supports multiple carousels)
// ========================================

document.querySelectorAll('.carousel').forEach((carousel) => {
  const carouselItems = carousel.querySelector('.carousel-items');
  const leftArrow = carousel.querySelector('.carousel-arrow-left');
  const rightArrow = carousel.querySelector('.carousel-arrow-right');
  const scrollBar = carousel.querySelector('.carousel-scrollbar-fill');

  if (!carouselItems) return; // nothing to do

  // Calculate scroll amount based on first card width + gap
  function getScrollAmount() {
    const firstCard = carouselItems.querySelector('.card');
    if (!firstCard) return 300;
    const cardWidth = firstCard.offsetWidth;
    const gap = window.getComputedStyle(carouselItems).gap;
    const gapValue = parseFloat(gap) || 0;
    return cardWidth + gapValue;
  }

  // Update scroll bar (if present)
  function updateScrollBar() {
    if (!scrollBar) return;
    const totalScroll = carouselItems.scrollWidth - carouselItems.clientWidth;
    if (totalScroll <= 0) {
      scrollBar.style.width = '0%';
      return;
    }
    const currentScroll = carouselItems.scrollLeft;
    const scrollPercentage = (currentScroll / totalScroll) * 100;
    scrollBar.style.width = Math.min(100, Math.max(0, scrollPercentage)) + '%';
  }

  function scrollRight() {
    const scrollAmount = getScrollAmount();
    carouselItems.scrollBy({ left: scrollAmount, behavior: 'smooth' });
  }

  function scrollLeft() {
    const scrollAmount = getScrollAmount();
    carouselItems.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
  }

  // Attach arrow events if arrows exist
  if (leftArrow) leftArrow.addEventListener('click', scrollLeft);
  if (rightArrow) rightArrow.addEventListener('click', scrollRight);

  // Update on manual scroll
  carouselItems.addEventListener('scroll', updateScrollBar);

  // Touch & swipe
  let touchStartX = 0;
  function handleTouchStart(event) {
    touchStartX = event.changedTouches[0].clientX;
  }
  function handleTouchEnd(event) {
    const touchEndX = event.changedTouches[0].clientX;
    const swipeDistance = touchStartX - touchEndX;
    const minSwipeDistance = 50;
    if (swipeDistance > minSwipeDistance) {
      scrollRight();
    } else if (swipeDistance < -minSwipeDistance) {
      scrollLeft();
    }
  }
  carouselItems.addEventListener('touchstart', handleTouchStart, false);
  carouselItems.addEventListener('touchend', handleTouchEnd, false);

  // Initialize visual state
  updateScrollBar();
});


