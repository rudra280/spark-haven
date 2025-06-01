import React, { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  MessageCircle,
  Send,
  Bot,
  User,
  X,
  Minimize2,
  Maximize2,
  Sparkles,
  BookOpen,
  CreditCard,
  Settings,
  HelpCircle,
  Zap,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface Message {
  id: string;
  content: string;
  sender: "user" | "bot";
  timestamp: Date;
  type?: "text" | "quick-reply" | "suggestion";
  suggestions?: string[];
}

interface QuickAction {
  id: string;
  label: string;
  icon: any;
  action: string;
}

const quickActions: QuickAction[] = [
  { id: "1", label: "Find Courses", icon: BookOpen, action: "find_courses" },
  { id: "2", label: "Pricing Info", icon: CreditCard, action: "pricing" },
  { id: "3", label: "Technical Help", icon: Settings, action: "tech_help" },
  { id: "4", label: "Account Issues", icon: User, action: "account" },
];

const botResponses = [
  "I'm here to help! What would you like to know about LearnVerse?",
  "Great question! Let me help you with that.",
  "I can assist you with courses, pricing, technical issues, and more!",
  "Here's what I found for you...",
  "Is there anything specific you'd like me to explain further?",
  "I'm powered by AI to give you instant, accurate answers 24/7!",
];

export function HelpChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      content:
        "👋 Hi there! I'm Nova, your AI learning assistant! How can I help you today?",
      sender: "bot",
      timestamp: new Date(),
      type: "text",
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async (content: string) => {
    if (!content.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content: content.trim(),
      sender: "user",
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");
    setIsTyping(true);

    // Simulate AI processing
    setTimeout(() => {
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: generateBotResponse(content),
        sender: "bot",
        timestamp: new Date(),
        type: "text",
        suggestions: generateSuggestions(content),
      };
      setMessages((prev) => [...prev, botMessage]);
      setIsTyping(false);
    }, 1500);
  };

  const generateBotResponse = (userInput: string): string => {
    const input = userInput.toLowerCase();

    if (input.includes("course") || input.includes("learn")) {
      return "🎓 We have courses in every subject imaginable! From quantum physics to cooking, mathematics to music. You can browse our course catalog or search for specific topics. Would you like me to recommend some popular courses?";
    }

    if (
      input.includes("price") ||
      input.includes("cost") ||
      input.includes("payment")
    ) {
      return "💰 We offer flexible pricing:\n• Free tier with basic access\n• Pro plan at ₹1,499/month with unlimited courses\n• Premium at ₹2,999/month with 1-on-1 tutoring\n\nWould you like details about any specific plan?";
    }

    if (input.includes("tutor") || input.includes("teacher")) {
      return "👨‍🏫 We have both AI and human tutors!\n• AI tutors available 24/7 for instant help\n• Local verified human tutors in your city\n• Global experts for specialized subjects\n\nWould you like to find tutors near you?";
    }

    if (input.includes("ai video") || input.includes("generate")) {
      return "🤖 Our AI Video Generator is amazing! Just describe what you want to learn and it creates a personalized video instantly. It covers every subject and grade level. Want to try generating a video?";
    }

    if (input.includes("upload") || input.includes("share")) {
      return "📤 Yes! Anyone can upload educational content - from universities to individual experts. We support videos, notes, PDFs, and more. Universities like MIT, IIT, and Oxford already share content here!";
    }

    if (
      input.includes("location") ||
      input.includes("local") ||
      input.includes("india")
    ) {
      return "📍 We have local tutors across India! Just enter your city and we'll show verified tutors nearby. We cover all major cities and many smaller towns too.";
    }

    if (input.includes("help") || input.includes("support")) {
      return "🆘 I'm here 24/7 to help! You can also:\n• Email us at help@learnverse.com\n• Call our support team\n• Check our FAQ section\n• Schedule a live chat with human support";
    }

    // Default responses
    return botResponses[Math.floor(Math.random() * botResponses.length)];
  };

  const generateSuggestions = (userInput: string): string[] => {
    const input = userInput.toLowerCase();

    if (input.includes("course")) {
      return [
        "Show popular courses",
        "Find courses by subject",
        "AI-generated courses",
      ];
    }

    if (input.includes("price")) {
      return ["Compare all plans", "Student discounts", "Free trial"];
    }

    if (input.includes("tutor")) {
      return ["Find local tutors", "Book AI tutor session", "Tutor rates"];
    }

    return ["Browse courses", "Find tutors", "Upload content", "Get help"];
  };

  const handleQuickAction = (action: string) => {
    const actionMessages = {
      find_courses: "I'd like to find courses",
      pricing: "What are your pricing plans?",
      tech_help: "I need technical help",
      account: "I have an account issue",
    };

    handleSendMessage(
      actionMessages[action as keyof typeof actionMessages] || "I need help",
    );
  };

  const handleSuggestionClick = (suggestion: string) => {
    handleSendMessage(suggestion);
  };

  if (!isOpen) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        className="fixed bottom-6 right-6 z-50"
      >
        <Button
          onClick={() => setIsOpen(true)}
          size="lg"
          className="h-14 w-14 rounded-full bg-gradient-to-r from-violet-500 via-purple-500 to-fuchsia-500 hover:opacity-90 shadow-2xl shadow-purple-500/25"
        >
          <MessageCircle className="w-6 h-6" />
        </Button>

        {/* Notification dot */}
        <div className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full flex items-center justify-center">
          <Sparkles className="w-2 h-2 text-white" />
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 100, scale: 0.8 }}
      animate={{
        opacity: 1,
        y: 0,
        scale: 1,
        height: isMinimized ? 60 : 500,
        width: isMinimized ? 300 : 400,
      }}
      className="fixed bottom-6 right-6 z-50"
    >
      <Card className="h-full border-0 bg-background/95 backdrop-blur-md shadow-2xl">
        {/* Header */}
        <CardHeader className="p-4 bg-gradient-to-r from-violet-500 via-purple-500 to-fuchsia-500 text-white">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Avatar className="w-8 h-8 bg-white/20">
                <AvatarFallback className="bg-transparent text-white">
                  <Bot className="w-5 h-5" />
                </AvatarFallback>
              </Avatar>
              <div>
                <CardTitle className="text-sm font-semibold">
                  Nova AI Assistant
                </CardTitle>
                <div className="flex items-center space-x-1 text-xs opacity-90">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                  <span>Online 24/7</span>
                </div>
              </div>
            </div>

            <div className="flex items-center space-x-1">
              <Button
                size="icon"
                variant="ghost"
                onClick={() => setIsMinimized(!isMinimized)}
                className="h-6 w-6 text-white hover:bg-white/20"
              >
                {isMinimized ? (
                  <Maximize2 className="w-3 h-3" />
                ) : (
                  <Minimize2 className="w-3 h-3" />
                )}
              </Button>
              <Button
                size="icon"
                variant="ghost"
                onClick={() => setIsOpen(false)}
                className="h-6 w-6 text-white hover:bg-white/20"
              >
                <X className="w-3 h-3" />
              </Button>
            </div>
          </div>
        </CardHeader>

        <AnimatePresence>
          {!isMinimized && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="flex flex-col h-full"
            >
              {/* Quick Actions */}
              {messages.length === 1 && (
                <div className="p-4 border-b">
                  <p className="text-sm text-muted-foreground mb-3">
                    Quick actions:
                  </p>
                  <div className="grid grid-cols-2 gap-2">
                    {quickActions.map((action) => (
                      <Button
                        key={action.id}
                        variant="outline"
                        size="sm"
                        onClick={() => handleQuickAction(action.action)}
                        className="flex items-center space-x-2 h-8 text-xs"
                      >
                        <action.icon className="w-3 h-3" />
                        <span>{action.label}</span>
                      </Button>
                    ))}
                  </div>
                </div>
              )}

              {/* Messages */}
              <CardContent className="flex-1 overflow-y-auto p-4 max-h-80">
                <div className="space-y-4">
                  {messages.map((message) => (
                    <motion.div
                      key={message.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className={`flex items-start space-x-2 ${
                        message.sender === "user"
                          ? "flex-row-reverse space-x-reverse"
                          : ""
                      }`}
                    >
                      <Avatar className="w-6 h-6">
                        <AvatarFallback
                          className={`text-xs ${
                            message.sender === "bot"
                              ? "bg-gradient-to-r from-violet-500 to-purple-500 text-white"
                              : "bg-gradient-to-r from-blue-500 to-cyan-500 text-white"
                          }`}
                        >
                          {message.sender === "bot" ? (
                            <Bot className="w-3 h-3" />
                          ) : (
                            <User className="w-3 h-3" />
                          )}
                        </AvatarFallback>
                      </Avatar>

                      <div
                        className={`max-w-[80%] ${
                          message.sender === "user" ? "text-right" : "text-left"
                        }`}
                      >
                        <div
                          className={`rounded-lg px-3 py-2 text-sm ${
                            message.sender === "bot"
                              ? "bg-muted/50 text-foreground"
                              : "bg-gradient-to-r from-violet-500 to-purple-500 text-white"
                          }`}
                        >
                          <p className="whitespace-pre-line">
                            {message.content}
                          </p>
                        </div>

                        {/* Suggestions */}
                        {message.suggestions &&
                          message.suggestions.length > 0 && (
                            <div className="flex flex-wrap gap-1 mt-2">
                              {message.suggestions.map((suggestion, index) => (
                                <Button
                                  key={index}
                                  variant="outline"
                                  size="sm"
                                  onClick={() =>
                                    handleSuggestionClick(suggestion)
                                  }
                                  className="h-6 px-2 text-xs"
                                >
                                  {suggestion}
                                </Button>
                              ))}
                            </div>
                          )}

                        <p className="text-xs text-muted-foreground mt-1">
                          {message.timestamp.toLocaleTimeString([], {
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </p>
                      </div>
                    </motion.div>
                  ))}

                  {/* Typing Indicator */}
                  {isTyping && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="flex items-start space-x-2"
                    >
                      <Avatar className="w-6 h-6">
                        <AvatarFallback className="bg-gradient-to-r from-violet-500 to-purple-500 text-white">
                          <Bot className="w-3 h-3" />
                        </AvatarFallback>
                      </Avatar>
                      <div className="bg-muted/50 rounded-lg px-3 py-2">
                        <div className="flex space-x-1">
                          <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce"></div>
                          <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce [animation-delay:0.1s]"></div>
                          <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce [animation-delay:0.2s]"></div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                  <div ref={messagesEndRef} />
                </div>
              </CardContent>

              {/* Input */}
              <div className="p-4 border-t">
                <div className="flex items-center space-x-2">
                  <Input
                    placeholder="Ask me anything..."
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyPress={(e) =>
                      e.key === "Enter" && handleSendMessage(inputValue)
                    }
                    className="flex-1 text-sm"
                    disabled={isTyping}
                  />
                  <Button
                    onClick={() => handleSendMessage(inputValue)}
                    disabled={!inputValue.trim() || isTyping}
                    size="icon"
                    className="bg-gradient-to-r from-violet-500 to-purple-500 hover:opacity-90"
                  >
                    <Send className="w-4 h-4" />
                  </Button>
                </div>
                <p className="text-xs text-muted-foreground mt-2 text-center">
                  Powered by AI • Available 24/7 • Instant responses
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </Card>
    </motion.div>
  );
}
