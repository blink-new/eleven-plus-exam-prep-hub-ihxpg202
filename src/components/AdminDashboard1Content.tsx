import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card'
import { Button } from './ui/button'
import { Badge } from './ui/badge'
import { Progress } from './ui/progress'
import { 
  Users, 
  BookOpen, 
  Upload, 
  TrendingUp, 
  AlertTriangle,
  Calendar,
  MessageSquare,
  BarChart3,
  PieChart,
  Activity,
  Clock,
  CheckCircle,
  XCircle,
  Filter,
  Download
} from 'lucide-react'

export default function AdminDashboard1Content() {
  const [dateRange, setDateRange] = useState('30d')
  const [userRole, setUserRole] = useState('all')
  const [planType, setPlanType] = useState('all')

  // Mock data for KPIs
  const kpiData = {
    totalUsers: {
      total: 2847,
      byRole: {
        normal: 2156,
        teacher: 691,
        student: 1834
      },
      growth: '+12%'
    },
    exams: {
      created: 1234,
      completed: 8567,
      growth: '+8%'
    },
    omrUploads: 3456,
    aiUsage: {
      tokens: 125000,
      messages: 8567,
      growth: '+15%'
    },
    subscriptions: {
      active: 2847,
      freeTrial: 1234,
      monthly: 987,
      yearly: 626,
      expiringIn7Days: 47
    },
    dailyStats: {
      questionsCreated: 15234,
      aiMessages: 8567
    },
    loginFailures: 23,
    pendingVerifications: 156
  }

  const popularSubjects = [
    { name: 'Mathematics', usage: 85, color: 'bg-blue-500' },
    { name: 'English', usage: 78, color: 'bg-green-500' },
    { name: 'Verbal Reasoning', usage: 72, color: 'bg-purple-500' },
    { name: 'Non-Verbal Reasoning', usage: 65, color: 'bg-orange-500' }
  ]

  const usageTrends = [
    { day: 'Mon', questions: 2100, ai: 1200, users: 450 },
    { day: 'Tue', questions: 2300, ai: 1400, users: 520 },
    { day: 'Wed', questions: 2800, ai: 1600, users: 680 },
    { day: 'Thu', questions: 2600, ai: 1500, users: 590 },
    { day: 'Fri', questions: 3200, ai: 1800, users: 720 },
    { day: 'Sat', questions: 2900, ai: 1700, users: 650 },
    { day: 'Sun', questions: 2400, ai: 1300, users: 480 }
  ]

  const notifications = [
    {
      id: 1,
      type: 'warning',
      title: 'Trial Ending Soon',
      message: '47 users have trials expiring in next 7 days',
      action: 'View Users',
      time: '2 hours ago'
    },
    {
      id: 2,
      type: 'info',
      title: 'High AI Usage',
      message: '15% increase in AI messages this week',
      action: 'View Analytics',
      time: '4 hours ago'
    },
    {
      id: 3,
      type: 'error',
      title: 'Login Failures',
      message: '23 failed login attempts detected',
      action: 'Review Security',
      time: '6 hours ago'
    }
  ]

  const handleKPIClick = (kpiType: string) => {
    console.log(`Drilling down into ${kpiType} reports`)
    // Navigate to detailed reports
  }

  return (
    <div className="p-6 space-y-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
          <p className="text-gray-600 mt-1">Platform-wide insights and KPIs</p>
        </div>
        
        {/* Filters */}
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-gray-500" />
            <select 
              value={dateRange} 
              onChange={(e) => setDateRange(e.target.value)}
              className="border border-gray-300 rounded-lg px-3 py-2 text-sm"
            >
              <option value="7d">Last 7 days</option>
              <option value="30d">Last 30 days</option>
              <option value="90d">Last 90 days</option>
            </select>
          </div>
          
          <select 
            value={userRole} 
            onChange={(e) => setUserRole(e.target.value)}
            className="border border-gray-300 rounded-lg px-3 py-2 text-sm"
          >
            <option value="all">All Roles</option>
            <option value="normal">Normal Users</option>
            <option value="teacher">Teachers</option>
            <option value="student">Students</option>
          </select>
          
          <select 
            value={planType} 
            onChange={(e) => setPlanType(e.target.value)}
            className="border border-gray-300 rounded-lg px-3 py-2 text-sm"
          >
            <option value="all">All Plans</option>
            <option value="trial">Free Trial</option>
            <option value="monthly">Monthly</option>
            <option value="yearly">Yearly</option>
          </select>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Total Users */}
        <Card 
          className="cursor-pointer hover:shadow-lg transition-shadow"
          onClick={() => handleKPIClick('users')}
        >
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Users</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{kpiData.totalUsers.total.toLocaleString()}</div>
            <div className="space-y-1 mt-2">
              <div className="flex justify-between text-xs">
                <span>Normal: {kpiData.totalUsers.byRole.normal}</span>
                <span>Teachers: {kpiData.totalUsers.byRole.teacher}</span>
              </div>
              <div className="flex justify-between text-xs">
                <span>Students: {kpiData.totalUsers.byRole.student}</span>
                <Badge variant="secondary" className="text-green-600 bg-green-100">
                  {kpiData.totalUsers.growth}
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Active Subscriptions */}
        <Card 
          className="cursor-pointer hover:shadow-lg transition-shadow"
          onClick={() => handleKPIClick('subscriptions')}
        >
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Subscriptions</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{kpiData.subscriptions.active.toLocaleString()}</div>
            <div className="space-y-1 mt-2">
              <div className="flex justify-between text-xs">
                <span>Free Trial: {kpiData.subscriptions.freeTrial}</span>
                <span>Monthly: {kpiData.subscriptions.monthly}</span>
              </div>
              <div className="flex justify-between text-xs">
                <span>Yearly: {kpiData.subscriptions.yearly}</span>
                <Badge variant="destructive" className="text-xs">
                  {kpiData.subscriptions.expiringIn7Days} expiring
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Exams & OMR */}
        <Card 
          className="cursor-pointer hover:shadow-lg transition-shadow"
          onClick={() => handleKPIClick('exams')}
        >
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Exams & OMR</CardTitle>
            <BookOpen className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{kpiData.exams.created.toLocaleString()}</div>
            <div className="space-y-1 mt-2">
              <div className="flex justify-between text-xs">
                <span>Created: {kpiData.exams.created}</span>
                <span>Completed: {kpiData.exams.completed}</span>
              </div>
              <div className="flex justify-between text-xs">
                <span>OMR Uploads: {kpiData.omrUploads}</span>
                <Badge variant="secondary" className="text-green-600 bg-green-100">
                  {kpiData.exams.growth}
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* AI Usage */}
        <Card 
          className="cursor-pointer hover:shadow-lg transition-shadow"
          onClick={() => handleKPIClick('ai')}
        >
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">AI Usage</CardTitle>
            <MessageSquare className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{kpiData.aiUsage.messages.toLocaleString()}</div>
            <div className="space-y-1 mt-2">
              <div className="flex justify-between text-xs">
                <span>Messages: {kpiData.aiUsage.messages}</span>
                <span>Tokens: {kpiData.aiUsage.tokens.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-xs">
                <span>Daily Questions: {kpiData.dailyStats.questionsCreated}</span>
                <Badge variant="secondary" className="text-green-600 bg-green-100">
                  {kpiData.aiUsage.growth}
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts and Analytics */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Usage Trends Chart */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="w-5 h-5" />
              Usage Trends (Last 30 Days)
            </CardTitle>
            <CardDescription>Questions created, AI messages, and active users</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {usageTrends.map((day, index) => (
                <div key={day.day} className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="font-medium">{day.day}</span>
                    <span className="text-gray-600">
                      Q: {day.questions} | AI: {day.ai} | Users: {day.users}
                    </span>
                  </div>
                  <div className="flex gap-1">
                    <div className="flex-1 bg-blue-100 rounded-full h-2">
                      <div 
                        className="bg-blue-500 h-2 rounded-full" 
                        style={{ width: `${(day.questions / 3500) * 100}%` }}
                      />
                    </div>
                    <div className="flex-1 bg-green-100 rounded-full h-2">
                      <div 
                        className="bg-green-500 h-2 rounded-full" 
                        style={{ width: `${(day.ai / 2000) * 100}%` }}
                      />
                    </div>
                    <div className="flex-1 bg-purple-100 rounded-full h-2">
                      <div 
                        className="bg-purple-500 h-2 rounded-full" 
                        style={{ width: `${(day.users / 800) * 100}%` }}
                      />
                    </div>
                  </div>
                </div>
              ))}
              <div className="flex justify-center gap-6 text-xs mt-4">
                <div className="flex items-center gap-1">
                  <div className="w-3 h-3 bg-blue-500 rounded-full" />
                  <span>Questions</span>
                </div>
                <div className="flex items-center gap-1">
                  <div className="w-3 h-3 bg-green-500 rounded-full" />
                  <span>AI Messages</span>
                </div>
                <div className="flex items-center gap-1">
                  <div className="w-3 h-3 bg-purple-500 rounded-full" />
                  <span>Active Users</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Plan Distribution */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <PieChart className="w-5 h-5" />
              Plan Distribution
            </CardTitle>
            <CardDescription>Current subscription breakdown</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-blue-500 rounded-full" />
                    <span className="text-sm">Free Trial</span>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-medium">{kpiData.subscriptions.freeTrial}</div>
                    <div className="text-xs text-gray-500">43.4%</div>
                  </div>
                </div>
                <Progress value={43.4} className="h-2" />
              </div>
              
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-green-500 rounded-full" />
                    <span className="text-sm">Monthly</span>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-medium">{kpiData.subscriptions.monthly}</div>
                    <div className="text-xs text-gray-500">34.7%</div>
                  </div>
                </div>
                <Progress value={34.7} className="h-2" />
              </div>
              
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-purple-500 rounded-full" />
                    <span className="text-sm">Yearly</span>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-medium">{kpiData.subscriptions.yearly}</div>
                    <div className="text-xs text-gray-500">21.9%</div>
                  </div>
                </div>
                <Progress value={21.9} className="h-2" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Popular Subjects & Notifications */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Popular Subjects */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Activity className="w-5 h-5" />
              Popular Subjects/Topics
            </CardTitle>
            <CardDescription>Most accessed content areas</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {popularSubjects.map((subject) => (
                <div key={subject.name} className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="font-medium">{subject.name}</span>
                    <span className="text-gray-600">{subject.usage}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className={`${subject.color} h-2 rounded-full transition-all duration-300`}
                      style={{ width: `${subject.usage}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* System Notifications */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertTriangle className="w-5 h-5" />
              System Notifications
            </CardTitle>
            <CardDescription>Important alerts and updates</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {notifications.map((notification) => (
                <div key={notification.id} className="flex items-start gap-3 p-3 rounded-lg border">
                  <div className={`w-2 h-2 rounded-full mt-2 ${
                    notification.type === 'error' ? 'bg-red-500' :
                    notification.type === 'warning' ? 'bg-yellow-500' :
                    'bg-blue-500'
                  }`} />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <h4 className="text-sm font-medium text-gray-900">{notification.title}</h4>
                      <span className="text-xs text-gray-500">{notification.time}</span>
                    </div>
                    <p className="text-sm text-gray-600 mt-1">{notification.message}</p>
                    <Button variant="link" size="sm" className="p-0 h-auto text-purple-600 mt-2">
                      {notification.action}
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
          <CardDescription>Common administrative tasks</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Button variant="outline" className="h-auto p-4 flex flex-col gap-2">
              <Download className="w-5 h-5" />
              <span className="text-sm">Export Data</span>
            </Button>
            <Button variant="outline" className="h-auto p-4 flex flex-col gap-2">
              <Users className="w-5 h-5" />
              <span className="text-sm">Manage Users</span>
            </Button>
            <Button variant="outline" className="h-auto p-4 flex flex-col gap-2">
              <BarChart3 className="w-5 h-5" />
              <span className="text-sm">View Analytics</span>
            </Button>
            <Button variant="outline" className="h-auto p-4 flex flex-col gap-2">
              <AlertTriangle className="w-5 h-5" />
              <span className="text-sm">System Health</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}