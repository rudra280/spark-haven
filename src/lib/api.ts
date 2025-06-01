// Simulated backend API with local storage persistence
class APIService {
  private baseURL = "https://api.learnverse.com";

  // Local storage keys
  private keys = {
    users: "learnverse_users",
    courses: "learnverse_courses",
    enrollments: "learnverse_enrollments",
    messages: "learnverse_messages",
    tutors: "learnverse_tutors",
    payments: "learnverse_payments",
    progress: "learnverse_progress",
    currentUser: "learnverse_current_user",
  };

  // Initialize with demo data
  constructor() {
    this.initializeDemoData();
  }

  private initializeDemoData() {
    if (!localStorage.getItem(this.keys.users)) {
      const demoUsers = [
        {
          id: "1",
          name: "John Doe",
          email: "john@example.com",
          password: "password123",
          avatar: "",
          plan: "pro",
          joinedAt: new Date().toISOString(),
          completedCourses: ["1", "3"],
          enrolledCourses: ["2", "4", "5"],
          progress: {
            totalHours: 45,
            coursesCompleted: 2,
            currentStreak: 15,
          },
        },
      ];
      localStorage.setItem(this.keys.users, JSON.stringify(demoUsers));
    }

    if (!localStorage.getItem(this.keys.courses)) {
      const demoCourses = [
        {
          id: "1",
          title: "Complete Python Programming",
          instructor: "Dr. Sarah Wilson",
          duration: "12 hours",
          students: 15420,
          rating: 4.9,
          price: 2999,
          level: "Beginner",
          category: "Programming",
          description: "Master Python from basics to advanced concepts",
          curriculum: [
            "Python Basics and Syntax",
            "Data Structures and Algorithms",
            "Object-Oriented Programming",
            "File Handling and APIs",
            "Web Development with Flask",
            "Final Project",
          ],
          enrolled: 15420,
          language: "English",
          subtitles: ["Hindi", "English"],
          certificate: true,
        },
        {
          id: "2",
          title: "Advanced React Development",
          instructor: "Prof. Mike Chen",
          duration: "18 hours",
          students: 8930,
          rating: 4.8,
          price: 3999,
          level: "Advanced",
          category: "Web Development",
          description: "Build modern web applications with React",
          curriculum: [
            "React Fundamentals",
            "State Management with Redux",
            "Advanced Hooks",
            "Performance Optimization",
            "Testing React Applications",
            "Deployment Strategies",
          ],
          enrolled: 8930,
          language: "English",
          subtitles: ["Hindi", "English"],
          certificate: true,
        },
      ];
      localStorage.setItem(this.keys.courses, JSON.stringify(demoCourses));
    }
  }

  // Authentication
  async login(
    email: string,
    password: string,
  ): Promise<{ success: boolean; user?: any; token?: string; error?: string }> {
    await this.delay(1000); // Simulate network delay

    const users = JSON.parse(localStorage.getItem(this.keys.users) || "[]");
    const user = users.find(
      (u: any) => u.email === email && u.password === password,
    );

    if (user) {
      const token = `token_${Date.now()}_${Math.random()}`;
      localStorage.setItem(
        this.keys.currentUser,
        JSON.stringify({ ...user, token }),
      );
      return { success: true, user: { ...user, password: undefined }, token };
    }

    return { success: false, error: "Invalid email or password" };
  }

  async register(userData: {
    name: string;
    email: string;
    password: string;
  }): Promise<{ success: boolean; user?: any; error?: string }> {
    await this.delay(1200);

    const users = JSON.parse(localStorage.getItem(this.keys.users) || "[]");
    const existingUser = users.find((u: any) => u.email === userData.email);

    if (existingUser) {
      return { success: false, error: "User already exists with this email" };
    }

    const newUser = {
      id: Date.now().toString(),
      ...userData,
      avatar: "",
      plan: "free",
      joinedAt: new Date().toISOString(),
      completedCourses: [],
      enrolledCourses: [],
      progress: {
        totalHours: 0,
        coursesCompleted: 0,
        currentStreak: 0,
      },
    };

    users.push(newUser);
    localStorage.setItem(this.keys.users, JSON.stringify(users));

    return { success: true, user: { ...newUser, password: undefined } };
  }

  async logout(): Promise<void> {
    localStorage.removeItem(this.keys.currentUser);
  }

  getCurrentUser(): any {
    const userData = localStorage.getItem(this.keys.currentUser);
    return userData ? JSON.parse(userData) : null;
  }

  // Courses
  async getCourses(filters?: {
    category?: string;
    level?: string;
    search?: string;
  }): Promise<any[]> {
    await this.delay(500);

    let courses = JSON.parse(localStorage.getItem(this.keys.courses) || "[]");

    if (filters?.category && filters.category !== "All") {
      courses = courses.filter((c: any) => c.category === filters.category);
    }

    if (filters?.level && filters.level !== "All") {
      courses = courses.filter((c: any) => c.level === filters.level);
    }

    if (filters?.search) {
      courses = courses.filter(
        (c: any) =>
          c.title.toLowerCase().includes(filters.search!.toLowerCase()) ||
          c.description.toLowerCase().includes(filters.search!.toLowerCase()),
      );
    }

    return courses;
  }

  async getCourse(id: string): Promise<any> {
    await this.delay(300);

    const courses = JSON.parse(localStorage.getItem(this.keys.courses) || "[]");
    return courses.find((c: any) => c.id === id);
  }

  async enrollInCourse(
    courseId: string,
  ): Promise<{ success: boolean; error?: string }> {
    await this.delay(800);

    const currentUser = this.getCurrentUser();
    if (!currentUser) {
      return { success: false, error: "User not logged in" };
    }

    const users = JSON.parse(localStorage.getItem(this.keys.users) || "[]");
    const userIndex = users.findIndex((u: any) => u.id === currentUser.id);

    if (userIndex !== -1) {
      if (!users[userIndex].enrolledCourses.includes(courseId)) {
        users[userIndex].enrolledCourses.push(courseId);
        localStorage.setItem(this.keys.users, JSON.stringify(users));

        // Update current user session
        localStorage.setItem(
          this.keys.currentUser,
          JSON.stringify(users[userIndex]),
        );
      }
    }

    return { success: true };
  }

  // AI Tutor Chat
  async sendMessageToAITutor(message: string): Promise<{ response: string }> {
    await this.delay(1500); // Simulate AI processing time

    const responses = [
      `Great question about "${message}"! Let me break this down for you step by step...`,
      `I understand you're asking about "${message}". Here's a comprehensive explanation...`,
      `That's an excellent topic! "${message}" is fundamental to understanding...`,
      `Let me help you with "${message}". Here's what you need to know...`,
      `Perfect question! For "${message}", I recommend starting with these key concepts...`,
    ];

    const response = responses[Math.floor(Math.random() * responses.length)];

    // Store chat history
    const chatHistory = JSON.parse(
      localStorage.getItem("ai_chat_history") || "[]",
    );
    chatHistory.push({
      id: Date.now(),
      message,
      response,
      timestamp: new Date().toISOString(),
    });
    localStorage.setItem(
      "ai_chat_history",
      JSON.stringify(chatHistory.slice(-50)),
    ); // Keep last 50 messages

    return { response };
  }

  // Tutors
  async getTutors(filters?: {
    subject?: string;
    location?: string;
    rating?: number;
  }): Promise<any[]> {
    await this.delay(600);

    const tutors = [
      {
        id: "1",
        name: "Dr. Priya Sharma",
        subjects: ["Mathematics", "Physics"],
        rating: 4.9,
        reviews: 127,
        hourlyRate: 1200,
        location: "Delhi, India",
        experience: "8 years",
        verified: true,
        availability: "Available Now",
        languages: ["Hindi", "English"],
        responseTime: "< 30 mins",
      },
      {
        id: "2",
        name: "Prof. Rajesh Kumar",
        subjects: ["Computer Science", "Programming"],
        rating: 4.8,
        reviews: 89,
        hourlyRate: 1500,
        location: "Bangalore, India",
        experience: "6 years",
        verified: true,
        availability: "Available Today",
        languages: ["English", "Hindi", "Kannada"],
        responseTime: "< 1 hour",
      },
    ];

    let filteredTutors = tutors;

    if (filters?.subject) {
      filteredTutors = filteredTutors.filter((t) =>
        t.subjects.some((s) =>
          s.toLowerCase().includes(filters.subject!.toLowerCase()),
        ),
      );
    }

    if (filters?.location) {
      filteredTutors = filteredTutors.filter((t) =>
        t.location.toLowerCase().includes(filters.location!.toLowerCase()),
      );
    }

    return filteredTutors;
  }

  async bookTutorSession(
    tutorId: string,
    sessionData: any,
  ): Promise<{ success: boolean; bookingId?: string }> {
    await this.delay(1000);

    const bookingId = `booking_${Date.now()}`;
    const booking = {
      id: bookingId,
      tutorId,
      studentId: this.getCurrentUser()?.id,
      ...sessionData,
      status: "confirmed",
      createdAt: new Date().toISOString(),
    };

    const bookings = JSON.parse(localStorage.getItem("tutor_bookings") || "[]");
    bookings.push(booking);
    localStorage.setItem("tutor_bookings", JSON.stringify(bookings));

    return { success: true, bookingId };
  }

  // Payments
  async processPayment(paymentData: {
    amount: number;
    method: string;
    planName: string;
    cardDetails?: any;
  }): Promise<{ success: boolean; paymentId?: string; error?: string }> {
    await this.delay(3000); // Simulate payment processing

    // Simulate 95% success rate
    if (Math.random() > 0.05) {
      const paymentId = `pay_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

      const payment = {
        id: paymentId,
        ...paymentData,
        status: "success",
        timestamp: new Date().toISOString(),
        userId: this.getCurrentUser()?.id,
      };

      const payments = JSON.parse(
        localStorage.getItem(this.keys.payments) || "[]",
      );
      payments.push(payment);
      localStorage.setItem(this.keys.payments, JSON.stringify(payments));

      // Update user plan
      const currentUser = this.getCurrentUser();
      if (currentUser) {
        const users = JSON.parse(localStorage.getItem(this.keys.users) || "[]");
        const userIndex = users.findIndex((u: any) => u.id === currentUser.id);
        if (userIndex !== -1) {
          users[userIndex].plan = paymentData.planName
            .toLowerCase()
            .replace(" ", "_");
          localStorage.setItem(this.keys.users, JSON.stringify(users));
          localStorage.setItem(
            this.keys.currentUser,
            JSON.stringify(users[userIndex]),
          );
        }
      }

      return { success: true, paymentId };
    } else {
      return { success: false, error: "Payment failed. Please try again." };
    }
  }

  // AI Video Generation
  async generateAIVideo(prompt: {
    topic: string;
    subject: string;
    grade: string;
    style: string;
    duration: string;
  }): Promise<{ success: boolean; videoId?: string; videoUrl?: string }> {
    await this.delay(5000); // Simulate AI video generation

    const videoId = `video_${Date.now()}`;
    const videoUrl = `https://cdn.learnverse.com/ai-videos/${videoId}.mp4`;

    const video = {
      id: videoId,
      ...prompt,
      url: videoUrl,
      thumbnail: `https://cdn.learnverse.com/thumbnails/${videoId}.jpg`,
      createdAt: new Date().toISOString(),
      createdBy: this.getCurrentUser()?.id,
      views: 0,
      likes: 0,
    };

    const aiVideos = JSON.parse(
      localStorage.getItem("ai_generated_videos") || "[]",
    );
    aiVideos.push(video);
    localStorage.setItem("ai_generated_videos", JSON.stringify(aiVideos));

    return { success: true, videoId, videoUrl };
  }

  async getAIVideos(): Promise<any[]> {
    await this.delay(400);
    return JSON.parse(localStorage.getItem("ai_generated_videos") || "[]");
  }

  // Progress Tracking
  async updateProgress(
    courseId: string,
    lessonId: string,
    progress: number,
  ): Promise<void> {
    await this.delay(200);

    const currentUser = this.getCurrentUser();
    if (!currentUser) return;

    const progressKey = `progress_${currentUser.id}_${courseId}`;
    const courseProgress = JSON.parse(
      localStorage.getItem(progressKey) || "{}",
    );

    courseProgress[lessonId] = {
      progress,
      lastWatched: new Date().toISOString(),
      completed: progress >= 100,
    };

    localStorage.setItem(progressKey, JSON.stringify(courseProgress));
  }

  async getProgress(courseId: string): Promise<any> {
    const currentUser = this.getCurrentUser();
    if (!currentUser) return {};

    const progressKey = `progress_${currentUser.id}_${courseId}`;
    return JSON.parse(localStorage.getItem(progressKey) || "{}");
  }

  // Study Materials
  async getStudyMaterials(filters?: {
    grade?: string;
    subject?: string;
  }): Promise<any[]> {
    await this.delay(500);

    const materials = [
      {
        id: "1",
        title: "NCERT Class 10 Mathematics - Complete Solutions",
        subject: "Mathematics",
        grade: "Class 10",
        type: "PDF",
        pages: 156,
        downloads: 245680,
        rating: 4.9,
        university: "NCERT",
        verified: true,
        downloadUrl: "https://cdn.learnverse.com/materials/ncert_math_10.pdf",
        previewUrl:
          "https://cdn.learnverse.com/previews/ncert_math_10_preview.pdf",
      },
      {
        id: "2",
        title: "IIT-JEE Physics - Mechanics Notes",
        subject: "Physics",
        grade: "Class 11-12",
        type: "PDF",
        pages: 234,
        downloads: 167890,
        rating: 4.8,
        university: "IIT Delhi",
        verified: true,
        downloadUrl:
          "https://cdn.learnverse.com/materials/iit_physics_mechanics.pdf",
        previewUrl:
          "https://cdn.learnverse.com/previews/iit_physics_mechanics_preview.pdf",
      },
    ];

    let filtered = materials;

    if (filters?.grade && filters.grade !== "All") {
      filtered = filtered.filter((m) => m.grade.includes(filters.grade!));
    }

    if (filters?.subject && filters.subject !== "All") {
      filtered = filtered.filter((m) => m.subject === filters.subject);
    }

    return filtered;
  }

  async downloadMaterial(
    materialId: string,
  ): Promise<{ success: boolean; downloadUrl?: string }> {
    await this.delay(800);

    const materials = await this.getStudyMaterials();
    const material = materials.find((m) => m.id === materialId);

    if (material) {
      // Track download
      const downloads = JSON.parse(
        localStorage.getItem("material_downloads") || "[]",
      );
      downloads.push({
        materialId,
        userId: this.getCurrentUser()?.id,
        downloadedAt: new Date().toISOString(),
      });
      localStorage.setItem("material_downloads", JSON.stringify(downloads));

      return { success: true, downloadUrl: material.downloadUrl };
    }

    return { success: false };
  }

  // Helper method to simulate network delay
  private delay(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  // Get user statistics
  async getUserStats(): Promise<any> {
    const currentUser = this.getCurrentUser();
    if (!currentUser) return null;

    await this.delay(300);

    return {
      totalHours: currentUser.progress?.totalHours || 0,
      coursesCompleted: currentUser.completedCourses?.length || 0,
      coursesEnrolled: currentUser.enrolledCourses?.length || 0,
      currentStreak: currentUser.progress?.currentStreak || 0,
      certificates: currentUser.completedCourses?.length || 0,
      plan: currentUser.plan || "free",
    };
  }

  // Real-time features
  async getNotifications(): Promise<any[]> {
    await this.delay(200);

    return [
      {
        id: "1",
        type: "course_update",
        title: "New lesson available!",
        message: "Python Programming Course has a new lesson",
        timestamp: new Date().toISOString(),
        read: false,
      },
      {
        id: "2",
        type: "achievement",
        title: "Congratulations! 🎉",
        message: "You completed your 5th course",
        timestamp: new Date(Date.now() - 86400000).toISOString(),
        read: false,
      },
    ];
  }

  async markNotificationRead(notificationId: string): Promise<void> {
    await this.delay(100);
    // Implementation for marking notifications as read
  }
}

// Export singleton instance
export const api = new APIService();
export default api;
