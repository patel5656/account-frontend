import React, { useState } from 'react';
import { X, Settings, Image as ImageIcon, Plus } from 'lucide-react';

export function ProductMasterModal({ isOpen, onClose, onSubmit }) {
  const [isProduct, setIsProduct] = useState(true);
  const [isActive, setIsActive] = useState(true);
  const [isGstApplicable, setIsGstApplicable] = useState(true);
  const [toggles, setToggles] = useState({
    'More Info': false,
    'Raw Materials': false,
    'Sub Item': false,
    'Sub Inventory': false,
    'POS Quick Item': false
  });
  const [categories, setCategories] = useState(['Category A', 'Category B']);

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

          <div className="flex items-center w-[200px] justify-end">
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
            
            {/* Row 1: Product Name */}
            <div className="flex flex-col gap-1">
              <div className="flex items-center justify-between">
                <label className="text-[14px] font-bold text-gray-800">{isProduct ? 'Product Name' : 'Service Name'}</label>
                <div className="flex flex-wrap items-center gap-2">
                  <div 
                    className={`w-[32px] h-[18px] rounded-full relative cursor-pointer transition-colors ${isActive ? 'bg-[#0d6efd]' : 'bg-gray-300'}`}
                    onClick={() => setIsActive(!isActive)}
                  >
                    <div className={`w-[14px] h-[14px] bg-white rounded-full absolute top-[2px] shadow-sm transition-transform ${isActive ? 'translate-x-[16px]' : 'translate-x-[2px]'}`}></div>
                  </div>
                  <span className="text-[14px] font-bold text-gray-800 select-none">{isActive ? 'Active' : 'Inactive'}</span>
                </div>
              </div>
              <input 
                id="productName"
                type="text" 
                className="w-full border border-[#4F46E5] bg-[#e8e5ff] rounded-[3px] px-3 py-[6px] text-[14px] outline-none shadow-[0_0_0_0.2rem_rgba(79,70,229,0.25)]"
              />
            </div>

            {/* Row 2: Brand Name */}
            {isProduct && (
              <div className="flex flex-col gap-1">
                <label className="text-[14px] font-bold text-gray-800">Brand Name</label>
                <input 
                  type="text" 
                  list="brand-names-list"
                  className="w-full border border-gray-300 rounded-[3px] px-3 py-[6px] text-[14px] outline-none focus:border-[#4F46E5] text-gray-800 bg-white"
                  placeholder="Select or type brand name"
                />
                <datalist id="brand-names-list">
                  <option value="Brand A" />
                  <option value="Brand B" />
                  <option value="Brand C" />
                </datalist>
              </div>
            )}

            {/* Row 3: Gst and HSN */}
            <div className="grid grid-cols-[1fr_1fr] gap-4">
              <div className="flex flex-col gap-1">
                <div className="flex items-center justify-between">
                  <label className="text-[14px] font-bold text-gray-800">Gst</label>
                  <div 
                    className="flex flex-wrap items-center gap-2 cursor-pointer"
                    onClick={() => setIsGstApplicable(!isGstApplicable)}
                  >
                    <div className={`w-[32px] h-[18px] rounded-full relative transition-colors ${isGstApplicable ? 'bg-[#0d6efd]' : 'bg-gray-300'}`}>
                      <div className={`w-[14px] h-[14px] bg-white rounded-full absolute top-[2px] shadow-sm transition-transform ${isGstApplicable ? 'translate-x-[16px]' : 'translate-x-[2px]'}`}></div>
                    </div>
                    <span className="text-[13px] text-gray-600 select-none">Applicable : {isGstApplicable ? 'Yes' : 'No'}</span>
                  </div>
                </div>
                <input 
                  type="text"
                  placeholder="e.g. 18%"
                  className="w-full border border-gray-300 rounded-[3px] px-3 py-[6px] text-[14px] outline-none focus:border-[#4F46E5] text-gray-700 bg-white disabled:bg-gray-100 disabled:text-gray-400"
                  disabled={!isGstApplicable}
                />
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-[14px] font-bold text-gray-800">{isProduct ? 'HSN' : 'SAC / HSN'}</label>
                <input 
                  type="text" 
                  className="w-full border border-gray-300 rounded-[3px] px-3 py-[6px] text-[14px] outline-none focus:border-[#4F46E5]"
                />
              </div>
            </div>

            {/* Row 4: Table */}
            <div className="mt-1 border border-gray-200 rounded-[3px]">
              <div className="grid grid-cols-[2fr_1fr_1fr_0.5fr] bg-[#f8f9fa] border-b border-gray-200 text-center">
                <div className="py-2 font-bold text-[14px] text-gray-800 border-r border-gray-200">Unit</div>
                <div className="py-2 font-bold text-[14px] text-gray-800 border-r border-gray-200">MRP</div>
                <div className="py-2 font-bold text-[14px] text-gray-800 border-r border-gray-200">Sale</div>
                <div></div>
              </div>
              <div className="grid grid-cols-[2fr_1fr_1fr_0.5fr] p-2 gap-2">
                <input 
                  type="text"
                  list="unit-list"
                  defaultValue="pcs"
                  className="w-full border border-gray-300 rounded-[3px] px-3 py-[4px] text-[14px] outline-none focus:border-[#4F46E5] text-gray-800 bg-white font-bold"
                />
                <datalist id="unit-list">
                  <option value="pcs" />
                </datalist>
                <input 
                  id="salePrice"
                  type="text" 
                  defaultValue="0"
                  className="w-full border border-gray-300 rounded-[3px] px-3 py-[4px] text-[14px] outline-none focus:border-[#4F46E5]"
                />
                <input 
                  type="text" 
                  defaultValue="0"
                  className="w-full border border-gray-300 rounded-[3px] px-3 py-[4px] text-[14px] outline-none focus:border-[#4F46E5]"
                />
                <div></div>
              </div>
            </div>

            {/* Row 5: Units Master */}
            <div className="flex flex-wrap items-center gap-2">
              <input 
                id="categoryInput"
                type="text"
                list="category-names-list"
                className="flex-1 border border-gray-300 rounded-[3px] px-3 py-[6px] text-[14px] outline-none focus:border-[#4F46E5] text-gray-800 bg-white"
                placeholder="Select or type..."
              />
              <datalist id="category-names-list">
                {categories.map((cat, i) => <option key={i} value={cat} />)}
              </datalist>
              <button 
                type="button"
                onClick={() => {
                  const inputEl = document.getElementById('categoryInput');
                  const val = inputEl?.value.trim();
                  if (val && !categories.includes(val)) {
                    setCategories(prev => [...prev, val]);
                  }
                  if (inputEl) {
                    inputEl.value = '';
                    inputEl.focus();
                  }
                }}
                className="bg-[#28a745] hover:bg-[#218838] px-3 py-[6px] rounded-[3px] flex items-center justify-center transition-colors"
              >
                <Plus className="w-5 h-5 text-white" strokeWidth={3} />
              </button>
              <button className="border border-[#4F46E5] text-[#4F46E5] hover:bg-gray-50 px-3 py-[6px] rounded-[3px] flex items-center gap-1.5 transition-colors font-medium text-[14px]">
                <Settings className="w-4 h-4" strokeWidth={2.5} />
                Units Master
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
                <div className="p-3 border border-gray-200 rounded-[3px] bg-[#f8f9fa] flex flex-col gap-3 animate-in fade-in zoom-in-95 duration-200">
                  <h3 className="text-[13px] font-bold text-[#4F46E5] uppercase border-b border-gray-200 pb-1">More Information</h3>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="flex flex-col gap-1">
                      <label className="text-[12px] font-bold text-gray-700">Description</label>
                      <textarea className="w-full border border-gray-300 rounded-[3px] px-2 py-1.5 text-[13px] outline-none focus:border-[#4F46E5]" rows="2"></textarea>
                    </div>
                    <div className="flex flex-col gap-1 justify-between">
                      <div className="flex flex-col gap-1">
                        <label className="text-[12px] font-bold text-gray-700">Barcode / SKU</label>
                        <input type="text" className="w-full border border-gray-300 rounded-[3px] px-2 py-1.5 text-[13px] outline-none focus:border-[#4F46E5]" />
                      </div>
                      <div className="flex flex-col gap-1">
                        <label className="text-[12px] font-bold text-gray-700">Min. Stock Alert</label>
                        <input type="number" defaultValue="5" className="w-full border border-gray-300 rounded-[3px] px-2 py-1.5 text-[13px] outline-none focus:border-[#4F46E5]" />
                      </div>
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
            onClick={() => {
              if (onSubmit) {
                const pName = document.getElementById('productName')?.value || 'New Item';
                const sPrice = document.getElementById('salePrice')?.value || '0';
                const pDisplayName = document.getElementById('posDisplayName')?.value || pName;
                const pQuickPrice = document.getElementById('posQuickPrice')?.value;
                
                const finalPrice = toggles['POS Quick Item'] && pQuickPrice !== undefined && pQuickPrice !== "" 
                  ? parseFloat(pQuickPrice) 
                  : parseFloat(sPrice) || 0;
                
                onSubmit({
                  id: Date.now(),
                  name: toggles['POS Quick Item'] && pDisplayName.trim() !== '' ? pDisplayName : pName,
                  fullName: pName,
                  price: finalPrice,
                  barcode: '1000' + Math.floor(Math.random()*100),
                  tax: 0,
                  isQuickItem: toggles['POS Quick Item']
                });
              }
              onClose();
            }}
            className="bg-[#28a745] hover:bg-[#218838] text-white px-4 py-[7px] rounded-[3px] text-[14px] font-medium transition-colors shadow-sm"
          >
            Submit
          </button>
          <button 
            onClick={onClose}
            className="bg-[#dc3545] hover:bg-[#c82333] text-white px-4 py-[7px] rounded-[3px] text-[14px] font-medium transition-colors shadow-sm"
          >
            Close
          </button>
        </div>

      </div>
    </div>
  );
}
