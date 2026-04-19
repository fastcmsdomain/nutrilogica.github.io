/**
 * Lead capture form – client-side validation and submission handling.
 * Extend the `submitEmail` function to wire up a real backend/newsletter service.
 */

/* ─── Selectors ───────────────────────────────────────────────────────────── */
const SELECTORS = {
  form:    '#leadForm',
  email:   '#email',
  gdpr:    '#gdpr',
  success: '.lead-form__success',
};

/* ─── Helpers ─────────────────────────────────────────────────────────────── */
const isValidEmail = (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());

/**
 * Sends the email address to a backend endpoint.
 * Replace the URL and body with whatever service you use
 * (Mailchimp, Brevo, a custom API, etc.).
 *
 * @param {string} email
 * @returns {Promise<void>}
 */
const submitEmail = async (email) => {
  /* Placeholder – swap in a real endpoint:
  await fetch('/api/subscribe', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email }),
  });
  */
  console.info('Subscription submitted for:', email);
};

/* ─── Form handler ────────────────────────────────────────────────────────── */
const initLeadForm = () => {
  const form    = document.querySelector(SELECTORS.form);
  const emailEl = document.querySelector(SELECTORS.email);
  const gdprEl  = document.querySelector(SELECTORS.gdpr);

  if (!form || !emailEl || !gdprEl) return;

  form.addEventListener('submit', async (event) => {
    event.preventDefault();

    const emailValue = emailEl.value ?? '';

    /* Validate email */
    if (!isValidEmail(emailValue)) {
      emailEl.focus();
      emailEl.setCustomValidity('Bitte geben Sie eine gültige E-Mail-Adresse ein.');
      emailEl.reportValidity();
      return;
    }

    emailEl.setCustomValidity('');

    /* Validate GDPR consent */
    if (!gdprEl.checked) {
      gdprEl.focus();
      gdprEl.setCustomValidity('Bitte stimmen Sie der Datenschutzerklärung zu.');
      gdprEl.reportValidity();
      return;
    }

    gdprEl.setCustomValidity('');

    try {
      await submitEmail(emailValue.trim());
      form.classList.add('is-submitted');
    } catch (error) {
      console.error('Subscription error:', error);
    }
  });

  /* Clear custom validity on input so browser errors reset naturally */
  emailEl.addEventListener('input', () => emailEl.setCustomValidity(''));
  gdprEl.addEventListener('change', () => gdprEl.setCustomValidity(''));
};

/* ─── Init ────────────────────────────────────────────────────────────────── */
document.addEventListener('DOMContentLoaded', initLeadForm);
