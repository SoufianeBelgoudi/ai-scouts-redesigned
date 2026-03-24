import { useState } from "react";
import { Plus, ExternalLink, Github, Heart, Eye, Search } from "lucide-react";

interface Project {
  id: number;
  title: string;
  description: string;
  author: string;
  tags: string[];
  likes: number;
  views: number;
  image: string;
  githubUrl?: string;
  liveUrl?: string;
}

const projects: Project[] = [
  { id: 1, title: "AI Resume Builder", description: "An intelligent resume builder that uses AI to tailor your resume for specific job descriptions.", author: "Victoria L.", tags: ["AI", "Web App", "React"], likes: 24, views: 156, image: "https://images.unsplash.com/photo-1586281380349-632531db7ed4?w=400&h=200&fit=crop" },
  { id: 2, title: "StudyMate AI", description: "AI-powered study companion that generates flashcards and quizzes from your notes.", author: "Ian M.", tags: ["AI", "Education", "Python"], likes: 18, views: 203, image: "https://images.unsplash.com/photo-1501504905252-473c47e087f8?w=400&h=200&fit=crop" },
  { id: 3, title: "EcoTracker", description: "Track your carbon footprint and get personalized suggestions to reduce environmental impact.", author: "Felicity J.", tags: ["Sustainability", "Mobile", "Data"], likes: 31, views: 289, image: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=400&h=200&fit=crop" },
  { id: 4, title: "Language Exchange Hub", description: "A platform connecting language learners for real-time practice sessions with AI moderation.", author: "Nermine M.", tags: ["AI", "Social", "WebRTC"], likes: 15, views: 124, image: "https://images.unsplash.com/photo-1546410531-bb4caa6b424d?w=400&h=200&fit=crop" },
  { id: 5, title: "CodeReview AI", description: "Automated code review tool that provides intelligent suggestions and catches potential bugs.", author: "Carlos E.", tags: ["AI", "Developer Tool"], likes: 42, views: 367, image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=400&h=200&fit=crop" },
  { id: 6, title: "MealPlanner Pro", description: "AI meal planning app that considers dietary restrictions, budget, and local ingredient availability.", author: "Nathania P.", tags: ["AI", "Health", "Mobile"], likes: 27, views: 198, image: "https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=400&h=200&fit=crop" },
];

export default function Projects() {
  const [search, setSearch] = useState("");
  const filtered = projects.filter((p) =>
    p.title.toLowerCase().includes(search.toLowerCase()) ||
    p.tags.some((t) => t.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <div className="space-y-6 pb-20 lg:pb-0">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-display font-bold text-foreground">Projects</h1>
          <p className="text-muted-foreground mt-1">Showcase what you've built.</p>
        </div>
        <button className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-gradient-primary text-primary-foreground text-sm font-semibold hover:opacity-90 transition-opacity shadow-glow">
          <Plus className="w-4 h-4" /> Submit Project
        </button>
      </div>

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

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map((project) => (
          <div key={project.id} className="relative overflow-hidden bg-card rounded-lg shadow-card hover:-translate-y-1 hover:shadow-glow transition-all cursor-pointer group">
            <div className="h-36 overflow-hidden">
              <img src={project.image} alt={project.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
            </div>
            <div className="p-4">
              <h3 className="font-display font-bold text-foreground mb-1">{project.title}</h3>
              <p className="text-xs text-muted-foreground line-clamp-2 mb-3">{project.description}</p>
              <div className="flex flex-wrap gap-1.5 mb-3">
                {project.tags.map((tag) => (
                  <span key={tag} className="text-[10px] font-medium bg-secondary text-muted-foreground px-2 py-0.5 rounded-full">{tag}</span>
                ))}
              </div>
              <div className="flex items-center justify-between pt-3 border-t border-border">
                <span className="text-xs text-muted-foreground">by {project.author}</span>
                <div className="flex items-center gap-3 text-xs text-muted-foreground">
                  <span className="flex items-center gap-1"><Heart className="w-3 h-3" /> {project.likes}</span>
                  <span className="flex items-center gap-1"><Eye className="w-3 h-3" /> {project.views}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
