import React, { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  Users,
  BookOpen,
  GraduationCap,
  TrendingUp,
  DollarSign,
  Calendar,
  Settings,
  UserPlus,
  Award,
  BarChart3,
  FileText,
  Clock,
  Globe,
  Star,
  Target,
  Zap,
} from "lucide-react";
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
import { useAuth } from "@/contexts/AuthContext";

export default function InstitutionDashboard() {
  const { user } = useAuth();
  const [stats] = useState({
    totalStudents: 2847,
    totalInstructors: 156,
    activeCourses: 89,
    totalRevenue: 245600,
    completionRate: 87.3,
    avgRating: 4.6,
    monthlyEnrollments: 450,
    certificatesIssued: 1890,
  });

  const formatNumber = (num: number) => {
    if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
    if (num >= 1000) return `${(num / 1000).toFixed(1)}K`;
    return num.toString();
  };

  return (
    <div className="min-h-screen pt-20 pb-12 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold">
                <span className="bg-gradient-to-r from-orange-500 via-pink-500 to-violet-500 bg-clip-text text-transparent">
                  Institution Control Center 🏛️
                </span>
              </h1>
              <p className="text-white/70 mt-2">
                Welcome back, {user?.name}! Manage your educational institution.
              </p>
            </div>

            <div className="flex items-center space-x-4">
              <Link to="/student-management">
                <Button className="bg-gradient-to-r from-blue-500 to-cyan-500 hover:opacity-90">
                  <UserPlus className="w-4 h-4 mr-2" />
                  Add Students
                </Button>
              </Link>

              <Link to="/course-management">
                <Button
                  variant="outline"
                  className="border-white/20 text-white hover:bg-white/10"
                >
                  <BookOpen className="w-4 h-4 mr-2" />
                  Manage Courses
                </Button>
              </Link>
            </div>
          </div>
        </motion.div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <Card className="bg-gradient-to-br from-blue-500/20 to-cyan-500/20 border-blue-500/30">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-blue-400 text-sm font-medium">
                      Total Students
                    </p>
                    <p className="text-3xl font-bold text-white">
                      {formatNumber(stats.totalStudents)}
                    </p>
                    <p className="text-green-400 text-sm">
                      ↗ +12.5% this month
                    </p>
                  </div>
                  <GraduationCap className="w-12 h-12 text-blue-400" />
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Card className="bg-gradient-to-br from-purple-500/20 to-pink-500/20 border-purple-500/30">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-purple-400 text-sm font-medium">
                      Instructors
                    </p>
                    <p className="text-3xl font-bold text-white">
                      {stats.totalInstructors}
                    </p>
                    <p className="text-green-400 text-sm">+8 this month</p>
                  </div>
                  <Users className="w-12 h-12 text-purple-400" />
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <Card className="bg-gradient-to-br from-green-500/20 to-emerald-500/20 border-green-500/30">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-green-400 text-sm font-medium">
                      Active Courses
                    </p>
                    <p className="text-3xl font-bold text-white">
                      {stats.activeCourses}
                    </p>
                    <p className="text-green-400 text-sm">+5 this week</p>
                  </div>
                  <BookOpen className="w-12 h-12 text-green-400" />
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <Card className="bg-gradient-to-br from-blue-500/20 to-purple-500/20 border-blue-500/30">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-blue-400 text-sm font-medium">Revenue</p>
                    <p className="text-3xl font-bold text-white">
                      ₹{formatNumber(stats.totalRevenue)}
                    </p>
                    <p className="text-green-400 text-sm">
                      ↗ +18.7% this month
                    </p>
                  </div>
                  <DollarSign className="w-12 h-12 text-blue-400" />
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Performance Metrics */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <Card className="bg-white/5 backdrop-blur-sm border-white/10">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <BarChart3 className="w-5 h-5 mr-2" />
                  Institution Performance
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-white/70">
                      Course Completion Rate
                    </span>
                    <span className="text-white">{stats.completionRate}%</span>
                  </div>
                  <Progress value={stats.completionRate} className="h-2" />
                </div>

                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-white/70">Average Rating</span>
                    <span className="text-white">{stats.avgRating}/5.0</span>
                  </div>
                  <Progress value={stats.avgRating * 20} className="h-2" />
                </div>

                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-white/70">Monthly Enrollments</span>
                    <span className="text-white">
                      {stats.monthlyEnrollments}
                    </span>
                  </div>
                  <Progress value={75} className="h-2" />
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            <Card className="bg-white/5 backdrop-blur-sm border-white/10">
              <CardHeader>
                <CardTitle className="text-white">Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Link to="/student-management">
                  <Button className="w-full justify-start bg-gradient-to-r from-blue-500 to-cyan-500 hover:opacity-90">
                    <UserPlus className="w-4 h-4 mr-2" />
                    Manage Students
                  </Button>
                </Link>

                <Link to="/instructor-management">
                  <Button
                    variant="outline"
                    className="w-full justify-start border-white/20 text-white hover:bg-white/10"
                  >
                    <Users className="w-4 h-4 mr-2" />
                    Manage Instructors
                  </Button>
                </Link>

                <Link to="/course-management">
                  <Button
                    variant="outline"
                    className="w-full justify-start border-white/20 text-white hover:bg-white/10"
                  >
                    <BookOpen className="w-4 h-4 mr-2" />
                    Course Management
                  </Button>
                </Link>

                <Link to="/analytics">
                  <Button
                    variant="outline"
                    className="w-full justify-start border-white/20 text-white hover:bg-white/10"
                  >
                    <BarChart3 className="w-4 h-4 mr-2" />
                    View Reports
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Recent Activity */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
        >
          <Card className="bg-white/5 backdrop-blur-sm border-white/10">
            <CardHeader>
              <CardTitle className="text-white flex items-center">
                <Clock className="w-5 h-5 mr-2" />
                Recent Activity
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center space-x-4 p-4 rounded-lg bg-white/5">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-r from-green-500 to-emerald-500 flex items-center justify-center">
                    <Award className="w-5 h-5 text-white" />
                  </div>
                  <div className="flex-1">
                    <p className="text-white font-medium">
                      125 certificates issued this week
                    </p>
                    <p className="text-white/60 text-sm">
                      Congratulations to all graduates!
                    </p>
                  </div>
                  <Badge className="bg-green-500/20 text-green-400">New</Badge>
                </div>

                <div className="flex items-center space-x-4 p-4 rounded-lg bg-white/5">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500 flex items-center justify-center">
                    <TrendingUp className="w-5 h-5 text-white" />
                  </div>
                  <div className="flex-1">
                    <p className="text-white font-medium">
                      Enrollment increased by 23%
                    </p>
                    <p className="text-white/60 text-sm">
                      Highest growth in Q1 2024
                    </p>
                  </div>
                  <Badge className="bg-blue-500/20 text-blue-400">
                    Trending
                  </Badge>
                </div>

                <div className="flex items-center space-x-4 p-4 rounded-lg bg-white/5">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center">
                    <Star className="w-5 h-5 text-white" />
                  </div>
                  <div className="flex-1">
                    <p className="text-white font-medium">
                      Average rating improved to 4.6/5
                    </p>
                    <p className="text-white/60 text-sm">
                      Student satisfaction at all-time high
                    </p>
                  </div>
                  <Badge className="bg-purple-500/20 text-purple-400">
                    Achievement
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
