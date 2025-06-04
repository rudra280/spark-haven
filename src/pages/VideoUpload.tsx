import React, { useState, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Upload,
  Video,
  Image,
  File,
  X,
  Play,
  Pause,
  Volume2,
  VolumeX,
  CheckCircle,
  AlertCircle,
  Loader2,
  Plus,
  Trash2,
  Edit,
  Save,
  Camera,
  Mic,
  Settings,
  Share,
  Download,
  Eye,
  Clock,
  Users,
  Star,
  BookOpen,
  Tag,
  Globe,
  Lock,
  Eye as EyeIcon,
  FileText,
  Sparkles,
  Brain,
  Zap,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";

interface UploadedFile {
  id: string;
  name: string;
  size: number;
  type: string;
  url: string;
  duration?: number;
  thumbnail?: string;
}

interface VideoMetadata {
  title: string;
  description: string;
  category: string;
  subject: string;
  difficulty: "Beginner" | "Intermediate" | "Advanced";
  tags: string[];
  isReelContent: boolean;
  visibility: "public" | "unlisted" | "private";
  allowComments: boolean;
  allowDownloads: boolean;
  monetization: boolean;
  customThumbnail?: string;
  chapters: Chapter[];
  language: string;
  subtitles: boolean;
}

interface Chapter {
  id: string;
  title: string;
  timeStart: number;
  timeEnd: number;
}

interface UploadProgress {
  stage: "uploading" | "processing" | "generating" | "complete" | "error";
  progress: number;
  message: string;
  details?: string;
}

const SUPPORTED_VIDEO_FORMATS = [".mp4", ".mov", ".avi", ".mkv", ".webm"];
const SUPPORTED_IMAGE_FORMATS = [".jpg", ".jpeg", ".png", ".webp"];
const MAX_FILE_SIZE = 2 * 1024 * 1024 * 1024; // 2GB

const CATEGORIES = [
  "Education",
  "Science",
  "Mathematics",
  "Technology",
  "Languages",
  "Arts",
  "Business",
  "Health",
  "Sports",
  "Music",
];

const SUBJECTS = [
  "Mathematics",
  "Physics",
  "Chemistry",
  "Biology",
  "Computer Science",
  "English",
  "History",
  "Geography",
  "Economics",
  "Psychology",
  "Philosophy",
  "Engineering",
  "Medicine",
  "Law",
  "Business",
  "Art",
  "Music",
  "Sports",
  "Cooking",
  "Photography",
];

const COMPETITIVE_EXAMS = [
  "JEE Main",
  "JEE Advanced",
  "NEET",
  "GATE",
  "CAT",
  "UPSC",
  "SSC",
  "IBPS",
  "CLAT",
  "GMAT",
  "GRE",
  "TOEFL",
  "IELTS",
];

export default function VideoUpload() {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [uploadedFile, setUploadedFile] = useState<UploadedFile | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState<UploadProgress>({
    stage: "uploading",
    progress: 0,
    message: "Preparing upload...",
  });

  const [metadata, setMetadata] = useState<VideoMetadata>({
    title: "",
    description: "",
    category: "",
    subject: "",
    difficulty: "Beginner",
    tags: [],
    isReelContent: false,
    visibility: "public",
    allowComments: true,
    allowDownloads: false,
    monetization: false,
    chapters: [],
    language: "English",
    subtitles: false,
  });

  const [currentStep, setCurrentStep] = useState(1);
  const [tagInput, setTagInput] = useState("");
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [customThumbnails, setCustomThumbnails] = useState<string[]>([]);
  const [isGeneratingThumbnails, setIsGeneratingThumbnails] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const thumbnailInputRef = useRef<HTMLInputElement>(null);

  // File upload handler
  const handleFileUpload = useCallback((files: FileList | null) => {
    if (!files || files.length === 0) return;

    const file = files[0];

    // Validate file type
    const isVideo = SUPPORTED_VIDEO_FORMATS.some((format) =>
      file.name.toLowerCase().endsWith(format),
    );

    if (!isVideo) {
      setErrors({
        file: "Please upload a supported video format (MP4, MOV, AVI, MKV, WebM)",
      });
      return;
    }

    // Validate file size
    if (file.size > MAX_FILE_SIZE) {
      setErrors({ file: "File size must be less than 2GB" });
      return;
    }

    setErrors({});
    startUpload(file);
  }, []);

  // Start upload process
  const startUpload = async (file: File) => {
    setIsUploading(true);
    setCurrentStep(2);

    const uploadedFile: UploadedFile = {
      id: `upload_${Date.now()}`,
      name: file.name,
      size: file.size,
      type: file.type,
      url: URL.createObjectURL(file),
    };

    try {
      // Stage 1: Upload
      setUploadProgress({
        stage: "uploading",
        progress: 0,
        message: "Uploading your video...",
        details: `${(file.size / (1024 * 1024)).toFixed(1)} MB`,
      });

      // Simulate upload progress
      for (let i = 0; i <= 100; i += 5) {
        await new Promise((resolve) => setTimeout(resolve, 100));
        setUploadProgress((prev) => ({ ...prev, progress: i }));
      }

      // Stage 2: Processing
      setUploadProgress({
        stage: "processing",
        progress: 0,
        message: "Processing video...",
        details: "Optimizing quality and extracting metadata",
      });

      // Simulate processing
      for (let i = 0; i <= 100; i += 10) {
        await new Promise((resolve) => setTimeout(resolve, 200));
        setUploadProgress((prev) => ({ ...prev, progress: i }));
      }

      // Extract video metadata
      const video = document.createElement("video");
      video.src = uploadedFile.url;

      await new Promise((resolve) => {
        video.onloadedmetadata = () => {
          uploadedFile.duration = video.duration;
          resolve(void 0);
        };
      });

      // Stage 3: Generating thumbnails and materials
      setUploadProgress({
        stage: "generating",
        progress: 0,
        message: "Generating thumbnails and study materials...",
        details: "Creating AI-powered learning resources",
      });

      // Generate thumbnails
      setIsGeneratingThumbnails(true);
      await generateThumbnails(uploadedFile);
      setIsGeneratingThumbnails(false);

      // Simulate material generation
      for (let i = 0; i <= 100; i += 8) {
        await new Promise((resolve) => setTimeout(resolve, 150));
        setUploadProgress((prev) => ({ ...prev, progress: i }));
      }

      // Complete
      setUploadProgress({
        stage: "complete",
        progress: 100,
        message: "Upload complete!",
        details: "Your video is ready for publishing",
      });

      setUploadedFile(uploadedFile);
      setCurrentStep(3);

      // Auto-generate title from filename
      const generatedTitle = file.name
        .replace(/\.[^/.]+$/, "")
        .replace(/[_-]/g, " ")
        .replace(/\b\w/g, (l) => l.toUpperCase());

      setMetadata((prev) => ({ ...prev, title: generatedTitle }));
    } catch (error) {
      console.error("Upload error:", error);
      setUploadProgress({
        stage: "error",
        progress: 0,
        message: "Upload failed",
        details: "Please try again",
      });
    }
  };

  // Generate thumbnail previews
  const generateThumbnails = async (file: UploadedFile) => {
    const thumbnails: string[] = [];

    // Use sample thumbnails for demonstration
    const sampleThumbnails = [
      "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=400",
      "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=400",
      "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=400",
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400",
    ];

    setCustomThumbnails(sampleThumbnails);
  };

  // Handle drag and drop
  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      const files = e.dataTransfer.files;
      handleFileUpload(files);
    },
    [handleFileUpload],
  );

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
  }, []);

  // Add tag
  const addTag = () => {
    if (tagInput.trim() && !metadata.tags.includes(tagInput.trim())) {
      setMetadata((prev) => ({
        ...prev,
        tags: [...prev.tags, tagInput.trim()],
      }));
      setTagInput("");
    }
  };

  // Remove tag
  const removeTag = (tagToRemove: string) => {
    setMetadata((prev) => ({
      ...prev,
      tags: prev.tags.filter((tag) => tag !== tagToRemove),
    }));
  };

  // Validate metadata
  const validateMetadata = () => {
    const newErrors: { [key: string]: string } = {};

    if (!metadata.title.trim()) {
      newErrors.title = "Title is required";
    }
    if (!metadata.description.trim()) {
      newErrors.description = "Description is required";
    }
    if (!metadata.category) {
      newErrors.category = "Category is required";
    }
    if (!metadata.subject) {
      newErrors.subject = "Subject is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Publish video
  const handlePublish = async () => {
    if (!validateMetadata()) return;

    setIsUploading(true);
    setUploadProgress({
      stage: "uploading",
      progress: 0,
      message: "Publishing your video...",
      details: "Making it available to learners worldwide",
    });

    try {
      // Simulate publishing process
      for (let i = 0; i <= 100; i += 10) {
        await new Promise((resolve) => setTimeout(resolve, 200));
        setUploadProgress((prev) => ({ ...prev, progress: i }));
      }

      // Success
      setUploadProgress({
        stage: "complete",
        progress: 100,
        message: "Video published successfully!",
        details: "Your content is now live",
      });

      setTimeout(() => {
        navigate("/creator-dashboard");
      }, 2000);
    } catch (error) {
      setUploadProgress({
        stage: "error",
        progress: 0,
        message: "Publishing failed",
        details: "Please try again",
      });
    }
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

  const formatDuration = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = Math.floor(seconds % 60);

    if (hours > 0) {
      return `${hours}:${minutes.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
    }
    return `${minutes}:${secs.toString().padStart(2, "0")}`;
  };

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            Please log in to upload videos
          </h1>
          <Button onClick={() => navigate("/login")}>Go to Login</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Upload Your Video
          </h1>
          <p className="text-xl text-gray-600">
            Share your knowledge with millions of learners worldwide
          </p>
        </motion.div>

        {/* Progress Steps */}
        <div className="flex items-center justify-center mb-8">
          <div className="flex items-center space-x-8">
            {[1, 2, 3, 4].map((step) => (
              <div key={step} className="flex items-center">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center ${
                    currentStep >= step
                      ? "bg-blue-500 text-white"
                      : "bg-gray-200 text-gray-500"
                  }`}
                >
                  {currentStep > step ? (
                    <CheckCircle className="w-6 h-6" />
                  ) : (
                    <span>{step}</span>
                  )}
                </div>
                <div className="ml-2 text-sm font-medium text-gray-600">
                  {step === 1 && "Upload"}
                  {step === 2 && "Process"}
                  {step === 3 && "Details"}
                  {step === 4 && "Publish"}
                </div>
                {step < 4 && (
                  <div
                    className={`w-16 h-0.5 ml-4 ${
                      currentStep > step ? "bg-blue-500" : "bg-gray-200"
                    }`}
                  />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Step 1: File Upload */}
        {currentStep === 1 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-2xl shadow-xl p-8"
          >
            <div className="text-center mb-6">
              <Video className="w-16 h-16 text-blue-500 mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                Upload Your Video
              </h2>
              <p className="text-gray-600">
                Drag and drop your video file or click to browse
              </p>
            </div>

            <div
              className="border-2 border-dashed border-gray-300 rounded-xl p-12 text-center cursor-pointer hover:border-blue-500 hover:bg-blue-50 transition-all"
              onDrop={handleDrop}
              onDragOver={handleDragOver}
              onClick={() => fileInputRef.current?.click()}
            >
              <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <p className="text-lg font-medium text-gray-700 mb-2">
                Drop your video here, or click to select
              </p>
              <p className="text-sm text-gray-500 mb-4">
                Supports: {SUPPORTED_VIDEO_FORMATS.join(", ")} (Max: 2GB)
              </p>
              <Button className="bg-blue-500 hover:bg-blue-600">
                <Upload className="w-4 h-4 mr-2" />
                Select Video File
              </Button>
            </div>

            <input
              ref={fileInputRef}
              type="file"
              accept={SUPPORTED_VIDEO_FORMATS.join(",")}
              onChange={(e) => handleFileUpload(e.target.files)}
              className="hidden"
            />

            {errors.file && (
              <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg">
                <div className="flex items-center">
                  <AlertCircle className="w-5 h-5 text-red-500 mr-2" />
                  <span className="text-red-700">{errors.file}</span>
                </div>
              </div>
            )}
          </motion.div>
        )}

        {/* Step 2: Upload Progress */}
        {currentStep === 2 && isUploading && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-2xl shadow-xl p-8"
          >
            <div className="text-center mb-8">
              <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                {uploadProgress.stage === "error" ? (
                  <AlertCircle className="w-10 h-10 text-red-500" />
                ) : uploadProgress.stage === "complete" ? (
                  <CheckCircle className="w-10 h-10 text-green-500" />
                ) : (
                  <Loader2 className="w-10 h-10 text-blue-500 animate-spin" />
                )}
              </div>

              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                {uploadProgress.message}
              </h2>

              {uploadProgress.details && (
                <p className="text-gray-600 mb-6">{uploadProgress.details}</p>
              )}

              <div className="max-w-md mx-auto">
                <Progress
                  value={uploadProgress.progress}
                  className="h-3 mb-2"
                />
                <div className="text-sm text-gray-500">
                  {uploadProgress.progress}% complete
                </div>
              </div>
            </div>

            {uploadProgress.stage === "error" && (
              <div className="text-center">
                <Button
                  onClick={() => {
                    setCurrentStep(1);
                    setIsUploading(false);
                    setUploadedFile(null);
                  }}
                  variant="outline"
                >
                  Try Again
                </Button>
              </div>
            )}
          </motion.div>
        )}

        {/* Step 3: Video Details */}
        {currentStep === 3 && uploadedFile && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-2xl shadow-xl overflow-hidden"
          >
            <div className="p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                Video Details
              </h2>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Left Column - Form */}
                <div className="space-y-6">
                  {/* Basic Info */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Title *
                    </label>
                    <Input
                      value={metadata.title}
                      onChange={(e) =>
                        setMetadata((prev) => ({
                          ...prev,
                          title: e.target.value,
                        }))
                      }
                      placeholder="Enter a compelling title..."
                      className={errors.title ? "border-red-500" : ""}
                    />
                    {errors.title && (
                      <p className="text-sm text-red-500 mt-1">
                        {errors.title}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Description *
                    </label>
                    <Textarea
                      value={metadata.description}
                      onChange={(e) =>
                        setMetadata((prev) => ({
                          ...prev,
                          description: e.target.value,
                        }))
                      }
                      placeholder="Describe your video content..."
                      rows={4}
                      className={errors.description ? "border-red-500" : ""}
                    />
                    {errors.description && (
                      <p className="text-sm text-red-500 mt-1">
                        {errors.description}
                      </p>
                    )}
                  </div>

                  {/* Category and Subject */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Category *
                      </label>
                      <Select
                        value={metadata.category}
                        onValueChange={(value) =>
                          setMetadata((prev) => ({ ...prev, category: value }))
                        }
                      >
                        <SelectTrigger
                          className={errors.category ? "border-red-500" : ""}
                        >
                          <SelectValue placeholder="Select category" />
                        </SelectTrigger>
                        <SelectContent>
                          {CATEGORIES.map((category) => (
                            <SelectItem key={category} value={category}>
                              {category}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      {errors.category && (
                        <p className="text-sm text-red-500 mt-1">
                          {errors.category}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Subject *
                      </label>
                      <Select
                        value={metadata.subject}
                        onValueChange={(value) =>
                          setMetadata((prev) => ({ ...prev, subject: value }))
                        }
                      >
                        <SelectTrigger
                          className={errors.subject ? "border-red-500" : ""}
                        >
                          <SelectValue placeholder="Select subject" />
                        </SelectTrigger>
                        <SelectContent>
                          {SUBJECTS.map((subject) => (
                            <SelectItem key={subject} value={subject}>
                              {subject}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      {errors.subject && (
                        <p className="text-sm text-red-500 mt-1">
                          {errors.subject}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Difficulty and Content Type */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Difficulty Level
                      </label>
                      <Select
                        value={metadata.difficulty}
                        onValueChange={(value: any) =>
                          setMetadata((prev) => ({
                            ...prev,
                            difficulty: value,
                          }))
                        }
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Beginner">Beginner</SelectItem>
                          <SelectItem value="Intermediate">
                            Intermediate
                          </SelectItem>
                          <SelectItem value="Advanced">Advanced</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="flex items-center space-x-3 pt-8">
                      <Switch
                        checked={metadata.isReelContent}
                        onCheckedChange={(checked) =>
                          setMetadata((prev) => ({
                            ...prev,
                            isReelContent: checked,
                          }))
                        }
                      />
                      <label className="text-sm font-medium text-gray-700">
                        Short-form content (Reel)
                      </label>
                    </div>
                  </div>

                  {/* Tags */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Tags
                    </label>
                    <div className="flex space-x-2 mb-2">
                      <Input
                        value={tagInput}
                        onChange={(e) => setTagInput(e.target.value)}
                        placeholder="Add tags..."
                        onKeyPress={(e) => e.key === "Enter" && addTag()}
                      />
                      <Button onClick={addTag} variant="outline">
                        <Plus className="w-4 h-4" />
                      </Button>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {metadata.tags.map((tag) => (
                        <Badge
                          key={tag}
                          variant="secondary"
                          className="cursor-pointer"
                          onClick={() => removeTag(tag)}
                        >
                          {tag}
                          <X className="w-3 h-3 ml-1" />
                        </Badge>
                      ))}
                    </div>
                  </div>

                  {/* Competitive Exam Tags */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Competitive Exams (if applicable)
                    </label>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                      {COMPETITIVE_EXAMS.map((exam) => (
                        <div
                          key={exam}
                          className={`p-2 text-sm border rounded-md cursor-pointer transition-colors ${
                            metadata.tags.includes(exam)
                              ? "bg-blue-100 border-blue-500 text-blue-700"
                              : "border-gray-200 hover:border-gray-300"
                          }`}
                          onClick={() => {
                            if (metadata.tags.includes(exam)) {
                              removeTag(exam);
                            } else {
                              setMetadata((prev) => ({
                                ...prev,
                                tags: [...prev.tags, exam],
                              }));
                            }
                          }}
                        >
                          {exam}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Right Column - Preview */}
                <div className="space-y-6">
                  {/* Video Preview */}
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">
                      Preview
                    </h3>
                    <div className="bg-black rounded-lg overflow-hidden">
                      <video
                        ref={videoRef}
                        src={uploadedFile.url}
                        className="w-full h-48 object-cover"
                        controls
                      />
                    </div>
                    <div className="mt-2 text-sm text-gray-500">
                      {uploadedFile.name} • {formatFileSize(uploadedFile.size)}
                      {uploadedFile.duration &&
                        ` • ${formatDuration(uploadedFile.duration)}`}
                    </div>
                  </div>

                  {/* Thumbnail Selection */}
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">
                      Thumbnail
                    </h3>
                    <div className="grid grid-cols-2 gap-3">
                      {customThumbnails.map((thumbnail, index) => (
                        <div
                          key={index}
                          className={`relative cursor-pointer rounded-lg overflow-hidden border-2 ${
                            metadata.customThumbnail === thumbnail
                              ? "border-blue-500"
                              : "border-gray-200"
                          }`}
                          onClick={() =>
                            setMetadata((prev) => ({
                              ...prev,
                              customThumbnail: thumbnail,
                            }))
                          }
                        >
                          <img
                            src={thumbnail}
                            alt={`Thumbnail ${index + 1}`}
                            className="w-full h-20 object-cover"
                          />
                          {metadata.customThumbnail === thumbnail && (
                            <div className="absolute inset-0 bg-blue-500 bg-opacity-20 flex items-center justify-center">
                              <CheckCircle className="w-6 h-6 text-blue-500" />
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                    <Button
                      variant="outline"
                      className="w-full mt-3"
                      onClick={() => thumbnailInputRef.current?.click()}
                    >
                      <Upload className="w-4 h-4 mr-2" />
                      Upload Custom Thumbnail
                    </Button>
                    <input
                      ref={thumbnailInputRef}
                      type="file"
                      accept={SUPPORTED_IMAGE_FORMATS.join(",")}
                      className="hidden"
                    />
                  </div>

                  {/* Privacy Settings */}
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">
                      Privacy & Settings
                    </h3>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Visibility
                        </label>
                        <Select
                          value={metadata.visibility}
                          onValueChange={(value: any) =>
                            setMetadata((prev) => ({
                              ...prev,
                              visibility: value,
                            }))
                          }
                        >
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="public">
                              <div className="flex items-center">
                                <Globe className="w-4 h-4 mr-2" />
                                Public
                              </div>
                            </SelectItem>
                            <SelectItem value="unlisted">
                              <div className="flex items-center">
                                <EyeIcon className="w-4 h-4 mr-2" />
                                Unlisted
                              </div>
                            </SelectItem>
                            <SelectItem value="private">
                              <div className="flex items-center">
                                <Lock className="w-4 h-4 mr-2" />
                                Private
                              </div>
                            </SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium text-gray-700">
                            Allow comments
                          </span>
                          <Switch
                            checked={metadata.allowComments}
                            onCheckedChange={(checked) =>
                              setMetadata((prev) => ({
                                ...prev,
                                allowComments: checked,
                              }))
                            }
                          />
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium text-gray-700">
                            Allow downloads
                          </span>
                          <Switch
                            checked={metadata.allowDownloads}
                            onCheckedChange={(checked) =>
                              setMetadata((prev) => ({
                                ...prev,
                                allowDownloads: checked,
                              }))
                            }
                          />
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium text-gray-700">
                            Enable monetization
                          </span>
                          <Switch
                            checked={metadata.monetization}
                            onCheckedChange={(checked) =>
                              setMetadata((prev) => ({
                                ...prev,
                                monetization: checked,
                              }))
                            }
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex justify-between pt-8 border-t">
                <Button variant="outline" onClick={() => setCurrentStep(1)}>
                  Back
                </Button>
                <Button
                  onClick={() => setCurrentStep(4)}
                  className="bg-blue-500 hover:bg-blue-600"
                >
                  Continue to Publish
                </Button>
              </div>
            </div>
          </motion.div>
        )}

        {/* Step 4: Publish */}
        {currentStep === 4 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-2xl shadow-xl p-8"
          >
            <div className="text-center mb-8">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Sparkles className="w-10 h-10 text-green-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                Ready to Publish!
              </h2>
              <p className="text-gray-600">
                Your video is ready to inspire learners around the world
              </p>
            </div>

            {/* Summary */}
            <div className="bg-gray-50 rounded-lg p-6 mb-8">
              <h3 className="font-semibold text-gray-900 mb-4">
                Video Summary
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="font-medium text-gray-700">Title:</span>
                  <p className="text-gray-600">{metadata.title}</p>
                </div>
                <div>
                  <span className="font-medium text-gray-700">Category:</span>
                  <p className="text-gray-600">{metadata.category}</p>
                </div>
                <div>
                  <span className="font-medium text-gray-700">Subject:</span>
                  <p className="text-gray-600">{metadata.subject}</p>
                </div>
                <div>
                  <span className="font-medium text-gray-700">Difficulty:</span>
                  <p className="text-gray-600">{metadata.difficulty}</p>
                </div>
                <div>
                  <span className="font-medium text-gray-700">Visibility:</span>
                  <p className="text-gray-600 capitalize">
                    {metadata.visibility}
                  </p>
                </div>
                <div>
                  <span className="font-medium text-gray-700">
                    Content Type:
                  </span>
                  <p className="text-gray-600">
                    {metadata.isReelContent
                      ? "Short-form (Reel)"
                      : "Long-form Video"}
                  </p>
                </div>
              </div>
              {metadata.tags.length > 0 && (
                <div className="mt-4">
                  <span className="font-medium text-gray-700">Tags:</span>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {metadata.tags.map((tag) => (
                      <Badge key={tag} variant="secondary">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Publishing Progress */}
            {isUploading && (
              <div className="mb-8">
                <div className="flex items-center justify-center mb-4">
                  <Loader2 className="w-8 h-8 text-blue-500 animate-spin mr-3" />
                  <span className="text-lg font-medium text-gray-900">
                    {uploadProgress.message}
                  </span>
                </div>
                <Progress value={uploadProgress.progress} className="h-3" />
                <div className="text-center text-sm text-gray-500 mt-2">
                  {uploadProgress.progress}% complete
                </div>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex justify-between">
              <Button
                variant="outline"
                onClick={() => setCurrentStep(3)}
                disabled={isUploading}
              >
                Back to Edit
              </Button>
              <div className="space-x-3">
                <Button variant="outline" disabled={isUploading}>
                  Save as Draft
                </Button>
                <Button
                  onClick={handlePublish}
                  disabled={isUploading}
                  className="bg-green-600 hover:bg-green-700"
                >
                  <Upload className="w-4 h-4 mr-2" />
                  Publish Video
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
