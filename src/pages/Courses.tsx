import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CourseCard } from "@/components/course/CourseCard";
import { Search, Filter, SlidersHorizontal } from "lucide-react";
import { motion } from "framer-motion";

const categories = [
  "All",
  "Programming",
  "Design",
  "Finance",
  "Marketing",
  "Business",
  "AI & ML",
];

const allCourses = [
  {
    id: "1",
    title: "Intro to Python",
    description:
      "Start coding in Python with easy, hands-on lessons. Perfect for beginners.",
    image: "/course-python.jpg",
    duration: "4 hours",
    students: 15420,
    rating: 4.9,
    level: "Beginner" as const,
    category: "Programming",
    gradient: "from-green-500 via-teal-500 to-cyan-500",
  },
  {
    id: "2",
    title: "UX Design Basics",
    description:
      "Discover core user experience principles with real-world examples.",
    image: "/course-ux.jpg",
    duration: "3.5 hours",
    students: 8930,
    rating: 4.8,
    level: "Intermediate" as const,
    category: "Design",
    gradient: "from-purple-500 via-pink-500 to-rose-500",
  },
  {
    id: "3",
    title: "Finance 101",
    description:
      "Learn the basics of personal finance & smart money management.",
    image: "/course-finance.jpg",
    duration: "2.5 hours",
    students: 12650,
    rating: 4.7,
    level: "Beginner" as const,
    category: "Finance",
    gradient: "from-blue-500 via-indigo-500 to-purple-500",
  },
  {
    id: "4",
    title: "React Development",
    description: "Build modern web applications with React and TypeScript.",
    image: "/course-react.jpg",
    duration: "6 hours",
    students: 9840,
    rating: 4.9,
    level: "Intermediate" as const,
    category: "Programming",
    gradient: "from-cyan-500 via-blue-500 to-indigo-500",
  },
  {
    id: "5",
    title: "Digital Marketing",
    description:
      "Master modern marketing strategies and grow your online presence.",
    image: "/course-marketing.jpg",
    duration: "4.5 hours",
    students: 7200,
    rating: 4.6,
    level: "Beginner" as const,
    category: "Marketing",
    gradient: "from-orange-500 via-red-500 to-pink-500",
  },
  {
    id: "6",
    title: "Machine Learning Basics",
    description:
      "Introduction to AI and machine learning concepts with practical examples.",
    image: "/course-ml.jpg",
    duration: "5 hours",
    students: 11300,
    rating: 4.8,
    level: "Advanced" as const,
    category: "AI & ML",
    gradient: "from-violet-500 via-purple-500 to-fuchsia-500",
  },
];

export default function Courses() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [filteredCourses, setFilteredCourses] = useState(allCourses);

  React.useEffect(() => {
    let filtered = allCourses;

    // Filter by category
    if (selectedCategory !== "All") {
      filtered = filtered.filter(
        (course) => course.category === selectedCategory,
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
          course.category.toLowerCase().includes(searchQuery.toLowerCase()),
      );
    }

    setFilteredCourses(filtered);
  }, [searchQuery, selectedCategory]);

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
            <span className="bg-gradient-to-r from-cyan-500 to-purple-500 bg-clip-text text-transparent">
              Discover Amazing Courses
            </span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Explore our curated collection of courses designed to accelerate
            your learning journey.
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
              placeholder="Search courses..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>

          {/* Category Filters */}
          <div className="flex flex-wrap items-center justify-center gap-2">
            {categories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory(category)}
                className={
                  selectedCategory === category
                    ? "bg-gradient-to-r from-cyan-500 to-purple-500 text-white"
                    : ""
                }
              >
                {category}
              </Button>
            ))}
          </div>
        </motion.div>

        {/* Results Count */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex items-center justify-between mb-8"
        >
          <p className="text-muted-foreground">
            Showing {filteredCourses.length} course
            {filteredCourses.length !== 1 ? "s" : ""}
            {selectedCategory !== "All" && ` in ${selectedCategory}`}
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
          transition={{ duration: 0.6, delay: 0.3 }}
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
            transition={{ duration: 0.6, delay: 0.3 }}
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
