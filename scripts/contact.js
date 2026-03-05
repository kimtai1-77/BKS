/**
 * contactInfo - Business contact details for WhatsApp messaging
 */
const contactInfo = {
  phoneNumber: "", // Add phone number (e.g., +254716060708)
  email: "" // Add email address
};

/**
 * openContactPage - Opens contact.html when .contact-us is clicked
 * Handles both regular buttons/links and mobile menu items
 */
function openContactPage(event) {
  event.preventDefault();
  window.location.href = '../pages/contact.html';
}

/**
 * sendContactMessage - Sends message directly to WhatsApp (no confirmation page)
 * Called from contact.html
 */
function sendContactMessage() {
  const messageInput = document.getElementById('contact-message');

  // Validate input
  if (!messageInput.value.trim()) {
    alert('Please enter your message');
    return;
  }

  // Check if phone number is configured
  if (!contactInfo.phoneNumber) {
    alert('Contact information not available. Please try again later.');
    return;
  }

  // Prepare message for WhatsApp
  const message = encodeURIComponent(messageInput.value);
  const phoneNumber = contactInfo.phoneNumber;

  // Open WhatsApp with pre-filled message
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`;
  window.open(whatsappUrl, '_blank');
}

/**
 * Initialize contact-us click handlers for both regular and mobile menu items
 */
document.addEventListener('DOMContentLoaded', () => {
  // Regular contact buttons and links
  document.querySelectorAll('.contact-us').forEach(element => {
    element.addEventListener('click', openContactPage);
  });
});
