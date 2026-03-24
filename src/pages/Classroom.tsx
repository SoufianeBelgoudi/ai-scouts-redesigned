import { Play, Lock, CheckCircle2, Clock } from "lucide-react";

const modules = [
  { title: "Introduction to AI & Machine Learning", duration: "45 min", status: "completed", lessons: 4 },
  { title: "Prompt Engineering Fundamentals", duration: "60 min", status: "completed", lessons: 5 },
  { title: "Building Your First AI App", duration: "90 min", status: "in-progress", lessons: 6, progress: 3 },
  { title: "APIs & Integrations", duration: "75 min", status: "locked", lessons: 5 },
  { title: "Deployment & Demo Prep", duration: "60 min", status: "locked", lessons: 4 },
];

export default function Classroom() {
  return (
    <div className="space-y-6 pb-20 lg:pb-0">
      <div>
        <h1 className="text-3xl font-display font-bold text-foreground">
          Classroom <span className="text-sm font-medium uppercase tracking-wider text-primary bg-primary/10 px-2 py-0.5 rounded-full align-middle">Beta</span>
        </h1>
        <p className="text-muted-foreground mt-1">Structured learning modules to level up your AI skills.</p>
      </div>

      <div className="space-y-3">
        {modules.map((mod, i) => {
          const isLocked = mod.status === "locked";
          const isDone = mod.status === "completed";
          const inProgress = mod.status === "in-progress";

          return (
            <div key={mod.title} className={`relative overflow-hidden bg-card rounded-lg p-5 shadow-card transition-all card-accent-top ${isLocked ? "opacity-60" : "hover:-translate-y-0.5 hover:shadow-glow cursor-pointer"}`}>
              <div className="flex items-center gap-4">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 ${
                  isDone ? "bg-success/10 text-success" :
                  inProgress ? "bg-primary/10 text-primary" :
                  "bg-muted text-muted-foreground"
                }`}>
                  {isDone ? <CheckCircle2 className="w-6 h-6" /> :
                   isLocked ? <Lock className="w-5 h-5" /> :
                   <Play className="w-5 h-5" />}
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-display font-bold text-foreground">{mod.title}</h3>
                  <div className="flex items-center gap-3 mt-1 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {mod.duration}</span>
                    <span>{mod.lessons} lessons</span>
                  </div>
                  {inProgress && mod.progress && (
                    <div className="mt-2 flex items-center gap-2">
                      <div className="flex-1 h-1.5 bg-muted rounded-full overflow-hidden">
                        <div className="h-full bg-primary rounded-full transition-all" style={{ width: `${(mod.progress / mod.lessons) * 100}%` }} />
                      </div>
                      <span className="text-xs text-primary font-medium">{mod.progress}/{mod.lessons}</span>
                    </div>
                  )}
                </div>
                <span className={`text-xs font-bold uppercase px-2 py-1 rounded-full ${
                  isDone ? "bg-success/10 text-success" :
                  inProgress ? "bg-primary/10 text-primary" :
                  "bg-muted text-muted-foreground"
                }`}>
                  {isDone ? "Done" : inProgress ? "Continue" : "Locked"}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
