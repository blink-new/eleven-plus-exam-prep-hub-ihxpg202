import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Button } from '../components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card'
import { Badge } from '../components/ui/badge'
import { Input } from '../components/ui/input'
import { 
  Trophy,
  BookOpen,
  Calculator,
  Brain,
  Puzzle,
  Search,
  Filter,
  Plus,
  Minus,
  Users,
  Calendar,
  Clock,
  Edit,
  Trash2,
  Eye,
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
  ChevronLeft
} from 'lucide-react'

interface VirtualClass {
  id: string
  name: string
  description: string
  totalStudents: number
  createdDate: string
  subject: string
  status: 'active' | 'inactive'
}

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
  },
  {
    id: '3',
    name: 'Verbal Reasoning Mastery',
    description: 'Develop logical thinking and verbal reasoning skills through structured practice sessions.',
    totalStudents: 15,
    createdDate: '2024-01-08',
    subject: 'Verbal Reasoning',
    status: 'active'
  },
  {
    id: '4',
    name: 'Non-Verbal Reasoning Workshop',
    description: 'Pattern recognition, spatial awareness, and logical reasoning using visual elements.',
    totalStudents: 12,
    createdDate: '2024-01-05',
    subject: 'Non-Verbal Reasoning',
    status: 'inactive'
  }
]

export default function VirtualClassesPage() {
  const navigate = useNavigate()
  const [classes, setClasses] = useState<VirtualClass[]>(mockClasses)
  const [searchTerm, setSearchTerm] = useState('')
  const [filterSubject, setFilterSubject] = useState('all')
  const [newClassName, setNewClassName] = useState('')
  const [newClassDescription, setNewClassDescription] = useState('')
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const [isCreateFormExpanded, setIsCreateFormExpanded] = useState(false)

  const filteredClasses = classes.filter(cls => {
    const matchesSearch = cls.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         cls.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesFilter = filterSubject === 'all' || cls.subject === filterSubject
    return matchesSearch && matchesFilter
  })

  const handleCreateClass = () => {
    if (newClassName.trim() && newClassDescription.trim()) {
      const newClass: VirtualClass = {
        id: Date.now().toString(),
        name: newClassName,
        description: newClassDescription,
        totalStudents: 0,
        createdDate: new Date().toISOString().split('T')[0],
        subject: 'General',
        status: 'active'
      }
      setClasses([newClass, ...classes])
      setNewClassName('')
      setNewClassDescription('')
      setIsCreateFormExpanded(false)
    }
  }

  const handleToggleCreateForm = () => {
    setIsCreateFormExpanded(!isCreateFormExpanded)
    if (isCreateFormExpanded) {
      // Reset form when collapsing
      setNewClassName('')
      setNewClassDescription('')
    }
  }

  const handleDeleteClass = (classId: string) => {
    setClasses(classes.filter(cls => cls.id !== classId))
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
                <p className="text-xs text-gray-600">Virtual Classes</p>
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
        } lg:translate-x-0 fixed lg:static inset-y-0 left-0 z-40 w-64 bg-white border-r border-gray-200 transition-transform duration-300 ease-in-out`}>
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
        <main className="flex-1 lg:ml-0 p-6">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 mb-6">
            <Link to="/dashboard" className="text-gray-500 hover:text-purple-600">
              <Home className="w-4 h-4" />
            </Link>
            <ChevronLeft className="w-4 h-4 text-gray-400 rotate-180" />
            <span className="text-gray-900 font-medium">Virtual Classes</span>
          </div>

          {/* Page Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Virtual Classes</h1>
            <p className="text-gray-600">Manage your virtual classes and student enrollment</p>
          </div>

          {/* Create New Class Section - Expandable/Collapsible */}
          <Card className="mb-8 shadow-lg border-0 bg-gradient-to-r from-purple-50 to-blue-50">
            {/* Header - Always Visible */}
            <div 
              className="p-6 cursor-pointer hover:bg-white/50 transition-colors duration-200 rounded-t-lg"
              onClick={handleToggleCreateForm}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-lg transition-all duration-200 ${
                    isCreateFormExpanded 
                      ? 'bg-purple-600 text-white shadow-lg' 
                      : 'bg-white text-purple-600 shadow-md hover:shadow-lg'
                  }`}>
                    {isCreateFormExpanded ? (
                      <Minus className="w-5 h-5" />
                    ) : (
                      <Plus className="w-5 h-5" />
                    )}
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-gray-900">Create New Class</h2>
                    <p className="text-sm text-gray-600 mt-1">
                      {isCreateFormExpanded 
                        ? 'Fill out the form below to create your virtual class'
                        : 'Click to expand and set up a new virtual class with complete scheduling'
                      }
                    </p>
                  </div>
                </div>
                <div className="text-gray-400">
                  <ChevronLeft className={`w-5 h-5 transition-transform duration-200 ${
                    isCreateFormExpanded ? 'rotate-90' : '-rotate-90'
                  }`} />
                </div>
              </div>
            </div>

            {/* Expandable Form Content */}
            <div className={`overflow-hidden transition-all duration-300 ease-in-out ${
              isCreateFormExpanded ? 'max-h-[2000px] opacity-100' : 'max-h-0 opacity-0'
            }`}>
              <CardContent className="pt-0 pb-6 space-y-6">
                {/* Class Details Card */}
                <div className="p-4 bg-white rounded-lg shadow-sm border border-gray-100">
                  <h3 className="text-sm font-semibold text-gray-900 mb-3 flex items-center gap-2">
                    <BookOpen className="w-4 h-4 text-blue-600" />
                    Class Details
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Course Name <span className="text-red-500">*</span>
                      </label>
                      <Input
                        placeholder="e.g., Advanced Mathematics"
                        value={newClassName}
                        onChange={(e) => setNewClassName(e.target.value)}
                        className="focus:border-purple-500 focus:ring-purple-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Subject <span className="text-red-500">*</span>
                      </label>
                      <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:border-purple-500 focus:ring-1 focus:ring-purple-500">
                        <option value="">Select subject...</option>
                        <option value="Mathematics">Mathematics</option>
                        <option value="English">English</option>
                        <option value="Verbal Reasoning">Verbal Reasoning</option>
                        <option value="Non-Verbal Reasoning">Non-Verbal Reasoning</option>
                        <option value="Science">Science</option>
                        <option value="General Studies">General Studies</option>
                      </select>
                    </div>
                  </div>
                  <div className="mt-4">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Description <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      placeholder="Provide a detailed description of the class content, objectives, and what students will learn..."
                      value={newClassDescription}
                      onChange={(e) => setNewClassDescription(e.target.value)}
                      rows={3}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:border-purple-500 focus:ring-1 focus:ring-purple-500"
                    />
                  </div>
                </div>

                {/* Online Meeting Card */}
                <div className="p-4 bg-blue-50 rounded-lg border border-blue-100">
                  <h3 className="text-sm font-semibold text-gray-900 mb-3 flex items-center gap-2">
                    <Video className="w-4 h-4 text-blue-600" />
                    Online Meeting
                  </h3>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Live Meeting Link
                    </label>
                    <Input
                      placeholder="https://zoom.us/j/123456789 or https://meet.google.com/abc-defg-hij"
                      type="url"
                      className="focus:border-blue-500 focus:ring-blue-500"
                    />
                    <p className="text-xs text-gray-500 mt-1">
                      Provide your Zoom, Google Meet, or Microsoft Teams meeting link
                    </p>
                  </div>
                </div>

                {/* Schedule Card */}
                <div className="p-4 bg-green-50 rounded-lg border border-green-100">
                  <h3 className="text-sm font-semibold text-gray-900 mb-3 flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-green-600" />
                    Class Schedule
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        From Date
                      </label>
                      <Input type="date" className="focus:border-green-500 focus:ring-green-500" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        To Date
                      </label>
                      <Input type="date" className="focus:border-green-500 focus:ring-green-500" />
                    </div>
                  </div>
                  
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Days of the Week
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day) => (
                        <label key={day} className="flex items-center gap-2 px-3 py-2 border border-gray-300 rounded-md hover:bg-white cursor-pointer transition-colors">
                          <input type="checkbox" className="rounded border-gray-300 text-green-600 focus:ring-green-500" />
                          <span className="text-sm text-gray-700">{day}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Start Time
                      </label>
                      <Input type="time" className="focus:border-green-500 focus:ring-green-500" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        End Time
                      </label>
                      <Input type="time" className="focus:border-green-500 focus:ring-green-500" />
                    </div>
                  </div>
                </div>

                {/* Add Students Card */}
                <div className="p-4 bg-purple-50 rounded-lg border border-purple-100">
                  <h3 className="text-sm font-semibold text-gray-900 mb-3 flex items-center gap-2">
                    <Users className="w-4 h-4 text-purple-600" />
                    Add Students to Class
                  </h3>
                  
                  {/* Student Search and Filter */}
                  <div className="mb-4">
                    <div className="flex gap-3 mb-3">
                      <div className="flex-1">
                        <Input
                          placeholder="Search students by name or email..."
                          className="text-sm focus:border-purple-500 focus:ring-purple-500"
                        />
                      </div>
                      <select className="px-3 py-2 border border-gray-300 rounded-md text-sm focus:border-purple-500 focus:ring-1 focus:ring-purple-500">
                        <option value="all">All Grades</option>
                        <option value="grade-5">Grade 5</option>
                        <option value="grade-6">Grade 6</option>
                        <option value="grade-7">Grade 7</option>
                      </select>
                    </div>
                  </div>

                  {/* Available Students List */}
                  <div className="max-h-48 overflow-y-auto border border-gray-200 rounded-md bg-white">
                    {[
                      { id: 'std001', name: 'Emma Thompson', email: 'emma.thompson@email.com', grade: 'Grade 6' },
                      { id: 'std002', name: 'Oliver Johnson', email: 'oliver.johnson@email.com', grade: 'Grade 6' },
                      { id: 'std003', name: 'Sophie Williams', email: 'sophie.williams@email.com', grade: 'Grade 5' },
                      { id: 'std004', name: 'Harry Brown', email: 'harry.brown@email.com', grade: 'Grade 6' },
                      { id: 'std005', name: 'Lily Davis', email: 'lily.davis@email.com', grade: 'Grade 5' }
                    ].map((student) => (
                      <label key={student.id} className="flex items-center gap-3 p-3 hover:bg-gray-50 cursor-pointer border-b border-gray-100 last:border-b-0 transition-colors">
                        <input 
                          type="checkbox" 
                          className="rounded border-gray-300 text-purple-600 focus:ring-purple-500" 
                        />
                        <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                          <User className="w-4 h-4 text-purple-600" />
                        </div>
                        <div className="flex-1">
                          <p className="text-sm font-medium text-gray-900">{student.name}</p>
                          <p className="text-xs text-gray-500">{student.email} • {student.grade}</p>
                        </div>
                      </label>
                    ))}
                  </div>

                  {/* Selected Students Preview */}
                  <div className="mt-4 p-3 bg-white rounded-md border border-gray-200">
                    <h4 className="text-sm font-medium text-gray-700 mb-2">Selected Students (3)</h4>
                    <div className="flex flex-wrap gap-2">
                      <Badge className="bg-purple-100 text-purple-800 border-purple-200">
                        Emma Thompson
                      </Badge>
                      <Badge className="bg-purple-100 text-purple-800 border-purple-200">
                        Oliver Johnson
                      </Badge>
                      <Badge className="bg-purple-100 text-purple-800 border-purple-200">
                        Harry Brown
                      </Badge>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3 pt-4 border-t border-gray-200">
                  <Button 
                    onClick={handleCreateClass}
                    disabled={!newClassName.trim() || !newClassDescription.trim()}
                    className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 flex-1 shadow-lg"
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Create Class
                  </Button>
                  <Button 
                    variant="outline" 
                    className="px-6 border-gray-300 hover:bg-gray-50"
                    onClick={handleToggleCreateForm}
                  >
                    Cancel
                  </Button>
                </div>
              </CardContent>
            </div>
          </Card>

          {/* Search & Filter Section */}
          <Card className="mb-6">
            <CardContent className="pt-6">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <Input
                      placeholder="Search classes by name or description..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>
                <div className="flex gap-2">
                  <select
                    value={filterSubject}
                    onChange={(e) => setFilterSubject(e.target.value)}
                    className="px-3 py-2 border border-gray-300 rounded-md focus:border-purple-500 focus:ring-1 focus:ring-purple-500"
                  >
                    <option value="all">All Subjects</option>
                    <option value="Mathematics">Mathematics</option>
                    <option value="English">English</option>
                    <option value="Verbal Reasoning">Verbal Reasoning</option>
                    <option value="Non-Verbal Reasoning">Non-Verbal Reasoning</option>
                  </select>
                  <Button variant="outline" size="sm">
                    <Filter className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Classes List */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold text-gray-900">
                Existing Classes ({filteredClasses.length})
              </h2>
            </div>

            {filteredClasses.length === 0 ? (
              <Card>
                <CardContent className="text-center py-12">
                  <Video className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No classes found</h3>
                  <p className="text-gray-600 mb-4">
                    {searchTerm || filterSubject !== 'all' 
                      ? 'Try adjusting your search or filter criteria.'
                      : 'Create your first virtual class to get started.'
                    }
                  </p>
                  {!searchTerm && filterSubject === 'all' && (
                    <Button 
                      onClick={() => {
                        setNewClassName('')
                        setNewClassDescription('')
                        document.querySelector('input[placeholder="Enter class name..."]')?.focus()
                      }}
                      className="bg-purple-600 hover:bg-purple-700"
                    >
                      <Plus className="w-4 h-4 mr-2" />
                      Create Your First Class
                    </Button>
                  )}
                </CardContent>
              </Card>
            ) : (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {filteredClasses.map((cls) => (
                  <Card key={cls.id} className="hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div className="flex items-center gap-3">
                          {getSubjectIcon(cls.subject)}
                          <div>
                            <CardTitle className="text-lg">{cls.name}</CardTitle>
                            <div className="flex items-center gap-2 mt-1">
                              <Badge variant="outline" className="text-xs">
                                {cls.subject}
                              </Badge>
                              <Badge 
                                variant={cls.status === 'active' ? 'default' : 'secondary'}
                                className="text-xs"
                              >
                                {cls.status}
                              </Badge>
                            </div>
                          </div>
                        </div>
                        <div className="flex gap-1">
                          <Button variant="ghost" size="sm">
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="sm"
                            onClick={() => handleDeleteClass(cls.id)}
                            className="text-red-600 hover:text-red-700"
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <p className="text-gray-600 text-sm">{cls.description}</p>
                      
                      <div className="grid grid-cols-2 gap-4 text-center">
                        <div>
                          <div className="text-2xl font-bold text-purple-600">{cls.totalStudents}</div>
                          <p className="text-xs text-gray-600">Total Students</p>
                        </div>
                        <div>
                          <div className="text-sm font-medium text-gray-900">
                            {new Date(cls.createdDate).toLocaleDateString()}
                          </div>
                          <p className="text-xs text-gray-600">Created Date</p>
                        </div>
                      </div>

                      <div className="flex gap-2 pt-2">
                        <Button 
                          size="sm" 
                          className="flex-1 bg-purple-600 hover:bg-purple-700"
                          onClick={() => navigate(`/virtual-classes/${cls.id}`)}
                        >
                          <Eye className="w-4 h-4 mr-2" />
                          View
                        </Button>
                        <Button size="sm" variant="outline" className="flex-1">
                          <Edit className="w-4 h-4 mr-2" />
                          Edit
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  )
}