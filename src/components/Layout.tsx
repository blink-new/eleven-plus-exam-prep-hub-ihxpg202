import { useState, useEffect } from 'react'
import { Link, useNavigate, useLocation, Outlet } from 'react-router-dom'
import { Button } from './ui/button'
import { Badge } from './ui/badge'
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from './ui/dropdown-menu'
import { 
  Trophy,
  BookOpen,
  Calculator,
  Brain,
  Puzzle,
  User,
  Settings,
  LogOut,
  Bell,
  Search,
  Home,
  Upload,
  Plus,
  Menu,
  X,
  Video,
  Users,
  Shield,
  ChevronDown,
  ChevronUp,
  BarChart3,
  CheckCircle,
  GraduationCap,
  BookMarked,
  MessageSquare,
  Award
} from 'lucide-react'

// User roles and their available navigation items
const roleNavigationMap = {
  'Normal User': [
    { id: 'dashboard', label: 'Dashboard', icon: <Home className="w-5 h-5" />, path: '/dashboard' },
    { id: 'performance', label: 'Performance', icon: <BarChart3 className="w-5 h-5" />, path: '/performance' },
    { id: 'completed', label: 'Completed Papers', icon: <CheckCircle className="w-5 h-5" />, path: '/completed-papers' },
    { id: 'create', label: 'Create Your Exam', icon: <Plus className="w-5 h-5" />, path: '/create-exam' },
    { id: 'upload', label: 'Upload Answers', icon: <Upload className="w-5 h-5" />, path: '/omr-upload' },
    { id: 'mathematics', label: 'Mathematics', icon: <Calculator className="w-5 h-5" />, path: '/subject/mathematics' },
    { id: 'english', label: 'English', icon: <BookOpen className="w-5 h-5" />, path: '/subject/english' },
    { id: 'verbal', label: 'Verbal Reasoning', icon: <Brain className="w-5 h-5" />, path: '/subject/verbal' },
    { id: 'nonverbal', label: 'Non-Verbal Reasoning', icon: <Puzzle className="w-5 h-5" />, path: '/subject/nonverbal' },
    { id: 'ask-ai', label: 'Ask AI Expert', icon: <MessageSquare className="w-5 h-5" />, action: 'openAIChat' }
  ],
  'Teacher': [
    { id: 'dashboard', label: 'Dashboard', icon: <Home className="w-5 h-5" />, path: '/dashboard' },
    { id: 'performance', label: 'Performance', icon: <BarChart3 className="w-5 h-5" />, path: '/performance' },
    { id: 'completed', label: 'Completed Papers', icon: <CheckCircle className="w-5 h-5" />, path: '/completed-papers' },
    { id: 'virtual-classes', label: 'Virtual Classes', icon: <Video className="w-5 h-5" />, path: '/virtual-classes' },
    { id: 'students', label: 'Students', icon: <Users className="w-5 h-5" />, path: '/students' },
    { id: 'create', label: 'Create Your Exam', icon: <Plus className="w-5 h-5" />, path: '/create-exam' },
    { id: 'upload', label: 'Upload Answers', icon: <Upload className="w-5 h-5" />, path: '/omr-upload' },
    { id: 'mathematics', label: 'Mathematics', icon: <Calculator className="w-5 h-5" />, path: '/subject/mathematics' },
    { id: 'english', label: 'English', icon: <BookOpen className="w-5 h-5" />, path: '/subject/english' },
    { id: 'verbal', label: 'Verbal Reasoning', icon: <Brain className="w-5 h-5" />, path: '/subject/verbal' },
    { id: 'nonverbal', label: 'Non-Verbal Reasoning', icon: <Puzzle className="w-5 h-5" />, path: '/subject/nonverbal' }
  ],
  'Admin': [
    { id: 'dashboard', label: 'Dashboard', icon: <Home className="w-5 h-5" />, path: '/dashboard' },
    { 
      id: 'admin', 
      label: 'Admin', 
      icon: <Shield className="w-5 h-5" />, 
      hasChildren: true,
      children: [
        { id: 'admin-overview', label: 'Overview', path: '/admin/overview' },
        { id: 'admin-users', label: 'User Management', path: '/admin/user-management' },
        { id: 'admin-courses', label: 'Course & Topic Management', path: '/admin/course-topic-management' },
        { id: 'admin-exams', label: 'Exam Management', path: '/admin/exam-management' },
        { id: 'admin-omr', label: 'OMR Upload Logs', path: '/admin/omr-upload-logs' },
        { id: 'admin-analytics', label: 'Analytics', path: '/admin/analytics' },
        { id: 'admin-teachers', label: 'Teacher Monitoring', path: '/admin/teacher-monitoring' },
        { id: 'admin-content', label: 'Content Moderation', path: '/admin/content-moderation' },
        { id: 'admin-subscriptions', label: 'Subscription Plans', path: '/admin/subscription-plans' },
        { id: 'admin-coupons', label: 'Coupon Management', path: '/admin/coupon-management' },
        { id: 'admin-user-subscriptions', label: 'User Subscriptions', path: '/admin/user-subscriptions' },
        { id: 'admin-reports', label: 'Reports & Usage Stats', path: '/admin/reports-usage-stats' },
        { id: 'admin-overrides', label: 'Manual Overrides', path: '/admin/manual-overrides' },
        { id: 'admin-ai-logs', label: 'AI Usage Logs', path: '/admin/ai-usage-logs' },
        { id: 'admin-settings', label: 'Settings', path: '/admin/settings' }
      ]
    }
  ],
  'Student': [
    { id: 'dashboard', label: 'Dashboard', icon: <Home className="w-5 h-5" />, path: '/dashboard' },
    { id: 'my-classes', label: 'My Classes', icon: <GraduationCap className="w-5 h-5" />, path: '/my-classes' },
    { id: 'my-exams', label: 'My Exams', icon: <BookMarked className="w-5 h-5" />, path: '/my-exams' },
    { id: 'upload', label: 'Upload Answers', icon: <Upload className="w-5 h-5" />, path: '/omr-upload' },
    { id: 'results', label: 'Results', icon: <Award className="w-5 h-5" />, path: '/results' },
    { id: 'notifications', label: 'Notifications', icon: <Bell className="w-5 h-5" />, path: '/notifications' },
    { id: 'ask-ai', label: 'Ask AI Expert', icon: <MessageSquare className="w-5 h-5" />, action: 'openAIChat' }
  ]
}

export default function Layout() {
  const navigate = useNavigate()
  const location = useLocation()
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const [isAdminExpanded, setIsAdminExpanded] = useState(false)
  const [isAIChatOpen, setIsAIChatOpen] = useState(false)
  const [chatMessages, setChatMessages] = useState<Array<{id: string, type: 'ai' | 'user', content: string, timestamp: Date}>>([])
  const [currentMessage, setCurrentMessage] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const [performanceSummaryShown, setPerformanceSummaryShown] = useState(false)
  
  // User state - this would come from authentication context in a real app
  const [currentUser] = useState({
    name: 'Alex Johnson',
    email: 'alex.johnson@email.com',
    avatar: '/api/placeholder/40/40',
    roles: ['Normal User', 'Student', 'Teacher', 'Admin'], // User has multiple roles
    activeRole: 'Normal User' // Currently active role
  })
  
  const [activeRole, setActiveRole] = useState(currentUser.activeRole)

  // Get navigation items based on active role
  const sidebarItems = roleNavigationMap[activeRole as keyof typeof roleNavigationMap] || roleNavigationMap['Normal User']

  // Determine active section based on current path
  const getActiveSection = () => {
    const path = location.pathname
    
    // Check for admin paths
    if (path.startsWith('/admin/')) {
      setIsAdminExpanded(true)
      return path.replace('/admin/', 'admin-')
    }
    
    // Check for subject paths
    if (path.startsWith('/subject/')) {
      const subject = path.replace('/subject/', '')
      return subject
    }
    
    // Check for other specific paths
    if (path === '/dashboard') return 'dashboard'
    if (path === '/performance') return 'performance'
    if (path === '/completed-papers') return 'completed'
    if (path === '/create-exam') return 'create'
    if (path === '/omr-upload') return 'upload'
    if (path === '/virtual-classes') return 'virtual-classes'
    if (path === '/students') return 'students'
    if (path === '/my-classes') return 'my-classes'
    if (path === '/my-exams') return 'my-exams'
    if (path === '/results') return 'results'
    if (path === '/notifications') return 'notifications'
    
    return 'dashboard'
  }

  const [activeSection, setActiveSection] = useState(getActiveSection())

  // Update active section when location changes
  useEffect(() => {
    const updateActiveSection = () => {
      const path = location.pathname
      
      // Check for admin paths
      if (path.startsWith('/admin/')) {
        setIsAdminExpanded(true)
        return path.replace('/admin/', 'admin-')
      }
      
      // Check for subject paths
      if (path.startsWith('/subject/')) {
        const subject = path.replace('/subject/', '')
        return subject
      }
      
      // Check for other specific paths
      if (path === '/dashboard') return 'dashboard'
      if (path === '/performance') return 'performance'
      if (path === '/completed-papers') return 'completed'
      if (path === '/create-exam') return 'create'
      if (path === '/omr-upload') return 'upload'
      if (path === '/virtual-classes') return 'virtual-classes'
      if (path === '/students') return 'students'
      if (path === '/my-classes') return 'my-classes'
      if (path === '/my-exams') return 'my-exams'
      if (path === '/results') return 'results'
      if (path === '/notifications') return 'notifications'
      
      return 'dashboard'
    }
    
    setActiveSection(updateActiveSection())
  }, [location.pathname])

  const handleRoleSwitch = (newRole: string) => {
    setActiveRole(newRole)
    setIsAdminExpanded(false)
    setIsAIChatOpen(false)
    
    // Navigate to dashboard when switching roles
    navigate('/dashboard')
    
    // In a real app, this would update the user's active role in the backend
    console.log(`Switched to role: ${newRole}`)
  }

  const handleLogout = () => {
    // Handle logout logic
    navigate('/')
  }

  const getRoleIcon = (role: string) => {
    switch (role) {
      case 'Admin': return <Shield className="w-4 h-4" />
      case 'Teacher': return <GraduationCap className="w-4 h-4" />
      case 'Student': return <BookOpen className="w-4 h-4" />
      case 'Normal User': return <User className="w-4 h-4" />
      default: return <User className="w-4 h-4" />
    }
  }

  const getRoleBadgeColor = (role: string) => {
    switch (role) {
      case 'Admin': return 'bg-red-100 text-red-800 border-red-200'
      case 'Teacher': return 'bg-blue-100 text-blue-800 border-blue-200'
      case 'Student': return 'bg-green-100 text-green-800 border-green-200'
      case 'Normal User': return 'bg-gray-100 text-gray-800 border-gray-200'
      default: return 'bg-gray-100 text-gray-800 border-gray-200'
    }
  }

  // AI Chat Functions
  const generatePerformanceSummary = () => {
    return `**Your Performance Snapshot**

**Mathematics:**
- Linear Equations: Strong (Average 86%)
- Word Problems: Needs Practice (Average 62%)
- Geometry: Steady Progress (Average 74%)

**English:**
- Comprehension: Steady Progress (Average 78%)
- Synonyms: Fluctuating (Average 65%, improving)
- Grammar: Strong (Average 82%)

**Verbal Reasoning:**
- Analogies: Good Progress (Average 71%)
- Logical Sequences: Needs Work (Average 58%)

**Non-Verbal Reasoning:**
- Pattern Recognition: Developing (Average 65%)
- Spatial Reasoning: Needs Practice (Average 60%)

**Overall Progress:** Trending Upward (5% improvement in last 2 weeks)

Your strongest areas are Linear Equations and Grammar, while Word Problems and Logical Sequences need more attention.`
  }

  const openAIChat = async () => {
    setIsAIChatOpen(true)
    setIsTyping(true)
    
    if (!performanceSummaryShown) {
      // Show performance summary first
      const performanceSummary = generatePerformanceSummary()
      
      setTimeout(() => {
        const summaryMessage = {
          id: Date.now().toString(),
          type: 'ai' as const,
          content: performanceSummary,
          timestamp: new Date()
        }
        setChatMessages([summaryMessage])
        setIsTyping(false)
        setPerformanceSummaryShown(true)
        
        // Follow up with AI greeting
        setTimeout(() => {
          setIsTyping(true)
          setTimeout(() => {
            const greetingMessage = {
              id: (Date.now() + 1).toString(),
              type: 'ai' as const,
              content: "Hi there! 👋 Based on your recent test results, I can see you're doing great in Linear Equations and Grammar but might need a bit more practice in Word Problems and Logical Sequences. Would you like me to generate a custom practice set or explain the tricky parts?",
              timestamp: new Date()
            }
            setChatMessages(prev => [...prev, greetingMessage])
            setIsTyping(false)
          }, 2000)
        }, 1000)
      }, 1500)
    }
  }

  const sendMessage = async () => {
    if (!currentMessage.trim()) return
    
    const userMessage = {
      id: Date.now().toString(),
      type: 'user' as const,
      content: currentMessage,
      timestamp: new Date()
    }
    
    setChatMessages(prev => [...prev, userMessage])
    setCurrentMessage('')
    setIsTyping(true)
    
    // Simulate AI response
    setTimeout(() => {
      const aiResponses = [
        "I'd be happy to help you with that! Let me create a personalized practice set focusing on your weak areas. Would you prefer to start with Word Problems or Logical Sequences?",
        "Great question! Based on your performance data, I recommend focusing on the fundamentals first. Let me break down the key concepts you should master.",
        "That's a smart approach! I can see you're making good progress. Let me suggest some specific strategies that have helped other students improve in similar areas.",
        "Excellent! I can generate targeted practice questions for you. Would you like them to be timed to simulate exam conditions, or would you prefer to work through them at your own pace?"
      ]
      
      const randomResponse = aiResponses[Math.floor(Math.random() * aiResponses.length)]
      
      const aiMessage = {
        id: (Date.now() + 1).toString(),
        type: 'ai' as const,
        content: randomResponse,
        timestamp: new Date()
      }
      
      setChatMessages(prev => [...prev, aiMessage])
      setIsTyping(false)
    }, 2000)
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      sendMessage()
    }
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
                <p className="text-xs text-gray-600">
                  {activeRole === 'Student' ? 'Student Portal' : 
                   activeRole === 'Teacher' ? 'Teacher Dashboard' :
                   activeRole === 'Admin' ? 'Admin Panel' : 'Student Dashboard'}
                </p>
              </div>
            </Link>

            {/* Search */}
            <div className="hidden md:flex items-center flex-1 max-w-md mx-8">
              <div className="relative w-full">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="text"
                  placeholder="Search papers, topics..."
                  className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:border-purple-500 focus:ring-1 focus:ring-purple-500"
                />
              </div>
            </div>

            {/* User Menu */}
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="sm" onClick={() => navigate('/notifications')}>
                <Bell className="w-5 h-5" />
                <Badge className="ml-1 bg-red-100 text-red-800 text-xs px-1.5 py-0.5">3</Badge>
              </Button>
              
              {/* User Profile Dropdown */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="flex items-center gap-3 hover:bg-gray-100">
                    <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                      <User className="w-5 h-5 text-purple-600" />
                    </div>
                    <div className="hidden md:block text-left">
                      <p className="text-sm font-medium text-gray-900">{currentUser.name}</p>
                      <div className="flex items-center gap-1">
                        {getRoleIcon(activeRole)}
                        <p className="text-xs text-gray-600">{activeRole}</p>
                      </div>
                    </div>
                    <ChevronDown className="w-4 h-4 text-gray-500" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-64">
                  <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-medium leading-none">{currentUser.name}</p>
                      <p className="text-xs leading-none text-muted-foreground">{currentUser.email}</p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  
                  {/* Current Role Indicator */}
                  <div className="px-2 py-1.5">
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-gray-500">Current Role:</span>
                      <Badge className={`text-xs px-2 py-1 ${getRoleBadgeColor(activeRole)}`}>
                        <div className="flex items-center gap-1">
                          {getRoleIcon(activeRole)}
                          {activeRole}
                        </div>
                      </Badge>
                    </div>
                  </div>
                  <DropdownMenuSeparator />

                  <DropdownMenuItem onClick={() => navigate('/settings')}>
                    <Settings className="mr-2 h-4 w-4" />
                    <span>Settings</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => navigate('/notifications')}>
                    <Bell className="mr-2 h-4 w-4" />
                    <span>Notifications</span>
                    <Badge className="ml-auto bg-red-100 text-red-800 text-xs px-1.5 py-0.5">3</Badge>
                  </DropdownMenuItem>
                  
                  {/* Switch Account Submenu */}
                  <DropdownMenuLabel className="text-xs text-gray-500 mt-2">Switch Role</DropdownMenuLabel>
                  {currentUser.roles.map((role) => (
                    <DropdownMenuItem
                      key={role}
                      onClick={() => handleRoleSwitch(role)}
                      className={`${role === activeRole ? 'bg-purple-50 text-purple-700' : ''}`}
                    >
                      <div className="flex items-center gap-2 w-full">
                        {getRoleIcon(role)}
                        <span>{role}</span>
                        {role === activeRole && (
                          <div className="ml-auto w-2 h-2 bg-purple-600 rounded-full"></div>
                        )}
                      </div>
                    </DropdownMenuItem>
                  ))}
                  
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleLogout} className="text-red-600">
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Logout</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
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
                  {getRoleIcon(activeRole)}
                </div>
                <div>
                  <p className="font-semibold text-gray-900">{currentUser.name}</p>
                  <Badge className={`text-xs px-2 py-1 ${getRoleBadgeColor(activeRole)}`}>
                    {activeRole}
                  </Badge>
                </div>
              </div>
            </div>

            {/* Navigation */}
            <nav className="flex-1 p-4 space-y-2">
              {sidebarItems.map((item) => {
                if (item.hasChildren) {
                  return (
                    <div key={item.id}>
                      <button
                        onClick={() => setIsAdminExpanded(!isAdminExpanded)}
                        className="w-full flex items-center justify-between px-4 py-3 rounded-lg text-left transition-colors text-gray-700 hover:bg-gray-100"
                      >
                        <div className="flex items-center gap-3">
                          {item.icon}
                          <span>{item.label}</span>
                        </div>
                        {isAdminExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                      </button>
                      {isAdminExpanded && item.children && (
                        <div className="ml-4 mt-2 space-y-1">
                          {item.children.map((subItem) => (
                            <Link
                              key={subItem.id}
                              to={subItem.path}
                              className={`w-full flex items-center gap-3 px-4 py-2 rounded-lg text-left transition-colors text-sm ${
                                activeSection === subItem.id
                                  ? 'bg-purple-100 text-purple-700 font-medium'
                                  : 'text-gray-600 hover:bg-gray-100'
                              }`}
                              onClick={() => setIsSidebarOpen(false)}
                            >
                              <span>{subItem.label}</span>
                            </Link>
                          ))}
                        </div>
                      )}
                    </div>
                  )
                }
                
                if (item.path) {
                  return (
                    <Link
                      key={item.id}
                      to={item.path}
                      className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-colors ${
                        activeSection === item.id
                          ? 'bg-purple-100 text-purple-700 font-medium'
                          : 'text-gray-700 hover:bg-gray-100'
                      }`}
                      onClick={() => setIsSidebarOpen(false)}
                    >
                      {item.icon}
                      <span>{item.label}</span>
                    </Link>
                  )
                }

                if (item.action === 'openAIChat') {
                  return (
                    <button
                      key={item.id}
                      onClick={() => {
                        openAIChat()
                        setIsSidebarOpen(false)
                      }}
                      className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-colors ${
                        isAIChatOpen
                          ? 'bg-purple-100 text-purple-700 font-medium'
                          : 'text-gray-700 hover:bg-gray-100'
                      }`}
                    >
                      {item.icon}
                      <span>{item.label}</span>
                      {isAIChatOpen && (
                        <div className="ml-auto w-2 h-2 bg-purple-600 rounded-full animate-pulse"></div>
                      )}
                    </button>
                  )
                }

                return (
                  <button
                    key={item.id}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-colors ${
                      activeSection === item.id
                        ? 'bg-purple-100 text-purple-700 font-medium'
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    {item.icon}
                    <span>{item.label}</span>
                  </button>
                )
              })}
            </nav>

            {/* Sidebar Footer */}
            <div className="p-4 border-t border-gray-200">
              <Button 
                variant="ghost" 
                className="w-full justify-start gap-3 text-gray-700"
                onClick={() => navigate('/settings')}
              >
                <Settings className="w-5 h-5" />
                Settings
              </Button>
              <Button 
                variant="ghost" 
                className="w-full justify-start gap-3 text-gray-700 mt-2"
                onClick={handleLogout}
              >
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

        {/* Main Content Area */}
        <main className="flex-1 min-w-0">
          <div className="flex h-full">
            {/* Center Content - This is where page content will be rendered */}
            <div className="flex-1 min-w-0">
              <Outlet />
            </div>

            {/* Right Panel - AI Chat (only for Normal User and Student roles) */}
            {(activeRole === 'Normal User' || activeRole === 'Student') && (
              <aside className="hidden xl:block w-80 bg-white border-l border-gray-200 flex-shrink-0">
                {isAIChatOpen ? (
                  /* AI Chat Panel */
                  <div className="h-full flex flex-col">
                    {/* Chat Header */}
                    <div className="p-4 border-b border-gray-200 bg-gradient-to-r from-purple-50 to-blue-50">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-blue-500 rounded-full flex items-center justify-center">
                            <MessageSquare className="w-5 h-5 text-white" />
                          </div>
                          <div>
                            <h3 className="font-semibold text-gray-900">AI Expert</h3>
                            <p className="text-xs text-gray-600">Your personal study assistant</p>
                          </div>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => setIsAIChatOpen(false)}
                          className="text-gray-500 hover:text-gray-700"
                        >
                          <X className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>

                    {/* Chat Messages */}
                    <div className="flex-1 overflow-y-auto p-4 space-y-4">
                      {chatMessages.map((message) => (
                        <div
                          key={message.id}
                          className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                        >
                          <div
                            className={`max-w-[85%] rounded-lg px-4 py-3 ${
                              message.type === 'user'
                                ? 'bg-purple-600 text-white'
                                : 'bg-gray-100 text-gray-900'
                            }`}
                          >
                            <div className="text-sm whitespace-pre-wrap">
                              {message.content.split('**').map((part, index) => 
                                index % 2 === 1 ? <strong key={index}>{part}</strong> : part
                              )}
                            </div>
                            <div className={`text-xs mt-2 ${
                              message.type === 'user' ? 'text-purple-200' : 'text-gray-500'
                            }`}>
                              {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                            </div>
                          </div>
                        </div>
                      ))}
                      
                      {/* Typing Indicator */}
                      {isTyping && (
                        <div className="flex justify-start">
                          <div className="bg-gray-100 rounded-lg px-4 py-3">
                            <div className="flex items-center gap-1">
                              <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                              <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                              <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Chat Input */}
                    <div className="p-4 border-t border-gray-200">
                      <div className="flex gap-2">
                        <input
                          type="text"
                          value={currentMessage}
                          onChange={(e) => setCurrentMessage(e.target.value)}
                          onKeyPress={handleKeyPress}
                          placeholder="Ask me anything about your studies..."
                          className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:border-purple-500 focus:ring-1 focus:ring-purple-500 text-sm"
                          disabled={isTyping}
                        />
                        <Button
                          onClick={sendMessage}
                          disabled={!currentMessage.trim() || isTyping}
                          size="sm"
                          className="bg-purple-600 hover:bg-purple-700"
                        >
                          <MessageSquare className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ) : (
                  /* Default Right Panel Content */
                  <div className="p-6 space-y-6">
                    <div className="text-center">
                      <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <MessageSquare className="w-8 h-8 text-purple-600" />
                      </div>
                      <h3 className="font-semibold text-gray-900 mb-2">AI Expert Available</h3>
                      <p className="text-sm text-gray-600 mb-4">
                        Get personalized study assistance and performance insights
                      </p>
                      <Button 
                        onClick={openAIChat}
                        className="bg-purple-600 hover:bg-purple-700"
                      >
                        Start Chat
                      </Button>
                    </div>
                  </div>
                )}
              </aside>
            )}
          </div>
        </main>
      </div>
    </div>
  )
}