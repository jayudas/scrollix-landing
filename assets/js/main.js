/**
 * Scrollix Website - Main JavaScript
 * Handles CTA clicks, the Freemius checkout purchase flow,
 * and the "Already purchased?" download buttons.
 */

let checkout = null;

// Load Freemius Checkout SDK
const script = document.createElement('script');
script.src = 'https://checkout.freemius.com/js/v1/';
script.async = true;
document.head.appendChild(script);

script.onload = () => {
  try {
    // Constructed at page load (required for cart-abandonment recovery links)
    checkout = new FS.Checkout({ product_id: '34870' });
    console.log('Freemius checkout initialized');
  } catch (error) {
    console.error('Failed to initialize Freemius checkout:', error);
    alert('Payment system unavailable. Please try again later or contact support@scrollix.app');
  }
};

script.onerror = () => {
  console.error('Failed to load Freemius checkout SDK');
  alert('Payment system failed to load. Please refresh the page or contact support@scrollix.app');
};

function handleCTAClick() {
  if (!checkout) {
    alert('Payment system is still loading. Please try again in a moment.');
    return;
  }
  try {
    checkout.open({
      plan_id: '57318',
      licenses: 1,
      success: () => {
        handlePurchaseSuccess();
      }
    });
  } catch (error) {
    console.error('Failed to open checkout:', error);
    alert('Failed to open checkout. Please try again or contact support@scrollix.app');
  }
}

function handlePurchaseSuccess() {
  const message = 'Thank you for purchasing Scrollix!\n\n'
    + 'Your serial number and activation instructions have been sent to your email.\n\n'
    + 'Check your inbox (and spam folder) for emails from noreply@scrollix.app and from Freemius (our payment provider).';
  alert(message);
}

/**
 * Download buttons — always point to the latest release.
 * Fetches the latest release from the public scrollix-releases repo and
 * rewrites the per-architecture download links to its .dmg assets.
 * If anything fails, the buttons keep their fallback href
 * (the GitHub "latest release" page).
 */
async function initDownloadLinks() {
  const armLink = document.getElementById('download-mac-arm64');
  const x64Link = document.getElementById('download-mac-x64');
  if (!armLink && !x64Link) {
    return; // Page has no download section
  }
  try {
    const response = await fetch(
      'https://api.github.com/repos/scrollixapp/scrollix-releases/releases/latest',
      { headers: { Accept: 'application/vnd.github+json' } }
    );
    if (!response.ok) {
      throw new Error('GitHub API responded with ' + response.status);
    }
    const release = await response.json();
    const assets = release.assets || [];

    const armAsset = assets.find(a => a.name.endsWith('-mac-arm64.dmg'));
    const x64Asset = assets.find(a => a.name.endsWith('-mac-x64.dmg'));

    if (armLink && armAsset) {
      armLink.href = armAsset.browser_download_url;
    }
    if (x64Link && x64Asset) {
      x64Link.href = x64Asset.browser_download_url;
    }

    const versionEl = document.getElementById('download-version');
    if (versionEl && release.tag_name) {
      versionEl.textContent = 'Latest version: ' + release.tag_name;
    }
  } catch (error) {
    // Fallback hrefs (GitHub latest-release page) remain in place
    console.error('Failed to resolve latest release download links:', error);
  }
}

// Attach to all CTA buttons + initialize download links
document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.cta-button').forEach(btn => {
    btn.addEventListener('click', handleCTAClick);
  });
  initDownloadLinks();
});
