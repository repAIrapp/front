import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Play, ExternalLink } from "lucide-react"

interface TutorialCardProps {
  title: string
  duration: string
  thumbnail: string
  url: string
}

export function TutorialCard({ title, duration, thumbnail, url }: TutorialCardProps) {
  return (
    <Card className="border-0 bg-white/70 hover:bg-white/90 transition-all duration-200 hover:shadow-md">
      <CardContent className="p-4">
        <div className="flex items-center space-x-4">
          <div className="relative flex-shrink-0">
            <Image
              src={thumbnail || "/placeholder.svg"}
              alt={title}
              width={120}
              height={80}
              className="w-20 h-14 object-cover rounded-lg"
            />
            <div className="absolute inset-0 flex items-center justify-center bg-black/20 rounded-lg">
              <div className="bg-white/90 p-1.5 rounded-full">
                <Play className="h-3 w-3 text-purple-600 fill-current" />
              </div>
            </div>
          </div>
          <div className="flex-1 min-w-0">
            <h4 className="font-medium text-gray-800 truncate">{title}</h4>
            <p className="text-sm text-gray-600 mt-1">Durée: {duration}</p>
          </div>
          <Button variant="ghost" size="icon" asChild className="flex-shrink-0 hover:bg-purple-100">
            <a href={url} target="_blank" rel="noopener noreferrer">
              <ExternalLink className="h-4 w-4" />
            </a>
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
