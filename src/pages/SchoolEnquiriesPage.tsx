import { Link } from 'react-router-dom'
import { Button } from '../components/ui/button'
import { Input } from '../components/ui/input'
import { Textarea } from '../components/ui/textarea'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card'
import { 
  Trophy, 
  ArrowLeft,
  School,
  Users,
  BookOpen,
  Award,
  CheckCircle,
  Mail,
  Phone
} from 'lucide-react'

const schoolBenefits = [
  {
    icon: <BookOpen className="w-6 h-6" />,
    title: 'Comprehensive Curriculum Coverage',
    description: 'Our resources align with national curriculum standards and cover all 11+ exam topics systematically.'
  },
  {
    icon: <Users className="w-6 h-6" />,
    title: 'Bulk Licensing Options',
    description: 'Cost-effective licensing for multiple students with centralized administration and progress tracking.'
  },
  {
    icon: <Award className="w-6 h-6" />,
    title: 'Teacher Training & Support',
    description: 'Professional development sessions and ongoing support for educators using our platform.'
  }
]

export default function SchoolEnquiriesPage() {
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
          <School className="w-16 h-16 mx-auto mb-6 text-white" />
          <h1 className="text-4xl md:text-5xl font-bold mb-6">School Partnerships</h1>
          <p className="text-xl text-purple-100 max-w-3xl mx-auto">
            Empower your school with comprehensive 11+ preparation resources. 
            Join hundreds of schools already using our platform to boost student success rates.
          </p>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Why Schools Choose Us</h2>
            <p className="text-xl text-gray-600">
              Trusted by over 200 schools across the UK
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {schoolBenefits.map((benefit, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-8">
                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-purple-100 rounded-lg flex-shrink-0">
                      <div className="text-purple-600">
                        {benefit.icon}
                      </div>
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900 mb-2">
                        {benefit.title}
                      </h3>
                      <p className="text-gray-600">
                        {benefit.description}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div>
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Mail className="w-5 h-5 text-purple-600" />
                    School Enquiry Form
                  </CardTitle>
                  <CardDescription>
                    Tell us about your school's needs and we'll get back to you within 24 hours.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Contact Name *
                      </label>
                      <Input placeholder="Your full name" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Job Title *
                      </label>
                      <Input placeholder="e.g., Head Teacher" />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      School Name *
                    </label>
                    <Input placeholder="Your school name" />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email Address *
                    </label>
                    <Input type="email" placeholder="your.email@school.edu" />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Message
                    </label>
                    <Textarea 
                      placeholder="Tell us about your school's 11+ preparation needs..."
                      rows={4}
                    />
                  </div>
                  
                  <Button className="w-full bg-purple-600 hover:bg-purple-700">
                    Send Enquiry
                  </Button>
                </CardContent>
              </Card>
            </div>

            {/* Contact Information */}
            <div className="space-y-8">
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Get in Touch</h3>
                <p className="text-gray-600 mb-6">
                  Our education specialists are here to help you find the perfect solution 
                  for your school's 11+ preparation needs.
                </p>
              </div>

              <div className="space-y-6">
                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="p-3 bg-purple-100 rounded-lg">
                        <Phone className="w-6 h-6 text-purple-600" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-1">School Sales Team</h4>
                        <p className="text-gray-600 mb-2">+44 20 1234 5679</p>
                        <p className="text-sm text-gray-500">
                          Monday - Friday: 8:00 AM - 6:00 PM GMT
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="p-3 bg-cyan-100 rounded-lg">
                        <Mail className="w-6 h-6 text-cyan-600" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-1">School Enquiries</h4>
                        <p className="text-gray-600 mb-2">schools@11prephub.com</p>
                        <p className="text-sm text-gray-500">
                          We respond to all enquiries within 24 hours
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-purple-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Transform Your 11+ Results?</h2>
          <p className="text-xl text-purple-100 mb-8 max-w-2xl mx-auto">
            Join the growing community of schools achieving exceptional 11+ success rates.
          </p>
          <Button size="lg" className="bg-white text-purple-600 hover:bg-gray-100">
            Schedule a Demo
          </Button>
        </div>
      </section>
    </div>
  )
}