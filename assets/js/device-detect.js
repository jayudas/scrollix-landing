/**
 * Device Detection & Dynamic CTA Updates
 * Updates CTA button text and subtext based on device type
 */

// Detect mobile device
function isMobileDevice() {
  return /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
}

// Update all CTAs based on device
function updateCTAs() {
  const ctaButtons = document.querySelectorAll('.cta-button');
  const ctaSubtext = document.querySelectorAll('.cta-subtext');

  const price = '$33';

  if (isMobileDevice()) {
    // Mobile CTAs - user is on mobile, tell them it's for desktop
    ctaButtons.forEach(btn => {
      btn.textContent = `Buy Scrollix for Desktop — ${price}`;
    });
    ctaSubtext.forEach(text => {
      text.textContent = '14-day money-back guarantee • Get instant access • Windows & macOS';
    });
  } else {
    // Desktop CTAs - user is already on desktop
    ctaButtons.forEach(btn => {
      btn.textContent = `Buy Scrollix — ${price}`;
    });
    ctaSubtext.forEach(text => {
      text.textContent = '14-day money-back guarantee • Get instant access • Windows & macOS';
    });
  }
}

// Run on page load
document.addEventListener('DOMContentLoaded', updateCTAs);
