"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ArrowLeft, Search, Filter, Camera, Wrench } from "lucide-react"
import { DiagnosticCard } from "./diagnostic-card"
import { useAuth } from "@/contexts/auth-context"

export interface DiagnosticHistory {
  id: string
  objectType: string
  objectName: string
  imageUrl: string
  date: string
  problem: string
  status: "completed" | "in-progress" | "failed"
  confidence: number
  estimatedCost?: number
  actualCost?: number
  repairTime?: string
}

export function HistoryPage() {
  const { user } = useAuth()
  const [diagnostics, setDiagnostics] = useState<DiagnosticHistory[]>([])
  const [filteredDiagnostics, setFilteredDiagnostics] = useState<DiagnosticHistory[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [isLoading, setIsLoading] = useState(true)

  // Données simulées - à remplacer par l'API
  const mockDiagnostics: DiagnosticHistory[] = [
    {
      id: "1",
      objectType: "Smartphone",
      objectName: "iPhone 12 Pro",
      imageUrl: "/placeholder.svg?height=200&width=200",
      date: "2024-01-15",
      problem: "Écran fissuré sur la partie supérieure droite",
      status: "completed",
      confidence: 94,
      estimatedCost: 89,
      actualCost: 85,
      repairTime: "45 minutes",
    },
    {
      id: "2",
      objectType: "Grille-pain",
      objectName: "Grille-pain Philips",
      imageUrl: "/placeholder.svg?height=200&width=200",
      date: "2024-01-10",
      problem: "Ne chauffe plus, problème de résistance",
      status: "completed",
      confidence: 87,
      estimatedCost: 25,
      actualCost: 30,
      repairTime: "1h 20min",
    },
    {
      id: "3",
      objectType: "Aspirateur",
      objectName: "Dyson V8",
      imageUrl: "/placeholder.svg?height=200&width=200",
      date: "2024-01-08",
      problem: "Perte d'aspiration, filtre obstrué",
      status: "in-progress",
      confidence: 91,
      estimatedCost: 15,
      repairTime: "30 minutes",
    },
    {
      id: "4",
      objectType: "Machine à café",
      objectName: "Nespresso Vertuo",
      imageUrl: "/placeholder.svg?height=200&width=200",
      date: "2024-01-05",
      problem: "Fuite d'eau au niveau du réservoir",
      status: "completed",
      confidence: 89,
      estimatedCost: 35,
      actualCost: 40,
      repairTime: "1h 10min",
    },
    {
      id: "5",
      objectType: "Ordinateur portable",
      objectName: "MacBook Air M1",
      imageUrl: "/placeholder.svg?height=200&width=200",
      date: "2024-01-02",
      problem: "Clavier défaillant, touches qui collent",
      status: "failed",
      confidence: 76,
      estimatedCost: 120,
    },
    {
      id: "6",
      objectType: "Casque audio",
      objectName: "Sony WH-1000XM4",
      imageUrl: "/placeholder.svg?height=200&width=200",
      date: "2023-12-28",
      problem: "Son grésillant dans l'oreillette droite",
      status: "completed",
      confidence: 83,
      estimatedCost: 45,
      actualCost: 50,
      repairTime: "2h 15min",
    },
  ]

  useEffect(() => {
    // Simulation du chargement des données
    const loadDiagnostics = async () => {
      setIsLoading(true)
      // Ici on ferait l'appel API : const data = await fetchUserDiagnostics(user.id)
      await new Promise((resolve) => setTimeout(resolve, 1000))
      setDiagnostics(mockDiagnostics)
      setFilteredDiagnostics(mockDiagnostics)
      setIsLoading(false)
    }

    loadDiagnostics()
  }, [])

  useEffect(() => {
    let filtered = diagnostics

    // Filtrage par recherche
    if (searchTerm) {
      filtered = filtered.filter(
        (diagnostic) =>
          diagnostic.objectName.toLowerCase().includes(searchTerm.toLowerCase()) ||
          diagnostic.objectType.toLowerCase().includes(searchTerm.toLowerCase()) ||
          diagnostic.problem.toLowerCase().includes(searchTerm.toLowerCase()),
      )
    }

    // Filtrage par statut
    if (statusFilter !== "all") {
      filtered = filtered.filter((diagnostic) => diagnostic.status === statusFilter)
    }

    setFilteredDiagnostics(filtered)
  }, [searchTerm, statusFilter, diagnostics])

  const getStatusStats = () => {
    const completed = diagnostics.filter((d) => d.status === "completed").length
    const inProgress = diagnostics.filter((d) => d.status === "in-progress").length
    const failed = diagnostics.filter((d) => d.status === "failed").length
    return { completed, inProgress, failed, total: diagnostics.length }
  }

  const stats = getStatusStats()

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 flex items-center justify-center">
        <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm">
          <CardContent className="p-8 text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-repair-green mx-auto mb-4"></div>
            <p className="text-gray-600">Chargement de votre historique RepAIr...</p>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
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
                <h1 className="text-2xl font-bold text-gray-900">Mon historique de réparations</h1>
                <p className="text-sm text-gray-600">
                  {stats.total} diagnostic{stats.total > 1 ? "s" : ""} effectué{stats.total > 1 ? "s" : ""} avec RepAIr
                </p>
              </div>
            </div>
            <Button asChild className="bg-repair-green hover:bg-repair-green/90 text-white">
              <Link href="/#diagnostic">
                <Camera className="h-4 w-4 mr-2" />
                Nouveau diagnostic
              </Link>
            </Button>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Statistiques */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <Card className="border-0 shadow-lg bg-gradient-to-br from-green-50 to-emerald-50">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-green-600 mb-1">{stats.completed}</div>
              <div className="text-sm text-gray-600">Réparations réussies</div>
            </CardContent>
          </Card>
          <Card className="border-0 shadow-lg bg-gradient-to-br from-blue-50 to-cyan-50">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-blue-600 mb-1">{stats.inProgress}</div>
              <div className="text-sm text-gray-600">En cours</div>
            </CardContent>
          </Card>
          <Card className="border-0 shadow-lg bg-gradient-to-br from-purple-50 to-violet-50">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-purple-600 mb-1">{stats.total}</div>
              <div className="text-sm text-gray-600">Total diagnostics</div>
            </CardContent>
          </Card>
          <Card className="border-0 shadow-lg bg-gradient-to-br from-pink-50 to-rose-50">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-pink-600 mb-1">
                {diagnostics.reduce((sum, d) => sum + (d.actualCost || d.estimatedCost || 0), 0)}€
              </div>
              <div className="text-sm text-gray-600">Économies totales</div>
            </CardContent>
          </Card>
        </div>

        {/* Filtres et recherche */}
        <Card className="border-0 shadow-lg bg-white/70 backdrop-blur-sm mb-8">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Rechercher un objet, type ou problème..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 border-gray-300 focus:border-repair-blue focus:ring-repair-blue"
                />
              </div>
              <div className="flex items-center space-x-2">
                <Filter className="h-4 w-4 text-gray-500" />
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-48">
                    <SelectValue placeholder="Filtrer par statut" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Tous les statuts</SelectItem>
                    <SelectItem value="completed">Réparations réussies</SelectItem>
                    <SelectItem value="in-progress">En cours</SelectItem>
                    <SelectItem value="failed">Échecs</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Liste des diagnostics */}
        {filteredDiagnostics.length === 0 ? (
          <Card className="border-0 shadow-lg bg-white/70 backdrop-blur-sm">
            <CardContent className="p-12 text-center">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Wrench className="h-8 w-8 text-gray-400" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Aucun diagnostic trouvé</h3>
              <p className="text-gray-600 mb-6">
                {searchTerm || statusFilter !== "all"
                  ? "Aucun résultat ne correspond à vos critères de recherche."
                  : "Vous n'avez pas encore effectué de diagnostic avec RepAIr."}
              </p>
              <Button asChild className="bg-repair-green hover:bg-repair-green/90 text-white">
                <Link href="/#diagnostic">
                  <Camera className="h-4 w-4 mr-2" />
                  Commencer un diagnostic RepAIr
                </Link>
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-6">
            {filteredDiagnostics.map((diagnostic) => (
              <DiagnosticCard key={diagnostic.id} diagnostic={diagnostic} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
