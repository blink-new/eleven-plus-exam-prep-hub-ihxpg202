import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from '../../components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card'
import { Badge } from '../../components/ui/badge'
import { Progress } from '../../components/ui/progress'
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
  ChevronRight,
  Users,
  GraduationCap,
  Search,
  Filter,
  Download,
  Edit,
  MessageSquare,
  AlertCircle,
  Star,
  Bell,
  MoreVertical,
  Plus
} from 'lucide-react'

interface AssignedExam {
  id: string
  examTitle: string
  assignedClass: string
  subject: string
  totalSubmissions: number
  pendingEvaluations: number
  completedEvaluations: number
  completionDate: string
  averageScore: number
  status: 'evaluation-pending' | 'partially-graded' | 'fully-graded'
  dueDate: string
  priority: 'high' | 'medium' | 'low'
}

interface StudentSubmission {
  id: string
  studentName: string
  studentEmail: string
  submissionDate: string
  score?: number
  grade?: string
  status: 'pending' | 'graded' | 'reviewed'
  timeSpent: string
  attempts: number
}

// Mock data - in real app this would come from database
const assignedExams: AssignedExam[] = [
  {
    id: 'exam_001',
    examTitle: 'Mathematics Practice Test 5',
    assignedClass: 'Advanced Mathematics',
    subject: 'Mathematics',
    totalSubmissions: 22,
    pendingEvaluations: 5,
    completedEvaluations: 17,
    completionDate: '2024-01-20',
    averageScore: 84,
    status: 'partially-graded',
    dueDate: 'Today',
    priority: 'high'
  },
  {
    id: 'exam_002',
    examTitle: 'English Comprehension Quiz',
    assignedClass: 'English Comprehension',
    subject: 'English',
    totalSubmissions: 15,
    pendingEvaluations: 0,
    completedEvaluations: 15,
    completionDate: '2024-01-18',
    averageScore: 78,
    status: 'fully-graded',
    dueDate: 'Completed',
    priority: 'medium'
  },
  {
    id: 'exam_003',
    examTitle: 'Verbal Reasoning Challenge',
    assignedClass: 'Verbal Reasoning Workshop',
    subject: 'Verbal Reasoning',
    totalSubmissions: 12,
    pendingEvaluations: 12,
    completedEvaluations: 0,
    completionDate: '2024-01-19',
    averageScore: 0,
    status: 'evaluation-pending',
    dueDate: 'Tomorrow',
    priority: 'high'
  },
  {
    id: 'exam_004',
    examTitle: 'Non-Verbal Patterns Test',
    assignedClass: 'Non-Verbal Patterns',
    subject: 'Non-Verbal Reasoning',
    totalSubmissions: 8,
    pendingEvaluations: 2,
    completedEvaluations: 6,
    completionDate: '2024-01-17',
    averageScore: 72,
    status: 'partially-graded',
    dueDate: 'In 2 days',
    priority: 'low'
  }
]

const mockStudentSubmissions: { [key: string]: StudentSubmission[] } = {
  'exam_001': [
    {
      id: 'sub_001',
      studentName: 'Emma Thompson',
      studentEmail: 'emma.thompson@email.com',
      submissionDate: '2024-01-20T10:30:00Z',
      score: 85,
      grade: 'A',
      status: 'graded',
      timeSpent: '42 minutes',
      attempts: 1
    },
    {
      id: 'sub_002',
      studentName: 'James Wilson',
      studentEmail: 'james.wilson@email.com',
      submissionDate: '2024-01-20T14:15:00Z',
      status: 'pending',
      timeSpent: '38 minutes',
      attempts: 1
    },
    {
      id: 'sub_003',
      studentName: 'Sophie Chen',
      studentEmail: 'sophie.chen@email.com',
      submissionDate: '2024-01-20T09:45:00Z',
      score: 92,
      grade: 'A+',
      status: 'graded',
      timeSpent: '35 minutes',
      attempts: 2
    }
  ]
}

export default function TeacherCompletedPapersPage() {
  const navigate = useNavigate()
  const [selectedExam, setSelectedExam] = useState<AssignedExam | null>(null)
  const [studentSubmissions, setStudentSubmissions] = useState<StudentSubmission[]>([])
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [subjectFilter, setSubjectFilter] = useState('all')
  const [sortBy, setSortBy] = useState('date')

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
      case 'evaluation-pending': return 'bg-red-100 text-red-800 border-red-200'
      case 'partially-graded': return 'bg-yellow-100 text-yellow-800 border-yellow-200'
      case 'fully-graded': return 'bg-green-100 text-green-800 border-green-200'
      default: return 'bg-gray-100 text-gray-800 border-gray-200'
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800 border-red-200'
      case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200'
      case 'low': return 'bg-green-100 text-green-800 border-green-200'
      default: return 'bg-gray-100 text-gray-800 border-gray-200'
    }
  }

  const getSubmissionStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-orange-100 text-orange-800 border-orange-200'
      case 'graded': return 'bg-green-100 text-green-800 border-green-200'
      case 'reviewed': return 'bg-blue-100 text-blue-800 border-blue-200'
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

  const handleViewSubmissions = (exam: AssignedExam) => {
    setSelectedExam(exam)
    setStudentSubmissions(mockStudentSubmissions[exam.id] || [])
  }

  const handleGradeSubmission = (submission: StudentSubmission) => {
    // Navigate to grading interface
    navigate('/grade-submission', {
      state: {
        examId: selectedExam?.id,
        examTitle: selectedExam?.examTitle,
        studentId: submission.id,
        studentName: submission.studentName,
        submissionId: submission.id
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

  const filteredExams = assignedExams.filter(exam => {
    const matchesSearch = exam.examTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         exam.assignedClass.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === 'all' || exam.status === statusFilter
    const matchesSubject = subjectFilter === 'all' || exam.subject === subjectFilter
    return matchesSearch && matchesStatus && matchesSubject
  })

  if (selectedExam) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
        {/* Header */}
        <header className="bg-white/80 backdrop-blur-sm shadow-sm border-b">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              <div className="flex items-center gap-4">
                <Button 
                  variant="ghost" 
                  onClick={() => setSelectedExam(null)}
                  className="gap-2"
                >
                  <ArrowLeft className="w-4 h-4" />
                  Back to Assigned Exams
                </Button>
                <div className="h-6 w-px bg-gray-300" />
                <h1 className="text-xl font-semibold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                  Student Submissions
                </h1>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-gradient-to-r from-purple-100 to-blue-100 rounded-full flex items-center justify-center">
                  <GraduationCap className="w-5 h-5 text-purple-600" />
                </div>
                <span className="text-sm font-medium text-gray-900">Alex Johnson</span>
              </div>
            </div>
          </div>
        </header>

        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Exam Header */}
          <Card className="mb-6 bg-white/80 backdrop-blur-sm border-0 shadow-lg">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-purple-100 to-blue-100 rounded-xl flex items-center justify-center">
                    {getSubjectIcon(selectedExam.subject)}
                  </div>
                  <div>
                    <CardTitle className="text-xl">{selectedExam.examTitle}</CardTitle>
                    <CardDescription className="flex items-center gap-4 mt-1">
                      <span>{selectedExam.assignedClass}</span>
                      <span>•</span>
                      <span>{selectedExam.subject}</span>
                      <span>•</span>
                      <span>{selectedExam.totalSubmissions} submissions</span>
                    </CardDescription>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Badge className={`${getStatusColor(selectedExam.status)} border`}>
                    {selectedExam.status === 'evaluation-pending' ? 'Evaluation Pending' :
                     selectedExam.status === 'partially-graded' ? 'Partially Graded' : 'Fully Graded'}
                  </Badge>
                  <Badge className={`${getPriorityColor(selectedExam.priority)} border`}>
                    {selectedExam.priority.toUpperCase()}
                  </Badge>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div className="text-center">
                  <div className="text-2xl font-bold text-purple-600 mb-1">
                    {selectedExam.totalSubmissions}
                  </div>
                  <p className="text-sm text-gray-600">Total Submissions</p>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-orange-600 mb-1">
                    {selectedExam.pendingEvaluations}
                  </div>
                  <p className="text-sm text-gray-600">Pending Evaluations</p>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600 mb-1">
                    {selectedExam.completedEvaluations}
                  </div>
                  <p className="text-sm text-gray-600">Completed</p>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600 mb-1">
                    {selectedExam.averageScore || 'N/A'}%
                  </div>
                  <p className="text-sm text-gray-600">Average Score</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Student Submissions */}
          <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <Users className="w-5 h-5 text-purple-600" />
                  Student Submissions
                </CardTitle>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">
                    <Download className="w-4 h-4 mr-2" />
                    Export Results
                  </Button>
                  <Button size="sm" className="bg-purple-600 hover:bg-purple-700">
                    <MessageSquare className="w-4 h-4 mr-2" />
                    Message Class
                  </Button>
                </div>
              </div>
              <CardDescription>
                Review and grade individual student submissions
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {studentSubmissions.map((submission) => (
                  <div
                    key={submission.id}
                    className="p-4 border border-gray-200 rounded-xl hover:shadow-md transition-shadow"
                  >
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-gradient-to-r from-purple-100 to-blue-100 rounded-full flex items-center justify-center">
                          <User className="w-5 h-5 text-purple-600" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-gray-900">
                            {submission.studentName}
                          </h3>
                          <p className="text-sm text-gray-600">{submission.studentEmail}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        {submission.grade && (
                          <Badge className={`${getGradeColor(submission.grade)} border`}>
                            Grade {submission.grade}
                          </Badge>
                        )}
                        <Badge className={`${getSubmissionStatusColor(submission.status)} border`}>
                          {submission.status.toUpperCase()}
                        </Badge>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                      <div className="text-center p-3 bg-gray-50 rounded-lg">
                        <div className="text-lg font-bold text-gray-900">
                          {submission.score || 'N/A'}%
                        </div>
                        <p className="text-xs text-gray-600">Score</p>
                      </div>
                      <div className="text-center p-3 bg-gray-50 rounded-lg">
                        <div className="text-lg font-bold text-gray-900">
                          {submission.timeSpent}
                        </div>
                        <p className="text-xs text-gray-600">Time Spent</p>
                      </div>
                      <div className="text-center p-3 bg-gray-50 rounded-lg">
                        <div className="text-lg font-bold text-gray-900">
                          {submission.attempts}
                        </div>
                        <p className="text-xs text-gray-600">Attempts</p>
                      </div>
                      <div className="text-center p-3 bg-gray-50 rounded-lg">
                        <div className="text-lg font-bold text-gray-900">
                          {formatDate(submission.submissionDate).split(',')[0]}
                        </div>
                        <p className="text-xs text-gray-600">Submitted</p>
                      </div>
                    </div>

                    {submission.score && (
                      <div className="mb-4">
                        <Progress value={submission.score} className="h-2" />
                      </div>
                    )}

                    <div className="flex items-center justify-between">
                      <div className="text-sm text-gray-600">
                        <span className="font-medium">Submitted:</span> {formatDate(submission.submissionDate)}
                      </div>
                      <div className="flex gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleGradeSubmission(submission)}
                        >
                          <Eye className="w-4 h-4 mr-2" />
                          {submission.status === 'pending' ? 'Grade' : 'Review'}
                        </Button>
                        {submission.status === 'graded' && (
                          <Button
                            variant="outline"
                            size="sm"
                          >
                            <MessageSquare className="w-4 h-4 mr-2" />
                            Feedback
                          </Button>
                        )}
                      </div>
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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm shadow-sm border-b">
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
              <h1 className="text-xl font-semibold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                Assigned Exams & Evaluations
              </h1>
            </div>
            <div className="flex items-center gap-3">
              <Button variant="ghost" size="sm">
                <Bell className="w-5 h-5" />
                <Badge className="ml-1 bg-red-100 text-red-800 text-xs px-1.5 py-0.5">5</Badge>
              </Button>
              <div className="w-8 h-8 bg-gradient-to-r from-purple-100 to-blue-100 rounded-full flex items-center justify-center">
                <GraduationCap className="w-5 h-5 text-purple-600" />
              </div>
              <span className="text-sm font-medium text-gray-900">Alex Johnson</span>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent mb-2">
            Assigned Exams & Evaluations
          </h1>
          <p className="text-gray-600">
            Review and grade exams that you have assigned to your classes. Track submission rates and provide feedback to students.
          </p>
        </div>

        {/* Summary Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
            <CardContent className="p-6 text-center">
              <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-purple-600 rounded-xl flex items-center justify-center mx-auto mb-3 shadow-lg">
                <FileText className="w-6 h-6 text-white" />
              </div>
              <div className="text-2xl font-bold text-gray-900 mb-1">
                {assignedExams.length}
              </div>
              <p className="text-sm text-gray-600">Total Assigned Exams</p>
            </CardContent>
          </Card>

          <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
            <CardContent className="p-6 text-center">
              <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-orange-600 rounded-xl flex items-center justify-center mx-auto mb-3 shadow-lg">
                <AlertCircle className="w-6 h-6 text-white" />
              </div>
              <div className="text-2xl font-bold text-gray-900 mb-1">
                {assignedExams.reduce((acc, exam) => acc + exam.pendingEvaluations, 0)}
              </div>
              <p className="text-sm text-gray-600">Pending Evaluations</p>
            </CardContent>
          </Card>

          <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
            <CardContent className="p-6 text-center">
              <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-green-600 rounded-xl flex items-center justify-center mx-auto mb-3 shadow-lg">
                <CheckCircle className="w-6 h-6 text-white" />
              </div>
              <div className="text-2xl font-bold text-gray-900 mb-1">
                {assignedExams.reduce((acc, exam) => acc + exam.totalSubmissions, 0)}
              </div>
              <p className="text-sm text-gray-600">Total Submissions</p>
            </CardContent>
          </Card>

          <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
            <CardContent className="p-6 text-center">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl flex items-center justify-center mx-auto mb-3 shadow-lg">
                <Trophy className="w-6 h-6 text-white" />
              </div>
              <div className="text-2xl font-bold text-gray-900 mb-1">
                {Math.round(assignedExams.filter(e => e.averageScore > 0).reduce((acc, exam) => acc + exam.averageScore, 0) / assignedExams.filter(e => e.averageScore > 0).length) || 0}%
              </div>
              <p className="text-sm text-gray-600">Average Score</p>
            </CardContent>
          </Card>
        </div>

        {/* Assigned Exams List */}
        <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="w-5 h-5 text-purple-600" />
              Your Assigned Exams
            </CardTitle>
            <CardDescription>
              Exams you have assigned to your classes with evaluation status
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {filteredExams.map((exam) => (
                <div
                  key={exam.id}
                  className="p-6 border border-gray-200 rounded-xl hover:shadow-md transition-shadow"
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-gradient-to-r from-purple-100 to-blue-100 rounded-xl flex items-center justify-center">
                        {getSubjectIcon(exam.subject)}
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-1">
                          {exam.examTitle}
                        </h3>
                        <div className="flex items-center gap-4 text-sm text-gray-600">
                          <span>{exam.assignedClass}</span>
                          <span>•</span>
                          <span>{exam.subject}</span>
                          <span>•</span>
                          <span>Due: {exam.dueDate}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge className={`${getPriorityColor(exam.priority)} border`}>
                        {exam.priority.toUpperCase()}
                      </Badge>
                      <Badge className={`${getStatusColor(exam.status)} border`}>
                        {exam.status === 'evaluation-pending' ? 'Evaluation Pending' :
                         exam.status === 'partially-graded' ? 'Partially Graded' : 'Fully Graded'}
                      </Badge>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                    <div className="text-center p-3 bg-gray-50 rounded-lg">
                      <div className="text-xl font-bold text-purple-600 mb-1">
                        {exam.totalSubmissions}
                      </div>
                      <p className="text-xs text-gray-600">Total Submissions</p>
                    </div>
                    <div className="text-center p-3 bg-gray-50 rounded-lg">
                      <div className="text-xl font-bold text-orange-600 mb-1">
                        {exam.pendingEvaluations}
                      </div>
                      <p className="text-xs text-gray-600">Pending Evaluations</p>
                    </div>
                    <div className="text-center p-3 bg-gray-50 rounded-lg">
                      <div className="text-xl font-bold text-green-600 mb-1">
                        {exam.completedEvaluations}
                      </div>
                      <p className="text-xs text-gray-600">Completed</p>
                    </div>
                    <div className="text-center p-3 bg-gray-50 rounded-lg">
                      <div className="text-xl font-bold text-blue-600 mb-1">
                        {exam.averageScore || 'N/A'}%
                      </div>
                      <p className="text-xs text-gray-600">Average Score</p>
                    </div>
                  </div>

                  <div className="mb-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-gray-600">Evaluation Progress</span>
                      <span className="text-sm font-medium text-gray-900">
                        {Math.round((exam.completedEvaluations / exam.totalSubmissions) * 100)}%
                      </span>
                    </div>
                    <Progress value={(exam.completedEvaluations / exam.totalSubmissions) * 100} className="h-2" />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Calendar className="w-4 h-4" />
                      <span>Completed: {exam.completionDate}</span>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleViewSubmissions(exam)}
                      >
                        <Eye className="w-4 h-4 mr-2" />
                        Review Submissions
                      </Button>
                      <Button
                        size="sm"
                        className="bg-purple-600 hover:bg-purple-700"
                        disabled={exam.pendingEvaluations === 0}
                      >
                        <Edit className="w-4 h-4 mr-2" />
                        Grade ({exam.pendingEvaluations})
                      </Button>
                    </div>
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