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

// Page Imports
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

// Quick Loading Component (No more stuck at 0%)
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
        return prev + 25; // 25% increments for fast loading
      });
    }, 200); // Every 200ms

    return () => clearInterval(interval);
  }, []);

  if (progress >= 100) return null;

  return (
    <motion.div
      className="fixed inset-0 z-50 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="text-center">
        <motion.div
          className="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-orange-500 via-pink-500 to-violet-500 rounded-2xl flex items-center justify-center"
          animate={{ scale: [1, 1.1, 1], rotate: [0, 180, 360] }}
          transition={{ duration: 2, repeat: Infinity }}
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
            transition={{ duration: 0.3 }}
          />
        </div>

        <p className="text-white/70 text-sm">{progress}% Complete</p>
      </div>
    </motion.div>
  );
}

// Protected Route with Role-based Redirection
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

// Main App Content
function AppContent() {
  const [isInitialLoading, setIsInitialLoading] = useState(true);
  const { isLoading: authLoading } = useAuth();

  useEffect(() => {
    // Very fast initial loading
    const timer = setTimeout(() => {
      setIsInitialLoading(false);
    }, 800); // Reduced to 800ms for faster loading

    return () => clearTimeout(timer);
  }, []);

  return (
    <Router>
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
              transition={{ duration: 0.5 }}
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

                {/* Student Dashboard */}
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
