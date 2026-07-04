import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Share2, MessageCircle, Upload, Download, ExternalLink } from 'lucide-react';
import apiClient from '../api/apiClient';

export function GstrPurchaseReturn() {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [selectedParty, setSelectedParty] = useState('');
  const [selectedPeriod, setSelectedPeriod] = useState('All');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const invoiceRes = await apiClient.get('/invoices?type=PURCHASE_RETURN');
      const customerRes = await apiClient.get('/customers');
      
      if (invoiceRes.data?.success) {
        setData(invoiceRes.data.data || []);
      }
      
      if (customerRes.data?.success) {
        setCustomers(customerRes.data.data || []);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredData = data.filter(invoice => {
    if (selectedParty && selectedParty !== 'Select Name') {
      return invoice.customer?.name === selectedParty;
    }
    return true;
  });

  const handleExportCSV = () => {
    const headers = ['Date/Invoice No.', 'Party Name', 'GSTIN', 'State', 'Taxable Amount', 'GST %', 'Quantity', 'IGST', 'CGST', 'SGST', 'Sub Total', 'Grand Total'];
    let rowsContent = [];
    
    filteredData.forEach(invoice => {
      invoice.items.forEach(item => {
         const itemTaxableAmount = item.amount;
         const gstPercent = item.product?.tax || 0;
         const totalGstAmount = itemTaxableAmount * (gstPercent / 100);
         // Assuming intra-state for default, splitting between CGST and SGST
         const igst = 0; 
         const cgst = totalGstAmount / 2;
         const sgst = totalGstAmount / 2;
         
         rowsContent.push([
           `${new Date(invoice.date).toLocaleDateString()} / ${invoice.invoiceNo}`,
           invoice.customer?.name || 'Cash',
           invoice.customer?.gstin || '-',
           invoice.customer?.state || '-',
           itemTaxableAmount.toFixed(2),
           `${gstPercent}%`,
           item.quantity,
           igst.toFixed(2),
           cgst.toFixed(2),
           sgst.toFixed(2),
           itemTaxableAmount.toFixed(2),
           (itemTaxableAmount + totalGstAmount).toFixed(2)
         ].join(','));
      });
    });

    const csvContent = [headers.join(','), ...rowsContent].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "gstr_purchase_return.csv";
    link.click();
  };

  const handleDownload = () => {
    const blob = new Blob([JSON.stringify(filteredData, null, 2)], { type: 'application/json' });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "gstr_purchase_return.json";
    link.click();
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: 'GST Purchase Return Summary',
        text: 'Check out the GST Purchase Return Summary',
        url: window.location.href,
      }).catch(console.error);
    } else {
      alert('Sharing is not supported on this browser.');
    }
  };

  // Calculate totals for footer
  let totalTaxable = 0;
  let totalIgst = 0;
  let totalCgst = 0;
  let totalSgst = 0;
  let totalSub = 0;
  let totalGrand = 0;

  return (
    <div className="bg-[#f4f6f9] min-h-[calc(100vh-45px)] p-4 flex flex-col relative pb-[80px]">
      
      {/* Top Controls */}
      <div className="bg-white p-4 rounded shadow-sm border border-gray-200 mb-4 flex flex-wrap items-center gap-6">
        <div className="flex flex-col gap-1.5 w-full sm:max-w-[250px]">
          <label className="text-[13px] font-bold text-gray-800">Select Period</label>
          <select 
            value={selectedPeriod}
            onChange={(e) => setSelectedPeriod(e.target.value)}
            className="h-[32px] border border-gray-300 rounded-[3px] px-2 text-[13px] outline-none text-gray-700 bg-white"
          >
            <option value="All">All Time</option>
            <option value="ThisMonth">This Month</option>
          </select>
        </div>

        <div className="flex flex-col gap-1.5 w-full sm:max-w-[300px]">
          <div className="flex flex-wrap items-center gap-2">
            <label className="text-[13px] font-bold text-gray-800">Party Name</label>
          </div>
          <select 
            value={selectedParty}
            onChange={(e) => setSelectedParty(e.target.value)}
            className="h-[32px] border border-gray-300 rounded-[3px] px-2 text-[13px] outline-none text-gray-700 bg-white"
          >
            <option value="">Select Name</option>
            {customers.map(c => (
              <option key={c.id} value={c.name}>{c.name}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Main Card */}
      <div className="bg-white rounded shadow-sm border border-gray-200 w-full overflow-hidden flex-1">
        
        {/* Header */}
        <div className="text-center py-4 border-b border-gray-200">
          <h2 className="text-[14px] text-gray-700 mb-1">GST Purchase Return Summary</h2>
        </div>

        {/* Table */}
        <div className="p-4 w-full">
          <div className="table-scroll w-full overflow-x-auto">
            {loading ? (
              <div className="text-center py-10 text-gray-500">Loading data...</div>
            ) : (
              <table className="w-full border-collapse border border-black text-center">
                <thead>
                  <tr>
                    <th className="py-3 px-2 border border-black text-[13px] font-bold text-gray-800 w-[8%] whitespace-nowrap">Date<br/>Invoice No.</th>
                    <th className="py-3 px-2 border border-black text-[13px] font-bold text-gray-800 w-[20%] whitespace-nowrap">Party Name</th>
                    <th className="py-3 px-2 border border-black text-[13px] font-bold text-gray-800 w-[10%] whitespace-nowrap">GSTIN</th>
                    <th className="py-3 px-2 border border-black text-[13px] font-bold text-gray-800 w-[8%] whitespace-nowrap">State</th>
                    <th className="py-3 px-2 border border-black text-[13px] font-bold text-gray-800 w-[8%] whitespace-nowrap">Taxable<br/>Amount</th>
                    <th className="py-3 px-2 border border-black text-[13px] font-bold text-gray-800 w-[5%] whitespace-nowrap">GST %</th>
                    <th className="py-3 px-2 border border-black text-[13px] font-bold text-gray-800 w-[6%] whitespace-nowrap">Quantity</th>
                    <th className="py-3 px-2 border border-black text-[13px] font-bold text-gray-800 w-[6%] whitespace-nowrap">IGST</th>
                    <th className="py-3 px-2 border border-black text-[13px] font-bold text-gray-800 w-[6%] whitespace-nowrap">CGST</th>
                    <th className="py-3 px-2 border border-black text-[13px] font-bold text-gray-800 w-[6%] whitespace-nowrap">SGST</th>
                    <th className="py-3 px-2 border border-black text-[13px] font-bold text-gray-800 w-[8%] whitespace-nowrap">Sub Total</th>
                    <th className="py-3 px-2 border border-black text-[13px] font-bold text-gray-800 w-[9%] whitespace-nowrap">Grand Total</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredData.length === 0 ? (
                    <tr>
                      <td colSpan="12" className="py-4 text-center text-gray-500 text-[13px]">No purchase return records found.</td>
                    </tr>
                  ) : (
                    filteredData.map(invoice => {
                      return invoice.items.map(item => {
                        const itemTaxableAmount = item.amount;
                        const gstPercent = item.product?.tax || 0;
                        const totalGstAmount = itemTaxableAmount * (gstPercent / 100);
                        const igst = 0; 
                        const cgst = totalGstAmount / 2;
                        const sgst = totalGstAmount / 2;
                        const grandTotal = itemTaxableAmount + totalGstAmount;

                        totalTaxable += itemTaxableAmount;
                        totalIgst += igst;
                        totalCgst += cgst;
                        totalSgst += sgst;
                        totalSub += itemTaxableAmount;
                        totalGrand += grandTotal;

                        return (
                          <tr key={`${invoice.id}-${item.id}`}>
                            <td className="py-3 px-2 border border-black text-[13px]">{new Date(invoice.date).toLocaleDateString()}<br/>{invoice.invoiceNo}</td>
                            <td className="py-3 px-2 border border-black text-[13px]">{invoice.customer?.name || 'Cash'}</td>
                            <td className="py-3 px-2 border border-black text-[13px]">{invoice.customer?.gstin || '-'}</td>
                            <td className="py-3 px-2 border border-black text-[13px]">{invoice.customer?.state || '-'}</td>
                            <td className="py-3 px-2 border border-black text-[13px]">{itemTaxableAmount.toFixed(2)}</td>
                            <td className="py-3 px-2 border border-black text-[13px]">{gstPercent}%</td>
                            <td className="py-3 px-2 border border-black text-[13px]">{item.quantity}</td>
                            <td className="py-3 px-2 border border-black text-[13px]">{igst.toFixed(2)}</td>
                            <td className="py-3 px-2 border border-black text-[13px]">{cgst.toFixed(2)}</td>
                            <td className="py-3 px-2 border border-black text-[13px]">{sgst.toFixed(2)}</td>
                            <td className="py-3 px-2 border border-black text-[13px]">{itemTaxableAmount.toFixed(2)}</td>
                            <td className="py-3 px-2 border border-black text-[13px]">{grandTotal.toFixed(2)}</td>
                          </tr>
                        );
                      });
                    })
                  )}

                  {/* Total Row */}
                  <tr className="bg-gray-50">
                    <td className="py-3 px-2 border border-black text-[13px]"></td>
                    <td className="py-3 px-2 border border-black text-[13px]"></td>
                    <td className="py-3 px-2 border border-black text-[13px]"></td>
                    <td className="py-3 px-2 border border-black text-[13px] font-bold text-gray-800 text-center">Total</td>
                    <td className="py-3 px-2 border border-black text-[13px] font-bold text-gray-800 text-center">{totalTaxable.toFixed(2)}</td>
                    <td className="py-3 px-2 border border-black text-[13px]"></td>
                    <td className="py-3 px-2 border border-black text-[13px]"></td>
                    <td className="py-3 px-2 border border-black text-[13px] font-bold text-gray-800 text-center">{totalIgst.toFixed(2)}</td>
                    <td className="py-3 px-2 border border-black text-[13px] font-bold text-gray-800 text-center">{totalCgst.toFixed(2)}</td>
                    <td className="py-3 px-2 border border-black text-[13px] font-bold text-gray-800 text-center">{totalSgst.toFixed(2)}</td>
                    <td className="py-3 px-2 border border-black text-[13px] font-bold text-gray-800 text-center">{totalSub.toFixed(2)}</td>
                    <td className="py-3 px-2 border border-black text-[13px] font-bold text-gray-800 text-center">{totalGrand.toFixed(2)}</td>
                  </tr>
                </tbody>
              </table>
            )}
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
          onClick={handleShare}
          className="bg-[#28a745] hover:bg-[#218838] text-white text-[13px] font-medium px-3 py-1.5 rounded-[3px] flex items-center justify-center shadow-sm transition-colors"
        >
          <Share2 className="w-4 h-4" />
        </button>
        <button 
          onClick={() => window.open('https://web.whatsapp.com/', '_blank')}
          className="bg-[#28a745] hover:bg-[#218838] text-white text-[13px] font-medium px-3 py-1.5 rounded-[3px] flex items-center justify-center shadow-sm transition-colors"
        >
          <MessageCircle className="w-4 h-4 fill-white" />
        </button>
        <button 
          onClick={handleExportCSV}
          className="bg-[#ffc107] hover:bg-[#e0a800] text-gray-900 text-[13px] font-medium px-4 py-1.5 rounded-[3px] flex items-center justify-center gap-1.5 shadow-sm transition-colors"
        >
          <Upload className="w-4 h-4" /> Export
        </button>
        <button 
          onClick={handleDownload}
          className="bg-[#343a40] hover:bg-[#23272b] text-white text-[13px] font-medium px-4 py-1.5 rounded-[3px] flex items-center justify-center gap-1.5 shadow-sm transition-colors"
        >
          <Download className="w-4 h-4" /> Download
        </button>
      </div>

    </div>
  );
}
