"use client"

import Image from "next/image"
import { CheckCircle2 } from "lucide-react"

export function UnleashingPotential() {
    const points = [
        "No Stock Required - Sell items without keeping them in stock",
        "Global Market Access - Sell to anyone, anywhere in the world",
        "Profitability Mastery - Scale your business with proven systems",
        "Winning Ad Strategies - Learn to run ads that actually convert",
        "Business Automation - Run your store on autopilot",
        "Financial Freedom - Build a business that gives you time"
    ]

    return (
        <section className="py-20 bg-slate-50">
            <div className="container mx-auto px-4 max-w-6xl">
                <h2 className="text-3xl md:text-4xl font-bold text-center text-slate-900 mb-4 leading-tight">
                    Unleashing Potential: How This Program Propelled <br />
                    10,000+ Professional Excellence
                </h2>
                <p className="text-center text-slate-500 mb-16 font-medium">
                    How Our Dropshipping System helped 10,000+ People Achieve financial independence
                </p>

                <div className="flex flex-col lg:flex-row items-center gap-12">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-10 flex-1">
                        {points.map((point, index) => (
                            <div key={index} className="flex gap-4 group">
                                <div className="mt-1">
                                    <div className="bg-[#00bfa5] rounded-full p-1 group-hover:scale-110 transition-transform">
                                        <CheckCircle2 className="w-4 h-4 text-white" />
                                    </div>
                                </div>
                                <p className="text-slate-700 font-medium leading-snug">
                                    {point}
                                </p>
                            </div>
                        ))}
                    </div>

                    <div className="relative w-full max-w-md aspect-square lg:aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl">
                        <Image
                            src="/dropshiping.png"
                            alt="Success Story"
                            fill
                            className="object-cover"
                        />
                    </div>
                </div>
            </div>
        </section>
    )
}
