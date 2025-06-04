import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { AuthProvider, useAuth } from "@/contexts/AuthContext";
import { ThemeProvider } from "@/contexts/ThemeContext";
import { Navigation } from "@/components/layout/Navigation";
import { Footer } from "@/components/layout/Footer";
import { CursorEffects } from "@/components/ui/cursor-effects";
import { QuickBackButton } from "@/components/ui/back-navigation";

// Import all pages
import Index from "@/pages/Index";
import Login from "@/pages/auth/Login";
import Register from "@/pages/auth/Register";
import Dashboard from "@/pages/Dashboard";
import CreatorDashboard from "@/pages/CreatorDashboard";
import InstitutionDashboard from "@/pages/InstitutionDashboard";
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
import Profile from "@/pages/Profile";
import NotFound from "@/pages/NotFound";

// Professional Loading Component with Modern Design
function ModernLoader() {
  const [progress, setProgress] = useState(0);
  const [loadingText, setLoadingText] = useState("Initializing platform...");
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    const loadingSteps = [
      { progress: 20, text: "Loading AI systems..." },
      { progress: 40, text: "Connecting to educational database..." },
      { progress: 60, text: "Setting up video streaming..." },
      { progress: 80, text: "Preparing your dashboard..." },
      { progress: 95, text: "Almost ready..." },
      { progress: 100, text: "Welcome to LearnVerse!" },
    ];

    let currentStep = 0;
    const interval = setInterval(() => {
      if (currentStep < loadingSteps.length) {
        const step = loadingSteps[currentStep];
        setProgress(step.progress);
        setLoadingText(step.text);
        currentStep++;

        // Auto-complete on final step
        if (currentStep === loadingSteps.length) {
          setTimeout(() => {
            setIsComplete(true);
            clearInterval(interval);
          }, 300);
        }
      }
    }, 150); // Faster loading - 150ms per step

    return () => clearInterval(interval);
  }, []);

  if (isComplete) return null;

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center"
      style={{
        background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
      }}
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="text-center max-w-md mx-auto px-6">
        {/* Modern Logo */}
        <motion.div
          className="w-20 h-20 mx-auto mb-8 rounded-2xl flex items-center justify-center shadow-2xl"
          style={{
            background: "linear-gradient(135deg, #ff6b6b, #4ecdc4, #45b7d1)",
            boxShadow: "0 20px 40px rgba(0,0,0,0.15)",
          }}
          animate={{
            scale: [1, 1.05, 1],
            rotate: [0, 5, -5, 0],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <span className="text-3xl">🚀</span>
        </motion.div>

        {/* Brand */}
        <motion.h1
          className="text-4xl font-bold text-white mb-2"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          LearnVerse
        </motion.h1>

        <motion.p
          className="text-white/80 text-sm mb-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          Your Ultimate Learning Destination
        </motion.p>

        {/* Modern Progress Bar */}
        <div className="w-full max-w-xs mx-auto mb-6">
          <div className="h-2 bg-white/20 rounded-full overflow-hidden backdrop-blur-sm">
            <motion.div
              className="h-full rounded-full"
              style={{
                background: "linear-gradient(90deg, #ff6b6b, #4ecdc4, #45b7d1)",
                boxShadow: "0 0 10px rgba(255,255,255,0.5)",
              }}
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.3, ease: "easeOut" }}
            />
          </div>
        </div>

        {/* Loading Text */}
        <motion.p
          className="text-white/90 text-sm mb-2"
          key={loadingText}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          {loadingText}
        </motion.p>

        <p className="text-white/70 text-xs">{progress}% Complete</p>

        {/* Loading Dots */}
        <div className="flex justify-center space-x-1 mt-4">
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              className="w-2 h-2 bg-white/60 rounded-full"
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.6, 1, 0.6],
              }}
              transition={{
                duration: 1,
                repeat: Infinity,
                delay: i * 0.2,
              }}
            />
          ))}
        </div>
      </div>
    </motion.div>
  );
}

// Protected Route Component
function ProtectedRoute({
  children,
  requiredRole,
}: {
  children: React.ReactNode;
  requiredRole?: "student" | "creator" | "institution";
}) {
  const { isAuthenticated, user, isLoading } = useAuth();

  if (isLoading) {
    return <ModernLoader />;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // Role-based redirection
  if (requiredRole && user?.role !== requiredRole) {
    switch (user?.role) {
      case "creator":
        return <Navigate to="/creator-dashboard" replace />;
      case "institution":
        return <Navigate to="/institution-dashboard" replace />;
      default:
        return <Navigate to="/dashboard" replace />;
    }
  }

  return <>{children}</>;
}

// Enhanced Error Boundary
class ErrorBoundary extends React.Component<
  { children: React.ReactNode },
  { hasError: boolean; error?: Error }
> {
  constructor(props: { children: React.ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error("Application Error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div
          className="min-h-screen flex items-center justify-center p-4"
          style={{
            background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
          }}
        >
          <div className="text-center max-w-md mx-auto text-white">
            <motion.div
              className="w-16 h-16 mx-auto mb-6 bg-red-500/20 rounded-full flex items-center justify-center"
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <span className="text-2xl">⚠️</span>
            </motion.div>

            <h1 className="text-2xl font-bold mb-4">
              Oops! Something went wrong
            </h1>

            <p className="text-white/80 mb-6">
              Don't worry, we're fixing this. Please refresh to try again.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <button
                onClick={() => window.location.reload()}
                className="px-6 py-3 bg-white/20 backdrop-blur-sm rounded-lg font-medium hover:bg-white/30 transition-all"
              >
                Refresh App
              </button>

              <button
                onClick={() => (window.location.href = "/")}
                className="px-6 py-3 bg-gradient-to-r from-red-500 to-pink-500 rounded-lg font-medium hover:opacity-90 transition-all"
              >
                Go Home
              </button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

// Main App Content
function AppContent() {
  const [isInitialLoading, setIsInitialLoading] = useState(false); // No loading screen
  const { isLoading: authLoading, isAuthenticated } = useAuth();

  // Instant access - no loading delays
  const showLoading = false; // Always false for instant access

  return (
    <Router>
      <ErrorBoundary>
        <CursorEffects>
          <div
            className="min-h-screen text-slate-800"
            style={{
              background: "linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)",
            }}
          >
            {/* No loading screen - instant access */}
            {
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                {/* Back navigation for authenticated users */}
                {isAuthenticated && <QuickBackButton />}

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

                  {/* Special Routes */}
                  <Route
                    path="/reels"
                    element={
                      <>
                        <EduReels />
                      </>
                    }
                  />

                  {/* Role-based Dashboards */}
                  <Route
                    path="/dashboard"
                    element={
                      <ProtectedRoute requiredRole="student">
                        <Navigation />
                        <Dashboard />
                        <Footer />
                      </ProtectedRoute>
                    }
                  />

                  <Route
                    path="/creator-dashboard"
                    element={
                      <ProtectedRoute requiredRole="creator">
                        <Navigation />
                        <CreatorDashboard />
                        <Footer />
                      </ProtectedRoute>
                    }
                  />

                  <Route
                    path="/institution-dashboard"
                    element={
                      <ProtectedRoute requiredRole="institution">
                        <Navigation />
                        <InstitutionDashboard />
                        <Footer />
                      </ProtectedRoute>
                    }
                  />

                  {/* Protected Routes */}
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

                  <Route
                    path="/profile"
                    element={
                      <ProtectedRoute>
                        <Navigation />
                        <Profile />
                        <Footer />
                      </ProtectedRoute>
                    }
                  />

                  {/* 404 Page */}
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </motion.div>
            }
          </div>
        </CursorEffects>
      </ErrorBoundary>
    </Router>
  );
}

// Main App Component
export default function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider>
        <AuthProvider>
          <AppContent />
        </AuthProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}
