import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { AuthProvider, useAuth } from "@/contexts/AuthContext";
import { Navigation } from "@/components/layout/Navigation";
import { Footer } from "@/components/layout/Footer";
import { CursorEffects } from "@/components/ui/cursor-effects";

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
import NotFound from "@/pages/NotFound";

// Fast Loading Component (No more stuck at 0%)
function QuickLoader() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Fast, realistic loading
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 33; // Fast increments for quick loading
      });
    }, 150); // Every 150ms for super fast loading

    return () => clearInterval(interval);
  }, []);

  if (progress >= 100) return null;

  return (
    <motion.div
      className="fixed inset-0 z-50 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="text-center">
        <motion.div
          className="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-orange-500 via-pink-500 to-violet-500 rounded-2xl flex items-center justify-center"
          animate={{ scale: [1, 1.1, 1], rotate: [0, 180, 360] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          <span className="text-2xl">🌍</span>
        </motion.div>

        <h1 className="text-3xl font-bold bg-gradient-to-r from-orange-500 via-pink-500 to-violet-500 bg-clip-text text-transparent mb-4">
          LEARNVERSE
        </h1>

        <div className="w-64 h-2 bg-white/10 rounded-full overflow-hidden mx-auto mb-2">
          <motion.div
            className="h-full bg-gradient-to-r from-orange-500 via-pink-500 to-violet-500"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.2 }}
          />
        </div>

        <p className="text-white/70 text-sm">{progress}% Loading...</p>
        <p className="text-white/50 text-xs mt-1">
          Professional Platform Ready
        </p>
      </div>
    </motion.div>
  );
}

// Protected Route with Enhanced Role-based Redirection
function ProtectedRoute({
  children,
  requiredRole,
}: {
  children: React.ReactNode;
  requiredRole?: "student" | "creator" | "institution";
}) {
  const { isAuthenticated, user, isLoading } = useAuth();

  if (isLoading) {
    return <QuickLoader />;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // Role-based dashboard routing
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

// Error Boundary Component
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
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center p-4">
          <div className="text-center text-white">
            <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-red-500 to-pink-500 bg-clip-text text-transparent">
              Oops! Something went wrong
            </h1>
            <p className="mb-6 text-white/70">
              Don't worry, we're fixing this. Please refresh the page.
            </p>
            <button
              onClick={() => window.location.reload()}
              className="px-6 py-3 bg-gradient-to-r from-orange-500 via-pink-500 to-violet-500 rounded-lg text-white font-semibold hover:opacity-90 transition-opacity"
            >
              Refresh Page
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

// Main App Content
function AppContent() {
  const [isInitialLoading, setIsInitialLoading] = useState(true);
  const { isLoading: authLoading } = useAuth();

  useEffect(() => {
    // Super fast initial loading
    const timer = setTimeout(() => {
      setIsInitialLoading(false);
    }, 500); // Reduced to 500ms for instant loading

    return () => clearTimeout(timer);
  }, []);

  return (
    <Router>
      <ErrorBoundary>
        <CursorEffects>
          <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white">
            <AnimatePresence mode="wait">
              {(isInitialLoading || authLoading) && <QuickLoader />}
            </AnimatePresence>

            {!isInitialLoading && !authLoading && (
              <motion.div
                className="page-transition"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
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

                  {/* Student Dashboard (Default) */}
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

                  {/* Creator Dashboard */}
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

                  {/* Institution Dashboard */}
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

                  {/* 404 Page */}
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </motion.div>
            )}
          </div>
        </CursorEffects>
      </ErrorBoundary>
    </Router>
  );
}

// Main App Component with Error Handling
export default function App() {
  return (
    <ErrorBoundary>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </ErrorBoundary>
  );
}
