import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import apiClient from '../api/apiClient';
import { 
  X, 
  Plus, 
  BarChart2,
  FileText,
  Search,
  SlidersHorizontal,
  Calendar,
  ShoppingCart,
  Coins,
  BadgeDollarSign,
  Calculator,
  Info
} from 'lucide-react';
import { CollectionReportModal } from '../components/CollectionReportModal';

export function PurchaseReturn() {
  const navigate = useNavigate();
  const [companyToggle, setCompanyToggle] = useState(false);
  const [collectionModalOpen, setCollectionModalOpen] = useState(false);
  const [loadingSheetModalOpen, setLoadingSheetModalOpen] = useState(false);
  const [isToggleOn, setIsToggleOn] = useState(false);
  const [salesData, setSalesData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedInvoices, setSelectedInvoices] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  const [invoices, setInvoices] = useState([]);

  useEffect(() => {
    fetchInvoices();
  }, []);

  const fetchInvoices = async () => {
    try {
      const res = await apiClient.get('/inventory/PURCHASE_RETURN');
      if (res.data.data) {
        setInvoices(res.data.data);
      }
    } catch (error) {
      console.error('Failed to fetch purchase returns', error);
    }
  };

  const filteredData = invoices.filter(item => 
    (item.customer?.name || '').toLowerCase().includes(searchQuery.toLowerCase()) || 
    (item.invoiceNo || '').toLowerCase().includes(searchQuery.toLowerCase())
  );

  const totalAmt = filteredData.reduce((acc, curr) => acc + (curr.totalAmount || 0), 0);
  const totalPaid = filteredData.reduce((acc, curr) => acc + (curr.status === 'PAID' ? curr.totalAmount : 0), 0);
  const totalBal = totalAmt - totalPaid;

  return (
    <div className="bg-[#f4f6f9] min-h-[calc(100vh-45px)] flex flex-col p-3 relative">
      <div className="bg-white rounded shadow-sm border border-gray-200 flex-1 flex flex-col overflow-hidden">
        
        {/* Header */}
        <div className="bg-[#4F46E5] px-4 py-2 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <h2 className="text-white text-[16px] font-medium tracking-wide">Purchase Return Summary</h2>
          
          <div className="flex flex-wrap items-center gap-2">
            <button 
              onClick={() => setCollectionModalOpen(true)}
              className="flex items-center gap-1.5 bg-[#6c757d] hover:bg-[#5a6268] text-white px-3 py-1.5 rounded-[3px] text-[13px] font-medium transition-colors shadow-sm"
            >
              <BarChart2 className="w-4 h-4" />
              Today's Collection
            </button>
            <button 
              onClick={() => setLoadingSheetModalOpen(true)}
              className="flex items-center gap-1.5 bg-[#ffc107] hover:bg-[#e0a800] text-gray-900 px-3 py-1.5 rounded-[3px] text-[13px] font-bold transition-colors shadow-sm"
            >
              <FileText className="w-4 h-4" strokeWidth={2.5} />
              Loading Sheet
            </button>
            <button 
              onClick={() => navigate('/admin/create_invoices/company_purchase')}
              className="flex items-center gap-1 bg-[#28a745] hover:bg-[#218838] text-white px-3 py-1.5 rounded-[3px] text-[13px] font-bold transition-colors shadow-sm"
            >
              <Plus className="w-4 h-4" strokeWidth={3} />
              Create New
            </button>
            <button 
              onClick={() => navigate('/dashboard')}
              className="bg-[#dc3545] hover:bg-[#c82333] text-white p-1 rounded-[3px] transition-colors shadow-sm"
            >
              <X className="w-5 h-5 font-bold" strokeWidth={3} />
            </button>
          </div>
        </div>

        {/* Filter Section */}
        <div className="p-3 bg-white border-b border-gray-200">
          <div className="flex flex-col gap-2">
            <div className="flex justify-between items-center px-1">
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-[13px] font-bold text-gray-800">Company Name</span>
              </div>
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-[13px] font-bold text-gray-800">Date</span>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-3 items-center">
              <div className="flex-1 w-full">
                <input 
                  type="text" 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search Supplier/Customer Name..."
                  className="w-full min-w-0 border border-gray-300 rounded-[3px] px-3 py-1.5 text-[13px] outline-none bg-white text-gray-800 placeholder-gray-400 focus:border-[#4F46E5]"
                />
              </div>
              
              <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto">
                <select className="min-w-0 border border-gray-300 rounded-[3px] px-3 py-1.5 text-[13px] outline-none bg-white text-gray-800 w-full">
                  <option>Today</option>
                    <option>Yesterday</option>
                    <option>Last 7 Days</option>
                    <option>Last 30 Days</option>
                    <option>Last Month</option>
                    <option>This Month</option>
                    <option>Custom Range</option>
                </select>
                <button className="flex items-center gap-1.5 bg-[#007bff] hover:bg-[#0069d9] text-white px-4 py-1.5 rounded-[3px] text-[13px] font-medium transition-colors shadow-sm whitespace-nowrap">
                  <Search className="w-4 h-4" />
                  Search
                </button>
                <button className="bg-[#6c757d] hover:bg-[#5a6268] text-white p-1.5 rounded-[3px] transition-colors shadow-sm">
                  <SlidersHorizontal className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Data Totals Header */}
        <div className="bg-[#343a40] text-white flex flex-col sm:grid sm:grid-cols-3 text-center border-b border-gray-600 py-1.5">
           <div className="flex flex-col items-center justify-center">
             <span className="font-bold text-[13px] tracking-wide">TOTAL AMT:</span>
             <span className="font-bold text-[14px]">₹{totalAmt.toFixed(2)}</span>
           </div>
           <div className="flex flex-col items-center justify-center">
             <span className="font-bold text-[13px] tracking-wide">TOTAL PAID:</span>
             <span className="font-bold text-[14px]">₹{totalPaid.toFixed(2)}</span>
           </div>
           <div className="flex flex-col items-center justify-center">
             <span className="font-bold text-[13px] tracking-wide">BALANCE:</span>
             <span className="font-bold text-[14px]">₹{totalBal.toFixed(2)}</span>
           </div>
        </div>

        {/* Main Content Area */}
        <div className="flex-1 bg-white overflow-auto relative">
          <div className="table-scroll w-full overflow-x-auto min-h-full">
            <table className="w-full text-left border-collapse">
              <thead className="bg-[#f8f9fa] sticky top-0 shadow-sm z-10">
                <tr>
                  <th className="px-4 py-3 text-[13px] font-bold text-gray-700 border-b border-gray-200 w-[50px]">#</th>
                  <th className="px-4 py-3 text-[13px] font-bold text-gray-700 border-b border-gray-200">Return Invoice No</th>
                  <th className="px-4 py-3 text-[13px] font-bold text-[#4F46E5] border-b border-gray-200">Supplier/Customer Name</th>
                  <th className="px-4 py-3 text-[13px] font-bold text-gray-700 border-b border-gray-200">Date</th>
                  <th className="px-4 py-3 text-[13px] font-bold text-gray-700 border-b border-gray-200">Amount</th>
                  <th className="px-4 py-3 text-[13px] font-bold text-gray-700 border-b border-gray-200 text-center">Status</th>
                  <th className="px-4 py-3 text-[13px] font-bold text-gray-700 border-b border-gray-200 text-center">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredData.length > 0 ? (
                  filteredData.map((row, index) => (
                    <tr key={row.id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                      <td className="px-4 py-3 text-[13px] text-gray-600">{index + 1}</td>
                      <td className="px-4 py-3 text-[13px] font-medium text-gray-800">{row.invoiceNo}</td>
                      <td className="px-4 py-3 text-[14px] font-bold text-gray-900">{row.customer?.name || 'Cash'}</td>
                      <td className="px-4 py-3 text-[13px] text-gray-600">{new Date(row.date).toLocaleDateString()}</td>
                      <td className="px-4 py-3 text-[13px] font-bold text-gray-800">₹{row.totalAmount?.toFixed(2)}</td>
                      <td className="px-4 py-3 text-center">
                        <span className={`px-2 py-1 rounded text-[11px] font-bold tracking-wide ${row.status === 'PAID' || row.status === 'COMPLETED' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>
                          {row.status}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-center">
                        <button className="text-[#007bff] hover:text-[#0056b3] font-medium text-[13px] mr-3">View</button>
                        <button className="text-gray-500 hover:text-gray-700 font-medium text-[13px]">Print</button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="7" className="px-4 py-8 text-center text-gray-500 text-[14px]">No results found matching "{searchQuery}"</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

      </div>

      <CollectionReportModal 
        isOpen={collectionModalOpen} 
        onClose={() => setCollectionModalOpen(false)} 
      />

      {/* Loading Sheet Modal */}
      {loadingSheetModalOpen && (
        <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black/40 backdrop-blur-sm p-4">
          <div className="bg-white rounded-[4px] shadow-2xl w-full max-w-4xl overflow-hidden flex flex-col h-[85vh]">
            
            {/* Modal Header */}
            <div className="bg-[#ffc107] px-4 py-3 flex items-center justify-between">
              <h3 className="text-gray-900 font-medium text-[16px]">Select Invoices for Loading Sheet</h3>
              <button onClick={() => setLoadingSheetModalOpen(false)} className="text-[#dc3545] hover:text-red-700 transition-colors">
                <X className="w-7 h-7 font-bold" strokeWidth={4} />
              </button>
            </div>
            
            <div className="flex-1 flex flex-col p-4 overflow-hidden">
              {/* Actions row */}
              <div className="flex justify-between items-center mb-4">
                <span className="text-[14px] text-gray-700">Select Invoices</span>
                <div className="flex flex-wrap items-center gap-2">
                  <button 
                    onClick={() => setSelectedInvoices(filteredData.map(inv => inv.id))}
                    className="border border-[#007bff] text-[#007bff] hover:bg-blue-50 px-3 py-1.5 rounded-[3px] text-[13px] font-medium transition-colors"
                  >
                    Select All
                  </button>
                  <button 
                    onClick={() => setSelectedInvoices([])}
                    className="border border-gray-400 text-gray-600 hover:bg-gray-50 px-3 py-1.5 rounded-[3px] text-[13px] font-medium transition-colors"
                  >
                    Deselect All
                  </button>
                </div>
              </div>
              
              {/* Filter */}
              <div className="flex flex-col gap-1 mb-4">
                <label className="text-[14px] font-bold text-gray-800">Filter by Salesman</label>
                <select className="min-w-0 border border-gray-300 rounded-[3px] px-3 py-2 text-[14px] text-gray-500 outline-none w-full shadow-sm bg-white">
                  <option>Select Salesman</option>
                </select>
              </div>

              {/* Data Table */}
              <div className="flex-1 overflow-auto border border-gray-200">
                <div className="table-scroll w-full overflow-x-auto">
            <table className="w-full text-left border-collapse">
                  <thead className="bg-[#343a40] text-white sticky top-0">
                    <tr>
                      <th className="px-3 py-2 text-[14px] font-bold w-[40px] border-r border-gray-600 whitespace-nowrap">#</th>
                      <th className="px-3 py-2 text-[14px] font-bold border-r border-gray-600 whitespace-nowrap">Invoice No</th>
                      <th className="px-3 py-2 text-[14px] font-bold border-r border-gray-600 whitespace-nowrap">Party Name</th>
                      <th className="px-3 py-2 text-[14px] font-bold border-r border-gray-600 whitespace-nowrap">Date</th>
                      <th className="px-3 py-2 text-[14px] font-bold whitespace-nowrap">Amount</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredData.length > 0 ? (
                      filteredData.map((row, index) => (
                        <tr key={row.id} className="border-b border-gray-100 hover:bg-gray-50 cursor-pointer" onClick={() => {
                          if (selectedInvoices.includes(row.id)) {
                            setSelectedInvoices(selectedInvoices.filter(id => id !== row.id));
                          } else {
                            setSelectedInvoices([...selectedInvoices, row.id]);
                          }
                        }}>
                          <td className="px-3 py-2 text-[13px] border-r border-gray-100">
                            <input 
                              type="checkbox" 
                              checked={selectedInvoices.includes(row.id)}
                              readOnly
                              className="cursor-pointer" 
                            />
                          </td>
                          <td className="px-3 py-2 text-[13px] text-gray-800 border-r border-gray-100">{row.invoiceNo}</td>
                          <td className="px-3 py-2 text-[13px] font-medium text-gray-800 border-r border-gray-100">{row.customer?.name || 'Cash'}</td>
                          <td className="px-3 py-2 text-[13px] text-gray-600 border-r border-gray-100">{new Date(row.date).toLocaleDateString()}</td>
                          <td className="px-3 py-2 text-[13px] font-bold text-gray-800">₹{row.totalAmount?.toFixed(2)}</td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="5" className="px-4 py-8 text-center text-gray-500 text-[14px]">No invoices available for Loading Sheet</td>
                      </tr>
                    )}
                  </tbody>
                </table>
          </div>
              </div>
            </div>
            
            {/* Modal Footer */}
            <div className="bg-[#f8f9fa] border-t border-gray-200 px-4 py-3 flex justify-between items-center">
              <div className="text-[14px] text-gray-600">
                Selected: {selectedInvoices.length} of {filteredData.length}
              </div>
              <div className="flex flex-wrap items-center gap-2">
                <button 
                  onClick={() => setLoadingSheetModalOpen(false)} 
                  className="bg-[#6c757d] hover:bg-[#5a6268] text-white px-4 py-1.5 rounded-[3px] text-[14px] font-medium transition-colors shadow-sm"
                >
                  Cancel
                </button>
                <button 
                  onClick={() => {
                    if (selectedInvoices.length === 0) return alert('Select invoices first');
                    const selectedData = filteredData.filter(inv => selectedInvoices.includes(inv.id));
                    let text = "Loading Sheet Details:\n\n";
                    selectedData.forEach((inv, i) => {
                      text += `${i + 1}. Invoice: ${inv.invoiceNo} | Party: ${inv.customer?.name || 'Cash'} | Amount: Rs. ${inv.totalAmount?.toFixed(2)}\n`;
                    });
                    const url = `https://web.whatsapp.com/send?text=${encodeURIComponent(text)}`;
                    window.open(url, '_blank');
                  }}
                  className="bg-[#28a745] hover:bg-[#218838] opacity-80 text-white px-4 py-1.5 rounded-[3px] text-[14px] font-medium transition-colors shadow-sm"
                >
                  Send WhatsApp PDFs
                </button>
                <button 
                  onClick={async () => {
                    if (selectedInvoices.length === 0) return alert('Select invoices first');
                    try {
                      const { default: apiClient } = await import('../api/apiClient');
                      const response = await apiClient.post('/loading-sheet/generate-pdf', { invoiceIds: selectedInvoices }, { responseType: 'blob' });
                      const url = window.URL.createObjectURL(new Blob([response.data]));
                      const link = document.createElement('a');
                      link.href = url;
                      link.setAttribute('download', `LoadingSheet_${Date.now()}.pdf`);
                      document.body.appendChild(link);
                      link.click();
                      link.parentNode.removeChild(link);
                    } catch (error) {
                      console.error('PDF Error:', error);
                      alert('Failed to generate PDF');
                    }
                  }}
                  className="bg-[#28a745] hover:bg-[#218838] opacity-80 text-white px-4 py-1.5 rounded-[3px] text-[14px] font-medium transition-colors shadow-sm"
                >
                  Generate Loading Sheet
                </button>
              </div>
            </div>
            
          </div>
        </div>
      )}

    </div>
  );
}
