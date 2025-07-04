// import type { Metadata } from 'next';
// import './globals.css';

// export const metadata: Metadata = {
//   title: 'RepAIr',
//   description: 'Plateforme intelligente de réparation écoresponsable',
// };

// export default function RootLayout({
//   children,
// }: Readonly<{
//   children: React.ReactNode;
// }>) {
//   return (
//     <html lang="fr">
//       <head>
//         {/* PWA */}
//         <link rel="manifest" href="/manifest.json" />
//         <meta name="theme-color" content="#ffffff" />
//         <link rel="apple-touch-icon" href="/icons/icon-512.png" />

//         {/* Favicons */}
//         <link rel="icon" type="image/png" sizes="32x32" href="/icons/favicon-32.png" />
//         <link rel="icon" type="image/png" sizes="16x16" href="/icons/favicon-16.png" />
//         <link rel="shortcut icon" href="/icons/favicon.ico" />
//       </head>
//       <body>{children}</body>
//     </html>
//   );
// }



// import type { Metadata } from 'next';
// import './globals.css';
// import { SidebarProvider } from '@/components/ui/sidebar'; // ✅ Assure-toi que ce chemin est correct
// import { AppSidebar } from '@/components/app-sidebar';

// export const metadata: Metadata = {
//   title: 'RepAIr',
//   description: 'Plateforme intelligente de réparation écoresponsable',
// };

// export default function RootLayout({
//   children,
// }: Readonly<{
//   children: React.ReactNode;
// }>) {
//   return (
//     <html lang="fr">
//       <head>
//         {/* PWA */}
//         <link rel="manifest" href="/manifest.json" />
//         <meta name="theme-color" content="#ffffff" />
//         <link rel="apple-touch-icon" href="/icons/icon-512.png" />

//         {/* Favicons */}
//         <link rel="icon" type="image/png" sizes="32x32" href="/icons/favicon-32.png" />
//         <link rel="icon" type="image/png" sizes="16x16" href="/icons/favicon-16.png" />
//         <link rel="shortcut icon" href="/icons/favicon.ico" />
//       </head>
//       <body>
//         <SidebarProvider>
//           <AppSidebar />
//           {children}
//         </SidebarProvider>
//       </body>
//     </html>
//   );
// }


import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { RootClientLayout } from "./root-client-layout"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "RepAIr - Réparez plutôt que jeter",
  description: "RepAIr vous accompagne dans la réparation de vos objets du quotidien grâce à l'intelligence artificielle",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="fr">
      <head>
        {/* PWA */}
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#ffffff" />
        <link rel="apple-touch-icon" href="/icons/icon-512.png" />

        {/* Favicons */}
        <link rel="icon" type="image/png" sizes="32x32" href="/icons/favicon-32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/icons/favicon-16.png" />
        <link rel="shortcut icon" href="/icons/favicon.ico" />
      </head>
      <body className={inter.className}>
        <RootClientLayout>{children}</RootClientLayout>
      </body>
    </html>
  )
}




