import React from "react";
import { BookingCalendar } from "@/components/booking/BookingCalendar";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, Clock, Users, Star } from "lucide-react";
import { motion } from "framer-motion";

const benefits = [
  {
    icon: CheckCircle,
    title: "1-on-1 Personalized Learning",
    description:
      "Get individual attention tailored to your learning style and pace.",
  },
  {
    icon: Clock,
    title: "Flexible Scheduling",
    description: "Book sessions at times that work best for your schedule.",
  },
  {
    icon: Users,
    title: "Expert Tutors",
    description:
      "Learn from certified professionals with years of teaching experience.",
  },
  {
    icon: Star,
    title: "Proven Results",
    description:
      "Join thousands of students who have achieved their learning goals.",
  },
];

export default function TutorBooking() {
  return (
    <div className="min-h-screen pt-20 pb-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="bg-gradient-to-r from-cyan-500 to-purple-500 bg-clip-text text-transparent">
              Book a Session with a Human Tutor
            </span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Get personalized guidance from expert tutors. Schedule a 1-on-1
            session that fits your schedule and learning goals.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Benefits */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="space-y-6"
          >
            <Card className="border-0 bg-background/50 backdrop-blur-sm">
              <CardHeader>
                <CardTitle>Why Choose Human Tutors?</CardTitle>
                <CardDescription>
                  Experience the benefits of personalized, human-led learning
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {benefits.map((benefit, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-r from-cyan-500 to-purple-500 flex items-center justify-center flex-shrink-0">
                      <benefit.icon className="w-4 h-4 text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-sm">{benefit.title}</h3>
                      <p className="text-xs text-muted-foreground mt-1">
                        {benefit.description}
                      </p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Pricing Info */}
            <Card className="border-0 bg-gradient-to-br from-cyan-50 to-purple-50 dark:from-cyan-950/20 dark:to-purple-950/20">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>Session Pricing</span>
                  <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100">
                    Popular
                  </Badge>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-baseline space-x-2">
                  <span className="text-3xl font-bold">$65</span>
                  <span className="text-muted-foreground">/hour</span>
                </div>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center space-x-2">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    <span>Full 60-minute session</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    <span>Personalized lesson plan</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    <span>Session recording included</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    <span>Follow-up resources</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </motion.div>

          {/* Booking Form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-2"
          >
            <BookingCalendar />
          </motion.div>
        </div>

        {/* FAQ */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-16"
        >
          <Card className="border-0 bg-background/50 backdrop-blur-sm">
            <CardHeader>
              <CardTitle>Frequently Asked Questions</CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold mb-2">
                  How long are the sessions?
                </h3>
                <p className="text-sm text-muted-foreground">
                  Each session is 60 minutes long, giving you plenty of time for
                  in-depth learning and Q&A.
                </p>
              </div>
              <div>
                <h3 className="font-semibold mb-2">
                  Can I reschedule my session?
                </h3>
                <p className="text-sm text-muted-foreground">
                  Yes, you can reschedule up to 24 hours before your scheduled
                  session without any fees.
                </p>
              </div>
              <div>
                <h3 className="font-semibold mb-2">
                  What subjects are available?
                </h3>
                <p className="text-sm text-muted-foreground">
                  We offer tutoring in programming, design, mathematics,
                  sciences, business, and many other subjects.
                </p>
              </div>
              <div>
                <h3 className="font-semibold mb-2">
                  Do I get session recordings?
                </h3>
                <p className="text-sm text-muted-foreground">
                  Yes, all sessions are recorded and shared with you within 24
                  hours for review and reference.
                </p>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
