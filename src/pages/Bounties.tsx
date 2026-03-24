import { useState } from "react";
import { DollarSign, Calendar, Users, ExternalLink, Filter } from "lucide-react";

interface Bounty {
  id: number;
  category: string;
  difficulty: "Easy" | "Medium" | "Hard" | "Very Hard";
  title: string;
  description: string;
  reward: number;
  daysLeft: number;
  claimed: number;
  sponsor: string;
}

const bounties: Bounty[] = [
  { id: 1, category: "WEB APP", difficulty: "Very Hard", title: "Build a Cross-Platform Video Reposter", description: "Build a web app where a user can upload a video and post it to multiple social media platforms at once: YouTube, Instagram Reels, Facebook, and TikTok.", reward: 500, daysLeft: 66, claimed: 8, sponsor: "AI Squads" },
  { id: 2, category: "WEB APP", difficulty: "Easy", title: "Build Something for the AI Squads Community", description: "This one's wide open. Build something anything that makes the AI Squads community better.", reward: 100, daysLeft: 5, claimed: 11, sponsor: "AI Squads" },
  { id: 3, category: "AI TOOL", difficulty: "Medium", title: "AI-Powered Study Buddy", description: "Create an AI assistant that helps students organize their study materials and generates practice questions.", reward: 300, daysLeft: 30, claimed: 5, sponsor: "AI Squads" },
  { id: 4, category: "DATA", difficulty: "Hard", title: "Community Analytics Dashboard", description: "Build a dashboard to visualize community engagement, learning progress, and collaboration metrics.", reward: 400, daysLeft: 45, claimed: 3, sponsor: "AI Squads" },
];

const difficultyColors: Record<string, string> = {
  Easy: "bg-success/10 text-success",
  Medium: "bg-warning/10 text-warning",
  Hard: "bg-destructive/10 text-destructive",
  "Very Hard": "bg-destructive/20 text-destructive",
};

export default function Bounties() {
  const [categoryFilter, setCategoryFilter] = useState("All");
  const categories = ["All", ...new Set(bounties.map((b) => b.category))];
  const filtered = categoryFilter === "All" ? bounties : bounties.filter((b) => b.category === categoryFilter);

  const totalRewards = bounties.reduce((sum, b) => sum + b.reward, 0);

  return (
    <div className="space-y-6 pb-20 lg:pb-0">
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-display font-bold text-foreground">Bounties</h1>
          <p className="text-muted-foreground mt-1">Claim a project, build a solution, win rewards.</p>
        </div>
        <div className="flex items-center gap-4">
          <div className="text-right">
            <p className="text-2xl font-bold text-success">${totalRewards.toLocaleString()}</p>
            <p className="text-xs text-muted-foreground uppercase tracking-wider">In Rewards</p>
          </div>
          <div className="text-right">
            <p className="text-2xl font-bold text-foreground">{bounties.length}</p>
            <p className="text-xs text-muted-foreground uppercase tracking-wider">Bounties</p>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="flex items-center gap-2 flex-wrap">
        <Filter className="w-4 h-4 text-muted-foreground" />
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setCategoryFilter(cat)}
            className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
              categoryFilter === cat
                ? "bg-primary text-primary-foreground"
                : "bg-secondary text-muted-foreground hover:text-foreground"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filtered.map((bounty) => (
          <div key={bounty.id} className="relative overflow-hidden bg-card rounded-lg p-5 shadow-card hover:-translate-y-1 hover:shadow-glow transition-all cursor-pointer card-accent-top">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-medium text-primary flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                {bounty.category}
              </span>
              <span className={`text-xs font-bold uppercase px-2 py-0.5 rounded-full ${difficultyColors[bounty.difficulty]}`}>
                {bounty.difficulty}
              </span>
            </div>
            <h3 className="font-display font-bold text-foreground mb-2">{bounty.title}</h3>
            <p className="text-sm text-muted-foreground line-clamp-2 mb-4">{bounty.description}</p>
            <div className="flex items-center gap-3 mb-3">
              <span className="flex items-center gap-1 text-sm font-bold text-success">
                <DollarSign className="w-4 h-4" /> ${bounty.reward}
              </span>
              <span className="flex items-center gap-1 text-xs text-muted-foreground">
                <Calendar className="w-3 h-3" /> {bounty.daysLeft}d left
              </span>
            </div>
            <div className="flex items-center justify-between pt-3 border-t border-border">
              <span className="flex items-center gap-1 text-xs text-muted-foreground">
                <Users className="w-3 h-3" /> {bounty.claimed} claimed
              </span>
              <span className="text-xs text-muted-foreground">{bounty.sponsor}</span>
              <ExternalLink className="w-4 h-4 text-muted-foreground" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
