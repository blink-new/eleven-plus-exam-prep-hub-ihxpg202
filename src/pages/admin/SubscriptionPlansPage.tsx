import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card'
import { Button } from '../../components/ui/button'
import { Badge } from '../../components/ui/badge'
import { Input } from '../../components/ui/input'
import { Label } from '../../components/ui/label'
import { 
  Plus, 
  Edit, 
  Trash2, 
  Search, 
  Filter,
  CreditCard,
  Users,
  Calendar,
  Settings,
  CheckCircle,
  XCircle,
  Clock,
  Zap,
  MessageSquare,
  GraduationCap,
  BookOpen
} from 'lucide-react'

interface SubscriptionPlan {
  id: string
  name: string
  duration: 'monthly' | 'yearly' | 'trial'
  role: 'normal' | 'teacher' | 'both'
  price: number
  limits: {
    questionsPerMonth: number
    aiMessagesPerDay: number
    maxClasses: number
    studentsPerClass: number
  }
  features: string[]
  isActive: boolean
  createdAt: string
  subscribers: number
}

const mockPlans: SubscriptionPlan[] = [
  {
    id: '1',
    name: 'Free Trial',
    duration: 'trial',
    role: 'both',
    price: 0,
    limits: {
      questionsPerMonth: 50,
      aiMessagesPerDay: 10,
      maxClasses: 2,
      studentsPerClass: 10
    },
    features: ['Basic exam creation', 'Limited AI assistance', 'Basic analytics'],
    isActive: true,
    createdAt: '2024-01-01',
    subscribers: 1234
  },
  {
    id: '2',
    name: 'Student Monthly',
    duration: 'monthly',
    role: 'normal',
    price: 9.99,
    limits: {
      questionsPerMonth: 500,
      aiMessagesPerDay: 50,
      maxClasses: 0,
      studentsPerClass: 0
    },
    features: ['Unlimited exam access', 'Advanced AI tutoring', 'Progress tracking', 'Performance analytics'],
    isActive: true,
    createdAt: '2024-01-01',
    subscribers: 987
  },
  {
    id: '3',
    name: 'Teacher Pro',
    duration: 'monthly',
    role: 'teacher',
    price: 29.99,
    limits: {
      questionsPerMonth: 2000,
      aiMessagesPerDay: 200,
      maxClasses: 10,
      studentsPerClass: 50
    },
    features: ['Class management', 'Student tracking', 'Advanced analytics', 'Bulk operations', 'Priority support'],
    isActive: true,
    createdAt: '2024-01-01',
    subscribers: 456
  },
  {
    id: '4',
    name: 'Annual Premium',
    duration: 'yearly',
    role: 'both',
    price: 199.99,
    limits: {
      questionsPerMonth: 5000,
      aiMessagesPerDay: 500,
      maxClasses: 25,
      studentsPerClass: 100
    },
    features: ['Everything included', 'Priority support', 'Custom branding', 'API access', 'Advanced reporting'],
    isActive: true,
    createdAt: '2024-01-01',
    subscribers: 234
  },
  {
    id: '5',
    name: 'Legacy Basic',
    duration: 'monthly',
    role: 'normal',
    price: 4.99,
    limits: {
      questionsPerMonth: 100,
      aiMessagesPerDay: 20,
      maxClasses: 0,
      studentsPerClass: 0
    },
    features: ['Basic features only'],
    isActive: false,
    createdAt: '2023-12-01',
    subscribers: 12
  }
]

export default function SubscriptionPlansPage() {
  const [plans, setPlans] = useState<SubscriptionPlan[]>(mockPlans)
  const [searchTerm, setSearchTerm] = useState('')
  const [filterRole, setFilterRole] = useState('all')
  const [filterDuration, setFilterDuration] = useState('all')
  const [filterStatus, setFilterStatus] = useState('all')
  const [isAddModalOpen, setIsAddModalOpen] = useState(false)
  const [editingPlan, setEditingPlan] = useState<SubscriptionPlan | null>(null)
  const [newPlan, setNewPlan] = useState({
    name: '',
    duration: 'monthly' as const,
    role: 'normal' as const,
    price: 0,
    limits: {
      questionsPerMonth: 100,
      aiMessagesPerDay: 20,
      maxClasses: 0,
      studentsPerClass: 0
    },
    features: ['']
  })

  const filteredPlans = plans.filter(plan => {
    const matchesSearch = plan.name.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesRole = filterRole === 'all' || plan.role === filterRole || plan.role === 'both'
    const matchesDuration = filterDuration === 'all' || plan.duration === filterDuration
    const matchesStatus = filterStatus === 'all' || 
      (filterStatus === 'active' && plan.isActive) || 
      (filterStatus === 'inactive' && !plan.isActive)
    
    return matchesSearch && matchesRole && matchesDuration && matchesStatus
  })

  const handleToggleStatus = (planId: string) => {
    setPlans(plans.map(plan => 
      plan.id === planId ? { ...plan, isActive: !plan.isActive } : plan
    ))
  }

  const handleDeletePlan = (planId: string) => {
    const plan = plans.find(p => p.id === planId)
    if (plan && !plan.isActive) {
      setPlans(plans.filter(p => p.id !== planId))
    }
  }

  const handleAddPlan = () => {
    const plan: SubscriptionPlan = {
      id: Date.now().toString(),
      ...newPlan,
      isActive: true,
      createdAt: new Date().toISOString().split('T')[0],
      subscribers: 0
    }
    setPlans([...plans, plan])
    setIsAddModalOpen(false)
    setNewPlan({
      name: '',
      duration: 'monthly',
      role: 'normal',
      price: 0,
      limits: {
        questionsPerMonth: 100,
        aiMessagesPerDay: 20,
        maxClasses: 0,
        studentsPerClass: 0
      },
      features: ['']
    })
  }

  const getDurationBadge = (duration: string) => {
    switch (duration) {
      case 'trial': return <Badge className="bg-yellow-100 text-yellow-800">Trial</Badge>
      case 'monthly': return <Badge className="bg-blue-100 text-blue-800">Monthly</Badge>
      case 'yearly': return <Badge className="bg-green-100 text-green-800">Yearly</Badge>
      default: return <Badge variant="outline">{duration}</Badge>
    }
  }

  const getRoleBadge = (role: string) => {
    switch (role) {
      case 'normal': return <Badge className="bg-purple-100 text-purple-800">Normal User</Badge>
      case 'teacher': return <Badge className="bg-blue-100 text-blue-800">Teacher</Badge>
      case 'both': return <Badge className="bg-green-100 text-green-800">Both</Badge>
      default: return <Badge variant="outline">{role}</Badge>
    }
  }

  return (
    <div className="p-6 space-y-6 bg-gradient-to-br from-slate-50 to-blue-50 min-h-screen">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
            Subscription Plans
          </h1>
          <p className="text-gray-600 mt-1">Create, update, and manage subscription plans</p>
        </div>
        <Button 
          onClick={() => setIsAddModalOpen(true)}
          className="gap-2 bg-purple-600 hover:bg-purple-700"
        >
          <Plus className="w-4 h-4" />
          Add Plan
        </Button>
      </div>

      {/* Filters */}
      <Card className="backdrop-blur-sm bg-white/80 shadow-lg">
        <CardContent className="p-6">
          <div className="flex flex-wrap items-center gap-4">
            <div className="flex items-center gap-2">
              <Search className="w-4 h-4 text-gray-500" />
              <Input
                placeholder="Search plans..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-64"
              />
            </div>
            <div className="flex items-center gap-2">
              <Filter className="w-4 h-4 text-gray-500" />
              <select
                value={filterRole}
                onChange={(e) => setFilterRole(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:border-purple-500 focus:ring-1 focus:ring-purple-500"
              >
                <option value="all">All Roles</option>
                <option value="normal">Normal User</option>
                <option value="teacher">Teacher</option>
                <option value="both">Both</option>
              </select>
              <select
                value={filterDuration}
                onChange={(e) => setFilterDuration(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:border-purple-500 focus:ring-1 focus:ring-purple-500"
              >
                <option value="all">All Durations</option>
                <option value="trial">Trial</option>
                <option value="monthly">Monthly</option>
                <option value="yearly">Yearly</option>
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

      {/* Plans Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredPlans.map((plan) => (
          <Card key={plan.id} className="backdrop-blur-sm bg-white/90 shadow-lg hover:shadow-xl transition-all">
            <CardHeader className="pb-4">
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle className="text-xl">{plan.name}</CardTitle>
                  <div className="flex items-center gap-2 mt-2">
                    {getDurationBadge(plan.duration)}
                    {getRoleBadge(plan.role)}
                    {plan.isActive ? (
                      <Badge className="bg-green-100 text-green-800">
                        <CheckCircle className="w-3 h-3 mr-1" />
                        Active
                      </Badge>
                    ) : (
                      <Badge className="bg-red-100 text-red-800">
                        <XCircle className="w-3 h-3 mr-1" />
                        Inactive
                      </Badge>
                    )}
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-purple-600">
                    {plan.price === 0 ? 'Free' : `£${plan.price}`}
                  </div>
                  <div className="text-sm text-gray-500">
                    {plan.duration === 'trial' ? '14 days' : `per ${plan.duration.slice(0, -2)}`}
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Limits */}
              <div className="space-y-3">
                <h4 className="font-semibold text-gray-900 flex items-center gap-2">
                  <Settings className="w-4 h-4" />
                  Limits
                </h4>
                <div className="grid grid-cols-2 gap-3 text-sm">
                  <div className="flex items-center gap-2">
                    <BookOpen className="w-4 h-4 text-blue-500" />
                    <span>{plan.limits.questionsPerMonth} questions/month</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MessageSquare className="w-4 h-4 text-purple-500" />
                    <span>{plan.limits.aiMessagesPerDay} AI/day</span>
                  </div>
                  {plan.role !== 'normal' && (
                    <>
                      <div className="flex items-center gap-2">
                        <GraduationCap className="w-4 h-4 text-green-500" />
                        <span>{plan.limits.maxClasses} classes</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Users className="w-4 h-4 text-orange-500" />
                        <span>{plan.limits.studentsPerClass} students/class</span>
                      </div>
                    </>
                  )}
                </div>
              </div>

              {/* Features */}
              <div className="space-y-2">
                <h4 className="font-semibold text-gray-900">Features</h4>
                <ul className="text-sm text-gray-600 space-y-1">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-center gap-2">
                      <CheckCircle className="w-3 h-3 text-green-500" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Stats */}
              <div className="pt-4 border-t border-gray-200">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Subscribers</span>
                  <span className="font-medium">{plan.subscribers.toLocaleString()}</span>
                </div>
                <div className="flex items-center justify-between text-sm mt-1">
                  <span className="text-gray-600">Created</span>
                  <span className="font-medium">{new Date(plan.createdAt).toLocaleDateString()}</span>
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center gap-2 pt-4">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => setEditingPlan(plan)}
                  className="flex-1"
                >
                  <Edit className="w-4 h-4 mr-2" />
                  Edit
                </Button>
                <Button
                  size="sm"
                  variant={plan.isActive ? "outline" : "default"}
                  onClick={() => handleToggleStatus(plan.id)}
                  className="flex-1"
                >
                  {plan.isActive ? (
                    <>
                      <XCircle className="w-4 h-4 mr-2" />
                      Deactivate
                    </>
                  ) : (
                    <>
                      <CheckCircle className="w-4 h-4 mr-2" />
                      Activate
                    </>
                  )}
                </Button>
                {!plan.isActive && (
                  <Button
                    size="sm"
                    variant="destructive"
                    onClick={() => handleDeletePlan(plan.id)}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Add Plan Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <CardHeader>
              <CardTitle>Add New Plan</CardTitle>
              <CardDescription>Create a new subscription plan</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="name">Plan Name</Label>
                  <Input
                    id="name"
                    value={newPlan.name}
                    onChange={(e) => setNewPlan({ ...newPlan, name: e.target.value })}
                    placeholder="e.g., Premium Monthly"
                  />
                </div>
                <div>
                  <Label htmlFor="price">Price (£)</Label>
                  <Input
                    id="price"
                    type="number"
                    value={newPlan.price}
                    onChange={(e) => setNewPlan({ ...newPlan, price: parseFloat(e.target.value) || 0 })}
                    placeholder="0.00"
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="duration">Duration</Label>
                  <select
                    id="duration"
                    value={newPlan.duration}
                    onChange={(e) => setNewPlan({ ...newPlan, duration: e.target.value as any })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:border-purple-500 focus:ring-1 focus:ring-purple-500"
                  >
                    <option value="trial">Trial</option>
                    <option value="monthly">Monthly</option>
                    <option value="yearly">Yearly</option>
                  </select>
                </div>
                <div>
                  <Label htmlFor="role">Target Role</Label>
                  <select
                    id="role"
                    value={newPlan.role}
                    onChange={(e) => setNewPlan({ ...newPlan, role: e.target.value as any })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:border-purple-500 focus:ring-1 focus:ring-purple-500"
                  >
                    <option value="normal">Normal User</option>
                    <option value="teacher">Teacher</option>
                    <option value="both">Both</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="questions">Questions per Month</Label>
                  <Input
                    id="questions"
                    type="number"
                    value={newPlan.limits.questionsPerMonth}
                    onChange={(e) => setNewPlan({
                      ...newPlan,
                      limits: { ...newPlan.limits, questionsPerMonth: parseInt(e.target.value) || 0 }
                    })}
                  />
                </div>
                <div>
                  <Label htmlFor="ai">AI Messages per Day</Label>
                  <Input
                    id="ai"
                    type="number"
                    value={newPlan.limits.aiMessagesPerDay}
                    onChange={(e) => setNewPlan({
                      ...newPlan,
                      limits: { ...newPlan.limits, aiMessagesPerDay: parseInt(e.target.value) || 0 }
                    })}
                  />
                </div>
              </div>

              {newPlan.role !== 'normal' && (
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="classes">Max Classes</Label>
                    <Input
                      id="classes"
                      type="number"
                      value={newPlan.limits.maxClasses}
                      onChange={(e) => setNewPlan({
                        ...newPlan,
                        limits: { ...newPlan.limits, maxClasses: parseInt(e.target.value) || 0 }
                      })}
                    />
                  </div>
                  <div>
                    <Label htmlFor="students">Students per Class</Label>
                    <Input
                      id="students"
                      type="number"
                      value={newPlan.limits.studentsPerClass}
                      onChange={(e) => setNewPlan({
                        ...newPlan,
                        limits: { ...newPlan.limits, studentsPerClass: parseInt(e.target.value) || 0 }
                      })}
                    />
                  </div>
                </div>
              )}

              <div className="flex justify-end gap-2 pt-4">
                <Button variant="outline" onClick={() => setIsAddModalOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={handleAddPlan} className="bg-purple-600 hover:bg-purple-700">
                  Create Plan
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}