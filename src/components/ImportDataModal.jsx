import React, { useState, useRef } from 'react';
import { X, FileDown } from 'lucide-react';

export function ImportDataModal({ isOpen, onClose }) {
  const [importFrom, setImportFrom] = useState('Excel (.xlsx)');
  const [selectedFile, setSelectedFile] = useState(null);
  const fileInputRef = useRef(null);

  if (!isOpen) return null;

  const getButtonText = () => {
    switch (importFrom) {
      case 'Tally': return 'Import from Tally';
      case 'Vyapar': return 'Import from Vyapar';
      case 'General Import': return 'Import Data';
      case 'Excel (.xlsx)': default: return 'Import from Excel';
    }
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const handleImport = () => {
    if (!selectedFile) {
      alert("Please browse and select a file first.");
      return;
    }
    alert(`Successfully imported data from ${selectedFile.name}`);
    setSelectedFile(null);
    onClose();
  };

  const handleClose = () => {
    setSelectedFile(null);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/40">
      <div className="bg-white rounded-[3px] shadow-xl w-full sm:max-w-[500px] flex flex-col overflow-hidden animate-in fade-in zoom-in duration-200">
        
        {/* Header */}
        <div className="bg-[#17a2b8] pl-4 pr-0 flex items-center justify-between h-[45px]">
          <h2 className="text-[15px] text-white font-medium">Import Data</h2>
          <button 
            onClick={handleClose}
            className="bg-[#dc3545] text-white h-full px-3.5 hover:bg-[#c82333] transition-colors flex items-center justify-center"
          >
            <X className="w-[18px] h-[18px]" strokeWidth={2.5} />
          </button>
        </div>

        {/* Body */}
        <div className="p-4 sm:p-5 flex-1 bg-white">
          
          <div className="mb-6">
            <label className="block text-[14px] font-bold text-gray-800 mb-2">Import From :</label>
            <select 
              value={importFrom}
              onChange={(e) => setImportFrom(e.target.value)}
              className="w-full border border-gray-300 rounded-[3px] px-3 py-[7px] text-[14px] text-gray-700 outline-none focus:border-[#17a2b8] focus:ring-[3px] focus:ring-[#17a2b8]/20 transition-all cursor-pointer"
            >
              <option value="General Import">General Import</option>
              <option value="Tally">Tally</option>
              <option value="Vyapar">Vyapar</option>
              <option value="Excel (.xlsx)">Excel (.xlsx)</option>
            </select>
          </div>

          <div className="flex border border-gray-300 rounded-[3px] overflow-hidden mb-2">
            <div className="flex-1 px-3 py-[7px] text-[14px] text-gray-500 bg-white border-r border-gray-300 flex items-center truncate">
              {selectedFile ? selectedFile.name : 'Select Import File (File Type : CSV)'}
            </div>
            <input 
              type="file" 
              ref={fileInputRef} 
              onChange={handleFileChange} 
              className="hidden" 
              accept=".csv,.xlsx,.xls" 
            />
            <button 
              onClick={() => fileInputRef.current?.click()}
              className="bg-[#e9ecef] border-l border-gray-300 px-4 py-[7px] text-[14px] text-gray-700 hover:bg-[#dde2e6] transition-colors cursor-pointer"
            >
              Browse
            </button>
          </div>

        </div>

        {/* Footer */}
        <div className="bg-[#f8f9fa] border-t border-gray-200 px-4 py-3 sm:px-5">
          <button 
            onClick={handleImport}
            className="flex items-center gap-1.5 bg-[#17a2b8] hover:bg-[#138496] text-white px-3 py-1.5 rounded-[3px] text-[14px] transition-colors shadow-sm focus:ring-[3px] focus:ring-[#17a2b8]/50 outline-none"
          >
            <FileDown className="w-[14px] h-[14px]" strokeWidth={2.5} />
            {getButtonText()}
          </button>
        </div>

      </div>
    </div>
  );
}
