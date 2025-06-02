import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { CursorEffects } from "@/components/ui/cursor-effects";
import { AuthProvider, useAuth } from "@/contexts/AuthContext";
import { Navigation } from "@/components/layout/Navigation";
import { Footer } from "@/components/layout/Footer";

// Page Imports
import Index from "@/pages/Index";
import Login from "@/pages/auth/Login";
import Register from "@/pages/auth/Register";
import Dashboard from "@/pages/Dashboard";
import Courses from "@/pages/Courses";
import StudyMaterials from "@/pages/StudyMaterials";
import AIVideoHub from "@/pages/AIVideoHub";
import EduReels from "@/pages/EduReels";
import VideoUpload from "@/pages/VideoUpload";
import LocalTutors from "@/pages/LocalTutors";
import StudentTeacherConnect from "@/pages/StudentTeacherConnect";
import AITutor from "@/pages/AITutor";
import TutorBooking from "@/pages/TutorBooking";
import Pricing from "@/pages/Pricing";

// Professional Loading Screen Component
function LoadingScreen() {
  const [progress, setProgress] = useState(0);
  const [loadingText, setLoadingText] = useState("Initializing LEARNVERSE...");

  useEffect(() => {
    const texts = [
      "Initializing LEARNVERSE...",
      "Loading AI Engine...",
      "Connecting to Knowledge Base...",
      "Preparing Your Experience...",
      "Almost Ready!",
    ];

    let currentTextIndex = 0;
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        const newProgress = prev + Math.random() * 15;
        if (newProgress >= 100) {
          clearInterval(progressInterval);
          return 100;
        }

        // Update loading text based on progress
        const textIndex = Math.floor((newProgress / 100) * texts.length);
        if (textIndex !== currentTextIndex && textIndex < texts.length) {
          currentTextIndex = textIndex;
          setLoadingText(texts[textIndex]);
        }

        return newProgress;
      });
    }, 200);

    return () => clearInterval(progressInterval);
  }, []);

  return (
    <motion.div
      className="fixed inset-0 z-50 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8 }}
    >
      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-orange-500/20 via-pink-500/20 to-violet-500/20 bg-[length:400%_400%] animate-gradient" />

      {/* Grid Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.1)_1px,transparent_1px)] bg-[size:50px_50px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_110%)]" />

      <div className="relative z-10 text-center">
        {/* Logo */}
        <motion.div
          className="w-24 h-24 mx-auto mb-8 bg-gradient-to-br from-orange-500 via-pink-500 to-violet-500 rounded-3xl flex items-center justify-center"
          animate={{
            scale: [1, 1.1, 1],
            rotate: [0, 360],
          }}
          transition={{
            scale: { duration: 2, repeat: Infinity },
            rotate: { duration: 4, repeat: Infinity, ease: "linear" },
          }}
        >
          <span className="text-3xl font-bold text-white">🌍</span>
        </motion.div>

        {/* Brand Name */}
        <motion.h1
          className="text-4xl font-bold bg-gradient-to-r from-orange-500 via-pink-500 to-violet-500 bg-clip-text text-transparent mb-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          LEARNVERSE
        </motion.h1>

        {/* Loading Text */}
        <motion.p
          className="text-white/70 mb-8 text-lg"
          key={loadingText}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          {loadingText}
        </motion.p>

        {/* Progress Bar */}
        <div className="w-80 h-2 bg-white/10 rounded-full overflow-hidden mx-auto mb-4">
          <motion.div
            className="h-full bg-gradient-to-r from-orange-500 via-pink-500 to-violet-500"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.3 }}
          />
        </div>

        {/* Progress Percentage */}
        <motion.p
          className="text-white/50 text-sm"
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          {Math.floor(progress)}%
        </motion.p>

        {/* Floating Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 bg-gradient-to-r from-orange-500 via-pink-500 to-violet-500 rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [0, -20, 0],
                opacity: [0.3, 1, 0.3],
                scale: [1, 1.2, 1],
              }}
              transition={{
                duration: 2 + Math.random() * 2,
                repeat: Infinity,
                delay: Math.random() * 2,
              }}
            />
          ))}
        </div>
      </div>
    </motion.div>
  );
}

// Protected Route Component
function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return <LoadingScreen />;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
}

// Main App Content Component
function AppContent() {
  const [isInitialLoading, setIsInitialLoading] = useState(true);
  const { isLoading: authLoading } = useAuth();

  useEffect(() => {
    // Simulate initial app loading - much faster
    const timer = setTimeout(() => {
      setIsInitialLoading(false);
    }, 1000); // Reduced from 3000ms to 1000ms

    return () => clearTimeout(timer);
  }, []);

  return (
    <Router>
      <CursorEffects>
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white">
          {/* Progress Indicator */}
          <div className="fixed top-0 left-0 right-0 z-50 h-1 bg-gradient-to-r from-orange-500 via-pink-500 to-violet-500 origin-left scale-x-0 progress-indicator" />

          <AnimatePresence mode="wait">
            {(isInitialLoading || authLoading) && <LoadingScreen />}
          </AnimatePresence>

          {!isInitialLoading && !authLoading && (
            <motion.div
              className="page-transition"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6 }}
            >
              <Routes>
                {/* Public Routes */}
                <Route
                  path="/"
                  element={
                    <>
                      <Navigation />
                      <Index />
                      <Footer />
                    </>
                  }
                />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route
                  path="/courses"
                  element={
                    <>
                      <Navigation />
                      <Courses />
                      <Footer />
                    </>
                  }
                />
                <Route
                  path="/pricing"
                  element={
                    <>
                      <Navigation />
                      <Pricing />
                      <Footer />
                    </>
                  }
                />

                {/* Special Routes (No Navigation) */}
                <Route path="/reels" element={<EduReels />} />

                {/* Protected Routes */}
                <Route
                  path="/dashboard"
                  element={
                    <ProtectedRoute>
                      <Navigation />
                      <Dashboard />
                      <Footer />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/study-materials"
                  element={
                    <ProtectedRoute>
                      <Navigation />
                      <StudyMaterials />
                      <Footer />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/ai-video-hub"
                  element={
                    <ProtectedRoute>
                      <Navigation />
                      <AIVideoHub />
                      <Footer />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/video-upload"
                  element={
                    <ProtectedRoute>
                      <Navigation />
                      <VideoUpload />
                      <Footer />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/local-tutors"
                  element={
                    <ProtectedRoute>
                      <Navigation />
                      <LocalTutors />
                      <Footer />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/student-teacher-connect"
                  element={
                    <ProtectedRoute>
                      <Navigation />
                      <StudentTeacherConnect />
                      <Footer />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/ai-tutor"
                  element={
                    <ProtectedRoute>
                      <Navigation />
                      <AITutor />
                      <Footer />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/tutor-booking"
                  element={
                    <ProtectedRoute>
                      <Navigation />
                      <TutorBooking />
                      <Footer />
                    </ProtectedRoute>
                  }
                />

                {/* Fallback */}
                <Route path="*" element={<Navigate to="/" replace />} />
              </Routes>
            </motion.div>
          )}
        </div>
      </CursorEffects>
    </Router>
  );
}

// Main App Component
export default function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}
