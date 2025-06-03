import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  TrendingUp,
  Users,
  PlayCircle,
  DollarSign,
  Eye,
  Heart,
  MessageCircle,
  Upload,
  BarChart3,
  Settings,
  Calendar,
  Star,
  Award,
  Zap,
  FileVideo,
  Image,
  BookOpen,
  Target,
  Clock,
  Globe,
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

interface CreatorStats {
  totalViews: number;
  totalSubscribers: number;
  totalVideos: number;
  totalRevenue: number;
  monthlyViews: number;
  engagementRate: number;
  avgWatchTime: number;
  topPerformingVideo: string;
}

interface VideoAnalytics {
  id: string;
  title: string;
  views: number;
  likes: number;
  comments: number;
  duration: string;
  uploadDate: string;
  revenue: number;
  thumbnail: string;
}

export default function CreatorDashboard() {
  const { user } = useAuth();
  const [stats, setStats] = useState<CreatorStats>({
    totalViews: 2847563,
    totalSubscribers: 45892,
    totalVideos: 127,
    totalRevenue: 15673,
    monthlyViews: 456789,
    engagementRate: 8.4,
    avgWatchTime: 4.2,
    topPerformingVideo: "AI Programming Tutorial",
  });

  const [recentVideos, setRecentVideos] = useState<VideoAnalytics[]>([
    {
      id: "1",
      title: "Machine Learning Fundamentals Explained",
      views: 125430,
      likes: 5420,
      comments: 892,
      duration: "12:34",
      uploadDate: "2024-01-20",
      revenue: 234.56,
      thumbnail:
        "https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=300",
    },
    {
      id: "2",
      title: "React Hooks Deep Dive",
      views: 89234,
      likes: 3890,
      comments: 567,
      duration: "18:42",
      uploadDate: "2024-01-18",
      revenue: 178.9,
      thumbnail:
        "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=300",
    },
    {
      id: "3",
      title: "Python Data Science Project",
      views: 67543,
      likes: 2987,
      comments: 423,
      duration: "25:16",
      uploadDate: "2024-01-15",
      revenue: 145.23,
      thumbnail:
        "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=300",
    },
  ]);

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
                  Creator Studio 🎬
                </span>
              </h1>
              <p className="text-white/70 mt-2">
                Welcome back, {user?.name}! Ready to create amazing content?
              </p>
            </div>

            <div className="flex items-center space-x-4">
              <Link to="/video-upload">
                <Button className="bg-gradient-to-r from-red-500 to-pink-500 hover:opacity-90">
                  <Upload className="w-4 h-4 mr-2" />
                  Upload Video
                </Button>
              </Link>

              <Link to="/ai-video-hub">
                <Button
                  variant="outline"
                  className="border-white/20 text-white hover:bg-white/10"
                >
                  <Zap className="w-4 h-4 mr-2" />
                  AI Generate
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
                      Total Views
                    </p>
                    <p className="text-3xl font-bold text-white">
                      {formatNumber(stats.totalViews)}
                    </p>
                    <p className="text-green-400 text-sm">
                      ↗ +12.5% this month
                    </p>
                  </div>
                  <Eye className="w-12 h-12 text-blue-400" />
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
                      Subscribers
                    </p>
                    <p className="text-3xl font-bold text-white">
                      {formatNumber(stats.totalSubscribers)}
                    </p>
                    <p className="text-green-400 text-sm">
                      ↗ +8.2% this month
                    </p>
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
                      Total Videos
                    </p>
                    <p className="text-3xl font-bold text-white">
                      {stats.totalVideos}
                    </p>
                    <p className="text-green-400 text-sm">+3 this week</p>
                  </div>
                  <PlayCircle className="w-12 h-12 text-green-400" />
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <Card className="bg-gradient-to-br from-yellow-500/20 to-orange-500/20 border-yellow-500/30">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-yellow-400 text-sm font-medium">
                      Revenue
                    </p>
                    <p className="text-3xl font-bold text-white">
                      ₹{formatNumber(stats.totalRevenue)}
                    </p>
                    <p className="text-green-400 text-sm">
                      ↗ +15.3% this month
                    </p>
                  </div>
                  <DollarSign className="w-12 h-12 text-yellow-400" />
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          {/* Analytics Chart */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="lg:col-span-2"
          >
            <Card className="bg-white/5 backdrop-blur-sm border-white/10">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <BarChart3 className="w-5 h-5 mr-2" />
                  Channel Analytics
                </CardTitle>
                <CardDescription className="text-white/70">
                  Your content performance over the last 30 days
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-white/70">Monthly Views</span>
                      <span className="text-white">
                        {formatNumber(stats.monthlyViews)}
                      </span>
                    </div>
                    <Progress value={75} className="h-2" />
                  </div>

                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-white/70">Engagement Rate</span>
                      <span className="text-white">
                        {stats.engagementRate}%
                      </span>
                    </div>
                    <Progress
                      value={stats.engagementRate * 10}
                      className="h-2"
                    />
                  </div>

                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-white/70">Avg. Watch Time</span>
                      <span className="text-white">
                        {stats.avgWatchTime} min
                      </span>
                    </div>
                    <Progress value={stats.avgWatchTime * 20} className="h-2" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Quick Actions */}
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
                <Link to="/video-upload">
                  <Button className="w-full justify-start bg-gradient-to-r from-red-500 to-pink-500 hover:opacity-90">
                    <FileVideo className="w-4 h-4 mr-2" />
                    Upload New Video
                  </Button>
                </Link>

                <Link to="/ai-video-hub">
                  <Button
                    variant="outline"
                    className="w-full justify-start border-white/20 text-white hover:bg-white/10"
                  >
                    <Zap className="w-4 h-4 mr-2" />
                    Generate AI Video
                  </Button>
                </Link>

                <Link to="/courses">
                  <Button
                    variant="outline"
                    className="w-full justify-start border-white/20 text-white hover:bg-white/10"
                  >
                    <BookOpen className="w-4 h-4 mr-2" />
                    Create Course
                  </Button>
                </Link>

                <Link to="/analytics">
                  <Button
                    variant="outline"
                    className="w-full justify-start border-white/20 text-white hover:bg-white/10"
                  >
                    <BarChart3 className="w-4 h-4 mr-2" />
                    View Analytics
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Recent Videos */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
        >
          <Card className="bg-white/5 backdrop-blur-sm border-white/10">
            <CardHeader>
              <CardTitle className="text-white flex items-center">
                <PlayCircle className="w-5 h-5 mr-2" />
                Recent Videos Performance
              </CardTitle>
              <CardDescription className="text-white/70">
                Track how your latest content is performing
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentVideos.map((video, index) => (
                  <motion.div
                    key={video.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.8 + index * 0.1 }}
                    className="flex items-center space-x-4 p-4 rounded-lg bg-white/5 hover:bg-white/10 transition-colors"
                  >
                    <img
                      src={video.thumbnail}
                      alt={video.title}
                      className="w-20 h-12 object-cover rounded"
                    />

                    <div className="flex-1">
                      <h4 className="text-white font-medium">{video.title}</h4>
                      <p className="text-white/60 text-sm">
                        {video.uploadDate} • {video.duration}
                      </p>
                    </div>

                    <div className="flex items-center space-x-6 text-sm">
                      <div className="text-center">
                        <div className="flex items-center text-blue-400">
                          <Eye className="w-4 h-4 mr-1" />
                          <span>{formatNumber(video.views)}</span>
                        </div>
                        <p className="text-white/60">Views</p>
                      </div>

                      <div className="text-center">
                        <div className="flex items-center text-red-400">
                          <Heart className="w-4 h-4 mr-1" />
                          <span>{formatNumber(video.likes)}</span>
                        </div>
                        <p className="text-white/60">Likes</p>
                      </div>

                      <div className="text-center">
                        <div className="flex items-center text-green-400">
                          <MessageCircle className="w-4 h-4 mr-1" />
                          <span>{video.comments}</span>
                        </div>
                        <p className="text-white/60">Comments</p>
                      </div>

                      <div className="text-center">
                        <div className="flex items-center text-yellow-400">
                          <DollarSign className="w-4 h-4 mr-1" />
                          <span>₹{video.revenue}</span>
                        </div>
                        <p className="text-white/60">Revenue</p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Goals & Achievements */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9 }}
          >
            <Card className="bg-white/5 backdrop-blur-sm border-white/10">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <Target className="w-5 h-5 mr-2" />
                  Monthly Goals
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-white/70">Videos Uploaded (3/5)</span>
                    <span className="text-white">60%</span>
                  </div>
                  <Progress value={60} className="h-2" />
                </div>

                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-white/70">
                      Subscriber Goal (45.8K/50K)
                    </span>
                    <span className="text-white">92%</span>
                  </div>
                  <Progress value={92} className="h-2" />
                </div>

                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-white/70">
                      Revenue Target (₹15.6K/₹20K)
                    </span>
                    <span className="text-white">78%</span>
                  </div>
                  <Progress value={78} className="h-2" />
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.0 }}
          >
            <Card className="bg-white/5 backdrop-blur-sm border-white/10">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <Award className="w-5 h-5 mr-2" />
                  Recent Achievements
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-r from-yellow-500 to-orange-500 flex items-center justify-center">
                    <Star className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="text-white font-medium">50K Subscribers</p>
                    <p className="text-white/60 text-sm">Unlocked yesterday</p>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center">
                    <TrendingUp className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="text-white font-medium">Viral Video</p>
                    <p className="text-white/60 text-sm">100K+ views in 24h</p>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500 flex items-center justify-center">
                    <Clock className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="text-white font-medium">Consistent Creator</p>
                    <p className="text-white/60 text-sm">
                      7 days upload streak
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
