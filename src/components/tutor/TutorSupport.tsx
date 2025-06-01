import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { MessageSquare, Calendar, Sparkles, Users } from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

export function TutorSupport() {
  return (
    <section className="py-24 bg-gradient-to-br from-cyan-50 to-purple-50 dark:from-cyan-950/20 dark:to-purple-950/20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            <span className="bg-gradient-to-r from-cyan-500 to-purple-500 bg-clip-text text-transparent">
              1-on-1 Support, Instantly
            </span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Ask anything in real-time. Choose instant AI guidance or schedule a
            live session with a human expert.
          </p>
        </motion.div>

        {/* Support Options */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* AI Tutor Card */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <Card className="relative h-full overflow-hidden border-0 bg-gradient-to-br from-cyan-500/10 to-blue-500/10 backdrop-blur-sm">
              <CardContent className="p-8">
                <div className="flex items-center space-x-3 mb-6">
                  <div className="w-12 h-12 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full flex items-center justify-center">
                    <Sparkles className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold">
                      Chat with AI Tutor
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      Instant responses, 24/7 availability
                    </p>
                  </div>
                </div>

                <p className="text-muted-foreground mb-6 leading-relaxed">
                  Get immediate help with homework, explanations of complex
                  concepts, and personalized study tips from our advanced AI
                  tutor.
                </p>

                <div className="space-y-3 mb-6">
                  <div className="flex items-center space-x-2 text-sm">
                    <MessageSquare className="w-4 h-4 text-cyan-500" />
                    <span>Instant responses</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm">
                    <Sparkles className="w-4 h-4 text-cyan-500" />
                    <span>Personalized explanations</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm">
                    <span className="w-4 h-4 text-center text-cyan-500 font-bold">
                      ∞
                    </span>
                    <span>Available 24/7</span>
                  </div>
                </div>

                <Link to="/ai-tutor">
                  <Button className="w-full bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white">
                    <MessageSquare className="w-4 h-4 mr-2" />
                    Chat with AI Tutor
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </motion.div>

          {/* Human Tutor Card */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
          >
            <Card className="relative h-full overflow-hidden border-0 bg-gradient-to-br from-purple-500/10 to-pink-500/10 backdrop-blur-sm">
              <CardContent className="p-8">
                <div className="flex items-center space-x-3 mb-6">
                  <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                    <Users className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold">
                      Book a Human Tutor
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      Expert guidance, personalized sessions
                    </p>
                  </div>
                </div>

                <p className="text-muted-foreground mb-6 leading-relaxed">
                  Schedule one-on-one sessions with certified experts for deep
                  learning, exam preparation, and personalized coaching.
                </p>

                <div className="space-y-3 mb-6">
                  <div className="flex items-center space-x-2 text-sm">
                    <Calendar className="w-4 h-4 text-purple-500" />
                    <span>Flexible scheduling</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm">
                    <Users className="w-4 h-4 text-purple-500" />
                    <span>Certified experts</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm">
                    <MessageSquare className="w-4 h-4 text-purple-500" />
                    <span>Personalized sessions</span>
                  </div>
                </div>

                <Link to="/book-tutor">
                  <Button
                    variant="outline"
                    className="w-full border-purple-200 hover:bg-purple-50 dark:border-purple-800 dark:hover:bg-purple-950"
                  >
                    <Calendar className="w-4 h-4 mr-2" />
                    Book a Human Tutor
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
