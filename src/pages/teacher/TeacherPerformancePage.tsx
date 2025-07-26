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
  ArrowLeft,
  ArrowUp,
  ArrowDown,
  Minus,
  Users,
  GraduationCap,
  MessageSquare,
  FileText,
  Filter,
  Eye
} from 'lucide-react'

interface TeachingMetrics {
  classesCreated: number
  classesConducted: number
  totalStudents: number
  activeStudents: number
  averageAttendance: number
  examAssignments: number
  averageGradingTime: string
  studentFeedbackScore: number
}

interface ClassPerformance {
  id: string
  className: string
  subject: string
  totalStudents: number
  averageAttendance: number
  averageScore: number
  completionRate: number
  engagementLevel: 'high' | 'medium' | 'low'
  lastActivity: string
  improvement: number
}

interface SubjectMetrics {
  subject: string
  icon: React.ReactNode
  color: string
  classesCount: number
  studentsCount: number
  averageScore: number
  attendanceRate: number
  submissionRate: number
  improvement: number
}

const teachingMetrics: TeachingMetrics = {
  classesCreated: 8,
  classesConducted: 156,
  totalStudents: 89,
  activeStudents: 82,
  averageAttendance: 87,
  examAssignments: 45,
  averageGradingTime: '2.3 hours',
  studentFeedbackScore: 4.7
}

const classPerformance: ClassPerformance[] = [
  {
    id: '1',
    className: 'Advanced Mathematics',
    subject: 'Mathematics',
    totalStudents: 24,
    averageAttendance: 92,
    averageScore: 84,
    completionRate: 89,
    engagementLevel: 'high',
    lastActivity: '2 hours ago',
    improvement: 8
  },
  {
    id: '2',
    className: 'English Comprehension',
    subject: 'English',
    totalStudents: 18,
    averageAttendance: 89,
    averageScore: 78,
    completionRate: 85,
    engagementLevel: 'high',
    lastActivity: '1 day ago',
    improvement: 5
  },
  {
    id: '3',
    className: 'Verbal Reasoning Workshop',
    subject: 'Verbal Reasoning',
    totalStudents: 15,
    averageAttendance: 87,
    averageScore: 72,
    completionRate: 78,
    engagementLevel: 'medium',
    lastActivity: '3 hours ago',
    improvement: -2
  },
  {
    id: '4',
    className: 'Non-Verbal Patterns',
    subject: 'Non-Verbal Reasoning',
    totalStudents: 12,
    averageAttendance: 83,
    averageScore: 68,
    completionRate: 75,
    engagementLevel: 'medium',
    lastActivity: '1 day ago',
    improvement: 12
  }
]

const subjectMetrics: SubjectMetrics[] = [
  {
    subject: 'Mathematics',
    icon: <Calculator className="w-6 h-6" />,
    color: 'bg-blue-500',
    classesCount: 3,
    studentsCount: 42,
    averageScore: 84,
    attendanceRate: 92,
    submissionRate: 89,
    improvement: 8
  },
  {
    subject: 'English',
    icon: <BookOpen className="w-6 h-6" />,
    color: 'bg-green-500',
    classesCount: 2,
    studentsCount: 28,
    averageScore: 78,
    attendanceRate: 89,
    submissionRate: 85,
    improvement: 5
  },
  {
    subject: 'Verbal Reasoning',
    icon: <Brain className="w-6 h-6" />,
    color: 'bg-purple-500',
    classesCount: 2,
    studentsCount: 25,
    averageScore: 72,
    attendanceRate: 87,
    submissionRate: 78,
    improvement: -2
  },
  {
    subject: 'Non-Verbal Reasoning',
    icon: <Puzzle className="w-6 h-6" />,
    color: 'bg-orange-500',
    classesCount: 1,
    studentsCount: 12,
    averageScore: 68,
    attendanceRate: 83,
    submissionRate: 75,
    improvement: 12
  }
]

export default function TeacherPerformancePage() {
  const navigate = useNavigate()
  const [timeFilter, setTimeFilter] = useState('This Month')
  const [subjectFilter, setSubjectFilter] = useState('All Subjects')

  const getEngagementColor = (level: string) => {
    switch (level) {
      case 'high': return 'bg-green-100 text-green-800 border-green-200'
      case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200'
      case 'low': return 'bg-red-100 text-red-800 border-red-200'
      default: return 'bg-gray-100 text-gray-800 border-gray-200'
    }
  }

  const getImprovementIcon = (improvement: number) => {
    if (improvement > 0) return <ArrowUp className="w-4 h-4 text-green-500" />
    if (improvement < 0) return <ArrowDown className="w-4 h-4 text-red-500" />
    return <Minus className="w-4 h-4 text-gray-500" />
  }

  const getImprovementColor = (improvement: number) => {
    if (improvement > 0) return 'text-green-600'
    if (improvement < 0) return 'text-red-600'
    return 'text-gray-600'
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
                <p className="text-xs text-gray-600">Teacher Performance</p>
              </div>
            </Link>

            {/* Search */}
            <div className="hidden md:flex items-center flex-1 max-w-md mx-8">
              <div className="relative w-full">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="text"
                  placeholder="Search performance data..."
                  className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-xl focus:border-purple-500 focus:ring-1 focus:ring-purple-500 bg-white/80 backdrop-blur-sm"
                />
              </div>
            </div>

            {/* User Menu */}
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="sm">
                <Bell className="w-5 h-5" />
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
        {/* Header Section */}
        <div className="mb-8">
          <div className="flex items-center gap-4 mb-4">
            <Button 
              variant="ghost" 
              size="sm"
              onClick={() => navigate('/dashboard')}
              className="gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Dashboard
            </Button>
          </div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent mb-2">
            Teaching Performance 📊
          </h1>
          <p className="text-gray-600">
            Track your teaching effectiveness, student engagement, and class performance metrics
          </p>
          
          {/* Filters */}
          <div className="flex items-center gap-4 mt-4">
            <div className="flex items-center gap-2">
              <Filter className="w-4 h-4 text-gray-500" />
              <span className="text-sm text-gray-600">Filters:</span>
            </div>
            <select 
              value={timeFilter}
              onChange={(e) => setTimeFilter(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:border-purple-500 focus:ring-1 focus:ring-purple-500 bg-white/80 backdrop-blur-sm"
            >
              <option value="Today">Today</option>
              <option value="This Week">This Week</option>
              <option value="This Month">This Month</option>
              <option value="This Term">This Term</option>
            </select>
            <select 
              value={subjectFilter}
              onChange={(e) => setSubjectFilter(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:border-purple-500 focus:ring-1 focus:ring-purple-500 bg-white/80 backdrop-blur-sm"
            >
              <option value="All Subjects">All Subjects</option>
              <option value="Mathematics">Mathematics</option>
              <option value="English">English</option>
              <option value="Verbal Reasoning">Verbal Reasoning</option>
              <option value="Non-Verbal Reasoning">Non-Verbal Reasoning</option>
            </select>
          </div>
        </div>

        {/* Teaching Effectiveness KPIs */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl flex items-center justify-center shadow-lg">
                  <GraduationCap className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Classes Conducted</p>
                  <p className="text-2xl font-bold text-gray-900">{teachingMetrics.classesConducted}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-green-600 rounded-xl flex items-center justify-center shadow-lg">
                  <Users className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Student Attendance</p>
                  <p className="text-2xl font-bold text-gray-900">{teachingMetrics.averageAttendance}%</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
                  <BarChart3 className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Average Class Score</p>
                  <p className="text-2xl font-bold text-gray-900">78%</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 bg-gradient-to-r from-orange-500 to-orange-600 rounded-xl flex items-center justify-center shadow-lg">
                  <Clock className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Avg. Grading Time</p>
                  <p className="text-2xl font-bold text-gray-900">{teachingMetrics.averageGradingTime}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Additional Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
            <CardContent className="p-6 text-center">
              <div className="w-12 h-12 bg-gradient-to-r from-yellow-500 to-yellow-600 rounded-xl flex items-center justify-center mx-auto mb-3 shadow-lg">
                <Star className="w-6 h-6 text-white" />
              </div>
              <div className="text-2xl font-bold text-gray-900 mb-1">
                {teachingMetrics.studentFeedbackScore}/5.0
              </div>
              <p className="text-sm text-gray-600">Student Feedback</p>
            </CardContent>
          </Card>

          <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
            <CardContent className="p-6 text-center">
              <div className="w-12 h-12 bg-gradient-to-r from-indigo-500 to-indigo-600 rounded-xl flex items-center justify-center mx-auto mb-3 shadow-lg">
                <FileText className="w-6 h-6 text-white" />
              </div>
              <div className="text-2xl font-bold text-gray-900 mb-1">
                {teachingMetrics.examAssignments}
              </div>
              <p className="text-sm text-gray-600">Exams Assigned</p>
            </CardContent>
          </Card>

          <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
            <CardContent className="p-6 text-center">
              <div className="w-12 h-12 bg-gradient-to-r from-teal-500 to-teal-600 rounded-xl flex items-center justify-center mx-auto mb-3 shadow-lg">
                <CheckCircle className="w-6 h-6 text-white" />
              </div>
              <div className="text-2xl font-bold text-gray-900 mb-1">
                85%
              </div>
              <p className="text-sm text-gray-600">Assignment Submission</p>
            </CardContent>
          </Card>

          <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
            <CardContent className="p-6 text-center">
              <div className="w-12 h-12 bg-gradient-to-r from-pink-500 to-pink-600 rounded-xl flex items-center justify-center mx-auto mb-3 shadow-lg">
                <MessageSquare className="w-6 h-6 text-white" />
              </div>
              <div className="text-2xl font-bold text-gray-900 mb-1">
                4.2 hrs
              </div>
              <p className="text-sm text-gray-600">Avg. Response Time</p>
            </CardContent>
          </Card>
        </div>

        {/* Subject-wise Performance */}
        <Card className="mb-8 bg-white/80 backdrop-blur-sm border-0 shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="w-5 h-5 text-purple-600" />
              Subject-wise Teaching Performance
            </CardTitle>
            <CardDescription>
              Performance metrics across different subjects you teach
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {subjectMetrics.map((subject) => (
                <Card key={subject.subject} className="border border-gray-200 hover:shadow-md transition-shadow">
                  <CardHeader className="pb-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className={`w-12 h-12 ${subject.color} rounded-lg flex items-center justify-center text-white shadow-lg`}>
                          {subject.icon}
                        </div>
                        <div>
                          <CardTitle className="text-lg">{subject.subject}</CardTitle>
                          <CardDescription>{subject.classesCount} classes • {subject.studentsCount} students</CardDescription>
                        </div>
                      </div>
                      <div className="flex items-center gap-1">
                        {getImprovementIcon(subject.improvement)}
                        <span className={`text-sm font-medium ${getImprovementColor(subject.improvement)}`}>
                          {Math.abs(subject.improvement)}%
                        </span>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {/* Key Metrics */}
                    <div className="grid grid-cols-2 gap-4">
                      <div className="text-center p-3 bg-gray-50 rounded-lg">
                        <p className="text-2xl font-bold text-gray-900">{subject.averageScore}%</p>
                        <p className="text-xs text-gray-600">Average Score</p>
                      </div>
                      <div className="text-center p-3 bg-gray-50 rounded-lg">
                        <p className="text-2xl font-bold text-gray-900">{subject.attendanceRate}%</p>
                        <p className="text-xs text-gray-600">Attendance</p>
                      </div>
                    </div>

                    {/* Progress Bars */}
                    <div className="space-y-3">
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span className="text-gray-600">Submission Rate</span>
                          <span className="font-medium">{subject.submissionRate}%</span>
                        </div>
                        <Progress value={subject.submissionRate} className="h-2" />
                      </div>
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span className="text-gray-600">Class Engagement</span>
                          <span className="font-medium">{subject.attendanceRate}%</span>
                        </div>
                        <Progress value={subject.attendanceRate} className="h-2" />
                      </div>
                    </div>

                    {/* Action Button */}
                    <Button 
                      variant="outline" 
                      className="w-full"
                      onClick={() => navigate(`/performance/subject/${subject.subject.toLowerCase().replace(' ', '-')}`)}
                    >
                      <Eye className="w-4 h-4 mr-2" />
                      View Detailed Analysis
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Individual Class Performance */}
        <Card className="mb-8 bg-white/80 backdrop-blur-sm border-0 shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="w-5 h-5 text-blue-600" />
              Individual Class Performance
            </CardTitle>
            <CardDescription>
              Detailed performance metrics for each of your classes
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {classPerformance.map((cls) => (
                <Card key={cls.id} className="border border-gray-200 hover:shadow-md transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-gradient-to-r from-purple-100 to-blue-100 rounded-lg flex items-center justify-center">
                          {cls.subject === 'Mathematics' && <Calculator className="w-5 h-5 text-blue-600" />}
                          {cls.subject === 'English' && <BookOpen className="w-5 h-5 text-green-600" />}
                          {cls.subject === 'Verbal Reasoning' && <Brain className="w-5 h-5 text-purple-600" />}
                          {cls.subject === 'Non-Verbal Reasoning' && <Puzzle className="w-5 h-5 text-orange-600" />}
                        </div>
                        <div>
                          <h3 className="font-semibold text-gray-900">{cls.className}</h3>
                          <p className="text-sm text-gray-600">{cls.subject} • {cls.totalStudents} students</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge className={`${getEngagementColor(cls.engagementLevel)} border`}>
                          {cls.engagementLevel.toUpperCase()} ENGAGEMENT
                        </Badge>
                        <div className="flex items-center gap-1">
                          {getImprovementIcon(cls.improvement)}
                          <span className={`text-sm font-medium ${getImprovementColor(cls.improvement)}`}>
                            {Math.abs(cls.improvement)}%
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                      <div className="text-center p-3 bg-gray-50 rounded-lg">
                        <p className="text-xl font-bold text-gray-900">{cls.averageAttendance}%</p>
                        <p className="text-xs text-gray-600">Attendance</p>
                      </div>
                      <div className="text-center p-3 bg-gray-50 rounded-lg">
                        <p className="text-xl font-bold text-gray-900">{cls.averageScore}%</p>
                        <p className="text-xs text-gray-600">Avg Score</p>
                      </div>
                      <div className="text-center p-3 bg-gray-50 rounded-lg">
                        <p className="text-xl font-bold text-gray-900">{cls.completionRate}%</p>
                        <p className="text-xs text-gray-600">Completion</p>
                      </div>
                      <div className="text-center p-3 bg-gray-50 rounded-lg">
                        <p className="text-xl font-bold text-gray-900">{cls.totalStudents}</p>
                        <p className="text-xs text-gray-600">Students</p>
                      </div>
                    </div>

                    <div className="space-y-2 mb-4">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Overall Performance</span>
                        <span className="font-medium">{cls.averageScore}%</span>
                      </div>
                      <Progress value={cls.averageScore} className="h-2" />
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="text-sm text-gray-600">
                        Last activity: {cls.lastActivity}
                      </div>
                      <Button 
                        size="sm"
                        onClick={() => navigate(`/virtual-classes/${cls.id}`)}
                      >
                        <Eye className="w-4 h-4 mr-2" />
                        View Class Details
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Teaching Insights */}
        <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="w-5 h-5 text-purple-600" />
              Teaching Insights & Recommendations
            </CardTitle>
            <CardDescription>Personalized suggestions to improve your teaching effectiveness</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center p-4 bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl">
                <Star className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                <h3 className="font-semibold text-gray-900 mb-1">Top Performing Subject</h3>
                <p className="text-sm text-gray-600">Mathematics (84% avg score)</p>
                <p className="text-xs text-blue-600 mt-1">Excellent student engagement!</p>
              </div>
              <div className="text-center p-4 bg-gradient-to-br from-orange-50 to-orange-100 rounded-xl">
                <TrendingUp className="w-8 h-8 text-orange-600 mx-auto mb-2" />
                <h3 className="font-semibold text-gray-900 mb-1">Most Improved Class</h3>
                <p className="text-sm text-gray-600">Non-Verbal Patterns (+12%)</p>
                <p className="text-xs text-orange-600 mt-1">Great teaching progress!</p>
              </div>
              <div className="text-center p-4 bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl">
                <Target className="w-8 h-8 text-purple-600 mx-auto mb-2" />
                <h3 className="font-semibold text-gray-900 mb-1">Focus Area</h3>
                <p className="text-sm text-gray-600">Verbal Reasoning</p>
                <p className="text-xs text-purple-600 mt-1">Consider interactive activities</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}