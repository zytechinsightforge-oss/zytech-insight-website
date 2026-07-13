import { useState, useEffect, useRef } from "react";
import {
  Menu, X, ArrowRight, Code2, Smartphone, Cloud, Brain, Shield,
  Database, ChevronDown, Star, Zap, Mail, MapPin,
  Linkedin, Twitter, Github, CheckCircle, Settings, Lock,
  LogOut, Save, Plus, Trash2, Eye, MessageCircle, FileText,
  Image as ImageIcon, Images, Calendar, Tag, Send, EyeOff, ChevronRight,
  Clock, Users,
} from "lucide-react";

// ─── Default site content (editable via admin) ───────────────────────────────

const DEFAULT_CONTENT = {
  logo: "",
  hero: {
    tagline: "ZyTech Insight · ZIF · Est. 2016",
    headline1: "SOFTWARE",
    headline2: "ENGINEERED",
    headline3: "TO SCALE.",
    subtext: "We architect, build, and deploy software that solves real problems. From embedded AI systems to global SaaS platforms — ZIF ships code that lasts.",
  },
  stats: [
    { value: "120+", label: "Projects Delivered" },
    { value: "8", label: "Years of Experience" },
    { value: "40+", label: "Expert Engineers" },
    { value: "98%", label: "Client Satisfaction" },
  ],
  about: {
    body1: "ZyTech Insight was founded by a team of engineers who believed that software development was broken — over-promised, under-delivered, and bloated with technical debt. We built ZIF on a different philosophy: clarity of scope, accountability at every milestone, and code that your team can maintain long after we're done.",
    body2: "Today, we serve clients across FinTech, HealthTech, Logistics, and GovTech — from Series A startups to Fortune 500 enterprises. Our teams embed deeply, think in systems, and ship with precision.",
  },
  contact: {
    email: "zytecinsightforge@gmail.com",
    whatsapp1: "08139083638",
    whatsapp2: "09134651994",
    location: "Lagos, Lekki Phase I",
  },
  services: [
    {
      icon: "Code2",
      title: "Custom Software Development",
      desc: "Full-cycle development of web apps, APIs, and enterprise platforms tailored to your exact business logic.",
      tags: ["React", "Node.js", "Python", ".NET"],
      image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=1200&h=800&fit=crop&auto=format",
      details: "We build scalable, maintainable software solutions from concept to deployment. Our process includes comprehensive requirement gathering, architectural design, agile development, and post-launch support. Whether you need a complex enterprise platform or a simple web app, we deliver high-quality code that aligns with your business goals.",
    },
    {
      icon: "Smartphone",
      title: "Mobile Applications",
      desc: "Native and cross-platform mobile apps for iOS and Android — performance-first, intuitive, scalable.",
      tags: ["React Native", "Flutter", "Swift", "Kotlin"],
      image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=1200&h=800&fit=crop&auto=format",
      details: "Our mobile development team creates seamless, performant apps for both iOS and Android. We can build native apps using Swift/Kotlin or cross-platform apps using React Native/Flutter, ensuring maximum reach without compromising on user experience.",
    },
    {
      icon: "Cloud",
      title: "Cloud & DevOps",
      desc: "Cloud architecture design, CI/CD pipelines, containerization, and infrastructure as code for rapid deployment.",
      tags: ["AWS", "Azure", "Docker", "Kubernetes"],
      image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1200&h=800&fit=crop&auto=format",
      details: "We help you move to the cloud with confidence. Our DevOps experts design scalable cloud architectures, implement CI/CD pipelines, and manage your infrastructure using Terraform, Docker, and Kubernetes for rapid, reliable deployments.",
    },
    {
      icon: "Brain",
      title: "AI & Machine Learning",
      desc: "Intelligent data pipelines, predictive models, NLP systems, and AI integrations that transform raw data into decisions.",
      tags: ["TensorFlow", "PyTorch", "OpenAI", "LangChain"],
      image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=1200&h=800&fit=crop&auto=format",
      details: "From predictive analytics to natural language processing, our AI/ML team builds intelligent systems that drive business value. We work with TensorFlow, PyTorch, and cutting-edge LLMs to solve complex problems.",
    },
    {
      icon: "Shield",
      title: "Cybersecurity",
      desc: "Penetration testing, security audits, compliance frameworks, and hardened architecture for critical systems.",
      tags: ["ISO 27001", "SOC 2", "OWASP", "Zero Trust"],
      image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=1200&h=800&fit=crop&auto=format",
      details: "Security is non-negotiable. We conduct penetration testing, security audits, and compliance reviews to ensure your systems are protected against threats and meet industry standards like ISO 27001 and SOC 2.",
    },
    {
      icon: "Database",
      title: "Data Engineering",
      desc: "Data warehouse design, ETL pipelines, real-time analytics, and BI dashboards that turn numbers into strategy.",
      tags: ["PostgreSQL", "Snowflake", "Spark", "dbt"],
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&h=800&fit=crop&auto=format",
      details: "Data is your most valuable asset. We design data warehouses, build ETL pipelines, and create BI dashboards that help you make data-driven decisions with confidence.",
    },
  ],
  testimonials: [
    {
      quote: "ZIF delivered a platform that outperformed every benchmark we set. Their engineers think in systems, not just features.",
      name: "Amara Osei",
      title: "CTO, TradeFlux Inc.",
      rating: 5,
    },
    {
      quote: "They rebuilt our entire data infrastructure in six months. Zero downtime during migration. That kind of execution is rare.",
      name: "Priya Ramanathan",
      title: "VP Engineering, MediSync",
      rating: 5,
    },
    {
      quote: "The AI routing system they built paid for itself in the first quarter. We've renewed our contract three times.",
      name: "Marcus Delle",
      title: "Head of Ops, LogiRoute",
      rating: 5,
    },
  ],
};

const ICON_MAP: Record<string, React.ElementType> = {
  Code2, Smartphone, Cloud, Brain, Shield, Database,
};

// ─── Posts types ─────────────────────────────────────────────────────────────

interface Post {
  id: string;
  title: string;
  excerpt: string;
  body: string;
  category: string;
  imageUrl: string;
  published: boolean;
  createdAt: string;
  updatedAt: string;
  gallery: string[];
  backgroundImage: string;
}

const CATEGORIES = ["Announcement", "Product Update", "Insight", "Case Study", "News", "Tutorial"];

const NAV_LINKS = [
  { label: "Services", href: "#services" },
  { label: "About", href: "#about" },
  { label: "Portfolio", href: "#portfolio" },
  { label: "Updates", href: "#blog" },
  { label: "Tutorials", id: "tutorials" },
  { label: "Contact", href: "#contact" },
];

interface Project {
  id: string;
  title: string;
  category: string;
  desc: string;
  tech: string[];
  image: string;
  color: string;
  images: string[];
  details: string;
  backgroundImage: string;
  demoUrl: string; // New field for demo URL
}

const DEFAULT_PROJECTS: Project[] = [
  {
    id: "1",
    title: "TradeFlux Platform",
    category: "FinTech · Web App",
    desc: "Real-time trading analytics dashboard processing 2M+ events per second with sub-100ms latency.",
    tech: ["React", "Rust", "Kafka", "TimescaleDB"],
    image: "photo-1611974789855-9c2a0a7236a3",
    color: "#00e5ff",
    images: [],
    details: "Built for high-frequency trading firms, this platform processes millions of events per second with millisecond precision. Features real-time dashboards, historical analytics, and automated reporting.",
    backgroundImage: "",
    demoUrl: "https://example.com",
  },
  {
    id: "2",
    title: "MediSync EHR",
    category: "HealthTech · SaaS",
    desc: "HIPAA-compliant electronic health records system serving 600+ clinics across 12 countries.",
    tech: ["Next.js", "PostgreSQL", "AWS", "HL7 FHIR"],
    image: "photo-1576091160550-2173dba999ef",
    color: "#f59e0b",
    images: [],
    details: "A comprehensive EHR system with patient management, appointment scheduling, billing, and telemedicine features. Fully HIPAA and GDPR compliant with end-to-end encryption.",
    backgroundImage: "",
    demoUrl: "",
  },
  {
    id: "3",
    title: "LogiRoute AI",
    category: "Logistics · AI",
    desc: "ML-powered route optimization engine reducing fuel costs by 23% for a national fleet operator.",
    tech: ["Python", "TensorFlow", "FastAPI", "Redis"],
    image: "photo-1558618666-fcd25c85cd64",
    color: "#a78bfa",
    images: [],
    details: "Uses machine learning to optimize delivery routes in real-time, considering traffic, weather, and vehicle constraints. Reduced operational costs by 23% in the first year of deployment.",
    backgroundImage: "",
    demoUrl: "",
  },
];

function useProjects() {
  const [projects, setProjects] = useState<Project[]>(() => {
    try {
      const saved = localStorage.getItem("zif_projects");
      if (!saved) {
        return DEFAULT_PROJECTS;
      }
      const parsed = JSON.parse(saved);
      if (!Array.isArray(parsed) || parsed.length === 0) {
        return DEFAULT_PROJECTS;
      }
      return parsed.map((p: any) => ({
        id: p.id || Date.now().toString(),
        title: p.title || "New Project",
        category: p.category || "Web App",
        desc: p.desc || "Project description...",
        tech: p.tech || ["React"],
        image: p.image || "photo-1611974789855-9c2a0a7236a3",
        color: p.color || "#00e5ff",
        images: p.images || [],
        details: p.details || "More details about the project...",
        backgroundImage: p.backgroundImage || "",
        demoUrl: p.demoUrl || "",
      }));
    } catch { 
      return DEFAULT_PROJECTS; 
    }
  });

  const saveProjects = (next: Project[]) => {
    setProjects(next);
    localStorage.setItem("zif_projects", JSON.stringify(next));
  };

  const createProject = (): Project => ({
    id: Date.now().toString(),
    title: "New Project",
    category: "Web App",
    desc: "Project description...",
    tech: ["React"],
    image: "photo-1611974789855-9c2a0a7236a3",
    color: "#00e5ff",
    images: [],
    details: "More details about the project...",
    backgroundImage: "",
    demoUrl: "",
  });

  const upsert = (project: Project) => {
    saveProjects(projects.some((p) => p.id === project.id) ? projects.map((p) => p.id === project.id ? project : p) : [project, ...projects]);
  };

  const remove = (id: string) => saveProjects(projects.filter((p) => p.id !== id));

  return { projects, createProject, upsert, remove };
}

const TECH_STACK = [
  "TypeScript", "Python", "Go", "Rust", "Java",
  "React", "Next.js", "Node.js", "FastAPI", "Django",
  "PostgreSQL", "MongoDB", "Redis", "Kafka", "Elasticsearch",
  "AWS", "GCP", "Azure", "Terraform", "Docker",
  "Kubernetes", "GraphQL", "gRPC", "Nginx", "Linux",
];

// ─── Hooks ────────────────────────────────────────────────────────────────────

function useScrollY() {
  const [y, setY] = useState(0);
  useEffect(() => {
    const handler = () => setY(window.scrollY);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);
  return y;
}

function useSiteContent() {
  const [content, setContent] = useState(() => {
    try {
      const saved = localStorage.getItem("zif_content");
      return saved ? JSON.parse(saved) : DEFAULT_CONTENT;
    } catch {
      return DEFAULT_CONTENT;
    }
  });

  const save = (next: typeof DEFAULT_CONTENT) => {
    setContent(next);
    localStorage.setItem("zif_content", JSON.stringify(next));
  };

  return { content, save };
}

function usePosts() {
  const [posts, setPosts] = useState<Post[]>(() => {
    try {
      const saved = localStorage.getItem("zif_posts");
      return saved ? JSON.parse(saved).map((p: any) => ({ gallery: [], backgroundImage: "", ...p })) : [];
    } catch { return []; }
  });

  const savePosts = (next: Post[]) => {
    setPosts(next);
    localStorage.setItem("zif_posts", JSON.stringify(next));
  };

  const createPost = (): Post => ({
    id: Date.now().toString(),
    title: "New Post Title",
    excerpt: "Brief summary of this post...",
    body: "Write your full post content here. You can share updates, announcements, insights, or anything you want your audience to know.",
    category: "Announcement",
    imageUrl: "",
    published: false,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    gallery: [],
    backgroundImage: "",
  });

  const upsert = (post: Post) => {
    const updated = { ...post, updatedAt: new Date().toISOString() };
    savePosts(posts.some((p) => p.id === post.id) ? posts.map((p) => p.id === post.id ? updated : p) : [updated, ...posts]);
  };

  const remove = (id: string) => savePosts(posts.filter((p) => p.id !== id));

  const togglePublish = (id: string) => {
    savePosts(posts.map((p) => p.id === id ? { ...p, published: !p.published, updatedAt: new Date().toISOString() } : p));
  };

  return { posts, createPost, upsert, remove, togglePublish };
}

// ─── Testimonials & Tutorial Hooks ──────────────────────────────────────────

interface UserTestimonial {
  id: string;
  name: string;
  email: string;
  title: string;
  quote: string;
  rating: number;
  approved: boolean;
  createdAt: string;
}

interface RegisteredUser {
  id: string;
  name: string;
  email: string;
  registeredAt: string;
}

interface Message {
  id: string;
  name: string;
  email: string;
  company: string;
  message: string;
  createdAt: string;
  read: boolean;
}

interface Comment {
  id: string;
  postId?: string;
  projectId?: string;
  userId: string;
  userName: string;
  content: string;
  createdAt: string;
  approved: boolean;
}

function useUserTestimonials() {
  const [testimonials, setTestimonials] = useState<UserTestimonial[]>(() => {
    try {
      const saved = localStorage.getItem("zif_user_testimonials");
      return saved ? JSON.parse(saved) : [];
    } catch { return []; }
  });

  const saveTestimonials = (next: UserTestimonial[]) => {
    setTestimonials(next);
    localStorage.setItem("zif_user_testimonials", JSON.stringify(next));
  };

  const submitTestimonial = (data: Omit<UserTestimonial, "id" | "approved" | "createdAt">) => {
    saveTestimonials([...testimonials, { ...data, id: Date.now().toString(), approved: false, createdAt: new Date().toISOString() }]);
  };

  const approveTestimonial = (id: string) => {
    saveTestimonials(testimonials.map(t => t.id === id ? { ...t, approved: true } : t));
  };

  const removeTestimonial = (id: string) => {
    saveTestimonials(testimonials.filter(t => t.id !== id));
  };

  return { testimonials, submitTestimonial, approveTestimonial, removeTestimonial };
}

function useRegisteredUsers() {
  const [users, setUsers] = useState<RegisteredUser[]>(() => {
    try {
      const saved = localStorage.getItem("zif_registered_users");
      return saved ? JSON.parse(saved) : [];
    } catch { return []; }
  });

  const saveUsers = (next: RegisteredUser[]) => {
    setUsers(next);
    localStorage.setItem("zif_registered_users", JSON.stringify(next));
  };

  const registerUser = (data: Omit<RegisteredUser, "id" | "registeredAt">) => {
    // Check if user already exists
    const existing = users.find(u => u.email === data.email);
    if (existing) return existing;
    const newUser = { ...data, id: Date.now().toString(), registeredAt: new Date().toISOString() };
    saveUsers([...users, newUser]);
    return newUser;
  };

  const removeUser = (id: string) => {
    saveUsers(users.filter(u => u.id !== id));
  };

  const getUserByEmail = (email: string) => {
    return users.find(u => u.email === email);
  };

  return { users, registerUser, removeUser, getUserByEmail };
}

function useMessages() {
  const [messages, setMessages] = useState<Message[]>(() => {
    try {
      const saved = localStorage.getItem("zif_client_messages");
      return saved ? JSON.parse(saved) : [];
    } catch { return []; }
  });

  const saveMessages = (next: Message[]) => {
    setMessages(next);
    localStorage.setItem("zif_client_messages", JSON.stringify(next));
  };

  const sendMessage = (data: Omit<Message, "id" | "createdAt" | "read">) => {
    saveMessages([...messages, { ...data, id: Date.now().toString(), createdAt: new Date().toISOString(), read: false }]);
  };

  const markAsRead = (id: string) => {
    saveMessages(messages.map(m => m.id === id ? { ...m, read: true } : m));
  };

  const removeMessage = (id: string) => {
    saveMessages(messages.filter(m => m.id !== id));
  };

  return { messages, sendMessage, markAsRead, removeMessage };
}

function useComments() {
  const [comments, setComments] = useState<Comment[]>(() => {
    try {
      const saved = localStorage.getItem("zif_comments");
      return saved ? JSON.parse(saved) : [];
    } catch { return []; }
  });

  const saveComments = (next: Comment[]) => {
    setComments(next);
    localStorage.setItem("zif_comments", JSON.stringify(next));
  };

  const addComment = (data: Omit<Comment, "id" | "createdAt" | "approved">) => {
    saveComments([...comments, { ...data, id: Date.now().toString(), createdAt: new Date().toISOString(), approved: false }]);
  };

  const approveComment = (id: string) => {
    saveComments(comments.map(c => c.id === id ? { ...c, approved: true } : c));
  };

  const removeComment = (id: string) => {
    saveComments(comments.filter(c => c.id !== id));
  };

  const getCommentsForPost = (postId: string) => {
    return comments.filter(c => c.postId === postId && c.approved);
  };

  const getCommentsForProject = (projectId: string) => {
    return comments.filter(c => c.projectId === projectId && c.approved);
  };

  return { comments, addComment, approveComment, removeComment, getCommentsForPost, getCommentsForProject };
}

// ─── Admin Panel ──────────────────────────────────────────────────────────────

const ADMIN_PASSWORD = "zif@admin2024";

function AdminLogin({ onLogin }: { onLogin: () => void }) {
  const [pw, setPw] = useState("");
  const [err, setErr] = useState(false);

  const attempt = () => {
    if (pw === ADMIN_PASSWORD) { onLogin(); setErr(false); }
    else setErr(true);
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center"
      style={{ background: "#070b13" }}
    >
      <div
        className="w-full max-w-sm p-8"
        style={{ background: "#0d1525", border: "1px solid rgba(0,229,255,0.12)", borderRadius: "2px" }}
      >
        <div className="flex items-center gap-2 mb-8">
          <Lock size={18} style={{ color: "#00e5ff" }} />
          <span style={{ fontFamily: "'Barlow Condensed', sans-serif", color: "#dce6f5", fontSize: "20px", fontWeight: 800 }}>
            ADMIN ACCESS
          </span>
        </div>
        <div className="space-y-4">
          <div>
            <label className="block text-xs mb-2 tracking-widest uppercase" style={{ fontFamily: "'DM Mono', monospace", color: "#3d6680" }}>
              Password
            </label>
            <input
              type="password"
              value={pw}
              onChange={(e) => { setPw(e.target.value); setErr(false); }}
              onKeyDown={(e) => e.key === "Enter" && attempt()}
              className="w-full px-4 py-3 text-sm outline-none"
              placeholder="Enter admin password"
              style={{
                background: "#111c30", border: `1px solid ${err ? "#ef4444" : "rgba(0,229,255,0.1)"}`,
                borderRadius: "2px", color: "#dce6f5", fontFamily: "'Inter', sans-serif",
              }}
            />
            {err && <p className="text-xs mt-2" style={{ color: "#ef4444", fontFamily: "'DM Mono', monospace" }}>Incorrect password.</p>}
          </div>
          <button
            onClick={attempt}
            className="w-full py-3 text-sm font-bold"
            style={{ background: "#00e5ff", color: "#070b13", borderRadius: "2px", fontFamily: "'Barlow', sans-serif" }}
          >
            UNLOCK ADMIN →
          </button>
        </div>
        <p className="text-xs mt-6 text-center" style={{ fontFamily: "'DM Mono', monospace", color: "#1e3a52" }}>
          ZyTech Insight · Admin Portal
        </p>
      </div>
    </div>
  );
}

type Content = typeof DEFAULT_CONTENT;

function AdminPanel({
  content, onSave, onExit,
  posts, createPost, upsertPost, removePost, togglePublish,
  projects, createProject, upsertProject, removeProject,
  userTestimonials, approveTestimonial, removeTestimonial,
  registeredUsers, removeRegisteredUser,
  messages, markMessageAsRead, removeMessage,
  comments, approveComment, removeComment,
}: {
  content: Content; onSave: (c: Content) => void; onExit: () => void;
  posts: Post[]; createPost: () => Post; upsertPost: (p: Post) => void;
  removePost: (id: string) => void; togglePublish: (id: string) => void;
  projects: Project[]; createProject: () => Project; upsertProject: (p: Project) => void;
  removeProject: (id: string) => void;
  userTestimonials: UserTestimonial[]; approveTestimonial: (id: string) => void; removeTestimonial: (id: string) => void;
  registeredUsers: RegisteredUser[]; removeRegisteredUser: (id: string) => void;
  messages: Message[]; markMessageAsRead: (id: string) => void; removeMessage: (id: string) => void;
  comments: Comment[]; approveComment: (id: string) => void; removeComment: (id: string) => void;
}) {
  const [tab, setTab] = useState<"hero" | "contact" | "services" | "stats" | "testimonials" | "posts" | "projects" | "siteSettings" | "userTestimonials" | "registeredUsers" | "messages" | "comments">("projects");
  const [draft, setDraft] = useState<Content>(JSON.parse(JSON.stringify(content)));
  const [saved, setSaved] = useState(false);
  const [editingPost, setEditingPost] = useState<Post | null>(null);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [emailBlast, setEmailBlast] = useState({ subject: "", body: "" });
  const logoFileRef = useRef<HTMLInputElement>(null);

  const commit = () => {
    onSave(draft);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const updatePath = (path: string[], value: string) => {
    const next = JSON.parse(JSON.stringify(draft)) as Record<string, unknown>;
    let cur: Record<string, unknown> = next;
    for (let i = 0; i < path.length - 1; i++) {
      if (Array.isArray(cur[path[i]])) {
        cur = (cur[path[i]] as Record<string, unknown>[])[Number(path[i + 1])];
        i++;
      } else {
        cur = cur[path[i]] as Record<string, unknown>;
      }
    }
    cur[path[path.length - 1]] = value;
    setDraft(next as Content);
  };

  const handleSendEmailBlast = () => {
    if (!emailBlast.subject || !emailBlast.body) return;
    // Since this is a static site, we'll just show a success message
    // In a real app, you'd send to a backend API
    alert(`Email blast sent to ${registeredUsers.length} users!`);
    setEmailBlast({ subject: "", body: "" });
  };

  const TABS = [
    { id: "projects", label: "Projects" },
    { id: "posts", label: "Posts" },
    { id: "messages", label: `Messages (${messages.filter(m => !m.read).length})` },
    { id: "comments", label: `Comments (${comments.filter(c => !c.approved).length})` },
    { id: "userTestimonials", label: "User Testimonials" },
    { id: "registeredUsers", label: "Registered Users" },
    { id: "hero", label: "Hero" },
    { id: "siteSettings", label: "Site Settings" },
    { id: "contact", label: "Contact" },
    { id: "services", label: "Services" },
    { id: "stats", label: "Stats" },
    { id: "testimonials", label: "Default Testimonials" },
  ] as const;

  return (
    <div className="min-h-screen" style={{ background: "#070b13" }}>
      {/* Admin top bar */}
      <div
        className="sticky top-0 z-50 flex items-center justify-between px-6 py-3"
        style={{ background: "#0d1525", borderBottom: "1px solid rgba(0,229,255,0.12)" }}
      >
        <div className="flex items-center gap-3">
          <Settings size={16} style={{ color: "#00e5ff" }} />
          <span style={{ fontFamily: "'Barlow Condensed', sans-serif", color: "#dce6f5", fontSize: "18px", fontWeight: 800 }}>
            ZIF ADMIN PANEL
          </span>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={onExit}
            className="flex items-center gap-2 px-4 py-2 text-xs"
            style={{ border: "1px solid rgba(0,229,255,0.15)", color: "#5e7499", borderRadius: "2px", fontFamily: "'DM Mono', monospace" }}
          >
            <Eye size={13} /> Preview Site
          </button>
          <button
            onClick={commit}
            className="flex items-center gap-2 px-4 py-2 text-xs font-bold"
            style={{ background: saved ? "#34d399" : "#00e5ff", color: "#070b13", borderRadius: "2px", fontFamily: "'Barlow', sans-serif", transition: "background 0.3s" }}
          >
            <Save size={13} /> {saved ? "SAVED!" : "SAVE CHANGES"}
          </button>
          <button onClick={onExit} className="p-2" style={{ color: "#5e7499" }}>
            <LogOut size={16} />
          </button>
        </div>
      </div>

      <div className="flex" style={{ minHeight: "calc(100vh - 53px)" }}>
        {/* Sidebar */}
        <div className="w-48 shrink-0 py-6 px-3" style={{ background: "#0a0f1c", borderRight: "1px solid rgba(0,229,255,0.06)" }}>
          {TABS.map((t) => (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              className="w-full text-left px-4 py-2.5 text-sm mb-1 transition-all duration-150"
              style={{
                fontFamily: "'Inter', sans-serif",
                background: tab === t.id ? "rgba(0,229,255,0.08)" : "transparent",
                color: tab === t.id ? "#00e5ff" : "#5e7499",
                borderRadius: "2px",
                borderLeft: tab === t.id ? "2px solid #00e5ff" : "2px solid transparent",
              }}
            >
              {t.label}
            </button>
          ))}
        </div>

        {/* Editor pane */}
        <div className="flex-1 p-8 overflow-y-auto">
          {tab === "projects" && !editingProject && (
            <AdminSection title="Projects & Portfolio">
              <div className="flex items-center justify-between mb-6">
                <p className="text-sm" style={{ fontFamily: "'Inter', sans-serif", color: "#5e7499" }}>
                  {projects.length} project{projects.length !== 1 ? "s" : ""}
                </p>
                <button
                  onClick={() => setEditingProject(createProject())}
                  className="flex items-center gap-2 px-5 py-2.5 text-sm font-bold"
                  style={{ background: "#00e5ff", color: "#070b13", borderRadius: "2px", fontFamily: "'Barlow', sans-serif" }}>
                  <Plus size={14} /> New Project
                </button>
              </div>
              {projects.length === 0 && (
                <div className="text-center py-20" style={{ border: "1px dashed rgba(0,229,255,0.12)", borderRadius: "2px" }}>
                  <FileText size={36} style={{ color: "#1e3a52", margin: "0 auto 12px" }} />
                  <p style={{ fontFamily: "'Barlow Condensed', sans-serif", color: "#3d5166", fontSize: "18px", fontWeight: 700 }}>NO PROJECTS YET</p>
                  <p className="text-sm mt-1" style={{ fontFamily: "'Inter', sans-serif", color: "#1e3a52" }}>Add your first project to showcase your work.</p>
                </div>
              )}
              <div className="space-y-3">
                {projects.map((project) => (
                  <div key={project.id} className="flex items-center gap-4 p-4"
                    style={{ background: "#0d1525", border: "1px solid rgba(0,229,255,0.08)", borderRadius: "2px" }}>
                    <img src={project.image.startsWith("data:") ? project.image : `https://images.unsplash.com/${project.image}?w=100&h=100&fit=crop&auto=format`} alt="" className="w-14 h-14 object-cover shrink-0" style={{ borderRadius: "2px", filter: "brightness(0.7)" }} />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-xs px-2 py-0.5" style={{ fontFamily: "'DM Mono', monospace", color: "#3d6680", border: "1px solid rgba(0,229,255,0.1)", borderRadius: "2px" }}>{project.category}</span>
                      </div>
                      <p className="font-bold text-sm truncate" style={{ fontFamily: "'Barlow', sans-serif", color: "#dce6f5" }}>{project.title}</p>
                      <p className="text-xs mt-0.5" style={{ fontFamily: "'DM Mono', monospace", color: "#1e3a52" }}>
                        {project.tech.join(", ")}
                      </p>
                    </div>
                    <div className="flex items-center gap-2 shrink-0">
                      <button onClick={() => setEditingProject(project)}
                        className="p-2 transition-colors duration-150"
                        style={{ color: "#5e7499", border: "1px solid rgba(0,229,255,0.08)", borderRadius: "2px" }}
                        onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = "#00e5ff"; }}
                        onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = "#5e7499"; }}>
                        <FileText size={14} />
                      </button>
                      <button onClick={() => removeProject(project.id)}
                        className="p-2 transition-colors duration-150"
                        style={{ color: "#5e7499", border: "1px solid rgba(0,229,255,0.08)", borderRadius: "2px" }}
                        onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = "#ef4444"; }}
                        onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = "#5e7499"; }}>
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </AdminSection>
          )}
          {tab === "projects" && editingProject && (
            <ProjectEditor
              project={editingProject}
              onSave={(p) => { upsertProject(p); setEditingProject(null); }}
              onCancel={() => setEditingProject(null)}
            />
          )}
          {tab === "posts" && !editingPost && (
            <AdminSection title="Posts & Updates">
              <div className="flex items-center justify-between mb-6">
                <p className="text-sm" style={{ fontFamily: "'Inter', sans-serif", color: "#5e7499" }}>
                  {posts.length} post{posts.length !== 1 ? "s" : ""} · {posts.filter(p => p.published).length} published
                </p>
                <button
                  onClick={() => setEditingPost(createPost())}
                  className="flex items-center gap-2 px-5 py-2.5 text-sm font-bold"
                  style={{ background: "#00e5ff", color: "#070b13", borderRadius: "2px", fontFamily: "'Barlow', sans-serif" }}>
                  <Plus size={14} /> New Post
                </button>
              </div>
              {posts.length === 0 && (
                <div className="text-center py-20" style={{ border: "1px dashed rgba(0,229,255,0.12)", borderRadius: "2px" }}>
                  <FileText size={36} style={{ color: "#1e3a52", margin: "0 auto 12px" }} />
                  <p style={{ fontFamily: "'Barlow Condensed', sans-serif", color: "#3d5166", fontSize: "18px", fontWeight: 700 }}>NO POSTS YET</p>
                  <p className="text-sm mt-1" style={{ fontFamily: "'Inter', sans-serif", color: "#1e3a52" }}>Create your first post to publish updates to your site.</p>
                </div>
              )}
              <div className="space-y-3">
                {posts.map((post) => (
                  <div key={post.id} className="flex items-center gap-4 p-4"
                    style={{ background: "#0d1525", border: "1px solid rgba(0,229,255,0.08)", borderRadius: "2px" }}>
                    {post.imageUrl ? (
                      post.imageUrl.startsWith("data:video") ? (
                        <video src={post.imageUrl} className="w-14 h-14 object-cover shrink-0" style={{ borderRadius: "2px", filter: "brightness(0.7)" }} />
                      ) : (
                        <img src={post.imageUrl} alt="" className="w-14 h-14 object-cover shrink-0" style={{ borderRadius: "2px", filter: "brightness(0.7)" }} />
                      )
                    ) : (
                      <div className="w-14 h-14 shrink-0 flex items-center justify-center" style={{ background: "#111c30", borderRadius: "2px" }}>
                        <ImageIcon size={18} style={{ color: "#1e3a52" }} />
                      </div>
                    )}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-xs px-2 py-0.5" style={{ fontFamily: "'DM Mono', monospace", color: "#3d6680", border: "1px solid rgba(0,229,255,0.1)", borderRadius: "2px" }}>{post.category}</span>
                        <span className="text-xs px-2 py-0.5" style={{ fontFamily: "'DM Mono', monospace", borderRadius: "2px", background: post.published ? "rgba(52,211,153,0.1)" : "rgba(94,116,153,0.1)", color: post.published ? "#34d399" : "#5e7499" }}>
                          {post.published ? "Published" : "Draft"}
                        </span>
                      </div>
                      <p className="font-bold text-sm truncate" style={{ fontFamily: "'Barlow', sans-serif", color: "#dce6f5" }}>{post.title}</p>
                      <p className="text-xs mt-0.5" style={{ fontFamily: "'DM Mono', monospace", color: "#1e3a52" }}>
                        {new Date(post.updatedAt).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" })}
                      </p>
                    </div>
                    <div className="flex items-center gap-2 shrink-0">
                      <button onClick={() => togglePublish(post.id)}
                        className="px-3 py-1.5 text-xs font-bold transition-all duration-150"
                        style={{ borderRadius: "2px", fontFamily: "'DM Mono', monospace", border: `1px solid ${post.published ? "rgba(239,68,68,0.3)" : "rgba(52,211,153,0.3)"}`, color: post.published ? "#ef4444" : "#34d399" }}>
                        {post.published ? "Unpublish" : "Publish"}
                      </button>
                      <button onClick={() => setEditingPost(post)}
                        className="p-2 transition-colors duration-150"
                        style={{ color: "#5e7499", border: "1px solid rgba(0,229,255,0.08)", borderRadius: "2px" }}
                        onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = "#00e5ff"; }}
                        onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = "#5e7499"; }}>
                        <FileText size={14} />
                      </button>
                      <button onClick={() => removePost(post.id)}
                        className="p-2 transition-colors duration-150"
                        style={{ color: "#5e7499", border: "1px solid rgba(0,229,255,0.08)", borderRadius: "2px" }}
                        onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = "#ef4444"; }}
                        onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = "#5e7499"; }}>
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </AdminSection>
          )}

          {tab === "posts" && editingPost && (
            <PostEditor
              post={editingPost}
              onSave={(p) => { upsertPost(p); setEditingPost(null); }}
              onCancel={() => setEditingPost(null)}
            />
          )}

          {tab === "hero" && (
            <AdminSection title="Hero Section">
              {(["tagline", "headline1", "headline2", "headline3", "subtext"] as const).map((k) => (
                <AdminField
                  key={k}
                  label={k}
                  value={draft.hero[k]}
                  multiline={k === "subtext"}
                  onChange={(v) => updatePath(["hero", k], v)}
                />
              ))}
            </AdminSection>
          )}

          {tab === "siteSettings" && (
            <AdminSection title="Site Settings">
              <div className="p-5 mb-4" style={{ background: "#0d1525", border: "1px solid rgba(0,229,255,0.08)", borderRadius: "2px" }}>
                <p className="text-xs tracking-widest uppercase mb-3" style={{ fontFamily: "'DM Mono', monospace", color: "#3d6680" }}>Website Logo</p>
                {draft.logo ? (
                  <div className="relative mb-3">
                    <img src={draft.logo} alt="Logo Preview" className="h-24 w-auto object-contain" />
                    <button onClick={() => { const n = JSON.parse(JSON.stringify(draft)); n.logo = ""; setDraft(n); }}
                      className="absolute top-2 right-2 p-1" style={{ background: "rgba(7,11,19,0.85)", borderRadius: "2px", color: "#ef4444" }}>
                      <Trash2 size={16} />
                    </button>
                  </div>
                ) : (
                  <div className="h-24 flex flex-col items-center justify-center mb-3 cursor-pointer"
                    style={{ border: "1px dashed rgba(0,229,255,0.15)", borderRadius: "2px" }}
                    onClick={() => logoFileRef.current?.click()}>
                    <ImageIcon size={32} style={{ color: "#1e3a52", marginBottom: "8px" }} />
                    <span className="text-sm" style={{ fontFamily: "'DM Mono', monospace", color: "#1e3a52" }}>Click to upload logo</span>
                  </div>
                )}
                <input ref={logoFileRef} type="file" accept="image/*" className="hidden" onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (!file) return;
                  const reader = new FileReader();
                  reader.onload = (ev) => {
                    const n = JSON.parse(JSON.stringify(draft));
                    n.logo = ev.target?.result as string;
                    setDraft(n);
                  };
                  reader.readAsDataURL(file);
                }} />
                <button onClick={() => logoFileRef.current?.click()}
                  className="w-full py-2 text-xs flex items-center justify-center gap-2"
                  style={{ border: "1px solid rgba(0,229,255,0.1)", color: "#5e7499", borderRadius: "2px", fontFamily: "'DM Mono', monospace" }}>
                  <ImageIcon size={12} /> {draft.logo ? "Change Logo" : "Upload Logo"}
                </button>
              </div>
            </AdminSection>
          )}

          {tab === "contact" && (
            <AdminSection title="Contact Details">
              <AdminField label="Email" value={draft.contact.email} onChange={(v) => updatePath(["contact", "email"], v)} />
              <AdminField label="WhatsApp Number 1" value={draft.contact.whatsapp1} onChange={(v) => updatePath(["contact", "whatsapp1"], v)} />
              <AdminField label="WhatsApp Number 2" value={draft.contact.whatsapp2} onChange={(v) => updatePath(["contact", "whatsapp2"], v)} />
              <AdminField label="Location" value={draft.contact.location} onChange={(v) => updatePath(["contact", "location"], v)} />
            </AdminSection>
          )}

          {tab === "stats" && (
            <AdminSection title="Stats Bar">
              {draft.stats.map((s, i) => (
                <div key={i} className="p-5 mb-3" style={{ background: "#0d1525", border: "1px solid rgba(0,229,255,0.08)", borderRadius: "2px" }}>
                  <p className="text-xs mb-3 tracking-widest uppercase" style={{ fontFamily: "'DM Mono', monospace", color: "#3d6680" }}>Stat {i + 1}</p>
                  <AdminField label="Value" value={s.value} onChange={(v) => { const n = JSON.parse(JSON.stringify(draft)); n.stats[i].value = v; setDraft(n); }} />
                  <AdminField label="Label" value={s.label} onChange={(v) => { const n = JSON.parse(JSON.stringify(draft)); n.stats[i].label = v; setDraft(n); }} />
                </div>
              ))}
            </AdminSection>
          )}

          {tab === "services" && (
            <AdminSection title="Services">
              {draft.services.map((s, i) => (
                <div key={i} className="p-5 mb-4" style={{ background: "#0d1525", border: "1px solid rgba(0,229,255,0.08)", borderRadius: "2px" }}>
                  <div className="flex items-center justify-between mb-3">
                    <p className="text-xs tracking-widest uppercase" style={{ fontFamily: "'DM Mono', monospace", color: "#3d6680" }}>Service {i + 1}</p>
                    <button
                      onClick={() => { const n = JSON.parse(JSON.stringify(draft)); n.services.splice(i, 1); setDraft(n); }}
                      className="p-1"
                      style={{ color: "#ef4444", opacity: 0.6 }}
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                  <AdminField label="Title" value={s.title} onChange={(v) => { const n = JSON.parse(JSON.stringify(draft)); n.services[i].title = v; setDraft(n); }} />
                  <AdminField label="Description" value={s.desc} multiline onChange={(v) => { const n = JSON.parse(JSON.stringify(draft)); n.services[i].desc = v; setDraft(n); }} />
                  <AdminField label="Tags (comma-separated)" value={s.tags.join(", ")} onChange={(v) => { const n = JSON.parse(JSON.stringify(draft)); n.services[i].tags = v.split(",").map((t) => t.trim()); setDraft(n); }} />
                </div>
              ))}
              <button
                onClick={() => { const n = JSON.parse(JSON.stringify(draft)); n.services.push({ icon: "Code2", title: "New Service", desc: "Service description.", tags: ["Tag"] }); setDraft(n); }}
                className="flex items-center gap-2 px-5 py-3 text-sm font-bold w-full justify-center"
                style={{ border: "1px dashed rgba(0,229,255,0.2)", color: "#00e5ff", borderRadius: "2px", fontFamily: "'Barlow', sans-serif" }}
              >
                <Plus size={15} /> Add Service
              </button>
            </AdminSection>
          )}

          {tab === "testimonials" && (
            <AdminSection title="Testimonials">
              {draft.testimonials.map((t, i) => (
                <div key={i} className="p-5 mb-4" style={{ background: "#0d1525", border: "1px solid rgba(0,229,255,0.08)", borderRadius: "2px" }}>
                  <div className="flex items-center justify-between mb-3">
                    <p className="text-xs tracking-widest uppercase" style={{ fontFamily: "'DM Mono', monospace", color: "#3d6680" }}>Testimonial {i + 1}</p>
                    <button
                      onClick={() => { const n = JSON.parse(JSON.stringify(draft)); n.testimonials.splice(i, 1); setDraft(n); }}
                      className="p-1"
                      style={{ color: "#ef4444", opacity: 0.6 }}
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                  <AdminField label="Quote" value={t.quote} multiline onChange={(v) => { const n = JSON.parse(JSON.stringify(draft)); n.testimonials[i].quote = v; setDraft(n); }} />
                  <AdminField label="Client Name" value={t.name} onChange={(v) => { const n = JSON.parse(JSON.stringify(draft)); n.testimonials[i].name = v; setDraft(n); }} />
                  <AdminField label="Client Title" value={t.title} onChange={(v) => { const n = JSON.parse(JSON.stringify(draft)); n.testimonials[i].title = v; setDraft(n); }} />
                </div>
              ))}
              <button
                onClick={() => { const n = JSON.parse(JSON.stringify(draft)); n.testimonials.push({ quote: "Great work from the ZIF team.", name: "Client Name", title: "Role, Company", rating: 5 }); setDraft(n); }}
                className="flex items-center gap-2 px-5 py-3 text-sm font-bold w-full justify-center"
                style={{ border: "1px dashed rgba(0,229,255,0.2)", color: "#00e5ff", borderRadius: "2px", fontFamily: "'Barlow', sans-serif" }}
              >
                <Plus size={15} /> Add Testimonial
              </button>
            </AdminSection>
          )}

          {tab === "userTestimonials" && (
            <AdminSection title="User Testimonials">
              {userTestimonials.length === 0 ? (
                <div className="text-center py-12" style={{ border: "1px dashed rgba(0,229,255,0.12)", borderRadius: "2px" }}>
                  <Users size={36} style={{ color: "#1e3a52", margin: "0 auto 12px" }} />
                  <p style={{ fontFamily: "'Barlow Condensed', sans-serif", color: "#3d5166", fontSize: "18px", fontWeight: 700 }}>NO USER TESTIMONIALS YET</p>
                  <p className="text-sm mt-1" style={{ fontFamily: "'Inter', sans-serif", color: "#1e3a52" }}>User testimonials will appear here when submitted.</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {userTestimonials.map(t => (
                    <div key={t.id} className="p-6" style={{ background: "#0d1525", border: "1px solid rgba(0,229,255,0.08)", borderRadius: "2px" }}>
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-2">
                          <span className={`text-xs px-2 py-1 ${t.approved ? "bg-green-500/10 text-green-400 border border-green-500/20" : "bg-yellow-500/10 text-yellow-400 border border-yellow-500/20"}`}
                            style={{ fontFamily: "'DM Mono', monospace", borderRadius: "2px" }}>
                            {t.approved ? "APPROVED" : "PENDING"}
                          </span>
                          <span className="text-xs" style={{ fontFamily: "'DM Mono', monospace", color: "#3d6680" }}>
                            {new Date(t.createdAt).toLocaleString()}
                          </span>
                        </div>
                        <div className="flex gap-2">
                          {!t.approved && (
                            <button onClick={() => approveTestimonial(t.id)}
                              className="px-4 py-2 text-xs font-bold"
                              style={{ background: "#10b981", color: "#070b13", borderRadius: "2px", fontFamily: "'Barlow', sans-serif" }}>
                              APPROVE
                            </button>
                          )}
                          <button onClick={() => removeTestimonial(t.id)}
                            className="px-4 py-2 text-xs font-bold"
                            style={{ background: "transparent", color: "#ef4444", border: "1px solid rgba(239,68,68,0.2)", borderRadius: "2px", fontFamily: "'Barlow', sans-serif" }}>
                            DELETE
                          </button>
                        </div>
                      </div>
                      <div className="flex gap-1 mb-3">
                        {Array.from({ length: t.rating }).map((_, j) => (
                          <Star key={j} size={14} style={{ color: "#f59e0b", fill: "#f59e0b" }} />
                        ))}
                      </div>
                      <p className="text-sm mb-2" style={{ fontFamily: "'Inter', sans-serif", color: "#dce6f5" }}>"{t.quote}"</p>
                      <div className="flex items-center gap-2 text-xs" style={{ fontFamily: "'DM Mono', monospace", color: "#3d6680" }}>
                        <span>{t.name}</span>
                        <span>•</span>
                        <span>{t.title}</span>
                        <span>•</span>
                        <span>{t.email}</span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </AdminSection>
          )}

          {tab === "messages" && (
            <AdminSection title="Client Messages">
              {messages.length === 0 ? (
                <div className="text-center py-12" style={{ border: "1px dashed rgba(0,229,255,0.12)", borderRadius: "2px" }}>
                  <MessageCircle size={36} style={{ color: "#1e3a52", margin: "0 auto 12px" }} />
                  <p style={{ fontFamily: "'Barlow Condensed', sans-serif", color: "#3d5166", fontSize: "18px", fontWeight: 700 }}>NO MESSAGES YET</p>
                  <p className="text-sm mt-1" style={{ fontFamily: "'Inter', sans-serif", color: "#1e3a52" }}>Messages will appear here when clients contact you.</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {messages.map(m => (
                    <div key={m.id} className="p-6" style={{ background: "#0d1525", border: "1px solid rgba(0,229,255,0.08)", borderRadius: "2px" }}>
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-3">
                          <div className="w-3 h-3 rounded-full" style={{ background: m.read ? "#3d6680" : "#00e5ff" }} />
                          <span className="text-sm font-bold" style={{ fontFamily: "'Inter', sans-serif", color: "#dce6f5" }}>{m.name}</span>
                          <span className="text-xs" style={{ fontFamily: "'DM Mono', monospace", color: "#3d6680" }}>{m.email}</span>
                        </div>
                        <div className="flex gap-2">
                          {!m.read && (
                            <button onClick={() => markMessageAsRead(m.id)}
                              className="px-4 py-2 text-xs font-bold"
                              style={{ background: "#00e5ff", color: "#070b13", borderRadius: "2px", fontFamily: "'Barlow', sans-serif" }}>
                              MARK AS READ
                            </button>
                          )}
                          <button onClick={() => removeMessage(m.id)}
                            className="px-4 py-2 text-xs font-bold"
                            style={{ background: "transparent", color: "#ef4444", border: "1px solid rgba(239,68,68,0.2)", borderRadius: "2px", fontFamily: "'Barlow', sans-serif" }}>
                            DELETE
                          </button>
                        </div>
                      </div>
                      {m.company && (
                        <p className="text-xs mb-2" style={{ fontFamily: "'DM Mono', monospace", color: "#3d6680" }}>Company: {m.company}</p>
                      )}
                      <p className="text-sm" style={{ fontFamily: "'Inter', sans-serif", color: "#a0b4c8" }}>{m.message}</p>
                      <p className="text-xs mt-3" style={{ fontFamily: "'DM Mono', monospace", color: "#1e3a52" }}>
                        {new Date(m.createdAt).toLocaleString()}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </AdminSection>
          )}

          {tab === "comments" && (
            <AdminSection title="Comments">
              {comments.length === 0 ? (
                <div className="text-center py-12" style={{ border: "1px dashed rgba(0,229,255,0.12)", borderRadius: "2px" }}>
                  <MessageCircle size={36} style={{ color: "#1e3a52", margin: "0 auto 12px" }} />
                  <p style={{ fontFamily: "'Barlow Condensed', sans-serif", color: "#3d5166", fontSize: "18px", fontWeight: 700 }}>NO COMMENTS YET</p>
                  <p className="text-sm mt-1" style={{ fontFamily: "'Inter', sans-serif", color: "#1e3a52" }}>Comments will appear here when users post them.</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {comments.map(c => (
                    <div key={c.id} className="p-6" style={{ background: "#0d1525", border: "1px solid rgba(0,229,255,0.08)", borderRadius: "2px" }}>
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-3">
                          <span className={`text-xs px-2 py-1 ${c.approved ? "bg-green-500/10 text-green-400 border border-green-500/20" : "bg-yellow-500/10 text-yellow-400 border border-yellow-500/20"}`}
                            style={{ fontFamily: "'DM Mono', monospace", borderRadius: "2px" }}>
                            {c.approved ? "APPROVED" : "PENDING"}
                          </span>
                          <span className="text-sm font-bold" style={{ fontFamily: "'Inter', sans-serif", color: "#dce6f5" }}>{c.userName}</span>
                        </div>
                        <div className="flex gap-2">
                          {!c.approved && (
                            <button onClick={() => approveComment(c.id)}
                              className="px-4 py-2 text-xs font-bold"
                              style={{ background: "#10b981", color: "#070b13", borderRadius: "2px", fontFamily: "'Barlow', sans-serif" }}>
                              APPROVE
                            </button>
                          )}
                          <button onClick={() => removeComment(c.id)}
                            className="px-4 py-2 text-xs font-bold"
                            style={{ background: "transparent", color: "#ef4444", border: "1px solid rgba(239,68,68,0.2)", borderRadius: "2px", fontFamily: "'Barlow', sans-serif" }}>
                            DELETE
                          </button>
                        </div>
                      </div>
                      {c.postId && <p className="text-xs mb-2" style={{ fontFamily: "'DM Mono', monospace", color: "#3d6680" }}>Post ID: {c.postId}</p>}
                      {c.projectId && <p className="text-xs mb-2" style={{ fontFamily: "'DM Mono', monospace", color: "#3d6680" }}>Project ID: {c.projectId}</p>}
                      <p className="text-sm" style={{ fontFamily: "'Inter', sans-serif", color: "#a0b4c8" }}>{c.content}</p>
                      <p className="text-xs mt-3" style={{ fontFamily: "'DM Mono', monospace", color: "#1e3a52" }}>
                        {new Date(c.createdAt).toLocaleString()}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </AdminSection>
          )}

          {tab === "registeredUsers" && (
            <AdminSection title="Registered Users">
              {registeredUsers.length === 0 ? (
                <div className="text-center py-12" style={{ border: "1px dashed rgba(0,229,255,0.12)", borderRadius: "2px" }}>
                  <Users size={36} style={{ color: "#1e3a52", margin: "0 auto 12px" }} />
                  <p style={{ fontFamily: "'Barlow Condensed', sans-serif", color: "#3d5166", fontSize: "18px", fontWeight: 700 }}>NO REGISTERED USERS YET</p>
                  <p className="text-sm mt-1" style={{ fontFamily: "'Inter', sans-serif", color: "#1e3a52" }}>Users will appear here when they register.</p>
                </div>
              ) : (
                <div className="space-y-6">
                  {/* Email Blast Section */}
                  <div className="p-6 mb-6" style={{ background: "#0d1525", border: "1px solid rgba(0,229,255,0.12)", borderRadius: "2px" }}>
                    <p className="text-xs tracking-widest uppercase mb-4" style={{ fontFamily: "'DM Mono', monospace", color: "#3d6680" }}>
                      SEND UPDATE TO ALL {registeredUsers.length} USERS
                    </p>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-xs mb-2 tracking-wider uppercase" style={{ fontFamily: "'DM Mono', monospace", color: "#3d6680" }}>Subject</label>
                        <input type="text" value={emailBlast.subject} onChange={(e) => setEmailBlast({ ...emailBlast, subject: e.target.value })}
                          className="w-full px-4 py-3 text-sm outline-none"
                          style={{ background: "#111c30", border: "1px solid rgba(0,229,255,0.1)", borderRadius: "2px", color: "#dce6f5", fontFamily: "'Inter', sans-serif" }} />
                      </div>
                      <div>
                        <label className="block text-xs mb-2 tracking-wider uppercase" style={{ fontFamily: "'DM Mono', monospace", color: "#3d6680" }}>Message</label>
                        <textarea rows={5} value={emailBlast.body} onChange={(e) => setEmailBlast({ ...emailBlast, body: e.target.value })}
                          className="w-full px-4 py-3 text-sm outline-none resize-none"
                          style={{ background: "#111c30", border: "1px solid rgba(0,229,255,0.1)", borderRadius: "2px", color: "#dce6f5", fontFamily: "'Inter', sans-serif" }} />
                      </div>
                      <button onClick={handleSendEmailBlast}
                        className="px-6 py-3 text-sm font-bold"
                        style={{ background: "#00e5ff", color: "#070b13", borderRadius: "2px", fontFamily: "'Barlow', sans-serif" }}>
                        SEND TO ALL ({registeredUsers.length})
                      </button>
                    </div>
                  </div>

                  {/* User List */}
                  <div className="space-y-3">
                    {registeredUsers.map(u => (
                      <div key={u.id} className="flex items-center justify-between p-4"
                        style={{ background: "#0d1525", border: "1px solid rgba(0,229,255,0.08)", borderRadius: "2px" }}>
                        <div>
                          <p className="text-sm font-medium" style={{ fontFamily: "'Inter', sans-serif", color: "#dce6f5" }}>{u.name}</p>
                          <p className="text-xs" style={{ fontFamily: "'DM Mono', monospace", color: "#3d6680" }}>
                            {u.email} • {new Date(u.registeredAt).toLocaleString()}
                          </p>
                        </div>
                        <button onClick={() => removeRegisteredUser(u.id)}
                          className="p-2"
                          style={{ color: "#ef4444", border: "1px solid rgba(239,68,68,0.2)", borderRadius: "2px" }}>
                          <Trash2 size={16} />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </AdminSection>
          )}
        </div>
      </div>
    </div>
  );
}

function PostEditor({ post, onSave, onCancel }: { post: Post; onSave: (p: Post) => void; onCancel: () => void }) {
  const [draft, setDraft] = useState<Post>({ ...post });
  const fileRef = useRef<HTMLInputElement>(null);
  const galleryFileRef = useRef<HTMLInputElement>(null);
  const backgroundFileRef = useRef<HTMLInputElement>(null);

  const set = (key: keyof Post, value: any) => setDraft((d) => ({ ...d, [key]: value }));

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => set("imageUrl", ev.target?.result as string);
    reader.readAsDataURL(file);
  };

  const handleGalleryFiles = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (!files.length) return;
    files.forEach(file => {
      const reader = new FileReader();
      reader.onload = (ev) => {
        set("gallery", [...draft.gallery, ev.target?.result as string]);
      };
      reader.readAsDataURL(file);
    });
  };

  const handleBackgroundFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => set("backgroundImage", ev.target?.result as string);
    reader.readAsDataURL(file);
  };

  return (
    <div>
      <div className="flex items-center gap-3 mb-8">
        <button onClick={onCancel} className="text-xs flex items-center gap-1 transition-colors duration-150"
          style={{ fontFamily: "'DM Mono', monospace", color: "#5e7499" }}
          onMouseEnter={(e) => (e.currentTarget.style.color = "#dce6f5")}
          onMouseLeave={(e) => (e.currentTarget.style.color = "#5e7499")}>
          ← All Posts
        </button>
        <span style={{ color: "#1e3a52" }}>/</span>
        <span className="text-xs" style={{ fontFamily: "'DM Mono', monospace", color: "#3d6680" }}>
          {draft.id === post.id && post.title === "New Post Title" ? "New Post" : draft.title}
        </span>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Main editor */}
        <div className="lg:col-span-2 space-y-5">
          <div>
            <label className="block text-xs mb-2 tracking-widest uppercase" style={{ fontFamily: "'DM Mono', monospace", color: "#3d6680" }}>Post Title</label>
            <input type="text" value={draft.title} onChange={(e) => set("title", e.target.value)}
              className="w-full px-4 py-3 text-lg font-bold outline-none"
              style={{ background: "#0d1525", border: "1px solid rgba(0,229,255,0.1)", borderRadius: "2px", color: "#dce6f5", fontFamily: "'Barlow', sans-serif" }}
              onFocus={(e) => { e.currentTarget.style.borderColor = "rgba(0,229,255,0.4)"; }}
              onBlur={(e) => { e.currentTarget.style.borderColor = "rgba(0,229,255,0.1)"; }} />
          </div>
          <div>
            <label className="block text-xs mb-2 tracking-widest uppercase" style={{ fontFamily: "'DM Mono', monospace", color: "#3d6680" }}>Short Excerpt (shown in cards)</label>
            <textarea rows={2} value={draft.excerpt} onChange={(e) => set("excerpt", e.target.value)}
              className="w-full px-4 py-3 text-sm outline-none resize-none"
              style={{ background: "#0d1525", border: "1px solid rgba(0,229,255,0.1)", borderRadius: "2px", color: "#dce6f5", fontFamily: "'Inter', sans-serif" }}
              onFocus={(e) => { e.currentTarget.style.borderColor = "rgba(0,229,255,0.4)"; }}
              onBlur={(e) => { e.currentTarget.style.borderColor = "rgba(0,229,255,0.1)"; }} />
          </div>
          <div>
            <label className="block text-xs mb-2 tracking-widest uppercase" style={{ fontFamily: "'DM Mono', monospace", color: "#3d6680" }}>Full Post Content</label>
            <textarea rows={16} value={draft.body} onChange={(e) => set("body", e.target.value)}
              placeholder="Write your full post here..."
              className="w-full px-4 py-3 text-sm outline-none resize-y"
              style={{ background: "#0d1525", border: "1px solid rgba(0,229,255,0.1)", borderRadius: "2px", color: "#dce6f5", fontFamily: "'Inter', sans-serif", lineHeight: "1.8", minHeight: "320px" }}
              onFocus={(e) => { e.currentTarget.style.borderColor = "rgba(0,229,255,0.4)"; }}
              onBlur={(e) => { e.currentTarget.style.borderColor = "rgba(0,229,255,0.1)"; }} />
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-5">
          {/* Publish box */}
          <div className="p-5" style={{ background: "#0d1525", border: "1px solid rgba(0,229,255,0.08)", borderRadius: "2px" }}>
            <p className="text-xs tracking-widest uppercase mb-4" style={{ fontFamily: "'DM Mono', monospace", color: "#3d6680" }}>Publish</p>
            <div className="flex items-center gap-3 mb-5">
              <div className="w-3 h-3 rounded-full" style={{ background: draft.published ? "#34d399" : "#5e7499" }} />
              <span className="text-sm" style={{ fontFamily: "'Inter', sans-serif", color: draft.published ? "#34d399" : "#5e7499" }}>
                {draft.published ? "Will publish to site" : "Saved as draft"}
              </span>
            </div>
            <div className="space-y-3">
              <button onClick={() => { set("published", true); onSave({ ...draft, published: true }); }}
                className="w-full py-3 text-sm font-bold flex items-center justify-center gap-2"
                style={{ background: "#00e5ff", color: "#070b13", borderRadius: "2px", fontFamily: "'Barlow', sans-serif" }}>
                <Send size={14} /> Publish Now
              </button>
              <button onClick={() => { set("published", false); onSave({ ...draft, published: false }); }}
                className="w-full py-2.5 text-xs font-bold flex items-center justify-center gap-2"
                style={{ border: "1px solid rgba(0,229,255,0.12)", color: "#5e7499", borderRadius: "2px", fontFamily: "'DM Mono', monospace" }}>
                <EyeOff size={12} /> Save as Draft
              </button>
            </div>
          </div>

          {/* Category */}
          <div className="p-5" style={{ background: "#0d1525", border: "1px solid rgba(0,229,255,0.08)", borderRadius: "2px" }}>
            <p className="text-xs tracking-widest uppercase mb-3" style={{ fontFamily: "'DM Mono', monospace", color: "#3d6680" }}>Category</p>
            <div className="flex flex-wrap gap-2">
              {CATEGORIES.map((cat) => (
                <button key={cat} onClick={() => set("category", cat)}
                  className="px-3 py-1.5 text-xs transition-all duration-150"
                  style={{
                    fontFamily: "'DM Mono', monospace", borderRadius: "2px",
                    background: draft.category === cat ? "rgba(0,229,255,0.12)" : "transparent",
                    border: `1px solid ${draft.category === cat ? "#00e5ff" : "rgba(0,229,255,0.1)"}`,
                    color: draft.category === cat ? "#00e5ff" : "#3d6680",
                  }}>
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Cover image */}
          <div className="p-5" style={{ background: "#0d1525", border: "1px solid rgba(0,229,255,0.08)", borderRadius: "2px" }}>
            <p className="text-xs tracking-widest uppercase mb-3" style={{ fontFamily: "'DM Mono', monospace", color: "#3d6680" }}>Cover Media</p>
            {draft.imageUrl ? (
              <div className="relative mb-3">
                {draft.imageUrl.startsWith("data:video") ? (
                  <video src={draft.imageUrl} className="w-full h-32 object-cover" style={{ borderRadius: "2px" }} controls />
                ) : (
                  <img src={draft.imageUrl} alt="cover" className="w-full h-32 object-cover" style={{ borderRadius: "2px" }} />
                )}
                <button onClick={() => set("imageUrl", "")}
                  className="absolute top-2 right-2 w-7 h-7 flex items-center justify-center"
                  style={{ background: "rgba(7,11,19,0.85)", borderRadius: "2px", color: "#ef4444" }}>
                  <Trash2 size={13} />
                </button>
              </div>
            ) : (
              <div className="h-28 flex flex-col items-center justify-center mb-3 cursor-pointer"
                style={{ border: "1px dashed rgba(0,229,255,0.15)", borderRadius: "2px" }}
                onClick={() => fileRef.current?.click()}>
                <ImageIcon size={22} style={{ color: "#1e3a52", marginBottom: "6px" }} />
                <span className="text-xs" style={{ fontFamily: "'DM Mono', monospace", color: "#1e3a52" }}>Click to upload image/video</span>
              </div>
            )}
            <input ref={fileRef} type="file" accept="image/*,video/*" className="hidden" onChange={handleFile} />
            <button onClick={() => fileRef.current?.click()}
              className="w-full py-2 text-xs flex items-center justify-center gap-2"
              style={{ border: "1px solid rgba(0,229,255,0.1)", color: "#5e7499", borderRadius: "2px", fontFamily: "'DM Mono', monospace" }}>
              <ImageIcon size={12} /> {draft.imageUrl ? "Change Media" : "Upload Media"}
            </button>
            <p className="text-xs mt-2" style={{ fontFamily: "'DM Mono', monospace", color: "#1e3a52" }}>
              Images, GIFs, or short videos supported
            </p>
          </div>

          {/* Gallery */}
          <div className="p-5" style={{ background: "#0d1525", border: "1px solid rgba(0,229,255,0.08)", borderRadius: "2px" }}>
            <p className="text-xs tracking-widest uppercase mb-3" style={{ fontFamily: "'DM Mono', monospace", color: "#3d6680" }}>Gallery (Multiple Images/Videos)</p>
            {draft.gallery.length > 0 && (
              <div className="grid grid-cols-3 gap-2 mb-3">
                {draft.gallery.map((media, i) => (
                  <div key={i} className="relative aspect-square">
                    {media.startsWith("data:video") ? (
                      <video src={media} className="w-full h-full object-cover" style={{ borderRadius: "2px" }} />
                    ) : (
                      <img src={media} alt="" className="w-full h-full object-cover" style={{ borderRadius: "2px" }} />
                    )}
                    <button onClick={() => set("gallery", draft.gallery.filter((_, idx) => idx !== i))}
                      className="absolute top-1 right-1 w-6 h-6 flex items-center justify-center"
                      style={{ background: "rgba(7,11,19,0.85)", borderRadius: "2px", color: "#ef4444" }}>
                      <Trash2 size={10} />
                    </button>
                  </div>
                ))}
              </div>
            )}
            <input ref={galleryFileRef} type="file" accept="image/*,video/*" multiple className="hidden" onChange={handleGalleryFiles} />
            <button onClick={() => galleryFileRef.current?.click()}
              className="w-full py-2 text-xs flex items-center justify-center gap-2"
              style={{ border: "1px solid rgba(0,229,255,0.1)", color: "#5e7499", borderRadius: "2px", fontFamily: "'DM Mono', monospace" }}>
              <ImageIcon size={12} /> Add to Gallery
            </button>
          </div>

          {/* Background Image/GIF */}
          <div className="p-5" style={{ background: "#0d1525", border: "1px solid rgba(0,229,255,0.08)", borderRadius: "2px" }}>
            <p className="text-xs tracking-widest uppercase mb-3" style={{ fontFamily: "'DM Mono', monospace", color: "#3d6680" }}>Background Image/GIF</p>
            {draft.backgroundImage && (
              <div className="relative mb-3">
                <img src={draft.backgroundImage} alt="Background preview" className="w-full h-24 object-cover" style={{ borderRadius: "2px" }} />
                <button onClick={() => set("backgroundImage", "")}
                  className="absolute top-2 right-2 w-7 h-7 flex items-center justify-center"
                  style={{ background: "rgba(7,11,19,0.85)", borderRadius: "2px", color: "#ef4444" }}>
                  <Trash2 size={13} />
                </button>
              </div>
            )}
            <input ref={backgroundFileRef} type="file" accept="image/*" className="hidden" onChange={handleBackgroundFile} />
            <button onClick={() => backgroundFileRef.current?.click()}
              className="w-full py-2 text-xs flex items-center justify-center gap-2"
              style={{ border: "1px solid rgba(0,229,255,0.1)", color: "#5e7499", borderRadius: "2px", fontFamily: "'DM Mono', monospace" }}>
              <ImageIcon size={12} /> {draft.backgroundImage ? "Change Background" : "Upload Background"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function ProjectEditor({ project, onSave, onCancel }: { project: Project; onSave: (p: Project) => void; onCancel: () => void }) {
  const [draft, setDraft] = useState<Project>({ ...project });
  const [saved, setSaved] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);
  const backgroundFileRef = useRef<HTMLInputElement>(null);

  const set = (key: keyof Project, value: any) => setDraft((d) => ({ ...d, [key]: value }));

  const handleSlideshowImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (!files.length) return;
    files.forEach(file => {
      const reader = new FileReader();
      reader.onload = (ev) => {
        set("images", [...draft.images, ev.target?.result as string]);
      };
      reader.readAsDataURL(file);
    });
  };

  const handleBackgroundFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => set("backgroundImage", ev.target?.result as string);
    reader.readAsDataURL(file);
  };

  const handleSave = () => {
    onSave(draft);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div>
      <div className="flex items-center gap-3 mb-8">
        <button onClick={onCancel} className="text-xs flex items-center gap-1 transition-colors duration-150"
          style={{ fontFamily: "'DM Mono', monospace", color: "#5e7499" }}
          onMouseEnter={(e) => (e.currentTarget.style.color = "#dce6f5")}
          onMouseLeave={(e) => (e.currentTarget.style.color = "#5e7499")}>
          ← All Projects
        </button>
        <span style={{ color: "#1e3a52" }}>/</span>
        <span className="text-xs" style={{ fontFamily: "'DM Mono', monospace", color: "#3d6680" }}>
          {draft.title}
        </span>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Main editor */}
        <div className="lg:col-span-2 space-y-5">
          <div>
            <label className="block text-xs mb-2 tracking-widest uppercase" style={{ fontFamily: "'DM Mono', monospace", color: "#3d6680" }}>Project Title</label>
            <input type="text" value={draft.title} onChange={(e) => set("title", e.target.value)}
              className="w-full px-4 py-3 text-lg font-bold outline-none"
              style={{ background: "#0d1525", border: "1px solid rgba(0,229,255,0.1)", borderRadius: "2px", color: "#dce6f5", fontFamily: "'Barlow', sans-serif" }} />
          </div>
          <div>
            <label className="block text-xs mb-2 tracking-widest uppercase" style={{ fontFamily: "'DM Mono', monospace", color: "#3d6680" }}>Short Description (shown in cards)</label>
            <textarea rows={2} value={draft.desc} onChange={(e) => set("desc", e.target.value)}
              className="w-full px-4 py-3 text-sm outline-none resize-none"
              style={{ background: "#0d1525", border: "1px solid rgba(0,229,255,0.1)", borderRadius: "2px", color: "#dce6f5", fontFamily: "'Inter', sans-serif" }} />
          </div>
          <div>
            <label className="block text-xs mb-2 tracking-widest uppercase" style={{ fontFamily: "'DM Mono', monospace", color: "#3d6680" }}>Full Project Details</label>
            <textarea rows={10} value={draft.details} onChange={(e) => set("details", e.target.value)}
              className="w-full px-4 py-3 text-sm outline-none resize-y"
              style={{ background: "#0d1525", border: "1px solid rgba(0,229,255,0.1)", borderRadius: "2px", color: "#dce6f5", fontFamily: "'Inter', sans-serif", lineHeight: "1.8", minHeight: "200px" }} />
          </div>
          <div>
            <label className="block text-xs mb-2 tracking-widest uppercase" style={{ fontFamily: "'DM Mono', monospace", color: "#3d6680" }}>Demo URL (for testing app)</label>
            <input type="url" value={draft.demoUrl} onChange={(e) => set("demoUrl", e.target.value)}
              className="w-full px-4 py-3 text-sm outline-none"
              style={{ background: "#0d1525", border: "1px solid rgba(0,229,255,0.1)", borderRadius: "2px", color: "#dce6f5", fontFamily: "'Inter', sans-serif" }}
              placeholder="https://your-demo-app.com" />
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-5">
          {/* Save box */}
          <div className="p-5" style={{ background: "#0d1525", border: "1px solid rgba(0,229,255,0.08)", borderRadius: "2px" }}>
            <button onClick={handleSave}
              className="w-full py-3 text-sm font-bold flex items-center justify-center gap-2"
              style={{ background: saved ? "#34d399" : "#00e5ff", color: "#070b13", borderRadius: "2px", fontFamily: "'Barlow', sans-serif", transition: "background 0.3s" }}>
              <Save size={14} /> {saved ? "SAVED!" : "Save Project"}
            </button>
          </div>

          {/* Category & Color */}
          <div className="p-5" style={{ background: "#0d1525", border: "1px solid rgba(0,229,255,0.08)", borderRadius: "2px" }}>
            <p className="text-xs tracking-widest uppercase mb-3" style={{ fontFamily: "'DM Mono', monospace", color: "#3d6680" }}>Category</p>
            <input type="text" value={draft.category} onChange={(e) => set("category", e.target.value)}
              className="w-full px-3 py-2 text-sm outline-none mb-4"
              style={{ background: "#111c30", border: "1px solid rgba(0,229,255,0.1)", borderRadius: "2px", color: "#dce6f5", fontFamily: "'Inter', sans-serif" }} />
            
            <p className="text-xs tracking-widest uppercase mb-3" style={{ fontFamily: "'DM Mono', monospace", color: "#3d6680" }}>Accent Color</p>
            <input type="color" value={draft.color} onChange={(e) => set("color", e.target.value)}
              className="w-full h-10 cursor-pointer" />
          </div>

          {/* Main Project Image */}
          <div className="p-5" style={{ background: "#0d1525", border: "1px solid rgba(0,229,255,0.08)", borderRadius: "2px" }}>
            <p className="text-xs tracking-widest uppercase mb-3" style={{ fontFamily: "'DM Mono', monospace", color: "#3d6680" }}>Main Project Image</p>
            {draft.image.startsWith("data:") ? (
              <div className="relative mb-3">
                <img src={draft.image} alt="Project" className="w-full h-32 object-cover" style={{ borderRadius: "2px" }} />
                <button onClick={() => set("image", "photo-1611974789855-9c2a0a7236a3")}
                  className="absolute top-2 right-2 w-7 h-7 flex items-center justify-center"
                  style={{ background: "rgba(7,11,19,0.85)", borderRadius: "2px", color: "#ef4444" }}>
                  <Trash2 size={13} />
                </button>
              </div>
            ) : (
              <div className="h-28 flex flex-col items-center justify-center mb-3 cursor-pointer"
                style={{ border: "1px dashed rgba(0,229,255,0.15)", borderRadius: "2px" }}
                onClick={() => fileRef.current?.click()}>
                <ImageIcon size={22} style={{ color: "#1e3a52", marginBottom: "6px" }} />
                <span className="text-xs" style={{ fontFamily: "'DM Mono', monospace", color: "#1e3a52" }}>Click to upload image</span>
              </div>
            )}
            <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={(e) => {
              const file = e.target.files?.[0];
              if (!file) return;
              const reader = new FileReader();
              reader.onload = (ev) => set("image", ev.target?.result as string);
              reader.readAsDataURL(file);
            }} />
            <button onClick={() => fileRef.current?.click()}
              className="w-full py-2 text-xs flex items-center justify-center gap-2"
              style={{ border: "1px solid rgba(0,229,255,0.1)", color: "#5e7499", borderRadius: "2px", fontFamily: "'DM Mono', monospace" }}>
              <ImageIcon size={12} /> {draft.image.startsWith("data:") ? "Change Image" : "Upload Image"}
            </button>
            <p className="text-xs mt-2" style={{ fontFamily: "'DM Mono', monospace", color: "#1e3a52" }}>
              Or enter Unsplash photo ID (e.g., photo-123...)
            </p>
            <input type="text" value={draft.image.startsWith("data:") ? "" : draft.image} onChange={(e) => !e.target.value.startsWith("data:") && set("image", e.target.value || "photo-1611974789855-9c2a0a7236a3")}
              className="w-full px-3 py-2 text-sm outline-none mt-2"
              style={{ background: "#111c30", border: "1px solid rgba(0,229,255,0.1)", borderRadius: "2px", color: "#dce6f5", fontFamily: "'Inter', sans-serif" }} />
          </div>

          {/* Technologies */}
          <div className="p-5" style={{ background: "#0d1525", border: "1px solid rgba(0,229,255,0.08)", borderRadius: "2px" }}>
            <p className="text-xs tracking-widest uppercase mb-3" style={{ fontFamily: "'DM Mono', monospace", color: "#3d6680" }}>Technologies (comma-separated)</p>
            <input type="text" value={draft.tech.join(", ")} onChange={(e) => set("tech", e.target.value.split(",").map(t => t.trim()).filter(t => t))}
              className="w-full px-3 py-2 text-sm outline-none"
              style={{ background: "#111c30", border: "1px solid rgba(0,229,255,0.1)", borderRadius: "2px", color: "#dce6f5", fontFamily: "'Inter', sans-serif" }} />
          </div>

          {/* Slideshow images */}
          <div className="p-5" style={{ background: "#0d1525", border: "1px solid rgba(0,229,255,0.08)", borderRadius: "2px" }}>
            <p className="text-xs tracking-widest uppercase mb-3" style={{ fontFamily: "'DM Mono', monospace", color: "#3d6680" }}>Slideshow Images</p>
            {draft.images.length > 0 && (
              <div className="grid grid-cols-3 gap-2 mb-3">
                {draft.images.map((img, i) => (
                  <div key={i} className="relative aspect-square">
                    <img src={img} alt="" className="w-full h-full object-cover" style={{ borderRadius: "2px" }} />
                    <button onClick={() => set("images", draft.images.filter((_, idx) => idx !== i))}
                      className="absolute top-1 right-1 w-6 h-6 flex items-center justify-center"
                      style={{ background: "rgba(7,11,19,0.85)", borderRadius: "2px", color: "#ef4444" }}>
                      <Trash2 size={10} />
                    </button>
                  </div>
                ))}
              </div>
            )}
            <input ref={fileRef} type="file" accept="image/*" multiple className="hidden" onChange={handleSlideshowImage} />
            <button onClick={() => fileRef.current?.click()}
              className="w-full py-2 text-xs flex items-center justify-center gap-2"
              style={{ border: "1px solid rgba(0,229,255,0.1)", color: "#5e7499", borderRadius: "2px", fontFamily: "'DM Mono', monospace" }}>
              <ImageIcon size={12} /> Add Images to Slideshow
            </button>
          </div>

          {/* Background Image/GIF */}
          <div className="p-5" style={{ background: "#0d1525", border: "1px solid rgba(0,229,255,0.08)", borderRadius: "2px" }}>
            <p className="text-xs tracking-widest uppercase mb-3" style={{ fontFamily: "'DM Mono', monospace", color: "#3d6680" }}>Background Image/GIF</p>
            {draft.backgroundImage && (
              <div className="relative mb-3">
                <img src={draft.backgroundImage} alt="Background preview" className="w-full h-24 object-cover" style={{ borderRadius: "2px" }} />
                <button onClick={() => set("backgroundImage", "")}
                  className="absolute top-2 right-2 w-7 h-7 flex items-center justify-center"
                  style={{ background: "rgba(7,11,19,0.85)", borderRadius: "2px", color: "#ef4444" }}>
                  <Trash2 size={13} />
                </button>
              </div>
            )}
            <input ref={backgroundFileRef} type="file" accept="image/*" className="hidden" onChange={handleBackgroundFile} />
            <button onClick={() => backgroundFileRef.current?.click()}
              className="w-full py-2 text-xs flex items-center justify-center gap-2"
              style={{ border: "1px solid rgba(0,229,255,0.1)", color: "#5e7499", borderRadius: "2px", fontFamily: "'DM Mono', monospace" }}>
              <ImageIcon size={12} /> {draft.backgroundImage ? "Change Background" : "Upload Background"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function AdminSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h2 className="text-2xl font-black mb-6" style={{ fontFamily: "'Barlow Condensed', sans-serif", color: "#dce6f5" }}>
        {title.toUpperCase()}
      </h2>
      {children}
    </div>
  );
}

function AdminField({ label, value, onChange, multiline = false }: { label: string; value: string; onChange: (v: string) => void; multiline?: boolean }) {
  const shared = {
    style: {
      background: "#111c30",
      border: "1px solid rgba(0,229,255,0.1)",
      borderRadius: "2px",
      color: "#dce6f5",
      fontFamily: "'Inter', sans-serif",
      fontSize: "14px",
      width: "100%",
      padding: "10px 14px",
      outline: "none",
      marginBottom: "12px",
    } as React.CSSProperties,
  };
  return (
    <div>
      <label className="block text-xs mb-1.5 tracking-widest uppercase" style={{ fontFamily: "'DM Mono', monospace", color: "#3d6680" }}>
        {label}
      </label>
      {multiline ? (
        <textarea rows={3} value={value} onChange={(e) => onChange(e.target.value)} {...shared} />
      ) : (
        <input type="text" value={value} onChange={(e) => onChange(e.target.value)} {...shared} />
      )}
    </div>
  );
}

// ─── Public Site Components ───────────────────────────────────────────────────

function NavBar({ onAdminClick, content, onTutorialClick }: { onAdminClick: () => void; content: any; onTutorialClick?: () => void }) {
  const [open, setOpen] = useState(false);
  const scrollY = useScrollY();
  const scrolled = scrollY > 40;

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
      style={{
        background: scrolled ? "rgba(7,11,19,0.95)" : "transparent",
        backdropFilter: scrolled ? "blur(12px)" : "none",
        borderBottom: scrolled ? "1px solid rgba(0,229,255,0.08)" : "none",
      }}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8 flex items-center justify-between py-4">
        <a href="#" className="flex items-center gap-2">
          {content.logo ? (
            <img src={content.logo} alt="ZyTech Insight Logo" className="h-10 w-auto object-contain" />
          ) : (
            <div className="w-8 h-8 relative">
              <div className="absolute inset-0 rounded-sm" style={{ background: "#00e5ff", opacity: 0.15 }} />
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-xs font-black" style={{ fontFamily: "'Barlow Condensed', sans-serif", color: "#00e5ff" }}>ZIF</span>
              </div>
            </div>
          )}
          <span className="text-lg font-bold" style={{ fontFamily: "'Barlow', sans-serif", color: "#dce6f5" }}>
            ZyTech<span style={{ color: "#00e5ff" }}>Insight</span>
          </span>
        </a>

        <div className="hidden md:flex items-center gap-6">
          {NAV_LINKS.map((l) => (
            l.id === "tutorials" ? (
              <button key={l.label} onClick={onTutorialClick} className="text-sm font-medium transition-colors duration-200"
                style={{ fontFamily: "'Inter', sans-serif", color: "#5e7499", background: "transparent", border: "none", cursor: "pointer" }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "#dce6f5")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "#5e7499")}>
                {l.label}
              </button>
            ) : (
              <a key={l.label} href={l.href} className="text-sm font-medium transition-colors duration-200"
                style={{ fontFamily: "'Inter', sans-serif", color: "#5e7499" }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "#dce6f5")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "#5e7499")}>
                {l.label}
              </a>
            )
          ))}
          {/* Google Custom Search */}
          <div className="gcse-search" style={{ width: "200px" }}></div>
          <a href="#contact" className="px-5 py-2 text-sm font-semibold transition-all duration-200"
            style={{ background: "#00e5ff", color: "#070b13", borderRadius: "2px", fontFamily: "'Barlow', sans-serif" }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = "#33ecff"; }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = "#00e5ff"; }}>
            Start a Project
          </a>
          <button onClick={onAdminClick} className="p-2 transition-colors duration-200"
            style={{ color: "#1e3a52" }}
            title="Admin Panel"
            onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = "#00e5ff"; }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = "#1e3a52"; }}>
            <Settings size={16} />
          </button>
        </div>

        <button className="md:hidden p-2" style={{ color: "#dce6f5" }} onClick={() => setOpen(!open)}>
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {open && (
        <div className="md:hidden px-6 pb-6 pt-2 flex flex-col gap-4"
          style={{ background: "rgba(7,11,19,0.98)", borderTop: "1px solid rgba(0,229,255,0.08)" }}>
          {NAV_LINKS.map((l) => (
            l.id === "tutorials" ? (
              <button key={l.label} onClick={() => { onTutorialClick?.(); setOpen(false); }} className="text-base font-medium py-1 text-left"
                style={{ fontFamily: "'Inter', sans-serif", color: "#dce6f5", background: "transparent", border: "none", cursor: "pointer" }}>
                {l.label}
              </button>
            ) : (
              <a key={l.label} href={l.href} className="text-base font-medium py-1"
                style={{ fontFamily: "'Inter', sans-serif", color: "#dce6f5" }}
                onClick={() => setOpen(false)}>{l.label}</a>
            )
          ))}
          <a href="#contact" className="text-center px-5 py-3 text-sm font-semibold mt-2"
            style={{ background: "#00e5ff", color: "#070b13", borderRadius: "2px", fontFamily: "'Barlow', sans-serif" }}
            onClick={() => setOpen(false)}>
            Start a Project
          </a>
          <button onClick={() => { onAdminClick(); setOpen(false); }} className="flex items-center gap-2 text-sm py-1"
            style={{ color: "#3d5166", fontFamily: "'DM Mono', monospace" }}>
            <Settings size={14} /> Admin Panel
          </button>
        </div>
      )}
    </nav>
  );
}

function Hero({ content }: { content: Content }) {
  const { hero, stats } = content;
  return (
    <section className="relative min-h-screen flex flex-col justify-center overflow-hidden" style={{ background: "#070b13" }}>
      <div className="absolute inset-0 pointer-events-none"
        style={{ backgroundImage: "linear-gradient(rgba(0,229,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(0,229,255,0.03) 1px, transparent 1px)", backgroundSize: "60px 60px" }} />
      <div className="absolute pointer-events-none"
        style={{ top: "15%", left: "5%", width: "600px", height: "600px", background: "radial-gradient(circle, rgba(0,229,255,0.06) 0%, transparent 70%)", borderRadius: "50%" }} />
      <div className="absolute pointer-events-none"
        style={{ bottom: "10%", right: "5%", width: "500px", height: "500px", background: "radial-gradient(circle, rgba(245,158,11,0.05) 0%, transparent 70%)", borderRadius: "50%" }} />

      <div className="relative max-w-7xl mx-auto px-6 lg:px-8 pt-32 pb-20">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 text-xs font-medium mb-8 tracking-widest uppercase"
              style={{ fontFamily: "'DM Mono', monospace", color: "#00e5ff", border: "1px solid rgba(0,229,255,0.25)", borderRadius: "2px", background: "rgba(0,229,255,0.05)" }}>
              <Zap size={11} /> {hero.tagline}
            </div>
            <h1 className="text-5xl lg:text-7xl font-black leading-none mb-6 tracking-tight"
              style={{ fontFamily: "'Barlow Condensed', sans-serif", color: "#dce6f5" }}>
              {hero.headline1}<br />
              <span style={{ color: "#00e5ff" }}>{hero.headline2}</span><br />
              {hero.headline3}
            </h1>
            <p className="text-lg leading-relaxed mb-10 max-w-lg"
              style={{ fontFamily: "'Inter', sans-serif", color: "#5e7499" }}>
              {hero.subtext}
            </p>
            <div className="flex flex-wrap gap-4">
              <a href="#services" className="inline-flex items-center gap-2 px-7 py-3.5 text-sm font-bold transition-all duration-200"
                style={{ background: "#00e5ff", color: "#070b13", fontFamily: "'Barlow', sans-serif", borderRadius: "2px" }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = "#33ecff"; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = "#00e5ff"; }}>
                Explore Services <ArrowRight size={16} />
              </a>
              <a href="#portfolio" className="inline-flex items-center gap-2 px-7 py-3.5 text-sm font-bold transition-all duration-200"
                style={{ border: "1px solid rgba(0,229,255,0.3)", color: "#dce6f5", fontFamily: "'Barlow', sans-serif", borderRadius: "2px" }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.borderColor = "#00e5ff"; (e.currentTarget as HTMLElement).style.color = "#00e5ff"; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.borderColor = "rgba(0,229,255,0.3)"; (e.currentTarget as HTMLElement).style.color = "#dce6f5"; }}>
                View Our Work
              </a>
            </div>
          </div>

          {/* Code card */}
          <div className="hidden lg:block">
            <div className="relative rounded-sm overflow-hidden" style={{ border: "1px solid rgba(0,229,255,0.12)", background: "#0d1525" }}>
              <div className="flex items-center gap-2 px-4 py-3" style={{ borderBottom: "1px solid rgba(0,229,255,0.08)", background: "#080e1c" }}>
                <div className="w-3 h-3 rounded-full" style={{ background: "#ef4444", opacity: 0.7 }} />
                <div className="w-3 h-3 rounded-full" style={{ background: "#f59e0b", opacity: 0.7 }} />
                <div className="w-3 h-3 rounded-full" style={{ background: "#34d399", opacity: 0.7 }} />
                <span className="ml-2 text-xs" style={{ fontFamily: "'DM Mono', monospace", color: "#3d5166" }}>zif-engine/src/core.ts</span>
              </div>
              <div className="p-6 space-y-1" style={{ fontFamily: "'DM Mono', monospace", fontSize: "13px" }}>
                {[
                  { n: "01", c: <><span style={{color:"#a78bfa"}}>interface</span> <span style={{color:"#00e5ff"}}>SolutionConfig</span> {"{"}</> },
                  { n: "02", c: <>&nbsp;&nbsp;<span style={{color:"#5e7499"}}>scale</span>: <span style={{color:"#f59e0b"}}>"enterprise"</span>;</> },
                  { n: "03", c: <>&nbsp;&nbsp;<span style={{color:"#5e7499"}}>stack</span>: <span style={{color:"#00e5ff"}}>TechStack</span>[];</> },
                  { n: "04", c: <>&nbsp;&nbsp;<span style={{color:"#5e7499"}}>ai</span>?: <span style={{color:"#34d399"}}>boolean</span>;</> },
                  { n: "05", c: <>&nbsp;&nbsp;<span style={{color:"#5e7499"}}>deadline</span>: <span style={{color:"#00e5ff"}}>ISODate</span>;</> },
                  { n: "06", c: <span style={{color:"#dce6f5"}}>{"}"}</span> },
                  { n: "07", c: <span style={{color:"#3d5166"}}>&nbsp;</span> },
                  { n: "08", c: <><span style={{color:"#a78bfa"}}>async function</span> <span style={{color:"#00e5ff"}}>buildSolution</span><span style={{color:"#dce6f5"}}>(</span></> },
                  { n: "09", c: <>&nbsp;&nbsp;<span style={{color:"#5e7499"}}>config</span>: <span style={{color:"#00e5ff"}}>SolutionConfig</span></> },
                  { n: "10", c: <span style={{color:"#dce6f5"}}>{") {"}</span> },
                  { n: "11", c: <>&nbsp;&nbsp;<span style={{color:"#a78bfa"}}>return</span> <span style={{color:"#00e5ff"}}>ZIF</span><span style={{color:"#dce6f5"}}>.deploy(config);</span></> },
                  { n: "12", c: <><span style={{color:"#dce6f5"}}>{"}"}</span> <span style={{color:"#3d5166"}}>// ships on time.</span></> },
                ].map((line) => (
                  <div key={line.n} className="flex items-start gap-4">
                    <span className="select-none w-6 text-right shrink-0" style={{ color: "#1e3a52" }}>{line.n}</span>
                    <span>{line.c}</span>
                  </div>
                ))}
                <div className="mt-4 flex items-center">
                  <div className="w-2 h-5" style={{ background: "#00e5ff", animation: "blink 1.2s step-end infinite" }} />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="mt-20 grid grid-cols-2 lg:grid-cols-4 gap-px"
          style={{ border: "1px solid rgba(0,229,255,0.08)", borderRadius: "2px", background: "rgba(0,229,255,0.08)" }}>
          {stats.map((s) => (
            <div key={s.label} className="px-8 py-7" style={{ background: "#070b13" }}>
              <div className="text-4xl font-black mb-1" style={{ fontFamily: "'Barlow Condensed', sans-serif", color: "#00e5ff" }}>{s.value}</div>
              <div className="text-sm" style={{ fontFamily: "'Inter', sans-serif", color: "#5e7499" }}>{s.label}</div>
            </div>
          ))}
        </div>

        <div className="flex justify-center mt-12">
          <a href="#services" style={{ color: "#3d5166" }}><ChevronDown size={20} className="animate-bounce" /></a>
        </div>
      </div>
      <style>{`@keyframes blink { 0%, 100% { opacity: 1; } 50% { opacity: 0; } }`}</style>
    </section>
  );
}

function Services({ content }: { content: Content }) {
  const [hovered, setHovered] = useState<number | null>(null);
  return (
    <section id="services" className="py-28" style={{ background: "#070b13" }}>
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="mb-16">
          <div className="text-xs tracking-widest uppercase mb-4" style={{ fontFamily: "'DM Mono', monospace", color: "#00e5ff" }}>What We Build</div>
          <h2 className="text-4xl lg:text-6xl font-black leading-none mb-6" style={{ fontFamily: "'Barlow Condensed', sans-serif", color: "#dce6f5" }}>
            SERVICES THAT<br />MOVE THE NEEDLE.
          </h2>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-px" style={{ background: "rgba(0,229,255,0.06)" }}>
          {content.services.map((s, i) => {
            const Icon = ICON_MAP[s.icon] ?? Code2;
            return (
              <div key={i} className="p-8 transition-all duration-300"
                style={{ background: hovered === i ? "#0d1525" : "#070b13" }}
                onMouseEnter={() => setHovered(i)} onMouseLeave={() => setHovered(null)}>
                <div className="w-11 h-11 flex items-center justify-center mb-6 transition-all duration-300"
                  style={{ background: hovered === i ? "rgba(0,229,255,0.12)" : "rgba(0,229,255,0.06)", borderRadius: "2px" }}>
                  <Icon size={20} style={{ color: "#00e5ff" }} />
                </div>
                <h3 className="text-lg font-bold mb-3" style={{ fontFamily: "'Barlow', sans-serif", color: hovered === i ? "#dce6f5" : "#a0b4c8" }}>{s.title}</h3>
                <p className="text-sm leading-relaxed mb-5" style={{ fontFamily: "'Inter', sans-serif", color: "#5e7499" }}>{s.desc}</p>
                <div className="flex flex-wrap gap-2">
                  {s.tags.map((t) => (
                    <span key={t} className="text-xs px-2 py-1"
                      style={{ fontFamily: "'DM Mono', monospace", color: "#3d6680", border: "1px solid rgba(0,229,255,0.1)", borderRadius: "2px", background: "rgba(0,229,255,0.03)" }}>
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function About({ content }: { content: Content }) {
  return (
    <section id="about" className="py-28" style={{ background: "#0a0f1c" }}>
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-20 items-center">
          <div>
            <div className="text-xs tracking-widest uppercase mb-4" style={{ fontFamily: "'DM Mono', monospace", color: "#00e5ff" }}>About ZIF</div>
            <h2 className="text-4xl lg:text-5xl font-black leading-none mb-8" style={{ fontFamily: "'Barlow Condensed', sans-serif", color: "#dce6f5" }}>
              WE DON'T JUST<br />WRITE CODE.<br /><span style={{ color: "#00e5ff" }}>WE SOLVE PROBLEMS.</span>
            </h2>
            <p className="text-base leading-relaxed mb-6" style={{ fontFamily: "'Inter', sans-serif", color: "#5e7499" }}>{content.about.body1}</p>
            <p className="text-base leading-relaxed mb-10" style={{ fontFamily: "'Inter', sans-serif", color: "#5e7499" }}>{content.about.body2}</p>
            <div className="space-y-3">
              {["Transparent scoping and milestone tracking", "Dedicated engineers, not rotating contractors", "Architecture reviews before every sprint", "Post-launch support and knowledge transfer"].map((item) => (
                <div key={item} className="flex items-start gap-3">
                  <CheckCircle size={16} className="shrink-0 mt-0.5" style={{ color: "#00e5ff" }} />
                  <span className="text-sm" style={{ fontFamily: "'Inter', sans-serif", color: "#a0b4c8" }}>{item}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="relative">
            <div className="rounded-sm overflow-hidden aspect-[4/5]" style={{ border: "1px solid rgba(0,229,255,0.1)" }}>
              <img src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&h=1000&fit=crop&auto=format"
                alt="ZIF engineering team collaborating" className="w-full h-full object-cover"
                style={{ filter: "brightness(0.7) saturate(0.8)" }} />
              <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(7,11,19,0.9) 0%, transparent 60%)" }} />
              <div className="absolute bottom-6 left-6 right-6">
                <div className="text-xs tracking-widest mb-1" style={{ fontFamily: "'DM Mono', monospace", color: "#00e5ff" }}>ZIF HEADQUARTERS</div>
                <div className="text-lg font-bold" style={{ fontFamily: "'Barlow', sans-serif", color: "#dce6f5" }}>40+ Engineers. One Standard.</div>
              </div>
            </div>
            <div className="absolute -right-6 top-12 px-5 py-4 hidden lg:block"
              style={{ background: "#0d1525", border: "1px solid rgba(0,229,255,0.15)", borderRadius: "2px" }}>
              <div className="text-3xl font-black" style={{ fontFamily: "'Barlow Condensed', sans-serif", color: "#f59e0b" }}>8 YRS</div>
              <div className="text-xs" style={{ fontFamily: "'DM Mono', monospace", color: "#5e7499" }}>of shipping</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Portfolio({ projects, onProjectClick }: { projects: Project[]; onProjectClick: (p: Project) => void }) {
  const [active, setActive] = useState(0);
  return (
    <section id="portfolio" className="py-28" style={{ background: "#070b13" }}>
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="mb-16">
          <div className="text-xs tracking-widest uppercase mb-4" style={{ fontFamily: "'DM Mono', monospace", color: "#00e5ff" }}>Selected Work</div>
          <h2 className="text-4xl lg:text-6xl font-black leading-none" style={{ fontFamily: "'Barlow Condensed', sans-serif", color: "#dce6f5" }}>
            BUILT BY ZIF.<br /><span style={{ color: "#00e5ff" }}>RUNNING IN PRODUCTION.</span>
          </h2>
        </div>
        <div className="grid lg:grid-cols-3 gap-px" style={{ background: "rgba(0,229,255,0.06)" }}>
          {projects.map((p, i) => (
            <div key={p.id} className="group relative overflow-hidden cursor-pointer" style={{ background: "#070b13", minHeight: "400px" }} onMouseEnter={() => setActive(i)} onClick={() => onProjectClick(p)}>
              <img src={p.image.startsWith("data:") ? p.image : `https://images.unsplash.com/${p.image}?w=600&h=500&fit=crop&auto=format`} alt={p.title}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                style={{ filter: "brightness(0.25) saturate(0.5)" }} />
              <div className="absolute inset-0 transition-opacity duration-500"
                style={{ background: `linear-gradient(to top, ${p.color}22 0%, transparent 60%)`, opacity: active === i ? 1 : 0 }} />
              {/* Demo Badge */}
              {p.demoUrl && (
                <div className="absolute top-6 left-6 z-10">
                  <span className="text-xs px-3 py-1 font-bold"
                    style={{ fontFamily: "'DM Mono', monospace", color: "#070b13", background: "#00e5ff", borderRadius: "2px" }}>
                    LIVE DEMO
                  </span>
                </div>
              )}
              <div className="relative p-8 h-full flex flex-col justify-end" style={{ minHeight: "400px" }}>
                <div className="text-xs tracking-widest mb-3" style={{ fontFamily: "'DM Mono', monospace", color: p.color, opacity: 0.8 }}>{p.category}</div>
                <h3 className="text-2xl font-black mb-3" style={{ fontFamily: "'Barlow Condensed', sans-serif", color: "#dce6f5" }}>{p.title}</h3>
                <p className="text-sm leading-relaxed mb-5" style={{ fontFamily: "'Inter', sans-serif", color: "#7a92a8" }}>{p.desc}</p>
                <div className="flex flex-wrap gap-2">
                  {p.tech.map((t) => (
                    <span key={t} className="text-xs px-2 py-1"
                      style={{ fontFamily: "'DM Mono', monospace", color: p.color, border: `1px solid ${p.color}33`, borderRadius: "2px", background: `${p.color}0a` }}>{t}</span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-10 flex justify-center">
          <a href="#contact" className="inline-flex items-center gap-2 px-8 py-3.5 text-sm font-bold transition-all duration-200"
            style={{ border: "1px solid rgba(0,229,255,0.2)", color: "#00e5ff", fontFamily: "'Barlow', sans-serif", borderRadius: "2px" }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = "rgba(0,229,255,0.08)"; }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = "transparent"; }}>
            Discuss Your Project <ArrowRight size={16} />
          </a>
        </div>
      </div>
    </section>
  );
}

function TechStack() {
  return (
    <section id="tech" className="py-28 overflow-hidden" style={{ background: "#0a0f1c" }}>
      <div className="max-w-7xl mx-auto px-6 lg:px-8 mb-16">
        <div className="text-xs tracking-widest uppercase mb-4" style={{ fontFamily: "'DM Mono', monospace", color: "#00e5ff" }}>Technology</div>
        <h2 className="text-4xl lg:text-6xl font-black leading-none" style={{ fontFamily: "'Barlow Condensed', sans-serif", color: "#dce6f5" }}>
          THE STACK WE<br />TRUST IN PRODUCTION.
        </h2>
      </div>
      <div className="relative">
        <div className="absolute left-0 top-0 bottom-0 w-24 z-10 pointer-events-none" style={{ background: "linear-gradient(to right, #0a0f1c, transparent)" }} />
        <div className="absolute right-0 top-0 bottom-0 w-24 z-10 pointer-events-none" style={{ background: "linear-gradient(to left, #0a0f1c, transparent)" }} />
        <div className="flex gap-4 py-4" style={{ animation: "scrollTech 30s linear infinite", width: "max-content" }}>
          {[...TECH_STACK, ...TECH_STACK].map((t, i) => (
            <div key={`${t}-${i}`} className="px-5 py-3 whitespace-nowrap text-sm"
              style={{ fontFamily: "'DM Mono', monospace", color: "#3d6680", border: "1px solid rgba(0,229,255,0.08)", borderRadius: "2px", background: "#0d1525" }}>
              {t}
            </div>
          ))}
        </div>
      </div>
      <style>{`@keyframes scrollTech { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }`}</style>
    </section>
  );
}

function Testimonials({ content, userTestimonials, submitTestimonial }: { content: Content; userTestimonials: UserTestimonial[]; submitTestimonial: (t: Omit<UserTestimonial, "id" | "approved" | "createdAt">) => void }) {
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "", title: "", quote: "", rating: 5 });
  const [submitted, setSubmitted] = useState(false);

  const allTestimonials = [
    ...content.testimonials.map(t => ({ ...t, isDefault: true })),
    ...userTestimonials.filter(t => t.approved).map(t => ({ ...t, isDefault: false }))
  ];

  return (
    <section className="py-28" style={{ background: "#070b13" }}>
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="mb-16 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <div className="text-xs tracking-widest uppercase mb-4" style={{ fontFamily: "'DM Mono', monospace", color: "#00e5ff" }}>Client Voices</div>
            <h2 className="text-4xl lg:text-5xl font-black leading-none" style={{ fontFamily: "'Barlow Condensed', sans-serif", color: "#dce6f5" }}>
              WHAT TEAMS SAY<br />AFTER WE SHIP.
            </h2>
          </div>
          <button onClick={() => setShowForm(!showForm)}
            className="px-6 py-3 text-sm font-bold transition-all duration-200"
            style={{ background: "transparent", color: "#00e5ff", border: "1px solid rgba(0,229,255,0.2)", borderRadius: "2px", fontFamily: "'Barlow', sans-serif" }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = "rgba(0,229,255,0.08)"; }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = "transparent"; }}>
            {showForm ? "Hide Form" : "Submit Testimonial"}
          </button>
        </div>

        {showForm && (
          <div className="mb-12 p-8" style={{ background: "#0d1525", border: "1px solid rgba(0,229,255,0.08)", borderRadius: "2px" }}>
            {submitted ? (
              <div className="text-center py-8">
                <CheckCircle size={48} style={{ color: "#00e5ff", marginBottom: "20px" }} />
                <h3 className="text-2xl font-black mb-3" style={{ fontFamily: "'Barlow Condensed', sans-serif", color: "#dce6f5" }}>THANK YOU!</h3>
                <p style={{ fontFamily: "'Inter', sans-serif", color: "#5e7499", fontSize: "16px" }}>
                  Your testimonial has been submitted for review.
                </p>
              </div>
            ) : (
              <form onSubmit={(e) => {
                e.preventDefault();
                submitTestimonial(formData);
                setSubmitted(true);
                setTimeout(() => { setSubmitted(false); setShowForm(false); setFormData({ name: "", email: "", title: "", quote: "", rating: 5 }); }, 3000);
              }} className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs mb-2 tracking-wider uppercase" style={{ fontFamily: "'DM Mono', monospace", color: "#3d6680" }}>Your Name</label>
                  <input type="text" required placeholder="John Doe"
                    value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-3 text-sm outline-none"
                    style={{ background: "#111c30", border: "1px solid rgba(0,229,255,0.1)", borderRadius: "2px", color: "#dce6f5", fontFamily: "'Inter', sans-serif" }} />
                </div>
                <div>
                  <label className="block text-xs mb-2 tracking-wider uppercase" style={{ fontFamily: "'DM Mono', monospace", color: "#3d6680" }}>Your Email</label>
                  <input type="email" required placeholder="john@example.com"
                    value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-3 text-sm outline-none"
                    style={{ background: "#111c30", border: "1px solid rgba(0,229,255,0.1)", borderRadius: "2px", color: "#dce6f5", fontFamily: "'Inter', sans-serif" }} />
                </div>
                <div>
                  <label className="block text-xs mb-2 tracking-wider uppercase" style={{ fontFamily: "'DM Mono', monospace", color: "#3d6680" }}>Your Title / Company</label>
                  <input type="text" required placeholder="CEO, TechCorp"
                    value={formData.title} onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    className="w-full px-4 py-3 text-sm outline-none"
                    style={{ background: "#111c30", border: "1px solid rgba(0,229,255,0.1)", borderRadius: "2px", color: "#dce6f5", fontFamily: "'Inter', sans-serif" }} />
                </div>
                <div>
                  <label className="block text-xs mb-2 tracking-wider uppercase" style={{ fontFamily: "'DM Mono', monospace", color: "#3d6680" }}>Rating</label>
                  <div className="flex gap-2">
                    {[1,2,3,4,5].map(n => (
                      <button key={n} type="button" onClick={() => setFormData({ ...formData, rating: n })}
                        style={{ background: "transparent", border: "none", cursor: "pointer" }}>
                        <Star size={24} style={{ color: n <= formData.rating ? "#f59e0b" : "#1e3a52", fill: n <= formData.rating ? "#f59e0b" : "transparent" }} />
                      </button>
                    ))}
                  </div>
                </div>
                <div className="md:col-span-2">
                  <label className="block text-xs mb-2 tracking-wider uppercase" style={{ fontFamily: "'DM Mono', monospace", color: "#3d6680" }}>Your Testimonial</label>
                  <textarea required rows={4} placeholder="Share your experience working with ZyTech Insight..."
                    value={formData.quote} onChange={(e) => setFormData({ ...formData, quote: e.target.value })}
                    className="w-full px-4 py-3 text-sm outline-none resize-none"
                    style={{ background: "#111c30", border: "1px solid rgba(0,229,255,0.1)", borderRadius: "2px", color: "#dce6f5", fontFamily: "'Inter', sans-serif" }} />
                </div>
                <div className="md:col-span-2">
                  <button type="submit"
                    className="w-full py-4 text-sm font-bold tracking-wider"
                    style={{ background: "#00e5ff", color: "#070b13", fontFamily: "'Barlow', sans-serif", borderRadius: "2px" }}>
                    SUBMIT TESTIMONIAL →
                  </button>
                </div>
              </form>
            )}
          </div>
        )}

        <div className="grid md:grid-cols-3 gap-px" style={{ background: "rgba(0,229,255,0.06)" }}>
          {allTestimonials.map((t, i) => (
            <div key={i} className="p-8 flex flex-col justify-between" style={{ background: "#070b13" }}>
              <div>
                <div className="flex gap-1 mb-6">
                  {Array.from({ length: t.rating }).map((_, j) => (
                    <Star key={j} size={14} style={{ color: "#f59e0b", fill: "#f59e0b" }} />
                  ))}
                </div>
                <blockquote className="text-base leading-relaxed mb-8"
                  style={{ fontFamily: "'Inter', sans-serif", color: "#a0b4c8", fontStyle: "italic" }}>
                  "{t.quote}"
                </blockquote>
              </div>
              <div>
                <div className="font-bold text-sm" style={{ fontFamily: "'Barlow', sans-serif", color: "#dce6f5" }}>{t.name}</div>
                <div className="text-xs mt-1" style={{ fontFamily: "'DM Mono', monospace", color: "#3d6680" }}>{t.title}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Tutorial({ onRegister }: { onRegister: (data: Omit<TutorialUser, "id" | "registeredAt">) => void }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [registered, setRegistered] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onRegister({ name, email });
    setRegistered(true);
    setTimeout(() => setRegistered(false), 3000);
    setName("");
    setEmail("");
  };

  return (
    <section className="py-32" style={{ background: "#070b13" }}>
      <div className="max-w-6xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="text-xs tracking-widest uppercase mb-4" style={{ fontFamily: "'DM Mono', monospace", color: "#00e5ff" }}>
            LEARN WITH US
          </div>
          <h2 className="text-4xl lg:text-6xl font-black mb-6" style={{ fontFamily: "'Barlow Condensed', sans-serif", color: "#dce6f5" }}>
            FREE TUTORIALS FOR DEVELOPERS
          </h2>
          <p className="text-lg max-w-2xl mx-auto" style={{ fontFamily: "'Inter', sans-serif", color: "#5e7499" }}>
            Register to access our collection of free tutorials on web development, cloud computing, AI, and more.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          <div className="space-y-6">
            <div className="p-8" style={{ background: "#0d1525", border: "1px solid rgba(0,229,255,0.08)", borderRadius: "2px" }}>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 flex items-center justify-center" style={{ background: "rgba(0,229,255,0.1)", borderRadius: "2px" }}>
                  <Code2 size={20} style={{ color: "#00e5ff" }} />
                </div>
                <h3 className="text-xl font-bold" style={{ fontFamily: "'Barlow', sans-serif", color: "#dce6f5" }}>
                  Introduction to React
                </h3>
              </div>
              <p className="text-sm" style={{ fontFamily: "'Inter', sans-serif", color: "#5e7499" }}>
                Learn the fundamentals of React, including components, state, props, and hooks.
              </p>
            </div>

            <div className="p-8" style={{ background: "#0d1525", border: "1px solid rgba(0,229,255,0.08)", borderRadius: "2px" }}>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 flex items-center justify-center" style={{ background: "rgba(245,158,11,0.1)", borderRadius: "2px" }}>
                  <Cloud size={20} style={{ color: "#f59e0b" }} />
                </div>
                <h3 className="text-xl font-bold" style={{ fontFamily: "'Barlow', sans-serif", color: "#dce6f5" }}>
                  AWS Fundamentals
                </h3>
              </div>
              <p className="text-sm" style={{ fontFamily: "'Inter', sans-serif", color: "#5e7499" }}>
                Get started with Amazon Web Services, from S3 to EC2 to Lambda.
              </p>
            </div>

            <div className="p-8" style={{ background: "#0d1525", border: "1px solid rgba(0,229,255,0.08)", borderRadius: "2px" }}>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 flex items-center justify-center" style={{ background: "rgba(167,139,250,0.1)", borderRadius: "2px" }}>
                  <Brain size={20} style={{ color: "#a78bfa" }} />
                </div>
                <h3 className="text-xl font-bold" style={{ fontFamily: "'Barlow', sans-serif", color: "#dce6f5" }}>
                  Getting Started with AI
                </h3>
              </div>
              <p className="text-sm" style={{ fontFamily: "'Inter', sans-serif", color: "#5e7499" }}>
                An introduction to artificial intelligence, machine learning, and how to get started.
              </p>
            </div>
          </div>

          <div className="p-8" style={{ background: "#0d1525", border: "1px solid rgba(0,229,255,0.08)", borderRadius: "2px" }}>
            <h3 className="text-2xl font-black mb-6" style={{ fontFamily: "'Barlow Condensed', sans-serif", color: "#dce6f5" }}>
              REGISTER NOW
            </h3>
            {registered ? (
              <div className="text-center py-8">
                <CheckCircle size={48} style={{ color: "#00e5ff", marginBottom: "20px" }} />
                <h4 className="text-xl font-black mb-3" style={{ fontFamily: "'Barlow Condensed', sans-serif", color: "#dce6f5" }}>
                  SUCCESSFULLY REGISTERED!
                </h4>
                <p style={{ fontFamily: "'Inter', sans-serif", color: "#5e7499" }}>
                  Check your email for access links to our tutorials.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs mb-2 tracking-wider uppercase" style={{ fontFamily: "'DM Mono', monospace", color: "#3d6680" }}>
                    YOUR NAME
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="John Doe"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-4 py-3 text-sm outline-none"
                    style={{ background: "#111c30", border: "1px solid rgba(0,229,255,0.1)", borderRadius: "2px", color: "#dce6f5", fontFamily: "'Inter', sans-serif" }}
                  />
                </div>
                <div>
                  <label className="block text-xs mb-2 tracking-wider uppercase" style={{ fontFamily: "'DM Mono', monospace", color: "#3d6680" }}>
                    YOUR EMAIL
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="john@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-4 py-3 text-sm outline-none"
                    style={{ background: "#111c30", border: "1px solid rgba(0,229,255,0.1)", borderRadius: "2px", color: "#dce6f5", fontFamily: "'Inter', sans-serif" }}
                  />
                </div>
                <button
                  type="submit"
                  className="w-full py-4 text-sm font-bold tracking-wider"
                  style={{ background: "#00e5ff", color: "#070b13", fontFamily: "'Barlow', sans-serif", borderRadius: "2px" }}
                >
                  GET ACCESS →
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

function Contact({ content, onSendMessage }: { content: Content; onSendMessage: (data: Omit<Message, "id" | "createdAt" | "read">) => void }) {
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", company: "", message: "" });
  const { contact } = content;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSendMessage(form);
    setSent(true);
    setTimeout(() => setSent(false), 3000);
    setForm({ name: "", email: "", company: "", message: "" });
  };

  return (
    <section id="contact" className="py-28" style={{ background: "#0a0f1c" }}>
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-20">
          <div>
            <div className="text-xs tracking-widest uppercase mb-4" style={{ fontFamily: "'DM Mono', monospace", color: "#00e5ff" }}>Start a Project</div>
            <h2 className="text-4xl lg:text-5xl font-black leading-none mb-8" style={{ fontFamily: "'Barlow Condensed', sans-serif", color: "#dce6f5" }}>
              LET'S BUILD<br />SOMETHING<br /><span style={{ color: "#00e5ff" }}>REMARKABLE.</span>
            </h2>
            <p className="text-base leading-relaxed mb-12" style={{ fontFamily: "'Inter', sans-serif", color: "#5e7499" }}>
              Tell us about your project. We'll respond within 24 hours with an honest assessment — no sales pitch, no fluff.
            </p>
            <div className="space-y-5">
              <a href={`mailto:${contact.email}`} className="flex items-center gap-4 group">
                <div className="w-9 h-9 flex items-center justify-center shrink-0"
                  style={{ background: "rgba(0,229,255,0.06)", borderRadius: "2px", border: "1px solid rgba(0,229,255,0.1)" }}>
                  <Mail size={15} style={{ color: "#00e5ff" }} />
                </div>
                <span className="text-sm transition-colors duration-200"
                  style={{ fontFamily: "'Inter', sans-serif", color: "#a0b4c8" }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = "#00e5ff")}
                  onMouseLeave={(e) => (e.currentTarget.style.color = "#a0b4c8")}>
                  {contact.email}
                </span>
              </a>

              {[contact.whatsapp1, contact.whatsapp2].filter(Boolean).map((num) => (
                <a key={num} href={`https://wa.me/${num.replace(/\D/g, "")}`} target="_blank" rel="noreferrer" className="flex items-center gap-4">
                  <div className="w-9 h-9 flex items-center justify-center shrink-0"
                    style={{ background: "rgba(0,229,255,0.06)", borderRadius: "2px", border: "1px solid rgba(0,229,255,0.1)" }}>
                    <MessageCircle size={15} style={{ color: "#00e5ff" }} />
                  </div>
                  <span className="text-sm transition-colors duration-200"
                    style={{ fontFamily: "'Inter', sans-serif", color: "#a0b4c8" }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = "#00e5ff")}
                    onMouseLeave={(e) => (e.currentTarget.style.color = "#a0b4c8")}>
                    WhatsApp: {num}
                  </span>
                </a>
              ))}

              <div className="flex items-center gap-4">
                <div className="w-9 h-9 flex items-center justify-center shrink-0"
                  style={{ background: "rgba(0,229,255,0.06)", borderRadius: "2px", border: "1px solid rgba(0,229,255,0.1)" }}>
                  <MapPin size={15} style={{ color: "#00e5ff" }} />
                </div>
                <span className="text-sm" style={{ fontFamily: "'Inter', sans-serif", color: "#a0b4c8" }}>{contact.location}</span>
              </div>
            </div>
          </div>

          <div>
            {sent ? (
              <div className="h-full flex flex-col items-center justify-center text-center p-12"
                style={{ border: "1px solid rgba(0,229,255,0.12)", borderRadius: "2px", background: "#0d1525" }}>
                <CheckCircle size={48} style={{ color: "#00e5ff", marginBottom: "20px" }} />
                <h3 className="text-2xl font-black mb-3" style={{ fontFamily: "'Barlow Condensed', sans-serif", color: "#dce6f5" }}>MESSAGE RECEIVED</h3>
                <p style={{ fontFamily: "'Inter', sans-serif", color: "#5e7499", fontSize: "14px" }}>
                  We'll review your project details and get back to you within 24 hours.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                {[
                  { field: "name", placeholder: "Your name", label: "Name", type: "text", req: true },
                  { field: "email", placeholder: "your@email.com", label: "Email", type: "email", req: true },
                  { field: "company", placeholder: "Company / Project", label: "Company", type: "text", req: false },
                ].map(({ field, placeholder, label, type, req }) => (
                  <div key={field}>
                    <label className="block text-xs mb-2 tracking-wider uppercase" style={{ fontFamily: "'DM Mono', monospace", color: "#3d6680" }}>{label}</label>
                    <input type={type} required={req} placeholder={placeholder}
                      value={form[field as keyof typeof form]}
                      onChange={(e) => setForm({ ...form, [field]: e.target.value })}
                      className="w-full px-4 py-3 text-sm outline-none transition-all duration-200"
                      style={{ background: "#0d1525", border: "1px solid rgba(0,229,255,0.1)", borderRadius: "2px", color: "#dce6f5", fontFamily: "'Inter', sans-serif" }}
                      onFocus={(e) => { e.currentTarget.style.borderColor = "rgba(0,229,255,0.4)"; }}
                      onBlur={(e) => { e.currentTarget.style.borderColor = "rgba(0,229,255,0.1)"; }} />
                  </div>
                ))}
                <div>
                  <label className="block text-xs mb-2 tracking-wider uppercase" style={{ fontFamily: "'DM Mono', monospace", color: "#3d6680" }}>Project Brief</label>
                  <textarea required rows={5} placeholder="Describe your project, timeline, and requirements..."
                    value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })}
                    className="w-full px-4 py-3 text-sm outline-none transition-all duration-200 resize-none"
                    style={{ background: "#0d1525", border: "1px solid rgba(0,229,255,0.1)", borderRadius: "2px", color: "#dce6f5", fontFamily: "'Inter', sans-serif" }}
                    onFocus={(e) => { e.currentTarget.style.borderColor = "rgba(0,229,255,0.4)"; }}
                    onBlur={(e) => { e.currentTarget.style.borderColor = "rgba(0,229,255,0.1)"; }} />
                </div>
                <button type="submit" className="w-full py-4 text-sm font-bold tracking-wider transition-all duration-200"
                  style={{ background: "#00e5ff", color: "#070b13", fontFamily: "'Barlow', sans-serif", borderRadius: "2px" }}
                  onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = "#33ecff"; }}
                  onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = "#00e5ff"; }}>
                  SEND MESSAGE →
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="py-14" style={{ background: "#070b13", borderTop: "1px solid rgba(0,229,255,0.08)" }}>
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid md:grid-cols-4 gap-12 mb-14">
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-7 h-7 flex items-center justify-center" style={{ background: "rgba(0,229,255,0.1)", borderRadius: "2px" }}>
                <span className="text-xs font-black" style={{ fontFamily: "'Barlow Condensed', sans-serif", color: "#00e5ff" }}>ZIF</span>
              </div>
              <span className="text-base font-bold" style={{ fontFamily: "'Barlow', sans-serif", color: "#dce6f5" }}>
                ZyTech<span style={{ color: "#00e5ff" }}>Insight</span>
              </span>
            </div>
            <p className="text-sm leading-relaxed max-w-xs" style={{ fontFamily: "'Inter', sans-serif", color: "#3d5166" }}>
              Engineering software that powers the next generation of businesses. Precision. Scale. Accountability.
            </p>
            <div className="flex gap-4 mt-6">
              {[Linkedin, Twitter, Github].map((Icon, i) => (
                <a key={i} href="#" className="w-9 h-9 flex items-center justify-center transition-all duration-200"
                  style={{ border: "1px solid rgba(0,229,255,0.1)", borderRadius: "2px", color: "#3d5166" }}
                  onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.borderColor = "rgba(0,229,255,0.3)"; (e.currentTarget as HTMLElement).style.color = "#00e5ff"; }}
                  onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.borderColor = "rgba(0,229,255,0.1)"; (e.currentTarget as HTMLElement).style.color = "#3d5166"; }}>
                  <Icon size={15} />
                </a>
              ))}
            </div>
          </div>
          <div>
            <div className="text-xs tracking-widest uppercase mb-5" style={{ fontFamily: "'DM Mono', monospace", color: "#3d6680" }}>Company</div>
            <div className="space-y-3">
              {["About ZIF", "Our Process", "Careers", "Press"].map((l) => (
                <a key={l} href="#" className="block text-sm transition-colors duration-200"
                  style={{ fontFamily: "'Inter', sans-serif", color: "#3d5166" }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = "#a0b4c8")}
                  onMouseLeave={(e) => (e.currentTarget.style.color = "#3d5166")}>{l}</a>
              ))}
            </div>
          </div>
          <div>
            <div className="text-xs tracking-widest uppercase mb-5" style={{ fontFamily: "'DM Mono', monospace", color: "#3d6680" }}>Services</div>
            <div className="space-y-3">
              {["Web Development", "Mobile Apps", "Cloud & DevOps", "AI & ML", "Cybersecurity"].map((l) => (
                <a key={l} href="#services" className="block text-sm transition-colors duration-200"
                  style={{ fontFamily: "'Inter', sans-serif", color: "#3d5166" }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = "#a0b4c8")}
                  onMouseLeave={(e) => (e.currentTarget.style.color = "#3d5166")}>{l}</a>
              ))}
            </div>
          </div>
        </div>
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 pt-8" style={{ borderTop: "1px solid rgba(0,229,255,0.06)" }}>
          <span className="text-xs" style={{ fontFamily: "'DM Mono', monospace", color: "#1e3a52" }}>© 2024 ZyTech Insight Ltd. All rights reserved.</span>
          <div className="flex gap-6">
            {["Privacy Policy", "Terms of Service"].map((l) => (
              <a key={l} href="#" className="text-xs transition-colors duration-200"
                style={{ fontFamily: "'DM Mono', monospace", color: "#1e3a52" }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "#3d6680")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "#1e3a52")}>{l}</a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

// ─── Root ─────────────────────────────────────────────────────────────────────

function Blog({ posts, onRead }: { posts: Post[]; onRead: (p: Post) => void }) {
  return (
    <section id="blog" className="py-28" style={{ background: "#0a0f1c" }}>
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="mb-16">
          <div className="text-xs tracking-widest uppercase mb-4" style={{ fontFamily: "'DM Mono', monospace", color: "#00e5ff" }}>
            Latest Updates
          </div>
          <h2 className="text-4xl lg:text-6xl font-black leading-none" style={{ fontFamily: "'Barlow Condensed', sans-serif", color: "#dce6f5" }}>
            NEWS &amp; INSIGHTS<br />
            <span style={{ color: "#00e5ff" }}>FROM ZIF.</span>
          </h2>
        </div>

        {/* Featured first post */}
        {posts.length > 0 && (
          <div
            className="group cursor-pointer mb-6 grid lg:grid-cols-2 overflow-hidden"
            style={{ background: "#0d1525", border: "1px solid rgba(0,229,255,0.08)", borderRadius: "2px" }}
            onClick={() => onRead(posts[0])}
          >
            <div className="relative overflow-hidden" style={{ minHeight: "280px" }}>
              {posts[0].imageUrl ? (
                posts[0].imageUrl.startsWith("data:video") ? (
                  <video src={posts[0].imageUrl} className="absolute inset-0 w-full h-full object-cover" style={{ filter: "brightness(0.7) saturate(0.8)" }} controls onClick={(e) => e.stopPropagation()} />
                ) : (
                  <img src={posts[0].imageUrl} alt={posts[0].title}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    style={{ filter: "brightness(0.7) saturate(0.8)" }} />
                )
              ) : (
                <div className="absolute inset-0 flex items-center justify-center"
                  style={{ background: "linear-gradient(135deg, #0d1525 0%, #111c30 100%)" }}>
                  <FileText size={48} style={{ color: "#1e3a52" }} />
                </div>
              )}
              <div className="absolute top-4 left-4 flex gap-2">
                <span className="text-xs px-2.5 py-1"
                  style={{ fontFamily: "'DM Mono', monospace", color: "#00e5ff", background: "rgba(0,229,255,0.1)", border: "1px solid rgba(0,229,255,0.2)", borderRadius: "2px" }}>
                  {posts[0].category}
                </span>
                {posts[0].gallery.length > 0 && (
                  <span className="text-xs px-2.5 py-1 flex items-center gap-1"
                    style={{ fontFamily: "'DM Mono', monospace", color: "#dce6f5", background: "rgba(7,11,19,0.8)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "2px" }}>
                    <Images size={10} /> {posts[0].gallery.length}
                  </span>
                )}
              </div>
            </div>
            <div className="p-10 flex flex-col justify-center">
              <div className="flex items-center gap-2 mb-4">
                <Clock size={12} style={{ color: "#3d6680" }} />
                <span className="text-xs" style={{ fontFamily: "'DM Mono', monospace", color: "#3d6680" }}>
                  {new Date(posts[0].createdAt).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" })}
                </span>
              </div>
              <h3 className="text-2xl lg:text-3xl font-black mb-4 transition-colors duration-200 group-hover:text-[#00e5ff]"
                style={{ fontFamily: "'Barlow Condensed', sans-serif", color: "#dce6f5" }}>
                {posts[0].title}
              </h3>
              <p className="text-sm leading-relaxed mb-6" style={{ fontFamily: "'Inter', sans-serif", color: "#5e7499" }}>
                {posts[0].excerpt}
              </p>
              <span className="inline-flex items-center gap-2 text-sm font-bold transition-colors duration-200"
                style={{ fontFamily: "'Barlow', sans-serif", color: "#00e5ff" }}>
                Read Post <ChevronRight size={16} />
              </span>
            </div>
          </div>
        )}

        {/* Remaining posts grid */}
        {posts.length > 1 && (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-px" style={{ background: "rgba(0,229,255,0.06)" }}>
            {posts.slice(1).map((post) => (
              <div key={post.id} className="group cursor-pointer p-0 overflow-hidden transition-all duration-300"
                style={{ background: "#070b13" }}
                onClick={() => onRead(post)}>
                <div className="relative overflow-hidden" style={{ height: "180px" }}>
                  {post.imageUrl ? (
                    post.imageUrl.startsWith("data:video") ? (
                      <video src={post.imageUrl} className="w-full h-full object-cover" style={{ filter: "brightness(0.55) saturate(0.7)" }} controls onClick={(e) => e.stopPropagation()} />
                    ) : (
                      <img src={post.imageUrl} alt={post.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        style={{ filter: "brightness(0.55) saturate(0.7)" }} />
                    )
                  ) : (
                    <div className="w-full h-full flex items-center justify-center"
                      style={{ background: "linear-gradient(135deg, #0d1525 0%, #111c30 100%)" }}>
                      <FileText size={32} style={{ color: "#1e3a52" }} />
                    </div>
                  )}
                  <div className="absolute top-3 left-3 flex gap-2">
                    <span className="text-xs px-2 py-0.5"
                      style={{ fontFamily: "'DM Mono', monospace", color: "#00e5ff", background: "rgba(0,229,255,0.1)", border: "1px solid rgba(0,229,255,0.15)", borderRadius: "2px" }}>
                      {post.category}
                    </span>
                    {post.gallery.length > 0 && (
                      <span className="text-xs px-2 py-0.5 flex items-center gap-1"
                        style={{ fontFamily: "'DM Mono', monospace", color: "#dce6f5", background: "rgba(7,11,19,0.8)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "2px" }}>
                        <Images size={10} /> {post.gallery.length}
                      </span>
                    )}
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-2 mb-3">
                    <Clock size={11} style={{ color: "#1e3a52" }} />
                    <span className="text-xs" style={{ fontFamily: "'DM Mono', monospace", color: "#1e3a52" }}>
                      {new Date(post.createdAt).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" })}
                    </span>
                  </div>
                  <h3 className="font-black text-lg mb-2 transition-colors duration-200 group-hover:text-[#00e5ff]"
                    style={{ fontFamily: "'Barlow Condensed', sans-serif", color: "#dce6f5" }}>
                    {post.title}
                  </h3>
                  <p className="text-sm leading-relaxed" style={{ fontFamily: "'Inter', sans-serif", color: "#5e7499" }}>
                    {post.excerpt}
                  </p>
                  <div className="mt-4 flex items-center gap-1 text-xs font-bold"
                    style={{ fontFamily: "'Barlow', sans-serif", color: "#00e5ff" }}>
                    Read more <ChevronRight size={13} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

function PostView({ 
  post, 
  onBack,
  comments,
  onAddComment,
  currentUser
}: { 
  post: Post; 
  onBack: () => void;
  comments: Comment[];
  onAddComment: (data: Omit<Comment, "id" | "createdAt" | "approved">) => void;
  currentUser: RegisteredUser | null;
}) {
  useEffect(() => {
    window.scrollTo(0, 0);
    // Make sure body is scrollable for PostView
    document.body.style.overflow = "auto";
  }, []);

  const [showLogin, setShowLogin] = useState(false);
  const [loginForm, setLoginForm] = useState({ name: "", email: "" });
  const [commentForm, setCommentForm] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const postComments = comments.filter(c => c.postId === post.id && c.approved);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, you'd authenticate here, but for now we'll just use registerUser
    setShowLogin(false);
    setLoginForm({ name: "", email: "" });
  };

  const handleCommentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentUser) return;
    onAddComment({
      postId: post.id,
      userId: currentUser.id,
      userName: currentUser.name,
      content: commentForm
    });
    setCommentForm("");
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
  };

  return (
    <div style={{ 
      background: post.backgroundImage 
        ? `url(${post.backgroundImage}) center/cover no-repeat fixed` 
        : "#070b13", 
      minHeight: "100vh",
      position: "relative",
      overflowY: "auto"
    }}>
      {/* Background overlay for readability */}
      {post.backgroundImage && (
        <div className="fixed inset-0 z-0 pointer-events-none" style={{ background: "rgba(7, 11, 19, 0.85)" }} />
      )}

      {/* Top bar */}
      <div className="sticky top-0 z-50 flex items-center px-6 py-3 gap-4"
        style={{ background: "rgba(7,11,19,0.95)", backdropFilter: "blur(12px)", borderBottom: "1px solid rgba(0,229,255,0.08)" }}>
        <button onClick={onBack} className="flex items-center gap-2 text-sm transition-colors duration-200"
          style={{ fontFamily: "'DM Mono', monospace", color: "#5e7499" }}
          onMouseEnter={(e) => (e.currentTarget.style.color = "#dce6f5")}
          onMouseLeave={(e) => (e.currentTarget.style.color = "#5e7499")}>
          ← Back to Updates
        </button>
        <span style={{ color: "#1e3a52" }}>/</span>
        <span className="text-xs truncate max-w-xs" style={{ fontFamily: "'DM Mono', monospace", color: "#3d6680" }}>{post.title}</span>
      </div>

      {/* Cover */}
      {post.imageUrl && (
        <div className="w-full relative z-10" style={{ height: "420px" }}>
          {post.imageUrl.startsWith("data:video") ? (
            <video src={post.imageUrl} className="w-full h-full object-cover" style={{ filter: "brightness(0.45) saturate(0.7)" }} controls />
          ) : (
            <img src={post.imageUrl} alt={post.title} className="w-full h-full object-cover"
              style={{ filter: "brightness(0.45) saturate(0.7)" }} />
          )}
          <div className="absolute inset-0" style={{ background: "linear-gradient(to top, #070b13 0%, transparent 60%)" }} />
        </div>
      )}

      {/* Content */}
      <div className="max-w-3xl mx-auto px-6 py-16 relative z-10">
        <div className="flex items-center gap-3 mb-6">
          <span className="text-xs px-3 py-1"
            style={{ fontFamily: "'DM Mono', monospace", color: "#00e5ff", border: "1px solid rgba(0,229,255,0.2)", borderRadius: "2px", background: "rgba(0,229,255,0.05)" }}>
            {post.category}
          </span>
          <span className="text-xs" style={{ fontFamily: "'DM Mono', monospace", color: "#3d6680" }}>
            {new Date(post.createdAt).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" })}
          </span>
        </div>

        <h1 className="text-4xl lg:text-6xl font-black mb-6 leading-tight"
          style={{ fontFamily: "'Barlow Condensed', sans-serif", color: "#dce6f5" }}>
          {post.title}
        </h1>
        <p className="text-lg mb-10 leading-relaxed"
          style={{ fontFamily: "'Inter', sans-serif", color: "#7a92a8", borderBottom: "1px solid rgba(0,229,255,0.08)", paddingBottom: "2.5rem" }}>
          {post.excerpt}
        </p>

        {/* Gallery */}
        {post.gallery.length > 0 && (
          <div className="mb-10">
            <div className="text-xs tracking-widest uppercase mb-4" style={{ fontFamily: "'DM Mono', monospace", color: "#3d6680" }}>Gallery</div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {post.gallery.map((media, i) => (
                <div key={i} className="relative aspect-square overflow-hidden" style={{ borderRadius: "2px" }}>
                  {media.startsWith("data:video") ? (
                    <video src={media} className="w-full h-full object-cover" controls />
                  ) : (
                    <img src={media} alt={`Gallery image ${i + 1}`} className="w-full h-full object-cover" />
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="prose mb-16" style={{ fontFamily: "'Inter', sans-serif", color: "#a0b4c8", lineHeight: "1.9", fontSize: "16px" }}>
          {post.body.split("\n").map((para, i) =>
            para.trim() ? <p key={i} style={{ marginBottom: "1.5rem" }}>{para}</p> : <br key={i} />
          )}
        </div>

        {/* Comments Section */}
        <div className="pt-8" style={{ borderTop: "1px solid rgba(0,229,255,0.08)" }}>
          <h2 className="text-2xl font-black mb-8" style={{ fontFamily: "'Barlow Condensed', sans-serif", color: "#dce6f5" }}>
            Comments ({postComments.length})
          </h2>

          {!currentUser ? (
            <div className="p-6 mb-8" style={{ background: "#0d1525", border: "1px solid rgba(0,229,255,0.08)", borderRadius: "2px" }}>
              {showLogin ? (
                <form onSubmit={handleLogin} className="space-y-4">
                  <div>
                    <label className="block text-xs mb-2 tracking-wider uppercase" style={{ fontFamily: "'DM Mono', monospace", color: "#3d6680" }}>Name</label>
                    <input type="text" required value={loginForm.name} onChange={(e) => setLoginForm({ ...loginForm, name: e.target.value })}
                      className="w-full px-4 py-3 text-sm outline-none"
                      style={{ background: "#111c30", border: "1px solid rgba(0,229,255,0.1)", borderRadius: "2px", color: "#dce6f5", fontFamily: "'Inter', sans-serif" }} />
                  </div>
                  <div>
                    <label className="block text-xs mb-2 tracking-wider uppercase" style={{ fontFamily: "'DM Mono', monospace", color: "#3d6680" }}>Email</label>
                    <input type="email" required value={loginForm.email} onChange={(e) => setLoginForm({ ...loginForm, email: e.target.value })}
                      className="w-full px-4 py-3 text-sm outline-none"
                      style={{ background: "#111c30", border: "1px solid rgba(0,229,255,0.1)", borderRadius: "2px", color: "#dce6f5", fontFamily: "'Inter', sans-serif" }} />
                  </div>
                  <div className="flex gap-3">
                    <button type="submit"
                      className="px-6 py-3 text-sm font-bold"
                      style={{ background: "#00e5ff", color: "#070b13", borderRadius: "2px", fontFamily: "'Barlow', sans-serif" }}>
                      Register / Login
                    </button>
                    <button type="button" onClick={() => setShowLogin(false)}
                      className="px-6 py-3 text-sm font-bold"
                      style={{ border: "1px solid rgba(0,229,255,0.2)", color: "#5e7499", borderRadius: "2px", fontFamily: "'Barlow', sans-serif" }}>
                      Cancel
                    </button>
                  </div>
                </form>
              ) : (
                <div className="text-center">
                  <p className="mb-4" style={{ fontFamily: "'Inter', sans-serif", color: "#5e7499" }}>
                    Register to leave a comment
                  </p>
                  <button onClick={() => setShowLogin(true)}
                    className="px-6 py-3 text-sm font-bold"
                    style={{ background: "#00e5ff", color: "#070b13", borderRadius: "2px", fontFamily: "'Barlow', sans-serif" }}>
                    Register / Login
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="mb-8">
              {submitted ? (
                <div className="p-6 text-center" style={{ background: "#0d1525", border: "1px solid rgba(0,229,255,0.08)", borderRadius: "2px" }}>
                  <CheckCircle size={32} style={{ color: "#00e5ff", marginBottom: "12px" }} />
                  <p style={{ fontFamily: "'Inter', sans-serif", color: "#dce6f5" }}>
                    Comment submitted for approval!
                  </p>
                </div>
              ) : (
                <form onSubmit={handleCommentSubmit} className="space-y-4">
                  <div>
                    <label className="block text-xs mb-2 tracking-wider uppercase" style={{ fontFamily: "'DM Mono', monospace", color: "#3d6680" }}>
                      Leave a Comment
                    </label>
                    <textarea required rows={4} value={commentForm} onChange={(e) => setCommentForm(e.target.value)}
                      placeholder="Write your comment here..."
                      className="w-full px-4 py-3 text-sm outline-none resize-none"
                      style={{ background: "#0d1525", border: "1px solid rgba(0,229,255,0.08)", borderRadius: "2px", color: "#dce6f5", fontFamily: "'Inter', sans-serif" }} />
                  </div>
                  <button type="submit"
                    className="px-6 py-3 text-sm font-bold"
                    style={{ background: "#00e5ff", color: "#070b13", borderRadius: "2px", fontFamily: "'Barlow', sans-serif" }}>
                    Submit Comment
                  </button>
                </form>
              )}
            </div>
          )}

          {/* Comments List */}
          <div className="space-y-6">
            {postComments.length === 0 ? (
              <p style={{ fontFamily: "'Inter', sans-serif", color: "#5e7499" }}>No comments yet. Be the first!</p>
            ) : (
              postComments.map((comment) => (
                <div key={comment.id} className="p-6" style={{ background: "#0d1525", border: "1px solid rgba(0,229,255,0.08)", borderRadius: "2px" }}>
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 flex items-center justify-center" style={{ background: "rgba(0,229,255,0.1)", borderRadius: "2px" }}>
                      <span className="text-sm font-bold" style={{ fontFamily: "'Barlow Condensed', sans-serif", color: "#00e5ff" }}>
                        {comment.userName.charAt(0).toUpperCase()}
                      </span>
                    </div>
                    <div>
                      <p className="font-bold text-sm" style={{ fontFamily: "'Inter', sans-serif", color: "#dce6f5" }}>{comment.userName}</p>
                      <p className="text-xs" style={{ fontFamily: "'DM Mono', monospace", color: "#3d6680" }}>
                        {new Date(comment.createdAt).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" })}
                      </p>
                    </div>
                  </div>
                  <p style={{ fontFamily: "'Inter', sans-serif", color: "#a0b4c8" }}>{comment.content}</p>
                </div>
              ))
            )}
          </div>
        </div>

        <div className="mt-16 pt-8" style={{ borderTop: "1px solid rgba(0,229,255,0.08)" }}>
          <button onClick={onBack}
            className="inline-flex items-center gap-2 px-6 py-3 text-sm font-bold transition-all duration-200"
            style={{ border: "1px solid rgba(0,229,255,0.2)", color: "#00e5ff", fontFamily: "'Barlow', sans-serif", borderRadius: "2px" }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = "rgba(0,229,255,0.08)"; }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = "transparent"; }}>
            ← Back to All Updates
          </button>
        </div>
      </div>
    </div>
  );
}

function ProjectModal({ project, onClose }: { project: Project; onClose: () => void }) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isOverviewExpanded, setIsOverviewExpanded] = useState(false);
  const [showDemo, setShowDemo] = useState(false); // State to toggle demo iframe
  const CHARACTER_LIMIT = 200;

  const allImages = project.images.length > 0 
    ? project.images 
    : [project.image.startsWith("data:") ? project.image : `https://images.unsplash.com/${project.image}?w=1200&h=800&fit=crop&auto=format`];

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % allImages.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + allImages.length) % allImages.length);
  };

  const shouldTruncate = project.details.length > CHARACTER_LIMIT;
  const displayText = isOverviewExpanded ? project.details : `${project.details.slice(0, CHARACTER_LIMIT)}...`;

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = "auto"; };
  }, []);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto" style={{ 
      background: project.backgroundImage 
        ? `url(${project.backgroundImage}) center/cover no-repeat fixed` 
        : "rgba(7, 11, 19, 0.95)" 
    }}>
      {/* Overlay for readability */}
      {project.backgroundImage && (
        <div className="absolute inset-0 pointer-events-none" style={{ background: "rgba(7, 11, 19, 0.85)" }} />
      )}
      <div className="w-full max-w-6xl relative z-10 my-8" style={{ background: "#0d1525", borderRadius: "2px", border: "1px solid rgba(0,229,255,0.12)" }}>
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b" style={{ borderColor: "rgba(0,229,255,0.08)" }}>
          <div>
            <span className="text-xs tracking-widest uppercase" style={{ fontFamily: "'DM Mono', monospace", color: project.color }}>{project.category}</span>
            <h2 className="text-2xl lg:text-3xl font-black mt-1" style={{ fontFamily: "'Barlow Condensed', sans-serif", color: "#dce6f5" }}>{project.title}</h2>
          </div>
          <button onClick={onClose} className="p-2" style={{ color: "#5e7499" }}>
            <X size={24} />
          </button>
        </div>

        <div className="p-6 space-y-6">
          {/* If we have a demo URL and are showing it */}
          {showDemo && project.demoUrl ? (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-bold" style={{ fontFamily: "'DM Mono', monospace", color: "#3d6680" }}>Live Demo</h3>
                <div className="flex gap-2">
                  <a 
                    href={project.demoUrl} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="px-4 py-2 text-xs font-bold"
                    style={{ background: "transparent", color: "#00e5ff", border: "1px solid rgba(0,229,255,0.3)", borderRadius: "2px", fontFamily: "'Barlow', sans-serif" }}
                  >
                    Open in New Tab
                  </a>
                  <button 
                    onClick={() => setShowDemo(false)}
                    className="px-4 py-2 text-xs font-bold"
                    style={{ background: "transparent", color: "#ef4444", border: "1px solid rgba(239,68,68,0.3)", borderRadius: "2px", fontFamily: "'Barlow', sans-serif" }}
                  >
                    Close Demo
                  </button>
                </div>
              </div>
              <div className="aspect-video overflow-hidden" style={{ borderRadius: "2px", border: "1px solid rgba(0,229,255,0.1)" }}>
                <iframe 
                  src={project.demoUrl} 
                  title={`${project.title} Demo`}
                  className="w-full h-full"
                  style={{ border: "none" }}
                  allowFullScreen
                />
              </div>
            </div>
          ) : (
            // Original content (slideshow + details)
            <div className="grid lg:grid-cols-2 gap-8">
              {/* Slideshow */}
              <div className="relative">
                <div className="aspect-video overflow-hidden" style={{ borderRadius: "2px" }}>
                  <img src={allImages[currentImageIndex]} alt="" className="w-full h-full object-cover" />
                </div>
                {allImages.length > 1 && (
                  <>
                    <button onClick={prevImage} className="absolute left-4 top-1/2 -translate-y-1/2 p-3" style={{ background: "rgba(7,11,19,0.8)", color: "#00e5ff", borderRadius: "2px" }}>
                      <ChevronRight size={20} style={{ transform: "rotate(180deg)" }} />
                    </button>
                    <button onClick={nextImage} className="absolute right-4 top-1/2 -translate-y-1/2 p-3" style={{ background: "rgba(7,11,19,0.8)", color: "#00e5ff", borderRadius: "2px" }}>
                      <ChevronRight size={20} />
                    </button>
                    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                      {allImages.map((_, i) => (
                        <button key={i} onClick={() => setCurrentImageIndex(i)} className="w-2 h-2 rounded-full" style={{ background: i === currentImageIndex ? "#00e5ff" : "#3d6680" }} />
                      ))}
                    </div>
                  </>
                )}
              </div>

              {/* Details */}
              <div className="space-y-6">
                <div>
                  <h3 className="text-sm font-bold mb-2" style={{ fontFamily: "'DM Mono', monospace", color: "#3d6680" }}>Overview</h3>
                  <p style={{ fontFamily: "'Inter', sans-serif", color: "#a0b4c8", lineHeight: "1.8" }}>{displayText}</p>
                  {shouldTruncate && (
                    <button 
                      onClick={() => setIsOverviewExpanded(!isOverviewExpanded)}
                      className="mt-2 text-sm font-bold transition-colors duration-200"
                      style={{ fontFamily: "'Barlow', sans-serif", color: "#00e5ff" }}
                    >
                      {isOverviewExpanded ? "Read less" : "Read more"}
                    </button>
                  )}
                </div>
                
                <div>
                  <h3 className="text-sm font-bold mb-3" style={{ fontFamily: "'DM Mono', monospace", color: "#3d6680" }}>Technologies Used</h3>
                  <div className="flex flex-wrap gap-2">
                    {project.tech.map((t) => (
                      <span key={t} className="text-xs px-3 py-1.5"
                        style={{ fontFamily: "'DM Mono', monospace", color: project.color, border: `1px solid ${project.color}33`, borderRadius: "2px", background: `${project.color}0a` }}>
                        {t}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex flex-wrap gap-3">
                  {project.demoUrl && (
                    <button 
                      onClick={() => setShowDemo(true)}
                      className="inline-flex items-center gap-2 px-6 py-3 text-sm font-bold"
                      style={{ background: project.color, color: "#070b13", borderRadius: "2px", fontFamily: "'Barlow', sans-serif" }}
                    >
                      View Live Demo <ArrowRight size={16} />
                    </button>
                  )}
                  <a href="#contact" onClick={onClose} className="inline-flex items-center gap-2 px-6 py-3 text-sm font-bold"
                    style={{ background: "transparent", color: "#dce6f5", border: `1px solid ${project.color}33`, borderRadius: "2px", fontFamily: "'Barlow', sans-serif" }}>
                    Discuss Similar Project
                  </a>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default function App() {
  const { content, save } = useSiteContent();
  const { posts, createPost, upsert, remove, togglePublish } = usePosts();
  const { projects, createProject, upsert: upsertProject, remove: removeProject } = useProjects();
  const { testimonials: userTestimonials, submitTestimonial, approveTestimonial, removeTestimonial } = useUserTestimonials();
  const { users: registeredUsers, registerUser, removeUser: removeRegisteredUser } = useRegisteredUsers();
  const { messages, sendMessage, markAsRead: markMessageAsRead, removeMessage } = useMessages();
  const { comments, addComment, approveComment, removeComment } = useComments();
  const [view, setView] = useState<"site" | "login" | "admin" | "tutorial">("site");
  const [activePost, setActivePost] = useState<Post | null>(null);
  const [activeProject, setActiveProject] = useState<Project | null>(null);

  const published = posts.filter((p) => p.published);

  return (
    <div style={{ fontFamily: "'Inter', sans-serif", background: "#070b13" }}>
      {view === "login" && (
        <AdminLogin onLogin={() => setView("admin")} />
      )}
      {view === "admin" && (
        <AdminPanel
          content={content} onSave={save} onExit={() => setView("site")}
          posts={posts} createPost={createPost} upsertPost={upsert}
          removePost={remove} togglePublish={togglePublish}
          projects={projects} createProject={createProject} upsertProject={upsertProject}
          removeProject={removeProject}
          userTestimonials={userTestimonials} approveTestimonial={approveTestimonial} removeTestimonial={removeTestimonial}
          registeredUsers={registeredUsers} removeRegisteredUser={removeRegisteredUser}
          messages={messages} markMessageAsRead={markMessageAsRead} removeMessage={removeMessage}
          comments={comments} approveComment={approveComment} removeComment={removeComment}
        />
      )}
      {view === "site" && !activePost && !activeProject && (
        <>
          <NavBar onAdminClick={() => setView("login")} content={content} onTutorialClick={() => setView("tutorial")} />
          <Hero content={content} />
          <Services content={content} />
          <About content={content} />
          <Portfolio projects={projects} onProjectClick={setActiveProject} />
          <TechStack />
          {published.length > 0 && <Blog posts={published} onRead={setActivePost} />}
          <Testimonials content={content} userTestimonials={userTestimonials} submitTestimonial={submitTestimonial} />
          <Contact content={content} onSendMessage={sendMessage} />
          <Footer />
        </>
      )}
      {view === "tutorial" && (
        <>
          <NavBar onAdminClick={() => setView("login")} content={content} onTutorialClick={() => setView("site")} />
          <Tutorial onRegister={registerUser} />
        </>
      )}
      {view === "site" && activePost && (
        <PostView 
          post={activePost} 
          onBack={() => setActivePost(null)} 
          comments={comments} 
          onAddComment={addComment}
          currentUser={registeredUsers.length > 0 ? registeredUsers[0] : null}
        />
      )}
      {view === "site" && activeProject && (
        <ProjectModal project={activeProject} onClose={() => setActiveProject(null)} />
      )}
    </div>
  );
}
