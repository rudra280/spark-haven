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
import { Clock, Users, Star, Play } from "lucide-react";
import { motion } from "framer-motion";

interface Course {
  id: string;
  title: string;
  description: string;
  image: string;
  duration: string;
  students: number;
  rating: number;
  level: "Beginner" | "Intermediate" | "Advanced";
  category: string;
  gradient: string;
}

interface CourseCardProps {
  course: Course;
  index?: number;
}

export function CourseCard({ course, index = 0 }: CourseCardProps) {
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
        </div>

        <CardHeader className="space-y-3">
          {/* Category */}
          <Badge variant="outline" className="w-fit text-xs">
            {course.category}
          </Badge>

          {/* Title */}
          <CardTitle className="text-xl font-semibold group-hover:text-primary transition-colors">
            {course.title}
          </CardTitle>
        </CardHeader>

        <CardContent className="space-y-4">
          {/* Description */}
          <CardDescription className="text-muted-foreground leading-relaxed">
            {course.description}
          </CardDescription>

          {/* Stats */}
          <div className="flex items-center justify-between text-sm text-muted-foreground">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-1">
                <Clock className="w-4 h-4" />
                <span>{course.duration}</span>
              </div>
              <div className="flex items-center space-x-1">
                <Users className="w-4 h-4" />
                <span>{course.students.toLocaleString()}</span>
              </div>
            </div>

            <div className="flex items-center space-x-1">
              <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
              <span className="font-medium">{course.rating}</span>
            </div>
          </div>

          {/* CTA Button */}
          <Button className="w-full bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-600 hover:to-purple-600 text-white">
            Watch Now →
          </Button>
        </CardContent>
      </Card>
    </motion.div>
  );
}
