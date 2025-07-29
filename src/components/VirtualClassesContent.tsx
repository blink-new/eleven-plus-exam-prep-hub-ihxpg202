import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from './ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card'
import { Badge } from './ui/badge'
import { Input } from './ui/input'
import { Label } from './ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select'
import { 
  Video,
  Users,
  Calendar,
  Clock,
  Plus,
  Minus,
  Search,
  Filter,
  Eye,
  Edit,
  Trash2,
  BookOpen,
  Calculator,
  Brain,
  Puzzle,
  ChevronDown,
  ChevronUp
} from 'lucide-react'

interface VirtualClass {
  id: string
  name: string
  subject: string
  description: string
  meetingLink: string
  schedule: {
    fromDate: string
    toDate: string
    days: string[]
    startTime: string
    endTime: string
  }
  enrolledStudents: number
  maxStudents: number
  status: 'active' | 'upcoming' | 'completed'
  createdAt: string
}

const mockClasses: VirtualClass[] = [
  {
    id: 'class-001',
    name: 'Advanced Mathematics',
    subject: 'Mathematics',
    description: 'Comprehensive mathematics course covering algebra, geometry, and advanced problem-solving techniques.',
    meetingLink: 'https://zoom.us/j/123456789',
    schedule: {
      fromDate: '2024-01-15',
      toDate: '2024-03-15',
      days: ['Monday', 'Wednesday', 'Friday'],
      startTime: '10:00',
      endTime: '11:00'
    },
    enrolledStudents: 25,
    maxStudents: 30,
    status: 'active',
    createdAt: '2024-01-10'
  },
  {
    id: 'class-002',
    name: 'English Literature',
    subject: 'English',
    description: 'Explore classic and contemporary literature with focus on comprehension and analysis.',
    meetingLink: 'https://meet.google.com/abc-defg-hij',
    schedule: {
      fromDate: '2024-01-20',
      toDate: '2024-04-20',
      days: ['Tuesday', 'Thursday'],
      startTime: '14:00',
      endTime: '15:30'
    },
    enrolledStudents: 18,
    maxStudents: 25,
    status: 'upcoming',
    createdAt: '2024-01-12'
  },
  {
    id: 'class-003',
    name: 'Verbal Reasoning Mastery',
    subject: 'Verbal Reasoning',
    description: 'Develop critical thinking and verbal reasoning skills through structured practice.',
    meetingLink: 'https://teams.microsoft.com/l/meetup-join/xyz',
    schedule: {
      fromDate: '2023-11-01',
      toDate: '2024-01-31',
      days: ['Saturday'],
      startTime: '09:00',
      endTime: '10:30'
    },
    enrolledStudents: 22,
    maxStudents: 20,
    status: 'completed',
    createdAt: '2023-10-25'
  }
]

const subjects = ['Mathematics', 'English', 'Verbal Reasoning', 'Non-Verbal Reasoning']
const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']

export default function VirtualClassesContent() {
  const navigate = useNavigate()
  const [isCreateExpanded, setIsCreateExpanded] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('All')
  const [subjectFilter, setSubjectFilter] = useState('All')
  
  // Form state
  const [formData, setFormData] = useState({
    name: '',
    subject: '',
    description: '',
    meetingLink: '',
    fromDate: '',
    toDate: '',
    selectedDays: [] as string[],
    startTime: '',
    endTime: '',
    maxStudents: 25
  })

  const getSubjectIcon = (subject: string) => {
    switch (subject) {
      case 'Mathematics': return <Calculator className="w-5 h-5" />
      case 'English': return <BookOpen className="w-5 h-5" />
      case 'Verbal Reasoning': return <Brain className="w-5 h-5" />
      case 'Non-Verbal Reasoning': return <Puzzle className="w-5 h-5" />
      default: return <Video className="w-5 h-5" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800'
      case 'upcoming': return 'bg-blue-100 text-blue-800'
      case 'completed': return 'bg-gray-100 text-gray-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const handleDayToggle = (day: string) => {
    setFormData(prev => ({
      ...prev,
      selectedDays: prev.selectedDays.includes(day)
        ? prev.selectedDays.filter(d => d !== day)
        : [...prev.selectedDays, day]
    }))
  }

  const handleStudentCountChange = (increment: boolean) => {
    setFormData(prev => ({
      ...prev,
      maxStudents: increment 
        ? Math.min(prev.maxStudents + 5, 50)
        : Math.max(prev.maxStudents - 5, 5)
    }))
  }

  const resetForm = () => {
    setFormData({
      name: '',
      subject: '',
      description: '',
      meetingLink: '',
      fromDate: '',
      toDate: '',
      selectedDays: [],
      startTime: '',
      endTime: '',
      maxStudents: 25
    })
  }

  const handleCreateClass = () => {
    // In a real app, this would save to database
    console.log('Creating class:', formData)
    resetForm()
    setIsCreateExpanded(false)
  }

  const handleCancel = () => {
    resetForm()
    setIsCreateExpanded(false)
  }

  const filteredClasses = mockClasses.filter(cls => {
    const matchesSearch = cls.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         cls.subject.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === 'All' || cls.status === statusFilter.toLowerCase()
    const matchesSubject = subjectFilter === 'All' || cls.subject === subjectFilter
    return matchesSearch && matchesStatus && matchesSubject
  })

  const handleViewClass = (classId: string) => {
    navigate(`/virtual-classes/${classId}`)
  }

  return (
    <div className="p-6">
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Virtual Classes</h1>
        <p className="text-gray-600">
          Manage your virtual classes, create new sessions, and track student enrollment.
        </p>
      </div>

      {/* Create New Class Section */}
      <Card className="mb-6">
        <CardHeader 
          className="cursor-pointer hover:bg-gray-50 transition-colors"
          onClick={() => setIsCreateExpanded(!isCreateExpanded)}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors ${
                isCreateExpanded ? 'bg-purple-600 text-white' : 'bg-white text-purple-600 border-2 border-purple-600'
              }`}>
                {isCreateExpanded ? <Minus className="w-5 h-5" /> : <Plus className="w-5 h-5" />}
              </div>
              <div>
                <CardTitle className="text-xl bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                  Create New Class
                </CardTitle>
                <CardDescription>
                  {isCreateExpanded ? 'Fill in the details below to create a new virtual class' : 'Click to expand and create a new virtual class'}
                </CardDescription>
              </div>
            </div>
            {isCreateExpanded ? <ChevronUp className="w-5 h-5 text-gray-400" /> : <ChevronDown className="w-5 h-5 text-gray-400" />}
          </div>
        </CardHeader>
        
        {isCreateExpanded && (
          <CardContent className="space-y-6 animate-in slide-in-from-top-2 duration-300">
            {/* Class Details */}
            <Card className="bg-gradient-to-r from-blue-50 to-blue-100 border-blue-200">
              <CardHeader className="pb-4">
                <CardTitle className="text-lg text-blue-900 flex items-center gap-2">
                  <div className="w-6 h-6 bg-blue-500 rounded-lg flex items-center justify-center">
                    <BookOpen className="w-4 h-4 text-white" />
                  </div>
                  Class Details
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="className">Course Name *</Label>
                    <Input
                      id="className"
                      value={formData.name}
                      onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                      placeholder="e.g., Advanced Mathematics"
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="subject">Subject *</Label>
                    <Select value={formData.subject} onValueChange={(value) => setFormData(prev => ({ ...prev, subject: value }))}>
                      <SelectTrigger className="mt-1">
                        <SelectValue placeholder="Select subject" />
                      </SelectTrigger>
                      <SelectContent>
                        {subjects.map(subject => (
                          <SelectItem key={subject} value={subject}>{subject}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div>
                  <Label htmlFor="description">Description</Label>
                  <textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                    placeholder="Brief description of the class content and objectives"
                    className="mt-1 w-full p-3 border border-gray-300 rounded-lg resize-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    rows={3}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Online Meeting */}
            <Card className="bg-gradient-to-r from-green-50 to-green-100 border-green-200">
              <CardHeader className="pb-4">
                <CardTitle className="text-lg text-green-900 flex items-center gap-2">
                  <div className="w-6 h-6 bg-green-500 rounded-lg flex items-center justify-center">
                    <Video className="w-4 h-4 text-white" />
                  </div>
                  Online Meeting
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div>
                  <Label htmlFor="meetingLink">Live Meeting Link *</Label>
                  <Input
                    id="meetingLink"
                    value={formData.meetingLink}
                    onChange={(e) => setFormData(prev => ({ ...prev, meetingLink: e.target.value }))}
                    placeholder="https://zoom.us/j/123456789 or https://meet.google.com/..."
                    className="mt-1"
                  />
                  <p className="text-sm text-green-700 mt-1">
                    Provide the meeting link for Zoom, Google Meet, or Microsoft Teams
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Schedule */}
            <Card className="bg-gradient-to-r from-purple-50 to-purple-100 border-purple-200">
              <CardHeader className="pb-4">
                <CardTitle className="text-lg text-purple-900 flex items-center gap-2">
                  <div className="w-6 h-6 bg-purple-500 rounded-lg flex items-center justify-center">
                    <Calendar className="w-4 h-4 text-white" />
                  </div>
                  Class Schedule
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="fromDate">From Date *</Label>
                    <Input
                      id="fromDate"
                      type="date"
                      value={formData.fromDate}
                      onChange={(e) => setFormData(prev => ({ ...prev, fromDate: e.target.value }))}
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="toDate">To Date *</Label>
                    <Input
                      id="toDate"
                      type="date"
                      value={formData.toDate}
                      onChange={(e) => setFormData(prev => ({ ...prev, toDate: e.target.value }))}
                      className="mt-1"
                    />
                  </div>
                </div>
                
                <div>
                  <Label>Days of the Week *</Label>
                  <div className="grid grid-cols-4 md:grid-cols-7 gap-2 mt-2">
                    {daysOfWeek.map(day => (
                      <button
                        key={day}
                        type="button"
                        onClick={() => handleDayToggle(day)}
                        className={`p-2 text-sm rounded-lg border-2 transition-all ${
                          formData.selectedDays.includes(day)
                            ? 'border-purple-500 bg-purple-50 text-purple-700'
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        {day.slice(0, 3)}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="startTime">Start Time *</Label>
                    <Input
                      id="startTime"
                      type="time"
                      value={formData.startTime}
                      onChange={(e) => setFormData(prev => ({ ...prev, startTime: e.target.value }))}
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="endTime">End Time *</Label>
                    <Input
                      id="endTime"
                      type="time"
                      value={formData.endTime}
                      onChange={(e) => setFormData(prev => ({ ...prev, endTime: e.target.value }))}
                      className="mt-1"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Students */}
            <Card className="bg-gradient-to-r from-orange-50 to-orange-100 border-orange-200">
              <CardHeader className="pb-4">
                <CardTitle className="text-lg text-orange-900 flex items-center gap-2">
                  <div className="w-6 h-6 bg-orange-500 rounded-lg flex items-center justify-center">
                    <Users className="w-4 h-4 text-white" />
                  </div>
                  Student Capacity
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-center gap-4">
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => handleStudentCountChange(false)}
                    disabled={formData.maxStudents <= 5}
                  >
                    <Minus className="w-4 h-4" />
                  </Button>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-orange-600">{formData.maxStudents}</div>
                    <div className="text-sm text-orange-700">max students</div>
                  </div>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => handleStudentCountChange(true)}
                    disabled={formData.maxStudents >= 50}
                  >
                    <Plus className="w-4 h-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Form Actions */}
            <div className="flex gap-3 pt-4">
              <Button
                onClick={handleCreateClass}
                className="flex-1 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
              >
                Create Class
              </Button>
              <Button
                variant="outline"
                onClick={handleCancel}
                className="px-8"
              >
                Cancel
              </Button>
            </div>
          </CardContent>
        )}
      </Card>

      {/* Filters and Search */}
      <Card className="mb-6">
        <CardContent className="p-6">
          <div className="flex flex-col sm:flex-row gap-4">
            {/* Search */}
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="Search classes..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>

            {/* Filters */}
            <div className="flex gap-2">
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-32">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="All">All Status</SelectItem>
                  <SelectItem value="Active">Active</SelectItem>
                  <SelectItem value="Upcoming">Upcoming</SelectItem>
                  <SelectItem value="Completed">Completed</SelectItem>
                </SelectContent>
              </Select>

              <Select value={subjectFilter} onValueChange={setSubjectFilter}>
                <SelectTrigger className="w-40">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="All">All Subjects</SelectItem>
                  {subjects.map(subject => (
                    <SelectItem key={subject} value={subject}>{subject}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Classes List */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredClasses.map((cls) => (
          <Card key={cls.id} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center text-purple-600">
                    {getSubjectIcon(cls.subject)}
                  </div>
                  <div>
                    <CardTitle className="text-lg">{cls.name}</CardTitle>
                    <CardDescription className="flex items-center gap-2 mt-1">
                      <span>{cls.subject}</span>
                      <Badge className={getStatusColor(cls.status)}>
                        {cls.status.charAt(0).toUpperCase() + cls.status.slice(1)}
                      </Badge>
                    </CardDescription>
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-gray-600 line-clamp-2">{cls.description}</p>
              
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="flex items-center gap-2">
                  <Users className="w-4 h-4 text-gray-500" />
                  <span>{cls.enrolledStudents}/{cls.maxStudents} students</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-gray-500" />
                  <span>{cls.schedule.startTime} - {cls.schedule.endTime}</span>
                </div>
              </div>

              <div className="text-sm text-gray-600">
                <span className="font-medium">Days:</span> {cls.schedule.days.join(', ')}
              </div>

              <div className="flex gap-2">
                <Button
                  onClick={() => handleViewClass(cls.id)}
                  className="flex-1 gap-2"
                  size="sm"
                >
                  <Eye className="w-4 h-4" />
                  View
                </Button>
                <Button variant="outline" size="sm" className="gap-2">
                  <Edit className="w-4 h-4" />
                  Edit
                </Button>
                <Button variant="outline" size="sm" className="gap-2 text-red-600 hover:text-red-700">
                  <Trash2 className="w-4 h-4" />
                  Delete
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredClasses.length === 0 && (
        <Card>
          <CardContent className="text-center py-12">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Video className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">No classes found</h3>
            <p className="text-gray-600 mb-4">
              {searchTerm || statusFilter !== 'All' || subjectFilter !== 'All'
                ? 'Try adjusting your search terms or filters.'
                : 'Create your first virtual class to get started.'}
            </p>
            <Button
              onClick={() => {
                setSearchTerm('')
                setStatusFilter('All')
                setSubjectFilter('All')
              }}
              variant="outline"
            >
              Clear Filters
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  )
}