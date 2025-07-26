import { useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card'
import { Button } from '../../components/ui/button'
import { Badge } from '../../components/ui/badge'
import { Input } from '../../components/ui/input'
import { 
  ArrowLeft,
  CheckCircle,
  XCircle,
  Edit,
  Trash2,
  Eye,
  Search,
  Filter,
  ChevronLeft,
  ChevronRight,
  AlertCircle,
  BookOpen,
  Clock,
  Target
} from 'lucide-react'

interface Question {
  id: string
  questionText: string
  options: string[]
  correctAnswer: number
  explanation: string
  difficulty: 'easy' | 'medium' | 'hard'
  topic: string
  timeEstimate: string
  status: 'pending' | 'approved' | 'rejected'
  createdDate: string
}

const mockQuestions: Question[] = [
  {
    id: '1',
    questionText: 'What is 15 + 27?',
    options: ['32', '42', '52', '62'],
    correctAnswer: 1,
    explanation: 'To add 15 + 27, we can break it down: 15 + 20 = 35, then 35 + 7 = 42.',
    difficulty: 'easy',
    topic: 'Basic Arithmetic',
    timeEstimate: '30 seconds',
    status: 'pending',
    createdDate: '2024-01-15'
  },
  {
    id: '2',
    questionText: 'Which word is the odd one out?',
    options: ['Apple', 'Carrot', 'Potato', 'Onion'],
    correctAnswer: 0,
    explanation: 'Apple is a fruit, while carrot, potato, and onion are vegetables.',
    difficulty: 'medium',
    topic: 'Classification',
    timeEstimate: '45 seconds',
    status: 'pending',
    createdDate: '2024-01-15'
  },
  {
    id: '3',
    questionText: 'If a train travels 60 km in 1 hour, how far will it travel in 2.5 hours?',
    options: ['120 km', '150 km', '180 km', '200 km'],
    correctAnswer: 1,
    explanation: 'Speed = 60 km/hour. Distance = Speed × Time = 60 × 2.5 = 150 km.',
    difficulty: 'hard',
    topic: 'Speed and Distance',
    timeEstimate: '90 seconds',
    status: 'pending',
    createdDate: '2024-01-15'
  },
  {
    id: '4',
    questionText: 'What is 3/4 as a decimal?',
    options: ['0.25', '0.5', '0.75', '1.25'],
    correctAnswer: 2,
    explanation: '3/4 = 3 ÷ 4 = 0.75',
    difficulty: 'medium',
    topic: 'Fractions and Decimals',
    timeEstimate: '60 seconds',
    status: 'pending',
    createdDate: '2024-01-15'
  },
  {
    id: '5',
    questionText: 'Complete the sequence: 2, 4, 8, 16, ?',
    options: ['24', '32', '48', '64'],
    correctAnswer: 1,
    explanation: 'Each number is doubled: 2×2=4, 4×2=8, 8×2=16, 16×2=32',
    difficulty: 'medium',
    topic: 'Number Patterns',
    timeEstimate: '75 seconds',
    status: 'pending',
    createdDate: '2024-01-15'
  }
]

export default function ExamQuestionsPage() {
  const navigate = useNavigate()
  const location = useLocation()
  const examConfig = location.state?.examConfig
  
  const [questions, setQuestions] = useState<Question[]>(mockQuestions)
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [difficultyFilter, setDifficultyFilter] = useState('all')
  const [currentPage, setCurrentPage] = useState(1)
  const [selectedQuestion, setSelectedQuestion] = useState<Question | null>(null)
  const [showReviewModal, setShowReviewModal] = useState(false)
  
  const questionsPerPage = 5

  // Filter questions
  const filteredQuestions = questions.filter(question => {
    const matchesSearch = question.questionText.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         question.topic.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === 'all' || question.status === statusFilter
    const matchesDifficulty = difficultyFilter === 'all' || question.difficulty === difficultyFilter
    
    return matchesSearch && matchesStatus && matchesDifficulty
  })

  // Pagination
  const totalPages = Math.ceil(filteredQuestions.length / questionsPerPage)
  const startIndex = (currentPage - 1) * questionsPerPage
  const paginatedQuestions = filteredQuestions.slice(startIndex, startIndex + questionsPerPage)

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return 'bg-green-100 text-green-800'
      case 'medium': return 'bg-yellow-100 text-yellow-800'
      case 'hard': return 'bg-red-100 text-red-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved': return 'bg-green-100 text-green-800'
      case 'pending': return 'bg-yellow-100 text-yellow-800'
      case 'rejected': return 'bg-red-100 text-red-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'approved': return <CheckCircle className="w-4 h-4" />
      case 'pending': return <AlertCircle className="w-4 h-4" />
      case 'rejected': return <XCircle className="w-4 h-4" />
      default: return <AlertCircle className="w-4 h-4" />
    }
  }

  const handleStatusChange = (questionId: string, newStatus: 'approved' | 'rejected') => {
    setQuestions(prevQuestions => 
      prevQuestions.map(question => 
        question.id === questionId ? { ...question, status: newStatus } : question
      )
    )
    setShowReviewModal(false)
    setSelectedQuestion(null)
  }

  const handleDelete = (questionId: string) => {
    if (confirm('Are you sure you want to delete this question? This action cannot be undone.')) {
      setQuestions(prevQuestions => prevQuestions.filter(question => question.id !== questionId))
    }
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button 
            variant="outline" 
            onClick={() => navigate('/admin/exam-management')}
            className="gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Exam Management
          </Button>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Review Exam Questions</h1>
            <p className="text-gray-600 mt-1">Review and approve questions for the exam</p>
          </div>
        </div>
      </div>

      {/* Exam Configuration Summary */}
      {examConfig && (
        <Card>
          <CardHeader>
            <CardTitle>Exam Configuration</CardTitle>
            <CardDescription>Generated questions based on your specifications</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-purple-600" />
                <div>
                  <p className="text-sm text-gray-600">Course</p>
                  <p className="font-medium">{examConfig.course}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Target className="w-4 h-4 text-cyan-600" />
                <div>
                  <p className="text-sm text-gray-600">Topic</p>
                  <p className="font-medium">{examConfig.topic}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <AlertCircle className="w-4 h-4 text-yellow-600" />
                <div>
                  <p className="text-sm text-gray-600">Difficulty</p>
                  <Badge className={getDifficultyColor(examConfig.difficulty)}>
                    {examConfig.difficulty}
                  </Badge>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-green-600" />
                <div>
                  <p className="text-sm text-gray-600">Questions</p>
                  <p className="font-medium">{examConfig.questions} questions</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Search and Filters */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-4">
            {/* Search */}
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="Search questions by text or topic..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            
            {/* Status Filter */}
            <select 
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:border-purple-500 focus:ring-1 focus:ring-purple-500"
            >
              <option value="all">All Status</option>
              <option value="pending">Pending Review</option>
              <option value="approved">Approved</option>
              <option value="rejected">Rejected</option>
            </select>
            
            {/* Difficulty Filter */}
            <select 
              value={difficultyFilter}
              onChange={(e) => setDifficultyFilter(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:border-purple-500 focus:ring-1 focus:ring-purple-500"
            >
              <option value="all">All Difficulties</option>
              <option value="easy">Easy</option>
              <option value="medium">Medium</option>
              <option value="hard">Hard</option>
            </select>
          </div>
        </CardContent>
      </Card>

      {/* Questions List */}
      <div className="space-y-4">
        {paginatedQuestions.map((question, index) => (
          <Card key={question.id} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-sm font-medium text-gray-500">
                      Question {startIndex + index + 1}
                    </span>
                    <Badge className={getDifficultyColor(question.difficulty)}>
                      {question.difficulty}
                    </Badge>
                    <Badge className={`${getStatusColor(question.status)} flex items-center gap-1`}>
                      {getStatusIcon(question.status)}
                      {question.status}
                    </Badge>
                  </div>
                  <CardTitle className="text-lg">{question.questionText}</CardTitle>
                  <div className="flex items-center gap-4 mt-2 text-sm text-gray-600">
                    <span className="flex items-center gap-1">
                      <Target className="w-3 h-3" />
                      {question.topic}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {question.timeEstimate}
                    </span>
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Options */}
              <div>
                <p className="font-medium text-gray-900 mb-2">Options:</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  {question.options.map((option, optionIndex) => (
                    <div 
                      key={optionIndex}
                      className={`p-2 rounded border ${
                        optionIndex === question.correctAnswer 
                          ? 'bg-green-50 border-green-200 text-green-800' 
                          : 'bg-gray-50 border-gray-200'
                      }`}
                    >
                      <span className="font-medium">
                        {String.fromCharCode(65 + optionIndex)}) 
                      </span>
                      {option}
                      {optionIndex === question.correctAnswer && (
                        <CheckCircle className="w-4 h-4 inline ml-2 text-green-600" />
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Explanation */}
              <div>
                <p className="font-medium text-gray-900 mb-1">Explanation:</p>
                <p className="text-gray-700 bg-blue-50 p-3 rounded border border-blue-200">
                  {question.explanation}
                </p>
              </div>

              {/* Actions */}
              <div className="flex items-center gap-2 pt-4 border-t">
                <Button 
                  size="sm" 
                  variant="outline"
                  onClick={() => {
                    setSelectedQuestion(question)
                    setShowReviewModal(true)
                  }}
                  className="flex-1"
                >
                  <Eye className="w-4 h-4 mr-2" />
                  Review
                </Button>
                <Button size="sm" variant="outline" className="flex-1">
                  <Edit className="w-4 h-4 mr-2" />
                  Edit
                </Button>
                {question.status === 'pending' && (
                  <>
                    <Button 
                      size="sm" 
                      onClick={() => handleStatusChange(question.id, 'approved')}
                      className="bg-green-600 hover:bg-green-700 text-white"
                    >
                      <CheckCircle className="w-4 h-4 mr-2" />
                      Approve
                    </Button>
                    <Button 
                      size="sm" 
                      variant="outline"
                      onClick={() => handleStatusChange(question.id, 'rejected')}
                      className="text-red-600 border-red-200 hover:bg-red-50"
                    >
                      <XCircle className="w-4 h-4 mr-2" />
                      Reject
                    </Button>
                  </>
                )}
                <Button 
                  size="sm" 
                  variant="outline"
                  onClick={() => handleDelete(question.id)}
                  className="text-red-600 hover:text-red-700"
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Pagination */}
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <p className="text-sm text-gray-600">
              Showing {startIndex + 1} to {Math.min(startIndex + questionsPerPage, filteredQuestions.length)} of {filteredQuestions.length} questions
            </p>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
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
                      className="w-8 h-8 p-0"
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
              >
                Next
                <ChevronRight className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Review Modal */}
      {showReviewModal && selectedQuestion && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <Card className="w-full max-w-3xl mx-4 max-h-[90vh] overflow-y-auto">
            <CardHeader>
              <CardTitle>Review Question</CardTitle>
              <CardDescription>Detailed review of the question and answer</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Question Details */}
              <div>
                <h4 className="font-semibold text-gray-900 mb-2">Question:</h4>
                <p className="text-lg text-gray-800 bg-gray-50 p-4 rounded-lg">
                  {selectedQuestion.questionText}
                </p>
              </div>

              {/* Options */}
              <div>
                <h4 className="font-semibold text-gray-900 mb-2">Answer Options:</h4>
                <div className="space-y-2">
                  {selectedQuestion.options.map((option, index) => (
                    <div 
                      key={index}
                      className={`p-3 rounded border ${
                        index === selectedQuestion.correctAnswer 
                          ? 'bg-green-50 border-green-200' 
                          : 'bg-gray-50 border-gray-200'
                      }`}
                    >
                      <span className="font-medium">
                        {String.fromCharCode(65 + index)}) {option}
                      </span>
                      {index === selectedQuestion.correctAnswer && (
                        <span className="ml-2 text-green-600 font-medium">✓ Correct Answer</span>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Explanation */}
              <div>
                <h4 className="font-semibold text-gray-900 mb-2">Explanation:</h4>
                <p className="text-gray-700 bg-blue-50 p-4 rounded-lg border border-blue-200">
                  {selectedQuestion.explanation}
                </p>
              </div>

              {/* Question Metadata */}
              <div className="grid grid-cols-2 gap-4 pt-4 border-t">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Topic</label>
                  <p className="text-gray-900">{selectedQuestion.topic}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Difficulty</label>
                  <Badge className={getDifficultyColor(selectedQuestion.difficulty)}>
                    {selectedQuestion.difficulty}
                  </Badge>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Time Estimate</label>
                  <p className="text-gray-900">{selectedQuestion.timeEstimate}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Status</label>
                  <Badge className={getStatusColor(selectedQuestion.status)}>
                    {selectedQuestion.status}
                  </Badge>
                </div>
              </div>

              {/* Review Comments */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Review Comments</label>
                <textarea 
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:border-purple-500 focus:ring-1 focus:ring-purple-500"
                  rows={3}
                  placeholder="Add comments about this question..."
                />
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3 pt-4">
                <Button 
                  onClick={() => setShowReviewModal(false)}
                  variant="outline" 
                  className="flex-1"
                >
                  Close
                </Button>
                {selectedQuestion.status === 'pending' && (
                  <>
                    <Button 
                      onClick={() => handleStatusChange(selectedQuestion.id, 'rejected')}
                      variant="outline"
                      className="flex-1 text-red-600 border-red-200 hover:bg-red-50"
                    >
                      <XCircle className="w-4 h-4 mr-2" />
                      Reject
                    </Button>
                    <Button 
                      onClick={() => handleStatusChange(selectedQuestion.id, 'approved')}
                      className="flex-1 bg-green-600 hover:bg-green-700"
                    >
                      <CheckCircle className="w-4 h-4 mr-2" />
                      Approve
                    </Button>
                  </>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Summary Actions */}
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-semibold text-gray-900">Question Review Summary</h3>
              <p className="text-sm text-gray-600 mt-1">
                {questions.filter(q => q.status === 'approved').length} approved, 
                {questions.filter(q => q.status === 'pending').length} pending, 
                {questions.filter(q => q.status === 'rejected').length} rejected
              </p>
            </div>
            <div className="flex gap-3">
              <Button variant="outline">
                Save as Draft
              </Button>
              <Button className="bg-purple-600 hover:bg-purple-700">
                Finalize Exam
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}