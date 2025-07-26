import { useState, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { Button } from '../components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card'
import { Badge } from '../components/ui/badge'
import { 
  ArrowLeft,
  CheckCircle,
  XCircle,
  Lightbulb,
  BookOpen,
  Target,
  Clock,
  User,
  ChevronLeft,
  ChevronRight,
  Home,
  RotateCcw,
  Share,
  Bookmark,
  ThumbsUp,
  ThumbsDown,
  MessageCircle
} from 'lucide-react'

interface QuestionData {
  questionNumber: number
  userAnswer: string
  correctAnswer: string
  isCorrect: boolean
  topic: string
  difficulty: 'Easy' | 'Medium' | 'Hard'
  explanation: string
  marks: number
}

interface QuestionDetail {
  id: string
  questionText: string
  options: {
    A: string
    B: string
    C: string
    D: string
  }
  correctAnswer: string
  userAnswer: string
  isCorrect: boolean
  topic: string
  difficulty: 'Easy' | 'Medium' | 'Hard'
  explanation: string
  detailedExplanation: string
  keyPoints: string[]
  relatedTopics: string[]
  practiceQuestions: string[]
  marks: number
}

// Mock function to generate detailed question data
const generateQuestionDetail = (questionData: QuestionData, subject: string): QuestionDetail => {
  const questionTexts = {
    Mathematics: [
      "What is the value of 3x + 7 when x = 4?",
      "If a rectangle has length 8cm and width 5cm, what is its area?",
      "Solve for y: 2y - 6 = 14",
      "What is 25% of 80?",
      "Find the perimeter of a square with side length 6cm"
    ],
    English: [
      "Which word best completes the sentence: 'The cat _____ on the mat'?",
      "What is the past tense of 'run'?",
      "Identify the noun in this sentence: 'The quick brown fox jumps.'",
      "Which punctuation mark should end this sentence: 'What time is it'",
      "What does the word 'enormous' mean?"
    ],
    "Verbal Reasoning": [
      "Complete the analogy: Cat is to Kitten as Dog is to _____",
      "Which word does not belong: Apple, Orange, Banana, Carrot",
      "If all roses are flowers and some flowers are red, then:",
      "Find the next number in the sequence: 2, 4, 8, 16, ___",
      "Which word means the opposite of 'ancient'?"
    ],
    "Non-Verbal Reasoning": [
      "Which shape comes next in the pattern?",
      "How many triangles can you count in this figure?",
      "Which figure is the odd one out?",
      "Complete the pattern by selecting the missing piece",
      "Which shape would you get if you folded this net?"
    ]
  }

  const options = {
    A: "Option A - First choice",
    B: "Option B - Second choice", 
    C: "Option C - Third choice",
    D: "Option D - Fourth choice"
  }

  const explanations = {
    Mathematics: "To solve this problem, we need to apply the fundamental mathematical principles. First, identify what the question is asking for, then use the appropriate formula or method to find the solution.",
    English: "This question tests your understanding of English grammar and vocabulary. The correct answer follows the standard rules of English language structure and meaning.",
    "Verbal Reasoning": "Verbal reasoning questions require you to understand relationships between words and concepts. Look for patterns, analogies, and logical connections to find the correct answer.",
    "Non-Verbal Reasoning": "Non-verbal reasoning involves visual and spatial thinking. Analyze the patterns, shapes, and relationships shown in the figures to determine the logical sequence or missing element."
  }

  const keyPoints = {
    Mathematics: [
      "Always read the question carefully and identify what is being asked",
      "Show your working step by step",
      "Check your answer by substituting back into the original equation",
      "Remember to include the correct units in your final answer"
    ],
    English: [
      "Consider the context of the sentence",
      "Think about grammar rules and sentence structure",
      "Look for clues in the surrounding words",
      "Check if your answer makes logical sense"
    ],
    "Verbal Reasoning": [
      "Look for relationships and patterns between words",
      "Consider multiple meanings of words",
      "Use process of elimination for difficult questions",
      "Practice recognizing common question types"
    ],
    "Non-Verbal Reasoning": [
      "Study the pattern carefully before answering",
      "Look for rotations, reflections, and transformations",
      "Count elements systematically",
      "Consider both obvious and subtle changes in the sequence"
    ]
  }

  return {
    id: `q-${questionData.questionNumber}`,
    questionText: questionTexts[subject as keyof typeof questionTexts]?.[questionData.questionNumber % 5] || "Sample question text",
    options,
    correctAnswer: questionData.correctAnswer,
    userAnswer: questionData.userAnswer,
    isCorrect: questionData.isCorrect,
    topic: questionData.topic,
    difficulty: questionData.difficulty,
    explanation: questionData.explanation,
    detailedExplanation: explanations[subject as keyof typeof explanations] || "Detailed explanation of the solution approach and methodology.",
    keyPoints: keyPoints[subject as keyof typeof keyPoints] || ["Key point 1", "Key point 2"],
    relatedTopics: [`${subject} Fundamentals`, `Advanced ${subject}`, `${subject} Practice`],
    practiceQuestions: [
      "Practice Question 1: Similar concept",
      "Practice Question 2: Related topic", 
      "Practice Question 3: Advanced level"
    ],
    marks: questionData.marks
  }
}

export default function AnswerExplanationPage() {
  const location = useLocation()
  const navigate = useNavigate()
  const [questionDetail, setQuestionDetail] = useState<QuestionDetail | null>(null)
  const [isBookmarked, setIsBookmarked] = useState(false)
  const [feedback, setFeedback] = useState<'helpful' | 'not-helpful' | null>(null)

  useEffect(() => {
    const { question, examTitle, subject } = location.state || {}
    if (question && examTitle && subject) {
      const detail = generateQuestionDetail(question, subject)
      setQuestionDetail(detail)
    } else {
      navigate('/dashboard')
    }
  }, [location.state, navigate])

  if (!questionDetail) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-purple-600 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-gray-600">Loading explanation...</p>
        </div>
      </div>
    )
  }

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Easy': return 'bg-green-100 text-green-800'
      case 'Medium': return 'bg-yellow-100 text-yellow-800'
      case 'Hard': return 'bg-red-100 text-red-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const handleGoBack = () => {
    navigate(-1)
  }

  const handleFeedback = (type: 'helpful' | 'not-helpful') => {
    setFeedback(type)
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
                onClick={handleGoBack}
                className="gap-2"
              >
                <ArrowLeft className="w-4 h-4" />
                Back to Results
              </Button>
              <div className="h-6 w-px bg-gray-300" />
              <h1 className="text-xl font-semibold text-gray-900">Answer Explanation</h1>
            </div>
            <div className="flex items-center gap-3">
              <Button
                variant="ghost"
                onClick={() => navigate('/dashboard')}
                className="gap-2"
              >
                <Home className="w-4 h-4" />
                Dashboard
              </Button>
              <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                <User className="w-5 h-5 text-purple-600" />
              </div>
              <span className="text-sm font-medium text-gray-900">Alex Johnson</span>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Question Header */}
        <Card className="mb-6">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                  questionDetail.isCorrect
                    ? 'bg-green-100 text-green-600'
                    : 'bg-red-100 text-red-600'
                }`}>
                  {questionDetail.isCorrect ? (
                    <CheckCircle className="w-6 h-6" />
                  ) : (
                    <XCircle className="w-6 h-6" />
                  )}
                </div>
                <div>
                  <CardTitle className="text-xl">
                    Question {questionDetail.id.split('-')[1]}
                  </CardTitle>
                  <CardDescription className="flex items-center gap-2 mt-1">
                    <span>{questionDetail.topic}</span>
                    <Badge className={getDifficultyColor(questionDetail.difficulty)}>
                      {questionDetail.difficulty}
                    </Badge>
                    <Badge variant="outline">
                      {questionDetail.marks} mark{questionDetail.marks !== 1 ? 's' : ''}
                    </Badge>
                  </CardDescription>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsBookmarked(!isBookmarked)}
                  className={`gap-2 ${isBookmarked ? 'text-purple-600' : 'text-gray-600'}`}
                >
                  <Bookmark className={`w-4 h-4 ${isBookmarked ? 'fill-current' : ''}`} />
                  {isBookmarked ? 'Bookmarked' : 'Bookmark'}
                </Button>
                <Button variant="ghost" size="sm" className="gap-2">
                  <Share className="w-4 h-4" />
                  Share
                </Button>
              </div>
            </div>
          </CardHeader>
        </Card>

        {/* Question Content */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="w-5 h-5 text-purple-600" />
              Question
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-lg text-gray-900 mb-6 p-4 bg-gray-50 rounded-lg">
              {questionDetail.questionText}
            </div>

            {/* Options */}
            <div className="space-y-3 mb-6">
              {Object.entries(questionDetail.options).map(([key, value]) => (
                <div
                  key={key}
                  className={`p-4 rounded-lg border-2 ${
                    key === questionDetail.correctAnswer
                      ? 'border-green-500 bg-green-50'
                      : key === questionDetail.userAnswer && !questionDetail.isCorrect
                      ? 'border-red-500 bg-red-50'
                      : 'border-gray-200 bg-white'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center font-semibold ${
                      key === questionDetail.correctAnswer
                        ? 'bg-green-100 text-green-600'
                        : key === questionDetail.userAnswer && !questionDetail.isCorrect
                        ? 'bg-red-100 text-red-600'
                        : 'bg-gray-100 text-gray-600'
                    }`}>
                      {key}
                    </div>
                    <span className="text-gray-900">{value}</span>
                    {key === questionDetail.correctAnswer && (
                      <Badge className="ml-auto bg-green-100 text-green-800">
                        Correct Answer
                      </Badge>
                    )}
                    {key === questionDetail.userAnswer && !questionDetail.isCorrect && (
                      <Badge className="ml-auto bg-red-100 text-red-800">
                        Your Answer
                      </Badge>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Answer Summary */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 bg-gray-50 rounded-lg">
                <h4 className="font-semibold text-gray-900 mb-2">Your Answer</h4>
                <div className={`text-2xl font-bold ${
                  questionDetail.isCorrect ? 'text-green-600' : 'text-red-600'
                }`}>
                  {questionDetail.userAnswer}
                </div>
                <p className={`text-sm mt-1 ${
                  questionDetail.isCorrect ? 'text-green-600' : 'text-red-600'
                }`}>
                  {questionDetail.isCorrect ? 'Correct!' : 'Incorrect'}
                </p>
              </div>
              <div className="p-4 bg-green-50 rounded-lg">
                <h4 className="font-semibold text-gray-900 mb-2">Correct Answer</h4>
                <div className="text-2xl font-bold text-green-600">
                  {questionDetail.correctAnswer}
                </div>
                <p className="text-sm text-green-600 mt-1">
                  This is the right choice
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Detailed Explanation */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Lightbulb className="w-5 h-5 text-purple-600" />
              Detailed Explanation
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="prose max-w-none">
              <p className="text-gray-700 leading-relaxed mb-4">
                {questionDetail.detailedExplanation}
              </p>
              
              <h4 className="font-semibold text-gray-900 mb-3">Key Points to Remember:</h4>
              <ul className="space-y-2 mb-6">
                {questionDetail.keyPoints.map((point, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <div className="w-2 h-2 bg-purple-600 rounded-full mt-2 flex-shrink-0" />
                    <span className="text-gray-700">{point}</span>
                  </li>
                ))}
              </ul>

              {!questionDetail.isCorrect && (
                <div className="p-4 bg-blue-50 rounded-lg">
                  <h4 className="font-semibold text-blue-900 mb-2">Why this matters:</h4>
                  <p className="text-blue-800 text-sm">
                    Understanding this concept is crucial for mastering {questionDetail.topic}. 
                    Practice similar questions to strengthen your knowledge in this area.
                  </p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Related Topics & Practice */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-purple-600" />
                Related Topics
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {questionDetail.relatedTopics.map((topic, index) => (
                  <Button
                    key={index}
                    variant="ghost"
                    className="w-full justify-start text-left h-auto p-3"
                  >
                    <div>
                      <p className="font-medium text-gray-900">{topic}</p>
                      <p className="text-sm text-gray-600">Study this topic</p>
                    </div>
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <RotateCcw className="w-5 h-5 text-purple-600" />
                Practice More
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {questionDetail.practiceQuestions.map((question, index) => (
                  <Button
                    key={index}
                    variant="ghost"
                    className="w-full justify-start text-left h-auto p-3"
                  >
                    <div>
                      <p className="font-medium text-gray-900">{question}</p>
                      <p className="text-sm text-gray-600">Try this question</p>
                    </div>
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Feedback Section */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MessageCircle className="w-5 h-5 text-purple-600" />
              Was this explanation helpful?
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-4">
              <Button
                variant={feedback === 'helpful' ? 'default' : 'outline'}
                onClick={() => handleFeedback('helpful')}
                className="gap-2"
              >
                <ThumbsUp className="w-4 h-4" />
                Yes, helpful
              </Button>
              <Button
                variant={feedback === 'not-helpful' ? 'default' : 'outline'}
                onClick={() => handleFeedback('not-helpful')}
                className="gap-2"
              >
                <ThumbsDown className="w-4 h-4" />
                Needs improvement
              </Button>
              {feedback && (
                <span className="text-sm text-gray-600 ml-4">
                  Thank you for your feedback!
                </span>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Navigation */}
        <div className="flex justify-between items-center mt-8">
          <Button variant="outline" className="gap-2">
            <ChevronLeft className="w-4 h-4" />
            Previous Question
          </Button>
          <Button className="gap-2">
            Next Question
            <ChevronRight className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  )
}