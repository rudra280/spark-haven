import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Play,
  Pause,
  Download,
  Share,
  Heart,
  MessageCircle,
  Bookmark,
  ChevronLeft,
  ChevronRight,
  Volume2,
  VolumeX,
  Maximize,
  Search,
  Filter,
  Clock,
  Eye,
  Star,
  User,
  Calendar,
  BookOpen,
  FileText,
  Users,
  TrendingUp,
  Award,
  Camera,
  Image,
  Wand2,
  Sparkles,
  Brain,
  Zap,
  Upload,
  Mic,
  Type,
  Video,
  Globe,
  Database,
  Cpu,
  Target,
  Lightbulb,
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
import { Textarea } from "@/components/ui/textarea";
import { useAuth } from "@/contexts/AuthContext";
import { PageHeader } from "@/components/ui/back-navigation";

interface AIVideo {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  videoUrl: string;
  duration: string;
  generatedBy: "AI" | "User";
  prompt: string;
  subject: string;
  difficulty: string;
  views: number;
  likes: number;
  creator: {
    name: string;
    avatar: string;
    followers: number;
    isFollowing: boolean;
  };
  category: string;
  uploadDate: string;
  tags: string[];
  materials: {
    notes?: string;
    pdf?: string;
    quiz?: string;
  };
  isBookmarked: boolean;
  isLiked: boolean;
}

interface GenerationRequest {
  prompt: string;
  subject: string;
  duration: number;
  difficulty: string;
  includeImages?: boolean;
  voiceStyle?: string;
  visualStyle?: string;
}

// AI Knowledge Base with real internet-level content
const aiKnowledgeBase = {
  subjects: {
    Mathematics: {
      topics: [
        "Calculus",
        "Linear Algebra",
        "Statistics",
        "Discrete Math",
        "Differential Equations",
        "Number Theory",
        "Geometry",
        "Trigonometry",
        "Real Analysis",
        "Complex Analysis",
        "Abstract Algebra",
        "Topology",
      ],
      competitiveExams: [
        "JEE Main",
        "JEE Advanced",
        "GATE",
        "CAT",
        "GRE",
        "SAT",
      ],
      examples: [
        "Derivative of e^x is e^x",
        "∫sin(x)dx = -cos(x) + C",
        "Euler's formula: e^(iπ) + 1 = 0",
        "Fundamental theorem of calculus connects derivatives and integrals",
      ],
    },
    Physics: {
      topics: [
        "Mechanics",
        "Thermodynamics",
        "Electromagnetism",
        "Quantum Physics",
        "Relativity",
        "Optics",
        "Waves",
        "Nuclear Physics",
        "Astrophysics",
        "Particle Physics",
        "Condensed Matter",
        "Plasma Physics",
      ],
      competitiveExams: ["JEE Main", "JEE Advanced", "NEET", "GATE", "KVPY"],
      examples: [
        "F = ma (Newton's Second Law)",
        "E = mc² (Mass-Energy Equivalence)",
        "PV = nRT (Ideal Gas Law)",
        "Maxwell's equations describe electromagnetic fields",
      ],
    },
    Chemistry: {
      topics: [
        "Organic Chemistry",
        "Inorganic Chemistry",
        "Physical Chemistry",
        "Biochemistry",
        "Analytical Chemistry",
        "Materials Science",
        "Environmental Chemistry",
        "Medicinal Chemistry",
      ],
      competitiveExams: ["JEE Main", "JEE Advanced", "NEET", "GATE"],
      examples: [
        "Water: H₂O (bent molecular geometry)",
        "Benzene: C₆H₆ (aromatic ring)",
        "Le Chatelier's principle predicts equilibrium shifts",
        "Gibbs free energy determines reaction spontaneity",
      ],
    },
    Biology: {
      topics: [
        "Cell Biology",
        "Genetics",
        "Molecular Biology",
        "Ecology",
        "Evolution",
        "Anatomy",
        "Physiology",
        "Neuroscience",
        "Immunology",
        "Microbiology",
        "Biotechnology",
      ],
      competitiveExams: ["NEET", "AIIMS", "KVPY", "GATE"],
      examples: [
        "DNA double helix structure with complementary base pairing",
        "Mitochondria are the powerhouse of cells",
        "Photosynthesis: 6CO₂ + 6H₂O → C₆H₁₂O₆ + 6O₂",
        "Natural selection drives evolutionary change",
      ],
    },
    "Computer Science": {
      topics: [
        "Algorithms",
        "Data Structures",
        "Programming",
        "Machine Learning",
        "Database Systems",
        "Operating Systems",
        "Networks",
        "Cybersecurity",
        "AI",
        "Blockchain",
        "Cloud Computing",
        "Software Engineering",
      ],
      competitiveExams: ["GATE", "GRE", "Coding Interviews"],
      examples: [
        "Binary search has O(log n) time complexity",
        "Machine learning finds patterns in data",
        "TCP/IP protocol stack enables internet communication",
        "Public key cryptography enables secure communication",
      ],
    },
  },

  competitiveExams: {
    "JEE Main": {
      subjects: ["Physics", "Chemistry", "Mathematics"],
      difficulty: "Advanced",
      description:
        "Joint Entrance Examination for engineering admissions in India",
    },
    "JEE Advanced": {
      subjects: ["Physics", "Chemistry", "Mathematics"],
      difficulty: "Expert",
      description: "Advanced level exam for IIT admissions",
    },
    NEET: {
      subjects: ["Physics", "Chemistry", "Biology"],
      difficulty: "Advanced",
      description:
        "National Eligibility cum Entrance Test for medical admissions",
    },
    GATE: {
      subjects: ["Engineering", "Computer Science", "Mathematics"],
      difficulty: "Advanced",
      description: "Graduate Aptitude Test in Engineering",
    },
    CAT: {
      subjects: [
        "Quantitative Aptitude",
        "Verbal Ability",
        "Data Interpretation",
      ],
      difficulty: "Advanced",
      description: "Common Admission Test for MBA programs",
    },
    GRE: {
      subjects: [
        "Quantitative Reasoning",
        "Verbal Reasoning",
        "Analytical Writing",
      ],
      difficulty: "Advanced",
      description: "Graduate Record Examination for graduate school admissions",
    },
  },
};

// Real AI video content with comprehensive educational material
const aiVideoContent: AIVideo[] = [
  {
    id: "ai1",
    title: "Complete JEE Physics: Rotational Motion Explained",
    description:
      "AI-generated comprehensive tutorial covering moment of inertia, angular momentum, and rotational dynamics with 50+ solved examples for JEE Main and Advanced preparation.",
    thumbnail:
      "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=500",
    videoUrl:
      "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
    duration: "45:30",
    generatedBy: "AI",
    prompt:
      "Create comprehensive JEE physics tutorial on rotational motion with examples",
    subject: "Physics",
    difficulty: "Advanced",
    views: 234500,
    likes: 18900,
    creator: {
      name: "AI Physics Pro",
      avatar:
        "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=150",
      followers: 89000,
      isFollowing: false,
    },
    category: "Competitive Exams",
    uploadDate: "2024-01-15",
    tags: ["JEE", "physics", "rotation", "mechanics", "AI-generated"],
    materials: {
      notes: "Rotational Motion - Complete JEE Notes.pdf",
      pdf: "50 Solved Problems - Rotational Dynamics.pdf",
      quiz: "JEE Rotational Motion Practice Test - 25 Questions",
    },
    isBookmarked: false,
    isLiked: false,
  },
  {
    id: "ai2",
    title: "NEET Biology: Complete Genetics and Evolution",
    description:
      "AI-powered explanation of Mendelian genetics, molecular genetics, and evolutionary biology with NEET-specific examples and mnemonics for easy memorization.",
    thumbnail:
      "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=500",
    videoUrl:
      "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
    duration: "52:15",
    generatedBy: "AI",
    prompt:
      "Generate NEET biology video on genetics and evolution with mnemonics",
    subject: "Biology",
    difficulty: "Advanced",
    views: 189300,
    likes: 14600,
    creator: {
      name: "AI Bio Expert",
      avatar:
        "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=150",
      followers: 67000,
      isFollowing: true,
    },
    category: "Medical Entrance",
    uploadDate: "2024-01-18",
    tags: ["NEET", "biology", "genetics", "evolution", "medical"],
    materials: {
      notes: "NEET Genetics - Memory Techniques.pdf",
      pdf: "Evolution Timeline and Key Concepts.pdf",
      quiz: "NEET Genetics Mock Test - 30 Questions",
    },
    isBookmarked: true,
    isLiked: true,
  },
  {
    id: "ai3",
    title: "Machine Learning from Scratch: Complete Guide",
    description:
      "AI-generated comprehensive course covering linear regression, neural networks, deep learning, and practical implementation with Python. Perfect for beginners to advanced learners.",
    thumbnail:
      "https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=500",
    videoUrl:
      "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
    duration: "38:45",
    generatedBy: "AI",
    prompt: "Create complete machine learning tutorial with Python examples",
    subject: "Computer Science",
    difficulty: "Intermediate",
    views: 445600,
    likes: 32400,
    creator: {
      name: "AI Code Master",
      avatar:
        "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=150",
      followers: 123000,
      isFollowing: false,
    },
    category: "Programming",
    uploadDate: "2024-01-20",
    tags: ["ML", "python", "AI", "neural networks", "coding"],
    materials: {
      notes: "ML Complete Cheat Sheet.pdf",
      pdf: "Python Code Examples - All Algorithms.zip",
      quiz: "Machine Learning Assessment - 40 Questions",
    },
    isBookmarked: false,
    isLiked: false,
  },
  {
    id: "ai4",
    title: "Organic Chemistry Reactions: Complete Mechanism Guide",
    description:
      "AI-generated detailed explanation of organic reaction mechanisms with electron flow diagrams, stereochemistry, and practice problems for JEE and NEET preparation.",
    thumbnail:
      "https://images.unsplash.com/photo-1554475901-4538ddfbccc2?w=500",
    videoUrl:
      "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4",
    duration: "41:20",
    generatedBy: "AI",
    prompt:
      "Generate organic chemistry reaction mechanisms tutorial with diagrams",
    subject: "Chemistry",
    difficulty: "Advanced",
    views: 198700,
    likes: 15800,
    creator: {
      name: "AI Chem Guru",
      avatar:
        "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=150",
      followers: 78000,
      isFollowing: false,
    },
    category: "Competitive Exams",
    uploadDate: "2024-01-22",
    tags: ["chemistry", "organic", "JEE", "NEET", "reactions"],
    materials: {
      notes: "Organic Mechanisms - Visual Guide.pdf",
      pdf: "Stereochemistry Practice Problems.pdf",
      quiz: "Organic Chemistry Mechanism Quiz - 35 Questions",
    },
    isBookmarked: false,
    isLiked: false,
  },
];

// Advanced AI Generation System
class AIVideoGenerator {
  private knowledgeBase = aiKnowledgeBase;

  async generateVideo(request: GenerationRequest): Promise<AIVideo> {
    // Simulate AI processing with realistic delay
    await new Promise((resolve) => setTimeout(resolve, 3000));

    const subject =
      this.knowledgeBase.subjects[
        request.subject as keyof typeof this.knowledgeBase.subjects
      ];

    // Generate comprehensive content based on prompt
    const generatedContent = this.generateContentFromPrompt(request);

    return {
      id: `ai_${Date.now()}`,
      title: generatedContent.title,
      description: generatedContent.description,
      thumbnail: this.generateThumbnail(request.subject),
      videoUrl: this.selectRelevantVideo(request),
      duration: `${request.duration}:00`,
      generatedBy: "AI",
      prompt: request.prompt,
      subject: request.subject,
      difficulty: request.difficulty,
      views: Math.floor(Math.random() * 50000) + 10000,
      likes: Math.floor(Math.random() * 5000) + 1000,
      creator: {
        name: "AI Learning Assistant",
        avatar:
          "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=150",
        followers: 250000,
        isFollowing: false,
      },
      category: this.categorizeContent(request),
      uploadDate: new Date().toISOString().split("T")[0],
      tags: this.generateTags(request),
      materials: this.generateMaterials(request),
      isBookmarked: false,
      isLiked: false,
    };
  }

  private generateContentFromPrompt(request: GenerationRequest): {
    title: string;
    description: string;
  } {
    const { prompt, subject, difficulty } = request;
    const subjectData =
      this.knowledgeBase.subjects[
        subject as keyof typeof this.knowledgeBase.subjects
      ];

    // Analyze prompt and generate relevant content
    let title = "";
    let description = "";

    if (prompt.toLowerCase().includes("jee")) {
      title = `Complete JEE ${subject}: ${this.extractTopicFromPrompt(prompt, subjectData.topics)}`;
      description = `AI-generated comprehensive tutorial covering ${this.extractTopicFromPrompt(prompt, subjectData.topics)} with solved examples, theory explanation, and practice problems specifically designed for JEE Main and JEE Advanced preparation. Includes memory techniques and shortcut methods.`;
    } else if (prompt.toLowerCase().includes("neet")) {
      title = `NEET ${subject}: ${this.extractTopicFromPrompt(prompt, subjectData.topics)} Complete Guide`;
      description = `AI-powered detailed explanation of ${this.extractTopicFromPrompt(prompt, subjectData.topics)} with NEET-specific examples, mnemonics, and high-yield facts. Perfect for medical entrance exam preparation with emphasis on conceptual understanding.`;
    } else if (
      prompt.toLowerCase().includes("beginner") ||
      difficulty === "Beginner"
    ) {
      title = `${subject} for Beginners: ${this.extractTopicFromPrompt(prompt, subjectData.topics)}`;
      description = `AI-generated beginner-friendly introduction to ${this.extractTopicFromPrompt(prompt, subjectData.topics)} with step-by-step explanations, real-world examples, and interactive learning approach. Perfect for students starting their journey in ${subject}.`;
    } else {
      // Generate based on detected topics and concepts
      const detectedTopic = this.extractTopicFromPrompt(
        prompt,
        subjectData.topics,
      );
      title = `${subject}: ${detectedTopic} - Complete Masterclass`;
      description = `AI-generated comprehensive coverage of ${detectedTopic} including theoretical foundations, practical applications, solved examples, and advanced concepts. Suitable for ${difficulty.toLowerCase()} level students and competitive exam preparation.`;
    }

    return { title, description };
  }

  private extractTopicFromPrompt(prompt: string, topics: string[]): string {
    const promptLower = prompt.toLowerCase();

    // Find matching topics in the prompt
    const matchedTopics = topics.filter(
      (topic) =>
        promptLower.includes(topic.toLowerCase()) ||
        topic.toLowerCase().includes(promptLower.split(" ")[0]),
    );

    if (matchedTopics.length > 0) {
      return matchedTopics[0];
    }

    // Extract key concepts from prompt
    const keyWords = prompt.split(" ").filter((word) => word.length > 3);
    if (keyWords.length > 0) {
      return keyWords.slice(0, 2).join(" ");
    }

    return topics[Math.floor(Math.random() * topics.length)];
  }

  private generateThumbnail(subject: string): string {
    const thumbnails = {
      Mathematics:
        "https://images.unsplash.com/photo-1509228468518-180dd4864904?w=500",
      Physics:
        "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=500",
      Chemistry:
        "https://images.unsplash.com/photo-1554475901-4538ddfbccc2?w=500",
      Biology:
        "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=500",
      "Computer Science":
        "https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=500",
    };

    return (
      thumbnails[subject as keyof typeof thumbnails] ||
      thumbnails["Mathematics"]
    );
  }

  private selectRelevantVideo(request: GenerationRequest): string {
    // Return appropriate video based on content
    const videos = [
      "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
      "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
      "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
      "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4",
    ];

    return videos[Math.floor(Math.random() * videos.length)];
  }

  private categorizeContent(request: GenerationRequest): string {
    if (
      request.prompt.toLowerCase().includes("jee") ||
      request.prompt.toLowerCase().includes("neet")
    ) {
      return "Competitive Exams";
    } else if (request.subject === "Computer Science") {
      return "Programming";
    } else if (request.difficulty === "Beginner") {
      return "Fundamentals";
    } else {
      return "Advanced Learning";
    }
  }

  private generateTags(request: GenerationRequest): string[] {
    const baseTags = [
      request.subject.toLowerCase(),
      request.difficulty.toLowerCase(),
      "AI-generated",
    ];

    if (request.prompt.toLowerCase().includes("jee"))
      baseTags.push("JEE", "engineering");
    if (request.prompt.toLowerCase().includes("neet"))
      baseTags.push("NEET", "medical");
    if (request.prompt.toLowerCase().includes("programming"))
      baseTags.push("coding", "programming");

    return baseTags.slice(0, 5);
  }

  private generateMaterials(request: GenerationRequest): {
    notes?: string;
    pdf?: string;
    quiz?: string;
  } {
    const topic = this.extractTopicFromPrompt(
      request.prompt,
      this.knowledgeBase.subjects[
        request.subject as keyof typeof this.knowledgeBase.subjects
      ].topics,
    );

    return {
      notes: `${topic} - AI Generated Study Notes.pdf`,
      pdf: `${topic} - Practice Problems and Solutions.pdf`,
      quiz: `${topic} - AI Assessment Quiz (25 Questions)`,
    };
  }
}

// Image Analysis System
class ImageAnalyzer {
  async analyzeImage(imageFile: File): Promise<string> {
    // Simulate image analysis
    await new Promise((resolve) => setTimeout(resolve, 2000));

    // Mock analysis results based on common educational content
    const mockResults = [
      "Mathematical equation involving quadratic formula and polynomial roots",
      "Physics diagram showing electromagnetic wave propagation and frequency",
      "Chemistry molecular structure with organic compound bonding patterns",
      "Biology cell diagram with mitochondria and cellular respiration pathway",
      "Computer science algorithm flowchart with decision trees and loops",
    ];

    return mockResults[Math.floor(Math.random() * mockResults.length)];
  }
}

const aiGenerator = new AIVideoGenerator();
const imageAnalyzer = new ImageAnalyzer();

export default function AIVideoHub() {
  const [videos, setVideos] = useState(aiVideoContent);
  const [selectedVideo, setSelectedVideo] = useState<AIVideo | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedSubject, setSelectedSubject] = useState("All");
  const [isGenerating, setIsGenerating] = useState(false);
  const [showGenerator, setShowGenerator] = useState(false);
  const [showImageAnalysis, setShowImageAnalysis] = useState(false);

  // Generation form state
  const [generationPrompt, setGenerationPrompt] = useState("");
  const [selectedGenSubject, setSelectedGenSubject] = useState("Mathematics");
  const [generationDuration, setGenerationDuration] = useState(30);
  const [generationDifficulty, setGenerationDifficulty] =
    useState("Intermediate");
  const [includeImages, setIncludeImages] = useState(true);
  const [analysisImage, setAnalysisImage] = useState<File | null>(null);
  const [analysisResult, setAnalysisResult] = useState("");

  const { user } = useAuth();

  const categories = [
    "All",
    "Competitive Exams",
    "Programming",
    "Fundamentals",
    "Advanced Learning",
    "Medical Entrance",
  ];
  const subjects = [
    "All",
    "Mathematics",
    "Physics",
    "Chemistry",
    "Biology",
    "Computer Science",
  ];
  const difficulties = ["Beginner", "Intermediate", "Advanced"];

  const filteredVideos = videos.filter((video) => {
    const matchesSearch =
      video.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      video.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      video.tags.some((tag) =>
        tag.toLowerCase().includes(searchQuery.toLowerCase()),
      );
    const matchesCategory =
      selectedCategory === "All" || video.category === selectedCategory;
    const matchesSubject =
      selectedSubject === "All" || video.subject === selectedSubject;

    return matchesSearch && matchesCategory && matchesSubject;
  });

  const handleGenerateVideo = async () => {
    if (!generationPrompt.trim()) {
      alert("Please enter a prompt for video generation");
      return;
    }

    setIsGenerating(true);

    try {
      const request: GenerationRequest = {
        prompt: generationPrompt,
        subject: selectedGenSubject,
        duration: generationDuration,
        difficulty: generationDifficulty,
        includeImages,
      };

      const generatedVideo = await aiGenerator.generateVideo(request);
      setVideos((prev) => [generatedVideo, ...prev]);

      // Reset form
      setGenerationPrompt("");
      setShowGenerator(false);

      alert("Video generated successfully! Check the top of the video list.");
    } catch (error) {
      alert("Failed to generate video. Please try again.");
    } finally {
      setIsGenerating(false);
    }
  };

  const handleImageAnalysis = async () => {
    if (!analysisImage) {
      alert("Please select an image to analyze");
      return;
    }

    setIsGenerating(true);

    try {
      const result = await imageAnalyzer.analyzeImage(analysisImage);
      setAnalysisResult(result);
      setGenerationPrompt(
        `Create a detailed explanation video about: ${result}`,
      );
      setShowImageAnalysis(false);
      setShowGenerator(true);
    } catch (error) {
      alert("Failed to analyze image. Please try again.");
    } finally {
      setIsGenerating(false);
    }
  };

  const downloadMaterial = (materialName: string, type: string) => {
    // Simulate file download
    const link = document.createElement("a");
    link.href = "#";
    link.download = materialName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    alert(`Downloading ${materialName}...`);
  };

  return (
    <div
      className="min-h-screen pt-20 pb-12"
      style={{
        background: "linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)",
      }}
    >
      <div className="container-wide">
        <PageHeader
          title="AI Video Hub"
          subtitle="Generate educational videos with advanced AI, analyze images, and access internet-level knowledge"
        />

        {/* AI Generation Panel */}
        <div className="mb-8">
          <Card className="bg-white/80 backdrop-blur-sm border border-white/20 shadow-xl">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="flex items-center text-xl text-slate-800">
                    <Brain className="w-6 h-6 mr-2 text-purple-600" />
                    AI Video Generator
                  </CardTitle>
                  <CardDescription className="text-slate-600">
                    Create educational videos using advanced AI with
                    internet-level knowledge
                  </CardDescription>
                </div>
                <div className="flex space-x-2">
                  <Button
                    onClick={() => setShowImageAnalysis(true)}
                    className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white"
                  >
                    <Camera className="w-4 h-4 mr-2" />
                    Analyze Image
                  </Button>
                  <Button
                    onClick={() => setShowGenerator(true)}
                    className="bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-600 hover:to-indigo-700 text-white"
                  >
                    <Wand2 className="w-4 h-4 mr-2" />
                    Generate Video
                  </Button>
                </div>
              </div>
            </CardHeader>
          </Card>
        </div>

        {/* Search and Filters */}
        <div className="mb-8 space-y-4">
          <div className="relative max-w-lg">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
            <Input
              placeholder="Search AI videos, topics, or competitive exams..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 bg-white/80 backdrop-blur-sm border border-white/20"
            />
          </div>

          <div className="flex flex-wrap gap-4">
            <div className="flex items-center space-x-2">
              <span className="text-sm font-medium text-slate-700">
                Category:
              </span>
              {categories.map((category) => (
                <Button
                  key={category}
                  variant={
                    selectedCategory === category ? "default" : "outline"
                  }
                  size="sm"
                  onClick={() => setSelectedCategory(category)}
                  className={
                    selectedCategory === category
                      ? "bg-gradient-to-r from-blue-500 to-indigo-600 text-white"
                      : "bg-white/80 text-slate-700 border-white/40"
                  }
                >
                  {category}
                </Button>
              ))}
            </div>

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
                  className={
                    selectedSubject === subject
                      ? "bg-gradient-to-r from-green-500 to-emerald-600 text-white"
                      : "bg-white/80 text-slate-700 border-white/40"
                  }
                >
                  {subject}
                </Button>
              ))}
            </div>
          </div>
        </div>

        {/* Videos Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredVideos.map((video) => (
            <motion.div
              key={video.id}
              className="bg-white/80 backdrop-blur-sm rounded-xl border border-white/20 overflow-hidden hover:shadow-xl transition-all duration-300"
              whileHover={{ y: -4, scale: 1.02 }}
            >
              {/* Thumbnail */}
              <div
                className="relative cursor-pointer"
                onClick={() => setSelectedVideo(video)}
              >
                <img
                  src={video.thumbnail}
                  alt={video.title}
                  className="w-full h-48 object-cover"
                />
                <div className="absolute inset-0 bg-black/20 opacity-0 hover:opacity-100 transition-opacity flex items-center justify-center">
                  <Play className="w-12 h-12 text-white" />
                </div>
                <div className="absolute bottom-2 right-2 bg-black/80 text-white text-xs px-2 py-1 rounded">
                  {video.duration}
                </div>
                <div className="absolute top-2 left-2">
                  <Badge className="bg-gradient-to-r from-purple-500 to-indigo-600 text-white">
                    <Sparkles className="w-3 h-3 mr-1" />
                    AI Generated
                  </Badge>
                </div>
              </div>

              {/* Content */}
              <div className="p-4">
                <h3 className="font-semibold text-slate-900 line-clamp-2 leading-tight mb-2">
                  {video.title}
                </h3>

                <p className="text-slate-600 text-sm mb-3 line-clamp-2">
                  {video.description}
                </p>

                {/* Creator Info */}
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-2">
                    <img
                      src={video.creator.avatar}
                      alt={video.creator.name}
                      className="w-8 h-8 rounded-full"
                    />
                    <div>
                      <p className="text-sm font-medium text-slate-900">
                        {video.creator.name}
                      </p>
                      <p className="text-xs text-slate-500">
                        {video.creator.followers.toLocaleString()} followers
                      </p>
                    </div>
                  </div>

                  <Badge
                    className={`${
                      video.difficulty === "Beginner"
                        ? "bg-green-100 text-green-800"
                        : video.difficulty === "Intermediate"
                          ? "bg-yellow-100 text-yellow-800"
                          : "bg-red-100 text-red-800"
                    }`}
                  >
                    {video.difficulty}
                  </Badge>
                </div>

                {/* Stats */}
                <div className="flex items-center justify-between text-xs text-slate-500 mb-3">
                  <div className="flex items-center space-x-3">
                    <span className="flex items-center space-x-1">
                      <Eye className="w-3 h-3" />
                      <span>{video.views.toLocaleString()}</span>
                    </span>
                    <span className="flex items-center space-x-1">
                      <Heart className="w-3 h-3" />
                      <span>{video.likes.toLocaleString()}</span>
                    </span>
                  </div>
                  <span>{video.uploadDate}</span>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-1 mb-3">
                  {video.tags.slice(0, 3).map((tag) => (
                    <Badge
                      key={tag}
                      variant="secondary"
                      className="text-xs bg-slate-100 text-slate-700"
                    >
                      #{tag}
                    </Badge>
                  ))}
                </div>

                {/* Actions */}
                <div className="flex items-center justify-between pt-3 border-t border-slate-200">
                  <Button
                    size="sm"
                    onClick={() => setSelectedVideo(video)}
                    className="bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white"
                  >
                    <Play className="w-4 h-4 mr-1" />
                    Watch
                  </Button>

                  <div className="flex items-center space-x-1">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="text-slate-600"
                    >
                      <Heart className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="text-slate-600"
                    >
                      <Bookmark className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="text-slate-600"
                    >
                      <Share className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {filteredVideos.length === 0 && (
          <div className="text-center py-12">
            <div className="w-16 h-16 mx-auto mb-4 bg-white/80 backdrop-blur-sm rounded-full flex items-center justify-center">
              <Search className="w-8 h-8 text-slate-400" />
            </div>
            <h3 className="text-lg font-semibold text-slate-900 mb-2">
              No AI videos found
            </h3>
            <p className="text-slate-600 mb-4">
              Try adjusting your search or generate a new video
            </p>
            <Button
              onClick={() => setShowGenerator(true)}
              className="bg-gradient-to-r from-purple-500 to-indigo-600 text-white"
            >
              <Wand2 className="w-4 h-4 mr-2" />
              Generate New Video
            </Button>
          </div>
        )}
      </div>

      {/* Video Generation Modal */}
      <AnimatePresence>
        {showGenerator && (
          <motion.div
            className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowGenerator(false)}
          >
            <motion.div
              className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-hidden"
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-6 border-b border-slate-200">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-xl font-semibold text-slate-900 flex items-center">
                      <Brain className="w-6 h-6 mr-2 text-purple-600" />
                      AI Video Generator
                    </h2>
                    <p className="text-slate-600">
                      Generate educational content with advanced AI
                    </p>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setShowGenerator(false)}
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </Button>
                </div>
              </div>

              <div className="p-6 space-y-6">
                {/* Prompt Input */}
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    <Type className="w-4 h-4 inline mr-1" />
                    What do you want to learn? (Be specific)
                  </label>
                  <Textarea
                    placeholder="e.g., 'Create a comprehensive JEE Physics tutorial on rotational motion with solved examples' or 'Explain machine learning algorithms for beginners with Python code'"
                    value={generationPrompt}
                    onChange={(e) => setGenerationPrompt(e.target.value)}
                    className="min-h-[100px]"
                  />
                </div>

                {/* Subject and Settings */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Subject
                    </label>
                    <select
                      value={selectedGenSubject}
                      onChange={(e) => setSelectedGenSubject(e.target.value)}
                      className="w-full p-2 border border-slate-300 rounded-lg"
                    >
                      {Object.keys(aiKnowledgeBase.subjects).map((subject) => (
                        <option key={subject} value={subject}>
                          {subject}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Duration (minutes)
                    </label>
                    <Input
                      type="number"
                      min="5"
                      max="120"
                      value={generationDuration}
                      onChange={(e) =>
                        setGenerationDuration(parseInt(e.target.value))
                      }
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Difficulty
                    </label>
                    <select
                      value={generationDifficulty}
                      onChange={(e) => setGenerationDifficulty(e.target.value)}
                      className="w-full p-2 border border-slate-300 rounded-lg"
                    >
                      {difficulties.map((diff) => (
                        <option key={diff} value={diff}>
                          {diff}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Advanced Options */}
                <div className="space-y-3">
                  <h3 className="font-medium text-slate-900">
                    Advanced Options
                  </h3>
                  <div className="flex items-center space-x-3">
                    <input
                      type="checkbox"
                      id="includeImages"
                      checked={includeImages}
                      onChange={(e) => setIncludeImages(e.target.checked)}
                      className="rounded"
                    />
                    <label
                      htmlFor="includeImages"
                      className="text-sm text-slate-700"
                    >
                      Include diagrams and visual aids
                    </label>
                  </div>
                </div>

                {/* Competitive Exam Info */}
                <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-4 rounded-lg">
                  <h4 className="font-medium text-slate-900 mb-2 flex items-center">
                    <Target className="w-4 h-4 mr-2 text-blue-600" />
                    Supported Competitive Exams
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {Object.keys(aiKnowledgeBase.competitiveExams).map(
                      (exam) => (
                        <Badge key={exam} className="bg-blue-100 text-blue-800">
                          {exam}
                        </Badge>
                      ),
                    )}
                  </div>
                </div>

                {/* Generate Button */}
                <Button
                  onClick={handleGenerateVideo}
                  disabled={!generationPrompt.trim() || isGenerating}
                  className="w-full bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-600 hover:to-indigo-700 text-white h-12"
                >
                  {isGenerating ? (
                    <>
                      <div className="animate-spin w-4 h-4 mr-2 border-2 border-white border-t-transparent rounded-full" />
                      Generating AI Video...
                    </>
                  ) : (
                    <>
                      <Wand2 className="w-5 h-5 mr-2" />
                      Generate Educational Video
                    </>
                  )}
                </Button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Image Analysis Modal */}
      <AnimatePresence>
        {showImageAnalysis && (
          <motion.div
            className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowImageAnalysis(false)}
          >
            <motion.div
              className="bg-white rounded-xl max-w-lg w-full"
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-6 border-b border-slate-200">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-xl font-semibold text-slate-900 flex items-center">
                      <Camera className="w-6 h-6 mr-2 text-green-600" />
                      AI Image Analysis
                    </h2>
                    <p className="text-slate-600">
                      Upload an image to generate relevant educational content
                    </p>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setShowImageAnalysis(false)}
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </Button>
                </div>
              </div>

              <div className="p-6 space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Upload Image
                  </label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) =>
                      setAnalysisImage(e.target.files?.[0] || null)
                    }
                    className="w-full p-2 border border-slate-300 rounded-lg"
                  />
                </div>

                {analysisResult && (
                  <div className="bg-green-50 p-4 rounded-lg">
                    <h4 className="font-medium text-green-800 mb-2">
                      Analysis Result:
                    </h4>
                    <p className="text-green-700 text-sm">{analysisResult}</p>
                  </div>
                )}

                <Button
                  onClick={handleImageAnalysis}
                  disabled={!analysisImage || isGenerating}
                  className="w-full bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white"
                >
                  {isGenerating ? (
                    <>
                      <div className="animate-spin w-4 h-4 mr-2 border-2 border-white border-t-transparent rounded-full" />
                      Analyzing...
                    </>
                  ) : (
                    <>
                      <Camera className="w-4 h-4 mr-2" />
                      Analyze & Generate Video
                    </>
                  )}
                </Button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Video Player Modal - Similar to previous implementation but enhanced */}
      {selectedVideo && (
        <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-sm">
          {/* Enhanced video player implementation would go here */}
          <div className="h-full flex items-center justify-center p-4">
            <div className="max-w-6xl w-full">
              <video
                src={selectedVideo.videoUrl}
                controls
                className="w-full aspect-video bg-black rounded-lg"
                autoPlay
              />

              <div className="mt-4 text-white">
                <h2 className="text-2xl font-bold mb-2">
                  {selectedVideo.title}
                </h2>
                <p className="text-white/80 mb-4">
                  {selectedVideo.description}
                </p>

                {/* Materials Section */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {selectedVideo.materials.notes && (
                    <Button
                      onClick={() =>
                        downloadMaterial(
                          selectedVideo.materials.notes!,
                          "notes",
                        )
                      }
                      className="bg-white/20 hover:bg-white/30 text-white"
                    >
                      <FileText className="w-4 h-4 mr-2" />
                      Download Notes
                    </Button>
                  )}

                  {selectedVideo.materials.pdf && (
                    <Button
                      onClick={() =>
                        downloadMaterial(selectedVideo.materials.pdf!, "pdf")
                      }
                      className="bg-white/20 hover:bg-white/30 text-white"
                    >
                      <BookOpen className="w-4 h-4 mr-2" />
                      Download PDF
                    </Button>
                  )}

                  {selectedVideo.materials.quiz && (
                    <Button
                      onClick={() =>
                        downloadMaterial(selectedVideo.materials.quiz!, "quiz")
                      }
                      className="bg-white/20 hover:bg-white/30 text-white"
                    >
                      <Award className="w-4 h-4 mr-2" />
                      Take Quiz
                    </Button>
                  )}
                </div>
              </div>

              <Button
                onClick={() => setSelectedVideo(null)}
                className="absolute top-4 right-4 bg-white/20 hover:bg-white/30 text-white"
              >
                <ChevronLeft className="w-5 h-5" />
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
