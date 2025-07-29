import { Link } from 'react-router-dom'
import { Button } from '../components/ui/button'
import { Card, CardContent } from '../components/ui/card'
import { 
  Trophy, 
  ArrowLeft,
  BookOpen,
  Clock,
  Target,
  Brain,
  Heart,
  Users,
  CheckCircle
} from 'lucide-react'

const quickTips = [
  {
    icon: <Clock className="w-5 h-5" />,
    title: 'Start Early',
    description: 'Begin preparation at least 12-18 months before the exam date.'
  },
  {
    icon: <Brain className="w-5 h-5" />,
    title: 'Practice Regularly',
    description: 'Consistent daily practice is more effective than intensive cramming.'
  },
  {
    icon: <Target className="w-5 h-5" />,
    title: 'Focus on Weaknesses',
    description: 'Identify and work on areas where your child needs the most improvement.'
  },
  {
    icon: <Heart className="w-5 h-5" />,
    title: 'Stay Positive',
    description: 'Maintain a supportive and encouraging environment throughout the journey.'
  }
]

export default function AdvicePage() {
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
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Expert Advice & Guidance</h1>
          <p className="text-xl text-purple-100 max-w-3xl mx-auto">
            Get expert tips, strategies, and guidance from education professionals 
            to help your child succeed in their 11+ journey.
          </p>
        </div>
      </section>

      {/* Quick Tips Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Quick Tips for Success</h2>
            <p className="text-xl text-gray-600">
              Essential advice every 11+ parent should know
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {quickTips.map((tip, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <div className="text-purple-600">
                      {tip.icon}
                    </div>
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">{tip.title}</h3>
                  <p className="text-gray-600 text-sm">{tip.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-purple-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Need Personalized Advice?</h2>
          <p className="text-xl text-purple-100 mb-8 max-w-2xl mx-auto">
            Get expert guidance tailored to your child's specific needs and circumstances.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/contact">
              <Button size="lg" className="bg-white text-purple-600 hover:bg-gray-100">
                Contact Our Experts
              </Button>
            </Link>
            <Link to="/signup">
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-purple-600">
                Start Free Trial
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}