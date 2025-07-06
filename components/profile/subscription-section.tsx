"use client"

import { useState,useEffect } from "react"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  RadioGroup,
  RadioGroupItem,
} from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import {
  Crown,
  Check,
  Zap,
  Star,
  CreditCard,
  Sparkles,
} from "lucide-react"
import { useAuth } from "@/contexts/auth-context"
import { useToast } from "@/hooks/use-toast"

type PlanType = "basic" | "premium"

interface SubscriptionPlan {
  id: PlanType
  name: string
  price: number
  period: string
  description: string
  features: string[]
  popular?: boolean
  current?: boolean
}

export function SubscriptionSection() {
  const { user } = useAuth()
  const { toast } = useToast()
  // const [selectedPlan, setSelectedPlan] = useState<PlanType>("basic")
  const [selectedPlan, setSelectedPlan] = useState<PlanType | null>(null)

useEffect(() => {
  if (user?.subscription?.type) {
    setSelectedPlan(user.subscription.type)
  }
}, [user])

  const [isLoading, setIsLoading] = useState(false)

  // const currentPlan: PlanType = "basic" 
  const currentPlan: PlanType = user?.subscription?.type || "basic"

  const plans: SubscriptionPlan[] = [
    {
      id: "basic" ,
      name: "Basic",
      price: 0,
      period: "gratuit",
      description: "Parfait pour commencer avec RepAIr",
      features: [
        "3 diagnostics IA par mois",
        "Accès aux tutoriels de base",
        "Support communautaire",
        "Historique limité (7 jours)",
      ],
      current: currentPlan === "basic",
    },
    {
      id: "premium",
      name: "Premium",
      price: 5.99,
      period: "mois",
      description: "Débloquez tout le potentiel de RepAIr",
      features: [
        "Diagnostics IA illimités",
        "Accès à tous les tutoriels premium",
        "Support prioritaire 24/7",
        "Historique complet et sauvegarde",
        "Analyses avancées et suggestions personnalisées",
        "Accès anticipé aux nouvelles fonctionnalités",
      ],
      popular: true,
      current: currentPlan === "premium",
    },
  ]

  // const handleUpgrade = async () => {
  //   if (selectedPlan === "basic" && currentPlan === "basic") {
  //     toast({
  //       title: "Plan Basic sélectionné",
  //       description: "Vous êtes déjà sur le plan gratuit RepAIr",
  //     })
  //     return
  //   }

  //   setIsLoading(true)
  //   try {
  //     window.location.href = "/api/create-stripe-session"
  //   } catch (error) {
  //     toast({
  //       title: "Erreur",
  //       description: "Impossible de traiter la demande d'abonnement",
  //       variant: "destructive",
  //     })
  //     setIsLoading(false)
  //   }
  // }
   const handleUpgrade = async () => {
  if (selectedPlan === "basic" && currentPlan === "basic") {
    toast({
      title: "Plan Basic sélectionné",
      description: "Vous êtes déjà sur le plan gratuit RepAIr",
    })
    return
  }

  setIsLoading(true)
  try {
    window.location.href = "/api/create-stripe-session"
  } catch (error) {
    console.error("Erreur de redirection paiement :", error)
    toast({
      title: "Erreur",
      description: "Impossible de traiter la demande d'abonnement",
      variant: "destructive",
    })
    setIsLoading(false)
  }
}

  const handlePlanChange = (value: string) => {
  if (value === "basic" || value === "premium") {
    setSelectedPlan(value)
  }
}


  return (
    <Card className="border-0 shadow-lg bg-gradient-to-br from-purple-50 to-pink-50">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2 text-xl text-gray-800">
          <div className="p-2 bg-purple-100 rounded-full">
            <Crown className="h-5 w-5 text-purple-600" />
          </div>
          <span>Abonnement RepAIr</span>
        </CardTitle>
        <p className="text-gray-600">
          Choisissez le plan qui vous convient le mieux
        </p>
      </CardHeader>

      <CardContent className="space-y-6">
        <RadioGroup
           value={selectedPlan || "basic"}
          // onValueChange={(value) => setSelectedPlan(value as PlanType)}
          onValueChange={handlePlanChange}
          className="space-y-4"
        >
          {plans.map((plan) => (
            <div key={plan.id} className="relative">
              <Label
                htmlFor={plan.id}
                className={`block cursor-pointer transition-all duration-200 ${
                  selectedPlan === plan.id
                    ? "scale-[1.02]"
                    : "hover:scale-[1.01]"
                }`}
              >
                <Card
                  className={`border-2 transition-all duration-200 ${
                    plan.current
                      ? "border-green-300 bg-gradient-to-br from-green-50 to-emerald-50"
                      : selectedPlan === plan.id
                      ? "border-purple-300 bg-gradient-to-br from-purple-50 to-violet-50"
                      : "border-gray-200 bg-white hover:border-gray-300"
                  }`}
                >
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center space-x-3">
                        <RadioGroupItem
                          value={plan.id}
                          id={plan.id}
                          className="mt-1"
                        />
                        <div>
                          <div className="flex items-center space-x-2">
                            <h3 className="text-lg font-semibold text-gray-900">
                              {plan.name}
                            </h3>
                            {plan.current && (
                              <Badge className="bg-green-100 text-green-700 border-green-200">
                                <Check className="h-3 w-3 mr-1" />
                                Actuel
                              </Badge>
                            )}
                            {plan.popular && (
                              <Badge className="bg-gradient-to-r from-purple-500 to-pink-500 text-white">
                                <Star className="h-3 w-3 mr-1" />
                                Populaire
                              </Badge>
                            )}
                          </div>
                          <p className="text-gray-600 text-sm mt-1">
                            {plan.description}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-bold text-gray-900">
                          {plan.price === 0
                            ? "Gratuit"
                            : `${plan.price}€`}
                        </div>
                        {plan.price > 0 && (
                          <div className="text-sm text-gray-500">
                            /{plan.period}
                          </div>
                        )}
                      </div>
                    </div>

                    <Separator className="my-4" />

                    <div className="space-y-2">
                      <h4 className="font-medium text-gray-800 mb-3">
                        Fonctionnalités incluses :
                      </h4>
                      <ul className="space-y-2">
                        {plan.features.map((feature, index) => (
                          <li
                            key={index}
                            className="flex items-center space-x-2 text-sm text-gray-600"
                          >
                            <div
                              className={`w-4 h-4 rounded-full flex items-center justify-center ${
                                plan.id === "premium"
                                  ? "bg-purple-100"
                                  : "bg-green-100"
                              }`}
                            >
                              <Check
                                className={`h-2.5 w-2.5 ${
                                  plan.id === "premium"
                                    ? "text-purple-600"
                                    : "text-green-600"
                                }`}
                              />
                            </div>
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </CardContent>
                </Card>
              </Label>

              {plan.popular && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <div className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-4 py-1 rounded-full text-xs font-medium flex items-center space-x-1">
                    <Sparkles className="h-3 w-3" />
                    <span>Recommandé</span>
                  </div>
                </div>
              )}
            </div>
          ))}
        </RadioGroup>

        <Separator />

        <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
          <div className="text-sm text-gray-600">
            {selectedPlan === "premium" ? (
              <div className="flex items-center space-x-2">
                <CreditCard className="h-4 w-4 text-purple-500" />
                <span>Paiement sécurisé avec Stripe</span>
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <Zap className="h-4 w-4 text-green-500" />
                <span>Aucun engagement, gratuit à vie</span>
              </div>
            )}
          </div>

          <Button
            onClick={handleUpgrade}
            disabled={
              isLoading || (selectedPlan === "basic" && currentPlan === "basic")
            }
            className={`px-6 py-2 ${
              selectedPlan === "premium"
                ? "bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white"
                : "bg-green-500 hover:bg-green-600 text-white"
            }`}
          >
            {isLoading ? (
              "Redirection..."
            ) : selectedPlan === "premium" ? (
              <>
                <Crown className="h-4 w-4 mr-2" />
                Passer à Premium
              </>
            ) : currentPlan === "basic" ? (
              "Plan actuel"
            ) : (
              "Revenir au Basic"
            )}
          </Button>
        </div>

        {selectedPlan === "premium" && (
          <div className="bg-gradient-to-r from-purple-100 to-pink-100 p-4 rounded-xl border border-purple-200">
            <div className="flex items-start space-x-3">
              <div className="p-1 bg-purple-200 rounded-full">
                <Star className="h-4 w-4 text-purple-600" />
              </div>
              <div>
                <h4 className="font-medium text-purple-800 mb-1">
                  Pourquoi choisir Premium ?
                </h4>
                <p className="text-sm text-purple-700">
                  Débloquez des diagnostics illimités, un support prioritaire et
                  des fonctionnalités exclusives pour maximiser vos réparations
                  avec RepAIr.
                </p>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

