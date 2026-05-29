import React, { useState } from 'react';
import { 
  X, Plus, Package, Barcode as BarcodeIcon, Globe, Image as ImageIcon, 
  Settings, RefreshCw, Printer, Box, AlertTriangle, History, ArrowRight 
} from 'lucide-react';

export function ItemMasterModal({ isOpen, onClose }) {
  const [isActive, setIsActive] = useState(true);
  const [activeTab, setActiveTab] = useState('basic');
  
  // Inventory tracking states
  const [enableBatch, setEnableBatch] = useState(false);
  const [enableExpiry, setEnableExpiry] = useState(false);

  // BOM states
  const [hasBom, setHasBom] = useState(false);
  const [isMultiLevel, setIsMultiLevel] = useState(false);
  
  // Online Sync states
  const [syncOnline, setSyncOnline] = useState(false);
  const [barcode, setBarcode] = useState('');

  if (!isOpen) return null;

  const tabs = [
    { id: 'basic', label: 'Basic Details', icon: Package },
    { id: 'inventory', label: 'Inventory & Tracking', icon: Box },
    { id: 'bom', label: 'Bill of Materials', icon: Settings },
    { id: 'barcode', label: 'Barcode', icon: BarcodeIcon },
    { id: 'online', label: 'Online Store', icon: Globe },
  ];

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
      <div className="bg-white rounded-[3px] shadow-2xl w-full max-w-[min(98vw,950px)] flex flex-col overflow-hidden animate-in fade-in zoom-in duration-200 h-[90vh] md:h-auto md:max-h-[90vh]">
        
        {/* Header */}
        <div className="bg-[#4F46E5] flex items-center justify-between">
          <h2 className="text-[15px] text-white font-medium tracking-wide pl-4 py-2.5 flex items-center gap-2">
            <Package className="w-5 h-5" />
            Advanced Item Master
          </h2>
          <button 
            onClick={onClose} 
            className="bg-[#dc3545] hover:bg-[#c82333] h-full px-3 py-2.5 focus:outline-none transition-colors"
          >
            <X className="w-5 h-5 text-white" strokeWidth={3} />
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="flex bg-gray-100 border-b border-gray-200 px-4 pt-3 gap-1 overflow-x-auto custom-scrollbar flex-shrink-0">
          {tabs.map(tab => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-4 py-2 text-[13px] font-bold rounded-t-[3px] transition-colors whitespace-nowrap ${
                  activeTab === tab.id 
                    ? 'bg-white text-[#4F46E5] border-x border-t border-gray-200 border-b-0 -mb-[1px] relative z-10' 
                    : 'text-gray-500 hover:text-gray-800 hover:bg-gray-200 border border-transparent'
                }`}
              >
                <Icon className="w-4 h-4" />
                {tab.label}
              </button>
            )
          })}
        </div>

        {/* Body content based on active tab */}
        <div className="p-4 md:p-6 bg-white overflow-y-auto custom-scrollbar flex-1 min-h-[400px]">
          
          {/* TAB 1: BASIC DETAILS */}
          {activeTab === 'basic' && (
            <div className="flex flex-col gap-6 animate-in fade-in duration-300">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex flex-col gap-1 w-full">
                  <div className="flex items-center justify-between mb-1">
                    <label className="text-[14px] font-bold text-gray-800">Item Name</label>
                    <div className="flex items-center gap-2">
                      <div 
                        className={`w-[32px] h-[18px] rounded-full relative cursor-pointer transition-colors ${isActive ? 'bg-[#0d6efd]' : 'bg-gray-300'}`}
                        onClick={() => setIsActive(!isActive)}
                      >
                        <div className={`w-[14px] h-[14px] bg-white rounded-full absolute top-[2px] shadow-sm transition-transform ${isActive ? 'translate-x-[16px]' : 'translate-x-[2px]'}`}></div>
                      </div>
                      <span className="text-[13px] font-bold text-gray-800 select-none">Active</span>
                    </div>
                  </div>
                  <input type="text" placeholder="Enter Item Name" className="w-full border border-[#4F46E5] bg-[#e8e5ff] placeholder-gray-500 rounded-[3px] px-3 py-2 text-[14px] outline-none focus:border-[#4F46E5] shadow-[0_0_0_0.2rem_rgba(79,70,229,0.25)] font-bold" />
                </div>
                <div className="flex flex-col gap-1 w-full md:mt-[25px]">
                  <label className="text-[14px] font-bold text-gray-800">Item Code / SKU</label>
                  <input type="text" placeholder="Enter Item Code / SKU" className="w-full border border-gray-300 rounded-[3px] px-3 py-2 text-[14px] outline-none focus:border-[#4F46E5] text-gray-800 bg-white" />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 border-b border-gray-100 pb-5">
                <div className="flex flex-col gap-1 w-full">
                  <div className="flex justify-between items-center">
                    <label className="text-[13px] font-bold text-gray-800">Category</label>
                    <button className="text-[11px] text-blue-600 hover:text-blue-800 font-bold flex items-center gap-0.5"><Plus className="w-3 h-3" /> Add</button>
                  </div>
                  <select className="w-full border border-gray-300 rounded-[3px] px-3 py-1.5 text-[13px] outline-none focus:border-[#4F46E5] text-gray-800 bg-white">
                    <option>Select Category</option>
                    <option>Raw Material</option>
                    <option>Finished Goods</option>
                  </select>
                </div>
                <div className="flex flex-col gap-1 w-full">
                  <div className="flex justify-between items-center">
                    <label className="text-[13px] font-bold text-gray-800">Brand</label>
                    <button className="text-[11px] text-blue-600 hover:text-blue-800 font-bold flex items-center gap-0.5"><Plus className="w-3 h-3" /> Add</button>
                  </div>
                  <select className="w-full border border-gray-300 rounded-[3px] px-3 py-1.5 text-[13px] outline-none focus:border-[#4F46E5] text-gray-800 bg-white">
                    <option>Select Brand</option>
                    <option>Brand A</option>
                    <option>Brand B</option>
                  </select>
                </div>
                <div className="flex flex-col gap-1 w-full">
                  <label className="text-[13px] font-bold text-gray-800">GST / Tax (%)</label>
                  <select className="w-full border border-gray-300 rounded-[3px] px-3 py-1.5 text-[13px] outline-none focus:border-[#4F46E5] text-gray-800 bg-white">
                    <option value="0">0%</option>
                    <option value="5">5%</option>
                    <option value="12">12%</option>
                    <option value="18">18%</option>
                    <option value="28">28%</option>
                  </select>
                </div>
              </div>

              {/* Advanced Unit System */}
              <div className="bg-blue-50 border border-blue-100 p-4 rounded-[3px]">
                <h4 className="text-[14px] font-bold text-blue-900 mb-3 flex items-center justify-between">
                  Unit Conversions
                  <button className="text-[12px] bg-white border border-blue-200 text-blue-700 px-2 py-1 rounded-[3px] shadow-sm flex items-center gap-1 hover:bg-blue-100 transition-colors">
                    <Plus className="w-3 h-3" /> Manage Units
                  </button>
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
                  <div className="flex flex-col gap-1 w-full">
                    <label className="text-[13px] font-bold text-gray-700">Base Unit (Reporting)</label>
                    <select className="w-full border border-gray-300 rounded-[3px] px-3 py-1.5 text-[13px] outline-none focus:border-blue-500 bg-white">
                      <option>PCS - Pieces</option>
                      <option>KGS - Kilograms</option>
                    </select>
                  </div>
                  <div className="flex flex-col gap-1 w-full">
                    <label className="text-[13px] font-bold text-gray-700">Purchase Unit</label>
                    <div className="flex">
                      <select className="w-2/3 border border-gray-300 border-r-0 rounded-l-[3px] px-2 py-1.5 text-[13px] outline-none focus:border-blue-500 bg-white">
                        <option>BOX</option>
                        <option>BAG</option>
                      </select>
                      <input type="text" placeholder="e.g. 12" className="w-1/3 border border-gray-300 rounded-r-[3px] px-2 py-1.5 text-[13px] outline-none text-center bg-white" title="Conversion to Base Unit" />
                    </div>
                    <span className="text-[10px] text-gray-500 mt-0.5">e.g. 1 BOX = 12 PCS</span>
                  </div>
                  <div className="flex flex-col gap-1 w-full">
                    <label className="text-[13px] font-bold text-gray-700">Sales Unit</label>
                    <div className="flex">
                      <select className="w-2/3 border border-gray-300 border-r-0 rounded-l-[3px] px-2 py-1.5 text-[13px] outline-none focus:border-blue-500 bg-white">
                        <option>PCS</option>
                        <option>BOX</option>
                      </select>
                      <input type="text" placeholder="e.g. 1" className="w-1/3 border border-gray-300 rounded-r-[3px] px-2 py-1.5 text-[13px] outline-none text-center bg-white" title="Conversion to Base Unit" />
                    </div>
                    <span className="text-[10px] text-gray-500 mt-0.5">e.g. 1 PCS = 1 PCS</span>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex flex-col gap-1 w-full">
                  <label className="text-[14px] font-bold text-gray-800">Purchase Price (Base Unit)</label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 font-bold">₹</span>
                    <input type="number" placeholder="0.00" className="w-full border border-gray-300 rounded-[3px] pl-7 pr-3 py-2 text-[14px] outline-none focus:border-[#4F46E5] bg-white text-right font-bold" />
                  </div>
                </div>
                <div className="flex flex-col gap-1 w-full">
                  <label className="text-[14px] font-bold text-gray-800">Sale Price (Base Unit)</label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 font-bold">₹</span>
                    <input type="number" placeholder="0.00" className="w-full border border-gray-300 rounded-[3px] pl-7 pr-3 py-2 text-[14px] outline-none focus:border-[#4F46E5] bg-white text-right font-bold" />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: INVENTORY & TRACKING */}
          {activeTab === 'inventory' && (
            <div className="flex flex-col gap-5 animate-in fade-in duration-300">
              
              <div className="bg-gray-50 p-4 rounded-[3px] border border-gray-200">
                <h4 className="text-[14px] font-bold text-gray-800 mb-3 border-b border-gray-200 pb-2">Initial Stock Setup</h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="flex flex-col gap-1">
                    <label className="text-[13px] font-bold text-gray-700">Opening Stock Qty</label>
                    <input type="number" placeholder="0" className="w-full border border-gray-300 rounded-[3px] px-3 py-1.5 text-[13px] outline-none focus:border-blue-500" />
                  </div>
                  <div className="flex flex-col gap-1">
                    <label className="text-[13px] font-bold text-gray-700">Opening Stock Rate</label>
                    <input type="number" placeholder="₹0.00" className="w-full border border-gray-300 rounded-[3px] px-3 py-1.5 text-[13px] outline-none focus:border-blue-500" />
                  </div>
                  <div className="flex flex-col gap-1">
                    <label className="text-[13px] font-bold text-gray-700">Warehouse / Godown</label>
                    <select className="w-full border border-gray-300 rounded-[3px] px-3 py-1.5 text-[13px] outline-none focus:border-blue-500 bg-white">
                      <option>Main Warehouse</option>
                      <option>Store Room 1</option>
                    </select>
                  </div>
                </div>
              </div>

              <div className="bg-yellow-50 p-4 rounded-[3px] border border-yellow-200">
                <h4 className="text-[14px] font-bold text-yellow-900 mb-3 border-b border-yellow-200 pb-2 flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4" /> Stock Alerts
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="flex flex-col gap-1">
                    <label className="text-[13px] font-bold text-gray-700">Low Stock Alert Limit</label>
                    <input type="number" placeholder="e.g. 10" className="w-full border border-yellow-300 bg-white rounded-[3px] px-3 py-1.5 text-[13px] outline-none focus:border-yellow-500" />
                    <span className="text-[11px] text-gray-500">System will warn you when stock drops below this limit.</span>
                  </div>
                  <div className="flex flex-col gap-1">
                    <label className="text-[13px] font-bold text-gray-700">Reorder Level (Auto PO)</label>
                    <input type="number" placeholder="e.g. 5" className="w-full border border-yellow-300 bg-white rounded-[3px] px-3 py-1.5 text-[13px] outline-none focus:border-yellow-500" />
                    <span className="text-[11px] text-gray-500">Suggested quantity to order when stock is low.</span>
                  </div>
                </div>
              </div>

              <div className="bg-purple-50 p-4 rounded-[3px] border border-purple-200">
                <h4 className="text-[14px] font-bold text-purple-900 mb-3 border-b border-purple-200 pb-2 flex items-center gap-2">
                  <History className="w-4 h-4" /> Advanced Tracking
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-center gap-3 p-3 bg-white border border-purple-100 rounded-[3px]">
                    <div 
                      className={`w-[36px] h-[20px] rounded-full relative cursor-pointer transition-colors flex-shrink-0 ${enableBatch ? 'bg-purple-600' : 'bg-gray-300'}`}
                      onClick={() => setEnableBatch(!enableBatch)}
                    >
                      <div className={`w-[16px] h-[16px] bg-white rounded-full absolute top-[2px] shadow-sm transition-transform ${enableBatch ? 'translate-x-[18px]' : 'translate-x-[2px]'}`}></div>
                    </div>
                    <div>
                      <h4 className="text-[13px] font-bold text-gray-800">Enable Batch Management</h4>
                      <p className="text-[11px] text-gray-500">Track items by manufacturing batch/lot number.</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3 p-3 bg-white border border-purple-100 rounded-[3px]">
                    <div 
                      className={`w-[36px] h-[20px] rounded-full relative cursor-pointer transition-colors flex-shrink-0 ${enableExpiry ? 'bg-purple-600' : 'bg-gray-300'}`}
                      onClick={() => setEnableExpiry(!enableExpiry)}
                    >
                      <div className={`w-[16px] h-[16px] bg-white rounded-full absolute top-[2px] shadow-sm transition-transform ${enableExpiry ? 'translate-x-[18px]' : 'translate-x-[2px]'}`}></div>
                    </div>
                    <div>
                      <h4 className="text-[13px] font-bold text-gray-800">Enable Expiry Tracking</h4>
                      <p className="text-[11px] text-gray-500">Force expiry date entry during purchase.</p>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          )}

          {/* TAB 3: BOM */}
          {activeTab === 'bom' && (
            <div className="flex flex-col gap-4 animate-in fade-in duration-300">
              <div className="flex items-center gap-3 p-3 bg-blue-50 border border-blue-100 rounded-[3px]">
                <div 
                  className={`w-[40px] h-[22px] rounded-full relative cursor-pointer transition-colors flex-shrink-0 ${hasBom ? 'bg-[#28a745]' : 'bg-gray-400'}`}
                  onClick={() => setHasBom(!hasBom)}
                >
                  <div className={`w-[18px] h-[18px] bg-white rounded-full absolute top-[2px] shadow-sm transition-transform ${hasBom ? 'translate-x-[20px]' : 'translate-x-[2px]'}`}></div>
                </div>
                <div>
                  <h4 className="text-[14px] font-bold text-gray-800">Enable Bill of Materials (BOM)</h4>
                  <p className="text-[12px] text-gray-600">Mark this item as a Finished Good and define its recipe/components.</p>
                </div>
              </div>

              {hasBom && (
                <div className="animate-in fade-in slide-in-from-top-4 duration-300 flex flex-col gap-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex flex-col gap-1">
                      <label className="text-[13px] font-bold text-gray-800">BOM Name</label>
                      <input type="text" placeholder="e.g. Standard Recipe 1" className="border border-gray-300 rounded-[3px] px-3 py-2 text-[13px] outline-none focus:border-blue-500" />
                    </div>
                    <div className="flex flex-col gap-1">
                      <div className="flex items-center justify-between mb-0.5">
                        <label className="text-[13px] font-bold text-gray-800">Multi-Level BOM</label>
                        <div 
                          className={`w-[32px] h-[16px] rounded-full relative cursor-pointer transition-colors ${isMultiLevel ? 'bg-blue-600' : 'bg-gray-300'}`}
                          onClick={() => setIsMultiLevel(!isMultiLevel)}
                        >
                          <div className={`w-[12px] h-[12px] bg-white rounded-full absolute top-[2px] shadow-sm transition-transform ${isMultiLevel ? 'translate-x-[18px]' : 'translate-x-[2px]'}`}></div>
                        </div>
                      </div>
                      <p className="text-[11px] text-gray-500 mt-1">If enabled, you can add other BOM items as raw materials to create hierarchical recipes.</p>
                    </div>
                  </div>

                  <div className="border border-gray-200 rounded-[3px]">
                    <div className="bg-[#343a40] text-white p-2 text-[13px] font-bold flex justify-between items-center rounded-t-[2px]">
                      <span>Raw Materials / Components</span>
                      <span className="bg-[#28a745] px-2 py-0.5 rounded text-[11px]">Calculated Cost: ₹0.00</span>
                    </div>
                    <div className="grid grid-cols-12 gap-2 p-2 border-b border-gray-200 bg-gray-100 text-[12px] font-bold text-gray-700">
                      <div className="col-span-6">Raw Material Item</div>
                      <div className="col-span-3">Quantity</div>
                      <div className="col-span-2">Unit</div>
                      <div className="col-span-1 text-center">Action</div>
                    </div>
                    
                    {/* Input Row */}
                    <div className="grid grid-cols-12 gap-2 p-2 border-b border-gray-200 items-center">
                      <div className="col-span-6">
                        <select className="w-full border border-gray-300 rounded-[3px] px-2 py-1.5 text-[13px] outline-none focus:border-blue-500 bg-white">
                          <option value="">Select Raw Material...</option>
                          <option value="1">Wood</option>
                          <option value="2">Screws</option>
                          {isMultiLevel && <option value="3" className="font-bold text-blue-700">★ Semi-Finished Block (BOM)</option>}
                        </select>
                      </div>
                      <div className="col-span-3">
                        <input type="number" placeholder="Qty" className="w-full border border-gray-300 rounded-[3px] px-2 py-1.5 text-[13px] outline-none focus:border-blue-500 text-right" />
                      </div>
                      <div className="col-span-2">
                        <select className="w-full border border-gray-300 rounded-[3px] px-2 py-1.5 text-[13px] outline-none focus:border-blue-500 bg-gray-50">
                          <option>KGS</option>
                          <option>PCS</option>
                        </select>
                      </div>
                      <div className="col-span-1 flex justify-center">
                        <button className="bg-[#007bff] hover:bg-[#0069d9] text-white p-1.5 rounded-[3px] transition-colors shadow-sm">
                          <Plus className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                    
                    <div className="p-4 text-center text-[13px] text-gray-500 bg-white">
                      No materials added to BOM yet.
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* TAB 4: BARCODE */}
          {activeTab === 'barcode' && (
            <div className="flex flex-col gap-6 animate-in fade-in duration-300">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex flex-col gap-4">
                  <div className="flex flex-col gap-1">
                    <label className="text-[14px] font-bold text-gray-800">Barcode / EAN / UPC</label>
                    <div className="flex">
                      <input 
                        type="text" 
                        value={barcode}
                        onChange={(e) => setBarcode(e.target.value)}
                        placeholder="Scan or enter manually"
                        className="w-full border border-gray-300 rounded-l-[3px] px-3 py-2 text-[14px] outline-none focus:border-[#4F46E5] font-mono"
                      />
                      <button 
                        onClick={() => setBarcode('890123456789')}
                        className="bg-[#4F46E5] hover:bg-[#4338ca] text-white px-4 py-2 rounded-r-[3px] text-[13px] font-bold transition-colors whitespace-nowrap flex items-center gap-1.5"
                      >
                        <RefreshCw className="w-4 h-4" /> Generate
                      </button>
                    </div>
                    <p className="text-[12px] text-gray-500 mt-1">Leave empty to auto-generate unique barcode upon saving.</p>
                  </div>
                  
                  <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-[3px]">
                    <h4 className="text-[13px] font-bold text-yellow-800 mb-1">POS / Scanner Ready</h4>
                    <p className="text-[12px] text-yellow-700 leading-tight">
                      Barcodes assigned here can be scanned globally in Purchase, Sales, and Stock Adjustment modules to automatically fetch this item's details.
                    </p>
                  </div>
                </div>
                
                <div className="flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-[3px] p-6 bg-gray-50">
                  <h4 className="text-[13px] font-bold text-gray-600 mb-4 w-full text-left">Barcode Label Preview</h4>
                  
                  {barcode ? (
                    <div className="flex flex-col items-center gap-3 bg-white p-4 border border-gray-200 shadow-sm rounded w-[250px]">
                      <div className="h-[60px] w-full flex items-end justify-center px-2 opacity-80">
                        {/* CSS-based fake barcode */}
                        {[3,1,4,2,1,3,1,4,2,3,2,1,4,1,2,3].map((w, i) => (
                          <div key={i} className={`h-full bg-black mx-[1px]`} style={{ width: `${w}px` }}></div>
                        ))}
                      </div>
                      <span className="font-mono text-[14px] tracking-[4px] text-black font-medium">{barcode}</span>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center text-gray-400 py-6">
                      <BarcodeIcon className="w-12 h-12 mb-2 opacity-50" strokeWidth={1} />
                      <span className="text-[13px]">No barcode assigned yet</span>
                    </div>
                  )}
                  
                  <button 
                    disabled={!barcode}
                    className={`mt-6 flex items-center gap-1.5 px-4 py-1.5 rounded-[3px] text-[13px] font-bold transition-colors shadow-sm ${
                      barcode ? 'bg-[#ffc107] hover:bg-[#e0a800] text-gray-900' : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                    }`}
                  >
                    <Printer className="w-4 h-4" strokeWidth={2.5} /> Print Labels
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* TAB 5: ONLINE STORE */}
          {activeTab === 'online' && (
            <div className="flex flex-col gap-5 animate-in fade-in duration-300">
              <div className="flex items-center gap-3 p-3 bg-purple-50 border border-purple-100 rounded-[3px]">
                <div 
                  className={`w-[40px] h-[22px] rounded-full relative cursor-pointer transition-colors flex-shrink-0 ${syncOnline ? 'bg-[#4F46E5]' : 'bg-gray-400'}`}
                  onClick={() => setSyncOnline(!syncOnline)}
                >
                  <div className={`w-[18px] h-[18px] bg-white rounded-full absolute top-[2px] shadow-sm transition-transform ${syncOnline ? 'translate-x-[20px]' : 'translate-x-[2px]'}`}></div>
                </div>
                <div className="flex-1">
                  <h4 className="text-[14px] font-bold text-gray-800">Sync with Online Store</h4>
                  <p className="text-[12px] text-gray-600">Enable this to publish this item to your integrated eCommerce storefront.</p>
                </div>
                {syncOnline && (
                  <button className="bg-[#4F46E5] hover:bg-[#4338ca] text-white px-3 py-1.5 rounded-[3px] text-[12px] font-bold shadow-sm whitespace-nowrap flex items-center gap-1 transition-colors">
                    <RefreshCw className="w-3.5 h-3.5" /> Force Sync Now
                  </button>
                )}
              </div>

              {syncOnline && (
                <div className="animate-in fade-in slide-in-from-top-4 duration-300 grid grid-cols-1 md:grid-cols-[1fr_300px] gap-6">
                  
                  <div className="flex flex-col gap-4">
                    <div className="flex flex-col gap-1">
                      <label className="text-[13px] font-bold text-gray-800">Online Product Name</label>
                      <input type="text" placeholder="Defaults to main Item Name if empty" className="border border-gray-300 rounded-[3px] px-3 py-2 text-[13px] outline-none focus:border-purple-500 bg-white" />
                    </div>
                    
                    <div className="flex flex-col gap-1">
                      <label className="text-[13px] font-bold text-gray-800">Online Product Description</label>
                      <textarea rows="4" placeholder="Enter detailed description for online shoppers..." className="border border-gray-300 rounded-[3px] px-3 py-2 text-[13px] outline-none focus:border-purple-500 resize-none bg-white"></textarea>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="flex flex-col gap-1">
                        <label className="text-[13px] font-bold text-gray-800">Online Sale Price</label>
                        <div className="relative">
                          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 font-bold">₹</span>
                          <input type="number" placeholder="0.00" className="w-full border border-gray-300 rounded-[3px] pl-7 pr-3 py-2 text-[13px] outline-none focus:border-purple-500 bg-white" />
                        </div>
                      </div>
                      <div className="flex flex-col gap-1">
                        <label className="text-[13px] font-bold text-gray-800">eCommerce Category</label>
                        <select className="border border-gray-300 rounded-[3px] px-3 py-2 text-[13px] outline-none focus:border-purple-500 bg-white">
                          <option>Select Category</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col gap-2">
                    <label className="text-[13px] font-bold text-gray-800">Product Images</label>
                    <div className="border-2 border-dashed border-gray-300 rounded-[3px] h-[150px] flex flex-col items-center justify-center bg-gray-50 hover:bg-gray-100 cursor-pointer transition-colors group">
                      <ImageIcon className="w-8 h-8 text-gray-400 group-hover:text-purple-500 transition-colors mb-2" />
                      <span className="text-[13px] font-medium text-gray-600">Click to upload image</span>
                      <span className="text-[11px] text-gray-400 mt-1">Max size: 2MB</span>
                    </div>
                    
                    <div className="mt-2 bg-blue-50 border border-blue-100 rounded-[3px] p-3 text-[12px] text-blue-800">
                      <strong>Auto-Sync Active:</strong> Stock quantity and SKU will automatically sync continuously with main inventory.
                    </div>
                  </div>

                </div>
              )}
            </div>
          )}

        </div>

        {/* Footer */}
        <div className="bg-[#f8f9fa] px-4 md:px-6 py-3 flex justify-end gap-2 border-t border-gray-200 flex-shrink-0">
          <button 
            onClick={onClose}
            className="bg-[#28a745] hover:bg-[#218838] text-white px-5 py-[7px] rounded-[3px] text-[14px] font-bold transition-colors shadow-sm flex items-center gap-1.5"
          >
            Save Item
          </button>
          <button 
            onClick={onClose}
            className="bg-[#dc3545] hover:bg-[#c82333] text-white px-5 py-[7px] rounded-[3px] text-[14px] transition-colors shadow-sm"
          >
            Cancel
          </button>
        </div>

      </div>
    </div>
  );
}
