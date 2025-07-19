import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Button } from '../components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card'
import { Badge } from '../components/ui/badge'
import { Progress } from '../components/ui/progress'
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
  User,
  Settings,
  LogOut,
  Bell,
  Search,
  Filter,
  MoreVertical,
  ChevronRight,
  BarChart3,
  PieChart,
  Activity,
  Home,
  Upload,
  Plus,
  Menu,
  X
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

export default function DashboardPage() {
  const navigate = useNavigate()
  const [activeSection, setActiveSection] = useState('dashboard')
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

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

  const sidebarItems = [
    { id: 'dashboard', label: 'Dashboard', icon: <Home className="w-5 h-5" /> },
    { id: 'performance', label: 'Performance', icon: <BarChart3 className="w-5 h-5" /> },
    { id: 'completed', label: 'Completed Papers', icon: <CheckCircle className="w-5 h-5" /> },
    { id: 'create', label: 'Create Your Exam', icon: <Plus className="w-5 h-5" /> },
    { id: 'upload', label: 'Upload Answers', icon: <Upload className="w-5 h-5" /> },
    { id: 'mathematics', label: 'Mathematics', icon: <Calculator className="w-5 h-5" /> },
    { id: 'english', label: 'English', icon: <BookOpen className="w-5 h-5" /> },
    { id: 'verbal', label: 'Verbal Reasoning', icon: <Brain className="w-5 h-5" /> },
    { id: 'nonverbal', label: 'Non-Verbal Reasoning', icon: <Puzzle className="w-5 h-5" /> }
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b sticky top-0 z-50">
        <div className="px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="lg:hidden p-2 rounded-md text-gray-700 hover:text-purple-600"
            >
              {isSidebarOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>

            {/* Logo */}
            <Link to="/" className="flex items-center gap-3">
              <div className="p-2 bg-purple-600 rounded-lg">
                <Trophy className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">11+ Prep Hub</h1>
                <p className="text-xs text-gray-600">Student Dashboard</p>
              </div>
            </Link>

            {/* Search */}
            <div className="hidden md:flex items-center flex-1 max-w-md mx-8">
              <div className="relative w-full">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="text"
                  placeholder="Search papers, topics..."
                  className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:border-purple-500 focus:ring-1 focus:ring-purple-500"
                />
              </div>
            </div>

            {/* User Menu */}
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="sm">
                <Bell className="w-5 h-5" />
              </Button>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                  <User className="w-5 h-5 text-purple-600" />
                </div>
                <div className="hidden md:block">
                  <p className="text-sm font-medium text-gray-900">Alex Johnson</p>
                  <p className="text-xs text-gray-600">Student</p>
                </div>
                <Button variant="ghost" size="sm">
                  <MoreVertical className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Left Sidebar */}
        <aside className={`${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } lg:translate-x-0 fixed lg:static inset-y-0 left-0 z-40 w-64 bg-white border-r border-gray-200 transition-transform duration-300 ease-in-out`}>
          <div className="flex flex-col h-full">
            {/* Sidebar Header */}
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                  <User className="w-6 h-6 text-purple-600" />
                </div>
                <div>
                  <p className="font-semibold text-gray-900">Alex Johnson</p>
                  <p className="text-sm text-gray-600">Year 6 Student</p>
                </div>
              </div>
            </div>

            {/* Navigation */}
            <nav className="flex-1 p-4 space-y-2">
              {sidebarItems.map((item) => {
                const isSubject = ['mathematics', 'english', 'verbal', 'nonverbal'].includes(item.id)
                
                if (isSubject) {
                  return (
                    <Link
                      key={item.id}
                      to={`/subject/${item.id}`}
                      className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-colors ${
                        activeSection === item.id
                          ? 'bg-purple-100 text-purple-700 font-medium'
                          : 'text-gray-700 hover:bg-gray-100'
                      }`}
                      onClick={() => setIsSidebarOpen(false)}
                    >
                      {item.icon}
                      <span>{item.label}</span>
                    </Link>
                  )
                }
                
                if (item.id === 'performance') {
                  return (
                    <Link
                      key={item.id}
                      to="/performance"
                      className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-colors text-gray-700 hover:bg-gray-100"
                      onClick={() => setIsSidebarOpen(false)}
                    >
                      {item.icon}
                      <span>{item.label}</span>
                    </Link>
                  )
                }

                return (
                  <button
                    key={item.id}
                    onClick={() => {
                      setActiveSection(item.id)
                      setIsSidebarOpen(false)
                    }}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-colors ${
                      activeSection === item.id
                        ? 'bg-purple-100 text-purple-700 font-medium'
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    {item.icon}
                    <span>{item.label}</span>
                  </button>
                )
              })}
            </nav>

            {/* Sidebar Footer */}
            <div className="p-4 border-t border-gray-200">
              <Button variant="ghost" className="w-full justify-start gap-3 text-gray-700">
                <Settings className="w-5 h-5" />
                Settings
              </Button>
              <Button variant="ghost" className="w-full justify-start gap-3 text-gray-700 mt-2">
                <LogOut className="w-5 h-5" />
                Sign Out
              </Button>
            </div>
          </div>
        </aside>

        {/* Mobile Overlay */}
        {isSidebarOpen && (
          <div 
            className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-30"
            onClick={() => setIsSidebarOpen(false)}
          />
        )}

        {/* Main Content */}
        <main className="flex-1 lg:ml-0">
          <div className="flex">
            {/* Center Content */}
            <div className="flex-1 p-6">
              {/* Welcome Section */}
              <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-900 mb-2">Welcome back, Alex! 👋</h1>
                <p className="text-gray-600">Ready to continue your 11+ exam preparation journey?</p>
              </div>

              {/* Main Dashboard Content */}
              {activeSection === 'dashboard' && (
                <div className="space-y-6">
                  {/* Subject Progress Cards */}
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

                  {/* Quick Actions */}
                  <Card>
                    <CardHeader>
                      <CardTitle>Quick Actions</CardTitle>
                      <CardDescription>Jump into your studies</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
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
                          onClick={() => navigate('/create-exam')}
                        >
                          <Plus className="w-6 h-6" />
                          Create Exam
                        </Button>
                        <Button 
                          variant="outline" 
                          className="h-20 flex-col gap-2"
                          onClick={() => navigate('/omr-upload')}
                        >
                          <Upload className="w-6 h-6" />
                          Upload Answers
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              )}

              {/* Other sections content would go here based on activeSection */}
              {activeSection === 'completed' && (
                <div className="text-center py-12">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">Completed Papers</h2>
                  <p className="text-gray-600 mb-6">Review all your completed exams with OMR answer sheet uploads and track your progress.</p>
                  <Button 
                    onClick={() => navigate('/completed-papers')}
                    className="gap-2"
                  >
                    <CheckCircle className="w-5 h-5" />
                    View Completed Papers
                  </Button>
                </div>
              )}
              {activeSection === 'create' && (
                <div className="text-center py-12">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">Create Your Custom Exam</h2>
                  <p className="text-gray-600 mb-6">Design a personalized exam tailored to your learning needs. Choose your subject, topic, difficulty level, and number of questions.</p>
                  <Button 
                    onClick={() => navigate('/create-exam')}
                    className="gap-2 bg-purple-600 hover:bg-purple-700"
                  >
                    <Plus className="w-5 h-5" />
                    Start Creating Exam
                  </Button>
                </div>
              )}
              {activeSection === 'upload' && (
                <div className="text-center py-12">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">Upload Answer Sheet</h2>
                  <p className="text-gray-600 mb-6">Upload your completed OMR answer sheet for instant results and detailed explanations.</p>
                  <Button 
                    onClick={() => navigate('/omr-upload')}
                    className="gap-2"
                  >
                    <Upload className="w-5 h-5" />
                    Start Upload Process
                  </Button>
                </div>
              )}
              {activeSection !== 'dashboard' && activeSection !== 'upload' && activeSection !== 'completed' && activeSection !== 'create' && (
                <div className="text-center py-12">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">
                    {sidebarItems.find(item => item.id === activeSection)?.label}
                  </h2>
                  <p className="text-gray-600">Content for this section is coming soon!</p>
                </div>
              )}
            </div>

            {/* Right Panel - Statistics */}
            <aside className="hidden xl:block w-80 bg-white border-l border-gray-200 p-6">
              <div className="space-y-6">
                {/* Overall Stats */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Your Progress</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="text-center">
                      <div className="text-3xl font-bold text-purple-600 mb-1">{overallProgress}%</div>
                      <p className="text-sm text-gray-600">Overall Progress</p>
                      <Progress value={overallProgress} className="mt-2" />
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4 pt-4 border-t">
                      <div className="text-center">
                        <div className="text-xl font-bold text-gray-900">{totalCompleted}</div>
                        <p className="text-xs text-gray-600">Papers Completed</p>
                      </div>
                      <div className="text-center">
                        <div className="text-xl font-bold text-gray-900">{totalPapers}</div>
                        <p className="text-xs text-gray-600">Total Papers</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Balance & Score */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Performance</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Average Score</span>
                      <span className="text-lg font-bold text-green-600">{averageScore}%</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Study Streak</span>
                      <span className="text-lg font-bold text-orange-600">5 days</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Credits Balance</span>
                      <span className="text-lg font-bold text-blue-600">150</span>
                    </div>
                  </CardContent>
                </Card>

                {/* Recent Activity */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Recent Activity</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {recentActivities.map((activity) => (
                      <div key={activity.id} className="flex items-start gap-3">
                        {getActivityIcon(activity.type)}
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-gray-900 truncate">
                            {activity.title}
                          </p>
                          <div className="flex items-center gap-2 mt-1">
                            <Badge variant="outline" className="text-xs">
                              {activity.subject}
                            </Badge>
                            {activity.score && (
                              <Badge variant="secondary" className="text-xs">
                                {activity.score}%
                              </Badge>
                            )}
                          </div>
                          <p className="text-xs text-gray-500 mt-1">{activity.timestamp}</p>
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>

                {/* Achievements */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Latest Achievement</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-center">
                      <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-3">
                        <Trophy className="w-8 h-8 text-yellow-600" />
                      </div>
                      <h3 className="font-semibold text-gray-900 mb-1">Math Master</h3>
                      <p className="text-sm text-gray-600">Scored 90%+ on 5 math papers</p>
                      <Badge className="mt-2 bg-yellow-100 text-yellow-800">
                        Earned 1 week ago
                      </Badge>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </aside>
          </div>
        </main>
      </div>
    </div>
  )
}