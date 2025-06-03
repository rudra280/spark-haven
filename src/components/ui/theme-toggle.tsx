import React from "react";
import { motion } from "framer-motion";
import { Sun, Moon } from "lucide-react";
import { useTheme } from "@/contexts/ThemeContext";
import { Button } from "@/components/ui/button";

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={toggleTheme}
      className="relative w-12 h-12 p-0 rounded-full border-2 border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600 transition-all duration-300"
      title={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
    >
      <motion.div
        className="relative w-full h-full flex items-center justify-center"
        initial={false}
        animate={{
          rotate: theme === "dark" ? 180 : 0,
        }}
        transition={{
          duration: 0.6,
          ease: "easeInOut",
        }}
      >
        {/* Sun Icon */}
        <motion.div
          className="absolute inset-0 flex items-center justify-center"
          initial={false}
          animate={{
            scale: theme === "light" ? 1 : 0,
            opacity: theme === "light" ? 1 : 0,
            rotate: theme === "light" ? 0 : 180,
          }}
          transition={{
            duration: 0.4,
            ease: "easeInOut",
          }}
        >
          <Sun className="w-5 h-5 text-amber-500" />
        </motion.div>

        {/* Moon Icon */}
        <motion.div
          className="absolute inset-0 flex items-center justify-center"
          initial={false}
          animate={{
            scale: theme === "dark" ? 1 : 0,
            opacity: theme === "dark" ? 1 : 0,
            rotate: theme === "dark" ? 0 : -180,
          }}
          transition={{
            duration: 0.4,
            ease: "easeInOut",
          }}
        >
          <Moon className="w-5 h-5 text-blue-400" />
        </motion.div>
      </motion.div>

      {/* Animated background glow */}
      <motion.div
        className="absolute inset-0 rounded-full"
        initial={false}
        animate={{
          background:
            theme === "light"
              ? "radial-gradient(circle, rgba(245, 158, 11, 0.1) 0%, transparent 70%)"
              : "radial-gradient(circle, rgba(59, 130, 246, 0.1) 0%, transparent 70%)",
        }}
        transition={{
          duration: 0.6,
          ease: "easeInOut",
        }}
      />
    </Button>
  );
}

export function AnimatedThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <motion.button
      onClick={toggleTheme}
      className="relative w-16 h-8 rounded-full p-1 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2"
      style={{
        backgroundColor: theme === "dark" ? "#374151" : "#E5E7EB",
      }}
      whileTap={{ scale: 0.95 }}
    >
      {/* Toggle Background */}
      <motion.div
        className="w-full h-full rounded-full relative overflow-hidden"
        style={{
          background:
            theme === "dark"
              ? "linear-gradient(45deg, #1e293b, #334155)"
              : "linear-gradient(45deg, #e2e8f0, #cbd5e1)",
        }}
      >
        {/* Stars for dark mode */}
        {theme === "dark" && (
          <div className="absolute inset-0">
            <motion.div
              className="absolute w-1 h-1 bg-white rounded-full"
              style={{ top: "20%", left: "20%" }}
              animate={{ opacity: [0.3, 1, 0.3] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
            <motion.div
              className="absolute w-1 h-1 bg-white rounded-full"
              style={{ top: "60%", left: "70%" }}
              animate={{ opacity: [1, 0.3, 1] }}
              transition={{ duration: 2.5, repeat: Infinity }}
            />
          </div>
        )}

        {/* Clouds for light mode */}
        {theme === "light" && (
          <div className="absolute inset-0">
            <motion.div
              className="absolute w-2 h-1 bg-white rounded-full opacity-60"
              style={{ top: "30%", left: "15%" }}
              animate={{ x: [0, 8, 0] }}
              transition={{ duration: 4, repeat: Infinity }}
            />
            <motion.div
              className="absolute w-1.5 h-0.5 bg-white rounded-full opacity-40"
              style={{ top: "60%", left: "60%" }}
              animate={{ x: [0, -6, 0] }}
              transition={{ duration: 3, repeat: Infinity }}
            />
          </div>
        )}
      </motion.div>

      {/* Toggle Switch */}
      <motion.div
        className="absolute top-1 w-6 h-6 rounded-full shadow-lg flex items-center justify-center"
        animate={{
          x: theme === "dark" ? 32 : 0,
          backgroundColor: theme === "dark" ? "#1e293b" : "#ffffff",
        }}
        transition={{
          type: "spring",
          stiffness: 500,
          damping: 30,
        }}
      >
        <motion.div
          animate={{
            scale: theme === "dark" ? 1 : 0,
            opacity: theme === "dark" ? 1 : 0,
          }}
          transition={{ duration: 0.2 }}
        >
          <Moon className="w-3 h-3 text-blue-300" />
        </motion.div>

        <motion.div
          className="absolute"
          animate={{
            scale: theme === "light" ? 1 : 0,
            opacity: theme === "light" ? 1 : 0,
          }}
          transition={{ duration: 0.2 }}
        >
          <Sun className="w-3 h-3 text-amber-500" />
        </motion.div>
      </motion.div>
    </motion.button>
  );
}
