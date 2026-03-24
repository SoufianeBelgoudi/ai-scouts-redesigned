import { Trophy } from "lucide-react";

const leaders = [
  { name: "Victoria L.", xp: 2100, avatar: "VL" },
  { name: "Ian M.", xp: 1950, avatar: "IM" },
  { name: "Soufiane B.", xp: 1240, avatar: "SB", isYou: true },
  { name: "Felicity J.", xp: 1180, avatar: "FJ" },
  { name: "Carlos E.", xp: 1050, avatar: "CE" },
];

export function LeaderboardWidget() {
  return (
    <div className="bg-card rounded-lg p-5 shadow-card relative overflow-hidden card-accent-top h-full">
      <div className="flex items-center gap-2 mb-4">
        <Trophy className="w-5 h-5 text-warning" />
        <h2 className="text-lg font-display font-bold text-foreground">Leaderboard</h2>
      </div>
      <div className="space-y-3">
        {leaders.map((l, i) => (
          <div key={l.name} className={`flex items-center gap-3 p-2 rounded-lg transition-colors ${l.isYou ? "bg-primary/10" : "hover:bg-secondary/50"}`}>
            <span className={`w-6 text-center text-sm font-bold ${i < 3 ? "text-warning" : "text-muted-foreground"}`}>
              {i + 1}
            </span>
            <div className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center text-xs font-bold text-foreground">
              {l.avatar}
            </div>
            <span className={`flex-1 text-sm font-medium ${l.isYou ? "text-primary" : "text-foreground"}`}>
              {l.name} {l.isYou && <span className="text-xs text-muted-foreground">(You)</span>}
            </span>
            <span className="text-sm font-bold text-muted-foreground">{l.xp.toLocaleString()} XP</span>
          </div>
        ))}
      </div>
    </div>
  );
}
