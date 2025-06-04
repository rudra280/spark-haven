import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import {
  Play,
  BookOpen,
  Users,
  Award,
  TrendingUp,
  Star,
  ArrowRight,
  CheckCircle,
  Zap,
  Brain,
  Target,
  Globe,
  Video,
  Download,
  Heart,
  MessageCircle,
  Share,
  Clock,
  Calendar,
  User,
  Eye,
  ChevronRight,
  Sparkles,
  Rocket,
  GraduationCap,
  Trophy,
  BookmarkPlus,
  PlayCircle,
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
import { useAuth } from "@/contexts/AuthContext";

interface FeaturedContent {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  duration: string;
  instructor: string;
  rating: number;
  students: number;
  category: string;
  level: string;
  link: string;
  tags: string[];
  progress?: number;
}

interface LearningPath {
  id: string;
  title: string;
  description: string;
  courses: number;
  duration: string;
  level: string;
  thumbnail: string;
  link: string;
  completedCourses?: number;
}

// Featured educational content with real learning paths
const featuredContent: FeaturedContent[] = [
  {
    id: "1",
    title: "Complete JEE Physics Masterclass",
    description:
      "Master physics concepts for JEE Main & Advanced with 100+ solved problems and video explanations",
    thumbnail:
      "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=400",
    duration: "45 hours",
    instructor: "Dr. Physics Pro",
    rating: 4.9,
    students: 12500,
    category: "Physics",
    level: "Advanced",
    link: "/courses",
    tags: ["JEE", "Physics", "Competitive Exam"],
    progress: 35,
  },
  {
    id: "2",
    title: "NEET Biology Complete Course",
    description:
      "Comprehensive biology preparation with memory techniques, diagrams, and practice tests",
    thumbnail:
      "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=400",
    duration: "60 hours",
    instructor: "Bio Expert",
    rating: 4.8,
    students: 18200,
    category: "Biology",
    level: "Advanced",
    link: "/courses",
    tags: ["NEET", "Biology", "Medical"],
    progress: 60,
  },
  {
    id: "3",
    title: "Machine Learning from Scratch",
    description:
      "Learn ML algorithms, Python implementation, and real-world projects step by step",
    thumbnail:
      "https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=400",
    duration: "40 hours",
    instructor: "AI Master",
    rating: 4.9,
    students: 25400,
    category: "Computer Science",
    level: "Intermediate",
    link: "/ai-video-hub",
    tags: ["Python", "AI", "Programming"],
    progress: 20,
  },
  {
    id: "4",
    title: "Calculus for Engineering Students",
    description:
      "Complete calculus course with applications in engineering and problem-solving techniques",
    thumbnail:
      "https://images.unsplash.com/photo-1509228468518-180dd4864904?w=400",
    duration: "35 hours",
    instructor: "Math Guru",
    rating: 4.7,
    students: 14800,
    category: "Mathematics",
    level: "Intermediate",
    link: "/courses",
    tags: ["Calculus", "Engineering", "Mathematics"],
    progress: 80,
  },
  {
    id: "5",
    title: "Organic Chemistry Reactions",
    description:
      "Master organic reaction mechanisms with visual guides and practice problems",
    thumbnail:
      "https://images.unsplash.com/photo-1554475901-4538ddfbccc2?w=400",
    duration: "25 hours",
    instructor: "Chem Master",
    rating: 4.8,
    students: 9600,
    category: "Chemistry",
    level: "Advanced",
    link: "/courses",
    tags: ["Chemistry", "Organic", "JEE", "NEET"],
    progress: 45,
  },
  {
    id: "6",
    title: "Data Structures & Algorithms",
    description:
      "Complete DSA course for coding interviews and competitive programming",
    thumbnail:
      "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=400",
    duration: "50 hours",
    instructor: "Code Expert",
    rating: 4.9,
    students: 32100,
    category: "Computer Science",
    level: "Intermediate",
    link: "/ai-video-hub",
    tags: ["DSA", "Programming", "Interviews"],
    progress: 15,
  },
];

const learningPaths: LearningPath[] = [
  {
    id: "jee-prep",
    title: "JEE Main & Advanced Preparation",
    description:
      "Complete preparation path for IIT JEE with Physics, Chemistry, and Mathematics",
    courses: 12,
    duration: "8 months",
    level: "Advanced",
    thumbnail:
      "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=400",
    link: "/courses",
    completedCourses: 4,
  },
  {
    id: "neet-prep",
    title: "NEET Medical Entrance",
    description:
      "Comprehensive medical entrance preparation with Biology, Chemistry, and Physics",
    courses: 10,
    duration: "6 months",
    level: "Advanced",
    thumbnail:
      "https://images.unsplash.com/photo-1559757175-0eb30cd8c063?w=400",
    link: "/courses",
    completedCourses: 6,
  },
  {
    id: "programming",
    title: "Full Stack Development",
    description:
      "Learn web development from basics to advanced with hands-on projects",
    courses: 15,
    duration: "10 months",
    level: "Beginner to Advanced",
    thumbnail:
      "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=400",
    link: "/ai-video-hub",
    completedCourses: 2,
  },
  {
    id: "data-science",
    title: "Data Science & Machine Learning",
    description:
      "Master data analysis, ML algorithms, and Python programming for data science",
    courses: 18,
    duration: "12 months",
    level: "Intermediate",
    thumbnail:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400",
    link: "/ai-video-hub",
    completedCourses: 3,
  },
];

const subjects = [
  {
    name: "Mathematics",
    icon: "📐",
    link: "/courses",
    description: "Calculus, Algebra, Statistics",
    courses: 45,
  },
  {
    name: "Physics",
    icon: "⚛️",
    link: "/courses",
    description: "Mechanics, Thermodynamics, Quantum",
    courses: 38,
  },
  {
    name: "Chemistry",
    icon: "🧪",
    link: "/courses",
    description: "Organic, Inorganic, Physical",
    courses: 42,
  },
  {
    name: "Biology",
    icon: "🧬",
    link: "/courses",
    description: "Cell Biology, Genetics, Ecology",
    courses: 35,
  },
  {
    name: "Computer Science",
    icon: "💻",
    link: "/ai-video-hub",
    description: "Programming, AI, Data Structures",
    courses: 52,
  },
  {
    name: "English",
    icon: "📝",
    link: "/courses",
    description: "Literature, Grammar, Writing",
    courses: 28,
  },
  {
    name: "History",
    icon: "🏛️",
    link: "/courses",
    description: "World History, Indian History",
    courses: 25,
  },
  {
    name: "Geography",
    icon: "🌍",
    link: "/courses",
    description: "Physical, Human, Economic",
    courses: 22,
  },
];

const eduReelsPreview = [
  {
    id: "1",
    title: "Quantum Physics in 60 Seconds",
    thumbnail:
      "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=300",
    views: "524K",
    likes: "42.3K",
  },
  {
    id: "2",
    title: "Calculus Tricks for JEE",
    thumbnail:
      "https://images.unsplash.com/photo-1509228468518-180dd4864904?w=300",
    views: "892K",
    likes: "67.5K",
  },
  {
    id: "3",
    title: "NEET Biology Memory Hack",
    thumbnail:
      "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=300",
    views: "673K",
    likes: "54.2K",
  },
  {
    id: "4",
    title: "Python Coding Quick Start",
    thumbnail:
      "https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=300",
    views: "1.2M",
    likes: "89.4K",
  },
];

export default function Index() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [recentActivity, setRecentActivity] = useState<FeaturedContent[]>([]);
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    // Simulate loading recent activity for authenticated users
    if (isAuthenticated) {
      setRecentActivity(
        featuredContent.filter(
          (content) => content.progress && content.progress > 0,
        ),
      );
    }

    // Auto-slide for hero section
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % featuredContent.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isAuthenticated]);

  const handleContinueLearning = (content: FeaturedContent) => {
    // Store progress and navigate to content
    localStorage.setItem(
      `course_progress_${content.id}`,
      content.progress?.toString() || "0",
    );
    navigate(content.link);
  };

  const handleExploreSubject = (subject: any) => {
    navigate(subject.link, { state: { subject: subject.name } });
  };

  const stats = [
    { label: "Active Learners", value: "2.5M+", icon: Users },
    { label: "Expert Instructors", value: "15K+", icon: Award },
    { label: "Course Hours", value: "50K+", icon: PlayCircle },
    { label: "Success Rate", value: "95%", icon: Trophy },
  ];

  return (
    <div
      className="min-h-screen"
      style={{
        background: "linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)",
      }}
    >
      {/* Hero Section */}
      <section className="relative pt-20 pb-16 overflow-hidden">
        <div className="container-wide">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="space-y-8"
            >
              <div className="space-y-4">
                <Badge className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white px-4 py-2">
                  <Sparkles className="w-4 h-4 mr-2" />
                  India's #1 Learning Platform
                </Badge>

                <h1 className="text-5xl lg:text-6xl font-bold text-slate-800 leading-tight">
                  Master Every
                  <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                    {" "}
                    Subject{" "}
                  </span>
                  with AI
                </h1>

                <p className="text-xl text-slate-600 leading-relaxed">
                  Join millions of students learning with AI-powered videos,
                  interactive courses, and expert guidance. From JEE to NEET,
                  from coding to creativity - we've got you covered.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white px-8 py-4 text-lg"
                  onClick={() =>
                    navigate(isAuthenticated ? "/dashboard" : "/register")
                  }
                >
                  <Rocket className="w-5 h-5 mr-2" />
                  {isAuthenticated
                    ? "Continue Learning"
                    : "Start Learning Free"}
                </Button>

                <Button
                  variant="outline"
                  size="lg"
                  className="border-2 border-slate-300 text-slate-700 hover:bg-slate-100 px-8 py-4 text-lg"
                  onClick={() => navigate("/reels")}
                >
                  <Play className="w-5 h-5 mr-2" />
                  Watch EduReels
                </Button>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-8">
                {stats.map((stat, index) => (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="text-center"
                  >
                    <stat.icon className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                    <div className="text-2xl font-bold text-slate-800">
                      {stat.value}
                    </div>
                    <div className="text-sm text-slate-600">{stat.label}</div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Right Content - Featured Course Slider */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative"
            >
              <div className="relative bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-2xl border border-white/20">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentSlide}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.5 }}
                  >
                    <div className="relative mb-4">
                      <img
                        src={featuredContent[currentSlide].thumbnail}
                        alt={featuredContent[currentSlide].title}
                        className="w-full h-48 object-cover rounded-lg"
                      />
                      <div className="absolute inset-0 bg-black/40 rounded-lg flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                        <Button
                          size="lg"
                          className="bg-white/20 backdrop-blur-sm text-white border-white/30"
                          onClick={() =>
                            navigate(featuredContent[currentSlide].link)
                          }
                        >
                          <Play className="w-6 h-6 mr-2" />
                          Start Learning
                        </Button>
                      </div>
                      <Badge className="absolute top-3 left-3 bg-gradient-to-r from-red-500 to-pink-500 text-white">
                        Featured
                      </Badge>
                    </div>

                    <div className="space-y-3">
                      <h3 className="text-xl font-bold text-slate-800">
                        {featuredContent[currentSlide].title}
                      </h3>

                      <p className="text-slate-600 text-sm">
                        {featuredContent[currentSlide].description}
                      </p>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4 text-sm text-slate-500">
                          <span className="flex items-center">
                            <Clock className="w-4 h-4 mr-1" />
                            {featuredContent[currentSlide].duration}
                          </span>
                          <span className="flex items-center">
                            <Users className="w-4 h-4 mr-1" />
                            {featuredContent[
                              currentSlide
                            ].students.toLocaleString()}
                          </span>
                        </div>

                        <div className="flex items-center space-x-1">
                          <Star className="w-4 h-4 text-yellow-500 fill-current" />
                          <span className="text-sm font-medium">
                            {featuredContent[currentSlide].rating}
                          </span>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </AnimatePresence>

                {/* Slide indicators */}
                <div className="flex justify-center space-x-2 mt-4">
                  {featuredContent.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentSlide(index)}
                      className={`w-2 h-2 rounded-full transition-all ${
                        index === currentSlide
                          ? "bg-blue-600 w-6"
                          : "bg-slate-300"
                      }`}
                    />
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Continue Learning Section - For Authenticated Users */}
      {isAuthenticated && recentActivity.length > 0 && (
        <section className="py-16">
          <div className="container-wide">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-8"
            >
              <h2 className="text-3xl font-bold text-slate-800 mb-2">
                Continue Your Learning Journey
              </h2>
              <p className="text-slate-600">
                Pick up where you left off and keep making progress
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {recentActivity.map((content, index) => (
                <motion.div
                  key={content.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card
                    className="bg-white/80 backdrop-blur-sm border border-white/20 hover:shadow-xl transition-all duration-300 cursor-pointer"
                    onClick={() => handleContinueLearning(content)}
                  >
                    <div className="relative">
                      <img
                        src={content.thumbnail}
                        alt={content.title}
                        className="w-full h-40 object-cover rounded-t-lg"
                      />
                      <div className="absolute bottom-2 left-2 right-2">
                        <div className="bg-black/60 backdrop-blur-sm rounded px-2 py-1">
                          <div className="flex justify-between text-white text-xs mb-1">
                            <span>Progress</span>
                            <span>{content.progress}%</span>
                          </div>
                          <div className="w-full bg-white/20 rounded-full h-1">
                            <div
                              className="bg-green-500 h-1 rounded-full transition-all duration-300"
                              style={{ width: `${content.progress}%` }}
                            />
                          </div>
                        </div>
                      </div>
                    </div>

                    <CardContent className="p-4">
                      <h3 className="font-semibold text-slate-800 mb-2 line-clamp-2">
                        {content.title}
                      </h3>

                      <div className="flex items-center justify-between">
                        <Badge className="bg-blue-100 text-blue-800">
                          {content.category}
                        </Badge>

                        <Button
                          size="sm"
                          className="bg-gradient-to-r from-green-500 to-emerald-600 text-white"
                        >
                          Continue
                          <ArrowRight className="w-4 h-4 ml-1" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* EduReels Preview Section */}
      <section className="py-16 bg-gradient-to-r from-purple-50 to-pink-50">
        <div className="container-wide">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-3xl font-bold text-slate-800 mb-2">
                🔥 Trending EduReels
              </h2>
              <p className="text-slate-600">
                Quick learning videos that go viral for good reasons
              </p>
            </div>

            <Button
              onClick={() => navigate("/reels")}
              className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white"
            >
              View All Reels
              <TrendingUp className="w-4 h-4 ml-2" />
            </Button>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {eduReelsPreview.map((reel, index) => (
              <motion.div
                key={reel.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
                className="relative bg-white/80 backdrop-blur-sm rounded-xl overflow-hidden hover:shadow-lg transition-all duration-300 cursor-pointer"
                onClick={() => navigate("/reels")}
              >
                <div className="relative">
                  <img
                    src={reel.thumbnail}
                    alt={reel.title}
                    className="w-full h-48 object-cover"
                  />
                  <div className="absolute inset-0 bg-black/20 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                    <Play className="w-12 h-12 text-white" />
                  </div>
                  <Badge className="absolute top-2 right-2 bg-red-500 text-white text-xs">
                    VIRAL
                  </Badge>
                </div>

                <div className="p-3">
                  <h4 className="font-medium text-slate-800 text-sm mb-2 line-clamp-2">
                    {reel.title}
                  </h4>

                  <div className="flex items-center justify-between text-xs text-slate-500">
                    <span className="flex items-center">
                      <Eye className="w-3 h-3 mr-1" />
                      {reel.views}
                    </span>
                    <span className="flex items-center">
                      <Heart className="w-3 h-3 mr-1" />
                      {reel.likes}
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Subjects Section */}
      <section className="py-16">
        <div className="container-wide">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-slate-800 mb-4">
              Explore All Subjects
            </h2>
            <p className="text-slate-600 max-w-2xl mx-auto">
              From competitive exams to skill development, find courses in every
              subject taught by expert instructors with practical examples.
            </p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {subjects.map((subject, index) => (
              <motion.div
                key={subject.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="bg-white/80 backdrop-blur-sm rounded-xl p-6 text-center hover:shadow-xl transition-all duration-300 cursor-pointer border border-white/20"
                onClick={() => handleExploreSubject(subject)}
              >
                <div className="text-4xl mb-3">{subject.icon}</div>
                <h3 className="font-semibold text-slate-800 mb-2">
                  {subject.name}
                </h3>
                <p className="text-sm text-slate-600 mb-3">
                  {subject.description}
                </p>
                <Badge variant="secondary" className="text-xs">
                  {subject.courses} courses
                </Badge>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Learning Paths Section */}
      <section className="py-16 bg-gradient-to-r from-blue-50 to-indigo-50">
        <div className="container-wide">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-slate-800 mb-4">
              🎯 Guided Learning Paths
            </h2>
            <p className="text-slate-600 max-w-2xl mx-auto">
              Follow structured learning paths designed by experts to achieve
              your goals systematically and efficiently.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {learningPaths.map((path, index) => (
              <motion.div
                key={path.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card
                  className="bg-white/80 backdrop-blur-sm border border-white/20 hover:shadow-xl transition-all duration-300 cursor-pointer h-full"
                  onClick={() => navigate(path.link)}
                >
                  <div className="relative">
                    <img
                      src={path.thumbnail}
                      alt={path.title}
                      className="w-full h-40 object-cover rounded-t-lg"
                    />
                    {isAuthenticated && path.completedCourses && (
                      <div className="absolute top-3 right-3">
                        <Badge className="bg-green-500 text-white">
                          {path.completedCourses}/{path.courses} completed
                        </Badge>
                      </div>
                    )}
                  </div>

                  <CardContent className="p-4">
                    <h3 className="font-semibold text-slate-800 mb-2 line-clamp-2">
                      {path.title}
                    </h3>

                    <p className="text-sm text-slate-600 mb-4 line-clamp-2">
                      {path.description}
                    </p>

                    <div className="space-y-2 text-xs text-slate-500">
                      <div className="flex justify-between">
                        <span>{path.courses} courses</span>
                        <span>{path.duration}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>{path.level}</span>
                        <Badge variant="outline" className="text-xs">
                          {isAuthenticated ? "Continue" : "Start"}
                        </Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* AI Features Section */}
      <section className="py-16">
        <div className="container-wide">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-slate-800 mb-4">
              🤖 AI-Powered Learning Experience
            </h2>
            <p className="text-slate-600 max-w-2xl mx-auto">
              Experience the future of education with our advanced AI features
              that adapt to your learning style and pace.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="text-center"
            >
              <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-r from-purple-500 to-indigo-600 rounded-full flex items-center justify-center">
                <Brain className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-slate-800 mb-3">
                AI Tutor
              </h3>
              <p className="text-slate-600 mb-4">
                Get personalized help 24/7 with our AI tutor that understands
                your learning needs and provides step-by-step explanations.
              </p>
              <Button
                variant="outline"
                onClick={() => navigate("/ai-tutor")}
                className="border-purple-300 text-purple-600 hover:bg-purple-50"
              >
                Try AI Tutor
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-center"
            >
              <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-r from-blue-500 to-cyan-600 rounded-full flex items-center justify-center">
                <Video className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-slate-800 mb-3">
                AI Video Generation
              </h3>
              <p className="text-slate-600 mb-4">
                Generate custom educational videos on any topic using our
                advanced AI that creates content tailored to your requirements.
              </p>
              <Button
                variant="outline"
                onClick={() => navigate("/ai-video-hub")}
                className="border-blue-300 text-blue-600 hover:bg-blue-50"
              >
                Generate Videos
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="text-center"
            >
              <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-r from-green-500 to-emerald-600 rounded-full flex items-center justify-center">
                <Target className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-slate-800 mb-3">
                Smart Recommendations
              </h3>
              <p className="text-slate-600 mb-4">
                Our AI analyzes your progress and suggests the perfect next
                course or topic to maximize your learning efficiency.
              </p>
              <Button
                variant="outline"
                onClick={() =>
                  navigate(isAuthenticated ? "/dashboard" : "/register")
                }
                className="border-green-300 text-green-600 hover:bg-green-50"
              >
                Get Recommendations
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-indigo-700">
        <div className="container-wide text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-3xl mx-auto"
          >
            <h2 className="text-4xl font-bold text-white mb-6">
              Ready to Transform Your Learning?
            </h2>
            <p className="text-xl text-blue-100 mb-8">
              Join millions of students who are already learning smarter, not
              harder. Start your journey today with our AI-powered platform.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                onClick={() =>
                  navigate(isAuthenticated ? "/dashboard" : "/register")
                }
                className="bg-white text-blue-600 hover:bg-blue-50 px-8 py-4 text-lg"
              >
                <GraduationCap className="w-5 h-5 mr-2" />
                {isAuthenticated ? "Go to Dashboard" : "Start Free Trial"}
              </Button>

              <Button
                variant="outline"
                size="lg"
                onClick={() => navigate("/pricing")}
                className="border-white text-white hover:bg-white/10 px-8 py-4 text-lg"
              >
                <Trophy className="w-5 h-5 mr-2" />
                View Pricing
              </Button>
            </div>

            <p className="text-blue-200 text-sm mt-6">
              ✨ Free trial • No credit card required • Cancel anytime
            </p>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
