import { MessageSquare, Award, Upload, UserPlus } from "lucide-react";

const activities = [
  { icon: Award, text: "You earned the Community badge!", time: "2 hours ago", color: "text-success" },
  { icon: Upload, text: "Video blog W4 uploaded successfully", time: "1 day ago", color: "text-primary" },
  { icon: MessageSquare, text: "New discussion in Squad 2 chat", time: "1 day ago", color: "text-warning" },
  { icon: UserPlus, text: "3 new members joined your squad", time: "3 days ago", color: "text-muted-foreground" },
];

export function ActivityFeed() {
  return (
    <section>
      <h2 className="text-xl font-display font-bold text-foreground mb-4">Recent Activity</h2>
      <div className="bg-card rounded-lg shadow-card divide-y divide-border relative overflow-hidden card-accent-top">
        {activities.map((a, i) => (
          <div key={i} className="flex items-center gap-4 p-4 hover:bg-secondary/30 transition-colors">
            <div className={`w-9 h-9 rounded-full bg-secondary flex items-center justify-center ${a.color}`}>
              <a.icon className="w-4 h-4" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm text-foreground">{a.text}</p>
              <p className="text-xs text-muted-foreground">{a.time}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
