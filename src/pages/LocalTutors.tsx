import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  MapPin,
  Search,
  Star,
  Clock,
  Users,
  Phone,
  Mail,
  Navigation,
  IndianRupee,
  MessageCircle,
  Calendar,
  Award,
  BookOpen,
  CheckCircle,
} from "lucide-react";
import { motion } from "framer-motion";

// Indian States and Major Cities
const indianLocations = {
  Delhi: [
    "New Delhi",
    "South Delhi",
    "North Delhi",
    "East Delhi",
    "West Delhi",
    "Central Delhi",
  ],
  Mumbai: ["Andheri", "Bandra", "Juhu", "Powai", "Thane", "Navi Mumbai"],
  Bangalore: [
    "Whitefield",
    "Koramangala",
    "Indiranagar",
    "HSR Layout",
    "Electronic City",
    "Marathahalli",
  ],
  Chennai: ["T. Nagar", "Adyar", "Velachery", "Anna Nagar", "Tambaram", "OMR"],
  Hyderabad: [
    "Hitech City",
    "Gachibowli",
    "Madhapur",
    "Secunderabad",
    "Jubilee Hills",
    "Kondapur",
  ],
  Pune: ["Hinjewadi", "Aundh", "Kothrud", "Wakad", "Viman Nagar", "Hadapsar"],
  Kolkata: [
    "Salt Lake",
    "Park Street",
    "Howrah",
    "New Town",
    "Ballygunge",
    "Rajarhat",
  ],
  Ahmedabad: [
    "Bopal",
    "Prahladnagar",
    "Satellite",
    "Vastrapur",
    "Maninagar",
    "Ghatlodia",
  ],
  Jaipur: [
    "Malviya Nagar",
    "C-Scheme",
    "Vaishali Nagar",
    "Raja Park",
    "Mansarovar",
    "Jagatpura",
  ],
  Lucknow: [
    "Gomti Nagar",
    "Hazratganj",
    "Indira Nagar",
    "Aliganj",
    "Mahanagar",
    "Alambagh",
  ],
};

interface LocalTutor {
  id: string;
  name: string;
  avatar: string;
  subjects: string[];
  rating: number;
  reviews: number;
  experience: string;
  hourlyRate: number;
  location: {
    city: string;
    area: string;
    distance: string;
  };
  availability: string[];
  languages: string[];
  qualifications: string[];
  verified: boolean;
  responseTime: string;
  phoneNumber: string;
  email: string;
  bio: string;
  specializations: string[];
}

const localTutors: LocalTutor[] = [
  {
    id: "1",
    name: "Priya Sharma",
    avatar: "",
    subjects: ["Mathematics", "Physics", "Chemistry"],
    rating: 4.9,
    reviews: 127,
    experience: "8 years",
    hourlyRate: 800,
    location: {
      city: "Delhi",
      area: "South Delhi",
      distance: "2.3 km away",
    },
    availability: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
    languages: ["Hindi", "English"],
    qualifications: ["M.Sc Physics (DU)", "B.Ed"],
    verified: true,
    responseTime: "< 2 hours",
    phoneNumber: "+91 98765 43210",
    email: "priya.sharma@email.com",
    bio: "Experienced tutor specializing in IIT-JEE preparation with 95% success rate.",
    specializations: ["IIT-JEE", "NEET", "CBSE Board"],
  },
  {
    id: "2",
    name: "Rajesh Kumar",
    avatar: "",
    subjects: ["Computer Science", "Programming", "Data Structures"],
    rating: 4.8,
    reviews: 89,
    experience: "6 years",
    hourlyRate: 1200,
    location: {
      city: "Bangalore",
      area: "Koramangala",
      distance: "1.8 km away",
    },
    availability: ["Monday", "Wednesday", "Friday", "Saturday", "Sunday"],
    languages: ["English", "Hindi", "Kannada"],
    qualifications: ["B.Tech CSE (IIT Delhi)", "Software Engineer at Google"],
    verified: true,
    responseTime: "< 1 hour",
    phoneNumber: "+91 87654 32109",
    email: "rajesh.kumar@email.com",
    bio: "Software engineer turned educator, helping students master programming concepts.",
    specializations: ["Programming", "Competitive Coding", "Interview Prep"],
  },
  {
    id: "3",
    name: "Dr. Anjali Patel",
    avatar: "",
    subjects: ["Biology", "Chemistry", "Medical Science"],
    rating: 4.9,
    reviews: 156,
    experience: "12 years",
    hourlyRate: 1000,
    location: {
      city: "Mumbai",
      area: "Andheri",
      distance: "3.5 km away",
    },
    availability: ["Tuesday", "Thursday", "Saturday", "Sunday"],
    languages: ["English", "Hindi", "Gujarati", "Marathi"],
    qualifications: [
      "MBBS",
      "MD (Pediatrics)",
      "Former Medical College Professor",
    ],
    verified: true,
    responseTime: "< 3 hours",
    phoneNumber: "+91 76543 21098",
    email: "dr.anjali@email.com",
    bio: "Medical doctor with expertise in teaching NEET aspirants and medical students.",
    specializations: ["NEET", "Medical Entrance", "MBBS Subjects"],
  },
];

export default function LocalTutors() {
  const [userLocation, setUserLocation] = useState("");
  const [selectedCity, setSelectedCity] = useState("");
  const [selectedArea, setSelectedArea] = useState("");
  const [searchSubject, setSearchSubject] = useState("");
  const [filteredTutors, setFilteredTutors] = useState(localTutors);

  // Get user's current location
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          // In a real app, you'd use reverse geocoding to get the location name
          setUserLocation("Current Location Detected");
        },
        (error) => {
          console.log("Location access denied");
        },
      );
    }
  }, []);

  // Filter tutors based on location and subject
  useEffect(() => {
    let filtered = localTutors;

    if (selectedCity) {
      filtered = filtered.filter(
        (tutor) => tutor.location.city === selectedCity,
      );
    }

    if (selectedArea) {
      filtered = filtered.filter(
        (tutor) => tutor.location.area === selectedArea,
      );
    }

    if (searchSubject) {
      filtered = filtered.filter((tutor) =>
        tutor.subjects.some((subject) =>
          subject.toLowerCase().includes(searchSubject.toLowerCase()),
        ),
      );
    }

    setFilteredTutors(filtered);
  }, [selectedCity, selectedArea, searchSubject]);

  const handleContactTutor = (
    tutor: LocalTutor,
    method: "phone" | "email" | "chat",
  ) => {
    switch (method) {
      case "phone":
        window.open(`tel:${tutor.phoneNumber}`);
        break;
      case "email":
        window.open(`mailto:${tutor.email}`);
        break;
      case "chat":
        // Implement chat functionality
        console.log("Opening chat with", tutor.name);
        break;
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
            <div className="w-12 h-12 bg-gradient-to-r from-orange-500 via-red-500 to-pink-500 rounded-full flex items-center justify-center">
              <MapPin className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold">
              <span className="bg-gradient-to-r from-orange-500 via-red-500 to-pink-500 bg-clip-text text-transparent">
                Local Tutors Near You
              </span>
            </h1>
          </div>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            🇮🇳 Find verified tutors in your city! In-person or online sessions
            with local experts across India. Connect with tutors who understand
            your local curriculum! 📍
          </p>

          {userLocation && (
            <Badge className="mt-4 bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100">
              <Navigation className="w-4 h-4 mr-2" />
              {userLocation}
            </Badge>
          )}
        </motion.div>

        {/* Location and Search Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mb-8 space-y-4"
        >
          {/* Location Selectors */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Select value={selectedCity} onValueChange={setSelectedCity}>
              <SelectTrigger>
                <SelectValue placeholder="Select City" />
              </SelectTrigger>
              <SelectContent>
                {Object.keys(indianLocations).map((city) => (
                  <SelectItem key={city} value={city}>
                    📍 {city}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select
              value={selectedArea}
              onValueChange={setSelectedArea}
              disabled={!selectedCity}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select Area" />
              </SelectTrigger>
              <SelectContent>
                {selectedCity &&
                  indianLocations[
                    selectedCity as keyof typeof indianLocations
                  ].map((area) => (
                    <SelectItem key={area} value={area}>
                      📍 {area}
                    </SelectItem>
                  ))}
              </SelectContent>
            </Select>

            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search by subject..."
                value={searchSubject}
                onChange={(e) => setSearchSubject(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
        </motion.div>

        {/* Results */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="space-y-6"
        >
          {/* Results count */}
          <div className="flex items-center justify-between">
            <p className="text-muted-foreground">
              Found {filteredTutors.length} tutor
              {filteredTutors.length !== 1 ? "s" : ""} near you
            </p>
            <Button variant="outline" size="sm">
              <MapPin className="w-4 h-4 mr-2" />
              View on Map
            </Button>
          </div>

          {/* Tutors List */}
          <div className="space-y-4">
            {filteredTutors.map((tutor, index) => (
              <motion.div
                key={tutor.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 * index }}
              >
                <Card className="border-0 bg-background/50 backdrop-blur-sm hover:shadow-lg transition-all duration-300">
                  <CardContent className="p-6">
                    <div className="flex flex-col lg:flex-row gap-6">
                      {/* Left: Tutor Info */}
                      <div className="flex-1">
                        <div className="flex items-start space-x-4 mb-4">
                          <Avatar className="w-16 h-16">
                            <AvatarFallback className="bg-gradient-to-r from-orange-500 to-pink-500 text-white text-lg">
                              {tutor.name
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                            </AvatarFallback>
                          </Avatar>

                          <div className="flex-1">
                            <div className="flex items-center space-x-2 mb-1">
                              <h3 className="text-xl font-semibold">
                                {tutor.name}
                              </h3>
                              {tutor.verified && (
                                <Badge className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100">
                                  <CheckCircle className="w-3 h-3 mr-1" />
                                  Verified
                                </Badge>
                              )}
                            </div>

                            <div className="flex items-center space-x-4 text-sm text-muted-foreground mb-2">
                              <div className="flex items-center space-x-1">
                                <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                                <span>
                                  {tutor.rating} ({tutor.reviews} reviews)
                                </span>
                              </div>
                              <div className="flex items-center space-x-1">
                                <Clock className="w-4 h-4" />
                                <span>{tutor.experience} experience</span>
                              </div>
                              <div className="flex items-center space-x-1">
                                <MapPin className="w-4 h-4" />
                                <span>{tutor.location.distance}</span>
                              </div>
                            </div>

                            <p className="text-sm text-muted-foreground mb-3">
                              {tutor.bio}
                            </p>

                            {/* Subjects */}
                            <div className="flex flex-wrap gap-2 mb-3">
                              {tutor.subjects.map((subject) => (
                                <Badge
                                  key={subject}
                                  variant="secondary"
                                  className="text-xs"
                                >
                                  {subject}
                                </Badge>
                              ))}
                            </div>

                            {/* Qualifications */}
                            <div className="flex flex-wrap gap-2 mb-3">
                              {tutor.qualifications.map((qual) => (
                                <Badge
                                  key={qual}
                                  variant="outline"
                                  className="text-xs"
                                >
                                  <Award className="w-3 h-3 mr-1" />
                                  {qual}
                                </Badge>
                              ))}
                            </div>

                            {/* Specializations */}
                            <div className="flex flex-wrap gap-2">
                              {tutor.specializations.map((spec) => (
                                <Badge
                                  key={spec}
                                  className="bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-100 text-xs"
                                >
                                  🎯 {spec}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Right: Contact & Pricing */}
                      <div className="lg:w-80 space-y-4">
                        {/* Pricing */}
                        <Card className="border border-orange-200 dark:border-orange-800">
                          <CardContent className="p-4">
                            <div className="text-center mb-4">
                              <div className="flex items-center justify-center space-x-1">
                                <IndianRupee className="w-6 h-6 text-orange-500" />
                                <span className="text-3xl font-bold">
                                  {tutor.hourlyRate}
                                </span>
                                <span className="text-muted-foreground">
                                  /hour
                                </span>
                              </div>
                              <p className="text-sm text-muted-foreground">
                                Responds in {tutor.responseTime}
                              </p>
                            </div>

                            {/* Contact Buttons */}
                            <div className="grid grid-cols-2 gap-2 mb-3">
                              <Button
                                size="sm"
                                onClick={() =>
                                  handleContactTutor(tutor, "phone")
                                }
                                className="bg-green-500 hover:bg-green-600 text-white"
                              >
                                <Phone className="w-4 h-4 mr-1" />
                                Call
                              </Button>
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() =>
                                  handleContactTutor(tutor, "chat")
                                }
                              >
                                <MessageCircle className="w-4 h-4 mr-1" />
                                Chat
                              </Button>
                            </div>

                            <Button
                              className="w-full bg-gradient-to-r from-orange-500 to-pink-500 hover:opacity-90"
                              onClick={() => handleContactTutor(tutor, "email")}
                            >
                              <Calendar className="w-4 h-4 mr-2" />
                              Book Session
                            </Button>
                          </CardContent>
                        </Card>

                        {/* Additional Info */}
                        <div className="space-y-2 text-sm">
                          <div className="flex items-center space-x-2">
                            <BookOpen className="w-4 h-4 text-muted-foreground" />
                            <span>Languages: {tutor.languages.join(", ")}</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <MapPin className="w-4 h-4 text-muted-foreground" />
                            <span>
                              {tutor.location.area}, {tutor.location.city}
                            </span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Clock className="w-4 h-4 text-muted-foreground" />
                            <span>
                              Available:{" "}
                              {tutor.availability.slice(0, 3).join(", ")}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* No results */}
        {filteredTutors.length === 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-center py-16"
          >
            <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
              <MapPin className="w-6 h-6 text-muted-foreground" />
            </div>
            <h3 className="text-lg font-semibold mb-2">
              No tutors found in your area
            </h3>
            <p className="text-muted-foreground mb-4">
              Try expanding your search to nearby areas or different subjects.
            </p>
            <Button
              onClick={() => {
                setSelectedCity("");
                setSelectedArea("");
                setSearchSubject("");
              }}
            >
              Clear Filters
            </Button>
          </motion.div>
        )}

        {/* Become a Tutor CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-16"
        >
          <Card className="border-0 bg-gradient-to-r from-orange-500/10 via-red-500/10 to-pink-500/10 backdrop-blur-sm">
            <CardContent className="p-8 text-center">
              <h3 className="text-2xl font-bold mb-4">
                🎓 Are you an expert in your field?
              </h3>
              <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
                Join thousands of tutors earning ₹500-₹2000 per hour! Share your
                knowledge and help students in your city succeed.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-orange-500 via-red-500 to-pink-500"
                >
                  🚀 Become a Local Tutor
                </Button>
                <Button size="lg" variant="outline">
                  📞 Learn More
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
