import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { X, Search, ChevronsUpDown } from 'lucide-react';

export function InvoicesReport() {
  const navigate = useNavigate();
  const [selectedType, setSelectedType] = useState('Sales');

  const typeRoutes = {
    'Sales': '/admin/sales-invoice',
    'Sales Return': '/admin/sales-return-invoice',
    'Purchase': '/admin/create_invoices/company_purchase',
    'Purchase Return': '/admin/create_invoices/company_purchase_return',
    'Quotation': '/admin/quotation-invoice',
  };

  const handleTypeChange = (e) => {
    const value = e.target.value;
    setSelectedType(value);
    if (typeRoutes[value]) {
      navigate(typeRoutes[value]);
    }
  };

  return (
    <div className="bg-[#f4f6f9] min-h-[calc(100vh-45px)] p-3 flex flex-col">
      <div className="bg-white rounded shadow-sm border border-gray-200 w-full overflow-hidden flex flex-col flex-1">
        
        {/* Teal Header Banner */}
        <div className="bg-[#4F46E5] text-white px-4 py-2 flex items-center justify-between">
          <span className="text-[15px] font-medium tracking-wide">All Invoices Report</span>
          <button 
            onClick={() => navigate(-1)}
            className="bg-[#dc3545] hover:bg-[#c82333] transition-colors p-1 rounded-[3px] text-white focus:outline-none"
          >
            <X className="w-4 h-4" strokeWidth={2.5} />
          </button>
        </div>

        {/* Control Bar */}
        <div className="p-4 border-b border-gray-200">
          <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
            
            {/* Type */}
            <div className="flex flex-col gap-1 w-full sm:max-w-[200px]">
              <label className="text-[13px] font-bold text-gray-800">Type</label>
              <select 
                value={selectedType}
                onChange={handleTypeChange}
                className="w-full h-[32px] border border-gray-300 rounded-[3px] px-2 text-[13px] outline-none text-gray-700 bg-white"
              >
                <option>Sales</option>
                <option>Sales Return</option>
                <option>Purchase</option>
                <option>Purchase Return</option>
                <option>Quotation</option>
                <option>Store Stock Transfer</option>
                <option>Branch Stock IN/OUT</option>
              </select>
            </div>

            {/* Date */}
            <div className="flex flex-col gap-1 w-full sm:max-w-[280px]">
              <div className="flex flex-wrap items-center gap-1.5">
                <label className="text-[13px] font-bold text-gray-800">Date</label>
                <span className="text-[11px] font-semibold text-[#4F46E5]">(24-May-2026)</span>
              </div>
              <div className="flex gap-1.5 w-full">
                <select className="flex-1 h-[32px] border border-gray-300 rounded-[3px] px-2 text-[13px] outline-none text-gray-700 bg-white">
                  <option>Today</option>
                </select>
                <button className="h-[32px] w-[36px] bg-[#007bff] hover:bg-[#0069d9] text-white flex items-center justify-center rounded-[3px] transition-colors shadow-sm focus:outline-none">
                  <Search className="w-4 h-4" strokeWidth={2.5} />
                </button>
              </div>
            </div>

            {/* Filter */}
            <div className="flex flex-col gap-1 w-full md:max-w-[450px]">
              <label className="text-[13px] font-bold text-gray-800">Filter</label>
              <div className="flex gap-2 w-full">
                <select className="w-[120px] h-[32px] border border-gray-300 rounded-[3px] px-2 text-[13px] outline-none text-gray-700 bg-white">
                  <option>Party</option>
                </select>
                <select className="flex-1 h-[32px] border border-gray-300 rounded-[3px] px-2 text-[13px] outline-none text-gray-400 bg-white">
                  <option>Select Multiple Party</option>
                </select>
              </div>
            </div>

          </div>
        </div>

        {/* Table Content */}
        <div className="flex-1 p-4">
          <div className="w-full h-full flex flex-col">
            
            <div className="table-scroll w-full overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="py-2.5 px-3 text-[11px] font-semibold text-gray-500 uppercase tracking-wider w-[10%] whitespace-nowrap">
                    <span className="flex items-center gap-1 cursor-pointer hover:text-gray-700">
                      Date <ChevronsUpDown className="w-3.5 h-3.5 text-gray-400" />
                    </span>
                  </th>
                  <th className="py-2.5 px-3 text-[11px] font-semibold text-gray-500 uppercase tracking-wider w-[12%] whitespace-nowrap">
                    <span className="flex items-center gap-1 cursor-pointer hover:text-gray-700">
                      Invoiceno <ChevronsUpDown className="w-3.5 h-3.5 text-gray-400" />
                    </span>
                  </th>
                  <th className="py-2.5 px-3 text-[11px] font-semibold text-gray-500 uppercase tracking-wider w-[18%] whitespace-nowrap">
                    <span className="flex items-center gap-1 cursor-pointer hover:text-gray-700">
                      Party <ChevronsUpDown className="w-3.5 h-3.5 text-gray-400" />
                    </span>
                  </th>
                  <th className="py-2.5 px-3 text-[11px] font-semibold text-gray-500 uppercase tracking-wider w-[22%] whitespace-nowrap">
                    <span className="flex items-center gap-1 cursor-pointer hover:text-gray-700">
                      Product Name <ChevronsUpDown className="w-3.5 h-3.5 text-gray-400" />
                    </span>
                  </th>
                  <th className="py-2.5 px-3 text-[11px] font-semibold text-gray-500 uppercase tracking-wider w-[10%] whitespace-nowrap">
                    <span className="flex items-center gap-1 cursor-pointer hover:text-gray-700">
                      Quantity <ChevronsUpDown className="w-3.5 h-3.5 text-gray-400" />
                    </span>
                  </th>
                  <th className="py-2.5 px-3 text-[11px] font-semibold text-gray-500 uppercase tracking-wider w-[9%] whitespace-nowrap">
                    <span className="flex items-center gap-1 cursor-pointer hover:text-gray-700">
                      Price <ChevronsUpDown className="w-3.5 h-3.5 text-gray-400" />
                    </span>
                  </th>
                  <th className="py-2.5 px-3 text-[11px] font-semibold text-gray-500 uppercase tracking-wider w-[10%] whitespace-nowrap">
                    <span className="flex items-center gap-1 cursor-pointer hover:text-gray-700">
                      Amount <ChevronsUpDown className="w-3.5 h-3.5 text-gray-400" />
                    </span>
                  </th>
                  <th className="py-2.5 px-3 text-[11px] font-semibold text-gray-500 uppercase tracking-wider w-[9%] whitespace-nowrap">
                    <span className="flex items-center gap-1 cursor-pointer hover:text-gray-700">
                      Gst Tax <ChevronsUpDown className="w-3.5 h-3.5 text-gray-400" />
                    </span>
                  </th>
                </tr>
              </thead>
            </table>
          </div>

            {/* Empty State Body */}
            <div className="flex-1 flex items-center justify-center py-20">
              <span className="text-[15px] font-normal text-gray-700 tracking-wide">No data found</span>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}
