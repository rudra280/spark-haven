import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Send,
  Mic,
  MicOff,
  Volume2,
  VolumeX,
  FileText,
  Image,
  Video,
  BookOpen,
  Download,
  Copy,
  ThumbsUp,
  ThumbsDown,
  RotateCcw,
  Sparkles,
  Brain,
  Lightbulb,
  MessageSquare,
  Clock,
  Star,
  Award,
  Calculator,
  Code,
  Beaker,
  Atom,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/contexts/AuthContext";
import { PageHeader } from "@/components/ui/back-navigation";

interface Message {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
  type?: "text" | "code" | "math" | "explanation" | "resource";
  attachments?: {
    type: "pdf" | "image" | "video" | "link";
    name: string;
    url: string;
  }[];
  rating?: "helpful" | "not_helpful";
}

interface AIKnowledgeBase {
  subject: string;
  topics: string[];
  examples: string[];
  resources: string[];
}

// AI Knowledge Base with real educational content
const knowledgeBase: AIKnowledgeBase[] = [
  {
    subject: "Mathematics",
    topics: [
      "Calculus",
      "Linear Algebra",
      "Statistics",
      "Discrete Math",
      "Differential Equations",
      "Number Theory",
      "Geometry",
      "Trigonometry",
    ],
    examples: [
      "Derivative of x^2 is 2x",
      "Integral of 1/x is ln|x| + C",
      "Pythagorean theorem: a² + b² = c²",
      "Quadratic formula: x = (-b ± √(b²-4ac)) / 2a",
    ],
    resources: [
      "Khan Academy - Calculus",
      "MIT OpenCourseWare - Linear Algebra",
      "Paul's Online Math Notes",
      "Wolfram MathWorld",
    ],
  },
  {
    subject: "Physics",
    topics: [
      "Mechanics",
      "Thermodynamics",
      "Electromagnetism",
      "Quantum Physics",
      "Relativity",
      "Optics",
      "Waves",
      "Nuclear Physics",
    ],
    examples: [
      "F = ma (Newton's Second Law)",
      "E = mc² (Mass-Energy Equivalence)",
      "PV = nRT (Ideal Gas Law)",
      "λf = v (Wave Equation)",
    ],
    resources: [
      "Feynman Lectures on Physics",
      "Physics Classroom",
      "HyperPhysics",
      "MIT Physics Demonstrations",
    ],
  },
  {
    subject: "Computer Science",
    topics: [
      "Algorithms",
      "Data Structures",
      "Programming",
      "Machine Learning",
      "Database Systems",
      "Operating Systems",
      "Networks",
      "Software Engineering",
    ],
    examples: [
      "Binary Search: O(log n) complexity",
      "Quick Sort: Average O(n log n)",
      "Hash Table: O(1) average lookup",
      "Graph traversal: BFS and DFS",
    ],
    resources: [
      "LeetCode Problems",
      "GeeksforGeeks",
      "MIT Algorithms Course",
      "Clean Code by Robert Martin",
    ],
  },
  {
    subject: "Chemistry",
    topics: [
      "Organic Chemistry",
      "Inorganic Chemistry",
      "Physical Chemistry",
      "Biochemistry",
      "Analytical Chemistry",
      "Materials Science",
    ],
    examples: [
      "Water: H₂O (bent molecular geometry)",
      "Methane: CH₄ (tetrahedral)",
      "Benzene: C₆H₆ (aromatic ring)",
      "NaCl: ionic compound",
    ],
    resources: [
      "ChemSpider Database",
      "NIST Chemistry WebBook",
      "Organic Chemistry Portal",
      "PubChem Database",
    ],
  },
];

// AI Response Generator
const generateAIResponse = (
  userMessage: string,
  context: Message[],
): Message => {
  const message = userMessage.toLowerCase();
  let response = "";
  let type: Message["type"] = "text";
  let attachments: Message["attachments"] = [];

  // Math-related queries
  if (message.includes("derivative") || message.includes("differentiate")) {
    response = `To find the derivative, I'll help you step by step:

**Basic Rules:**
- d/dx(x^n) = nx^(n-1)
- d/dx(sin x) = cos x
- d/dx(e^x) = e^x
- d/dx(ln x) = 1/x

**Example:** If you have f(x) = x³ + 2x² - 5x + 1
- f'(x) = 3x² + 4x - 5

Would you like me to solve a specific derivative problem?`;
    type = "math";
    attachments = [
      {
        type: "pdf",
        name: "Derivative Rules Reference.pdf",
        url: "#",
      },
    ];
  } else if (message.includes("integral") || message.includes("integrate")) {
    response = `Integration is the reverse of differentiation. Here are key techniques:

**Basic Integrals:**
- ∫x^n dx = x^(n+1)/(n+1) + C (n ≠ -1)
- ∫1/x dx = ln|x| + C
- ∫e^x dx = e^x + C
- ∫sin x dx = -cos x + C

**Integration Techniques:**
1. Substitution method
2. Integration by parts
3. Partial fractions
4. Trigonometric substitution

Want to practice with a specific integral?`;
    type = "math";
  }

  // Physics queries
  else if (message.includes("force") || message.includes("newton")) {
    response = `Newton's Laws of Motion are fundamental in physics:

**Newton's First Law (Inertia):**
An object at rest stays at rest, and an object in motion stays in motion, unless acted upon by an external force.

**Newton's Second Law:**
F = ma (Force = mass × acceleration)

**Newton's Third Law:**
For every action, there is an equal and opposite reaction.

**Example Problem:**
If a 10 kg object accelerates at 5 m/s², the net force is:
F = 10 kg × 5 m/s² = 50 N

Need help with a specific force problem?`;
    type = "explanation";
    attachments = [
      {
        type: "video",
        name: "Newton's Laws Demonstration",
        url: "#",
      },
    ];
  }

  // Programming queries
  else if (
    message.includes("algorithm") ||
    message.includes("code") ||
    message.includes("programming")
  ) {
    response = `I can help you with algorithms and programming concepts!

**Common Algorithms:**
- **Sorting:** Quick Sort, Merge Sort, Bubble Sort
- **Searching:** Binary Search, Linear Search
- **Graph:** BFS, DFS, Dijkstra's Algorithm
- **Dynamic Programming:** Fibonacci, Knapsack Problem

**Example - Binary Search:**
\`\`\`python
def binary_search(arr, target):
    left, right = 0, len(arr) - 1
    
    while left <= right:
        mid = (left + right) // 2
        if arr[mid] == target:
            return mid
        elif arr[mid] < target:
            left = mid + 1
        else:
            right = mid - 1
    
    return -1
\`\`\`

What specific algorithm or programming concept would you like to explore?`;
    type = "code";
  }

  // Chemistry queries
  else if (
    message.includes("chemical") ||
    message.includes("molecule") ||
    message.includes("reaction")
  ) {
    response = `Chemistry involves understanding matter and its interactions:

**Key Concepts:**
- **Atomic Structure:** Protons, neutrons, electrons
- **Chemical Bonds:** Ionic, covalent, metallic
- **Molecular Geometry:** VSEPR theory
- **Chemical Reactions:** Synthesis, decomposition, single/double replacement

**Example - Water (H₂O):**
- 2 hydrogen atoms + 1 oxygen atom
- Bent molecular geometry (104.5° bond angle)
- Polar molecule due to electronegativity difference

**Balancing Chemical Equations:**
Example: 2H₂ + O₂ → 2H₂O

What chemistry topic interests you most?`;
    type = "explanation";
    attachments = [
      {
        type: "image",
        name: "Periodic Table Reference.jpg",
        url: "#",
      },
    ];
  }

  // General study help
  else if (
    message.includes("study") ||
    message.includes("learn") ||
    message.includes("help")
  ) {
    response = `I'm here to help you learn effectively! Here are some proven study strategies:

**Active Learning Techniques:**
1. **Spaced Repetition:** Review material at increasing intervals
2. **Feynman Technique:** Explain concepts in simple terms
3. **Practice Testing:** Quiz yourself regularly
4. **Elaborative Interrogation:** Ask "why" and "how" questions

**Subject-Specific Tips:**
- **Math/Physics:** Practice problems daily, understand concepts before memorizing
- **Programming:** Code regularly, build projects, debug systematically
- **Sciences:** Use visual aids, create concept maps, relate to real-world examples

**Available Resources:**
- Video lectures with downloadable notes
- Interactive problem sets
- Study group connections
- Practice exams and quizzes

What subject would you like to focus on today?`;
    type = "explanation";
  }

  // Default response for general queries
  else {
    response = `I understand you're asking about "${userMessage}". I'm an AI tutor specialized in:

📚 **Mathematics** - Calculus, Algebra, Statistics, Geometry
🔬 **Physics** - Mechanics, Thermodynamics, Quantum Physics
💻 **Computer Science** - Algorithms, Programming, Data Structures
🧪 **Chemistry** - Organic, Inorganic, Physical Chemistry
📖 **Study Skills** - Learning techniques, exam preparation

**How I can help:**
- Explain complex concepts step-by-step
- Provide worked examples and practice problems
- Share relevant study materials and resources
- Answer specific questions about your coursework
- Suggest personalized learning strategies

Please ask me a specific question about any of these subjects, and I'll provide detailed, helpful explanations with examples and resources!

**Quick Examples:**
- "How do I solve derivatives?"
- "Explain Newton's laws"
- "What is binary search algorithm?"
- "Help me balance chemical equations"`;
  }

  return {
    id: Date.now().toString(),
    text: response,
    isUser: false,
    timestamp: new Date(),
    type,
    attachments,
  };
};

export default function AITutor() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      text: `Hello! I'm your AI tutor, ready to help you learn and understand complex topics. I have access to comprehensive educational content and can assist you with:

🎓 **Mathematics** - From basic algebra to advanced calculus
🔬 **Physics** - Classical mechanics to quantum physics  
💻 **Computer Science** - Programming, algorithms, and data structures
🧪 **Chemistry** - Organic, inorganic, and physical chemistry
📚 **Study Skills** - Learning techniques and exam preparation

I can provide step-by-step explanations, worked examples, practice problems, and downloadable study materials. What would you like to learn today?`,
      isUser: false,
      timestamp: new Date(),
      type: "explanation",
    },
  ]);

  const [inputMessage, setInputMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { user } = useAuth();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputMessage,
      isUser: true,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputMessage("");
    setIsLoading(true);

    // Simulate AI processing time
    setTimeout(() => {
      const aiResponse = generateAIResponse(inputMessage, messages);
      setMessages((prev) => [...prev, aiResponse]);
      setIsLoading(false);
    }, 1500);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const rateMessage = (
    messageId: string,
    rating: "helpful" | "not_helpful",
  ) => {
    setMessages((prev) =>
      prev.map((msg) => (msg.id === messageId ? { ...msg, rating } : msg)),
    );
  };

  const copyMessage = (text: string) => {
    navigator.clipboard.writeText(text);
    // Show toast notification here
  };

  const downloadAttachment = (
    attachment: NonNullable<Message["attachments"]>[0],
  ) => {
    // Simulate file download
    const link = document.createElement("a");
    link.href = attachment.url;
    link.download = attachment.name;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const clearChat = () => {
    setMessages([messages[0]]); // Keep the welcome message
  };

  return (
    <div className="min-h-screen bg-white pt-20">
      <div className="container-wide max-w-6xl">
        <PageHeader
          title="AI Tutor"
          subtitle="Get personalized help with your studies from our intelligent tutoring system"
        />

        {/* Knowledge Areas */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          {knowledgeBase.map((area) => (
            <Card
              key={area.subject}
              className="text-center hover:shadow-lg transition-all cursor-pointer"
            >
              <CardContent className="p-4">
                <div className="w-12 h-12 mx-auto mb-3 bg-slate-100 rounded-full flex items-center justify-center">
                  {area.subject === "Mathematics" && (
                    <Calculator className="w-6 h-6 text-blue-600" />
                  )}
                  {area.subject === "Physics" && (
                    <Atom className="w-6 h-6 text-green-600" />
                  )}
                  {area.subject === "Computer Science" && (
                    <Code className="w-6 h-6 text-purple-600" />
                  )}
                  {area.subject === "Chemistry" && (
                    <Beaker className="w-6 h-6 text-red-600" />
                  )}
                </div>
                <h3 className="font-medium text-slate-900">{area.subject}</h3>
                <p className="text-xs text-slate-500 mt-1">
                  {area.topics.length} topics
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Chat Interface */}
        <Card className="h-[600px] flex flex-col">
          {/* Chat Header */}
          <CardHeader className="border-b border-slate-200 pb-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                  <Brain className="w-5 h-5 text-white" />
                </div>
                <div>
                  <CardTitle className="text-lg">AI Tutor</CardTitle>
                  <CardDescription className="flex items-center">
                    <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                    Online and ready to help
                  </CardDescription>
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <Button variant="outline" size="sm" onClick={clearChat}>
                  <RotateCcw className="w-4 h-4 mr-1" />
                  Clear Chat
                </Button>
              </div>
            </div>
          </CardHeader>

          {/* Messages */}
          <CardContent className="flex-1 overflow-y-auto p-4 space-y-4">
            <AnimatePresence>
              {messages.map((message) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex ${message.isUser ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[80%] ${message.isUser ? "order-2" : "order-1"}`}
                  >
                    <div
                      className={`rounded-lg p-4 ${
                        message.isUser
                          ? "bg-slate-800 text-white"
                          : "bg-slate-100 text-slate-900"
                      }`}
                    >
                      {/* Message Type Badge */}
                      {message.type && !message.isUser && (
                        <div className="flex items-center space-x-2 mb-2">
                          {message.type === "math" && (
                            <Calculator className="w-4 h-4 text-blue-600" />
                          )}
                          {message.type === "code" && (
                            <Code className="w-4 h-4 text-purple-600" />
                          )}
                          {message.type === "explanation" && (
                            <Lightbulb className="w-4 h-4 text-yellow-600" />
                          )}
                          <Badge variant="secondary" className="text-xs">
                            {message.type.charAt(0).toUpperCase() +
                              message.type.slice(1)}
                          </Badge>
                        </div>
                      )}

                      <div className="prose prose-sm max-w-none">
                        {message.text.split("\n").map((line, index) => {
                          if (line.startsWith("```")) {
                            return null; // Handle code blocks separately
                          }
                          if (line.startsWith("**") && line.endsWith("**")) {
                            return (
                              <p key={index} className="font-semibold mb-1">
                                {line.slice(2, -2)}
                              </p>
                            );
                          }
                          if (line.startsWith("- ")) {
                            return (
                              <li key={index} className="ml-4">
                                {line.slice(2)}
                              </li>
                            );
                          }
                          return line ? (
                            <p key={index} className="mb-1">
                              {line}
                            </p>
                          ) : (
                            <br key={index} />
                          );
                        })}
                      </div>

                      {/* Attachments */}
                      {message.attachments &&
                        message.attachments.length > 0 && (
                          <div className="mt-3 space-y-2">
                            {message.attachments.map((attachment, index) => (
                              <div
                                key={index}
                                className="flex items-center justify-between p-2 bg-white/10 rounded border cursor-pointer hover:bg-white/20"
                                onClick={() => downloadAttachment(attachment)}
                              >
                                <div className="flex items-center space-x-2">
                                  {attachment.type === "pdf" && (
                                    <FileText className="w-4 h-4 text-red-500" />
                                  )}
                                  {attachment.type === "image" && (
                                    <Image className="w-4 h-4 text-green-500" />
                                  )}
                                  {attachment.type === "video" && (
                                    <Video className="w-4 h-4 text-blue-500" />
                                  )}
                                  <span className="text-sm">
                                    {attachment.name}
                                  </span>
                                </div>
                                <Download className="w-4 h-4" />
                              </div>
                            ))}
                          </div>
                        )}

                      {/* Message Actions */}
                      {!message.isUser && (
                        <div className="flex items-center justify-between mt-3 pt-2 border-t border-white/20">
                          <div className="flex items-center space-x-2">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => rateMessage(message.id, "helpful")}
                              className={`text-xs ${message.rating === "helpful" ? "text-green-600" : ""}`}
                            >
                              <ThumbsUp className="w-3 h-3 mr-1" />
                              Helpful
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() =>
                                rateMessage(message.id, "not_helpful")
                              }
                              className={`text-xs ${message.rating === "not_helpful" ? "text-red-600" : ""}`}
                            >
                              <ThumbsDown className="w-3 h-3 mr-1" />
                              Not helpful
                            </Button>
                          </div>

                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => copyMessage(message.text)}
                            className="text-xs"
                          >
                            <Copy className="w-3 h-3 mr-1" />
                            Copy
                          </Button>
                        </div>
                      )}
                    </div>

                    <div
                      className={`text-xs text-slate-500 mt-1 ${message.isUser ? "text-right" : "text-left"}`}
                    >
                      {message.timestamp.toLocaleTimeString()}
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>

            {/* Loading indicator */}
            {isLoading && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex justify-start"
              >
                <div className="bg-slate-100 rounded-lg p-4">
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce"></div>
                    <div
                      className="w-2 h-2 bg-slate-400 rounded-full animate-bounce"
                      style={{ animationDelay: "0.1s" }}
                    ></div>
                    <div
                      className="w-2 h-2 bg-slate-400 rounded-full animate-bounce"
                      style={{ animationDelay: "0.2s" }}
                    ></div>
                    <span className="text-sm text-slate-600 ml-2">
                      AI is thinking...
                    </span>
                  </div>
                </div>
              </motion.div>
            )}

            <div ref={messagesEndRef} />
          </CardContent>

          {/* Input */}
          <div className="border-t border-slate-200 p-4">
            <div className="flex items-center space-x-2">
              <div className="flex-1 relative">
                <Input
                  placeholder="Ask me anything about your studies..."
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  onKeyPress={handleKeyPress}
                  disabled={isLoading}
                  className="pr-12"
                />
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute right-1 top-1/2 transform -translate-y-1/2"
                  onClick={() => setIsListening(!isListening)}
                >
                  {isListening ? (
                    <MicOff className="w-4 h-4" />
                  ) : (
                    <Mic className="w-4 h-4" />
                  )}
                </Button>
              </div>

              <Button
                onClick={handleSendMessage}
                disabled={!inputMessage.trim() || isLoading}
                className="bg-slate-800 hover:bg-slate-700"
              >
                <Send className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
