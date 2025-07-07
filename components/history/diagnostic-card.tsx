import Image from "next/image"
import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Calendar, Eye, Clock, Euro, AlertCircle, CheckCircle, Loader } from "lucide-react"
import type { DiagnosticHistory } from "./history-page"

interface DiagnosticCardProps {
  diagnostic: DiagnosticHistory
}

export function DiagnosticCard({ diagnostic }: DiagnosticCardProps) {
  const getStatusConfig = (status: string) => {
    switch (status) {
      case "completed":
        return {
          icon: CheckCircle,
          label: "Réparation réussie",
          color: "bg-green-100 text-green-700 border-green-200",
          cardBorder: "border-green-200",
          cardBg: "from-green-50 to-emerald-50",
        }
      case "in-progress":
        return {
          icon: Loader,
          label: "En cours",
          color: "bg-blue-100 text-blue-700 border-blue-200",
          cardBorder: "border-blue-200",
          cardBg: "from-blue-50 to-cyan-50",
        }
      case "failed":
        return {
          icon: AlertCircle,
          label: "Échec",
          color: "bg-red-100 text-red-700 border-red-200",
          cardBorder: "border-red-200",
          cardBg: "from-red-50 to-pink-50",
        }
      default:
        return {
          icon: Clock,
          label: "Inconnu",
          color: "bg-gray-100 text-gray-700 border-gray-200",
          cardBorder: "border-gray-200",
          cardBg: "from-gray-50 to-slate-50",
        }
    }
  }

  const statusConfig = getStatusConfig(diagnostic.status)
  const StatusIcon = statusConfig.icon

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("fr-FR", {
      day: "numeric",
      month: "long",
      year: "numeric",
    })
  }

  return (
    <Card className={`border-2 ${statusConfig.cardBorder} shadow-lg hover:shadow-xl transition-all duration-200`}>
      <CardContent className={`p-0 bg-gradient-to-br ${statusConfig.cardBg}`}>
        <div className="flex flex-col md:flex-row">
          {/* Image */}
          <div className="md:w-48 h-48 md:h-auto relative flex-shrink-0">
            <Image
              src={diagnostic.imageUrl || "/placeholder.svg"}
              alt={diagnostic.objectName}
              fill
              className="object-cover rounded-t-lg md:rounded-l-lg md:rounded-t-none"
            />
            <div className="absolute top-3 left-3">
              <Badge className={statusConfig.color}>
                <StatusIcon className="h-3 w-3 mr-1" />
                {statusConfig.label}
              </Badge>
            </div>
          </div>

          {/* Contenu */}
          <div className="flex-1 p-6">
            <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-4">
              <div className="mb-4 md:mb-0">
                <h3 className="text-xl font-semibold text-gray-900 mb-1">{diagnostic.objectName}</h3>
                <p className="text-sm text-gray-600 mb-2">{diagnostic.objectType}</p>
                <div className="flex items-center space-x-4 text-sm text-gray-500">
                  <div className="flex items-center space-x-1">
                    <Calendar className="h-4 w-4" />
                    <span>{formatDate(diagnostic.date)}</span>
                  </div>
                  <Badge variant="secondary" className="bg-purple-100 text-purple-700">
                    Confiance: {diagnostic.confidence}%
                  </Badge>
                </div>
              </div>

              <div className="flex flex-col items-end space-y-2">
                {diagnostic.repairTime && (
                  <div className="flex items-center space-x-1 text-sm text-gray-600">
                    <Clock className="h-4 w-4" />
                    <span>{diagnostic.repairTime}</span>
                  </div>
                )}
                {(diagnostic.actualCost || diagnostic.estimatedCost) && (
                  <div className="flex items-center space-x-1 text-sm text-gray-600">
                    <Euro className="h-4 w-4" />
                    <span>
                      {diagnostic.actualCost || diagnostic.estimatedCost}€
                      {diagnostic.actualCost &&
                        diagnostic.estimatedCost &&
                        diagnostic.actualCost !== diagnostic.estimatedCost && (
                          <span className="text-xs text-gray-500 ml-1">(est. {diagnostic.estimatedCost}€)</span>
                        )}
                    </span>
                  </div>
                )}
              </div>
            </div>

            <div className="mb-4">
              <h4 className="font-medium text-gray-800 mb-2">Problème détecté :</h4>
              <p className="text-gray-700 leading-relaxed">{diagnostic.problem}</p>
            </div>

            <div className="flex justify-end">
              <Button asChild variant="outline" className="border-gray-300 hover:bg-white/80 bg-transparent">
                <Link href={`/ia-results?id=${diagnostic.id}`}>
                  <Eye className="h-4 w-4 mr-2" />
                  Voir les détails
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
