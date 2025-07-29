import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from '../../components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card'
import { Badge } from '../../components/ui/badge'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../components/ui/select'
import { 
  ArrowLeft,
  Users,
  Eye,
  Shield,
  Search,
  Filter,
  ChevronDown,
  ChevronRight,
  BookOpen,
  Clock,
  TrendingUp,
  AlertCircle,
  CheckCircle,
  UserCheck
} from 'lucide-react'

interface Teacher {
  id: string
  name: string
  email: string
  status: 'Active' | 'Inactive' | 'Suspended'
  joinDate: string
  lastActive: string
  totalClasses: number
  totalStudents: number
  avgClassSize: number
  performance: number
  classes: Class[]
}

interface Class {
  id: string
  name: string
  subject: string
  students: number
  createdDate: string
  lastActivity: string
  status: 'Active' | 'Inactive'
}

export default function TeacherMonitoringPage() {
  const navigate = useNavigate()
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [subjectFilter, setSubjectFilter] = useState('all')
  const [expandedTeacher, setExpandedTeacher] = useState<string | null>(null)

  // Mock teacher data
  const teachers: Teacher[] = [
    {
      id: 'teacher-1',
      name: 'Sarah Johnson',
      email: 'sarah.johnson@school.edu',
      status: 'Active',
      joinDate: '2023-09-15',
      lastActive: '2024-01-20 14:30',
      totalClasses: 8,
      totalStudents: 156,
      avgClassSize: 19.5,
      performance: 92.3,
      classes: [
        {
          id: 'class-1',
          name: 'Year 6 Mathematics Advanced',
          subject: 'Mathematics',
          students: 24,
          createdDate: '2023-09-20',
          lastActivity: '2024-01-20 10:15',
          status: 'Active'
        },
        {
          id: 'class-2',
          name: 'Year 5 Mathematics Foundation',
          subject: 'Mathematics',
          students: 18,
          createdDate: '2023-10-05',
          lastActivity: '2024-01-19 15:45',
          status: 'Active'
        }
      ]
    },
    {
      id: 'teacher-2',
      name: 'Michael Chen',
      email: 'michael.chen@school.edu',
      status: 'Active',
      joinDate: '2023-08-22',
      lastActive: '2024-01-20 16:45',
      totalClasses: 6,
      totalStudents: 134,
      avgClassSize: 22.3,
      performance: 88.7,
      classes: [
        {
          id: 'class-3',
          name: 'English Comprehension Plus',
          subject: 'English',
          students: 26,
          createdDate: '2023-09-01',
          lastActivity: '2024-01-20 11:30',
          status: 'Active'
        },
        {
          id: 'class-4',
          name: 'Creative Writing Workshop',
          subject: 'English',
          students: 15,
          createdDate: '2023-11-10',
          lastActivity: '2024-01-18 14:20',
          status: 'Active'
        }
      ]
    },
    {
      id: 'teacher-3',
      name: 'Emma Williams',
      email: 'emma.williams@school.edu',
      status: 'Inactive',
      joinDate: '2023-07-10',
      lastActive: '2024-01-15 09:20',
      totalClasses: 4,
      totalStudents: 89,
      avgClassSize: 22.3,
      performance: 85.2,
      classes: [
        {
          id: 'class-5',
          name: 'Verbal Reasoning Mastery',
          subject: 'Verbal Reasoning',
          students: 20,
          createdDate: '2023-08-15',
          lastActivity: '2024-01-15 13:45',
          status: 'Inactive'
        }
      ]
    }
  ]

  const filteredTeachers = teachers.filter(teacher => {
    const matchesSearch = teacher.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         teacher.email.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === 'all' || teacher.status.toLowerCase() === statusFilter
    const matchesSubject = subjectFilter === 'all' || 
                          teacher.classes.some(cls => cls.subject.toLowerCase().includes(subjectFilter))
    
    return matchesSearch && matchesStatus && matchesSubject
  })

  const toggleExpanded = (teacherId: string) => {
    setExpandedTeacher(expandedTeacher === teacherId ? null : teacherId)
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active': return 'bg-green-100 text-green-800'
      case 'Inactive': return 'bg-yellow-100 text-yellow-800'
      case 'Suspended': return 'bg-red-100 text-red-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getPerformanceColor = (performance: number) => {
    if (performance >= 90) return 'text-green-600'
    if (performance >= 80) return 'text-yellow-600'
    return 'text-red-600'
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-4">
              <button 
                onClick={() => navigate('/admin/overview')}
                className="flex items-center gap-2 text-gray-600 hover:text-purple-600"
              >
                <ArrowLeft className="w-5 h-5" />
                <span>Back to Admin</span>
              </button>
            </div>
            
            <div className="flex items-center gap-3">
              <div className="p-2 bg-purple-600 rounded-lg">
                <UserCheck className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">Teacher Monitoring</h1>
                <p className="text-xs text-gray-600">Monitor teacher activities and class management</p>
              </div>
            </div>

            <div className="w-32"></div> {/* Spacer for centering */}
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Teachers</p>
                  <p className="text-2xl font-bold text-gray-900">{teachers.length}</p>
                </div>
                <div className="p-3 bg-blue-100 rounded-lg">
                  <Users className="w-6 h-6 text-blue-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Active Teachers</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {teachers.filter(t => t.status === 'Active').length}
                  </p>
                </div>
                <div className="p-3 bg-green-100 rounded-lg">
                  <CheckCircle className="w-6 h-6 text-green-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Classes</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {teachers.reduce((sum, t) => sum + t.totalClasses, 0)}
                  </p>
                </div>
                <div className="p-3 bg-purple-100 rounded-lg">
                  <BookOpen className="w-6 h-6 text-purple-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Students</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {teachers.reduce((sum, t) => sum + t.totalStudents, 0)}
                  </p>
                </div>
                <div className="p-3 bg-orange-100 rounded-lg">
                  <TrendingUp className="w-6 h-6 text-orange-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Search and Filters */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Search className="w-5 h-5 text-purple-600" />
              Search & Filter Teachers
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <input
                    type="text"
                    placeholder="Search by name or email..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  />
                </div>
              </div>
              
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="inactive">Inactive</SelectItem>
                  <SelectItem value="suspended">Suspended</SelectItem>
                </SelectContent>
              </Select>

              <Select value={subjectFilter} onValueChange={setSubjectFilter}>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="Filter by subject" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Subjects</SelectItem>
                  <SelectItem value="mathematics">Mathematics</SelectItem>
                  <SelectItem value="english">English</SelectItem>
                  <SelectItem value="verbal">Verbal Reasoning</SelectItem>
                  <SelectItem value="non-verbal">Non-Verbal Reasoning</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Teachers Table */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="w-5 h-5 text-purple-600" />
              Teacher Overview
            </CardTitle>
            <CardDescription>
              Monitor teacher activities, class management, and performance metrics
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {filteredTeachers.map((teacher) => (
                <div key={teacher.id} className="border border-gray-200 rounded-lg">
                  {/* Teacher Summary Row */}
                  <div className="p-4 hover:bg-gray-50 cursor-pointer" onClick={() => toggleExpanded(teacher.id)}>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <button className="text-gray-400 hover:text-gray-600">
                          {expandedTeacher === teacher.id ? (
                            <ChevronDown className="w-5 h-5" />
                          ) : (
                            <ChevronRight className="w-5 h-5" />
                          )}
                        </button>
                        
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                            <span className="text-purple-600 font-semibold text-sm">
                              {teacher.name.split(' ').map(n => n[0]).join('')}
                            </span>
                          </div>
                          <div>
                            <h3 className="font-semibold text-gray-900">{teacher.name}</h3>
                            <p className="text-sm text-gray-600">{teacher.email}</p>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-6">
                        <div className="text-center">
                          <p className="text-sm font-medium text-gray-900">{teacher.totalClasses}</p>
                          <p className="text-xs text-gray-600">Classes</p>
                        </div>
                        
                        <div className="text-center">
                          <p className="text-sm font-medium text-gray-900">{teacher.totalStudents}</p>
                          <p className="text-xs text-gray-600">Students</p>
                        </div>
                        
                        <div className="text-center">
                          <p className={`text-sm font-medium ${getPerformanceColor(teacher.performance)}`}>
                            {teacher.performance}%
                          </p>
                          <p className="text-xs text-gray-600">Performance</p>
                        </div>
                        
                        <Badge className={getStatusColor(teacher.status)}>
                          {teacher.status}
                        </Badge>

                        <div className="flex items-center gap-2">
                          <Button size="sm" variant="outline" className="gap-1">
                            <Eye className="w-4 h-4" />
                            View
                          </Button>
                          <Button size="sm" variant="outline" className="gap-1">
                            <Shield className="w-4 h-4" />
                            Moderate
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Expanded Class Details */}
                  {expandedTeacher === teacher.id && (
                    <div className="border-t bg-gray-50 p-4">
                      <div className="mb-4">
                        <h4 className="font-semibold text-gray-900 mb-2">Teacher Details</h4>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                          <div>
                            <span className="text-gray-600">Join Date:</span>
                            <p className="font-medium">{new Date(teacher.joinDate).toLocaleDateString()}</p>
                          </div>
                          <div>
                            <span className="text-gray-600">Last Active:</span>
                            <p className="font-medium">{teacher.lastActive}</p>
                          </div>
                          <div>
                            <span className="text-gray-600">Avg Class Size:</span>
                            <p className="font-medium">{teacher.avgClassSize} students</p>
                          </div>
                          <div>
                            <span className="text-gray-600">Performance:</span>
                            <p className={`font-medium ${getPerformanceColor(teacher.performance)}`}>
                              {teacher.performance}%
                            </p>
                          </div>
                        </div>
                      </div>

                      <div>
                        <h4 className="font-semibold text-gray-900 mb-3">Classes ({teacher.classes.length})</h4>
                        <div className="space-y-2">
                          {teacher.classes.map((cls) => (
                            <div key={cls.id} className="bg-white p-3 rounded-lg border">
                              <div className="flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                  <div className="p-2 bg-blue-100 rounded-lg">
                                    <BookOpen className="w-4 h-4 text-blue-600" />
                                  </div>
                                  <div>
                                    <h5 className="font-medium text-gray-900">{cls.name}</h5>
                                    <p className="text-sm text-gray-600">{cls.subject} • {cls.students} students</p>
                                  </div>
                                </div>
                                
                                <div className="flex items-center gap-4">
                                  <div className="text-right text-sm">
                                    <p className="text-gray-600">Created: {new Date(cls.createdDate).toLocaleDateString()}</p>
                                    <p className="text-gray-600">Last Activity: {cls.lastActivity}</p>
                                  </div>
                                  
                                  <Badge className={getStatusColor(cls.status)}>
                                    {cls.status}
                                  </Badge>
                                  
                                  <div className="flex items-center gap-1">
                                    <Button size="sm" variant="outline">
                                      View Class
                                    </Button>
                                  </div>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {filteredTeachers.length === 0 && (
              <div className="text-center py-8">
                <AlertCircle className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No teachers found</h3>
                <p className="text-gray-600">Try adjusting your search criteria or filters.</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}