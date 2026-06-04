import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  X, GitMerge, Plus, Printer, RefreshCw, FileDown, Filter,
  CheckSquare, Square, Edit2, Trash2, Tag, AlertCircle, Eye, 
  ChevronDown, ChevronRight, Package, LayoutGrid
} from 'lucide-react';
import { ItemMasterModal } from '../components/ItemMasterModal';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { useSettings } from '../context/SettingsContext';

// Sample stock data enriched with sku and purchase price
const INITIAL_ROWS = [
  { id: 1, productName: 'Wooden Chair', sku: 'FUR-WC-001', brandName: 'Brand A', category: 'Furniture', gst: '18%', hsn: '9401', unit: 'PCS', purchasePrice: 800, mrp: 1200, sale: 999, stock: 45, warehouse: 'Main Warehouse', status: 'Active' },
  { id: 2, productName: 'Steel Table', sku: 'FUR-ST-002', brandName: 'Brand B', category: 'Furniture', gst: '12%', hsn: '9403', unit: 'PCS', purchasePrice: 4000, mrp: 5500, sale: 4800, stock: 12, warehouse: 'Store Room 1', status: 'Active' },
  { id: 3, productName: 'Cotton Fabric', sku: 'RAW-CF-101', brandName: 'Brand C', category: 'Raw Material', gst: '5%', hsn: '5208', unit: 'MTR', purchasePrice: 150, mrp: 250, sale: 200, stock: 8, warehouse: 'Main Warehouse', status: 'Active' },
  { id: 4, productName: 'Plastic Box', sku: 'PKG-PB-201', brandName: 'Brand A', category: 'Packaging', gst: '18%', hsn: '3923', unit: 'BOX', purchasePrice: 20, mrp: 35, sale: 28, stock: 200, warehouse: 'Store Room 2', status: 'Active' },
  { id: 5, productName: 'Iron Rod', sku: 'RAW-IR-301', brandName: 'Brand D', category: 'Raw Material', gst: '18%', hsn: '7213', unit: 'KGS', purchasePrice: 120, mrp: 180, sale: 155, stock: 0, warehouse: 'Main Warehouse', status: 'Inactive' },
  { id: 6, productName: 'Dining Table', sku: 'FUR-DT-003', brandName: 'Brand A', category: 'Furniture', gst: '18%', hsn: '9403', unit: 'PCS', purchasePrice: 12000, mrp: 18000, sale: 15000, stock: 5, warehouse: 'Main Warehouse', status: 'Active' },
];

export function StockDetails() {
  const navigate = useNavigate();
  const { formatAmount, currentCurrency } = useSettings();
  const [viewMode, setViewMode] = useState('item'); // 'item' or 'brand'
  const [rows, setRows] = useState(INITIAL_ROWS);
  const [selected, setSelected] = useState(new Set());
  const [search, setSearch] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  const [stockFilter, setStockFilter] = useState('');
  const [warehouseFilter, setWarehouseFilter] = useState('');
  
  const [mergeModalOpen, setMergeModalOpen] = useState(false);
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [confirmAction, setConfirmAction] = useState(null);
  const [showBulkEdit, setShowBulkEdit] = useState(false);
  const [bulkEditFields, setBulkEditFields] = useState({ price: '', category: '', warehouse: '', status: '' });
  
  const [showPreview, setShowPreview] = useState(false);
  const [expandedBrands, setExpandedBrands] = useState(new Set());

  // Filtering
  const filtered = rows.filter(r => {
    const matchSearch = r.productName.toLowerCase().includes(search.toLowerCase()) ||
      r.brandName.toLowerCase().includes(search.toLowerCase()) ||
      r.sku.toLowerCase().includes(search.toLowerCase());
    const matchCat = !categoryFilter || r.category === categoryFilter;
    const matchWh = !warehouseFilter || r.warehouse === warehouseFilter;
    const matchStock = !stockFilter ||
      (stockFilter === 'low' && r.stock > 0 && r.stock < 10) ||
      (stockFilter === 'instock' && r.stock >= 10) ||
      (stockFilter === 'out' && r.stock === 0);
    return matchSearch && matchCat && matchStock && matchWh;
  });

  // Grouping for Brand View
  const brandData = {};
  filtered.forEach(r => {
    if (!brandData[r.brandName]) {
      brandData[r.brandName] = {
        name: r.brandName,
        items: [],
        totalQty: 0,
        totalValue: 0,
        lowStockCount: 0,
        outOfStockCount: 0
      };
    }
    const b = brandData[r.brandName];
    b.items.push(r);
    b.totalQty += r.stock;
    b.totalValue += (r.stock * r.sale);
    if (r.stock === 0) b.outOfStockCount++;
    else if (r.stock < 10) b.lowStockCount++;
  });
  const brandList = Object.values(brandData).sort((a, b) => a.name.localeCompare(b.name));

  const toggleBrandExpand = (bName) => {
    setExpandedBrands(prev => {
      const n = new Set(prev);
      n.has(bName) ? n.delete(bName) : n.add(bName);
      return n;
    });
  };

  // Bulk Selection
  const allSelected = filtered.length > 0 && filtered.every(r => selected.has(r.id));
  const toggleAll = () => {
    if (allSelected) {
      setSelected(prev => { const n = new Set(prev); filtered.forEach(r => n.delete(r.id)); return n; });
    } else {
      setSelected(prev => { const n = new Set(prev); filtered.forEach(r => n.add(r.id)); return n; });
    }
  };
  const toggleRow = (id) => setSelected(prev => { const n = new Set(prev); n.has(id) ? n.delete(id) : n.add(id); return n; });
  const selectedCount = selected.size;

  const triggerBulkAction = (action) => {
    if (selectedCount === 0) { alert('Please select at least one item first.'); return; }
    setConfirmAction(action);
    setShowConfirm(true);
  };

  const executeBulkAction = () => {
    setShowConfirm(false);
    if (confirmAction === 'delete') {
      setRows(prev => prev.filter(r => !selected.has(r.id)));
    } else if (confirmAction === 'activate') {
      setRows(prev => prev.map(r => selected.has(r.id) ? { ...r, status: 'Active' } : r));
    } else if (confirmAction === 'deactivate') {
      setRows(prev => prev.map(r => selected.has(r.id) ? { ...r, status: 'Inactive' } : r));
    } else if (confirmAction === 'bulkEdit') {
      setRows(prev => prev.map(r => {
        if (!selected.has(r.id)) return r;
        return {
          ...r,
          sale: bulkEditFields.price ? Number(bulkEditFields.price) : r.sale,
          category: bulkEditFields.category || r.category,
          warehouse: bulkEditFields.warehouse || r.warehouse,
          status: bulkEditFields.status || r.status,
        };
      }));
      setShowBulkEdit(false);
      setBulkEditFields({ price: '', category: '', warehouse: '', status: '' });
    }
    setSelected(new Set());
    setConfirmAction(null);
  };

  // Printing & Exporting
  const now = new Date().toLocaleString('en-IN', { dateStyle: 'medium', timeStyle: 'short' });
  const handlePrint = () => window.print();
  
  const handlePDF = async () => {
    const printElement = document.getElementById('print-report');
    if (!printElement) return;
    
    // Temporarily make it visible off-screen for html2canvas
    const originalDisplay = printElement.style.display;
    printElement.style.display = 'block';
    printElement.style.position = 'absolute';
    printElement.style.left = '-9999px';
    printElement.style.top = '-9999px';
    printElement.style.width = '210mm'; // A4 width
    printElement.style.padding = '15mm';
    printElement.style.background = 'white';
    printElement.style.color = 'black';
    
    try {
      const canvas = await html2canvas(printElement, { scale: 2, useCORS: true });
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
      
      let heightLeft = pdfHeight;
      let position = 0;
      
      pdf.addImage(imgData, 'PNG', 0, position, pdfWidth, pdfHeight);
      heightLeft -= pdf.internal.pageSize.getHeight();
      
      while (heightLeft >= 0) {
        position = heightLeft - pdfHeight;
        pdf.addPage();
        pdf.addImage(imgData, 'PNG', 0, position, pdfWidth, pdfHeight);
        heightLeft -= pdf.internal.pageSize.getHeight();
      }
      
      pdf.save(viewMode === 'brand' ? 'Brandwise_Inventory_Report.pdf' : 'Inventory_Stock_Report.pdf');
    } catch (err) {
      console.error("PDF generation failed", err);
      alert("Failed to generate PDF. Please try again.");
    } finally {
      // Restore styles
      printElement.style.display = originalDisplay;
      printElement.style.position = '';
      printElement.style.left = '';
      printElement.style.top = '';
      printElement.style.width = '';
      printElement.style.padding = '';
      printElement.style.background = '';
      printElement.style.color = '';
    }
  };
  
  const handleExportCSV = () => {
    if (viewMode === 'brand') {
      const headers = ['Brand Name', 'Total Items', 'Available Qty', `Total Value (${currentCurrency.symbol})`, 'Low Stock', 'Out of Stock'];
      const csvRows = [headers.join(',')];
      brandList.forEach(b => {
        csvRows.push([`"${b.name}"`, b.items.length, b.totalQty, b.totalValue, b.lowStockCount, b.outOfStockCount].join(','));
      });
      downloadBlob(csvRows.join('\n'), 'brandwise_inventory_report.csv');
    } else {
      const headers = ['#', 'SKU', 'Product Name', 'Brand', 'Category', 'Unit', 'Purchase Price', 'Sale Price', 'Stock', 'Warehouse', 'Status'];
      const csvRows = [headers.join(',')];
      filtered.forEach((r, i) => {
        csvRows.push([i+1, `"${r.sku}"`, `"${r.productName}"`, `"${r.brandName}"`, `"${r.category}"`, r.unit, r.purchasePrice, r.sale, r.stock, `"${r.warehouse}"`, r.status].join(','));
      });
      downloadBlob(csvRows.join('\n'), 'inventory_report.csv');
    }
  };

  const downloadBlob = (content, filename) => {
    const blob = new Blob([content], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a'); a.href = url; a.setAttribute('download', filename);
    document.body.appendChild(a); a.click(); document.body.removeChild(a);
  };

  const categories = [...new Set(INITIAL_ROWS.map(r => r.category))];
  const warehouses = [...new Set(INITIAL_ROWS.map(r => r.warehouse))];
  const grandTotal = filtered.reduce((s, r) => s + (r.sale * r.stock), 0);
  const totalStockQty = filtered.reduce((s, r) => s + r.stock, 0);

  return (
    <>
      {/* ======= PRINT STYLES ======= */}
      <style>{`
        @media print {
          body > * { display: none !important; }
          #print-report { display: block !important; }
          @page { margin: 15mm; size: A4 portrait; }
        }
        #print-report { display: none; }
      `}</style>

      {/* ======= HIDDEN PRINTABLE REPORT ======= */}
      <div id="print-report" style={{ fontFamily: 'Arial, sans-serif', fontSize: '11px', color: '#111' }}>
        <div style={{ textAlign: 'center', marginBottom: '15px', borderBottom: '2px solid #333', paddingBottom: '10px' }}>
          <div style={{ fontSize: '20px', fontWeight: 'bold' }}>Os Books</div>
          <div style={{ fontSize: '16px', fontWeight: 'bold', marginTop: '4px' }}>
            {viewMode === 'brand' ? 'Brand-wise Inventory Summary' : 'Inventory Stock Report'}
          </div>
          <div style={{ fontSize: '11px', color: '#555', marginTop: '4px' }}>Generated on: {now}</div>
        </div>

        <div style={{ display: 'flex', gap: '15px', marginBottom: '15px' }}>
          <div style={{ flex: 1, border: '1px solid #ddd', padding: '8px', textAlign: 'center', borderRadius: '4px' }}>
            <div style={{ fontSize: '10px', color: '#666' }}>Total Items</div>
            <div style={{ fontSize: '14px', fontWeight: 'bold', color: '#333' }}>{filtered.length}</div>
          </div>
          <div style={{ flex: 1, border: '1px solid #ddd', padding: '8px', textAlign: 'center', borderRadius: '4px' }}>
            <div style={{ fontSize: '10px', color: '#666' }}>Total Stock Qty</div>
            <div style={{ fontSize: '14px', fontWeight: 'bold', color: '#28a745' }}>{totalStockQty}</div>
          </div>
          <div style={{ flex: 1, border: '1px solid #ddd', padding: '8px', textAlign: 'center', borderRadius: '4px' }}>
            <div style={{ fontSize: '10px', color: '#666' }}>Total Stock Value</div>
            <div style={{ fontSize: '14px', fontWeight: 'bold', color: '#4F46E5' }}>{formatAmount(grandTotal)}</div>
          </div>
        </div>

        {viewMode === 'brand' ? (
          <div>
            {brandList.map((b, i) => (
              <div key={b.name} style={{ marginBottom: '15px', border: '1px solid #ccc', borderRadius: '4px', overflow: 'hidden' }}>
                <div style={{ background: '#f4f6f9', padding: '8px 10px', display: 'flex', justifyContent: 'space-between', fontWeight: 'bold', borderBottom: '1px solid #ccc' }}>
                  <span>{b.name}</span>
                  <span>Qty: {b.totalQty} | Value: {formatAmount(b.totalValue)}</span>
                </div>
                <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '10px' }}>
                  <thead>
                    <tr style={{ background: '#eaeaea' }}>
                      <th style={{ borderBottom: '1px solid #ddd', padding: '4px 8px', textAlign: 'left' }}>SKU / Item</th>
                      <th style={{ borderBottom: '1px solid #ddd', padding: '4px 8px', textAlign: 'center' }}>Unit</th>
                      <th style={{ borderBottom: '1px solid #ddd', padding: '4px 8px', textAlign: 'right' }}>Pur. Price</th>
                      <th style={{ borderBottom: '1px solid #ddd', padding: '4px 8px', textAlign: 'right' }}>Sale Price</th>
                      <th style={{ borderBottom: '1px solid #ddd', padding: '4px 8px', textAlign: 'right' }}>Qty</th>
                      <th style={{ borderBottom: '1px solid #ddd', padding: '4px 8px', textAlign: 'right' }}>Value</th>
                    </tr>
                  </thead>
                  <tbody>
                    {b.items.map(item => (
                      <tr key={item.id}>
                        <td style={{ borderBottom: '1px solid #eee', padding: '4px 8px' }}>
                          <div style={{ fontWeight: 'bold' }}>{item.productName}</div>
                          <div style={{ color: '#666', fontSize: '9px' }}>{item.sku}</div>
                        </td>
                        <td style={{ borderBottom: '1px solid #eee', padding: '4px 8px', textAlign: 'center' }}>{item.unit}</td>
                        <td style={{ borderBottom: '1px solid #eee', padding: '4px 8px', textAlign: 'right' }}>{formatAmount(item.purchasePrice)}</td>
                        <td style={{ borderBottom: '1px solid #eee', padding: '4px 8px', textAlign: 'right' }}>{formatAmount(item.sale)}</td>
                        <td style={{ borderBottom: '1px solid #eee', padding: '4px 8px', textAlign: 'right' }}>{item.stock}</td>
                        <td style={{ borderBottom: '1px solid #eee', padding: '4px 8px', textAlign: 'right' }}>{formatAmount(item.stock * item.sale)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ))}
          </div>
        ) : (
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '10px' }}>
            <thead>
              <tr style={{ background: '#343a40', color: '#fff' }}>
                <th style={{ border: '1px solid #ccc', padding: '5px', textAlign: 'left' }}>SKU / Product</th>
                <th style={{ border: '1px solid #ccc', padding: '5px', textAlign: 'left' }}>Brand</th>
                <th style={{ border: '1px solid #ccc', padding: '5px', textAlign: 'center' }}>Unit</th>
                <th style={{ border: '1px solid #ccc', padding: '5px', textAlign: 'right' }}>Pur. Price</th>
                <th style={{ border: '1px solid #ccc', padding: '5px', textAlign: 'right' }}>Sale Price</th>
                <th style={{ border: '1px solid #ccc', padding: '5px', textAlign: 'right' }}>Qty</th>
                <th style={{ border: '1px solid #ccc', padding: '5px', textAlign: 'right' }}>Value ({currentCurrency.symbol})</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map(r => (
                <tr key={r.id}>
                  <td style={{ border: '1px solid #ddd', padding: '4px' }}>
                    <div style={{ fontWeight: 'bold' }}>{r.productName}</div>
                    <div style={{ color: '#666', fontSize: '9px' }}>{r.sku}</div>
                  </td>
                  <td style={{ border: '1px solid #ddd', padding: '4px' }}>{r.brandName}</td>
                  <td style={{ border: '1px solid #ddd', padding: '4px', textAlign: 'center' }}>{r.unit}</td>
                  <td style={{ border: '1px solid #ddd', padding: '4px', textAlign: 'right' }}>{formatAmount(r.purchasePrice)}</td>
                  <td style={{ border: '1px solid #ddd', padding: '4px', textAlign: 'right' }}>{formatAmount(r.sale)}</td>
                  <td style={{ border: '1px solid #ddd', padding: '4px', textAlign: 'right' }}>{r.stock}</td>
                  <td style={{ border: '1px solid #ddd', padding: '4px', textAlign: 'right' }}>{formatAmount(r.stock * r.sale)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
        <div style={{ marginTop: '20px', fontSize: '9px', color: '#888', textAlign: 'center' }}>System-generated report from Os Books</div>
      </div>

      {/* ======= MAIN UI ======= */}
      <div className="bg-[#f4f6f9] min-h-[calc(100vh-45px)] flex flex-col p-3">
        <div className="bg-white rounded shadow-sm border border-gray-200 flex-1 flex flex-col overflow-hidden">

          {/* Header */}
          <div className="bg-[#4F46E5] px-4 py-2 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <h2 className="text-white text-[16px] font-medium tracking-wide">Stock / Inventory Summary</h2>
            <div className="flex flex-wrap items-center gap-2">
              <div className="flex bg-white/20 rounded p-1 mr-2">
                <button onClick={() => setViewMode('item')} className={`flex items-center gap-1.5 px-3 py-1 rounded text-[12px] font-bold transition-all ${viewMode === 'item' ? 'bg-white text-[#4F46E5] shadow' : 'text-white hover:bg-white/10'}`}>
                  <Package className="w-4 h-4" /> Item View
                </button>
                <button onClick={() => setViewMode('brand')} className={`flex items-center gap-1.5 px-3 py-1 rounded text-[12px] font-bold transition-all ${viewMode === 'brand' ? 'bg-white text-[#4F46E5] shadow' : 'text-white hover:bg-white/10'}`}>
                  <LayoutGrid className="w-4 h-4" /> Brand-wise
                </button>
              </div>

              {viewMode === 'item' && (
                <button onClick={() => setAddModalOpen(true)} className="flex items-center gap-1 bg-[#28a745] hover:bg-[#218838] text-white px-2.5 py-1.5 rounded-[3px] text-[13px] font-bold transition-colors">
                  <Plus className="w-4 h-4" strokeWidth={3} /> Add
                </button>
              )}
              
              <button onClick={() => setShowPreview(true)} className="flex items-center gap-1.5 bg-[#17a2b8] hover:bg-[#138496] text-white px-2.5 py-1.5 rounded-[3px] text-[13px] font-bold transition-colors">
                <Eye className="w-4 h-4" /> Preview
              </button>
              <button onClick={handlePDF} className="flex items-center gap-1.5 bg-[#dc3545] hover:bg-[#c82333] text-white px-2.5 py-1.5 rounded-[3px] text-[13px] font-bold transition-colors">
                <FileDown className="w-4 h-4" strokeWidth={2.5} /> PDF
              </button>
              <button onClick={handleExportCSV} className="flex items-center gap-1.5 bg-[#ffc107] hover:bg-[#e0a800] text-gray-900 px-2.5 py-1.5 rounded-[3px] text-[13px] font-bold transition-colors">
                <FileDown className="w-4 h-4" strokeWidth={2.5} /> Excel
              </button>
              <button onClick={() => navigate('/dashboard')} className="bg-[#dc3545] hover:bg-[#c82333] text-white p-1 rounded-[3px] transition-colors ml-1">
                <X className="w-5 h-5" strokeWidth={3} />
              </button>
            </div>
          </div>

          {/* Filter Bar */}
          <div className="p-3 bg-white border-b border-gray-200">
            <div className="flex flex-col sm:flex-row items-center gap-2">
              <div className="flex items-center flex-1 w-full bg-white border border-gray-300 rounded-[3px] overflow-hidden shadow-sm focus-within:border-blue-400">
                <div className="px-3 py-2 text-blue-500 bg-gray-50 border-r border-gray-300 flex-shrink-0"><FilterIcon className="w-4 h-4" /></div>
                <input type="text" value={search} onChange={e => setSearch(e.target.value)} placeholder="Search product, brand, or SKU..."
                  className="flex-1 min-w-0 px-3 py-2 text-[13px] outline-none bg-[#add8e6] text-[#0056b3] placeholder-[#0056b3]" />
              </div>
              <select value={categoryFilter} onChange={e => setCategoryFilter(e.target.value)} className="border border-gray-300 rounded-[3px] px-3 py-2 text-[13px] outline-none bg-white text-gray-700 shadow-sm w-full sm:w-[130px]">
                <option value="">All Categories</option>
                {categories.map(c => <option key={c}>{c}</option>)}
              </select>
              <select value={warehouseFilter} onChange={e => setWarehouseFilter(e.target.value)} className="border border-gray-300 rounded-[3px] px-3 py-2 text-[13px] outline-none bg-white text-gray-700 shadow-sm w-full sm:w-[130px]">
                <option value="">All Warehouses</option>
                {warehouses.map(w => <option key={w}>{w}</option>)}
              </select>
              <select value={stockFilter} onChange={e => setStockFilter(e.target.value)} className="border border-gray-300 rounded-[3px] px-3 py-2 text-[13px] outline-none bg-white text-gray-700 shadow-sm w-full sm:w-[130px]">
                <option value="">Stock Status</option>
                <option value="instock">In Stock</option>
                <option value="low">Low Stock</option>
                <option value="out">Out of Stock</option>
              </select>
            </div>
          </div>

          {/* Bulk Action Bar (Only in Item Mode) */}
          {viewMode === 'item' && selectedCount > 0 && (
            <div className="bg-indigo-50 border-b border-indigo-200 px-4 py-2 flex flex-wrap items-center gap-2">
              <span className="text-[13px] font-bold text-[#4F46E5]">{selectedCount} items selected</span>
              <div className="h-4 w-[1px] bg-indigo-200 mx-1 hidden sm:block"></div>
              <button onClick={() => setShowBulkEdit(true)} className="flex items-center gap-1.5 bg-[#4F46E5] hover:bg-[#4338ca] text-white px-3 py-1.5 rounded-[3px] text-[12px] font-bold transition-colors shadow-sm"><Edit2 className="w-3.5 h-3.5" /> Bulk Edit</button>
              <button onClick={() => triggerBulkAction('delete')} className="flex items-center gap-1.5 bg-[#dc3545] hover:bg-[#c82333] text-white px-3 py-1.5 rounded-[3px] text-[12px] font-bold transition-colors shadow-sm"><Trash2 className="w-3.5 h-3.5" /> Delete</button>
              <button onClick={() => setSelected(new Set())} className="ml-auto text-[12px] text-gray-500 hover:text-gray-800">Clear</button>
            </div>
          )}

          {/* Totals Header */}
          <div className="bg-[#343a40] text-white flex flex-col sm:grid sm:grid-cols-4 text-center border-b border-gray-600 py-2">
            <div className="font-bold text-[13px]">TOTAL ITEMS : {filtered.length}</div>
            <div className="font-bold text-[13px]">TOTAL STOCK : {totalStockQty}</div>
            <div className="font-bold text-[13px] text-red-400">LOW/OUT STOCK : {filtered.filter(r => r.stock < 10).length}</div>
            <div className="font-bold text-[13px] text-green-400">STOCK VALUE : {formatAmount(grandTotal)}</div>
          </div>

          {/* Data Table */}
          <div className="flex-1 overflow-auto bg-white">
            {viewMode === 'brand' ? (
              <div className="w-full">
                {brandList.length === 0 ? (
                  <div className="py-12 text-center text-gray-400 text-[14px]">No brands found.</div>
                ) : (
                  brandList.map((b) => {
                    const isExpanded = expandedBrands.has(b.name);
                    return (
                      <div key={b.name} className="border-b border-gray-200">
                        {/* Brand Row */}
                        <div 
                          className="flex items-center px-4 py-3 cursor-pointer hover:bg-gray-50 transition-colors"
                          onClick={() => toggleBrandExpand(b.name)}
                        >
                          <div className="flex items-center gap-3 w-[250px]">
                            {isExpanded ? <ChevronDown className="w-4 h-4 text-gray-500" /> : <ChevronRight className="w-4 h-4 text-gray-500" />}
                            <span className="font-bold text-[#4F46E5] text-[14px]">{b.name}</span>
                          </div>
                          <div className="flex-1 grid grid-cols-5 text-[13px]">
                            <div className="text-gray-600"><span className="font-medium text-gray-800">{b.items.length}</span> Items</div>
                            <div className="text-gray-600"><span className="font-bold text-green-700">{b.totalQty}</span> in Stock</div>
                            <div className="text-gray-600"><span className="font-bold text-gray-800">{formatAmount(b.totalValue)}</span> Value</div>
                            <div className="text-gray-600">{b.lowStockCount > 0 ? <span className="text-yellow-600 font-bold">{b.lowStockCount} Low</span> : '-'}</div>
                            <div className="text-gray-600">{b.outOfStockCount > 0 ? <span className="text-red-600 font-bold">{b.outOfStockCount} Out</span> : '-'}</div>
                          </div>
                        </div>
                        
                        {/* Expanded Items */}
                        {isExpanded && (
                          <div className="bg-gray-50 border-t border-gray-100 px-10 py-3">
                            <table className="w-full text-left bg-white border border-gray-200 rounded shadow-sm">
                              <thead className="bg-gray-100 border-b border-gray-200 text-gray-600 text-[12px]">
                                <tr>
                                  <th className="py-2 px-3">Item / SKU</th>
                                  <th className="py-2 px-3">Category</th>
                                  <th className="py-2 px-3 text-right">Pur. Price</th>
                                  <th className="py-2 px-3 text-right">Sale Price</th>
                                  <th className="py-2 px-3 text-right">Qty</th>
                                  <th className="py-2 px-3 text-right">Value</th>
                                </tr>
                              </thead>
                              <tbody>
                                {b.items.map(item => (
                                  <tr key={item.id} className="border-b border-gray-100 text-[12px] hover:bg-gray-50">
                                    <td className="py-2 px-3">
                                      <div className="font-bold text-gray-800">{item.productName}</div>
                                      <div className="text-gray-500 text-[10px] font-mono">{item.sku}</div>
                                    </td>
                                    <td className="py-2 px-3 text-gray-600">{item.category}</td>
                                    <td className="py-2 px-3 text-right text-gray-600">{formatAmount(item.purchasePrice)}</td>
                                    <td className="py-2 px-3 text-right font-bold text-gray-800">{formatAmount(item.sale)}</td>
                                    <td className="py-2 px-3 text-right">
                                      {item.stock === 0 ? <span className="text-red-600 font-bold">Out of Stock</span> :
                                       item.stock < 10 ? <span className="text-yellow-600 font-bold">{item.stock}</span> : 
                                       <span className="text-green-700 font-bold">{item.stock}</span>}
                                    </td>
                                    <td className="py-2 px-3 text-right font-bold text-[#4F46E5]">{formatAmount(item.stock * item.sale)}</td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>
                        )}
                      </div>
                    );
                  })
                )}
              </div>
            ) : (
              <table className="w-full text-left border-collapse">
                <thead className="sticky top-0 bg-gray-50 border-b border-gray-200 text-gray-600 text-[13px] z-10">
                  <tr>
                    <th className="py-2 px-3 w-8"><button onClick={toggleAll} className="text-gray-500">{allSelected ? <CheckSquare className="w-4 h-4 text-[#4F46E5]" /> : <Square className="w-4 h-4" />}</button></th>
                    <th className="py-2 px-3 font-medium">Product / SKU</th>
                    <th className="py-2 px-3 font-medium">Brand</th>
                    <th className="py-2 px-3 font-medium">Category</th>
                    <th className="py-2 px-3 font-medium text-right">Pur. Price</th>
                    <th className="py-2 px-3 font-medium text-right">Sale Price</th>
                    <th className="py-2 px-3 font-medium text-right">Stock</th>
                    <th className="py-2 px-3 font-medium">Warehouse</th>
                    <th className="py-2 px-3 font-medium text-center">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.length === 0 ? (
                    <tr><td colSpan="9" className="py-12 text-center text-gray-400">No stock items found.</td></tr>
                  ) : filtered.map((r) => (
                    <tr key={r.id} className={`border-b border-gray-100 text-[13px] transition-colors ${selected.has(r.id) ? 'bg-indigo-50' : 'hover:bg-gray-50'}`}>
                      <td className="py-2 px-3"><button onClick={() => toggleRow(r.id)} className="text-gray-400">{selected.has(r.id) ? <CheckSquare className="w-4 h-4 text-[#4F46E5]" /> : <Square className="w-4 h-4" />}</button></td>
                      <td className="py-2 px-3">
                        <div className="font-bold text-[#4F46E5]">{r.productName}</div>
                        <div className="text-gray-500 font-mono text-[11px]">{r.sku}</div>
                      </td>
                      <td className="py-2 px-3 text-gray-700">{r.brandName}</td>
                      <td className="py-2 px-3 text-gray-600">{r.category}</td>
                      <td className="py-2 px-3 text-right text-gray-600">{formatAmount(r.purchasePrice)}</td>
                      <td className="py-2 px-3 text-right font-bold text-gray-800">{formatAmount(r.sale)}</td>
                      <td className="py-2 px-3 text-right font-bold">
                        {r.stock === 0 ? <span className="text-red-600">0</span> : r.stock < 10 ? <span className="text-yellow-600 flex justify-end items-center gap-1"><AlertCircle className="w-3.5 h-3.5"/>{r.stock}</span> : r.stock}
                      </td>
                      <td className="py-2 px-3 text-gray-600 text-[12px]">{r.warehouse}</td>
                      <td className="py-2 px-3 text-center">
                        <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold uppercase ${r.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-600'}`}>{r.status}</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </div>

      {/* ======= PRINT PREVIEW MODAL ======= */}
      {showPreview && (
        <div className="fixed inset-0 z-[80] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4" onClick={() => setShowPreview(false)}>
          <div className="bg-white rounded-[3px] shadow-2xl w-full max-w-[min(98vw,900px)] max-h-[90vh] overflow-auto animate-in fade-in zoom-in duration-200" onClick={e => e.stopPropagation()}>
            <div className="bg-[#4F46E5] px-4 py-2.5 flex items-center justify-between sticky top-0 z-10">
              <h3 className="text-white font-bold text-[15px] flex items-center gap-2"><Eye className="w-5 h-5" /> Print Preview — {viewMode === 'brand' ? 'Brand-wise Report' : 'Inventory Report'}</h3>
              <div className="flex gap-2">
                <button onClick={() => { setShowPreview(false); setTimeout(() => window.print(), 100); }} className="flex items-center gap-1.5 bg-white text-[#4F46E5] px-3 py-1.5 rounded-[3px] text-[13px] font-bold hover:bg-gray-50 transition-colors">
                  <Printer className="w-4 h-4" /> Print Now
                </button>
                <button onClick={() => setShowPreview(false)} className="bg-[#dc3545] hover:bg-[#c82333] text-white p-1 rounded-[3px] transition-colors"><X className="w-5 h-5" strokeWidth={3} /></button>
              </div>
            </div>
            
            <div className="p-8 bg-white" style={{ fontFamily: 'Arial, sans-serif' }}>
              <div className="text-center border-b-2 border-gray-800 pb-4 mb-5">
                <div className="text-[20px] font-bold text-gray-900">Os Books</div>
                <div className="text-[16px] font-bold text-gray-700 mt-1">{viewMode === 'brand' ? 'Brand-wise Inventory Summary' : 'Inventory Stock Report'}</div>
                <div className="text-[11px] text-gray-400 mt-2">Generated on: {now}</div>
              </div>

              <div className="grid grid-cols-3 gap-4 mb-6">
                <div className="border border-gray-200 rounded p-3 text-center bg-gray-50"><div className="text-[11px] text-gray-500">Total Items</div><div className="text-[16px] font-bold text-gray-800">{filtered.length}</div></div>
                <div className="border border-gray-200 rounded p-3 text-center bg-gray-50"><div className="text-[11px] text-gray-500">Total Stock Qty</div><div className="text-[16px] font-bold text-green-700">{totalStockQty}</div></div>
                <div className="border border-gray-200 rounded p-3 text-center bg-gray-50"><div className="text-[11px] text-gray-500">Total Stock Value</div><div className="text-[16px] font-bold text-[#4F46E5]">{formatAmount(grandTotal)}</div></div>
              </div>

              {viewMode === 'brand' ? (
                <div>
                  {brandList.map(b => (
                    <div key={b.name} className="mb-5 border border-gray-300 rounded overflow-hidden">
                      <div className="bg-gray-100 px-3 py-2 flex justify-between font-bold border-b border-gray-300 text-[13px]">
                        <span>{b.name}</span>
                        <span className="text-gray-600">Qty: {b.totalQty} | Value: {formatAmount(b.totalValue)}</span>
                      </div>
                      <table className="w-full text-left text-[11px]">
                        <thead>
                          <tr className="bg-gray-50 text-gray-600">
                            <th className="py-1.5 px-3 border-b border-gray-200">SKU / Item</th>
                            <th className="py-1.5 px-3 border-b border-gray-200 text-center">Unit</th>
                            <th className="py-1.5 px-3 border-b border-gray-200 text-right">Pur. Price</th>
                            <th className="py-1.5 px-3 border-b border-gray-200 text-right">Sale Price</th>
                            <th className="py-1.5 px-3 border-b border-gray-200 text-right">Qty</th>
                            <th className="py-1.5 px-3 border-b border-gray-200 text-right">Value ({currentCurrency.symbol})</th>
                          </tr>
                        </thead>
                        <tbody>
                          {b.items.map(item => (
                            <tr key={item.id} className="border-b border-gray-100 last:border-0">
                              <td className="py-1.5 px-3"><strong>{item.productName}</strong> <span className="text-gray-400">({item.sku})</span></td>
                              <td className="py-1.5 px-3 text-center">{item.unit}</td>
                              <td className="py-1.5 px-3 text-right">{formatAmount(item.purchasePrice)}</td>
                              <td className="py-1.5 px-3 text-right font-bold">{formatAmount(item.sale)}</td>
                              <td className="py-1.5 px-3 text-right font-bold">{item.stock}</td>
                              <td className="py-1.5 px-3 text-right font-bold text-[#4F46E5]">{formatAmount(item.stock * item.sale)}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  ))}
                </div>
              ) : (
                <table className="w-full text-left text-[12px] border-collapse">
                  <thead>
                    <tr className="bg-[#343a40] text-white">
                      <th className="border border-gray-500 py-2 px-3">SKU / Product</th>
                      <th className="border border-gray-500 py-2 px-3">Brand</th>
                      <th className="border border-gray-500 py-2 px-3 text-right">Purchase</th>
                      <th className="border border-gray-500 py-2 px-3 text-right">Sale</th>
                      <th className="border border-gray-500 py-2 px-3 text-right">Qty</th>
                      <th className="border border-gray-500 py-2 px-3 text-right">Value ({currentCurrency.symbol})</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filtered.map((r, i) => (
                      <tr key={r.id} className={i % 2 === 1 ? 'bg-gray-50' : ''}>
                        <td className="border border-gray-200 py-1.5 px-3"><strong>{r.productName}</strong> <div className="text-[10px] text-gray-500 font-mono">{r.sku}</div></td>
                        <td className="border border-gray-200 py-1.5 px-3">{r.brandName}</td>
                        <td className="border border-gray-200 py-1.5 px-3 text-right">{formatAmount(r.purchasePrice)}</td>
                        <td className="border border-gray-200 py-1.5 px-3 text-right font-bold">{formatAmount(r.sale)}</td>
                        <td className="border border-gray-200 py-1.5 px-3 text-right font-bold">{r.stock}</td>
                        <td className="border border-gray-200 py-1.5 px-3 text-right font-bold text-[#4F46E5]">{formatAmount(r.stock * r.sale)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
              
              <div className="mt-8 text-center text-[10px] text-gray-400 border-t border-gray-200 pt-3">
                System-generated report — Os Books | The Digital Accounting Book
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Bulk Edit Modal */}
      {showBulkEdit && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
          <div className="bg-white rounded-[3px] shadow-2xl w-full max-w-[480px] overflow-hidden">
            <div className="bg-[#4F46E5] px-4 py-2.5 flex justify-between"><h3 className="text-white font-bold text-[15px]"><Edit2 className="w-4 h-4 inline mr-2"/> Bulk Edit</h3><button onClick={() => setShowBulkEdit(false)} className="text-white"><X className="w-5 h-5"/></button></div>
            <div className="p-5 flex flex-col gap-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col gap-1"><label className="text-[13px] font-bold text-gray-800">Sale Price</label><input type="number" placeholder="New price" value={bulkEditFields.price} onChange={e => setBulkEditFields(p => ({ ...p, price: e.target.value }))} className="border border-gray-300 rounded-[3px] px-3 py-2 text-[13px]"/></div>
                <div className="flex flex-col gap-1"><label className="text-[13px] font-bold text-gray-800">Category</label><select value={bulkEditFields.category} onChange={e => setBulkEditFields(p => ({ ...p, category: e.target.value }))} className="border border-gray-300 rounded-[3px] px-3 py-2 text-[13px]"><option value="">— No Change —</option>{categories.map(c => <option key={c}>{c}</option>)}</select></div>
                <div className="flex flex-col gap-1"><label className="text-[13px] font-bold text-gray-800">Warehouse</label><select value={bulkEditFields.warehouse} onChange={e => setBulkEditFields(p => ({ ...p, warehouse: e.target.value }))} className="border border-gray-300 rounded-[3px] px-3 py-2 text-[13px]"><option value="">— No Change —</option>{warehouses.map(w => <option key={w}>{w}</option>)}</select></div>
                <div className="flex flex-col gap-1"><label className="text-[13px] font-bold text-gray-800">Status</label><select value={bulkEditFields.status} onChange={e => setBulkEditFields(p => ({ ...p, status: e.target.value }))} className="border border-gray-300 rounded-[3px] px-3 py-2 text-[13px]"><option value="">— No Change —</option><option>Active</option><option>Inactive</option></select></div>
              </div>
            </div>
            <div className="bg-gray-50 px-5 py-3 flex justify-end gap-2 border-t border-gray-200">
              <button onClick={() => setShowBulkEdit(false)} className="bg-gray-200 px-4 py-2 rounded-[3px] text-[13px] font-medium">Cancel</button>
              <button onClick={() => { setConfirmAction('bulkEdit'); setShowConfirm(true); setShowBulkEdit(false); }} className="bg-[#4F46E5] text-white px-5 py-2 rounded-[3px] text-[13px] font-bold">Apply</button>
            </div>
          </div>
        </div>
      )}

      {/* Confirm Modal */}
      {showConfirm && (
        <div className="fixed inset-0 z-[70] flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
          <div className="bg-white rounded-[3px] shadow-2xl w-full max-w-[380px] overflow-hidden animate-in fade-in zoom-in duration-200">
            <div className={`px-4 py-2.5 ${confirmAction === 'delete' ? 'bg-[#dc3545]' : 'bg-[#4F46E5]'}`}>
              <h3 className="text-white font-bold text-[14px]">⚠️ Confirm Action</h3>
            </div>
            <div className="p-5">
              <p className="text-[14px] text-gray-700">You are about to <strong>{confirmAction}</strong> <strong>{selectedCount} item(s)</strong>.</p>
            </div>
            <div className="flex justify-end gap-2 px-5 pb-4">
              <button onClick={() => { setShowConfirm(false); setConfirmAction(null); }} className="bg-gray-200 px-4 py-2 rounded-[3px] text-[13px] font-medium">Cancel</button>
              <button onClick={executeBulkAction} className={`text-white px-5 py-2 rounded-[3px] text-[13px] font-bold ${confirmAction === 'delete' ? 'bg-[#dc3545]' : 'bg-[#4F46E5]'}`}>Confirm</button>
            </div>
          </div>
        </div>
      )}

      <ItemMasterModal isOpen={addModalOpen} onClose={() => setAddModalOpen(false)} />
    </>
  );
}

const FilterIcon = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" />
  </svg>
);
