/**
 * contactSeller - Opens WhatsApp contact flow for product inquiries
 * Flow: seller-message.html -> confirmation.html -> WhatsApp
 */
function contactSeller() {
  // Get the product ID from the data-product attribute
  const productWrapper = document.querySelector('[data-product]');
  const productId = productWrapper ? productWrapper.getAttribute('data-product') : null;

  if (!productId) {
    alert('Product ID not found. Please contact support.');
    return;
  }

  // Check if seller number exists in productStore
  if (!productStore[productId] || !productStore[productId].sellerNumber) {
    alert('Seller contact not available for this product. Please contact support.');
    return;
  }

  // Store the productId in sessionStorage for retrieval on confirmation page
  sessionStorage.setItem('currentProductId', productId);

  // Open seller-message.html in current window
  window.location.href = '../pages/seller-message.html';
}

/**
 * sendDirectMessage - Validates form and sends directly to WhatsApp
 * Called from seller-message.html
 */
function sendDirectMessage() {
  const messageInput = document.getElementById('message-input');
  const productId = sessionStorage.getItem('currentProductId');

  // Validate input
  if (!messageInput.value.trim()) {
    alert('Please enter your message');
    return;
  }

  // Fetch seller number from productStore
  if (!productStore[productId] || !productStore[productId].sellerNumber) {
    alert('Seller contact not available.');
    return;
  }

  const sellerNumber = productStore[productId].sellerNumber;
  const encodedMessage = encodeURIComponent(messageInput.value);

  // WhatsApp Click-to-Chat URL format
  const whatsappUrl = `https://wa.me/${sellerNumber}?text=${encodedMessage}`;

  // Clear sessionStorage after sending
  sessionStorage.removeItem('currentProductId');

  // Open WhatsApp
  window.open(whatsappUrl, '_blank');
}



/**
 * openQuestion - Opens question-page.html when .question is clicked
 * Stores product ID for later use
 */
function openQuestion() {
  // Get the product ID from the data-product attribute
  const productWrapper = document.querySelector('[data-product]');
  const productId = productWrapper ? productWrapper.getAttribute('data-product') : null;

  if (!productId) {
    alert('Product ID not found. Please contact support.');
    return;
  }

  // Check if seller number exists in productStore
  if (!productStore[productId] || !productStore[productId].sellerNumber) {
    alert('Seller contact not available for this product. Please contact support.');
    return;
  }

  // Store the productId in sessionStorage for retrieval on question page
  sessionStorage.setItem('currentProductId', productId);

  // Open question-page.html in current window
  window.location.href = '../pages/question-page.html';
}

/**
 * sendQuestion - Sends question directly to WhatsApp (no confirmation page)
 * Called from question-page.html
 */
function sendQuestion() {
  const questionInput = document.getElementById('question-input');
  const productId = sessionStorage.getItem('currentProductId');

  // Validate input
  if (!questionInput.value.trim()) {
    alert('Please enter your question');
    return;
  }

  // Fetch seller number from productStore
  if (!productStore[productId] || !productStore[productId].sellerNumber) {
    alert('Seller contact not available.');
    return;
  }

  const sellerNumber = productStore[productId].sellerNumber;
  const encodedQuestion = encodeURIComponent(questionInput.value);

  // WhatsApp Click-to-Chat URL format
  const whatsappUrl = `https://wa.me/${sellerNumber}?text=${encodedQuestion}`;

  // Clear sessionStorage after sending
  sessionStorage.removeItem('currentProductId');

  // Open WhatsApp
  window.open(whatsappUrl, '_blank');
}

/**
 * Attach handlers to interactive elements on page load
 */
document.addEventListener('DOMContentLoaded', function() {
  // Attach contactSeller to all .contact-seller buttons
  const contactButtons = document.querySelectorAll('.contact-seller');
  contactButtons.forEach(button => {
    button.addEventListener('click', contactSeller);
  });

  // Attach openQuestion to all .question buttons
  const questionButtons = document.querySelectorAll('.question');
  questionButtons.forEach(button => {
    button.addEventListener('click', openQuestion);
  });
});
