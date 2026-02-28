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
    alert('Seller contact not available for this product.');
    return;
  }

  // Store the productId in sessionStorage for retrieval on confirmation page
  sessionStorage.setItem('currentProductId', productId);

  // Open seller-message.html in current window
  window.location.href = '../pages/seller-message.html';
}

/**
 * sendMessagePreview - Validates form and navigates to confirmation page
 * Called from seller-message.html
 */
function sendMessagePreview() {
  const customerNumberInput = document.getElementById('customer-number');
  const messageInput = document.getElementById('message-input');

  // Validate inputs
  if (!customerNumberInput.value.trim()) {
    alert('Please enter your phone number');
    return;
  }

  if (!messageInput.value.trim()) {
    alert('Please enter your message');
    return;
  }

  // Store data in sessionStorage (secret variables)
  sessionStorage.setItem('customerNumber', customerNumberInput.value);
  sessionStorage.setItem('customerMessage', messageInput.value);

  // Navigate to confirmation page
  window.location.href = 'confirmation.html';
}

/**
 * loadConfirmationPreview - Populates confirmation page with editable input fields
 * Called from confirmation.html
 */
function loadConfirmationPreview() {
  const customerNumber = sessionStorage.getItem('customerNumber');
  const customerMessage = sessionStorage.getItem('customerMessage');
  const productId = sessionStorage.getItem('currentProductId');

  if (!customerNumber || !customerMessage || !productId) {
    alert('Session expired. Please try again.');
    window.location.href = 'seller-message.html';
    return;
  }

  // Populate the editable input fields
  document.getElementById('editable-number').value = customerNumber;
  document.getElementById('editable-message').value = customerMessage;
}

/**
 * sendToWhatsApp - Opens WhatsApp with message only
 * Called from confirmation.html
 */
function sendToWhatsApp() {
  const productId = sessionStorage.getItem('currentProductId');
  // Get updated values from editable fields
  const customerNumber = document.getElementById('editable-number').value;
  const customerMessage = document.getElementById('editable-message').value;

  // Validate that fields are not empty
  if (!customerNumber.trim()) {
    alert('Please enter your phone number');
    return;
  }

  if (!customerMessage.trim()) {
    alert('Please enter your message');
    return;
  }

  // Fetch seller number from productStore
  if (!productStore[productId] || !productStore[productId].sellerNumber) {
    alert('Seller contact not available.');
    return;
  }

  const sellerNumber = productStore[productId].sellerNumber;
  
  // Send only the message text (no customer number prefix)
  const encodedMessage = encodeURIComponent(customerMessage);
  
  // WhatsApp Click-to-Chat URL format
  const whatsappUrl = `https://wa.me/${sellerNumber}?text=${encodedMessage}`;

  // Clear sessionStorage after sending
  sessionStorage.removeItem('customerNumber');
  sessionStorage.removeItem('customerMessage');
  sessionStorage.removeItem('currentProductId');

  // Open WhatsApp
  window.open(whatsappUrl, '_blank');
}

/**
 * Attach contactSeller to all .contact-seller buttons
 */
document.addEventListener('DOMContentLoaded', function() {
  const contactButtons = document.querySelectorAll('.contact-seller');
  contactButtons.forEach(button => {
    button.addEventListener('click', contactSeller);
  });
});
