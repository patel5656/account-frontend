import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Upload } from 'lucide-react';

export function BrandwiseSaleSummary() {
  const navigate = useNavigate();

  const handleExport = () => {
    const csvContent = [
      ['#', 'Brand Name', 'Total Quantity', 'Total Amount', 'Total Discount'],
      ['', 'Totals :', '0', '0', '0']
    ].map(e => e.join(",")).join("\n");
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "brandwise_sale_summary.csv";
    link.click();
  };

  return (
    <div className="bg-[#f4f6f9] min-h-[calc(100vh-45px)] p-3 flex flex-col relative pb-[70px]">
      <div className="bg-white rounded shadow-sm border border-gray-200 w-full overflow-hidden flex-1">
        
        {/* Top Control Bar */}
        <div className="p-4 border-b border-gray-200">
          <div className="flex flex-col sm:flex-row justify-between gap-6">
            
            <div className="flex flex-col sm:flex-row flex-1 gap-4 sm:gap-6">
              {/* Select Period */}
              <div className="flex flex-col gap-1 w-full sm:max-w-[250px]">
                <label className="text-[13px] font-bold text-gray-800 px-1">Select Period</label>
                <select className="w-full h-[32px] border border-gray-300 rounded-[3px] px-2 text-[13px] outline-none text-gray-700 bg-white">
                  <option>Select</option>
                </select>
              </div>

              {/* Party Name */}
              <div className="flex flex-col gap-1 w-full sm:max-w-[400px]">
                <div className="flex flex-wrap items-center gap-2 px-1">
                  <div className="w-[32px] h-[16px] bg-gray-300 rounded-full relative cursor-pointer border border-gray-400">
                    <div className="w-[12px] h-[12px] bg-white rounded-full absolute top-[1px] left-[1px]"></div>
                  </div>
                  <label className="text-[13px] font-bold text-gray-800">Party Name</label>
                </div>
                <select className="w-full h-[32px] border border-gray-300 rounded-[3px] px-2 text-[13px] outline-none text-gray-400 bg-white">
                  <option>Select Name</option>
                </select>
              </div>
            </div>

            {/* Discount Type */}
            <div className="flex flex-col gap-1 w-full sm:max-w-[200px]">
              <label className="text-[13px] font-bold text-gray-800 px-1 text-right">Discount Type</label>
              <select className="w-full h-[32px] border border-gray-300 rounded-[3px] px-2 text-[13px] outline-none text-gray-700 bg-white">
                <option>MRP</option>
              </select>
            </div>

          </div>
        </div>

        {/* Report Content */}
        <div className="p-4">
          <div className="w-full">
            {/* Title */}
            <div className="text-center mb-1">
              <h3 className="text-[14px] font-normal text-gray-600">Brandwise Sales Summary</h3>
              <p className="text-[14px] font-bold text-gray-800">From 23-May-2026 to 23-May-2026</p>
            </div>

            {/* Table */}
            <div className="table-scroll w-full overflow-x-auto">
            <table className="w-full border-collapse border border-gray-800 mt-1">
              <thead>
                <tr>
                  <th className="border border-gray-800 text-[12px] font-bold text-gray-900 py-1.5 px-2 w-[40px] text-center whitespace-nowrap">#</th>
                  <th className="border border-gray-800 text-[12px] font-bold text-gray-900 py-1.5 px-2 text-center whitespace-nowrap">Brand Name</th>
                  <th className="border border-gray-800 text-[12px] font-bold text-gray-900 py-1.5 px-2 w-[120px] text-center whitespace-nowrap">Total Quantity</th>
                  <th className="border border-gray-800 text-[12px] font-bold text-gray-900 py-1.5 px-2 w-[120px] text-center whitespace-nowrap">Total Amount</th>
                  <th className="border border-gray-800 text-[12px] font-bold text-gray-900 py-1.5 px-2 w-[120px] text-center whitespace-nowrap">Total Discount</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-gray-800 py-1.5 px-2 h-[28px]"></td>
                  <td className="border border-gray-800 py-1.5 px-2"></td>
                  <td className="border border-gray-800 py-1.5 px-2"></td>
                  <td className="border border-gray-800 py-1.5 px-2"></td>
                  <td className="border border-gray-800 py-1.5 px-2"></td>
                </tr>
                <tr>
                  <td className="border border-gray-800 py-1.5 px-2"></td>
                  <td className="border border-gray-800 py-1.5 px-2 text-right pr-4">
                    <span className="font-bold text-[13px] text-gray-900">Totals :</span>
                  </td>
                  <td className="border border-gray-800 py-1.5 px-2"></td>
                  <td className="border border-gray-800 py-1.5 px-2 text-right pr-2">
                    <span className="font-bold text-[13px] text-gray-900">0</span>
                  </td>
                  <td className="border border-gray-800 py-1.5 px-2 text-right pr-2">
                    <span className="font-bold text-[13px] text-gray-900">0</span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          </div>
        </div>

      </div>

      {/* Footer Buttons */}
      <div className="fixed bottom-0 left-0 md:left-[220px] right-0 bg-white/90 backdrop-blur-sm border-t border-gray-200 p-2 sm:p-3 footer-btns z-40 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)]">
        <button 
          onClick={() => navigate(-1)}
          className="bg-[#dc3545] hover:bg-[#c82333] text-white text-[13px] font-medium px-4 py-1.5 rounded-[3px] flex items-center justify-center gap-1 shadow-sm transition-colors"
        >
          <span className="text-[16px] leading-none mt-[-2px]">&laquo;</span> Go back
        </button>
        <button 
          onClick={() => window.open('https://web.whatsapp.com/', '_blank')}
          className="bg-[#28a745] hover:bg-[#218838] text-white px-3 py-1.5 rounded-[3px] shadow-sm transition-colors"
        >
          <WhatsappIcon className="w-4 h-4" />
        </button>
        <button 
          onClick={handleExport}
          className="bg-[#ffc107] hover:bg-[#e0a800] text-gray-900 text-[13px] font-bold px-3 py-1.5 rounded-[3px] flex items-center gap-1 shadow-sm transition-colors"
        >
          <Upload className="w-4 h-4" strokeWidth={2.5} /> Export
        </button>
      </div>

    </div>
  );
}

// Custom Whatsapp SVG Icon
const WhatsappIcon = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.888-.788-1.489-1.761-1.662-2.06-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/>
  </svg>
);
