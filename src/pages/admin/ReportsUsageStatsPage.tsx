import React, { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Badge } from '@/components/ui/badge'
import { Calendar, Download, Filter, BarChart3, Users, MessageSquare, BookOpen, TrendingUp } from 'lucide-react'

interface UsageStats {
  id: string
  date: string
  userEmail: string
  userRole: 'Normal User' | 'Student' | 'Teacher'
  plan: 'Free Trial' | 'Monthly' | 'Yearly'
  questionsCreated: number
  aiMessagesUsed: number
  classActivity?: number
  studentActivity?: number
}

const ReportsUsageStatsPage: React.FC = () => {
  const [selectedDateRange, setSelectedDateRange] = useState('last-30-days')
  const [selectedUserType, setSelectedUserType] = useState('all')
  const [selectedPlan, setSelectedPlan] = useState('all')
  const [searchTerm, setSearchTerm] = useState('')

  // Mock data for usage statistics
  const usageStats: UsageStats[] = [
    {
      id: '1',
      date: '2024-01-20',
      userEmail: 'john.doe@example.com',
      userRole: 'Normal User',
      plan: 'Monthly',
      questionsCreated: 45,
      aiMessagesUsed: 23
    },
    {
      id: '2',
      date: '2024-01-20',
      userEmail: 'sarah.teacher@school.edu',
      userRole: 'Teacher',
      plan: 'Yearly',
      questionsCreated: 78,
      aiMessagesUsed: 56,
      classActivity: 12,
      studentActivity: 234
    },
    {
      id: '3',
      date: '2024-01-19',
      userEmail: 'student.alex@email.com',
      userRole: 'Student',
      plan: 'Free Trial',
      questionsCreated: 12,
      aiMessagesUsed: 8
    },
    {
      id: '4',
      date: '2024-01-19',
      userEmail: 'mary.educator@academy.org',
      userRole: 'Teacher',
      plan: 'Monthly',
      questionsCreated: 34,
      aiMessagesUsed: 29,
      classActivity: 8,
      studentActivity: 156
    }
  ]

  const aggregatedStats = {
    totalQuestions: usageStats.reduce((sum, stat) => sum + stat.questionsCreated, 0),
    totalAIMessages: usageStats.reduce((sum, stat) => sum + stat.aiMessagesUsed, 0),
    totalClassActivity: usageStats.reduce((sum, stat) => sum + (stat.classActivity || 0), 0),
    totalStudentActivity: usageStats.reduce((sum, stat) => sum + (stat.studentActivity || 0), 0),
    activeUsers: new Set(usageStats.map(stat => stat.userEmail)).size
  }

  const filteredStats = usageStats.filter(stat => {
    const matchesSearch = stat.userEmail.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesUserType = selectedUserType === 'all' || stat.userRole === selectedUserType
    const matchesPlan = selectedPlan === 'all' || stat.plan === selectedPlan
    return matchesSearch && matchesUserType && matchesPlan
  })

  const handleExportCSV = () => {
    const csvContent = [
      ['Date', 'User Email', 'Role', 'Plan', 'Questions Created', 'AI Messages', 'Class Activity', 'Student Activity'],
      ...filteredStats.map(stat => [
        stat.date,
        stat.userEmail,
        stat.userRole,
        stat.plan,
        stat.questionsCreated.toString(),
        stat.aiMessagesUsed.toString(),
        (stat.classActivity || 0).toString(),
        (stat.studentActivity || 0).toString()
      ])
    ].map(row => row.join(',')).join('\n')

    const blob = new Blob([csvContent], { type: 'text/csv' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'usage-stats.csv'
    a.click()
  }

  const handleExportPDF = () => {
    // Mock PDF export
    alert('PDF export functionality would be implemented here')
  }

  const getRoleBadgeColor = (role: string) => {
    switch (role) {
      case 'Teacher': return 'bg-blue-100 text-blue-800'
      case 'Student': return 'bg-purple-100 text-purple-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getPlanBadgeColor = (plan: string) => {
    switch (plan) {
      case 'Yearly': return 'bg-green-100 text-green-800'
      case 'Monthly': return 'bg-blue-100 text-blue-800'
      default: return 'bg-orange-100 text-orange-800'
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      <div className="max-w-7xl mx-auto p-6 space-y-6">
        {/* Header */}
        <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-lg p-6 border border-white/20">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="p-3 bg-gradient-to-r from-purple-500 to-blue-500 rounded-lg shadow-lg">
                <BarChart3 className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                  Reports & Usage Stats
                </h1>
                <p className="text-gray-600 mt-1">Deep dive into usage analytics and user behavior</p>
              </div>
            </div>
            <div className="flex space-x-2">
              <Button onClick={handleExportCSV} variant="outline" className="flex items-center space-x-2">
                <Download className="h-4 w-4" />
                <span>Export CSV</span>
              </Button>
              <Button onClick={handleExportPDF} variant="outline" className="flex items-center space-x-2">
                <Download className="h-4 w-4" />
                <span>Export PDF</span>
              </Button>
            </div>
          </div>
        </div>

        {/* Filters */}
        <Card className="bg-white/80 backdrop-blur-sm border-white/20 shadow-lg">
          <CardHeader className="bg-gradient-to-r from-indigo-500 to-purple-500 text-white rounded-t-xl">
            <CardTitle className="flex items-center space-x-2">
              <Filter className="h-5 w-5" />
              <span>Filters & Search</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Search User</label>
                <Input
                  placeholder="Search by email..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Date Range</label>
                <Select value={selectedDateRange} onValueChange={setSelectedDateRange}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="last-7-days">Last 7 Days</SelectItem>
                    <SelectItem value="last-30-days">Last 30 Days</SelectItem>
                    <SelectItem value="last-90-days">Last 90 Days</SelectItem>
                    <SelectItem value="custom">Custom Range</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">User Type</label>
                <Select value={selectedUserType} onValueChange={setSelectedUserType}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Users</SelectItem>
                    <SelectItem value="Normal User">Normal User</SelectItem>
                    <SelectItem value="Student">Student</SelectItem>
                    <SelectItem value="Teacher">Teacher</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Plan Type</label>
                <Select value={selectedPlan} onValueChange={setSelectedPlan}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Plans</SelectItem>
                    <SelectItem value="Free Trial">Free Trial</SelectItem>
                    <SelectItem value="Monthly">Monthly</SelectItem>
                    <SelectItem value="Yearly">Yearly</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Aggregated Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
          <Card className="bg-gradient-to-br from-blue-500 to-blue-600 text-white shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-blue-100 text-sm">Total Questions</p>
                  <p className="text-3xl font-bold">{aggregatedStats.totalQuestions.toLocaleString()}</p>
                </div>
                <BookOpen className="h-8 w-8 text-blue-200" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-purple-500 to-purple-600 text-white shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-purple-100 text-sm">AI Messages</p>
                  <p className="text-3xl font-bold">{aggregatedStats.totalAIMessages.toLocaleString()}</p>
                </div>
                <MessageSquare className="h-8 w-8 text-purple-200" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-green-500 to-green-600 text-white shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-green-100 text-sm">Class Activity</p>
                  <p className="text-3xl font-bold">{aggregatedStats.totalClassActivity}</p>
                </div>
                <Users className="h-8 w-8 text-green-200" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-orange-500 to-orange-600 text-white shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-orange-100 text-sm">Student Activity</p>
                  <p className="text-3xl font-bold">{aggregatedStats.totalStudentActivity}</p>
                </div>
                <TrendingUp className="h-8 w-8 text-orange-200" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-indigo-500 to-indigo-600 text-white shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-indigo-100 text-sm">Active Users</p>
                  <p className="text-3xl font-bold">{aggregatedStats.activeUsers}</p>
                </div>
                <Users className="h-8 w-8 text-indigo-200" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Usage Statistics Table */}
        <Card className="bg-white/80 backdrop-blur-sm border-white/20 shadow-lg">
          <CardHeader className="bg-gradient-to-r from-slate-600 to-slate-700 text-white rounded-t-xl">
            <CardTitle>Detailed Usage Statistics</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Plan</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Questions</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">AI Messages</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Class Activity</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Student Activity</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredStats.map((stat, index) => (
                    <tr key={stat.id} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {new Date(stat.date).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {stat.userEmail}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <Badge className={getRoleBadgeColor(stat.userRole)}>
                          {stat.userRole}
                        </Badge>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <Badge className={getPlanBadgeColor(stat.plan)}>
                          {stat.plan}
                        </Badge>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {stat.questionsCreated}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {stat.aiMessagesUsed}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {stat.classActivity || '-'}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {stat.studentActivity || '-'}
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

export default ReportsUsageStatsPage