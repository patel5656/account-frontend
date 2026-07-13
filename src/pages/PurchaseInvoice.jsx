import React, { useState, useRef, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { 
  X, Search, Calendar, DownloadCloud, RefreshCw, PlusSquare,
  Edit, Check, Printer, ChevronDown, PlusCircle, Grip, Trash2, Image, Settings
} from 'lucide-react';
import { useSettings } from '../context/SettingsContext';
import apiClient from '../api/apiClient';
import { ProductMasterModal } from '../components/ProductMasterModal';
import { ProductSelectDropdown } from '../components/ProductSelectDropdown';

// Inline Youtube SVG to avoid lucide-react export issues
const YoutubeIcon = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M21.582,6.186c-0.23-0.86-0.908-1.538-1.768-1.768C18.254,4,12,4,12,4S5.746,4,4.186,4.418 c-0.86,0.23-1.538,0.908-1.768,1.768C2,7.746,2,12,2,12s0,4.254,0.418,5.814c0.23,0.86,0.908,1.538,1.768,1.768 C5.746,20,12,20,12,20s6.254,0,7.814-0.418c0.861-0.23,1.538-0.908,1.768-1.768C22,16.254,22,12,22,12S22,7.746,21.582,6.186z M10,15.464V8.536L16,12L10,15.464z" />
  </svg>
);

const timeAgo = (dateParam) => {
  if (!dateParam) return 'No transaction';
  const date = new Date(dateParam);
  const today = new Date();
  const days = Math.round((today - date) / (1000 * 60 * 60 * 24));
  
  if (days === 0) return 'Today';
  if (days === 1) return 'Yesterday';
  if (days < 30) return `${days} days ago`;
  const months = Math.round(days / 30);
  if (months < 12) return `${months} month${months > 1 ? 's' : ''} ago`;
  const years = Math.round(months / 12);
  return `${years} year${years > 1 ? 's' : ''} ago`;
};

export function PurchaseInvoice() {
  const navigate = useNavigate();
  const location = useLocation();
  const { settings, formatAmount, currentCurrency } = useSettings();
  
  const isReturn = location.pathname.includes('purchase_return');
  const pageTitle = isReturn ? 'Purchase Return' : 'Purchase Invoice';
  const transactionType = isReturn ? 'PURCHASE_RETURN' : 'PURCHASE';

  // Toggles State
  const [isTaxIncluded, setIsTaxIncluded] = useState(true);
  const [paymentMode, setPaymentMode] = useState('Credit');

  const [invoiceDate, setInvoiceDate] = useState(new Date().toISOString().split('T')[0]);
  const dateInputRef = useRef(null);

  const formatDisplayDate = (dateString) => {
    if (!dateString) return "";
    const d = new Date(dateString);
    if (isNaN(d.getTime())) return dateString;
    return d.toLocaleDateString('en-GB', { day: '2-digit', month: '2-digit', year: 'numeric' }).replace(/\//g, '-');
  };

  const [suppliers, setSuppliers] = useState([]);
  const [products, setProducts] = useState([]);
  const [units, setUnits] = useState([]);
  const [isProductModalOpen, setIsProductModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [selectedSupplierId, setSelectedSupplierId] = useState("");
  const [supplierInput, setSupplierInput] = useState("");
  const [isBatchModalOpen, setIsBatchModalOpen] = useState(false);
  const [activeBatchRow, setActiveBatchRow] = useState(null);
  const [activeBatchDropdownRow, setActiveBatchDropdownRow] = useState(null);
  const [tempBatchData, setTempBatchData] = useState({ batchNo: '', expDate: '' });
  const [remark, setRemark] = useState("");
  const [invoiceNo, setInvoiceNo] = useState("");
  const [customerStats, setCustomerStats] = useState(null);

  useEffect(() => {
    if (selectedSupplierId) {
      apiClient.get(`/customers/${selectedSupplierId}/stats`)
        .then(res => {
          if (res.data.success) {
            setCustomerStats(res.data.data);
          }
        })
        .catch(err => {
          console.error('Failed to fetch stats', err);
          setCustomerStats(null);
        });
    } else {
      setCustomerStats(null);
    }
  }, [selectedSupplierId]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      // Assuming suppliers are kept in customers table or separate table. We fetch customers for now.
      const [custRes, prodRes, unitRes] = await Promise.all([
        apiClient.get('/customers'), // Ideally /suppliers
        apiClient.get('/products'),
        apiClient.get('/units')
      ]);
      if (custRes.data.success) setSuppliers(custRes.data.data);
      if (prodRes.data.success) setProducts(prodRes.data.data);
      if (unitRes.data?.success) setUnits(unitRes.data.data.map(u => u.name));
    } catch (error) {
      console.error('Failed to fetch data', error);
    }
  };

  const handleDeleteProduct = async (productId) => {
    if (!window.confirm("Are you sure you want to delete this product?")) return;
    try {
      await apiClient.delete(`/products/${productId}`);
      fetchData();
    } catch (error) {
      alert(error.response?.data?.message || "Failed to delete product.");
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
    disc1: "",
    disc1Type: '%',
    disc2: "",
    disc2Type: '%',
    imei: "",
    amount: 0,
    taxRate: 0
  });

  const [rows, setRows] = useState([createEmptyRow()]);

  const handleProductSelect = (index, productId) => {
    if (!productId) return;
    const product = products.find(p => p.id === parseInt(productId));
    if (!product) return;

    // Check if this product already exists in another row
    const existingIndex = rows.findIndex((r, i) => i !== index && parseInt(r.productId) === product.id);

    if (existingIndex !== -1) {
      // Product already in list — increment its qty, reset current row to empty
      const newRows = [...rows];
      newRows[existingIndex] = { ...newRows[existingIndex], qty: Number(newRows[existingIndex].qty) + 1 };
      newRows[index] = createEmptyRow(); // clear the row user was typing in
      setRows(newRows);
    } else {
      // New product — fill current row
      const newRows = [...rows];
      newRows[index] = {
        ...newRows[index],
        productId: product.id,
        mrp: product.mrp || 0,
        price: product.price || 0,
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
  const [manualDiscAmount, setManualDiscAmount] = useState('');
  const [manualFreightAmt, setManualFreightAmt] = useState('');
  const [manualFreightGst, setManualFreightGst] = useState('');
  const [manualTcsPercent, setManualTcsPercent] = useState('');
  const [manualTcsAmt, setManualTcsAmt] = useState('');
  const [manualDiscPercent, setManualDiscPercent] = useState('');
  const [showSummaryDiscDropdown, setShowSummaryDiscDropdown] = useState(false);

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
    let gstAmount = 0;
    if (isTaxIncluded) {
      gstAmount = amount - (amount / (1 + gstRate / 100));
    } else {
      gstAmount = amount * (gstRate / 100);
    }
    const cgst = gstAmount / 2;
    const sgst = gstAmount / 2;
    const igst = 0;

    totalGstAmount += gstAmount;
    totalCgst += cgst;
    totalSgst += sgst;
    totalIgst += igst;

    return { ...row, amount, gstRate, gstAmount, cgst, sgst, igst };
  });

  const appliedDiscAmount = manualDiscAmount !== "" ? Number(manualDiscAmount) : (settings.showDiscount ? totalRowDiscount : 0);
  
  const totalFreight = (parseFloat(manualFreightAmt) || 0) + 
                       (parseFloat(manualFreightAmt) || 0) * (parseFloat(manualFreightGst) || 0) / 100;

  const tempFinalAmount = Math.max(0, baseAmount - appliedDiscAmount) + totalFreight + (isTaxIncluded ? 0 : totalGstAmount);
  
  const appliedTcsPercent = parseFloat(manualTcsPercent) || 0;
  const calculatedTcsAmt = manualTcsAmt !== '' ? parseFloat(manualTcsAmt) : (tempFinalAmount * appliedTcsPercent) / 100;
  const finalCalculatedAmount = tempFinalAmount + calculatedTcsAmt;

  const allColumnIds = [
    'sno', 'productCode', 'product', 'batch', 'unit', 'mfgDate', 'expDate', 
    'hsn', 'gst', 'qty', 'freeQty', 'mrp', 'purchasePrice', 
    'salePrice', 'wsPrice', 'price', 'disc1', 'disc2', 'imei', 'amount', 'action'
  ];

  
  const colVisible = {
    sno: true, productCode: settings.showProductCode, product: true,
    batch: true, unit: settings.showUnit,
    mfgDate: settings.showMfgExpDate, expDate: settings.showMfgExpDate,
    hsn: settings.showHSN, gst: settings.showGST, qty: true, freeQty: true,
    mrp: settings.showMRP,
    purchasePrice: settings.showPurchasePrice, salePrice: false,
    wsPrice: false, price: true,
    disc1: settings.showDiscount, disc2: settings.showDiscount2,
    imei: settings.showIMEI, amount: true, action: true
  };

  const colWidths = {
    sno: '40px', productCode: '90px', product: '200px', batch: '90px', unit: '70px',
    mfgDate: '110px', expDate: '110px', hsn: '80px', gst: '80px', qty: '80px', freeQty: '80px',
    mrp: '80px', purchasePrice: '90px', salePrice: '90px', wsPrice: '90px',
    price: '100px', disc1: '110px', disc2: '110px', imei: '120px', amount: '100px', action: '80px'
  };

  const gridTemplateColumns = allColumnIds
    .filter(id => colVisible[id])
    .map(id => colWidths[id])
    .join(' ');
  const handleSave = async () => {
    if (!selectedSupplierId && !supplierInput.trim()) {
      alert("Please select or enter a company/supplier.");
      return;
    }

    const validRows = calculatedRows.filter(r => r.productId && r.qty > 0);
    if (validRows.length === 0) {
      alert("Please add at least one valid product.");
      return;
    }

    const payload = {
      invoiceNo: invoiceNo || `PUR-${Date.now()}`,
      date: invoiceDate,
      customerId: selectedSupplierId ? parseInt(selectedSupplierId) : supplierInput.trim(),
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
      tcsAmount: calculatedTcsAmt,
      status: paymentMode === 'Cash' ? 'PAID' : 'DUE',
      items: validRows.map(r => ({
        productId: parseInt(r.productId),
        productCode: r.productCode,
        unit: r.unit,
        batchNo: r.batchNo,
        mfgDate: r.mfgDate,
        expDate: r.expDate,
        quantity: Number(r.qty),
        freeQty: Number(r.freeQty),
        listPrice: Number(r.listPrice),
        mrp: Number(r.mrp),
        purchasePrice: Number(r.purchasePrice),
        salePrice: Number(r.salePrice),
        wholeSalePrice: Number(r.wholeSalePrice),
        price: Number(r.price),
        discount1: Number(r.disc1),
        discount2: Number(r.disc2),
        amount: Number(r.amount),
        gstRate: Number(r.gstRate) || 0,
        gstAmount: Number(r.gstAmount) || 0,
        cgst: Number(r.cgst) || 0,
        sgst: Number(r.sgst) || 0,
        igst: Number(r.igst) || 0,
        imei: r.imei
      }))
    };

    try {
      const res = await apiClient.post(`/inventory/${transactionType}`, payload);
      if (res.data) {
        alert("Purchase Invoice Saved Successfully!");
        navigate('/dashboard');
      }
    } catch (err) {
      alert("Error saving transaction.");
      console.error(err);
    }
  };

  return (
    <div className="bg-[#f4f6f9] min-h-[calc(100vh-45px)] flex flex-col relative pb-12 w-full overflow-x-hidden">
      <div className="bg-white m-3 mt-0 shadow-sm border border-gray-200 flex-1 flex flex-col min-w-0 rounded-[3px]">
        
        {/* Top Header */}
        <div className="bg-[#4F46E5] flex items-center justify-between px-3 py-1.5">
          <h2 className="text-white font-medium text-[15px]">{pageTitle}</h2>
          
          <div className="flex flex-wrap items-center gap-3">
            <div className="flex flex-wrap items-center gap-1.5">
              <span className={`text-white text-[13px] font-bold ${paymentMode === 'Credit' ? '' : 'opacity-50'}`}>Credit</span>
              <div 
                onClick={() => setPaymentMode(prev => prev === 'Cash' ? 'Credit' : 'Cash')}
                className={`w-[28px] h-[16px] rounded-full relative cursor-pointer border ${paymentMode === 'Cash' ? 'bg-[#117a8b] border-[#148ea1]' : 'bg-[#dc3545] border-[#c82333]'}`}
              >
                <div className={`w-[12px] h-[12px] bg-white rounded-full absolute top-[1px] transition-all ${paymentMode === 'Cash' ? 'right-[1px]' : 'left-[1px]'}`}></div>
              </div>
              <span className={`text-white text-[13px] font-bold ${paymentMode === 'Cash' ? '' : 'opacity-50'}`}>Cash</span>
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
              <label className="text-[13px] font-bold text-gray-800">Company Name</label>
              {customerStats && (
                <span className="text-[13px] font-bold text-[#dc3545]">Due Amount :{formatAmount(customerStats.dueAmount)}</span>
              )}
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <div className="flex-1 flex items-center">
                <input 
                  list="supplier-options"
                  value={supplierInput}
                  onChange={(e) => {
                    setSupplierInput(e.target.value);
                    const matched = suppliers.find(s => s.name.toLowerCase() === e.target.value.toLowerCase());
                    if (matched) setSelectedSupplierId(matched.id);
                    else setSelectedSupplierId("");
                  }}
                  placeholder="Select Supplier..."
                  className="w-full min-w-0 border border-gray-300 border-r-0 rounded-l-[3px] px-3 py-1.5 text-[13px] focus:outline-none focus:border-[#4F46E5] bg-white text-gray-800 font-bold"
                />
                <datalist id="supplier-options">
                  <option value="Select Supplier..." />
                  {suppliers.map(c => (
                    <option key={c.id} value={c.name} />
                  ))}
                </datalist>
                <button className="bg-[#4F46E5] text-white px-3 py-1.5 border border-[#4F46E5] rounded-r-[3px]">
                  <Search className="w-4 h-4" />
                </button>
              </div>
            </div>
            {customerStats && (
              <div className="flex flex-wrap gap-2 mt-0.5">
                <div className="bg-[#f8f9fa] border border-gray-200 px-3 py-1 rounded-[3px] flex flex-col items-center justify-center min-w-[100px]">
                  <span className="text-[11px] text-gray-500 font-bold flex items-center gap-1"><Calendar size={11}/> Joining</span>
                  <span className="text-[12px] font-bold text-gray-800">{formatDisplayDate(customerStats.joiningDate)}</span>
                </div>
                <div className="bg-[#e3f2fd] border border-[#bbdefb] px-3 py-1 rounded-[3px] flex flex-col items-center justify-center min-w-[100px]">
                  <span className="text-[11px] text-[#0277bd] font-bold flex items-center gap-1">Total Billing</span>
                  <span className="text-[12px] font-bold text-[#0288d1]">{formatAmount(customerStats.totalBilling)}</span>
                </div>
                <div className="bg-[#e8f5e9] border border-[#c8e6c9] px-3 py-1 rounded-[3px] flex flex-col items-center justify-center min-w-[100px]">
                  <span className="text-[11px] text-[#2e7d32] font-bold flex items-center gap-1">Last Transaction</span>
                  <span className="text-[12px] font-bold text-[#388e3c]">{timeAgo(customerStats.lastTransaction)}</span>
                </div>
              </div>
            )}
          </div>
          
          <div className="flex flex-col items-end justify-center gap-3">
             <div className="flex items-center justify-end w-full sm:max-w-[320px]">
               <label className="text-[13px] font-bold text-gray-800 w-[80px] text-right mr-2">Invoice No :</label>
               <div className="flex-1 flex items-center">
                 <input 
                   type="text" 
                   value={invoiceNo}
                   onChange={e => setInvoiceNo(e.target.value)}
                   placeholder="PUR-12345 (Auto)"
                   className="w-full min-w-0 border border-gray-300 rounded-[3px] px-3 py-1 text-[13px] bg-white text-gray-800 font-bold"
                 />
               </div>
             </div>
             <div className="flex items-center justify-end w-full sm:max-w-[320px]">
               <label className="text-[13px] font-bold text-gray-800 w-[80px] text-right mr-2">Date :</label>
               <div className="flex-1 flex items-center relative">
                 <input 
                   type="date"
                   ref={dateInputRef}
                   value={invoiceDate}
                   onChange={e => setInvoiceDate(e.target.value)}
                   className="absolute opacity-0 w-full h-full -z-10"
                 />
                 <input 
                   type="text" 
                   readOnly
                   value={formatDisplayDate(invoiceDate)}
                   className="w-full min-w-0 border border-gray-300 border-r-0 rounded-l-[3px] px-3 py-1 text-[13px] bg-white text-gray-600"
                 />
                 <button onClick={() => dateInputRef.current?.showPicker()} className="min-w-0 border border-gray-300 border-l-0 px-2 py-1 rounded-r-[3px] bg-white text-gray-500 hover:bg-gray-50">
                   <Calendar className="w-4 h-4" />
                 </button>
               </div>
             </div>
          </div>
        </div>

        {/* Data Table */}
        <div className="flex-1 min-h-[300px] overflow-x-auto">
          <div className="min-w-[1000px]">
            <div style={{ gridTemplateColumns }} className="bg-[#343a40] text-white grid text-center border-b border-gray-600">
              <div className="border-r border-gray-600 py-2 text-[12px] font-bold leading-tight flex flex-col justify-center hover:bg-gray-700 transition-colors">S.NO.</div>
              {settings.showProductCode && <div className="border-r border-gray-600 py-2 text-[12px] font-bold flex items-center justify-center hover:bg-gray-700 transition-colors">P.CODE</div>}
              <div className="border-r border-gray-600 py-2 text-[12px] font-bold flex items-center justify-center hover:bg-gray-700 transition-colors">PRODUCT NAME</div>
              <div className="border-r border-gray-600 py-2 text-[12px] font-bold flex items-center justify-center hover:bg-gray-700 transition-colors">BATCH NO</div>
              {settings.showUnit && <div className="border-r border-gray-600 py-2 text-[12px] font-bold flex items-center justify-center hover:bg-gray-700 transition-colors">UNIT</div>}
              {settings.showMfgExpDate && <div className="border-r border-gray-600 py-2 text-[12px] font-bold flex items-center justify-center hover:bg-gray-700 transition-colors">MFG DT</div>}
              {settings.showMfgExpDate && <div className="border-r border-gray-600 py-2 text-[12px] font-bold flex items-center justify-center text-red-300 hover:bg-gray-700 transition-colors">EXP DT</div>}
              {settings.showHSN && <div className="border-r border-gray-600 py-2 text-[12px] font-bold flex flex-col justify-center text-teal-300 hover:bg-gray-700 transition-colors">HSN</div>}
              {settings.showGST && <div className="border-r border-gray-600 py-2 text-[12px] font-bold flex flex-col justify-center text-teal-300 hover:bg-gray-700 transition-colors">GST %</div>}
              <div className="border-r border-gray-600 py-2 text-[12px] font-bold flex flex-col justify-center hover:bg-gray-700 transition-colors">QTY</div>
              <div className="border-r border-gray-600 py-2 text-[12px] font-bold text-[#ffc107] flex items-center justify-center hover:bg-gray-700 transition-colors">FREE</div>
              {settings.showMRP && <div className="border-r border-gray-600 py-2 text-[12px] font-bold flex items-center justify-center hover:bg-gray-700 transition-colors">MRP</div>}
              {settings.showPurchasePrice && <div className="border-r border-gray-600 py-2 text-[12px] font-bold flex items-center justify-center hover:bg-gray-700 transition-colors">PUR. P.</div>}
              <div className="border-r border-gray-600 py-2 text-[12px] font-bold flex flex-col justify-center leading-tight hover:bg-gray-700 transition-colors">
                <span className="font-normal text-[10px]">(TAX {isTaxIncluded ? 'INCLUDED' : 'EXCLUDED'})</span>
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
              {settings.showDiscount && <div className="border-r border-gray-600 py-2 text-[12px] font-bold flex items-center justify-center text-blue-300 hover:bg-gray-700 transition-colors">DISC 1</div>}
              {settings.showDiscount2 && <div className="border-r border-gray-600 py-2 text-[12px] font-bold flex items-center justify-center text-blue-300 hover:bg-gray-700 transition-colors">DISC 2</div>}
              {settings.showIMEI && <div className="border-r border-gray-600 py-2 text-[12px] font-bold flex items-center justify-center text-purple-300 hover:bg-gray-700 transition-colors">IMEI</div>}
              <div className="border-r border-gray-600 py-2 text-[12px] font-bold flex items-center justify-center hover:bg-gray-700 transition-colors">AMOUNT</div>
              <div className="py-2 text-[12px] font-bold flex items-center justify-center hover:bg-gray-700 transition-colors">ACTION</div>
            </div>

            <datalist id="unit-options">
              {units.map((u, i) => (
                <option key={i} value={u} />
              ))}
            </datalist>
            <datalist id="disc-options">
              <option value="5" />
              <option value="12" />
              <option value="18" />
              <option value="28" />
            </datalist>

            {calculatedRows.map((row, idx) => (
              <div key={idx} style={{ gridTemplateColumns }} className="grid bg-white border-b border-gray-200">
                <div className="border-r border-gray-200 flex items-center justify-center p-1 bg-gray-600 text-white font-bold text-[12px]">{idx + 1}</div>
                {settings.showProductCode && (
                  <div className="border-r border-gray-200 p-1 flex">
                    <input type="text" value={row.productCode} onChange={(e) => updateRow(idx, 'productCode', e.target.value)} placeholder="Code" className="w-full h-full border border-gray-200 rounded-[3px] px-1 text-[12px] outline-none" />
                  </div>
                )}
                <div className="border-r border-gray-200 p-1 flex relative">

                  <div className="flex-1 min-w-0">
                    <ProductSelectDropdown 
                      products={products}
                      value={row.productId}
                      onChange={(val) => handleProductSelect(idx, val)}
                      onEdit={(product) => {
                        setEditingProduct(product);
                        setIsProductModalOpen(true);
                      }}
                      onDelete={(productId) => handleDeleteProduct(productId)}
                    />
                  </div>
                </div>
                
                <div className="border-r border-gray-200 p-1 flex items-center justify-center relative">
                  <div className={`flex items-center justify-between w-full h-full border rounded-[3px] px-1 bg-[#b8e2f2] ${activeBatchDropdownRow === idx ? 'border-[#90c5da]' : 'border-transparent'}`}>
                    <input 
                      type="text" 
                      value={row.batchNo} 
                      onChange={(e) => updateRow(idx, 'batchNo', e.target.value)}
                      onClick={() => setActiveBatchDropdownRow(idx)}
                      onBlur={() => setTimeout(() => setActiveBatchDropdownRow(null), 200)}
                      placeholder="Batch No" 
                      className="w-full h-full bg-transparent text-[12px] outline-none text-gray-800 font-bold" 
                    />
                    <ChevronDown size={14} className="text-gray-400 cursor-pointer" onClick={() => setActiveBatchDropdownRow(idx === activeBatchDropdownRow ? null : idx)} />
                  </div>
                  
                  {activeBatchDropdownRow === idx && row.batchNo && (
                    <div className="absolute top-[calc(100%-4px)] left-1 min-w-[180px] bg-[#b8e2f2] shadow-md z-[60] border-t border-white rounded-b-[3px]">
                      <div 
                        className="p-1.5 flex justify-center items-center hover:bg-[#a5d7ea] transition-colors cursor-pointer"
                        onMouseDown={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          setActiveBatchDropdownRow(null);
                          setActiveBatchRow(idx);
                          setTempBatchData({ batchNo: row.batchNo || '', expDate: row.expDate || '' });
                          setIsBatchModalOpen(true);
                        }}
                      >
                        <span className="font-bold text-[#007bff] text-[14px]">Add item "{row.batchNo}"</span>
                      </div>
                    </div>
                  )}
                </div>

                {settings.showUnit && (
                  <div className="border-r border-gray-200 p-1 flex items-center justify-center">
                    <input 
                      type="text" 
                      list="unit-options"
                      value={row.unit} 
                      onChange={(e) => updateRow(idx, 'unit', e.target.value)} 
                      placeholder="Unit"
                      className="w-full h-full border border-gray-200 rounded-[3px] px-1 text-[12px] outline-none text-center bg-white"
                    />
                  </div>
                )}
                {settings.showMfgExpDate && (
                  <div className="border-r border-gray-200 p-1 flex items-center justify-center">
                    <input type="date" value={row.mfgDate} onChange={(e) => updateRow(idx, 'mfgDate', e.target.value)} className="w-full h-full border border-gray-200 rounded-[3px] px-1 text-[11px] outline-none" />
                  </div>
                )}
                {settings.showMfgExpDate && (
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
                   <input type="number" value={row.qty} onChange={(e) => updateRow(idx, 'qty', Number(e.target.value))} className="w-full h-full border border-gray-200 rounded-[3px] px-2 text-[13px] outline-none text-center font-bold" />
                </div>
                <div className="border-r border-gray-200 p-1">
                   <input type="number" value={row.freeQty} onChange={(e) => updateRow(idx, 'freeQty', Number(e.target.value))} className="w-full h-full border border-yellow-300 bg-yellow-50 rounded-[3px] px-2 text-[13px] outline-none text-center font-bold text-yellow-800" />
                </div>
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
                
                <div className="border-r border-gray-200 p-1 flex flex-col justify-center">
                  <input type="number" value={row.price} onChange={(e) => updateRow(idx, 'price', Number(e.target.value))} className="w-full h-full border border-gray-200 rounded-[3px] px-2 text-[13px] outline-none text-right font-bold transition-colors bg-blue-50 border-blue-200" />
                </div>

                {settings.showDiscount && (
                  <div className="border-r border-gray-200 p-1 flex">
                     <input list="disc-options" type="text" value={row.disc1} onChange={(e) => updateRow(idx, 'disc1', e.target.value)} className="w-[60%] border border-blue-200 rounded-l-[3px] px-1 text-[13px] outline-none border-r-0 text-center text-blue-800 bg-blue-50" />
                      <select value={row.disc1Type} onChange={(e) => updateRow(idx, 'disc1Type', e.target.value)} className="w-[40%] border border-blue-200 rounded-r-[3px] px-0 text-[12px] outline-none bg-blue-100 text-blue-800 appearance-none text-center">
                        <option value="%">%</option>
                        <option value={currentCurrency.symbol}>{currentCurrency.symbol}</option>
                      </select>
                  </div>
                )}
                {settings.showDiscount2 && (
                  <div className="border-r border-gray-200 p-1 flex">
                     <input list="disc-options" type="text" value={row.disc2} onChange={(e) => updateRow(idx, 'disc2', e.target.value)} className="w-[60%] border border-blue-200 rounded-l-[3px] px-1 text-[13px] outline-none border-r-0 text-center text-blue-800 bg-blue-50" />
                      <select value={row.disc2Type} onChange={(e) => updateRow(idx, 'disc2Type', e.target.value)} className="w-[40%] border border-blue-200 rounded-r-[3px] px-0 text-[12px] outline-none bg-blue-100 text-blue-800 appearance-none text-center">
                        <option value="%">%</option>
                        <option value={currentCurrency.symbol}>{currentCurrency.symbol}</option>
                      </select>
                  </div>
                )}

                {settings.showIMEI && (
                  <div className="border-r border-gray-200 p-1 flex items-center justify-center">
                      <input type="text" placeholder="IMEI..." value={row.imei || ''} onChange={(e) => updateRow(idx, 'imei', e.target.value)} className="w-full h-full border border-purple-200 bg-purple-50 rounded-[3px] px-1 text-[11px] outline-none text-purple-800" />
                  </div>
                )}

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
          <div className="flex flex-col gap-4">
            <div className="summary-stats grid grid-cols-4 gap-2">
              <div className="border border-gray-200 bg-[#f8f9fa] rounded-[3px] p-2 flex flex-col items-center justify-center text-center">
                <span className="text-[12px] font-bold text-gray-700">Total Qty</span>
                <span className="text-[14px] font-bold text-[#007bff]">{totalQty}</span>
              </div>
              <div className="border border-gray-200 bg-[#f8f9fa] rounded-[3px] p-2 flex flex-col items-center justify-center text-center">
                <span className="text-[12px] font-bold text-gray-700">Taxable</span>
                <span className="text-[14px] font-bold text-[#28a745]">{formatAmount(finalCalculatedAmount)}</span>
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
              <textarea value={remark} onChange={(e) => setRemark(e.target.value)} placeholder="Remark..." className="w-full border border-gray-300 rounded-[3px] px-3 py-1.5 text-[13px] focus:outline-none focus:border-[#4F46E5] h-[40px]" />
            </div>
          </div>

          <div className="flex flex-col gap-3">
             <div className="flex items-center justify-between">
               <span className="text-[13px] font-bold text-gray-800">Subtotal:</span>
               <div className="w-[200px] bg-[#e9ecef] border border-gray-300 rounded-[3px] px-3 py-1 text-[13px] text-gray-800 font-bold text-right">
                 {formatAmount(baseAmount)}
               </div>
             </div>

             {!settings.hideTotalDiscount && (
               <div className="flex justify-between items-start">
                 <span className="text-[13px] font-bold text-gray-800 mt-3">Discount:</span>
                 <div className="w-[200px] flex gap-2">
                   <div className="flex-1 relative mt-[18px]">
                     <span className="absolute -top-[18px] left-0 text-[11px] font-bold text-gray-800">Dis.%</span>
                     <div className="relative">
                       <input 
                         type="text" 
                         value={manualDiscPercent}
                         onChange={(e) => {
                           setManualDiscPercent(e.target.value);
                           if (e.target.value) {
                             setManualDiscAmount((baseAmount * Number(e.target.value) / 100).toFixed(2));
                           } else {
                             setManualDiscAmount('');
                           }
                         }}
                         onFocus={() => setShowSummaryDiscDropdown(true)}
                         onBlur={() => setTimeout(() => setShowSummaryDiscDropdown(false), 200)}
                         className="w-full border border-gray-300 rounded-[3px] py-1 pl-2 pr-6 text-[13px] text-right text-blue-700 font-bold" 
                       />
                       <div className="absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none text-blue-600 text-[10px]">
                         ▼
                       </div>
                     </div>
                     {showSummaryDiscDropdown && (
                        <div className="absolute top-full left-0 w-full bg-white border border-gray-300 shadow-lg z-50 rounded-b-[3px] mt-[1px]">
                          {[5, 12, 18, 28].map(val => (
                            <div 
                              key={val} 
                              className="px-2 py-1.5 hover:bg-blue-50 cursor-pointer text-center text-[13px] text-gray-800 font-bold border-b border-gray-100 last:border-0"
                              onMouseDown={(e) => {
                                e.preventDefault();
                                setManualDiscPercent(val);
                                setManualDiscAmount((baseAmount * Number(val) / 100).toFixed(2));
                                setShowSummaryDiscDropdown(false);
                              }}
                            >
                              {val}
                            </div>
                          ))}
                        </div>
                     )}
                   </div>
                   <div className="flex-1 relative mt-[18px]">
                     <span className="absolute -top-[18px] left-0 text-[11px] font-bold text-gray-800">Dis. Amt</span>
                     <input type="number" value={manualDiscAmount !== "" ? manualDiscAmount : totalRowDiscount.toFixed(2)} onChange={(e) => setManualDiscAmount(e.target.value)} className="w-full border border-gray-300 rounded-[3px] px-2 py-1 text-[13px] text-right text-blue-700 font-bold" />
                   </div>
                 </div>
               </div>
             )}

              <div className="flex justify-between items-start">
                <span className="text-[13px] font-bold text-gray-800 mt-3">Fright Charges:</span>
                <div className="w-[200px] flex gap-2">
                  <div className="flex-1 relative mt-[18px]">
                    <span className="absolute -top-[18px] left-0 text-[11px] font-bold text-gray-800">Amount</span>
                    <div className="flex h-full">
                      <input type="number" value={manualFreightAmt !== "" ? manualFreightAmt : "0"} onChange={(e) => setManualFreightAmt(e.target.value)} className="w-full min-w-0 border border-gray-300 border-r-0 rounded-l-[3px] px-2 py-1 text-[13px] outline-none bg-white text-right" />
                      <button 
                        onClick={() => {
                          const addAmt = parseFloat(window.prompt("Enter amount to add to Freight Charges:", "0"));
                          if (!isNaN(addAmt) && addAmt > 0) {
                            setManualFreightAmt(String((parseFloat(manualFreightAmt) || 0) + addAmt));
                          }
                        }}
                        className="bg-[#e9ecef] border border-gray-300 border-l-0 px-2 rounded-r-[3px] flex items-center justify-center hover:bg-gray-200 transition-colors text-gray-700 font-bold"
                      >
                        +
                      </button>
                    </div>
                  </div>
                  <div className="flex-1 relative mt-[18px]">
                    <span className="absolute -top-[18px] left-0 text-[11px] font-bold text-gray-800">Gst %</span>
                    <input type="number" value={manualFreightGst !== "" ? manualFreightGst : "0"} onChange={(e) => setManualFreightGst(e.target.value)} className="w-full min-w-0 border border-gray-300 rounded-[3px] px-2 py-1 text-[13px] outline-none bg-white text-right" />
                  </div>
                </div>
              </div>

              <div className="flex justify-between items-start">
                <span className="text-[13px] font-bold text-gray-800 mt-3">TCS:</span>
                <div className="w-[200px] flex gap-2">
                  <div className="flex-1 relative mt-[18px]">
                    <span className="absolute -top-[18px] left-0 text-[11px] font-bold text-gray-800">TCS %</span>
                    <input type="number" value={manualTcsPercent !== "" ? manualTcsPercent : "0"} onChange={(e) => setManualTcsPercent(e.target.value)} className="w-full min-w-0 border border-gray-300 rounded-[3px] px-2 py-1 text-[13px] outline-none bg-white text-right text-[#4F46E5] font-bold" />
                  </div>
                  <div className="flex-1 relative mt-[18px]">
                    <span className="absolute -top-[18px] left-0 text-[11px] font-bold text-gray-800">TCS Amount</span>
                    <input type="number" value={manualTcsAmt !== "" ? manualTcsAmt : calculatedTcsAmt.toFixed(2)} onChange={(e) => setManualTcsAmt(e.target.value)} className="w-full min-w-0 border border-gray-300 rounded-[3px] px-2 py-1 text-[13px] outline-none bg-white text-right text-[#4F46E5] font-bold" />
                  </div>
                </div>
              </div>

             <div className="flex items-center justify-between mt-1">
               <span className="text-[13px] font-bold text-gray-800">Final Amount:</span>
               <div className="w-[200px] bg-[#e9ecef] border border-[#28a745] rounded-[3px] px-3 py-1 text-[14px] text-[#28a745] font-bold text-right">
                 {formatAmount(finalCalculatedAmount)}
               </div>
             </div>
          </div>
        </div>
      </div>

      {/* Fixed Bottom Action Bar */}
      <div className="fixed bottom-0 left-0 md:left-[220px] right-0 bg-[#343a40] z-40 px-2 sm:px-4 py-2 shadow-lg">
        <div className="flex items-center justify-center gap-2 max-w-[400px] mx-auto">
          <button onClick={handleSave} className="flex flex-1 items-center justify-center gap-1 bg-[#28a745] hover:bg-[#218838] text-white px-3 py-1.5 rounded-[3px] text-[13px] font-bold">
            <Check className="w-4 h-4" /> Save Purchase
          </button>
          
          <button 
            onClick={() => navigate('/dashboard')}
            className="flex items-center gap-1 bg-[#dc3545] hover:bg-[#c82333] text-white px-3 py-1.5 rounded-[3px] text-[13px]"
          >
            <X className="w-4 h-4" /> Cancel
          </button>
        </div>
      </div>

      {/* Product Master Modal */}
      <ProductMasterModal 
        isOpen={isProductModalOpen} 
        onClose={() => { setIsProductModalOpen(false); setEditingProduct(null); }}
        editProduct={editingProduct}
        onSubmit={(newProduct) => {
          fetchData(); // Refresh products list
        }}
      />

      {/* Batch Details Modal */}
      {isBatchModalOpen && (
        <div className="fixed inset-0 bg-black/30 z-[100] flex items-center justify-center">
          <div className="bg-white rounded-[4px] shadow-lg w-[450px] overflow-hidden flex flex-col">
            <div className="bg-[#007bff] px-3 py-2 flex items-center justify-between">
              <h3 className="text-white font-bold text-[15px]">Enter Batch Details</h3>
              <button onClick={() => setIsBatchModalOpen(false)} className="text-[#dc3545] hover:text-red-600">
                <X className="w-6 h-6" strokeWidth={3} />
              </button>
            </div>
            <div className="p-4 grid grid-cols-2 gap-4">
              <div className="flex flex-col gap-1">
                <label className="text-[13px] font-bold text-gray-800">Batch No :</label>
                <input 
                  type="text" 
                  value={tempBatchData.batchNo} 
                  onChange={(e) => setTempBatchData({ ...tempBatchData, batchNo: e.target.value })}
                  className="w-full border border-[#90c5da] bg-[#b8e2f2] rounded-[3px] px-2 py-1.5 text-[13px] outline-none text-gray-800 font-bold"
                  autoFocus
                />
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-[13px] font-bold text-gray-800">Expiry Date:</label>
                <input 
                  type="date" 
                  value={tempBatchData.expDate} 
                  onChange={(e) => setTempBatchData({ ...tempBatchData, expDate: e.target.value })}
                  className="w-full border border-gray-300 rounded-[3px] px-2 py-1.5 text-[13px] outline-none text-gray-800"
                />
              </div>
            </div>
            <div className="px-4 py-3 border-t border-gray-200 flex justify-end">
              <button 
                onClick={() => {
                  if (activeBatchRow !== null) {
                    const newRows = [...rows];
                    newRows[activeBatchRow].batchNo = tempBatchData.batchNo;
                    newRows[activeBatchRow].expDate = tempBatchData.expDate;
                    setRows(newRows);
                  }
                  setIsBatchModalOpen(false);
                }}
                className="border border-gray-800 text-gray-800 hover:bg-gray-100 px-4 py-1.5 rounded-[3px] text-[13px] font-medium transition-colors"
              >
                Okay
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
