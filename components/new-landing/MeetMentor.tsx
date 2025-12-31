"use client"

import Image from "next/image"

interface MeetMentorProps {
    courseData: any
}

export function MeetMentor({ courseData }: MeetMentorProps) {
    const teacher = courseData.teacher

    return (
        <section className="py-20 bg-white">
            <div className="container mx-auto px-4 max-w-6xl">
                <div className="flex items-center justify-center gap-4 mb-16 opacity-30">
                    <div className="h-[2px] w-20 bg-[#00bfa5]"></div>
                    <h2 className="text-3xl md:text-4xl font-bold text-[#00bfa5] uppercase tracking-widest px-4">
                        Meet Your Mentor
                    </h2>
                    <div className="h-[2px] w-20 bg-[#00bfa5]"></div>
                </div>

                <div className="flex flex-col md:flex-row items-center gap-12 lg:gap-20">
                    <div className="relative w-full max-w-sm aspect-[3/4] rounded-2xl overflow-hidden shadow-2xl">
                        <Image
                            src="/dropshiping.png"
                            alt={teacher.name}
                            fill
                            className="object-cover"
                        />
                    </div>

                    <div className="flex-1 space-y-6 text-slate-800">
                        <div>
                            <h3 className="text-3xl font-bold mb-1">{teacher.name}</h3>
                            <p className="text-[#00bfa5] font-semibold">Experience In Drop-shipping Industry</p>
                        </div>

                        <div className="space-y-4 text-slate-600 leading-relaxed text-lg">
                            <p>
                                I'm dedicated to helping aspiring entrepreneurs build their own
                                7 years of experience in the dropshipping industry and coaching
                                I've helped over 1000+ students, my proven system will help you
                                strategies to launch your own store.
                            </p>
                            <p>
                                My dedication in drop-shipping industry has allowed me to
                                test and develop strategies. My coaching program helped 100s
                                of students around the globe to build and grow their businesses.
                                I'll guide and share with you some of the best tips and
                                strategies to build your success.
                            </p>
                            <p>
                                I have helped many people in building their own
                                businesses, providing tips and strategies to help them achieve
                                more and reach their goals.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
