import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Upload } from 'lucide-react';

export function TcsReport() {
  const navigate = useNavigate();

  const handleExport = () => {
    const csvContent = [
      ['Date/Invoice No.', 'Party Name', 'Voucher Type', 'Invoice Value', 'TCS Collected', 'TCS Paid'],
      ['', '', 'Total', '0', '0', '0']
    ].map(e => e.join(",")).join("\n");
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "tcs_report.csv";
    link.click();
  };

  return (
    <div className="bg-[#f4f6f9] min-h-[calc(100vh-45px)] p-3 flex flex-col relative pb-[70px]">
      <div className="bg-white rounded shadow-sm border border-gray-200 w-full overflow-hidden flex-1">
        
        {/* Header Title */}
        <div className="px-4 py-3 border-b border-gray-200">
          <h2 className="text-[14px] text-gray-700">TCS Report</h2>
        </div>

        <div className="p-4">
          {/* Controls Row */}
          <div className="flex flex-wrap items-end gap-4 mb-6">
            <div className="flex flex-col gap-1.5 w-full sm:max-w-[250px]">
              <label className="text-[13px] font-bold text-gray-800">Select Period</label>
              <select className="h-[32px] border border-gray-300 rounded-[3px] px-2 text-[13px] outline-none text-gray-700 bg-white">
                <option>Select</option>
              </select>
            </div>

            <div className="flex flex-col gap-1.5 w-full sm:max-w-[300px]">
              <div className="flex flex-wrap items-center gap-2">
                <div className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" className="sr-only peer" />
                  <div className="w-8 h-4 bg-gray-300 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-3 after:w-3 after:transition-all peer-checked:bg-[#007bff]"></div>
                </div>
                <label className="text-[13px] font-bold text-gray-800">Party Name</label>
              </div>
              <select className="h-[32px] border border-gray-300 rounded-[3px] px-2 text-[13px] outline-none text-gray-400 bg-white" disabled>
                <option>Select Name</option>
              </select>
            </div>

            <button className="h-[32px] px-5 bg-[#007bff] hover:bg-[#0069d9] text-white text-[13px] font-medium rounded-[3px] transition-colors shadow-sm mb-px">
              Search
            </button>
          </div>

          {/* Table */}
          <div className="w-full">
            <div className="table-scroll w-full overflow-x-auto">
            <table className="w-full border-collapse border border-black text-left">
              <thead>
                <tr>
                  <th className="py-2.5 px-3 border border-black text-[12px] font-bold text-gray-800 text-center leading-tight whitespace-nowrap">Date<br/>Invoice No.</th>
                  <th className="py-2.5 px-3 border border-black text-[13px] font-bold text-gray-800 text-center whitespace-nowrap">Party Name</th>
                  <th className="py-2.5 px-3 border border-black text-[13px] font-bold text-gray-800 text-center whitespace-nowrap">Voucher Type</th>
                  <th className="py-2.5 px-3 border border-black text-[13px] font-bold text-gray-800 text-center whitespace-nowrap">Invoice Value</th>
                  <th className="py-2.5 px-3 border border-black text-[13px] font-bold text-gray-800 text-center whitespace-nowrap">TCS Collected</th>
                  <th className="py-2.5 px-3 border border-black text-[13px] font-bold text-gray-800 text-center whitespace-nowrap">TCS Paid</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="py-2.5 px-3 border border-black text-[13px]"></td>
                  <td className="py-2.5 px-3 border border-black text-[13px]"></td>
                  <td className="py-2.5 px-3 border border-black text-[13px] font-bold text-gray-800 text-center">Total</td>
                  <td className="py-2.5 px-3 border border-black text-[13px] font-bold text-gray-800 text-center">0</td>
                  <td className="py-2.5 px-3 border border-black text-[13px] font-bold text-gray-800 text-center">0</td>
                  <td className="py-2.5 px-3 border border-black text-[13px] font-bold text-gray-800 text-center">0</td>
                </tr>
              </tbody>
            </table>
          </div>
          </div>
        </div>
      </div>

      {/* Footer Buttons */}
      <div className="absolute bottom-0 left-0 right-0 bg-transparent p-3 flex justify-end gap-2 pr-6">
        <button 
          onClick={() => navigate(-1)}
          className="bg-[#dc3545] hover:bg-[#c82333] text-white text-[13px] font-medium px-3 py-1.5 rounded-[3px] flex items-center justify-center gap-1 shadow-sm transition-colors"
        >
          <span className="text-[16px] leading-none mt-[-2px]">&laquo;</span> Go back
        </button>
        <button 
          onClick={() => window.open('https://web.whatsapp.com/', '_blank')}
          className="bg-[#28a745] hover:bg-[#218838] text-white text-[13px] font-medium px-3 py-1.5 rounded-[3px] flex items-center justify-center shadow-sm transition-colors"
        >
          <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.888-.788-1.489-1.761-1.662-2.06-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/></svg>
        </button>
        <button 
          onClick={handleExport}
          className="bg-[#ffc107] hover:bg-[#e0a800] text-gray-900 text-[13px] font-medium px-4 py-1.5 rounded-[3px] flex items-center justify-center gap-1.5 shadow-sm transition-colors"
        >
          <Upload className="w-4 h-4" /> Export
        </button>
      </div>

    </div>
  );
}
