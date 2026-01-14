import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { FileText, FolderOpen, Download, Calendar, BarChart, Eye } from "lucide-react";

export default function AvancesPage() {
  const driveFolderUrl = "https://drive.google.com/embeddedfolderview?id=1OuiRdKB0fTZ6IufXDE2mkzwDhAsqMjaG#list";
  const directDriveUrl = "https://drive.google.com/drive/folders/1OuiRdKB0fTZ6IufXDE2mkzwDhAsqMjaG";

  // Datos de ejemplo para estadísticas
  const stats = [
    { label: "Documentos activos", value: "48", icon: <FileText className="w-5 h-5" /> },
    { label: "Carpetas compartidas", value: "12", icon: <FolderOpen className="w-5 h-5" /> },
    { label: "Última actualización", value: "Hoy", icon: <Calendar className="w-5 h-5" /> },
    { label: "Total de visitas", value: "1.2K", icon: <Eye className="w-5 h-5" /> },
  ];

  // Categorías de documentos
  const categories = [
    { name: "Reportes Anuales", count: 8, color: "bg-blue-100 text-blue-800" },
    { name: "Estudios Técnicos", count: 12, color: "bg-green-100 text-green-800" },
    { name: "Indicadores", count: 15, color: "bg-purple-100 text-purple-800" },
    { name: "Presentaciones", count: 6, color: "bg-amber-100 text-amber-800" },
    { name: "Datos Abiertos", count: 7, color: "bg-cyan-100 text-cyan-800" },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-background overflow-x-hidden">
      <Header />
      <main className="flex-grow w-full">
        {/* Hero Section */}
        <section className="relative overflow-hidden bg-gradient-to-br from-primary via-primary-dark to-accent text-white">
          <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-10"></div>
          <div className="container-safe relative z-10 py-12 sm:py-16 md:py-20 lg:py-24">
            <div className="max-w-3xl">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/20 backdrop-blur-sm mb-6">
                <BarChart className="w-4 h-4" />
                <span className="text-sm font-medium">SEGUIMIENTO EN TIEMPO REAL</span>
              </div>
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 tracking-tight">
                Avances y<span className="block text-accent-lighter">Documentación</span>
              </h1>
              <p className="text-lg sm:text-xl text-white/90 mb-8 leading-relaxed max-w-2xl">
                Acceso directo a todos los documentos, reportes y avances del cantón. 
                Visualización en tiempo real de carpetas compartidas en Google Drive.
              </p>
              <div className="flex flex-wrap gap-4">
                <a 
                  href={directDriveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-white text-primary font-semibold rounded-lg hover:bg-gray-100 transition-all hover:scale-105"
                >
                  <FolderOpen className="w-5 h-5" />
                  Explorar en Google Drive
                </a>
                <button className="inline-flex items-center gap-2 px-6 py-3 bg-transparent border-2 border-white/30 text-white rounded-lg hover:bg-white/10 transition-all">
                  <Download className="w-5 h-5" />
                  Guía de uso
                </button>
              </div>
            </div>
          </div>
          {/* Wave divider */}
          <div className="absolute bottom-0 left-0 right-0">
            <svg className="w-full h-12 text-background" viewBox="0 0 1200 120" preserveAspectRatio="none">
              <path d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z" fill="currentColor"/>
            </svg>
          </div>
        </section>

        {/* Estadísticas */}
        <section className="py-8 bg-gray-50">
          <div className="container-safe">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {stats.map((stat, index) => (
                <div key={index} className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                      <p className="text-sm text-gray-600 mt-1">{stat.label}</p>
                    </div>
                    <div className="text-primary">
                      {stat.icon}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Vista Principal de Google Drive */}
        <section className="py-12 sm:py-16 md:py-20 lg:py-24 bg-background">
          <div className="container-safe">
            <div className="max-w-6xl mx-auto">
              {/* Header de la sección */}
              <div className="text-center mb-10">
                <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
                  Documentación <span className="text-primary">Compartida</span>
                </h2>
                <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                  Visualiza y accede a todos los documentos oficiales. Los archivos se actualizan automáticamente 
                  desde Google Drive en tiempo real.
                </p>
              </div>

              {/* Categorías */}
              <div className="mb-8">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Categorías de documentos</h3>
                <div className="flex flex-wrap gap-3">
                  {categories.map((category, index) => (
                    <span 
                      key={index}
                      className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium ${category.color}`}
                    >
                      {category.name}
                      <span className="bg-white/50 px-2 py-0.5 rounded-full text-xs">
                        {category.count}
                      </span>
                    </span>
                  ))}
                </div>
              </div>

              {/* Contenedor Principal */}
              <div className="bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden">
                {/* Barra de herramientas */}
                <div className="border-b border-gray-200 bg-gray-50 px-6 py-4">
                  <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-primary/10 rounded-lg">
                        <FolderOpen className="w-6 h-6 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900">Carpeta: Avances Cantonales</h3>
                        <p className="text-sm text-gray-500">Actualizado automáticamente desde Google Drive</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <a 
                        href={directDriveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors text-sm font-medium"
                      >
                        <FolderOpen className="w-4 h-4" />
                        Abrir en nueva pestaña
                      </a>
                    </div>
                  </div>
                </div>

                {/* Vista de Google Drive */}
                <div className="p-1 sm:p-2">
                  <div className="relative rounded-xl overflow-hidden border border-gray-300 bg-gradient-to-br from-gray-50 to-white">
                    <div className="absolute top-4 right-4 z-10">
                      <div className="flex items-center gap-2 px-3 py-1.5 bg-white/90 backdrop-blur-sm rounded-lg border border-gray-200 shadow-sm">
                        <div className="flex items-center gap-1.5">
                          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                          <span className="text-xs font-medium text-gray-700">Conectado</span>
                        </div>
                      </div>
                    </div>
                    
                    <iframe
                      src={driveFolderUrl}
                      className="w-full h-[500px] sm:h-[600px] md:h-[700px]"
                      frameBorder="0"
                      title="Google Drive - Documentos Cantonales"
                      allow="autoplay; fullscreen; clipboard-write"
                      loading="lazy"
                    />
                  </div>
                </div>

                {/* Información adicional */}
                <div className="border-t border-gray-200 bg-gray-50 px-6 py-4">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="space-y-2">
                      <h4 className="font-semibold text-gray-900 text-sm">📋 Instrucciones</h4>
                      <ul className="text-sm text-gray-600 space-y-1">
                        <li>• Haz clic en cualquier archivo para previsualizarlo</li>
                        <li>• Usa el botón de descarga para guardar copias</li>
                        <li>• Los cambios se reflejan automáticamente</li>
                      </ul>
                    </div>
                    <div className="space-y-2">
                      <h4 className="font-semibold text-gray-900 text-sm">🔒 Seguridad</h4>
                      <ul className="text-sm text-gray-600 space-y-1">
                        <li>• Conexión segura con Google</li>
                        <li>• Acceso de solo lectura</li>
                        <li>• Datos actualizados en tiempo real</li>
                      </ul>
                    </div>
                    <div className="space-y-2">
                      <h4 className="font-semibold text-gray-900 text-sm">📞 Soporte</h4>
                      <p className="text-sm text-gray-600">
                        ¿Problemas para acceder? Contacta a nuestro equipo técnico en 
                        <a href="mailto:soporte@canton.com" className="text-primary hover:underline ml-1">
                          soporte@canton.com
                        </a>
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Métodos alternativos de acceso */}
              <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-6 border border-blue-200">
                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-blue-100 rounded-lg">
                      <Download className="w-6 h-6 text-blue-600" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2">Descarga masiva</h4>
                      <p className="text-sm text-gray-600 mb-4">
                        ¿Necesitas todos los documentos? Solicita un archivo comprimido con toda la documentación.
                      </p>
                      <button className="text-sm text-blue-600 font-medium hover:text-blue-700">
                        Solicitar descarga completa →
                      </button>
                    </div>
                  </div>
                </div>

                <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-6 border border-green-200">
                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-green-100 rounded-lg">
                      <BarChart className="w-6 h-6 text-green-600" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2">API de Datos</h4>
                      <p className="text-sm text-gray-600 mb-4">
                        Para desarrolladores: accede a los datos mediante nuestra API RESTful.
                      </p>
                      <button className="text-sm text-green-600 font-medium hover:text-green-700">
                        Ver documentación de API →
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Sección de información adicional */}
        <section className="py-12 bg-gray-50">
          <div className="container-safe">
            <div className="max-w-4xl mx-auto text-center">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">
                Transparencia y <span className="text-primary">Acceso Público</span>
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-10">
                <div className="p-6">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                    <Eye className="w-6 h-6 text-primary" />
                  </div>
                  <h4 className="font-semibold text-gray-900 mb-2">Visibilidad Total</h4>
                  <p className="text-gray-600 text-sm">
                    Todos los documentos públicos del cantón disponibles para consulta ciudadana.
                  </p>
                </div>
                <div className="p-6">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                    <Calendar className="w-6 h-6 text-primary" />
                  </div>
                  <h4 className="font-semibold text-gray-900 mb-2">Actualización Constante</h4>
                  <p className="text-gray-600 text-sm">
                    Los documentos se actualizan automáticamente manteniendo la información actual.
                  </p>
                </div>
                <div className="p-6">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                    <FileText className="w-6 h-6 text-primary" />
                  </div>
                  <h4 className="font-semibold text-gray-900 mb-2">Documentación Completa</h4>
                  <p className="text-gray-600 text-sm">
                    Reportes, estudios, indicadores y presentaciones organizadas por categorías.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
