"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent } from "@/components/ui/card"
import { Star, Shield, Users, Clock } from "lucide-react"
import Image from "next/image"
import { useMetaPixelTracking } from "@/components/meta-pixel"
import { fetchWorkshopData, formatWorkshopDateTime, getTeacherNameFromCourseKey, WorkshopData } from "@/lib/workshop-service"
import { useRouter } from 'next/navigation'

// Removed countryCodes array - now using fixed +91 for India

interface HeroSectionProps {
  courseData: any
  courseKey?: string
}

export function HeroSection({ courseData, courseKey }: HeroSectionProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    countryCode: "+91",
  })
  const [utmParams, setUtmParams] = useState<Record<string, string>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [workshopData, setWorkshopData] = useState<WorkshopData | null>(null)
  const router = useRouter();
  const { trackLead } = useMetaPixelTracking(courseData.integrations.metaPixelId);

  useEffect(() => {
    // Capture UTM parameters and ad tracking parameters from URL
    const urlParams = new URLSearchParams(window.location.search)
    const params: Record<string, string> = {}

    for (const [key, value] of urlParams.entries()) {
      // Capture UTM parameters, Facebook ad parameters, and other tracking parameters
      if (key.startsWith("utm_") || 
          ["source", "medium", "campaign", "term", "content", "adsetName", "adName", "placement", "campaign.name", "adset.name", "ad.name", "adset+name", "ad+name", "adset name", "ad name"].includes(key) ||
          key.includes("campaign") || key.includes("adset") || key.includes("placement") || key.includes("ad")) {
        
        // Handle Facebook template variables - decode them properly
        let processedValue = value
        if (value.includes("{{") && value.includes("}}")) {
          // Keep template variables as-is for now, but you might want to process them
          processedValue = value
        }
        
        // Normalize parameter names (handle + vs . vs spaces in parameter names)
        let normalizedKey = key
        if (key === "adset+name" || key === "adset name") {
          normalizedKey = "adset.name"
        } else if (key === "ad+name" || key === "ad name") {
          normalizedKey = "ad.name"
        }
        
        params[normalizedKey] = processedValue
      }
    }
    console.log("Captured UTM parameters:", params)
    setUtmParams(params)
  }, [])

  useEffect(() => {
    // Fetch workshop data
    const loadWorkshopData = async () => {
      try {
        const teacherName = getTeacherNameFromCourseKey(courseKey || 'vibhor')
        const data = await fetchWorkshopData(teacherName)
        setWorkshopData(data)
      } catch (error) {
        console.error('Failed to load workshop data:', error)
      }
    }

    loadWorkshopData()
  }, [courseKey])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      // Format date to DD/MM/YYYY HH:MM:SS AM/PM
      const formatDate = (date: Date) => {
        const day = date.getDate().toString().padStart(2, '0')
        const month = (date.getMonth() + 1).toString().padStart(2, '0')
        const year = date.getFullYear()
        const hours = date.getHours()
        const minutes = date.getMinutes().toString().padStart(2, '0')
        const seconds = date.getSeconds().toString().padStart(2, '0')
        const ampm = hours >= 12 ? 'PM' : 'AM'
        const displayHours = hours % 12 || 12
        
        return `${day}/${month}/${year} ${displayHours}:${minutes}:${seconds} ${ampm}`
      }

      // Get workshop time from workshopData (prioritize script data)
      const workshopTime = workshopData 
        ? formatWorkshopDateTime(workshopData.wDateTime)
        : courseData.course.date

      // Prepare data for Pably webhook with new format
      const webhookData = {
        submittedAt: formatDate(new Date()),
        name: formData.name,
        email: formData.email,
        phone: formData.phone, // Remove country code prefix
        CampeignName: courseKey || 'default',
        WorkShopTime: workshopTime,
        utm_source: utmParams.utm_source || null,
        utm_medium: utmParams.utm_medium || null,
        utm_campaign: utmParams.utm_campaign || null,
        utm_adgroup: utmParams.utm_adgroup || null,
        utm_content: utmParams.utm_content || null,
        utm_term: utmParams.utm_term || null,
        adsetName: utmParams.adsetName || null,
        adName: utmParams.adName || null,
        placement: utmParams.placement || null,
        "campaign.name": utmParams["campaign.name"] || null,
        "adset.name": utmParams["adset.name"] || null,
        "ad.name": utmParams["ad.name"] || null,
        landingPageUrl: typeof window !== 'undefined' ? window.location.href : null,
        // Include all other captured parameters
        ...Object.keys(utmParams).reduce((acc, key) => {
          if (!acc[key]) {
            acc[key] = utmParams[key]
          }
          return acc
        }, {} as Record<string, string>)
      }

      // Send to Pably webhook
      const response = await fetch(courseData.integrations.pablyWebhookUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(webhookData),
      })

      // Check if response is ok
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      // Parse response to check for success
      const responseData = await response.json()
      console.log("Pabbly response:", responseData)

      // Check if Pabbly returned success
      if (responseData.status === "success" || responseData.status === "Success") {
        // Track lead with Meta Pixel (don't let this block the form submission)

        // Reset form
        setFormData({ name: "", email: "", phone: "", countryCode: "+91" })
        // Redirect to thank you page
        router.push(`/${courseKey}/thank-you`)
      } else {
        throw new Error(responseData.message || "Form submission failed")
      }
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

      <div className="relative container mx-auto px-4 pt-12 lg:pt-20 pb-0">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-start">
          {/* Left side - Cover Image (hidden on mobile, shown on desktop) */}
          <div className="hidden lg:block space-y-6 lg:pt-8">
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-primary to-secondary rounded-2xl blur opacity-25 group-hover:opacity-40 transition duration-1000"></div>
              <div className="relative">
                <Image
                  src={courseData.coverImage}
                  alt={courseData.title}
                  width={600}
                  height={400}
                  className="rounded-2xl w-full border border-border/50 object-cover"
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
              <Card className="text-center p-3 border-border/50">
                <CardContent className="p-0">
                  <Clock className="w-4 h-4 mx-auto mb-1 text-muted-foreground" />
                  <div className="text-xs text-muted-foreground">Date</div>
                  <div className="font-semibold text-sm">
                    {workshopData ? formatWorkshopDateTime(workshopData.wDateTime) : courseData.course.date}
                  </div>
                </CardContent>
              </Card>
              <Card className="text-center p-3  border-border/50">
                <CardContent className="p-0">
                  <Users className="w-4 h-4 mx-auto mb-1 text-muted-foreground" />
                  <div className="text-xs text-muted-foreground">Language</div>
                  <div className="font-semibold text-sm">{workshopData?.language || courseData.course.language}</div>
                </CardContent>
              </Card>
              <Card className="text-center p-3  border-border/50">
                <CardContent className="p-0">
                  <Clock className="w-4 h-4 mx-auto mb-1 text-muted-foreground" />
                  <div className="text-xs text-muted-foreground">Duration</div>
                  <div className="font-semibold text-sm">{workshopData?.duration || courseData.course.duration}</div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Right side - Registration Form (first on mobile, second on desktop) */}
          <div className="lg:pl-8">
            <Card className="border-0 bg-card/95 backdrop-blur-md ring-1 ring-border/20">
              <CardContent className="p-6 lg:p-8">
                <div className="space-y-4">
                  <div className="text-center space-y-3">
                    <div className="flex items-center justify-center gap-2 mb-2">
                      <span className="text-xl font-bold text-primary">Stutor Academy</span>
                    </div>
                    <h1 className="text-2xl lg:text-3xl font-bold text-balance">{courseData.title}</h1>
                    <p className="text-base lg:text-lg text-muted-foreground">{courseData.subtitle}</p>
                    <div className="flex items-center justify-center gap-2">
                      <span className="text-2xl font-bold text-foreground">{courseData.course.discountPrice}</span>
                      <span className="text-base line-through text-muted-foreground">{courseData.course.price}</span>
                      <span className="bg-red-500 text-white px-2 py-1 rounded text-sm font-semibold">FREE!</span>
                    </div>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-3">
                    <div className="space-y-1">
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
                        className="h-10 border-border/50 focus:border-primary"
                      />
                    </div>

                    <div className="space-y-1">
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
                        className="h-10 border-border/50 focus:border-primary"
                      />
                    </div>

                    <div className="space-y-1">
                      <Label htmlFor="phone" className="text-sm font-medium">
                        Phone Number
                      </Label>
                      <div className="relative">
                        <div className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground text-sm">
                          +91
                        </div>
                        <Input
                          id="phone"
                          type="tel"
                          placeholder="Enter your phone number"
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          required
                          className="pl-12 h-10 border-border/50 focus:border-primary"
                        />
                      </div>
                    </div>

                    <Button
                      type="submit"
                      className="w-full h-12 text-base font-bold bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary text-primary-foreground transition-all duration-300"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? "Registering..." : "Submit "}
                    </Button>
                  </form>

                  <div className="flex items-center justify-center gap-4 text-xs pt-3 border-t border-border/50">
                    <div className="flex items-center gap-2">
                      <div className="flex -space-x-1">
                        <div className="w-5 h-5 bg-primary rounded-full border-2 border-white"></div>
                        <div className="w-5 h-5 bg-secondary rounded-full border-2 border-white"></div>
                        <div className="w-5 h-5 bg-accent rounded-full border-2 border-white"></div>
                      </div>
                      <span className="text-primary font-semibold">{courseData.course.students} Students</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <div className="flex">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="w-3 h-3 fill-yellow-400 text-yellow-400" />
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

        {/* Mobile Cover Image Section - shown after form on mobile */}
        <div className="block lg:hidden mt-12">
          <div className="space-y-6">
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-primary to-secondary rounded-2xl blur opacity-25 group-hover:opacity-40 transition duration-1000"></div>
              <div className="relative">
                <Image
                  src={courseData.coverImage}
                  alt={courseData.title}
                  width={600}
                  height={400}
                  className="rounded-2xl w-full border border-border/50 object-cover"
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
              <Card className="text-center p-3 border-border/50">
                <CardContent className="p-0">
                  <Clock className="w-4 h-4 mx-auto mb-1 text-muted-foreground" />
                  <div className="text-xs text-muted-foreground">Date</div>
                  <div className="font-semibold text-sm">
                    {workshopData ? formatWorkshopDateTime(workshopData.wDateTime) : courseData.course.date}
                  </div>
                </CardContent>
              </Card>
              <Card className="text-center p-3  border-border/50">
                <CardContent className="p-0">
                  <Shield className="w-4 h-4 mx-auto mb-1 text-muted-foreground" />
                  <div className="text-xs text-muted-foreground">Offer End</div>
                  <div className="font-semibold text-sm">{workshopData?.offerEnd || courseData.course.offerEnd}</div>
                </CardContent>
              </Card>
              <Card className="text-center p-3  border-border/50">
                <CardContent className="p-0">
                  <Users className="w-4 h-4 mx-auto mb-1 text-muted-foreground" />
                  <div className="text-xs text-muted-foreground">Language</div>
                  <div className="font-semibold text-sm">{workshopData?.language || courseData.course.language}</div>
                </CardContent>
              </Card>
              <Card className="text-center p-3  border-border/50">
                <CardContent className="p-0">
                  <Clock className="w-4 h-4 mx-auto mb-1 text-muted-foreground" />
                  <div className="text-xs text-muted-foreground">Duration</div>
                  <div className="font-semibold text-sm">{workshopData?.duration || courseData.course.duration}</div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
