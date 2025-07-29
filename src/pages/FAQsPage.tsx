import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Button } from '../components/ui/button'
import { Card, CardContent } from '../components/ui/card'
import { 
  Trophy, 
  ArrowLeft,
  ChevronDown,
  ChevronUp,
  HelpCircle
} from 'lucide-react'

const faqs = [
  {
    id: '1',
    question: 'What is the 11+ exam?',
    answer: 'The 11+ exam is a selective entrance examination used by grammar schools and some independent schools in the UK to assess students for admission. It typically covers Mathematics, English, Verbal Reasoning, and Non-Verbal Reasoning.',
    category: 'General'
  },
  {
    id: '2',
    question: 'When should my child start preparing for the 11+ exam?',
    answer: 'We recommend starting preparation 12-18 months before the exam date. This allows enough time to cover all topics thoroughly without overwhelming your child. Starting in Year 4 (age 8-9) is ideal for Year 6 exams.',
    category: 'General'
  },
  {
    id: '3',
    question: 'How do I access the practice papers?',
    answer: 'Once you create an account, you can access our library of practice papers from your dashboard. Papers can be downloaded as PDFs or taken online with instant marking and feedback.',
    category: 'Platform'
  }
]

export default function FAQsPage() {
  const [expandedFAQ, setExpandedFAQ] = useState<string | null>(null)

  const toggleFAQ = (id: string) => {
    setExpandedFAQ(expandedFAQ === id ? null : id)
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link to="/" className="flex items-center gap-3">
              <div className="p-2 bg-purple-600 rounded-lg">
                <Trophy className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">11+ Prep Hub</h1>
                <p className="text-xs text-gray-600">Exam Excellence</p>
              </div>
            </Link>
            
            <div className="flex items-center space-x-4">
              <Link to="/">
                <Button variant="ghost" className="gap-2">
                  <ArrowLeft className="w-4 h-4" />
                  Back to Home
                </Button>
              </Link>
              <Link to="/login">
                <Button className="bg-purple-600 hover:bg-purple-700">
                  Login
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-purple-600 via-purple-700 to-cyan-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Frequently Asked Questions</h1>
          <p className="text-xl text-purple-100 max-w-3xl mx-auto">
            Find answers to common questions about 11+ preparation, our platform, 
            and how to help your child succeed.
          </p>
        </div>
      </section>

      {/* FAQ List */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-4">
            {faqs.map((faq) => (
              <Card key={faq.id} className="overflow-hidden">
                <CardContent className="p-0">
                  <button
                    onClick={() => toggleFAQ(faq.id)}
                    className="w-full p-6 text-left hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold text-gray-900 pr-4">
                          {faq.question}
                        </h3>
                      </div>
                      <div className="flex-shrink-0">
                        {expandedFAQ === faq.id ? (
                          <ChevronUp className="w-5 h-5 text-gray-500" />
                        ) : (
                          <ChevronDown className="w-5 h-5 text-gray-500" />
                        )}
                      </div>
                    </div>
                  </button>
                  
                  {expandedFAQ === faq.id && (
                    <div className="px-6 pb-6 border-t bg-gray-50">
                      <div className="pt-4">
                        <p className="text-gray-700 leading-relaxed">
                          {faq.answer}
                        </p>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-purple-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Get Started?</h2>
          <p className="text-xl text-purple-100 mb-8 max-w-2xl mx-auto">
            Join thousands of families who have successfully navigated the 11+ journey with our help.
          </p>
          <Link to="/signup">
            <Button size="lg" className="bg-white text-purple-600 hover:bg-gray-100">
              Start Free Trial
            </Button>
          </Link>
        </div>
      </section>
    </div>
  )
}