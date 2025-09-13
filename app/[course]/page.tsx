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
import { Metadata } from "next"

interface CoursePageProps {
  params: {
    course: string
  }
}

export async function generateMetadata({ params }: CoursePageProps): Promise<Metadata> {
  const courseData = coursesData.courses[params.course as keyof typeof coursesData.courses]
  
  if (!courseData) {
    return {
      title: "Course Not Found",
      description: "The requested course could not be found."
    }
  }

  return {
    title: courseData.metaTitle || courseData.title,
    description: `${courseData.subtitle} - ${courseData.teacher.name} with ${courseData.teacher.experience} experience. Join ${courseData.course.students} students in this free masterclass.`,
    keywords: `${courseData.title}, ${courseData.subtitle}, trading, stock market, free course, ${courseData.teacher.name}`,
    openGraph: {
      title: courseData.metaTitle || courseData.title,
      description: `${courseData.subtitle} - ${courseData.teacher.name} with ${courseData.teacher.experience} experience.`,
      images: [courseData.coverImage],
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: courseData.metaTitle || courseData.title,
      description: `${courseData.subtitle} - ${courseData.teacher.name} with ${courseData.teacher.experience} experience.`,
      images: [courseData.coverImage],
    },
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
      <CtaSection courseData={courseData} courseKey={params.course} />
      <BottomSection />
      <StickyFooter courseData={courseData} courseKey={params.course} />
    </main>
  )
}

export async function generateStaticParams() {
  return Object.keys(coursesData.courses).map((course) => ({
    course,
  }))
}
