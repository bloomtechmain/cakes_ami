# Track Order page: removed for now (17 Nov 2026)

The customer asked to remove the **Track Order** page for now. It may be needed again later.
When asked to **"add track order page"**, follow the steps below to restore it exactly as it was.

## What was done to remove it
1. The page file was moved (not deleted): `order-tracking.html` → `_parked/order-tracking.html`
2. Links removed in `assets/js/app.js`:
   - Top menu (`NAV` list): removed `["order-tracking.html", "Track Order", "track"]`
   - Footer "Help" column: removed `<li><a href="order-tracking.html">Track order</a></li>`
   - Checkout confirmation: removed the **"Track this order"** button (the "Back home" button became the main button)
   - Order email data: removed `track_link` from the EmailJS `params` in checkout
3. `EMAILJS-SETUP.md`: removed the `Tracking page: {{track_link}}` and `Track your order: {{track_link}}` lines from the email templates
4. **Left in place (harmless, only runs on the tracking page):** the tracking code in `app.js` (the part that reads `C.trackingSheetCsv`) and `trackingSheetCsv` in `assets/js/config.js`

## How to restore it
1. Move the page back: `_parked/order-tracking.html` → `order-tracking.html` (project root)
2. In `assets/js/app.js`:
   - `NAV` list, after Contact:
     ```js
     ["contact.html", "Contact", "contact"], ["order-tracking.html", "Track Order", "track"]
     ```
   - Footer "Help" column, after "Custom order":
     ```html
     <li><a href="contact.html#custom">Custom order</a></li><li><a href="order-tracking.html">Track order</a></li>
     ```
   - Checkout `params`, after `notes`:
     ```js
     etransfer_email: C.etransfer.email, notes: order.notes || "-",
     track_link: location.origin + location.pathname.replace(/[^/]*$/, "") + "order-tracking.html?id=" + id
     ```
   - Confirmation buttons in `renderConfirmation`:
     ```html
     <a class="btn" href="order-tracking.html?id=${encodeURIComponent(o.id)}">Track this order</a>
     <a class="btn ghost" href="index.html">Back home</a>
     ```
3. In `EMAILJS-SETUP.md`, add back `Tracking page: {{track_link}}` (owner template, after Notes) and
   `Track your order: {{track_link}}` (customer template, after the e-Transfer message). Also add them back
   in the real EmailJS dashboard templates if they were removed there.
4. Optional: to show live status, fill in `trackingSheetCsv` in `assets/js/config.js` (instructions are in that file).
