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
    switch (plan?.toLowerCase()) {
      case "pro":
        return "from-blue-500 to-cyan-500";
      case "ultimate":
        return "from-purple-500 to-pink-500";
      default:
        return "from-slate-500 to-slate-600";
    }
  };

  // Safe user data with fallbacks
  const safeUser = user
    ? {
        name: user.name || "User",
        email: user.email || "",
        avatar: user.avatar || "",
        role: user.role || "student",
        plan: user.subscription?.plan || "free",
      }
    : null;

  const getUserInitials = (name: string) => {
    if (!name) return "U";
    return name
      .split(" ")
      .map((word) => word.charAt(0))
      .join("")
      .slice(0, 2)
      .toUpperCase();
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
                  className="w-10 h-10 bg-primary-gradient rounded-xl flex items-center justify-center shadow-lg"
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                >
                  <Globe className="w-6 h-6 text-white" />
                </motion.div>

                {/* Glowing Effect */}
                <div className="absolute inset-0 bg-primary-gradient rounded-xl blur-lg opacity-30 -z-10 group-hover:opacity-50 transition-opacity" />
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
                  className={`nav-link relative px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 group ${
                    isActive(item.href) ? "active" : ""
                  }`}
                >
                  <div className="flex items-center space-x-2">
                    <item.icon className="w-4 h-4" />
                    <span>{item.name}</span>

                    {/* Badges */}
                    {item.premium && (
                      <Badge className="badge-default text-xs px-1.5 py-0.5">
                        <Crown className="w-3 h-3 mr-1" />
                        PRO
                      </Badge>
                    )}
                    {item.new && (
                      <Badge className="bg-green-500 text-white text-xs px-1.5 py-0.5">
                        NEW
                      </Badge>
                    )}
                    {item.hot && (
                      <Badge className="bg-red-500 text-white text-xs px-1.5 py-0.5 animate-pulse">
                        🔥 HOT
                      </Badge>
                    )}
                  </div>

                  {/* Active indicator */}
                  {isActive(item.href) && (
                    <motion.div
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary-gradient"
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
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    type="text"
                    placeholder="Search courses..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="form-input pl-10"
                    onBlur={() => !searchQuery && setShowSearch(false)}
                    autoFocus
                  />
                </motion.div>
              ) : (
                <Button
                  size="icon"
                  variant="ghost"
                  className="btn-ghost"
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

            {isAuthenticated && safeUser ? (
              <>
                {/* Notifications */}
                <Button
                  size="icon"
                  variant="ghost"
                  className="btn-ghost relative"
                >
                  <Bell className="w-4 h-4" />
                  {notifications > 0 && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center text-xs text-white"
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
                      className="btn-ghost relative h-10 px-2"
                    >
                      <div className="flex items-center space-x-2">
                        <Avatar className="h-8 w-8">
                          <AvatarImage
                            src={safeUser.avatar}
                            alt={safeUser.name}
                          />
                          <AvatarFallback className="bg-primary-gradient text-white">
                            {getUserInitials(safeUser.name)}
                          </AvatarFallback>
                        </Avatar>
                        <div className="hidden sm:block text-left">
                          <p className="text-sm font-medium">{safeUser.name}</p>
                          <p className="text-xs text-muted-foreground capitalize">
                            {safeUser.plan} Plan
                          </p>
                        </div>
                        <ChevronDown className="w-4 h-4" />
                      </div>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent
                    align="end"
                    className="dropdown-content w-64"
                  >
                    <DropdownMenuLabel>
                      <div className="flex items-center space-x-3">
                        <Avatar className="h-10 w-10">
                          <AvatarImage
                            src={safeUser.avatar}
                            alt={safeUser.name}
                          />
                          <AvatarFallback className="bg-primary-gradient text-white">
                            {getUserInitials(safeUser.name)}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium">{safeUser.name}</p>
                          <p className="text-muted-foreground text-sm">
                            {safeUser.email}
                          </p>
                          <Badge
                            className={`mt-1 bg-gradient-to-r ${getPlanColor(safeUser.plan)} text-white text-xs`}
                          >
                            {(safeUser.plan || "FREE").toUpperCase()} PLAN
                          </Badge>
                        </div>
                      </div>
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />

                    <DropdownMenuItem asChild>
                      <Link
                        to={
                          safeUser.role === "creator"
                            ? "/creator-dashboard"
                            : safeUser.role === "institution"
                              ? "/institution-dashboard"
                              : "/dashboard"
                        }
                        className="flex items-center space-x-2"
                      >
                        <User className="w-4 h-4" />
                        <span>Dashboard</span>
                      </Link>
                    </DropdownMenuItem>

                    <DropdownMenuItem asChild>
                      <Link
                        to="/profile"
                        className="flex items-center space-x-2"
                      >
                        <Settings className="w-4 h-4" />
                        <span>Profile Settings</span>
                      </Link>
                    </DropdownMenuItem>

                    {safeUser.plan === "free" && (
                      <DropdownMenuItem asChild>
                        <Link
                          to="/pricing"
                          className="flex items-center space-x-2 text-amber-600 dark:text-amber-400"
                        >
                          <Crown className="w-4 h-4" />
                          <span>Upgrade Plan</span>
                          <Sparkles className="w-3 h-3 ml-auto" />
                        </Link>
                      </DropdownMenuItem>
                    )}

                    <DropdownMenuSeparator />

                    <DropdownMenuItem
                      onClick={handleLogout}
                      className="text-destructive focus:text-destructive"
                    >
                      <LogOut className="w-4 h-4 mr-2" />
                      <span>Sign Out</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </>
            ) : (
              <div className="flex items-center space-x-2">
                <Button variant="ghost" size="sm" asChild className="btn-ghost">
                  <Link to="/login">Sign In</Link>
                </Button>
                <MagneticButton size="sm" asChild className="btn-primary">
                  <Link to="/register">Get Started</Link>
                </MagneticButton>
              </div>
            )}

            {/* Mobile Menu Button */}
            <Button
              size="icon"
              variant="ghost"
              className="lg:hidden btn-ghost"
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
            className="lg:hidden glass-card border-t"
          >
            <div className="px-4 py-6 space-y-3">
              {/* Mobile Search */}
              <div className="relative mb-4">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  type="text"
                  placeholder="Search courses..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="form-input pl-10"
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
                        ? "bg-accent text-accent-foreground"
                        : "hover:bg-accent hover:text-accent-foreground"
                    }`}
                    onClick={() => setIsOpen(false)}
                  >
                    <div className="flex items-center space-x-3">
                      <item.icon className="w-5 h-5" />
                      <div>
                        <p className="font-medium">{item.name}</p>
                        <p className="text-xs text-muted-foreground">
                          {item.description}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center space-x-1">
                      {item.premium && (
                        <Crown className="w-4 h-4 text-purple-500" />
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
                <div className="pt-4 border-t space-y-2">
                  <Button
                    variant="outline"
                    size="sm"
                    asChild
                    className="w-full"
                  >
                    <Link to="/login" onClick={() => setIsOpen(false)}>
                      Sign In
                    </Link>
                  </Button>
                  <Button size="sm" asChild className="w-full btn-primary">
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
