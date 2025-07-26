import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Button } from '../../components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card'
import { Badge } from '../../components/ui/badge'
import { Input } from '../../components/ui/input'
import { Switch } from '../../components/ui/switch'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../components/ui/select'
import { Textarea } from '../../components/ui/textarea'
import { 
  ArrowLeft,
  Settings,
  Zap,
  Shield,
  Users,
  MessageSquare,
  BookOpen,
  Save,
  RefreshCw,
  AlertTriangle,
  CheckCircle,
  Globe,
  Database
} from 'lucide-react'

interface SystemSettings {
  aiLimits: {
    globallyEnabled: boolean
    maxTokensPerRequest: number
    maxRequestsPerHour: number
    timeoutSeconds: number
  }
  defaultPlanLimits: {
    freeTrialQuestions: number
    freeTrialAIMessages: number
    monthlyQuestions: number
    monthlyAIMessages: number
    yearlyQuestions: number
    yearlyAIMessages: number
  }
  couponModule: {
    enabled: boolean
    maxDiscountPercent: number
    maxUsagePerCoupon: number
  }
  userDefaults: {
    defaultPlan: string
    autoActivateAccounts: boolean
    requireEmailVerification: boolean
  }
  systemMaintenance: {
    maintenanceMode: boolean
    maintenanceMessage: string
    allowedAdminEmails: string[]
  }
  notifications: {
    emailNotifications: boolean
    smsNotifications: boolean
    pushNotifications: boolean
    adminAlerts: boolean
  }
}

const defaultSettings: SystemSettings = {
  aiLimits: {
    globallyEnabled: true,
    maxTokensPerRequest: 4000,
    maxRequestsPerHour: 100,
    timeoutSeconds: 30
  },
  defaultPlanLimits: {
    freeTrialQuestions: 10,
    freeTrialAIMessages: 5,
    monthlyQuestions: 100,
    monthlyAIMessages: 50,
    yearlyQuestions: 1200,
    yearlyAIMessages: 600
  },
  couponModule: {
    enabled: true,
    maxDiscountPercent: 100,
    maxUsagePerCoupon: 1000
  },
  userDefaults: {
    defaultPlan: 'Free Trial',
    autoActivateAccounts: true,
    requireEmailVerification: false
  },
  systemMaintenance: {
    maintenanceMode: false,
    maintenanceMessage: 'System is currently under maintenance. Please try again later.',
    allowedAdminEmails: ['admin@11plushub.com', 'support@11plushub.com']
  },
  notifications: {
    emailNotifications: true,
    smsNotifications: false,
    pushNotifications: true,
    adminAlerts: true
  }
}

export default function AdminSettingsPage() {
  const [settings, setSettings] = useState<SystemSettings>(defaultSettings)
  const [hasChanges, setHasChanges] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const [saveStatus, setSaveStatus] = useState<'idle' | 'success' | 'error'>('idle')

  const updateSetting = (path: string, value: any) => {
    setSettings(prev => {
      const newSettings = { ...prev }
      const keys = path.split('.')
      let current: any = newSettings
      
      for (let i = 0; i < keys.length - 1; i++) {
        current = current[keys[i]]
      }
      
      current[keys[keys.length - 1]] = value
      return newSettings
    })
    setHasChanges(true)
    setSaveStatus('idle')
  }

  const handleSave = async () => {
    setIsSaving(true)
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500))
      console.log('Saving settings:', settings)
      setSaveStatus('success')
      setHasChanges(false)
    } catch (error) {
      setSaveStatus('error')
    } finally {
      setIsSaving(false)
    }
  }

  const handleReset = () => {
    setSettings(defaultSettings)
    setHasChanges(true)
    setSaveStatus('idle')
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-sm border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-4">
              <Link 
                to="/dashboard" 
                className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
              >
                <ArrowLeft className="w-5 h-5" />
                <span>Back to Dashboard</span>
              </Link>
              <div className="h-6 w-px bg-gray-300" />
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-gray-500 to-slate-600 rounded-lg flex items-center justify-center">
                  <Settings className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h1 className="text-xl font-bold text-gray-900">System Settings</h1>
                  <p className="text-sm text-gray-600">Control system-wide configurations</p>
                </div>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              {saveStatus === 'success' && (
                <div className="flex items-center gap-2 text-green-600">
                  <CheckCircle className="w-4 h-4" />
                  <span className="text-sm">Settings saved</span>
                </div>
              )}
              {saveStatus === 'error' && (
                <div className="flex items-center gap-2 text-red-600">
                  <AlertTriangle className="w-4 h-4" />
                  <span className="text-sm">Save failed</span>
                </div>
              )}
              <Button onClick={handleReset} variant="outline" size="sm">
                <RefreshCw className="w-4 h-4 mr-2" />
                Reset to Defaults
              </Button>
              <Button 
                onClick={handleSave} 
                disabled={!hasChanges || isSaving}
                className="bg-blue-600 hover:bg-blue-700"
              >
                {isSaving ? (
                  <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                ) : (
                  <Save className="w-4 h-4 mr-2" />
                )}
                Save Changes
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto p-6 space-y-6">
        {/* AI Limits Configuration */}
        <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
          <CardHeader className="bg-gradient-to-r from-purple-50 to-indigo-50 rounded-t-lg">
            <div className="flex items-center gap-3">
              <Zap className="w-5 h-5 text-purple-600" />
              <div>
                <CardTitle className="text-purple-900">AI Limits & Controls</CardTitle>
                <CardDescription>Configure global AI usage limits and restrictions</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-6 space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium text-gray-900">Enable AI Features Globally</h4>
                <p className="text-sm text-gray-600">Turn off to disable all AI features system-wide</p>
              </div>
              <Switch
                checked={settings.aiLimits.globallyEnabled}
                onCheckedChange={(checked) => updateSetting('aiLimits.globallyEnabled', checked)}
              />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Max Tokens per Request</label>
                <Input
                  type="number"
                  value={settings.aiLimits.maxTokensPerRequest}
                  onChange={(e) => updateSetting('aiLimits.maxTokensPerRequest', parseInt(e.target.value))}
                />
                <p className="text-xs text-gray-500">Maximum tokens allowed per AI request</p>
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Max Requests per Hour</label>
                <Input
                  type="number"
                  value={settings.aiLimits.maxRequestsPerHour}
                  onChange={(e) => updateSetting('aiLimits.maxRequestsPerHour', parseInt(e.target.value))}
                />
                <p className="text-xs text-gray-500">Rate limit for AI requests per user</p>
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Timeout (seconds)</label>
                <Input
                  type="number"
                  value={settings.aiLimits.timeoutSeconds}
                  onChange={(e) => updateSetting('aiLimits.timeoutSeconds', parseInt(e.target.value))}
                />
                <p className="text-xs text-gray-500">Request timeout duration</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Default Plan Limits */}
        <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
          <CardHeader className="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-t-lg">
            <div className="flex items-center gap-3">
              <Users className="w-5 h-5 text-blue-600" />
              <div>
                <CardTitle className="text-blue-900">Default Plan Limits</CardTitle>
                <CardDescription>Set default usage limits for new subscription plans</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Free Trial */}
              <div className="space-y-4">
                <h4 className="font-medium text-gray-900 flex items-center gap-2">
                  <Badge variant="outline">Free Trial</Badge>
                </h4>
                <div className="space-y-3">
                  <div>
                    <label className="text-sm font-medium text-gray-700">Questions/Month</label>
                    <Input
                      type="number"
                      value={settings.defaultPlanLimits.freeTrialQuestions}
                      onChange={(e) => updateSetting('defaultPlanLimits.freeTrialQuestions', parseInt(e.target.value))}
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-700">AI Messages/Day</label>
                    <Input
                      type="number"
                      value={settings.defaultPlanLimits.freeTrialAIMessages}
                      onChange={(e) => updateSetting('defaultPlanLimits.freeTrialAIMessages', parseInt(e.target.value))}
                    />
                  </div>
                </div>
              </div>

              {/* Monthly Plan */}
              <div className="space-y-4">
                <h4 className="font-medium text-gray-900 flex items-center gap-2">
                  <Badge className="bg-green-100 text-green-800">Monthly</Badge>
                </h4>
                <div className="space-y-3">
                  <div>
                    <label className="text-sm font-medium text-gray-700">Questions/Month</label>
                    <Input
                      type="number"
                      value={settings.defaultPlanLimits.monthlyQuestions}
                      onChange={(e) => updateSetting('defaultPlanLimits.monthlyQuestions', parseInt(e.target.value))}
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-700">AI Messages/Day</label>
                    <Input
                      type="number"
                      value={settings.defaultPlanLimits.monthlyAIMessages}
                      onChange={(e) => updateSetting('defaultPlanLimits.monthlyAIMessages', parseInt(e.target.value))}
                    />
                  </div>
                </div>
              </div>

              {/* Yearly Plan */}
              <div className="space-y-4">
                <h4 className="font-medium text-gray-900 flex items-center gap-2">
                  <Badge className="bg-purple-100 text-purple-800">Yearly</Badge>
                </h4>
                <div className="space-y-3">
                  <div>
                    <label className="text-sm font-medium text-gray-700">Questions/Month</label>
                    <Input
                      type="number"
                      value={settings.defaultPlanLimits.yearlyQuestions}
                      onChange={(e) => updateSetting('defaultPlanLimits.yearlyQuestions', parseInt(e.target.value))}
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-700">AI Messages/Day</label>
                    <Input
                      type="number"
                      value={settings.defaultPlanLimits.yearlyAIMessages}
                      onChange={(e) => updateSetting('defaultPlanLimits.yearlyAIMessages', parseInt(e.target.value))}
                    />
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Coupon Module Settings */}
        <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
          <CardHeader className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-t-lg">
            <div className="flex items-center gap-3">
              <BookOpen className="w-5 h-5 text-green-600" />
              <div>
                <CardTitle className="text-green-900">Coupon Module</CardTitle>
                <CardDescription>Configure coupon system settings and limits</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-6 space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium text-gray-900">Enable Coupon Module</h4>
                <p className="text-sm text-gray-600">Allow creation and usage of discount coupons</p>
              </div>
              <Switch
                checked={settings.couponModule.enabled}
                onCheckedChange={(checked) => updateSetting('couponModule.enabled', checked)}
              />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Max Discount Percentage</label>
                <Input
                  type="number"
                  min="0"
                  max="100"
                  value={settings.couponModule.maxDiscountPercent}
                  onChange={(e) => updateSetting('couponModule.maxDiscountPercent', parseInt(e.target.value))}
                />
                <p className="text-xs text-gray-500">Maximum discount percentage allowed</p>
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Max Usage per Coupon</label>
                <Input
                  type="number"
                  value={settings.couponModule.maxUsagePerCoupon}
                  onChange={(e) => updateSetting('couponModule.maxUsagePerCoupon', parseInt(e.target.value))}
                />
                <p className="text-xs text-gray-500">Maximum times a coupon can be used</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* User Defaults */}
        <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
          <CardHeader className="bg-gradient-to-r from-orange-50 to-red-50 rounded-t-lg">
            <div className="flex items-center gap-3">
              <Shield className="w-5 h-5 text-orange-600" />
              <div>
                <CardTitle className="text-orange-900">User Defaults</CardTitle>
                <CardDescription>Configure default settings for new user accounts</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-6 space-y-6">
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Default Plan for New Users</label>
              <Select 
                value={settings.userDefaults.defaultPlan} 
                onValueChange={(value) => updateSetting('userDefaults.defaultPlan', value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select default plan" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Free Trial">Free Trial</SelectItem>
                  <SelectItem value="Monthly">Monthly</SelectItem>
                  <SelectItem value="Yearly">Yearly</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium text-gray-900">Auto-activate Accounts</h4>
                  <p className="text-sm text-gray-600">Automatically activate new user accounts</p>
                </div>
                <Switch
                  checked={settings.userDefaults.autoActivateAccounts}
                  onCheckedChange={(checked) => updateSetting('userDefaults.autoActivateAccounts', checked)}
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium text-gray-900">Require Email Verification</h4>
                  <p className="text-sm text-gray-600">Users must verify email before accessing features</p>
                </div>
                <Switch
                  checked={settings.userDefaults.requireEmailVerification}
                  onCheckedChange={(checked) => updateSetting('userDefaults.requireEmailVerification', checked)}
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* System Maintenance */}
        <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
          <CardHeader className="bg-gradient-to-r from-red-50 to-pink-50 rounded-t-lg">
            <div className="flex items-center gap-3">
              <Database className="w-5 h-5 text-red-600" />
              <div>
                <CardTitle className="text-red-900">System Maintenance</CardTitle>
                <CardDescription>Configure maintenance mode and system alerts</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-6 space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium text-gray-900">Maintenance Mode</h4>
                <p className="text-sm text-gray-600">Enable to restrict access to admins only</p>
              </div>
              <Switch
                checked={settings.systemMaintenance.maintenanceMode}
                onCheckedChange={(checked) => updateSetting('systemMaintenance.maintenanceMode', checked)}
              />
            </div>
            
            {settings.systemMaintenance.maintenanceMode && (
              <div className="space-y-4 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                <div className="flex items-center gap-2 text-yellow-800">
                  <AlertTriangle className="w-5 h-5" />
                  <span className="font-medium">Maintenance Mode Active</span>
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">Maintenance Message</label>
                  <Textarea
                    value={settings.systemMaintenance.maintenanceMessage}
                    onChange={(e) => updateSetting('systemMaintenance.maintenanceMessage', e.target.value)}
                    rows={3}
                    placeholder="Message to display to users during maintenance"
                  />
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">Allowed Admin Emails</label>
                  <Textarea
                    value={settings.systemMaintenance.allowedAdminEmails.join('\n')}
                    onChange={(e) => updateSetting('systemMaintenance.allowedAdminEmails', e.target.value.split('\n').filter(email => email.trim()))}
                    rows={3}
                    placeholder="Enter admin emails (one per line)"
                  />
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Notification Settings */}
        <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
          <CardHeader className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-t-lg">
            <div className="flex items-center gap-3">
              <MessageSquare className="w-5 h-5 text-indigo-600" />
              <div>
                <CardTitle className="text-indigo-900">Notification Settings</CardTitle>
                <CardDescription>Configure system-wide notification preferences</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium text-gray-900">Email Notifications</h4>
                    <p className="text-sm text-gray-600">Send notifications via email</p>
                  </div>
                  <Switch
                    checked={settings.notifications.emailNotifications}
                    onCheckedChange={(checked) => updateSetting('notifications.emailNotifications', checked)}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium text-gray-900">SMS Notifications</h4>
                    <p className="text-sm text-gray-600">Send notifications via SMS</p>
                  </div>
                  <Switch
                    checked={settings.notifications.smsNotifications}
                    onCheckedChange={(checked) => updateSetting('notifications.smsNotifications', checked)}
                  />
                </div>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium text-gray-900">Push Notifications</h4>
                    <p className="text-sm text-gray-600">Send browser push notifications</p>
                  </div>
                  <Switch
                    checked={settings.notifications.pushNotifications}
                    onCheckedChange={(checked) => updateSetting('notifications.pushNotifications', checked)}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium text-gray-900">Admin Alerts</h4>
                    <p className="text-sm text-gray-600">Send alerts to administrators</p>
                  </div>
                  <Switch
                    checked={settings.notifications.adminAlerts}
                    onCheckedChange={(checked) => updateSetting('notifications.adminAlerts', checked)}
                  />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Save Changes Banner */}
        {hasChanges && (
          <div className="fixed bottom-6 right-6 bg-white border border-gray-200 rounded-lg shadow-lg p-4 max-w-sm">
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 bg-orange-500 rounded-full animate-pulse"></div>
              <div>
                <p className="text-sm font-medium text-gray-900">Unsaved Changes</p>
                <p className="text-xs text-gray-600">You have unsaved configuration changes</p>
              </div>
              <Button size="sm" onClick={handleSave} disabled={isSaving}>
                Save
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}