import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Button } from '../../components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card'
import { Badge } from '../../components/ui/badge'
import { 
  Search,
  Filter,
  Bell,
  BellRing,
  Calendar,
  BookOpen,
  Award,
  AlertTriangle,
  Info,
  CheckCircle,
  X,
  Trash2,
  ChevronLeft,
  Clock,
  User,
  FileText,
  Video,
  MessageSquare
} from 'lucide-react'

interface Notification {
  id: string
  title: string
  message: string
  type: 'exam_update' | 'class_alert' | 'grade_released' | 'announcement' | 'system_alert' | 'assignment'
  priority: 'low' | 'medium' | 'high' | 'urgent'
  isRead: boolean
  timestamp: string
  actionUrl?: string
  actionText?: string
  sender?: string
  relatedSubject?: string
}

const mockNotifications: Notification[] = [
  {
    id: '1',
    title: 'New Exam Assigned: Mathematics Practice Test 2',
    message: 'A new mathematics practice test has been assigned to you. The test covers algebra and geometry topics and is due on January 25th.',
    type: 'exam_update',
    priority: 'high',
    isRead: false,
    timestamp: '2024-01-20T10:30:00Z',
    actionUrl: '/my-exams',
    actionText: 'View Exam',
    sender: 'Mrs. Sarah Johnson',
    relatedSubject: 'Mathematics'
  },
  {
    id: '2',
    title: 'Class Schedule Change',
    message: 'Your English Literature class scheduled for tomorrow has been moved from 3:30 PM to 4:00 PM due to a scheduling conflict.',
    type: 'class_alert',
    priority: 'medium',
    isRead: false,
    timestamp: '2024-01-20T09:15:00Z',
    actionUrl: '/my-classes',
    actionText: 'View Classes',
    sender: 'Mr. David Wilson',
    relatedSubject: 'English'
  },
  {
    id: '3',
    title: 'Exam Results Available',
    message: 'Your results for the Verbal Reasoning Assessment are now available. You scored 92% - Excellent work!',
    type: 'grade_released',
    priority: 'medium',
    isRead: true,
    timestamp: '2024-01-19T16:45:00Z',
    actionUrl: '/results',
    actionText: 'View Results',
    sender: 'Ms. Emily Chen',
    relatedSubject: 'Verbal Reasoning'
  },
  {
    id: '4',
    title: 'Weekly Progress Report',
    message: 'Your weekly progress report is ready. This week you completed 3 exams with an average score of 85%. Keep up the great work!',
    type: 'announcement',
    priority: 'low',
    isRead: true,
    timestamp: '2024-01-19T08:00:00Z',
    actionUrl: '/performance',
    actionText: 'View Report',
    sender: 'System'
  },
  {
    id: '5',
    title: 'System Maintenance Scheduled',
    message: 'The platform will undergo scheduled maintenance on January 22nd from 2:00 AM to 4:00 AM. Some features may be temporarily unavailable.',
    type: 'system_alert',
    priority: 'medium',
    isRead: false,
    timestamp: '2024-01-18T14:20:00Z',
    sender: 'System Administrator'
  },
  {
    id: '6',
    title: 'New Study Materials Uploaded',
    message: 'New practice worksheets and video tutorials have been uploaded to your Mathematics class. Check them out to enhance your learning.',
    type: 'announcement',
    priority: 'low',
    isRead: true,
    timestamp: '2024-01-18T11:30:00Z',
    actionUrl: '/my-classes',
    actionText: 'View Materials',
    sender: 'Mrs. Sarah Johnson',
    relatedSubject: 'Mathematics'
  },
  {
    id: '7',
    title: 'Assignment Due Reminder',
    message: 'Reminder: Your English creative writing assignment is due in 2 days. Make sure to submit it before the deadline.',
    type: 'assignment',
    priority: 'high',
    isRead: false,
    timestamp: '2024-01-17T15:00:00Z',
    actionUrl: '/my-exams',
    actionText: 'View Assignment',
    sender: 'Mr. David Wilson',
    relatedSubject: 'English'
  },
  {
    id: '8',
    title: 'Achievement Unlocked!',
    message: 'Congratulations! You have unlocked the "Math Master" achievement for scoring above 90% in 3 consecutive mathematics tests.',
    type: 'announcement',
    priority: 'medium',
    isRead: true,
    timestamp: '2024-01-16T12:00:00Z',
    actionUrl: '/performance',
    actionText: 'View Achievements',
    sender: 'System'
  }
]

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState(mockNotifications)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedType, setSelectedType] = useState('all')
  const [selectedPriority, setSelectedPriority] = useState('all')
  const [showUnreadOnly, setShowUnreadOnly] = useState(false)

  const filteredNotifications = notifications.filter(notification => {
    const matchesSearch = notification.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         notification.message.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         (notification.sender && notification.sender.toLowerCase().includes(searchTerm.toLowerCase()))
    const matchesType = selectedType === 'all' || notification.type === selectedType
    const matchesPriority = selectedPriority === 'all' || notification.priority === selectedPriority
    const matchesReadStatus = !showUnreadOnly || !notification.isRead
    return matchesSearch && matchesType && matchesPriority && matchesReadStatus
  })

  const unreadCount = notifications.filter(n => !n.isRead).length

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'exam_update': return <FileText className="w-5 h-5" />
      case 'class_alert': return <Video className="w-5 h-5" />
      case 'grade_released': return <Award className="w-5 h-5" />
      case 'announcement': return <MessageSquare className="w-5 h-5" />
      case 'system_alert': return <AlertTriangle className="w-5 h-5" />
      case 'assignment': return <BookOpen className="w-5 h-5" />
      default: return <Bell className="w-5 h-5" />
    }
  }

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'exam_update': return 'bg-blue-100 text-blue-800 border-blue-200'
      case 'class_alert': return 'bg-purple-100 text-purple-800 border-purple-200'
      case 'grade_released': return 'bg-green-100 text-green-800 border-green-200'
      case 'announcement': return 'bg-indigo-100 text-indigo-800 border-indigo-200'
      case 'system_alert': return 'bg-orange-100 text-orange-800 border-orange-200'
      case 'assignment': return 'bg-pink-100 text-pink-800 border-pink-200'
      default: return 'bg-gray-100 text-gray-800 border-gray-200'
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'urgent': return 'bg-red-100 text-red-800 border-red-200'
      case 'high': return 'bg-orange-100 text-orange-800 border-orange-200'
      case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200'
      case 'low': return 'bg-green-100 text-green-800 border-green-200'
      default: return 'bg-gray-100 text-gray-800 border-gray-200'
    }
  }

  const getSubjectColor = (subject: string) => {
    switch (subject?.toLowerCase()) {
      case 'mathematics': return 'bg-blue-100 text-blue-800 border-blue-200'
      case 'english': return 'bg-green-100 text-green-800 border-green-200'
      case 'verbal reasoning': return 'bg-purple-100 text-purple-800 border-purple-200'
      case 'non-verbal reasoning': return 'bg-orange-100 text-orange-800 border-orange-200'
      default: return 'bg-gray-100 text-gray-800 border-gray-200'
    }
  }

  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp)
    const now = new Date()
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60))
    
    if (diffInHours < 1) return 'Just now'
    if (diffInHours < 24) return `${diffInHours}h ago`
    if (diffInHours < 48) return 'Yesterday'
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
  }

  const markAsRead = (id: string) => {
    setNotifications(prev => 
      prev.map(notification => 
        notification.id === id 
          ? { ...notification, isRead: true }
          : notification
      )
    )
  }

  const markAllAsRead = () => {
    setNotifications(prev => 
      prev.map(notification => ({ ...notification, isRead: true }))
    )
  }

  const deleteNotification = (id: string) => {
    setNotifications(prev => prev.filter(notification => notification.id !== id))
  }

  const getTypeLabel = (type: string) => {
    switch (type) {
      case 'exam_update': return 'Exam Update'
      case 'class_alert': return 'Class Alert'
      case 'grade_released': return 'Grade Released'
      case 'announcement': return 'Announcement'
      case 'system_alert': return 'System Alert'
      case 'assignment': return 'Assignment'
      default: return 'Notification'
    }
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
                Notifications
              </h1>
              {unreadCount > 0 && (
                <Badge className="bg-red-100 text-red-800 border-red-200">
                  {unreadCount} unread
                </Badge>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Quick Actions */}
        <div className="mb-6">
          <div className="bg-white/70 backdrop-blur-sm rounded-xl shadow-sm border border-white/20 p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <BellRing className="w-5 h-5 text-purple-600" />
                  <span className="font-medium text-gray-900">
                    {notifications.length} total notifications
                  </span>
                </div>
                {unreadCount > 0 && (
                  <Badge className="bg-red-100 text-red-800 border-red-200">
                    {unreadCount} unread
                  </Badge>
                )}
              </div>
              <div className="flex items-center gap-2">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => setShowUnreadOnly(!showUnreadOnly)}
                  className={showUnreadOnly ? 'bg-purple-50 text-purple-700 border-purple-200' : ''}
                >
                  {showUnreadOnly ? 'Show All' : 'Unread Only'}
                </Button>
                {unreadCount > 0 && (
                  <Button
                    size="sm"
                    onClick={markAllAsRead}
                    className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
                  >
                    <CheckCircle className="w-4 h-4 mr-2" />
                    Mark All Read
                  </Button>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Search and Filter Section */}
        <div className="mb-8">
          <div className="bg-white/70 backdrop-blur-sm rounded-xl shadow-sm border border-white/20 p-6">
            <div className="flex flex-col md:flex-row gap-4">
              {/* Search Bar */}
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search notifications by title, message, or sender..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all"
                />
              </div>

              {/* Filters */}
              <div className="flex items-center gap-2">
                <Filter className="w-5 h-5 text-gray-500" />
                <select
                  value={selectedType}
                  onChange={(e) => setSelectedType(e.target.value)}
                  className="px-4 py-3 border border-gray-200 rounded-xl focus:border-purple-500 focus:ring-2 focus:ring-purple-200 bg-white"
                >
                  <option value="all">All Types</option>
                  <option value="exam_update">Exam Updates</option>
                  <option value="class_alert">Class Alerts</option>
                  <option value="grade_released">Grade Released</option>
                  <option value="announcement">Announcements</option>
                  <option value="system_alert">System Alerts</option>
                  <option value="assignment">Assignments</option>
                </select>

                <select
                  value={selectedPriority}
                  onChange={(e) => setSelectedPriority(e.target.value)}
                  className="px-4 py-3 border border-gray-200 rounded-xl focus:border-purple-500 focus:ring-2 focus:ring-purple-200 bg-white"
                >
                  <option value="all">All Priority</option>
                  <option value="urgent">Urgent</option>
                  <option value="high">High</option>
                  <option value="medium">Medium</option>
                  <option value="low">Low</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Notifications List */}
        <div className="space-y-4">
          {filteredNotifications.map((notification) => (
            <Card 
              key={notification.id} 
              className={`bg-white/70 backdrop-blur-sm border-white/20 hover:shadow-lg transition-all duration-200 ${
                !notification.isRead ? 'ring-2 ring-purple-200 bg-purple-50/30' : ''
              }`}
            >
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  {/* Icon */}
                  <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${getTypeColor(notification.type)}`}>
                    {getTypeIcon(notification.type)}
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex items-center gap-2 flex-wrap">
                        <h3 className={`font-semibold text-gray-900 ${!notification.isRead ? 'font-bold' : ''}`}>
                          {notification.title}
                        </h3>
                        {!notification.isRead && (
                          <div className="w-2 h-2 bg-purple-600 rounded-full"></div>
                        )}
                      </div>
                      <div className="flex items-center gap-2 ml-4">
                        <span className="text-sm text-gray-500 whitespace-nowrap">
                          {formatTimestamp(notification.timestamp)}
                        </span>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => deleteNotification(notification.id)}
                          className="text-gray-400 hover:text-red-600 p-1"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>

                    <p className="text-gray-600 mb-3 leading-relaxed">
                      {notification.message}
                    </p>

                    {/* Badges */}
                    <div className="flex items-center gap-2 mb-3 flex-wrap">
                      <Badge className={`text-xs px-2 py-1 ${getTypeColor(notification.type)}`}>
                        {getTypeLabel(notification.type)}
                      </Badge>
                      <Badge className={`text-xs px-2 py-1 ${getPriorityColor(notification.priority)}`}>
                        {notification.priority.charAt(0).toUpperCase() + notification.priority.slice(1)} Priority
                      </Badge>
                      {notification.relatedSubject && (
                        <Badge className={`text-xs px-2 py-1 ${getSubjectColor(notification.relatedSubject)}`}>
                          {notification.relatedSubject}
                        </Badge>
                      )}
                    </div>

                    {/* Sender and Actions */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 text-sm text-gray-500">
                        <User className="w-4 h-4" />
                        <span>From: {notification.sender || 'System'}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        {!notification.isRead && (
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => markAsRead(notification.id)}
                          >
                            <CheckCircle className="w-4 h-4 mr-2" />
                            Mark as Read
                          </Button>
                        )}
                        {notification.actionUrl && (
                          <Link to={notification.actionUrl}>
                            <Button
                              size="sm"
                              className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
                            >
                              {notification.actionText || 'View'}
                            </Button>
                          </Link>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Empty State */}
        {filteredNotifications.length === 0 && (
          <div className="text-center py-12">
            <div className="w-24 h-24 bg-gradient-to-r from-purple-100 to-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Bell className="w-12 h-12 text-purple-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              {showUnreadOnly ? 'No Unread Notifications' : 'No Notifications Found'}
            </h3>
            <p className="text-gray-600 mb-4">
              {searchTerm || selectedType !== 'all' || selectedPriority !== 'all'
                ? 'Try adjusting your search or filter criteria.' 
                : showUnreadOnly 
                  ? 'All caught up! You have no unread notifications.'
                  : 'You have no notifications yet.'}
            </p>
            {showUnreadOnly && (
              <Button
                onClick={() => setShowUnreadOnly(false)}
                className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
              >
                <Bell className="w-4 h-4 mr-2" />
                Show All Notifications
              </Button>
            )}
          </div>
        )}
      </div>
    </div>
  )
}