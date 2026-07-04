import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { X, Calendar, Plus } from 'lucide-react';
import apiClient from '../api/apiClient';

// Inline Youtube SVG
const YoutubeIcon = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M21.582,6.186c-0.23-0.86-0.908-1.538-1.768-1.768C18.254,4,12,4,12,4S5.746,4,4.186,4.418 c-0.86,0.23-1.538,0.908-1.768,1.768C2,7.746,2,12,2,12s0,4.254,0.418,5.814c0.23,0.86,0.908,1.538,1.768,1.768 C5.746,20,12,20,12,20s6.254,0,7.814-0.418c0.861-0.23,1.538-0.908,1.768-1.768C22,16.254,22,12,22,12S22,7.746,21.582,6.186z M10,15.464V8.536L16,12L10,15.464z" />
  </svg>
);

export function EmployeeAttendance() {
  const navigate = useNavigate();
  const [isEmployeeMasterOpen, setIsEmployeeMasterOpen] = useState(false);
  const [selectedMonth, setSelectedMonth] = useState(() => {
    const d = new Date();
    return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`;
  });
  const monthInputRef = useRef(null);

  const [employees, setEmployees] = useState([]);
  const [attendances, setAttendances] = useState([]);

  // Form State
  const [formData, setFormData] = useState({
    name: '', mobile: '', city: '', joiningDate: '', designation: '',
    salaryType: 'Month', salary: 0, paidHoliday: 0, commission: 0,
    specialCommission: 0, totalSaleCommission: 0, commissionOnManufacturing: 0, isActive: true
  });

  const fetchData = async () => {
    try {
      const empRes = await apiClient.get('/employees');
      if (empRes.data.success) {
        setEmployees(empRes.data.data);
      }
      
      const attRes = await apiClient.get(`/employees/attendance/month?month=${selectedMonth}`);
      if (attRes.data.success) {
        setAttendances(attRes.data.data);
      }
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchData();
  }, [selectedMonth]);

  const getDaysInMonth = (monthStr) => {
    if (!monthStr) return [];
    const [yearStr, monthStrPart] = monthStr.split('-');
    const year = parseInt(yearStr);
    const monthIndex = parseInt(monthStrPart) - 1;
    
    const date = new Date(year, monthIndex, 1);
    const daysArray = [];
    
    while (date.getMonth() === monthIndex) {
      const dayNum = date.getDate();
      const monthName = date.toLocaleString('default', { month: 'short' });
      const yearShort = String(date.getFullYear()).slice(-2);
      const dayOfWeek = date.toLocaleString('default', { weekday: 'short' });
      
      const isoDate = new Date(year, monthIndex, dayNum, 12, 0, 0).toISOString();

      daysArray.push({
        display: `${dayNum}-${monthName}-${yearShort} (${dayOfWeek})`,
        iso: isoDate
      });
      date.setDate(date.getDate() + 1);
    }
    return daysArray;
  };

  const formatMonthDisplay = (monthStr) => {
    if (!monthStr) return '';
    const [year, month] = monthStr.split('-');
    const date = new Date(year, parseInt(month) - 1, 1);
    const monthName = date.toLocaleString('default', { month: 'long' });
    return `${monthName}, ${year}`;
  };

  const handleCalendarClick = () => {
    if (monthInputRef.current) {
      if (typeof monthInputRef.current.showPicker === 'function') {
        monthInputRef.current.showPicker();
      } else {
        monthInputRef.current.click();
      }
    }
  };

  const days = getDaysInMonth(selectedMonth);

  const getAttendanceStatus = (empId, dateIso) => {
    const d1 = dateIso.substring(0, 10);
    const att = attendances.find(a => a.employeeId === empId && a.date.substring(0, 10) === d1);
    return att ? att.status : '';
  };

  const handleMarkAttendance = async (employeeId, dateIso, status) => {
    if (!status) return;
    try {
      await apiClient.post('/employees/attendance/mark', {
        employeeId,
        date: dateIso,
        status
      });
      fetchData();
    } catch (err) {
      console.error(err);
    }
  };

  const handleCreateEmployee = async () => {
    if (!formData.name) return alert('Employee Name is required');
    try {
      const res = await apiClient.post('/employees', formData);
      if (res.data.success) {
        setIsEmployeeMasterOpen(false);
        setFormData({
          name: '', mobile: '', city: '', joiningDate: '', designation: '',
          salaryType: 'Month', salary: 0, paidHoliday: 0, commission: 0,
          specialCommission: 0, totalSaleCommission: 0, commissionOnManufacturing: 0, isActive: true
        });
        fetchData();
      }
    } catch (err) {
      console.error(err);
    }
  };

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
             <div 
               onClick={handleCalendarClick}
               className="flex items-center border border-gray-300 rounded-[3px] overflow-hidden focus-within:border-[#4F46E5] cursor-pointer"
             >
                <input 
                  type="text" 
                  readOnly
                  value={formatMonthDisplay(selectedMonth)}
                  className="w-full h-[32px] px-2 text-[13px] outline-none text-gray-600 bg-white cursor-pointer"
                />
                <input 
                  type="month"
                  ref={monthInputRef}
                  value={selectedMonth}
                  onChange={(e) => {
                    if (e.target.value) {
                      setSelectedMonth(e.target.value);
                    }
                  }}
                  className="absolute opacity-0 pointer-events-none"
                  style={{ width: 0, height: 0 }}
                />
                <button 
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleCalendarClick();
                  }}
                  className="h-[32px] px-2 flex items-center justify-center text-gray-500 bg-white border-l border-gray-300 hover:bg-gray-50"
                >
                  <Calendar className="w-4 h-4" />
                </button>
             </div>
          </div>
        </div>

        {/* Data Table */}
        <div className="flex-1 overflow-auto pb-[60px]">
          <div className="min-w-full inline-block align-middle">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-[#343a40]">
                <tr>
                  <th scope="col" className="px-4 py-2.5 text-left text-[13px] font-bold text-white uppercase tracking-wider sticky left-0 z-10 bg-[#343a40]">
                    DATE
                  </th>
                  {employees.map(emp => (
                    <th key={emp.id} scope="col" className="px-4 py-2.5 text-center text-[13px] font-bold text-white uppercase tracking-wider min-w-[120px]">
                      {emp.name}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {days.map((day, index) => (
                  <tr key={index} className="hover:bg-gray-50 transition-colors">
                    <td className="px-4 py-2 text-[13px] text-gray-700 whitespace-nowrap sticky left-0 z-10 bg-white shadow-[1px_0_0_0_#e5e7eb]">
                      {day.display}
                    </td>
                    {employees.map(emp => (
                      <td key={emp.id} className="px-4 py-2 whitespace-nowrap text-center">
                        <select 
                          className={`text-[12px] border border-gray-300 rounded px-2 py-1 outline-none font-medium focus:border-[#4F46E5] ${
                            getAttendanceStatus(emp.id, day.iso) === 'Present' ? 'bg-green-50 text-green-700' :
                            getAttendanceStatus(emp.id, day.iso) === 'Absent' ? 'bg-red-50 text-red-700' :
                            getAttendanceStatus(emp.id, day.iso) === 'Half-Day' ? 'bg-yellow-50 text-yellow-700' :
                            getAttendanceStatus(emp.id, day.iso) === 'Leave' ? 'bg-blue-50 text-blue-700' :
                            'bg-white text-gray-600'
                          }`}
                          value={getAttendanceStatus(emp.id, day.iso)}
                          onChange={(e) => handleMarkAttendance(emp.id, day.iso, e.target.value)}
                        >
                          <option value="">- Select -</option>
                          <option value="Present">Present</option>
                          <option value="Absent">Absent</option>
                          <option value="Half-Day">Half-Day</option>
                          <option value="Leave">Leave</option>
                        </select>
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Footer Go Back Button */}
        <div className="absolute bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-3 flex justify-end shadow-[0_-2px_10px_rgba(0,0,0,0.05)]">
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
                  <label className="text-[13px] font-bold text-gray-800">Employee Name *</label>
                  <div className="flex flex-wrap items-center gap-2">
                    <div 
                      className={`w-[36px] h-[20px] rounded-full relative cursor-pointer ${formData.isActive ? 'bg-[#007bff]' : 'bg-gray-400'}`}
                      onClick={() => setFormData({...formData, isActive: !formData.isActive})}
                    >
                      <div className={`w-[14px] h-[14px] bg-white rounded-full absolute top-[3px] transition-all ${formData.isActive ? 'right-[3px]' : 'left-[3px]'}`}></div>
                    </div>
                    <span className="text-[13px] font-bold text-gray-800">{formData.isActive ? 'Active' : 'Inactive'}</span>
                  </div>
                </div>
                <input 
                  type="text" 
                  value={formData.name}
                  onChange={e => setFormData({...formData, name: e.target.value})}
                  placeholder="Enter Employee Name" 
                  className="w-full bg-[#add8e6] border border-[#add8e6] text-gray-800 rounded-[3px] px-3 py-1.5 text-[14px] outline-none font-medium placeholder-gray-600 focus:border-[#4F46E5]"
                />
              </div>

              {/* Row 2: Mobile & City */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex flex-col gap-1">
                  <label className="text-[13px] font-bold text-gray-800 px-1">Mobile Number</label>
                  <input type="text" value={formData.mobile} onChange={e => setFormData({...formData, mobile: e.target.value})} placeholder="Enter Mobile Number" className="w-full h-[32px] border border-gray-300 rounded-[3px] px-2 text-[13px] outline-none focus:border-[#4F46E5] placeholder-gray-400" />
                </div>
                <div className="flex flex-col gap-1">
                  <label className="text-[13px] font-bold text-gray-800 px-1">City</label>
                  <input type="text" value={formData.city} onChange={e => setFormData({...formData, city: e.target.value})} placeholder="Enter City" className="w-full h-[32px] border border-gray-300 rounded-[3px] px-2 text-[13px] outline-none focus:border-[#4F46E5] placeholder-gray-400" />
                </div>
              </div>

              {/* Row 3: Joining Date, Designation, Salary */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="flex flex-col gap-1">
                  <label className="text-[13px] font-bold text-gray-800 px-1">Joining Date</label>
                  <div className="flex items-center border border-gray-300 rounded-[3px] overflow-hidden focus-within:border-[#4F46E5]">
                    <input type="date" value={formData.joiningDate} onChange={e => setFormData({...formData, joiningDate: e.target.value})} className="w-full h-[30px] px-2 text-[13px] outline-none text-gray-600 bg-white" />
                  </div>
                </div>
                <div className="flex flex-col gap-1">
                  <label className="text-[13px] font-bold text-gray-800 px-1">Designation</label>
                  <input type="text" value={formData.designation} onChange={e => setFormData({...formData, designation: e.target.value})} placeholder="Enter Designation" className="w-full h-[32px] border border-gray-300 rounded-[3px] px-2 text-[13px] outline-none focus:border-[#4F46E5] placeholder-gray-400" />
                </div>
                <div className="flex flex-col gap-1">
                  <div className="flex justify-between items-center px-1">
                    <label className="text-[13px] font-bold text-gray-800">Salary</label>
                    <div className="flex flex-wrap items-center gap-1.5">
                      <span className="text-[12px] font-bold text-gray-800">Day</span>
                      <div 
                        className="w-[32px] h-[16px] bg-[#4F46E5] rounded-full relative cursor-pointer"
                        onClick={() => setFormData({...formData, salaryType: formData.salaryType === 'Month' ? 'Day' : 'Month'})}
                      >
                        <div className={`w-[12px] h-[12px] bg-white rounded-full absolute top-[2px] transition-all ${formData.salaryType === 'Month' ? 'right-[2px]' : 'left-[2px]'}`}></div>
                      </div>
                      <span className="text-[12px] text-gray-500">Month</span>
                    </div>
                  </div>
                  <input type="number" value={formData.salary} onChange={e => setFormData({...formData, salary: e.target.value})} className="w-full h-[32px] border border-gray-300 rounded-[3px] px-2 text-[13px] outline-none focus:border-[#4F46E5] bg-white" />
                </div>
              </div>

              {/* Row 4: Paid Holiday, Commission, Special Commission */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="flex flex-col gap-1">
                  <label className="text-[13px] font-bold text-gray-800 px-1">Paid Holiday</label>
                  <input type="number" value={formData.paidHoliday} onChange={e => setFormData({...formData, paidHoliday: e.target.value})} className="w-full h-[32px] border border-gray-300 rounded-[3px] px-2 text-[13px] outline-none focus:border-[#4F46E5] bg-white" />
                </div>
                <div className="flex flex-col gap-1">
                  <label className="text-[13px] font-bold text-gray-800 px-1">Commission</label>
                  <input type="number" value={formData.commission} onChange={e => setFormData({...formData, commission: e.target.value})} className="w-full h-[32px] border border-gray-300 rounded-[3px] px-2 text-[13px] outline-none focus:border-[#4F46E5] bg-white" />
                </div>
                <div className="flex flex-col gap-1">
                  <label className="text-[13px] font-bold text-gray-800 px-1">Special Commission</label>
                  <input type="number" value={formData.specialCommission} onChange={e => setFormData({...formData, specialCommission: e.target.value})} className="w-full h-[32px] border border-gray-300 rounded-[3px] px-2 text-[13px] outline-none focus:border-[#4F46E5] bg-white" />
                </div>
              </div>

              {/* Row 5: Total Sale Commission, Commission on Manufacturing */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="flex flex-col gap-1">
                  <label className="text-[13px] font-bold text-gray-800 px-1">Total Sale Commission</label>
                  <input type="number" value={formData.totalSaleCommission} onChange={e => setFormData({...formData, totalSaleCommission: e.target.value})} className="w-full h-[32px] border border-gray-300 rounded-[3px] px-2 text-[13px] outline-none focus:border-[#4F46E5] bg-white" />
                </div>
                <div className="flex flex-col gap-1">
                  <label className="text-[13px] font-bold text-gray-800 px-1">Commision on Manufacturing (%)</label>
                  <input type="number" value={formData.commissionOnManufacturing} onChange={e => setFormData({...formData, commissionOnManufacturing: e.target.value})} className="w-full h-[32px] border border-gray-300 rounded-[3px] px-2 text-[13px] outline-none focus:border-[#4F46E5] bg-white" />
                </div>
              </div>

            </div>

            {/* Modal Footer */}
            <div className="bg-[#f8f9fa] p-3 flex justify-end gap-2 border-t border-gray-200 mt-2">
              <button 
                onClick={handleCreateEmployee}
                className="bg-[#28a745] hover:bg-[#218838] text-white px-4 py-1.5 rounded-[3px] text-[13px] font-medium transition-colors"
              >
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
