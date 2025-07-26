import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from '../components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card'
import { Badge } from '../components/ui/badge'
import { Progress } from '../components/ui/progress'
import { 
  ArrowLeft,
  CheckCircle,
  Trophy,
  Target,
  Clock,
  User,
  BookOpen,
  Calculator,
  Brain,
  Puzzle,
  TrendingUp,
  BarChart3,
  FileText,
  Eye,
  Calendar,
  Award,
  ChevronRight
} from 'lucide-react'

interface CompletedExam {
  id: string
  examId: string
  examTitle: string
  subject: string
  totalQuestions: number
  averageScore: number
  totalAttempts: number
  bestScore: number
  lastAttempted: string
  status: 'excellent' | 'good' | 'needs-improvement'
}

interface ExamAttempt {
  id: string
  attemptNumber: number
  totalMarks: number
  obtainedMarks: number
  percentage: number
  grade: string
  timeTaken: string
  status: 'pass' | 'fail'
  omrFileName: string
  createdAt: string
}

// Mock data - in real app this would come from database
const completedExams: CompletedExam[] = [
  {
    id: 'comp_math_001',
    examId: 'math-001',
    examTitle: 'Mathematics Practice Paper 1',
    subject: 'Mathematics',
    totalQuestions: 25,
    averageScore: 80,
    totalAttempts: 3,
    bestScore: 88,
    lastAttempted: '2 days ago',
    status: 'excellent'
  },
  {
    id: 'comp_eng_001',
    examId: 'eng-001',
    examTitle: 'English Comprehension Test',
    subject: 'English',
    totalQuestions: 20,
    averageScore: 80,
    totalAttempts: 2,
    bestScore: 85,
    lastAttempted: '1 week ago',
    status: 'excellent'
  },
  {
    id: 'comp_vr_001',
    examId: 'vr-001',
    examTitle: 'Verbal Reasoning Challenge',
    subject: 'Verbal Reasoning',
    totalQuestions: 30,
    averageScore: 65,
    totalAttempts: 2,
    bestScore: 70,
    lastAttempted: '3 days ago',
    status: 'good'
  },
  {
    id: 'comp_nvr_001',
    examId: 'nvr-001',
    examTitle: 'Non-Verbal Patterns Test',
    subject: 'Non-Verbal Reasoning',
    totalQuestions: 35,
    averageScore: 57,
    totalAttempts: 1,
    bestScore: 57,
    lastAttempted: '5 days ago',
    status: 'needs-improvement'
  }
]

const mockExamAttempts: { [key: string]: ExamAttempt[] } = {
  'comp_math_001': [
    {
      id: 'att_math_001_1',
      attemptNumber: 1,
      totalMarks: 25,
      obtainedMarks: 20,
      percentage: 80,
      grade: 'A',
      timeTaken: '42 minutes',
      status: 'pass',
      omrFileName: 'math_paper1_attempt1.jpg',
      createdAt: '2024-01-15T10:30:00Z'
    },
    {
      id: 'att_math_001_2',
      attemptNumber: 2,
      totalMarks: 25,
      obtainedMarks: 22,
      percentage: 88,
      grade: 'A+',
      timeTaken: '38 minutes',
      status: 'pass',
      omrFileName: 'math_paper1_attempt2.jpg',
      createdAt: '2024-01-18T14:15:00Z'
    },
    {
      id: 'att_math_001_3',
      attemptNumber: 3,
      totalMarks: 25,
      obtainedMarks: 18,
      percentage: 72,
      grade: 'B',
      timeTaken: '45 minutes',
      status: 'pass',
      omrFileName: 'math_paper1_attempt3.jpg',
      createdAt: '2024-01-20T09:45:00Z'
    }
  ],
  'comp_eng_001': [
    {
      id: 'att_eng_001_1',
      attemptNumber: 1,
      totalMarks: 20,
      obtainedMarks: 15,
      percentage: 75,
      grade: 'B',
      timeTaken: '35 minutes',
      status: 'pass',
      omrFileName: 'english_test_attempt1.jpg',
      createdAt: '2024-01-12T11:20:00Z'
    },
    {
      id: 'att_eng_001_2',
      attemptNumber: 2,
      totalMarks: 20,
      obtainedMarks: 17,
      percentage: 85,
      grade: 'A',
      timeTaken: '32 minutes',
      status: 'pass',
      omrFileName: 'english_test_attempt2.jpg',
      createdAt: '2024-01-16T16:30:00Z'
    }
  ],
  'comp_vr_001': [
    {
      id: 'att_vr_001_1',
      attemptNumber: 1,
      totalMarks: 30,
      obtainedMarks: 18,
      percentage: 60,
      grade: 'C',
      timeTaken: '48 minutes',
      status: 'pass',
      omrFileName: 'verbal_reasoning_attempt1.jpg',
      createdAt: '2024-01-14T13:45:00Z'
    },
    {
      id: 'att_vr_001_2',
      attemptNumber: 2,
      totalMarks: 30,
      obtainedMarks: 21,
      percentage: 70,
      grade: 'B',
      timeTaken: '45 minutes',
      status: 'pass',
      omrFileName: 'verbal_reasoning_attempt2.jpg',
      createdAt: '2024-01-19T10:15:00Z'
    }
  ],
  'comp_nvr_001': [
    {
      id: 'att_nvr_001_1',
      attemptNumber: 1,
      totalMarks: 35,
      obtainedMarks: 20,
      percentage: 57,
      grade: 'D',
      timeTaken: '52 minutes',
      status: 'fail',
      omrFileName: 'nonverbal_patterns_attempt1.jpg',
      createdAt: '2024-01-17T15:20:00Z'
    }
  ]
}

export default function CompletedPapersPage() {
  const navigate = useNavigate()
  const [selectedExam, setSelectedExam] = useState<CompletedExam | null>(null)
  const [examAttempts, setExamAttempts] = useState<ExamAttempt[]>([])

  const getSubjectIcon = (subject: string) => {
    switch (subject) {
      case 'Mathematics': return <Calculator className="w-5 h-5" />
      case 'English': return <BookOpen className="w-5 h-5" />
      case 'Verbal Reasoning': return <Brain className="w-5 h-5" />
      case 'Non-Verbal Reasoning': return <Puzzle className="w-5 h-5" />
      default: return <FileText className="w-5 h-5" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'excellent': return 'bg-green-100 text-green-800 border-green-200'
      case 'good': return 'bg-blue-100 text-blue-800 border-blue-200'
      case 'needs-improvement': return 'bg-orange-100 text-orange-800 border-orange-200'
      default: return 'bg-gray-100 text-gray-800 border-gray-200'
    }
  }

  const getGradeColor = (grade: string) => {
    switch (grade) {
      case 'A+':
      case 'A': return 'text-green-600 bg-green-100'
      case 'B': return 'text-blue-600 bg-blue-100'
      case 'C': return 'text-yellow-600 bg-yellow-100'
      case 'D': return 'text-orange-600 bg-orange-100'
      default: return 'text-red-600 bg-red-100'
    }
  }

  const handleViewAllTests = (exam: CompletedExam) => {
    setSelectedExam(exam)
    setExamAttempts(mockExamAttempts[exam.id] || [])
  }

  const handleViewTestReview = (attempt: ExamAttempt) => {
    navigate('/omr-results', {
      state: {
        examId: selectedExam?.examId,
        examTitle: selectedExam?.examTitle,
        subject: selectedExam?.subject,
        totalQuestions: selectedExam?.totalQuestions,
        fileName: attempt.omrFileName,
        attemptId: attempt.id,
        fromCompletedPapers: true
      }
    })
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  if (selectedExam) {
    return (
      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <header className="bg-white shadow-sm border-b">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              <div className="flex items-center gap-4">
                <Button 
                  variant="ghost" 
                  onClick={() => setSelectedExam(null)}
                  className="gap-2"
                >
                  <ArrowLeft className="w-4 h-4" />
                  Back to Completed Papers
                </Button>
                <div className="h-6 w-px bg-gray-300" />
                <h1 className="text-xl font-semibold text-gray-900">All Test Attempts</h1>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                  <User className="w-5 h-5 text-purple-600" />
                </div>
                <span className="text-sm font-medium text-gray-900">Alex Johnson</span>
              </div>
            </div>
          </div>
        </header>

        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Exam Header */}
          <Card className="mb-6">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center text-purple-600">
                    {getSubjectIcon(selectedExam.subject)}
                  </div>
                  <div>
                    <CardTitle className="text-xl">{selectedExam.examTitle}</CardTitle>
                    <CardDescription className="flex items-center gap-4 mt-1">
                      <span>{selectedExam.subject}</span>
                      <span>•</span>
                      <span>{selectedExam.totalQuestions} questions</span>
                      <span>•</span>
                      <span>{selectedExam.totalAttempts} attempts</span>
                    </CardDescription>
                  </div>
                </div>
                <Badge className={`${getStatusColor(selectedExam.status)} border`}>
                  {selectedExam.status === 'excellent' ? 'Excellent Performance' :
                   selectedExam.status === 'good' ? 'Good Performance' : 'Needs Improvement'}
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div className="text-center">
                  <div className="text-2xl font-bold text-purple-600 mb-1">
                    {selectedExam.averageScore}%
                  </div>
                  <p className="text-sm text-gray-600">Average Score</p>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600 mb-1">
                    {selectedExam.bestScore}%
                  </div>
                  <p className="text-sm text-gray-600">Best Score</p>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600 mb-1">
                    {selectedExam.totalAttempts}
                  </div>
                  <p className="text-sm text-gray-600">Total Attempts</p>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-orange-600 mb-1">
                    {examAttempts.filter(a => a.status === 'pass').length}
                  </div>
                  <p className="text-sm text-gray-600">Passed</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* All Test Attempts */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="w-5 h-5 text-purple-600" />
                All Test Attempts
              </CardTitle>
              <CardDescription>
                Detailed view of all your attempts for this exam
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {examAttempts.map((attempt) => (
                  <div
                    key={attempt.id}
                    className="p-4 border rounded-lg hover:shadow-md transition-shadow"
                  >
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-white ${
                          attempt.status === 'pass' ? 'bg-green-500' : 'bg-red-500'
                        }`}>
                          {attempt.attemptNumber}
                        </div>
                        <div>
                          <h3 className="font-semibold text-gray-900">
                            Attempt {attempt.attemptNumber}
                          </h3>
                          <p className="text-sm text-gray-600 flex items-center gap-1">
                            <Calendar className="w-4 h-4" />
                            {formatDate(attempt.createdAt)}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <Badge className={`${getGradeColor(attempt.grade)} border`}>
                          Grade {attempt.grade}
                        </Badge>
                        <Badge variant={attempt.status === 'pass' ? 'default' : 'destructive'}>
                          {attempt.status === 'pass' ? 'PASS' : 'FAIL'}
                        </Badge>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-4">
                      <div className="text-center p-3 bg-gray-50 rounded-lg">
                        <div className="text-lg font-bold text-gray-900">
                          {attempt.percentage}%
                        </div>
                        <p className="text-xs text-gray-600">Score</p>
                      </div>
                      <div className="text-center p-3 bg-gray-50 rounded-lg">
                        <div className="text-lg font-bold text-gray-900">
                          {attempt.obtainedMarks}
                        </div>
                        <p className="text-xs text-gray-600">Obtained</p>
                      </div>
                      <div className="text-center p-3 bg-gray-50 rounded-lg">
                        <div className="text-lg font-bold text-gray-900">
                          {attempt.totalMarks}
                        </div>
                        <p className="text-xs text-gray-600">Total</p>
                      </div>
                      <div className="text-center p-3 bg-gray-50 rounded-lg">
                        <div className="text-lg font-bold text-gray-900">
                          {attempt.timeTaken}
                        </div>
                        <p className="text-xs text-gray-600">Time</p>
                      </div>
                      <div className="text-center p-3 bg-gray-50 rounded-lg">
                        <div className="text-lg font-bold text-gray-900">
                          {attempt.grade}
                        </div>
                        <p className="text-xs text-gray-600">Grade</p>
                      </div>
                    </div>

                    <div className="mb-4">
                      <Progress value={attempt.percentage} className="h-2" />
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="text-sm text-gray-600">
                        <span className="font-medium">OMR File:</span> {attempt.omrFileName}
                      </div>
                      <Button
                        onClick={() => handleViewTestReview(attempt)}
                        className="gap-2"
                        size="sm"
                      >
                        <Eye className="w-4 h-4" />
                        Review Test
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-4">
              <Button 
                variant="ghost" 
                onClick={() => navigate('/dashboard')}
                className="gap-2"
              >
                <ArrowLeft className="w-4 h-4" />
                Back to Dashboard
              </Button>
              <div className="h-6 w-px bg-gray-300" />
              <h1 className="text-xl font-semibold text-gray-900">Completed Papers</h1>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                <User className="w-5 h-5 text-purple-600" />
              </div>
              <span className="text-sm font-medium text-gray-900">Alex Johnson</span>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Completed Papers</h1>
          <p className="text-gray-600">
            Review all your completed exams with OMR answer sheet uploads, track your progress, and analyze your performance.
          </p>
        </div>

        {/* Summary Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6 text-center">
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <CheckCircle className="w-6 h-6 text-purple-600" />
              </div>
              <div className="text-2xl font-bold text-gray-900 mb-1">
                {completedExams.length}
              </div>
              <p className="text-sm text-gray-600">Completed Exams</p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6 text-center">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <Trophy className="w-6 h-6 text-green-600" />
              </div>
              <div className="text-2xl font-bold text-gray-900 mb-1">
                {Math.round(completedExams.reduce((acc, exam) => acc + exam.averageScore, 0) / completedExams.length)}%
              </div>
              <p className="text-sm text-gray-600">Overall Average</p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6 text-center">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <Target className="w-6 h-6 text-blue-600" />
              </div>
              <div className="text-2xl font-bold text-gray-900 mb-1">
                {completedExams.reduce((acc, exam) => acc + exam.totalAttempts, 0)}
              </div>
              <p className="text-sm text-gray-600">Total Attempts</p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6 text-center">
              <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <Award className="w-6 h-6 text-orange-600" />
              </div>
              <div className="text-2xl font-bold text-gray-900 mb-1">
                {Math.max(...completedExams.map(exam => exam.bestScore))}%
              </div>
              <p className="text-sm text-gray-600">Best Score</p>
            </CardContent>
          </Card>
        </div>

        {/* Completed Exams List */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-purple-600" />
              Your Completed Exams
            </CardTitle>
            <CardDescription>
              All exams where you have successfully uploaded OMR answer sheets
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {completedExams.map((exam) => (
                <div
                  key={exam.id}
                  className="p-6 border rounded-lg hover:shadow-md transition-shadow"
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center text-purple-600">
                        {getSubjectIcon(exam.subject)}
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-1">
                          {exam.examTitle}
                        </h3>
                        <div className="flex items-center gap-4 text-sm text-gray-600">
                          <span>{exam.subject}</span>
                          <span>•</span>
                          <span>{exam.totalQuestions} questions</span>
                          <span>•</span>
                          <span>Last attempted {exam.lastAttempted}</span>
                        </div>
                      </div>
                    </div>
                    <Badge className={`${getStatusColor(exam.status)} border`}>
                      {exam.status === 'excellent' ? 'Excellent' :
                       exam.status === 'good' ? 'Good' : 'Needs Work'}
                    </Badge>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                    <div className="text-center p-3 bg-gray-50 rounded-lg">
                      <div className="text-xl font-bold text-purple-600 mb-1">
                        {exam.averageScore}%
                      </div>
                      <p className="text-xs text-gray-600">Average Score</p>
                    </div>
                    <div className="text-center p-3 bg-gray-50 rounded-lg">
                      <div className="text-xl font-bold text-green-600 mb-1">
                        {exam.bestScore}%
                      </div>
                      <p className="text-xs text-gray-600">Best Score</p>
                    </div>
                    <div className="text-center p-3 bg-gray-50 rounded-lg">
                      <div className="text-xl font-bold text-blue-600 mb-1">
                        {exam.totalAttempts}
                      </div>
                      <p className="text-xs text-gray-600">Total Tests</p>
                    </div>
                    <div className="text-center p-3 bg-gray-50 rounded-lg">
                      <div className="text-xl font-bold text-orange-600 mb-1">
                        {mockExamAttempts[exam.id]?.filter(a => a.status === 'pass').length || 0}
                      </div>
                      <p className="text-xs text-gray-600">Passed</p>
                    </div>
                  </div>

                  <div className="mb-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-gray-600">Progress</span>
                      <span className="text-sm font-medium text-gray-900">{exam.averageScore}%</span>
                    </div>
                    <Progress value={exam.averageScore} className="h-2" />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Clock className="w-4 h-4" />
                      <span>Last attempted {exam.lastAttempted}</span>
                    </div>
                    <Button
                      onClick={() => handleViewAllTests(exam)}
                      className="gap-2"
                      size="sm"
                    >
                      View All Tests
                      <ChevronRight className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Performance Insights */}
        <Card className="mt-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="w-5 h-5 text-purple-600" />
              Performance Insights
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-medium text-gray-900 mb-3">Subject Performance</h4>
                <div className="space-y-3">
                  {completedExams.map((exam) => (
                    <div key={exam.id} className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        {getSubjectIcon(exam.subject)}
                        <span className="text-sm text-gray-700">{exam.subject}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-20 bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-purple-600 h-2 rounded-full" 
                            style={{ width: `${exam.averageScore}%` }}
                          />
                        </div>
                        <span className="text-sm font-medium text-gray-900 w-10">
                          {exam.averageScore}%
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <h4 className="font-medium text-gray-900 mb-3">Recent Activity</h4>
                <div className="space-y-3">
                  {completedExams
                    .sort((a, b) => new Date(b.lastAttempted).getTime() - new Date(a.lastAttempted).getTime())
                    .slice(0, 4)
                    .map((exam) => (
                      <div key={exam.id} className="flex items-center gap-3">
                        <div className="w-2 h-2 bg-purple-600 rounded-full" />
                        <div className="flex-1">
                          <p className="text-sm text-gray-900">{exam.examTitle}</p>
                          <p className="text-xs text-gray-600">{exam.lastAttempted}</p>
                        </div>
                        <Badge className={`${getGradeColor(exam.bestScore >= 90 ? 'A+' : exam.bestScore >= 80 ? 'A' : exam.bestScore >= 70 ? 'B' : exam.bestScore >= 60 ? 'C' : 'D')}`}>
                          {exam.bestScore >= 90 ? 'A+' : exam.bestScore >= 80 ? 'A' : exam.bestScore >= 70 ? 'B' : exam.bestScore >= 60 ? 'C' : 'D'}
                        </Badge>
                      </div>
                    ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}