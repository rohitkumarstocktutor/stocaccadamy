"use client"

import { useEffect } from 'react'

interface MetaPixelProps {
  pixelId: string
  courseData?: any
}

export function MetaPixel({ pixelId, courseData }: MetaPixelProps) {
  useEffect(() => {
    if (!pixelId || pixelId === 'YOUR_META_PIXEL_ID_HERE') return

    // Check if ad blocker is blocking the script
    const checkAdBlocker = () => {
      return new Promise((resolve) => {
        const script = document.createElement('script')
        script.src = 'https://connect.facebook.net/en_US/fbevents.js'
        script.onload = () => resolve(true)
        script.onerror = () => resolve(false)
        document.head.appendChild(script)
        
        // Clean up test script
        setTimeout(() => {
          if (script.parentNode) {
            script.parentNode.removeChild(script)
          }
        }, 1000)
      })
    }

    const loadMetaPixel = async () => {
      try {
        const canLoad = await checkAdBlocker()
        
        if (canLoad) {
          // Load Meta Pixel script normally
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
          `
          document.head.appendChild(script)
          console.log('Meta Pixel loaded successfully')
        } else {
          console.warn('Meta Pixel blocked by ad blocker or network issue')
          // Set a flag to indicate Meta Pixel is not available
          ;(window as any).metaPixelBlocked = true
        }
      } catch (error) {
        console.warn('Meta Pixel loading failed:', error)
        ;(window as any).metaPixelBlocked = true
      }
    }

    loadMetaPixel()

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
    if (typeof window !== 'undefined') {
      try {
        // Check if Meta Pixel was blocked by ad blocker
        if ((window as any).metaPixelBlocked) {
          console.warn('Meta Pixel blocked by ad blocker - skipping tracking')
          return
        }

        // Check if fbq is available and is a function
        if ((window as any).fbq && typeof (window as any).fbq === 'function') {
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
          console.log('Meta Pixel Lead event tracked successfully')
        } else {
          console.warn('Meta Pixel fbq function not available yet')
        }
      } catch (error) {
        console.error('Error tracking Meta Pixel Lead event:', error)
      }
    }
  }

  const trackPurchase = (courseData: any) => {
    if (!pixelId || pixelId === 'YOUR_META_PIXEL_ID_HERE') return

    // Only track when user reaches thank you page
    if (typeof window !== 'undefined') {
      try {
        // Check if Meta Pixel was blocked by ad blocker
        if ((window as any).metaPixelBlocked) {
          console.warn('Meta Pixel blocked by ad blocker - skipping tracking')
          return
        }

        // Check if fbq is available and is a function
        if ((window as any).fbq && typeof (window as any).fbq === 'function') {
          (window as any).fbq('track', 'Purchase', {
            content_name: courseData.title,
            content_category: 'Course',
            value: courseData.course.price,
            currency: 'INR'
          })
          console.log('Meta Pixel Purchase event tracked successfully')
        } else {
          console.warn('Meta Pixel fbq function not available yet')
        }
      } catch (error) {
        console.error('Error tracking Meta Pixel Purchase event:', error)
      }
    }
  }

  return { trackLead, trackPurchase }
}

