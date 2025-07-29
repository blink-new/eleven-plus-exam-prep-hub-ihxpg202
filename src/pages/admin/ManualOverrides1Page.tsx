import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card'
import { Settings } from 'lucide-react'

export default function ManualOverrides1Page() {
  return (
    <div className="p-6 space-y-6 bg-gray-50 min-h-screen">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Admin Manual Overrides1</h1>
        <p className="text-gray-600 mt-1">Grant exceptions for special cases</p>
      </div>
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Settings className="w-5 h-5" />
            Manual Overrides
          </CardTitle>
          <CardDescription>Update quotas or limits manually per user: Questions/month, AI messages/day, Max classes/students. Add remarks (auditable), full change history for transparency</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-center py-12">
            <Settings className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">Manual Overrides</h3>
            <p className="text-gray-600">Power admin tools for special case management</p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}