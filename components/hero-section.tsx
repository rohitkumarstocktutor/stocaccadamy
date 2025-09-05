"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent } from "@/components/ui/card"
import { TrendingUp, Star, Shield, Users, Clock } from "lucide-react"
import Image from "next/image"

const countryCodes = [
  { code: "+91", country: "IN", flag: "🇮🇳" },
  { code: "+1", country: "US", flag: "🇺🇸" },
  { code: "+44", country: "GB", flag: "🇬🇧" },
  { code: "+971", country: "AE", flag: "🇦🇪" },
  { code: "+65", country: "SG", flag: "🇸🇬" },
]

interface HeroSectionProps {
  courseData: any
}

export function HeroSection({ courseData }: HeroSectionProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    countryCode: "+91",
  })
  const [utmParams, setUtmParams] = useState<Record<string, string>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const router = require('next/navigation').useRouter();

  useEffect(() => {
    // Capture UTM parameters from URL
    const urlParams = new URLSearchParams(window.location.search)
    const params: Record<string, string> = {}

    for (const [key, value] of urlParams.entries()) {
      if (key.startsWith("utm_") || ["source", "medium", "campaign", "term", "content"].includes(key)) {
        params[key] = value
      }
    }
    setUtmParams(params)
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      // Prepare data for Pably webhook
      const webhookData = {
        ...formData,
        phone: `${formData.countryCode}${formData.phone}`,
        ...utmParams,
        timestamp: new Date().toISOString(),
        source: "landing_page",
        course: courseData.title,
      }

      // Send to Pably webhook
      await fetch(courseData.integrations.pablyWebhookUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(webhookData),
      })

      // Reset form
      setFormData({ name: "", email: "", phone: "", countryCode: "+91" })
      // Redirect to thank you page
      router.push("/thank-you")
    } catch (error) {
      console.error("Error submitting form:", error)
      alert("Something went wrong. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section className="relative min-h-screen bg-gradient-to-br from-background via-muted/20 to-background">
      {/* Professional background pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(5,150,105,0.02)_25%,rgba(5,150,105,0.02)_50%,transparent_50%,transparent_75%,rgba(5,150,105,0.02)_75%)] bg-[length:20px_20px]" />

      <div className="relative container mx-auto px-4 py-8 lg:py-16">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center">
          {/* Left side - Cover Image */}
          <div className="space-y-6">
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-primary to-secondary rounded-2xl blur opacity-25 group-hover:opacity-40 transition duration-1000"></div>
              <div className="relative">
                <Image
                  src={"https://www.stocktutor.live/_next/image?url=%2Fprabhu-selvaraj.jpg&w=3840&q=75"}
                  alt={courseData.title}
                  width={600}
                  height={400}
                  className="rounded-2xl shadow-2xl w-full border border-border/50"
                  priority
                />
                <div className="absolute top-4 left-4 bg-red-600 text-white px-3 py-1.5 rounded-full text-sm font-semibold flex items-center gap-1">
                  <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                  LIVE
                </div>
              </div>
            </div>

            {/* Course Details Cards */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              <Card className="text-center p-3 hover:shadow-md transition-shadow border-border/50">
                <CardContent className="p-0">
                  <Clock className="w-4 h-4 mx-auto mb-1 text-muted-foreground" />
                  <div className="text-xs text-muted-foreground">Date</div>
                  <div className="font-semibold text-sm">{courseData.course.date}</div>
                </CardContent>
              </Card>
              <Card className="text-center p-3 hover:shadow-md transition-shadow border-border/50">
                <CardContent className="p-0">
                  <Shield className="w-4 h-4 mx-auto mb-1 text-muted-foreground" />
                  <div className="text-xs text-muted-foreground">Offer End</div>
                  <div className="font-semibold text-sm">{courseData.course.offerEnd}</div>
                </CardContent>
              </Card>
              <Card className="text-center p-3 hover:shadow-md transition-shadow border-border/50">
                <CardContent className="p-0">
                  <Users className="w-4 h-4 mx-auto mb-1 text-muted-foreground" />
                  <div className="text-xs text-muted-foreground">Language</div>
                  <div className="font-semibold text-sm">{courseData.course.language}</div>
                </CardContent>
              </Card>
              <Card className="text-center p-3 hover:shadow-md transition-shadow border-border/50">
                <CardContent className="p-0">
                  <Clock className="w-4 h-4 mx-auto mb-1 text-muted-foreground" />
                  <div className="text-xs text-muted-foreground">Duration</div>
                  <div className="font-semibold text-sm">{courseData.course.duration}</div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Right side - Registration Form */}
          <div className="lg:pl-8">
            <Card className="shadow-2xl border-0 bg-card/90 backdrop-blur-sm">
              <CardContent className="p-8">
                <div className="space-y-6">
                  <div className="text-center space-y-4">
                    <div className="flex items-center justify-center gap-2 mb-4">

                      <span className="text-2xl font-bold text-primary">Stutor Academy</span>
                    </div>
                    <h1 className="text-3xl font-bold text-balance">{courseData.title}</h1>
                    <p className="text-lg text-muted-foreground">{courseData.subtitle}</p>
                    <div className="flex items-center justify-center gap-2">
                      <span className="text-3xl font-bold text-foreground">{courseData.course.discountPrice}</span>
                      <span className="text-lg line-through text-muted-foreground">{courseData.course.price}</span>
                      <span className="bg-red-500 text-white px-2 py-1 rounded text-sm font-semibold">FREE!</span>
                    </div>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="name" className="text-sm font-medium">
                        Full Name
                      </Label>
                      <Input
                        id="name"
                        type="text"
                        placeholder="Enter your full name"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        required
                        className="h-12 border-border/50 focus:border-primary"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="email" className="text-sm font-medium">
                        Email Address
                      </Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="Enter your email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        required
                        className="h-12 border-border/50 focus:border-primary"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="phone" className="text-sm font-medium">
                        Phone Number
                      </Label>
                      <div className="flex gap-2">
                        <Select
                          value={formData.countryCode}
                          onValueChange={(value) => setFormData({ ...formData, countryCode: value })}
                        >
                          <SelectTrigger className="w-28 h-12 border-border/50">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            {countryCodes.map((country) => (
                              <SelectItem key={country.code} value={country.code}>
                                <span className="flex items-center gap-2">
                                  <span>{country.flag}</span>
                                  <span>{country.code}</span>
                                </span>
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <Input
                          id="phone"
                          type="tel"
                          placeholder="Enter phone number"
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          required
                          className="flex-1 h-12 border-border/50 focus:border-primary"
                        />
                      </div>
                    </div>

                    <Button
                      type="submit"
                      className="w-full h-12 cursor-pointer text-lg font-semibold bg-primary hover:bg-primary/90 text-primary-foreground"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? "Registering..." : "Register Now For Free"}
                    </Button>
                  </form>

                  <div className="flex items-center justify-center gap-6 text-sm pt-4 border-t border-border/50">
                    <div className="flex items-center gap-2">
                      <div className="flex -space-x-1">
                        <div className="w-6 h-6 bg-primary rounded-full border-2 border-white"></div>
                        <div className="w-6 h-6 bg-secondary rounded-full border-2 border-white"></div>
                        <div className="w-6 h-6 bg-accent rounded-full border-2 border-white"></div>
                      </div>
                      <span className="text-primary font-semibold">{courseData.course.students} Students</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <div className="flex">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                        ))}
                      </div>
                      <span className="text-muted-foreground">
                        {courseData.course.reviews} reviews ({courseData.course.rating} of 5)
                      </span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  )
}
