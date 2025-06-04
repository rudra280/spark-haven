import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Play,
  Pause,
  Volume2,
  VolumeX,
  Heart,
  MessageCircle,
  Share,
  Bookmark,
  MoreHorizontal,
  User,
  SkipBack,
  SkipForward,
  ChevronLeft,
  ArrowUp,
  ArrowDown,
  Download,
  Flag,
  UserPlus,
  Send,
  Smile,
  Camera,
  Search,
  Filter,
  CheckCircle,
  X,
  Upload as UploadIcon,
  Plus,
  Music,
  Sparkles,
  TrendingUp,
  Clock,
  Eye,
  Home,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";

interface EduReel {
  id: string;
  title: string;
  description: string;
  videoUrl: string;
  thumbnail: string;
  duration: number;
  creator: {
    id: string;
    name: string;
    username: string;
    avatar: string;
    isVerified: boolean;
    followers: number;
    isFollowing: boolean;
  };
  subject: string;
  difficulty: "Beginner" | "Intermediate" | "Advanced";
  tags: string[];
  stats: {
    views: number;
    likes: number;
    comments: number;
    shares: number;
  };
  isLiked: boolean;
  isBookmarked: boolean;
  createdAt: string;
  music?: {
    title: string;
    artist: string;
  };
}

interface Comment {
  id: string;
  user: {
    id: string;
    name: string;
    avatar: string;
    isVerified: boolean;
  };
  text: string;
  likes: number;
  isLiked: boolean;
  createdAt: string;
  replies?: Comment[];
}

// Comprehensive Educational Reels Database
const eduReels: EduReel[] = [
  {
    id: "reel_1",
    title: "Photosynthesis in 60 Seconds",
    description:
      "Learn how plants convert sunlight into energy! 🌱 Follow for more biology hacks #photosynthesis #biology #science",
    videoUrl:
      "https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4",
    thumbnail:
      "https://images.unsplash.com/photo-1532012197267-da84d127e765?w=800",
    duration: 62,
    creator: {
      id: "creator_1",
      name: "Dr. Sarah Chen",
      username: "drbiologychen",
      avatar:
        "https://images.unsplash.com/photo-1494790108755-2616b612b632?w=400",
      isVerified: true,
      followers: 245000,
      isFollowing: false,
    },
    subject: "Biology",
    difficulty: "Beginner",
    tags: ["photosynthesis", "biology", "plants", "science", "education"],
    stats: {
      views: 1240000,
      likes: 89500,
      comments: 1250,
      shares: 2300,
    },
    isLiked: false,
    isBookmarked: false,
    createdAt: "2024-01-15T10:30:00Z",
    music: {
      title: "Educational Vibes",
      artist: "Study Beats",
    },
  },
  {
    id: "reel_2",
    title: "Derivative Tricks That Will Blow Your Mind",
    description:
      "Master calculus with these simple tricks! 🧮 Save this for your next exam #calculus #math #derivatives #study",
    videoUrl:
      "https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4",
    thumbnail:
      "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=800",
    duration: 45,
    creator: {
      id: "creator_2",
      name: "Prof. Michael Kumar",
      username: "mathwithmike",
      avatar:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400",
      isVerified: true,
      followers: 180000,
      isFollowing: true,
    },
    subject: "Mathematics",
    difficulty: "Intermediate",
    tags: ["calculus", "derivatives", "math", "study", "tricks"],
    stats: {
      views: 890000,
      likes: 67200,
      comments: 890,
      shares: 1800,
    },
    isLiked: true,
    isBookmarked: true,
    createdAt: "2024-01-14T15:20:00Z",
  },
  {
    id: "reel_3",
    title: "Quantum Physics Made Simple",
    description:
      "Breaking down quantum mechanics in 60 seconds ⚛️ Mind = Blown #quantumphysics #physics #science #mindblown",
    videoUrl:
      "https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4",
    thumbnail:
      "https://images.unsplash.com/photo-1636953056323-9c09fdd74fa6?w=800",
    duration: 58,
    creator: {
      id: "creator_3",
      name: "Dr. Emily Rodriguez",
      username: "quantumemily",
      avatar:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400",
      isVerified: true,
      followers: 320000,
      isFollowing: false,
    },
    subject: "Physics",
    difficulty: "Advanced",
    tags: ["quantum", "physics", "science", "mechanics", "atoms"],
    stats: {
      views: 2100000,
      likes: 156000,
      comments: 3200,
      shares: 8900,
    },
    isLiked: false,
    isBookmarked: false,
    createdAt: "2024-01-13T09:45:00Z",
    music: {
      title: "Sci-Fi Ambience",
      artist: "Space Sounds",
    },
  },
  {
    id: "reel_4",
    title: "Organic Chemistry Mechanisms",
    description:
      "Master organic reactions with visual tricks! 🧪 Perfect for JEE & NEET prep #chemistry #organic #jeemains #neet",
    videoUrl:
      "https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4",
    thumbnail:
      "https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?w=800",
    duration: 72,
    creator: {
      id: "creator_4",
      name: "Prof. David Kim",
      username: "chemistryking",
      avatar:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400",
      isVerified: true,
      followers: 210000,
      isFollowing: false,
    },
    subject: "Chemistry",
    difficulty: "Intermediate",
    tags: ["organic", "chemistry", "reactions", "jee", "neet"],
    stats: {
      views: 750000,
      likes: 54000,
      comments: 1100,
      shares: 1900,
    },
    isLiked: false,
    isBookmarked: false,
    createdAt: "2024-01-12T14:15:00Z",
  },
  {
    id: "reel_5",
    title: "Machine Learning in 60 Seconds",
    description:
      "AI explained simply! From neural networks to deep learning 🤖 #ai #machinelearning #coding #tech",
    videoUrl:
      "https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4",
    thumbnail:
      "https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=800",
    duration: 61,
    creator: {
      id: "creator_5",
      name: "Alex Chen",
      username: "aicoder",
      avatar:
        "https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=400",
      isVerified: true,
      followers: 890000,
      isFollowing: true,
    },
    subject: "Computer Science",
    difficulty: "Advanced",
    tags: ["ai", "machinelearning", "coding", "neural networks", "tech"],
    stats: {
      views: 3200000,
      likes: 234000,
      comments: 5600,
      shares: 12000,
    },
    isLiked: true,
    isBookmarked: true,
    createdAt: "2024-01-11T11:30:00Z",
    music: {
      title: "Tech Beats",
      artist: "Digital Music",
    },
  },
];

// Mock comments data
const mockComments: { [key: string]: Comment[] } = {
  reel_1: [
    {
      id: "comment_1",
      user: {
        id: "user_1",
        name: "StudyBuddy123",
        avatar:
          "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=400",
        isVerified: false,
      },
      text: "This helped me so much for my biology exam! Thank you! 🙏",
      likes: 45,
      isLiked: false,
      createdAt: "2024-01-15T11:30:00Z",
    },
    {
      id: "comment_2",
      user: {
        id: "user_2",
        name: "BiologyNerd",
        avatar:
          "https://images.unsplash.com/photo-1494790108755-2616b612b632?w=400",
        isVerified: true,
      },
      text: "Perfect explanation! Can you do cellular respiration next?",
      likes: 23,
      isLiked: true,
      createdAt: "2024-01-15T12:15:00Z",
    },
  ],
  reel_2: [
    {
      id: "comment_3",
      user: {
        id: "user_3",
        name: "MathStudent",
        avatar:
          "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400",
        isVerified: false,
      },
      text: "Mind blown! �� Finally understand derivatives",
      likes: 78,
      isLiked: false,
      createdAt: "2024-01-14T16:20:00Z",
    },
  ],
};

export default function EduReels() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [currentReelIndex, setCurrentReelIndex] = useState(0);
  const [reels, setReels] = useState(eduReels);
  const [isPlaying, setIsPlaying] = useState(true);
  const [currentTime, setCurrentTime] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const [showComments, setShowComments] = useState(false);
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState("");
  const [showUpload, setShowUpload] = useState(false);

  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const currentReel = reels[currentReelIndex];

  // Auto-play functionality
  useEffect(() => {
    if (videoRef.current && isPlaying) {
      videoRef.current.play().catch(console.error);
    } else if (videoRef.current) {
      videoRef.current.pause();
    }
  }, [currentReelIndex, isPlaying]);

  // Load comments for current reel
  useEffect(() => {
    setComments(mockComments[currentReel?.id] || []);
  }, [currentReel]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.code === "ArrowUp") {
        e.preventDefault();
        navigateReel("up");
      } else if (e.code === "ArrowDown") {
        e.preventDefault();
        navigateReel("down");
      } else if (e.code === "Space") {
        e.preventDefault();
        togglePlay();
      }
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [currentReelIndex]);

  // Touch navigation for mobile
  useEffect(() => {
    let startY = 0;
    let endY = 0;

    const handleTouchStart = (e: TouchEvent) => {
      startY = e.touches[0].clientY;
    };

    const handleTouchEnd = (e: TouchEvent) => {
      endY = e.changedTouches[0].clientY;
      const diff = startY - endY;

      if (Math.abs(diff) > 50) {
        if (diff > 0) {
          navigateReel("down");
        } else {
          navigateReel("up");
        }
      }
    };

    const container = containerRef.current;
    if (container) {
      container.addEventListener("touchstart", handleTouchStart);
      container.addEventListener("touchend", handleTouchEnd);
    }

    return () => {
      if (container) {
        container.removeEventListener("touchstart", handleTouchStart);
        container.removeEventListener("touchend", handleTouchEnd);
      }
    };
  }, [currentReelIndex]);

  const navigateReel = (direction: "up" | "down") => {
    setCurrentTime(0);
    setIsPlaying(true);

    if (direction === "down" && currentReelIndex < reels.length - 1) {
      setCurrentReelIndex(currentReelIndex + 1);
    } else if (direction === "up" && currentReelIndex > 0) {
      setCurrentReelIndex(currentReelIndex - 1);
    }
  };

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
    }
  };

  const skipTime = (seconds: number) => {
    if (videoRef.current) {
      videoRef.current.currentTime = Math.max(
        0,
        videoRef.current.currentTime + seconds,
      );
    }
  };

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      setCurrentTime(videoRef.current.currentTime);
    }
  };

  const handleVideoEnd = () => {
    setIsPlaying(false);
    // Auto-advance to next reel
    if (currentReelIndex < reels.length - 1) {
      setTimeout(() => navigateReel("down"), 1000);
    }
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  };

  // Social actions
  const handleLike = (reelId: string) => {
    setReels((prev) =>
      prev.map((reel) =>
        reel.id === reelId
          ? {
              ...reel,
              isLiked: !reel.isLiked,
              stats: {
                ...reel.stats,
                likes: reel.isLiked
                  ? reel.stats.likes - 1
                  : reel.stats.likes + 1,
              },
            }
          : reel,
      ),
    );
  };

  const handleFollow = (creatorId: string) => {
    setReels((prev) =>
      prev.map((reel) =>
        reel.creator.id === creatorId
          ? {
              ...reel,
              creator: {
                ...reel.creator,
                isFollowing: !reel.creator.isFollowing,
                followers: reel.creator.isFollowing
                  ? reel.creator.followers - 1
                  : reel.creator.followers + 1,
              },
            }
          : reel,
      ),
    );
  };

  const handleBookmark = (reelId: string) => {
    setReels((prev) =>
      prev.map((reel) =>
        reel.id === reelId
          ? { ...reel, isBookmarked: !reel.isBookmarked }
          : reel,
      ),
    );
  };

  const handleShare = (reel: EduReel) => {
    if (navigator.share) {
      navigator.share({
        title: reel.title,
        text: reel.description,
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      // Show toast notification
    }
  };

  const handleComment = () => {
    setShowComments(true);
  };

  const handleAddComment = () => {
    if (!newComment.trim()) return;

    const comment: Comment = {
      id: `comment_${Date.now()}`,
      user: {
        id: user?.id || "anonymous",
        name: user?.name || "Anonymous",
        avatar: user?.avatar || "",
        isVerified: user?.verified || false,
      },
      text: newComment,
      likes: 0,
      isLiked: false,
      createdAt: new Date().toISOString(),
    };

    setComments((prev) => [comment, ...prev]);
    setNewComment("");

    // Update reel stats
    setReels((prev) =>
      prev.map((reel) =>
        reel.id === currentReel.id
          ? {
              ...reel,
              stats: {
                ...reel.stats,
                comments: reel.stats.comments + 1,
              },
            }
          : reel,
      ),
    );
  };

  const handleCommentLike = (commentId: string) => {
    setComments((prev) =>
      prev.map((comment) =>
        comment.id === commentId
          ? {
              ...comment,
              isLiked: !comment.isLiked,
              likes: comment.isLiked ? comment.likes - 1 : comment.likes + 1,
            }
          : comment,
      ),
    );
  };

  if (!currentReel) {
    return (
      <div className="h-screen flex items-center justify-center bg-black text-white">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">No EduReels Available</h1>
          <Button onClick={() => navigate("/")}>
            <Home className="w-4 h-4 mr-2" />
            Go Home
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      className="h-screen bg-black relative overflow-hidden select-none"
    >
      {/* Video Container */}
      <div className="h-full w-full relative">
        <video
          ref={videoRef}
          src={currentReel.videoUrl}
          className="h-full w-full object-cover"
          loop
          muted={isMuted}
          onTimeUpdate={handleTimeUpdate}
          onEnded={handleVideoEnd}
          onClick={togglePlay}
        />

        {/* Gradient Overlays */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/40 pointer-events-none" />

        {/* Top Navigation */}
        <div className="absolute top-0 left-0 right-0 p-4 flex items-center justify-between z-10">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate("/")}
            className="text-white hover:bg-white/20"
          >
            <ChevronLeft className="w-6 h-6" />
          </Button>

          <div className="flex items-center space-x-2">
            <span className="text-white font-medium">EduReels</span>
            <Badge
              variant="secondary"
              className="bg-white/20 text-white border-white/30"
            >
              {currentReelIndex + 1} / {reels.length}
            </Badge>
          </div>

          <div className="flex items-center space-x-2">
            <Button
              variant="ghost"
              size="icon"
              className="text-white hover:bg-white/20"
            >
              <Search className="w-5 h-5" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setShowUpload(true)}
              className="text-white hover:bg-white/20"
            >
              <Plus className="w-5 h-5" />
            </Button>
          </div>
        </div>

        {/* Video Progress Bar */}
        <div className="absolute top-20 left-4 right-4">
          <div className="w-full h-0.5 bg-white/20 rounded-full">
            <div
              className="h-full bg-white rounded-full transition-all duration-300"
              style={{
                width: `${(currentTime / currentReel.duration) * 100}%`,
              }}
            />
          </div>
        </div>

        {/* Center Play/Pause Button */}
        {!isPlaying && (
          <div className="absolute inset-0 flex items-center justify-center">
            <Button
              variant="ghost"
              size="icon"
              onClick={togglePlay}
              className="w-16 h-16 bg-black/40 hover:bg-black/60 rounded-full"
            >
              <Play className="w-8 h-8 text-white ml-1" />
            </Button>
          </div>
        )}

        {/* Left Info Panel */}
        <div className="absolute bottom-0 left-0 right-20 p-4">
          {/* Creator Info */}
          <div className="flex items-center space-x-3 mb-3">
            <Avatar className="w-12 h-12 border-2 border-white">
              <AvatarImage
                src={currentReel.creator.avatar}
                alt={currentReel.creator.name}
              />
              <AvatarFallback>{currentReel.creator.name[0]}</AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <div className="flex items-center space-x-2">
                <span className="text-white font-semibold text-lg">
                  @{currentReel.creator.username}
                </span>
                {currentReel.creator.isVerified && (
                  <CheckCircle className="w-5 h-5 text-blue-400" />
                )}
              </div>
              <div className="text-white/80 text-sm">
                {currentReel.creator.followers.toLocaleString()} followers
              </div>
            </div>
            <Button
              variant={
                currentReel.creator.isFollowing ? "secondary" : "default"
              }
              size="sm"
              onClick={() => handleFollow(currentReel.creator.id)}
              className={
                currentReel.creator.isFollowing
                  ? "bg-white/20 text-white border-white/30"
                  : "bg-white text-black hover:bg-white/90"
              }
            >
              {currentReel.creator.isFollowing ? (
                <>
                  <CheckCircle className="w-4 h-4 mr-1" />
                  Following
                </>
              ) : (
                <>
                  <UserPlus className="w-4 h-4 mr-1" />
                  Follow
                </>
              )}
            </Button>
          </div>

          {/* Reel Info */}
          <div className="space-y-2">
            <h2 className="text-white font-bold text-xl leading-tight">
              {currentReel.title}
            </h2>
            <p className="text-white/90 text-sm leading-relaxed">
              {currentReel.description}
            </p>

            {/* Tags and Subject */}
            <div className="flex items-center space-x-2 flex-wrap">
              <Badge variant="secondary" className="bg-blue-500/80 text-white">
                {currentReel.subject}
              </Badge>
              <Badge variant="outline" className="border-white/40 text-white">
                {currentReel.difficulty}
              </Badge>
              {currentReel.tags.slice(0, 3).map((tag, index) => (
                <span key={index} className="text-blue-300 text-sm">
                  #{tag}
                </span>
              ))}
            </div>

            {/* Music */}
            {currentReel.music && (
              <div className="flex items-center space-x-2 text-white/80 text-sm">
                <Music className="w-4 h-4" />
                <span>
                  {currentReel.music.title} - {currentReel.music.artist}
                </span>
              </div>
            )}

            {/* Stats */}
            <div className="flex items-center space-x-4 text-white/80 text-sm">
              <div className="flex items-center space-x-1">
                <Eye className="w-4 h-4" />
                <span>{(currentReel.stats.views / 1000000).toFixed(1)}M</span>
              </div>
              <div className="flex items-center space-x-1">
                <Heart className="w-4 h-4" />
                <span>{(currentReel.stats.likes / 1000).toFixed(0)}K</span>
              </div>
              <div className="flex items-center space-x-1">
                <MessageCircle className="w-4 h-4" />
                <span>{currentReel.stats.comments}</span>
              </div>
              <div className="flex items-center space-x-1">
                <Clock className="w-4 h-4" />
                <span>{formatTime(currentReel.duration)}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Action Panel */}
        <div className="absolute right-4 bottom-20 flex flex-col space-y-6">
          {/* Like Button */}
          <div className="text-center">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => handleLike(currentReel.id)}
              className={`w-12 h-12 rounded-full ${
                currentReel.isLiked
                  ? "bg-red-500/20 text-red-400"
                  : "bg-black/40 text-white hover:bg-black/60"
              }`}
            >
              <Heart
                className={`w-6 h-6 ${currentReel.isLiked ? "fill-current" : ""}`}
              />
            </Button>
            <div className="text-white text-xs mt-1 font-medium">
              {(currentReel.stats.likes / 1000).toFixed(0)}K
            </div>
          </div>

          {/* Comment Button */}
          <div className="text-center">
            <Button
              variant="ghost"
              size="icon"
              onClick={handleComment}
              className="w-12 h-12 rounded-full bg-black/40 text-white hover:bg-black/60"
            >
              <MessageCircle className="w-6 h-6" />
            </Button>
            <div className="text-white text-xs mt-1 font-medium">
              {currentReel.stats.comments}
            </div>
          </div>

          {/* Bookmark Button */}
          <div className="text-center">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => handleBookmark(currentReel.id)}
              className={`w-12 h-12 rounded-full ${
                currentReel.isBookmarked
                  ? "bg-blue-500/20 text-blue-400"
                  : "bg-black/40 text-white hover:bg-black/60"
              }`}
            >
              <Bookmark
                className={`w-6 h-6 ${currentReel.isBookmarked ? "fill-current" : ""}`}
              />
            </Button>
          </div>

          {/* Share Button */}
          <div className="text-center">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => handleShare(currentReel)}
              className="w-12 h-12 rounded-full bg-black/40 text-white hover:bg-black/60"
            >
              <Share className="w-6 h-6" />
            </Button>
            <div className="text-white text-xs mt-1 font-medium">
              {(currentReel.stats.shares / 1000).toFixed(1)}K
            </div>
          </div>

          {/* Download Button */}
          <div className="text-center">
            <Button
              variant="ghost"
              size="icon"
              className="w-12 h-12 rounded-full bg-black/40 text-white hover:bg-black/60"
            >
              <Download className="w-6 h-6" />
            </Button>
          </div>
        </div>

        {/* Navigation Arrows */}
        <div className="absolute left-1/2 transform -translate-x-1/2 bottom-6 flex flex-col space-y-2">
          {currentReelIndex > 0 && (
            <Button
              variant="ghost"
              size="icon"
              onClick={() => navigateReel("up")}
              className="w-10 h-10 rounded-full bg-black/40 text-white hover:bg-black/60"
            >
              <ArrowUp className="w-5 h-5" />
            </Button>
          )}
          {currentReelIndex < reels.length - 1 && (
            <Button
              variant="ghost"
              size="icon"
              onClick={() => navigateReel("down")}
              className="w-10 h-10 rounded-full bg-black/40 text-white hover:bg-black/60"
            >
              <ArrowDown className="w-5 h-5" />
            </Button>
          )}
        </div>

        {/* Skip Controls */}
        <div className="absolute left-4 top-1/2 transform -translate-y-1/2 flex flex-col space-y-4">
          <Button
            variant="ghost"
            size="icon"
            className="text-white bg-black/20 backdrop-blur-sm hover:bg-black/40"
            onClick={() => skipTime(-10)}
          >
            <SkipBack className="w-5 h-5" />
          </Button>
          <div className="text-white text-xs text-center bg-black/20 backdrop-blur-sm rounded px-2 py-1">
            -10s
          </div>
        </div>

        <div className="absolute right-24 top-1/2 transform -translate-y-1/2 flex flex-col space-y-4">
          <Button
            variant="ghost"
            size="icon"
            className="text-white bg-black/20 backdrop-blur-sm hover:bg-black/40"
            onClick={() => skipTime(10)}
          >
            <SkipForward className="w-5 h-5" />
          </Button>
          <div className="text-white text-xs text-center bg-black/20 backdrop-blur-sm rounded px-2 py-1">
            +10s
          </div>
        </div>

        {/* Volume Control */}
        <div className="absolute top-32 right-4">
          <Button
            variant="ghost"
            size="icon"
            className="text-white bg-black/20 backdrop-blur-sm hover:bg-black/40"
            onClick={toggleMute}
          >
            {isMuted ? (
              <VolumeX className="w-5 h-5" />
            ) : (
              <Volume2 className="w-5 h-5" />
            )}
          </Button>
        </div>
      </div>

      {/* Comments Modal */}
      <AnimatePresence>
        {showComments && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-end"
            onClick={() => setShowComments(false)}
          >
            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 500 }}
              className="w-full max-h-[70vh] bg-white rounded-t-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-4 border-b">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold text-lg">
                    Comments ({comments.length})
                  </h3>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setShowComments(false)}
                  >
                    <X className="w-5 h-5" />
                  </Button>
                </div>
              </div>

              <div className="flex-1 overflow-y-auto max-h-96 p-4">
                <div className="space-y-4">
                  {comments.map((comment) => (
                    <div key={comment.id} className="flex space-x-3">
                      <Avatar className="w-8 h-8">
                        <AvatarImage
                          src={comment.user.avatar}
                          alt={comment.user.name}
                        />
                        <AvatarFallback>{comment.user.name[0]}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <div className="flex items-center space-x-2">
                          <span className="font-medium text-sm">
                            {comment.user.name}
                          </span>
                          {comment.user.isVerified && (
                            <CheckCircle className="w-4 h-4 text-blue-500" />
                          )}
                          <span className="text-xs text-gray-500">
                            {new Date(comment.createdAt).toLocaleDateString()}
                          </span>
                        </div>
                        <p className="text-sm text-gray-800 mt-1">
                          {comment.text}
                        </p>
                        <div className="flex items-center space-x-4 mt-2">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleCommentLike(comment.id)}
                            className={`h-6 px-2 ${
                              comment.isLiked ? "text-red-500" : "text-gray-500"
                            }`}
                          >
                            <Heart
                              className={`w-3 h-3 mr-1 ${comment.isLiked ? "fill-current" : ""}`}
                            />
                            {comment.likes}
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-6 px-2 text-gray-500"
                          >
                            Reply
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Add Comment */}
              <div className="p-4 border-t">
                <div className="flex space-x-3">
                  <Avatar className="w-8 h-8">
                    <AvatarImage src={user?.avatar} alt={user?.name} />
                    <AvatarFallback>{user?.name?.[0] || "U"}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1 flex space-x-2">
                    <Input
                      value={newComment}
                      onChange={(e) => setNewComment(e.target.value)}
                      placeholder="Add a comment..."
                      onKeyPress={(e) =>
                        e.key === "Enter" && handleAddComment()
                      }
                    />
                    <Button
                      onClick={handleAddComment}
                      disabled={!newComment.trim()}
                      size="sm"
                    >
                      <Send className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
