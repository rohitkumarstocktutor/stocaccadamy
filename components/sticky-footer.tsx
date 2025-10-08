"use client"

import { Clock, Zap } from "lucide-react"
import { formatWorkshopDateTime, fetchWorkshopData, getTeacherNameFromCourseKey, WorkshopData } from "@/lib/workshop-service"
import { useEffect, useState } from "react"

interface StickyFooterProps {
  courseData: any
  courseKey?: string
}

export function StickyFooter({ courseData, courseKey }: StickyFooterProps) {
  const [workshopData, setWorkshopData] = useState<WorkshopData | null>(null);
  const [isLoadingWorkshop, setIsLoadingWorkshop] = useState(true);

  useEffect(() => {
    // Fetch workshop data
    const loadWorkshopData = async () => {
      try {
        if (courseKey) {
          console.log('Loading workshop data for courseKey:', courseKey);
          const teacherName = getTeacherNameFromCourseKey(courseKey);
          console.log('Teacher name:', teacherName);
          const data = await fetchWorkshopData(teacherName);
          console.log('Workshop data received:', data);
          setWorkshopData(data);
        } else {
          console.log('No courseKey provided to StickyFooter');
        }
      } catch (error) {
        console.error('Failed to load workshop data:', error);
      } finally {
        setIsLoadingWorkshop(false);
      }
    };

    loadWorkshopData();
  }, [courseKey]);

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
          <span
            data-meta-pixel-exclude="true"
              className="w-full text-center bg-background cursor-pointer text-primary hover:bg-background/90 font-bold py-3 rounded-md border-2 border-background/20 transition-all duration-300 text-sm"
            onClick={() => {
              document.querySelector("form")?.scrollIntoView({ behavior: "smooth" })
            }}
          >
            Grab Your Spot Now
          </span>
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
          <span
            data-meta-pixel-exclude="true"
            className="bg-background text-center cursor-pointer text-primary hover:bg-background/90 font-bold px-8 py-3 rounded-md border-2 border-background/20 transition-all duration-300 transform hover:scale-105"
            onClick={() => {
              document.querySelector("form")?.scrollIntoView({ behavior: "smooth" })
            }}
          >
            Grab Your Spot Now 
          </span>
        </div>
      </div>
    </div>
  )
}
