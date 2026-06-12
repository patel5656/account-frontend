# API Specification & Data Integration Interface

This document specifies the Data Access Layer (DAL) interfaces, client storage keys, mock API endpoints (e.g., AI Invoice Parser, WhatsApp integrations), and import/export payloads for the **Os Books** system.

---

## 1. Local Storage Access Interfaces (Internal DAL)

The application uses standard `localStorage` wrapper interfaces for reads, writes, and modifications.

### 1.1 Accounts Registry Manager (`bankDetailsRows`)
*   **Method**: `getBankDetails(): Array<BankObject>`
    *   **Retrieval**: Reads `bankDetailsRows` key. Fallback to default Cash/Other accounts array if empty.
*   **Method**: `saveBankDetail(account: BankObject): void`
    *   **Action**: Appends or updates the target row and writes the JSON string to localStorage.
*   **Method**: `deleteBankDetail(id: number): void`
    *   **Action**: Removes the item matching `id` and re-serializes the array.

### 1.2 Inventory Catalog Manager (`products`)
*   **Method**: `getCatalog(): Array<ProductObject>`
    *   **Retrieval**: Reads `products` key. Returns empty array if not initialized.
*   **Method**: `adjustInventory(productId: number, quantityChange: number): void`
    *   **Action**: Increments or decrements the target product's stock count.

---

## 2. Integration & Sync Endpoints (Mock Specs)

Although the application operates locally, the integration layers (AI Import and Notification Reminders) must implement the following API payloads.

### 2.1 AI Invoice Parsing Service
Used inside [SalesInvoice.jsx](file:///c:/Users/divya/Downloads/account%20frontend%2004/src/pages/SalesInvoice.jsx) through the `ImportInvoiceAIModal` component.

*   **Endpoint**: `/api/v1/ai/parse-invoice`
*   **Method**: `POST`
*   **Content-Type**: `multipart/form-data`
*   **Request Payload**:
    *   `file`: Binary File (PDF / JPEG image of supplier invoice).
*   **Response Payload (`200 OK`)**:
    ```json
    {
      "success": true,
      "invoiceMetadata": {
        "invoiceNumber": "AI-9875",
        "date": "2026-06-05",
        "supplierName": "Global Industries Ltd"
      },
      "parsedItems": [
        {
          "productName": "Wooden Chair",
          "sku": "FUR-WC-001",
          "quantity": 10,
          "freeQuantity": 2,
          "price": 1000.00,
          "disc1": 10.00,
          "disc1Type": "%",
          "disc2": 5.00,
          "disc2Type": "%"
        }
      ]
    }
    ```

---

### 2.2 WhatsApp Billing Notification Service
Initiated from customer summary details grids inside [WhatsAppReminderModal.jsx](file:///c:/Users/divya/Downloads/account%20frontend%2004/src/components/WhatsAppReminderModal.jsx).

*   **Endpoint**: `/api/v1/whatsapp/send-reminder`
*   **Method**: `POST`
*   **Content-Type**: `application/json`
*   **Request Payload**:
    ```json
    {
      "recipientNumber": "+919876543210",
      "templateType": "BILL_OUTSTANDING",
      "templateParameters": {
        "customerName": "John Doe",
        "firmName": "Os Books Retail",
        "outstandingAmount": "15240.00",
        "dueDate": "2026-06-15"
      }
    }
    ```
*   **Response Payload (`200 OK`)**:
    ```json
    {
      "success": true,
      "messageId": "wa_msg_9875462153",
      "status": "SENT"
    }
    ```

---

### 2.3 Local Data Backup Import/Export Format
Configured via [ImportDataModal.jsx](file:///c:/Users/divya/Downloads/account%20frontend%2004/src/components/ImportDataModal.jsx).

#### 2.3.1 CSV Export / Import Column Headers
When exporting catalog items or parsing CSV templates, the data must follow this structure:

```csv
# Column Order Checklist
Index,SKU,ProductName,Brand,Category,Unit,PurchasePrice,SalePrice,Stock,Warehouse,Status
```

*   **Sample CSV Row**:
    ```csv
    1,"FUR-WC-001","Wooden Chair","Brand A","Furniture","PCS",800.00,999.00,45,"Main Warehouse","Active"
    ```

#### 2.3.2 JSON System Export
Encapsulates all client local database keys.

*   **Format**:
    ```json
    {
      "exportDate": "2026-06-05T15:20:50+05:30",
      "firmDetails": {
        "firmName": "OS Books Retail",
        "contactNumber": "9876543210"
      },
      "products": [],
      "bankDetailsRows": [],
      "auditLogs": []
    }
    ```
