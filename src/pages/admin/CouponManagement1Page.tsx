import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card'
import { Trophy } from 'lucide-react'

export default function CouponManagement1Page() {
  return (
    <div className="p-6 space-y-6 bg-gray-50 min-h-screen">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Admin Coupon Management1</h1>
        <p className="text-gray-600 mt-1">Manage discount codes and promotional campaigns</p>
      </div>
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Trophy className="w-5 h-5" />
            Coupon Management
          </CardTitle>
          <CardDescription>View active/inactive coupons, attributes: Code, Discount Type (Flat / %), Value, Applicable Plans, Expiry Date, Usage Limits (global/per user), tracks usage count per coupon</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-center py-12">
            <Trophy className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">Coupon Management</h3>
            <p className="text-gray-600">Manage promotional codes and discounts</p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}