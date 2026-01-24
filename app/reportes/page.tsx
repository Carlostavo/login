"use client"

import React from "react"
import { useState } from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CaracterizacionReportes } from "@/components/caracterizacion-reportes"
import { AutosustentabilidadReportes } from "@/components/autosustentabilidad-reportes"
import { Recycle, Users, FileText, Download, BarChart3 } from "lucide-react"

export default function ReportesPage() {
  const [activeTab, setActiveTab] = useState("caracterizacion")

  return (
    <div className="flex flex-col min-h-screen bg-background overflow-x-hidden">
      <Header />
      <main className="flex-grow w-full">
        {/* Hero Section */}
        <section className="gradient-eco text-white py-12 sm:py-16 md:py-20 lg:py-28 relative overflow-hidden">
          <div className="absolute inset-0 bg-black/5"></div>
          <div className="container-safe relative z-10">
            <span className="inline-block px-3 py-1 rounded-full bg-white/15 text-white text-xs font-medium mb-4">
              REPORTES Y EXPORTACION
            </span>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-6 text-balance leading-tight">
              Centro de Reportes
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-white/90 max-w-2xl text-balance leading-relaxed">
              Visualiza, filtra y exporta datos de caracterizacion de desechos solidos y autosustentabilidad en multiples formatos.
            </p>
            
            {/* Feature highlights */}
            <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl">
              <div className="flex items-center gap-2 text-white/90 text-sm">
                <BarChart3 className="w-5 h-5" />
                <span>Graficos interactivos</span>
              </div>
              <div className="flex items-center gap-2 text-white/90 text-sm">
                <FileText className="w-5 h-5" />
                <span>Formato APA 7</span>
              </div>
              <div className="flex items-center gap-2 text-white/90 text-sm">
                <Download className="w-5 h-5" />
                <span>CSV, Excel, JSON</span>
              </div>
              <div className="flex items-center gap-2 text-white/90 text-sm">
                <FileText className="w-5 h-5" />
                <span>PDF y Word</span>
              </div>
            </div>
          </div>
        </section>

        {/* Main Content */}
        <section className="py-8 sm:py-12 md:py-16 bg-background">
          <div className="container-safe">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid w-full grid-cols-2 mb-8 h-auto p-1">
                <TabsTrigger 
                  value="caracterizacion" 
                  className="text-sm sm:text-base py-3 px-4 data-[state=active]:bg-primary data-[state=active]:text-white flex items-center justify-center gap-2"
                >
                  <Recycle className="w-4 h-4 hidden sm:block" />
                  <span>Caracterizacion de Desechos</span>
                </TabsTrigger>
                <TabsTrigger 
                  value="autosustentabilidad" 
                  className="text-sm sm:text-base py-3 px-4 data-[state=active]:bg-primary data-[state=active]:text-white flex items-center justify-center gap-2"
                >
                  <Users className="w-4 h-4 hidden sm:block" />
                  <span>Autosustentabilidad</span>
                </TabsTrigger>
              </TabsList>

              <TabsContent value="caracterizacion" className="mt-0">
                <div className="mb-6">
                  <h2 className="text-xl sm:text-2xl font-bold text-foreground mb-2">
                    Caracterizacion de Desechos Solidos
                  </h2>
                  <p className="text-muted-foreground">
                    Genera reportes de la caracterizacion de desechos solidos domiciliarios con graficos, tablas y exportacion en multiples formatos.
                  </p>
                </div>
                <CaracterizacionReportes />
              </TabsContent>

              <TabsContent value="autosustentabilidad" className="mt-0">
                <div className="mb-6">
                  <h2 className="text-xl sm:text-2xl font-bold text-foreground mb-2">
                    Autosustentabilidad y Comportamiento Proambiental
                  </h2>
                  <p className="text-muted-foreground">
                    Genera reportes del cuestionario de comportamiento proambiental con analisis por secciones: Distribucion Demografica, Determinantes Socioculturales, Afectivos, Cognitivos, Sustentabilidad Ambiental, Economica y Desarrollo Comunitario.
                  </p>
                </div>
                <AutosustentabilidadReportes />
              </TabsContent>
            </Tabs>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
