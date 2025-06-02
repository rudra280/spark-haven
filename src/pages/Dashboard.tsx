import React, { useState, useEffect } from "react";
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
import { Alert, AlertDescription } from "@/components/ui/alert";
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
  Users,
  Award,
  Loader2,
} from "lucide-react";
import { motion } from "framer-motion";
import { useAuth } from "@/contexts/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import api from "@/lib/api";
import { PageHeader } from "@/components/ui/back-navigation";

interface UserStats {
  totalHours: number;
  coursesCompleted: number;
  coursesEnrolled: number;
  currentStreak: number;
  certificates: number;
  plan: string;
}

interface CourseProgress {
  id: string;
  title: string;
  progress: number;
  nextLesson: string;
  gradient: string;
  instructor: string;
  estimatedTime: string;
}

interface Activity {
  id: string;
  type: "course" | "achievement" | "tutor" | "ai";
  title: string;
  description: string;
  time: string;
  icon: any;
}

export default function Dashboard() {
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [stats, setStats] = useState<UserStats | null>(null);
  const [currentCourses, setCurrentCourses] = useState<CourseProgress[]>([]);
  const [recentActivity, setRecentActivity] = useState<Activity[]>([]);
  const [notifications, setNotifications] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
      return;
    }

    loadDashboardData();
  }, [isAuthenticated, navigate]);

  const loadDashboardData = async () => {
    setLoading(true);
    try {
      // Load user statistics
      const userStats = await api.getUserStats();
      setStats(userStats);

      // Load current courses with progress
      const courses = [
        {
          id: "1",
          title: "Advanced Python Programming",
          progress: 68,
          nextLesson: "Decorators and Context Managers",
          gradient: "from-green-500 to-teal-500",
          instructor: "Dr. Sarah Wilson",
          estimatedTime: "25 mins",
        },
        {
          id: "2",
          title: "UX Design Mastery",
          progress: 45,
          nextLesson: "User Research Methods",
          gradient: "from-purple-500 to-pink-500",
          instructor: "Prof. Mike Chen",
          estimatedTime: "18 mins",
        },
        {
          id: "3",
          title: "Machine Learning Basics",
          progress: 23,
          nextLesson: "Linear Regression Deep Dive",
          gradient: "from-blue-500 to-indigo-500",
          instructor: "Dr. Alex Johnson",
          estimatedTime: "32 mins",
        },
      ];
      setCurrentCourses(courses);

      // Load recent activity
      const activities: Activity[] = [
        {
          id: "1",
          type: "course",
          title: "Completed: React Hooks Masterclass",
          description: "Finished all modules and earned certificate",
          time: "2 hours ago",
          icon: BookOpen,
        },
        {
          id: "2",
          type: "ai",
          title: "AI Tutor Session",
          description: "Discussed JavaScript closures and scope",
          time: "1 day ago",
          icon: Brain,
        },
        {
          id: "3",
          type: "achievement",
          title: "Achievement Unlocked! 🏆",
          description: "Completed 5 courses this month",
          time: "2 days ago",
          icon: Trophy,
        },
        {
          id: "4",
          type: "tutor",
          title: "Booked Session with Dr. Priya",
          description: "Mathematics tutoring session scheduled",
          time: "3 days ago",
          icon: Users,
        },
      ];
      setRecentActivity(activities);

      // Load notifications
      const userNotifications = await api.getNotifications();
      setNotifications(userNotifications);
    } catch (error) {
      console.error("Failed to load dashboard data:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleContinueCourse = (courseId: string) => {
    // Navigate to course player
    navigate(`/course/${courseId}/learn`);
  };

  const handleMarkNotificationRead = async (notificationId: string) => {
    await api.markNotificationRead(notificationId);
    setNotifications((prev) => prev.filter((n) => n.id !== notificationId));
  };

  if (!isAuthenticated) {
    return null; // Will redirect to login
  }

  if (loading) {
    return (
      <div className="min-h-screen pt-20 pb-12 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-8 h-8 animate-spin mx-auto mb-4" />
          <p className="text-muted-foreground">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-20 pb-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Page Header with Back Navigation */}
        <PageHeader
          title={`Welcome back, ${user?.name?.split(" ")[0]}! 👋`}
          subtitle="Ready to continue your learning journey?"
          className="mb-8"
        >
          <div className="flex flex-wrap gap-4 mt-4">
            <Link to="/tutor-booking">
              <Button variant="outline">
                <Calendar className="w-4 h-4 mr-2" />
                Schedule Session
              </Button>
            </Link>
            <Link to="/ai-tutor">
              <Button className="bg-gradient-to-r from-orange-500 via-pink-500 to-violet-500">
                <Zap className="w-4 h-4 mr-2" />
                Quick AI Help
              </Button>
            </Link>
          </div>
        </PageHeader>

        {/* Original Header Section (keeping the additional content) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <div className="flex items-center justify-between">
            <div className="hidden md:flex items-center space-x-4">
              <Link to="/book-tutor">
                <Button variant="outline">
                  <Calendar className="w-4 h-4 mr-2" />
                  Schedule Session
                </Button>
              </Link>
              <Link to="/ai-tutor">
                <Button className="bg-gradient-to-r from-orange-500 via-pink-500 to-violet-500">
                  <Zap className="w-4 h-4 mr-2" />
                  Quick AI Help
                </Button>
              </Link>
            </div>
          </div>
        </motion.div>

        {/* Notifications */}
        {notifications.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mb-8"
          >
            {notifications.map((notification) => (
              <Alert
                key={notification.id}
                className="mb-4 border-blue-200 bg-blue-50 dark:bg-blue-950/20"
              >
                <Brain className="h-4 w-4" />
                <AlertDescription className="flex items-center justify-between">
                  <div>
                    <strong>{notification.title}</strong>
                    <p className="text-sm">{notification.message}</p>
                  </div>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => handleMarkNotificationRead(notification.id)}
                  >
                    ✕
                  </Button>
                </AlertDescription>
              </Alert>
            ))}
          </motion.div>
        )}

        {/* Stats Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8"
        >
          <Card className="border-0 bg-background/50 backdrop-blur-sm">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">
                    Learning Hours
                  </p>
                  <p className="text-2xl font-bold">{stats?.totalHours || 0}</p>
                  <p className="text-xs text-green-600">+5 this week</p>
                </div>
                <div className="w-12 h-12 rounded-lg bg-gradient-to-r from-blue-500 to-cyan-500 flex items-center justify-center">
                  <Clock className="w-6 h-6 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 bg-background/50 backdrop-blur-sm">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Completed</p>
                  <p className="text-2xl font-bold">
                    {stats?.coursesCompleted || 0}
                  </p>
                  <p className="text-xs text-green-600">+2 this month</p>
                </div>
                <div className="w-12 h-12 rounded-lg bg-gradient-to-r from-green-500 to-teal-500 flex items-center justify-center">
                  <Trophy className="w-6 h-6 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 bg-background/50 backdrop-blur-sm">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">
                    Current Streak
                  </p>
                  <p className="text-2xl font-bold">
                    {stats?.currentStreak || 0} days
                  </p>
                  <p className="text-xs text-green-600">Keep it up!</p>
                </div>
                <div className="w-12 h-12 rounded-lg bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center">
                  <Target className="w-6 h-6 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 bg-background/50 backdrop-blur-sm">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Certificates</p>
                  <p className="text-2xl font-bold">
                    {stats?.certificates || 0}
                  </p>
                  <p className="text-xs text-orange-600">Industry recognized</p>
                </div>
                <div className="w-12 h-12 rounded-lg bg-gradient-to-r from-orange-500 to-red-500 flex items-center justify-center">
                  <Award className="w-6 h-6 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Current Courses */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="lg:col-span-2"
          >
            <Card className="border-0 bg-background/50 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>Continue Learning</span>
                  <Link to="/courses">
                    <Button variant="ghost" size="sm">
                      View All
                    </Button>
                  </Link>
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
                      <div className="flex-1">
                        <h3 className="font-semibold mb-1">{course.title}</h3>
                        <p className="text-sm text-muted-foreground mb-1">
                          by {course.instructor}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          Next: {course.nextLesson} • {course.estimatedTime}
                        </p>
                      </div>
                      <Button
                        size="sm"
                        className={`bg-gradient-to-r ${course.gradient} text-white`}
                        onClick={() => handleContinueCourse(course.id)}
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

                {currentCourses.length === 0 && (
                  <div className="text-center py-8">
                    <BookOpen className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                    <h3 className="font-semibold mb-2">
                      No courses in progress
                    </h3>
                    <p className="text-muted-foreground mb-4">
                      Start learning something new today!
                    </p>
                    <Link to="/courses">
                      <Button className="bg-gradient-to-r from-orange-500 via-pink-500 to-violet-500">
                        Browse Courses
                      </Button>
                    </Link>
                  </div>
                )}
              </CardContent>
            </Card>
          </motion.div>

          {/* Recent Activity */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <Card className="border-0 bg-background/50 backdrop-blur-sm">
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
                <CardDescription>
                  Your latest learning milestones
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {recentActivity.map((activity) => (
                  <div key={activity.id} className="flex items-start space-x-3">
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
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-8"
        >
          <Card className="border-0 bg-gradient-to-r from-orange-500/10 via-pink-500/10 to-violet-500/10 backdrop-blur-sm">
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
                  <Link to="/courses">
                    <Button
                      size="lg"
                      className="bg-gradient-to-r from-orange-500 via-pink-500 to-violet-500"
                    >
                      <TrendingUp className="w-4 h-4 mr-2" />
                      Discover New Courses
                    </Button>
                  </Link>
                  <Link to="/ai-tutor">
                    <Button size="lg" variant="outline">
                      <Brain className="w-4 h-4 mr-2" />
                      Ask AI for Recommendations
                    </Button>
                  </Link>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Plan Upgrade CTA (for free users) */}
        {stats?.plan === "free" && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="mt-8"
          >
            <Alert className="border-orange-200 bg-orange-50 dark:bg-orange-950/20">
              <Star className="h-4 w-4" />
              <AlertDescription className="flex items-center justify-between">
                <div>
                  <strong>Upgrade to Pro!</strong>
                  <p className="text-sm">
                    Unlock unlimited courses, AI tutoring, and more features.
                  </p>
                </div>
                <Link to="/pricing">
                  <Button
                    size="sm"
                    className="bg-gradient-to-r from-orange-500 to-pink-500"
                  >
                    Upgrade Now
                  </Button>
                </Link>
              </AlertDescription>
            </Alert>
          </motion.div>
        )}
      </div>
    </div>
  );
}
