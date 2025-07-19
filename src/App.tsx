import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import HomePage from './pages/HomePage'
import LoginPage from './pages/LoginPage'
import SignupPage from './pages/SignupPage'
import DashboardPage from './pages/DashboardPage'
import OMRUploadPage from './pages/OMRUploadPage'
import OMRResultsPage from './pages/OMRResultsPage'
import AnswerExplanationPage from './pages/AnswerExplanationPage'
import CompletedPapersPage from './pages/CompletedPapersPage'
import SubjectPage from './pages/SubjectPage'
import ExamPage from './pages/ExamPage'
import CreateExamPage from './pages/CreateExamPage'
import PaymentPage from './pages/PaymentPage'
import PaymentSuccessPage from './pages/PaymentSuccessPage'
import PerformancePage from './pages/PerformancePage'
import SubjectPerformancePage from './pages/SubjectPerformancePage'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/completed-papers" element={<CompletedPapersPage />} />
        <Route path="/omr-upload" element={<OMRUploadPage />} />
        <Route path="/omr-results" element={<OMRResultsPage />} />
        <Route path="/answer-explanation" element={<AnswerExplanationPage />} />
        <Route path="/subject/:subject" element={<SubjectPage />} />
        <Route path="/exam/:examId" element={<ExamPage />} />
        <Route path="/create-exam" element={<CreateExamPage />} />
        <Route path="/payment" element={<PaymentPage />} />
        <Route path="/payment-success" element={<PaymentSuccessPage />} />
        <Route path="/performance" element={<PerformancePage />} />
        <Route path="/performance/:subject" element={<SubjectPerformancePage />} />
      </Routes>
    </Router>
  )
}

export default App