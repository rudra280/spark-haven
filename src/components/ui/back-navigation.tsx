import React from "react";
import { motion } from "framer-motion";
import { useNavigate, useLocation } from "react-router-dom";
import { ArrowLeft, Home, ChevronLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";

interface BackNavigationProps {
  variant?: "floating" | "minimal" | "button" | "breadcrumb";
  position?: "top-left" | "top-right" | "bottom-left" | "bottom-right";
  showHome?: boolean;
  customPath?: string;
  className?: string;
}

export function BackNavigation({
  variant = "button",
  position = "top-left",
  showHome = true,
  customPath,
  className = "",
}: BackNavigationProps) {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, isAuthenticated } = useAuth();

  const handleBack = () => {
    if (customPath) {
      navigate(customPath);
      return;
    }

    // Smart back navigation based on auth state and current path
    if (window.history.length > 1) {
      navigate(-1);
    } else {
      // Fallback navigation
      if (isAuthenticated && user) {
        switch (user.role) {
          case "creator":
            navigate("/creator-dashboard");
            break;
          case "institution":
            navigate("/institution-dashboard");
            break;
          default:
            navigate("/dashboard");
        }
      } else {
        navigate("/");
      }
    }
  };

  const handleHome = () => {
    if (isAuthenticated && user) {
      switch (user.role) {
        case "creator":
          navigate("/creator-dashboard");
          break;
        case "institution":
          navigate("/institution-dashboard");
          break;
        default:
          navigate("/dashboard");
      }
    } else {
      navigate("/");
    }
  };

  const getPositionClasses = () => {
    const base = "fixed z-40";
    switch (position) {
      case "top-left":
        return `${base} top-4 left-4`;
      case "top-right":
        return `${base} top-4 right-4`;
      case "bottom-left":
        return `${base} bottom-4 left-4`;
      case "bottom-right":
        return `${base} bottom-4 right-4`;
      default:
        return `${base} top-4 left-4`;
    }
  };

  // Floating variant
  if (variant === "floating") {
    return (
      <motion.div
        className={`${getPositionClasses()} ${className}`}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.2 }}
      >
        <div className="flex items-center space-x-2">
          <motion.button
            onClick={handleBack}
            className="glass-card p-3 rounded-full hover:bg-slate-200/50 dark:hover:bg-slate-700/50 transition-all duration-200 group"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            title="Go back"
          >
            <ArrowLeft className="w-5 h-5 text-slate-600 dark:text-slate-300 group-hover:text-slate-800 dark:group-hover:text-slate-100 transition-colors" />
          </motion.button>

          {showHome && (
            <motion.button
              onClick={handleHome}
              className="glass-card p-3 rounded-full hover:bg-slate-200/50 dark:hover:bg-slate-700/50 transition-all duration-200 group"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              title="Go home"
            >
              <Home className="w-5 h-5 text-slate-600 dark:text-slate-300 group-hover:text-slate-800 dark:group-hover:text-slate-100 transition-colors" />
            </motion.button>
          )}
        </div>
      </motion.div>
    );
  }

  // Minimal variant
  if (variant === "minimal") {
    return (
      <motion.button
        onClick={handleBack}
        className={`fixed top-6 left-6 z-40 p-2 rounded-full bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border border-slate-200 dark:border-slate-700 hover:bg-white dark:hover:bg-slate-800 transition-all duration-200 ${className}`}
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.3 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        title="Go back"
      >
        <ChevronLeft className="w-5 h-5 text-slate-600 dark:text-slate-300" />
      </motion.button>
    );
  }

  // Breadcrumb variant
  if (variant === "breadcrumb") {
    const pathSegments = location.pathname.split("/").filter(Boolean);

    return (
      <motion.nav
        className={`flex items-center space-x-2 text-sm text-slate-600 dark:text-slate-400 ${className}`}
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <button
          onClick={handleHome}
          className="hover:text-slate-800 dark:hover:text-slate-200 transition-colors"
        >
          <Home className="w-4 h-4" />
        </button>

        {pathSegments.map((segment, index) => (
          <React.Fragment key={index}>
            <ChevronLeft className="w-4 h-4 rotate-180" />
            <span className="capitalize">{segment.replace(/-/g, " ")}</span>
          </React.Fragment>
        ))}

        <button
          onClick={handleBack}
          className="ml-4 text-slate-500 hover:text-slate-700 dark:hover:text-slate-300 transition-colors"
          title="Go back"
        >
          <ArrowLeft className="w-4 h-4" />
        </button>
      </motion.nav>
    );
  }

  // Default button variant
  return (
    <motion.div
      className={`inline-flex items-center space-x-2 ${className}`}
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Button
        variant="ghost"
        size="sm"
        onClick={handleBack}
        className="text-slate-600 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800"
      >
        <ArrowLeft className="w-4 h-4 mr-2" />
        Back
      </Button>

      {showHome && (
        <Button
          variant="ghost"
          size="sm"
          onClick={handleHome}
          className="text-slate-600 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800"
        >
          <Home className="w-4 h-4 mr-2" />
          Home
        </Button>
      )}
    </motion.div>
  );
}

// Quick back button for emergency navigation
export function QuickBackButton() {
  return (
    <BackNavigation
      variant="floating"
      position="top-left"
      showHome={true}
      className="no-print"
    />
  );
}

// Page header with back navigation
export function PageHeader({
  title,
  subtitle,
  showBack = true,
  children,
}: {
  title: string;
  subtitle?: string;
  showBack?: boolean;
  children?: React.ReactNode;
}) {
  return (
    <motion.div
      className="mb-8"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <div className="flex items-start justify-between">
        <div className="flex-1">
          {showBack && (
            <div className="mb-4">
              <BackNavigation variant="button" showHome={true} />
            </div>
          )}

          <h1 className="heading-lg text-gradient mb-2">{title}</h1>

          {subtitle && (
            <p className="text-slate-600 dark:text-slate-400 text-lg">
              {subtitle}
            </p>
          )}
        </div>

        {children && (
          <div className="flex items-center space-x-4 ml-8">{children}</div>
        )}
      </div>
    </motion.div>
  );
}
