import { NavLink, useLocation } from "react-router-dom";
import {
  Home, Users, Layers, Rocket, FolderKanban, BookOpen,
  Settings, LogOut, Sun, Moon, Linkedin, X
} from "lucide-react";
import { useTheme } from "@/hooks/useTheme";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const navItems = [
  { icon: Home, label: "Home", to: "/" },
  { icon: Users, label: "Squad", to: "/squad" },
  { icon: Layers, label: "Cohort #3", to: "/cohort" },
  { icon: Rocket, label: "Bounties", to: "/bounties" },
  { icon: FolderKanban, label: "Projects", to: "/projects" },
  { icon: BookOpen, label: "Resources", to: "/resources" },
];

const weeklyProgress = {
  labels: ["W1", "W2", "W3", "W4", "W5"],
  rows: [
    { name: "Attendance", status: ["miss", "done", "done", "done", "pending"] },
    { name: "Badge", status: ["done", "done", "pending", "skip", "done"] },
    { name: "Video Blog", status: ["done", "done", "done", "done", "pending"] },
  ],
};

function StatusDot({ status }: { status: string }) {
  const colors: Record<string, string> = {
    done: "bg-success",
    miss: "bg-destructive",
    pending: "bg-muted-foreground/40",
    skip: "bg-foreground",
  };
  return <span className={`w-2.5 h-2.5 rounded-full inline-block ${colors[status] || colors.pending}`} />;
}

export function Sidebar({ onClose }: { onClose?: () => void }) {
  const { theme, toggle } = useTheme();
  const location = useLocation();

  return (
    <div className="flex flex-col h-full p-4 gap-4 overflow-y-auto">
      {/* Close button mobile */}
      {onClose && (
        <button onClick={onClose} className="self-end p-1 rounded-md hover:bg-secondary text-muted-foreground lg:hidden">
          <X className="w-5 h-5" />
        </button>
      )}

      {/* Profile card */}
      <div className="flex flex-col items-center text-center bg-card rounded-lg p-5 shadow-card relative overflow-hidden card-accent-top">
        <Avatar className="w-20 h-20 mb-3 ring-2 ring-primary/30">
          <AvatarImage src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&crop=face" />
          <AvatarFallback className="bg-primary text-primary-foreground text-xl font-bold">SB</AvatarFallback>
        </Avatar>
        <h3 className="font-display font-bold text-foreground">Soufiane Belgoudi</h3>
        <p className="text-sm text-muted-foreground">Squad 2</p>
        <a href="#" className="mt-2 text-primary hover:text-primary/80 transition-colors">
          <Linkedin className="w-5 h-5" />
        </a>
        <div className="w-full border-t border-border mt-4 pt-3">
          <p className="text-2xl font-bold text-foreground">2</p>
          <p className="text-xs text-muted-foreground">Badges Earned</p>
        </div>
      </div>

      {/* Weekly Progress */}
      <div className="bg-card rounded-lg p-4 shadow-card">
        <h4 className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-3">Weekly Progress</h4>
        <div className="space-y-2">
          <div className="grid grid-cols-6 gap-1 text-xs text-muted-foreground font-medium">
            <span />
            {weeklyProgress.labels.map((w) => <span key={w} className="text-center">{w}</span>)}
          </div>
          {weeklyProgress.rows.map((row) => (
            <div key={row.name} className="grid grid-cols-6 gap-1 items-center text-xs">
              <span className="text-muted-foreground truncate">{row.name}</span>
              {row.status.map((s, i) => (
                <span key={i} className="flex justify-center"><StatusDot status={s} /></span>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* Nav links */}
      <nav className="flex flex-col gap-1">
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            onClick={onClose}
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all ${
                isActive
                  ? "bg-primary/10 text-primary shadow-glow"
                  : "text-muted-foreground hover:bg-secondary hover:text-foreground"
              }`
            }
          >
            <item.icon className="w-4 h-4" />
            {item.label}
          </NavLink>
        ))}
      </nav>

      {/* Spacer */}
      <div className="flex-1" />

      {/* Bottom actions */}
      <div className="flex flex-col gap-1 border-t border-border pt-3">
        <button
          onClick={toggle}
          className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-muted-foreground hover:bg-secondary hover:text-foreground transition-all"
        >
          {theme === "dark" ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          {theme === "dark" ? "Light Mode" : "Dark Mode"}
        </button>
        <NavLink
          to="/settings"
          onClick={onClose}
          className={({ isActive }) =>
            `flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all ${
              isActive
                ? "bg-primary/10 text-primary"
                : "text-muted-foreground hover:bg-secondary hover:text-foreground"
            }`
          }
        >
          <Settings className="w-4 h-4" />
          Settings
        </NavLink>
      </div>
    </div>
  );
}
