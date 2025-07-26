import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card'
import { Button } from '../../components/ui/button'
import { Badge } from '../../components/ui/badge'
import { Input } from '../../components/ui/input'
import { 
  Search, 
  Plus, 
  Edit, 
  Trash2, 
  Eye,
  Upload,
  FileText,
  Calendar,
  Clock,
  Users,
  CheckCircle,
  XCircle,
  AlertCircle,
  ChevronLeft,
  ChevronRight,
  Download,
  Filter
} from 'lucide-react'

interface Exam {
  id: string
  title: string
  subject: string
  difficulty: 'easy' | 'medium' | 'hard'
  totalQuestions: number
  duration: string
  createdBy: string
  createdDate: string
  status: 'draft' | 'pending' | 'approved' | 'rejected'
  attempts: number
  averageScore: number
}

const mockExams: Exam[] = [
  {
    id: '1',
    title: 'Mathematics Practice Paper 1',
    subject: 'Mathematics',
    difficulty: 'medium',
    totalQuestions: 50,
    duration: '60 minutes',
    createdBy: 'Sarah Williams',
    createdDate: '2024-01-15',
    status: 'approved',
    attempts: 245,
    averageScore: 78
  },
  {
    id: '2',
    title: 'English Comprehension Test',
    subject: 'English',
    difficulty: 'hard',
    totalQuestions: 40,
    duration: '90 minutes',
    createdBy: 'Mike Brown',
    createdDate: '2024-01-20',
    status: 'pending',
    attempts: 0,
    averageScore: 0
  },
  {
    id: '3',
    title: 'Verbal Reasoning Challenge',
    subject: 'Verbal Reasoning',
    difficulty: 'easy',
    totalQuestions: 35,
    duration: '45 minutes',
    createdBy: 'Lisa Wilson',
    createdDate: '2024-01-18',
    status: 'approved',
    attempts: 156,
    averageScore: 82
  },
  {
    id: '4',
    title: 'Non-Verbal Patterns Quiz',
    subject: 'Non-Verbal Reasoning',
    difficulty: 'medium',
    totalQuestions: 30,
    duration: '40 minutes',
    createdBy: 'David Miller',
    createdDate: '2024-01-22',
    status: 'draft',
    attempts: 0,
    averageScore: 0
  },
  {
    id: '5',
    title: 'Advanced Mathematics',
    subject: 'Mathematics',
    difficulty: 'hard',
    totalQuestions: 60,
    duration: '75 minutes',
    createdBy: 'Jennifer Taylor',
    createdDate: '2024-01-25',
    status: 'rejected',
    attempts: 0,
    averageScore: 0
  }
]

export default function ExamManagementPage() {
  const navigate = useNavigate()
  const [exams, setExams] = useState<Exam[]>(mockExams)
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [subjectFilter, setSubjectFilter] = useState('all')
  const [currentPage, setCurrentPage] = useState(1)
  const [showReviewModal, setShowReviewModal] = useState(false)
  const [selectedExam, setSelectedExam] = useState<Exam | null>(null)
  const [showAddModal, setShowAddModal] = useState(false)
  const [showAddQuestionsModal, setShowAddQuestionsModal] = useState(false)
  
  const examsPerPage = 10

  // Filter exams
  const filteredExams = exams.filter(exam => {
    const matchesSearch = exam.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         exam.createdBy.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === 'all' || exam.status === statusFilter
    const matchesSubject = subjectFilter === 'all' || exam.subject === subjectFilter
    
    return matchesSearch && matchesStatus && matchesSubject
  })

  // Pagination
  const totalPages = Math.ceil(filteredExams.length / examsPerPage)
  const startIndex = (currentPage - 1) * examsPerPage
  const paginatedExams = filteredExams.slice(startIndex, startIndex + examsPerPage)

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return 'bg-green-100 text-green-800 border-green-200'
      case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200'
      case 'hard': return 'bg-red-100 text-red-800 border-red-200'
      default: return 'bg-gray-100 text-gray-800 border-gray-200'
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved': return 'bg-green-100 text-green-800 border-green-200'
      case 'pending': return 'bg-yellow-100 text-yellow-800 border-yellow-200'
      case 'rejected': return 'bg-red-100 text-red-800 border-red-200'
      case 'draft': return 'bg-gray-100 text-gray-800 border-gray-200'
      default: return 'bg-gray-100 text-gray-800 border-gray-200'
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'approved': return <CheckCircle className="w-4 h-4" />
      case 'pending': return <AlertCircle className="w-4 h-4" />
      case 'rejected': return <XCircle className="w-4 h-4" />
      case 'draft': return <FileText className="w-4 h-4" />
      default: return <FileText className="w-4 h-4" />
    }
  }

  const handleStatusChange = (examId: string, newStatus: 'approved' | 'rejected') => {
    setExams(prevExams => 
      prevExams.map(exam => 
        exam.id === examId ? { ...exam, status: newStatus } : exam
      )
    )
    setShowReviewModal(false)
    setSelectedExam(null)
  }

  const handleDelete = (examId: string) => {
    if (confirm('Are you sure you want to delete this exam? This action cannot be undone.')) {
      setExams(prevExams => prevExams.filter(exam => exam.id !== examId))
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      <div className="max-w-7xl mx-auto p-6 space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between bg-white/70 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20">
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              Exam Management
            </h1>
            <p className="text-gray-600 mt-2 text-lg">Create, review, and manage examination papers</p>
          </div>
          <div className="flex items-center gap-3">
            <select className="px-4 py-2.5 border border-gray-200 rounded-xl bg-white/80 backdrop-blur-sm shadow-sm focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all duration-200">
              <option value="11Plus">11Plus</option>
              <option value="GCSE">GCSE</option>
              <option value="ALevel">A-Level</option>
            </select>
            <Button variant="outline" className="gap-2 rounded-xl border-gray-200 bg-white/80 backdrop-blur-sm hover:bg-white hover:shadow-md transition-all duration-200">
              <Upload className="w-4 h-4" />
              Bulk Upload
            </Button>
            <Button 
              onClick={() => setShowAddModal(true)}
              className="gap-2 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200"
            >
              <Plus className="w-4 h-4" />
              Add Exam
            </Button>
            <Button 
              onClick={() => setShowAddQuestionsModal(true)}
              variant="outline"
              className="gap-2 rounded-xl border-gray-200 bg-white/80 backdrop-blur-sm hover:bg-white hover:shadow-md transition-all duration-200"
            >
              <Plus className="w-4 h-4" />
              Add Exam Questions
            </Button>
          </div>
        </div>
        
        {/* Add Instructions Form */}
        <Card className="bg-white/70 backdrop-blur-sm border border-white/20 shadow-lg rounded-2xl">
          <CardHeader className="bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-t-2xl">
            <CardTitle className="text-white">Exam Instructions</CardTitle>
            <CardDescription className="text-purple-100">Set general instructions for exam creation and submission</CardDescription>
          </CardHeader>
          <CardContent className="p-6 space-y-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">General Instructions</label>
              <textarea 
                className="w-full px-4 py-3 border border-gray-200 rounded-xl bg-white/80 backdrop-blur-sm shadow-sm focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all duration-200"
                rows={4}
                placeholder="Enter general instructions for exam creators..."
                defaultValue="1. All exams must be reviewed before publication
2. Questions should be age-appropriate for 10-11 year olds
3. Include clear marking schemes
4. Provide detailed explanations for answers"
              />
            </div>
            <div className="flex gap-3">
              <Button className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200">
                Update Instructions
              </Button>
              <Button variant="outline" className="rounded-xl border-gray-200 bg-white/80 backdrop-blur-sm hover:bg-white hover:shadow-md transition-all duration-200">
                Reset to Default
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Search and Filters */}
        <Card className="bg-white/70 backdrop-blur-sm border border-white/20 shadow-lg rounded-2xl">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row gap-4">
              {/* Search */}
              <div className="flex-1 relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <Input
                  placeholder="Search by exam title or creator..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-12 pr-4 py-3 rounded-xl border-gray-200 bg-white/80 backdrop-blur-sm shadow-sm focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all duration-200"
                />
              </div>
              
              {/* Status Filter */}
              <select 
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="px-4 py-3 border border-gray-200 rounded-xl bg-white/80 backdrop-blur-sm shadow-sm focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all duration-200"
              >
                <option value="all">All Status</option>
                <option value="draft">Draft</option>
                <option value="pending">Pending Review</option>
                <option value="approved">Approved</option>
                <option value="rejected">Rejected</option>
              </select>
              
              {/* Subject Filter */}
              <select 
                value={subjectFilter}
                onChange={(e) => setSubjectFilter(e.target.value)}
                className="px-4 py-3 border border-gray-200 rounded-xl bg-white/80 backdrop-blur-sm shadow-sm focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all duration-200"
              >
                <option value="all">All Subjects</option>
                <option value="Mathematics">Mathematics</option>
                <option value="English">English</option>
                <option value="Verbal Reasoning">Verbal Reasoning</option>
                <option value="Non-Verbal Reasoning">Non-Verbal Reasoning</option>
              </select>
              
              <Button variant="outline" className="gap-2 rounded-xl border-gray-200 bg-white/80 backdrop-blur-sm hover:bg-white hover:shadow-md transition-all duration-200">
                <Filter className="w-4 h-4" />
                More Filters
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Exams Table */}
        <Card className="bg-white/70 backdrop-blur-sm border border-white/20 shadow-lg rounded-2xl">
          <CardHeader className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-t-2xl">
            <CardTitle className="text-white">Exams ({filteredExams.length})</CardTitle>
            <CardDescription className="text-blue-100">
              Showing {startIndex + 1}-{Math.min(startIndex + examsPerPage, filteredExams.length)} of {filteredExams.length} exams
            </CardDescription>
          </CardHeader>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200 bg-gray-50/50">
                    <th className="text-left py-4 px-6 font-semibold text-gray-900 uppercase tracking-wider text-sm">Exam Details</th>
                    <th className="text-left py-4 px-6 font-semibold text-gray-900 uppercase tracking-wider text-sm">Subject</th>
                    <th className="text-left py-4 px-6 font-semibold text-gray-900 uppercase tracking-wider text-sm">Difficulty</th>
                    <th className="text-left py-4 px-6 font-semibold text-gray-900 uppercase tracking-wider text-sm">Questions</th>
                    <th className="text-left py-4 px-6 font-semibold text-gray-900 uppercase tracking-wider text-sm">Status</th>
                    <th className="text-left py-4 px-6 font-semibold text-gray-900 uppercase tracking-wider text-sm">Performance</th>
                    <th className="text-right py-4 px-6 font-semibold text-gray-900 uppercase tracking-wider text-sm">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {paginatedExams.map((exam, index) => (
                    <tr key={exam.id} className={`border-b border-gray-100 hover:bg-blue-50/30 transition-colors duration-200 ${index % 2 === 0 ? 'bg-white/50' : 'bg-gray-50/30'}`}>
                      <td className="py-4 px-6">
                        <div>
                          <p className="font-semibold text-gray-900">{exam.title}</p>
                          <div className="flex items-center gap-4 mt-2 text-sm text-gray-600">
                            <span className="flex items-center gap-1">
                              <Users className="w-4 h-4" />
                              {exam.createdBy}
                            </span>
                            <span className="flex items-center gap-1">
                              <Calendar className="w-4 h-4" />
                              {new Date(exam.createdDate).toLocaleDateString()}
                            </span>
                            <span className="flex items-center gap-1">
                              <Clock className="w-4 h-4" />
                              {exam.duration}
                            </span>
                          </div>
                        </div>
                      </td>
                      <td className="py-4 px-6">
                        <Badge variant="outline" className="border-2 font-medium">{exam.subject}</Badge>
                      </td>
                      <td className="py-4 px-6">
                        <Badge className={`${getDifficultyColor(exam.difficulty)} border font-medium`}>
                          {exam.difficulty}
                        </Badge>
                      </td>
                      <td className="py-4 px-6">
                        <span className="text-sm font-semibold text-gray-900">{exam.totalQuestions}</span>
                      </td>
                      <td className="py-4 px-6">
                        <Badge className={`${getStatusColor(exam.status)} flex items-center gap-1 w-fit border font-medium`}>
                          {getStatusIcon(exam.status)}
                          {exam.status.charAt(0).toUpperCase() + exam.status.slice(1)}
                        </Badge>
                      </td>
                      <td className="py-4 px-6">
                        <div className="text-sm">
                          <p className="font-semibold text-gray-900">{exam.attempts} attempts</p>
                          <p className="text-gray-600">{exam.averageScore}% avg score</p>
                        </div>
                      </td>
                      <td className="py-4 px-6">
                        <div className="flex items-center justify-end gap-1">
                          <Button size="sm" variant="ghost" title="View Exam" className="h-8 w-8 p-0 hover:bg-blue-100 rounded-lg transition-colors duration-200">
                            <Eye className="w-4 h-4 text-blue-600" />
                          </Button>
                          <Button size="sm" variant="ghost" title="Edit Exam" className="h-8 w-8 p-0 hover:bg-gray-100 rounded-lg transition-colors duration-200">
                            <Edit className="w-4 h-4 text-gray-600" />
                          </Button>
                          {exam.status === 'pending' && (
                            <Button 
                              size="sm" 
                              variant="ghost" 
                              title="Review Exam"
                              onClick={() => {
                                setSelectedExam(exam)
                                setShowReviewModal(true)
                              }}
                              className="h-8 w-8 p-0 hover:bg-green-100 rounded-lg transition-colors duration-200"
                            >
                              <CheckCircle className="w-4 h-4 text-green-600" />
                            </Button>
                          )}
                          <Button size="sm" variant="ghost" title="Download" className="h-8 w-8 p-0 hover:bg-purple-100 rounded-lg transition-colors duration-200">
                            <Download className="w-4 h-4 text-purple-600" />
                          </Button>
                          <Button 
                            size="sm" 
                            variant="ghost" 
                            title="Delete Exam"
                            onClick={() => handleDelete(exam.id)}
                            className="h-8 w-8 p-0 hover:bg-red-100 rounded-lg transition-colors duration-200"
                          >
                            <Trash2 className="w-4 h-4 text-red-600" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            <div className="flex items-center justify-between mt-6 pt-6 px-6 pb-6 border-t border-gray-200">
              <p className="text-sm text-gray-600 font-medium">
                Showing {startIndex + 1} to {Math.min(startIndex + examsPerPage, filteredExams.length)} of {filteredExams.length} results
              </p>
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                  disabled={currentPage === 1}
                  className="rounded-lg border-gray-200 hover:bg-gray-50 transition-colors duration-200"
                >
                  <ChevronLeft className="w-4 h-4" />
                  Previous
                </Button>
                
                <div className="flex items-center gap-1">
                  {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                    const pageNum = i + 1
                    return (
                      <Button
                        key={pageNum}
                        variant={currentPage === pageNum ? "default" : "outline"}
                        size="sm"
                        onClick={() => setCurrentPage(pageNum)}
                        className={`w-10 h-10 p-0 rounded-lg transition-colors duration-200 ${
                          currentPage === pageNum 
                            ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-lg' 
                            : 'border-gray-200 hover:bg-gray-50'
                        }`}
                      >
                        {pageNum}
                      </Button>
                    )
                  })}
                </div>
                
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                  disabled={currentPage === totalPages}
                  className="rounded-lg border-gray-200 hover:bg-gray-50 transition-colors duration-200"
                >
                  Next
                  <ChevronRight className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Review Modal */}
        {showReviewModal && selectedExam && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <Card className="w-full max-w-2xl mx-4 max-h-[90vh] overflow-y-auto bg-white rounded-2xl shadow-2xl">
              <CardHeader className="bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-t-2xl">
                <CardTitle className="text-white">Review Exam: {selectedExam.title}</CardTitle>
                <CardDescription className="text-purple-100">Review and approve or reject this exam submission</CardDescription>
              </CardHeader>
              <CardContent className="p-6 space-y-6">
                {/* Exam Details */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700">Subject</label>
                    <p className="text-gray-900 font-medium">{selectedExam.subject}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700">Difficulty</label>
                    <Badge className={`${getDifficultyColor(selectedExam.difficulty)} border font-medium mt-1`}>
                      {selectedExam.difficulty}
                    </Badge>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700">Questions</label>
                    <p className="text-gray-900 font-medium">{selectedExam.totalQuestions}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700">Duration</label>
                    <p className="text-gray-900 font-medium">{selectedExam.duration}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700">Created By</label>
                    <p className="text-gray-900 font-medium">{selectedExam.createdBy}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700">Created Date</label>
                    <p className="text-gray-900 font-medium">{new Date(selectedExam.createdDate).toLocaleDateString()}</p>
                  </div>
                </div>

                {/* Sample Questions Preview */}
                <div>
                  <h4 className="font-semibold text-gray-900 mb-3">Sample Questions</h4>
                  <div className="space-y-4 bg-gray-50 p-4 rounded-xl border border-gray-200">
                    <div className="border-b border-gray-200 pb-3">
                      <p className="font-semibold text-gray-900">Question 1:</p>
                      <p className="text-gray-700 mt-1">What is 15 + 27?</p>
                      <div className="mt-2 space-y-1">
                        <p className="text-sm text-gray-600">A) 32</p>
                        <p className="text-sm text-gray-600">B) 42</p>
                        <p className="text-sm text-gray-600 font-semibold text-green-700">C) 42 ✓</p>
                        <p className="text-sm text-gray-600">D) 52</p>
                      </div>
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">Question 2:</p>
                      <p className="text-gray-700 mt-1">Which word is the odd one out?</p>
                      <div className="mt-2 space-y-1">
                        <p className="text-sm text-gray-600 font-semibold text-green-700">A) Apple ✓</p>
                        <p className="text-sm text-gray-600">B) Carrot</p>
                        <p className="text-sm text-gray-600">C) Potato</p>
                        <p className="text-sm text-gray-600">D) Onion</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Review Comments */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Review Comments</label>
                  <textarea 
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl bg-white/80 backdrop-blur-sm shadow-sm focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all duration-200"
                    rows={3}
                    placeholder="Add comments about this exam..."
                  />
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3 pt-4">
                  <Button 
                    onClick={() => setShowReviewModal(false)}
                    variant="outline" 
                    className="flex-1 rounded-xl border-gray-200 hover:bg-gray-50 transition-colors duration-200"
                  >
                    Cancel
                  </Button>
                  <Button 
                    onClick={() => handleStatusChange(selectedExam.id, 'rejected')}
                    variant="outline"
                    className="flex-1 text-red-600 border-red-200 hover:bg-red-50 rounded-xl transition-colors duration-200"
                  >
                    <XCircle className="w-4 h-4 mr-2" />
                    Reject
                  </Button>
                  <Button 
                    onClick={() => handleStatusChange(selectedExam.id, 'approved')}
                    className="flex-1 bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200"
                  >
                    <CheckCircle className="w-4 h-4 mr-2" />
                    Approve
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Add Exam Modal */}
        {showAddModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <Card className="w-full max-w-lg mx-4 bg-white rounded-2xl shadow-2xl">
              <CardHeader className="bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-t-2xl">
                <CardTitle className="text-white">Add New Exam</CardTitle>
                <CardDescription className="text-purple-100">Create a new examination paper</CardDescription>
              </CardHeader>
              <CardContent className="p-6 space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Course</label>
                  <select className="w-full px-4 py-3 border border-gray-200 rounded-xl bg-white/80 backdrop-blur-sm shadow-sm focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all duration-200">
                    <option value="">Select course</option>
                    <option value="Mathematics Fundamentals">Mathematics Fundamentals</option>
                    <option value="Advanced English Comprehension">Advanced English Comprehension</option>
                    <option value="Verbal Reasoning Mastery">Verbal Reasoning Mastery</option>
                    <option value="Non-Verbal Patterns">Non-Verbal Patterns</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Topic</label>
                  <select className="w-full px-4 py-3 border border-gray-200 rounded-xl bg-white/80 backdrop-blur-sm shadow-sm focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all duration-200">
                    <option value="">Select topic</option>
                    <option value="Basic Arithmetic">Basic Arithmetic</option>
                    <option value="Fractions and Decimals">Fractions and Decimals</option>
                    <option value="Reading Comprehension">Reading Comprehension</option>
                    <option value="Vocabulary Building">Vocabulary Building</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Difficulty</label>
                  <select className="w-full px-4 py-3 border border-gray-200 rounded-xl bg-white/80 backdrop-blur-sm shadow-sm focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all duration-200">
                    <option value="easy">Easy</option>
                    <option value="medium">Medium</option>
                    <option value="hard">Hard</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Number of Questions</label>
                  <Input 
                    type="number" 
                    placeholder="50" 
                    className="px-4 py-3 rounded-xl border-gray-200 bg-white/80 backdrop-blur-sm shadow-sm focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all duration-200"
                  />
                </div>
                <div className="flex gap-3 pt-4">
                  <Button 
                    onClick={() => setShowAddModal(false)}
                    variant="outline" 
                    className="flex-1 rounded-xl border-gray-200 hover:bg-gray-50 transition-colors duration-200"
                  >
                    Cancel
                  </Button>
                  <Button className="flex-1 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200">
                    Create Exam
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Add Exam Questions Modal */}
        {showAddQuestionsModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <Card className="w-full max-w-lg mx-4 bg-white rounded-2xl shadow-2xl">
              <CardHeader className="bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-t-2xl">
                <CardTitle className="text-white">Add Exam Questions</CardTitle>
                <CardDescription className="text-purple-100">Generate questions for exam creation</CardDescription>
              </CardHeader>
              <CardContent className="p-6 space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Course</label>
                  <select className="w-full px-4 py-3 border border-gray-200 rounded-xl bg-white/80 backdrop-blur-sm shadow-sm focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all duration-200">
                    <option value="">Select course</option>
                    <option value="Mathematics Fundamentals">Mathematics Fundamentals</option>
                    <option value="Advanced English Comprehension">Advanced English Comprehension</option>
                    <option value="Verbal Reasoning Mastery">Verbal Reasoning Mastery</option>
                    <option value="Non-Verbal Patterns">Non-Verbal Patterns</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Topic</label>
                  <select className="w-full px-4 py-3 border border-gray-200 rounded-xl bg-white/80 backdrop-blur-sm shadow-sm focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all duration-200">
                    <option value="">Select topic</option>
                    <option value="Basic Arithmetic">Basic Arithmetic</option>
                    <option value="Fractions and Decimals">Fractions and Decimals</option>
                    <option value="Reading Comprehension">Reading Comprehension</option>
                    <option value="Vocabulary Building">Vocabulary Building</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Difficulty</label>
                  <select className="w-full px-4 py-3 border border-gray-200 rounded-xl bg-white/80 backdrop-blur-sm shadow-sm focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all duration-200">
                    <option value="easy">Easy</option>
                    <option value="medium">Medium</option>
                    <option value="hard">Hard</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Number of Questions</label>
                  <Input 
                    type="number" 
                    placeholder="20" 
                    className="px-4 py-3 rounded-xl border-gray-200 bg-white/80 backdrop-blur-sm shadow-sm focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all duration-200"
                  />
                </div>
                <div className="flex gap-3 pt-4">
                  <Button 
                    onClick={() => setShowAddQuestionsModal(false)}
                    variant="outline" 
                    className="flex-1 rounded-xl border-gray-200 hover:bg-gray-50 transition-colors duration-200"
                  >
                    Cancel
                  </Button>
                  <Button 
                    onClick={() => {
                      // Navigate to questions page with configuration
                      navigate('/admin/exam-questions', {
                        state: {
                          examConfig: {
                            course: 'Mathematics Fundamentals',
                            topic: 'Basic Arithmetic',
                            difficulty: 'medium',
                            questions: 20
                          }
                        }
                      })
                      setShowAddQuestionsModal(false)
                    }}
                    className="flex-1 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200"
                  >
                    Generate Questions
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  )
}