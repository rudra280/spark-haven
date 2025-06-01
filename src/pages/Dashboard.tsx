import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  BookOpen,
  Clock,
  Trophy,
  Target,
  TrendingUp,
  Calendar,
  Play,
  Star,
  Brain,
  Zap,
} from "lucide-react";
import { motion } from "framer-motion";

export default function Dashboard() {
  const stats = [
    {
      title: "Hours Learned",
      value: "24.5",
      change: "+12%",
      icon: Clock,
      gradient: "from-blue-500 to-cyan-500",
    },
    {
      title: "Courses Completed",
      value: "8",
      change: "+3 this month",
      icon: Trophy,
      gradient: "from-green-500 to-teal-500",
    },
    {
      title: "Learning Streak",
      value: "15 days",
      change: "Keep it up!",
      icon: Target,
      gradient: "from-purple-500 to-pink-500",
    },
    {
      title: "AI Sessions",
      value: "47",
      change: "+8 this week",
      icon: Brain,
      gradient: "from-orange-500 to-red-500",
    },
  ];

  const recentActivity = [
    {
      type: "course",
      title: "Completed: React Fundamentals",
      description: "Finished all modules and quizzes",
      time: "2 hours ago",
      icon: BookOpen,
    },
    {
      type: "ai",
      title: "AI Tutor Session",
      description: "Discussed JavaScript closures",
      time: "1 day ago",
      icon: Brain,
    },
    {
      type: "achievement",
      title: "Achievement Unlocked!",
      description: "Completed 5 courses this month",
      time: "2 days ago",
      icon: Trophy,
    },
  ];

  const currentCourses = [
    {
      id: "1",
      title: "Advanced Python",
      progress: 68,
      nextLesson: "Decorators and Context Managers",
      gradient: "from-green-500 to-teal-500",
    },
    {
      id: "2",
      title: "UX Design Mastery",
      progress: 45,
      nextLesson: "User Research Methods",
      gradient: "from-purple-500 to-pink-500",
    },
    {
      id: "3",
      title: "Machine Learning Basics",
      progress: 23,
      nextLesson: "Linear Regression",
      gradient: "from-blue-500 to-indigo-500",
    },
  ];

  return (
    <div className="min-h-screen pt-20 pb-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold">
                <span className="bg-gradient-to-r from-cyan-500 to-purple-500 bg-clip-text text-transparent">
                  Welcome back, Alex! 👋
                </span>
              </h1>
              <p className="text-muted-foreground mt-2">
                Ready to continue your learning journey?
              </p>
            </div>
            <div className="hidden md:flex items-center space-x-4">
              <Button variant="outline">
                <Calendar className="w-4 h-4 mr-2" />
                Schedule Session
              </Button>
              <Button className="bg-gradient-to-r from-cyan-500 to-purple-500">
                <Zap className="w-4 h-4 mr-2" />
                Quick AI Help
              </Button>
            </div>
          </div>
        </motion.div>

        {/* Stats Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
        >
          {stats.map((stat, index) => (
            <Card
              key={stat.title}
              className="border-0 bg-background/50 backdrop-blur-sm"
            >
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">
                      {stat.title}
                    </p>
                    <p className="text-2xl font-bold">{stat.value}</p>
                    <p className="text-xs text-green-600">{stat.change}</p>
                  </div>
                  <div
                    className={`w-12 h-12 rounded-lg bg-gradient-to-r ${stat.gradient} flex items-center justify-center`}
                  >
                    <stat.icon className="w-6 h-6 text-white" />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Current Courses */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-2"
          >
            <Card className="border-0 bg-background/50 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>Continue Learning</span>
                  <Button variant="ghost" size="sm">
                    View All
                  </Button>
                </CardTitle>
                <CardDescription>Pick up where you left off</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {currentCourses.map((course) => (
                  <div
                    key={course.id}
                    className="border border-border rounded-lg p-4 hover:border-primary/20 transition-colors"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h3 className="font-semibold">{course.title}</h3>
                        <p className="text-sm text-muted-foreground">
                          Next: {course.nextLesson}
                        </p>
                      </div>
                      <Button
                        size="sm"
                        className={`bg-gradient-to-r ${course.gradient}`}
                      >
                        <Play className="w-4 h-4 mr-1" />
                        Continue
                      </Button>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span>{course.progress}% complete</span>
                        <span className="text-muted-foreground">
                          {Math.round((course.progress / 100) * 12)} / 12
                          lessons
                        </span>
                      </div>
                      <Progress value={course.progress} className="h-2" />
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </motion.div>

          {/* Recent Activity */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <Card className="border-0 bg-background/50 backdrop-blur-sm">
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
                <CardDescription>
                  Your latest learning milestones
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {recentActivity.map((activity, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center flex-shrink-0">
                      <activity.icon className="w-4 h-4" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-sm">{activity.title}</p>
                      <p className="text-xs text-muted-foreground">
                        {activity.description}
                      </p>
                      <p className="text-xs text-muted-foreground mt-1">
                        {activity.time}
                      </p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-8"
        >
          <Card className="border-0 bg-gradient-to-r from-cyan-500/10 to-purple-500/10 backdrop-blur-sm">
            <CardContent className="p-8">
              <div className="text-center space-y-4">
                <h3 className="text-xl font-semibold">
                  Ready for your next challenge?
                </h3>
                <p className="text-muted-foreground">
                  Explore new topics or get personalized recommendations from
                  our AI
                </p>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                  <Button
                    size="lg"
                    className="bg-gradient-to-r from-cyan-500 to-purple-500"
                  >
                    <TrendingUp className="w-4 h-4 mr-2" />
                    Discover New Courses
                  </Button>
                  <Button size="lg" variant="outline">
                    <Brain className="w-4 h-4 mr-2" />
                    Ask AI for Recommendations
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
