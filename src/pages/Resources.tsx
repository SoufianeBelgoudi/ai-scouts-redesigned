import { BookOpen, ExternalLink, Video, FileText, Code, Lightbulb } from "lucide-react";

interface Resource {
  title: string;
  description: string;
  icon: typeof BookOpen;
  category: string;
  url?: string;
}

const resources: Resource[] = [
  { title: "Setting Up Google Auth", description: "Connect Google sign-in to your projects using Supabase", icon: Code, category: "Setup Guide" },
  { title: "GitHub Setup", description: "Create your GitHub account and learn the basics of version control", icon: Code, category: "Setup Guide" },
  { title: "Prompt Engineering 101", description: "Master the art of crafting effective prompts for AI models", icon: Lightbulb, category: "AI Tutorial" },
  { title: "Building with Lovable", description: "Learn how to build full-stack apps using Lovable's AI-powered platform", icon: Code, category: "Tutorial" },
  { title: "Demo Day Presentation Tips", description: "How to create a compelling demo that stands out", icon: Video, category: "Guide" },
  { title: "AI Ethics & Responsible Building", description: "Understanding the ethical implications of AI development", icon: FileText, category: "Reading" },
];

export default function Resources() {
  return (
    <div className="space-y-6 pb-20 lg:pb-0">
      <div className="flex items-center gap-2">
        <BookOpen className="w-7 h-7 text-primary" />
        <div>
          <h1 className="text-3xl font-display font-bold text-foreground">Resources</h1>
          <p className="text-muted-foreground mt-0.5">Guides and tutorials to help you on your AI Squads journey.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {resources.map((resource) => (
          <div key={resource.title} className="relative overflow-hidden bg-card rounded-lg p-5 shadow-card hover:-translate-y-1 hover:shadow-glow transition-all cursor-pointer group card-accent-top">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                <resource.icon className="w-5 h-5 text-primary" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="font-display font-bold text-foreground">{resource.title}</h3>
                  <ExternalLink className="w-3.5 h-3.5 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
                <p className="text-sm text-muted-foreground">{resource.description}</p>
                <span className="inline-block mt-2 text-xs font-medium bg-secondary text-muted-foreground px-2 py-0.5 rounded-full">{resource.category}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
