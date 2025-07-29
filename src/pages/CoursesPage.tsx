import { Link } from 'react-router-dom'
import { Button } from '../components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card'
import { Badge } from '../components/ui/badge'
import { 
  Trophy, 
  Star, 
  Clock, 
  Users, 
  BookOpen, 
  Calculator, 
  Brain, 
  Puzzle,
  ArrowLeft
} from 'lucide-react'

const courses = [
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
    instructor: 'Dr. Sarah Johnson'
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
    instructor: 'Michael Thompson'
  }
]

export default function CoursesPage() {
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
      default: return <BookOpen className="w-5 h-5" />
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
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Expert-Led Courses</h1>
          <p className="text-xl text-purple-100 max-w-3xl mx-auto">
            Comprehensive 11+ preparation courses designed by education experts 
            to help your child excel in every subject.
          </p>
        </div>
      </section>

      {/* Courses Grid */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {courses.map((course) => (
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
                <CardContent className="space-y-4">
                  <div className="text-sm text-gray-600">
                    <span className="font-medium">Instructor:</span> {course.instructor}
                  </div>

                  <div className="flex items-center justify-between text-sm text-gray-600">
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      <span>{course.duration}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Users className="w-4 h-4" />
                      <span>{course.students}</span>
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

                  <div className="flex items-center justify-between pt-4 border-t">
                    <span className="text-2xl font-bold text-purple-600">{course.price}</span>
                    <Link to="/login">
                      <Button size="sm" className="bg-purple-600 hover:bg-purple-700">
                        Enroll Now
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
          <h2 className="text-3xl font-bold mb-4">Ready to Start Learning?</h2>
          <p className="text-xl text-purple-100 mb-8 max-w-2xl mx-auto">
            Join thousands of students who have achieved their 11+ goals with our expert-led courses.
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