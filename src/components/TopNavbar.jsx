import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { 
  Menu, 
  Search, 
  Bell, 
  Download, 
  Maximize2, 
  Settings, 
  RefreshCw, 
  Printer, 
  User,
  Star,
  LogOut
} from 'lucide-react';
import { cn } from '../utils';
import { ImportDataModal } from './ImportDataModal';
import { SettingsDrawer } from './SettingsDrawer';

export function TopNavbar({ toggleSidebar, isOpen }) {
  const [isImportModalOpen, setIsImportModalOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { i18n } = useTranslation();

  const changeLanguage = (e) => {
    const lang = e.target.value;
    i18n.changeLanguage(lang);
    localStorage.setItem('i18nextLng', lang);
    
    if (lang === 'en') {
      document.cookie = "googtrans=/en/en; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC;";
      document.cookie = `googtrans=/en/en; path=/; domain=${window.location.hostname}; expires=Thu, 01 Jan 1970 00:00:00 UTC;`;
    } else {
      document.cookie = `googtrans=/en/${lang}; path=/`;
      document.cookie = `googtrans=/en/${lang}; path=/; domain=${window.location.hostname}`;
    }

    const googleSelect = document.querySelector('.goog-te-combo');
    if (googleSelect) {
      googleSelect.value = lang;
      googleSelect.dispatchEvent(new Event('change'));
    } else {
      window.location.reload();
    }
  };

  const disabledSettingsRoutes = [
    // Masters
    '/admin/bank_details',
    '/admin/company_master',
    '/admin/customer_master',
    '/admin/category_master',
    '/admin/employee_master',
    '/admin/expense_master',
    '/admin/income_master',
    '/admin/payment_master',
    '/admin/product_master',
    '/admin/unit_catalog_master',
    '/admin/bom_master',
    '/admin/voucher_master',
    // Inventory
    '/admin/purchase',
    '/admin/purchase_return',
    '/admin/sales',
    '/admin/sales_return',
    '/admin/quotation',
    '/admin/stock_adjustment',
    '/admin/stock_inventory',
    // Account (Bank Book and below)
    '/admin/bank-ledger',
    '/admin/employee_ledger',
    '/admin/expenses-ledger/expense_ledger',
    '/admin/incomes-ledger/income_ledger',
    '/admin/cashbook-ledger/payment_ledger',
    '/admin/employee_attendance',
    // Account Summary
    '/admin/party_outstanding/customer_outstanding',
    '/admin/party_outstanding/company_outstanding',
    '/admin/stock-details',
    '/admin/sale_summary',
    '/admin/purchase_summary',
    '/admin/cash_bank_summary',
    '/admin/expenses_report/expense_ledger',
    '/admin/day_book_summary',
    '/admin/expiry_report',
    '/admin/order_list',
    // Inventory Summary
    '/admin/inventory-summary/brandwise-sale',
    '/admin/inventory-summary/brandwise-purchase',
    '/admin/inventory-summary/categorywise-sale',
    '/admin/inventory-summary/categorywise-purchase',
    '/admin/inventory-summary/itemwise-sale',
    '/admin/inventory-summary/itemwise-purchase',
    '/admin/inventory-summary/employeewise-sale',
    '/admin/inventory-summary/invoices-report',
    // Final Accounts
    '/admin/final-accounts/trading-account',
    '/admin/final-accounts/profit-loss',
    '/admin/final-accounts/balance-sheet',
    '/admin/final-accounts/tcs-report',
    // GSTR's Summary
    '/admin/gstr-summary/gstr-1',
    '/admin/gstr-summary/gstr-2',
    '/admin/gstr-summary/gstr-3b',
    '/admin/gstr-summary/sale-summary',
    '/admin/gstr-summary/sale-return',
    '/admin/gstr-summary/purchase-summary',
    '/admin/gstr-summary/purchase-return',
    '/admin/gstr-summary/gst-wise',
    '/admin/gstr-summary/hsn-wise',
    // Tools
    '/tools/complaint',
    '/tools/service-reminder',
    '/tools/hsn-gst-error',
    '/admin/items_quantity_report/1',
    '/admin/view_deleted_entry',
    '/admin/notification-permission',
    '/tools/hard-refresh'
  ];

  const handleSettingsClick = () => {
    if (!disabledSettingsRoutes.includes(location.pathname)) {
      setIsSettingsOpen(true);
    }
  };

  const handleFullScreenToggle = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch((e) => {
        console.error(e);
      });
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      }
    }
  };

  const handleRefresh = () => {
    try {
      sessionStorage.clear();
    } catch (e) {
      console.error(e);
    }
    window.location.reload(true);
  };

  return (
    <>
      <header className={`bg-white border-b border-gray-200 h-[45px] fixed top-0 right-0 z-30 transition-all duration-300 ease-in-out flex items-center justify-between px-2 sm:px-3 ${isOpen ? 'left-0 md:left-[220px]' : 'left-0'}`}>
      
      {/* Left side */}
      <div className="flex flex-wrap items-center gap-2">
        <button 
          onClick={toggleSidebar}
          className="p-1.5 rounded-sm hover:bg-gray-100 text-gray-500 transition-colors focus:outline-none"
        >
          <Menu className="w-[18px] h-[18px]" strokeWidth={2.5} />
        </button>
      </div>

      {/* Right side */}
      <div className="flex items-center gap-[4px] sm:gap-[10px] overflow-hidden flex-1 justify-end">
        {/* Validity Badge */}
        <div className="flex flex-wrap items-center gap-1 bg-[#dc3545] px-1.5 sm:px-2.5 py-0.5 rounded-full text-white flex-shrink-0">
          <span className="text-[9px] sm:text-[11px] font-medium tracking-wide whitespace-nowrap">
            <span className="hidden sm:inline">Validity - </span>
            30-May-2026 <span className="font-bold hidden xs:inline">6 days left</span>
          </span>
        </div>

        {/* Utility Icons — hidden on very small screens */}
        <div className="hidden sm:flex items-center gap-[6px] sm:gap-[10px]">
          <IconButton icon={Bell} />
          <IconButton icon={Download} onClick={() => setIsImportModalOpen(true)} />
          <IconButton icon={Maximize2} onClick={handleFullScreenToggle} />
          <IconButton icon={Settings} onClick={handleSettingsClick} />
          <IconButton icon={RefreshCw} onClick={handleRefresh} />
        </div>
        
        {/* Always visible: Settings + Refresh on mobile */}
        <div className="flex sm:hidden items-center gap-[6px]">
          <IconButton icon={Settings} onClick={handleSettingsClick} />
          <IconButton icon={RefreshCw} onClick={handleRefresh} />
        </div>
        
        {/* Print Button */}
        <button onClick={() => window.print()} className="flex items-center gap-1 sm:gap-1.5 text-gray-500 hover:text-gray-700 sm:mx-1 flex-shrink-0">
          <Printer className="w-4 h-4" strokeWidth={2.5} />
          <span className="text-[13px] font-medium hidden md:block">Print</span>
        </button>

        {/* Language Switcher */}
        <div className="flex items-center border-l border-gray-200 pl-1 sm:pl-2">
          <select 
            value={(i18n.language || 'en').substring(0, 2)} 
            onChange={changeLanguage}
            className="notranslate text-[13px] font-medium text-gray-600 bg-transparent border-none focus:ring-0 cursor-pointer outline-none uppercase appearance-none hover:text-gray-900 transition-colors text-center"
            style={{ textAlign: 'center', textAlignLast: 'center' }}
            translate="no"
          >
            <option value="en" style={{ textAlign: 'center' }}>EN</option>
            <option value="hi" style={{ textAlign: 'center' }}>HI</option>
            <option value="gu" style={{ textAlign: 'center' }}>GU</option>
            <option value="mr" style={{ textAlign: 'center' }}>MR</option>
            <option value="pa" style={{ textAlign: 'center' }}>PA</option>
            <option value="ta" style={{ textAlign: 'center' }}>TA</option>
            <option value="te" style={{ textAlign: 'center' }}>TE</option>
            <option value="bn" style={{ textAlign: 'center' }}>BN</option>
            <option value="kn" style={{ textAlign: 'center' }}>KN</option>
            <option value="ml" style={{ textAlign: 'center' }}>ML</option>
          </select>
        </div>

        {/* User Profile */}
        <button className="flex items-center gap-1 sm:gap-2 pl-1 sm:pl-2 border-l border-gray-200 flex-shrink-0">
          <div className="w-6 h-6 rounded-full bg-[#4F46E5]/20 flex items-center justify-center text-[#4F46E5] overflow-hidden">
            <User className="w-[14px] h-[14px]" />
          </div>
          <span className="text-[13px] font-medium text-gray-600 hidden sm:block">Anmol Gour</span>
        </button>

        {/* Logout Button */}
        <button 
          onClick={() => navigate('/login')}
          className="flex items-center gap-1 sm:gap-1.5 pl-1 sm:pl-2 border-l border-gray-200 text-red-500 hover:text-red-700 flex-shrink-0 focus:outline-none transition-colors"
          title="Logout"
        >
          <LogOut className="w-[16px] h-[16px]" strokeWidth={2.5} />
          <span className="text-[13px] font-medium hidden sm:block">Logout</span>
        </button>
      </div>

    </header>
      <ImportDataModal 
        isOpen={isImportModalOpen} 
        onClose={() => setIsImportModalOpen(false)} 
      />
      <SettingsDrawer 
        isOpen={isSettingsOpen} 
        onClose={() => setIsSettingsOpen(false)} 
      />
    </>
  );
}

function IconButton({ icon: Icon, className, onClick }) {
  return (
    <button 
      onClick={onClick}
      className={cn(
        "text-gray-500 hover:text-gray-700 transition-colors focus:outline-none",
        className
      )}
    >
      <Icon className="w-[15px] h-[15px]" strokeWidth={2.5} />
    </button>
  );
}
