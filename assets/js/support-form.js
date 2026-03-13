/**
 * Scrollix Support Form Handler
 * Handles contact form submission to Cloudflare Worker /contact endpoint
 */

document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('contact-form');
  const statusDiv = document.getElementById('form-status');

  if (!form) return;

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    // Get form values
    const email = document.getElementById('email').value.trim();
    const category = document.getElementById('category').value;
    const message = document.getElementById('message').value.trim();

    // Update button state
    const submitButton = form.querySelector('button[type="submit"]');
    const originalText = submitButton.textContent;
    submitButton.disabled = true;
    submitButton.textContent = 'Sending...';

    try {
      const workerUrl = 'https://serial-validator.broken-credit-18d8.workers.dev/contact';

      const response = await fetch(workerUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email,
          category,
          message
        })
      });

      const result = await response.json();

      if (response.ok && result.success) {
        showStatus(
          'success',
          `Thank you! Your support request has been submitted.\n\nTicket Number: ${result.ticketNumber}\n\nWe'll respond to ${email} as soon as possible.`
        );
        form.reset();
      } else {
        showStatus('error', result.error || 'Failed to submit support request. Please try again.');
      }
    } catch (error) {
      showStatus('error', 'Network error. Please check your connection and try again.');
      console.error('Support form error:', error);
    } finally {
      submitButton.disabled = false;
      submitButton.textContent = originalText;
    }
  });

  function showStatus(type, message) {
    statusDiv.textContent = message;
    statusDiv.className = `form-status form-status-${type}`;
    statusDiv.style.display = 'block';
    statusDiv.scrollIntoView({ behavior: 'smooth', block: 'nearest' });

    if (type === 'success') {
      setTimeout(() => {
        statusDiv.style.display = 'none';
      }, 10000);
    }
  }
});
