import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  Menu,
  X,
  User,
  Settings,
  LogOut,
  Crown,
  Zap,
  BookOpen,
  Video,
  Users,
  Brain,
  Upload,
  Calendar,
  MapPin,
  CreditCard,
  Bell,
  Search,
  Globe,
  Sparkles,
  ChevronDown,
  Star,
  TrendingUp,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/contexts/AuthContext";
import { useTheme } from "@/contexts/ThemeContext";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { MagneticButton } from "@/components/ui/cursor-effects";

interface NavItem {
  name: string;
  href: string;
  icon: React.ElementType;
  description: string;
  premium?: boolean;
  new?: boolean;
  hot?: boolean;
}

const navigationItems: NavItem[] = [
  {
    name: "Courses",
    href: "/courses",
    icon: BookOpen,
    description: "Explore our vast course library",
  },
  {
    name: "AI Video Hub",
    href: "/ai-video-hub",
    icon: Video,
    description: "Generate and manage AI videos",
    premium: true,
  },
  {
    name: "EduReels",
    href: "/reels",
    icon: TrendingUp,
    description: "Short educational content",
    hot: true,
  },
  {
    name: "Study Materials",
    href: "/study-materials",
    icon: Brain,
    description: "Premium study resources",
    premium: true,
  },
  {
    name: "Local Tutors",
    href: "/local-tutors",
    icon: MapPin,
    description: "Find tutors near you",
  },
  {
    name: "AI Tutor",
    href: "/ai-tutor",
    icon: Zap,
    description: "Chat with AI assistant",
    new: true,
  },
  {
    name: "Upload",
    href: "/video-upload",
    icon: Upload,
    description: "Share your knowledge",
  },
];

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [showSearch, setShowSearch] = useState(false);
  const [notifications, setNotifications] = useState(3);

  const { user, isAuthenticated, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const isActive = (path: string) => location.pathname === path;

  const getPlanColor = (plan: string) => {
    switch (plan) {
      case "pro":
        return "from-blue-500 to-cyan-500";
      case "ultimate":
        return "from-purple-500 to-pink-500";
      default:
        return "from-gray-500 to-gray-600";
    }
  };

  return (
    <motion.nav
      className={`navbar fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled
          ? "backdrop-blur-xl bg-background/95 border-border"
          : "backdrop-blur-sm bg-background/50 border-border/50"
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo and Brand */}
          <motion.div
            className="flex items-center space-x-3"
            whileHover={{ scale: 1.02 }}
          >
            <Link to="/" className="flex items-center space-x-3 group">
              {/* New Professional Logo */}
              <div className="relative">
                <motion.div
                  className="w-10 h-10 bg-gradient-to-br from-orange-500 via-pink-500 to-violet-500 rounded-xl flex items-center justify-center"
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                >
                  <Globe className="w-6 h-6 text-white" />
                </motion.div>

                {/* Glowing Effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-orange-500 via-pink-500 to-violet-500 rounded-xl blur-lg opacity-30 -z-10 group-hover:opacity-50 transition-opacity" />
              </div>

              <div className="hidden sm:block">
                <h1 className="text-xl font-bold text-gradient">LEARNVERSE</h1>
                <p className="text-xs text-muted-foreground -mt-1">
                  Learn Everything, Everywhere
                </p>
              </div>
            </Link>
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-1">
            {navigationItems.map((item) => (
              <motion.div
                key={item.name}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link
                  to={item.href}
                  className={`relative px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 group ${
                    isActive(item.href)
                      ? "text-white bg-gradient-to-r from-orange-500/20 via-pink-500/20 to-violet-500/20"
                      : "text-white/70 hover:text-white hover:bg-white/10"
                  }`}
                >
                  <div className="flex items-center space-x-2">
                    <item.icon className="w-4 h-4" />
                    <span>{item.name}</span>

                    {/* Badges */}
                    {item.premium && (
                      <Badge className="bg-gradient-to-r from-purple-500 to-pink-500 text-white text-xs px-1.5 py-0.5">
                        <Crown className="w-3 h-3 mr-1" />
                        PRO
                      </Badge>
                    )}
                    {item.new && (
                      <Badge className="bg-gradient-to-r from-green-500 to-emerald-500 text-white text-xs px-1.5 py-0.5">
                        NEW
                      </Badge>
                    )}
                    {item.hot && (
                      <Badge className="bg-gradient-to-r from-red-500 to-orange-500 text-white text-xs px-1.5 py-0.5 animate-pulse">
                        🔥 HOT
                      </Badge>
                    )}
                  </div>

                  {/* Active indicator */}
                  {isActive(item.href) && (
                    <motion.div
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-orange-500 via-pink-500 to-violet-500"
                      layoutId="activeIndicator"
                      initial={false}
                      transition={{
                        type: "spring",
                        stiffness: 500,
                        damping: 30,
                      }}
                    />
                  )}
                </Link>
              </motion.div>
            ))}
          </div>

          {/* Search Bar */}
          <div className="hidden md:flex items-center space-x-4">
            <AnimatePresence>
              {showSearch ? (
                <motion.div
                  initial={{ width: 0, opacity: 0 }}
                  animate={{ width: 200, opacity: 1 }}
                  exit={{ width: 0, opacity: 0 }}
                  className="relative"
                >
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-white/50" />
                  <Input
                    type="text"
                    placeholder="Search courses..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 bg-white/10 border-white/20 text-white placeholder:text-white/50 focus:border-pink-400"
                    onBlur={() => !searchQuery && setShowSearch(false)}
                    autoFocus
                  />
                </motion.div>
              ) : (
                <Button
                  size="icon"
                  variant="ghost"
                  className="text-white/70 hover:text-white hover:bg-white/10"
                  onClick={() => setShowSearch(true)}
                >
                  <Search className="w-4 h-4" />
                </Button>
              )}
            </AnimatePresence>
          </div>

          {/* Right Side */}
          <div className="flex items-center space-x-3">
            {/* Theme Toggle */}
            <ThemeToggle />

            {isAuthenticated && user ? (
              <>
                {/* Notifications */}
                <Button
                  size="icon"
                  variant="ghost"
                  className="relative text-foreground/70 hover:text-foreground hover:bg-accent"
                >
                  <Bell className="w-4 h-4" />
                  {notifications > 0 && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="absolute -top-1 -right-1 w-5 h-5 bg-gradient-to-r from-red-500 to-pink-500 rounded-full flex items-center justify-center text-xs text-white"
                    >
                      {notifications}
                    </motion.div>
                  )}
                </Button>

                {/* User Menu */}
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="ghost"
                      className="relative h-10 px-2 text-white/70 hover:text-white hover:bg-white/10"
                    >
                      <div className="flex items-center space-x-2">
                        <Avatar className="h-8 w-8 user-avatar">
                          <AvatarImage src={user.avatar} alt={user.name} />
                          <AvatarFallback className="bg-gradient-to-br from-orange-500 to-violet-500 text-white">
                            {user.name.charAt(0)}
                          </AvatarFallback>
                        </Avatar>
                        <div className="hidden sm:block text-left">
                          <p className="text-sm font-medium">{user.name}</p>
                          <p className="text-xs text-white/50 capitalize">
                            {user.plan} Plan
                          </p>
                        </div>
                        <ChevronDown className="w-4 h-4" />
                      </div>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent
                    align="end"
                    className="w-64 bg-slate-800/95 backdrop-blur-xl border-white/20"
                  >
                    <DropdownMenuLabel>
                      <div className="flex items-center space-x-3">
                        <Avatar className="h-10 w-10">
                          <AvatarImage src={user.avatar} alt={user.name} />
                          <AvatarFallback className="bg-gradient-to-br from-orange-500 to-violet-500 text-white">
                            {user.name.charAt(0)}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="text-white font-medium">{user.name}</p>
                          <p className="text-white/60 text-sm">{user.email}</p>
                          <Badge
                            className={`mt-1 bg-gradient-to-r ${getPlanColor(user.plan)} text-white text-xs`}
                          >
                            {user.plan.toUpperCase()} PLAN
                          </Badge>
                        </div>
                      </div>
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator className="border-white/20" />

                    <DropdownMenuItem asChild>
                      <Link
                        to="/dashboard"
                        className="flex items-center space-x-2 text-white hover:bg-white/10"
                      >
                        <User className="w-4 h-4" />
                        <span>Dashboard</span>
                      </Link>
                    </DropdownMenuItem>

                    <DropdownMenuItem asChild>
                      <Link
                        to="/profile"
                        className="flex items-center space-x-2 text-white hover:bg-white/10"
                      >
                        <Settings className="w-4 h-4" />
                        <span>Profile Settings</span>
                      </Link>
                    </DropdownMenuItem>

                    {user.plan === "free" && (
                      <DropdownMenuItem asChild>
                        <Link
                          to="/pricing"
                          className="flex items-center space-x-2 text-orange-400 hover:bg-orange-500/10"
                        >
                          <Crown className="w-4 h-4" />
                          <span>Upgrade Plan</span>
                          <Sparkles className="w-3 h-3 ml-auto" />
                        </Link>
                      </DropdownMenuItem>
                    )}

                    <DropdownMenuSeparator className="border-white/20" />

                    <DropdownMenuItem
                      onClick={handleLogout}
                      className="text-red-400 hover:bg-red-500/10"
                    >
                      <LogOut className="w-4 h-4 mr-2" />
                      <span>Sign Out</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </>
            ) : (
              <div className="flex items-center space-x-2">
                <Button
                  variant="ghost"
                  size="sm"
                  asChild
                  className="text-white/70 hover:text-white hover:bg-white/10"
                >
                  <Link to="/login">Sign In</Link>
                </Button>
                <MagneticButton
                  size="sm"
                  asChild
                  className="bg-gradient-to-r from-orange-500 via-pink-500 to-violet-500 hover:opacity-90 text-white"
                >
                  <Link to="/register">Get Started</Link>
                </MagneticButton>
              </div>
            )}

            {/* Mobile Menu Button */}
            <Button
              size="icon"
              variant="ghost"
              className="lg:hidden text-white/70 hover:text-white hover:bg-white/10"
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-slate-900/95 backdrop-blur-xl border-t border-white/10"
          >
            <div className="px-4 py-6 space-y-3">
              {/* Mobile Search */}
              <div className="relative mb-4">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-white/50" />
                <Input
                  type="text"
                  placeholder="Search courses..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 bg-white/10 border-white/20 text-white placeholder:text-white/50"
                />
              </div>

              {/* Mobile Navigation Items */}
              {navigationItems.map((item) => (
                <motion.div
                  key={item.name}
                  whileHover={{ x: 5 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Link
                    to={item.href}
                    className={`flex items-center justify-between p-3 rounded-lg transition-all ${
                      isActive(item.href)
                        ? "bg-gradient-to-r from-orange-500/20 via-pink-500/20 to-violet-500/20 text-white"
                        : "text-white/70 hover:text-white hover:bg-white/10"
                    }`}
                    onClick={() => setIsOpen(false)}
                  >
                    <div className="flex items-center space-x-3">
                      <item.icon className="w-5 h-5" />
                      <div>
                        <p className="font-medium">{item.name}</p>
                        <p className="text-xs text-white/50">
                          {item.description}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center space-x-1">
                      {item.premium && (
                        <Crown className="w-4 h-4 text-purple-400" />
                      )}
                      {item.new && (
                        <Badge className="bg-green-500 text-white text-xs">
                          NEW
                        </Badge>
                      )}
                      {item.hot && (
                        <Badge className="bg-red-500 text-white text-xs animate-pulse">
                          🔥
                        </Badge>
                      )}
                    </div>
                  </Link>
                </motion.div>
              ))}

              {!isAuthenticated && (
                <div className="pt-4 border-t border-white/10 space-y-2">
                  <Button
                    variant="outline"
                    size="sm"
                    asChild
                    className="w-full border-white/20 text-white hover:bg-white/10"
                  >
                    <Link to="/login" onClick={() => setIsOpen(false)}>
                      Sign In
                    </Link>
                  </Button>
                  <Button
                    size="sm"
                    asChild
                    className="w-full bg-gradient-to-r from-orange-500 via-pink-500 to-violet-500 hover:opacity-90 text-white"
                  >
                    <Link to="/register" onClick={() => setIsOpen(false)}>
                      Get Started
                    </Link>
                  </Button>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
