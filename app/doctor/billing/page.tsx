// app/doctor/billing/page.tsx
"use client";

import React from "react";
import { Plus } from "lucide-react";
import { useDoctor } from "../layout";

export default function BillingPage() {
  const { invoices } = useDoctor();

  const totalRevenue = invoices.reduce((sum, inv) => sum + inv.amount, 0);
  const pendingAmount = invoices.filter(i => i.status === "Pending").reduce((sum, inv) => sum + inv.amount, 0);
  const paidAmount = invoices.filter(i => i.status === "Paid").reduce((sum, inv) => sum + inv.amount, 0);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-800">Billing</h2>
        <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition">
          <Plus className="w-4 h-4" />
          Create Invoice
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white rounded-xl p-6 border border-gray-200">
          <p className="text-sm text-gray-500 mb-2">Total Revenue</p>
          <p className="text-2xl font-bold text-gray-900">${totalRevenue.toFixed(2)}</p>
        </div>
        <div className="bg-white rounded-xl p-6 border border-gray-200">
          <p className="text-sm text-gray-500 mb-2">Pending Payments</p>
          <p className="text-2xl font-bold text-orange-600">${pendingAmount.toFixed(2)}</p>
        </div>
        <div className="bg-white rounded-xl p-6 border border-gray-200">
          <p className="text-sm text-gray-500 mb-2">Paid</p>
          <p className="text-2xl font-bold text-green-600">${paidAmount.toFixed(2)}</p>
        </div>
      </div>

      {/* Invoices Table */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="text-left p-4 text-xs font-medium text-gray-500 uppercase">Invoice ID</th>
              <th className="text-left p-4 text-xs font-medium text-gray-500 uppercase">Patient</th>
              <th className="text-left p-4 text-xs font-medium text-gray-500 uppercase">Date</th>
              <th className="text-left p-4 text-xs font-medium text-gray-500 uppercase">Amount</th>
              <th className="text-left p-4 text-xs font-medium text-gray-500 uppercase">Status</th>
              <th className="text-left p-4 text-xs font-medium text-gray-500 uppercase">Method</th>
              <th className="text-left p-4 text-xs font-medium text-gray-500 uppercase">Actions</th>
            </tr>
          </thead>
          <tbody>
            {invoices.map((invoice) => (
              <tr key={invoice.id} className="border-b border-gray-200 hover:bg-gray-50">
                <td className="p-4 text-sm font-medium text-gray-900">{invoice.id}</td>
                <td className="p-4 text-sm text-gray-600">{invoice.patientName}</td>
                <td className="p-4 text-sm text-gray-600">{invoice.date}</td>
                <td className="p-4 text-sm font-medium text-gray-900">${invoice.amount.toFixed(2)}</td>
                <td className="p-4">
                  <span className={`px-2 py-1 text-xs rounded-full ${
                    invoice.status === 'Paid' ? 'bg-green-100 text-green-600' :
                    invoice.status === 'Pending' ? 'bg-yellow-100 text-yellow-600' :
                    'bg-red-100 text-red-600'
                  }`}>
                    {invoice.status}
                  </span>
                </td>
                <td className="p-4 text-sm text-gray-600">{invoice.method || '-'}</td>
                <td className="p-4">
                  <button className="text-blue-600 text-sm hover:text-blue-800">View</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}