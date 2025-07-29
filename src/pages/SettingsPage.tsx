import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Button } from '../components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card'
import { Badge } from '../components/ui/badge'
import { 
  ChevronLeft,
  User,
  Lock,
  Bell,
  Palette,
  Globe,
  Shield,
  Eye,
  EyeOff,
  Save,
  RefreshCw,
  Mail,
  Phone,
  Calendar,
  MapPin,
  Edit
} from 'lucide-react'

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState('profile')
  const [showCurrentPassword, setShowCurrentPassword] = useState(false)
  const [showNewPassword, setShowNewPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  
  // Form states
  const [profileData, setProfileData] = useState({
    fullName: 'Alex Johnson',
    email: 'alex.johnson@email.com',
    phone: '+44 7123 456789',
    dateOfBirth: '2013-05-15',
    address: '123 Oak Street, London, UK',
    parentName: 'Sarah Johnson',
    parentEmail: 'sarah.johnson@email.com',
    parentPhone: '+44 7987 654321'
  })

  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  })

  const [notificationSettings, setNotificationSettings] = useState({
    emailNotifications: true,
    pushNotifications: true,
    examReminders: true,
    gradeAlerts: true,
    classUpdates: true,
    systemAlerts: false,
    weeklyReports: true,
    achievementAlerts: true
  })

  const [preferences, setPreferences] = useState({
    theme: 'light',
    language: 'en',
    timezone: 'Europe/London',
    dateFormat: 'DD/MM/YYYY',
    timeFormat: '24h'
  })

  const tabs = [
    { id: 'profile', label: 'Profile', icon: <User className="w-4 h-4" /> },
    { id: 'password', label: 'Change Password', icon: <Lock className="w-4 h-4" /> },
    { id: 'notifications', label: 'Notifications', icon: <Bell className="w-4 h-4" /> },
    { id: 'preferences', label: 'Preferences', icon: <Palette className="w-4 h-4" /> }
  ]

  const handleProfileUpdate = () => {
    // Handle profile update logic
    console.log('Profile updated:', profileData)
  }

  const handlePasswordChange = () => {
    // Handle password change logic
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      alert('New passwords do not match!')
      return
    }
    console.log('Password changed')
    setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' })
  }

  const handleNotificationUpdate = () => {
    // Handle notification settings update
    console.log('Notification settings updated:', notificationSettings)
  }

  const handlePreferencesUpdate = () => {
    // Handle preferences update
    console.log('Preferences updated:', preferences)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-sm border-b border-gray-200 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-4">
              <Link to="/dashboard" className="flex items-center gap-2 text-gray-600 hover:text-purple-600 transition-colors">
                <ChevronLeft className="w-5 h-5" />
                <span className="font-medium">Back to Dashboard</span>
              </Link>
            </div>
            <div className="flex items-center gap-4">
              <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                Settings
              </h1>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar */}
          <div className="lg:w-64">
            <Card className="bg-white/70 backdrop-blur-sm border-white/20">
              <CardContent className="p-4">
                <nav className="space-y-2">
                  {tabs.map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-all ${
                        activeTab === tab.id
                          ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-sm'
                          : 'text-gray-700 hover:bg-gray-100'
                      }`}
                    >
                      {tab.icon}
                      <span className="font-medium">{tab.label}</span>
                    </button>
                  ))}
                </nav>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {/* Profile Settings */}
            {activeTab === 'profile' && (
              <Card className="bg-white/70 backdrop-blur-sm border-white/20">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <User className="w-5 h-5" />
                    Profile Information
                  </CardTitle>
                  <CardDescription>
                    Update your personal information and contact details
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Student Information */}
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Student Information</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Full Name
                        </label>
                        <input
                          type="text"
                          value={profileData.fullName}
                          onChange={(e) => setProfileData({...profileData, fullName: e.target.value})}
                          className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Email Address
                        </label>
                        <input
                          type="email"
                          value={profileData.email}
                          onChange={(e) => setProfileData({...profileData, email: e.target.value})}
                          className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Phone Number
                        </label>
                        <input
                          type="tel"
                          value={profileData.phone}
                          onChange={(e) => setProfileData({...profileData, phone: e.target.value})}
                          className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Date of Birth
                        </label>
                        <input
                          type="date"
                          value={profileData.dateOfBirth}
                          onChange={(e) => setProfileData({...profileData, dateOfBirth: e.target.value})}
                          className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all"
                        />
                      </div>
                    </div>
                    <div className="mt-4">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Address
                      </label>
                      <textarea
                        value={profileData.address}
                        onChange={(e) => setProfileData({...profileData, address: e.target.value})}
                        rows={3}
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all"
                      />
                    </div>
                  </div>

                  {/* Parent/Guardian Information */}
                  <div className="border-t border-gray-200 pt-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Parent/Guardian Information</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Parent/Guardian Name
                        </label>
                        <input
                          type="text"
                          value={profileData.parentName}
                          onChange={(e) => setProfileData({...profileData, parentName: e.target.value})}
                          className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Parent Email
                        </label>
                        <input
                          type="email"
                          value={profileData.parentEmail}
                          onChange={(e) => setProfileData({...profileData, parentEmail: e.target.value})}
                          className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Parent Phone
                        </label>
                        <input
                          type="tel"
                          value={profileData.parentPhone}
                          onChange={(e) => setProfileData({...profileData, parentPhone: e.target.value})}
                          className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-end">
                    <Button 
                      onClick={handleProfileUpdate}
                      className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
                    >
                      <Save className="w-4 h-4 mr-2" />
                      Save Changes
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Password Settings */}
            {activeTab === 'password' && (
              <Card className="bg-white/70 backdrop-blur-sm border-white/20">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Lock className="w-5 h-5" />
                    Change Password
                  </CardTitle>
                  <CardDescription>
                    Update your password to keep your account secure
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Current Password
                    </label>
                    <div className="relative">
                      <input
                        type={showCurrentPassword ? 'text' : 'password'}
                        value={passwordData.currentPassword}
                        onChange={(e) => setPasswordData({...passwordData, currentPassword: e.target.value})}
                        className="w-full px-4 py-3 pr-12 border border-gray-200 rounded-xl focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all"
                        placeholder="Enter your current password"
                      />
                      <button
                        type="button"
                        onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                      >
                        {showCurrentPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                      </button>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      New Password
                    </label>
                    <div className="relative">
                      <input
                        type={showNewPassword ? 'text' : 'password'}
                        value={passwordData.newPassword}
                        onChange={(e) => setPasswordData({...passwordData, newPassword: e.target.value})}
                        className="w-full px-4 py-3 pr-12 border border-gray-200 rounded-xl focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all"
                        placeholder="Enter your new password"
                      />
                      <button
                        type="button"
                        onClick={() => setShowNewPassword(!showNewPassword)}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                      >
                        {showNewPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                      </button>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Confirm New Password
                    </label>
                    <div className="relative">
                      <input
                        type={showConfirmPassword ? 'text' : 'password'}
                        value={passwordData.confirmPassword}
                        onChange={(e) => setPasswordData({...passwordData, confirmPassword: e.target.value})}
                        className="w-full px-4 py-3 pr-12 border border-gray-200 rounded-xl focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all"
                        placeholder="Confirm your new password"
                      />
                      <button
                        type="button"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                      >
                        {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                      </button>
                    </div>
                  </div>

                  {/* Password Requirements */}
                  <div className="bg-blue-50 rounded-lg p-4">
                    <h4 className="text-sm font-medium text-blue-900 mb-2">Password Requirements:</h4>
                    <ul className="text-sm text-blue-700 space-y-1">
                      <li>• At least 8 characters long</li>
                      <li>• Contains at least one uppercase letter</li>
                      <li>• Contains at least one lowercase letter</li>
                      <li>• Contains at least one number</li>
                      <li>• Contains at least one special character</li>
                    </ul>
                  </div>

                  <div className="flex justify-end">
                    <Button 
                      onClick={handlePasswordChange}
                      className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
                    >
                      <Lock className="w-4 h-4 mr-2" />
                      Change Password
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Notification Settings */}
            {activeTab === 'notifications' && (
              <Card className="bg-white/70 backdrop-blur-sm border-white/20">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Bell className="w-5 h-5" />
                    Notification Preferences
                  </CardTitle>
                  <CardDescription>
                    Choose how you want to receive notifications
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* General Notifications */}
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">General Notifications</h3>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium text-gray-900">Email Notifications</p>
                          <p className="text-sm text-gray-600">Receive notifications via email</p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            checked={notificationSettings.emailNotifications}
                            onChange={(e) => setNotificationSettings({...notificationSettings, emailNotifications: e.target.checked})}
                            className="sr-only peer"
                          />
                          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
                        </label>
                      </div>

                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium text-gray-900">Push Notifications</p>
                          <p className="text-sm text-gray-600">Receive push notifications in your browser</p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            checked={notificationSettings.pushNotifications}
                            onChange={(e) => setNotificationSettings({...notificationSettings, pushNotifications: e.target.checked})}
                            className="sr-only peer"
                          />
                          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
                        </label>
                      </div>
                    </div>
                  </div>

                  {/* Specific Notifications */}
                  <div className="border-t border-gray-200 pt-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Specific Notifications</h3>
                    <div className="space-y-4">
                      {[
                        { key: 'examReminders', label: 'Exam Reminders', desc: 'Get notified about upcoming exams and deadlines' },
                        { key: 'gradeAlerts', label: 'Grade Alerts', desc: 'Receive notifications when new grades are available' },
                        { key: 'classUpdates', label: 'Class Updates', desc: 'Get notified about class schedule changes and announcements' },
                        { key: 'systemAlerts', label: 'System Alerts', desc: 'Receive important system maintenance and update notifications' },
                        { key: 'weeklyReports', label: 'Weekly Reports', desc: 'Get weekly progress reports and performance summaries' },
                        { key: 'achievementAlerts', label: 'Achievement Alerts', desc: 'Get notified when you unlock new achievements' }
                      ].map((setting) => (
                        <div key={setting.key} className="flex items-center justify-between">
                          <div>
                            <p className="font-medium text-gray-900">{setting.label}</p>
                            <p className="text-sm text-gray-600">{setting.desc}</p>
                          </div>
                          <label className="relative inline-flex items-center cursor-pointer">
                            <input
                              type="checkbox"
                              checked={notificationSettings[setting.key as keyof typeof notificationSettings] as boolean}
                              onChange={(e) => setNotificationSettings({...notificationSettings, [setting.key]: e.target.checked})}
                              className="sr-only peer"
                            />
                            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="flex justify-end">
                    <Button 
                      onClick={handleNotificationUpdate}
                      className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
                    >
                      <Save className="w-4 h-4 mr-2" />
                      Save Preferences
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Preferences */}
            {activeTab === 'preferences' && (
              <Card className="bg-white/70 backdrop-blur-sm border-white/20">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Palette className="w-5 h-5" />
                    Application Preferences
                  </CardTitle>
                  <CardDescription>
                    Customize your application experience
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Theme
                      </label>
                      <select
                        value={preferences.theme}
                        onChange={(e) => setPreferences({...preferences, theme: e.target.value})}
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:border-purple-500 focus:ring-2 focus:ring-purple-200 bg-white"
                      >
                        <option value="light">Light</option>
                        <option value="dark">Dark</option>
                        <option value="auto">Auto (System)</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Language
                      </label>
                      <select
                        value={preferences.language}
                        onChange={(e) => setPreferences({...preferences, language: e.target.value})}
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:border-purple-500 focus:ring-2 focus:ring-purple-200 bg-white"
                      >
                        <option value="en">English</option>
                        <option value="es">Spanish</option>
                        <option value="fr">French</option>
                        <option value="de">German</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Timezone
                      </label>
                      <select
                        value={preferences.timezone}
                        onChange={(e) => setPreferences({...preferences, timezone: e.target.value})}
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:border-purple-500 focus:ring-2 focus:ring-purple-200 bg-white"
                      >
                        <option value="Europe/London">London (GMT)</option>
                        <option value="America/New_York">New York (EST)</option>
                        <option value="America/Los_Angeles">Los Angeles (PST)</option>
                        <option value="Europe/Paris">Paris (CET)</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Date Format
                      </label>
                      <select
                        value={preferences.dateFormat}
                        onChange={(e) => setPreferences({...preferences, dateFormat: e.target.value})}
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:border-purple-500 focus:ring-2 focus:ring-purple-200 bg-white"
                      >
                        <option value="DD/MM/YYYY">DD/MM/YYYY</option>
                        <option value="MM/DD/YYYY">MM/DD/YYYY</option>
                        <option value="YYYY-MM-DD">YYYY-MM-DD</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Time Format
                      </label>
                      <select
                        value={preferences.timeFormat}
                        onChange={(e) => setPreferences({...preferences, timeFormat: e.target.value})}
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:border-purple-500 focus:ring-2 focus:ring-purple-200 bg-white"
                      >
                        <option value="12h">12 Hour (AM/PM)</option>
                        <option value="24h">24 Hour</option>
                      </select>
                    </div>
                  </div>

                  <div className="flex justify-end">
                    <Button 
                      onClick={handlePreferencesUpdate}
                      className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
                    >
                      <Save className="w-4 h-4 mr-2" />
                      Save Preferences
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}