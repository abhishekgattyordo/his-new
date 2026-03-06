'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Search, ArrowLeft, Loader2, Menu, X } from 'lucide-react';
import { toast } from 'sonner';
import Sidebar from '@/components/pharmacy/Sidebar';
import { purchasesApi } from '@/lib/api/purchasesApi';

// Types for purchase data
interface Purchase {
  id: number;
  invoice_no: string;
  supplier_name: string;
  invoice_date: string;
  subtotal: number | string;
  tax_total: number | string;
  grand_total: number | string;
  is_delivered: boolean;
  payment_mode: string;
  // add any other fields your API returns
}

interface Pagination {
  page: number;
  pages: number;
  limit?: number;
  total?: number;
}

export default function PurchasesPage() {
  const router = useRouter();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [purchases, setPurchases] = useState<Purchase[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [search, setSearch] = useState('');
  const limit = 20;

  // Helper to normalize API response (handles both wrapped and unwrapped)
  const normalizeResponse = (res: any): { success: boolean; data: Purchase[]; pagination: Pagination; message?: string } => {
    const payload = res?.data?.success !== undefined ? res.data : res;
    return {
      success: payload?.success ?? false,
      data: payload?.data ?? [],
      pagination: payload?.pagination ?? { page: 1, pages: 1 },
      message: payload?.message,
    };
  };

  const fetchPurchases = async (pageNum = 1, searchTerm = '') => {
    setLoading(true);
    try {
      const response = await purchasesApi.getPurchases({
        page: pageNum,
        limit,
        search: searchTerm || undefined,
      });

      const { success, data, pagination } = normalizeResponse(response);

      if (success) {
        setPurchases(data);
        setPage(pagination.page);
        setTotalPages(pagination.pages);
      } else {
        toast.error('Failed to load purchases');
      }
    } catch (error) {
      console.error('Fetch error:', error);
      toast.error('Something went wrong while loading purchases');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPurchases(1, '');
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    fetchPurchases(1, search);
  };

  const toggleDelivered = async (id: number, currentValue: boolean) => {
    const confirmed = window.confirm(`Mark this purchase as ${currentValue ? 'not delivered' : 'delivered'}?`);
    if (!confirmed) return;

    try {
      const response = await purchasesApi.updatePurchaseDelivery(id, !currentValue);
      const { success, message } = normalizeResponse(response);

      if (success) {
        setPurchases(prev =>
          prev.map(p => (p.id === id ? { ...p, is_delivered: !currentValue } : p))
        );
        toast.success('Delivery status updated');
      } else {
        toast.error(message || 'Failed to update');
      }
    } catch (error: any) {
      console.error('Toggle error:', error);
      toast.error(error?.response?.data?.message || 'An error occurred');
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Mobile menu button */}
      <button
        className="lg:hidden fixed bottom-20 right-6 z-50 p-2.5 bg-white dark:bg-gray-800 rounded-lg shadow-md border"
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
      >
        {isSidebarOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
      </button>

      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/30 z-30 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      <div className="flex-1 flex flex-col w-full min-w-0">
        {/* HEADER */}
        <header className="sticky top-0 z-30 border-b bg-white dark:bg-gray-950">
          <div className="flex h-16 items-center px-4">
            <Button variant="ghost" size="icon" onClick={() => router.back()}>
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <div className="ml-3">
              <h1 className="text-lg font-semibold">Purchase History</h1>
              <p className="text-xs text-gray-500">All recorded purchases</p>
            </div>
          </div>
        </header>

        {/* CONTENT */}
        <main className="flex-1 p-4 md:p-6 overflow-y-auto">
          <Card>
            <CardHeader>
              <CardTitle>Purchases</CardTitle>
              <form onSubmit={handleSearch} className="flex gap-2 mt-3">
                <div className="relative max-w-sm flex-1">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="Search invoice or supplier..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <Button type="submit" size="sm">
                  Search
                </Button>
              </form>
            </CardHeader>

            <CardContent>
              {loading ? (
                <div className="flex justify-center py-10">
                  <Loader2 className="h-6 w-6 animate-spin" />
                </div>
              ) : purchases.length === 0 ? (
                <p className="text-center text-gray-500 py-6">
                  No purchases found
                </p>
              ) : (
                <>
                  <div className="overflow-x-auto">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Invoice No</TableHead>
                          <TableHead>Supplier</TableHead>
                          <TableHead>Date</TableHead>
                          <TableHead>Subtotal</TableHead>
                          <TableHead>Tax</TableHead>
                          <TableHead>Grand Total</TableHead>
                          <TableHead>Delivered</TableHead>
                          <TableHead>Payment</TableHead>
                          <TableHead />
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {purchases.map((p) => (
                          <TableRow key={p.id}>
                            <TableCell className="font-medium">{p.invoice_no}</TableCell>
                            <TableCell>{p.supplier_name}</TableCell>
                            <TableCell>{new Date(p.invoice_date).toLocaleDateString()}</TableCell>
                            <TableCell>₹{Number(p.subtotal).toFixed(2)}</TableCell>
                            <TableCell>₹{Number(p.tax_total).toFixed(2)}</TableCell>
                            <TableCell className="font-bold text-green-600">
                              ₹{Number(p.grand_total).toFixed(2)}
                            </TableCell>
                            <TableCell className="text-center">
                              <Badge
                                className={`cursor-pointer ${
                                  p.is_delivered
                                    ? 'bg-green-100 text-green-800 hover:bg-green-200'
                                    : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                                }`}
                                onClick={() => toggleDelivered(p.id, p.is_delivered)}
                              >
                                {p.is_delivered ? 'Yes' : 'No'}
                              </Badge>
                            </TableCell>
                            <TableCell>{p.payment_mode}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>

                  {/* PAGINATION */}
                  <div className="flex justify-between items-center mt-4">
                    <Button
                      variant="outline"
                      size="sm"
                      disabled={page === 1}
                      onClick={() => fetchPurchases(page - 1, search)}
                    >
                      Previous
                    </Button>

                    <span className="text-sm text-gray-500">
                      Page {page} of {totalPages}
                    </span>

                    <Button
                      variant="outline"
                      size="sm"
                      disabled={page === totalPages}
                      onClick={() => fetchPurchases(page + 1, search)}
                    >
                      Next
                    </Button>
                  </div>
                </>
              )}
            </CardContent>
          </Card>
        </main>
      </div>
    </div>
  );
}