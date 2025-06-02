import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  Home,
  Search,
  ArrowLeft,
  BookOpen,
  Video,
  TrendingUp,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PageRouter } from "@/components/layout/PageRouter";
import { QuickBackButton } from "@/components/ui/back-navigation";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center p-4">
      <QuickBackButton />

      <div className="text-center max-w-4xl mx-auto">
        {/* 404 Animation */}
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: "back.out(1.7)" }}
          className="mb-8"
        >
          <div className="text-9xl font-bold bg-gradient-to-r from-orange-500 via-pink-500 to-violet-500 bg-clip-text text-transparent mb-4">
            404
          </div>
          <h1 className="text-4xl font-bold text-white mb-4">
            Oops! Page Not Found
          </h1>
          <p className="text-xl text-white/70 mb-8">
            The page you're looking for seems to have wandered off into the
            learning universe! 🌌
          </p>
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="flex flex-wrap justify-center gap-4 mb-12"
        >
          <Link to="/">
            <Button className="bg-gradient-to-r from-blue-500 to-cyan-500 hover:opacity-90">
              <Home className="w-5 h-5 mr-2" />
              Go Home
            </Button>
          </Link>

          <Link to="/courses">
            <Button className="bg-gradient-to-r from-green-500 to-emerald-500 hover:opacity-90">
              <BookOpen className="w-5 h-5 mr-2" />
              Browse Courses
            </Button>
          </Link>

          <Link to="/reels">
            <Button className="bg-gradient-to-r from-pink-500 to-rose-500 hover:opacity-90">
              <TrendingUp className="w-5 h-5 mr-2" />
              Watch EduReels
            </Button>
          </Link>

          <Link to="/ai-video-hub">
            <Button className="bg-gradient-to-r from-purple-500 to-violet-500 hover:opacity-90">
              <Video className="w-5 h-5 mr-2" />
              AI Videos
            </Button>
          </Link>
        </motion.div>

        {/* Suggestions */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mb-12"
        >
          <Card className="bg-white/10 backdrop-blur-xl border-white/20">
            <CardHeader>
              <CardTitle className="text-white text-center">
                🚀 Popular Destinations
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Link to="/dashboard" className="block">
                  <div className="p-4 rounded-lg bg-gradient-to-br from-purple-500/20 to-pink-500/20 hover:from-purple-500/30 hover:to-pink-500/30 transition-all border border-white/10">
                    <h3 className="text-white font-semibold">📊 Dashboard</h3>
                    <p className="text-white/70 text-sm">
                      Your learning progress
                    </p>
                  </div>
                </Link>

                <Link to="/ai-tutor" className="block">
                  <div className="p-4 rounded-lg bg-gradient-to-br from-cyan-500/20 to-blue-500/20 hover:from-cyan-500/30 hover:to-blue-500/30 transition-all border border-white/10">
                    <h3 className="text-white font-semibold">🤖 AI Tutor</h3>
                    <p className="text-white/70 text-sm">Get instant help</p>
                  </div>
                </Link>

                <Link to="/local-tutors" className="block">
                  <div className="p-4 rounded-lg bg-gradient-to-br from-emerald-500/20 to-teal-500/20 hover:from-emerald-500/30 hover:to-teal-500/30 transition-all border border-white/10">
                    <h3 className="text-white font-semibold">
                      👨‍🏫 Local Tutors
                    </h3>
                    <p className="text-white/70 text-sm">
                      Find nearby teachers
                    </p>
                  </div>
                </Link>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* All Pages Navigation */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
        >
          <PageRouter showAll={true} />
        </motion.div>

        {/* Fun Message */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="mt-12 text-white/50 text-sm"
        >
          <p>
            Lost in the vastness of knowledge? That's okay, we've all been
            there! 🧭
          </p>
        </motion.div>
      </div>
    </div>
  );
}
