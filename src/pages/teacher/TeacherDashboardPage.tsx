import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Button } from '../../components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card'
import { Badge } from '../../components/ui/badge'
import { Progress } from '../../components/ui/progress'
import { 
  Trophy,
  BookOpen,
  Calculator,
  Brain,
  Puzzle,
  Clock,
  Star,
  Award,
  Target,
  TrendingUp,
  Calendar,
  CheckCircle,
  User,
  Settings,
  LogOut,
  Bell,
  Search,
  MoreVertical,
  ChevronRight,
  BarChart3,
  PieChart,
  Activity,
  Home,
  Upload,
  Plus,
  Menu,
  X,
  Video,
  Users,
  MessageSquare,
  FileText,
  AlertCircle,
  UserCheck,
  GraduationCap,
  ClipboardList,
  Filter
} from 'lucide-react'

interface UpcomingClass {
  id: string
  name: string
  subject: string
  time: string
  duration: string
  studentsEnrolled: number
  meetingLink: string
  status: 'upcoming' | 'live' | 'completed'
}

interface PendingEvaluation {
  id: string
  examTitle: string
  className: string
  submissions: number
  dueDate: string
  priority: 'high' | 'medium' | 'low'
}

interface StudentSubmission {
  id: string
  studentName: string
  examTitle: string
  submittedAt: string
  status: 'pending' | 'graded' | 'reviewed'
  score?: number
}

interface ClassOverview {
  id: string
  name: string
  subject: string
  totalStudents: number
  activeStudents: number
  averageAttendance: number
  lastActivity: string
}

const upcomingClasses: UpcomingClass[] = [
  {
    id: '1',
    name: 'Advanced Mathematics',
    subject: 'Mathematics',
    time: '10:00 AM',
    duration: '1h 30m',
    studentsEnrolled: 24,
    meetingLink: 'https://zoom.us/j/123456789',
    status: 'upcoming'
  },
  {
    id: '2',
    name: 'English Comprehension',
    subject: 'English',
    time: '2:00 PM',
    duration: '1h',
    studentsEnrolled: 18,
    meetingLink: 'https://meet.google.com/abc-defg-hij',
    status: 'upcoming'
  },
  {
    id: '3',
    name: 'Verbal Reasoning Workshop',
    subject: 'Verbal Reasoning',
    time: '4:00 PM',
    duration: '45m',
    studentsEnrolled: 15,
    meetingLink: 'https://teams.microsoft.com/l/meetup-join/xyz',
    status: 'live'
  }
]

const pendingEvaluations: PendingEvaluation[] = [
  {
    id: '1',
    examTitle: 'Mathematics Practice Test 5',
    className: 'Advanced Mathematics',
    submissions: 22,
    dueDate: 'Today',
    priority: 'high'
  },
  {
    id: '2',
    examTitle: 'English Comprehension Quiz',
    className: 'English Comprehension',
    submissions: 15,
    dueDate: 'Tomorrow',
    priority: 'medium'
  },
  {
    id: '3',
    examTitle: 'Verbal Reasoning Challenge',
    className: 'Verbal Reasoning Workshop',
    submissions: 8,
    dueDate: 'In 3 days',
    priority: 'low'
  }
]

const recentSubmissions: StudentSubmission[] = [
  {
    id: '1',
    studentName: 'Emma Thompson',
    examTitle: 'Mathematics Practice Test 4',
    submittedAt: '2 hours ago',
    status: 'pending'
  },
  {
    id: '2',
    studentName: 'James Wilson',
    examTitle: 'English Essay Assignment',
    submittedAt: '4 hours ago',
    status: 'graded',
    score: 85
  },
  {
    id: '3',
    studentName: 'Sophie Chen',
    examTitle: 'Verbal Reasoning Test 2',
    submittedAt: '1 day ago',
    status: 'reviewed',
    score: 92
  }
]

const assignedClasses: ClassOverview[] = [
  {
    id: '1',
    name: 'Advanced Mathematics',
    subject: 'Mathematics',
    totalStudents: 24,
    activeStudents: 22,
    averageAttendance: 92,
    lastActivity: '2 hours ago'
  },
  {
    id: '2',
    name: 'English Comprehension',
    subject: 'English',
    totalStudents: 18,
    activeStudents: 17,
    averageAttendance: 89,
    lastActivity: '1 day ago'
  },
  {
    id: '3',
    name: 'Verbal Reasoning Workshop',
    subject: 'Verbal Reasoning',
    totalStudents: 15,
    activeStudents: 14,
    averageAttendance: 87,
    lastActivity: '3 hours ago'
  }
]

export default function TeacherDashboardPage() {
  const navigate = useNavigate()
  const [timeFilter, setTimeFilter] = useState('Today')

  const getSubjectIcon = (subject: string) => {
    switch (subject) {
      case 'Mathematics': return <Calculator className="w-5 h-5" />
      case 'English': return <BookOpen className="w-5 h-5" />
      case 'Verbal Reasoning': return <Brain className="w-5 h-5" />
      case 'Non-Verbal Reasoning': return <Puzzle className="w-5 h-5" />
      default: return <FileText className="w-5 h-5" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'live': return 'bg-red-100 text-red-800 border-red-200'
      case 'upcoming': return 'bg-blue-100 text-blue-800 border-blue-200'
      case 'completed': return 'bg-green-100 text-green-800 border-green-200'
      default: return 'bg-gray-100 text-gray-800 border-gray-200'
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800 border-red-200'
      case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200'
      case 'low': return 'bg-green-100 text-green-800 border-green-200'
      default: return 'bg-gray-100 text-gray-800 border-gray-200'
    }
  }

  const getSubmissionStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-orange-100 text-orange-800 border-orange-200'
      case 'graded': return 'bg-blue-100 text-blue-800 border-blue-200'
      case 'reviewed': return 'bg-green-100 text-green-800 border-green-200'
      default: return 'bg-gray-100 text-gray-800 border-gray-200'
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm shadow-sm border-b sticky top-0 z-50">
        <div className="px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-3">
              <div className="p-2 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg">
                <Trophy className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                  11+ Prep Hub
                </h1>
                <p className="text-xs text-gray-600">Teacher Dashboard</p>
              </div>
            </Link>

            {/* Search */}
            <div className="hidden md:flex items-center flex-1 max-w-md mx-8">
              <div className="relative w-full">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="text"
                  placeholder="Search classes, students, exams..."
                  className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-xl focus:border-purple-500 focus:ring-1 focus:ring-purple-500 bg-white/80 backdrop-blur-sm"
                />
              </div>
            </div>

            {/* User Menu */}
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="sm">
                <Bell className="w-5 h-5" />
                <Badge className="ml-1 bg-red-100 text-red-800 text-xs px-1.5 py-0.5">5</Badge>
              </Button>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-gradient-to-r from-purple-100 to-blue-100 rounded-full flex items-center justify-center">
                  <GraduationCap className="w-5 h-5 text-purple-600" />
                </div>
                <div className="hidden md:block">
                  <p className="text-sm font-medium text-gray-900">Alex Johnson</p>
                  <p className="text-xs text-gray-600">Teacher</p>
                </div>
                <Button variant="ghost" size="sm">
                  <MoreVertical className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent mb-2">
            Good morning, Alex! 🌟
          </h1>
          <p className="text-gray-600">
            Ready to inspire and educate your students today? You have 3 classes scheduled and 22 submissions to review.
          </p>
          <div className="flex items-center gap-4 mt-4">
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-600">Filter by:</span>
              <select 
                value={timeFilter}
                onChange={(e) => setTimeFilter(e.target.value)}
                className="px-3 py-1 border border-gray-300 rounded-lg text-sm focus:border-purple-500 focus:ring-1 focus:ring-purple-500"
              >
                <option value="Today">Today</option>
                <option value="Week">This Week</option>
                <option value="Month">This Month</option>
              </select>
            </div>
          </div>
        </div>

        {/* KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl flex items-center justify-center shadow-lg">
                  <Video className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Upcoming Classes</p>
                  <p className="text-2xl font-bold text-gray-900">3</p>
                  <p className="text-xs text-blue-600">Next at 10:00 AM</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-orange-600 rounded-xl flex items-center justify-center shadow-lg">
                  <ClipboardList className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Pending Evaluations</p>
                  <p className="text-2xl font-bold text-gray-900">22</p>
                  <p className="text-xs text-orange-600">Due today</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-green-600 rounded-xl flex items-center justify-center shadow-lg">
                  <FileText className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Recent Submissions</p>
                  <p className="text-2xl font-bold text-gray-900">15</p>
                  <p className="text-xs text-green-600">Last 24 hours</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
                  <Users className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Active Students</p>
                  <p className="text-2xl font-bold text-gray-900">57</p>
                  <p className="text-xs text-purple-600">Across all classes</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-8">
            {/* Upcoming Classes */}
            <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-2">
                    <Calendar className="w-5 h-5 text-purple-600" />
                    Upcoming Classes
                  </CardTitle>
                  <Button variant="outline" size="sm" onClick={() => navigate('/virtual-classes')}>
                    View All
                  </Button>
                </div>
                <CardDescription>Your scheduled classes for today</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {upcomingClasses.map((cls) => (
                  <div key={cls.id} className="p-4 border border-gray-200 rounded-xl hover:shadow-md transition-shadow">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-gradient-to-r from-purple-100 to-blue-100 rounded-lg flex items-center justify-center">
                          {getSubjectIcon(cls.subject)}
                        </div>
                        <div>
                          <h3 className="font-semibold text-gray-900">{cls.name}</h3>
                          <p className="text-sm text-gray-600">{cls.subject}</p>
                        </div>
                      </div>
                      <Badge className={`${getStatusColor(cls.status)} border`}>
                        {cls.status === 'live' ? '🔴 LIVE' : cls.status === 'upcoming' ? '⏰ Upcoming' : '✅ Completed'}
                      </Badge>
                    </div>
                    <div className="grid grid-cols-3 gap-4 text-center text-sm">
                      <div>
                        <p className="font-medium text-gray-900">{cls.time}</p>
                        <p className="text-gray-600">Start Time</p>
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">{cls.duration}</p>
                        <p className="text-gray-600">Duration</p>
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">{cls.studentsEnrolled}</p>
                        <p className="text-gray-600">Students</p>
                      </div>
                    </div>
                    <div className="flex gap-2 mt-4">
                      {cls.status === 'live' ? (
                        <Button className="flex-1 bg-red-600 hover:bg-red-700">
                          <Video className="w-4 h-4 mr-2" />
                          Join Live Class
                        </Button>
                      ) : cls.status === 'upcoming' ? (
                        <Button className="flex-1 bg-purple-600 hover:bg-purple-700">
                          <Video className="w-4 h-4 mr-2" />
                          Start Class
                        </Button>
                      ) : (
                        <Button variant="outline" className="flex-1">
                          <Eye className="w-4 h-4 mr-2" />
                          View Recording
                        </Button>
                      )}
                      <Button variant="outline" size="sm">
                        <MessageSquare className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Pending Evaluations */}
            <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-2">
                    <ClipboardList className="w-5 h-5 text-orange-600" />
                    Pending Exam Evaluations
                  </CardTitle>
                  <Button variant="outline" size="sm">
                    Review All
                  </Button>
                </div>
                <CardDescription>Exams waiting for your review and grading</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {pendingEvaluations.map((evaluation) => (
                  <div key={evaluation.id} className="p-4 border border-gray-200 rounded-xl hover:shadow-md transition-shadow">
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <h3 className="font-semibold text-gray-900">{evaluation.examTitle}</h3>
                        <p className="text-sm text-gray-600">{evaluation.className}</p>
                      </div>
                      <Badge className={`${getPriorityColor(evaluation.priority)} border`}>
                        {evaluation.priority.toUpperCase()}
                      </Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4 text-sm">
                        <span className="text-gray-600">
                          <strong>{evaluation.submissions}</strong> submissions
                        </span>
                        <span className="text-gray-600">
                          Due: <strong>{evaluation.dueDate}</strong>
                        </span>
                      </div>
                      <Button size="sm" className="bg-orange-600 hover:bg-orange-700">
                        Review Exams
                      </Button>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Right Column */}
          <div className="space-y-8">
            {/* Quick Actions */}
            <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Star className="w-5 h-5 text-purple-600" />
                  Quick Actions
                </CardTitle>
                <CardDescription>Common teaching tasks</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button 
                  className="w-full justify-start gap-3 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
                  onClick={() => navigate('/virtual-classes')}
                >
                  <Video className="w-5 h-5" />
                  Create Class
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full justify-start gap-3"
                  onClick={() => navigate('/create-exam')}
                >
                  <Plus className="w-5 h-5" />
                  Assign Exam
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full justify-start gap-3"
                  onClick={() => navigate('/students')}
                >
                  <MessageSquare className="w-5 h-5" />
                  Message Students
                </Button>
              </CardContent>
            </Card>

            {/* Recent Student Submissions */}
            <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="w-5 h-5 text-green-600" />
                  Recent Submissions
                </CardTitle>
                <CardDescription>Latest student work</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {recentSubmissions.map((submission) => (
                  <div key={submission.id} className="flex items-center gap-3 p-3 border border-gray-200 rounded-lg hover:shadow-sm transition-shadow">
                    <div className="w-8 h-8 bg-gradient-to-r from-purple-100 to-blue-100 rounded-full flex items-center justify-center">
                      <User className="w-4 h-4 text-purple-600" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900 truncate">
                        {submission.studentName}
                      </p>
                      <p className="text-xs text-gray-600 truncate">
                        {submission.examTitle}
                      </p>
                      <p className="text-xs text-gray-500">{submission.submittedAt}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      {submission.score && (
                        <Badge variant="secondary" className="text-xs">
                          {submission.score}%
                        </Badge>
                      )}
                      <Badge className={`${getSubmissionStatusColor(submission.status)} border text-xs`}>
                        {submission.status}
                      </Badge>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Assigned Classes Overview */}
            <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="w-5 h-5 text-blue-600" />
                  Class Overview
                </CardTitle>
                <CardDescription>Your assigned classes</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {assignedClasses.map((cls) => (
                  <div key={cls.id} className="p-3 border border-gray-200 rounded-lg hover:shadow-sm transition-shadow">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        {getSubjectIcon(cls.subject)}
                        <div>
                          <h4 className="text-sm font-semibold text-gray-900">{cls.name}</h4>
                          <p className="text-xs text-gray-600">{cls.subject}</p>
                        </div>
                      </div>
                      <ChevronRight className="w-4 h-4 text-gray-400" />
                    </div>
                    <div className="grid grid-cols-2 gap-2 text-xs">
                      <div>
                        <span className="text-gray-600">Students: </span>
                        <span className="font-medium">{cls.activeStudents}/{cls.totalStudents}</span>
                      </div>
                      <div>
                        <span className="text-gray-600">Attendance: </span>
                        <span className="font-medium">{cls.averageAttendance}%</span>
                      </div>
                    </div>
                    <div className="mt-2">
                      <Progress value={cls.averageAttendance} className="h-1" />
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-8">
          {/* Attendance Trends */}
          <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="w-5 h-5 text-blue-600" />
                Attendance Trends
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">This Week</span>
                  <span className="text-sm font-medium">89%</span>
                </div>
                <Progress value={89} className="h-2" />
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Last Week</span>
                  <span className="text-sm font-medium">92%</span>
                </div>
                <Progress value={92} className="h-2" />
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Month Average</span>
                  <span className="text-sm font-medium">87%</span>
                </div>
                <Progress value={87} className="h-2" />
              </div>
            </CardContent>
          </Card>

          {/* Exam Submission Rates */}
          <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <PieChart className="w-5 h-5 text-green-600" />
                Submission Rates
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">On Time</span>
                  <span className="text-sm font-medium text-green-600">78%</span>
                </div>
                <Progress value={78} className="h-2" />
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Late</span>
                  <span className="text-sm font-medium text-orange-600">15%</span>
                </div>
                <Progress value={15} className="h-2" />
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Missing</span>
                  <span className="text-sm font-medium text-red-600">7%</span>
                </div>
                <Progress value={7} className="h-2" />
              </div>
            </CardContent>
          </Card>

          {/* Class Engagement */}
          <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Activity className="w-5 h-5 text-purple-600" />
                Class Engagement
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">High Engagement</span>
                  <span className="text-sm font-medium text-green-600">65%</span>
                </div>
                <Progress value={65} className="h-2" />
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Medium</span>
                  <span className="text-sm font-medium text-yellow-600">25%</span>
                </div>
                <Progress value={25} className="h-2" />
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Low</span>
                  <span className="text-sm font-medium text-red-600">10%</span>
                </div>
                <Progress value={10} className="h-2" />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}