"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Facebook, Instagram, Youtube } from "lucide-react"

export function TopNavigation() {
    const [timeLeft, setTimeLeft] = useState(15 * 60) // 15 minutes in seconds

    useEffect(() => {
        if (timeLeft <= 0) return
        const timer = setInterval(() => {
            setTimeLeft((prev) => prev - 1)
        }, 1000)
        return () => clearInterval(timer)
    }, [timeLeft])

    const formatTime = (seconds: number) => {
        const mins = Math.floor(seconds / 60)
        const secs = seconds % 60
        return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`
    }

    return (
        <div className="bg-[#cc0000] text-white py-2 px-4 sticky top-0 z-50">
            <div className="container mx-auto flex flex-col md:flex-row items-center justify-between gap-2 max-w-6xl">
                <div className="flex items-center gap-2">
                    <span className="text-sm font-medium">Registrations Closing In:</span>
                    <span className="bg-white text-[#cc0000] px-2 py-0.5 rounded font-bold text-sm min-w-[60px] text-center">
                        {formatTime(timeLeft)}
                    </span>
                </div>

                <div className="flex items-center gap-6">
                    <Button size="sm" className="bg-[#00c853] hover:bg-[#00a846] text-white border-none font-bold rounded-full px-6">
                        Register Now
                    </Button>
                </div>
            </div>
        </div>
    )
}
