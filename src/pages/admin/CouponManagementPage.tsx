import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card'
import { Button } from '../../components/ui/button'
import { Badge } from '../../components/ui/badge'
import { Input } from '../../components/ui/input'
import { Label } from '../../components/ui/label'
import { Progress } from '../../components/ui/progress'
import { 
  Plus, 
  Edit, 
  Trash2, 
  Search, 
  Filter,
  Eye,
  ToggleLeft,
  ToggleRight,
  Percent,
  DollarSign,
  Calendar,
  Users,
  CheckCircle,
  XCircle,
  AlertTriangle,
  Copy,
  Download
} from 'lucide-react'

interface Coupon {
  id: string
  code: string
  discountType: 'flat' | 'percentage'
  value: number
  applicablePlans: string[]
  expiryDate: string
  usageCap: {
    global: number
    perUser: number
  }
  currentUsage: number
  isActive: boolean
  createdAt: string
  createdBy: string
  description: string
}

interface CouponUsage {
  userId: string
  userEmail: string
  userName: string
  usedAt: string
  planApplied: string
  discountAmount: number
}

const mockCoupons: Coupon[] = [
  {
    id: '1',
    code: 'WELCOME20',
    discountType: 'percentage',
    value: 20,
    applicablePlans: ['Student Monthly', 'Teacher Pro'],
    expiryDate: '2024-12-31',
    usageCap: { global: 500, perUser: 1 },
    currentUsage: 156,
    isActive: true,
    createdAt: '2024-01-01',
    createdBy: 'admin@example.com',
    description: 'Welcome discount for new users'
  },
  {
    id: '2',
    code: 'STUDENT50',
    discountType: 'percentage',
    value: 50,
    applicablePlans: ['Student Monthly'],
    expiryDate: '2024-06-30',
    usageCap: { global: 200, perUser: 1 },
    currentUsage: 89,
    isActive: true,
    createdAt: '2024-01-15',
    createdBy: 'admin@example.com',
    description: 'Special student discount'
  },
  {
    id: '3',
    code: 'TEACHER25',
    discountType: 'percentage',
    value: 25,
    applicablePlans: ['Teacher Pro', 'Annual Premium'],
    expiryDate: '2024-09-30',
    usageCap: { global: 300, perUser: 2 },
    currentUsage: 234,
    isActive: true,
    createdAt: '2024-02-01',
    createdBy: 'admin@example.com',
    description: 'Teacher appreciation discount'
  },
  {
    id: '4',
    code: 'SUMMER30',
    discountType: 'percentage',
    value: 30,
    applicablePlans: ['Student Monthly', 'Teacher Pro', 'Annual Premium'],
    expiryDate: '2024-08-31',
    usageCap: { global: 150, perUser: 1 },
    currentUsage: 67,
    isActive: false,
    createdAt: '2024-06-01',
    createdBy: 'admin@example.com',
    description: 'Summer promotion discount'
  },
  {
    id: '5',
    code: 'FLAT10',
    discountType: 'flat',
    value: 10,
    applicablePlans: ['Student Monthly'],
    expiryDate: '2024-12-31',
    usageCap: { global: 1000, perUser: 3 },
    currentUsage: 445,
    isActive: true,
    createdAt: '2024-03-01',
    createdBy: 'admin@example.com',
    description: 'Flat £10 off any plan'
  }
]

const mockUsageData: { [key: string]: CouponUsage[] } = {
  '1': [
    {
      userId: '1',
      userEmail: 'john@example.com',
      userName: 'John Smith',
      usedAt: '2024-01-15T10:30:00Z',
      planApplied: 'Student Monthly',
      discountAmount: 2.00
    },
    {
      userId: '2',
      userEmail: 'sarah@example.com',
      userName: 'Sarah Johnson',
      usedAt: '2024-01-16T14:20:00Z',
      planApplied: 'Teacher Pro',
      discountAmount: 6.00
    }
  ]
}

export default function CouponManagementPage() {
  const [coupons, setCoupons] = useState<Coupon[]>(mockCoupons)
  const [searchTerm, setSearchTerm] = useState('')
  const [filterPlan, setFilterPlan] = useState('all')
  const [filterStatus, setFilterStatus] = useState('all')
  const [isAddModalOpen, setIsAddModalOpen] = useState(false)
  const [viewingUsage, setViewingUsage] = useState<string | null>(null)
  const [newCoupon, setNewCoupon] = useState({
    code: '',
    discountType: 'percentage' as const,
    value: 0,
    applicablePlans: [] as string[],
    expiryDate: '',
    usageCap: { global: 100, perUser: 1 },
    description: ''
  })

  const availablePlans = ['Free Trial', 'Student Monthly', 'Teacher Pro', 'Annual Premium']

  const filteredCoupons = coupons.filter(coupon => {
    const matchesSearch = coupon.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         coupon.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesPlan = filterPlan === 'all' || coupon.applicablePlans.includes(filterPlan)
    const matchesStatus = filterStatus === 'all' || 
      (filterStatus === 'active' && coupon.isActive) || 
      (filterStatus === 'inactive' && !coupon.isActive)
    
    return matchesSearch && matchesPlan && matchesStatus
  })

  const handleToggleStatus = (couponId: string) => {
    setCoupons(coupons.map(coupon => 
      coupon.id === couponId ? { ...coupon, isActive: !coupon.isActive } : coupon
    ))
  }

  const handleDeleteCoupon = (couponId: string) => {
    setCoupons(coupons.filter(c => c.id !== couponId))
  }

  const handleAddCoupon = () => {
    const coupon: Coupon = {
      id: Date.now().toString(),
      ...newCoupon,
      currentUsage: 0,
      isActive: true,
      createdAt: new Date().toISOString().split('T')[0],
      createdBy: 'admin@example.com'
    }
    setCoupons([...coupons, coupon])
    setIsAddModalOpen(false)
    setNewCoupon({
      code: '',
      discountType: 'percentage',
      value: 0,
      applicablePlans: [],
      expiryDate: '',
      usageCap: { global: 100, perUser: 1 },
      description: ''
    })
  }

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
  }

  const getUsagePercentage = (coupon: Coupon) => {
    return Math.round((coupon.currentUsage / coupon.usageCap.global) * 100)
  }

  const isExpired = (expiryDate: string) => {
    return new Date(expiryDate) < new Date()
  }

  const getStatusBadge = (coupon: Coupon) => {
    if (!coupon.isActive) {
      return <Badge className="bg-gray-100 text-gray-800"><XCircle className="w-3 h-3 mr-1" />Inactive</Badge>
    }
    if (isExpired(coupon.expiryDate)) {
      return <Badge className="bg-red-100 text-red-800"><AlertTriangle className="w-3 h-3 mr-1" />Expired</Badge>
    }
    if (coupon.currentUsage >= coupon.usageCap.global) {
      return <Badge className="bg-orange-100 text-orange-800"><AlertTriangle className="w-3 h-3 mr-1" />Limit Reached</Badge>
    }
    return <Badge className="bg-green-100 text-green-800"><CheckCircle className="w-3 h-3 mr-1" />Active</Badge>
  }

  return (
    <div className="p-6 space-y-6 bg-gradient-to-br from-slate-50 to-blue-50 min-h-screen">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
            Coupon Management
          </h1>
          <p className="text-gray-600 mt-1">Manage promo codes, discounts, and usage limits</p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" className="gap-2">
            <Download className="w-4 h-4" />
            Export
          </Button>
          <Button 
            onClick={() => setIsAddModalOpen(true)}
            className="gap-2 bg-purple-600 hover:bg-purple-700"
          >
            <Plus className="w-4 h-4" />
            Add Coupon
          </Button>
        </div>
      </div>

      {/* Filters */}
      <Card className="backdrop-blur-sm bg-white/80 shadow-lg">
        <CardContent className="p-6">
          <div className="flex flex-wrap items-center gap-4">
            <div className="flex items-center gap-2">
              <Search className="w-4 h-4 text-gray-500" />
              <Input
                placeholder="Search coupons..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-64"
              />
            </div>
            <div className="flex items-center gap-2">
              <Filter className="w-4 h-4 text-gray-500" />
              <select
                value={filterPlan}
                onChange={(e) => setFilterPlan(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:border-purple-500 focus:ring-1 focus:ring-purple-500"
              >
                <option value="all">All Plans</option>
                {availablePlans.map(plan => (
                  <option key={plan} value={plan}>{plan}</option>
                ))}
              </select>
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:border-purple-500 focus:ring-1 focus:ring-purple-500"
              >
                <option value="all">All Status</option>
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Coupons Table */}
      <Card className="backdrop-blur-sm bg-white/90 shadow-lg">
        <CardHeader>
          <CardTitle>Active Coupons</CardTitle>
          <CardDescription>Manage all promotional codes and their usage</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-4 font-semibold text-gray-900">Code</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-900">Discount</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-900">Plans</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-900">Usage</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-900">Expiry</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-900">Status</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-900">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredCoupons.map((coupon, index) => (
                  <tr key={coupon.id} className={`border-b border-gray-100 hover:bg-gray-50 ${index % 2 === 0 ? 'bg-white' : 'bg-gray-50/50'}`}>
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-2">
                        <Badge variant="outline" className="font-mono text-sm">
                          {coupon.code}
                        </Badge>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => copyToClipboard(coupon.code)}
                          className="p-1 h-6 w-6"
                        >
                          <Copy className="w-3 h-3" />
                        </Button>
                      </div>
                      <p className="text-xs text-gray-500 mt-1">{coupon.description}</p>
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-2">
                        {coupon.discountType === 'percentage' ? (
                          <Percent className="w-4 h-4 text-purple-500" />
                        ) : (
                          <DollarSign className="w-4 h-4 text-green-500" />
                        )}
                        <span className="font-medium">
                          {coupon.discountType === 'percentage' ? `${coupon.value}%` : `£${coupon.value}`}
                        </span>
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex flex-wrap gap-1">
                        {coupon.applicablePlans.slice(0, 2).map(plan => (
                          <Badge key={plan} variant="outline" className="text-xs">
                            {plan}
                          </Badge>
                        ))}
                        {coupon.applicablePlans.length > 2 && (
                          <Badge variant="outline" className="text-xs">
                            +{coupon.applicablePlans.length - 2}
                          </Badge>
                        )}
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <div className="space-y-2">
                        <div className="flex items-center justify-between text-sm">
                          <span>{coupon.currentUsage} / {coupon.usageCap.global}</span>
                          <span className="text-gray-500">{getUsagePercentage(coupon)}%</span>
                        </div>
                        <Progress value={getUsagePercentage(coupon)} className="h-2" />
                        <div className="text-xs text-gray-500">
                          Max {coupon.usageCap.perUser} per user
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-gray-400" />
                        <span className={`text-sm ${isExpired(coupon.expiryDate) ? 'text-red-600' : 'text-gray-900'}`}>
                          {new Date(coupon.expiryDate).toLocaleDateString()}
                        </span>
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      {getStatusBadge(coupon)}
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-2">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => setViewingUsage(coupon.id)}
                        >
                          <Eye className="w-4 h-4" />
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleToggleStatus(coupon.id)}
                        >
                          {coupon.isActive ? (
                            <ToggleRight className="w-4 h-4 text-green-500" />
                          ) : (
                            <ToggleLeft className="w-4 h-4 text-gray-400" />
                          )}
                        </Button>
                        <Button
                          size="sm"
                          variant="destructive"
                          onClick={() => handleDeleteCoupon(coupon.id)}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Add Coupon Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <CardHeader>
              <CardTitle>Add New Coupon</CardTitle>
              <CardDescription>Create a new promotional code</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="code">Coupon Code</Label>
                  <Input
                    id="code"
                    value={newCoupon.code}
                    onChange={(e) => setNewCoupon({ ...newCoupon, code: e.target.value.toUpperCase() })}
                    placeholder="e.g., WELCOME20"
                    className="font-mono"
                  />
                </div>
                <div>
                  <Label htmlFor="discountType">Discount Type</Label>
                  <select
                    id="discountType"
                    value={newCoupon.discountType}
                    onChange={(e) => setNewCoupon({ ...newCoupon, discountType: e.target.value as any })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:border-purple-500 focus:ring-1 focus:ring-purple-500"
                  >
                    <option value="percentage">Percentage (%)</option>
                    <option value="flat">Flat Amount (£)</option>
                  </select>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="value">
                    Discount Value {newCoupon.discountType === 'percentage' ? '(%)' : '(£)'}
                  </Label>
                  <Input
                    id="value"
                    type="number"
                    value={newCoupon.value}
                    onChange={(e) => setNewCoupon({ ...newCoupon, value: parseFloat(e.target.value) || 0 })}
                    placeholder={newCoupon.discountType === 'percentage' ? '20' : '10.00'}
                  />
                </div>
                <div>
                  <Label htmlFor="expiryDate">Expiry Date</Label>
                  <Input
                    id="expiryDate"
                    type="date"
                    value={newCoupon.expiryDate}
                    onChange={(e) => setNewCoupon({ ...newCoupon, expiryDate: e.target.value })}
                  />
                </div>
              </div>

              <div>
                <Label>Applicable Plans</Label>
                <div className="grid grid-cols-2 gap-2 mt-2">
                  {availablePlans.map(plan => (
                    <label key={plan} className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={newCoupon.applicablePlans.includes(plan)}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setNewCoupon({
                              ...newCoupon,
                              applicablePlans: [...newCoupon.applicablePlans, plan]
                            })
                          } else {
                            setNewCoupon({
                              ...newCoupon,
                              applicablePlans: newCoupon.applicablePlans.filter(p => p !== plan)
                            })
                          }
                        }}
                        className="rounded border-gray-300"
                      />
                      <span className="text-sm">{plan}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="globalCap">Global Usage Limit</Label>
                  <Input
                    id="globalCap"
                    type="number"
                    value={newCoupon.usageCap.global}
                    onChange={(e) => setNewCoupon({
                      ...newCoupon,
                      usageCap: { ...newCoupon.usageCap, global: parseInt(e.target.value) || 0 }
                    })}
                  />
                </div>
                <div>
                  <Label htmlFor="perUserCap">Per User Limit</Label>
                  <Input
                    id="perUserCap"
                    type="number"
                    value={newCoupon.usageCap.perUser}
                    onChange={(e) => setNewCoupon({
                      ...newCoupon,
                      usageCap: { ...newCoupon.usageCap, perUser: parseInt(e.target.value) || 0 }
                    })}
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="description">Description</Label>
                <Input
                  id="description"
                  value={newCoupon.description}
                  onChange={(e) => setNewCoupon({ ...newCoupon, description: e.target.value })}
                  placeholder="Brief description of the coupon"
                />
              </div>

              <div className="flex justify-end gap-2 pt-4">
                <Button variant="outline" onClick={() => setIsAddModalOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={handleAddCoupon} className="bg-purple-600 hover:bg-purple-700">
                  Create Coupon
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Usage Modal */}
      {viewingUsage && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <Card className="w-full max-w-4xl max-h-[90vh] overflow-y-auto">
            <CardHeader>
              <CardTitle>Coupon Usage Details</CardTitle>
              <CardDescription>
                Users who have used coupon: {coupons.find(c => c.id === viewingUsage)?.code}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="text-left py-3 px-4 font-semibold text-gray-900">User</th>
                      <th className="text-left py-3 px-4 font-semibold text-gray-900">Plan Applied</th>
                      <th className="text-left py-3 px-4 font-semibold text-gray-900">Discount Amount</th>
                      <th className="text-left py-3 px-4 font-semibold text-gray-900">Used At</th>
                    </tr>
                  </thead>
                  <tbody>
                    {(mockUsageData[viewingUsage] || []).map((usage, index) => (
                      <tr key={index} className="border-b border-gray-100 hover:bg-gray-50">
                        <td className="py-4 px-4">
                          <div>
                            <div className="font-medium text-gray-900">{usage.userName}</div>
                            <div className="text-sm text-gray-500">{usage.userEmail}</div>
                          </div>
                        </td>
                        <td className="py-4 px-4">
                          <Badge variant="outline">{usage.planApplied}</Badge>
                        </td>
                        <td className="py-4 px-4">
                          <span className="font-medium text-green-600">£{usage.discountAmount.toFixed(2)}</span>
                        </td>
                        <td className="py-4 px-4">
                          <span className="text-sm text-gray-600">
                            {new Date(usage.usedAt).toLocaleDateString()} at {new Date(usage.usedAt).toLocaleTimeString()}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="flex justify-end pt-4">
                <Button variant="outline" onClick={() => setViewingUsage(null)}>
                  Close
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}