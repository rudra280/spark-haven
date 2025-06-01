import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Progress } from "@/components/ui/progress";
import {
  Upload,
  Video,
  Globe,
  Eye,
  Heart,
  Share2,
  Tag,
  Play,
  Users,
  BookOpen,
  Zap,
  TrendingUp,
} from "lucide-react";
import { motion } from "framer-motion";

const categories = [
  "Science & Technology",
  "Mathematics",
  "Languages",
  "History",
  "Geography",
  "Art & Culture",
  "Music",
  "Sports & Fitness",
  "Cooking",
  "Health & Medicine",
  "Business & Finance",
  "Psychology",
  "Philosophy",
  "Literature",
  "Engineering",
  "Agriculture",
  "Environmental Science",
  "Social Studies",
  "Life Skills",
  "Crafts & Hobbies",
];

const languages = [
  "English",
  "Spanish",
  "French",
  "German",
  "Chinese",
  "Japanese",
  "Korean",
  "Arabic",
  "Hindi",
  "Portuguese",
  "Russian",
  "Italian",
  "Dutch",
  "Other",
];

export default function VideoUpload() {
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    language: "",
    tags: "",
    privacy: "public",
    thumbnail: null as File | null,
    video: null as File | null,
  });

  const handleFileUpload = (file: File, type: "video" | "thumbnail") => {
    setFormData((prev) => ({ ...prev, [type]: file }));

    if (type === "video") {
      // Simulate upload progress
      setIsUploading(true);
      let progress = 0;
      const interval = setInterval(() => {
        progress += Math.random() * 15;
        if (progress >= 100) {
          progress = 100;
          clearInterval(interval);
          setIsUploading(false);
        }
        setUploadProgress(progress);
      }, 200);
    }
  };

  return (
    <div className="min-h-screen pt-20 pb-12">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="flex items-center justify-center space-x-2 mb-4">
            <div className="w-12 h-12 bg-gradient-to-r from-orange-500 via-pink-500 to-violet-500 rounded-full flex items-center justify-center">
              <Video className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold">
              <span className="bg-gradient-to-r from-orange-500 via-pink-500 to-violet-500 bg-clip-text text-transparent">
                Share Your Knowledge
              </span>
            </h1>
          </div>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Upload and share educational content with learners worldwide. From
            quantum physics to cooking recipes - every subject matters! 🌍
          </p>

          {/* Global Stats */}
          <div className="flex items-center justify-center space-x-8 mt-6">
            <div className="flex items-center space-x-2">
              <Globe className="w-5 h-5 text-orange-500" />
              <span className="text-sm font-medium">195+ Countries</span>
            </div>
            <div className="flex items-center space-x-2">
              <Users className="w-5 h-5 text-pink-500" />
              <span className="text-sm font-medium">50M+ Learners</span>
            </div>
            <div className="flex items-center space-x-2">
              <BookOpen className="w-5 h-5 text-violet-500" />
              <span className="text-sm font-medium">1000+ Subjects</span>
            </div>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Upload Form */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="lg:col-span-2"
          >
            <Card className="border-0 bg-background/50 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Upload className="w-5 h-5" />
                  <span>Upload Your Educational Content</span>
                </CardTitle>
                <CardDescription>
                  Share knowledge on any subject - from quantum mechanics to
                  traditional cooking! Help someone learn something new today.
                </CardDescription>
              </CardHeader>

              <CardContent className="space-y-6">
                {/* Video Upload */}
                <div className="space-y-2">
                  <Label htmlFor="video">Video File</Label>
                  <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-8 text-center hover:border-orange-500/50 transition-colors">
                    <Upload className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
                    <h3 className="text-lg font-semibold mb-2">
                      Drop your video here
                    </h3>
                    <p className="text-muted-foreground mb-4">
                      MP4, MOV, AVI up to 2GB • All educational content welcome!
                    </p>
                    <Button
                      onClick={() =>
                        document.getElementById("video-input")?.click()
                      }
                      className="bg-gradient-to-r from-orange-500 to-pink-500"
                    >
                      Choose Video File
                    </Button>
                    <input
                      id="video-input"
                      type="file"
                      accept="video/*"
                      className="hidden"
                      onChange={(e) =>
                        e.target.files?.[0] &&
                        handleFileUpload(e.target.files[0], "video")
                      }
                    />
                  </div>

                  {isUploading && (
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span>Uploading...</span>
                        <span>{Math.round(uploadProgress)}%</span>
                      </div>
                      <Progress value={uploadProgress} className="h-2" />
                    </div>
                  )}
                </div>

                {/* Basic Info */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="title">Video Title</Label>
                    <Input
                      id="title"
                      placeholder="e.g., How to Solve Quantum Equations"
                      value={formData.title}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          title: e.target.value,
                        }))
                      }
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="category">Subject Category</Label>
                    <Select
                      value={formData.category}
                      onValueChange={(value) =>
                        setFormData((prev) => ({ ...prev, category: value }))
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        {categories.map((category) => (
                          <SelectItem key={category} value={category}>
                            {category}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {/* Description */}
                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    placeholder="Describe what your video teaches. Include learning objectives, prerequisites, and target audience..."
                    rows={4}
                    value={formData.description}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        description: e.target.value,
                      }))
                    }
                  />
                </div>

                {/* Additional Details */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="language">Language</Label>
                    <Select
                      value={formData.language}
                      onValueChange={(value) =>
                        setFormData((prev) => ({ ...prev, language: value }))
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select language" />
                      </SelectTrigger>
                      <SelectContent>
                        {languages.map((language) => (
                          <SelectItem key={language} value={language}>
                            {language}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="tags">Tags</Label>
                    <Input
                      id="tags"
                      placeholder="physics, quantum, beginner"
                      value={formData.tags}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          tags: e.target.value,
                        }))
                      }
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="privacy">Privacy</Label>
                    <Select
                      value={formData.privacy}
                      onValueChange={(value) =>
                        setFormData((prev) => ({ ...prev, privacy: value }))
                      }
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="public">
                          🌍 Public - Anyone can watch
                        </SelectItem>
                        <SelectItem value="unlisted">
                          🔗 Unlisted - Only with link
                        </SelectItem>
                        <SelectItem value="private">
                          🔒 Private - Only you
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {/* Thumbnail Upload */}
                <div className="space-y-2">
                  <Label htmlFor="thumbnail">Custom Thumbnail (Optional)</Label>
                  <div className="border border-border rounded-lg p-4">
                    <div className="flex items-center space-x-4">
                      <div className="w-20 h-12 bg-muted rounded flex items-center justify-center">
                        <Video className="w-6 h-6 text-muted-foreground" />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium">
                          Upload custom thumbnail
                        </p>
                        <p className="text-xs text-muted-foreground">
                          PNG, JPG (1280x720 recommended)
                        </p>
                      </div>
                      <Button variant="outline" size="sm">
                        Upload Image
                      </Button>
                    </div>
                  </div>
                </div>

                {/* Submit Buttons */}
                <div className="flex space-x-4">
                  <Button
                    className="flex-1 bg-gradient-to-r from-orange-500 via-pink-500 to-violet-500 hover:opacity-90"
                    disabled={!formData.title || !formData.category}
                  >
                    <Zap className="w-4 h-4 mr-2" />
                    Publish Now
                  </Button>
                  <Button variant="outline" className="flex-1">
                    Save as Draft
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Sidebar */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-6"
          >
            {/* Tips */}
            <Card className="border-0 bg-gradient-to-br from-orange-50 to-pink-50 dark:from-orange-950/20 dark:to-pink-950/20">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <TrendingUp className="w-5 h-5" />
                  <span>Creator Tips</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-start space-x-3">
                  <Badge className="bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-100">
                    🎯
                  </Badge>
                  <div>
                    <p className="font-medium text-sm">Be Specific</p>
                    <p className="text-xs text-muted-foreground">
                      Clear titles like "Calculus Chain Rule Explained" perform
                      better
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <Badge className="bg-pink-100 text-pink-800 dark:bg-pink-900 dark:text-pink-100">
                    🌍
                  </Badge>
                  <div>
                    <p className="font-medium text-sm">Think Global</p>
                    <p className="text-xs text-muted-foreground">
                      Add subtitles and consider cultural context
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <Badge className="bg-violet-100 text-violet-800 dark:bg-violet-900 dark:text-violet-100">
                    📱
                  </Badge>
                  <div>
                    <p className="font-medium text-sm">Mobile-Friendly</p>
                    <p className="text-xs text-muted-foreground">
                      Most learners watch on mobile devices
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Global Impact */}
            <Card className="border-0 bg-background/50 backdrop-blur-sm">
              <CardHeader>
                <CardTitle>Your Global Impact</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-orange-500">
                    2.4M+
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Educators Worldwide
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 text-center">
                  <div>
                    <div className="flex items-center justify-center space-x-1">
                      <Eye className="w-4 h-4 text-pink-500" />
                      <span className="font-bold">892K</span>
                    </div>
                    <div className="text-xs text-muted-foreground">
                      Daily Views
                    </div>
                  </div>
                  <div>
                    <div className="flex items-center justify-center space-x-1">
                      <Heart className="w-4 h-4 text-violet-500" />
                      <span className="font-bold">156K</span>
                    </div>
                    <div className="text-xs text-muted-foreground">
                      Lives Changed
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Trending Subjects */}
            <Card className="border-0 bg-background/50 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-sm">🔥 Trending Subjects</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {[
                    "AI & Machine Learning",
                    "Sustainable Living",
                    "Mental Health",
                    "Traditional Crafts",
                    "Space Science",
                  ].map((subject) => (
                    <Badge
                      key={subject}
                      variant="outline"
                      className="w-full justify-start"
                    >
                      {subject}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
