import { useState } from 'react'
import { Link, useParams, useNavigate } from 'react-router-dom'
import { Button } from '../components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card'
import { Badge } from '../components/ui/badge'
import { Input } from '../components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select'
import { 
  User,
  ArrowLeft,
  Mail,
  Phone,
  Calendar,
  MapPin,
  BookOpen,
  Calculator,
  Brain,
  Puzzle,
  Plus,
  Trash2,
  Eye,
  Search,
  Filter,
  Clock,
  Target,
  Award,
  CheckCircle,
  XCircle,
  AlertCircle
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

interface Exam {
  id: string
  title: string
  subject: string
  difficulty: 'Easy' | 'Medium' | 'Hard'
  questions: number
  duration: number
  icon: React.ReactNode
  color: string
}

interface AssignedExam {
  id: string
  examId: string
  examTitle: string
  subject: string
  assignedDate: string
  status: 'Pending' | 'Completed' | 'In Progress'
  score?: number
  timeSpent?: number
  attempts: number
}

interface Course {
  id: string
  name: string
  subject: string
  instructor: string
  startDate: string
  endDate: string
  status: 'Active' | 'Completed' | 'Upcoming'
}

interface AssignedCourse {
  id: string
  courseId: string
  courseName: string
  subject: string
  instructor: string
  startDate: string
  endDate: string
  status: 'Active' | 'Completed' | 'Upcoming'
  assignedDate: string
}

const mockStudent: Student = {
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
}

const availableExams: Exam[] = [
  {
    id: 'exam001',
    title: 'Mathematics Practice Paper 1',
    subject: 'Mathematics',
    difficulty: 'Easy',
    questions: 25,
    duration: 45,
    icon: <Calculator className="w-4 h-4" />,
    color: 'bg-blue-500'
  },
  {
    id: 'exam002',
    title: 'English Comprehension Test',
    subject: 'English',
    difficulty: 'Medium',
    questions: 30,
    duration: 60,
    icon: <BookOpen className="w-4 h-4" />,
    color: 'bg-green-500'
  },
  {
    id: 'exam003',
    title: 'Verbal Reasoning Challenge',
    subject: 'Verbal Reasoning',
    difficulty: 'Hard',
    questions: 35,
    duration: 50,
    icon: <Brain className="w-4 h-4" />,
    color: 'bg-purple-500'
  },
  {
    id: 'exam004',
    title: 'Non-Verbal Reasoning Patterns',
    subject: 'Non-Verbal Reasoning',
    difficulty: 'Medium',
    questions: 28,
    duration: 40,
    icon: <Puzzle className="w-4 h-4" />,
    color: 'bg-orange-500'
  },
  {
    id: 'exam005',
    title: 'Mathematics Advanced Problems',
    subject: 'Mathematics',
    difficulty: 'Hard',
    questions: 40,
    duration: 75,
    icon: <Calculator className="w-4 h-4" />,
    color: 'bg-blue-500'
  }
]

const mockAssignedExams: AssignedExam[] = [
  {
    id: 'assign001',
    examId: 'exam001',
    examTitle: 'Mathematics Practice Paper 1',
    subject: 'Mathematics',
    assignedDate: '2024-01-20',
    status: 'Completed',
    score: 85,
    timeSpent: 42,
    attempts: 2
  },
  {
    id: 'assign002',
    examId: 'exam002',
    examTitle: 'English Comprehension Test',
    subject: 'English',
    assignedDate: '2024-01-22',
    status: 'In Progress',
    timeSpent: 25,
    attempts: 1
  },
  {
    id: 'assign003',
    examId: 'exam003',
    examTitle: 'Verbal Reasoning Challenge',
    subject: 'Verbal Reasoning',
    assignedDate: '2024-01-25',
    status: 'Pending',
    attempts: 0
  }
]

const availableCourses: Course[] = [
  {
    id: 'course001',
    name: 'Advanced Mathematics',
    subject: 'Mathematics',
    instructor: 'Mr. Smith',
    startDate: '2024-07-10',
    endDate: '2024-08-30',
    status: 'Active'
  },
  {
    id: 'course002',
    name: 'English Comprehension',
    subject: 'English',
    instructor: 'Ms. Johnson',
    startDate: '2024-07-15',
    endDate: '2024-08-25',
    status: 'Active'
  },
  {
    id: 'course003',
    name: 'Verbal Reasoning Mastery',
    subject: 'Verbal Reasoning',
    instructor: 'Dr. Williams',
    startDate: '2024-07-20',
    endDate: '2024-09-20',
    status: 'Upcoming'
  },
  {
    id: 'course004',
    name: 'Non-Verbal Reasoning Workshop',
    subject: 'Non-Verbal Reasoning',
    instructor: 'Mrs. Brown',
    startDate: '2024-07-25',
    endDate: '2024-09-15',
    status: 'Upcoming'
  }
]

const mockAssignedCourses: AssignedCourse[] = [
  {
    id: 'courseAssign001',
    courseId: 'course001',
    courseName: 'Advanced Mathematics',
    subject: 'Mathematics',
    instructor: 'Mr. Smith',
    startDate: '2024-07-10',
    endDate: '2024-08-30',
    status: 'Active',
    assignedDate: '2024-01-15'
  },
  {
    id: 'courseAssign002',
    courseId: 'course002',
    courseName: 'English Comprehension',
    subject: 'English',
    instructor: 'Ms. Johnson',
    startDate: '2024-07-15',
    endDate: '2024-08-25',
    status: 'Active',
    assignedDate: '2024-01-18'
  }
]

export default function StudentDetailPage() {
  const { studentId } = useParams()
  const navigate = useNavigate()
  const [student] = useState<Student>(mockStudent)
  const [assignedExams, setAssignedExams] = useState<AssignedExam[]>(mockAssignedExams)
  const [assignedCourses, setAssignedCourses] = useState<AssignedCourse[]>(mockAssignedCourses)
  const [selectedExams, setSelectedExams] = useState<string[]>([])
  const [selectedCourse, setSelectedCourse] = useState('')
  const [searchTerm, setSearchTerm] = useState('')
  const [subjectFilter, setSubjectFilter] = useState('all')
  const [statusFilter, setStatusFilter] = useState('all')

  const handleExamSelection = (examId: string) => {
    setSelectedExams(prev => 
      prev.includes(examId) 
        ? prev.filter(id => id !== examId)
        : [...prev, examId]
    )
  }

  const handleAssignExams = () => {
    if (selectedExams.length === 0) {
      alert('Please select at least one exam to assign')
      return
    }

    const newAssignments = selectedExams.map(examId => {
      const exam = availableExams.find(e => e.id === examId)
      return {
        id: `assign${Date.now()}_${examId}`,
        examId,
        examTitle: exam?.title || '',
        subject: exam?.subject || '',
        assignedDate: new Date().toISOString().split('T')[0],
        status: 'Pending' as const,
        attempts: 0
      }
    })

    setAssignedExams(prev => [...prev, ...newAssignments])
    setSelectedExams([])
  }

  const handleRemoveAssignment = (assignmentId: string) => {
    if (confirm('Are you sure you want to remove this exam assignment?')) {
      setAssignedExams(prev => prev.filter(exam => exam.id !== assignmentId))
    }
  }

  const handleAssignCourse = () => {
    if (!selectedCourse) {
      alert('Please select a course to assign')
      return
    }

    const course = availableCourses.find(c => c.id === selectedCourse)
    if (!course) return

    const newCourseAssignment: AssignedCourse = {
      id: `courseAssign${Date.now()}`,
      courseId: course.id,
      courseName: course.name,
      subject: course.subject,
      instructor: course.instructor,
      startDate: course.startDate,
      endDate: course.endDate,
      status: course.status,
      assignedDate: new Date().toISOString().split('T')[0]
    }

    setAssignedCourses(prev => [...prev, newCourseAssignment])
    setSelectedCourse('')
  }

  const handleRemoveCourseAssignment = (assignmentId: string) => {
    if (confirm('Are you sure you want to remove this course assignment?')) {
      setAssignedCourses(prev => prev.filter(course => course.id !== assignmentId))
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Completed':
        return <CheckCircle className="w-4 h-4 text-green-500" />
      case 'In Progress':
        return <AlertCircle className="w-4 h-4 text-yellow-500" />
      case 'Pending':
        return <XCircle className="w-4 h-4 text-gray-500" />
      default:
        return <XCircle className="w-4 h-4 text-gray-500" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Completed':
        return 'bg-green-100 text-green-800'
      case 'In Progress':
        return 'bg-yellow-100 text-yellow-800'
      case 'Pending':
        return 'bg-gray-100 text-gray-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Easy':
        return 'bg-green-100 text-green-800'
      case 'Medium':
        return 'bg-yellow-100 text-yellow-800'
      case 'Hard':
        return 'bg-red-100 text-red-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const getCourseStatusColor = (status: string) => {
    switch (status) {
      case 'Active':
        return 'bg-green-100 text-green-800'
      case 'Upcoming':
        return 'bg-blue-100 text-blue-800'
      case 'Completed':
        return 'bg-gray-100 text-gray-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  // Filter available exams (exclude already assigned ones)
  const assignedExamIds = assignedExams.map(exam => exam.examId)
  const filteredAvailableExams = availableExams
    .filter(exam => !assignedExamIds.includes(exam.id))
    .filter(exam => 
      exam.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      exam.subject.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .filter(exam => subjectFilter === 'all' || exam.subject === subjectFilter)

  // Filter available courses (exclude already assigned ones)
  const assignedCourseIds = assignedCourses.map(course => course.courseId)
  const filteredAvailableCourses = availableCourses
    .filter(course => !assignedCourseIds.includes(course.id))

  // Filter assigned exams
  const filteredAssignedExams = assignedExams
    .filter(exam => statusFilter === 'all' || exam.status === statusFilter)

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button 
                variant="ghost" 
                size="sm"
                onClick={() => navigate('/students')}
                className="gap-2"
              >
                <ArrowLeft className="w-4 h-4" />
                Back to Students
              </Button>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Student Details</h1>
                <p className="text-gray-600">Manage exam assignments and track performance</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="p-6 space-y-6">
        {/* Student Information Card */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-3">
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                <User className="w-6 h-6 text-purple-600" />
              </div>
              <div>
                <h2 className="text-xl font-bold">{student.fullName}</h2>
                <p className="text-gray-600">Student ID: {student.id}</p>
              </div>
              <Badge className={student.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}>
                {student.status}
              </Badge>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="space-y-4">
                <h3 className="font-semibold text-gray-900">Contact Information</h3>
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm">
                    <Mail className="w-4 h-4 text-gray-500" />
                    <span>{student.email}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Phone className="w-4 h-4 text-gray-500" />
                    <span>{student.phoneNumber}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <MapPin className="w-4 h-4 text-gray-500" />
                    <span className="text-xs">{student.address}</span>
                  </div>
                </div>
              </div>
              
              <div className="space-y-4">
                <h3 className="font-semibold text-gray-900">Personal Details</h3>
                <div className="space-y-2">
                  <div className="text-sm">
                    <span className="text-gray-600">Age:</span> {student.age} years
                  </div>
                  <div className="text-sm">
                    <span className="text-gray-600">Gender:</span> {student.gender}
                  </div>
                  <div className="text-sm">
                    <span className="text-gray-600">Father:</span> {student.fatherName}
                  </div>
                </div>
              </div>
              
              <div className="space-y-4">
                <h3 className="font-semibold text-gray-900">Academic Performance</h3>
                <div className="space-y-2">
                  <div className="text-sm">
                    <span className="text-gray-600">Total Exams:</span> {student.totalExams}
                  </div>
                  <div className="text-sm">
                    <span className="text-gray-600">Average Score:</span> {student.averageScore}%
                  </div>
                  <div className="text-sm">
                    <span className="text-gray-600">Last Activity:</span> {student.lastActivity}
                  </div>
                </div>
              </div>
              
              <div className="space-y-4">
                <h3 className="font-semibold text-gray-900">Account Details</h3>
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm">
                    <Calendar className="w-4 h-4 text-gray-500" />
                    <span>Joined: {new Date(student.dateAdded).toLocaleDateString()}</span>
                  </div>
                  <div className="text-sm">
                    <span className="text-gray-600">Assigned Exams:</span> {assignedExams.length}
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Assign Course Section */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BookOpen className="w-5 h-5" />
              Assign New Course
            </CardTitle>
            <CardDescription>
              Assign the student to available courses/classes
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {/* Course Assignment Dropdown */}
              <div className="flex gap-4 items-end">
                <div className="flex-1">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Select Course
                  </label>
                  <Select value={selectedCourse} onValueChange={setSelectedCourse}>
                    <SelectTrigger>
                      <SelectValue placeholder="Choose a course to assign..." />
                    </SelectTrigger>
                    <SelectContent>
                      {filteredAvailableCourses.map((course) => (
                        <SelectItem key={course.id} value={course.id}>
                          <div className="flex flex-col">
                            <span className="font-medium">{course.name}</span>
                            <span className="text-xs text-gray-500">
                              {course.subject} • {course.instructor} • {new Date(course.startDate).toLocaleDateString()} - {new Date(course.endDate).toLocaleDateString()}
                            </span>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <Button 
                  onClick={handleAssignCourse}
                  disabled={!selectedCourse}
                  className="gap-2"
                >
                  <Plus className="w-4 h-4" />
                  Assign Course
                </Button>
              </div>

              {/* Assigned Courses Table */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Assigned Courses</h3>
                <div className="overflow-x-auto border border-gray-200 rounded-lg">
                  <table className="w-full">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="text-left py-3 px-4 font-medium text-gray-700">Course Name</th>
                        <th className="text-left py-3 px-4 font-medium text-gray-700">Subject</th>
                        <th className="text-left py-3 px-4 font-medium text-gray-700">Instructor</th>
                        <th className="text-left py-3 px-4 font-medium text-gray-700">Start Date</th>
                        <th className="text-left py-3 px-4 font-medium text-gray-700">End Date</th>
                        <th className="text-left py-3 px-4 font-medium text-gray-700">Status</th>
                        <th className="text-left py-3 px-4 font-medium text-gray-700">Action</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                      {assignedCourses.map((course) => (
                        <tr key={course.id} className="hover:bg-gray-50">
                          <td className="py-3 px-4">
                            <div>
                              <p className="font-medium text-gray-900">{course.courseName}</p>
                              <p className="text-xs text-gray-500">Assigned: {new Date(course.assignedDate).toLocaleDateString()}</p>
                            </div>
                          </td>
                          <td className="py-3 px-4 text-gray-700">{course.subject}</td>
                          <td className="py-3 px-4 text-gray-700">{course.instructor}</td>
                          <td className="py-3 px-4 text-gray-700">{new Date(course.startDate).toLocaleDateString()}</td>
                          <td className="py-3 px-4 text-gray-700">{new Date(course.endDate).toLocaleDateString()}</td>
                          <td className="py-3 px-4">
                            <Badge className={getCourseStatusColor(course.status)}>
                              {course.status}
                            </Badge>
                          </td>
                          <td className="py-3 px-4">
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => handleRemoveCourseAssignment(course.id)}
                              className="gap-1 text-red-600 hover:text-red-700"
                            >
                              <Trash2 className="w-4 h-4" />
                              Remove
                            </Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  
                  {assignedCourses.length === 0 && (
                    <div className="text-center py-8">
                      <BookOpen className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                      <h3 className="text-lg font-medium text-gray-900 mb-2">No courses assigned</h3>
                      <p className="text-gray-600">
                        Use the dropdown above to assign courses to this student
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Assign Exams Section */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Plus className="w-5 h-5" />
              Assign New Exams
            </CardTitle>
            <CardDescription>
              Select exams from the available list to assign to this student
            </CardDescription>
          </CardHeader>
          <CardContent>
            {/* Search and Filter */}
            <div className="flex flex-col md:flex-row gap-4 mb-6">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <Input
                    placeholder="Search available exams..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              
              <Select value={subjectFilter} onValueChange={setSubjectFilter}>
                <SelectTrigger className="w-48">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Subjects</SelectItem>
                  <SelectItem value="Mathematics">Mathematics</SelectItem>
                  <SelectItem value="English">English</SelectItem>
                  <SelectItem value="Verbal Reasoning">Verbal Reasoning</SelectItem>
                  <SelectItem value="Non-Verbal Reasoning">Non-Verbal Reasoning</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Available Exams List */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
              {filteredAvailableExams.map((exam) => (
                <div
                  key={exam.id}
                  className={`p-4 border rounded-lg cursor-pointer transition-all ${
                    selectedExams.includes(exam.id)
                      ? 'border-purple-500 bg-purple-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                  onClick={() => handleExamSelection(exam.id)}
                >
                  <div className="flex items-start gap-3">
                    <input
                      type="checkbox"
                      checked={selectedExams.includes(exam.id)}
                      onChange={() => handleExamSelection(exam.id)}
                      className="mt-1"
                    />
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <div className={`w-8 h-8 ${exam.color} rounded-lg flex items-center justify-center text-white`}>
                          {exam.icon}
                        </div>
                        <div>
                          <h4 className="font-medium text-gray-900 text-sm">{exam.title}</h4>
                          <p className="text-xs text-gray-600">{exam.subject}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 text-xs text-gray-600">
                        <Badge className={getDifficultyColor(exam.difficulty)} variant="secondary">
                          {exam.difficulty}
                        </Badge>
                        <span>{exam.questions} questions</span>
                        <span>{exam.duration} min</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {filteredAvailableExams.length === 0 && (
              <div className="text-center py-8">
                <BookOpen className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No available exams</h3>
                <p className="text-gray-600">
                  {searchTerm || subjectFilter !== 'all'
                    ? 'Try adjusting your search or filter criteria'
                    : 'All exams have been assigned to this student'
                  }
                </p>
              </div>
            )}

            {/* Assign Button */}
            {selectedExams.length > 0 && (
              <div className="flex justify-end">
                <Button onClick={handleAssignExams} className="gap-2">
                  <Plus className="w-4 h-4" />
                  Assign {selectedExams.length} Exam{selectedExams.length > 1 ? 's' : ''}
                </Button>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Assigned Exams List */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Assigned Exams</CardTitle>
                <CardDescription>
                  Track exam assignments and performance for this student
                </CardDescription>
              </div>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-40">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="Pending">Pending</SelectItem>
                  <SelectItem value="In Progress">In Progress</SelectItem>
                  <SelectItem value="Completed">Completed</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-3 px-4 font-medium text-gray-700">Exam</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-700">Assigned Date</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-700">Status</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-700">Performance</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-700">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredAssignedExams.map((exam) => (
                    <tr key={exam.id} className="border-b border-gray-100 hover:bg-gray-50">
                      <td className="py-4 px-4">
                        <div>
                          <p className="font-medium text-gray-900">{exam.examTitle}</p>
                          <p className="text-sm text-gray-600">{exam.subject}</p>
                        </div>
                      </td>
                      
                      <td className="py-4 px-4">
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <Calendar className="w-4 h-4" />
                          {new Date(exam.assignedDate).toLocaleDateString()}
                        </div>
                      </td>
                      
                      <td className="py-4 px-4">
                        <div className="flex items-center gap-2">
                          {getStatusIcon(exam.status)}
                          <Badge className={getStatusColor(exam.status)}>
                            {exam.status}
                          </Badge>
                        </div>
                      </td>
                      
                      <td className="py-4 px-4">
                        <div className="space-y-1">
                          {exam.score && (
                            <div className="flex items-center gap-2 text-sm">
                              <Target className="w-4 h-4 text-green-500" />
                              <span className="font-medium">{exam.score}%</span>
                            </div>
                          )}
                          {exam.timeSpent && (
                            <div className="flex items-center gap-2 text-sm text-gray-600">
                              <Clock className="w-4 h-4" />
                              <span>{exam.timeSpent} min</span>
                            </div>
                          )}
                          <div className="text-xs text-gray-500">
                            {exam.attempts} attempt{exam.attempts !== 1 ? 's' : ''}
                          </div>
                        </div>
                      </td>
                      
                      <td className="py-4 px-4">
                        <div className="flex items-center gap-2">
                          {exam.status === 'Completed' && (
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => navigate(`/students/${studentId}/exam/${exam.examId}/attempts`)}
                              className="gap-1"
                            >
                              <Eye className="w-4 h-4" />
                              View Performance
                            </Button>
                          )}
                          
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleRemoveAssignment(exam.id)}
                            className="gap-1 text-red-600 hover:text-red-700"
                          >
                            <Trash2 className="w-4 h-4" />
                            Remove
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              
              {filteredAssignedExams.length === 0 && (
                <div className="text-center py-12">
                  <BookOpen className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No assigned exams</h3>
                  <p className="text-gray-600">
                    {statusFilter !== 'all'
                      ? `No exams with ${statusFilter.toLowerCase()} status`
                      : 'Assign exams to this student using the section above'
                    }
                  </p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}