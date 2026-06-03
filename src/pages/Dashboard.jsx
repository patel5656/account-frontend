import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { 
  Contact, 
  PenTool, 
  ShoppingCart, 
  Trash2,
  Calendar,
  RefreshCw
} from 'lucide-react';

const YoutubeIcon = ({ className }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    viewBox="0 0 24 24" 
    fill="currentColor" 
    className={className}
  >
    <path d="M21.582,6.186c-0.23-0.86-0.908-1.538-1.768-1.768C18.254,4,12,4,12,4S5.746,4,4.186,4.418 c-0.86,0.23-1.538,0.908-1.768,1.768C2,7.746,2,12,2,12s0,4.254,0.418,5.814c0.23,0.86,0.908,1.538,1.768,1.768 C5.746,20,12,20,12,20s6.254,0,7.814-0.418c0.861-0.23,1.538-0.908,1.768-1.768C22,16.254,22,12,22,12S22,7.746,21.582,6.186z M10,15.464V8.536L16,12L10,15.464z" />
  </svg>
);
import { StatCard } from '../components/StatCard';
import { SummaryCard } from '../components/SummaryCard';
import { ChartSection } from '../components/ChartSection';
import { AlertCards } from '../components/AlertCards';
import { CollectionReportModal } from '../components/CollectionReportModal';

export function Dashboard() {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isPrivacyOn, setIsPrivacyOn] = useState(false);
  const [selectedDate, setSelectedDate] = useState('2026-05-23');

  return (
    <div className="flex flex-col">
      {/* Secondary Header */}
      <div className="bg-[#f8f9fa] border-b border-gray-200 px-3 sm:px-4 py-2.5 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <h2 className="text-[18px] sm:text-[20px] text-gray-700 font-normal">{t('dashboard_page.title')}</h2>
        
        <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
          <YoutubeIcon className="w-6 h-6 text-[#ff0000] flex-shrink-0" />
          
          <div className="flex items-center bg-white border border-gray-300 rounded-[3px] overflow-hidden shadow-sm relative">
            <input 
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="absolute inset-0 opacity-0 cursor-pointer w-full h-full z-10"
            />
            <input 
              type="text" 
              value={selectedDate.split('-').reverse().join('-')} 
              readOnly
              className="text-[13px] px-2 py-1 w-[85px] outline-none text-gray-600 pointer-events-none"
            />
            <div className="bg-gray-100 px-1.5 py-1 border-l border-gray-300 text-gray-500 pointer-events-none">
              <Calendar className="w-4 h-4" />
            </div>
          </div>
          
          <button 
            onClick={() => window.location.reload()} 
            className="text-gray-500 hover:text-gray-700 focus:outline-none"
          >
            <RefreshCw className="w-4 h-4" />
          </button>
          
          <div className="flex flex-wrap items-center gap-1.5 ml-2 cursor-pointer" onClick={() => setIsPrivacyOn(!isPrivacyOn)}>
            <div className={`w-8 h-[18px] rounded-full relative flex items-center transition-colors duration-200 ${isPrivacyOn ? 'bg-[#0d6efd]' : 'bg-gray-300'}`}>
              <div className={`w-[14px] h-[14px] bg-white rounded-full shadow-sm transition-transform duration-200 ease-in-out ${isPrivacyOn ? 'translate-x-[16px]' : 'translate-x-[2px]'}`}></div>
            </div>
            <span className="text-[12px] font-bold text-gray-500 select-none">{t('dashboard_page.privacy')}</span>
          </div>
        </div>
      </div>

      <div className={`p-4 space-y-4 transition-all duration-300 ${isPrivacyOn ? 'blur-[8px] pointer-events-none select-none' : ''}`}>
        {/* Top Stat Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard 
            title={t('dashboard_page.todays_sale')}
            amount="0" 
            color="teal" 
            showEye={true}
            onPlusClick={() => navigate('/admin/sales-invoice')}
            onEyeClick={() => setIsModalOpen(true)}
            onMoreInfoClick={() => navigate('/admin/invoice-details/customer_sale')}
          />
          <StatCard 
            title={t('dashboard_page.today_purchase')} 
            amount="0" 
            color="yellow" 
            showEye={false}
            onPlusClick={() => navigate('/admin/create_invoices/company_purchase')}
            onMoreInfoClick={() => navigate('/admin/purchase')}
          />
          <StatCard 
            title={t('dashboard_page.current_stock_status')}
            amount="0" 
            color="yellow" 
            showEye={false}
            onPlusClick={() => navigate('/admin/create_invoices/company_purchase')}
            onMoreInfoClick={() => navigate('/admin/stock-details')}
          />
          <StatCard 
            title={t('dashboard_page.todays_expenses')}
            amount="0" 
            color="red" 
            showEye={false}
            onPlusClick={() => navigate('/admin/expenses-ledger/expense_ledger')}
            onMoreInfoClick={() => navigate('/admin/expenses_report/expense_ledger')}
          />
        </div>

        {/* Right Side Summary Cards Moved Below Top Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <SummaryCard 
            title={t('dashboard_page.customer_outstanding')}
            amount="0" 
            color="green" 
            icon={Contact} 
            onPlusClick={() => navigate('/admin/party-ledger/customer_payment')}
            onMoreInfoClick={() => navigate('/admin/party_outstanding/customer_outstanding')}
          />
          <SummaryCard 
            title={t('dashboard_page.company_outstanding')}
            amount="0" 
            color="blue" 
            icon={PenTool} 
            onPlusClick={() => navigate('/admin/party-ledger/company_payment')}
            onMoreInfoClick={() => navigate('/admin/party_outstanding/company_outstanding')}
          />
          <SummaryCard 
            title={t('dashboard_page.all_accounts_balance')}
            amount="0" 
            color="green" 
            icon={Contact} 
            onPlusClick={() => navigate('/admin/bank-ledger')}
            onMoreInfoClick={() => navigate('/admin/allbookbalance')}
          />
          <SummaryCard 
            title={t('dashboard_page.recycle_bin')}
            amount="0"
            color="red" 
            icon={Trash2} 
            onMoreInfoClick={() => navigate('/admin/view_deleted_entry')}
          />
        </div>

        <div className="w-full">
          {/* Main Chart Area */}
          <ChartSection />
        </div>

        <AlertCards />
      </div>

      <CollectionReportModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
      />
    </div>
  );
}
