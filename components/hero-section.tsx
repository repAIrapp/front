import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Wrench, Recycle, Heart } from "lucide-react"
import Link from "next/link"

export function HeroSection() {
  return (
    <section id="accueil" className="py-20 px-4">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
           Tes objets méritent une seconde
            <span className="text-repair-green"> chance</span> 
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto">
            RepAIr vous accompagne dans la réparation de vos objets du quotidien grâce à l&apos;intelligence artificielle.
          </p>
          <Link href="/diagnostic" passHref>
            <Button
              size="default"
              className="bg-repair-blue hover:bg-repair-blue/90 text-white px-4 py-2 text-sm sm:px-5 sm:py-2.5 sm:text-base md:px-6 md:py-3 md:text-lg"
            >
              Commencer ma réparation RepAIr
            </Button>
          </Link>
        </div>
      </div>
    </section>
  )
}
