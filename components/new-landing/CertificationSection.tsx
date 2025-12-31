"use client"

import Image from "next/image"

export function CertificationSection() {
    return (
        <section className="py-20 bg-slate-50 overflow-hidden">
            <div className="container mx-auto px-4 max-w-6xl">
                <div className="text-center mb-16 space-y-4">
                    <h2 className="text-3xl md:text-5xl font-black text-slate-900 leading-tight">
                        Earn Your Dropshipping <br /> Certification
                    </h2>
                    <p className="text-slate-500 font-medium max-w-3xl mx-auto">
                        Join 10,000+ top level academy making a career and financial freedom through drop shipping.
                    </p>
                </div>

                <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-24">
                    <div className="relative w-full max-w-2xl aspect-[4/3] rounded-xl overflow-hidden shadow-2xl border-8 border-white">
                        <Image
                            src="/dropshipping-certificate.png"
                            alt="Dropshipping Certification"
                            fill
                            className="object-cover"
                        />
                    </div>

                    <div className="flex-1 space-y-8 text-slate-700">
                        <div className="space-y-4">
                            <p className="font-semibold text-lg leading-relaxed">
                                Become a part of elite network of dropshipping professional in our exclusive dropshipping program
                            </p>
                            <p className="opacity-80 leading-relaxed font-medium">
                                He also offers certificates show from our registered training and after you master the profitable system our experts can contribute and success through training.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
