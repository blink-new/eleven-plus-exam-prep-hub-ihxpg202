import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card'
import { Button } from '../../components/ui/button'
import { Badge } from '../../components/ui/badge'
import { Input } from '../../components/ui/input'
import { 
  Search, 
  Filter, 
  Plus, 
  Edit, 
  Trash2, 
  RotateCcw, 
  Eye, 
  EyeOff,
  Calendar,
  Mail,
  User,
  Shield,
  Clock,
  ChevronLeft,
  ChevronRight,
  MoreVertical,
  UserCheck,
  UserX,
  Settings,
  GraduationCap,
  BookOpen,
  Users,
  ChevronDown,
  ChevronUp,
  X,
  Check,
  FileText,
  BarChart3,
  UserPlus,
  UserMinus,
  School,
  Target,
  Award,
  TrendingUp
} from 'lucide-react'

type Role = 'student' | 'teacher' | 'normal_user' | 'admin'

interface UserRole {
  role: Role
  assignedDate: string
  isActive: boolean
}

interface ClassInfo {
  id: string
  name: string
  subject: string
  studentsCount: number
  status: 'active' | 'inactive'
}

interface ExamInfo {
  id: string
  title: string
  subject: string
  score?: number
  status: 'completed' | 'pending' | 'in_progress'
  assignedDate: string
}

interface User {
  id: string
  name: string
  email: string
  roles: UserRole[]
  status: 'active' | 'inactive' | 'suspended'
  signupDate: string
  lastLogin: string
  avatar?: string
  // Role-specific data
  teacherData?: {
    classes: ClassInfo[]
    totalStudents: number
  }
  studentData?: {
    enrolledClasses: ClassInfo[]
    teachers: string[]
    attendance: number
  }
  normalUserData?: {
    assignedExams: ExamInfo[]
    completedExams: number
    averageScore: number
  }
}

const mockUsers: User[] = [
  {
    id: '1',
    name: 'Alex Johnson',
    email: 'alex.johnson@email.com',
    roles: [
      { role: 'teacher', assignedDate: '2024-01-15', isActive: true },
      { role: 'student', assignedDate: '2024-01-20', isActive: true },
      { role: 'normal_user', assignedDate: '2024-01-25', isActive: true }
    ],
    status: 'active',
    signupDate: '2024-01-15',
    lastLogin: '2 hours ago',
    teacherData: {
      classes: [
        { id: '1', name: 'Advanced Mathematics', subject: 'Mathematics', studentsCount: 25, status: 'active' },
        { id: '2', name: 'Basic Algebra', subject: 'Mathematics', studentsCount: 18, status: 'active' }
      ],
      totalStudents: 43
    },
    studentData: {
      enrolledClasses: [
        { id: '3', name: 'English Literature', subject: 'English', studentsCount: 20, status: 'active' }
      ],
      teachers: ['Sarah Williams'],
      attendance: 95
    },
    normalUserData: {
      assignedExams: [
        { id: '1', title: 'Math Quiz 1', subject: 'Mathematics', score: 85, status: 'completed', assignedDate: '2024-01-20' },
        { id: '2', title: 'English Test', subject: 'English', status: 'pending', assignedDate: '2024-01-25' }
      ],
      completedExams: 5,
      averageScore: 82
    }
  },
  {
    id: '2',
    name: 'Sarah Williams',
    email: 'sarah.williams@email.com',
    roles: [
      { role: 'teacher', assignedDate: '2024-01-10', isActive: true }
    ],
    status: 'active',
    signupDate: '2024-01-10',
    lastLogin: '1 day ago',
    teacherData: {
      classes: [
        { id: '4', name: 'English Literature', subject: 'English', studentsCount: 30, status: 'active' },
        { id: '5', name: 'Creative Writing', subject: 'English', studentsCount: 22, status: 'active' }
      ],
      totalStudents: 52
    }
  },
  {
    id: '3',
    name: 'Mike Brown',
    email: 'mike.brown@email.com',
    roles: [
      { role: 'normal_user', assignedDate: '2024-01-20', isActive: true }
    ],
    status: 'active',
    signupDate: '2024-01-20',
    lastLogin: '3 hours ago',
    normalUserData: {
      assignedExams: [
        { id: '3', title: 'Science Quiz', subject: 'Science', score: 78, status: 'completed', assignedDate: '2024-01-22' },
        { id: '4', title: 'History Test', subject: 'History', status: 'in_progress', assignedDate: '2024-01-24' }
      ],
      completedExams: 3,
      averageScore: 75
    }
  },
  {
    id: '4',
    name: 'Emma Davis',
    email: 'emma.davis@email.com',
    roles: [
      { role: 'student', assignedDate: '2024-01-05', isActive: false }
    ],
    status: 'inactive',
    signupDate: '2024-01-05',
    lastLogin: '1 week ago',
    studentData: {
      enrolledClasses: [
        { id: '6', name: 'Basic Mathematics', subject: 'Mathematics', studentsCount: 15, status: 'inactive' }
      ],
      teachers: ['Alex Johnson'],
      attendance: 60
    }
  },
  {
    id: '5',
    name: 'John Smith',
    email: 'john.smith@email.com',
    roles: [
      { role: 'admin', assignedDate: '2023-12-01', isActive: true }
    ],
    status: 'active',
    signupDate: '2023-12-01',
    lastLogin: '30 minutes ago'
  },
  {
    id: '6',
    name: 'Lisa Wilson',
    email: 'lisa.wilson@email.com',
    roles: [
      { role: 'teacher', assignedDate: '2024-01-12', isActive: false },
      { role: 'student', assignedDate: '2024-01-15', isActive: true }
    ],
    status: 'suspended',
    signupDate: '2024-01-12',
    lastLogin: '2 days ago',
    teacherData: {
      classes: [
        { id: '7', name: 'Physics Basics', subject: 'Physics', studentsCount: 12, status: 'inactive' }
      ],
      totalStudents: 12
    },
    studentData: {
      enrolledClasses: [
        { id: '8', name: 'Chemistry Lab', subject: 'Chemistry', studentsCount: 18, status: 'active' }
      ],
      teachers: ['Maria Garcia'],
      attendance: 45
    }
  },
  {
    id: '7',
    name: 'David Miller',
    email: 'david.miller@email.com',
    roles: [
      { role: 'student', assignedDate: '2024-01-18', isActive: true },
      { role: 'normal_user', assignedDate: '2024-01-20', isActive: true }
    ],
    status: 'active',
    signupDate: '2024-01-18',
    lastLogin: '5 hours ago',
    studentData: {
      enrolledClasses: [
        { id: '9', name: 'Advanced Physics', subject: 'Physics', studentsCount: 20, status: 'active' },
        { id: '10', name: 'Calculus', subject: 'Mathematics', studentsCount: 16, status: 'active' }
      ],
      teachers: ['Sarah Williams', 'Alex Johnson'],
      attendance: 88
    },
    normalUserData: {
      assignedExams: [
        { id: '5', title: 'Physics Final', subject: 'Physics', score: 92, status: 'completed', assignedDate: '2024-01-20' }
      ],
      completedExams: 8,
      averageScore: 87
    }
  },
  {
    id: '8',
    name: 'Jennifer Taylor',
    email: 'jennifer.taylor@email.com',
    roles: [
      { role: 'normal_user', assignedDate: '2024-01-22', isActive: true }
    ],
    status: 'active',
    signupDate: '2024-01-22',
    lastLogin: '1 hour ago',
    normalUserData: {
      assignedExams: [
        { id: '6', title: 'Biology Test', subject: 'Biology', status: 'pending', assignedDate: '2024-01-23' }
      ],
      completedExams: 2,
      averageScore: 79
    }
  },
  {
    id: '9',
    name: 'Robert Anderson',
    email: 'robert.anderson@email.com',
    roles: [
      { role: 'student', assignedDate: '2024-01-25', isActive: true }
    ],
    status: 'active',
    signupDate: '2024-01-25',
    lastLogin: '4 hours ago',
    studentData: {
      enrolledClasses: [
        { id: '11', name: 'World History', subject: 'History', studentsCount: 25, status: 'active' }
      ],
      teachers: ['Maria Garcia'],
      attendance: 92
    }
  },
  {
    id: '10',
    name: 'Maria Garcia',
    email: 'maria.garcia@email.com',
    roles: [
      { role: 'teacher', assignedDate: '2024-01-08', isActive: true },
      { role: 'normal_user', assignedDate: '2024-01-10', isActive: true }
    ],
    status: 'active',
    signupDate: '2024-01-08',
    lastLogin: '6 hours ago',
    teacherData: {
      classes: [
        { id: '12', name: 'World History', subject: 'History', studentsCount: 28, status: 'active' },
        { id: '13', name: 'Geography', subject: 'Geography', studentsCount: 24, status: 'active' }
      ],
      totalStudents: 52
    },
    normalUserData: {
      assignedExams: [
        { id: '7', title: 'Teaching Assessment', subject: 'Education', score: 95, status: 'completed', assignedDate: '2024-01-12' }
      ],
      completedExams: 4,
      averageScore: 91
    }
  }
]

export default function UserManagementPage() {
  const [users, setUsers] = useState<User[]>(mockUsers)
  const [searchTerm, setSearchTerm] = useState('')
  const [roleFilter, setRoleFilter] = useState('all')
  const [statusFilter, setStatusFilter] = useState('all')
  const [currentPage, setCurrentPage] = useState(1)
  const [showAddUserModal, setShowAddUserModal] = useState(false)
  const [selectedUser, setSelectedUser] = useState<User | null>(null)
  const [showRoleModal, setShowRoleModal] = useState(false)
  const [expandedRoles, setExpandedRoles] = useState<Set<Role>>(new Set())
  const [availableRoles] = useState<Role[]>(['student', 'teacher', 'normal_user', 'admin'])
  
  const usersPerPage = 10

  // Filter users based on search and filters
  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesRole = roleFilter === 'all' || user.roles.some(r => r.role === roleFilter && r.isActive)
    const matchesStatus = statusFilter === 'all' || user.status === statusFilter
    
    return matchesSearch && matchesRole && matchesStatus
  })

  // Pagination
  const totalPages = Math.ceil(filteredUsers.length / usersPerPage)
  const startIndex = (currentPage - 1) * usersPerPage
  const paginatedUsers = filteredUsers.slice(startIndex, startIndex + usersPerPage)

  const getRoleIcon = (role: string) => {
    switch (role) {
      case 'admin': return <Shield className="w-4 h-4" />
      case 'teacher': return <GraduationCap className="w-4 h-4" />
      case 'normal_user': return <User className="w-4 h-4" />
      case 'student': return <BookOpen className="w-4 h-4" />
      default: return <User className="w-4 h-4" />
    }
  }

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'admin': return 'bg-red-100 text-red-800 border-red-200'
      case 'teacher': return 'bg-blue-100 text-blue-800 border-blue-200'
      case 'normal_user': return 'bg-green-100 text-green-800 border-green-200'
      case 'student': return 'bg-purple-100 text-purple-800 border-purple-200'
      default: return 'bg-gray-100 text-gray-800 border-gray-200'
    }
  }

  const getRoleName = (role: string) => {
    switch (role) {
      case 'normal_user': return 'Normal User'
      default: return role.charAt(0).toUpperCase() + role.slice(1)
    }
  }

  const toggleRoleExpansion = (role: Role) => {
    const newExpanded = new Set(expandedRoles)
    if (newExpanded.has(role)) {
      newExpanded.delete(role)
    } else {
      newExpanded.add(role)
    }
    setExpandedRoles(newExpanded)
  }

  const handleRoleToggle = (userId: string, role: Role) => {
    setUsers(prevUsers => 
      prevUsers.map(user => {
        if (user.id === userId) {
          const existingRoleIndex = user.roles.findIndex(r => r.role === role)
          if (existingRoleIndex >= 0) {
            // Toggle existing role
            const updatedRoles = [...user.roles]
            updatedRoles[existingRoleIndex] = {
              ...updatedRoles[existingRoleIndex],
              isActive: !updatedRoles[existingRoleIndex].isActive
            }
            return { ...user, roles: updatedRoles }
          } else {
            // Add new role
            return {
              ...user,
              roles: [...user.roles, { role, assignedDate: new Date().toISOString().split('T')[0], isActive: true }]
            }
          }
        }
        return user
      })
    )
  }

  const removeRole = (userId: string, role: Role) => {
    setUsers(prevUsers => 
      prevUsers.map(user => {
        if (user.id === userId) {
          return {
            ...user,
            roles: user.roles.filter(r => r.role !== role)
          }
        }
        return user
      })
    )
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800'
      case 'inactive': return 'bg-gray-100 text-gray-800'
      case 'suspended': return 'bg-red-100 text-red-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const handleUserAction = (userId: string, action: string) => {
    setUsers(prevUsers => 
      prevUsers.map(user => {
        if (user.id === userId) {
          switch (action) {
            case 'activate':
              return { ...user, status: 'active' as const }
            case 'deactivate':
              return { ...user, status: 'inactive' as const }
            case 'suspend':
              return { ...user, status: 'suspended' as const }
            default:
              return user
          }
        }
        return user
      })
    )
  }

  const handleDeleteUser = (userId: string) => {
    if (confirm('Are you sure you want to delete this user? This action cannot be undone.')) {
      setUsers(prevUsers => prevUsers.filter(user => user.id !== userId))
    }
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">User Management</h1>
          <p className="text-gray-600 mt-1">Manage user accounts, roles, and permissions</p>
        </div>
        <Button 
          onClick={() => setShowAddUserModal(true)}
          className="gap-2 bg-purple-600 hover:bg-purple-700"
        >
          <Plus className="w-4 h-4" />
          Add User
        </Button>
      </div>

      {/* Search and Filters */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-4">
            {/* Search */}
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="Search by name or email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            
            {/* Role Filter */}
            <select 
              value={roleFilter}
              onChange={(e) => setRoleFilter(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:border-purple-500 focus:ring-1 focus:ring-purple-500"
            >
              <option value="all">All Roles</option>
              <option value="student">Students</option>
              <option value="teacher">Teachers</option>
              <option value="normal_user">Normal Users</option>
              <option value="admin">Admins</option>
            </select>
            
            {/* Status Filter */}
            <select 
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:border-purple-500 focus:ring-1 focus:ring-purple-500"
            >
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
              <option value="suspended">Suspended</option>
            </select>
            
            <Button variant="outline" className="gap-2">
              <Filter className="w-4 h-4" />
              More Filters
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Users Table */}
      <Card>
        <CardHeader>
          <CardTitle>Users ({filteredUsers.length})</CardTitle>
          <CardDescription>
            Showing {startIndex + 1}-{Math.min(startIndex + usersPerPage, filteredUsers.length)} of {filteredUsers.length} users
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-4 font-semibold text-gray-900">User</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-900">Role</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-900">Status</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-900">Last Login</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-900">Signup Date</th>
                  <th className="text-right py-3 px-4 font-semibold text-gray-900">Actions</th>
                </tr>
              </thead>
              <tbody>
                {paginatedUsers.map((user) => (
                  <tr key={user.id} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                          <User className="w-5 h-5 text-purple-600" />
                        </div>
                        <div>
                          <p className="font-medium text-gray-900">{user.name}</p>
                          <p className="text-sm text-gray-600">{user.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex flex-wrap gap-1">
                        {user.roles.filter(r => r.isActive).map((userRole, index) => (
                          <Badge key={index} className={`${getRoleColor(userRole.role)} flex items-center gap-1 w-fit border`}>
                            {getRoleIcon(userRole.role)}
                            {getRoleName(userRole.role)}
                          </Badge>
                        ))}
                        {user.roles.filter(r => r.isActive).length === 0 && (
                          <Badge className="bg-gray-100 text-gray-500 border-gray-200">No Active Roles</Badge>
                        )}
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <Badge className={getStatusColor(user.status)}>
                        {user.status.charAt(0).toUpperCase() + user.status.slice(1)}
                      </Badge>
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-1 text-sm text-gray-600">
                        <Clock className="w-4 h-4" />
                        {user.lastLogin}
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-1 text-sm text-gray-600">
                        <Calendar className="w-4 h-4" />
                        {new Date(user.signupDate).toLocaleDateString()}
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex items-center justify-end gap-2">
                        <Button 
                          size="sm" 
                          variant="ghost" 
                          title="Manage Roles"
                          onClick={() => {
                            setSelectedUser(user)
                            setShowRoleModal(true)
                          }}
                          className="text-purple-600 hover:text-purple-700"
                        >
                          <Settings className="w-4 h-4" />
                        </Button>
                        
                        <Button size="sm" variant="ghost" title="Edit User">
                          <Edit className="w-4 h-4" />
                        </Button>
                        
                        {user.status === 'active' ? (
                          <Button 
                            size="sm" 
                            variant="ghost" 
                            title="Deactivate User"
                            onClick={() => handleUserAction(user.id, 'deactivate')}
                          >
                            <EyeOff className="w-4 h-4" />
                          </Button>
                        ) : (
                          <Button 
                            size="sm" 
                            variant="ghost" 
                            title="Activate User"
                            onClick={() => handleUserAction(user.id, 'activate')}
                          >
                            <Eye className="w-4 h-4" />
                          </Button>
                        )}
                        
                        <Button size="sm" variant="ghost" title="Reset Password">
                          <RotateCcw className="w-4 h-4" />
                        </Button>
                        
                        <Button 
                          size="sm" 
                          variant="ghost" 
                          title="Delete User"
                          onClick={() => handleDeleteUser(user.id)}
                          className="text-red-600 hover:text-red-700"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="flex items-center justify-between mt-6 pt-4 border-t border-gray-200">
            <p className="text-sm text-gray-600">
              Showing {startIndex + 1} to {Math.min(startIndex + usersPerPage, filteredUsers.length)} of {filteredUsers.length} results
            </p>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
              >
                <ChevronLeft className="w-4 h-4" />
                Previous
              </Button>
              
              <div className="flex items-center gap-1">
                {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                  const pageNum = i + 1
                  return (
                    <Button
                      key={pageNum}
                      variant={currentPage === pageNum ? "default" : "outline"}
                      size="sm"
                      onClick={() => setCurrentPage(pageNum)}
                      className="w-8 h-8 p-0"
                    >
                      {pageNum}
                    </Button>
                  )
                })}
              </div>
              
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
              >
                Next
                <ChevronRight className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Add User Modal */}
      {showAddUserModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <Card className="w-full max-w-md mx-4">
            <CardHeader>
              <CardTitle>Add New User</CardTitle>
              <CardDescription>Create a new user account</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                <Input placeholder="Enter full name" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <Input type="email" placeholder="Enter email address" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Initial Role</label>
                <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:border-purple-500 focus:ring-1 focus:ring-purple-500">
                  <option value="student">Student</option>
                  <option value="teacher">Teacher</option>
                  <option value="normal_user">Normal User</option>
                  <option value="admin">Admin</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                <Input type="password" placeholder="Enter password" />
              </div>
              <div className="flex gap-3 pt-4">
                <Button 
                  onClick={() => setShowAddUserModal(false)}
                  variant="outline" 
                  className="flex-1"
                >
                  Cancel
                </Button>
                <Button className="flex-1 bg-purple-600 hover:bg-purple-700">
                  Create User
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Role Management Modal */}
      {showRoleModal && selectedUser && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <Card className="w-full max-w-4xl max-h-[90vh] overflow-hidden">
            <CardHeader className="bg-gradient-to-r from-purple-600 to-blue-600 text-white">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-xl">Manage User Roles</CardTitle>
                  <CardDescription className="text-purple-100">
                    {selectedUser.name} ({selectedUser.email})
                  </CardDescription>
                </div>
                <Button 
                  variant="ghost" 
                  size="sm"
                  onClick={() => {
                    setShowRoleModal(false)
                    setSelectedUser(null)
                    setExpandedRoles(new Set())
                  }}
                  className="text-white hover:bg-white/20"
                >
                  <X className="w-5 h-5" />
                </Button>
              </div>
            </CardHeader>
            
            <CardContent className="p-6 overflow-y-auto max-h-[calc(90vh-120px)]">
              {/* Role Assignment Section */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                  <UserPlus className="w-5 h-5 text-purple-600" />
                  Role Assignment
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {availableRoles.map(role => {
                    const userRole = selectedUser.roles.find(r => r.role === role)
                    const isAssigned = userRole !== undefined
                    const isActive = userRole?.isActive || false
                    
                    return (
                      <div key={role} className="flex flex-col gap-2">
                        <Button
                          variant={isAssigned && isActive ? "default" : "outline"}
                          size="sm"
                          onClick={() => handleRoleToggle(selectedUser.id, role)}
                          className={`flex items-center gap-2 ${
                            isAssigned && isActive 
                              ? 'bg-purple-600 hover:bg-purple-700' 
                              : isAssigned && !isActive
                              ? 'border-gray-300 text-gray-500'
                              : 'border-purple-200 hover:border-purple-400'
                          }`}
                        >
                          {getRoleIcon(role)}
                          {getRoleName(role)}
                          {isAssigned && isActive && <Check className="w-4 h-4" />}
                        </Button>
                        {isAssigned && (
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => removeRole(selectedUser.id, role)}
                            className="text-red-600 hover:text-red-700 text-xs"
                          >
                            <UserMinus className="w-3 h-3 mr-1" />
                            Remove
                          </Button>
                        )}
                      </div>
                    )
                  })}
                </div>
              </div>

              {/* Role-Specific Sections */}
              <div className="space-y-4">
                {selectedUser.roles.filter(r => r.isActive).map(userRole => (
                  <div key={userRole.role} className="border border-gray-200 rounded-lg overflow-hidden">
                    <button
                      onClick={() => toggleRoleExpansion(userRole.role)}
                      className="w-full px-4 py-3 bg-gray-50 hover:bg-gray-100 flex items-center justify-between transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <div className={`p-2 rounded-lg ${getRoleColor(userRole.role)}`}>
                          {getRoleIcon(userRole.role)}
                        </div>
                        <div className="text-left">
                          <h4 className="font-semibold text-gray-900">{getRoleName(userRole.role)} Role</h4>
                          <p className="text-sm text-gray-600">
                            Assigned on {new Date(userRole.assignedDate).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                      {expandedRoles.has(userRole.role) ? (
                        <ChevronUp className="w-5 h-5 text-gray-400" />
                      ) : (
                        <ChevronDown className="w-5 h-5 text-gray-400" />
                      )}
                    </button>

                    {expandedRoles.has(userRole.role) && (
                      <div className="p-4 bg-white">
                        {/* Teacher Role Section */}
                        {userRole.role === 'teacher' && selectedUser.teacherData && (
                          <div className="space-y-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              <div className="bg-blue-50 p-4 rounded-lg">
                                <div className="flex items-center gap-2 mb-2">
                                  <School className="w-5 h-5 text-blue-600" />
                                  <h5 className="font-semibold text-blue-900">Classes Created</h5>
                                </div>
                                <p className="text-2xl font-bold text-blue-600">
                                  {selectedUser.teacherData.classes.length}
                                </p>
                              </div>
                              <div className="bg-green-50 p-4 rounded-lg">
                                <div className="flex items-center gap-2 mb-2">
                                  <Users className="w-5 h-5 text-green-600" />
                                  <h5 className="font-semibold text-green-900">Total Students</h5>
                                </div>
                                <p className="text-2xl font-bold text-green-600">
                                  {selectedUser.teacherData.totalStudents}
                                </p>
                              </div>
                            </div>
                            
                            <div>
                              <h5 className="font-semibold mb-3 flex items-center gap-2">
                                <BookOpen className="w-4 h-4" />
                                Classes
                              </h5>
                              <div className="space-y-2">
                                {selectedUser.teacherData.classes.map(cls => (
                                  <div key={cls.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                                    <div>
                                      <p className="font-medium">{cls.name}</p>
                                      <p className="text-sm text-gray-600">{cls.subject} • {cls.studentsCount} students</p>
                                    </div>
                                    <div className="flex items-center gap-2">
                                      <Badge className={cls.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}>
                                        {cls.status}
                                      </Badge>
                                      <Button size="sm" variant="ghost">
                                        <Edit className="w-4 h-4" />
                                      </Button>
                                    </div>
                                  </div>
                                ))}
                              </div>
                            </div>
                          </div>
                        )}

                        {/* Student Role Section */}
                        {userRole.role === 'student' && selectedUser.studentData && (
                          <div className="space-y-4">
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                              <div className="bg-purple-50 p-4 rounded-lg">
                                <div className="flex items-center gap-2 mb-2">
                                  <BookOpen className="w-5 h-5 text-purple-600" />
                                  <h5 className="font-semibold text-purple-900">Enrolled Classes</h5>
                                </div>
                                <p className="text-2xl font-bold text-purple-600">
                                  {selectedUser.studentData.enrolledClasses.length}
                                </p>
                              </div>
                              <div className="bg-blue-50 p-4 rounded-lg">
                                <div className="flex items-center gap-2 mb-2">
                                  <GraduationCap className="w-5 h-5 text-blue-600" />
                                  <h5 className="font-semibold text-blue-900">Teachers</h5>
                                </div>
                                <p className="text-2xl font-bold text-blue-600">
                                  {selectedUser.studentData.teachers.length}
                                </p>
                              </div>
                              <div className="bg-green-50 p-4 rounded-lg">
                                <div className="flex items-center gap-2 mb-2">
                                  <TrendingUp className="w-5 h-5 text-green-600" />
                                  <h5 className="font-semibold text-green-900">Attendance</h5>
                                </div>
                                <p className="text-2xl font-bold text-green-600">
                                  {selectedUser.studentData.attendance}%
                                </p>
                              </div>
                            </div>
                            
                            <div>
                              <h5 className="font-semibold mb-3 flex items-center gap-2">
                                <School className="w-4 h-4" />
                                Enrolled Classes
                              </h5>
                              <div className="space-y-2">
                                {selectedUser.studentData.enrolledClasses.map(cls => (
                                  <div key={cls.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                                    <div>
                                      <p className="font-medium">{cls.name}</p>
                                      <p className="text-sm text-gray-600">{cls.subject}</p>
                                    </div>
                                    <Badge className={cls.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}>
                                      {cls.status}
                                    </Badge>
                                  </div>
                                ))}
                              </div>
                            </div>
                          </div>
                        )}

                        {/* Normal User Role Section */}
                        {userRole.role === 'normal_user' && selectedUser.normalUserData && (
                          <div className="space-y-4">
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                              <div className="bg-green-50 p-4 rounded-lg">
                                <div className="flex items-center gap-2 mb-2">
                                  <FileText className="w-5 h-5 text-green-600" />
                                  <h5 className="font-semibold text-green-900">Assigned Exams</h5>
                                </div>
                                <p className="text-2xl font-bold text-green-600">
                                  {selectedUser.normalUserData.assignedExams.length}
                                </p>
                              </div>
                              <div className="bg-blue-50 p-4 rounded-lg">
                                <div className="flex items-center gap-2 mb-2">
                                  <Award className="w-5 h-5 text-blue-600" />
                                  <h5 className="font-semibold text-blue-900">Completed</h5>
                                </div>
                                <p className="text-2xl font-bold text-blue-600">
                                  {selectedUser.normalUserData.completedExams}
                                </p>
                              </div>
                              <div className="bg-yellow-50 p-4 rounded-lg">
                                <div className="flex items-center gap-2 mb-2">
                                  <BarChart3 className="w-5 h-5 text-yellow-600" />
                                  <h5 className="font-semibold text-yellow-900">Average Score</h5>
                                </div>
                                <p className="text-2xl font-bold text-yellow-600">
                                  {selectedUser.normalUserData.averageScore}%
                                </p>
                              </div>
                            </div>
                            
                            <div>
                              <h5 className="font-semibold mb-3 flex items-center gap-2">
                                <Target className="w-4 h-4" />
                                Assigned Exams
                              </h5>
                              <div className="space-y-2">
                                {selectedUser.normalUserData.assignedExams.map(exam => (
                                  <div key={exam.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                                    <div>
                                      <p className="font-medium">{exam.title}</p>
                                      <p className="text-sm text-gray-600">
                                        {exam.subject} • Assigned {new Date(exam.assignedDate).toLocaleDateString()}
                                      </p>
                                    </div>
                                    <div className="flex items-center gap-2">
                                      <Badge className={
                                        exam.status === 'completed' ? 'bg-green-100 text-green-800' :
                                        exam.status === 'in_progress' ? 'bg-blue-100 text-blue-800' :
                                        'bg-yellow-100 text-yellow-800'
                                      }>
                                        {exam.status}
                                      </Badge>
                                      {exam.score && (
                                        <span className="text-sm font-medium text-gray-600">
                                          {exam.score}%
                                        </span>
                                      )}
                                      <Button size="sm" variant="ghost">
                                        <Eye className="w-4 h-4" />
                                      </Button>
                                    </div>
                                  </div>
                                ))}
                              </div>
                            </div>
                          </div>
                        )}

                        {/* Admin Role Section */}
                        {userRole.role === 'admin' && (
                          <div className="space-y-4">
                            <div className="bg-red-50 p-4 rounded-lg">
                              <div className="flex items-center gap-2 mb-2">
                                <Shield className="w-5 h-5 text-red-600" />
                                <h5 className="font-semibold text-red-900">Administrator Access</h5>
                              </div>
                              <p className="text-sm text-red-700">
                                This user has full administrative privileges including user management, 
                                system configuration, and content moderation capabilities.
                              </p>
                            </div>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}