import { useState, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { Button } from '../components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card'
import { Badge } from '../components/ui/badge'
import { Progress } from '../components/ui/progress'
import { 
  ArrowLeft,
  CheckCircle,
  XCircle,
  HelpCircle,
  Trophy,
  Target,
  Clock,
  User,
  Download,
  Share,
  RotateCcw,
  BookOpen,
  TrendingUp,
  Award,
  AlertTriangle
} from 'lucide-react'

interface QuestionResult {
  questionNumber: number
  userAnswer: string
  correctAnswer: string
  isCorrect: boolean
  topic: string
  difficulty: 'Easy' | 'Medium' | 'Hard'
  explanation: string
  marks: number
}

interface ExamResults {
  examId: string
  examTitle: string
  subject: string
  totalQuestions: number
  correctAnswers: number
  totalMarks: number
  obtainedMarks: number
  percentage: number
  grade: string
  timeTaken: string
  questions: QuestionResult[]
}

// Mock data - in real app this would come from API
const generateMockResults = (examTitle: string, subject: string, totalQuestions: number): ExamResults => {
  const questions: QuestionResult[] = []
  let correctCount = 0
  
  for (let i = 1; i <= totalQuestions; i++) {
    const isCorrect = Math.random() > 0.3 // 70% correct rate
    const userAnswer = String.fromCharCode(65 + Math.floor(Math.random() * 4)) // A, B, C, D
    const correctAnswer = isCorrect ? userAnswer : String.fromCharCode(65 + Math.floor(Math.random() * 4))
    
    if (isCorrect) correctCount++
    
    questions.push({
      questionNumber: i,
      userAnswer,
      correctAnswer,
      isCorrect,
      topic: `Topic ${Math.floor(i / 5) + 1}`,
      difficulty: ['Easy', 'Medium', 'Hard'][Math.floor(Math.random() * 3)] as 'Easy' | 'Medium' | 'Hard',
      explanation: `This question tests your understanding of ${subject.toLowerCase()} concepts. The correct approach is to...`,
      marks: 1
    })
  }
  
  const obtainedMarks = correctCount
  const percentage = Math.round((correctCount / totalQuestions) * 100)
  
  let grade = 'F'
  if (percentage >= 90) grade = 'A+'
  else if (percentage >= 80) grade = 'A'
  else if (percentage >= 70) grade = 'B'
  else if (percentage >= 60) grade = 'C'
  else if (percentage >= 50) grade = 'D'
  
  return {
    examId: 'mock-exam',
    examTitle,
    subject,
    totalQuestions,
    correctAnswers: correctCount,
    totalMarks: totalQuestions,
    obtainedMarks,
    percentage,
    grade,
    timeTaken: '42 minutes',
    questions
  }
}

export default function OMRResultsPage() {
  const location = useLocation()
  const navigate = useNavigate()
  const [results, setResults] = useState<ExamResults | null>(null)
  const [filter, setFilter] = useState<'all' | 'correct' | 'incorrect'>('all')

  useEffect(() => {
    const { examTitle, subject, totalQuestions } = location.state || {}
    if (examTitle && subject && totalQuestions) {
      const mockResults = generateMockResults(examTitle, subject, totalQuestions)
      setResults(mockResults)
    } else {
      navigate('/dashboard')
    }
  }, [location.state, navigate])

  if (!results) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-purple-600 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-gray-600">Loading your results...</p>
        </div>
      </div>
    )
  }

  const filteredQuestions = results.questions.filter(q => {
    if (filter === 'correct') return q.isCorrect
    if (filter === 'incorrect') return !q.isCorrect
    return true
  })

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

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Easy': return 'bg-green-100 text-green-800'
      case 'Medium': return 'bg-yellow-100 text-yellow-800'
      case 'Hard': return 'bg-red-100 text-red-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const handleViewExplanation = (questionNumber: number) => {
    navigate('/answer-explanation', {
      state: {
        question: results.questions.find(q => q.questionNumber === questionNumber),
        examTitle: results.examTitle,
        subject: results.subject
      }
    })
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
              <h1 className="text-xl font-semibold text-gray-900">Exam Results</h1>
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
        {/* Results Header */}
        <div className="mb-8">
          <div className="text-center mb-6">
            <div className={`inline-flex items-center justify-center w-20 h-20 rounded-full mb-4 ${
              results.percentage >= 70 ? 'bg-green-100' : results.percentage >= 50 ? 'bg-yellow-100' : 'bg-red-100'
            }`}>
              {results.percentage >= 70 ? (
                <Trophy className="w-10 h-10 text-green-600" />
              ) : results.percentage >= 50 ? (
                <Target className="w-10 h-10 text-yellow-600" />
              ) : (
                <AlertTriangle className="w-10 h-10 text-red-600" />
              )}
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              {results.percentage >= 70 ? 'Great Job!' : results.percentage >= 50 ? 'Good Effort!' : 'Keep Practicing!'}
            </h1>
            <p className="text-gray-600">{results.examTitle}</p>
          </div>

          {/* Score Overview */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <Card>
              <CardContent className="p-6 text-center">
                <div className="text-3xl font-bold text-purple-600 mb-1">
                  {results.percentage}%
                </div>
                <p className="text-sm text-gray-600">Overall Score</p>
                <Progress value={results.percentage} className="mt-2" />
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6 text-center">
                <div className="text-3xl font-bold text-green-600 mb-1">
                  {results.correctAnswers}
                </div>
                <p className="text-sm text-gray-600">Correct Answers</p>
                <p className="text-xs text-gray-500 mt-1">out of {results.totalQuestions}</p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6 text-center">
                <div className={`text-3xl font-bold mb-1 ${getGradeColor(results.grade).split(' ')[0]}`}>
                  {results.grade}
                </div>
                <p className="text-sm text-gray-600">Grade</p>
                <Badge className={`mt-1 ${getGradeColor(results.grade)}`}>
                  {results.obtainedMarks}/{results.totalMarks} marks
                </Badge>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6 text-center">
                <div className="text-3xl font-bold text-blue-600 mb-1">
                  {results.timeTaken}
                </div>
                <p className="text-sm text-gray-600">Time Taken</p>
                <div className="flex items-center justify-center gap-1 mt-1">
                  <Clock className="w-3 h-3 text-gray-500" />
                  <span className="text-xs text-gray-500">Completed</span>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap gap-3 justify-center mb-8">
            <Button className="gap-2">
              <Download className="w-4 h-4" />
              Download Report
            </Button>
            <Button variant="outline" className="gap-2">
              <Share className="w-4 h-4" />
              Share Results
            </Button>
            <Button variant="outline" className="gap-2">
              <RotateCcw className="w-4 h-4" />
              Retake Exam
            </Button>
            <Button variant="outline" className="gap-2">
              <BookOpen className="w-4 h-4" />
              Study Plan
            </Button>
          </div>
        </div>

        {/* Question-wise Results */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-purple-600" />
                  Question-wise Analysis
                </CardTitle>
                <CardDescription>
                  Review your answers and learn from explanations
                </CardDescription>
              </div>
              <div className="flex gap-2">
                <Button
                  variant={filter === 'all' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setFilter('all')}
                >
                  All ({results.questions.length})
                </Button>
                <Button
                  variant={filter === 'correct' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setFilter('correct')}
                  className="text-green-600 border-green-600 hover:bg-green-50"
                >
                  Correct ({results.correctAnswers})
                </Button>
                <Button
                  variant={filter === 'incorrect' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setFilter('incorrect')}
                  className="text-red-600 border-red-600 hover:bg-red-50"
                >
                  Incorrect ({results.totalQuestions - results.correctAnswers})
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {filteredQuestions.map((question) => (
                <div
                  key={question.questionNumber}
                  className={`p-4 rounded-lg border-2 ${
                    question.isCorrect
                      ? 'border-green-200 bg-green-50'
                      : 'border-red-200 bg-red-50'
                  }`}
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                        question.isCorrect
                          ? 'bg-green-100 text-green-600'
                          : 'bg-red-100 text-red-600'
                      }`}>
                        {question.isCorrect ? (
                          <CheckCircle className="w-5 h-5" />
                        ) : (
                          <XCircle className="w-5 h-5" />
                        )}
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900">
                          Question {question.questionNumber}
                        </h3>
                        <p className="text-sm text-gray-600">{question.topic}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge className={getDifficultyColor(question.difficulty)}>
                        {question.difficulty}
                      </Badge>
                      <Badge variant="outline">
                        {question.marks} mark{question.marks !== 1 ? 's' : ''}
                      </Badge>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-3">
                    <div className="text-center p-3 bg-white rounded-lg">
                      <p className="text-sm text-gray-600 mb-1">Your Answer</p>
                      <div className={`text-lg font-bold ${
                        question.isCorrect ? 'text-green-600' : 'text-red-600'
                      }`}>
                        {question.userAnswer}
                      </div>
                    </div>
                    <div className="text-center p-3 bg-white rounded-lg">
                      <p className="text-sm text-gray-600 mb-1">Correct Answer</p>
                      <div className="text-lg font-bold text-green-600">
                        {question.correctAnswer}
                      </div>
                    </div>
                    <div className="text-center p-3 bg-white rounded-lg">
                      <p className="text-sm text-gray-600 mb-1">Result</p>
                      <div className={`text-lg font-bold ${
                        question.isCorrect ? 'text-green-600' : 'text-red-600'
                      }`}>
                        {question.isCorrect ? 'Correct' : 'Incorrect'}
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-between items-center">
                    <p className="text-sm text-gray-600">
                      {question.isCorrect 
                        ? 'Well done! You got this one right.' 
                        : 'Don\'t worry, let\'s learn from this mistake.'
                      }
                    </p>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleViewExplanation(question.questionNumber)}
                      className="gap-2"
                    >
                      <HelpCircle className="w-4 h-4" />
                      View Explanation
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
              <Award className="w-5 h-5 text-purple-600" />
              Performance Insights
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600 mb-1">
                  {Math.round((results.questions.filter(q => q.difficulty === 'Easy' && q.isCorrect).length / 
                    results.questions.filter(q => q.difficulty === 'Easy').length) * 100) || 0}%
                </div>
                <p className="text-sm text-gray-600">Easy Questions</p>
                <p className="text-xs text-gray-500 mt-1">
                  {results.questions.filter(q => q.difficulty === 'Easy' && q.isCorrect).length}/
                  {results.questions.filter(q => q.difficulty === 'Easy').length} correct
                </p>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-yellow-600 mb-1">
                  {Math.round((results.questions.filter(q => q.difficulty === 'Medium' && q.isCorrect).length / 
                    results.questions.filter(q => q.difficulty === 'Medium').length) * 100) || 0}%
                </div>
                <p className="text-sm text-gray-600">Medium Questions</p>
                <p className="text-xs text-gray-500 mt-1">
                  {results.questions.filter(q => q.difficulty === 'Medium' && q.isCorrect).length}/
                  {results.questions.filter(q => q.difficulty === 'Medium').length} correct
                </p>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-red-600 mb-1">
                  {Math.round((results.questions.filter(q => q.difficulty === 'Hard' && q.isCorrect).length / 
                    results.questions.filter(q => q.difficulty === 'Hard').length) * 100) || 0}%
                </div>
                <p className="text-sm text-gray-600">Hard Questions</p>
                <p className="text-xs text-gray-500 mt-1">
                  {results.questions.filter(q => q.difficulty === 'Hard' && q.isCorrect).length}/
                  {results.questions.filter(q => q.difficulty === 'Hard').length} correct
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}