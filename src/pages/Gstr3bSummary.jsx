import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Printer } from 'lucide-react';

export function Gstr3bSummary() {
  const navigate = useNavigate();

  return (
    <div className="bg-[#f4f6f9] min-h-[calc(100vh-45px)] p-4 flex flex-col relative pb-[80px]">
      
      {/* Top Control */}
      <div className="mb-4 flex flex-col gap-1.5 w-full sm:max-w-[250px]">
        <label className="text-[13px] font-bold text-gray-800">Select Period</label>
        <select className="h-[32px] border border-gray-300 rounded-[3px] px-2 text-[13px] outline-none text-gray-700 bg-white">
          <option>Select</option>
        </select>
      </div>

      {/* Main Card */}
      <div className="bg-white shadow-sm border border-gray-200 w-full overflow-hidden">
        
        {/* Header */}
        <div className="text-center py-4">
          <h2 className="text-[18px] text-gray-800 mb-1">GSTR-3B</h2>
          <p className="text-[13px] text-gray-600">Period: 30-Apr-2026 to 30-May-2026</p>
        </div>

        {/* Content Portions */}
        <div className="px-4 pb-4 w-full">

          {/* Section 3.1 */}
          <div className="mb-4">
            <div className="bg-[#4F46E5] text-white text-center py-1.5 text-[13px] font-bold border border-[#4F46E5]">
              3.1 Details of Outward Supplies and inward supplies liable to reverse charge
            </div>
            <div className="table-scroll w-full overflow-x-auto">
            <table className="w-full border-collapse border border-gray-200 text-center">
              <thead>
                <tr className="bg-[#4F46E5] text-white">
                  <th className="py-2 px-3 border border-gray-200 text-[12px] font-bold whitespace-nowrap">Name of Supplies</th>
                  <th className="py-2 px-3 border border-gray-200 text-[12px] font-bold leading-tight whitespace-nowrap">Total Taxable<br/>Value</th>
                  <th className="py-2 px-3 border border-gray-200 text-[12px] font-bold whitespace-nowrap">IGST</th>
                  <th className="py-2 px-3 border border-gray-200 text-[12px] font-bold whitespace-nowrap">CGST</th>
                  <th className="py-2 px-3 border border-gray-200 text-[12px] font-bold whitespace-nowrap">SGST/UT TAX</th>
                  <th className="py-2 px-3 border border-gray-200 text-[12px] font-bold whitespace-nowrap">Cess</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="py-1.5 px-3 border border-gray-200 text-[12px] text-gray-700 text-center">(a) Outward taxable supplies (other than zero rated, Nil Rated and exempted)</td>
                  <td className="py-1.5 px-3 border border-gray-200 text-[12px] text-gray-800">0.00</td>
                  <td className="py-1.5 px-3 border border-gray-200 text-[12px] text-gray-800">0.00</td>
                  <td className="py-1.5 px-3 border border-gray-200 text-[12px] text-gray-800">0.00</td>
                  <td className="py-1.5 px-3 border border-gray-200 text-[12px] text-gray-800">0.00</td>
                  <td className="py-1.5 px-3 border border-gray-200 text-[12px] text-gray-800">0.00</td>
                </tr>
                <tr>
                  <td className="py-1.5 px-3 border border-gray-200 text-[12px] text-gray-700 text-center">(b) Outward taxable supplies (zero rated)</td>
                  <td className="py-1.5 px-3 border border-gray-200 text-[12px] text-gray-800">0.00</td>
                  <td className="py-1.5 px-3 border border-gray-200 text-[12px] text-gray-800">0.00</td>
                  <td className="py-1.5 px-3 border border-gray-200 text-[12px] text-gray-800">0.00</td>
                  <td className="py-1.5 px-3 border border-gray-200 text-[12px] text-gray-800">0.00</td>
                  <td className="py-1.5 px-3 border border-gray-200 text-[12px] text-gray-800">0.00</td>
                </tr>
                <tr>
                  <td className="py-1.5 px-3 border border-gray-200 text-[12px] text-gray-700 text-center">(c) Other Outward supplies (Nil Rated, exempted)</td>
                  <td className="py-1.5 px-3 border border-gray-200 text-[12px] text-gray-800">0.00</td>
                  <td className="py-1.5 px-3 border border-gray-200 text-[12px] text-gray-800">0.00</td>
                  <td className="py-1.5 px-3 border border-gray-200 text-[12px] text-gray-800">0.00</td>
                  <td className="py-1.5 px-3 border border-gray-200 text-[12px] text-gray-800">0.00</td>
                  <td className="py-1.5 px-3 border border-gray-200 text-[12px] text-gray-800">0.00</td>
                </tr>
                <tr>
                  <td className="py-1.5 px-3 border border-gray-200 text-[12px] text-gray-700 text-center">(d) Inward supplies (liable to reverse charge)</td>
                  <td className="py-1.5 px-3 border border-gray-200 text-[12px] text-gray-800">0.00</td>
                  <td className="py-1.5 px-3 border border-gray-200 text-[12px] text-gray-800">0.00</td>
                  <td className="py-1.5 px-3 border border-gray-200 text-[12px] text-gray-800">0.00</td>
                  <td className="py-1.5 px-3 border border-gray-200 text-[12px] text-gray-800">0.00</td>
                  <td className="py-1.5 px-3 border border-gray-200 text-[12px] text-gray-800">0.00</td>
                </tr>
                <tr>
                  <td className="py-1.5 px-3 border border-gray-200 text-[12px] text-gray-700 text-center">(e) Non-GST Outward supplies</td>
                  <td className="py-1.5 px-3 border border-gray-200 text-[12px] text-gray-800">0.00</td>
                  <td className="py-1.5 px-3 border border-gray-200 text-[12px] text-gray-800">0.00</td>
                  <td className="py-1.5 px-3 border border-gray-200 text-[12px] text-gray-800">0.00</td>
                  <td className="py-1.5 px-3 border border-gray-200 text-[12px] text-gray-800">0.00</td>
                  <td className="py-1.5 px-3 border border-gray-200 text-[12px] text-gray-800">0.00</td>
                </tr>
                <tr className="bg-[#d1ecf1]">
                  <td className="py-1.5 px-3 border border-[#bee5eb] text-[12px] font-bold text-gray-800 text-center uppercase">TOTAL</td>
                  <td className="py-1.5 px-3 border border-[#bee5eb] text-[12px] font-bold text-gray-800">0.00</td>
                  <td className="py-1.5 px-3 border border-[#bee5eb] text-[12px] font-bold text-gray-800">0.00</td>
                  <td className="py-1.5 px-3 border border-[#bee5eb] text-[12px] font-bold text-gray-800">0.00</td>
                  <td className="py-1.5 px-3 border border-[#bee5eb] text-[12px] font-bold text-gray-800">0.00</td>
                  <td className="py-1.5 px-3 border border-[#bee5eb] text-[12px] font-bold text-gray-800">0.00</td>
                </tr>
              </tbody>
            </table>
          </div>
          </div>

          {/* Section 3.2 */}
          <div className="mb-4">
            <div className="bg-[#4F46E5] text-white text-center py-1.5 text-[13px] font-bold border border-[#4F46E5]">
              3.2 Of the supplies shown in 3.1(a) above, details of inter-State supplies made to unregistered persons, composition taxable persons and UIN holders
            </div>
            <div className="table-scroll w-full overflow-x-auto">
            <table className="w-full border-collapse border border-gray-200 text-center">
              <thead>
                <tr className="bg-[#4F46E5] text-white">
                  <th className="py-2 px-3 border border-gray-200 text-[12px] font-bold w-1/3 whitespace-nowrap">Place of Supplies</th>
                  <th className="py-2 px-3 border border-gray-200 text-[12px] font-bold w-1/3 whitespace-nowrap">Total Taxable Value</th>
                  <th className="py-2 px-3 border border-gray-200 text-[12px] font-bold w-1/3 whitespace-nowrap">Amount of IGST</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="py-1.5 px-3 border border-gray-200 text-[12px] text-gray-700 text-center">Inter-State</td>
                  <td className="py-1.5 px-3 border border-gray-200 text-[12px] text-gray-800">0.00</td>
                  <td className="py-1.5 px-3 border border-gray-200 text-[12px] text-gray-800">0.00</td>
                </tr>
              </tbody>
            </table>
          </div>
          </div>

          {/* Section 4 */}
          <div className="mb-4">
            <div className="bg-[#4F46E5] text-white text-center py-1.5 text-[13px] font-bold border border-[#4F46E5]">
              4 Eligible ITC
            </div>
            <div className="table-scroll w-full overflow-x-auto">
            <table className="w-full border-collapse border border-gray-200 text-center">
              <thead>
                <tr className="bg-[#4F46E5] text-white">
                  <th className="py-2 px-3 border border-gray-200 text-[12px] font-bold w-[40%] whitespace-nowrap">Details</th>
                  <th className="py-2 px-3 border border-gray-200 text-[12px] font-bold w-[15%] whitespace-nowrap">IGST</th>
                  <th className="py-2 px-3 border border-gray-200 text-[12px] font-bold w-[15%] whitespace-nowrap">CGST</th>
                  <th className="py-2 px-3 border border-gray-200 text-[12px] font-bold w-[15%] whitespace-nowrap">SGST/UT TAX</th>
                  <th className="py-2 px-3 border border-gray-200 text-[12px] font-bold w-[15%] whitespace-nowrap">Cess</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="py-1.5 px-3 border border-gray-200 text-[12px] text-gray-700 text-center">(A) ITC available supplies (whether in full or apart)</td>
                  <td className="py-1.5 px-3 border border-gray-200 text-[12px] text-gray-800"></td>
                  <td className="py-1.5 px-3 border border-gray-200 text-[12px] text-gray-800"></td>
                  <td className="py-1.5 px-3 border border-gray-200 text-[12px] text-gray-800"></td>
                  <td className="py-1.5 px-3 border border-gray-200 text-[12px] text-gray-800"></td>
                </tr>
                <tr>
                  <td className="py-1.5 px-3 border border-gray-200 text-[12px] text-gray-700 text-center">(1) Import of Goods</td>
                  <td className="py-1.5 px-3 border border-gray-200 text-[12px] text-gray-800">0.00</td>
                  <td className="py-1.5 px-3 border border-gray-200 text-[12px] text-gray-800">0.00</td>
                  <td className="py-1.5 px-3 border border-gray-200 text-[12px] text-gray-800">0.00</td>
                  <td className="py-1.5 px-3 border border-gray-200 text-[12px] text-gray-800">0.00</td>
                </tr>
                <tr>
                  <td className="py-1.5 px-3 border border-gray-200 text-[12px] text-gray-700 text-center">(2) Import of Services</td>
                  <td className="py-1.5 px-3 border border-gray-200 text-[12px] text-gray-800">0.00</td>
                  <td className="py-1.5 px-3 border border-gray-200 text-[12px] text-gray-800">0.00</td>
                  <td className="py-1.5 px-3 border border-gray-200 text-[12px] text-gray-800">0.00</td>
                  <td className="py-1.5 px-3 border border-gray-200 text-[12px] text-gray-800">0.00</td>
                </tr>
                <tr>
                  <td className="py-1.5 px-3 border border-gray-200 text-[12px] text-gray-700 text-center">(3) Inward supplies liable to reverse charge (other 1 & 2 above)</td>
                  <td className="py-1.5 px-3 border border-gray-200 text-[12px] text-gray-800">0.00</td>
                  <td className="py-1.5 px-3 border border-gray-200 text-[12px] text-gray-800">0.00</td>
                  <td className="py-1.5 px-3 border border-gray-200 text-[12px] text-gray-800">0.00</td>
                  <td className="py-1.5 px-3 border border-gray-200 text-[12px] text-gray-800">0.00</td>
                </tr>
                <tr>
                  <td className="py-1.5 px-3 border border-gray-200 text-[12px] text-gray-700 text-center">(4) Inward supplies from ISD</td>
                  <td className="py-1.5 px-3 border border-gray-200 text-[12px] text-gray-800">0.00</td>
                  <td className="py-1.5 px-3 border border-gray-200 text-[12px] text-gray-800">0.00</td>
                  <td className="py-1.5 px-3 border border-gray-200 text-[12px] text-gray-800">0.00</td>
                  <td className="py-1.5 px-3 border border-gray-200 text-[12px] text-gray-800">0.00</td>
                </tr>
                <tr>
                  <td className="py-1.5 px-3 border border-gray-200 text-[12px] text-gray-700 text-center">(5) All other ITC</td>
                  <td className="py-1.5 px-3 border border-gray-200 text-[12px] text-gray-800">0.00</td>
                  <td className="py-1.5 px-3 border border-gray-200 text-[12px] text-gray-800">0.00</td>
                  <td className="py-1.5 px-3 border border-gray-200 text-[12px] text-gray-800">0.00</td>
                  <td className="py-1.5 px-3 border border-gray-200 text-[12px] text-gray-800">0.00</td>
                </tr>
                <tr>
                  <td className="py-1.5 px-3 border border-gray-200 text-[12px] text-gray-700 text-center">(B) ITC Reversed</td>
                  <td className="py-1.5 px-3 border border-gray-200 text-[12px] text-gray-800">0.00</td>
                  <td className="py-1.5 px-3 border border-gray-200 text-[12px] text-gray-800">0.00</td>
                  <td className="py-1.5 px-3 border border-gray-200 text-[12px] text-gray-800">0.00</td>
                  <td className="py-1.5 px-3 border border-gray-200 text-[12px] text-gray-800">0.00</td>
                </tr>
                <tr>
                  <td className="py-1.5 px-3 border border-gray-200 text-[12px] text-gray-700 text-center">(C) Net ITC available(A)-(B)</td>
                  <td className="py-1.5 px-3 border border-gray-200 text-[12px] text-gray-800">0.00</td>
                  <td className="py-1.5 px-3 border border-gray-200 text-[12px] text-gray-800">0.00</td>
                  <td className="py-1.5 px-3 border border-gray-200 text-[12px] text-gray-800">0.00</td>
                  <td className="py-1.5 px-3 border border-gray-200 text-[12px] text-gray-800">0.00</td>
                </tr>
              </tbody>
            </table>
          </div>
          </div>

          {/* Section 5 */}
          <div className="mb-4">
            <div className="bg-[#4F46E5] text-white text-center py-1.5 text-[13px] font-bold border border-[#4F46E5]">
              5 Values of exempt, nil-rated and non-GST inward supplies
            </div>
            <div className="table-scroll w-full overflow-x-auto">
            <table className="w-full border-collapse border border-gray-200 text-center">
              <thead>
                <tr className="bg-[#4F46E5] text-white">
                  <th className="py-2 px-3 border border-gray-200 text-[12px] font-bold w-[50%] whitespace-nowrap">Nature of Supplies</th>
                  <th className="py-2 px-3 border border-gray-200 text-[12px] font-bold w-[25%] whitespace-nowrap">Inter-State supplies</th>
                  <th className="py-2 px-3 border border-gray-200 text-[12px] font-bold w-[25%] whitespace-nowrap">Intra-State supplies</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="py-1.5 px-3 border border-gray-200 text-[12px] text-gray-700 text-center">From a supplier under composition scheme, Exempt and Nil rated supply</td>
                  <td className="py-1.5 px-3 border border-gray-200 text-[12px] text-gray-800">0.00</td>
                  <td className="py-1.5 px-3 border border-gray-200 text-[12px] text-gray-800">0.00</td>
                </tr>
                <tr>
                  <td className="py-1.5 px-3 border border-gray-200 text-[12px] text-gray-700 text-center">Non GST supply</td>
                  <td className="py-1.5 px-3 border border-gray-200 text-[12px] text-gray-800">0.00</td>
                  <td className="py-1.5 px-3 border border-gray-200 text-[12px] text-gray-800">0.00</td>
                </tr>
              </tbody>
            </table>
          </div>
          </div>

          {/* Section 6.1 */}
          <div className="mb-4">
            <div className="bg-[#4F46E5] text-white text-center py-1.5 text-[13px] font-bold border border-[#4F46E5]">
              6.1 Payment of Tax
            </div>
            <div className="table-scroll w-full overflow-x-auto">
            <table className="w-full border-collapse border border-gray-200 text-center">
              <thead>
                <tr className="bg-[#4F46E5] text-white">
                  <th className="py-2 px-3 border border-gray-200 text-[12px] font-bold w-[12.5%] whitespace-nowrap" rowSpan="2">Description</th>
                  <th className="py-2 px-3 border border-gray-200 text-[12px] font-bold w-[12.5%] whitespace-nowrap" rowSpan="2">Tax Payable</th>
                  <th className="py-1 px-3 border border-gray-200 text-[12px] font-bold whitespace-nowrap" colSpan="4">Paid through ITC</th>
                  <th className="py-2 px-3 border border-gray-200 text-[12px] font-bold w-[12.5%] whitespace-nowrap" rowSpan="2">Tax Paid<br/>TDS/TCS</th>
                  <th className="py-2 px-3 border border-gray-200 text-[12px] font-bold w-[12.5%] whitespace-nowrap" rowSpan="2">Tax/Cess<br/>paid in cash</th>
                  <th className="py-2 px-3 border border-gray-200 text-[12px] font-bold w-[10%] whitespace-nowrap" rowSpan="2">Interest</th>
                  <th className="py-2 px-3 border border-gray-200 text-[12px] font-bold w-[10%] whitespace-nowrap" rowSpan="2">Late<br/>Fee</th>
                </tr>
                <tr className="bg-[#4F46E5] text-white">
                  <th className="py-1 px-2 border border-gray-200 text-[11px] font-bold leading-tight whitespace-nowrap">Integrated<br/>Tax</th>
                  <th className="py-1 px-2 border border-gray-200 text-[11px] font-bold leading-tight whitespace-nowrap">CGST</th>
                  <th className="py-1 px-2 border border-gray-200 text-[11px] font-bold leading-tight whitespace-nowrap">SGST/UT<br/>TAX</th>
                  <th className="py-1 px-2 border border-gray-200 text-[11px] font-bold leading-tight whitespace-nowrap">Cess</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="py-1.5 px-3 border border-gray-200 text-[12px] text-gray-700 text-center">IGST</td>
                  <td className="py-1.5 px-3 border border-gray-200 text-[12px] text-gray-800">0.00</td>
                  <td className="py-1.5 px-3 border border-gray-200 text-[12px] text-gray-800">0.00</td>
                  <td className="py-1.5 px-3 border border-gray-200 text-[12px] text-gray-800">0</td>
                  <td className="py-1.5 px-3 border border-gray-200 text-[12px] text-gray-800">0</td>
                  <td className="py-1.5 px-3 border border-gray-200 text-[12px] text-gray-800">0</td>
                  <td className="py-1.5 px-3 border border-gray-200 text-[12px] text-gray-800">0.00</td>
                  <td className="py-1.5 px-3 border border-gray-200 text-[12px] text-gray-800">0.00</td>
                  <td className="py-1.5 px-3 border border-gray-200 text-[12px] text-gray-800">0.00</td>
                  <td className="py-1.5 px-3 border border-gray-200 text-[12px] text-gray-800">0.00</td>
                </tr>
                <tr>
                  <td className="py-1.5 px-3 border border-gray-200 text-[12px] text-gray-700 text-center">CGST</td>
                  <td className="py-1.5 px-3 border border-gray-200 text-[12px] text-gray-800">0.00</td>
                  <td className="py-1.5 px-3 border border-gray-200 text-[12px] text-gray-800">0</td>
                  <td className="py-1.5 px-3 border border-gray-200 text-[12px] text-gray-800">0.00</td>
                  <td className="py-1.5 px-3 border border-gray-200 text-[12px] text-gray-800">0</td>
                  <td className="py-1.5 px-3 border border-gray-200 text-[12px] text-gray-800">0</td>
                  <td className="py-1.5 px-3 border border-gray-200 text-[12px] text-gray-800">0.00</td>
                  <td className="py-1.5 px-3 border border-gray-200 text-[12px] text-gray-800">0.00</td>
                  <td className="py-1.5 px-3 border border-gray-200 text-[12px] text-gray-800">0.00</td>
                  <td className="py-1.5 px-3 border border-gray-200 text-[12px] text-gray-800">0.00</td>
                </tr>
                <tr>
                  <td className="py-1.5 px-3 border border-gray-200 text-[12px] text-gray-700 text-center">SGST/UT TAX</td>
                  <td className="py-1.5 px-3 border border-gray-200 text-[12px] text-gray-800">0.00</td>
                  <td className="py-1.5 px-3 border border-gray-200 text-[12px] text-gray-800">0</td>
                  <td className="py-1.5 px-3 border border-gray-200 text-[12px] text-gray-800">0</td>
                  <td className="py-1.5 px-3 border border-gray-200 text-[12px] text-gray-800">0.00</td>
                  <td className="py-1.5 px-3 border border-gray-200 text-[12px] text-gray-800">0</td>
                  <td className="py-1.5 px-3 border border-gray-200 text-[12px] text-gray-800">0.00</td>
                  <td className="py-1.5 px-3 border border-gray-200 text-[12px] text-gray-800">0.00</td>
                  <td className="py-1.5 px-3 border border-gray-200 text-[12px] text-gray-800">0.00</td>
                  <td className="py-1.5 px-3 border border-gray-200 text-[12px] text-gray-800">0.00</td>
                </tr>
                <tr>
                  <td className="py-1.5 px-3 border border-gray-200 text-[12px] text-gray-700 text-center">Cess</td>
                  <td className="py-1.5 px-3 border border-gray-200 text-[12px] text-gray-800">0.00</td>
                  <td className="py-1.5 px-3 border border-gray-200 text-[12px] text-gray-800">0</td>
                  <td className="py-1.5 px-3 border border-gray-200 text-[12px] text-gray-800">0</td>
                  <td className="py-1.5 px-3 border border-gray-200 text-[12px] text-gray-800">0</td>
                  <td className="py-1.5 px-3 border border-gray-200 text-[12px] text-gray-800">0.00</td>
                  <td className="py-1.5 px-3 border border-gray-200 text-[12px] text-gray-800">0.00</td>
                  <td className="py-1.5 px-3 border border-gray-200 text-[12px] text-gray-800">0.00</td>
                  <td className="py-1.5 px-3 border border-gray-200 text-[12px] text-gray-800">0.00</td>
                  <td className="py-1.5 px-3 border border-gray-200 text-[12px] text-gray-800">0.00</td>
                </tr>
              </tbody>
            </table>
          </div>
          </div>

          {/* Section 6.1 TDS/TCS Credit */}
          <div>
            <div className="bg-[#4F46E5] text-white text-center py-1.5 text-[13px] font-bold border border-[#4F46E5]">
              6.1 TDS/TCS Credit
            </div>
            <div className="table-scroll w-full overflow-x-auto">
            <table className="w-full border-collapse border border-gray-200 text-center">
              <thead>
                <tr className="bg-[#4F46E5] text-white">
                  <th className="py-2 px-3 border border-gray-200 text-[12px] font-bold w-[40%] whitespace-nowrap">Details</th>
                  <th className="py-2 px-3 border border-gray-200 text-[12px] font-bold w-[20%] whitespace-nowrap">IGST</th>
                  <th className="py-2 px-3 border border-gray-200 text-[12px] font-bold w-[20%] whitespace-nowrap">CGST</th>
                  <th className="py-2 px-3 border border-gray-200 text-[12px] font-bold w-[20%] whitespace-nowrap">SGST/UT TAX</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="py-1.5 px-3 border border-gray-200 text-[12px] text-gray-700 text-center">TDS</td>
                  <td className="py-1.5 px-3 border border-gray-200 text-[12px] text-gray-800">0.00</td>
                  <td className="py-1.5 px-3 border border-gray-200 text-[12px] text-gray-800">0.00</td>
                  <td className="py-1.5 px-3 border border-gray-200 text-[12px] text-gray-800">0.00</td>
                </tr>
                <tr>
                  <td className="py-1.5 px-3 border border-gray-200 text-[12px] text-gray-700 text-center">TCS</td>
                  <td className="py-1.5 px-3 border border-gray-200 text-[12px] text-gray-800">0.00</td>
                  <td className="py-1.5 px-3 border border-gray-200 text-[12px] text-gray-800">0.00</td>
                  <td className="py-1.5 px-3 border border-gray-200 text-[12px] text-gray-800">0.00</td>
                </tr>
              </tbody>
            </table>
          </div>
          </div>

        </div>
      </div>

      {/* Footer Buttons */}
      <div className="absolute bottom-0 left-0 bg-transparent p-4 flex justify-start pl-6">
        <button className="bg-[#6c757d] hover:bg-[#5a6268] text-white text-[13px] font-medium px-4 py-1.5 rounded-[3px] flex items-center justify-center gap-1.5 shadow-sm transition-colors">
          <Printer className="w-4 h-4" /> Print
        </button>
      </div>

    </div>
  );
}
