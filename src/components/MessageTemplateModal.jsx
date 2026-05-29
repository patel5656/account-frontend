import React, { useState } from 'react';
import { createPortal } from 'react-dom';
import { X } from 'lucide-react';
import { cn } from '../utils';

export function MessageTemplateModal({ isOpen, onClose }) {
  const [platform, setPlatform] = useState('whatsapp');
  const [msgFormat, setMsgFormat] = useState('text');
  const [isActive, setIsActive] = useState(true);
  const [template, setTemplate] = useState('');

  if (!isOpen) return null;

  return createPortal(
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/40">
      <div className="bg-white w-[min(98vw,800px)] rounded-[3px] shadow-lg flex flex-col overflow-hidden relative">
        {/* Header */}
        <div className="bg-[#4F46E5] px-4 py-[6px] flex justify-between items-center text-white">
          <h2 className="text-[14.5px] font-medium tracking-wide">Message Template</h2>
          <button onClick={onClose} className="bg-[#dc3545] hover:bg-[#c82333] text-white px-2 py-[4px] rounded-[3px] flex items-center justify-center transition-colors">
            <X className="w-4 h-4" strokeWidth={3} />
          </button>
        </div>

        {/* Body */}
        <div className="flex flex-1 p-4 gap-6">
          {/* Left Form Area */}
          <div className="flex-1 flex flex-col gap-4">
            <div className="flex gap-4 items-center mt-2">
              <label className="flex items-center gap-2 cursor-pointer">
                <input 
                  type="radio" 
                  name="platform"
                  checked={platform === 'whatsapp'} 
                  onChange={() => setPlatform('whatsapp')}
                  className="w-3.5 h-3.5 accent-[#4F46E5]"
                />
                <span className="text-[13px] font-bold text-gray-800">WhatsApp</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input 
                  type="radio" 
                  name="platform"
                  checked={platform === 'sms'} 
                  onChange={() => setPlatform('sms')}
                  className="w-3.5 h-3.5 accent-[#4F46E5]"
                />
                <span className="text-[13px] font-bold text-gray-800">SMS</span>
              </label>
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-[13px] font-bold text-gray-900">TYPE :</label>
              <select className="w-full h-[32px] border border-gray-300 rounded-[3px] px-2 text-[13px] outline-none text-gray-400 bg-white focus:border-[#4F46E5]">
                <option>Select Type</option>
              </select>
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-[13px] font-bold text-gray-900">Message Format :</label>
              <div className="flex gap-4 items-center">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input 
                    type="radio" 
                    name="msgFormat"
                    checked={msgFormat === 'text'} 
                    onChange={() => setMsgFormat('text')}
                    className="w-3.5 h-3.5 accent-[#007bff]"
                  />
                  <span className="text-[13px] font-bold text-gray-800">Text Message</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input 
                    type="radio" 
                    name="msgFormat"
                    checked={msgFormat === 'button'} 
                    onChange={() => setMsgFormat('button')}
                    className="w-3.5 h-3.5 accent-[#007bff]"
                  />
                  <span className="text-[13px] font-bold text-gray-800">Button Message</span>
                </label>
              </div>
            </div>

            <div className="flex flex-col gap-1.5 flex-1 relative">
              <div className="flex justify-between items-center mb-1">
                <label className="text-[13px] font-bold text-gray-900">MSG TEMPLATE :</label>
                <div 
                  onClick={() => setIsActive(!isActive)}
                  className={cn(
                    "w-8 h-[18px] rounded-full relative cursor-pointer transition-colors duration-200 border",
                    isActive ? "bg-[#4F46E5] border-[#4F46E5]" : "bg-gray-300 border-gray-400"
                  )}
                >
                  <div className={cn(
                    "w-3.5 h-3.5 bg-white rounded-full absolute top-[1px] transition-all duration-200 shadow-sm",
                    isActive ? "right-[2px]" : "left-[2px]"
                  )}></div>
                </div>
              </div>
              <textarea 
                value={template}
                onChange={(e) => setTemplate(e.target.value)}
                className="w-full flex-1 min-h-[150px] border border-gray-300 rounded-[3px] p-2 text-[13px] outline-none text-gray-800 focus:border-[#4F46E5] resize-none"
              />
            </div>
          </div>

          {/* Right Preview Area */}
          <div className="w-[300px] flex flex-col pt-[70px]">
            <div className="w-full h-full min-h-[300px] border border-gray-800 bg-[#f8f9fa]">
              {/* Empty grey preview area as per screenshot */}
            </div>
          </div>
        </div>

        {/* Footer Buttons */}
        <div className="px-4 py-3 bg-[#f8f9fa] border-t border-gray-100 flex justify-end gap-2">
          <button className="bg-[#28a745] hover:bg-[#218838] text-white px-4 py-[5px] rounded-[3px] text-[13px] font-medium transition-colors">
            Save
          </button>
          <button onClick={onClose} className="bg-[#dc3545] hover:bg-[#c82333] text-white px-4 py-[5px] rounded-[3px] text-[13px] font-medium transition-colors">
            Close
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
}
