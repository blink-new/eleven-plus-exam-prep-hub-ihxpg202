import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Button } from '../../components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card'
import { Badge } from '../../components/ui/badge'
import { Progress } from '../../components/ui/progress'
import { 
  Search,
  Filter,
  TrendingUp,
  TrendingDown,
  BarChart3,
  PieChart,
  Calendar,
  Clock,
  Award,
  Target,
  ChevronLeft,
  Eye,
  Download,
  Share,
  CheckCircle,
  XCircle,
  AlertTriangle
} from 'lucide-react'

interface ExamResult {
  id: string
  examName: string
  subject: string
  score: number
  totalMarks: number
  percentage: number
  timeSpent: number
  totalTime: number
  dateAttempted: string
  status: 'excellent' | 'good' | 'average' | 'poor'
  correctAnswers: number
  incorrectAnswers: number
  unattempted: number
  totalQuestions: number
  difficulty: 'easy' | 'medium' | 'hard'
  topicBreakdown: {
    topic: string
    correct: number
    total: number
    percentage: number
  }[]
}

const mockResults: ExamResult[] = [
  {
    id: '1',
    examName: 'Mathematics Practice Test 1',
    subject: 'Mathematics',
    score: 85,
    totalMarks: 100,
    percentage: 85,
    timeSpent: 55,
    totalTime: 60,
    dateAttempted: '2024-01-20',
    status: 'excellent',
    correctAnswers: 21,
    incorrectAnswers: 3,
    unattempted: 1,
    totalQuestions: 25,
    difficulty: 'medium',
    topicBreakdown: [
      { topic: 'Algebra', correct: 8, total: 10, percentage: 80 },
      { topic: 'Geometry', correct: 7, total: 8, percentage: 87.5 },
      { topic: 'Arithmetic', correct: 6, total: 7, percentage: 85.7 }
    ]
  },
  {
    id: '2',
    examName: 'English Comprehension Challenge',
    subject: 'English',
    score: 78,
    totalMarks: 100,
    percentage: 78,
    timeSpent: 42,
    totalTime: 45,
    dateAttempted: '2024-01-18',
    status: 'good',
    correctAnswers: 16,
    incorrectAnswers: 3,
    unattempted: 1,
    totalQuestions: 20,
    difficulty: 'hard',
    topicBreakdown: [
      { topic: 'Reading Comprehension', correct: 6, total: 8, percentage: 75 },
      { topic: 'Creative Writing', correct: 5, total: 6, percentage: 83.3 },
      { topic: 'Grammar', correct: 5, total: 6, percentage: 83.3 }
    ]
  },
  {
    id: '3',
    examName: 'Verbal Reasoning Assessment',
    subject: 'Verbal Reasoning',
    score: 92,
    totalMarks: 100,
    percentage: 92,
    timeSpent: 48,
    totalTime: 50,
    dateAttempted: '2024-01-15',
    status: 'excellent',
    correctAnswers: 28,
    incorrectAnswers: 2,
    unattempted: 0,
    totalQuestions: 30,
    difficulty: 'medium',
    topicBreakdown: [
      { topic: 'Analogies', correct: 9, total: 10, percentage: 90 },
      { topic: 'Classifications', correct: 10, total: 10, percentage: 100 },
      { topic: 'Logical Sequences', correct: 9, total: 10, percentage: 90 }
    ]
  },
  {
    id: '4',
    examName: 'Non-Verbal Reasoning Quiz',
    subject: 'Non-Verbal Reasoning',
    score: 65,
    totalMarks: 100,
    percentage: 65,
    timeSpent: 38,
    totalTime: 40,
    dateAttempted: '2024-01-12',
    status: 'average',
    correctAnswers: 16,
    incorrectAnswers: 7,
    unattempted: 2,
    totalQuestions: 25,
    difficulty: 'easy',
    topicBreakdown: [
      { topic: 'Pattern Recognition', correct: 6, total: 10, percentage: 60 },
      { topic: 'Spatial Reasoning', correct: 5, total: 8, percentage: 62.5 },
      { topic: 'Sequences', correct: 5, total: 7, percentage: 71.4 }
    ]
  }
]

export default function ResultsPage() {
  const navigate = useNavigate()
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedSubject, setSelectedSubject] = useState('all')
  const [selectedStatus, setSelectedStatus] = useState('all')

  const filteredResults = mockResults.filter(result => {
    const matchesSearch = result.examName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         result.subject.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesSubject = selectedSubject === 'all' || result.subject.toLowerCase() === selectedSubject.toLowerCase()
    const matchesStatus = selectedStatus === 'all' || result.status === selectedStatus
    return matchesSearch && matchesSubject && matchesStatus
  })

  // Calculate overall statistics
  const overallStats = {
    totalExams: mockResults.length,
    averageScore: Math.round(mockResults.reduce((acc, result) => acc + result.percentage, 0) / mockResults.length),
    totalTimeSpent: mockResults.reduce((acc, result) => acc + result.timeSpent, 0),
    excellentCount: mockResults.filter(r => r.status === 'excellent').length,
    goodCount: mockResults.filter(r => r.status === 'good').length,
    averageCount: mockResults.filter(r => r.status === 'average').length,
    poorCount: mockResults.filter(r => r.status === 'poor').length
  }

  // Subject-wise performance
  const subjectPerformance = ['Mathematics', 'English', 'Verbal Reasoning', 'Non-Verbal Reasoning'].map(subject => {
    const subjectResults = mockResults.filter(r => r.subject === subject)
    const avgScore = subjectResults.length > 0 
      ? Math.round(subjectResults.reduce((acc, r) => acc + r.percentage, 0) / subjectResults.length)
      : 0
    return { subject, avgScore, count: subjectResults.length }
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'excellent': return 'bg-green-100 text-green-800 border-green-200'
      case 'good': return 'bg-blue-100 text-blue-800 border-blue-200'
      case 'average': return 'bg-yellow-100 text-yellow-800 border-yellow-200'
      case 'poor': return 'bg-red-100 text-red-800 border-red-200'
      default: return 'bg-gray-100 text-gray-800 border-gray-200'
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'excellent': return <Award className="w-4 h-4" />
      case 'good': return <CheckCircle className="w-4 h-4" />
      case 'average': return <AlertTriangle className="w-4 h-4" />
      case 'poor': return <XCircle className="w-4 h-4" />
      default: return <Target className="w-4 h-4" />
    }
  }

  const getSubjectColor = (subject: string) => {
    switch (subject.toLowerCase()) {
      case 'mathematics': return 'bg-blue-100 text-blue-800 border-blue-200'
      case 'english': return 'bg-green-100 text-green-800 border-green-200'
      case 'verbal reasoning': return 'bg-purple-100 text-purple-800 border-purple-200'
      case 'non-verbal reasoning': return 'bg-orange-100 text-orange-800 border-orange-200'
      default: return 'bg-gray-100 text-gray-800 border-gray-200'
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    })
  }

  const handleViewReport = (resultId: string) => {
    navigate(`/answer-explanation?resultId=${resultId}`)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-sm border-b border-gray-200 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-4">
              <Link to="/dashboard" className="flex items-center gap-2 text-gray-600 hover:text-purple-600 transition-colors">
                <ChevronLeft className="w-5 h-5" />
                <span className="font-medium">Back to Dashboard</span>
              </Link>
            </div>
            <div className="flex items-center gap-4">
              <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                My Results
              </h1>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Overall Performance Overview */}
        <div className="mb-8">
          <Card className="bg-white/70 backdrop-blur-sm border-white/20">
            <CardHeader>
              <CardTitle className="text-xl font-bold text-gray-900">Performance Overview</CardTitle>
              <CardDescription>Your overall exam performance and progress</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
                <div className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-3">
                    <BarChart3 className="w-8 h-8 text-white" />
                  </div>
                  <p className="text-2xl font-bold text-gray-900">{overallStats.totalExams}</p>
                  <p className="text-sm text-gray-600">Total Exams</p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-green-600 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Award className="w-8 h-8 text-white" />
                  </div>
                  <p className="text-2xl font-bold text-gray-900">{overallStats.averageScore}%</p>
                  <p className="text-sm text-gray-600">Average Score</p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Clock className="w-8 h-8 text-white" />
                  </div>
                  <p className="text-2xl font-bold text-gray-900">{Math.round(overallStats.totalTimeSpent / 60)}h</p>
                  <p className="text-sm text-gray-600">Study Time</p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-orange-600 rounded-full flex items-center justify-center mx-auto mb-3">
                    <TrendingUp className="w-8 h-8 text-white" />
                  </div>
                  <p className="text-2xl font-bold text-gray-900">{overallStats.excellentCount}</p>
                  <p className="text-sm text-gray-600">Excellent Results</p>
                </div>
              </div>

              {/* Subject-wise Performance Chart */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Subject-wise Performance</h3>
                <div className="space-y-4">
                  {subjectPerformance.map((subject) => (
                    <div key={subject.subject} className="flex items-center gap-4">
                      <div className="w-32 text-sm font-medium text-gray-700">
                        {subject.subject}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-sm text-gray-600">{subject.count} exams</span>
                          <span className="text-sm font-medium text-gray-900">{subject.avgScore}%</span>
                        </div>
                        <Progress value={subject.avgScore} className="h-2" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Search and Filter Section */}
        <div className="mb-8">
          <div className="bg-white/70 backdrop-blur-sm rounded-xl shadow-sm border border-white/20 p-6">
            <div className="flex flex-col md:flex-row gap-4">
              {/* Search Bar */}
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search results by exam name or subject..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all"
                />
              </div>

              {/* Filters */}
              <div className="flex items-center gap-2">
                <Filter className="w-5 h-5 text-gray-500" />
                <select
                  value={selectedSubject}
                  onChange={(e) => setSelectedSubject(e.target.value)}
                  className="px-4 py-3 border border-gray-200 rounded-xl focus:border-purple-500 focus:ring-2 focus:ring-purple-200 bg-white"
                >
                  <option value="all">All Subjects</option>
                  <option value="mathematics">Mathematics</option>
                  <option value="english">English</option>
                  <option value="verbal reasoning">Verbal Reasoning</option>
                  <option value="non-verbal reasoning">Non-Verbal Reasoning</option>
                </select>

                <select
                  value={selectedStatus}
                  onChange={(e) => setSelectedStatus(e.target.value)}
                  className="px-4 py-3 border border-gray-200 rounded-xl focus:border-purple-500 focus:ring-2 focus:ring-purple-200 bg-white"
                >
                  <option value="all">All Performance</option>
                  <option value="excellent">Excellent</option>
                  <option value="good">Good</option>
                  <option value="average">Average</option>
                  <option value="poor">Poor</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Results List */}
        <div className="space-y-4">
          {filteredResults.map((result) => (
            <Card key={result.id} className="bg-white/70 backdrop-blur-sm border-white/20 hover:shadow-lg transition-all duration-200">
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-3">
                      <CardTitle className="text-lg font-semibold text-gray-900">
                        {result.examName}
                      </CardTitle>
                      <Badge className={`text-xs px-2 py-1 ${getStatusColor(result.status)}`}>
                        <div className="flex items-center gap-1">
                          {getStatusIcon(result.status)}
                          {result.status.charAt(0).toUpperCase() + result.status.slice(1)}
                        </div>
                      </Badge>
                      <Badge className={`text-xs px-2 py-1 ${getSubjectColor(result.subject)}`}>
                        {result.subject}
                      </Badge>
                    </div>

                    {/* Score and Performance */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                      <div className="text-center p-3 bg-gradient-to-r from-green-50 to-green-100 rounded-lg">
                        <p className="text-2xl font-bold text-green-700">{result.percentage}%</p>
                        <p className="text-xs text-green-600">Score</p>
                      </div>
                      <div className="text-center p-3 bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg">
                        <p className="text-2xl font-bold text-blue-700">{result.score}/{result.totalMarks}</p>
                        <p className="text-xs text-blue-600">Marks</p>
                      </div>
                      <div className="text-center p-3 bg-gradient-to-r from-purple-50 to-purple-100 rounded-lg">
                        <p className="text-2xl font-bold text-purple-700">{result.timeSpent}min</p>
                        <p className="text-xs text-purple-600">Time Taken</p>
                      </div>
                      <div className="text-center p-3 bg-gradient-to-r from-orange-50 to-orange-100 rounded-lg">
                        <p className="text-2xl font-bold text-orange-700">{formatDate(result.dateAttempted)}</p>
                        <p className="text-xs text-orange-600">Date</p>
                      </div>
                    </div>

                    {/* Answer Breakdown */}
                    <div className="grid grid-cols-3 gap-4 mb-4">
                      <div className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-green-500" />
                        <span className="text-sm text-gray-600">
                          Correct: <span className="font-medium text-green-600">{result.correctAnswers}</span>
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <XCircle className="w-4 h-4 text-red-500" />
                        <span className="text-sm text-gray-600">
                          Incorrect: <span className="font-medium text-red-600">{result.incorrectAnswers}</span>
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <AlertTriangle className="w-4 h-4 text-yellow-500" />
                        <span className="text-sm text-gray-600">
                          Unattempted: <span className="font-medium text-yellow-600">{result.unattempted}</span>
                        </span>
                      </div>
                    </div>

                    {/* Topic-wise Breakdown */}
                    <div>
                      <h4 className="text-sm font-semibold text-gray-900 mb-2">Topic-wise Performance</h4>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                        {result.topicBreakdown.map((topic, index) => (
                          <div key={index} className="bg-gray-50 rounded-lg p-3">
                            <div className="flex items-center justify-between mb-1">
                              <span className="text-sm font-medium text-gray-700">{topic.topic}</span>
                              <span className="text-sm text-gray-600">{topic.percentage.toFixed(1)}%</span>
                            </div>
                            <Progress value={topic.percentage} className="h-1.5" />
                            <p className="text-xs text-gray-500 mt-1">
                              {topic.correct}/{topic.total} correct
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="ml-6 flex flex-col gap-2">
                    <Button 
                      size="sm" 
                      className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
                      onClick={() => handleViewReport(result.id)}
                    >
                      <Eye className="w-4 h-4 mr-2" />
                      View Report
                    </Button>
                    <Button size="sm" variant="outline">
                      <Download className="w-4 h-4 mr-2" />
                      Download
                    </Button>
                    <Button size="sm" variant="outline">
                      <Share className="w-4 h-4 mr-2" />
                      Share
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Empty State */}
        {filteredResults.length === 0 && (
          <div className="text-center py-12">
            <div className="w-24 h-24 bg-gradient-to-r from-purple-100 to-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <BarChart3 className="w-12 h-12 text-purple-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No Results Found</h3>
            <p className="text-gray-600 mb-4">
              {searchTerm || selectedSubject !== 'all' || selectedStatus !== 'all'
                ? 'Try adjusting your search or filter criteria.' 
                : 'You have no exam results yet.'}
            </p>
            <Button className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700">
              <Target className="w-4 h-4 mr-2" />
              Take Your First Exam
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}