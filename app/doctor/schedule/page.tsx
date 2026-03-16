"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import {
  Calendar,
  Clock,
  User,
  CheckCircle2,
  Users,
  UserCircle,
  Edit,
  ChevronUp,
  ChevronDown,
} from "lucide-react";
import { useDoctor } from "../layout";
import ColumnFilterPopover, { ColumnFilterPopoverProps } from "@/components/doctor/ColumnFilterPopover";

// ===== Type Definitions =====

// Re-export Appointment type (can also be imported from a shared types file)
export interface Appointment {
  id: string;
  time: string;
  name: string;
  age: number;
  gender: string;
  reason: string;
  meta: string;
  type: string;
  status: string;
  statusColor: string;
  action: string;
  icon: React.ReactNode;
  highlight?: boolean;
  notes?: string;
}

// Columns that are filterable
type FilterableColumn = "name" | "type" | "status";

// Filter state structure
interface ColumnFilter {
  column: FilterableColumn;
  value: string;
}

// Sort configuration
interface SortConfig {
  key: keyof Appointment;
  direction: "asc" | "desc";
}

// ===== Modal Component Props (if not already defined) =====
// These should match the actual modal components you have.
// Replace with correct imports if those components export their own props.
interface ManageAvailabilityModalProps {
  onClose: () => void;
}

interface NewAppointmentModalProps {
  onClose: () => void;
}

interface EditAppointmentModalProps {
  appointment: Appointment;
  onSave: (updated: Appointment) => void;
  onClose: () => void;
}

// ===== Main Component =====

export default function SchedulePage() {
  const { appointments, setAppointments } = useDoctor();
  const [showAvailabilityModal, setShowAvailabilityModal] = useState(false);
  const [showNewAppointment, setShowNewAppointment] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedAppointment, setSelectedAppointment] = useState<Appointment | null>(null);
  const [columnFilters, setColumnFilters] = useState<ColumnFilter[]>([]);
  const [sortConfig, setSortConfig] = useState<SortConfig | null>(null);

  const handleEditAppointment = (appointment: Appointment) => {
    setSelectedAppointment(appointment);
    setShowEditModal(true);
  };

  const handleSaveEdit = (updatedAppointment: Appointment) => {
    setAppointments(appointments.map(apt =>
      apt.id === updatedAppointment.id ? updatedAppointment : apt
    ));
    setShowEditModal(false);
    setSelectedAppointment(null);
  };

  const handleColumnFilter = (column: string, value: string) => {
    // Ensure column is one of the allowed filterable columns
    if (!["name", "type", "status"].includes(column)) return;

    setColumnFilters(prev => {
      const filtered = prev.filter(f => f.column !== column);
      return value ? [...filtered, { column: column as FilterableColumn, value }] : filtered;
    });
  };

  const filteredAppointments = useMemo(() => {
    let filtered = appointments.filter(appointment => {
      return columnFilters.every(filter => {
        const value = appointment[filter.column];
        return value?.toString().toLowerCase().includes(filter.value.toLowerCase());
      });
    });

    if (sortConfig) {
      filtered.sort((a, b) => {
        const aVal = a[sortConfig.key];
        const bVal = b[sortConfig.key];
        if (typeof aVal === 'string' && typeof bVal === 'string') {
          return sortConfig.direction === 'asc'
            ? aVal.localeCompare(bVal)
            : bVal.localeCompare(aVal);
        }
        return 0;
      });
    }

    return filtered;
  }, [appointments, columnFilters, sortConfig]);

  const handleSort = (key: keyof Appointment) => {
    setSortConfig(prev => ({
      key,
      direction: prev?.key === key && prev.direction === 'asc' ? 'desc' : 'asc'
    }));
  };

  const SortIcon = ({ columnKey }: { columnKey: keyof Appointment }) => {
    if (sortConfig?.key !== columnKey) return null;
    return sortConfig.direction === 'asc' ? (
      <ChevronUp className="h-4 w-4 inline ml-1" />
    ) : (
      <ChevronDown className="h-4 w-4 inline ml-1" />
    );
  };

  const clearAllFilters = () => {
    setColumnFilters([]);
    setSortConfig(null);
  };

  const typeOptions = Array.from(new Set(appointments.map(a => a.type)));
  const statusOptions = Array.from(new Set(appointments.map(a => a.status)));

  return (
    <>
      <div className="space-y-6">
        {/* Header with clear filters */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <div className="flex items-center gap-2">
              <Calendar className="w-5 h-5 text-blue-600" />
              <h1 className="text-2xl font-bold text-gray-800">Daily Schedule</h1>
            </div>
            <p className="text-sm text-gray-500 mt-1 ml-7">
              Today, Oct 24, 2023 · <span className="font-medium text-blue-600">12 appointments</span> remaining
            </p>
          </div>
          {(columnFilters.length > 0 || sortConfig) && (
            <button
              onClick={clearAllFilters}
              className="text-sm text-blue-600 hover:text-blue-800 border border-blue-200 px-3 py-1 rounded-lg"
            >
              Clear all filters
            </button>
          )}
        </div>

        {/* STATS - responsive grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-white border rounded-xl p-5">
            <p className="text-xs text-gray-500 font-semibold uppercase tracking-wider flex items-center gap-1">
              <Users className="w-3 h-3" />
              TOTAL
            </p>
            <p className="text-3xl font-bold mt-1 text-gray-800">15</p>
          </div>
          <div className="bg-white border rounded-xl p-5">
            <p className="text-xs text-gray-500 font-semibold uppercase tracking-wider flex items-center gap-1">
              <UserCircle className="w-3 h-3" />
              WAITING ROOM
            </p>
            <p className="text-3xl font-bold mt-1 text-gray-800">3</p>
            <p className="text-xs text-gray-400 mt-1">2 ready, 1 checked-in</p>
          </div>
          <div className="bg-white border rounded-xl p-5">
            <p className="text-xs text-gray-500 font-semibold uppercase tracking-wider flex items-center gap-1">
              <CheckCircle2 className="w-3 h-3" />
              COMPLETED
            </p>
            <p className="text-3xl font-bold mt-1 text-gray-800">8</p>
            <p className="text-xs text-green-600 mt-1">Today's visits</p>
          </div>
        </div>

        {/* TABLE */}
        <div className="bg-white border rounded-xl overflow-hidden shadow-sm">
          <div className="overflow-x-auto">
            <div className="min-w-[1000px] lg:min-w-full">
              {/* Table Header with Filters */}
              <div className="grid grid-cols-12 px-6 py-4 text-xs text-gray-500 font-semibold bg-gray-50 border-b border-gray-200">
                <div className="col-span-2 flex items-center gap-1 border-r-2 border-gray-200 pr-4">
                  <Clock className="w-3 h-3" /> TIME
                  <button onClick={() => handleSort('time')} className="ml-auto">
                    <SortIcon columnKey="time" />
                  </button>
                </div>
                <div className="col-span-4 flex items-center gap-1 border-r-2 border-gray-200 px-4">
                  <User className="w-3 h-3" /> PATIENT DETAILS
                  <ColumnFilterPopover<FilterableColumn>
                    column="name"
                    placeholder="Filter by name..."
                    onFilter={handleColumnFilter}
                    currentValue={columnFilters.find(f => f.column === 'name')?.value}
                  />
                  <button onClick={() => handleSort('name')} className="ml-auto">
                    <SortIcon columnKey="name" />
                  </button>
                </div>
                <div className="col-span-2 flex items-center justify-center gap-1 border-r-2 border-gray-200 px-4">
                  TYPE
                  <ColumnFilterPopover<FilterableColumn>
                    column="type"
                    options={typeOptions}
                    onFilter={handleColumnFilter}
                    currentValue={columnFilters.find(f => f.column === 'type')?.value}
                  />
                  <button onClick={() => handleSort('type')}>
                    <SortIcon columnKey="type" />
                  </button>
                </div>
                <div className="col-span-2 flex items-center justify-center gap-1 border-r-2 border-gray-200 px-4">
                  STATUS
                  <ColumnFilterPopover<FilterableColumn>
                    column="status"
                    options={statusOptions}
                    onFilter={handleColumnFilter}
                    currentValue={columnFilters.find(f => f.column === 'status')?.value}
                  />
                  <button onClick={() => handleSort('status')}>
                    <SortIcon columnKey="status" />
                  </button>
                </div>
                <div className="col-span-2 text-center">ACTIONS</div>
              </div>

              {/* Table Rows */}
              {filteredAppointments.map((appointment) => (
                <div key={appointment.id} className={`border-b border-gray-200 ${appointment.highlight ? 'bg-blue-50' : ''}`}>
                  <div className="grid grid-cols-12 px-6 py-4 items-center hover:bg-gray-50 transition">
                    <div className="col-span-2 text-gray-700 font-medium flex items-center gap-1 border-r-2 border-gray-200 pr-4">
                      <Clock className="w-3.5 h-3.5 text-gray-400" />
                      {appointment.time}
                    </div>
                    <div className="col-span-4 border-r-2 border-gray-200 px-4">
                      <Link
                        href={`/ehr/${appointment.id}`}
                        className="font-bold text-gray-800 hover:text-blue-600 hover:underline cursor-pointer"
                      >
                        {appointment.name}
                      </Link>
                      <p className="text-sm text-gray-500 mt-0.5">{appointment.meta}</p>
                    </div>
                    <div className="col-span-2 text-center border-r-2 border-gray-200 px-4">
                      <span className="px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1 w-fit mx-auto bg-gray-100 text-gray-600">
                        <User className="w-3 h-3" />
                        {appointment.type}
                      </span>
                    </div>
                    <div className="col-span-2 text-center border-r-2 border-gray-200 px-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1 w-fit mx-auto ${appointment.statusColor}`}>
                        {appointment.status === 'Ready' && <User className="w-3 h-3" />}
                        {appointment.status === 'Completed' && <CheckCircle2 className="w-3 h-3" />}
                        {appointment.status === 'Checked-in' && <User className="w-3 h-3" />}
                        {appointment.status === 'Confirmed' && <Calendar className="w-3 h-3" />}
                        {appointment.status}
                      </span>
                    </div>
                    <div className="col-span-2 text-center">
                      <button
                        onClick={() => handleEditAppointment(appointment)}
                        className="text-blue-600 text-sm font-medium hover:text-blue-800 flex items-center justify-center gap-1 mx-auto"
                      >
                        <Edit className="w-3 h-3" />
                        Edit
                      </button>
                    </div>
                  </div>
                </div>
              ))}

              {/* Available Slot Row */}
              <div className="px-6 py-4 text-gray-400 italic text-sm flex items-center gap-2 border-t border-gray-200">
                <Clock className="w-4 h-4" />
                11:00 AM · Available Slot
                <button
                  onClick={() => setShowNewAppointment(true)}
                  className="ml-auto text-blue-600 font-medium not-italic hover:text-blue-700"
                >
                  + Book now
                </button>
              </div>
            </div>
          </div>

          {/* Footer with record count */}
          <div className="px-6 py-3 border-t border-gray-200 bg-gray-50 text-xs text-gray-500">
            Showing {filteredAppointments.length} of {appointments.length} appointments
          </div>
        </div>
      </div>

      {/* Modals – ensure these components exist and are correctly imported
      {showAvailabilityModal && (
        <ManageAvailabilityModal onClose={() => setShowAvailabilityModal(false)} />
      )}
      {showNewAppointment && (
        <NewAppointmentModal onClose={() => setShowNewAppointment(false)} />
      )}
      {showEditModal && selectedAppointment && (
        <EditAppointmentModal
          appointment={selectedAppointment}
          onSave={handleSaveEdit}
          onClose={() => {
            setShowEditModal(false);
            setSelectedAppointment(null);
          }}
        />
      )} */}
    </>
  );
}