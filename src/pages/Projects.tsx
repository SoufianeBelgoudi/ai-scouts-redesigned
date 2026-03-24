import { useState } from "react";
import { Search, ChevronUp, ArrowLeft, ExternalLink, Calendar, User } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const categories = [
  "All Categories", "Education", "Health & Wellness", "Sports & Fitness",
  "Finance & Money", "Entertainment", "Social & Community", "Environment",
  "Food & Nutrition", "Travel & Transport", "Productivity & Tools",
];

const cohorts = ["All Cohorts", "Cohort 1", "Cohort 2", "Cohort 3"];

interface Project {
  id: number;
  title: string;
  description: string;
  author: string;
  authorTitle: string;
  category: string;
  cohort: string;
  upvotes: number;
  date: string;
  emoji: string;
  image: string;
  longDescription: string;
  tags: string[];
  liveUrl?: string;
}

const projects: Project[] = [
  {
    id: 1, title: "Traverse", description: "Plan group trips with AI, no more endless group chats ✈️",
    author: "Abdrahman Sheriff", authorTitle: "Founder @ Traverse | Graduate UC Berkeley",
    category: "Travel & Transport", cohort: "Cohort 1", upvotes: 2, date: "Sep 27, 2025", emoji: "🌍",
    image: "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=800&h=400&fit=crop",
    longDescription: "Planning a trip with friends is fun until you actually have to PLAN it 😤 Everyone wants something different, nobody can agree, and the group chat is a mess.\n\nTraverse fixes all of that. It's an AI-powered group trip planner that takes everyone's preferences, builds consensus, and creates unforgettable experiences together.",
    tags: ["AI", "Travel", "Social"],
  },
  {
    id: 2, title: "Promptly", description: "Your AI writing coach that actually gets you 🔥",
    author: "Anonymous", authorTitle: "AI Scouts Member",
    category: "Education", cohort: "Cohort 2", upvotes: 3, date: "Oct 5, 2025", emoji: "✍️",
    image: "https://images.unsplash.com/photo-1455390582262-044cdead277a?w=800&h=400&fit=crop",
    longDescription: "Promptly is an AI-powered writing assistant designed to help students and professionals improve their writing skills through real-time feedback, style suggestions, and grammar coaching.\n\nUnlike generic grammar checkers, Promptly understands context, tone, and audience to provide tailored suggestions.",
    tags: ["AI", "Education", "Writing"],
  },
  {
    id: 3, title: "GolfAnalyzerPro", description: "AI-powered golf practice that actually improves your game 🏌️",
    author: "Nora Unnikrishnan", authorTitle: "Sports Tech Enthusiast",
    category: "Sports & Fitness", cohort: "Cohort 1", upvotes: 1, date: "Oct 12, 2025", emoji: "⛳",
    image: "https://images.unsplash.com/photo-1535131749006-b7f58c99034b?w=800&h=400&fit=crop",
    longDescription: "GolfAnalyzerPro uses computer vision and machine learning to analyze your golf swing in real-time. Simply record your swing with your phone and get instant, detailed feedback on form, technique, and areas for improvement.",
    tags: ["AI", "Sports", "Computer Vision"],
  },
  {
    id: 4, title: "GoJo", description: "Find your dream college major with AI 🎓",
    author: "Anonymous", authorTitle: "AI Scouts Member",
    category: "Education", cohort: "Cohort 2", upvotes: 1, date: "Nov 3, 2025", emoji: "🎯",
    image: "https://images.unsplash.com/photo-1523050854058-8df90110c476?w=800&h=400&fit=crop",
    longDescription: "GoJo helps high school students discover the perfect college major by analyzing their interests, strengths, and career goals using AI-driven assessments and matching algorithms.",
    tags: ["AI", "Education", "Career"],
  },
  {
    id: 5, title: "Verity", description: "Fight unfair medical bills with AI 💰",
    author: "Jatin Nair", authorTitle: "Healthcare Advocate",
    category: "Health & Wellness", cohort: "Cohort 1", upvotes: 1, date: "Nov 15, 2025", emoji: "🏥",
    image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&h=400&fit=crop",
    longDescription: "Verity uses AI to analyze medical bills, identify billing errors and overcharges, and help patients negotiate fair prices. No more getting ripped off by confusing healthcare billing.",
    tags: ["AI", "Health", "Finance"],
  },
  {
    id: 6, title: "QuickER", description: "Get to the right hospital, faster 🏥",
    author: "Anonymous", authorTitle: "AI Scouts Member",
    category: "Health & Wellness", cohort: "Cohort 3", upvotes: 1, date: "Dec 1, 2025", emoji: "🚑",
    image: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=800&h=400&fit=crop",
    longDescription: "QuickER helps patients find the nearest hospital with the shortest wait times during emergencies. It aggregates real-time ER data so you can make informed decisions when every minute counts.",
    tags: ["AI", "Health", "Real-time"],
  },
  {
    id: 7, title: "MealMind", description: "AI meal planning that fits your lifestyle 🥗",
    author: "Sophia Chen", authorTitle: "Nutrition Tech Developer",
    category: "Food & Nutrition", cohort: "Cohort 3", upvotes: 4, date: "Dec 10, 2025", emoji: "🍽️",
    image: "https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=800&h=400&fit=crop",
    longDescription: "MealMind creates personalized weekly meal plans based on dietary restrictions, budget, available ingredients, and nutritional goals. It learns your preferences over time to suggest meals you'll actually want to eat.",
    tags: ["AI", "Food", "Health"],
  },
  {
    id: 8, title: "BudgetBuddy", description: "Smart money management for students 💸",
    author: "Marcus Lee", authorTitle: "Fintech Student",
    category: "Finance & Money", cohort: "Cohort 2", upvotes: 5, date: "Jan 8, 2026", emoji: "💰",
    image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800&h=400&fit=crop",
    longDescription: "BudgetBuddy is a student-focused finance app that uses AI to track spending, suggest savings strategies, and help students manage loans and part-time income effectively.",
    tags: ["AI", "Finance", "Students"],
  },
];

export default function Projects() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All Categories");
  const [cohort, setCohort] = useState("All Cohorts");
  const [sort, setSort] = useState("newest");
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const filtered = projects
    .filter((p) => {
      const matchSearch = p.title.toLowerCase().includes(search.toLowerCase()) ||
        p.description.toLowerCase().includes(search.toLowerCase());
      const matchCategory = category === "All Categories" || p.category === category;
      const matchCohort = cohort === "All Cohorts" || p.cohort === cohort;
      return matchSearch && matchCategory && matchCohort;
    })
    .sort((a, b) => {
      if (sort === "most-upvoted") return b.upvotes - a.upvotes;
      return new Date(b.date).getTime() - new Date(a.date).getTime();
    });

  if (selectedProject) {
    return <ProjectDetail project={selectedProject} onBack={() => setSelectedProject(null)} />;
  }

  return (
    <div className="space-y-6 pb-20 lg:pb-0">
      <div>
        <h1 className="text-3xl font-display font-bold text-foreground">Projects</h1>
        <p className="text-muted-foreground mt-1">Discover what AI Squads members are building</p>
      </div>

      {/* Filters row */}
      <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center">
        <div className="relative flex-1 max-w-xs">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search projects..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-card border border-border rounded-lg text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
          />
        </div>

        <Select value={category} onValueChange={setCategory}>
          <SelectTrigger className="w-[160px] bg-card border-border">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {categories.map((c) => (
              <SelectItem key={c} value={c}>{c}</SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select value={cohort} onValueChange={setCohort}>
          <SelectTrigger className="w-[140px] bg-card border-border">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {cohorts.map((c) => (
              <SelectItem key={c} value={c}>{c}</SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select value={sort} onValueChange={setSort}>
          <SelectTrigger className="w-[150px] bg-card border-border">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="newest">Newest</SelectItem>
            <SelectItem value="most-upvoted">Most Upvoted</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Project list */}
      <div className="space-y-3">
        {filtered.map((project) => (
          <button
            key={project.id}
            onClick={() => setSelectedProject(project)}
            className="w-full flex items-center gap-4 p-4 bg-card border border-border rounded-xl hover:border-primary/40 hover:shadow-glow transition-all text-left group"
          >
            <div className="w-14 h-14 rounded-xl bg-secondary flex items-center justify-center text-2xl flex-shrink-0">
              {project.emoji}
            </div>

            <div className="flex-1 min-w-0">
              <h3 className="font-display font-bold text-foreground group-hover:text-primary transition-colors">{project.title}</h3>
              <p className="text-sm text-muted-foreground truncate">{project.description}</p>
              <div className="flex items-center gap-3 mt-1.5">
                <span className="text-[11px] font-medium bg-secondary text-muted-foreground px-2 py-0.5 rounded-full">{project.category}</span>
                <span className="flex items-center gap-1.5 text-xs text-muted-foreground">
                  <div className="w-5 h-5 rounded-full bg-muted flex items-center justify-center">
                    <User className="w-3 h-3" />
                  </div>
                  {project.author}
                </span>
              </div>
            </div>

            <div className="flex flex-col items-center gap-1 text-muted-foreground flex-shrink-0">
              <ChevronUp className="w-5 h-5 group-hover:text-primary transition-colors" />
              <span className="text-sm font-semibold">{project.upvotes}</span>
            </div>
          </button>
        ))}

        {filtered.length === 0 && (
          <div className="text-center py-12 text-muted-foreground">
            <p className="text-lg font-medium">No projects found</p>
            <p className="text-sm mt-1">Try adjusting your filters</p>
          </div>
        )}
      </div>
    </div>
  );
}

function ProjectDetail({ project, onBack }: { project: Project; onBack: () => void }) {
  const [upvoted, setUpvoted] = useState(false);

  return (
    <div className="space-y-6 pb-20 lg:pb-0 max-w-3xl">
      <button onClick={onBack} className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors">
        <ArrowLeft className="w-4 h-4" /> Back
      </button>

      {/* Header */}
      <div className="flex items-start justify-between gap-4">
        <div className="space-y-1">
          <h1 className="text-3xl font-display font-bold text-foreground">{project.title}</h1>
          <p className="text-muted-foreground text-lg">{project.description}</p>
        </div>
        <button
          onClick={() => setUpvoted(!upvoted)}
          className={`flex flex-col items-center gap-1 px-4 py-3 rounded-xl border transition-all ${
            upvoted
              ? "border-primary bg-primary/10 text-primary"
              : "border-border bg-card text-muted-foreground hover:border-primary/40"
          }`}
        >
          <ChevronUp className="w-5 h-5" />
          <span className="text-sm font-bold">{project.upvotes + (upvoted ? 1 : 0)}</span>
        </button>
      </div>

      {/* Author & date */}
      <div className="flex items-center justify-between p-4 bg-card border border-border rounded-xl">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-gradient-primary flex items-center justify-center text-primary-foreground font-bold text-sm">
            {project.author.charAt(0)}
          </div>
          <div>
            <p className="text-sm font-semibold text-foreground">{project.author} ↗</p>
            <p className="text-xs text-muted-foreground">{project.authorTitle}</p>
          </div>
        </div>
        <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
          <Calendar className="w-4 h-4" />
          {project.date}
        </div>
      </div>

      {/* Hero image */}
      <div className="rounded-xl overflow-hidden border border-border">
        <img src={project.image} alt={project.title} className="w-full h-64 sm:h-80 object-cover" />
      </div>

      {/* Tags */}
      <div className="flex flex-wrap gap-2">
        {project.tags.map((tag) => (
          <span key={tag} className="text-xs font-semibold bg-primary/10 text-primary px-3 py-1 rounded-full">{tag}</span>
        ))}
        <span className="text-xs font-semibold bg-secondary text-muted-foreground px-3 py-1 rounded-full">{project.cohort}</span>
      </div>

      {/* Description */}
      <div className="prose prose-sm max-w-none">
        {project.longDescription.split("\n\n").map((para, i) => (
          <p key={i} className="text-muted-foreground leading-relaxed mb-4">{para}</p>
        ))}
      </div>

      {/* Action */}
      {project.liveUrl && (
        <a
          href={project.liveUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-gradient-primary text-primary-foreground font-semibold text-sm hover:opacity-90 transition-opacity shadow-glow"
        >
          <ExternalLink className="w-4 h-4" /> Visit Project
        </a>
      )}
    </div>
  );
}
