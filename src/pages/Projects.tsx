import { useState } from "react";
import { Search, ChevronUp, ArrowLeft, ExternalLink, Calendar, User, Heart, Eye } from "lucide-react";
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
  views: number;
  date: string;
  image: string;
  longDescription: string;
  tags: string[];
  liveUrl?: string;
}

const projects: Project[] = [
  {
    id: 1, title: "Traverse", description: "Plan group trips with AI, no more endless group chats ✈️",
    author: "Abdrahman S.", authorTitle: "Founder @ Traverse | Graduate UC Berkeley",
    category: "Travel & Transport", cohort: "Cohort 1", upvotes: 24, views: 156, date: "Sep 27, 2025",
    image: "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=800&h=400&fit=crop",
    longDescription: "Planning a trip with friends is fun until you actually have to PLAN it 😤 Everyone wants something different, nobody can agree, and the group chat is a mess.\n\nTraverse fixes all of that. It's an AI-powered group trip planner that takes everyone's preferences, builds consensus, and creates unforgettable experiences together.",
    tags: ["AI", "Travel", "Social"],
  },
  {
    id: 2, title: "StudyMate AI", description: "AI-powered study companion that generates flashcards and quizzes from your notes.",
    author: "Ian M.", authorTitle: "AI Scouts Member",
    category: "Education", cohort: "Cohort 2", upvotes: 18, views: 203, date: "Oct 5, 2025",
    image: "https://images.unsplash.com/photo-1488190211105-8b0e65b80b4e?w=800&h=400&fit=crop",
    longDescription: "StudyMate AI transforms your messy lecture notes into organized flashcards and adaptive quizzes. It uses NLP to identify key concepts, generate questions at different difficulty levels, and track your learning progress over time.\n\nPerfect for exam prep — just upload your notes and let the AI do the heavy lifting.",
    tags: ["AI", "Education", "Python"],
  },
  {
    id: 3, title: "EcoTracker", description: "Track your carbon footprint and get personalized suggestions to reduce...",
    author: "Felicity J.", authorTitle: "Environmental Tech Developer",
    category: "Environment", cohort: "Cohort 1", upvotes: 31, views: 289, date: "Oct 12, 2025",
    image: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=800&h=400&fit=crop",
    longDescription: "EcoTracker helps individuals and organizations monitor their environmental impact through data-driven insights. Track daily habits, transportation choices, and consumption patterns to get a clear picture of your carbon footprint.\n\nThe AI engine provides actionable, personalized recommendations to help you reduce your impact without sacrificing quality of life.",
    tags: ["Sustainability", "Mobile", "Data"],
  },
  {
    id: 4, title: "CodeReview AI", description: "Automated code review tool that provides intelligent suggestions and catches potential...",
    author: "Carlos E.", authorTitle: "Developer Tools Engineer",
    category: "Productivity & Tools", cohort: "Cohort 2", upvotes: 42, views: 367, date: "Nov 3, 2025",
    image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=800&h=400&fit=crop",
    longDescription: "CodeReview AI integrates directly into your Git workflow to provide instant, intelligent code reviews. It catches bugs, suggests optimizations, and enforces best practices — all before a human reviewer even looks at your PR.\n\nSupports Python, JavaScript, TypeScript, Go, and Rust with framework-specific rules.",
    tags: ["AI", "Developer Tool", "Git"],
  },
  {
    id: 5, title: "MealPlanner Pro", description: "AI meal planning app that considers dietary restrictions, budget, and local ingredient...",
    author: "Nathania P.", authorTitle: "Health Tech Developer",
    category: "Food & Nutrition", cohort: "Cohort 1", upvotes: 27, views: 198, date: "Nov 15, 2025",
    image: "https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=800&h=400&fit=crop",
    longDescription: "MealPlanner Pro creates personalized weekly meal plans based on dietary restrictions, budget, available ingredients, and nutritional goals. It learns your preferences over time to suggest meals you'll actually want to eat.\n\nIncludes grocery list generation and integrates with local store APIs for price comparison.",
    tags: ["AI", "Health", "Mobile"],
  },
  {
    id: 6, title: "Language Exchange Hub", description: "A platform connecting language learners for real-time practice sessions with AI moderation.",
    author: "Nermine M.", authorTitle: "EdTech Enthusiast",
    category: "Social & Community", cohort: "Cohort 3", upvotes: 15, views: 124, date: "Dec 1, 2025",
    image: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=800&h=400&fit=crop",
    longDescription: "Language Exchange Hub pairs language learners for real-time video practice sessions. The AI moderator provides conversation prompts, corrects pronunciation, and tracks vocabulary growth.\n\nSupports 30+ languages with smart matching based on proficiency level, interests, and schedule availability.",
    tags: ["AI", "Social", "WebRTC"],
  },
  {
    id: 7, title: "AI Resume Builder", description: "An intelligent resume builder that uses AI to tailor your resume for specific job descriptions.",
    author: "Victoria L.", authorTitle: "Career Tech Developer",
    category: "Productivity & Tools", cohort: "Cohort 3", upvotes: 33, views: 245, date: "Dec 10, 2025",
    image: "https://images.unsplash.com/photo-1586281380349-632531db7ed4?w=800&h=400&fit=crop",
    longDescription: "AI Resume Builder analyzes job descriptions and intelligently restructures your resume to highlight the most relevant experience and skills. It optimizes for ATS systems while maintaining a clean, professional design.\n\nIncludes cover letter generation and interview prep based on the target role.",
    tags: ["AI", "Web App", "React"],
  },
  {
    id: 8, title: "BudgetBuddy", description: "Smart money management for students with AI-powered spending insights 💸",
    author: "Marcus L.", authorTitle: "Fintech Student",
    category: "Finance & Money", cohort: "Cohort 2", upvotes: 21, views: 178, date: "Jan 8, 2026",
    image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800&h=400&fit=crop",
    longDescription: "BudgetBuddy is a student-focused finance app that uses AI to track spending, suggest savings strategies, and help students manage loans and part-time income effectively.\n\nFeatures include receipt scanning, recurring expense detection, and smart alerts before you overspend.",
    tags: ["AI", "Finance", "Mobile"],
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
        p.description.toLowerCase().includes(search.toLowerCase()) ||
        p.tags.some(t => t.toLowerCase().includes(search.toLowerCase()));
      const matchCategory = category === "All Categories" || p.category === category;
      const matchCohort = cohort === "All Cohorts" || p.cohort === cohort;
      return matchSearch && matchCategory && matchCohort;
    })
    .sort((a, b) => {
      if (sort === "most-upvoted") return b.upvotes - a.upvotes;
      if (sort === "most-viewed") return b.views - a.views;
      return new Date(b.date).getTime() - new Date(a.date).getTime();
    });

  if (selectedProject) {
    return <ProjectDetail project={selectedProject} onBack={() => setSelectedProject(null)} />;
  }

  return (
    <div className="space-y-6 pb-20 lg:pb-0">
      <div>
        <h1 className="text-3xl font-display font-bold text-foreground">Projects</h1>
        <p className="text-muted-foreground mt-1">Showcase what you've built.</p>
      </div>

      {/* Search */}
      <div className="relative max-w-md">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <input
          type="text"
          placeholder="Search projects or tags..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full pl-10 pr-4 py-2.5 bg-card border border-border rounded-lg text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
        />
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-3">
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
            <SelectItem value="most-viewed">Most Viewed</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Project grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {filtered.map((project) => (
          <button
            key={project.id}
            onClick={() => setSelectedProject(project)}
            className="group text-left bg-card border border-border rounded-xl overflow-hidden hover:border-primary/40 hover:shadow-glow transition-all duration-300"
          >
            <div className="relative overflow-hidden">
              <img
                src={project.image}
                alt={project.title}
                className="w-full h-44 object-cover transition-transform duration-500 group-hover:scale-110"
              />
            </div>
            <div className="p-4 space-y-3">
              <div>
                <h3 className="font-display font-bold text-foreground group-hover:text-primary transition-colors">{project.title}</h3>
                <p className="text-sm text-muted-foreground mt-1 line-clamp-2">{project.description}</p>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {project.tags.map((tag) => (
                  <span key={tag} className="text-[11px] font-medium bg-secondary text-muted-foreground px-2 py-0.5 rounded-full">{tag}</span>
                ))}
              </div>
              <div className="flex items-center justify-between pt-2 border-t border-border">
                <span className="text-xs text-muted-foreground">by {project.author}</span>
                <div className="flex items-center gap-3 text-xs text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <Heart className="w-3.5 h-3.5" />
                    {project.upvotes}
                  </span>
                  <span className="flex items-center gap-1">
                    <Eye className="w-3.5 h-3.5" />
                    {project.views}
                  </span>
                </div>
              </div>
            </div>
          </button>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-12 text-muted-foreground">
          <p className="text-lg font-medium">No projects found</p>
          <p className="text-sm mt-1">Try adjusting your filters</p>
        </div>
      )}
    </div>
  );
}

function ProjectDetail({ project, onBack }: { project: Project; onBack: () => void }) {
  const [upvoted, setUpvoted] = useState(false);

  return (
    <div className="space-y-6 pb-20 lg:pb-0 max-w-3xl">
      <button onClick={onBack} className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors">
        <ArrowLeft className="w-4 h-4" /> Back to Projects
      </button>

      <div className="flex items-start justify-between gap-4">
        <div className="space-y-1">
          <h1 className="text-3xl font-display font-bold text-foreground">{project.title}</h1>
          <p className="text-muted-foreground text-lg">{project.description}</p>
        </div>
        <button
          onClick={() => setUpvoted(!upvoted)}
          className={`flex flex-col items-center gap-1 px-4 py-3 rounded-xl border transition-all flex-shrink-0 ${
            upvoted
              ? "border-primary bg-primary/10 text-primary"
              : "border-border bg-card text-muted-foreground hover:border-primary/40"
          }`}
        >
          <ChevronUp className="w-5 h-5" />
          <span className="text-sm font-bold">{project.upvotes + (upvoted ? 1 : 0)}</span>
        </button>
      </div>

      <div className="flex items-center justify-between p-4 bg-card border border-border rounded-xl">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-primary-foreground font-bold text-sm">
            {project.author.charAt(0)}
          </div>
          <div>
            <p className="text-sm font-semibold text-foreground">{project.author}</p>
            <p className="text-xs text-muted-foreground">{project.authorTitle}</p>
          </div>
        </div>
        <div className="flex items-center gap-4 text-sm text-muted-foreground">
          <span className="flex items-center gap-1.5"><Eye className="w-4 h-4" />{project.views}</span>
          <span className="flex items-center gap-1.5"><Calendar className="w-4 h-4" />{project.date}</span>
        </div>
      </div>

      <div className="rounded-xl overflow-hidden border border-border">
        <img src={project.image} alt={project.title} className="w-full h-64 sm:h-80 object-cover" />
      </div>

      <div className="flex flex-wrap gap-2">
        {project.tags.map((tag) => (
          <span key={tag} className="text-xs font-semibold bg-primary/10 text-primary px-3 py-1 rounded-full">{tag}</span>
        ))}
        <span className="text-xs font-semibold bg-secondary text-muted-foreground px-3 py-1 rounded-full">{project.cohort}</span>
      </div>

      <div className="prose prose-sm max-w-none">
        {project.longDescription.split("\n\n").map((para, i) => (
          <p key={i} className="text-muted-foreground leading-relaxed mb-4">{para}</p>
        ))}
      </div>

      {project.liveUrl && (
        <a
          href={project.liveUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-primary text-primary-foreground font-semibold text-sm hover:opacity-90 transition-opacity"
        >
          <ExternalLink className="w-4 h-4" /> Visit Project
        </a>
      )}
    </div>
  );
}
