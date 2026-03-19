"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Menu, X, Filter, Plus, Search, Eye, Edit, Trash2, DollarSign, Clock, CheckCircle2, AlertCircle } from "lucide-react";
import HelpDeskSidebar from "@/components/helpdesk/HelpDeskSidebar";

type Invoice = {
  id: string;
  patientName: string;
  patientId: string;
  date: string;
  amount: number;
  status: "paid" | "pending" | "overdue";
  method?: string;
};

export default function BillingPage() {
  const router = useRouter();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("");

  // Mock data
  const invoices: Invoice[] = [
    {
      id: "INV-001",
      patientName: "John Doe",
      patientId: "PAT1001",
      date: "2024-01-15",
      amount: 150.00,
      status: "paid",
      method: "Credit Card",
    },
    {
      id: "INV-002",
      patientName: "Jane Smith",
      patientId: "PAT1002",
      date: "2024-01-16",
      amount: 275.50,
      status: "pending",
      method: "Insurance",
    },
    {
      id: "INV-003",
      patientName: "Robert Johnson",
      patientId: "PAT1003",
      date: "2024-01-14",
      amount: 89.99,
      status: "paid",
      method: "Cash",
    },
    {
      id: "INV-004",
      patientName: "Emily Davis",
      patientId: "PAT1004",
      date: "2024-01-10",
      amount: 199.99,
      status: "overdue",
      method: "Insurance",
    },
    {
      id: "INV-005",
      patientName: "David Wilson",
      patientId: "PAT1005",
      date: "2024-01-17",
      amount: 325.00,
      status: "pending",
      method: "Credit Card",
    },
    {
      id: "INV-006",
      patientName: "Sarah Brown",
      patientId: "PAT1006",
      date: "2024-01-12",
      amount: 450.00,
      status: "paid",
      method: "Check",
    },
    {
      id: "INV-007",
      patientName: "Michael Lee",
      patientId: "PAT1007",
      date: "2024-01-08",
      amount: 120.00,
      status: "overdue",
      method: "Insurance",
    },
  ];

  // Filtered invoices
  const filteredInvoices = invoices.filter((inv) => {
    const matchesSearch =
      searchQuery === "" ||
      inv.patientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      inv.patientId.toLowerCase().includes(searchQuery.toLowerCase()) ||
      inv.id.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === "" || inv.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  // Stats
  const totalRevenue = invoices.reduce((sum, inv) => sum + inv.amount, 0);
  const pendingAmount = invoices
    .filter((inv) => inv.status === "pending")
    .reduce((sum, inv) => sum + inv.amount, 0);
  const paidAmount = invoices
    .filter((inv) => inv.status === "paid")
    .reduce((sum, inv) => sum + inv.amount, 0);
  const overdueAmount = invoices
    .filter((inv) => inv.status === "overdue")
    .reduce((sum, inv) => sum + inv.amount, 0);

  const stats = [
    {
      title: "Total Revenue",
      value: `$${totalRevenue.toFixed(2)}`,
      bgColor: "bg-blue-100",
      icon: <DollarSign className="w-5 h-5 text-blue-600" />,
    },
    {
      title: "Pending Payments",
      value: `$${pendingAmount.toFixed(2)}`,
      bgColor: "bg-amber-100",
      icon: <Clock className="w-5 h-5 text-amber-600" />,
    },
    {
      title: "Paid Invoices",
      value: `$${paidAmount.toFixed(2)}`,
      bgColor: "bg-emerald-100",
      icon: <CheckCircle2 className="w-5 h-5 text-emerald-600" />,
    },
    {
      title: "Overdue",
      value: `$${overdueAmount.toFixed(2)}`,
      bgColor: "bg-rose-100",
      icon: <AlertCircle className="w-5 h-5 text-rose-600" />,
    },
  ];

  const handleBillingClick = () => {};
  const handleRoomAvailabilityClick = () => console.log('Room Availability clicked');
  const handleDoctorSlotsClick = () => router.push('/helpdesk/doctor-slots');

  const getStatusColor = (status: Invoice["status"]) => {
    switch (status) {
      case "paid": return "bg-green-100 text-green-700";
      case "pending": return "bg-yellow-100 text-yellow-700";
      case "overdue": return "bg-red-100 text-red-700";
      default: return "bg-gray-100 text-gray-600";
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <HelpDeskSidebar
        isOpen={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
        onBillingClick={handleBillingClick}
        onRoomAvailabilityClick={handleRoomAvailabilityClick}
        onDoctorSlotsClick={handleDoctorSlotsClick}
      />

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-h-screen overflow-hidden">
        {/* Mobile header */}
        <header className="lg:hidden bg-white border-b border-gray-200 px-4 py-3 flex items-center gap-3">
          <button onClick={() => setMobileMenuOpen(true)} className="p-2 rounded-lg hover:bg-gray-100">
            <span className="material-icons">menu</span>
          </button>
          <h1 className="text-xl font-bold text-gray-800 truncate">Billing</h1>
        </header>

        {/* Mobile toggle button */}
        <button
          className="lg:hidden fixed bottom-20 right-6 z-50 p-3 bg-blue-600 hover:bg-blue-700 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-200 flex items-center justify-center"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>

        <main className="flex-1 overflow-y-auto overflow-x-hidden p-4 sm:p-6 lg:p-8">
          <div className="space-y-6">
            {/* Page Header */}
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Billing Management</h1>
              <p className="text-sm text-gray-500 mt-1">Manage invoices and payments</p>
            </div>

            {/* Stats Cards - compact, 2 columns on mobile */}
            <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              {stats.map((stat, index) => (
                <div key={index} className="bg-white rounded-xl border border-gray-200 p-4 shadow-sm">
                  <div className="flex items-start justify-between">
                    <div className={`p-2 rounded-lg ${stat.bgColor}`}>{stat.icon}</div>
                  </div>
                  <p className="text-xs text-gray-500 mt-3">{stat.title}</p>
                  <p className="text-lg font-bold text-gray-900 mt-0.5">{stat.value}</p>
                </div>
              ))}
            </div>

            {/* Search and Filter Bar */}
            <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
              <div className="relative w-full sm:w-96">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search by invoice ID, patient name or ID..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-9 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="flex gap-2 w-full sm:w-auto">
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 text-sm"
                >
                  <option value="">All statuses</option>
                  <option value="paid">Paid</option>
                  <option value="pending">Pending</option>
                  <option value="overdue">Overdue</option>
                </select>
                <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2 text-sm whitespace-nowrap">
                  <Plus className="w-4 h-4" />
                  Create Invoice
                </button>
              </div>
            </div>

            {/* Invoices Table */}
            <div className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm">
              <div className="overflow-x-auto">
                <table className="w-full min-w-[800px] lg:min-w-full border-collapse">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="p-3 text-left text-xs font-medium text-gray-500 uppercase border border-gray-200">Invoice ID</th>
                      <th className="p-3 text-left text-xs font-medium text-gray-500 uppercase border border-gray-200">Patient</th>
                      <th className="p-3 text-left text-xs font-medium text-gray-500 uppercase border border-gray-200">Date</th>
                      <th className="p-3 text-left text-xs font-medium text-gray-500 uppercase border border-gray-200">Amount</th>
                      <th className="p-3 text-left text-xs font-medium text-gray-500 uppercase border border-gray-200">Status</th>
                      <th className="p-3 text-left text-xs font-medium text-gray-500 uppercase border border-gray-200">Method</th>
                      <th className="p-3 text-left text-xs font-medium text-gray-500 uppercase border border-gray-200">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {filteredInvoices.map((inv) => (
                      <tr key={inv.id} className="hover:bg-gray-50 transition-colors">
                        <td className="p-3 border border-gray-200 font-mono text-sm">{inv.id}</td>
                        <td className="p-3 border border-gray-200">
                          <div>
                            <p className="font-medium text-gray-900">{inv.patientName}</p>
                            <p className="text-xs text-gray-500">{inv.patientId}</p>
                          </div>
                        </td>
                        <td className="p-3 border border-gray-200 text-sm">
                          {new Date(inv.date).toLocaleDateString()}
                        </td>
                        <td className="p-3 border border-gray-200 text-sm font-medium">
                          ${inv.amount.toFixed(2)}
                        </td>
                        <td className="p-3 border border-gray-200">
                          <span className={`px-2 py-1 text-xs rounded-full font-medium ${getStatusColor(inv.status)}`}>
                            {inv.status}
                          </span>
                        </td>
                        <td className="p-3 border border-gray-200 text-sm text-gray-600">
                          {inv.method || "-"}
                        </td>
                        <td className="p-3 border border-gray-200">
                          <div className="flex gap-2">
                            <button className="p-1 rounded-md hover:bg-gray-100 text-blue-600" title="View">
                              <Eye className="w-4 h-4" />
                            </button>
                            <button className="p-1 rounded-md hover:bg-gray-100 text-amber-600" title="Edit">
                              <Edit className="w-4 h-4" />
                            </button>
                            <button className="p-1 rounded-md hover:bg-gray-100 text-rose-600" title="Delete">
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              {filteredInvoices.length === 0 && (
                <div className="text-center py-12">
                  <span className="material-icons text-gray-400 text-4xl mb-2">receipt</span>
                  <p className="text-gray-500">No invoices found</p>
                </div>
              )}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}