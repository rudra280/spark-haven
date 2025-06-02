import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  Home,
  BookOpen,
  Video,
  Upload,
  Users,
  Brain,
  MessageCircle,
  Calendar,
  MapPin,
  CreditCard,
  User,
  Settings,
  TrendingUp,
  FileText,
  Zap,
  GraduationCap,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface PageLink {
  name: string;
  href: string;
  icon: React.ElementType;
  description: string;
  color: string;
  premium?: boolean;
  new?: boolean;
}

const allPages: PageLink[] = [
  // Main Pages
  {
    name: "Home",
    href: "/",
    icon: Home,
    description: "Main homepage",
    color: "from-blue-500 to-cyan-500",
  },
  {
    name: "Dashboard",
    href: "/dashboard",
    icon: User,
    description: "Your learning dashboard",
    color: "from-purple-500 to-pink-500",
  },
  {
    name: "Courses",
    href: "/courses",
    icon: BookOpen,
    description: "Browse all courses",
    color: "from-green-500 to-emerald-500",
  },

  // Authentication
  {
    name: "Login",
    href: "/login",
    icon: User,
    description: "Sign in to your account",
    color: "from-orange-500 to-red-500",
  },
  {
    name: "Register",
    href: "/register",
    icon: GraduationCap,
    description: "Create new account",
    color: "from-violet-500 to-purple-500",
  },

  // Learning Features
  {
    name: "AI Video Hub",
    href: "/ai-video-hub",
    icon: Video,
    description: "Generate AI videos",
    color: "from-indigo-500 to-blue-500",
    premium: true,
  },
  {
    name: "Study Materials",
    href: "/study-materials",
    icon: FileText,
    description: "Academic resources",
    color: "from-teal-500 to-green-500",
    premium: true,
  },
  {
    name: "EduReels",
    href: "/reels",
    icon: TrendingUp,
    description: "Educational short videos",
    color: "from-pink-500 to-rose-500",
    new: true,
  },
  {
    name: "Video Upload",
    href: "/video-upload",
    icon: Upload,
    description: "Share your knowledge",
    color: "from-amber-500 to-orange-500",
  },

  // AI & Tutoring
  {
    name: "AI Tutor",
    href: "/ai-tutor",
    icon: Brain,
    description: "Chat with AI assistant",
    color: "from-cyan-500 to-blue-500",
    new: true,
  },
  {
    name: "Local Tutors",
    href: "/local-tutors",
    icon: MapPin,
    description: "Find tutors near you",
    color: "from-emerald-500 to-teal-500",
  },
  {
    name: "Tutor Connect",
    href: "/student-teacher-connect",
    icon: Users,
    description: "Connect with teachers",
    color: "from-lime-500 to-green-500",
  },
  {
    name: "Tutor Booking",
    href: "/tutor-booking",
    icon: Calendar,
    description: "Schedule sessions",
    color: "from-sky-500 to-indigo-500",
  },

  // Account & Settings
  {
    name: "Pricing",
    href: "/pricing",
    icon: CreditCard,
    description: "View pricing plans",
    color: "from-yellow-500 to-amber-500",
  },
  {
    name: "Profile",
    href: "/profile",
    icon: Settings,
    description: "Account settings",
    color: "from-gray-500 to-slate-500",
  },
];

interface PageRouterProps {
  currentPage?: string;
  showAll?: boolean;
  category?: "main" | "auth" | "learning" | "ai" | "account";
  className?: string;
}

export function PageRouter({
  currentPage,
  showAll = false,
  category,
  className = "",
}: PageRouterProps) {
  const getFilteredPages = () => {
    if (showAll) return allPages;

    if (category) {
      switch (category) {
        case "main":
          return allPages.filter((page) =>
            ["/", "/dashboard", "/courses"].includes(page.href),
          );
        case "auth":
          return allPages.filter((page) =>
            ["/login", "/register"].includes(page.href),
          );
        case "learning":
          return allPages.filter((page) =>
            [
              "/ai-video-hub",
              "/study-materials",
              "/reels",
              "/video-upload",
            ].includes(page.href),
          );
        case "ai":
          return allPages.filter((page) =>
            [
              "/ai-tutor",
              "/local-tutors",
              "/student-teacher-connect",
              "/tutor-booking",
            ].includes(page.href),
          );
        case "account":
          return allPages.filter((page) =>
            ["/pricing", "/profile"].includes(page.href),
          );
        default:
          return allPages;
      }
    }

    // Show relevant pages based on current page
    if (currentPage === "/login" || currentPage === "/register") {
      return allPages.filter((page) =>
        ["/", "/courses", "/pricing"].includes(page.href),
      );
    }

    return allPages.slice(0, 6); // Show first 6 by default
  };

  return (
    <div className={`space-y-6 ${className}`}>
      <div className="text-center">
        <h3 className="text-2xl font-bold bg-gradient-to-r from-orange-500 via-pink-500 to-violet-500 bg-clip-text text-transparent mb-2">
          🌍 Explore LEARNVERSE
        </h3>
        <p className="text-white/70">Discover all features and pages</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {getFilteredPages().map((page, index) => (
          <motion.div
            key={page.href}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Link to={page.href}>
              <Card className="group hover:shadow-xl transition-all duration-300 border-white/20 bg-white/5 backdrop-blur-sm">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <div
                      className={`w-12 h-12 rounded-lg bg-gradient-to-br ${page.color} flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}
                    >
                      <page.icon className="w-6 h-6 text-white" />
                    </div>

                    <div className="flex gap-1">
                      {page.premium && (
                        <Badge className="bg-gradient-to-r from-purple-500 to-pink-500 text-white text-xs">
                          PRO
                        </Badge>
                      )}
                      {page.new && (
                        <Badge className="bg-gradient-to-r from-green-500 to-emerald-500 text-white text-xs">
                          NEW
                        </Badge>
                      )}
                    </div>
                  </div>

                  <CardTitle className="text-white group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-orange-500 group-hover:via-pink-500 group-hover:to-violet-500 group-hover:bg-clip-text transition-all duration-300">
                    {page.name}
                  </CardTitle>
                </CardHeader>

                <CardContent>
                  <p className="text-white/70 text-sm group-hover:text-white/90 transition-colors duration-300">
                    {page.description}
                  </p>
                </CardContent>
              </Card>
            </Link>
          </motion.div>
        ))}
      </div>

      {!showAll && (
        <div className="text-center">
          <Button
            variant="outline"
            className="border-white/20 bg-white/5 text-white hover:bg-white/10"
            onClick={() => {}} // You can implement a modal or expand functionality
          >
            View All Pages
          </Button>
        </div>
      )}
    </div>
  );
}

// Quick Navigation Component for emergency situations
export function QuickNavigation() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="fixed bottom-4 right-4 z-50"
    >
      <Card className="bg-black/80 backdrop-blur-xl border-white/20 p-4">
        <h4 className="text-white font-semibold mb-3">Quick Navigation</h4>
        <div className="grid grid-cols-2 gap-2">
          <Link to="/">
            <Button
              size="sm"
              className="w-full bg-gradient-to-r from-blue-500 to-cyan-500"
            >
              <Home className="w-4 h-4 mr-2" />
              Home
            </Button>
          </Link>
          <Link to="/dashboard">
            <Button
              size="sm"
              className="w-full bg-gradient-to-r from-purple-500 to-pink-500"
            >
              <User className="w-4 h-4 mr-2" />
              Dashboard
            </Button>
          </Link>
          <Link to="/courses">
            <Button
              size="sm"
              className="w-full bg-gradient-to-r from-green-500 to-emerald-500"
            >
              <BookOpen className="w-4 h-4 mr-2" />
              Courses
            </Button>
          </Link>
          <Link to="/reels">
            <Button
              size="sm"
              className="w-full bg-gradient-to-r from-pink-500 to-rose-500"
            >
              <TrendingUp className="w-4 h-4 mr-2" />
              Reels
            </Button>
          </Link>
        </div>
      </Card>
    </motion.div>
  );
}
