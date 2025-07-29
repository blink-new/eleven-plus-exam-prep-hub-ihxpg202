import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import HomePage from './pages/HomePage'
import LoginPage from './pages/LoginPage'
import SignupPage from './pages/SignupPage'
import DashboardLayout from './components/DashboardLayout'
import DashboardContent from './components/DashboardContent'
import PerformanceContent from './components/PerformanceContent'
import CompletedPapersContent from './components/CompletedPapersContent'
import CreateExamContent from './components/CreateExamContent'
import OMRUploadContent from './components/OMRUploadContent'
import SubjectContent from './components/SubjectContent'
import VirtualClassesContent from './components/VirtualClassesContent'
import AdminDashboard1Content from './components/AdminDashboard1Content'
import OMRUploadPage from './pages/OMRUploadPage'
import OMRResultsPage from './pages/OMRResultsPage'
import AnswerExplanationPage from './pages/AnswerExplanationPage'
import ExamPage from './pages/ExamPage'
import PaymentPage from './pages/PaymentPage'
import PaymentSuccessPage from './pages/PaymentSuccessPage'
import SubjectPerformancePage from './pages/SubjectPerformancePage'
import ClassDetailsPage from './pages/ClassDetailsPage'
import StudentsPage from './pages/StudentsPage'
import StudentDetailPage from './pages/StudentDetailPage'
import ExamPerformancePage from './pages/ExamPerformancePage'
import AboutPage from './pages/AboutPage'
import ContactPage from './pages/ContactPage'
import CoursesPage from './pages/CoursesPage'
import ExamPapersPage from './pages/ExamPapersPage'
import AdvicePage from './pages/AdvicePage'
import FAQsPage from './pages/FAQsPage'
import SchoolEnquiriesPage from './pages/SchoolEnquiriesPage'
import ReviewsPage from './pages/ReviewsPage'
import AdminOverviewPage from './pages/admin/AdminOverviewPage'
import UserManagementPage from './pages/admin/UserManagementPage'
import CourseTopicManagementPage from './pages/admin/CourseTopicManagementPage'
import ExamManagementPage from './pages/admin/ExamManagementPage'
import ExamQuestionsPage from './pages/admin/ExamQuestionsPage'
import OMRUploadLogsPage from './pages/admin/OMRUploadLogsPage'
import AnalyticsPage from './pages/admin/AnalyticsPage'
import TeacherMonitoringPage from './pages/admin/TeacherMonitoringPage'
import ContentModerationPage from './pages/admin/ContentModerationPage'
import SubscriptionPlansPage from './pages/admin/SubscriptionPlansPage'
import CouponManagementPage from './pages/admin/CouponManagementPage'
import UserSubscriptionsPage from './pages/admin/UserSubscriptionsPage'
import ReportsUsageStatsPage from './pages/admin/ReportsUsageStatsPage'
import ManualOverridesPage from './pages/admin/ManualOverridesPage'
import AIUsageLogsPage from './pages/admin/AIUsageLogsPage'
import AdminSettingsPage from './pages/admin/AdminSettingsPage'
// New Admin pages with "1" suffix
import AdminOverview1Page from './pages/admin/AdminOverview1Page'
import UserManagement1Page from './pages/admin/UserManagement1Page'
import CourseTopicManagement1Page from './pages/admin/CourseTopicManagement1Page'
import ExamManagement1Page from './pages/admin/ExamManagement1Page'
import OMRUploadLogs1Page from './pages/admin/OMRUploadLogs1Page'
import Analytics1Page from './pages/admin/Analytics1Page'
import TeacherMonitoring1Page from './pages/admin/TeacherMonitoring1Page'
import ContentModeration1Page from './pages/admin/ContentModeration1Page'
import SubscriptionPlans1Page from './pages/admin/SubscriptionPlans1Page'
import CouponManagement1Page from './pages/admin/CouponManagement1Page'
import UserSubscriptions1Page from './pages/admin/UserSubscriptions1Page'
import ReportsUsageStats1Page from './pages/admin/ReportsUsageStats1Page'
import ManualOverrides1Page from './pages/admin/ManualOverrides1Page'
import AIUsageLogs1Page from './pages/admin/AIUsageLogs1Page'
import AdminSettings1Page from './pages/admin/AdminSettings1Page'
import MyClassesPage from './pages/student/MyClassesPage'
import MyExamsPage from './pages/student/MyExamsPage'
import ResultsPage from './pages/student/ResultsPage'
import NotificationsPage from './pages/student/NotificationsPage'
import SettingsPage from './pages/SettingsPage'

function App() {
  return (
    <Router>
      <Routes>
        {/* Public routes */}
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/courses" element={<CoursesPage />} />
        <Route path="/exam-papers" element={<ExamPapersPage />} />
        <Route path="/advice" element={<AdvicePage />} />
        <Route path="/faqs" element={<FAQsPage />} />
        <Route path="/school-enquiries" element={<SchoolEnquiriesPage />} />
        <Route path="/reviews" element={<ReviewsPage />} />
        
        {/* Standalone pages that don't need persistent layout */}
        <Route path="/exam/:examId" element={<ExamPage />} />
        <Route path="/payment" element={<PaymentPage />} />
        <Route path="/payment-success" element={<PaymentSuccessPage />} />
        <Route path="/omr-results" element={<OMRResultsPage />} />
        <Route path="/answer-explanation" element={<AnswerExplanationPage />} />
        <Route path="/performance/:subject" element={<SubjectPerformancePage />} />
        <Route path="/virtual-classes/:classId" element={<ClassDetailsPage />} />
        <Route path="/students/:studentId" element={<StudentDetailPage />} />
        <Route path="/exam-performance/:assignmentId" element={<ExamPerformancePage />} />
        
        {/* Dashboard routes with persistent layout */}
        <Route path="/app" element={<DashboardLayout />}>
          <Route path="dashboard" element={<DashboardContent />} />
          <Route path="performance" element={<PerformanceContent />} />
          <Route path="completed-papers" element={<CompletedPapersContent />} />
          <Route path="create-exam" element={<CreateExamContent />} />
          <Route path="omr-upload" element={<OMRUploadContent />} />
          <Route path="subject/:subject" element={<SubjectContent />} />
          <Route path="virtual-classes" element={<VirtualClassesContent />} />
          <Route path="students" element={<StudentsPage />} />
          <Route path="my-classes" element={<MyClassesPage />} />
          <Route path="my-exams" element={<MyExamsPage />} />
          <Route path="results" element={<ResultsPage />} />
          <Route path="notifications" element={<NotificationsPage />} />
          <Route path="settings" element={<SettingsPage />} />
          
          {/* New Admin routes with "1" suffix */}
          <Route path="dashboard1" element={<AdminDashboard1Content />} />
          <Route path="admin/overview1" element={<AdminOverview1Page />} />
          <Route path="admin/user-management1" element={<UserManagement1Page />} />
          <Route path="admin/course-topic-management1" element={<CourseTopicManagement1Page />} />
          <Route path="admin/exam-management1" element={<ExamManagement1Page />} />
          <Route path="admin/omr-upload-logs1" element={<OMRUploadLogs1Page />} />
          <Route path="admin/analytics1" element={<Analytics1Page />} />
          <Route path="admin/teacher-monitoring1" element={<TeacherMonitoring1Page />} />
          <Route path="admin/content-moderation1" element={<ContentModeration1Page />} />
          <Route path="admin/subscription-plans1" element={<SubscriptionPlans1Page />} />
          <Route path="admin/coupon-management1" element={<CouponManagement1Page />} />
          <Route path="admin/user-subscriptions1" element={<UserSubscriptions1Page />} />
          <Route path="admin/reports-usage-stats1" element={<ReportsUsageStats1Page />} />
          <Route path="admin/manual-overrides1" element={<ManualOverrides1Page />} />
          <Route path="admin/ai-usage-logs1" element={<AIUsageLogs1Page />} />
          <Route path="admin/settings1" element={<AdminSettings1Page />} />
          
          {/* Original Admin routes */}
          <Route path="admin/overview" element={<AdminOverviewPage />} />
          <Route path="admin/user-management" element={<UserManagementPage />} />
          <Route path="admin/course-topic-management" element={<CourseTopicManagementPage />} />
          <Route path="admin/exam-management" element={<ExamManagementPage />} />
          <Route path="admin/exam-questions" element={<ExamQuestionsPage />} />
          <Route path="admin/omr-upload-logs" element={<OMRUploadLogsPage />} />
          <Route path="admin/analytics" element={<AnalyticsPage />} />
          <Route path="admin/teacher-monitoring" element={<TeacherMonitoringPage />} />
          <Route path="admin/content-moderation" element={<ContentModerationPage />} />
          <Route path="admin/subscription-plans" element={<SubscriptionPlansPage />} />
          <Route path="admin/coupon-management" element={<CouponManagementPage />} />
          <Route path="admin/user-subscriptions" element={<UserSubscriptionsPage />} />
          <Route path="admin/reports-usage-stats" element={<ReportsUsageStatsPage />} />
          <Route path="admin/manual-overrides" element={<ManualOverridesPage />} />
          <Route path="admin/ai-usage-logs" element={<AIUsageLogsPage />} />
          <Route path="admin/settings" element={<AdminSettingsPage />} />
        </Route>
        
        {/* Legacy redirects */}
        <Route path="/dashboard" element={<DashboardLayout />}>
          <Route index element={<DashboardContent />} />
        </Route>
      </Routes>
    </Router>
  )
}

export default App