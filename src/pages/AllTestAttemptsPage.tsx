import { useState } from 'react'
import { Link, useParams, useNavigate } from 'react-router-dom'
import { Button } from '../components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card'
import { Badge } from '../components/ui/badge'
import { Input } from '../components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select'
import { 
  ArrowLeft,
  User,
  BookOpen,
  Calendar,
  Clock,
  Target,
  Award,
  Eye,
  Download,
  Share,
  Search,
  Filter,
  TrendingUp,
  TrendingDown,
  Minus,
  CheckCircle,
  XCircle,
  AlertCircle
} from 'lucide-react'

interface Student {
  id: string
  fullName: string
  email: string
  avatar?: string
}

interface Exam {
  id: string
  title: string
  subject: string
  totalQuestions: number
  duration: number
  maxScore: number
}

interface TestAttempt {
  id: string
  attemptNumber: number
  startTime: string
  endTime: string
  duration: number // in minutes
  score: number
  percentage: number
  totalQuestions: number
  correctAnswers: number
  incorrectAnswers: number
  unattempted: number
  status: 'Completed' | 'Incomplete' | 'Timed Out'
  grade: string
  timePerQuestion: number // average time per question in seconds
  improvement: 'up' | 'down' | 'same' | null
}

const mockStudent: Student = {
  id: 'std001',
  fullName: 'Emma Thompson',
  email: 'emma.thompson@email.com'
}

const mockExam: Exam = {
  id: 'exam001',
  title: 'Mathematics Practice Paper 1',
  subject: 'Mathematics',
  totalQuestions: 25,
  duration: 45,
  maxScore: 100
}

const mockTestAttempts: TestAttempt[] = [
  {
    id: 'attempt001',
    attemptNumber: 1,
    startTime: '2024-01-20T09:00:00Z',
    endTime: '2024-01-20T09:42:00Z',
    duration: 42,
    score: 75,
    percentage: 75,
    totalQuestions: 25,
    correctAnswers: 18,
    incorrectAnswers: 5,
    unattempted: 2,
    status: 'Completed',
    grade: 'B',
    timePerQuestion: 101,
    improvement: null
  },
  {
    id: 'attempt002',
    attemptNumber: 2,
    startTime: '2024-01-22T14:30:00Z',
    endTime: '2024-01-22T15:15:00Z',
    duration: 45,
    score: 85,
    percentage: 85,
    totalQuestions: 25,
    correctAnswers: 21,
    incorrectAnswers: 3,
    unattempted: 1,
    status: 'Completed',
    grade: 'A-',
    timePerQuestion: 108,
    improvement: 'up'
  },
  {
    id: 'attempt003',
    attemptNumber: 3,
    startTime: '2024-01-25T10:15:00Z',
    endTime: '2024-01-25T10:58:00Z',
    duration: 43,
    score: 92,
    percentage: 92,
    totalQuestions: 25,
    correctAnswers: 23,
    incorrectAnswers: 2,
    unattempted: 0,
    status: 'Completed',
    grade: 'A',
    timePerQuestion: 103,
    improvement: 'up'
  },
  {
    id: 'attempt004',
    attemptNumber: 4,
    startTime: '2024-01-28T16:00:00Z',
    endTime: '2024-01-28T16:38:00Z',
    duration: 38,
    score: 88,
    percentage: 88,
    totalQuestions: 25,
    correctAnswers: 22,
    incorrectAnswers: 3,
    unattempted: 0,
    status: 'Completed',
    grade: 'A-',
    timePerQuestion: 91,
    improvement: 'down'
  }
]

export default function AllTestAttemptsPage() {
  const { studentId, examId } = useParams()
  const navigate = useNavigate()
  const [student] = useState<Student>(mockStudent)
  const [exam] = useState<Exam>(mockExam)
  const [testAttempts] = useState<TestAttempt[]>(mockTestAttempts)
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [sortBy, setSortBy] = useState('newest')

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Completed':
        return <CheckCircle className="w-4 h-4 text-green-500" />
      case 'Incomplete':
        return <AlertCircle className="w-4 h-4 text-yellow-500" />
      case 'Timed Out':
        return <XCircle className="w-4 h-4 text-red-500" />
      default:
        return <XCircle className="w-4 h-4 text-gray-500" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Completed':
        return 'bg-green-100 text-green-800'
      case 'Incomplete':
        return 'bg-yellow-100 text-yellow-800'
      case 'Timed Out':
        return 'bg-red-100 text-red-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const getGradeColor = (grade: string) => {
    if (grade.startsWith('A')) return 'bg-green-100 text-green-800'
    if (grade.startsWith('B')) return 'bg-blue-100 text-blue-800'
    if (grade.startsWith('C')) return 'bg-yellow-100 text-yellow-800'
    if (grade.startsWith('D')) return 'bg-orange-100 text-orange-800'
    return 'bg-red-100 text-red-800'
  }

  const getImprovementIcon = (improvement: string | null) => {
    switch (improvement) {
      case 'up':
        return <TrendingUp className="w-4 h-4 text-green-500" />
      case 'down':
        return <TrendingDown className="w-4 h-4 text-red-500" />
      case 'same':
        return <Minus className="w-4 h-4 text-gray-500" />
      default:
        return null
    }
  }

  const formatDuration = (minutes: number) => {
    const hours = Math.floor(minutes / 60)
    const mins = minutes % 60
    if (hours > 0) {
      return `${hours}h ${mins}m`
    }
    return `${mins}m`
  }

  const formatTimePerQuestion = (seconds: number) => {
    const minutes = Math.floor(seconds / 60)
    const secs = seconds % 60
    if (minutes > 0) {
      return `${minutes}m ${secs}s`
    }
    return `${secs}s`
  }

  // Calculate statistics
  const totalAttempts = testAttempts.length
  const averageScore = Math.round(testAttempts.reduce((sum, attempt) => sum + attempt.percentage, 0) / totalAttempts)
  const bestScore = Math.max(...testAttempts.map(attempt => attempt.percentage))
  const latestScore = testAttempts[testAttempts.length - 1]?.percentage || 0
  const improvementTrend = testAttempts.length >= 2 
    ? latestScore > testAttempts[0].percentage ? 'improving' : 'declining'
    : 'stable'

  // Filter and sort attempts
  const filteredAttempts = testAttempts
    .filter(attempt => statusFilter === 'all' || attempt.status === statusFilter)
    .filter(attempt => 
      attempt.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      attempt.grade.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      switch (sortBy) {
        case 'newest':
          return new Date(b.startTime).getTime() - new Date(a.startTime).getTime()
        case 'oldest':
          return new Date(a.startTime).getTime() - new Date(b.startTime).getTime()
        case 'highest-score':
          return b.percentage - a.percentage
        case 'lowest-score':
          return a.percentage - b.percentage
        default:
          return 0
      }
    })

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
                onClick={() => navigate(`/students/${studentId}`)}
                className="gap-2"
              >
                <ArrowLeft className="w-4 h-4" />
                Back to Student Details
              </Button>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">All Test Attempts</h1>
                <p className="text-gray-600">Track performance across multiple attempts</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="p-6 space-y-6">
        {/* Student and Exam Info */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                  <User className="w-5 h-5 text-purple-600" />
                </div>
                <div>
                  <h3 className="font-bold">{student.fullName}</h3>
                  <p className="text-sm text-gray-600">{student.email}</p>
                </div>
              </CardTitle>
            </CardHeader>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                  <BookOpen className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-bold">{exam.title}</h3>
                  <p className="text-sm text-gray-600">{exam.subject} • {exam.totalQuestions} questions • {exam.duration} min</p>
                </div>
              </CardTitle>
            </CardHeader>
          </Card>
        </div>

        {/* Performance Statistics */}
        <Card>
          <CardHeader>
            <CardTitle>Performance Overview</CardTitle>
            <CardDescription>Summary statistics across all test attempts</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-purple-600">{totalAttempts}</div>
                <div className="text-sm text-gray-600">Total Attempts</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600">{averageScore}%</div>
                <div className="text-sm text-gray-600">Average Score</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-green-600">{bestScore}%</div>
                <div className="text-sm text-gray-600">Best Score</div>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center gap-2">
                  <div className="text-3xl font-bold text-orange-600">{latestScore}%</div>
                  {improvementTrend === 'improving' && <TrendingUp className="w-5 h-5 text-green-500" />}
                  {improvementTrend === 'declining' && <TrendingDown className="w-5 h-5 text-red-500" />}
                </div>
                <div className="text-sm text-gray-600">Latest Score</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Search and Filter */}
        <Card>
          <CardHeader>
            <CardTitle>Test Attempts History</CardTitle>
            <CardDescription>View and analyze all test attempts for this exam</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col md:flex-row gap-4 mb-6">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <Input
                    placeholder="Search attempts..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-48">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="Completed">Completed</SelectItem>
                  <SelectItem value="Incomplete">Incomplete</SelectItem>
                  <SelectItem value="Timed Out">Timed Out</SelectItem>
                </SelectContent>
              </Select>

              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-48">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="newest">Newest First</SelectItem>
                  <SelectItem value="oldest">Oldest First</SelectItem>
                  <SelectItem value="highest-score">Highest Score</SelectItem>
                  <SelectItem value="lowest-score">Lowest Score</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Test Attempts Table */}
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-3 px-4 font-medium text-gray-700">Attempt</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-700">Date & Time</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-700">Duration</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-700">Score</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-700">Grade</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-700">Status</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-700">Performance</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-700">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredAttempts.map((attempt) => (
                    <tr key={attempt.id} className="border-b border-gray-100 hover:bg-gray-50">
                      <td className="py-4 px-4">
                        <div className="flex items-center gap-2">
                          <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                            <span className="text-sm font-medium text-purple-600">#{attempt.attemptNumber}</span>
                          </div>
                          {getImprovementIcon(attempt.improvement)}
                        </div>
                      </td>
                      
                      <td className="py-4 px-4">
                        <div className="space-y-1">
                          <div className="flex items-center gap-2 text-sm">
                            <Calendar className="w-4 h-4 text-gray-500" />
                            {new Date(attempt.startTime).toLocaleDateString()}
                          </div>
                          <div className="text-xs text-gray-600">
                            {new Date(attempt.startTime).toLocaleTimeString()} - {new Date(attempt.endTime).toLocaleTimeString()}
                          </div>
                        </div>
                      </td>
                      
                      <td className="py-4 px-4">
                        <div className="space-y-1">
                          <div className="flex items-center gap-2 text-sm">
                            <Clock className="w-4 h-4 text-gray-500" />
                            {formatDuration(attempt.duration)}
                          </div>
                          <div className="text-xs text-gray-600">
                            Avg: {formatTimePerQuestion(attempt.timePerQuestion)}/q
                          </div>
                        </div>
                      </td>
                      
                      <td className="py-4 px-4">
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <Target className="w-4 h-4 text-green-500" />
                            <span className="font-bold text-lg">{attempt.percentage}%</span>
                          </div>
                          <div className="text-xs text-gray-600">
                            {attempt.score}/{exam.maxScore} points
                          </div>
                        </div>
                      </td>
                      
                      <td className="py-4 px-4">
                        <Badge className={getGradeColor(attempt.grade)}>
                          {attempt.grade}
                        </Badge>
                      </td>
                      
                      <td className="py-4 px-4">
                        <div className="flex items-center gap-2">
                          {getStatusIcon(attempt.status)}
                          <Badge className={getStatusColor(attempt.status)}>
                            {attempt.status}
                          </Badge>
                        </div>
                      </td>
                      
                      <td className="py-4 px-4">
                        <div className="space-y-1 text-xs">
                          <div className="text-green-600">✓ {attempt.correctAnswers} correct</div>
                          <div className="text-red-600">✗ {attempt.incorrectAnswers} incorrect</div>
                          {attempt.unattempted > 0 && (
                            <div className="text-gray-600">— {attempt.unattempted} unattempted</div>
                          )}
                        </div>
                      </td>
                      
                      <td className="py-4 px-4">
                        <div className="flex items-center gap-2">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => navigate(`/exam-performance/${attempt.id}`)}
                            className="gap-1"
                          >
                            <Eye className="w-4 h-4" />
                            Review
                          </Button>
                          
                          <Button
                            size="sm"
                            variant="ghost"
                            className="gap-1"
                          >
                            <Download className="w-4 h-4" />
                          </Button>
                          
                          <Button
                            size="sm"
                            variant="ghost"
                            className="gap-1"
                          >
                            <Share className="w-4 h-4" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              
              {filteredAttempts.length === 0 && (
                <div className="text-center py-12">
                  <BookOpen className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No test attempts found</h3>
                  <p className="text-gray-600">
                    {searchTerm || statusFilter !== 'all'
                      ? 'Try adjusting your search or filter criteria'
                      : 'No test attempts have been recorded for this exam yet'
                    }
                  </p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}