"use client"

import Link from "next/link";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { MetaPixel, useMetaPixelTracking } from "@/components/meta-pixel";
import { fetchWorkshopData, formatWorkshopDateTime, getTeacherNameFromCourseKey, WorkshopData } from "@/lib/workshop-service";

// Declare gtag function for TypeScript
declare global {
  interface Window {
    gtag: (...args: any[]) => void;
  }
}

const Confetti = dynamic(() => import("react-confetti"), { ssr: false });

interface ThankYouClientProps {
  courseData: any;
  courseKey: string;
}

export default function ThankYouClient({ courseData, courseKey }: ThankYouClientProps) {
  const [showConfetti, setShowConfetti] = useState(true);
  const [workshopData, setWorkshopData] = useState<WorkshopData | null>(null);
  const [isLoadingWorkshop, setIsLoadingWorkshop] = useState(true);
  // Meta Pixel tracking removed - only using for PageView

  useEffect(() => {
    const timer = setTimeout(() => setShowConfetti(false), 3500);
    return () => clearTimeout(timer);
  }, []);

  // Google Analytics conversion tracking for Vibhor course
  useEffect(() => {
    if (courseKey === 'vibhor' && typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'conversion', {'send_to': 'AW-16491466128/P-ebCJeD454bEJCb37c9'});
    }
  }, [courseKey]);


  useEffect(() => {
    // Fetch workshop data
    const loadWorkshopData = async () => {
      try {
        const teacherName = getTeacherNameFromCourseKey(courseKey);
        const data = await fetchWorkshopData(teacherName);
        setWorkshopData(data);
      } catch (error) {
        console.error('Failed to load workshop data:', error);
      } finally {
        setIsLoadingWorkshop(false);
      }
    };

    loadWorkshopData();
  }, [courseKey]);

  // Course-specific colors and content
  const getCourseTheme = (courseKey: string) => {
    switch (courseKey) {
      case 'vibhor':
        return {
          bgGradient: 'from-blue-50 via-purple-50 to-indigo-50',
          darkBgGradient: 'dark:from-zinc-900 dark:via-zinc-800 dark:to-zinc-900',
          primaryColor: '#3B82F6',
          secondaryColor: '#8B5CF6',
          buttonColor: 'bg-blue-500 hover:bg-blue-600',
          borderColor: 'border-blue-400 dark:border-blue-700',
          textColor: 'text-blue-700 dark:text-blue-300',
          textColorDark: 'text-blue-800 dark:text-blue-200',
          bgGradientCTA: 'from-blue-200 via-purple-100 to-indigo-200',
          darkBgGradientCTA: 'dark:from-blue-900 dark:via-purple-800 dark:to-indigo-900',
          communityName: 'Algorithmic Trading Community',
          groupName: 'Algo Trading Group',
          contactEmail: 'vibhor@example.com',
          teacherName: 'Vibhor'
        };
      case 'ayushi':
        return {
          bgGradient: 'from-green-50 via-emerald-50 to-teal-50',
          darkBgGradient: 'dark:from-zinc-900 dark:via-zinc-800 dark:to-zinc-900',
          primaryColor: '#10B981',
          secondaryColor: '#14B8A6',
          buttonColor: 'bg-green-500 hover:bg-green-600',
          borderColor: 'border-green-400 dark:border-green-700',
          textColor: 'text-green-700 dark:text-green-300',
          textColorDark: 'text-green-800 dark:text-green-200',
          bgGradientCTA: 'from-green-200 via-emerald-100 to-teal-200',
          darkBgGradientCTA: 'dark:from-green-900 dark:via-emerald-800 dark:to-teal-900',
          communityName: 'Forex Trading Community',
          groupName: 'Forex Trading Group',
          contactEmail: 'ayushi@example.com',
          teacherName: 'Ayushi'
        };
      case 'crypto-skills':
        return {
          bgGradient: 'from-orange-50 via-amber-50 to-yellow-50',
          darkBgGradient: 'dark:from-zinc-900 dark:via-zinc-800 dark:to-zinc-900',
          primaryColor: '#F59E0B',
          secondaryColor: '#EAB308',
          buttonColor: 'bg-orange-500 hover:bg-orange-600',
          borderColor: 'border-orange-400 dark:border-orange-700',
          textColor: 'text-orange-700 dark:text-orange-300',
          textColorDark: 'text-orange-800 dark:text-orange-200',
          bgGradientCTA: 'from-orange-200 via-amber-100 to-yellow-200',
          darkBgGradientCTA: 'dark:from-orange-900 dark:via-amber-800 dark:to-yellow-900',
          communityName: 'Crypto Trading Community',
          groupName: 'Crypto Trading Group',
          contactEmail: 'priya@example.com',
          teacherName: 'Priya'
        };
      case 'funded-accounts':
        return {
          bgGradient: 'from-purple-50 via-violet-50 to-fuchsia-50',
          darkBgGradient: 'dark:from-zinc-900 dark:via-zinc-800 dark:to-zinc-900',
          primaryColor: '#8B5CF6',
          secondaryColor: '#A855F7',
          buttonColor: 'bg-purple-500 hover:bg-purple-600',
          borderColor: 'border-purple-400 dark:border-purple-700',
          textColor: 'text-purple-700 dark:text-purple-300',
          textColorDark: 'text-purple-800 dark:text-purple-200',
          bgGradientCTA: 'from-purple-200 via-violet-100 to-fuchsia-200',
          darkBgGradientCTA: 'dark:from-purple-900 dark:via-violet-800 dark:to-fuchsia-900',
          communityName: 'Funded Trading Community',
          groupName: 'Funded Trading Group',
          contactEmail: 'rajesh@example.com',
          teacherName: 'Rajesh'
        };
      default:
        return {
          bgGradient: 'from-green-50 via-blue-50 to-yellow-50',
          darkBgGradient: 'dark:from-zinc-900 dark:via-zinc-800 dark:to-zinc-900',
          primaryColor: '#22C55E',
          secondaryColor: '#2563EB',
          buttonColor: 'bg-green-500 hover:bg-green-600',
          borderColor: 'border-green-400 dark:border-green-700',
          textColor: 'text-green-700 dark:text-green-300',
          textColorDark: 'text-green-800 dark:text-green-200',
          bgGradientCTA: 'from-green-200 via-green-100 to-green-200',
          darkBgGradientCTA: 'dark:from-green-900 dark:via-green-800 dark:to-green-900',
          communityName: 'Trading Community',
          groupName: 'Trading Group',
          contactEmail: 'support@example.com',
          teacherName: 'Expert'
        };
    }
  };

  const theme = getCourseTheme(courseKey);

  return (
    <div className={`min-h-screen w-full relative overflow-hidden flex flex-col items-center px-4 py-4 bg-gradient-to-br ${theme.bgGradient} ${theme.darkBgGradient}`}>
      <MetaPixel pixelId={courseData.integrations.metaPixelId} courseData={courseData} />
      {/* Decorative background shapes */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <svg className="absolute top-0 left-0 w-1/2 h-1/2 opacity-20" viewBox="0 0 400 400" fill="none">
          <circle cx="200" cy="200" r="200" fill={theme.primaryColor} />
        </svg>
        <svg className="absolute bottom-0 right-0 w-1/3 h-1/3 opacity-10" viewBox="0 0 300 300" fill="none">
          <circle cx="150" cy="150" r="150" fill={theme.secondaryColor} />
        </svg>
      </div>

      {/* Confetti animation */}
      {showConfetti && (
        <Confetti
          width={typeof window !== "undefined" ? window.innerWidth : 1200}
          height={typeof window !== "undefined" ? window.innerHeight : 800}
          numberOfPieces={250}
          recycle={false}
        />
      )}

      {/* Main content container - Optimized for viewport */}
      <div className="z-10 flex flex-col items-center w-full max-w-4xl mx-auto flex-1 justify-center space-y-4">
        {/* Compact header section */}
        <div className="text-center space-y-3">
          {/* Animated checkmark */}
          <div className="mb-4">
            <svg width="60" height="60" viewBox="0 0 56 56" fill="none" className="animate-bounce mx-auto">
              <circle cx="28" cy="28" r="28" fill={theme.primaryColor} />
              <path d="M18 29.5L25 36.5L38 23.5" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-primary tracking-tight">Thank You!</h1>
          <p className="text-lg md:text-xl lg:text-2xl text-muted-foreground font-medium">Welcome to {courseData.title}!</p>
          <p className="text-sm md:text-base lg:text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">You&apos;ve successfully enrolled in {theme.teacherName}&apos;s {courseData.title} course. Get ready to {courseData.subtitle.toLowerCase()}!</p>
        </div>
        
        {/* Course-specific CTA - Prominently positioned and optimized */}
        <div className={`w-full max-w-2xl flex flex-col items-center justify-center py-6 bg-gradient-to-r ${theme.bgGradientCTA} ${theme.darkBgGradientCTA} border-2 ${theme.borderColor} rounded-3xl relative shadow-lg`}>
          <div className="absolute -top-4 left-1/2 -translate-x-1/2">
            <svg xmlns="http://www.w3.org/2000/svg" fill={theme.primaryColor} viewBox="0 0 48 48" width="40" height="40">
              <circle cx="24" cy="24" r="24" fill={theme.primaryColor} />
              <path d="M24 8C15.16 8 8 15.16 8 24s7.16 16 16 16 16-7.16 16-16S32.84 8 24 8zm-2 24l-6-6 1.41-1.41L22 28.17l8.59-8.59L32 21l-10 11z" fill="#fff" />
            </svg>
          </div>
          <div className="flex flex-col items-center gap-3 mt-4 px-4">
            <span className={`text-xl md:text-2xl lg:text-3xl font-bold ${theme.textColor} text-center`}>Join {theme.communityName}</span>
            <p className={`text-sm md:text-base lg:text-lg ${theme.textColorDark} text-center max-w-2xl leading-relaxed`}>Connect with fellow traders, share insights, and get exclusive updates from {theme.teacherName}. Click below to join our community!</p>
            <Link 
              href={workshopData?.wAurl || "https://chat.whatsapp.com/your-group-link"} 
              target="_blank" 
              rel="noopener noreferrer"
            >
              <button className={`${theme.buttonColor} transition-all duration-200 text-white font-extrabold py-3 px-8 md:py-4 md:px-12 rounded-full flex items-center gap-3 text-lg md:text-xl lg:text-xl tracking-wide shadow-lg hover:shadow-xl transform hover:scale-105`}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5 md:w-6 md:h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 17.487A9.001 9.001 0 1 1 21 12c0 1.657-.45 3.214-1.238 4.55l1.13 4.13a1 1 0 0 1-1.25 1.25l-4.13-1.13z" />
                </svg>
                {isLoadingWorkshop ? "Loading..." : `Join ${theme.groupName}`}
              </button>
            </Link>
          </div>
        </div>

        {/* Workshop Date/Time Information - Compact version */}
        {workshopData && (
          <div className={`w-full max-w-2xl p-3 rounded-xl border-2 ${theme.borderColor} bg-gradient-to-r ${theme.bgGradientCTA} ${theme.darkBgGradientCTA}`}>
            <div className="text-center">
              <h3 className={`text-base md:text-lg font-bold ${theme.textColorDark} mb-1`}>Workshop Details</h3>
              <p className={`text-xs md:text-sm ${theme.textColor} mb-1`}>
                <strong>Date & Time:</strong> {formatWorkshopDateTime(workshopData.wDateTime)}
              </p>
              <p className={`text-xs md:text-sm ${theme.textColor} mb-1`}>
                <strong>Day:</strong> {workshopData.wDay}
              </p>
              <p className={`text-xs md:text-sm ${theme.textColor}`}>
                <strong>Workshop:</strong> {workshopData.name}
              </p>
            </div>
          </div>
        )}
        
        {isLoadingWorkshop && (
          <div className="w-full max-w-2xl p-3 rounded-xl border-2 border-gray-300 bg-gray-100 dark:bg-gray-800">
            <div className="text-center">
              <p className="text-xs md:text-sm text-gray-600 dark:text-gray-400">Loading workshop details...</p>
            </div>
          </div>
        )}

        <p className="text-xs md:text-sm lg:text-base text-muted-foreground text-center max-w-2xl">If you have any questions, feel free to <Link href={`mailto:${theme.contactEmail}`} className="underline text-primary font-semibold">contact {theme.teacherName}</Link>.</p>
      </div>
    </div>
  );
}
