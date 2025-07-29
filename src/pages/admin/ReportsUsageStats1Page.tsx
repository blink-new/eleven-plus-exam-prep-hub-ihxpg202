import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card'
import { BarChart3 } from 'lucide-react'

export default function ReportsUsageStats1Page() {
  return (
    <div className="p-6 space-y-6 bg-gray-50 min-h-screen">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Admin Reports & Usage Stats1</h1>
        <p className="text-gray-600 mt-1">Deep dive into platform usage analytics</p>
      </div>
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BarChart3 className="w-5 h-5" />
            Reports & Usage Stats
          </CardTitle>
          <CardDescription>Filter by user type, plan, date range. Metrics: Questions created (per day / per user), AI message usage, Class and student engagement. Export options: CSV, PDF</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-center py-12">
            <BarChart3 className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">Reports & Usage Stats</h3>
            <p className="text-gray-600">Comprehensive usage analytics and reporting</p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}