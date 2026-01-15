"use client";

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { useState } from "react"

export default function AvancesPage() {
  const [isRefreshing, setIsRefreshing] = useState(false);
  const driveFolderUrl = "https://drive.google.com/embeddedfolderview?id=1OuiRdKB0fTZ6IufXDE2mkzwDhAsqMjaG#list&view=list&sort=name&order=a&embedded=true&hl=es";

  const handleOpenInNewTab = () => {
    window.open("https://drive.google.com/drive/folders/1OuiRdKB0fTZ6IufXDE2mkzwDhAsqMjaG", '_blank');
  };

  const handleRefreshView = () => {
    setIsRefreshing(true);
    const iframe = document.querySelector('iframe[title="Google Drive - Avances Ambientales"]') as HTMLIFrameElement;
    if (iframe) {
      iframe.src = iframe.src;
    }
    setTimeout(() => setIsRefreshing(false), 1000);
  };

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
              Visualización en tiempo real de documentos y reportes ambientales.
            </p>
          </div>
        </section>

        {/* Visualización de Google Drive */}
        <section className="py-12 sm:py-16 md:py-20 lg:py-28 bg-background">
          <div className="container-safe">
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 lg:gap-10">
              {/* Columna izquierda - Información mínima */}
              <div className="lg:col-span-1">
                <span className="inline-block px-3 py-1 rounded-full bg-accent-lighter text-accent font-medium text-xs mb-6">
                  VISTA DIRECTA
                </span>
                
                <div className="space-y-6">
                  <div className="p-4 bg-primary/5 rounded-lg border border-primary/10">
                    <h3 className="font-semibold text-primary-text mb-3 flex items-center">
                      <svg className="w-5 h-5 mr-2 text-primary" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M10 4H4c-1.11 0-2 .89-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2h-8l-2-2z"/>
                      </svg>
                      Carpetas Compartidas
                    </h3>
                  </div>

                  <div className="p-4 bg-gray-50 rounded-lg">
                    <h3 className="font-semibold text-primary-text mb-3">Información</h3>
                    <div className="space-y-3 text-sm text-secondary-text">
                      <div className="flex items-start">
                        <svg className="w-4 h-4 mt-0.5 mr-2 text-gray-400 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M19 4h-4.18C14.4 2.84 13.3 2 12 2c-1.3 0-2.4.84-2.82 2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm-7 0c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1z"/>
                        </svg>
                        <span>Documentos actualizados automáticamente</span>
                      </div>
                      <div className="flex items-start">
                        <svg className="w-4 h-4 mt-0.5 mr-2 text-gray-400 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4z"/>
                        </svg>
                        <span>Acceso seguro y controlado</span>
                      </div>
                    </div>
                  </div>

                  <button 
                    onClick={handleOpenInNewTab}
                    className="w-full p-3 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors flex items-center justify-center font-medium"
                  >
                    <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M21.35,11.1H12.18V13.83H18.69C18.36,17.64 15.19,19.27 12.19,19.27C8.36,19.27 5,16.25 5,12C5,7.9 8.2,4.73 12.2,4.73C15.29,4.73 17.1,6.7 17.1,6.7L19,4.72C19,4.72 16.56,2 12.1,2C6.42,2 2.03,6.8 2.03,12C2.03,17.05 6.16,22 12.25,22C17.6,22 21.5,18.33 21.5,12.91C21.5,11.76 21.35,11.1 21.35,11.1V11.1Z"/>
                    </svg>
                    Abrir en Google Drive
                  </button>
                </div>
              </div>

              {/* Columna derecha - Vista de Drive */}
              <div className="lg:col-span-3">
                <div className="card-elevated overflow-hidden h-full border border-gray-200">
                  {/* Encabezado simplificado */}
                  <div className="p-4 sm:p-6 border-b border-gray-200 bg-gray-50">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                      <div>
                        <h3 className="text-lg sm:text-xl font-semibold text-primary-text">
                          Google Drive - Avances Ambientales
                        </h3>
                        <p className="text-sm text-gray-600 mt-1">
                          Contenido actualizado automáticamente
                        </p>
                      </div>
                      <button 
                        onClick={handleRefreshView}
                        disabled={isRefreshing}
                        className="px-4 py-2 text-sm bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50 flex items-center justify-center sm:w-auto w-full"
                      >
                        <svg 
                          className={`w-4 h-4 mr-2 ${isRefreshing ? 'animate-spin' : ''}`} 
                          fill="none" 
                          stroke="currentColor" 
                          viewBox="0 0 24 24"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path>
                        </svg>
                        {isRefreshing ? 'Actualizando...' : 'Actualizar'}
                      </button>
                    </div>
                  </div>

                  {/* Vista principal de Google Drive SIN scroll */}
                  <div className="relative overflow-hidden">
                    <iframe
                      src={driveFolderUrl}
                      className="w-full h-[500px] sm:h-[600px] md:h-[700px]"
                      frameBorder="0"
                      title="Google Drive - Avances Ambientales"
                      allow="autoplay; fullscreen"
                      allowFullScreen
                      key={isRefreshing ? "refreshing" : "normal"}
                      scrolling="no"
                      style={{ overflow: "hidden" }}
                    />
                  </div>

                  {/* Estadísticas simplificadas */}
                  <div className="p-4 bg-gray-50 border-t border-gray-200">
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                      <div className="text-center">
                        <div className="text-lg font-semibold text-primary-text">Directo</div>
                        <div className="text-sm text-gray-600">Vista</div>
                      </div>
                      <div className="text-center">
                        <div className="text-lg font-semibold text-primary-text">Automático</div>
                        <div className="text-sm text-gray-600">Actualización</div>
                      </div>
                      <div className="text-center">
                        <div className="text-lg font-semibold text-primary-text">Google</div>
                        <div className="text-sm text-gray-600">Plataforma</div>
                      </div>
                      <div className="text-center">
                        <div className="text-lg font-semibold text-primary-text">Sincronizado</div>
                        <div className="text-sm text-gray-600">Estado</div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Nota informativa simple */}
                <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-100">
                  <p className="text-sm text-gray-700">
                    Esta vista muestra el contenido de la carpeta compartida. Para editar archivos, haz clic en "Abrir en Google Drive".
                  </p>
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
