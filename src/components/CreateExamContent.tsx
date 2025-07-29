import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from './ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card'
import { Badge } from './ui/badge'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select'
import { Label } from './ui/label'
import { 
  Calculator,
  BookOpen,
  Brain,
  Puzzle,
  Plus,
  Minus,
  Zap,
  Clock,
  CreditCard,
  CheckCircle
} from 'lucide-react'

interface ExamConfig {
  subject: string
  topic: string
  instructions: string
  questionCount: number
  difficulty: 'Easy' | 'Medium' | 'Hard'
}

const subjects = {
  'Mathematics': {
    icon: <Calculator className="w-5 h-5" />,
    color: 'bg-blue-500',
    topics: [
      'Algebra',
      'BODMAS',
      'Fractions',
      'Decimals',
      'Percentages',
      'Geometry',
      'Measurement',
      'Number Patterns',
      'Word Problems',
      'Statistics'
    ]
  },
  'English': {
    icon: <BookOpen className="w-5 h-5" />,
    color: 'bg-green-500',
    topics: [
      'Reading Comprehension',
      'Grammar',
      'Punctuation',
      'Vocabulary',
      'Creative Writing',
      'Spelling',
      'Sentence Structure',
      'Literary Devices',
      'Essay Writing',
      'Poetry Analysis'
    ]
  },
  'Verbal Reasoning': {
    icon: <Brain className="w-5 h-5" />,
    color: 'bg-purple-500',
    topics: [
      'Word Relationships',
      'Analogies',
      'Classification',
      'Series Completion',
      'Logical Deduction',
      'Code Breaking',
      'Following Instructions',
      'Alphabet Series',
      'Number Series',
      'Missing Words'
    ]
  },
  'Non-Verbal Reasoning': {
    icon: <Puzzle className="w-5 h-5" />,
    color: 'bg-orange-500',
    topics: [
      'Pattern Recognition',
      'Shape Sequences',
      'Mirror Images',
      'Rotations',
      'Folding Papers',
      '3D Shapes',
      'Analogies',
      'Odd One Out',
      'Matrices',
      'Spatial Reasoning'
    ]
  }
}

const difficultyInfo = {
  'Easy': {
    color: 'bg-green-100 text-green-800',
    description: 'Perfect for beginners and building confidence',
    price: 2.99
  },
  'Medium': {
    color: 'bg-yellow-100 text-yellow-800',
    description: 'Balanced challenge for steady progress',
    price: 4.99
  },
  'Hard': {
    color: 'bg-red-100 text-red-800',
    description: 'Advanced level for exam excellence',
    price: 6.99
  }
}

export default function CreateExamContent() {
  const navigate = useNavigate()
  const [examConfig, setExamConfig] = useState<ExamConfig>({
    subject: '',
    topic: '',
    instructions: '',
    questionCount: 20,
    difficulty: 'Medium'
  })

  const calculateDuration = () => {
    const baseMinutes = examConfig.difficulty === 'Easy' ? 1.5 : examConfig.difficulty === 'Medium' ? 2 : 2.5
    return Math.round(examConfig.questionCount * baseMinutes)
  }

  const handleSubjectChange = (subject: string) => {
    setExamConfig(prev => ({
      ...prev,
      subject,
      topic: '', // Reset topic when subject changes
      instructions: '' // Reset instructions when subject changes
    }))
  }

  const handleTopicChange = (topic: string) => {
    const defaultInstructions = `Welcome to your ${examConfig.subject} exam on ${topic}. 

Instructions:
• Read each question carefully before answering
• Choose the best answer from the given options
• You can navigate between questions using the Previous/Next buttons
• Make sure to review your answers before submitting
• You have ${calculateDuration()} minutes to complete this exam

Good luck with your exam!`

    setExamConfig(prev => ({
      ...prev,
      topic,
      instructions: defaultInstructions
    }))
  }

  const handleQuestionCountChange = (increment: boolean) => {
    setExamConfig(prev => ({
      ...prev,
      questionCount: increment 
        ? Math.min(prev.questionCount + 5, 50)
        : Math.max(prev.questionCount - 5, 10)
    }))
  }

  const calculatePrice = () => {
    const basePrice = difficultyInfo[examConfig.difficulty].price
    const questionMultiplier = examConfig.questionCount / 20 // Base 20 questions
    return (basePrice * questionMultiplier).toFixed(2)
  }

  const isConfigComplete = () => {
    return examConfig.subject && examConfig.topic && examConfig.questionCount >= 10
  }

  const handleGenerateExam = () => {
    if (isConfigComplete()) {
      // Navigate to payment page with exam config
      navigate('/payment', { 
        state: { 
          examConfig,
          price: calculatePrice(),
          duration: calculateDuration()
        }
      })
    }
  }

  return (
    <div className="p-6">
      {/* Page Header */}
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Create Your Custom Exam</h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Design a personalized exam tailored to your learning needs. Choose your subject, topic, difficulty level, and number of questions.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Configuration Panel */}
        <div className="lg:col-span-2 space-y-6">
          {/* Subject Selection */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
                  <span className="text-purple-600 font-bold">1</span>
                </div>
                Choose Subject
              </CardTitle>
              <CardDescription>
                Select the subject area for your custom exam
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {Object.entries(subjects).map(([subject, info]) => (
                  <button
                    key={subject}
                    onClick={() => handleSubjectChange(subject)}
                    className={`p-4 rounded-lg border-2 transition-all ${
                      examConfig.subject === subject
                        ? 'border-purple-500 bg-purple-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-12 h-12 ${info.color} rounded-lg flex items-center justify-center text-white`}>
                        {info.icon}
                      </div>
                      <div className="text-left">
                        <h3 className="font-semibold text-gray-900">{subject}</h3>
                        <p className="text-sm text-gray-600">{info.topics.length} topics available</p>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Topic Selection */}
          <Card className={examConfig.subject ? '' : 'opacity-50'}>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
                  <span className="text-purple-600 font-bold">2</span>
                </div>
                Select Topic
              </CardTitle>
              <CardDescription>
                Choose the specific topic you want to focus on
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Select 
                value={examConfig.topic} 
                onValueChange={handleTopicChange}
                disabled={!examConfig.subject}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select a topic..." />
                </SelectTrigger>
                <SelectContent>
                  {examConfig.subject && subjects[examConfig.subject as keyof typeof subjects].topics.map((topic) => (
                    <SelectItem key={topic} value={topic}>
                      {topic}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </CardContent>
          </Card>

          {/* Instructions */}
          <Card className={examConfig.topic ? '' : 'opacity-50'}>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
                  <span className="text-purple-600 font-bold">3</span>
                </div>
                Exam Instructions
              </CardTitle>
              <CardDescription>
                Review and customize the instructions for your exam
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <Label htmlFor="instructions">Instructions for Students</Label>
                <textarea
                  id="instructions"
                  value={examConfig.instructions}
                  onChange={(e) => setExamConfig(prev => ({ ...prev, instructions: e.target.value }))}
                  disabled={!examConfig.topic}
                  placeholder="Instructions will appear here once you select a topic..."
                  className="w-full h-32 p-3 border border-gray-300 rounded-lg resize-none focus:ring-2 focus:ring-purple-500 focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed"
                />
                <p className="text-sm text-gray-500">
                  These instructions will be shown to students before they start the exam.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Question Count */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
                  <span className="text-purple-600 font-bold">4</span>
                </div>
                Number of Questions
              </CardTitle>
              <CardDescription>
                Choose how many questions you want in your exam (10-50)
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-center gap-4">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleQuestionCountChange(false)}
                  disabled={examConfig.questionCount <= 10}
                >
                  <Minus className="w-4 h-4" />
                </Button>
                <div className="text-center">
                  <div className="text-3xl font-bold text-purple-600">{examConfig.questionCount}</div>
                  <div className="text-sm text-gray-600">questions</div>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleQuestionCountChange(true)}
                  disabled={examConfig.questionCount >= 50}
                >
                  <Plus className="w-4 h-4" />
                </Button>
              </div>
              <div className="mt-4 text-center text-sm text-gray-600">
                Estimated duration: {calculateDuration()} minutes
              </div>
            </CardContent>
          </Card>

          {/* Difficulty Level */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
                  <span className="text-purple-600 font-bold">5</span>
                </div>
                Difficulty Level
              </CardTitle>
              <CardDescription>
                Select the challenge level that matches your current ability
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {Object.entries(difficultyInfo).map(([difficulty, info]) => (
                  <button
                    key={difficulty}
                    onClick={() => setExamConfig(prev => ({ ...prev, difficulty: difficulty as 'Easy' | 'Medium' | 'Hard' }))}
                    className={`p-4 rounded-lg border-2 transition-all ${
                      examConfig.difficulty === difficulty
                        ? 'border-purple-500 bg-purple-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className="text-center">
                      <Badge className={`${info.color} mb-2`}>
                        {difficulty}
                      </Badge>
                      <p className="text-sm text-gray-600">{info.description}</p>
                      <p className="text-lg font-bold text-purple-600 mt-2">£{info.price}</p>
                    </div>
                  </button>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Summary Panel */}
        <div className="lg:col-span-1">
          <Card className="sticky top-24">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Zap className="w-5 h-5 text-purple-600" />
                Exam Summary
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Subject */}
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Subject:</span>
                <span className="font-medium">
                  {examConfig.subject || 'Not selected'}
                </span>
              </div>

              {/* Topic */}
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Topic:</span>
                <span className="font-medium">
                  {examConfig.topic || 'Not selected'}
                </span>
              </div>

              {/* Questions */}
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Questions:</span>
                <span className="font-medium">{examConfig.questionCount}</span>
              </div>

              {/* Difficulty */}
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Difficulty:</span>
                <Badge className={difficultyInfo[examConfig.difficulty].color}>
                  {examConfig.difficulty}
                </Badge>
              </div>

              {/* Duration */}
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Duration:</span>
                <div className="flex items-center gap-1">
                  <Clock className="w-4 h-4 text-gray-500" />
                  <span className="font-medium">{calculateDuration()} mins</span>
                </div>
              </div>

              <div className="border-t pt-4">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-lg font-semibold">Total Price:</span>
                  <span className="text-2xl font-bold text-purple-600">£{calculatePrice()}</span>
                </div>

                <Button
                  onClick={handleGenerateExam}
                  disabled={!isConfigComplete()}
                  className="w-full gap-2 bg-purple-600 hover:bg-purple-700"
                  size="lg"
                >
                  <CreditCard className="w-5 h-5" />
                  Generate Exam
                </Button>

                {!isConfigComplete() && (
                  <p className="text-sm text-gray-500 text-center mt-2">
                    Please complete all selections above
                  </p>
                )}
              </div>

              {/* Features */}
              <div className="border-t pt-4">
                <h4 className="font-semibold mb-3">What's included:</h4>
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    <span>Downloadable PDF</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    <span>Online practice mode</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    <span>Detailed answer explanations</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    <span>Progress tracking</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    <span>Instant results</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}