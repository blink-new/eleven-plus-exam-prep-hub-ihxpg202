import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card'
import { Button } from '../../components/ui/button'
import { CheckCircle, Plus, Filter, Upload } from 'lucide-react'

export default function ExamManagement1Page() {
  return (
    <div className="p-6 space-y-6 bg-gray-50 min-h-screen">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Admin Exam Management1</h1>
          <p className="text-gray-600 mt-1">View system-generated and custom exams with approval workflow</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Upload className="w-4 h-4 mr-2" />
            Bulk Upload
          </Button>
          <Button>
            <Plus className="w-4 h-4 mr-2" />
            Create Exam
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CheckCircle className="w-5 h-5" />
            Exam Management
          </CardTitle>
          <CardDescription>View, approve, review, and edit exams with usage statistics</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-center py-12">
            <CheckCircle className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">Exam Management</h3>
            <p className="text-gray-600 mb-4">
              View system-generated and custom exams, filter by creator (Admin/Teacher),
              approve, review, and edit exams, bulk upload questions (CSV/JSON),
              and view exam usage and engagement stats.
            </p>
            <div className="flex justify-center gap-3">
              <Button variant="outline">
                <Filter className="w-4 h-4 mr-2" />
                Filter Exams
              </Button>
              <Button variant="outline">
                <CheckCircle className="w-4 h-4 mr-2" />
                Review Queue
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}