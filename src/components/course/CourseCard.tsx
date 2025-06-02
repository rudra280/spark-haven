import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Clock,
  Users,
  Star,
  Play,
  CheckCircle,
  Loader2,
  BookOpen,
  IndianRupee,
} from "lucide-react";
import { motion } from "framer-motion";

interface Course {
  id: string;
  title: string;
  description: string;
  image: string;
  duration: string;
  students?: number;
  rating?: number;
  level: "Beginner" | "Intermediate" | "Advanced";
  category: string;
  subject: string;
  grade: string;
  gradient: string;
  instructor: string;
  price?: number;
  curriculum?: string[];
  enrolled: boolean;
}

interface CourseCardProps {
  course: Course;
  index?: number;
  onEnroll?: (courseId: string, courseName: string) => void;
  enrolling?: boolean;
  isAuthenticated?: boolean;
}

export function CourseCard({
  course,
  index = 0,
  onEnroll,
  enrolling = false,
  isAuthenticated = false,
}: CourseCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      viewport={{ once: true }}
    >
      <Card className="group overflow-hidden hover:shadow-xl transition-all duration-300 border-0 bg-background/50 backdrop-blur-sm">
        {/* Course Image */}
        <div
          className={`relative h-48 bg-gradient-to-br ${course.gradient} overflow-hidden`}
        >
          <div className="absolute inset-0 bg-black/20" />
          <div className="absolute inset-0 flex items-center justify-center">
            <Button
              size="icon"
              variant="secondary"
              className="w-12 h-12 rounded-full bg-white/90 hover:bg-white transition-all duration-300 group-hover:scale-110"
            >
              <Play className="w-5 h-5 text-primary ml-0.5" />
            </Button>
          </div>

          {/* Level Badge */}
          <div className="absolute top-4 left-4">
            <Badge
              variant="secondary"
              className="bg-white/90 text-primary hover:bg-white"
            >
              {course.level}
            </Badge>
          </div>

          {/* Enrolled Badge */}
          {course.enrolled && (
            <div className="absolute top-4 right-4">
              <Badge className="bg-green-500 text-white">
                <CheckCircle className="w-3 h-3 mr-1" />
                Enrolled
              </Badge>
            </div>
          )}

          {/* Price Badge */}
          <div className="absolute bottom-4 right-4">
            <Badge className="bg-black/70 text-white">
              <IndianRupee className="w-3 h-3 mr-1" />
              {(course.price || 0).toLocaleString()}
            </Badge>
          </div>
        </div>

        <CardHeader className="space-y-3">
          {/* Category and Subject */}
          <div className="flex items-center space-x-2">
            <Badge variant="outline" className="text-xs">
              {course.subject}
            </Badge>
            <Badge variant="secondary" className="text-xs">
              {course.grade}
            </Badge>
          </div>

          {/* Title */}
          <CardTitle className="text-xl font-semibold group-hover:text-primary transition-colors">
            {course.title}
          </CardTitle>

          {/* Instructor */}
          <p className="text-sm text-muted-foreground">
            by {course.instructor}
          </p>
        </CardHeader>

        <CardContent className="space-y-4">
          {/* Description */}
          <CardDescription className="text-muted-foreground leading-relaxed line-clamp-3">
            {course.description}
          </CardDescription>

          {/* Curriculum Preview */}
          <div>
            <p className="text-sm font-medium mb-2 flex items-center">
              <BookOpen className="w-4 h-4 mr-1" />
              What you'll learn:
            </p>
            <div className="flex flex-wrap gap-1">
              {course.curriculum.slice(0, 3).map((item, idx) => (
                <Badge key={idx} variant="outline" className="text-xs">
                  {item}
                </Badge>
              ))}
              {course.curriculum.length > 3 && (
                <Badge variant="outline" className="text-xs">
                  +{course.curriculum.length - 3} more
                </Badge>
              )}
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4 text-sm text-muted-foreground">
            <div className="flex items-center space-x-1">
              <Clock className="w-4 h-4" />
              <span>{course.duration}</span>
            </div>
            <div className="flex items-center space-x-1">
              <Users className="w-4 h-4" />
              <span>{(course.students || 0).toLocaleString()}</span>
            </div>
            <div className="flex items-center space-x-1">
              <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
              <span className="font-medium">{course.rating || "N/A"}</span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="space-y-2">
            {course.enrolled ? (
              <Button
                className={`w-full bg-gradient-to-r ${course.gradient} hover:opacity-90 text-white`}
              >
                <Play className="w-4 h-4 mr-2" />
                Continue Learning
              </Button>
            ) : (
              <>
                <Button
                  onClick={() => onEnroll && onEnroll(course.id, course.title)}
                  disabled={enrolling || !isAuthenticated}
                  className={`w-full bg-gradient-to-r ${course.gradient} hover:opacity-90 text-white`}
                >
                  {enrolling ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Enrolling...
                    </>
                  ) : (
                    <>
                      <Play className="w-4 h-4 mr-2" />
                      {isAuthenticated ? "Enroll Now" : "Sign in to Enroll"}
                    </>
                  )}
                </Button>

                {!isAuthenticated && (
                  <p className="text-xs text-center text-muted-foreground">
                    Free preview available • Full access after enrollment
                  </p>
                )}
              </>
            )}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
