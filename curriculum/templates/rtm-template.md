# 🔗 Requirement Traceability Matrix (RTM) Template

An **RTM** maps user requirements directly to test cases to guarantee **100% test coverage** and verify that no feature is left untested.

---

## 📊 RTM Column Structure (Google Sheets / Excel)

| Requirement ID | Business Requirement / User Story | Test Scenario ID | Test Case ID(s) | Execution Status | Defect ID (if failed) |
| :--- | :--- | :--- | :--- | :--- | :--- |
| `REQ-AUTH-01` | As a customer, I should be able to log in using my 10-digit mobile number and OTP. | `TS_AUTH_01` | `TC_AUTH_001`<br>`TC_AUTH_002`<br>`TC_AUTH_003` | Pass<br>Pass<br>Fail | `BUG-102` |
| `REQ-AUTH-02` | As a customer, I should receive an OTP within 30 seconds of submitting my number. | `TS_AUTH_02` | `TC_AUTH_004`<br>`TC_AUTH_005` | Pass<br>Pass | N/A |
| `REQ-CART-01` | As a customer, I should be able to add an item to the shopping cart from the product page. | `TS_CART_01` | `TC_CART_001`<br>`TC_CART_002` | Pass<br>Pass | N/A |
| `REQ-PAY-01` | As a customer, I should be able to pay via UPI QR code. | `TS_PAY_01` | `TC_PAY_001`<br>`TC_PAY_002` | In Progress | N/A |

---

## 🎯 Value in QA Interviews
- **Forward Traceability**: Verifies that requirements are translated into test cases.
- **Backward (Reverse) Traceability**: Ensures no test cases exist that do not trace back to an authorized requirement (prevents scope creep).
- **Bi-directional Traceability**: Tracks both directions for complete quality governance.
