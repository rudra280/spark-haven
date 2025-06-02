import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { gsap } from "gsap";
import { api } from "@/lib/api";

interface User {
  id: string;
  name: string;
  email: string;
  plan: "free" | "pro" | "ultimate";
  avatar: string;
  verified: boolean;
  createdAt: string;
  profile: {
    bio: string;
    location: string;
    website: string;
    skills: string[];
    achievements: string[];
    totalWatchTime: number;
    coursesCompleted: number;
    certificates: number;
  };
  subscription: {
    plan: string;
    status: "active" | "inactive" | "cancelled";
    validUntil: string | null;
  };
  preferences: {
    language: string;
    notifications: boolean;
    theme: "light" | "dark";
    autoplay: boolean;
  };
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (
    email: string,
    password: string,
  ) => Promise<{ success: boolean; error?: string }>;
  register: (userData: {
    name: string;
    email: string;
    password: string;
    plan?: "free" | "pro" | "ultimate";
  }) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
  updateProfile: (updates: Partial<User["profile"]>) => Promise<boolean>;
  upgradePlan: (plan: "pro" | "ultimate") => Promise<boolean>;
  refreshUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Initialize auth state
  useEffect(() => {
    initializeAuth();
  }, []);

  const initializeAuth = async () => {
    setIsLoading(true);
    try {
      const token = localStorage.getItem("auth_token");
      const userData = localStorage.getItem("current_user");

      if (token && userData) {
        const parsedUser = JSON.parse(userData);

        // Validate token (in real app, verify with server)
        if (isValidToken(token)) {
          setUser(parsedUser);
          setIsAuthenticated(true);

          // Animate user avatar on load
          gsap.fromTo(
            ".user-avatar",
            { scale: 0, rotation: -180 },
            { scale: 1, rotation: 0, duration: 0.8, ease: "back.out(1.7)" },
          );
        } else {
          // Token expired, clear auth
          logout();
        }
      }
    } catch (error) {
      console.error("Auth initialization error:", error);
      logout();
    } finally {
      setIsLoading(false);
    }
  };

  const login = async (
    email: string,
    password: string,
  ): Promise<{ success: boolean; error?: string }> => {
    setIsLoading(true);

    try {
      // Add loading animation
      gsap.to(".login-form", {
        scale: 0.95,
        opacity: 0.7,
        duration: 0.3,
        ease: "power2.out",
      });

      const result = await api.login(email, password);

      if (result.success && result.user) {
        setUser(result.user);
        setIsAuthenticated(true);

        // Success animation
        gsap.to(".login-form", {
          scale: 1.05,
          opacity: 1,
          duration: 0.3,
          ease: "back.out(1.7)",
          onComplete: () => {
            gsap.to(".login-form", {
              scale: 1,
              duration: 0.2,
            });
          },
        });

        // Celebrate with confetti effect (implement if needed)
        triggerSuccessAnimation();

        return { success: true };
      } else {
        // Error animation
        gsap.to(".login-form", {
          x: -10,
          duration: 0.1,
          yoyo: true,
          repeat: 5,
          ease: "power2.inOut",
          onComplete: () => {
            gsap.set(".login-form", { x: 0, scale: 1, opacity: 1 });
          },
        });

        return { success: false, error: result.error || "Login failed" };
      }
    } catch (error) {
      gsap.set(".login-form", { scale: 1, opacity: 1 });
      return { success: false, error: "Network error. Please try again." };
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (userData: {
    name: string;
    email: string;
    password: string;
    plan?: "free" | "pro" | "ultimate";
  }): Promise<{ success: boolean; error?: string }> => {
    setIsLoading(true);

    try {
      // Registration loading animation
      gsap.to(".register-form", {
        rotationY: 5,
        scale: 0.98,
        duration: 0.3,
        ease: "power2.out",
      });

      const result = await api.register(userData);

      if (result.success && result.user) {
        setUser(result.user);
        setIsAuthenticated(true);

        // Welcome animation
        gsap.to(".register-form", {
          rotationY: 0,
          scale: 1.02,
          duration: 0.5,
          ease: "back.out(1.7)",
          onComplete: () => {
            gsap.to(".register-form", {
              scale: 1,
              duration: 0.3,
            });
          },
        });

        // Welcome celebration
        triggerWelcomeAnimation();

        return { success: true };
      } else {
        // Error shake animation
        gsap.to(".register-form", {
          rotationY: 0,
          scale: 1,
          x: -5,
          duration: 0.1,
          yoyo: true,
          repeat: 3,
          ease: "power2.inOut",
          onComplete: () => {
            gsap.set(".register-form", { x: 0 });
          },
        });

        return { success: false, error: result.error || "Registration failed" };
      }
    } catch (error) {
      gsap.set(".register-form", { rotationY: 0, scale: 1 });
      return { success: false, error: "Network error. Please try again." };
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    // Logout animation
    gsap.to(".user-avatar", {
      scale: 0,
      rotation: 180,
      duration: 0.5,
      ease: "power2.in",
      onComplete: () => {
        setUser(null);
        setIsAuthenticated(false);
        localStorage.removeItem("auth_token");
        localStorage.removeItem("current_user");
        api.logout();

        // Reset avatar
        gsap.set(".user-avatar", { scale: 1, rotation: 0 });
      },
    });
  };

  const updateProfile = async (
    updates: Partial<User["profile"]>,
  ): Promise<boolean> => {
    if (!user) return false;

    try {
      const updatedUser = {
        ...user,
        profile: { ...user.profile, ...updates },
      };

      setUser(updatedUser);
      localStorage.setItem("current_user", JSON.stringify(updatedUser));

      // Profile update animation
      gsap.fromTo(
        ".profile-section",
        { scale: 1 },
        {
          scale: 1.02,
          duration: 0.2,
          yoyo: true,
          repeat: 1,
          ease: "power2.inOut",
        },
      );

      return true;
    } catch (error) {
      console.error("Profile update error:", error);
      return false;
    }
  };

  const upgradePlan = async (plan: "pro" | "ultimate"): Promise<boolean> => {
    if (!user) return false;

    try {
      const paymentResult = await api.processPayment({
        amount: plan === "pro" ? 1499 : 2999,
        currency: "INR",
        method: "upi",
        planId: plan,
      });

      if (paymentResult.success) {
        const updatedUser = {
          ...user,
          plan,
          subscription: {
            ...user.subscription,
            plan,
            status: "active" as const,
            validUntil: new Date(
              Date.now() + 30 * 24 * 60 * 60 * 1000,
            ).toISOString(),
          },
        };

        setUser(updatedUser);
        localStorage.setItem("current_user", JSON.stringify(updatedUser));

        // Plan upgrade celebration
        triggerUpgradeAnimation();

        return true;
      }

      return false;
    } catch (error) {
      console.error("Plan upgrade error:", error);
      return false;
    }
  };

  const refreshUser = async (): Promise<void> => {
    // Refresh user data from localStorage/server
    const userData = localStorage.getItem("current_user");
    if (userData) {
      setUser(JSON.parse(userData));
    }
  };

  // Helper functions
  const isValidToken = (token: string): boolean => {
    try {
      const parts = token.split(".");
      if (parts.length !== 3) return false;

      const payload = JSON.parse(atob(parts[1]));
      return payload.exp > Date.now();
    } catch {
      return false;
    }
  };

  const triggerSuccessAnimation = () => {
    // Create success particle effect
    const particles = document.querySelectorAll(".success-particle");
    particles.forEach((particle, index) => {
      gsap.fromTo(
        particle,
        { scale: 0, rotation: 0, opacity: 1 },
        {
          scale: 1,
          rotation: 360,
          opacity: 0,
          duration: 1,
          delay: index * 0.1,
          ease: "power2.out",
        },
      );
    });
  };

  const triggerWelcomeAnimation = () => {
    // Welcome text animation
    gsap.fromTo(
      ".welcome-text",
      { y: 50, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, ease: "back.out(1.7)" },
    );
  };

  const triggerUpgradeAnimation = () => {
    // Plan upgrade celebration
    gsap.to(".plan-badge", {
      scale: 1.2,
      rotation: 5,
      duration: 0.3,
      yoyo: true,
      repeat: 3,
      ease: "power2.inOut",
    });
  };

  const contextValue: AuthContextType = {
    user,
    isAuthenticated,
    isLoading,
    login,
    register,
    logout,
    updateProfile,
    upgradePlan,
    refreshUser,
  };

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}

export default AuthContext;
