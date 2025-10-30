"use client"

import Link from "next/link";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { MetaPixel } from "@/components/meta-pixel";
import { useWorkshop } from "@/contexts/workshop-context";

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
  const [countdown, setCountdown] = useState(10);
  const [hasClickedButton, setHasClickedButton] = useState(false);

  const { workshopData, isLoading, error, fetchWorkshopDataForCourse } = useWorkshop();

  useEffect(() => {
    const timer = setTimeout(() => setShowConfetti(false), 3500);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (courseKey && !workshopData) {
      fetchWorkshopDataForCourse(courseKey);
    }
  }, [courseKey, workshopData, fetchWorkshopDataForCourse]);

  useEffect(() => {
    if (hasClickedButton || !workshopData?.wAurl) return;

    const countdownTimer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          window.open(workshopData.wAurl, '_blank');
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(countdownTimer);
  }, [hasClickedButton, workshopData?.wAurl]);

  const handleWhatsAppClick = async (e?: React.MouseEvent) => {
    if (e) {
      e.stopPropagation();
    }
    
    setHasClickedButton(true);
    if (workshopData?.wAurl) {
      window.open(workshopData.wAurl, '_blank');
      return;
    }

    const fetched = await fetchWorkshopDataForCourse(courseKey);
    if (fetched?.wAurl) {
      window.open(fetched.wAurl, '_blank');
      return;
    }

    // No static fallback. Optionally notify user.
    console.warn('WhatsApp URL not available for this course.');
  };

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
    <div 
      className="min-h-screen w-full relative overflow-hidden flex flex-col items-center px-4 py-4 bg-teal-500 cursor-pointer"
      onClick={handleWhatsAppClick}
    >
      <MetaPixel pixelId={courseData.integrations.metaPixelId} courseData={courseData} />

      {/* Confetti animation */}
      {showConfetti && (
        <Confetti
          width={typeof window !== "undefined" ? window.innerWidth : 1200}
          height={typeof window !== "undefined" ? window.innerHeight : 800}
          numberOfPieces={250}
          recycle={false}
        />
      )}

      {/* Main content container - Clean and clear */}
      <div className="z-10 flex flex-col items-center w-full max-w-2xl mx-auto flex-1 justify-center space-y-6 px-4">
        {/* Simple header */}
        <div className="text-center space-y-3">
          <h1 className="text-4xl md:text-5xl font-black text-white tracking-tight">
            Congrats! You're In! 🎉
          </h1>
          <p className="text-lg md:text-xl text-white font-medium">
            You have successfully reserved your seat for the Masterclass.
          </p>
        </div>
        
        {/* WhatsApp Group Card */}
        <div className="w-full bg-white rounded-2xl p-6 shadow-lg border-t-4 border-yellow-400">
            <button 
              onClick={(e) => handleWhatsAppClick(e)}
              className="w-full bg-green-500 hover:bg-green-600 active:bg-green-700 text-white font-bold py-4 px-6 rounded-xl flex items-center justify-center gap-3 text-lg transition-all duration-200 touch-manipulation select-none"
            >
              <img
                src="/whatsapp.jpg" 
                alt="WhatsApp" 
                className="w-6 h-6 rounded-full object-cover"
              />
              {hasClickedButton ? "Opening WhatsApp..." : "Join WhatsApp Group"}
            </button>
        </div>

        <div className="text-center space-y-2">
          <p className="text-white text-sm">
            Click on the button above to join the WhatsApp group.
          </p>
          <p className="text-white text-lg font-bold">
            Do Not Forget to Join WhatsApp Group Before Jumping into the Masterclass
          </p>
        </div>
      </div>
    </div>
  );
}
