import React, { useState, useRef, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { 
  X, Search, Calendar, DownloadCloud, RefreshCw, PlusSquare,
  Edit, Check, Printer, ChevronDown, PlusCircle, Grip, Trash2, PauseCircle
} from 'lucide-react';
import { cn } from '../utils';
import { useAuditLog } from '../context/AuditLogContext';
import { ImportInvoiceAIModal } from '../components/ImportInvoiceAIModal';
import { HoldInvoiceModal } from '../components/HoldInvoiceModal';
import { useSettings } from '../context/SettingsContext';
import apiClient from '../api/apiClient';
import { createTransaction } from '../api/inventory';

// Inline Youtube SVG to avoid lucide-react export issues
const YoutubeIcon = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M21.582,6.186c-0.23-0.86-0.908-1.538-1.768-1.768C18.254,4,12,4,12,4S5.746,4,4.186,4.418 c-0.86,0.23-1.538,0.908-1.768,1.768C2,7.746,2,12,2,12s0,4.254,0.418,5.814c0.23,0.86,0.908,1.538,1.768,1.768 C5.746,20,12,20,12,20s6.254,0,7.814-0.418c0.861-0.23,1.538-0.908,1.768-1.768C22,16.254,22,12,22,12S22,7.746,21.582,6.186z M10,15.464V8.536L16,12L10,15.464z" />
  </svg>
);

export function SalesInvoice() {
  const navigate = useNavigate();
  const location = useLocation();
  const { addLog } = useAuditLog();
  const { settings, formatAmount, currentCurrency } = useSettings();
  
  const isReturn = location.pathname.includes('sales-return-invoice');
  const isQuotation = location.pathname.includes('quotation-invoice');
  const isSalesOrder = location.pathname.includes('sales-order-invoice');
  const isCustomerInvoice = location.pathname.includes('customer-invoice-creation');
  const isCustomerChallan = location.pathname.includes('customer-challan-creation');
  const pageTitle = isQuotation ? 'Quotation' : (isReturn ? 'Sales Return' : (isSalesOrder ? 'Sales Order' : (isCustomerInvoice ? 'Customer Invoice' : (isCustomerChallan ? 'Customer Challan' : 'Sales Invoice'))));

  const [isImportModalOpen, setIsImportModalOpen] = useState(false);
  const [isHoldModalOpen, setIsHoldModalOpen] = useState(false);

  // Toggles State
  const [isTaxIncluded, setIsTaxIncluded] = useState(true);
  const [paymentMode, setPaymentMode] = useState('Cash');
  const [isWholesale, setIsWholesale] = useState(false);

  const [invoiceDate, setInvoiceDate] = useState(new Date().toISOString().split('T')[0]);
  const dateInputRef = useRef(null);

  const formatDisplayDate = (dateString) => {
    if (!dateString) return "";
    const d = new Date(dateString);
    if (isNaN(d.getTime())) return dateString;
    return d.toLocaleDateString('en-GB', { day: '2-digit', month: '2-digit', year: 'numeric' }).replace(/\//g, '-');
  };

  const [customers, setCustomers] = useState([]);
  const [products, setProducts] = useState([]);
  const [selectedCustomerId, setSelectedCustomerId] = useState("");
  const [remark, setRemark] = useState("");

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [custRes, prodRes] = await Promise.all([
        apiClient.get('/customers'),
        apiClient.get('/products')
      ]);
      if (custRes.data.success) setCustomers(custRes.data.data);
      if (prodRes.data.success) setProducts(prodRes.data.data);
    } catch (error) {
      console.error('Failed to fetch data', error);
    }
  };

  const createEmptyRow = () => ({
    productId: "",
    productCode: "",
    unit: "",
    batchNo: "",
    mfgDate: "",
    expDate: "",
    qty: 1,
    freeQty: 0,
    listPrice: 0,
    mrp: 0,
    purchasePrice: 0,
    salePrice: 0,
    wholeSalePrice: 0,
    price: 0,
    disc1: 0,
    disc1Type: '%',
    disc2: 0,
    disc2Type: '%',
    imei: "",
    amount: 0,
    taxRate: 0
  });

  const [rows, setRows] = useState([createEmptyRow()]);

  // Recalculate prices when Wholesale toggle changes
  useEffect(() => {
    if (products.length > 0) {
      setRows(prevRows => prevRows.map(row => {
        if (row.productId) {
          const product = products.find(p => p.id === parseInt(row.productId));
          if (product) {
            return {
              ...row,
              price: isWholesale ? (product.wholesalePrice || 0) : (product.price || 0)
            };
          }
        }
        return row;
      }));
    }
  }, [isWholesale]);

  const handleProductSelect = (index, productId) => {
    const product = products.find(p => p.id === parseInt(productId));
    if (product) {
      const newRows = [...rows];
      newRows[index] = {
        ...newRows[index],
        productId: product.id,
        mrp: product.mrp || 0,
        price: isWholesale ? (product.wholesalePrice || 0) : (product.price || 0),
        taxRate: product.tax || 0
      };
      setRows(newRows);
    }
  };

  const updateRow = (index, field, value) => {
    const newRows = [...rows];
    newRows[index][field] = value;
    setRows(newRows);
  };

  const addRow = () => setRows([...rows, createEmptyRow()]);
  const removeRow = (index) => {
    if (rows.length > 1) {
      setRows(rows.filter((_, i) => i !== index));
    }
  };

  // Manual Summary Inputs
  const [manualDiscPercent, setManualDiscPercent] = useState("");
  const [manualDiscAmount, setManualDiscAmount] = useState("");
  const [manualFreightAmt, setManualFreightAmt] = useState("");
  const [manualFreightGst, setManualFreightGst] = useState("");

  // Calculation Logic
  let totalQty = 0;
  let baseAmount = 0;
  let totalRowDiscount = 0;
  let totalGstAmount = 0;
  let totalCgst = 0;
  let totalSgst = 0;
  let totalIgst = 0;

  const calculatedRows = rows.map(row => {
    const pPrice = Number(row.price) || 0;
    const pQty = Number(row.qty) || 0;
    const pFree = Number(row.freeQty) || 0;
    
    totalQty += pQty + pFree;
    
    const rowBaseAmount = pQty * pPrice;
    baseAmount += rowBaseAmount;

    let d1Amt = row.disc1Type === '%' ? rowBaseAmount * ((Number(row.disc1) || 0) / 100) : (Number(row.disc1) || 0);
    const afterD1 = Math.max(0, rowBaseAmount - d1Amt);
    let d2Amt = row.disc2Type === '%' ? afterD1 * ((Number(row.disc2) || 0) / 100) : (Number(row.disc2) || 0);
    
    const rowDisc = d1Amt + d2Amt;
    totalRowDiscount += rowDisc;
    
    const amount = Math.max(0, rowBaseAmount - rowDisc);

    const gstRate = Number(row.taxRate) || 0;
    const gstAmount = amount * (gstRate / 100);
    const cgst = gstAmount / 2;
    const sgst = gstAmount / 2;
    const igst = 0;

    totalGstAmount += gstAmount;
    totalCgst += cgst;
    totalSgst += sgst;
    totalIgst += igst;

    return { ...row, amount, gstRate, gstAmount, cgst, sgst, igst };
  });

  const effectiveDiscPercent = baseAmount > 0 ? ((totalRowDiscount / baseAmount) * 100).toFixed(2) : 0;
  const appliedDiscAmount = manualDiscAmount !== "" ? Number(manualDiscAmount) : totalRowDiscount;
  const appliedFreightAmt = manualFreightAmt !== "" ? Number(manualFreightAmt) : 0;
  const appliedFreightGst = manualFreightGst !== "" ? Number(manualFreightGst) : 0;
  const totalFreight = appliedFreightAmt + (appliedFreightAmt * (appliedFreightGst / 100));

  const finalCalculatedAmount = Math.max(0, baseAmount - appliedDiscAmount) + totalFreight + totalGstAmount;

  const gridTemplateColumns = [
    '40px', // S.NO
    settings.showProductCode ? '90px' : '', // P.CODE
    '200px', // PRODUCT NAME
    settings.showUnit ? '70px' : '', // UNIT
    settings.showBatchNo ? '90px' : '', // BATCH
    !settings.hideManufactureDate ? '110px' : '', // MFG
    !settings.hideExpiryDate ? '110px' : '', // EXP
    settings.showHSN ? '80px' : '',
    settings.showGST ? '80px' : '',
    '80px', // QTY
    '80px', // FREE QTY
    settings.showListPrice ? '90px' : '', // LIST P
    settings.showMRP ? '80px' : '', // MRP
    settings.showPurchasePrice ? '90px' : '', // PUR P
    settings.salePrice ? '90px' : '', // SALE P
    settings.wholeSalePrice ? '90px' : '', // WS P
    '100px', // PRICE
    settings.showDiscount ? '110px' : '', // DISC 1
    settings.showDiscount ? '110px' : '', // DISC 2
    '120px', // IMEI
    '100px', // AMOUNT
    '80px', // ACTION
  ].filter(Boolean).join(' ');

  const handleSave = async () => {
    if (!selectedCustomerId) return alert('Please select a customer.');
    
    const validRows = calculatedRows.filter(r => r.productId && r.qty > 0);
    if (validRows.length === 0) return alert('Please add at least one valid product.');

    const payload = {
      invoiceNo: `INV-${Date.now()}`,
      customerId: selectedCustomerId,
      date: invoiceDate,
      paymentMode,
      remark,
      subTotal: baseAmount,
      totalDiscount: appliedDiscAmount,
      freightCharges: totalFreight,
      totalAmount: finalCalculatedAmount,
      totalGstAmount,
      totalCgst,
      totalSgst,
      totalIgst,
      items: validRows.map(r => ({
        productId: Number(r.productId),
        productCode: r.productCode,
        unit: r.unit,
        batchNo: r.batchNo,
        mfgDate: r.mfgDate,
        expDate: r.expDate,
        quantity: Number(r.qty) || 1,
        freeQty: Number(r.freeQty) || 0,
        listPrice: Number(r.listPrice) || 0,
        mrp: Number(r.mrp) || 0,
        purchasePrice: Number(r.purchasePrice) || 0,
        salePrice: Number(r.salePrice) || 0,
        wholeSalePrice: Number(r.wholeSalePrice) || 0,
        price: Number(r.price) || 0,
        discount1: Number(r.disc1Type === '%' ? r.price * r.qty * (r.disc1/100) : r.disc1) || 0,
        discount2: Number(r.disc2Type === '%' ? r.price * r.qty * (r.disc2/100) : r.disc2) || 0,
        imei: r.imei,
        amount: Number(r.amount) || 0,
        gstRate: Number(r.gstRate) || 0,
        gstAmount: Number(r.gstAmount) || 0,
        cgst: Number(r.cgst) || 0,
        sgst: Number(r.sgst) || 0,
        igst: Number(r.igst) || 0
      }))
    };

    try {
      let type = 'sales';
      if (isQuotation) type = 'quotation';
      else if (isReturn) type = 'sales_return';
      else if (isCustomerChallan) type = 'challan';

      await createTransaction(type, payload);
      alert('Invoice Saved Successfully!');
      
      if (isQuotation) navigate('/admin/quotation_summary');
      else if (isReturn) navigate('/admin/sales_return');
      else if (isCustomerChallan) navigate('/admin/customer_challan_invoice');
      else navigate('/admin/customer_sale');
      
    } catch (error) {
      console.error(error);
      alert('Failed to save invoice.');
    }
  };

  const handleHoldInvoice = async (note) => {
    if (!selectedCustomerId) return alert('Please select a customer before holding.');
    
    const validRows = calculatedRows.filter(r => r.productId && r.qty > 0);
    if (validRows.length === 0) return alert('Please add at least one valid product.');

    const payload = {
      invoiceNo: `INV-${Date.now()}`,
      customerId: selectedCustomerId,
      date: invoiceDate,
      paymentMode,
      remark: note || remark,
      status: "HOLD",
      subTotal: baseAmount,
      totalDiscount: appliedDiscAmount,
      freightCharges: totalFreight,
      totalAmount: finalCalculatedAmount,
      totalGstAmount,
      totalCgst,
      totalSgst,
      totalIgst,
      items: validRows.map(r => ({
        productId: Number(r.productId),
        quantity: Number(r.qty) || 1,
        freeQty: Number(r.freeQty) || 0,
        price: Number(r.price) || 0,
        discount1: Number(r.disc1Type === '%' ? r.price * r.qty * (r.disc1/100) : r.disc1) || 0,
        discount2: Number(r.disc2Type === '%' ? r.price * r.qty * (r.disc2/100) : r.disc2) || 0,
        imei: r.imei,
        amount: Number(r.amount) || 0,
        gstRate: Number(r.gstRate) || 0,
        gstAmount: Number(r.gstAmount) || 0,
        cgst: Number(r.cgst) || 0,
        sgst: Number(r.sgst) || 0,
        igst: Number(r.igst) || 0
      }))
    };

    try {
      let type = 'sales';
      if (isQuotation) type = 'quotation';
      else if (isReturn) type = 'sales_return';
      else if (isCustomerChallan) type = 'challan';

      await createTransaction(type, payload);
      alert('Invoice put on hold successfully!');
      
      // Reset form to start a new invoice
      setRows([createEmptyRow()]);
      setSelectedCustomerId("");
      setRemark("");
      setManualDiscPercent("");
      setManualDiscAmount("");
      setManualFreightAmt("");
      setManualFreightGst("");
      
    } catch (error) {
      console.error(error);
      alert('Failed to hold invoice.');
    }
  };

  const handleEditRow = () => {
    addLog({
      userName: 'Admin User',
      userRole: 'Admin',
      actionType: 'Edit',
      billNumber: `INV-${Math.floor(1000 + Math.random() * 9000)}`,
      moduleName: pageTitle,
      previousData: { qty: 10, price: 1000, finalAmount: 10000 },
      updatedData: { qty: 0, price: 0, finalAmount: 0 },
      ipAddress: '192.168.1.5'
    });
    alert('Row edit logged!');
  };

  const handleDeleteRow = () => {
    addLog({
      userName: 'Admin User',
      userRole: 'Admin',
      actionType: 'Delete',
      billNumber: `INV-${Math.floor(1000 + Math.random() * 9000)}`,
      moduleName: pageTitle,
      previousData: { qty: 0, price: 0, finalAmount: 0 },
      updatedData: null,
      ipAddress: '192.168.1.5'
    });
    alert('Row delete logged!');
  };

  return (
    <div className="bg-[#f4f6f9] min-h-[calc(100vh-45px)] flex flex-col relative pb-12">
      <div className="bg-white m-3 mt-0 shadow-sm border border-gray-200 flex-1 flex flex-col">
        
        {/* Top Header */}
        <div className="bg-[#4F46E5] flex items-center justify-between px-3 py-1.5">
          <h2 className="text-white font-medium text-[15px]">{pageTitle}</h2>
          
          <div className="flex flex-wrap items-center gap-3">
            <div 
              className="flex flex-wrap items-center gap-1.5 cursor-pointer" 
              onClick={() => setIsWholesale(!isWholesale)}
            >
              <span className={`text-[13px] font-bold ${!isWholesale ? 'text-white' : 'text-gray-300'}`}>Retail</span>
              <div className={`w-[32px] h-[18px] rounded-full relative border transition-colors ${isWholesale ? 'bg-[#117a8b] border-[#148ea1]' : 'bg-gray-400 border-gray-500'}`}>
                <div className={`w-[14px] h-[14px] rounded-full absolute top-[1px] transition-all bg-white shadow-sm ${isWholesale ? 'right-[1px]' : 'left-[1px]'}`}></div>
              </div>
              <span className={`text-[13px] font-bold ${isWholesale ? 'text-white' : 'text-gray-300'}`}>Wholesale</span>
            </div>

            <div className="w-[1px] h-5 bg-indigo-400 mx-1"></div>

            <div 
              className="flex flex-wrap items-center gap-1.5 cursor-pointer" 
              onClick={() => setPaymentMode(paymentMode === 'Cash' ? 'Credit' : 'Cash')}
            >
              <span className={`text-[13px] font-bold ${paymentMode === 'Credit' ? 'text-white' : 'text-gray-300'}`}>Credit</span>
              <div className={`w-[32px] h-[18px] rounded-full relative border transition-colors ${paymentMode === 'Cash' ? 'bg-[#117a8b] border-[#148ea1]' : 'bg-gray-400 border-gray-500'}`}>
                <div className={`w-[14px] h-[14px] rounded-full absolute top-[1px] transition-all bg-white shadow-sm ${paymentMode === 'Cash' ? 'right-[1px]' : 'left-[1px]'}`}></div>
              </div>
              <span className={`text-[13px] font-bold ${paymentMode === 'Cash' ? 'text-white' : 'text-gray-300'}`}>Cash</span>
            </div>
            
            <button className="bg-white p-1 rounded-sm shadow-sm">
              <YoutubeIcon className="w-4 h-4 text-[#ff0000]" />
            </button>
            <button className="bg-[#ffc107] p-1 rounded-sm shadow-sm">
              <RefreshCw className="w-4 h-4 text-white" strokeWidth={3} />
            </button>
            <button 
              onClick={() => navigate('/dashboard')}
              className="bg-[#dc3545] p-1 rounded-sm shadow-sm hover:bg-[#c82333] transition-colors"
            >
              <X className="w-4 h-4 text-white font-bold" strokeWidth={4} />
            </button>
          </div>
        </div>

        {/* Top Form Controls */}
        <div className="p-3 border-b border-gray-200 grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <label className="text-[13px] font-bold text-gray-800">Customer Name</label>
              <span className="text-[13px] font-bold text-[#dc3545] invisible md:visible absolute md:static left-1/2 -translate-x-1/2 top-4">Due Amount : {formatAmount(0)}</span>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <div className="flex-1 flex items-center relative">
                <select 
                  value={selectedCustomerId}
                  onChange={(e) => setSelectedCustomerId(e.target.value)}
                  className="w-full min-w-0 border border-gray-300 border-r-0 rounded-l-[3px] px-3 py-1.5 text-[13px] focus:outline-none focus:border-[#4F46E5] bg-white text-gray-800"
                >
                  <option value="">Select Customer</option>
                  {customers.map(c => (
                    <option key={c.id} value={c.id}>{c.name} - {c.phone}</option>
                  ))}
                </select>
                <button 
                  onClick={() => alert("Search triggered")}
                  className="bg-[#4F46E5] hover:bg-[#4338ca] text-white px-3 py-1.5 border border-[#4F46E5] rounded-r-[3px] transition-colors"
                >
                  <Search className="w-4 h-4" />
                </button>
              </div>
              <button 
                onClick={() => setIsHoldModalOpen(true)}
                className="bg-[#6c757d] hover:bg-[#5a6268] text-white px-3 py-1.5 rounded-[3px] text-[13px] font-bold shadow-sm flex items-center gap-1.5 transition-colors"
              >
                <PauseCircle className="w-3.5 h-3.5" /> Hold
              </button>
              <button 
                onClick={() => setIsImportModalOpen(true)}
                className="bg-[#28a745] hover:bg-[#218838] text-white px-3 py-1.5 rounded-[3px] text-[13px] font-bold shadow-sm flex items-center gap-1.5 transition-colors"
              >
                <DownloadCloud className="w-4 h-4" /> Import Invoice (AI)
              </button>
            </div>
          </div>
          
          <div className="flex flex-col items-end justify-center gap-3">
             <div className="flex items-center justify-end w-full sm:max-w-[320px]">
               <label className="text-[13px] font-bold text-gray-800 w-[80px] text-right mr-2">Invoice No :</label>
               <div className="flex-1 flex items-center">
                 <input 
                   type="text" 
                   disabled
                   placeholder="(AUTO GENRATED)"
                   className="w-full min-w-0 border border-gray-300 border-r-0 rounded-l-[3px] px-3 py-1 text-[13px] bg-white text-gray-400"
                 />
                 <button className="bg-[#4F46E5] text-white px-3 py-1 border border-[#4F46E5] rounded-r-[3px]">
                   <Search className="w-4 h-4" />
                 </button>
               </div>
             </div>
             <div className="flex items-center justify-end w-full sm:max-w-[320px]">
               <label className="text-[13px] font-bold text-gray-800 w-[80px] text-right mr-2">Date :</label>
               <div className="flex-1 flex items-center relative">
                 <input 
                   ref={dateInputRef}
                   type="date"
                   value={invoiceDate}
                   onChange={(e) => setInvoiceDate(e.target.value)}
                   className="absolute w-0 h-0 opacity-0 -z-10"
                 />
                 <input 
                   type="text" 
                   readOnly
                   value={formatDisplayDate(invoiceDate)}
                   className="w-full min-w-0 border border-gray-300 border-r-0 rounded-l-[3px] px-3 py-1 text-[13px] bg-white text-gray-600 outline-none"
                 />
                 <button 
                   onClick={() => {
                     try {
                       dateInputRef.current?.showPicker();
                     } catch (e) {
                       dateInputRef.current?.focus();
                     }
                   }}
                   className="min-w-0 border border-gray-300 border-l-0 px-2 py-1 rounded-r-[3px] bg-white text-gray-500 hover:bg-gray-50 transition-colors"
                 >
                   <Calendar className="w-4 h-4" />
                 </button>
               </div>
             </div>
          </div>
        </div>

        {/* Data Table */}
        <div className="flex-1 min-h-[300px] overflow-x-auto">
          <div className="min-w-[1000px]">
            {/* Table Header: 11 Columns */}
            <div style={{ gridTemplateColumns }} className="bg-[#343a40] text-white grid text-center border-b border-gray-600">
              <div className="border-r border-gray-600 py-2 text-[12px] font-bold leading-tight flex flex-col justify-center">
                S.NO.
              </div>
              {settings.showProductCode && (
                <div className="border-r border-gray-600 py-2 text-[12px] font-bold flex items-center justify-center">
                  P.CODE
                </div>
              )}
              <div className="border-r border-gray-600 py-2 text-[12px] font-bold flex items-center justify-center">
                PRODUCT NAME
              </div>
              {settings.showUnit && (
                <div className="border-r border-gray-600 py-2 text-[12px] font-bold flex items-center justify-center">
                  UNIT
                </div>
              )}
              {settings.showBatchNo && (
                <div className="border-r border-gray-600 py-2 text-[12px] font-bold flex items-center justify-center">
                  BATCH
                </div>
              )}
              {!settings.hideManufactureDate && (
                <div className="border-r border-gray-600 py-2 text-[12px] font-bold flex items-center justify-center">
                  MFG DT
                </div>
              )}
              {!settings.hideExpiryDate && (
                <div className="border-r border-gray-600 py-2 text-[12px] font-bold flex items-center justify-center text-red-300">
                  EXP DT
                </div>
              )}
              {settings.showHSN && (
                <div className="border-r border-gray-600 py-2 text-[12px] font-bold flex flex-col justify-center text-teal-300">
                  HSN
                </div>
              )}
              {settings.showGST && (
                <div className="border-r border-gray-600 py-2 text-[12px] font-bold flex flex-col justify-center text-teal-300">
                  GST %
                </div>
              )}
              <div className="border-r border-gray-600 py-2 text-[12px] font-bold flex flex-col justify-center">
                QTY
              </div>
              <div className="border-r border-gray-600 py-2 text-[12px] font-bold text-[#ffc107] flex items-center justify-center">
                FREE
              </div>
              {settings.showListPrice && (
                <div className="border-r border-gray-600 py-2 text-[12px] font-bold flex items-center justify-center">
                  LIST P.
                </div>
              )}
              {settings.showMRP && (
                <div className="border-r border-gray-600 py-2 text-[12px] font-bold flex items-center justify-center">
                  MRP
                </div>
              )}
              {settings.showPurchasePrice && (
                <div className="border-r border-gray-600 py-2 text-[12px] font-bold flex items-center justify-center">
                  PUR. P.
                </div>
              )}
              {settings.salePrice && (
                <div className="border-r border-gray-600 py-2 text-[12px] font-bold flex items-center justify-center text-green-300">
                  SALE P.
                </div>
              )}
              {settings.wholeSalePrice && (
                <div className="border-r border-gray-600 py-2 text-[12px] font-bold flex items-center justify-center text-green-300">
                  W.S. P.
                </div>
              )}
              <div className="border-r border-gray-600 py-2 text-[12px] font-bold flex flex-col justify-center leading-tight">
                <span className="font-normal text-[10px]">(TAX INCLUDED)</span>
                <div 
                  onClick={() => setIsTaxIncluded(!isTaxIncluded)}
                  className="flex items-center justify-center gap-1 mt-0.5 cursor-pointer"
                >
                  <div className={`w-[24px] h-[14px] rounded-full relative transition-colors ${isTaxIncluded ? 'bg-[#117a8b]' : 'bg-gray-400'}`}>
                    <div className={`w-[10px] h-[10px] bg-white rounded-full absolute top-[2px] transition-all shadow-sm ${isTaxIncluded ? 'right-[2px]' : 'left-[2px]'}`}></div>
                  </div>
                  PRICE
                </div>
              </div>
              {settings.showDiscount && (
                <>
                  <div className="border-r border-gray-600 py-2 text-[12px] font-bold flex items-center justify-center text-blue-300">
                    DISC 1
                  </div>
                  <div className="border-r border-gray-600 py-2 text-[12px] font-bold flex items-center justify-center text-blue-300">
                    DISC 2
                  </div>
                </>
              )}
              <div className="border-r border-gray-600 py-2 text-[12px] font-bold flex items-center justify-center text-purple-300">
                IMEI
              </div>
              <div className="border-r border-gray-600 py-2 text-[12px] font-bold flex items-center justify-center">
                AMOUNT
              </div>
              <div className="py-2 text-[12px] font-bold flex items-center justify-center">
                ACTION
              </div>
            </div>

            {/* Input Rows */}
            {calculatedRows.map((row, idx) => (
              <div key={idx} style={{ gridTemplateColumns }} className="grid bg-white border-b border-gray-200">
                <div className="border-r border-gray-200 flex items-center justify-center p-1 bg-gray-600 text-white font-bold text-[12px]">
                  {idx + 1}
                </div>
                {settings.showProductCode && (
                  <div className="border-r border-gray-200 p-1 flex">
                    <input type="text" value={row.productCode} onChange={(e) => updateRow(idx, 'productCode', e.target.value)} placeholder="Code" className="w-full h-full border border-gray-200 rounded-[3px] px-1 text-[12px] outline-none" />
                  </div>
                )}
                <div className="border-r border-gray-200 p-1 flex relative">
                  <select 
                    value={row.productId} 
                    onChange={(e) => handleProductSelect(idx, e.target.value)}
                    className="w-full px-2 py-1 text-[13px] outline-none font-bold text-gray-800 appearance-none bg-transparent" 
                  >
                    <option value="">Select Product...</option>
                    {products.map(p => (
                      <option key={p.id} value={p.id}>{p.name} - SKU: {p.sku}</option>
                    ))}
                  </select>
                </div>
                
                {settings.showUnit && (
                  <div className="border-r border-gray-200 p-1 flex items-center justify-center">
                    <input type="text" value={row.unit} onChange={(e) => updateRow(idx, 'unit', e.target.value)} placeholder="Unit" className="w-full h-full border border-gray-200 rounded-[3px] px-1 text-[12px] outline-none text-center" />
                  </div>
                )}
                {settings.showBatchNo && (
                  <div className="border-r border-gray-200 p-1 flex items-center justify-center">
                    <input type="text" value={row.batchNo} onChange={(e) => updateRow(idx, 'batchNo', e.target.value)} placeholder="Batch" className="w-full h-full border border-gray-200 rounded-[3px] px-1 text-[12px] outline-none text-center text-purple-700" />
                  </div>
                )}
                {!settings.hideManufactureDate && (
                  <div className="border-r border-gray-200 p-1 flex items-center justify-center">
                    <input type="date" value={row.mfgDate} onChange={(e) => updateRow(idx, 'mfgDate', e.target.value)} className="w-full h-full border border-gray-200 rounded-[3px] px-1 text-[11px] outline-none" />
                  </div>
                )}
                {!settings.hideExpiryDate && (
                  <div className="border-r border-gray-200 p-1 flex items-center justify-center">
                    <input type="date" value={row.expDate} onChange={(e) => updateRow(idx, 'expDate', e.target.value)} className="w-full h-full border border-red-200 rounded-[3px] px-1 text-[11px] outline-none text-red-700 bg-red-50" />
                  </div>
                )}

                {settings.showHSN && (
                  <div className="border-r border-gray-200 p-1 flex items-center justify-center">
                    <input type="text" placeholder="HSN" className="w-full h-full border border-gray-200 rounded-[3px] px-1 text-[12px] outline-none text-center" />
                  </div>
                )}
                {settings.showGST && (
                  <div className="border-r border-gray-200 p-1 flex items-center justify-center">
                    <select 
                      value={row.taxRate}
                      onChange={(e) => updateRow(idx, 'taxRate', Number(e.target.value))}
                      className="w-full h-full border border-gray-200 rounded-[3px] px-0 text-[12px] outline-none text-center"
                    >
                      <option value="0">0%</option>
                      <option value="5">5%</option>
                      <option value="12">12%</option>
                      <option value="18">18%</option>
                      <option value="28">28%</option>
                    </select>
                  </div>
                )}

                <div className="border-r border-gray-200 p-1">
                   <input 
                     type="number" 
                     value={row.qty}
                     onChange={(e) => updateRow(idx, 'qty', Number(e.target.value))}
                     className="w-full h-full border border-gray-200 rounded-[3px] px-2 text-[13px] outline-none text-center font-bold" 
                   />
                </div>

                <div className="border-r border-gray-200 p-1">
                   <input 
                     type="number" 
                     value={row.freeQty}
                     onChange={(e) => updateRow(idx, 'freeQty', Number(e.target.value))}
                     className="w-full h-full border border-yellow-300 bg-yellow-50 rounded-[3px] px-2 text-[13px] outline-none text-center font-bold text-yellow-800" 
                   />
                </div>

                {settings.showListPrice && (
                  <div className="border-r border-gray-200 p-1 flex flex-col justify-center">
                    <input type="number" value={row.listPrice} onChange={(e) => updateRow(idx, 'listPrice', Number(e.target.value))} className="w-full h-full border border-gray-200 rounded-[3px] px-1 text-[12px] outline-none text-right" />
                  </div>
                )}
                {settings.showMRP && (
                  <div className="border-r border-gray-200 p-1 flex flex-col justify-center bg-gray-50 text-[13px] font-bold text-gray-500">
                    <input type="number" value={row.mrp} onChange={(e) => updateRow(idx, 'mrp', Number(e.target.value))} className="w-full h-full border-none bg-transparent px-1 text-[12px] outline-none text-right font-bold text-gray-600" />
                  </div>
                )}
                {settings.showPurchasePrice && (
                  <div className="border-r border-gray-200 p-1 flex flex-col justify-center">
                    <input type="number" value={row.purchasePrice} onChange={(e) => updateRow(idx, 'purchasePrice', Number(e.target.value))} className="w-full h-full border border-gray-200 rounded-[3px] px-1 text-[12px] outline-none text-right" />
                  </div>
                )}
                {settings.salePrice && (
                  <div className="border-r border-gray-200 p-1 flex flex-col justify-center">
                    <input type="number" value={row.salePrice} onChange={(e) => updateRow(idx, 'salePrice', Number(e.target.value))} className="w-full h-full border border-green-200 rounded-[3px] px-1 text-[12px] outline-none text-right bg-green-50 text-green-700" />
                  </div>
                )}
                {settings.wholeSalePrice && (
                  <div className="border-r border-gray-200 p-1 flex flex-col justify-center">
                    <input type="number" value={row.wholeSalePrice} onChange={(e) => updateRow(idx, 'wholeSalePrice', Number(e.target.value))} className="w-full h-full border border-green-200 rounded-[3px] px-1 text-[12px] outline-none text-right bg-green-50 text-green-700" />
                  </div>
                )}

                <div className="border-r border-gray-200 p-1 flex flex-col justify-center relative group">
                  <input 
                    type="number" 
                    value={row.price}
                    onChange={(e) => updateRow(idx, 'price', Number(e.target.value))}
                    className="w-full h-full border border-gray-200 rounded-[3px] px-2 text-[13px] outline-none text-right font-bold transition-colors bg-blue-50 border-blue-200" 
                  />
                </div>

                {/* Disc 1 and 2 */}
                {settings.showDiscount && (
                  <>
                    <div className="border-r border-gray-200 p-1 flex">
                       <input 
                         type="number" 
                         value={row.disc1}
                         onChange={(e) => updateRow(idx, 'disc1', Number(e.target.value))}
                         className="w-[60%] border border-blue-200 rounded-l-[3px] px-1 text-[13px] outline-none border-r-0 text-center text-blue-800 bg-blue-50" 
                       />
                        <select 
                          value={row.disc1Type}
                          onChange={(e) => updateRow(idx, 'disc1Type', e.target.value)}
                          className="w-[40%] border border-blue-200 rounded-r-[3px] px-0 text-[12px] outline-none bg-blue-100 text-blue-800 appearance-none text-center"
                        >
                          <option value="%">%</option>
                          <option value={currentCurrency.symbol}>{currentCurrency.symbol}</option>
                        </select>
                    </div>
                    <div className="border-r border-gray-200 p-1 flex">
                       <input 
                         type="number" 
                         value={row.disc2}
                         onChange={(e) => updateRow(idx, 'disc2', Number(e.target.value))}
                         className="w-[60%] border border-blue-200 rounded-l-[3px] px-1 text-[13px] outline-none border-r-0 text-center text-blue-800 bg-blue-50" 
                       />
                        <select 
                          value={row.disc2Type}
                          onChange={(e) => updateRow(idx, 'disc2Type', e.target.value)}
                          className="w-[40%] border border-blue-200 rounded-r-[3px] px-0 text-[12px] outline-none bg-blue-100 text-blue-800 appearance-none text-center"
                        >
                          <option value="%">%</option>
                          <option value={currentCurrency.symbol}>{currentCurrency.symbol}</option>
                        </select>
                    </div>
                  </>
                )}

                {/* IMEI Select */}
                <div className="border-r border-gray-200 p-1 flex items-center justify-center">
                    <input 
                      type="text"
                      placeholder="IMEI..."
                      value={row.imei || ''}
                      onChange={(e) => updateRow(idx, 'imei', e.target.value)}
                      className="w-full h-full border border-purple-200 bg-purple-50 rounded-[3px] px-1 text-[11px] outline-none text-purple-800"
                    />
                </div>

                <div className="border-r border-gray-200 p-1 flex items-center justify-end pr-2 text-[13px] font-bold text-gray-800 bg-gray-50">
                  {row.amount.toFixed(2)}
                </div>
                
                <div className="bg-[#343a40] flex items-center justify-center gap-2 p-1">
                  <button onClick={addRow} className="text-[#28a745] hover:text-green-400">
                    <PlusSquare className="w-[18px] h-[18px]" strokeWidth={2.5} />
                  </button>
                  <button onClick={() => removeRow(idx)} className="text-red-400 hover:text-red-300">
                    <Trash2 className="w-[18px] h-[18px]" strokeWidth={2.5} />
                  </button>
                </div>
              </div>
            ))}
            
          </div>
        </div>

        {/* Calculations and Footer Area */}
        <div className="bg-white border-t border-gray-200 p-4 grid grid-cols-1 lg:grid-cols-[1fr_350px] gap-6">
          {/* Left Side (Totals, Remark, Terms) */}
          <div className="flex flex-col gap-4">
            
            <div className="summary-stats grid grid-cols-4 gap-2">
              <div className="border border-gray-200 bg-[#f8f9fa] rounded-[3px] p-2 flex flex-col items-center justify-center text-center">
                <span className="text-[12px] font-bold text-gray-700">Total Qty (Inc. Free)</span>
                <span className="text-[14px] font-bold text-[#007bff]">{totalQty}</span>
              </div>
              <div className="border border-gray-200 bg-[#f8f9fa] rounded-[3px] p-2 flex flex-col items-center justify-center text-center">
                <span className="text-[12px] font-bold text-gray-700">Taxable</span>
                <span className="text-[14px] font-bold text-[#28a745]">{formatAmount(finalCalculatedAmount - totalGstAmount)}</span>
              </div>
              <div className="border border-gray-200 bg-[#f8f9fa] rounded-[3px] p-2 flex flex-col items-center justify-center text-center">
                <span className="text-[12px] font-bold text-gray-700">CGST</span>
                <span className="text-[14px] font-bold text-[#007bff]">{formatAmount(totalCgst)}</span>
              </div>
              <div className="border border-gray-200 bg-[#f8f9fa] rounded-[3px] p-2 flex flex-col items-center justify-center text-center">
                <span className="text-[12px] font-bold text-gray-700">SGST</span>
                <span className="text-[14px] font-bold text-[#007bff]">{formatAmount(totalSgst)}</span>
              </div>
            </div>

            <div>
              <label className="block text-[13px] font-bold text-gray-800 mb-1">Remark</label>
              <textarea 
                placeholder="Remark..." 
                className="w-full min-w-0 border border-gray-300 rounded-[3px] px-3 py-1.5 text-[13px] focus:outline-none focus:border-[#4F46E5] resize-none h-[40px] text-gray-400"
              />
            </div>

            <div className="flex flex-col text-[13px]">
               <div className="flex flex-wrap items-center gap-1 mb-1 text-gray-500 text-[15px]">
                 Terms <PlusCircle className="w-4 h-4 text-[#4F46E5] cursor-pointer" />
               </div>
               <span className="font-bold text-gray-600">1.Goods once sold will not be taken back or exchanged</span>
            </div>

          </div>

          {/* Right Side (Summary Calculations) */}
          <div className="flex flex-col gap-3">
             <div className="flex items-center justify-between">
               <span className="text-[13px] font-bold text-gray-800">Subtotal:</span>
               <div className="w-[200px] bg-[#e9ecef] min-w-0 border border-gray-300 rounded-[3px] px-3 py-1 text-[13px] text-gray-800 font-bold text-right">
                 {formatAmount(baseAmount)}
               </div>
             </div>

             {!settings.hideTotalDiscount && (
               <div className="flex justify-between items-start">
                 <span className="text-[13px] font-bold text-gray-800 mt-3">Discount:</span>
                 <div className="w-[200px] flex gap-2">
                   <div className="flex-1 relative mt-[18px]">
                     <span className="absolute -top-[18px] left-0 text-[11px] font-bold text-gray-800">Dis.%</span>
                     <input type="number" value={manualDiscPercent !== "" ? manualDiscPercent : effectiveDiscPercent} onChange={(e) => setManualDiscPercent(e.target.value)} className="w-full min-w-0 border border-gray-300 rounded-[3px] px-2 py-1 text-[13px] outline-none bg-white text-right text-blue-700 font-bold" />
                   </div>
                   <div className="flex-1 relative mt-[18px]">
                     <span className="absolute -top-[18px] left-0 text-[11px] font-bold text-gray-800">Dis. Amount</span>
                     <input type="number" value={manualDiscAmount !== "" ? manualDiscAmount : totalRowDiscount.toFixed(2)} onChange={(e) => setManualDiscAmount(e.target.value)} className="w-full min-w-0 border border-gray-300 rounded-[3px] px-2 py-1 text-[13px] outline-none bg-white text-right text-blue-700 font-bold" />
                   </div>
                 </div>
               </div>
             )}

             <div className="flex justify-between items-start">
               <span className="text-[13px] font-bold text-gray-800 mt-3">Fright Charges:</span>
               <div className="w-[200px] flex gap-2">
                 <div className="flex-1 relative mt-[18px]">
                   <span className="absolute -top-[18px] left-0 text-[11px] font-bold text-gray-800">Amount</span>
                   <input type="number" value={manualFreightAmt !== "" ? manualFreightAmt : "0"} onChange={(e) => setManualFreightAmt(e.target.value)} className="w-full min-w-0 border border-gray-300 rounded-[3px] px-2 py-1 text-[13px] outline-none bg-white text-right" />
                 </div>
                 <div className="flex-1 relative mt-[18px]">
                   <span className="absolute -top-[18px] left-0 text-[11px] font-bold text-gray-800">Gst %</span>
                   <input type="number" value={manualFreightGst !== "" ? manualFreightGst : "0"} onChange={(e) => setManualFreightGst(e.target.value)} className="w-full min-w-0 border border-gray-300 rounded-[3px] px-2 py-1 text-[13px] outline-none bg-white text-right" />
                 </div>
               </div>
             </div>

             <div className="flex items-center justify-between mt-1">
               <span className="text-[13px] font-bold text-gray-800">Final Amount:</span>
               <div className="w-[200px] bg-[#e9ecef] min-w-0 border border-gray-300 rounded-[3px] px-3 py-1 text-[14px] text-[#28a745] font-bold text-right shadow-sm border-[#28a745]">
                 {formatAmount(finalCalculatedAmount)}
               </div>
             </div>
          </div>

        </div>
      </div>

      {/* Fixed Bottom Action Bar */}
      <div className="fixed bottom-0 left-0 md:left-[220px] right-0 bg-[#343a40] z-40 px-2 sm:px-4 py-2 invoice-bottom-bar shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)]">
        <div className="flex flex-wrap items-center gap-1 text-[12px] font-bold">
          <span className="text-white">Last Invoice Total:</span>
          <span className="text-[#ffc107]">{formatAmount(0)}</span>
        </div>
        
        <div className="flex items-center justify-center gap-1.5 flex-1 max-w-[400px] mx-auto flex-wrap">
          <button onClick={handleSave} className="flex items-center gap-1 bg-[#28a745] hover:bg-[#218838] text-white px-3 py-1.5 rounded-[3px] text-[13px] transition-colors">
            <Check className="w-4 h-4" strokeWidth={3} />
            Save
          </button>
          
          <div className="flex items-center">
            <button className="flex items-center gap-1 bg-[#ffc107] hover:bg-[#e0a800] text-gray-900 px-3 py-1.5 rounded-l-[3px] text-[13px] transition-colors">
              <RefreshCw className="w-3.5 h-3.5" strokeWidth={3} />
              Convert Type
            </button>
            <button className="bg-[#ffc107] hover:bg-[#e0a800] text-gray-900 px-2 py-1.5 rounded-r-[3px] border-l border-[#d39e00] transition-colors">
              <ChevronDown className="w-4 h-4" strokeWidth={3} />
            </button>
          </div>

          <button className="flex items-center gap-1 bg-[#4F46E5] hover:bg-[#4338ca] text-white px-3 py-1.5 rounded-[3px] text-[13px] transition-colors">
            <Printer className="w-4 h-4" strokeWidth={3} />
            Print
          </button>

          <button 
            onClick={() => navigate('/dashboard')}
            className="flex items-center gap-1 bg-[#dc3545] hover:bg-[#c82333] text-white px-3 py-1.5 rounded-[3px] text-[13px] transition-colors"
          >
            <X className="w-4 h-4" strokeWidth={3} />
            Close
          </button>
        </div>

        <button className="flex items-center gap-2 bg-[#23272b] hover:bg-[#1d2124] text-white px-3 py-1.5 rounded-[3px] text-[12px] border border-gray-600 transition-colors invisible sm:visible">
          <Grip className="w-4 h-4" />
          Shortcut keys
          <ChevronDown className="w-3.5 h-3.5 ml-1" strokeWidth={3} />
        </button>
      </div>

      {/* Modals */}
      <ImportInvoiceAIModal 
        isOpen={isImportModalOpen} 
        onClose={() => setIsImportModalOpen(false)} 
      />
      <HoldInvoiceModal 
        isOpen={isHoldModalOpen} 
        onClose={() => setIsHoldModalOpen(false)} 
        onConfirm={handleHoldInvoice}
      />

    </div>
  );
}

const FilterIcon = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" />
  </svg>
);
