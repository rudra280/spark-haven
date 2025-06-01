import React from "react";
import { CourseCard } from "@/components/course/CourseCard";
import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles } from "lucide-react";
import { motion } from "framer-motion";

const recommendedCourses = [
  {
    id: "1",
    title: "Intro to Python",
    description: "Start coding in Python with easy, hands-on lessons.",
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
];

export function AIRecommendations() {
  return (
    <section className="py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="flex items-center justify-between mb-12"
        >
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <Sparkles className="w-6 h-6 text-primary" />
              <span className="text-primary font-semibold">
                Handpicked for you
              </span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold">
              AI-Curated Learning Paths
            </h2>
            <p className="text-muted-foreground mt-2 max-w-2xl">
              Our AI analyzes your interests and learning style to recommend the
              perfect courses for your journey.
            </p>
          </div>

          <Button variant="outline" className="hidden md:flex">
            Browse all
            <ArrowRight className="ml-2 w-4 h-4" />
          </Button>
        </motion.div>

        {/* Course Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {recommendedCourses.map((course, index) => (
            <CourseCard key={course.id} course={course} index={index} />
          ))}
        </div>

        {/* Mobile Browse Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
          className="text-center mt-12 md:hidden"
        >
          <Button variant="outline" size="lg">
            Browse all courses
            <ArrowRight className="ml-2 w-4 h-4" />
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
