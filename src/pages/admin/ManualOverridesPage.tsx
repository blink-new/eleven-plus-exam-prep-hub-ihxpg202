import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Button } from '../../components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card'
import { Badge } from '../../components/ui/badge'
import { Input } from '../../components/ui/input'
import { Textarea } from '../../components/ui/textarea'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '../../components/ui/dialog'
import { 
  ArrowLeft,
  Search,
  Edit,
  History,
  Shield,
  User,
  Settings,
  AlertTriangle,
  CheckCircle
} from 'lucide-react'

interface UserOverride {
  id: string
  userId: string
  userName: string
  userEmail: string
  userType: 'Normal' | 'Teacher' | 'Student'
  currentPlan: string
  overrides: {
    maxQuestions?: number
    aiMessagesPerDay?: number
    maxClasses?: number
    maxStudentsPerClass?: number
  }
  remarks: string
  createdBy: string
  createdAt: string
  status: 'Active' | 'Expired' | 'Pending'
}

interface AuditLog {
  id: string
  action: string
  userId: string
  userName: string
  adminName: string
  changes: string
  timestamp: string
  reason: string
}

const mockOverrides: UserOverride[] = [
  {
    id: '1',
    userId: 'user_001',
    userName: 'Sarah Johnson',
    userEmail: 'sarah.johnson@school.edu',
    userType: 'Teacher',
    currentPlan: 'Monthly',
    overrides: {
      maxQuestions: 200,
      aiMessagesPerDay: 100,
      maxClasses: 15,
      maxStudentsPerClass: 50
    },
    remarks: 'Special accommodation for advanced mathematics teacher with large class sizes',
    createdBy: 'Admin User',
    createdAt: '2024-01-15',
    status: 'Active'
  },
  {
    id: '2',
    userId: 'user_002',
    userName: 'Alex Chen',
    userEmail: 'alex.chen@email.com',
    userType: 'Normal',
    currentPlan: 'Free Trial',
    overrides: {
      maxQuestions: 50,
      aiMessagesPerDay: 25
    },
    remarks: 'Beta tester - extended trial limits for feedback collection',
    createdBy: 'Admin User',
    createdAt: '2024-01-18',
    status: 'Active'
  }
]

const mockAuditLogs: AuditLog[] = [
  {
    id: '1',
    action: 'Override Created',
    userId: 'user_001',
    userName: 'Sarah Johnson',
    adminName: 'Admin User',
    changes: 'Set maxQuestions: 200, aiMessagesPerDay: 100, maxClasses: 15',
    timestamp: '2024-01-15 10:30:00',
    reason: 'Special accommodation for advanced mathematics teacher'
  },
  {
    id: '2',
    action: 'Override Updated',
    userId: 'user_002',
    userName: 'Alex Chen',
    adminName: 'Admin User',
    changes: 'Updated aiMessagesPerDay from 20 to 25',
    timestamp: '2024-01-18 14:15:00',
    reason: 'Increased limit for beta testing feedback'
  }
]

export default function ManualOverridesPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedUser, setSelectedUser] = useState<UserOverride | null>(null)
  const [isOverrideModalOpen, setIsOverrideModalOpen] = useState(false)
  const [isAuditModalOpen, setIsAuditModalOpen] = useState(false)
  const [overrideForm, setOverrideForm] = useState({
    maxQuestions: '',
    aiMessagesPerDay: '',
    maxClasses: '',
    maxStudentsPerClass: '',
    remarks: ''
  })

  const filteredOverrides = mockOverrides.filter(override =>
    override.userName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    override.userEmail.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const handleEditOverride = (override: UserOverride) => {
    setSelectedUser(override)
    setOverrideForm({
      maxQuestions: override.overrides.maxQuestions?.toString() || '',
      aiMessagesPerDay: override.overrides.aiMessagesPerDay?.toString() || '',
      maxClasses: override.overrides.maxClasses?.toString() || '',
      maxStudentsPerClass: override.overrides.maxStudentsPerClass?.toString() || '',
      remarks: override.remarks
    })
    setIsOverrideModalOpen(true)
  }

  const handleSaveOverride = () => {
    console.log('Saving override:', { selectedUser, overrideForm })
    setIsOverrideModalOpen(false)
    setSelectedUser(null)
    setOverrideForm({
      maxQuestions: '',
      aiMessagesPerDay: '',
      maxClasses: '',
      maxStudentsPerClass: '',
      remarks: ''
    })
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active': return 'bg-green-100 text-green-800 border-green-200'
      case 'Expired': return 'bg-red-100 text-red-800 border-red-200'
      case 'Pending': return 'bg-yellow-100 text-yellow-800 border-yellow-200'
      default: return 'bg-gray-100 text-gray-800 border-gray-200'
    }
  }

  const getUserTypeColor = (userType: string) => {
    switch (userType) {
      case 'Teacher': return 'bg-blue-100 text-blue-800'
      case 'Student': return 'bg-green-100 text-green-800'
      case 'Normal': return 'bg-gray-100 text-gray-800'
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
                <div className="w-10 h-10 bg-gradient-to-br from-red-500 to-pink-600 rounded-lg flex items-center justify-center">
                  <Shield className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h1 className="text-xl font-bold text-gray-900">Manual Overrides</h1>
                  <p className="text-sm text-gray-600">Power admin tools for special cases</p>
                </div>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <Dialog open={isAuditModalOpen} onOpenChange={setIsAuditModalOpen}>
                <DialogTrigger asChild>
                  <Button variant="outline" size="sm">
                    <History className="w-4 h-4 mr-2" />
                    Audit Log
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
                  <DialogHeader>
                    <DialogTitle>Override Audit Log</DialogTitle>
                    <DialogDescription>
                      Complete history of all override changes and administrative actions
                    </DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4">
                    {mockAuditLogs.map((log) => (
                      <div key={log.id} className="border border-gray-200 rounded-lg p-4">
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center gap-2">
                            <Badge className={
                              log.action.includes('Created') ? 'bg-green-100 text-green-800' :
                              log.action.includes('Updated') ? 'bg-blue-100 text-blue-800' :
                              'bg-red-100 text-red-800'
                            }>
                              {log.action}
                            </Badge>
                            <span className="text-sm font-medium text-gray-900">{log.userName}</span>
                          </div>
                          <span className="text-xs text-gray-500">{log.timestamp}</span>
                        </div>
                        <div className="text-sm text-gray-700 mb-2">{log.changes}</div>
                        <div className="text-xs text-gray-600">
                          <span className="font-medium">Admin:</span> {log.adminName} • 
                          <span className="font-medium"> Reason:</span> {log.reason}
                        </div>
                      </div>
                    ))}
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto p-6 space-y-6">
        {/* Search and Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card className="md:col-span-2 bg-white/80 backdrop-blur-sm border-0 shadow-lg">
            <CardContent className="p-6">
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <Search className="w-5 h-5 text-gray-400" />
                  <h3 className="font-semibold text-gray-900">Search Users</h3>
                </div>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <Input
                    placeholder="Search by name or email..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-green-600">Active Overrides</p>
                  <p className="text-3xl font-bold text-green-900">{mockOverrides.filter(o => o.status === 'Active').length}</p>
                </div>
                <div className="w-12 h-12 bg-green-500 rounded-lg flex items-center justify-center">
                  <CheckCircle className="w-6 h-6 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-blue-600">Total Users</p>
                  <p className="text-3xl font-bold text-blue-900">{mockOverrides.length}</p>
                </div>
                <div className="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center">
                  <User className="w-6 h-6 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Overrides Table */}
        <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
          <CardHeader className="bg-gradient-to-r from-slate-50 to-blue-50 rounded-t-lg">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Settings className="w-5 h-5 text-slate-600" />
                <div>
                  <CardTitle className="text-slate-900">User Overrides</CardTitle>
                  <CardDescription>Manage special user permissions and limits</CardDescription>
                </div>
              </div>
              <Badge variant="outline" className="text-slate-600">
                {filteredOverrides.length} users
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
                      Current Plan
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Overrides
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Created
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredOverrides.map((override, index) => (
                    <tr key={override.id} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                            <User className="w-5 h-5 text-gray-600" />
                          </div>
                          <div>
                            <div className="text-sm font-medium text-gray-900">{override.userName}</div>
                            <div className="text-sm text-gray-500">{override.userEmail}</div>
                            <Badge className={`text-xs mt-1 ${getUserTypeColor(override.userType)}`}>
                              {override.userType}
                            </Badge>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <Badge variant="outline">{override.currentPlan}</Badge>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="space-y-1">
                          {override.overrides.maxQuestions && (
                            <div className="text-xs text-gray-600">
                              Questions: {override.overrides.maxQuestions}
                            </div>
                          )}
                          {override.overrides.aiMessagesPerDay && (
                            <div className="text-xs text-gray-600">
                              AI Messages: {override.overrides.aiMessagesPerDay}/day
                            </div>
                          )}
                          {override.overrides.maxClasses && (
                            <div className="text-xs text-gray-600">
                              Classes: {override.overrides.maxClasses}
                            </div>
                          )}
                          {override.overrides.maxStudentsPerClass && (
                            <div className="text-xs text-gray-600">
                              Students/Class: {override.overrides.maxStudentsPerClass}
                            </div>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <Badge className={getStatusColor(override.status)}>
                          {override.status}
                        </Badge>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{override.createdAt}</div>
                        <div className="text-xs text-gray-500">by {override.createdBy}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleEditOverride(override)}
                          className="text-blue-600 hover:text-blue-700"
                        >
                          <Edit className="w-4 h-4 mr-1" />
                          Edit
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        {/* Override Form Modal */}
        <Dialog open={isOverrideModalOpen} onOpenChange={setIsOverrideModalOpen}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Edit User Override</DialogTitle>
              <DialogDescription>
                {selectedUser && `Modify limits for ${selectedUser.userName} (${selectedUser.userEmail})`}
              </DialogDescription>
            </DialogHeader>
            
            <div className="space-y-6">
              {/* Current Plan Info */}
              {selectedUser && (
                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-medium text-gray-900">Current Plan: {selectedUser.currentPlan}</div>
                      <div className="text-sm text-gray-600">User Type: {selectedUser.userType}</div>
                    </div>
                    <Badge className={getStatusColor(selectedUser.status)}>
                      {selectedUser.status}
                    </Badge>
                  </div>
                </div>
              )}

              {/* Override Form */}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">Max Questions/Month</label>
                  <Input
                    type="number"
                    placeholder="Leave empty for default"
                    value={overrideForm.maxQuestions}
                    onChange={(e) => setOverrideForm(prev => ({ ...prev, maxQuestions: e.target.value }))}
                  />
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">AI Messages/Day</label>
                  <Input
                    type="number"
                    placeholder="Leave empty for default"
                    value={overrideForm.aiMessagesPerDay}
                    onChange={(e) => setOverrideForm(prev => ({ ...prev, aiMessagesPerDay: e.target.value }))}
                  />
                </div>
                
                {selectedUser?.userType === 'Teacher' && (
                  <>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-700">Max Classes</label>
                      <Input
                        type="number"
                        placeholder="Leave empty for default"
                        value={overrideForm.maxClasses}
                        onChange={(e) => setOverrideForm(prev => ({ ...prev, maxClasses: e.target.value }))}
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-700">Max Students/Class</label>
                      <Input
                        type="number"
                        placeholder="Leave empty for default"
                        value={overrideForm.maxStudentsPerClass}
                        onChange={(e) => setOverrideForm(prev => ({ ...prev, maxStudentsPerClass: e.target.value }))}
                      />
                    </div>
                  </>
                )}
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Remarks (Required for Audit Trail)</label>
                <Textarea
                  placeholder="Explain the reason for this override..."
                  value={overrideForm.remarks}
                  onChange={(e) => setOverrideForm(prev => ({ ...prev, remarks: e.target.value }))}
                  rows={3}
                />
              </div>
              
              <div className="flex items-center gap-2 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                <AlertTriangle className="w-5 h-5 text-yellow-600" />
                <div className="text-sm text-yellow-800">
                  <strong>Warning:</strong> These overrides will take effect immediately and will be logged for audit purposes.
                </div>
              </div>
              
              <div className="flex justify-end gap-3">
                <Button 
                  variant="outline" 
                  onClick={() => setIsOverrideModalOpen(false)}
                >
                  Cancel
                </Button>
                <Button 
                  onClick={handleSaveOverride}
                  disabled={!overrideForm.remarks.trim()}
                  className="bg-red-600 hover:bg-red-700"
                >
                  Save Override
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  )
}