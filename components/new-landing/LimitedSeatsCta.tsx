"use client"

import { Button } from "@/components/ui/button"
import { useWorkshop } from "@/contexts/workshop-context"
import { ChevronRight } from "lucide-react"

export function LimitedSeatsCta() {
    const { openWorkshopForm } = useWorkshop()

    return (
        <section className="py-24 bg-[#00bfa5] text-white overflow-hidden">
            <div className="container mx-auto px-4 max-w-4xl text-center space-y-10">
                <h2 className="text-3xl md:text-5xl font-black leading-tight">
                    We are Limited to 200 Webinar Attendees.
                </h2>

                <p className="text-xl md:text-2xl font-medium opacity-90 max-w-2xl mx-auto">
                    Once the Seats become full Registration will Close
                </p>

                <Button
                    onClick={openWorkshopForm}
                    className="bg-white text-[#00bfa5] hover:bg-slate-100 text-lg md:text-xl font-black py-8 px-12 rounded-full shadow-[0_20px_50px_rgba(0,0,0,0.15)] flex items-center gap-2 mx-auto transition-all hover:scale-105 uppercase tracking-widest"
                >
                    Yes I want to save my spot now <ChevronRight className="w-6 h-6" />
                </Button>
            </div>
        </section>
    )
}
