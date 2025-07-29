import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card'
import { Button } from '../../components/ui/button'
import { Badge } from '../../components/ui/badge'
import { Input } from '../../components/ui/input'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../components/ui/tabs'
import { 
  Users, 
  Search, 
  Filter, 
  Plus,
  Edit,
  Trash2,
  Mail,
  Key,
  UserCheck,
  UserX,
  Download,
  Upload,
  MoreHorizontal
} from 'lucide-react'

export default function UserManagement1Page() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedRole, setSelectedRole] = useState('all')
  const [selectedStatus, setSelectedStatus] = useState('all')

  const users = [
    {
      id: 1,
      name: 'John Smith',
      email: 'john.smith@email.com',
      roles: ['Teacher', 'Normal User'],
      status: 'Active',
      lastLogin: '2024-01-15 10:30 AM',
      joinDate: '2023-12-01',
      performance: 85
    },
    {
      id: 2,
      name: 'Sarah Johnson',
      email: 'sarah.j@email.com',
      roles: ['Student'],
      status: 'Active',
      lastLogin: '2024-01-15 09:15 AM',
      joinDate: '2024-01-10',
      performance: 92
    },
    {
      id: 3,
      name: 'Mike Wilson',
      email: 'mike.wilson@email.com',
      roles: ['Normal User'],
      status: 'Inactive',
      lastLogin: '2024-01-10 02:45 PM',
      joinDate: '2023-11-15',
      performance: 78
    },
    {
      id: 4,
      name: 'Emily Davis',
      email: 'emily.davis@email.com',
      roles: ['Teacher', 'Student'],
      status: 'Pending',
      lastLogin: 'Never',
      joinDate: '2024-01-14',
      performance: 0
    }
  ]

  const roleStats = {
    normal: { count: 2156, growth: '+12%' },
    teacher: { count: 691, growth: '+8%' },
    student: { count: 1834, growth: '+15%' },
    admin: { count: 12, growth: '+0%' }
  }

  const getRoleBadgeColor = (role: string) => {
    switch (role) {
      case 'Admin': return 'bg-red-100 text-red-800'
      case 'Teacher': return 'bg-blue-100 text-blue-800'
      case 'Student': return 'bg-green-100 text-green-800'
      case 'Normal User': return 'bg-gray-100 text-gray-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getStatusBadgeColor = (status: string) => {
    switch (status) {
      case 'Active': return 'bg-green-100 text-green-800'
      case 'Inactive': return 'bg-gray-100 text-gray-800'
      case 'Pending': return 'bg-yellow-100 text-yellow-800'
      case 'Suspended': return 'bg-red-100 text-red-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesRole = selectedRole === 'all' || user.roles.some(role => 
      role.toLowerCase().replace(' ', '') === selectedRole
    )
    const matchesStatus = selectedStatus === 'all' || user.status.toLowerCase() === selectedStatus
    
    return matchesSearch && matchesRole && matchesStatus
  })

  return (
    <div className="p-6 space-y-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Admin User Management1</h1>
          <p className="text-gray-600 mt-1">View, search, and filter all users with role management</p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" size="sm">
            <Upload className="w-4 h-4 mr-2" />
            Import Users
          </Button>
          <Button variant="outline" size="sm">
            <Download className="w-4 h-4 mr-2" />
            Export Data
          </Button>
          <Button size="sm">
            <Plus className="w-4 h-4 mr-2" />
            Add User
          </Button>
        </div>
      </div>

      {/* Role Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Normal Users</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{roleStats.normal.count.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-600">{roleStats.normal.growth}</span> from last month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Teachers</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{roleStats.teacher.count.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-600">{roleStats.teacher.growth}</span> from last month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Students</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{roleStats.student.count.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-600">{roleStats.student.growth}</span> from last month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Admins</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{roleStats.admin.count}</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-gray-600">{roleStats.admin.growth}</span> from last month
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Search and Filters */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Search className="w-5 h-5" />
            Search & Filter Users
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <Input
                placeholder="Search by name or email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full"
              />
            </div>
            <div className="flex gap-2">
              <select 
                value={selectedRole} 
                onChange={(e) => setSelectedRole(e.target.value)}
                className="border border-gray-300 rounded-lg px-3 py-2 text-sm"
              >
                <option value="all">All Roles</option>
                <option value="normaluser">Normal User</option>
                <option value="teacher">Teacher</option>
                <option value="student">Student</option>
                <option value="admin">Admin</option>
              </select>
              
              <select 
                value={selectedStatus} 
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="border border-gray-300 rounded-lg px-3 py-2 text-sm"
              >
                <option value="all">All Status</option>
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
                <option value="pending">Pending</option>
                <option value="suspended">Suspended</option>
              </select>
              
              <Button variant="outline" size="sm">
                <Filter className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Role Management Tabs */}
      <Card>
        <CardHeader>
          <CardTitle>Role Management</CardTitle>
          <CardDescription>Manage user roles with tabbed interface</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="all" className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="all">All Users</TabsTrigger>
              <TabsTrigger value="normal">Normal</TabsTrigger>
              <TabsTrigger value="teacher">Teacher</TabsTrigger>
              <TabsTrigger value="student">Student</TabsTrigger>
            </TabsList>
            
            <TabsContent value="all" className="mt-6">
              <div className="space-y-4">
                {filteredUsers.map((user) => (
                  <div key={user.id} className="flex items-center justify-between p-4 border rounded-lg bg-white">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                        <Users className="w-5 h-5 text-purple-600" />
                      </div>
                      <div>
                        <h3 className="font-medium text-gray-900">{user.name}</h3>
                        <p className="text-sm text-gray-600">{user.email}</p>
                        <div className="flex items-center gap-2 mt-1">
                          {user.roles.map((role, index) => (
                            <Badge key={index} className={`text-xs ${getRoleBadgeColor(role)}`}>
                              {role}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-4">
                      <div className="text-right">
                        <Badge className={`text-xs ${getStatusBadgeColor(user.status)}`}>
                          {user.status}
                        </Badge>
                        <p className="text-xs text-gray-500 mt-1">Last: {user.lastLogin}</p>
                        <p className="text-xs text-gray-500">Performance: {user.performance}%</p>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        <Button variant="outline" size="sm">
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button variant="outline" size="sm">
                          <Mail className="w-4 h-4" />
                        </Button>
                        <Button variant="outline" size="sm">
                          <Key className="w-4 h-4" />
                        </Button>
                        <Button variant="outline" size="sm">
                          <MoreHorizontal className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="normal" className="mt-6">
              <div className="text-center py-8">
                <Users className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">Normal Users</h3>
                <p className="text-gray-600">Manage normal user accounts and permissions</p>
              </div>
            </TabsContent>
            
            <TabsContent value="teacher" className="mt-6">
              <div className="text-center py-8">
                <Users className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">Teachers</h3>
                <p className="text-gray-600">Manage teacher accounts and class assignments</p>
              </div>
            </TabsContent>
            
            <TabsContent value="student" className="mt-6">
              <div className="text-center py-8">
                <Users className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">Students</h3>
                <p className="text-gray-600">Manage student accounts and progress tracking</p>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
          <CardDescription>Common user management tasks</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Button variant="outline" className="h-auto p-4 flex flex-col gap-2">
              <UserCheck className="w-5 h-5" />
              <span className="text-sm">Activate Users</span>
            </Button>
            <Button variant="outline" className="h-auto p-4 flex flex-col gap-2">
              <UserX className="w-5 h-5" />
              <span className="text-sm">Deactivate Users</span>
            </Button>
            <Button variant="outline" className="h-auto p-4 flex flex-col gap-2">
              <Key className="w-5 h-5" />
              <span className="text-sm">Reset Passwords</span>
            </Button>
            <Button variant="outline" className="h-auto p-4 flex flex-col gap-2">
              <Mail className="w-5 h-5" />
              <span className="text-sm">Send Verification</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}