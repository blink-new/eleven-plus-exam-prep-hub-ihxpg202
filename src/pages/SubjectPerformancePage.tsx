import { useState, useEffect } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { Button } from '../components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card'
import { Badge } from '../components/ui/badge'
import { Progress } from '../components/ui/progress'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../components/ui/dialog'
import { 
  Trophy,
  BookOpen,
  Calculator,
  Brain,
  Puzzle,
  Clock,
  Star,
  Award,
  Target,
  TrendingUp,
  Calendar,
  CheckCircle,
  User,
  Settings,
  LogOut,
  Bell,
  Search,
  MoreVertical,
  ChevronRight,
  BarChart3,
  PieChart,
  Activity,
  Home,
  Upload,
  Plus,
  Menu,
  X,
  ArrowLeft,
  ArrowUp,
  ArrowDown,
  Minus,
  Sparkles,
  Download,
  RefreshCw,
  Loader2
} from 'lucide-react'

interface TopicPerformance {
  id: string
  name: string
  accuracy: number
  difficultyMastery: {
    easy: number
    medium: number
    hard: number
  }
  attemptFrequency: number
  questionsAttempted: number
  totalQuestions: number
  averageTime: string
  improvement: number
  lastAttempt: string
  status: 'excellent' | 'good' | 'needs-work' | 'critical'
}

interface SubjectData {
  id: string
  name: string
  icon: React.ReactNode
  color: string
  topics: TopicPerformance[]
  overallStats: {
    totalAccuracy: number
    totalQuestions: number
    totalAttempted: number
    totalTime: string
    averageScore: number
    improvement: number
  }
}

const subjectData: Record<string, SubjectData> = {
  mathematics: {
    id: 'mathematics',
    name: 'Mathematics',
    icon: <Calculator className="w-6 h-6" />,
    color: 'bg-blue-500',
    overallStats: {
      totalAccuracy: 82,
      totalQuestions: 1680,
      totalAttempted: 1250,
      totalTime: '24h 30m',
      averageScore: 82,
      improvement: 8
    },
    topics: [
      {
        id: 'algebra',
        name: 'Algebra',
        accuracy: 89,
        difficultyMastery: { easy: 95, medium: 87, hard: 78 },
        attemptFrequency: 45,
        questionsAttempted: 180,
        totalQuestions: 200,
        averageTime: '1m 45s',
        improvement: 12,
        lastAttempt: '2 hours ago',
        status: 'excellent'
      },
      {
        id: 'bodmas',
        name: 'BODMAS',
        accuracy: 91,
        difficultyMastery: { easy: 98, medium: 89, hard: 82 },
        attemptFrequency: 38,
        questionsAttempted: 165,
        totalQuestions: 180,
        averageTime: '1m 20s',
        improvement: 15,
        lastAttempt: '1 day ago',
        status: 'excellent'
      },
      {
        id: 'probability',
        name: 'Probability',
        accuracy: 65,
        difficultyMastery: { easy: 78, medium: 62, hard: 45 },
        attemptFrequency: 22,
        questionsAttempted: 95,
        totalQuestions: 150,
        averageTime: '2m 30s',
        improvement: -5,
        lastAttempt: '3 days ago',
        status: 'needs-work'
      },
      {
        id: 'area-perimeter',
        name: 'Area & Perimeter',
        accuracy: 72,
        difficultyMastery: { easy: 85, medium: 70, hard: 58 },
        attemptFrequency: 28,
        questionsAttempted: 120,
        totalQuestions: 160,
        averageTime: '2m 10s',
        improvement: 3,
        lastAttempt: '2 days ago',
        status: 'good'
      },
      {
        id: 'simplification',
        name: 'Simplification',
        accuracy: 88,
        difficultyMastery: { easy: 94, medium: 86, hard: 79 },
        attemptFrequency: 42,
        questionsAttempted: 175,
        totalQuestions: 190,
        averageTime: '1m 35s',
        improvement: 8,
        lastAttempt: '1 day ago',
        status: 'excellent'
      },
      {
        id: 'fractions',
        name: 'Fractions',
        accuracy: 76,
        difficultyMastery: { easy: 88, medium: 74, hard: 62 },
        attemptFrequency: 35,
        questionsAttempted: 140,
        totalQuestions: 180,
        averageTime: '1m 55s',
        improvement: 6,
        lastAttempt: '4 days ago',
        status: 'good'
      }
    ]
  },
  english: {
    id: 'english',
    name: 'English',
    icon: <BookOpen className="w-6 h-6" />,
    color: 'bg-green-500',
    overallStats: {
      totalAccuracy: 78,
      totalQuestions: 1480,
      totalAttempted: 890,
      totalTime: '18h 45m',
      averageScore: 78,
      improvement: 5
    },
    topics: [
      {
        id: 'reading-comprehension',
        name: 'Reading Comprehension',
        accuracy: 85,
        difficultyMastery: { easy: 92, medium: 83, hard: 75 },
        attemptFrequency: 40,
        questionsAttempted: 160,
        totalQuestions: 200,
        averageTime: '3m 20s',
        improvement: 8,
        lastAttempt: '1 day ago',
        status: 'excellent'
      },
      {
        id: 'grammar',
        name: 'Grammar',
        accuracy: 82,
        difficultyMastery: { easy: 90, medium: 80, hard: 70 },
        attemptFrequency: 35,
        questionsAttempted: 145,
        totalQuestions: 180,
        averageTime: '1m 45s',
        improvement: 10,
        lastAttempt: '2 days ago',
        status: 'excellent'
      },
      {
        id: 'creative-writing',
        name: 'Creative Writing',
        accuracy: 68,
        difficultyMastery: { easy: 75, medium: 65, hard: 55 },
        attemptFrequency: 18,
        questionsAttempted: 45,
        totalQuestions: 80,
        averageTime: '8m 30s',
        improvement: -2,
        lastAttempt: '5 days ago',
        status: 'needs-work'
      },
      {
        id: 'vocabulary',
        name: 'Vocabulary',
        accuracy: 74,
        difficultyMastery: { easy: 82, medium: 72, hard: 62 },
        attemptFrequency: 28,
        questionsAttempted: 120,
        totalQuestions: 160,
        averageTime: '1m 30s',
        improvement: 2,
        lastAttempt: '3 days ago',
        status: 'good'
      }
    ]
  },
  'verbal-reasoning': {
    id: 'verbal-reasoning',
    name: 'Verbal Reasoning',
    icon: <Brain className="w-6 h-6" />,
    color: 'bg-purple-500',
    overallStats: {
      totalAccuracy: 71,
      totalQuestions: 1240,
      totalAttempted: 560,
      totalTime: '12h 20m',
      averageScore: 71,
      improvement: -2
    },
    topics: [
      {
        id: 'word-relationships',
        name: 'Word Relationships',
        accuracy: 78,
        difficultyMastery: { easy: 85, medium: 76, hard: 65 },
        attemptFrequency: 32,
        questionsAttempted: 125,
        totalQuestions: 160,
        averageTime: '1m 50s',
        improvement: 5,
        lastAttempt: '3 days ago',
        status: 'good'
      },
      {
        id: 'analogies',
        name: 'Analogies',
        accuracy: 80,
        difficultyMastery: { easy: 88, medium: 78, hard: 68 },
        attemptFrequency: 28,
        questionsAttempted: 110,
        totalQuestions: 140,
        averageTime: '2m 10s',
        improvement: 8,
        lastAttempt: '4 days ago',
        status: 'excellent'
      },
      {
        id: 'logical-deduction',
        name: 'Logical Deduction',
        accuracy: 62,
        difficultyMastery: { easy: 72, medium: 58, hard: 45 },
        attemptFrequency: 15,
        questionsAttempted: 65,
        totalQuestions: 120,
        averageTime: '3m 15s',
        improvement: -8,
        lastAttempt: '6 days ago',
        status: 'critical'
      },
      {
        id: 'code-breaking',
        name: 'Code Breaking',
        accuracy: 68,
        difficultyMastery: { easy: 78, medium: 65, hard: 52 },
        attemptFrequency: 20,
        questionsAttempted: 80,
        totalQuestions: 110,
        averageTime: '2m 45s',
        improvement: -3,
        lastAttempt: '5 days ago',
        status: 'needs-work'
      }
    ]
  },
  'non-verbal-reasoning': {
    id: 'non-verbal-reasoning',
    name: 'Non-Verbal Reasoning',
    icon: <Puzzle className="w-6 h-6" />,
    color: 'bg-orange-500',
    overallStats: {
      totalAccuracy: 65,
      totalQuestions: 1080,
      totalAttempted: 320,
      totalTime: '8h 15m',
      averageScore: 65,
      improvement: 12
    },
    topics: [
      {
        id: 'pattern-recognition',
        name: 'Pattern Recognition',
        accuracy: 72,
        difficultyMastery: { easy: 82, medium: 70, hard: 58 },
        attemptFrequency: 25,
        questionsAttempted: 95,
        totalQuestions: 130,
        averageTime: '2m 20s',
        improvement: 15,
        lastAttempt: '5 days ago',
        status: 'good'
      },
      {
        id: 'spatial-reasoning',
        name: 'Spatial Reasoning',
        accuracy: 68,
        difficultyMastery: { easy: 78, medium: 65, hard: 55 },
        attemptFrequency: 22,
        questionsAttempted: 85,
        totalQuestions: 120,
        averageTime: '2m 35s',
        improvement: 12,
        lastAttempt: '6 days ago',
        status: 'good'
      },
      {
        id: 'rotation',
        name: 'Rotation',
        accuracy: 58,
        difficultyMastery: { easy: 68, medium: 55, hard: 42 },
        attemptFrequency: 12,
        questionsAttempted: 45,
        totalQuestions: 90,
        averageTime: '3m 10s',
        improvement: 8,
        lastAttempt: '8 days ago',
        status: 'needs-work'
      },
      {
        id: 'reflection',
        name: 'Reflection',
        accuracy: 62,
        difficultyMastery: { easy: 72, medium: 58, hard: 48 },
        attemptFrequency: 15,
        questionsAttempted: 55,
        totalQuestions: 85,
        averageTime: '2m 55s',
        improvement: 10,
        lastAttempt: '7 days ago',
        status: 'needs-work'
      }
    ]
  }
}

export default function SubjectPerformancePage() {
  const navigate = useNavigate()
  const { subject } = useParams<{ subject: string }>()
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const [isAIModalOpen, setIsAIModalOpen] = useState(false)
  const [selectedTopic, setSelectedTopic] = useState<TopicPerformance | null>(null)
  const [aiText, setAiText] = useState('')
  const [isTyping, setIsTyping] = useState(false)

  const currentSubject = subject ? subjectData[subject] : null

  if (!currentSubject) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Subject Not Found</h1>
          <Button onClick={() => navigate('/performance')}>
            Back to Performance Overview
          </Button>
        </div>
      </div>
    )
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'excellent': return 'bg-green-100 text-green-700 border-green-200'
      case 'good': return 'bg-blue-100 text-blue-700 border-blue-200'
      case 'needs-work': return 'bg-yellow-100 text-yellow-700 border-yellow-200'
      case 'critical': return 'bg-red-100 text-red-700 border-red-200'
      default: return 'bg-gray-100 text-gray-700 border-gray-200'
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case 'excellent': return 'Excellent'
      case 'good': return 'Good'
      case 'needs-work': return 'Needs Work'
      case 'critical': return 'Critical'
      default: return 'Unknown'
    }
  }

  const getImprovementIcon = (improvement: number) => {
    if (improvement > 0) return <ArrowUp className="w-4 h-4 text-green-500" />
    if (improvement < 0) return <ArrowDown className="w-4 h-4 text-red-500" />
    return <Minus className="w-4 h-4 text-gray-500" />
  }

  const getImprovementColor = (improvement: number) => {
    if (improvement > 0) return 'text-green-600'
    if (improvement < 0) return 'text-red-600'
    return 'text-gray-600'
  }

  // AI Insights functionality
  const generateAIInsights = (topic: TopicPerformance) => {
    const insights = [
      `Let's take a look at how you're doing in ${currentSubject?.name} – ${topic.name}...`,
      `You've attempted ${topic.questionsAttempted} questions in this topic.`,
      topic.accuracy >= 80 
        ? `You have consistently performed well with ${topic.accuracy}% accuracy.` 
        : topic.accuracy >= 60 
        ? `Your performance shows room for improvement with ${topic.accuracy}% accuracy.`
        : `This topic needs significant attention with ${topic.accuracy}% accuracy.`,
      topic.difficultyMastery.easy >= 80 
        ? `You excel at easy-level questions (${topic.difficultyMastery.easy}%).` 
        : `Easy questions need more practice (${topic.difficultyMastery.easy}%).`,
      topic.difficultyMastery.hard < 60 
        ? `However, hard questions appear to be your weaker area (${topic.difficultyMastery.hard}%).`
        : `You're handling challenging questions well (${topic.difficultyMastery.hard}%).`,
      topic.improvement > 0 
        ? `Your average score has improved by ${topic.improvement}% recently.`
        : topic.improvement < 0 
        ? `Your performance has declined by ${Math.abs(topic.improvement)}% recently.`
        : `Your performance has remained stable.`,
      `Suggested Focus: ${topic.status === 'critical' ? 'Immediate attention required' : topic.status === 'needs-work' ? 'Regular practice needed' : 'Continue current approach'}.`,
      `Tip: ${topic.averageTime > '2m' ? 'Practice under timed conditions to improve speed' : 'Focus on accuracy while maintaining your good pace'}.`,
      `Would you like to generate a practice set now?`
    ]
    
    return insights.join(' ')
  }

  const handleAskAI = (topic: TopicPerformance) => {
    setSelectedTopic(topic)
    setIsAIModalOpen(true)
    setAiText('')
    setIsTyping(true)
    
    const fullText = generateAIInsights(topic)
    let currentIndex = 0
    
    const typeWriter = () => {
      if (currentIndex < fullText.length) {
        setAiText(fullText.slice(0, currentIndex + 1))
        currentIndex++
        setTimeout(typeWriter, 30) // Adjust speed here (lower = faster)
      } else {
        setIsTyping(false)
      }
    }
    
    // Start typing after a brief delay
    setTimeout(typeWriter, 1000)
  }

  // Close modal and reset state
  const closeAIModal = () => {
    setIsAIModalOpen(false)
    setSelectedTopic(null)
    setAiText('')
    setIsTyping(false)
  }

  const sidebarItems = [
    { id: 'dashboard', label: 'Dashboard', icon: <Home className="w-5 h-5" /> },
    { id: 'performance', label: 'Performance', icon: <BarChart3 className="w-5 h-5" /> },
    { id: 'completed', label: 'Completed Papers', icon: <CheckCircle className="w-5 h-5" /> },
    { id: 'create', label: 'Create Your Exam', icon: <Plus className="w-5 h-5" /> },
    { id: 'upload', label: 'Upload Answers', icon: <Upload className="w-5 h-5" /> },
    { id: 'mathematics', label: 'Mathematics', icon: <Calculator className="w-5 h-5" /> },
    { id: 'english', label: 'English', icon: <BookOpen className="w-5 h-5" /> },
    { id: 'verbal', label: 'Verbal Reasoning', icon: <Brain className="w-5 h-5" /> },
    { id: 'nonverbal', label: 'Non-Verbal Reasoning', icon: <Puzzle className="w-5 h-5" /> }
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b sticky top-0 z-50">
        <div className="px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="lg:hidden p-2 rounded-md text-gray-700 hover:text-purple-600"
            >
              {isSidebarOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>

            {/* Logo */}
            <Link to="/" className="flex items-center gap-3">
              <div className="p-2 bg-purple-600 rounded-lg">
                <Trophy className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">11+ Prep Hub</h1>
                <p className="text-xs text-gray-600">{currentSubject.name} Performance</p>
              </div>
            </Link>

            {/* Search */}
            <div className="hidden md:flex items-center flex-1 max-w-md mx-8">
              <div className="relative w-full">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="text"
                  placeholder="Search topics..."
                  className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:border-purple-500 focus:ring-1 focus:ring-purple-500"
                />
              </div>
            </div>

            {/* User Menu */}
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="sm">
                <Bell className="w-5 h-5" />
              </Button>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                  <User className="w-5 h-5 text-purple-600" />
                </div>
                <div className="hidden md:block">
                  <p className="text-sm font-medium text-gray-900">Alex Johnson</p>
                  <p className="text-xs text-gray-600">Student</p>
                </div>
                <Button variant="ghost" size="sm">
                  <MoreVertical className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Left Sidebar */}
        <aside className={`${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } lg:translate-x-0 fixed lg:static inset-y-0 left-0 z-40 w-64 bg-white border-r border-gray-200 transition-transform duration-300 ease-in-out`}>
          <div className="flex flex-col h-full">
            {/* Sidebar Header */}
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                  <User className="w-6 h-6 text-purple-600" />
                </div>
                <div>
                  <p className="font-semibold text-gray-900">Alex Johnson</p>
                  <p className="text-sm text-gray-600">Year 6 Student</p>
                </div>
              </div>
            </div>

            {/* Navigation */}
            <nav className="flex-1 p-4 space-y-2">
              {sidebarItems.map((item) => {
                const isSubject = ['mathematics', 'english', 'verbal', 'nonverbal'].includes(item.id)
                const isActive = item.id === 'performance'
                
                if (isSubject) {
                  return (
                    <Link
                      key={item.id}
                      to={`/subject/${item.id}`}
                      className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-colors text-gray-700 hover:bg-gray-100"
                      onClick={() => setIsSidebarOpen(false)}
                    >
                      {item.icon}
                      <span>{item.label}</span>
                    </Link>
                  )
                }
                
                if (item.id === 'dashboard') {
                  return (
                    <Link
                      key={item.id}
                      to="/dashboard"
                      className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-colors text-gray-700 hover:bg-gray-100"
                      onClick={() => setIsSidebarOpen(false)}
                    >
                      {item.icon}
                      <span>{item.label}</span>
                    </Link>
                  )
                }
                
                if (item.id === 'performance') {
                  return (
                    <Link
                      key={item.id}
                      to="/performance"
                      className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-colors text-gray-700 hover:bg-gray-100"
                      onClick={() => setIsSidebarOpen(false)}
                    >
                      {item.icon}
                      <span>{item.label}</span>
                    </Link>
                  )
                }
                
                return (
                  <button
                    key={item.id}
                    className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-colors text-gray-700 hover:bg-gray-100"
                  >
                    {item.icon}
                    <span>{item.label}</span>
                  </button>
                )
              })}
            </nav>

            {/* Sidebar Footer */}
            <div className="p-4 border-t border-gray-200">
              <Button variant="ghost" className="w-full justify-start gap-3 text-gray-700">
                <Settings className="w-5 h-5" />
                Settings
              </Button>
              <Button variant="ghost" className="w-full justify-start gap-3 text-gray-700 mt-2">
                <LogOut className="w-5 h-5" />
                Sign Out
              </Button>
            </div>
          </div>
        </aside>

        {/* Mobile Overlay */}
        {isSidebarOpen && (
          <div 
            className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-30"
            onClick={() => setIsSidebarOpen(false)}
          />
        )}

        {/* Main Content */}
        <main className="flex-1 lg:ml-0">
          <div className="p-6">
            {/* Header Section */}
            <div className="mb-8">
              <div className="flex items-center gap-4 mb-4">
                <Button 
                  variant="ghost" 
                  size="sm"
                  onClick={() => navigate('/performance')}
                  className="gap-2"
                >
                  <ArrowLeft className="w-4 h-4" />
                  Back to Performance Overview
                </Button>
              </div>
              <div className="flex items-center gap-4 mb-4">
                <div className={`w-16 h-16 ${currentSubject.color} rounded-xl flex items-center justify-center text-white`}>
                  {currentSubject.icon}
                </div>
                <div>
                  <h1 className="text-3xl font-bold text-gray-900">{currentSubject.name} Performance</h1>
                  <p className="text-gray-600">Detailed breakdown of your topic-wise performance</p>
                </div>
              </div>
            </div>

            {/* Overall Subject Stats */}
            <div className="grid grid-cols-1 md:grid-cols-5 gap-6 mb-8">
              <Card>
                <CardContent className="p-6">
                  <div className="text-center">
                    <p className="text-3xl font-bold text-gray-900">{currentSubject.overallStats.totalAccuracy}%</p>
                    <p className="text-sm text-gray-600">Overall Accuracy</p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="text-center">
                    <p className="text-3xl font-bold text-gray-900">{currentSubject.overallStats.totalAttempted}</p>
                    <p className="text-sm text-gray-600">Questions Attempted</p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="text-center">
                    <p className="text-3xl font-bold text-gray-900">{currentSubject.overallStats.totalTime}</p>
                    <p className="text-sm text-gray-600">Total Study Time</p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="text-center">
                    <p className="text-3xl font-bold text-gray-900">{currentSubject.overallStats.averageScore}%</p>
                    <p className="text-sm text-gray-600">Average Score</p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="text-center flex items-center justify-center gap-2">
                    {getImprovementIcon(currentSubject.overallStats.improvement)}
                    <p className={`text-3xl font-bold ${getImprovementColor(currentSubject.overallStats.improvement)}`}>
                      {Math.abs(currentSubject.overallStats.improvement)}%
                    </p>
                  </div>
                  <p className="text-sm text-gray-600 text-center">Improvement</p>
                </CardContent>
              </Card>
            </div>

            {/* Topic Performance Breakdown */}
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-gray-900">Topic Performance Breakdown</h2>
                <Button variant="outline" size="sm" className="gap-2">
                  <RefreshCw className="w-4 h-4" />
                  Refresh Data
                </Button>
              </div>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {currentSubject.topics.map((topic) => (
                  <Card key={topic.id} className="hover:shadow-lg transition-shadow">
                    <CardHeader className="pb-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <CardTitle className="text-lg">{topic.name}</CardTitle>
                          <CardDescription>Last attempt: {topic.lastAttempt}</CardDescription>
                        </div>
                        <Badge className={`${getStatusColor(topic.status)} border`}>
                          {getStatusText(topic.status)}
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      {/* Key Metrics */}
                      <div className="grid grid-cols-3 gap-4">
                        <div className="text-center p-3 bg-gray-50 rounded-lg">
                          <p className="text-xl font-bold text-gray-900">{topic.accuracy}%</p>
                          <p className="text-xs text-gray-600">Accuracy</p>
                        </div>
                        <div className="text-center p-3 bg-gray-50 rounded-lg">
                          <p className="text-xl font-bold text-gray-900">{topic.questionsAttempted}</p>
                          <p className="text-xs text-gray-600">Attempted</p>
                        </div>
                        <div className="text-center p-3 bg-gray-50 rounded-lg">
                          <p className="text-xl font-bold text-gray-900">{topic.averageTime}</p>
                          <p className="text-xs text-gray-600">Avg Time</p>
                        </div>
                      </div>

                      {/* Progress Bar */}
                      <div>
                        <div className="flex justify-between text-sm mb-2">
                          <span className="text-gray-600">Completion Rate</span>
                          <span className="font-medium">{Math.round((topic.questionsAttempted / topic.totalQuestions) * 100)}%</span>
                        </div>
                        <Progress value={(topic.questionsAttempted / topic.totalQuestions) * 100} />
                      </div>

                      {/* Difficulty Mastery */}
                      <div>
                        <p className="text-sm font-medium text-gray-900 mb-3">Difficulty Level Mastery</p>
                        <div className="space-y-2">
                          <div className="flex items-center justify-between">
                            <span className="text-sm text-gray-600">Easy</span>
                            <div className="flex items-center gap-2">
                              <Progress value={topic.difficultyMastery.easy} className="w-20" />
                              <span className="text-sm font-medium w-10">{topic.difficultyMastery.easy}%</span>
                            </div>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-sm text-gray-600">Medium</span>
                            <div className="flex items-center gap-2">
                              <Progress value={topic.difficultyMastery.medium} className="w-20" />
                              <span className="text-sm font-medium w-10">{topic.difficultyMastery.medium}%</span>
                            </div>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-sm text-gray-600">Hard</span>
                            <div className="flex items-center gap-2">
                              <Progress value={topic.difficultyMastery.hard} className="w-20" />
                              <span className="text-sm font-medium w-10">{topic.difficultyMastery.hard}%</span>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Improvement Trend */}
                      <div className="flex items-center justify-between pt-2 border-t">
                        <span className="text-sm text-gray-600">Improvement Trend</span>
                        <div className="flex items-center gap-1">
                          {getImprovementIcon(topic.improvement)}
                          <span className={`text-sm font-medium ${getImprovementColor(topic.improvement)}`}>
                            {Math.abs(topic.improvement)}% this month
                          </span>
                        </div>
                      </div>

                      {/* Action Buttons */}
                      <div className="flex gap-2 pt-2">
                        <Button 
                          size="sm" 
                          className="flex-1 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700" 
                          onClick={() => handleAskAI(topic)}
                        >
                          <Sparkles className="w-4 h-4 mr-2" />
                          Ask AI
                        </Button>
                        <Button size="sm" variant="outline" className="flex-1">
                          <Download className="w-4 h-4 mr-2" />
                          Download
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* Recommendations */}
            <Card className="mt-8">
              <CardHeader>
                <CardTitle>Personalized Recommendations</CardTitle>
                <CardDescription>Based on your {currentSubject.name.toLowerCase()} performance analysis</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="text-center p-4 bg-green-50 rounded-lg">
                    <Star className="w-8 h-8 text-green-600 mx-auto mb-2" />
                    <h3 className="font-semibold text-gray-900 mb-1">Keep Practicing</h3>
                    <p className="text-sm text-gray-600">
                      {currentSubject.topics.filter(t => t.status === 'excellent')[0]?.name || 'Strong topics'}
                    </p>
                    <p className="text-xs text-green-600 mt-1">You're doing great!</p>
                  </div>
                  <div className="text-center p-4 bg-yellow-50 rounded-lg">
                    <Target className="w-8 h-8 text-yellow-600 mx-auto mb-2" />
                    <h3 className="font-semibold text-gray-900 mb-1">Focus Area</h3>
                    <p className="text-sm text-gray-600">
                      {currentSubject.topics.filter(t => t.status === 'needs-work' || t.status === 'critical')[0]?.name || 'All topics strong'}
                    </p>
                    <p className="text-xs text-yellow-600 mt-1">Needs more practice</p>
                  </div>
                  <div className="text-center p-4 bg-blue-50 rounded-lg">
                    <TrendingUp className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                    <h3 className="font-semibold text-gray-900 mb-1">Next Goal</h3>
                    <p className="text-sm text-gray-600">Reach 85% overall accuracy</p>
                    <p className="text-xs text-blue-600 mt-1">3% to go!</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>

      {/* AI Insights Modal */}
      <Dialog open={isAIModalOpen} onOpenChange={closeAIModal}>
        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-3 text-xl">
              <div className="w-10 h-10 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              AI Insights – Your Personalized Review
            </DialogTitle>
          </DialogHeader>
          
          <div className="mt-6">
            {selectedTopic && (
              <div className="mb-4 p-4 bg-gradient-to-r from-purple-50 to-blue-50 rounded-lg border border-purple-200">
                <div className="flex items-center gap-3">
                  <div className={`w-8 h-8 ${currentSubject?.color} rounded-lg flex items-center justify-center text-white`}>
                    {currentSubject?.icon}
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">{selectedTopic.name}</h3>
                    <p className="text-sm text-gray-600">{currentSubject?.name}</p>
                  </div>
                  <Badge className={`ml-auto ${getStatusColor(selectedTopic.status)} border`}>
                    {getStatusText(selectedTopic.status)}
                  </Badge>
                </div>
              </div>
            )}
            
            <div className="min-h-[200px] p-6 bg-white rounded-lg border border-gray-200 shadow-sm">
              {isTyping && aiText === '' && (
                <div className="flex items-center gap-3 text-gray-600">
                  <Loader2 className="w-5 h-5 animate-spin" />
                  <span className="text-sm">AI is analyzing your performance...</span>
                </div>
              )}
              
              {aiText && (
                <div className="space-y-4">
                  <p className="text-gray-800 leading-relaxed whitespace-pre-wrap">
                    {aiText}
                    {isTyping && (
                      <span className="inline-block w-2 h-5 bg-purple-600 ml-1 animate-pulse" />
                    )}
                  </p>
                </div>
              )}
              
              {!isTyping && aiText && (
                <div className="mt-6 pt-4 border-t border-gray-200">
                  <div className="flex gap-3">
                    <Button 
                      className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
                      onClick={closeAIModal}
                    >
                      Generate Practice Set
                    </Button>
                    <Button variant="outline" onClick={closeAIModal}>
                      Close
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}