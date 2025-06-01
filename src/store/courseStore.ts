import { create } from "zustand";
import api from "@/lib/api";

interface Course {
  id: string;
  title: string;
  instructor: string;
  duration: string;
  students: number;
  rating: number;
  price: number;
  level: string;
  category: string;
  description: string;
  curriculum: string[];
  enrolled: number;
  language: string;
  subtitles: string[];
  certificate: boolean;
}

interface CourseState {
  courses: Course[];
  loading: boolean;
  error: string | null;
  filters: {
    category: string;
    level: string;
    search: string;
  };
  enrolledCourses: string[];

  // Actions
  fetchCourses: () => Promise<void>;
  setCourses: (courses: Course[]) => void;
  setFilters: (filters: Partial<CourseState["filters"]>) => void;
  clearFilters: () => void;
  enrollInCourse: (courseId: string) => Promise<boolean>;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
}

export const useCourseStore = create<CourseState>((set, get) => ({
  courses: [],
  loading: false,
  error: null,
  filters: {
    category: "All",
    level: "All",
    search: "",
  },
  enrolledCourses: [],

  fetchCourses: async () => {
    set({ loading: true, error: null });
    try {
      const { filters } = get();
      const courses = await api.getCourses(filters);
      set({ courses, loading: false });
    } catch (error) {
      set({ error: "Failed to fetch courses", loading: false });
    }
  },

  setCourses: (courses) => set({ courses }),

  setFilters: (newFilters) => {
    set({
      filters: { ...get().filters, ...newFilters },
    });
    // Auto-fetch when filters change
    get().fetchCourses();
  },

  clearFilters: () => {
    set({
      filters: { category: "All", level: "All", search: "" },
    });
    get().fetchCourses();
  },

  enrollInCourse: async (courseId: string) => {
    try {
      const result = await api.enrollInCourse(courseId);
      if (result.success) {
        set({
          enrolledCourses: [...get().enrolledCourses, courseId],
        });
        return true;
      }
      return false;
    } catch (error) {
      set({ error: "Failed to enroll in course" });
      return false;
    }
  },

  setLoading: (loading) => set({ loading }),
  setError: (error) => set({ error }),
}));

export default useCourseStore;
