import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Button } from '../../components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card'
import { Badge } from '../../components/ui/badge'
import { Input } from '../../components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../components/ui/select'
import { Calendar } from '../../components/ui/calendar'
import { Popover, PopoverContent, PopoverTrigger } from '../../components/ui/popover'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '../../components/ui/dialog'
import { 
  ArrowLeft,
  Search,
  MessageSquare,
  Calendar as CalendarIcon,
  Eye,
  Download,
  Filter,
  AlertTriangle,
  Clock,
  User,
  Zap
} from 'lucide-react'
import { format } from 'date-fns'

interface AIUsageLog {
  id: string
  userEmail: string
  userName: string
  userRole: 'Normal' | 'Teacher' | 'Student' | 'Admin'
  timestamp: string
  prompt: string
  response: string
  charactersUsed: number
  tokensConsumed: number
  responseTime: number
  sessionId: string
  feature: 'Chat' | 'Question Generation' | 'Explanation' | 'Analysis'
  status: 'Success' | 'Error' | 'Timeout'
}

const mockAILogs: AIUsageLog[] = [
  {
    id: '1',
    userEmail: 'sarah.johnson@school.edu',
    userName: 'Sarah Johnson',
    userRole: 'Teacher',
    timestamp: '2024-01-20 14:30:25',
    prompt: 'Generate 10 algebra questions for grade 7 students focusing on linear equations',
    response: 'Here are 10 algebra questions for grade 7 students...',
    charactersUsed: 156,
    tokensConsumed: 245,
    responseTime: 2.3,
    sessionId: 'sess_abc123',
    feature: 'Question Generation',
    status: 'Success'
  },
  {
    id: '2',
    userEmail: 'alex.chen@email.com',
    userName: 'Alex Chen',
    userRole: 'Normal',
    timestamp: '2024-01-20 13:45:12',
    prompt: 'Explain the concept of photosynthesis in simple terms for a 10-year-old',
    response: 'Photosynthesis is like how plants make their own food...',
    charactersUsed: 89,
    tokensConsumed: 167,
    responseTime: 1.8,
    sessionId: 'sess_def456',
    feature: 'Explanation',
    status: 'Success'
  },
  {
    id: '3',
    userEmail: 'emma.wilson@student.edu',
    userName: 'Emma Wilson',
    userRole: 'Student',
    timestamp: '2024-01-20 12:15:33',
    prompt: 'Help me understand why I got this math problem wrong: 2x + 5 = 15',
    response: 'Let me help you solve this step by step...',
    charactersUsed: 67,
    tokensConsumed: 134,
    responseTime: 1.5,
    sessionId: 'sess_ghi789',
    feature: 'Chat',
    status: 'Success'
  },
  {
    id: '4',
    userEmail: 'michael.brown@academy.edu',
    userName: 'Michael Brown',
    userRole: 'Teacher',
    timestamp: '2024-01-20 11:30:45',
    prompt: 'Analyze the performance data for my English class and suggest improvements',
    response: 'Based on the performance data analysis...',
    charactersUsed: 203,
    tokensConsumed: 387,
    responseTime: 3.2,
    sessionId: 'sess_jkl012',
    feature: 'Analysis',
    status: 'Success'
  },
  {
    id: '5',
    userEmail: 'lisa.davis@email.com',
    userName: 'Lisa Davis',
    userRole: 'Normal',
    timestamp: '2024-01-20 10:45:18',
    prompt: 'Create a study plan for 11+ exam preparation',
    response: 'Error: Request timeout',
    charactersUsed: 52,
    tokensConsumed: 0,
    responseTime: 30.0,
    sessionId: 'sess_mno345',
    feature: 'Chat',
    status: 'Timeout'
  },
  {
    id: '6',
    userEmail: 'john.smith@teacher.edu',
    userName: 'John Smith',
    userRole: 'Teacher',
    timestamp: '2024-01-19 16:20:10',
    prompt: 'Generate practice questions for non-verbal reasoning with varying difficulty levels',
    response: 'Here are practice questions with different difficulty levels...',
    charactersUsed: 178,
    tokensConsumed: 298,
    responseTime: 2.7,
    sessionId: 'sess_pqr678',
    feature: 'Question Generation',
    status: 'Success'
  }
]

export default function AIUsageLogsPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedRole, setSelectedRole] = useState<string>('all')
  const [selectedFeature, setSelectedFeature] = useState<string>('all')
  const [selectedStatus, setSelectedStatus] = useState<string>('all')
  const [dateRange, setDateRange] = useState<{ from: Date | undefined; to: Date | undefined }>({
    from: undefined,
    to: undefined
  })
  const [selectedLog, setSelectedLog] = useState<AIUsageLog | null>(null)
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false)

  // Filter logs based on search and filters
  const filteredLogs = mockAILogs.filter(log => {
    const matchesSearch = log.userName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         log.userEmail.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         log.prompt.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesRole = selectedRole === 'all' || log.userRole === selectedRole
    const matchesFeature = selectedFeature === 'all' || log.feature === selectedFeature
    const matchesStatus = selectedStatus === 'all' || log.status === selectedStatus
    
    return matchesSearch && matchesRole && matchesFeature && matchesStatus
  })

  // Calculate summary statistics
  const totalTokens = filteredLogs.reduce((sum, log) => sum + log.tokensConsumed, 0)
  const totalCharacters = filteredLogs.reduce((sum, log) => sum + log.charactersUsed, 0)
  const averageResponseTime = filteredLogs.length > 0 
    ? filteredLogs.reduce((sum, log) => sum + log.responseTime, 0) / filteredLogs.length 
    : 0
  const successRate = filteredLogs.length > 0 
    ? (filteredLogs.filter(log => log.status === 'Success').length / filteredLogs.length) * 100 
    : 0

  const handleViewDetails = (log: AIUsageLog) => {
    setSelectedLog(log)
    setIsDetailModalOpen(true)
  }

  const handleExportLogs = () => {
    const csvContent = [
      ['Timestamp', 'User Name', 'Email', 'Role', 'Feature', 'Prompt', 'Characters', 'Tokens', 'Response Time', 'Status'],
      ...filteredLogs.map(log => [
        log.timestamp,
        log.userName,
        log.userEmail,
        log.userRole,
        log.feature,
        log.prompt.substring(0, 100) + (log.prompt.length > 100 ? '...' : ''),
        log.charactersUsed,
        log.tokensConsumed,
        log.responseTime,
        log.status
      ])
    ].map(row => row.join(',')).join('\n')

    const blob = new Blob([csvContent], { type: 'text/csv' })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `ai-usage-logs-${format(new Date(), 'yyyy-MM-dd')}.csv`
    a.click()
    window.URL.revokeObjectURL(url)
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Success': return 'bg-green-100 text-green-800'
      case 'Error': return 'bg-red-100 text-red-800'
      case 'Timeout': return 'bg-yellow-100 text-yellow-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'Teacher': return 'bg-blue-100 text-blue-800'
      case 'Student': return 'bg-green-100 text-green-800'
      case 'Admin': return 'bg-red-100 text-red-800'
      case 'Normal': return 'bg-gray-100 text-gray-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getFeatureColor = (feature: string) => {
    switch (feature) {
      case 'Chat': return 'bg-purple-100 text-purple-800'
      case 'Question Generation': return 'bg-blue-100 text-blue-800'
      case 'Explanation': return 'bg-green-100 text-green-800'
      case 'Analysis': return 'bg-orange-100 text-orange-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-sm border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-4">
              <Link 
                to="/dashboard" 
                className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
              >
                <ArrowLeft className="w-5 h-5" />
                <span>Back to Dashboard</span>
              </Link>
              <div className="h-6 w-px bg-gray-300" />
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-lg flex items-center justify-center">
                  <MessageSquare className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h1 className="text-xl font-bold text-gray-900">AI Usage Logs</h1>
                  <p className="text-sm text-gray-600">Track AI interactions and monitor usage</p>
                </div>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <Button onClick={handleExportLogs} variant="outline" size="sm">
                <Download className="w-4 h-4 mr-2" />
                Export CSV
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto p-6 space-y-6">
        {/* Summary Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-purple-600">Total Tokens</p>
                  <p className="text-3xl font-bold text-purple-900">{totalTokens.toLocaleString()}</p>
                  <p className="text-xs text-purple-700 mt-1">AI processing units</p>
                </div>
                <div className="w-12 h-12 bg-purple-500 rounded-lg flex items-center justify-center">
                  <Zap className="w-6 h-6 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-blue-600">Characters Used</p>
                  <p className="text-3xl font-bold text-blue-900">{totalCharacters.toLocaleString()}</p>
                  <p className="text-xs text-blue-700 mt-1">Input characters</p>
                </div>
                <div className="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center">
                  <MessageSquare className="w-6 h-6 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-green-600">Avg Response Time</p>
                  <p className="text-3xl font-bold text-green-900">{averageResponseTime.toFixed(1)}s</p>
                  <p className="text-xs text-green-700 mt-1">Processing speed</p>
                </div>
                <div className="w-12 h-12 bg-green-500 rounded-lg flex items-center justify-center">
                  <Clock className="w-6 h-6 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-orange-600">Success Rate</p>
                  <p className="text-3xl font-bold text-orange-900">{successRate.toFixed(1)}%</p>
                  <p className="text-xs text-orange-700 mt-1">Successful requests</p>
                </div>
                <div className="w-12 h-12 bg-orange-500 rounded-lg flex items-center justify-center">
                  <User className="w-6 h-6 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
          <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-t-lg">
            <div className="flex items-center gap-3">
              <Filter className="w-5 h-5 text-blue-600" />
              <CardTitle className="text-blue-900">Filters & Search</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Search</label>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <Input
                    placeholder="Search users or prompts..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">User Role</label>
                <Select value={selectedRole} onValueChange={setSelectedRole}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select role" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Roles</SelectItem>
                    <SelectItem value="Normal">Normal User</SelectItem>
                    <SelectItem value="Teacher">Teacher</SelectItem>
                    <SelectItem value="Student">Student</SelectItem>
                    <SelectItem value="Admin">Admin</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Feature</label>
                <Select value={selectedFeature} onValueChange={setSelectedFeature}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select feature" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Features</SelectItem>
                    <SelectItem value="Chat">Chat</SelectItem>
                    <SelectItem value="Question Generation">Question Generation</SelectItem>
                    <SelectItem value="Explanation">Explanation</SelectItem>
                    <SelectItem value="Analysis">Analysis</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Status</label>
                <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="Success">Success</SelectItem>
                    <SelectItem value="Error">Error</SelectItem>
                    <SelectItem value="Timeout">Timeout</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Date Range</label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="outline" className="w-full justify-start text-left font-normal">
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {dateRange.from ? (
                        dateRange.to ? (
                          <>
                            {format(dateRange.from, "LLL dd, y")} -{" "}
                            {format(dateRange.to, "LLL dd, y")}
                          </>
                        ) : (
                          format(dateRange.from, "LLL dd, y")
                        )
                      ) : (
                        <span>Pick a date range</span>
                      )}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      initialFocus
                      mode="range"
                      defaultMonth={dateRange.from}
                      selected={dateRange}
                      onSelect={setDateRange}
                      numberOfMonths={2}
                    />
                  </PopoverContent>
                </Popover>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* AI Usage Logs Table */}
        <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
          <CardHeader className="bg-gradient-to-r from-slate-50 to-blue-50 rounded-t-lg">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <MessageSquare className="w-5 h-5 text-slate-600" />
                <div>
                  <CardTitle className="text-slate-900">AI Usage Logs</CardTitle>
                  <CardDescription>Monitor AI interactions and detect potential abuse</CardDescription>
                </div>
              </div>
              <Badge variant="outline" className="text-slate-600">
                {filteredLogs.length} logs
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      User Details
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Timestamp
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Feature & Status
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Prompt Preview
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Usage Metrics
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredLogs.map((log, index) => (
                    <tr key={log.id} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div>
                          <div className="text-sm font-medium text-gray-900">{log.userName}</div>
                          <div className="text-sm text-gray-500">{log.userEmail}</div>
                          <Badge className={`text-xs mt-1 ${getRoleColor(log.userRole)}`}>
                            {log.userRole}
                          </Badge>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{format(new Date(log.timestamp), 'MMM dd, yyyy')}</div>
                        <div className="text-xs text-gray-500">{format(new Date(log.timestamp), 'HH:mm:ss')}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="space-y-1">
                          <Badge className={getFeatureColor(log.feature)}>
                            {log.feature}
                          </Badge>
                          <Badge className={getStatusColor(log.status)}>
                            {log.status}
                          </Badge>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm text-gray-900 max-w-xs truncate">
                          {log.prompt}
                        </div>
                        <div className="text-xs text-gray-500 mt-1">
                          Session: {log.sessionId}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="space-y-1">
                          <div className="text-xs text-gray-600">
                            {log.charactersUsed} chars • {log.tokensConsumed} tokens
                          </div>
                          <div className="text-xs text-gray-600">
                            {log.responseTime}s response time
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleViewDetails(log)}
                          className="text-blue-600 hover:text-blue-700"
                        >
                          <Eye className="w-4 h-4 mr-1" />
                          View
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        {/* Detail Modal */}
        <Dialog open={isDetailModalOpen} onOpenChange={setIsDetailModalOpen}>
          <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>AI Usage Log Details</DialogTitle>
              <DialogDescription>
                {selectedLog && `Detailed view of AI interaction for ${selectedLog.userName}`}
              </DialogDescription>
            </DialogHeader>
            
            {selectedLog && (
              <div className="space-y-6">
                {/* User and Session Info */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h4 className="font-medium text-gray-900 mb-2">User Information</h4>
                    <div className="space-y-1 text-sm">
                      <div><span className="font-medium">Name:</span> {selectedLog.userName}</div>
                      <div><span className="font-medium">Email:</span> {selectedLog.userEmail}</div>
                      <div><span className="font-medium">Role:</span> {selectedLog.userRole}</div>
                    </div>
                  </div>
                  
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h4 className="font-medium text-gray-900 mb-2">Session Details</h4>
                    <div className="space-y-1 text-sm">
                      <div><span className="font-medium">Session ID:</span> {selectedLog.sessionId}</div>
                      <div><span className="font-medium">Timestamp:</span> {selectedLog.timestamp}</div>
                      <div><span className="font-medium">Feature:</span> {selectedLog.feature}</div>
                    </div>
                  </div>
                </div>

                {/* Usage Metrics */}
                <div className="grid grid-cols-4 gap-4">
                  <div className="bg-blue-50 p-4 rounded-lg text-center">
                    <div className="text-2xl font-bold text-blue-900">{selectedLog.charactersUsed}</div>
                    <div className="text-sm text-blue-600">Characters</div>
                  </div>
                  <div className="bg-purple-50 p-4 rounded-lg text-center">
                    <div className="text-2xl font-bold text-purple-900">{selectedLog.tokensConsumed}</div>
                    <div className="text-sm text-purple-600">Tokens</div>
                  </div>
                  <div className="bg-green-50 p-4 rounded-lg text-center">
                    <div className="text-2xl font-bold text-green-900">{selectedLog.responseTime}s</div>
                    <div className="text-sm text-green-600">Response Time</div>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg text-center">
                    <Badge className={getStatusColor(selectedLog.status)}>
                      {selectedLog.status}
                    </Badge>
                    <div className="text-sm text-gray-600 mt-1">Status</div>
                  </div>
                </div>

                {/* Prompt and Response */}
                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium text-gray-900 mb-2">User Prompt</h4>
                    <div className="bg-gray-50 p-4 rounded-lg border">
                      <p className="text-sm text-gray-700 whitespace-pre-wrap">{selectedLog.prompt}</p>
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="font-medium text-gray-900 mb-2">AI Response</h4>
                    <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                      <p className="text-sm text-gray-700 whitespace-pre-wrap">{selectedLog.response}</p>
                    </div>
                  </div>
                </div>

                {/* Warning for potential issues */}
                {(selectedLog.status === 'Error' || selectedLog.status === 'Timeout' || selectedLog.tokensConsumed > 500) && (
                  <div className="flex items-center gap-2 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                    <AlertTriangle className="w-5 h-5 text-yellow-600" />
                    <div className="text-sm text-yellow-800">
                      {selectedLog.status === 'Error' && <span><strong>Error detected:</strong> This request failed to process properly.</span>}
                      {selectedLog.status === 'Timeout' && <span><strong>Timeout occurred:</strong> This request took too long to process.</span>}
                      {selectedLog.tokensConsumed > 500 && <span><strong>High token usage:</strong> This request consumed an unusually high number of tokens.</span>}
                    </div>
                  </div>
                )}
              </div>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </div>
  )
}