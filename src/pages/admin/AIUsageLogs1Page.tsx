import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card'
import { MessageSquare } from 'lucide-react'

export default function AIUsageLogs1Page() {
  return (
    <div className="p-6 space-y-6 bg-gray-50 min-h-screen">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Admin AI Usage Logs1</h1>
        <p className="text-gray-600 mt-1">Track how users interact with AI-based features</p>
      </div>
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MessageSquare className="w-5 h-5" />
            AI Usage Logs
          </CardTitle>
          <CardDescription>Table with: User email, timestamp, prompt/query sent to AI, character count, token usage. Helps detect misuse or overconsumption. Filters for user, role, and date</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-center py-12">
            <MessageSquare className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">AI Usage Logs</h3>
            <p className="text-gray-600">Monitor AI feature usage and interactions</p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}