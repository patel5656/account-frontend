import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  X, 
  Search, 
  Printer,
  PlusCircle,
  Trash2,
  PauseCircle,
  ScanBarcode,
  CreditCard,
  Banknote,
  Smartphone,
  CheckCircle2,
  PackageSearch
} from 'lucide-react';
import { cn } from '../utils';
import { ProductMasterModal } from '../components/ProductMasterModal';

export function PosBilling() {
  const navigate = useNavigate();
  
  // States
  const [barcodeInput, setBarcodeInput] = useState('');
  const [cart, setCart] = useState([]);
  const [customerName, setCustomerName] = useState('Cash Customer');
  const [paymentMode, setPaymentMode] = useState('Cash'); // Cash, Card, UPI
  const [isPrintModalOpen, setIsPrintModalOpen] = useState(false);
  const [isProductModalOpen, setIsProductModalOpen] = useState(false);
  const [billDiscount, setBillDiscount] = useState(0);

  // Focus ref for quick barcode scanning
  const barcodeRef = useRef(null);

  useEffect(() => {
    // Auto focus barcode scanner on load
    if (barcodeRef.current) {
      barcodeRef.current.focus();
    }
  }, []);

  // Products database
  // Products database - Mocking Centralized Item Master configurations
  const [products, setProducts] = useState([
    { 
      id: 1, name: 'Smartphone X', barcode: '12345', 
      mrp: 1200, base_price: 1000, price: 1000, tax: 5,
      wholesale_price: 900, credit_sale_price: 1050,
      qty_slabs: [{ min: 10, max: 49, price: 950 }, { min: 50, max: 99999, price: 850 }]
    },
    { 
      id: 2, name: 'Amul Butter 100g', barcode: '12346', 
      mrp: 60, base_price: 55, price: 55, tax: 5,
      wholesale_price: 50, credit_sale_price: 58,
      qty_slabs: [{ min: 10, max: 999, price: 48 }]
    },
    { id: 3, name: 'Aashirvaad Atta 5kg', barcode: '12347', mrp: 250, base_price: 210, price: 210, tax: 0, wholesale_price: 200, credit_sale_price: 215, qty_slabs: [] },
    { id: 4, name: 'Maggi Masala 140g', barcode: '12348', mrp: 30, base_price: 28, price: 28, tax: 12, wholesale_price: 26, credit_sale_price: 30, qty_slabs: [] },
    { id: 5, name: 'Tata Salt 1kg', barcode: '12349', mrp: 28, base_price: 25, price: 25, tax: 0, wholesale_price: 23, credit_sale_price: 26, qty_slabs: [] },
    { id: 6, name: 'Surf Excel 1kg', barcode: '12350', mrp: 150, base_price: 135, price: 135, tax: 18, wholesale_price: 125, credit_sale_price: 140, qty_slabs: [] },
    { id: 7, name: 'Santoor Soap 125g', barcode: '12351', mrp: 40, base_price: 35, price: 35, tax: 18, wholesale_price: 32, credit_sale_price: 38, qty_slabs: [] },
    { id: 8, name: 'Fortune Oil 1L', barcode: '12352', mrp: 160, base_price: 145, price: 145, tax: 5, wholesale_price: 135, credit_sale_price: 150, qty_slabs: [] },
  ]);

  const [isWholesale, setIsWholesale] = useState(false);

  // Dynamic Price Calculation from Item Master
  const calculateItemPrice = (product, currentQty, currentPaymentMode, wholesaleStatus) => {
    if (!product.base_price) return product.price; // Fallback
    
    let newPrice = product.base_price;
    let reason = "Standard Retail";

    if (currentPaymentMode === 'Credit') {
      newPrice = product.credit_sale_price || product.base_price;
      reason = "Credit Sale Price";
    } else if (wholesaleStatus) {
      newPrice = product.wholesale_price || product.base_price;
      reason = "Wholesale Price";
    }

    // Check quantity slabs
    if (product.qty_slabs && product.qty_slabs.length > 0) {
      const matchingSlab = product.qty_slabs.find(slab => currentQty >= slab.min && currentQty <= slab.max);
      if (matchingSlab && currentPaymentMode !== 'Credit') {
        newPrice = matchingSlab.price;
        reason = `Qty Price (${matchingSlab.min}+)`;
      }
    }

    return { price: newPrice, reason };
  };

  // Recalculate cart prices when globally toggling Payment Mode or Wholesale
  useEffect(() => {
    setCart(prevCart => prevCart.map(item => {
      const productDef = products.find(p => p.id === item.id) || item;
      const { price: newPrice, reason } = calculateItemPrice(productDef, item.qty, paymentMode, isWholesale);
      return { ...item, price: newPrice, total: item.qty * newPrice, priceReason: reason };
    }));
  }, [paymentMode, isWholesale]);

  const handleBarcodeSubmit = (e) => {
    e.preventDefault();
    if (!barcodeInput.trim()) return;

    // Find product
    const product = products.find(p => p.barcode === barcodeInput.trim() || p.name.toLowerCase().includes(barcodeInput.toLowerCase()));
    
    if (product) {
      addToCart(product);
      setBarcodeInput(''); // Clear for next scan
    } else {
      alert('Product not found!');
    }
  };

  const addToCart = (product) => {
    setCart(prevCart => {
      const existing = prevCart.find(item => item.id === product.id);
      let newQty = 1;
      if (existing) {
        newQty = existing.qty + 1;
      }
      
      const { price: newPrice, reason } = calculateItemPrice(product, newQty, paymentMode, isWholesale);
      
      if (existing) {
        return prevCart.map(item => 
          item.id === product.id 
            ? { ...item, qty: newQty, price: newPrice, total: newQty * newPrice, priceReason: reason }
            : item
        );
      }
      return [...prevCart, { ...product, qty: 1, discount: 0, price: newPrice, total: newPrice, priceReason: reason }];
    });
  };

  const updateQty = (id, newQty) => {
    if (newQty < 1) return;
    setCart(prevCart => prevCart.map(item => {
      if (item.id === id) {
        const productDef = products.find(p => p.id === id) || item;
        const { price: newPrice, reason } = calculateItemPrice(productDef, newQty, paymentMode, isWholesale);
        return { ...item, qty: newQty, price: newPrice, total: newQty * newPrice, priceReason: reason };
      }
      return item;
    }));
  };

  const removeItem = (id) => {
    setCart(prevCart => prevCart.filter(item => item.id !== id));
  };

  const handleCheckout = () => {
    if (cart.length === 0) {
      alert("Cart is empty!");
      return;
    }
    // Open Print Modal simulating save
    setIsPrintModalOpen(true);
  };

  // Calculations
  const subtotal = cart.reduce((acc, item) => acc + item.total, 0);
  const totalTax = cart.reduce((acc, item) => acc + (item.total * (item.tax / 100)), 0);
  const finalAmount = Math.max(0, subtotal + totalTax - billDiscount);
  const totalItems = cart.reduce((acc, item) => acc + item.qty, 0);

  return (
    <div className="bg-[#f4f6f9] min-h-[calc(100vh-45px)] flex flex-col relative">
      <div className="bg-white m-3 mt-0 shadow-sm border border-gray-200 flex-1 flex flex-col md:flex-row overflow-hidden">
        
        {/* Left Side: Cart & Billing (70%) */}
        <div className="flex-1 flex flex-col border-r border-gray-200">
          
          {/* Top Header */}
          <div className="bg-[#4F46E5] flex items-center justify-between px-3 py-2">
            <h2 className="text-white font-bold text-[16px] flex items-center gap-2">
              <ScanBarcode className="w-5 h-5" /> 
              Point of Sale (POS)
            </h2>
            <div className="flex items-center gap-4">
              <div 
                className="flex flex-wrap items-center gap-1.5 cursor-pointer bg-black/20 px-2 py-1 rounded" 
                onClick={() => setIsWholesale(!isWholesale)}
              >
                <span className={`text-[12px] font-bold ${!isWholesale ? 'text-white' : 'text-gray-300'}`}>Retail</span>
                <div className={`w-[28px] h-[16px] rounded-full relative border transition-colors ${isWholesale ? 'bg-[#ffc107] border-[#d39e00]' : 'bg-gray-400 border-gray-500'}`}>
                  <div className={`w-[12px] h-[12px] rounded-full absolute top-[1px] transition-all bg-white shadow-sm ${isWholesale ? 'right-[1px]' : 'left-[1px]'}`}></div>
                </div>
                <span className={`text-[12px] font-bold ${isWholesale ? 'text-white' : 'text-gray-300'}`}>Wholesale</span>
              </div>
              <button 
                onClick={() => navigate('/dashboard')}
                className="bg-[#dc3545] p-1 rounded-sm shadow-sm hover:bg-[#c82333] transition-colors"
              >
                <X className="w-4 h-4 text-white font-bold" strokeWidth={4} />
              </button>
            </div>
          </div>

          {/* POS Controls */}
          <div className="p-3 border-b border-gray-200 bg-gray-50 flex gap-3 flex-wrap">
            <div className="flex-1 min-w-[200px] flex gap-2">
              <form onSubmit={handleBarcodeSubmit} className="relative flex-1">
                <input 
                  ref={barcodeRef}
                  type="text" 
                  value={barcodeInput}
                  onChange={(e) => setBarcodeInput(e.target.value)}
                  placeholder="Scan Barcode or Search Product (F3)"
                  className="w-full border-2 border-[#4F46E5] rounded-[4px] px-3 py-2 text-[14px] font-medium outline-none pr-10 shadow-sm"
                />
                <button type="submit" className="absolute right-2 top-1/2 -translate-y-1/2 text-[#4F46E5]">
                  <Search className="w-5 h-5" />
                </button>
              </form>
              <button 
                type="button"
                onClick={() => setIsProductModalOpen(true)}
                className="bg-[#28a745] hover:bg-[#218838] text-white px-3 py-2 rounded-[4px] shadow-sm flex items-center justify-center transition-colors"
                title="Add New Product"
              >
                <PlusCircle className="w-5 h-5" />
              </button>
            </div>
            
            <div className="w-[250px] relative">
              <input 
                type="text" 
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
                placeholder="Customer Mobile / Name"
                className="w-full border border-gray-300 rounded-[4px] px-3 py-2 text-[13px] outline-none focus:border-[#4F46E5]"
              />
            </div>
            
            <button className="bg-[#ffc107] hover:bg-[#e0a800] text-gray-900 px-4 py-2 rounded-[4px] text-[13px] font-bold shadow-sm flex items-center gap-1.5 transition-colors">
              <PauseCircle className="w-4 h-4" /> Hold Bill
            </button>
          </div>

          {/* Cart Table */}
          <div className="flex-1 overflow-y-auto">
            <div className="bg-[#343a40] text-white grid grid-cols-[50px_1fr_80px_100px_100px_100px_60px] text-center sticky top-0 z-10">
              <div className="py-2 text-[12px] font-bold">S.NO</div>
              <div className="py-2 text-[12px] font-bold text-left px-2">PRODUCT NAME</div>
              <div className="py-2 text-[12px] font-bold">MRP</div>
              <div className="py-2 text-[12px] font-bold">PRICE</div>
              <div className="py-2 text-[12px] font-bold">QTY</div>
              <div className="py-2 text-[12px] font-bold">TOTAL</div>
              <div className="py-2 text-[12px] font-bold">ACTION</div>
            </div>

            {cart.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-[300px] text-gray-400">
                <PackageSearch className="w-16 h-16 mb-2 opacity-50" />
                <p className="text-[15px] font-medium">Cart is empty. Scan products to add.</p>
              </div>
            ) : (
              <div className="flex flex-col">
                {cart.map((item, index) => (
                  <div key={item.id} className="grid grid-cols-[50px_1fr_80px_100px_100px_100px_60px] text-center border-b border-gray-200 bg-white items-center hover:bg-gray-50">
                    <div className="py-2 text-[13px] font-bold text-gray-600">{index + 1}</div>
                    <div className="py-2 text-[13px] font-bold text-left px-2 text-gray-800 line-clamp-1 flex flex-col justify-center relative group">
                      {item.name}
                      <span className="text-[10px] font-normal text-blue-500">{item.priceReason}</span>
                    </div>
                    <div className="py-2 text-[13px] font-bold text-gray-500">₹{(item.mrp || item.base_price || item.price).toFixed(2)}</div>
                    <div className="py-2 text-[13px] font-bold text-gray-700">₹{item.price.toFixed(2)}</div>
                    <div className="py-2 px-2">
                      <div className="flex items-center border border-gray-300 rounded-[3px] bg-white overflow-hidden">
                        <button onClick={() => updateQty(item.id, item.qty - 1)} className="px-2 py-1 bg-gray-100 hover:bg-gray-200 text-gray-800 font-bold">-</button>
                        <input 
                          type="number" 
                          value={item.qty} 
                          onChange={(e) => updateQty(item.id, Number(e.target.value))}
                          className="w-full text-center outline-none text-[13px] font-bold hide-arrows" 
                        />
                        <button onClick={() => updateQty(item.id, item.qty + 1)} className="px-2 py-1 bg-gray-100 hover:bg-gray-200 text-gray-800 font-bold">+</button>
                      </div>
                    </div>
                    <div className="py-2 text-[14px] font-bold text-[#28a745]">₹{item.total.toFixed(2)}</div>
                    <div className="py-2 flex items-center justify-center">
                      <button onClick={() => removeItem(item.id)} className="text-red-500 hover:text-red-700 bg-red-50 p-1.5 rounded-full">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Cart Footer / Totals */}
          <div className="bg-[#1A1C29] p-3 text-white">
             <div className="grid grid-cols-4 gap-4">
               <div className="flex flex-col border-r border-gray-600 px-2">
                 <span className="text-[12px] text-gray-400 font-medium">TOTAL ITEMS</span>
                 <span className="text-[22px] font-bold text-[#ffc107]">{totalItems}</span>
               </div>
               <div className="flex flex-col border-r border-gray-600 px-2">
                 <span className="text-[12px] text-gray-400 font-medium">SUBTOTAL</span>
                 <span className="text-[20px] font-bold">₹{subtotal.toFixed(2)}</span>
               </div>
               <div className="flex flex-col border-r border-gray-600 px-2">
                 <span className="text-[12px] text-gray-400 font-medium">ESTIMATED TAX</span>
                 <span className="text-[20px] font-bold text-red-400">+₹{totalTax.toFixed(2)}</span>
               </div>
               <div className="flex flex-col px-2">
                 <span className="text-[12px] text-gray-400 font-medium">DISCOUNT (₹)</span>
                 <input 
                   type="number" 
                   value={billDiscount || ''} 
                   onChange={(e) => setBillDiscount(Number(e.target.value) || 0)}
                   className="mt-1 w-full bg-gray-800 text-[#28a745] text-[18px] font-bold px-2 py-1 rounded-[4px] outline-none border border-gray-600 focus:border-[#4F46E5] hide-arrows"
                   placeholder="0"
                 />
               </div>
             </div>
          </div>
        </div>

        {/* Right Side: Quick Products & Payment (30%) */}
        <div className="w-full md:w-[350px] bg-white flex flex-col">
          
          {/* Payment Modes */}
          <div className="p-4 border-b border-gray-200">
            <h3 className="text-[14px] font-bold text-gray-800 mb-3 uppercase tracking-wide">Payment Mode</h3>
            <div className="grid grid-cols-3 gap-2">
              <button 
                onClick={() => setPaymentMode('Cash')}
                className={cn(
                  "flex flex-col items-center justify-center py-3 rounded-[6px] border-2 transition-all",
                  paymentMode === 'Cash' ? "border-[#4F46E5] bg-indigo-50 text-[#4F46E5]" : "border-gray-200 text-gray-600 hover:border-gray-300"
                )}
              >
                <Banknote className="w-6 h-6 mb-1" />
                <span className="text-[12px] font-bold">CASH</span>
              </button>
              <button 
                onClick={() => setPaymentMode('Card')}
                className={cn(
                  "flex flex-col items-center justify-center py-3 rounded-[6px] border-2 transition-all",
                  paymentMode === 'Card' ? "border-[#4F46E5] bg-indigo-50 text-[#4F46E5]" : "border-gray-200 text-gray-600 hover:border-gray-300"
                )}
              >
                <CreditCard className="w-6 h-6 mb-1" />
                <span className="text-[12px] font-bold">CARD</span>
              </button>
              <button 
                onClick={() => setPaymentMode('UPI')}
                className={cn(
                  "flex flex-col items-center justify-center py-3 rounded-[6px] border-2 transition-all",
                  paymentMode === 'UPI' ? "border-[#4F46E5] bg-indigo-50 text-[#4F46E5]" : "border-gray-200 text-gray-600 hover:border-gray-300"
                )}
              >
                <Smartphone className="w-6 h-6 mb-1" />
                <span className="text-[12px] font-bold">UPI</span>
              </button>
            </div>
          </div>

          {/* Quick Items Grid (Touch Friendly) */}
          <div className="flex-1 p-4 overflow-y-auto bg-gray-50">
             <div className="flex items-center justify-between mb-3">
               <h3 className="text-[14px] font-bold text-gray-800 uppercase tracking-wide">Quick Items</h3>
               <span className="text-[11px] font-bold bg-gray-200 px-2 py-0.5 rounded-full">Touch Friendly</span>
             </div>
             
             <div className="grid grid-cols-2 gap-2">
               {products.map(p => (
                 <button 
                   key={p.id}
                   onClick={() => addToCart(p)}
                   className="bg-white border border-gray-200 p-2 rounded-[6px] text-left hover:border-[#4F46E5] hover:shadow-md transition-all flex flex-col active:scale-95"
                 >
                   <span className="text-[12px] font-bold text-gray-800 line-clamp-2 leading-tight h-[30px]">{p.name}</span>
                   <span className="text-[14px] font-bold text-[#28a745] mt-1">₹{calculateItemPrice(p, 1, paymentMode, isWholesale).price}</span>
                 </button>
               ))}
             </div>
          </div>

          {/* Grand Total & Checkout */}
          <div className="p-4 bg-white border-t border-gray-200">
             <div className="flex items-center justify-between mb-4">
               <span className="text-[16px] font-bold text-gray-600 uppercase">Net Payable</span>
               <span className="text-[32px] font-bold text-[#1A1C29]">₹{finalAmount.toFixed(2)}</span>
             </div>
             
             <button 
               onClick={handleCheckout}
               className="w-full bg-[#28a745] hover:bg-[#218838] text-white py-4 rounded-[6px] text-[18px] font-bold uppercase tracking-wide flex items-center justify-center gap-2 shadow-lg shadow-green-500/30 transition-all active:scale-[0.98]"
             >
               <CheckCircle2 className="w-6 h-6" /> PAY & PRINT BILL
             </button>
          </div>

        </div>
      </div>

      {/* Thermal Print Modal */}
      {isPrintModalOpen && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center backdrop-blur-sm">
          <div className="bg-white rounded-[8px] w-[350px] shadow-2xl flex flex-col max-h-[90vh]">
            <div className="bg-gray-100 p-3 flex items-center justify-between rounded-t-[8px] border-b border-gray-200">
              <h3 className="font-bold text-gray-800 text-[14px] flex items-center gap-2">
                <Printer className="w-4 h-4" /> Thermal Receipt (3-inch)
              </h3>
              <button onClick={() => {
                setIsPrintModalOpen(false);
                setCart([]); // Clear cart after print
              }} className="text-gray-500 hover:text-red-500">
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="p-6 overflow-y-auto font-mono text-[12px] bg-white text-black">
               <div className="text-center mb-4 border-b-2 border-dashed border-gray-300 pb-4">
                 <h2 className="text-[18px] font-bold uppercase tracking-widest">OS BOOKS RETAIL</h2>
                 <p className="text-[11px] mt-1">123, Main Market Road, City Center</p>
                 <p className="text-[11px]">GSTIN: 07AABCU9603R1ZN</p>
                 <p className="text-[11px]">Ph: +91 9876543210</p>
               </div>
               
               <div className="flex justify-between mb-2 text-[11px]">
                 <span>Bill No: INV-{Math.floor(1000 + Math.random() * 9000)}</span>
                 <span>Date: {new Date().toLocaleDateString()}</span>
               </div>
               <div className="flex justify-between mb-4 text-[11px]">
                 <span>Customer: {customerName || 'Cash'}</span>
                 <span>Mode: {paymentMode}</span>
               </div>
               
               <table className="w-full mb-4 border-b-2 border-dashed border-gray-300 pb-2">
                 <thead>
                   <tr className="border-y border-dashed border-gray-300">
                     <th className="text-left py-1 w-[50%]">Item</th>
                     <th className="text-center py-1">Qty</th>
                     <th className="text-right py-1">Amount</th>
                   </tr>
                 </thead>
                 <tbody>
                   {cart.map((item, idx) => (
                     <tr key={idx}>
                       <td className="py-1 line-clamp-1">{item.name}</td>
                       <td className="text-center py-1">{item.qty}</td>
                       <td className="text-right py-1">{item.total.toFixed(2)}</td>
                     </tr>
                   ))}
                 </tbody>
               </table>
               
               <div className="flex justify-between mb-1">
                 <span>Subtotal:</span>
                 <span>{subtotal.toFixed(2)}</span>
               </div>
               <div className="flex justify-between mb-2">
                 <span>Tax Amount:</span>
                 <span>{totalTax.toFixed(2)}</span>
               </div>
               {billDiscount > 0 && (
                 <div className="flex justify-between mb-2 text-green-600">
                   <span>Discount:</span>
                   <span>-{billDiscount.toFixed(2)}</span>
                 </div>
               )}
               <div className="flex justify-between font-bold text-[14px] border-t border-dashed border-gray-300 pt-2 mb-6">
                 <span>GRAND TOTAL:</span>
                 <span>Rs. {finalAmount.toFixed(2)}</span>
               </div>
               
               <div className="text-center text-[10px]">
                 <p>*** Thank You For Shopping ***</p>
                 <p>Visit Again!</p>
               </div>
            </div>

            <div className="p-3 border-t border-gray-200 bg-gray-50 flex gap-2 rounded-b-[8px]">
              <button 
                onClick={() => {
                  window.print();
                  setIsPrintModalOpen(false);
                  setCart([]);
                }}
                className="flex-1 bg-[#4F46E5] text-white py-2 rounded-[4px] font-bold text-[13px] flex items-center justify-center gap-2 hover:bg-[#4338ca]"
              >
                <Printer className="w-4 h-4" /> Print Receipt
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Basic styles for print media and hiding arrows */}
      <style dangerouslySetInnerHTML={{__html: `
        .hide-arrows::-webkit-outer-spin-button,
        .hide-arrows::-webkit-inner-spin-button {
          -webkit-appearance: none;
          margin: 0;
        }
        .hide-arrows {
          -moz-appearance: textfield;
        }
      `}} />

      <ProductMasterModal 
        isOpen={isProductModalOpen}
        onClose={() => setIsProductModalOpen(false)}
        onSubmit={(newProduct) => {
          if (newProduct.isQuickItem) {
            setProducts(prev => [...prev, newProduct]);
          }
        }}
      />
    </div>
  );
}
