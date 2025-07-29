import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card'
import { Button } from '../../components/ui/button'
import { Badge } from '../../components/ui/badge'
import { Progress } from '../../components/ui/progress'
import { 
  Users, 
  BookOpen, 
  FileText, 
  Upload, 
  AlertTriangle, 
  DollarSign,
  TrendingUp,
  Activity,
  Plus,
  Eye,
  BarChart3,
  Clock,
  CheckCircle,
  XCircle,
  AlertCircle,
  Calendar,
  User,
  School,
  Target,
  CreditCard,
  UserCheck,
  GraduationCap,
  MessageSquare,
  Zap,
  PieChart,
  Filter,
  Download
} from 'lucide-react'

interface KPICard {
  title: string
  value: string
  change: string
  changeType: 'positive' | 'negative' | 'neutral'
  icon: React.ReactNode
  color: string
}

interface ActivityItem {
  id: string
  type: 'user' | 'exam' | 'upload' | 'payment' | 'system'
  title: string
  description: string
  timestamp: string
  status: 'success' | 'warning' | 'error' | 'info'
}

interface SystemAlert {
  id: string
  type: 'critical' | 'warning' | 'info'
  title: string
  message: string
  timestamp: string
  resolved: boolean
}

const kpiCards: KPICard[] = [
  {
    title: 'Total Users',
    value: '2,847',
    change: '+12.5%',
    changeType: 'positive',
    icon: <Users className="w-6 h-6" />,
    color: 'bg-blue-500'
  },
  {
    title: 'Normal Users',
    value: '2,156',
    change: '+8.3%',
    changeType: 'positive',
    icon: <User className="w-6 h-6" />,
    color: 'bg-indigo-500'
  },
  {
    title: 'Teachers',
    value: '691',
    change: '+15.2%',
    changeType: 'positive',
    icon: <GraduationCap className="w-6 h-6" />,
    color: 'bg-green-500'
  },
  {
    title: 'Free Trial Users',
    value: '1,234',
    change: '+22.1%',
    changeType: 'positive',
    icon: <Zap className="w-6 h-6" />,
    color: 'bg-yellow-500'
  },
  {
    title: 'Monthly Subscriptions',
    value: '987',
    change: '+18.7%',
    changeType: 'positive',
    icon: <CreditCard className="w-6 h-6" />,
    color: 'bg-purple-500'
  },
  {
    title: 'Yearly Subscriptions',
    value: '626',
    change: '+25.4%',
    changeType: 'positive',
    icon: <Target className="w-6 h-6" />,
    color: 'bg-emerald-500'
  },
  {
    title: 'Expiring Soon',
    value: '47',
    change: '+12.8%',
    changeType: 'negative',
    icon: <AlertTriangle className="w-6 h-6" />,
    color: 'bg-red-500'
  },
  {
    title: 'Questions Created',
    value: '15,234',
    change: '+31.2%',
    changeType: 'positive',
    icon: <FileText className="w-6 h-6" />,
    color: 'bg-orange-500'
  },
  {
    title: 'AI Messages Sent',
    value: '8,567',
    change: '+45.6%',
    changeType: 'positive',
    icon: <MessageSquare className="w-6 h-6" />,
    color: 'bg-cyan-500'
  }
]

const recentActivities: ActivityItem[] = [
  {
    id: '1',
    type: 'user',
    title: 'New User Registration',
    description: 'Sarah Johnson (sarah.j@email.com) created an account',
    timestamp: '2 minutes ago',
    status: 'success'
  },
  {
    id: '2',
    type: 'exam',
    title: 'Exam Submitted for Review',
    description: 'Mathematics Practice Paper 15 submitted by Teacher Mike',
    timestamp: '15 minutes ago',
    status: 'info'
  },
  {
    id: '3',
    type: 'upload',
    title: 'OMR Upload Processed',
    description: 'Student Alex completed English Paper 8 - Score: 85%',
    timestamp: '32 minutes ago',
    status: 'success'
  },
  {
    id: '4',
    type: 'payment',
    title: 'Payment Received',
    description: 'Premium subscription payment from John Smith - £29.99',
    timestamp: '1 hour ago',
    status: 'success'
  },
  {
    id: '5',
    type: 'system',
    title: 'System Maintenance',
    description: 'Database backup completed successfully',
    timestamp: '2 hours ago',
    status: 'info'
  },
  {
    id: '6',
    type: 'user',
    title: 'Account Deactivated',
    description: 'User account suspended due to policy violation',
    timestamp: '3 hours ago',
    status: 'warning'
  }
]

const systemAlerts: SystemAlert[] = [
  {
    id: '1',
    type: 'critical',
    title: 'Server Performance Issue',
    message: 'High CPU usage detected on main server. Response times may be affected.',
    timestamp: '5 minutes ago',
    resolved: false
  },
  {
    id: '2',
    type: 'warning',
    title: 'Storage Space Low',
    message: 'File storage is at 85% capacity. Consider upgrading storage plan.',
    timestamp: '1 hour ago',
    resolved: false
  },
  {
    id: '3',
    type: 'info',
    title: 'Scheduled Maintenance',
    message: 'System maintenance scheduled for Sunday 2:00 AM - 4:00 AM GMT.',
    timestamp: '1 day ago',
    resolved: true
  }
]

// Mock data for charts and analytics
const usageTrends = [
  { date: '2024-01-01', questions: 120, aiMessages: 85, users: 45 },
  { date: '2024-01-02', questions: 135, aiMessages: 92, users: 52 },
  { date: '2024-01-03', questions: 148, aiMessages: 78, users: 48 },
  { date: '2024-01-04', questions: 162, aiMessages: 105, users: 61 },
  { date: '2024-01-05', questions: 178, aiMessages: 118, users: 58 },
  { date: '2024-01-06', questions: 195, aiMessages: 134, users: 67 },
  { date: '2024-01-07', questions: 210, aiMessages: 142, users: 73 }
]

const planDistribution = [
  { name: 'Free Trial', value: 43, color: '#FCD34D' },
  { name: 'Monthly', value: 35, color: '#A855F7' },
  { name: 'Yearly', value: 22, color: '#10B981' }
]

const couponUsage = [
  { code: 'WELCOME20', uses: 156, limit: 500 },
  { code: 'STUDENT50', uses: 89, limit: 200 },
  { code: 'TEACHER25', uses: 234, limit: 300 },
  { code: 'SUMMER30', uses: 67, limit: 150 }
]

export default function AdminOverviewPage() {
  const [selectedTimeframe, setSelectedTimeframe] = useState('7d')
  const [selectedFilters, setSelectedFilters] = useState({
    userRole: 'all',
    planType: 'all',
    dateRange: '30d'
  })

  const handleKPIClick = (kpiTitle: string) => {
    console.log(`Drilling down into ${kpiTitle}`)
    // In a real app, this would navigate to detailed reports
  }

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'user': return <User className="w-4 h-4" />
      case 'exam': return <FileText className="w-4 h-4" />
      case 'upload': return <Upload className="w-4 h-4" />
      case 'payment': return <DollarSign className="w-4 h-4" />
      case 'system': return <Activity className="w-4 h-4" />
      default: return <Activity className="w-4 h-4" />
    }
  }

  const getActivityColor = (status: string) => {
    switch (status) {
      case 'success': return 'text-green-500 bg-green-50'
      case 'warning': return 'text-yellow-500 bg-yellow-50'
      case 'error': return 'text-red-500 bg-red-50'
      case 'info': return 'text-blue-500 bg-blue-50'
      default: return 'text-gray-500 bg-gray-50'
    }
  }

  const getAlertIcon = (type: string) => {
    switch (type) {
      case 'critical': return <XCircle className="w-5 h-5 text-red-500" />
      case 'warning': return <AlertTriangle className="w-5 h-5 text-yellow-500" />
      case 'info': return <CheckCircle className="w-5 h-5 text-blue-500" />
      default: return <AlertCircle className="w-5 h-5 text-gray-500" />
    }
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Admin Overview</h1>
          <p className="text-gray-600 mt-1">Monitor system performance and subscription analytics</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-gray-500" />
            <select 
              value={selectedFilters.userRole}
              onChange={(e) => setSelectedFilters(prev => ({ ...prev, userRole: e.target.value }))}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:border-purple-500 focus:ring-1 focus:ring-purple-500 text-sm"
            >
              <option value="all">All Roles</option>
              <option value="normal">Normal Users</option>
              <option value="teacher">Teachers</option>
            </select>
            <select 
              value={selectedFilters.planType}
              onChange={(e) => setSelectedFilters(prev => ({ ...prev, planType: e.target.value }))}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:border-purple-500 focus:ring-1 focus:ring-purple-500 text-sm"
            >
              <option value="all">All Plans</option>
              <option value="trial">Free Trial</option>
              <option value="monthly">Monthly</option>
              <option value="yearly">Yearly</option>
            </select>
          </div>
          <select 
            value={selectedTimeframe}
            onChange={(e) => setSelectedTimeframe(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:border-purple-500 focus:ring-1 focus:ring-purple-500"
          >
            <option value="24h">Last 24 Hours</option>
            <option value="7d">Last 7 Days</option>
            <option value="30d">Last 30 Days</option>
            <option value="90d">Last 90 Days</option>
          </select>
          <Button className="gap-2">
            <Activity className="w-4 h-4" />
            Refresh Data
          </Button>
        </div>
      </div>

      {/* Notifications Banner */}
      <Card className="border-orange-200 bg-orange-50">
        <CardContent className="p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-orange-500 rounded-full flex items-center justify-center">
              <AlertTriangle className="w-5 h-5 text-white" />
            </div>
            <div className="flex-1">
              <h4 className="font-semibold text-orange-800">Trial Ending Soon</h4>
              <p className="text-sm text-orange-700">20 users have trials expiring in the next 7 days. Consider sending renewal reminders.</p>
            </div>
            <Button size="sm" className="bg-orange-600 hover:bg-orange-700 text-white">
              Send Reminders
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* System Alerts */}
      {systemAlerts.filter(alert => !alert.resolved).length > 0 && (
        <Card className="border-red-200 bg-red-50">
          <CardHeader>
            <CardTitle className="text-red-800 flex items-center gap-2">
              <AlertTriangle className="w-5 h-5" />
              System Alerts
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {systemAlerts.filter(alert => !alert.resolved).map((alert) => (
              <div key={alert.id} className="flex items-start gap-3 p-3 bg-white rounded-lg border">
                {getAlertIcon(alert.type)}
                <div className="flex-1">
                  <h4 className="font-semibold text-gray-900">{alert.title}</h4>
                  <p className="text-sm text-gray-600 mt-1">{alert.message}</p>
                  <p className="text-xs text-gray-500 mt-2">{alert.timestamp}</p>
                </div>
                <Button size="sm" variant="outline">
                  Resolve
                </Button>
              </div>
            ))}
          </CardContent>
        </Card>
      )}

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {kpiCards.map((kpi, index) => (
          <Card 
            key={index} 
            className="hover:shadow-lg transition-all cursor-pointer hover:scale-105"
            onClick={() => handleKPIClick(kpi.title)}
          >
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">{kpi.title}</p>
                  <p className="text-3xl font-bold text-gray-900 mt-2">{kpi.value}</p>
                  <div className="flex items-center gap-1 mt-2">
                    <TrendingUp className={`w-4 h-4 ${
                      kpi.changeType === 'positive' ? 'text-green-500' : 
                      kpi.changeType === 'negative' ? 'text-red-500' : 'text-gray-500'
                    }`} />
                    <span className={`text-sm font-medium ${
                      kpi.changeType === 'positive' ? 'text-green-600' : 
                      kpi.changeType === 'negative' ? 'text-red-600' : 'text-gray-600'
                    }`}>
                      {kpi.change}
                    </span>
                    <span className="text-sm text-gray-500">vs last period</span>
                  </div>
                </div>
                <div className={`w-12 h-12 ${kpi.color} rounded-lg flex items-center justify-center text-white`}>
                  {kpi.icon}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
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
            <CardDescription>Daily usage statistics for questions and AI messages</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {usageTrends.map((trend, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                  <div className="flex items-center gap-3">
                    <div className="text-sm font-medium text-gray-900">
                      {new Date(trend.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                    </div>
                  </div>
                  <div className="flex items-center gap-4 text-sm">
                    <div className="flex items-center gap-1">
                      <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                      <span className="text-gray-600">Questions: {trend.questions}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
                      <span className="text-gray-600">AI: {trend.aiMessages}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                      <span className="text-gray-600">Users: {trend.users}</span>
                    </div>
                  </div>
                </div>
              ))}
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
            <CardDescription>Current subscription plan breakdown</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {planDistribution.map((plan, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div 
                      className="w-4 h-4 rounded-full" 
                      style={{ backgroundColor: plan.color }}
                    ></div>
                    <span className="font-medium text-gray-900">{plan.name}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-32">
                      <Progress value={plan.value} className="h-2" />
                    </div>
                    <span className="text-sm font-medium text-gray-600 w-12 text-right">{plan.value}%</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Coupon Usage Heatmap */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="w-5 h-5" />
              Coupon Usage
            </CardTitle>
            <CardDescription>Active coupon performance and usage limits</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {couponUsage.map((coupon, index) => (
                <div key={index} className="p-4 border border-gray-200 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <Badge variant="outline" className="font-mono text-xs">
                        {coupon.code}
                      </Badge>
                      <span className="text-sm text-gray-600">
                        {coupon.uses} / {coupon.limit} uses
                      </span>
                    </div>
                    <span className="text-sm font-medium text-gray-900">
                      {Math.round((coupon.uses / coupon.limit) * 100)}%
                    </span>
                  </div>
                  <Progress value={(coupon.uses / coupon.limit) * 100} className="h-2" />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Activity Feed */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>Latest system activities and user actions</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4 max-h-96 overflow-y-auto">
              {recentActivities.map((activity) => (
                <div key={activity.id} className="flex items-start gap-3 p-3 rounded-lg hover:bg-gray-50">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${getActivityColor(activity.status)}`}>
                    {getActivityIcon(activity.type)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-medium text-gray-900">{activity.title}</h4>
                    <p className="text-sm text-gray-600 mt-1">{activity.description}</p>
                    <p className="text-xs text-gray-500 mt-2 flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {activity.timestamp}
                    </p>
                  </div>
                  <Badge variant={activity.status === 'success' ? 'default' : 
                                activity.status === 'warning' ? 'secondary' : 
                                activity.status === 'error' ? 'destructive' : 'outline'}>
                    {activity.status}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Common administrative tasks</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-3">
              <Button className="h-20 flex-col gap-2 bg-purple-600 hover:bg-purple-700">
                <Plus className="w-5 h-5" />
                Add Course
              </Button>
              <Button variant="outline" className="h-20 flex-col gap-2">
                <Eye className="w-5 h-5" />
                Review Exams
              </Button>
              <Button variant="outline" className="h-20 flex-col gap-2">
                <BarChart3 className="w-5 h-5" />
                View Analytics
              </Button>
              <Button variant="outline" className="h-20 flex-col gap-2">
                <Users className="w-5 h-5" />
                Manage Users
              </Button>
            </div>
            
            <div className="pt-4 border-t space-y-3">
              <h4 className="font-semibold text-gray-900">System Status</h4>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Server Status</span>
                  <Badge className="bg-green-100 text-green-800">Online</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Database</span>
                  <Badge className="bg-green-100 text-green-800">Healthy</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">File Storage</span>
                  <Badge className="bg-yellow-100 text-yellow-800">85% Full</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">API Response</span>
                  <Badge className="bg-green-100 text-green-800">Fast</Badge>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}