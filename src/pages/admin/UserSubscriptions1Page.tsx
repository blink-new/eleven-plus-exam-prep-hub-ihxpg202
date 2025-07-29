import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card'
import { User } from 'lucide-react'

export default function UserSubscriptions1Page() {
  return (
    <div className="p-6 space-y-6 bg-gray-50 min-h-screen">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Admin User Subscriptions1</h1>
        <p className="text-gray-600 mt-1">Monitor individual subscription usage</p>
      </div>
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <User className="w-5 h-5" />
            User Subscriptions
          </CardTitle>
          <CardDescription>Table of all users with: Email, Role, Plan, Start/End Dates, Quotas left (questions, AI messages), Status (Active, Trial, Expired). Manually assign or upgrade plan, override quotas, suspend or ban user temporarily</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-center py-12">
            <User className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">User Subscriptions</h3>
            <p className="text-gray-600">Monitor and manage individual user subscriptions</p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}