import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { PaymentGateway } from "@/components/payment/PaymentGateway";
import {
  Check,
  Sparkles,
  Crown,
  Zap,
  Users,
  Video,
  BookOpen,
  MessageSquare,
  Brain,
  Star,
  IndianRupee,
  Globe,
  Shield,
} from "lucide-react";
import { motion } from "framer-motion";

const pricingPlans = [
  {
    name: "Free Explorer",
    price: { monthly: 0, yearly: 0 },
    originalPrice: { monthly: 0, yearly: 0 },
    description: "Perfect for curious learners starting their journey",
    icon: Zap,
    features: [
      "5 hours of content per month",
      "Basic AI tutor (limited)",
      "Access to community forums",
      "Mobile app access",
      "Basic progress tracking",
      "Standard video quality",
    ],
    limitations: [
      "No download for offline viewing",
      "Limited AI interactions",
      "No personalized learning paths",
      "No human tutor access",
    ],
    buttonText: "Start Free",
    buttonVariant: "outline" as const,
    popular: false,
    gradient: "from-gray-500 to-gray-600",
    students: "500K+ students",
  },
  {
    name: "Pro Learner",
    price: { monthly: 1499, yearly: 14990 },
    originalPrice: { monthly: 2499, yearly: 24990 },
    description: "Everything you need for serious learning",
    icon: Sparkles,
    features: [
      "Unlimited video access (50K+ courses)",
      "Advanced AI tutor with priority",
      "Personalized learning paths",
      "Download for offline viewing",
      "HD video quality + subtitles",
      "Progress analytics & certificates",
      "Study materials & notes access",
      "EduReels unlimited",
      "Community premium support",
      "24/7 AI assistance",
    ],
    buttonText: "Go Pro",
    buttonVariant: "default" as const,
    popular: true,
    gradient: "from-orange-500 via-pink-500 to-violet-500",
    students: "1M+ students",
    discount: "40% OFF",
  },
  {
    name: "Ultimate Master",
    price: { monthly: 2999, yearly: 29990 },
    originalPrice: { monthly: 4999, yearly: 49990 },
    description: "For serious students and professionals",
    icon: Crown,
    features: [
      "Everything in Pro Learner",
      "Human tutor sessions (3 hours/month)",
      "Local tutor connections",
      "Priority AI video generation",
      "Exclusive masterclasses",
      "1-on-1 mentorship calls",
      "Career guidance sessions",
      "Interview preparation",
      "Industry project access",
      "Premium community access",
      "Custom learning plans",
      "Priority support",
    ],
    buttonText: "Get Ultimate",
    buttonVariant: "default" as const,
    popular: false,
    gradient: "from-purple-500 via-violet-500 to-fuchsia-500",
    students: "100K+ students",
    discount: "40% OFF",
  },
];

const features = [
  {
    icon: BookOpen,
    title: "Every Subject Covered",
    description: "K-5 to PhD, Traditional crafts to quantum physics",
  },
  {
    icon: Brain,
    title: "AI + Human Tutors",
    description: "24/7 AI assistance + verified human experts",
  },
  {
    icon: Video,
    title: "Multi-format Learning",
    description: "Videos, notes, EduReels, live sessions",
  },
  {
    icon: Globe,
    title: "Global Content",
    description: "Learn from universities and experts worldwide",
  },
  {
    icon: Users,
    title: "Community Learning",
    description: "Connect with millions of learners globally",
  },
  {
    icon: Shield,
    title: "Quality Assured",
    description: "Verified content from trusted institutions",
  },
];

export default function Pricing() {
  const [isYearly, setIsYearly] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);
  const [showPayment, setShowPayment] = useState(false);

  const handleSelectPlan = (planName: string) => {
    if (planName === "Free Explorer") {
      // Handle free plan signup
      window.location.href = "/register";
      return;
    }

    setSelectedPlan(planName);
    setShowPayment(true);
  };

  const handlePaymentSuccess = (paymentId: string) => {
    console.log("Payment successful:", paymentId);
    setShowPayment(false);
    // Redirect to dashboard or success page
    window.location.href = "/dashboard";
  };

  const handlePaymentError = (error: string) => {
    console.error("Payment failed:", error);
    // Show error message
  };

  const getSelectedPlanDetails = () => {
    return pricingPlans.find((plan) => plan.name === selectedPlan);
  };

  return (
    <div className="min-h-screen pt-20 pb-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="flex items-center justify-center space-x-2 mb-4">
            <div className="w-12 h-12 bg-gradient-to-r from-orange-500 via-pink-500 to-violet-500 rounded-full flex items-center justify-center">
              <IndianRupee className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold">
              <span className="bg-gradient-to-r from-orange-500 via-pink-500 to-violet-500 bg-clip-text text-transparent">
                Simple, Transparent Pricing
              </span>
            </h1>
          </div>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
            🎓 Learn everything from everyone, everywhere! Choose the plan that
            fits your learning journey. No hidden fees, cancel anytime! 🌍
          </p>

          {/* Billing Toggle */}
          <div className="flex items-center justify-center space-x-4 mb-8">
            <span
              className={`font-medium ${!isYearly ? "text-primary" : "text-muted-foreground"}`}
            >
              Monthly
            </span>
            <Switch
              checked={isYearly}
              onCheckedChange={setIsYearly}
              className="data-[state=checked]:bg-gradient-to-r data-[state=checked]:from-orange-500 data-[state=checked]:to-violet-500"
            />
            <span
              className={`font-medium ${isYearly ? "text-primary" : "text-muted-foreground"}`}
            >
              Yearly
            </span>
            <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100">
              Save 40%
            </Badge>
          </div>
        </motion.div>

        {/* Pricing Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16"
        >
          {pricingPlans.map((plan, index) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 * index }}
              className="relative"
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <Badge className="bg-gradient-to-r from-orange-500 to-violet-500 text-white border-0 px-6 py-1">
                    🔥 Most Popular
                  </Badge>
                </div>
              )}

              <Card
                className={`relative h-full transition-all duration-300 hover:shadow-xl ${
                  plan.popular
                    ? "border-2 border-primary/20 bg-gradient-to-b from-primary/5 to-transparent scale-105"
                    : "border border-border bg-background/50 backdrop-blur-sm"
                }`}
              >
                <CardHeader className="space-y-4 text-center pb-8">
                  {/* Icon */}
                  <div
                    className={`w-16 h-16 mx-auto rounded-full bg-gradient-to-r ${plan.gradient} flex items-center justify-center`}
                  >
                    <plan.icon className="w-8 h-8 text-white" />
                  </div>

                  {/* Plan Name */}
                  <div>
                    <CardTitle className="text-2xl font-bold">
                      {plan.name}
                    </CardTitle>
                    <p className="text-sm text-muted-foreground mt-1">
                      {plan.students}
                    </p>
                  </div>

                  {/* Price */}
                  <div className="space-y-2">
                    <div className="flex items-baseline justify-center space-x-2">
                      <IndianRupee className="w-6 h-6 text-muted-foreground" />
                      <span className="text-4xl font-bold">
                        {isYearly
                          ? plan.price.yearly.toLocaleString()
                          : plan.price.monthly.toLocaleString()}
                      </span>
                      <span className="text-muted-foreground">
                        {plan.price.monthly > 0
                          ? isYearly
                            ? "/year"
                            : "/month"
                          : ""}
                      </span>
                    </div>

                    {plan.discount && (
                      <div className="flex items-center justify-center space-x-2">
                        <span className="text-sm line-through text-muted-foreground">
                          ₹
                          {isYearly
                            ? plan.originalPrice.yearly.toLocaleString()
                            : plan.originalPrice.monthly.toLocaleString()}
                        </span>
                        <Badge className="bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-100">
                          {plan.discount}
                        </Badge>
                      </div>
                    )}

                    <CardDescription className="min-h-[3rem] flex items-center justify-center">
                      {plan.description}
                    </CardDescription>
                  </div>
                </CardHeader>

                <CardContent className="space-y-6">
                  {/* Features */}
                  <div>
                    <h4 className="font-semibold mb-3 text-green-600">
                      ✅ What's included:
                    </h4>
                    <ul className="space-y-2">
                      {plan.features.map((feature, featureIndex) => (
                        <li
                          key={featureIndex}
                          className="flex items-start space-x-3"
                        >
                          <Check className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                          <span className="text-sm">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Limitations for free plan */}
                  {plan.limitations && (
                    <div>
                      <h4 className="font-semibold mb-3 text-orange-600">
                        ⚠️ Limitations:
                      </h4>
                      <ul className="space-y-2">
                        {plan.limitations.map((limitation, limitIndex) => (
                          <li
                            key={limitIndex}
                            className="flex items-start space-x-3"
                          >
                            <span className="w-4 h-4 text-orange-500 flex-shrink-0 mt-0.5">
                              ×
                            </span>
                            <span className="text-sm text-muted-foreground">
                              {limitation}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* CTA Button */}
                  <Button
                    variant={plan.buttonVariant}
                    size="lg"
                    onClick={() => handleSelectPlan(plan.name)}
                    className={`w-full ${
                      plan.buttonVariant === "default"
                        ? `bg-gradient-to-r ${plan.gradient} hover:opacity-90 text-white shadow-lg`
                        : ""
                    }`}
                  >
                    {plan.buttonText}
                    {plan.name !== "Free Explorer" && (
                      <Crown className="ml-2 w-4 h-4" />
                    )}
                  </Button>

                  {plan.name !== "Free Explorer" && (
                    <p className="text-xs text-center text-muted-foreground">
                      7-day free trial • Cancel anytime
                    </p>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* Features Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mb-16"
        >
          <h2 className="text-3xl font-bold text-center mb-12">
            🌟 Why Choose LearnVerse?
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 * index }}
                className="text-center"
              >
                <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-violet-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <feature.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* FAQ Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mb-16"
        >
          <h2 className="text-3xl font-bold text-center mb-12">
            💭 Frequently Asked Questions
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div>
              <h3 className="font-semibold mb-2">
                🆓 Is the free plan really free forever?
              </h3>
              <p className="text-sm text-muted-foreground">
                Yes! Access 5 hours of content monthly, basic AI tutor, and
                community features completely free. No credit card required.
              </p>
            </div>

            <div>
              <h3 className="font-semibold mb-2">
                🔄 Can I switch plans anytime?
              </h3>
              <p className="text-sm text-muted-foreground">
                Absolutely! Upgrade or downgrade your plan anytime. Changes take
                effect immediately.
              </p>
            </div>

            <div>
              <h3 className="font-semibold mb-2">
                💰 What payment methods do you accept?
              </h3>
              <p className="text-sm text-muted-foreground">
                UPI, Credit/Debit cards, Net Banking, and digital wallets. All
                payments are secure and encrypted.
              </p>
            </div>

            <div>
              <h3 className="font-semibold mb-2">🎓 Do I get certificates?</h3>
              <p className="text-sm text-muted-foreground">
                Pro and Ultimate plans include completion certificates for
                courses, recognized by employers.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Final CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="text-center bg-gradient-to-r from-orange-500/10 via-pink-500/10 to-violet-500/10 rounded-2xl p-8"
        >
          <h2 className="text-2xl font-bold mb-4">
            🚀 Ready to Transform Your Learning Journey?
          </h2>
          <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
            Join millions of learners worldwide. Start with our free plan and
            upgrade when you're ready for more!
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button
              size="lg"
              onClick={() => handleSelectPlan("Free Explorer")}
              variant="outline"
            >
              🆓 Start Free Now
            </Button>
            <Button
              size="lg"
              onClick={() => handleSelectPlan("Pro Learner")}
              className="bg-gradient-to-r from-orange-500 via-pink-500 to-violet-500 hover:opacity-90"
            >
              ⚡ Try Pro Free for 7 Days
            </Button>
          </div>
        </motion.div>

        {/* Payment Modal */}
        {showPayment && selectedPlan && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
            onClick={() => setShowPayment(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              onClick={(e) => e.stopPropagation()}
            >
              <PaymentGateway
                amount={
                  isYearly
                    ? getSelectedPlanDetails()?.price.yearly || 0
                    : getSelectedPlanDetails()?.price.monthly || 0
                }
                planName={selectedPlan}
                onPaymentSuccess={handlePaymentSuccess}
                onPaymentError={handlePaymentError}
              />
            </motion.div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
