import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  MessageSquare,
  Phone,
  Video,
  Calendar,
  Clock,
  Star,
  MapPin,
  Languages,
  GraduationCap,
  BookOpen,
  Users,
  Zap,
  Shield,
  Heart,
} from "lucide-react";
import { motion } from "framer-motion";

interface Teacher {
  id: string;
  name: string;
  avatar: string;
  subjects: string[];
  languages: string[];
  rating: number;
  reviews: number;
  experience: string;
  responseTime: string;
  pricePerHour: number;
  location: string;
  verified: boolean;
  availability: "online" | "busy" | "offline";
  specialties: string[];
  bio: string;
  totalStudents: number;
}

const featuredTeachers: Teacher[] = [
  {
    id: "1",
    name: "Dr. Priya Sharma",
    avatar: "",
    subjects: ["Mathematics", "Physics", "Chemistry"],
    languages: ["Hindi", "English"],
    rating: 4.9,
    reviews: 347,
    experience: "12 years",
    responseTime: "< 30 mins",
    pricePerHour: 1200,
    location: "Delhi, India",
    verified: true,
    availability: "online",
    specialties: ["IIT-JEE", "NEET", "Board Exams"],
    bio: "IIT Delhi graduate with 12+ years of teaching experience. Specialized in helping students crack competitive exams.",
    totalStudents: 1250,
  },
  {
    id: "2",
    name: "Prof. Rajesh Kumar",
    avatar: "",
    subjects: ["Computer Science", "Programming", "Data Science"],
    languages: ["English", "Hindi", "Tamil"],
    rating: 4.8,
    reviews: 289,
    experience: "8 years",
    responseTime: "< 1 hour",
    pricePerHour: 1500,
    location: "Bangalore, India",
    verified: true,
    availability: "online",
    specialties: ["Python", "Machine Learning", "Web Development"],
    bio: "Former Google engineer turned educator. Passionate about making programming accessible to everyone.",
    totalStudents: 890,
  },
  {
    id: "3",
    name: "Ms. Anjali Verma",
    avatar: "",
    subjects: ["English", "Literature", "Creative Writing"],
    languages: ["English", "Hindi"],
    rating: 4.9,
    reviews: 456,
    experience: "15 years",
    responseTime: "< 2 hours",
    pricePerHour: 900,
    location: "Mumbai, India",
    verified: true,
    availability: "busy",
    specialties: ["IELTS", "TOEFL", "Creative Writing"],
    bio: "Published author and English literature expert. Helping students excel in language skills for 15+ years.",
    totalStudents: 2100,
  },
];

const subjects = [
  "Mathematics",
  "Physics",
  "Chemistry",
  "Biology",
  "Computer Science",
  "English",
  "Hindi",
  "History",
  "Geography",
  "Economics",
  "Programming",
  "Data Science",
  "Web Development",
  "Machine Learning",
  "Art & Design",
  "Music",
  "Languages",
  "Business Studies",
];

const urgencyLevels = [
  {
    value: "immediate",
    label: "🚨 Urgent (Within 1 hour)",
    color: "text-red-600",
  },
  {
    value: "today",
    label: "⚡ Today (Within 24 hours)",
    color: "text-orange-600",
  },
  { value: "week", label: "📅 This Week", color: "text-blue-600" },
  { value: "flexible", label: "🕐 Flexible", color: "text-green-600" },
];

export default function StudentTeacherConnect() {
  const [selectedTeacher, setSelectedTeacher] = useState<Teacher | null>(null);
  const [showContactForm, setShowContactForm] = useState(false);
  const [contactForm, setContactForm] = useState({
    subject: "",
    urgency: "",
    message: "",
    preferredTime: "",
    sessionType: "video",
  });

  const handleContactTeacher = (teacher: Teacher) => {
    setSelectedTeacher(teacher);
    setShowContactForm(true);
  };

  const handleSendMessage = () => {
    // Handle message sending logic
    console.log("Sending message to", selectedTeacher?.name, contactForm);
    // Reset form and close
    setShowContactForm(false);
    setContactForm({
      subject: "",
      urgency: "",
      message: "",
      preferredTime: "",
      sessionType: "video",
    });
  };

  const getAvailabilityColor = (availability: string) => {
    switch (availability) {
      case "online":
        return "bg-green-500";
      case "busy":
        return "bg-blue-500";
      case "offline":
        return "bg-gray-500";
      default:
        return "bg-gray-500";
    }
  };

  const getAvailabilityText = (availability: string) => {
    switch (availability) {
      case "online":
        return "Available Now";
      case "busy":
        return "Busy";
      case "offline":
        return "Offline";
      default:
        return "Unknown";
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
          <div className="flex items-center justify-center space-x-2 mb-4">
            <div className="w-12 h-12 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-full flex items-center justify-center">
              <MessageSquare className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold">
              <span className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
                Connect with Expert Teachers
              </span>
            </h1>
          </div>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            🎓 Get personalized 1-on-1 assistance from verified teachers across
            India! Ask questions, book sessions, or get instant help - anytime,
            anywhere! 📚✨
          </p>
        </motion.div>

        {/* Quick Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12"
        >
          <div className="text-center">
            <div className="text-3xl font-bold text-blue-500">5,000+</div>
            <div className="text-sm text-muted-foreground">
              Verified Teachers
            </div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-purple-500">50+</div>
            <div className="text-sm text-muted-foreground">Subjects</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-pink-500">24/7</div>
            <div className="text-sm text-muted-foreground">Availability</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-green-500">&lt; 30min</div>
            <div className="text-sm text-muted-foreground">Avg Response</div>
          </div>
        </motion.div>

        {/* Featured Teachers */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-12"
        >
          <h2 className="text-2xl font-bold mb-8 text-center">
            ⭐ Top-Rated Teachers Available Now
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredTeachers.map((teacher, index) => (
              <motion.div
                key={teacher.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 * index }}
              >
                <Card className="h-full hover:shadow-xl transition-all duration-300 border-0 bg-background/50 backdrop-blur-sm">
                  <CardHeader className="space-y-4">
                    {/* Teacher Profile */}
                    <div className="flex items-start space-x-4">
                      <div className="relative">
                        <Avatar className="w-16 h-16">
                          <AvatarFallback className="bg-gradient-to-r from-blue-500 to-purple-500 text-white text-lg">
                            {teacher.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div
                          className={`absolute -bottom-1 -right-1 w-4 h-4 ${getAvailabilityColor(teacher.availability)} rounded-full border-2 border-white`}
                        />
                      </div>

                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-1">
                          <h3 className="text-lg font-semibold">
                            {teacher.name}
                          </h3>
                          {teacher.verified && (
                            <Badge className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100">
                              <Shield className="w-3 h-3 mr-1" />
                              Verified
                            </Badge>
                          )}
                        </div>

                        <div className="flex items-center space-x-4 text-sm text-muted-foreground mb-2">
                          <div className="flex items-center space-x-1">
                            <Star className="w-4 h-4 fill-blue-400 text-blue-400" />
                            <span>
                              {teacher.rating} ({teacher.reviews})
                            </span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Clock className="w-4 h-4" />
                            <span>{teacher.experience}</span>
                          </div>
                        </div>

                        <div className="flex items-center space-x-2 text-xs">
                          <div
                            className={`w-2 h-2 ${getAvailabilityColor(teacher.availability)} rounded-full`}
                          />
                          <span className="text-muted-foreground">
                            {getAvailabilityText(teacher.availability)}
                          </span>
                          <span className="text-muted-foreground">
                            • Responds {teacher.responseTime}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Subjects */}
                    <div className="flex flex-wrap gap-2">
                      {teacher.subjects.slice(0, 3).map((subject) => (
                        <Badge
                          key={subject}
                          variant="secondary"
                          className="text-xs"
                        >
                          {subject}
                        </Badge>
                      ))}
                      {teacher.subjects.length > 3 && (
                        <Badge variant="secondary" className="text-xs">
                          +{teacher.subjects.length - 3} more
                        </Badge>
                      )}
                    </div>
                  </CardHeader>

                  <CardContent className="space-y-4">
                    {/* Bio */}
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {teacher.bio}
                    </p>

                    {/* Specialties */}
                    <div>
                      <p className="text-sm font-medium mb-2">Specialties:</p>
                      <div className="flex flex-wrap gap-1">
                        {teacher.specialties.map((specialty) => (
                          <Badge
                            key={specialty}
                            className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100 text-xs"
                          >
                            {specialty}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    {/* Stats */}
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div className="flex items-center space-x-2">
                        <MapPin className="w-4 h-4 text-muted-foreground" />
                        <span>{teacher.location}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Users className="w-4 h-4 text-muted-foreground" />
                        <span>{teacher.totalStudents} students</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Languages className="w-4 h-4 text-muted-foreground" />
                        <span>{teacher.languages.join(", ")}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className="text-lg font-bold text-green-600">
                          ₹{teacher.pricePerHour}/hr
                        </span>
                      </div>
                    </div>

                    {/* Contact Buttons */}
                    <div className="grid grid-cols-2 gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleContactTeacher(teacher)}
                        className="flex items-center space-x-1"
                      >
                        <MessageSquare className="w-4 h-4" />
                        <span>Message</span>
                      </Button>
                      <Button
                        size="sm"
                        className="bg-gradient-to-r from-blue-500 to-purple-500 hover:opacity-90 text-white"
                      >
                        <Video className="w-4 h-4 mr-1" />
                        Book Session
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Contact Form Modal */}
        {showContactForm && selectedTeacher && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
            onClick={() => setShowContactForm(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-2xl"
            >
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Avatar className="w-10 h-10">
                      <AvatarFallback className="bg-gradient-to-r from-blue-500 to-purple-500 text-white">
                        {selectedTeacher.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <span>Contact {selectedTeacher.name}</span>
                      <p className="text-sm text-muted-foreground font-normal">
                        Usually responds {selectedTeacher.responseTime}
                      </p>
                    </div>
                  </CardTitle>
                </CardHeader>

                <CardContent className="space-y-4">
                  {/* Subject */}
                  <div className="space-y-2">
                    <Label htmlFor="subject">Subject/Topic</Label>
                    <Select
                      value={contactForm.subject}
                      onValueChange={(value) =>
                        setContactForm({ ...contactForm, subject: value })
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="What do you need help with?" />
                      </SelectTrigger>
                      <SelectContent>
                        {subjects.map((subject) => (
                          <SelectItem key={subject} value={subject}>
                            {subject}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Urgency */}
                  <div className="space-y-2">
                    <Label htmlFor="urgency">How urgent is this?</Label>
                    <Select
                      value={contactForm.urgency}
                      onValueChange={(value) =>
                        setContactForm({ ...contactForm, urgency: value })
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select urgency level" />
                      </SelectTrigger>
                      <SelectContent>
                        {urgencyLevels.map((level) => (
                          <SelectItem key={level.value} value={level.value}>
                            <span className={level.color}>{level.label}</span>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Message */}
                  <div className="space-y-2">
                    <Label htmlFor="message">Your Question/Message</Label>
                    <Textarea
                      id="message"
                      placeholder="Describe your question or what kind of help you need..."
                      rows={4}
                      value={contactForm.message}
                      onChange={(e) =>
                        setContactForm({
                          ...contactForm,
                          message: e.target.value,
                        })
                      }
                    />
                  </div>

                  {/* Session Type */}
                  <div className="space-y-2">
                    <Label>Preferred Session Type</Label>
                    <div className="flex space-x-2">
                      <Button
                        type="button"
                        variant={
                          contactForm.sessionType === "video"
                            ? "default"
                            : "outline"
                        }
                        size="sm"
                        onClick={() =>
                          setContactForm({
                            ...contactForm,
                            sessionType: "video",
                          })
                        }
                      >
                        <Video className="w-4 h-4 mr-1" />
                        Video Call
                      </Button>
                      <Button
                        type="button"
                        variant={
                          contactForm.sessionType === "audio"
                            ? "default"
                            : "outline"
                        }
                        size="sm"
                        onClick={() =>
                          setContactForm({
                            ...contactForm,
                            sessionType: "audio",
                          })
                        }
                      >
                        <Phone className="w-4 h-4 mr-1" />
                        Audio Call
                      </Button>
                      <Button
                        type="button"
                        variant={
                          contactForm.sessionType === "chat"
                            ? "default"
                            : "outline"
                        }
                        size="sm"
                        onClick={() =>
                          setContactForm({
                            ...contactForm,
                            sessionType: "chat",
                          })
                        }
                      >
                        <MessageSquare className="w-4 h-4 mr-1" />
                        Chat Only
                      </Button>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex space-x-2 pt-4">
                    <Button
                      variant="outline"
                      onClick={() => setShowContactForm(false)}
                      className="flex-1"
                    >
                      Cancel
                    </Button>
                    <Button
                      onClick={handleSendMessage}
                      disabled={!contactForm.subject || !contactForm.message}
                      className="flex-1 bg-gradient-to-r from-blue-500 to-purple-500 hover:opacity-90"
                    >
                      <Heart className="w-4 h-4 mr-2" />
                      Send Message
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>
        )}

        {/* How it Works */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-16"
        >
          <h2 className="text-2xl font-bold text-center mb-8">
            🤝 How Student-Teacher Connect Works
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white font-bold text-xl">1</span>
              </div>
              <h3 className="font-semibold mb-2">Find Your Teacher</h3>
              <p className="text-muted-foreground text-sm">
                Browse verified teachers by subject, location, rating, and
                availability
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white font-bold text-xl">2</span>
              </div>
              <h3 className="font-semibold mb-2">Send Your Question</h3>
              <p className="text-muted-foreground text-sm">
                Describe your problem, set urgency level, and choose session
                type
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-pink-500 to-red-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white font-bold text-xl">3</span>
              </div>
              <h3 className="font-semibold mb-2">Get Help Instantly</h3>
              <p className="text-muted-foreground text-sm">
                Connect via chat, audio, or video call and solve your doubts
                immediately
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
