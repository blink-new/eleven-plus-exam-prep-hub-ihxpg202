import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from '../../components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card'
import { Badge } from '../../components/ui/badge'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../components/ui/select'
import { 
  ArrowLeft,
  Shield,
  AlertTriangle,
  CheckCircle,
  XCircle,
  Eye,
  Flag,
  Search,
  Filter,
  Clock,
  User,
  FileText,
  MessageSquare,
  Image,
  Video
} from 'lucide-react'

interface ContentItem {
  id: string
  type: 'exam' | 'question' | 'comment' | 'image' | 'video'
  title: string
  content: string
  author: string
  authorEmail: string
  reportedBy: string
  reportReason: string
  reportDate: string
  status: 'Pending' | 'Approved' | 'Rejected' | 'Under Review'
  priority: 'Low' | 'Medium' | 'High' | 'Critical'
  category: string
}

export default function ContentModerationPage() {
  const navigate = useNavigate()
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [typeFilter, setTypeFilter] = useState('all')
  const [priorityFilter, setPriorityFilter] = useState('all')
  const [selectedItem, setSelectedItem] = useState<ContentItem | null>(null)

  // Mock content moderation data
  const contentItems: ContentItem[] = [
    {
      id: 'content-1',
      type: 'exam',
      title: 'Year 6 Mathematics Practice Test',
      content: 'A comprehensive mathematics test covering algebra, geometry, and arithmetic...',
      author: 'Sarah Johnson',
      authorEmail: 'sarah.johnson@school.edu',
      reportedBy: 'Parent User',
      reportReason: 'Inappropriate difficulty level for age group',
      reportDate: '2024-01-20 09:15',
      status: 'Pending',
      priority: 'Medium',
      category: 'Mathematics'
    },
    {
      id: 'content-2',
      type: 'question',
      title: 'Algebra Word Problem #45',
      content: 'If John has 5 apples and gives away 2, how many does he have left?',
      author: 'Michael Chen',
      authorEmail: 'michael.chen@school.edu',
      reportedBy: 'System Auto-Flag',
      reportReason: 'Potential copyright infringement',
      reportDate: '2024-01-19 14:30',
      status: 'Under Review',
      priority: 'High',
      category: 'Mathematics'
    },
    {
      id: 'content-3',
      type: 'comment',
      title: 'Student feedback on English exam',
      content: 'This exam was too difficult and unfair. The questions were not covered in class.',
      author: 'Student User',
      authorEmail: 'student@example.com',
      reportedBy: 'Teacher',
      reportReason: 'Inappropriate language and tone',
      reportDate: '2024-01-18 16:45',
      status: 'Approved',
      priority: 'Low',
      category: 'English'
    },
    {
      id: 'content-4',
      type: 'image',
      title: 'Geometry diagram for question 12',
      content: 'Image showing geometric shapes and angles for problem solving',
      author: 'Emma Williams',
      authorEmail: 'emma.williams@school.edu',
      reportedBy: 'Automated System',
      reportReason: 'Image quality concerns',
      reportDate: '2024-01-17 11:20',
      status: 'Rejected',
      priority: 'Low',
      category: 'Mathematics'
    },
    {
      id: 'content-5',
      type: 'exam',
      title: 'Verbal Reasoning Challenge Set',
      content: 'Advanced verbal reasoning questions for 11+ preparation...',
      author: 'David Brown',
      authorEmail: 'david.brown@school.edu',
      reportedBy: 'Quality Assurance',
      reportReason: 'Content accuracy verification needed',
      reportDate: '2024-01-16 13:10',
      status: 'Pending',
      priority: 'Critical',
      category: 'Verbal Reasoning'
    }
  ]

  const filteredItems = contentItems.filter(item => {
    const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.author.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === 'all' || item.status.toLowerCase().replace(' ', '-') === statusFilter
    const matchesType = typeFilter === 'all' || item.type === typeFilter
    const matchesPriority = priorityFilter === 'all' || item.priority.toLowerCase() === priorityFilter
    
    return matchesSearch && matchesStatus && matchesType && matchesPriority
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Pending': return 'bg-yellow-100 text-yellow-800 border-yellow-200'
      case 'Approved': return 'bg-green-100 text-green-800 border-green-200'
      case 'Rejected': return 'bg-red-100 text-red-800 border-red-200'
      case 'Under Review': return 'bg-blue-100 text-blue-800 border-blue-200'
      default: return 'bg-gray-100 text-gray-800 border-gray-200'
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'Critical': return 'bg-red-100 text-red-800 border-red-200'
      case 'High': return 'bg-orange-100 text-orange-800 border-orange-200'
      case 'Medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200'
      case 'Low': return 'bg-green-100 text-green-800 border-green-200'
      default: return 'bg-gray-100 text-gray-800 border-gray-200'
    }
  }

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'exam': return <FileText className="w-4 h-4" />
      case 'question': return <MessageSquare className="w-4 h-4" />
      case 'comment': return <MessageSquare className="w-4 h-4" />
      case 'image': return <Image className="w-4 h-4" />
      case 'video': return <Video className="w-4 h-4" />
      default: return <FileText className="w-4 h-4" />
    }
  }

  const handleModeration = (itemId: string, action: 'approve' | 'reject') => {
    console.log(`${action} content item:`, itemId)
    // In a real app, this would update the item status
  }

  const openDetailModal = (item: ContentItem) => {
    setSelectedItem(item)
  }

  const closeDetailModal = () => {
    setSelectedItem(null)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* Header */}
      <header className="bg-white/70 backdrop-blur-sm shadow-lg border-b border-white/20 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            <div className="flex items-center gap-4">
              <button 
                onClick={() => navigate('/admin/overview')}
                className="flex items-center gap-2 text-gray-600 hover:text-purple-600 px-3 py-2 rounded-xl hover:bg-white/50 transition-all duration-200"
              >
                <ArrowLeft className="w-5 h-5" />
                <span className="font-medium">Back to Admin</span>
              </button>
            </div>
            
            <div className="flex items-center gap-4">
              <div className="p-3 bg-gradient-to-br from-purple-600 to-blue-600 rounded-2xl shadow-lg">
                <Shield className="w-8 h-8 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                  Content Moderation
                </h1>
                <p className="text-sm text-gray-600 font-medium">Review and moderate platform content</p>
              </div>
            </div>

            <div className="w-32"></div> {/* Spacer for centering */}
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card className="bg-white/70 backdrop-blur-sm border border-white/20 shadow-lg rounded-2xl">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-semibold text-gray-600 uppercase tracking-wider">Pending Review</p>
                  <p className="text-3xl font-bold text-gray-900 mt-2">
                    {contentItems.filter(item => item.status === 'Pending').length}
                  </p>
                </div>
                <div className="p-3 bg-gradient-to-br from-yellow-500 to-yellow-600 rounded-xl shadow-lg">
                  <Clock className="w-6 h-6 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/70 backdrop-blur-sm border border-white/20 shadow-lg rounded-2xl">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-semibold text-gray-600 uppercase tracking-wider">Under Review</p>
                  <p className="text-3xl font-bold text-gray-900 mt-2">
                    {contentItems.filter(item => item.status === 'Under Review').length}
                  </p>
                </div>
                <div className="p-3 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl shadow-lg">
                  <Eye className="w-6 h-6 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/70 backdrop-blur-sm border border-white/20 shadow-lg rounded-2xl">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-semibold text-gray-600 uppercase tracking-wider">High Priority</p>
                  <p className="text-3xl font-bold text-gray-900 mt-2">
                    {contentItems.filter(item => item.priority === 'High' || item.priority === 'Critical').length}
                  </p>
                </div>
                <div className="p-3 bg-gradient-to-br from-red-500 to-red-600 rounded-xl shadow-lg">
                  <AlertTriangle className="w-6 h-6 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/70 backdrop-blur-sm border border-white/20 shadow-lg rounded-2xl">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-semibold text-gray-600 uppercase tracking-wider">Total Reports</p>
                  <p className="text-3xl font-bold text-gray-900 mt-2">{contentItems.length}</p>
                </div>
                <div className="p-3 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl shadow-lg">
                  <Flag className="w-6 h-6 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Search and Filters */}
        <Card className="bg-white/70 backdrop-blur-sm border border-white/20 shadow-lg rounded-2xl">
          <CardHeader className="bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-t-2xl">
            <CardTitle className="flex items-center gap-2 text-white">
              <Search className="w-5 h-5" />
              Search & Filter Content
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="text"
                    placeholder="Search by title, content, or author..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl bg-white/80 backdrop-blur-sm shadow-sm focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all duration-200"
                  />
                </div>
              </div>
              
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-48 rounded-xl border-gray-200 bg-white/80 backdrop-blur-sm shadow-sm">
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="under-review">Under Review</SelectItem>
                  <SelectItem value="approved">Approved</SelectItem>
                  <SelectItem value="rejected">Rejected</SelectItem>
                </SelectContent>
              </Select>

              <Select value={typeFilter} onValueChange={setTypeFilter}>
                <SelectTrigger className="w-48 rounded-xl border-gray-200 bg-white/80 backdrop-blur-sm shadow-sm">
                  <SelectValue placeholder="Filter by type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="exam">Exams</SelectItem>
                  <SelectItem value="question">Questions</SelectItem>
                  <SelectItem value="comment">Comments</SelectItem>
                  <SelectItem value="image">Images</SelectItem>
                  <SelectItem value="video">Videos</SelectItem>
                </SelectContent>
              </Select>

              <Select value={priorityFilter} onValueChange={setPriorityFilter}>
                <SelectTrigger className="w-48 rounded-xl border-gray-200 bg-white/80 backdrop-blur-sm shadow-sm">
                  <SelectValue placeholder="Filter by priority" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Priorities</SelectItem>
                  <SelectItem value="critical">Critical</SelectItem>
                  <SelectItem value="high">High</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="low">Low</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Content Items Table */}
        <Card className="bg-white/70 backdrop-blur-sm border border-white/20 shadow-lg rounded-2xl">
          <CardHeader className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-t-2xl">
            <CardTitle className="flex items-center gap-2 text-white">
              <Shield className="w-5 h-5" />
              Content Moderation Queue
            </CardTitle>
            <CardDescription className="text-blue-100">
              Review reported content and take appropriate moderation actions
            </CardDescription>
          </CardHeader>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200 bg-gray-50/50">
                    <th className="text-left py-4 px-6 font-semibold text-gray-900 uppercase tracking-wider text-sm">Content</th>
                    <th className="text-left py-4 px-6 font-semibold text-gray-900 uppercase tracking-wider text-sm">Author</th>
                    <th className="text-left py-4 px-6 font-semibold text-gray-900 uppercase tracking-wider text-sm">Report Details</th>
                    <th className="text-left py-4 px-6 font-semibold text-gray-900 uppercase tracking-wider text-sm">Priority</th>
                    <th className="text-left py-4 px-6 font-semibold text-gray-900 uppercase tracking-wider text-sm">Status</th>
                    <th className="text-left py-4 px-6 font-semibold text-gray-900 uppercase tracking-wider text-sm">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredItems.map((item, index) => (
                    <tr key={item.id} className={`border-b border-gray-100 hover:bg-blue-50/30 transition-colors duration-200 ${index % 2 === 0 ? 'bg-white/50' : 'bg-gray-50/30'}`}>
                      <td className="py-4 px-6">
                        <div className="flex items-start gap-3">
                          <div className="p-2 bg-gradient-to-br from-gray-400 to-gray-500 rounded-lg shadow-lg">
                            {getTypeIcon(item.type)}
                          </div>
                          <div>
                            <h3 className="font-semibold text-gray-900">{item.title}</h3>
                            <p className="text-sm text-gray-600 mt-1 line-clamp-2">
                              {item.content.substring(0, 100)}...
                            </p>
                            <div className="flex items-center gap-2 mt-2">
                              <Badge variant="outline" className="text-xs border-2 font-medium">
                                {item.type}
                              </Badge>
                              <Badge variant="outline" className="text-xs border-2 font-medium">
                                {item.category}
                              </Badge>
                            </div>
                          </div>
                        </div>
                      </td>
                      
                      <td className="py-4 px-6">
                        <div className="flex items-center gap-2">
                          <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-purple-600 rounded-full flex items-center justify-center shadow-lg">
                            <User className="w-4 h-4 text-white" />
                          </div>
                          <div>
                            <p className="font-semibold text-gray-900">{item.author}</p>
                            <p className="text-sm text-gray-600">{item.authorEmail}</p>
                          </div>
                        </div>
                      </td>
                      
                      <td className="py-4 px-6">
                        <div>
                          <p className="text-sm font-semibold text-gray-900">Reported by: {item.reportedBy}</p>
                          <p className="text-sm text-gray-600 mt-1">{item.reportReason}</p>
                          <p className="text-xs text-gray-500 mt-1 font-medium">{item.reportDate}</p>
                        </div>
                      </td>
                      
                      <td className="py-4 px-6">
                        <Badge className={`${getPriorityColor(item.priority)} border font-medium`}>
                          {item.priority}
                        </Badge>
                      </td>
                      
                      <td className="py-4 px-6">
                        <Badge className={`${getStatusColor(item.status)} border font-medium`}>
                          {item.status}
                        </Badge>
                      </td>
                      
                      <td className="py-4 px-6">
                        <div className="flex items-center gap-1">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => openDetailModal(item)}
                            className="gap-1 h-8 px-3 rounded-lg border-gray-200 hover:bg-blue-50 transition-colors duration-200"
                          >
                            <Eye className="w-4 h-4 text-blue-600" />
                            View
                          </Button>
                          
                          {item.status === 'Pending' || item.status === 'Under Review' ? (
                            <>
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => handleModeration(item.id, 'approve')}
                                className="gap-1 h-8 px-3 rounded-lg border-gray-200 hover:bg-green-50 transition-colors duration-200"
                              >
                                <CheckCircle className="w-4 h-4 text-green-600" />
                                Approve
                              </Button>
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => handleModeration(item.id, 'reject')}
                                className="gap-1 h-8 px-3 rounded-lg border-gray-200 hover:bg-red-50 transition-colors duration-200"
                              >
                                <XCircle className="w-4 h-4 text-red-600" />
                                Reject
                              </Button>
                            </>
                          ) : (
                            <Button size="sm" variant="outline" disabled className="h-8 px-3 rounded-lg">
                              {item.status}
                            </Button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {filteredItems.length === 0 && (
              <div className="text-center py-12">
                <Shield className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">No content found</h3>
                <p className="text-gray-600">Try adjusting your search criteria or filters.</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Detail Modal */}
      {selectedItem && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                  Content Details
                </h2>
                <Button variant="outline" onClick={closeDetailModal} className="rounded-xl">
                  <XCircle className="w-4 h-4" />
                </Button>
              </div>
              
              <div className="space-y-6">
                <div>
                  <h3 className="font-semibold text-gray-900 mb-3">Content Information</h3>
                  <div className="bg-gray-50 p-4 rounded-xl border border-gray-200">
                    <p className="font-semibold text-gray-900">{selectedItem.title}</p>
                    <p className="text-sm text-gray-600 mt-2">{selectedItem.content}</p>
                    <div className="flex items-center gap-2 mt-3">
                      <Badge variant="outline" className="border-2 font-medium">{selectedItem.type}</Badge>
                      <Badge variant="outline" className="border-2 font-medium">{selectedItem.category}</Badge>
                      <Badge className={`${getPriorityColor(selectedItem.priority)} border font-medium`}>
                        {selectedItem.priority}
                      </Badge>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h3 className="font-semibold text-gray-900 mb-3">Author Information</h3>
                  <div className="bg-gray-50 p-4 rounded-xl border border-gray-200">
                    <p className="font-semibold text-gray-900">{selectedItem.author}</p>
                    <p className="text-sm text-gray-600">{selectedItem.authorEmail}</p>
                  </div>
                </div>
                
                <div>
                  <h3 className="font-semibold text-gray-900 mb-3">Report Details</h3>
                  <div className="bg-gray-50 p-4 rounded-xl border border-gray-200">
                    <p className="font-semibold text-gray-900">Reported by: {selectedItem.reportedBy}</p>
                    <p className="text-sm text-gray-600 mt-1">Reason: {selectedItem.reportReason}</p>
                    <p className="text-sm text-gray-600">Date: {selectedItem.reportDate}</p>
                    <Badge className={`${getStatusColor(selectedItem.status)} border font-medium mt-2`}>
                      {selectedItem.status}
                    </Badge>
                  </div>
                </div>
                
                {(selectedItem.status === 'Pending' || selectedItem.status === 'Under Review') && (
                  <div className="flex items-center gap-3 pt-4 border-t border-gray-200">
                    <Button
                      onClick={() => {
                        handleModeration(selectedItem.id, 'approve')
                        closeDetailModal()
                      }}
                      className="gap-2 bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200"
                    >
                      <CheckCircle className="w-4 h-4" />
                      Approve Content
                    </Button>
                    <Button
                      onClick={() => {
                        handleModeration(selectedItem.id, 'reject')
                        closeDetailModal()
                      }}
                      variant="destructive"
                      className="gap-2 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200"
                    >
                      <XCircle className="w-4 h-4" />
                      Reject Content
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}