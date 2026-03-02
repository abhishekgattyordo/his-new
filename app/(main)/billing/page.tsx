// app/dashboard/billing/page.tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { toast } from "sonner";
import {
  CreditCard,
  Download,
  Printer,
  Calendar,
  Shield,
  Bell,
  ArrowRight,
  CheckCircle,
  AlertCircle,
  DollarSign,
  FileText,
  Receipt,
  TrendingUp,
  Wallet,
  Lock,
  HelpCircle,
  CreditCard as CardIcon,
  Smartphone,
  Building,
  Mail,
  Phone,
  ChevronRight,
  Menu,
  X,
  Home,
  Video,
  User,
  LogOut,
  Clock,
  ShieldCheck,
  Banknote
} from "lucide-react";
import { cn } from "@/lib/utils";
// import MobileNavigation from "@/components/layout/MobileNavigation";

// Types
type PaymentStatus = "paid" | "pending" | "overdue" | "covered";
type PaymentMethod = "card" | "insurance" | "cash" | "bank_transfer";

interface Invoice {
  id: string;
  date: string;
  description: string;
  provider: string;
  status: PaymentStatus;
  amount: number;
  details?: string;
}

interface Payment {
  id: string;
  invoiceId: string;
  date: string;
  method: PaymentMethod;
  amount: number;
  status: "completed" | "processing";
}

interface PaymentCard {
  id: string;
  type: "visa" | "mastercard" | "amex";
  last4: string;
  expiry: string;
  isDefault: boolean;
}

// Mock Data
const invoices: Invoice[] = [
  {
    id: "INV-2023-012",
    date: "2023-10-12",
    description: "Teleconsultation",
    provider: "Dr. Sarah Smith",
    status: "pending",
    amount: 100.00,
    details: "30 mins video call"
  },
  {
    id: "INV-2023-013",
    date: "2023-10-12",
    description: "Lipid Profile Test",
    provider: "Lab Corp",
    status: "pending",
    amount: 85.00,
    details: "Lab Order #9921"
  },
  {
    id: "INV-2023-014",
    date: "2023-10-12",
    description: "Atorvastatin (30 days)",
    provider: "Internal Pharmacy",
    status: "covered",
    amount: 60.00,
    details: "Pharmacy Pickup"
  },
  {
    id: "INV-2023-010",
    date: "2023-09-15",
    description: "Annual Physical Exam",
    provider: "Dr. Michael Chen",
    status: "paid",
    amount: 250.00,
    details: "Comprehensive checkup"
  },
  {
    id: "INV-2023-009",
    date: "2023-08-22",
    description: "Cardiology Consultation",
    provider: "Heart Care Center",
    status: "paid",
    amount: 180.00,
    details: "Follow-up visit"
  },
  {
    id: "INV-2023-008",
    date: "2023-07-10",
    description: "MRI Scan",
    provider: "Imaging Center",
    status: "overdue",
    amount: 450.00,
    details: "Full spine MRI"
  }
];

const payments: Payment[] = [
  {
    id: "PAY-001",
    invoiceId: "INV-2023-010",
    date: "2023-09-15",
    method: "card",
    amount: 250.00,
    status: "completed"
  },
  {
    id: "PAY-002",
    invoiceId: "INV-2023-009",
    date: "2023-08-22",
    method: "cash",
    amount: 35.00,
    status: "completed"
  },
  {
    id: "PAY-003",
    invoiceId: "INV-2023-007",
    date: "2023-06-05",
    method: "insurance",
    amount: 1200.00,
    status: "completed"
  }
];

const paymentCards: PaymentCard[] = [
  { id: "1", type: "visa", last4: "4242", expiry: "12/25", isDefault: true },
  { id: "2", type: "mastercard", last4: "8888", expiry: "06/26", isDefault: false },
  { id: "3", type: "amex", last4: "3782", expiry: "09/24", isDefault: false }
];

const statusColors = {
  paid: "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300",
  pending: "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300",
  overdue: "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300",
  covered: "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300"
};

const statusIcons = {
  paid: CheckCircle,
  pending: Clock,
  overdue: AlertCircle,
  covered: ShieldCheck
};

const paymentMethodIcons = {
  card: CreditCard,
  insurance: Shield,
  cash: DollarSign,
  bank_transfer: Building
};

const cardTypeColors = {
  visa: "bg-gradient-to-r from-blue-500 to-blue-600",
  mastercard: "bg-gradient-to-r from-red-500 to-yellow-500",
  amex: "bg-gradient-to-r from-green-500 to-blue-500"
};

export default function BillingPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("current");
  const [selectedInvoice, setSelectedInvoice] = useState<Invoice | null>(null);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  // Calculate totals
  const totalOutstanding = invoices
    .filter(inv => inv.status === "pending" || inv.status === "overdue")
    .reduce((sum, inv) => sum + inv.amount, 0);

  const totalPaid = invoices
    .filter(inv => inv.status === "paid")
    .reduce((sum, inv) => sum + inv.amount, 0);

  const pendingInvoices = invoices.filter(inv => inv.status === "pending" || inv.status === "overdue");
  const nextDueDate = "2023-10-24"; // Mock date

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const getDaysUntilDue = () => {
    const today = new Date();
    const dueDate = new Date(nextDueDate);
    const diffTime = dueDate.getTime() - today.getTime();
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  };

  const handlePayInvoice = async (invoice: Invoice) => {
    setIsProcessing(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      toast.success("Payment Successful!", {
        description: `${formatCurrency(invoice.amount)} paid for ${invoice.description}`,
        action: {
          label: "View Receipt",
          onClick: () => router.push(`/billing/receipts/${invoice.id}`)
        }
      });
    } catch (error) {
      toast.error("Payment Failed", {
        description: "Please try again or contact support"
      });
    } finally {
      setIsProcessing(false);
      setShowPaymentModal(false);
    }
  };

  const handleDownloadStatement = () => {
    toast.info("Downloading statement...");
    // In real app, this would trigger a PDF download
  };

  const handleContactSupport = () => {
    router.push("/support");
  };

  const getCardIcon = (type: string) => {
    switch (type) {
      case "visa": return "VISA";
      case "mastercard": return "MC";
      case "amex": return "AMEX";
      default: return type.toUpperCase();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white dark:from-slate-900 dark:to-slate-950">
      {/* Mobile Header */}
      <div className="lg:hidden sticky top-0 z-40 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-b border-slate-200 dark:border-slate-800">
        <div className="px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            {/* <MobileNavigation /> */}
            <div>
              <h1 className="text-lg font-bold text-slate-900 dark:text-white">
                Billing & Payments
              </h1>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Patient ID: #8392-JS
              </p>
            </div>
          </div>
          
          <Button variant="ghost" size="icon" className="relative">
            <Bell className="h-5 w-5" />
            <span className="absolute -top-1 -right-1 h-2 w-2 bg-red-500 rounded-full"></span>
          </Button>
        </div>
      </div>

      {/* Desktop Header */}
      <div className="hidden lg:block sticky top-0 z-40 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-b border-slate-200 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="p-2 bg-gradient-to-r from-primary to-primary/80 rounded-xl shadow-lg">
                <CreditCard className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
                  Billing & Payments
                </h1>
                <div className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400">
                  <span>Patient ID: #8392-JS</span>
                  <span className="text-slate-300">|</span>
                  <span>Statement Period: Oct 1 - Oct 31, 2023</span>
                </div>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <Button
                variant="outline"
                className="gap-2"
                onClick={handleDownloadStatement}
              >
                <Download className="h-4 w-4" />
                Statement
              </Button>
              <Button
                variant="outline"
                className="gap-2"
                onClick={() => window.print()}
              >
                <Printer className="h-4 w-4" />
                Print
              </Button>
            </div>
          </div>
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 lg:py-8">
        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <Card className="border-slate-200 dark:border-slate-800">
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm text-slate-500 dark:text-slate-400 font-medium uppercase tracking-wide">
                    Total Outstanding
                  </p>
                  <h3 className="text-3xl font-bold text-slate-900 dark:text-white mt-2">
                    {formatCurrency(totalOutstanding)}
                  </h3>
                </div>
                <div className="p-2 bg-red-50 dark:bg-red-900/20 rounded-lg text-red-600 dark:text-red-400">
                  <DollarSign className="h-6 w-6" />
                </div>
              </div>
              <p className="text-sm text-slate-500 dark:text-slate-400 mt-4">
                Includes pending insurance claims
              </p>
            </CardContent>
          </Card>

          <Card className="border-slate-200 dark:border-slate-800">
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm text-slate-500 dark:text-slate-400 font-medium uppercase tracking-wide">
                    Next Due Date
                  </p>
                  <h3 className="text-3xl font-bold text-slate-900 dark:text-white mt-2">
                    {formatDate(nextDueDate)}
                  </h3>
                </div>
                <div className="p-2 bg-blue-50 dark:bg-blue-900/20 rounded-lg text-blue-600 dark:text-blue-400">
                  <Calendar className="h-6 w-6" />
                </div>
              </div>
              <div className={cn(
                "flex items-center gap-1 mt-4 text-sm font-medium",
                getDaysUntilDue() <= 5 ? "text-red-600 dark:text-red-400" : "text-slate-600 dark:text-slate-400"
              )}>
                <AlertCircle className="h-4 w-4" />
                <span>Due in {getDaysUntilDue()} days</span>
              </div>
            </CardContent>
          </Card>

          <Card className="border-slate-200 dark:border-slate-800">
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm text-slate-500 dark:text-slate-400 font-medium uppercase tracking-wide">
                    Insurance Status
                  </p>
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white mt-2">
                    Processing
                  </h3>
                </div>
                <div className="p-2 bg-orange-50 dark:bg-orange-900/20 rounded-lg text-orange-600 dark:text-orange-400">
                  <Shield className="h-6 w-6" />
                </div>
              </div>
              <div className="mt-4">
                <div className="w-full bg-slate-100 dark:bg-slate-700 rounded-full h-2">
                  <div className="bg-orange-500 h-2 rounded-full" style={{ width: '60%' }}></div>
                </div>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-2">
                  60% processed
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
          {/* Left Column - Invoices */}
          <div className="lg:col-span-2 space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold text-slate-900 dark:text-white">
                Invoices & Statements
              </h2>
              <Button
                variant="ghost"
                size="sm"
                className="gap-1"
                onClick={() => router.push("/billing/history")}
              >
                View Full History
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>

            {/* Tabs */}
            <Tabs defaultValue="current" value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="grid grid-cols-3 w-full">
                <TabsTrigger value="current">Current</TabsTrigger>
                <TabsTrigger value="pending">Pending</TabsTrigger>
                <TabsTrigger value="history">History</TabsTrigger>
              </TabsList>

              <TabsContent value="current" className="mt-4">
                <Card>
                  <CardContent className="p-0">
                    <div className="overflow-x-auto">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Date</TableHead>
                            <TableHead>Description</TableHead>
                            <TableHead>Provider</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead className="text-right">Amount</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {invoices.slice(0, 3).map((invoice) => {
                            const StatusIcon = statusIcons[invoice.status];
                            return (
                              <TableRow 
                                key={invoice.id}
                                className="cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-800/50"
                                onClick={() => setSelectedInvoice(invoice)}
                              >
                                <TableCell className="font-medium">
                                  {formatDate(invoice.date)}
                                </TableCell>
                                <TableCell>
                                  <div>
                                    <p className="font-medium">{invoice.description}</p>
                                    {invoice.details && (
                                      <p className="text-xs text-slate-500 dark:text-slate-400">
                                        {invoice.details}
                                      </p>
                                    )}
                                  </div>
                                </TableCell>
                                <TableCell>{invoice.provider}</TableCell>
                                <TableCell>
                                  <Badge className={cn("gap-1", statusColors[invoice.status])}>
                                    <StatusIcon className="h-3 w-3" />
                                    {invoice.status.charAt(0).toUpperCase() + invoice.status.slice(1)}
                                  </Badge>
                                </TableCell>
                                <TableCell className="text-right font-bold">
                                  {formatCurrency(invoice.amount)}
                                </TableCell>
                              </TableRow>
                            );
                          })}
                        </TableBody>
                      </Table>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="pending" className="mt-4">
                <Card>
                  <CardContent className="p-6">
                    <div className="space-y-4">
                      {pendingInvoices.map((invoice) => (
                        <div
                          key={invoice.id}
                          className="flex items-center justify-between p-4 border border-slate-200 dark:border-slate-700 rounded-lg hover:border-primary/50 transition-colors"
                        >
                          <div className="flex items-center gap-3">
                            <div className="p-2 bg-amber-50 dark:bg-amber-900/20 rounded-lg">
                              <Clock className="h-5 w-5 text-amber-600 dark:text-amber-400" />
                            </div>
                            <div>
                              <p className="font-medium">{invoice.description}</p>
                              <p className="text-sm text-slate-500 dark:text-slate-400">
                                Due {formatDate(invoice.date)}
                              </p>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="font-bold">{formatCurrency(invoice.amount)}</p>
                            <Button
                              size="sm"
                              className="mt-2"
                              onClick={() => {
                                setSelectedInvoice(invoice);
                                setShowPaymentModal(true);
                              }}
                            >
                              Pay Now
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>

            {/* Recent Payments */}
            <div className="space-y-4">
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                Recent Payments
              </h3>
              <Card>
                <CardContent className="p-6">
                  <div className="space-y-4">
                    {payments.map((payment) => {
                      const MethodIcon = paymentMethodIcons[payment.method];
                      return (
                        <div
                          key={payment.id}
                          className="flex items-center justify-between py-3 border-b border-slate-100 dark:border-slate-800 last:border-0"
                        >
                          <div className="flex items-center gap-3">
                            <div className="p-2 bg-green-100 dark:bg-green-900/30 rounded-lg">
                              <CheckCircle className="h-5 w-5 text-green-600 dark:text-green-400" />
                            </div>
                            <div>
                              <p className="font-bold">Invoice #{payment.invoiceId}</p>
                              <div className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400">
                                <span>{formatDate(payment.date)}</span>
                                <span>•</span>
                                <span className="flex items-center gap-1">
                                  <MethodIcon className="h-3 w-3" />
                                  {payment.method.replace('_', ' ')}
                                </span>
                              </div>
                            </div>
                          </div>
                          <p className="font-bold">{formatCurrency(payment.amount)}</p>
                        </div>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Right Column - Payment Actions */}
          <div className="space-y-6">
            {/* Payment Summary */}
            <Card className="sticky top-24 border-slate-200 dark:border-slate-800 shadow-lg">
              <CardHeader>
                <CardTitle className="text-lg">Payment Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-500 dark:text-slate-400">Subtotal</span>
                    <span className="font-medium">{formatCurrency(totalOutstanding)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-500 dark:text-slate-400 flex items-center gap-1">
                      Insurance Coverage
                      <HelpCircle className="h-3 w-3" />
                    </span>
                    <span className="font-medium">{formatCurrency(0)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-500 dark:text-slate-400">Taxes</span>
                    <span className="font-medium">{formatCurrency(0)}</span>
                  </div>
                  <Separator />
                  <div className="flex justify-between items-end">
                    <span className="text-base font-bold">Total Due</span>
                    <span className="text-2xl font-bold text-primary">
                      {formatCurrency(totalOutstanding)}
                    </span>
                  </div>
                </div>

                <div className="space-y-3">
                  <Button
                    className="w-full gap-2 shadow-lg"
                    size="lg"
                    onClick={() => setShowPaymentModal(true)}
                    disabled={isProcessing}
                  >
                    {isProcessing ? (
                      <>
                        <div className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent" />
                        Processing...
                      </>
                    ) : (
                      <>
                        Pay Now
                        <ArrowRight className="h-4 w-4" />
                      </>
                    )}
                  </Button>
                  
                  <Button
                    variant="outline"
                    className="w-full gap-2"
                    size="lg"
                    onClick={() => router.push("/billing/setup-payment")}
                  >
                    <Wallet className="h-4 w-4" />
                    Setup Auto-Pay
                  </Button>
                </div>

                <div className="flex items-center justify-center gap-2 text-xs text-slate-500 dark:text-slate-400">
                  <Lock className="h-3 w-3" />
                  <span>Payments are secure and encrypted</span>
                </div>

                <div className="pt-6 border-t border-slate-200 dark:border-slate-700">
                  <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 mb-3 uppercase tracking-wider">
                    Payment Methods
                  </p>
                  <div className="space-y-3">
                    {paymentCards.map((card) => (
                      <div
                        key={card.id}
                        className={cn(
                          "flex items-center justify-between p-3 border rounded-lg cursor-pointer transition-all",
                          card.isDefault
                            ? "border-primary bg-primary/5"
                            : "border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600"
                        )}
                      >
                        <div className="flex items-center gap-3">
                          <div className={cn(
                            "h-8 w-12 rounded flex items-center justify-center text-xs font-bold text-white",
                            cardTypeColors[card.type]
                          )}>
                            {getCardIcon(card.type)}
                          </div>
                          <div>
                            <p className="font-medium">•••• {card.last4}</p>
                            <p className="text-xs text-slate-500 dark:text-slate-400">
                              Expires {card.expiry}
                            </p>
                          </div>
                        </div>
                        {card.isDefault && (
                          <Badge variant="secondary">Default</Badge>
                        )}
                      </div>
                    ))}
                    <Button
                      variant="ghost"
                      className="w-full gap-2"
                      onClick={() => router.push("/billing/payment-methods")}
                    >
                      <CreditCard className="h-4 w-4" />
                      Add Payment Method
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Help Card */}
            <Card className="bg-gradient-to-r from-primary/5 to-primary/10 border-primary/20">
              <CardContent className="p-6">
                <div className="flex items-start gap-3">
                  <div className="p-2 bg-primary/20 rounded-lg text-primary">
                    <HelpCircle className="h-6 w-6" />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 dark:text-white">
                      Need Help?
                    </h4>
                    <p className="text-sm text-slate-600 dark:text-slate-400 mt-1 leading-relaxed">
                      Questions about your bill or insurance coverage? Our support team is available 24/7.
                    </p>
                    <div className="flex gap-3 mt-4">
                      <Button
                        variant="outline"
                        size="sm"
                        className="gap-2"
                        onClick={() => router.push("/support/chat")}
                      >
                        <Mail className="h-4 w-4" />
                        Chat
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        className="gap-2"
                        onClick={() => router.push("/support/call")}
                      >
                        <Phone className="h-4 w-4" />
                        Call
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Mobile Bottom Navigation */}
        <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800">
          <div className="flex items-center justify-around p-2">
            {[
              { icon: Home, label: "Home", href: "/dashboard" },
              { icon: Calendar, label: "Appointments", href: "/appointments" },
              { icon: Video, label: "Telehealth", href: "/telehealth" },
              { icon: CreditCard, label: "Billing", href: "/billing", active: true },
              { icon: FileText, label: "Records", href: "/records" },
            ].map((item) => (
              <button
                key={item.label}
                onClick={() => router.push(item.href)}
                className={cn(
                  "flex flex-col items-center p-2 rounded-lg transition-colors",
                  item.active
                    ? "text-primary"
                    : "text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-300"
                )}
              >
                <item.icon className="h-5 w-5 mb-1" />
                <span className="text-xs">{item.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Bottom padding for mobile navigation */}
        <div className="lg:hidden h-16"></div>
      </main>

      {/* Payment Modal */}
      {showPaymentModal && selectedInvoice && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <Card className="w-full max-w-md">
            <CardHeader>
              <CardTitle>Confirm Payment</CardTitle>
              <CardDescription>
                Pay invoice #{selectedInvoice.id}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-slate-500 dark:text-slate-400">Description</span>
                  <span className="font-medium">{selectedInvoice.description}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500 dark:text-slate-400">Provider</span>
                  <span className="font-medium">{selectedInvoice.provider}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500 dark:text-slate-400">Date</span>
                  <span className="font-medium">{formatDate(selectedInvoice.date)}</span>
                </div>
                <Separator />
                <div className="flex justify-between text-lg font-bold">
                  <span>Total Amount</span>
                  <span>{formatCurrency(selectedInvoice.amount)}</span>
                </div>
              </div>

              <div className="space-y-3">
                <p className="text-sm font-medium">Select Payment Method</p>
                <div className="grid grid-cols-2 gap-2">
                  {paymentCards.map((card) => (
                    <button
                      key={card.id}
                      className={cn(
                        "p-3 border rounded-lg text-left transition-all",
                        card.isDefault
                          ? "border-primary bg-primary/5"
                          : "border-slate-200 dark:border-slate-700 hover:border-primary"
                      )}
                    >
                      <div className="flex items-center gap-2">
                        <div className={cn(
                          "h-6 w-8 rounded text-xs font-bold text-white flex items-center justify-center",
                          cardTypeColors[card.type]
                        )}>
                          {getCardIcon(card.type)}
                        </div>
                        <span>•••• {card.last4}</span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex gap-3">
                <Button
                  variant="outline"
                  className="flex-1"
                  onClick={() => setShowPaymentModal(false)}
                >
                  Cancel
                </Button>
                <Button
                  className="flex-1 gap-2"
                  onClick={() => handlePayInvoice(selectedInvoice)}
                  disabled={isProcessing}
                >
                  {isProcessing ? (
                    <>
                      <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                      Processing...
                    </>
                  ) : (
                    <>
                      <Banknote className="h-4 w-4" />
                      Pay Now
                    </>
                  )}
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}