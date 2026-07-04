import React, { useState, useEffect } from 'react';
import { CreditCard, CheckCircle2, X } from 'lucide-react';
import apiClient from '../../api/apiClient';

export function SubscriptionManagement() {
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [editingIndex, setEditingIndex] = useState(null);
  const [activePlanIndex, setActivePlanIndex] = useState(1);
  const [billingPeriod, setBillingPeriod] = useState('monthly');
  const [plans, setPlans] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchPlans = async () => {
      try {
        const response = await apiClient.get('/plans');
        if (response.data.success) {
          // Map backend data to frontend structure
          const formattedPlans = response.data.data.map(p => {
            let featuresList = [];
            if (Array.isArray(p.features)) featuresList = p.features;
            else if (p.features && typeof p.features === 'object') {
              featuresList = [
                `${p.features.maxUsers || 'Unlimited'} User Licenses`,
                `${p.features.maxProducts || 'Unlimited'} Products Max`,
                'Email Support'
              ];
            } else {
              featuresList = ['Standard Features', 'Email Support'];
            }

            return {
              id: p.id,
              name: p.name,
              monthlyPrice: `₹${p.price}/mo`,
              yearlyPrice: `₹${p.price * 10}/yr`, 
              companies: p._count ? p._count.companies : 0, 
              features: featuresList,
              highlight: p.name.toLowerCase() === 'pro'
            };
          });
          setPlans(formattedPlans);
        }
      } catch (error) {
        console.error('Failed to fetch plans:', error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchPlans();
  }, []);

  const handleSaveChanges = () => {
    if (editingIndex !== null) {
      const updatedPlans = [...plans];
      updatedPlans[editingIndex] = selectedPlan;
      setPlans(updatedPlans);
      setEditModalOpen(false);
      setEditingIndex(null);
    }
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Subscription & Billing</h1>
          <p className="text-gray-500 mt-1">Manage SaaS plans and view active subscriptions</p>
        </div>
        
        <div className="inline-flex items-center bg-gray-100 p-1 rounded border border-gray-200">
          <button onClick={() => setBillingPeriod('monthly')} className={`px-3 py-1.5 rounded text-[10px] font-bold transition-all ${billingPeriod === 'monthly' ? 'bg-[#4F46E5] text-white shadow-sm' : 'text-gray-600'}`}>Monthly</button>
          <button onClick={() => setBillingPeriod('yearly')} className={`px-3 py-1.5 rounded text-[10px] font-bold transition-all ${billingPeriod === 'yearly' ? 'bg-[#4F46E5] text-white shadow-sm' : 'text-gray-600'}`}>Yearly (Save 20%)</button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {isLoading ? (
          <div className="col-span-3 text-center py-10 text-gray-500">Loading plans...</div>
        ) : plans.length === 0 ? (
          <div className="col-span-3 text-center py-10 text-gray-500">No subscription plans found.</div>
        ) : plans.map((plan, index) => (
          <div 
            key={index} 
            onClick={() => setActivePlanIndex(index)}
            className={`bg-white rounded-2xl border p-6 cursor-pointer relative transition-all duration-200 flex flex-col ${
              activePlanIndex === index 
                ? 'border-[#4F46E5] ring-2 ring-[#4F46E5]/20 shadow-lg shadow-indigo-100' 
                : 'border-gray-200 shadow-sm hover:border-indigo-200'
            }`}
          >
            {plan.highlight && (
              <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#4F46E5] text-white px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide">
                Most Popular
              </span>
            )}
            <h3 className="text-xl font-bold text-gray-900">{plan.name}</h3>
            <div className="mt-4 flex items-baseline text-3xl font-extrabold text-gray-900">
              {billingPeriod === 'monthly' ? plan.monthlyPrice : plan.yearlyPrice}
            </div>
            <p className="mt-1 text-sm text-gray-500">{plan.companies} active companies</p>
            
            <ul className="mt-6 space-y-3">
              {plan.features.map((feature, i) => (
                <li key={i} className="flex items-start">
                  <CheckCircle2 className="w-5 h-5 text-emerald-500 flex-shrink-0 mr-2" />
                  <span className="text-gray-600 text-sm">{feature}</span>
                </li>
              ))}
            </ul>
            
            <div className="mt-auto pt-8 flex gap-3">
              <button 
                onClick={(e) => { 
                  e.stopPropagation(); 
                  setSelectedPlan({ ...plan }); 
                  setEditingIndex(index);
                  setEditModalOpen(true); 
                }}
                className={`flex-1 py-2.5 px-4 rounded-xl font-medium transition-colors ${
                  activePlanIndex === index 
                    ? 'bg-[#4F46E5] text-white hover:bg-indigo-700' 
                    : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
                }`}>
                Edit
              </button>
              <button 
                onClick={(e) => { e.stopPropagation(); setSelectedPlan(plan); setDeleteModalOpen(true); }}
                className="flex-1 py-2.5 px-4 rounded-xl font-medium transition-colors bg-red-50 text-red-600 hover:bg-red-100 border border-red-100">
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Edit Plan Modal */}
      {editModalOpen && selectedPlan && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-gray-900/50 backdrop-blur-sm">
          <div className="bg-white rounded-xl shadow-lg w-full max-w-md overflow-hidden">
            <div className="flex justify-between items-center p-4 border-b border-gray-200">
              <h2 className="text-lg font-bold text-gray-900">Edit Plan: {selectedPlan.name}</h2>
              <button onClick={() => setEditModalOpen(false)} className="text-gray-500 hover:text-gray-700 focus:outline-none">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Plan Name</label>
                <input 
                  type="text" 
                  value={selectedPlan.name} 
                  onChange={(e) => setSelectedPlan({...selectedPlan, name: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500" 
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Price</label>
                <input 
                  type="text" 
                  value={billingPeriod === 'monthly' ? selectedPlan.monthlyPrice : selectedPlan.yearlyPrice} 
                  onChange={(e) => {
                    if (billingPeriod === 'monthly') {
                      setSelectedPlan({...selectedPlan, monthlyPrice: e.target.value});
                    } else {
                      setSelectedPlan({...selectedPlan, yearlyPrice: e.target.value});
                    }
                  }}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500" 
                />
              </div>
            </div>
            <div className="p-4 border-t border-gray-200 bg-gray-50 flex justify-end gap-3">
              <button onClick={() => setEditModalOpen(false)} className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50">Cancel</button>
              <button onClick={handleSaveChanges} className="px-4 py-2 text-sm font-medium text-white bg-[#4F46E5] rounded-lg hover:bg-indigo-700">Save Changes</button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Plan Modal */}
      {deleteModalOpen && selectedPlan && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-gray-900/50 backdrop-blur-sm">
          <div className="bg-white rounded-xl shadow-lg w-full max-w-sm overflow-hidden">
            <div className="p-6 text-center">
              <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center mx-auto mb-4 text-red-600">
                <X className="w-6 h-6" />
              </div>
              <h2 className="text-lg font-bold text-gray-900 mb-2">Delete {selectedPlan.name} Plan?</h2>
              <p className="text-sm text-gray-500">Are you sure you want to delete this plan? This action cannot be undone.</p>
            </div>
            <div className="p-4 border-t border-gray-200 bg-gray-50 flex justify-end gap-3">
              <button onClick={() => setDeleteModalOpen(false)} className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50">Cancel</button>
              <button onClick={() => setDeleteModalOpen(false)} className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-lg hover:bg-red-700">Yes, Delete</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
