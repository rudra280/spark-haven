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
  FileText,
  Lightbulb,
  Magic,
  Cpu,
  Globe,
  Code,
  PenTool,
  Image,
  Scissors,
  RefreshCw,
  BookOpen,
  Megaphone,
  TrendingUp,
  Palette,
  Film,
  Microphone,
  Volume2,
  Captions,
  Timer,
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
  script: string;
  videoUrl: string;
  thumbnail: string;
  duration: string;
  resolution: string;
  format: string;
  fileSize: string;
  createdAt: string;
  status: "generating" | "processing" | "completed" | "failed";
  progress: number;
  style: string;
  quality: string;
  voiceType: string;
  hasSubtitles: boolean;
  aiModel: string;
  provider: string;
  stats: {
    views: number;
    likes: number;
    downloads: number;
  };
}

interface VideoGenerationRequest {
  prompt: string;
  script?: string;
  generateScript: boolean;
  style: string;
  duration: number;
  quality: string;
  voiceType: string;
  includeSubtitles: boolean;
  resolution: string;
  format: string;
  backgroundMusic: boolean;
  animations: boolean;
  aiModel: string;
  provider: string;
  tone: string;
  language: string;
  avatar: string;
  sceneTransitions: boolean;
}

// Enhanced AI Video Generation Service with LLM Integration
class AIVideoGenerationService {
  private static instance: AIVideoGenerationService;
  private apiEndpoints = {
    steve: "https://api.steve.ai/v1/generate",
    runway: "https://api.runway.ml/v1/video",
    synthesia: "https://api.synthesia.io/v2/videos",
    descript: "https://api.descript.com/v1/projects",
    pictory: "https://api.pictory.ai/v1/video",
    luma: "https://api.lumalabs.ai/v1/generate",
    pika: "https://api.pika.art/v1/video",
  };

  public static getInstance(): AIVideoGenerationService {
    if (!AIVideoGenerationService.instance) {
      AIVideoGenerationService.instance = new AIVideoGenerationService();
    }
    return AIVideoGenerationService.instance;
  }

  // LLM Script Generation using OpenAI/Claude/Gemini
  async generateScript(
    prompt: string,
    options: {
      tone: string;
      duration: number;
      language: string;
      style: string;
    },
  ): Promise<{
    script: string;
    scenes: Array<{
      id: string;
      description: string;
      duration: number;
      voiceover: string;
      visuals: string;
      transitions: string;
    }>;
    metadata: {
      title: string;
      description: string;
      tags: string[];
      estimatedDuration: number;
    };
  }> {
    const { tone, duration, language, style } = options;

    // Simulate advanced LLM script generation
    console.log(`🧠 Generating script with AI for: "${prompt}"`);
    console.log(
      `📝 Parameters: ${tone} tone, ${duration}s duration, ${language}, ${style} style`,
    );

    await this.delay(2000); // Simulate API call

    const scenes = this.generateScenes(prompt, duration, tone, style);
    const script = scenes.map((scene) => scene.voiceover).join("\n\n");

    return {
      script,
      scenes,
      metadata: {
        title: this.generateTitle(prompt),
        description: this.generateDescription(prompt, tone),
        tags: this.generateTags(prompt, style),
        estimatedDuration: duration,
      },
    };
  }

  // Generate video using AI providers
  async generateVideo(
    request: VideoGenerationRequest,
  ): Promise<GeneratedVideo> {
    console.log(`🎬 Starting video generation with ${request.provider}`);
    console.log(`🎯 Model: ${request.aiModel}`);
    console.log(
      `📝 Script generation: ${request.generateScript ? "Enabled" : "Using provided script"}`,
    );

    let script = request.script || "";
    let scenes: any[] = [];

    // Generate script if requested
    if (request.generateScript && request.prompt) {
      const scriptData = await this.generateScript(request.prompt, {
        tone: request.tone,
        duration: request.duration,
        language: request.language,
        style: request.style,
      });
      script = scriptData.script;
      scenes = scriptData.scenes;
    }

    const videoId = `video_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

    // Simulate real video generation process
    const video: GeneratedVideo = {
      id: videoId,
      title: request.generateScript
        ? this.generateTitle(request.prompt)
        : `Generated Video ${videoId.slice(-8)}`,
      description: request.generateScript
        ? this.generateDescription(request.prompt, request.tone)
        : "AI Generated Video",
      prompt: request.prompt,
      script: script,
      videoUrl: `https://cdn.aividhub.com/videos/${videoId}.${request.format}`,
      thumbnail: `https://images.unsplash.com/photo-${1500000000000 + Math.floor(Math.random() * 100000000)}?w=1280&h=720&fit=crop`,
      duration: `${Math.floor(request.duration / 60)}:${(request.duration % 60).toString().padStart(2, "0")}`,
      resolution: request.resolution,
      format: request.format,
      fileSize: this.calculateFileSize(
        request.duration,
        request.quality,
        request.resolution,
      ),
      createdAt: new Date().toISOString(),
      status: "generating",
      progress: 0,
      style: request.style,
      quality: request.quality,
      voiceType: request.voiceType,
      hasSubtitles: request.includeSubtitles,
      aiModel: request.aiModel,
      provider: request.provider,
      stats: {
        views: 0,
        likes: 0,
        downloads: 0,
      },
    };

    // Simulate generation progress
    this.simulateVideoGeneration(video);

    return video;
  }

  private generateScenes(
    prompt: string,
    duration: number,
    tone: string,
    style: string,
  ) {
    const sceneCount = Math.max(3, Math.floor(duration / 20));
    const sceneDuration = duration / sceneCount;

    const scenes = [];
    for (let i = 0; i < sceneCount; i++) {
      scenes.push({
        id: `scene_${i + 1}`,
        description: `Scene ${i + 1}: ${this.generateSceneDescription(prompt, i, tone, style)}`,
        duration: sceneDuration,
        voiceover: this.generateVoiceover(prompt, i, tone),
        visuals: this.generateVisuals(prompt, i, style),
        transitions:
          i < sceneCount - 1 ? this.getRandomTransition() : "fade-out",
      });
    }

    return scenes;
  }

  private generateTitle(prompt: string): string {
    const titles = [
      `${prompt} - Complete Guide`,
      `Understanding ${prompt}`,
      `${prompt} Explained`,
      `The Ultimate ${prompt} Tutorial`,
      `Mastering ${prompt}`,
      `${prompt}: Everything You Need to Know`,
    ];
    return titles[Math.floor(Math.random() * titles.length)];
  }

  private generateDescription(prompt: string, tone: string): string {
    const descriptions = {
      professional: `A comprehensive and professional overview of ${prompt}, designed for educational and business purposes.`,
      casual: `Let's dive into ${prompt} in a fun and easy-to-understand way!`,
      educational: `Learn everything about ${prompt} with this detailed educational video.`,
      entertaining: `Get ready for an entertaining journey through the world of ${prompt}!`,
      informative: `Discover the key insights and important facts about ${prompt}.`,
    };
    return (
      descriptions[tone as keyof typeof descriptions] ||
      descriptions.informative
    );
  }

  private generateTags(prompt: string, style: string): string[] {
    return [
      prompt.toLowerCase(),
      style.toLowerCase(),
      "ai-generated",
      "educational",
      "tutorial",
      "explanation",
      "learning",
    ];
  }

  private generateSceneDescription(
    prompt: string,
    index: number,
    tone: string,
    style: string,
  ): string {
    const scenes = [
      `Introduction to ${prompt}`,
      `Key concepts and fundamentals`,
      `Practical applications and examples`,
      `Advanced insights and tips`,
      `Summary and conclusions`,
    ];
    return scenes[index] || `Content about ${prompt}`;
  }

  private generateVoiceover(
    prompt: string,
    index: number,
    tone: string,
  ): string {
    const voiceovers = [
      `Welcome to this comprehensive guide about ${prompt}. Today we'll explore the essential concepts and practical applications.`,
      `Let's dive deeper into the fundamental principles that make ${prompt} so important in today's world.`,
      `Now that we understand the basics, let's look at some real-world examples and practical applications.`,
      `Here are some advanced insights and professional tips to help you master ${prompt}.`,
      `To wrap up, let's summarize the key points and takeaways from our exploration of ${prompt}.`,
    ];
    return (
      voiceovers[index] || `This section covers important aspects of ${prompt}.`
    );
  }

  private generateVisuals(
    prompt: string,
    index: number,
    style: string,
  ): string {
    const visuals = [
      `Title card with elegant typography and ${style} background`,
      `Animated diagrams and infographics explaining key concepts`,
      `Real-world footage and examples with smooth transitions`,
      `Professional charts and data visualizations`,
      `Closing credits with call-to-action elements`,
    ];
    return visuals[index] || `Visual content related to ${prompt}`;
  }

  private getRandomTransition(): string {
    const transitions = ["fade", "slide", "zoom", "wipe", "dissolve", "cut"];
    return transitions[Math.floor(Math.random() * transitions.length)];
  }

  private calculateFileSize(
    duration: number,
    quality: string,
    resolution: string,
  ): string {
    const baseSizePerSecond = {
      "1080p": { high: 8, medium: 5, low: 3 },
      "720p": { high: 5, medium: 3, low: 2 },
      "480p": { high: 3, medium: 2, low: 1 },
    };

    const sizePerSecond =
      baseSizePerSecond[resolution as keyof typeof baseSizePerSecond]?.[
        quality as keyof (typeof baseSizePerSecond)["1080p"]
      ] || 3;
    const totalSizeMB = duration * sizePerSecond;

    if (totalSizeMB > 1024) {
      return `${(totalSizeMB / 1024).toFixed(1)} GB`;
    }
    return `${totalSizeMB.toFixed(0)} MB`;
  }

  private async simulateVideoGeneration(video: GeneratedVideo): Promise<void> {
    const stages = [
      { name: "Analyzing prompt", progress: 10 },
      { name: "Generating script", progress: 25 },
      { name: "Creating scenes", progress: 40 },
      { name: "Rendering visuals", progress: 65 },
      { name: "Adding audio", progress: 80 },
      { name: "Final processing", progress: 95 },
      { name: "Complete", progress: 100 },
    ];

    for (const stage of stages) {
      await this.delay(2000);
      video.progress = stage.progress;
      console.log(`🎥 ${stage.name}: ${stage.progress}%`);

      if (stage.progress === 100) {
        video.status = "completed";
      }
    }
  }

  private delay(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  async getGeneratedVideos(): Promise<GeneratedVideo[]> {
    // Simulate fetching user's generated videos
    return [
      {
        id: "demo_1",
        title: "Introduction to Machine Learning",
        description: "A comprehensive guide to ML fundamentals",
        prompt: "Explain machine learning basics",
        script: "Machine learning is a subset of artificial intelligence...",
        videoUrl: "https://cdn.aividhub.com/videos/demo_1.mp4",
        thumbnail:
          "https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=1280&h=720&fit=crop",
        duration: "5:30",
        resolution: "1080p",
        format: "mp4",
        fileSize: "150 MB",
        createdAt: new Date(Date.now() - 86400000).toISOString(),
        status: "completed",
        progress: 100,
        style: "educational",
        quality: "high",
        voiceType: "professional-male",
        hasSubtitles: true,
        aiModel: "gpt-4",
        provider: "steve.ai",
        stats: { views: 1250, likes: 89, downloads: 23 },
      },
      {
        id: "demo_2",
        title: "Climate Change Solutions",
        description:
          "Exploring innovative approaches to environmental challenges",
        prompt: "Create a video about climate change solutions",
        script: "Climate change represents one of our greatest challenges...",
        videoUrl: "https://cdn.aividhub.com/videos/demo_2.mp4",
        thumbnail:
          "https://images.unsplash.com/photo-1569163139394-de44cb3c3a3b?w=1280&h=720&fit=crop",
        duration: "7:15",
        resolution: "1080p",
        format: "mp4",
        fileSize: "200 MB",
        createdAt: new Date(Date.now() - 172800000).toISOString(),
        status: "completed",
        progress: 100,
        style: "documentary",
        quality: "high",
        voiceType: "professional-female",
        hasSubtitles: true,
        aiModel: "claude-3",
        provider: "runway",
        stats: { views: 2100, likes: 156, downloads: 45 },
      },
      {
        id: "demo_3",
        title: "Quantum Computing Explained",
        description: "Breaking down complex quantum concepts",
        prompt: "Explain quantum computing in simple terms",
        script: "Quantum computing harnesses quantum mechanics...",
        videoUrl: "https://cdn.aividhub.com/videos/demo_3.mp4",
        thumbnail:
          "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=1280&h=720&fit=crop",
        duration: "10:45",
        resolution: "1080p",
        format: "mp4",
        fileSize: "320 MB",
        createdAt: new Date(Date.now() - 259200000).toISOString(),
        status: "completed",
        progress: 100,
        style: "scientific",
        quality: "high",
        voiceType: "narrator",
        hasSubtitles: true,
        aiModel: "gemini-pro",
        provider: "synthesia",
        stats: { views: 850, likes: 67, downloads: 18 },
      },
    ];
  }
}

export default function AIVideoHub() {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState("generate");
  const [generatedVideos, setGeneratedVideos] = useState<GeneratedVideo[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [currentVideo, setCurrentVideo] = useState<GeneratedVideo | null>(null);
  const [showPreview, setShowPreview] = useState(false);

  // Enhanced generation form state
  const [formData, setFormData] = useState<VideoGenerationRequest>({
    prompt: "",
    script: "",
    generateScript: true,
    style: "modern",
    duration: 60,
    quality: "high",
    voiceType: "professional-male",
    includeSubtitles: true,
    resolution: "1080p",
    format: "mp4",
    backgroundMusic: true,
    animations: true,
    aiModel: "gpt-4",
    provider: "steve.ai",
    tone: "professional",
    language: "english",
    avatar: "professional",
    sceneTransitions: true,
  });

  const videoService = AIVideoGenerationService.getInstance();

  useEffect(() => {
    loadGeneratedVideos();
  }, []);

  const loadGeneratedVideos = async () => {
    try {
      const videos = await videoService.getGeneratedVideos();
      setGeneratedVideos(videos);
    } catch (error) {
      console.error("Failed to load videos:", error);
    }
  };

  const handleGenerate = async () => {
    if (!formData.prompt && !formData.script) return;

    setIsGenerating(true);
    try {
      const newVideo = await videoService.generateVideo(formData);
      setGeneratedVideos((prev) => [newVideo, ...prev]);
      setCurrentVideo(newVideo);
      setActiveTab("library");

      // Reset form
      setFormData((prev) => ({ ...prev, prompt: "", script: "" }));
    } catch (error) {
      console.error("Video generation failed:", error);
    } finally {
      setIsGenerating(false);
    }
  };

  const aiModels = [
    {
      id: "gpt-4",
      name: "GPT-4 Turbo",
      provider: "OpenAI",
      description: "Most advanced language model",
    },
    {
      id: "claude-3",
      name: "Claude 3 Opus",
      provider: "Anthropic",
      description: "Excellent for creative content",
    },
    {
      id: "gemini-pro",
      name: "Gemini Pro",
      provider: "Google",
      description: "Multimodal AI capabilities",
    },
    {
      id: "llama-2",
      name: "Llama 2",
      provider: "Meta",
      description: "Open-source alternative",
    },
  ];

  const videoProviders = [
    {
      id: "steve.ai",
      name: "Steve.AI",
      description: "Professional video creation",
      features: ["Text to Video", "AI Avatars", "Voice Synthesis"],
    },
    {
      id: "runway",
      name: "Runway ML",
      description: "Advanced AI video generation",
      features: ["Gen-2", "Real-time editing", "Custom models"],
    },
    {
      id: "synthesia",
      name: "Synthesia",
      description: "AI presenter videos",
      features: ["Digital humans", "Multilingual", "Brand templates"],
    },
    {
      id: "pictory",
      name: "Pictory.AI",
      description: "Content to video conversion",
      features: ["Blog to video", "Auto highlights", "Stock footage"],
    },
    {
      id: "luma",
      name: "Luma Labs",
      description: "3D and spatial video",
      features: ["NeRF generation", "3D scenes", "Photorealistic"],
    },
    {
      id: "pika",
      name: "Pika Labs",
      description: "Creative video generation",
      features: ["Style transfer", "Animation", "Effects"],
    },
  ];

  const videoStyles = [
    { id: "modern", name: "Modern", description: "Clean and contemporary" },
    {
      id: "educational",
      name: "Educational",
      description: "Clear and instructional",
    },
    {
      id: "documentary",
      name: "Documentary",
      description: "Professional and informative",
    },
    {
      id: "animated",
      name: "Animated",
      description: "Cartoon and motion graphics",
    },
    { id: "cinematic", name: "Cinematic", description: "Film-like quality" },
    {
      id: "corporate",
      name: "Corporate",
      description: "Business and professional",
    },
    {
      id: "social",
      name: "Social Media",
      description: "Optimized for platforms",
    },
    {
      id: "scientific",
      name: "Scientific",
      description: "Technical and detailed",
    },
  ];

  const voiceTypes = [
    {
      id: "professional-male",
      name: "Professional Male",
      sample: "Authoritative and clear",
    },
    {
      id: "professional-female",
      name: "Professional Female",
      sample: "Warm and engaging",
    },
    {
      id: "narrator",
      name: "Documentary Narrator",
      sample: "Deep and storytelling",
    },
    {
      id: "casual-male",
      name: "Casual Male",
      sample: "Friendly and approachable",
    },
    {
      id: "casual-female",
      name: "Casual Female",
      sample: "Conversational and relatable",
    },
    {
      id: "ai-generated",
      name: "AI Generated",
      sample: "Synthetic but natural",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <div className="flex items-center justify-center mb-4">
            <div className="p-3 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl">
              <Brain className="w-8 h-8 text-white" />
            </div>
          </div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
            AI Video Hub
          </h1>
          <p className="text-lg text-slate-600 dark:text-slate-300 max-w-3xl mx-auto">
            Transform your ideas into professional videos using advanced AI.
            Generate scripts with LLM and create stunning visuals with leading
            AI video platforms.
          </p>
        </motion.div>

        {/* Main Content */}
        <div className="max-w-7xl mx-auto">
          <Tabs
            value={activeTab}
            onValueChange={setActiveTab}
            className="w-full"
          >
            <TabsList className="grid w-full grid-cols-4 mb-8">
              <TabsTrigger
                value="generate"
                className="flex items-center space-x-2"
              >
                <Wand2 className="w-4 h-4" />
                <span>Generate Video</span>
              </TabsTrigger>
              <TabsTrigger
                value="script"
                className="flex items-center space-x-2"
              >
                <FileText className="w-4 h-4" />
                <span>Script Generator</span>
              </TabsTrigger>
              <TabsTrigger
                value="library"
                className="flex items-center space-x-2"
              >
                <Video className="w-4 h-4" />
                <span>My Videos</span>
              </TabsTrigger>
              <TabsTrigger
                value="providers"
                className="flex items-center space-x-2"
              >
                <Settings className="w-4 h-4" />
                <span>AI Providers</span>
              </TabsTrigger>
            </TabsList>

            {/* Video Generation Tab */}
            <TabsContent value="generate" className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Generation Form */}
                <div className="lg:col-span-2 space-y-6">
                  <Card className="border-0 shadow-xl bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm">
                    <CardHeader>
                      <CardTitle className="flex items-center space-x-2">
                        <Lightbulb className="w-5 h-5 text-blue-500" />
                        <span>Create Your Video</span>
                      </CardTitle>
                      <CardDescription>
                        Describe your video idea and let AI generate the perfect
                        content for you.
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      {/* Prompt Input */}
                      <div>
                        <label className="text-sm font-medium mb-2 block">
                          Video Concept
                        </label>
                        <Textarea
                          placeholder="Describe what you want your video to be about. Be as detailed as possible..."
                          value={formData.prompt}
                          onChange={(e) =>
                            setFormData((prev) => ({
                              ...prev,
                              prompt: e.target.value,
                            }))
                          }
                          className="min-h-[120px] resize-none"
                        />
                      </div>

                      {/* Script Generation Toggle */}
                      <div className="flex items-center justify-between p-4 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-lg">
                        <div>
                          <label className="font-medium text-blue-900 dark:text-blue-100">
                            AI Script Generation
                          </label>
                          <p className="text-sm text-blue-700 dark:text-blue-300">
                            Let AI create the script for you using advanced LLM
                          </p>
                        </div>
                        <Switch
                          checked={formData.generateScript}
                          onCheckedChange={(checked) =>
                            setFormData((prev) => ({
                              ...prev,
                              generateScript: checked,
                            }))
                          }
                        />
                      </div>

                      {/* Manual Script Input (if AI generation is disabled) */}
                      {!formData.generateScript && (
                        <div>
                          <label className="text-sm font-medium mb-2 block">
                            Custom Script
                          </label>
                          <Textarea
                            placeholder="Enter your video script here..."
                            value={formData.script}
                            onChange={(e) =>
                              setFormData((prev) => ({
                                ...prev,
                                script: e.target.value,
                              }))
                            }
                            className="min-h-[150px] resize-none"
                          />
                        </div>
                      )}

                      {/* AI Model Selection */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="text-sm font-medium mb-2 block">
                            AI Model for Script
                          </label>
                          <Select
                            value={formData.aiModel}
                            onValueChange={(value) =>
                              setFormData((prev) => ({
                                ...prev,
                                aiModel: value,
                              }))
                            }
                          >
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              {aiModels.map((model) => (
                                <SelectItem key={model.id} value={model.id}>
                                  <div className="flex flex-col">
                                    <span className="font-medium">
                                      {model.name}
                                    </span>
                                    <span className="text-xs text-slate-500">
                                      {model.description}
                                    </span>
                                  </div>
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>

                        <div>
                          <label className="text-sm font-medium mb-2 block">
                            Video Provider
                          </label>
                          <Select
                            value={formData.provider}
                            onValueChange={(value) =>
                              setFormData((prev) => ({
                                ...prev,
                                provider: value,
                              }))
                            }
                          >
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              {videoProviders.map((provider) => (
                                <SelectItem
                                  key={provider.id}
                                  value={provider.id}
                                >
                                  <div className="flex flex-col">
                                    <span className="font-medium">
                                      {provider.name}
                                    </span>
                                    <span className="text-xs text-slate-500">
                                      {provider.description}
                                    </span>
                                  </div>
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                      </div>

                      {/* Style and Tone */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="text-sm font-medium mb-2 block">
                            Video Style
                          </label>
                          <Select
                            value={formData.style}
                            onValueChange={(value) =>
                              setFormData((prev) => ({ ...prev, style: value }))
                            }
                          >
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              {videoStyles.map((style) => (
                                <SelectItem key={style.id} value={style.id}>
                                  <div className="flex flex-col">
                                    <span className="font-medium">
                                      {style.name}
                                    </span>
                                    <span className="text-xs text-slate-500">
                                      {style.description}
                                    </span>
                                  </div>
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>

                        <div>
                          <label className="text-sm font-medium mb-2 block">
                            Tone
                          </label>
                          <Select
                            value={formData.tone}
                            onValueChange={(value) =>
                              setFormData((prev) => ({ ...prev, tone: value }))
                            }
                          >
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="professional">
                                Professional
                              </SelectItem>
                              <SelectItem value="casual">Casual</SelectItem>
                              <SelectItem value="educational">
                                Educational
                              </SelectItem>
                              <SelectItem value="entertaining">
                                Entertaining
                              </SelectItem>
                              <SelectItem value="informative">
                                Informative
                              </SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>

                      {/* Voice and Duration */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="text-sm font-medium mb-2 block">
                            Voice Type
                          </label>
                          <Select
                            value={formData.voiceType}
                            onValueChange={(value) =>
                              setFormData((prev) => ({
                                ...prev,
                                voiceType: value,
                              }))
                            }
                          >
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              {voiceTypes.map((voice) => (
                                <SelectItem key={voice.id} value={voice.id}>
                                  <div className="flex flex-col">
                                    <span className="font-medium">
                                      {voice.name}
                                    </span>
                                    <span className="text-xs text-slate-500">
                                      {voice.sample}
                                    </span>
                                  </div>
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>

                        <div>
                          <label className="text-sm font-medium mb-2 block">
                            Duration: {Math.floor(formData.duration / 60)}:
                            {(formData.duration % 60)
                              .toString()
                              .padStart(2, "0")}
                          </label>
                          <Slider
                            value={[formData.duration]}
                            onValueChange={([value]) =>
                              setFormData((prev) => ({
                                ...prev,
                                duration: value,
                              }))
                            }
                            max={600}
                            min={30}
                            step={15}
                            className="w-full"
                          />
                        </div>
                      </div>

                      {/* Advanced Options */}
                      <div className="space-y-4">
                        <h4 className="font-medium text-slate-900 dark:text-slate-100">
                          Advanced Options
                        </h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-3">
                            <div className="flex items-center justify-between">
                              <label className="text-sm">
                                Include Subtitles
                              </label>
                              <Switch
                                checked={formData.includeSubtitles}
                                onCheckedChange={(checked) =>
                                  setFormData((prev) => ({
                                    ...prev,
                                    includeSubtitles: checked,
                                  }))
                                }
                              />
                            </div>
                            <div className="flex items-center justify-between">
                              <label className="text-sm">
                                Background Music
                              </label>
                              <Switch
                                checked={formData.backgroundMusic}
                                onCheckedChange={(checked) =>
                                  setFormData((prev) => ({
                                    ...prev,
                                    backgroundMusic: checked,
                                  }))
                                }
                              />
                            </div>
                            <div className="flex items-center justify-between">
                              <label className="text-sm">
                                Scene Transitions
                              </label>
                              <Switch
                                checked={formData.sceneTransitions}
                                onCheckedChange={(checked) =>
                                  setFormData((prev) => ({
                                    ...prev,
                                    sceneTransitions: checked,
                                  }))
                                }
                              />
                            </div>
                          </div>
                          <div className="space-y-3">
                            <div>
                              <label className="text-sm font-medium mb-1 block">
                                Quality
                              </label>
                              <Select
                                value={formData.quality}
                                onValueChange={(value) =>
                                  setFormData((prev) => ({
                                    ...prev,
                                    quality: value,
                                  }))
                                }
                              >
                                <SelectTrigger>
                                  <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="high">
                                    High (Best Quality)
                                  </SelectItem>
                                  <SelectItem value="medium">
                                    Medium (Balanced)
                                  </SelectItem>
                                  <SelectItem value="low">
                                    Low (Faster)
                                  </SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                            <div>
                              <label className="text-sm font-medium mb-1 block">
                                Resolution
                              </label>
                              <Select
                                value={formData.resolution}
                                onValueChange={(value) =>
                                  setFormData((prev) => ({
                                    ...prev,
                                    resolution: value,
                                  }))
                                }
                              >
                                <SelectTrigger>
                                  <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="1080p">
                                    1080p (Full HD)
                                  </SelectItem>
                                  <SelectItem value="720p">
                                    720p (HD)
                                  </SelectItem>
                                  <SelectItem value="480p">
                                    480p (SD)
                                  </SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Generate Button */}
                      <Button
                        onClick={handleGenerate}
                        disabled={
                          isGenerating || (!formData.prompt && !formData.script)
                        }
                        className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white py-6"
                      >
                        {isGenerating ? (
                          <>
                            <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                            Generating Video...
                          </>
                        ) : (
                          <>
                            <Sparkles className="w-5 h-5 mr-2" />
                            Generate AI Video
                          </>
                        )}
                      </Button>
                    </CardContent>
                  </Card>
                </div>

                {/* Preview/Info Panel */}
                <div className="space-y-6">
                  <Card className="border-0 shadow-xl bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm">
                    <CardHeader>
                      <CardTitle className="flex items-center space-x-2">
                        <Eye className="w-5 h-5 text-purple-500" />
                        <span>Preview Settings</span>
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="p-4 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-lg">
                        <h4 className="font-medium text-blue-900 dark:text-blue-100 mb-2">
                          Selected Configuration
                        </h4>
                        <div className="space-y-2 text-sm text-blue-700 dark:text-blue-300">
                          <div className="flex justify-between">
                            <span>AI Model:</span>
                            <span className="font-medium">
                              {
                                aiModels.find((m) => m.id === formData.aiModel)
                                  ?.name
                              }
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span>Provider:</span>
                            <span className="font-medium">
                              {
                                videoProviders.find(
                                  (p) => p.id === formData.provider,
                                )?.name
                              }
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span>Style:</span>
                            <span className="font-medium">
                              {
                                videoStyles.find((s) => s.id === formData.style)
                                  ?.name
                              }
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span>Duration:</span>
                            <span className="font-medium">
                              {Math.floor(formData.duration / 60)}:
                              {(formData.duration % 60)
                                .toString()
                                .padStart(2, "0")}
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span>Quality:</span>
                            <span className="font-medium">
                              {formData.quality} / {formData.resolution}
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className="p-4 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-lg">
                        <h4 className="font-medium text-green-900 dark:text-green-100 mb-2">
                          Estimated Output
                        </h4>
                        <div className="space-y-2 text-sm text-green-700 dark:text-green-300">
                          <div className="flex justify-between">
                            <span>Processing Time:</span>
                            <span className="font-medium">
                              ~{Math.floor(formData.duration / 10)} minutes
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span>File Size:</span>
                            <span className="font-medium">
                              ~{Math.floor(formData.duration * 3)} MB
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span>Credits Cost:</span>
                            <span className="font-medium">
                              {Math.floor(formData.duration / 30)} credits
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <h4 className="font-medium">Features Included</h4>
                        <div className="space-y-1 text-sm text-slate-600 dark:text-slate-400">
                          {formData.generateScript && (
                            <div className="flex items-center space-x-2">
                              <CheckCircle className="w-4 h-4 text-green-500" />
                              <span>AI Script Generation</span>
                            </div>
                          )}
                          {formData.includeSubtitles && (
                            <div className="flex items-center space-x-2">
                              <CheckCircle className="w-4 h-4 text-green-500" />
                              <span>Automatic Subtitles</span>
                            </div>
                          )}
                          {formData.backgroundMusic && (
                            <div className="flex items-center space-x-2">
                              <CheckCircle className="w-4 h-4 text-green-500" />
                              <span>Background Music</span>
                            </div>
                          )}
                          {formData.sceneTransitions && (
                            <div className="flex items-center space-x-2">
                              <CheckCircle className="w-4 h-4 text-green-500" />
                              <span>Scene Transitions</span>
                            </div>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </TabsContent>

            {/* Script Generator Tab */}
            <TabsContent value="script" className="space-y-6">
              <Card className="border-0 shadow-xl bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <PenTool className="w-5 h-5 text-blue-500" />
                    <span>AI Script Generator</span>
                  </CardTitle>
                  <CardDescription>
                    Generate professional video scripts using advanced language
                    models.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                    {aiModels.map((model) => (
                      <Card
                        key={model.id}
                        className="cursor-pointer hover:shadow-lg transition-all"
                      >
                        <CardContent className="p-6 text-center">
                          <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-4">
                            <Cpu className="w-6 h-6 text-white" />
                          </div>
                          <h3 className="font-semibold mb-2">{model.name}</h3>
                          <p className="text-sm text-slate-600 dark:text-slate-400 mb-2">
                            {model.provider}
                          </p>
                          <p className="text-xs text-slate-500">
                            {model.description}
                          </p>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Video Library Tab */}
            <TabsContent value="library" className="space-y-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100">
                  My Generated Videos
                </h2>
                <Button
                  onClick={loadGeneratedVideos}
                  variant="outline"
                  className="flex items-center space-x-2"
                >
                  <RefreshCw className="w-4 h-4" />
                  <span>Refresh</span>
                </Button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {generatedVideos.map((video) => (
                  <motion.div
                    key={video.id}
                    layout
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="group"
                  >
                    <Card className="overflow-hidden border-0 shadow-xl bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm hover:shadow-2xl transition-all">
                      <div className="relative aspect-video">
                        <img
                          src={video.thumbnail}
                          alt={video.title}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-all flex items-center justify-center">
                          <Button
                            size="lg"
                            className="opacity-0 group-hover:opacity-100 transition-all bg-white/20 hover:bg-white/30 text-white border-white/30"
                            onClick={() => setShowPreview(true)}
                          >
                            <Play className="w-6 h-6" />
                          </Button>
                        </div>
                        <div className="absolute top-4 left-4">
                          <Badge
                            variant={
                              video.status === "completed"
                                ? "default"
                                : "secondary"
                            }
                            className={
                              video.status === "completed"
                                ? "bg-green-500 text-white"
                                : video.status === "generating"
                                  ? "bg-blue-500 text-white"
                                  : "bg-red-500 text-white"
                            }
                          >
                            {video.status}
                          </Badge>
                        </div>
                        <div className="absolute bottom-4 right-4">
                          <Badge
                            variant="secondary"
                            className="bg-black/50 text-white border-0"
                          >
                            {video.duration}
                          </Badge>
                        </div>
                      </div>

                      <CardContent className="p-6">
                        <h3 className="font-semibold text-lg mb-2 line-clamp-2">
                          {video.title}
                        </h3>
                        <p className="text-sm text-slate-600 dark:text-slate-400 mb-4 line-clamp-2">
                          {video.description}
                        </p>

                        <div className="flex items-center justify-between text-xs text-slate-500 mb-4">
                          <div className="flex items-center space-x-2">
                            <Badge variant="outline" className="text-xs">
                              {video.provider}
                            </Badge>
                            <Badge variant="outline" className="text-xs">
                              {video.aiModel}
                            </Badge>
                          </div>
                          <span>
                            {new Date(video.createdAt).toLocaleDateString()}
                          </span>
                        </div>

                        {video.status === "generating" && (
                          <div className="mb-4">
                            <div className="flex items-center justify-between text-sm mb-2">
                              <span>Processing...</span>
                              <span>{video.progress}%</span>
                            </div>
                            <Progress
                              value={video.progress}
                              className="w-full"
                            />
                          </div>
                        )}

                        <div className="flex items-center justify-between text-sm text-slate-600 dark:text-slate-400 mb-4">
                          <div className="flex items-center space-x-4">
                            <div className="flex items-center space-x-1">
                              <Eye className="w-4 h-4" />
                              <span>{video.stats.views}</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <Star className="w-4 h-4" />
                              <span>{video.stats.likes}</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <Download className="w-4 h-4" />
                              <span>{video.stats.downloads}</span>
                            </div>
                          </div>
                          <span className="text-xs">{video.fileSize}</span>
                        </div>

                        <div className="flex items-center space-x-2">
                          <Button
                            size="sm"
                            variant="outline"
                            className="flex-1"
                            disabled={video.status !== "completed"}
                          >
                            <Download className="w-4 h-4 mr-2" />
                            Download
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            disabled={video.status !== "completed"}
                          >
                            <Share className="w-4 h-4" />
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>

              {generatedVideos.length === 0 && (
                <div className="text-center py-12">
                  <Video className="w-16 h-16 text-slate-400 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-slate-600 dark:text-slate-400 mb-2">
                    No videos yet
                  </h3>
                  <p className="text-slate-500 mb-6">
                    Start creating your first AI-generated video!
                  </p>
                  <Button
                    onClick={() => setActiveTab("generate")}
                    className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white"
                  >
                    Create Video
                  </Button>
                </div>
              )}
            </TabsContent>

            {/* AI Providers Tab */}
            <TabsContent value="providers" className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {videoProviders.map((provider) => (
                  <Card
                    key={provider.id}
                    className="border-0 shadow-xl bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm"
                  >
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <div>
                          <CardTitle className="flex items-center space-x-2">
                            <Globe className="w-5 h-5 text-blue-500" />
                            <span>{provider.name}</span>
                          </CardTitle>
                          <CardDescription>
                            {provider.description}
                          </CardDescription>
                        </div>
                        <Badge
                          variant={
                            formData.provider === provider.id
                              ? "default"
                              : "secondary"
                          }
                        >
                          {formData.provider === provider.id
                            ? "Selected"
                            : "Available"}
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div>
                          <h4 className="font-medium mb-2">Key Features</h4>
                          <div className="flex flex-wrap gap-2">
                            {provider.features.map((feature, index) => (
                              <Badge
                                key={index}
                                variant="outline"
                                className="text-xs"
                              >
                                {feature}
                              </Badge>
                            ))}
                          </div>
                        </div>
                        <Button
                          variant={
                            formData.provider === provider.id
                              ? "default"
                              : "outline"
                          }
                          className="w-full"
                          onClick={() =>
                            setFormData((prev) => ({
                              ...prev,
                              provider: provider.id,
                            }))
                          }
                        >
                          {formData.provider === provider.id
                            ? "Currently Selected"
                            : "Select Provider"}
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
