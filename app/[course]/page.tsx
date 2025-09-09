import { HeroSection } from "@/components/hero-section"
import { AboutSection } from "@/components/about-section"
import { TestimonialsSection } from "@/components/testimonials-section"
import { CtaSection } from "@/components/cta-section"
import { AboutTeacherSection } from "@/components/about-teacher-section"
import { StickyFooter } from "@/components/sticky-footer"
import { notFound } from "next/navigation"
import coursesData from "@/data/courses.json"
import { Bot } from "lucide-react"
import { BottomSection } from "@/components/bottom-section"
import { MetaPixel } from "@/components/meta-pixel"

interface CoursePageProps {
  params: {
    course: string
  }
}

export default function CoursePage({ params }: CoursePageProps) {
  const courseData = coursesData.courses[params.course as keyof typeof coursesData.courses]

  if (!courseData) {
    notFound()
  }

  return (
    <main className="min-h-screen">
      <MetaPixel pixelId={courseData.integrations.metaPixelId} courseData={courseData} />
      <HeroSection courseData={courseData} courseKey={params.course} />
      <AboutSection courseData={courseData} />
      <AboutTeacherSection courseData={courseData} />
      <TestimonialsSection courseData={courseData} />
      <CtaSection courseData={courseData} />
      <BottomSection />
      <StickyFooter courseData={courseData} />
    </main>
  )
}

export async function generateStaticParams() {
  return Object.keys(coursesData.courses).map((course) => ({
    course,
  }))
}
