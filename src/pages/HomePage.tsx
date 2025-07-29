import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Button } from '../components/ui/button'
import { Input } from '../components/ui/input'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card'
import { Badge } from '../components/ui/badge'
import { 
  Search, 
  Menu, 
  X, 
  Download, 
  Star, 
  Trophy,
  BookOpen,
  Calculator,
  Brain,
  Puzzle,
  Users,
  Clock,
  Award,
  CheckCircle,
  Play,
  FileText,
  Video,
  PenTool,
  GraduationCap,
  Facebook,
  Linkedin,
  Youtube,
  Twitter,
  Mail,
  Phone,
  MapPin,
  ChevronRight,
  Target,
  Zap,
  Shield
} from 'lucide-react'

interface Course {
  id: string
  title: string
  subject: string
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced'
  duration: string
  price: string
  rating: number
  students: number
  description: string
  features: string[]
}

interface ExamPaper {
  id: string
  title: string
  subject: string
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced'
  questions: number
  duration: string
  type: string
  downloadUrl: string
}

const courses: Course[] = [
  {
    id: '1',
    title: 'Complete Mathematics Mastery',
    subject: 'Mathematics',
    difficulty: 'Intermediate',
    duration: '8 weeks',
    price: '£49.99',
    rating: 4.8,
    students: 1250,
    description: 'Master all key mathematical concepts for 11+ exams with step-by-step guidance.',
    features: ['Video lessons', 'Practice worksheets', 'Mock exams', 'Progress tracking']
  },
  {
    id: '2',
    title: 'English Excellence Program',
    subject: 'English',
    difficulty: 'Intermediate',
    duration: '6 weeks',
    price: '£39.99',
    rating: 4.9,
    students: 980,
    description: 'Improve reading comprehension, grammar, and creative writing skills.',
    features: ['Interactive lessons', 'Writing workshops', 'Reading exercises', 'Feedback system']
  },
  {
    id: '3',
    title: 'Verbal Reasoning Bootcamp',
    subject: 'Verbal Reasoning',
    difficulty: 'Advanced',
    duration: '4 weeks',
    price: '£29.99',
    rating: 4.7,
    students: 750,
    description: 'Tackle complex verbal reasoning puzzles with proven strategies.',
    features: ['Strategy guides', 'Timed practice', 'Pattern recognition', 'Expert tips']
  },
  {
    id: '4',
    title: 'Non-Verbal Reasoning Fundamentals',
    subject: 'Non-Verbal Reasoning',
    difficulty: 'Beginner',
    duration: '5 weeks',
    price: '£34.99',
    rating: 4.6,
    students: 650,
    description: 'Build strong foundation in visual and spatial reasoning skills.',
    features: ['Visual tutorials', 'Shape patterns', '3D reasoning', 'Practice tests']
  }
]

const examPapers: ExamPaper[] = [
  {
    id: '1',
    title: 'Mathematics Practice Paper 1',
    subject: 'Mathematics',
    difficulty: 'Beginner',
    questions: 25,
    duration: '45 mins',
    type: 'Practice Paper',
    downloadUrl: '#'
  },
  {
    id: '2',
    title: 'English Comprehension Test',
    subject: 'English',
    difficulty: 'Intermediate',
    questions: 20,
    duration: '40 mins',
    type: 'Mock Exam',
    downloadUrl: '#'
  },
  {
    id: '3',
    title: 'Verbal Reasoning Challenge',
    subject: 'Verbal Reasoning',
    difficulty: 'Advanced',
    questions: 30,
    duration: '50 mins',
    type: 'Challenge Paper',
    downloadUrl: '#'
  },
  {
    id: '4',
    title: 'Non-Verbal Patterns Test',
    subject: 'Non-Verbal Reasoning',
    difficulty: 'Intermediate',
    questions: 35,
    duration: '55 mins',
    type: 'Practice Paper',
    downloadUrl: '#'
  },
  {
    id: '5',
    title: 'Mixed Mathematics Assessment',
    subject: 'Mathematics',
    difficulty: 'Advanced',
    questions: 40,
    duration: '60 mins',
    type: 'Full Assessment',
    downloadUrl: '#'
  },
  {
    id: '6',
    title: 'Creative Writing Workshop',
    subject: 'English',
    difficulty: 'Beginner',
    questions: 15,
    duration: '35 mins',
    type: 'Workshop',
    downloadUrl: '#'
  }
]

export default function HomePage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')

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

  const filteredCourses = courses.filter(course =>
    course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    course.subject.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const filteredExamPapers = examPapers.filter(paper =>
    paper.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    paper.subject.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-white shadow-sm border-b sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-3">
              <div className="p-2 bg-purple-600 rounded-lg">
                <Trophy className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">11+ Prep Hub</h1>
                <p className="text-xs text-gray-600">Exam Excellence</p>
              </div>
            </Link>

            {/* Search Bar - Desktop */}
            <div className="hidden md:flex items-center flex-1 max-w-md mx-8">
              <div className="relative w-full">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  type="text"
                  placeholder="Search courses, papers, topics..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 pr-4 py-2 w-full border-gray-300 focus:border-purple-500 focus:ring-purple-500"
                />
              </div>
            </div>

            {/* Navigation - Desktop */}
            <nav className="hidden md:flex items-center space-x-6">
              <Link to="/courses" className="text-gray-700 hover:text-purple-600 font-medium">Courses</Link>
              <Link to="/exam-papers" className="text-gray-700 hover:text-purple-600 font-medium">Exam Papers</Link>
              <Link to="/about" className="text-gray-700 hover:text-purple-600 font-medium">About</Link>
              <Link to="/contact" className="text-gray-700 hover:text-purple-600 font-medium">Contact</Link>
            </nav>

            {/* Auth Buttons - Desktop */}
            <div className="hidden md:flex items-center space-x-3">
              <Link to="/login">
                <Button variant="ghost" className="text-gray-700 hover:text-purple-600">
                  Login
                </Button>
              </Link>
              <Link to="/signup">
                <Button className="bg-purple-600 hover:bg-purple-700 text-white">
                  Sign Up
                </Button>
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 rounded-md text-gray-700 hover:text-purple-600"
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

          {/* Mobile Menu */}
          {isMenuOpen && (
            <div className="md:hidden border-t bg-white">
              <div className="px-2 pt-2 pb-3 space-y-1">
                {/* Mobile Search */}
                <div className="relative mb-4">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <Input
                    type="text"
                    placeholder="Search..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 pr-4 py-2 w-full"
                  />
                </div>
                
                <Link to="/courses" className="block px-3 py-2 text-gray-700 hover:text-purple-600">Courses</Link>
                <Link to="/exam-papers" className="block px-3 py-2 text-gray-700 hover:text-purple-600">Exam Papers</Link>
                <Link to="/about" className="block px-3 py-2 text-gray-700 hover:text-purple-600">About</Link>
                <Link to="/contact" className="block px-3 py-2 text-gray-700 hover:text-purple-600">Contact</Link>
                
                <div className="flex space-x-3 px-3 pt-4">
                  <Link to="/login" className="flex-1">
                    <Button variant="ghost" className="w-full">Login</Button>
                  </Link>
                  <Link to="/signup" className="flex-1">
                    <Button className="w-full bg-purple-600 hover:bg-purple-700">Sign Up</Button>
                  </Link>
                </div>
              </div>
            </div>
          )}
        </div>
      </header>

      {/* Hero Banner */}
      <section className="bg-gradient-to-br from-purple-600 via-purple-700 to-cyan-600 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Master Your 11+ Exams
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-purple-100 max-w-3xl mx-auto">
              Comprehensive exam preparation with expert courses, practice papers, and personalized learning paths designed for success.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/signup">
                <Button size="lg" className="bg-white text-purple-600 hover:bg-gray-100 px-8 py-3">
                  <Play className="w-5 h-5 mr-2" />
                  Start Free Trial
                </Button>
              </Link>
              <Link to="/exam-papers">
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-purple-600 px-8 py-3">
                  <Download className="w-5 h-5 mr-2" />
                  Download Sample Papers
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Why Choose 11+ Prep Hub?</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Everything you need to excel in your 11+ exams, all in one place.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardContent className="p-8">
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Target className="w-8 h-8 text-purple-600" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Targeted Learning</h3>
                <p className="text-gray-600">
                  Personalized study plans based on your strengths and areas for improvement.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardContent className="p-8">
                <div className="w-16 h-16 bg-cyan-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Zap className="w-8 h-8 text-cyan-600" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Instant Results</h3>
                <p className="text-gray-600">
                  Get immediate feedback and detailed analysis of your performance.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardContent className="p-8">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Shield className="w-8 h-8 text-green-600" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Proven Success</h3>
                <p className="text-gray-600">
                  Join thousands of students who have achieved their 11+ goals with us.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Courses Section */}
      <section id="courses" className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Featured Courses</h2>
            <p className="text-xl text-gray-600">
              Comprehensive courses designed by education experts
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredCourses.map((course) => (
              <Card key={course.id} className="hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                <CardHeader className="pb-4">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2 text-purple-600">
                      {getSubjectIcon(course.subject)}
                      <span className="text-sm font-medium">{course.subject}</span>
                    </div>
                    <Badge className={getDifficultyColor(course.difficulty)}>
                      {course.difficulty}
                    </Badge>
                  </div>
                  <CardTitle className="text-lg">{course.title}</CardTitle>
                  <CardDescription className="text-sm">
                    {course.description}
                  </CardDescription>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-1">
                          <Clock className="w-4 h-4 text-gray-500" />
                          <span>{course.duration}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Users className="w-4 h-4 text-gray-500" />
                          <span>{course.students}</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <div className="flex items-center">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`w-4 h-4 ${
                              i < Math.floor(course.rating)
                                ? 'text-yellow-400 fill-current'
                                : 'text-gray-300'
                            }`}
                          />
                        ))}
                      </div>
                      <span className="text-sm text-gray-600">({course.rating})</span>
                    </div>

                    <div className="flex items-center justify-between pt-2">
                      <span className="text-2xl font-bold text-purple-600">{course.price}</span>
                      <Link to="/login">
                        <Button size="sm" className="bg-purple-600 hover:bg-purple-700">
                          Enroll Now
                        </Button>
                      </Link>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Exam Papers Section */}
      <section id="exams" className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Practice Exam Papers</h2>
            <p className="text-xl text-gray-600">
              Download and practice with our comprehensive collection of exam papers
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredExamPapers.map((paper) => (
              <Card key={paper.id} className="hover:shadow-lg transition-shadow">
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
                <CardContent className="pt-0">
                  <div className="flex items-center justify-between">
                    <Badge variant="outline">{paper.type}</Badge>
                    <Link to="/login">
                      <Button size="sm" className="gap-2">
                        <Download className="w-4 h-4" />
                        Download PDF
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link to="/exam-papers">
              <Button size="lg" variant="outline" className="gap-2">
                <FileText className="w-5 h-5" />
                View All Exam Papers
                <ChevronRight className="w-4 h-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-purple-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold mb-2">10,000+</div>
              <div className="text-purple-200">Students Enrolled</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">95%</div>
              <div className="text-purple-200">Success Rate</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">500+</div>
              <div className="text-purple-200">Practice Papers</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">50+</div>
              <div className="text-purple-200">Expert Tutors</div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Products Column */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Products</h3>
              <ul className="space-y-2 text-gray-300">
                <li><Link to="/exam-papers" className="hover:text-white transition-colors">Exam Papers</Link></li>
                <li><Link to="/courses" className="hover:text-white transition-colors">Courses</Link></li>
                <li><Link to="/login" className="hover:text-white transition-colors">Mock Exams</Link></li>
                <li><Link to="/login" className="hover:text-white transition-colors">Mark Schemes</Link></li>
                <li><Link to="/login" className="hover:text-white transition-colors">Video Masterclasses</Link></li>
                <li><Link to="/login" className="hover:text-white transition-colors">Online Clinics</Link></li>
                <li><Link to="/login" className="hover:text-white transition-colors">Creative Writing</Link></li>
                <li><Link to="/login" className="hover:text-white transition-colors">Tuition</Link></li>
              </ul>
            </div>

            {/* Browse Column */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Browse</h3>
              <ul className="space-y-2 text-gray-300">
                <li><Link to="/login" className="hover:text-white transition-colors">Mathematics</Link></li>
                <li><Link to="/login" className="hover:text-white transition-colors">English</Link></li>
                <li><Link to="/login" className="hover:text-white transition-colors">Verbal Reasoning</Link></li>
                <li><Link to="/login" className="hover:text-white transition-colors">Non-Verbal Reasoning</Link></li>
                <li><Link to="/login" className="hover:text-white transition-colors">All Subjects</Link></li>
              </ul>
            </div>

            {/* Company Column */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Company</h3>
              <ul className="space-y-2 text-gray-300">
                <li><Link to="/about" className="hover:text-white transition-colors">About</Link></li>
                <li><Link to="/advice" className="hover:text-white transition-colors">Advice</Link></li>
                <li><Link to="/contact" className="hover:text-white transition-colors">Contact Us</Link></li>
                <li><Link to="/faqs" className="hover:text-white transition-colors">FAQs</Link></li>
                <li><Link to="/school-enquiries" className="hover:text-white transition-colors">School Enquiries</Link></li>
                <li><Link to="/reviews" className="hover:text-white transition-colors">Reviews</Link></li>
              </ul>
            </div>

            {/* Contact & Social Column */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Get in Touch</h3>
              <div className="space-y-3 text-gray-300 mb-6">
                <div className="flex items-center gap-2">
                  <Mail className="w-4 h-4" />
                  <span>support@11prephub.com</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4" />
                  <span>+44 20 1234 5678</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4" />
                  <span>London, UK</span>
                </div>
              </div>
              
              <div>
                <h4 className="font-medium mb-3">Follow us on:</h4>
                <div className="flex space-x-4">
                  <a href="https://facebook.com/11prephub" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">
                    <Facebook className="w-5 h-5" />
                  </a>
                  <a href="https://linkedin.com/company/11prephub" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">
                    <Linkedin className="w-5 h-5" />
                  </a>
                  <a href="https://youtube.com/@11prephub" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">
                    <Youtube className="w-5 h-5" />
                  </a>
                  <a href="https://twitter.com/11prephub" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">
                    <Twitter className="w-5 h-5" />
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Footer Bottom */}
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 11+ Prep Hub. All rights reserved. | Privacy Policy | Terms of Service</p>
          </div>
        </div>
      </footer>
    </div>
  )
}