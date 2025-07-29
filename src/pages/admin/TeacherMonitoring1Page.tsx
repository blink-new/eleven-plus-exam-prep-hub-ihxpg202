import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card'
import { GraduationCap } from 'lucide-react'

export default function TeacherMonitoring1Page() {
  return (
    <div className="p-6 space-y-6 bg-gray-50 min-h-screen">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Admin Teacher Monitoring1</h1>
        <p className="text-gray-600 mt-1">View all Teachers and their associated classes/students</p>
      </div>
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <GraduationCap className="w-5 h-5" />
            Teacher Monitoring
          </CardTitle>
          <CardDescription>View all Teachers and their associated classes/students, track exam assignments and feedback, monitor teacher activity logs, temporarily restrict or revoke teacher access</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-center py-12">
            <GraduationCap className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">Teacher Monitoring</h3>
            <p className="text-gray-600">Monitor teacher activities and performance</p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}