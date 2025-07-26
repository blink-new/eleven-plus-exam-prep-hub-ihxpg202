import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from '../../components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card'
import { Badge } from '../../components/ui/badge'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../components/ui/select'
import { 
  ArrowLeft,
  BarChart3,
  TrendingUp,
  Users,
  BookOpen,
  Download,
  Filter,
  Calendar,
  Target,
  AlertTriangle,
  CheckCircle,
  Clock,
  Award
} from 'lucide-react'

export default function AnalyticsPage() {
  const navigate = useNavigate()
  const [selectedPeriod, setSelectedPeriod] = useState('last-30-days')
  const [selectedSubject, setSelectedSubject] = useState('all')

  // Mock analytics data
  const performanceData = {
    totalStudents: 1247,
    activeStudents: 892,
    completedExams: 3456,
    averageScore: 78.5,
    improvementRate: 12.3
  }

  const subjectPerformance = [
    { subject: 'Mathematics', avgScore: 82.1, attempts: 1234, improvement: 15.2 },
    { subject: 'English', avgScore: 79.3, attempts: 1098, improvement: 8.7 },
    { subject: 'Verbal Reasoning', avgScore: 75.8, attempts: 876, improvement: 11.4 },
    { subject: 'Non-Verbal Reasoning', avgScore: 73.2, attempts: 654, improvement: 9.8 }
  ]

  const weakAreas = [
    { topic: 'Algebra', subject: 'Mathematics', avgScore: 65.2, attempts: 234, priority: 'High' },
    { topic: 'Reading Comprehension', subject: 'English', avgScore: 68.7, attempts: 198, priority: 'High' },
    { topic: 'Analogies', subject: 'Verbal Reasoning', avgScore: 71.3, attempts: 156, priority: 'Medium' },
    { topic: 'Pattern Recognition', subject: 'Non-Verbal Reasoning', avgScore: 69.8, attempts: 143, priority: 'Medium' },
    { topic: 'Grammar', subject: 'English', avgScore: 74.1, attempts: 187, priority: 'Low' }
  ]

  const monthlyTrends = [
    { month: 'Jan', students: 156, exams: 234, avgScore: 76.2 },
    { month: 'Feb', students: 189, exams: 298, avgScore: 77.1 },
    { month: 'Mar', students: 234, exams: 367, avgScore: 78.3 },
    { month: 'Apr', students: 267, exams: 423, avgScore: 79.2 },
    { month: 'May', students: 298, exams: 489, avgScore: 78.9 },
    { month: 'Jun', students: 321, exams: 534, avgScore: 80.1 }
  ]

  const exportData = (format: string) => {
    // Simulate export functionality
    console.log(`Exporting analytics data in ${format} format...`)
    // In a real app, this would generate and download the file
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* Header */}
      <header className="bg-white/70 backdrop-blur-sm shadow-lg border-b border-white/20 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            <div className="flex items-center gap-4">
              <button 
                onClick={() => navigate('/admin/overview')}
                className="flex items-center gap-2 text-gray-600 hover:text-purple-600 px-3 py-2 rounded-xl hover:bg-white/50 transition-all duration-200"
              >
                <ArrowLeft className="w-5 h-5" />
                <span className="font-medium">Back to Admin</span>
              </button>
            </div>
            
            <div className="flex items-center gap-4">
              <div className="p-3 bg-gradient-to-br from-purple-600 to-blue-600 rounded-2xl shadow-lg">
                <BarChart3 className="w-8 h-8 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                  Analytics Dashboard
                </h1>
                <p className="text-sm text-gray-600 font-medium">Performance insights and trends</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Button
                onClick={() => exportData('pdf')}
                variant="outline"
                size="sm"
                className="gap-2 rounded-xl border-gray-200 bg-white/80 backdrop-blur-sm hover:bg-white hover:shadow-md transition-all duration-200"
              >
                <Download className="w-4 h-4" />
                Export PDF
              </Button>
              <Button
                onClick={() => exportData('excel')}
                variant="outline"
                size="sm"
                className="gap-2 rounded-xl border-gray-200 bg-white/80 backdrop-blur-sm hover:bg-white hover:shadow-md transition-all duration-200"
              >
                <Download className="w-4 h-4" />
                Export Excel
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* Filters */}
        <Card className="bg-white/70 backdrop-blur-sm border border-white/20 shadow-lg rounded-2xl">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <Filter className="w-5 h-5 text-purple-600" />
                <span className="text-sm font-semibold text-gray-700 uppercase tracking-wider">Filters:</span>
              </div>
              
              <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
                <SelectTrigger className="w-48 rounded-xl border-gray-200 bg-white/80 backdrop-blur-sm shadow-sm">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="last-7-days">Last 7 days</SelectItem>
                  <SelectItem value="last-30-days">Last 30 days</SelectItem>
                  <SelectItem value="last-90-days">Last 90 days</SelectItem>
                  <SelectItem value="last-year">Last year</SelectItem>
                </SelectContent>
              </Select>

              <Select value={selectedSubject} onValueChange={setSelectedSubject}>
                <SelectTrigger className="w-48 rounded-xl border-gray-200 bg-white/80 backdrop-blur-sm shadow-sm">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Subjects</SelectItem>
                  <SelectItem value="mathematics">Mathematics</SelectItem>
                  <SelectItem value="english">English</SelectItem>
                  <SelectItem value="verbal-reasoning">Verbal Reasoning</SelectItem>
                  <SelectItem value="non-verbal-reasoning">Non-Verbal Reasoning</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
          <Card className="bg-white/70 backdrop-blur-sm border border-white/20 shadow-lg rounded-2xl">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-semibold text-gray-600 uppercase tracking-wider">Total Students</p>
                  <p className="text-3xl font-bold text-gray-900 mt-2">{performanceData.totalStudents.toLocaleString()}</p>
                </div>
                <div className="p-3 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl shadow-lg">
                  <Users className="w-6 h-6 text-white" />
                </div>
              </div>
              <div className="flex items-center mt-3">
                <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
                <span className="text-sm text-green-600 font-medium">+8.2% from last month</span>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/70 backdrop-blur-sm border border-white/20 shadow-lg rounded-2xl">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-semibold text-gray-600 uppercase tracking-wider">Active Students</p>
                  <p className="text-3xl font-bold text-gray-900 mt-2">{performanceData.activeStudents.toLocaleString()}</p>
                </div>
                <div className="p-3 bg-gradient-to-br from-green-500 to-green-600 rounded-xl shadow-lg">
                  <CheckCircle className="w-6 h-6 text-white" />
                </div>
              </div>
              <div className="flex items-center mt-3">
                <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
                <span className="text-sm text-green-600 font-medium">+12.5% from last month</span>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/70 backdrop-blur-sm border border-white/20 shadow-lg rounded-2xl">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-semibold text-gray-600 uppercase tracking-wider">Completed Exams</p>
                  <p className="text-3xl font-bold text-gray-900 mt-2">{performanceData.completedExams.toLocaleString()}</p>
                </div>
                <div className="p-3 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl shadow-lg">
                  <BookOpen className="w-6 h-6 text-white" />
                </div>
              </div>
              <div className="flex items-center mt-3">
                <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
                <span className="text-sm text-green-600 font-medium">+15.3% from last month</span>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/70 backdrop-blur-sm border border-white/20 shadow-lg rounded-2xl">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-semibold text-gray-600 uppercase tracking-wider">Average Score</p>
                  <p className="text-3xl font-bold text-gray-900 mt-2">{performanceData.averageScore}%</p>
                </div>
                <div className="p-3 bg-gradient-to-br from-yellow-500 to-yellow-600 rounded-xl shadow-lg">
                  <Target className="w-6 h-6 text-white" />
                </div>
              </div>
              <div className="flex items-center mt-3">
                <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
                <span className="text-sm text-green-600 font-medium">+3.2% from last month</span>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/70 backdrop-blur-sm border border-white/20 shadow-lg rounded-2xl">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-semibold text-gray-600 uppercase tracking-wider">Improvement Rate</p>
                  <p className="text-3xl font-bold text-gray-900 mt-2">{performanceData.improvementRate}%</p>
                </div>
                <div className="p-3 bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl shadow-lg">
                  <Award className="w-6 h-6 text-white" />
                </div>
              </div>
              <div className="flex items-center mt-3">
                <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
                <span className="text-sm text-green-600 font-medium">+2.1% from last month</span>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Subject Performance Chart */}
          <Card className="bg-white/70 backdrop-blur-sm border border-white/20 shadow-lg rounded-2xl">
            <CardHeader className="bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-t-2xl">
              <CardTitle className="flex items-center gap-2 text-white">
                <BarChart3 className="w-5 h-5" />
                Subject Performance
              </CardTitle>
              <CardDescription className="text-purple-100">
                Average scores and improvement trends by subject
              </CardDescription>
            </CardHeader>
            <CardContent className="p-6">
              <div className="space-y-6">
                {subjectPerformance.map((subject, index) => (
                  <div key={index} className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-semibold text-gray-700">{subject.subject}</span>
                      <div className="flex items-center gap-3">
                        <span className="text-sm font-medium text-gray-600">{subject.avgScore}%</span>
                        <Badge variant={subject.improvement > 10 ? 'default' : 'secondary'} className="text-xs font-medium">
                          +{subject.improvement}%
                        </Badge>
                      </div>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-3 shadow-inner">
                      <div 
                        className="bg-gradient-to-r from-purple-600 to-blue-600 h-3 rounded-full transition-all duration-500 shadow-sm"
                        style={{ width: `${subject.avgScore}%` }}
                      ></div>
                    </div>
                    <div className="flex items-center justify-between text-xs text-gray-500">
                      <span className="font-medium">{subject.attempts} attempts</span>
                      <span className="font-medium">Target: 85%</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Monthly Trends */}
          <Card className="bg-white/70 backdrop-blur-sm border border-white/20 shadow-lg rounded-2xl">
            <CardHeader className="bg-gradient-to-r from-green-600 to-teal-600 text-white rounded-t-2xl">
              <CardTitle className="flex items-center gap-2 text-white">
                <TrendingUp className="w-5 h-5" />
                Monthly Trends
              </CardTitle>
              <CardDescription className="text-green-100">
                Student activity and performance over time
              </CardDescription>
            </CardHeader>
            <CardContent className="p-6">
              <div className="space-y-4">
                {monthlyTrends.map((month, index) => (
                  <div key={index} className="flex items-center justify-between p-4 bg-gray-50/80 backdrop-blur-sm rounded-xl border border-gray-100 hover:bg-white/80 transition-colors duration-200">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-gradient-to-br from-green-500 to-teal-500 rounded-lg shadow-lg">
                        <Calendar className="w-4 h-4 text-white" />
                      </div>
                      <div>
                        <p className="font-semibold text-gray-900">{month.month}</p>
                        <p className="text-sm text-gray-600 font-medium">{month.students} students</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-gray-900">{month.exams} exams</p>
                      <p className="text-sm text-gray-600 font-medium">{month.avgScore}% avg</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Weak Areas Analysis */}
        <Card className="bg-white/70 backdrop-blur-sm border border-white/20 shadow-lg rounded-2xl">
          <CardHeader className="bg-gradient-to-r from-orange-600 to-red-600 text-white rounded-t-2xl">
            <CardTitle className="flex items-center gap-2 text-white">
              <AlertTriangle className="w-5 h-5" />
              Weak Areas Analysis
            </CardTitle>
            <CardDescription className="text-orange-100">
              Topics requiring additional attention and improvement
            </CardDescription>
          </CardHeader>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200 bg-gray-50/50">
                    <th className="text-left py-4 px-6 font-semibold text-gray-900 uppercase tracking-wider text-sm">Topic</th>
                    <th className="text-left py-4 px-6 font-semibold text-gray-900 uppercase tracking-wider text-sm">Subject</th>
                    <th className="text-left py-4 px-6 font-semibold text-gray-900 uppercase tracking-wider text-sm">Avg Score</th>
                    <th className="text-left py-4 px-6 font-semibold text-gray-900 uppercase tracking-wider text-sm">Attempts</th>
                    <th className="text-left py-4 px-6 font-semibold text-gray-900 uppercase tracking-wider text-sm">Priority</th>
                    <th className="text-left py-4 px-6 font-semibold text-gray-900 uppercase tracking-wider text-sm">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {weakAreas.map((area, index) => (
                    <tr key={index} className={`border-b border-gray-100 hover:bg-orange-50/30 transition-colors duration-200 ${index % 2 === 0 ? 'bg-white/50' : 'bg-gray-50/30'}`}>
                      <td className="py-4 px-6">
                        <div className="font-semibold text-gray-900">{area.topic}</div>
                      </td>
                      <td className="py-4 px-6">
                        <Badge variant="outline" className="border-2 font-medium">{area.subject}</Badge>
                      </td>
                      <td className="py-4 px-6">
                        <div className="flex items-center gap-3">
                          <span className="font-semibold text-gray-900">{area.avgScore}%</span>
                          <div className="w-20 bg-gray-200 rounded-full h-2 shadow-inner">
                            <div 
                              className="bg-gradient-to-r from-red-500 to-orange-500 h-2 rounded-full transition-all duration-300"
                              style={{ width: `${area.avgScore}%` }}
                            ></div>
                          </div>
                        </div>
                      </td>
                      <td className="py-4 px-6 text-gray-600 font-medium">{area.attempts}</td>
                      <td className="py-4 px-6">
                        <Badge 
                          variant={area.priority === 'High' ? 'destructive' : area.priority === 'Medium' ? 'default' : 'secondary'}
                          className="font-medium"
                        >
                          {area.priority}
                        </Badge>
                      </td>
                      <td className="py-4 px-6">
                        <div className="flex items-center gap-2">
                          <Button size="sm" variant="outline" className="rounded-lg border-gray-200 hover:bg-gray-50 transition-colors duration-200">
                            Create Practice
                          </Button>
                          <Button size="sm" variant="outline" className="rounded-lg border-gray-200 hover:bg-gray-50 transition-colors duration-200">
                            View Details
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}