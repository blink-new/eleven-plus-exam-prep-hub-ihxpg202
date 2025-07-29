import { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { Button } from './ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card'
import { Badge } from './ui/badge'
import { Progress } from './ui/progress'
import { 
  Calculator,
  BookOpen,
  Brain,
  Puzzle,
  Download,
  Play,
  Clock,
  Star,
  Award,
  Target,
  TrendingUp,
  FileText,
  CheckCircle,
  ChevronRight,
  Filter,
  Search
} from 'lucide-react'

interface Paper {
  id: string
  title: string
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced'
  questions: number
  duration: string
  completed: boolean
  score?: number
  downloadUrl: string
}

const subjectData = {
  mathematics: {
    name: 'Mathematics',
    icon: <Calculator className="w-6 h-6" />,
    color: 'bg-blue-500',
    description: 'Master mathematical concepts with our comprehensive practice papers',
    totalPapers: 45,
    completedPapers: 34,
    averageScore: 82,
    progress: 75
  },
  english: {
    name: 'English',
    icon: <BookOpen className="w-6 h-6" />,
    color: 'bg-green-500',
    description: 'Improve your English skills with reading comprehension and language exercises',
    totalPapers: 38,
    completedPapers: 23,
    averageScore: 78,
    progress: 60
  },
  verbal: {
    name: 'Verbal Reasoning',
    icon: <Brain className="w-6 h-6" />,
    color: 'bg-purple-500',
    description: 'Develop logical thinking and verbal reasoning abilities',
    totalPapers: 32,
    completedPapers: 14,
    averageScore: 71,
    progress: 45
  },
  nonverbal: {
    name: 'Non-Verbal Reasoning',
    icon: <Puzzle className="w-6 h-6" />,
    color: 'bg-orange-500',
    description: 'Enhance pattern recognition and spatial reasoning skills',
    totalPapers: 28,
    completedPapers: 8,
    averageScore: 65,
    progress: 30
  }
}

const mockPapers: { [key: string]: Paper[] } = {
  mathematics: [
    {
      id: 'math-001',
      title: 'Basic Arithmetic Practice',
      difficulty: 'Beginner',
      questions: 20,
      duration: '30 mins',
      completed: true,
      score: 85,
      downloadUrl: '/papers/math-001.pdf'
    },
    {
      id: 'math-002',
      title: 'Fractions and Decimals',
      difficulty: 'Intermediate',
      questions: 25,
      duration: '40 mins',
      completed: true,
      score: 78,
      downloadUrl: '/papers/math-002.pdf'
    },
    {
      id: 'math-003',
      title: 'Advanced Algebra',
      difficulty: 'Advanced',
      questions: 30,
      duration: '50 mins',
      completed: false,
      downloadUrl: '/papers/math-003.pdf'
    }
  ],
  english: [
    {
      id: 'eng-001',
      title: 'Reading Comprehension Basics',
      difficulty: 'Beginner',
      questions: 15,
      duration: '25 mins',
      completed: true,
      score: 82,
      downloadUrl: '/papers/eng-001.pdf'
    },
    {
      id: 'eng-002',
      title: 'Grammar and Punctuation',
      difficulty: 'Intermediate',
      questions: 20,
      duration: '35 mins',
      completed: false,
      downloadUrl: '/papers/eng-002.pdf'
    }
  ],
  verbal: [
    {
      id: 'vr-001',
      title: 'Word Relationships',
      difficulty: 'Beginner',
      questions: 18,
      duration: '30 mins',
      completed: true,
      score: 75,
      downloadUrl: '/papers/vr-001.pdf'
    },
    {
      id: 'vr-002',
      title: 'Logical Deduction',
      difficulty: 'Advanced',
      questions: 25,
      duration: '45 mins',
      completed: false,
      downloadUrl: '/papers/vr-002.pdf'
    }
  ],
  nonverbal: [
    {
      id: 'nvr-001',
      title: 'Pattern Recognition',
      difficulty: 'Beginner',
      questions: 20,
      duration: '35 mins',
      completed: false,
      downloadUrl: '/papers/nvr-001.pdf'
    },
    {
      id: 'nvr-002',
      title: 'Spatial Reasoning',
      difficulty: 'Intermediate',
      questions: 22,
      duration: '40 mins',
      completed: false,
      downloadUrl: '/papers/nvr-002.pdf'
    }
  ]
}

export default function SubjectContent() {
  const { subject } = useParams<{ subject: string }>()
  const navigate = useNavigate()
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('All')
  const [searchTerm, setSearchTerm] = useState('')

  const subjectKey = subject as keyof typeof subjectData
  const currentSubject = subjectData[subjectKey]
  const papers = mockPapers[subjectKey] || []

  if (!currentSubject) {
    return (
      <div className="p-6">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Subject Not Found</h1>
          <p className="text-gray-600 mb-6">The requested subject could not be found.</p>
          <Button onClick={() => navigate('/app/dashboard')}>
            Return to Dashboard
          </Button>
        </div>
      </div>
    )
  }

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Beginner': return 'bg-green-100 text-green-800'
      case 'Intermediate': return 'bg-yellow-100 text-yellow-800'
      case 'Advanced': return 'bg-red-100 text-red-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const filteredPapers = papers.filter(paper => {
    const matchesDifficulty = selectedDifficulty === 'All' || paper.difficulty === selectedDifficulty
    const matchesSearch = paper.title.toLowerCase().includes(searchTerm.toLowerCase())
    return matchesDifficulty && matchesSearch
  })

  const handleStartPractice = (paperId: string) => {
    navigate(`/exam/${paperId}`)
  }

  const handleDownload = (paper: Paper) => {
    // In a real app, this would trigger a download
    console.log(`Downloading ${paper.title}`)
  }

  return (
    <div className="p-6">
      {/* Subject Header */}
      <div className="mb-8">
        <div className="flex items-center gap-4 mb-4">
          <div className={`w-16 h-16 ${currentSubject.color} rounded-xl flex items-center justify-center text-white`}>
            {currentSubject.icon}
          </div>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">{currentSubject.name}</h1>
            <p className="text-gray-600 mt-1">{currentSubject.description}</p>
          </div>
        </div>

        {/* Progress Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card>
            <CardContent className="p-6 text-center">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <FileText className="w-6 h-6 text-blue-600" />
              </div>
              <div className="text-2xl font-bold text-gray-900 mb-1">
                {currentSubject.totalPapers}
              </div>
              <p className="text-sm text-gray-600">Total Papers</p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6 text-center">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <CheckCircle className="w-6 h-6 text-green-600" />
              </div>
              <div className="text-2xl font-bold text-gray-900 mb-1">
                {currentSubject.completedPapers}
              </div>
              <p className="text-sm text-gray-600">Completed</p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6 text-center">
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <Target className="w-6 h-6 text-purple-600" />
              </div>
              <div className="text-2xl font-bold text-gray-900 mb-1">
                {currentSubject.averageScore}%
              </div>
              <p className="text-sm text-gray-600">Average Score</p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6 text-center">
              <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <TrendingUp className="w-6 h-6 text-orange-600" />
              </div>
              <div className="text-2xl font-bold text-gray-900 mb-1">
                {currentSubject.progress}%
              </div>
              <p className="text-sm text-gray-600">Progress</p>
            </CardContent>
          </Card>
        </div>

        {/* Overall Progress */}
        <Card className="mt-6">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Overall Progress</h3>
              <span className="text-sm font-medium text-gray-600">{currentSubject.progress}%</span>
            </div>
            <Progress value={currentSubject.progress} className="h-3" />
            <div className="flex justify-between text-sm text-gray-600 mt-2">
              <span>{currentSubject.completedPapers} completed</span>
              <span>{currentSubject.totalPapers - currentSubject.completedPapers} remaining</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters and Search */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Filter className="w-5 h-5 text-purple-600" />
            Practice Papers
          </CardTitle>
          <CardDescription>
            Choose from our collection of {currentSubject.name.toLowerCase()} practice papers
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            {/* Search */}
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search papers..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:border-purple-500 focus:ring-1 focus:ring-purple-500"
              />
            </div>

            {/* Difficulty Filter */}
            <div className="flex gap-2">
              {['All', 'Beginner', 'Intermediate', 'Advanced'].map((difficulty) => (
                <Button
                  key={difficulty}
                  variant={selectedDifficulty === difficulty ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setSelectedDifficulty(difficulty)}
                  className={selectedDifficulty === difficulty ? 'bg-purple-600 hover:bg-purple-700' : ''}
                >
                  {difficulty}
                </Button>
              ))}
            </div>
          </div>

          {/* Papers Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPapers.map((paper) => (
              <Card key={paper.id} className="hover:shadow-lg transition-shadow">
                <CardHeader className="pb-4">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <CardTitle className="text-lg mb-2">{paper.title}</CardTitle>
                      <div className="flex items-center gap-2 mb-2">
                        <Badge className={getDifficultyColor(paper.difficulty)}>
                          {paper.difficulty}
                        </Badge>
                        {paper.completed && (
                          <Badge className="bg-green-100 text-green-800">
                            Completed
                          </Badge>
                        )}
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
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

                  {paper.completed && paper.score && (
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-600">Best Score:</span>
                        <span className="font-semibold text-gray-900">{paper.score}%</span>
                      </div>
                      <Progress value={paper.score} className="h-2" />
                    </div>
                  )}

                  <div className="flex gap-2">
                    <Button
                      onClick={() => handleStartPractice(paper.id)}
                      className="flex-1 gap-2"
                      size="sm"
                    >
                      <Play className="w-4 h-4" />
                      {paper.completed ? 'Practice Again' : 'Start Practice'}
                    </Button>
                    <Button
                      variant="outline"
                      onClick={() => handleDownload(paper)}
                      className="gap-2"
                      size="sm"
                    >
                      <Download className="w-4 h-4" />
                      PDF
                    </Button>
                  </div>

                  {paper.completed && (
                    <Button
                      variant="ghost"
                      onClick={() => navigate(`/performance/${subject}`)}
                      className="w-full gap-2 text-purple-600 hover:text-purple-700"
                      size="sm"
                    >
                      View Performance
                      <ChevronRight className="w-4 h-4" />
                    </Button>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredPapers.length === 0 && (
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Search className="w-8 h-8 text-gray-400" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">No papers found</h3>
              <p className="text-gray-600 mb-4">
                Try adjusting your search terms or difficulty filter.
              </p>
              <Button
                onClick={() => {
                  setSearchTerm('')
                  setSelectedDifficulty('All')
                }}
                variant="outline"
              >
                Clear Filters
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Star className="w-5 h-5 text-purple-600" />
            Quick Actions
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Button
              onClick={() => navigate(`/performance/${subject}`)}
              className="h-16 flex-col gap-2 bg-purple-600 hover:bg-purple-700"
            >
              <Award className="w-6 h-6" />
              View Performance
            </Button>
            <Button
              variant="outline"
              onClick={() => navigate('/app/create-exam')}
              className="h-16 flex-col gap-2"
            >
              <FileText className="w-6 h-6" />
              Create Custom Exam
            </Button>
            <Button
              variant="outline"
              onClick={() => navigate('/app/completed-papers')}
              className="h-16 flex-col gap-2"
            >
              <CheckCircle className="w-6 h-6" />
              Completed Papers
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}