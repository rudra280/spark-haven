import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Search,
  Filter,
  Clock,
  Users,
  Star,
  ArrowRight,
  Target,
  Sparkles,
  BookOpen,
  Code,
  Palette,
  Calculator,
  TrendingUp,
  Play,
} from "lucide-react";
import { motion } from "framer-motion";

interface LearningPath {
  id: string;
  title: string;
  description: string;
  category: string;
  difficulty: "Beginner" | "Intermediate" | "Advanced";
  duration: string;
  courses: number;
  students: number;
  rating: number;
  progress?: number;
  icon: any;
  gradient: string;
  skills: string[];
}

const learningPaths: LearningPath[] = [
  {
    id: "1",
    title: "Full-Stack Web Developer",
    description:
      "Master modern web development from frontend to backend. Learn HTML, CSS, JavaScript, React, Node.js, and databases.",
    category: "Programming",
    difficulty: "Beginner",
    duration: "6 months",
    courses: 12,
    students: 15420,
    rating: 4.9,
    progress: 35,
    icon: Code,
    gradient: "from-blue-500 to-cyan-500",
    skills: ["HTML/CSS", "JavaScript", "React", "Node.js", "MongoDB"],
  },
  {
    id: "2",
    title: "UX/UI Design Professional",
    description:
      "Become a complete UX/UI designer. Learn design thinking, user research, prototyping, and visual design.",
    category: "Design",
    difficulty: "Intermediate",
    duration: "4 months",
    courses: 8,
    students: 8930,
    rating: 4.8,
    icon: Palette,
    gradient: "from-purple-500 to-pink-500",
    skills: [
      "Figma",
      "User Research",
      "Prototyping",
      "Visual Design",
      "Usability",
    ],
  },
  {
    id: "3",
    title: "Data Science Mastery",
    description:
      "Dive deep into data science and machine learning. Python, statistics, ML algorithms, and data visualization.",
    category: "Data Science",
    difficulty: "Advanced",
    duration: "8 months",
    courses: 15,
    students: 12650,
    rating: 4.7,
    icon: Calculator,
    gradient: "from-green-500 to-teal-500",
    skills: [
      "Python",
      "Pandas",
      "Machine Learning",
      "Statistics",
      "Visualization",
    ],
  },
  {
    id: "4",
    title: "Digital Marketing Expert",
    description:
      "Master digital marketing strategies. SEO, social media, content marketing, analytics, and paid advertising.",
    category: "Marketing",
    difficulty: "Beginner",
    duration: "3 months",
    courses: 10,
    students: 9840,
    rating: 4.6,
    icon: TrendingUp,
    gradient: "from-orange-500 to-red-500",
    skills: [
      "SEO",
      "Social Media",
      "Content Strategy",
      "Google Ads",
      "Analytics",
    ],
  },
  {
    id: "5",
    title: "Mobile App Developer",
    description:
      "Build native and cross-platform mobile apps. Learn React Native, Flutter, and mobile app design principles.",
    category: "Programming",
    difficulty: "Intermediate",
    duration: "5 months",
    courses: 11,
    students: 7200,
    rating: 4.8,
    icon: Code,
    gradient: "from-indigo-500 to-purple-500",
    skills: ["React Native", "Flutter", "Mobile UI", "App Store", "APIs"],
  },
  {
    id: "6",
    title: "AI & Machine Learning Engineer",
    description:
      "Become an AI specialist. Deep learning, neural networks, computer vision, and natural language processing.",
    category: "AI & ML",
    difficulty: "Advanced",
    duration: "10 months",
    courses: 18,
    students: 5600,
    rating: 4.9,
    icon: Sparkles,
    gradient: "from-violet-500 to-purple-500",
    skills: [
      "TensorFlow",
      "PyTorch",
      "Deep Learning",
      "Computer Vision",
      "NLP",
    ],
  },
];

export default function LearningPaths() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedDifficulty, setSelectedDifficulty] = useState("all");

  const categories = [
    "all",
    ...Array.from(new Set(learningPaths.map((path) => path.category))),
  ];
  const difficulties = ["all", "Beginner", "Intermediate", "Advanced"];

  const filteredPaths = learningPaths.filter((path) => {
    const matchesSearch =
      path.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      path.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory =
      selectedCategory === "all" || path.category === selectedCategory;
    const matchesDifficulty =
      selectedDifficulty === "all" || path.difficulty === selectedDifficulty;
    return matchesSearch && matchesCategory && matchesDifficulty;
  });

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
            <Target className="w-8 h-8 text-primary" />
            <h1 className="text-4xl md:text-5xl font-bold">
              <span className="bg-gradient-to-r from-cyan-500 to-purple-500 bg-clip-text text-transparent">
                Learning Paths
              </span>
            </h1>
          </div>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Structured learning journeys designed by experts. Follow curated
            paths to master new skills step by step.
          </p>
        </motion.div>

        {/* Search and Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mb-8 space-y-4"
        >
          {/* Search Bar */}
          <div className="relative max-w-md mx-auto">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search learning paths..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>

          {/* Filters */}
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Select
              value={selectedCategory}
              onValueChange={setSelectedCategory}
            >
              <SelectTrigger className="w-48">
                <SelectValue placeholder="All Categories" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                {categories.slice(1).map((category) => (
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
              <SelectTrigger className="w-48">
                <SelectValue placeholder="All Levels" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Levels</SelectItem>
                {difficulties.slice(1).map((difficulty) => (
                  <SelectItem key={difficulty} value={difficulty}>
                    {difficulty}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </motion.div>

        {/* Results Count */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-8"
        >
          <p className="text-muted-foreground">
            Showing {filteredPaths.length} learning path
            {filteredPaths.length !== 1 ? "s" : ""}
          </p>
        </motion.div>

        {/* Learning Paths Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-8"
        >
          {filteredPaths.map((path, index) => (
            <motion.div
              key={path.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 * index }}
            >
              <Card className="h-full hover:shadow-xl transition-all duration-300 border-0 bg-background/50 backdrop-blur-sm group">
                <CardHeader className="space-y-4">
                  {/* Header with Icon and Info */}
                  <div className="flex items-start justify-between">
                    <div className="flex items-center space-x-3">
                      <div
                        className={`w-12 h-12 rounded-lg bg-gradient-to-r ${path.gradient} flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}
                      >
                        <path.icon className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <Badge variant="secondary" className="mb-2">
                          {path.category}
                        </Badge>
                        <CardTitle className="text-xl">{path.title}</CardTitle>
                      </div>
                    </div>
                    <Badge
                      variant={
                        path.difficulty === "Beginner"
                          ? "secondary"
                          : path.difficulty === "Intermediate"
                            ? "default"
                            : "destructive"
                      }
                    >
                      {path.difficulty}
                    </Badge>
                  </div>

                  {/* Progress (if enrolled) */}
                  {path.progress && (
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span>Your Progress</span>
                        <span className="font-medium">{path.progress}%</span>
                      </div>
                      <Progress value={path.progress} className="h-2" />
                    </div>
                  )}
                </CardHeader>

                <CardContent className="space-y-6">
                  {/* Description */}
                  <CardDescription className="leading-relaxed">
                    {path.description}
                  </CardDescription>

                  {/* Skills */}
                  <div>
                    <p className="text-sm font-medium mb-2">You'll learn:</p>
                    <div className="flex flex-wrap gap-2">
                      {path.skills.map((skill) => (
                        <Badge
                          key={skill}
                          variant="outline"
                          className="text-xs"
                        >
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  {/* Stats */}
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div className="flex items-center space-x-2">
                      <Clock className="w-4 h-4 text-muted-foreground" />
                      <span>{path.duration}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <BookOpen className="w-4 h-4 text-muted-foreground" />
                      <span>{path.courses} courses</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Users className="w-4 h-4 text-muted-foreground" />
                      <span>{path.students.toLocaleString()} students</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Star className="w-4 h-4 fill-blue-400 text-blue-400" />
                      <span>{path.rating} rating</span>
                    </div>
                  </div>

                  {/* CTA */}
                  <Button
                    className={`w-full bg-gradient-to-r ${path.gradient} hover:opacity-90 text-white`}
                  >
                    {path.progress ? (
                      <>
                        <Play className="w-4 h-4 mr-2" />
                        Continue Learning
                      </>
                    ) : (
                      <>
                        <Target className="w-4 h-4 mr-2" />
                        Start Learning Path
                      </>
                    )}
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* No Results */}
        {filteredPaths.length === 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-center py-16"
          >
            <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
              <Search className="w-6 h-6 text-muted-foreground" />
            </div>
            <h3 className="text-lg font-semibold mb-2">
              No learning paths found
            </h3>
            <p className="text-muted-foreground mb-4">
              Try adjusting your search criteria or browse all paths.
            </p>
            <Button
              onClick={() => {
                setSearchQuery("");
                setSelectedCategory("all");
                setSelectedDifficulty("all");
              }}
            >
              Clear Filters
            </Button>
          </motion.div>
        )}
      </div>
    </div>
  );
}
