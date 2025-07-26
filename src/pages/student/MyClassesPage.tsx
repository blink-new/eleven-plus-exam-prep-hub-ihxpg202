import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Button } from '../../components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card'
import { Badge } from '../../components/ui/badge'
import { Progress } from '../../components/ui/progress'
import { 
  Search,
  Filter,
  Video,
  Calendar,
  Clock,
  Users,
  BookOpen,
  ExternalLink,
  Eye,
  LogOut,
  ChevronLeft,
  User,
  MessageSquare,
  FileText,
  Download,
  CheckCircle,
  Play,
  Timer,
  Target
} from 'lucide-react'

interface ClassData {
  id: string
  name: string
  description: string
  teacher: string
  teacherAvatar: string
  subject: string
  schedule: string
  timing: string
  joinLink: string
  progress: number
  totalStudents: number
  nextClass: string
  status: 'active' | 'completed' | 'upcoming'
  announcements: number
  materials: number
}

const mockClasses: ClassData[] = [
  {
    id: '1',
    name: 'Advanced Mathematics',
    description: 'Comprehensive mathematics preparation covering algebra, geometry, and problem-solving techniques for 11+ exams.',
    teacher: 'Mrs. Sarah Johnson',
    teacherAvatar: '/api/placeholder/40/40',
    subject: 'Mathematics',
    schedule: 'Mon, Wed, Fri',
    timing: '4:00 PM - 5:30 PM',
    joinLink: 'https://meet.google.com/abc-defg-hij',
    progress: 75,
    totalStudents: 24,
    nextClass: 'Today at 4:00 PM',
    status: 'active',
    announcements: 3,
    materials: 12
  },
  {
    id: '2',
    name: 'English Literature & Comprehension',
    description: 'Develop reading comprehension, creative writing, and analytical skills essential for 11+ English papers.',
    teacher: 'Mr. David Wilson',
    teacherAvatar: '/api/placeholder/40/40',
    subject: 'English',
    schedule: 'Tue, Thu',
    timing: '3:30 PM - 5:00 PM',
    joinLink: 'https://meet.google.com/xyz-uvwx-yz',
    progress: 60,
    totalStudents: 18,
    nextClass: 'Tomorrow at 3:30 PM',
    status: 'active',
    announcements: 1,
    materials: 8
  },
  {
    id: '3',
    name: 'Verbal Reasoning Mastery',
    description: 'Master verbal reasoning techniques including analogies, classifications, and logical sequences.',
    teacher: 'Ms. Emily Chen',
    teacherAvatar: '/api/placeholder/40/40',
    subject: 'Verbal Reasoning',
    schedule: 'Sat',
    timing: '10:00 AM - 12:00 PM',
    joinLink: 'https://meet.google.com/pqr-stuv-wxy',
    progress: 45,
    totalStudents: 15,
    nextClass: 'Saturday at 10:00 AM',
    status: 'active',
    announcements: 2,
    materials: 6
  },
  {
    id: '4',
    name: 'Non-Verbal Reasoning Workshop',
    description: 'Develop spatial awareness and pattern recognition skills for non-verbal reasoning challenges.',
    teacher: 'Dr. Michael Brown',
    teacherAvatar: '/api/placeholder/40/40',
    subject: 'Non-Verbal Reasoning',
    schedule: 'Sun',
    timing: '2:00 PM - 3:30 PM',
    joinLink: 'https://meet.google.com/lmn-opqr-stu',
    progress: 30,
    totalStudents: 20,
    nextClass: 'Sunday at 2:00 PM',
    status: 'upcoming',
    announcements: 0,
    materials: 4
  }
]

const mockStudents = [
  { id: '1', name: 'Alex Johnson', avatar: '/api/placeholder/32/32' },
  { id: '2', name: 'Emma Smith', avatar: '/api/placeholder/32/32' },
  { id: '3', name: 'Oliver Brown', avatar: '/api/placeholder/32/32' },
  { id: '4', name: 'Sophia Davis', avatar: '/api/placeholder/32/32' },
  { id: '5', name: 'Liam Wilson', avatar: '/api/placeholder/32/32' }
]

const mockAnnouncements = [
  { id: '1', title: 'Quiz scheduled for next week', date: '2 days ago', type: 'Quiz' },
  { id: '2', title: 'New practice materials uploaded', date: '1 week ago', type: 'Materials' },
  { id: '3', title: 'Class timing changed for Friday', date: '3 days ago', type: 'Schedule' }
]

const mockMaterials = [
  { id: '1', title: 'Algebra Practice Worksheets', type: 'PDF', size: '2.4 MB' },
  { id: '2', title: 'Geometry Reference Guide', type: 'PDF', size: '1.8 MB' },
  { id: '3', title: 'Problem Solving Techniques', type: 'Video', size: '45 MB' }
]

const mockClassExams = [
  {
    id: '1',
    title: 'Mathematics Mid-Term Assessment',
    scheduledDate: '2024-01-25',
    status: 'upcoming' as const,
    duration: 60,
    totalQuestions: 25,
    subject: 'Mathematics'
  },
  {
    id: '2',
    title: 'Algebra Practice Test',
    scheduledDate: '2024-01-20',
    status: 'completed' as const,
    duration: 45,
    totalQuestions: 20,
    subject: 'Mathematics',
    score: 85
  },
  {
    id: '3',
    title: 'Geometry Quiz',
    scheduledDate: '2024-01-22',
    status: 'in-progress' as const,
    duration: 30,
    totalQuestions: 15,
    subject: 'Mathematics'
  }
]

export default function MyClassesPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedSubject, setSelectedSubject] = useState('all')
  const [selectedClass, setSelectedClass] = useState<ClassData | null>(null)
  const [showClassDetails, setShowClassDetails] = useState(false)
  const [activeModalTab, setActiveModalTab] = useState('info')

  const filteredClasses = mockClasses.filter(classItem => {
    const matchesSearch = classItem.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         classItem.teacher.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         classItem.subject.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesSubject = selectedSubject === 'all' || classItem.subject.toLowerCase() === selectedSubject.toLowerCase()
    return matchesSearch && matchesSubject
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800 border-green-200'
      case 'completed': return 'bg-gray-100 text-gray-800 border-gray-200'
      case 'upcoming': return 'bg-blue-100 text-blue-800 border-blue-200'
      default: return 'bg-gray-100 text-gray-800 border-gray-200'
    }
  }

  const getSubjectColor = (subject: string) => {
    switch (subject.toLowerCase()) {
      case 'mathematics': return 'bg-blue-100 text-blue-800 border-blue-200'
      case 'english': return 'bg-green-100 text-green-800 border-green-200'
      case 'verbal reasoning': return 'bg-purple-100 text-purple-800 border-purple-200'
      case 'non-verbal reasoning': return 'bg-orange-100 text-orange-800 border-orange-200'
      default: return 'bg-gray-100 text-gray-800 border-gray-200'
    }
  }

  const getExamStatusColor = (status: string) => {
    switch (status) {
      case 'upcoming': return 'bg-blue-100 text-blue-800 border-blue-200'
      case 'completed': return 'bg-green-100 text-green-800 border-green-200'
      case 'in-progress': return 'bg-yellow-100 text-yellow-800 border-yellow-200'
      default: return 'bg-gray-100 text-gray-800 border-gray-200'
    }
  }

  const getExamStatusIcon = (status: string) => {
    switch (status) {
      case 'upcoming': return <Calendar className="w-4 h-4" />
      case 'completed': return <CheckCircle className="w-4 h-4" />
      case 'in-progress': return <Play className="w-4 h-4" />
      default: return <FileText className="w-4 h-4" />
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    })
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-sm border-b border-gray-200 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-4">
              <Link to="/dashboard" className="flex items-center gap-2 text-gray-600 hover:text-purple-600 transition-colors">
                <ChevronLeft className="w-5 h-5" />
                <span className="font-medium">Back to Dashboard</span>
              </Link>
            </div>
            <div className="flex items-center gap-4">
              <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                My Classes
              </h1>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search and Filter Section */}
        <div className="mb-8">
          <div className="bg-white/70 backdrop-blur-sm rounded-xl shadow-sm border border-white/20 p-6">
            <div className="flex flex-col md:flex-row gap-4">
              {/* Search Bar */}
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search classes by name, teacher, or subject..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all"
                />
              </div>

              {/* Subject Filter */}
              <div className="flex items-center gap-2">
                <Filter className="w-5 h-5 text-gray-500" />
                <select
                  value={selectedSubject}
                  onChange={(e) => setSelectedSubject(e.target.value)}
                  className="px-4 py-3 border border-gray-200 rounded-xl focus:border-purple-500 focus:ring-2 focus:ring-purple-200 bg-white"
                >
                  <option value="all">All Subjects</option>
                  <option value="mathematics">Mathematics</option>
                  <option value="english">English</option>
                  <option value="verbal reasoning">Verbal Reasoning</option>
                  <option value="non-verbal reasoning">Non-Verbal Reasoning</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Classes Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {filteredClasses.map((classItem) => (
            <Card key={classItem.id} className="bg-white/70 backdrop-blur-sm border-white/20 hover:shadow-lg transition-all duration-200">
              <CardHeader className="pb-4">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <CardTitle className="text-lg font-semibold text-gray-900">
                        {classItem.name}
                      </CardTitle>
                      <Badge className={`text-xs px-2 py-1 ${getStatusColor(classItem.status)}`}>
                        {classItem.status.charAt(0).toUpperCase() + classItem.status.slice(1)}
                      </Badge>
                    </div>
                    <CardDescription className="text-sm text-gray-600 line-clamp-2">
                      {classItem.description}
                    </CardDescription>
                  </div>
                </div>

                <div className="flex items-center gap-4 mt-4">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center">
                      <User className="w-4 h-4 text-white" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900">{classItem.teacher}</p>
                      <Badge className={`text-xs px-2 py-1 ${getSubjectColor(classItem.subject)}`}>
                        {classItem.subject}
                      </Badge>
                    </div>
                  </div>
                </div>
              </CardHeader>

              <CardContent className="space-y-4">
                {/* Schedule Info */}
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-gray-500" />
                    <span className="text-gray-600">{classItem.schedule}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-gray-500" />
                    <span className="text-gray-600">{classItem.timing}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Users className="w-4 h-4 text-gray-500" />
                    <span className="text-gray-600">{classItem.totalStudents} students</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Video className="w-4 h-4 text-gray-500" />
                    <span className="text-gray-600">{classItem.nextClass}</span>
                  </div>
                </div>

                {/* Progress */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-gray-700">Progress</span>
                    <span className="text-sm text-gray-600">{classItem.progress}%</span>
                  </div>
                  <Progress value={classItem.progress} className="h-2" />
                </div>

                {/* Stats */}
                <div className="flex items-center gap-4 text-sm">
                  <div className="flex items-center gap-1">
                    <MessageSquare className="w-4 h-4 text-blue-500" />
                    <span className="text-gray-600">{classItem.announcements} announcements</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <FileText className="w-4 h-4 text-green-500" />
                    <span className="text-gray-600">{classItem.materials} materials</span>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-2 pt-2">
                  <Button 
                    size="sm" 
                    className="flex-1 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
                    onClick={() => window.open(classItem.joinLink, '_blank')}
                  >
                    <Video className="w-4 h-4 mr-2" />
                    Join Class
                  </Button>
                  <Button 
                    size="sm" 
                    variant="outline" 
                    className="flex-1"
                    onClick={() => {
                      setSelectedClass(classItem)
                      setShowClassDetails(true)
                    }}
                  >
                    <Eye className="w-4 h-4 mr-2" />
                    View Details
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Empty State */}
        {filteredClasses.length === 0 && (
          <div className="text-center py-12">
            <div className="w-24 h-24 bg-gradient-to-r from-purple-100 to-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <BookOpen className="w-12 h-12 text-purple-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No Classes Found</h3>
            <p className="text-gray-600 mb-4">
              {searchTerm || selectedSubject !== 'all' 
                ? 'Try adjusting your search or filter criteria.' 
                : 'You are not enrolled in any classes yet.'}
            </p>
            <Button className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700">
              <BookOpen className="w-4 h-4 mr-2" />
              Browse Available Classes
            </Button>
          </div>
        )}
      </div>

      {/* Class Details Modal */}
      {showClassDetails && selectedClass && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-5xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">{selectedClass.name}</h2>
                  <p className="text-gray-600 mt-1">Taught by {selectedClass.teacher}</p>
                </div>
                <Button 
                  variant="ghost" 
                  size="sm"
                  onClick={() => {
                    setShowClassDetails(false)
                    setActiveModalTab('info')
                  }}
                >
                  ×
                </Button>
              </div>
            </div>

            {/* Tabs */}
            <div className="border-b border-gray-200">
              <div className="flex">
                {[
                  { id: 'info', label: 'Class Info', icon: <BookOpen className="w-4 h-4" /> },
                  { id: 'students', label: 'Students', icon: <Users className="w-4 h-4" /> },
                  { id: 'announcements', label: 'Announcements', icon: <MessageSquare className="w-4 h-4" /> },
                  { id: 'materials', label: 'Study Materials', icon: <FileText className="w-4 h-4" /> },
                  { id: 'exams', label: 'Exams', icon: <Target className="w-4 h-4" /> }
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveModalTab(tab.id)}
                    className={`flex items-center gap-2 px-6 py-4 text-sm font-medium border-b-2 transition-colors ${
                      activeModalTab === tab.id
                        ? 'border-purple-600 text-purple-600 bg-purple-50'
                        : 'border-transparent text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                    }`}
                  >
                    {tab.icon}
                    {tab.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="p-6">
              {/* Class Info Tab */}
              {activeModalTab === 'info' && (
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Class Information</h3>
                  <div className="grid grid-cols-2 gap-4 text-sm mb-4">
                    <div>
                      <span className="font-medium text-gray-700">Subject:</span>
                      <Badge className={`ml-2 text-xs px-2 py-1 ${getSubjectColor(selectedClass.subject)}`}>
                        {selectedClass.subject}
                      </Badge>
                    </div>
                    <div>
                      <span className="font-medium text-gray-700">Schedule:</span>
                      <span className="ml-2 text-gray-600">{selectedClass.schedule}</span>
                    </div>
                    <div>
                      <span className="font-medium text-gray-700">Timing:</span>
                      <span className="ml-2 text-gray-600">{selectedClass.timing}</span>
                    </div>
                    <div>
                      <span className="font-medium text-gray-700">Students:</span>
                      <span className="ml-2 text-gray-600">{selectedClass.totalStudents} enrolled</span>
                    </div>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <h4 className="font-medium text-gray-900 mb-2">Description</h4>
                    <p className="text-gray-600">{selectedClass.description}</p>
                  </div>
                </div>
              )}

              {/* Students Tab */}
              {activeModalTab === 'students' && (
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Enrolled Students ({selectedClass.totalStudents})</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {mockStudents.slice(0, 12).map((student) => (
                      <div key={student.id} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                        <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center">
                          <User className="w-4 h-4 text-white" />
                        </div>
                        <div>
                          <p className="font-medium text-gray-900">{student.name}</p>
                          <p className="text-sm text-gray-600">Active</p>
                        </div>
                      </div>
                    ))}
                    {selectedClass.totalStudents > 12 && (
                      <div className="flex items-center justify-center p-3 bg-gray-50 rounded-lg border-2 border-dashed border-gray-300">
                        <span className="text-sm text-gray-600">+{selectedClass.totalStudents - 12} more students</span>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Announcements Tab */}
              {activeModalTab === 'announcements' && (
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Announcements</h3>
                  <div className="space-y-4">
                    {mockAnnouncements.map((announcement) => (
                      <div key={announcement.id} className="border border-gray-200 rounded-lg p-4">
                        <div className="flex items-start gap-3">
                          <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                            <MessageSquare className="w-5 h-5 text-blue-600" />
                          </div>
                          <div className="flex-1">
                            <h4 className="font-medium text-gray-900 mb-1">{announcement.title}</h4>
                            <div className="flex items-center gap-2 mb-2">
                              <Badge variant="outline" className="text-xs">
                                {announcement.type}
                              </Badge>
                              <span className="text-xs text-gray-500">{announcement.date}</span>
                            </div>
                            <p className="text-sm text-gray-600">
                              This is a sample announcement content that would contain important information for students.
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Study Materials Tab */}
              {activeModalTab === 'materials' && (
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Study Materials</h3>
                  <div className="space-y-3">
                    {mockMaterials.map((material) => (
                      <div key={material.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                            <FileText className="w-5 h-5 text-gray-600" />
                          </div>
                          <div>
                            <p className="font-medium text-gray-900">{material.title}</p>
                            <p className="text-sm text-gray-600">{material.type} • {material.size}</p>
                          </div>
                        </div>
                        <Button size="sm" variant="outline">
                          <Download className="w-4 h-4 mr-2" />
                          Download
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Exams Tab */}
              {activeModalTab === 'exams' && (
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Class Exams</h3>
                  <div className="space-y-3 mb-6">
                    {mockClassExams.map((exam) => (
                      <div key={exam.id} className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center gap-3 mb-2">
                              <h4 className="font-medium text-gray-900">{exam.title}</h4>
                              <Badge className={`text-xs px-2 py-1 ${getExamStatusColor(exam.status)}`}>
                                <div className="flex items-center gap-1">
                                  {getExamStatusIcon(exam.status)}
                                  {exam.status.charAt(0).toUpperCase() + exam.status.slice(1).replace('-', ' ')}
                                </div>
                              </Badge>
                            </div>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-gray-600 mb-3">
                              <div className="flex items-center gap-2">
                                <Calendar className="w-4 h-4" />
                                <span>{formatDate(exam.scheduledDate)}</span>
                              </div>
                              <div className="flex items-center gap-2">
                                <Timer className="w-4 h-4" />
                                <span>{exam.duration} min</span>
                              </div>
                              <div className="flex items-center gap-2">
                                <Target className="w-4 h-4" />
                                <span>{exam.totalQuestions} questions</span>
                              </div>
                              {exam.score && (
                                <div className="flex items-center gap-2">
                                  <CheckCircle className="w-4 h-4 text-green-600" />
                                  <span className="text-green-600 font-medium">{exam.score}%</span>
                                </div>
                              )}
                            </div>
                          </div>
                          <div className="ml-4">
                            {exam.status === 'upcoming' && (
                              <Button size="sm" className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700">
                                <Play className="w-4 h-4 mr-2" />
                                Start
                              </Button>
                            )}
                            {exam.status === 'in-progress' && (
                              <Button size="sm" className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700">
                                <Play className="w-4 h-4 mr-2" />
                                Resume
                              </Button>
                            )}
                            {exam.status === 'completed' && (
                              <Button size="sm" variant="outline">
                                <Eye className="w-4 h-4 mr-2" />
                                View Results
                              </Button>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  {/* All My Exams Button */}
                  <div className="border-t border-gray-200 pt-4">
                    <Button 
                      className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
                      onClick={() => {
                        setShowClassDetails(false)
                        // Navigate to My Exams page
                        window.location.href = '/my-exams'
                      }}
                    >
                      <Target className="w-4 h-4 mr-2" />
                      View All My Exams
                    </Button>
                  </div>
                </div>
              )}

              {/* Actions */}
              <div className="flex gap-3 pt-6 border-t border-gray-200 mt-6">
                <Button 
                  className="flex-1 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
                  onClick={() => window.open(selectedClass.joinLink, '_blank')}
                >
                  <Video className="w-4 h-4 mr-2" />
                  Join Class Now
                </Button>
                <Button variant="outline" className="flex-1">
                  <ExternalLink className="w-4 h-4 mr-2" />
                  Open in New Tab
                </Button>
                <Button variant="outline" className="text-red-600 hover:text-red-700 hover:bg-red-50">
                  <LogOut className="w-4 h-4 mr-2" />
                  Leave Class
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}