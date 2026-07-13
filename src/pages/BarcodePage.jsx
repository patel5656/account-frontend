import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { RefreshCw, X, Settings, Check, Printer, Type, QrCode, Image as ImageIcon, Square, Circle, Minus, Save, ChevronDown, ChevronUp, Barcode as BarcodeIcon, Info, Eye, Edit, Trash2 } from 'lucide-react';
import { cn } from '../utils';
import apiClient from '../api/apiClient';
import { ProductSelectDropdown } from '../components/ProductSelectDropdown';

// Custom YouTube SVG Icon
const YoutubeIcon = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
  </svg>
);

export function BarcodePage() {
  const navigate = useNavigate();
  const [isManufactureProduct, setIsManufactureProduct] = useState(false);
  const [isSpecialCommision, setIsSpecialCommision] = useState(false);
  const [mfgDate, setMfgDate] = useState('2026-06-03');
  const [showTemplates, setShowTemplates] = useState(false);
  const [showDesigner, setShowDesigner] = useState(false);
  const [zoom, setZoom] = useState(200);

  // Template Designer States
  const [elements, setElements] = useState([]);
  const [selectedId, setSelectedId] = useState(null);
  const [showGrid, setShowGrid] = useState(true);
  const [snapToGrid, setSnapToGrid] = useState(true);
  const [gridSize, setGridSize] = useState('1mm');
  const [templateName, setTemplateName] = useState('');

  // Page Setup Panel States
  const [showPageSetup, setShowPageSetup] = useState(false);
  const [activePreset, setActivePreset] = useState('50mm x 25mm');
  const [pageWidth, setPageWidth] = useState('50mm');
  const [pageHeight, setPageHeight] = useState('25mm');
  const [leftMargin, setLeftMargin] = useState('0.5mm');
  const [rightMargin, setRightMargin] = useState('0.5mm');
  const [labelGap, setLabelGap] = useState('1mm');
  const [heightGap, setHeightGap] = useState('1mm');
  const [labelCount, setLabelCount] = useState('1');
  const [pageBreak, setPageBreak] = useState('No');

  // Integration States
  const [products, setProducts] = useState([]);
  const [units, setUnits] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState('');
  const [selectedUnit, setSelectedUnit] = useState('');
  const [printList, setPrintList] = useState([]);
  const [editingItem, setEditingItem] = useState(null);
  const [viewingItem, setViewingItem] = useState(null);

  // Form Fields mapped to product
  const [barcodeInput, setBarcodeInput] = useState('');
  const [mrpInput, setMrpInput] = useState('0');
  const [salePriceInput, setSalePriceInput] = useState('0');
  const [wholesalePriceInput, setWholesalePriceInput] = useState('0');
  const [printQty, setPrintQty] = useState('0');

  useEffect(() => {
    fetchInitialData();
  }, []);

  const fetchInitialData = async () => {
    try {
      const [prodRes, unitRes] = await Promise.all([
        apiClient.get('/products'),
        apiClient.get('/units')
      ]);
      setProducts(prodRes.data?.data || prodRes.data?.products || (Array.isArray(prodRes.data) ? prodRes.data : []));
      setUnits(unitRes.data?.data || (Array.isArray(unitRes.data) ? unitRes.data : []));
    } catch (error) {
      console.error('Error fetching initial data:', error);
    }
  };

  const handleProductSelect = (e) => {
    const prodId = e.target.value;
    setSelectedProduct(prodId);
    if (prodId) {
      const prod = products.find(p => p.id.toString() === prodId);
      if (prod) {
        setBarcodeInput(prod.barcode || '');
        setMrpInput(prod.mrp?.toString() || '0');
        setSalePriceInput(prod.salesPrice?.toString() || prod.price?.toString() || '0');
        setWholesalePriceInput(prod.wholesalePrice?.toString() || '0');
        const unit = units.find(u => u.id.toString() === prod.unitId?.toString());
        setSelectedUnit(unit ? unit.name : (prod.unitId?.toString() || ''));
      }
    } else {
      setBarcodeInput('');
      setMrpInput('0');
      setSalePriceInput('0');
      setWholesalePriceInput('0');
      setSelectedUnit('');
    }
  };

  const handleAddToList = () => {
    if (!selectedProduct) return alert('Please select a product');
    if (!printQty || parseInt(printQty) <= 0) return alert('Please enter a valid quantity');
    
    const prod = products.find(p => p.id.toString() === selectedProduct);
    const newItem = {
      id: Date.now(),
      productId: selectedProduct,
      name: prod?.name || 'Unknown',
      barcode: barcodeInput,
      quantity: printQty,
      salePrice: salePriceInput
    };
    setPrintList([...printList, newItem]);
    
    // Reset selection if needed, or keep it
    setPrintQty('0');
  };

  const handleRemoveFromList = (id) => {
    setPrintList(printList.filter(item => item.id !== id));
  };

  const handleEditItem = (item) => {
    setEditingItem(item);
  };

  const handleViewItem = (item) => {
    setViewingItem(item);
  };

  const handlePresetClick = (preset) => {
    setActivePreset(preset);
    if (preset === '50mm x 25mm') {
      setPageWidth('50mm');
      setPageHeight('25mm');
      setLeftMargin('0.5mm');
      setRightMargin('0.5mm');
      setLabelGap('1mm');
      setHeightGap('1mm');
      setLabelCount('1');
    } else if (preset === '38mm x 25mm') {
      setPageWidth('38mm');
      setPageHeight('25mm');
      setLeftMargin('0.5mm');
      setRightMargin('0.5mm');
      setLabelGap('1mm');
      setHeightGap('1mm');
      setLabelCount('1');
    } else if (preset === '38mm x 25mm (2 Labels)') {
      setPageWidth('78mm');
      setPageHeight('25mm');
      setLeftMargin('0.5mm');
      setRightMargin('0.5mm');
      setLabelGap('2mm');
      setHeightGap('1mm');
      setLabelCount('2');
    } else if (preset === '100mm x 50mm') {
      setPageWidth('100mm');
      setPageHeight('50mm');
      setLeftMargin('1mm');
      setRightMargin('1mm');
      setLabelGap('2mm');
      setHeightGap('2mm');
      setLabelCount('1');
    }
  };

  const parsedWidth = parseFloat(pageWidth) || 50;
  const parsedHeight = parseFloat(pageHeight) || 25;
  const canvasWidth = Math.round(parsedWidth * 6);
  const canvasHeight = Math.round(parsedHeight * 6);

  const addElement = (type) => {
    const newEl = {
      id: Date.now().toString(),
      type,
      x: 40,
      y: 40,
      width: type === 'barcode' ? 140 : type === 'qrcode' ? 60 : type === 'image' ? 60 : type === 'circle' ? 40 : type === 'line' ? 120 : 80,
      height: type === 'barcode' ? 45 : type === 'qrcode' ? 60 : type === 'image' ? 60 : type === 'circle' ? 40 : type === 'line' ? 2 : 25,
      text: type === 'text' ? 'Sample Text' : type === 'barcode' ? '12345678' : type === 'qrcode' ? 'https://google.com' : type === 'image' ? 'Image' : '',
      fontSize: 12,
    };
    setElements([...elements, newEl]);
    setSelectedId(newEl.id);
  };

  const handleMouseDown = (e, id) => {
    e.preventDefault();
    setSelectedId(id);
    
    const element = elements.find(el => el.id === id);
    if (!element) return;

    const startX = e.clientX;
    const startY = e.clientY;
    const startElX = element.x;
    const startElY = element.y;

    const handleMouseMove = (moveEvent) => {
      const deltaX = moveEvent.clientX - startX;
      const deltaY = moveEvent.clientY - startY;
      
      let newX = startElX + deltaX;
      let newY = startElY + deltaY;

      // Snap to grid logic if enabled (snap to cells based on selected gridSize)
      if (snapToGrid) {
        const snapValue = (parseFloat(gridSize) || 1) * 6;
        newX = Math.round(newX / snapValue) * snapValue;
        newY = Math.round(newY / snapValue) * snapValue;
      }

      // Constrain within the canvas boundaries
      newX = Math.max(0, Math.min(canvasWidth - element.width, newX));
      newY = Math.max(0, Math.min(canvasHeight - element.height, newY));

      setElements(prev => prev.map(el => el.id === id ? { ...el, x: newX, y: newY } : el));
    };

    const handleMouseUp = () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  };

  const selectedEl = elements.find(el => el.id === selectedId);

  if (showDesigner) {
    return (
      <div className="bg-[#f4f6f9] min-h-[calc(100vh-60px)] flex flex-col select-none">
        {/* Top Teal Bar for Designer */}
        <div className="bg-[#4F46E5] px-4 py-[6px] flex justify-between items-center text-white h-[45px]">
          <h2 className="text-[14.5px] font-medium tracking-wide">Barcode Template Designer</h2>
          <button 
            onClick={() => {
              setShowDesigner(false);
              setSelectedId(null);
              setElements([]);
              setShowPageSetup(false);
            }}
            className="bg-white text-gray-800 hover:bg-gray-100 border border-gray-300 px-3.5 h-[28px] text-[13px] font-bold rounded-[3px] flex items-center gap-1.5 focus:outline-none transition-colors"
          >
            <X className="w-3.5 h-3.5 text-gray-800" strokeWidth={3} /> Close
          </button>
        </div>

        {/* Toolbar */}
        <div className="bg-white border-b border-gray-200 py-2.5 px-4 flex flex-wrap items-center justify-between gap-4 shadow-sm">
          <div className="flex flex-wrap items-center gap-4">
            <input 
              type="text" 
              placeholder="Template Name"
              value={templateName}
              onChange={(e) => setTemplateName(e.target.value)}
              className="h-[32px] border border-gray-300 rounded-[3px] px-2.5 text-[13px] outline-none placeholder-gray-400 text-gray-700 bg-white focus:border-[#17a2b8] w-[200px]"
            />
            
            <button 
              onClick={() => setShowPageSetup(!showPageSetup)}
              className={cn(
                "px-3 h-[32px] rounded-[3px] flex items-center gap-1.5 text-[13px] font-bold transition-colors focus:outline-none text-white",
                showPageSetup ? "bg-[#0b5ed7]" : "bg-[#0d6efd] hover:bg-[#0b5ed7]"
              )}
            >
              <Settings className="w-3.5 h-3.5" /> Page Setup {showPageSetup ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
            </button>

            <label className="flex items-center gap-1.5 cursor-pointer select-none text-[13.5px] font-bold text-gray-800">
              <input 
                type="checkbox" 
                checked={showGrid}
                onChange={(e) => setShowGrid(e.target.checked)}
                className="w-4 h-4 accent-[#0d6efd]" 
              />
              <span>Show Grid</span>
            </label>

            <div className="flex items-center gap-2">
              <span className="text-[13.5px] font-bold text-gray-800">Zoom:</span>
              <input 
                type="range" 
                min="100" 
                max="300" 
                step="50"
                value={zoom}
                onChange={(e) => setZoom(Number(e.target.value))}
                className="w-[100px] accent-[#0d6efd] cursor-pointer"
              />
              <span className="text-[13.5px] font-bold text-gray-800 w-[45px]">{zoom}%</span>
            </div>

            <label className="flex items-center gap-1.5 cursor-pointer select-none text-[13.5px] font-bold text-gray-800">
              <input 
                type="checkbox" 
                checked={snapToGrid}
                onChange={(e) => setSnapToGrid(e.target.checked)}
                className="w-4 h-4 accent-[#0d6efd]" 
              />
              <span>Snap to Grid</span>
            </label>

            <div className="flex items-center gap-1.5">
              <span className="text-[13.5px] font-bold text-gray-800">Grid Size:</span>
              <select 
                value={gridSize}
                onChange={(e) => setGridSize(e.target.value)}
                className="h-[32px] border border-gray-300 rounded-[3px] px-2 text-[13px] outline-none text-gray-700 bg-white focus:border-[#17a2b8]"
              >
                <option value="1mm">1mm</option>
                <option value="2mm">2mm</option>
                <option value="3mm">3mm</option>
                <option value="5mm">5mm</option>
                <option value="10mm">10mm</option>
                <option value="15mm">15mm</option>
                <option value="20mm">20mm</option>
              </select>
            </div>
          </div>

          <button 
            onClick={() => {
              alert(`Template "${templateName || 'Default'}" saved with ${elements.length} elements.`);
              setShowDesigner(false);
              setElements([]);
              setSelectedId(null);
              setShowPageSetup(false);
            }}
            className="bg-[#28a745] hover:bg-[#218838] text-white px-4 h-[32px] rounded-[3px] flex items-center justify-center gap-1.5 text-[13px] font-bold transition-colors focus:outline-none"
          >
            <Save className="w-4 h-4" /> Save Template
          </button>
        </div>

        {/* Page Setup Options Panel */}
        {showPageSetup && (
          <div className="bg-white border-b border-gray-200 p-5 flex flex-col gap-4 shadow-sm">
            {/* Quick Presets */}
            <div className="flex items-center gap-3">
              <span className="text-[13.5px] font-bold text-gray-800 whitespace-nowrap">Quick Presets:</span>
              <div className="flex flex-wrap gap-2">
                {['50mm x 25mm', '38mm x 25mm', '38mm x 25mm (2 Labels)', '100mm x 50mm', 'Custom'].map((preset) => {
                  const isActive = activePreset === preset;
                  return (
                    <button
                      key={preset}
                      onClick={() => handlePresetClick(preset)}
                      className={cn(
                        "px-3.5 py-1 text-[13px] font-medium border rounded-[3px] transition-all focus:outline-none",
                        isActive 
                          ? "border-[#0d6efd] text-[#0d6efd] bg-[#0d6efd]/5 font-bold" 
                          : "border-[#0d6efd]/40 text-[#0d6efd] bg-white hover:bg-[#0d6efd]/5"
                      )}
                    >
                      {preset}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Form Inputs Grid */}
            <div className="grid grid-cols-4 gap-4">
              <div className="flex flex-col gap-1">
                <label className="text-[13.5px] font-bold text-gray-800">Page Width</label>
                <input 
                  type="text" 
                  value={pageWidth}
                  onChange={(e) => {
                    setPageWidth(e.target.value);
                    setActivePreset('Custom');
                  }}
                  className="h-[34px] border border-gray-300 rounded-[3px] px-2.5 text-[13px] outline-none text-gray-700 bg-white focus:border-[#17a2b8]"
                />
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-[13.5px] font-bold text-gray-800">Page Height</label>
                <input 
                  type="text" 
                  value={pageHeight}
                  onChange={(e) => {
                    setPageHeight(e.target.value);
                    setActivePreset('Custom');
                  }}
                  className="h-[34px] border border-gray-300 rounded-[3px] px-2.5 text-[13px] outline-none text-gray-700 bg-white focus:border-[#17a2b8]"
                />
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-[13.5px] font-bold text-gray-800">Left Margin</label>
                <input 
                  type="text" 
                  value={leftMargin}
                  onChange={(e) => {
                    setLeftMargin(e.target.value);
                    setActivePreset('Custom');
                  }}
                  className="h-[34px] border border-gray-300 rounded-[3px] px-2.5 text-[13px] outline-none text-gray-700 bg-white focus:border-[#17a2b8]"
                />
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-[13.5px] font-bold text-gray-800">Right Margin</label>
                <input 
                  type="text" 
                  value={rightMargin}
                  onChange={(e) => {
                    setRightMargin(e.target.value);
                    setActivePreset('Custom');
                  }}
                  className="h-[34px] border border-gray-300 rounded-[3px] px-2.5 text-[13px] outline-none text-gray-700 bg-white focus:border-[#17a2b8]"
                />
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-[13.5px] font-bold text-gray-800">Label Gap</label>
                <input 
                  type="text" 
                  value={labelGap}
                  onChange={(e) => {
                    setLabelGap(e.target.value);
                    setActivePreset('Custom');
                  }}
                  className="h-[34px] border border-gray-300 rounded-[3px] px-2.5 text-[13px] outline-none text-gray-700 bg-white focus:border-[#17a2b8]"
                />
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-[13.5px] font-bold text-gray-800">Height Gap</label>
                <input 
                  type="text" 
                  value={heightGap}
                  onChange={(e) => {
                    setHeightGap(e.target.value);
                    setActivePreset('Custom');
                  }}
                  className="h-[34px] border border-gray-300 rounded-[3px] px-2.5 text-[13px] outline-none text-gray-700 bg-white focus:border-[#17a2b8]"
                />
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-[13.5px] font-bold text-gray-800">Label Count (per row)</label>
                <input 
                  type="text" 
                  value={labelCount}
                  onChange={(e) => {
                    setLabelCount(e.target.value);
                    setActivePreset('Custom');
                  }}
                  className="h-[34px] border border-gray-300 rounded-[3px] px-2.5 text-[13px] outline-none text-gray-700 bg-white focus:border-[#17a2b8]"
                />
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-[13.5px] font-bold text-gray-800">Page Break</label>
                <select 
                  value={pageBreak}
                  onChange={(e) => setPageBreak(e.target.value)}
                  className="h-[34px] border border-gray-300 rounded-[3px] px-2.5 text-[13px] outline-none text-gray-700 bg-white focus:border-[#17a2b8]"
                >
                  <option value="No">No</option>
                  <option value="Yes">Yes</option>
                </select>
              </div>
            </div>

            {/* Info Banner */}
            <div className="bg-[#17a2b8] text-white py-2.5 px-4 rounded-[3px] flex items-center gap-2 text-[13px] font-medium mt-2">
              <Info className="w-4 h-4 flex-shrink-0" />
              <span>Common sizes: 50mm x 25mm, 38mm x 25mm, 100mm x 50mm. Adjust margins and gaps for proper printing alignment.</span>
            </div>
          </div>
        )}

        {/* Main Work Area */}
        <div className="flex-1 bg-white flex overflow-hidden">
          {/* Left Elements Sidebar */}
          <div className="w-[200px] border-r border-gray-200 p-4 bg-white flex flex-col overflow-y-auto">
            <h3 className="text-[14.5px] font-bold text-gray-800 mb-3 select-none">Elements</h3>
            <div className="flex flex-col border border-gray-200 rounded-[4px] overflow-hidden">
              <button 
                onClick={() => addElement('text')}
                className="w-full flex items-center gap-3 px-4 h-[42px] bg-white hover:bg-[#f8f9fa] border-b border-gray-150 last:border-b-0 text-gray-700 transition-colors text-[13px] font-semibold focus:outline-none"
              >
                <span className="font-serif font-bold text-[15px] text-gray-600 w-4 h-4 flex items-center justify-center">A</span>
                <span>Text</span>
              </button>
              <button 
                onClick={() => addElement('barcode')}
                className="w-full flex items-center gap-3 px-4 h-[42px] bg-white hover:bg-[#f8f9fa] border-b border-gray-150 last:border-b-0 text-gray-700 transition-colors text-[13px] font-semibold focus:outline-none"
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 text-gray-500">
                  <line x1="3" y1="5" x2="3" y2="19" />
                  <line x1="6" y1="5" x2="6" y2="19" />
                  <line x1="10" y1="5" x2="10" y2="19" />
                  <line x1="14" y1="5" x2="14" y2="19" />
                  <line x1="18" y1="5" x2="18" y2="19" />
                  <line x1="21" y1="5" x2="21" y2="19" />
                </svg>
                <span>Barcode</span>
              </button>
              <button 
                onClick={() => addElement('qrcode')}
                className="w-full flex items-center gap-3 px-4 h-[42px] bg-white hover:bg-[#f8f9fa] border-b border-gray-150 last:border-b-0 text-gray-700 transition-colors text-[13px] font-semibold focus:outline-none"
              >
                <QrCode className="w-4 h-4 text-gray-500" />
                <span>QR Code</span>
              </button>
              <button 
                onClick={() => addElement('image')}
                className="w-full flex items-center gap-3 px-4 h-[42px] bg-white hover:bg-[#f8f9fa] border-b border-gray-150 last:border-b-0 text-gray-700 transition-colors text-[13px] font-semibold focus:outline-none"
              >
                <ImageIcon className="w-4 h-4 text-gray-500" />
                <span>Image</span>
              </button>
              <button 
                onClick={() => addElement('rectangle')}
                className="w-full flex items-center gap-3 px-4 h-[42px] bg-white hover:bg-[#f8f9fa] border-b border-gray-150 last:border-b-0 text-gray-700 transition-colors text-[13px] font-semibold focus:outline-none"
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 text-gray-500">
                  <rect x="3" y="3" width="18" height="18" rx="0" />
                </svg>
                <span>Rectangle</span>
              </button>
              <button 
                onClick={() => addElement('circle')}
                className="w-full flex items-center gap-3 px-4 h-[42px] bg-white hover:bg-[#f8f9fa] border-b border-gray-150 last:border-b-0 text-gray-700 transition-colors text-[13px] font-semibold focus:outline-none"
              >
                <Circle className="w-4 h-4 text-gray-500" />
                <span>Circle</span>
              </button>
              <button 
                onClick={() => addElement('line')}
                className="w-full flex items-center gap-3 px-4 h-[42px] bg-white hover:bg-[#f8f9fa] border-b border-gray-150 last:border-b-0 text-gray-700 transition-colors text-[13px] font-semibold focus:outline-none"
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 text-gray-500">
                  <line x1="5" y1="12" x2="19" y2="12" />
                </svg>
                <span>Line</span>
              </button>
            </div>
          </div>

          {/* Middle Design Canvas */}
          <div 
            onClick={() => setSelectedId(null)}
            className="flex-1 bg-[#f1f3f5] flex items-center justify-center p-8 overflow-auto relative"
          >
            <div 
              className="bg-white border-[3px] border-black shadow-lg relative overflow-hidden transition-transform duration-150 ease-out origin-center"
              onClick={(e) => e.stopPropagation()}
              style={{
                width: `${canvasWidth}px`,
                height: `${canvasHeight}px`,
                backgroundImage: showGrid ? 'linear-gradient(to right, #ccc 1px, transparent 1px), linear-gradient(to bottom, #ccc 1px, transparent 1px)' : 'none',
                backgroundSize: `${(parseFloat(gridSize) || 1) * 6}px ${(parseFloat(gridSize) || 1) * 6}px`,
                transform: `scale(${zoom / 100})`,
              }}
            >
              {elements.map((el) => (
                <div
                  key={el.id}
                  onMouseDown={(e) => handleMouseDown(e, el.id)}
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedId(el.id);
                  }}
                  className={cn(
                    "absolute cursor-move select-none flex items-center justify-center",
                    selectedId === el.id ? "z-50" : "z-10"
                  )}
                  style={{
                    left: `${el.x}px`,
                    top: `${el.y}px`,
                    width: `${el.width}px`,
                    height: `${el.height}px`,
                  }}
                >
                  {/* Highlight outline if selected */}
                  {selectedId === el.id && (
                    <div className="absolute inset-[-2px] border-[2px] border-blue-500 pointer-events-none rounded-[1px]">
                      <div className="absolute top-[-3px] left-[-3px] w-1.5 h-1.5 bg-blue-500 rounded-full" />
                      <div className="absolute top-[-3px] right-[-3px] w-1.5 h-1.5 bg-blue-500 rounded-full" />
                      <div className="absolute bottom-[-3px] left-[-3px] w-1.5 h-1.5 bg-blue-500 rounded-full" />
                      <div className="absolute bottom-[-3px] right-[-3px] w-1.5 h-1.5 bg-blue-500 rounded-full" />
                    </div>
                  )}

                  {/* Render based on element type */}
                  {el.type === 'text' && (
                    <span 
                      style={{ fontSize: `${el.fontSize}px` }} 
                      className="font-bold text-black whitespace-nowrap block select-none pointer-events-none"
                    >
                      {el.text}
                    </span>
                  )}

                  {el.type === 'barcode' && (
                    <div className="w-full h-full bg-white flex flex-col items-center justify-between border border-gray-300 p-0.5 pointer-events-none select-none">
                      <div 
                        className="w-full flex-1"
                        style={{
                          backgroundImage: 'repeating-linear-gradient(90deg, #000, #000 2px, transparent 2px, transparent 5px, #000 5px, #000 6px, transparent 6px, transparent 9px)',
                          backgroundSize: '16px 100%'
                        }}
                      />
                      <span className="text-[8px] font-mono tracking-[2px] leading-none mt-0.5">{el.text || '12345678'}</span>
                    </div>
                  )}

                  {el.type === 'qrcode' && (
                    <div className="w-full h-full bg-white border border-gray-300 p-1 flex flex-col relative pointer-events-none select-none">
                      <div className="absolute top-0.5 left-0.5 w-2 h-2 border border-black bg-white flex items-center justify-center">
                        <div className="w-0.5 h-0.5 bg-black"></div>
                      </div>
                      <div className="absolute top-0.5 right-0.5 w-2 h-2 border border-black bg-white flex items-center justify-center">
                        <div className="w-0.5 h-0.5 bg-black"></div>
                      </div>
                      <div className="absolute bottom-0.5 left-0.5 w-2 h-2 border border-black bg-white flex items-center justify-center">
                        <div className="w-0.5 h-0.5 bg-black"></div>
                      </div>
                      <div 
                        className="w-full h-full opacity-60"
                        style={{
                          backgroundImage: 'radial-gradient(circle, #000 25%, transparent 25%), radial-gradient(circle, #000 25%, transparent 25%)',
                          backgroundPosition: '0 0, 1.5px 1.5px',
                          backgroundSize: '3px 3px'
                        }}
                      />
                    </div>
                  )}

                  {el.type === 'image' && (
                    <div className="w-full h-full bg-gray-100 border border-dashed border-gray-400 flex items-center justify-center text-[10px] text-gray-500 font-bold p-1 pointer-events-none select-none">
                      <ImageIcon className="w-3.5 h-3.5 mr-0.5 text-gray-400" />
                      <span className="truncate">{el.text || 'Image'}</span>
                    </div>
                  )}

                  {el.type === 'rectangle' && (
                    <div className="w-full h-full border-[2px] border-black bg-transparent pointer-events-none select-none" />
                  )}

                  {el.type === 'circle' && (
                    <div className="w-full h-full border-[2px] border-black rounded-full bg-transparent pointer-events-none select-none" />
                  )}

                  {el.type === 'line' && (
                    <div className="w-full h-0 border-t-[2px] border-black pointer-events-none select-none" />
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Right Properties Sidebar */}
          <div className="w-[220px] border-l border-gray-200 p-4 bg-white flex flex-col overflow-y-auto">
            <h3 className="text-[14.5px] font-bold text-gray-800 mb-3 select-none">Properties</h3>
            {selectedEl ? (
              <div className="flex flex-col gap-3">
                <div className="text-[12px] font-bold text-gray-700">
                  Type: <span className="text-[#0d6efd] uppercase">{selectedEl.type}</span>
                </div>

                {/* X & Y position */}
                <div className="flex gap-2">
                  <div className="flex-1 flex flex-col gap-1">
                    <label className="text-[11px] font-bold text-gray-500">Position X (px)</label>
                    <input 
                      type="number" 
                      value={selectedEl.x} 
                      onChange={(e) => {
                        const val = Math.max(0, Math.min(canvasWidth - selectedEl.width, Number(e.target.value)));
                        setElements(prev => prev.map(el => el.id === selectedId ? { ...el, x: val } : el));
                      }}
                      className="h-[28px] border border-gray-300 rounded-[3px] px-1.5 text-[12px] outline-none text-gray-700 bg-white"
                    />
                  </div>
                  <div className="flex-1 flex flex-col gap-1">
                    <label className="text-[11px] font-bold text-gray-500">Position Y (px)</label>
                    <input 
                      type="number" 
                      value={selectedEl.y} 
                      onChange={(e) => {
                        const val = Math.max(0, Math.min(canvasHeight - selectedEl.height, Number(e.target.value)));
                        setElements(prev => prev.map(el => el.id === selectedId ? { ...el, y: val } : el));
                      }}
                      className="h-[28px] border border-gray-300 rounded-[3px] px-1.5 text-[12px] outline-none text-gray-700 bg-white"
                    />
                  </div>
                </div>

                {/* Width & Height */}
                {selectedEl.type !== 'line' && (
                  <div className="flex gap-2">
                    <div className="flex-1 flex flex-col gap-1">
                      <label className="text-[11px] font-bold text-gray-500">Width (px)</label>
                      <input 
                        type="number" 
                        value={selectedEl.width} 
                        onChange={(e) => {
                          const val = Math.max(10, Math.min(canvasWidth - selectedEl.x, Number(e.target.value)));
                          setElements(prev => prev.map(el => el.id === selectedId ? { ...el, width: val } : el));
                        }}
                        className="h-[28px] border border-gray-300 rounded-[3px] px-1.5 text-[12px] outline-none text-gray-700 bg-white"
                      />
                    </div>
                    <div className="flex-1 flex flex-col gap-1">
                      <label className="text-[11px] font-bold text-gray-500">Height (px)</label>
                      <input 
                        type="number" 
                        value={selectedEl.height} 
                        onChange={(e) => {
                          const val = Math.max(10, Math.min(canvasHeight - selectedEl.y, Number(e.target.value)));
                          setElements(prev => prev.map(el => el.id === selectedId ? { ...el, height: val } : el));
                        }}
                        className="h-[28px] border border-gray-300 rounded-[3px] px-1.5 text-[12px] outline-none text-gray-700 bg-white"
                      />
                    </div>
                  </div>
                )}

                {/* Text Content (Value) */}
                {['text', 'barcode', 'qrcode', 'image'].includes(selectedEl.type) && (
                  <div className="flex flex-col gap-1">
                    <label className="text-[11px] font-bold text-gray-500">Content Value</label>
                    <input 
                      type="text" 
                      value={selectedEl.text} 
                      onChange={(e) => setElements(prev => prev.map(el => el.id === selectedId ? { ...el, text: e.target.value } : el))}
                      className="h-[28px] border border-gray-300 rounded-[3px] px-2 text-[12px] outline-none text-gray-700 bg-white"
                    />
                  </div>
                )}

                {/* Font Size */}
                {selectedEl.type === 'text' && (
                  <div className="flex flex-col gap-1">
                    <label className="text-[11px] font-bold text-gray-500">Font Size (px)</label>
                    <input 
                      type="number" 
                      value={selectedEl.fontSize} 
                      onChange={(e) => setElements(prev => prev.map(el => el.id === selectedId ? { ...el, fontSize: Number(e.target.value) } : el))}
                      className="h-[28px] border border-gray-300 rounded-[3px] px-1.5 text-[12px] outline-none text-gray-700 bg-white"
                    />
                  </div>
                )}

                <button 
                  onClick={() => {
                    setElements(prev => prev.filter(el => el.id !== selectedId));
                    setSelectedId(null);
                  }}
                  className="w-full mt-4 bg-red-600 hover:bg-red-700 text-white py-1.5 rounded-[3px] text-[12px] font-bold transition-colors focus:outline-none flex items-center justify-center gap-1"
                >
                  <X className="w-3.5 h-3.5" /> Delete Element
                </button>
              </div>
            ) : (
              <p className="text-[13px] text-gray-500 font-medium select-none">
                Select an element to edit properties
              </p>
            )}
          </div>
        </div>
      </div>
    );
  }

  if (showTemplates) {
    return (
      <div className="bg-[#f4f6f9] min-h-[calc(100vh-60px)] flex flex-col">
        {/* Top Teal Bar for Templates */}
        <div className="bg-[#4F46E5] px-4 py-[6px] flex justify-between items-center text-white h-[45px]">
          <h2 className="text-[14.5px] font-medium tracking-wide">Barcode Templates</h2>
          <div className="flex items-center gap-1.5">
            <button 
              onClick={() => setShowDesigner(true)}
              className="bg-[#28a745] hover:bg-[#218838] text-white px-3.5 h-8 rounded-[3px] flex items-center justify-center gap-1 text-[13px] font-bold transition-colors focus:outline-none"
            >
              <span className="text-[15px] leading-none">+</span> New Template
            </button>
            <button 
              onClick={() => setShowTemplates(false)}
              className="w-8 h-8 bg-[#dc3545] hover:bg-[#c82333] text-white rounded-[3px] flex items-center justify-center transition-colors focus:outline-none"
            >
              <X className="w-4 h-4" strokeWidth={3} />
            </button>
          </div>
        </div>

        <div className="flex-1 bg-white flex flex-col p-6">
          <div className="flex-1 border border-gray-150 rounded-[3px] bg-white flex flex-col items-center justify-center min-h-[350px] shadow-sm">
            <p className="text-gray-600 text-[14px] font-medium text-center">
              No templates found. Create your first template to get started.
            </p>
            <button 
              onClick={() => setShowDesigner(true)}
              className="mt-4 bg-[#0d6efd] hover:bg-[#0b5ed7] text-white px-4 py-2 rounded-[3px] flex items-center gap-1.5 text-[13px] font-bold transition-colors focus:outline-none"
            >
              <span className="text-[15px] leading-none">+</span> Create Template
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#f4f6f9] min-h-[calc(100vh-60px)] flex flex-col">
      {/* Top Teal Bar */}
      <div className="bg-[#4F46E5] px-4 py-[6px] flex justify-between items-center text-white h-[45px]">
        <h2 className="text-[14.5px] font-medium tracking-wide">Barcode</h2>
        <div className="flex items-center gap-1.5">
          <button className="w-8 h-8 bg-red-600 hover:bg-red-700 text-white rounded-[3px] flex items-center justify-center transition-colors focus:outline-none">
             <YoutubeIcon className="w-4 h-4" />
          </button>
          <button className="w-8 h-8 bg-[#ffc107] hover:bg-[#e0a800] text-gray-900 rounded-[3px] flex items-center justify-center transition-colors focus:outline-none">
            <RefreshCw className="w-4 h-4" strokeWidth={2.5} />
          </button>
          <button 
            onClick={() => navigate(-1)}
            className="w-8 h-8 bg-[#dc3545] hover:bg-[#c82333] text-white rounded-[3px] flex items-center justify-center transition-colors focus:outline-none"
          >
            <X className="w-4 h-4" strokeWidth={3} />
          </button>
        </div>
      </div>

      <div className="flex-1 bg-white flex flex-col">
        {/* Main Form Area */}
        <div className="p-6 flex flex-col">
          <div className="flex flex-col md:flex-row gap-6 items-stretch">
            
            {/* Left Form */}
            <div className="flex-1 flex flex-col gap-4">
              
              {/* Barcode Template */}
              <div className="flex flex-col gap-1.5">
                <label className="text-[13px] font-bold text-gray-800">Barcode Template</label>
                <div className="flex gap-1.5">
                  <div className="flex-1 relative flex">
                    <input 
                      list="barcode-templates"
                      placeholder="Select Template (or use default)"
                      className="w-full h-[32px] border border-gray-300 rounded-[3px] px-2 text-[13px] outline-none text-gray-700 bg-white focus:border-[#17a2b8]"
                    />
                    <datalist id="barcode-templates">
                      <option value="Select Template (or use default)" />
                    </datalist>
                  </div>
                  <button 
                    onClick={() => setShowTemplates(true)}
                    className="bg-[#17a2b8] hover:bg-[#138496] text-white px-2.5 rounded-[3px] flex items-center justify-center transition-colors focus:outline-none"
                  >
                    <Settings className="w-4 h-4" strokeWidth={2} />
                  </button>
                </div>
              </div>

              {/* Row 1: Product Select, Product Units, Barcode */}
              <div className="flex gap-4 items-end">
                <div className="flex-1 flex flex-col gap-1.5">
                  <div className="flex items-center justify-between">
                    <span className="bg-[#17a2b8] text-white text-[11px] font-bold px-2 py-0.5 rounded-[2px] leading-none select-none">
                      Barcode
                    </span>
                    <div className="flex items-center gap-1.5">
                      <div 
                        onClick={() => setIsManufactureProduct(!isManufactureProduct)}
                        className={cn(
                          "w-[32px] h-[18px] rounded-full relative cursor-pointer border transition-colors duration-200",
                          isManufactureProduct ? "bg-[#0d6efd] border-[#0d6efd]" : "bg-gray-300 border-gray-400"
                        )}
                      >
                        <div className={cn(
                          "w-[14px] h-[14px] bg-white rounded-full absolute top-[2px] transition-transform duration-200",
                          isManufactureProduct ? "translate-x-[16px]" : "translate-x-[2px]"
                        )}></div>
                      </div>
                      <span className="text-[13px] font-bold text-gray-800 select-none">Manufacture Product</span>
                    </div>
                  </div>
                  <div className="w-full h-[32px] border border-gray-300 bg-[#a6cdec] rounded-[3px] focus-within:border-[#17a2b8]">
                    <ProductSelectDropdown 
                      products={products}
                      value={selectedProduct}
                      onChange={(id) => handleProductSelect({ target: { value: id } })}
                      onEdit={() => {}}
                      onDelete={() => {}}
                    />
                  </div>
                </div>
                
                <div className="flex-1 flex flex-col gap-1.5">
                  <label className="text-[13px] font-bold text-gray-800">Product Units</label>
                  <div className="flex-1 relative flex">
                    <input 
                      list="product-units-list"
                      value={selectedUnit}
                      onChange={(e) => setSelectedUnit(e.target.value)}
                      placeholder="Select Unit"
                      className="w-full h-[32px] border border-gray-300 rounded-[3px] px-2 text-[13px] outline-none text-gray-700 bg-white focus:border-[#17a2b8]"
                    />
                    <datalist id="product-units-list">
                      {units.map(u => (
                        <option key={u.id} value={u.name} />
                      ))}
                    </datalist>
                  </div>
                </div>

                <div className="flex-1 flex flex-col gap-1.5">
                  <label className="text-[13px] font-bold text-gray-800">Barcode</label>
                  <input 
                    type="text"
                    value={barcodeInput}
                    onChange={(e) => setBarcodeInput(e.target.value)}
                    placeholder="Barcode Number"
                    className="w-full h-[32px] border border-gray-300 rounded-[3px] px-2 text-[13px] outline-none placeholder-gray-400 text-gray-700 bg-white focus:border-[#17a2b8]"
                  />
                </div>
              </div>

              {/* Row 2: MRP, Sale Price & Whole Sale Price */}
              <div className="flex gap-4">
                <div className="flex-1 flex flex-col gap-1.5">
                  <label className="text-[13px] font-bold text-gray-800">MRP</label>
                  <input 
                    type="text"
                    value={mrpInput}
                    onChange={(e) => setMrpInput(e.target.value)}
                    className="w-full h-[32px] border border-gray-300 rounded-[3px] px-2 text-[13px] outline-none text-gray-700 bg-white focus:border-[#17a2b8]"
                  />
                </div>
                <div className="flex-1 flex flex-col gap-1.5">
                  <label className="text-[13px] font-bold text-gray-800">Sale Price</label>
                  <input 
                    type="text"
                    value={salePriceInput}
                    onChange={(e) => setSalePriceInput(e.target.value)}
                    className="w-full h-[32px] border border-gray-300 rounded-[3px] px-2 text-[13px] outline-none text-gray-700 bg-white focus:border-[#17a2b8]"
                  />
                </div>
                <div className="flex-1 flex flex-col gap-1.5">
                  <label className="text-[13px] font-bold text-gray-800">Whole Sale Price</label>
                  <input 
                    type="text"
                    value={wholesalePriceInput}
                    onChange={(e) => setWholesalePriceInput(e.target.value)}
                    className="w-full h-[32px] border border-gray-300 rounded-[3px] px-2 text-[13px] outline-none text-gray-700 bg-white focus:border-[#17a2b8]"
                  />
                </div>
              </div>

              {/* Row 3 (Conditional): Date of Manufacture, Batch No., Net Quantity */}
              {isManufactureProduct && (
                <div className="flex gap-4">
                  <div className="flex-1 flex flex-col gap-1.5">
                    <label className="text-[13px] font-bold text-gray-800">Date of Manufacture</label>
                    <input 
                      type="date"
                      value={mfgDate}
                      onChange={(e) => setMfgDate(e.target.value)}
                      className="w-full h-[32px] border border-gray-300 rounded-[3px] px-2 text-[13px] outline-none text-gray-700 bg-white focus:border-[#17a2b8]"
                    />
                  </div>
                  <div className="flex-1 flex flex-col gap-1.5">
                    <label className="text-[13px] font-bold text-gray-800">Batch No.</label>
                    <input 
                      type="text"
                      placeholder="Enter Batch No."
                      className="w-full h-[32px] border border-gray-300 rounded-[3px] px-2 text-[13px] outline-none placeholder-gray-400 text-gray-700 bg-white focus:border-[#17a2b8]"
                    />
                  </div>
                  <div className="flex-1 flex flex-col gap-1.5">
                    <label className="text-[13px] font-bold text-gray-800">Net Quantity</label>
                    <input 
                      type="text"
                      defaultValue="0"
                      className="w-full h-[32px] border border-gray-300 rounded-[3px] px-2 text-[13px] outline-none text-gray-700 bg-white focus:border-[#17a2b8]"
                    />
                  </div>
                </div>
              )}

              {/* Row 4 (Conditional): Marketed By, Marketed Address */}
              {isManufactureProduct && (
                <div className="flex gap-4">
                  <div className="flex-1 flex flex-col gap-1.5">
                    <label className="text-[13px] font-bold text-gray-800">Marketed By</label>
                    <input 
                      type="text"
                      placeholder="Enter Marketed By"
                      className="w-full h-[32px] border border-gray-300 rounded-[3px] px-2 text-[13px] outline-none placeholder-gray-400 text-gray-700 bg-white focus:border-[#17a2b8]"
                    />
                  </div>
                  <div className="flex-[2] flex flex-col gap-1.5">
                    <label className="text-[13px] font-bold text-gray-800">Marketed Address</label>
                    <input 
                      type="text"
                      placeholder="Enter Marketed Address"
                      className="w-full h-[32px] border border-gray-300 rounded-[3px] px-2 text-[13px] outline-none placeholder-gray-400 text-gray-700 bg-white focus:border-[#17a2b8]"
                    />
                  </div>
                </div>
              )}

              {/* Row 5: Quantity to Print & Auto Quantity */}
              <div className="flex gap-4">
                <div className="flex-1 flex flex-col gap-1.5">
                  <label className="text-[13px] font-bold text-gray-800">Quantity to Print</label>
                  <input 
                    type="number"
                    value={printQty}
                    onChange={(e) => setPrintQty(e.target.value)}
                    className="w-full h-[32px] border border-gray-300 rounded-[3px] px-2 text-[13px] outline-none text-gray-700 bg-white focus:border-[#17a2b8]"
                  />
                </div>
                <div className="flex-1 flex flex-col gap-1.5">
                  <label className="text-[13px] font-bold text-gray-800">Auto Quantity</label>
                  <input 
                    type="text"
                    defaultValue="0"
                    className="w-full h-[32px] border border-gray-300 rounded-[3px] px-2 text-[13px] outline-none text-gray-700 bg-white focus:border-[#17a2b8]"
                  />
                </div>
                <div className="flex-1"></div>
              </div>

            </div>

            {/* Right Preview */}
            <div className="w-full md:w-[380px] flex flex-col">
              <div className="w-full h-full min-h-[190px] border border-gray-800 bg-[#f8f9fa] flex items-center justify-center rounded-[3px] p-4">
                <div className="flex items-center gap-2">
                  <div 
                    onClick={() => setIsSpecialCommision(!isSpecialCommision)}
                    className={cn(
                      "w-[32px] h-[18px] rounded-full relative cursor-pointer transition-colors duration-200 border",
                      isSpecialCommision ? "bg-[#0d6efd] border-[#0d6efd]" : "bg-gray-300 border-gray-400"
                    )}
                  >
                    <div className={cn(
                      "w-[14px] h-[14px] bg-white rounded-full absolute top-[2px] transition-transform duration-200 shadow-sm",
                      isSpecialCommision ? "translate-x-[16px]" : "translate-x-[2px]"
                    )}></div>
                  </div>
                  <span className="text-[13px] font-bold text-gray-800 select-none">Special Commision</span>
                </div>
              </div>
            </div>

          </div>

          {/* Buttons */}
          <div className="flex gap-2 justify-center mt-6 mb-2">
            <button 
              onClick={handleAddToList}
              className="bg-[#28a745] hover:bg-[#218838] text-white px-4 py-1.5 rounded-[3px] text-[13px] font-medium flex items-center justify-center gap-1.5 transition-colors focus:outline-none"
            >
              <Check className="w-3.5 h-3.5" strokeWidth={3} /> Submit
            </button>
            <button className="bg-[#17a2b8] hover:bg-[#138496] text-white px-4 py-1.5 rounded-[3px] text-[13px] font-medium flex items-center justify-center gap-1.5 transition-colors focus:outline-none">
              <Printer className="w-[14px] h-[14px]" strokeWidth={2} /> Print
            </button>
          </div>
        </div>

        {/* Bottom Table */}
        <div className="w-full mb-1">
          <div className="table-scroll w-full overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-[#343a40] text-white">
                  <th className="py-[6px] px-2 text-left text-[11px] font-bold border-r border-gray-500 w-[60px] whitespace-nowrap">S/NO</th>
                  <th className="py-[6px] px-2 text-left text-[11px] font-bold border-r border-gray-500 whitespace-nowrap">Product Name</th>
                  <th className="py-[6px] px-2 text-left text-[11px] font-bold border-r border-gray-500 whitespace-nowrap">Barcode</th>
                  <th className="py-[6px] px-2 text-left text-[11px] font-bold border-r border-gray-500 w-[150px] whitespace-nowrap">Quantity to Print</th>
                  <th className="py-[6px] px-2 text-left text-[11px] font-bold border-r border-gray-500 w-[120px] whitespace-nowrap">Sale Price</th>
                  <th className="py-[6px] px-2 text-center text-[11px] font-bold uppercase w-[80px] whitespace-nowrap">ACTION</th>
                </tr>
              </thead>
              <tbody>
                {printList.map((item, index) => (
                  <tr key={item.id} className="border-b border-gray-200">
                    <td className="py-2 px-2 text-left text-[12px] font-medium border-r border-gray-200">{index + 1}</td>
                    <td className="py-2 px-2 text-left text-[12px] font-medium border-r border-gray-200">{item.name}</td>
                    <td className="py-2 px-2 text-left text-[12px] font-medium border-r border-gray-200">{item.barcode}</td>
                    <td className="py-2 px-2 text-left text-[12px] font-medium border-r border-gray-200">{item.quantity}</td>
                    <td className="py-2 px-2 text-left text-[12px] font-medium border-r border-gray-200">{item.salePrice}</td>
                    <td className="py-2 px-2 text-center">
                      <div className="flex items-center justify-center gap-2">
                        <button 
                          onClick={() => handleViewItem(item)}
                          className="text-[#17a2b8] hover:text-[#138496] bg-[#e0f7fa] p-1.5 rounded-sm transition-colors focus:outline-none"
                          title="View"
                        >
                          <Eye className="w-3.5 h-3.5" />
                        </button>
                        <button 
                          onClick={() => handleEditItem(item)}
                          className="text-[#0d6efd] hover:text-[#0b5ed7] bg-[#e6f0ff] p-1.5 rounded-sm transition-colors focus:outline-none"
                          title="Edit"
                        >
                          <Edit className="w-3.5 h-3.5" />
                        </button>
                        <button 
                          onClick={() => handleRemoveFromList(item.id)}
                          className="text-[#dc3545] hover:text-[#c82333] bg-[#fce4e4] p-1.5 rounded-sm transition-colors focus:outline-none"
                          title="Delete"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
                {printList.length === 0 && (
                  <tr>
                    <td colSpan="6" className="text-center py-4 text-gray-500 text-[12px]">No barcodes added to print list.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
          <div className="h-6 w-full border border-t-0 border-gray-300"></div>
        </div>
      </div>

      {/* Edit Modal */}
      {editingItem && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[9999]">
          <div className="bg-white rounded-[3px] p-5 w-[400px] shadow-2xl">
            <h2 className="text-[15px] font-bold text-gray-800 mb-4 border-b pb-2">Edit Print Item</h2>
            <div className="flex flex-col gap-3">
              <div className="flex flex-col gap-1.5">
                <label className="text-[13px] font-bold text-gray-800">Quantity to Print</label>
                <input 
                  type="number" 
                  className="w-full h-[32px] border border-gray-300 rounded-[3px] px-2 text-[13px] outline-none text-gray-700 focus:border-[#17a2b8]"
                  value={editingItem.quantity}
                  onChange={e => setEditingItem({...editingItem, quantity: e.target.value})}
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-[13px] font-bold text-gray-800">Sale Price</label>
                <input 
                  type="text" 
                  className="w-full h-[32px] border border-gray-300 rounded-[3px] px-2 text-[13px] outline-none text-gray-700 focus:border-[#17a2b8]"
                  value={editingItem.salePrice}
                  onChange={e => setEditingItem({...editingItem, salePrice: e.target.value})}
                />
              </div>
              <div className="flex gap-2 justify-end mt-4">
                <button className="bg-gray-400 hover:bg-gray-500 text-white px-4 py-1.5 rounded-[3px] text-[13px] font-medium transition-colors" onClick={() => setEditingItem(null)}>Cancel</button>
                <button className="bg-[#0d6efd] hover:bg-[#0b5ed7] text-white px-4 py-1.5 rounded-[3px] text-[13px] font-medium transition-colors" onClick={() => {
                  setPrintList(printList.map(i => i.id === editingItem.id ? editingItem : i));
                  setEditingItem(null);
                }}>Save Changes</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* View Modal */}
      {viewingItem && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[9999]">
          <div className="bg-white rounded-[3px] p-5 w-[400px] shadow-2xl">
            <h2 className="text-[15px] font-bold text-gray-800 mb-4 border-b pb-2">View Print Item</h2>
            <div className="flex flex-col gap-3 text-[13px] text-gray-700">
              <div className="grid grid-cols-3 border-b pb-1"><span className="font-bold text-gray-800">Product Name</span> <span className="col-span-2">{viewingItem.name}</span></div>
              <div className="grid grid-cols-3 border-b pb-1"><span className="font-bold text-gray-800">Barcode</span> <span className="col-span-2">{viewingItem.barcode}</span></div>
              <div className="grid grid-cols-3 border-b pb-1"><span className="font-bold text-gray-800">Quantity</span> <span className="col-span-2">{viewingItem.quantity}</span></div>
              <div className="grid grid-cols-3 border-b pb-1"><span className="font-bold text-gray-800">Sale Price</span> <span className="col-span-2">{viewingItem.salePrice}</span></div>
              <div className="flex gap-2 justify-end mt-4">
                <button className="bg-[#17a2b8] hover:bg-[#138496] text-white px-4 py-1.5 rounded-[3px] text-[13px] font-medium transition-colors" onClick={() => setViewingItem(null)}>Close</button>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
