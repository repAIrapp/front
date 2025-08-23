"use client"

import { useState } from "react"
import { CameraCapture } from "./camera-capture"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Scan, Brain, Zap } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export function DiagnosticSection() {
  const [analysisStep, setAnalysisStep] = useState<"capture" | "analyzing" | "results">("capture")

  const handleImageCapture = async (imageUrl: string, file: File) => {
    setAnalysisStep("analyzing")

    try {
      const token = localStorage.getItem("repair_token")
      const user = JSON.parse(localStorage.getItem("repair_user") || "{}")
       if (!token) {
      throw new Error("Token manquant (utilisateur non connecté)")
    }

      if (!token || !user?.id) {
        throw new Error("Utilisateur non authentifié")
      }

      const objectRes = await fetch("http://localhost:3001/api/objects", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          objectname: "Objet analysé",
          userId: user.id,
          status: "in_progress",
        }),
      })

      if (!objectRes.ok) throw new Error("Erreur création objet réparé")
      const createdObject = await objectRes.json()
      const objectrepairedId = createdObject._id

      const formData = new FormData()
      formData.append("photo", file)
      formData.append("userId", user.id)
      formData.append("objectrepairedId", objectrepairedId)
//       for (const pair of formData.entries()) {
//   console.log(`FormData => ${pair[0]}: ${pair[1]}`);
// }


      const response = await fetch("http://localhost:3002/analyze/full", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      })

      if (!response.ok) throw new Error("Échec de l'analyse")

      const data = await response.json()
      localStorage.setItem(
        "repair_last_analysis",
        JSON.stringify({
          ...data,
          imageUrl,
        })
      )

      setAnalysisStep("results")
} catch (error: unknown) {
  console.error("Erreur d'analyse complète :", error)

  if (error instanceof Response) {
    const errorData = await error.json()
    console.error("Réponse backend :", errorData)
  }

  if (error instanceof Error) {
    alert("Erreur lors de l'analyse IA : " + error.message)
  } else {
    alert("Erreur lors de l'analyse IA")
  }

  setAnalysisStep("capture")
}

  }

  const resetDiagnostic = () => {
    setAnalysisStep("capture")
  }

  return (
    <section id="diagnostic" className="py-20 px-4 bg-gradient-to-br from-repair-blue/5 to-repair-green/5">
      <div className="container mx-auto max-w-4xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Diagnostic <span className="text-repair-green">RepAIr</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Photographiez votre objet défaillant et laissez RepAIr identifier le problème grâce à l&apos;intelligence
            artificielle
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 items-start">
          <div>
            <CameraCapture onImageCapture={handleImageCapture} />
          </div>

          <div className="space-y-6">
            {analysisStep === "capture" && (
              <Card className="border-repair-green/20">
                <CardHeader>
                  <CardTitle className="flex items-center text-repair-green">
                    <Scan className="h-5 w-5 mr-2" />
                    Prêt pour l&apos;analyse RepAIr
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-4">
                    Prenez une photo claire de votre objet défaillant. RepAIr analysera automatiquement l&apos;image pour :
                  </p>
                  <ul className="space-y-2 text-sm text-gray-600">
                    <li className="flex items-center">
                      <div className="w-2 h-2 bg-repair-green rounded-full mr-3"></div>
                      Identifier le type d&apos;objet
                    </li>
                    <li className="flex items-center">
                      <div className="w-2 h-2 bg-repair-green rounded-full mr-3"></div>
                      Détecter les signes de panne
                    </li>
                    <li className="flex items-center">
                      <div className="w-2 h-2 bg-repair-green rounded-full mr-3"></div>
                      Proposer un diagnostic précis
                    </li>
                  </ul>
                </CardContent>
              </Card>
            )}

            {analysisStep === "analyzing" && (
              <Card className="border-repair-blue/20">
                <CardHeader>
                  <CardTitle className="flex items-center text-repair-blue">
                    <Brain className="h-5 w-5 mr-2 animate-pulse" />
                    RepAIr analyse votre image...
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center space-x-2 mb-4">
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-repair-blue h-2 rounded-full animate-pulse" style={{ width: "75%" }}></div>
                    </div>
                    <Badge variant="secondary" className="bg-repair-blue/10 text-repair-blue">
                      IA en cours
                    </Badge>
                  </div>
                  <p className="text-gray-600 text-sm">
                    L&apos;intelligence artificielle RepAIr examine votre image pour identifier le problème et vous proposer
                    les meilleures solutions de réparation.
                  </p>
                </CardContent>
              </Card>
            )}

            {analysisStep === "results" && (
              <Card className="border-repair-green/20">
                <CardHeader>
                  <CardTitle className="flex items-center text-repair-green">
                    <Zap className="h-5 w-5 mr-2" />
                    Diagnostic RepAIr terminé !
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4 text-center">
                    <p className="text-gray-700">
                      L’analyse est terminée ! Cliquez ci-dessous pour voir les résultats détaillés.
                    </p>
                    {/* <div className="flex gap-3 justify-center">
                      <Button onClick={resetDiagnostic} variant="outline" className="border-gray-300 bg-transparent">
                        Analyser un autre objet
                      </Button>
                      <Button asChild className="bg-repair-blue hover:bg-repair-blue/90 text-white">
                        <Link href="/ia-results">
                          <Zap className="h-4 w-4 mr-2" />
                          Voir les résultats détaillés
                        </Link>
                      </Button>
                    </div> */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 w-full">
  <Button
    onClick={resetDiagnostic}
    variant="outline"
    className="w-full border-gray-300 bg-transparent"
  >
    Analyser un autre objet
  </Button>

  <Button asChild className="w-full bg-repair-blue hover:bg-repair-blue/90 text-white">
    <Link href="/ia-results" aria-label="Voir les résultats">
      <Zap className="h-4 w-4 mr-2" aria-hidden="true" />
      <span>Voir les résultats</span>
    </Link>
  </Button>
</div>

                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
