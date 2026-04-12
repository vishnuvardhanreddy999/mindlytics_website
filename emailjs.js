// ============================================================
//  MindLytics — EmailJS Integration
//  File: emailjs.js  (keep this in the same folder as index.html)
//
//  SETUP STEPS:
//  1. Go to https://www.emailjs.com and create a free account
//  2. Add an Email Service (Gmail recommended) → copy the Service ID
//  3. Create an Email Template → copy the Template ID
//     In the template body use these variables:
//       {{from_name}}   — sender's full name
//       {{from_email}}  — sender's email
//       {{company}}     — sender's company
//       {{service}}     — selected service
//       {{message}}     — their message
//  4. Go to Account → API Keys → copy your Public Key
//  5. Replace the three placeholder values below with your real ones
// ============================================================

var EMAILJS_PUBLIC_KEY  = "MQQickSrryie1zmGO";   // e.g. "abc123XYZdef"
var EMAILJS_SERVICE_ID  = "service_vvwrr1s";   // e.g. "service_xxxxxx"
var EMAILJS_TEMPLATE_ID = "template_o9liptc";  // e.g. "template_xxxxxx"

// Initialise EmailJS with your public key
(function () {
  emailjs.init({ publicKey: EMAILJS_PUBLIC_KEY });
})();

// Called when the user clicks "Send Message"
function sendEmail() {
  var firstName = document.getElementById("ml-firstname").value.trim();
  var lastName  = document.getElementById("ml-lastname").value.trim();
  var email     = document.getElementById("ml-email").value.trim();
  var company   = document.getElementById("ml-company").value.trim();
  var service   = document.getElementById("ml-service").value;
  var message   = document.getElementById("ml-message").value.trim();
  var statusEl  = document.getElementById("ml-status");
  var submitBtn = document.querySelector(".f-submit");

  // ── Basic validation ──────────────────────────────────────
  if (!firstName || !email || !message) {
    statusEl.style.color = "#c0392b";
    statusEl.textContent = "Please fill in your name, email, and message.";
    return;
  }
  var emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailPattern.test(email)) {
    statusEl.style.color = "#c0392b";
    statusEl.textContent = "Please enter a valid email address.";
    return;
  }

  // ── Loading state ─────────────────────────────────────────
  submitBtn.disabled = true;
  submitBtn.textContent = "Sending…";
  statusEl.style.color = "#4A5A7A";
  statusEl.textContent = "Sending your message, please wait…";

  // ── Build template params ─────────────────────────────────
  var templateParams = {
    from_name:  firstName + " " + lastName,
    from_email: email,
    company:    company || "Not provided",
    service:    service || "Not specified",
    message:    message
  };

  // ── Send via EmailJS ──────────────────────────────────────
  emailjs
    .send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, templateParams)
    .then(function () {
      // Success
      statusEl.style.color = "#1B4FD8";
      statusEl.textContent = "✓ Message sent! We'll be in touch within 24 hours.";
      submitBtn.textContent = "Send Message →";
      submitBtn.disabled = false;

      // Clear form
      document.getElementById("ml-firstname").value = "";
      document.getElementById("ml-lastname").value  = "";
      document.getElementById("ml-email").value     = "";
      document.getElementById("ml-company").value   = "";
      document.getElementById("ml-service").value   = "";
      document.getElementById("ml-message").value   = "";
    })
    .catch(function (error) {
      // Failure
      console.error("EmailJS error:", error);
      statusEl.style.color = "#c0392b";
      statusEl.textContent = "Something went wrong. Please email us directly at hello@mindlytics.io";
      submitBtn.textContent = "Send Message →";
      submitBtn.disabled = false;
    });
}
