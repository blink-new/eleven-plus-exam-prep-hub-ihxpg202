import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card'
import { Award } from 'lucide-react'

export default function SubscriptionPlans1Page() {
  return (
    <div className="p-6 space-y-6 bg-gray-50 min-h-screen">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Admin Subscription Plans1</h1>
        <p className="text-gray-600 mt-1">Create, update, or retire subscription plans</p>
      </div>
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Award className="w-5 h-5" />
            Subscription Plans
          </CardTitle>
          <CardDescription>Manage plans (Free Trial, Monthly, Yearly), editable attributes: Plan Name, Duration, Target Role (Normal / Teacher / Both), Limits (Questions per month, AI messages per day, Classes per teacher, Students per class)</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-center py-12">
            <Award className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">Subscription Plans</h3>
            <p className="text-gray-600">Manage subscription plans and pricing</p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}