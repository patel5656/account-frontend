import React, { useState, useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { Edit, Trash2, Filter, ChevronDown } from 'lucide-react';

export function ProductSelectDropdown({ products, value, onChange, onEdit, onDelete }) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const dropdownRef = useRef(null);
  const inputRef = useRef(null);
  const [menuRect, setMenuRect] = useState(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      // Check if click is outside both the trigger and the portal menu
      const isOutsideTrigger = dropdownRef.current && !dropdownRef.current.contains(event.target);
      const isOutsideMenu = !event.target.closest('.product-dropdown-menu');
      
      if (isOutsideTrigger && isOutsideMenu) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    
    // Update position on scroll instead of closing, but ignore internal menu scrolling
    const handleScroll = (event) => {
      if (event.target && event.target.closest && event.target.closest('.product-dropdown-menu')) {
        return; // Let the menu itself scroll
      }
      if (dropdownRef.current) {
        setMenuRect(dropdownRef.current.getBoundingClientRect());
      }
    };
    window.addEventListener('scroll', handleScroll, true);
    
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      window.removeEventListener('scroll', handleScroll, true);
    };
  }, []);

  // Focus input and calculate position when dropdown opens
  useEffect(() => {
    if (isOpen) {
      if (dropdownRef.current) {
        setMenuRect(dropdownRef.current.getBoundingClientRect());
      }
      setTimeout(() => {
        if (inputRef.current) inputRef.current.focus();
      }, 50);
    }
  }, [isOpen]);

  const selectedProduct = products.find(p => p.id === parseInt(value)) || null;

  const filteredProducts = products.filter(p => 
    p.name?.toLowerCase().includes(searchTerm.toLowerCase()) || 
    p.sku?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSelect = (productId) => {
    onChange(productId);
    setIsOpen(false);
    setSearchTerm('');
  };

  return (
    <div className="relative w-full h-full" ref={dropdownRef}>
      {/* Dropdown Trigger */}
      <div 
        className="w-full h-full border border-transparent rounded-[3px] px-2 py-1 text-[13px] outline-none font-bold text-gray-800 bg-transparent flex items-center justify-between cursor-pointer hover:border-gray-300"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="truncate flex-1 text-left">
          {selectedProduct ? `${selectedProduct.name} - SKU: ${selectedProduct.sku}` : <span className="text-gray-400 font-normal">Select Product...</span>}
        </span>
        <ChevronDown className="w-4 h-4 text-gray-500 flex-shrink-0" />
      </div>

      {/* Dropdown Menu (Portal) */}
      {isOpen && menuRect && createPortal(
        <div 
          className="product-dropdown-menu bg-white border border-gray-300 shadow-2xl rounded-[3px] z-[9999] flex flex-col max-h-[350px]"
          style={{
            position: 'fixed',
            top: `${menuRect.bottom + 2}px`,
            left: `${menuRect.left}px`,
            width: '450px',
            maxWidth: '90vw'
          }}
        >
          {/* Header & Search */}
          <div className="bg-[#343a40] text-white p-2 flex items-center gap-2 border-b border-gray-600 rounded-t-[3px]">
             <div className="flex-1 flex bg-[#a6cdec] rounded-[3px] px-2 py-1.5 border border-blue-300">
               <input 
                 ref={inputRef}
                 type="text" 
                 placeholder="Enter Product Name" 
                 value={searchTerm}
                 onChange={(e) => setSearchTerm(e.target.value)}
                 className="w-full bg-transparent border-none outline-none text-[13px] text-gray-800 font-bold placeholder-gray-500"
               />
             </div>
             <button className="bg-[#117a8b] hover:bg-[#0f6674] text-white px-2 py-1.5 rounded-[3px] flex items-center gap-1 text-[12px] font-bold transition-colors">
                <Filter className="w-3.5 h-3.5" /> Product Name
             </button>
          </div>

          {/* Product List */}
          <div className="overflow-y-auto flex-1 custom-scrollbar">
            {filteredProducts.length === 0 ? (
              <div className="p-4 text-center flex flex-col items-center justify-center gap-2">
                <span className="text-sm text-gray-500 font-medium">No products found</span>
                {searchTerm.trim() && (
                  <button 
                    onClick={() => {
                      onEdit({ name: searchTerm });
                      setIsOpen(false);
                    }}
                    className="bg-[#28a745] hover:bg-[#218838] text-white px-3 py-1.5 rounded-[3px] text-[12px] font-bold transition-colors shadow-sm"
                  >
                    + Add "{searchTerm}"
                  </button>
                )}
              </div>
            ) : (
              filteredProducts.map((p, index) => (
                <div 
                  key={p.id} 
                  className={`flex items-center justify-between p-2 border-b border-gray-100 hover:bg-gray-50 cursor-pointer ${index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}`}
                  onClick={() => handleSelect(p.id)}
                >
                  <div className="flex-1 flex flex-col min-w-0 pr-4">
                    <span className="text-[13px] font-bold text-gray-800 truncate">{p.name}</span>
                    <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mt-0.5 text-[11px] font-bold">
                       <span className="text-red-500">MRP : {Number(p.mrp || 0).toFixed(2)}</span>
                       <span className="text-green-600">PRICE : {Number(p.price || 0).toFixed(2)}</span>
                       {(p.wholesalePrice > 0) && (
                         <span className="text-gray-500">W-PRICE : {Number(p.wholesalePrice || 0).toFixed(2)}</span>
                       )}
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3 flex-shrink-0">
                    {/* Stock Badge */}
                    <div className="bg-[#0d6efd] text-white text-[11px] font-bold px-2 py-1 rounded-[3px] min-w-[50px] text-center shadow-sm">
                      {p.stock || 0} pcs
                    </div>
                    
                    {/* Actions */}
                    <div className="flex items-center gap-2">
                      <button 
                        onClick={(e) => { e.stopPropagation(); onEdit(p); setIsOpen(false); }}
                        className="text-[#17a2b8] hover:text-[#138496] bg-[#e0f7fa] p-1 rounded-sm transition-colors"
                        title="Edit Product"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button 
                        onClick={(e) => { e.stopPropagation(); onDelete(p.id); }}
                        className="text-[#dc3545] hover:text-[#c82333] bg-[#fce4e4] p-1 rounded-sm transition-colors"
                        title="Delete Product"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>,
        document.body
      )}
    </div>
  );
}
