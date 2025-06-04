import React, { useState, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Upload,
  Video,
  Image,
  FileText,
  X,
  Play,
  Pause,
  Volume2,
  VolumeX,
  Edit,
  Save,
  Eye,
  EyeOff,
  Globe,
  Lock,
  Users,
  CheckCircle,
  AlertCircle,
  Loader2,
  Camera,
  Scissors,
  Palette,
  Music,
  Hash,
  DollarSign,
  Calendar,
  Clock,
  MapPin,
  Target,
  Award,
  BookOpen,
  Brain,
  Zap,
  Star,
  TrendingUp,
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
import { Progress } from "@/components/ui/progress";
import { useAuth } from "@/contexts/AuthContext";
import { PageHeader } from "@/components/ui/back-navigation";

interface VideoFile {
  file: File;
  preview: string;
  duration: number;
  size: string;
}

interface ThumbnailFile {
  file: File;
  preview: string;
}

interface VideoMetadata {
  title: string;
  description: string;
  tags: string[];
  subject: string;
  difficulty: "Beginner" | "Intermediate" | "Advanced";
  category: string;
  visibility: "public" | "unlisted" | "private";
  allowComments: boolean;
  allowDownloads: boolean;
  monetization: boolean;
  scheduledDate?: string;
  language: string;
  subtitles: File[];
  thumbnail?: ThumbnailFile;
}

interface UploadProgress {
  video: number;
  thumbnail: number;
  processing: number;
  overall: number;
}

const subjects = [
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
  "Art",
  "Music",
  "Physical Education",
  "Life Skills",
];

const categories = [
  "Educational Tutorial",
  "Lecture Series",
  "Competitive Exam Prep",
  "Skill Development",
  "Language Learning",
  "Science Experiments",
  "Coding Tutorial",
  "Art & Creativity",
  "Health & Wellness",
  "Career Guidance",
  "Technology Review",
  "Book Summary",
];

const languages = [
  "English",
  "Hindi",
  "Spanish",
  "French",
  "German",
  "Chinese",
  "Japanese",
  "Korean",
  "Arabic",
  "Portuguese",
  "Russian",
  "Italian",
];

const competitiveExams = [
  "JEE Main",
  "JEE Advanced",
  "NEET",
  "GATE",
  "CAT",
  "GRE",
  "SAT",
  "GMAT",
  "UPSC",
  "SSC",
  "Bank PO",
  "Railway",
  "Defence",
  "State PSC",
  "KVPY",
  "NTSE",
  "Olympiad",
  "CLAT",
  "AIIMS",
  "JIPMER",
];

export default function VideoUpload() {
  const [step, setStep] = useState(1);
  const [videoFile, setVideoFile] = useState<VideoFile | null>(null);
  const [metadata, setMetadata] = useState<VideoMetadata>({
    title: "",
    description: "",
    tags: [],
    subject: "Mathematics",
    difficulty: "Intermediate",
    category: "Educational Tutorial",
    visibility: "public",
    allowComments: true,
    allowDownloads: true,
    monetization: false,
    language: "English",
    subtitles: [],
  });
  const [currentTag, setCurrentTag] = useState("");
  const [uploadProgress, setUploadProgress] = useState<UploadProgress>({
    video: 0,
    thumbnail: 0,
    processing: 0,
    overall: 0,
  });
  const [isUploading, setIsUploading] = useState(false);
  const [uploadComplete, setUploadComplete] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  const [videoPreview, setVideoPreview] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const thumbnailInputRef = useRef<HTMLInputElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const { user } = useAuth();

  // File upload handlers
  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    const files = Array.from(e.dataTransfer.files);
    const videoFile = files.find((file) => file.type.startsWith("video/"));

    if (videoFile) {
      processVideoFile(videoFile);
    }
  }, []);

  const processVideoFile = (file: File) => {
    const video = document.createElement("video");
    const url = URL.createObjectURL(file);
    video.src = url;

    video.onloadedmetadata = () => {
      const duration = Math.floor(video.duration);
      const size = (file.size / (1024 * 1024)).toFixed(2) + " MB";

      setVideoFile({
        file,
        preview: url,
        duration,
        size,
      });

      // Auto-generate title from filename
      const fileName = file.name.replace(/\.[^/.]+$/, "");
      setMetadata((prev) => ({
        ...prev,
        title:
          fileName.charAt(0).toUpperCase() +
          fileName.slice(1).replace(/[_-]/g, " "),
      }));

      setStep(2);
    };
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type.startsWith("video/")) {
      processVideoFile(file);
    }
  };

  const handleThumbnailSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type.startsWith("image/")) {
      const preview = URL.createObjectURL(file);
      setMetadata((prev) => ({
        ...prev,
        thumbnail: { file, preview },
      }));
    }
  };

  const addTag = () => {
    if (currentTag.trim() && !metadata.tags.includes(currentTag.trim())) {
      setMetadata((prev) => ({
        ...prev,
        tags: [...prev.tags, currentTag.trim()],
      }));
      setCurrentTag("");
    }
  };

  const removeTag = (tagToRemove: string) => {
    setMetadata((prev) => ({
      ...prev,
      tags: prev.tags.filter((tag) => tag !== tagToRemove),
    }));
  };

  const handleUpload = async () => {
    if (!videoFile) return;

    setIsUploading(true);
    setStep(3);

    try {
      // Simulate realistic upload process
      const steps = [
        {
          name: "Uploading video file",
          duration: 3000,
          progressKey: "video" as keyof UploadProgress,
        },
        {
          name: "Uploading thumbnail",
          duration: 1000,
          progressKey: "thumbnail" as keyof UploadProgress,
        },
        {
          name: "Processing video",
          duration: 2000,
          progressKey: "processing" as keyof UploadProgress,
        },
      ];

      for (const step of steps) {
        await simulateProgress(step.progressKey, step.duration);
      }

      // Calculate overall progress
      setUploadProgress((prev) => ({ ...prev, overall: 100 }));
      setUploadComplete(true);
      setStep(4);

      // Store video data (simulate backend storage)
      const videoData = {
        id: Date.now().toString(),
        ...metadata,
        videoFile: videoFile.file.name,
        uploadDate: new Date().toISOString(),
        creator: user,
        stats: {
          views: 0,
          likes: 0,
          comments: 0,
          shares: 0,
        },
      };

      // Simulate saving to localStorage (mock backend)
      const existingVideos = JSON.parse(
        localStorage.getItem("uploaded_videos") || "[]",
      );
      existingVideos.push(videoData);
      localStorage.setItem("uploaded_videos", JSON.stringify(existingVideos));
    } catch (error) {
      console.error("Upload failed:", error);
      alert("Upload failed. Please try again.");
    } finally {
      setIsUploading(false);
    }
  };

  const simulateProgress = (
    key: keyof UploadProgress,
    duration: number,
  ): Promise<void> => {
    return new Promise((resolve) => {
      let progress = 0;
      const interval = setInterval(() => {
        progress += Math.random() * 15;
        if (progress >= 100) {
          progress = 100;
          clearInterval(interval);
          resolve();
        }
        setUploadProgress((prev) => ({ ...prev, [key]: progress }));
      }, duration / 20);
    });
  };

  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  const resetUpload = () => {
    setStep(1);
    setVideoFile(null);
    setMetadata({
      title: "",
      description: "",
      tags: [],
      subject: "Mathematics",
      difficulty: "Intermediate",
      category: "Educational Tutorial",
      visibility: "public",
      allowComments: true,
      allowDownloads: true,
      monetization: false,
      language: "English",
      subtitles: [],
    });
    setUploadProgress({ video: 0, thumbnail: 0, processing: 0, overall: 0 });
    setUploadComplete(false);
    setIsUploading(false);
  };

  return (
    <div
      className="min-h-screen pt-20 pb-12"
      style={{
        background: "linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)",
      }}
    >
      <div className="container-wide max-w-4xl">
        <PageHeader
          title="Upload Video"
          subtitle="Share your knowledge with millions of learners worldwide"
        />

        {/* Progress Steps */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            {[1, 2, 3, 4].map((stepNumber) => (
              <div key={stepNumber} className="flex items-center">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold ${
                    step >= stepNumber
                      ? "bg-gradient-to-r from-blue-500 to-indigo-600 text-white"
                      : "bg-white/80 text-slate-400 border border-slate-200"
                  }`}
                >
                  {stepNumber === 4 && uploadComplete ? (
                    <CheckCircle className="w-5 h-5" />
                  ) : (
                    stepNumber
                  )}
                </div>
                {stepNumber < 4 && (
                  <div
                    className={`w-20 h-1 mx-2 ${
                      step > stepNumber
                        ? "bg-gradient-to-r from-blue-500 to-indigo-600"
                        : "bg-slate-200"
                    }`}
                  />
                )}
              </div>
            ))}
          </div>
          <div className="flex justify-between mt-2 text-sm">
            <span
              className={
                step >= 1 ? "text-blue-600 font-medium" : "text-slate-500"
              }
            >
              Upload
            </span>
            <span
              className={
                step >= 2 ? "text-blue-600 font-medium" : "text-slate-500"
              }
            >
              Details
            </span>
            <span
              className={
                step >= 3 ? "text-blue-600 font-medium" : "text-slate-500"
              }
            >
              Processing
            </span>
            <span
              className={
                step >= 4 ? "text-blue-600 font-medium" : "text-slate-500"
              }
            >
              Complete
            </span>
          </div>
        </div>

        {/* Step 1: File Upload */}
        {step === 1 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <Card className="bg-white/80 backdrop-blur-sm border border-white/20">
              <CardHeader>
                <CardTitle className="text-xl text-slate-800 flex items-center">
                  <Video className="w-6 h-6 mr-2 text-blue-600" />
                  Upload Your Educational Video
                </CardTitle>
                <CardDescription>
                  Supported formats: MP4, MOV, AVI, WebM. Maximum size: 2GB
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div
                  className={`border-2 border-dashed rounded-xl p-12 text-center transition-all duration-300 ${
                    dragActive
                      ? "border-blue-500 bg-blue-50"
                      : "border-slate-300 hover:border-blue-400 hover:bg-slate-50"
                  }`}
                  onDragEnter={handleDrag}
                  onDragLeave={handleDrag}
                  onDragOver={handleDrag}
                  onDrop={handleDrop}
                >
                  <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full flex items-center justify-center">
                    <Upload className="w-8 h-8 text-white" />
                  </div>

                  <h3 className="text-lg font-semibold text-slate-800 mb-2">
                    Drag and drop your video here
                  </h3>

                  <p className="text-slate-600 mb-6">
                    or click to browse from your computer
                  </p>

                  <Button
                    onClick={() => fileInputRef.current?.click()}
                    className="bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white"
                  >
                    <Upload className="w-4 h-4 mr-2" />
                    Select Video File
                  </Button>

                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="video/*"
                    onChange={handleFileSelect}
                    className="hidden"
                  />
                </div>

                {/* Quick tips */}
                <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-4 rounded-lg">
                    <CheckCircle className="w-5 h-5 text-green-600 mb-2" />
                    <h4 className="font-medium text-green-800">High Quality</h4>
                    <p className="text-sm text-green-700">
                      1080p or higher recommended
                    </p>
                  </div>

                  <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-4 rounded-lg">
                    <Clock className="w-5 h-5 text-blue-600 mb-2" />
                    <h4 className="font-medium text-blue-800">
                      Optimal Length
                    </h4>
                    <p className="text-sm text-blue-700">
                      5-45 minutes works best
                    </p>
                  </div>

                  <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-4 rounded-lg">
                    <Target className="w-5 h-5 text-purple-600 mb-2" />
                    <h4 className="font-medium text-purple-800">Clear Audio</h4>
                    <p className="text-sm text-purple-700">
                      Good sound quality essential
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}

        {/* Step 2: Video Details */}
        {step === 2 && videoFile && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            {/* Video Preview */}
            <Card className="bg-white/80 backdrop-blur-sm border border-white/20">
              <CardHeader>
                <CardTitle className="text-xl text-slate-800 flex items-center">
                  <Eye className="w-6 h-6 mr-2 text-blue-600" />
                  Video Preview
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div className="relative bg-black rounded-lg overflow-hidden">
                    <video
                      ref={videoRef}
                      src={videoFile.preview}
                      className="w-full aspect-video"
                      controls
                      muted
                    />
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-slate-700">
                        File Details
                      </span>
                      <Badge className="bg-green-100 text-green-800">
                        <CheckCircle className="w-3 h-3 mr-1" />
                        Ready to Upload
                      </Badge>
                    </div>

                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-slate-600">Duration:</span>
                        <span className="font-medium">
                          {formatDuration(videoFile.duration)}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-600">File Size:</span>
                        <span className="font-medium">{videoFile.size}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-600">Format:</span>
                        <span className="font-medium">
                          {videoFile.file.type}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Video Metadata */}
            <Card className="bg-white/80 backdrop-blur-sm border border-white/20">
              <CardHeader>
                <CardTitle className="text-xl text-slate-800 flex items-center">
                  <Edit className="w-6 h-6 mr-2 text-blue-600" />
                  Video Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Title */}
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
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
                    placeholder="Enter a descriptive title for your video"
                    className="bg-white/80"
                  />
                </div>

                {/* Description */}
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
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
                    placeholder="Describe what your video teaches, include key topics and learning outcomes..."
                    className="min-h-[120px] bg-white/80"
                  />
                </div>

                {/* Subject and Category */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Subject *
                    </label>
                    <select
                      value={metadata.subject}
                      onChange={(e) =>
                        setMetadata((prev) => ({
                          ...prev,
                          subject: e.target.value,
                        }))
                      }
                      className="w-full p-2 border border-slate-300 rounded-lg bg-white/80"
                    >
                      {subjects.map((subject) => (
                        <option key={subject} value={subject}>
                          {subject}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Category *
                    </label>
                    <select
                      value={metadata.category}
                      onChange={(e) =>
                        setMetadata((prev) => ({
                          ...prev,
                          category: e.target.value,
                        }))
                      }
                      className="w-full p-2 border border-slate-300 rounded-lg bg-white/80"
                    >
                      {categories.map((category) => (
                        <option key={category} value={category}>
                          {category}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Difficulty and Language */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Difficulty Level *
                    </label>
                    <select
                      value={metadata.difficulty}
                      onChange={(e) =>
                        setMetadata((prev) => ({
                          ...prev,
                          difficulty: e.target.value as any,
                        }))
                      }
                      className="w-full p-2 border border-slate-300 rounded-lg bg-white/80"
                    >
                      <option value="Beginner">Beginner</option>
                      <option value="Intermediate">Intermediate</option>
                      <option value="Advanced">Advanced</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Language
                    </label>
                    <select
                      value={metadata.language}
                      onChange={(e) =>
                        setMetadata((prev) => ({
                          ...prev,
                          language: e.target.value,
                        }))
                      }
                      className="w-full p-2 border border-slate-300 rounded-lg bg-white/80"
                    >
                      {languages.map((language) => (
                        <option key={language} value={language}>
                          {language}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Tags */}
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Tags (helps with discovery)
                  </label>
                  <div className="flex space-x-2 mb-2">
                    <Input
                      value={currentTag}
                      onChange={(e) => setCurrentTag(e.target.value)}
                      placeholder="Add relevant tags..."
                      className="flex-1 bg-white/80"
                      onKeyPress={(e) => e.key === "Enter" && addTag()}
                    />
                    <Button onClick={addTag} variant="outline">
                      <Hash className="w-4 h-4 mr-1" />
                      Add
                    </Button>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {metadata.tags.map((tag, index) => (
                      <Badge key={index} className="bg-blue-100 text-blue-800">
                        #{tag}
                        <button
                          onClick={() => removeTag(tag)}
                          className="ml-1 hover:text-blue-600"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </Badge>
                    ))}
                  </div>

                  {/* Suggested competitive exam tags */}
                  <div className="mt-3">
                    <span className="text-xs text-slate-600">
                      Suggested for competitive exams:
                    </span>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {competitiveExams.slice(0, 8).map((exam) => (
                        <Button
                          key={exam}
                          variant="outline"
                          size="sm"
                          className="text-xs"
                          onClick={() => {
                            if (!metadata.tags.includes(exam)) {
                              setMetadata((prev) => ({
                                ...prev,
                                tags: [...prev.tags, exam],
                              }));
                            }
                          }}
                        >
                          +{exam}
                        </Button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Thumbnail Upload */}
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Custom Thumbnail (Optional)
                  </label>
                  <div className="flex items-center space-x-4">
                    {metadata.thumbnail ? (
                      <div className="relative">
                        <img
                          src={metadata.thumbnail.preview}
                          alt="Thumbnail"
                          className="w-32 h-18 object-cover rounded border"
                        />
                        <button
                          onClick={() =>
                            setMetadata((prev) => ({
                              ...prev,
                              thumbnail: undefined,
                            }))
                          }
                          className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </div>
                    ) : (
                      <div className="w-32 h-18 bg-slate-200 rounded border flex items-center justify-center">
                        <Image className="w-6 h-6 text-slate-400" />
                      </div>
                    )}

                    <Button
                      variant="outline"
                      onClick={() => thumbnailInputRef.current?.click()}
                    >
                      <Camera className="w-4 h-4 mr-2" />
                      Upload Thumbnail
                    </Button>

                    <input
                      ref={thumbnailInputRef}
                      type="file"
                      accept="image/*"
                      onChange={handleThumbnailSelect}
                      className="hidden"
                    />
                  </div>
                </div>

                {/* Visibility and Settings */}
                <div className="space-y-4">
                  <h3 className="font-medium text-slate-800">
                    Privacy & Settings
                  </h3>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">
                        Visibility
                      </label>
                      <select
                        value={metadata.visibility}
                        onChange={(e) =>
                          setMetadata((prev) => ({
                            ...prev,
                            visibility: e.target.value as any,
                          }))
                        }
                        className="w-full p-2 border border-slate-300 rounded-lg bg-white/80"
                      >
                        <option value="public">Public</option>
                        <option value="unlisted">Unlisted</option>
                        <option value="private">Private</option>
                      </select>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center space-x-3">
                      <input
                        type="checkbox"
                        id="allowComments"
                        checked={metadata.allowComments}
                        onChange={(e) =>
                          setMetadata((prev) => ({
                            ...prev,
                            allowComments: e.target.checked,
                          }))
                        }
                        className="rounded"
                      />
                      <label
                        htmlFor="allowComments"
                        className="text-sm text-slate-700"
                      >
                        Allow comments
                      </label>
                    </div>

                    <div className="flex items-center space-x-3">
                      <input
                        type="checkbox"
                        id="allowDownloads"
                        checked={metadata.allowDownloads}
                        onChange={(e) =>
                          setMetadata((prev) => ({
                            ...prev,
                            allowDownloads: e.target.checked,
                          }))
                        }
                        className="rounded"
                      />
                      <label
                        htmlFor="allowDownloads"
                        className="text-sm text-slate-700"
                      >
                        Allow downloads
                      </label>
                    </div>

                    <div className="flex items-center space-x-3">
                      <input
                        type="checkbox"
                        id="monetization"
                        checked={metadata.monetization}
                        onChange={(e) =>
                          setMetadata((prev) => ({
                            ...prev,
                            monetization: e.target.checked,
                          }))
                        }
                        className="rounded"
                      />
                      <label
                        htmlFor="monetization"
                        className="text-sm text-slate-700"
                      >
                        Enable monetization
                      </label>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex items-center justify-between pt-6 border-t">
                  <Button variant="outline" onClick={() => setStep(1)}>
                    <ChevronLeft className="w-4 h-4 mr-2" />
                    Back
                  </Button>

                  <Button
                    onClick={handleUpload}
                    disabled={!metadata.title || !metadata.description}
                    className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white"
                  >
                    <Upload className="w-4 h-4 mr-2" />
                    Upload Video
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}

        {/* Step 3: Upload Progress */}
        {step === 3 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <Card className="bg-white/80 backdrop-blur-sm border border-white/20">
              <CardHeader>
                <CardTitle className="text-xl text-slate-800 flex items-center">
                  <Loader2 className="w-6 h-6 mr-2 text-blue-600 animate-spin" />
                  Uploading Your Video
                </CardTitle>
                <CardDescription>
                  Please don't close this window while your video is uploading
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span>Video Upload</span>
                      <span>{Math.round(uploadProgress.video)}%</span>
                    </div>
                    <Progress value={uploadProgress.video} className="h-2" />
                  </div>

                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span>Thumbnail Upload</span>
                      <span>{Math.round(uploadProgress.thumbnail)}%</span>
                    </div>
                    <Progress
                      value={uploadProgress.thumbnail}
                      className="h-2"
                    />
                  </div>

                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span>Video Processing</span>
                      <span>{Math.round(uploadProgress.processing)}%</span>
                    </div>
                    <Progress
                      value={uploadProgress.processing}
                      className="h-2"
                    />
                  </div>

                  <div className="pt-4 border-t">
                    <div className="flex justify-between text-sm mb-2 font-medium">
                      <span>Overall Progress</span>
                      <span>{Math.round(uploadProgress.overall)}%</span>
                    </div>
                    <Progress value={uploadProgress.overall} className="h-3" />
                  </div>
                </div>

                <div className="bg-blue-50 p-4 rounded-lg">
                  <h4 className="font-medium text-blue-800 mb-2">
                    While you wait...
                  </h4>
                  <ul className="text-sm text-blue-700 space-y-1">
                    <li>
                      • Your video will be available in multiple quality options
                    </li>
                    <li>• Automatic captions will be generated</li>
                    <li>• Video will be optimized for all devices</li>
                    <li>
                      • You'll receive notifications when processing is complete
                    </li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}

        {/* Step 4: Upload Complete */}
        {step === 4 && uploadComplete && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <Card className="bg-white/80 backdrop-blur-sm border border-white/20">
              <CardContent className="text-center py-12">
                <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-r from-green-500 to-emerald-600 rounded-full flex items-center justify-center">
                  <CheckCircle className="w-10 h-10 text-white" />
                </div>

                <h2 className="text-2xl font-bold text-slate-800 mb-2">
                  Video Uploaded Successfully! 🎉
                </h2>

                <p className="text-slate-600 mb-8">
                  Your educational content "{metadata.title}" has been uploaded
                  and is now processing.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                  <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-4 rounded-lg">
                    <Eye className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                    <h3 className="font-medium text-blue-800">Ready to View</h3>
                    <p className="text-sm text-blue-700">
                      Your video is live and discoverable
                    </p>
                  </div>

                  <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-4 rounded-lg">
                    <TrendingUp className="w-8 h-8 text-green-600 mx-auto mb-2" />
                    <h3 className="font-medium text-green-800">
                      SEO Optimized
                    </h3>
                    <p className="text-sm text-green-700">
                      Tagged for maximum reach
                    </p>
                  </div>

                  <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-4 rounded-lg">
                    <Award className="w-8 h-8 text-purple-600 mx-auto mb-2" />
                    <h3 className="font-medium text-purple-800">
                      Analytics Ready
                    </h3>
                    <p className="text-sm text-purple-700">
                      Track views and engagement
                    </p>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button
                    onClick={() =>
                      window.open(`/video/${Date.now()}`, "_blank")
                    }
                    className="bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white"
                  >
                    <Play className="w-4 h-4 mr-2" />
                    View Video
                  </Button>

                  <Button
                    onClick={() => window.open("/dashboard", "_blank")}
                    variant="outline"
                  >
                    <BarChart3 className="w-4 h-4 mr-2" />
                    View Analytics
                  </Button>

                  <Button onClick={resetUpload} variant="outline">
                    <Upload className="w-4 h-4 mr-2" />
                    Upload Another
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </div>
    </div>
  );
}
