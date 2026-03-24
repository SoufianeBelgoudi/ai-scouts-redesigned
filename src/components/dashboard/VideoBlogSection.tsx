import { CheckCircle2, Circle } from "lucide-react";

const weeks = [
  { week: "W1", done: true },
  { week: "W2", done: true },
  { week: "W3", done: true },
  { week: "W4", done: true },
  { week: "W5", done: false },
];

export function VideoBlogSection() {
  return (
    <div className="bg-card rounded-lg p-5 shadow-card relative overflow-hidden card-accent-top">
      <h2 className="text-lg font-display font-bold text-foreground mb-1">Video Blogs</h2>
      <p className="text-sm text-muted-foreground mb-4">Record a short video blog each week to share your progress.</p>
      <div className="flex items-center gap-4">
        {weeks.map((w) => (
          <div key={w.week} className="flex flex-col items-center gap-2">
            {w.done ? (
              <CheckCircle2 className="w-10 h-10 text-success" />
            ) : (
              <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center">
                <span className="text-xs font-bold text-muted-foreground">{w.week}</span>
              </div>
            )}
            <span className="text-xs text-muted-foreground font-medium">{w.week}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
