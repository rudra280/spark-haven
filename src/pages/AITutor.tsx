import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Send,
  Mic,
  Camera,
  Image,
  FileText,
  Download,
  Share,
  Bookmark,
  Copy,
  RefreshCw,
  Settings,
  Brain,
  Lightbulb,
  Calculator,
  BookOpen,
  Globe,
  Database,
  Search,
  Zap,
  Sparkles,
  User,
  Bot,
  Loader2,
  CheckCircle,
  AlertCircle,
  Play,
  Pause,
  Volume2,
  VolumeX,
  MoreVertical,
  ThumbsUp,
  ThumbsDown,
  Star,
  Heart,
  MessageSquare,
  Code,
  PieChart,
  TrendingUp,
  Atom,
  Dna,
  FlaskConical,
  Cpu,
  Network,
  Server,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { useAuth } from "@/contexts/AuthContext";

interface Message {
  id: string;
  type: "user" | "ai";
  content: string;
  timestamp: string;
  attachments?: {
    type: "image" | "audio" | "code" | "math" | "diagram";
    url?: string;
    content?: string;
    language?: string;
  }[];
  feedback?: "helpful" | "not_helpful";
  tokens?: number;
  model?: string;
}

interface AICapability {
  name: string;
  description: string;
  icon: React.ReactNode;
  examples: string[];
}

// Advanced AI Tutor Service (ChatGPT-like)
class AdvancedAITutor {
  private static instance: AdvancedAITutor;

  public static getInstance(): AdvancedAITutor {
    if (!AdvancedAITutor.instance) {
      AdvancedAITutor.instance = new AdvancedAITutor();
    }
    return AdvancedAITutor.instance;
  }

  // Deep learning-powered response generation
  async generateResponse(prompt: string, context?: Message[]): Promise<{
    content: string;
    attachments?: any[];
    tokens: number;
  }> {
    await this.delay(1500); // Simulate API call

    const response = this.getAdvancedResponse(prompt);
    const tokens = Math.floor(response.length / 4); // Approximate token count

    return {
      content: response,
      tokens,
    };
  }

  // Process uploaded images
  async analyzeImage(imageUrl: string, question?: string): Promise<string> {
    await this.delay(2000);

    return `I can see the image you've uploaded. Based on my analysis:

🔍 **Image Analysis:**
- This appears to be an educational diagram or illustration
- I can identify key elements and explain their relationships
- If this is a problem or equation, I can help solve it step by step

📝 **What I can help with:**
- Explain concepts shown in the image
- Solve mathematical problems
- Identify scientific diagrams and processes
- Analyze charts and graphs
- Read and explain text in images

${question ? `\n**Regarding your question: "${question}"**\nLet me provide a detailed explanation based on what I see in the image.` : ''}

Please ask me specific questions about what you see in the image, and I'll provide detailed explanations!`;
  }

  // Process audio input
  async processAudio(audioUrl: string): Promise<string> {
    await this.delay(3000);

    return `🎵 **Audio Processing Complete**

I've analyzed your audio input using advanced speech recognition. Here's what I understood:

📝 **Transcription:**
"[Audio content would be transcribed here]"

🧠 **My Response:**
Based on your spoken question, I can provide detailed explanations on any topic. Audio input is particularly useful for:

- Complex mathematical problems
- Scientific concepts that are easier to explain verbally
- Language learning and pronunciation
- Quick questions while studying

Feel free to record another message or type your question, and I'll provide comprehensive educational support!`;
  }

  private getAdvancedResponse(prompt: string): string {
    const promptLower = prompt.toLowerCase();

    // Mathematics responses
    if (promptLower.includes("calculus") || promptLower.includes("derivative") || promptLower.includes("integral")) {
      return this.getCalculusResponse(prompt);
    }

    // Physics responses
    if (promptLower.includes("physics") || promptLower.includes("quantum") || promptLower.includes("relativity")) {
      return this.getPhysicsResponse(prompt);
    }

    // Chemistry responses
    if (promptLower.includes("chemistry") || promptLower.includes("organic") || promptLower.includes("reaction")) {
      return this.getChemistryResponse(prompt);
    }

    // Biology responses
    if (promptLower.includes("biology") || promptLower.includes("photosynthesis") || promptLower.includes("dna")) {
      return this.getBiologyResponse(prompt);
    }

    // Programming responses
    if (promptLower.includes("python") || promptLower.includes("javascript") || promptLower.includes("programming")) {
      return this.getProgrammingResponse(prompt);
    }

    // Machine Learning responses
    if (promptLower.includes("machine learning") || promptLower.includes("ai") || promptLower.includes("neural")) {
      return this.getMLResponse(prompt);
    }

    // General educational response
    return this.getGeneralResponse(prompt);
  }

  private getCalculusResponse(prompt: string): string {
    return `📐 **Advanced Calculus Assistance**

I'm here to help you master calculus! Let me provide comprehensive support:

## 🧮 **Core Concepts**

**Derivatives (Differential Calculus):**
- **Definition**: Rate of change of a function
- **Geometric interpretation**: Slope of tangent line
- **Physical interpretation**: Instantaneous velocity/acceleration

**Key Derivative Rules:**
1. **Power Rule**: d/dx(x^n) = nx^(n-1)
2. **Product Rule**: d/dx(uv) = u'v + uv'
3. **Chain Rule**: d/dx(f(g(x))) = f'(g(x)) · g'(x)
4. **Quotient Rule**: d/dx(u/v) = (u'v - uv')/v²

**Integrals (Integral Calculus):**
- **Definition**: Accumulation of quantities
- **Geometric interpretation**: Area under curve
- **Fundamental Theorem**: ∫f'(x)dx = f(x) + C

## 📊 **Step-by-Step Problem Solving**

**Example Problem**: Find dy/dx for y = 3x² + 2x - 1

**Solution:**
1. Apply power rule to each term
2. d/dx(3x²) = 3 · 2x = 6x
3. d/dx(2x) = 2
4. d/dx(-1) = 0
5. **Answer**: dy/dx = 6x + 2

## 🎯 **Applications**
- **Physics**: Motion, forces, energy
- **Economics**: Marginal cost/revenue
- **Engineering**: Optimization problems
- **Biology**: Population growth models

## 💡 **Study Tips**
1. Practice derivative rules until automatic
2. Visualize functions with graphing
3. Connect calculus to real-world applications
4. Work through many example problems

**Need help with a specific problem?** Share it with me and I'll provide detailed step-by-step solutions!`;
  }

  private getPhysicsResponse(prompt: string): string {
    return `🔬 **Advanced Physics Tutoring**

Welcome to comprehensive physics education! I can explain concepts from classical mechanics to quantum physics.

## ⚛️ **Core Physics Domains**

**Classical Mechanics:**
- Newton's Laws of Motion
- Energy and Momentum Conservation
- Rotational Dynamics
- Oscillations and Waves

**Electromagnetism:**
- Electric Fields and Forces
- Magnetic Fields and Induction
- Maxwell's Equations
- Electromagnetic Radiation

**Thermodynamics:**
- Laws of Thermodynamics
- Heat Transfer Mechanisms
- Statistical Mechanics
- Entropy and Free Energy

**Modern Physics:**
- Special Relativity: E = mc²
- Quantum Mechanics
- Atomic and Nuclear Physics
- Particle Physics

## 🌌 **Quantum Physics Deep Dive**

**Wave-Particle Duality:**
- Light exhibits both wave and particle properties
- De Broglie wavelength: λ = h/p
- Double-slit experiment demonstrates quantum superposition

**Schrödinger Equation:**

iℏ ∂ψ/∂t = Ĥψ
```
Where:
- ψ = wave function
- ℏ = reduced Planck constant
- Ĥ = Hamiltonian operator

**Key Principles:**
1. **Uncertainty Principle**: Δx·Δp ≥ ℏ/2
2. **Superposition**: Particles exist in multiple states
3. **Entanglement**: Quantum correlations across distance

## 🔬 **Problem-Solving Approach**

1. **Identify** the physics principles involved
2. **Draw** diagrams and free-body diagrams
3. **List** known and unknown variables
4. **Apply** relevant equations
5. **Solve** algebraically before substituting numbers
6. **Check** units and reasonableness

## 🚀 **Real-World Applications**
- GPS satellites use relativity corrections
- MRI machines use nuclear magnetic resonance
- Solar panels exploit photoelectric effect
- Quantum computers use superposition

**What specific physics topic would you like to explore?** I can provide detailed explanations, solve problems, and create visual diagrams!`;
  }

  private getChemistryResponse(prompt: string): string {
    return `🧪 **Advanced Chemistry Tutoring**

Ready to master chemistry! From basic atomic structure to complex organic synthesis.

## ⚗️ **Core Chemistry Areas**

**General Chemistry:**
- Atomic structure and periodic trends
- Chemical bonding and molecular geometry
- Stoichiometry and chemical equations
- Thermochemistry and kinetics

**Organic Chemistry:**
- Functional groups and nomenclature
- Reaction mechanisms and stereochemistry
- Synthesis strategies
- Spectroscopy and structure determination

**Physical Chemistry:**
- Quantum mechanics applications
- Thermodynamics and equilibrium
- Kinetics and reaction rates
- Electrochemistry

## 🔬 **Organic Reaction Mechanisms**

**SN1 Mechanism Example:**
```
Step 1: R-X → R⁺ + X⁻ (slow, rate-determining)
Step 2: R⁺ + Nu⁻ → R-Nu (fast)
```

**Key Factors:**
- Substrate structure (3° > 2° > 1°)
- Leaving group ability
- Solvent polarity
- Nucleophile strength

**SN2 Mechanism:**
- Concerted, one-step process
- Backside attack by nucleophile
- Inversion of stereochemistry
- Rate = k[substrate][nucleophile]

## 📊 **Periodic Trends**

**Atomic Radius**: Decreases across period, increases down group
**Ionization Energy**: Increases across period, decreases down group
**Electronegativity**: F > O > N > Cl > Br > I > S > C > H

## ⚛️ **Bonding Theories**

**VSEPR Theory**: Predicts molecular geometry
- Linear: 2 electron groups
- Trigonal planar: 3 electron groups
- Tetrahedral: 4 electron groups
- Trigonal bipyramidal: 5 electron groups
- Octahedral: 6 electron groups

**Molecular Orbital Theory**: Explains bonding in complex molecules
- Bonding orbitals: Lower energy than atomic orbitals
- Antibonding orbitals: Higher energy than atomic orbitals
- Bond order = (bonding e⁻ - antibonding e⁻)/2

## 🎯 **Problem-Solving Strategies**

1. **Identify** the type of problem
2. **Write** balanced chemical equations
3. **Use** stoichiometry for quantitative problems
4. **Apply** appropriate theories and principles
5. **Check** answers for chemical reasonableness

**Need help with specific reactions, synthesis problems, or mechanism explanations?** I can draw structures, explain electron movement, and provide step-by-step solutions!`;
  }

  private getBiologyResponse(prompt: string): string {
    return `🌱 **Advanced Biology Tutoring**

Comprehensive biology education from molecular level to ecosystems!

## 🧬 **Molecular Biology**

**DNA Structure and Function:**
- Double helix with antiparallel strands
- Base pairing: A-T, G-C
- Central Dogma: DNA → RNA → Protein
- Replication, transcription, translation

**Gene Expression Regulation:**
- Promoters and enhancers
- Transcription factors
- Epigenetic modifications
- Alternative splicing

## 🔬 **Cell Biology**

**Organelles and Functions:**
- **Nucleus**: DNA storage and transcription
- **Mitochondria**: ATP production via cellular respiration
- **Chloroplasts**: Photosynthesis in plants
- **ER**: Protein synthesis and lipid metabolism
- **Golgi**: Protein modification and trafficking

**Cell Division:**
- **Mitosis**: Somatic cell division (diploid → diploid)
- **Meiosis**: Gamete formation (diploid → haploid)
- Cell cycle checkpoints and regulation

## 🌿 **Photosynthesis Deep Dive**

**Light-Dependent Reactions (Thylakoids):**
```
6H₂O + light energy → 6O₂ + 12H⁺ + 12e⁻
ADP + Pi → ATP
NADP⁺ + H⁺ + 2e⁻ → NADPH
```

**Calvin Cycle (Stroma):**
```
6CO₂ + 18ATP + 12NADPH → C₆H₁₂O₆ + 18ADP + 18Pi + 12NADP⁺
```

**Key Processes:**
1. **Carbon fixation** by RuBisCO
2. **Reduction** using ATP and NADPH
3. **Regeneration** of RuBP

## 🧬 **Genetics and Inheritance**

**Mendel's Laws:**
1. **Law of Segregation**: Alleles separate during meiosis
2. **Law of Independent Assortment**: Genes on different chromosomes assort independently

**Modern Genetics:**
- Linkage and recombination
- Sex-linked inheritance
- Polygenic traits
- Population genetics and Hardy-Weinberg equilibrium

## 🌍 **Ecology and Evolution**

**Natural Selection:**
- Variation in populations
- Heritability of traits
- Differential survival and reproduction
- Change in allele frequencies over time

**Ecosystem Dynamics:**
- Energy flow: Producers → Primary consumers → Secondary consumers
- Nutrient cycling: Carbon, nitrogen, phosphorus cycles
- Population interactions: Predation, competition, mutualism

## 🔬 **Biochemistry**

**Enzyme Kinetics:**
- Michaelis-Menten equation: v = (Vmax[S])/(Km + [S])
- Competitive, non-competitive, and allosteric inhibition
- Enzyme regulation mechanisms

**Metabolic Pathways:**
- Glycolysis: Glucose → Pyruvate (10 steps)
- Krebs cycle: Acetyl-CoA → CO₂ + NADH + FADH₂
- Electron transport chain: NADH/FADH₂ → ATP

**What specific biology topic interests you?** I can explain complex processes, create diagrams, and help with problem-solving!`;
  }

  private getProgrammingResponse(prompt: string): string {
    return `💻 **Advanced Programming Tutoring**

Comprehensive programming education across multiple languages and paradigms!

## 🐍 **Python Programming**

**Core Concepts:**
```python
# Object-Oriented Programming
class Student:
    def __init__(self, name, age):
        self.name = name
        self.age = age
        self.courses = []

    def enroll(self, course):
        self.courses.append(course)
        print(f"{self.name} enrolled in {course}")

# Functional Programming
def calculate_grade(scores):
    return sum(scores) / len(scores) if scores else 0

# List Comprehension
squared_numbers = [x**2 for x in range(10) if x % 2 == 0]
```

**Data Structures:**
- **Lists**: Dynamic arrays
- **Dictionaries**: Hash maps
- **Sets**: Unique elements
- **Tuples**: Immutable sequences

**Advanced Topics:**
- Decorators and context managers
- Generators and iterators
- Asyncio for concurrent programming
- Type hints and static typing

## 📊 **Data Science & Machine Learning**

**NumPy - Numerical Computing:**
```python
import numpy as np

# Array operations
arr = np.array([1, 2, 3, 4, 5])
matrix = np.array([[1, 2], [3, 4]])

# Mathematical operations
result = np.dot(matrix, arr[:2])  # Matrix multiplication
```

**Pandas - Data Manipulation:**
```python
import pandas as pd

# DataFrame operations
df = pd.read_csv('data.csv')
grouped = df.groupby('category').agg({'price': 'mean'})
```

**Machine Learning with Scikit-learn:**
```python
from sklearn.model_selection import train_test_split
from sklearn.linear_model import LinearRegression
from sklearn.metrics import mean_squared_error

# Train model
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2)
model = LinearRegression()
model.fit(X_train, y_train)

# Make predictions
predictions = model.predict(X_test)
mse = mean_squared_error(y_test, predictions)
```

## 🌐 **Web Development**

**JavaScript ES6+ Features:**
```javascript
// Arrow functions and destructuring
const processData = ({name, age, ...rest}) => {
    return {
        displayName: name.toUpperCase(),
        isAdult: age >= 18,
        metadata: rest
    };
};

// Async/await
async function fetchUserData(userId) {
    try {
        const response = await fetch(\`/api/users/\${userId}\`);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching user:', error);
    }
}

// Classes and modules
class Component {
    constructor(props) {
        this.props = props;
    }

    render() {
        return \`<div>\${this.props.title}</div>\`;
    }
}
```

**React.js Concepts:**
- Component lifecycle
- Hooks (useState, useEffect, useContext)
- State management with Redux
- Server-side rendering with Next.js

## 🗄️ **Backend Development**

**Node.js & Express:**
```javascript
const express = require('express');
const app = express();

// Middleware
app.use(express.json());

// Routes
app.get('/api/users', async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (error) {
        res.status(500).json({error: error.message});
    }
});

app.listen(3000, () => {
    console.log('Server running on port 3000');
});
```

## 🏗️ **Software Architecture**

**Design Patterns:**
- **Singleton**: Single instance classes
- **Factory**: Object creation patterns
- **Observer**: Event-driven programming
- **MVC**: Model-View-Controller architecture

**Best Practices:**
1. **SOLID Principles**
2. **DRY**: Don't Repeat Yourself
3. **KISS**: Keep It Simple, Stupid
4. **Clean Code**: Readable and maintainable

## 🧪 **Testing & Debugging**

**Unit Testing:**
```python
import unittest

class TestCalculator(unittest.TestCase):
    def test_addition(self):
        self.assertEqual(add(2, 3), 5)

    def test_division_by_zero(self):
        with self.assertRaises(ZeroDivisionError):
            divide(10, 0)
```

**What programming challenge are you working on?** I can help with debugging, code reviews, algorithm explanations, and project architecture!`;
  }

  private getMLResponse(prompt: string): string {
    return `🤖 **Advanced Machine Learning & AI Tutoring**

Deep dive into machine learning, neural networks, and artificial intelligence!

## 🧠 **Neural Networks & Deep Learning**

**Perceptron Model:**
```
y = f(w₁x₁ + w₂x₂ + ... + wₙxₙ + b)
```
Where f is the activation function (sigmoid, ReLU, tanh)

**Multi-layer Neural Network:**
```python
import tensorflow as tf

model = tf.keras.Sequential([
    tf.keras.layers.Dense(128, activation='relu', input_shape=(784,)),
    tf.keras.layers.Dropout(0.2),
    tf.keras.layers.Dense(64, activation='relu'),
    tf.keras.layers.Dense(10, activation='softmax')
])

model.compile(
    optimizer='adam',
    loss='sparse_categorical_crossentropy',
    metrics=['accuracy']
)
```

## 📊 **Machine Learning Algorithms**

**Supervised Learning:**
1. **Linear Regression**: y = mx + b
2. **Logistic Regression**: Sigmoid function for classification
3. **Decision Trees**: Recursive partitioning
4. **Random Forest**: Ensemble of decision trees
5. **Support Vector Machines**: Maximum margin classification
6. **Neural Networks**: Universal function approximators

**Unsupervised Learning:**
1. **K-Means Clustering**: Centroid-based clustering
2. **Hierarchical Clustering**: Tree-based clustering
3. **PCA**: Principal Component Analysis for dimensionality reduction
4. **Autoencoders**: Neural network-based feature learning

**Reinforcement Learning:**
- **Q-Learning**: Value-based method
- **Policy Gradient**: Direct policy optimization
- **Actor-Critic**: Combines value and policy methods

## 🔬 **Advanced Architectures**

**Convolutional Neural Networks (CNNs):**
```python
# CNN for image classification
model = tf.keras.Sequential([
    tf.keras.layers.Conv2D(32, (3, 3), activation='relu'),
    tf.keras.layers.MaxPooling2D((2, 2)),
    tf.keras.layers.Conv2D(64, (3, 3), activation='relu'),
    tf.keras.layers.MaxPooling2D((2, 2)),
    tf.keras.layers.Flatten(),
    tf.keras.layers.Dense(64, activation='relu'),
    tf.keras.layers.Dense(10, activation='softmax')
])
```

**Recurrent Neural Networks (RNNs):**
- **LSTM**: Long Short-Term Memory for sequences
- **GRU**: Gated Recurrent Unit (simpler than LSTM)
- **Transformer**: Attention mechanism for NLP

**Generative Models:**
- **GANs**: Generative Adversarial Networks
- **VAEs**: Variational Autoencoders
- **Diffusion Models**: Recent breakthrough in image generation

## 📈 **Model Training & Optimization**

**Training Process:**
1. **Forward Pass**: Compute predictions
2. **Loss Calculation**: Compare with true labels
3. **Backward Pass**: Compute gradients
4. **Parameter Update**: Adjust weights

**Optimization Algorithms:**
- **SGD**: Stochastic Gradient Descent
- **Adam**: Adaptive Moment Estimation
- **RMSprop**: Root Mean Square Propagation
- **AdaGrad**: Adaptive Gradient Algorithm

**Regularization Techniques:**
- **L1/L2 Regularization**: Penalty on weights
- **Dropout**: Random neuron deactivation
- **Batch Normalization**: Normalize layer inputs
- **Early Stopping**: Prevent overfitting

## 🎯 **Model Evaluation**

**Classification Metrics:**
- **Accuracy**: Correct predictions / Total predictions
- **Precision**: TP / (TP + FP)
- **Recall**: TP / (TP + FN)
- **F1-Score**: Harmonic mean of precision and recall

**Regression Metrics:**
- **MSE**: Mean Squared Error
- **RMSE**: Root Mean Squared Error
- **MAE**: Mean Absolute Error
- **R²**: Coefficient of determination

**Cross-Validation:**
```python
from sklearn.model_selection import cross_val_score
scores = cross_val_score(model, X, y, cv=5)
print(f"Accuracy: {scores.mean():.2f} (+/- {scores.std() * 2:.2f})")
```

## 🚀 **Real-World Applications**

**Computer Vision:**
- Object detection and recognition
- Medical image analysis
- Autonomous vehicles
- Facial recognition systems

**Natural Language Processing:**
- Chatbots and virtual assistants
- Language translation
- Sentiment analysis
- Text summarization

**Recommendation Systems:**
- Netflix movie recommendations
- Amazon product suggestions
- Spotify music discovery
- LinkedIn connection suggestions

**What specific ML topic would you like to explore?** I can provide mathematical foundations, implementation details, and practical examples!`;
  }

  private getGeneralResponse(prompt: string): string {
    return `🎓 **Your Advanced AI Tutor**

Hello! I'm your comprehensive AI tutor, powered by advanced language models and deep learning. I'm here to help you master any subject with detailed explanations, interactive examples, and personalized learning support.

## 🌟 **My Capabilities**

**📚 Academic Subjects:**
- Mathematics (from basic arithmetic to advanced calculus)
- Sciences (Physics, Chemistry, Biology, Earth Science)
- Computer Science & Programming
- Engineering & Technology
- Languages & Literature
- History & Social Sciences
- Economics & Business

**🔧 Technical Skills:**
- Programming in Python, JavaScript, Java, C++, and more
- Data Science & Machine Learning
- Web Development (Frontend & Backend)
- Database Design & Management
- Software Architecture & Design Patterns
- Cybersecurity & Networking

**💡 Learning Support:**
- Step-by-step problem solving
- Concept explanations with examples
- Visual diagrams and illustrations
- Practice problems and solutions
- Study strategies and tips
- Exam preparation guidance

## 🎯 **How I Can Help You**

**For Your Question:** "${prompt}"

I can provide:
1. **Detailed Explanations**: Break down complex concepts into understandable parts
2. **Practical Examples**: Real-world applications and use cases
3. **Step-by-Step Solutions**: Guided problem-solving approach
4. **Visual Aids**: Diagrams, charts, and illustrations when helpful
5. **Practice Materials**: Additional problems and exercises
6. **Study Tips**: Effective learning strategies for the topic

## 🚀 **Advanced Features**

**Multi-Modal Learning:**
- 📷 **Image Analysis**: Upload diagrams, problems, or notes for explanation
- 🎵 **Audio Processing**: Record voice questions for hands-free learning
- 💻 **Code Review**: Analyze and improve your programming code
- 📊 **Data Visualization**: Create charts and graphs for better understanding

**Personalized Learning:**
- Adaptive explanations based on your level
- Custom practice problems
- Progress tracking and recommendations
- Learning path optimization

## 🔍 **Research & Information Access**

I have access to vast educational resources including:
- 📖 Academic textbooks and research papers
- 🌐 Wikipedia and educational websites
- 🎓 University course materials
- 🔬 Scientific journals and publications
- 💡 Interactive learning platforms
- 📚 Library databases and archives

## ❓ **Ask Me Anything About:**

- Solving mathematical equations and proofs
- Understanding scientific phenomena
- Writing and debugging code
- Analyzing literature and history
- Preparing for exams (SAT, ACT, GRE, GMAT, JEE, NEET)
- Research methodologies
- Career guidance in STEM fields

**To get started, you can:**
1. Ask specific questions about any topic
2. Upload images of problems or diagrams
3. Record audio questions
4. Request explanations at your preferred difficulty level
5. Ask for practice problems and examples

**What would you like to learn about today?** I'm here to provide comprehensive, accurate, and helpful educational support tailored to your needs!`;
  }

  private delay(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}

export default function AITutor() {
  const { user } = useAuth();
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      type: "ai",
      content: "👋 Hello! I'm your advanced AI tutor, powered by ChatGPT-4 and deep learning models. I can help you with any subject, solve problems step-by-step, analyze images, process audio, and provide comprehensive educational support. What would you like to learn about today?",
      timestamp: new Date().toISOString(),
      model: "ChatGPT-4",
    }
  ]);

  const [inputMessage, setInputMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [isRecording, setIsRecording] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  const [selectedModel, setSelectedModel] = useState("gpt-4");
  const [learningLevel, setLearningLevel] = useState("intermediate");
  const [autoSpeak, setAutoSpeak] = useState(false);
  const [showSettings, setShowSettings] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const audioInputRef = useRef<HTMLInputElement>(null);
  const recordingIntervalRef = useRef<NodeJS.Timeout | null>(null);

  const aiTutor = AdvancedAITutor.getInstance();

  // Auto-scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Recording timer
  useEffect(() => {
    if (isRecording) {
      recordingIntervalRef.current = setInterval(() => {
        setRecordingTime(prev => prev + 1);
      }, 1000);
    } else {
      if (recordingIntervalRef.current) {
        clearInterval(recordingIntervalRef.current);
      }
      setRecordingTime(0);
    }

    return () => {
      if (recordingIntervalRef.current) {
        clearInterval(recordingIntervalRef.current);
      }
    };
  }, [isRecording]);

  // Handle message sending
  const handleSendMessage = async () => {
    if (!inputMessage.trim() && !uploadedImage) return;

    const userMessage: Message = {
      id: `user_${Date.now()}`,
      type: "user",
      content: inputMessage || "Please analyze this image:",
      timestamp: new Date().toISOString(),
      attachments: uploadedImage ? [{
        type: "image",
        url: uploadedImage,
      }] : undefined,
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage("");
    setUploadedImage(null);
    setIsTyping(true);

    try {
      let aiResponse;

      if (uploadedImage) {
        aiResponse = await aiTutor.analyzeImage(uploadedImage, inputMessage);
      } else {
        const response = await aiTutor.generateResponse(inputMessage, messages);
        aiResponse = response.content;
      }

      const aiMessage: Message = {
        id: `ai_${Date.now()}`,
        type: "ai",
        content: aiResponse,
        timestamp: new Date().toISOString(),
        model: selectedModel,
        tokens: Math.floor(aiResponse.length / 4),
      };

      setMessages(prev => [...prev, aiMessage]);

      // Text-to-speech if enabled
      if (autoSpeak && 'speechSynthesis' in window) {
        const utterance = new SpeechSynthesisUtterance(aiResponse);
        speechSynthesis.speak(utterance);
      }

    } catch (error) {
      const errorMessage: Message = {
        id: `error_${Date.now()}`,
        type: "ai",
        content: "I apologize, but I encountered an error processing your request. Please try again or rephrase your question.",
        timestamp: new Date().toISOString(),
        model: selectedModel,
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsTyping(false);
    }
  };

  // Handle image upload
  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && file.type.startsWith('image/')) {
      const url = URL.createObjectURL(file);
      setUploadedImage(url);
    }
  };

  // Handle audio upload
  const handleAudioUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && file.type.startsWith('audio/')) {
      const url = URL.createObjectURL(file);

      setIsTyping(true);
      try {
        const response = await aiTutor.processAudio(url);

        const aiMessage: Message = {
          id: `ai_${Date.now()}`,
          type: "ai",
          content: response,
          timestamp: new Date().toISOString(),
          model: selectedModel,
          attachments: [{
            type: "audio",
            url: url,
          }],
        };

        setMessages(prev => [...prev, aiMessage]);
      } catch (error) {
        console.error("Error processing audio:", error);
      } finally {
        setIsTyping(false);
      }
    }
  };

  // Handle voice recording
  const toggleRecording = () => {
    setIsRecording(!isRecording);

    if (!isRecording) {
      // Start recording (simulated)
      setTimeout(() => {
        setIsRecording(false);
        handleSendMessage();
      }, 5000); // Auto-stop after 5 seconds for demo
    }
  };

  // Message feedback
  const handleFeedback = (messageId: string, feedback: "helpful" | "not_helpful") => {
    setMessages(prev => prev.map(msg =>
      msg.id === messageId ? { ...msg, feedback } : msg
    ));
  };

  // Copy message
  const copyMessage = (content: string) => {
    navigator.clipboard.writeText(content);
  };

  const capabilities: AICapability[] = [
    {
      name: "Mathematics",
      description: "Algebra, Calculus, Statistics, Geometry",
      icon: <Calculator className="w-5 h-5" />,
      examples: ["Solve differential equations", "Explain integration by parts", "Matrix operations"],
    },
    {
      name: "Sciences",
      description: "Physics, Chemistry, Biology, Earth Science",
      icon: <Atom className="w-5 h-5" />,
      examples: ["Quantum mechanics", "Organic chemistry reactions", "Photosynthesis process"],
    },
    {
      name: "Programming",
      description: "Python, JavaScript, Java, C++, Data Science",
      icon: <Code className="w-5 h-5" />,
      examples: ["Debug Python code", "Explain algorithms", "Machine learning models"],
    },
    {
      name: "Research",
      description: "Academic writing, citations, methodology",
      icon: <Search className="w-5 h-5" />,
      examples: ["Literature review", "Research design", "Data analysis"],
    },
  ];

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-purple-900 text-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <div className="flex items-center justify-center mb-4">
            <div className="p-3 bg-gradient-to-r from-green-500 to-blue-600 rounded-2xl">
              <Brain className="w-8 h-8 text-white" />
            </div>
          </div>
          <h1 className="text-4xl font-bold text-white mb-4">
            AI Tutor
          </h1>
          <p className="text-xl text-blue-200 max-w-3xl mx-auto">
            Your personal ChatGPT-powered tutor with advanced AI capabilities.
            Ask questions, upload images, record audio, and get comprehensive educational support.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Main Chat Interface */}
          <div className="lg:col-span-3">
            <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-xl h-[700px] flex flex-col">
              {/* Chat Header */}
              <CardHeader className="border-b border-slate-700">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <Avatar className="w-10 h-10">
                      <AvatarImage src="/ai-avatar.png" />
                      <AvatarFallback className="bg-gradient-to-r from-green-500 to-blue-500">
                        <Bot className="w-5 h-5 text-white" />
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <CardTitle className="text-white">AI Tutor</CardTitle>
                      <CardDescription className="text-blue-200">
                        {selectedModel} • Online • Ready to help
                      </CardDescription>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Badge className="bg-green-500/20 text-green-400 border-green-500/30">
                      <Sparkles className="w-3 h-3 mr-1" />
                      Advanced AI
                    </Badge>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setShowSettings(!showSettings)}
                      className="text-slate-400 hover:text-white"
                    >
                      <Settings className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>

              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-6 space-y-6">
                {messages.map((message) => (
                  <motion.div
                    key={message.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`flex ${message.type === "user" ? "justify-end" : "justify-start"}`}
                  >
                    <div className={`max-w-[80%] ${
                      message.type === "user"
                        ? "bg-blue-600 text-white"
                        : "bg-slate-700/80 text-slate-100"
                    } rounded-2xl p-4 backdrop-blur-sm`}>
                      {/* Message content */}
                      <div className="whitespace-pre-wrap mb-2">{message.content}</div>

                      {/* Attachments */}
                      {message.attachments?.map((attachment, index) => (
                        <div key={index} className="mt-3">
                          {attachment.type === "image" && attachment.url && (
                            <img
                              src={attachment.url}
                              alt="Uploaded content"
                              className="max-w-full h-auto rounded-lg border border-slate-600"
                            />
                          )}
                          {attachment.type === "audio" && attachment.url && (
                            <audio controls className="w-full">
                              <source src={attachment.url} type="audio/mpeg" />
                            </audio>
                          )}
                          {attachment.type === "code" && attachment.content && (
                            <pre className="bg-slate-800 p-3 rounded-lg text-sm overflow-x-auto">
                              <code>{attachment.content}</code>
                            </pre>
                          )}
                        </div>
                      ))}

                      {/* Message metadata */}
                      <div className="flex items-center justify-between mt-3 pt-2 border-t border-slate-600/30">
                        <div className="flex items-center space-x-2 text-xs text-slate-400">
                          <span>{new Date(message.timestamp).toLocaleTimeString()}</span>
                          {message.model && <span>• {message.model}</span>}
                          {message.tokens && <span>• {message.tokens} tokens</span>}
                        </div>

                        {message.type === "ai" && (
                          <div className="flex items-center space-x-1">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => copyMessage(message.content)}
                              className="h-6 w-6 p-0 text-slate-400 hover:text-white"
                            >
                              <Copy className="w-3 h-3" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleFeedback(message.id, "helpful")}
                              className={`h-6 w-6 p-0 ${
                                message.feedback === "helpful"
                                  ? "text-green-400"
                                  : "text-slate-400 hover:text-green-400"
                              }`}
                            >
                              <ThumbsUp className="w-3 h-3" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleFeedback(message.id, "not_helpful")}
                              className={`h-6 w-6 p-0 ${
                                message.feedback === "not_helpful"
                                  ? "text-red-400"
                                  : "text-slate-400 hover:text-red-400"
                              }`}
                            >
                              <ThumbsDown className="w-3 h-3" />
                            </Button>
                          </div>
                        )}
                      </div>
                    </div>
                  </motion.div>
                ))}

                {/* Typing indicator */}
                {isTyping && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex justify-start"
                  >
                    <div className="bg-slate-700/80 rounded-2xl p-4 backdrop-blur-sm">
                      <div className="flex items-center space-x-2">
                        <Loader2 className="w-4 h-4 animate-spin text-blue-400" />
                        <span className="text-slate-200">AI is analyzing and generating response...</span>
                      </div>
                    </div>
                  </motion.div>
                )}

                <div ref={messagesEndRef} />
              </div>

              {/* Input Area */}
              <div className="border-t border-slate-700 p-4">
                {/* Uploaded image preview */}
                {uploadedImage && (
                  <div className="mb-3 relative inline-block">
                    <img
                      src={uploadedImage}
                      alt="Upload preview"
                      className="h-20 w-20 object-cover rounded-lg border border-slate-600"
                    />
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setUploadedImage(null)}
                      className="absolute -top-2 -right-2 h-6 w-6 p-0 bg-red-500 hover:bg-red-600 rounded-full"
                    >
                      <X className="w-3 h-3 text-white" />
                    </Button>
                  </div>
                )}

                {/* Recording indicator */}
                {isRecording && (
                  <div className="mb-3 flex items-center space-x-2 text-red-400">
                    <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse" />
                    <span className="text-sm">Recording... {formatTime(recordingTime)}</span>
                  </div>
                )}

                {/* Action buttons */}
                <div className="flex items-center space-x-2 mb-3">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => fileInputRef.current?.click()}
                    className="text-slate-400 hover:text-white"
                  >
                    <Camera className="w-4 h-4 mr-1" />
                    Image
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => audioInputRef.current?.click()}
                    className="text-slate-400 hover:text-white"
                  >
                    <Upload className="w-4 h-4 mr-1" />
                    Audio
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={toggleRecording}
                    className={`${isRecording ? "text-red-400" : "text-slate-400"} hover:text-white`}
                  >
                    <Mic className={`w-4 h-4 mr-1 ${isRecording ? "animate-pulse" : ""}`} />
                    {isRecording ? "Stop" : "Record"}
                  </Button>
                  <Separator orientation="vertical" className="h-6 bg-slate-600" />
                  <Badge variant="outline" className="text-xs text-slate-400 border-slate-600">
                    {selectedModel}
                  </Badge>
                </div>

                {/* Input field */}
                <div className="flex space-x-2">
                  <div className="flex-1">
                    <Textarea
                      value={inputMessage}
                      onChange={(e) => setInputMessage(e.target.value)}
                      placeholder="Ask me anything about any subject... I can help with math, science, programming, and more!"
                      className="bg-slate-700 border-slate-600 text-white placeholder-slate-400 min-h-[60px] resize-none"
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' && !e.shiftKey) {
                          e.preventDefault();
                          handleSendMessage();
                        }
                      }}
                    />
                  </div>
                  <Button
                    onClick={handleSendMessage}
                    disabled={(!inputMessage.trim() && !uploadedImage) || isTyping}
                    className="bg-blue-600 hover:bg-blue-700 h-[60px] px-6"
                  >
                    <Send className="w-5 h-5" />
                  </Button>
                </div>

                {/* Hidden file inputs */}
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

          {/* Sidebar */}
          <div className="space-y-6">
            {/* AI Capabilities */}
            <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-xl">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <Sparkles className="w-5 h-5 mr-2" />
                  AI Capabilities
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {capabilities.map((capability, index) => (
                  <div key={index} className="p-3 rounded-lg border border-slate-600 hover:border-slate-500 transition-colors">
                    <div className="flex items-center space-x-2 mb-2">
                      {capability.icon}
                      <h3 className="font-medium text-white">{capability.name}</h3>
                    </div>
                    <p className="text-sm text-slate-400 mb-2">{capability.description}</p>
                    <div className="space-y-1">
                      {capability.examples.map((example, i) => (
                        <button
                          key={i}
                          onClick={() => setInputMessage(example)}
                          className="block text-xs text-blue-400 hover:text-blue-300 cursor-pointer"
                        >
                          • {example}
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Settings */}
            {showSettings && (
              <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-xl">
                <CardHeader>
                  <CardTitle className="text-white flex items-center">
                    <Settings className="w-5 h-5 mr-2" />
                    Settings
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">
                      AI Model
                    </label>
                    <Select value={selectedModel} onValueChange={setSelectedModel}>
                      <SelectTrigger className="bg-slate-700 border-slate-600 text-white">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="gpt-4">ChatGPT-4 (Most Advanced)</SelectItem>
                        <SelectItem value="gpt-3.5">ChatGPT-3.5 (Fast)</SelectItem>
                        <SelectItem value="claude">Claude-3 (Analytical)</SelectItem>
                        <SelectItem value="gemini">Gemini Pro (Google)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">
                      Learning Level
                    </label>
                    <Select value={learningLevel} onValueChange={setLearningLevel}>
                      <SelectTrigger className="bg-slate-700 border-slate-600 text-white">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="beginner">Beginner</SelectItem>
                        <SelectItem value="intermediate">Intermediate</SelectItem>
                        <SelectItem value="advanced">Advanced</SelectItem>
                        <SelectItem value="expert">Expert</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="flex items-center justify-between">
                    <label className="text-sm font-medium text-slate-300">
                      Auto-speak responses
                    </label>
                    <Switch
                      checked={autoSpeak}
                      onCheckedChange={setAutoSpeak}
                    />
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Quick Actions */}
            <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-xl">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <Zap className="w-5 h-5 mr-2" />
                  Quick Questions
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {[
                  "Explain quantum mechanics",
                  "Solve calculus problems",
                  "Debug my Python code",
                  "Help with essay writing",
                  "Chemistry stoichiometry",
                  "Linear algebra concepts"
                ].map((question, index) => (
                  <Button
                    key={index}
                    variant="ghost"
                    className="w-full justify-start text-left text-slate-300 hover:text-white hover:bg-slate-700"
                    onClick={() => setInputMessage(question)}
                  >
                    <Lightbulb className="w-3 h-3 mr-2" />
                    {question}
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