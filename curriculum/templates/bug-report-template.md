# 🐞 Production Bug Report (Defect) Template

Use this format when logging bugs into Jira or GitHub Issues. High-quality bug reports save developer time and prevent rejected defects.

---

## 📝 Defect Ticket Schema

```markdown
**Summary / Title**: [Short, descriptive summary: <Component> - <Action> - <Failed behavior>]
Example: [Checkout] - [Promo Code] - Applying valid coupon 'DISCOUNT20' throws HTTP 500 error

**Issue Type**: Bug
**Severity**: [Blocker / Critical / Major / Minor / Trivial]
**Priority**: [P1 - High / P2 - Medium / P3 - Low]
**Component / Module**: [e.g. Payments, Authentication, Cart]
**Environment Details**:
- OS: Windows 11 (23H2)
- Browser: Google Chrome Version 128.0.6613.120 (64-bit)
- URL / Build: https://staging.app.example.com/checkout (Build v2.4.1)
- User Role: Authenticated Customer

---

### 📋 Pre-conditions:
1. User is logged in with valid account credentials.
2. Cart contains at least 1 item with cart total > ₹500.

---

### 🔄 Steps to Reproduce:
1. Navigate to `https://staging.app.example.com/cart`.
2. Click 'Proceed to Checkout'.
3. In the 'Have a coupon code?' field, enter `DISCOUNT20`.
4. Click the 'Apply' button.

---

### 🎯 Expected Result:
A 20% discount should be calculated and deducted from the subtotal. A green success banner "Coupon DISCOUNT20 applied successfully" should appear.

---

### ⚠️ Actual Result:
The UI freezes for 3 seconds, then displays a generic red error message: "Something went wrong. Please try again later." Cart total remains unchanged.

---

### 🔍 Error Logs & Network Details:
- **DevTools Network Tab**: POST to `/api/v1/coupons/apply` returned `500 Internal Server Error`.
- **Console Log**: `Uncaught (in promise) Error: Request failed with status code 500`.

---

### 📸 Attachments:
- Screenshot showing error banner and DevTools Network tab: `[Attach PNG or drag-and-drop image here]`
```
