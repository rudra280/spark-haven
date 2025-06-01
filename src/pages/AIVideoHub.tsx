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
} from "lucide-react";
import { motion } from "framer-motion";

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
  },
];

export default function AIVideoHub() {
  const [activeTab, setActiveTab] = useState("ai-generate");
  const [isGenerating, setIsGenerating] = useState(false);
  const [generationProgress, setGenerationProgress] = useState(0);
  const [generatedVideo, setGeneratedVideo] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

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
    if (!aiPrompt.topic || !aiPrompt.subject || !aiPrompt.grade) return;

    setIsGenerating(true);
    setGenerationProgress(0);

    // Simulate AI video generation process
    const steps = [
      { step: "Analyzing topic...", progress: 10 },
      { step: "Generating script...", progress: 25 },
      { step: "Creating visuals...", progress: 45 },
      { step: "Adding narration...", progress: 65 },
      { step: "Rendering video...", progress: 85 },
      { step: "Finalizing...", progress: 100 },
    ];

    for (const stepData of steps) {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setGenerationProgress(stepData.progress);
    }

    setGeneratedVideo("ai-generated-video-id");
    setIsGenerating(false);
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
            🤖 AI-Generated Educational Videos + User Uploads - The Perfect
            Combination! Generate custom videos instantly or browse
            human-created content! 🎥✨
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
                      <Label htmlFor="topic">What do you want to learn?</Label>
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
                        <Label>Subject</Label>
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
                        <Label>Grade Level</Label>
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

                    <Button
                      onClick={handleAIGeneration}
                      disabled={
                        isGenerating ||
                        !aiPrompt.topic ||
                        !aiPrompt.subject ||
                        !aiPrompt.grade
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
                          <span>Creating your personalized video...</span>
                          <span>{generationProgress}%</span>
                        </div>
                        <Progress value={generationProgress} className="h-2" />
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
                            This may take 2-3 minutes
                          </p>
                        </div>
                      </div>
                    ) : generatedVideo ? (
                      <div className="space-y-4">
                        <div className="aspect-video bg-gradient-to-br from-violet-500 to-fuchsia-500 rounded-lg flex items-center justify-center">
                          <Button
                            size="icon"
                            variant="secondary"
                            className="w-16 h-16 rounded-full"
                          >
                            <Play className="w-8 h-8" />
                          </Button>
                        </div>
                        <div className="flex space-x-2">
                          <Button
                            variant="outline"
                            size="sm"
                            className="flex-1"
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
                        <div className="text-center">
                          <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100">
                            ✨ AI Generated Successfully!
                          </Badge>
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
                {filteredAIVideos.map((video, index) => (
                  <motion.div
                    key={video.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.1 * index }}
                  >
                    <Card className="overflow-hidden hover:shadow-xl transition-all duration-300 border-0 bg-background/50 backdrop-blur-sm group">
                      <div className="relative">
                        <div
                          className="aspect-video bg-cover bg-center"
                          style={{ backgroundImage: `url(${video.thumbnail})` }}
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
                        <Badge className="absolute top-2 left-2 bg-violet-500 text-white">
                          🤖 AI Generated
                        </Badge>
                        <div className="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded">
                          {video.duration}
                        </div>
                      </div>

                      <CardContent className="p-4">
                        <h3 className="font-semibold mb-2 line-clamp-2">
                          {video.title}
                        </h3>
                        <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                          {video.description}
                        </p>

                        <div className="flex items-center justify-between text-xs text-muted-foreground mb-3">
                          <span>
                            {video.subject} • {video.grade}
                          </span>
                          <span>{video.generatedAt}</span>
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
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
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
                  <motion.div
                    key={video.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.1 * index }}
                  >
                    <Card className="overflow-hidden hover:shadow-xl transition-all duration-300 border-0 bg-background/50 backdrop-blur-sm group">
                      <div className="relative">
                        <div
                          className="aspect-video bg-cover bg-center"
                          style={{ backgroundImage: `url(${video.thumbnail})` }}
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
                        {video.verified && (
                          <Badge className="absolute top-2 left-2 bg-green-500 text-white">
                            ✓ Verified
                          </Badge>
                        )}
                        <div className="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded">
                          {video.duration}
                        </div>
                      </div>

                      <CardContent className="p-4">
                        <h3 className="font-semibold mb-2 line-clamp-2">
                          {video.title}
                        </h3>
                        <p className="text-sm text-muted-foreground mb-3">
                          by {video.creator}
                        </p>

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
                          <Badge variant="outline" className="text-xs">
                            {video.subject}
                          </Badge>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
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
      </div>
    </div>
  );
}
