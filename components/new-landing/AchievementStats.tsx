"use client"

export function AchievementStats() {
    const stats = [
        { value: "1000+", label: "Happy Students Success stories" },
        { value: "50", label: "Store Build Live With Students" },
        { value: "100", label: "Winning Products Already Shared" },
        { value: "2000", label: "Sessions Conducted Till Today" }
    ]

    return (
        <section className="py-16 bg-[#00bfa5] text-white">
            <div className="container mx-auto px-4 max-w-6xl">
                <h2 className="text-3xl font-bold text-center mb-16 underline decoration-white decoration-2 underline-offset-8">
                    Our Achivements of 7 Years Experience
                </h2>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                    {stats.map((stat, index) => (
                        <div key={index} className="text-center space-y-2">
                            <div className="text-4xl md:text-5xl font-black">{stat.value}</div>
                            <div className="text-sm md:text-base font-medium opacity-90 max-w-[150px] mx-auto leading-tight">
                                {stat.label}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}
