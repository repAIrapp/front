"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import {
  Brain,
  Lightbulb,
  Play,
  ArrowLeft,
  Camera,
  CheckCircle,
  ExternalLink,
  Sparkles,
  Wrench,
} from "lucide-react"

interface IAResultData {
  imageUrl: string
  objet_detecte: string
  analyse: string
  solution: string
  videos?: {
    thumbnail: string
    title: string
    url: string
  }[]
}

/** Parse un bloc d’analyse */
function parseAnalysis(input: string) {
  const sections: Record<string, string> = {}
  const rx =
    /\[(OBJET|PROBLEME|PROBLÈME|REPARATION|RÉPARATION|OUTILS)\]\s*([\s\S]*?)(?=\n\[[^\]]+\]|$)/gi
  let m: RegExpExecArray | null
  while ((m = rx.exec(input)) !== null) {
    const key = m[1].normalize("NFD").replace(/[\u0300]/g, "").toUpperCase()
    sections[key] = m[2].trim()
  }

  const steps = (sections.REPARATION || "")
    .split(/\n+/)
    .map((s) => s.replace(/^\d+\.?\s*|^[-•]\s*/, "").trim())
    .filter(Boolean)

  const tools = (sections.OUTILS || "")
    .split(/[,;•]+|\n+/)
    .map((s) => s.trim())
    .filter(Boolean)

  return {
    objet: sections.OBJET,
    probleme: sections.PROBLEME || sections["PROBLÈME"],
    steps,
    tools,
    hasAny:
      Boolean(
        sections.OBJET ||
          sections.PROBLEME ||
          sections["PROBLÈME"] ||
          sections.REPARATION ||
          sections["RÉPARATION"] ||
          sections.OUTILS,
      ),
  }
}

function toList(text: string) {
  return text
    .split(/\n+/)
    .map((l) => l.replace(/^\d+\.?\s*|^[-•]\s*/, "").trim())
    .filter(Boolean)
}

/* styles des labels (pills) */
const labelGreen =
  "inline-flex items-center gap-2 px-2 py-1 rounded-md bg-emerald-100/80 text-emerald-800 text-xs font-semibold uppercase tracking-wide"
const labelRose =
  "inline-flex items-center gap-2 px-2 py-1 rounded-md bg-rose-100/80 text-rose-800 text-xs font-semibold uppercase tracking-wide"

export function IAResultsPage() {
  const [imageError, setImageError] = useState(false)
  const [data, setData] = useState<IAResultData | null>(null)

  useEffect(() => {
    const last = localStorage.getItem("repair_last_analysis")
    if (last) {
      try {
        setData(JSON.parse(last))
      } catch {
        setData(null)
      }
    }
  }, [])

  if (!data) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-700 text-lg">
        Aucun résultat IA trouvé. Veuillez effectuer un diagnostic d’abord.
      </div>
    )
  }

  const { imageUrl, objet_detecte, analyse, solution, videos = [] } = data
  const parsedAnalyse = parseAnalysis(analyse)
  const parsedSolution = parseAnalysis(solution)
  const fallbackSolutionList = toList(solution)

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-indigo-50">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-white/80 backdrop-blur-sm border-b border-purple-100">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Button variant="ghost" size="icon" asChild className="hover:bg-purple-100">
                <Link href="/" aria-label="Retour à l’accueil">
                  <ArrowLeft className="h-5 w-5" aria-hidden="true" />
                </Link>
              </Button>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Résultats IA RepAIr</h1>
                <p className="text-sm text-gray-600">Diagnostic terminé avec succès</p>
              </div>
            </div>
            <Badge className="bg-green-100 text-green-700 border-green-200">
              <Sparkles className="h-3 w-3 mr-1" aria-hidden="true" />
              Analyse complète
            </Badge>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 max-w-4xl space-y-8">
        {/* Image + objet détecté */}
        <Card className="border-0 shadow-lg bg-gradient-to-br from-blue-50 to-cyan-50">
          <CardHeader className="text-center pb-4">
            <h2 className="flex items-center justify-center gap-2 text-xl text-gray-800">
              <Camera className="h-5 w-5 text-blue-500" aria-hidden="true" />
              Objet analysé
            </h2>
          </CardHeader>
          <CardContent className="flex flex-col items-center space-y-4">
            <div className="relative">
              <div className="w-64 h-64 rounded-2xl overflow-hidden shadow-xl bg-white p-2">
                <Image
                  src={imageError ? "/placeholder.svg" : imageUrl}
                  alt={
                    objet_detecte
                      ? `Photo de l’objet analysé : ${objet_detecte}`
                      : "Objet analysé par RepAIr"
                  }
                  width={300}
                  height={300}
                  className="w-full h-full object-cover rounded-xl"
                  onError={() => setImageError(true)}
                />
              </div>
              <div className="absolute -bottom-2 -right-2 bg-blue-500 text-white p-2 rounded-full shadow-lg">
                <CheckCircle className="h-4 w-4" aria-hidden="true" />
              </div>
            </div>
            <div className="text-center">
              <h3 className="text-lg font-semibold text-gray-800">{objet_detecte}</h3>
              <Badge variant="secondary" className="mt-1 bg-blue-100 text-blue-700">
                Confiance&nbsp;: estimation IA
              </Badge>
            </div>
          </CardContent>
        </Card>

        {/* Diagnostic IA */}
        <Card className="border-0 shadow-lg bg-gradient-to-br from-green-50 to-emerald-50">
          <CardHeader>
            <h2 className="flex items-center gap-2 text-xl text-gray-800">
              <span className="p-2 bg-green-100 rounded-full">
                <Brain className="h-5 w-5 text-green-600" aria-hidden="true" />
              </span>
              Diagnostic IA RepAIr
            </h2>
          </CardHeader>

          <CardContent className="space-y-5">
            <div className="bg-white/70 p-4 rounded-xl border border-green-100 space-y-5">
              {parsedAnalyse.hasAny ? (
                <>
                  {parsedAnalyse.objet && (
                    <section aria-labelledby="ia-objet" className="space-y-1">
                      <h3 id="ia-objet" className={labelGreen}>
                        Objet
                      </h3>
                      <p className="text-gray-800">{parsedAnalyse.objet}</p>
                    </section>
                  )}

                  {parsedAnalyse.probleme && (
                    <section aria-labelledby="ia-probleme" className="space-y-1">
                      <h3 id="ia-probleme" className={labelGreen}>
                        Problème
                      </h3>
                      <p className="text-gray-800">{parsedAnalyse.probleme}</p>
                    </section>
                  )}

                  {parsedAnalyse.steps.length > 0 && (
                    <section aria-labelledby="ia-steps" className="space-y-2">
                      <h3 id="ia-steps" className={labelGreen}>
                        <Wrench className="h-3 w-3" aria-hidden="true" />
                        Réparation
                      </h3>
                      <ol className="list-decimal pl-5 space-y-1 text-gray-800">
                        {parsedAnalyse.steps.map((s, i) => (
                          <li key={i}>{s}</li>
                        ))}
                      </ol>
                    </section>
                  )}

                  {parsedAnalyse.tools.length > 0 && (
                    <section aria-labelledby="ia-tools" className="space-y-2">
                      <h3 id="ia-tools" className={labelGreen}>
                        <Wrench className="h-3 w-3" aria-hidden="true" />
                        Outils
                      </h3>
                      <div className="flex flex-wrap gap-2 mt-1">
                        {parsedAnalyse.tools.map((t) => (
                          <Badge
                            key={t}
                            variant="secondary"
                            className="bg-emerald-100 text-emerald-800"
                          >
                            {t}
                          </Badge>
                        ))}
                      </div>
                    </section>
                  )}
                </>
              ) : (
                <p className="text-gray-700 leading-relaxed whitespace-pre-line break-words">
                  {analyse}
                </p>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Solution proposée */}
        <Card className="border-0 shadow-lg bg-gradient-to-br from-rose-50 to-pink-50">
          <CardHeader>
            <h2 className="flex items-center gap-2 text-xl text-gray-800">
              <span className="p-2 bg-rose-100 rounded-full">
                <Lightbulb className="h-5 w-5 text-rose-600" aria-hidden="true" />
              </span>
              Solution RepAIr
            </h2>
          </CardHeader>

          <CardContent>
            <div className="bg-white/70 p-6 rounded-xl border border-rose-100 space-y-5">
              {parsedSolution.hasAny ? (
                <>
                  {parsedSolution.steps.length > 0 ? (
                    <section aria-labelledby="sol-steps" className="space-y-2">
                      <h3 id="sol-steps" className={labelRose}>
                        Étapes proposées
                      </h3>
                      <ol className="list-decimal pl-5 space-y-1 text-gray-800 text-lg">
                        {parsedSolution.steps.map((s, i) => (
                          <li key={i}>{s}</li>
                        ))}
                      </ol>
                    </section>
                  ) : (parsedSolution.objet || parsedSolution.probleme) ? (
                    <section className="space-y-2">
                      <h3 className={labelRose}>Détails</h3>
                      <p className="text-gray-700 leading-relaxed text-lg whitespace-pre-line break-words">
                        {solution}
                      </p>
                    </section>
                  ) : null}

                  {parsedSolution.tools.length > 0 && (
                    <section aria-labelledby="sol-tools" className="space-y-2">
                      <h3 id="sol-tools" className={labelRose}>
                        <Wrench className="h-3 w-3" aria-hidden="true" />
                        Outils recommandés
                      </h3>
                      <div className="flex flex-wrap gap-2 mt-1">
                        {parsedSolution.tools.map((t) => (
                          <Badge
                            key={t}
                            variant="secondary"
                            className="bg-rose-100 text-rose-800"
                          >
                            {t}
                          </Badge>
                        ))}
                      </div>
                    </section>
                  )}
                </>
              ) : fallbackSolutionList.length > 1 ? (
                <section className="space-y-2">
                  <h3 className={labelRose}>Étapes proposées</h3>
                  <ol className="list-decimal pl-5 space-y-1 text-gray-800 text-lg">
                    {fallbackSolutionList.map((s, i) => (
                      <li key={i}>{s}</li>
                    ))}
                  </ol>
                </section>
              ) : (
                <p className="text-gray-700 leading-relaxed text-lg whitespace-pre-line break-words">
                  {solution}
                </p>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Tutoriels vidéo */}
        {videos.length > 0 && (
          <Card className="border-0 shadow-lg bg-gradient-to-br from-purple-50 to-violet-50">
            <CardHeader>
              <h2 className="flex items-center gap-2 text-xl text-gray-800">
                <span className="p-2 bg-purple-100 rounded-full">
                  <Play className="h-5 w-5 text-purple-600" aria-hidden="true" />
                </span>
                Tutoriels vidéo RepAIr
              </h2>
            </CardHeader>
            <CardContent className="space-y-4">
              {videos.map((video, index) => (
                <div
                  key={index}
                  className="bg-white/70 p-4 rounded-xl border border-purple-100 hover:shadow-md transition-shadow"
                >
                  <div className="flex items-center gap-4">
                    <div className="relative flex-shrink-0">
                      <Image
                        src={video.thumbnail}
                        alt={video.title}
                        width={120}
                        height={80}
                        className="w-20 h-14 object-cover rounded-lg"
                      />
                      <div className="absolute inset-0 flex items-center justify-center bg-black/20 rounded-lg">
                        <div className="bg-white/90 p-1 rounded-full">
                          <Play className="h-3 w-3 text-purple-600" aria-hidden="true" />
                        </div>
                      </div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-medium text-gray-800 truncate">{video.title}</h3>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      asChild
                      className="flex-shrink-0 hover:bg-purple-100"
                    >
                      <a
                        href={video.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`Ouvrir la vidéo "${video.title}" dans un nouvel onglet`}
                      >
                        <ExternalLink className="h-4 w-4" aria-hidden="true" />
                      </a>
                    </Button>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        )}

        <Separator className="my-8" />

        {/* CTA */}
        <div className="text-center space-y-4">
          <div className="bg-white/60 p-6 rounded-2xl border border-gray-100">
            <h2 className="text-lg font-semibold text-gray-800 mb-2">
              Prêt pour un nouveau diagnostic&nbsp;?
            </h2>
            <p className="text-gray-600 mb-4">
              RepAIr peut analyser d&apos;autres objets et vous proposer des solutions personnalisées
            </p>
            <Button
              size="lg"
              className="bg-gradient-to-r from-repair-green to-repair-blue hover:from-repair-green/90 hover:to-repair-blue/90 text-white px-8 py-3 text-lg shadow-lg"
              asChild
            >
              <Link href="/#diagnostic" aria-label="Lancer un nouveau diagnostic RepAIr">
                <Camera className="h-5 w-5 mr-2" aria-hidden="true" />
                Faire un nouveau diagnostic RepAIr
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

