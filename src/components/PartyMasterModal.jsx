import React, { useState } from 'react';
import { X, Settings, Image as ImageIcon } from 'lucide-react';

export function PartyMasterModal({ isOpen, onClose, defaultType = 'COMPANY' }) {
  const [isActive, setIsActive] = useState(true);
  const [partyName, setPartyName] = useState('');
  const [dueDays, setDueDays] = useState('7');
  const [mobileNumber, setMobileNumber] = useState('');
  const [city, setCity] = useState('');
  const [partyTags, setPartyTags] = useState('');
  const [drugLicense, setDrugLicense] = useState('');
  const [address, setAddress] = useState('');
  const [pinCode, setPinCode] = useState('');
  const [gstin, setGstin] = useState('');
  const [gstApplicable, setGstApplicable] = useState('GST');
  const [stateName, setStateName] = useState('Karnataka');
  const [emailAddress, setEmailAddress] = useState('');
  const [partyType, setPartyType] = useState('company');
  const [otherMobileNo, setOtherMobileNo] = useState('');
  const [partyLimit, setPartyLimit] = useState('0');
  const [interestRate, setInterestRate] = useState('0');
  const [loyaltyPoints, setLoyaltyPoints] = useState('0');
  const [joiningDate, setJoiningDate] = useState('2026-06-04');
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
          balance: 0,
          address,
          pinCode,
          gstin,
          gstApplicable,
          state: stateName,
          emailAddress,
          partyType,
          otherMobileNo,
          partyLimit,
          interestRate,
          loyaltyPoints,
          joiningDate
        } 
      }));
    }
    setPartyName('');
    setDueDays('7');
    setMobileNumber('');
    setCity('');
    setPartyTags('');
    setDrugLicense('');
    setAddress('');
    setPinCode('');
    setGstin('');
    setGstApplicable('GST');
    setStateName('Karnataka');
    setEmailAddress('');
    setPartyType('company');
    setOtherMobileNo('');
    setPartyLimit('0');
    setInterestRate('0');
    setLoyaltyPoints('0');
    setJoiningDate('2026-06-04');
    setIsActive(true);
    setToggles({ moreInfo: false, wholeParty: false, sezParty: false, focParty: false });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/40">
      <div className="bg-white rounded-[3px] shadow-2xl w-full sm:max-w-[750px] flex flex-col overflow-hidden animate-in fade-in zoom-in duration-200">
        
        {/* Header */}
        <div className="bg-[#17a2b8] flex items-center justify-between">
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
            
            {/* Row 1: Party Name, Active, Due Days */}
            <div className="flex flex-col gap-1">
              <div className="flex items-center justify-between">
                <label className="text-[14px] font-bold text-gray-800">Party Name</label>
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    <div 
                      className={`w-[32px] h-[18px] rounded-full relative cursor-pointer transition-colors ${isActive ? 'bg-[#0d6efd]' : 'bg-gray-300'}`}
                      onClick={() => setIsActive(!isActive)}
                    >
                      <div className={`w-[14px] h-[14px] bg-white rounded-full absolute top-[2px] shadow-sm transition-transform ${isActive ? 'translate-x-[16px]' : 'translate-x-[2px]'}`}></div>
                    </div>
                    <span className="text-[13px] font-bold text-gray-800 select-none">Active</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-[13px] font-bold text-gray-800">Due Days</span>
                    <input 
                      type="text" 
                      value={dueDays}
                      onChange={(e) => setDueDays(e.target.value)}
                      className="w-[60px] border border-gray-300 rounded-[3px] px-2 py-1 text-[13px] outline-none focus:border-[#4F46E5] text-center"
                    />
                  </div>
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
              <div className="flex-1 flex flex-col gap-1 relative">
                <label className="text-[14px] font-bold text-gray-800">City</label>
                <div className="relative">
                  <select
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className="w-full border border-gray-300 bg-white rounded-[3px] px-3 py-2 text-[13px] outline-none focus:border-[#4F46E5] appearance-none"
                  >
                    <option value=""></option>
                    <option value="Delhi">Delhi</option>
                    <option value="Mumbai">Mumbai</option>
                  </select>
                  <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                    <X className="w-3 h-3 text-gray-400 mr-1" />
                    <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                  </div>
                </div>
              </div>
            </div>

            {/* Row 3: Party Tags */}
            <div className="flex flex-col gap-1 relative">
              <label className="text-[14px] font-bold text-gray-800">Party Tags</label>
              <div className="relative">
                <select
                  value={partyTags}
                  onChange={(e) => setPartyTags(e.target.value)}
                  className="w-full border border-gray-300 bg-white placeholder-gray-400 rounded-[3px] px-3 py-2 text-[13px] outline-none focus:border-[#4F46E5] appearance-none"
                >
                  <option value="">Enter Tags</option>
                  <option value="Tag 1">Tag 1</option>
                  <option value="Tag 2">Tag 2</option>
                </select>
                <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                  <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                </div>
              </div>
            </div>

            {/* Row 5: Four Toggles */}
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

            {/* Conditional More Info Fields */}
            {toggles.moreInfo && (
              <>
                {/* Address */}
                <div className="flex flex-col gap-1">
                  <label className="text-[14px] font-bold text-gray-800">Address</label>
                  <input 
                    type="text" 
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    placeholder="Enter Full Address"
                    className="w-full border border-gray-300 bg-[#a6cdec] placeholder-gray-500 rounded-[3px] px-3 py-2 text-[14px] outline-none focus:border-[#4F46E5] font-bold"
                  />
                </div>

                {/* Pin Code, Gstin, Gst Applicable */}
                <div className="grid grid-cols-[1.2fr_2fr_1.2fr] gap-4">
                  <div className="flex flex-col gap-1">
                    <label className="text-[14px] font-bold text-gray-800">Pin Code</label>
                    <input 
                      type="text" 
                      value={pinCode}
                      onChange={(e) => setPinCode(e.target.value)}
                      placeholder="Enter Pin Code"
                      className="w-full border border-gray-300 bg-white placeholder-gray-400 rounded-[3px] px-3 py-2 text-[13px] outline-none focus:border-[#4F46E5]"
                    />
                  </div>
                  <div className="flex flex-col gap-1">
                    <label className="text-[14px] font-bold text-gray-800">Gstin</label>
                    <input 
                      type="text" 
                      value={gstin}
                      onChange={(e) => setGstin(e.target.value)}
                      placeholder="Enter Gst Number"
                      className="w-full border border-gray-300 bg-white placeholder-gray-400 rounded-[3px] px-3 py-2 text-[13px] outline-none focus:border-[#4F46E5]"
                    />
                  </div>
                  <div className="flex flex-col gap-1 relative">
                    <label className="text-[14px] font-bold text-gray-800">Gst Applicable</label>
                    <div className="relative">
                      <select
                        value={gstApplicable}
                        onChange={(e) => setGstApplicable(e.target.value)}
                        className="w-full border border-gray-300 bg-white rounded-[3px] px-3 py-2 text-[13px] outline-none focus:border-[#4F46E5] appearance-none"
                      >
                        <option value="GST">GST</option>
                        <option value="COMPOSITION">COMPOSITION</option>
                        <option value="UNREGISTERED">UNREGISTERED</option>
                        <option value="CONSUMER">CONSUMER</option>
                      </select>
                      <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                        <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                      </div>
                    </div>
                  </div>
                </div>

                {/* State, Email Address, Party Type */}
                <div className="grid grid-cols-[1.2fr_2fr_1.2fr] gap-4">
                  <div className="flex flex-col gap-1 relative">
                    <label className="text-[14px] font-bold text-gray-800">State</label>
                    <div className="relative">
                      <select
                        value={stateName}
                        onChange={(e) => setStateName(e.target.value)}
                        className="w-full border border-gray-300 bg-white rounded-[3px] px-3 py-2 text-[13px] outline-none focus:border-[#4F46E5] appearance-none"
                      >
                        <option value="Karnataka">Karnataka</option>
                        <option value="Delhi">Delhi</option>
                        <option value="Maharashtra">Maharashtra</option>
                        <option value="Uttar Pradesh">Uttar Pradesh</option>
                        <option value="Gujarat">Gujarat</option>
                      </select>
                      <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                        <X 
                          className="w-3 h-3 text-gray-400 mr-1 cursor-pointer pointer-events-auto" 
                          onClick={() => setStateName('')} 
                        />
                        <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col gap-1">
                    <label className="text-[14px] font-bold text-gray-800">Email Address</label>
                    <input 
                      type="text" 
                      value={emailAddress}
                      onChange={(e) => setEmailAddress(e.target.value)}
                      placeholder="Enter Email Address"
                      className="w-full border border-gray-300 bg-white placeholder-gray-400 rounded-[3px] px-3 py-2 text-[13px] outline-none focus:border-[#4F46E5]"
                    />
                  </div>
                  <div className="flex flex-col gap-1 relative">
                    <label className="text-[14px] font-bold text-gray-800">Party Type</label>
                    <div className="relative">
                      <select
                        value={partyType}
                        onChange={(e) => setPartyType(e.target.value)}
                        className="w-full border border-gray-300 bg-white rounded-[3px] px-3 py-2 text-[13px] outline-none focus:border-[#4F46E5] appearance-none"
                      >
                        <option value="company">company</option>
                        <option value="retailer">retailer</option>
                        <option value="distributor">distributor</option>
                      </select>
                      <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                        <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Other Mobile No, Party Limit, Interest Rate/Month, Loyalty Points */}
                <div className="grid grid-cols-[1.2fr_1fr_1fr_1.2fr] gap-4">
                  <div className="flex flex-col gap-1">
                    <label className="text-[14px] font-bold text-gray-800">Other Mobile No</label>
                    <input 
                      type="text" 
                      value={otherMobileNo}
                      onChange={(e) => setOtherMobileNo(e.target.value)}
                      placeholder="Enter Other Mobile"
                      className="w-full border border-gray-300 bg-white placeholder-gray-400 rounded-[3px] px-3 py-2 text-[13px] outline-none focus:border-[#4F46E5]"
                    />
                  </div>
                  <div className="flex flex-col gap-1">
                    <label className="text-[14px] font-bold text-gray-800">Party Limit</label>
                    <input 
                      type="text" 
                      value={partyLimit}
                      onChange={(e) => setPartyLimit(e.target.value)}
                      className="w-full border border-gray-300 bg-white rounded-[3px] px-3 py-2 text-[13px] outline-none focus:border-[#4F46E5]"
                    />
                  </div>
                  <div className="flex flex-col gap-1">
                    <label className="text-[14px] font-bold text-gray-800">Interest Rate/Month</label>
                    <input 
                      type="text" 
                      value={interestRate}
                      onChange={(e) => setInterestRate(e.target.value)}
                      className="w-full border border-gray-300 bg-white rounded-[3px] px-3 py-2 text-[13px] outline-none focus:border-[#4F46E5]"
                    />
                  </div>
                  <div className="flex flex-col gap-1">
                    <label className="text-[14px] font-bold text-gray-800">Loyalty Points</label>
                    <input 
                      type="text" 
                      value={loyaltyPoints}
                      onChange={(e) => setLoyaltyPoints(e.target.value)}
                      className="w-full border border-gray-300 bg-white rounded-[3px] px-3 py-2 text-[13px] outline-none focus:border-[#4F46E5]"
                    />
                  </div>
                </div>

                {/* Joining Date */}
                <div className="grid grid-cols-[1.2fr_2fr_1.2fr] gap-4">
                  <div className="flex flex-col gap-1">
                    <label className="text-[14px] font-bold text-gray-800">Joining Date</label>
                    <div className="relative">
                      <input 
                        type="date" 
                        value={joiningDate}
                        onChange={(e) => setJoiningDate(e.target.value)}
                        className="w-full border border-gray-300 rounded-[3px] px-3 py-1.5 text-[14px] outline-none focus:border-[#4F46E5] text-gray-700 bg-white"
                      />
                    </div>
                  </div>
                  <div></div>
                  <div></div>
                </div>
              </>
            )}

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
