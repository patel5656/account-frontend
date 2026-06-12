# Project Context & Developer Reference

This document provides system-level context, business background, runtime assumptions, and onboarding guidelines for developers working on the **Os Books** codebase.

---

## 1. Core Background & Domain Context

**Os Books** operates in the SMB (Small & Medium Business) billing and accounting domain. Understanding the following business domain definitions is essential when interacting with the codebase:

*   **Offline-First & Zero-Server Dependency**: The system is designed to run locally in settings with poor internet connectivity (such as wholesale warehouses or rural retail outlets). The browser acts as the database engine, utilizing `localStorage` and `sessionStorage`.
*   **Double-Entry Bookkeeping Principles**: Every transaction modifies a ledger balance. Adjusting item quantities sold reduces product stock while simultaneously modifying party ledgers and updating active cash/bank books.
*   **Dual Discount Structure (D1 and D2)**: Retail accounting uses compound discount rows. Rather than applying a single combined percentage (which alters tax outputs), the system runs Discount 1, updates the taxable balance, and then applies Discount 2 sequentially to calculate final tax parameters.

---

## 2. Global Contexts & Providers Context

The runtime application is wrapped in three context providers defined inside [App.jsx](file:///c:/Users/divya/Downloads/account%20frontend%2004/src/App.jsx):

1.  **`SettingsProvider` (`src/context/SettingsContext.jsx`)**:
    *   *Usage*: Provides active formatting hooks, currency symbols, and display toggles.
    *   *Key properties*: `showPurchaseOrder`, `showSalesOrder`, `showCustomerChallan`, `showCustomerInvoice`. These flags dynamically add or remove submenus in [Sidebar.jsx](file:///c:/Users/divya/Downloads/account%20frontend%2004/src/components/Sidebar.jsx).
2.  **`AuditLogProvider` (`src/context/AuditLogContext.jsx`)**:
    *   *Usage*: Exposes `addLog` to records pages.
    *   *Mechanism*: Serializes transaction payloads and appends logs to `auditLogs` in local storage for administrative transparency.
3.  **React Router Context (`BrowserRouter`)**:
    *   *Usage*: Manages navigation, handles page parameters (e.g. `items_quantity_report/:id`), and coordinates layouts.

---

## 3. Core Interface & UI Design System

*   **Responsive Layout Controls**: Screen bounds are handled inside [DashboardLayout.jsx](file:///c:/Users/divya/Downloads/account%20frontend%2004/src/layouts/DashboardLayout.jsx). On mobile, the sidebar collapses and is toggled via the TopNavbar header button.
*   **Color Theme Conventions**:
    *   **Indigo (`#4F46E5`)**: Primary actions, panel headers, and select indicators.
    *   **Green (`#28a745`)**: Success alerts, save operations, and credit calculations.
    *   **Red (`#dc3545`)**: Exits, deletes, cancel indicators, and outstanding balances.
    *   **Yellow (`#ffc107`)**: Exports, conversions, and warning cards.
*   **Input Mechanics**: Datalist text inputs are used in invoice rows to allow rapid tab-key navigation, autofill, and item selection.

---

## 4. Key Developer Onboarding Steps

### 4.1 Running the Application Locally
1.  Ensure Node.js is installed.
2.  Run `npm install` to resolve dependencies defined in `package.json`.
3.  Launch the Vite local dev server:
    ```bash
    npm run dev
    ```
4.  Open the local browser link (typically `http://localhost:5173`).

### 4.2 Adding a New Route/Screen
If a new administrative screen is required:
1.  Add the React JSX component within `src/pages/`.
2.  Import the component in [App.jsx](file:///c:/Users/divya/Downloads/account%20frontend%2004/src/App.jsx).
3.  Define the path and route mapping inside the `<Routes>` block in [App.jsx](file:///c:/Users/divya/Downloads/account%20frontend%2004/src/App.jsx).
4.  Add the path reference and Lucide icon configuration within the menu items array in [Sidebar.jsx](file:///c:/Users/divya/Downloads/account%20frontend%2004/src/components/Sidebar.jsx).
