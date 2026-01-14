import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { FileText, FolderOpen, Download, Calendar, File } from "lucide-react"

export default function AvancesPage() {
  const driveFolderUrl = "https://drive.google.com/embeddedfolderview?id=1OuiRdKB0fTZ6IufXDE2mkzwDhAsqMjaG#list"
  const directDriveUrl = "https://drive.google.com/drive/folders/1OuiRdKB0fTZ6IufXDE2mkzwDhAsqMjaG"

  // Información de ejemplo para mostrar detalles de archivos comunes
  const fileExamples = [
    { name: "Reporte Ambiental 2024.pdf", size: "2.4 MB", type: "PDF", updated: "2024-01-15" },
    { name: "Plan de Acción Climática.docx", size: "1.8 MB", type: "Documento", updated: "2024-01-10" },
    { name: "Datos de Calidad del Aire.xlsx", size: "3.2 MB", type: "Hoja de cálculo", updated: "2024-01-05" },
    { name: "Fotografías Monitoreo", size: "15.7 MB", type: "Carpeta", updated: "2024-01-12" },
    { name: "Presentación Consejo.pptx", size: "4.5 MB", type: "Presentación", updated: "2023-12-20" },
  ]

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
              Avances y Documentación
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-white/90 max-w-2xl text-balance leading-relaxed">
              Acceso en tiempo real a todos los documentos, reportes y archivos del proyecto ambiental del cantón.
              Los archivos se actualizan automáticamente desde Google Drive.
            </p>
          </div>
        </section>

        {/* Sección principal con Google Drive */}
        <section className="py-12 sm:py-16 md:py-20 lg:py-28 bg-background">
          <div className="container-safe">
            <span className="inline-block px-3 py-1 rounded-full bg-accent-lighter text-accent font-medium text-xs mb-6">
              VISUALIZACIÓN EN TIEMPO REAL
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-primary-text mb-6 sm:mb-8">
              Documentos de Google Drive
            </h2>
            
            <div className="grid lg:grid-cols-3 gap-8">
              {/* Panel izquierdo - Información */}
              <div className="lg:col-span-1 space-y-6">
                <div className="card-elevated p-6">
                  <div className="flex items-center mb-4">
                    <div className="p-2 bg-blue-100 rounded-lg mr-3">
                      <FolderOpen className="w-6 h-6 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg">Carpeta Compartida</h3>
                      <p className="text-sm text-secondary-text">Documentos Ambientales</p>
                    </div>
                  </div>
                  
                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between py-2 border-b">
                      <span className="text-secondary-text">Archivos visibles:</span>
                      <span className="font-medium">Todos los documentos</span>
                    </div>
                    <div className="flex justify-between py-2 border-b">
                      <span className="text-secondary-text">Actualización:</span>
                      <span className="font-medium">En tiempo real</span>
                    </div>
                    <div className="flex justify-between py-2 border-b">
                      <span className="text-secondary-text">Acceso:</span>
                      <span className="font-medium">Público (solo lectura)</span>
                    </div>
                    <div className="flex justify-between py-2">
                      <span className="text-secondary-text">Formato de vista:</span>
                      <span className="font-medium">Lista detallada</span>
                    </div>
                  </div>
                </div>

                {/* Tipos de archivos comunes */}
                <div className="card-elevated p-6">
                  <h3 className="font-semibold mb-4 flex items-center">
                    <FileText className="w-5 h-5 mr-2 text-accent" />
                    Tipos de Archivos Disponibles
                  </h3>
                  <div className="space-y-3">
                    {["Documentos PDF", "Hojas de cálculo", "Presentaciones", "Imágenes", "Carpetas organizadas"].map((type, index) => (
                      <div key={index} className="flex items-center text-sm">
                        <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                        <span>{type}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Acceso rápido */}
                <div className="card-elevated p-6 bg-accent/5 border border-accent/10">
                  <h3 className="font-semibold mb-3">Acceso Directo</h3>
                  <p className="text-sm text-secondary-text mb-4">
                    Para descargar o ver detalles completos de los archivos:
                  </p>
                  <a
                    href={directDriveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center w-full px-4 py-3 bg-accent text-white rounded-lg hover:bg-accent-dark transition-colors text-sm font-medium"
                  >
                    <Download className="w-4 h-4 mr-2" />
                    Abrir en Google Drive
                  </a>
                </div>
              </div>

              {/* Panel derecho - Vista de Google Drive */}
              <div className="lg:col-span-2">
                <div className="card-elevated p-4 sm:p-6 overflow-hidden">
                  <div className="mb-6">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
                      <div>
                        <h3 className="font-semibold text-lg mb-1">Explorador de Archivos</h3>
                        <p className="text-secondary-text text-sm">
                          Navegá por todos los documentos y carpetas disponibles. Los tamaños se muestran junto a cada archivo.
                        </p>
                      </div>
                      <div className="text-sm text-secondary-text bg-gray-50 px-3 py-2 rounded-lg">
                        <div className="flex items-center">
                          <Calendar className="w-4 h-4 mr-2" />
                          Actualizado: {new Date().toLocaleDateString('es-ES')}
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Contenedor del iframe */}
                  <div className="relative w-full overflow-hidden rounded-lg border border-gray-200 bg-white">
                    <div className="flex items-center justify-between px-4 py-3 bg-gray-50 border-b">
                      <div className="flex items-center">
                        <File className="w-5 h-5 text-gray-600 mr-2" />
                        <span className="font-medium text-sm">drive.google.com/drive</span>
                      </div>
                      <span className="text-xs px-2 py-1 bg-green-100 text-green-800 rounded">
                        En vivo
                      </span>
                    </div>
                    
                    <iframe
                      src={driveFolderUrl}
                      className="w-full h-[500px] sm:h-[550px] md:h-[600px]"
                      frameBorder="0"
                      title="Google Drive - Documentos Ambientales"
                      allow="autoplay; fullscreen"
                      sandbox="allow-same-origin allow-scripts allow-popups allow-forms"
                    />
                    
                    <div className="px-4 py-3 bg-gray-50 border-t text-xs text-gray-600">
                      <div className="flex flex-wrap gap-4">
                        <div className="flex items-center">
                          <div className="w-3 h-3 bg-blue-500 rounded mr-2"></div>
                          <span>Carpeta</span>
                        </div>
                        <div className="flex items-center">
                          <div className="w-3 h-3 bg-green-500 rounded mr-2"></div>
                          <span>Documento</span>
                        </div>
                        <div className="flex items-center">
                          <div className="w-3 h-3 bg-red-500 rounded mr-2"></div>
                          <span>Presentación</span>
                        </div>
                        <div className="flex items-center">
                          <div className="w-3 h-3 bg-yellow-500 rounded mr-2"></div>
                          <span>Hoja de cálculo</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Notas importantes */}
                  <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-100">
                    <div className="flex items-start">
                      <div className="flex-shrink-0 mt-0.5">
                        <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center">
                          <span className="text-blue-600 text-sm font-bold">i</span>
                        </div>
                      </div>
                      <div className="ml-3">
                        <h4 className="text-sm font-semibold text-blue-900">Información importante</h4>
                        <ul className="mt-1 text-sm text-blue-800 space-y-1">
                          <li>• Los tamaños de los archivos se muestran automáticamente en Google Drive</li>
                          <li>• Los nombres de autores no son visibles en esta vista pública</li>
                          <li>• Para descargar archivos, abrí la carpeta en Google Drive</li>
                          <li>• Los archivos se organizan por fecha de modificación</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Sección de ayuda */}
        <section className="py-12 bg-gray-50">
          <div className="container-safe">
            <div className="grid md:grid-cols-2 gap-8">
              <div className="card-elevated p-6">
                <h3 className="font-semibold text-lg mb-4 flex items-center">
                  <FileText className="w-5 h-5 mr-2 text-accent" />
                  Cómo usar esta vista
                </h3>
                <ul className="space-y-3 text-sm text-secondary-text">
                  <li className="flex items-start">
                    <span className="inline-block w-6 h-6 bg-accent/10 rounded-full text-accent text-center mr-3 flex-shrink-0">1</span>
                    <span>Navegá por las carpetas haciendo clic en ellas</span>
                  </li>
                  <li className="flex items-start">
                    <span className="inline-block w-6 h-6 bg-accent/10 rounded-full text-accent text-center mr-3 flex-shrink-0">2</span>
                    <span>El tamaño de cada archivo aparece junto a su nombre</span>
                  </li>
                  <li className="flex items-start">
                    <span className="inline-block w-6 h-6 bg-accent/10 rounded-full text-accent text-center mr-3 flex-shrink-0">3</span>
                    <span>Para descargar, abrí el archivo en Google Drive</span>
                  </li>
                  <li className="flex items-start">
                    <span className="inline-block w-6 h-6 bg-accent/10 rounded-full text-accent text-center mr-3 flex-shrink-0">4</span>
                    <span>Los archivos se actualizan automáticamente</span>
                  </li>
                </ul>
              </div>
              
              <div className="card-elevated p-6">
                <h3 className="font-semibold text-lg mb-4 flex items-center">
                  <Download className="w-5 h-5 mr-2 text-accent" />
                  Acceso alternativo
                </h3>
                <p className="text-sm text-secondary-text mb-4">
                  Si tenés problemas para ver los archivos en el navegador:
                </p>
                <div className="space-y-3">
                  <a
                    href={directDriveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50 transition"
                  >
                    <span className="font-medium text-sm">Abrir en Google Drive</span>
                    <span className="text-xs px-2 py-1 bg-gray-100 rounded">Recomendado</span>
                  </a>
                  <div className="text-xs text-secondary-text">
                    <p className="mb-1">📱 Accesible desde cualquier dispositivo</p>
                    <p>🔒 Solo visualización - No se muestran datos de autores</p>
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
