import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Wrench, Recycle, Heart } from "lucide-react"

export function HeroSection() {
  return (
    <section id="accueil" className="py-20 px-4">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            Réparez plutôt que de
            <span className="text-repair-green"> jeter</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto">
            RepAIr vous accompagne dans la réparation de vos objets du quotidien grâce à l'intelligence artificielle.
            Ensemble, luttons contre le gaspillage !
          </p>
          <Button
            size="default"
            className="bg-repair-blue hover:bg-repair-blue/90 text-white px-4 py-2 text-sm sm:px-5 sm:py-2.5 sm:text-base md:px-6 md:py-3 md:text-lg"
          >
            Commencer ma réparation RepAIr
          </Button>

        </div>

        <div className="grid md:grid-cols-3 gap-8">
          <Card className="border-repair-green/20 hover:border-repair-green/40 transition-colors">
            <CardContent className="p-6 text-center">
              <div className="w-12 h-12 bg-repair-green/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Wrench className="h-6 w-6 text-repair-green" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Réparation guidée</h3>
              <p className="text-gray-600">
                RepAIr analyse votre problème et vous guide étape par étape dans la réparation
              </p>
            </CardContent>
          </Card>

          <Card className="border-repair-blue/20 hover:border-repair-blue/40 transition-colors">
            <CardContent className="p-6 text-center">
              <div className="w-12 h-12 bg-repair-blue/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Recycle className="h-6 w-6 text-repair-blue" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Impact écologique</h3>
              <p className="text-gray-600">
                Chaque réparation RepAIr contribue à réduire les déchets et préserver notre planète
              </p>
            </CardContent>
          </Card>

          <Card className="border-repair-green/20 hover:border-repair-green/40 transition-colors">
            <CardContent className="p-6 text-center">
              <div className="w-12 h-12 bg-repair-green/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Heart className="h-6 w-6 text-repair-green" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Accessible à tous</h3>
              <p className="text-gray-600">
                RepAIr rend la réparation accessible, même sans compétences techniques préalables
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}
