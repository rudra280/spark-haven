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
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/contexts/AuthContext";

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
  uploadedAt: string;
  isLiked: boolean;
  isBookmarked: boolean;
}

interface Comment {
  id: string;
  user: {
    name: string;
    username: string;
    avatar: string;
  };
  text: string;
  timestamp: string;
  likes: number;
  isLiked: boolean;
}

// Real educational content for reels
const eduReels: EduReel[] = [
  {
    id: "1",
    title: "Quantum Physics in 60 Seconds",
    description:
      "Understanding wave-particle duality, quantum superposition, and the observer effect in under a minute! Perfect for competitive exams like JEE and NEET.",
    videoUrl:
      "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
    thumbnail:
      "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=500",
    duration: 58,
    creator: {
      id: "creator1",
      name: "Dr. Physics Pro",
      username: "@physicsexplained",
      avatar:
        "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150",
      isVerified: true,
      followers: 125000,
      isFollowing: false,
    },
    subject: "Physics",
    difficulty: "Advanced",
    tags: ["quantum", "physics", "JEE", "NEET", "science"],
    stats: {
      views: 524000,
      likes: 42300,
      comments: 1250,
      shares: 890,
    },
    uploadedAt: "2024-01-20",
    isLiked: false,
    isBookmarked: false,
  },
  {
    id: "2",
    title: "Calculus Tricks for Competitive Exams",
    description:
      "Master integration by parts in 45 seconds! This technique works for JEE Mains, JEE Advanced, and other engineering entrance exams.",
    videoUrl:
      "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
    thumbnail:
      "https://images.unsplash.com/photo-1509228468518-180dd4864904?w=500",
    duration: 47,
    creator: {
      id: "creator2",
      name: "Math Wizard",
      username: "@mathwizard",
      avatar:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150",
      isVerified: true,
      followers: 89000,
      isFollowing: true,
    },
    subject: "Mathematics",
    difficulty: "Intermediate",
    tags: ["calculus", "integration", "JEE", "tricks", "math"],
    stats: {
      views: 892000,
      likes: 67500,
      comments: 2100,
      shares: 1450,
    },
    uploadedAt: "2024-01-22",
    isLiked: true,
    isBookmarked: true,
  },
  {
    id: "3",
    title: "NEET Biology Memory Palace",
    description:
      "Remember all 20 amino acids using this incredible memory palace technique! Perfect for NEET, AIIMS, and medical entrance preparation.",
    videoUrl:
      "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
    thumbnail:
      "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=500",
    duration: 52,
    creator: {
      id: "creator3",
      name: "NEET Guru",
      username: "@neetcrack",
      avatar:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150",
      isVerified: true,
      followers: 156000,
      isFollowing: false,
    },
    subject: "Biology",
    difficulty: "Intermediate",
    tags: ["biology", "NEET", "memory", "amino acids", "medical"],
    stats: {
      views: 673000,
      likes: 54200,
      comments: 1890,
      shares: 1120,
    },
    uploadedAt: "2024-01-18",
    isLiked: false,
    isBookmarked: false,
  },
  {
    id: "4",
    title: "Python for Data Science Quick Start",
    description:
      "Learn pandas, numpy, and matplotlib basics in under 60 seconds! Perfect for coding interviews and data science bootcamps.",
    videoUrl:
      "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4",
    thumbnail:
      "https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=500",
    duration: 55,
    creator: {
      id: "creator4",
      name: "Code Academy Pro",
      username: "@codeacademy",
      avatar:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150",
      isVerified: true,
      followers: 234000,
      isFollowing: true,
    },
    subject: "Computer Science",
    difficulty: "Beginner",
    tags: ["python", "datascience", "coding", "programming", "AI"],
    stats: {
      views: 1200000,
      likes: 89400,
      comments: 3450,
      shares: 2100,
    },
    uploadedAt: "2024-01-25",
    isLiked: true,
    isBookmarked: false,
  },
  {
    id: "5",
    title: "Organic Chemistry Reactions Hack",
    description:
      "Remember all reaction mechanisms with this ONE simple trick! Essential for JEE, NEET, and chemistry olympiads.",
    videoUrl:
      "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4",
    thumbnail:
      "https://images.unsplash.com/photo-1554475901-4538ddfbccc2?w=500",
    duration: 49,
    creator: {
      id: "creator5",
      name: "Chem Master",
      username: "@chemmaster",
      avatar:
        "https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?w=150",
      isVerified: true,
      followers: 198000,
      isFollowing: false,
    },
    subject: "Chemistry",
    difficulty: "Advanced",
    tags: ["chemistry", "organic", "reactions", "JEE", "NEET"],
    stats: {
      views: 756000,
      likes: 61200,
      comments: 2340,
      shares: 1680,
    },
    uploadedAt: "2024-01-15",
    isLiked: false,
    isBookmarked: true,
  },
];

// Sample comments for reels
const sampleComments: Comment[] = [
  {
    id: "1",
    user: {
      name: "Study Master",
      username: "@studymaster",
      avatar:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=50",
    },
    text: "This is exactly what I needed for my JEE preparation! Thank you so much! 🔥",
    timestamp: "2h ago",
    likes: 234,
    isLiked: false,
  },
  {
    id: "2",
    user: {
      name: "NEET Aspirant",
      username: "@neetfighter",
      avatar:
        "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=50",
    },
    text: "Can you make more videos on this topic? This helped me understand concepts better than my coaching classes!",
    timestamp: "4h ago",
    likes: 156,
    isLiked: true,
  },
  {
    id: "3",
    user: {
      name: "Physics Lover",
      username: "@physicslover",
      avatar:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=50",
    },
    text: "Mind = Blown 🤯 Never thought quantum physics could be this simple!",
    timestamp: "6h ago",
    likes: 89,
    isLiked: false,
  },
];

// Video Player Component
function ReelPlayer({
  reel,
  isActive,
  onVideoEnd,
}: {
  reel: EduReel;
  isActive: boolean;
  onVideoEnd: () => void;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (videoRef.current) {
      if (isActive && !isPlaying) {
        videoRef.current.play();
        setIsPlaying(true);
      } else if (!isActive && isPlaying) {
        videoRef.current.pause();
        setIsPlaying(false);
      }
    }
  }, [isActive]);

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

  const skipTime = (seconds: number) => {
    if (videoRef.current) {
      videoRef.current.currentTime += seconds;
    }
  };

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      const current = videoRef.current.currentTime;
      const duration = videoRef.current.duration;
      setCurrentTime(current);
      setProgress((current / duration) * 100);
    }
  };

  const handleVideoEnd = () => {
    setIsPlaying(false);
    onVideoEnd();
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  };

  return (
    <div className="relative w-full h-full">
      <video
        ref={videoRef}
        src={reel.videoUrl}
        className="w-full h-full object-cover"
        muted={isMuted}
        onTimeUpdate={handleTimeUpdate}
        onEnded={handleVideoEnd}
        loop={false}
        playsInline
      />

      {/* Video Controls Overlay */}
      <div
        className="absolute inset-0 flex items-center justify-center"
        onClick={togglePlay}
      >
        <AnimatePresence>
          {!isPlaying && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0 }}
              className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center"
            >
              <Play className="w-8 h-8 text-white ml-1" />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Progress Bar */}
      <div className="absolute bottom-20 left-4 right-20">
        <div className="w-full h-1 bg-white/20 rounded-full">
          <div
            className="h-full bg-white rounded-full transition-all duration-100"
            style={{ width: `${progress}%` }}
          />
        </div>
        <div className="flex justify-between text-white text-xs mt-1">
          <span>{formatTime(currentTime)}</span>
          <span>{formatTime(reel.duration)}</span>
        </div>
      </div>

      {/* Time Skip Controls */}
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

      <div className="absolute right-20 top-1/2 transform -translate-y-1/2 flex flex-col space-y-4">
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
      <div className="absolute top-4 right-4">
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
  );
}

// Reel Info Component
function ReelInfo({
  reel,
  onFollow,
  onLike,
  onBookmark,
  onComment,
  onShare,
}: {
  reel: EduReel;
  onFollow: (creatorId: string) => void;
  onLike: (reelId: string) => void;
  onBookmark: (reelId: string) => void;
  onComment: (reelId: string) => void;
  onShare: (reelId: string) => void;
}) {
  return (
    <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 via-black/20 to-transparent">
      <div className="flex justify-between">
        {/* Left side - Reel Info */}
        <div className="flex-1 pr-4">
          {/* Creator Info */}
          <div className="flex items-center space-x-3 mb-3">
            <Avatar className="w-10 h-10 border-2 border-white">
              <AvatarImage src={reel.creator.avatar} alt={reel.creator.name} />
              <AvatarFallback>{reel.creator.name[0]}</AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <div className="flex items-center space-x-2">
                <span className="text-white font-semibold">
                  {reel.creator.username}
                </span>
                {reel.creator.isVerified && (
                  <div className="w-4 h-4 bg-blue-500 rounded-full flex items-center justify-center">
                    <span className="text-white text-xs">✓</span>
                  </div>
                )}
              </div>
              <div className="text-white/80 text-sm">
                {reel.creator.followers.toLocaleString()} followers
              </div>
            </div>
            <Button
              variant={reel.creator.isFollowing ? "secondary" : "default"}
              size="sm"
              onClick={() => onFollow(reel.creator.id)}
              className={
                reel.creator.isFollowing
                  ? "bg-white/20 text-white"
                  : "bg-white text-black"
              }
            >
              {reel.creator.isFollowing ? "Following" : "Follow"}
            </Button>
          </div>

          {/* Title & Description */}
          <h3 className="text-white font-semibold mb-2">{reel.title}</h3>
          <p className="text-white/90 text-sm mb-3 line-clamp-2">
            {reel.description}
          </p>

          {/* Tags and Subject */}
          <div className="flex flex-wrap gap-2 mb-3">
            <Badge className="bg-gradient-to-r from-blue-500 to-purple-600 text-white">
              {reel.subject}
            </Badge>
            <Badge
              className={`${
                reel.difficulty === "Beginner"
                  ? "bg-green-500"
                  : reel.difficulty === "Intermediate"
                    ? "bg-yellow-500"
                    : "bg-red-500"
              } text-white`}
            >
              {reel.difficulty}
            </Badge>
            {reel.tags.slice(0, 2).map((tag) => (
              <Badge
                key={tag}
                variant="secondary"
                className="bg-white/20 text-white"
              >
                #{tag}
              </Badge>
            ))}
          </div>

          {/* Stats */}
          <div className="flex items-center space-x-4 text-white/80 text-sm">
            <span>{reel.stats.views.toLocaleString()} views</span>
            <span>•</span>
            <span>{reel.uploadedAt}</span>
          </div>
        </div>

        {/* Right side - Action Buttons */}
        <div className="flex flex-col space-y-4">
          <Button
            variant="ghost"
            size="icon"
            className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm text-white hover:bg-white/20"
            onClick={() => onLike(reel.id)}
          >
            <Heart
              className={`w-6 h-6 ${reel.isLiked ? "fill-red-500 text-red-500" : ""}`}
            />
          </Button>
          <span className="text-white text-xs text-center">
            {reel.stats.likes.toLocaleString()}
          </span>

          <Button
            variant="ghost"
            size="icon"
            className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm text-white hover:bg-white/20"
            onClick={() => onComment(reel.id)}
          >
            <MessageCircle className="w-6 h-6" />
          </Button>
          <span className="text-white text-xs text-center">
            {reel.stats.comments.toLocaleString()}
          </span>

          <Button
            variant="ghost"
            size="icon"
            className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm text-white hover:bg-white/20"
            onClick={() => onBookmark(reel.id)}
          >
            <Bookmark
              className={`w-6 h-6 ${reel.isBookmarked ? "fill-yellow-500 text-yellow-500" : ""}`}
            />
          </Button>

          <Button
            variant="ghost"
            size="icon"
            className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm text-white hover:bg-white/20"
            onClick={() => onShare(reel.id)}
          >
            <Share className="w-6 h-6" />
          </Button>
          <span className="text-white text-xs text-center">
            {reel.stats.shares.toLocaleString()}
          </span>

          <Button
            variant="ghost"
            size="icon"
            className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm text-white hover:bg-white/20"
          >
            <MoreHorizontal className="w-6 h-6" />
          </Button>
        </div>
      </div>
    </div>
  );
}

// Comments Modal Component
function CommentsModal({
  reel,
  comments,
  isOpen,
  onClose,
  onAddComment,
}: {
  reel: EduReel;
  comments: Comment[];
  isOpen: boolean;
  onClose: () => void;
  onAddComment: (text: string) => void;
}) {
  const [newComment, setNewComment] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newComment.trim()) {
      onAddComment(newComment);
      setNewComment("");
    }
  };

  if (!isOpen) return null;

  return (
    <motion.div
      className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-end justify-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div
        className="bg-white rounded-t-3xl w-full max-w-md h-[70vh] flex flex-col"
        initial={{ y: "100%" }}
        animate={{ y: 0 }}
        exit={{ y: "100%" }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b">
          <h3 className="text-lg font-semibold">
            Comments ({comments.length})
          </h3>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <ChevronLeft className="w-5 h-5" />
          </Button>
        </div>

        {/* Comments List */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
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
                  <span className="font-semibold text-sm">
                    {comment.user.username}
                  </span>
                  <span className="text-gray-500 text-xs">
                    {comment.timestamp}
                  </span>
                </div>
                <p className="text-sm text-gray-800 mt-1">{comment.text}</p>
                <div className="flex items-center space-x-4 mt-2">
                  <Button variant="ghost" size="sm" className="text-xs">
                    <Heart
                      className={`w-3 h-3 mr-1 ${comment.isLiked ? "fill-red-500 text-red-500" : ""}`}
                    />
                    {comment.likes}
                  </Button>
                  <Button variant="ghost" size="sm" className="text-xs">
                    Reply
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Add Comment */}
        <form onSubmit={handleSubmit} className="p-4 border-t">
          <div className="flex space-x-2">
            <Input
              placeholder="Add a comment..."
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              className="flex-1"
            />
            <Button type="submit" size="icon">
              <Send className="w-4 h-4" />
            </Button>
          </div>
        </form>
      </motion.div>
    </motion.div>
  );
}

export default function EduReels() {
  const [reels, setReels] = useState(eduReels);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [comments, setComments] = useState<Comment[]>(sampleComments);
  const [showComments, setShowComments] = useState(false);
  const [selectedReelId, setSelectedReelId] = useState<string | null>(null);
  const { user } = useAuth();

  const currentReel = reels[currentIndex];

  const handleNext = () => {
    if (currentIndex < reels.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      setCurrentIndex(0); // Loop back to first reel
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    } else {
      setCurrentIndex(reels.length - 1); // Loop to last reel
    }
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

  const handleBookmark = (reelId: string) => {
    setReels((prev) =>
      prev.map((reel) =>
        reel.id === reelId
          ? { ...reel, isBookmarked: !reel.isBookmarked }
          : reel,
      ),
    );
  };

  const handleComment = (reelId: string) => {
    setSelectedReelId(reelId);
    setShowComments(true);
  };

  const handleShare = (reelId: string) => {
    // Implement share functionality
    const reel = reels.find((r) => r.id === reelId);
    if (reel) {
      const shareUrl = `${window.location.origin}/reels/${reelId}`;
      navigator.clipboard.writeText(shareUrl);
      alert("Link copied to clipboard!");
    }
  };

  const handleAddComment = (text: string) => {
    const newComment: Comment = {
      id: Date.now().toString(),
      user: {
        name: user?.name || "Current User",
        username: `@${user?.name?.toLowerCase().replace(" ", "") || "user"}`,
        avatar:
          user?.avatar ||
          "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=50",
      },
      text,
      timestamp: "now",
      likes: 0,
      isLiked: false,
    };
    setComments((prev) => [newComment, ...prev]);
  };

  // Swipe handling for mobile
  const handleTouchStart = (e: React.TouchEvent) => {
    const touch = e.touches[0];
    const startY = touch.clientY;

    const handleTouchEnd = (endEvent: TouchEvent) => {
      const endTouch = endEvent.changedTouches[0];
      const endY = endTouch.clientY;
      const deltaY = startY - endY;

      if (Math.abs(deltaY) > 50) {
        if (deltaY > 0) {
          handleNext();
        } else {
          handlePrev();
        }
      }

      document.removeEventListener("touchend", handleTouchEnd);
    };

    document.addEventListener("touchend", handleTouchEnd);
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowUp") {
        e.preventDefault();
        handlePrev();
      } else if (e.key === "ArrowDown") {
        e.preventDefault();
        handleNext();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [currentIndex]);

  return (
    <div className="relative w-full h-screen bg-black overflow-hidden">
      {/* Main Reel Container */}
      <div className="w-full h-full relative" onTouchStart={handleTouchStart}>
        <ReelPlayer
          reel={currentReel}
          isActive={true}
          onVideoEnd={handleNext}
        />

        <ReelInfo
          reel={currentReel}
          onFollow={handleFollow}
          onLike={handleLike}
          onBookmark={handleBookmark}
          onComment={handleComment}
          onShare={handleShare}
        />
      </div>

      {/* Navigation Controls */}
      <div className="absolute right-4 top-1/2 transform -translate-y-1/2 flex flex-col space-y-4">
        <Button
          variant="ghost"
          size="icon"
          className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm text-white hover:bg-white/20"
          onClick={handlePrev}
        >
          <ArrowUp className="w-6 h-6" />
        </Button>

        <div className="text-white text-xs text-center bg-black/20 backdrop-blur-sm rounded px-2 py-1">
          {currentIndex + 1}/{reels.length}
        </div>

        <Button
          variant="ghost"
          size="icon"
          className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm text-white hover:bg-white/20"
          onClick={handleNext}
        >
          <ArrowDown className="w-6 h-6" />
        </Button>
      </div>

      {/* Back Button */}
      <div className="absolute top-4 left-4">
        <Button
          variant="ghost"
          size="icon"
          className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm text-white hover:bg-white/20"
          onClick={() => window.history.back()}
        >
          <ChevronLeft className="w-6 h-6" />
        </Button>
      </div>

      {/* Search Button */}
      <div className="absolute top-4 right-4">
        <Button
          variant="ghost"
          size="icon"
          className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm text-white hover:bg-white/20"
        >
          <Search className="w-6 h-6" />
        </Button>
      </div>

      {/* Comments Modal */}
      <AnimatePresence>
        {showComments && (
          <CommentsModal
            reel={currentReel}
            comments={comments}
            isOpen={showComments}
            onClose={() => setShowComments(false)}
            onAddComment={handleAddComment}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
