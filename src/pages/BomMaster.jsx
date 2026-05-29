import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  X, 
  Plus, 
  RefreshCw
} from 'lucide-react';
import { BomMasterModal } from '../components/BomMasterModal';

export function BomMaster() {
  const navigate = useNavigate();
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  return (
    <div className="bg-[#f4f6f9] min-h-[calc(100vh-45px)] flex flex-col p-3 relative">
      <div className="bg-white rounded shadow-sm border border-gray-200 flex-1 flex flex-col overflow-hidden">
        
        {/* Header */}
        <div className="bg-[#4F46E5] px-4 py-2 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <h2 className="text-white text-[16px] font-medium tracking-wide">BOM Master Details</h2>
          
          <div className="flex flex-wrap items-center gap-2">
            <button className="flex items-center gap-1.5 bg-[#ffc107] hover:bg-[#e0a800] text-gray-900 px-3 py-1.5 rounded-[3px] text-[13px] font-bold transition-colors shadow-sm">
              <RefreshCw className="w-4 h-4" />
              Sync
            </button>
            <button 
              onClick={() => setIsAddModalOpen(true)}
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

        {/* Content Body */}
        <div className="p-4 bg-white flex-1 flex flex-col items-center">
          <div className="w-full mb-8">
            <input 
              type="text" 
              placeholder="Search BOM Name" 
              className="w-full min-w-0 border border-gray-300 rounded-[3px] px-3 py-2 text-[14px] outline-none bg-white text-gray-800 placeholder-gray-400"
            />
          </div>
          <div className="text-gray-500 text-[14px]">
            No BOM masters found.
          </div>
        </div>

      </div>

      <BomMasterModal 
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
      />
    </div>
  );
}
