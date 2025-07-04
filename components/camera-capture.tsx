"use client"

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Camera, Upload, X, CheckCircle } from "lucide-react"
import Image from "next/image"

interface CameraCaptureProps {
  onImageCapture?: (imageUrl: string, file: File) => void
}

export function CameraCapture({ onImageCapture }: CameraCaptureProps) {
  const [capturedImage, setCapturedImage] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const galleryInputRef = useRef<HTMLInputElement>(null)

  const handleCameraCapture = () => {
    fileInputRef.current?.click()
  }

  const handleGallerySelect = () => {
    galleryInputRef.current?.click()
  }

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      setIsLoading(true)
      const reader = new FileReader()
      reader.onload = (e) => {
        const imageUrl = e.target?.result as string
        setCapturedImage(imageUrl)
        setIsLoading(false)
        onImageCapture?.(imageUrl, file)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleRetake = () => {
    setCapturedImage(null)
    if (fileInputRef.current) fileInputRef.current.value = ""
    if (galleryInputRef.current) galleryInputRef.current.value = ""
  }

  const handleConfirm = () => {
    console.log("Image confirmée pour analyse RepAIr")
  }

  return (
    <Card className="w-full max-w-md mx-auto border-2 border-repair-green/20">
      <CardContent className="p-6">
        {!capturedImage ? (
          <div className="text-center space-y-4">
            <div className="w-24 h-24 bg-repair-green/10 rounded-full flex items-center justify-center mx-auto">
              <Camera className="h-12 w-12 text-repair-green" />
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Scanner votre objet</h3>
              <p className="text-sm text-gray-600 mb-4">
                RepAIr analysera l'image pour identifier le problème
              </p>
            </div>

            <div className="space-y-3">
              <Button
                onClick={handleCameraCapture}
                className="w-full bg-repair-green hover:bg-repair-green/90 text-white"
                disabled={isLoading}
              >
                <Camera className="h-4 w-4 mr-2" />
                {isLoading ? "Chargement..." : "Ouvrir la caméra RepAIr"}
              </Button>

              <Button
                onClick={handleGallerySelect}
                variant="outline"
                className="w-full border-repair-blue text-repair-blue hover:bg-repair-blue/10"
                disabled={isLoading}
              >
                <Upload className="h-4 w-4 mr-2" />
                Choisir depuis la galerie
              </Button>
            </div>

            {/* Inputs caméra et galerie */}
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              capture="environment"
              onChange={handleFileChange}
              className="hidden"
              aria-label="Prendre une photo avec RepAIr"
            />
            <input
              ref={galleryInputRef}
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="hidden"
              aria-label="Choisir une image dans la galerie"
            />
          </div>
        ) : (
          <div className="space-y-4">
            <div className="relative">
              <div className="aspect-square rounded-lg overflow-hidden bg-gray-100">
                <Image
                  src={capturedImage || "/placeholder.svg"}
                  alt="Objet capturé pour RepAIr"
                  width={400}
                  height={400}
                  className="w-full h-full object-cover"
                />
              </div>
              <Button
                onClick={handleRetake}
                size="icon"
                variant="secondary"
                className="absolute top-2 right-2 bg-white/90 hover:bg-white"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>

            <div className="text-center">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Photo capturée !</h3>
              <p className="text-sm text-gray-600 mb-4">
                RepAIr va analyser cette image pour diagnostiquer le problème
              </p>
            </div>

            <div className="flex gap-3">
              <Button onClick={handleRetake} variant="outline" className="flex-1 border-gray-300">
                Reprendre
              </Button>
              <Button onClick={handleConfirm} className="flex-1 bg-repair-blue hover:bg-repair-blue/90 text-white">
                <CheckCircle className="h-4 w-4 mr-2" />
                Analyser avec RepAIr
              </Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
