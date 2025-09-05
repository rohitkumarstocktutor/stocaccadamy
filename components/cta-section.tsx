"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { CheckCircle, ArrowRight, Clock } from "lucide-react"

const benefits = [
  "Live interactive sessions with Q&A",
  "Real-time market analysis and trades",
  "Lifetime access to recorded sessions",
  "Exclusive trading community access",
  "Personal mentorship opportunities",
  "Certificate of completion",
]

interface CtaSectionProps {
  courseData: any
}

export function CtaSection({ courseData }: CtaSectionProps) {
  const scrollToForm = () => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  return (
    <section className="py-24 bg-gradient-to-br from-primary via-primary to-secondary text-primary-foreground relative overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(255,255,255,0.05)_25%,rgba(255,255,255,0.05)_50%,transparent_50%,transparent_75%,rgba(255,255,255,0.05)_75%)] bg-[length:30px_30px]" />

      <div className="container mx-auto px-4 relative">
        <div className="max-w-5xl mx-auto text-center space-y-12">
          <div className="space-y-6">
            <h2 className="text-4xl lg:text-6xl font-bold text-balance leading-tight">
              Ready to Transform Your <span className="text-yellow-300">Trading Journey?</span>
            </h2>
            <p className="text-xl lg:text-2xl opacity-90 text-pretty max-w-3xl mx-auto leading-relaxed">
              Join thousands of successful traders who started with our masterclasses and achieved financial freedom
            </p>
          </div>

          <Card className="bg-white/10 backdrop-blur-md border-white/20 ring-1 ring-white/10">
            <CardContent className="p-10 lg:p-16">
              <div className="grid lg:grid-cols-2 gap-12 items-center">
                <div className="space-y-6">
                  <h3 className="text-3xl font-bold text-left">What's Included:</h3>
                  <div className="space-y-4">
                    {benefits.map((benefit, index) => (
                      <div key={index} className="flex items-center gap-4 text-left">
                        <CheckCircle className="w-6 h-6 text-green-400 flex-shrink-0" />
                        <span className="text-lg">{benefit}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-8">
                  <div className="text-center space-y-4">
                    <div className="text-6xl font-bold text-yellow-300">{courseData.course.discountPrice}</div>
                    <div className="text-xl opacity-75">Limited Time Offer</div>
                    <div className="text-lg opacity-60 line-through">Worth {courseData.course.price}</div>
                    <div className="flex items-center justify-center gap-2 text-yellow-300">
                      <Clock className="w-5 h-5" />
                      <span>Offer ends: {courseData.course.offerEnd}</span>
                    </div>
                  </div>

                  <Button
                    size="lg"
                    className="w-full bg-white text-primary hover:bg-white/90 text-xl font-bold h-16 transition-all duration-300 transform hover:scale-105"
                    onClick={scrollToForm}
                  >
                    Claim Your Free Spot Now
                    <ArrowRight className="w-6 h-6 ml-3" />
                  </Button>

                  <p className="text-lg opacity-75 text-center">⏰ Only 50 spots available per session</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}
