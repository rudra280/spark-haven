import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "next-themes";
import { Navigation } from "@/components/layout/Navigation";
import { Footer } from "@/components/layout/Footer";
import { Toaster } from "@/components/ui/sonner";

// Pages
import Index from "@/pages/Index";
import Courses from "@/pages/Courses";
import AITutor from "@/pages/AITutor";
import VideoStudio from "@/pages/VideoStudio";
import Tutors from "@/pages/Tutors";
import Login from "@/pages/auth/Login";
import Register from "@/pages/auth/Register";
import NotFound from "@/pages/NotFound";

import "./App.css";

function App() {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <BrowserRouter>
        <div className="min-h-screen flex flex-col">
          <Navigation />
          <main className="flex-1">
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/courses" element={<Courses />} />
              <Route path="/discover" element={<Courses />} />
              <Route path="/features" element={<Courses />} />
              <Route path="/ai-tutor" element={<AITutor />} />
              <Route path="/video-studio" element={<VideoStudio />} />
              <Route path="/tutors" element={<Tutors />} />
              <Route path="/tutoring" element={<Tutors />} />
              <Route path="/pricing" element={<Index />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>
          <Footer />
        </div>
        <Toaster />
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
