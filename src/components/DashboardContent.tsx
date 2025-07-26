import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from './ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card'
import { Badge } from './ui/badge'
import { Progress } from './ui/progress'
import { 
  Trophy,
  BookOpen,
  Calculator,
  Brain,
  Puzzle,
  Download,
  Play,
  Clock,
  Star,
  Award,
  Target,
  TrendingUp,
  Calendar,
  FileText,
  CheckCircle,
  ChevronRight,
  BarChart3,
  PieChart,
  Activity,
  Home,
  Upload,
  Plus,
  Video,
  Users,
  Shield,
  GraduationCap,
  BookMarked,
  Bell
} from 'lucide-react'

interface Subject {
  id: string
  name: string
  icon: React.ReactNode
  color: string
  progress: number
  totalPapers: number
  completedPapers: number
  averageScore: number
  lastActivity: string
}

interface RecentActivity {
  id: string
  type: 'completed' | 'started' | 'downloaded'
  title: string
  subject: string
  score?: number
  timestamp: string
}

const subjects: Subject[] = [
  {
    id: 'math',
    name: 'Mathematics',
    icon: <Calculator className="w-5 h-5" />,
    color: 'bg-blue-500',
    progress: 75,
    totalPapers: 45,
    completedPapers: 34,
    averageScore: 82,
    lastActivity: '2 hours ago'
  },
  {
    id: 'english',
    name: 'English',
    icon: <BookOpen className="w-5 h-5" />,
    color: 'bg-green-500',
    progress: 60,
    totalPapers: 38,
    completedPapers: 23,
    averageScore: 78,
    lastActivity: '1 day ago'
  },
  {
    id: 'verbal',
    name: 'Verbal Reasoning',
    icon: <Brain className="w-5 h-5" />,
    color: 'bg-purple-500',
    progress: 45,
    totalPapers: 32,
    completedPapers: 14,
    averageScore: 71,
    lastActivity: '3 days ago'
  },
  {
    id: 'nonverbal',
    name: 'Non-Verbal Reasoning',
    icon: <Puzzle className="w-5 h-5" />,
    color: 'bg-orange-500',
    progress: 30,
    totalPapers: 28,
    completedPapers: 8,
    averageScore: 65,
    lastActivity: '5 days ago'
  }
]

const recentActivities: RecentActivity[] = [
  {
    id: '1',
    type: 'completed',
    title: 'Mathematics Practice Paper 5',
    subject: 'Mathematics',
    score: 85,
    timestamp: '2 hours ago'
  },
  {
    id: '2',
    type: 'started',
    title: 'English Comprehension Test',
    subject: 'English',
    timestamp: '1 day ago'
  },
  {
    id: '3',
    type: 'downloaded',
    title: 'Verbal Reasoning Challenge Pack',
    subject: 'Verbal Reasoning',
    timestamp: '2 days ago'
  }
]

export default function DashboardContent() {
  // User state - this would come from authentication context in a real app
  const [currentUser] = useState({
    name: 'Alex Johnson',
    email: 'alex.johnson@email.com',
    avatar: '/api/placeholder/40/40',
    roles: ['Normal User', 'Student', 'Teacher', 'Admin'], // User has multiple roles
    activeRole: 'Normal User' // Currently active role
  })
  
  const [activeRole] = useState(currentUser.activeRole)
  const navigate = useNavigate()

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'completed': return <CheckCircle className="w-4 h-4 text-green-500" />
      case 'started': return <Play className="w-4 h-4 text-blue-500" />
      case 'downloaded': return <Download className="w-4 h-4 text-purple-500" />
      default: return <FileText className="w-4 h-4 text-gray-500" />
    }
  }

  const overallProgress = Math.round(subjects.reduce((acc, subject) => acc + subject.progress, 0) / subjects.length)
  const totalCompleted = subjects.reduce((acc, subject) => acc + subject.completedPapers, 0)
  const totalPapers = subjects.reduce((acc, subject) => acc + subject.totalPapers, 0)
  const averageScore = Math.round(subjects.reduce((acc, subject) => acc + subject.averageScore, 0) / subjects.length)

  const getRoleIcon = (role: string) => {
    switch (role) {
      case 'Admin': return <Shield className="w-4 h-4" />
      case 'Teacher': return <GraduationCap className="w-4 h-4" />
      case 'Student': return <BookOpen className="w-4 h-4" />
      case 'Normal User': return <Trophy className="w-4 h-4" />
      default: return <Trophy className="w-4 h-4" />
    }
  }

  const getRoleBadgeColor = (role: string) => {
    switch (role) {
      case 'Admin': return 'bg-red-100 text-red-800 border-red-200'
      case 'Teacher': return 'bg-blue-100 text-blue-800 border-blue-200'
      case 'Student': return 'bg-green-100 text-green-800 border-green-200'
      case 'Normal User': return 'bg-gray-100 text-gray-800 border-gray-200'
      default: return 'bg-gray-100 text-gray-800 border-gray-200'
    }
  }

  return (
    <div className="p-6">
      {/* Welcome Section */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Welcome back, {currentUser.name.split(' ')[0]}! 👋
        </h1>
        <p className="text-gray-600">
          {activeRole === 'Student' ? 'Ready to continue your learning journey?' :
           activeRole === 'Teacher' ? 'Ready to inspire and educate your students?' :
           activeRole === 'Admin' ? 'Ready to manage the platform?' :
           'Ready to continue your 11+ exam preparation journey?'}
        </p>
        <div className="flex items-center gap-2 mt-2">
          <Badge className={`text-xs px-2 py-1 ${getRoleBadgeColor(activeRole)}`}>
            <div className="flex items-center gap-1">
              {getRoleIcon(activeRole)}
              Current Role: {activeRole}
            </div>
          </Badge>
          {currentUser.roles.length > 1 && (
            <Badge variant="outline" className="text-xs">
              {currentUser.roles.length} roles available
            </Badge>
          )}
        </div>
      </div>

      {/* Role-specific Dashboard Content */}
      <div className="space-y-6">
        {/* Teacher Dashboard - Show teacher-specific content */}
        {activeRole === 'Teacher' && (
          <div className="space-y-6">
            {/* Teacher KPI Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-blue-600">Upcoming Classes</p>
                      <p className="text-3xl font-bold text-blue-900">3</p>
                    </div>
                    <div className="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center">
                      <Calendar className="w-6 h-6 text-white" />
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="bg-gradient-to-br from-orange-50 to-orange-100 border-orange-200">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-orange-600">Pending Evaluations</p>
                      <p className="text-3xl font-bold text-orange-900">22</p>
                    </div>
                    <div className="w-12 h-12 bg-orange-500 rounded-lg flex items-center justify-center">
                      <FileText className="w-6 h-6 text-white" />
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-green-600">Active Students</p>
                      <p className="text-3xl font-bold text-green-900">57</p>
                    </div>
                    <div className="w-12 h-12 bg-green-500 rounded-lg flex items-center justify-center">
                      <Users className="w-6 h-6 text-white" />
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-purple-600">Recent Submissions</p>
                      <p className="text-3xl font-bold text-purple-900">15</p>
                    </div>
                    <div className="w-12 h-12 bg-purple-500 rounded-lg flex items-center justify-center">
                      <CheckCircle className="w-6 h-6 text-white" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Upcoming Classes */}
            <Card>
              <CardHeader>
                <CardTitle>Today's Classes</CardTitle>
                <CardDescription>Your scheduled classes for today</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-blue-50 rounded-lg border border-blue-200">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center">
                        <Calculator className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900">Advanced Mathematics</h3>
                        <p className="text-sm text-gray-600">25 students • 10:00 AM - 11:00 AM</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge className="bg-green-100 text-green-800">Live</Badge>
                      <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                        <Video className="w-4 h-4 mr-2" />
                        Join
                      </Button>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border border-gray-200">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-green-500 rounded-lg flex items-center justify-center">
                        <BookOpen className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900">English Literature</h3>
                        <p className="text-sm text-gray-600">18 students • 2:00 PM - 3:00 PM</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant="outline">Upcoming</Badge>
                      <Button size="sm" variant="outline">
                        <Calendar className="w-4 h-4 mr-2" />
                        Prepare
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Subject Progress Cards - Only show for Normal User */}
        {activeRole === 'Normal User' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {subjects.map((subject) => (
              <Card key={subject.id} className="hover:shadow-lg transition-shadow">
                <CardHeader className="pb-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className={`w-12 h-12 ${subject.color} rounded-lg flex items-center justify-center text-white`}>
                        {subject.icon}
                      </div>
                      <div>
                        <CardTitle className="text-lg">{subject.name}</CardTitle>
                        <CardDescription>Last activity: {subject.lastActivity}</CardDescription>
                      </div>
                    </div>
                    <Button variant="ghost" size="sm">
                      <ChevronRight className="w-4 h-4" />
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-3 gap-4 text-center">
                    <div>
                      <p className="text-2xl font-bold text-gray-900">{subject.completedPapers}</p>
                      <p className="text-xs text-gray-600">Completed</p>
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-gray-900">{subject.averageScore}%</p>
                      <p className="text-xs text-gray-600">Average</p>
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-gray-900">{subject.progress}%</p>
                      <p className="text-xs text-gray-600">Progress</p>
                    </div>
                  </div>
                  <Progress value={subject.progress} />
                  <div className="flex gap-2">
                    <Button size="sm" className="flex-1">
                      <Play className="w-4 h-4 mr-2" />
                      Practice
                    </Button>
                    <Button size="sm" variant="outline" className="flex-1">
                      <Download className="w-4 h-4 mr-2" />
                      Download
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>
              {activeRole === 'Student' ? 'Jump into your studies' :
               activeRole === 'Teacher' ? 'Manage your classes and students' :
               activeRole === 'Admin' ? 'Platform management tools' :
               'Jump into your studies'}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              {activeRole === 'Student' && (
                <>
                  <Button 
                    className="h-20 flex-col gap-2 bg-purple-600 hover:bg-purple-700"
                    onClick={() => navigate('/app/my-classes')}
                  >
                    <GraduationCap className="w-6 h-6" />
                    My Classes
                  </Button>
                  <Button 
                    variant="outline" 
                    className="h-20 flex-col gap-2"
                    onClick={() => navigate('/app/my-exams')}
                  >
                    <BookMarked className="w-6 h-6" />
                    My Exams
                  </Button>
                  <Button 
                    variant="outline" 
                    className="h-20 flex-col gap-2"
                    onClick={() => navigate('/app/results')}
                  >
                    <Award className="w-6 h-6" />
                    View Results
                  </Button>
                  <Button 
                    variant="outline" 
                    className="h-20 flex-col gap-2"
                    onClick={() => navigate('/app/notifications')}
                  >
                    <Bell className="w-6 h-6" />
                    Notifications
                  </Button>
                </>
              )}
              
              {activeRole === 'Teacher' && (
                <>
                  <Button 
                    className="h-20 flex-col gap-2 bg-purple-600 hover:bg-purple-700"
                    onClick={() => navigate('/app/virtual-classes')}
                  >
                    <Video className="w-6 h-6" />
                    Virtual Classes
                  </Button>
                  <Button 
                    variant="outline" 
                    className="h-20 flex-col gap-2"
                    onClick={() => navigate('/app/students')}
                  >
                    <Users className="w-6 h-6" />
                    Manage Students
                  </Button>
                  <Button 
                    variant="outline" 
                    className="h-20 flex-col gap-2"
                    onClick={() => navigate('/app/create-exam')}
                  >
                    <Plus className="w-6 h-6" />
                    Create Exam
                  </Button>
                  <Button 
                    variant="outline" 
                    className="h-20 flex-col gap-2"
                    onClick={() => navigate('/app/performance')}
                  >
                    <BarChart3 className="w-6 h-6" />
                    Performance
                  </Button>
                </>
              )}
              
              {activeRole === 'Admin' && (
                <>
                  <Button 
                    className="h-20 flex-col gap-2 bg-purple-600 hover:bg-purple-700"
                    onClick={() => navigate('/app/admin/overview')}
                  >
                    <Shield className="w-6 h-6" />
                    Admin Overview
                  </Button>
                  <Button 
                    variant="outline" 
                    className="h-20 flex-col gap-2"
                    onClick={() => navigate('/app/admin/user-management')}
                  >
                    <Users className="w-6 h-6" />
                    User Management
                  </Button>
                  <Button 
                    variant="outline" 
                    className="h-20 flex-col gap-2"
                    onClick={() => navigate('/app/admin/analytics')}
                  >
                    <BarChart3 className="w-6 h-6" />
                    Analytics
                  </Button>
                  <Button 
                    variant="outline" 
                    className="h-20 flex-col gap-2"
                    onClick={() => navigate('/app/admin/exam-management')}
                  >
                    <FileText className="w-6 h-6" />
                    Exam Management
                  </Button>
                </>
              )}
              
              {activeRole === 'Normal User' && (
                <>
                  <Button className="h-20 flex-col gap-2 bg-purple-600 hover:bg-purple-700">
                    <Play className="w-6 h-6" />
                    Start Practice
                  </Button>
                  <Button variant="outline" className="h-20 flex-col gap-2">
                    <Download className="w-6 h-6" />
                    Download Papers
                  </Button>
                  <Button 
                    variant="outline" 
                    className="h-20 flex-col gap-2"
                    onClick={() => navigate('/app/create-exam')}
                  >
                    <Plus className="w-6 h-6" />
                    Create Exam
                  </Button>
                  <Button 
                    variant="outline" 
                    className="h-20 flex-col gap-2"
                    onClick={() => navigate('/app/omr-upload')}
                  >
                    <Upload className="w-6 h-6" />
                    Upload Answers
                  </Button>
                </>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}