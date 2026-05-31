import * as React from "react";
import { AlertTriangle, Info, Lightbulb, Target } from "lucide-react";
import { cn } from "@/lib/utils";

type CalloutType = "trap" | "tip" | "info" | "key";

const styles: Record<
  CalloutType,
  { icon: React.ComponentType<{ className?: string }>; wrap: string; iconColor: string; label: string }
> = {
  trap: {
    icon: AlertTriangle,
    wrap: "border-destructive/30 bg-destructive/5",
    iconColor: "text-destructive",
    label: "Exam trap",
  },
  tip: {
    icon: Lightbulb,
    wrap: "border-success/30 bg-success/5",
    iconColor: "text-success",
    label: "Tip",
  },
  info: {
    icon: Info,
    wrap: "border-primary/30 bg-primary/5",
    iconColor: "text-primary",
    label: "Note",
  },
  key: {
    icon: Target,
    wrap: "border-accent/30 bg-accent/5",
    iconColor: "text-accent",
    label: "Key point",
  },
};

interface CalloutProps {
  type?: CalloutType;
  title?: string;
  children: React.ReactNode;
}

export function Callout({ type = "info", title, children }: CalloutProps) {
  const s = styles[type];
  const Icon = s.icon;
  return (
    <div className={cn("my-4 flex gap-3 rounded-lg border p-4", s.wrap)}>
      <Icon className={cn("mt-0.5 h-5 w-5 shrink-0", s.iconColor)} />
      <div className="text-sm leading-relaxed">
        <p className={cn("mb-1 font-semibold", s.iconColor)}>{title ?? s.label}</p>
        <div className="text-foreground/90 [&>ul]:mt-1 [&>ul]:list-disc [&>ul]:pl-5 [&>ul>li]:mb-1">
          {children}
        </div>
      </div>
    </div>
  );
}
