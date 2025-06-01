import React, { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Play,
  Pause,
  Heart,
  Share2,
  BookmarkPlus,
  MessageCircle,
  Volume2,
  VolumeX,
  MoreHorizontal,
  ArrowUp,
  ArrowDown,
  Sparkles,
  Globe,
  TrendingUp,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface EduReel {
  id: string;
  title: string;
  creator: {
    name: string;
    avatar: string;
    verified: boolean;
    followers: string;
  };
  subject: string;
  difficulty: "Beginner" | "Intermediate" | "Advanced";
  duration: string;
  likes: number;
  comments: number;
  shares: number;
  views: string;
  thumbnail: string;
  tags: string[];
  description: string;
}

const eduReels: EduReel[] = [
  {
    id: "1",
    title: "How Black Holes Work in 60 Seconds! 🌌",
    creator: {
      name: "Dr. Sarah Cosmos",
      avatar: "",
      verified: true,
      followers: "1.2M",
    },
    subject: "Astrophysics",
    difficulty: "Beginner",
    duration: "0:58",
    likes: 47832,
    comments: 2341,
    shares: 8976,
    views: "2.1M",
    thumbnail:
      "https://images.unsplash.com/photo-1446776877081-d282a0f896e2?w=400",
    tags: ["space", "physics", "blackhole", "science"],
    description:
      "Mind-blowing explanation of how black holes bend space-time! Perfect for beginners who love space! 🚀✨",
  },
  {
    id: "2",
    title: "Ancient Egyptian Hieroglyphs Decoded! 📜",
    creator: {
      name: "Prof. Ahmed Hassan",
      avatar: "",
      verified: true,
      followers: "890K",
    },
    subject: "History",
    difficulty: "Intermediate",
    duration: "1:24",
    likes: 32145,
    comments: 1876,
    shares: 5432,
    views: "1.8M",
    thumbnail:
      "https://images.unsplash.com/photo-1539650116574-75c0c6d88c9b?w=400",
    tags: ["history", "egypt", "hieroglyphs", "ancient"],
    description:
      "Learn to read actual hieroglyphs from the pyramids! Amazing historical insights in under 2 minutes! 🏺",
  },
  {
    id: "3",
    title: "Perfect Pasta Science! 🍝",
    creator: {
      name: "Chef Maria Romano",
      avatar: "",
      verified: false,
      followers: "234K",
    },
    subject: "Culinary Arts",
    difficulty: "Beginner",
    duration: "0:45",
    likes: 89213,
    comments: 4567,
    shares: 12389,
    views: "3.2M",
    thumbnail:
      "https://images.unsplash.com/photo-1551782450-17144efb9c50?w=400",
    tags: ["cooking", "pasta", "italian", "food-science"],
    description:
      "The REAL science behind perfect al-dente pasta! Game-changing cooking tip from Italy! 🇮🇹👨‍🍳",
  },
  {
    id: "4",
    title: "Mandarin in 60 Seconds! 你好世界",
    creator: {
      name: "李小明 (Li Xiaoming)",
      avatar: "",
      verified: true,
      followers: "2.8M",
    },
    subject: "Languages",
    difficulty: "Beginner",
    duration: "1:02",
    likes: 156723,
    comments: 8934,
    shares: 23456,
    views: "5.7M",
    thumbnail:
      "https://images.unsplash.com/photo-1528360983277-13d401cdc186?w=400",
    tags: ["chinese", "mandarin", "language", "pronunciation"],
    description:
      "Learn essential Mandarin phrases with perfect pronunciation! Connect with 1 billion speakers! 🇨🇳✨",
  },
  {
    id: "5",
    title: "Mental Math Tricks That Will Amaze You! 🧮",
    creator: {
      name: "Math Wizard Mike",
      avatar: "",
      verified: true,
      followers: "1.5M",
    },
    subject: "Mathematics",
    difficulty: "Intermediate",
    duration: "1:15",
    likes: 73492,
    comments: 3241,
    shares: 9876,
    views: "2.9M",
    thumbnail:
      "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=400",
    tags: ["math", "tricks", "calculation", "mental-math"],
    description:
      "Multiply any 2-digit numbers instantly in your head! These ancient techniques will blow your mind! 🤯",
  },
];

export default function EduReels() {
  const [currentReel, setCurrentReel] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(false);
  const [likedReels, setLikedReels] = useState<Set<string>>(new Set());
  const videoRefs = useRef<HTMLVideoElement[]>([]);

  const handleScroll = (direction: "up" | "down") => {
    if (direction === "up" && currentReel > 0) {
      setCurrentReel(currentReel - 1);
    } else if (direction === "down" && currentReel < eduReels.length - 1) {
      setCurrentReel(currentReel + 1);
    }
  };

  const toggleLike = (reelId: string) => {
    setLikedReels((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(reelId)) {
        newSet.delete(reelId);
      } else {
        newSet.add(reelId);
      }
      return newSet;
    });
  };

  const formatNumber = (num: number) => {
    if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
    if (num >= 1000) return `${(num / 1000).toFixed(1)}K`;
    return num.toString();
  };

  const currentReelData = eduReels[currentReel];

  return (
    <div className="min-h-screen pt-16 bg-black text-white overflow-hidden">
      {/* Header */}
      <div className="fixed top-16 left-0 right-0 z-50 bg-black/80 backdrop-blur-md border-b border-gray-800">
        <div className="flex items-center justify-between px-4 py-3">
          <div className="flex items-center space-x-4">
            <h1 className="text-xl font-bold bg-gradient-to-r from-orange-500 via-pink-500 to-violet-500 bg-clip-text text-transparent">
              EduReels
            </h1>
            <Badge className="bg-gradient-to-r from-orange-500 to-pink-500 text-white border-0">
              🔥 Trending
            </Badge>
          </div>
          <div className="flex items-center space-x-2 text-sm">
            <Globe className="w-4 h-4 text-orange-500" />
            <span>Global Learning</span>
          </div>
        </div>
      </div>

      {/* Main Reels Container */}
      <div className="relative h-screen pt-16">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentReel}
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.3 }}
            className="relative h-full"
          >
            {/* Video Background */}
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{
                backgroundImage: `url(${currentReelData.thumbnail})`,
                filter: "brightness(0.7)",
              }}
            />

            {/* Dark Overlay */}
            <div className="absolute inset-0 bg-black/40" />

            {/* Content Overlay */}
            <div className="relative h-full flex">
              {/* Left side - Video info */}
              <div className="flex-1 flex flex-col justify-end p-6 space-y-4">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="space-y-3"
                >
                  {/* Creator Info */}
                  <div className="flex items-center space-x-3">
                    <Avatar className="w-12 h-12 border-2 border-white">
                      <AvatarFallback className="bg-gradient-to-r from-orange-500 to-pink-500 text-white">
                        {currentReelData.creator.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="flex items-center space-x-2">
                        <span className="font-semibold">
                          {currentReelData.creator.name}
                        </span>
                        {currentReelData.creator.verified && (
                          <Badge className="bg-blue-500 text-white text-xs px-1 py-0 h-4">
                            ✓
                          </Badge>
                        )}
                      </div>
                      <div className="text-sm text-gray-300">
                        {currentReelData.creator.followers} followers
                      </div>
                    </div>
                    <Button
                      size="sm"
                      className="bg-gradient-to-r from-orange-500 to-pink-500 hover:opacity-90"
                    >
                      Follow
                    </Button>
                  </div>

                  {/* Title */}
                  <h2 className="text-xl font-bold leading-tight">
                    {currentReelData.title}
                  </h2>

                  {/* Description */}
                  <p className="text-gray-200 leading-relaxed">
                    {currentReelData.description}
                  </p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2">
                    <Badge className="bg-gradient-to-r from-orange-500/20 to-pink-500/20 text-orange-200 border border-orange-500/30">
                      {currentReelData.subject}
                    </Badge>
                    <Badge
                      variant="outline"
                      className="text-gray-300 border-gray-500"
                    >
                      {currentReelData.difficulty}
                    </Badge>
                    {currentReelData.tags.map((tag) => (
                      <Badge
                        key={tag}
                        variant="outline"
                        className="text-gray-400 border-gray-600 text-xs"
                      >
                        #{tag}
                      </Badge>
                    ))}
                  </div>

                  {/* Stats */}
                  <div className="flex items-center space-x-6 text-sm text-gray-300">
                    <div className="flex items-center space-x-1">
                      <Play className="w-4 h-4" />
                      <span>{currentReelData.views} views</span>
                    </div>
                    <div>{currentReelData.duration}</div>
                  </div>
                </motion.div>
              </div>

              {/* Right side - Actions */}
              <div className="w-16 flex flex-col items-center justify-end pb-32 space-y-6">
                {/* Like */}
                <motion.div
                  whileTap={{ scale: 0.8 }}
                  className="flex flex-col items-center space-y-1"
                >
                  <Button
                    size="icon"
                    variant="ghost"
                    onClick={() => toggleLike(currentReelData.id)}
                    className={`w-12 h-12 rounded-full ${
                      likedReels.has(currentReelData.id)
                        ? "bg-pink-500 text-white"
                        : "bg-black/50 text-white hover:bg-pink-500/20"
                    }`}
                  >
                    <Heart
                      className="w-6 h-6"
                      fill={
                        likedReels.has(currentReelData.id)
                          ? "currentColor"
                          : "none"
                      }
                    />
                  </Button>
                  <span className="text-xs text-center">
                    {formatNumber(
                      currentReelData.likes +
                        (likedReels.has(currentReelData.id) ? 1 : 0),
                    )}
                  </span>
                </motion.div>

                {/* Comment */}
                <motion.div
                  whileTap={{ scale: 0.8 }}
                  className="flex flex-col items-center space-y-1"
                >
                  <Button
                    size="icon"
                    variant="ghost"
                    className="w-12 h-12 rounded-full bg-black/50 text-white hover:bg-violet-500/20"
                  >
                    <MessageCircle className="w-6 h-6" />
                  </Button>
                  <span className="text-xs text-center">
                    {formatNumber(currentReelData.comments)}
                  </span>
                </motion.div>

                {/* Share */}
                <motion.div
                  whileTap={{ scale: 0.8 }}
                  className="flex flex-col items-center space-y-1"
                >
                  <Button
                    size="icon"
                    variant="ghost"
                    className="w-12 h-12 rounded-full bg-black/50 text-white hover:bg-orange-500/20"
                  >
                    <Share2 className="w-6 h-6" />
                  </Button>
                  <span className="text-xs text-center">
                    {formatNumber(currentReelData.shares)}
                  </span>
                </motion.div>

                {/* Bookmark */}
                <motion.div
                  whileTap={{ scale: 0.8 }}
                  className="flex flex-col items-center space-y-1"
                >
                  <Button
                    size="icon"
                    variant="ghost"
                    className="w-12 h-12 rounded-full bg-black/50 text-white hover:bg-yellow-500/20"
                  >
                    <BookmarkPlus className="w-6 h-6" />
                  </Button>
                </motion.div>

                {/* More */}
                <motion.div
                  whileTap={{ scale: 0.8 }}
                  className="flex flex-col items-center space-y-1"
                >
                  <Button
                    size="icon"
                    variant="ghost"
                    className="w-12 h-12 rounded-full bg-black/50 text-white hover:bg-gray-500/20"
                  >
                    <MoreHorizontal className="w-6 h-6" />
                  </Button>
                </motion.div>
              </div>
            </div>

            {/* Navigation Controls */}
            <div className="absolute right-6 top-1/2 transform -translate-y-1/2 flex flex-col space-y-4">
              <Button
                size="icon"
                variant="ghost"
                onClick={() => handleScroll("up")}
                disabled={currentReel === 0}
                className="w-10 h-10 rounded-full bg-black/50 text-white hover:bg-white/20 disabled:opacity-30"
              >
                <ArrowUp className="w-5 h-5" />
              </Button>
              <Button
                size="icon"
                variant="ghost"
                onClick={() => handleScroll("down")}
                disabled={currentReel === eduReels.length - 1}
                className="w-10 h-10 rounded-full bg-black/50 text-white hover:bg-white/20 disabled:opacity-30"
              >
                <ArrowDown className="w-5 h-5" />
              </Button>
            </div>

            {/* Play/Pause & Volume Controls */}
            <div className="absolute top-20 right-6 flex flex-col space-y-2">
              <Button
                size="icon"
                variant="ghost"
                onClick={() => setIsPlaying(!isPlaying)}
                className="w-10 h-10 rounded-full bg-black/50 text-white hover:bg-white/20"
              >
                {isPlaying ? (
                  <Pause className="w-5 h-5" />
                ) : (
                  <Play className="w-5 h-5" />
                )}
              </Button>
              <Button
                size="icon"
                variant="ghost"
                onClick={() => setIsMuted(!isMuted)}
                className="w-10 h-10 rounded-full bg-black/50 text-white hover:bg-white/20"
              >
                {isMuted ? (
                  <VolumeX className="w-5 h-5" />
                ) : (
                  <Volume2 className="w-5 h-5" />
                )}
              </Button>
            </div>

            {/* Progress Indicator */}
            <div className="absolute left-6 top-1/2 transform -translate-y-1/2">
              <div className="flex flex-col space-y-2">
                {eduReels.map((_, index) => (
                  <div
                    key={index}
                    className={`w-1 h-8 rounded-full transition-all duration-300 ${
                      index === currentReel
                        ? "bg-gradient-to-b from-orange-500 to-pink-500"
                        : index < currentReel
                          ? "bg-white/60"
                          : "bg-white/20"
                    }`}
                  />
                ))}
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
