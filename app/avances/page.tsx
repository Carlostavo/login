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

        {/* Sección principal de Google Drive */}
        <section className="py-12 sm:py-16 bg-background">
          <div className="container-safe">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Panel izquierdo - Información */}
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
                    className="flex items-center justify-center w-full px-4 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all shadow-md hover:shadow-lg mb-6"
                  >
                    <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M21.35,11.1H12.18V13.83H18.69C18.36,17.64 15.19,19.27 12.19,19.27C8.36,19.27 5,16.25 5,12C5,7.9 8.2,4.73 12.2,4.73C15.29,4.73 17.1,6.7 17.1,6.7L19,4.72C19,4.72 16.56,2 12.1,2C6.42,2 2.03,6.8 2.03,12C2.03,17.05 6.16,22 12.25,22C17.6,22 21.5,18.33 21.5,12.91C21.5,11.76 21.35,11.1 21.35,11.1V11.1Z"/>
                    </svg>
                    <span className="font-semibold">Abrir en Google Drive</span>
                  </a>

                  <div className="border-t border-gray-200 pt-6">
                    <h3 className="text-lg font-semibold text-gray-800 mb-4">
                      Google Drive - Avances Ambientales
                    </h3>
                    <p className="text-gray-600 mb-6">
                      Visualización completa de documentos
                    </p>

                    <div className="overflow-hidden rounded-lg border border-gray-200">
                      <div className="bg-gray-50 px-4 py-3 border-b border-gray-200">
                        <div className="grid grid-cols-3 gap-4">
                          <div className="font-medium text-gray-700">TÍTULO</div>
                          <div className="font-medium text-gray-700">ÚLTIMA MODIFICACIÓN</div>
                          <div className="font-medium text-gray-700 text-right"></div>
                        </div>
                      </div>
                      
                      <div className="divide-y divide-gray-100">
                        {/* Ejemplo de archivo 1 */}
                        <div className="px-4 py-3 hover:bg-gray-50 transition-colors">
                          <div className="grid grid-cols-3 gap-4 items-center">
                            <div className="flex items-center">
                              <div className="w-8 h-8 bg-blue-100 rounded flex items-center justify-center mr-3">
                                <span className="text-blue-600 font-medium">A</span>
                              </div>
                              <span className="text-gray-800 font-medium truncate">análisis</span>
                            </div>
                            <div className="text-gray-600">
                              <div>1:39 p.m.</div>
                              <div className="text-sm text-gray-500">Indicadores Daule</div>
                            </div>
                            <div className="text-right">
                              <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                                Ver →
                              </button>
                            </div>
                          </div>
                        </div>
                        
                        {/* Ejemplo de archivo 2 */}
                        <div className="px-4 py-3 hover:bg-gray-50 transition-colors">
                          <div className="grid grid-cols-3 gap-4 items-center">
                            <div className="flex items-center">
                              <div className="w-8 h-8 bg-purple-100 rounded flex items-center justify-center mr-3">
                                <span className="text-purple-600 font-medium">P</span>
                              </div>
                              <span className="text-gray-800 font-medium truncate">How to Use a Dictionary by Slidesgo.pptx</span>
                            </div>
                            <div className="text-gray-600">
                              <div>13 ene</div>
                              <div className="text-sm text-gray-500">Indicadores Daule</div>
                            </div>
                            <div className="text-right">
                              <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                                Ver →
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <button className="mt-6 w-full flex items-center justify-center px-4 py-3 bg-gray-800 text-white rounded-lg hover:bg-gray-900 transition-colors">
                      <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/>
                      </svg>
                      Actualizar
                    </button>
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
                      <div className="flex items-center space-x-2">
                        <span className="text-sm text-gray-500">
                          ID: 1OuiRdKB0fTZ6IufXDE2mkzwDhAsqMjaG
                        </span>
                      </div>
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

                {/* Notas informativas */}
                <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-blue-50 border border-blue-100 rounded-lg p-4">
                    <div className="flex items-start">
                      <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-3 flex-shrink-0">
                        <svg className="w-4 h-4 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd"/>
                        </svg>
                      </div>
                      <div>
                        <h4 className="font-semibold text-blue-800 mb-1">Vista optimizada</h4>
                        <p className="text-sm text-blue-700">
                          La vista embebida se actualiza automáticamente con los cambios en Google Drive.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-green-50 border border-green-100 rounded-lg p-4">
                    <div className="flex items-start">
                      <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center mr-3 flex-shrink-0">
                        <svg className="w-4 h-4 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                        </svg>
                      </div>
                      <div>
                        <h4 className="font-semibold text-green-800 mb-1">Acceso instantáneo</h4>
                        <p className="text-sm text-green-700">
                          Todos los documentos están disponibles para visualización inmediata.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Sección de información adicional */}
            <div className="mt-12 pt-8 border-t border-gray-200">
              <div className="text-center">
                <h3 className="text-xl font-bold text-primary-text mb-4">Documentación relacionada</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
                  <a href="#" className="group">
                    <div className="bg-gray-50 rounded-lg p-6 hover:bg-gray-100 transition-colors">
                      <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4 group-hover:bg-blue-200">
                        <svg className="w-6 h-6 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M6 2a2 2 0 00-2 2v12a2 2 0 002 2h8a2 2 0 002-2V7.414A2 2 0 0015.414 6L12 2.586A2 2 0 0010.586 2H6zm5 6a1 1 0 10-2 0v3.586l-1.293-1.293a1 1 0 10-1.414 1.414l3 3a1 1 0 001.414 0l3-3a1 1 0 00-1.414-1.414L11 11.586V8z" clipRule="evenodd"/>
                        </svg>
                      </div>
                      <h4 className="font-semibold text-gray-800 mb-2">Descargar archivos</h4>
                      <p className="text-sm text-gray-600">Guía para descargar documentos</p>
                    </div>
                  </a>

                  <a href="#" className="group">
                    <div className="bg-gray-50 rounded-lg p-6 hover:bg-gray-100 transition-colors">
                      <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-4 group-hover:bg-green-200">
                        <svg className="w-6 h-6 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd"/>
                        </svg>
                      </div>
                      <h4 className="font-semibold text-gray-800 mb-2">Organización</h4>
                      <p className="text-sm text-gray-600">Estructura de carpetas</p>
                    </div>
                  </a>

                  <a href="#" className="group">
                    <div className="bg-gray-50 rounded-lg p-6 hover:bg-gray-100 transition-colors">
                      <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-4 group-hover:bg-purple-200">
                        <svg className="w-6 h-6 text-purple-600" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd"/>
                        </svg>
                      </div>
                      <h4 className="font-semibold text-gray-800 mb-2">Ayuda y soporte</h4>
                      <p className="text-sm text-gray-600">Problemas de acceso</p>
                    </div>
                  </a>
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
