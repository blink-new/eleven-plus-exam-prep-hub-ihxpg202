import { useState } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { Button } from '../components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card'
import { Badge } from '../components/ui/badge'
import { Progress } from '../components/ui/progress'
import { 
  ArrowLeft,
  Download,
  Play,
  Clock,
  FileText,
  Star,
  Trophy,
  BookOpen,
  Calculator,
  Brain,
  Puzzle,
  Filter,
  Search,
  ChevronDown,
  Target,
  Award,
  CheckCircle
} from 'lucide-react'

interface ExamPaper {
  id: string
  title: string
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced'
  questions: number
  duration: string
  type: string
  description: string
  topics: string[]
  rating: number
  completedBy: number
  pdfUrl: string
}

const examPapers: Record<string, ExamPaper[]> = {
  mathematics: [
    {
      id: 'math-1',
      title: 'Basic Arithmetic & Number Operations',
      difficulty: 'Beginner',
      questions: 25,
      duration: '45 mins',
      type: 'Practice Paper',
      description: 'Foundation level arithmetic including addition, subtraction, multiplication, and division.',
      topics: ['Addition', 'Subtraction', 'Multiplication', 'Division', 'Number Patterns'],
      rating: 4.8,
      completedBy: 1250,
      pdfUrl: '#'
    },
    {
      id: 'math-2',
      title: 'Fractions, Decimals & Percentages',
      difficulty: 'Intermediate',
      questions: 30,
      duration: '50 mins',
      type: 'Mock Exam',
      description: 'Comprehensive coverage of fractions, decimals, and percentage calculations.',
      topics: ['Fractions', 'Decimals', 'Percentages', 'Ratio', 'Proportion'],
      rating: 4.7,
      completedBy: 980,
      pdfUrl: '#'
    },
    {
      id: 'math-3',
      title: 'Geometry & Measurement',
      difficulty: 'Intermediate',
      questions: 28,
      duration: '55 mins',
      type: 'Practice Paper',
      description: 'Shapes, angles, area, perimeter, and volume calculations.',
      topics: ['Shapes', 'Angles', 'Area', 'Perimeter', 'Volume'],
      rating: 4.6,
      completedBy: 750,
      pdfUrl: '#'
    },
    {
      id: 'math-4',
      title: 'Advanced Problem Solving',
      difficulty: 'Advanced',
      questions: 35,
      duration: '60 mins',
      type: 'Challenge Paper',
      description: 'Complex multi-step problems requiring advanced mathematical reasoning.',
      topics: ['Word Problems', 'Logic', 'Sequences', 'Patterns', 'Algebra'],
      rating: 4.9,
      completedBy: 450,
      pdfUrl: '#'
    },
    {
      id: 'math-5',
      title: 'Speed & Accuracy Test',
      difficulty: 'Advanced',
      questions: 40,
      duration: '45 mins',
      type: 'Timed Test',
      description: 'Fast-paced test focusing on quick calculation and problem-solving skills.',
      topics: ['Mental Math', 'Quick Calculations', 'Time Management', 'Accuracy'],
      rating: 4.5,
      completedBy: 320,
      pdfUrl: '#'
    }
  ],
  english: [
    {
      id: 'eng-1',
      title: 'Reading Comprehension Basics',
      difficulty: 'Beginner',
      questions: 20,
      duration: '40 mins',
      type: 'Practice Paper',
      description: 'Foundation reading skills with simple passages and questions.',
      topics: ['Reading', 'Comprehension', 'Vocabulary', 'Main Ideas'],
      rating: 4.7,
      completedBy: 1100,
      pdfUrl: '#'
    },
    {
      id: 'eng-2',
      title: 'Grammar & Punctuation',
      difficulty: 'Intermediate',
      questions: 25,
      duration: '45 mins',
      type: 'Mock Exam',
      description: 'Essential grammar rules, punctuation, and sentence structure.',
      topics: ['Grammar', 'Punctuation', 'Sentence Structure', 'Parts of Speech'],
      rating: 4.6,
      completedBy: 890,
      pdfUrl: '#'
    },
    {
      id: 'eng-3',
      title: 'Creative Writing Workshop',
      difficulty: 'Intermediate',
      questions: 15,
      duration: '50 mins',
      type: 'Writing Task',
      description: 'Develop creative writing skills with guided prompts and exercises.',
      topics: ['Creative Writing', 'Story Structure', 'Character Development', 'Descriptive Writing'],
      rating: 4.8,
      completedBy: 650,
      pdfUrl: '#'
    },
    {
      id: 'eng-4',
      title: 'Advanced Comprehension',
      difficulty: 'Advanced',
      questions: 30,
      duration: '55 mins',
      type: 'Challenge Paper',
      description: 'Complex texts with inference, analysis, and critical thinking questions.',
      topics: ['Inference', 'Analysis', 'Critical Thinking', 'Literary Devices'],
      rating: 4.9,
      completedBy: 420,
      pdfUrl: '#'
    }
  ]
}

const subjectInfo = {
  mathematics: {
    name: 'Mathematics',
    icon: <Calculator className="w-6 h-6" />,
    color: 'bg-blue-500',
    description: 'Master mathematical concepts essential for 11+ success'
  },
  english: {
    name: 'English',
    icon: <BookOpen className="w-6 h-6" />,
    color: 'bg-green-500',
    description: 'Develop strong reading, writing, and language skills'
  },
  verbal: {
    name: 'Verbal Reasoning',
    icon: <Brain className="w-6 h-6" />,
    color: 'bg-purple-500',
    description: 'Enhance logical thinking and verbal problem-solving abilities'
  },
  nonverbal: {
    name: 'Non-Verbal Reasoning',
    icon: <Puzzle className="w-6 h-6" />,
    color: 'bg-orange-500',
    description: 'Develop visual and spatial reasoning skills'
  }
}

export default function SubjectPage() {
  const { subject } = useParams<{ subject: string }>()
  const navigate = useNavigate()
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('all')
  const [selectedType, setSelectedType] = useState<string>('all')
  const [searchQuery, setSearchQuery] = useState('')

  if (!subject || !subjectInfo[subject as keyof typeof subjectInfo]) {
    return <div>Subject not found</div>
  }

  const currentSubject = subjectInfo[subject as keyof typeof subjectInfo]
  const papers = examPapers[subject as keyof typeof examPapers] || []

  const filteredPapers = papers.filter(paper => {
    const matchesDifficulty = selectedDifficulty === 'all' || paper.difficulty === selectedDifficulty
    const matchesType = selectedType === 'all' || paper.type === selectedType
    const matchesSearch = paper.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         paper.topics.some(topic => topic.toLowerCase().includes(searchQuery.toLowerCase()))
    
    return matchesDifficulty && matchesType && matchesSearch
  })

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Beginner': return 'bg-green-100 text-green-800'
      case 'Intermediate': return 'bg-yellow-100 text-yellow-800'
      case 'Advanced': return 'bg-red-100 text-red-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const handleDownload = (paper: ExamPaper) => {
    // Simulate PDF download
    const link = document.createElement('a')
    link.href = paper.pdfUrl
    link.download = `${paper.title}.pdf`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  const handlePractice = (paper: ExamPaper) => {
    // Navigate to online exam
    navigate(`/exam/${paper.id}`)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-4">
              <Link to="/dashboard" className="flex items-center gap-2 text-gray-600 hover:text-purple-600">
                <ArrowLeft className="w-5 h-5" />
                <span>Back to Dashboard</span>
              </Link>
            </div>
            
            <Link to="/" className="flex items-center gap-3">
              <div className="p-2 bg-purple-600 rounded-lg">
                <Trophy className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">11+ Prep Hub</h1>
              </div>
            </Link>

            <div className="w-32"></div> {/* Spacer for centering */}
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Subject Header */}
        <div className="mb-8">
          <div className="flex items-center gap-4 mb-4">
            <div className={`w-16 h-16 ${currentSubject.color} rounded-xl flex items-center justify-center text-white`}>
              {currentSubject.icon}
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">{currentSubject.name}</h1>
              <p className="text-gray-600 text-lg">{currentSubject.description}</p>
            </div>
          </div>

          {/* Subject Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <Card>
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-purple-600">{papers.length}</div>
                <div className="text-sm text-gray-600">Available Papers</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-green-600">4.7</div>
                <div className="text-sm text-gray-600">Average Rating</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-blue-600">2.5k</div>
                <div className="text-sm text-gray-600">Students Enrolled</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-orange-600">85%</div>
                <div className="text-sm text-gray-600">Success Rate</div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Filters */}
        <Card className="mb-6">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row gap-4">
              {/* Search */}
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <input
                    type="text"
                    placeholder="Search papers or topics..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:border-purple-500 focus:ring-1 focus:ring-purple-500"
                  />
                </div>
              </div>

              {/* Difficulty Filter */}
              <div className="relative">
                <select
                  value={selectedDifficulty}
                  onChange={(e) => setSelectedDifficulty(e.target.value)}
                  className="appearance-none bg-white border border-gray-300 rounded-lg px-4 py-2 pr-8 focus:border-purple-500 focus:ring-1 focus:ring-purple-500"
                >
                  <option value="all">All Levels</option>
                  <option value="Beginner">Beginner</option>
                  <option value="Intermediate">Intermediate</option>
                  <option value="Advanced">Advanced</option>
                </select>
                <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
              </div>

              {/* Type Filter */}
              <div className="relative">
                <select
                  value={selectedType}
                  onChange={(e) => setSelectedType(e.target.value)}
                  className="appearance-none bg-white border border-gray-300 rounded-lg px-4 py-2 pr-8 focus:border-purple-500 focus:ring-1 focus:ring-purple-500"
                >
                  <option value="all">All Types</option>
                  <option value="Practice Paper">Practice Paper</option>
                  <option value="Mock Exam">Mock Exam</option>
                  <option value="Challenge Paper">Challenge Paper</option>
                  <option value="Timed Test">Timed Test</option>
                  <option value="Writing Task">Writing Task</option>
                </select>
                <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Exam Papers Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPapers.map((paper) => (
            <Card key={paper.id} className="hover:shadow-lg transition-shadow">
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between mb-2">
                  <Badge className={getDifficultyColor(paper.difficulty)}>
                    {paper.difficulty}
                  </Badge>
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 text-yellow-400 fill-current" />
                    <span className="text-sm text-gray-600">{paper.rating}</span>
                  </div>
                </div>
                <CardTitle className="text-lg">{paper.title}</CardTitle>
                <CardDescription className="text-sm">
                  {paper.description}
                </CardDescription>
              </CardHeader>
              
              <CardContent className="space-y-4">
                {/* Paper Details */}
                <div className="flex items-center justify-between text-sm text-gray-600">
                  <div className="flex items-center gap-1">
                    <FileText className="w-4 h-4" />
                    <span>{paper.questions} questions</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    <span>{paper.duration}</span>
                  </div>
                </div>

                {/* Topics */}
                <div>
                  <div className="flex flex-wrap gap-1">
                    {paper.topics.slice(0, 3).map((topic, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {topic}
                      </Badge>
                    ))}
                    {paper.topics.length > 3 && (
                      <Badge variant="outline" className="text-xs">
                        +{paper.topics.length - 3} more
                      </Badge>
                    )}
                  </div>
                </div>

                {/* Stats */}
                <div className="flex items-center justify-between text-sm text-gray-600">
                  <div className="flex items-center gap-1">
                    <CheckCircle className="w-4 h-4" />
                    <span>{paper.completedBy} completed</span>
                  </div>
                  <Badge variant="outline">{paper.type}</Badge>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-2 pt-2">
                  <Button 
                    size="sm" 
                    className="flex-1 gap-2"
                    onClick={() => handlePractice(paper)}
                  >
                    <Play className="w-4 h-4" />
                    Practice
                  </Button>
                  <Button 
                    size="sm" 
                    variant="outline" 
                    className="flex-1 gap-2"
                    onClick={() => handleDownload(paper)}
                  >
                    <Download className="w-4 h-4" />
                    Download
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* No Results */}
        {filteredPapers.length === 0 && (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Search className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">No papers found</h3>
            <p className="text-gray-600">Try adjusting your filters or search terms.</p>
          </div>
        )}
      </div>
    </div>
  )
}