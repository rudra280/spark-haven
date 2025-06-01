import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Check, Sparkles, Crown, Zap } from "lucide-react";
import { motion } from "framer-motion";

const pricingPlans = [
  {
    name: "Free",
    price: "$0",
    period: "",
    description:
      "Start free, upgrade for more power. No hidden fees, cancel anytime.",
    icon: Zap,
    features: ["Core video library", "Basic AI feedback", "5 hours of content"],
    buttonText: "Start Free",
    buttonVariant: "outline" as const,
    popular: false,
    gradient: "from-gray-500 to-gray-600",
  },
  {
    name: "Pro",
    price: "$15",
    period: "/mo",
    description: "Unlimited access",
    icon: Sparkles,
    features: [
      "Unlimited video access",
      "Advanced AI tutoring",
      "AI tutor scheduling",
      "Learning Paths",
    ],
    buttonText: "Go Pro",
    buttonVariant: "default" as const,
    popular: true,
    gradient: "from-cyan-500 to-purple-500",
  },
  {
    name: "Ultimate",
    price: "$39",
    period: "/mo",
    description: "All Pro features",
    icon: Crown,
    features: [
      "Priority tutor access",
      "Priority support",
      "Advanced analytics",
      "Custom learning paths",
    ],
    buttonText: "Get Ultimate",
    buttonVariant: "default" as const,
    popular: false,
    gradient: "from-purple-500 to-pink-500",
  },
];

export function PricingCards() {
  return (
    <section className="py-24 bg-muted/30">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            <span className="bg-gradient-to-r from-cyan-500 to-purple-500 bg-clip-text text-transparent">
              Pricing for every journey
            </span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Start free, upgrade for more power. No hidden fees, cancel anytime.
          </p>
        </motion.div>

        {/* Pricing Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {pricingPlans.map((plan, index) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="relative"
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <Badge className="bg-gradient-to-r from-cyan-500 to-purple-500 text-white border-0 px-4 py-1">
                    Most Popular
                  </Badge>
                </div>
              )}

              <Card
                className={`relative h-full transition-all duration-300 hover:shadow-xl ${
                  plan.popular
                    ? "border-2 border-primary/20 bg-gradient-to-b from-primary/5 to-transparent"
                    : "border border-border bg-background/50 backdrop-blur-sm"
                }`}
              >
                <CardHeader className="space-y-4 text-center">
                  {/* Icon */}
                  <div
                    className={`w-12 h-12 mx-auto rounded-full bg-gradient-to-r ${plan.gradient} flex items-center justify-center`}
                  >
                    <plan.icon className="w-6 h-6 text-white" />
                  </div>

                  {/* Plan Name */}
                  <CardTitle className="text-2xl font-bold">
                    {plan.name}
                  </CardTitle>

                  {/* Price */}
                  <div className="space-y-2">
                    <div className="flex items-baseline justify-center space-x-1">
                      <span className="text-4xl font-bold">{plan.price}</span>
                      <span className="text-muted-foreground">
                        {plan.period}
                      </span>
                    </div>
                    <CardDescription>{plan.description}</CardDescription>
                  </div>
                </CardHeader>

                <CardContent className="space-y-6">
                  {/* Features */}
                  <ul className="space-y-3">
                    {plan.features.map((feature, featureIndex) => (
                      <li
                        key={featureIndex}
                        className="flex items-center space-x-3"
                      >
                        <Check className="w-5 h-5 text-green-500 flex-shrink-0" />
                        <span className="text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  {/* CTA Button */}
                  <Button
                    variant={plan.buttonVariant}
                    size="lg"
                    className={`w-full ${
                      plan.buttonVariant === "default"
                        ? `bg-gradient-to-r ${plan.gradient} hover:opacity-90 text-white`
                        : ""
                    }`}
                  >
                    {plan.buttonText}
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <p className="text-muted-foreground mb-4">
            All plans include 7-day free trial • No setup fees • Cancel anytime
          </p>
          <Button variant="link" className="text-primary">
            Compare all features →
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
