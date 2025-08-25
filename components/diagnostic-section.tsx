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
  const [description, setDescription] = useState<string>("")
  const [imageUrl, setImageUrl] = useState<string | null>(null)
  const [imageFile, setImageFile] = useState<File | null>(null)

  // 1) l’utilisateur confirme l’image -> on stocke image + file, on reste en "capture"
  const handleImageCapture = (imgUrl: string, file: File) => {
    setImageUrl(imgUrl)
    setImageFile(file)
  }

  // 2) clic "Lancer l'analyse" -> on envoie (photo + description?) au backend
  const startAnalysis = async () => {
    if (!imageFile) {
      alert("Ajoutez d'abord une photo.")
      return
    }

    setAnalysisStep("analyzing")

    try {
      const token = localStorage.getItem("repair_token")
      const user = JSON.parse(localStorage.getItem("repair_user") || "{}")
      if (!token || !user?.id) throw new Error("Utilisateur non authentifié")

      // Créer l’objet réparé (DB service)
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

      // Prépare la requête IA
      const formData = new FormData()
      formData.append("photo", imageFile)
      formData.append("userId", user.id)
      formData.append("objectrepairedId", objectrepairedId)
      if (description.trim()) {
        formData.append("description", description.trim()) // <-- optionnel
      }

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
          description: description.trim(),
        })
      )

      setAnalysisStep("results")
    } catch (error: unknown) {
      console.error("Erreur d'analyse complète :", error)
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
    setDescription("")
    setImageUrl(null)
    setImageFile(null)
  }

  return (
    <section id="diagnostic" className="py-20 px-4 bg-gradient-to-br from-repair-blue/5 to-repair-green/5">
      <div className="container mx-auto max-w-4xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Diagnostic <span className="text-repair-green">RepAIr</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Prenez une photo de votre objet, RepAIr identifie le problème automatiquement.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 items-start">
          <div>
            <CameraCapture onImageCapture={handleImageCapture} />
          </div>

          <div className="space-y-6">
            {/* ÉTAT 1 : Capture / saisie description */}
            {analysisStep === "capture" && (
              <>
                <Card className="border-repair-green/20">
                  <CardHeader>
                    <CardTitle className="flex items-center text-repair-green">
                      <Scan className="h-5 w-5 mr-2" />
                      Prêt pour l&apos;analyse RepAIr
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 mb-4">
                      Ajoutez une <span className="font-medium">description (optionnel)</span> pour aider l’IA :
                    </p>

                    <div className="space-y-2">
                      <textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder="Ex : Chauffe-eau 200L, voyant rouge clignote, eau tiède seulement."
                        className="w-full min-h-[120px] rounded-md border border-gray-300 p-3 text-sm focus:outline-none focus:ring-2 focus:ring-repair-green"
                        aria-label="Description de la panne (optionnel)"
                      />
                      <div className="text-xs text-gray-500">
                        Ce champ est optionnel. Plus vous donnez de détails, plus le diagnostic est précis.
                      </div>
                    </div>

                    <div className="mt-4 flex items-center gap-3">
                      <Button
                       type="button"   
                        onClick={startAnalysis}
                        disabled={!imageFile}
                        className="bg-repair-blue hover:bg-repair-blue/90 text-white"
                      >
                        <Zap className="h-4 w-4 mr-2" />
                        Lancer l&apos;analyse
                      </Button>
                      {!imageFile && (
                        <Badge variant="secondary" className="bg-gray-100 text-gray-600">
                          Ajoutez d&apos;abord une photo
                        </Badge>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </>
            )}

            {/* ÉTAT 2 : Analyse en cours */}
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
                    L&apos;IA prend en compte <span className="font-medium">la photo</span>
                    {description.trim() ? " et votre description" : ""} pour fournir un diagnostic et des vidéos pertinentes.
                  </p>
                </CardContent>
              </Card>
            )}

            {/* ÉTAT 3 : Résultats */}
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
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 w-full">
                      <Button
                       type="button"   
                        onClick={resetDiagnostic}
                        variant="outline"
                        className="w-full border-gray-300 bg-transparent"
                      >
                        Analyser un autre objet
                      </Button>

                      <Link
                        href="/ia-results"
                        className="w-full inline-flex items-center justify-center gap-2 rounded-md px-4 py-2 font-medium text-white bg-repair-blue hover:bg-repair-blue/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-repair-blue"
                        aria-label="Voir les résultats détaillés"
                      >
                        <svg className="h-4 w-4" aria-hidden="true" viewBox="0 0 24 24" stroke="currentColor" fill="none">
                          <path d="M13 2v8h8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                          <path d="M13 10L21 2" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                        <span>Voir les résultats détaillés</span>
                      </Link>
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
