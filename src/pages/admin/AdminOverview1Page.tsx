import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card'
import { Button } from '../../components/ui/button'
import { Badge } from '../../components/ui/badge'
import { Alert, AlertDescription } from '../../components/ui/alert'
import { 
  Users, 
  BookOpen, 
  Upload, 
  TrendingUp, 
  AlertTriangle,
  CheckCircle,
  XCircle,
  Clock,
  Activity,
  BarChart3,
  MessageSquare
} from 'lucide-react'

export default function AdminOverview1Page() {
  const [alerts] = useState([
    {
      id: 1,
      type: 'warning',
      title: 'High Server Load',
      message: 'Server CPU usage is at 85%. Consider scaling resources.',
      time: '5 minutes ago'
    },
    {
      id: 2,
      type: 'info',
      title: 'Scheduled Maintenance',
      message: 'System maintenance scheduled for tonight at 2 AM UTC.',
      time: '2 hours ago'
    },
    {
      id: 3,
      type: 'success',
      title: 'Backup Completed',
      message: 'Daily database backup completed successfully.',
      time: '6 hours ago'
    }
  ])

  const summaryCards = [
    {
      title: 'Active Users',
      value: '2,847',
      change: '+12%',
      changeType: 'positive',
      icon: <Users className="w-5 h-5" />,
      description: 'Users active in last 24h'
    },
    {
      title: 'System Health',
      value: '98.5%',
      change: '+0.2%',
      changeType: 'positive',
      icon: <Activity className="w-5 h-5" />,
      description: 'Overall system uptime'
    },
    {
      title: 'Revenue',
      value: '$24,567',
      change: '+8.3%',
      changeType: 'positive',
      icon: <TrendingUp className="w-5 h-5" />,
      description: 'Monthly recurring revenue'
    },
    {
      title: 'Support Tickets',
      value: '23',
      change: '-15%',
      changeType: 'positive',
      icon: <MessageSquare className="w-5 h-5" />,
      description: 'Open support requests'
    }
  ]

  const recentActivities = [
    {
      id: 1,
      type: 'user',
      message: 'New teacher registration: Sarah Johnson',
      time: '2 minutes ago',
      icon: <Users className="w-4 h-4" />
    },
    {
      id: 2,
      type: 'exam',
      message: 'Exam "Mathematics Mock Test 5" published',
      time: '15 minutes ago',
      icon: <BookOpen className="w-4 h-4" />
    },
    {
      id: 3,
      type: 'system',
      message: 'Database optimization completed',
      time: '1 hour ago',
      icon: <Activity className="w-4 h-4" />
    },
    {
      id: 4,
      type: 'upload',
      message: '156 OMR sheets processed successfully',
      time: '2 hours ago',
      icon: <Upload className="w-4 h-4" />
    }
  ]

  return (
    <div className="p-6 space-y-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Admin Overview Panel</h1>
          <p className="text-gray-600 mt-1">High-level summary cards and alert banners</p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" size="sm">
            <BarChart3 className="w-4 h-4 mr-2" />
            View Analytics
          </Button>
          <Button size="sm">
            <Activity className="w-4 h-4 mr-2" />
            System Status
          </Button>
        </div>
      </div>

      {/* Alert Banners */}
      <div className="space-y-3">
        {alerts.map((alert) => (
          <Alert key={alert.id} className={`border-l-4 ${
            alert.type === 'warning' ? 'border-l-yellow-500 bg-yellow-50' :
            alert.type === 'info' ? 'border-l-blue-500 bg-blue-50' :
            'border-l-green-500 bg-green-50'
          }`}>
            <div className="flex items-start justify-between">
              <div className="flex items-start gap-3">
                {alert.type === 'warning' && <AlertTriangle className="w-5 h-5 text-yellow-600 mt-0.5" />}
                {alert.type === 'info' && <Clock className="w-5 h-5 text-blue-600 mt-0.5" />}
                {alert.type === 'success' && <CheckCircle className="w-5 h-5 text-green-600 mt-0.5" />}
                <div>
                  <h4 className="font-semibold text-gray-900">{alert.title}</h4>
                  <AlertDescription className="text-gray-700 mt-1">
                    {alert.message}
                  </AlertDescription>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs text-gray-500">{alert.time}</span>
                <Button variant="ghost" size="sm">
                  <XCircle className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </Alert>
        ))}
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {summaryCards.map((card, index) => (
          <Card key={index} className="hover:shadow-lg transition-shadow cursor-pointer">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">{card.title}</CardTitle>
              <div className="p-2 bg-purple-100 rounded-lg">
                {card.icon}
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900">{card.value}</div>
              <div className="flex items-center justify-between mt-2">
                <p className="text-xs text-gray-600">{card.description}</p>
                <Badge 
                  variant="secondary" 
                  className={`text-xs ${
                    card.changeType === 'positive' 
                      ? 'text-green-600 bg-green-100' 
                      : 'text-red-600 bg-red-100'
                  }`}
                >
                  {card.change}
                </Badge>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Activities */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Activity className="w-5 h-5" />
              Recent Activities
            </CardTitle>
            <CardDescription>Latest system and user activities</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivities.map((activity) => (
                <div key={activity.id} className="flex items-start gap-3 p-3 rounded-lg border bg-gray-50">
                  <div className="p-2 bg-white rounded-lg border">
                    {activity.icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-gray-900">{activity.message}</p>
                    <p className="text-xs text-gray-500 mt-1">{activity.time}</p>
                  </div>
                  <Badge 
                    variant="outline" 
                    className={`text-xs ${
                      activity.type === 'user' ? 'border-blue-200 text-blue-700' :
                      activity.type === 'exam' ? 'border-green-200 text-green-700' :
                      activity.type === 'system' ? 'border-purple-200 text-purple-700' :
                      'border-orange-200 text-orange-700'
                    }`}
                  >
                    {activity.type}
                  </Badge>
                </div>
              ))}
            </div>
            <div className="mt-4 pt-4 border-t">
              <Button variant="outline" className="w-full">
                View All Activities
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Quick Stats */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="w-5 h-5" />
              Quick Stats
            </CardTitle>
            <CardDescription>Key metrics at a glance</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                <div>
                  <p className="text-sm font-medium text-blue-900">New Users Today</p>
                  <p className="text-2xl font-bold text-blue-700">47</p>
                </div>
                <Users className="w-8 h-8 text-blue-600" />
              </div>
              
              <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                <div>
                  <p className="text-sm font-medium text-green-900">Exams Completed</p>
                  <p className="text-2xl font-bold text-green-700">234</p>
                </div>
                <BookOpen className="w-8 h-8 text-green-600" />
              </div>
              
              <div className="flex items-center justify-between p-3 bg-purple-50 rounded-lg">
                <div>
                  <p className="text-sm font-medium text-purple-900">AI Messages</p>
                  <p className="text-2xl font-bold text-purple-700">1,567</p>
                </div>
                <MessageSquare className="w-8 h-8 text-purple-600" />
              </div>
              
              <div className="flex items-center justify-between p-3 bg-orange-50 rounded-lg">
                <div>
                  <p className="text-sm font-medium text-orange-900">OMR Uploads</p>
                  <p className="text-2xl font-bold text-orange-700">89</p>
                </div>
                <Upload className="w-8 h-8 text-orange-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* System Status */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Activity className="w-5 h-5" />
            System Status
          </CardTitle>
          <CardDescription>Current system health and performance</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Database</span>
                <Badge className="bg-green-100 text-green-800">Healthy</Badge>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-green-500 h-2 rounded-full" style={{ width: '95%' }} />
              </div>
              <p className="text-xs text-gray-600">Response time: 45ms</p>
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">API Server</span>
                <Badge className="bg-green-100 text-green-800">Operational</Badge>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-green-500 h-2 rounded-full" style={{ width: '98%' }} />
              </div>
              <p className="text-xs text-gray-600">Uptime: 99.9%</p>
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Storage</span>
                <Badge className="bg-yellow-100 text-yellow-800">Warning</Badge>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-yellow-500 h-2 rounded-full" style={{ width: '78%' }} />
              </div>
              <p className="text-xs text-gray-600">Usage: 78% of 1TB</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}