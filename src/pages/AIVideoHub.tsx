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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  Sparkles,
  Video,
  Wand2,
  Play,
  Search,
  Upload,
  Clock,
  Users,
  Eye,
  TrendingUp,
  Bot,
  Brain,
  Zap,
  Star,
  Share2,
  Download,
  Loader2,
  CheckCircle,
  X,
} from "lucide-react";
import { motion } from "framer-motion";
import { useAuth } from "@/contexts/AuthContext";
import api from "@/lib/api";
import { AIVideoPlayer } from "@/components/video/AIVideoPlayer";
import { PageHeader } from "@/components/ui/back-navigation";

const gradeOptions = [
  "Primary School (K-5)",
  "Middle School (6-8)",
  "High School (9-12)",
  "Undergraduate",
  "Graduate",
  "Professional",
  "All Ages",
];

const subjectOptions = [
  "Mathematics",
  "Physics",
  "Chemistry",
  "Biology",
  "Computer Science",
  "English Literature",
  "History",
  "Geography",
  "Economics",
  "Psychology",
  "Art & Design",
  "Music",
  "Physical Education",
  "Philosophy",
  "Languages",
  "Engineering",
  "Medicine",
  "Business",
  "Law",
  "Agriculture",
];

const videoStyles = [
  "Animated Explanation",
  "Whiteboard Style",
  "Documentary",
  "Interactive Tutorial",
  "Lecture Style",
  "Story-based",
  "Infographic",
  "Lab Demonstration",
];

const aiGeneratedVideos = [
  {
    id: "1",
    title: "How Photosynthesis Works - Animated Explanation",
    subject: "Biology",
    grade: "Middle School",
    duration: "3:45",
    views: "1.2M",
    rating: 4.9,
    thumbnail:
      "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=400",
    description:
      "AI-generated animated explanation of photosynthesis with stunning visuals and clear narration.",
    generatedAt: "2 hours ago",
    prompt: "Explain photosynthesis for middle school students with animations",
    videoUrl:
      "https://www.learningcontainer.com/wp-content/uploads/2020/05/sample-mp4-file.mp4",
  },
  {
    id: "2",
    title: "Quadratic Equations Made Simple",
    subject: "Mathematics",
    grade: "High School",
    duration: "5:12",
    views: "890K",
    rating: 4.8,
    thumbnail:
      "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=400",
    description:
      "Step-by-step AI tutorial on solving quadratic equations with visual examples.",
    generatedAt: "4 hours ago",
    prompt: "Teach quadratic equations step by step for high school students",
    videoUrl:
      "https://www.learningcontainer.com/wp-content/uploads/2020/05/sample-mp4-file.mp4",
  },
  {
    id: "3",
    title: "The French Revolution Explained",
    subject: "History",
    grade: "High School",
    duration: "7:23",
    views: "634K",
    rating: 4.7,
    thumbnail:
      "https://images.unsplash.com/photo-1541963463532-d68292c34d19?w=400",
    description:
      "Comprehensive AI-generated documentary about the French Revolution with historical accuracy.",
    generatedAt: "6 hours ago",
    prompt: "Create a documentary about the French Revolution for high school",
    videoUrl:
      "https://www.learningcontainer.com/wp-content/uploads/2020/05/sample-mp4-file.mp4",
  },
];

const userUploadedVideos = [
  {
    id: "4",
    title: "Advanced Calculus - Integration Techniques",
    subject: "Mathematics",
    creator: "Prof. David Miller - MIT",
    duration: "12:34",
    views: "456K",
    rating: 4.9,
    thumbnail:
      "https://images.unsplash.com/photo-1509228468518-180dd4864904?w=400",
    verified: true,
    videoUrl:
      "https://www.learningcontainer.com/wp-content/uploads/2020/05/sample-mp4-file.mp4",
  },
  {
    id: "5",
    title: "Organic Chemistry Reactions",
    subject: "Chemistry",
    creator: "Dr. Sarah Chen - Stanford",
    duration: "8:45",
    views: "321K",
    rating: 4.8,
    thumbnail:
      "https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=400",
    verified: true,
    videoUrl:
      "https://www.learningcontainer.com/wp-content/uploads/2020/05/sample-mp4-file.mp4",
  },
];

export default function AIVideoHub() {
  const { isAuthenticated } = useAuth();
  const [activeTab, setActiveTab] = useState("ai-generate");
  const [isGenerating, setIsGenerating] = useState(false);
  const [generationProgress, setGenerationProgress] = useState(0);
  const [generatedVideo, setGeneratedVideo] = useState<any>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedVideo, setSelectedVideo] = useState<any>(null);
  const [showVideoPlayer, setShowVideoPlayer] = useState(false);
  const [generationStatus, setGenerationStatus] = useState("");

  const [aiPrompt, setAIPrompt] = useState({
    topic: "",
    subject: "",
    grade: "",
    style: "",
    duration: "3-5 minutes",
    language: "English",
    difficulty: "Medium",
  });

  const handleAIGeneration = async () => {
    if (!aiPrompt.topic || !aiPrompt.subject || !aiPrompt.grade) {
      alert("Please fill in all required fields");
      return;
    }

    if (!isAuthenticated) {
      alert("Please log in to generate AI videos");
      return;
    }

    setIsGenerating(true);
    setGenerationProgress(0);
    setGenerationStatus("Initializing AI video generation...");

    // Simulate AI video generation process with realistic steps
    const steps = [
      { step: "Analyzing your topic...", progress: 10 },
      { step: "Generating educational script...", progress: 25 },
      { step: "Creating visual elements...", progress: 45 },
      { step: "Adding AI narration...", progress: 65 },
      { step: "Rendering HD video...", progress: 85 },
      { step: "Finalizing your custom video...", progress: 100 },
    ];

    for (const stepData of steps) {
      setGenerationStatus(stepData.step);
      await new Promise((resolve) => setTimeout(resolve, 1200));
      setGenerationProgress(stepData.progress);
    }

    // Create the generated video
    const newVideo = {
      id: `ai_${Date.now()}`,
      title: `${aiPrompt.topic} - AI Generated`,
      subject: aiPrompt.subject,
      grade: aiPrompt.grade,
      duration: aiPrompt.duration,
      views: "0",
      rating: 0,
      thumbnail:
        "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=400",
      description: `AI-generated educational video about ${aiPrompt.topic} tailored for ${aiPrompt.grade} students.`,
      generatedAt: "Just now",
      prompt: `${aiPrompt.topic} for ${aiPrompt.grade}`,
      videoUrl:
        "https://www.learningcontainer.com/wp-content/uploads/2020/05/sample-mp4-file.mp4",
      style: aiPrompt.style,
      language: aiPrompt.language,
    };

    setGeneratedVideo(newVideo);
    setIsGenerating(false);

    // Save to API
    try {
      await api.generateAIVideo(aiPrompt);
    } catch (error) {
      console.error("Failed to save generated video:", error);
    }
  };

  const handleVideoPlay = (video: any) => {
    setSelectedVideo(video);
    setShowVideoPlayer(true);
  };

  const handleDownloadVideo = (video: any) => {
    // Simulate video download
    const link = document.createElement("a");
    link.href = video.videoUrl;
    link.download = `${video.title}.mp4`;
    link.click();
  };

  const filteredAIVideos = aiGeneratedVideos.filter(
    (video) =>
      video.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      video.subject.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const filteredUserVideos = userUploadedVideos.filter(
    (video) =>
      video.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      video.subject.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  return (
    <div className="min-h-screen pt-20 pb-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="flex items-center justify-center space-x-2 mb-4">
            <div className="w-12 h-12 bg-gradient-to-r from-violet-500 via-purple-500 to-fuchsia-500 rounded-full flex items-center justify-center">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold">
              <span className="bg-gradient-to-r from-violet-500 via-purple-500 to-fuchsia-500 bg-clip-text text-transparent">
                AI Video Hub
              </span>
            </h1>
          </div>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            🤖 Create Custom Educational Videos with AI + Browse Human-Created
            Content! Generate personalized videos instantly or explore our vast
            library! 🎥✨
          </p>

          {/* Stats */}
          <div className="flex items-center justify-center space-x-8 mt-6">
            <div className="flex items-center space-x-2">
              <Bot className="w-5 h-5 text-violet-500" />
              <span className="text-sm font-medium">50K+ AI Videos</span>
            </div>
            <div className="flex items-center space-x-2">
              <Users className="w-5 h-5 text-purple-500" />
              <span className="text-sm font-medium">1M+ User Videos</span>
            </div>
            <div className="flex items-center space-x-2">
              <TrendingUp className="w-5 h-5 text-fuchsia-500" />
              <span className="text-sm font-medium">Real-time Generation</span>
            </div>
          </div>
        </motion.div>

        {/* Main Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <Tabs
            value={activeTab}
            onValueChange={setActiveTab}
            className="w-full"
          >
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger
                value="ai-generate"
                className="flex items-center space-x-2"
              >
                <Sparkles className="w-4 h-4" />
                <span>🤖 AI Generate</span>
              </TabsTrigger>
              <TabsTrigger
                value="ai-library"
                className="flex items-center space-x-2"
              >
                <Bot className="w-4 h-4" />
                <span>🎬 AI Videos</span>
              </TabsTrigger>
              <TabsTrigger
                value="user-uploads"
                className="flex items-center space-x-2"
              >
                <Users className="w-4 h-4" />
                <span>👥 User Uploads</span>
              </TabsTrigger>
            </TabsList>

            {/* AI Generation Tab */}
            <TabsContent value="ai-generate" className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* AI Generation Form */}
                <Card className="border-0 bg-background/50 backdrop-blur-sm">
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <Brain className="w-5 h-5" />
                      <span>AI Video Generator</span>
                    </CardTitle>
                    <CardDescription>
                      Describe what you want to learn and our AI will create a
                      personalized educational video instantly!
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="topic">
                        What do you want to learn? *
                      </Label>
                      <Input
                        id="topic"
                        placeholder="e.g., How does photosynthesis work?"
                        value={aiPrompt.topic}
                        onChange={(e) =>
                          setAIPrompt({ ...aiPrompt, topic: e.target.value })
                        }
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label>Subject *</Label>
                        <Select
                          value={aiPrompt.subject}
                          onValueChange={(value) =>
                            setAIPrompt({ ...aiPrompt, subject: value })
                          }
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select subject" />
                          </SelectTrigger>
                          <SelectContent>
                            {subjectOptions.map((subject) => (
                              <SelectItem key={subject} value={subject}>
                                {subject}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <Label>Grade Level *</Label>
                        <Select
                          value={aiPrompt.grade}
                          onValueChange={(value) =>
                            setAIPrompt({ ...aiPrompt, grade: value })
                          }
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select grade" />
                          </SelectTrigger>
                          <SelectContent>
                            {gradeOptions.map((grade) => (
                              <SelectItem key={grade} value={grade}>
                                {grade}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label>Video Style</Label>
                        <Select
                          value={aiPrompt.style}
                          onValueChange={(value) =>
                            setAIPrompt({ ...aiPrompt, style: value })
                          }
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select style" />
                          </SelectTrigger>
                          <SelectContent>
                            {videoStyles.map((style) => (
                              <SelectItem key={style} value={style}>
                                {style}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <Label>Duration</Label>
                        <Select
                          value={aiPrompt.duration}
                          onValueChange={(value) =>
                            setAIPrompt({ ...aiPrompt, duration: value })
                          }
                        >
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="1-2 minutes">
                              1-2 minutes
                            </SelectItem>
                            <SelectItem value="3-5 minutes">
                              3-5 minutes
                            </SelectItem>
                            <SelectItem value="5-10 minutes">
                              5-10 minutes
                            </SelectItem>
                            <SelectItem value="10+ minutes">
                              10+ minutes
                            </SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    {!isAuthenticated && (
                      <Alert className="border-orange-200 bg-orange-50 text-orange-800">
                        <AlertDescription>
                          Please{" "}
                          <a href="/login" className="underline">
                            sign in
                          </a>{" "}
                          to generate AI videos
                        </AlertDescription>
                      </Alert>
                    )}

                    <Button
                      onClick={handleAIGeneration}
                      disabled={
                        isGenerating ||
                        !aiPrompt.topic ||
                        !aiPrompt.subject ||
                        !aiPrompt.grade ||
                        !isAuthenticated
                      }
                      className="w-full bg-gradient-to-r from-violet-500 via-purple-500 to-fuchsia-500 hover:opacity-90"
                      size="lg"
                    >
                      {isGenerating ? (
                        <>
                          <Wand2 className="w-4 h-4 mr-2 animate-spin" />
                          Generating AI Video...
                        </>
                      ) : (
                        <>
                          <Sparkles className="w-4 h-4 mr-2" />
                          🚀 Generate AI Video
                        </>
                      )}
                    </Button>

                    {isGenerating && (
                      <div className="space-y-2">
                        <div className="flex items-center justify-between text-sm">
                          <span>{generationStatus}</span>
                          <span>{generationProgress}%</span>
                        </div>
                        <Progress value={generationProgress} className="h-2" />
                        <p className="text-xs text-muted-foreground text-center">
                          ⏰ This usually takes 2-3 minutes
                        </p>
                      </div>
                    )}
                  </CardContent>
                </Card>

                {/* Preview Area */}
                <Card className="border-0 bg-background/50 backdrop-blur-sm">
                  <CardHeader>
                    <CardTitle>AI Video Preview</CardTitle>
                    <CardDescription>
                      Your generated video will appear here
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    {isGenerating ? (
                      <div className="aspect-video bg-gradient-to-br from-violet-100 to-fuchsia-100 dark:from-violet-900/20 dark:to-fuchsia-900/20 rounded-lg flex items-center justify-center">
                        <div className="text-center">
                          <Wand2 className="w-12 h-12 mx-auto mb-4 animate-spin text-violet-500" />
                          <p className="text-lg font-semibold mb-2">
                            AI is creating your video...
                          </p>
                          <p className="text-sm text-muted-foreground">
                            {generationStatus}
                          </p>
                        </div>
                      </div>
                    ) : generatedVideo ? (
                      <div className="space-y-4">
                        <div className="aspect-video bg-gradient-to-br from-violet-500 to-fuchsia-500 rounded-lg relative overflow-hidden">
                          <video
                            className="w-full h-full object-cover"
                            poster={generatedVideo.thumbnail}
                            controls
                          >
                            <source
                              src={generatedVideo.videoUrl}
                              type="video/mp4"
                            />
                            Your browser does not support the video tag.
                          </video>
                        </div>

                        <div className="space-y-2">
                          <h3 className="font-semibold">
                            {generatedVideo.title}
                          </h3>
                          <p className="text-sm text-muted-foreground">
                            {generatedVideo.description}
                          </p>
                          <div className="flex items-center space-x-2">
                            <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100">
                              <CheckCircle className="w-3 h-3 mr-1" />
                              Generated Successfully!
                            </Badge>
                            <Badge variant="outline">
                              {generatedVideo.subject}
                            </Badge>
                            <Badge variant="outline">
                              {generatedVideo.grade}
                            </Badge>
                          </div>
                        </div>

                        <div className="flex space-x-2">
                          <Button
                            variant="outline"
                            size="sm"
                            className="flex-1"
                            onClick={() => handleDownloadVideo(generatedVideo)}
                          >
                            <Download className="w-4 h-4 mr-2" />
                            Download
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            className="flex-1"
                          >
                            <Share2 className="w-4 h-4 mr-2" />
                            Share
                          </Button>
                        </div>
                      </div>
                    ) : (
                      <div className="aspect-video bg-muted/30 rounded-lg flex items-center justify-center">
                        <div className="text-center">
                          <Bot className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
                          <p className="text-lg font-semibold mb-2">
                            Ready to Generate!
                          </p>
                          <p className="text-sm text-muted-foreground">
                            Fill the form and click generate
                          </p>
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* AI Library Tab */}
            <TabsContent value="ai-library" className="space-y-6">
              {/* Search */}
              <div className="relative max-w-md mx-auto">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="Search AI-generated videos..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* Include generated video if exists */}
                {generatedVideo && (
                  <VideoCard
                    video={generatedVideo}
                    onPlay={handleVideoPlay}
                    onDownload={handleDownloadVideo}
                    isAI={true}
                  />
                )}

                {filteredAIVideos.map((video, index) => (
                  <VideoCard
                    key={video.id}
                    video={video}
                    index={index}
                    onPlay={handleVideoPlay}
                    onDownload={handleDownloadVideo}
                    isAI={true}
                  />
                ))}
              </div>
            </TabsContent>

            {/* User Uploads Tab */}
            <TabsContent value="user-uploads" className="space-y-6">
              {/* Search */}
              <div className="relative max-w-md mx-auto">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="Search user-uploaded videos..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredUserVideos.map((video, index) => (
                  <VideoCard
                    key={video.id}
                    video={video}
                    index={index}
                    onPlay={handleVideoPlay}
                    onDownload={handleDownloadVideo}
                    isAI={false}
                  />
                ))}
              </div>

              {/* Upload CTA */}
              <Card className="border-0 bg-gradient-to-r from-violet-500/10 via-purple-500/10 to-fuchsia-500/10 backdrop-blur-sm">
                <CardContent className="p-8 text-center">
                  <h3 className="text-xl font-bold mb-4">
                    Share Your Knowledge!
                  </h3>
                  <p className="text-muted-foreground mb-6">
                    Upload your educational videos and help millions of learners
                    worldwide.
                  </p>
                  <Button className="bg-gradient-to-r from-violet-500 via-purple-500 to-fuchsia-500">
                    <Upload className="w-4 h-4 mr-2" />
                    Upload Video
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </motion.div>

        {/* Video Player Modal */}
        {showVideoPlayer && selectedVideo && (
          <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
            <div className="w-full max-w-4xl bg-background rounded-lg overflow-hidden">
              <div className="flex items-center justify-between p-4 border-b">
                <h3 className="font-semibold">{selectedVideo.title}</h3>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setShowVideoPlayer(false)}
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>
              <div className="aspect-video">
                <video
                  className="w-full h-full"
                  controls
                  autoPlay
                  poster={selectedVideo.thumbnail}
                >
                  <source src={selectedVideo.videoUrl} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              </div>
              <div className="p-4">
                <p className="text-sm text-muted-foreground">
                  {selectedVideo.description}
                </p>
                <div className="flex items-center space-x-4 mt-2 text-sm text-muted-foreground">
                  <span>{selectedVideo.views} views</span>
                  <span>⭐ {selectedVideo.rating}</span>
                  <span>{selectedVideo.duration}</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// Video Card Component
function VideoCard({
  video,
  index = 0,
  onPlay,
  onDownload,
  isAI,
}: {
  video: any;
  index?: number;
  onPlay: (video: any) => void;
  onDownload: (video: any) => void;
  isAI: boolean;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.1 * index }}
    >
      <Card className="overflow-hidden hover:shadow-xl transition-all duration-300 border-0 bg-background/50 backdrop-blur-sm group">
        <div className="relative">
          <div
            className="aspect-video bg-cover bg-center cursor-pointer"
            style={{ backgroundImage: `url(${video.thumbnail})` }}
            onClick={() => onPlay(video)}
          >
            <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors" />
            <Button
              size="icon"
              variant="secondary"
              className="absolute inset-0 m-auto w-12 h-12 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <Play className="w-6 h-6" />
            </Button>
          </div>

          <Badge
            className={`absolute top-2 left-2 ${isAI ? "bg-violet-500 text-white" : "bg-green-500 text-white"}`}
          >
            {isAI ? "🤖 AI Generated" : "✓ Verified"}
          </Badge>

          <div className="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded">
            {video.duration}
          </div>
        </div>

        <CardContent className="p-4">
          <h3 className="font-semibold mb-2 line-clamp-2">{video.title}</h3>
          <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
            {video.description || `by ${video.creator}`}
          </p>

          <div className="flex items-center justify-between text-xs text-muted-foreground mb-3">
            <span>
              {video.subject} • {video.grade || "All Levels"}
            </span>
            <span>{video.generatedAt || "User Upload"}</span>
          </div>

          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-1">
                <Eye className="w-3 h-3" />
                <span>{video.views}</span>
              </div>
              <div className="flex items-center space-x-1">
                <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                <span>{video.rating}</span>
              </div>
            </div>
            <Button
              size="sm"
              variant="outline"
              onClick={() => onDownload(video)}
            >
              <Download className="w-3 h-3 mr-1" />
              Save
            </Button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
