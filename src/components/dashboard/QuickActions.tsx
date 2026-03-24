import { Video, FileText, MessageCircle, Zap } from "lucide-react";
import { Link } from "react-router-dom";

const actions = [
  { icon: Video, label: "Record Vlog", description: "Upload your weekly video", to: "/", color: "bg-primary/10 text-primary" },
  { icon: FileText, label: "Submit Badge", description: "Complete badge requirements", to: "/", color: "bg-success/10 text-success" },
  { icon: MessageCircle, label: "Squad Chat", description: "Connect with your team", to: "/squad", color: "bg-warning/10 text-warning" },
  { icon: Zap, label: "Claim Bounty", description: "Browse available bounties", to: "/bounties", color: "bg-destructive/10 text-destructive" },
];

export function QuickActions() {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
      {actions.map((a) => (
        <Link
          key={a.label}
          to={a.to}
          className="flex items-center gap-3 bg-card rounded-lg p-4 shadow-card hover:-translate-y-0.5 hover:shadow-glow transition-all group"
        >
          <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${a.color} group-hover:scale-110 transition-transform`}>
            <a.icon className="w-5 h-5" />
          </div>
          <div className="min-w-0">
            <p className="text-sm font-semibold text-foreground">{a.label}</p>
            <p className="text-xs text-muted-foreground truncate">{a.description}</p>
          </div>
        </Link>
      ))}
    </div>
  );
}
