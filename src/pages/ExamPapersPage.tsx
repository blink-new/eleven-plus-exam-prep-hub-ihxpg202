import { Link } from 'react-router-dom'
import { Button } from '../components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card'
import { Badge } from '../components/ui/badge'
import { 
  Trophy, 
  Download, 
  Play,
  Clock, 
  FileText,
  BookOpen, 
  Calculator, 
  Brain, 
  Puzzle,
  ArrowLeft,
  Star
} from 'lucide-react'

const examPapers = [
  {
    id: '1',
    title: 'Mathematics Practice Paper 1',
    subject: 'Mathematics',
    difficulty: 'Beginner',
    questions: 25,
    duration: '45 mins',
    type: 'Practice Paper',
    rating: 4.7,
    downloads: 2340
  },
  {
    id: '2',
    title: 'English Comprehension Test',
    subject: 'English',
    difficulty: 'Intermediate',
    questions: 20,
    duration: '40 mins',
    type: 'Mock Exam',
    rating: 4.8,
    downloads: 1890
  }
]

export default function ExamPapersPage() {
  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Beginner': return 'bg-green-100 text-green-800'
      case 'Intermediate': return 'bg-yellow-100 text-yellow-800'
      case 'Advanced': return 'bg-red-100 text-red-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getSubjectIcon = (subject: string) => {
    switch (subject) {
      case 'Mathematics': return <Calculator className="w-5 h-5" />
      case 'English': return <BookOpen className="w-5 h-5" />
      case 'Verbal Reasoning': return <Brain className="w-5 h-5" />
      case 'Non-Verbal Reasoning': return <Puzzle className="w-5 h-5" />
      default: return <FileText className="w-5 h-5" />
    }
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link to="/" className="flex items-center gap-3">
              <div className="p-2 bg-purple-600 rounded-lg">
                <Trophy className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">11+ Prep Hub</h1>
                <p className="text-xs text-gray-600">Exam Excellence</p>
              </div>
            </Link>
            
            <div className="flex items-center space-x-4">
              <Link to="/">
                <Button variant="ghost" className="gap-2">
                  <ArrowLeft className="w-4 h-4" />
                  Back to Home
                </Button>
              </Link>
              <Link to="/login">
                <Button className="bg-purple-600 hover:bg-purple-700">
                  Login
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-purple-600 via-purple-700 to-cyan-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Practice Exam Papers</h1>
          <p className="text-xl text-purple-100 max-w-3xl mx-auto">
            Download and practice with our comprehensive collection of 11+ exam papers, 
            designed to mirror real exam conditions and boost your confidence.
          </p>
        </div>
      </section>

      {/* Papers Grid */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {examPapers.map((paper) => (
              <Card key={paper.id} className="hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                <CardHeader className="pb-4">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2 text-purple-600">
                      {getSubjectIcon(paper.subject)}
                      <span className="text-sm font-medium">{paper.subject}</span>
                    </div>
                    <Badge className={getDifficultyColor(paper.difficulty)}>
                      {paper.difficulty}
                    </Badge>
                  </div>
                  <CardTitle className="text-lg">{paper.title}</CardTitle>
                  <div className="flex items-center gap-4 text-sm text-gray-600">
                    <span>{paper.questions} questions</span>
                    <span>{paper.duration}</span>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-2">
                      <div className="flex items-center">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`w-4 h-4 ${
                              i < Math.floor(paper.rating)
                                ? 'text-yellow-400 fill-current'
                                : 'text-gray-300'
                            }`}
                          />
                        ))}
                      </div>
                      <span className="text-gray-600">({paper.rating})</span>
                    </div>
                    <div className="text-gray-600">
                      <Download className="w-4 h-4 inline mr-1" />
                      {paper.downloads}
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <Badge variant="outline">{paper.type}</Badge>
                  </div>

                  <div className="flex gap-2 pt-4 border-t">
                    <Button size="sm" className="flex-1 gap-2" variant="outline">
                      <Download className="w-4 h-4" />
                      Download PDF
                    </Button>
                    <Link to="/login" className="flex-1">
                      <Button size="sm" className="w-full gap-2 bg-purple-600 hover:bg-purple-700">
                        <Play className="w-4 h-4" />
                        Practice
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-purple-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Practice?</h2>
          <p className="text-xl text-purple-100 mb-8 max-w-2xl mx-auto">
            Access our complete library of exam papers and start practicing today.
          </p>
          <Link to="/signup">
            <Button size="lg" className="bg-white text-purple-600 hover:bg-gray-100">
              Start Free Trial
            </Button>
          </Link>
        </div>
      </section>
    </div>
  )
}