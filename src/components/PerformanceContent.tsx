import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from './ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card'
import { Badge } from './ui/badge'
import { Progress } from './ui/progress'
import { 
  Calculator,
  BookOpen,
  Brain,
  Puzzle,
  Clock,
  Star,
  Award,
  Target,
  TrendingUp,
  CheckCircle,
  ChevronRight,
  Activity,
  ArrowLeft,
  ArrowUp,
  ArrowDown,
  Minus
} from 'lucide-react'

interface SubjectPerformance {
  id: string
  name: string
  icon: React.ReactNode
  color: string
  overallScore: number
  completionRate: number
  timeSpent: string
  questionsAttempted: number
  totalQuestions: number
  accuracy: number
  improvement: number
  lastActivity: string
  strengths: string[]
  weaknesses: string[]
}

const subjectPerformance: SubjectPerformance[] = [
  {
    id: 'mathematics',
    name: 'Mathematics',
    icon: <Calculator className="w-6 h-6" />,
    color: 'bg-blue-500',
    overallScore: 82,
    completionRate: 75,
    timeSpent: '24h 30m',
    questionsAttempted: 1250,
    totalQuestions: 1680,
    accuracy: 82,
    improvement: 8,
    lastActivity: '2 hours ago',
    strengths: ['Algebra', 'BODMAS'],
    weaknesses: ['Probability', 'Area & Perimeter']
  },
  {
    id: 'english',
    name: 'English',
    icon: <BookOpen className="w-6 h-6" />,
    color: 'bg-green-500',
    overallScore: 78,
    completionRate: 60,
    timeSpent: '18h 45m',
    questionsAttempted: 890,
    totalQuestions: 1480,
    accuracy: 78,
    improvement: 5,
    lastActivity: '1 day ago',
    strengths: ['Reading Comprehension', 'Grammar'],
    weaknesses: ['Creative Writing', 'Vocabulary']
  },
  {
    id: 'verbal-reasoning',
    name: 'Verbal Reasoning',
    icon: <Brain className="w-6 h-6" />,
    color: 'bg-purple-500',
    overallScore: 71,
    completionRate: 45,
    timeSpent: '12h 20m',
    questionsAttempted: 560,
    totalQuestions: 1240,
    accuracy: 71,
    improvement: -2,
    lastActivity: '3 days ago',
    strengths: ['Word Relationships', 'Analogies'],
    weaknesses: ['Logical Deduction', 'Code Breaking']
  },
  {
    id: 'non-verbal-reasoning',
    name: 'Non-Verbal Reasoning',
    icon: <Puzzle className="w-6 h-6" />,
    color: 'bg-orange-500',
    overallScore: 65,
    completionRate: 30,
    timeSpent: '8h 15m',
    questionsAttempted: 320,
    totalQuestions: 1080,
    accuracy: 65,
    improvement: 12,
    lastActivity: '5 days ago',
    strengths: ['Pattern Recognition', 'Spatial Reasoning'],
    weaknesses: ['Rotation', 'Reflection']
  }
]

export default function PerformanceContent() {
  const navigate = useNavigate()

  const overallAccuracy = Math.round(subjectPerformance.reduce((acc, subject) => acc + subject.accuracy, 0) / subjectPerformance.length)
  const totalQuestionsAttempted = subjectPerformance.reduce((acc, subject) => acc + subject.questionsAttempted, 0)
  const totalQuestions = subjectPerformance.reduce((acc, subject) => acc + subject.totalQuestions, 0)
  const overallCompletion = Math.round((totalQuestionsAttempted / totalQuestions) * 100)

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

  return (
    <div className="p-6">
      {/* Header Section */}
      <div className="mb-8">
        <div className="flex items-center gap-4 mb-4">
          <Button 
            variant="ghost" 
            size="sm"
            onClick={() => navigate('/dashboard')}
            className="gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Dashboard
          </Button>
        </div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Performance Overview 📊</h1>
        <p className="text-gray-600">Track your progress across all subjects and identify areas for improvement</p>
      </div>

      {/* Overall Performance Summary */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                <Target className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Overall Accuracy</p>
                <p className="text-2xl font-bold text-gray-900">{overallAccuracy}%</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                <CheckCircle className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Completion Rate</p>
                <p className="text-2xl font-bold text-gray-900">{overallCompletion}%</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                <Activity className="w-5 h-5 text-purple-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Questions Attempted</p>
                <p className="text-2xl font-bold text-gray-900">{totalQuestionsAttempted.toLocaleString()}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
                <Clock className="w-5 h-5 text-orange-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Total Study Time</p>
                <p className="text-2xl font-bold text-gray-900">63h 50m</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Subject Performance Cards */}
      <div className="space-y-6">
        <h2 className="text-2xl font-bold text-gray-900">Subject Performance</h2>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {subjectPerformance.map((subject) => (
            <Card key={subject.id} className="hover:shadow-lg transition-shadow cursor-pointer" onClick={() => navigate(`/performance/${subject.id}`)}>
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`w-12 h-12 ${subject.color} rounded-lg flex items-center justify-center text-white`}>
                      {subject.icon}
                    </div>
                    <div>
                      <CardTitle className="text-lg">{subject.name}</CardTitle>
                      <CardDescription>Last activity: {subject.lastActivity}</CardDescription>
                    </div>
                  </div>
                  <ChevronRight className="w-5 h-5 text-gray-400" />
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Key Metrics */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-3 bg-gray-50 rounded-lg">
                    <p className="text-2xl font-bold text-gray-900">{subject.overallScore}%</p>
                    <p className="text-xs text-gray-600">Overall Score</p>
                  </div>
                  <div className="text-center p-3 bg-gray-50 rounded-lg">
                    <p className="text-2xl font-bold text-gray-900">{subject.accuracy}%</p>
                    <p className="text-xs text-gray-600">Accuracy</p>
                  </div>
                </div>

                {/* Progress Bar */}
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-gray-600">Completion Rate</span>
                    <span className="font-medium">{subject.completionRate}%</span>
                  </div>
                  <Progress value={subject.completionRate} />
                </div>

                {/* Additional Stats */}
                <div className="grid grid-cols-3 gap-4 text-center text-sm">
                  <div>
                    <p className="font-semibold text-gray-900">{subject.timeSpent}</p>
                    <p className="text-gray-600">Time Spent</p>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">{subject.questionsAttempted}</p>
                    <p className="text-gray-600">Questions</p>
                  </div>
                  <div className="flex items-center justify-center gap-1">
                    {getImprovementIcon(subject.improvement)}
                    <span className={`font-semibold ${getImprovementColor(subject.improvement)}`}>
                      {Math.abs(subject.improvement)}%
                    </span>
                  </div>
                </div>

                {/* Strengths and Weaknesses */}
                <div className="space-y-3">
                  <div>
                    <p className="text-sm font-medium text-gray-900 mb-2">Strengths</p>
                    <div className="flex flex-wrap gap-1">
                      {subject.strengths.map((strength, index) => (
                        <Badge key={index} variant="secondary" className="text-xs bg-green-100 text-green-700">
                          {strength}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900 mb-2">Areas to Improve</p>
                    <div className="flex flex-wrap gap-1">
                      {subject.weaknesses.map((weakness, index) => (
                        <Badge key={index} variant="secondary" className="text-xs bg-red-100 text-red-700">
                          {weakness}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Action Button */}
                <Button className="w-full mt-4" onClick={(e) => {
                  e.stopPropagation()
                  navigate(`/performance/${subject.id}`)
                }}>
                  View Detailed Analysis
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Quick Insights */}
      <Card className="mt-8">
        <CardHeader>
          <CardTitle>Quick Insights & Recommendations</CardTitle>
          <CardDescription>Personalized suggestions based on your performance</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center p-4 bg-blue-50 rounded-lg">
              <Star className="w-8 h-8 text-blue-600 mx-auto mb-2" />
              <h3 className="font-semibold text-gray-900 mb-1">Strongest Subject</h3>
              <p className="text-sm text-gray-600">Mathematics (82% average)</p>
              <p className="text-xs text-blue-600 mt-1">Keep up the excellent work!</p>
            </div>
            <div className="text-center p-4 bg-orange-50 rounded-lg">
              <TrendingUp className="w-8 h-8 text-orange-600 mx-auto mb-2" />
              <h3 className="font-semibold text-gray-900 mb-1">Most Improved</h3>
              <p className="text-sm text-gray-600">Non-Verbal Reasoning (+12%)</p>
              <p className="text-xs text-orange-600 mt-1">Great progress this month!</p>
            </div>
            <div className="text-center p-4 bg-purple-50 rounded-lg">
              <Target className="w-8 h-8 text-purple-600 mx-auto mb-2" />
              <h3 className="font-semibold text-gray-900 mb-1">Focus Area</h3>
              <p className="text-sm text-gray-600">Verbal Reasoning</p>
              <p className="text-xs text-purple-600 mt-1">Practice logical deduction</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}