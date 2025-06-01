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
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  BookOpen,
  Download,
  Search,
  Filter,
  Star,
  Eye,
  Calendar,
  Users,
  Globe,
  GraduationCap,
  School,
  University,
  FileText,
  Video,
  Image,
  Headphones,
  ChevronRight,
} from "lucide-react";
import { motion } from "framer-motion";

// Academic Levels
const academicLevels = {
  primary: {
    name: "Primary School",
    icon: School,
    grades: [
      "Nursery",
      "LKG",
      "UKG",
      "Class 1",
      "Class 2",
      "Class 3",
      "Class 4",
      "Class 5",
    ],
    color: "from-green-500 to-emerald-500",
  },
  secondary: {
    name: "Secondary School",
    icon: GraduationCap,
    grades: ["Class 6", "Class 7", "Class 8", "Class 9", "Class 10"],
    color: "from-blue-500 to-cyan-500",
  },
  higher: {
    name: "Higher Secondary",
    icon: University,
    grades: ["Class 11", "Class 12"],
    color: "from-purple-500 to-violet-500",
  },
  undergraduate: {
    name: "Undergraduate",
    icon: University,
    grades: ["1st Year", "2nd Year", "3rd Year", "4th Year"],
    color: "from-orange-500 to-red-500",
  },
  postgraduate: {
    name: "Postgraduate",
    icon: University,
    grades: ["Master's 1st Year", "Master's 2nd Year", "PhD", "Research"],
    color: "from-pink-500 to-rose-500",
  },
};

// Subjects by level
const subjectsByLevel = {
  primary: [
    "English",
    "Hindi",
    "Mathematics",
    "Science",
    "Social Studies",
    "Art & Craft",
    "Physical Education",
    "Moral Science",
  ],
  secondary: [
    "English",
    "Hindi",
    "Mathematics",
    "Science",
    "Social Science",
    "Computer Science",
    "Sanskrit",
    "Art Education",
    "Physical Education",
  ],
  higher: [
    "Physics",
    "Chemistry",
    "Biology",
    "Mathematics",
    "English",
    "Hindi",
    "History",
    "Geography",
    "Economics",
    "Political Science",
    "Computer Science",
    "Psychology",
    "Sociology",
  ],
  undergraduate: [
    "Engineering",
    "Medical Sciences",
    "Commerce",
    "Arts & Humanities",
    "Science",
    "Law",
    "Management",
    "Computer Applications",
    "Agriculture",
    "Pharmacy",
  ],
  postgraduate: [
    "Specialized Research",
    "Advanced Studies",
    "Thesis Work",
    "Clinical Practice",
    "Industry Projects",
  ],
};

// Sample study materials
const studyMaterials = [
  {
    id: "1",
    title: "NCERT Class 10 Mathematics - Complete Solutions",
    subject: "Mathematics",
    level: "secondary",
    grade: "Class 10",
    chapter: "Real Numbers",
    university: "NCERT (India)",
    type: "PDF",
    pages: 156,
    downloads: 245680,
    rating: 4.9,
    uploadedBy: "NCERT Official",
    verified: true,
    language: "English",
    topics: [
      "Real Numbers",
      "Polynomials",
      "Pair of Linear Equations",
      "Quadratic Equations",
    ],
  },
  {
    id: "2",
    title: "Oxford English Grammar - Advanced Level",
    subject: "English",
    level: "higher",
    grade: "Class 12",
    chapter: "Advanced Grammar",
    university: "Oxford University Press",
    type: "PDF",
    pages: 289,
    downloads: 189456,
    rating: 4.8,
    uploadedBy: "Oxford Education",
    verified: true,
    language: "English",
    topics: ["Complex Sentences", "Tenses", "Voice", "Reported Speech"],
  },
  {
    id: "3",
    title: "IIT-JEE Physics - Mechanics Complete Notes",
    subject: "Physics",
    level: "higher",
    grade: "Class 11",
    chapter: "Mechanics",
    university: "IIT Delhi",
    type: "PDF",
    pages: 234,
    downloads: 567890,
    rating: 4.9,
    uploadedBy: "IIT Delhi Physics Dept",
    verified: true,
    language: "English",
    topics: [
      "Kinematics",
      "Dynamics",
      "Work Energy Power",
      "Rotational Motion",
    ],
  },
  {
    id: "4",
    title: "Computer Science Data Structures - MIT Lectures",
    subject: "Computer Science",
    level: "undergraduate",
    grade: "2nd Year",
    chapter: "Data Structures & Algorithms",
    university: "MIT",
    type: "Video",
    duration: "12 hours",
    downloads: 123456,
    rating: 4.9,
    uploadedBy: "MIT OpenCourseWare",
    verified: true,
    language: "English",
    topics: [
      "Arrays",
      "Linked Lists",
      "Trees",
      "Graphs",
      "Sorting",
      "Searching",
    ],
  },
  {
    id: "5",
    title: "CBSE Class 9 Hindi - Kshitij Complete Guide",
    subject: "Hindi",
    level: "secondary",
    grade: "Class 9",
    chapter: "Kshitij (काव्य खंड)",
    university: "CBSE",
    type: "PDF",
    pages: 145,
    downloads: 198765,
    rating: 4.7,
    uploadedBy: "CBSE Board",
    verified: true,
    language: "Hindi",
    topics: [
      "गिल्लू",
      "स्मृति",
      "कल्लू कुम्हार की उनाकोटी",
      "मेरे बचपन के दिन",
    ],
  },
];

export default function StudyMaterials() {
  const [selectedLevel, setSelectedLevel] = useState("all");
  const [selectedGrade, setSelectedGrade] = useState("all");
  const [selectedSubject, setSelectedSubject] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredMaterials = studyMaterials.filter((material) => {
    const matchesLevel =
      selectedLevel === "all" || material.level === selectedLevel;
    const matchesGrade =
      selectedGrade === "all" || material.grade === selectedGrade;
    const matchesSubject =
      selectedSubject === "all" || material.subject === selectedSubject;
    const matchesSearch =
      searchQuery === "" ||
      material.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      material.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
      material.topics.some((topic) =>
        topic.toLowerCase().includes(searchQuery.toLowerCase()),
      );

    return matchesLevel && matchesGrade && matchesSubject && matchesSearch;
  });

  const getFileIcon = (type: string) => {
    switch (type) {
      case "PDF":
        return FileText;
      case "Video":
        return Video;
      case "Audio":
        return Headphones;
      case "Image":
        return Image;
      default:
        return FileText;
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
            <div className="w-12 h-12 bg-gradient-to-r from-emerald-500 via-blue-500 to-purple-500 rounded-full flex items-center justify-center">
              <BookOpen className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold">
              <span className="bg-gradient-to-r from-emerald-500 via-blue-500 to-purple-500 bg-clip-text text-transparent">
                Study Materials Hub
              </span>
            </h1>
          </div>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            📚 Access study materials from top universities worldwide - NCERT,
            IIT, MIT, Oxford & more! Every grade, every subject, every chapter
            covered! 🌍
          </p>

          {/* Global Stats */}
          <div className="flex items-center justify-center space-x-8 mt-6">
            <div className="flex items-center space-x-2">
              <University className="w-5 h-5 text-emerald-500" />
              <span className="text-sm font-medium">500+ Universities</span>
            </div>
            <div className="flex items-center space-x-2">
              <BookOpen className="w-5 h-5 text-blue-500" />
              <span className="text-sm font-medium">1M+ Materials</span>
            </div>
            <div className="flex items-center space-x-2">
              <Globe className="w-5 h-5 text-purple-500" />
              <span className="text-sm font-medium">150+ Countries</span>
            </div>
          </div>
        </motion.div>

        {/* Academic Level Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mb-8"
        >
          <Tabs
            value={selectedLevel}
            onValueChange={setSelectedLevel}
            className="w-full"
          >
            <TabsList className="grid w-full grid-cols-6">
              <TabsTrigger value="all">All Levels</TabsTrigger>
              {Object.entries(academicLevels).map(([key, level]) => (
                <TabsTrigger
                  key={key}
                  value={key}
                  className="flex items-center space-x-2"
                >
                  <level.icon className="w-4 h-4" />
                  <span className="hidden md:inline">{level.name}</span>
                </TabsTrigger>
              ))}
            </TabsList>

            {/* Grade Selection for each level */}
            {selectedLevel !== "all" && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                transition={{ duration: 0.3 }}
                className="mt-4"
              >
                <div className="grid grid-cols-4 md:grid-cols-8 gap-2">
                  <Button
                    variant={selectedGrade === "all" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedGrade("all")}
                    className={
                      selectedGrade === "all"
                        ? `bg-gradient-to-r ${academicLevels[selectedLevel as keyof typeof academicLevels].color} text-white`
                        : ""
                    }
                  >
                    All Grades
                  </Button>
                  {academicLevels[
                    selectedLevel as keyof typeof academicLevels
                  ].grades.map((grade) => (
                    <Button
                      key={grade}
                      variant={selectedGrade === grade ? "default" : "outline"}
                      size="sm"
                      onClick={() => setSelectedGrade(grade)}
                      className={
                        selectedGrade === grade
                          ? `bg-gradient-to-r ${academicLevels[selectedLevel as keyof typeof academicLevels].color} text-white`
                          : ""
                      }
                    >
                      {grade}
                    </Button>
                  ))}
                </div>
              </motion.div>
            )}
          </Tabs>
        </motion.div>

        {/* Search and Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-8 space-y-4"
        >
          {/* Search Bar */}
          <div className="relative max-w-2xl mx-auto">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <Input
              placeholder="Search by subject, chapter, topic, or university..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-12 h-12 text-lg"
            />
          </div>

          {/* Subject Filter */}
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Select value={selectedSubject} onValueChange={setSelectedSubject}>
              <SelectTrigger className="w-64">
                <SelectValue placeholder="All Subjects" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Subjects</SelectItem>
                {selectedLevel === "all"
                  ? Array.from(
                      new Set(Object.values(subjectsByLevel).flat()),
                    ).map((subject) => (
                      <SelectItem key={subject} value={subject}>
                        {subject}
                      </SelectItem>
                    ))
                  : subjectsByLevel[
                      selectedLevel as keyof typeof subjectsByLevel
                    ]?.map((subject) => (
                      <SelectItem key={subject} value={subject}>
                        {subject}
                      </SelectItem>
                    ))}
              </SelectContent>
            </Select>
          </div>
        </motion.div>

        {/* Results */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="space-y-6"
        >
          {/* Results count */}
          <div className="flex items-center justify-between">
            <p className="text-muted-foreground">
              Showing {filteredMaterials.length} study materials
            </p>
            <div className="flex items-center space-x-2">
              <Button variant="outline" size="sm">
                <Filter className="w-4 h-4 mr-2" />
                More Filters
              </Button>
            </div>
          </div>

          {/* Materials Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredMaterials.map((material, index) => {
              const FileIcon = getFileIcon(material.type);
              const levelInfo =
                academicLevels[material.level as keyof typeof academicLevels];

              return (
                <motion.div
                  key={material.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.1 * index }}
                >
                  <Card className="h-full hover:shadow-xl transition-all duration-300 border-0 bg-background/50 backdrop-blur-sm group">
                    <CardHeader className="space-y-3">
                      {/* Header with file type and verification */}
                      <div className="flex items-start justify-between">
                        <div className="flex items-center space-x-3">
                          <div
                            className={`w-12 h-12 rounded-lg bg-gradient-to-r ${levelInfo.color} flex items-center justify-center`}
                          >
                            <FileIcon className="w-6 h-6 text-white" />
                          </div>
                          <div>
                            <Badge variant="secondary" className="mb-2">
                              {material.subject}
                            </Badge>
                            <CardTitle className="text-lg leading-tight">
                              {material.title}
                            </CardTitle>
                          </div>
                        </div>
                        {material.verified && (
                          <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100">
                            ✓ Verified
                          </Badge>
                        )}
                      </div>

                      {/* Academic Info */}
                      <div className="flex flex-wrap gap-2">
                        <Badge variant="outline" className="text-xs">
                          {levelInfo.name}
                        </Badge>
                        <Badge variant="outline" className="text-xs">
                          {material.grade}
                        </Badge>
                        <Badge variant="outline" className="text-xs">
                          {material.chapter}
                        </Badge>
                      </div>
                    </CardHeader>

                    <CardContent className="space-y-4">
                      {/* University */}
                      <div className="flex items-center space-x-2">
                        <University className="w-4 h-4 text-muted-foreground" />
                        <span className="text-sm font-medium">
                          {material.university}
                        </span>
                      </div>

                      {/* Topics covered */}
                      <div>
                        <p className="text-sm font-medium mb-2">
                          Topics Covered:
                        </p>
                        <div className="flex flex-wrap gap-1">
                          {material.topics.slice(0, 3).map((topic) => (
                            <Badge
                              key={topic}
                              variant="secondary"
                              className="text-xs"
                            >
                              {topic}
                            </Badge>
                          ))}
                          {material.topics.length > 3 && (
                            <Badge variant="secondary" className="text-xs">
                              +{material.topics.length - 3} more
                            </Badge>
                          )}
                        </div>
                      </div>

                      {/* Stats */}
                      <div className="grid grid-cols-3 gap-4 text-sm">
                        <div className="flex items-center space-x-1">
                          <Eye className="w-4 h-4 text-muted-foreground" />
                          <span>{material.downloads.toLocaleString()}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                          <span>{material.rating}</span>
                        </div>
                        <div className="text-muted-foreground">
                          {material.type === "PDF"
                            ? `${material.pages} pages`
                            : material.duration}
                        </div>
                      </div>

                      {/* Action Buttons */}
                      <div className="flex space-x-2">
                        <Button
                          className={`flex-1 bg-gradient-to-r ${levelInfo.color} hover:opacity-90 text-white`}
                        >
                          <Download className="w-4 h-4 mr-2" />
                          Download
                        </Button>
                        <Button variant="outline" size="sm">
                          Preview
                        </Button>
                      </div>

                      {/* Uploaded by */}
                      <div className="text-xs text-muted-foreground">
                        Uploaded by {material.uploadedBy} • {material.language}
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* Upload CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-16"
        >
          <Card className="border-0 bg-gradient-to-r from-emerald-500/10 via-blue-500/10 to-purple-500/10 backdrop-blur-sm">
            <CardContent className="p-8 text-center">
              <h3 className="text-2xl font-bold mb-4">
                🏫 Are you from a School or University?
              </h3>
              <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
                Help millions of students worldwide! Upload your study
                materials, notes, and resources. Join 500+ institutions already
                sharing knowledge globally.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-emerald-500 via-blue-500 to-purple-500"
                >
                  🎓 Upload Study Materials
                </Button>
                <Button size="lg" variant="outline">
                  📞 Partner with Us
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
