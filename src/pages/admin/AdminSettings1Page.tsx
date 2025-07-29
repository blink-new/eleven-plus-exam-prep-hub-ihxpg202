import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card'
import { Settings } from 'lucide-react'

export default function AdminSettings1Page() {
  return (
    <div className="p-6 space-y-6 bg-gray-50 min-h-screen">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Admin Settings1</h1>
        <p className="text-gray-600 mt-1">System-level configuration control</p>
      </div>
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Settings className="w-5 h-5" />
            Admin Settings
          </CardTitle>
          <CardDescription>Global AI limits, default values for new subscription plans, enable/disable coupon module, set default plan on user signup</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-center py-12">
            <Settings className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">Admin Settings</h3>
            <p className="text-gray-600">System-wide configuration and settings</p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}