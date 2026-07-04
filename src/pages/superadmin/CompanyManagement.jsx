import React, { useState, useEffect } from 'react';
import { Building2, Plus, Search, X, Edit, Eye, Trash2 } from 'lucide-react';
import apiClient from '../../api/apiClient';

export function CompanyManagement() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [companies, setCompanies] = useState([]);
  const [plans, setPlans] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [newCompany, setNewCompany] = useState({ name: '', ownerName: '', ownerEmail: '', planId: '' });
  const [saveError, setSaveError] = useState(null);
  const [editCompanyId, setEditCompanyId] = useState(null);
  const [viewCompany, setViewCompany] = useState(null);

  useEffect(() => {
    fetchCompanies();
    fetchPlans();
  }, []);

  const fetchCompanies = async () => {
    setIsLoading(true);
    try {
      const response = await apiClient.get('/companies');
      if (response.data.success) {
        setCompanies(response.data.data);
      }
    } catch (error) {
      console.error('Failed to fetch companies:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchPlans = async () => {
    try {
      const response = await apiClient.get('/plans');
      if (response.data.success) {
        const planList = response.data.data;
        setPlans(planList);
        if (planList.length > 0) {
          setNewCompany(prev => ({ ...prev, planId: planList[0].id }));
        }
      }
    } catch (error) {
      console.error('Failed to fetch plans:', error);
    }
  };

  const handleSaveTenant = async () => {
    setSaveError(null);
    if (!newCompany.name.trim() || !newCompany.ownerEmail.trim()) {
      setSaveError('Name and Email are required.');
      return;
    }

    try {
      if (editCompanyId) {
        const response = await apiClient.put(`/companies/${editCompanyId}`, newCompany);
        if (response.data.success) {
          setCompanies(companies.map(c => c.id === editCompanyId ? response.data.data : c));
          setNewCompany({ name: '', ownerName: '', ownerEmail: '', planId: plans[0]?.id || '' });
          setEditCompanyId(null);
          setIsModalOpen(false);
        }
      } else {
        const response = await apiClient.post('/companies', newCompany);
        if (response.data.success) {
          setCompanies(prev => [...prev, response.data.data]);
          setNewCompany({ name: '', ownerName: '', ownerEmail: '', planId: plans[0]?.id || '' });
          setIsModalOpen(false);
        }
      }
    } catch (error) {
      console.error('Failed to save company:', error);
      setSaveError(error.response?.data?.message || 'Failed to save company');
    }
  };

  const handleEditClick = (company) => {
    setNewCompany({
      name: company.name,
      ownerName: company.ownerName || '',
      ownerEmail: company.ownerEmail || '',
      planId: company.planId || (plans[0]?.id || '')
    });
    setEditCompanyId(company.id);
    setIsModalOpen(true);
  };

  const handleDeleteCompany = async (id) => {
    if (window.confirm("Are you sure you want to delete this company? All associated users will also be removed.")) {
      try {
        const response = await apiClient.delete(`/companies/${id}`);
        if (response.data.success) {
          setCompanies(companies.filter(c => c.id !== id));
        }
      } catch (error) {
        console.error('Failed to delete company:', error);
        alert('Failed to delete company');
      }
    }
  };

  const handleToggleStatus = async (id, currentStatus) => {
    const newStatus = currentStatus === 'ACTIVE' ? 'SUSPENDED' : 'ACTIVE';
    try {
      const response = await apiClient.patch(`/companies/${id}/status`, { status: newStatus });
      if (response.data.success) {
        setCompanies(companies.map(c => 
          c.id === id ? { ...c, status: newStatus } : c
        ));
      }
    } catch (error) {
      console.error('Failed to update company status:', error);
      alert('Failed to update status');
    }
  };

  return (
    <div className="p-6 space-y-6 relative">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Company Management</h1>
          <p className="text-gray-500 mt-1">Manage all registered client companies</p>
        </div>
        <button 
          onClick={() => {
            setEditCompanyId(null);
            setNewCompany({ name: '', ownerName: '', ownerEmail: '', planId: plans[0]?.id || '' });
            setIsModalOpen(true);
          }}
          className="flex items-center gap-2 bg-[#4F46E5] text-white px-4 py-2 rounded-lg font-medium hover:bg-indigo-700 transition-colors shadow-sm transform hover:-translate-y-1 hover:shadow-lg active:translate-y-0 active:scale-95 duration-200"
        >
          <Plus className="w-4 h-4" />
          Add New Tenant
        </button>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="p-4 border-b border-gray-200 flex justify-between items-center bg-gray-50/50">
          <div className="relative w-64">
            <input 
              type="text" 
              placeholder="Search companies..." 
              className="w-full pl-9 pr-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all"
            />
            <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
          </div>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-gray-50 border-b border-gray-200 text-gray-600 font-medium">
              <tr>
                <th className="px-6 py-4">Company Name</th>
                <th className="px-6 py-4">Owner</th>
                <th className="px-6 py-4">Plan</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {isLoading ? (
                <tr>
                  <td colSpan="5" className="px-6 py-4 text-center text-gray-500">Loading companies...</td>
                </tr>
              ) : companies.length === 0 ? (
                <tr>
                  <td colSpan="5" className="px-6 py-4 text-center text-gray-500">No companies found.</td>
                </tr>
              ) : (
                companies.map((company) => (
                  <tr key={company.id} className="hover:bg-gray-50/50 transition-colors">
                    <td className="px-6 py-4 font-medium text-gray-900 flex items-center gap-3">
                      <div className="w-8 h-8 rounded bg-indigo-50 flex items-center justify-center text-indigo-600">
                        <Building2 className="w-4 h-4" />
                      </div>
                      {company.name}
                    </td>
                    <td className="px-6 py-4 text-gray-600">{company.ownerName || 'N/A'}</td>
                    <td className="px-6 py-4">
                      <span className="px-2.5 py-1 rounded-md text-xs font-medium bg-gray-100 text-gray-700">
                        {company.plan?.name || 'Default'}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-2.5 py-1 rounded-full text-xs font-medium border ${
                        company.status === 'ACTIVE' 
                          ? 'bg-emerald-50 text-emerald-700 border-emerald-200' 
                          : 'bg-red-50 text-red-700 border-red-200'
                      }`}>
                        {company.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right flex justify-end items-center gap-3">
                      <button 
                        onClick={() => handleToggleStatus(company.id, company.status)}
                        className={`font-bold text-[13px] px-4 py-2 rounded transition-all duration-100 transform active:translate-y-[4px] active:shadow-none ${
                          company.status === 'ACTIVE' 
                            ? 'bg-[#e53e3e] text-white shadow-[0_4px_0_0_#c53030] hover:bg-[#c53030] hover:shadow-[0_4px_0_0_#9b2c2c]' 
                            : 'bg-[#38a169] text-white shadow-[0_4px_0_0_#2f855a] hover:bg-[#2f855a] hover:shadow-[0_4px_0_0_#276749]'
                        }`}
                      >
                        {company.status === 'ACTIVE' ? 'Deactivate' : 'Activate'}
                      </button>
                      <button onClick={() => setViewCompany(company)} className="text-indigo-600 bg-indigo-50 border border-indigo-100 p-2 rounded-lg transition-all duration-200 transform hover:-translate-y-1 hover:bg-indigo-600 hover:text-white hover:shadow-[0_4px_0_0_rgba(79,70,229,0.8)] active:translate-y-[2px] active:shadow-none" title="View">
                        <Eye className="w-4 h-4" />
                      </button>
                      <button onClick={() => handleEditClick(company)} className="text-blue-600 bg-blue-50 border border-blue-100 p-2 rounded-lg transition-all duration-200 transform hover:-translate-y-1 hover:bg-blue-600 hover:text-white hover:shadow-[0_4px_0_0_rgba(37,99,235,0.8)] active:translate-y-[2px] active:shadow-none" title="Edit">
                        <Edit className="w-4 h-4" />
                      </button>
                      <button onClick={() => handleDeleteCompany(company.id)} className="text-red-600 bg-red-50 border border-red-100 p-2 rounded-lg transition-all duration-200 transform hover:-translate-y-1 hover:bg-red-600 hover:text-white hover:shadow-[0_4px_0_0_rgba(220,38,38,0.8)] active:translate-y-[2px] active:shadow-none" title="Delete">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add New Tenant Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-gray-900/50 backdrop-blur-sm">
          <div className="bg-white rounded-xl shadow-lg w-full max-w-md overflow-hidden">
            <div className="flex justify-between items-center p-4 border-b border-gray-200">
              <h2 className="text-lg font-bold text-gray-900">{editCompanyId ? 'Edit Tenant' : 'Add New Tenant'}</h2>
              <button onClick={() => setIsModalOpen(false)} className="text-gray-500 hover:text-gray-700 focus:outline-none">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-6 space-y-4">
              {saveError && (
                <div className="p-3 bg-red-50 text-red-700 text-sm rounded-lg border border-red-200">
                  {saveError}
                </div>
              )}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Company Name</label>
                <input type="text" value={newCompany.name} onChange={(e) => setNewCompany({...newCompany, name: e.target.value})} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500" placeholder="e.g. Acme Corp" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Owner Name</label>
                <input type="text" value={newCompany.ownerName} onChange={(e) => setNewCompany({...newCompany, ownerName: e.target.value})} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500" placeholder="e.g. John Doe" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Owner Email</label>
                <input type="email" value={newCompany.ownerEmail} onChange={(e) => setNewCompany({...newCompany, ownerEmail: e.target.value})} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500" placeholder="john@acme.com" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Select Plan</label>
                <select value={newCompany.planId} onChange={(e) => setNewCompany({...newCompany, planId: Number(e.target.value)})} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500">
                  {plans.length === 0 ? (
                    <option value="" disabled>Loading plans...</option>
                  ) : (
                    plans.map(plan => (
                      <option key={plan.id} value={plan.id}>{plan.name} — ₹{plan.price}/mo</option>
                    ))
                  )}
                </select>
              </div>
            </div>
            <div className="p-4 border-t border-gray-200 bg-gray-50 flex justify-end gap-3">
              <button onClick={() => setIsModalOpen(false)} className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50">Cancel</button>
              <button onClick={handleSaveTenant} className="px-4 py-2 text-sm font-medium text-white bg-[#4F46E5] rounded-lg hover:bg-indigo-700">{editCompanyId ? 'Update Tenant' : 'Save Tenant'}</button>
            </div>
          </div>
        </div>
      )}

      {/* View Details Modal */}
      {viewCompany && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-gray-900/50 backdrop-blur-sm">
          <div className="bg-white rounded-xl shadow-lg w-full max-w-md overflow-hidden transform scale-100 transition-transform">
            <div className="flex justify-between items-center p-4 border-b border-gray-200">
              <h2 className="text-lg font-bold text-gray-900">Tenant Details</h2>
              <button onClick={() => setViewCompany(null)} className="text-gray-500 hover:text-gray-700 focus:outline-none">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider">Company Name</label>
                <div className="mt-1 text-base font-medium text-gray-900">{viewCompany.name}</div>
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider">Owner</label>
                <div className="mt-1 text-base text-gray-900">{viewCompany.ownerName || 'N/A'}</div>
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider">Email</label>
                <div className="mt-1 text-base text-gray-900">{viewCompany.ownerEmail || 'N/A'}</div>
              </div>
              <div className="flex gap-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider">Plan</label>
                  <div className="mt-1">
                    <span className="px-2.5 py-1 rounded-md text-sm font-medium bg-indigo-50 text-indigo-700 border border-indigo-100">
                      {viewCompany.plan?.name || 'Default'}
                    </span>
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider">Status</label>
                  <div className="mt-1">
                    <span className={`px-2.5 py-1 rounded-full text-sm font-medium border ${
                      viewCompany.status === 'ACTIVE' 
                        ? 'bg-emerald-50 text-emerald-700 border-emerald-200' 
                        : 'bg-red-50 text-red-700 border-red-200'
                    }`}>
                      {viewCompany.status}
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div className="p-4 border-t border-gray-200 bg-gray-50 flex justify-end">
              <button onClick={() => setViewCompany(null)} className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50">Close</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
