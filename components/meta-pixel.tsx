"use client"

import { useEffect } from 'react'

interface MetaPixelProps {
  pixelId: string
  courseData?: any
}

export function MetaPixel({ pixelId, courseData }: MetaPixelProps) {
  useEffect(() => {
    if (!pixelId || pixelId === 'YOUR_META_PIXEL_ID_HERE') {
      console.warn('Meta Pixel ID not configured or is placeholder')
      return
    }

    // Check if fbq is available (base script should be loaded from layout)
    const initializePixel = () => {
      if (typeof window !== 'undefined' && (window as any).fbq) {
        try {
          // Initialize pixel with autodetect events enabled
          (window as any).fbq('init', pixelId)
          console.log(`Meta Pixel initialized with ID: ${pixelId} (autodetect enabled)`)
          
          // Set a flag to indicate Meta Pixel is available
          ;(window as any).metaPixelBlocked = false
        } catch (error) {
          console.error('Error initializing Meta Pixel:', error)
          ;(window as any).metaPixelBlocked = true
        }
      } else {
        console.warn('Meta Pixel base script not loaded - fbq function not available')
        ;(window as any).metaPixelBlocked = true
      }
    }

    // Wait a bit for the base script to load, then initialize
    const timer = setTimeout(initializePixel, 100)

    return () => {
      clearTimeout(timer)
    }
  }, [pixelId])

  return null
}

// Hook for tracking form submissions only
export function useMetaPixelTracking(pixelId: string) {
  const trackLead = (formData: any, courseData: any) => {
    if (!pixelId || pixelId === 'YOUR_META_PIXEL_ID_HERE') {
      console.warn('Meta Pixel ID not configured - skipping lead tracking')
      return
    }

    // Only track when form is actually submitted
    if (typeof window !== 'undefined') {
      try {
        // Check if Meta Pixel was blocked by ad blocker
        if ((window as any).metaPixelBlocked) {
          console.warn('Meta Pixel blocked by ad blocker - skipping tracking')
          return
        }

        // Check if fbq is available and is a function
      } catch (error) {
        console.error('Error tracking Meta Pixel Lead event:', error)
      }
    }
  }

  const checkPixelStatus = () => {
    if (typeof window !== 'undefined') {
      const status = {
        pixelId: pixelId,
        fbqAvailable: !!(window as any).fbq,
        metaPixelBlocked: !!(window as any).metaPixelBlocked,
        pixelConfigured: pixelId && pixelId !== 'YOUR_META_PIXEL_ID_HERE'
      }
      console.log('Meta Pixel Status:', status)
      return status
    }
    return null
  }

  return { trackLead, checkPixelStatus }
}

// Debug component to check pixel status (only in development)
export function MetaPixelDebug({ pixelId }: { pixelId: string }) {
  if (process.env.NODE_ENV !== 'development') return null

  const checkStatus = () => {
    if (typeof window !== 'undefined') {
      const status = {
        pixelId: pixelId,
        fbqAvailable: !!(window as any).fbq,
        metaPixelBlocked: !!(window as any).metaPixelBlocked,
        pixelConfigured: pixelId && pixelId !== 'YOUR_META_PIXEL_ID_HERE',
        userAgent: navigator.userAgent,
        url: window.location.href
      }
      console.log('Meta Pixel Debug Status:', status)
      alert(`Meta Pixel Debug:\nPixel ID: ${status.pixelId}\nFBQ Available: ${status.fbqAvailable}\nBlocked: ${status.metaPixelBlocked}\nConfigured: ${status.pixelConfigured}`)
    }
  }

  return (
    <div style={{ position: 'fixed', top: '10px', right: '10px', zIndex: 9999, background: 'red', color: 'white', padding: '5px', fontSize: '12px' }}>
      <button onClick={checkStatus} style={{ background: 'white', color: 'black', border: 'none', padding: '2px 5px', cursor: 'pointer' }}>
        Debug Pixel
      </button>
    </div>
  )
}

