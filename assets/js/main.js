/**
 * Scrollix Website - Main JavaScript
 * Handles CTA clicks, Paddle integration, and purchase flow
 * Phase 2: Paddle Checkout Integration (LIVE - Testing with $1 price)
 */

let paddleInitialized = false;

// Load Paddle.js
const script = document.createElement('script');
script.src = 'https://cdn.paddle.com/paddle/v2/paddle.js';
script.async = true;
document.head.appendChild(script);

// Wait for Paddle to load
script.onload = () => {
  try {
    Paddle.Initialize({
      token: 'live_f38bec1927b616e8022de957f8d',
      eventCallback: (event) => {
        // Log checkout events for debugging
        if (event.name === 'checkout.error') {
          console.error('Paddle checkout error:', event.data);
        }
      }
    });
    paddleInitialized = true;
    console.log('Paddle initialized successfully');
  } catch (error) {
    console.error('Failed to initialize Paddle:', error);
    alert('Payment system unavailable. Please try again later or contact support@scrollix.app');
  }
};

script.onerror = () => {
  console.error('Failed to load Paddle.js');
  alert('Payment system failed to load. Please refresh the page or contact support@scrollix.app');
};

function handleCTAClick() {
  // Check if Paddle loaded
  if (!paddleInitialized) {
    alert('Payment system is still loading. Please try again in a moment.');
    return;
  }

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
  try {
    Paddle.Checkout.open({
      items: [{
        priceId: 'pri_01km1jatz88rf3zechg9cxe4px', // $1 test price
        quantity: 1
      }],
      customData: {
        email: email // CRITICAL: Passed to webhook as data.custom_data.email
      },
      customer: {
        email: email // Pre-fill email in checkout form
      },
      settings: {
        displayMode: 'overlay',
        theme: 'light',
        locale: 'en'
      },
      successCallback: (data) => {
        handlePurchaseSuccess(email);
      },
      closeCallback: () => {
        console.log('Checkout closed by user');
      }
    });
  } catch (error) {
    console.error('Failed to open Paddle checkout:', error);
    alert('Failed to open checkout. Please try again or contact support@scrollix.app');
  }
}

function handlePurchaseSuccess(email) {
  // Unified message (desktop = mobile, both get email with download links)
  const message = `Thank you for purchasing Scrollix!\n\nYour serial number and download links have been sent to ${email}.\n\nCheck your inbox (and spam folder) for an email from noreply@scrollix.app.`;

  alert(message);

  // Note: No auto-download. User gets email with download links for all platforms.
  // This works for both desktop and mobile users (unified flow)
}

// Attach to all CTA buttons
document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.cta-button').forEach(btn => {
    btn.addEventListener('click', handleCTAClick);
  });
});
