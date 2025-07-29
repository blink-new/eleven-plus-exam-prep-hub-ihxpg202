import { useState, useEffect } from 'react'
import { Link, useParams, useNavigate } from 'react-router-dom'
import { Button } from '../components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card'
import { Badge } from '../components/ui/badge'
import { Input } from '../components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select'
import { Textarea } from '../components/ui/textarea'
import { 
  Trophy,
  BookOpen,
  Calculator,
  Brain,
  Puzzle,
  Search,
  Plus,
  Users,
  UserMinus,
  User,
  Settings,
  LogOut,
  Bell,
  MoreVertical,
  Home,
  Upload,
  CheckCircle,
  BarChart3,
  Menu,
  X,
  Video,
  ChevronLeft,
  Mail,
  Calendar,
  Clock,
  UserPlus,
  Trash2,
  FileText,
  Send,
  Eye,
  Download,
  AlertCircle,
  Info,
  AlertTriangle,
  Filter,
  Tag,
  File,
  Image,
  FileType,
  ChevronDown,
  ChevronUp
} from 'lucide-react'

interface Student {
  id: string
  name: string
  email: string
  enrolledDate: string
  lastActivity: string
  progress: number
  status: 'active' | 'inactive'
}

interface VirtualClass {
  id: string
  name: string
  description: string
  totalStudents: number
  createdDate: string
  subject: string
  status: 'active' | 'inactive'
}

interface Exam {
  id: string
  title: string
  subject: string
  difficulty: 'Easy' | 'Medium' | 'Hard'
  questions: number
  duration: number
  createdDate: string
  status: 'active' | 'inactive'
}

interface AssignedExam {
  id: string
  examId: string
  examTitle: string
  subject: string
  status: 'Active' | 'Expired'
  assignedDate: string
  dueDate: string
}

interface ClassNotification {
  id: string
  title: string
  message: string
  type: 'Info' | 'Alert' | 'Reminder'
  scheduledDate?: string
  sentDate?: string
  status: 'Draft' | 'Scheduled' | 'Sent'
}

interface ReferenceDocument {
  id: string
  title: string
  description: string
  fileName: string
  fileType: string
  fileSize: string
  uploadedDate: string
  category: 'Homework' | 'Notes' | 'Syllabus' | 'Other'
}

const mockStudents: Student[] = [
  {
    id: '1',
    name: 'Emma Thompson',
    email: 'emma.thompson@email.com',
    enrolledDate: '2024-01-20',
    lastActivity: '2 hours ago',
    progress: 85,
    status: 'active'
  },
  {
    id: '2',
    name: 'James Wilson',
    email: 'james.wilson@email.com',
    enrolledDate: '2024-01-18',
    lastActivity: '1 day ago',
    progress: 72,
    status: 'active'
  },
  {
    id: '3',
    name: 'Sophie Chen',
    email: 'sophie.chen@email.com',
    enrolledDate: '2024-01-15',
    lastActivity: '3 days ago',
    progress: 91,
    status: 'active'
  },
  {
    id: '4',
    name: 'Oliver Brown',
    email: 'oliver.brown@email.com',
    enrolledDate: '2024-01-12',
    lastActivity: '1 week ago',
    progress: 45,
    status: 'inactive'
  }
]

const availableStudents: Student[] = [
  {
    id: '5',
    name: 'Lily Davis',
    email: 'lily.davis@email.com',
    enrolledDate: '',
    lastActivity: '',
    progress: 0,
    status: 'active'
  },
  {
    id: '6',
    name: 'Noah Johnson',
    email: 'noah.johnson@email.com',
    enrolledDate: '',
    lastActivity: '',
    progress: 0,
    status: 'active'
  },
  {
    id: '7',
    name: 'Ava Martinez',
    email: 'ava.martinez@email.com',
    enrolledDate: '',
    lastActivity: '',
    progress: 0,
    status: 'active'
  }
]

const mockClasses: VirtualClass[] = [
  {
    id: '1',
    name: 'Advanced Mathematics',
    description: 'Comprehensive math preparation covering algebra, geometry, and problem-solving techniques for 11+ exams.',
    totalStudents: 24,
    createdDate: '2024-01-15',
    subject: 'Mathematics',
    status: 'active'
  },
  {
    id: '2',
    name: 'English Language & Comprehension',
    description: 'Focus on reading comprehension, grammar, vocabulary, and creative writing skills.',
    totalStudents: 18,
    createdDate: '2024-01-10',
    subject: 'English',
    status: 'active'
  }
]

const availableExams: Exam[] = [
  {
    id: '1',
    title: 'Algebra Fundamentals',
    subject: 'Mathematics',
    difficulty: 'Easy',
    questions: 20,
    duration: 45,
    createdDate: '2024-01-10',
    status: 'active'
  },
  {
    id: '2',
    title: 'Advanced Geometry',
    subject: 'Mathematics',
    difficulty: 'Hard',
    questions: 25,
    duration: 60,
    createdDate: '2024-01-08',
    status: 'active'
  },
  {
    id: '3',
    title: 'Reading Comprehension',
    subject: 'English',
    difficulty: 'Medium',
    questions: 15,
    duration: 40,
    createdDate: '2024-01-12',
    status: 'active'
  },
  {
    id: '4',
    title: 'Grammar & Vocabulary',
    subject: 'English',
    difficulty: 'Easy',
    questions: 30,
    duration: 35,
    createdDate: '2024-01-14',
    status: 'active'
  }
]

const mockAssignedExams: AssignedExam[] = [
  {
    id: '1',
    examId: '1',
    examTitle: 'Algebra Fundamentals',
    subject: 'Mathematics',
    status: 'Active',
    assignedDate: '2024-01-20',
    dueDate: '2024-02-05'
  },
  {
    id: '2',
    examId: '3',
    examTitle: 'Reading Comprehension',
    subject: 'English',
    status: 'Active',
    assignedDate: '2024-01-18',
    dueDate: '2024-02-03'
  }
]

const mockNotifications: ClassNotification[] = [
  {
    id: '1',
    title: 'Welcome to Advanced Mathematics',
    message: 'Welcome to our Advanced Mathematics class! Please review the syllabus and prepare for our first lesson.',
    type: 'Info',
    sentDate: '2024-01-15',
    status: 'Sent'
  },
  {
    id: '2',
    title: 'Upcoming Exam Reminder',
    message: 'Don\'t forget about the Algebra Fundamentals exam due on February 5th. Make sure to practice the sample questions.',
    type: 'Reminder',
    sentDate: '2024-01-22',
    status: 'Sent'
  }
]

const mockDocuments: ReferenceDocument[] = [
  {
    id: '1',
    title: 'Mathematics Syllabus 2024',
    description: 'Complete syllabus covering all topics for the mathematics course',
    fileName: 'math_syllabus_2024.pdf',
    fileType: 'PDF',
    fileSize: '2.4 MB',
    uploadedDate: '2024-01-15',
    category: 'Syllabus'
  },
  {
    id: '2',
    title: 'Algebra Practice Problems',
    description: 'Additional practice problems for algebra fundamentals',
    fileName: 'algebra_practice.pdf',
    fileType: 'PDF',
    fileSize: '1.8 MB',
    uploadedDate: '2024-01-18',
    category: 'Homework'
  },
  {
    id: '3',
    title: 'Class Notes - Week 1',
    description: 'Comprehensive notes from the first week of classes',
    fileName: 'week1_notes.docx',
    fileType: 'DOCX',
    fileSize: '856 KB',
    uploadedDate: '2024-01-20',
    category: 'Notes'
  }
]

export default function ClassDetailsPage() {
  const { classId } = useParams()
  const navigate = useNavigate()
  const [currentClass, setCurrentClass] = useState<VirtualClass | null>(null)
  const [enrolledStudents, setEnrolledStudents] = useState<Student[]>(mockStudents)
  const [searchTerm, setSearchTerm] = useState('')
  const [studentSearchTerm, setStudentSearchTerm] = useState('')
  const [selectedStudents, setSelectedStudents] = useState<string[]>([])
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  
  // Exam assignment state
  const [examSearchTerm, setExamSearchTerm] = useState('')
  const [selectedExam, setSelectedExam] = useState('')
  const [examSubjectFilter, setExamSubjectFilter] = useState('all')
  const [examDifficultyFilter, setExamDifficultyFilter] = useState('all')
  const [assignedExams, setAssignedExams] = useState<AssignedExam[]>(mockAssignedExams)
  
  // Notification state
  const [isNotificationPanelOpen, setIsNotificationPanelOpen] = useState(false)
  const [notificationTitle, setNotificationTitle] = useState('')
  const [notificationMessage, setNotificationMessage] = useState('')
  const [notificationType, setNotificationType] = useState<'Info' | 'Alert' | 'Reminder'>('Info')
  const [isScheduled, setIsScheduled] = useState(false)
  const [scheduledDate, setScheduledDate] = useState('')
  const [notifications, setNotifications] = useState<ClassNotification[]>(mockNotifications)
  
  // Document upload state
  const [documentTitle, setDocumentTitle] = useState('')
  const [documentDescription, setDocumentDescription] = useState('')
  const [documentCategory, setDocumentCategory] = useState<'Homework' | 'Notes' | 'Syllabus' | 'Other'>('Notes')
  const [documents, setDocuments] = useState<ReferenceDocument[]>(mockDocuments)
  const [isDocumentSectionExpanded, setIsDocumentSectionExpanded] = useState(false)

  useEffect(() => {
    // Find the class by ID
    const foundClass = mockClasses.find(cls => cls.id === classId)
    setCurrentClass(foundClass || null)
  }, [classId])

  const filteredEnrolledStudents = enrolledStudents.filter(student =>
    student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.email.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const filteredAvailableStudents = availableStudents.filter(student =>
    (student.name.toLowerCase().includes(studentSearchTerm.toLowerCase()) ||
     student.email.toLowerCase().includes(studentSearchTerm.toLowerCase())) &&
    !enrolledStudents.some(enrolled => enrolled.id === student.id)
  )

  const handleStudentSelection = (studentId: string) => {
    setSelectedStudents(prev => 
      prev.includes(studentId) 
        ? prev.filter(id => id !== studentId)
        : [...prev, studentId]
    )
  }

  const handleAddStudents = () => {
    const studentsToAdd = availableStudents.filter(student => 
      selectedStudents.includes(student.id)
    ).map(student => ({
      ...student,
      enrolledDate: new Date().toISOString().split('T')[0],
      lastActivity: 'Just enrolled',
      progress: 0
    }))

    setEnrolledStudents([...enrolledStudents, ...studentsToAdd])
    setSelectedStudents([])
    setStudentSearchTerm('')
  }

  const handleRemoveStudent = (studentId: string) => {
    setEnrolledStudents(enrolledStudents.filter(student => student.id !== studentId))
  }

  // Exam assignment functions
  const filteredAvailableExams = availableExams.filter(exam => {
    const matchesSearch = exam.title.toLowerCase().includes(examSearchTerm.toLowerCase()) ||
                         exam.subject.toLowerCase().includes(examSearchTerm.toLowerCase())
    const matchesSubject = examSubjectFilter === 'all' || exam.subject === examSubjectFilter
    const matchesDifficulty = examDifficultyFilter === 'all' || exam.difficulty === examDifficultyFilter
    const notAlreadyAssigned = !assignedExams.some(assigned => assigned.examId === exam.id)
    
    return matchesSearch && matchesSubject && matchesDifficulty && notAlreadyAssigned
  })

  const handleAssignExam = () => {
    if (!selectedExam) return
    
    const exam = availableExams.find(e => e.id === selectedExam)
    if (!exam) return

    const newAssignment: AssignedExam = {
      id: Date.now().toString(),
      examId: exam.id,
      examTitle: exam.title,
      subject: exam.subject,
      status: 'Active',
      assignedDate: new Date().toISOString().split('T')[0],
      dueDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString().split('T')[0] // 2 weeks from now
    }

    setAssignedExams([...assignedExams, newAssignment])
    setSelectedExam('')
    setExamSearchTerm('')
  }

  const handleUnassignExam = (assignmentId: string) => {
    setAssignedExams(assignedExams.filter(exam => exam.id !== assignmentId))
  }

  // Notification functions
  const handleSendNotification = () => {
    if (!notificationTitle.trim() || !notificationMessage.trim()) return

    const newNotification: ClassNotification = {
      id: Date.now().toString(),
      title: notificationTitle,
      message: notificationMessage,
      type: notificationType,
      scheduledDate: isScheduled ? scheduledDate : undefined,
      sentDate: isScheduled ? undefined : new Date().toISOString().split('T')[0],
      status: isScheduled ? 'Scheduled' : 'Sent'
    }

    setNotifications([newNotification, ...notifications])
    setNotificationTitle('')
    setNotificationMessage('')
    setScheduledDate('')
    setIsScheduled(false)
    setIsNotificationPanelOpen(false)
  }

  // Document upload functions
  const handleDocumentUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file || !documentTitle.trim()) return

    const newDocument: ReferenceDocument = {
      id: Date.now().toString(),
      title: documentTitle,
      description: documentDescription,
      fileName: file.name,
      fileType: file.name.split('.').pop()?.toUpperCase() || 'FILE',
      fileSize: `${(file.size / 1024 / 1024).toFixed(1)} MB`,
      uploadedDate: new Date().toISOString().split('T')[0],
      category: documentCategory
    }

    setDocuments([newDocument, ...documents])
    setDocumentTitle('')
    setDocumentDescription('')
    event.target.value = ''
  }

  const handleDeleteDocument = (documentId: string) => {
    setDocuments(documents.filter(doc => doc.id !== documentId))
  }

  const getFileIcon = (fileType: string) => {
    switch (fileType.toLowerCase()) {
      case 'pdf': return <FileText className="w-5 h-5 text-red-500" />
      case 'doc':
      case 'docx': return <File className="w-5 h-5 text-blue-500" />
      case 'jpg':
      case 'jpeg':
      case 'png':
      case 'gif': return <Image className="w-5 h-5 text-green-500" />
      default: return <FileType className="w-5 h-5 text-gray-500" />
    }
  }

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'Alert': return <AlertTriangle className="w-4 h-4 text-red-500" />
      case 'Reminder': return <Clock className="w-4 h-4 text-orange-500" />
      default: return <Info className="w-4 h-4 text-blue-500" />
    }
  }

  const getSubjectIcon = (subject: string) => {
    switch (subject) {
      case 'Mathematics': return <Calculator className="w-5 h-5 text-blue-500" />
      case 'English': return <BookOpen className="w-5 h-5 text-green-500" />
      case 'Verbal Reasoning': return <Brain className="w-5 h-5 text-purple-500" />
      case 'Non-Verbal Reasoning': return <Puzzle className="w-5 h-5 text-orange-500" />
      default: return <Video className="w-5 h-5 text-gray-500" />
    }
  }

  const sidebarItems = [
    { id: 'dashboard', label: 'Dashboard', icon: <Home className="w-5 h-5" />, path: '/dashboard' },
    { id: 'performance', label: 'Performance', icon: <BarChart3 className="w-5 h-5" />, path: '/performance' },
    { id: 'virtual-classes', label: 'Virtual Classes', icon: <Video className="w-5 h-5" />, path: '/virtual-classes' },
    { id: 'completed', label: 'Completed Papers', icon: <CheckCircle className="w-5 h-5" />, path: '/completed-papers' },
    { id: 'create', label: 'Create Your Exam', icon: <Plus className="w-5 h-5" />, path: '/create-exam' },
    { id: 'upload', label: 'Upload Answers', icon: <Upload className="w-5 h-5" />, path: '/omr-upload' },
    { id: 'mathematics', label: 'Mathematics', icon: <Calculator className="w-5 h-5" />, path: '/subject/mathematics' },
    { id: 'english', label: 'English', icon: <BookOpen className="w-5 h-5" />, path: '/subject/english' },
    { id: 'verbal', label: 'Verbal Reasoning', icon: <Brain className="w-5 h-5" />, path: '/subject/verbal' },
    { id: 'nonverbal', label: 'Non-Verbal Reasoning', icon: <Puzzle className="w-5 h-5" />, path: '/subject/nonverbal' }
  ]

  if (!currentClass) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Class Not Found</h1>
          <p className="text-gray-600 mb-6">The requested class could not be found.</p>
          <Button onClick={() => navigate('/virtual-classes')}>
            <ChevronLeft className="w-4 h-4 mr-2" />
            Back to Virtual Classes
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b sticky top-0 z-50">
        <div className="px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="lg:hidden p-2 rounded-md text-gray-700 hover:text-purple-600"
            >
              {isSidebarOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>

            {/* Logo */}
            <Link to="/" className="flex items-center gap-3">
              <div className="p-2 bg-purple-600 rounded-lg">
                <Trophy className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">11+ Prep Hub</h1>
                <p className="text-xs text-gray-600">Class Management</p>
              </div>
            </Link>

            {/* User Menu */}
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="sm">
                <Bell className="w-5 h-5" />
              </Button>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                  <User className="w-5 h-5 text-purple-600" />
                </div>
                <div className="hidden md:block">
                  <p className="text-sm font-medium text-gray-900">Alex Johnson</p>
                  <p className="text-xs text-gray-600">Teacher</p>
                </div>
                <Button variant="ghost" size="sm">
                  <MoreVertical className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Left Sidebar */}
        <aside className={`${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } lg:translate-x-0 fixed lg:static inset-y-0 left-0 z-40 w-72 bg-white border-r border-gray-200 transition-transform duration-300 ease-in-out flex-shrink-0`}>
          <div className="flex flex-col h-full">
            {/* Sidebar Header */}
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                  <User className="w-6 h-6 text-purple-600" />
                </div>
                <div>
                  <p className="font-semibold text-gray-900">Alex Johnson</p>
                  <p className="text-sm text-gray-600">Teacher</p>
                </div>
              </div>
            </div>

            {/* Navigation */}
            <nav className="flex-1 p-4 space-y-2">
              {sidebarItems.map((item) => (
                <Link
                  key={item.id}
                  to={item.path}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-colors ${
                    item.id === 'virtual-classes'
                      ? 'bg-purple-100 text-purple-700 font-medium'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                  onClick={() => setIsSidebarOpen(false)}
                >
                  {item.icon}
                  <span>{item.label}</span>
                </Link>
              ))}
            </nav>

            {/* Sidebar Footer */}
            <div className="p-4 border-t border-gray-200">
              <Button variant="ghost" className="w-full justify-start gap-3 text-gray-700">
                <Settings className="w-5 h-5" />
                Settings
              </Button>
              <Button variant="ghost" className="w-full justify-start gap-3 text-gray-700 mt-2">
                <LogOut className="w-5 h-5" />
                Sign Out
              </Button>
            </div>
          </div>
        </aside>

        {/* Mobile Overlay */}
        {isSidebarOpen && (
          <div 
            className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-30"
            onClick={() => setIsSidebarOpen(false)}
          />
        )}

        {/* Main Content */}
        <main className="flex-1 lg:ml-0 min-w-0">
          <div className="max-w-7xl mx-auto p-6">
            <div className="grid grid-cols-1 xl:grid-cols-4 gap-6">
              {/* Left Column - Main Content */}
              <div className="xl:col-span-3 min-w-0">
                {/* Breadcrumb */}
                <div className="flex items-center gap-2 mb-6">
            <Link to="/dashboard" className="text-gray-500 hover:text-purple-600">
              <Home className="w-4 h-4" />
            </Link>
            <ChevronLeft className="w-4 h-4 text-gray-400 rotate-180" />
            <Link to="/virtual-classes" className="text-gray-500 hover:text-purple-600">
              Virtual Classes
            </Link>
            <ChevronLeft className="w-4 h-4 text-gray-400 rotate-180" />
            <span className="text-gray-900 font-medium">{currentClass.name}</span>
          </div>

          {/* Enhanced Class Header with Banner */}
          <div className="mb-8">
            {/* Header Banner */}
            <div className="bg-gradient-to-r from-purple-600 via-blue-600 to-indigo-600 rounded-t-xl p-8 text-white">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-6">
                  <div className="p-4 bg-white/20 backdrop-blur-sm rounded-xl">
                    {getSubjectIcon(currentClass.subject)}
                  </div>
                  <div>
                    <h1 className="text-4xl font-bold mb-2">{currentClass.name}</h1>
                    <p className="text-xl text-white/90 mb-4 max-w-2xl">
                      {currentClass.description}
                    </p>
                    <div className="flex items-center gap-4">
                      <Badge variant="secondary" className="bg-white/20 text-white border-white/30">
                        {currentClass.subject}
                      </Badge>
                      <Badge variant={currentClass.status === 'active' ? 'default' : 'secondary'} 
                             className="bg-white/20 text-white border-white/30">
                        {currentClass.status}
                      </Badge>
                      <span className="text-white/80">
                        Created: {new Date(currentClass.createdDate).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                </div>
                <Button 
                  variant="secondary"
                  onClick={() => navigate('/virtual-classes')}
                  className="bg-white/20 hover:bg-white/30 text-white border-white/30"
                >
                  <ChevronLeft className="w-4 h-4 mr-2" />
                  Back to Classes
                </Button>
              </div>
            </div>

            {/* Statistics Cards */}
            <Card className="rounded-t-none border-t-0">
              <CardContent className="p-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  <div className="text-center p-6 bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl">
                    <div className="text-4xl font-bold text-purple-600 mb-2">{enrolledStudents.length}</div>
                    <p className="text-gray-700 font-medium">Enrolled Students</p>
                  </div>
                  <div className="text-center p-6 bg-gradient-to-br from-green-50 to-green-100 rounded-xl">
                    <div className="text-4xl font-bold text-green-600 mb-2">
                      {Math.round(enrolledStudents.reduce((acc, student) => acc + student.progress, 0) / enrolledStudents.length) || 0}%
                    </div>
                    <p className="text-gray-700 font-medium">Average Progress</p>
                  </div>
                  <div className="text-center p-6 bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl">
                    <div className="text-4xl font-bold text-blue-600 mb-2">
                      {enrolledStudents.filter(student => student.status === 'active').length}
                    </div>
                    <p className="text-gray-700 font-medium">Active Students</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Enhanced Search & Assign Exam Section */}
          <Card className="mb-8 border-2 border-blue-100 shadow-lg">
            <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50 border-b border-blue-100">
              <CardTitle className="flex items-center gap-3 text-xl font-bold text-blue-800">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <FileText className="w-6 h-6 text-blue-600" />
                </div>
                Search & Assign Exam
              </CardTitle>
              <CardDescription className="text-blue-700 font-medium">
                Find and assign exams to this class with advanced filtering options
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6 p-6">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <Input
                    placeholder="Search exams..."
                    value={examSearchTerm}
                    onChange={(e) => setExamSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <Select value={examSubjectFilter} onValueChange={setExamSubjectFilter}>
                  <SelectTrigger>
                    <SelectValue placeholder="Subject" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Subjects</SelectItem>
                    <SelectItem value="Mathematics">Mathematics</SelectItem>
                    <SelectItem value="English">English</SelectItem>
                    <SelectItem value="Verbal Reasoning">Verbal Reasoning</SelectItem>
                    <SelectItem value="Non-Verbal Reasoning">Non-Verbal Reasoning</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={examDifficultyFilter} onValueChange={setExamDifficultyFilter}>
                  <SelectTrigger>
                    <SelectValue placeholder="Difficulty" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Levels</SelectItem>
                    <SelectItem value="Easy">Easy</SelectItem>
                    <SelectItem value="Medium">Medium</SelectItem>
                    <SelectItem value="Hard">Hard</SelectItem>
                  </SelectContent>
                </Select>
                <Button 
                  onClick={handleAssignExam}
                  disabled={!selectedExam}
                  className="bg-purple-600 hover:bg-purple-700"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Assign Exam
                </Button>
              </div>

              {filteredAvailableExams.length > 0 && (
                <div className="space-y-2">
                  <h4 className="font-medium text-gray-900">Available Exams</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-h-48 overflow-y-auto">
                    {filteredAvailableExams.map((exam) => (
                      <div 
                        key={exam.id} 
                        className={`p-3 border rounded-lg cursor-pointer transition-colors ${
                          selectedExam === exam.id ? 'border-purple-500 bg-purple-50' : 'border-gray-200 hover:border-gray-300'
                        }`}
                        onClick={() => setSelectedExam(exam.id)}
                      >
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <h5 className="font-medium text-gray-900">{exam.title}</h5>
                            <div className="flex items-center gap-2 mt-1">
                              <Badge variant="outline" className="text-xs">{exam.subject}</Badge>
                              <Badge variant={exam.difficulty === 'Easy' ? 'default' : exam.difficulty === 'Medium' ? 'secondary' : 'destructive'} className="text-xs">
                                {exam.difficulty}
                              </Badge>
                            </div>
                            <p className="text-sm text-gray-600 mt-1">
                              {exam.questions} questions • {exam.duration} min
                            </p>
                          </div>
                          <input
                            type="radio"
                            checked={selectedExam === exam.id}
                            onChange={() => setSelectedExam(exam.id)}
                            className="mt-1 text-purple-600 focus:ring-purple-500"
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Enhanced Assigned Exams List */}
              <div className="bg-gradient-to-r from-slate-50 to-gray-50 p-6 rounded-xl border border-slate-200">
                <h4 className="font-bold text-lg text-slate-800 mb-4 flex items-center gap-2">
                  <div className="p-1 bg-slate-200 rounded">
                    <CheckCircle className="w-4 h-4 text-slate-600" />
                  </div>
                  Assigned Exams ({assignedExams.length})
                </h4>
                {assignedExams.length === 0 ? (
                  <div className="text-center py-12 text-slate-500">
                    <div className="p-4 bg-slate-100 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                      <FileText className="w-8 h-8 text-slate-400" />
                    </div>
                    <p className="font-medium">No exams assigned to this class yet.</p>
                    <p className="text-sm mt-1">Use the search above to find and assign exams.</p>
                  </div>
                ) : (
                  <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
                    <div className="overflow-x-auto">
                      <table className="w-full min-w-[700px]">
                        <thead className="bg-slate-50 border-b border-slate-200">
                          <tr>
                            <th className="text-left py-4 px-4 font-semibold text-slate-700">Exam Title</th>
                            <th className="text-left py-4 px-4 font-semibold text-slate-700">Subject</th>
                            <th className="text-left py-4 px-4 font-semibold text-slate-700">Status</th>
                            <th className="text-left py-4 px-4 font-semibold text-slate-700">Assigned</th>
                            <th className="text-left py-4 px-4 font-semibold text-slate-700">Due Date</th>
                            <th className="text-left py-4 px-4 font-semibold text-slate-700">Actions</th>
                          </tr>
                        </thead>
                        <tbody>
                          {assignedExams.map((exam, index) => (
                            <tr key={exam.id} className={`border-b border-slate-100 hover:bg-slate-50 transition-colors ${
                              index % 2 === 0 ? 'bg-white' : 'bg-slate-25'
                            }`}>
                              <td className="py-4 px-4 font-medium text-slate-900">{exam.examTitle}</td>
                              <td className="py-4 px-4">
                                <Badge variant="outline" className="border-slate-300 text-slate-700">{exam.subject}</Badge>
                              </td>
                              <td className="py-4 px-4">
                                <Badge variant={exam.status === 'Active' ? 'default' : 'secondary'} 
                                       className={exam.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}>
                                  {exam.status}
                                </Badge>
                              </td>
                              <td className="py-4 px-4 text-slate-600">
                                {new Date(exam.assignedDate).toLocaleDateString()}
                              </td>
                              <td className="py-4 px-4 text-slate-600">
                                {new Date(exam.dueDate).toLocaleDateString()}
                              </td>
                              <td className="py-4 px-4">
                                <div className="flex items-center gap-2">
                                  <Button variant="ghost" size="sm" className="text-blue-600 hover:text-blue-700 hover:bg-blue-50">
                                    <Eye className="w-4 h-4" />
                                  </Button>
                                  <Button 
                                    variant="ghost" 
                                    size="sm" 
                                    onClick={() => handleUnassignExam(exam.id)}
                                    className="text-red-600 hover:text-red-700 hover:bg-red-50"
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
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Enhanced Search & Add Students Section */}
          <Card className="mb-8 border-2 border-green-100 shadow-lg">
            <CardHeader className="bg-gradient-to-r from-green-50 to-emerald-50 border-b border-green-100">
              <CardTitle className="flex items-center gap-3 text-xl font-bold text-green-800">
                <div className="p-2 bg-green-100 rounded-lg">
                  <UserPlus className="w-6 h-6 text-green-600" />
                </div>
                Search & Add Students
              </CardTitle>
              <CardDescription className="text-green-700 font-medium">
                Find and assign students to this class with real-time search
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6 p-6">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  placeholder="Search students by name or email..."
                  value={studentSearchTerm}
                  onChange={(e) => setStudentSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>

              {studentSearchTerm && (
                <div className="space-y-2">
                  <h4 className="font-medium text-gray-900">Available Students</h4>
                  {filteredAvailableStudents.length === 0 ? (
                    <p className="text-gray-600 text-sm">No students found matching your search.</p>
                  ) : (
                    <div className="space-y-2 max-h-48 overflow-y-auto">
                      {filteredAvailableStudents.map((student) => (
                        <div key={student.id} className="flex items-center gap-3 p-3 border rounded-lg">
                          <input
                            type="checkbox"
                            checked={selectedStudents.includes(student.id)}
                            onChange={() => handleStudentSelection(student.id)}
                            className="rounded border-gray-300 text-purple-600 focus:ring-purple-500"
                          />
                          <div className="flex-1">
                            <p className="font-medium text-gray-900">{student.name}</p>
                            <p className="text-sm text-gray-600">{student.email}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                  
                  {selectedStudents.length > 0 && (
                    <Button 
                      onClick={handleAddStudents}
                      className="bg-purple-600 hover:bg-purple-700"
                    >
                      <UserPlus className="w-4 h-4 mr-2" />
                      Add {selectedStudents.length} Student{selectedStudents.length > 1 ? 's' : ''} to Class
                    </Button>
                  )}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Enhanced Enrolled Students Section */}
          <Card className="border-2 border-purple-100 shadow-lg">
            <CardHeader className="bg-gradient-to-r from-purple-50 to-violet-50 border-b border-purple-100">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="flex items-center gap-3 text-xl font-bold text-purple-800">
                    <div className="p-2 bg-purple-100 rounded-lg">
                      <Users className="w-6 h-6 text-purple-600" />
                    </div>
                    Enrolled Students ({enrolledStudents.length})
                  </CardTitle>
                  <CardDescription className="text-purple-700 font-medium">
                    Manage students assigned to this class with comprehensive tracking
                  </CardDescription>
                </div>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-purple-400 w-4 h-4" />
                  <Input
                    placeholder="Search enrolled students..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 w-64 border-purple-200 focus:border-purple-400 focus:ring-purple-400"
                  />
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-6">
              {filteredEnrolledStudents.length === 0 ? (
                <div className="text-center py-12">
                  <Users className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">
                    {searchTerm ? 'No students found' : 'No students enrolled'}
                  </h3>
                  <p className="text-gray-600 mb-4">
                    {searchTerm 
                      ? 'Try adjusting your search criteria.'
                      : 'Start by adding students to this class using the search above.'
                    }
                  </p>
                </div>
              ) : (
                <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
                  <div className="overflow-x-auto">
                    <table className="w-full min-w-[800px]">
                      <thead className="bg-purple-50 border-b border-purple-200">
                        <tr>
                          <th className="text-left py-4 px-4 font-semibold text-purple-700">Student</th>
                          <th className="text-left py-4 px-4 font-semibold text-purple-700">Email</th>
                          <th className="text-left py-4 px-4 font-semibold text-purple-700">Enrolled</th>
                          <th className="text-left py-4 px-4 font-semibold text-purple-700">Activity</th>
                          <th className="text-left py-4 px-4 font-semibold text-purple-700">Progress</th>
                          <th className="text-left py-4 px-4 font-semibold text-purple-700">Status</th>
                          <th className="text-left py-4 px-4 font-semibold text-purple-700">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {filteredEnrolledStudents.map((student, index) => (
                          <tr key={student.id} className={`border-b border-purple-100 hover:bg-purple-50 transition-colors ${
                            index % 2 === 0 ? 'bg-white' : 'bg-purple-25'
                          }`}>
                            <td className="py-4 px-4">
                              <div className="flex items-center gap-3">
                                <div className="w-10 h-10 bg-gradient-to-br from-purple-100 to-purple-200 rounded-full flex items-center justify-center">
                                  <User className="w-5 h-5 text-purple-600" />
                                </div>
                                <span className="font-semibold text-purple-900">{student.name}</span>
                              </div>
                            </td>
                            <td className="py-4 px-4 text-slate-600">{student.email}</td>
                            <td className="py-4 px-4 text-slate-600">
                              {new Date(student.enrolledDate).toLocaleDateString()}
                            </td>
                            <td className="py-4 px-4 text-slate-600">{student.lastActivity}</td>
                            <td className="py-4 px-4">
                              <div className="flex items-center gap-3">
                                <div className="w-20 bg-purple-100 rounded-full h-3 overflow-hidden">
                                  <div 
                                    className="bg-gradient-to-r from-purple-500 to-purple-600 h-3 rounded-full transition-all duration-300" 
                                    style={{ width: `${student.progress}%` }}
                                  />
                                </div>
                                <span className="text-sm font-medium text-purple-700">{student.progress}%</span>
                              </div>
                            </td>
                            <td className="py-4 px-4">
                              <Badge variant={student.status === 'active' ? 'default' : 'secondary'}
                                     className={student.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}>
                                {student.status}
                              </Badge>
                            </td>
                            <td className="py-4 px-4">
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => handleRemoveStudent(student.id)}
                                className="text-red-600 hover:text-red-700 hover:bg-red-50"
                              >
                                <UserMinus className="w-4 h-4" />
                              </Button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Reference Documents Upload Section */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    <Upload className="w-5 h-5" />
                    Reference Documents ({documents.length})
                  </CardTitle>
                  <CardDescription>
                    Upload and manage reference materials for this class
                  </CardDescription>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsDocumentSectionExpanded(!isDocumentSectionExpanded)}
                >
                  {isDocumentSectionExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                </Button>
              </div>
            </CardHeader>
            {isDocumentSectionExpanded && (
              <CardContent className="space-y-6">
                {/* Upload Form */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 bg-gray-50 rounded-lg">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Document Title</label>
                    <Input
                      placeholder="Enter document title..."
                      value={documentTitle}
                      onChange={(e) => setDocumentTitle(e.target.value)}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                    <Select value={documentCategory} onValueChange={setDocumentCategory}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Homework">Homework</SelectItem>
                        <SelectItem value="Notes">Notes</SelectItem>
                        <SelectItem value="Syllabus">Syllabus</SelectItem>
                        <SelectItem value="Other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                    <Textarea
                      placeholder="Brief description of the document..."
                      value={documentDescription}
                      onChange={(e) => setDocumentDescription(e.target.value)}
                      rows={2}
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Upload File</label>
                    <div className="flex items-center gap-4">
                      <input
                        type="file"
                        accept=".pdf,.doc,.docx,.jpg,.jpeg,.png,.gif"
                        onChange={handleDocumentUpload}
                        className="flex-1 text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-purple-50 file:text-purple-700 hover:file:bg-purple-100"
                      />
                      <p className="text-xs text-gray-500">
                        PDF, DOC, DOCX, JPG, PNG (Max 10MB)
                      </p>
                    </div>
                  </div>
                </div>

                {/* Documents List */}
                <div>
                  <h4 className="font-medium text-gray-900 mb-3">Uploaded Documents</h4>
                  {documents.length === 0 ? (
                    <div className="text-center py-8 text-gray-500">
                      <Upload className="w-8 h-8 mx-auto mb-2 text-gray-400" />
                      <p>No documents uploaded yet.</p>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {documents.map((doc) => (
                        <div key={doc.id} className="flex items-center gap-4 p-4 border rounded-lg hover:bg-gray-50">
                          <div className="flex-shrink-0">
                            {getFileIcon(doc.fileType)}
                          </div>
                          <div className="flex-1">
                            <h5 className="font-medium text-gray-900">{doc.title}</h5>
                            <p className="text-sm text-gray-600">{doc.description}</p>
                            <div className="flex items-center gap-4 mt-2">
                              <span className="text-xs text-gray-500">{doc.fileName}</span>
                              <Badge variant="outline" className="text-xs">
                                <Tag className="w-3 h-3 mr-1" />
                                {doc.category}
                              </Badge>
                              <span className="text-xs text-gray-500">{doc.fileSize}</span>
                              <span className="text-xs text-gray-500">
                                {new Date(doc.uploadedDate).toLocaleDateString()}
                              </span>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <Button variant="ghost" size="sm" className="text-blue-600 hover:text-blue-700">
                              <Download className="w-4 h-4" />
                            </Button>
                            <Button 
                              variant="ghost" 
                              size="sm" 
                              onClick={() => handleDeleteDocument(doc.id)}
                              className="text-red-600 hover:text-red-700"
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </CardContent>
            )}
          </Card>
              </div>

              {/* Right Column - Class Notification Panel */}
              <div className="xl:col-span-1 min-w-0">
                <Card className="sticky top-6">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="flex items-center gap-2">
                      <Bell className="w-5 h-5" />
                      Class Notifications
                    </CardTitle>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setIsNotificationPanelOpen(!isNotificationPanelOpen)}
                    >
                      {isNotificationPanelOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                    </Button>
                  </div>
                  <CardDescription>
                    Send notifications to all enrolled students
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Notification Form */}
                  {isNotificationPanelOpen && (
                    <div className="space-y-4 p-4 bg-gray-50 rounded-lg">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Title</label>
                        <Input
                          placeholder="Notification title..."
                          value={notificationTitle}
                          onChange={(e) => setNotificationTitle(e.target.value)}
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Message</label>
                        <Textarea
                          placeholder="Write your message..."
                          value={notificationMessage}
                          onChange={(e) => setNotificationMessage(e.target.value)}
                          rows={3}
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Type</label>
                          <Select value={notificationType} onValueChange={setNotificationType}>
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="Info">Info</SelectItem>
                              <SelectItem value="Alert">Alert</SelectItem>
                              <SelectItem value="Reminder">Reminder</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="flex items-end">
                          <label className="flex items-center gap-2 text-sm">
                            <input
                              type="checkbox"
                              checked={isScheduled}
                              onChange={(e) => setIsScheduled(e.target.checked)}
                              className="rounded border-gray-300 text-purple-600 focus:ring-purple-500"
                            />
                            Schedule
                          </label>
                        </div>
                      </div>
                      {isScheduled && (
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Schedule Date</label>
                          <Input
                            type="date"
                            value={scheduledDate}
                            onChange={(e) => setScheduledDate(e.target.value)}
                          />
                        </div>
                      )}
                      <Button 
                        onClick={handleSendNotification}
                        disabled={!notificationTitle.trim() || !notificationMessage.trim()}
                        className="w-full bg-purple-600 hover:bg-purple-700"
                      >
                        <Send className="w-4 h-4 mr-2" />
                        {isScheduled ? 'Schedule Notification' : 'Send Now'}
                      </Button>
                    </div>
                  )}

                  {/* Recent Notifications */}
                  <div>
                    <h4 className="font-medium text-gray-900 mb-3">Recent Notifications</h4>
                    {notifications.length === 0 ? (
                      <div className="text-center py-6 text-gray-500">
                        <Bell className="w-6 h-6 mx-auto mb-2 text-gray-400" />
                        <p className="text-sm">No notifications sent yet.</p>
                      </div>
                    ) : (
                      <div className="space-y-3 max-h-64 overflow-y-auto">
                        {notifications.map((notification) => (
                          <div key={notification.id} className="p-3 border rounded-lg">
                            <div className="flex items-start gap-2">
                              {getNotificationIcon(notification.type)}
                              <div className="flex-1">
                                <h5 className="font-medium text-gray-900 text-sm">{notification.title}</h5>
                                <p className="text-xs text-gray-600 mt-1 line-clamp-2">{notification.message}</p>
                                <div className="flex items-center gap-2 mt-2">
                                  <Badge variant="outline" className="text-xs">
                                    {notification.type}
                                  </Badge>
                                  <Badge variant={notification.status === 'Sent' ? 'default' : 'secondary'} className="text-xs">
                                    {notification.status}
                                  </Badge>
                                  <span className="text-xs text-gray-500">
                                    {notification.sentDate ? new Date(notification.sentDate).toLocaleDateString() : 
                                     notification.scheduledDate ? `Scheduled: ${new Date(notification.scheduledDate).toLocaleDateString()}` : ''}
                                  </span>
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}