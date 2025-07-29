import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Button } from '../components/ui/button'
import { Input } from '../components/ui/input'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card'
import { Label } from '../components/ui/label'
import { Separator } from '../components/ui/separator'
import { 
  Trophy, 
  Mail, 
  Lock, 
  Eye, 
  EyeOff,
  ArrowLeft,
  User,
  BookOpen,
  Users,
  Award,
  CheckCircle
} from 'lucide-react'

export default function SignupPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: ''
  })
  const [isLoading, setIsLoading] = useState(false)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    
    // Simulate signup process
    setTimeout(() => {
      setIsLoading(false)
      // Here you would typically handle the actual signup logic
      console.log('Signup attempt:', formData)
    }, 1500)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-cyan-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b sticky top-0 z-50">
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

            {/* Back to Home */}
            <Link to="/">
              <Button variant="ghost" className="gap-2">
                <ArrowLeft className="w-4 h-4" />
                Back to Home
              </Button>
            </Link>
          </div>
        </div>
      </header>

      <div className="flex min-h-[calc(100vh-4rem)]">
        {/* Left Side - Benefits */}
        <div className="hidden lg:flex flex-1 bg-gradient-to-br from-purple-600 to-cyan-600 text-white p-12 items-center">
          <div className="max-w-md">
            <h2 className="text-3xl font-bold mb-6">
              Start your 11+ success journey today
            </h2>
            <p className="text-purple-100 mb-8 text-lg">
              Join thousands of students who have achieved their 11+ goals with our comprehensive preparation platform.
            </p>

            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center flex-shrink-0">
                  <BookOpen className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-semibold mb-1">Comprehensive Resources</h3>
                  <p className="text-purple-100 text-sm">
                    Access 500+ practice papers, video lessons, and expert guidance
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Users className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-semibold mb-1">Expert Support</h3>
                  <p className="text-purple-100 text-sm">
                    Get help from qualified teachers and education specialists
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Award className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-semibold mb-1">Proven Results</h3>
                  <p className="text-purple-100 text-sm">
                    95% of our students achieve their target school placement
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center flex-shrink-0">
                  <CheckCircle className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-semibold mb-1">Personalized Learning</h3>
                  <p className="text-purple-100 text-sm">
                    Adaptive learning paths tailored to your child's needs
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-8 p-4 bg-white/10 rounded-lg">
              <p className="text-sm text-purple-100">
                "The structured approach and quality resources made all the difference in our preparation journey."
              </p>
              <p className="text-xs text-purple-200 mt-2">- Michael T., Parent</p>
            </div>
          </div>
        </div>

        {/* Right Side - Signup Form */}
        <div className="flex-1 flex items-center justify-center p-8">
          <div className="w-full max-w-md">
            <Card className="shadow-xl border-0">
              <CardHeader className="text-center pb-6">
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Trophy className="w-8 h-8 text-purple-600" />
                </div>
                <CardTitle className="text-2xl font-bold">Create Your Account</CardTitle>
                <CardDescription className="text-base">
                  Start your 11+ exam preparation journey today
                </CardDescription>
              </CardHeader>

              <CardContent className="space-y-6">
                <form onSubmit={handleSignup} className="space-y-4">
                  <div className="grid grid-cols-2 gap-3">
                    <div className="space-y-2">
                      <Label htmlFor="firstName">First Name</Label>
                      <div className="relative">
                        <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                        <Input
                          id="firstName"
                          name="firstName"
                          type="text"
                          placeholder="First name"
                          value={formData.firstName}
                          onChange={handleInputChange}
                          className="pl-10"
                          required
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lastName">Last Name</Label>
                      <Input
                        id="lastName"
                        name="lastName"
                        type="text"
                        placeholder="Last name"
                        value={formData.lastName}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        placeholder="Enter your email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className="pl-10"
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="password">Password</Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                      <Input
                        id="password"
                        name="password"
                        type={showPassword ? "text" : "password"}
                        placeholder="Create a password"
                        value={formData.password}
                        onChange={handleInputChange}
                        className="pl-10 pr-10"
                        required
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                      >
                        {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="confirmPassword">Confirm Password</Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                      <Input
                        id="confirmPassword"
                        name="confirmPassword"
                        type={showConfirmPassword ? "text" : "password"}
                        placeholder="Confirm your password"
                        value={formData.confirmPassword}
                        onChange={handleInputChange}
                        className="pl-10 pr-10"
                        required
                      />
                      <button
                        type="button"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                      >
                        {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>

                  <div className="flex items-start space-x-2">
                    <input type="checkbox" className="rounded border-gray-300 mt-1" required />
                    <span className="text-sm text-gray-600">
                      I agree to the{' '}
                      <Link to="/terms" className="text-purple-600 hover:text-purple-700">
                        Terms of Service
                      </Link>{' '}
                      and{' '}
                      <Link to="/privacy" className="text-purple-600 hover:text-purple-700">
                        Privacy Policy
                      </Link>
                    </span>
                  </div>

                  <Button 
                    type="submit" 
                    className="w-full bg-purple-600 hover:bg-purple-700 h-11"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        Creating account...
                      </div>
                    ) : (
                      'Create Account'
                    )}
                  </Button>
                </form>

                <div className="relative">
                  <Separator />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="bg-white px-2 text-sm text-gray-500">or sign up with</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <Button variant="outline" className="h-11">
                    <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                      <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                      <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                      <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                      <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                    </svg>
                    Google
                  </Button>
                  <Button variant="outline" className="h-11">
                    <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                    </svg>
                    Facebook
                  </Button>
                </div>

                <div className="text-center">
                  <p className="text-sm text-gray-600">
                    Already have an account?{' '}
                    <Link to="/login" className="text-purple-600 hover:text-purple-700 font-medium">
                      Sign in here
                    </Link>
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}