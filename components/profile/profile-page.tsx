"use client"

import type React from "react"

import { useState,useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { ArrowLeft, User, Mail, Calendar, Save } from "lucide-react"
import { useAuth } from "@/contexts/auth-context"
import { SubscriptionSection } from "./subscription-section"
import { useToast } from "@/hooks/use-toast"

export function ProfilePage() {
  const { user } = useAuth()
  const { toast } = useToast()
  const [isEditing, setIsEditing] = useState(false)
  const [formData, setFormData] = useState({
    firstName: user?.firstName || "",
    lastName: user?.lastName || "",
    email: user?.email || "",
  })
  useEffect(() => {
    setFormData({
      firstName: user?.firstName || "",
      lastName: user?.lastName || "",
      email: user?.email || "",
    });
  }, [user]);

  // const getUserInitials = () => {
  //   if (!user) return "U"
  //   return `${user.firstName.charAt(0)}${user.lastName.charAt(0)}`.toUpperCase()
  // }

  // const getUserInitials = () => {
  //   if (!user?.firstName || !user?.lastName) return "U"
  //   return `${user.firstName.charAt(0)}${user.lastName.charAt(0)}`.toUpperCase()
  // }
   const getUserInitials = () => {
    if (user?.firstName && user?.lastName) {
      return `${user.firstName.charAt(0)}${user.lastName.charAt(0)}`.toUpperCase();
    }
    if (user?.email) return user.email.charAt(0).toUpperCase();
    return "U";
  };
  const handleSave = () => {
    // Ici on sauvegarderait les modifications
    toast({
      title: "Profil mis à jour",
      description: "Vos informations ont été sauvegardées avec succès",
    })
    setIsEditing(false)
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-white/80 backdrop-blur-sm border-b border-purple-100">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center space-x-3">
            <Button variant="ghost" size="icon" asChild className="hover:bg-purple-100">
              <Link href="/" aria-label="Retour à l’accueil">
                <ArrowLeft className="h-5 w-5" aria-hidden="true" />
              </Link>
            </Button>

            <div>
              <h1 className="text-2xl font-bold text-gray-900">Mon Profil RepAIr</h1>
              <p className="text-sm text-gray-600">Gérez votre compte et vos préférences</p>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="space-y-8">
          {/* Section Profil */}
          <Card className="border-0 shadow-lg bg-gradient-to-br from-blue-50 to-cyan-50">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2 text-xl text-gray-800">
                <div className="p-2 bg-blue-100 rounded-full">
                  <User className="h-5 w-5 text-blue-600" />
                </div>
                <span>Informations personnelles</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center space-x-6">
                <Avatar className="h-20 w-20">
                  <AvatarFallback className="bg-blue-600 text-white text-xl">{getUserInitials()}</AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">
                    {user?.firstName} {user?.lastName}
                  </h3>
                  <p className="text-gray-600">{user?.email}</p>
                  {/* <div className="flex items-center space-x-2 mt-2 text-sm text-gray-500">
                    <Calendar className="h-4 w-4" />
                    <span>Membre depuis janvier 2024</span>
                  </div> */}
                </div>
              </div>

              <Separator />

              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="firstName">Prénom</Label>
                  <Input
                    id="firstName"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    className="border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName">Nom</Label>
                  <Input
                    id="lastName"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    className="border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>
                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="email">Email</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      disabled={!isEditing}
                      className="pl-10 border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                    />
                  </div>
                </div>
              </div>

              <div className="flex justify-end space-x-3">
                {isEditing ? (
                  <>
                    <Button variant="outline" onClick={() => setIsEditing(false)}>
                      Annuler
                    </Button>
                    <Button onClick={handleSave} className="bg-blue-500 hover:bg-blue-600 text-white">
                      <Save className="h-4 w-4 mr-2" />
                      Sauvegarder
                    </Button>
                  </>
                ) : (
                  <Button onClick={() => setIsEditing(true)} variant="outline">
                    Modifier
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Section Abonnement */}
          <SubscriptionSection />
        </div>
      </div>
    </div>
  )
}









// "use client"

// import type React from "react"
// import { useState, useEffect } from "react" // ⬅️ import useEffect
// import Link from "next/link"
// import { Button } from "@/components/ui/button"
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
// import { Input } from "@/components/ui/input"
// import { Label } from "@/components/ui/label"
// import { Separator } from "@/components/ui/separator"
// import { Avatar, AvatarFallback } from "@/components/ui/avatar"
// import { ArrowLeft, User, Mail, Save } from "lucide-react"
// import { useAuth } from "@/contexts/auth-context"
// import { SubscriptionSection } from "./subscription-section"
// import { useToast } from "@/hooks/use-toast"

// export function ProfilePage() {
//   // ⬅️ récupère refreshUser pour recharger depuis la BDD
//   const { user, refreshUser } = useAuth()
//   const { toast } = useToast()

//   const [isEditing, setIsEditing] = useState(false)
//   const [formData, setFormData] = useState({
//     firstName: user?.firstName || "",
//     lastName: user?.lastName || "",
//     email: user?.email || "",
//   })

//   // ⬅️ 1) au montage de la page, force un refresh depuis la BDD
//   useEffect(() => {
//     // on ignore les erreurs silencieusement pour ne pas bloquer l'UI
//     refreshUser().catch(() => {})
//   }, [refreshUser])

//   // ⬅️ 2) quand le user est mis à jour (après refresh), resynchronise le formulaire
//   useEffect(() => {
//     setFormData({
//       firstName: user?.firstName || "",
//       lastName: user?.lastName || "",
//       email: user?.email || "",
//     })
//   }, [user])

//   const getUserInitials = () => {
//     if (!user?.firstName || !user?.lastName) return "U"
//     return `${user.firstName.charAt(0)}${user.lastName.charAt(0)}`.toUpperCase()
//   }

//   const handleSave = () => {
//     // Ici on sauvegarderait les modifications
//     toast({
//       title: "Profil mis à jour",
//       description: "Vos informations ont été sauvegardées avec succès",
//     })
//     setIsEditing(false)
//   }

//   const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setFormData({
//       ...formData,
//       [e.target.name]: e.target.value,
//     })
//   }

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
//       {/* Header */}
//       <div className="sticky top-0 z-10 bg-white/80 backdrop-blur-sm border-b border-purple-100">
//         <div className="container mx-auto px-4 py-4">
//           <div className="flex items-center space-x-3">
//             <Button variant="ghost" size="icon" asChild className="hover:bg-purple-100">
//               <Link href="/" aria-label="Retour à l’accueil">
//                 <ArrowLeft className="h-5 w-5" aria-hidden="true" />
//               </Link>
//             </Button>

//             <div>
//               <h1 className="text-2xl font-bold text-gray-900">Mon Profil RepAIr</h1>
//               <p className="text-sm text-gray-600">Gérez votre compte et vos préférences</p>
//             </div>
//           </div>
//         </div>
//       </div>

//       <div className="container mx-auto px-4 py-8 max-w-4xl">
//         <div className="space-y-8">
//           {/* Section Profil */}
//           <Card className="border-0 shadow-lg bg-gradient-to-br from-blue-50 to-cyan-50">
//             <CardHeader>
//               <CardTitle className="flex items-center space-x-2 text-xl text-gray-800">
//                 <div className="p-2 bg-blue-100 rounded-full">
//                   <User className="h-5 w-5 text-blue-600" />
//                 </div>
//                 <span>Informations personnelles</span>
//               </CardTitle>
//             </CardHeader>
//             <CardContent className="space-y-6">
//               <div className="flex items-center space-x-6">
//                 <Avatar className="h-20 w-20">
//                   <AvatarFallback className="bg-blue-600 text-white text-xl">{getUserInitials()}</AvatarFallback>
//                 </Avatar>
//                 <div>
//                   <h3 className="text-lg font-semibold text-gray-900">
//                     {user?.firstName} {user?.lastName}
//                   </h3>
//                   <p className="text-gray-600">{user?.email}</p>
//                 </div>
//               </div>

//               <Separator />

//               <div className="grid md:grid-cols-2 gap-6">
//                 <div className="space-y-2">
//                   <Label htmlFor="firstName">Prénom</Label>
//                   <Input
//                     id="firstName"
//                     name="firstName"
//                     value={formData.firstName}
//                     onChange={handleInputChange}
//                     disabled={!isEditing}
//                     className="border-gray-300 focus:border-blue-500 focus:ring-blue-500"
//                   />
//                 </div>
//                 <div className="space-y-2">
//                   <Label htmlFor="lastName">Nom</Label>
//                   <Input
//                     id="lastName"
//                     name="lastName"
//                     value={formData.lastName}
//                     onChange={handleInputChange}
//                     disabled={!isEditing}
//                     className="border-gray-300 focus:border-blue-500 focus:ring-blue-500"
//                   />
//                 </div>
//                 <div className="space-y-2 md:col-span-2">
//                   <Label htmlFor="email">Email</Label>
//                   <div className="relative">
//                     <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
//                     <Input
//                       id="email"
//                       name="email"
//                       type="email"
//                       value={formData.email}
//                       onChange={handleInputChange}
//                       disabled={!isEditing}
//                       className="pl-10 border-gray-300 focus:border-blue-500 focus:ring-blue-500"
//                     />
//                   </div>
//                 </div>
//               </div>

//               <div className="flex justify-end space-x-3">
//                 {isEditing ? (
//                   <>
//                     <Button variant="outline" onClick={() => setIsEditing(false)}>
//                       Annuler
//                     </Button>
//                     <Button onClick={handleSave} className="bg-blue-500 hover:bg-blue-600 text-white">
//                       <Save className="h-4 w-4 mr-2" />
//                       Sauvegarder
//                     </Button>
//                   </>
//                 ) : (
//                   <Button onClick={() => setIsEditing(true)} variant="outline">
//                     Modifier
//                   </Button>
//                 )}
//               </div>
//             </CardContent>
//           </Card>

//           {/* Section Abonnement */}
//           <SubscriptionSection />
//         </div>
//       </div>
//     </div>
//   )
// }
