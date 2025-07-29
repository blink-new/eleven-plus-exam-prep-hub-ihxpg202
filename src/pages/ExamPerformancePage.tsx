import { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { Button } from '../components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card'
import { Badge } from '../components/ui/badge'
import { Progress } from '../components/ui/progress'
import { 
  ArrowLeft,
  User,
  Clock,
  Target,
  Award,
  CheckCircle,
  XCircle,
  AlertCircle,
  BookOpen,
  Calculator,
  Brain,
  Puzzle,
  TrendingUp,
  TrendingDown,
  BarChart3,
  PieChart,
  Download,
  Share,
  RefreshCw
} from 'lucide-react'

interface Question {
  id: string
  questionNumber: number
  question: string
  options: string[]
  correctAnswer: number
  studentAnswer?: number
  isCorrect: boolean
  topic: string
  difficulty: 'Easy' | 'Medium' | 'Hard'
  timeSpent: number
}

interface ExamPerformance {
  id: string
  studentId: string
  studentName: string
  examId: string
  examTitle: string
  subject: string
  totalQuestions: number
  correctAnswers: number
  incorrectAnswers: number
  unattempted: number
  totalScore: number
  percentage: number
  timeAllotted: number
  timeSpent: number
  attemptDate: string
  questions: Question[]
  topicBreakdown: {
    topic: string
    total: number
    correct: number
    percentage: number
  }[]
}

const mockPerformance: ExamPerformance = {
  id: 'perf001',
  studentId: 'std001',
  studentName: 'Emma Thompson',
  examId: 'exam001',
  examTitle: 'Mathematics Practice Paper 1',
  subject: 'Mathematics',
  totalQuestions: 25,
  correctAnswers: 18,
  incorrectAnswers: 5,
  unattempted: 2,
  totalScore: 72,
  percentage: 72,
  timeAllotted: 45,
  timeSpent: 42,
  attemptDate: '2024-01-20T10:30:00Z',
  questions: [
    {
      id: 'q1',
      questionNumber: 1,
      question: 'What is 15 + 27?',
      options: ['40', '42', '44', '46'],
      correctAnswer: 1,
      studentAnswer: 1,
      isCorrect: true,
      topic: 'Addition',
      difficulty: 'Easy',
      timeSpent: 45
    },
    {
      id: 'q2',
      questionNumber: 2,
      question: 'Solve: 8 × 7 = ?',
      options: ['54', '56', '58', '60'],
      correctAnswer: 1,
      studentAnswer: 0,
      isCorrect: false,
      topic: 'Multiplication',
      difficulty: 'Easy',
      timeSpent: 60
    },
    {
      id: 'q3',
      questionNumber: 3,
      question: 'What is the area of a rectangle with length 8cm and width 5cm?',
      options: ['35 cm²', '40 cm²', '45 cm²', '50 cm²'],
      correctAnswer: 1,
      studentAnswer: 1,
      isCorrect: true,
      topic: 'Area & Perimeter',
      difficulty: 'Medium',
      timeSpent: 90
    },
    {
      id: 'q4',
      questionNumber: 4,
      question: 'Simplify: 24 ÷ 6 + 3 × 2',
      options: ['10', '12', '14', '16'],
      correctAnswer: 0,
      studentAnswer: undefined,
      isCorrect: false,
      topic: 'BODMAS',
      difficulty: 'Hard',
      timeSpent: 0
    },
    {
      id: 'q5',
      questionNumber: 5,
      question: 'What is 3/4 as a decimal?',
      options: ['0.25', '0.5', '0.75', '1.0'],
      correctAnswer: 2,
      studentAnswer: 2,
      isCorrect: true,
      topic: 'Fractions & Decimals',
      difficulty: 'Medium',
      timeSpent: 75
    }
  ],
  topicBreakdown: [
    { topic: 'Addition', total: 5, correct: 4, percentage: 80 },
    { topic: 'Multiplication', total: 4, correct: 2, percentage: 50 },
    { topic: 'Area & Perimeter', total: 6, correct: 5, percentage: 83 },
    { topic: 'BODMAS', total: 4, correct: 3, percentage: 75 },
    { topic: 'Fractions & Decimals', total: 6, correct: 4, percentage: 67 }
  ]
}

export default function ExamPerformancePage() {
  const { assignmentId } = useParams()
  const navigate = useNavigate()
  const [performance] = useState<ExamPerformance>(mockPerformance)
  const [selectedView, setSelectedView] = useState<'overview' | 'questions' | 'topics'>('overview')

  const getSubjectIcon = (subject: string) => {
    switch (subject) {
      case 'Mathematics':
        return <Calculator className="w-5 h-5" />
      case 'English':
        return <BookOpen className="w-5 h-5" />
      case 'Verbal Reasoning':
        return <Brain className="w-5 h-5" />
      case 'Non-Verbal Reasoning':
        return <Puzzle className="w-5 h-5" />
      default:
        return <BookOpen className="w-5 h-5" />
    }
  }

  const getGradeInfo = (percentage: number) => {
    if (percentage >= 90) return { grade: 'A+', color: 'text-green-600', bg: 'bg-green-100' }
    if (percentage >= 80) return { grade: 'A', color: 'text-green-600', bg: 'bg-green-100' }
    if (percentage >= 70) return { grade: 'B', color: 'text-blue-600', bg: 'bg-blue-100' }
    if (percentage >= 60) return { grade: 'C', color: 'text-yellow-600', bg: 'bg-yellow-100' }
    if (percentage >= 50) return { grade: 'D', color: 'text-orange-600', bg: 'bg-orange-100' }
    return { grade: 'F', color: 'text-red-600', bg: 'bg-red-100' }
  }

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Easy':
        return 'bg-green-100 text-green-800'
      case 'Medium':
        return 'bg-yellow-100 text-yellow-800'
      case 'Hard':
        return 'bg-red-100 text-red-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const gradeInfo = getGradeInfo(performance.percentage)

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button 
                variant="ghost" 
                size="sm"
                onClick={() => navigate(`/students/${performance.studentId}`)}
                className="gap-2"
              >
                <ArrowLeft className="w-4 h-4" />
                Back to Student
              </Button>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Exam Performance Report</h1>
                <p className="text-gray-600">Detailed analysis of student performance</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" className="gap-2">
                <Download className="w-4 h-4" />
                Download Report
              </Button>
              <Button variant="outline" size="sm" className="gap-2">
                <Share className="w-4 h-4" />
                Share
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="p-6 space-y-6">
        {/* Student & Exam Info */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                  <User className="w-6 h-6 text-purple-600" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-gray-900">{performance.studentName}</h2>
                  <p className="text-gray-600">Student ID: {performance.studentId}</p>
                </div>
              </div>
              <div className="text-right">
                <div className="flex items-center gap-2 mb-1">
                  {getSubjectIcon(performance.subject)}
                  <h3 className="font-semibold text-gray-900">{performance.examTitle}</h3>
                </div>
                <p className="text-sm text-gray-600">
                  Attempted on {new Date(performance.attemptDate).toLocaleDateString()} at {new Date(performance.attemptDate).toLocaleTimeString()}
                </p>
              </div>
            </div>
          </CardHeader>
        </Card>

        {/* Performance Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card>
            <CardContent className="p-6 text-center">
              <div className={`w-16 h-16 ${gradeInfo.bg} rounded-full flex items-center justify-center mx-auto mb-3`}>
                <span className={`text-2xl font-bold ${gradeInfo.color}`}>{gradeInfo.grade}</span>
              </div>
              <h3 className="font-semibold text-gray-900 mb-1">Overall Grade</h3>
              <p className="text-2xl font-bold text-gray-900">{performance.percentage}%</p>
              <p className="text-sm text-gray-600">{performance.correctAnswers}/{performance.totalQuestions} correct</p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6 text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <Clock className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-1">Time Management</h3>
              <p className="text-2xl font-bold text-gray-900">{performance.timeSpent} min</p>
              <p className="text-sm text-gray-600">of {performance.timeAllotted} min allotted</p>
              <Progress 
                value={(performance.timeSpent / performance.timeAllotted) * 100} 
                className="mt-2"
              />
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6 text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <CheckCircle className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-1">Correct Answers</h3>
              <p className="text-2xl font-bold text-green-600">{performance.correctAnswers}</p>
              <p className="text-sm text-gray-600">{Math.round((performance.correctAnswers / performance.totalQuestions) * 100)}% accuracy</p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6 text-center">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <XCircle className="w-8 h-8 text-red-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-1">Incorrect/Skipped</h3>
              <p className="text-2xl font-bold text-red-600">{performance.incorrectAnswers + performance.unattempted}</p>
              <p className="text-sm text-gray-600">{performance.incorrectAnswers} wrong, {performance.unattempted} skipped</p>
            </CardContent>
          </Card>
        </div>

        {/* Navigation Tabs */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-4">
              <Button
                variant={selectedView === 'overview' ? 'default' : 'outline'}
                onClick={() => setSelectedView('overview')}
                className="gap-2"
              >
                <BarChart3 className="w-4 h-4" />
                Overview
              </Button>
              <Button
                variant={selectedView === 'questions' ? 'default' : 'outline'}
                onClick={() => setSelectedView('questions')}
                className="gap-2"
              >
                <BookOpen className="w-4 h-4" />
                Question Analysis
              </Button>
              <Button
                variant={selectedView === 'topics' ? 'default' : 'outline'}
                onClick={() => setSelectedView('topics')}
                className="gap-2"
              >
                <PieChart className="w-4 h-4" />
                Topic Breakdown
              </Button>
            </div>
          </CardHeader>
        </Card>

        {/* Content based on selected view */}
        {selectedView === 'overview' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Performance Summary */}
            <Card>
              <CardHeader>
                <CardTitle>Performance Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Total Questions</span>
                  <span className="font-semibold">{performance.totalQuestions}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Correct Answers</span>
                  <span className="font-semibold text-green-600">{performance.correctAnswers}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Incorrect Answers</span>
                  <span className="font-semibold text-red-600">{performance.incorrectAnswers}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Unattempted</span>
                  <span className="font-semibold text-gray-600">{performance.unattempted}</span>
                </div>
                <div className="border-t pt-4">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-900 font-medium">Final Score</span>
                    <span className="text-xl font-bold text-purple-600">{performance.percentage}%</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Recommendations */}
            <Card>
              <CardHeader>
                <CardTitle>Recommendations</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {performance.percentage >= 80 ? (
                  <div className="flex items-start gap-3 p-3 bg-green-50 rounded-lg">
                    <TrendingUp className="w-5 h-5 text-green-600 mt-0.5" />
                    <div>
                      <h4 className="font-medium text-green-900">Excellent Performance!</h4>
                      <p className="text-sm text-green-700">
                        Great job! Consider moving to more challenging topics or advanced practice papers.
                      </p>
                    </div>
                  </div>
                ) : performance.percentage >= 60 ? (
                  <div className="flex items-start gap-3 p-3 bg-yellow-50 rounded-lg">
                    <AlertCircle className="w-5 h-5 text-yellow-600 mt-0.5" />
                    <div>
                      <h4 className="font-medium text-yellow-900">Good Progress</h4>
                      <p className="text-sm text-yellow-700">
                        You're doing well! Focus on the topics where you made mistakes to improve further.
                      </p>
                    </div>
                  </div>
                ) : (
                  <div className="flex items-start gap-3 p-3 bg-red-50 rounded-lg">
                    <TrendingDown className="w-5 h-5 text-red-600 mt-0.5" />
                    <div>
                      <h4 className="font-medium text-red-900">Needs Improvement</h4>
                      <p className="text-sm text-red-700">
                        Consider reviewing the fundamental concepts and practicing more questions in weak areas.
                      </p>
                    </div>
                  </div>
                )}

                <div className="space-y-2">
                  <h4 className="font-medium text-gray-900">Next Steps:</h4>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• Review incorrect answers and understand the solutions</li>
                    <li>• Practice more questions on weak topics</li>
                    <li>• Work on time management for better completion rate</li>
                    <li>• Take another practice test to track improvement</li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {selectedView === 'questions' && (
          <Card>
            <CardHeader>
              <CardTitle>Question-by-Question Analysis</CardTitle>
              <CardDescription>
                Detailed breakdown of each question with answers and explanations
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {performance.questions.map((question) => (
                  <div key={question.id} className="border rounded-lg p-4">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                          question.isCorrect ? 'bg-green-100' : 'bg-red-100'
                        }`}>
                          {question.isCorrect ? (
                            <CheckCircle className="w-5 h-5 text-green-600" />
                          ) : (
                            <XCircle className="w-5 h-5 text-red-600" />
                          )}
                        </div>
                        <div>
                          <h4 className="font-medium text-gray-900">Question {question.questionNumber}</h4>
                          <div className="flex items-center gap-2 mt-1">
                            <Badge className={getDifficultyColor(question.difficulty)} variant="secondary">
                              {question.difficulty}
                            </Badge>
                            <Badge variant="outline">{question.topic}</Badge>
                            <span className="text-xs text-gray-500">{question.timeSpent}s</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="mb-4">
                      <p className="text-gray-900 mb-3">{question.question}</p>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                        {question.options.map((option, index) => (
                          <div
                            key={index}
                            className={`p-2 rounded border text-sm ${
                              index === question.correctAnswer
                                ? 'bg-green-50 border-green-200 text-green-800'
                                : index === question.studentAnswer
                                ? 'bg-red-50 border-red-200 text-red-800'
                                : 'bg-gray-50 border-gray-200'
                            }`}
                          >
                            <span className="font-medium">{String.fromCharCode(65 + index)}.</span> {option}
                            {index === question.correctAnswer && (
                              <span className="ml-2 text-green-600">✓ Correct</span>
                            )}
                            {index === question.studentAnswer && index !== question.correctAnswer && (
                              <span className="ml-2 text-red-600">✗ Your Answer</span>
                            )}
                          </div>
                        ))}
                      </div>
                      {question.studentAnswer === undefined && (
                        <p className="text-sm text-gray-600 mt-2 italic">Question was not attempted</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {selectedView === 'topics' && (
          <Card>
            <CardHeader>
              <CardTitle>Topic-wise Performance Breakdown</CardTitle>
              <CardDescription>
                Analyze performance across different topics to identify strengths and weaknesses
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {performance.topicBreakdown.map((topic, index) => (
                  <div key={index} className="border rounded-lg p-4">
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="font-medium text-gray-900">{topic.topic}</h4>
                      <div className="flex items-center gap-2">
                        <span className="text-sm text-gray-600">
                          {topic.correct}/{topic.total} correct
                        </span>
                        <Badge className={
                          topic.percentage >= 80 ? 'bg-green-100 text-green-800' :
                          topic.percentage >= 60 ? 'bg-yellow-100 text-yellow-800' :
                          'bg-red-100 text-red-800'
                        }>
                          {topic.percentage}%
                        </Badge>
                      </div>
                    </div>
                    <Progress value={topic.percentage} className="mb-2" />
                    <div className="flex justify-between text-sm text-gray-600">
                      <span>Performance: {topic.percentage >= 80 ? 'Excellent' : topic.percentage >= 60 ? 'Good' : 'Needs Work'}</span>
                      <span>{topic.percentage}% accuracy</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}