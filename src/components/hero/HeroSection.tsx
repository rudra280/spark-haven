import React from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Play, Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import { FloatingElements } from "@/components/3d/FloatingElements";

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-background via-background to-muted/30">
      {/* Floating 3D Elements */}
      <FloatingElements />

      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/5 via-purple-500/5 to-pink-500/5" />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="inline-flex items-center mb-6"
          >
            <Badge className="bg-gradient-to-r from-orange-500 via-pink-500 to-violet-500 text-white border-0 px-4 py-2">
              <Sparkles className="w-4 h-4 mr-2" />
              🌍 Global Knowledge Platform - Every Subject, Everywhere
            </Badge>
          </motion.div>

          {/* Main Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6"
          >
            <span className="block">Master Everything with</span>
            <span className="block bg-gradient-to-r from-orange-500 via-pink-500 to-violet-500 bg-clip-text text-transparent">
              Universal Learning
            </span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto mb-8 leading-relaxed"
          >
            From quantum physics to traditional cooking, ancient history to
            modern AI - Learn ANYTHING from global experts. Upload, share, and
            discover knowledge in every subject! 🌍✨
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12"
          >
            <Button
              size="lg"
              className="bg-gradient-to-r from-orange-500 via-pink-500 to-violet-500 hover:opacity-90 text-white px-8 py-6 text-lg font-semibold shadow-2xl shadow-orange-500/25"
            >
              🚀 Start Learning Everything
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>

            <Button
              variant="outline"
              size="lg"
              className="px-8 py-6 text-lg font-semibold"
            >
              <Play className="mr-2 h-5 w-5" />
              Watch Demo
            </Button>
          </motion.div>

          {/* Feature Preview */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="relative max-w-4xl mx-auto"
          >
            <div className="relative bg-gradient-to-r from-orange-500/10 via-pink-500/10 to-violet-500/10 rounded-2xl p-8 backdrop-blur-sm border border-white/10">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div className="text-center">
                  <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-pink-500 rounded-lg mx-auto mb-4 flex items-center justify-center">
                    <span className="text-white font-bold">🌍</span>
                  </div>
                  <h3 className="font-semibold mb-2">Every Subject</h3>
                  <p className="text-sm text-muted-foreground">
                    From quantum physics to cooking
                  </p>
                </div>

                <div className="text-center">
                  <div className="w-12 h-12 bg-gradient-to-r from-pink-500 to-violet-500 rounded-lg mx-auto mb-4 flex items-center justify-center">
                    <span className="text-white font-bold">📱</span>
                  </div>
                  <h3 className="font-semibold mb-2">EduReels</h3>
                  <p className="text-sm text-muted-foreground">
                    Quick learning like TikTok
                  </p>
                </div>

                <div className="text-center">
                  <div className="w-12 h-12 bg-gradient-to-r from-violet-500 to-blue-500 rounded-lg mx-auto mb-4 flex items-center justify-center">
                    <span className="text-white font-bold">🎥</span>
                  </div>
                  <h3 className="font-semibold mb-2">Upload & Share</h3>
                  <p className="text-sm text-muted-foreground">
                    Teach the world anything
                  </p>
                </div>

                <div className="text-center">
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-emerald-500 rounded-lg mx-auto mb-4 flex items-center justify-center">
                    <span className="text-white font-bold">🤖</span>
                  </div>
                  <h3 className="font-semibold mb-2">AI + Human</h3>
                  <p className="text-sm text-muted-foreground">
                    Best of both worlds
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
