import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Brain,
  Users,
  Zap,
  Video,
  BookOpen,
  MessageSquare,
} from "lucide-react";
import { motion } from "framer-motion";

const features = [
  {
    icon: BookOpen,
    title: "Interactive Flashcards",
    description:
      "Short, beautifully animated lessons for quick mastery of key concepts.",
    badge: "INTERACTIVE LEARNING",
    gradient: "from-blue-500 to-cyan-500",
  },
  {
    icon: Brain,
    title: "Smart AI Tutors",
    description:
      "Interactive quizzes and flashcards to reinforce your learning path.",
    badge: "SMART AI TUTORS",
    gradient: "from-purple-500 to-pink-500",
  },
  {
    icon: Zap,
    title: "Fast AI",
    description:
      "Personalized AI-generated recommendations and feedback. Chat with smart AI tutors instantly.",
    badge: "FAST AI",
    gradient: "from-green-500 to-teal-500",
  },
  {
    icon: Video,
    title: "Adaptive Learning Paths",
    description: "Personalized pathways tailored to your goals and progress.",
    badge: "ADAPTIVE LEARNING PATHS",
    gradient: "from-orange-500 to-red-500",
  },
  {
    icon: Users,
    title: "Live Human Tutors",
    description: "Book expert human tutors for in-depth, live coaching.",
    badge: "LIVE HUMAN TUTORS",
    gradient: "from-indigo-500 to-purple-500",
  },
  {
    icon: MessageSquare,
    title: "Interactive Content",
    description: "Chemists, AI-generated videos bring every topic to life.",
    badge: "INTERACTIVE CONTENT",
    gradient: "from-pink-500 to-rose-500",
  },
];

export function FeatureCards() {
  return (
    <section className="py-24 bg-muted/30">
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
              Everything you need to learn in style
            </span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            A beautiful, intuitive platform with AI-powered tools. Built for
            modern learners, teams, and creators.
          </p>
        </motion.div>

        {/* Feature Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="relative h-full group hover:shadow-lg transition-all duration-300 border-0 bg-background/50 backdrop-blur-sm">
                <CardHeader className="space-y-4">
                  {/* Icon */}
                  <div
                    className={`w-12 h-12 rounded-lg bg-gradient-to-r ${feature.gradient} flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}
                  >
                    <feature.icon className="w-6 h-6 text-white" />
                  </div>

                  {/* Badge */}
                  <Badge
                    variant="secondary"
                    className={`w-fit bg-gradient-to-r ${feature.gradient} text-white border-0 text-xs`}
                  >
                    {feature.badge}
                  </Badge>

                  {/* Title */}
                  <CardTitle className="text-xl font-semibold">
                    {feature.title}
                  </CardTitle>
                </CardHeader>

                <CardContent>
                  <CardDescription className="text-muted-foreground leading-relaxed">
                    {feature.description}
                  </CardDescription>
                </CardContent>

                {/* Hover Effect */}
                <div
                  className={`absolute inset-0 bg-gradient-to-r ${feature.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-300 rounded-lg`}
                />
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
