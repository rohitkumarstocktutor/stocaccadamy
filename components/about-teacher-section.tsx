import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Award, Users, TrendingUp, BookOpen } from "lucide-react"

interface AboutTeacherSectionProps {
  courseData: any
}

export function AboutTeacherSection({ courseData }: AboutTeacherSectionProps) {
  return (
    <section className="py-20 bg-muted/20">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Teacher Image */}
            <div className="relative">
              <div className="relative w-full max-w-md mx-auto">
                <div className="absolute -inset-1 bg-gradient-to-r from-primary to-secondary rounded-2xl blur opacity-25"></div>
                <div className="relative">
                  <Image
                    src={courseData.teacherImage || "/placeholder.svg"}
                    alt={`${courseData.teacher.name} - Stock Market Expert`}
                    width={400}
                    height={500}
                    className="rounded-2xl shadow-2xl w-full border-2 border-border/20"
                  />
                </div>
              </div>
            </div>

            {/* Teacher Info */}
            <div className="space-y-8">
              <div className="space-y-6">
                <Badge
                  variant="secondary"
                  className="bg-secondary text-secondary-foreground border-secondary/20 px-4 py-2 text-sm font-semibold"
                >
                  {courseData.teacher.certification} Expert
                </Badge>
                <h2 className="text-4xl lg:text-5xl font-bold text-balance leading-tight">
                  Led by <span className="text-primary">{courseData.teacher.name}</span>
                </h2>
                <p className="text-xl text-muted-foreground text-pretty leading-relaxed">
                  {courseData.teacher.description}
                </p>
              </div>

              {/* Achievements Grid */}
              <div className="grid grid-cols-2 gap-6">
                {courseData.teacher.achievements.map((achievement: string, index: number) => {
                  const icons = [Users, Award, TrendingUp, BookOpen]
                  const backgroundColors = ["bg-primary", "bg-secondary", "bg-accent", "bg-primary"]
                  const Icon = icons[index % icons.length]
                  const bgColor = backgroundColors[index % backgroundColors.length]

                  return (
                    <Card
                      key={index}
                      className={`p-6 hover:shadow-lg transition-all duration-300 border-0 ${bgColor} text-white`}
                    >
                      <CardContent className="p-0 text-center">
                        <div className="flex items-center justify-center w-14 h-14 bg-white/20 rounded-xl mb-4 mx-auto">
                          <Icon className="w-7 h-7 text-white" />
                        </div>
                        <div className="text-2xl font-bold text-white">{achievement.split(" ")[0]}</div>
                        <div className="text-sm text-white/90 font-medium">
                          {achievement.split(" ").slice(1).join(" ")}
                        </div>
                      </CardContent>
                    </Card>
                  )
                })}
              </div>

              {/* Specializations */}
              <div className="space-y-4">
                <h3 className="text-xl font-semibold text-foreground">Specializations:</h3>
                <div className="flex flex-wrap gap-3">
                  <Badge variant="outline" className="border-primary/30 text-primary hover:bg-primary/10 px-4 py-2">
                    AI Trading Indicators
                  </Badge>
                  <Badge
                    variant="outline"
                    className="border-secondary/30 text-secondary hover:bg-secondary/10 px-4 py-2"
                  >
                    Nifty Options
                  </Badge>
                  <Badge variant="outline" className="border-accent/30 text-accent hover:bg-accent/10 px-4 py-2">
                    Stock Options
                  </Badge>
                  <Badge variant="outline" className="border-primary/30 text-primary hover:bg-primary/10 px-4 py-2">
                    Risk Management
                  </Badge>
                  <Badge
                    variant="outline"
                    className="border-secondary/30 text-secondary hover:bg-secondary/10 px-4 py-2"
                  >
                    Technical Analysis
                  </Badge>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
