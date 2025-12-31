import { notFound } from "next/navigation"
import coursesData from "@/data/courses.json"
import { MetaPixel } from "@/components/meta-pixel"
import { WorkshopProvider } from "@/contexts/workshop-context"

// New Landing Page Components
import { TopNavigation } from "@/components/new-landing/TopNavigation"
import { LandingHero } from "@/components/new-landing/LandingHero"
import { MeetMentor } from "@/components/new-landing/MeetMentor"
import { UnleashingPotential } from "@/components/new-landing/UnleashingPotential"
import { AchievementStats } from "@/components/new-landing/AchievementStats"
import { WhatYouUncover } from "@/components/new-landing/WhatYouUncover"
import { CertificationSection } from "@/components/new-landing/CertificationSection"
import { LimitedSeatsCta } from "@/components/new-landing/LimitedSeatsCta"
import { LandingFooter } from "@/components/new-landing/LandingFooter"
import { StickyFooter } from "@/components/sticky-footer"

interface NewCoursePageProps {
    params: {
        course: string
    }
}

export default function NewCoursePage({ params }: NewCoursePageProps) {
    const courseData = coursesData.courses[params.course as keyof typeof coursesData.courses]

    if (!courseData) {
        notFound()
    }

    return (
        <WorkshopProvider>
            {/* Add pixel ID to head for Meta Pixel extension detection */}
            <script
                dangerouslySetInnerHTML={{
                    __html: `
            if (typeof fbq !== 'undefined') {
              fbq('init', '${courseData.integrations.metaPixelId}');
              fbq('track', 'PageView');
            }
          `,
                }}
            />
            <main className="min-h-screen bg-white">
                <MetaPixel pixelId={courseData.integrations.metaPixelId} courseData={courseData} />

                <TopNavigation />
                <LandingHero courseData={courseData} />
                <MeetMentor courseData={courseData} />
                <UnleashingPotential />
                <AchievementStats />
                <WhatYouUncover />
                <CertificationSection />
                <LimitedSeatsCta />
                <LandingFooter />

                {/* Existing sticky footer for lead capture across the page */}
                <StickyFooter courseData={courseData} courseKey={params.course} />
            </main>
        </WorkshopProvider>
    )
}

export async function generateStaticParams() {
    return Object.keys(coursesData.courses).map((course) => ({
        course,
    }))
}
