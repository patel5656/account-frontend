# Business Rules & Validation Guidelines

This document outlines the core business logic, algebraic calculations, tax compliance rules, storage constraints, and access control guidelines implemented in the **Os Books** system.

---

## 1. Pricing & Discount Calculation Engine

All transactional records (Sales Invoices, Purchase Bills, POS receipts, Quotations) must compute line-item totals and global summaries according to the following mathematical specifications.

### 1.1 Line-Item Calculations
*   **Base Amount ($A_{\text{base}}$)**: Calculated by multiplying the quantity by the price:
    $$A_{\text{base}} = \text{Quantity} \times \text{Price}$$
    *   *Note*: Free Quantity does not contribute to the Base Amount but does affect inventory count deductions.

*   **Discount 1 Application ($A_{\text{after D1}}$)**: Applied directly to the Base Amount.
    *   If Discount 1 Type is `%`:
        $$A_{\text{after D1}} = A_{\text{base}} \times \left(1 - \frac{\text{Discount 1}}{100}\right)$$
    *   If Discount 1 Type is Flat Value (Currency Symbol):
        $$A_{\text{after D1}} = \max(0, A_{\text{base}} - \text{Discount 1})$$

*   **Discount 2 Application ($A_{\text{after D2}}$)**: Calculated sequentially on the remaining balance after Discount 1 has been subtracted.
    *   If Discount 2 Type is `%`:
        $$A_{\text{after D2}} = A_{\text{after D1}} \times \left(1 - \frac{\text{Discount 2}}{100}\right)$$
    *   If Discount 2 Type is Flat Value (Currency Symbol):
        $$A_{\text{after D2}} = \max(0, A_{\text{after D1}} - \text{Discount 2})$$

*   **Final Line Amount ($A_{\text{line}}$)**:
    $$A_{\text{line}} = A_{\text{after D2}}$$

---

### 1.2 Invoice Summary Calculations
*   **Total Discount Value ($D_{\text{total}}$)**: Sum of all calculated row-level discounts plus any manual invoice-level discount override:
    $$D_{\text{total}} = \sum (A_{\text{base}} - A_{\text{line}}) + \text{Manual Discount Amount}$$
*   **Freight Tax Allocation ($F_{\text{total}}$)**: Freight charges are computed with tax adjustments:
    $$F_{\text{total}} = \text{Freight Charges} \times \left(1 + \frac{\text{Freight GST \%}}{100}\right)$$
*   **Final Calculated Invoice Total ($A_{\text{final}}$)**:
    $$A_{\text{final}} = \max\left(0, \sum A_{\text{base}} - D_{\text{total}}\right) + F_{\text{total}}$$

---

## 2. GST Compliance & HSN Rules

*   **GSTIN RegEx Validation**:
    A registered firm's GSTIN must match the standard 15-character Indian GSTIN format:
    `^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$`
    *   *Rule*: If the GSTIN fails this format check, print settings and invoice saves should raise a warning flag but allow saving for offline flexibility.
*   **State-Code Mapping**:
    The first two digits of the GSTIN (state code) must match the business's selected state during registration to prevent tax routing errors.
*   **HSN Code Length**:
    *   Services must have a minimum 6-digit HSN code.
    *   Goods must have a minimum 4-to-8-digit HSN code to ensure GSTR reporting classification is valid.

---

## 3. Storage & Inventory Constraints

*   **SKU Code Uniqueness**:
    Duplicate SKUs are blocked when creating new catalog items. The system must verify that:
    $$\text{SKU}_{\text{new}} \notin \text{Catalog}_{\text{existing}}$$
*   **Warehouse Stock Thresholds**:
    *   Negative stock levels are allowed (to prevent sales workflow blocks during delayed purchase entry), but they must trigger a red warning badge.
    *   Stock levels between `0` and `10` are classified as **Low Stock** and must trigger the `AlertCircle` warning indicator on inventory screens.
*   **Ledger Balance Limits**:
    *   Ledger bank accounts cannot be deleted if their active balance is non-zero ($\text{Balance} \neq 0$). Users must first run a correction balance adjustment or merge the account to clear the balance.

---

## 4. User Access Matrix

| Feature Area | Admin User | Employee / Cashier |
| :--- | :---: | :---: |
| POS Checkout & Print | Allowed | Allowed |
| Invoice / Returns Creation | Allowed | Allowed |
| Customer Master Add | Allowed | Allowed |
| Bank Account Merge / Balance Edit | Allowed | Blocked |
| View Financial Year Reports (P&L, Balance Sheet) | Allowed | Blocked |
| System Print Margins Alteration | Allowed | Blocked |
| Recycle Bin Entry Recovery | Allowed | Blocked |
| System Audit Logs View | Allowed | Blocked |
