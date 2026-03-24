import { useState } from "react";
import { Search, MapPin, Linkedin, Award } from "lucide-react";

const members = [
  { name: "Nathania Pardede", role: "Learner", university: "Jakarta State University", avatar: "", initials: "NP", country: "🇮🇩", badges: 1 },
  { name: "Victoria Langlois", role: "Pediatric Speech Therapist + Yoga Teacher", university: "Université Laval", avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop&crop=face", initials: "VL", country: "🇨🇦", badges: 1 },
  { name: "Ian Maynard", role: "Curious Builder Exploring AI | Lifelong Learner", university: "Moravian College", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&crop=face", initials: "IM", country: "🇺🇸", badges: 0 },
  { name: "Felicity Joseph", role: "Educator & Operations Professional", university: "Ambrose Alli University", avatar: "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=200&h=200&fit=crop&crop=face", initials: "FJ", country: "🇳🇬", badges: 2 },
  { name: "Nermine Mokdad", role: "Aspiring Entrepreneur | University of Toronto", university: "University of Toronto", avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=200&h=200&fit=crop&crop=face", initials: "NM", country: "🇨🇦", badges: 1 },
  { name: "Carlos Estrada", role: "Building cool stuff with AI", university: "University of Szeged", avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop&crop=face", initials: "CE", country: "🇪🇸", badges: 1 },
];

export default function Squad() {
  const [search, setSearch] = useState("");
  const filtered = members.filter((m) => m.name.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="space-y-6 pb-20 lg:pb-0">
      <div>
        <h1 className="text-3xl font-display font-bold text-foreground">Squad Directory</h1>
        <p className="text-muted-foreground mt-1">Connect with fellow squad members.</p>
      </div>

      <div className="relative max-w-md">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <input
          type="text"
          placeholder="Search members..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full pl-10 pr-4 py-2.5 bg-card border border-border rounded-lg text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
        />
      </div>

      <div className="flex items-center gap-2">
        <span className="text-lg">👥</span>
        <h2 className="text-lg font-display font-bold text-foreground">Your Squad</h2>
        <span className="text-xs font-medium bg-secondary text-muted-foreground px-2 py-0.5 rounded-full">Cohort #3 Squad 2</span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map((member) => (
          <div key={member.name} className="relative overflow-hidden bg-card rounded-lg p-5 shadow-card hover:-translate-y-1 hover:shadow-glow transition-all cursor-pointer card-accent-top">
            <div className="flex flex-col items-center text-center">
              {member.avatar ? (
                <img src={member.avatar} alt={member.name} className="w-20 h-20 rounded-full object-cover mb-3 ring-2 ring-border" />
              ) : (
                <div className="w-20 h-20 rounded-full bg-primary/20 flex items-center justify-center mb-3 text-xl font-bold text-primary">
                  {member.initials}
                </div>
              )}
              <h3 className="font-display font-bold text-foreground flex items-center gap-1.5">
                <span>{member.country}</span> {member.name}
              </h3>
              <p className="text-xs text-muted-foreground mt-1 line-clamp-2">{member.role}</p>
              <div className="flex items-center gap-1 mt-2 text-xs text-muted-foreground">
                <MapPin className="w-3 h-3" />
                {member.university}
              </div>
              <div className="flex items-center gap-3 mt-3">
                {member.badges > 0 && (
                  <span className="flex items-center gap-1 text-xs text-warning">
                    <Award className="w-3.5 h-3.5" />
                    {member.badges}
                  </span>
                )}
                <button className="text-primary hover:text-primary/80 transition-colors">
                  <Linkedin className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
