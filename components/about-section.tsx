import { Card, CardContent } from "@/components/ui/card"
import { BookOpen, Target, Zap, Shield } from "lucide-react"

interface AboutSectionProps {
  courseData: any
}

export function AboutSection({ courseData }: AboutSectionProps) {
  const features = [
    {
      icon: BookOpen,
      title: "Expert-Led Training",
      description: `Learn from ${courseData.teacher.name} with ${courseData.teacher.experience} of market experience`,
    },
    {
      icon: Target,
      title: "Proven Strategies",
      description: "Time-tested trading strategies that actually work in real markets",
    },
    {
      icon: Zap,
      title: "Live Market Analysis",
      description: "Real-time market analysis and trading opportunities during sessions",
    },
    {
      icon: Shield,
      title: "Risk Management",
      description: "Learn to protect your capital with proper risk management techniques",
    },
  ]

  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center space-y-6 mb-20">
          <h2 className="text-4xl lg:text-5xl font-bold text-balance text-foreground">
            Why Choose Our <span className="text-primary">Stock Market Education?</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto text-pretty leading-relaxed">
            We've helped thousands of students transform from beginners to confident traders through our comprehensive
            live training programs with proven results.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <Card
              key={index}
              className="border-border/50 shadow-lg hover:shadow-xl transition-all duration-300 bg-card/50 backdrop-blur-sm group"
            >
              <CardContent className="p-8 text-center space-y-6">
                <div className="flex items-center justify-center w-20 h-20 bg-primary/10 rounded-2xl mx-auto group-hover:bg-primary/20 transition-colors">
                  <feature.icon className="w-10 h-10 text-primary" />
                </div>
                <h3 className="text-xl font-bold text-foreground">{feature.title}</h3>
                <p className="text-muted-foreground text-pretty leading-relaxed">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-20 text-center">
          <h3 className="text-2xl font-bold mb-8 text-foreground">What You'll Learn:</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 max-w-4xl mx-auto">
            {courseData.features.map((feature: string, index: number) => (
              <div key={index} className="bg-primary/5 border border-primary/20 rounded-xl p-4 text-center">
                <span className="text-primary font-semibold">{feature}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
