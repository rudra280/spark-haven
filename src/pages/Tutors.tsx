import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Star, Clock, Calendar, Users, Search, Filter } from "lucide-react";
import { motion } from "framer-motion";

interface Tutor {
  id: string;
  name: string;
  avatar: string;
  specialties: string[];
  rating: number;
  reviews: number;
  experience: string;
  hourlyRate: number;
  availability: string;
  bio: string;
}

const tutors: Tutor[] = [
  {
    id: "1",
    name: "Dr. Sarah Chen",
    avatar: "",
    specialties: ["Python", "Machine Learning", "Data Science"],
    rating: 4.9,
    reviews: 127,
    experience: "8 years",
    hourlyRate: 65,
    availability: "Available Today",
    bio: "PhD in Computer Science with expertise in AI and machine learning. Helped 500+ students master programming.",
  },
  {
    id: "2",
    name: "Alex Rodriguez",
    avatar: "",
    specialties: ["UX Design", "Figma", "User Research"],
    rating: 4.8,
    reviews: 89,
    experience: "6 years",
    hourlyRate: 55,
    availability: "Available Tomorrow",
    bio: "Senior UX Designer at top tech companies. Specializes in design thinking and user-centered design.",
  },
  {
    id: "3",
    name: "Emily Johnson",
    avatar: "",
    specialties: ["Finance", "Investment", "Economics"],
    rating: 4.9,
    reviews: 156,
    experience: "10 years",
    hourlyRate: 70,
    availability: "Available Today",
    bio: "Former Wall Street analyst turned educator. Simplifies complex financial concepts for students.",
  },
  {
    id: "4",
    name: "Prof. Michael Kim",
    avatar: "",
    specialties: ["JavaScript", "React", "Web Development"],
    rating: 4.7,
    reviews: 203,
    experience: "12 years",
    hourlyRate: 60,
    availability: "Available This Week",
    bio: "Full-stack developer and computer science professor. Expert in modern web technologies.",
  },
  {
    id: "5",
    name: "Lisa Thompson",
    avatar: "",
    specialties: ["Digital Marketing", "SEO", "Content Strategy"],
    rating: 4.8,
    reviews: 94,
    experience: "7 years",
    hourlyRate: 50,
    availability: "Available Today",
    bio: "Marketing strategist who has helped hundreds of businesses grow their online presence.",
  },
  {
    id: "6",
    name: "Dr. James Wilson",
    avatar: "",
    specialties: ["Business Strategy", "Entrepreneurship", "Leadership"],
    rating: 4.9,
    reviews: 178,
    experience: "15 years",
    hourlyRate: 80,
    availability: "Available Tomorrow",
    bio: "Former CEO and business consultant. Teaches practical business skills and entrepreneurship.",
  },
];

export default function Tutors() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSpecialty, setSelectedSpecialty] = useState("all");
  const [sortBy, setSortBy] = useState("rating");

  const specialties = [
    "all",
    ...Array.from(new Set(tutors.flatMap((tutor) => tutor.specialties))),
  ];

  const filteredTutors = tutors
    .filter((tutor) => {
      const matchesSearch =
        tutor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        tutor.specialties.some((s) =>
          s.toLowerCase().includes(searchQuery.toLowerCase()),
        );
      const matchesSpecialty =
        selectedSpecialty === "all" ||
        tutor.specialties.includes(selectedSpecialty);
      return matchesSearch && matchesSpecialty;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "rating":
          return b.rating - a.rating;
        case "price-low":
          return a.hourlyRate - b.hourlyRate;
        case "price-high":
          return b.hourlyRate - a.hourlyRate;
        case "experience":
          return parseInt(b.experience) - parseInt(a.experience);
        default:
          return 0;
      }
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
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="bg-gradient-to-r from-cyan-500 to-purple-500 bg-clip-text text-transparent">
              Expert Tutors
            </span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Connect with certified experts for personalized 1-on-1 learning
            sessions. Book your session today.
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
              placeholder="Search tutors or subjects..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>

          {/* Filters */}
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Select
              value={selectedSpecialty}
              onValueChange={setSelectedSpecialty}
            >
              <SelectTrigger className="w-48">
                <SelectValue placeholder="All Specialties" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Specialties</SelectItem>
                {specialties.slice(1).map((specialty) => (
                  <SelectItem key={specialty} value={specialty}>
                    {specialty}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="rating">Highest Rated</SelectItem>
                <SelectItem value="price-low">Price: Low to High</SelectItem>
                <SelectItem value="price-high">Price: High to Low</SelectItem>
                <SelectItem value="experience">Most Experience</SelectItem>
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
            Showing {filteredTutors.length} tutor
            {filteredTutors.length !== 1 ? "s" : ""}
          </p>
        </motion.div>

        {/* Tutors Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {filteredTutors.map((tutor, index) => (
            <motion.div
              key={tutor.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 * index }}
            >
              <Card className="h-full hover:shadow-lg transition-all duration-300 border-0 bg-background/50 backdrop-blur-sm">
                <CardHeader className="space-y-4">
                  {/* Tutor Info */}
                  <div className="flex items-start space-x-3">
                    <Avatar className="w-12 h-12">
                      <AvatarImage src={tutor.avatar} alt={tutor.name} />
                      <AvatarFallback className="bg-gradient-to-r from-cyan-500 to-purple-500 text-white">
                        {tutor.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <CardTitle className="text-lg">{tutor.name}</CardTitle>
                      <div className="flex items-center space-x-2 mt-1">
                        <div className="flex items-center space-x-1">
                          <Star className="w-4 h-4 fill-blue-400 text-blue-400" />
                          <span className="text-sm font-medium">
                            {tutor.rating}
                          </span>
                          <span className="text-sm text-muted-foreground">
                            ({tutor.reviews} reviews)
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Specialties */}
                  <div className="flex flex-wrap gap-2">
                    {tutor.specialties.map((specialty) => (
                      <Badge
                        key={specialty}
                        variant="secondary"
                        className="text-xs"
                      >
                        {specialty}
                      </Badge>
                    ))}
                  </div>
                </CardHeader>

                <CardContent className="space-y-4">
                  {/* Bio */}
                  <CardDescription className="text-sm leading-relaxed">
                    {tutor.bio}
                  </CardDescription>

                  {/* Stats */}
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div className="flex items-center space-x-2">
                      <Clock className="w-4 h-4 text-muted-foreground" />
                      <span>{tutor.experience} exp</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Calendar className="w-4 h-4 text-muted-foreground" />
                      <span className="text-green-600">
                        {tutor.availability}
                      </span>
                    </div>
                  </div>

                  {/* Price and CTA */}
                  <div className="flex items-center justify-between pt-4 border-t">
                    <div>
                      <span className="text-2xl font-bold">
                        ${tutor.hourlyRate}
                      </span>
                      <span className="text-muted-foreground">/hour</span>
                    </div>
                    <Button className="bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-600 hover:to-purple-600 text-white">
                      Book Session
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* No Results */}
        {filteredTutors.length === 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-center py-16"
          >
            <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
              <Users className="w-6 h-6 text-muted-foreground" />
            </div>
            <h3 className="text-lg font-semibold mb-2">No tutors found</h3>
            <p className="text-muted-foreground mb-4">
              Try adjusting your search criteria or browse all tutors.
            </p>
            <Button
              onClick={() => {
                setSearchQuery("");
                setSelectedSpecialty("all");
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
