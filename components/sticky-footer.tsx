"use client"

import { Clock, Zap } from "lucide-react"
import { formatWorkshopDateTime } from "@/lib/workshop-service"
import { useWorkshop } from "@/contexts/workshop-context"

interface StickyFooterProps {
  courseData: any
  courseKey?: string
}

export function StickyFooter({ courseData, courseKey }: StickyFooterProps) {
  const { workshopData, isLoading: isLoadingWorkshop } = useWorkshop();

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-gradient-to-r from-primary via-primary to-primary/95 text-primary-foreground z-50 border-t-2 border-secondary/30 backdrop-blur-md">
      <div className="container mx-auto px-4 py-4 md:py-4">
        {/* Mobile Layout */}
        <div className="block md:hidden">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <div className="text-2xl font-bold text-primary-foreground">{courseData.course.discountPrice}</div>
              <div className="flex flex-col">
                <span className="text-sm line-through text-primary-foreground/80">{courseData.course.price}</span>
                <span className="bg-red-500 text-white px-2 py-0.5 rounded text-xs font-bold">FREE!</span>
              </div>
            </div>
            <div className="flex items-center gap-1 text-xs text-primary-foreground/90">
              <Clock className="w-3 h-3" />
              <span className="text-primary-foreground/90">
                Ends: {isLoadingWorkshop 
                  ? "Loading..." 
                  : workshopData 
                    ? formatWorkshopDateTime(workshopData.wDateTime)
                    : courseData.course.offerEnd || "Limited Time"
                }
              </span>
            </div>
          </div>

        </div>

        {/* Desktop Layout */}
        <div className="hidden md:flex items-center justify-between">
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
              <span className="text-primary-foreground/90">
                Offer: {isLoadingWorkshop 
                  ? "Loading..." 
                  : workshopData 
                    ? formatWorkshopDateTime(workshopData.wDateTime)
                    : "Limited Time"
                }
              </span>
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}
