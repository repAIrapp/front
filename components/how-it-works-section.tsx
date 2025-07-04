import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Camera, Brain, PlayCircle, CheckCircle } from "lucide-react"

export function HowItWorksSection() {
  const steps = [
    {
      icon: Camera,
      title: "Identifiez le problème",
      description:
        "Prenez une photo de votre objet défaillant. RepAIr analyse l'image grâce à l'IA pour identifier la panne.",
      badge: "IA & Vision",
    },
    {
      icon: Brain,
      title: "Recevez un diagnostic",
      description: "RepAIr établit un diagnostic précis et vous propose les solutions de réparation les plus adaptées.",
      badge: "Diagnostic IA",
    },
    {
      icon: PlayCircle,
      title: "Suivez le guide",
      description: "Accédez à des vidéos tutoriels et guides textuels personnalisés par RepAIr pour votre réparation.",
      badge: "Guidage",
    },
    {
      icon: CheckCircle,
      title: "Suivez vos progrès",
      description: "RepAIr suit l'avancement de votre réparation et vous accompagne jusqu'à la réussite complète.",
      badge: "Suivi",
    },
  ]

  return (
    <section id="comment-ca-marche" className="py-20 px-4 bg-white">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Comment fonctionne <span className="text-repair-green">RepAIr</span> ?
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            RepAIr simplifie la réparation en 4 étapes simples, guidées par l'intelligence artificielle
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <Card
              key={index}
              className="relative border-2 border-gray-100 hover:border-repair-green/30 transition-all duration-300"
            >
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 bg-repair-green/10 rounded-full flex items-center justify-center">
                    <step.icon className="h-6 w-6 text-repair-green" />
                  </div>
                  <Badge variant="secondary" className="bg-repair-blue/10 text-repair-blue border-repair-blue/20">
                    {step.badge}
                  </Badge>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">{step.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{step.description}</p>
                <div className="absolute -top-3 -left-3 w-8 h-8 bg-repair-blue rounded-full flex items-center justify-center text-white font-bold text-sm">
                  {index + 1}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
