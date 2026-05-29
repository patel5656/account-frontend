import React, { useState } from 'react';
import { X, Settings, Image as ImageIcon } from 'lucide-react';

export function CategoryMasterModal({ isOpen, onClose }) {
  const [isActive, setIsActive] = useState(true);
  const [categoryName, setCategoryName] = useState('');
  const [fileName, setFileName] = useState('');
  const fileInputRef = React.useRef(null);

  const handleSubmit = () => {
    if (categoryName.trim() !== '') {
      window.dispatchEvent(new CustomEvent('categoryAdded', { 
        detail: { 
          id: Date.now(), 
          name: categoryName, 
        } 
      }));
    }
    setCategoryName('');
    setFileName('');
    setIsActive(true);
    onClose();
  };

  const handleDownload = () => {
    if (fileName) {
      alert(`Downloading ${fileName}...`);
    } else {
      alert('No image available to download.');
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/40">
      <div className="bg-white rounded-[3px] shadow-2xl w-full max-w-[min(92vw,500px)] flex flex-col overflow-hidden animate-in fade-in zoom-in duration-200">
        
        {/* Header */}
        <div className="bg-[#4F46E5] flex items-center justify-between">
          <h2 className="text-[15px] text-white font-medium tracking-wide pl-4 py-2.5">Category Master</h2>
          <div className="flex items-center">
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
            
            <div className="flex flex-col gap-1">
              <div className="flex items-center justify-between">
                <label className="text-[14px] font-bold text-gray-800">Category Name</label>
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
                value={categoryName}
                onChange={(e) => setCategoryName(e.target.value)}
                placeholder="Enter Category Name"
                className="w-full border border-gray-300 bg-[#a6cdec] placeholder-gray-500 rounded-[3px] px-3 py-2 text-[14px] outline-none focus:border-[#4F46E5] font-bold"
              />
            </div>

            <div className="grid grid-cols-2 gap-4 mt-2">
              <div className="flex flex-col gap-1">
                <label className="text-[14px] font-bold text-gray-800">Purchase Discount</label>
                <input 
                  type="text" 
                  defaultValue="0"
                  className="w-full border border-gray-300 rounded-[3px] px-3 py-[6px] text-[14px] outline-none focus:border-[#4F46E5]"
                />
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-[14px] font-bold text-gray-800">Sale Discount</label>
                <input 
                  type="text" 
                  defaultValue="0"
                  className="w-full border border-gray-300 rounded-[3px] px-3 py-[6px] text-[14px] outline-none focus:border-[#4F46E5]"
                />
              </div>
            </div>

            <div className="flex flex-col items-center mt-2">
              <div className="flex items-center justify-between w-[300px]">
                <label className="text-[16px] text-gray-800">Image</label>
                <div className="text-[#007bff] cursor-pointer" onClick={handleDownload}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16" className="stroke-current stroke-2">
                    <path d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5z"/>
                    <path d="M7.646 11.854a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 10.293V1.5a.5.5 0 0 0-1 0v8.793L5.354 8.146a.5.5 0 1 0-.708.708l3 3z"/>
                  </svg>
                </div>
              </div>
              <input 
                type="file" 
                ref={fileInputRef} 
                className="hidden" 
                onChange={(e) => setFileName(e.target.files[0]?.name || '')} 
                accept="image/*"
              />
              <div 
                className="w-[300px] h-[120px] border border-dashed border-gray-300 mt-1 flex flex-col items-center justify-center bg-white cursor-pointer hover:bg-gray-50 transition-colors"
                onClick={() => fileInputRef.current.click()}
              >
                {fileName ? (
                  <span className="text-[#28a745] text-[14px] font-bold">{fileName}</span>
                ) : (
                  <>
                    <span className="text-[#dca7a7] text-[14px]">Drag and drop or paste files here or</span>
                    <span className="text-[#007bff] text-[14px] font-bold">Browse..</span>
                  </>
                )}
              </div>
            </div>
            
          </div>
        </div>

        {/* Footer */}
        <div className="bg-[#f8f9fa] px-5 py-3 flex justify-end gap-2 border-t border-gray-200">
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
