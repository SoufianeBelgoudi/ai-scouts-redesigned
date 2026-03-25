import { useState, useEffect, useCallback } from "react";
import { Award, Zap, CheckCircle2, Hand, Shield, Trophy, Flame, Star } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

// Types
interface MemberWeekData {
  shipped: string;
  blocker: string;
  needHelp: string;
}

interface BlockerEntry {
  id: string;
  memberId: string;
  memberName: string;
  text: string;
  claimedBy: string | null;
  resolved: boolean;
}

interface WeekData {
  members: Record<string, MemberWeekData>;
  blockers: BlockerEntry[];
}

type AllWeeksData = Record<number, WeekData>;

// Constants
const CURRENT_USER = "Soufiane";

const SQUAD_MEMBERS = [
  { id: "soufiane", name: "Soufiane", initials: "SO", avatar: "", country: "🇲🇦" },
  { id: "victoria", name: "Victoria Langlois", initials: "VL", avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop&crop=face", country: "🇨🇦" },
  { id: "ian", name: "Ian Maynard", initials: "IM", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&crop=face", country: "🇺🇸" },
  { id: "felicity", name: "Felicity Joseph", initials: "FJ", avatar: "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=200&h=200&fit=crop&crop=face", country: "🇳🇬" },
  { id: "nermine", name: "Nermine Mokdad", initials: "NM", avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=200&h=200&fit=crop&crop=face", country: "🇨🇦" },
];

const CURRENT_WEEK = 3;
const WEEKS = [1, 2, 3, 4, 5];

const XP_SUBMIT = 10;
const XP_TEAM_BONUS = 15;
const XP_RESOLVED_BLOCKER = 10;
const XP_HELPED_RESOLVE = 5;

const RANK_THRESHOLDS = [
  { min: 200, label: "Elite", icon: Trophy, color: "text-warning" },
  { min: 120, label: "Momentum", icon: Flame, color: "text-primary" },
  { min: 50, label: "Builder", icon: Star, color: "text-success" },
  { min: 0, label: "Rookie", icon: Shield, color: "text-muted-foreground" },
];

function getDefaultWeekData(): WeekData {
  const members: Record<string, MemberWeekData> = {};
  SQUAD_MEMBERS.forEach((m) => {
    members[m.id] = { shipped: "", blocker: "", needHelp: "" };
  });
  return { members, blockers: [] };
}

function getSeedData(): AllWeeksData {
  const data: AllWeeksData = {};
  // Week 1 — full participation
  data[1] = {
    members: {
      soufiane: { shipped: "Set up project repo and landing page wireframe", blocker: "", needHelp: "" },
      victoria: { shipped: "Completed user research interviews with 5 parents", blocker: "", needHelp: "" },
      ian: { shipped: "Built initial API integration with OpenAI", blocker: "Rate limiting on free tier", needHelp: "" },
      felicity: { shipped: "Designed onboarding flow in Figma", blocker: "", needHelp: "Need feedback on color palette" },
      nermine: { shipped: "Market analysis for competitor apps", blocker: "", needHelp: "" },
    },
    blockers: [
      { id: "b1", memberId: "ian", memberName: "Ian Maynard", text: "Rate limiting on free tier", claimedBy: "soufiane", resolved: true },
    ],
  };
  // Week 2 — 4/5 submitted
  data[2] = {
    members: {
      soufiane: { shipped: "Implemented auth flow and database schema", blocker: "Supabase RLS policies are confusing", needHelp: "Anyone familiar with RLS?" },
      victoria: { shipped: "Created therapy session tracking prototype", blocker: "", needHelp: "" },
      ian: { shipped: "Fine-tuned prompt engineering for chatbot", blocker: "", needHelp: "" },
      felicity: { shipped: "Built responsive dashboard components", blocker: "Tailwind dark mode not working correctly", needHelp: "CSS help needed" },
      nermine: { shipped: "", blocker: "", needHelp: "" },
    },
    blockers: [
      { id: "b2", memberId: "soufiane", memberName: "Soufiane", text: "Supabase RLS policies are confusing", claimedBy: "ian", resolved: true },
      { id: "b3", memberId: "felicity", memberName: "Felicity Joseph", text: "Tailwind dark mode not working correctly", claimedBy: null, resolved: false },
    ],
  };
  data[3] = getDefaultWeekData();
  data[4] = getDefaultWeekData();
  data[5] = getDefaultWeekData();
  return data;
}

function loadData(): AllWeeksData {
  try {
    const raw = localStorage.getItem("squad-sync-data");
    if (raw) return JSON.parse(raw);
  } catch {}
  return getSeedData();
}

function saveData(data: AllWeeksData) {
  localStorage.setItem("squad-sync-data", JSON.stringify(data));
}

// XP calculation
function calculateXP(data: AllWeeksData) {
  let totalXP = 0;
  const memberXP: Record<string, number> = {};
  SQUAD_MEMBERS.forEach((m) => (memberXP[m.id] = 0));

  for (const week of WEEKS) {
    const wd = data[week];
    if (!wd) continue;
    let submittedCount = 0;
    SQUAD_MEMBERS.forEach((m) => {
      const d = wd.members[m.id];
      if (d && d.shipped.trim()) {
        memberXP[m.id] += XP_SUBMIT;
        totalXP += XP_SUBMIT;
        submittedCount++;
      }
    });
    if (submittedCount === SQUAD_MEMBERS.length) {
      totalXP += XP_TEAM_BONUS;
      SQUAD_MEMBERS.forEach((m) => (memberXP[m.id] += Math.floor(XP_TEAM_BONUS / SQUAD_MEMBERS.length)));
    }
    wd.blockers.forEach((b) => {
      if (b.resolved) {
        totalXP += XP_RESOLVED_BLOCKER;
        memberXP[b.memberId] += Math.floor(XP_RESOLVED_BLOCKER / 2);
        if (b.claimedBy && b.claimedBy !== b.memberId) {
          memberXP[b.claimedBy] += XP_HELPED_RESOLVE;
          totalXP += XP_HELPED_RESOLVE;
        }
      }
    });
  }
  return { totalXP, memberXP };
}

function getStreak(data: AllWeeksData): boolean[] {
  return WEEKS.map((w) => {
    const wd = data[w];
    if (!wd) return false;
    return SQUAD_MEMBERS.every((m) => wd.members[m.id]?.shipped?.trim());
  });
}

function getRank(xp: number) {
  return RANK_THRESHOLDS.find((r) => xp >= r.min) || RANK_THRESHOLDS[RANK_THRESHOLDS.length - 1];
}

// Inline editable field
function InlineField({
  label,
  emoji,
  value,
  onChange,
  readOnly,
  placeholder,
}: {
  label: string;
  emoji: string;
  value: string;
  onChange: (v: string) => void;
  readOnly: boolean;
  placeholder: string;
}) {
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState(value);

  useEffect(() => setDraft(value), [value]);

  const save = () => {
    onChange(draft);
    setEditing(false);
  };

  return (
    <div className="mt-2">
      <div className="text-[11px] font-medium text-muted-foreground uppercase tracking-wider mb-1 flex items-center gap-1">
        <span>{emoji}</span> {label}
      </div>
      {editing ? (
        <input
          autoFocus
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          onBlur={save}
          onKeyDown={(e) => e.key === "Enter" && save()}
          className="w-full bg-secondary/60 border border-border rounded px-2 py-1.5 text-sm text-foreground focus:outline-none focus:ring-1 focus:ring-primary/50"
          placeholder={placeholder}
        />
      ) : (
        <div
          onClick={() => !readOnly && setEditing(true)}
          className={`text-sm px-2 py-1.5 rounded min-h-[32px] ${
            readOnly
              ? "text-foreground/80"
              : "cursor-pointer hover:bg-secondary/40 transition-colors"
          } ${!value ? "text-muted-foreground italic" : "text-foreground"}`}
        >
          {value || (readOnly ? "—" : placeholder)}
        </div>
      )}
    </div>
  );
}

export default function Squad() {
  const [data, setData] = useState<AllWeeksData>(loadData);
  const [selectedWeek, setSelectedWeek] = useState(CURRENT_WEEK);

  const isCurrentWeek = selectedWeek === CURRENT_WEEK;
  const weekData = data[selectedWeek] || getDefaultWeekData();
  const { totalXP, memberXP } = calculateXP(data);
  const streak = getStreak(data);
  const rank = getRank(totalXP);
  const RankIcon = rank.icon;

  // Active blockers for the blocker board (current week only, unresolved)
  const activeBlockers = weekData.blockers.filter((b) => !b.resolved);
  const resolvedCount = Object.values(data).reduce(
    (sum, wd) => sum + wd.blockers.filter((b) => b.resolved).length,
    0
  );

  const persist = useCallback(
    (next: AllWeeksData) => {
      setData(next);
      saveData(next);
    },
    []
  );

  const updateField = (memberId: string, field: keyof MemberWeekData, value: string) => {
    const next = { ...data };
    const wd = { ...next[selectedWeek] } || getDefaultWeekData();
    wd.members = { ...wd.members, [memberId]: { ...wd.members[memberId], [field]: value } };

    // Auto-sync blockers
    if (field === "blocker") {
      const existing = wd.blockers.find((b) => b.memberId === memberId && !b.resolved);
      if (value.trim() && !existing) {
        const member = SQUAD_MEMBERS.find((m) => m.id === memberId)!;
        wd.blockers = [
          ...wd.blockers,
          { id: `b-${Date.now()}`, memberId, memberName: member.name, text: value, claimedBy: null, resolved: false },
        ];
      } else if (existing) {
        wd.blockers = wd.blockers.map((b) =>
          b.id === existing.id ? { ...b, text: value.trim() ? value : b.text } : b
        );
        if (!value.trim()) {
          wd.blockers = wd.blockers.filter((b) => b.id !== existing.id);
        }
      }
    }

    next[selectedWeek] = wd;
    persist(next);
  };

  const claimBlocker = (blockerId: string) => {
    const next = { ...data };
    const wd = { ...next[selectedWeek] };
    wd.blockers = wd.blockers.map((b) =>
      b.id === blockerId ? { ...b, claimedBy: "soufiane" } : b
    );
    next[selectedWeek] = wd;
    persist(next);
  };

  const resolveBlocker = (blockerId: string) => {
    const next = { ...data };
    const wd = { ...next[selectedWeek] };
    wd.blockers = wd.blockers.map((b) =>
      b.id === blockerId ? { ...b, resolved: true } : b
    );
    next[selectedWeek] = wd;
    persist(next);
  };

  const isCardComplete = (memberId: string) => {
    const d = weekData.members[memberId];
    return d && d.shipped.trim().length > 0;
  };

  return (
    <div className="space-y-6 pb-20 lg:pb-0">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-display font-bold text-foreground">Squad Sync Board</h1>
          <p className="text-muted-foreground mt-1">Cohort #3 — Squad 2 · Weekly check-in</p>
        </div>
        <div className="flex items-center gap-2">
          <RankIcon className={`w-5 h-5 ${rank.color}`} />
          <span className={`font-display font-bold text-sm ${rank.color}`}>{rank.label}</span>
          <Badge variant="secondary" className="ml-1">
            <Zap className="w-3 h-3 mr-1 text-warning" />
            {totalXP} XP
          </Badge>
        </div>
      </div>

      {/* Streak & Week Selector */}
      <div className="bg-card border border-border rounded-lg p-4 shadow-card">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          {/* Streak dots */}
          <div className="flex items-center gap-2">
            <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider mr-2">Squad Streak</span>
            {WEEKS.map((w) => (
              <button
                key={w}
                onClick={() => setSelectedWeek(w)}
                className={`relative flex flex-col items-center gap-1 transition-all ${
                  selectedWeek === w ? "scale-110" : ""
                }`}
              >
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold border-2 transition-all ${
                    streak[w - 1]
                      ? "bg-success/20 border-success text-success"
                      : selectedWeek === w
                      ? "border-primary text-primary bg-primary/10"
                      : "border-border text-muted-foreground bg-secondary/30"
                  } ${w === CURRENT_WEEK && !streak[w - 1] ? "animate-pulse-glow" : ""}`}
                >
                  W{w}
                </div>
                {selectedWeek === w && (
                  <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                )}
              </button>
            ))}
          </div>

          {/* Stats */}
          <div className="flex items-center gap-4 text-xs text-muted-foreground">
            <span className="flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5 text-success" />
              {resolvedCount} blockers resolved
            </span>
            <span className="flex items-center gap-1">
              <Award className="w-3.5 h-3.5 text-warning" />
              {SQUAD_MEMBERS.filter((m) => isCardComplete(m.id)).length}/{SQUAD_MEMBERS.length} submitted this week
            </span>
          </div>
        </div>

        {!isCurrentWeek && (
          <div className="mt-3 px-3 py-1.5 bg-secondary/50 rounded text-xs text-muted-foreground text-center">
            📋 Viewing Week {selectedWeek} — read only
          </div>
        )}
      </div>

      {/* Main content: Cards + Blocker Board */}
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Member Cards */}
        <div className="flex-1 space-y-4">
          <h2 className="text-sm font-display font-bold text-muted-foreground uppercase tracking-wider flex items-center gap-2">
            <span>👥</span> Member Cards — Week {selectedWeek}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {SQUAD_MEMBERS.map((member) => {
              const md = weekData.members[member.id] || { shipped: "", blocker: "", needHelp: "" };
              const complete = isCardComplete(member.id);
              const isMe = member.name === CURRENT_USER;
              const readOnly = !isCurrentWeek || !isMe;

              return (
                <div
                  key={member.id}
                  className={`relative overflow-hidden bg-card rounded-lg p-4 shadow-card border transition-all ${
                    complete
                      ? "border-success/30 shadow-[0_0_12px_hsl(var(--success)/0.1)]"
                      : isMe
                      ? "border-primary/30"
                      : "border-border"
                  } ${isMe ? "ring-1 ring-primary/20" : ""}`}
                >
                  {complete && (
                    <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-success/60 to-success/20" />
                  )}

                  <div className="flex items-center gap-3 mb-1">
                    <Avatar className="h-9 w-9">
                      {member.avatar ? (
                        <AvatarImage src={member.avatar} alt={member.name} />
                      ) : null}
                      <AvatarFallback className="bg-primary/20 text-primary text-xs font-bold">
                        {member.initials}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-1.5">
                        <span className="text-xs">{member.country}</span>
                        <span className="font-display font-bold text-sm text-foreground truncate">
                          {member.name}
                        </span>
                        {isMe && (
                          <Badge variant="outline" className="text-[10px] px-1.5 py-0 border-primary/40 text-primary">
                            You
                          </Badge>
                        )}
                      </div>
                    </div>
                    <Badge variant="secondary" className="text-[10px] px-1.5 py-0 shrink-0">
                      <Zap className="w-2.5 h-2.5 mr-0.5 text-warning" />
                      {memberXP[member.id] || 0}
                    </Badge>
                  </div>

                  <InlineField
                    label="What I shipped this week"
                    emoji="✅"
                    value={md.shipped}
                    onChange={(v) => updateField(member.id, "shipped", v)}
                    readOnly={readOnly}
                    placeholder="Share what you accomplished..."
                  />
                  <InlineField
                    label="What's blocking me"
                    emoji="🚧"
                    value={md.blocker}
                    onChange={(v) => updateField(member.id, "blocker", v)}
                    readOnly={readOnly}
                    placeholder="Any blockers? (optional)"
                  />
                  <InlineField
                    label="What I need help with"
                    emoji="🙋"
                    value={md.needHelp}
                    onChange={(v) => updateField(member.id, "needHelp", v)}
                    readOnly={readOnly}
                    placeholder="Need help? (optional)"
                  />

                  {complete && (
                    <div className="mt-3 flex items-center gap-1 text-[10px] text-success font-medium">
                      <CheckCircle2 className="w-3 h-3" />
                      Submitted
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Blocker Board */}
        <div className="lg:w-80 shrink-0">
          <h2 className="text-sm font-display font-bold text-muted-foreground uppercase tracking-wider flex items-center gap-2 mb-4">
            <span>🚧</span> Blocker Board
          </h2>
          <div className="bg-card border border-border rounded-lg p-4 shadow-card space-y-3">
            {activeBlockers.length === 0 ? (
              <div className="text-center py-6">
                <div className="text-2xl mb-2">🎉</div>
                <p className="text-sm text-muted-foreground">No active blockers!</p>
                <p className="text-xs text-muted-foreground/60 mt-1">The squad is cruising</p>
              </div>
            ) : (
              activeBlockers.map((b) => (
                <div
                  key={b.id}
                  className="bg-secondary/40 border border-border rounded-lg p-3 space-y-2"
                >
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-foreground">{b.memberName}</span>
                    {b.claimedBy && (
                      <Badge variant="outline" className="text-[9px] px-1.5 py-0 border-warning/40 text-warning">
                        Claimed
                      </Badge>
                    )}
                  </div>
                  <p className="text-sm text-foreground/80">{b.text}</p>
                  <div className="flex gap-2">
                    {!b.claimedBy && isCurrentWeek && (
                      <button
                        onClick={() => claimBlocker(b.id)}
                        className="text-[11px] font-medium text-primary hover:text-primary/80 transition-colors flex items-center gap-1"
                      >
                        <Hand className="w-3 h-3" /> Claim it 🙋
                      </button>
                    )}
                    {b.claimedBy && isCurrentWeek && (
                      <button
                        onClick={() => resolveBlocker(b.id)}
                        className="text-[11px] font-medium text-success hover:text-success/80 transition-colors flex items-center gap-1"
                      >
                        <CheckCircle2 className="w-3 h-3" /> Mark resolved ✅
                      </button>
                    )}
                  </div>
                </div>
              ))
            )}

            {resolvedCount > 0 && (
              <div className="pt-2 border-t border-border/50">
                <p className="text-[10px] text-muted-foreground text-center">
                  {resolvedCount} blocker{resolvedCount !== 1 ? "s" : ""} resolved all-time · +{resolvedCount * XP_RESOLVED_BLOCKER} XP earned
                </p>
              </div>
            )}
          </div>

          {/* XP Breakdown */}
          <div className="mt-4 bg-card border border-border rounded-lg p-4 shadow-card">
            <h3 className="text-xs font-display font-bold text-muted-foreground uppercase tracking-wider mb-3 flex items-center gap-1.5">
              <Zap className="w-3.5 h-3.5 text-warning" /> XP Rules
            </h3>
            <div className="space-y-2 text-xs text-muted-foreground">
              <div className="flex justify-between">
                <span>Weekly card submitted</span>
                <span className="text-foreground font-medium">+{XP_SUBMIT} XP</span>
              </div>
              <div className="flex justify-between">
                <span>Full squad submission</span>
                <span className="text-foreground font-medium">+{XP_TEAM_BONUS} XP</span>
              </div>
              <div className="flex justify-between">
                <span>Blocker resolved</span>
                <span className="text-foreground font-medium">+{XP_RESOLVED_BLOCKER} XP</span>
              </div>
              <div className="flex justify-between">
                <span>Helped resolve (claimed)</span>
                <span className="text-foreground font-medium">+{XP_HELPED_RESOLVE} XP</span>
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-border/50">
              <div className="text-[10px] text-muted-foreground uppercase tracking-wider mb-2">Rank Progress</div>
              {RANK_THRESHOLDS.slice().reverse().map((r) => {
                const RIcon = r.icon;
                return (
                  <div key={r.label} className={`flex items-center gap-2 py-1 text-xs ${totalXP >= r.min ? r.color : "text-muted-foreground/40"}`}>
                    <RIcon className="w-3.5 h-3.5" />
                    <span className="font-medium">{r.label}</span>
                    <span className="ml-auto text-[10px]">{r.min}+ XP</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
