import React, { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { CourseCard } from "@/components/course/CourseCard";
import {
  Search,
  Filter,
  SlidersHorizontal,
  GraduationCap,
  School,
  University,
  Loader2,
} from "lucide-react";
import { motion } from "framer-motion";
import { useCourseStore } from "@/store/courseStore";
import { useAuth } from "@/contexts/AuthContext";
import api from "@/lib/api";
import { PageHeader } from "@/components/ui/back-navigation";

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

// Extended course data
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
    instructor: "Ms. Priya Sharma",
    price: 999,
    curriculum: [
      "Basic Numbers",
      "Addition & Subtraction",
      "Multiplication Tables",
      "Division Basics",
      "Word Problems",
    ],
    enrolled: false,
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
    instructor: "Mr. John Smith",
    price: 1299,
    curriculum: [
      "Reading Comprehension",
      "Grammar Basics",
      "Creative Writing",
      "Vocabulary Building",
      "Story Telling",
    ],
    enrolled: false,
  },

  // Middle School
  {
    id: "3",
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
    instructor: "Dr. Rajesh Kumar",
    price: 2499,
    curriculum: [
      "Force & Pressure",
      "Friction",
      "Sound",
      "Chemical Effects",
      "Light",
      "Stars & Solar System",
    ],
    enrolled: true,
  },

  // High School
  {
    id: "4",
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
    instructor: "Prof. A.K. Singh (IIT Delhi)",
    price: 4999,
    curriculum: [
      "Kinematics",
      "Laws of Motion",
      "Work Energy Power",
      "Circular Motion",
      "Rotational Mechanics",
    ],
    enrolled: false,
  },

  // Professional Skills
  {
    id: "5",
    title: "Complete Python Programming - Beginner to Expert",
    description:
      "Master Python from basics to advanced concepts with real projects, data structures, and web development.",
    image: "/course-python.jpg",
    duration: "40 hours",
    students: 67890,
    rating: 4.8,
    level: "Beginner" as const,
    category: "Professional Skills",
    subject: "Programming",
    grade: "Professional",
    gradient: "from-green-500 via-teal-500 to-cyan-500",
    instructor: "Sarah Wilson (Ex-Google)",
    price: 5999,
    curriculum: [
      "Python Basics",
      "Data Structures",
      "OOP",
      "File Handling",
      "Web Development",
      "APIs",
    ],
    enrolled: true,
  },

  // Life Skills
  {
    id: "6",
    title: "Traditional Indian Cooking Masterclass",
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
    instructor: "Chef Meera Patel",
    price: 2999,
    curriculum: [
      "Spice Knowledge",
      "North Indian Cuisine",
      "South Indian Dishes",
      "Street Food",
      "Desserts",
    ],
    enrolled: false,
  },
];

export default function Courses() {
  const { user, isAuthenticated } = useAuth();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedSubject, setSelectedSubject] = useState("All");
  const [filteredCourses, setFilteredCourses] = useState(allCourses);
  const [loading, setLoading] = useState(false);
  const [enrolling, setEnrolling] = useState<string | null>(null);
  const [enrollmentMessage, setEnrollmentMessage] = useState<{
    type: "success" | "error";
    message: string;
  } | null>(null);

  useEffect(() => {
    loadCourses();
  }, [selectedCategory, selectedSubject, searchQuery]);

  const loadCourses = async () => {
    setLoading(true);
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 500));

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
            course.grade.toLowerCase().includes(searchQuery.toLowerCase()) ||
            course.instructor.toLowerCase().includes(searchQuery.toLowerCase()),
        );
      }

      setFilteredCourses(filtered);
    } catch (error) {
      console.error("Failed to load courses:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleEnrollInCourse = async (courseId: string, courseName: string) => {
    if (!isAuthenticated) {
      setEnrollmentMessage({
        type: "error",
        message: "Please log in to enroll in courses",
      });
      return;
    }

    setEnrolling(courseId);
    try {
      const result = await api.enrollInCourse(courseId);
      if (result.success) {
        setEnrollmentMessage({
          type: "success",
          message: `Successfully enrolled in "${courseName}"!`,
        });

        // Update course enrollment status
        setFilteredCourses((prev) =>
          prev.map((course) =>
            course.id === courseId ? { ...course, enrolled: true } : course,
          ),
        );
      } else {
        setEnrollmentMessage({
          type: "error",
          message: result.error || "Failed to enroll in course",
        });
      }
    } catch (error) {
      setEnrollmentMessage({
        type: "error",
        message: "An error occurred while enrolling",
      });
    } finally {
      setEnrolling(null);
      // Clear message after 3 seconds
      setTimeout(() => setEnrollmentMessage(null), 3000);
    }
  };

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

        {/* Enrollment Message */}
        {enrollmentMessage && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <Alert
              className={
                enrollmentMessage.type === "success"
                  ? "border-green-200 bg-green-50 text-green-800"
                  : "border-red-200 bg-red-50 text-red-800"
              }
            >
              <AlertDescription>{enrollmentMessage.message}</AlertDescription>
            </Alert>
          </motion.div>
        )}

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
                  disabled={loading}
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
              placeholder="Search courses, subjects, instructors..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
              disabled={loading}
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
                disabled={loading}
              >
                {subject}
              </Button>
            ))}
          </div>
        </motion.div>

        {/* Loading State */}
        {loading && (
          <div className="text-center py-8">
            <Loader2 className="w-8 h-8 animate-spin mx-auto mb-4" />
            <p className="text-muted-foreground">Loading courses...</p>
          </div>
        )}

        {/* Results Count */}
        {!loading && (
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
        )}

        {/* Course Grid */}
        {!loading && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {filteredCourses.map((course, index) => (
              <EnhancedCourseCard
                key={course.id}
                course={course}
                index={index}
                onEnroll={handleEnrollInCourse}
                enrolling={enrolling === course.id}
                isAuthenticated={isAuthenticated}
              />
            ))}
          </motion.div>
        )}

        {/* No Results */}
        {!loading && filteredCourses.length === 0 && (
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
        {!loading && filteredCourses.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="mt-16 text-center"
          >
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              <div>
                <div className="text-3xl font-bold text-orange-500">500K+</div>
                <div className="text-sm text-muted-foreground">
                  Total Courses
                </div>
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
        )}
      </div>
    </div>
  );
}

// Enhanced Course Card Component
function EnhancedCourseCard({
  course,
  index,
  onEnroll,
  enrolling,
  isAuthenticated,
}: {
  course: any;
  index: number;
  onEnroll: (id: string, name: string) => void;
  enrolling: boolean;
  isAuthenticated: boolean;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.1 * index }}
    >
      <CourseCard
        course={course}
        index={index}
        onEnroll={onEnroll}
        enrolling={enrolling}
        isAuthenticated={isAuthenticated}
      />
    </motion.div>
  );
}
