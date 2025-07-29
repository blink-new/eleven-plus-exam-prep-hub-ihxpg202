import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card'
import { Button } from '../../components/ui/button'
import { BookOpen, Plus, Edit, Trash2 } from 'lucide-react'

export default function CourseTopicManagement1Page() {
  return (
    <div className="p-6 space-y-6 bg-gray-50 min-h-screen">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Admin Course & Topic Management1</h1>
          <p className="text-gray-600 mt-1">Add/edit/delete courses and topics with difficulty levels</p>
        </div>
        <Button>
          <Plus className="w-4 h-4 mr-2" />
          Add Course
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BookOpen className="w-5 h-5" />
            Course & Topic Management
          </CardTitle>
          <CardDescription>Manage courses, topics, difficulty levels, and question mappings</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-center py-12">
            <BookOpen className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">Course & Topic Management</h3>
            <p className="text-gray-600 mb-4">
              Add/edit/delete courses and topics, define difficulty levels (Easy, Medium, Hard),
              tag topics to specific courses, and manage topic-to-question mappings.
            </p>
            <div className="flex justify-center gap-3">
              <Button variant="outline">
                <Edit className="w-4 h-4 mr-2" />
                Edit Courses
              </Button>
              <Button variant="outline">
                <Trash2 className="w-4 h-4 mr-2" />
                Manage Topics
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}