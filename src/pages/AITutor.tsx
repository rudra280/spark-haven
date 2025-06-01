import React, { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Send,
  Bot,
  User,
  Sparkles,
  BookOpen,
  Calculator,
  Code,
  Palette,
  Loader2,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import api from "@/lib/api";

interface Message {
  id: string;
  content: string;
  sender: "user" | "ai";
  timestamp: Date;
}

const quickPrompts = [
  {
    icon: BookOpen,
    text: "Explain photosynthesis process",
    category: "Biology",
  },
  {
    icon: Calculator,
    text: "Help with calculus derivatives",
    category: "Math",
  },
  {
    icon: Code,
    text: "Debug my Python code",
    category: "Programming",
  },
  {
    icon: Palette,
    text: "UI design principles",
    category: "Design",
  },
  {
    icon: BookOpen,
    text: "History of World War 2",
    category: "History",
  },
  {
    icon: Calculator,
    text: "Quadratic equation formula",
    category: "Math",
  },
];

const subjects = [
  "Mathematics",
  "Physics",
  "Chemistry",
  "Biology",
  "Computer Science",
  "English",
  "History",
  "Geography",
  "Economics",
  "Psychology",
  "Art & Design",
  "Music",
  "Philosophy",
  "Literature",
];

export default function AITutor() {
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [selectedSubject, setSelectedSubject] = useState("");
  const [sessionStarted, setSessionStarted] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
      return;
    }

    // Initialize with welcome message
    if (!sessionStarted) {
      const welcomeMessage: Message = {
        id: "1",
        content: `Hello ${user?.name?.split(" ")[0]}! 👋 I'm Nova, your AI tutor. I'm here to help you learn anything - from quantum physics to creative writing! What would you like to explore today?`,
        sender: "ai",
        timestamp: new Date(),
      };
      setMessages([welcomeMessage]);
      setSessionStarted(true);
    }
  }, [isAuthenticated, navigate, user, sessionStarted]);

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

    try {
      // Call the real API
      const result = await api.sendMessageToAITutor(content);

      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        content: result.response,
        sender: "ai",
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, aiResponse]);
    } catch (error) {
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        content:
          "I apologize, but I'm having trouble connecting right now. Please try again in a moment!",
        sender: "ai",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleQuickPrompt = (prompt: string) => {
    handleSendMessage(prompt);
  };

  const handleSubjectSelect = (subject: string) => {
    setSelectedSubject(subject);
    handleSendMessage(`I need help with ${subject}`);
  };

  if (!isAuthenticated) {
    return null; // Will redirect to login
  }

  return (
    <div className="min-h-screen pt-16 bg-gradient-to-br from-background via-background to-muted/30 overflow-hidden">
      {/* Header */}
      <div className="fixed top-16 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-800">
        <div className="flex items-center justify-between px-4 py-3">
          <div className="flex items-center space-x-4">
            <div className="w-10 h-10 bg-gradient-to-r from-orange-500 via-pink-500 to-violet-500 rounded-full flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold bg-gradient-to-r from-orange-500 via-pink-500 to-violet-500 bg-clip-text text-transparent">
                AI Tutor - Nova
              </h1>
              <p className="text-sm text-muted-foreground">
                Your personal learning assistant, available 24/7
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-2 text-sm">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
            <span className="text-muted-foreground">Online</span>
          </div>
        </div>
      </div>

      {/* Main Chat Container */}
      <div className="relative h-screen pt-32 pb-4">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 h-full flex flex-col">
          {/* Subject Selection (when no messages) */}
          {messages.length <= 1 && !selectedSubject && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mb-6"
            >
              <h3 className="text-lg font-semibold mb-4 text-center">
                What subject can I help you with?
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {subjects.slice(0, 8).map((subject) => (
                  <Button
                    key={subject}
                    variant="outline"
                    onClick={() => handleSubjectSelect(subject)}
                    className="h-auto p-3 text-left hover:bg-primary/5"
                  >
                    <div>
                      <p className="font-medium text-sm">{subject}</p>
                      <p className="text-xs text-muted-foreground">
                        Get help now
                      </p>
                    </div>
                  </Button>
                ))}
              </div>
            </motion.div>
          )}

          {/* Chat Messages */}
          <Card className="flex-1 flex flex-col border-0 bg-background/50 backdrop-blur-sm overflow-hidden">
            <CardContent className="flex-1 overflow-y-auto p-6 space-y-4">
              <AnimatePresence>
                {messages.map((message) => (
                  <motion.div
                    key={message.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                    className={`flex items-start space-x-3 ${
                      message.sender === "user"
                        ? "flex-row-reverse space-x-reverse"
                        : ""
                    }`}
                  >
                    {/* Avatar */}
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                        message.sender === "ai"
                          ? "bg-gradient-to-r from-orange-500 via-pink-500 to-violet-500"
                          : "bg-gradient-to-r from-blue-500 to-purple-500"
                      }`}
                    >
                      {message.sender === "ai" ? (
                        <Bot className="w-4 h-4 text-white" />
                      ) : (
                        <User className="w-4 h-4 text-white" />
                      )}
                    </div>

                    {/* Message Bubble */}
                    <div
                      className={`max-w-[80%] ${
                        message.sender === "user" ? "text-right" : "text-left"
                      }`}
                    >
                      <div
                        className={`rounded-2xl px-4 py-2 ${
                          message.sender === "ai"
                            ? "bg-muted/50"
                            : "bg-gradient-to-r from-orange-500 via-pink-500 to-violet-500 text-white"
                        }`}
                      >
                        <p className="text-sm leading-relaxed whitespace-pre-line">
                          {message.content}
                        </p>
                      </div>
                      <p className="text-xs text-muted-foreground mt-1">
                        {message.timestamp.toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>

              {/* Typing Indicator */}
              {isTyping && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="flex items-start space-x-3"
                >
                  <div className="w-8 h-8 rounded-full bg-gradient-to-r from-orange-500 via-pink-500 to-violet-500 flex items-center justify-center">
                    <Bot className="w-4 h-4 text-white" />
                  </div>
                  <div className="bg-muted/50 rounded-2xl px-4 py-2">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce [animation-delay:0.1s]"></div>
                      <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce [animation-delay:0.2s]"></div>
                    </div>
                  </div>
                </motion.div>
              )}
              <div ref={messagesEndRef} />
            </CardContent>

            {/* Quick Prompts */}
            {messages.length === 1 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="px-6 pb-4"
              >
                <p className="text-sm text-muted-foreground mb-3">
                  🚀 Quick start prompts:
                </p>
                <div className="grid grid-cols-2 gap-2">
                  {quickPrompts.map((prompt, index) => (
                    <Button
                      key={index}
                      variant="outline"
                      size="sm"
                      onClick={() => handleQuickPrompt(prompt.text)}
                      className="justify-start h-auto p-3 text-left"
                    >
                      <prompt.icon className="w-4 h-4 mr-2 flex-shrink-0" />
                      <div>
                        <p className="font-medium text-sm">{prompt.text}</p>
                        <p className="text-xs text-muted-foreground">
                          {prompt.category}
                        </p>
                      </div>
                    </Button>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Input */}
            <div className="p-6 border-t">
              <div className="flex items-center space-x-2">
                <Input
                  placeholder="Ask me anything... (e.g., 'Explain calculus' or 'Help with my essay')"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyPress={(e) =>
                    e.key === "Enter" &&
                    !isTyping &&
                    handleSendMessage(inputValue)
                  }
                  className="flex-1"
                  disabled={isTyping}
                />
                <Button
                  onClick={() => handleSendMessage(inputValue)}
                  disabled={!inputValue.trim() || isTyping}
                  className="bg-gradient-to-r from-orange-500 via-pink-500 to-violet-500 hover:opacity-90"
                >
                  {isTyping ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <Send className="w-4 h-4" />
                  )}
                </Button>
              </div>
              <p className="text-xs text-muted-foreground mt-2 text-center">
                Nova is powered by advanced AI • Available 24/7 • Instant
                responses
              </p>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
