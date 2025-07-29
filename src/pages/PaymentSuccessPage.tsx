import { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { Button } from '../components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card'
import { Badge } from '../components/ui/badge'
import { 
  CheckCircle,
  Download,
  Play,
  Trophy,
  Clock,
  FileText,
  Star,
  Share2,
  Mail,
  Calendar,
  ArrowRight,
  Calculator,
  BookOpen,
  Brain,
  Puzzle,
  Sparkles
} from 'lucide-react'

const subjectIcons = {
  'Mathematics': <Calculator className="w-5 h-5" />,
  'English': <BookOpen className="w-5 h-5" />,
  'Verbal Reasoning': <Brain className="w-5 h-5" />,
  'Non-Verbal Reasoning': <Puzzle className="w-5 h-5" />
}

const subjectColors = {
  'Mathematics': 'bg-blue-500',
  'English': 'bg-green-500',
  'Verbal Reasoning': 'bg-purple-500',
  'Non-Verbal Reasoning': 'bg-orange-500'
}

export default function PaymentSuccessPage() {
  const location = useLocation()
  const navigate = useNavigate()
  const [isGenerating, setIsGenerating] = useState(true)
  const [examGenerated, setExamGenerated] = useState(false)

  // Get payment details from navigation state
  const { examConfig, price, duration, paymentMethod, examId } = location.state || {}

  useEffect(() => {
    if (!examConfig) {
      navigate('/create-exam')
      return
    }

    // Simulate exam generation process
    const timer = setTimeout(() => {
      setIsGenerating(false)
      setExamGenerated(true)
    }, 3000)

    return () => clearTimeout(timer)
  }, [examConfig, navigate])

  const handleDownloadPDF = () => {
    // Simulate PDF download
    const link = document.createElement('a')
    link.href = '#' // In real app, this would be the actual PDF URL
    link.download = `${examConfig.subject}_${examConfig.topic}_Exam.pdf`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  const handleStartPractice = () => {
    // Navigate to online exam
    navigate(`/exam/${examId}`, {
      state: { examConfig, isCustomExam: true }
    })
  }

  const handleShareExam = () => {
    if (navigator.share) {
      navigator.share({
        title: `My Custom ${examConfig.subject} Exam`,
        text: `I just created a custom ${examConfig.subject} exam on ${examConfig.topic}!`,
        url: window.location.origin
      })
    } else {
      // Fallback for browsers that don't support Web Share API
      navigator.clipboard.writeText(window.location.origin)
      alert('Link copied to clipboard!')
    }
  }

  if (!examConfig) {
    return null
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-cyan-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm shadow-sm border-b sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-center h-16">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-purple-600 rounded-lg">
                <Trophy className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">11+ Prep Hub</h1>
                <p className="text-xs text-gray-600">Payment Successful</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {isGenerating ? (
          /* Generation Loading State */
          <div className="text-center py-16">
            <div className="w-20 h-20 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <div className="w-8 h-8 border-4 border-purple-600 border-t-transparent rounded-full animate-spin"></div>
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-4">Generating Your Custom Exam</h1>
            <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
              Our AI is creating a personalized {examConfig.subject} exam on {examConfig.topic} just for you. 
              This will take just a moment...
            </p>
            
            <div className="max-w-md mx-auto">
              <div className="bg-white rounded-lg p-6 shadow-sm">
                <div className="flex items-center gap-3 mb-4">
                  <div className={`w-12 h-12 ${subjectColors[examConfig.subject as keyof typeof subjectColors]} rounded-lg flex items-center justify-center text-white`}>
                    {subjectIcons[examConfig.subject as keyof typeof subjectIcons]}
                  </div>
                  <div className="text-left">
                    <h3 className="font-semibold text-gray-900">{examConfig.subject}</h3>
                    <p className="text-sm text-gray-600">{examConfig.topic}</p>
                  </div>
                </div>
                
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Questions:</span>
                    <span className="font-medium">{examConfig.questionCount}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Difficulty:</span>
                    <Badge className="text-xs">{examConfig.difficulty}</Badge>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Duration:</span>
                    <span className="font-medium">{duration} mins</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          /* Success State */
          <div className="space-y-8">
            {/* Success Header */}
            <div className="text-center">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle className="w-12 h-12 text-green-600" />
              </div>
              <h1 className="text-4xl font-bold text-gray-900 mb-4">Payment Successful! 🎉</h1>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Your custom {examConfig.subject} exam has been generated and is ready for download and practice.
              </p>
            </div>

            {/* Payment Summary */}
            <Card className="max-w-md mx-auto">
              <CardHeader className="text-center">
                <CardTitle className="text-lg">Payment Confirmation</CardTitle>
                <CardDescription>Transaction completed successfully</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Order ID:</span>
                  <span className="font-mono">{examId}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Payment Method:</span>
                  <span>{paymentMethod}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Amount Paid:</span>
                  <span className="font-semibold text-green-600">£{(parseFloat(price) * 1.2).toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Date:</span>
                  <span>{new Date().toLocaleDateString()}</span>
                </div>
              </CardContent>
            </Card>

            {/* Exam Details */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-purple-600" />
                  Your Custom Exam is Ready!
                </CardTitle>
                <CardDescription>
                  Here's what we've generated for you based on your specifications
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Exam Info */}
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <div className={`w-12 h-12 ${subjectColors[examConfig.subject as keyof typeof subjectColors]} rounded-lg flex items-center justify-center text-white`}>
                        {subjectIcons[examConfig.subject as keyof typeof subjectIcons]}
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900">{examConfig.subject} Exam</h3>
                        <p className="text-sm text-gray-600">Topic: {examConfig.topic}</p>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div className="text-center p-3 bg-gray-50 rounded-lg">
                        <div className="text-2xl font-bold text-purple-600">{examConfig.questionCount}</div>
                        <div className="text-xs text-gray-600">Questions</div>
                      </div>
                      <div className="text-center p-3 bg-gray-50 rounded-lg">
                        <div className="text-2xl font-bold text-purple-600">{duration}</div>
                        <div className="text-xs text-gray-600">Minutes</div>
                      </div>
                    </div>
                    
                    <Badge className="w-fit">{examConfig.difficulty} Level</Badge>
                  </div>

                  {/* Action Buttons */}
                  <div className="space-y-3">
                    <Button 
                      onClick={handleDownloadPDF}
                      className="w-full gap-2 bg-purple-600 hover:bg-purple-700"
                      size="lg"
                    >
                      <Download className="w-5 h-5" />
                      Download PDF Exam
                    </Button>
                    
                    <Button 
                      onClick={handleStartPractice}
                      variant="outline"
                      className="w-full gap-2"
                      size="lg"
                    >
                      <Play className="w-5 h-5" />
                      Start Online Practice
                    </Button>
                    
                    <Button 
                      onClick={handleShareExam}
                      variant="outline"
                      className="w-full gap-2"
                      size="sm"
                    >
                      <Share2 className="w-4 h-4" />
                      Share Achievement
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Features Included */}
            <Card>
              <CardHeader>
                <CardTitle>What's Included in Your Purchase</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-green-500" />
                    <div>
                      <h4 className="font-medium">Downloadable PDF</h4>
                      <p className="text-sm text-gray-600">Print-ready exam paper with answer sheet</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-green-500" />
                    <div>
                      <h4 className="font-medium">Online Practice Mode</h4>
                      <p className="text-sm text-gray-600">Interactive exam with instant feedback</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-green-500" />
                    <div>
                      <h4 className="font-medium">Detailed Explanations</h4>
                      <p className="text-sm text-gray-600">Step-by-step solutions for every question</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-green-500" />
                    <div>
                      <h4 className="font-medium">Progress Tracking</h4>
                      <p className="text-sm text-gray-600">Monitor your performance and improvement</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-green-500" />
                    <div>
                      <h4 className="font-medium">Instant Results</h4>
                      <p className="text-sm text-gray-600">Get your score and analysis immediately</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-green-500" />
                    <div>
                      <h4 className="font-medium">Lifetime Access</h4>
                      <p className="text-sm text-gray-600">Practice as many times as you want</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Next Steps */}
            <Card className="bg-gradient-to-r from-purple-50 to-cyan-50 border-purple-200">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Star className="w-5 h-5 text-purple-600" />
                  What's Next?
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-purple-600 rounded-full flex items-center justify-center text-white text-sm font-bold">1</div>
                    <div>
                      <h4 className="font-medium">Download and Print</h4>
                      <p className="text-sm text-gray-600">Download your PDF exam and print it for offline practice</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-purple-600 rounded-full flex items-center justify-center text-white text-sm font-bold">2</div>
                    <div>
                      <h4 className="font-medium">Practice Online</h4>
                      <p className="text-sm text-gray-600">Use our interactive platform for timed practice sessions</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-purple-600 rounded-full flex items-center justify-center text-white text-sm font-bold">3</div>
                    <div>
                      <h4 className="font-medium">Review Results</h4>
                      <p className="text-sm text-gray-600">Analyze your performance and identify areas for improvement</p>
                    </div>
                  </div>
                </div>
                
                <div className="flex gap-3 mt-6">
                  <Button 
                    onClick={() => navigate('/dashboard')}
                    variant="outline"
                    className="gap-2"
                  >
                    <ArrowRight className="w-4 h-4" />
                    Go to Dashboard
                  </Button>
                  
                  <Button 
                    onClick={() => navigate('/create-exam')}
                    variant="outline"
                    className="gap-2"
                  >
                    <Plus className="w-4 h-4" />
                    Create Another Exam
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Email Confirmation */}
            <Card className="border-blue-200 bg-blue-50">
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <Mail className="w-5 h-5 text-blue-600" />
                  <div>
                    <h3 className="font-medium text-blue-900">Confirmation Email Sent</h3>
                    <p className="text-sm text-blue-700">
                      We've sent a confirmation email with your exam details and download links to your registered email address.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  )
}