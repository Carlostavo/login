"use client"; // <-- Agrega esto al inicio

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { useState } from "react" // Importamos useState

export default function AvancesPage() {
  const [isRefreshing, setIsRefreshing] = useState(false);
  const driveFolderUrl = "https://drive.google.com/embeddedfolderview?id=1OuiRdKB0fTZ6IufXDE2mkzwDhAsqMjaG#list";

  // Función para manejar el clic
  const handleOpenInNewTab = () => {
    window.open("https://drive.google.com/drive/folders/1OuiRdKB0fTZ6IufXDE2mkzwDhAsqMjaG", '_blank');
  };

  // Función para actualizar la vista
  const handleRefreshView = () => {
    setIsRefreshing(true);
    // Forzar recarga del iframe
    const iframe = document.querySelector('iframe[title="Google Drive - Avances Ambientales"]') as HTMLIFrameElement;
    if (iframe) {
      iframe.src = iframe.src; // Recargar iframe
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
              Seguimiento del progreso en la implementación de programas ambientales y cumplimiento de metas del cantón.
            </p>
          </div>
        </section>

        {/* Visualización de Google Drive en tiempo real */}
        <section className="py-12 sm:py-16 md:py-20 lg:py-28 bg-background">
          <div className="container-safe">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
              {/* Columna izquierda - Información y contexto */}
              <div className="lg:col-span-1">
                <span className="inline-block px-3 py-1 rounded-full bg-accent-lighter text-accent font-medium text-xs mb-6">
                  CARPETAS EN TIEMPO REAL
                </span>
                <h2 className="text-2xl sm:text-3xl font-bold text-primary-text mb-4">
                  Documentación y Reportes
                </h2>
                
                <div className="space-y-4 mb-8">
                  <div className="p-4 bg-primary/5 rounded-lg">
                    <h3 className="font-semibold text-primary-text mb-2">📁 Acceso Directo</h3>
                    <p className="text-sm text-secondary-text">
                      Explora los documentos compartidos en Google Drive. Los archivos se actualizan automáticamente.
                    </p>
                  </div>
                  
                  <div className="p-4 bg-green-50 rounded-lg">
                    <h3 className="font-semibold text-primary-text mb-2">🔄 Actualización Automática</h3>
                    <p className="text-sm text-secondary-text">
                      Los cambios en Google Drive se reflejan instantáneamente en esta vista.
                    </p>
                  </div>
                  
                  <div className="p-4 bg-blue-50 rounded-lg">
                    <h3 className="font-semibold text-primary-text mb-2">📊 Tipos de Archivos</h3>
                    <ul className="text-sm text-secondary-text space-y-1">
                      <li>• Documentos de seguimiento</li>
                      <li>• Reportes mensuales</li>
                      <li>• Datos de indicadores</li>
                      <li>• Informes de progreso</li>
                    </ul>
                  </div>
                </div>
                
                <div className="mt-8">
                  <h3 className="font-semibold text-primary-text mb-3">Accesos Rápidos</h3>
                  <div className="space-y-2">
                    <button 
                      onClick={handleOpenInNewTab}
                      className="flex items-center p-3 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors group w-full text-left"
                    >
                      <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center mr-3 group-hover:bg-blue-200 transition-colors">
                        <svg className="w-4 h-4 text-blue-600" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M21.35,11.1H12.18V13.83H18.69C18.36,17.64 15.19,19.27 12.19,19.27C8.36,19.27 5,16.25 5,12C5,7.9 8.2,4.73 12.2,4.73C15.29,4.73 17.1,6.7 17.1,6.7L19,4.72C19,4.72 16.56,2 12.1,2C6.42,2 2.03,6.8 2.03,12C2.03,17.05 6.16,22 12.25,22C17.6,22 21.5,18.33 21.5,12.91C21.5,11.76 21.35,11.1 21.35,11.1V11.1Z"/>
                        </svg>
                      </div>
                      <div>
                        <p className="font-medium text-primary-text">Abrir en Google Drive</p>
                        <p className="text-xs text-gray-500">Acceso completo a todas las funciones</p>
                      </div>
                    </button>
                    
                    <a 
                      href="https://docs.google.com/document/u/0/?tgif=d" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="flex items-center p-3 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors group"
                    >
                      <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center mr-3 group-hover:bg-green-200 transition-colors">
                        <svg className="w-4 h-4 text-green-600" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M14,17H7V15H14M17,13H7V11H17M17,9H7V7H17M19,3H5C3.89,3 3,3.89 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V5C21,3.89 20.1,3 19,3Z"/>
                        </svg>
                      </div>
                      <div>
                        <p className="font-medium text-primary-text">Crear Nuevo Documento</p>
                        <p className="text-xs text-gray-500">Agregar reportes directamente</p>
                      </div>
                    </a>
                  </div>
                </div>
              </div>

              {/* Columna derecha - Vista de Google Drive */}
              <div className="lg:col-span-2">
                <div className="card-elevated overflow-hidden h-full">
                  <div className="p-4 sm:p-6 border-b border-gray-200">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                      <div>
                        <h3 className="text-lg font-semibold text-primary-text">Carpeta: Avances Ambientales</h3>
                        <p className="text-sm text-gray-500 mt-1">
                          Última actualización: En tiempo real
                        </p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                          <span className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></span>
                          Conectado
                        </span>
                        <button 
                          onClick={handleRefreshView}
                          disabled={isRefreshing}
                          className="px-4 py-2 text-sm bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
                        >
                          {isRefreshing ? (
                            <>
                              <svg className="animate-spin h-4 w-4 mr-2 text-white" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                              </svg>
                              Actualizando...
                            </>
                          ) : (
                            <>
                              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path>
                              </svg>
                              Actualizar Vista
                            </>
                          )}
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Contenedor del iframe de Google Drive */}
                  <div className="relative w-full overflow-hidden">
                    <iframe
                      src={driveFolderUrl}
                      className="w-full h-[500px] sm:h-[600px] md:h-[700px]"
                      frameBorder="0"
                      title="Google Drive - Avances Ambientales"
                      allow="autoplay; fullscreen"
                      allowFullScreen
                      key={isRefreshing ? "refreshing" : "normal"}
                    />
                    
                    {/* Overlay informativo al cargar */}
                    <div className="absolute bottom-4 left-4 right-4 p-3 bg-black/70 text-white text-sm rounded-lg backdrop-blur-sm">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M12,2A10,10 0 0,1 22,12A10,10 0 0,1 12,22A10,10 0 0,1 2,12A10,10 0 0,1 12,2M12,4A8,8 0 0,0 4,12A8,8 0 0,0 12,20A8,8 0 0,0 20,12A8,8 0 0,0 12,4M12,6A6,6 0 0,1 18,12A6,6 0 0,1 12,18A6,6 0 0,1 6,12A6,6 0 0,1 12,6Z"/>
                          </svg>
                          <span>Vista de carpetas en tiempo real</span>
                        </div>
                        <button 
                          onClick={handleOpenInNewTab}
                          className="text-blue-300 hover:text-white underline text-xs"
                        >
                          Abrir en nueva pestaña
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Información adicional debajo del iframe */}
                  <div className="p-4 sm:p-6 bg-gray-50">
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      <div className="text-center p-3 bg-white rounded-lg">
                        <div className="text-2xl font-bold text-primary-text">24/7</div>
                        <div className="text-sm text-gray-600">Disponibilidad</div>
                      </div>
                      <div className="text-center p-3 bg-white rounded-lg">
                        <div className="text-2xl font-bold text-primary-text">Automática</div>
                        <div className="text-sm text-gray-600">Sincronización</div>
                      </div>
                      <div className="text-center p-3 bg-white rounded-lg">
                        <div className="text-2xl font-bold text-primary-text">Seguro</div>
                        <div className="text-sm text-gray-600">Acceso controlado</div>
                      </div>
                    </div>
                    
                    <div className="mt-4 pt-4 border-t border-gray-200">
                      <p className="text-sm text-gray-600">
                        <strong>Nota:</strong> Esta vista muestra las carpetas y archivos compartidos de Google Drive. 
                        Para subir nuevos documentos o modificar permisos, accede directamente a Google Drive.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Sección de ayuda */}
            <div className="mt-12 p-6 bg-blue-50 rounded-xl">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <h3 className="text-lg font-semibold text-primary-text mb-2">¿Necesitas ayuda con Google Drive?</h3>
                  <p className="text-secondary-text">
                    Consulta nuestra guía de uso o contacta al administrador del sistema.
                  </p>
                </div>
                <div className="flex gap-3">
                  <button 
                    onClick={() => window.open('/ayuda/google-drive', '_blank')}
                    className="px-4 py-2 text-sm border border-primary text-primary rounded-lg hover:bg-primary/5 transition-colors"
                  >
                    Ver Tutorial
                  </button>
                  <button 
                    onClick={() => window.location.href = '/contacto'}
                    className="px-4 py-2 text-sm bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
                  >
                    Contactar Soporte
                  </button>
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
