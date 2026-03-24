import { NavLink } from "react-router-dom";
import { Home, Users, Layers, Rocket, Settings } from "lucide-react";

const items = [
  { icon: Home, label: "Home", to: "/" },
  { icon: Users, label: "Squad", to: "/squad" },
  { icon: Layers, label: "Cohort", to: "/cohort" },
  { icon: Rocket, label: "Bounties", to: "/bounties" },
  { icon: Settings, label: "Settings", to: "/settings" },
];

export function MobileNav() {
  return (
    <nav className="lg:hidden fixed bottom-0 inset-x-0 z-30 bg-card/95 backdrop-blur-md border-t border-border">
      <div className="flex items-center justify-around py-2">
        {items.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) =>
              `flex flex-col items-center gap-0.5 px-3 py-1.5 text-xs font-medium transition-colors ${
                isActive ? "text-primary" : "text-muted-foreground"
              }`
            }
          >
            <item.icon className="w-5 h-5" />
            {item.label}
          </NavLink>
        ))}
      </div>
    </nav>
  );
}
