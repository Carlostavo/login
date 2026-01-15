"use client";

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { useState } from "react"

export default function AvancesPage() {
  const driveFolderUrl = "https://drive.google.com/embeddedfolderview?id=1OuiRdKB0fTZ6IufXDE2mkzwDhAsqMjaG#list"
  const [expandedFolders, setExpandedFolders] = useState<Record<string, boolean>>({})

  const handleRefresh = () => {
    const iframe = document.querySelector('iframe[title="Google Drive - Avances Ambientales"]') as HTMLIFrameElement
    if (iframe) {
      const currentSrc = iframe.src
      iframe.src = ''
      setTimeout(() => {
        iframe.src = currentSrc
      }, 100)
    }
  }

  // Datos de ejemplo de carpetas y archivos
  const folders = [
    {
      id: "folder1",
      name: "📁 Reportes Mensuales",
      files: [
        { name: "Reporte Enero 2024.pdf", date: "15 ene 2024" },
        { name: "Reporte Febrero 2024.pdf", date: "15 feb 2024" },
        { name: "Reporte Marzo 2024.pdf", date: "15 mar 2024" }
      ]
    },
    {
      id: "folder2",
      name: "📁 Estudios Técnicos",
      files: [
        { name: "Análisis de Calidad de Agua.docx", date: "10 mar 2024" },
        { name: "Impacto Ambiental.pdf", date: "5 feb 2024" }
      ]
    },
    {
      id: "folder3",
      name: "📁 Presentaciones",
      files: [
        { name: "Presentación Consejo Municipal.pptx", date: "20 mar 2024" },
        { name: "Avances Proyecto Verde.pdf", date: "18 mar 2024" }
      ]
    }
  ]

  const toggleFolder = (folderId: string) => {
    setExpandedFolders(prev => ({
      ...prev,
      [folderId]: !prev[folderId]
    }))
  }

  return (
    <div className="flex flex-col min-h-screen bg-background overflow-x-hidden">
      <Header />
      <main className="flex-grow w-full">
        <section className="gradient-eco text-white py-12 sm:py-16 md:py-20 lg:py-28 relative overflow-hidden">
          <div className="absolute inset-0 bg-black/5"></div>
          <div className="container-safe relative z-10">
            <span className="inline-block px-3 py-1 rounded-full bg-white/15 text-white text-xs font-medium mb-4">
              SEGUIMIENTO Y PROGRESO
            </span>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-6 text-balance leading-tight">
              Avances
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-white/90 max-w-2xl text-balance leading-relaxed">
              Seguimiento del progreso en la implementación de programas ambientales y cumplimiento de metas del cantón.
            </p>
          </div>
        </section>

        {/* Sección principal de Google Drive */}
        <section className="py-12 sm:py-16 bg-background">
          <div className="container-safe">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Panel izquierdo - Información y Carpetas */}
              <div className="lg:col-span-1">
                <div className="card-elevated p-6 h-fit">
                  <h2 className="text-2xl font-bold text-primary-text mb-6">VISTA DIRECTA</h2>
                  
                  <div className="mb-8">
                    <h3 className="text-lg font-semibold text-gray-800 mb-4">Información</h3>
                    <ul className="space-y-3">
                      <li className="flex items-start">
                        <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center mr-3 mt-0.5">
                          <svg className="w-3 h-3 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                          </svg>
                        </div>
                        <span className="text-gray-700">Documentos actualizados automáticamente</span>
                      </li>
                      <li className="flex items-start">
                        <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center mr-3 mt-0.5">
                          <svg className="w-3 h-3 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd"/>
                          </svg>
                        </div>
                        <span className="text-gray-700">Acceso seguro y controlado</span>
                      </li>
                      <li className="flex items-start">
                        <div className="w-6 h-6 rounded-full bg-purple-100 flex items-center justify-center mr-3 mt-0.5">
                          <svg className="w-3 h-3 text-purple-600" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v3.586L7.707 9.293a1 1 0 00-1.414 1.414l3 3a1 1 0 001.414 0l3-3a1 1 0 00-1.414-1.414L11 10.586V7z" clipRule="evenodd"/>
                          </svg>
                        </div>
                        <span className="text-gray-700">Vista completa sin scroll</span>
                      </li>
                    </ul>
                  </div>

                  <a
                    href="https://drive.google.com/drive/folders/1OuiRdKB0fTZ6IufXDE2mkzwDhAsqMjaG"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center w-full px-4 py-3 bg-gradient-to-r from-green-600 to-green-700 text-white rounded-lg hover:from-green-700 hover:to-green-800 transition-all shadow-md hover:shadow-lg mb-6"
                  >
                    <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M21.35,11.1H12.18V13.83H18.69C18.36,17.64 15.19,19.27 12.19,19.27C8.36,19.27 5,16.25 5,12C5,7.9 8.2,4.73 12.2,4.73C15.29,4.73 17.1,6.7 17.1,6.7L19,4.72C19,4.72 16.56,2 12.1,2C6.42,2 2.03,6.8 2.03,12C2.03,17.05 6.16,22 12.25,22C17.6,22 21.5,18.33 21.5,12.91C21.5,11.76 21.35,11.1 21.35,11.1V11.1Z"/>
                    </svg>
                    <span className="font-semibold">Abrir en Google Drive</span>
                  </a>

                  {/* Sección de Carpetas con flechas desplegables */}
                  <div className="border-t border-gray-200 pt-6">
                    <h3 className="text-lg font-semibold text-gray-800 mb-4">📂 Carpetas Disponibles</h3>
                    <div className="space-y-3">
                      {folders.map(folder => (
                        <div key={folder.id} className="border border-gray-200 rounded-lg overflow-hidden">
                          <button
                            onClick={() => toggleFolder(folder.id)}
                            className="w-full px-4 py-3 bg-gray-50 hover:bg-gray-100 flex items-center justify-between transition-colors"
                          >
                            <span className="font-medium text-gray-800">{folder.name}</span>
                            <svg
                              className={`w-5 h-5 text-gray-500 transition-transform ${expandedFolders[folder.id] ? 'rotate-180' : ''}`}
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                            </svg>
                          </button>
                          
                          {expandedFolders[folder.id] && (
                            <div className="border-t border-gray-200 bg-white">
                              {folder.files.map((file, index) => (
                                <div 
                                  key={index} 
                                  className="px-4 py-3 hover:bg-gray-50 border-b border-gray-100 last:border-b-0 flex justify-between items-center"
                                >
                                  <div className="flex-1 min-w-0">
                                    <p className="text-sm font-medium text-gray-800 truncate">
                                      {file.name}
                                    </p>
                                    <p className="text-xs text-gray-500 mt-1">
                                      {file.date}
                                    </p>
                                  </div>
                                  <a
                                    href="#"
                                    className="ml-2 text-blue-600 hover:text-blue-800 text-xs font-medium whitespace-nowrap"
                                  >
                                    Ver
                                  </a>
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Panel derecho - Vista de Google Drive */}
              <div className="lg:col-span-2">
                <div className="card-elevated p-0 overflow-hidden h-[700px]">
                  <div className="border-b border-gray-200 bg-gray-50 px-6 py-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="flex space-x-1">
                          <div className="w-3 h-3 rounded-full bg-red-400"></div>
                          <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                          <div className="w-3 h-3 rounded-full bg-green-400"></div>
                        </div>
                        <h3 className="text-lg font-semibold text-gray-800">
                          Google Drive - Avances Ambientales
                        </h3>
                      </div>
                      <button 
                        onClick={handleRefresh}
                        className="px-4 py-2 bg-gradient-to-r from-amber-500 to-amber-600 text-white text-sm font-medium rounded-lg hover:from-amber-600 hover:to-amber-700 transition-all shadow hover:shadow-md"
                      >
                        Actualizar
                      </button>
                    </div>
                  </div>

                  {/* Vista embebida de Google Drive - Sin scroll */}
                  <div className="h-[calc(700px-73px)] overflow-hidden">
                    <iframe
                      src={driveFolderUrl}
                      className="w-full h-full border-0"
                      title="Google Drive - Avances Ambientales"
                      allow="autoplay; fullscreen"
                      loading="lazy"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
