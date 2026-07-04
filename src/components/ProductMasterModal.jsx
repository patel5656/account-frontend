import React, { useState, useEffect } from 'react';
import { X, Settings, Image as ImageIcon, Plus, RefreshCw, ChevronDown, Edit } from 'lucide-react';
import { ProductSettingModal } from './ProductSettingModal';
import apiClient from '../api/apiClient';
import { useSettings } from '../context/SettingsContext';

export function ProductMasterModal({ isOpen, onClose, onSubmit }) {
  const { settings: appSettings } = useSettings();
  const [isProduct, setIsProduct] = useState(appSettings?.defaultProductType !== 'Service');
  const [isActive, setIsActive] = useState(true);
  const [isGstApplicable, setIsGstApplicable] = useState(true);
  const [toggles, setToggles] = useState({
    'More Info': false,
    'Raw Materials': false,
    'Sub Item': false,
    'Sub Inventory': false,
    'POS Quick Item': false
  });
  const [categories, setCategories] = useState([]);
  const [units, setUnits] = useState([]);
  const [productTags, setProductTags] = useState([]);
  const [commissionTypes, setCommissionTypes] = useState([]);
  const [isSettingOpen, setIsSettingOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [settings, setSettings] = useState(null);

  useEffect(() => {
    if (isOpen) {
      apiClient.get('/categories')
        .then(res => {
          if (res.data?.data) setCategories(res.data.data.map(c => c.name));
        }).catch(err => console.error("Failed to load categories", err));
      
      apiClient.get('/units')
        .then(res => {
          if (res.data?.data) setUnits(res.data.data.map(u => u.name));
        }).catch(err => console.error("Failed to load units", err));

      apiClient.get('/settings')
        .then(res => {
          if (res.data?.data) setSettings(res.data.data);
        }).catch(err => console.error("Failed to load settings", err));

      apiClient.get('/product-tags')
        .then(res => {
          if (res.data?.data) setProductTags(res.data.data.map(t => t.name));
        }).catch(err => console.error("Failed to load product tags", err));

      apiClient.get('/commission-types')
        .then(res => {
          if (res.data?.data) setCommissionTypes(res.data.data.map(t => t.name));
        }).catch(err => console.error("Failed to load commission types", err));
    }
  }, [isOpen]);

  const handleQuickAdd = async (type) => {
    const name = window.prompt(`Enter new ${type} name:`);
    if (!name) return;
    try {
      if (type === 'Tag') {
        await apiClient.post('/product-tags', { name });
        setProductTags(prev => [...prev, name]);
      } else if (type === 'Commission Type') {
        await apiClient.post('/commission-types', { name });
        setCommissionTypes(prev => [...prev, name]);
      }
    } catch (error) {
      alert(`Failed to add ${type}`);
    }
  };

  const cols = ['100px', '1fr', '80px', '80px'];
  if (settings?.showWholesalePrice) cols.push('80px');
  if (settings?.showCreditSalePrice) cols.push('80px');
  if (settings?.showSpecialPrice) cols.push('80px');
  if (settings?.showSuperSpecialPrice) cols.push('80px');
  const gridColsStyle = { gridTemplateColumns: cols.join(' ') };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/40">
      <div className="bg-white rounded-[3px] shadow-2xl w-full sm:max-w-[750px] flex flex-col overflow-hidden animate-in fade-in zoom-in duration-200">
        
        {/* Header */}
        <div className="bg-[#4F46E5] flex items-center justify-between">
          <h2 className="text-[15px] text-white font-medium tracking-wide pl-4 py-2.5 w-[200px]">Product Master</h2>
          
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-white font-bold text-[14px]">Product</span>
            <div 
              className={`w-[36px] h-[18px] rounded-full relative cursor-pointer transition-colors ${isProduct ? 'bg-[#0056b3]' : 'bg-gray-300'}`}
              onClick={() => setIsProduct(!isProduct)}
            >
              <div className={`w-[14px] h-[14px] bg-white rounded-full absolute top-[2px] shadow-sm transition-transform ${isProduct ? 'translate-x-[20px]' : 'translate-x-[2px]'}`}></div>
            </div>
            <span className="text-white text-[13px]">Service</span>
          </div>

          <div className="flex items-center w-[200px] justify-end gap-2">
            <button 
              onClick={() => setIsSettingOpen(true)}
              className="text-white hover:text-gray-200 focus:outline-none mr-1"
            >
              <Settings className="w-4 h-4" strokeWidth={2} />
            </button>
            <button 
              onClick={onClose} 
              className="bg-[#dc3545] hover:bg-[#c82333] h-full px-3 py-2.5 focus:outline-none transition-colors"
            >
              <X className="w-5 h-5 text-white" strokeWidth={3} />
            </button>
          </div>
        </div>

        {/* Body */}
        <div className="p-4 bg-white overflow-y-auto max-h-[65vh]">
          <div className="flex flex-col gap-4">
            
            {/* Raw Product */}
            <div className="flex items-center gap-2 mb-2 pt-1">
              <div className="w-[32px] h-[18px] rounded-full relative bg-gray-300">
                <div className="w-[14px] h-[14px] bg-white rounded-full absolute top-[2px] shadow-sm left-[2px]"></div>
              </div>
              <span className="text-[13px] font-bold text-gray-500 select-none">Raw Product</span>
            </div>

            {/* Product Name */}
            <div className="flex flex-col gap-1">
              <label className="text-[13px] font-bold text-gray-800">Product Name</label>
              <div className="flex items-center gap-3">
                <input 
                  id="productName"
                  type="text" 
                  placeholder="Enter Product Name"
                  className="flex-1 border border-gray-300 rounded-[3px] px-3 py-[6px] text-[13px] outline-none focus:border-[#4F46E5]"
                />
                <div className="flex items-center gap-2">
                  <div 
                    className={`w-[32px] h-[18px] rounded-full relative cursor-pointer transition-colors ${isActive ? 'bg-[#4F46E5]' : 'bg-gray-300'}`}
                    onClick={() => setIsActive(!isActive)}
                  >
                    <div className={`w-[14px] h-[14px] bg-white rounded-full absolute top-[2px] shadow-sm transition-transform ${isActive ? 'translate-x-[16px]' : 'translate-x-[2px]'}`}></div>
                  </div>
                  <span className="text-[13px] font-bold text-gray-800 select-none">Active</span>
                </div>
              </div>
            </div>

            {/* Category */}
            <div className="flex flex-col gap-1">
              <label className="text-[13px] font-bold text-gray-800">Category</label>
              <select id="categorySelect" className="w-full border border-gray-300 rounded-[3px] px-3 py-[6px] text-[13px] outline-none focus:border-[#4F46E5]">
                <option value=""></option>
                {categories.map((c, i) => <option key={i} value={c}>{c}</option>)}
              </select>
            </div>

            {/* Gst and HSN */}
            <div className="grid grid-cols-[1fr_1fr] gap-4">
              <div className="flex flex-col gap-1">
                <div className="flex items-center justify-between">
                  <label className="text-[13px] font-bold text-gray-800">Gst</label>
                  <div className="flex flex-wrap items-center gap-2 cursor-pointer" onClick={() => setIsGstApplicable(!isGstApplicable)}>
                    <div className={`w-[32px] h-[18px] rounded-full relative transition-colors ${isGstApplicable ? 'bg-[#4F46E5]' : 'bg-gray-300'}`}>
                      <div className={`w-[14px] h-[14px] bg-white rounded-full absolute top-[2px] shadow-sm transition-transform ${isGstApplicable ? 'translate-x-[16px]' : 'translate-x-[2px]'}`}></div>
                    </div>
                    <span className="text-[12px] text-gray-600 select-none">Applicable : {isGstApplicable ? 'Yes' : 'No'}</span>
                  </div>
                </div>
                <select 
                  id="gstSelect"
                  className="w-full border border-gray-300 rounded-[3px] px-3 py-[6px] text-[13px] outline-none focus:border-[#4F46E5] bg-gray-100 text-gray-700 disabled:bg-gray-100 disabled:text-gray-400"
                  disabled={!isGstApplicable}
                >
                  <option value="0">@0 %</option>
                  <option value="5">@5 %</option>
                  <option value="12">@12 %</option>
                  <option value="18">@18 %</option>
                  <option value="28">@28 %</option>
                </select>
              </div>
              <div className="flex flex-col gap-1">
                <div className="flex items-center justify-between">
                  <label className="text-[13px] font-bold text-gray-800">HSN</label>
                  <RefreshCw className="w-3.5 h-3.5 text-[#4F46E5] cursor-pointer" />
                </div>
                <input id="hsnCode" type="text" className="w-full border border-gray-300 rounded-[3px] px-3 py-[6px] text-[13px] outline-none focus:border-[#4F46E5]" />
              </div>
            </div>

            {/* Table Area */}
            <div className="mt-1 bg-[#f8f9fa] border border-gray-200 rounded-[3px] p-2 overflow-x-auto custom-scrollbar">
              <div className="grid gap-2 mb-2 items-center text-center min-w-max" style={gridColsStyle}>
                <div className="font-bold text-[13px] text-gray-800">Unit</div>
                <div className="font-bold text-[13px] text-gray-800 flex items-center justify-center gap-1">
                  Barcode M <ChevronDown className="w-3.5 h-3.5 text-gray-500" />
                </div>
                <div className="font-bold text-[13px] text-gray-800">MRP</div>
                <div className="font-bold text-[13px] text-gray-800">Sale</div>
                {settings?.showWholesalePrice && <div className="font-bold text-[13px] text-gray-800">Wholesale</div>}
                {settings?.showCreditSalePrice && <div className="font-bold text-[13px] text-gray-800">Credit</div>}
                {settings?.showSpecialPrice && <div className="font-bold text-[13px] text-gray-800">Special</div>}
                {settings?.showSuperSpecialPrice && <div className="font-bold text-[13px] text-gray-800">Super Spc.</div>}
              </div>
              <div className="grid gap-2 items-center bg-white border border-gray-200 p-2 rounded-[3px] min-w-max" style={gridColsStyle}>
                <select id="unitSelect" className="w-full border border-gray-300 rounded-[3px] px-2 py-1.5 text-[13px] outline-none focus:border-[#4F46E5]">
                  {units.map((u, i) => <option key={i} value={u}>{u}</option>)}
                </select>
                <div className="flex items-center gap-2">
                  <input type="text" readOnly value="Auto" className="w-[60px] border border-gray-300 bg-gray-100 rounded-[3px] px-2 py-1.5 text-[13px] outline-none text-center text-gray-600" />
                  <input id="barcodeInput" type="text" placeholder="Scan or enter barcode" className="flex-1 border border-gray-300 rounded-[3px] px-2 py-1.5 text-[13px] outline-none focus:border-[#4F46E5]" />
                </div>
                <input id="mrpPrice" type="number" defaultValue="0" className="w-full border border-gray-300 rounded-[3px] px-2 py-1.5 text-[13px] outline-none text-center focus:border-[#4F46E5] text-blue-400 font-medium" />
                <input id="salePrice" type="number" defaultValue="0" className="w-full border border-gray-300 rounded-[3px] px-2 py-1.5 text-[13px] outline-none text-center focus:border-[#4F46E5]" />
                {settings?.showWholesalePrice && <input id="wholesalePrice" type="number" defaultValue="0" className="w-full border border-gray-300 rounded-[3px] px-2 py-1.5 text-[13px] outline-none text-center focus:border-[#4F46E5] text-purple-600 font-medium" />}
                {settings?.showCreditSalePrice && <input id="creditSalePrice" type="number" defaultValue="0" className="w-full border border-gray-300 rounded-[3px] px-2 py-1.5 text-[13px] outline-none text-center focus:border-[#4F46E5]" />}
                {settings?.showSpecialPrice && <input id="specialPrice" type="number" defaultValue="0" className="w-full border border-gray-300 rounded-[3px] px-2 py-1.5 text-[13px] outline-none text-center focus:border-[#4F46E5]" />}
                {settings?.showSuperSpecialPrice && <input id="superSpecialPrice" type="number" defaultValue="0" className="w-full border border-gray-300 rounded-[3px] px-2 py-1.5 text-[13px] outline-none text-center focus:border-[#4F46E5]" />}
              </div>
            </div>

            {/* Action Buttons Below Table */}
            <div className="flex justify-end gap-2 mt-0 mb-3">
              <button className="bg-[#28a745] hover:bg-[#218838] px-2 py-1.5 rounded-[3px] flex items-center justify-center transition-colors">
                <Plus className="w-4 h-4 text-white" strokeWidth={3} />
              </button>
              <button className="border border-[#28a745] text-[#28a745] hover:bg-green-50 px-3 py-1.5 rounded-[3px] flex items-center gap-1.5 transition-colors font-medium text-[13px]">
                <Edit className="w-3.5 h-3.5" /> Units Master
              </button>
            </div>

            {/* Row 6: Toggles */}
            <div className={`grid ${isProduct ? 'grid-cols-5' : 'grid-cols-2 max-w-[300px]'} pt-2 border-b border-gray-100 pb-2`}>
              {[
                'More Info', 
                ...(isProduct ? ['Raw Materials', 'Sub Item', 'Sub Inventory'] : []), 
                'POS Quick Item'
              ].map((label) => (
                <div key={label} className="flex flex-col items-center gap-1">
                  <div 
                    className={`w-[32px] h-[18px] rounded-full relative cursor-pointer transition-colors ${toggles[label] ? 'bg-[#0d6efd]' : 'bg-gray-300'}`}
                    onClick={() => setToggles(prev => ({ ...prev, [label]: !prev[label] }))}
                  >
                    <div className={`w-[14px] h-[14px] bg-white rounded-full absolute top-[2px] shadow-sm transition-transform ${toggles[label] ? 'translate-x-[16px]' : 'translate-x-[2px]'}`}></div>
                  </div>
                  <span className="text-[12px] font-bold text-gray-800 text-center">{label}</span>
                </div>
              ))}
            </div>

            {/* Expanded Panels */}
            <div className="flex flex-col gap-3">
              {toggles['More Info'] && (
                <div className="pt-2 animate-in fade-in zoom-in-95 duration-200">
                  <div className="grid grid-cols-5 gap-3 mb-3">
                    <div className="flex flex-col gap-1">
                      <div className="flex justify-between items-center">
                        <label className="text-[12px] font-bold text-gray-700">Commission Type</label>
                        <button onClick={() => handleQuickAdd('Commission Type')} className="text-[10px] text-blue-600 hover:underline">+ Add</button>
                      </div>
                      <select id="commissionType" className="w-full border border-gray-800 rounded-[3px] px-2 py-1.5 text-[13px] outline-none focus:border-[#4F46E5] text-gray-800 bg-white font-medium border-2">
                        <option value=""></option>
                        {commissionTypes.map((c, i) => <option key={i} value={c}>{c}</option>)}
                      </select>
                    </div>
                    <div className="flex flex-col gap-1">
                      <label className="text-[12px] font-bold text-gray-700">Size</label>
                      <input id="size" type="text" className="w-full border border-gray-300 rounded-[3px] px-2 py-1.5 text-[13px] outline-none focus:border-[#4F46E5]" />
                    </div>
                    <div className="flex flex-col gap-1">
                      <label className="text-[12px] font-bold text-gray-700">Colour</label>
                      <input id="colour" type="text" className="w-full border border-gray-300 rounded-[3px] px-2 py-1.5 text-[13px] outline-none focus:border-[#4F46E5]" />
                    </div>
                    <div className="flex flex-col gap-1">
                      <label className="text-[12px] font-bold text-gray-700">Expiry Month</label>
                      <input id="expiryMonth" type="text" defaultValue="0" className="w-full border border-gray-300 rounded-[3px] px-2 py-1.5 text-[13px] outline-none focus:border-[#4F46E5] text-center text-gray-500" />
                    </div>
                    <div className="flex flex-col gap-1">
                      <label className="text-[12px] font-bold text-gray-700">Location</label>
                      <input id="location" type="text" className="w-full border border-gray-300 rounded-[3px] px-2 py-1.5 text-[13px] outline-none focus:border-[#4F46E5]" />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-3 mb-3">
                    <div className="flex flex-col gap-1">
                      <label className="text-[12px] font-bold text-gray-700">Product Hindi Name</label>
                      <input id="hindiName" type="text" placeholder="Enter Hindi Name" className="w-full border border-gray-300 rounded-[3px] px-2 py-1.5 text-[13px] outline-none focus:border-[#4F46E5]" />
                    </div>
                    <div className="flex flex-col gap-1">
                      <label className="text-[12px] font-bold text-gray-700">Description</label>
                      <input id="description" type="text" className="w-full border border-gray-300 rounded-[3px] px-2 py-1.5 text-[13px] outline-none focus:border-[#4F46E5]" />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div className="flex flex-col gap-1">
                      <label className="text-[12px] font-bold text-gray-700">Terms & Condition</label>
                      <input id="termsCondition" type="text" className="w-full border border-gray-300 rounded-[3px] px-2 py-1.5 text-[13px] outline-none focus:border-[#4F46E5]" />
                    </div>
                    <div className="flex flex-col gap-1">
                      <div className="flex justify-between items-center">
                        <label className="text-[12px] font-bold text-gray-700">Product Tags</label>
                        <button onClick={() => handleQuickAdd('Tag')} className="text-[10px] text-blue-600 hover:underline">+ Add</button>
                      </div>
                      <select id="productTags" className="w-full border border-gray-300 rounded-[3px] px-2 py-1.5 text-[13px] outline-none focus:border-[#4F46E5] text-gray-800 bg-white">
                        <option value=""></option>
                        {productTags.map((t, i) => <option key={i} value={t}>{t}</option>)}
                      </select>
                    </div>
                  </div>
                </div>
              )}

              {isProduct && toggles['Raw Materials'] && (
                <div className="p-3 border border-gray-200 rounded-[3px] bg-[#f8f9fa] flex flex-col gap-3 animate-in fade-in zoom-in-95 duration-200">
                  <h3 className="text-[13px] font-bold text-[#4F46E5] uppercase border-b border-gray-200 pb-1">Raw Materials (BOM)</h3>
                  <div className="grid grid-cols-[2fr_1fr_0.5fr] gap-2 items-end">
                    <div className="flex flex-col gap-1">
                      <label className="text-[12px] font-bold text-gray-700">Material Name</label>
                      <input type="text" placeholder="Search material..." className="w-full border border-gray-300 rounded-[3px] px-2 py-1.5 text-[13px] outline-none focus:border-[#4F46E5]" />
                    </div>
                    <div className="flex flex-col gap-1">
                      <label className="text-[12px] font-bold text-gray-700">Quantity</label>
                      <input type="number" defaultValue="1" className="w-full border border-gray-300 rounded-[3px] px-2 py-1.5 text-[13px] outline-none focus:border-[#4F46E5]" />
                    </div>
                    <button className="bg-[#28a745] hover:bg-[#218838] text-white px-2 py-1.5 rounded-[3px] font-bold text-[13px] transition-colors h-[31px]">Add</button>
                  </div>
                </div>
              )}

              {isProduct && toggles['Sub Item'] && (
                <div className="p-3 border border-gray-200 rounded-[3px] bg-[#f8f9fa] flex flex-col gap-3 animate-in fade-in zoom-in-95 duration-200">
                  <h3 className="text-[13px] font-bold text-[#4F46E5] uppercase border-b border-gray-200 pb-1">Sub Items / Variants</h3>
                  <div className="grid grid-cols-[2fr_1fr_0.5fr] gap-2 items-end">
                    <div className="flex flex-col gap-1">
                      <label className="text-[12px] font-bold text-gray-700">Sub Item Name</label>
                      <input type="text" placeholder="E.g. Red Size M" className="w-full border border-gray-300 rounded-[3px] px-2 py-1.5 text-[13px] outline-none focus:border-[#4F46E5]" />
                    </div>
                    <div className="flex flex-col gap-1">
                      <label className="text-[12px] font-bold text-gray-700">Extra Price</label>
                      <input type="text" defaultValue="0" className="w-full border border-gray-300 rounded-[3px] px-2 py-1.5 text-[13px] outline-none focus:border-[#4F46E5]" />
                    </div>
                    <button className="bg-[#28a745] hover:bg-[#218838] text-white px-2 py-1.5 rounded-[3px] font-bold text-[13px] transition-colors h-[31px]">Add</button>
                  </div>
                </div>
              )}

              {isProduct && toggles['Sub Inventory'] && (
                <div className="p-3 border border-gray-200 rounded-[3px] bg-[#f8f9fa] flex flex-col gap-3 animate-in fade-in zoom-in-95 duration-200">
                  <h3 className="text-[13px] font-bold text-[#4F46E5] uppercase border-b border-gray-200 pb-1">Sub Inventory (Batch/Location)</h3>
                  <div className="grid grid-cols-3 gap-3">
                    <div className="flex flex-col gap-1">
                      <label className="text-[12px] font-bold text-gray-700">Batch Number</label>
                      <input type="text" className="w-full border border-gray-300 rounded-[3px] px-2 py-1.5 text-[13px] outline-none focus:border-[#4F46E5]" />
                    </div>
                    <div className="flex flex-col gap-1">
                      <label className="text-[12px] font-bold text-gray-700">Expiry Date</label>
                      <input type="date" className="w-full border border-gray-300 rounded-[3px] px-2 py-1.5 text-[13px] outline-none focus:border-[#4F46E5]" />
                    </div>
                    <div className="flex flex-col gap-1">
                      <label className="text-[12px] font-bold text-gray-700">Rack/Bin Location</label>
                      <input type="text" placeholder="E.g. Rack A1" className="w-full border border-gray-300 rounded-[3px] px-2 py-1.5 text-[13px] outline-none focus:border-[#4F46E5]" />
                    </div>
                  </div>
                </div>
              )}

              {toggles['POS Quick Item'] && (
                <div className="p-3 border border-gray-200 rounded-[3px] bg-[#f8f9fa] flex flex-col gap-3 animate-in fade-in zoom-in-95 duration-200">
                  <h3 className="text-[13px] font-bold text-[#4F46E5] uppercase border-b border-gray-200 pb-1">POS Quick Item Settings</h3>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="flex flex-col gap-1">
                      <label className="text-[12px] font-bold text-gray-700">Display Name on POS</label>
                      <input id="posDisplayName" type="text" placeholder="Short name for button..." className="w-full border border-gray-300 rounded-[3px] px-2 py-1.5 text-[13px] outline-none focus:border-[#4F46E5]" />
                    </div>
                    <div className="flex flex-col gap-1">
                      <label className="text-[12px] font-bold text-gray-700">Price</label>
                      <input id="posQuickPrice" type="number" defaultValue="0" className="w-full border border-gray-300 rounded-[3px] px-2 py-1.5 text-[13px] outline-none focus:border-[#4F46E5]" />
                    </div>
                  </div>
                </div>
              )}
            </div>

          </div>
        </div>

        {/* Footer */}
        <div className="bg-white px-5 py-4 flex justify-end gap-2 border-t border-gray-100">
          <button 
            disabled={isSubmitting}
            onClick={async () => {
              const pName = document.getElementById('productName')?.value;
              if (!pName) {
                alert("Product Name is required");
                return;
              }
              
              setIsSubmitting(true);
              
              try {
                const formData = {
                  name: pName,
                  sku: 'SKU-' + Date.now().toString().slice(-6),
                  status: isActive ? 'Active' : 'Inactive',
                  category: document.getElementById('categorySelect')?.value,
                  tax: isGstApplicable ? parseFloat(document.getElementById('gstSelect')?.value || 0) : 0,
                  hsnCode: document.getElementById('hsnCode')?.value,
                  baseUnit: document.getElementById('unitSelect')?.value,
                  barcode: document.getElementById('barcodeInput')?.value,
                  mrp: parseFloat(document.getElementById('mrpPrice')?.value || 0),
                  price: parseFloat(document.getElementById('salePrice')?.value || 0),
                  wholesalePrice: document.getElementById('wholesalePrice') ? parseFloat(document.getElementById('wholesalePrice').value || 0) : 0,
                  creditSalePrice: document.getElementById('creditSalePrice') ? parseFloat(document.getElementById('creditSalePrice').value || 0) : 0,
                  
                  
                  // More Info Fields
                  commissionType: document.getElementById('commissionType')?.value,
                  size: document.getElementById('size')?.value,
                  colour: document.getElementById('colour')?.value,
                  expiryMonth: document.getElementById('expiryMonth')?.value,
                  location: document.getElementById('location')?.value,
                  hindiName: document.getElementById('hindiName')?.value,
                  description: document.getElementById('description')?.value,
                  termsCondition: document.getElementById('termsCondition')?.value,
                  productTags: document.getElementById('productTags')?.value,
                };
                
                const response = await apiClient.post('/products', formData);
                
                if (onSubmit) {
                  // Ensure standard format that Invoice expects
                  const newProduct = response.data?.data || formData;
                  onSubmit({
                    id: newProduct.id || Date.now(),
                    name: newProduct.name,
                    fullName: newProduct.name,
                    price: newProduct.price,
                    barcode: newProduct.barcode || '1000' + Math.floor(Math.random()*100),
                    tax: newProduct.tax || 0,
                  });
                }
                onClose();
              } catch (error) {
                console.error("Failed to create product", error);
                alert(error.response?.data?.message || "Failed to create product");
              } finally {
                setIsSubmitting(false);
              }
            }}
            className="bg-[#28a745] hover:bg-[#218838] text-white px-4 py-[7px] rounded-[3px] text-[14px] font-medium transition-colors shadow-sm disabled:opacity-50"
          >
            {isSubmitting ? 'Submitting...' : 'Submit'}
          </button>
          <button 
            onClick={onClose}
            className="bg-[#dc3545] hover:bg-[#c82333] text-white px-4 py-[7px] rounded-[3px] text-[14px] font-medium transition-colors shadow-sm"
          >
            Close
          </button>
        </div>

      </div>
      <ProductSettingModal isOpen={isSettingOpen} onClose={() => setIsSettingOpen(false)} />
    </div>
  );
}
