import { ScrollArea } from "../components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { FileText, AlertTriangle, Clock } from "lucide-react";
import { cn } from "@/lib/utils";

interface ShiftHandoverProps {
  beds: Array<{
    id: string;
    number: string;
    type: string;
    status: string;
    ward: string;
    patient?: {
      name: string;
      diagnosis: string;
      estimatedDischarge: string;
    };
    vitals?: {
      isAlert?: boolean;
    };
    notes: Array<{
      id: string;
      author: string;
      text: string;
      timestamp: string;
      isUrgent: boolean;
    }>;
  }>;
}

export function ShiftHandover({ beds }: ShiftHandoverProps) {
  const occupiedBeds = beds.filter((b) => b.status === "occupied");

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-sm font-semibold">Shift Handover Summary</h3>
          <p className="text-xs text-muted-foreground">All active patients with key notes and pending tasks</p>
        </div>
        <Badge variant="outline">{occupiedBeds.length} active patients</Badge>
      </div>

      <ScrollArea className="h-[500px]">
        <div className="space-y-3 pr-4">
          {occupiedBeds.map((bed) => (
            <div key={bed.id} className="rounded-lg border bg-card p-4">
              <div className="flex items-start justify-between mb-2">
                <div>
                  <span className="font-semibold text-sm">Bed {bed.number}</span>
                  <span className="text-xs text-muted-foreground ml-2">{bed.type} · {bed.ward}</span>
                </div>
                {bed.vitals?.isAlert && (
                  <Badge variant="destructive" className="text-xs">
                    <AlertTriangle className="h-3 w-3 mr-1" /> Alert
                  </Badge>
                )}
              </div>
              {bed.patient && (
                <div className="text-sm mb-2">
                  <span className="font-medium">{bed.patient.name}</span>
                  <span className="text-muted-foreground"> · {bed.patient.diagnosis}</span>
                  <div className="flex items-center gap-1 text-xs text-muted-foreground mt-1">
                    <Clock className="h-3 w-3" />
                    Est. discharge: {bed.patient.estimatedDischarge}
                  </div>
                </div>
              )}
              {bed.notes.length > 0 ? (
                <div className="space-y-1.5 mt-2">
                  {bed.notes.map((note) => (
                    <div
                      key={note.id}
                      className={cn(
                        "text-xs p-2 rounded",
                        note.isUrgent ? "bg-destructive/10 border border-destructive/20" : "bg-muted"
                      )}
                    >
                      <div className="flex justify-between">
                        <span className="font-medium">{note.author}</span>
                        <span className="text-muted-foreground">{note.timestamp}</span>
                      </div>
                      <p className="mt-0.5">{note.text}</p>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-xs text-muted-foreground italic flex items-center gap-1">
                  <FileText className="h-3 w-3" /> No notes for this shift
                </p>
              )}
            </div>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
}