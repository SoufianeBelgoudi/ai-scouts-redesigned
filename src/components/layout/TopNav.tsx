import { NavLink } from "react-router-dom";
import { Home, Users, Layers, GraduationCap } from "lucide-react";

const tabs = [
  { icon: Home, label: "Home", to: "/" },
  { icon: Users, label: "Squad", to: "/squad" },
  { icon: Layers, label: "Cohort #3", to: "/cohort" },
  { icon: GraduationCap, label: "Classroom", to: "/classroom", beta: true },
];

export function TopNav() {
  return (
    <nav className="flex-1 flex items-center justify-center">
      <div className="hidden md:flex items-center gap-1 bg-secondary/50 rounded-full px-1 py-1">
        {tabs.map((tab) => (
          <NavLink
            key={tab.to}
            to={tab.to}
            className={({ isActive }) =>
              `flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all ${
                isActive
                  ? "bg-card text-foreground shadow-card"
                  : "text-muted-foreground hover:text-foreground"
              }`
            }
          >
            <tab.icon className="w-4 h-4" />
            {tab.label}
            {tab.beta && (
              <span className="text-[10px] font-bold uppercase tracking-wider text-primary bg-primary/10 px-1.5 py-0.5 rounded-full">
                Beta
              </span>
            )}
          </NavLink>
        ))}
      </div>
    </nav>
  );
}
