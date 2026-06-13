import React from 'react';
import { useNavigate } from 'react-router-dom';
import { X, Filter, Upload, BarChart2 } from 'lucide-react';

export function ItemQuantityReport() {
  const navigate = useNavigate();

  const handleExport = () => {
    const csvContent = "data:text/csv;charset=utf-8,Party Name,Opening Quantity,Qty In,Qty Out,Profit,Total Qty\n";
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "item_quantity_report.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="bg-[#f4f6f9] min-h-[calc(100vh-60px)] flex flex-col">
      {/* Top Teal Bar */}
      <div className="bg-[#4F46E5] px-4 py-[6px] flex justify-between items-center text-white">
        <h2 className="text-[14.5px] font-medium tracking-wide">Item Quantity Report</h2>
        
        <div className="flex flex-wrap items-center gap-1.5 ml-2">
          <button 
            onClick={handleExport}
            className="bg-[#ffc107] hover:bg-[#e0a800] text-gray-900 px-3 py-[5px] rounded-[3px] text-[12px] font-bold flex items-center gap-1.5 transition-colors"
          >
            <Upload className="w-[14px] h-[14px]" strokeWidth={2.5} /> Export
          </button>
          <button 
            onClick={() => navigate(-1)}
            className="bg-[#dc3545] hover:bg-[#c82333] text-white px-2 py-[5px] rounded-[3px] flex items-center justify-center transition-colors ml-1"
          >
            <X className="w-[14px] h-[14px]" strokeWidth={3} />
          </button>
        </div>
      </div>

      <div className="flex-1 flex flex-col p-4">
        {/* Search Header */}
        <div className="bg-white border border-gray-200 rounded-[3px] shadow-sm mb-4">
          <div className="flex w-full">
            <div className="flex items-center px-3 border-r border-gray-200">
              <Filter className="w-4 h-4 text-[#007bff]" strokeWidth={2.5} />
            </div>
            <select className="bg-white border-r border-gray-200 px-3 py-2 text-[13.5px] text-gray-600 outline-none w-[180px]">
              <option>Party Name</option>
            </select>
            <input 
              type="text" 
              placeholder="Search for Party Name" 
              className="flex-1 px-3 py-2 text-[13.5px] outline-none text-gray-700 placeholder-gray-400"
            />
          </div>
        </div>

        {/* Opening Quantity Box */}
        <div className="bg-[#343a40] text-white rounded-[4px] p-3 flex justify-between items-center mb-4 shadow-sm">
          <div className="flex items-center gap-2">
            <BarChart2 className="w-4 h-4 text-gray-300" />
            <span className="text-[14px] font-bold text-gray-200">Opening Quantity</span>
          </div>
          <div className="bg-[#495057] px-3 py-1 rounded-[12px] text-[13px] font-bold border border-gray-600">
            0
          </div>
        </div>

        {/* Transaction 1: Company Purchase */}
        <div className="bg-white rounded-[4px] shadow-sm border border-gray-200 mb-4 overflow-hidden">
          <div className="bg-[#198754] text-white px-4 py-2 flex justify-between items-center">
            <div className="font-bold text-[14px]">New Vendor</div>
            <div className="flex items-center gap-2">
              <span className="bg-white text-gray-800 text-[12px] font-bold px-2 py-0.5 rounded-[12px]">08-Jun-26</span>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-center text-[13px]">
              <thead className="bg-gray-50 border-b border-gray-200 text-gray-700 font-bold">
                <tr>
                  <th className="py-2 px-2 border-r border-gray-200 w-[60px]">#</th>
                  <th className="py-2 px-4 border-r border-gray-200 text-left">Product Name</th>
                  <th className="py-2 px-4 border-r border-gray-200">QTY IN</th>
                  <th className="py-2 px-4 border-r border-gray-200">PRICE</th>
                  <th className="py-2 px-4 border-r border-gray-200">TOTAL</th>
                  <th className="py-2 px-4">STOCK</th>
                </tr>
              </thead>
              <tbody className="text-gray-600">
                <tr className="border-b border-gray-200">
                  <td className="py-2 px-2 border-r border-gray-200">1</td>
                  <td className="py-2 px-4 border-r border-gray-200 text-left">book</td>
                  <td className="py-2 px-4 border-r border-gray-200">100 pcs</td>
                  <td className="py-2 px-4 border-r border-gray-200">22</td>
                  <td className="py-2 px-4 border-r border-gray-200">2,200</td>
                  <td className="py-2 px-4">100 pcs</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="bg-[#e9ecef] px-4 py-2 flex justify-between items-center">
            <span className="bg-[#28a745] text-white text-[11px] font-bold px-3 py-1 rounded-[12px]">Company Purchase</span>
            <button onClick={() => navigate('/admin/create_invoices/company_purchase')} className="bg-[#343a40] hover:bg-[#23272b] text-white text-[12px] font-bold px-4 py-1.5 rounded-[3px] transition-colors">
              View Invoice
            </button>
          </div>
        </div>

        {/* Transaction 2: Customer Sale */}
        <div className="bg-white rounded-[4px] shadow-sm border border-gray-200 mb-4 overflow-hidden">
          <div className="bg-[#dc3545] text-white px-4 py-2 flex items-center gap-2">
            <span className="bg-white text-gray-800 text-[11px] font-bold w-5 h-5 flex items-center justify-center rounded-full">15</span>
            <span className="bg-white text-gray-800 text-[12px] font-bold px-2 py-0.5 rounded-[12px]">08-Jun-26</span>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-center text-[13px]">
              <thead className="bg-gray-50 border-b border-gray-200 text-gray-700 font-bold">
                <tr>
                  <th className="py-2 px-2 border-r border-gray-200 w-[60px]">#</th>
                  <th className="py-2 px-4 border-r border-gray-200 text-left">Product Name</th>
                  <th className="py-2 px-4 border-r border-gray-200">QTY OUT</th>
                  <th className="py-2 px-4 border-r border-gray-200">PRICE</th>
                  <th className="py-2 px-4 border-r border-gray-200">TOTAL</th>
                  <th className="py-2 px-4">STOCK</th>
                </tr>
              </thead>
              <tbody className="text-gray-600">
                <tr className="border-b border-gray-200">
                  <td className="py-2 px-2 border-r border-gray-200">2</td>
                  <td className="py-2 px-4 border-r border-gray-200 text-left">book</td>
                  <td className="py-2 px-4 border-r border-gray-200">5 pcs</td>
                  <td className="py-2 px-4 border-r border-gray-200">28</td>
                  <td className="py-2 px-4 border-r border-gray-200">140</td>
                  <td className="py-2 px-4">95 pcs</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="bg-[#e9ecef] px-4 py-2 flex justify-between items-center">
            <span className="bg-[#dc3545] text-white text-[11px] font-bold px-3 py-1 rounded-[12px]">Customer Sale</span>
            <button onClick={() => navigate('/admin/sales-invoice')} className="bg-[#343a40] hover:bg-[#23272b] text-white text-[12px] font-bold px-4 py-1.5 rounded-[3px] transition-colors">
              View Invoice
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
