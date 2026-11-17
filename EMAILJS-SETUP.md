# EmailJS setup — Cakes Ami

The website sends orders and enquiries by email through **EmailJS** (free plan: 200 emails/month).
No server needed. Until it's set up, the site opens the visitor's email app instead.

## 1. Create the account & connect Gmail
1. Sign up at https://www.emailjs.com (use the business Gmail).
2. **Email Services → Add New Service → Gmail** → connect the account → copy the **Service ID**.
3. **Account → General** → copy the **Public Key**.
4. **Account → Security** → add the website domain (e.g. `cakesami.ca`) and `localhost` to the allowed list.

## 2. Create the templates
In **Email Templates → Create New Template**, make the templates below.
Copy each **Template ID** (e.g. `template_x1y2z3`).

---

### Template A — New order (to the owner)  → `templates.order`
- **To Email:** `{{business_email}}`
- **Reply To:** `{{reply_to}}`
- **Subject:** `New cake order {{order_id}} — {{customer_name}}`
- **Content:**
```
New order: {{order_id}}

Customer: {{customer_name}}
Phone:    {{customer_phone}}
Email:    {{customer_email}}

Pickup:   {{pickup_date}}, {{pickup_time}}

Items:
{{items}}

Total:       {{total}}
Payment:     {{payment}}
Amount due:  {{amount_due}}  (balance at pickup: {{balance}})

Notes: {{notes}}
```

### Template B — Order confirmation (to the customer, optional)  → `templates.orderCustomer`
- **To Email:** `{{customer_email}}`
- **Reply To:** `{{business_email}}`
- **Subject:** `Your Cakes Ami order {{order_id}}`
- **Content:**
```
Hi {{customer_name}},

Thank you for your order! Here are your details.

Order number: {{order_id}}
Pickup: {{pickup_date}}, {{pickup_time}}

{{items}}

Total: {{total}}

To reserve your date, please send {{amount_due}} by Interac e-Transfer to
{{etransfer_email}} with the message: {{order_id}}

Questions? Call or text {{business_phone}}.

Baked with love, served with joy,
Cakes Ami
```

### Template C — Contact / custom cake enquiry (to the owner)  → `templates.contact`
- **To Email:** `{{business_email}}`
- **Reply To:** `{{reply_to}}`
- **Subject:** `Cake enquiry from {{from_name}} ({{occasion}})`
- **Content:**
```
Name:        {{from_name}}
Email:       {{reply_to}}
Phone:       {{phone}}
Occasion:    {{occasion}}
Date needed: {{date_needed}}
Guests:      {{guests}}

{{enquiry}}
```

### Template D — Newsletter sign-up (to the owner, optional)  → `templates.newsletter`
- **To Email:** `{{business_email}}`
- **Subject:** `New newsletter subscriber`
- **Content:** `{{subscriber_email}} joined the Cakes Ami mailing list.`

## 3. Paste the IDs into the site
Open `assets/js/config.js` and fill in:
```js
emailjs: {
  publicKey: "YOUR_PUBLIC_KEY",
  serviceId: "service_xxxxxx",
  templates: {
    order: "template_xxxxxx",
    orderCustomer: "template_xxxxxx",   // or "" to skip
    contact: "template_xxxxxx",
    newsletter: ""                      // or a template ID
  }
}
```

Every template can also use `{{message}}` (all fields as plain text) and `{{subject}}`.
