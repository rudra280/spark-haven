import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import {
  Eye,
  EyeOff,
  Mail,
  Lock,
  ArrowRight,
  Github,
  Chrome,
  Sparkles,
  Shield,
  Zap,
  CheckCircle,
  AlertCircle,
  User,
  ArrowLeft,
  GraduationCap,
  Users,
  Building,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useAuth } from "@/contexts/AuthContext";
import { MagneticButton } from "@/components/ui/cursor-effects";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [role, setRole] = useState<"student" | "creator" | "institution">(
    "student",
  );
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const { register, signInWithGoogle, signInWithGitHub } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    // Validation
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    if (password.length < 8) {
      setError("Password must be at least 8 characters long");
      return;
    }

    setIsLoading(true);

    try {
      const result = await register({ name, email, password, role });

      if (result.success) {
        setSuccess("Account created successfully! Welcome to LEARNVERSE! 🎉");
        setTimeout(() => {
          // Redirect based on role
          switch (role) {
            case "creator":
              navigate("/creator-dashboard");
              break;
            case "institution":
              navigate("/institution-dashboard");
              break;
            default:
              navigate("/dashboard");
          }
        }, 1500);
      } else {
        setError(result.error || "Registration failed");
      }
    } catch (err) {
      setError("Network error. Please check your connection.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setIsLoading(true);
    setError("");
    try {
      const result = await signInWithGoogle();
      if (result.success) {
        setSuccess("Google sign-up successful! Welcome to LEARNVERSE! 🎉");
        setTimeout(() => navigate("/dashboard"), 1500);
      } else {
        setError(result.error || "Google sign-up failed");
      }
    } catch (error) {
      setError("Google sign-up failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleGitHubSignIn = async () => {
    setIsLoading(true);
    setError("");
    try {
      const result = await signInWithGitHub();
      if (result.success) {
        setSuccess("GitHub sign-up successful! Welcome to LEARNVERSE! 🎉");
        setTimeout(() => navigate("/dashboard"), 1500);
      } else {
        setError(result.error || "GitHub sign-up failed");
      }
    } catch (error) {
      setError("GitHub sign-up failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const roleOptions = [
    {
      id: "student" as const,
      title: "Student",
      description: "Learn and explore courses",
      icon: GraduationCap,
      color: "from-blue-500 to-cyan-500",
    },
    {
      id: "creator" as const,
      title: "Creator",
      description: "Create and share content",
      icon: Sparkles,
      color: "from-purple-500 to-pink-500",
    },
    {
      id: "institution" as const,
      title: "Institution",
      description: "Manage educational programs",
      icon: Building,
      color: "from-green-500 to-emerald-500",
    },
  ];

  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Back Button */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        className="absolute top-6 left-6 z-50"
      >
        <Button
          variant="ghost"
          size="sm"
          className="text-white/70 hover:text-white hover:bg-white/10"
          onClick={() => navigate("/")}
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Home
        </Button>
      </motion.div>

      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-orange-500/20 via-pink-500/20 to-violet-500/20 bg-[length:400%_400%] animate-gradient" />

      {/* Grid Background */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.1)_1px,transparent_1px)] bg-[size:50px_50px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_110%)]" />

      {/* Main Content */}
      <div className="relative z-10 flex items-center justify-center min-h-screen p-4">
        <motion.div
          className="register-form w-full max-w-md"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <Card className="bg-white/10 backdrop-blur-xl border border-white/20 shadow-2xl">
            <CardHeader className="text-center space-y-4">
              {/* Logo */}
              <motion.div
                className="mx-auto w-16 h-16 bg-gradient-to-br from-orange-500 via-pink-500 to-violet-500 rounded-2xl flex items-center justify-center"
                whileHover={{ scale: 1.1, rotate: 5 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <Sparkles className="w-8 h-8 text-white" />
              </motion.div>

              <div>
                <CardTitle className="text-3xl font-bold bg-gradient-to-r from-orange-500 via-pink-500 to-violet-500 bg-clip-text text-transparent">
                  Join LEARNVERSE
                </CardTitle>
                <CardDescription className="text-white/70 mt-2">
                  Start your professional learning journey today
                </CardDescription>
              </div>
            </CardHeader>

            <CardContent className="space-y-6">
              {/* OAuth Buttons - Primary Options */}
              <div className="space-y-3">
                <Button
                  onClick={handleGoogleSignIn}
                  disabled={isLoading}
                  className="w-full bg-white hover:bg-gray-100 text-gray-900 font-semibold py-3 transition-all duration-300"
                >
                  <Chrome className="w-5 h-5 mr-3" />
                  {isLoading ? "Connecting..." : "Continue with Google"}
                </Button>

                <Button
                  onClick={handleGitHubSignIn}
                  disabled={isLoading}
                  className="w-full bg-gray-800 hover:bg-gray-700 text-white font-semibold py-3 transition-all duration-300"
                >
                  <Github className="w-5 h-5 mr-3" />
                  {isLoading ? "Connecting..." : "Continue with GitHub"}
                </Button>
              </div>

              {/* Alert Messages */}
              <AnimatePresence>
                {error && (
                  <motion.div
                    initial={{ opacity: 0, y: -10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -10, scale: 0.95 }}
                  >
                    <Alert className="border-red-500/30 bg-red-500/10">
                      <AlertCircle className="h-4 w-4 text-red-400" />
                      <AlertDescription className="text-red-300">
                        {error}
                      </AlertDescription>
                    </Alert>
                  </motion.div>
                )}

                {success && (
                  <motion.div
                    initial={{ opacity: 0, y: -10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -10, scale: 0.95 }}
                  >
                    <Alert className="border-green-500/30 bg-green-500/10">
                      <CheckCircle className="h-4 w-4 text-green-400" />
                      <AlertDescription className="text-green-300">
                        {success}
                      </AlertDescription>
                    </Alert>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Divider */}
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-white/20" />
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-slate-900 text-white/70">
                    Or create account with email
                  </span>
                </div>
              </div>

              {/* Role Selection */}
              <div className="space-y-3">
                <Label className="text-white/90">Choose Your Role</Label>
                <div className="grid grid-cols-1 gap-3">
                  {roleOptions.map((option) => (
                    <motion.div
                      key={option.id}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <button
                        type="button"
                        onClick={() => setRole(option.id)}
                        className={`w-full p-4 rounded-lg border-2 transition-all duration-300 ${
                          role === option.id
                            ? "border-pink-400 bg-pink-500/10"
                            : "border-white/20 bg-white/5 hover:border-white/40"
                        }`}
                      >
                        <div className="flex items-center space-x-3">
                          <div
                            className={`w-10 h-10 rounded-lg bg-gradient-to-r ${option.color} flex items-center justify-center`}
                          >
                            <option.icon className="w-5 h-5 text-white" />
                          </div>
                          <div className="text-left">
                            <p className="text-white font-medium">
                              {option.title}
                            </p>
                            <p className="text-white/60 text-sm">
                              {option.description}
                            </p>
                          </div>
                        </div>
                      </button>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Registration Form */}
              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Name Field */}
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-white/90">
                    Full Name
                  </Label>
                  <div className="relative group">
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-white/50 group-focus-within:text-pink-400 transition-colors" />
                    <Input
                      id="name"
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="pl-10 bg-white/5 border-white/20 text-white placeholder:text-white/50 focus:border-pink-400 focus:ring-pink-400/20"
                      placeholder="Enter your full name"
                      required
                    />
                  </div>
                </div>

                {/* Email Field */}
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-white/90">
                    Email
                  </Label>
                  <div className="relative group">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-white/50 group-focus-within:text-pink-400 transition-colors" />
                    <Input
                      id="email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="pl-10 bg-white/5 border-white/20 text-white placeholder:text-white/50 focus:border-pink-400 focus:ring-pink-400/20"
                      placeholder="Enter your email"
                      required
                    />
                  </div>
                </div>

                {/* Password Field */}
                <div className="space-y-2">
                  <Label htmlFor="password" className="text-white/90">
                    Password
                  </Label>
                  <div className="relative group">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-white/50 group-focus-within:text-pink-400 transition-colors" />
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="pl-10 pr-10 bg-white/5 border-white/20 text-white placeholder:text-white/50 focus:border-pink-400 focus:ring-pink-400/20"
                      placeholder="Create a password"
                      required
                    />
                    <Button
                      type="button"
                      size="icon"
                      variant="ghost"
                      className="absolute right-1 top-1/2 transform -translate-y-1/2 w-8 h-8 text-white/50 hover:text-white"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? (
                        <EyeOff className="w-4 h-4" />
                      ) : (
                        <Eye className="w-4 h-4" />
                      )}
                    </Button>
                  </div>
                </div>

                {/* Confirm Password Field */}
                <div className="space-y-2">
                  <Label htmlFor="confirmPassword" className="text-white/90">
                    Confirm Password
                  </Label>
                  <div className="relative group">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-white/50 group-focus-within:text-pink-400 transition-colors" />
                    <Input
                      id="confirmPassword"
                      type="password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      className="pl-10 bg-white/5 border-white/20 text-white placeholder:text-white/50 focus:border-pink-400 focus:ring-pink-400/20"
                      placeholder="Confirm your password"
                      required
                    />
                  </div>
                </div>

                {/* Terms & Conditions */}
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="terms"
                    className="rounded border-white/20 bg-white/5"
                    required
                  />
                  <label
                    htmlFor="terms"
                    className="text-sm text-white/70 cursor-pointer"
                  >
                    I agree to the{" "}
                    <Link
                      to="/terms"
                      className="text-pink-400 hover:text-pink-300"
                    >
                      Terms of Service
                    </Link>{" "}
                    and{" "}
                    <Link
                      to="/privacy"
                      className="text-pink-400 hover:text-pink-300"
                    >
                      Privacy Policy
                    </Link>
                  </label>
                </div>

                {/* Submit Button */}
                <MagneticButton
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-gradient-to-r from-orange-500 via-pink-500 to-violet-500 hover:opacity-90 text-white font-semibold py-3 rounded-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed group"
                >
                  <span className="flex items-center justify-center space-x-2">
                    {isLoading ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        <span>Creating Account...</span>
                      </>
                    ) : (
                      <>
                        <span>Create Account</span>
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </>
                    )}
                  </span>
                </MagneticButton>
              </form>

              {/* Sign In Link */}
              <div className="text-center">
                <span className="text-white/70">Already have an account? </span>
                <Link
                  to="/login"
                  className="text-pink-400 hover:text-pink-300 font-semibold transition-colors"
                >
                  Sign in
                </Link>
              </div>

              {/* Professional Note */}
              <div className="text-center text-xs text-white/50 border-t border-white/10 pt-4">
                <p>🔒 Professional OAuth like YouTube & Instagram</p>
                <p>✨ Role-based dashboards: Student | Creator | Institution</p>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
