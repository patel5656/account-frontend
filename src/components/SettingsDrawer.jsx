import React from 'react';
import { Link2, ChevronUp, Edit, Trash2 } from 'lucide-react';
import { useLocation } from 'react-router-dom';
import { cn } from '../utils';
import { useSettings } from '../context/SettingsContext';

export function SettingsDrawer({ isOpen, onClose }) {
  const location = useLocation();
  const { settings, toggleSetting } = useSettings();
  if (!isOpen) return null;

  const isLedgerRoute = location.pathname.includes('/party-ledger/');
  const isBarcodeRoute = location.pathname.includes('/barcode');
  const isStockPriceUpdateRoute = location.pathname.includes('/stock-price-update') || location.pathname.includes('/items_quantity_report');
  const isCustomerInvoiceCreation = location.pathname.includes('/customer-invoice-creation') || location.pathname.includes('/create_invoices/company_purchase') || location.pathname.includes('/customer-challan-creation');
  const isInvoiceRoute = location.pathname.includes('/sales-invoice') || 
                         location.pathname.includes('/create_invoices/') || 
                         location.pathname.includes('/quotation-invoice') || 
                         location.pathname.includes('/stock-adjustment-invoice');

  if (isCustomerInvoiceCreation) {
    return (
      <>
        {/* Backdrop */}
        <div 
          className="fixed inset-0 bg-transparent z-[60]" 
          onClick={onClose}
        />
        
        {/* Dropdown Menu */}
        <div className="fixed top-[45px] right-[10px] w-[260px] max-h-[calc(100vh-60px)] bg-[#2a2f35] shadow-2xl z-[70] flex flex-col animate-in fade-in duration-200 border border-gray-700/50 rounded-b-[4px]">
          
          <div className="flex-1 overflow-y-auto p-3 custom-scrollbar">
            <div className="space-y-[8px] flex flex-col">
               <ToggleSetting label="Quick Product" />
               <ToggleSetting label="Party First" />
               <ToggleSetting label="Show Shipping Party" />
               <ToggleSetting label="Show Company" />
               <ToggleSetting label="Show Product Code" />
               <ToggleSetting label="Show Batch No" />
               <ToggleSetting label="Compalsary Batch No" />
               <ToggleSetting label="Show GST" />
               <ToggleSetting label="Show HSN" />
               <ToggleSetting label="Show MRP" defaultChecked={true} />
               <ToggleSetting label="Show List Price" />
               <ToggleSetting label="Show Purchase Price" />
               <ToggleSetting label="Show Discount" defaultChecked={true} />
               <ToggleSetting label="Hide Total Discount" />
               <ToggleSetting label="Hide Fright Charge" />
               <ToggleSetting label="Show Price First" />
               <ToggleSetting label="Show Unit" defaultChecked={true} />
               <ToggleSetting label="Show Warning" />
               <ToggleSetting label="Low Stock Qty" />
               <ToggleSetting label="Negative Stock Lock" />
               <ToggleSetting label="Use Product Code" />
               <ToggleSetting label="Use Barcode" defaultChecked={true} />
               <ToggleSetting label="Use Points" />
               <ToggleSetting label="Use Store" />
               <ToggleSetting label="Use Sub Item" />
               <ToggleSetting label="Use Sub Inventory" />
               <ToggleSetting label="Manual Qty" />
               <ToggleSetting label="Sale Price" />
               <ToggleSetting label="Whole Sale Price" />
               <ToggleSetting label="Qty-wise Rate" />
               <ToggleSetting label="Category-wise Discount" />
               <ToggleSetting label="Auto Bill Print" defaultChecked={true} />
               <ToggleSetting label="Auto Raw. Quantity" />
               <ToggleSetting label="Sale by Commission" />
               <ToggleSetting label="Subhead Amount" />
               <ToggleSetting label="Manufacture" defaultChecked={true} />
               <ToggleSetting label="Zero Price" />
               <ToggleSetting label="Merge Quantity" />
               <ToggleSetting label="Custom Profit (in %)" />
               <ToggleSetting label="Booking Date" />
               <ToggleSetting label="Focus Unit" />
               <ToggleSetting label="Auto Estimate" />
               <ToggleSetting label="Profit on Average" />
               <ToggleSetting label="Strict Search" defaultChecked={true} />
               <ToggleSetting label="Extra Paid Amount" />
               <ToggleSetting label="Sale Price Calculator" />
               <ToggleSetting label="Quantity Calculator" />
               <ToggleSetting label="Single Payment Mode" />
               <ToggleSetting label="Set Reminder Date" />
               <ToggleSetting label="Auto Credit Invoice" />
               <ToggleSetting label="Storewise Billing" defaultChecked={true} />
               <ToggleSetting label="Hide Manufacture Date" />
               <ToggleSetting label="Hide Expiry Date" />
               <ToggleSetting label="Customer-wise Rate" defaultChecked={true} />
               <ToggleSetting label="Default Cash Payment" defaultChecked={true} />
            </div>
            
            {/* Select Inputs at bottom of dropdown */}
            <div className="mt-4 space-y-3 pb-2">
              <div>
                <label className="block text-white text-[11px] font-bold mb-1">Customer Wise Rate Type</label>
                <select className="w-full bg-white text-gray-800 text-[12px] rounded-[3px] px-2 py-1 outline-none">
                  <option>Both</option>
                  <option>Percentage</option>
                  <option>Amount</option>
                </select>
              </div>

              <div>
                <label className="block text-white text-[11px] font-bold mb-1">Discount Type</label>
                <select className="w-full bg-white text-gray-800 text-[12px] rounded-[3px] px-2 py-1 outline-none">
                  <option>Both</option>
                  <option>Percentage</option>
                  <option>Amount</option>
                </select>
              </div>

              <div>
                <label className="block text-white text-[11px] font-bold mb-1">Voucher Head</label>
                <input type="text" defaultValue="OS-" className="w-full bg-white text-gray-800 text-[12px] rounded-[3px] px-2 py-1 outline-none" />
              </div>

              <div>
                <label className="block text-white text-[11px] font-bold mb-1">Voucher Heads</label>
                <select className="w-full bg-white text-gray-800 text-[12px] rounded-[3px] px-2 py-1 outline-none">
                  <option>Select Voucher Head</option>
                </select>
              </div>

              <div>
                <label className="block text-white text-[11px] font-bold mb-1">Filter Method</label>
                <select className="w-full bg-white text-gray-800 text-[12px] rounded-[3px] px-2 py-1 outline-none">
                  <option>Default</option>
                  <option>Advance</option>
                </select>
              </div>

              <div>
                <label className="block text-white text-[11px] font-bold mb-1">Batch Date Input Type</label>
                <select className="w-full bg-white text-gray-800 text-[12px] rounded-[3px] px-2 py-1 outline-none">
                  <option>Month</option>
                  <option>Date</option>
                  <option>Year</option>
                </select>
              </div>

              <div>
                <label className="block text-white text-[11px] font-bold mb-1">Points Value (in %)</label>
                <input type="number" defaultValue="0" className="w-full bg-white text-gray-800 text-[12px] rounded-[3px] px-2 py-1 outline-none" />
              </div>

              <div>
                <label className="block text-white text-[11px] font-bold mb-1">Invoice Round Up</label>
                <input type="number" defaultValue="0" className="w-full bg-white text-gray-800 text-[12px] rounded-[3px] px-2 py-1 outline-none" />
              </div>

              <div>
                <label className="block text-white text-[11px] font-bold mb-1">TCS (in %)</label>
                <input type="number" defaultValue="0" className="w-full bg-white text-gray-800 text-[12px] rounded-[3px] px-2 py-1 outline-none" />
              </div>

              <div>
                <label className="block text-white text-[11px] font-bold mb-1">Whole Sale Profit %</label>
                <input type="number" defaultValue="0" className="w-full bg-white text-gray-800 text-[12px] rounded-[3px] px-2 py-1 outline-none" />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-white text-[11px] font-bold mb-1">Sale Profit %</label>
                  <input type="number" defaultValue="0" className="w-full bg-white text-gray-800 text-[12px] rounded-[3px] px-2 py-1 outline-none" />
                </div>
                <div>
                  <label className="block text-white text-[11px] font-bold mb-1">Round up to</label>
                  <input type="number" defaultValue="2" className="w-full bg-white text-gray-800 text-[12px] rounded-[3px] px-2 py-1 outline-none" />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-white text-[11px] font-bold mb-1">Default Unit</label>
                  <input type="text" defaultValue="pcs" className="w-full bg-white text-gray-800 text-[12px] rounded-[3px] px-2 py-1 outline-none" />
                </div>
                <div>
                  <label className="block text-white text-[11px] font-bold mb-1">GST UQC</label>
                  <select className="w-full bg-white text-gray-800 text-[12px] rounded-[3px] px-2 py-1 outline-none">
                    <option>PCS-PIECES</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-white text-[11px] font-bold mb-1">Default Product Type</label>
                <select className="w-full bg-white text-gray-800 text-[12px] rounded-[3px] px-2 py-1 outline-none">
                  <option>Product</option>
                  <option>Service</option>
                </select>
              </div>

              {/* Extra Column Table */}
              <div className="border border-gray-600 rounded-[3px] overflow-hidden mt-4">
                <div className="grid grid-cols-[1fr_1fr_30px] bg-[#1a1d21] border-b border-gray-600">
                  <div className="text-white text-[11px] font-bold p-1 border-r border-gray-600">Extra Column</div>
                  <div className="text-white text-[11px] font-bold p-1 border-r border-gray-600">Default Value</div>
                  <div className="bg-[#198754] flex items-center justify-center cursor-pointer hover:bg-[#157347]">
                    <span className="text-white text-[14px] font-bold leading-none">+</span>
                  </div>
                </div>
                <div className="grid grid-cols-[1fr_1fr_30px] bg-white">
                  <input type="text" placeholder="Ex. P.O." className="w-full text-gray-800 text-[11px] p-1 outline-none border-r border-gray-300" />
                  <input type="text" placeholder="1" className="w-full text-gray-800 text-[11px] p-1 outline-none border-r border-gray-300" />
                  <div className="bg-gray-100 flex items-center justify-center border-t border-gray-300">
                    <span className="text-gray-400 text-[10px]">#</span>
                  </div>
                </div>
              </div>

              {/* Extra Charges Table */}
              <div className="border border-gray-600 rounded-[3px] overflow-hidden mt-2">
                <div className="grid grid-cols-[1fr_30px] bg-[#1a1d21] border-b border-gray-600">
                  <div className="text-white text-[11px] font-bold p-1 text-center border-r border-gray-600">Extra Charges</div>
                  <div className="bg-[#198754] flex items-center justify-center cursor-pointer hover:bg-[#157347]">
                    <span className="text-white text-[14px] font-bold leading-none">+</span>
                  </div>
                </div>
                <div className="grid grid-cols-[1fr_30px] bg-white">
                  <input type="text" placeholder="Ex. Paking & Forwading" className="w-full text-gray-800 text-[11px] p-1 outline-none border-r border-gray-300" />
                  <div className="bg-gray-100 flex items-center justify-center border-t border-gray-300">
                    <span className="text-gray-400 text-[10px]">#</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="p-2 border-t border-gray-700/50 flex justify-end gap-2 bg-[#2a2f35] rounded-b-[4px]">
            <button 
              onClick={() => {
                alert('Settings saved successfully!');
                onClose();
              }} 
              className="bg-[#198754] hover:bg-[#157347] text-white px-3 py-1 rounded-[3px] text-[12px] font-bold transition-colors"
            >
              Save
            </button>
            <button 
              onClick={onClose}
              className="bg-[#dc3545] hover:bg-[#c82333] text-white px-3 py-1 rounded-[3px] text-[12px] font-bold transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      </>
    );
  }

  if (isInvoiceRoute) {
    return (
      <>
        {/* Backdrop */}
        <div 
          className="fixed inset-0 bg-black/20 z-[60] transition-opacity" 
          onClick={onClose}
        />
        
        {/* Drawer */}
        <div className="fixed top-[45px] right-0 h-[calc(100vh-45px)] w-[280px] sm:w-[320px] bg-[#2a2f35] shadow-2xl z-[70] flex flex-col animate-in slide-in-from-right duration-300 border-l border-b border-gray-700/50">
          
          {/* Scrollable Content */}
          <div className="flex-1 overflow-y-auto p-4 custom-scrollbar">
            
            {/* Settings List */}
            <div className="space-y-[15px] mt-2">
              <ToggleSetting label="Subhead Amount" />
              <ToggleSetting label="Manufacture" defaultChecked={true} />
              <ToggleSetting label="Zero Price" />
              <ToggleSetting label="Merge Quantity" defaultChecked={true} />
              <ToggleSetting label="Custom Profit (in %)" />
              <ToggleSetting label="Booking Date" />
              <ToggleSetting label="Focus Unit" />
              <ToggleSetting label="Auto Estimate" />
              <ToggleSetting label="Profit on Average" />
              <ToggleSetting label="Strict Search" defaultChecked={true} />
              <ToggleSetting label="Extra Paid Amount" />
              <ToggleSetting label="Sale Price Calculator" />
              <ToggleSetting label="Quantity Calculator" />
              <ToggleSetting label="Single Payment Mode" />
              <ToggleSetting label="Set Reminder Date" />
              <ToggleSetting label="Auto Credit Invoice" />
              <ToggleSetting label="Storewise Billing" defaultChecked={true} />
              <ToggleSetting label="Hide Manufacture Date" />
              <ToggleSetting label="Hide Expiry Date" />
              <ToggleSetting label="Customer-wise Rate" defaultChecked={true} />
              <ToggleSetting label="Default Cash Payment" defaultChecked={true} />
            </div>

            {/* Select and Input Fields */}
            <div className="mt-5 space-y-4">
              <div>
                <label className="block text-white text-[12.5px] font-bold mb-1">Customer Wise Rate Type</label>
                <select className="w-full bg-white text-gray-800 text-[13px] rounded-[3px] px-2 py-1.5 outline-none focus:ring-2 focus:ring-[#4F46E5]/50">
                  <option>Both</option>
                  <option>Percentage</option>
                  <option>Amount</option>
                </select>
              </div>

              <div>
                <label className="block text-white text-[12.5px] font-bold mb-1">Discount Type</label>
                <select className="w-full bg-white text-gray-800 text-[13px] rounded-[3px] px-2 py-1.5 outline-none focus:ring-2 focus:ring-[#4F46E5]/50">
                  <option>Both</option>
                  <option>Percentage</option>
                  <option>Amount</option>
                </select>
              </div>

              <div>
                <label className="block text-white text-[12.5px] font-bold mb-1">Voucher Head</label>
                <input 
                  type="text" 
                  defaultValue="OS-"
                  className="w-full bg-white text-gray-800 text-[13px] rounded-[3px] px-2 py-1.5 outline-none focus:ring-2 focus:ring-[#4F46E5]/50" 
                />
              </div>

              <div>
                <label className="block text-white text-[12.5px] font-bold mb-1">Voucher Heads</label>
                <select className="w-full bg-white text-gray-800 text-[13px] rounded-[3px] px-2 py-1.5 outline-none focus:ring-2 focus:ring-[#4F46E5]/50">
                  <option>Select Voucher Head</option>
                </select>
              </div>

              <div>
                <label className="block text-white text-[12.5px] font-bold mb-1">Filter Method</label>
                <select className="w-full bg-white text-gray-800 text-[13px] rounded-[3px] px-2 py-1.5 outline-none focus:ring-2 focus:ring-[#4F46E5]/50">
                  <option>Default</option>
                  <option>Advanced</option>
                </select>
              </div>

              <div>
                <label className="block text-white text-[12.5px] font-bold mb-1">Batch Date Input Type</label>
                <select className="w-full bg-white text-gray-800 text-[13px] rounded-[3px] px-2 py-1.5 outline-none focus:ring-2 focus:ring-[#4F46E5]/50">
                  <option>Month</option>
                  <option>Date</option>
                  <option>Year</option>
                </select>
              </div>

              <div>
                <label className="block text-white text-[12.5px] font-bold mb-1">Points Value (in %)</label>
                <input type="number" defaultValue="0" className="w-full bg-white text-gray-800 text-[13px] rounded-[3px] px-2 py-1.5 outline-none focus:ring-2 focus:ring-[#4F46E5]/50" />
              </div>

              <div>
                <label className="block text-white text-[12.5px] font-bold mb-1">Invoice Round Up</label>
                <input type="number" defaultValue="0" className="w-full bg-white text-gray-800 text-[13px] rounded-[3px] px-2 py-1.5 outline-none focus:ring-2 focus:ring-[#4F46E5]/50" />
              </div>

              <div>
                <label className="block text-white text-[12.5px] font-bold mb-1">TCS (in %)</label>
                <input type="number" defaultValue="0" className="w-full bg-white text-gray-800 text-[13px] rounded-[3px] px-2 py-1.5 outline-none focus:ring-2 focus:ring-[#4F46E5]/50" />
              </div>

              <div>
                <label className="block text-white text-[12.5px] font-bold mb-1">Whole Sale Profit %</label>
                <input type="number" defaultValue="0" className="w-full bg-white text-gray-800 text-[13px] rounded-[3px] px-2 py-1.5 outline-none focus:ring-2 focus:ring-[#4F46E5]/50" />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-white text-[12.5px] font-bold mb-1">Sale Profit %</label>
                  <input type="number" defaultValue="0" className="w-full bg-white text-gray-800 text-[13px] rounded-[3px] px-2 py-1.5 outline-none focus:ring-2 focus:ring-[#4F46E5]/50" />
                </div>
                <div>
                  <label className="block text-white text-[12.5px] font-bold mb-1">Round up to</label>
                  <input type="number" defaultValue="2" className="w-full bg-white text-gray-800 text-[13px] rounded-[3px] px-2 py-1.5 outline-none focus:ring-2 focus:ring-[#4F46E5]/50" />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-white text-[12.5px] font-bold mb-1">Default Unit</label>
                  <input type="text" defaultValue="pcs" className="w-full bg-white text-gray-800 text-[13px] rounded-[3px] px-2 py-1.5 outline-none focus:ring-2 focus:ring-[#4F46E5]/50" />
                </div>
                <div>
                  <label className="block text-white text-[12.5px] font-bold mb-1">GST UQC</label>
                  <select className="w-full bg-white text-gray-800 text-[13px] rounded-[3px] px-2 py-1.5 outline-none focus:ring-2 focus:ring-[#4F46E5]/50">
                    <option>PCS-PIECES</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-white text-[12.5px] font-bold mb-1">Default Product Type</label>
                <select className="w-full bg-white text-gray-800 text-[13px] rounded-[3px] px-2 py-1.5 outline-none focus:ring-2 focus:ring-[#4F46E5]/50">
                  <option>Product</option>
                  <option>Service</option>
                </select>
              </div>

              {/* Extra Column Table */}
              <div className="border border-gray-600 rounded-[3px] overflow-hidden mt-4">
                <div className="grid grid-cols-[1fr_1fr_30px] bg-[#1a1d21] border-b border-gray-600">
                  <div className="text-white text-[12px] font-bold p-1.5 border-r border-gray-600">Extra Column</div>
                  <div className="text-white text-[12px] font-bold p-1.5 border-r border-gray-600">Default Value</div>
                  <div className="bg-[#198754] flex items-center justify-center cursor-pointer hover:bg-[#157347]">
                    <span className="text-white text-[14px] font-bold leading-none">+</span>
                  </div>
                </div>
                <div className="grid grid-cols-[1fr_1fr_30px] bg-white">
                  <input type="text" placeholder="Ex. P.O." className="w-full text-gray-800 text-[12px] p-1.5 outline-none border-r border-gray-300" />
                  <input type="text" placeholder="1" className="w-full text-gray-800 text-[12px] p-1.5 outline-none border-r border-gray-300" />
                  <div className="bg-gray-100 flex items-center justify-center">
                    <span className="text-gray-400 text-[10px]">#</span>
                  </div>
                </div>
              </div>

              {/* Extra Charges Table */}
              <div className="border border-gray-600 rounded-[3px] overflow-hidden mt-4">
                <div className="grid grid-cols-[1fr_30px] bg-[#1a1d21] border-b border-gray-600">
                  <div className="text-white text-[12px] font-bold p-1.5 text-center border-r border-gray-600">Extra Charges</div>
                  <div className="bg-[#198754] flex items-center justify-center cursor-pointer hover:bg-[#157347]">
                    <span className="text-white text-[14px] font-bold leading-none">+</span>
                  </div>
                </div>
                <div className="grid grid-cols-[1fr_30px] bg-white">
                  <input type="text" placeholder="Ex. Paking & Forwading" className="w-full text-gray-800 text-[12px] p-1.5 outline-none border-r border-gray-300" />
                  <div className="bg-gray-100 flex items-center justify-center">
                    <span className="text-gray-400 text-[10px]">#</span>
                  </div>
                </div>
              </div>
            </div>

          </div>

          {/* Footer */}
          <div className="p-3 border-t border-gray-700/50 flex justify-end gap-2 bg-[#2a2f35]">
            <button onClick={onClose} className="bg-[#198754] hover:bg-[#157347] text-white px-4 py-1.5 rounded-[3px] text-[13px] font-medium transition-colors">
              Save
            </button>
            <button 
              onClick={onClose}
              className="bg-[#dc3545] hover:bg-[#c82333] text-white px-4 py-1.5 rounded-[3px] text-[13px] font-medium transition-colors"
            >
              Close
            </button>
          </div>

        </div>
      </>
    );
  }

  if (isStockPriceUpdateRoute) {
    return (
      <>
        {/* Backdrop */}
        <div 
          className="fixed inset-0 bg-black/20 z-[60] transition-opacity" 
          onClick={onClose}
        />
        
        {/* Drawer */}
        <div className="fixed top-[45px] right-0 h-auto max-h-[calc(100vh-45px)] w-[280px] sm:w-[320px] bg-[#2a2f35] shadow-2xl z-[70] flex flex-col animate-in slide-in-from-right duration-300 border-l border-b border-gray-700/50">
          
          {/* Scrollable Content */}
          <div className="overflow-y-auto p-4 custom-scrollbar">
            
            {/* Settings List */}
            <div className="space-y-[15px] mt-2">
              <ToggleSetting label="Show Product Code" defaultChecked={true} />
              <ToggleSetting label="Show Brand Name" defaultChecked={true} />
              <ToggleSetting label="Show Category" defaultChecked={true} />
              <ToggleSetting label="Show GST" defaultChecked={true} />
              <ToggleSetting label="Show HSN" defaultChecked={true} />
              <ToggleSetting label="Show Cash Sale Price" defaultChecked={true} />
              <ToggleSetting label="Show Credit Sale Price" defaultChecked={true} />
              <ToggleSetting label="Show MRP" defaultChecked={true} />
              <ToggleSetting label="Show Whole Sale Price" defaultChecked={true} />
              <ToggleSetting label="Show Purchase Price" defaultChecked={true} />
              <ToggleSetting label="Show Branches" defaultChecked={true} />
              <ToggleSetting label="Show Stock Qty" defaultChecked={true} />
            </div>

          </div>

          {/* Footer */}
          <div className="p-3 border-t border-gray-700/50 flex justify-end gap-2 bg-[#2a2f35]">
            <button onClick={onClose} className="bg-[#198754] hover:bg-[#157347] text-white px-4 py-1.5 rounded-[3px] text-[13px] font-medium transition-colors">
              Save
            </button>
            <button 
              onClick={onClose}
              className="bg-[#dc3545] hover:bg-[#c82333] text-white px-4 py-1.5 rounded-[3px] text-[13px] font-medium transition-colors"
            >
              Close
            </button>
          </div>

        </div>
      </>
    );
  }

  if (isBarcodeRoute) {
    return (
      <>
        {/* Backdrop */}
        <div 
          className="fixed inset-0 bg-black/20 z-[60] transition-opacity" 
          onClick={onClose}
        />
        
        {/* Drawer */}
        <div className="fixed top-[45px] right-0 h-auto max-h-[calc(100vh-45px)] w-[280px] sm:w-[320px] bg-white shadow-2xl z-[70] flex flex-col animate-in slide-in-from-right duration-300 border-l border-b border-gray-200">
          
          <div className="flex flex-col">
            {/* Header */}
            <div className="bg-[#2a2f35] text-white px-3 py-2 text-[13px] font-bold">
              Lable Name
            </div>
            
            {/* List */}
            <div className="flex flex-col">
              {/* Item 1 */}
              <div className="flex items-center justify-between px-3 py-1.5 bg-[#d1ecf1] border-b border-gray-200">
                <span className="text-[13px] font-bold text-gray-800">50mm X 25mm</span>
                <ChevronUp className="w-3.5 h-3.5 text-gray-500" />
              </div>
              
              {/* Item 2 */}
              <div className="flex items-center justify-between px-3 py-1.5 border-b border-gray-200 hover:bg-gray-50">
                <span className="text-[13px] font-bold text-gray-800">undefined</span>
                <div className="flex items-center gap-2">
                  <Edit className="w-3.5 h-3.5 text-[#4F46E5] cursor-pointer" />
                  <Trash2 className="w-3.5 h-3.5 text-[#dc3545] cursor-pointer" />
                </div>
              </div>

              {/* Item 3 */}
              <div className="flex items-center justify-between px-3 py-1.5 border-b border-gray-200 hover:bg-gray-50">
                <span className="text-[13px] font-bold text-gray-800">undefined</span>
                <div className="flex items-center gap-2">
                  <Edit className="w-3.5 h-3.5 text-[#4F46E5] cursor-pointer" />
                  <Trash2 className="w-3.5 h-3.5 text-[#dc3545] cursor-pointer" />
                </div>
              </div>

              {/* Item 4 */}
              <div className="flex items-center justify-between px-3 py-1.5 hover:bg-gray-50">
                <span className="text-[13px] font-bold text-gray-800">undefined</span>
                <div className="flex items-center gap-2">
                  <Edit className="w-3.5 h-3.5 text-[#4F46E5] cursor-pointer" />
                  <Trash2 className="w-3.5 h-3.5 text-[#dc3545] cursor-pointer" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }

  if (isLedgerRoute) {
    return (
      <>
        {/* Backdrop */}
        <div 
          className="fixed inset-0 bg-black/20 z-[60] transition-opacity" 
          onClick={onClose}
        />
        
        {/* Drawer */}
        <div className="fixed top-[45px] right-0 h-auto max-h-[calc(100vh-45px)] w-[280px] sm:w-[320px] bg-[#2a2f35] shadow-2xl z-[70] flex flex-col animate-in slide-in-from-right duration-300 border-l border-b border-gray-700/50">
          
          {/* Scrollable Content */}
          <div className="overflow-y-auto p-4 custom-scrollbar">
            
            {/* Settings List */}
            <div className="space-y-[15px] mt-2">
              <ToggleSetting label="Show Due Days" defaultChecked={true} />
              <ToggleSetting label="Show Bank Details" />
              <ToggleSetting 
                label={
                  <>
                    Accounting Format<br/>
                    (Debit/Credit)
                  </>
                } 
              />
              <ToggleSetting label="Bill-wise Payment" />
            </div>

          </div>

          {/* Footer */}
          <div className="p-3 border-t border-gray-700/50 flex justify-end gap-2 bg-[#2a2f35]">
            <button onClick={onClose} className="bg-[#198754] hover:bg-[#157347] text-white px-4 py-1.5 rounded-[3px] text-[13px] font-medium transition-colors">
              Save
            </button>
            <button 
              onClick={onClose}
              className="bg-[#dc3545] hover:bg-[#c82333] text-white px-4 py-1.5 rounded-[3px] text-[13px] font-medium transition-colors"
            >
              Close
            </button>
          </div>

        </div>
      </>
    );
  }

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/20 z-[60] transition-opacity" 
        onClick={onClose}
      />
      
      {/* Drawer */}
      <div className="fixed top-0 right-0 h-full w-[280px] sm:w-[320px] bg-[#2a2f35] shadow-2xl z-[70] flex flex-col animate-in slide-in-from-right duration-300">
        
        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto p-4 custom-scrollbar">
          
          {/* Gmail Connect Box */}
          <div className="bg-[#1f2328] rounded-[5px] p-4 mb-5 border border-gray-700/50">
            <div className="flex items-center justify-between mb-2">
              <div className="flex flex-wrap items-center gap-2">
                <div className="w-6 h-6 rounded-full bg-white flex items-center justify-center text-[#2a2f35] font-bold text-[13px]">
                  G
                </div>
                <span className="text-white font-medium text-[14px]">Gmail</span>
              </div>
              <span className="bg-[#dc3545] text-white text-[10px] px-2 py-0.5 rounded-[3px] font-medium tracking-wide">
                Not Connected
              </span>
            </div>
            <p className="text-gray-400 text-[11px] leading-tight mb-3 text-center">
              Send Invoice PDFs directly from connected Gmail
            </p>
            <button className="w-full bg-[#0d6efd] hover:bg-[#0b5ed7] text-white rounded-[3px] py-1.5 flex items-center justify-center gap-1.5 text-[13px] font-medium transition-colors">
              <Link2 className="w-4 h-4" />
              Connect Gmail
            </button>
          </div>

          {/* Settings List */}
          <div className="space-y-[10px] mb-6">
            <ToggleSetting label="WhatsApp" />
            <ToggleSetting label="Send WhatsApp" />
            <ToggleSetting label="Send SMS" />
            <ToggleSetting 
              label="Customer Challan" 
              checked={settings?.showCustomerChallan} 
              onChange={() => toggleSetting('showCustomerChallan')} 
            />
            <ToggleSetting 
              label="Customer Invoice" 
              checked={settings?.showCustomerInvoice} 
              onChange={() => toggleSetting('showCustomerInvoice')} 
            />
            <ToggleSetting 
              label="Purchase Order" 
              checked={settings?.showPurchaseOrder} 
              onChange={() => toggleSetting('showPurchaseOrder')} 
            />
            <ToggleSetting 
              label="Sales Order" 
              checked={settings?.showSalesOrder} 
              onChange={() => toggleSetting('showSalesOrder')} 
            />
            <ToggleSetting label="Merge Party Ledger" />
            <ToggleSetting label="Separate Stock" />
            <ToggleSetting label="Separate Bill" />
            <ToggleSetting label="Party Type Both" />
            <ToggleSetting label="Txn Date Only" />
            <ToggleSetting label="Interest on Invoices" />
          </div>

          {/* Form Fields */}
          <div className="space-y-4 mb-4">
            <div>
              <label className="block text-white text-[12.5px] font-bold mb-1.5">Currency Setting</label>
              <select className="w-full bg-white text-gray-800 text-[13px] rounded-[3px] px-2 py-1.5 outline-none focus:ring-2 focus:ring-[#4F46E5]/50">
                <option>en-IN</option>
                <option>en-US</option>
              </select>
            </div>
            
            <div>
              <label className="block text-white text-[12.5px] font-bold mb-1.5">Set Voucher Head</label>
              <input 
                type="text" 
                className="w-full bg-white text-gray-800 text-[13px] rounded-[3px] px-2 py-1.5 outline-none focus:ring-2 focus:ring-[#4F46E5]/50" 
              />
            </div>

            <div>
              <label className="block text-white text-[12.5px] font-bold mb-1.5">Whatsapp Host</label>
              <input 
                type="text" 
                className="w-full bg-white text-gray-800 text-[13px] rounded-[3px] px-2 py-1.5 outline-none focus:ring-2 focus:ring-[#4F46E5]/50" 
              />
            </div>
          </div>

        </div>

        {/* Footer */}
        <div className="p-3 border-t border-gray-700/50 flex justify-end gap-2 bg-[#2a2f35]">
          <button onClick={onClose} className="bg-[#198754] hover:bg-[#157347] text-white px-4 py-1.5 rounded-[3px] text-[13px] font-medium transition-colors">
            Save
          </button>
          <button 
            onClick={onClose}
            className="bg-[#dc3545] hover:bg-[#c82333] text-white px-4 py-1.5 rounded-[3px] text-[13px] font-medium transition-colors"
          >
            Close
          </button>
        </div>

      </div>
    </>
  );
}

function ToggleSetting({ label, defaultChecked = false, checked, onChange }) {
  return (
    <label className="flex items-start gap-3 cursor-pointer group">
      <div className="relative mt-0.5 shrink-0">
        <input 
          type="checkbox" 
          className="sr-only peer" 
          defaultChecked={defaultChecked} 
          checked={checked}
          onChange={onChange}
        />
        <div className="w-9 h-[18px] bg-gray-400 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-3.5 after:w-3.5 after:transition-all peer-checked:bg-[#0d6efd]"></div>
      </div>
      <span className="text-white text-[13px] font-bold tracking-wide select-none group-hover:text-gray-200">
        {label}
      </span>
    </label>
  );
}
