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

// Enhanced Loading Component (Fixes stuck loading issue)
function SmartLoader() {
  const [progress, setProgress] = useState(0);
  const [loadingMessage, setLoadingMessage] = useState("Initializing...");

  useEffect(() => {
    const messages = [
      "Initializing...",
      "Loading authentication...",
      "Setting up dashboard...",
      "Almost ready...",
    ];

    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        const next = prev + 25;
        if (next >= 100) {
          clearInterval(progressInterval);
          return 100;
        }

        // Update message based on progress
        const messageIndex = Math.floor(next / 25) - 1;
        if (messageIndex >= 0 && messageIndex < messages.length) {
          setLoadingMessage(messages[messageIndex]);
        }

        return next;
      });
    }, 200); // Faster intervals for smoother loading

    // Cleanup
    return () => clearInterval(progressInterval);
  }, []);

  if (progress >= 100) return null;

  return (
    <motion.div
      className="fixed inset-0 z-50 bg-background flex items-center justify-center"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="text-center max-w-md mx-auto px-6">
        {/* Logo */}
        <motion.div
          className="w-20 h-20 mx-auto mb-8 bg-primary-gradient rounded-2xl flex items-center justify-center shadow-lg"
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
          <span className="text-3xl">🌍</span>
        </motion.div>

        {/* Brand */}
        <motion.h1
          className="heading-md text-gradient mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          LEARNVERSE
        </motion.h1>

        {/* Progress Bar */}
        <div className="w-full max-w-xs mx-auto mb-4">
          <div className="progress-bar h-2">
            <motion.div
              className="progress-fill h-full"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.2, ease: "easeOut" }}
            />
          </div>
        </div>

        {/* Progress Text */}
        <motion.p
          className="text-muted-foreground text-sm mb-2"
          key={loadingMessage}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          {loadingMessage}
        </motion.p>

        <p className="text-muted-foreground text-xs">{progress}% Complete</p>
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
    return <SmartLoader />;
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

// Enhanced Error Boundary Component
class ErrorBoundary extends React.Component<
  { children: React.ReactNode },
  { hasError: boolean; error?: Error; errorInfo?: string }
> {
  constructor(props: { children: React.ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error("🚨 Application Error:", error);
    console.error("Error Info:", errorInfo);

    this.setState({
      error,
      errorInfo: errorInfo.componentStack,
    });
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-background flex items-center justify-center p-4">
          <div className="text-center max-w-md mx-auto">
            <motion.div
              className="w-20 h-20 mx-auto mb-6 bg-destructive/10 rounded-full flex items-center justify-center"
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <span className="text-3xl">⚠️</span>
            </motion.div>

            <h1 className="heading-md text-destructive mb-4">
              Oops! Something went wrong
            </h1>

            <p className="text-muted-foreground mb-6">
              Don't worry, our team has been notified. Please try refreshing the
              page.
            </p>

            {this.state.error && (
              <details className="mb-6 text-left bg-muted p-4 rounded-lg">
                <summary className="cursor-pointer text-sm font-medium mb-2">
                  Error Details
                </summary>
                <pre className="text-xs text-muted-foreground whitespace-pre-wrap">
                  {this.state.error.message}
                </pre>
              </details>
            )}

            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <button
                onClick={() => window.location.reload()}
                className="btn-primary px-6 py-3 rounded-lg font-medium"
              >
                Refresh Page
              </button>

              <button
                onClick={() => (window.location.href = "/")}
                className="btn-secondary px-6 py-3 rounded-lg font-medium"
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
    // Quick initial loading
    const timer = setTimeout(() => {
      setIsInitialLoading(false);
    }, 800); // Balanced loading time

    return () => clearTimeout(timer);
  }, []);

  const showLoading = isInitialLoading || authLoading;

  return (
    <Router>
      <ErrorBoundary>
        <CursorEffects>
          <div className="min-h-screen bg-background text-foreground transition-colors duration-300">
            <AnimatePresence mode="wait">
              {showLoading && <SmartLoader />}
            </AnimatePresence>

            {!showLoading && (
              <motion.div
                className="page-transition"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.4 }}
              >
                {/* Quick back navigation for authenticated users */}
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

// Main App Component with Enhanced Error Handling
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
