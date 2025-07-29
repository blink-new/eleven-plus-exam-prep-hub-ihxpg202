import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card'
import { Button } from '../../components/ui/button'
import { Badge } from '../../components/ui/badge'
import { Input } from '../../components/ui/input'
import { 
  Search, 
  Plus, 
  Edit, 
  Trash2, 
  BookOpen,
  Target,
  Calendar,
  Users,
  Clock,
  ChevronLeft,
  ChevronRight,
  Eye,
  Settings
} from 'lucide-react'

interface Course {
  id: string
  name: string
  description: string
  subject: string
  difficulty: 'beginner' | 'intermediate' | 'advanced'
  totalTopics: number
  enrolledStudents: number
  createdDate: string
  status: 'active' | 'draft' | 'archived'
}

interface Topic {
  id: string
  name: string
  description: string
  courseId: string
  courseName: string
  difficulty: 'easy' | 'medium' | 'hard'
  estimatedTime: string
  totalQuestions: number
  createdDate: string
  status: 'active' | 'draft'
}

const mockCourses: Course[] = [
  {
    id: '1',
    name: 'Mathematics Fundamentals',
    description: 'Core mathematical concepts for 11+ preparation',
    subject: 'Mathematics',
    difficulty: 'beginner',
    totalTopics: 12,
    enrolledStudents: 245,
    createdDate: '2024-01-15',
    status: 'active'
  },
  {
    id: '2',
    name: 'Advanced English Comprehension',
    description: 'Advanced reading and comprehension skills',
    subject: 'English',
    difficulty: 'advanced',
    totalTopics: 8,
    enrolledStudents: 156,
    createdDate: '2024-01-10',
    status: 'active'
  },
  {
    id: '3',
    name: 'Verbal Reasoning Mastery',
    description: 'Complete verbal reasoning preparation',
    subject: 'Verbal Reasoning',
    difficulty: 'intermediate',
    totalTopics: 15,
    enrolledStudents: 189,
    createdDate: '2024-01-20',
    status: 'active'
  },
  {
    id: '4',
    name: 'Non-Verbal Patterns',
    description: 'Pattern recognition and spatial reasoning',
    subject: 'Non-Verbal Reasoning',
    difficulty: 'beginner',
    totalTopics: 10,
    enrolledStudents: 98,
    createdDate: '2024-01-25',
    status: 'draft'
  }
]

const mockTopics: Topic[] = [
  {
    id: '1',
    name: 'Basic Arithmetic',
    description: 'Addition, subtraction, multiplication, and division',
    courseId: '1',
    courseName: 'Mathematics Fundamentals',
    difficulty: 'easy',
    estimatedTime: '45 minutes',
    totalQuestions: 25,
    createdDate: '2024-01-16',
    status: 'active'
  },
  {
    id: '2',
    name: 'Fractions and Decimals',
    description: 'Working with fractions and decimal numbers',
    courseId: '1',
    courseName: 'Mathematics Fundamentals',
    difficulty: 'medium',
    estimatedTime: '60 minutes',
    totalQuestions: 30,
    createdDate: '2024-01-17',
    status: 'active'
  },
  {
    id: '3',
    name: 'Reading Comprehension',
    description: 'Understanding and analyzing written texts',
    courseId: '2',
    courseName: 'Advanced English Comprehension',
    difficulty: 'hard',
    estimatedTime: '90 minutes',
    totalQuestions: 20,
    createdDate: '2024-01-11',
    status: 'active'
  },
  {
    id: '4',
    name: 'Vocabulary Building',
    description: 'Expanding vocabulary and word usage',
    courseId: '2',
    courseName: 'Advanced English Comprehension',
    difficulty: 'medium',
    estimatedTime: '30 minutes',
    totalQuestions: 40,
    createdDate: '2024-01-12',
    status: 'active'
  },
  {
    id: '5',
    name: 'Analogies',
    description: 'Understanding relationships between words',
    courseId: '3',
    courseName: 'Verbal Reasoning Mastery',
    difficulty: 'medium',
    estimatedTime: '45 minutes',
    totalQuestions: 35,
    createdDate: '2024-01-21',
    status: 'draft'
  }
]

export default function CourseTopicManagementPage() {
  const [activeTab, setActiveTab] = useState<'courses' | 'topics'>('courses')
  const [courses, setCourses] = useState<Course[]>(mockCourses)
  const [topics, setTopics] = useState<Topic[]>(mockTopics)
  const [searchTerm, setSearchTerm] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const [showAddModal, setShowAddModal] = useState(false)
  
  const itemsPerPage = 8

  // Filter courses
  const filteredCourses = courses.filter(course =>
    course.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    course.subject.toLowerCase().includes(searchTerm.toLowerCase())
  )

  // Filter topics
  const filteredTopics = topics.filter(topic =>
    topic.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    topic.courseName.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const currentItems = activeTab === 'courses' ? filteredCourses : filteredTopics
  const totalPages = Math.ceil(currentItems.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const paginatedItems = currentItems.slice(startIndex, startIndex + itemsPerPage)

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner':
      case 'easy':
        return 'bg-green-100 text-green-800'
      case 'intermediate':
      case 'medium':
        return 'bg-yellow-100 text-yellow-800'
      case 'advanced':
      case 'hard':
        return 'bg-red-100 text-red-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800'
      case 'draft':
        return 'bg-yellow-100 text-yellow-800'
      case 'archived':
        return 'bg-gray-100 text-gray-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const handleDelete = (id: string, type: 'course' | 'topic') => {
    if (confirm(`Are you sure you want to delete this ${type}?`)) {
      if (type === 'course') {
        setCourses(prev => prev.filter(course => course.id !== id))
      } else {
        setTopics(prev => prev.filter(topic => topic.id !== id))
      }
    }
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Course & Topic Management</h1>
          <p className="text-gray-600 mt-1">Manage educational content and curriculum structure</p>
        </div>
        <div className="flex items-center gap-3">
          <select className="px-3 py-2 border border-gray-300 rounded-lg focus:border-purple-500 focus:ring-1 focus:ring-purple-500">
            <option value="11Plus">11Plus</option>
            <option value="GCSE">GCSE</option>
            <option value="ALevel">A-Level</option>
          </select>
          <Button 
            onClick={() => setShowAddModal(true)}
            className="gap-2 bg-purple-600 hover:bg-purple-700"
          >
            <Plus className="w-4 h-4" />
            Add {activeTab === 'courses' ? 'Course' : 'Topic'}
          </Button>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-8">
          <button
            onClick={() => {
              setActiveTab('courses')
              setCurrentPage(1)
              setSearchTerm('')
            }}
            className={`py-2 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'courses'
                ? 'border-purple-500 text-purple-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            <div className="flex items-center gap-2">
              <BookOpen className="w-4 h-4" />
              Courses ({courses.length})
            </div>
          </button>
          <button
            onClick={() => {
              setActiveTab('topics')
              setCurrentPage(1)
              setSearchTerm('')
            }}
            className={`py-2 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'topics'
                ? 'border-purple-500 text-purple-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            <div className="flex items-center gap-2">
              <Target className="w-4 h-4" />
              Topics ({topics.length})
            </div>
          </button>
        </nav>
      </div>

      {/* Search */}
      <Card>
        <CardContent className="p-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              placeholder={`Search ${activeTab}...`}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </CardContent>
      </Card>

      {/* Courses Tab */}
      {activeTab === 'courses' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {paginatedItems.map((course) => (
            <Card key={course.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <CardTitle className="text-lg">{course.name}</CardTitle>
                    <CardDescription className="mt-1">{course.description}</CardDescription>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge className={getStatusColor(course.status)}>
                      {course.status}
                    </Badge>
                    <Badge className={getDifficultyColor(course.difficulty)}>
                      {course.difficulty}
                    </Badge>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between text-sm text-gray-600">
                  <span className="flex items-center gap-1">
                    <BookOpen className="w-4 h-4" />
                    {course.subject}
                  </span>
                  <span className="flex items-center gap-1">
                    <Target className="w-4 h-4" />
                    {course.totalTopics} topics
                  </span>
                </div>
                
                <div className="flex items-center justify-between text-sm text-gray-600">
                  <span className="flex items-center gap-1">
                    <Users className="w-4 h-4" />
                    {course.enrolledStudents} students
                  </span>
                  <span className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    {new Date(course.createdDate).toLocaleDateString()}
                  </span>
                </div>

                <div className="flex items-center gap-2 pt-4 border-t">
                  <Button size="sm" variant="outline" className="flex-1">
                    <Eye className="w-4 h-4 mr-2" />
                    View
                  </Button>
                  <Button size="sm" variant="outline" className="flex-1">
                    <Edit className="w-4 h-4 mr-2" />
                    Edit
                  </Button>
                  <Button 
                    size="sm" 
                    variant="outline" 
                    onClick={() => handleDelete(course.id, 'course')}
                    className="text-red-600 hover:text-red-700"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Topics Tab */}
      {activeTab === 'topics' && (
        <Card>
          <CardHeader>
            <CardTitle>Topics ({filteredTopics.length})</CardTitle>
            <CardDescription>
              Showing {startIndex + 1}-{Math.min(startIndex + itemsPerPage, filteredTopics.length)} of {filteredTopics.length} topics
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-3 px-4 font-semibold text-gray-900">Topic</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-900">Course</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-900">Difficulty</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-900">Duration</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-900">Questions</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-900">Status</th>
                    <th className="text-right py-3 px-4 font-semibold text-gray-900">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {paginatedItems.map((topic) => (
                    <tr key={topic.id} className="border-b border-gray-100 hover:bg-gray-50">
                      <td className="py-4 px-4">
                        <div>
                          <p className="font-medium text-gray-900">{topic.name}</p>
                          <p className="text-sm text-gray-600 mt-1">{topic.description}</p>
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <Badge variant="outline">{topic.courseName}</Badge>
                      </td>
                      <td className="py-4 px-4">
                        <Badge className={getDifficultyColor(topic.difficulty)}>
                          {topic.difficulty}
                        </Badge>
                      </td>
                      <td className="py-4 px-4">
                        <div className="flex items-center gap-1 text-sm text-gray-600">
                          <Clock className="w-4 h-4" />
                          {topic.estimatedTime}
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <span className="text-sm text-gray-900">{topic.totalQuestions}</span>
                      </td>
                      <td className="py-4 px-4">
                        <Badge className={getStatusColor(topic.status)}>
                          {topic.status}
                        </Badge>
                      </td>
                      <td className="py-4 px-4">
                        <div className="flex items-center justify-end gap-2">
                          <Button size="sm" variant="ghost" title="View Topic">
                            <Eye className="w-4 h-4" />
                          </Button>
                          <Button size="sm" variant="ghost" title="Edit Topic">
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button 
                            size="sm" 
                            variant="ghost" 
                            title="Delete Topic"
                            onClick={() => handleDelete(topic.id, 'topic')}
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
                Showing {startIndex + 1} to {Math.min(startIndex + itemsPerPage, currentItems.length)} of {currentItems.length} results
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
      )}

      {/* Add Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <Card className="w-full max-w-lg mx-4">
            <CardHeader>
              <CardTitle>Add New {activeTab === 'courses' ? 'Course' : 'Topic'}</CardTitle>
              <CardDescription>
                Create a new {activeTab === 'courses' ? 'course' : 'topic'} for the curriculum
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                <Input placeholder={`Enter ${activeTab === 'courses' ? 'course' : 'topic'} name`} />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <textarea 
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:border-purple-500 focus:ring-1 focus:ring-purple-500"
                  rows={3}
                  placeholder="Enter description"
                />
              </div>
              {activeTab === 'courses' && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Subject</label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:border-purple-500 focus:ring-1 focus:ring-purple-500">
                    <option value="">Select subject</option>
                    <option value="Mathematics">Mathematics</option>
                    <option value="English">English</option>
                    <option value="Verbal Reasoning">Verbal Reasoning</option>
                    <option value="Non-Verbal Reasoning">Non-Verbal Reasoning</option>
                  </select>
                </div>
              )}
              {activeTab === 'topics' && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Course</label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:border-purple-500 focus:ring-1 focus:ring-purple-500">
                    <option value="">Select course</option>
                    {courses.map(course => (
                      <option key={course.id} value={course.id}>{course.name}</option>
                    ))}
                  </select>
                </div>
              )}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Difficulty</label>
                <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:border-purple-500 focus:ring-1 focus:ring-purple-500">
                  {activeTab === 'courses' ? (
                    <>
                      <option value="beginner">Beginner</option>
                      <option value="intermediate">Intermediate</option>
                      <option value="advanced">Advanced</option>
                    </>
                  ) : (
                    <>
                      <option value="easy">Easy</option>
                      <option value="medium">Medium</option>
                      <option value="hard">Hard</option>
                    </>
                  )}
                </select>
              </div>
              <div className="flex gap-3 pt-4">
                <Button 
                  onClick={() => setShowAddModal(false)}
                  variant="outline" 
                  className="flex-1"
                >
                  Cancel
                </Button>
                <Button className="flex-1 bg-purple-600 hover:bg-purple-700">
                  Create {activeTab === 'courses' ? 'Course' : 'Topic'}
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}