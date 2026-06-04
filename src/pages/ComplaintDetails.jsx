import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, X, Settings, Calendar, Image as ImageIcon } from 'lucide-react';

export function ComplaintDetails() {
  const navigate = useNavigate();
  const [isCustomerEnabled, setIsCustomerEnabled] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Form states
  const [complainDate, setComplainDate] = useState(() => {
    const today = new Date();
    const yyyy = today.getFullYear();
    const mm = String(today.getMonth() + 1).padStart(2, '0');
    const dd = String(today.getDate()).padStart(2, '0');
    return `${yyyy}-${mm}-${dd}`;
  });
  const [partyName, setPartyName] = useState('');
  const [productName, setProductName] = useState('');
  const [technicianName, setTechnicianName] = useState('');
  const [complainDetails, setComplainDetails] = useState('');
  const [serviceAmount, setServiceAmount] = useState('0');
  const [remark, setRemark] = useState('');
  const [location, setLocation] = useState('');

  const handleSubmitComplain = () => {
    alert("Complain Booked Successfully!");
    setIsModalOpen(false);
    
    // Reset form fields
    setPartyName('');
    setProductName('');
    setTechnicianName('');
    setComplainDetails('');
    setServiceAmount('0');
    setRemark('');
    setLocation('');
  };

  return (
    <div className="bg-white min-h-[calc(100vh-60px)] flex flex-col relative">
      {/* Top Teal Bar */}
      <div className="bg-[#4F46E5] px-4 py-[6px] flex justify-between items-center text-white">
        <h2 className="text-[14.5px] font-medium tracking-wide">Complain Summary</h2>
        <div className="flex flex-wrap items-center gap-1.5">
          <button 
            onClick={() => setIsModalOpen(true)}
            className="bg-[#28a745] hover:bg-[#218838] text-white px-3 py-[4px] rounded-[3px] text-[13px] font-medium flex items-center gap-1 transition-colors"
          >
            <span className="text-lg leading-none mt-[-2px]">+</span> Book New
          </button>
          <button 
            onClick={() => navigate(-1)}
            className="bg-[#dc3545] hover:bg-[#c82333] text-white px-2.5 py-[6px] rounded-[3px] flex items-center justify-center transition-colors"
          >
            <X className="w-[14px] h-[14px]" strokeWidth={3} />
          </button>
        </div>
      </div>

      {/* Filters Row */}
      <div className="px-4 py-3 border-b border-gray-200 flex flex-wrap items-end gap-x-6 gap-y-3 bg-[#f8f9fa]">
        {/* Customer Name Toggle & Select */}
        <div className="flex flex-col gap-1 w-[220px]">
          <div className="flex flex-wrap items-center gap-2 px-1">
            <div 
              onClick={() => setIsCustomerEnabled(!isCustomerEnabled)}
              className={`w-8 h-[18px] rounded-full relative cursor-pointer border transition-colors duration-200 ${isCustomerEnabled ? 'bg-[#4F46E5] border-[#4F46E5]' : 'bg-gray-300 border-gray-400'}`}
            >
              <div className={`w-3.5 h-3.5 bg-white rounded-full absolute top-[1px] transition-all duration-200 ${isCustomerEnabled ? 'right-[2px]' : 'left-[2px]'}`}></div>
            </div>
            <label className="text-[13px] font-bold text-gray-800">Customer Name</label>
          </div>
          <select 
            disabled={!isCustomerEnabled}
            className="w-full h-[32px] border border-gray-300 rounded-[3px] px-2 text-[13px] outline-none text-gray-400 bg-white disabled:bg-gray-50 focus:border-[#4F46E5]"
          >
            <option>Select Name</option>
          </select>
        </div>

        {/* Barcode */}
        <div className="flex flex-col gap-1 w-[160px]">
          <label className="text-[13px] font-bold text-gray-800 px-1">Barcode</label>
          <input 
            type="text" 
            placeholder="Barcode"
            className="w-full h-[32px] border border-gray-300 rounded-[3px] px-2 text-[13px] outline-none text-gray-700 bg-white placeholder-gray-400 focus:border-[#4F46E5]"
          />
        </div>

        {/* Status */}
        <div className="flex flex-col gap-1 w-[160px]">
          <label className="text-[13px] font-bold text-gray-800 px-1">Status</label>
          <select className="w-full h-[32px] border border-gray-300 rounded-[3px] px-2 text-[13px] outline-none text-gray-700 bg-white focus:border-[#4F46E5]">
            <option>Pending</option>
          </select>
        </div>

        {/* Filter By */}
        <div className="flex flex-col gap-1 w-[160px]">
          <label className="text-[13px] font-bold text-gray-800 px-1">Filter By</label>
          <select className="w-full h-[32px] border border-gray-300 rounded-[3px] px-2 text-[13px] outline-none text-gray-700 bg-white focus:border-[#4F46E5]">
            <option>Complain Date</option>
          </select>
        </div>

        {/* Date & Search */}
        <div className="flex flex-col gap-1 flex-1 w-full">
          <label className="text-[13px] font-bold text-[#4F46E5] px-1">Date(01-Jan-2000 to 25-May-2026)</label>
          <div className="flex gap-2">
            <select className="flex-1 h-[32px] border border-gray-300 rounded-[3px] px-2 text-[13px] outline-none text-gray-700 bg-white focus:border-[#4F46E5] max-w-[150px]">
              <option>Today</option>
            </select>
            <button className="bg-[#007bff] hover:bg-[#0069d9] text-white px-4 py-[5px] rounded-[3px] text-[13px] font-medium flex items-center justify-center gap-1 transition-colors">
              <Search className="w-3.5 h-3.5" strokeWidth={3} /> Search
            </button>
          </div>
        </div>
      </div>

      {/* Empty State */}
      <div className="flex-1 flex flex-col items-center pt-24 bg-white relative">
        <h2 className="text-[26px] font-normal text-[#333] mb-3">No Complain Booked Yet</h2>
        <p className="text-[14px] text-[#555] mb-1">It seems that you do not have any Complain.</p>
        <p className="text-[14px] text-[#555] mb-8">Please Book one now.</p>
        
        {/* Large Document Icon */}
        <div className="text-[#333] mb-16">
          <svg width="90" height="110" viewBox="0 0 60 80" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fillRule="evenodd" clipRule="evenodd" d="M0 4C0 1.79086 1.79086 0 4 0H42.1716C43.2325 0 44.2499 0.421427 45.0001 1.17157L58.8284 15C59.5786 15.7501 60 16.7675 60 17.8284V76C60 78.2091 58.2091 80 56 80H4C1.79086 80 0 78.2091 0 76V4ZM42 16H56.1716L42 1.82843V16ZM10 18H28V24H10V18ZM10 32H38V38H10V32ZM10 52H50V70H10V52ZM16 58H44V64H16V58Z" fill="#333333"/>
          </svg>
        </div>
      </div>

      {/* Complain Master Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs">
          <div className="bg-white rounded-[3px] shadow-2xl w-full max-w-[650px] flex flex-col overflow-hidden animate-in fade-in zoom-in duration-200">
            {/* Header */}
            <div className="bg-[#17a2b8] flex items-center justify-between text-white pl-4 py-2.5">
              <h2 className="text-[15px] font-bold tracking-wide">Complain Master</h2>
              <div className="flex items-center">
                <button className="text-white hover:text-gray-200 focus:outline-none transition-colors px-3">
                  <Settings className="w-[18px] h-[18px]" strokeWidth={2.5} />
                </button>
                <button 
                  onClick={() => setIsModalOpen(false)} 
                  className="bg-[#dc3545] hover:bg-[#c82333] h-full px-3 py-2.5 focus:outline-none transition-colors"
                >
                  <X className="w-5 h-5 text-white" strokeWidth={3} />
                </button>
              </div>
            </div>

            {/* Body */}
            <div className="p-4 flex flex-col gap-4">
              
              {/* Date */}
              <div className="flex flex-col gap-1">
                <label className="text-[13px] font-bold text-gray-800">Date:</label>
                <div className="flex items-center border border-gray-300 rounded-[3px] overflow-hidden focus-within:border-[#17a2b8] bg-white">
                  <input 
                    type="date"
                    value={complainDate}
                    onChange={(e) => setComplainDate(e.target.value)}
                    className="w-full h-[32px] px-3 text-[13px] outline-none text-gray-700 bg-white"
                  />
                </div>
              </div>

              {/* Party Name */}
              <div className="flex flex-col gap-1">
                <label className="text-[13px] font-bold text-gray-800">Party Name</label>
                <select 
                  value={partyName}
                  onChange={(e) => setPartyName(e.target.value)}
                  className="w-full h-[32px] border border-[#a6cdec] bg-[#b8daff]/20 text-gray-700 rounded-[3px] px-3 text-[13px] outline-none focus:border-[#17a2b8] font-bold"
                >
                  <option value="">Select Name</option>
                  <option value="Demo Party">Demo Party</option>
                </select>
              </div>

              {/* Product Name */}
              <div className="flex flex-col gap-1">
                <label className="text-[13px] font-bold text-gray-800">Product Name</label>
                <select 
                  value={productName}
                  onChange={(e) => setProductName(e.target.value)}
                  className="w-full h-[32px] border border-gray-300 rounded-[3px] px-3 text-[13px] outline-none focus:border-[#17a2b8] text-gray-650 bg-white"
                >
                  <option value="">Select Name</option>
                  <option value="Swayam Billing Software">Swayam Billing Software</option>
                  <option value="Os Books Accounting Software">Os Books Accounting Software</option>
                </select>
              </div>

              {/* Technician Name */}
              <div className="flex flex-col gap-1">
                <label className="text-[13px] font-bold text-gray-800">Technician Name</label>
                <select 
                  value={technicianName}
                  onChange={(e) => setTechnicianName(e.target.value)}
                  className="w-full h-[32px] border border-gray-300 rounded-[3px] px-3 text-[13px] outline-none focus:border-[#17a2b8] text-gray-650 bg-white"
                >
                  <option value="">Select Name</option>
                  <option value="Anmol Gour">Anmol Gour</option>
                  <option value="Amit Sharma">Amit Sharma</option>
                </select>
              </div>

              {/* Complain Details & Service Amount */}
              <div className="grid grid-cols-[3fr_1fr] gap-4">
                <div className="flex flex-col gap-1">
                  <label className="text-[13px] font-bold text-gray-800">Complain Details</label>
                  <input 
                    type="text" 
                    value={complainDetails}
                    onChange={(e) => setComplainDetails(e.target.value)}
                    placeholder="Enter Complain Details"
                    className="w-full h-[32px] border border-gray-300 rounded-[3px] px-3 text-[13px] outline-none focus:border-[#17a2b8] placeholder-gray-400"
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <label className="text-[13px] font-bold text-gray-800">Service Amount</label>
                  <input 
                    type="number" 
                    value={serviceAmount}
                    onChange={(e) => setServiceAmount(e.target.value)}
                    className="w-full h-[32px] border border-gray-300 rounded-[3px] px-3 text-[13px] outline-none focus:border-[#17a2b8]"
                  />
                </div>
              </div>

              {/* Remark & Location */}
              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col gap-1">
                  <label className="text-[13px] font-bold text-gray-800">Remark</label>
                  <input 
                    type="text" 
                    value={remark}
                    onChange={(e) => setRemark(e.target.value)}
                    placeholder="Remark"
                    className="w-full h-[32px] border border-gray-300 rounded-[3px] px-3 text-[13px] outline-none focus:border-[#17a2b8] placeholder-gray-400"
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <label className="text-[13px] font-bold text-gray-800">Location</label>
                  <input 
                    type="text" 
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    placeholder="Location"
                    className="w-full h-[32px] border border-gray-300 rounded-[3px] px-3 text-[13px] outline-none focus:border-[#17a2b8] placeholder-gray-400"
                  />
                </div>
              </div>

            </div>

            {/* Footer */}
            <div className="bg-[#f8f9fa] px-4 py-3 border-t border-gray-200 flex justify-end items-center gap-2">
              <button className="bg-[#6c757d] hover:bg-[#5a6268] text-white p-2 rounded-[3px] flex items-center justify-center mr-auto">
                <ImageIcon className="w-4 h-4" />
              </button>
              <button 
                onClick={handleSubmitComplain}
                className="bg-[#28a745] hover:bg-[#218838] text-white px-4 py-1.5 rounded-[3px] text-[14px] font-medium transition-colors shadow-sm"
              >
                Submit
              </button>
              <button 
                onClick={() => setIsModalOpen(false)}
                className="bg-[#dc3545] hover:bg-[#c82333] text-white px-4 py-1.5 rounded-[3px] text-[14px] font-medium transition-colors shadow-sm"
              >
                Close
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
