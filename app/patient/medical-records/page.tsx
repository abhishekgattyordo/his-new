// app/patient/medical-records/page.tsx
"use client";

import { useState, useMemo } from "react";
import Sidebar from "@/components/patient/Sidebar";
import Header from "@/components/patient/Header";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Calendar,
  Download,
  Eye,
  FileText,
  FlaskConical,
  HeartPulse,
  Image,
  Pill,
  User,
  ChevronUp,
  ChevronDown,
  Menu,
  X,
  Filter,
} from "lucide-react";

// Types
interface MedicalRecord {
  id: number;
  name: string;
  ref: string;
  doctor: string;
  specialty: string;
  date: string;
  status: "Ready" | "Processing Report" | "Pending" | "Reviewed";
  type: "lab" | "imaging" | "document";
}

// Sample data
const records: MedicalRecord[] = [
  {
    id: 1,
    name: "Complete Blood Count (CBC)",
    ref: "LR-8902",
    doctor: "Dr. Emily Chen",
    specialty: "Cardiologist",
    date: "2023-10-24",
    status: "Ready",
    type: "lab",
  },
  {
    id: 2,
    name: "Lipid Panel",
    ref: "LR-8901",
    doctor: "Dr. Emily Chen",
    specialty: "Cardiologist",
    date: "2023-10-24",
    status: "Ready",
    type: "lab",
  },
  {
    id: 3,
    name: "MRI - Lumbar Spine",
    ref: "IMG-4421",
    doctor: "Dr. Alan Grant",
    specialty: "Neurologist",
    date: "2023-09-12",
    status: "Processing Report",
    type: "imaging",
  },
  {
    id: 4,
    name: "Comprehensive Metabolic Panel",
    ref: "LR-8002",
    doctor: "Dr. Emily Chen",
    specialty: "Cardiologist",
    date: "2023-08-05",
    status: "Ready",
    type: "lab",
  },
  {
    id: 5,
    name: "Urinalysis",
    ref: "LR-7721",
    doctor: "Dr. Sarah Connor",
    specialty: "General Practitioner",
    date: "2023-07-12",
    status: "Ready",
    type: "lab",
  },
  {
    id: 6,
    name: "Chest X-Ray",
    ref: "IMG-5123",
    doctor: "Dr. Alan Grant",
    specialty: "Neurologist",
    date: "2023-06-30",
    status: "Reviewed",
    type: "imaging",
  },
  {
    id: 7,
    name: "Discharge Summary",
    ref: "DOC-001",
    doctor: "Dr. Lisa Cuddy",
    specialty: "Internal Medicine",
    date: "2023-05-18",
    status: "Ready",
    type: "document",
  },
];

// Quick stats
const quickStats = [
  {
    title: "Active Prescriptions",
    value: "3",
    subtext: "Refills available",
    icon: Pill,
  },
  {
    title: "Next Appointment",
    value: "Nov 12",
    subtext: "10:00 AM",
    icon: Calendar,
  },
  {
    title: "Unread Messages",
    value: "0",
    subtext: "No new messages",
    icon: HeartPulse,
  },
];

// Status badge color mapping
const statusColorMap: Record<string, string> = {
  Ready:
    "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800",
  "Processing Report":
    "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300 border-amber-200 dark:border-amber-800",
  Pending:
    "bg-slate-100 text-slate-800 dark:bg-slate-800/50 dark:text-slate-300 border-slate-200 dark:border-slate-700",
  Reviewed:
    "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300 border-blue-200 dark:border-blue-800",
};

// Type icon mapping
const typeIconMap = {
  lab: FlaskConical,
  imaging: Image,
  document: FileText,
};

// Column Filter Types
interface ColumnFilter {
  column: string;
  value: string;
}

interface DateRangeFilter {
  from: string;
  to: string;
}

// Column Filter Component
function ColumnFilterPopover({
  column,
  placeholder = "Filter...",
  options,
  onFilter,
  currentValue,
}: {
  column: string;
  placeholder?: string;
  options?: string[];
  onFilter: (column: string, value: string) => void;
  currentValue?: string;
}) {
  const [open, setOpen] = useState(false);
  const [filterValue, setFilterValue] = useState(currentValue || "");

  const handleApply = () => {
    onFilter(column, filterValue);
    setOpen(false);
  };

  const handleClear = () => {
    setFilterValue("");
    onFilter(column, "");
    setOpen(false);
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <button
          className={`ml-1 p-1 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors ${
            currentValue
              ? "text-green-600 dark:text-green-400"
              : "text-gray-400"
          }`}
        >
          <Filter className="h-3.5 w-3.5" />
        </button>
      </PopoverTrigger>
      <PopoverContent className="w-64 p-4" align="start">
        <div className="space-y-4">
          <h4 className="font-medium text-sm">Filter by {column}</h4>
          {options ? (
            <div className="space-y-2 max-h-48 overflow-y-auto">
              {options.map((opt) => (
                <button
                  key={opt}
                  onClick={() => {
                    setFilterValue(opt);
                    onFilter(column, opt);
                    setOpen(false);
                  }}
                  className={`w-full text-left px-2 py-1.5 text-sm rounded hover:bg-gray-100 dark:hover:bg-gray-700 ${
                    currentValue === opt
                      ? "bg-green-50 dark:bg-green-900/20 text-green-600"
                      : ""
                  }`}
                >
                  {opt}
                </button>
              ))}
            </div>
          ) : (
            <div className="space-y-2">
              <Input
                placeholder={placeholder}
                value={filterValue}
                onChange={(e) => setFilterValue(e.target.value)}
                className="h-8"
              />
            </div>
          )}
          <div className="flex justify-between gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={handleClear}
              className="flex-1"
            >
              Clear
            </Button>
            <Button size="sm" onClick={handleApply} className="flex-1">
              Apply
            </Button>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}

// Date Range Filter Component
function DateRangeFilterPopover({
  column,
  onFilter,
  currentRange,
}: {
  column: string;
  onFilter: (column: string, from: string, to: string) => void;
  currentRange?: { from: string; to: string };
}) {
  const [open, setOpen] = useState(false);
  const [from, setFrom] = useState(currentRange?.from || "");
  const [to, setTo] = useState(currentRange?.to || "");

  const handleApply = () => {
    onFilter(column, from, to);
    setOpen(false);
  };

  const handleClear = () => {
    setFrom("");
    setTo("");
    onFilter(column, "", "");
    setOpen(false);
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <button
          className={`ml-1 p-1 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors ${
            currentRange?.from || currentRange?.to
              ? "text-green-600 dark:text-green-400"
              : "text-gray-400"
          }`}
        >
          <Filter className="h-3.5 w-3.5" />
        </button>
      </PopoverTrigger>
      <PopoverContent className="w-64 p-4" align="start">
        <div className="space-y-4">
          <h4 className="font-medium text-sm">Date Range</h4>
          <div className="space-y-2">
            <div className="space-y-1">
              <Label htmlFor="from">From</Label>
              <Input
                id="from"
                type="date"
                value={from}
                onChange={(e) => setFrom(e.target.value)}
                className="h-8"
              />
            </div>
            <div className="space-y-1">
              <Label htmlFor="to">To</Label>
              <Input
                id="to"
                type="date"
                value={to}
                onChange={(e) => setTo(e.target.value)}
                className="h-8"
              />
            </div>
          </div>
          <div className="flex justify-between gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={handleClear}
              className="flex-1"
            >
              Clear
            </Button>
            <Button size="sm" onClick={handleApply} className="flex-1">
              Apply
            </Button>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}

export default function MedicalRecordsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [dateFilter, setDateFilter] = useState("last6months");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [activeTab, setActiveTab] = useState("all");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [columnFilters, setColumnFilters] = useState<ColumnFilter[]>([]);
  const [dateFilters, setDateFilters] = useState<
    Record<string, DateRangeFilter>
  >({});
  const [sortConfig, setSortConfig] = useState<{
    key: keyof MedicalRecord;
    direction: "asc" | "desc";
  }>({ key: "date", direction: "desc" });

  // Helper to parse date
  const parseDate = (dateStr: string): Date => {
    return new Date(dateStr);
  };

  // Filter records
  const filteredRecords = useMemo(() => {
    let filtered = records.filter((record) => {
      // Global search
      const matchesSearch =
        record.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        record.doctor.toLowerCase().includes(searchQuery.toLowerCase()) ||
        record.specialty.toLowerCase().includes(searchQuery.toLowerCase()) ||
        record.ref.toLowerCase().includes(searchQuery.toLowerCase());

      // Tab filter
      const matchesTab = activeTab === "all" || record.type === activeTab;

      // Category filter
      const matchesCategory =
        categoryFilter === "all" ||
        record.specialty.toLowerCase().includes(categoryFilter.toLowerCase());

      // Column filters
      const matchesColumnFilters = columnFilters.every((filter) => {
        const value = record[filter.column as keyof MedicalRecord];
        return value
          ?.toString()
          .toLowerCase()
          .includes(filter.value.toLowerCase());
      });

      // Date range filters
      const matchesDateFilters = Object.entries(dateFilters).every(
        ([column, range]) => {
          if (!range.from && !range.to) return true;
          const patientDateStr = record[
            column as keyof MedicalRecord
          ] as string;
          if (!patientDateStr) return false;
          const patientDate = parseDate(patientDateStr);

          if (range.from && range.to) {
            const fromDate = parseDate(range.from);
            const toDate = parseDate(range.to);
            return patientDate >= fromDate && patientDate <= toDate;
          } else if (range.from) {
            const fromDate = parseDate(range.from);
            return patientDate >= fromDate;
          } else if (range.to) {
            const toDate = parseDate(range.to);
            return patientDate <= toDate;
          }
          return true;
        },
      );

      return (
        matchesSearch &&
        matchesTab &&
        matchesCategory &&
        matchesColumnFilters &&
        matchesDateFilters
      );
    });

    // Sort
    filtered.sort((a, b) => {
      let aVal = a[sortConfig.key];
      let bVal = b[sortConfig.key];
      if (sortConfig.key === "date") {
        aVal = new Date(a.date).getTime();
        bVal = new Date(b.date).getTime();
      }
      if (aVal < bVal) return sortConfig.direction === "asc" ? -1 : 1;
      if (aVal > bVal) return sortConfig.direction === "asc" ? 1 : -1;
      return 0;
    });

    return filtered;
  }, [
    searchQuery,
    dateFilter,
    categoryFilter,
    activeTab,
    columnFilters,
    dateFilters,
    sortConfig,
  ]);

  const handleSort = (key: keyof MedicalRecord) => {
    setSortConfig((prev) => ({
      key,
      direction: prev.key === key && prev.direction === "asc" ? "desc" : "asc",
    }));
  };

  const SortIcon = ({ columnKey }: { columnKey: keyof MedicalRecord }) => {
    if (sortConfig.key !== columnKey) return null;
    return sortConfig.direction === "asc" ? (
      <ChevronUp className="h-4 w-4 inline ml-1" />
    ) : (
      <ChevronDown className="h-4 w-4 inline ml-1" />
    );
  };

  const handleColumnFilter = (column: string, value: string) => {
    setColumnFilters((prev) => {
      const filtered = prev.filter((f) => f.column !== column);
      return value ? [...filtered, { column, value }] : filtered;
    });
  };

  const handleDateRangeFilter = (column: string, from: string, to: string) => {
    setDateFilters((prev) => {
      const newFilters = { ...prev };
      if (from || to) {
        newFilters[column] = { from, to };
      } else {
        delete newFilters[column];
      }
      return newFilters;
    });
  };

  const clearAllFilters = () => {
    setColumnFilters([]);
    setDateFilters({});
    setSearchQuery("");
    setCategoryFilter("all");
    setActiveTab("all");
  };

  return (
    <div className="flex min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Mobile Menu Button */}
      <button
        className="lg:hidden fixed bottom-20 right-6 z-50 p-3 bg-green-600 hover:bg-green-700 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-200 flex items-center justify-center"
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        aria-label="Toggle menu"
      >
        {isSidebarOpen ? (
          <X className="w-5 h-5" />
        ) : (
          <Menu className="w-5 h-5" />
        )}
      </button>

      {/* Sidebar */}
      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />

      {/* Backdrop overlay for mobile */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/30 backdrop-blur-sm z-30 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Main Content */}
      <div className="flex-1 flex flex-col w-full lg:ml-0">
        <main className="flex-1 overflow-y-auto px-4 sm:px-6 lg:px-8 py-6 lg:py-8">
          {/* Page Header with Mobile Background */}
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-8">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
                My Medical Records
              </h1>
              <p className="text-gray-500 dark:text-gray-400 text-sm">
                View and manage your lab results, imaging reports, and health
                documents.
              </p>
            </div>

            {(columnFilters.length > 0 ||
              Object.keys(dateFilters).length > 0) && (
              <Button
                variant="outline"
                size="sm"
                onClick={clearAllFilters}
                className="text-green-600 border-green-200"
              >
                Clear all filters
              </Button>
            )}
          </div>

          {/* Filters and Tabs */}
          <div className="flex flex-col gap-4 mb-6">
            {/* Tabs - Scrollable on mobile */}
            <div className="overflow-x-auto pb-2 -mx-4 px-4">
              <Tabs
                value={activeTab}
                onValueChange={setActiveTab}
                className="min-w-max"
              >
                <TabsList className="inline-flex w-auto">
                  <TabsTrigger value="all">All</TabsTrigger>
                  <TabsTrigger value="lab">Labs</TabsTrigger>
                  <TabsTrigger value="imaging">Imaging</TabsTrigger>
                  <TabsTrigger value="document">Documents</TabsTrigger>
                </TabsList>
              </Tabs>
            </div>

            {/* Filters - Stack on mobile */}
            <div className="flex flex-col sm:flex-row gap-3">
              <Select value={dateFilter} onValueChange={setDateFilter}>
                <SelectTrigger className="w-full sm:w-[160px]">
                  <SelectValue placeholder="Date Range" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="last6months">Last 6 Months</SelectItem>
                  <SelectItem value="lastyear">Last Year</SelectItem>
                  <SelectItem value="all">All Time</SelectItem>
                </SelectContent>
              </Select>

              <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                <SelectTrigger className="w-full sm:w-[160px]">
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  <SelectItem value="cardiology">Cardiology</SelectItem>
                  <SelectItem value="neurology">Neurology</SelectItem>
                  <SelectItem value="general">General</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Records Table with Column Filters and Vertical Lines */}
          <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left min-w-[1000px] md:min-w-full border-collapse">
                <thead className="bg-gray-50 dark:bg-gray-900/50 text-xs uppercase text-gray-500 dark:text-gray-400">
                  <tr className="border-b border-gray-200 dark:border-gray-700">
                    <th className="px-4 sm:px-6 py-3 font-medium border-r border-gray-200 dark:border-gray-700">
                      <div className="flex items-center">
                        Record Name
                        <ColumnFilterPopover
                          column="name"
                          placeholder="Filter by name..."
                          onFilter={handleColumnFilter}
                          currentValue={
                            columnFilters.find((f) => f.column === "name")
                              ?.value
                          }
                        />
                        <SortIcon columnKey="name" />
                      </div>
                    </th>
                    <th className="px-4 sm:px-6 py-3 font-medium border-r border-gray-200 dark:border-gray-700">
                      <div className="flex items-center">
                        Type
                        <ColumnFilterPopover
                          column="type"
                          options={["lab", "imaging", "document"]}
                          onFilter={handleColumnFilter}
                          currentValue={
                            columnFilters.find((f) => f.column === "type")
                              ?.value
                          }
                        />
                      </div>
                    </th>
                    <th className="px-4 sm:px-6 py-3 font-medium border-r border-gray-200 dark:border-gray-700">
                      <div className="flex items-center">
                        Doctor
                        <ColumnFilterPopover
                          column="doctor"
                          placeholder="Filter by doctor..."
                          options={Array.from(
                            new Set(records.map((r) => r.doctor)),
                          )}
                          onFilter={handleColumnFilter}
                          currentValue={
                            columnFilters.find((f) => f.column === "doctor")
                              ?.value
                          }
                        />
                        <SortIcon columnKey="doctor" />
                      </div>
                    </th>
                    <th className="px-4 sm:px-6 py-3 font-medium border-r border-gray-200 dark:border-gray-700">
                      <div className="flex items-center">
                        Date
                        <DateRangeFilterPopover
                          column="date"
                          onFilter={handleDateRangeFilter}
                          currentRange={dateFilters.date}
                        />
                        <SortIcon columnKey="date" />
                      </div>
                    </th>
                    <th className="px-4 sm:px-6 py-3 font-medium border-r border-gray-200 dark:border-gray-700">
                      <div className="flex items-center">
                        Status
                        <ColumnFilterPopover
                          column="status"
                          options={[
                            "Ready",
                            "Processing Report",
                            "Pending",
                            "Reviewed",
                          ]}
                          onFilter={handleColumnFilter}
                          currentValue={
                            columnFilters.find((f) => f.column === "status")
                              ?.value
                          }
                        />
                      </div>
                    </th>
                    <th className="px-4 sm:px-6 py-3 font-medium text-right">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                  {filteredRecords.map((record) => {
                    const TypeIcon = typeIconMap[record.type];
                    return (
                      <tr
                        key={record.id}
                        className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
                      >
                        <td className="px-4 sm:px-6 py-4 border-r border-gray-200 dark:border-gray-700">
                          <div className="flex items-center gap-3">
                            <div
                              className={`p-2 rounded-lg flex-shrink-0 ${
                                record.type === "lab"
                                  ? "bg-red-50 dark:bg-red-900/20"
                                  : record.type === "imaging"
                                    ? "bg-blue-50 dark:bg-blue-900/20"
                                    : "bg-purple-50 dark:bg-purple-900/20"
                              }`}
                            >
                              <TypeIcon
                                className={`h-4 w-4 ${
                                  record.type === "lab"
                                    ? "text-red-600 dark:text-red-400"
                                    : record.type === "imaging"
                                      ? "text-blue-600 dark:text-blue-400"
                                      : "text-purple-600 dark:text-purple-400"
                                }`}
                              />
                            </div>
                            <div className="min-w-0">
                              <p className="font-medium text-gray-900 dark:text-white truncate max-w-[150px] sm:max-w-none">
                                {record.name}
                              </p>
                              <p className="text-xs text-gray-500 dark:text-gray-400">
                                Ref: {record.ref}
                              </p>
                            </div>
                          </div>
                        </td>
                        <td className="px-4 sm:px-6 py-4 capitalize text-gray-600 dark:text-gray-300 border-r border-gray-200 dark:border-gray-700">
                          {record.type}
                        </td>
                        <td className="px-4 sm:px-6 py-4 border-r border-gray-200 dark:border-gray-700">
                          <p className="text-gray-900 dark:text-white whitespace-nowrap">
                            {record.doctor}
                          </p>
                          <p className="text-xs text-gray-500 dark:text-gray-400">
                            {record.specialty}
                          </p>
                        </td>
                        <td className="px-4 sm:px-6 py-4 text-gray-600 dark:text-gray-300 whitespace-nowrap border-r border-gray-200 dark:border-gray-700">
                          {new Date(record.date).toLocaleDateString("en-US", {
                            year: "numeric",
                            month: "short",
                            day: "numeric",
                          })}
                        </td>
                        <td className="px-4 sm:px-6 py-4 border-r border-gray-200 dark:border-gray-700">
                          <Badge className={statusColorMap[record.status]}>
                            {record.status}
                          </Badge>
                        </td>
                        <td className="px-4 sm:px-6 py-4 text-right">
                          <div className="flex items-center justify-end gap-1 sm:gap-2">
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8"
                            >
                              <Eye className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8"
                            >
                              <Download className="h-4 w-4" />
                            </Button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            <div className="px-4 sm:px-6 py-4 border-t border-gray-200 dark:border-gray-700 flex flex-col sm:flex-row items-center justify-between gap-4">
              <p className="text-sm text-gray-500 dark:text-gray-400 order-2 sm:order-1">
                Showing {filteredRecords.length} of {records.length} records
              </p>
              <div className="flex gap-2 order-1 sm:order-2">
                <Button
                  variant="outline"
                  size="sm"
                  disabled
                  className="w-20 sm:w-auto"
                >
                  Previous
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  disabled
                  className="w-20 sm:w-auto"
                >
                  Next
                </Button>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
