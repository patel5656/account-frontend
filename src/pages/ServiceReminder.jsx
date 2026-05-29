import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Search, X, Calendar, Plus, MoreVertical, 
  Check, Bell, MessageCircle, Mail, Clock, 
  Edit, Trash2, Smartphone, Send
} from 'lucide-react';

export function ServiceReminder() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('payment'); // 'payment' | 'service'
  const [isLeftToggled, setIsLeftToggled] = useState(true);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [activeActionMenu, setActiveActionMenu] = useState(null); // id of reminder for dropdown

  // Mock Data
  const paymentReminders = [
    { id: 1, name: 'John Doe', type: 'Customer', invoiceNo: 'INV-1023', dueAmount: '5,000.00', dueDate: '25-05-2026', pendingBalance: '5,000.00', status: 'Pending' },
    { id: 2, name: 'ABC Suppliers', type: 'Supplier', invoiceNo: 'SUP-405', dueAmount: '12,500.00', dueDate: '20-05-2026', pendingBalance: '0.00', status: 'Completed' },
    { id: 3, name: 'Jane Smith', type: 'EMI', invoiceNo: 'EMI-002', dueAmount: '2,000.00', dueDate: '30-05-2026', pendingBalance: '10,000.00', status: 'Upcoming' },
  ];

  const serviceReminders = [
    { id: 4, serviceName: 'AC Maintenance', customerName: 'Tech Corp', serviceDate: '15-05-2026', nextServiceDate: '15-11-2026', reminderDate: '10-11-2026', status: 'Pending', notes: 'Quarterly checkup' },
    { id: 5, serviceName: 'Warranty Expiry', customerName: 'Rahul Verma', serviceDate: '20-05-2025', nextServiceDate: '20-05-2026', reminderDate: '15-05-2026', status: 'Overdue', notes: '1 yr hardware warranty' },
  ];

  const getStatusColor = (status) => {
    switch(status.toLowerCase()) {
      case 'completed': return 'bg-green-100 text-green-700';
      case 'overdue': return 'bg-red-100 text-red-700';
      case 'upcoming': return 'bg-blue-100 text-blue-700';
      default: return 'bg-yellow-100 text-yellow-700';
    }
  };

  const toggleActionMenu = (id) => {
    if (activeActionMenu === id) setActiveActionMenu(null);
    else setActiveActionMenu(id);
  };

  return (
    <div className="bg-[#f4f6f9] min-h-[calc(100vh-60px)] flex flex-col relative" onClick={() => activeActionMenu && setActiveActionMenu(null)}>
      {/* Top Teal Bar */}
      <div className="bg-[#4F46E5] px-4 py-[6px] flex justify-between items-center text-white shadow-sm">
        <h2 className="text-[14.5px] font-medium tracking-wide">Reminder Management</h2>
        <button 
          onClick={() => navigate(-1)}
          className="bg-[#dc3545] hover:bg-[#c82333] text-white px-2.5 py-[6px] rounded-[3px] flex items-center justify-center transition-colors"
        >
          <X className="w-[14px] h-[14px]" strokeWidth={3} />
        </button>
      </div>

      {/* Tabs */}
      <div className="bg-white border-b border-gray-200 px-4 flex gap-6 pt-2">
        <button 
          onClick={() => setActiveTab('payment')}
          className={`pb-2 text-[13.5px] font-medium border-b-2 transition-colors ${activeTab === 'payment' ? 'border-[#4F46E5] text-[#4F46E5]' : 'border-transparent text-gray-500 hover:text-gray-700'}`}
        >
          Payment Reminders
        </button>
        <button 
          onClick={() => setActiveTab('service')}
          className={`pb-2 text-[13.5px] font-medium border-b-2 transition-colors ${activeTab === 'service' ? 'border-[#4F46E5] text-[#4F46E5]' : 'border-transparent text-gray-500 hover:text-gray-700'}`}
        >
          Service Reminders
        </button>
      </div>

      {/* Filters Row */}
      <div className="px-4 py-2.5 border-b border-gray-200 flex flex-wrap items-center justify-between gap-4 bg-white shadow-sm">
        <div className="flex flex-wrap items-center gap-3 flex-1">
          <div className="text-[#007bff]">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="#007bff" xmlns="http://www.w3.org/2000/svg">
              <path d="M3 4C3 3.44772 3.44772 3 4 3H20C20.5523 3 21 3.44772 21 4V6.58579C21 6.851 20.8946 7.10536 20.7071 7.29289L14 14V21C14 21.5523 13.5523 22 13 22H11C10.4477 22 10 21.5523 10 21V14L3.29289 7.29289C3.10536 7.10536 3 6.851 3 6.58579V4Z" />
            </svg>
          </div>
          
          <select className="w-[140px] h-[30px] border border-gray-300 rounded-[3px] px-2 text-[12.5px] outline-none text-gray-600 bg-white focus:border-[#4F46E5]">
            <option>All Types</option>
            {activeTab === 'payment' ? (
              <>
                <option>Customer Due</option>
                <option>Supplier Due</option>
                <option>EMI / Schedule</option>
              </>
            ) : (
              <>
                <option>Service Due</option>
                <option>AMC Renewal</option>
                <option>Warranty Expiry</option>
              </>
            )}
          </select>

          <select className="w-[130px] h-[30px] border border-gray-300 rounded-[3px] px-2 text-[12.5px] outline-none text-gray-600 bg-white focus:border-[#4F46E5]">
            <option>All Status</option>
            <option>Pending</option>
            <option>Completed</option>
            <option>Overdue</option>
            <option>Upcoming</option>
          </select>

          <input 
            type="text" 
            placeholder={activeTab === 'payment' ? "Search Name/Invoice" : "Search Service/Customer"}
            className="w-[200px] h-[30px] border border-gray-300 rounded-[3px] px-2 text-[12.5px] outline-none text-gray-700 bg-white placeholder-gray-400 focus:border-[#4F46E5]"
          />
        </div>

        <div className="flex flex-wrap items-center gap-4">
          <div className="flex items-center gap-1.5">
            <input 
              type="date" 
              className="w-[120px] h-[30px] border border-gray-300 rounded-[3px] px-2 text-[12.5px] outline-none text-gray-600 bg-white focus:border-[#4F46E5]"
            />
            <span className="text-gray-500 text-[12px]">to</span>
            <input 
              type="date" 
              className="w-[120px] h-[30px] border border-gray-300 rounded-[3px] px-2 text-[12.5px] outline-none text-gray-600 bg-white focus:border-[#4F46E5]"
            />
          </div>

          <button className="bg-[#28a745] hover:bg-[#218838] text-white px-3.5 py-[5px] rounded-[3px] text-[12.5px] font-medium flex items-center justify-center transition-colors shadow-sm">
            Search
          </button>

          <button 
            onClick={() => setIsAddModalOpen(true)}
            className="bg-[#4F46E5] hover:bg-[#4338ca] text-white px-3.5 py-[5px] rounded-[3px] text-[12.5px] font-medium flex items-center justify-center transition-colors shadow-sm gap-1.5"
          >
            <Plus className="w-[14px] h-[14px]" /> Add Reminder
          </button>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 p-4 overflow-auto">
        <div className="bg-white border border-gray-200 rounded-[3px] shadow-sm overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-[#f8f9fa] border-b border-gray-200 text-gray-700 text-[13px]">
                {activeTab === 'payment' ? (
                  <>
                    <th className="py-2.5 px-3 font-semibold border-r border-gray-200">Name / Party</th>
                    <th className="py-2.5 px-3 font-semibold border-r border-gray-200">Ref / Invoice No</th>
                    <th className="py-2.5 px-3 font-semibold border-r border-gray-200 text-right">Due Amount</th>
                    <th className="py-2.5 px-3 font-semibold border-r border-gray-200 text-right">Pending Bal.</th>
                    <th className="py-2.5 px-3 font-semibold border-r border-gray-200 text-center">Due Date</th>
                    <th className="py-2.5 px-3 font-semibold border-r border-gray-200 text-center">Status</th>
                  </>
                ) : (
                  <>
                    <th className="py-2.5 px-3 font-semibold border-r border-gray-200">Service Name</th>
                    <th className="py-2.5 px-3 font-semibold border-r border-gray-200">Customer Name</th>
                    <th className="py-2.5 px-3 font-semibold border-r border-gray-200 text-center">Service Date</th>
                    <th className="py-2.5 px-3 font-semibold border-r border-gray-200 text-center">Next Service</th>
                    <th className="py-2.5 px-3 font-semibold border-r border-gray-200 text-center">Reminder Date</th>
                    <th className="py-2.5 px-3 font-semibold border-r border-gray-200 text-center">Status</th>
                  </>
                )}
                <th className="py-2.5 px-3 font-semibold text-center w-[80px]">Action</th>
              </tr>
            </thead>
            <tbody>
              {activeTab === 'payment' ? (
                paymentReminders.map((rem) => (
                  <tr key={rem.id} className="border-b border-gray-100 hover:bg-gray-50 text-[12.5px] text-gray-700">
                    <td className="py-2 px-3 border-r border-gray-100">
                      <div className="font-medium text-[#4F46E5]">{rem.name}</div>
                      <div className="text-[11px] text-gray-500">{rem.type}</div>
                    </td>
                    <td className="py-2 px-3 border-r border-gray-100">{rem.invoiceNo}</td>
                    <td className="py-2 px-3 border-r border-gray-100 text-right font-medium">₹{rem.dueAmount}</td>
                    <td className="py-2 px-3 border-r border-gray-100 text-right text-red-600">₹{rem.pendingBalance}</td>
                    <td className="py-2 px-3 border-r border-gray-100 text-center">{rem.dueDate}</td>
                    <td className="py-2 px-3 border-r border-gray-100 text-center">
                      <span className={`px-2 py-0.5 rounded-[3px] text-[11px] font-medium ${getStatusColor(rem.status)}`}>
                        {rem.status}
                      </span>
                    </td>
                    <td className="py-2 px-3 text-center relative">
                      <button 
                        onClick={(e) => { e.stopPropagation(); toggleActionMenu(rem.id); }}
                        className="text-gray-500 hover:text-[#4F46E5] p-1 rounded transition-colors"
                      >
                        <MoreVertical className="w-[16px] h-[16px]" />
                      </button>
                      {activeActionMenu === rem.id && (
                        <div className="absolute right-8 top-2 w-[160px] bg-white border border-gray-200 shadow-lg rounded-[3px] z-10 py-1 text-left" onClick={(e) => e.stopPropagation()}>
                          <button className="w-full text-left px-3 py-1.5 text-[12px] hover:bg-gray-100 text-gray-700 flex items-center gap-2"><Check className="w-[14px] h-[14px] text-green-600" /> Mark Completed</button>
                          <button className="w-full text-left px-3 py-1.5 text-[12px] hover:bg-gray-100 text-gray-700 flex items-center gap-2"><Send className="w-[14px] h-[14px] text-blue-600" /> Send Reminder</button>
                          <button className="w-full text-left px-3 py-1.5 text-[12px] hover:bg-gray-100 text-gray-700 flex items-center gap-2"><Clock className="w-[14px] h-[14px] text-orange-500" /> Snooze</button>
                          <div className="border-t border-gray-100 my-1"></div>
                          <button className="w-full text-left px-3 py-1.5 text-[12px] hover:bg-gray-100 text-gray-700 flex items-center gap-2"><Edit className="w-[14px] h-[14px]" /> Edit</button>
                          <button className="w-full text-left px-3 py-1.5 text-[12px] hover:bg-red-50 text-red-600 flex items-center gap-2"><Trash2 className="w-[14px] h-[14px]" /> Delete</button>
                        </div>
                      )}
                    </td>
                  </tr>
                ))
              ) : (
                serviceReminders.map((rem) => (
                  <tr key={rem.id} className="border-b border-gray-100 hover:bg-gray-50 text-[12.5px] text-gray-700">
                    <td className="py-2 px-3 border-r border-gray-100">
                      <div className="font-medium text-[#4F46E5]">{rem.serviceName}</div>
                      <div className="text-[11px] text-gray-500 truncate w-[150px]">{rem.notes}</div>
                    </td>
                    <td className="py-2 px-3 border-r border-gray-100">{rem.customerName}</td>
                    <td className="py-2 px-3 border-r border-gray-100 text-center">{rem.serviceDate}</td>
                    <td className="py-2 px-3 border-r border-gray-100 text-center font-medium">{rem.nextServiceDate}</td>
                    <td className="py-2 px-3 border-r border-gray-100 text-center text-[#4F46E5]">{rem.reminderDate}</td>
                    <td className="py-2 px-3 border-r border-gray-100 text-center">
                      <span className={`px-2 py-0.5 rounded-[3px] text-[11px] font-medium ${getStatusColor(rem.status)}`}>
                        {rem.status}
                      </span>
                    </td>
                    <td className="py-2 px-3 text-center relative">
                      <button 
                        onClick={(e) => { e.stopPropagation(); toggleActionMenu(rem.id); }}
                        className="text-gray-500 hover:text-[#4F46E5] p-1 rounded transition-colors"
                      >
                        <MoreVertical className="w-[16px] h-[16px]" />
                      </button>
                      {activeActionMenu === rem.id && (
                        <div className="absolute right-8 top-2 w-[160px] bg-white border border-gray-200 shadow-lg rounded-[3px] z-10 py-1 text-left" onClick={(e) => e.stopPropagation()}>
                          <button className="w-full text-left px-3 py-1.5 text-[12px] hover:bg-gray-100 text-gray-700 flex items-center gap-2"><Check className="w-[14px] h-[14px] text-green-600" /> Mark Completed</button>
                          <button className="w-full text-left px-3 py-1.5 text-[12px] hover:bg-gray-100 text-gray-700 flex items-center gap-2"><Send className="w-[14px] h-[14px] text-blue-600" /> Send Notification</button>
                          <button className="w-full text-left px-3 py-1.5 text-[12px] hover:bg-gray-100 text-gray-700 flex items-center gap-2"><Clock className="w-[14px] h-[14px] text-orange-500" /> Snooze</button>
                          <div className="border-t border-gray-100 my-1"></div>
                          <button className="w-full text-left px-3 py-1.5 text-[12px] hover:bg-gray-100 text-gray-700 flex items-center gap-2"><Edit className="w-[14px] h-[14px]" /> Edit</button>
                          <button className="w-full text-left px-3 py-1.5 text-[12px] hover:bg-red-50 text-red-600 flex items-center gap-2"><Trash2 className="w-[14px] h-[14px]" /> Delete</button>
                        </div>
                      )}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
          
          {(activeTab === 'payment' && paymentReminders.length === 0) || (activeTab === 'service' && serviceReminders.length === 0) ? (
            <div className="p-8 text-center text-gray-500 text-[13px]">
              No reminders found matching your criteria.
            </div>
          ) : null}
        </div>
      </div>

      {/* Add/Edit Reminder Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 bg-black/40 z-[100] flex items-center justify-center p-4">
          <div className="bg-white rounded-[3px] shadow-xl w-full max-w-2xl flex flex-col max-h-[90vh]">
            <div className="bg-[#4F46E5] text-white px-4 py-2.5 flex justify-between items-center rounded-t-[3px]">
              <h3 className="text-[14px] font-medium tracking-wide">
                Add New {activeTab === 'payment' ? 'Payment' : 'Service'} Reminder
              </h3>
              <button onClick={() => setIsAddModalOpen(false)} className="hover:bg-white/20 p-1 rounded">
                <X className="w-[16px] h-[16px]" />
              </button>
            </div>
            
            <div className="p-4 overflow-y-auto flex-1 grid grid-cols-2 gap-4">
              {activeTab === 'payment' ? (
                <>
                  <div className="col-span-2 sm:col-span-1">
                    <label className="block text-[12.5px] text-gray-700 font-medium mb-1">Reminder Type *</label>
                    <select className="w-full h-[32px] border border-gray-300 rounded-[3px] px-2 text-[13px] outline-none focus:border-[#4F46E5]">
                      <option>Customer Payment</option>
                      <option>Supplier Payment</option>
                      <option>EMI Schedule</option>
                    </select>
                  </div>
                  <div className="col-span-2 sm:col-span-1">
                    <label className="block text-[12.5px] text-gray-700 font-medium mb-1">Party Name *</label>
                    <input type="text" placeholder="Select/Search Party" className="w-full h-[32px] border border-gray-300 rounded-[3px] px-2 text-[13px] outline-none focus:border-[#4F46E5]" />
                  </div>
                  <div className="col-span-2 sm:col-span-1">
                    <label className="block text-[12.5px] text-gray-700 font-medium mb-1">Invoice / Ref No</label>
                    <input type="text" placeholder="e.g. INV-100" className="w-full h-[32px] border border-gray-300 rounded-[3px] px-2 text-[13px] outline-none focus:border-[#4F46E5]" />
                  </div>
                  <div className="col-span-2 sm:col-span-1">
                    <label className="block text-[12.5px] text-gray-700 font-medium mb-1">Due Amount (₹) *</label>
                    <input type="number" placeholder="0.00" className="w-full h-[32px] border border-gray-300 rounded-[3px] px-2 text-[13px] outline-none focus:border-[#4F46E5]" />
                  </div>
                  <div className="col-span-2 sm:col-span-1">
                    <label className="block text-[12.5px] text-gray-700 font-medium mb-1">Due Date *</label>
                    <input type="date" className="w-full h-[32px] border border-gray-300 rounded-[3px] px-2 text-[13px] outline-none focus:border-[#4F46E5]" />
                  </div>
                </>
              ) : (
                <>
                  <div className="col-span-2 sm:col-span-1">
                    <label className="block text-[12.5px] text-gray-700 font-medium mb-1">Service Type *</label>
                    <select className="w-full h-[32px] border border-gray-300 rounded-[3px] px-2 text-[13px] outline-none focus:border-[#4F46E5]">
                      <option>Service Due</option>
                      <option>AMC Renewal</option>
                      <option>Warranty Expiry</option>
                      <option>Maintenance</option>
                    </select>
                  </div>
                  <div className="col-span-2 sm:col-span-1">
                    <label className="block text-[12.5px] text-gray-700 font-medium mb-1">Customer Name *</label>
                    <input type="text" placeholder="Select Customer" className="w-full h-[32px] border border-gray-300 rounded-[3px] px-2 text-[13px] outline-none focus:border-[#4F46E5]" />
                  </div>
                  <div className="col-span-2 sm:col-span-1">
                    <label className="block text-[12.5px] text-gray-700 font-medium mb-1">Service Name / Item</label>
                    <input type="text" placeholder="e.g. AC Repair" className="w-full h-[32px] border border-gray-300 rounded-[3px] px-2 text-[13px] outline-none focus:border-[#4F46E5]" />
                  </div>
                  <div className="col-span-2 sm:col-span-1">
                    <label className="block text-[12.5px] text-gray-700 font-medium mb-1">Last Service Date</label>
                    <input type="date" className="w-full h-[32px] border border-gray-300 rounded-[3px] px-2 text-[13px] outline-none focus:border-[#4F46E5]" />
                  </div>
                  <div className="col-span-2 sm:col-span-1">
                    <label className="block text-[12.5px] text-gray-700 font-medium mb-1">Next Service Date *</label>
                    <input type="date" className="w-full h-[32px] border border-gray-300 rounded-[3px] px-2 text-[13px] outline-none focus:border-[#4F46E5]" />
                  </div>
                </>
              )}
              
              <div className="col-span-2 border-t border-gray-100 my-1"></div>
              
              {/* Additional Reminder Features */}
              <div className="col-span-2 sm:col-span-1">
                <label className="block text-[12.5px] text-gray-700 font-medium mb-1">Auto Reminder Date</label>
                <input type="date" className="w-full h-[32px] border border-gray-300 rounded-[3px] px-2 text-[13px] outline-none focus:border-[#4F46E5]" />
              </div>
              <div className="col-span-2 sm:col-span-1">
                <label className="block text-[12.5px] text-gray-700 font-medium mb-1">Repeat Reminder</label>
                <select className="w-full h-[32px] border border-gray-300 rounded-[3px] px-2 text-[13px] outline-none focus:border-[#4F46E5]">
                  <option>Never</option>
                  <option>Daily</option>
                  <option>Weekly</option>
                  <option>Monthly</option>
                </select>
              </div>

              <div className="col-span-2">
                <label className="block text-[12.5px] text-gray-700 font-medium mb-1">Custom Notes / Remarks</label>
                <textarea 
                  rows="2"
                  placeholder="Any additional details..."
                  className="w-full border border-gray-300 rounded-[3px] p-2 text-[13px] outline-none focus:border-[#4F46E5] resize-none"
                ></textarea>
              </div>

              <div className="col-span-2 mt-1">
                <label className="block text-[12.5px] text-gray-700 font-medium mb-2">Notification Channels</label>
                <div className="flex gap-4">
                  <label className="flex items-center gap-1.5 text-[12.5px] text-gray-600 cursor-pointer">
                    <input type="checkbox" className="accent-[#4F46E5]" defaultChecked /> In-system
                  </label>
                  <label className="flex items-center gap-1.5 text-[12.5px] text-gray-600 cursor-pointer">
                    <input type="checkbox" className="accent-[#4F46E5]" defaultChecked /> WhatsApp
                  </label>
                  <label className="flex items-center gap-1.5 text-[12.5px] text-gray-600 cursor-pointer">
                    <input type="checkbox" className="accent-[#4F46E5]" /> SMS
                  </label>
                  <label className="flex items-center gap-1.5 text-[12.5px] text-gray-600 cursor-pointer">
                    <input type="checkbox" className="accent-[#4F46E5]" /> Email
                  </label>
                </div>
              </div>
            </div>

            <div className="bg-gray-50 border-t border-gray-200 px-4 py-3 flex justify-end gap-3 rounded-b-[3px]">
              <button 
                onClick={() => setIsAddModalOpen(false)}
                className="px-4 py-1.5 border border-gray-300 rounded-[3px] text-gray-700 text-[13px] font-medium hover:bg-gray-100 transition-colors"
              >
                Cancel
              </button>
              <button 
                onClick={() => setIsAddModalOpen(false)}
                className="px-4 py-1.5 bg-[#4F46E5] hover:bg-[#4338ca] text-white rounded-[3px] text-[13px] font-medium transition-colors shadow-sm"
              >
                Save Reminder
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
