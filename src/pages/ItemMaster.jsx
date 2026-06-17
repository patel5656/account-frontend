import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  X, 
  Plus, 
  Upload,
  Search,
  Filter
} from 'lucide-react';
import { ItemMasterModal } from '../components/ItemMasterModal';

export function ItemMaster() {
  const navigate = useNavigate();
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [rows, setRows] = useState([
    { id: 1, name: 'IPhone 15 Pro', category: 'Mobile Phones', brand: 'Apple', sku: 'SKU001', barcode: '1234567890', mrp: 130000, price: 120000, qty: 15, status: 'Active', hasBom: false, synced: true, memorySize: '256GB', colorVariant: 'Natural Titanium', designNo: 'A2848', enableImei: true },
    { id: 2, name: 'Finished Product A', category: 'Finished Goods', brand: 'Brand B', sku: 'SKU002', barcode: '0987654321', mrp: 600, price: 500, qty: 10, status: 'Active', hasBom: true, synced: false }
  ]);
  const [viewMode, setViewMode] = useState('items'); // 'items' | 'boms'

  const handleExport = () => {
    if (rows.length === 0) {
      const headers = ['#', 'Item Name', 'Item Category', 'Item Code', 'Unit', 'MRP', 'Sale Price', 'Purchase Price', 'Stock Qty', 'Status'];
      const csvRows = [headers.join(',')];
      const csvContent = csvRows.join('\n');
      const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'item_master.csv');
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      return;
    }
    
    // In a real application, logic to export actual rows would go here
  };

  return (
    <div className="bg-[#f4f6f9] min-h-[calc(100vh-45px)] flex flex-col p-3 relative">
      <div className="bg-white rounded shadow-sm border border-gray-200 flex-1 flex flex-col overflow-hidden">
        
        {/* Header */}
        <div className="bg-[#4F46E5] px-4 py-2 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <h2 className="text-white text-[16px] font-medium tracking-wide">Item Master Details</h2>
          
          <div className="flex flex-wrap items-center gap-2">
            <button 
              onClick={handleExport}
              className="flex items-center gap-1.5 bg-[#ffc107] hover:bg-[#e0a800] text-gray-900 px-3 py-1.5 rounded-[3px] text-[13px] font-bold transition-colors shadow-sm"
            >
              <Upload className="w-4 h-4" strokeWidth={2.5} />
              Export
            </button>
            <button 
              onClick={() => setCreateModalOpen(true)}
              className="flex items-center gap-1 bg-[#28a745] hover:bg-[#218838] text-white px-3 py-1.5 rounded-[3px] text-[13px] font-bold transition-colors shadow-sm"
            >
              <Plus className="w-4 h-4" strokeWidth={3} />
              Create New
            </button>
            <button 
              onClick={() => navigate('/dashboard')}
              className="bg-[#dc3545] hover:bg-[#c82333] text-white p-1 rounded-[3px] transition-colors shadow-sm"
            >
              <X className="w-5 h-5 font-bold" strokeWidth={3} />
            </button>
          </div>
        </div>

        {/* Filter Bar & View Toggle */}
        <div className="p-3 bg-white border-b border-gray-200">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-3">
            <div className="flex bg-gray-200 p-1 rounded-[3px] w-fit">
              <button 
                onClick={() => setViewMode('items')} 
                className={`px-4 py-1.5 text-[13px] font-bold rounded-[3px] transition-colors ${viewMode === 'items' ? 'bg-white shadow-sm text-[#4F46E5]' : 'text-gray-600 hover:text-gray-900'}`}
              >
                Item List
              </button>
              <button 
                onClick={() => setViewMode('boms')} 
                className={`px-4 py-1.5 text-[13px] font-bold rounded-[3px] transition-colors ${viewMode === 'boms' ? 'bg-white shadow-sm text-[#4F46E5]' : 'text-gray-600 hover:text-gray-900'}`}
              >
                BOM List
              </button>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center w-full max-w-full gap-2">
            <div className="flex items-center flex-1 bg-white border border-gray-300 rounded-[3px] focus-within:border-blue-500 overflow-hidden shadow-sm">
              <div className="px-3 text-blue-500 bg-gray-50 border-r border-gray-300 h-full flex items-center justify-center">
                <FilterIcon className="w-4 h-4" />
              </div>
              <select className="px-2 py-2 text-[13px] outline-none bg-transparent text-gray-700 border-r border-gray-300 min-w-[120px] font-medium">
                <option>All Search Options</option>
                <option>Item Name</option>
                <option>Item Code / SKU</option>
                <option>Barcode</option>
              </select>
              <input 
                type="text" 
                placeholder="Search products..." 
                className="flex-1 px-3 py-2 text-[13px] outline-none bg-transparent text-gray-800 placeholder-gray-400"
              />
            </div>
            
            <select className="border border-gray-300 rounded-[3px] px-3 py-2 text-[13px] outline-none bg-white text-gray-700 w-full sm:w-[150px] shadow-sm">
              <option value="">All Categories</option>
              <option value="raw">Raw Material</option>
              <option value="finished">Finished Goods</option>
            </select>

            <select className="border border-gray-300 rounded-[3px] px-3 py-2 text-[13px] outline-none bg-white text-gray-700 w-full sm:w-[140px] shadow-sm">
              <option value="">All Brands</option>
              <option value="branda">Brand A</option>
              <option value="brandb">Brand B</option>
            </select>

            <select className="border border-gray-300 rounded-[3px] px-3 py-2 text-[13px] outline-none bg-white text-gray-700 w-full sm:w-[130px] shadow-sm">
              <option value="">Stock Status</option>
              <option value="instock">In Stock</option>
              <option value="lowstock">Low Stock</option>
              <option value="outofstock">Out of Stock</option>
            </select>
          </div>
        </div>

        {/* Table Area */}
        <div className="flex-1 overflow-auto bg-white p-4">
          {rows.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-gray-400 gap-2 mt-10">
              <PackageIcon className="w-12 h-12 text-gray-300" />
              <p className="text-[14px]">No items found. Click "Create New" to add one.</p>
            </div>
          ) : (
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-50 border-y border-gray-200 text-gray-600 text-[13px]">
                  <th className="py-2 px-3 font-medium">#</th>
                  <th className="py-2 px-3 font-medium">Item Name</th>
                  <th className="py-2 px-3 font-medium">Variants & IMEI</th>
                  <th className="py-2 px-3 font-medium">Category</th>
                  <th className="py-2 px-3 font-medium">Brand</th>
                  <th className="py-2 px-3 font-medium">Code/SKU</th>
                  <th className="py-2 px-3 font-medium">Barcode</th>
                  <th className="py-2 px-3 font-medium text-right">MRP</th>
                  <th className="py-2 px-3 font-medium text-right">Sale Price</th>
                  <th className="py-2 px-3 font-medium text-right">Stock</th>
                  <th className="py-2 px-3 font-medium text-center">Status</th>
                  <th className="py-2 px-3 font-medium text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {rows.filter(r => viewMode === 'items' ? true : r.hasBom).map((row, idx) => (
                  <tr key={row.id} className="border-b border-gray-100 hover:bg-gray-50 text-[13px] transition-colors">
                    <td className="py-2 px-3 text-gray-500">{idx + 1}</td>
                    <td className="py-2 px-3 font-bold text-[#4F46E5]">
                      {row.name}
                      {row.hasBom && <span className="ml-2 bg-blue-100 text-blue-800 text-[9px] px-1.5 py-0.5 rounded-[3px] font-bold uppercase tracking-wide">BOM</span>}
                    </td>
                    <td className="py-2 px-3">
                      <div className="flex flex-wrap gap-1">
                        {row.memorySize && <span className="bg-gray-100 border border-gray-200 text-gray-700 text-[10px] px-1.5 py-0.5 rounded-[3px] leading-tight">{row.memorySize}</span>}
                        {row.colorVariant && <span className="bg-gray-100 border border-gray-200 text-gray-700 text-[10px] px-1.5 py-0.5 rounded-[3px] leading-tight">{row.colorVariant}</span>}
                        {row.enableImei && <span className="bg-purple-100 border border-purple-200 text-purple-800 text-[10px] px-1.5 py-0.5 rounded-[3px] font-bold leading-tight" title="IMEI Tracking Enabled">IMEI</span>}
                      </div>
                    </td>
                    <td className="py-2 px-3 text-gray-600">{row.category}</td>
                    <td className="py-2 px-3 text-gray-600 font-medium">{row.brand}</td>
                    <td className="py-2 px-3 text-gray-600">{row.sku}</td>
                    <td className="py-2 px-3 text-gray-600 font-mono text-[12px]">{row.barcode}</td>
                    <td className="py-2 px-3 text-gray-500 font-medium text-right">₹{row.mrp}</td>
                    <td className="py-2 px-3 text-gray-800 font-bold text-right">₹{row.price}</td>
                    <td className="py-2 px-3 text-gray-800 font-bold text-right">
                      {row.qty < 20 ? (
                        <span className="text-red-600">{row.qty}</span>
                      ) : (
                        row.qty
                      )}
                    </td>
                    <td className="py-2 px-3 text-center">
                      <span className="bg-green-100 text-green-800 text-[10px] px-2 py-0.5 rounded-full font-bold uppercase">
                        {row.status}
                      </span>
                    </td>
                    <td className="py-2 px-3">
                      <div className="flex items-center justify-end gap-1.5">
                        <button title="Stock Adjustment" onClick={() => navigate('/admin/stock_adjustment')} className="p-1 text-gray-400 hover:text-orange-500 hover:bg-orange-50 rounded-[3px] transition-colors">
                          <Settings2Icon className="w-4 h-4" />
                        </button>
                        <button title="Stock Transfer" onClick={() => navigate('/admin/godown_transfer')} className="p-1 text-gray-400 hover:text-indigo-500 hover:bg-indigo-50 rounded-[3px] transition-colors">
                          <ArrowRightLeftIcon className="w-4 h-4" />
                        </button>
                        <button title="Online Store Sync" onClick={() => alert(row.synced ? 'Item is already synced with online store.' : 'Syncing item with online store...')} className={`p-1 rounded-[3px] transition-colors ${row.synced ? 'text-green-600 hover:bg-green-50' : 'text-gray-400 hover:text-green-600 hover:bg-green-50'}`}>
                          <GlobeIcon className="w-4 h-4" />
                        </button>
                        <div className="w-[1px] h-3 bg-gray-300 mx-0.5"></div>
                        <button onClick={() => setCreateModalOpen(true)} className="text-[#4F46E5] hover:bg-indigo-50 px-2 py-1 rounded-[3px] font-bold transition-colors">Edit</button>
                      </div>
                    </td>
                  </tr>
                ))}
                {rows.filter(r => viewMode === 'items' ? true : r.hasBom).length === 0 && (
                  <tr>
                    <td colSpan="10" className="py-8 text-center text-gray-500 text-[13px]">
                      No {viewMode === 'boms' ? 'BOMs' : 'Items'} found matching your criteria.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          )}
        </div>

      </div>

      <ItemMasterModal 
        isOpen={createModalOpen} 
        onClose={() => setCreateModalOpen(false)} 
      />

    </div>
  );
}

const FilterIcon = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" />
  </svg>
);

const PackageIcon = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <line x1="16.5" y1="9.4" x2="7.5" y2="4.21"></line>
    <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path>
    <polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline>
    <line x1="12" y1="22.08" x2="12" y2="12"></line>
  </svg>
);

const BarcodeIcon = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M3 5v14M8 5v14M12 5v14M17 5v14M21 5v14"/>
  </svg>
);

const GlobeIcon = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <circle cx="12" cy="12" r="10"/>
    <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
    <path d="M2 12h20"/>
  </svg>
);

const Settings2Icon = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <circle cx="12" cy="12" r="3"/>
    <path d="M19.07 4.93a10 10 0 0 1 0 14.14M4.93 4.93a10 10 0 0 0 0 14.14"/>
  </svg>
);

const ArrowRightLeftIcon = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="m16 3 4 4-4 4"/>
    <path d="M20 7H4"/>
    <path d="m8 21-4-4 4-4"/>
    <path d="M4 17h16"/>
  </svg>
);
