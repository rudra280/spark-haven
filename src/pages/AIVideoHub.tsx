import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Play,
  Pause,
  Download,
  Share,
  Video,
  Wand2,
  Sparkles,
  Zap,
  Upload,
  Settings,
  Monitor,
  Smartphone,
  Tablet,
  Send,
  Loader2,
  CheckCircle,
  AlertCircle,
  Clock,
  Eye,
  Star,
  Calendar,
  User,
  Brain,
  Camera,
  Mic,
  Type,
  Layers,
  Sliders,
} from "lucide-react";
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
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Slider } from "@/components/ui/slider";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { useAuth } from "@/contexts/AuthContext";

interface GeneratedVideo {
  id: string;
  title: string;
  description: string;
  prompt: string;
  videoUrl: string;
  thumbnail: string;
  duration: string;
  resolution: string;
  format: string;
  fileSize: string;
  createdAt: string;
  status: "generating" | "completed" | "failed";
  progress: number;
  style: string;
  quality: string;
  voiceType: string;
  hasSubtitles: boolean;
  stats: {
    views: number;
    likes: number;
    downloads: number;
  };
}

interface VideoGenerationRequest {
  prompt: string;
  style: string;
  duration: number;
  quality: string;
  voiceType: string;
  includeSubtitles: boolean;
  resolution: string;
  format: string;
  backgroundMusic: boolean;
  animations: boolean;
}

// AI Video Generation Service
class AIVideoGenerationService {
  private static instance: AIVideoGenerationService;

  public static getInstance(): AIVideoGenerationService {
    if (!AIVideoGenerationService.instance) {
      AIVideoGenerationService.instance = new AIVideoGenerationService();
    }
    return AIVideoGenerationService.instance;
  }

  async generateVideo(
    request: VideoGenerationRequest,
  ): Promise<GeneratedVideo> {
    // Simulate advanced video generation process
    const videoId = `video_${Date.now()}`;

    const video: GeneratedVideo = {
      id: videoId,
      title: this.generateTitle(request.prompt),
      description: `AI-generated educational video about: ${request.prompt}`,
      prompt: request.prompt,
      videoUrl: this.getVideoUrl(request.prompt),
      thumbnail: this.getThumbnail(request.prompt),
      duration: `${request.duration}:00`,
      resolution: request.resolution,
      format: request.format,
      fileSize: this.calculateFileSize(request.duration, request.quality),
      createdAt: new Date().toISOString(),
      status: "generating",
      progress: 0,
      style: request.style,
      quality: request.quality,
      voiceType: request.voiceType,
      hasSubtitles: request.includeSubtitles,
      stats: {
        views: 0,
        likes: 0,
        downloads: 0,
      },
    };

    return video;
  }

  async simulateGenerationProgress(
    video: GeneratedVideo,
    onProgress: (progress: number, stage: string) => void,
  ): Promise<GeneratedVideo> {
    const stages = [
      { progress: 10, stage: "Analyzing your prompt..." },
      { progress: 25, stage: "Generating script and storyboard..." },
      { progress: 40, stage: "Creating visual elements..." },
      { progress: 55, stage: "Generating voiceover..." },
      { progress: 70, stage: "Adding animations and effects..." },
      { progress: 85, stage: "Rendering video..." },
      { progress: 100, stage: "Video generation complete!" },
    ];

    for (const stage of stages) {
      await this.delay(1500);
      onProgress(stage.progress, stage.stage);
    }

    return {
      ...video,
      status: "completed",
      progress: 100,
    };
  }

  private generateTitle(prompt: string): string {
    const titles = [
      `Understanding ${prompt}: A Complete Guide`,
      `${prompt} Explained Simply`,
      `Master ${prompt} in Minutes`,
      `The Ultimate ${prompt} Tutorial`,
      `${prompt}: From Basics to Advanced`,
    ];
    return titles[Math.floor(Math.random() * titles.length)];
  }

  private getVideoUrl(prompt: string): string {
    // In production, this would return the actual generated video URL
    return "https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4";
  }

  private getThumbnail(prompt: string): string {
    const thumbnails = {
      math: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=800",
      physics:
        "https://images.unsplash.com/photo-1636953056323-9c09fdd74fa6?w=800",
      chemistry:
        "https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?w=800",
      biology:
        "https://images.unsplash.com/photo-1532012197267-da84d127e765?w=800",
      computer:
        "https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=800",
    };

    const promptLower = prompt.toLowerCase();
    for (const [key, url] of Object.entries(thumbnails)) {
      if (promptLower.includes(key)) {
        return url;
      }
    }

    return "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800";
  }

  private calculateFileSize(duration: number, quality: string): string {
    const baseSize = duration * 2; // MB per minute
    const qualityMultiplier = {
      "720p": 1,
      "1080p": 2,
      "4K": 4,
    };

    const multiplier =
      qualityMultiplier[quality as keyof typeof qualityMultiplier] || 1;
    const size = baseSize * multiplier;

    return `${size.toFixed(1)} MB`;
  }

  private delay(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
}

export default function AIVideoHub() {
  const { user } = useAuth();
  const [prompt, setPrompt] = useState("");
  const [generatedVideos, setGeneratedVideos] = useState<GeneratedVideo[]>([]);
  const [currentVideo, setCurrentVideo] = useState<GeneratedVideo | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [generationProgress, setGenerationProgress] = useState(0);
  const [generationStage, setGenerationStage] = useState("");

  // Video generation settings
  const [videoStyle, setVideoStyle] = useState("educational");
  const [videoDuration, setVideoDuration] = useState([5]);
  const [videoQuality, setVideoQuality] = useState("1080p");
  const [voiceType, setVoiceType] = useState("professional");
  const [includeSubtitles, setIncludeSubtitles] = useState(true);
  const [videoFormat, setVideoFormat] = useState("MP4");
  const [backgroundMusic, setBackgroundMusic] = useState(true);
  const [animations, setAnimations] = useState(true);

  const videoService = AIVideoGenerationService.getInstance();

  const handleGenerateVideo = async () => {
    if (!prompt.trim()) {
      alert("Please enter a prompt for video generation");
      return;
    }

    setIsGenerating(true);
    setGenerationProgress(0);
    setGenerationStage("Starting video generation...");

    try {
      const request: VideoGenerationRequest = {
        prompt: prompt.trim(),
        style: videoStyle,
        duration: videoDuration[0],
        quality: videoQuality,
        voiceType,
        includeSubtitles,
        resolution: videoQuality,
        format: videoFormat,
        backgroundMusic,
        animations,
      };

      // Start generation
      const video = await videoService.generateVideo(request);

      // Add to videos list
      setGeneratedVideos((prev) => [video, ...prev]);
      setCurrentVideo(video);

      // Simulate generation progress
      const completedVideo = await videoService.simulateGenerationProgress(
        video,
        (progress, stage) => {
          setGenerationProgress(progress);
          setGenerationStage(stage);
        },
      );

      // Update video status
      setGeneratedVideos((prev) =>
        prev.map((v) => (v.id === video.id ? completedVideo : v)),
      );
      setCurrentVideo(completedVideo);
      setPrompt("");
    } catch (error) {
      console.error("Video generation failed:", error);
      setGenerationStage("Generation failed. Please try again.");
    } finally {
      setTimeout(() => {
        setIsGenerating(false);
        setGenerationProgress(0);
        setGenerationStage("");
      }, 2000);
    }
  };

  const handleDownload = (video: GeneratedVideo) => {
    // Simulate download
    const link = document.createElement("a");
    link.href = video.videoUrl;
    link.download = `${video.title}.${video.format.toLowerCase()}`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    // Update stats
    setGeneratedVideos((prev) =>
      prev.map((v) =>
        v.id === video.id
          ? { ...v, stats: { ...v.stats, downloads: v.stats.downloads + 1 } }
          : v,
      ),
    );
  };

  const handleLike = (videoId: string) => {
    setGeneratedVideos((prev) =>
      prev.map((v) =>
        v.id === videoId
          ? { ...v, stats: { ...v.stats, likes: v.stats.likes + 1 } }
          : v,
      ),
    );
  };

  const quickPrompts = [
    "Explain photosynthesis with animations",
    "Calculus derivatives step by step",
    "Quantum mechanics basics",
    "Machine learning algorithms",
    "Chemical bonding tutorial",
    "History of World War 2",
    "Python programming basics",
    "Economics supply and demand",
  ];

  return (
    <div className="min-h-screen bg-dark text-foreground">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <div className="flex items-center justify-center mb-4">
            <div className="p-3 bg-primary-gradient rounded-2xl">
              <Video className="w-8 h-8 text-white" />
            </div>
          </div>
          <h1 className="heading-lg text-gradient mb-4">
            AI Video Generation Hub
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Generate professional educational videos from simple text prompts.
            Advanced AI creates custom videos with voiceovers, animations, and
            subtitles.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
          {/* Video Generation Panel */}
          <div className="xl:col-span-2">
            <Card className="bg-dark-card border-border">
              <CardHeader>
                <CardTitle className="flex items-center text-foreground">
                  <Wand2 className="w-5 h-5 mr-2" />
                  Generate Educational Video
                </CardTitle>
                <CardDescription>
                  Describe what you want to learn about, and our AI will create
                  a custom video
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Prompt Input */}
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Video Topic / Prompt
                  </label>
                  <Textarea
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    placeholder="Describe what you want to learn about... (e.g., 'Explain photosynthesis with visual diagrams and animations')"
                    className="min-h-[100px] bg-input border-border text-foreground placeholder-muted-foreground"
                    maxLength={500}
                  />
                  <div className="text-xs text-muted-foreground mt-1">
                    {prompt.length}/500 characters
                  </div>
                </div>

                {/* Quick Prompts */}
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Quick Start Ideas
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    {quickPrompts.map((quickPrompt, index) => (
                      <Button
                        key={index}
                        variant="outline"
                        size="sm"
                        onClick={() => setPrompt(quickPrompt)}
                        className="justify-start text-left h-auto p-3 border-border text-muted-foreground hover:text-foreground"
                      >
                        <Sparkles className="w-4 h-4 mr-2 flex-shrink-0" />
                        <span className="text-sm">{quickPrompt}</span>
                      </Button>
                    ))}
                  </div>
                </div>

                {/* Generation Settings */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Video Style
                    </label>
                    <Select value={videoStyle} onValueChange={setVideoStyle}>
                      <SelectTrigger className="bg-input border-border text-foreground">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="educational">Educational</SelectItem>
                        <SelectItem value="animated">Animated</SelectItem>
                        <SelectItem value="presentation">
                          Presentation
                        </SelectItem>
                        <SelectItem value="documentary">Documentary</SelectItem>
                        <SelectItem value="whiteboard">Whiteboard</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Video Quality
                    </label>
                    <Select
                      value={videoQuality}
                      onValueChange={setVideoQuality}
                    >
                      <SelectTrigger className="bg-input border-border text-foreground">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="720p">HD (720p)</SelectItem>
                        <SelectItem value="1080p">Full HD (1080p)</SelectItem>
                        <SelectItem value="4K">Ultra HD (4K)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Voice Type
                    </label>
                    <Select value={voiceType} onValueChange={setVoiceType}>
                      <SelectTrigger className="bg-input border-border text-foreground">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="professional">
                          Professional
                        </SelectItem>
                        <SelectItem value="friendly">Friendly</SelectItem>
                        <SelectItem value="authoritative">
                          Authoritative
                        </SelectItem>
                        <SelectItem value="casual">Casual</SelectItem>
                        <SelectItem value="academic">Academic</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Duration: {videoDuration[0]} minutes
                    </label>
                    <Slider
                      value={videoDuration}
                      onValueChange={setVideoDuration}
                      max={30}
                      min={1}
                      step={1}
                      className="w-full"
                    />
                  </div>
                </div>

                {/* Advanced Options */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <label className="text-sm font-medium text-foreground">
                      Include Subtitles
                    </label>
                    <Switch
                      checked={includeSubtitles}
                      onCheckedChange={setIncludeSubtitles}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <label className="text-sm font-medium text-foreground">
                      Background Music
                    </label>
                    <Switch
                      checked={backgroundMusic}
                      onCheckedChange={setBackgroundMusic}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <label className="text-sm font-medium text-foreground">
                      Animations & Effects
                    </label>
                    <Switch
                      checked={animations}
                      onCheckedChange={setAnimations}
                    />
                  </div>
                </div>

                {/* Generate Button */}
                <Button
                  onClick={handleGenerateVideo}
                  disabled={!prompt.trim() || isGenerating}
                  className="w-full bg-primary-gradient hover:opacity-90 text-white"
                  size="lg"
                >
                  {isGenerating ? (
                    <>
                      <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                      Generating Video...
                    </>
                  ) : (
                    <>
                      <Wand2 className="w-5 h-5 mr-2" />
                      Generate Video
                    </>
                  )}
                </Button>

                {/* Generation Progress */}
                {isGenerating && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    className="bg-card border border-border rounded-lg p-4"
                  >
                    <div className="flex items-center space-x-3 mb-3">
                      <Loader2 className="w-5 h-5 animate-spin text-primary" />
                      <span className="font-medium text-foreground">
                        {generationStage}
                      </span>
                    </div>
                    <Progress value={generationProgress} className="h-2" />
                    <div className="text-sm text-muted-foreground mt-2">
                      {generationProgress}% complete
                    </div>
                  </motion.div>
                )}
              </CardContent>
            </Card>

            {/* Generated Videos Grid */}
            {generatedVideos.length > 0 && (
              <Card className="bg-dark-card border-border mt-8">
                <CardHeader>
                  <CardTitle className="text-foreground">
                    Your Generated Videos
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {generatedVideos.map((video) => (
                      <motion.div
                        key={video.id}
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="bg-card border border-border rounded-lg overflow-hidden hover:shadow-lg transition-all"
                      >
                        <div className="relative aspect-video">
                          <img
                            src={video.thumbnail}
                            alt={video.title}
                            className="w-full h-full object-cover"
                          />
                          <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => setCurrentVideo(video)}
                              className="w-12 h-12 rounded-full bg-white/20 hover:bg-white/30"
                            >
                              <Play className="w-6 h-6 text-white" />
                            </Button>
                          </div>

                          {video.status === "generating" && (
                            <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                              <div className="text-center text-white">
                                <Loader2 className="w-8 h-8 animate-spin mx-auto mb-2" />
                                <div className="text-sm">Generating...</div>
                                <div className="text-xs">{video.progress}%</div>
                              </div>
                            </div>
                          )}

                          <div className="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded">
                            {video.duration}
                          </div>
                        </div>

                        <div className="p-4">
                          <h3 className="font-semibold text-foreground mb-2 line-clamp-2">
                            {video.title}
                          </h3>
                          <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                            {video.description}
                          </p>

                          <div className="flex items-center justify-between text-sm text-muted-foreground mb-3">
                            <span>
                              {video.resolution} • {video.fileSize}
                            </span>
                            <Badge
                              variant="outline"
                              className="border-border text-muted-foreground"
                            >
                              {video.style}
                            </Badge>
                          </div>

                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-3 text-sm text-muted-foreground">
                              <div className="flex items-center space-x-1">
                                <Eye className="w-4 h-4" />
                                <span>{video.stats.views}</span>
                              </div>
                              <button
                                onClick={() => handleLike(video.id)}
                                className="flex items-center space-x-1 hover:text-primary transition-colors"
                              >
                                <Star className="w-4 h-4" />
                                <span>{video.stats.likes}</span>
                              </button>
                            </div>

                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleDownload(video)}
                              disabled={video.status !== "completed"}
                              className="border-border text-muted-foreground hover:text-foreground"
                            >
                              <Download className="w-4 h-4 mr-1" />
                              Download
                            </Button>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Current Video Player */}
            {currentVideo && (
              <Card className="bg-dark-card border-border">
                <CardHeader>
                  <CardTitle className="text-foreground">
                    Video Player
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="aspect-video bg-black rounded-lg overflow-hidden mb-4">
                    <video
                      controls
                      className="w-full h-full"
                      poster={currentVideo.thumbnail}
                    >
                      <source src={currentVideo.videoUrl} type="video/mp4" />
                      Your browser does not support the video tag.
                    </video>
                  </div>

                  <h3 className="font-semibold text-foreground mb-2">
                    {currentVideo.title}
                  </h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    {currentVideo.description}
                  </p>

                  <div className="space-y-2 text-sm text-muted-foreground">
                    <div className="flex justify-between">
                      <span>Quality:</span>
                      <span>{currentVideo.resolution}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Duration:</span>
                      <span>{currentVideo.duration}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>File Size:</span>
                      <span>{currentVideo.fileSize}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Voice:</span>
                      <span className="capitalize">
                        {currentVideo.voiceType}
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Video Generation Stats */}
            <Card className="bg-dark-card border-border">
              <CardHeader>
                <CardTitle className="text-foreground">
                  Generation History
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">
                      Videos Generated
                    </span>
                    <span className="font-semibold text-foreground">
                      {generatedVideos.length}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">
                      Total Duration
                    </span>
                    <span className="font-semibold text-foreground">
                      {generatedVideos.reduce((acc, video) => {
                        const minutes = parseInt(video.duration.split(":")[0]);
                        return acc + minutes;
                      }, 0)}{" "}
                      min
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">
                      Total Downloads
                    </span>
                    <span className="font-semibold text-foreground">
                      {generatedVideos.reduce(
                        (acc, video) => acc + video.stats.downloads,
                        0,
                      )}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Tips */}
            <Card className="bg-dark-card border-border">
              <CardHeader>
                <CardTitle className="text-foreground">
                  Generation Tips
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 text-sm text-muted-foreground">
                  <div className="flex items-start space-x-2">
                    <Sparkles className="w-4 h-4 mt-0.5 text-primary" />
                    <span>Be specific in your prompts for better results</span>
                  </div>
                  <div className="flex items-start space-x-2">
                    <Brain className="w-4 h-4 mt-0.5 text-primary" />
                    <span>
                      Include the type of visuals you want (diagrams,
                      animations, etc.)
                    </span>
                  </div>
                  <div className="flex items-start space-x-2">
                    <Clock className="w-4 h-4 mt-0.5 text-primary" />
                    <span>Shorter videos (5-10 min) generate faster</span>
                  </div>
                  <div className="flex items-start space-x-2">
                    <Settings className="w-4 h-4 mt-0.5 text-primary" />
                    <span>
                      Adjust voice and style settings for your audience
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
