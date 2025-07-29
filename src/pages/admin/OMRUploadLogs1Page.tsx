import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card'
import { Upload } from 'lucide-react'

export default function OMRUploadLogs1Page() {
  return (
    <div className="p-6 space-y-6 bg-gray-50 min-h-screen">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Admin OMR Upload Logs1</h1>
        <p className="text-gray-600 mt-1">Monitor OMR uploads with status tracking and manual overrides</p>
      </div>
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Upload className="w-5 h-5" />
            OMR Upload Logs
          </CardTitle>
          <CardDescription>Monitor OMR uploads: Status (Pending, Processed, Error), download uploaded sheets, manually override marks if needed</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-center py-12">
            <Upload className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">OMR Upload Logs</h3>
            <p className="text-gray-600">Monitor OMR sheet uploads and processing status</p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}