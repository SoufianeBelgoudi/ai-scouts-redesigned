interface BadgeCardProps {
  name: string;
  description: string;
  emoji: string;
  progress: boolean[];
  earned: boolean;
}

export function BadgeCard({ name, description, emoji, progress, earned }: BadgeCardProps) {
  const completed = progress.filter(Boolean).length;
  const total = progress.length;

  return (
    <div className={`relative overflow-hidden bg-card rounded-lg p-5 shadow-card transition-all hover:-translate-y-1 hover:shadow-glow cursor-pointer group card-accent-top ${earned ? "ring-1 ring-success/40" : ""}`}>
      {earned && (
        <span className="absolute top-3 right-3 text-xs font-bold uppercase tracking-wider text-success bg-success/10 px-2 py-0.5 rounded-full">
          Earned
        </span>
      )}
      <div className="text-4xl mb-3 group-hover:scale-110 transition-transform">{emoji}</div>
      <h3 className="font-display font-bold text-foreground text-sm tracking-wider uppercase">{name}</h3>
      <p className="text-xs text-muted-foreground mt-1 leading-relaxed">{description}</p>
      <div className="flex gap-1.5 mt-3">
        {progress.map((done, i) => (
          <span key={i} className={`w-3 h-3 rounded-full ${done ? "bg-success" : "bg-muted"}`} />
        ))}
      </div>
      <p className="text-xs text-muted-foreground mt-2">{completed}/{total} completed</p>
    </div>
  );
}
