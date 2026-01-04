import Link from "next/link";
import { notFound } from "next/navigation";
import coursesData from "@/data/courses.json";
import { Metadata } from "next";
import ThankYouClient from "./thank-you-client";
import Script from "next/script";
interface ThankYouPageProps {
  params: {
    course: string
  }
}

export async function generateMetadata({ params }: ThankYouPageProps): Promise<Metadata> {
  const courseData = coursesData.courses[params.course as keyof typeof coursesData.courses]

  if (!courseData) {
    return {
      title: "Thank You - Course Not Found",
      description: "The requested course could not be found."
    }
  }

  const thankYouTitle = `Thank You! - ${courseData.metaTitle || courseData.title}`

  return {
    title: thankYouTitle,
    description: `Thank you for registering for ${courseData.title}! You've successfully enrolled in ${courseData.teacher.name}'s ${courseData.subtitle} course.`,
    keywords: `thank you, ${courseData.title}, ${courseData.subtitle}, trading, stock market, course registration`,
    openGraph: {
      title: thankYouTitle,
      description: `Thank you for registering for ${courseData.title}! You've successfully enrolled in ${courseData.teacher.name}'s course.`,
      images: [courseData.coverImage],
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: thankYouTitle,
      description: `Thank you for registering for ${courseData.title}! You've successfully enrolled in ${courseData.teacher.name}'s course.`,
      images: [courseData.coverImage],
    },
  }
}

export default function ThankYouPage({ params }: ThankYouPageProps) {
  const courseData = coursesData.courses[params.course as keyof typeof coursesData.courses];

  if (!courseData) {
    notFound();
  }
  return (
    <>
      {/* Google conversion snippet */}
      {params.course === "drop-shipping" && (
        <Script id="google-conversion" strategy="afterInteractive">
          {`
            gtag('event', 'conversion', {'send_to': 'AW-16491466128/bod1CMa159sbEJCb37c9'});
          `}
        </Script>
      )}
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
      <ThankYouClient courseData={courseData} courseKey={params.course} />
    </>
  );
}
