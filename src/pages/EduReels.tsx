import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import {
  Play,
  Pause,
  Heart,
  MessageCircle,
  Share2,
  Bookmark,
  Volume2,
  VolumeX,
  MoreVertical,
  ChevronUp,
  ChevronDown,
  Verified,
  TrendingUp,
  Eye,
  ArrowLeft,
  Home,
  Search,
  Plus,
  User,
  Settings,
  Download,
  Copy,
  Flag,
  UserPlus,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAuth } from "@/contexts/AuthContext";

interface EduReel {
  id: string;
  title: string;
  description: string;
  videoUrl: string;
  thumbnail: string;
  creator: {
    id: string;
    name: string;
    username: string;
    avatar: string;
    verified: boolean;
    followers: number;
  };
  subject: string;
  difficulty: "Beginner" | "Intermediate" | "Advanced";
  duration: number;
  likes: number;
  comments: number;
  shares: number;
  views: number;
  trending: boolean;
  tags: string[];
  uploadedAt: string;
}

const mockReels: EduReel[] = [
  {
    id: "1",
    title: "Quantum Physics in 60 Seconds",
    description:
      "Mind-blowing quantum mechanics explained simply! 🤯 Double-slit experiment breakdown that will change how you see reality. #QuantumPhysics #Science #Education",
    videoUrl:
      "https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4",
    thumbnail:
      "https://images.unsplash.com/photo-1636819488537-a9b1ffb315de?w=400",
    creator: {
      id: "dr_quantum",
      name: "Dr. Sarah Quantum",
      username: "@dr_quantum",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=sarah",
      verified: true,
      followers: 1200000,
    },
    subject: "Physics",
    difficulty: "Intermediate",
    duration: 60,
    likes: 45600,
    comments: 2300,
    shares: 890,
    views: 1200000,
    trending: true,
    tags: ["quantum", "physics", "science", "experiment"],
    uploadedAt: "2024-01-15T10:30:00Z",
  },
  {
    id: "2",
    title: "AI Art Generation Secrets",
    description:
      "Create stunning AI art in minutes! 🎨 Prompting techniques that professionals use. Get ready to blow your mind! #AIArt #Midjourney #DigitalArt #Tutorial",
    videoUrl:
      "https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_2mb.mp4",
    thumbnail:
      "https://images.unsplash.com/photo-1686191128892-342d5b119162?w=400",
    creator: {
      id: "ai_artist",
      name: "Maya Digital",
      username: "@ai_artist",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=maya",
      verified: true,
      followers: 890000,
    },
    subject: "Technology",
    difficulty: "Beginner",
    duration: 45,
    likes: 67800,
    comments: 4500,
    shares: 1200,
    views: 2100000,
    trending: true,
    tags: ["ai", "art", "tutorial", "creative"],
    uploadedAt: "2024-01-14T15:45:00Z",
  },
  {
    id: "3",
    title: "Spanish in 30 Seconds",
    description:
      "¡Hola! Learn 10 essential Spanish phrases that will impress anyone! Perfect for beginners 🇪🇸 #SpanishLessons #Language #Learning #Travel",
    videoUrl:
      "https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4",
    thumbnail:
      "https://images.unsplash.com/photo-1544717297-fa95b6ee9643?w=400",
    creator: {
      id: "spanish_teacher",
      name: "Carlos Rodriguez",
      username: "@spanish_teacher",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=carlos",
      verified: false,
      followers: 450000,
    },
    subject: "Languages",
    difficulty: "Beginner",
    duration: 30,
    likes: 23400,
    comments: 890,
    shares: 567,
    views: 750000,
    trending: false,
    tags: ["spanish", "language", "phrases", "travel"],
    uploadedAt: "2024-01-13T09:20:00Z",
  },
  {
    id: "4",
    title: "Calculus Made Easy",
    description:
      "Derivatives explained with pizza! 🍕 Finally understand calculus with this simple analogy. Your math teacher will be impressed! #Calculus #Math #Education",
    videoUrl:
      "https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_2mb.mp4",
    thumbnail:
      "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=400",
    creator: {
      id: "math_wizard",
      name: "Professor Mike",
      username: "@math_wizard",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=mike",
      verified: true,
      followers: 2100000,
    },
    subject: "Mathematics",
    difficulty: "Advanced",
    duration: 75,
    likes: 89300,
    comments: 5600,
    shares: 2100,
    views: 3200000,
    trending: true,
    tags: ["calculus", "math", "derivatives", "tutorial"],
    uploadedAt: "2024-01-12T14:10:00Z",
  },
  {
    id: "5",
    title: "Photosynthesis Rap",
    description:
      "🌱 Learn photosynthesis with this catchy rap! Science has never been this fun. You'll remember this forever! #Biology #Science #Rap #Plants",
    videoUrl:
      "https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4",
    thumbnail:
      "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=400",
    creator: {
      id: "bio_rapper",
      name: "DJ Biology",
      username: "@bio_rapper",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=dj",
      verified: false,
      followers: 680000,
    },
    subject: "Biology",
    difficulty: "Beginner",
    duration: 40,
    likes: 156000,
    comments: 8900,
    shares: 4500,
    views: 5600000,
    trending: true,
    tags: ["biology", "photosynthesis", "rap", "plants"],
    uploadedAt: "2024-01-11T16:30:00Z",
  },
];

function ReelCard({
  reel,
  isActive,
  onLike,
  onComment,
  onShare,
}: {
  reel: EduReel;
  isActive: boolean;
  onLike: () => void;
  onComment: () => void;
  onShare: () => void;
}) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [liked, setLiked] = useState(false);
  const [bookmarked, setBookmarked] = useState(false);
  const [following, setFollowing] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (isActive && videoRef.current) {
      videoRef.current.play();
      setIsPlaying(true);
    } else if (videoRef.current) {
      videoRef.current.pause();
      setIsPlaying(false);
    }
  }, [isActive]);

  const handlePlayPause = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleLike = () => {
    setLiked(!liked);
    onLike();
  };

  const handleFollow = () => {
    setFollowing(!following);
  };

  const formatNumber = (num: number) => {
    if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
    if (num >= 1000) return `${(num / 1000).toFixed(1)}K`;
    return num.toString();
  };

  return (
    <div className="relative h-screen w-full overflow-hidden bg-black">
      {/* Video Background */}
      <video
        ref={videoRef}
        className="absolute inset-0 w-full h-full object-cover"
        poster={reel.thumbnail}
        loop
        muted={isMuted}
        playsInline
      >
        <source src={reel.videoUrl} type="video/mp4" />
      </video>

      {/* Gradient Overlays */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20" />

      {/* Play/Pause Overlay */}
      <motion.div
        className="absolute inset-0 flex items-center justify-center"
        animate={{ opacity: isPlaying ? 0 : 1 }}
        transition={{ duration: 0.3 }}
      >
        <Button
          size="icon"
          variant="ghost"
          className="w-20 h-20 rounded-full bg-white/20 backdrop-blur-sm border border-white/30"
          onClick={handlePlayPause}
        >
          {isPlaying ? (
            <Pause className="w-10 h-10 text-white" />
          ) : (
            <Play className="w-10 h-10 text-white ml-1" />
          )}
        </Button>
      </motion.div>

      {/* Top Gradient with Trending Badge */}
      <div className="absolute top-0 left-0 right-0 p-4 bg-gradient-to-b from-black/50 to-transparent">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Badge className="bg-gradient-to-r from-orange-500 via-pink-500 to-violet-500 text-white border-0">
              🌍 LEARNVERSE
            </Badge>
            {reel.trending && (
              <Badge className="bg-red-500 text-white border-0 animate-pulse">
                <TrendingUp className="w-3 h-3 mr-1" />
                TRENDING
              </Badge>
            )}
          </div>
          <div className="flex items-center space-x-2 text-white/80 text-sm">
            <Eye className="w-4 h-4" />
            <span>{formatNumber(reel.views)}</span>
          </div>
        </div>
      </div>

      {/* Bottom Content */}
      <div className="absolute bottom-0 left-0 right-0 p-6">
        <div className="flex items-end justify-between">
          {/* Left Content */}
          <div className="flex-1 pr-4">
            {/* Creator Info */}
            <div className="flex items-center space-x-3 mb-3">
              <Avatar className="w-12 h-12 border-2 border-white">
                <AvatarImage src={reel.creator.avatar} />
                <AvatarFallback>{reel.creator.name[0]}</AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <div className="flex items-center space-x-2">
                  <h4 className="text-white font-semibold">
                    {reel.creator.name}
                  </h4>
                  {reel.creator.verified && (
                    <Verified className="w-4 h-4 text-blue-500 fill-current" />
                  )}
                </div>
                <p className="text-white/70 text-sm">{reel.creator.username}</p>
              </div>
              <Button
                size="sm"
                onClick={handleFollow}
                className={`${
                  following
                    ? "bg-gray-600 text-white"
                    : "bg-gradient-to-r from-orange-500 via-pink-500 to-violet-500 text-white"
                } border-0 hover:opacity-90`}
              >
                {following ? "Following" : "Follow"}
              </Button>
            </div>

            {/* Title & Description */}
            <h3 className="text-white text-lg font-bold mb-2">{reel.title}</h3>
            <p className="text-white/90 text-sm mb-3 line-clamp-2">
              {reel.description}
            </p>

            {/* Tags */}
            <div className="flex flex-wrap gap-2 mb-3">
              <Badge
                variant="outline"
                className="text-white border-white/30 bg-white/10"
              >
                {reel.subject}
              </Badge>
              <Badge
                variant="outline"
                className="text-white border-white/30 bg-white/10"
              >
                {reel.difficulty}
              </Badge>
              {reel.tags.slice(0, 2).map((tag) => (
                <Badge
                  key={tag}
                  variant="outline"
                  className="text-white border-white/30 bg-white/10"
                >
                  #{tag}
                </Badge>
              ))}
            </div>

            {/* Audio Control */}
            <Button
              size="icon"
              variant="ghost"
              className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-sm"
              onClick={() => setIsMuted(!isMuted)}
            >
              {isMuted ? (
                <VolumeX className="w-4 h-4 text-white" />
              ) : (
                <Volume2 className="w-4 h-4 text-white" />
              )}
            </Button>
          </div>

          {/* Right Actions */}
          <div className="flex flex-col items-center space-y-4">
            {/* Like */}
            <motion.div
              className="flex flex-col items-center"
              whileTap={{ scale: 0.9 }}
            >
              <Button
                size="icon"
                variant="ghost"
                className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm"
                onClick={handleLike}
              >
                <Heart
                  className={`w-6 h-6 ${
                    liked ? "text-red-500 fill-current" : "text-white"
                  }`}
                />
              </Button>
              <span className="text-white text-xs mt-1">
                {formatNumber(reel.likes + (liked ? 1 : 0))}
              </span>
            </motion.div>

            {/* Comment */}
            <motion.div
              className="flex flex-col items-center"
              whileTap={{ scale: 0.9 }}
            >
              <Button
                size="icon"
                variant="ghost"
                className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm"
                onClick={onComment}
              >
                <MessageCircle className="w-6 h-6 text-white" />
              </Button>
              <span className="text-white text-xs mt-1">
                {formatNumber(reel.comments)}
              </span>
            </motion.div>

            {/* Share */}
            <motion.div
              className="flex flex-col items-center"
              whileTap={{ scale: 0.9 }}
            >
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    size="icon"
                    variant="ghost"
                    className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm"
                  >
                    <Share2 className="w-6 h-6 text-white" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  align="end"
                  className="bg-slate-800/95 backdrop-blur-xl border-white/20"
                >
                  <DropdownMenuItem className="text-white hover:bg-white/10">
                    <Copy className="w-4 h-4 mr-2" />
                    Copy Link
                  </DropdownMenuItem>
                  <DropdownMenuItem className="text-white hover:bg-white/10">
                    <Download className="w-4 h-4 mr-2" />
                    Download
                  </DropdownMenuItem>
                  <DropdownMenuSeparator className="border-white/20" />
                  <DropdownMenuItem className="text-red-400 hover:bg-red-500/10">
                    <Flag className="w-4 h-4 mr-2" />
                    Report
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
              <span className="text-white text-xs mt-1">
                {formatNumber(reel.shares)}
              </span>
            </motion.div>

            {/* Bookmark */}
            <motion.div whileTap={{ scale: 0.9 }}>
              <Button
                size="icon"
                variant="ghost"
                className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm"
                onClick={() => setBookmarked(!bookmarked)}
              >
                <Bookmark
                  className={`w-6 h-6 ${
                    bookmarked ? "text-yellow-500 fill-current" : "text-white"
                  }`}
                />
              </Button>
            </motion.div>

            {/* Creator Profile */}
            <motion.div whileTap={{ scale: 0.9 }}>
              <Avatar className="w-12 h-12 border-2 border-white">
                <AvatarImage src={reel.creator.avatar} />
                <AvatarFallback>{reel.creator.name[0]}</AvatarFallback>
              </Avatar>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Navigation Hints */}
      <div className="absolute right-4 top-1/2 transform -translate-y-1/2 flex flex-col items-center space-y-2">
        <ChevronUp className="w-6 h-6 text-white/50 animate-bounce" />
        <div className="w-px h-8 bg-white/30" />
        <ChevronDown className="w-6 h-6 text-white/50 animate-bounce" />
      </div>
    </div>
  );
}

export default function EduReels() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showNavigation, setShowNavigation] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);
  const touchStartY = useRef(0);
  const isScrolling = useRef(false);
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuth();

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let startY = 0;
    let currentY = 0;
    let isTouch = false;

    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      if (isScrolling.current) return;

      if (e.deltaY > 0 && currentIndex < mockReels.length - 1) {
        // Scroll down
        navigateToReel(currentIndex + 1);
      } else if (e.deltaY < 0 && currentIndex > 0) {
        // Scroll up
        navigateToReel(currentIndex - 1);
      }
    };

    const handleTouchStart = (e: TouchEvent) => {
      startY = e.touches[0].clientY;
      isTouch = true;
    };

    const handleTouchMove = (e: TouchEvent) => {
      e.preventDefault();
      currentY = e.touches[0].clientY;
    };

    const handleTouchEnd = () => {
      if (!isTouch || isScrolling.current) return;

      const diff = startY - currentY;
      const threshold = 50;

      if (Math.abs(diff) > threshold) {
        if (diff > 0 && currentIndex < mockReels.length - 1) {
          // Swipe up - next reel
          navigateToReel(currentIndex + 1);
        } else if (diff < 0 && currentIndex > 0) {
          // Swipe down - previous reel
          navigateToReel(currentIndex - 1);
        }
      }

      isTouch = false;
    };

    const navigateToReel = (newIndex: number) => {
      if (isScrolling.current) return;

      isScrolling.current = true;
      setCurrentIndex(newIndex);

      if (container) {
        container.style.transform = `translateY(-${newIndex * 100}vh)`;
        container.style.transition =
          "transform 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94)";

        setTimeout(() => {
          isScrolling.current = false;
          if (container) {
            container.style.transition = "";
          }
        }, 600);
      }
    };

    container.addEventListener("wheel", handleWheel, { passive: false });
    container.addEventListener("touchstart", handleTouchStart, {
      passive: false,
    });
    container.addEventListener("touchmove", handleTouchMove, {
      passive: false,
    });
    container.addEventListener("touchend", handleTouchEnd);

    // Keyboard navigation
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowUp" && currentIndex > 0) {
        navigateToReel(currentIndex - 1);
      } else if (e.key === "ArrowDown" && currentIndex < mockReels.length - 1) {
        navigateToReel(currentIndex + 1);
      } else if (e.key === "Escape") {
        navigate("/");
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    // Auto-hide navigation after 3 seconds
    const hideNavTimer = setTimeout(() => {
      setShowNavigation(false);
    }, 3000);

    return () => {
      container.removeEventListener("wheel", handleWheel);
      container.removeEventListener("touchstart", handleTouchStart);
      container.removeEventListener("touchmove", handleTouchMove);
      container.removeEventListener("touchend", handleTouchEnd);
      document.removeEventListener("keydown", handleKeyDown);
      clearTimeout(hideNavTimer);
    };
  }, [currentIndex, navigate]);

  const handleLike = () => {
    // Add haptic feedback
    if (navigator.vibrate) {
      navigator.vibrate(50);
    }
  };

  const handleComment = () => {
    // Open comment modal (implement as needed)
    console.log("Open comments");
  };

  const handleShare = () => {
    // Implement share functionality
    if (navigator.share) {
      navigator.share({
        title: mockReels[currentIndex].title,
        text: mockReels[currentIndex].description,
        url: window.location.href,
      });
    }
  };

  return (
    <div className="relative h-screen overflow-hidden bg-black">
      {/* Top Navigation Bar */}
      <AnimatePresence>
        {showNavigation && (
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            className="fixed top-0 left-0 right-0 z-50 bg-black/50 backdrop-blur-xl border-b border-white/10"
            onMouseEnter={() => setShowNavigation(true)}
          >
            <div className="flex items-center justify-between p-4">
              {/* Left - Back Button */}
              <div className="flex items-center space-x-4">
                <Button
                  size="icon"
                  variant="ghost"
                  className="text-white hover:bg-white/10"
                  onClick={() => navigate("/")}
                >
                  <ArrowLeft className="w-5 h-5" />
                </Button>
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 bg-gradient-to-br from-orange-500 via-pink-500 to-violet-500 rounded-lg flex items-center justify-center">
                    <span className="text-white text-sm">🌍</span>
                  </div>
                  <span className="text-white font-semibold">EduReels</span>
                </div>
              </div>

              {/* Center - Search */}
              <div className="flex-1 max-w-md mx-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-white/50" />
                  <input
                    type="text"
                    placeholder="Search reels..."
                    className="w-full pl-10 pr-4 py-2 bg-white/10 border border-white/20 rounded-full text-white placeholder:text-white/50 focus:outline-none focus:border-white/40"
                  />
                </div>
              </div>

              {/* Right - Navigation & User */}
              <div className="flex items-center space-x-2">
                <Button
                  size="icon"
                  variant="ghost"
                  className="text-white hover:bg-white/10"
                  onClick={() => navigate("/")}
                >
                  <Home className="w-5 h-5" />
                </Button>

                {isAuthenticated ? (
                  <>
                    <Button
                      size="icon"
                      variant="ghost"
                      className="text-white hover:bg-white/10"
                      onClick={() => navigate("/video-upload")}
                    >
                      <Plus className="w-5 h-5" />
                    </Button>
                    <Button
                      size="icon"
                      variant="ghost"
                      className="text-white hover:bg-white/10"
                      onClick={() => navigate("/dashboard")}
                    >
                      <User className="w-5 h-5" />
                    </Button>
                  </>
                ) : (
                  <Button
                    size="sm"
                    className="bg-gradient-to-r from-orange-500 via-pink-500 to-violet-500 text-white"
                    onClick={() => navigate("/login")}
                  >
                    Sign In
                  </Button>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Reels Container */}
      <div
        ref={containerRef}
        className="relative"
        style={{ transform: `translateY(-${currentIndex * 100}vh)` }}
      >
        {mockReels.map((reel, index) => (
          <ReelCard
            key={reel.id}
            reel={reel}
            isActive={index === currentIndex}
            onLike={handleLike}
            onComment={handleComment}
            onShare={handleShare}
          />
        ))}
      </div>

      {/* Progress Indicator */}
      <div className="fixed left-2 top-1/2 transform -translate-y-1/2 flex flex-col space-y-1 z-50">
        {mockReels.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-1 h-8 rounded-full transition-all duration-300 ${
              index === currentIndex
                ? "bg-gradient-to-b from-orange-500 via-pink-500 to-violet-500"
                : "bg-white/30 hover:bg-white/50"
            }`}
          />
        ))}
      </div>

      {/* Show Navigation Button */}
      {!showNavigation && (
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          onClick={() => setShowNavigation(true)}
          className="fixed top-4 left-4 z-40 w-10 h-10 bg-black/50 backdrop-blur-xl rounded-full flex items-center justify-center text-white hover:bg-black/70 transition-colors"
        >
          <Settings className="w-5 h-5" />
        </motion.button>
      )}

      {/* Bottom Quick Actions */}
      <div className="fixed bottom-4 right-4 z-40 flex flex-col space-y-2">
        <Button
          size="icon"
          className="w-12 h-12 rounded-full bg-gradient-to-r from-orange-500 via-pink-500 to-violet-500 text-white shadow-lg hover:opacity-90"
          onClick={() => navigate("/video-upload")}
        >
          <Plus className="w-6 h-6" />
        </Button>

        <Button
          size="icon"
          variant="ghost"
          className="w-12 h-12 rounded-full bg-black/50 backdrop-blur-xl text-white hover:bg-black/70"
          onClick={() => navigate("/")}
        >
          <Home className="w-6 h-6" />
        </Button>
      </div>

      {/* Instructions Overlay */}
      <AnimatePresence>
        {currentIndex === 0 && (
          <motion.div
            initial={{ opacity: 1 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ delay: 2, duration: 1 }}
            className="fixed bottom-20 left-1/2 transform -translate-x-1/2 z-40 bg-black/80 backdrop-blur-xl rounded-full px-6 py-3 text-white text-sm"
          >
            Swipe up/down or use arrow keys to navigate
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
