import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Button } from '../components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card'
import { Badge } from '../components/ui/badge'
import { 
  Trophy, 
  ArrowLeft,
  Star,
  ThumbsUp,
  MessageSquare,
  Filter,
  Users,
  Award,
  Target,
  CheckCircle,
  Quote
} from 'lucide-react'

interface Review {
  id: string
  name: string
  role: string
  location: string
  rating: number
  date: string
  title: string
  content: string
  verified: boolean
  helpful: number
  subject?: string
  schoolType?: string
  outcome?: string
}

const reviews: Review[] = [
  {
    id: '1',
    name: 'Sarah Johnson',
    role: 'Parent',
    location: 'London',
    rating: 5,
    date: '2024-01-15',
    title: 'Exceptional platform - daughter got into her first choice!',
    content: 'My daughter Emma used 11+ Prep Hub for 8 months and the improvement was remarkable. The practice papers were exactly like the real exams, and the progress tracking helped us identify weak areas. She scored in the top 10% and got into her first choice grammar school.',
    verified: true,
    helpful: 24,
    subject: 'All Subjects',
    schoolType: 'Grammar School',
    outcome: 'First Choice Success'
  },
  {
    id: '2',
    name: 'Michael Chen',
    role: 'Parent',
    location: 'Birmingham',
    rating: 5,
    date: '2024-01-10',
    title: 'Brilliant for building confidence',
    content: 'Our son was struggling with verbal reasoning and losing confidence. The structured approach and clear explanations on this platform made all the difference. He went from scoring 40% to 85% in just 4 months.',
    verified: true,
    helpful: 18,
    subject: 'Verbal Reasoning',
    schoolType: 'Independent School',
    outcome: 'Significant Improvement'
  }
]

const stats = [
  { label: 'Total Reviews', value: '2,847', icon: <MessageSquare className="w-5 h-5" /> },
  { label: 'Average Rating', value: '4.8/5', icon: <Star className="w-5 h-5" /> },
  { label: 'Success Rate', value: '94%', icon: <Target className="w-5 h-5" /> },
  { label: 'Verified Reviews', value: '98%', icon: <CheckCircle className="w-5 h-5" /> }
]

export default function ReviewsPage() {
  const [selectedFilter, setSelectedFilter] = useState('All')

  const renderStars = (rating: number) => {
    return [...Array(5)].map((_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${
          i < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
        }`}
      />
    ))
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
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Student & Parent Reviews</h1>
          <p className="text-xl text-purple-100 max-w-3xl mx-auto">
            Read real success stories from families who achieved their 11+ goals with our platform.
          </p>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <Card key={index} className="text-center">
                <CardContent className="p-6">
                  <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <div className="text-purple-600">
                      {stat.icon}
                    </div>
                  </div>
                  <div className="text-3xl font-bold text-gray-900 mb-2">{stat.value}</div>
                  <div className="text-gray-600">{stat.label}</div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Reviews Grid */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {reviews.map((review) => (
              <Card key={review.id} className="hover:shadow-lg transition-shadow">
                <CardHeader className="pb-4">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <div className="flex items-center">
                          {renderStars(review.rating)}
                        </div>
                        {review.verified && (
                          <Badge className="bg-green-100 text-green-800 text-xs">
                            <CheckCircle className="w-3 h-3 mr-1" />
                            Verified
                          </Badge>
                        )}
                      </div>
                      <CardTitle className="text-lg mb-1">{review.title}</CardTitle>
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <span className="font-medium">{review.name}</span>
                        <span>•</span>
                        <span>{review.location}</span>
                      </div>
                    </div>
                    <Quote className="w-6 h-6 text-purple-200 flex-shrink-0" />
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-gray-700 leading-relaxed">{review.content}</p>
                  
                  <div className="flex flex-wrap gap-2">
                    {review.subject && (
                      <Badge variant="outline" className="text-xs">
                        {review.subject}
                      </Badge>
                    )}
                    {review.outcome && (
                      <Badge className="bg-green-100 text-green-800 text-xs">
                        {review.outcome}
                      </Badge>
                    )}
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t">
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <ThumbsUp className="w-4 h-4" />
                      <span>{review.helpful} people found this helpful</span>
                    </div>
                    <Button variant="ghost" size="sm" className="text-purple-600 hover:text-purple-700">
                      Helpful
                    </Button>
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
          <h2 className="text-3xl font-bold mb-4">Join Our Success Stories</h2>
          <p className="text-xl text-purple-100 mb-8 max-w-2xl mx-auto">
            Start your child's 11+ journey today and become our next success story.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/signup">
              <Button size="lg" className="bg-white text-purple-600 hover:bg-gray-100">
                Start Free Trial
              </Button>
            </Link>
            <Link to="/contact">
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-purple-600">
                Contact Us
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}