import { TrendingUp, Award, Clock, Flame } from "lucide-react";

const stats = [
  { label: "XP Points", value: "1,240", icon: TrendingUp, trend: "+120 this week", color: "text-primary" },
  { label: "Badges Earned", value: "2/4", icon: Award, trend: "50% complete", color: "text-success" },
  { label: "Hours Logged", value: "38", icon: Clock, trend: "8h this week", color: "text-warning" },
  { label: "Day Streak", value: "12", icon: Flame, trend: "Personal best!", color: "text-destructive" },
];

export function StatsOverview() {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat) => (
        <div key={stat.label} className="relative overflow-hidden bg-card rounded-lg p-4 shadow-card card-accent-top">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground">{stat.label}</span>
            <stat.icon className={`w-4 h-4 ${stat.color}`} />
          </div>
          <p className="text-2xl font-bold font-display text-foreground">{stat.value}</p>
          <p className="text-xs text-muted-foreground mt-1">{stat.trend}</p>
        </div>
      ))}
    </div>
  );
}
