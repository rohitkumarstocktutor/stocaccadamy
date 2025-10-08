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
  const [phoneError, setPhoneError] = useState("")
  const router = useRouter();

  // Phone number validation function for Indian mobile numbers
  const validatePhoneNumber = (phone: string): string => {
    // Remove any non-digit characters
    const cleanPhone = phone.replace(/\D/g, '');
    
    // Check if empty
    if (!cleanPhone) {
      return "Phone number is required";
    }
    
    // Check if it starts with country code 91
    let phoneNumber = cleanPhone.trim();
    if (cleanPhone.startsWith('91') && cleanPhone.length === 12) {
      phoneNumber = cleanPhone.substring(2);
    }
    
    // Check length (should be 10 digits for Indian mobile)
    if (phoneNumber.length !== 10) {
      return "Phone number must be valid";
    }
    
    // Check if it starts with valid Indian mobile prefixes (6, 7, 8, 9)
    const validPrefixes = ['6', '7', '8', '9'];
    if (!validPrefixes.includes(phoneNumber[0])) {
      return "Please enter a valid Indian mobile number";
    }
    
    // Check if all digits are the same (like 1111111111)
    if (/^(\d)\1{9}$/.test(phoneNumber)) {
      return "Please enter a valid phone number";
    }
    
    return ""; // No error
  };

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search)
    const params: Record<string, string> = {}
  
    for (const [key, value] of urlParams.entries()) {
      // Decode the URL-encoded value
      const decodedValue = decodeURIComponent(value)
      
      if (key.startsWith("utm_") || 
          ["source", "medium", "campaign", "term", "content", "adsetName", "adName", "placement", "campaign.name", "adset.name", "ad.name", "adset+name", "ad+name", "adset name", "ad name", "fbclid", "gclid", "msclkid", "ttclid", "adgroup", "adgroupid", "adsetid", "campaignid", "adid", "creative", "keyword", "matchtype", "device", "network", "placement", "audience"].includes(key) ||
          key.includes("campaign") || key.includes("adset") || key.includes("placement") || key.includes("ad") || key.includes("fb") || key.includes("google") || key.includes("tiktok") || key.includes("microsoft")) {
        
        // Normalize the key
        let normalizedKey = key
        if (key === "adset+name" || key === "adset name" || key === "adsetName") {
          normalizedKey = "adset.name"
        } else if (key === "ad+name" || key === "ad name" || key === "adName") {
          normalizedKey = "ad.name"
        } else if (key === "campaign name" || key === "campaignName") {
          normalizedKey = "campaign.name"
        }
        
        params[normalizedKey] = decodedValue
      }
    }
    
    // IMPORTANT: Save params to state
    setUtmParams(params)
  }, []) // Add empty dependency array to run once on mount
  

  useEffect(() => {
    // Fetch workshop data
    const loadWorkshopData = async () => {
      try {
        const teacherName = getTeacherNameFromCourseKey(courseKey || 'vibhor')
        const data = await fetchWorkshopData(teacherName)
        setWorkshopData(data)
      } catch (error) {
        console.error('Failed to load workshop data:', error)
        setWorkshopData(null)
      }
    }

    loadWorkshopData()
  }, [courseKey])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    const phoneValidationError = validatePhoneNumber(formData.phone);
    if (phoneValidationError) {
      setPhoneError(phoneValidationError);
      return;
    }
    
    
    setIsSubmitting(true)
  
    try {
      const urlParams = new URLSearchParams(window.location.search);
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
  
      // Get workshop time from workshopData (send empty string if not available)
      const workshopTime = workshopData 
        ? formatWorkshopDateTime(workshopData.wDateTime)
        : ""
  
      // Clean phone number - remove country code if present
      const cleanPhone = formData.phone.replace(/^\+91/, '').replace(/^91/, '').trim()
      
      // Prepare data for Pabbly webhook with new format
      const webhookData = {
        submittedAt: formatDate(new Date()),
        name: formData.name,
        email: formData.email,
        phone: cleanPhone.replace(/\s+/g, ""), 
        CampeignName: courseKey || 'default',
        WorkShopTime: workshopTime,
        utm_source: urlParams.get("utm_source"),
        utm_medium: urlParams.get("utm_medium"),
        utm_campaign: urlParams.get("utm_campaign"),
        utm_adgroup: urlParams.get("utm_adgroup"),
        utm_content: urlParams.get("utm_content"),
        utm_term: urlParams.get("utm_term"),
        adsetName: urlParams.get("adset name"),
        adName: urlParams.get("ad name"),
        landingPageUrl: window.location.href,
      }
  
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
        // Reset form
        setFormData({ name: "", email: "", phone: "", countryCode: "+91" })
        setPhoneError("") // Clear phone validation error
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

                  <form id="form" onSubmit={handleSubmit} className="space-y-3">
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
                          onChange={(e) => {
                            const value = e.target.value;
                            setFormData({ ...formData, phone: value });
                            // Real-time validation
                            const error = validatePhoneNumber(value);
                            setPhoneError(error);
                          }}
                          required
                          className={`pl-12 h-10 border-border/50 focus:border-primary ${
                            phoneError ? 'border-red-500 focus:border-red-500' : ''
                          }`}
                        />
                      </div>
                      {phoneError && (
                        <p className="text-sm text-red-500 mt-1">{phoneError}</p>
                      )}
                    </div>

                    <Button
                      type="submit"
                      data-meta-pixel-track="Lead"
                      className="w-full h-12 text-base font-bold bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary text-primary-foreground transition-all duration-300"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? "Registering..." : "Submit"}
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
