import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate, useSearchParams } from "react-router-dom";
import {
  Search,
  Filter,
  Star,
  Clock,
  Users,
  Play,
  BookOpen,
  Award,
  TrendingUp,
  Calendar,
  Check,
  ChevronRight,
  Heart,
  Share,
  Download,
  Eye,
  MessageCircle,
  Bookmark,
  Shield,
  Zap,
  Crown,
  Globe,
  Video,
  FileText,
  Headphones,
  Smartphone,
  Monitor,
  Tablet,
  Target,
  BarChart,
  CheckCircle,
  Lock,
  PlayCircle,
  GraduationCap,
  Trophy,
  Brain,
  Lightbulb,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import { useAuth } from "@/contexts/AuthContext";

interface Course {
  id: string;
  title: string;
  description: string;
  instructor: {
    id: string;
    name: string;
    avatar: string;
    bio: string;
    rating: number;
    students: number;
    isVerified: boolean;
  };
  thumbnail: string;
  category: string;
  subject: string;
  difficulty: "Beginner" | "Intermediate" | "Advanced";
  duration: number; // in hours
  lessons: number;
  rating: number;
  reviews: number;
  students: number;
  price: {
    current: number;
    original?: number;
    currency: string;
  };
  features: string[];
  tags: string[];
  lastUpdated: string;
  language: string;
  hasSubtitles: boolean;
  hasCertificate: boolean;
  isNew: boolean;
  isBestseller: boolean;
  isEnrolled?: boolean;
  progress?: number;
  preview?: {
    videoUrl: string;
    duration: number;
  };
  chapters: Chapter[];
  requirements: string[];
  whatYouWillLearn: string[];
  targetAudience: string[];
}

interface Chapter {
  id: string;
  title: string;
  lessons: Lesson[];
  duration: number;
  isCompleted?: boolean;
}

interface Lesson {
  id: string;
  title: string;
  type: "video" | "text" | "quiz" | "assignment";
  duration: number;
  isCompleted?: boolean;
  isFree?: boolean;
}

// Comprehensive courses database
const courses: Course[] = [
  {
    id: "course_1",
    title: "Complete JEE Mathematics Masterclass",
    description:
      "Master JEE Mathematics with comprehensive coverage of all topics including calculus, algebra, trigonometry, and coordinate geometry. Perfect for JEE Main and Advanced preparation.",
    instructor: {
      id: "instructor_1",
      name: "Prof. Rajesh Kumar",
      avatar:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400",
      bio: "IIT Delhi Professor with 15+ years of JEE coaching experience",
      rating: 4.8,
      students: 25000,
      isVerified: true,
    },
    thumbnail:
      "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=800",
    category: "Competitive Exams",
    subject: "Mathematics",
    difficulty: "Advanced",
    duration: 120,
    lessons: 180,
    rating: 4.9,
    reviews: 3200,
    students: 15000,
    price: {
      current: 2999,
      original: 4999,
      currency: "₹",
    },
    features: [
      "120+ hours of video content",
      "1000+ practice problems",
      "Previous year questions",
      "Mock tests",
      "Doubt solving sessions",
      "Mobile app access",
      "Lifetime access",
      "Certificate of completion",
    ],
    tags: ["JEE", "Mathematics", "Calculus", "Algebra", "Coordinate Geometry"],
    lastUpdated: "2024-01-15",
    language: "Hindi & English",
    hasSubtitles: true,
    hasCertificate: true,
    isNew: false,
    isBestseller: true,
    chapters: [
      {
        id: "chapter_1",
        title: "Functions and Inverse Trigonometric Functions",
        duration: 15,
        lessons: [
          {
            id: "lesson_1",
            title: "Introduction to Functions",
            type: "video",
            duration: 45,
            isFree: true,
          },
          {
            id: "lesson_2",
            title: "Types of Functions",
            type: "video",
            duration: 60,
          },
          {
            id: "lesson_3",
            title: "Inverse Functions",
            type: "video",
            duration: 55,
          },
          {
            id: "lesson_4",
            title: "Practice Problems",
            type: "quiz",
            duration: 30,
          },
        ],
      },
    ],
    requirements: [
      "Class 12 Mathematics knowledge",
      "Basic understanding of algebra and trigonometry",
      "Calculator for problem solving",
    ],
    whatYouWillLearn: [
      "Master all JEE Mathematics topics",
      "Solve complex problems efficiently",
      "Time management strategies",
      "Previous year question analysis",
      "Mock test strategies",
    ],
    targetAudience: [
      "JEE Main aspirants",
      "JEE Advanced candidates",
      "Class 11-12 students",
      "Engineering entrance exam students",
    ],
  },
  {
    id: "course_2",
    title: "NEET Biology Complete Course",
    description:
      "Comprehensive NEET Biology preparation covering Botany, Zoology, and Human Physiology with detailed explanations, diagrams, and practice questions.",
    instructor: {
      id: "instructor_2",
      name: "Dr. Priya Sharma",
      avatar:
        "https://images.unsplash.com/photo-1494790108755-2616b612b632?w=400",
      bio: "AIIMS graduate and NEET expert with 12+ years of teaching experience",
      rating: 4.9,
      students: 30000,
      isVerified: true,
    },
    thumbnail:
      "https://images.unsplash.com/photo-1532012197267-da84d127e765?w=800",
    category: "Competitive Exams",
    subject: "Biology",
    difficulty: "Intermediate",
    duration: 100,
    lessons: 150,
    rating: 4.8,
    reviews: 2800,
    students: 12000,
    price: {
      current: 2499,
      original: 3999,
      currency: "₹",
    },
    features: [
      "100+ hours of detailed lectures",
      "3D animations and diagrams",
      "NCERT coverage",
      "Previous year analysis",
      "Weekly tests",
      "Biology lab simulations",
    ],
    tags: ["NEET", "Biology", "Botany", "Zoology", "Human Physiology"],
    lastUpdated: "2024-01-10",
    language: "Hindi & English",
    hasSubtitles: true,
    hasCertificate: true,
    isNew: true,
    isBestseller: false,
    chapters: [],
    requirements: ["Class 12 Biology basics", "NCERT Biology textbooks"],
    whatYouWillLearn: [
      "Complete NEET Biology syllabus",
      "Diagram-based problem solving",
      "Memory techniques for biology",
      "Time management for biology section",
    ],
    targetAudience: [
      "NEET aspirants",
      "Medical entrance candidates",
      "Biology enthusiasts",
    ],
  },
  {
    id: "course_3",
    title: "Complete Web Development Bootcamp",
    description:
      "Learn full-stack web development from scratch. Master HTML, CSS, JavaScript, React, Node.js, and database management in this comprehensive course.",
    instructor: {
      id: "instructor_3",
      name: "Alex Johnson",
      avatar:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400",
      bio: "Senior Software Engineer at Google with 8+ years of experience",
      rating: 4.7,
      students: 45000,
      isVerified: true,
    },
    thumbnail:
      "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=800",
    category: "Technology",
    subject: "Web Development",
    difficulty: "Beginner",
    duration: 80,
    lessons: 120,
    rating: 4.8,
    reviews: 5200,
    students: 28000,
    price: {
      current: 1999,
      original: 2999,
      currency: "₹",
    },
    features: [
      "80+ hours of coding",
      "15+ real projects",
      "Industry best practices",
      "Career guidance",
      "Code reviews",
      "Portfolio development",
    ],
    tags: ["Web Development", "JavaScript", "React", "Node.js", "Full Stack"],
    lastUpdated: "2024-01-20",
    language: "English",
    hasSubtitles: true,
    hasCertificate: true,
    isNew: true,
    isBestseller: true,
    chapters: [],
    requirements: [
      "Basic computer knowledge",
      "No programming experience needed",
    ],
    whatYouWillLearn: [
      "Build responsive websites",
      "Master modern JavaScript",
      "Create full-stack applications",
      "Deploy to production",
    ],
    targetAudience: [
      "Beginners",
      "Career changers",
      "Students",
      "Entrepreneurs",
    ],
  },
  {
    id: "course_4",
    title: "Machine Learning A-Z",
    description:
      "Master Machine Learning algorithms, data science, and AI. Learn Python, TensorFlow, and implement real-world ML projects.",
    instructor: {
      id: "instructor_4",
      name: "Dr. Sarah Chen",
      avatar:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400",
      bio: "AI Research Scientist at Stanford, PhD in Machine Learning",
      rating: 4.9,
      students: 35000,
      isVerified: true,
    },
    thumbnail:
      "https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=800",
    category: "Technology",
    subject: "Machine Learning",
    difficulty: "Advanced",
    duration: 95,
    lessons: 140,
    rating: 4.9,
    reviews: 4100,
    students: 22000,
    price: {
      current: 3499,
      original: 4999,
      currency: "₹",
    },
    features: [
      "95+ hours of content",
      "20+ ML algorithms",
      "Real datasets",
      "Python programming",
      "TensorFlow projects",
      "Industry case studies",
    ],
    tags: ["Machine Learning", "AI", "Python", "TensorFlow", "Data Science"],
    lastUpdated: "2024-01-12",
    language: "English",
    hasSubtitles: true,
    hasCertificate: true,
    isNew: false,
    isBestseller: true,
    chapters: [],
    requirements: [
      "Basic Python knowledge",
      "High school mathematics",
      "Statistics basics",
    ],
    whatYouWillLearn: [
      "Master ML algorithms",
      "Build AI applications",
      "Work with real data",
      "Deploy ML models",
    ],
    targetAudience: [
      "Data scientists",
      "Software engineers",
      "Researchers",
      "Students",
    ],
  },
];

export default function Courses() {
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  const [filteredCourses, setFilteredCourses] = useState(courses);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedDifficulty, setSelectedDifficulty] = useState("all");
  const [selectedPrice, setSelectedPrice] = useState("all");
  const [sortBy, setSortBy] = useState("popular");
  const [showFilters, setShowFilters] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [showCourseDetails, setShowCourseDetails] = useState(false);

  // Get categories from courses
  const categories = Array.from(
    new Set(courses.map((course) => course.category)),
  );

  // Filter and search logic
  useEffect(() => {
    let filtered = courses;

    // Search filter
    if (searchQuery) {
      filtered = filtered.filter(
        (course) =>
          course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          course.description
            .toLowerCase()
            .includes(searchQuery.toLowerCase()) ||
          course.tags.some((tag) =>
            tag.toLowerCase().includes(searchQuery.toLowerCase()),
          ) ||
          course.instructor.name
            .toLowerCase()
            .includes(searchQuery.toLowerCase()),
      );
    }

    // Category filter
    if (selectedCategory !== "all") {
      filtered = filtered.filter(
        (course) => course.category === selectedCategory,
      );
    }

    // Difficulty filter
    if (selectedDifficulty !== "all") {
      filtered = filtered.filter(
        (course) => course.difficulty === selectedDifficulty,
      );
    }

    // Price filter
    if (selectedPrice !== "all") {
      if (selectedPrice === "free") {
        filtered = filtered.filter((course) => course.price.current === 0);
      } else if (selectedPrice === "paid") {
        filtered = filtered.filter((course) => course.price.current > 0);
      } else if (selectedPrice === "under-2000") {
        filtered = filtered.filter((course) => course.price.current < 2000);
      } else if (selectedPrice === "2000-4000") {
        filtered = filtered.filter(
          (course) =>
            course.price.current >= 2000 && course.price.current <= 4000,
        );
      }
    }

    // Sort logic
    if (sortBy === "popular") {
      filtered.sort((a, b) => b.students - a.students);
    } else if (sortBy === "rating") {
      filtered.sort((a, b) => b.rating - a.rating);
    } else if (sortBy === "newest") {
      filtered.sort(
        (a, b) =>
          new Date(b.lastUpdated).getTime() - new Date(a.lastUpdated).getTime(),
      );
    } else if (sortBy === "price-low") {
      filtered.sort((a, b) => a.price.current - b.price.current);
    } else if (sortBy === "price-high") {
      filtered.sort((a, b) => b.price.current - a.price.current);
    }

    setFilteredCourses(filtered);
  }, [
    searchQuery,
    selectedCategory,
    selectedDifficulty,
    selectedPrice,
    sortBy,
  ]);

  // Handle course enrollment
  const handleEnrollCourse = (course: Course) => {
    if (!isAuthenticated) {
      // Redirect to login with return URL
      navigate("/login", { state: { returnUrl: `/courses/${course.id}` } });
      return;
    }

    if (course.price.current === 0) {
      // Free course - direct enrollment
      navigate(`/course/${course.id}/learn`);
    } else {
      // Paid course - show payment options
      navigate("/pricing", { state: { selectedCourse: course } });
    }
  };

  // Handle demo access
  const handleDemoAccess = (course: Course) => {
    // Show demo lessons without enrollment
    setSelectedCourse(course);
    setShowCourseDetails(true);
  };

  // Handle course preview
  const handleCoursePreview = (course: Course) => {
    setSelectedCourse(course);
    setShowCourseDetails(true);
  };

  const formatDuration = (hours: number) => {
    if (hours < 1) {
      return `${Math.round(hours * 60)} mins`;
    }
    return `${hours}h`;
  };

  const formatPrice = (price: {
    current: number;
    original?: number;
    currency: string;
  }) => {
    if (price.current === 0) return "Free";
    return `${price.currency}${price.current.toLocaleString()}`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Explore Courses
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Master new skills with our comprehensive courses taught by industry
            experts. From competitive exams to cutting-edge technology.
          </p>
        </motion.div>

        {/* Search and Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-2xl shadow-lg p-6 mb-8"
        >
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Search */}
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <Input
                  type="text"
                  placeholder="Search courses, instructors, or topics..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 h-12"
                />
              </div>
            </div>

            {/* Filters */}
            <div className="flex flex-wrap gap-3">
              <Select
                value={selectedCategory}
                onValueChange={setSelectedCategory}
              >
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  {categories.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select
                value={selectedDifficulty}
                onValueChange={setSelectedDifficulty}
              >
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Difficulty" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Levels</SelectItem>
                  <SelectItem value="Beginner">Beginner</SelectItem>
                  <SelectItem value="Intermediate">Intermediate</SelectItem>
                  <SelectItem value="Advanced">Advanced</SelectItem>
                </SelectContent>
              </Select>

              <Select value={selectedPrice} onValueChange={setSelectedPrice}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Price" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Prices</SelectItem>
                  <SelectItem value="free">Free</SelectItem>
                  <SelectItem value="under-2000">Under ₹2,000</SelectItem>
                  <SelectItem value="2000-4000">₹2,000 - ₹4,000</SelectItem>
                  <SelectItem value="paid">Paid</SelectItem>
                </SelectContent>
              </Select>

              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="popular">Most Popular</SelectItem>
                  <SelectItem value="rating">Highest Rated</SelectItem>
                  <SelectItem value="newest">Newest</SelectItem>
                  <SelectItem value="price-low">Price: Low to High</SelectItem>
                  <SelectItem value="price-high">Price: High to Low</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Results count */}
          <div className="mt-4 text-sm text-gray-600">
            Showing {filteredCourses.length} of {courses.length} courses
          </div>
        </motion.div>

        {/* Courses Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredCourses.map((course, index) => (
            <motion.div
              key={course.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="group"
            >
              <Card className="h-full hover:shadow-xl transition-all duration-300 overflow-hidden">
                {/* Course Image */}
                <div className="relative aspect-video overflow-hidden">
                  <img
                    src={course.thumbnail}
                    alt={course.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />

                  {/* Overlay badges */}
                  <div className="absolute top-3 left-3 flex flex-wrap gap-2">
                    {course.isNew && (
                      <Badge className="bg-green-500 text-white">New</Badge>
                    )}
                    {course.isBestseller && (
                      <Badge className="bg-orange-500 text-white">
                        Bestseller
                      </Badge>
                    )}
                    {course.price.current === 0 && (
                      <Badge className="bg-blue-500 text-white">Free</Badge>
                    )}
                  </div>

                  {/* Play button overlay */}
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleCoursePreview(course)}
                      className="w-16 h-16 rounded-full bg-white/20 hover:bg-white/30 text-white"
                    >
                      <Play className="w-8 h-8" />
                    </Button>
                  </div>

                  {/* Duration */}
                  <div className="absolute bottom-3 right-3 bg-black/70 text-white text-xs px-2 py-1 rounded">
                    {formatDuration(course.duration)}
                  </div>
                </div>

                <CardContent className="p-6">
                  {/* Course Info */}
                  <div className="mb-4">
                    <div className="flex items-center justify-between mb-2">
                      <Badge variant="outline">{course.category}</Badge>
                      <Badge
                        variant="outline"
                        className={
                          course.difficulty === "Beginner"
                            ? "border-green-500 text-green-700"
                            : course.difficulty === "Intermediate"
                              ? "border-blue-500 text-blue-700"
                              : "border-red-500 text-red-700"
                        }
                      >
                        {course.difficulty}
                      </Badge>
                    </div>

                    <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors">
                      {course.title}
                    </h3>

                    <p className="text-gray-600 text-sm line-clamp-2 mb-3">
                      {course.description}
                    </p>

                    {/* Instructor */}
                    <div className="flex items-center space-x-2 mb-3">
                      <Avatar className="w-6 h-6">
                        <AvatarImage
                          src={course.instructor.avatar}
                          alt={course.instructor.name}
                        />
                        <AvatarFallback>
                          {course.instructor.name[0]}
                        </AvatarFallback>
                      </Avatar>
                      <span className="text-sm text-gray-700">
                        {course.instructor.name}
                      </span>
                      {course.instructor.isVerified && (
                        <CheckCircle className="w-4 h-4 text-blue-500" />
                      )}
                    </div>

                    {/* Stats */}
                    <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                      <div className="flex items-center space-x-4">
                        <div className="flex items-center space-x-1">
                          <Star className="w-4 h-4 fill-blue-400 text-blue-400" />
                          <span className="font-medium">{course.rating}</span>
                          <span>({course.reviews})</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Users className="w-4 h-4" />
                          <span>{course.students.toLocaleString()}</span>
                        </div>
                      </div>
                    </div>

                    {/* Features */}
                    <div className="flex items-center space-x-4 text-xs text-gray-500 mb-4">
                      <div className="flex items-center space-x-1">
                        <Clock className="w-3 h-3" />
                        <span>{course.lessons} lessons</span>
                      </div>
                      {course.hasCertificate && (
                        <div className="flex items-center space-x-1">
                          <Award className="w-3 h-3" />
                          <span>Certificate</span>
                        </div>
                      )}
                      {course.hasSubtitles && (
                        <div className="flex items-center space-x-1">
                          <Headphones className="w-3 h-3" />
                          <span>Subtitles</span>
                        </div>
                      )}
                    </div>

                    {/* Price and Action */}
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="flex items-center space-x-2">
                          <span className="text-2xl font-bold text-gray-900">
                            {formatPrice(course.price)}
                          </span>
                          {course.price.original &&
                            course.price.original > course.price.current && (
                              <span className="text-sm text-gray-500 line-through">
                                {course.price.currency}
                                {course.price.original.toLocaleString()}
                              </span>
                            )}
                        </div>
                        {course.price.original &&
                          course.price.original > course.price.current && (
                            <div className="text-xs text-green-600 font-medium">
                              {Math.round(
                                ((course.price.original -
                                  course.price.current) /
                                  course.price.original) *
                                  100,
                              )}
                              % off
                            </div>
                          )}
                      </div>

                      <div className="flex flex-col space-y-2">
                        <Button
                          size="sm"
                          onClick={() => handleEnrollCourse(course)}
                          className="bg-blue-600 hover:bg-blue-700"
                        >
                          {course.price.current === 0
                            ? "Enroll Free"
                            : "Enroll Now"}
                        </Button>

                        {course.price.current > 0 && (
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleDemoAccess(course)}
                          >
                            Try Demo
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* No results */}
        {filteredCourses.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-16"
          >
            <BookOpen className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              No courses found
            </h3>
            <p className="text-gray-600 mb-6">
              Try adjusting your filters or search terms
            </p>
            <Button
              onClick={() => {
                setSearchQuery("");
                setSelectedCategory("all");
                setSelectedDifficulty("all");
                setSelectedPrice("all");
              }}
            >
              Clear Filters
            </Button>
          </motion.div>
        )}

        {/* Course Details Modal */}
        <AnimatePresence>
          {showCourseDetails && selectedCourse && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
              onClick={() => setShowCourseDetails(false)}
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="relative">
                  {/* Course header image */}
                  <div className="relative aspect-video">
                    <img
                      src={selectedCourse.thumbnail}
                      alt={selectedCourse.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

                    {/* Close button */}
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => setShowCourseDetails(false)}
                      className="absolute top-4 right-4 text-white hover:bg-white/20"
                    >
                      <X className="w-6 h-6" />
                    </Button>

                    {/* Course info overlay */}
                    <div className="absolute bottom-6 left-6 right-6 text-white">
                      <div className="flex items-center space-x-2 mb-2">
                        {selectedCourse.isNew && (
                          <Badge className="bg-green-500">New</Badge>
                        )}
                        {selectedCourse.isBestseller && (
                          <Badge className="bg-orange-500">Bestseller</Badge>
                        )}
                        <Badge
                          variant="outline"
                          className="border-white text-white"
                        >
                          {selectedCourse.category}
                        </Badge>
                      </div>
                      <h1 className="text-3xl font-bold mb-2">
                        {selectedCourse.title}
                      </h1>
                      <p className="text-lg text-white/90 mb-4">
                        {selectedCourse.description}
                      </p>

                      <div className="flex items-center space-x-6 text-sm">
                        <div className="flex items-center space-x-1">
                          <Star className="w-4 h-4 fill-blue-400 text-blue-400" />
                          <span>{selectedCourse.rating}</span>
                          <span>({selectedCourse.reviews} reviews)</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Users className="w-4 h-4" />
                          <span>
                            {selectedCourse.students.toLocaleString()} students
                          </span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Clock className="w-4 h-4" />
                          <span>{formatDuration(selectedCourse.duration)}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Course content */}
                  <div className="p-8">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                      {/* Main content */}
                      <div className="lg:col-span-2 space-y-8">
                        {/* What you'll learn */}
                        <div>
                          <h2 className="text-2xl font-bold text-gray-900 mb-4">
                            What you'll learn
                          </h2>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                            {selectedCourse.whatYouWillLearn.map(
                              (item, index) => (
                                <div
                                  key={index}
                                  className="flex items-start space-x-2"
                                >
                                  <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                                  <span className="text-gray-700">{item}</span>
                                </div>
                              ),
                            )}
                          </div>
                        </div>

                        {/* Course content preview */}
                        {selectedCourse.chapters.length > 0 && (
                          <div>
                            <h2 className="text-2xl font-bold text-gray-900 mb-4">
                              Course Content
                            </h2>
                            <div className="space-y-4">
                              {selectedCourse.chapters.map((chapter, index) => (
                                <div
                                  key={chapter.id}
                                  className="border rounded-lg p-4"
                                >
                                  <div className="flex items-center justify-between mb-2">
                                    <h3 className="font-semibold text-gray-900">
                                      Chapter {index + 1}: {chapter.title}
                                    </h3>
                                    <span className="text-sm text-gray-500">
                                      {formatDuration(chapter.duration)}
                                    </span>
                                  </div>
                                  <div className="space-y-2">
                                    {chapter.lessons.map((lesson) => (
                                      <div
                                        key={lesson.id}
                                        className="flex items-center justify-between p-2 hover:bg-gray-50 rounded"
                                      >
                                        <div className="flex items-center space-x-2">
                                          {lesson.type === "video" && (
                                            <PlayCircle className="w-4 h-4 text-gray-500" />
                                          )}
                                          {lesson.type === "text" && (
                                            <FileText className="w-4 h-4 text-gray-500" />
                                          )}
                                          {lesson.type === "quiz" && (
                                            <Brain className="w-4 h-4 text-gray-500" />
                                          )}
                                          <span className="text-sm text-gray-700">
                                            {lesson.title}
                                          </span>
                                          {lesson.isFree && (
                                            <Badge
                                              variant="outline"
                                              className="text-xs"
                                            >
                                              Free
                                            </Badge>
                                          )}
                                        </div>
                                        <span className="text-xs text-gray-500">
                                          {lesson.duration}min
                                        </span>
                                      </div>
                                    ))}
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}

                        {/* Requirements */}
                        <div>
                          <h2 className="text-2xl font-bold text-gray-900 mb-4">
                            Requirements
                          </h2>
                          <ul className="space-y-2">
                            {selectedCourse.requirements.map(
                              (requirement, index) => (
                                <li
                                  key={index}
                                  className="flex items-start space-x-2"
                                >
                                  <div className="w-2 h-2 bg-gray-400 rounded-full mt-2 flex-shrink-0" />
                                  <span className="text-gray-700">
                                    {requirement}
                                  </span>
                                </li>
                              ),
                            )}
                          </ul>
                        </div>

                        {/* Target audience */}
                        <div>
                          <h2 className="text-2xl font-bold text-gray-900 mb-4">
                            Who this course is for
                          </h2>
                          <ul className="space-y-2">
                            {selectedCourse.targetAudience.map(
                              (audience, index) => (
                                <li
                                  key={index}
                                  className="flex items-start space-x-2"
                                >
                                  <Target className="w-5 h-5 text-blue-500 mt-0.5 flex-shrink-0" />
                                  <span className="text-gray-700">
                                    {audience}
                                  </span>
                                </li>
                              ),
                            )}
                          </ul>
                        </div>
                      </div>

                      {/* Sidebar */}
                      <div className="space-y-6">
                        {/* Price and enrollment */}
                        <Card>
                          <CardContent className="p-6">
                            <div className="text-center mb-6">
                              <div className="text-3xl font-bold text-gray-900 mb-1">
                                {formatPrice(selectedCourse.price)}
                              </div>
                              {selectedCourse.price.original &&
                                selectedCourse.price.original >
                                  selectedCourse.price.current && (
                                  <div className="text-lg text-gray-500 line-through">
                                    {selectedCourse.price.currency}
                                    {selectedCourse.price.original.toLocaleString()}
                                  </div>
                                )}
                              {selectedCourse.price.original &&
                                selectedCourse.price.original >
                                  selectedCourse.price.current && (
                                  <Badge className="bg-red-500 text-white">
                                    {Math.round(
                                      ((selectedCourse.price.original -
                                        selectedCourse.price.current) /
                                        selectedCourse.price.original) *
                                        100,
                                    )}
                                    % OFF
                                  </Badge>
                                )}
                            </div>

                            <div className="space-y-3">
                              <Button
                                onClick={() =>
                                  handleEnrollCourse(selectedCourse)
                                }
                                className="w-full bg-blue-600 hover:bg-blue-700"
                              >
                                {selectedCourse.price.current === 0
                                  ? "Enroll Free"
                                  : "Enroll Now"}
                              </Button>

                              {selectedCourse.price.current > 0 && (
                                <Button
                                  variant="outline"
                                  onClick={() =>
                                    handleDemoAccess(selectedCourse)
                                  }
                                  className="w-full"
                                >
                                  Try Demo
                                </Button>
                              )}

                              <div className="text-center text-sm text-gray-500">
                                30-day money-back guarantee
                              </div>
                            </div>
                          </CardContent>
                        </Card>

                        {/* Course features */}
                        <Card>
                          <CardContent className="p-6">
                            <h3 className="font-semibold text-gray-900 mb-4">
                              This course includes:
                            </h3>
                            <div className="space-y-3">
                              {selectedCourse.features.map((feature, index) => (
                                <div
                                  key={index}
                                  className="flex items-start space-x-2"
                                >
                                  <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                                  <span className="text-sm text-gray-700">
                                    {feature}
                                  </span>
                                </div>
                              ))}
                            </div>
                          </CardContent>
                        </Card>

                        {/* Instructor */}
                        <Card>
                          <CardContent className="p-6">
                            <h3 className="font-semibold text-gray-900 mb-4">
                              Instructor
                            </h3>
                            <div className="flex items-start space-x-3">
                              <Avatar className="w-12 h-12">
                                <AvatarImage
                                  src={selectedCourse.instructor.avatar}
                                  alt={selectedCourse.instructor.name}
                                />
                                <AvatarFallback>
                                  {selectedCourse.instructor.name[0]}
                                </AvatarFallback>
                              </Avatar>
                              <div className="flex-1">
                                <div className="flex items-center space-x-2 mb-1">
                                  <h4 className="font-medium text-gray-900">
                                    {selectedCourse.instructor.name}
                                  </h4>
                                  {selectedCourse.instructor.isVerified && (
                                    <CheckCircle className="w-4 h-4 text-blue-500" />
                                  )}
                                </div>
                                <p className="text-sm text-gray-600 mb-2">
                                  {selectedCourse.instructor.bio}
                                </p>
                                <div className="flex items-center space-x-4 text-xs text-gray-500">
                                  <div className="flex items-center space-x-1">
                                    <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                                    <span>
                                      {selectedCourse.instructor.rating}
                                    </span>
                                  </div>
                                  <div className="flex items-center space-x-1">
                                    <Users className="w-3 h-3" />
                                    <span>
                                      {selectedCourse.instructor.students.toLocaleString()}
                                    </span>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
