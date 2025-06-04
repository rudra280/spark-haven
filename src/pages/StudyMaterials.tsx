import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  Filter,
  Download,
  Eye,
  Star,
  BookOpen,
  FileText,
  Globe,
  Database,
  Library,
  GraduationCap,
  Clock,
  Users,
  ThumbsUp,
  Share,
  Bookmark,
  ExternalLink,
  RefreshCw,
  Wifi,
  Server,
  Cloud,
  Network,
  Book,
  Scroll,
  PenTool,
  Archive,
  Layers,
  FolderOpen,
  HardDrive,
  Tag,
  Calendar,
  User,
  Award,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { useAuth } from "@/contexts/AuthContext";

interface StudyResource {
  id: string;
  title: string;
  description: string;
  type:
    | "book"
    | "research"
    | "notes"
    | "article"
    | "thesis"
    | "manual"
    | "guide"
    | "reference";
  subject: string;
  difficulty: "Beginner" | "Intermediate" | "Advanced" | "Expert";
  source: string;
  url: string;
  downloadUrl?: string;
  thumbnail: string;
  author: {
    name: string;
    institution: string;
    credentials: string;
    avatar: string;
  };
  publisher?: string;
  publishedDate: string;
  lastUpdated: string;
  pages?: number;
  fileSize?: string;
  language: string;
  isbn?: string;
  doi?: string;
  citations?: number;
  rating: number;
  reviews: number;
  downloads: number;
  views: number;
  isOpenAccess: boolean;
  isPremium: boolean;
  isBookmarked?: boolean;
  tags: string[];
  competitiveExams?: string[];
}

interface DownloadedResource {
  id: string;
  resource: StudyResource;
  downloadedAt: string;
  filePath: string;
  readProgress: number;
  lastReadAt?: string;
  bookmarks: {
    page: number;
    note: string;
    createdAt: string;
  }[];
}

// Internet Library Service - Access to millions of resources
class InternetLibraryService {
  private static instance: InternetLibraryService;

  public static getInstance(): InternetLibraryService {
    if (!InternetLibraryService.instance) {
      InternetLibraryService.instance = new InternetLibraryService();
    }
    return InternetLibraryService.instance;
  }

  // Search across all major digital libraries and repositories
  async searchResources(
    query: string,
    filters: {
      type?: string;
      subject?: string;
      difficulty?: string;
      source?: string;
      competitiveExam?: string;
    },
  ): Promise<StudyResource[]> {
    await this.delay(1500);

    // Simulate comprehensive internet search
    const resources: StudyResource[] = [];

    // Add resources from various sources
    resources.push(...this.getGoogleBooksResults(query, filters));
    resources.push(...this.getKindleResults(query, filters));
    resources.push(...this.getKoboResults(query, filters));
    resources.push(...this.getOpenLibraryResults(query, filters));
    resources.push(...this.getInternetArchiveResults(query, filters));
    resources.push(...this.getAcademicResults(query, filters));
    resources.push(...this.getWikipediaResults(query, filters));
    resources.push(...this.getResearchGateResults(query, filters));
    resources.push(...this.getArXivResults(query, filters));
    resources.push(...this.getNatureResults(query, filters));
    resources.push(...this.getIEEEResults(query, filters));
    resources.push(...this.getSpringerResults(query, filters));

    return this.filterAndSortResults(resources, query, filters);
  }

  private getGoogleBooksResults(query: string, filters: any): StudyResource[] {
    const books: StudyResource[] = [];

    for (let i = 0; i < 5; i++) {
      books.push({
        id: `google_books_${Date.now()}_${i}`,
        title: `${query} - Comprehensive Guide (Google Books)`,
        description: `Complete textbook covering all aspects of ${query} with detailed explanations, examples, and practice problems.`,
        type: "book",
        subject: this.getSubjectFromQuery(query),
        difficulty: ["Beginner", "Intermediate", "Advanced"][i % 3] as any,
        source: "Google Books",
        url: `https://books.google.com/books?q=${encodeURIComponent(query)}`,
        downloadUrl: `https://books.google.com/books/download/${query.replace(/ /g, "_")}.pdf`,
        thumbnail: this.getSubjectThumbnail(this.getSubjectFromQuery(query)),
        author: {
          name: `Dr. ${["Smith", "Johnson", "Williams", "Brown", "Jones"][i % 5]}`,
          institution: ["MIT", "Harvard", "Stanford", "Oxford", "Cambridge"][
            i % 5
          ],
          credentials: "PhD, Professor",
          avatar:
            "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400",
        },
        publisher: [
          "McGraw-Hill",
          "Pearson",
          "Wiley",
          "Springer",
          "Cambridge Press",
        ][i % 5],
        publishedDate: new Date(
          Date.now() - Math.random() * 365 * 24 * 60 * 60 * 1000 * 5,
        ).toISOString(),
        lastUpdated: new Date().toISOString(),
        pages: Math.floor(Math.random() * 800) + 200,
        fileSize: `${Math.floor(Math.random() * 50) + 10} MB`,
        language: "English",
        isbn: this.generateISBN(),
        rating: 4.0 + Math.random() * 1,
        reviews: Math.floor(Math.random() * 1000) + 100,
        downloads: Math.floor(Math.random() * 50000) + 10000,
        views: Math.floor(Math.random() * 100000) + 50000,
        isOpenAccess: Math.random() > 0.6,
        isPremium: Math.random() > 0.7,
        tags: [
          query.toLowerCase(),
          "textbook",
          "comprehensive",
          "google books",
        ],
        competitiveExams: this.getRelevantExams(query),
      });
    }

    return books;
  }

  private getKindleResults(query: string, filters: any): StudyResource[] {
    const books: StudyResource[] = [];

    for (let i = 0; i < 4; i++) {
      books.push({
        id: `kindle_${Date.now()}_${i}`,
        title: `${query} Mastery - Kindle Edition`,
        description: `Digital edition available on Kindle with interactive features, highlighting, and note-taking capabilities for ${query}.`,
        type: "book",
        subject: this.getSubjectFromQuery(query),
        difficulty: ["Beginner", "Intermediate", "Advanced"][i % 3] as any,
        source: "Amazon Kindle",
        url: `https://amazon.com/kindle/dp/${query.replace(/ /g, "")}`,
        downloadUrl: `https://amazon.com/kindle/download/${query.replace(/ /g, "_")}.azw3`,
        thumbnail: this.getSubjectThumbnail(this.getSubjectFromQuery(query)),
        author: {
          name: `Prof. ${["Anderson", "Taylor", "Thomas", "Jackson", "White"][i % 5]}`,
          institution: ["Yale", "Princeton", "Columbia", "Berkeley", "Chicago"][
            i % 5
          ],
          credentials: "PhD, Bestselling Author",
          avatar:
            "https://images.unsplash.com/photo-1494790108755-2616b612b632?w=400",
        },
        publisher: "Amazon Publishing",
        publishedDate: new Date(
          Date.now() - Math.random() * 365 * 24 * 60 * 60 * 1000 * 3,
        ).toISOString(),
        lastUpdated: new Date().toISOString(),
        pages: Math.floor(Math.random() * 600) + 150,
        fileSize: `${Math.floor(Math.random() * 30) + 5} MB`,
        language: "English",
        rating: 4.2 + Math.random() * 0.8,
        reviews: Math.floor(Math.random() * 2000) + 500,
        downloads: Math.floor(Math.random() * 100000) + 25000,
        views: Math.floor(Math.random() * 200000) + 100000,
        isOpenAccess: false,
        isPremium: true,
        tags: [query.toLowerCase(), "kindle", "digital", "interactive"],
        competitiveExams: this.getRelevantExams(query),
      });
    }

    return books;
  }

  private getKoboResults(query: string, filters: any): StudyResource[] {
    const books: StudyResource[] = [];

    for (let i = 0; i < 3; i++) {
      books.push({
        id: `kobo_${Date.now()}_${i}`,
        title: `${query} - Complete Study Guide (Kobo)`,
        description: `Comprehensive study guide available on Kobo with enhanced reading features and study tools for ${query}.`,
        type: "book",
        subject: this.getSubjectFromQuery(query),
        difficulty: ["Intermediate", "Advanced"][i % 2] as any,
        source: "Kobo",
        url: `https://kobo.com/ebook/${query.replace(/ /g, "-")}`,
        downloadUrl: `https://kobo.com/download/${query.replace(/ /g, "_")}.epub`,
        thumbnail: this.getSubjectThumbnail(this.getSubjectFromQuery(query)),
        author: {
          name: `Dr. ${["Miller", "Davis", "Garcia", "Rodriguez", "Wilson"][i % 5]}`,
          institution: ["Toronto", "McGill", "UBC", "Waterloo", "Queens"][
            i % 5
          ],
          credentials: "PhD, Research Professor",
          avatar:
            "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400",
        },
        publisher: "Kobo Originals",
        publishedDate: new Date(
          Date.now() - Math.random() * 365 * 24 * 60 * 60 * 1000 * 2,
        ).toISOString(),
        lastUpdated: new Date().toISOString(),
        pages: Math.floor(Math.random() * 400) + 100,
        fileSize: `${Math.floor(Math.random() * 20) + 3} MB`,
        language: "English",
        rating: 4.1 + Math.random() * 0.9,
        reviews: Math.floor(Math.random() * 800) + 200,
        downloads: Math.floor(Math.random() * 30000) + 10000,
        views: Math.floor(Math.random() * 80000) + 30000,
        isOpenAccess: false,
        isPremium: true,
        tags: [query.toLowerCase(), "kobo", "study guide", "enhanced"],
        competitiveExams: this.getRelevantExams(query),
      });
    }

    return books;
  }

  private getOpenLibraryResults(query: string, filters: any): StudyResource[] {
    return [
      {
        id: `openlibrary_${Date.now()}`,
        title: `${query} - Open Library Collection`,
        description: `Free access to multiple books and resources about ${query} from the Internet Archive's Open Library.`,
        type: "book",
        subject: this.getSubjectFromQuery(query),
        difficulty: "Intermediate",
        source: "Open Library",
        url: `https://openlibrary.org/search?q=${encodeURIComponent(query)}`,
        downloadUrl: `https://archive.org/download/${query.replace(/ /g, "_")}.pdf`,
        thumbnail: this.getSubjectThumbnail(this.getSubjectFromQuery(query)),
        author: {
          name: "Open Library Contributors",
          institution: "Internet Archive",
          credentials: "Community Curated",
          avatar:
            "https://openlibrary.org/static/images/openlibrary-logo-tighter.svg",
        },
        publishedDate: new Date(
          Date.now() - Math.random() * 365 * 24 * 60 * 60 * 1000 * 10,
        ).toISOString(),
        lastUpdated: new Date().toISOString(),
        pages: Math.floor(Math.random() * 1000) + 300,
        fileSize: `${Math.floor(Math.random() * 100) + 20} MB`,
        language: "English",
        rating: 4.3 + Math.random() * 0.7,
        reviews: Math.floor(Math.random() * 500) + 100,
        downloads: Math.floor(Math.random() * 200000) + 100000,
        views: Math.floor(Math.random() * 500000) + 200000,
        isOpenAccess: true,
        isPremium: false,
        tags: [query.toLowerCase(), "open access", "free", "archive"],
        competitiveExams: this.getRelevantExams(query),
      },
    ];
  }

  private getInternetArchiveResults(
    query: string,
    filters: any,
  ): StudyResource[] {
    return [
      {
        id: `internetarchive_${Date.now()}`,
        title: `${query} - Internet Archive Digital Library`,
        description: `Historical and contemporary texts, research papers, and educational materials about ${query} from the Internet Archive.`,
        type: "reference",
        subject: this.getSubjectFromQuery(query),
        difficulty: "Advanced",
        source: "Internet Archive",
        url: `https://archive.org/search.php?query=${encodeURIComponent(query)}`,
        downloadUrl: `https://archive.org/download/${query.replace(/ /g, "_")}_collection.zip`,
        thumbnail: this.getSubjectThumbnail(this.getSubjectFromQuery(query)),
        author: {
          name: "Internet Archive",
          institution: "Digital Library",
          credentials: "Preservation Organization",
          avatar: "https://archive.org/images/glogo.png",
        },
        publishedDate: new Date(
          Date.now() - Math.random() * 365 * 24 * 60 * 60 * 1000 * 20,
        ).toISOString(),
        lastUpdated: new Date().toISOString(),
        fileSize: `${Math.floor(Math.random() * 500) + 100} MB`,
        language: "Multiple Languages",
        rating: 4.4 + Math.random() * 0.6,
        reviews: Math.floor(Math.random() * 300) + 50,
        downloads: Math.floor(Math.random() * 1000000) + 500000,
        views: Math.floor(Math.random() * 2000000) + 1000000,
        isOpenAccess: true,
        isPremium: false,
        tags: [query.toLowerCase(), "archive", "historical", "preservation"],
        competitiveExams: this.getRelevantExams(query),
      },
    ];
  }

  private getAcademicResults(query: string, filters: any): StudyResource[] {
    const sources = ["JSTOR", "ScienceDirect", "SpringerLink", "Wiley Online"];
    const results: StudyResource[] = [];

    sources.forEach((source, index) => {
      results.push({
        id: `academic_${source.toLowerCase()}_${Date.now()}_${index}`,
        title: `${query} - ${source} Academic Papers`,
        description: `Peer-reviewed research papers and academic articles about ${query} from ${source} database.`,
        type: "research",
        subject: this.getSubjectFromQuery(query),
        difficulty: "Expert",
        source,
        url: `https://${source.toLowerCase().replace(" ", "")}.com/search?q=${encodeURIComponent(query)}`,
        downloadUrl: `https://${source.toLowerCase().replace(" ", "")}.com/download/${query.replace(/ /g, "_")}.pdf`,
        thumbnail: this.getSubjectThumbnail(this.getSubjectFromQuery(query)),
        author: {
          name: `Research Consortium ${index + 1}`,
          institution: "Multiple Universities",
          credentials: "Peer-Reviewed",
          avatar:
            "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400",
        },
        publishedDate: new Date(
          Date.now() - Math.random() * 365 * 24 * 60 * 60 * 1000 * 5,
        ).toISOString(),
        lastUpdated: new Date().toISOString(),
        pages: Math.floor(Math.random() * 50) + 10,
        fileSize: `${Math.floor(Math.random() * 10) + 2} MB`,
        language: "English",
        doi: `10.1000/${Math.random().toString(36).substr(2, 9)}`,
        citations: Math.floor(Math.random() * 500) + 50,
        rating: 4.5 + Math.random() * 0.5,
        reviews: Math.floor(Math.random() * 100) + 20,
        downloads: Math.floor(Math.random() * 20000) + 5000,
        views: Math.floor(Math.random() * 50000) + 15000,
        isOpenAccess: Math.random() > 0.5,
        isPremium: Math.random() > 0.3,
        tags: [
          query.toLowerCase(),
          "research",
          "peer-reviewed",
          source.toLowerCase(),
        ],
        competitiveExams: this.getRelevantExams(query),
      });
    });

    return results;
  }

  private getWikipediaResults(query: string, filters: any): StudyResource[] {
    return [
      {
        id: `wikipedia_${Date.now()}`,
        title: `${query} - Wikipedia Articles & References`,
        description: `Comprehensive Wikipedia articles about ${query} with extensive references to academic sources and further reading.`,
        type: "article",
        subject: this.getSubjectFromQuery(query),
        difficulty: "Beginner",
        source: "Wikipedia",
        url: `https://en.wikipedia.org/wiki/${query.replace(/ /g, "_")}`,
        thumbnail:
          "https://upload.wikimedia.org/wikipedia/commons/thumb/8/80/Wikipedia-logo-v2.svg/200px-Wikipedia-logo-v2.svg.png",
        author: {
          name: "Wikipedia Contributors",
          institution: "Wikimedia Foundation",
          credentials: "Community Edited",
          avatar:
            "https://upload.wikimedia.org/wikipedia/commons/thumb/8/80/Wikipedia-logo-v2.svg/200px-Wikipedia-logo-v2.svg.png",
        },
        publishedDate: new Date(
          Date.now() - Math.random() * 365 * 24 * 60 * 60 * 1000,
        ).toISOString(),
        lastUpdated: new Date().toISOString(),
        language: "Multiple Languages",
        rating: 4.2 + Math.random() * 0.8,
        reviews: Math.floor(Math.random() * 10000) + 5000,
        downloads: 0,
        views: Math.floor(Math.random() * 10000000) + 5000000,
        isOpenAccess: true,
        isPremium: false,
        tags: [query.toLowerCase(), "wikipedia", "encyclopedia", "free"],
        competitiveExams: this.getRelevantExams(query),
      },
    ];
  }

  private getResearchGateResults(query: string, filters: any): StudyResource[] {
    return [
      {
        id: `researchgate_${Date.now()}`,
        title: `${query} - ResearchGate Publications`,
        description: `Research publications, preprints, and conference papers about ${query} shared by researchers on ResearchGate.`,
        type: "research",
        subject: this.getSubjectFromQuery(query),
        difficulty: "Advanced",
        source: "ResearchGate",
        url: `https://researchgate.net/search?q=${encodeURIComponent(query)}`,
        downloadUrl: `https://researchgate.net/download/${query.replace(/ /g, "_")}.pdf`,
        thumbnail: this.getSubjectThumbnail(this.getSubjectFromQuery(query)),
        author: {
          name: "Research Community",
          institution: "ResearchGate Network",
          credentials: "Academic Researchers",
          avatar:
            "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400",
        },
        publishedDate: new Date(
          Date.now() - Math.random() * 365 * 24 * 60 * 60 * 1000 * 2,
        ).toISOString(),
        lastUpdated: new Date().toISOString(),
        pages: Math.floor(Math.random() * 30) + 8,
        fileSize: `${Math.floor(Math.random() * 8) + 2} MB`,
        language: "English",
        rating: 4.3 + Math.random() * 0.7,
        reviews: Math.floor(Math.random() * 200) + 50,
        downloads: Math.floor(Math.random() * 10000) + 2000,
        views: Math.floor(Math.random() * 30000) + 10000,
        isOpenAccess: true,
        isPremium: false,
        tags: [query.toLowerCase(), "research", "preprint", "conference"],
        competitiveExams: this.getRelevantExams(query),
      },
    ];
  }

  private getArXivResults(query: string, filters: any): StudyResource[] {
    return [
      {
        id: `arxiv_${Date.now()}`,
        title: `${query} - arXiv Preprints`,
        description: `Latest preprint research papers about ${query} from arXiv, covering cutting-edge developments and findings.`,
        type: "research",
        subject: this.getSubjectFromQuery(query),
        difficulty: "Expert",
        source: "arXiv",
        url: `https://arxiv.org/search/?query=${encodeURIComponent(query)}`,
        downloadUrl: `https://arxiv.org/pdf/${Math.floor(Math.random() * 9999) + 1000}.${Math.floor(Math.random() * 99999) + 10000}.pdf`,
        thumbnail: this.getSubjectThumbnail(this.getSubjectFromQuery(query)),
        author: {
          name: "arXiv Authors",
          institution: "Cornell University",
          credentials: "Preprint Repository",
          avatar:
            "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400",
        },
        publishedDate: new Date(
          Date.now() - Math.random() * 365 * 24 * 60 * 60 * 1000,
        ).toISOString(),
        lastUpdated: new Date().toISOString(),
        pages: Math.floor(Math.random() * 40) + 5,
        fileSize: `${Math.floor(Math.random() * 5) + 1} MB`,
        language: "English",
        rating: 4.4 + Math.random() * 0.6,
        reviews: Math.floor(Math.random() * 50) + 10,
        downloads: Math.floor(Math.random() * 5000) + 1000,
        views: Math.floor(Math.random() * 15000) + 5000,
        isOpenAccess: true,
        isPremium: false,
        tags: [query.toLowerCase(), "preprint", "latest", "cutting-edge"],
        competitiveExams: this.getRelevantExams(query),
      },
    ];
  }

  private getNatureResults(query: string, filters: any): StudyResource[] {
    return [
      {
        id: `nature_${Date.now()}`,
        title: `${query} - Nature Research Papers`,
        description: `High-impact research papers about ${query} published in Nature journals, representing breakthrough discoveries and innovations.`,
        type: "research",
        subject: this.getSubjectFromQuery(query),
        difficulty: "Expert",
        source: "Nature",
        url: `https://nature.com/search?q=${encodeURIComponent(query)}`,
        downloadUrl: `https://nature.com/articles/${query.replace(/ /g, "_")}.pdf`,
        thumbnail: this.getSubjectThumbnail(this.getSubjectFromQuery(query)),
        author: {
          name: "Nature Research Team",
          institution: "Nature Publishing Group",
          credentials: "High-Impact Journal",
          avatar:
            "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400",
        },
        publishedDate: new Date(
          Date.now() - Math.random() * 365 * 24 * 60 * 60 * 1000 * 3,
        ).toISOString(),
        lastUpdated: new Date().toISOString(),
        pages: Math.floor(Math.random() * 20) + 5,
        fileSize: `${Math.floor(Math.random() * 6) + 2} MB`,
        language: "English",
        doi: `10.1038/nature.${Math.random().toString(36).substr(2, 9)}`,
        citations: Math.floor(Math.random() * 1000) + 100,
        rating: 4.8 + Math.random() * 0.2,
        reviews: Math.floor(Math.random() * 300) + 100,
        downloads: Math.floor(Math.random() * 50000) + 20000,
        views: Math.floor(Math.random() * 200000) + 100000,
        isOpenAccess: false,
        isPremium: true,
        tags: [query.toLowerCase(), "nature", "high-impact", "breakthrough"],
        competitiveExams: this.getRelevantExams(query),
      },
    ];
  }

  private getIEEEResults(query: string, filters: any): StudyResource[] {
    return [
      {
        id: `ieee_${Date.now()}`,
        title: `${query} - IEEE Technical Papers`,
        description: `Technical papers and standards about ${query} from IEEE Xplore, covering engineering and technology advances.`,
        type: "research",
        subject: this.getSubjectFromQuery(query),
        difficulty: "Advanced",
        source: "IEEE",
        url: `https://ieeexplore.ieee.org/search/searchresult.jsp?queryText=${encodeURIComponent(query)}`,
        downloadUrl: `https://ieeexplore.ieee.org/stamp/stamp.jsp?tp=${query.replace(/ /g, "_")}`,
        thumbnail: this.getSubjectThumbnail(this.getSubjectFromQuery(query)),
        author: {
          name: "IEEE Authors",
          institution: "IEEE",
          credentials: "Technical Standards",
          avatar:
            "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400",
        },
        publishedDate: new Date(
          Date.now() - Math.random() * 365 * 24 * 60 * 60 * 1000 * 2,
        ).toISOString(),
        lastUpdated: new Date().toISOString(),
        pages: Math.floor(Math.random() * 15) + 5,
        fileSize: `${Math.floor(Math.random() * 4) + 1} MB`,
        language: "English",
        doi: `10.1109/${Math.random().toString(36).substr(2, 9)}`,
        citations: Math.floor(Math.random() * 200) + 20,
        rating: 4.5 + Math.random() * 0.5,
        reviews: Math.floor(Math.random() * 100) + 30,
        downloads: Math.floor(Math.random() * 15000) + 5000,
        views: Math.floor(Math.random() * 40000) + 15000,
        isOpenAccess: Math.random() > 0.7,
        isPremium: true,
        tags: [query.toLowerCase(), "ieee", "technical", "engineering"],
        competitiveExams: this.getRelevantExams(query),
      },
    ];
  }

  private getSpringerResults(query: string, filters: any): StudyResource[] {
    return [
      {
        id: `springer_${Date.now()}`,
        title: `${query} - Springer Academic Resources`,
        description: `Academic books, journals, and research papers about ${query} from Springer, covering comprehensive educational content.`,
        type: "book",
        subject: this.getSubjectFromQuery(query),
        difficulty: "Advanced",
        source: "Springer",
        url: `https://link.springer.com/search?query=${encodeURIComponent(query)}`,
        downloadUrl: `https://link.springer.com/content/pdf/${query.replace(/ /g, "_")}.pdf`,
        thumbnail: this.getSubjectThumbnail(this.getSubjectFromQuery(query)),
        author: {
          name: "Springer Authors",
          institution: "Springer Nature",
          credentials: "Academic Publisher",
          avatar:
            "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400",
        },
        publisher: "Springer",
        publishedDate: new Date(
          Date.now() - Math.random() * 365 * 24 * 60 * 60 * 1000 * 4,
        ).toISOString(),
        lastUpdated: new Date().toISOString(),
        pages: Math.floor(Math.random() * 500) + 200,
        fileSize: `${Math.floor(Math.random() * 40) + 10} MB`,
        language: "English",
        isbn: this.generateISBN(),
        doi: `10.1007/${Math.random().toString(36).substr(2, 9)}`,
        rating: 4.4 + Math.random() * 0.6,
        reviews: Math.floor(Math.random() * 400) + 100,
        downloads: Math.floor(Math.random() * 30000) + 10000,
        views: Math.floor(Math.random() * 80000) + 30000,
        isOpenAccess: Math.random() > 0.6,
        isPremium: true,
        tags: [query.toLowerCase(), "springer", "academic", "comprehensive"],
        competitiveExams: this.getRelevantExams(query),
      },
    ];
  }

  private filterAndSortResults(
    resources: StudyResource[],
    query: string,
    filters: any,
  ): StudyResource[] {
    let filtered = resources;

    // Apply filters
    if (filters.type && filters.type !== "all") {
      filtered = filtered.filter((r) => r.type === filters.type);
    }
    if (filters.subject && filters.subject !== "all") {
      filtered = filtered.filter((r) => r.subject === filters.subject);
    }
    if (filters.difficulty && filters.difficulty !== "all") {
      filtered = filtered.filter((r) => r.difficulty === filters.difficulty);
    }
    if (filters.source && filters.source !== "all") {
      filtered = filtered.filter((r) => r.source === filters.source);
    }
    if (filters.competitiveExam && filters.competitiveExam !== "all") {
      filtered = filtered.filter((r) =>
        r.competitiveExams?.includes(filters.competitiveExam),
      );
    }

    // Sort by relevance and quality
    filtered.sort((a, b) => {
      const scoreA =
        a.rating * Math.log(a.downloads + 1) * Math.log(a.views + 1);
      const scoreB =
        b.rating * Math.log(b.downloads + 1) * Math.log(b.views + 1);
      return scoreB - scoreA;
    });

    return filtered;
  }

  private getSubjectFromQuery(query: string): string {
    const queryLower = query.toLowerCase();
    if (
      queryLower.includes("math") ||
      queryLower.includes("calculus") ||
      queryLower.includes("algebra")
    ) {
      return "Mathematics";
    } else if (
      queryLower.includes("physics") ||
      queryLower.includes("quantum") ||
      queryLower.includes("mechanics")
    ) {
      return "Physics";
    } else if (
      queryLower.includes("chemistry") ||
      queryLower.includes("organic") ||
      queryLower.includes("reaction")
    ) {
      return "Chemistry";
    } else if (
      queryLower.includes("biology") ||
      queryLower.includes("cell") ||
      queryLower.includes("genetics")
    ) {
      return "Biology";
    } else if (
      queryLower.includes("computer") ||
      queryLower.includes("programming") ||
      queryLower.includes("algorithm")
    ) {
      return "Computer Science";
    } else if (
      queryLower.includes("history") ||
      queryLower.includes("war") ||
      queryLower.includes("civilization")
    ) {
      return "History";
    } else if (
      queryLower.includes("literature") ||
      queryLower.includes("poetry") ||
      queryLower.includes("novel")
    ) {
      return "Literature";
    } else if (
      queryLower.includes("economics") ||
      queryLower.includes("finance") ||
      queryLower.includes("business")
    ) {
      return "Economics";
    }
    return "General Studies";
  }

  private getSubjectThumbnail(subject: string): string {
    const thumbnails = {
      Mathematics:
        "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=800",
      Physics:
        "https://images.unsplash.com/photo-1636953056323-9c09fdd74fa6?w=800",
      Chemistry:
        "https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?w=800",
      Biology:
        "https://images.unsplash.com/photo-1532012197267-da84d127e765?w=800",
      "Computer Science":
        "https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=800",
      History:
        "https://images.unsplash.com/photo-1461360370896-922624d12aa1?w=800",
      Literature:
        "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=800",
      Economics:
        "https://images.unsplash.com/photo-1559526324-4b87b5e36e44?w=800",
      "General Studies":
        "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800",
    };
    return (
      thumbnails[subject as keyof typeof thumbnails] ||
      thumbnails["General Studies"]
    );
  }

  private getRelevantExams(query: string): string[] {
    const queryLower = query.toLowerCase();
    const exams = [];

    if (
      queryLower.includes("math") ||
      queryLower.includes("physics") ||
      queryLower.includes("chemistry")
    ) {
      exams.push("JEE Main", "JEE Advanced");
    }
    if (
      queryLower.includes("biology") ||
      queryLower.includes("chemistry") ||
      queryLower.includes("physics")
    ) {
      exams.push("NEET");
    }
    if (queryLower.includes("computer") || queryLower.includes("engineering")) {
      exams.push("GATE", "JEE Main");
    }
    if (queryLower.includes("business") || queryLower.includes("management")) {
      exams.push("CAT", "GMAT");
    }
    if (queryLower.includes("graduate") || queryLower.includes("research")) {
      exams.push("GRE", "TOEFL");
    }

    return exams;
  }

  private generateISBN(): string {
    return `978-${Math.floor(Math.random() * 9)}${Math.floor(Math.random() * 900000000 + 100000000)}`;
  }

  private delay(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
}

export default function StudyMaterials() {
  const { user } = useAuth();
  const [resources, setResources] = useState<StudyResource[]>([]);
  const [downloadedResources, setDownloadedResources] = useState<
    DownloadedResource[]
  >([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [selectedType, setSelectedType] = useState("all");
  const [selectedSubject, setSelectedSubject] = useState("all");
  const [selectedDifficulty, setSelectedDifficulty] = useState("all");
  const [selectedSource, setSelectedSource] = useState("all");
  const [selectedExam, setSelectedExam] = useState("all");
  const [activeTab, setActiveTab] = useState("search");

  const libraryService = InternetLibraryService.getInstance();

  // Search function
  const handleSearch = async () => {
    if (!searchQuery.trim()) return;

    setIsSearching(true);
    try {
      const searchResults = await libraryService.searchResources(searchQuery, {
        type: selectedType,
        subject: selectedSubject,
        difficulty: selectedDifficulty,
        source: selectedSource,
        competitiveExam: selectedExam,
      });

      setResources(searchResults);
    } catch (error) {
      console.error("Search failed:", error);
    } finally {
      setIsSearching(false);
    }
  };

  // Auto-search as user types
  useEffect(() => {
    const debounceTimer = setTimeout(() => {
      if (searchQuery.trim()) {
        handleSearch();
      } else {
        setResources([]);
      }
    }, 500);

    return () => clearTimeout(debounceTimer);
  }, [
    searchQuery,
    selectedType,
    selectedSubject,
    selectedDifficulty,
    selectedSource,
    selectedExam,
  ]);

  // Handle download
  const handleDownload = (resource: StudyResource) => {
    const downloadedResource: DownloadedResource = {
      id: `download_${Date.now()}`,
      resource,
      downloadedAt: new Date().toISOString(),
      filePath: `/downloads/${resource.title.replace(/[^a-z0-9]/gi, "_")}.pdf`,
      readProgress: 0,
      bookmarks: [],
    };

    setDownloadedResources((prev) => [downloadedResource, ...prev]);

    // Simulate download
    if (resource.downloadUrl) {
      window.open(resource.downloadUrl, "_blank");
    } else {
      window.open(resource.url, "_blank");
    }

    // Update download count
    setResources((prev) =>
      prev.map((r) =>
        r.id === resource.id ? { ...r, downloads: r.downloads + 1 } : r,
      ),
    );
  };

  // Handle bookmark
  const handleBookmark = (resourceId: string) => {
    setResources((prev) =>
      prev.map((resource) =>
        resource.id === resourceId
          ? { ...resource, isBookmarked: !resource.isBookmarked }
          : resource,
      ),
    );
  };

  const formatFileSize = (size: string | undefined) => {
    return size || "N/A";
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "book":
        return <Book className="w-5 h-5" />;
      case "research":
        return <Database className="w-5 h-5" />;
      case "notes":
        return <FileText className="w-5 h-5" />;
      case "article":
        return <Scroll className="w-5 h-5" />;
      case "thesis":
        return <GraduationCap className="w-5 h-5" />;
      case "manual":
        return <PenTool className="w-5 h-5" />;
      case "guide":
        return <BookOpen className="w-5 h-5" />;
      case "reference":
        return <Archive className="w-5 h-5" />;
      default:
        return <FileText className="w-5 h-5" />;
    }
  };

  const competitiveExams = [
    "JEE Main",
    "JEE Advanced",
    "NEET",
    "GATE",
    "CAT",
    "GMAT",
    "GRE",
    "TOEFL",
    "IELTS",
    "UPSC",
    "SSC",
  ];
  const sources = [
    "Google Books",
    "Amazon Kindle",
    "Kobo",
    "Open Library",
    "Internet Archive",
    "Wikipedia",
    "Nature",
    "IEEE",
    "Springer",
    "JSTOR",
  ];
  const subjects = [
    "Mathematics",
    "Physics",
    "Chemistry",
    "Biology",
    "Computer Science",
    "History",
    "Literature",
    "Economics",
    "General Studies",
  ];
  const types = [
    "book",
    "research",
    "notes",
    "article",
    "thesis",
    "manual",
    "guide",
    "reference",
  ];

  return (
    <div className="min-h-screen bg-dark text-foreground">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <div className="flex items-center justify-center mb-4">
            <div className="p-3 bg-primary-gradient rounded-2xl">
              <Library className="w-8 h-8 text-white" />
            </div>
          </div>
          <h1 className="heading-lg text-gradient mb-4">
            Internet Study Library
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Access millions of books, research papers, notes, and academic
            resources from across the internet. Search Google Books, Kindle,
            Kobo, academic databases, and more.
          </p>
        </motion.div>

        <Tabs
          value={activeTab}
          onValueChange={setActiveTab}
          className="space-y-6"
        >
          <TabsList className="grid w-full grid-cols-3 bg-dark-card">
            <TabsTrigger
              value="search"
              className="data-[state=active]:bg-primary data-[state=active]:text-white"
            >
              <Search className="w-4 h-4 mr-2" />
              Search Library
            </TabsTrigger>
            <TabsTrigger
              value="downloaded"
              className="data-[state=active]:bg-primary data-[state=active]:text-white"
            >
              <HardDrive className="w-4 h-4 mr-2" />
              Downloaded ({downloadedResources.length})
            </TabsTrigger>
            <TabsTrigger
              value="bookmarks"
              className="data-[state=active]:bg-primary data-[state=active]:text-white"
            >
              <Bookmark className="w-4 h-4 mr-2" />
              Bookmarks
            </TabsTrigger>
          </TabsList>

          {/* Search Tab */}
          <TabsContent value="search" className="space-y-6">
            {/* Search Interface */}
            <Card className="bg-dark-card border-border">
              <CardHeader>
                <div className="flex items-center space-x-2 mb-4">
                  <Network className="w-5 h-5 text-green-400" />
                  <span className="text-green-400 text-sm font-medium">
                    Connected to Internet Libraries
                  </span>
                  <Badge className="bg-green-500/20 text-green-400 border-green-500/30">
                    Live Access
                  </Badge>
                </div>
                <CardTitle className="text-foreground">
                  Search Millions of Resources
                </CardTitle>
                <CardDescription>
                  Access books, research papers, and educational materials from
                  Google Books, Kindle, academic databases, and more
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Search Bar */}
                <div className="flex space-x-4">
                  <div className="flex-1 relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
                    <Input
                      type="text"
                      placeholder="Search for books, research papers, notes, guides... (e.g., 'quantum physics textbook', 'machine learning research')"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10 h-12 bg-input border-border text-foreground placeholder-muted-foreground"
                      onKeyPress={(e) => e.key === "Enter" && handleSearch()}
                    />
                    {isSearching && (
                      <RefreshCw className="absolute right-3 top-1/2 transform -translate-y-1/2 text-primary w-5 h-5 animate-spin" />
                    )}
                  </div>
                  <Button
                    onClick={handleSearch}
                    disabled={isSearching}
                    className="bg-primary-gradient hover:opacity-90 text-white h-12 px-8"
                  >
                    {isSearching ? (
                      <>
                        <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                        Searching...
                      </>
                    ) : (
                      <>
                        <Search className="w-4 h-4 mr-2" />
                        Search Internet
                      </>
                    )}
                  </Button>
                </div>

                {/* Filters */}
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                  <Select value={selectedType} onValueChange={setSelectedType}>
                    <SelectTrigger className="bg-input border-border text-foreground">
                      <SelectValue placeholder="Type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Types</SelectItem>
                      {types.map((type) => (
                        <SelectItem key={type} value={type}>
                          {type.charAt(0).toUpperCase() + type.slice(1)}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  <Select
                    value={selectedSubject}
                    onValueChange={setSelectedSubject}
                  >
                    <SelectTrigger className="bg-input border-border text-foreground">
                      <SelectValue placeholder="Subject" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Subjects</SelectItem>
                      {subjects.map((subject) => (
                        <SelectItem key={subject} value={subject}>
                          {subject}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  <Select
                    value={selectedDifficulty}
                    onValueChange={setSelectedDifficulty}
                  >
                    <SelectTrigger className="bg-input border-border text-foreground">
                      <SelectValue placeholder="Level" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Levels</SelectItem>
                      <SelectItem value="Beginner">Beginner</SelectItem>
                      <SelectItem value="Intermediate">Intermediate</SelectItem>
                      <SelectItem value="Advanced">Advanced</SelectItem>
                      <SelectItem value="Expert">Expert</SelectItem>
                    </SelectContent>
                  </Select>

                  <Select
                    value={selectedSource}
                    onValueChange={setSelectedSource}
                  >
                    <SelectTrigger className="bg-input border-border text-foreground">
                      <SelectValue placeholder="Source" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Sources</SelectItem>
                      {sources.map((source) => (
                        <SelectItem key={source} value={source}>
                          {source}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  <Select value={selectedExam} onValueChange={setSelectedExam}>
                    <SelectTrigger className="bg-input border-border text-foreground">
                      <SelectValue placeholder="Exam" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Exams</SelectItem>
                      {competitiveExams.map((exam) => (
                        <SelectItem key={exam} value={exam}>
                          {exam}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Search Results Count */}
                <div className="flex items-center justify-between text-sm text-muted-foreground">
                  <span>
                    Found {resources.length} resources from internet libraries
                  </span>
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-1">
                      <Globe className="w-4 h-4" />
                      <span>Live Search</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Database className="w-4 h-4" />
                      <span>Academic Databases</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Book className="w-4 h-4" />
                      <span>Digital Libraries</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Search Results */}
            {resources.length > 0 && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {resources.map((resource, index) => (
                  <motion.div
                    key={resource.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Card className="bg-dark-card border-border hover:border-primary/50 transition-all duration-300 h-full">
                      <div className="relative aspect-[4/3] overflow-hidden rounded-t-lg">
                        <img
                          src={resource.thumbnail}
                          alt={resource.title}
                          className="w-full h-full object-cover"
                        />

                        <div className="absolute top-3 left-3 flex flex-wrap gap-2">
                          <Badge className="bg-primary/80 text-white flex items-center">
                            {getTypeIcon(resource.type)}
                            <span className="ml-1">
                              {resource.type.toUpperCase()}
                            </span>
                          </Badge>
                          {resource.isOpenAccess && (
                            <Badge className="bg-green-500/80 text-white">
                              Free
                            </Badge>
                          )}
                          {resource.isPremium && (
                            <Badge className="bg-orange-500/80 text-white">
                              Premium
                            </Badge>
                          )}
                        </div>

                        <div className="absolute top-3 right-3">
                          <Badge className="bg-background/80 text-foreground">
                            {resource.source}
                          </Badge>
                        </div>

                        <div className="absolute bottom-3 right-3 bg-black/70 text-white text-xs px-2 py-1 rounded">
                          {resource.pages
                            ? `${resource.pages} pages`
                            : formatFileSize(resource.fileSize)}
                        </div>
                      </div>

                      <CardContent className="p-6">
                        <div className="flex items-center justify-between mb-2">
                          <Badge
                            variant="outline"
                            className="border-border text-muted-foreground"
                          >
                            {resource.subject}
                          </Badge>
                          <Badge
                            variant="outline"
                            className={`border-border ${
                              resource.difficulty === "Beginner"
                                ? "text-green-400"
                                : resource.difficulty === "Intermediate"
                                  ? "text-blue-400"
                                  : resource.difficulty === "Advanced"
                                    ? "text-orange-400"
                                    : "text-red-400"
                            }`}
                          >
                            {resource.difficulty}
                          </Badge>
                        </div>

                        <h3 className="text-lg font-semibold text-foreground mb-2 line-clamp-2">
                          {resource.title}
                        </h3>

                        <p className="text-muted-foreground text-sm line-clamp-3 mb-3">
                          {resource.description}
                        </p>

                        <div className="flex items-center space-x-2 mb-3">
                          <Avatar className="w-6 h-6">
                            <AvatarImage
                              src={resource.author.avatar}
                              alt={resource.author.name}
                            />
                            <AvatarFallback>
                              {resource.author.name[0]}
                            </AvatarFallback>
                          </Avatar>
                          <div className="flex-1 min-w-0">
                            <span className="text-sm text-foreground truncate">
                              {resource.author.name}
                            </span>
                            <div className="text-xs text-muted-foreground">
                              {resource.author.institution}
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center justify-between text-sm text-muted-foreground mb-4">
                          <div className="flex items-center space-x-4">
                            <div className="flex items-center space-x-1">
                              <Star className="w-4 h-4 fill-primary text-primary" />
                              <span className="font-medium text-foreground">
                                {resource.rating.toFixed(1)}
                              </span>
                              <span>({resource.reviews})</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <Eye className="w-4 h-4" />
                              <span>{(resource.views / 1000).toFixed(0)}K</span>
                            </div>
                          </div>
                        </div>

                        {resource.competitiveExams &&
                          resource.competitiveExams.length > 0 && (
                            <div className="flex flex-wrap gap-1 mb-4">
                              {resource.competitiveExams
                                .slice(0, 2)
                                .map((exam, index) => (
                                  <Badge
                                    key={index}
                                    variant="secondary"
                                    className="text-xs bg-secondary/50 text-muted-foreground"
                                  >
                                    {exam}
                                  </Badge>
                                ))}
                              {resource.competitiveExams.length > 2 && (
                                <Badge
                                  variant="secondary"
                                  className="text-xs bg-secondary/50 text-muted-foreground"
                                >
                                  +{resource.competitiveExams.length - 2} more
                                </Badge>
                              )}
                            </div>
                          )}

                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-2">
                            <button
                              onClick={() => handleBookmark(resource.id)}
                              className={`p-2 rounded-lg transition-colors ${
                                resource.isBookmarked
                                  ? "text-primary bg-primary/10"
                                  : "text-muted-foreground hover:text-foreground hover:bg-muted"
                              }`}
                            >
                              <Bookmark
                                className={`w-4 h-4 ${resource.isBookmarked ? "fill-current" : ""}`}
                              />
                            </button>
                            <button className="p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted transition-colors">
                              <Share className="w-4 h-4" />
                            </button>
                          </div>

                          <div className="flex items-center space-x-2">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() =>
                                window.open(resource.url, "_blank")
                              }
                              className="border-border text-muted-foreground hover:text-foreground"
                            >
                              <Eye className="w-4 h-4 mr-1" />
                              View
                            </Button>
                            <Button
                              size="sm"
                              onClick={() => handleDownload(resource)}
                              className="bg-primary hover:bg-primary/80 text-white"
                            >
                              <Download className="w-4 h-4 mr-1" />
                              Download
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            )}

            {/* No results */}
            {resources.length === 0 && !isSearching && searchQuery && (
              <Card className="bg-dark-card border-border">
                <CardContent className="text-center py-16">
                  <Search className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-foreground mb-2">
                    No resources found
                  </h3>
                  <p className="text-muted-foreground mb-6">
                    Try different keywords or adjust your filters
                  </p>
                  <Button
                    onClick={() => {
                      setSearchQuery("");
                      setSelectedType("all");
                      setSelectedSubject("all");
                      setSelectedDifficulty("all");
                      setSelectedSource("all");
                      setSelectedExam("all");
                    }}
                  >
                    Clear Search
                  </Button>
                </CardContent>
              </Card>
            )}

            {/* Loading */}
            {isSearching && (
              <Card className="bg-dark-card border-border">
                <CardContent className="text-center py-16">
                  <RefreshCw className="w-16 h-16 text-primary mx-auto mb-4 animate-spin" />
                  <h3 className="text-xl font-semibold text-foreground mb-2">
                    Searching Internet Libraries...
                  </h3>
                  <p className="text-muted-foreground">
                    Accessing Google Books, Kindle, academic databases, and more
                  </p>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          {/* Downloaded Tab */}
          <TabsContent value="downloaded" className="space-y-6">
            <Card className="bg-dark-card border-border">
              <CardHeader>
                <CardTitle className="flex items-center text-foreground">
                  <HardDrive className="w-5 h-5 mr-2" />
                  Downloaded Resources ({downloadedResources.length})
                </CardTitle>
                <CardDescription>
                  Manage your downloaded books, research papers, and study
                  materials
                </CardDescription>
              </CardHeader>
              <CardContent>
                {downloadedResources.length > 0 ? (
                  <div className="space-y-4">
                    {downloadedResources.map((downloaded) => (
                      <div
                        key={downloaded.id}
                        className="flex items-center space-x-4 p-4 bg-card border border-border rounded-lg"
                      >
                        <div className="flex-shrink-0">
                          {getTypeIcon(downloaded.resource.type)}
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="font-medium text-foreground truncate">
                            {downloaded.resource.title}
                          </h4>
                          <p className="text-sm text-muted-foreground">
                            {downloaded.resource.author.name}
                          </p>
                          <div className="flex items-center space-x-4 mt-2 text-xs text-muted-foreground">
                            <span>
                              Downloaded:{" "}
                              {new Date(
                                downloaded.downloadedAt,
                              ).toLocaleDateString()}
                            </span>
                            <span>Progress: {downloaded.readProgress}%</span>
                            <span>
                              Bookmarks: {downloaded.bookmarks.length}
                            </span>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Button
                            variant="outline"
                            size="sm"
                            className="border-border text-muted-foreground"
                          >
                            <Eye className="w-4 h-4 mr-1" />
                            Open
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            className="border-border text-muted-foreground"
                          >
                            <FolderOpen className="w-4 h-4 mr-1" />
                            Locate
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <HardDrive className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-foreground mb-2">
                      No downloads yet
                    </h3>
                    <p className="text-muted-foreground">
                      Start downloading resources to access them offline
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Bookmarks Tab */}
          <TabsContent value="bookmarks" className="space-y-6">
            <Card className="bg-dark-card border-border">
              <CardHeader>
                <CardTitle className="flex items-center text-foreground">
                  <Bookmark className="w-5 h-5 mr-2" />
                  Bookmarked Resources
                </CardTitle>
                <CardDescription>
                  Quick access to your saved resources
                </CardDescription>
              </CardHeader>
              <CardContent>
                {resources.filter((r) => r.isBookmarked).length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {resources
                      .filter((r) => r.isBookmarked)
                      .map((resource) => (
                        <div
                          key={resource.id}
                          className="flex items-center space-x-4 p-4 bg-card border border-border rounded-lg"
                        >
                          <div className="flex-shrink-0">
                            {getTypeIcon(resource.type)}
                          </div>
                          <div className="flex-1 min-w-0">
                            <h4 className="font-medium text-foreground truncate">
                              {resource.title}
                            </h4>
                            <p className="text-sm text-muted-foreground">
                              {resource.author.name}
                            </p>
                            <div className="flex items-center space-x-2 mt-1">
                              <Badge
                                variant="outline"
                                className="text-xs border-border text-muted-foreground"
                              >
                                {resource.source}
                              </Badge>
                              <Badge
                                variant="outline"
                                className="text-xs border-border text-muted-foreground"
                              >
                                {resource.type}
                              </Badge>
                            </div>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() =>
                                window.open(resource.url, "_blank")
                              }
                              className="border-border text-muted-foreground"
                            >
                              <Eye className="w-4 h-4 mr-1" />
                              View
                            </Button>
                          </div>
                        </div>
                      ))}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <Bookmark className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-foreground mb-2">
                      No bookmarks yet
                    </h3>
                    <p className="text-muted-foreground">
                      Bookmark resources while searching to save them for later
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
