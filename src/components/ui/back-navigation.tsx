import React from "react";
import { motion } from "framer-motion";
import { useNavigate, useLocation } from "react-router-dom";
import { ArrowLeft, Home, X } from "lucide-react";
import { Button } from "@/components/ui/button";

interface BackNavigationProps {
  variant?: "button" | "floating" | "minimal";
  showHome?: boolean;
  className?: string;
  position?: "top-left" | "top-right" | "bottom-left" | "bottom-right";
}

export function BackNavigation({
  variant = "button",
  showHome = true,
  className = "",
  position = "top-left",
}: BackNavigationProps) {
  const navigate = useNavigate();
  const location = useLocation();

  const handleBack = () => {
    // Check if there's history to go back to
    if (window.history.length > 1) {
      navigate(-1);
    } else {
      // If no history, go to home
      navigate("/");
    }
  };

  const handleHome = () => {
    navigate("/");
  };

  const getPositionClasses = () => {
    switch (position) {
      case "top-left":
        return "top-4 left-4";
      case "top-right":
        return "top-4 right-4";
      case "bottom-left":
        return "bottom-4 left-4";
      case "bottom-right":
        return "bottom-4 right-4";
      default:
        return "top-4 left-4";
    }
  };

  // Don't show on home page
  if (location.pathname === "/") {
    return null;
  }

  if (variant === "floating") {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        className={`fixed ${getPositionClasses()} z-50 flex gap-2 ${className}`}
      >
        <Button
          size="icon"
          variant="secondary"
          className="w-12 h-12 rounded-full bg-black/20 backdrop-blur-xl border border-white/20 text-white hover:bg-black/40 transition-all duration-300"
          onClick={handleBack}
        >
          <ArrowLeft className="w-5 h-5" />
        </Button>

        {showHome && (
          <Button
            size="icon"
            variant="secondary"
            className="w-12 h-12 rounded-full bg-black/20 backdrop-blur-xl border border-white/20 text-white hover:bg-black/40 transition-all duration-300"
            onClick={handleHome}
          >
            <Home className="w-5 h-5" />
          </Button>
        )}
      </motion.div>
    );
  }

  if (variant === "minimal") {
    return (
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        className={`inline-flex items-center gap-2 ${className}`}
      >
        <Button
          size="sm"
          variant="ghost"
          className="text-white/70 hover:text-white hover:bg-white/10"
          onClick={handleBack}
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back
        </Button>

        {showHome && (
          <Button
            size="sm"
            variant="ghost"
            className="text-white/70 hover:text-white hover:bg-white/10"
            onClick={handleHome}
          >
            <Home className="w-4 h-4 mr-2" />
            Home
          </Button>
        )}
      </motion.div>
    );
  }

  // Default button variant
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`flex items-center gap-3 ${className}`}
    >
      <Button
        variant="outline"
        size="sm"
        className="border-white/20 bg-white/5 text-white hover:bg-white/10"
        onClick={handleBack}
      >
        <ArrowLeft className="w-4 h-4 mr-2" />
        Back
      </Button>

      {showHome && (
        <Button
          variant="outline"
          size="sm"
          className="border-white/20 bg-white/5 text-white hover:bg-white/10"
          onClick={handleHome}
        >
          <Home className="w-4 h-4 mr-2" />
          Home
        </Button>
      )}
    </motion.div>
  );
}

// Quick Back Button - Minimal floating version
export function QuickBackButton({ className = "" }: { className?: string }) {
  return (
    <BackNavigation
      variant="floating"
      position="top-left"
      showHome={true}
      className={className}
    />
  );
}

// Page Header with Back Button
export function PageHeader({
  title,
  subtitle,
  children,
  showBack = true,
  className = "",
}: {
  title: string;
  subtitle?: string;
  children?: React.ReactNode;
  showBack?: boolean;
  className?: string;
}) {
  return (
    <div className={`space-y-4 ${className}`}>
      {showBack && <BackNavigation variant="minimal" showHome={true} />}

      <div className="space-y-2">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-orange-500 via-pink-500 to-violet-500 bg-clip-text text-transparent">
          {title}
        </h1>
        {subtitle && <p className="text-white/70 text-lg">{subtitle}</p>}
      </div>

      {children}
    </div>
  );
}
