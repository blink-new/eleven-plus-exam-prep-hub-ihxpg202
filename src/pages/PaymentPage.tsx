import { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { Button } from '../components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card'
import { Badge } from '../components/ui/badge'
import { Input } from '../components/ui/input'
import { Label } from '../components/ui/label'
import { Separator } from '../components/ui/separator'
import { 
  ArrowLeft,
  Trophy,
  CreditCard,
  Shield,
  Clock,
  FileText,
  CheckCircle,
  Lock,
  Zap,
  Calculator,
  BookOpen,
  Brain,
  Puzzle
} from 'lucide-react'

interface PaymentMethod {
  id: string
  name: string
  icon: React.ReactNode
  description: string
}

const paymentMethods: PaymentMethod[] = [
  {
    id: 'card',
    name: 'Credit/Debit Card',
    icon: <CreditCard className="w-5 h-5" />,
    description: 'Visa, Mastercard, American Express'
  },
  {
    id: 'paypal',
    name: 'PayPal',
    icon: <div className="w-5 h-5 bg-blue-600 rounded text-white text-xs flex items-center justify-center font-bold">P</div>,
    description: 'Pay with your PayPal account'
  },
  {
    id: 'apple',
    name: 'Apple Pay',
    icon: <div className="w-5 h-5 bg-black rounded text-white text-xs flex items-center justify-center">🍎</div>,
    description: 'Touch ID or Face ID'
  },
  {
    id: 'google',
    name: 'Google Pay',
    icon: <div className="w-5 h-5 bg-blue-500 rounded text-white text-xs flex items-center justify-center font-bold">G</div>,
    description: 'Pay with Google'
  }
]

const subjectIcons = {
  'Mathematics': <Calculator className="w-5 h-5" />,
  'English': <BookOpen className="w-5 h-5" />,
  'Verbal Reasoning': <Brain className="w-5 h-5" />,
  'Non-Verbal Reasoning': <Puzzle className="w-5 h-5" />
}

export default function PaymentPage() {
  const location = useLocation()
  const navigate = useNavigate()
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('card')
  const [isProcessing, setIsProcessing] = useState(false)
  const [cardDetails, setCardDetails] = useState({
    number: '',
    expiry: '',
    cvv: '',
    name: ''
  })

  // Get exam config from navigation state
  const { examConfig, price, duration } = location.state || {}

  if (!examConfig) {
    navigate('/create-exam')
    return null
  }

  const handlePayment = async () => {
    setIsProcessing(true)
    
    // Simulate payment processing
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    // Navigate to success page with exam details
    navigate('/payment-success', {
      state: {
        examConfig,
        price,
        duration,
        paymentMethod: paymentMethods.find(method => method.id === selectedPaymentMethod)?.name,
        examId: `exam_${Date.now()}`
      }
    })
  }

  const formatCardNumber = (value: string) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '')
    const matches = v.match(/\d{4,16}/g)
    const match = matches && matches[0] || ''
    const parts = []
    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4))
    }
    if (parts.length) {
      return parts.join(' ')
    } else {
      return v
    }
  }

  const formatExpiry = (value: string) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '')
    if (v.length >= 2) {
      return v.substring(0, 2) + '/' + v.substring(2, 4)
    }
    return v
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-4">
              <button 
                onClick={() => navigate(-1)}
                className="flex items-center gap-2 text-gray-600 hover:text-purple-600"
              >
                <ArrowLeft className="w-5 h-5" />
                <span>Back</span>
              </button>
            </div>
            
            <div className="flex items-center gap-3">
              <div className="p-2 bg-purple-600 rounded-lg">
                <Trophy className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">11+ Prep Hub</h1>
                <p className="text-xs text-gray-600">Secure Payment</p>
              </div>
            </div>

            <div className="w-32"></div> {/* Spacer for centering */}
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Payment Form */}
          <div className="space-y-6">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 mb-2">Complete Your Purchase</h1>
              <p className="text-gray-600">Choose your payment method and complete the transaction securely.</p>
            </div>

            {/* Payment Methods */}
            <Card>
              <CardHeader>
                <CardTitle>Payment Method</CardTitle>
                <CardDescription>Select how you'd like to pay</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                {paymentMethods.map((method) => (
                  <button
                    key={method.id}
                    onClick={() => setSelectedPaymentMethod(method.id)}
                    className={`w-full p-4 rounded-lg border-2 transition-all text-left ${
                      selectedPaymentMethod === method.id
                        ? 'border-purple-500 bg-purple-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      {method.icon}
                      <div>
                        <h3 className="font-medium text-gray-900">{method.name}</h3>
                        <p className="text-sm text-gray-600">{method.description}</p>
                      </div>
                    </div>
                  </button>
                ))}
              </CardContent>
            </Card>

            {/* Card Details Form */}
            {selectedPaymentMethod === 'card' && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Lock className="w-5 h-5 text-green-600" />
                    Card Details
                  </CardTitle>
                  <CardDescription>Your payment information is encrypted and secure</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="cardName">Cardholder Name</Label>
                    <Input
                      id="cardName"
                      placeholder="John Smith"
                      value={cardDetails.name}
                      onChange={(e) => setCardDetails(prev => ({ ...prev, name: e.target.value }))}
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="cardNumber">Card Number</Label>
                    <Input
                      id="cardNumber"
                      placeholder="1234 5678 9012 3456"
                      value={cardDetails.number}
                      onChange={(e) => setCardDetails(prev => ({ 
                        ...prev, 
                        number: formatCardNumber(e.target.value) 
                      }))}
                      maxLength={19}
                    />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="expiry">Expiry Date</Label>
                      <Input
                        id="expiry"
                        placeholder="MM/YY"
                        value={cardDetails.expiry}
                        onChange={(e) => setCardDetails(prev => ({ 
                          ...prev, 
                          expiry: formatExpiry(e.target.value) 
                        }))}
                        maxLength={5}
                      />
                    </div>
                    <div>
                      <Label htmlFor="cvv">CVV</Label>
                      <Input
                        id="cvv"
                        placeholder="123"
                        value={cardDetails.cvv}
                        onChange={(e) => setCardDetails(prev => ({ 
                          ...prev, 
                          cvv: e.target.value.replace(/\D/g, '') 
                        }))}
                        maxLength={4}
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Security Notice */}
            <Card className="border-green-200 bg-green-50">
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <Shield className="w-5 h-5 text-green-600" />
                  <div>
                    <h3 className="font-medium text-green-900">Secure Payment</h3>
                    <p className="text-sm text-green-700">
                      Your payment is protected by 256-bit SSL encryption and PCI DSS compliance.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Order Summary */}
          <div>
            <Card className="sticky top-24">
              <CardHeader>
                <CardTitle>Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Exam Details */}
                <div className="p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center text-purple-600">
                      {subjectIcons[examConfig.subject as keyof typeof subjectIcons]}
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">Custom Exam</h3>
                      <p className="text-sm text-gray-600">{examConfig.subject}</p>
                    </div>
                  </div>
                  
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Topic:</span>
                      <span className="font-medium">{examConfig.topic}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Questions:</span>
                      <span className="font-medium">{examConfig.questionCount}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Difficulty:</span>
                      <Badge className="text-xs">
                        {examConfig.difficulty}
                      </Badge>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Duration:</span>
                      <div className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        <span className="font-medium">{duration} mins</span>
                      </div>
                    </div>
                  </div>
                </div>

                <Separator />

                {/* Pricing */}
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Exam Generation</span>
                    <span>£{price}</span>
                  </div>
                  <div className="flex justify-between text-sm text-gray-600">
                    <span>Processing Fee</span>
                    <span>£0.00</span>
                  </div>
                  <div className="flex justify-between text-sm text-gray-600">
                    <span>VAT (20%)</span>
                    <span>£{(parseFloat(price) * 0.2).toFixed(2)}</span>
                  </div>
                </div>

                <Separator />

                <div className="flex justify-between text-lg font-semibold">
                  <span>Total</span>
                  <span className="text-purple-600">£{(parseFloat(price) * 1.2).toFixed(2)}</span>
                </div>

                {/* What's Included */}
                <div className="space-y-2 pt-4 border-t">
                  <h4 className="font-medium text-gray-900">What's included:</h4>
                  <div className="space-y-1">
                    <div className="flex items-center gap-2 text-sm">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      <span>Downloadable PDF exam</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      <span>Online practice mode</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      <span>Detailed answer explanations</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      <span>Instant results & feedback</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      <span>Progress tracking</span>
                    </div>
                  </div>
                </div>

                {/* Payment Button */}
                <Button
                  onClick={handlePayment}
                  disabled={isProcessing || (selectedPaymentMethod === 'card' && (!cardDetails.name || !cardDetails.number || !cardDetails.expiry || !cardDetails.cvv))}
                  className="w-full gap-2 bg-purple-600 hover:bg-purple-700"
                  size="lg"
                >
                  {isProcessing ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      Processing...
                    </>
                  ) : (
                    <>
                      <Zap className="w-5 h-5" />
                      Complete Payment £{(parseFloat(price) * 1.2).toFixed(2)}
                    </>
                  )}
                </Button>

                <p className="text-xs text-gray-500 text-center">
                  By completing this purchase, you agree to our Terms of Service and Privacy Policy.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}