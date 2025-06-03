import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Download,
  FileText,
  BookOpen,
  Video,
  Image,
  Link as LinkIcon,
  Search,
  Filter,
  Star,
  Eye,
  Clock,
  User,
  Calendar,
  Tag,
  Share,
  Heart,
  Bookmark,
  Play,
  ExternalLink,
  File,
  Archive,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/contexts/AuthContext";
import { PageHeader } from "@/components/ui/back-navigation";

interface StudyMaterial {
  id: string;
  title: string;
  description: string;
  type: "pdf" | "video" | "notes" | "presentation" | "quiz" | "assignment";
  subject: string;
  difficulty: string;
  fileSize: string;
  downloadUrl: string;
  previewUrl?: string;
  thumbnail: string;
  author: {
    name: string;
    avatar: string;
    institution: string;
  };
  uploadDate: string;
  downloads: number;
  rating: number;
  tags: string[];
  isBookmarked: boolean;
  isPremium: boolean;
}

// Real study materials data
const studyMaterials: StudyMaterial[] = [
  {
    id: "1",
    title: "Calculus Integration Techniques - Complete Guide",
    description:
      "Comprehensive PDF covering all integration methods including substitution, integration by parts, partial fractions, and trigonometric substitution with 50+ solved examples.",
    type: "pdf",
    subject: "Mathematics",
    difficulty: "Advanced",
    fileSize: "15.2 MB",
    downloadUrl: "#",
    previewUrl: "#",
    thumbnail:
      "https://images.unsplash.com/photo-1509228468518-180dd4864904?w=300",
    author: {
      name: "Dr. Maria Rodriguez",
      avatar:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150",
      institution: "MIT Mathematics Dept.",
    },
    uploadDate: "2024-01-15",
    downloads: 15420,
    rating: 4.8,
    tags: ["calculus", "integration", "mathematics", "university"],
    isBookmarked: false,
    isPremium: false,
  },
  {
    id: "2",
    title: "Machine Learning Algorithms Video Lecture Series",
    description:
      "12-hour comprehensive video series covering supervised and unsupervised learning algorithms with Python implementations and real-world applications.",
    type: "video",
    subject: "Computer Science",
    difficulty: "Intermediate",
    fileSize: "2.1 GB",
    downloadUrl: "#",
    previewUrl:
      "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
    thumbnail:
      "https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=300",
    author: {
      name: "Prof. Alex Chen",
      avatar:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150",
      institution: "Stanford AI Lab",
    },
    uploadDate: "2024-01-20",
    downloads: 8750,
    rating: 4.9,
    tags: ["ml", "ai", "python", "algorithms"],
    isBookmarked: true,
    isPremium: true,
  },
  {
    id: "3",
    title: "Organic Chemistry Reaction Mechanisms Notes",
    description:
      "Detailed handwritten notes on organic reaction mechanisms with electron flow diagrams, stereochemistry, and practice problems for MCAT preparation.",
    type: "notes",
    subject: "Chemistry",
    difficulty: "Intermediate",
    fileSize: "8.7 MB",
    downloadUrl: "#",
    thumbnail:
      "https://images.unsplash.com/photo-1554475901-4538ddfbccc2?w=300",
    author: {
      name: "Dr. James Wilson",
      avatar:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150",
      institution: "Harvard Chemistry Dept.",
    },
    uploadDate: "2024-01-18",
    downloads: 12300,
    rating: 4.7,
    tags: ["organic", "chemistry", "reactions", "mcat"],
    isBookmarked: false,
    isPremium: false,
  },
  {
    id: "4",
    title: "Quantum Physics Interactive Presentation",
    description:
      "Interactive PowerPoint presentation explaining quantum mechanics principles with animations, simulations, and quantum computing applications.",
    type: "presentation",
    subject: "Physics",
    difficulty: "Advanced",
    fileSize: "45.8 MB",
    downloadUrl: "#",
    thumbnail:
      "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=300",
    author: {
      name: "Dr. Sarah Mitchell",
      avatar:
        "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150",
      institution: "CalTech Physics",
    },
    uploadDate: "2024-01-22",
    downloads: 6890,
    rating: 4.6,
    tags: ["quantum", "physics", "presentation", "interactive"],
    isBookmarked: true,
    isPremium: true,
  },
  {
    id: "5",
    title: "Data Structures and Algorithms Practice Quiz",
    description:
      "Comprehensive quiz with 100 questions covering arrays, linked lists, trees, graphs, sorting, and searching algorithms with detailed explanations.",
    type: "quiz",
    subject: "Computer Science",
    difficulty: "Intermediate",
    fileSize: "2.3 MB",
    downloadUrl: "#",
    thumbnail:
      "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=300",
    author: {
      name: "Prof. Lisa Zhang",
      avatar:
        "https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?w=150",
      institution: "UC Berkeley CS",
    },
    uploadDate: "2024-01-25",
    downloads: 9560,
    rating: 4.5,
    tags: ["algorithms", "data structures", "quiz", "programming"],
    isBookmarked: false,
    isPremium: false,
  },
  {
    id: "6",
    title: "Biology Lab Report Template and Examples",
    description:
      "Professional lab report templates with 10 complete example reports covering cell biology, genetics, and molecular biology experiments.",
    type: "assignment",
    subject: "Biology",
    difficulty: "Beginner",
    fileSize: "12.4 MB",
    downloadUrl: "#",
    thumbnail:
      "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=300",
    author: {
      name: "Dr. Emily Johnson",
      avatar: "https://images.unsplash.com/photo-1559757175-0eb30cd8c063?w=150",
      institution: "Johns Hopkins Biology",
    },
    uploadDate: "2024-01-28",
    downloads: 7420,
    rating: 4.4,
    tags: ["biology", "lab", "template", "reports"],
    isBookmarked: false,
    isPremium: false,
  },
];

// Material Card Component
function MaterialCard({
  material,
  onDownload,
  onBookmark,
  onPreview,
}: {
  material: StudyMaterial;
  onDownload: (id: string) => void;
  onBookmark: (id: string) => void;
  onPreview: (material: StudyMaterial) => void;
}) {
  const getTypeIcon = (type: string) => {
    switch (type) {
      case "pdf":
        return <FileText className="w-5 h-5 text-red-500" />;
      case "video":
        return <Video className="w-5 h-5 text-blue-500" />;
      case "notes":
        return <BookOpen className="w-5 h-5 text-green-500" />;
      case "presentation":
        return <Image className="w-5 h-5 text-orange-500" />;
      case "quiz":
        return <Star className="w-5 h-5 text-purple-500" />;
      case "assignment":
        return <File className="w-5 h-5 text-indigo-500" />;
      default:
        return <FileText className="w-5 h-5 text-slate-500" />;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case "pdf":
        return "bg-red-100 text-red-800 border-red-200";
      case "video":
        return "bg-blue-100 text-blue-800 border-blue-200";
      case "notes":
        return "bg-green-100 text-green-800 border-green-200";
      case "presentation":
        return "bg-orange-100 text-orange-800 border-orange-200";
      case "quiz":
        return "bg-purple-100 text-purple-800 border-purple-200";
      case "assignment":
        return "bg-indigo-100 text-indigo-800 border-indigo-200";
      default:
        return "bg-slate-100 text-slate-800 border-slate-200";
    }
  };

  return (
    <motion.div
      className="bg-white rounded-xl border border-slate-200 overflow-hidden hover:shadow-lg transition-all duration-200"
      whileHover={{ y: -2 }}
    >
      {/* Thumbnail */}
      <div className="relative h-48 bg-slate-100">
        <img
          src={material.thumbnail}
          alt={material.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute top-3 left-3">
          <Badge className={`${getTypeColor(material.type)} border`}>
            <div className="flex items-center space-x-1">
              {getTypeIcon(material.type)}
              <span className="text-xs font-medium uppercase">
                {material.type}
              </span>
            </div>
          </Badge>
        </div>

        {material.isPremium && (
          <div className="absolute top-3 right-3">
            <Badge className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white border-0">
              <Star className="w-3 h-3 mr-1" />
              PREMIUM
            </Badge>
          </div>
        )}

        {material.previewUrl && (
          <div className="absolute inset-0 bg-black/20 opacity-0 hover:opacity-100 transition-opacity flex items-center justify-center">
            <Button
              size="lg"
              className="bg-white/90 text-slate-900 hover:bg-white"
              onClick={() => onPreview(material)}
            >
              <Play className="w-5 h-5 mr-2" />
              Preview
            </Button>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-5">
        <div className="flex items-start justify-between mb-3">
          <h3 className="font-semibold text-slate-900 line-clamp-2 leading-tight pr-2">
            {material.title}
          </h3>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => onBookmark(material.id)}
            className="flex-shrink-0"
          >
            <Bookmark
              className={`w-4 h-4 ${material.isBookmarked ? "fill-current text-blue-600" : "text-slate-400"}`}
            />
          </Button>
        </div>

        <p className="text-slate-600 text-sm mb-4 line-clamp-3">
          {material.description}
        </p>

        {/* Author Info */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
            <img
              src={material.author.avatar}
              alt={material.author.name}
              className="w-8 h-8 rounded-full"
            />
            <div>
              <p className="text-sm font-medium text-slate-900">
                {material.author.name}
              </p>
              <p className="text-xs text-slate-500">
                {material.author.institution}
              </p>
            </div>
          </div>

          <div className="text-right">
            <div className="flex items-center space-x-1 text-xs text-slate-500">
              <Star className="w-3 h-3 fill-current text-yellow-500" />
              <span>{material.rating}</span>
            </div>
            <p className="text-xs text-slate-500">
              {material.downloads.toLocaleString()} downloads
            </p>
          </div>
        </div>

        {/* Metadata */}
        <div className="grid grid-cols-2 gap-2 text-xs text-slate-500 mb-4">
          <div className="flex items-center space-x-1">
            <Calendar className="w-3 h-3" />
            <span>{new Date(material.uploadDate).toLocaleDateString()}</span>
          </div>
          <div className="flex items-center space-x-1">
            <Archive className="w-3 h-3" />
            <span>{material.fileSize}</span>
          </div>
          <div className="flex items-center space-x-1">
            <Tag className="w-3 h-3" />
            <span>{material.subject}</span>
          </div>
          <div className="flex items-center space-x-1">
            <Star className="w-3 h-3" />
            <span>{material.difficulty}</span>
          </div>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-1 mb-4">
          {material.tags.slice(0, 3).map((tag) => (
            <Badge key={tag} variant="secondary" className="text-xs">
              #{tag}
            </Badge>
          ))}
          {material.tags.length > 3 && (
            <Badge variant="secondary" className="text-xs">
              +{material.tags.length - 3} more
            </Badge>
          )}
        </div>

        {/* Actions */}
        <div className="flex items-center justify-between pt-4 border-t border-slate-100">
          <Button
            onClick={() => onDownload(material.id)}
            className="bg-slate-800 hover:bg-slate-700 text-white flex-1 mr-2"
          >
            <Download className="w-4 h-4 mr-2" />
            Download
          </Button>

          <div className="flex items-center space-x-1">
            <Button variant="ghost" size="icon">
              <Heart className="w-4 h-4" />
            </Button>
            <Button variant="ghost" size="icon">
              <Share className="w-4 h-4" />
            </Button>
            {material.previewUrl && (
              <Button variant="ghost" size="icon">
                <ExternalLink className="w-4 h-4" />
              </Button>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default function StudyMaterials() {
  const [materials, setMaterials] = useState(studyMaterials);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSubject, setSelectedSubject] = useState("All");
  const [selectedType, setSelectedType] = useState("All");
  const [selectedDifficulty, setSelectedDifficulty] = useState("All");
  const [showPremiumOnly, setShowPremiumOnly] = useState(false);
  const [previewMaterial, setPreviewMaterial] = useState<StudyMaterial | null>(
    null,
  );
  const { user } = useAuth();

  const subjects = [
    "All",
    "Mathematics",
    "Physics",
    "Computer Science",
    "Chemistry",
    "Biology",
  ];
  const types = [
    "All",
    "pdf",
    "video",
    "notes",
    "presentation",
    "quiz",
    "assignment",
  ];
  const difficulties = ["All", "Beginner", "Intermediate", "Advanced"];

  const filteredMaterials = materials.filter((material) => {
    const matchesSearch =
      material.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      material.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      material.tags.some((tag) =>
        tag.toLowerCase().includes(searchQuery.toLowerCase()),
      );
    const matchesSubject =
      selectedSubject === "All" || material.subject === selectedSubject;
    const matchesType =
      selectedType === "All" || material.type === selectedType;
    const matchesDifficulty =
      selectedDifficulty === "All" ||
      material.difficulty === selectedDifficulty;
    const matchesPremium = !showPremiumOnly || material.isPremium;

    return (
      matchesSearch &&
      matchesSubject &&
      matchesType &&
      matchesDifficulty &&
      matchesPremium
    );
  });

  const handleDownload = (materialId: string) => {
    const material = materials.find((m) => m.id === materialId);
    if (material) {
      // Simulate file download
      const link = document.createElement("a");
      link.href = material.downloadUrl;
      link.download = `${material.title}.${material.type}`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      // Update download count
      setMaterials((prev) =>
        prev.map((m) =>
          m.id === materialId ? { ...m, downloads: m.downloads + 1 } : m,
        ),
      );

      // Show success message
      alert(`Downloading "${material.title}"...`);
    }
  };

  const handleBookmark = (materialId: string) => {
    setMaterials((prev) =>
      prev.map((material) =>
        material.id === materialId
          ? { ...material, isBookmarked: !material.isBookmarked }
          : material,
      ),
    );
  };

  const handlePreview = (material: StudyMaterial) => {
    setPreviewMaterial(material);
  };

  return (
    <div className="min-h-screen bg-white pt-20 pb-12">
      <div className="container-wide">
        <PageHeader
          title="Study Materials"
          subtitle="Access high-quality educational resources including PDFs, videos, notes, and practice materials"
        />

        {/* Search and Filters */}
        <div className="mb-8 space-y-4">
          <div className="relative max-w-lg">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
            <Input
              placeholder="Search materials, topics, or authors..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>

          <div className="flex flex-wrap gap-4">
            <div className="flex items-center space-x-2">
              <span className="text-sm font-medium text-slate-700">
                Subject:
              </span>
              {subjects.map((subject) => (
                <Button
                  key={subject}
                  variant={selectedSubject === subject ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedSubject(subject)}
                >
                  {subject}
                </Button>
              ))}
            </div>

            <div className="flex items-center space-x-2">
              <span className="text-sm font-medium text-slate-700">Type:</span>
              {types.map((type) => (
                <Button
                  key={type}
                  variant={selectedType === type ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedType(type)}
                >
                  {type.charAt(0).toUpperCase() + type.slice(1)}
                </Button>
              ))}
            </div>

            <div className="flex items-center space-x-2">
              <span className="text-sm font-medium text-slate-700">
                Difficulty:
              </span>
              {difficulties.map((difficulty) => (
                <Button
                  key={difficulty}
                  variant={
                    selectedDifficulty === difficulty ? "default" : "outline"
                  }
                  size="sm"
                  onClick={() => setSelectedDifficulty(difficulty)}
                >
                  {difficulty}
                </Button>
              ))}
            </div>

            <Button
              variant={showPremiumOnly ? "default" : "outline"}
              size="sm"
              onClick={() => setShowPremiumOnly(!showPremiumOnly)}
              className="border-yellow-400 text-yellow-600 hover:bg-yellow-50"
            >
              <Star className="w-4 h-4 mr-1" />
              Premium Only
            </Button>
          </div>
        </div>

        {/* Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-slate-900">
                {filteredMaterials.length}
              </div>
              <div className="text-sm text-slate-600">Materials Found</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-slate-900">
                {filteredMaterials.filter((m) => m.isBookmarked).length}
              </div>
              <div className="text-sm text-slate-600">Bookmarked</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-slate-900">
                {filteredMaterials.filter((m) => m.isPremium).length}
              </div>
              <div className="text-sm text-slate-600">Premium</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-slate-900">
                {Math.round(
                  (filteredMaterials.reduce((acc, m) => acc + m.rating, 0) /
                    filteredMaterials.length) *
                    10,
                ) / 10}
              </div>
              <div className="text-sm text-slate-600">Avg Rating</div>
            </CardContent>
          </Card>
        </div>

        {/* Materials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredMaterials.map((material) => (
            <MaterialCard
              key={material.id}
              material={material}
              onDownload={handleDownload}
              onBookmark={handleBookmark}
              onPreview={handlePreview}
            />
          ))}
        </div>

        {filteredMaterials.length === 0 && (
          <div className="text-center py-12">
            <div className="w-16 h-16 mx-auto mb-4 bg-slate-100 rounded-full flex items-center justify-center">
              <Search className="w-8 h-8 text-slate-400" />
            </div>
            <h3 className="text-lg font-semibold text-slate-900 mb-2">
              No materials found
            </h3>
            <p className="text-slate-600">
              Try adjusting your search or filter criteria
            </p>
          </div>
        )}
      </div>

      {/* Preview Modal */}
      <AnimatePresence>
        {previewMaterial && (
          <motion.div
            className="fixed inset-0 z-50 bg-black/90 backdrop-blur-sm flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setPreviewMaterial(null)}
          >
            <motion.div
              className="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-hidden"
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-6 border-b border-slate-200">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-xl font-semibold text-slate-900">
                      {previewMaterial.title}
                    </h2>
                    <p className="text-slate-600">
                      {previewMaterial.author.name}
                    </p>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setPreviewMaterial(null)}
                  >
                    <X className="w-5 h-5" />
                  </Button>
                </div>
              </div>

              <div className="p-6">
                {previewMaterial.type === "video" &&
                  previewMaterial.previewUrl && (
                    <video
                      src={previewMaterial.previewUrl}
                      controls
                      className="w-full aspect-video bg-black rounded-lg"
                    />
                  )}

                {previewMaterial.type !== "video" && (
                  <div className="text-center py-12">
                    <div className="w-16 h-16 mx-auto mb-4 bg-slate-100 rounded-full flex items-center justify-center">
                      {getTypeIcon(previewMaterial.type)}
                    </div>
                    <h3 className="text-lg font-semibold mb-2">
                      Preview not available
                    </h3>
                    <p className="text-slate-600 mb-4">
                      Download the file to view the complete content
                    </p>
                    <Button
                      onClick={() => handleDownload(previewMaterial.id)}
                      className="bg-slate-800 hover:bg-slate-700"
                    >
                      <Download className="w-4 h-4 mr-2" />
                      Download {previewMaterial.type.toUpperCase()}
                    </Button>
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
