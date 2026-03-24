import { BadgeCard } from "@/components/dashboard/BadgeCard";
import { StatsOverview } from "@/components/dashboard/StatsOverview";
import { VideoBlogSection } from "@/components/dashboard/VideoBlogSection";
import { LeaderboardWidget } from "@/components/dashboard/LeaderboardWidget";
import { ActivityFeed } from "@/components/dashboard/ActivityFeed";
import { QuickActions } from "@/components/dashboard/QuickActions";

const badges = [
  { name: "IDEA", description: "Innovation and ideation mastery", emoji: "💡", progress: [true, true, false, false], earned: false },
  { name: "BUILD", description: "Technical implementation and development", emoji: "🛠️", progress: [true, false, false, false], earned: false },
  { name: "LAUNCH", description: "Go-to-market and growth strategies", emoji: "🚀", progress: [false, false, false, false], earned: false },
  { name: "COMMUNITY", description: "Building and contributing to the AI Squads community", emoji: "👥", progress: [true, false, false, false], earned: true },
];

export default function Index() {
  return (
    <div className="space-y-8 pb-20 lg:pb-0">
      {/* Welcome */}
      <div>
        <h1 className="text-3xl font-display font-bold text-foreground">
          Welcome back, <span className="text-gradient">Soufiane</span> 👋
        </h1>
        <p className="text-muted-foreground mt-1">Here's your learning journey overview.</p>
      </div>

      {/* Quick Actions (new feature) */}
      <QuickActions />

      {/* Stats */}
      <StatsOverview />

      {/* Badges */}
      <section>
        <h2 className="text-xl font-display font-bold text-foreground mb-1">Your Badges</h2>
        <p className="text-sm text-muted-foreground mb-4">Click any badge to view its requirements and your progress.</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {badges.map((badge) => (
            <BadgeCard key={badge.name} {...badge} />
          ))}
        </div>
      </section>

      {/* Two column: Video Blogs + Leaderboard */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <VideoBlogSection />
        </div>
        <div>
          <LeaderboardWidget />
        </div>
      </div>

      {/* Activity Feed (new feature) */}
      <ActivityFeed />
    </div>
  );
}
