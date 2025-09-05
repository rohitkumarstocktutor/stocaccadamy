"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Calendar, Clock, Users, Star } from "lucide-react"

interface Course {
  id: string
  title: string
  instructor: string
  date: string
  time: string
  duration: string
  level: string
  rating: number
  students: number
  topics: string[]
}

export function MasterclassSection() {
  const [courses, setCourses] = useState<Course[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Fetch course data from Google Sheets API
    const fetchCourses = async () => {
      try {
        const response = await fetch(
          "https://script.google.com/macros/s/AKfycby-TiE4gLk4bUC-mSYaT_lDwyOU1T6JTMNw2pIeYQ59qJ2Mk0x9jk_6x47QR5ASCcdasQ/exec?q=courses",
          {
            headers: {
              accept: "*/*",
              "accept-language": "en-GB,en;q=0.5",
              origin: window.location.origin,
              referer: window.location.origin + "/",
            },
          },
        )

        if (response.ok) {
          const data = await response.json()
          setCourses(data.courses || [])
        }
      } catch (error) {
        console.error("Error fetching courses:", error)
        // Fallback data
        setCourses([
          {
            id: "1",
            title: "Technical Analysis Masterclass",
            instructor: "Rajesh Kumar",
            date: "2024-01-15",
            time: "7:00 PM IST",
            duration: "2 hours",
            level: "Intermediate",
            rating: 4.8,
            students: 1250,
            topics: ["Chart Patterns", "Indicators", "Support & Resistance"],
          },
          {
            id: "2",
            title: "Options Trading Strategies",
            instructor: "Priya Sharma",
            date: "2024-01-16",
            time: "8:00 PM IST",
            duration: "2.5 hours",
            level: "Advanced",
            rating: 4.9,
            students: 890,
            topics: ["Options Greeks", "Strategies", "Risk Management"],
          },
          {
            id: "3",
            title: "Fundamental Analysis Deep Dive",
            instructor: "Amit Patel",
            date: "2024-01-17",
            time: "6:30 PM IST",
            duration: "2 hours",
            level: "Beginner",
            rating: 4.7,
            students: 1580,
            topics: ["Financial Statements", "Ratios", "Valuation"],
          },
        ])
      } finally {
        setLoading(false)
      }
    }

    fetchCourses()
  }, [])

  if (loading) {
    return (
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-accent mx-auto"></div>
            <p className="mt-4 text-muted-foreground">Loading upcoming masterclasses...</p>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-balance">Upcoming Live Masterclasses</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto text-pretty">
            Join our expert-led sessions and learn from the best in the industry
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {courses.map((course) => (
            <Card key={course.id} className="border-0 transition-all hover:-translate-y-1">
              <CardContent className="p-6 space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Badge variant="secondary" className="text-xs">
                      {course.level}
                    </Badge>
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      <span className="text-sm font-medium">{course.rating}</span>
                    </div>
                  </div>
                  <h3 className="text-xl font-bold text-balance">{course.title}</h3>
                  <p className="text-muted-foreground">by {course.instructor}</p>
                </div>

                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-accent" />
                    <span>{new Date(course.date).toLocaleDateString("en-IN")}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-accent" />
                    <span>
                      {course.time} • {course.duration}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Users className="w-4 h-4 text-accent" />
                    <span>{course.students.toLocaleString()} students enrolled</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <p className="text-sm font-medium">What you'll learn:</p>
                  <div className="flex flex-wrap gap-1">
                    {course.topics.map((topic, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {topic}
                      </Badge>
                    ))}
                  </div>
                </div>

                <Button className="w-full bg-transparent" variant="outline">
                  Reserve Your Spot
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
