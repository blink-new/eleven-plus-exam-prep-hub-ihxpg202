import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card'
import { Button } from '../../components/ui/button'
import { Badge } from '../../components/ui/badge'
import { Input } from '../../components/ui/input'
import { Label } from '../../components/ui/label'
import { Progress } from '../../components/ui/progress'
import { 
  Search, 
  Filter,
  Edit,
  Ban,
  UserCheck,
  Calendar,
  CreditCard,
  MessageSquare,
  BookOpen,
  Users,
  GraduationCap,
  AlertTriangle,
  CheckCircle,
  XCircle,
  Clock,
  Download,
  RefreshCw
} from 'lucide-react'

interface UserSubscription {
  id: string
  userEmail: string
  userName: string
  role: 'normal' | 'teacher'
  currentPlan: string
  planType: 'trial' | 'monthly' | 'yearly'
  startDate: string
  endDate: string
  remainingQuota: {
    questions: number
    aiMessages: number
  }
  totalQuota: {
    questions: number
    aiMessages: number
  }
  status: 'active' | 'expired' | 'trial' | 'suspended'
  autoRenew: boolean
  lastActivity: string
  totalSpent: number
  joinedAt: string
}

const mockSubscriptions: UserSubscription[] = [
  {
    id: '1',
    userEmail: 'john.smith@email.com',
    userName: 'John Smith',
    role: 'normal',
    currentPlan: 'Student Monthly',
    planType: 'monthly',
    startDate: '2024-01-01',
    endDate: '2024-02-01',
    remainingQuota: { questions: 342, aiMessages: 28 },
    totalQuota: { questions: 500, aiMessages: 50 },
    status: 'active',
    autoRenew: true,
    lastActivity: '2024-01-20T10:30:00Z',
    totalSpent: 29.97,
    joinedAt: '2023-12-15'
  },
  {
    id: '2',
    userEmail: 'sarah.teacher@school.edu',
    userName: 'Sarah Johnson',
    role: 'teacher',
    currentPlan: 'Teacher Pro',
    planType: 'monthly',
    startDate: '2024-01-15',
    endDate: '2024-02-15',
    remainingQuota: { questions: 1567, aiMessages: 145 },
    totalQuota: { questions: 2000, aiMessages: 200 },
    status: 'active',
    autoRenew: true,
    lastActivity: '2024-01-21T15:45:00Z',
    totalSpent: 89.97,
    joinedAt: '2023-11-20'
  },
  {
    id: '3',
    userEmail: 'mike.student@gmail.com',
    userName: 'Mike Wilson',
    role: 'normal',
    currentPlan: 'Free Trial',
    planType: 'trial',
    startDate: '2024-01-18',
    endDate: '2024-02-01',
    remainingQuota: { questions: 23, aiMessages: 5 },
    totalQuota: { questions: 50, aiMessages: 10 },
    status: 'trial',
    autoRenew: false,
    lastActivity: '2024-01-21T09:15:00Z',
    totalSpent: 0,
    joinedAt: '2024-01-18'
  },
  {
    id: '4',
    userEmail: 'emma.premium@example.com',
    userName: 'Emma Davis',
    role: 'teacher',
    currentPlan: 'Annual Premium',
    planType: 'yearly',
    startDate: '2023-12-01',
    endDate: '2024-12-01',
    remainingQuota: { questions: 4234, aiMessages: 387 },
    totalQuota: { questions: 5000, aiMessages: 500 },
    status: 'active',
    autoRenew: true,
    lastActivity: '2024-01-21T16:20:00Z',
    totalSpent: 199.99,
    joinedAt: '2023-10-15'
  },
  {
    id: '5',
    userEmail: 'alex.expired@email.com',
    userName: 'Alex Brown',
    role: 'normal',
    currentPlan: 'Student Monthly',
    planType: 'monthly',
    startDate: '2023-12-01',
    endDate: '2024-01-01',
    remainingQuota: { questions: 0, aiMessages: 0 },
    totalQuota: { questions: 500, aiMessages: 50 },
    status: 'expired',
    autoRenew: false,
    lastActivity: '2024-01-05T12:00:00Z',
    totalSpent: 19.98,
    joinedAt: '2023-11-25'
  },
  {
    id: '6',
    userEmail: 'suspended.user@email.com',
    userName: 'Suspended User',
    role: 'normal',
    currentPlan: 'Student Monthly',
    planType: 'monthly',
    startDate: '2024-01-01',
    endDate: '2024-02-01',
    remainingQuota: { questions: 0, aiMessages: 0 },
    totalQuota: { questions: 500, aiMessages: 50 },
    status: 'suspended',
    autoRenew: false,
    lastActivity: '2024-01-10T08:30:00Z',
    totalSpent: 9.99,
    joinedAt: '2023-12-20'
  }
]

const availablePlans = ['Free Trial', 'Student Monthly', 'Teacher Pro', 'Annual Premium']

export default function UserSubscriptionsPage() {
  const [subscriptions, setSubscriptions] = useState<UserSubscription[]>(mockSubscriptions)
  const [searchTerm, setSearchTerm] = useState('')
  const [filterRole, setFilterRole] = useState('all')
  const [filterPlan, setFilterPlan] = useState('all')
  const [filterStatus, setFilterStatus] = useState('all')
  const [editingUser, setEditingUser] = useState<UserSubscription | null>(null)
  const [isAssignModalOpen, setIsAssignModalOpen] = useState(false)
  const [selectedUser, setSelectedUser] = useState<UserSubscription | null>(null)

  const filteredSubscriptions = subscriptions.filter(sub => {
    const matchesSearch = sub.userEmail.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         sub.userName.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesRole = filterRole === 'all' || sub.role === filterRole
    const matchesPlan = filterPlan === 'all' || sub.currentPlan === filterPlan
    const matchesStatus = filterStatus === 'all' || sub.status === filterStatus
    
    return matchesSearch && matchesRole && matchesPlan && matchesStatus
  })

  const handleSuspendUser = (userId: string) => {
    setSubscriptions(subscriptions.map(sub => 
      sub.id === userId ? { ...sub, status: sub.status === 'suspended' ? 'active' : 'suspended' } : sub
    ))
  }

  const handleAssignPlan = (userId: string, newPlan: string) => {
    setSubscriptions(subscriptions.map(sub => 
      sub.id === userId ? { 
        ...sub, 
        currentPlan: newPlan,
        status: 'active',
        startDate: new Date().toISOString().split('T')[0],
        endDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
      } : sub
    ))
    setIsAssignModalOpen(false)
    setSelectedUser(null)
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return <Badge className="bg-green-100 text-green-800"><CheckCircle className="w-3 h-3 mr-1" />Active</Badge>
      case 'trial':
        return <Badge className="bg-blue-100 text-blue-800"><Clock className="w-3 h-3 mr-1" />Trial</Badge>
      case 'expired':
        return <Badge className="bg-red-100 text-red-800"><XCircle className="w-3 h-3 mr-1" />Expired</Badge>
      case 'suspended':
        return <Badge className="bg-orange-100 text-orange-800"><Ban className="w-3 h-3 mr-1" />Suspended</Badge>
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  const getRoleBadge = (role: string) => {
    switch (role) {
      case 'normal':
        return <Badge className="bg-purple-100 text-purple-800"><Users className="w-3 h-3 mr-1" />Student</Badge>
      case 'teacher':
        return <Badge className="bg-blue-100 text-blue-800"><GraduationCap className="w-3 h-3 mr-1" />Teacher</Badge>
      default:
        return <Badge variant="outline">{role}</Badge>
    }
  }

  const getPlanTypeBadge = (planType: string) => {
    switch (planType) {
      case 'trial':
        return <Badge className="bg-yellow-100 text-yellow-800">Trial</Badge>
      case 'monthly':
        return <Badge className="bg-blue-100 text-blue-800">Monthly</Badge>
      case 'yearly':
        return <Badge className="bg-green-100 text-green-800">Yearly</Badge>
      default:
        return <Badge variant="outline">{planType}</Badge>
    }
  }

  const getQuestionUsagePercentage = (remaining: number, total: number) => {
    return Math.round(((total - remaining) / total) * 100)
  }

  const getAIUsagePercentage = (remaining: number, total: number) => {
    return Math.round(((total - remaining) / total) * 100)
  }

  const isExpiringSoon = (endDate: string) => {
    const daysUntilExpiry = Math.ceil((new Date(endDate).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24))
    return daysUntilExpiry <= 7 && daysUntilExpiry > 0
  }

  return (
    <div className="p-6 space-y-6 bg-gradient-to-br from-slate-50 to-blue-50 min-h-screen">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
            User Subscriptions
          </h1>
          <p className="text-gray-600 mt-1">View and manage individual user plans and usage</p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" className="gap-2">
            <Download className="w-4 h-4" />
            Export
          </Button>
          <Button variant="outline" className="gap-2">
            <RefreshCw className="w-4 h-4" />
            Refresh
          </Button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="backdrop-blur-sm bg-white/80 shadow-lg">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Users</p>
                <p className="text-3xl font-bold text-gray-900">{subscriptions.length}</p>
              </div>
              <div className="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center">
                <Users className="w-6 h-6 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="backdrop-blur-sm bg-white/80 shadow-lg">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Active Subscriptions</p>
                <p className="text-3xl font-bold text-green-600">
                  {subscriptions.filter(s => s.status === 'active').length}
                </p>
              </div>
              <div className="w-12 h-12 bg-green-500 rounded-lg flex items-center justify-center">
                <CheckCircle className="w-6 h-6 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="backdrop-blur-sm bg-white/80 shadow-lg">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Expiring Soon</p>
                <p className="text-3xl font-bold text-orange-600">
                  {subscriptions.filter(s => isExpiringSoon(s.endDate)).length}
                </p>
              </div>
              <div className="w-12 h-12 bg-orange-500 rounded-lg flex items-center justify-center">
                <AlertTriangle className="w-6 h-6 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="backdrop-blur-sm bg-white/80 shadow-lg">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Monthly Revenue</p>
                <p className="text-3xl font-bold text-purple-600">
                  £{subscriptions.reduce((sum, s) => sum + s.totalSpent, 0).toFixed(0)}
                </p>
              </div>
              <div className="w-12 h-12 bg-purple-500 rounded-lg flex items-center justify-center">
                <CreditCard className="w-6 h-6 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card className="backdrop-blur-sm bg-white/80 shadow-lg">
        <CardContent className="p-6">
          <div className="flex flex-wrap items-center gap-4">
            <div className="flex items-center gap-2">
              <Search className="w-4 h-4 text-gray-500" />
              <Input
                placeholder="Search by email or name..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-64"
              />
            </div>
            <div className="flex items-center gap-2">
              <Filter className="w-4 h-4 text-gray-500" />
              <select
                value={filterRole}
                onChange={(e) => setFilterRole(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:border-purple-500 focus:ring-1 focus:ring-purple-500"
              >
                <option value="all">All Roles</option>
                <option value="normal">Students</option>
                <option value="teacher">Teachers</option>
              </select>
              <select
                value={filterPlan}
                onChange={(e) => setFilterPlan(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:border-purple-500 focus:ring-1 focus:ring-purple-500"
              >
                <option value="all">All Plans</option>
                {availablePlans.map(plan => (
                  <option key={plan} value={plan}>{plan}</option>
                ))}
              </select>
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:border-purple-500 focus:ring-1 focus:ring-purple-500"
              >
                <option value="all">All Status</option>
                <option value="active">Active</option>
                <option value="trial">Trial</option>
                <option value="expired">Expired</option>
                <option value="suspended">Suspended</option>
              </select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Subscriptions Table */}
      <Card className="backdrop-blur-sm bg-white/90 shadow-lg">
        <CardHeader>
          <CardTitle>User Subscriptions</CardTitle>
          <CardDescription>Manage all user plans and usage quotas</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[1200px]">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-4 font-semibold text-gray-900">User</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-900">Role</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-900">Current Plan</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-900">Subscription Period</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-900">Usage Quota</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-900">Status</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-900">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredSubscriptions.map((subscription, index) => (
                  <tr key={subscription.id} className={`border-b border-gray-100 hover:bg-gray-50 ${index % 2 === 0 ? 'bg-white' : 'bg-gray-50/50'}`}>
                    <td className="py-4 px-4">
                      <div>
                        <div className="font-medium text-gray-900">{subscription.userName}</div>
                        <div className="text-sm text-gray-500">{subscription.userEmail}</div>
                        <div className="text-xs text-gray-400 mt-1">
                          Joined: {new Date(subscription.joinedAt).toLocaleDateString()}
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      {getRoleBadge(subscription.role)}
                    </td>
                    <td className="py-4 px-4">
                      <div className="space-y-1">
                        <div className="font-medium text-gray-900">{subscription.currentPlan}</div>
                        <div className="flex items-center gap-2">
                          {getPlanTypeBadge(subscription.planType)}
                          {subscription.autoRenew && (
                            <Badge variant="outline" className="text-xs">
                              <RefreshCw className="w-3 h-3 mr-1" />
                              Auto-renew
                            </Badge>
                          )}
                        </div>
                        <div className="text-xs text-gray-500">
                          Total spent: £{subscription.totalSpent.toFixed(2)}
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2 text-sm">
                          <Calendar className="w-4 h-4 text-gray-400" />
                          <span>{new Date(subscription.startDate).toLocaleDateString()}</span>
                          <span className="text-gray-400">→</span>
                          <span className={isExpiringSoon(subscription.endDate) ? 'text-orange-600 font-medium' : ''}>
                            {new Date(subscription.endDate).toLocaleDateString()}
                          </span>
                        </div>
                        {isExpiringSoon(subscription.endDate) && (
                          <div className="text-xs text-orange-600 font-medium">
                            Expires in {Math.ceil((new Date(subscription.endDate).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24))} days
                          </div>
                        )}
                        <div className="text-xs text-gray-500">
                          Last active: {new Date(subscription.lastActivity).toLocaleDateString()}
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <div className="space-y-3">
                        <div>
                          <div className="flex items-center justify-between text-sm mb-1">
                            <span className="flex items-center gap-1">
                              <BookOpen className="w-3 h-3" />
                              Questions
                            </span>
                            <span>{subscription.remainingQuota.questions} / {subscription.totalQuota.questions}</span>
                          </div>
                          <Progress 
                            value={getQuestionUsagePercentage(subscription.remainingQuota.questions, subscription.totalQuota.questions)} 
                            className="h-2" 
                          />
                        </div>
                        <div>
                          <div className="flex items-center justify-between text-sm mb-1">
                            <span className="flex items-center gap-1">
                              <MessageSquare className="w-3 h-3" />
                              AI Messages
                            </span>
                            <span>{subscription.remainingQuota.aiMessages} / {subscription.totalQuota.aiMessages}</span>
                          </div>
                          <Progress 
                            value={getAIUsagePercentage(subscription.remainingQuota.aiMessages, subscription.totalQuota.aiMessages)} 
                            className="h-2" 
                          />
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      {getStatusBadge(subscription.status)}
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-2">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => {
                            setSelectedUser(subscription)
                            setIsAssignModalOpen(true)
                          }}
                        >
                          <CreditCard className="w-4 h-4 mr-1" />
                          Assign Plan
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => setEditingUser(subscription)}
                        >
                          <Edit className="w-4 h-4 mr-1" />
                          Update
                        </Button>
                        <Button
                          size="sm"
                          variant={subscription.status === 'suspended' ? 'default' : 'destructive'}
                          onClick={() => handleSuspendUser(subscription.id)}
                        >
                          {subscription.status === 'suspended' ? (
                            <>
                              <UserCheck className="w-4 h-4 mr-1" />
                              Unsuspend
                            </>
                          ) : (
                            <>
                              <Ban className="w-4 h-4 mr-1" />
                              Suspend
                            </>
                          )}
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

      {/* Assign Plan Modal */}
      {isAssignModalOpen && selectedUser && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <Card className="w-full max-w-md">
            <CardHeader>
              <CardTitle>Assign Plan</CardTitle>
              <CardDescription>
                Assign a new plan to {selectedUser.userName}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="plan">Select Plan</Label>
                <select
                  id="plan"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:border-purple-500 focus:ring-1 focus:ring-purple-500"
                  onChange={(e) => {
                    if (e.target.value) {
                      handleAssignPlan(selectedUser.id, e.target.value)
                    }
                  }}
                  defaultValue=""
                >
                  <option value="">Choose a plan...</option>
                  {availablePlans.map(plan => (
                    <option key={plan} value={plan}>{plan}</option>
                  ))}
                </select>
              </div>
              <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={() => setIsAssignModalOpen(false)}>
                  Cancel
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}