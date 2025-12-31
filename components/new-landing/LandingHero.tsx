"use client"

import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { useWorkshop } from "@/contexts/workshop-context"

interface LandingHeroProps {
    courseData: any
}

export function LandingHero({ courseData }: LandingHeroProps) {
    const { openWorkshopForm } = useWorkshop()

    return (
        <section className="bg-[#e0f7f7] pt-12 pb-20 overflow-hidden">
            <div className="container mx-auto px-4 max-w-6xl text-center">
                <Badge variant="outline" className="bg-[#00bfa5] text-white border-none py-1 px-4 mb-6 rounded-md">
                    DROPSHIPPING WEBINAR
                </Badge>

                <h1 className="text-3xl md:text-5xl font-extrabold text-slate-900 mb-6 leading-tight">
                    Join Our Drop-Shipping Workshop and Discover How to Build a <br className="hidden md:block" />
                    <span className="text-[#d32f2f]">6-Figure</span> Business Effortlessly
                </h1>

                <p className="text-[#00bfa5] font-semibold text-lg md:text-xl mb-12">
                    Live Webinar On - <span className="text-slate-800 underline decoration-[#00bfa5] decoration-2 underline-offset-4">Wednesday, 17th December 2025 at 11:00 A.M.</span>
                </p>

                <div className="relative max-w-5xl mx-auto flex flex-col lg:flex-row items-center gap-8 mb-12">
                    {/* Mentor Image */}
                    <div className="relative w-full max-w-md lg:max-w-lg aspect-square">
                        <Image
                            src="/dropshiping.png"
                            alt="Mentor with laptop"
                            fill
                            className="object-contain"
                        />
                    </div>

                    {/* Info Box */}
                    <div className="w-full max-w-md bg-white rounded-xl shadow-xl p-0 overflow-hidden border border-slate-100">
                        <div className="flex items-center gap-4 p-4 border-b border-slate-50">
                            <div className="w-12 h-12 bg-slate-100 rounded-full flex items-center justify-center">
                                <Image src="/dropshiping.png" alt="Icon" width={100} height={100} className="object-contain" />
                            </div>
                            <div className="text-left font-bold text-slate-800 text-sm">
                                Total years Finding winners
                            </div>
                        </div>

                        <div className="flex items-center gap-4 p-4 border-b border-slate-50 bg-[#f9ffff]">
                            <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-slate-200">
                                <Image src="/dropshiping.png" alt="Mentor" width={48} height={48} className="object-cover" />
                            </div>
                            <div className="text-left text-sm text-slate-700 leading-snug">
                                We will build a live $100 month 30 days Business model dropshipping strategy
                            </div>
                        </div>

                        <div className="p-6 text-center">
                            <div className="text-slate-800 font-bold mb-1">17th December 2025 | 11:00 AM</div>
                            <div className="text-[#d32f2f] font-bold text-sm mb-4">Prabhu Selvaraj</div>
                            <div className="text-xs text-slate-500 italic">"The Journey Of a 1000 Miles Begins with ..."</div>
                        </div>
                    </div>
                </div>

                <div className="mb-12">
                    <p className="text-slate-600 font-medium mb-1">Masterclass starts on</p>
                    <h2 className="text-2xl md:text-3xl font-bold text-slate-900">17th December, 2025 | 11:00 AM</h2>
                </div>

                <p className="text-slate-500 mb-8 max-w-3xl mx-auto font-medium">
                    No stock, No warehouse daily profits with our simple masterclass dropshipping system
                </p>

                <Button
                    onClick={openWorkshopForm}
                    className="bg-[#f06400] hover:bg-[#d45800] text-white text-lg font-bold py-8 px-12 rounded-full shadow-lg transform transition-transform hover:scale-105 uppercase tracking-wide"
                >
                    Yes I want to save my spot now !
                </Button>
            </div>
        </section>
    )
}
