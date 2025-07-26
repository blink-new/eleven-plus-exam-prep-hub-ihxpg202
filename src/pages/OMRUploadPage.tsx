import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from '../components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card'
import { Input } from '../components/ui/input'
import { Badge } from '../components/ui/badge'
import { 
  Upload,
  FileText,
  CheckCircle,
  AlertCircle,
  ArrowLeft,
  Camera,
  Scan,
  Clock,
  User,
  BookOpen,
  Calculator,
  Brain,
  Puzzle
} from 'lucide-react'

interface ExamPaper {
  id: string
  title: string
  subject: string
  totalQuestions: number
  duration: string
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced'
}

const availableExams: ExamPaper[] = [
  {
    id: 'math-001',
    title: 'Mathematics Practice Paper 1',
    subject: 'Mathematics',
    totalQuestions: 25,
    duration: '45 mins',
    difficulty: 'Beginner'
  },
  {
    id: 'eng-001',
    title: 'English Comprehension Test',
    subject: 'English',
    totalQuestions: 20,
    duration: '40 mins',
    difficulty: 'Intermediate'
  },
  {
    id: 'vr-001',
    title: 'Verbal Reasoning Challenge',
    subject: 'Verbal Reasoning',
    totalQuestions: 30,
    duration: '50 mins',
    difficulty: 'Advanced'
  },
  {
    id: 'nvr-001',
    title: 'Non-Verbal Patterns Test',
    subject: 'Non-Verbal Reasoning',
    totalQuestions: 35,
    duration: '55 mins',
    difficulty: 'Intermediate'
  }
]

export default function OMRUploadPage() {
  const navigate = useNavigate()
  const [selectedExam, setSelectedExam] = useState<ExamPaper | null>(null)
  const [uploadedFile, setUploadedFile] = useState<File | null>(null)
  const [isProcessing, setIsProcessing] = useState(false)
  const [dragActive, setDragActive] = useState(false)

  const getSubjectIcon = (subject: string) => {
    switch (subject) {
      case 'Mathematics': return <Calculator className="w-5 h-5" />
      case 'English': return <BookOpen className="w-5 h-5" />
      case 'Verbal Reasoning': return <Brain className="w-5 h-5" />
      case 'Non-Verbal Reasoning': return <Puzzle className="w-5 h-5" />
      default: return <FileText className="w-5 h-5" />
    }
  }

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Beginner': return 'bg-green-100 text-green-800'
      case 'Intermediate': return 'bg-yellow-100 text-yellow-800'
      case 'Advanced': return 'bg-red-100 text-red-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true)
    } else if (e.type === 'dragleave') {
      setDragActive(false)
    }
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0]
      if (file.type.includes('image/') || file.type === 'application/pdf') {
        setUploadedFile(file)
      }
    }
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0]
      if (file.type.includes('image/') || file.type === 'application/pdf') {
        setUploadedFile(file)
      }
    }
  }

  const handleSubmitForReview = async () => {
    if (!selectedExam || !uploadedFile) return

    setIsProcessing(true)
    
    // Simulate processing time
    await new Promise(resolve => setTimeout(resolve, 3000))
    
    // Navigate to results page with exam and file data
    navigate('/omr-results', { 
      state: { 
        examId: selectedExam.id,
        examTitle: selectedExam.title,
        subject: selectedExam.subject,
        totalQuestions: selectedExam.totalQuestions,
        fileName: uploadedFile.name
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
              <h1 className="text-xl font-semibold text-gray-900">Upload Answer Sheet</h1>
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

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Progress Steps */}
        <div className="mb-8">
          <div className="flex items-center justify-center">
            <div className="flex items-center space-x-4">
              <div className="flex items-center">
                <div className="w-8 h-8 bg-purple-600 text-white rounded-full flex items-center justify-center text-sm font-medium">
                  1
                </div>
                <span className="ml-2 text-sm font-medium text-purple-600">Select Exam</span>
              </div>
              <div className="w-16 h-px bg-gray-300" />
              <div className="flex items-center">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                  selectedExam ? 'bg-purple-600 text-white' : 'bg-gray-300 text-gray-600'
                }`}>
                  2
                </div>
                <span className={`ml-2 text-sm font-medium ${
                  selectedExam ? 'text-purple-600' : 'text-gray-600'
                }`}>Upload Sheet</span>
              </div>
              <div className="w-16 h-px bg-gray-300" />
              <div className="flex items-center">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                  uploadedFile ? 'bg-purple-600 text-white' : 'bg-gray-300 text-gray-600'
                }`}>
                  3
                </div>
                <span className={`ml-2 text-sm font-medium ${
                  uploadedFile ? 'text-purple-600' : 'text-gray-600'
                }`}>Review</span>
              </div>
            </div>
          </div>
        </div>

        {/* Step 1: Select Exam */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="w-5 h-5 text-purple-600" />
              Step 1: Select Your Exam Paper
            </CardTitle>
            <CardDescription>
              Choose the exam paper you completed to upload your answer sheet
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {availableExams.map((exam) => (
                <div
                  key={exam.id}
                  onClick={() => setSelectedExam(exam)}
                  className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
                    selectedExam?.id === exam.id
                      ? 'border-purple-500 bg-purple-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center gap-2 text-purple-600">
                      {getSubjectIcon(exam.subject)}
                      <span className="text-sm font-medium">{exam.subject}</span>
                    </div>
                    <Badge className={getDifficultyColor(exam.difficulty)}>
                      {exam.difficulty}
                    </Badge>
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">{exam.title}</h3>
                  <div className="flex items-center gap-4 text-sm text-gray-600">
                    <div className="flex items-center gap-1">
                      <FileText className="w-4 h-4" />
                      <span>{exam.totalQuestions} questions</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      <span>{exam.duration}</span>
                    </div>
                  </div>
                  {selectedExam?.id === exam.id && (
                    <div className="mt-2 flex items-center gap-1 text-purple-600">
                      <CheckCircle className="w-4 h-4" />
                      <span className="text-sm font-medium">Selected</span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Step 2: Upload Answer Sheet */}
        {selectedExam && (
          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Upload className="w-5 h-5 text-purple-600" />
                Step 2: Upload Your Answer Sheet
              </CardTitle>
              <CardDescription>
                Upload a clear photo or scan of your completed OMR answer sheet for "{selectedExam.title}"
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div
                className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
                  dragActive
                    ? 'border-purple-500 bg-purple-50'
                    : uploadedFile
                    ? 'border-green-500 bg-green-50'
                    : 'border-gray-300 hover:border-gray-400'
                }`}
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
              >
                {uploadedFile ? (
                  <div className="space-y-4">
                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                      <CheckCircle className="w-8 h-8 text-green-600" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-1">File Uploaded Successfully</h3>
                      <p className="text-sm text-gray-600 mb-2">{uploadedFile.name}</p>
                      <p className="text-xs text-gray-500">
                        Size: {(uploadedFile.size / 1024 / 1024).toFixed(2)} MB
                      </p>
                    </div>
                    <Button
                      variant="outline"
                      onClick={() => setUploadedFile(null)}
                      className="gap-2"
                    >
                      <Upload className="w-4 h-4" />
                      Upload Different File
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto">
                      <Upload className="w-8 h-8 text-gray-400" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">
                        Drag and drop your answer sheet here
                      </h3>
                      <p className="text-sm text-gray-600 mb-4">
                        or click to browse files
                      </p>
                      <div className="flex flex-col sm:flex-row gap-3 justify-center">
                        <Button className="gap-2">
                          <Camera className="w-4 h-4" />
                          Take Photo
                          <Input
                            type="file"
                            accept="image/*,application/pdf"
                            onChange={handleFileChange}
                            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                            capture="environment"
                          />
                        </Button>
                        <Button variant="outline" className="gap-2">
                          <Scan className="w-4 h-4" />
                          Upload Scan
                          <Input
                            type="file"
                            accept="image/*,application/pdf"
                            onChange={handleFileChange}
                            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                          />
                        </Button>
                      </div>
                    </div>
                    <div className="text-xs text-gray-500">
                      Supported formats: JPG, PNG, PDF • Max size: 10MB
                    </div>
                  </div>
                )}
              </div>

              {/* Upload Tips */}
              <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                <h4 className="font-medium text-blue-900 mb-2 flex items-center gap-2">
                  <AlertCircle className="w-4 h-4" />
                  Tips for Best Results
                </h4>
                <ul className="text-sm text-blue-800 space-y-1">
                  <li>• Ensure the answer sheet is well-lit and clearly visible</li>
                  <li>• Make sure all four corners of the sheet are in the frame</li>
                  <li>• Avoid shadows, glare, or blurry images</li>
                  <li>• Keep the camera steady and parallel to the sheet</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Step 3: Submit for Review */}
        {selectedExam && uploadedFile && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-purple-600" />
                Step 3: Submit for Review
              </CardTitle>
              <CardDescription>
                Review your submission and get instant results
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="bg-gray-50 rounded-lg p-4 mb-6">
                <h4 className="font-medium text-gray-900 mb-3">Submission Summary</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Exam Paper:</span>
                    <span className="font-medium">{selectedExam.title}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Subject:</span>
                    <span className="font-medium">{selectedExam.subject}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Total Questions:</span>
                    <span className="font-medium">{selectedExam.totalQuestions}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Answer Sheet:</span>
                    <span className="font-medium">{uploadedFile.name}</span>
                  </div>
                </div>
              </div>

              <Button
                onClick={handleSubmitForReview}
                disabled={isProcessing}
                className="w-full h-12 text-lg gap-2"
              >
                {isProcessing ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Processing Answer Sheet...
                  </>
                ) : (
                  <>
                    <Scan className="w-5 h-5" />
                    Submit for Review
                  </>
                )}
              </Button>

              {isProcessing && (
                <div className="mt-4 p-4 bg-blue-50 rounded-lg">
                  <div className="flex items-center gap-2 text-blue-800">
                    <div className="w-4 h-4 border-2 border-blue-600 border-t-transparent rounded-full animate-spin" />
                    <span className="text-sm font-medium">
                      Our AI is analyzing your answer sheet... This may take a few moments.
                    </span>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}