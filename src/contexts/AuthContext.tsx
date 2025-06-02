import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { realAuth, User } from "@/lib/realAuth";

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
    role: "student" | "creator" | "institution";
  }) => Promise<{ success: boolean; error?: string }>;
  signInWithGoogle: () => Promise<{ success: boolean; error?: string }>;
  signInWithGitHub: () => Promise<{ success: boolean; error?: string }>;
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
      // Check if user is already authenticated
      const currentUser = realAuth.getCurrentUser();
      if (currentUser && realAuth.isAuthenticated()) {
        setUser(currentUser);
        setIsAuthenticated(true);
        console.log(
          "✅ User authenticated:",
          currentUser.name,
          `(${currentUser.role})`,
        );
      } else {
        console.log("❌ No authenticated user found");
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
      console.log("🔐 Attempting login for:", email);
      const result = await realAuth.login(email, password);

      if (result.success && result.user) {
        setUser(result.user);
        setIsAuthenticated(true);
        console.log(
          "✅ Login successful:",
          result.user.name,
          `(${result.user.role})`,
        );
        return { success: true };
      } else {
        console.log("❌ Login failed:", result.error);
        return { success: false, error: result.error || "Login failed" };
      }
    } catch (error) {
      console.error("Login error:", error);
      return { success: false, error: "Network error. Please try again." };
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (userData: {
    name: string;
    email: string;
    password: string;
    role: "student" | "creator" | "institution";
  }): Promise<{ success: boolean; error?: string }> => {
    setIsLoading(true);

    try {
      console.log(
        "📝 Attempting registration for:",
        userData.email,
        `as ${userData.role}`,
      );
      const result = await realAuth.register(userData);

      if (result.success && result.user) {
        setUser(result.user);
        setIsAuthenticated(true);
        console.log(
          "✅ Registration successful:",
          result.user.name,
          `(${result.user.role})`,
        );
        return { success: true };
      } else {
        console.log("❌ Registration failed:", result.error);
        return { success: false, error: result.error || "Registration failed" };
      }
    } catch (error) {
      console.error("Registration error:", error);
      return { success: false, error: "Network error. Please try again." };
    } finally {
      setIsLoading(false);
    }
  };

  const signInWithGoogle = async (): Promise<{
    success: boolean;
    error?: string;
  }> => {
    setIsLoading(true);

    try {
      console.log("🔗 Attempting Google OAuth...");
      const result = await realAuth.signInWithGoogle();

      if (result.success && result.user) {
        setUser(result.user);
        setIsAuthenticated(true);
        console.log(
          "✅ Google OAuth successful:",
          result.user.name,
          `(${result.user.role})`,
        );
        return { success: true };
      } else {
        console.log("❌ Google OAuth failed:", result.error);
        return {
          success: false,
          error: result.error || "Google sign-in failed",
        };
      }
    } catch (error) {
      console.error("Google OAuth error:", error);
      return {
        success: false,
        error: "Google sign-in failed. Please try again.",
      };
    } finally {
      setIsLoading(false);
    }
  };

  const signInWithGitHub = async (): Promise<{
    success: boolean;
    error?: string;
  }> => {
    setIsLoading(true);

    try {
      console.log("🔗 Attempting GitHub OAuth...");
      const result = await realAuth.signInWithGitHub();

      if (result.success && result.user) {
        setUser(result.user);
        setIsAuthenticated(true);
        console.log(
          "✅ GitHub OAuth successful:",
          result.user.name,
          `(${result.user.role})`,
        );
        return { success: true };
      } else {
        console.log("❌ GitHub OAuth failed:", result.error);
        return {
          success: false,
          error: result.error || "GitHub sign-in failed",
        };
      }
    } catch (error) {
      console.error("GitHub OAuth error:", error);
      return {
        success: false,
        error: "GitHub sign-in failed. Please try again.",
      };
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    console.log("🚪 User logging out...");
    realAuth.logout();
    setUser(null);
    setIsAuthenticated(false);
    console.log("✅ Logout successful");
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
      localStorage.setItem("learnverse_user_data", JSON.stringify(updatedUser));

      console.log("✅ Profile updated successfully");
      return true;
    } catch (error) {
      console.error("Profile update error:", error);
      return false;
    }
  };

  const upgradePlan = async (plan: "pro" | "ultimate"): Promise<boolean> => {
    if (!user) return false;

    try {
      // Simulate payment processing
      await new Promise((resolve) => setTimeout(resolve, 2000));

      const updatedUser = {
        ...user,
        subscription: {
          ...user.subscription,
          plan,
          status: "active" as const,
          validUntil: new Date(
            Date.now() + 30 * 24 * 60 * 60 * 1000,
          ).toISOString(),
        },
        permissions: {
          ...user.permissions,
          hasPremiumFeatures: true,
          hasAIAccess: true,
        },
      };

      setUser(updatedUser);
      localStorage.setItem("learnverse_user_data", JSON.stringify(updatedUser));

      console.log("✅ Plan upgraded to:", plan);
      return true;
    } catch (error) {
      console.error("Plan upgrade error:", error);
      return false;
    }
  };

  const refreshUser = async (): Promise<void> => {
    const currentUser = realAuth.getCurrentUser();
    if (currentUser) {
      setUser(currentUser);
    }
  };

  const contextValue: AuthContextType = {
    user,
    isAuthenticated,
    isLoading,
    login,
    register,
    signInWithGoogle,
    signInWithGitHub,
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
