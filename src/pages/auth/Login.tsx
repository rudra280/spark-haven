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
import { QuickBackButton } from "@/components/ui/back-navigation";
import { oauthService } from "@/lib/oauth";
import { PageRouter } from "@/components/layout/PageRouter";

interface FloatingParticle {
  id: number;
  x: number;
  y: number;
  size: number;
  color: string;
  speed: number;
}

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [particles, setParticles] = useState<FloatingParticle[]>([]);

  const { login } = useAuth();
  const navigate = useNavigate();
  const formRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Initialize floating particles
    const newParticles: FloatingParticle[] = [];
    for (let i = 0; i < 50; i++) {
      newParticles.push({
        id: i,
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        size: Math.random() * 3 + 1,
        color: ["#f97316", "#ec4899", "#8b5cf6"][Math.floor(Math.random() * 3)],
        speed: Math.random() * 0.5 + 0.1,
      });
    }
    setParticles(newParticles);

    // Animate particles
    const animateParticles = () => {
      setParticles((prev) =>
        prev
          .map((particle) => ({
            ...particle,
            y: particle.y - particle.speed,
            x: particle.x + Math.sin(particle.y * 0.01) * 0.5,
          }))
          .filter((particle) => particle.y > -10),
      );
    };

    const interval = setInterval(animateParticles, 16);
    return () => clearInterval(interval);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setIsLoading(true);

    try {
      const result = await login(email, password);

      if (result.success) {
        setSuccess("Login successful! Welcome back to LEARNVERSE! 🎉");
        setTimeout(() => navigate("/dashboard"), 1000);
      } else {
        setError(result.error || "Login failed");
      }
    } catch (err) {
      setError("Network error. Please check your connection.");
    } finally {
      setIsLoading(false);
    }
  };

  const fillDemoCredentials = () => {
    setEmail("demo@learnverse.ai");
    setPassword("demo123");
  };

  const handleGoogleSignIn = async () => {
    setIsLoading(true);
    try {
      const result = await oauthService.signInWithGoogle();
      if (result.success) {
        setSuccess("Google sign-in successful! Welcome to LEARNVERSE! 🎉");
        setTimeout(() => navigate("/dashboard"), 1000);
      } else {
        setError(result.error || "Google sign-in failed");
      }
    } catch (error) {
      setError("Google sign-in failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleGitHubSignIn = async () => {
    setIsLoading(true);
    try {
      const result = await oauthService.signInWithGitHub();
      if (result.success) {
        setSuccess("GitHub sign-in successful! Welcome to LEARNVERSE! 🎉");
        setTimeout(() => navigate("/dashboard"), 1000);
      } else {
        setError(result.error || "GitHub sign-in failed");
      }
    } catch (error) {
      setError("GitHub sign-in failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Back Navigation */}
      <QuickBackButton />

      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-orange-500/20 via-pink-500/20 to-violet-500/20 bg-[length:400%_400%] animate-gradient" />

      {/* Floating Particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {particles.map((particle) => (
          <div
            key={particle.id}
            className="absolute rounded-full opacity-30"
            style={{
              left: particle.x,
              top: particle.y,
              width: particle.size,
              height: particle.size,
              background: particle.color,
              filter: "blur(1px)",
            }}
          />
        ))}
      </div>

      {/* Grid Background */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.1)_1px,transparent_1px)] bg-[size:50px_50px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_110%)]" />

      {/* Main Content */}
      <div className="relative z-10 flex items-center justify-center min-h-screen p-4">
        <motion.div
          ref={formRef}
          className="login-form w-full max-w-md"
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
                  Welcome Back
                </CardTitle>
                <CardDescription className="text-white/70 mt-2">
                  Continue your learning journey with LEARNVERSE
                </CardDescription>
              </div>

              {/* Features Preview */}
              <div className="flex justify-center space-x-4 text-white/60">
                <div className="flex items-center space-x-1">
                  <Shield className="w-4 h-4" />
                  <span className="text-xs">Secure</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Zap className="w-4 h-4" />
                  <span className="text-xs">Fast</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Sparkles className="w-4 h-4" />
                  <span className="text-xs">AI-Powered</span>
                </div>
              </div>
            </CardHeader>

            <CardContent className="space-y-6">
              {/* Demo Credentials Banner */}
              <motion.div
                className="bg-gradient-to-r from-blue-500/20 to-cyan-500/20 border border-blue-500/30 rounded-lg p-3"
                whileHover={{ scale: 1.02 }}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-white text-sm font-medium">
                      Try Demo Account
                    </p>
                    <p className="text-white/70 text-xs">
                      demo@learnverse.ai / demo123
                    </p>
                  </div>
                  <Button
                    size="sm"
                    variant="outline"
                    className="demo-fill border-blue-500/30 text-blue-400 hover:bg-blue-500/20"
                    onClick={fillDemoCredentials}
                  >
                    Use Demo
                  </Button>
                </div>
              </motion.div>

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

              {/* Login Form */}
              <form onSubmit={handleSubmit} className="space-y-4">
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
                      placeholder="Enter your password"
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

                {/* Remember & Forgot */}
                <div className="flex items-center justify-between">
                  <label className="flex items-center space-x-2 text-sm text-white/70 cursor-pointer">
                    <input
                      type="checkbox"
                      className="rounded border-white/20 bg-white/5"
                    />
                    <span>Remember me</span>
                  </label>
                  <Link
                    to="/forgot-password"
                    className="text-sm text-pink-400 hover:text-pink-300 transition-colors"
                  >
                    Forgot password?
                  </Link>
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
                        <span>Signing in...</span>
                      </>
                    ) : (
                      <>
                        <span>Sign In</span>
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </>
                    )}
                  </span>
                </MagneticButton>
              </form>

              {/* Divider */}
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-white/20" />
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-slate-900 text-white/70">
                    Or continue with
                  </span>
                </div>
              </div>

              {/* Social Login */}
              <div className="grid grid-cols-2 gap-3">
                <Button
                  variant="outline"
                  className="border-white/20 bg-white/5 text-white hover:bg-white/10"
                  onClick={handleGitHubSignIn}
                  disabled={isLoading}
                >
                  <Github className="w-4 h-4 mr-2" />
                  Github
                </Button>
                <Button
                  variant="outline"
                  className="border-white/20 bg-white/5 text-white hover:bg-white/10"
                  onClick={handleGoogleSignIn}
                  disabled={isLoading}
                >
                  <Chrome className="w-4 h-4 mr-2" />
                  Google
                </Button>
              </div>

              {/* Sign Up Link */}
              <div className="text-center">
                <span className="text-white/70">Don't have an account? </span>
                <Link
                  to="/register"
                  className="text-pink-400 hover:text-pink-300 font-semibold transition-colors"
                >
                  Sign up for free
                </Link>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Page Navigation Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-12 max-w-6xl mx-auto"
        >
          <PageRouter currentPage="/login" category="main" />
        </motion.div>
      </div>
    </div>
  );
}
