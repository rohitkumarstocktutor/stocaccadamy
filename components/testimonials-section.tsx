"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Star, ChevronLeft, ChevronRight, TrendingUp } from "lucide-react"

const testimonials = [
  {
    name: "Rahul Verma",
    role: "Software Engineer",
    image: "/professional-indian-man-headshot.jpg",
    rating: 5,
    text: "The live masterclasses completely changed my approach to trading. I went from losing money to making consistent profits within 3 months.",
    profit: "₹2.5L+ profit in 6 months",
  },
  {
    name: "Sneha Patel",
    role: "Marketing Manager",
    image: "/professional-indian-woman-headshot.png",
    rating: 5,
    text: "Amazing instructors and practical strategies. The risk management techniques alone saved me from huge losses.",
    profit: "85% success rate",
  },
  {
    name: "Arjun Singh",
    role: "Business Owner",
    image: "/professional-indian-businessman-headshot.jpg",
    rating: 5,
    text: "Best investment I made was in this education. The live sessions with real market examples are incredibly valuable.",
    profit: "₹5L+ portfolio growth",
  },
  {
    name: "Kavya Reddy",
    role: "CA Student",
    image: "/professional-young-indian-woman-headshot.jpg",
    rating: 5,
    text: "Started with zero knowledge. Now I confidently trade options and have built a solid investment portfolio.",
    profit: "300% returns in 1 year",
  },
]

interface TestimonialsSectionProps {
  courseData: any
}

export function TestimonialsSection({ courseData }: TestimonialsSectionProps) {
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [])

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length)
  }

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length)
  }

  return (
    <section className="py-24 bg-muted/10">
      <div className="container mx-auto px-4">
        <div className="text-center space-y-6 mb-20">
          <h2 className="text-4xl lg:text-5xl font-bold text-balance text-foreground">
            Success Stories from Our <span className="text-primary">Students</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto text-pretty leading-relaxed">
            Real results from real people who transformed their financial future with our proven strategies
          </p>
        </div>

        <div className="max-w-5xl mx-auto">
          <div className="relative">
            <Card className="border-border/50 bg-card/80 backdrop-blur-sm">
              <CardContent className="p-10 lg:p-16">
                <div className="grid lg:grid-cols-3 gap-10 items-center">
                  <div className="text-center lg:text-left space-y-4">
                    <img
                      src={testimonials[currentIndex].image || "/placeholder.svg"}
                      alt={testimonials[currentIndex].name}
                      className="w-24 h-24 rounded-full mx-auto lg:mx-0 border-4 border-primary/20"
                    />
                    <div>
                      <h3 className="text-2xl font-bold text-foreground">{testimonials[currentIndex].name}</h3>
                      <p className="text-muted-foreground font-medium">{testimonials[currentIndex].role}</p>
                    </div>
                    <div className="flex justify-center lg:justify-start gap-1">
                      {[...Array(testimonials[currentIndex].rating)].map((_, i) => (
                        <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                      ))}
                    </div>
                  </div>

                  <div className="lg:col-span-2 space-y-6">
                    <blockquote className="text-xl lg:text-2xl text-pretty text-foreground leading-relaxed">
                      "{testimonials[currentIndex].text}"
                    </blockquote>
                    <div className="inline-flex items-center gap-3 bg-primary/10 text-primary px-6 py-3 rounded-full text-lg font-semibold border border-primary/20">
                      <TrendingUp className="w-5 h-5" />
                      {testimonials[currentIndex].profit}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Navigation */}
            <div className="flex justify-center gap-4 mt-10">
              <Button
                variant="outline"
                size="icon"
                onClick={prevTestimonial}
                className="rounded-full bg-background/80 backdrop-blur-sm border-border/50 hover:bg-primary hover:text-primary-foreground w-12 h-12"
              >
                <ChevronLeft className="w-5 h-5" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                onClick={nextTestimonial}
                className="rounded-full bg-background/80 backdrop-blur-sm border-border/50 hover:bg-primary hover:text-primary-foreground w-12 h-12"
              >
                <ChevronRight className="w-5 h-5" />
              </Button>
            </div>

            {/* Dots indicator */}
            <div className="flex justify-center gap-3 mt-6">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === currentIndex
                      ? "bg-primary scale-125"
                      : "bg-muted-foreground/30 hover:bg-muted-foreground/50"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
