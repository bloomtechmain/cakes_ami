/* =========================================================
   CAKES AMI — SITE SETTINGS
   Everything the owner may want to change lives here.
   No backend needed: this is a fully static website.
   ========================================================= */
window.CA_CONFIG = {
  business: {
    name: "Cakes Ami",
    tagline: "Baked with love, served with joy",
    phone: "604-250-9441",
    email: "glaperera2@gmail.com",
    area: "Greater Vancouver, BC",          // shown in the footer / contact page
    pickupNote: "Pickup only — exact pickup address is shared once your order is confirmed.",
    hours: "Orders by appointment · Mon–Sun",
    instagram: "https://www.instagram.com/ami_cakes_ca/",
    instagramHandle: "@ami_cakes_ca",
    facebook: "https://www.facebook.com/profile.php?id=61550721065017",
    whatsapp: "16042509441"                 // digits only, used for the WhatsApp button. Leave "" to hide.
  },

  currency: "CAD",
  leadTimeDays: 3,       // earliest pickup date offered at checkout = today + this many days

  /* ---------- Payments (Interac e-Transfer) ---------- */
  etransfer: {
    email: "glaperera2@gmail.com",
    depositPercent: 50
  },

  /* ---------- EmailJS (recommended) ----------
     Paste your IDs from https://dashboard.emailjs.com — see EMAILJS-SETUP.md for the templates.
     When publicKey + serviceId + a template are filled in, that form sends through EmailJS. */
  emailjs: {
    publicKey: "",          // Account → General → Public Key
    serviceId: "",          // Email Services → Service ID   (e.g. "service_abc123")
    templates: {
      order: "",            // new order → sent to the owner                   (e.g. "template_order")
      orderCustomer: "",    // OPTIONAL order confirmation → sent to customer
      contact: "",          // contact / custom-cake enquiry → owner
      newsletter: ""        // OPTIONAL newsletter sign-up → owner
    }
  },

  /* ---------- Forms fallback (optional) ----------
     Static sites can't send email on their own. Two ways to receive orders & messages:
     1) Leave formEndpoint "" → the visitor's email app opens with the order pre-filled (works everywhere).
     2) Create a free form at https://formspree.io and paste its URL here, e.g.
        "https://formspree.io/f/abcdwxyz" → orders arrive in the owner's inbox automatically. */
  formEndpoint: "",

  /* ---------- Gallery: Google Drive ----------
     1) Put photos in a Google Drive folder → Share → "Anyone with the link" → Viewer.
     2) Copy the folder ID from its URL: drive.google.com/drive/folders/<THIS_PART>
     3) Create an API key at console.cloud.google.com (enable "Google Drive API"),
        restrict it to your website domain.
     Until both are filled in, the gallery shows the photos stored in /assets/img/cakes. */
  googleDrive: {
    apiKey: "AIzaSyD-LedwYxekX4-zkloB76VxUb2EbxRLNfw",
    folderId: "1G-AzH1ik3IUYQ3eIWIGcMc3xwOdtzdXy"
  },

  /* ---------- Order tracking: Google Sheet ----------
     1) Make a Google Sheet with columns:  Order ID | Status | Pickup Date | Note
        Status must be one of: Received, Confirmed, Baking, Ready, Completed
     2) File → Share → Publish to web → choose the sheet → "Comma-separated values (.csv)" → Publish.
     3) Paste the published CSV link below.
     Until it is set, tracking shows orders placed from the customer's own device. */
  trackingSheetCsv: ""
};
