import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Button } from '../components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card'
import { Badge } from '../components/ui/badge'
import { Input } from '../components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select'
import { 
  User,
  Search,
  Filter,
  Edit,
  Trash2,
  Eye,
  UserX,
  Plus,
  Minus,
  Mail,
  Phone,
  Calendar,
  MapPin,
  Users,
  Trophy,
  ArrowLeft,
  MoreVertical,
  ChevronLeft,
  ChevronRight
} from 'lucide-react'

interface Student {
  id: string
  fullName: string
  email: string
  gender: 'Male' | 'Female' | 'Other'
  age: number
  phoneNumber: string
  fatherName: string
  address: string
  status: 'Active' | 'Disabled'
  dateAdded: string
  totalExams: number
  averageScore: number
  lastActivity: string
}

const mockStudents: Student[] = [
  {
    id: 'std001',
    fullName: 'Emma Thompson',
    email: 'emma.thompson@email.com',
    gender: 'Female',
    age: 10,
    phoneNumber: '+44 7123 456789',
    fatherName: 'James Thompson',
    address: '123 Oak Street, London, SW1A 1AA',
    status: 'Active',
    dateAdded: '2024-01-15',
    totalExams: 12,
    averageScore: 85,
    lastActivity: '2 hours ago'
  },
  {
    id: 'std002',
    fullName: 'Oliver Johnson',
    email: 'oliver.johnson@email.com',
    gender: 'Male',
    age: 11,
    phoneNumber: '+44 7234 567890',
    fatherName: 'Michael Johnson',
    address: '456 Pine Avenue, Manchester, M1 1AA',
    status: 'Active',
    dateAdded: '2024-01-20',
    totalExams: 8,
    averageScore: 78,
    lastActivity: '1 day ago'
  },
  {
    id: 'std003',
    fullName: 'Sophie Williams',
    email: 'sophie.williams@email.com',
    gender: 'Female',
    age: 10,
    phoneNumber: '+44 7345 678901',
    fatherName: 'David Williams',
    address: '789 Elm Road, Birmingham, B1 1AA',
    status: 'Disabled',
    dateAdded: '2024-02-01',
    totalExams: 5,
    averageScore: 72,
    lastActivity: '1 week ago'
  },
  {
    id: 'std004',
    fullName: 'Harry Brown',
    email: 'harry.brown@email.com',
    gender: 'Male',
    age: 11,
    phoneNumber: '+44 7456 789012',
    fatherName: 'Robert Brown',
    address: '321 Maple Close, Leeds, LS1 1AA',
    status: 'Active',
    dateAdded: '2024-02-10',
    totalExams: 15,
    averageScore: 92,
    lastActivity: '3 hours ago'
  },
  {
    id: 'std005',
    fullName: 'Lily Davis',
    email: 'lily.davis@email.com',
    gender: 'Female',
    age: 10,
    phoneNumber: '+44 7567 890123',
    fatherName: 'Thomas Davis',
    address: '654 Cedar Lane, Liverpool, L1 1AA',
    status: 'Active',
    dateAdded: '2024-02-15',
    totalExams: 9,
    averageScore: 81,
    lastActivity: '5 hours ago'
  }
]

export default function StudentsPage() {
  const navigate = useNavigate()
  const [students, setStudents] = useState<Student[]>(mockStudents)
  const [searchTerm, setSearchTerm] = useState('')
  const [genderFilter, setGenderFilter] = useState('all')
  const [statusFilter, setStatusFilter] = useState('all')
  const [sortBy, setSortBy] = useState('name')
  
  // Form state
  const [isFormExpanded, setIsFormExpanded] = useState(false)
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    gender: '',
    age: '',
    phoneNumber: '',
    fatherName: '',
    address: '',
    dateOfBirth: '',
    assignToCourse: ''
  })

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1)
  const [entriesPerPage, setEntriesPerPage] = useState(10)

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const resetForm = () => {
    setFormData({
      fullName: '',
      email: '',
      gender: '',
      age: '',
      phoneNumber: '',
      fatherName: '',
      address: '',
      dateOfBirth: '',
      assignToCourse: ''
    })
  }

  const handleCancelForm = () => {
    resetForm()
    setIsFormExpanded(false)
  }

  const handleAddStudent = () => {
    if (!formData.fullName || !formData.email || !formData.gender || !formData.dateOfBirth || !formData.assignToCourse) {
      alert('Please fill in all required fields (marked with *)')
      return
    }

    const newStudent: Student = {
      id: `std${String(students.length + 1).padStart(3, '0')}`,
      fullName: formData.fullName,
      email: formData.email,
      gender: formData.gender as 'Male' | 'Female' | 'Other',
      age: new Date().getFullYear() - new Date(formData.dateOfBirth).getFullYear(),
      phoneNumber: formData.phoneNumber,
      fatherName: formData.fatherName,
      address: formData.address,
      status: 'Active',
      dateAdded: new Date().toISOString().split('T')[0],
      totalExams: 0,
      averageScore: 0,
      lastActivity: 'Never'
    }

    setStudents(prev => [...prev, newStudent])
    resetForm()
  }

  const handleDeleteStudent = (studentId: string) => {
    if (confirm('Are you sure you want to delete this student?')) {
      setStudents(prev => prev.filter(student => student.id !== studentId))
    }
  }

  const handleToggleStatus = (studentId: string) => {
    setStudents(prev => prev.map(student => 
      student.id === studentId 
        ? { ...student, status: student.status === 'Active' ? 'Disabled' : 'Active' }
        : student
    ))
  }

  // Filter and sort students
  const filteredStudents = students
    .filter(student => {
      const matchesSearch = student.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           student.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           student.phoneNumber.includes(searchTerm)
      const matchesGender = genderFilter === 'all' || student.gender.toLowerCase() === genderFilter
      const matchesStatus = statusFilter === 'all' || student.status.toLowerCase() === statusFilter
      
      return matchesSearch && matchesGender && matchesStatus
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'name':
          return a.fullName.localeCompare(b.fullName)
        case 'date':
          return new Date(b.dateAdded).getTime() - new Date(a.dateAdded).getTime()
        case 'score':
          return b.averageScore - a.averageScore
        default:
          return 0
      }
    })

  // Pagination logic
  const totalPages = Math.ceil(filteredStudents.length / entriesPerPage)
  const startIndex = (currentPage - 1) * entriesPerPage
  const endIndex = startIndex + entriesPerPage
  const paginatedStudents = filteredStudents.slice(startIndex, endIndex)

  // Reset to first page when filters change
  const handleFilterChange = (filterType: string, value: string) => {
    setCurrentPage(1)
    switch (filterType) {
      case 'search':
        setSearchTerm(value)
        break
      case 'gender':
        setGenderFilter(value)
        break
      case 'status':
        setStatusFilter(value)
        break
      case 'sort':
        setSortBy(value)
        break
    }
  }

  const handleEntriesPerPageChange = (value: string) => {
    setEntriesPerPage(parseInt(value))
    setCurrentPage(1)
  }

  const getStatusColor = (status: string) => {
    return status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
  }

  const getGenderIcon = (gender: string) => {
    return <User className="w-4 h-4" />
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/20">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm shadow-sm border-b border-gray-200/60 sticky top-0 z-10">
        <div className="px-6 py-5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-6">
              <Button 
                variant="ghost" 
                size="sm"
                onClick={() => navigate('/dashboard')}
                className="gap-2 hover:bg-blue-50 text-gray-600 hover:text-blue-700 transition-all duration-200"
              >
                <ArrowLeft className="w-4 h-4" />
                Back to Dashboard
              </Button>
              <div>
                <h1 className="text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                  Student Management
                </h1>
                <p className="text-gray-600 mt-1">Manage student profiles and exam assignments</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Badge className="gap-2 px-4 py-2 bg-blue-100 text-blue-800 border-blue-200 shadow-sm">
                <Users className="w-4 h-4" />
                <span className="font-semibold">{students.length}</span>
                <span className="text-blue-600">Total Students</span>
              </Badge>
              <Badge className="gap-2 px-4 py-2 bg-green-100 text-green-800 border-green-200 shadow-sm">
                <Trophy className="w-4 h-4" />
                <span className="font-semibold">{students.filter(s => s.status === 'Active').length}</span>
                <span className="text-green-600">Active</span>
              </Badge>
            </div>
          </div>
        </div>
      </header>

      <div className="p-6 space-y-8 max-w-7xl mx-auto">
        {/* Add New Student Form */}
        <Card className="shadow-lg border-0 bg-white/70 backdrop-blur-sm">
          <CardHeader 
            className="bg-gradient-to-r from-purple-50 to-blue-50 border-b border-gray-100 cursor-pointer hover:from-purple-100 hover:to-blue-100 transition-all duration-200"
            onClick={() => setIsFormExpanded(!isFormExpanded)}
          >
            <CardTitle className="flex items-center gap-3 text-xl">
              <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-blue-500 rounded-lg flex items-center justify-center shadow-sm">
                {isFormExpanded ? (
                  <Minus className="w-5 h-5 text-white" />
                ) : (
                  <Plus className="w-5 h-5 text-white" />
                )}
              </div>
              Add Student
            </CardTitle>
            <CardDescription className="text-gray-600 mt-2">
              {isFormExpanded 
                ? 'Fill in the student details to add them to the system. Fields marked with * are required.'
                : 'Click to expand the form and add a new student to the system.'
              }
            </CardDescription>
          </CardHeader>
          {isFormExpanded && (
            <CardContent className="p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Full Name *
                </label>
                <Input
                  value={formData.fullName}
                  onChange={(e) => handleInputChange('fullName', e.target.value)}
                  placeholder="Enter full name"
                  className="rounded-lg border-gray-200 focus:border-blue-400 focus:ring-blue-400 shadow-sm transition-all duration-200"
                />
              </div>
              
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Email ID *
                </label>
                <Input
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  placeholder="Enter email address"
                  className="rounded-lg border-gray-200 focus:border-blue-400 focus:ring-blue-400 shadow-sm transition-all duration-200"
                />
              </div>
              
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Gender *
                </label>
                <Select value={formData.gender} onValueChange={(value) => handleInputChange('gender', value)}>
                  <SelectTrigger className="rounded-lg border-gray-200 shadow-sm hover:border-gray-300 transition-colors">
                    <SelectValue placeholder="Select gender" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Male">Male</SelectItem>
                    <SelectItem value="Female">Female</SelectItem>
                    <SelectItem value="Other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Date of Birth *
                </label>
                <Input
                  type="date"
                  value={formData.dateOfBirth}
                  onChange={(e) => handleInputChange('dateOfBirth', e.target.value)}
                  className="rounded-lg border-gray-200 focus:border-blue-400 focus:ring-blue-400 shadow-sm transition-all duration-200"
                />
              </div>
              
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Phone Number
                </label>
                <Input
                  value={formData.phoneNumber}
                  onChange={(e) => handleInputChange('phoneNumber', e.target.value)}
                  placeholder="Enter phone number"
                  className="rounded-lg border-gray-200 focus:border-blue-400 focus:ring-blue-400 shadow-sm transition-all duration-200"
                />
              </div>
              
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Father's Name
                </label>
                <Input
                  value={formData.fatherName}
                  onChange={(e) => handleInputChange('fatherName', e.target.value)}
                  placeholder="Enter father's name"
                  className="rounded-lg border-gray-200 focus:border-blue-400 focus:ring-blue-400 shadow-sm transition-all duration-200"
                />
              </div>
              
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Assign to Course/Class *
                </label>
                <Select value={formData.assignToCourse} onValueChange={(value) => handleInputChange('assignToCourse', value)}>
                  <SelectTrigger className="rounded-lg border-gray-200 shadow-sm hover:border-gray-300 transition-colors">
                    <SelectValue placeholder="Select course" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="math-advanced">Advanced Mathematics (10 Jul - 30 Aug)</SelectItem>
                    <SelectItem value="english-comp">English Comprehension (15 Jul - 25 Aug)</SelectItem>
                    <SelectItem value="verbal-reasoning">Verbal Reasoning Mastery (20 Jul - 20 Sep)</SelectItem>
                    <SelectItem value="non-verbal">Non-Verbal Reasoning Workshop (25 Jul - 15 Sep)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="md:col-span-2 lg:col-span-3">
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Address
                </label>
                <textarea
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 shadow-sm transition-all duration-200 resize-none"
                  rows={3}
                  value={formData.address}
                  onChange={(e) => handleInputChange('address', e.target.value)}
                  placeholder="Enter full address"
                />
              </div>
            </div>
            
            <div className="mt-8 flex justify-end gap-4">
              <Button 
                onClick={handleCancelForm}
                variant="outline"
                className="gap-2 px-6 py-3 border-gray-300 text-gray-700 hover:bg-gray-50 font-semibold rounded-lg transition-all duration-200"
              >
                Cancel
              </Button>
              <Button 
                onClick={handleAddStudent} 
                className="gap-2 px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-200"
              >
                <Plus className="w-4 h-4" />
                Save Student
              </Button>
            </div>
            </CardContent>
          )}
        </Card>

        {/* Search and Filter Section */}
        <Card className="shadow-lg border-0 bg-white/70 backdrop-blur-sm">
          <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50 border-b border-gray-100">
            <CardTitle className="flex items-center gap-3 text-xl">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-lg flex items-center justify-center shadow-sm">
                <Users className="w-5 h-5 text-white" />
              </div>
              Student List
              <Badge className="ml-2 px-3 py-1 bg-gray-100 text-gray-700 border-gray-200">
                {filteredStudents.length} {filteredStudents.length === 1 ? 'student' : 'students'}
              </Badge>
            </CardTitle>
            <CardDescription className="text-gray-600 mt-2">
              Search and filter students, manage their profiles and exam assignments
            </CardDescription>
          </CardHeader>
          <CardContent className="p-8">
            <div className="flex flex-col lg:flex-row gap-4 mb-8">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <Input
                    placeholder="Search students by name, email, or phone number..."
                    value={searchTerm}
                    onChange={(e) => handleFilterChange('search', e.target.value)}
                    className="pl-12 pr-4 py-3 text-base rounded-xl border-gray-200 focus:border-blue-400 focus:ring-blue-400 shadow-sm bg-white transition-all duration-200"
                  />
                  {searchTerm && (
                    <button
                      onClick={() => handleFilterChange('search', '')}
                      className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  )}
                </div>
              </div>
              
              <div className="flex flex-wrap gap-3">
                <div className="flex items-center gap-2">
                  <Filter className="w-4 h-4 text-gray-500" />
                  <span className="text-sm font-medium text-gray-700">Filters:</span>
                </div>
                
                <Select value={genderFilter} onValueChange={(value) => handleFilterChange('gender', value)}>
                  <SelectTrigger className="w-40 rounded-lg border-gray-200 shadow-sm hover:border-gray-300 transition-colors">
                    <SelectValue placeholder="All Genders" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Genders</SelectItem>
                    <SelectItem value="male">Male</SelectItem>
                    <SelectItem value="female">Female</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
                
                <Select value={statusFilter} onValueChange={(value) => handleFilterChange('status', value)}>
                  <SelectTrigger className="w-36 rounded-lg border-gray-200 shadow-sm hover:border-gray-300 transition-colors">
                    <SelectValue placeholder="All Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="disabled">Disabled</SelectItem>
                  </SelectContent>
                </Select>
                
                <Select value={sortBy} onValueChange={(value) => handleFilterChange('sort', value)}>
                  <SelectTrigger className="w-44 rounded-lg border-gray-200 shadow-sm hover:border-gray-300 transition-colors">
                    <SelectValue placeholder="Sort by Name" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="name">Sort by Name</SelectItem>
                    <SelectItem value="date">Sort by Date Added</SelectItem>
                    <SelectItem value="score">Sort by Score</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Students Table */}
            <div className="overflow-x-auto bg-white rounded-lg border border-gray-200 shadow-sm">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="text-left py-4 px-6 font-semibold text-gray-700 text-sm uppercase tracking-wide">Student</th>
                    <th className="text-left py-4 px-6 font-semibold text-gray-700 text-sm uppercase tracking-wide">Contact</th>
                    <th className="text-left py-4 px-6 font-semibold text-gray-700 text-sm uppercase tracking-wide">Details</th>
                    <th className="text-left py-4 px-6 font-semibold text-gray-700 text-sm uppercase tracking-wide">Performance</th>
                    <th className="text-left py-4 px-6 font-semibold text-gray-700 text-sm uppercase tracking-wide">Status</th>
                    <th className="text-left py-4 px-6 font-semibold text-gray-700 text-sm uppercase tracking-wide">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {paginatedStudents.map((student, index) => (
                    <tr 
                      key={student.id} 
                      className={`
                        transition-all duration-200 hover:bg-blue-50 hover:shadow-sm
                        ${index % 2 === 0 ? 'bg-white' : 'bg-gray-50/30'}
                      `}
                    >
                      <td className="py-5 px-6">
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 bg-gradient-to-br from-purple-100 to-blue-100 rounded-full flex items-center justify-center shadow-sm">
                            <User className="w-5 h-5 text-purple-600" />
                          </div>
                          <div>
                            <p className="font-semibold text-gray-900 text-base">{student.fullName}</p>
                            <p className="text-sm text-gray-500 mt-0.5">Age: {student.age} years</p>
                          </div>
                        </div>
                      </td>
                      
                      <td className="py-5 px-6">
                        <div className="space-y-2">
                          <div className="flex items-center gap-2 text-sm text-gray-700">
                            <Mail className="w-4 h-4 text-blue-500" />
                            <span className="font-medium">{student.email}</span>
                          </div>
                          {student.phoneNumber && (
                            <div className="flex items-center gap-2 text-sm text-gray-600">
                              <Phone className="w-4 h-4 text-green-500" />
                              <span>{student.phoneNumber}</span>
                            </div>
                          )}
                        </div>
                      </td>
                      
                      <td className="py-5 px-6">
                        <div className="space-y-2">
                          <p className="text-sm font-medium text-gray-900">
                            Father: {student.fatherName || 'Not provided'}
                          </p>
                          <div className="flex items-center gap-2">
                            <Badge 
                              variant="outline" 
                              className={`text-xs px-2 py-1 ${
                                student.gender === 'Male' 
                                  ? 'bg-blue-50 text-blue-700 border-blue-200' 
                                  : student.gender === 'Female'
                                  ? 'bg-pink-50 text-pink-700 border-pink-200'
                                  : 'bg-gray-50 text-gray-700 border-gray-200'
                              }`}
                            >
                              {student.gender}
                            </Badge>
                          </div>
                          <div className="flex items-center gap-2 text-xs text-gray-500">
                            <Calendar className="w-3 h-3" />
                            <span>Joined {new Date(student.dateAdded).toLocaleDateString('en-GB', { 
                              day: 'numeric', 
                              month: 'short', 
                              year: 'numeric' 
                            })}</span>
                          </div>
                        </div>
                      </td>
                      
                      <td className="py-5 px-6">
                        <div className="space-y-2">
                          <div className="flex items-center gap-2">
                            <Trophy className="w-4 h-4 text-yellow-500" />
                            <span className="text-sm font-semibold text-gray-900">
                              {student.totalExams} exams
                            </span>
                          </div>
                          <div className="flex items-center gap-2">
                            <div className={`w-2 h-2 rounded-full ${
                              student.averageScore >= 80 ? 'bg-green-500' :
                              student.averageScore >= 60 ? 'bg-yellow-500' : 'bg-red-500'
                            }`} />
                            <span className="text-sm font-medium text-gray-700">
                              {student.averageScore}% avg
                            </span>
                          </div>
                          <p className="text-xs text-gray-500">
                            Last active: {student.lastActivity}
                          </p>
                        </div>
                      </td>
                      
                      <td className="py-5 px-6">
                        <Badge 
                          className={`px-3 py-1 text-xs font-semibold rounded-full border-0 ${
                            student.status === 'Active' 
                              ? 'bg-green-100 text-green-800 shadow-sm' 
                              : 'bg-red-100 text-red-800 shadow-sm'
                          }`}
                        >
                          <div className={`w-2 h-2 rounded-full mr-2 ${
                            student.status === 'Active' ? 'bg-green-500' : 'bg-red-500'
                          }`} />
                          {student.status}
                        </Badge>
                      </td>
                      
                      <td className="py-5 px-6">
                        <div className="flex items-center gap-2">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => navigate(`/students/${student.id}`)}
                            className="gap-2 px-3 py-2 text-xs font-medium border-blue-200 text-blue-700 hover:bg-blue-50 hover:border-blue-300 transition-all duration-200"
                          >
                            <Eye className="w-3.5 h-3.5" />
                            View
                          </Button>
                          
                          <Button
                            size="sm"
                            variant="outline"
                            className="gap-2 px-3 py-2 text-xs font-medium border-gray-200 text-gray-700 hover:bg-gray-50 hover:border-gray-300 transition-all duration-200"
                          >
                            <Edit className="w-3.5 h-3.5" />
                            Edit
                          </Button>
                          
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleToggleStatus(student.id)}
                            className={`gap-2 px-3 py-2 text-xs font-medium transition-all duration-200 ${
                              student.status === 'Active'
                                ? 'border-orange-200 text-orange-700 hover:bg-orange-50 hover:border-orange-300'
                                : 'border-green-200 text-green-700 hover:bg-green-50 hover:border-green-300'
                            }`}
                          >
                            <UserX className="w-3.5 h-3.5" />
                            {student.status === 'Active' ? 'Disable' : 'Enable'}
                          </Button>
                          
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleDeleteStudent(student.id)}
                            className="gap-2 px-3 py-2 text-xs font-medium border-red-200 text-red-700 hover:bg-red-50 hover:border-red-300 transition-all duration-200"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                            Delete
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              
              {/* Pagination Controls */}
              {filteredStudents.length > 0 && (
                <div className="bg-gray-50 px-6 py-4 border-t border-gray-200 flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-gray-700">Show</span>
                      <Select value={entriesPerPage.toString()} onValueChange={handleEntriesPerPageChange}>
                        <SelectTrigger className="w-20 h-8 text-sm">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="10">10</SelectItem>
                          <SelectItem value="25">25</SelectItem>
                          <SelectItem value="50">50</SelectItem>
                        </SelectContent>
                      </Select>
                      <span className="text-sm text-gray-700">entries</span>
                    </div>
                    <div className="text-sm text-gray-700">
                      Showing {startIndex + 1} to {Math.min(endIndex, filteredStudents.length)} of {filteredStudents.length} students
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setCurrentPage(currentPage - 1)}
                      disabled={currentPage === 1}
                      className="gap-1 h-8 px-3"
                    >
                      <ChevronLeft className="w-4 h-4" />
                      Previous
                    </Button>
                    
                    <div className="flex items-center gap-1">
                      {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                        <Button
                          key={page}
                          variant={currentPage === page ? "default" : "outline"}
                          size="sm"
                          onClick={() => setCurrentPage(page)}
                          className={`w-8 h-8 p-0 ${
                            currentPage === page 
                              ? 'bg-purple-600 hover:bg-purple-700 text-white' 
                              : 'hover:bg-gray-50'
                          }`}
                        >
                          {page}
                        </Button>
                      ))}
                    </div>
                    
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setCurrentPage(currentPage + 1)}
                      disabled={currentPage === totalPages}
                      className="gap-1 h-8 px-3"
                    >
                      Next
                      <ChevronRight className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              )}
              
              {filteredStudents.length === 0 && (
                <div className="text-center py-16 bg-gradient-to-br from-gray-50 to-blue-50/30 rounded-lg border-2 border-dashed border-gray-200">
                  <div className="w-20 h-20 bg-gradient-to-br from-gray-100 to-blue-100 rounded-full flex items-center justify-center mx-auto mb-6 shadow-sm">
                    <Users className="w-10 h-10 text-gray-400" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">No students found</h3>
                  <p className="text-gray-600 max-w-md mx-auto leading-relaxed">
                    {searchTerm || genderFilter !== 'all' || statusFilter !== 'all'
                      ? 'Try adjusting your search or filter criteria to find the students you\'re looking for.'
                      : 'Get started by adding your first student using the form above. Once added, they will appear in this list.'
                    }
                  </p>
                  {!(searchTerm || genderFilter !== 'all' || statusFilter !== 'all') && (
                    <Button 
                      className="mt-6 gap-2 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-200"
                      onClick={() => document.querySelector('input[placeholder*="Enter full name"]')?.focus()}
                    >
                      <Plus className="w-4 h-4" />
                      Add First Student
                    </Button>
                  )}
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}