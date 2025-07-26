import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { Button } from '../components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card'
import { Badge } from '../components/ui/badge'
import { Progress } from '../components/ui/progress'
import { 
  Clock,
  ChevronLeft,
  ChevronRight,
  Flag,
  CheckCircle,
  AlertCircle,
  Trophy,
  Target,
  BookOpen,
  Calculator,
  Brain,
  Puzzle,
  Home,
  RotateCcw
} from 'lucide-react'

interface Question {
  id: string
  question: string
  options: string[]
  correctAnswer: number
  explanation: string
  topic: string
}

interface ExamData {
  id: string
  title: string
  subject: string
  difficulty: string
  duration: number // in minutes
  questions: Question[]
}

// Sample exam data
const examData: Record<string, ExamData> = {
  'math-1': {
    id: 'math-1',
    title: 'Basic Arithmetic & Number Operations',
    subject: 'Mathematics',
    difficulty: 'Beginner',
    duration: 45,
    questions: [
      {
        id: '1',
        question: 'What is 24 + 37?',
        options: ['59', '61', '63', '65'],
        correctAnswer: 1,
        explanation: '24 + 37 = 61. Add the ones place: 4 + 7 = 11 (write 1, carry 1). Add the tens place: 2 + 3 + 1 = 6.',
        topic: 'Addition'
      },
      {
        id: '2',
        question: 'If you have 5 bags with 8 apples in each bag, how many apples do you have in total?',
        options: ['35', '40', '45', '50'],
        correctAnswer: 1,
        explanation: '5 × 8 = 40. When you multiply 5 bags by 8 apples per bag, you get 40 apples total.',
        topic: 'Multiplication'
      },
      {
        id: '3',
        question: 'What is the next number in the sequence: 2, 4, 6, 8, ?',
        options: ['9', '10', '11', '12'],
        correctAnswer: 1,
        explanation: 'This is a sequence of even numbers increasing by 2 each time. 8 + 2 = 10.',
        topic: 'Number Patterns'
      },
      {
        id: '4',
        question: 'What is 72 ÷ 9?',
        options: ['6', '7', '8', '9'],
        correctAnswer: 2,
        explanation: '72 ÷ 9 = 8. Think: 9 × 8 = 72, so 72 ÷ 9 = 8.',
        topic: 'Division'
      },
      {
        id: '5',
        question: 'What is 156 - 89?',
        options: ['67', '69', '71', '73'],
        correctAnswer: 0,
        explanation: '156 - 89 = 67. Subtract column by column, borrowing when necessary.',
        topic: 'Subtraction'
      }
    ]
  },
  'eng-1': {
    id: 'eng-1',
    title: 'Reading Comprehension Basics',
    subject: 'English',
    difficulty: 'Beginner',
    duration: 40,
    questions: [
      {
        id: '1',
        question: 'Read the passage: "The cat sat on the mat and watched the birds outside." What was the cat doing?',
        options: ['Sleeping', 'Eating', 'Watching birds', 'Playing'],
        correctAnswer: 2,
        explanation: 'The passage clearly states that the cat "watched the birds outside."',
        topic: 'Reading Comprehension'
      },
      {
        id: '2',
        question: 'Which word is a synonym for "happy"?',
        options: ['Sad', 'Joyful', 'Angry', 'Tired'],
        correctAnswer: 1,
        explanation: 'Joyful means the same as happy - both describe a positive, cheerful feeling.',
        topic: 'Vocabulary'
      },
      {
        id: '3',
        question: 'What is the main idea of this sentence: "Dogs are loyal pets that love to play and protect their families"?',
        options: ['Dogs are animals', 'Dogs make good pets', 'Dogs are big', 'Dogs are scary'],
        correctAnswer: 1,
        explanation: 'The sentence describes positive qualities of dogs (loyal, playful, protective), showing they make good pets.',
        topic: 'Main Ideas'
      },
      {
        id: '4',
        question: 'Which sentence is written correctly?',
        options: ['the boy ran fast', 'The boy ran fast.', 'the Boy ran fast.', 'The boy ran Fast'],
        correctAnswer: 1,
        explanation: 'Sentences should start with a capital letter and end with appropriate punctuation.',
        topic: 'Grammar'
      }
    ]
  }
}

const subjectIcons = {
  Mathematics: <Calculator className="w-5 h-5" />,
  English: <BookOpen className="w-5 h-5" />,
  'Verbal Reasoning': <Brain className="w-5 h-5" />,
  'Non-Verbal Reasoning': <Puzzle className="w-5 h-5" />
}

export default function ExamPage() {
  const { examId } = useParams<{ examId: string }>()
  const navigate = useNavigate()
  
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, number>>({})
  const [timeRemaining, setTimeRemaining] = useState(0)
  const [isExamStarted, setIsExamStarted] = useState(false)
  const [isExamFinished, setIsExamFinished] = useState(false)
  const [showResults, setShowResults] = useState(false)

  const exam = examId ? examData[examId] : null

  useEffect(() => {
    if (exam && isExamStarted && !isExamFinished) {
      setTimeRemaining(exam.duration * 60) // Convert minutes to seconds
    }
  }, [exam, isExamStarted, isExamFinished])

  useEffect(() => {
    let timer: NodeJS.Timeout
    if (isExamStarted && !isExamFinished && timeRemaining > 0) {
      timer = setInterval(() => {
        setTimeRemaining(prev => {
          if (prev <= 1) {
            setIsExamFinished(true)
            setShowResults(true)
            return 0
          }
          return prev - 1
        })
      }, 1000)
    }
    return () => clearInterval(timer)
  }, [isExamStarted, isExamFinished, timeRemaining])

  if (!exam) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardContent className="p-8 text-center">
            <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
            <h2 className="text-xl font-semibold mb-2">Exam Not Found</h2>
            <p className="text-gray-600 mb-4">The requested exam could not be found.</p>
            <Button onClick={() => navigate('/dashboard')}>
              <Home className="w-4 h-4 mr-2" />
              Back to Dashboard
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60)
    const remainingSeconds = seconds % 60
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`
  }

  const handleAnswerSelect = (questionId: string, answerIndex: number) => {
    setSelectedAnswers(prev => ({
      ...prev,
      [questionId]: answerIndex
    }))
  }

  const handleNextQuestion = () => {
    if (currentQuestionIndex < exam.questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1)
    }
  }

  const handlePreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1)
    }
  }

  const handleFinishExam = () => {
    setIsExamFinished(true)
    setShowResults(true)
  }

  const calculateResults = () => {
    let correct = 0
    let attempted = 0
    
    exam.questions.forEach(question => {
      if (selectedAnswers[question.id] !== undefined) {
        attempted++
        if (selectedAnswers[question.id] === question.correctAnswer) {
          correct++
        }
      }
    })

    const percentage = attempted > 0 ? Math.round((correct / exam.questions.length) * 100) : 0
    
    return {
      correct,
      attempted,
      total: exam.questions.length,
      percentage,
      unattempted: exam.questions.length - attempted
    }
  }

  const getRecommendation = (percentage: number) => {
    if (percentage >= 80) {
      return {
        level: 'Excellent',
        color: 'text-green-600',
        message: 'Outstanding performance! You\'re ready for more challenging papers.',
        icon: <Trophy className="w-5 h-5 text-green-600" />
      }
    } else if (percentage >= 60) {
      return {
        level: 'Good',
        color: 'text-blue-600',
        message: 'Good work! Practice a few more papers to improve your confidence.',
        icon: <Target className="w-5 h-5 text-blue-600" />
      }
    } else if (percentage >= 40) {
      return {
        level: 'Fair',
        color: 'text-yellow-600',
        message: 'You\'re making progress! Focus on understanding the concepts better.',
        icon: <AlertCircle className="w-5 h-5 text-yellow-600" />
      }
    } else {
      return {
        level: 'Needs Improvement',
        color: 'text-red-600',
        message: 'Don\'t worry! Review the topics and try some easier papers first.',
        icon: <RotateCcw className="w-5 h-5 text-red-600" />
      }
    }
  }

  // Pre-exam screen
  if (!isExamStarted) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Card className="w-full max-w-2xl">
          <CardHeader className="text-center">
            <div className="flex items-center justify-center gap-3 mb-4">
              {subjectIcons[exam.subject as keyof typeof subjectIcons]}
              <CardTitle className="text-2xl">{exam.title}</CardTitle>
            </div>
            <CardDescription className="text-lg">
              {exam.subject} • {exam.difficulty} Level
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
              <div className="p-4 bg-blue-50 rounded-lg">
                <div className="text-2xl font-bold text-blue-600">{exam.questions.length}</div>
                <div className="text-sm text-gray-600">Questions</div>
              </div>
              <div className="p-4 bg-green-50 rounded-lg">
                <div className="text-2xl font-bold text-green-600">{exam.duration}</div>
                <div className="text-sm text-gray-600">Minutes</div>
              </div>
              <div className="p-4 bg-purple-50 rounded-lg">
                <div className="text-2xl font-bold text-purple-600">{exam.difficulty}</div>
                <div className="text-sm text-gray-600">Level</div>
              </div>
            </div>

            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <h3 className="font-semibold text-yellow-800 mb-2">Instructions:</h3>
              <ul className="text-sm text-yellow-700 space-y-1">
                <li>• Read each question carefully before selecting your answer</li>
                <li>• You can navigate between questions using the Previous/Next buttons</li>
                <li>• Your progress is automatically saved</li>
                <li>• Click "Finish Exam" when you're done or time runs out</li>
              </ul>
            </div>

            <div className="flex gap-4">
              <Button 
                variant="outline" 
                className="flex-1"
                onClick={() => navigate(-1)}
              >
                Cancel
              </Button>
              <Button 
                className="flex-1 bg-purple-600 hover:bg-purple-700"
                onClick={() => setIsExamStarted(true)}
              >
                Start Exam
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  // Results screen
  if (showResults) {
    const results = calculateResults()
    const recommendation = getRecommendation(results.percentage)

    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Card className="mb-6">
            <CardHeader className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-8 h-8 text-purple-600" />
              </div>
              <CardTitle className="text-2xl">Exam Completed!</CardTitle>
              <CardDescription>{exam.title}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                <div className="text-center p-4 bg-green-50 rounded-lg">
                  <div className="text-3xl font-bold text-green-600">{results.correct}</div>
                  <div className="text-sm text-gray-600">Correct</div>
                </div>
                <div className="text-center p-4 bg-red-50 rounded-lg">
                  <div className="text-3xl font-bold text-red-600">{results.total - results.correct}</div>
                  <div className="text-sm text-gray-600">Incorrect</div>
                </div>
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <div className="text-3xl font-bold text-gray-600">{results.unattempted}</div>
                  <div className="text-sm text-gray-600">Unattempted</div>
                </div>
                <div className="text-center p-4 bg-purple-50 rounded-lg">
                  <div className="text-3xl font-bold text-purple-600">{results.percentage}%</div>
                  <div className="text-sm text-gray-600">Score</div>
                </div>
              </div>

              <div className="mb-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium">Overall Progress</span>
                  <span className="text-sm text-gray-600">{results.correct}/{results.total}</span>
                </div>
                <Progress value={results.percentage} className="h-3" />
              </div>

              <Card className="mb-6">
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    {recommendation.icon}
                    <div>
                      <h3 className={`font-semibold ${recommendation.color}`}>
                        {recommendation.level}
                      </h3>
                      <p className="text-gray-600 text-sm">{recommendation.message}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <div className="flex gap-4">
                <Button 
                  variant="outline" 
                  className="flex-1"
                  onClick={() => navigate('/dashboard')}
                >
                  <Home className="w-4 h-4 mr-2" />
                  Back to Dashboard
                </Button>
                <Button 
                  className="flex-1"
                  onClick={() => {
                    setCurrentQuestionIndex(0)
                    setSelectedAnswers({})
                    setIsExamStarted(false)
                    setIsExamFinished(false)
                    setShowResults(false)
                  }}
                >
                  <RotateCcw className="w-4 h-4 mr-2" />
                  Retake Exam
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Question Review */}
          <Card>
            <CardHeader>
              <CardTitle>Question Review</CardTitle>
              <CardDescription>Review your answers and explanations</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {exam.questions.map((question, index) => {
                  const userAnswer = selectedAnswers[question.id]
                  const isCorrect = userAnswer === question.correctAnswer
                  const wasAttempted = userAnswer !== undefined

                  return (
                    <div key={question.id} className="border rounded-lg p-4">
                      <div className="flex items-start gap-3 mb-3">
                        <div className={`w-6 h-6 rounded-full flex items-center justify-center text-sm font-medium ${
                          !wasAttempted ? 'bg-gray-200 text-gray-600' :
                          isCorrect ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'
                        }`}>
                          {index + 1}
                        </div>
                        <div className="flex-1">
                          <p className="font-medium mb-2">{question.question}</p>
                          <div className="space-y-1">
                            {question.options.map((option, optionIndex) => (
                              <div 
                                key={optionIndex}
                                className={`p-2 rounded text-sm ${
                                  optionIndex === question.correctAnswer ? 'bg-green-100 text-green-800' :
                                  optionIndex === userAnswer && !isCorrect ? 'bg-red-100 text-red-800' :
                                  'bg-gray-50'
                                }`}
                              >
                                {String.fromCharCode(65 + optionIndex)}. {option}
                                {optionIndex === question.correctAnswer && (
                                  <CheckCircle className="w-4 h-4 inline ml-2 text-green-600" />
                                )}
                              </div>
                            ))}
                          </div>
                          <div className="mt-3 p-3 bg-blue-50 rounded text-sm">
                            <strong>Explanation:</strong> {question.explanation}
                          </div>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  // Exam interface
  const currentQuestion = exam.questions[currentQuestionIndex]
  const progress = ((currentQuestionIndex + 1) / exam.questions.length) * 100

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                {subjectIcons[exam.subject as keyof typeof subjectIcons]}
                <span className="font-medium">{exam.title}</span>
              </div>
            </div>
            
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2 text-sm">
                <Clock className="w-4 h-4" />
                <span className={`font-mono ${timeRemaining < 300 ? 'text-red-600' : 'text-gray-700'}`}>
                  {formatTime(timeRemaining)}
                </span>
              </div>
              
              <div className="text-sm text-gray-600">
                Question {currentQuestionIndex + 1} of {exam.questions.length}
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Progress Bar */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium">Progress</span>
            <span className="text-sm text-gray-600">{Math.round(progress)}%</span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>

        {/* Question Card */}
        <Card className="mb-6">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg">
                Question {currentQuestionIndex + 1}
              </CardTitle>
              <Badge variant="outline">{currentQuestion.topic}</Badge>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-lg mb-6">{currentQuestion.question}</p>
            
            <div className="space-y-3">
              {currentQuestion.options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => handleAnswerSelect(currentQuestion.id, index)}
                  className={`w-full p-4 text-left rounded-lg border-2 transition-colors ${
                    selectedAnswers[currentQuestion.id] === index
                      ? 'border-purple-500 bg-purple-50'
                      : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center text-sm font-medium ${
                      selectedAnswers[currentQuestion.id] === index
                        ? 'border-purple-500 bg-purple-500 text-white'
                        : 'border-gray-300'
                    }`}>
                      {String.fromCharCode(65 + index)}
                    </div>
                    <span>{option}</span>
                  </div>
                </button>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Navigation */}
        <div className="flex items-center justify-between">
          <Button
            variant="outline"
            onClick={handlePreviousQuestion}
            disabled={currentQuestionIndex === 0}
          >
            <ChevronLeft className="w-4 h-4 mr-2" />
            Previous
          </Button>

          <div className="flex gap-2">
            {currentQuestionIndex === exam.questions.length - 1 ? (
              <Button
                onClick={handleFinishExam}
                className="bg-green-600 hover:bg-green-700"
              >
                <Flag className="w-4 h-4 mr-2" />
                Finish Exam
              </Button>
            ) : (
              <Button
                onClick={handleNextQuestion}
                disabled={currentQuestionIndex === exam.questions.length - 1}
              >
                Next
                <ChevronRight className="w-4 h-4 ml-2" />
              </Button>
            )}
          </div>
        </div>

        {/* Question Navigator */}
        <Card className="mt-6">
          <CardHeader>
            <CardTitle className="text-lg">Question Navigator</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-5 sm:grid-cols-10 gap-2">
              {exam.questions.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentQuestionIndex(index)}
                  className={`w-10 h-10 rounded-lg text-sm font-medium transition-colors ${
                    index === currentQuestionIndex
                      ? 'bg-purple-600 text-white'
                      : selectedAnswers[exam.questions[index].id] !== undefined
                      ? 'bg-green-100 text-green-800 border border-green-300'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  {index + 1}
                </button>
              ))}
            </div>
            <div className="flex items-center gap-6 mt-4 text-sm">
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-purple-600 rounded"></div>
                <span>Current</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-green-100 border border-green-300 rounded"></div>
                <span>Answered</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-gray-100 rounded"></div>
                <span>Not Answered</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}