import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card'
import { Button } from '../../components/ui/button'
import { Badge } from '../../components/ui/badge'
import { Input } from '../../components/ui/input'
import { 
  Search, 
  Filter, 
  Edit, 
  Eye,
  Download,
  Upload,
  User,
  Calendar,
  Clock,
  FileText,
  CheckCircle,
  XCircle,
  AlertTriangle,
  ChevronLeft,
  ChevronRight,
  RefreshCw
} from 'lucide-react'

interface OMRLog {
  id: string
  studentName: string
  studentEmail: string
  examTitle: string
  examSubject: string
  uploadDate: string
  uploadTime: string
  fileName: string
  fileSize: string
  status: 'processed' | 'processing' | 'failed' | 'pending'
  totalMarks: number
  obtainedMarks: number
  percentage: number
  processingTime: string
  errorMessage?: string
}

const mockOMRLogs: OMRLog[] = [
  {
    id: '1',
    studentName: 'Alex Johnson',
    studentEmail: 'alex.johnson@email.com',
    examTitle: 'Mathematics Practice Paper 1',
    examSubject: 'Mathematics',
    uploadDate: '2024-01-25',
    uploadTime: '14:30',
    fileName: 'math_paper_1_alex.pdf',
    fileSize: '2.4 MB',
    status: 'processed',
    totalMarks: 100,
    obtainedMarks: 85,
    percentage: 85,
    processingTime: '2.3 seconds'
  },
  {
    id: '2',
    studentName: 'Sarah Williams',
    studentEmail: 'sarah.williams@email.com',
    examTitle: 'English Comprehension Test',
    examSubject: 'English',
    uploadDate: '2024-01-25',
    uploadTime: '15:45',
    fileName: 'english_test_sarah.jpg',
    fileSize: '1.8 MB',
    status: 'processing',
    totalMarks: 80,
    obtainedMarks: 0,
    percentage: 0,
    processingTime: 'In progress'
  },
  {
    id: '3',
    studentName: 'Mike Brown',
    studentEmail: 'mike.brown@email.com',
    examTitle: 'Verbal Reasoning Challenge',
    examSubject: 'Verbal Reasoning',
    uploadDate: '2024-01-25',
    uploadTime: '16:20',
    fileName: 'verbal_reasoning_mike.png',
    fileSize: '3.1 MB',
    status: 'failed',
    totalMarks: 60,
    obtainedMarks: 0,
    percentage: 0,
    processingTime: 'Failed',
    errorMessage: 'Image quality too low for accurate processing'
  },
  {
    id: '4',
    studentName: 'Emma Davis',
    studentEmail: 'emma.davis@email.com',
    examTitle: 'Non-Verbal Patterns Quiz',
    examSubject: 'Non-Verbal Reasoning',
    uploadDate: '2024-01-25',
    uploadTime: '17:10',
    fileName: 'nonverbal_emma.pdf',
    fileSize: '2.7 MB',
    status: 'processed',
    totalMarks: 50,
    obtainedMarks: 42,
    percentage: 84,
    processingTime: '1.8 seconds'
  },
  {
    id: '5',
    studentName: 'David Miller',
    studentEmail: 'david.miller@email.com',
    examTitle: 'Advanced Mathematics',
    examSubject: 'Mathematics',
    uploadDate: '2024-01-25',
    uploadTime: '18:00',
    fileName: 'advanced_math_david.jpg',
    fileSize: '2.2 MB',
    status: 'pending',
    totalMarks: 120,
    obtainedMarks: 0,
    percentage: 0,
    processingTime: 'Queued'
  }
]

export default function OMRUploadLogsPage() {
  const [logs, setLogs] = useState<OMRLog[]>(mockOMRLogs)
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [dateFilter, setDateFilter] = useState('all')
  const [currentPage, setCurrentPage] = useState(1)
  const [showOverrideModal, setShowOverrideModal] = useState(false)
  const [selectedLog, setSelectedLog] = useState<OMRLog | null>(null)
  
  const logsPerPage = 10

  // Filter logs
  const filteredLogs = logs.filter(log => {
    const matchesSearch = log.studentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         log.studentEmail.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         log.examTitle.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === 'all' || log.status === statusFilter
    const matchesDate = dateFilter === 'all' || log.uploadDate === dateFilter
    
    return matchesSearch && matchesStatus && matchesDate
  })

  // Pagination
  const totalPages = Math.ceil(filteredLogs.length / logsPerPage)
  const startIndex = (currentPage - 1) * logsPerPage
  const paginatedLogs = filteredLogs.slice(startIndex, startIndex + logsPerPage)

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'processed': return 'bg-green-100 text-green-800 border-green-200'
      case 'processing': return 'bg-blue-100 text-blue-800 border-blue-200'
      case 'failed': return 'bg-red-100 text-red-800 border-red-200'
      case 'pending': return 'bg-yellow-100 text-yellow-800 border-yellow-200'
      default: return 'bg-gray-100 text-gray-800 border-gray-200'
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'processed': return <CheckCircle className="w-4 h-4" />
      case 'processing': return <RefreshCw className="w-4 h-4 animate-spin" />
      case 'failed': return <XCircle className="w-4 h-4" />
      case 'pending': return <AlertTriangle className="w-4 h-4" />
      default: return <FileText className="w-4 h-4" />
    }
  }

  const handleOverrideMarks = (logId: string, newMarks: number) => {
    setLogs(prevLogs => 
      prevLogs.map(log => 
        log.id === logId 
          ? { 
              ...log, 
              obtainedMarks: newMarks, 
              percentage: Math.round((newMarks / log.totalMarks) * 100),
              status: 'processed' as const
            } 
          : log
      )
    )
    setShowOverrideModal(false)
    setSelectedLog(null)
  }

  const handleReprocess = (logId: string) => {
    setLogs(prevLogs => 
      prevLogs.map(log => 
        log.id === logId 
          ? { ...log, status: 'processing' as const, processingTime: 'In progress' }
          : log
      )
    )
    
    // Simulate reprocessing
    setTimeout(() => {
      setLogs(prevLogs => 
        prevLogs.map(log => 
          log.id === logId 
            ? { 
                ...log, 
                status: 'processed' as const, 
                obtainedMarks: Math.floor(Math.random() * log.totalMarks),
                processingTime: '2.1 seconds'
              }
            : log
        )
      )
    }, 3000)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      <div className="max-w-7xl mx-auto p-6 space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between bg-white/70 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20">
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              OMR Upload Logs
            </h1>
            <p className="text-gray-600 mt-2 text-lg">Monitor and manage OMR sheet processing activities</p>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="outline" className="gap-2 rounded-xl border-gray-200 bg-white/80 backdrop-blur-sm hover:bg-white hover:shadow-md transition-all duration-200">
              <Download className="w-4 h-4" />
              Export Logs
            </Button>
            <Button className="gap-2 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200">
              <RefreshCw className="w-4 h-4" />
              Refresh
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card className="bg-white/70 backdrop-blur-sm border border-white/20 shadow-lg rounded-2xl">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-semibold text-gray-600 uppercase tracking-wider">Total Uploads</p>
                  <p className="text-3xl font-bold text-gray-900 mt-2">{logs.length}</p>
                </div>
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center shadow-lg">
                  <Upload className="w-6 h-6 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-white/70 backdrop-blur-sm border border-white/20 shadow-lg rounded-2xl">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-semibold text-gray-600 uppercase tracking-wider">Processed</p>
                  <p className="text-3xl font-bold text-green-600 mt-2">
                    {logs.filter(log => log.status === 'processed').length}
                  </p>
                </div>
                <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center shadow-lg">
                  <CheckCircle className="w-6 h-6 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-white/70 backdrop-blur-sm border border-white/20 shadow-lg rounded-2xl">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-semibold text-gray-600 uppercase tracking-wider">Processing</p>
                  <p className="text-3xl font-bold text-blue-600 mt-2">
                    {logs.filter(log => log.status === 'processing').length}
                  </p>
                </div>
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center shadow-lg">
                  <RefreshCw className="w-6 h-6 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-white/70 backdrop-blur-sm border border-white/20 shadow-lg rounded-2xl">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-semibold text-gray-600 uppercase tracking-wider">Failed</p>
                  <p className="text-3xl font-bold text-red-600 mt-2">
                    {logs.filter(log => log.status === 'failed').length}
                  </p>
                </div>
                <div className="w-12 h-12 bg-gradient-to-br from-red-500 to-red-600 rounded-xl flex items-center justify-center shadow-lg">
                  <XCircle className="w-6 h-6 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Search and Filters */}
        <Card className="bg-white/70 backdrop-blur-sm border border-white/20 shadow-lg rounded-2xl">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row gap-4">
              {/* Search */}
              <div className="flex-1 relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <Input
                  placeholder="Search by student name, email, or exam..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-12 pr-4 py-3 rounded-xl border-gray-200 bg-white/80 backdrop-blur-sm shadow-sm focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all duration-200"
                />
              </div>
              
              {/* Status Filter */}
              <select 
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="px-4 py-3 border border-gray-200 rounded-xl bg-white/80 backdrop-blur-sm shadow-sm focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all duration-200"
              >
                <option value="all">All Status</option>
                <option value="processed">Processed</option>
                <option value="processing">Processing</option>
                <option value="failed">Failed</option>
                <option value="pending">Pending</option>
              </select>
              
              {/* Date Filter */}
              <input
                type="date"
                value={dateFilter === 'all' ? '' : dateFilter}
                onChange={(e) => setDateFilter(e.target.value || 'all')}
                className="px-4 py-3 border border-gray-200 rounded-xl bg-white/80 backdrop-blur-sm shadow-sm focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all duration-200"
              />
              
              <Button variant="outline" className="gap-2 rounded-xl border-gray-200 bg-white/80 backdrop-blur-sm hover:bg-white hover:shadow-md transition-all duration-200">
                <Filter className="w-4 h-4" />
                More Filters
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Logs Table */}
        <Card className="bg-white/70 backdrop-blur-sm border border-white/20 shadow-lg rounded-2xl">
          <CardHeader className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-t-2xl">
            <CardTitle className="text-white">Upload Logs ({filteredLogs.length})</CardTitle>
            <CardDescription className="text-blue-100">
              Showing {startIndex + 1}-{Math.min(startIndex + logsPerPage, filteredLogs.length)} of {filteredLogs.length} logs
            </CardDescription>
          </CardHeader>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200 bg-gray-50/50">
                    <th className="text-left py-4 px-6 font-semibold text-gray-900 uppercase tracking-wider text-sm">Student</th>
                    <th className="text-left py-4 px-6 font-semibold text-gray-900 uppercase tracking-wider text-sm">Exam</th>
                    <th className="text-left py-4 px-6 font-semibold text-gray-900 uppercase tracking-wider text-sm">Upload Details</th>
                    <th className="text-left py-4 px-6 font-semibold text-gray-900 uppercase tracking-wider text-sm">Status</th>
                    <th className="text-left py-4 px-6 font-semibold text-gray-900 uppercase tracking-wider text-sm">Results</th>
                    <th className="text-right py-4 px-6 font-semibold text-gray-900 uppercase tracking-wider text-sm">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {paginatedLogs.map((log, index) => (
                    <tr key={log.id} className={`border-b border-gray-100 hover:bg-blue-50/30 transition-colors duration-200 ${index % 2 === 0 ? 'bg-white/50' : 'bg-gray-50/30'}`}>
                      <td className="py-4 px-6">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-purple-600 rounded-full flex items-center justify-center shadow-lg">
                            <User className="w-5 h-5 text-white" />
                          </div>
                          <div>
                            <p className="font-semibold text-gray-900">{log.studentName}</p>
                            <p className="text-sm text-gray-600">{log.studentEmail}</p>
                          </div>
                        </div>
                      </td>
                      <td className="py-4 px-6">
                        <div>
                          <p className="font-semibold text-gray-900">{log.examTitle}</p>
                          <Badge variant="outline" className="mt-1 border-2 font-medium">{log.examSubject}</Badge>
                        </div>
                      </td>
                      <td className="py-4 px-6">
                        <div className="space-y-1 text-sm">
                          <div className="flex items-center gap-1 text-gray-600">
                            <Calendar className="w-4 h-4" />
                            {new Date(log.uploadDate).toLocaleDateString()} at {log.uploadTime}
                          </div>
                          <div className="flex items-center gap-1 text-gray-600">
                            <FileText className="w-4 h-4" />
                            {log.fileName} ({log.fileSize})
                          </div>
                          <div className="flex items-center gap-1 text-gray-600">
                            <Clock className="w-4 h-4" />
                            {log.processingTime}
                          </div>
                        </div>
                      </td>
                      <td className="py-4 px-6">
                        <Badge className={`${getStatusColor(log.status)} flex items-center gap-1 w-fit border font-medium`}>
                          {getStatusIcon(log.status)}
                          {log.status.charAt(0).toUpperCase() + log.status.slice(1)}
                        </Badge>
                        {log.errorMessage && (
                          <p className="text-xs text-red-600 mt-1 font-medium">{log.errorMessage}</p>
                        )}
                      </td>
                      <td className="py-4 px-6">
                        {log.status === 'processed' ? (
                          <div className="text-sm">
                            <p className="text-gray-900 font-semibold">{log.obtainedMarks}/{log.totalMarks}</p>
                            <p className="text-gray-600 font-medium">{log.percentage}%</p>
                          </div>
                        ) : (
                          <span className="text-sm text-gray-500 font-medium">-</span>
                        )}
                      </td>
                      <td className="py-4 px-6">
                        <div className="flex items-center justify-end gap-1">
                          <Button size="sm" variant="ghost" title="View Details" className="h-8 w-8 p-0 hover:bg-blue-100 rounded-lg transition-colors duration-200">
                            <Eye className="w-4 h-4 text-blue-600" />
                          </Button>
                          
                          {(log.status === 'processed' || log.status === 'failed') && (
                            <Button 
                              size="sm" 
                              variant="ghost" 
                              title="Override Marks"
                              onClick={() => {
                                setSelectedLog(log)
                                setShowOverrideModal(true)
                              }}
                              className="h-8 w-8 p-0 hover:bg-orange-100 rounded-lg transition-colors duration-200"
                            >
                              <Edit className="w-4 h-4 text-orange-600" />
                            </Button>
                          )}
                          
                          {log.status === 'failed' && (
                            <Button 
                              size="sm" 
                              variant="ghost" 
                              title="Reprocess"
                              onClick={() => handleReprocess(log.id)}
                              className="h-8 w-8 p-0 hover:bg-green-100 rounded-lg transition-colors duration-200"
                            >
                              <RefreshCw className="w-4 h-4 text-green-600" />
                            </Button>
                          )}
                          
                          <Button size="sm" variant="ghost" title="Download File" className="h-8 w-8 p-0 hover:bg-purple-100 rounded-lg transition-colors duration-200">
                            <Download className="w-4 h-4 text-purple-600" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            <div className="flex items-center justify-between mt-6 pt-6 px-6 pb-6 border-t border-gray-200">
              <p className="text-sm text-gray-600 font-medium">
                Showing {startIndex + 1} to {Math.min(startIndex + logsPerPage, filteredLogs.length)} of {filteredLogs.length} results
              </p>
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                  disabled={currentPage === 1}
                  className="rounded-lg border-gray-200 hover:bg-gray-50 transition-colors duration-200"
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
                        className={`w-10 h-10 p-0 rounded-lg transition-colors duration-200 ${
                          currentPage === pageNum 
                            ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-lg' 
                            : 'border-gray-200 hover:bg-gray-50'
                        }`}
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
                  className="rounded-lg border-gray-200 hover:bg-gray-50 transition-colors duration-200"
                >
                  Next
                  <ChevronRight className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Override Modal */}
        {showOverrideModal && selectedLog && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <Card className="w-full max-w-md mx-4 bg-white rounded-2xl shadow-2xl">
              <CardHeader className="bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-t-2xl">
                <CardTitle className="text-white">Override Marks</CardTitle>
                <CardDescription className="text-purple-100">Manually set the marks for this OMR submission</CardDescription>
              </CardHeader>
              <CardContent className="p-6 space-y-4">
                <div className="bg-gray-50 p-4 rounded-xl border border-gray-200">
                  <p className="text-sm text-gray-600">Student: <span className="font-semibold text-gray-900">{selectedLog.studentName}</span></p>
                  <p className="text-sm text-gray-600">Exam: <span className="font-semibold text-gray-900">{selectedLog.examTitle}</span></p>
                  <p className="text-sm text-gray-600">Total Marks: <span className="font-semibold text-gray-900">{selectedLog.totalMarks}</span></p>
                </div>
                
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Obtained Marks</label>
                  <Input 
                    type="number" 
                    min="0" 
                    max={selectedLog.totalMarks}
                    defaultValue={selectedLog.obtainedMarks}
                    placeholder="Enter marks obtained"
                    className="px-4 py-3 rounded-xl border-gray-200 bg-white/80 backdrop-blur-sm shadow-sm focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all duration-200"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Reason for Override</label>
                  <textarea 
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl bg-white/80 backdrop-blur-sm shadow-sm focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all duration-200"
                    rows={3}
                    placeholder="Enter reason for manual override..."
                  />
                </div>
                
                <div className="flex gap-3 pt-4">
                  <Button 
                    onClick={() => setShowOverrideModal(false)}
                    variant="outline" 
                    className="flex-1 rounded-xl border-gray-200 hover:bg-gray-50 transition-colors duration-200"
                  >
                    Cancel
                  </Button>
                  <Button 
                    onClick={() => {
                      const input = document.querySelector('input[type="number"]') as HTMLInputElement
                      const newMarks = parseInt(input.value) || 0
                      handleOverrideMarks(selectedLog.id, newMarks)
                    }}
                    className="flex-1 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200"
                  >
                    Override Marks
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  )
}