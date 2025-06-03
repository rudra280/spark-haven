import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Play,
  Pause,
  Download,
  Share,
  Heart,
  MessageCircle,
  Bookmark,
  ChevronLeft,
  ChevronRight,
  Volume2,
  VolumeX,
  Maximize,
  Search,
  Filter,
  Clock,
  Eye,
  Star,
  User,
  Calendar,
  BookOpen,
  FileText,
  Users,
  TrendingUp,
  Award,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/contexts/AuthContext";
import { PageHeader } from "@/components/ui/back-navigation";

interface Video {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  videoUrl: string;
  duration: string;
  views: number;
  likes: number;
  creator: {
    name: string;
    avatar: string;
    followers: number;
    isFollowing: boolean;
  };
  category: string;
  difficulty: string;
  uploadDate: string;
  tags: string[];
  materials: {
    notes?: string;
    pdf?: string;
    quiz?: string;
  };
}

// Real educational video content
const videoContent: Video[] = [
  {
    id: "1",
    title: "Introduction to Quantum Physics",
    description:
      "Comprehensive introduction to quantum mechanics covering wave-particle duality, uncertainty principle, and basic quantum states.",
    thumbnail:
      "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=500",
    videoUrl:
      "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
    duration: "25:30",
    views: 125400,
    likes: 8900,
    creator: {
      name: "Dr. Sarah Mitchell",
      avatar:
        "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150",
      followers: 45600,
      isFollowing: false,
    },
    category: "Physics",
    difficulty: "Advanced",
    uploadDate: "2024-01-15",
    tags: ["quantum", "physics", "science", "university"],
    materials: {
      notes: "Quantum Physics - Lecture Notes.pdf",
      pdf: "Quantum Mechanics Textbook Chapter 1.pdf",
      quiz: "Quantum Physics Quiz - 10 Questions",
    },
  },
  {
    id: "2",
    title: "Machine Learning Fundamentals",
    description:
      "Complete guide to machine learning algorithms, from linear regression to neural networks. Includes practical examples and code.",
    thumbnail:
      "https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=500",
    videoUrl:
      "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
    duration: "42:15",
    views: 234500,
    likes: 15600,
    creator: {
      name: "Prof. Alex Chen",
      avatar:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150",
      followers: 78900,
      isFollowing: true,
    },
    category: "Computer Science",
    difficulty: "Intermediate",
    uploadDate: "2024-01-20",
    tags: ["ml", "ai", "programming", "python"],
    materials: {
      notes: "ML Fundamentals - Complete Notes.pdf",
      pdf: "Python Code Examples.zip",
      quiz: "Machine Learning Assessment",
    },
  },
  {
    id: "3",
    title: "Advanced Calculus: Integration Techniques",
    description:
      "Master advanced integration methods including integration by parts, substitution, and partial fractions.",
    thumbnail:
      "https://images.unsplash.com/photo-1509228468518-180dd4864904?w=500",
    videoUrl:
      "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
    duration: "38:45",
    views: 89300,
    likes: 6700,
    creator: {
      name: "Dr. Maria Rodriguez",
      avatar:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150",
      followers: 32100,
      isFollowing: false,
    },
    category: "Mathematics",
    difficulty: "Advanced",
    uploadDate: "2024-01-18",
    tags: ["calculus", "integration", "mathematics", "university"],
    materials: {
      notes: "Integration Techniques - Study Guide.pdf",
      pdf: "Practice Problems Set.pdf",
      quiz: "Calculus Integration Quiz",
    },
  },
  {
    id: "4",
    title: "Organic Chemistry: Reaction Mechanisms",
    description:
      "Detailed explanation of organic reaction mechanisms, electron movement, and stereochemistry principles.",
    thumbnail:
      "https://images.unsplash.com/photo-1554475901-4538ddfbccc2?w=500",
    videoUrl:
      "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4",
    duration: "31:20",
    views: 67800,
    likes: 4900,
    creator: {
      name: "Prof. James Wilson",
      avatar:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150",
      followers: 28500,
      isFollowing: false,
    },
    category: "Chemistry",
    difficulty: "Intermediate",
    uploadDate: "2024-01-22",
    tags: ["chemistry", "organic", "reactions", "mechanisms"],
    materials: {
      notes: "Reaction Mechanisms - Lab Manual.pdf",
      pdf: "Organic Chemistry Reference.pdf",
      quiz: "Mechanism Practice Quiz",
    },
  },
];

// Video Player Component
function VideoPlayer({
  video,
  onClose,
}: {
  video: Video;
  onClose: () => void;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [progress, setProgress] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      const current = videoRef.current.currentTime;
      const total = videoRef.current.duration;
      setCurrentTime(current);
      setProgress((current / total) * 100);
    }
  };

  const handleLoadedMetadata = () => {
    if (videoRef.current) {
      setDuration(videoRef.current.duration);
    }
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  };

  const downloadMaterial = (materialName: string, type: string) => {
    // Simulate file download
    const link = document.createElement("a");
    link.href = "#";
    link.download = materialName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    // Show success message
    alert(`Downloading ${materialName}...`);
  };

  return (
    <motion.div
      className="fixed inset-0 z-50 bg-black/90 backdrop-blur-sm"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className="h-full flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-4 bg-black/50">
          <div className="flex items-center space-x-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={onClose}
              className="text-white hover:bg-white/10"
            >
              <ChevronLeft className="w-5 h-5" />
            </Button>
            <div>
              <h2 className="text-white font-semibold">{video.title}</h2>
              <p className="text-white/70 text-sm">{video.creator.name}</p>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <Button
              variant="ghost"
              size="icon"
              className="text-white hover:bg-white/10"
            >
              <Share className="w-4 h-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="text-white hover:bg-white/10"
            >
              <Bookmark className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* Video Container */}
        <div className="flex-1 flex items-center justify-center p-4">
          <div className="relative w-full max-w-5xl">
            <video
              ref={videoRef}
              src={video.videoUrl}
              className="w-full aspect-video bg-black rounded-lg"
              onTimeUpdate={handleTimeUpdate}
              onLoadedMetadata={handleLoadedMetadata}
              onEnded={() => setIsPlaying(false)}
            />

            {/* Video Controls */}
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4 rounded-b-lg">
              {/* Progress Bar */}
              <div className="w-full h-1 bg-white/20 rounded-full mb-4">
                <div
                  className="h-full bg-white rounded-full transition-all duration-100"
                  style={{ width: `${progress}%` }}
                />
              </div>

              {/* Controls */}
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={togglePlay}
                    className="text-white hover:bg-white/10"
                  >
                    {isPlaying ? (
                      <Pause className="w-5 h-5" />
                    ) : (
                      <Play className="w-5 h-5" />
                    )}
                  </Button>

                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={toggleMute}
                    className="text-white hover:bg-white/10"
                  >
                    {isMuted ? (
                      <VolumeX className="w-5 h-5" />
                    ) : (
                      <Volume2 className="w-5 h-5" />
                    )}
                  </Button>

                  <span className="text-white text-sm">
                    {formatTime(currentTime)} / {formatTime(duration)}
                  </span>
                </div>

                <Button
                  variant="ghost"
                  size="icon"
                  className="text-white hover:bg-white/10"
                >
                  <Maximize className="w-5 h-5" />
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Materials Section */}
        <div className="bg-white p-6 border-t">
          <h3 className="text-lg font-semibold mb-4">Course Materials</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {video.materials.notes && (
              <Card
                className="cursor-pointer hover:shadow-lg transition-all"
                onClick={() =>
                  downloadMaterial(video.materials.notes!, "notes")
                }
              >
                <CardContent className="p-4">
                  <div className="flex items-center space-x-3">
                    <FileText className="w-8 h-8 text-blue-600" />
                    <div>
                      <p className="font-medium">Study Notes</p>
                      <p className="text-sm text-slate-600">
                        {video.materials.notes}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {video.materials.pdf && (
              <Card
                className="cursor-pointer hover:shadow-lg transition-all"
                onClick={() => downloadMaterial(video.materials.pdf!, "pdf")}
              >
                <CardContent className="p-4">
                  <div className="flex items-center space-x-3">
                    <BookOpen className="w-8 h-8 text-red-600" />
                    <div>
                      <p className="font-medium">Reference Material</p>
                      <p className="text-sm text-slate-600">
                        {video.materials.pdf}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {video.materials.quiz && (
              <Card
                className="cursor-pointer hover:shadow-lg transition-all"
                onClick={() => downloadMaterial(video.materials.quiz!, "quiz")}
              >
                <CardContent className="p-4">
                  <div className="flex items-center space-x-3">
                    <Award className="w-8 h-8 text-green-600" />
                    <div>
                      <p className="font-medium">Practice Quiz</p>
                      <p className="text-sm text-slate-600">
                        {video.materials.quiz}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

// Video Card Component
function VideoCard({
  video,
  onPlay,
  onFollow,
}: {
  video: Video;
  onPlay: () => void;
  onFollow: (creatorName: string) => void;
}) {
  const [isLiked, setIsLiked] = useState(false);
  const [isSaved, setIsSaved] = useState(false);

  return (
    <motion.div
      className="bg-white rounded-xl border border-slate-200 overflow-hidden hover:shadow-lg transition-all duration-200"
      whileHover={{ y: -2 }}
    >
      {/* Thumbnail */}
      <div className="relative cursor-pointer" onClick={onPlay}>
        <img
          src={video.thumbnail}
          alt={video.title}
          className="w-full h-48 object-cover"
        />
        <div className="absolute inset-0 bg-black/20 opacity-0 hover:opacity-100 transition-opacity flex items-center justify-center">
          <Play className="w-12 h-12 text-white" />
        </div>
        <div className="absolute bottom-2 right-2 bg-black/80 text-white text-xs px-2 py-1 rounded">
          {video.duration}
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        <div className="flex items-start justify-between mb-2">
          <h3 className="font-semibold text-slate-900 line-clamp-2 leading-tight">
            {video.title}
          </h3>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsSaved(!isSaved)}
            className="flex-shrink-0"
          >
            <Bookmark
              className={`w-4 h-4 ${isSaved ? "fill-current text-blue-600" : "text-slate-400"}`}
            />
          </Button>
        </div>

        <p className="text-slate-600 text-sm mb-3 line-clamp-2">
          {video.description}
        </p>

        {/* Creator Info */}
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center space-x-2">
            <img
              src={video.creator.avatar}
              alt={video.creator.name}
              className="w-8 h-8 rounded-full"
            />
            <div>
              <p className="text-sm font-medium text-slate-900">
                {video.creator.name}
              </p>
              <p className="text-xs text-slate-500">
                {video.creator.followers.toLocaleString()} followers
              </p>
            </div>
          </div>

          <Button
            size="sm"
            variant={video.creator.isFollowing ? "secondary" : "default"}
            onClick={() => onFollow(video.creator.name)}
            className="text-xs"
          >
            {video.creator.isFollowing ? "Following" : "Follow"}
          </Button>
        </div>

        {/* Metadata */}
        <div className="flex items-center justify-between text-xs text-slate-500 mb-3">
          <div className="flex items-center space-x-3">
            <span className="flex items-center space-x-1">
              <Eye className="w-3 h-3" />
              <span>{video.views.toLocaleString()}</span>
            </span>
            <span className="flex items-center space-x-1">
              <Calendar className="w-3 h-3" />
              <span>{new Date(video.uploadDate).toLocaleDateString()}</span>
            </span>
          </div>
          <Badge variant="outline" className="text-xs">
            {video.difficulty}
          </Badge>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-1 mb-3">
          {video.tags.slice(0, 3).map((tag) => (
            <Badge key={tag} variant="secondary" className="text-xs">
              #{tag}
            </Badge>
          ))}
        </div>

        {/* Actions */}
        <div className="flex items-center justify-between pt-3 border-t border-slate-100">
          <div className="flex items-center space-x-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsLiked(!isLiked)}
              className="text-xs"
            >
              <Heart
                className={`w-4 h-4 mr-1 ${isLiked ? "fill-current text-red-500" : ""}`}
              />
              {video.likes.toLocaleString()}
            </Button>

            <Button variant="ghost" size="sm" className="text-xs">
              <MessageCircle className="w-4 h-4 mr-1" />
              Comment
            </Button>
          </div>

          <Button variant="ghost" size="sm" className="text-xs">
            <Share className="w-4 h-4 mr-1" />
            Share
          </Button>
        </div>
      </div>
    </motion.div>
  );
}

export default function AIVideoHub() {
  const [videos, setVideos] = useState(videoContent);
  const [selectedVideo, setSelectedVideo] = useState<Video | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedDifficulty, setSelectedDifficulty] = useState("All");
  const { user } = useAuth();

  const categories = [
    "All",
    "Physics",
    "Mathematics",
    "Computer Science",
    "Chemistry",
    "Biology",
  ];
  const difficulties = ["All", "Beginner", "Intermediate", "Advanced"];

  const filteredVideos = videos.filter((video) => {
    const matchesSearch =
      video.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      video.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      video.tags.some((tag) =>
        tag.toLowerCase().includes(searchQuery.toLowerCase()),
      );
    const matchesCategory =
      selectedCategory === "All" || video.category === selectedCategory;
    const matchesDifficulty =
      selectedDifficulty === "All" || video.difficulty === selectedDifficulty;

    return matchesSearch && matchesCategory && matchesDifficulty;
  });

  const handleFollow = (creatorName: string) => {
    setVideos((prevVideos) =>
      prevVideos.map((video) =>
        video.creator.name === creatorName
          ? {
              ...video,
              creator: {
                ...video.creator,
                isFollowing: !video.creator.isFollowing,
                followers: video.creator.isFollowing
                  ? video.creator.followers - 1
                  : video.creator.followers + 1,
              },
            }
          : video,
      ),
    );
  };

  return (
    <div className="min-h-screen bg-white pt-20 pb-12">
      <div className="container-wide">
        <PageHeader
          title="AI Video Hub"
          subtitle="Explore high-quality educational videos with downloadable materials"
        />

        {/* Search and Filters */}
        <div className="mb-8 space-y-4">
          <div className="relative max-w-lg">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
            <Input
              placeholder="Search videos, topics, or creators..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>

          <div className="flex flex-wrap gap-4">
            <div className="flex items-center space-x-2">
              <span className="text-sm font-medium text-slate-700">
                Category:
              </span>
              {categories.map((category) => (
                <Button
                  key={category}
                  variant={
                    selectedCategory === category ? "default" : "outline"
                  }
                  size="sm"
                  onClick={() => setSelectedCategory(category)}
                >
                  {category}
                </Button>
              ))}
            </div>

            <div className="flex items-center space-x-2">
              <span className="text-sm font-medium text-slate-700">
                Difficulty:
              </span>
              {difficulties.map((difficulty) => (
                <Button
                  key={difficulty}
                  variant={
                    selectedDifficulty === difficulty ? "default" : "outline"
                  }
                  size="sm"
                  onClick={() => setSelectedDifficulty(difficulty)}
                >
                  {difficulty}
                </Button>
              ))}
            </div>
          </div>
        </div>

        {/* Videos Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredVideos.map((video) => (
            <VideoCard
              key={video.id}
              video={video}
              onPlay={() => setSelectedVideo(video)}
              onFollow={handleFollow}
            />
          ))}
        </div>

        {filteredVideos.length === 0 && (
          <div className="text-center py-12">
            <div className="w-16 h-16 mx-auto mb-4 bg-slate-100 rounded-full flex items-center justify-center">
              <Search className="w-8 h-8 text-slate-400" />
            </div>
            <h3 className="text-lg font-semibold text-slate-900 mb-2">
              No videos found
            </h3>
            <p className="text-slate-600">
              Try adjusting your search or filter criteria
            </p>
          </div>
        )}
      </div>

      {/* Video Player Modal */}
      <AnimatePresence>
        {selectedVideo && (
          <VideoPlayer
            video={selectedVideo}
            onClose={() => setSelectedVideo(null)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
