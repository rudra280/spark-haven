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
import NotFound from "@/pages/NotFound";

// Fast Loading Component with immediate progress
function QuickLoader() {
  const [progress, setProgress] = useState(0);
  const [loadingText, setLoadingText] = useState("Initializing...");

  useEffect(() => {
    const loadingSteps = [
      { progress: 25, text: "Loading user data..." },
      { progress: 50, text: "Setting up workspace..." },
      { progress: 75, text: "Finalizing setup..." },
      { progress: 100, text: "Ready!" },
    ];

    let currentStep = 0;
    const interval = setInterval(() => {
      if (currentStep < loadingSteps.length) {
        const step = loadingSteps[currentStep];
        setProgress(step.progress);
        setLoadingText(step.text);
        currentStep++;
      } else {
        clearInterval(interval);
      }
    }, 250); // Very fast loading

    return () => clearInterval(interval);
  }, []);

  if (progress >= 100) return null;

  return (
    <motion.div
      className="fixed inset-0 z-50 bg-white flex items-center justify-center"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="text-center max-w-md mx-auto px-6">
        {/* Professional Logo */}
        <motion.div
          className="w-16 h-16 mx-auto mb-6 bg-gradient-to-br from-slate-600 to-slate-800 rounded-xl flex items-center justify-center shadow-lg"
          animate={{
            scale: [1, 1.02, 1],
            rotate: [0, 2, -2, 0],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <span className="text-2xl text-white">🌍</span>
        </motion.div>

        {/* Brand */}
        <h1 className="text-2xl font-bold text-slate-800 mb-6">LEARNVERSE</h1>

        {/* Progress Bar */}
        <div className="w-full max-w-xs mx-auto mb-4">
          <div className="h-2 bg-slate-200 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-slate-600 to-slate-800"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.3, ease: "easeOut" }}
            />
          </div>
        </div>

        {/* Loading Text */}
        <motion.p
          className="text-slate-600 text-sm mb-2"
          key={loadingText}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.2 }}
        >
          {loadingText}
        </motion.p>

        <p className="text-slate-500 text-xs">{progress}% Complete</p>
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
    return <QuickLoader />;
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

// Error Boundary
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
        <div className="min-h-screen bg-white flex items-center justify-center p-4">
          <div className="text-center max-w-md mx-auto">
            <div className="w-16 h-16 mx-auto mb-6 bg-red-100 rounded-full flex items-center justify-center">
              <span className="text-2xl">⚠️</span>
            </div>

            <h1 className="text-2xl font-bold text-slate-800 mb-4">
              Something went wrong
            </h1>

            <p className="text-slate-600 mb-6">
              We're sorry for the inconvenience. Please refresh the page to try
              again.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <button
                onClick={() => window.location.reload()}
                className="px-6 py-3 bg-slate-800 text-white rounded-lg font-medium hover:bg-slate-700 transition-colors"
              >
                Refresh Page
              </button>

              <button
                onClick={() => (window.location.href = "/")}
                className="px-6 py-3 bg-slate-200 text-slate-800 rounded-lg font-medium hover:bg-slate-300 transition-colors"
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
  const [isInitialLoading, setIsInitialLoading] = useState(true);
  const { isLoading: authLoading, isAuthenticated } = useAuth();

  useEffect(() => {
    // Quick initial loading - no more stuck loading
    const timer = setTimeout(() => {
      setIsInitialLoading(false);
    }, 1000); // 1 second max

    return () => clearTimeout(timer);
  }, []);

  const showLoading = isInitialLoading || authLoading;

  return (
    <Router>
      <ErrorBoundary>
        <CursorEffects>
          <div className="min-h-screen bg-white text-slate-900">
            <AnimatePresence mode="wait">
              {showLoading && <QuickLoader />}
            </AnimatePresence>

            {!showLoading && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
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
                  <Route path="/reels" element={<EduReels />} />

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
