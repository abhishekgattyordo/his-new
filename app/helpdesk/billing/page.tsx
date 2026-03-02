


"use client";

import { useState } from "react";

type Bill = {
  id: string;
  date: string;
  patient: string;
  phone: string;
  total: number;
  paid: number;
  status: "Paid fully" | "Due" | "Refunded";
  dueAmount?: number;
};

type AdvanceDeposit = {
  id: string;
  date: string;
  patient: string;
  phone: string;
  amount: number;
  balance: number;
  status: "Active" | "Used";
};

type NewBillForm = {
  patientName: string;
  phone: string;
  totalAmount: string;
  paidAmount: string;
  billDate: string;
};

type FilterOptions = {
  billNo: string;
  dateFrom: string;
  dateTo: string;
  sortOrder: "asc" | "desc" | null;
  patientName: string;
  patientPhone: string;
  status: string[];
};

export default function BillingPage() {
  const [activeTab, setActiveTab] = useState<"selling" | "advance">("selling");
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedBill, setSelectedBill] = useState<Bill | null>(null);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [activeMenuItem, setActiveMenuItem] = useState("billing");
  const [showFilters, setShowFilters] = useState(false);
  const [openFilterSection, setOpenFilterSection] = useState<string | null>(null);
  const [filterOptions, setFilterOptions] = useState<FilterOptions>({
    billNo: "",
    dateFrom: "",
    dateTo: "",
    sortOrder: null,
    patientName: "",
    patientPhone: "",
    status: [],
  });

  const [bills, setBills] = useState<Bill[]>([
    {
      id: "INV-2900567",
      date: "9th Oct 2023",
      patient: "Tony Donza",
      phone: "9930875752",
      total: 500,
      paid: 500,
      status: "Paid fully",
    },
    {
      id: "INV-2900569",
      date: "9th Oct 2023",
      patient: "Jonathan Higgins",
      phone: "6757809275",
      total: 750,
      paid: 500,
      status: "Due",
      dueAmount: 250,
    },
    {
      id: "INV-2900571",
      date: "9th Oct 2023",
      patient: "Templeton Peck",
      phone: "7228532292",
      total: 500,
      paid: 500,
      status: "Paid fully",
    },
    {
      id: "INV-2900572",
      date: "9th Oct 2023",
      patient: "Capt. Trunk",
      phone: "830478747",
      total: 890,
      paid: 700,
      status: "Due",
      dueAmount: 190,
    },
    {
      id: "INV-2900573",
      date: "9th Oct 2023",
      patient: "Michael Knight",
      phone: "6975855620",
      total: 800,
      paid: 800,
      status: "Refunded",
    },
  ]);

  const [advanceDeposits, setAdvanceDeposits] = useState<AdvanceDeposit[]>([
    {
      id: "ADV-001",
      date: "9th Oct 2023",
      patient: "John Smith",
      phone: "9876543210",
      amount: 1000,
      balance: 750,
      status: "Active",
    },
    {
      id: "ADV-002",
      date: "8th Oct 2023",
      patient: "Sarah Johnson",
      phone: "8765432109",
      amount: 2000,
      balance: 2000,
      status: "Active",
    },
    {
      id: "ADV-003",
      date: "7th Oct 2023",
      patient: "Mike Wilson",
      phone: "7654321098",
      amount: 500,
      balance: 0,
      status: "Active",
    },
    {
      id: "ADV-004",
      date: "6th Oct 2023",
      patient: "Emma Davis",
      phone: "6543210987",
      amount: 1500,
      balance: 500,
      status: "Active",
    },
  ]);

  const [newBill, setNewBill] = useState<NewBillForm>({
    patientName: "",
    phone: "",
    totalAmount: "",
    paidAmount: "",
    billDate: new Date().toISOString().split('T')[0],
  });

  // Filter bills based on search and filters
  const filteredBills = bills.filter(bill => {
    // Search query filter
    const matchesSearch = searchQuery === "" || 
      bill.patient.toLowerCase().includes(searchQuery.toLowerCase()) ||
      bill.phone.includes(searchQuery) ||
      bill.id.toLowerCase().includes(searchQuery.toLowerCase());
    
    if (!matchesSearch) return false;

    // Advanced filters
    const matchesBillNo = filterOptions.billNo === "" || 
      bill.id.toLowerCase().includes(filterOptions.billNo.toLowerCase());
    
    const matchesDateFrom = filterOptions.dateFrom === "" || 
      new Date(bill.date) >= new Date(filterOptions.dateFrom);
    
    const matchesDateTo = filterOptions.dateTo === "" || 
      new Date(bill.date) <= new Date(filterOptions.dateTo);
    
    const matchesPatientName = filterOptions.patientName === "" || 
      bill.patient.toLowerCase().includes(filterOptions.patientName.toLowerCase());
    
    const matchesPatientPhone = filterOptions.patientPhone === "" || 
      bill.phone.includes(filterOptions.patientPhone);
    
    const matchesStatus = filterOptions.status.length === 0 || 
      filterOptions.status.includes(bill.status);

    return matchesBillNo && matchesDateFrom && matchesDateTo && 
           matchesPatientName && matchesPatientPhone && matchesStatus;
  }).sort((a, b) => {
    if (filterOptions.sortOrder === "asc") {
      return new Date(a.date).getTime() - new Date(b.date).getTime();
    } else if (filterOptions.sortOrder === "desc") {
      return new Date(b.date).getTime() - new Date(a.date).getTime();
    }
    return 0;
  });

  const filteredAdvances = advanceDeposits.filter(deposit => 
    deposit.patient.toLowerCase().includes(searchQuery.toLowerCase()) ||
    deposit.phone.includes(searchQuery) ||
    deposit.id.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Calculate statistics
  const totalPaid = bills.reduce((sum, bill) => sum + bill.paid, 0);
  const totalAmount = bills.reduce((sum, bill) => sum + bill.total, 0);
  const totalDue = bills
    .filter((bill) => bill.status === "Due")
    .reduce((sum, bill) => sum + (bill.dueAmount || 0), 0);

  // Calculate advance statistics
  const totalAdvance = advanceDeposits.reduce((sum, dep) => sum + dep.amount, 0);
  const activeAdvances = advanceDeposits.filter(d => d.status === "Active").length;

  const handleCreateBill = () => {
    if (!newBill.patientName || !newBill.phone || !newBill.totalAmount) return;

    const total = parseFloat(newBill.totalAmount);
    const paid = parseFloat(newBill.paidAmount) || 0;
    const due = total - paid;
    
    const newBillEntry: Bill = {
      id: `INV-${Math.floor(Math.random() * 10000000)}`,
      date: new Date(newBill.billDate).toLocaleDateString('en-US', { 
        day: 'numeric', 
        month: 'short', 
        year: 'numeric' 
      }).replace(',', ''),
      patient: newBill.patientName,
      phone: newBill.phone,
      total: total,
      paid: paid,
      status: due === 0 ? "Paid fully" : due > 0 ? "Due" : "Refunded",
      dueAmount: due > 0 ? due : undefined,
    };

    setBills([newBillEntry, ...bills]);
    setShowCreateModal(false);
    setNewBill({
      patientName: "",
      phone: "",
      totalAmount: "",
      paidAmount: "",
      billDate: new Date().toISOString().split('T')[0],
    });
  };

  const handleApplyFilters = () => {
    setShowFilters(false);
    setOpenFilterSection(null);
  };

  const handleClearFilters = () => {
    setFilterOptions({
      billNo: "",
      dateFrom: "",
      dateTo: "",
      sortOrder: null,
      patientName: "",
      patientPhone: "",
      status: [],
    });
  };

  const handleStatusToggle = (status: string) => {
    setFilterOptions(prev => ({
      ...prev,
      status: prev.status.includes(status)
        ? prev.status.filter(s => s !== status)
        : [...prev.status, status]
    }));
  };

  const toggleFilterSection = (section: string) => {
    setOpenFilterSection(openFilterSection === section ? null : section);
  };

  const getStatusColor = (status: string, dueAmount?: number) => {
    switch(status) {
      case "Paid fully":
        return "bg-emerald-50 text-emerald-700 border-emerald-200";
      case "Due":
        return "bg-amber-50 text-amber-700 border-amber-200";
      case "Refunded":
        return "bg-rose-50 text-rose-700 border-rose-200";
      default:
        return "bg-slate-50 text-slate-700 border-slate-200";
    }
  };

  const getStatusText = (bill: Bill) => {
    if (bill.status === "Due") {
      return `Due: £${bill.dueAmount}`;
    }
    return bill.status;
  };

  const menuItems = [
    { id: "dashboard", icon: "dashboard", label: "Dashboard", component: <div>Dashboard Content</div> },
    { id: "billing", icon: "receipt", label: "Billing", count: bills.length, component: <div>Billing Content</div> },
    { id: "advances", icon: "account_balance", label: "Advances", count: advanceDeposits.length, component: <div>Advances Content</div> },
    { id: "patients", icon: "people", label: "Patients", component: <div>Patients Content</div> },
    { id: "settings", icon: "settings", label: "Settings", component: <div>Settings Content</div> },
    { id: "reports", icon: "bar_chart", label: "Reports", component: <div>Reports Content</div> },
  ];

  const getActiveComponent = () => {
    const activeItem = menuItems.find(item => item.id === activeMenuItem);
    return activeItem?.component || menuItems[1].component;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex">
      {/* Material Icons */}
      <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet" />

      {/* Sidebar */}
      <div 
        className={`${
          sidebarCollapsed ? 'w-20' : 'w-64'
        } bg-white border-r border-slate-200 hidden md:flex flex-col transition-all duration-300 ease-in-out fixed h-full z-20`}
      >
        {/* Sidebar Header */}
        <div className="p-4 border-b border-slate-200 flex items-center justify-between">
          {!sidebarCollapsed && (
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center">
                <span className="material-icons text-white text-sm">receipt</span>
              </div>
              <span className="font-bold text-slate-800">OPD Billing</span>
            </div>
          )}
          {sidebarCollapsed && (
            <div className="w-full flex justify-center">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center">
                <span className="material-icons text-white text-sm">receipt</span>
              </div>
            </div>
          )}
          <button
            onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
            className="p-1 rounded-lg hover:bg-slate-100 text-slate-600"
          >
            <span className="material-icons text-sm">
              {sidebarCollapsed ? 'chevron_right' : 'chevron_left'}
            </span>
          </button>
        </div>

        {/* Sidebar Menu */}
        <div className="flex-1 py-4">
          {menuItems.map((item) => (
            <div
              key={item.id}
              onClick={() => setActiveMenuItem(item.id)}
              className={`px-4 py-3 mx-2 rounded-lg flex items-center gap-3 cursor-pointer transition-colors relative ${
                activeMenuItem === item.id 
                  ? 'bg-slate-100 text-slate-900' 
                  : 'text-slate-600 hover:bg-slate-50'
              }`}
            >
              <span className="material-icons text-lg">{item.icon}</span>
              {!sidebarCollapsed && (
                <>
                  <span className="text-sm font-medium flex-1">{item.label}</span>
                  {item.count && (
                    <span className="text-xs px-2 py-1 rounded-full bg-slate-100 text-slate-600">
                      {item.count}
                    </span>
                  )}
                </>
              )}
              {sidebarCollapsed && item.count && (
                <span className="absolute left-12 top-1/2 -translate-y-1/2 text-xs px-1.5 py-0.5 rounded-full bg-slate-200 text-slate-600">
                  {item.count}
                </span>
              )}
            </div>
          ))}
        </div>

        {/* Sidebar Footer */}
        <div className="p-4 border-t border-slate-200">
          <div className={`flex items-center gap-3 ${sidebarCollapsed ? 'justify-center' : ''}`}>
            <div className="w-8 h-8 bg-slate-200 rounded-full flex items-center justify-center">
              <span className="material-icons text-slate-600 text-sm">person</span>
            </div>
            {!sidebarCollapsed && (
              <div className="flex-1">
                <p className="text-sm font-medium text-slate-800">Dr. Smith</p>
                <p className="text-xs text-slate-500">Admin</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className={`flex-1 transition-all duration-300 ${sidebarCollapsed ? 'md:ml-20' : 'md:ml-64'}`}>
        {/* Header */}
        <div className="sticky top-0 z-10 bg-white/80 backdrop-blur-md border-b border-slate-200 px-4 py-3 md:px-6 md:py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 md:gap-3">
              {/* Mobile Menu Button */}
              <button
                onClick={() => setShowMobileMenu(!showMobileMenu)}
                className="md:hidden p-2 rounded-lg bg-slate-100 text-slate-600"
              >
                <span className="material-icons">menu</span>
              </button>
              
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 md:w-10 md:h-10 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-lg md:rounded-xl flex items-center justify-center shadow-lg shadow-blue-600/20 md:hidden">
                  <span className="material-icons text-white text-lg md:text-xl">receipt</span>
                </div>
                <div>
                  <h1 className="text-lg md:text-2xl font-bold text-slate-800">OPD Billing</h1>
                  <p className="text-xs md:text-sm text-slate-500 hidden sm:block">Manage bills and advance deposits</p>
                </div>
              </div>
            </div>
            
            {/* Desktop Create Button */}
            <button
              onClick={() => setShowCreateModal(true)}
              className="hidden md:flex text-blue-600 hover:text-blue-800 px-5 py-2.5 rounded-xl font-medium text-sm transition-all items-center gap-2"
            >
              <span className="material-icons text-sm">add</span>
              Create New Bill
            </button>
          </div>

          {/* Mobile Menu */}
          {showMobileMenu && (
            <div className="md:hidden mt-3 p-3 bg-white rounded-lg border border-slate-200 shadow-lg">
              {menuItems.map((item) => (
                <div
                  key={item.id}
                  onClick={() => {
                    setActiveMenuItem(item.id);
                    setShowMobileMenu(false);
                  }}
                  className={`px-4 py-3 rounded-lg flex items-center gap-3 cursor-pointer ${
                    activeMenuItem === item.id ? 'bg-slate-100 text-slate-900' : 'text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  <span className="material-icons">{item.icon}</span>
                  <span className="text-sm font-medium flex-1">{item.label}</span>
                  {item.count && (
                    <span className="text-xs px-2 py-1 rounded-full bg-slate-100 text-slate-600">
                      {item.count}
                    </span>
                  )}
                </div>
              ))}
              <div className="border-t border-slate-200 mt-2 pt-2">
                <div className="px-4 py-3 flex items-center gap-3">
                  <div className="w-8 h-8 bg-slate-200 rounded-full flex items-center justify-center">
                    <span className="material-icons text-slate-600 text-sm">person</span>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-slate-800">Dr. Smith</p>
                    <p className="text-xs text-slate-500">Admin</p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Main Content Area */}
        <div className="p-3 md:p-6 relative">
          {/* Dashboard Stats Cards */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 md:gap-4 mb-4 md:mb-6">
            <div className="bg-white rounded-lg md:rounded-xl border border-slate-200 p-3 md:p-4">
              <div className="flex items-center gap-2 md:gap-3 mb-2">
                <div className="w-7 h-7 md:w-8 md:h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                  <span className="material-icons text-blue-600 text-sm md:text-base">receipt</span>
                </div>
                <p className="text-xs md:text-sm font-medium text-slate-600">Total Bills</p>
              </div>
              <p className="text-lg md:text-2xl font-bold text-slate-800">{bills.length}</p>
              <p className="text-[10px] md:text-xs text-slate-500 mt-1">+2 this week</p>
            </div>

            <div className="bg-white rounded-lg md:rounded-xl border border-slate-200 p-3 md:p-4">
              <div className="flex items-center gap-2 md:gap-3 mb-2">
                <div className="w-7 h-7 md:w-8 md:h-8 bg-emerald-100 rounded-lg flex items-center justify-center">
                  <span className="material-icons text-emerald-600 text-sm md:text-base">account_balance_wallet</span>
                </div>
                <p className="text-xs md:text-sm font-medium text-slate-600">Total Revenue</p>
              </div>
              <p className="text-lg md:text-2xl font-bold text-slate-800">£{totalPaid.toLocaleString()}</p>
              <p className="text-[10px] md:text-xs text-slate-500 mt-1">of £{totalAmount.toLocaleString()}</p>
            </div>

            <div className="bg-white rounded-lg md:rounded-xl border border-slate-200 p-3 md:p-4">
              <div className="flex items-center gap-2 md:gap-3 mb-2">
                <div className="w-7 h-7 md:w-8 md:h-8 bg-amber-100 rounded-lg flex items-center justify-center">
                  <span className="material-icons text-amber-600 text-sm md:text-base">pending</span>
                </div>
                <p className="text-xs md:text-sm font-medium text-slate-600">Pending</p>
              </div>
              <p className="text-lg md:text-2xl font-bold text-slate-800">£{totalDue.toLocaleString()}</p>
              <p className="text-[10px] md:text-xs text-slate-500 mt-1">{bills.filter(b => b.status === "Due").length} payments</p>
            </div>

            <div className="bg-white rounded-lg md:rounded-xl border border-slate-200 p-3 md:p-4">
              <div className="flex items-center gap-2 md:gap-3 mb-2">
                <div className="w-7 h-7 md:w-8 md:h-8 bg-purple-100 rounded-lg flex items-center justify-center">
                  <span className="material-icons text-purple-600 text-sm md:text-base">account_balance</span>
                </div>
                <p className="text-xs md:text-sm font-medium text-slate-600">Advances</p>
              </div>
              <p className="text-lg md:text-2xl font-bold text-slate-800">£{totalAdvance.toLocaleString()}</p>
              <p className="text-[10px] md:text-xs text-slate-500 mt-1">{activeAdvances} active</p>
            </div>
          </div>

          {/* Tabs */}
          <div className="flex gap-1 mb-4 md:mb-6 bg-white/50 p-1 rounded-lg md:rounded-xl w-full overflow-x-auto">
            <button
              onClick={() => setActiveTab("selling")}
              className={`flex-1 md:flex-none px-3 md:px-5 py-2 md:py-2.5 rounded-lg text-xs md:text-sm font-medium transition-all flex items-center justify-center gap-1 md:gap-2 whitespace-nowrap ${
                activeTab === "selling"
                  ? 'bg-slate-100 text-slate-900'
                  : 'text-slate-600 hover:bg-slate-50'
              }`}
            >
              <span className="material-icons text-xs md:text-sm">shopping_cart</span>
              <span>Billing ({bills.length})</span>
            </button>
            <button
              onClick={() => setActiveTab("advance")}
              className={`flex-1 md:flex-none px-3 md:px-5 py-2 md:py-2.5 rounded-lg text-xs md:text-sm font-medium transition-all flex items-center justify-center gap-1 md:gap-2 whitespace-nowrap ${
                activeTab === "advance"
                  ? 'bg-slate-100 text-slate-900'
                  : 'text-slate-600 hover:bg-slate-50'
              }`}
            >
              <span className="material-icons text-xs md:text-sm">account_balance</span>
              <span>Advance ({advanceDeposits.length})</span>
            </button>
          </div>

          {/* Search Bar with Filter Button */}
          <div className="mb-4 md:mb-6 relative">
            <div className="flex gap-2">
              <div className="relative flex-1">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 material-icons text-slate-400 text-base md:text-lg">
                  search
                </span>
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search by name / phone / bill no."
                  className="w-full pl-9 md:pl-10 pr-8 md:pr-10 py-2.5 md:py-3 bg-white border border-slate-200 rounded-lg md:rounded-xl text-xs md:text-sm focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600 transition-all shadow-sm"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery("")}
                    className="absolute right-2 md:right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                  >
                    <span className="material-icons text-sm md:text-base">close</span>
                  </button>
                )}
              </div>
              <button
                onClick={() => setShowFilters(!showFilters)}
                className={`px-3 md:px-4 py-2.5 md:py-3 rounded-lg md:rounded-xl border transition-all flex items-center justify-center gap-1 md:gap-2 ${
                  showFilters || Object.values(filterOptions).some(v => 
                    Array.isArray(v) ? v.length > 0 : v !== "" && v !== null
                  )
                    ? 'bg-blue-600 border-blue-600 text-white'
                    : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
                }`}
              >
                <span className="material-icons text-sm md:text-base">filter_list</span>
                <span className="text-xs md:text-sm hidden sm:inline">Filter</span>
                {Object.values(filterOptions).some(v => 
                  Array.isArray(v) ? v.length > 0 : v !== "" && v !== null
                ) && (
                  <span className="ml-1 w-5 h-5 rounded-full bg-white text-blue-600 text-xs flex items-center justify-center font-medium">
                    {Object.values(filterOptions).reduce((count, v) => {
                      if (Array.isArray(v)) return count + v.length;
                      if (v === "asc" || v === "desc") return count + 1;
                      return v !== "" ? count + 1 : count;
                    }, 0)}
                  </span>
                )}
              </button>
            </div>

            {/* Filters Panel - Dropdown Style */}
            {showFilters && (
              <>
                {/* Backdrop to close filters when clicking outside */}
                <div 
                  className="fixed inset-0 z-30"
                  onClick={() => setShowFilters(false)}
                />
                
                <div className="absolute right-0 mt-2 w-72 bg-white rounded-xl border border-slate-200 shadow-xl z-40 overflow-hidden">
                  {/* Header */}
                  <div className="p-4 border-b border-slate-200 bg-slate-50">
                    <h3 className="font-semibold text-slate-800 flex items-center gap-2">
                      <span className="material-icons text-blue-600 text-sm">filter_list</span>
                      Filters
                    </h3>
                  </div>

                  {/* Filter Sections */}
                  <div className="p-3">
                    {/* BILL NO & DATE Section */}
                    <div className="mb-2">
                      <button
                        onClick={() => toggleFilterSection("bill")}
                        className="w-full flex items-center justify-between p-3 hover:bg-slate-50 rounded-lg transition-colors"
                      >
                        <span className="text-sm font-medium text-slate-700">BILL NO & DATE</span>
                        <span className="material-icons text-slate-400 text-sm">
                          {openFilterSection === "bill" ? "expand_less" : "expand_more"}
                        </span>
                      </button>
                      
                      {openFilterSection === "bill" && (
                        <div className="mt-2 p-3 bg-slate-50 rounded-lg space-y-3">
                          <div>
                            <label className="block text-xs font-medium text-slate-500 mb-1">Search Bill</label>
                            <input
                              type="text"
                              value={filterOptions.billNo}
                              onChange={(e) => setFilterOptions({...filterOptions, billNo: e.target.value})}
                              placeholder="Bill number..."
                              className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600"
                            />
                          </div>
                          
                          <div className="grid grid-cols-2 gap-2">
                            <div>
                              <label className="block text-xs font-medium text-slate-500 mb-1">From</label>
                              <input
                                type="date"
                                value={filterOptions.dateFrom}
                                onChange={(e) => setFilterOptions({...filterOptions, dateFrom: e.target.value})}
                                className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600"
                              />
                            </div>
                            <div>
                              <label className="block text-xs font-medium text-slate-500 mb-1">To</label>
                              <input
                                type="date"
                                value={filterOptions.dateTo}
                                onChange={(e) => setFilterOptions({...filterOptions, dateTo: e.target.value})}
                                className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600"
                              />
                            </div>
                          </div>

                          <div>
                            <label className="block text-xs font-medium text-slate-500 mb-2">Sort by Date</label>
                            <div className="flex gap-2">
                              <button
                                onClick={() => setFilterOptions({...filterOptions, sortOrder: "asc"})}
                                className={`flex-1 px-3 py-2 rounded-lg text-sm flex items-center justify-center gap-1 ${
                                  filterOptions.sortOrder === "asc"
                                    ? 'bg-blue-600 text-white'
                                    : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
                                }`}
                              >
                                <span className="material-icons text-sm">arrow_upward</span>
                                Asc
                              </button>
                              <button
                                onClick={() => setFilterOptions({...filterOptions, sortOrder: "desc"})}
                                className={`flex-1 px-3 py-2 rounded-lg text-sm flex items-center justify-center gap-1 ${
                                  filterOptions.sortOrder === "desc"
                                    ? 'bg-blue-600 text-white'
                                    : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
                                }`}
                              >
                                <span className="material-icons text-sm">arrow_downward</span>
                                Desc
                              </button>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>

                    {/* PATIENT DETAILS Section */}
                    <div className="mb-2">
                      <button
                        onClick={() => toggleFilterSection("patient")}
                        className="w-full flex items-center justify-between p-3 hover:bg-slate-50 rounded-lg transition-colors"
                      >
                        <span className="text-sm font-medium text-slate-700">PATIENT DETAILS</span>
                        <span className="material-icons text-slate-400 text-sm">
                          {openFilterSection === "patient" ? "expand_less" : "expand_more"}
                        </span>
                      </button>
                      
                      {openFilterSection === "patient" && (
                        <div className="mt-2 p-3 bg-slate-50 rounded-lg space-y-3">
                          <div>
                            <label className="block text-xs font-medium text-slate-500 mb-1">Search Patient</label>
                            <input
                              type="text"
                              value={filterOptions.patientName}
                              onChange={(e) => setFilterOptions({...filterOptions, patientName: e.target.value})}
                              placeholder="Name or ID..."
                              className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600"
                            />
                          </div>
                          <div>
                            <label className="block text-xs font-medium text-slate-500 mb-1">Phone Number</label>
                            <input
                              type="text"
                              value={filterOptions.patientPhone}
                              onChange={(e) => setFilterOptions({...filterOptions, patientPhone: e.target.value})}
                              placeholder="Phone number..."
                              className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600"
                            />
                          </div>
                        </div>
                      )}
                    </div>

                    {/* STATUS Section */}
                    <div className="mb-2">
                      <button
                        onClick={() => toggleFilterSection("status")}
                        className="w-full flex items-center justify-between p-3 hover:bg-slate-50 rounded-lg transition-colors"
                      >
                        <span className="text-sm font-medium text-slate-700">STATUS</span>
                        <span className="material-icons text-slate-400 text-sm">
                          {openFilterSection === "status" ? "expand_less" : "expand_more"}
                        </span>
                      </button>
                      
                      {openFilterSection === "status" && (
                        <div className="mt-2 p-3 bg-slate-50 rounded-lg space-y-2">
                          {["Paid fully", "Due", "Refunded"].map((status) => (
                            <div
                              key={status}
                              onClick={() => handleStatusToggle(status)}
                              className="flex items-center justify-between p-2 hover:bg-white rounded-lg cursor-pointer"
                            >
                              <span className="text-sm text-slate-700">{status}</span>
                              <div className={`w-5 h-5 rounded border flex items-center justify-center ${
                                filterOptions.status.includes(status)
                                  ? 'bg-blue-600 border-blue-600'
                                  : 'border-slate-300 bg-white'
                              }`}>
                                {filterOptions.status.includes(status) && (
                                  <span className="material-icons text-white text-sm">check</span>
                                )}
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Filter Actions */}
                  <div className="flex justify-end gap-2 p-4 border-t border-slate-200 bg-slate-50">
                    <button
                      onClick={handleClearFilters}
                      className="px-4 py-2 text-sm font-medium text-slate-600 hover:text-slate-800"
                    >
                      Clear
                    </button>
                    <button
                      onClick={handleApplyFilters}
                      className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700"
                    >
                      Apply Filters
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>

          {/* Dynamic Content based on active menu item */}
          {activeMenuItem === "billing" ? (
            <>
              {/* Selling Tab Content */}
              {activeTab === "selling" && (
                <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
                  {/* Desktop Table Header */}
                  <div className="hidden md:grid grid-cols-12 divide-x divide-slate-200 bg-slate-50 border-b border-slate-200 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                    <div className="col-span-1 px-6 py-4">#</div>
                    <div className="col-span-2 px-6 py-4">BILL NO & DATE</div>
                    <div className="col-span-3 px-6 py-4">PATIENT DETAILS</div>
                    <div className="col-span-1 px-6 py-4 text-right">TOTAL (£)</div>
                    <div className="col-span-1 px-6 py-4 text-right">PAID (£)</div>
                    <div className="col-span-3 px-6 py-4">STATUS</div>
                    <div className="col-span-1 px-6 py-4 text-center">ACTION</div>
                  </div>

                  {/* Mobile/Desktop Rows */}
                  {filteredBills.length > 0 ? (
                    filteredBills.map((bill, index) => (
                      <div key={bill.id}>
                        {/* Desktop View */}
                        <div className="hidden md:grid grid-cols-12 divide-x divide-slate-200 hover:bg-slate-50 transition-colors">
                          <div className="col-span-1 px-6 py-4 text-sm text-slate-500">{index + 1}</div>
                          
                          <div className="col-span-2 px-6 py-4">
                            <p className="font-medium text-slate-800">{bill.id}</p>
                            <p className="text-xs text-slate-500 flex items-center gap-1 mt-0.5">
                              <span className="material-icons text-xs">calendar_today</span>
                              {bill.date}
                            </p>
                          </div>

                          <div className="col-span-3 px-6 py-4">
                            <p className="font-medium text-slate-800">{bill.patient}</p>
                            <p className="text-xs text-slate-500 flex items-center gap-1 mt-0.5">
                              <span className="material-icons text-xs">phone</span>
                              {bill.phone}
                            </p>
                          </div>

                          <div className="col-span-1 px-6 py-4 text-right">
                            <p className="font-medium text-slate-800">£{bill.total.toLocaleString()}</p>
                          </div>

                          <div className="col-span-1 px-6 py-4 text-right">
                            <p className="font-medium text-slate-800">£{bill.paid.toLocaleString()}</p>
                          </div>

                          <div className="col-span-3 px-6 py-4">
                            <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(bill.status, bill.dueAmount)}`}>
                              {getStatusText(bill)}
                            </span>
                          </div>

                          <div className="col-span-1 px-6 py-4 flex items-center justify-center">
                            <button 
                              onClick={() => setSelectedBill(bill)}
                              className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                            >
                              View
                            </button>
                          </div>
                        </div>

                        {/* Mobile Card View */}
                        <div className="md:hidden p-4 border-b border-slate-100 hover:bg-slate-50">
                          <div className="flex justify-between items-start mb-2">
                            <div>
                              <p className="font-semibold text-slate-800">{bill.patient}</p>
                              <p className="text-xs text-slate-500 flex items-center gap-1 mt-0.5">
                                <span className="material-icons text-xs">phone</span>
                                {bill.phone}
                              </p>
                            </div>
                            <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(bill.status, bill.dueAmount)}`}>
                              {getStatusText(bill)}
                            </span>
                          </div>
                          
                          <div className="grid grid-cols-2 gap-2 mt-3 text-xs">
                            <div>
                              <p className="text-slate-500">Bill No.</p>
                              <p className="font-medium text-slate-800">{bill.id}</p>
                            </div>
                            <div>
                              <p className="text-slate-500">Date</p>
                              <p className="font-medium text-slate-800">{bill.date}</p>
                            </div>
                            <div>
                              <p className="text-slate-500">Total</p>
                              <p className="font-medium text-slate-800">£{bill.total.toLocaleString()}</p>
                            </div>
                            <div>
                              <p className="text-slate-500">Paid</p>
                              <p className="font-medium text-slate-800">£{bill.paid.toLocaleString()}</p>
                            </div>
                          </div>
                          
                          <div className="flex justify-end mt-3">
                            <button 
                              onClick={() => setSelectedBill(bill)}
                              className="text-blue-600 text-sm font-medium flex items-center gap-1"
                            >
                              View Details
                              <span className="material-icons text-sm">chevron_right</span>
                            </button>
                          </div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="px-4 md:px-6 py-8 md:py-12 text-center">
                      <div className="w-12 h-12 md:w-16 md:h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-3 md:mb-4">
                        <span className="material-icons text-slate-400 text-2xl md:text-3xl">receipt</span>
                      </div>
                      <h3 className="text-sm md:text-base font-semibold text-slate-800 mb-1">No bills found</h3>
                      <p className="text-xs md:text-sm text-slate-500">Try adjusting your search or filters</p>
                    </div>
                  )}
                </div>
              )}

              {/* Advance Deposit Tab */}
              {activeTab === "advance" && (
                <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
                  {/* Desktop Table Header */}
                  <div className="hidden md:grid grid-cols-12 divide-x divide-slate-200 bg-slate-50 border-b border-slate-200 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                    <div className="col-span-1 px-6 py-4">#</div>
                    <div className="col-span-3 px-6 py-4">ADVANCE NO & DATE</div>
                    <div className="col-span-3 px-6 py-4">PATIENT DETAILS</div>
                    <div className="col-span-2 px-6 py-4 text-right">DEPOSIT (£)</div>
                    <div className="col-span-2 px-6 py-4 text-right">BALANCE (£)</div>
                    <div className="col-span-1 px-6 py-4 text-center">ACTION</div>
                  </div>

                  {/* Mobile/Desktop Rows */}
                  {filteredAdvances.length > 0 ? (
                    filteredAdvances.map((deposit, index) => (
                      <div key={deposit.id}>
                        {/* Desktop View */}
                        <div className="hidden md:grid grid-cols-12 divide-x divide-slate-200 hover:bg-slate-50 transition-colors">
                          <div className="col-span-1 px-6 py-4 text-sm text-slate-500">{index + 1}</div>
                          
                          <div className="col-span-3 px-6 py-4">
                            <p className="font-medium text-slate-800">{deposit.id}</p>
                            <p className="text-xs text-slate-500 flex items-center gap-1 mt-0.5">
                              <span className="material-icons text-xs">calendar_today</span>
                              {deposit.date}
                            </p>
                          </div>

                          <div className="col-span-3 px-6 py-4">
                            <p className="font-medium text-slate-800">{deposit.patient}</p>
                            <p className="text-xs text-slate-500 flex items-center gap-1 mt-0.5">
                              <span className="material-icons text-xs">phone</span>
                              {deposit.phone}
                            </p>
                          </div>

                          <div className="col-span-2 px-6 py-4 text-right">
                            <p className="font-medium text-slate-800">£{deposit.amount.toLocaleString()}</p>
                          </div>

                          <div className="col-span-2 px-6 py-4 text-right">
                            <p className="font-medium text-slate-800">£{deposit.balance.toLocaleString()}</p>
                          </div>

                          <div className="col-span-1 px-6 py-4 flex flex-col items-center justify-center gap-1">
                            <button className="text-blue-600 hover:text-blue-800 text-sm font-medium whitespace-nowrap">
                              View
                            </button>
                            {deposit.status === "Active" && (
                              <div className="flex items-center gap-1">
                                <span className="w-2 h-2 bg-emerald-500 rounded-full"></span>
                                <span className="text-xs text-emerald-600">Active</span>
                              </div>
                            )}
                          </div>
                        </div>

                        {/* Mobile Card View */}
                        <div className="md:hidden p-4 border-b border-slate-100 hover:bg-slate-50">
                          <div className="flex justify-between items-start mb-2">
                            <div>
                              <p className="font-semibold text-slate-800">{deposit.patient}</p>
                              <p className="text-xs text-slate-500 flex items-center gap-1 mt-0.5">
                                <span className="material-icons text-xs">phone</span>
                                {deposit.phone}
                              </p>
                            </div>
                            {deposit.status === "Active" && (
                              <div className="flex items-center gap-1 bg-emerald-50 px-2 py-1 rounded-full">
                                <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full"></span>
                                <span className="text-xs text-emerald-600">Active</span>
                              </div>
                            )}
                          </div>
                          
                          <div className="grid grid-cols-2 gap-2 mt-3 text-xs">
                            <div>
                              <p className="text-slate-500">Advance No.</p>
                              <p className="font-medium text-slate-800">{deposit.id}</p>
                            </div>
                            <div>
                              <p className="text-slate-500">Date</p>
                              <p className="font-medium text-slate-800">{deposit.date}</p>
                            </div>
                            <div>
                              <p className="text-slate-500">Deposit</p>
                              <p className="font-medium text-slate-800">£{deposit.amount.toLocaleString()}</p>
                            </div>
                            <div>
                              <p className="text-slate-500">Balance</p>
                              <p className="font-medium text-slate-800">£{deposit.balance.toLocaleString()}</p>
                            </div>
                          </div>
                          
                          <div className="flex justify-end mt-3">
                            <button className="text-blue-600 text-sm font-medium flex items-center gap-1">
                              View Details
                              <span className="material-icons text-sm">chevron_right</span>
                            </button>
                          </div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="px-4 md:px-6 py-8 md:py-12 text-center">
                      <div className="w-12 h-12 md:w-16 md:h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-3 md:mb-4">
                        <span className="material-icons text-slate-400 text-2xl md:text-3xl">account_balance</span>
                      </div>
                      <h3 className="text-sm md:text-base font-semibold text-slate-800 mb-1">No advances found</h3>
                      <p className="text-xs md:text-sm text-slate-500">Try adjusting your search</p>
                    </div>
                  )}
                </div>
              )}
            </>
          ) : (
            // Content for other menu items
            <div className="bg-white rounded-xl border border-slate-200 p-8 text-center">
              <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="material-icons text-slate-400 text-3xl">
                  {menuItems.find(item => item.id === activeMenuItem)?.icon}
                </span>
              </div>
              <h3 className="text-lg font-semibold text-slate-800 mb-2">
                {menuItems.find(item => item.id === activeMenuItem)?.label} Section
              </h3>
              <p className="text-sm text-slate-500">
                This section is under development. Check back soon!
              </p>
            </div>
          )}

          {/* Bill Details Modal */}
          {selectedBill && (
            <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
              <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md">
                <div className="p-6">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-bold text-slate-800">Bill Details</h3>
                    <button
                      onClick={() => setSelectedBill(null)}
                      className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center text-slate-600"
                    >
                      <span className="material-icons">close</span>
                    </button>
                  </div>
                  
                  <div className="space-y-3">
                    <div className="flex justify-between py-2 border-b border-slate-100">
                      <span className="text-slate-500">Bill No.</span>
                      <span className="font-medium text-slate-800">{selectedBill.id}</span>
                    </div>
                    <div className="flex justify-between py-2 border-b border-slate-100">
                      <span className="text-slate-500">Date</span>
                      <span className="font-medium text-slate-800">{selectedBill.date}</span>
                    </div>
                    <div className="flex justify-between py-2 border-b border-slate-100">
                      <span className="text-slate-500">Patient</span>
                      <span className="font-medium text-slate-800">{selectedBill.patient}</span>
                    </div>
                    <div className="flex justify-between py-2 border-b border-slate-100">
                      <span className="text-slate-500">Phone</span>
                      <span className="font-medium text-slate-800">{selectedBill.phone}</span>
                    </div>
                    <div className="flex justify-between py-2 border-b border-slate-100">
                      <span className="text-slate-500">Total Amount</span>
                      <span className="font-medium text-slate-800">£{selectedBill.total.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between py-2 border-b border-slate-100">
                      <span className="text-slate-500">Paid Amount</span>
                      <span className="font-medium text-slate-800">£{selectedBill.paid.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between py-2">
                      <span className="text-slate-500">Status</span>
                      <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(selectedBill.status, selectedBill.dueAmount)}`}>
                        {getStatusText(selectedBill)}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Mobile Create Bill Button */}
      <button
        onClick={() => setShowCreateModal(true)}
        className="md:hidden fixed bottom-4 right-4 w-14 h-14 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-full shadow-lg shadow-blue-600/25 flex items-center justify-center z-30"
      >
        <span className="material-icons text-2xl">add</span>
      </button>

      {/* Create Bill Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
            <div className="p-4 md:p-6">
              <div className="flex justify-between items-center mb-4 md:mb-6">
                <div className="flex items-center gap-2 md:gap-3">
                  <div className="w-8 h-8 md:w-10 md:h-10 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-lg md:rounded-xl flex items-center justify-center">
                    <span className="material-icons text-white text-lg md:text-xl">receipt</span>
                  </div>
                  <div>
                    <h2 className="text-lg md:text-2xl font-bold text-slate-800">Create New Bill</h2>
                    <p className="text-xs md:text-sm text-slate-500">Enter bill details below</p>
                  </div>
                </div>
                <button
                  onClick={() => setShowCreateModal(false)}
                  className="w-7 h-7 md:w-8 md:h-8 rounded-lg bg-slate-100 flex items-center justify-center text-slate-600 hover:bg-slate-200"
                >
                  <span className="material-icons text-sm md:text-base">close</span>
                </button>
              </div>

              <div className="space-y-3 md:space-y-5">
                {/* Patient Name */}
                <div>
                  <label className="block text-[10px] md:text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1 md:mb-2">
                    Patient Name *
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 material-icons text-slate-400 text-xs md:text-sm">person</span>
                    <input
                      type="text"
                      value={newBill.patientName}
                      onChange={(e) => setNewBill({...newBill, patientName: e.target.value})}
                      className="w-full pl-8 md:pl-10 pr-3 md:pr-4 py-2 md:py-3 bg-white border border-slate-200 rounded-lg md:rounded-xl text-xs md:text-sm focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600"
                      placeholder="Enter patient name"
                    />
                  </div>
                </div>

                {/* Phone Number */}
                <div>
                  <label className="block text-[10px] md:text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1 md:mb-2">
                    Phone Number *
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 material-icons text-slate-400 text-xs md:text-sm">phone</span>
                    <input
                      type="tel"
                      value={newBill.phone}
                      onChange={(e) => setNewBill({...newBill, phone: e.target.value})}
                      className="w-full pl-8 md:pl-10 pr-3 md:pr-4 py-2 md:py-3 bg-white border border-slate-200 rounded-lg md:rounded-xl text-xs md:text-sm focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600"
                      placeholder="Enter phone number"
                    />
                  </div>
                </div>

                {/* Bill Date */}
                <div>
                  <label className="block text-[10px] md:text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1 md:mb-2">
                    Bill Date *
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 material-icons text-slate-400 text-xs md:text-sm">calendar_today</span>
                    <input
                      type="date"
                      value={newBill.billDate}
                      onChange={(e) => setNewBill({...newBill, billDate: e.target.value})}
                      className="w-full pl-8 md:pl-10 pr-3 md:pr-4 py-2 md:py-3 bg-white border border-slate-200 rounded-lg md:rounded-xl text-xs md:text-sm focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600"
                    />
                  </div>
                </div>

                {/* Total Amount */}
                <div>
                  <label className="block text-[10px] md:text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1 md:mb-2">
                    Total Amount (£) *
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 material-icons text-slate-400 text-xs md:text-sm">payments</span>
                    <input
                      type="number"
                      value={newBill.totalAmount}
                      onChange={(e) => setNewBill({...newBill, totalAmount: e.target.value})}
                      className="w-full pl-8 md:pl-10 pr-3 md:pr-4 py-2 md:py-3 bg-white border border-slate-200 rounded-lg md:rounded-xl text-xs md:text-sm focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600"
                      placeholder="Enter total amount"
                      min="0"
                      step="1"
                    />
                  </div>
                </div>

                {/* Paid Amount */}
                <div>
                  <label className="block text-[10px] md:text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1 md:mb-2">
                    Paid Amount (£)
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 material-icons text-slate-400 text-xs md:text-sm">account_balance_wallet</span>
                    <input
                      type="number"
                      value={newBill.paidAmount}
                      onChange={(e) => setNewBill({...newBill, paidAmount: e.target.value})}
                      className="w-full pl-8 md:pl-10 pr-3 md:pr-4 py-2 md:py-3 bg-white border border-slate-200 rounded-lg md:rounded-xl text-xs md:text-sm focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600"
                      placeholder="Enter paid amount"
                      min="0"
                      step="1"
                    />
                  </div>
                </div>

                {/* Preview */}
                {newBill.totalAmount && (
                  <div className="bg-gradient-to-br from-slate-50 to-slate-100 p-3 md:p-4 rounded-lg md:rounded-xl border border-slate-200">
                    <h4 className="text-[10px] md:text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2 md:mb-3">Summary</h4>
                    <div className="space-y-1 md:space-y-2">
                      <div className="flex justify-between text-xs md:text-sm">
                        <span className="text-slate-600">Total:</span>
                        <span className="font-semibold text-slate-800">£{parseFloat(newBill.totalAmount).toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between text-xs md:text-sm">
                        <span className="text-slate-600">Paid:</span>
                        <span className="font-semibold text-slate-800">£{parseFloat(newBill.paidAmount || '0').toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between text-xs md:text-sm pt-1 md:pt-2 border-t border-slate-200">
                        <span className="text-slate-600">Due:</span>
                        <span className={`font-semibold ${(parseFloat(newBill.totalAmount) - parseFloat(newBill.paidAmount || '0')) > 0 ? 'text-amber-600' : 'text-emerald-600'}`}>
                          £{(parseFloat(newBill.totalAmount) - parseFloat(newBill.paidAmount || '0')).toLocaleString()}
                        </span>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              <div className="flex justify-end gap-2 md:gap-3 mt-4 md:mt-6 pt-3 md:pt-4 border-t border-slate-200">
                <button
                  onClick={() => setShowCreateModal(false)}
                  className="px-3 md:px-5 py-1.5 md:py-2.5 border border-slate-200 text-slate-700 rounded-lg md:rounded-xl hover:bg-slate-50 transition-all text-xs md:text-sm flex items-center gap-1 md:gap-2 bg-white"
                >
                  <span className="material-icons text-xs md:text-sm">close</span>
                  Cancel
                </button>
                <button
                  onClick={handleCreateBill}
                  disabled={!newBill.patientName || !newBill.phone || !newBill.totalAmount}
                  className="px-3 md:px-5 py-1.5 md:py-2.5 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg md:rounded-xl hover:from-blue-700 hover:to-indigo-700 transition-all text-xs md:text-sm flex items-center gap-1 md:gap-2 shadow-lg shadow-blue-600/25 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <span className="material-icons text-xs md:text-sm">add</span>
                  Create Bill
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}