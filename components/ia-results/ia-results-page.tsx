"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
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

export function IAResultsPage() {
  const [imageError, setImageError] = useState(false)
  const [data, setData] = useState<any | null>(null)

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
      <div className="min-h-screen flex items-center justify-center text-gray-600 text-lg">
        Aucun résultat IA trouvé. Veuillez effectuer un diagnostic d’abord.
      </div>
    )
  }

  const { imageUrl,objet_detecte, analyse, solution, videos = [] } = data

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-indigo-50">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-white/80 backdrop-blur-sm border-b border-purple-100">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Button variant="ghost" size="icon" asChild className="hover:bg-purple-100">
                <Link href="/">
                  <ArrowLeft className="h-5 w-5" />
                </Link>
              </Button>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Résultats IA RepAIr</h1>
                <p className="text-sm text-gray-600">Diagnostic terminé avec succès</p>
              </div>
            </div>
            <Badge className="bg-green-100 text-green-700 border-green-200">
              <Sparkles className="h-3 w-3 mr-1" />
              Analyse complète
            </Badge>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 max-w-4xl space-y-8">
        {/* Image + objet détecté */}
        <Card className="border-0 shadow-lg bg-gradient-to-br from-blue-50 to-cyan-50">
          <CardHeader className="text-center pb-4">
            <CardTitle className="flex items-center justify-center space-x-2 text-xl text-gray-800">
              <Camera className="h-5 w-5 text-blue-500" />
              <span>Objet analysé</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col items-center space-y-4">
            <div className="relative">
              <div className="w-64 h-64 rounded-2xl overflow-hidden shadow-xl bg-white p-2">
                {/* <Image
                  src={imageError ? "/placeholder.svg" : "/uploads/placeholder.jpg"}
                  alt="Objet analysé par RepAIr"
                  width={300}
                  height={300}
                  className="w-full h-full object-cover rounded-xl"
                  onError={() => setImageError(true)}
                /> */}
                <Image
                  // src={imageError ? "/placeholder.svg" : `http://localhost:3002/${imageUrl}`}
                  src={imageError ? "/placeholder.svg" : imageUrl}
                  alt="Objet analysé par RepAIr"
                  width={300}
                  height={300}
                  className="w-full h-full object-cover rounded-xl"
                  onError={() => setImageError(true)}
                />
              </div>
              <div className="absolute -bottom-2 -right-2 bg-blue-500 text-white p-2 rounded-full shadow-lg">
                <CheckCircle className="h-4 w-4" />
              </div>
            </div>
            <div className="text-center">
              <h3 className="text-lg font-semibold text-gray-800">{objet_detecte}</h3>
              <Badge variant="secondary" className="mt-1 bg-blue-100 text-blue-700">
                Confiance: estimation IA
              </Badge>
            </div>
          </CardContent>
        </Card>

        {/* Diagnostic IA */}
        <Card className="border-0 shadow-lg bg-gradient-to-br from-green-50 to-emerald-50">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2 text-xl text-gray-800">
              <div className="p-2 bg-green-100 rounded-full">
                <Brain className="h-5 w-5 text-green-600" />
              </div>
              <span>Diagnostic IA RepAIr</span>
            </CardTitle>
          </CardHeader>
          {/* <CardContent className="space-y-4">
            <div className="bg-white/70 p-4 rounded-xl border border-green-100 whitespace-pre-wrap">
              <p className="text-gray-700 leading-relaxed">{analyse}</p>
            </div>
          </CardContent> */}
          <CardContent className="space-y-4">
            <div className="bg-white/70 p-4 rounded-xl border border-green-100">
              <pre className="text-gray-700 leading-relaxed whitespace-pre-wrap">{analyse}</pre>
            </div>
          </CardContent>
        </Card>

        {/* Solution proposée */}
        <Card className="border-0 shadow-lg bg-gradient-to-br from-rose-50 to-pink-50">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2 text-xl text-gray-800">
              <div className="p-2 bg-rose-100 rounded-full">
                <Lightbulb className="h-5 w-5 text-rose-600" />
              </div>
              <span>Solution RepAIr</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            {/* <div className="bg-white/70 p-6 rounded-xl border border-rose-100 whitespace-pre-wrap">
              <p className="text-gray-700 leading-relaxed text-lg">{solution}</p>
            </div> */}
          </CardContent>
          <div className="bg-white/70 p-6 rounded-xl border border-rose-100">
            <pre className="text-gray-700 leading-relaxed text-lg whitespace-pre-wrap">{solution}</pre>
          </div>
        </Card>

        {/* Tutoriels vidéo */}
        {videos.length > 0 && (
          <Card className="border-0 shadow-lg bg-gradient-to-br from-purple-50 to-violet-50">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2 text-xl text-gray-800">
                <div className="p-2 bg-purple-100 rounded-full">
                  <Play className="h-5 w-5 text-purple-600" />
                </div>
                <span>Tutoriels vidéo RepAIr</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {videos.map((video: any, index: number) => (
                <div
                  key={index}
                  className="bg-white/70 p-4 rounded-xl border border-purple-100 hover:shadow-md transition-shadow"
                >
                  <div className="flex items-center space-x-4">
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
                          <Play className="h-3 w-3 text-purple-600" />
                        </div>
                      </div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-medium text-gray-800 truncate">{video.title}</h4>
                    </div>
                    <Button variant="ghost" size="icon" asChild className="flex-shrink-0 hover:bg-purple-100">
                      <a href={video.url} target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="h-4 w-4" />
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
            <h3 className="text-lg font-semibold text-gray-800 mb-2">Prêt pour un nouveau diagnostic ?</h3>
            <p className="text-gray-600 mb-4">
              RepAIr peut analyser d'autres objets et vous proposer des solutions personnalisées
            </p>
            <Button
              size="lg"
              className="bg-gradient-to-r from-repair-green to-repair-blue hover:from-repair-green/90 hover:to-repair-blue/90 text-white px-8 py-3 text-lg shadow-lg"
              asChild
            >
              <Link href="/#diagnostic">
                <Camera className="h-5 w-5 mr-2" />
                Faire un nouveau diagnostic RepAIr
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
