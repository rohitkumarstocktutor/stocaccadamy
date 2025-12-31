"use client"

import Link from "next/link"

export function LandingFooter() {
    const currentYear = new Date().getFullYear()

    return (
        <footer className="bg-[#001a1a] text-white py-12">
            <div className="container mx-auto px-4 max-w-6xl text-center space-y-8">
                <p className="text-sm opacity-60">
                    Copyright © {currentYear} • Stoc Academy <br />
                    All rights reserved
                </p>

                <div className="flex flex-wrap justify-center gap-4">
                    <Link href="/privacy-policy" className="bg-white/10 hover:bg-white/20 transition-colors px-6 py-2 rounded-full text-xs font-bold whitespace-nowrap">
                        Privacy Policy
                    </Link>
                    <Link href="/terms-and-conditions" className="bg-white/10 hover:bg-white/20 transition-colors px-6 py-2 rounded-full text-xs font-bold whitespace-nowrap">
                        Term & Condition
                    </Link>
                    <Link href="/about-us" className="bg-white/10 hover:bg-white/20 transition-colors px-6 py-2 rounded-full text-xs font-bold whitespace-nowrap">
                        About Us
                    </Link>
                </div>
            </div>
        </footer>
    )
}
