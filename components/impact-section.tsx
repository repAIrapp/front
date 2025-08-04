import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Users, Leaf, Zap, Globe } from "lucide-react"

export function ImpactSection() {
  const impacts = [
    {
      icon: Users,
      title: "Accessibilité universelle",
      description:
        "RepAIr démocratise la réparation en la rendant accessible à tous, indépendamment du niveau technique.",
      color: "text-repair-blue",
    },
    {
      icon: Leaf,
      title: "Démarche écoresponsable",
      description:
        "Chaque objet réparé avec RepAIr évite un déchet et contribue à la préservation de notre environnement.",
      color: "text-repair-green",
    },
    {
      icon: Zap,
      title: "Architecture légère",
      description:
        "RepAIr utilise une technologie optimisée et scalable pour une expérience fluide sur tous les appareils.",
      color: "text-repair-blue",
    },
    {
      icon: Globe,
      title: "Impact global",
      description:
        "RepAIr vise à créer un mouvement mondial de réparation pour transformer nos habitudes de consommation.",
      color: "text-repair-green",
    },
  ]

  return (
    <section id="impact" className="py-20 px-4 bg-gradient-to-br from-repair-green/5 to-repair-blue/5">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            L&apos;impact de <span className="text-repair-green">RepAIr</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            RepAIr transforme notre rapport aux objets et contribue à un avenir plus durable
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {impacts.map((impact, index) => (
            <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300">
              <CardHeader>
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-sm">
                    <impact.icon className={`h-5 w-5 ${impact.color}`} />
                  </div>
                  <CardTitle className="text-xl text-gray-900">{impact.title}</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 leading-relaxed">{impact.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center">
          <div className="bg-white rounded-2xl p-8 shadow-lg max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Prêt à rejoindre la révolution <span className="text-repair-green">RepAIr</span> ?
            </h3>
            <p className="text-gray-600 mb-6">
              Commencez dès maintenant votre première réparation et découvrez comme RepAIr peut transformer votre
              quotidien.
            </p>
            <Button size="lg" className="bg-repair-green hover:bg-repair-green/90 text-white px-8 py-4 text-lg">
              Lancer RepAIr maintenant
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
