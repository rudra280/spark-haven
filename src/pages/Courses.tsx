import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CourseCard } from "@/components/course/CourseCard";
import {
  Search,
  Filter,
  SlidersHorizontal,
  GraduationCap,
  School,
  University,
} from "lucide-react";
import { motion } from "framer-motion";

const categories = [
  "All",
  "K-5 Primary",
  "6-8 Middle School",
  "9-12 High School",
  "Undergraduate",
  "Graduate",
  "Professional Skills",
  "Life Skills",
];

const subjectsByCategory = {
  "K-5 Primary": [
    "Mathematics",
    "English",
    "Science",
    "Social Studies",
    "Art & Craft",
    "Music",
    "Physical Education",
    "Hindi",
    "Moral Science",
  ],
  "6-8 Middle School": [
    "Advanced Math",
    "English Literature",
    "Physics",
    "Chemistry",
    "Biology",
    "History",
    "Geography",
    "Computer Basics",
    "Hindi",
    "Sanskrit",
  ],
  "9-12 High School": [
    "Calculus",
    "Physics",
    "Chemistry",
    "Biology",
    "English Literature",
    "History",
    "Economics",
    "Computer Science",
    "Psychology",
    "Political Science",
  ],
  Undergraduate: [
    "Engineering",
    "Medicine",
    "Commerce",
    "Arts",
    "Science",
    "Law",
    "Management",
    "Computer Applications",
    "Agriculture",
    "Pharmacy",
  ],
  Graduate: [
    "MBA",
    "M.Tech",
    "M.Sc",
    "MA",
    "PhD Research",
    "Medical Specialization",
    "Law Practice",
    "Research Methods",
  ],
  "Professional Skills": [
    "Programming",
    "Design",
    "Marketing",
    "Finance",
    "Business",
    "AI & ML",
    "Data Science",
    "Digital Marketing",
    "Project Management",
  ],
  "Life Skills": [
    "Cooking",
    "Gardening",
    "Traditional Crafts",
    "Music Instruments",
    "Languages",
    "Health & Fitness",
    "Yoga",
    "Meditation",
    "Photography",
  ],
};

const allCourses = [
  // K-5 Primary
  {
    id: "1",
    title: "Fun with Numbers - Class 3 Mathematics",
    description:
      "Interactive math lessons for young learners with games, puzzles, and colorful animations. Learn addition, subtraction, multiplication and division through play!",
    image: "/course-math-kids.jpg",
    duration: "2 hours",
    students: 25400,
    rating: 4.9,
    level: "Beginner" as const,
    category: "K-5 Primary",
    subject: "Mathematics",
    grade: "Class 3",
    gradient: "from-yellow-500 via-orange-500 to-red-500",
  },
  {
    id: "2",
    title: "English Stories & Grammar - Class 5",
    description:
      "Engaging English lessons with stories, grammar games, and vocabulary building activities. Perfect for young readers and writers!",
    image: "/course-english-kids.jpg",
    duration: "3 hours",
    students: 18900,
    rating: 4.8,
    level: "Beginner" as const,
    category: "K-5 Primary",
    subject: "English",
    grade: "Class 5",
    gradient: "from-blue-500 via-purple-500 to-pink-500",
  },
  {
    id: "3",
    title: "मेरी हिंदी - कक्षा 4 (My Hindi - Class 4)",
    description:
      "हिंदी भाषा सीखने का मजेदार तरीका। कहानियों, कविताओं और व्याकरण के साथ।",
    image: "/course-hindi-kids.jpg",
    duration: "2.5 hours",
    students: 22100,
    rating: 4.8,
    level: "Beginner" as const,
    category: "K-5 Primary",
    subject: "Hindi",
    grade: "Class 4",
    gradient: "from-green-500 via-teal-500 to-cyan-500",
  },

  // Middle School
  {
    id: "4",
    title: "NCERT Class 8 Science - Complete Course",
    description:
      "Physics, Chemistry, and Biology concepts explained with experiments and real-world examples. Perfect for CBSE students.",
    image: "/course-science-8.jpg",
    duration: "12 hours",
    students: 34560,
    rating: 4.9,
    level: "Intermediate" as const,
    category: "6-8 Middle School",
    subject: "Science",
    grade: "Class 8",
    gradient: "from-green-500 via-teal-500 to-cyan-500",
  },
  {
    id: "5",
    title: "Class 7 Mathematics - Algebra & Geometry",
    description:
      "Introduction to algebraic expressions, equations, and geometric shapes. Build strong mathematical foundations.",
    image: "/course-math-7.jpg",
    duration: "8 hours",
    students: 28900,
    rating: 4.7,
    level: "Intermediate" as const,
    category: "6-8 Middle School",
    subject: "Mathematics",
    grade: "Class 7",
    gradient: "from-purple-500 via-indigo-500 to-blue-500",
  },

  // High School
  {
    id: "6",
    title: "IIT-JEE Physics - Mechanics Complete",
    description:
      "Master mechanics for JEE Main & Advanced with detailed theory, problem-solving techniques, and previous year questions.",
    image: "/course-physics-jee.jpg",
    duration: "25 hours",
    students: 45670,
    rating: 4.9,
    level: "Advanced" as const,
    category: "9-12 High School",
    subject: "Physics",
    grade: "Class 11-12",
    gradient: "from-purple-500 via-blue-500 to-indigo-500",
  },
  {
    id: "7",
    title: "CBSE Class 12 Chemistry - Organic Chemistry",
    description:
      "Complete organic chemistry with reaction mechanisms, named reactions, and NEET preparation. All chapters covered.",
    image: "/course-chemistry-12.jpg",
    duration: "18 hours",
    students: 38900,
    rating: 4.8,
    level: "Advanced" as const,
    category: "9-12 High School",
    subject: "Chemistry",
    grade: "Class 12",
    gradient: "from-orange-500 via-red-500 to-pink-500",
  },
  {
    id: "8",
    title: "NEET Biology - Human Physiology",
    description:
      "Complete human physiology for NEET aspirants with diagrams, mnemonics, and practice questions.",
    image: "/course-biology-neet.jpg",
    duration: "15 hours",
    students: 31200,
    rating: 4.8,
    level: "Advanced" as const,
    category: "9-12 High School",
    subject: "Biology",
    grade: "Class 11-12",
    gradient: "from-emerald-500 via-green-500 to-teal-500",
  },

  // Undergraduate
  {
    id: "9",
    title: "Engineering Mathematics - Calculus & Linear Algebra",
    description:
      "Essential mathematics for engineering students with practical applications, solved examples, and engineering problems.",
    image: "/course-engg-math.jpg",
    duration: "35 hours",
    students: 23450,
    rating: 4.7,
    level: "Advanced" as const,
    category: "Undergraduate",
    subject: "Mathematics",
    grade: "1st Year Engineering",
    gradient: "from-violet-500 via-purple-500 to-fuchsia-500",
  },
  {
    id: "10",
    title: "MBBS Anatomy - Complete Human Body Systems",
    description:
      "Comprehensive anatomy course for medical students with 3D models, clinical correlations, and examination preparation.",
    image: "/course-anatomy.jpg",
    duration: "60 hours",
    students: 12300,
    rating: 4.9,
    level: "Advanced" as const,
    category: "Undergraduate",
    subject: "Medicine",
    grade: "1st Year MBBS",
    gradient: "from-emerald-500 via-teal-500 to-cyan-500",
  },
  {
    id: "11",
    title: "Computer Science - Data Structures & Algorithms",
    description:
      "Complete DSA course for computer science students with coding practice, interview preparation, and real projects.",
    image: "/course-dsa.jpg",
    duration: "40 hours",
    students: 56780,
    rating: 4.9,
    level: "Advanced" as const,
    category: "Undergraduate",
    subject: "Computer Science",
    grade: "2nd Year CSE",
    gradient: "from-blue-500 via-indigo-500 to-purple-500",
  },

  // Professional Skills
  {
    id: "12",
    title: "Full Stack Web Development - MERN Stack",
    description:
      "Complete web development course from basics to advanced with real projects, deployment, and industry best practices.",
    image: "/course-webdev.jpg",
    duration: "45 hours",
    students: 67890,
    rating: 4.8,
    level: "Intermediate" as const,
    category: "Professional Skills",
    subject: "Programming",
    grade: "Professional",
    gradient: "from-blue-500 via-indigo-500 to-purple-500",
  },
  {
    id: "13",
    title: "Digital Marketing Mastery - SEO to Social Media",
    description:
      "Complete digital marketing course covering SEO, social media, content marketing, PPC, and analytics.",
    image: "/course-digital-marketing.jpg",
    duration: "30 hours",
    students: 43210,
    rating: 4.7,
    level: "Beginner" as const,
    category: "Professional Skills",
    subject: "Marketing",
    grade: "Professional",
    gradient: "from-pink-500 via-rose-500 to-red-500",
  },

  // Life Skills
  {
    id: "14",
    title: "Traditional Indian Cooking - Regional Cuisines",
    description:
      "Learn authentic Indian recipes from different regions with traditional techniques, spices, and cultural stories.",
    image: "/course-cooking.jpg",
    duration: "8 hours",
    students: 15670,
    rating: 4.7,
    level: "Beginner" as const,
    category: "Life Skills",
    subject: "Cooking",
    grade: "All Ages",
    gradient: "from-red-500 via-orange-500 to-yellow-500",
  },
  {
    id: "15",
    title: "Spanish for Beginners - Conversational Spanish",
    description:
      "Learn Spanish from scratch with native speakers, interactive exercises, and cultural immersion.",
    image: "/course-spanish.jpg",
    duration: "20 hours",
    students: 31240,
    rating: 4.8,
    level: "Beginner" as const,
    category: "Life Skills",
    subject: "Languages",
    grade: "All Ages",
    gradient: "from-pink-500 via-rose-500 to-red-500",
  },
  {
    id: "16",
    title: "Yoga & Meditation - Complete Wellness",
    description:
      "Ancient Indian practices for modern wellness. Learn asanas, pranayama, and meditation techniques.",
    image: "/course-yoga.jpg",
    duration: "12 hours",
    students: 24580,
    rating: 4.9,
    level: "Beginner" as const,
    category: "Life Skills",
    subject: "Health & Fitness",
    grade: "All Ages",
    gradient: "from-emerald-500 via-green-500 to-teal-500",
  },

  // Graduate Level
  {
    id: "17",
    title: "PhD Research Methodology",
    description:
      "Comprehensive guide to research methods, data analysis, thesis writing, and academic publishing.",
    image: "/course-research.jpg",
    duration: "25 hours",
    students: 8900,
    rating: 4.8,
    level: "Advanced" as const,
    category: "Graduate",
    subject: "Research",
    grade: "PhD",
    gradient: "from-violet-500 via-purple-500 to-fuchsia-500",
  },
];

export default function Courses() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedSubject, setSelectedSubject] = useState("All");
  const [filteredCourses, setFilteredCourses] = useState(allCourses);

  React.useEffect(() => {
    let filtered = allCourses;

    // Filter by category
    if (selectedCategory !== "All") {
      filtered = filtered.filter(
        (course) => course.category === selectedCategory,
      );
    }

    // Filter by subject
    if (selectedSubject !== "All") {
      filtered = filtered.filter(
        (course) => course.subject === selectedSubject,
      );
    }

    // Filter by search query
    if (searchQuery) {
      filtered = filtered.filter(
        (course) =>
          course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          course.description
            .toLowerCase()
            .includes(searchQuery.toLowerCase()) ||
          course.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
          course.grade.toLowerCase().includes(searchQuery.toLowerCase()),
      );
    }

    setFilteredCourses(filtered);
  }, [searchQuery, selectedCategory, selectedSubject]);

  const getSubjects = () => {
    if (selectedCategory === "All") {
      return [
        "All",
        ...Array.from(new Set(allCourses.map((course) => course.subject))),
      ];
    }
    return [
      "All",
      ...(subjectsByCategory[
        selectedCategory as keyof typeof subjectsByCategory
      ] || []),
    ];
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "K-5 Primary":
        return School;
      case "6-8 Middle School":
        return School;
      case "9-12 High School":
        return GraduationCap;
      case "Undergraduate":
        return University;
      case "Graduate":
        return University;
      default:
        return GraduationCap;
    }
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
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="bg-gradient-to-r from-orange-500 via-pink-500 to-violet-500 bg-clip-text text-transparent">
              🎓 Every Subject, Every Grade, Everywhere!
            </span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            From kindergarten to PhD, traditional crafts to quantum physics -
            discover courses for every learning journey! 🌍 K-5 to Graduate
            level, all subjects covered!
          </p>
        </motion.div>

        {/* Grade Level Categories */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mb-8"
        >
          <div className="flex flex-wrap items-center justify-center gap-2 mb-6">
            {categories.map((category) => {
              const IconComponent = getCategoryIcon(category);
              return (
                <Button
                  key={category}
                  variant={
                    selectedCategory === category ? "default" : "outline"
                  }
                  size="sm"
                  onClick={() => {
                    setSelectedCategory(category);
                    setSelectedSubject("All");
                  }}
                  className={`flex items-center space-x-2 ${
                    selectedCategory === category
                      ? "bg-gradient-to-r from-orange-500 via-pink-500 to-violet-500 text-white"
                      : ""
                  }`}
                >
                  <IconComponent className="w-4 h-4" />
                  <span>{category}</span>
                </Button>
              );
            })}
          </div>
        </motion.div>

        {/* Search and Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-8 space-y-4"
        >
          {/* Search Bar */}
          <div className="relative max-w-md mx-auto">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search courses, subjects, grades..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>

          {/* Subject Filter */}
          <div className="flex flex-wrap items-center justify-center gap-2">
            {getSubjects().map((subject) => (
              <Button
                key={subject}
                variant={selectedSubject === subject ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedSubject(subject)}
                className={
                  selectedSubject === subject
                    ? "bg-gradient-to-r from-blue-500 to-purple-500 text-white"
                    : ""
                }
              >
                {subject}
              </Button>
            ))}
          </div>
        </motion.div>

        {/* Results Count */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex items-center justify-between mb-8"
        >
          <p className="text-muted-foreground">
            Showing {filteredCourses.length} course
            {filteredCourses.length !== 1 ? "s" : ""}
            {selectedCategory !== "All" && ` in ${selectedCategory}`}
            {selectedSubject !== "All" && ` for ${selectedSubject}`}
          </p>

          <Button variant="outline" size="sm">
            <SlidersHorizontal className="w-4 h-4 mr-2" />
            More Filters
          </Button>
        </motion.div>

        {/* Course Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {filteredCourses.map((course, index) => (
            <CourseCard key={course.id} course={course} index={index} />
          ))}
        </motion.div>

        {/* No Results */}
        {filteredCourses.length === 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-center py-16"
          >
            <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
              <Search className="w-6 h-6 text-muted-foreground" />
            </div>
            <h3 className="text-lg font-semibold mb-2">No courses found</h3>
            <p className="text-muted-foreground mb-4">
              Try adjusting your search criteria or browse all courses.
            </p>
            <Button
              onClick={() => {
                setSearchQuery("");
                setSelectedCategory("All");
                setSelectedSubject("All");
              }}
            >
              Clear Filters
            </Button>
          </motion.div>
        )}

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-16 text-center"
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div>
              <div className="text-3xl font-bold text-orange-500">500K+</div>
              <div className="text-sm text-muted-foreground">Total Courses</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-pink-500">50+</div>
              <div className="text-sm text-muted-foreground">
                Subjects Covered
              </div>
            </div>
            <div>
              <div className="text-3xl font-bold text-violet-500">K-PhD</div>
              <div className="text-sm text-muted-foreground">
                All Grade Levels
              </div>
            </div>
            <div>
              <div className="text-3xl font-bold text-blue-500">195</div>
              <div className="text-sm text-muted-foreground">Countries</div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
