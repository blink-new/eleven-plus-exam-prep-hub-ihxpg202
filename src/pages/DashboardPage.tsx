import { useState } from 'react'
import DashboardContent from '../components/DashboardContent'

export default function DashboardPage() {
  // User state - this would come from authentication context in a real app
  const [currentUser] = useState({
    name: 'Alex Johnson',
    email: 'alex.johnson@email.com',
    avatar: '/api/placeholder/40/40',
    roles: ['Normal User', 'Student', 'Teacher', 'Admin'], // User has multiple roles
    activeRole: 'Normal User' // Currently active role
  })
  
  const [activeRole, setActiveRole] = useState(currentUser.activeRole)

  return (
    <DashboardContent 
      activeRole={activeRole}
      currentUser={currentUser}
    />
  )
}