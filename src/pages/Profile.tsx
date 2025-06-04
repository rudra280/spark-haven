import React, { useState, useRef } from "react";
import { motion } from "framer-motion";
import {
  User,
  Settings,
  Camera,
  Edit,
  Save,
  X,
  Mail,
  Phone,
  MapPin,
  Globe,
  Calendar,
  Award,
  BookOpen,
  Users,
  Heart,
  Star,
  Upload,
  Lock,
  Bell,
  Eye,
  Download,
  Trash2,
  Shield,
  CreditCard,
  Crown,
  Zap,
  CheckCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { useAuth } from "@/contexts/AuthContext";

// Mock followers/following data
const mockFollowers = [
  {
    id: "1",
    name: "Dr. Sarah Chen",
    username: "@sarahchen",
    avatar:
      "https://images.unsplash.com/photo-1494790108755-2616b612b632?w=400",
    isVerified: true,
    subject: "Biology",
    followers: 45000,
    mutualFollows: 12,
  },
  {
    id: "2",
    name: "Prof. Michael Kumar",
    username: "@mkumar",
    avatar:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400",
    isVerified: true,
    subject: "Mathematics",
    followers: 38000,
    mutualFollows: 8,
  },
  {
    id: "3",
    name: "Dr. Emily Rodriguez",
    username: "@emilyrod",
    avatar:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400",
    isVerified: true,
    subject: "Physics",
    followers: 52000,
    mutualFollows: 15,
  },
  {
    id: "4",
    name: "Prof. David Kim",
    username: "@davidkim",
    avatar:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400",
    isVerified: false,
    subject: "Chemistry",
    followers: 23000,
    mutualFollows: 5,
  },
];

const mockFollowing = [
  {
    id: "5",
    name: "Khan Academy",
    username: "@khanacademy",
    avatar:
      "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=400",
    isVerified: true,
    subject: "Education",
    followers: 2000000,
    type: "Institution",
  },
  {
    id: "6",
    name: "MIT OpenCourseWare",
    username: "@mitocw",
    avatar: "https://images.unsplash.com/photo-1562774053-701939374585?w=400",
    isVerified: true,
    subject: "Technology",
    followers: 890000,
    type: "Institution",
  },
  {
    id: "7",
    name: "TED-Ed",
    username: "@teded",
    avatar:
      "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=400",
    isVerified: true,
    subject: "General",
    followers: 15000000,
    type: "Creator",
  },
];

const achievements = [
  {
    name: "Early Adopter",
    description: "Joined LearnVerse in the first month",
    icon: "🚀",
    earned: true,
  },
  {
    name: "Video Enthusiast",
    description: "Watched 100+ educational videos",
    icon: "📺",
    earned: true,
  },
  {
    name: "Knowledge Seeker",
    description: "Completed 50+ courses",
    icon: "📚",
    earned: true,
  },
  {
    name: "Community Builder",
    description: "Gained 1000+ followers",
    icon: "👥",
    earned: false,
  },
  {
    name: "Quiz Master",
    description: "Scored 90%+ on 25 quizzes",
    icon: "🏆",
    earned: true,
  },
  {
    name: "Study Streak",
    description: "Maintained 30-day learning streak",
    icon: "🔥",
    earned: false,
  },
];

export default function Profile() {
  const { user, updateProfile, upgradePlan } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [uploadingAvatar, setUploadingAvatar] = useState(false);
  const [activeTab, setActiveTab] = useState("profile");
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Form state
  const [formData, setFormData] = useState({
    name: user?.name || "",
    bio: user?.profile?.bio || "",
    location: user?.profile?.location || "",
    website: user?.profile?.website || "",
    skills: user?.profile?.skills?.join(", ") || "",
  });

  // Settings state
  const [settings, setSettings] = useState({
    emailNotifications: true,
    pushNotifications: true,
    profileVisibility: "public",
    showEmail: false,
    showProgress: true,
    autoPlayVideos: true,
  });

  const handleSaveProfile = async () => {
    try {
      const success = await updateProfile({
        bio: formData.bio,
        location: formData.location,
        website: formData.website,
        skills: formData.skills
          .split(",")
          .map((s) => s.trim())
          .filter(Boolean),
      });

      if (success) {
        setIsEditing(false);
        // Show success message
      }
    } catch (error) {
      console.error("Failed to update profile:", error);
    }
  };

  const handleAvatarUpload = async (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setUploadingAvatar(true);

    // Simulate upload
    setTimeout(() => {
      // In real app, this would upload to a service and update user avatar
      setUploadingAvatar(false);
    }, 2000);
  };

  const handleUpgradePlan = async (plan: "pro" | "ultimate") => {
    try {
      const success = await upgradePlan(plan);
      if (success) {
        // Show success message
      }
    } catch (error) {
      console.error("Failed to upgrade plan:", error);
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            Please log in to view your profile
          </h1>
          <Button onClick={() => (window.location.href = "/login")}>
            Go to Login
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Profile Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl shadow-xl p-8 mb-8"
        >
          <div className="flex items-start space-x-6">
            {/* Avatar */}
            <div className="relative">
              <Avatar className="w-24 h-24">
                <AvatarImage src={user.avatar} alt={user.name} />
                <AvatarFallback className="text-2xl">
                  {user.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>

              <Button
                variant="outline"
                size="icon"
                className="absolute -bottom-2 -right-2 rounded-full"
                onClick={() => fileInputRef.current?.click()}
                disabled={uploadingAvatar}
              >
                {uploadingAvatar ? (
                  <div className="w-4 h-4 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
                ) : (
                  <Camera className="w-4 h-4" />
                )}
              </Button>

              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleAvatarUpload}
                className="hidden"
              />
            </div>

            {/* User Info */}
            <div className="flex-1">
              <div className="flex items-center space-x-3 mb-2">
                <h1 className="text-3xl font-bold text-gray-900">
                  {user.name}
                </h1>
                {user.verified && (
                  <CheckCircle className="w-6 h-6 text-blue-500" />
                )}
                <Badge variant="outline" className="capitalize">
                  {user.role}
                </Badge>
              </div>

              <p className="text-gray-600 mb-4">@{user.email.split("@")[0]}</p>

              {user.profile.bio && (
                <p className="text-gray-700 mb-4">{user.profile.bio}</p>
              )}

              <div className="flex items-center space-x-6 text-sm text-gray-500">
                {user.profile.location && (
                  <div className="flex items-center space-x-1">
                    <MapPin className="w-4 h-4" />
                    <span>{user.profile.location}</span>
                  </div>
                )}
                <div className="flex items-center space-x-1">
                  <Calendar className="w-4 h-4" />
                  <span>
                    Joined {new Date(user.createdAt).toLocaleDateString()}
                  </span>
                </div>
                {user.profile.website && (
                  <div className="flex items-center space-x-1">
                    <Globe className="w-4 h-4" />
                    <a
                      href={user.profile.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline"
                    >
                      Website
                    </a>
                  </div>
                )}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex space-x-2">
              <Button
                variant={isEditing ? "outline" : "default"}
                onClick={() => setIsEditing(!isEditing)}
              >
                {isEditing ? (
                  <>
                    <X className="w-4 h-4 mr-2" />
                    Cancel
                  </>
                ) : (
                  <>
                    <Edit className="w-4 h-4 mr-2" />
                    Edit Profile
                  </>
                )}
              </Button>

              {isEditing && (
                <Button onClick={handleSaveProfile}>
                  <Save className="w-4 h-4 mr-2" />
                  Save Changes
                </Button>
              )}
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8 pt-8 border-t">
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-900">
                {user.profile.coursesCompleted}
              </div>
              <div className="text-sm text-gray-500">Courses Completed</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-900">
                {user.profile.certificates}
              </div>
              <div className="text-sm text-gray-500">Certificates</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-900">
                {Math.floor(user.profile.totalWatchTime / 60)}h
              </div>
              <div className="text-sm text-gray-500">Watch Time</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-900">
                {user.profile.followers || mockFollowers.length}
              </div>
              <div className="text-sm text-gray-500">Followers</div>
            </div>
          </div>
        </motion.div>

        {/* Main Content Tabs */}
        <Tabs
          value={activeTab}
          onValueChange={setActiveTab}
          className="space-y-6"
        >
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="profile">Profile</TabsTrigger>
            <TabsTrigger value="followers">Followers</TabsTrigger>
            <TabsTrigger value="following">Following</TabsTrigger>
            <TabsTrigger value="achievements">Achievements</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>

          {/* Profile Tab */}
          <TabsContent value="profile" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Profile Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {isEditing ? (
                  <>
                    <div>
                      <label className="block text-sm font-medium mb-2">
                        Bio
                      </label>
                      <Textarea
                        value={formData.bio}
                        onChange={(e) =>
                          setFormData({ ...formData, bio: e.target.value })
                        }
                        placeholder="Tell us about yourself..."
                        rows={4}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">
                        Location
                      </label>
                      <Input
                        value={formData.location}
                        onChange={(e) =>
                          setFormData({ ...formData, location: e.target.value })
                        }
                        placeholder="Your location"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">
                        Website
                      </label>
                      <Input
                        value={formData.website}
                        onChange={(e) =>
                          setFormData({ ...formData, website: e.target.value })
                        }
                        placeholder="https://your-website.com"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">
                        Skills
                      </label>
                      <Input
                        value={formData.skills}
                        onChange={(e) =>
                          setFormData({ ...formData, skills: e.target.value })
                        }
                        placeholder="Mathematics, Physics, Programming (comma separated)"
                      />
                    </div>
                  </>
                ) : (
                  <div className="space-y-4">
                    <div>
                      <h3 className="font-medium text-gray-900 mb-2">About</h3>
                      <p className="text-gray-600">
                        {user.profile.bio || "No bio added yet."}
                      </p>
                    </div>

                    {user.profile.skills && user.profile.skills.length > 0 && (
                      <div>
                        <h3 className="font-medium text-gray-900 mb-2">
                          Skills
                        </h3>
                        <div className="flex flex-wrap gap-2">
                          {user.profile.skills.map((skill, index) => (
                            <Badge key={index} variant="secondary">
                              {skill}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Subscription Card */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Crown className="w-5 h-5 text-blue-500" />
                  <span>Subscription Plan</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <div className="flex items-center space-x-2">
                      <Badge
                        variant={
                          user.subscription.plan === "free"
                            ? "outline"
                            : "default"
                        }
                        className={
                          user.subscription.plan !== "free"
                            ? "bg-gradient-to-r from-blue-500 to-purple-500"
                            : ""
                        }
                      >
                        {user.subscription.plan.toUpperCase()}
                      </Badge>
                      <span className="text-sm text-gray-500">
                        Status: {user.subscription.status}
                      </span>
                    </div>
                    {user.subscription.validUntil && (
                      <p className="text-sm text-gray-500 mt-1">
                        Valid until:{" "}
                        {new Date(
                          user.subscription.validUntil,
                        ).toLocaleDateString()}
                      </p>
                    )}
                  </div>

                  {user.subscription.plan === "free" && (
                    <div className="space-x-2">
                      <Button
                        variant="outline"
                        onClick={() => handleUpgradePlan("pro")}
                      >
                        <Zap className="w-4 h-4 mr-2" />
                        Upgrade to Pro
                      </Button>
                      <Button
                        onClick={() => handleUpgradePlan("ultimate")}
                        className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
                      >
                        <Crown className="w-4 h-4 mr-2" />
                        Get Ultimate
                      </Button>
                    </div>
                  )}
                </div>

                {/* Plan Features */}
                <div className="text-sm text-gray-600">
                  {user.subscription.plan === "free" && (
                    <ul className="space-y-1">
                      <li>• Limited AI video generation</li>
                      <li>• Basic course access</li>
                      <li>• Community features</li>
                    </ul>
                  )}
                  {user.subscription.plan === "pro" && (
                    <ul className="space-y-1">
                      <li>• Unlimited AI video generation</li>
                      <li>• Full course library access</li>
                      <li>• Priority support</li>
                      <li>• Advanced analytics</li>
                    </ul>
                  )}
                  {user.subscription.plan === "ultimate" && (
                    <ul className="space-y-1">
                      <li>• Everything in Pro</li>
                      <li>• 1-on-1 tutoring sessions</li>
                      <li>• Custom AI training</li>
                      <li>• White-label solutions</li>
                    </ul>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Followers Tab */}
          <TabsContent value="followers" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Followers ({mockFollowers.length})</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mockFollowers.map((follower) => (
                    <div
                      key={follower.id}
                      className="flex items-center justify-between"
                    >
                      <div className="flex items-center space-x-3">
                        <Avatar>
                          <AvatarImage
                            src={follower.avatar}
                            alt={follower.name}
                          />
                          <AvatarFallback>{follower.name[0]}</AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="flex items-center space-x-2">
                            <span className="font-medium">{follower.name}</span>
                            {follower.isVerified && (
                              <CheckCircle className="w-4 h-4 text-blue-500" />
                            )}
                          </div>
                          <div className="text-sm text-gray-500">
                            {follower.username} • {follower.subject}
                          </div>
                          <div className="text-sm text-gray-500">
                            {follower.followers.toLocaleString()} followers •{" "}
                            {follower.mutualFollows} mutual
                          </div>
                        </div>
                      </div>
                      <Button variant="outline" size="sm">
                        View Profile
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Following Tab */}
          <TabsContent value="following" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Following ({mockFollowing.length})</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mockFollowing.map((followed) => (
                    <div
                      key={followed.id}
                      className="flex items-center justify-between"
                    >
                      <div className="flex items-center space-x-3">
                        <Avatar>
                          <AvatarImage
                            src={followed.avatar}
                            alt={followed.name}
                          />
                          <AvatarFallback>{followed.name[0]}</AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="flex items-center space-x-2">
                            <span className="font-medium">{followed.name}</span>
                            {followed.isVerified && (
                              <CheckCircle className="w-4 h-4 text-blue-500" />
                            )}
                            <Badge variant="outline" className="text-xs">
                              {followed.type}
                            </Badge>
                          </div>
                          <div className="text-sm text-gray-500">
                            {followed.username} • {followed.subject}
                          </div>
                          <div className="text-sm text-gray-500">
                            {followed.followers.toLocaleString()} followers
                          </div>
                        </div>
                      </div>
                      <Button variant="outline" size="sm">
                        Following
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Achievements Tab */}
          <TabsContent value="achievements" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Achievements</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {achievements.map((achievement, index) => (
                    <div
                      key={index}
                      className={`p-4 rounded-lg border ${
                        achievement.earned
                          ? "bg-green-50 border-green-200"
                          : "bg-gray-50 border-gray-200"
                      }`}
                    >
                      <div className="flex items-center space-x-3">
                        <div className="text-2xl">{achievement.icon}</div>
                        <div className="flex-1">
                          <h3
                            className={`font-medium ${
                              achievement.earned
                                ? "text-green-900"
                                : "text-gray-500"
                            }`}
                          >
                            {achievement.name}
                          </h3>
                          <p
                            className={`text-sm ${
                              achievement.earned
                                ? "text-green-700"
                                : "text-gray-500"
                            }`}
                          >
                            {achievement.description}
                          </p>
                        </div>
                        {achievement.earned && (
                          <CheckCircle className="w-5 h-5 text-green-500" />
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Settings Tab */}
          <TabsContent value="settings" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Notification Settings</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <label className="font-medium">Email Notifications</label>
                    <p className="text-sm text-gray-500">
                      Receive updates via email
                    </p>
                  </div>
                  <Switch
                    checked={settings.emailNotifications}
                    onCheckedChange={(checked) =>
                      setSettings({ ...settings, emailNotifications: checked })
                    }
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <label className="font-medium">Push Notifications</label>
                    <p className="text-sm text-gray-500">
                      Receive push notifications
                    </p>
                  </div>
                  <Switch
                    checked={settings.pushNotifications}
                    onCheckedChange={(checked) =>
                      setSettings({ ...settings, pushNotifications: checked })
                    }
                  />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Privacy Settings</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <label className="font-medium">Show Email</label>
                    <p className="text-sm text-gray-500">
                      Display email on public profile
                    </p>
                  </div>
                  <Switch
                    checked={settings.showEmail}
                    onCheckedChange={(checked) =>
                      setSettings({ ...settings, showEmail: checked })
                    }
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <label className="font-medium">
                      Show Learning Progress
                    </label>
                    <p className="text-sm text-gray-500">
                      Display progress to followers
                    </p>
                  </div>
                  <Switch
                    checked={settings.showProgress}
                    onCheckedChange={(checked) =>
                      setSettings({ ...settings, showProgress: checked })
                    }
                  />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Video Settings</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <label className="font-medium">Auto-play Videos</label>
                    <p className="text-sm text-gray-500">
                      Automatically play videos when scrolling
                    </p>
                  </div>
                  <Switch
                    checked={settings.autoPlayVideos}
                    onCheckedChange={(checked) =>
                      setSettings({ ...settings, autoPlayVideos: checked })
                    }
                  />
                </div>
              </CardContent>
            </Card>

            {/* Danger Zone */}
            <Card className="border-red-200">
              <CardHeader>
                <CardTitle className="text-red-600">Danger Zone</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <label className="font-medium text-red-600">
                      Delete Account
                    </label>
                    <p className="text-sm text-gray-500">
                      Permanently delete your account and all data
                    </p>
                  </div>
                  <Button variant="destructive" size="sm">
                    <Trash2 className="w-4 h-4 mr-2" />
                    Delete Account
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
