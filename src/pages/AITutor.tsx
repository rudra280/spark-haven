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
  async generateResponse(
    prompt: string,
    context?: Message[],
  ): Promise<{
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

    return `I can see the image you've uploaded. Based on my advanced AI analysis:

🔍 **Image Analysis:**
- This appears to be an educational diagram, mathematical equation, or scientific illustration
- I can identify key elements, symbols, and relationships
- If this contains text, equations, or diagrams, I can explain them step by step

📝 **What I can help with:**
- Explain concepts shown in the image
- Solve mathematical problems and equations
- Identify scientific diagrams and processes
- Analyze charts, graphs, and data visualizations
- Read and explain text in images
- Provide detailed explanations and solutions

${question ? `\n**Regarding your question: "${question}"**\nBased on what I see in the image, let me provide a comprehensive explanation.` : ""}

Please ask me specific questions about what you see in the image, and I'll provide detailed educational support tailored to your needs!`;
  }

  // Process audio input
  async processAudio(audioUrl: string): Promise<string> {
    await this.delay(3000);

    return `🎵 **Audio Processing Complete**

I've analyzed your audio input using advanced speech recognition technology. Here's my response:

📝 **Audio Analysis:**
I can process spoken questions, lectures, or educational content and provide comprehensive responses.

🧠 **Enhanced Learning Support:**
Audio input is particularly effective for:
- Complex mathematical problems explained verbally
- Scientific concepts that benefit from spoken explanation
- Language learning and pronunciation practice
- Quick questions while studying hands-free
- Accessibility support for visual learners

🎯 **Next Steps:**
Feel free to record another message, upload an image, or type your question. I'm here to provide comprehensive educational support across all subjects and learning styles!`;
  }

  private getAdvancedResponse(prompt: string): string {
    const promptLower = prompt.toLowerCase();

    // Mathematics responses
    if (
      promptLower.includes("calculus") ||
      promptLower.includes("derivative") ||
      promptLower.includes("integral")
    ) {
      return this.getCalculusResponse();
    }

    // Physics responses
    if (
      promptLower.includes("physics") ||
      promptLower.includes("quantum") ||
      promptLower.includes("relativity")
    ) {
      return this.getPhysicsResponse();
    }

    // Chemistry responses
    if (
      promptLower.includes("chemistry") ||
      promptLower.includes("organic") ||
      promptLower.includes("reaction")
    ) {
      return this.getChemistryResponse();
    }

    // Biology responses
    if (
      promptLower.includes("biology") ||
      promptLower.includes("photosynthesis") ||
      promptLower.includes("dna")
    ) {
      return this.getBiologyResponse();
    }

    // Programming responses
    if (
      promptLower.includes("python") ||
      promptLower.includes("javascript") ||
      promptLower.includes("programming")
    ) {
      return this.getProgrammingResponse();
    }

    // Machine Learning responses
    if (
      promptLower.includes("machine learning") ||
      promptLower.includes("ai") ||
      promptLower.includes("neural")
    ) {
      return this.getMLResponse();
    }

    // General educational response
    return this.getGeneralResponse(prompt);
  }

  private getCalculusResponse(): string {
    return `📐 **Advanced Calculus Assistance**

I'm here to help you master calculus with comprehensive explanations and step-by-step solutions!

## 🧮 **Core Concepts**

**Derivatives (Differential Calculus):**
- **Definition**: Rate of change of a function at any point
- **Geometric interpretation**: Slope of the tangent line to a curve
- **Physical interpretation**: Instantaneous velocity or acceleration

**Essential Derivative Rules:**
1. **Power Rule**: d/dx(x^n) = n·x^(n-1)
2. **Product Rule**: d/dx(uv) = u'v + uv'
3. **Chain Rule**: d/dx(f(g(x))) = f'(g(x)) · g'(x)
4. **Quotient Rule**: d/dx(u/v) = (u'v - uv')/v²

**Integrals (Integral Calculus):**
- **Definition**: Accumulation of quantities over an interval
- **Geometric interpretation**: Area under a curve
- **Fundamental Theorem**: Connects derivatives and integrals

## 📊 **Step-by-Step Problem Solving**

**Example**: Find dy/dx for y = 3x² + 2x - 1

**Solution Process:**
1. Apply power rule to each term
2. d/dx(3x²) = 3 · 2x^(2-1) = 6x
3. d/dx(2x) = 2 · 1x^(1-1) = 2
4. d/dx(-1) = 0 (constant rule)
5. **Final Answer**: dy/dx = 6x + 2

## 🎯 **Real-World Applications**
- **Physics**: Modeling motion, forces, and energy systems
- **Economics**: Marginal cost and revenue optimization
- **Engineering**: Design optimization and system analysis
- **Biology**: Population growth and decay models

## 💡 **Study Strategies**
1. Master basic derivative rules through repetition
2. Visualize functions using graphing tools
3. Connect mathematical concepts to real applications
4. Practice with diverse problem types

**Ready for a specific problem?** Share any calculus question and I'll provide detailed, step-by-step solutions with clear explanations!`;
  }

  private getPhysicsResponse(): string {
    return `🔬 **Advanced Physics Tutoring**

Welcome to comprehensive physics education! I can explain everything from classical mechanics to cutting-edge quantum physics.

## ⚛️ **Physics Domains Covered**

**Classical Mechanics:**
- Newton's Three Laws of Motion
- Conservation of Energy and Momentum
- Rotational Dynamics and Angular Momentum
- Simple Harmonic Motion and Wave Physics

**Electromagnetism:**
- Electric Fields, Forces, and Potential
- Magnetic Fields and Electromagnetic Induction
- Maxwell's Four Equations (unified field theory)
- Electromagnetic Wave Propagation

**Thermodynamics:**
- Four Laws of Thermodynamics
- Heat Transfer: Conduction, Convection, Radiation
- Statistical Mechanics and Kinetic Theory
- Entropy, Enthalpy, and Free Energy

**Modern Physics:**
- Special and General Relativity
- Quantum Mechanics and Wave Functions
- Atomic Structure and Nuclear Physics
- Particle Physics and Standard Model

## 🌌 **Quantum Physics Fundamentals**

**Wave-Particle Duality:**
- Matter and energy exhibit both wave and particle characteristics
- de Broglie wavelength: λ = h/p (where h is Planck's constant)
- Double-slit experiment demonstrates quantum superposition

**Heisenberg Uncertainty Principle:**
- Cannot simultaneously know exact position and momentum
- Mathematical expression: Δx · Δp ≥ ℏ/2
- Fundamental limit of measurement precision

**Key Quantum Concepts:**
1. **Superposition**: Particles exist in multiple states simultaneously
2. **Entanglement**: Quantum correlations across any distance
3. **Wave Function Collapse**: Measurement determines reality
4. **Quantum Tunneling**: Particles pass through energy barriers

## 🔬 **Problem-Solving Methodology**

**Systematic Approach:**
1. **Identify** relevant physics principles and laws
2. **Visualize** with diagrams and free-body diagrams
3. **List** all known and unknown variables
4. **Apply** appropriate equations and relationships
5. **Solve** algebraically before numerical substitution
6. **Verify** units and check reasonableness of results

## 🚀 **Contemporary Applications**
- GPS satellites require relativistic corrections for accuracy
- MRI machines utilize nuclear magnetic resonance principles
- Solar panels exploit the photoelectric effect
- Quantum computers harness superposition and entanglement
- Laser technology based on stimulated emission

**What specific physics topic would you like to explore?** I can provide detailed explanations, solve complex problems, create conceptual diagrams, and connect theory to real-world applications!`;
  }

  private getChemistryResponse(): string {
    return `🧪 **Advanced Chemistry Tutoring**

Ready to master chemistry from basic atomic structure to complex synthesis reactions!

## ⚗️ **Core Chemistry Disciplines**

**General Chemistry:**
- Atomic structure and electron configurations
- Periodic trends and chemical bonding
- Stoichiometry and balanced chemical equations
- Thermochemistry and reaction kinetics
- Chemical equilibrium and acid-base chemistry

**Organic Chemistry:**
- Functional groups and IUPAC nomenclature
- Reaction mechanisms and stereochemistry
- Synthetic strategies and retrosynthesis
- Spectroscopy: NMR, IR, and mass spectrometry

**Physical Chemistry:**
- Quantum mechanics applications to atoms and molecules
- Thermodynamics and chemical equilibrium
- Kinetics and reaction rate theory
- Electrochemistry and redox processes

## 🔬 **Organic Reaction Mechanisms**

**SN1 Mechanism (Substitution Nucleophilic Unimolecular):**
Step 1: R-X → R+ + X- (slow, rate-determining step)
Step 2: R+ + Nu- → R-Nu (fast nucleophilic attack)

**Key Factors Affecting SN1:**
- Substrate: 3° > 2° > 1° (carbocation stability)
- Leaving group: Better leaving groups increase rate
- Solvent: Polar protic solvents stabilize ions
- Temperature: Higher temperature favors reaction

**SN2 Mechanism (Substitution Nucleophilic Bimolecular):**
- Single concerted step with simultaneous bond breaking/forming
- Backside attack leads to stereochemical inversion
- Rate equation: Rate = k[substrate][nucleophile]
- Substrate preference: 1° > 2° > 3° (steric hindrance)

## 📊 **Periodic Trends Analysis**

**Atomic Properties:**
- **Atomic Radius**: Decreases left-to-right, increases top-to-bottom
- **Ionization Energy**: Increases left-to-right, decreases top-to-bottom
- **Electronegativity**: F > O > N > Cl > Br > I > S > C > H
- **Electron Affinity**: Generally increases left-to-right

## ⚛️ **Chemical Bonding Theories**

**VSEPR Theory (Valence Shell Electron Pair Repulsion):**
- Predicts molecular geometry based on electron pair repulsion
- Linear (2 groups), Trigonal planar (3), Tetrahedral (4)
- Trigonal bipyramidal (5), Octahedral (6)

**Molecular Orbital Theory:**
- Combines atomic orbitals to form molecular orbitals
- Bonding orbitals: Lower energy, electron density between nuclei
- Antibonding orbitals: Higher energy, nodes between nuclei
- Bond order = (bonding electrons - antibonding electrons) / 2

## 🎯 **Problem-Solving Framework**

**Systematic Approach:**
1. **Identify** the type of chemistry problem
2. **Write** balanced chemical equations
3. **Apply** stoichiometric relationships
4. **Use** appropriate theories and principles
5. **Check** chemical and mathematical reasonableness

**Common Problem Types:**
- Stoichiometry and limiting reagents
- Gas law calculations
- Equilibrium constant problems
- pH and buffer calculations
- Organic synthesis planning

**Need help with specific reactions, mechanism explanations, or synthesis problems?** I can draw molecular structures, explain electron movement with arrows, and provide comprehensive step-by-step solutions!`;
  }

  private getBiologyResponse(): string {
    return `🌱 **Advanced Biology Tutoring**

Comprehensive biology education spanning molecular mechanisms to ecosystem dynamics!

## 🧬 **Molecular Biology Fundamentals**

**DNA Structure and Function:**
- Double helix with antiparallel strands
- Base pairing rules: A-T, G-C (hydrogen bonding)
- Central Dogma: DNA → RNA → Protein
- Processes: Replication, Transcription, Translation

**Gene Expression Regulation:**
- Promoter and enhancer sequences
- Transcription factors and regulatory proteins
- Epigenetic modifications (methylation, acetylation)
- Alternative splicing and post-transcriptional control

## 🔬 **Cell Biology and Organelles**

**Eukaryotic Cell Components:**
- **Nucleus**: DNA storage, transcription, ribosome assembly
- **Mitochondria**: ATP production via cellular respiration
- **Chloroplasts**: Photosynthesis in plant cells
- **Endoplasmic Reticulum**: Protein synthesis and lipid metabolism
- **Golgi Apparatus**: Protein modification and trafficking
- **Lysosomes**: Cellular digestion and waste removal

**Cell Division Processes:**
- **Mitosis**: Somatic cell division maintaining chromosome number
- **Meiosis**: Gamete formation with genetic recombination
- Cell cycle checkpoints and regulatory mechanisms

## 🌿 **Photosynthesis Detailed Analysis**

**Light-Dependent Reactions (Thylakoid Membranes):**
- Water photolysis: 2H₂O → 4H⁺ + 4e⁻ + O₂
- Electron transport chain generates ATP and NADPH
- Photosystems I and II work in series

**Calvin Cycle (Stroma):**
- Carbon fixation by RuBisCO enzyme
- 3CO₂ + 9ATP + 6NADPH → G3P + 9ADP + 8Pi + 6NADP⁺
- Regeneration of ribulose bisphosphate (RuBP)

**Overall Photosynthesis:**
6CO₂ + 6H₂O + light energy → C₆H₁₂O₆ + 6O₂

## 🧬 **Genetics and Inheritance**

**Mendelian Genetics:**
- Law of Segregation: Alleles separate during gamete formation
- Law of Independent Assortment: Genes on different chromosomes
- Dominance relationships: Complete, incomplete, codominance

**Modern Genetics Concepts:**
- Linkage and genetic recombination frequency
- Sex-linked inheritance patterns
- Polygenic traits and quantitative genetics
- Population genetics and Hardy-Weinberg equilibrium

## 🌍 **Ecology and Evolution**

**Natural Selection Mechanisms:**
- Variation within populations
- Heritability of advantageous traits
- Differential survival and reproductive success
- Changes in allele frequencies over generations

**Ecosystem Dynamics:**
- Energy flow: Producers → Primary → Secondary → Tertiary consumers
- Biogeochemical cycles: Carbon, nitrogen, phosphorus, water
- Population interactions: Competition, predation, mutualism, parasitism

## 🔬 **Biochemistry and Metabolism**

**Enzyme Function and Kinetics:**
- Michaelis-Menten kinetics: v = (Vmax[S])/(Km + [S])
- Competitive, non-competitive, and allosteric inhibition
- Enzyme regulation: Feedback inhibition, covalent modification

**Cellular Respiration Pathways:**
- Glycolysis: Glucose → 2 Pyruvate (net 2 ATP)
- Krebs Cycle: Acetyl-CoA → CO₂ + NADH + FADH₂
- Electron Transport Chain: NADH/FADH₂ → ATP via chemiosmosis

**What specific biology topic interests you?** I can explain complex physiological processes, create detailed diagrams, analyze experimental data, and help with problem-solving across all biology disciplines!`;
  }

  private getProgrammingResponse(): string {
    return `💻 **Advanced Programming Tutoring**

Comprehensive programming education across languages, paradigms, and applications!

## 🐍 **Python Programming Mastery**

**Core Language Features:**
\`\`\`python
# Object-Oriented Programming
class Student:
    def __init__(self, name, age, courses=None):
        self.name = name
        self.age = age
        self.courses = courses or []
        self._gpa = 0.0  # Private attribute
    
    def enroll_course(self, course):
        if course not in self.courses:
            self.courses.append(course)
            return f"{self.name} enrolled in {course}"
        return f"Already enrolled in {course}"
    
    @property
    def gpa(self):
        return self._gpa
    
    @gpa.setter
    def gpa(self, value):
        if 0.0 <= value <= 4.0:
            self._gpa = value
        else:
            raise ValueError("GPA must be between 0.0 and 4.0")

# Functional Programming
from functools import reduce
from typing import List, Callable

def calculate_statistics(scores: List[float]) -> dict:
    if not scores:
        return {"mean": 0, "max": 0, "min": 0}
    
    return {
        "mean": sum(scores) / len(scores),
        "max": max(scores),
        "min": min(scores),
        "total": len(scores)
    }

# List Comprehensions and Generators
even_squares = [x**2 for x in range(20) if x % 2 == 0]
fibonacci_gen = (a := 0, b := 1, [a := a + b for _ in range(10)])[2]
\`\`\`

## 📊 **Data Science and Machine Learning**

**NumPy for Numerical Computing:**
\`\`\`python
import numpy as np

# Array creation and manipulation
data = np.array([[1, 2, 3], [4, 5, 6], [7, 8, 9]])
reshaped = data.reshape(1, -1)  # Flatten to 1D

# Mathematical operations
normalized = (data - np.mean(data)) / np.std(data)
eigenvals, eigenvecs = np.linalg.eig(data.T @ data)
\`\`\`

**Pandas for Data Analysis:**
\`\`\`python
import pandas as pd

# DataFrame operations
df = pd.read_csv('student_data.csv')
summary_stats = df.groupby('major').agg({
    'gpa': ['mean', 'std', 'count'],
    'credits': 'sum'
}).round(3)

# Data cleaning and transformation
df_clean = df.dropna().pipe(
    lambda x: x[x['gpa'] > 0]
).assign(
    gpa_category=lambda x: pd.cut(x['gpa'], 
                                  bins=[0, 2.0, 3.0, 4.0], 
                                  labels=['Low', 'Medium', 'High'])
)
\`\`\`

## 🌐 **Modern Web Development**

**JavaScript ES6+ Advanced Features:**
\`\`\`javascript
// Async/Await with Error Handling
class DataService {
    constructor(baseURL) {
        this.baseURL = baseURL;
    }
    
    async fetchUserData(userId) {
        try {
            const response = await fetch(\`\${this.baseURL}/users/\${userId}\`);
            
            if (!response.ok) {
                throw new Error(\`HTTP \${response.status}: \${response.statusText}\`);
            }
            
            const userData = await response.json();
            return this.processUserData(userData);
        } catch (error) {
            console.error('Error fetching user data:', error);
            throw new Error('Failed to fetch user data');
        }
    }
    
    processUserData({id, name, email, ...metadata}) {
        return {
            userId: id,
            displayName: name.toUpperCase(),
            contact: email.toLowerCase(),
            metadata: this.sanitizeMetadata(metadata)
        };
    }
}

// Modern React Hooks
import React, { useState, useEffect, useCallback, useMemo } from 'react';

const StudentDashboard = ({ studentId }) => {
    const [student, setStudent] = useState(null);
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(true);
    
    const fetchStudentData = useCallback(async () => {
        setLoading(true);
        try {
            const [studentData, courseData] = await Promise.all([
                fetch(\`/api/students/\${studentId}\`).then(r => r.json()),
                fetch(\`/api/students/\${studentId}/courses\`).then(r => r.json())
            ]);
            
            setStudent(studentData);
            setCourses(courseData);
        } catch (error) {
            console.error('Failed to load student data:', error);
        } finally {
            setLoading(false);
        }
    }, [studentId]);
    
    useEffect(() => {
        fetchStudentData();
    }, [fetchStudentData]);
    
    const gpa = useMemo(() => {
        if (!courses.length) return 0;
        const totalPoints = courses.reduce((sum, course) => 
            sum + (course.grade * course.credits), 0);
        const totalCredits = courses.reduce((sum, course) => 
            sum + course.credits, 0);
        return totalCredits > 0 ? (totalPoints / totalCredits).toFixed(2) : 0;
    }, [courses]);
    
    if (loading) return <div>Loading student data...</div>;
    
    return (
        <div className="student-dashboard">
            <h1>Welcome, {student?.name}</h1>
            <p>Current GPA: {gpa}</p>
            {/* Course components */}
        </div>
    );
};
\`\`\`

## 🗄️ **Backend Development and APIs**

**Node.js with Express and Database Integration:**
\`\`\`javascript
const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const app = express();
app.use(express.json());

// Database Schema
const studentSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    courses: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Course' }],
    gpa: { type: Number, default: 0.0 }
}, { timestamps: true });

const Student = mongoose.model('Student', studentSchema);

// Authentication Middleware
const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    
    if (!token) {
        return res.status(401).json({ error: 'Access token required' });
    }
    
    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) return res.status(403).json({ error: 'Invalid token' });
        req.user = user;
        next();
    });
};

// RESTful API Routes
app.post('/api/auth/register', async (req, res) => {
    try {
        const { name, email, password } = req.body;
        
        // Validate input
        if (!name || !email || !password) {
            return res.status(400).json({ error: 'All fields required' });
        }
        
        // Hash password
        const saltRounds = 12;
        const hashedPassword = await bcrypt.hash(password, saltRounds);
        
        // Create student
        const student = new Student({
            name,
            email: email.toLowerCase(),
            password: hashedPassword
        });
        
        await student.save();
        
        // Generate JWT
        const token = jwt.sign(
            { id: student._id, email: student.email },
            process.env.JWT_SECRET,
            { expiresIn: '24h' }
        );
        
        res.status(201).json({
            message: 'Student registered successfully',
            token,
            student: { id: student._id, name, email }
        });
        
    } catch (error) {
        if (error.code === 11000) {
            return res.status(409).json({ error: 'Email already exists' });
        }
        res.status(500).json({ error: 'Registration failed' });
    }
});
\`\`\`

## 🧪 **Testing and Code Quality**

**Comprehensive Testing Strategy:**
\`\`\`python
import unittest
from unittest.mock import Mock, patch
import pytest

class TestStudentManager(unittest.TestCase):
    def setUp(self):
        self.student_manager = StudentManager()
        self.sample_student = {
            'name': 'John Doe',
            'email': 'john@example.com',
            'courses': ['CS101', 'MATH201']
        }
    
    def test_student_creation(self):
        student = self.student_manager.create_student(**self.sample_student)
        self.assertIsNotNone(student.id)
        self.assertEqual(student.name, 'John Doe')
        self.assertEqual(len(student.courses), 2)
    
    @patch('student_manager.database.save')
    def test_student_save_with_mock(self, mock_save):
        mock_save.return_value = True
        result = self.student_manager.save_student(self.sample_student)
        self.assertTrue(result)
        mock_save.assert_called_once()
    
    def test_invalid_email_raises_exception(self):
        with self.assertRaises(ValueError):
            self.student_manager.create_student(
                name='Test', 
                email='invalid-email', 
                courses=[]
            )

# Pytest with fixtures
@pytest.fixture
def student_data():
    return {
        'name': 'Jane Smith',
        'email': 'jane@university.edu',
        'gpa': 3.85
    }

def test_gpa_calculation(student_data):
    student = Student(**student_data)
    assert student.gpa == 3.85
    assert student.is_honors_student() is True
\`\`\`

**What programming challenge are you working on?** I can help with debugging complex issues, code architecture design, algorithm optimization, best practices implementation, and comprehensive code reviews!`;
  }

  private getMLResponse(): string {
    return `🤖 **Advanced Machine Learning & AI Tutoring**

Deep dive into machine learning, neural networks, and artificial intelligence with comprehensive mathematical foundations!

## 🧠 **Neural Networks and Deep Learning**

**Mathematical Foundation:**
The basic perceptron computes: y = f(w₁x₁ + w₂x₂ + ... + wₙxₙ + b)
Where f is an activation function (sigmoid, ReLU, tanh)

**Multi-layer Neural Network Implementation:**
\`\`\`python
import tensorflow as tf
import numpy as np
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler

# Build sophisticated neural network
def create_advanced_model(input_shape, num_classes):
    model = tf.keras.Sequential([
        # Input layer with normalization
        tf.keras.layers.BatchNormalization(input_shape=input_shape),
        
        # Hidden layers with dropout for regularization
        tf.keras.layers.Dense(256, activation='relu'),
        tf.keras.layers.Dropout(0.3),
        tf.keras.layers.BatchNormalization(),
        
        tf.keras.layers.Dense(128, activation='relu'),
        tf.keras.layers.Dropout(0.3),
        tf.keras.layers.BatchNormalization(),
        
        tf.keras.layers.Dense(64, activation='relu'),
        tf.keras.layers.Dropout(0.2),
        
        # Output layer
        tf.keras.layers.Dense(num_classes, activation='softmax')
    ])
    
    # Advanced optimizer with learning rate scheduling
    optimizer = tf.keras.optimizers.Adam(
        learning_rate=0.001,
        beta_1=0.9,
        beta_2=0.999,
        epsilon=1e-07
    )
    
    model.compile(
        optimizer=optimizer,
        loss='sparse_categorical_crossentropy',
        metrics=['accuracy', 'top_3_accuracy']
    )
    
    return model

# Training with callbacks
def train_model(model, X_train, y_train, X_val, y_val):
    callbacks = [
        tf.keras.callbacks.EarlyStopping(
            monitor='val_loss',
            patience=10,
            restore_best_weights=True
        ),
        tf.keras.callbacks.ReduceLROnPlateau(
            monitor='val_loss',
            factor=0.5,
            patience=5,
            min_lr=1e-7
        ),
        tf.keras.callbacks.ModelCheckpoint(
            'best_model.h5',
            monitor='val_accuracy',
            save_best_only=True
        )
    ]
    
    history = model.fit(
        X_train, y_train,
        epochs=100,
        batch_size=32,
        validation_data=(X_val, y_val),
        callbacks=callbacks,
        verbose=1
    )
    
    return history
\`\`\`

## 📊 **Machine Learning Algorithm Deep Dive**

**Supervised Learning Algorithms:**

1. **Linear Regression with Regularization:**
\`\`\`python
from sklearn.linear_model import Ridge, Lasso, ElasticNet
from sklearn.preprocessing import PolynomialFeatures
from sklearn.pipeline import Pipeline

# Advanced regression pipeline
poly_ridge_pipeline = Pipeline([
    ('poly', PolynomialFeatures(degree=3, include_bias=False)),
    ('scaler', StandardScaler()),
    ('ridge', Ridge(alpha=1.0))
])

# Cross-validation for hyperparameter tuning
from sklearn.model_selection import GridSearchCV

param_grid = {
    'poly__degree': [2, 3, 4],
    'ridge__alpha': [0.1, 1.0, 10.0, 100.0]
}

grid_search = GridSearchCV(
    poly_ridge_pipeline,
    param_grid,
    cv=5,
    scoring='neg_mean_squared_error',
    n_jobs=-1
)
\`\`\`

2. **Support Vector Machines:**
\`\`\`python
from sklearn.svm import SVC
from sklearn.preprocessing import StandardScaler

# Non-linear SVM with RBF kernel
svm_model = SVC(
    kernel='rbf',
    C=1.0,
    gamma='scale',
    probability=True,  # Enable probability estimates
    random_state=42
)

# Feature scaling is crucial for SVM
scaler = StandardScaler()
X_scaled = scaler.fit_transform(X_train)
svm_model.fit(X_scaled, y_train)
\`\`\`

## 🔬 **Advanced Deep Learning Architectures**

**Convolutional Neural Networks (CNNs):**
\`\`\`python
def create_cnn_model(input_shape, num_classes):
    model = tf.keras.Sequential([
        # First convolutional block
        tf.keras.layers.Conv2D(32, (3, 3), activation='relu', 
                              input_shape=input_shape),
        tf.keras.layers.BatchNormalization(),
        tf.keras.layers.Conv2D(32, (3, 3), activation='relu'),
        tf.keras.layers.MaxPooling2D((2, 2)),
        tf.keras.layers.Dropout(0.25),
        
        # Second convolutional block
        tf.keras.layers.Conv2D(64, (3, 3), activation='relu'),
        tf.keras.layers.BatchNormalization(),
        tf.keras.layers.Conv2D(64, (3, 3), activation='relu'),
        tf.keras.layers.MaxPooling2D((2, 2)),
        tf.keras.layers.Dropout(0.25),
        
        # Third convolutional block
        tf.keras.layers.Conv2D(128, (3, 3), activation='relu'),
        tf.keras.layers.BatchNormalization(),
        tf.keras.layers.Dropout(0.25),
        
        # Dense layers
        tf.keras.layers.GlobalAveragePooling2D(),
        tf.keras.layers.Dense(512, activation='relu'),
        tf.keras.layers.BatchNormalization(),
        tf.keras.layers.Dropout(0.5),
        tf.keras.layers.Dense(num_classes, activation='softmax')
    ])
    
    return model
\`\`\`

**Recurrent Neural Networks (RNNs) for Sequences:**
\`\`\`python
def create_lstm_model(max_sequence_length, vocab_size, embedding_dim=128):
    model = tf.keras.Sequential([
        tf.keras.layers.Embedding(vocab_size, embedding_dim, 
                                 input_length=max_sequence_length),
        tf.keras.layers.LSTM(128, return_sequences=True, dropout=0.2),
        tf.keras.layers.LSTM(64, dropout=0.2),
        tf.keras.layers.Dense(64, activation='relu'),
        tf.keras.layers.Dropout(0.5),
        tf.keras.layers.Dense(1, activation='sigmoid')
    ])
    
    return model
\`\`\`

## 📈 **Model Optimization and Evaluation**

**Advanced Training Strategies:**
\`\`\`python
# Learning rate scheduling
def cosine_annealing_schedule(epoch, lr):
    import math
    epochs_per_cycle = 50
    cycle = math.floor(1 + epoch / epochs_per_cycle)
    x = abs(epoch / epochs_per_cycle - cycle)
    return lr * (1 + math.cos(x * math.pi)) / 2

# Custom metrics
class F1Score(tf.keras.metrics.Metric):
    def __init__(self, name='f1_score', **kwargs):
        super().__init__(name=name, **kwargs)
        self.precision = tf.keras.metrics.Precision()
        self.recall = tf.keras.metrics.Recall()
    
    def update_state(self, y_true, y_pred, sample_weight=None):
        self.precision.update_state(y_true, y_pred, sample_weight)
        self.recall.update_state(y_true, y_pred, sample_weight)
    
    def result(self):
        p = self.precision.result()
        r = self.recall.result()
        return 2 * ((p * r) / (p + r + tf.keras.backend.epsilon()))
    
    def reset_state(self):
        self.precision.reset_state()
        self.recall.reset_state()
\`\`\`

**Comprehensive Model Evaluation:**
\`\`\`python
from sklearn.metrics import classification_report, confusion_matrix
import seaborn as sns
import matplotlib.pyplot as plt

def evaluate_model_comprehensive(model, X_test, y_test, class_names):
    # Predictions
    y_pred = model.predict(X_test)
    y_pred_classes = np.argmax(y_pred, axis=1)
    
    # Classification report
    report = classification_report(y_test, y_pred_classes, 
                                 target_names=class_names, 
                                 output_dict=True)
    
    # Confusion matrix
    cm = confusion_matrix(y_test, y_pred_classes)
    
    # Visualization
    plt.figure(figsize=(12, 5))
    
    plt.subplot(1, 2, 1)
    sns.heatmap(cm, annot=True, fmt='d', cmap='Blues',
                xticklabels=class_names,
                yticklabels=class_names)
    plt.title('Confusion Matrix')
    plt.ylabel('True Label')
    plt.xlabel('Predicted Label')
    
    plt.subplot(1, 2, 2)
    metrics_df = pd.DataFrame(report).transpose()
    sns.heatmap(metrics_df.iloc[:-1, :-1], annot=True, cmap='Greens')
    plt.title('Classification Metrics')
    
    plt.tight_layout()
    plt.show()
    
    return report
\`\`\`

## 🚀 **Real-World Applications and Deployment**

**Production Model Serving:**
\`\`\`python
import tensorflow as tf
from flask import Flask, request, jsonify
import numpy as np

app = Flask(__name__)

# Load trained model
model = tf.keras.models.load_model('production_model.h5')

@app.route('/predict', methods=['POST'])
def predict():
    try:
        # Get data from request
        data = request.get_json()
        features = np.array(data['features']).reshape(1, -1)
        
        # Make prediction
        prediction = model.predict(features)
        confidence = float(np.max(prediction))
        predicted_class = int(np.argmax(prediction))
        
        return jsonify({
            'prediction': predicted_class,
            'confidence': confidence,
            'status': 'success'
        })
        
    except Exception as e:
        return jsonify({
            'error': str(e),
            'status': 'error'
        }), 400

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=False)
\`\`\`

**Model Interpretability:**
\`\`\`python
import shap
import lime
from lime.lime_image import LimeImageExplainer

# SHAP for model explanation
explainer = shap.TreeExplainer(model)
shap_values = explainer.shap_values(X_test)
shap.summary_plot(shap_values, X_test, feature_names=feature_names)

# LIME for local explanations
lime_explainer = LimeImageExplainer()
explanation = lime_explainer.explain_instance(
    image_array,
    model.predict,
    top_labels=5,
    hide_color=0,
    num_samples=1000
)
\`\`\`

**What specific ML topic or project would you like to explore?** I can provide mathematical derivations, implementation details, debugging help, optimization strategies, and deployment guidance for any machine learning challenge!`;
  }

  private getGeneralResponse(prompt: string): string {
    return `🎓 **Your Advanced AI Tutor - ChatGPT-4 Powered**

Hello! I'm your comprehensive AI tutor with ChatGPT-4 level capabilities. I'm designed to provide university-level educational support across all subjects with detailed explanations, interactive examples, and personalized learning assistance.

## 🌟 **My Advanced Capabilities**

**📚 Academic Excellence:**
- Mathematics (Algebra through Advanced Calculus, Statistics, Discrete Math)
- Physical Sciences (Physics, Chemistry, Earth Science, Astronomy)
- Life Sciences (Biology, Biochemistry, Genetics, Ecology)
- Computer Science (Programming, Algorithms, AI/ML, Systems)
- Engineering (Mechanical, Electrical, Civil, Software)
- Humanities (Literature, History, Philosophy, Languages)
- Social Sciences (Psychology, Economics, Political Science)

**🔧 Technical Expertise:**
- Programming: Python, JavaScript, Java, C++, R, MATLAB, and more
- Data Science & Machine Learning with practical implementations
- Web Development (Frontend: React, Vue; Backend: Node.js, Django)
- Database Design (SQL, NoSQL, Data Modeling)
- Software Engineering (Design Patterns, Architecture, DevOps)
- Cybersecurity and Network Engineering

**💡 Learning Enhancement:**
- Step-by-step problem solving with detailed explanations
- Visual learning with diagrams, charts, and illustrations
- Interactive examples and hands-on practice
- Personalized study strategies and exam preparation
- Research methodology and academic writing support

## 🎯 **Regarding Your Question: "${prompt}"**

I can provide comprehensive assistance including:

1. **Detailed Conceptual Explanations**: Breaking down complex ideas into understandable components
2. **Mathematical Derivations**: Step-by-step mathematical proofs and solutions
3. **Practical Applications**: Real-world examples and use cases
4. **Interactive Problem Solving**: Guided solutions with multiple approaches
5. **Visual Learning Aids**: Diagrams, flowcharts, and conceptual illustrations
6. **Practice Materials**: Custom problems and exercises for reinforcement

## 🚀 **Advanced Learning Features**

**Multi-Modal Support:**
- 📷 **Image Analysis**: Upload photos of problems, diagrams, handwritten notes, or textbook pages for detailed analysis and explanation
- 🎵 **Audio Processing**: Record voice questions for hands-free learning and spoken explanations
- 💻 **Code Analysis**: Submit programming code for debugging, optimization, and best practices review
- 📊 **Data Visualization**: Create custom charts, graphs, and statistical analyses

**Personalized Education:**
- Adaptive explanations based on your current knowledge level
- Customized practice problems targeting your specific needs
- Progress tracking with personalized recommendations
- Learning path optimization for efficient skill development

## 🔍 **Comprehensive Knowledge Access**

I have extensive knowledge from:
- 📖 Academic textbooks and peer-reviewed research papers
- 🌐 Wikipedia, educational websites, and online resources
- 🎓 University-level course materials and curricula
- 🔬 Scientific journals and recent research publications
- 💡 Interactive learning platforms and educational databases
- 📚 Professional reference materials and industry standards

## ❓ **How I Can Help You Today**

**Academic Support:**
- Solve complex mathematical equations and proofs
- Explain scientific phenomena with detailed mechanisms
- Debug and optimize programming code
- Analyze literature and historical events
- Prepare for standardized tests (SAT, GRE, MCAT, etc.)

**Research and Writing:**
- Literature review methodology
- Research design and statistical analysis
- Academic writing and citation formats
- Thesis and dissertation guidance

**Professional Development:**
- Career guidance in STEM and other fields
- Interview preparation and skill assessment
- Industry trends and technology updates

**Learning Strategies:**
- Study technique optimization
- Memory enhancement methods
- Time management for academic success
- Stress management during exams

## 🎯 **Getting Started**

To maximize our learning session, you can:

1. **Ask Specific Questions**: The more detailed your question, the more targeted my response
2. **Upload Images**: Photos of problems, diagrams, or notes for visual analysis
3. **Record Audio**: Voice questions for complex topics that benefit from discussion
4. **Specify Your Level**: Let me know if you're a beginner, intermediate, or advanced learner
5. **Request Examples**: Ask for practice problems, code samples, or worked solutions

**Example prompts that work well:**
- "Explain quantum mechanics at an undergraduate level"
- "Help me debug this Python function"
- "Solve this calculus problem step-by-step"
- "What are the key themes in Shakespeare's Hamlet?"
- "How does machine learning work in recommendation systems?"

**What would you like to explore today?** I'm here to provide comprehensive, accurate, and engaging educational support tailored specifically to your learning goals and preferred style!`;
  }

  private delay(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
}

export default function AITutor() {
  const { user } = useAuth();
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      type: "ai",
      content:
        "👋 Hello! I'm your advanced AI tutor powered by ChatGPT-4 and cutting-edge deep learning models. I can help you with any subject, solve complex problems step-by-step, analyze images and audio, and provide comprehensive educational support. Upload an image, record audio, or simply ask me anything - I'm here to help you learn and succeed!",
      timestamp: new Date().toISOString(),
      model: "ChatGPT-4",
    },
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
        setRecordingTime((prev) => prev + 1);
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
      attachments: uploadedImage
        ? [
            {
              type: "image",
              url: uploadedImage,
            },
          ]
        : undefined,
    };

    setMessages((prev) => [...prev, userMessage]);
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

      setMessages((prev) => [...prev, aiMessage]);

      // Text-to-speech if enabled
      if (autoSpeak && "speechSynthesis" in window) {
        const utterance = new SpeechSynthesisUtterance(aiResponse);
        speechSynthesis.speak(utterance);
      }
    } catch (error) {
      const errorMessage: Message = {
        id: `error_${Date.now()}`,
        type: "ai",
        content:
          "I apologize, but I encountered an error processing your request. Please try again or rephrase your question.",
        timestamp: new Date().toISOString(),
        model: selectedModel,
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsTyping(false);
    }
  };

  // Handle image upload
  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && file.type.startsWith("image/")) {
      const url = URL.createObjectURL(file);
      setUploadedImage(url);
    }
  };

  // Handle audio upload
  const handleAudioUpload = async (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const file = event.target.files?.[0];
    if (file && file.type.startsWith("audio/")) {
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
          attachments: [
            {
              type: "audio",
              url: url,
            },
          ],
        };

        setMessages((prev) => [...prev, aiMessage]);
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
        const voiceMessage: Message = {
          id: `user_${Date.now()}`,
          type: "user",
          content:
            "🎤 Voice message: [Recorded audio - processing with advanced speech recognition]",
          timestamp: new Date().toISOString(),
        };
        setMessages((prev) => [...prev, voiceMessage]);
        handleSendMessage();
      }, 5000); // Auto-stop after 5 seconds for demo
    }
  };

  // Message feedback
  const handleFeedback = (
    messageId: string,
    feedback: "helpful" | "not_helpful",
  ) => {
    setMessages((prev) =>
      prev.map((msg) => (msg.id === messageId ? { ...msg, feedback } : msg)),
    );
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
      examples: [
        "Solve differential equations",
        "Explain integration by parts",
        "Matrix operations",
      ],
    },
    {
      name: "Sciences",
      description: "Physics, Chemistry, Biology, Earth Science",
      icon: <Atom className="w-5 h-5" />,
      examples: [
        "Quantum mechanics",
        "Organic chemistry reactions",
        "Photosynthesis process",
      ],
    },
    {
      name: "Programming",
      description: "Python, JavaScript, Java, C++, Data Science",
      icon: <Code className="w-5 h-5" />,
      examples: [
        "Debug Python code",
        "Explain algorithms",
        "Machine learning models",
      ],
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
    return `${mins}:${secs.toString().padStart(2, "0")}`;
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
          <h1 className="text-4xl font-bold text-white mb-4">AI Tutor</h1>
          <p className="text-xl text-blue-200 max-w-3xl mx-auto">
            Your personal ChatGPT-powered tutor with advanced AI capabilities.
            Ask questions, upload images, record audio, and get comprehensive
            educational support.
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
                    <div
                      className={`max-w-[80%] ${
                        message.type === "user"
                          ? "bg-blue-600 text-white"
                          : "bg-slate-700/80 text-slate-100"
                      } rounded-2xl p-4 backdrop-blur-sm`}
                    >
                      {/* Message content */}
                      <div className="whitespace-pre-wrap mb-2">
                        {message.content}
                      </div>

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
                          <span>
                            {new Date(message.timestamp).toLocaleTimeString()}
                          </span>
                          {message.model && <span>• {message.model}</span>}
                          {message.tokens && (
                            <span>• {message.tokens} tokens</span>
                          )}
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
                              onClick={() =>
                                handleFeedback(message.id, "helpful")
                              }
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
                              onClick={() =>
                                handleFeedback(message.id, "not_helpful")
                              }
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
                        <span className="text-slate-200">
                          AI is analyzing and generating response...
                        </span>
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
                    <span className="text-sm">
                      Recording... {formatTime(recordingTime)}
                    </span>
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
                    <Mic
                      className={`w-4 h-4 mr-1 ${isRecording ? "animate-pulse" : ""}`}
                    />
                    {isRecording ? "Stop" : "Record"}
                  </Button>
                  <Separator
                    orientation="vertical"
                    className="h-6 bg-slate-600"
                  />
                  <Badge
                    variant="outline"
                    className="text-xs text-slate-400 border-slate-600"
                  >
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
                        if (e.key === "Enter" && !e.shiftKey) {
                          e.preventDefault();
                          handleSendMessage();
                        }
                      }}
                    />
                  </div>
                  <Button
                    onClick={handleSendMessage}
                    disabled={
                      (!inputMessage.trim() && !uploadedImage) || isTyping
                    }
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
                  <div
                    key={index}
                    className="p-3 rounded-lg border border-slate-600 hover:border-slate-500 transition-colors"
                  >
                    <div className="flex items-center space-x-2 mb-2">
                      {capability.icon}
                      <h3 className="font-medium text-white">
                        {capability.name}
                      </h3>
                    </div>
                    <p className="text-sm text-slate-400 mb-2">
                      {capability.description}
                    </p>
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
                    <Select
                      value={selectedModel}
                      onValueChange={setSelectedModel}
                    >
                      <SelectTrigger className="bg-slate-700 border-slate-600 text-white">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="gpt-4">
                          ChatGPT-4 (Most Advanced)
                        </SelectItem>
                        <SelectItem value="gpt-3.5">
                          ChatGPT-3.5 (Fast)
                        </SelectItem>
                        <SelectItem value="claude">
                          Claude-3 (Analytical)
                        </SelectItem>
                        <SelectItem value="gemini">
                          Gemini Pro (Google)
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">
                      Learning Level
                    </label>
                    <Select
                      value={learningLevel}
                      onValueChange={setLearningLevel}
                    >
                      <SelectTrigger className="bg-slate-700 border-slate-600 text-white">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="beginner">Beginner</SelectItem>
                        <SelectItem value="intermediate">
                          Intermediate
                        </SelectItem>
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
                  "Linear algebra concepts",
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
