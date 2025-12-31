"use client"

import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"

export function WhatYouUncover() {
    const items = [
        {
            title: "Understanding Dropshipping",
            description: "In this webinar we pooled together some of our most efficient dropshipping strategies and what we have learned over the years to help you start your business on a solid foundation, without having to find any inventory. From there, we'll outline all the steps in actually building/launching a high-converting store and your business from the ground up.",
            image: "/placeholder-logo.png" // Using logo placeholders for icons as seen in design
        },
        {
            title: "Starting With Zero Investment",
            description: "Look, starting a new business is scary enough! Many aspire entrepreneurs want to build their successful business but are overwhelmed by starting with luxury investment, we'll talk about how you can start your own ecommerce fulfillment agency.",
            image: "/placeholder-logo.png"
        },
        {
            title: "Advanced Facebook Ad Strategies To Boost Growth",
            description: "Learn how we mastered ads in our business where other businesses are scared to hire. We will share everything to performing ad campaigns to scale your dropshipping business so that you can grow to the next level.",
            image: "/placeholder-logo.png"
        }
    ]

    return (
        <section className="py-24 bg-white">
            <div className="container mx-auto px-4 max-w-6xl">
                <div className="text-center mb-16 space-y-4">
                    <h2 className="text-4xl font-black text-slate-900">What You'll Uncover in This Masterclass</h2>
                    <p className="text-slate-500 font-medium max-w-2xl mx-auto">
                        Binary world food and beverages world in the fast world of your potential business mind
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {items.map((item, index) => (
                        <Card key={index} className="border border-slate-100 shadow-sm hover:shadow-md transition-shadow rounded-2xl overflow-hidden">
                            <CardContent className="p-8 space-y-6">
                                <div className="w-16 h-16 bg-slate-50 rounded-xl flex items-center justify-center p-3">
                                    <Image src={item.image} alt={item.title} width={40} height={40} />
                                </div>
                                <div className="space-y-4">
                                    <h3 className="text-xl font-bold text-slate-900 leading-tight">
                                        {item.title}
                                    </h3>
                                    <p className="text-slate-600 text-sm leading-relaxed">
                                        {item.description}
                                    </p>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        </section>
    )
}
