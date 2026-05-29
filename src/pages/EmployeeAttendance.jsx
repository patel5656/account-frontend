import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { X, Calendar, Plus } from 'lucide-react';

// Inline Youtube SVG
const YoutubeIcon = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M21.582,6.186c-0.23-0.86-0.908-1.538-1.768-1.768C18.254,4,12,4,12,4S5.746,4,4.186,4.418 c-0.86,0.23-1.538,0.908-1.768,1.768C2,7.746,2,12,2,12s0,4.254,0.418,5.814c0.23,0.86,0.908,1.538,1.768,1.768 C5.746,20,12,20,12,20s6.254,0,7.814-0.418c0.861-0.23,1.538-0.908,1.768-1.768C22,16.254,22,12,22,12S22,7.746,21.582,6.186z M10,15.464V8.536L16,12L10,15.464z" />
  </svg>
);

const days = [
  '1-May-26 (Fri)', '2-May-26 (Sat)', '3-May-26 (Sun)', '4-May-26 (Mon)', '5-May-26 (Tue)',
  '6-May-26 (Wed)', '7-May-26 (Thu)', '8-May-26 (Fri)', '9-May-26 (Sat)', '10-May-26 (Sun)',
  '11-May-26 (Mon)', '12-May-26 (Tue)', '13-May-26 (Wed)', '14-May-26 (Thu)', '15-May-26 (Fri)',
  '16-May-26 (Sat)', '17-May-26 (Sun)', '18-May-26 (Mon)', '19-May-26 (Tue)', '20-May-26 (Wed)',
  '21-May-26 (Thu)', '22-May-26 (Fri)', '23-May-26 (Sat)', '24-May-26 (Sun)', '25-May-26 (Mon)',
  '26-May-26 (Tue)', '27-May-26 (Wed)', '28-May-26 (Thu)', '29-May-26 (Fri)', '30-May-26 (Sat)',
  '31-May-26 (Sun)'
];

export function EmployeeAttendance() {
  const navigate = useNavigate();
  const [isEmployeeMasterOpen, setIsEmployeeMasterOpen] = useState(false);

  return (
    <div className="bg-[#f4f6f9] min-h-[calc(100vh-45px)] flex flex-col p-3">
      <div className="bg-white rounded shadow-sm border border-gray-200 flex-1 flex flex-col overflow-hidden relative">
        
        {/* Header */}
        <div className="bg-[#4F46E5] px-4 py-2 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <h2 className="text-white text-[16px] font-medium tracking-wide">Employee Attendance</h2>
          
          <div className="flex flex-wrap items-center gap-2">
            <button className="bg-white p-1 rounded-sm shadow-sm transition-colors">
              <YoutubeIcon className="w-5 h-5 text-[#ff0000]" />
            </button>
            <button 
              onClick={() => setIsEmployeeMasterOpen(true)}
              className="flex items-center gap-1 bg-[#28a745] hover:bg-[#218838] text-white px-2.5 py-1.5 rounded-[3px] text-[13px] font-medium transition-colors"
            >
              <Plus className="w-4 h-4" strokeWidth={3} />
              Create New
            </button>
            <button 
              onClick={() => navigate('/dashboard')}
              className="bg-[#dc3545] hover:bg-[#c82333] text-white p-1 rounded-[3px] transition-colors ml-1"
            >
              <X className="w-5 h-5 font-bold" strokeWidth={4} />
            </button>
          </div>
        </div>

        {/* Top Control Bar */}
        <div className="px-4 py-3 border-b border-gray-200">
          <div className="flex flex-col gap-1 w-[250px]">
             <label className="text-[13px] font-bold text-gray-800">Attendance Month</label>
             <div className="flex items-center border border-gray-300 rounded-[3px] overflow-hidden focus-within:border-[#4F46E5]">
                <input 
                  type="text" 
                  readOnly
                  value="May, 2026"
                  className="w-full h-[32px] px-2 text-[13px] outline-none text-gray-600 bg-white"
                />
                <div className="h-[32px] px-2 flex items-center justify-center text-gray-500 bg-white border-l border-gray-300">
                  <Calendar className="w-4 h-4" />
                </div>
             </div>
          </div>
        </div>

        {/* Data Table */}
        <div className="flex-1 overflow-auto pb-[60px]">
          <div className="min-w-full">
            {/* Table Header */}
            <div className="bg-[#343a40] text-white text-[13px] font-bold px-4 py-2.5">
              DATE
            </div>

            {/* Rows */}
            <div className="flex flex-col">
              {days.map((day, index) => (
                <div key={index} className="px-4 py-2 text-[13px] text-gray-700 border-b border-gray-200 hover:bg-gray-50">
                  {day}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer Go Back Button */}
        <div className="absolute bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-3 flex justify-end">
          <button 
            onClick={() => navigate(-1)}
            className="bg-[#007bff] hover:bg-[#0069d9] text-white text-[13px] font-medium px-4 py-1.5 rounded-[3px] flex items-center justify-center gap-1 transition-colors shadow-sm"
          >
            <span className="text-[16px] leading-none mt-[-2px]">&laquo;</span> Go back
          </button>
        </div>

      </div>

      {/* Employee Master Modal */}
      {isEmployeeMasterOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="bg-white rounded-[4px] shadow-xl w-full sm:max-w-[800px] flex flex-col overflow-hidden">
            {/* Modal Header */}
            <div className="bg-[#4F46E5] px-4 py-2 flex items-center justify-between">
              <h2 className="text-white text-[16px] font-medium">Employee Master</h2>
              <button 
                onClick={() => setIsEmployeeMasterOpen(false)}
                className="text-[#dc3545] hover:text-red-600 transition-colors"
              >
                <X className="w-6 h-6" strokeWidth={4} />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-4 flex flex-col gap-4">
              
              {/* Row 1: Employee Name */}
              <div className="flex flex-col gap-1">
                <div className="flex justify-between items-center px-1">
                  <label className="text-[13px] font-bold text-gray-800">Employee Name</label>
                  <div className="flex flex-wrap items-center gap-2">
                    <div className="w-[36px] h-[20px] bg-[#007bff] rounded-full relative cursor-pointer">
                      <div className="w-[14px] h-[14px] bg-white rounded-full absolute top-[3px] right-[3px]"></div>
                    </div>
                    <span className="text-[13px] font-bold text-gray-800">Active</span>
                  </div>
                </div>
                <input 
                  type="text" 
                  placeholder="Enter Employee Name" 
                  className="w-full bg-[#add8e6] border border-[#add8e6] text-gray-800 rounded-[3px] px-3 py-1.5 text-[14px] outline-none font-medium placeholder-gray-500"
                />
              </div>

              {/* Row 2: Mobile & City */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex flex-col gap-1">
                  <label className="text-[13px] font-bold text-gray-800 px-1">Mobile Number</label>
                  <input type="text" placeholder="Enter Mobile Number" className="w-full h-[32px] border border-gray-300 rounded-[3px] px-2 text-[13px] outline-none focus:border-[#4F46E5] placeholder-gray-400" />
                </div>
                <div className="flex flex-col gap-1">
                  <label className="text-[13px] font-bold text-gray-800 px-1">City</label>
                  <input type="text" placeholder="Enter City" className="w-full h-[32px] border border-gray-300 rounded-[3px] px-2 text-[13px] outline-none focus:border-[#4F46E5] placeholder-gray-400" />
                </div>
              </div>

              {/* Row 3: Joining Date, Designation, Salary */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="flex flex-col gap-1">
                  <label className="text-[13px] font-bold text-gray-800 px-1">Joining Date</label>
                  <div className="flex items-center border border-gray-300 rounded-[3px] overflow-hidden focus-within:border-[#4F46E5]">
                    <input type="text" readOnly value="23-05-2026" className="w-full h-[30px] px-2 text-[13px] outline-none text-gray-600 bg-white" />
                    <div className="h-[30px] px-2 flex items-center justify-center text-gray-800 bg-white border-l border-gray-300">
                      <Calendar className="w-4 h-4" />
                    </div>
                  </div>
                </div>
                <div className="flex flex-col gap-1">
                  <label className="text-[13px] font-bold text-gray-800 px-1">Designation</label>
                  <input type="text" placeholder="Enter Designation" className="w-full h-[32px] border border-gray-300 rounded-[3px] px-2 text-[13px] outline-none focus:border-[#4F46E5] placeholder-gray-400" />
                </div>
                <div className="flex flex-col gap-1">
                  <div className="flex justify-between items-center px-1">
                    <label className="text-[13px] font-bold text-gray-800">Salary</label>
                    <div className="flex flex-wrap items-center gap-1.5">
                      <span className="text-[12px] font-bold text-gray-800">Day</span>
                      <div className="w-[32px] h-[16px] bg-[#4F46E5] rounded-full relative cursor-pointer">
                        <div className="w-[12px] h-[12px] bg-gray-800 rounded-full absolute top-[2px] left-[2px]"></div>
                      </div>
                      <span className="text-[12px] text-gray-500">Month</span>
                    </div>
                  </div>
                  <input type="text" value="0" readOnly className="w-full h-[32px] border border-gray-300 rounded-[3px] px-2 text-[13px] outline-none focus:border-[#4F46E5] bg-white" />
                </div>
              </div>

              {/* Row 4: Paid Holiday, Commission, Special Commission */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="flex flex-col gap-1">
                  <label className="text-[13px] font-bold text-gray-800 px-1">Paid Holiday</label>
                  <input type="text" value="0" readOnly className="w-full h-[32px] border border-gray-300 rounded-[3px] px-2 text-[13px] outline-none focus:border-[#4F46E5] bg-white" />
                </div>
                <div className="flex flex-col gap-1">
                  <label className="text-[13px] font-bold text-gray-800 px-1">Commission</label>
                  <input type="text" value="0" readOnly className="w-full h-[32px] border border-gray-300 rounded-[3px] px-2 text-[13px] outline-none focus:border-[#4F46E5] bg-white" />
                </div>
                <div className="flex flex-col gap-1">
                  <label className="text-[13px] font-bold text-gray-800 px-1">Special Commission</label>
                  <input type="text" value="0" readOnly className="w-full h-[32px] border border-gray-300 rounded-[3px] px-2 text-[13px] outline-none focus:border-[#4F46E5] bg-white" />
                </div>
              </div>

              {/* Row 5: Total Sale Commission, Commission on Manufacturing */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="flex flex-col gap-1">
                  <label className="text-[13px] font-bold text-gray-800 px-1">Total Sale Commission</label>
                  <input type="text" value="0" readOnly className="w-full h-[32px] border border-gray-300 rounded-[3px] px-2 text-[13px] outline-none focus:border-[#4F46E5] bg-white" />
                </div>
                <div className="flex flex-col gap-1">
                  <label className="text-[13px] font-bold text-gray-800 px-1">Commision on Manufacturing</label>
                  <select className="w-full h-[32px] border border-gray-300 rounded-[3px] px-2 text-[13px] outline-none focus:border-[#4F46E5] bg-white text-gray-600">
                    <option>NO</option>
                    <option>YES</option>
                  </select>
                </div>
              </div>

            </div>

            {/* Modal Footer */}
            <div className="bg-[#f8f9fa] p-3 flex justify-end gap-2 border-t border-gray-200 mt-2">
              <button className="bg-[#28a745] hover:bg-[#218838] text-white px-4 py-1.5 rounded-[3px] text-[13px] font-medium transition-colors">
                Submit
              </button>
              <button 
                onClick={() => setIsEmployeeMasterOpen(false)}
                className="bg-[#dc3545] hover:bg-[#c82333] text-white px-4 py-1.5 rounded-[3px] text-[13px] font-medium transition-colors"
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
