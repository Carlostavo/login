import { Header } from "@/components/header"
import { Footer } from "@/components/footer"

export default function AvancesPage() {
  const driveFolderUrl = "https://drive.google.com/embeddedfolderview?id=1OuiRdKB0fTZ6IufXDE2mkzwDhAsqMjaG#list"

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

        {/* Sección de visualización de Google Drive */}
        <section className="py-12 sm:py-16 md:py-20 lg:py-28 bg-background">
          <div className="container-safe">
            <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
              {/* Panel izquierdo - Información */}
              <div className="lg:w-2/3">
                <div className="mb-8">
                  <span className="inline-block px-3 py-1 rounded-full bg-accent-lighter text-accent font-medium text-xs mb-4">
                    VISUALIZACIÓN EN TIEMPO REAL
                  </span>
                  <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-primary-text mb-4">
                    Documentos y Reportes
                  </h2>
                  <p className="text-secondary-text text-base sm:text-lg leading-relaxed mb-6">
                    Explora los documentos, carpetas y archivos compartidos en Google Drive. 
                    Los archivos se actualizan automáticamente desde Google Drive.
                  </p>
                  
                  {/* Estadísticas informativas */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
                    <div className="bg-gray-50 rounded-lg p-4">
                      <div className="text-2xl font-bold text-accent mb-1">📁</div>
                      <h3 className="font-semibold text-gray-800 mb-1">Carpetas Activas</h3>
                      <p className="text-sm text-gray-600">Organizadas por proyectos</p>
                    </div>
                    <div className="bg-gray-50 rounded-lg p-4">
                      <div className="text-2xl font-bold text-accent mb-1">📄</div>
                      <h3 className="font-semibold text-gray-800 mb-1">Actualización Automática</h3>
                      <p className="text-sm text-gray-600">Sincronizado en tiempo real</p>
                    </div>
                    <div className="bg-gray-50 rounded-lg p-4">
                      <div className="text-2xl font-bold text-accent mb-1">🔗</div>
                      <h3 className="font-semibold text-gray-800 mb-1">Acceso Directo</h3>
                      <p className="text-sm text-gray-600">Ver archivos originales</p>
                    </div>
                  </div>
                </div>

                {/* Contenedor del iframe con dimensiones responsivas */}
                <div className="card-elevated overflow-hidden p-2 sm:p-4">
                  <div className="relative w-full overflow-hidden rounded-lg border border-gray-200 bg-white">
                    <div className="border-b border-gray-200 bg-gray-50 px-4 py-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <div className="w-3 h-3 rounded-full bg-red-500"></div>
                          <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                          <div className="w-3 h-3 rounded-full bg-green-500"></div>
                          <span className="text-sm font-medium text-gray-700 ml-2">
                            Google Drive - Carpeta Compartida
                          </span>
                        </div>
                        <a 
                          href="https://drive.google.com/drive/folders/1OuiRdKB0fTZ6IufXDE2mkzwDhAsqMjaG" 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-sm text-accent hover:underline flex items-center"
                        >
                          <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M19 19H5V5h7V3H5a2 2 0 00-2 2v14a2 2 0 002 2h14c1.1 0 2-.9 2-2v-7h-2v7zM14 3v2h3.59l-9.83 9.83 1.41 1.41L19 6.41V10h2V3h-7z"/>
                          </svg>
                          Abrir original
                        </a>
                      </div>
                    </div>
                    
                    <iframe
                      src={driveFolderUrl}
                      className="w-full h-[500px] sm:h-[600px] md:h-[700px]"
                      frameBorder="0"
                      title="Google Drive Folder - Avances Ambientales"
                      allow="autoplay; fullscreen"
                      loading="lazy"
                    />
                  </div>
                  
                  {/* Instrucciones de uso */}
                  <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                    <h4 className="font-semibold text-blue-800 mb-2 flex items-center">
                      <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z"/>
                      </svg>
                      Cómo usar esta vista
                    </h4>
                    <ul className="text-sm text-blue-700 space-y-1">
                      <li>• Haz clic en cualquier archivo para previsualizarlo</li>
                      <li>• Usa los botones de navegación dentro del iframe</li>
                      <li>• Los archivos se ordenan por fecha de modificación</li>
                      <li>• Para descargar, haz clic en "Abrir original"</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Panel derecho - Información adicional */}
              <div className="lg:w-1/3">
                <div className="sticky top-8 space-y-6">
                  <div className="card-elevated p-6">
                    <h3 className="font-bold text-lg text-primary-text mb-4">📋 Tipos de Documentos</h3>
                    <ul className="space-y-3">
                      <li className="flex items-center">
                        <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                        <span className="text-secondary-text">Reportes de avances mensuales</span>
                      </li>
                      <li className="flex items-center">
                        <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                        <span className="text-secondary-text">Estudios técnicos</span>
                      </li>
                      <li className="flex items-center">
                        <div className="w-2 h-2 bg-purple-500 rounded-full mr-3"></div>
                        <span className="text-secondary-text">Documentos de seguimiento</span>
                      </li>
                      <li className="flex items-center">
                        <div className="w-2 h-2 bg-orange-500 rounded-full mr-3"></div>
                        <span className="text-secondary-text">Presentaciones ejecutivas</span>
                      </li>
                      <li className="flex items-center">
                        <div className="w-2 h-2 bg-red-500 rounded-full mr-3"></div>
                        <span className="text-secondary-text">Informes finales</span>
                      </li>
                    </ul>
                  </div>

                  <div className="card-elevated p-6">
                    <h3 className="font-bold text-lg text-primary-text mb-4">🔄 Frecuencia de Actualización</h3>
                    <div className="space-y-4">
                      <div>
                        <div className="flex justify-between mb-1">
                          <span className="text-sm font-medium text-gray-700">Reportes diarios</span>
                          <span className="text-sm font-medium text-accent">Cada 24h</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div className="bg-green-600 h-2 rounded-full w-full"></div>
                        </div>
                      </div>
                      <div>
                        <div className="flex justify-between mb-1">
                          <span className="text-sm font-medium text-gray-700">Semanales</span>
                          <span className="text-sm font-medium text-accent">Cada 7 días</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div className="bg-blue-600 h-2 rounded-full w-3/4"></div>
                        </div>
                      </div>
                      <div>
                        <div className="flex justify-between mb-1">
                          <span className="text-sm font-medium text-gray-700">Mensuales</span>
                          <span className="text-sm font-medium text-accent">Cada 30 días</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div className="bg-purple-600 h-2 rounded-full w-1/2"></div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="card-elevated p-6">
                    <h3 className="font-bold text-lg text-primary-text mb-4">📥 Acceso Directo</h3>
                    <p className="text-secondary-text text-sm mb-4">
                      Si necesitas subir archivos o tener acceso completo:
                    </p>
                    <a
                      href="https://drive.google.com/drive/folders/1OuiRdKB0fTZ6IufXDE2mkzwDhAsqMjaG"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center w-full px-4 py-3 bg-gray-800 text-white rounded-lg hover:bg-gray-900 transition-colors"
                    >
                      <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M21.35,11.1H12.18V13.83H18.69C18.36,17.64 15.19,19.27 12.19,19.27C8.36,19.27 5,16.25 5,12C5,7.9 8.2,4.73 12.2,4.73C15.29,4.73 17.1,6.7 17.1,6.7L19,4.72C19,4.72 16.56,2 12.1,2C6.42,2 2.03,6.8 2.03,12C2.03,17.05 6.16,22 12.25,22C17.6,22 21.5,18.33 21.5,12.91C21.5,11.76 21.35,11.1 21.35,11.1V11.1Z"/>
                      </svg>
                      Abrir en Google Drive
                    </a>
                    <p className="text-xs text-gray-500 mt-3 text-center">
                      Se abrirá en una nueva pestaña
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Información adicional */}
            <div className="mt-12 pt-8 border-t border-gray-200">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h4 className="font-semibold text-primary-text mb-3">ℹ️ Acerca de esta vista</h4>
                  <p className="text-secondary-text text-sm">
                    Esta visualización muestra en tiempo real los archivos almacenados en Google Drive. 
                    Los cambios que realices en Google Drive se reflejarán automáticamente aquí.
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold text-primary-text mb-3">🔒 Privacidad y Seguridad</h4>
                  <p className="text-secondary-text text-sm">
                    Solo se muestran archivos públicos o compartidos con el enlace. 
                    No se requieren credenciales de acceso para visualizar los documentos.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Sección de contacto para más información */}
        <section className="py-12 bg-gray-50">
          <div className="container-safe">
            <div className="text-center">
              <h3 className="text-xl font-bold text-primary-text mb-4">¿Necesitas más información?</h3>
              <p className="text-secondary-text mb-6 max-w-2xl mx-auto">
                Si tienes problemas para acceder a los documentos o necesitas permisos adicionales, 
                contacta al equipo de gestión documental.
              </p>
              <a
                href="/contacto"
                className="inline-flex items-center px-6 py-3 bg-accent text-white rounded-lg hover:bg-accent-dark transition-colors"
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
                </svg>
                Contactar equipo
              </a>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
