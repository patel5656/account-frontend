import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Plus, 
  Gift,
  Tag,
  Calendar,
  Shield,
  Search,
  ChevronDown,
  Trash2,
  CalendarClock,
  Clock
} from 'lucide-react';
import { OfferManagementModal } from '../components/OfferManagementModal';

export function OfferManagement() {
  const navigate = useNavigate();
  const [createModalOpen, setCreateModalOpen] = useState(false);

  // Dummy data representing the image
  const initialOffers = [
    {
      id: 1,
      name: 'Diwali Offer',
      minCart: '₹200',
      type: 'PERCENTAGE',
      target: 'ENTIRE CART',
      offerValue: '10% OFF',
      maxDiscount: 'Max ₹500',
      schedule: '2026-05-01 to 2026-05-15',
      scheduleIcon: 'CalendarClock',
      usage: 145,
      priority: 'P2',
      status: 'ACTIVE'
    },
    {
      id: 2,
      name: 'Flash Sale',
      minCart: '₹150',
      type: 'FLAT',
      target: 'ENTIRE CART',
      offerValue: '₹200 OFF',
      schedule: 'Always Active',
      usage: 82,
      priority: 'P3',
      status: 'ACTIVE'
    },
    {
      id: 3,
      name: 'Buy 2 Get 1 Free (Bread)',
      type: 'BOGO',
      target: 'SELECTED PRODUCTS',
      offerValue: 'Buy 2 Get 1',
      schedule: 'Always Active',
      usage: 45,
      priority: 'P1',
      status: 'ACTIVE'
    },
    {
      id: 4,
      name: 'Combo: Coke + Cornflakes',
      type: 'COMBO',
      target: 'SELECTED PRODUCTS',
      offerValue: 'Fixed ₹220',
      schedule: 'Always Active',
      usage: 12,
      priority: 'P1',
      status: 'ACTIVE'
    },
    {
      id: 5,
      name: 'Happy Hour Beverages',
      type: 'HAPPY HOUR',
      target: 'SELECTED PRODUCTS',
      offerValue: '20% OFF',
      schedule: '15:00 - 18:00',
      scheduleIcon: 'Clock',
      usage: 56,
      priority: 'P1',
      status: 'ACTIVE'
    }
  ];

  const [offers, setOffers] = useState(() => {
    const saved = localStorage.getItem('offers_data_v2');
    if (saved) {
      return JSON.parse(saved);
    }
    return initialOffers;
  });

  useEffect(() => {
    localStorage.setItem('offers_data_v2', JSON.stringify(offers));
  }, [offers]);

  const handleDelete = (id) => {
    setOffers(offers.filter(offer => offer.id !== id));
  };

  const renderIcon = (iconName) => {
    if (iconName === 'CalendarClock') return <CalendarClock className="w-4 h-4" />;
    if (iconName === 'Clock') return <Clock className="w-4 h-4" />;
    return null;
  };

  return (
    <div className="bg-[#f8f9fc] min-h-[calc(100vh-45px)] p-4 md:p-6 font-sans">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <h1 className="text-[20px] md:text-[22px] font-semibold text-gray-800"></h1>
        <button 
          onClick={() => setCreateModalOpen(true)}
          className="bg-[#295dec] hover:bg-[#1d4ed8] text-white px-4 py-2 rounded-md text-[14px] font-medium flex items-center justify-center gap-2 transition-colors shadow-sm"
        >
          <Plus className="w-4 h-4" strokeWidth={2.5} />
          Create Promotion
        </button>
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {/* Card 1 */}
        <div className="bg-white rounded-xl border border-gray-100 p-4 shadow-sm flex flex-col justify-between h-24 hover:shadow-lg transform hover:-translate-y-1 transition-all duration-300">
          <div className="flex justify-between items-start">
            <span className="text-[14px] text-gray-500 font-medium">Total Offer Usage</span>
            <Gift className="w-5 h-5 text-blue-400" strokeWidth={1.5} />
          </div>
          <span className="text-3xl font-bold text-gray-800">100</span>
        </div>
        {/* Card 2 */}
        <div className="bg-white rounded-xl border border-gray-100 p-4 shadow-sm flex flex-col justify-between h-24 hover:shadow-lg transform hover:-translate-y-1 transition-all duration-300">
          <div className="flex justify-between items-start">
            <span className="text-[14px] text-gray-500 font-medium">Active / Expired</span>
            <Tag className="w-5 h-5 text-blue-400" strokeWidth={1.5} />
          </div>
          <span className="text-3xl font-bold text-gray-800">1 / 0</span>
        </div>
        {/* Card 3 */}
        <div className="bg-white rounded-xl border border-gray-100 p-4 shadow-sm flex flex-col justify-between h-24 hover:shadow-lg transform hover:-translate-y-1 transition-all duration-300">
          <div className="flex justify-between items-start">
            <span className="text-[14px] text-gray-500 font-medium">Scheduled Offers</span>
            <Calendar className="w-5 h-5 text-blue-400" strokeWidth={1.5} />
          </div>
          <span className="text-3xl font-bold text-gray-800">0</span>
        </div>
        {/* Card 4 */}
        <div className="bg-white rounded-xl border border-gray-100 p-4 shadow-sm flex flex-col justify-between h-24 hover:shadow-lg transform hover:-translate-y-1 transition-all duration-300">
          <div className="flex justify-between items-start">
            <span className="text-[14px] text-gray-500 font-medium">Top Performing</span>
            <Shield className="w-5 h-5 text-blue-400" strokeWidth={1.5} />
          </div>
          <span className="text-xl font-bold text-gray-800 truncate">Diwali Offer</span>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
        
        {/* Toolbar */}
        <div className="p-4 border-b border-gray-100 flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-2 border border-gray-200 rounded-md px-3 py-1.5 bg-gray-50/50 w-full md:w-64 focus-within:border-blue-500 focus-within:bg-white transition-colors">
            <Search className="w-4 h-4 text-gray-400" />
            <input 
              type="text" 
              placeholder="Search..."
              className="bg-transparent border-none outline-none text-[14px] w-full text-gray-700 placeholder-gray-400"
            />
          </div>
          <div className="flex items-center gap-2 border border-gray-200 rounded-md px-3 py-1.5 bg-white cursor-pointer hover:bg-gray-50">
            <span className="text-[14px] text-gray-700 font-medium">All Status</span>
            <ChevronDown className="w-4 h-4 text-gray-500" />
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left whitespace-nowrap md:whitespace-normal">
            <thead>
              <tr className="bg-white border-b border-gray-100">
                <th className="py-4 px-6 text-[13px] font-semibold text-gray-500 md:w-[20%]">Offer Name</th>
                <th className="py-4 px-6 text-[13px] font-semibold text-gray-500 md:w-[20%]">Type & Target</th>
                <th className="py-4 px-6 text-[13px] font-semibold text-gray-500 md:w-[15%]">Offer Value</th>
                <th className="py-4 px-6 text-[13px] font-semibold text-gray-500 md:w-[20%]">Schedule</th>
                <th className="py-4 px-6 text-[13px] font-semibold text-gray-500 text-center md:w-[8%]">Usage</th>
                <th className="py-4 px-6 text-[13px] font-semibold text-gray-500 text-center md:w-[8%]">Priority</th>
                <th className="py-4 px-6 text-[13px] font-semibold text-gray-500 md:w-[9%]">Status</th>
                <th className="py-4 px-4 w-[5%]"></th>
              </tr>
            </thead>
            <tbody>
              {offers.map((offer) => (
                <tr key={offer.id} className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors group">
                  <td className="py-4 px-6">
                    <div className="flex flex-col">
                      <span className="text-[14px] font-bold text-gray-800">{offer.name}</span>
                      {offer.minCart && (
                        <span className="text-[12px] text-gray-500">Min Cart: {offer.minCart}</span>
                      )}
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex flex-col gap-1.5 items-start">
                      <span className="text-[11px] font-bold tracking-wider text-[#295dec] uppercase">
                        {offer.type}
                      </span>
                      <span className="text-[10px] font-bold text-[#3b82f6] bg-blue-50 px-2 py-0.5 rounded-full border border-blue-100/50">
                        {offer.target}
                      </span>
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex flex-col">
                      <span className="text-[14px] font-bold text-gray-800">{offer.offerValue}</span>
                      {offer.maxDiscount && (
                        <span className="text-[11px] font-bold text-red-500">{offer.maxDiscount}</span>
                      )}
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-1.5 text-gray-500">
                      {offer.scheduleIcon && (
                        renderIcon(offer.scheduleIcon)
                      )}
                      <span className={`text-[13px] ${offer.schedule === 'Always Active' ? 'italic' : 'font-medium text-gray-600'}`}>
                        {offer.schedule}
                      </span>
                    </div>
                  </td>
                  <td className="py-4 px-6 text-center">
                    <span className="text-[14px] font-bold text-gray-800">{offer.usage}</span>
                  </td>
                  <td className="py-4 px-6 text-center">
                    <span className="text-[13px] font-medium text-gray-500">{offer.priority}</span>
                  </td>
                  <td className="py-4 px-6">
                    <span className={`text-[11px] font-bold tracking-wider ${
                      offer.status === 'ACTIVE' ? 'text-green-500' : 'text-gray-400'
                    }`}>
                      {offer.status}
                    </span>
                  </td>
                  <td className="py-4 px-4 text-right">
                    <button 
                      onClick={() => handleDelete(offer.id)}
                      className="p-2 text-red-400 hover:text-white bg-red-50 hover:bg-red-500 rounded-md shadow-sm hover:shadow-md transform hover:-translate-y-1 active:translate-y-0 active:shadow-sm transition-all duration-200 border border-red-100 hover:border-red-500"
                      title="Delete Offer"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

      </div>

      <OfferManagementModal 
        isOpen={createModalOpen} 
        onClose={() => setCreateModalOpen(false)} 
        onSubmit={(newOffer) => {
          setOffers([...offers, newOffer]);
        }}
      />

    </div>
  );
}

export default OfferManagement;
