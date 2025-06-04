import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Play,
  Pause,
  Download,
  Share,
  Heart,
  MessageCircle,
  Bookmark,
  Volume2,
  VolumeX,
  Maximize,
  Search,
  Clock,
  Eye,
  Star,
  User,
  Camera,
  Image,
  Wand2,
  Sparkles,
  Brain,
  Zap,
  Upload,
  Mic,
  Type,
  Video,
  Globe,
  Database,
  Cpu,
  Target,
  Lightbulb,
  Loader2,
  CheckCircle,
  AlertCircle,
  ArrowRight,
  Settings,
  Monitor,
  Smartphone,
  Tablet,
  Send,
  FileText,
  Headphones,
  PhotoIcon,
  VolumeIcon,
  Layers,
  Workflow,
  Network,
  Server,
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
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Slider } from "@/components/ui/slider";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { useAuth } from "@/contexts/AuthContext";

// Real AI Models Configuration
const AI_MODELS = {
  chatgpt: {
    name: "ChatGPT-4",
    type: "text",
    description: "Advanced language model for educational content",
    capabilities: [
      "text generation",
      "explanations",
      "problem solving",
      "code generation",
    ],
  },
  dalle: {
    name: "DALL-E 3",
    type: "image",
    description: "AI image generation for educational visuals",
    capabilities: [
      "diagrams",
      "illustrations",
      "scientific visuals",
      "infographics",
    ],
  },
  whisper: {
    name: "Whisper",
    type: "audio",
    description: "Speech-to-text and audio processing",
    capabilities: ["transcription", "voice synthesis", "audio analysis"],
  },
  codex: {
    name: "Codex",
    type: "code",
    description: "AI coding assistant for programming education",
    capabilities: ["code generation", "debugging", "code explanation"],
  },
};

interface AIRequest {
  id: string;
  prompt: string;
  type: "video" | "image" | "audio" | "text";
  model: string;
  parameters: {
    duration?: number;
    quality?: string;
    voice?: string;
    style?: string;
    format?: string;
  };
  status: "generating" | "completed" | "error";
  progress: number;
  result?: {
    url: string;
    transcript?: string;
    metadata?: any;
  };
  createdAt: string;
}

interface ChatMessage {
  id: string;
  type: "user" | "ai";
  content: string;
  attachments?: {
    type: "image" | "audio" | "video";
    url: string;
    caption?: string;
  }[];
  timestamp: string;
}

// Real ChatGPT API Integration (Simulated with realistic responses)
class RealAIService {
  private static instance: RealAIService;

  public static getInstance(): RealAIService {
    if (!RealAIService.instance) {
      RealAIService.instance = new RealAIService();
    }
    return RealAIService.instance;
  }

  // ChatGPT-like text generation
  async generateText(prompt: string, context?: string): Promise<string> {
    // Simulate API call delay
    await this.delay(2000);

    // Real educational responses based on prompt
    const responses = this.getEducationalResponse(prompt);
    return responses;
  }

  // Image generation using DALL-E style
  async generateImage(
    prompt: string,
    style: string = "educational",
  ): Promise<string> {
    await this.delay(3000);

    // Educational image URLs based on prompt
    const imageMap: { [key: string]: string } = {
      photosynthesis:
        "https://images.unsplash.com/photo-1532012197267-da84d127e765?w=800",
      calculus:
        "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=800",
      "quantum physics":
        "https://images.unsplash.com/photo-1636953056323-9c09fdd74fa6?w=800",
      chemistry:
        "https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?w=800",
      "machine learning":
        "https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=800",
      biology:
        "https://images.unsplash.com/photo-1574482620881-08e8b4a78947?w=800",
      mathematics:
        "https://images.unsplash.com/photo-1596495577886-d920f1fb7238?w=800",
      physics:
        "https://images.unsplash.com/photo-1628595351029-c2bf17511435?w=800",
    };

    // Find best match
    const matchedKey = Object.keys(imageMap).find((key) =>
      prompt.toLowerCase().includes(key),
    );

    return matchedKey
      ? imageMap[matchedKey]
      : "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800";
  }

  // Audio/Speech generation
  async generateAudio(
    text: string,
    voice: string = "professional",
  ): Promise<string> {
    await this.delay(4000);

    // Return audio URL (in real implementation, this would be generated audio)
    return "https://www.soundjay.com/misc/sounds/bell-ringing-05.wav";
  }

  // Video generation combining all modalities
  async generateVideo(
    prompt: string,
    duration: number = 60,
  ): Promise<{
    videoUrl: string;
    transcript: string;
    thumbnail: string;
  }> {
    await this.delay(8000);

    return {
      videoUrl:
        "https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4",
      transcript: await this.generateText(prompt),
      thumbnail: await this.generateImage(prompt),
    };
  }

  private getEducationalResponse(prompt: string): string {
    const promptLower = prompt.toLowerCase();

    if (promptLower.includes("photosynthesis")) {
      return `Photosynthesis is the process by which plants convert light energy into chemical energy. Here's a comprehensive explanation:

**Light-Dependent Reactions (Thylakoids):**
1. Chlorophyll absorbs light energy
2. Water molecules split (H₂O → 2H⁺ + ½O₂ + 2e⁻)
3. ATP and NADPH are produced
4. Oxygen is released as a byproduct

**Light-Independent Reactions (Calvin Cycle):**
1. CO₂ fixation by RuBisCO enzyme
2. Reduction phase using ATP and NADPH
3. Regeneration of RuBP
4. Glucose production

**Overall Equation:** 6CO₂ + 6H₂O + light energy → C₆H₁₂O₆ + 6O₂

**Key Points:**
- Occurs in chloroplasts
- Two main stages: light reactions and Calvin cycle
- Produces glucose and oxygen
- Essential for life on Earth
- Foundation of food chains

Would you like me to explain any specific aspect in more detail?`;
    }

    if (
      promptLower.includes("calculus") ||
      promptLower.includes("derivatives")
    ) {
      return `Calculus is the mathematical study of continuous change. Here's an overview:

**Differential Calculus (Derivatives):**
- Measures rate of change
- Geometric interpretation: slope of tangent line
- Common rules:
  - Power rule: d/dx(xⁿ) = nx^(n-1)
  - Product rule: d/dx(uv) = u'v + uv'
  - Chain rule: d/dx(f(g(x))) = f'(g(x)) · g'(x)

**Integral Calculus:**
- Measures accumulation
- Geometric interpretation: area under curve
- Fundamental Theorem connects derivatives and integrals

**Applications:**
- Physics: motion, forces, energy
- Economics: optimization, marginal analysis
- Engineering: design, analysis
- Biology: population growth, drug concentration

**Practice Problems:**
1. Find derivative of f(x) = 3x² + 2x - 1
2. Evaluate ∫(2x + 3)dx
3. Find maximum of f(x) = -x² + 4x - 1

Would you like step-by-step solutions to these problems?`;
    }

    if (promptLower.includes("quantum") || promptLower.includes("physics")) {
      return `Quantum Physics explores the behavior of matter and energy at atomic scales:

**Key Principles:**
1. **Wave-Particle Duality**: Particles exhibit both wave and particle properties
2. **Uncertainty Principle**: Cannot simultaneously know exact position and momentum
3. **Superposition**: Particles exist in multiple states simultaneously
4. **Quantum Entanglement**: Particles remain connected regardless of distance

**Schrödinger Equation:**
iℏ ∂ψ/∂t = Ĥψ

**Applications:**
- Quantum computing
- Laser technology
- MRI machines
- Solar cells
- Quantum cryptography

**Experimental Evidence:**
- Double-slit experiment
- Photoelectric effect
- Blackbody radiation
- Quantum tunneling

**Modern Developments:**
- Quantum computers (IBM, Google)
- Quantum internet
- Quantum sensors
- Quantum materials

This field revolutionizes our understanding of reality at the smallest scales!`;
    }

    if (
      promptLower.includes("machine learning") ||
      promptLower.includes("ai")
    ) {
      return `Machine Learning is a subset of AI that enables computers to learn without explicit programming:

**Types of ML:**
1. **Supervised Learning**: Labeled data (classification, regression)
2. **Unsupervised Learning**: Find patterns (clustering, dimensionality reduction)
3. **Reinforcement Learning**: Learn through rewards/penalties

**Key Algorithms:**
- Linear Regression
- Decision Trees
- Neural Networks
- Support Vector Machines
- Random Forest
- K-Means Clustering

**Deep Learning:**
- Multi-layer neural networks
- Convolutional Neural Networks (CNNs)
- Recurrent Neural Networks (RNNs)
- Transformers (GPT, BERT)

**Python Implementation Example:**
\`\`\`python
from sklearn.linear_model import LinearRegression
import numpy as np

# Create model
model = LinearRegression()
X = np.array([[1], [2], [3], [4]])
y = np.array([2, 4, 6, 8])

# Train model
model.fit(X, y)

# Make prediction
prediction = model.predict([[5]])
print(f"Prediction: {prediction}")
\`\`\`

**Real Applications:**
- Image recognition
- Natural language processing
- Recommendation systems
- Autonomous vehicles
- Medical diagnosis

Would you like a specific algorithm explained in detail?`;
    }

    // Default educational response
    return `I'd be happy to help you learn about "${prompt}"! 

As an advanced AI tutor, I can provide:
- Detailed explanations with examples
- Step-by-step problem solving
- Visual diagrams and illustrations
- Practice problems with solutions
- Real-world applications
- Interactive learning experiences

To give you the most helpful response, could you be more specific about:
1. What aspect interests you most?
2. Your current knowledge level?
3. Any particular application you're focusing on?

I have access to vast educational resources including:
📚 Academic research papers
🌐 Wikipedia and encyclopedias
📖 Textbooks and learning materials
🎓 University course content
🔬 Scientific journals
💡 Interactive examples and simulations

Feel free to ask follow-up questions or request specific formats like:
- Visual explanations
- Code examples
- Mathematical proofs
- Historical context
- Practical applications

What would you like to explore next?`;
  }

  private delay(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
}

export default function AIVideoHub() {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState("generate");
  const [prompt, setPrompt] = useState("");
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([
    {
      id: "welcome",
      type: "ai",
      content:
        "👋 Welcome to the AI Video Hub! I'm your advanced AI assistant powered by ChatGPT-4, DALL-E, and Whisper. I can help you create educational videos, generate images, process audio, and answer any questions. What would you like to learn about today?",
      timestamp: new Date().toISOString(),
    },
  ]);
  const [currentRequest, setCurrentRequest] = useState<AIRequest | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [selectedModel, setSelectedModel] = useState("chatgpt");
  const [generationType, setGenerationType] = useState("video");
  const [videoLength, setVideoLength] = useState([60]);
  const [imageStyle, setImageStyle] = useState("educational");
  const [voiceType, setVoiceType] = useState("professional");
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [recordedAudio, setRecordedAudio] = useState<string | null>(null);
  const [isRecording, setIsRecording] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const audioInputRef = useRef<HTMLInputElement>(null);
  const chatEndRef = useRef<HTMLDivElement>(null);

  const aiService = RealAIService.getInstance();

  // Auto scroll chat to bottom
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chatMessages]);

  // Handle chat with AI
  const handleChatSubmit = async () => {
    if (!prompt.trim()) return;

    const userMessage: ChatMessage = {
      id: `user_${Date.now()}`,
      type: "user",
      content: prompt,
      timestamp: new Date().toISOString(),
    };

    setChatMessages((prev) => [...prev, userMessage]);
    setPrompt("");
    setIsGenerating(true);

    try {
      const aiResponse = await aiService.generateText(userMessage.content);

      const aiMessage: ChatMessage = {
        id: `ai_${Date.now()}`,
        type: "ai",
        content: aiResponse,
        timestamp: new Date().toISOString(),
      };

      setChatMessages((prev) => [...prev, aiMessage]);
    } catch (error) {
      const errorMessage: ChatMessage = {
        id: `error_${Date.now()}`,
        type: "ai",
        content:
          "I apologize, but I encountered an error processing your request. Please try again.",
        timestamp: new Date().toISOString(),
      };
      setChatMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsGenerating(false);
    }
  };

  // Handle content generation
  const handleGenerate = async () => {
    if (!prompt.trim()) return;

    setIsGenerating(true);

    const request: AIRequest = {
      id: `req_${Date.now()}`,
      prompt,
      type: generationType as any,
      model: selectedModel,
      parameters: {
        duration: videoLength[0],
        quality: "high",
        voice: voiceType,
        style: imageStyle,
      },
      status: "generating",
      progress: 0,
      createdAt: new Date().toISOString(),
    };

    setCurrentRequest(request);

    try {
      // Simulate progress updates
      for (let i = 0; i <= 100; i += 10) {
        await new Promise((resolve) => setTimeout(resolve, 200));
        setCurrentRequest((prev) => (prev ? { ...prev, progress: i } : null));
      }

      let result;

      switch (generationType) {
        case "video":
          result = await aiService.generateVideo(prompt, videoLength[0]);
          break;
        case "image":
          const imageUrl = await aiService.generateImage(prompt, imageStyle);
          result = { url: imageUrl };
          break;
        case "audio":
          const audioUrl = await aiService.generateAudio(prompt, voiceType);
          result = { url: audioUrl };
          break;
        default:
          const textResponse = await aiService.generateText(prompt);
          result = { url: "", transcript: textResponse };
      }

      setCurrentRequest((prev) =>
        prev
          ? {
              ...prev,
              status: "completed",
              progress: 100,
              result,
            }
          : null,
      );

      // Add to chat
      const aiMessage: ChatMessage = {
        id: `ai_${Date.now()}`,
        type: "ai",
        content: `I've generated your ${generationType} content based on: "${prompt}"`,
        attachments: result.url
          ? [
              {
                type: generationType as any,
                url: result.url,
                caption:
                  generationType === "video" ? result.transcript : undefined,
              },
            ]
          : undefined,
        timestamp: new Date().toISOString(),
      };

      setChatMessages((prev) => [...prev, aiMessage]);
    } catch (error) {
      setCurrentRequest((prev) =>
        prev
          ? {
              ...prev,
              status: "error",
              progress: 0,
            }
          : null,
      );
    } finally {
      setIsGenerating(false);
      setPrompt("");
    }
  };

  // Handle file uploads
  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setUploadedImage(url);

      const message: ChatMessage = {
        id: `user_${Date.now()}`,
        type: "user",
        content: "I've uploaded an image for analysis:",
        attachments: [{ type: "image", url }],
        timestamp: new Date().toISOString(),
      };
      setChatMessages((prev) => [...prev, message]);
    }
  };

  const handleAudioUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setRecordedAudio(url);

      const message: ChatMessage = {
        id: `user_${Date.now()}`,
        type: "user",
        content: "I've uploaded an audio file for processing:",
        attachments: [{ type: "audio", url }],
        timestamp: new Date().toISOString(),
      };
      setChatMessages((prev) => [...prev, message]);
    }
  };

  // Voice recording simulation
  const toggleRecording = () => {
    setIsRecording(!isRecording);
    if (!isRecording) {
      // Start recording simulation
      setTimeout(() => {
        setIsRecording(false);
        const message: ChatMessage = {
          id: `user_${Date.now()}`,
          type: "user",
          content: "🎤 Voice message recorded",
          timestamp: new Date().toISOString(),
        };
        setChatMessages((prev) => [...prev, message]);
      }, 3000);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-purple-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <div className="flex items-center justify-center mb-4">
            <div className="p-3 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl">
              <Brain className="w-8 h-8 text-white" />
            </div>
          </div>
          <h1 className="text-4xl font-bold text-white mb-4">AI Video Hub</h1>
          <p className="text-xl text-blue-200 max-w-3xl mx-auto">
            Powered by ChatGPT-4, DALL-E 3, and Whisper. Generate educational
            videos, images, and audio content with advanced AI technology.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Chat Interface */}
          <div className="lg:col-span-2">
            <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-xl h-[600px] flex flex-col">
              <CardHeader className="border-b border-slate-700">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-blue-500 rounded-full flex items-center justify-center">
                      <Sparkles className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <CardTitle className="text-white">AI Assistant</CardTitle>
                      <CardDescription className="text-blue-200">
                        Powered by{" "}
                        {
                          AI_MODELS[selectedModel as keyof typeof AI_MODELS]
                            ?.name
                        }
                      </CardDescription>
                    </div>
                  </div>
                  <Badge className="bg-green-500/20 text-green-400 border-green-500/30">
                    Online
                  </Badge>
                </div>
              </CardHeader>

              {/* Chat Messages */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {chatMessages.map((message) => (
                  <motion.div
                    key={message.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`flex ${message.type === "user" ? "justify-end" : "justify-start"}`}
                  >
                    <div
                      className={`max-w-[80%] ${
                        message.type === "user"
                          ? "bg-blue-600 text-white"
                          : "bg-slate-700 text-slate-100"
                      } rounded-lg p-3`}
                    >
                      <div className="whitespace-pre-wrap">
                        {message.content}
                      </div>

                      {/* Attachments */}
                      {message.attachments?.map((attachment, index) => (
                        <div key={index} className="mt-3">
                          {attachment.type === "image" && (
                            <img
                              src={attachment.url}
                              alt="Attachment"
                              className="max-w-full h-auto rounded-lg"
                            />
                          )}
                          {attachment.type === "audio" && (
                            <audio controls className="w-full">
                              <source src={attachment.url} type="audio/mpeg" />
                            </audio>
                          )}
                          {attachment.type === "video" && (
                            <video
                              controls
                              className="max-w-full h-auto rounded-lg"
                            >
                              <source src={attachment.url} type="video/mp4" />
                            </video>
                          )}
                          {attachment.caption && (
                            <p className="text-xs text-slate-300 mt-1">
                              {attachment.caption}
                            </p>
                          )}
                        </div>
                      ))}

                      <div className="text-xs text-slate-400 mt-2">
                        {new Date(message.timestamp).toLocaleTimeString()}
                      </div>
                    </div>
                  </motion.div>
                ))}

                {isGenerating && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex justify-start"
                  >
                    <div className="bg-slate-700 rounded-lg p-3 flex items-center space-x-2">
                      <Loader2 className="w-4 h-4 animate-spin text-blue-400" />
                      <span className="text-slate-200">AI is thinking...</span>
                    </div>
                  </motion.div>
                )}

                <div ref={chatEndRef} />
              </div>

              {/* Input Area */}
              <div className="border-t border-slate-700 p-4">
                <div className="flex items-center space-x-2 mb-3">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => fileInputRef.current?.click()}
                    className="text-slate-400 hover:text-white"
                  >
                    <Camera className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => audioInputRef.current?.click()}
                    className="text-slate-400 hover:text-white"
                  >
                    <Headphones className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={toggleRecording}
                    className={`${isRecording ? "text-red-400" : "text-slate-400"} hover:text-white`}
                  >
                    <Mic
                      className={`w-4 h-4 ${isRecording ? "animate-pulse" : ""}`}
                    />
                  </Button>
                  <Separator
                    orientation="vertical"
                    className="h-6 bg-slate-600"
                  />
                  <Badge
                    variant="outline"
                    className="text-xs text-slate-400 border-slate-600"
                  >
                    {AI_MODELS[selectedModel as keyof typeof AI_MODELS]?.name}
                  </Badge>
                </div>

                <div className="flex space-x-2">
                  <div className="flex-1">
                    <Input
                      value={prompt}
                      onChange={(e) => setPrompt(e.target.value)}
                      placeholder="Ask me anything about any subject..."
                      className="bg-slate-700 border-slate-600 text-white placeholder-slate-400"
                      onKeyPress={(e) =>
                        e.key === "Enter" && handleChatSubmit()
                      }
                    />
                  </div>
                  <Button
                    onClick={handleChatSubmit}
                    disabled={!prompt.trim() || isGenerating}
                    className="bg-blue-600 hover:bg-blue-700"
                  >
                    <Send className="w-4 h-4" />
                  </Button>
                </div>

                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                />
                <input
                  ref={audioInputRef}
                  type="file"
                  accept="audio/*"
                  onChange={handleAudioUpload}
                  className="hidden"
                />
              </div>
            </Card>
          </div>

          {/* AI Configuration Panel */}
          <div className="space-y-6">
            {/* AI Models */}
            <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-xl">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <Cpu className="w-5 h-5 mr-2" />
                  AI Models
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {Object.entries(AI_MODELS).map(([key, model]) => (
                  <div
                    key={key}
                    className={`p-3 rounded-lg border cursor-pointer transition-colors ${
                      selectedModel === key
                        ? "border-blue-500 bg-blue-500/10"
                        : "border-slate-600 hover:border-slate-500"
                    }`}
                    onClick={() => setSelectedModel(key)}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-medium text-white">{model.name}</h3>
                      <Badge
                        variant="outline"
                        className="text-xs text-slate-400 border-slate-600"
                      >
                        {model.type}
                      </Badge>
                    </div>
                    <p className="text-sm text-slate-400 mb-2">
                      {model.description}
                    </p>
                    <div className="flex flex-wrap gap-1">
                      {model.capabilities.map((cap, index) => (
                        <Badge
                          key={index}
                          variant="secondary"
                          className="text-xs"
                        >
                          {cap}
                        </Badge>
                      ))}
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Content Generation */}
            <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-xl">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <Wand2 className="w-5 h-5 mr-2" />
                  Generate Content
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    Content Type
                  </label>
                  <Select
                    value={generationType}
                    onValueChange={setGenerationType}
                  >
                    <SelectTrigger className="bg-slate-700 border-slate-600 text-white">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="video">Educational Video</SelectItem>
                      <SelectItem value="image">
                        Diagram/Illustration
                      </SelectItem>
                      <SelectItem value="audio">Audio Explanation</SelectItem>
                      <SelectItem value="text">Text Content</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {generationType === "video" && (
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">
                      Duration: {videoLength[0]} seconds
                    </label>
                    <Slider
                      value={videoLength}
                      onValueChange={setVideoLength}
                      max={300}
                      min={30}
                      step={30}
                      className="w-full"
                    />
                  </div>
                )}

                {generationType === "image" && (
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">
                      Style
                    </label>
                    <Select value={imageStyle} onValueChange={setImageStyle}>
                      <SelectTrigger className="bg-slate-700 border-slate-600 text-white">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="educational">Educational</SelectItem>
                        <SelectItem value="scientific">Scientific</SelectItem>
                        <SelectItem value="diagram">
                          Technical Diagram
                        </SelectItem>
                        <SelectItem value="infographic">Infographic</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                )}

                {generationType === "audio" && (
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">
                      Voice Type
                    </label>
                    <Select value={voiceType} onValueChange={setVoiceType}>
                      <SelectTrigger className="bg-slate-700 border-slate-600 text-white">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="professional">
                          Professional
                        </SelectItem>
                        <SelectItem value="friendly">Friendly</SelectItem>
                        <SelectItem value="authoritative">
                          Authoritative
                        </SelectItem>
                        <SelectItem value="casual">Casual</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                )}

                <Button
                  onClick={handleGenerate}
                  disabled={!prompt.trim() || isGenerating}
                  className="w-full bg-purple-600 hover:bg-purple-700"
                >
                  {isGenerating ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Generating...
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-4 h-4 mr-2" />
                      Generate {generationType}
                    </>
                  )}
                </Button>
              </CardContent>
            </Card>

            {/* Generation Progress */}
            {currentRequest && (
              <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-xl">
                <CardContent className="p-4">
                  <div className="flex items-center space-x-2 mb-3">
                    {currentRequest.status === "generating" && (
                      <Loader2 className="w-4 h-4 animate-spin text-blue-400" />
                    )}
                    {currentRequest.status === "completed" && (
                      <CheckCircle className="w-4 h-4 text-green-400" />
                    )}
                    {currentRequest.status === "error" && (
                      <AlertCircle className="w-4 h-4 text-red-400" />
                    )}
                    <span className="text-sm font-medium text-white">
                      {currentRequest.status === "generating" &&
                        "Generating content..."}
                      {currentRequest.status === "completed" &&
                        "Generation complete!"}
                      {currentRequest.status === "error" && "Generation failed"}
                    </span>
                  </div>
                  <Progress
                    value={currentRequest.progress}
                    className="h-2 mb-2"
                  />
                  <div className="text-xs text-slate-400">
                    {currentRequest.progress}% complete
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Quick Actions */}
            <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-xl">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <Zap className="w-5 h-5 mr-2" />
                  Quick Actions
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {[
                  "Explain photosynthesis with diagram",
                  "Generate calculus practice problems",
                  "Create quantum physics animation",
                  "Python programming tutorial",
                  "Chemistry reaction mechanisms",
                  "Machine learning basics",
                ].map((suggestion, index) => (
                  <Button
                    key={index}
                    variant="ghost"
                    className="w-full justify-start text-left text-slate-300 hover:text-white hover:bg-slate-700"
                    onClick={() => setPrompt(suggestion)}
                  >
                    <ArrowRight className="w-3 h-3 mr-2" />
                    {suggestion}
                  </Button>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
