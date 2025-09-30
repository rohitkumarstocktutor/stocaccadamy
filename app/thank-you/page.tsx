"use client"



import Link from "next/link";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

const Confetti = dynamic(() => import("react-confetti"), { ssr: false });


export default function ThankYouPage() {
  const [showConfetti, setShowConfetti] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setShowConfetti(false), 3500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen w-full relative overflow-hidden flex flex-col items-center px-4 py-4 bg-gradient-to-br from-green-50 via-blue-50 to-yellow-50 dark:from-zinc-900 dark:via-zinc-800 dark:to-zinc-900">
      {/* Decorative background shapes */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <svg className="absolute top-0 left-0 w-1/2 h-1/2 opacity-20" viewBox="0 0 400 400" fill="none">
          <circle cx="200" cy="200" r="200" fill="#22C55E" />
        </svg>
        <svg className="absolute bottom-0 right-0 w-1/3 h-1/3 opacity-10" viewBox="0 0 300 300" fill="none">
          <circle cx="150" cy="150" r="150" fill="#2563EB" />
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
              <circle cx="28" cy="28" r="28" fill="#22C55E" />
              <path d="M18 29.5L25 36.5L38 23.5" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-primary tracking-tight">Thank You!</h1>
          <p className="text-lg md:text-xl text-muted-foreground font-medium">Your submission was successful.</p>
          <p className="text-sm md:text-base text-muted-foreground max-w-2xl mx-auto">We're excited to welcome you to our community. Get ready for exclusive updates and resources!</p>
        </div>

        {/* WhatsApp CTA - Prominently positioned and optimized */}
        <div className="w-full max-w-2xl flex flex-col items-center justify-center py-6 bg-gradient-to-r from-green-200 via-green-100 to-green-200 dark:from-green-900 dark:via-green-800 dark:to-green-900 border-2 border-green-400 dark:border-green-700 rounded-3xl relative shadow-lg">
          <div className="absolute -top-4 left-1/2 -translate-x-1/2">
            <svg xmlns="http://www.w3.org/2000/svg" fill="#25D366" viewBox="0 0 48 48" width="40" height="40">
              <circle cx="24" cy="24" r="24" fill="#25D366" />
              <path d="M33.75 27.75c-.6-.3-3.45-1.65-3.9-1.8-.45-.15-.75-.3-1.05.3-.3.6-1.2 1.8-1.5 2.1-.3.3-.6.3-1.2 0-.6-.3-2.55-.9-4.8-3-1.8-1.65-3-3.6-3.3-4.2-.3-.6 0-.9.3-1.2.3-.3.6-.75.9-1.05.3-.3.3-.6.45-.9.15-.3 0-.75 0-1.05 0-.3-1.05-2.55-1.5-3.45-.3-.75-.75-.75-1.05-.75h-.9c-.3 0-.75.15-1.05.45-.3.3-1.65 1.65-1.65 4.05 0 2.4 1.8 4.65 2.1 4.95.3.3 3.45 5.4 8.4 7.2 1.2.45 2.1.75 2.85.9 1.2.15 2.25.15 3.15.15.9 0 2.7-1.05 3-2.1.3-1.05.3-1.95.15-2.1-.15-.15-.6-.3-1.2-.6z" fill="#fff" />
            </svg>
          </div>
          <div className="flex flex-col items-center gap-3 mt-4 px-4">
            <span className="text-xl md:text-2xl font-bold text-green-700 dark:text-green-300 text-center">Join our WhatsApp Group</span>
            <p className="text-sm md:text-base text-green-800 dark:text-green-200 text-center max-w-lg">Get instant updates, connect with fellow learners, and never miss an announcement. Click below to join now!</p>
            <Link href="https://chat.whatsapp.com/your-group-link" target="_blank" rel="noopener noreferrer">
              <button className="bg-green-500 hover:bg-green-600 transition-all duration-200 text-white font-extrabold py-3 px-8 rounded-full flex items-center gap-3 text-lg md:text-xl tracking-wide shadow-lg hover:shadow-xl transform hover:scale-105">
                <img 
                  src="/whatsapp.jpg" 
                  alt="WhatsApp" 
                  className="w-5 h-5 md:w-6 md:h-6 rounded-full object-cover"
                />
                Join WhatsApp Group
              </button>
            </Link>
          </div>
        </div>

        <p className="text-xs md:text-sm text-muted-foreground text-center">If you have any questions, feel free to <Link href="mailto:support@example.com" className="underline text-primary font-semibold">contact us</Link>.</p>
      </div>
    </div>
  );
}
