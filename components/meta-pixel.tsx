"use client"

import { useEffect } from 'react'

interface MetaPixelProps {
  pixelId: string
  courseData?: any
}

export function MetaPixel({ pixelId, courseData }: MetaPixelProps) {
  useEffect(() => {
    if (!pixelId || pixelId === 'YOUR_META_PIXEL_ID_HERE') return

    // Load Meta Pixel script
    const script = document.createElement('script')
    script.innerHTML = `
      !function(f,b,e,v,n,t,s)
      {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
      n.callMethod.apply(n,arguments):n.queue.push(arguments)};
      if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
      n.queue=[];t=b.createElement(e);t.async=!0;
      t.src=v;s=b.getElementsByTagName(e)[0];
      s.parentNode.insertBefore(t,s)}(window, document,'script',
      'https://connect.facebook.net/en_US/fbevents.js');
      fbq('init', '${pixelId}');
      fbq('track', 'PageView');
      
      // Prevent tracking on elements with data-meta-pixel-exclude
      document.addEventListener('click', function(e) {
        if (e.target && e.target.closest('[data-meta-pixel-exclude="true"]')) {
          e.stopPropagation();
        }
      }, true);
    `
    document.head.appendChild(script)

    return () => {
      // Cleanup script on unmount
      const existingScript = document.querySelector(`script[src*="fbevents.js"]`)
      if (existingScript) {
        existingScript.remove()
      }
    }
  }, [pixelId])

  return null
}

// Hook for tracking form submissions only
export function useMetaPixelTracking(pixelId: string) {
  const trackLead = (formData: any, courseData: any) => {
    if (!pixelId || pixelId === 'YOUR_META_PIXEL_ID_HERE') return

    // Only track when form is actually submitted
    if (typeof window !== 'undefined' && (window as any).fbq) {
      (window as any).fbq('track', 'Lead', {
        content_name: courseData.title,
        content_category: 'Course Registration',
        value: courseData.course.price,
        currency: 'INR',
        email: formData.email,
        phone: formData.phone
      })
      
      // Also track ViewContent when form is submitted
      (window as any).fbq('track', 'ViewContent', {
        content_name: courseData.title,
        content_category: 'Course',
        value: courseData.course.price,
        currency: 'INR'
      })
    }
  }

  const trackPurchase = (courseData: any) => {
    if (!pixelId || pixelId === 'YOUR_META_PIXEL_ID_HERE') return

    // Only track when user reaches thank you page
    if (typeof window !== 'undefined' && (window as any).fbq) {
      (window as any).fbq('track', 'Purchase', {
        content_name: courseData.title,
        content_category: 'Course',
        value: courseData.course.price,
        currency: 'INR'
      })
    }
  }

  return { trackLead, trackPurchase }
}

