import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { X, Search } from 'lucide-react';
import apiClient from '../api/apiClient';

export function StockInventory() {
  const navigate = useNavigate();
  const [zeroToggle, setZeroToggle] = useState(false);
  const [searchToggle, setSearchToggle] = useState(false);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const res = await apiClient.get('/products?limit=100');
      if (res.data.data) {
        setProducts(res.data.data);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const filteredProducts = products.filter(p => zeroToggle ? true : p.stock > 0);

  const totalOpening = 0;
  const totalPurchase = 0;
  const totalSale = 0;
  const totalClosing = filteredProducts.reduce((acc, curr) => acc + (curr.stock || 0), 0);

  return (
    <div className="bg-[#f4f6f9] min-h-[calc(100vh-45px)] flex flex-col p-3 relative">
      <div className="bg-white rounded shadow-sm border border-gray-200 flex-1 flex flex-col overflow-hidden">
        
        {/* Header */}
        <div className="bg-[#4F46E5] px-4 py-2 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <h2 className="text-white text-[16px] font-medium tracking-wide">Stock Inventory</h2>
          
          <div className="flex flex-wrap items-center gap-3">
            <div className="flex flex-wrap items-center gap-2">
              <span className={`text-[13px] font-bold ${!zeroToggle ? 'text-gray-800' : 'text-white/70'}`}>Without zero</span>
              <div 
                onClick={() => setZeroToggle(!zeroToggle)}
                className={`w-10 h-5 rounded-full relative cursor-pointer transition-colors border border-white/30 ${zeroToggle ? 'bg-[#007bff]' : 'bg-[#4F46E5]'}`}
              >
                <div className={`absolute top-[2px] w-4 h-4 bg-gray-800 rounded-full transition-all shadow-sm ${zeroToggle ? 'left-[22px]' : 'left-[2px]'}`} />
              </div>
              <span className={`text-[13px] font-bold ${zeroToggle ? 'text-gray-800' : 'text-white/70'}`}>With zero</span>
            </div>

            <button 
              onClick={() => navigate('/dashboard')}
              className="bg-[#dc3545] hover:bg-[#c82333] text-white p-1 rounded-[3px] transition-colors shadow-sm ml-2"
            >
              <X className="w-5 h-5 font-bold" strokeWidth={3} />
            </button>
          </div>
        </div>

        {/* Filter Section */}
        <div className="p-3 bg-white border-b border-gray-200 flex flex-col md:flex-row gap-6 items-start md:items-end">
          <div className="flex flex-col w-full md:w-[350px]">
            <div className="flex flex-wrap items-center gap-2 mb-1.5">
              <div 
                onClick={() => setSearchToggle(!searchToggle)}
                className={`w-8 h-4 rounded-full relative cursor-pointer transition-colors ${searchToggle ? 'bg-[#007bff]' : 'bg-gray-300'}`}
              >
                <div className={`absolute top-[2px] w-3 h-3 bg-white rounded-full transition-all shadow-sm ${searchToggle ? 'left-[18px]' : 'left-[2px]'}`} />
              </div>
              <span className="text-[13px] font-bold text-gray-800">Search by Anything :</span>
            </div>
            <input 
              type="text" 
              className="w-full min-w-0 border border-gray-300 bg-[#e9ecef] rounded-[3px] px-3 py-1.5 text-[14px] outline-none focus:border-[#4F46E5] focus:bg-white transition-colors h-[34px]"
            />
          </div>

          <div className="flex items-end gap-2 w-full md:w-auto">
             <div className="flex flex-col">
                <div className="flex justify-between items-center mb-1">
                   <span className="text-[13px] font-bold text-gray-800">Date</span>
                   <span className="text-[11px] font-bold text-[#4F46E5]">(23-May-2026)</span>
                </div>
                <div className="flex items-center">
                   <select className="min-w-0 border border-gray-300 rounded-[3px] px-3 py-1.5 text-[14px] text-gray-700 outline-none focus:border-[#4F46E5] bg-white h-[34px] w-full">
                     <option>Today</option>
                    <option>Yesterday</option>
                    <option>Last 7 Days</option>
                    <option>Last 30 Days</option>
                    <option>Last Month</option>
                    <option>This Month</option>
                    <option>Custom Range</option>
                   </select>
                </div>
             </div>

             <button className="flex items-center justify-center bg-[#007bff] hover:bg-[#0069d9] text-white px-3 rounded-[3px] transition-colors shadow-sm h-[34px] w-[38px]">
               <Search className="w-4 h-4" strokeWidth={3} />
             </button>
          </div>
        </div>

        {/* Data Table */}
        <div className="flex-1 overflow-auto bg-white">
          <div className="table-scroll w-full overflow-x-auto">
            <table className="w-full text-left border-collapse w-full">
            <thead className="bg-[#343a40] text-white sticky top-0">
              <tr>
                <th className="px-3 py-2 text-[13px] font-bold border-r border-gray-600 text-center w-[60px] whitespace-nowrap">S.NO.</th>
                <th className="px-3 py-2 text-[13px] font-bold border-r border-gray-600 text-center whitespace-nowrap">Product Name</th>
                <th className="px-3 py-2 text-[13px] font-bold border-r border-gray-600 text-center w-[120px] whitespace-nowrap">Opening Stock</th>
                <th className="px-3 py-2 text-[13px] font-bold border-r border-gray-600 text-center w-[120px] whitespace-nowrap">Purchase Qty</th>
                <th className="px-3 py-2 text-[13px] font-bold border-r border-gray-600 text-center w-[120px] whitespace-nowrap">Sale Qty</th>
                <th className="px-3 py-2 text-[13px] font-bold border-r border-gray-600 text-center w-[120px] whitespace-nowrap">Closing Stock</th>
                <th className="px-3 py-2 text-[13px] font-bold text-center w-[100px] whitespace-nowrap">Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredProducts.map((product, index) => (
                <tr key={product.id} className="border-b border-gray-200 hover:bg-gray-50">
                  <td className="px-3 py-2 border-r border-gray-200 text-center text-[13px] text-gray-600">{index + 1}</td>
                  <td className="px-3 py-2 border-r border-gray-200 text-[13px] font-medium text-gray-800">{product.name}</td>
                  <td className="px-3 py-2 border-r border-gray-200 text-center text-[13px] text-gray-600">0</td>
                  <td className="px-3 py-2 border-r border-gray-200 text-center text-[13px] text-gray-600">0</td>
                  <td className="px-3 py-2 border-r border-gray-200 text-center text-[13px] text-gray-600">0</td>
                  <td className="px-3 py-2 border-r border-gray-200 text-center text-[13px] font-bold text-[#4F46E5]">{product.stock}</td>
                  <td className="px-3 py-2 text-center"></td>
                </tr>
              ))}
              {filteredProducts.length === 0 && !loading && (
                <tr>
                  <td colSpan="7" className="text-center py-8 text-gray-500 text-[14px]">No products found.</td>
                </tr>
              )}
              <tr className="border-b border-gray-200 bg-gray-100">
                <td className="px-3 py-2 border-r border-gray-200"></td>
                <td className="px-3 py-2 border-r border-gray-200 text-right font-bold text-[14px] text-gray-800">Total :</td>
                <td className="px-3 py-2 border-r border-gray-200 text-center font-bold text-[14px] text-gray-800">0</td>
                <td className="px-3 py-2 border-r border-gray-200 text-center font-bold text-[14px] text-gray-800">0</td>
                <td className="px-3 py-2 border-r border-gray-200 text-center font-bold text-[14px] text-gray-800">0</td>
                <td className="px-3 py-2 border-r border-gray-200 text-center font-bold text-[14px] text-[#4F46E5]">{totalClosing}</td>
                <td className="px-3 py-2"></td>
              </tr>
            </tbody>
          </table>
          </div>
        </div>

      </div>
    </div>
  );
}
