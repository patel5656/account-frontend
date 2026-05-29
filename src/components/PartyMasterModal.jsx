import React, { useState } from 'react';
import { X, Settings, Image as ImageIcon } from 'lucide-react';

export function PartyMasterModal({ isOpen, onClose, defaultType = 'COMPANY' }) {
  const [isActive, setIsActive] = useState(true);
  const [partyName, setPartyName] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const [city, setCity] = useState('');
  const [toggles, setToggles] = useState({
    moreInfo: false,
    wholeParty: false,
    sezParty: false,
    focParty: false
  });

  const toggleSwitch = (key) => {
    setToggles(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const handleSubmit = () => {
    if (partyName.trim() !== '') {
      window.dispatchEvent(new CustomEvent('partyAdded', { 
        detail: { 
          id: Date.now(), 
          name: partyName, 
          mobile: mobileNumber, 
          city: city, 
          type: defaultType, 
          balance: 0 
        } 
      }));
    }
    setPartyName('');
    setMobileNumber('');
    setCity('');
    setIsActive(true);
    setToggles({ moreInfo: false, wholeParty: false, sezParty: false, focParty: false });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/40">
      <div className="bg-white rounded-[3px] shadow-2xl w-full sm:max-w-[750px] flex flex-col overflow-hidden animate-in fade-in zoom-in duration-200">
        
        {/* Header */}
        <div className="bg-[#4F46E5] flex items-center justify-between">
          <h2 className="text-[15px] text-white font-medium tracking-wide pl-4 py-2.5">Party Master</h2>
          <div className="flex items-center">
            <button className="text-white hover:text-gray-200 focus:outline-none transition-colors px-3">
              <Settings className="w-[18px] h-[18px]" strokeWidth={2.5} />
            </button>
            <button 
              onClick={onClose} 
              className="bg-[#dc3545] hover:bg-[#c82333] h-full px-3 py-2.5 focus:outline-none transition-colors"
            >
              <X className="w-5 h-5 text-white" strokeWidth={3} />
            </button>
          </div>
        </div>

        {/* Body */}
        <div className="p-6 bg-white">
          <div className="flex flex-col gap-4">
            
            {/* Row 1: Party Name */}
            <div className="flex flex-col gap-1">
              <div className="flex items-center justify-between">
                <label className="text-[14px] font-bold text-gray-800">Party Name</label>
                <div className="flex flex-wrap items-center gap-2">
                  <div 
                    className={`w-[32px] h-[18px] rounded-full relative cursor-pointer transition-colors ${isActive ? 'bg-[#0d6efd]' : 'bg-gray-300'}`}
                    onClick={() => setIsActive(!isActive)}
                  >
                    <div className={`w-[14px] h-[14px] bg-white rounded-full absolute top-[2px] shadow-sm transition-transform ${isActive ? 'translate-x-[16px]' : 'translate-x-[2px]'}`}></div>
                  </div>
                  <span className="text-[13px] font-bold text-gray-800 select-none">Active</span>
                </div>
              </div>
              <input 
                type="text" 
                value={partyName}
                onChange={(e) => setPartyName(e.target.value)}
                placeholder="Enter Name"
                className="w-full border border-gray-300 bg-[#a6cdec] placeholder-gray-500 rounded-[3px] px-3 py-2 text-[14px] outline-none focus:border-[#4F46E5] font-bold"
              />
            </div>
            
            {/* Row 2: Mobile Number & City */}
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1 flex flex-col gap-1">
                <label className="text-[14px] font-bold text-gray-800">Mobile Number</label>
                <input 
                  type="text" 
                  value={mobileNumber}
                  onChange={(e) => setMobileNumber(e.target.value)}
                  placeholder="Hint - Better to use WhatsApp Number"
                  className="w-full border border-gray-300 bg-white placeholder-gray-400 rounded-[3px] px-3 py-2 text-[13px] outline-none focus:border-[#4F46E5]"
                />
              </div>
              <div className="flex-1 flex flex-col gap-1">
                <label className="text-[14px] font-bold text-gray-800">City</label>
                <input 
                  type="text"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  className="w-full border border-gray-300 bg-white placeholder-gray-400 rounded-[3px] px-3 py-2 text-[13px] outline-none focus:border-[#4F46E5] font-medium"
                />
              </div>
            </div>

            {/* Row 3: Four Toggles */}
            <div className="flex justify-between items-center mt-4 px-2 sm:px-10">
              <div className="flex flex-col items-center gap-2">
                <div 
                  className={`w-[32px] h-[18px] rounded-full relative cursor-pointer transition-colors ${toggles.moreInfo ? 'bg-[#0d6efd]' : 'bg-gray-300'}`}
                  onClick={() => toggleSwitch('moreInfo')}
                >
                  <div className={`w-[14px] h-[14px] bg-white rounded-full absolute top-[2px] shadow-sm transition-transform ${toggles.moreInfo ? 'translate-x-[16px]' : 'translate-x-[2px]'}`}></div>
                </div>
                <span className="text-[11px] font-bold text-gray-800">More Info</span>
              </div>
              <div className="flex flex-col items-center gap-2">
                <div 
                  className={`w-[32px] h-[18px] rounded-full relative cursor-pointer transition-colors ${toggles.wholeParty ? 'bg-[#0d6efd]' : 'bg-gray-300'}`}
                  onClick={() => toggleSwitch('wholeParty')}
                >
                  <div className={`w-[14px] h-[14px] bg-white rounded-full absolute top-[2px] shadow-sm transition-transform ${toggles.wholeParty ? 'translate-x-[16px]' : 'translate-x-[2px]'}`}></div>
                </div>
                <span className="text-[11px] font-bold text-gray-800">Whole Party</span>
              </div>
              <div className="flex flex-col items-center gap-2">
                <div 
                  className={`w-[32px] h-[18px] rounded-full relative cursor-pointer transition-colors ${toggles.sezParty ? 'bg-[#0d6efd]' : 'bg-gray-300'}`}
                  onClick={() => toggleSwitch('sezParty')}
                >
                  <div className={`w-[14px] h-[14px] bg-white rounded-full absolute top-[2px] shadow-sm transition-transform ${toggles.sezParty ? 'translate-x-[16px]' : 'translate-x-[2px]'}`}></div>
                </div>
                <span className="text-[11px] font-bold text-gray-800">SEZ Party</span>
              </div>
              <div className="flex flex-col items-center gap-2">
                <div 
                  className={`w-[32px] h-[18px] rounded-full relative cursor-pointer transition-colors ${toggles.focParty ? 'bg-[#0d6efd]' : 'bg-gray-300'}`}
                  onClick={() => toggleSwitch('focParty')}
                >
                  <div className={`w-[14px] h-[14px] bg-white rounded-full absolute top-[2px] shadow-sm transition-transform ${toggles.focParty ? 'translate-x-[16px]' : 'translate-x-[2px]'}`}></div>
                </div>
                <span className="text-[11px] font-bold text-gray-800">FOC Party</span>
              </div>
            </div>

          </div>
        </div>

        {/* Footer */}
        <div className="bg-white px-5 py-4 flex justify-end gap-2 border-t border-gray-100">
          <button className="bg-[#6c757d] hover:bg-[#5a6268] text-white px-3 py-[7px] rounded-[3px] transition-colors flex items-center justify-center">
            <ImageIcon className="w-[18px] h-[18px]" />
          </button>
          <button 
            onClick={handleSubmit}
            className="bg-[#28a745] hover:bg-[#218838] text-white px-4 py-[7px] rounded-[3px] text-[14px] font-medium transition-colors"
          >
            Submit
          </button>
          <button 
            onClick={onClose}
            className="bg-[#dc3545] hover:bg-[#c82333] text-white px-4 py-[7px] rounded-[3px] text-[14px] font-medium transition-colors"
          >
            Close
          </button>
        </div>

      </div>
    </div>
  );
}
