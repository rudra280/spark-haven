import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Calendar, Clock, User, BookOpen } from "lucide-react";
import { motion } from "framer-motion";

const timeSlots = [
  "9:00 AM",
  "10:00 AM",
  "11:00 AM",
  "12:00 PM",
  "1:00 PM",
  "2:00 PM",
  "3:00 PM",
  "4:00 PM",
  "5:00 PM",
  "6:00 PM",
  "7:00 PM",
  "8:00 PM",
];

const subjects = [
  "Mathematics",
  "Physics",
  "Chemistry",
  "Biology",
  "Computer Science",
  "Web Development",
  "Data Science",
  "UX/UI Design",
  "Digital Marketing",
  "Business Strategy",
];

export function BookingCalendar() {
  const [selectedDate, setSelectedDate] = useState<string>("");
  const [selectedTime, setSelectedTime] = useState<string>("");
  const [selectedSubject, setSelectedSubject] = useState<string>("");
  const [notes, setNotes] = useState<string>("");

  // Generate next 14 days
  const dates = Array.from({ length: 14 }, (_, i) => {
    const date = new Date();
    date.setDate(date.getDate() + i);
    return date;
  });

  const handleBooking = () => {
    if (selectedDate && selectedTime && selectedSubject) {
      // Handle booking logic
      console.log("Booking:", {
        selectedDate,
        selectedTime,
        selectedSubject,
        notes,
      });
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="max-w-4xl mx-auto"
    >
      <Card className="border-0 bg-background/50 backdrop-blur-sm">
        <CardHeader className="text-center">
          <CardTitle className="flex items-center justify-center space-x-2">
            <Calendar className="w-6 h-6" />
            <span>Book a Session with a Human Tutor</span>
          </CardTitle>
          <CardDescription>
            Schedule a personalized 1-on-1 session with one of our expert tutors
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-6">
          {/* Subject Selection */}
          <div className="space-y-2">
            <Label htmlFor="subject">Select a subject</Label>
            <Select value={selectedSubject} onValueChange={setSelectedSubject}>
              <SelectTrigger>
                <SelectValue placeholder="Choose your subject" />
              </SelectTrigger>
              <SelectContent>
                {subjects.map((subject) => (
                  <SelectItem key={subject} value={subject}>
                    {subject}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Date Selection */}
          <div className="space-y-3">
            <Label>Preferred Date & Time</Label>

            {/* Date Grid */}
            <div className="grid grid-cols-7 gap-2">
              {dates.map((date) => {
                const dateStr = date.toISOString().split("T")[0];
                const isSelected = selectedDate === dateStr;
                const isToday =
                  date.toDateString() === new Date().toDateString();

                return (
                  <Button
                    key={dateStr}
                    variant={isSelected ? "default" : "outline"}
                    className={`h-16 flex flex-col ${
                      isSelected
                        ? "bg-gradient-to-r from-cyan-500 to-purple-500 text-white"
                        : ""
                    }`}
                    onClick={() => setSelectedDate(dateStr)}
                  >
                    <span className="text-xs">
                      {date.toLocaleDateString("en", { weekday: "short" })}
                    </span>
                    <span className="text-lg font-semibold">
                      {date.getDate()}
                    </span>
                    {isToday && (
                      <Badge className="text-xs px-1 py-0 h-4">Today</Badge>
                    )}
                  </Button>
                );
              })}
            </div>
          </div>

          {/* Time Selection */}
          {selectedDate && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              transition={{ duration: 0.3 }}
              className="space-y-3"
            >
              <Label>Available Times</Label>
              <div className="grid grid-cols-4 gap-2">
                {timeSlots.map((time) => {
                  const isSelected = selectedTime === time;
                  const isAvailable = Math.random() > 0.3; // Simulate availability

                  return (
                    <Button
                      key={time}
                      variant={isSelected ? "default" : "outline"}
                      disabled={!isAvailable}
                      className={`h-12 ${
                        isSelected
                          ? "bg-gradient-to-r from-cyan-500 to-purple-500 text-white"
                          : ""
                      } ${!isAvailable ? "opacity-50" : ""}`}
                      onClick={() => setSelectedTime(time)}
                    >
                      <Clock className="w-4 h-4 mr-2" />
                      {time}
                    </Button>
                  );
                })}
              </div>
            </motion.div>
          )}

          {/* Notes */}
          <div className="space-y-2">
            <Label htmlFor="notes">Notes (optional)</Label>
            <Textarea
              id="notes"
              placeholder="Tell your tutor what you'd like to focus on..."
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              rows={3}
            />
          </div>

          {/* Booking Summary */}
          {selectedDate && selectedTime && selectedSubject && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="p-4 bg-muted/30 rounded-lg"
            >
              <h3 className="font-semibold mb-2">Booking Summary</h3>
              <div className="space-y-1 text-sm">
                <div className="flex items-center space-x-2">
                  <BookOpen className="w-4 h-4" />
                  <span>Subject: {selectedSubject}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Calendar className="w-4 h-4" />
                  <span>
                    Date: {new Date(selectedDate).toLocaleDateString()}
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <Clock className="w-4 h-4" />
                  <span>Time: {selectedTime}</span>
                </div>
              </div>
            </motion.div>
          )}

          {/* Book Button */}
          <Button
            onClick={handleBooking}
            disabled={!selectedDate || !selectedTime || !selectedSubject}
            className="w-full bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-600 hover:to-purple-600 text-white"
            size="lg"
          >
            <User className="w-4 h-4 mr-2" />
            Book Session
          </Button>
        </CardContent>
      </Card>
    </motion.div>
  );
}
