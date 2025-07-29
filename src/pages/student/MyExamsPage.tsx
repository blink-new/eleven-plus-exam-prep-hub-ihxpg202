import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Button } from '../../components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card'
import { Badge } from '../../components/ui/badge'
import { 
  Search,
  Filter,
  Calendar,
  Clock,
  BookOpen,
  Play,
  Pause,
  CheckCircle,
  AlertCircle,
  ChevronLeft,
  FileText,
  Target,
  Timer,
  Award,
  Grid3X3,
  List,
  Download,
  Eye,
  ArrowUpDown
} from 'lucide-react'

interface ExamData {
  id: string
  name: string
  subject: string
  assignedDate: string
  dueDate: string
  status: 'pending' | 'in-progress' | 'completed' | 'overdue'
  duration: number
  totalQuestions: number
  difficulty: 'easy' | 'medium' | 'hard'
  score?: number
  timeSpent?: number
  attempts: number
  maxAttempts: number
  description: string
  topics: string[]
}

const mockExams: ExamData[] = [
  {
    id: '1',
    name: 'Mathematics Practice Test 1',
    subject: 'Mathematics',
    assignedDate: '2024-01-15',
    dueDate: '2024-01-22',
    status: 'pending',
    duration: 60,
    totalQuestions: 25,
    difficulty: 'medium',
    attempts: 0,
    maxAttempts: 3,
    description: 'Comprehensive test covering algebra, geometry, and arithmetic operations.',
    topics: ['Algebra', 'Geometry', 'Arithmetic']
  },
  {
    id: '2',
    name: 'English Comprehension Challenge',
    subject: 'English',
    assignedDate: '2024-01-10',
    dueDate: '2024-01-20',
    status: 'in-progress',
    duration: 45,
    totalQuestions: 20,
    difficulty: 'hard',
    attempts: 1,
    maxAttempts: 2,
    timeSpent: 25,
    description: 'Reading comprehension and creative writing assessment.',
    topics: ['Reading Comprehension', 'Creative Writing', 'Grammar']
  },
  {
    id: '3',
    name: 'Verbal Reasoning Assessment',
    subject: 'Verbal Reasoning',
    assignedDate: '2024-01-05',
    dueDate: '2024-01-18',
    status: 'completed',
    duration: 50,
    totalQuestions: 30,
    difficulty: 'medium',
    score: 85,
    timeSpent: 48,
    attempts: 2,
    maxAttempts: 3,
    description: 'Test your logical thinking and verbal reasoning skills.',
    topics: ['Analogies', 'Classifications', 'Logical Sequences']
  },
  {
    id: '4',
    name: 'Non-Verbal Reasoning Quiz',
    subject: 'Non-Verbal Reasoning',
    assignedDate: '2024-01-08',
    dueDate: '2024-01-16',
    status: 'overdue',
    duration: 40,
    totalQuestions: 25,
    difficulty: 'easy',
    attempts: 0,
    maxAttempts: 2,
    description: 'Pattern recognition and spatial reasoning challenges.',
    topics: ['Pattern Recognition', 'Spatial Reasoning', 'Sequences']
  },
  {
    id: '5',
    name: 'Advanced Mathematics Mock',
    subject: 'Mathematics',
    assignedDate: '2024-01-12',
    dueDate: '2024-01-25',
    status: 'completed',
    duration: 75,
    totalQuestions: 35,
    difficulty: 'hard',
    score: 92,
    timeSpent: 72,
    attempts: 1,
    maxAttempts: 2,
    description: 'Advanced mathematical concepts and problem-solving techniques.',
    topics: ['Advanced Algebra', 'Trigonometry', 'Statistics']
  }
]

export default function MyExamsPage() {
  const navigate = useNavigate()
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedSubject, setSelectedSubject] = useState('all')
  const [selectedStatus, setSelectedStatus] = useState('all')
  const [activeTab, setActiveTab] = useState('all')
  const [viewMode, setViewMode] = useState<'grid' | 'table'>('grid')
  const [sortBy, setSortBy] = useState('date')
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc')

  const filteredAndSortedExams = mockExams
    .filter(exam => {
      const matchesSearch = exam.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           exam.subject.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesSubject = selectedSubject === 'all' || exam.subject.toLowerCase() === selectedSubject.toLowerCase()
      const matchesStatus = selectedStatus === 'all' || exam.status === selectedStatus
      
      // Tab filtering
      const now = new Date()
      const dueDate = new Date(exam.dueDate)
      const matchesTab = activeTab === 'all' || 
                        (activeTab === 'upcoming' && (exam.status === 'pending' || exam.status === 'in-progress')) ||
                        (activeTab === 'past' && (exam.status === 'completed' || exam.status === 'overdue'))
      
      return matchesSearch && matchesSubject && matchesStatus && matchesTab
    })
    .sort((a, b) => {
      let aValue, bValue
      
      switch (sortBy) {
        case 'name':
          aValue = a.name.toLowerCase()
          bValue = b.name.toLowerCase()
          break
        case 'subject':
          aValue = a.subject.toLowerCase()
          bValue = b.subject.toLowerCase()
          break
        case 'date':
          aValue = new Date(a.dueDate).getTime()
          bValue = new Date(b.dueDate).getTime()
          break
        case 'status':
          aValue = a.status
          bValue = b.status
          break
        default:
          aValue = new Date(a.dueDate).getTime()
          bValue = new Date(b.dueDate).getTime()
      }
      
      if (sortOrder === 'asc') {
        return aValue < bValue ? -1 : aValue > bValue ? 1 : 0
      } else {
        return aValue > bValue ? -1 : aValue < bValue ? 1 : 0
      }
    })

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800 border-yellow-200'
      case 'in-progress': return 'bg-blue-100 text-blue-800 border-blue-200'
      case 'completed': return 'bg-green-100 text-green-800 border-green-200'
      case 'overdue': return 'bg-red-100 text-red-800 border-red-200'
      default: return 'bg-gray-100 text-gray-800 border-gray-200'
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending': return <Clock className="w-4 h-4" />
      case 'in-progress': return <Play className="w-4 h-4" />
      case 'completed': return <CheckCircle className="w-4 h-4" />
      case 'overdue': return <AlertCircle className="w-4 h-4" />
      default: return <FileText className="w-4 h-4" />
    }
  }

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return 'bg-green-100 text-green-800 border-green-200'
      case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200'
      case 'hard': return 'bg-red-100 text-red-800 border-red-200'
      default: return 'bg-gray-100 text-gray-800 border-gray-200'
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

  const getDaysUntilDue = (dueDate: string) => {
    const now = new Date()
    const due = new Date(dueDate)
    const diffTime = due.getTime() - now.getTime()
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    
    if (diffDays < 0) return `${Math.abs(diffDays)} days overdue`
    if (diffDays === 0) return 'Due today'
    if (diffDays === 1) return 'Due tomorrow'
    return `${diffDays} days left`
  }

  const handleStartExam = (examId: string) => {
    navigate(`/exam/${examId}`)
  }

  const handleResumeExam = (examId: string) => {
    navigate(`/exam/${examId}?resume=true`)
  }

  const handleViewResults = (examId: string) => {
    navigate(`/omr-results?examId=${examId}`)
  }

  const handleDownloadPDF = (examId: string, examName: string) => {
    // Simulate PDF download
    const link = document.createElement('a')
    link.href = `/api/exams/${examId}/download` // This would be the actual API endpoint
    link.download = `${examName.replace(/\s+/g, '_')}.pdf`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  const handleSort = (field: string) => {
    if (sortBy === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')
    } else {
      setSortBy(field)
      setSortOrder('asc')
    }
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
                My Exams
              </h1>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="bg-white/70 backdrop-blur-sm border-white/20">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg flex items-center justify-center">
                  <FileText className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-gray-900">{mockExams.length}</p>
                  <p className="text-sm text-gray-600">Total Exams</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/70 backdrop-blur-sm border-white/20">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-green-600 rounded-lg flex items-center justify-center">
                  <CheckCircle className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-gray-900">
                    {mockExams.filter(e => e.status === 'completed').length}
                  </p>
                  <p className="text-sm text-gray-600">Completed</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/70 backdrop-blur-sm border-white/20">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gradient-to-r from-yellow-500 to-yellow-600 rounded-lg flex items-center justify-center">
                  <Clock className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-gray-900">
                    {mockExams.filter(e => e.status === 'pending' || e.status === 'in-progress').length}
                  </p>
                  <p className="text-sm text-gray-600">Pending</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/70 backdrop-blur-sm border-white/20">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-purple-600 rounded-lg flex items-center justify-center">
                  <Award className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-gray-900">
                    {Math.round(mockExams.filter(e => e.score).reduce((acc, e) => acc + (e.score || 0), 0) / mockExams.filter(e => e.score).length) || 0}%
                  </p>
                  <p className="text-sm text-gray-600">Avg Score</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Tabs and View Toggle */}
        <div className="mb-6 flex flex-col lg:flex-row gap-4">
          <div className="flex-1">
            <div className="bg-white/70 backdrop-blur-sm rounded-xl shadow-sm border border-white/20 p-1">
              <div className="flex">
                {[
                  { id: 'all', label: 'All Exams', count: mockExams.length },
                  { id: 'upcoming', label: 'Upcoming', count: mockExams.filter(e => e.status === 'pending' || e.status === 'in-progress').length },
                  { id: 'past', label: 'Past Exams', count: mockExams.filter(e => e.status === 'completed' || e.status === 'overdue').length }
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex-1 px-4 py-3 rounded-lg text-sm font-medium transition-all ${
                      activeTab === tab.id
                        ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-sm'
                        : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                    }`}
                  >
                    {tab.label} ({tab.count})
                  </button>
                ))}
              </div>
            </div>
          </div>
          
          {/* View Toggle */}
          <div className="bg-white/70 backdrop-blur-sm rounded-xl shadow-sm border border-white/20 p-1">
            <div className="flex">
              <button
                onClick={() => setViewMode('grid')}
                className={`flex items-center gap-2 px-4 py-3 rounded-lg text-sm font-medium transition-all ${
                  viewMode === 'grid'
                    ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-sm'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                }`}
              >
                <Grid3X3 className="w-4 h-4" />
                Grid View
              </button>
              <button
                onClick={() => setViewMode('table')}
                className={`flex items-center gap-2 px-4 py-3 rounded-lg text-sm font-medium transition-all ${
                  viewMode === 'table'
                    ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-sm'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                }`}
              >
                <List className="w-4 h-4" />
                Table View
              </button>
            </div>
          </div>
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
                  placeholder="Search exams by name or subject..."
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
                  <option value="all">All Status</option>
                  <option value="pending">Pending</option>
                  <option value="in-progress">In Progress</option>
                  <option value="completed">Completed</option>
                  <option value="overdue">Overdue</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Exams List - Grid View */}
        {viewMode === 'grid' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {filteredAndSortedExams.map((exam) => (
              <Card key={exam.id} className="bg-white/70 backdrop-blur-sm border-white/20 hover:shadow-lg transition-all duration-200">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <CardTitle className="text-lg font-semibold text-gray-900">
                          {exam.name}
                        </CardTitle>
                        <Badge className={`text-xs px-2 py-1 ${getStatusColor(exam.status)}`}>
                          <div className="flex items-center gap-1">
                            {getStatusIcon(exam.status)}
                            {exam.status.charAt(0).toUpperCase() + exam.status.slice(1).replace('-', ' ')}
                          </div>
                        </Badge>
                      </div>
                      <div className="flex items-center gap-2 mb-3">
                        <Badge className={`text-xs px-2 py-1 ${getSubjectColor(exam.subject)}`}>
                          {exam.subject}
                        </Badge>
                        <Badge className={`text-xs px-2 py-1 ${getDifficultyColor(exam.difficulty)}`}>
                          {exam.difficulty.charAt(0).toUpperCase() + exam.difficulty.slice(1)}
                        </Badge>
                      </div>
                    </div>
                  </div>

                  <CardDescription className="text-sm text-gray-600 mb-4">
                    {exam.description}
                  </CardDescription>

                  <div className="grid grid-cols-2 gap-4 text-sm mb-4">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-gray-500" />
                      <div>
                        <p className="text-gray-600">Due Date</p>
                        <p className="font-medium text-gray-900">{formatDate(exam.dueDate)}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Timer className="w-4 h-4 text-gray-500" />
                      <div>
                        <p className="text-gray-600">Duration</p>
                        <p className="font-medium text-gray-900">{exam.duration} min</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Target className="w-4 h-4 text-gray-500" />
                      <div>
                        <p className="text-gray-600">Questions</p>
                        <p className="font-medium text-gray-900">{exam.totalQuestions}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-gray-500" />
                      <div>
                        <p className="text-gray-600">Attempts</p>
                        <p className="font-medium text-gray-900">{exam.attempts}/{exam.maxAttempts}</p>
                      </div>
                    </div>
                  </div>

                  {exam.score && (
                    <div className="mb-4">
                      <div className="flex items-center justify-between text-sm mb-1">
                        <span className="text-gray-600">Score</span>
                        <span className="font-medium text-green-600">{exam.score}%</span>
                      </div>
                    </div>
                  )}

                  {/* Action Buttons */}
                  <div className="flex gap-2">
                    {exam.status === 'pending' && (
                      <Button 
                        size="sm" 
                        className="flex-1 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
                        onClick={() => handleStartExam(exam.id)}
                      >
                        <Play className="w-4 h-4 mr-2" />
                        Start Exam
                      </Button>
                    )}
                    {exam.status === 'in-progress' && (
                      <Button 
                        size="sm" 
                        className="flex-1 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"
                        onClick={() => handleResumeExam(exam.id)}
                      >
                        <Pause className="w-4 h-4 mr-2" />
                        Resume
                      </Button>
                    )}
                    {exam.status === 'completed' && (
                      <Button 
                        size="sm" 
                        variant="outline"
                        className="flex-1"
                        onClick={() => handleViewResults(exam.id)}
                      >
                        <Eye className="w-4 h-4 mr-2" />
                        View Results
                      </Button>
                    )}
                    {exam.status === 'overdue' && exam.attempts < exam.maxAttempts && (
                      <Button 
                        size="sm" 
                        variant="outline"
                        className="flex-1 text-red-600 hover:text-red-700 hover:bg-red-50"
                        onClick={() => handleStartExam(exam.id)}
                      >
                        <AlertCircle className="w-4 h-4 mr-2" />
                        Start Late
                      </Button>
                    )}
                    <Button 
                      size="sm" 
                      variant="outline"
                      onClick={() => handleDownloadPDF(exam.id, exam.name)}
                    >
                      <Download className="w-4 h-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {/* Exams List - Table View */}
        {viewMode === 'table' && (
          <div className="bg-white/70 backdrop-blur-sm rounded-xl shadow-sm border border-white/20 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50/80">
                  <tr>
                    <th className="px-6 py-4 text-left">
                      <button
                        onClick={() => handleSort('name')}
                        className="flex items-center gap-2 text-sm font-medium text-gray-900 hover:text-purple-600 transition-colors"
                      >
                        Exam Name
                        <ArrowUpDown className="w-4 h-4" />
                      </button>
                    </th>
                    <th className="px-6 py-4 text-left">
                      <button
                        onClick={() => handleSort('subject')}
                        className="flex items-center gap-2 text-sm font-medium text-gray-900 hover:text-purple-600 transition-colors"
                      >
                        Subject
                        <ArrowUpDown className="w-4 h-4" />
                      </button>
                    </th>
                    <th className="px-6 py-4 text-left">
                      <button
                        onClick={() => handleSort('date')}
                        className="flex items-center gap-2 text-sm font-medium text-gray-900 hover:text-purple-600 transition-colors"
                      >
                        Due Date
                        <ArrowUpDown className="w-4 h-4" />
                      </button>
                    </th>
                    <th className="px-6 py-4 text-left">
                      <button
                        onClick={() => handleSort('status')}
                        className="flex items-center gap-2 text-sm font-medium text-gray-900 hover:text-purple-600 transition-colors"
                      >
                        Status
                        <ArrowUpDown className="w-4 h-4" />
                      </button>
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-medium text-gray-900">Actions</th>
                    <th className="px-6 py-4 text-left text-sm font-medium text-gray-900">PDF</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {filteredAndSortedExams.map((exam, index) => (
                    <tr key={exam.id} className={`hover:bg-gray-50/50 transition-colors ${index % 2 === 0 ? 'bg-white/50' : 'bg-gray-50/30'}`}>
                      <td className="px-6 py-4">
                        <div>
                          <p className="font-medium text-gray-900">{exam.name}</p>
                          <p className="text-sm text-gray-600">{exam.duration} min • {exam.totalQuestions} questions</p>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <Badge className={`text-xs px-2 py-1 ${getSubjectColor(exam.subject)}`}>
                          {exam.subject}
                        </Badge>
                      </td>
                      <td className="px-6 py-4">
                        <div>
                          <p className="font-medium text-gray-900">{formatDate(exam.dueDate)}</p>
                          <p className={`text-sm ${
                            exam.status === 'overdue' ? 'text-red-600' : 
                            exam.status === 'completed' ? 'text-green-600' : 'text-blue-600'
                          }`}>
                            {getDaysUntilDue(exam.dueDate)}
                          </p>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <Badge className={`text-xs px-2 py-1 ${getStatusColor(exam.status)}`}>
                          <div className="flex items-center gap-1">
                            {getStatusIcon(exam.status)}
                            {exam.status.charAt(0).toUpperCase() + exam.status.slice(1).replace('-', ' ')}
                          </div>
                        </Badge>
                        {exam.score && (
                          <p className="text-sm text-green-600 font-medium mt-1">{exam.score}%</p>
                        )}
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex gap-2">
                          {exam.status === 'pending' && (
                            <Button 
                              size="sm" 
                              className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
                              onClick={() => handleStartExam(exam.id)}
                            >
                              <Play className="w-4 h-4 mr-1" />
                              Start
                            </Button>
                          )}
                          {exam.status === 'in-progress' && (
                            <Button 
                              size="sm" 
                              className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"
                              onClick={() => handleResumeExam(exam.id)}
                            >
                              <Pause className="w-4 h-4 mr-1" />
                              Resume
                            </Button>
                          )}
                          {exam.status === 'completed' && (
                            <Button 
                              size="sm" 
                              variant="outline"
                              onClick={() => handleViewResults(exam.id)}
                            >
                              <Eye className="w-4 h-4 mr-1" />
                              Results
                            </Button>
                          )}
                          {exam.status === 'overdue' && exam.attempts < exam.maxAttempts && (
                            <Button 
                              size="sm" 
                              variant="outline"
                              className="text-red-600 hover:text-red-700 hover:bg-red-50"
                              onClick={() => handleStartExam(exam.id)}
                            >
                              <AlertCircle className="w-4 h-4 mr-1" />
                              Late Start
                            </Button>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <Button 
                          size="sm" 
                          variant="outline"
                          onClick={() => handleDownloadPDF(exam.id, exam.name)}
                        >
                          <Download className="w-4 h-4" />
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Empty State */}
        {filteredAndSortedExams.length === 0 && (
          <div className="text-center py-12">
            <div className="w-24 h-24 bg-gradient-to-r from-purple-100 to-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <FileText className="w-12 h-12 text-purple-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No Exams Found</h3>
            <p className="text-gray-600 mb-4">
              {searchTerm || selectedSubject !== 'all' || selectedStatus !== 'all'
                ? 'Try adjusting your search or filter criteria.' 
                : 'You have no exams assigned yet.'}
            </p>
            <Button className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700">
              <BookOpen className="w-4 h-4 mr-2" />
              Browse Available Exams
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}