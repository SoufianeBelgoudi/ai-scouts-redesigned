import { useState } from "react";
import { User, Palette, Share2, Save, Copy, Check, Sun, Moon, Monitor } from "lucide-react";
import { useTheme } from "@/hooks/useTheme";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { toast } from "sonner";

export default function Settings() {
  const { theme, setTheme } = useTheme();
  const [profile, setProfile] = useState({
    name: "Soufiane Belgoudi",
    email: "soufiane@example.com",
    bio: "AI enthusiast and builder. Passionate about using technology to solve real-world problems.",
    university: "University of Tech",
    linkedin: "https://linkedin.com/in/soufiane",
  });
  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState<"profile" | "appearance" | "referral">("profile");

  const referralCode = "SOUFI-AI-2024";
  const referralLink = `https://portal.aisquads.org/join?ref=${referralCode}`;

  const handleCopyReferral = () => {
    navigator.clipboard.writeText(referralLink);
    setCopied(true);
    toast.success("Referral link copied!");
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSave = () => {
    toast.success("Profile updated successfully!");
  };

  const tabs = [
    { id: "profile" as const, label: "Profile", icon: User },
    { id: "appearance" as const, label: "Appearance", icon: Palette },
    { id: "referral" as const, label: "Referrals", icon: Share2 },
  ];

  return (
    <div className="space-y-6 pb-20 lg:pb-0 max-w-3xl">
      <div>
        <h1 className="text-3xl font-display font-bold text-foreground">Settings</h1>
        <p className="text-muted-foreground mt-1">Manage your profile and preferences.</p>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 bg-secondary/50 rounded-lg p-1">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-all flex-1 justify-center ${
              activeTab === tab.id
                ? "bg-card text-foreground shadow-card"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            <tab.icon className="w-4 h-4" />
            <span className="hidden sm:inline">{tab.label}</span>
          </button>
        ))}
      </div>

      {/* Profile Tab */}
      {activeTab === "profile" && (
        <div className="bg-card rounded-lg p-6 shadow-card relative overflow-hidden card-accent-top space-y-6">
          <div className="flex items-center gap-4">
            <Avatar className="w-20 h-20 ring-2 ring-primary/30">
              <AvatarImage src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&crop=face" />
              <AvatarFallback className="bg-primary text-primary-foreground text-xl font-bold">SB</AvatarFallback>
            </Avatar>
            <div>
              <h3 className="font-display font-bold text-foreground text-lg">{profile.name}</h3>
              <p className="text-sm text-muted-foreground">Squad 2 · Cohort #3</p>
              <button className="mt-1 text-xs text-primary hover:underline">Change avatar</button>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Full Name</label>
              <input value={profile.name} onChange={(e) => setProfile({ ...profile, name: e.target.value })} className="w-full mt-1 px-3 py-2.5 bg-secondary border border-border rounded-lg text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50" />
            </div>
            <div>
              <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Email</label>
              <input value={profile.email} onChange={(e) => setProfile({ ...profile, email: e.target.value })} className="w-full mt-1 px-3 py-2.5 bg-secondary border border-border rounded-lg text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50" />
            </div>
            <div>
              <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider">University</label>
              <input value={profile.university} onChange={(e) => setProfile({ ...profile, university: e.target.value })} className="w-full mt-1 px-3 py-2.5 bg-secondary border border-border rounded-lg text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50" />
            </div>
            <div>
              <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider">LinkedIn URL</label>
              <input value={profile.linkedin} onChange={(e) => setProfile({ ...profile, linkedin: e.target.value })} className="w-full mt-1 px-3 py-2.5 bg-secondary border border-border rounded-lg text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50" />
            </div>
          </div>

          <div>
            <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Bio</label>
            <textarea value={profile.bio} onChange={(e) => setProfile({ ...profile, bio: e.target.value })} rows={3} className="w-full mt-1 px-3 py-2.5 bg-secondary border border-border rounded-lg text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 resize-none" />
          </div>

          <button onClick={handleSave} className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-gradient-primary text-primary-foreground text-sm font-semibold hover:opacity-90 transition-opacity shadow-glow">
            <Save className="w-4 h-4" /> Save Changes
          </button>
        </div>
      )}

      {/* Appearance Tab */}
      {activeTab === "appearance" && (
        <div className="bg-card rounded-lg p-6 shadow-card relative overflow-hidden card-accent-top space-y-6">
          <h3 className="font-display font-bold text-foreground text-lg">Theme</h3>
          <p className="text-sm text-muted-foreground">Choose how the portal looks for you.</p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {([
              { id: "dark" as const, label: "Dark", icon: Moon, desc: "Easy on the eyes" },
              { id: "light" as const, label: "Light", icon: Sun, desc: "Classic bright mode" },
            ]).map((opt) => (
              <button
                key={opt.id}
                onClick={() => setTheme(opt.id)}
                className={`flex flex-col items-center gap-2 p-5 rounded-lg border-2 transition-all ${
                  theme === opt.id
                    ? "border-primary bg-primary/5 shadow-glow"
                    : "border-border hover:border-muted-foreground/30"
                }`}
              >
                <opt.icon className={`w-8 h-8 ${theme === opt.id ? "text-primary" : "text-muted-foreground"}`} />
                <span className="text-sm font-semibold text-foreground">{opt.label}</span>
                <span className="text-xs text-muted-foreground">{opt.desc}</span>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Referral Tab */}
      {activeTab === "referral" && (
        <div className="bg-card rounded-lg p-6 shadow-card relative overflow-hidden card-accent-top space-y-6">
          <h3 className="font-display font-bold text-foreground text-lg">Refer Friends</h3>
          <p className="text-sm text-muted-foreground">Share your referral link and earn rewards when friends join AI Squads.</p>

          <div className="bg-secondary rounded-lg p-4">
            <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-2">Your Referral Code</p>
            <p className="text-xl font-bold font-display text-gradient">{referralCode}</p>
          </div>

          <div>
            <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-2">Referral Link</p>
            <div className="flex items-center gap-2">
              <input readOnly value={referralLink} className="flex-1 px-3 py-2.5 bg-secondary border border-border rounded-lg text-sm text-foreground" />
              <button onClick={handleCopyReferral} className="px-4 py-2.5 rounded-lg bg-primary text-primary-foreground text-sm font-semibold hover:opacity-90 transition-opacity flex items-center gap-2">
                {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                {copied ? "Copied" : "Copy"}
              </button>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4 pt-4 border-t border-border">
            <div className="text-center">
              <p className="text-2xl font-bold font-display text-foreground">5</p>
              <p className="text-xs text-muted-foreground">Friends Referred</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold font-display text-success">3</p>
              <p className="text-xs text-muted-foreground">Active Users</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold font-display text-warning">150</p>
              <p className="text-xs text-muted-foreground">XP Earned</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
