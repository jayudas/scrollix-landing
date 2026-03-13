/**
 * Scrollix Website - Main JavaScript
 * Handles CTA clicks, Paddle integration, and purchase flow
 */

// ============================================================================
// PHASE 1: Placeholder (No Paddle yet)
// ============================================================================

function handleCTAClick() {
  alert('Scrollix will be available for purchase soon! Check back later.');

  // TODO PHASE 2: Replace with Paddle checkout (see implementation plan)
}

// Attach to all CTA buttons
document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.cta-button').forEach(btn => {
    btn.addEventListener('click', handleCTAClick);
  });
});

// ============================================================================
// PHASE 2: Paddle Checkout Integration (Uncomment when ready)
// ============================================================================

/*
// Load Paddle.js
const paddleScript = document.createElement('script');
paddleScript.src = 'https://cdn.paddle.com/paddle/v2/paddle.js';
paddleScript.async = true;
document.head.appendChild(paddleScript);

// Wait for Paddle to load
paddleScript.onload = () => {
  Paddle.Initialize({
    token: 'PADDLE_CLIENT_TOKEN_HERE', // TODO PHASE 2: Get from Paddle dashboard
    environment: 'production' // or 'sandbox' for testing
  });
};

function handleCTAClick() {
  // Collect customer email
  const email = prompt('Enter your email to receive your serial number after purchase:');

  if (!email) {
    alert('Email is required to receive your Scrollix serial number.');
    return;
  }

  // Email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    alert('Please enter a valid email address.');
    return;
  }

  // Open Paddle checkout
  Paddle.Checkout.open({
    items: [{
      priceId: 'PADDLE_PRICE_ID_HERE', // TODO PHASE 2: Get from Paddle dashboard
      quantity: 1
    }],
    customData: {
      email: email // CRITICAL: This gets passed to webhook as data.custom_data.email
    },
    successCallback: (data) => {
      handlePurchaseSuccess(email);
    },
    closeCallback: () => {
      console.log('Checkout closed');
    }
  });
}

function handlePurchaseSuccess(email) {
  // Show success message
  const message = isMobileDevice()
    ? `Thank you for purchasing Scrollix!\n\nYour serial number and download link have been sent to ${email}.\n\nCheck your inbox (and spam folder) for an email from noreply@scrollix.app.`
    : `Thank you for purchasing Scrollix!\n\nYour serial number has been sent to ${email}.\n\nCheck your inbox (and spam folder) for an email from noreply@scrollix.app.\n\nDownload link: [TODO PHASE 3: Add R2 download URL]`;

  alert(message);

  // TODO PHASE 3: Trigger download for desktop users
  // if (!isMobileDevice()) {
  //   window.location.href = getDownloadUrl();
  // }
}
*/

// ============================================================================
// PHASE 3: Download Links (Uncomment when R2 ready)
// ============================================================================

/*
function getDownloadUrl() {
  // Detect Mac architecture (ARM vs Intel)
  // Note: userAgent doesn't reliably detect ARM, default to ARM (most new Macs)
  const isIntel = /Intel Mac/.test(navigator.userAgent);

  if (isIntel) {
    return 'https://downloads.scrollix.app/mac/Scrollix-1.0.0-x64.dmg';
  } else {
    return 'https://downloads.scrollix.app/mac/Scrollix-1.0.0-arm64.dmg';
  }
}

function handlePurchaseSuccess(email) {
  if (isMobileDevice()) {
    // Mobile: Email only
    alert(`Thank you for purchasing Scrollix!\n\nYour serial number and download link have been sent to ${email}.\n\nCheck your inbox for an email from noreply@scrollix.app.`);
  } else {
    // Desktop: Show download button
    const downloadUrl = getDownloadUrl();

    const message = `Thank you for purchasing Scrollix!\n\nYour serial number has been sent to ${email}.\n\nClick OK to download Scrollix for macOS.`;
    alert(message);

    // Trigger download
    window.location.href = downloadUrl;
  }
}
*/
