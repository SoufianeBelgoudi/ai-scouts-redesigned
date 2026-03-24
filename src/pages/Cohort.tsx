import { useState } from "react";
import { ChevronDown, ChevronUp, CheckCircle2, Circle, Clock } from "lucide-react";

interface Week {
  id: string;
  title: string;
  due: string;
  completed: number;
  total: number;
  current?: boolean;
  content?: string;
  assignments?: string[];
}

const weeks: Week[] = [
  { id: "W1", title: "Kickoff & Ideation", due: "Due Mar 8", completed: 2, total: 3 },
  { id: "W2", title: "Design & Build", due: "Due Mar 15", completed: 3, total: 3 },
  { id: "W3", title: "Deep Work & Progress", due: "Due Mar 22", completed: 3, total: 3 },
  {
    id: "W4", title: "Launch Prep", due: "Due Mar 28", completed: 1, total: 3, current: true,
    content: "Welcome to Week 4 — Launch Prep! This is it — your final push before Demo Day.",
    assignments: [
      "Launch Badge: Due by March 28 (Saturday) at 6:00 AM GMT",
      "Community Badge: Due by April 1 (Wednesday) at 6:00 AM GMT",
      "Video Vlog: Upload your Week 4 Vlog inside the portal",
      "Attendance Form: Make sure you fill this out! ASAP",
    ],
  },
  { id: "W5", title: "Demo Day & Graduation", due: "Due Apr 5", completed: 0, total: 4 },
];

export default function Cohort() {
  const [expanded, setExpanded] = useState<string | null>("W4");

  return (
    <div className="space-y-6 pb-20 lg:pb-0">
      <div>
        <h1 className="text-3xl font-display font-bold text-foreground">Cohort #3</h1>
        <p className="text-muted-foreground mt-1">Your week-by-week journey — badges, assignments, forms, and resources all in one place.</p>
      </div>

      <div className="relative">
        {/* Timeline line */}
        <div className="absolute left-5 top-0 bottom-0 w-0.5 bg-border hidden sm:block" />

        <div className="space-y-4">
          {weeks.map((week) => {
            const isExpanded = expanded === week.id;
            const isDone = week.completed === week.total;
            const isCurrent = week.current;

            return (
              <div key={week.id} className="relative sm:pl-12">
                {/* Timeline dot */}
                <div className={`absolute left-3.5 top-5 w-3 h-3 rounded-full border-2 hidden sm:block ${
                  isCurrent ? "bg-primary border-primary animate-pulse-glow" :
                  isDone ? "bg-success border-success" : "bg-muted border-border"
                }`} />

                <div
                  className={`bg-card rounded-lg shadow-card overflow-hidden transition-all ${
                    isCurrent ? "ring-1 ring-primary/40" : ""
                  }`}
                >
                  <button
                    onClick={() => setExpanded(isExpanded ? null : week.id)}
                    className="w-full flex items-center gap-3 p-4 hover:bg-secondary/30 transition-colors"
                  >
                    <span className={`text-xs font-bold px-2 py-1 rounded ${
                      isCurrent ? "bg-primary text-primary-foreground" : "bg-secondary text-muted-foreground"
                    }`}>
                      {week.id}
                    </span>
                    <span className="font-display font-bold text-foreground flex-1 text-left">
                      {week.title}
                      {isCurrent && (
                        <span className="ml-2 text-xs font-medium uppercase tracking-wider text-primary bg-primary/10 px-2 py-0.5 rounded-full">
                          This Week
                        </span>
                      )}
                    </span>
                    <span className="text-xs text-destructive font-medium hidden sm:block">{week.due}</span>
                    <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${
                      isDone ? "bg-success/10 text-success" : "bg-primary/10 text-primary"
                    }`}>
                      {isDone ? <CheckCircle2 className="w-4 h-4 inline" /> : `${week.completed}/${week.total}`}
                    </span>
                    {isExpanded ? <ChevronUp className="w-4 h-4 text-muted-foreground" /> : <ChevronDown className="w-4 h-4 text-muted-foreground" />}
                  </button>

                  {isExpanded && week.content && (
                    <div className="px-4 pb-4 border-t border-border">
                      <p className="text-sm text-muted-foreground mt-3 mb-4">{week.content}</p>
                      {week.assignments && (
                        <div>
                          <h4 className="text-xs font-bold uppercase tracking-wider text-warning mb-2 flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            Week {week.id.slice(1)} Assignments
                          </h4>
                          <ul className="space-y-2">
                            {week.assignments.map((a, i) => (
                              <li key={i} className="flex items-start gap-2 text-sm text-foreground">
                                <Circle className="w-4 h-4 mt-0.5 text-muted-foreground flex-shrink-0" />
                                {a}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
