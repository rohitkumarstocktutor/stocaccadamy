"use client"

import { Button } from "@/components/ui/button"
import { Clock, Zap } from "lucide-react"

interface StickyFooterProps {
  courseData: any
}

export function StickyFooter({ courseData }: StickyFooterProps) {
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-primary text-primary-foreground shadow-2xl z-50 border-t-2 border-secondary/30">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-3">
              <div className="text-4xl font-bold text-primary-foreground">{courseData.course.discountPrice}</div>
              <div className="flex flex-col">
                <span className="text-lg line-through text-primary-foreground/80">{courseData.course.price}</span>
                <span className="bg-red-500 text-white px-2 py-1 rounded text-xs font-bold">FREE!</span>
              </div>
            </div>
            <div className="flex items-center gap-2 text-sm text-primary-foreground/90">
              <Clock className="w-4 h-4" />
              <span className="text-primary-foreground/90">Offer ends: {courseData.course.offerEnd}</span>
            </div>
          </div>
          <Button
            size="lg"
            className="bg-background cursor-pointer text-primary hover:bg-background/90 font-bold px-8 py-3 shadow-lg border-2 border-background/20"
            onClick={() => {
              document.querySelector("form")?.scrollIntoView({ behavior: "smooth" })
            }}
          >
            Register Now For Free
          </Button>
        </div>
      </div>
    </div>
  )
}
