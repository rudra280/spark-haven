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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Upload,
  Sparkles,
  Video,
  Wand2,
  Play,
  Download,
  Share2,
} from "lucide-react";
import { motion } from "framer-motion";

export default function VideoStudio() {
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedVideo, setGeneratedVideo] = useState<string | null>(null);

  const handleGenerateVideo = async () => {
    setIsGenerating(true);
    // Simulate video generation
    setTimeout(() => {
      setGeneratedVideo("generated-video-id");
      setIsGenerating(false);
    }, 3000);
  };

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
            <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
              <Video className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold">
              <span className="bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">
                AI Video Studio
              </span>
            </h1>
          </div>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Create engaging educational videos with AI assistance. Generate,
            upload, and edit content with intelligent tools.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <Tabs defaultValue="generate" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="generate">AI Generate</TabsTrigger>
              <TabsTrigger value="upload">Upload Video</TabsTrigger>
              <TabsTrigger value="library">My Library</TabsTrigger>
            </TabsList>

            {/* AI Generate Tab */}
            <TabsContent value="generate" className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Generation Form */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <Sparkles className="w-5 h-5" />
                      <span>AI Video Generator</span>
                    </CardTitle>
                    <CardDescription>
                      Describe your video content and let AI create an engaging
                      educational video for you.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="topic">Video Topic</Label>
                      <Input
                        id="topic"
                        placeholder="e.g., Introduction to Photosynthesis"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="description">Content Description</Label>
                      <Textarea
                        id="description"
                        placeholder="Describe what you want the video to cover..."
                        rows={4}
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="duration">Duration</Label>
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder="Select duration" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="30s">30 seconds</SelectItem>
                            <SelectItem value="1m">1 minute</SelectItem>
                            <SelectItem value="2m">2 minutes</SelectItem>
                            <SelectItem value="5m">5 minutes</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="style">Video Style</Label>
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder="Select style" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="animated">Animated</SelectItem>
                            <SelectItem value="presentation">
                              Presentation
                            </SelectItem>
                            <SelectItem value="whiteboard">
                              Whiteboard
                            </SelectItem>
                            <SelectItem value="infographic">
                              Infographic
                            </SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <Button
                      onClick={handleGenerateVideo}
                      disabled={isGenerating}
                      className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
                    >
                      {isGenerating ? (
                        <>
                          <Wand2 className="w-4 h-4 mr-2 animate-spin" />
                          Generating Video...
                        </>
                      ) : (
                        <>
                          <Sparkles className="w-4 h-4 mr-2" />
                          Generate Video
                        </>
                      )}
                    </Button>
                  </CardContent>
                </Card>

                {/* Preview Area */}
                <Card>
                  <CardHeader>
                    <CardTitle>Preview</CardTitle>
                    <CardDescription>
                      Your generated video will appear here
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    {isGenerating ? (
                      <div className="aspect-video bg-gradient-to-br from-purple-100 to-pink-100 dark:from-purple-900/20 dark:to-pink-900/20 rounded-lg flex items-center justify-center">
                        <div className="text-center">
                          <Wand2 className="w-8 h-8 mx-auto mb-2 animate-spin text-purple-500" />
                          <p className="text-sm text-muted-foreground">
                            Generating your video...
                          </p>
                        </div>
                      </div>
                    ) : generatedVideo ? (
                      <div className="space-y-4">
                        <div className="aspect-video bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
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
                      </div>
                    ) : (
                      <div className="aspect-video bg-muted/30 rounded-lg flex items-center justify-center">
                        <div className="text-center">
                          <Video className="w-8 h-8 mx-auto mb-2 text-muted-foreground" />
                          <p className="text-sm text-muted-foreground">
                            No video generated yet
                          </p>
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* Upload Tab */}
            <TabsContent value="upload" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Upload className="w-5 h-5" />
                    <span>Upload Your Video</span>
                  </CardTitle>
                  <CardDescription>
                    Upload your own videos and enhance them with AI-powered
                    features.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-12 text-center hover:border-muted-foreground/50 transition-colors">
                    <Upload className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
                    <h3 className="text-lg font-semibold mb-2">
                      Drop your video here
                    </h3>
                    <p className="text-muted-foreground mb-4">
                      Supports MP4, MOV, AVI up to 500MB
                    </p>
                    <Button>Choose File</Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Library Tab */}
            <TabsContent value="library" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[1, 2, 3, 4, 5, 6].map((index) => (
                  <Card key={index} className="group overflow-hidden">
                    <div className="aspect-video bg-gradient-to-br from-cyan-500 to-purple-500 relative">
                      <Button
                        size="icon"
                        variant="secondary"
                        className="absolute inset-0 m-auto w-12 h-12 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <Play className="w-6 h-6" />
                      </Button>
                    </div>
                    <CardContent className="p-4">
                      <h3 className="font-semibold mb-1">
                        Sample Video {index}
                      </h3>
                      <p className="text-sm text-muted-foreground mb-2">
                        Created 2 days ago
                      </p>
                      <div className="flex items-center justify-between">
                        <Badge variant="secondary" className="text-xs">
                          2:30 min
                        </Badge>
                        <div className="flex space-x-1">
                          <Button size="sm" variant="ghost">
                            Edit
                          </Button>
                          <Button size="sm" variant="ghost">
                            Share
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </motion.div>
      </div>
    </div>
  );
}
