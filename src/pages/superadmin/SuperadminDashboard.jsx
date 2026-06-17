import React from 'react';
import { Building2, CreditCard, Headset, TrendingUp, Users, Activity } from 'lucide-react';

export function SuperadminDashboard() {
  const stats = [
    { title: 'Total Active Companies', value: '142', icon: Building2, color: 'text-blue-600', bg: 'bg-blue-100' },
    { title: 'Monthly Recurring Revenue', value: '₹4,50,000', icon: TrendingUp, color: 'text-emerald-600', bg: 'bg-emerald-100' },
    { title: 'Active Subscriptions', value: '128', icon: CreditCard, color: 'text-indigo-600', bg: 'bg-indigo-100' },
    { title: 'Inactive Subscriptions', value: '14', icon: CreditCard, color: 'text-rose-600', bg: 'bg-rose-100' },
  ];

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Superadmin Dashboard</h1>
        <p className="text-gray-500 mt-1">Overview of your SaaS platform's performance</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">{stat.title}</p>
                <h3 className="text-2xl font-bold text-gray-900 mt-1">{stat.value}</h3>
              </div>
              <div className={`w-12 h-12 rounded-full flex items-center justify-center ${stat.bg}`}>
                <stat.icon className={`w-6 h-6 ${stat.color}`} />
              </div>
            </div>

          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-6">
        {/* Recent Companies */}
        <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
          <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
            <Users className="w-5 h-5 mr-2 text-gray-500" />
            Recently Onboarded Companies
          </h3>
          <div className="space-y-4">
            {[
              { name: 'Tech Solutions Inc', plan: 'Enterprise', date: '2 hours ago' },
              { name: 'Global Logistics', plan: 'Pro', date: '5 hours ago' },
              { name: 'Retail Plus', plan: 'Basic', date: '1 day ago' },
            ].map((company, i) => (
              <div key={i} className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg transition-colors border border-gray-100">
                <div>
                  <p className="font-semibold text-gray-900">{company.name}</p>
                  <p className="text-xs text-gray-500">{company.date}</p>
                </div>
                <span className="px-2.5 py-1 rounded-full text-xs font-medium bg-indigo-50 text-indigo-700 border border-indigo-100">
                  {company.plan}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
