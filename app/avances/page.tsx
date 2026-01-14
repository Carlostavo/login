"use client";

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { useState } from "react"
import { FileText, RefreshCw, ExternalLink, Folder, BarChart, Download, Calendar, Users, Shield } from "lucide-react"

export default function AvancesPage() {
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [activeView, setActiveView] = useState<'grid' | 'list'>('grid');
  const driveFolderUrl = "https://drive.google.com/embeddedfolderview?id=1OuiRdKB0fTZ6IufXDE2mkzwDhAsqMjaG#list";

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

  // Métricas simuladas (puedes reemplazar con datos reales)
  const metrics = [
    { label: "Documentos totales", value: "247", icon: <FileText className="w-4 h-4" />, change: "+12%" },
    { label: "Carpetas activas", value: "18", icon: <Folder className="w-4 h-4" />, change: "+3" },
    { label: "Actualización", value: "Hoy", icon: <Calendar className="w-4 h-4" />, change: "15:30" },
    { label: "Colaboradores", value: "24", icon: <Users className="w-4 h-4" />, change: "Activos" },
  ];

  const fileCategories = [
    { name: "Reportes Mensuales", count: 12, color: "bg-blue-500" },
    { name: "Datos de Indicadores", count: 45, color: "bg-green-500" },
    { name: "Planificación", count: 8, color: "bg-purple-500" },
    { name: "Evaluaciones", count: 23, color: "bg-amber-500" },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-background overflow-x-hidden">
      <Header />
      <main className="flex-grow w-full">
        {/* Hero Section */}
        <section className="gradient-eco text-white py-12 sm:py-16 md:py-20 lg:py-28 relative overflow-hidden">
          <div className="absolute inset-0 bg-black/5"></div>
          <div className="container-safe relative z-10">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
              <div className="max-w-2xl">
                <span className="inline-flex items-center px-3 py-1 rounded-full bg-white/15 text-white text-xs font-medium mb-4">
                  <Shield className="w-3 h-3 mr-1" />
                  PLATAFORMA DE GESTIÓN DOCUMENTAL
                </span>
                <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-6 text-balance leading-tight">
                  Centro de Documentación
                </h1>
                <p className="text-base sm:text-lg md:text-xl text-white/90 max-w-2xl text-balance leading-relaxed">
                  Acceso centralizado a todos los documentos, reportes y avances del programa ambiental en tiempo real.
                </p>
              </div>
              <div className="flex items-center space-x-3">
                <button
                  onClick={handleRefreshView}
                  disabled={isRefreshing}
                  className="px-4 py-2.5 text-sm bg-white/20 hover:bg-white/30 text-white rounded-lg transition-all duration-200 flex items-center backdrop-blur-sm"
                >
                  <RefreshCw className={`w-4 h-4 mr-2 ${isRefreshing ? 'animate-spin' : ''}`} />
                  {isRefreshing ? 'Sincronizando...' : 'Sincronizar'}
                </button>
                <button
                  onClick={handleOpenInNewTab}
                  className="px-4 py-2.5 text-sm bg-white text-primary hover:bg-gray-100 rounded-lg transition-all duration-200 flex items-center"
                >
                  <ExternalLink className="w-4 h-4 mr-2" />
                  Abrir en Drive
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Dashboard Section */}
        <section className="py-8 sm:py-12 bg-gray-50/50">
          <div className="container-safe">
            {/* Métricas */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
              {metrics.map((metric, index) => (
                <div key={index} className="bg-white rounded-xl p-4 border border-gray-100 shadow-sm">
                  <div className="flex items-center justify-between mb-2">
                    <div className="p-2 bg-primary/10 rounded-lg">
                      <div className="text-primary">
                        {metric.icon}
                      </div>
                    </div>
                    <span className="text-xs font-medium px-2 py-1 rounded-full bg-green-50 text-green-700">
                      {metric.change}
                    </span>
                  </div>
                  <div className="text-2xl font-bold text-gray-900">{metric.value}</div>
                  <div className="text-sm text-gray-600">{metric.label}</div>
                </div>
              ))}
            </div>

            {/* Vista principal */}
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
              {/* Panel lateral */}
              <div className="lg:col-span-1 space-y-6">
                {/* Categorías */}
                <div className="bg-white rounded-xl border border-gray-200 p-6">
                  <h3 className="font-semibold text-gray-900 mb-4 flex items-center">
                    <BarChart className="w-4 h-4 mr-2 text-primary" />
                    Categorías
                  </h3>
                  <div className="space-y-3">
                    {fileCategories.map((category, index) => (
                      <div key={index} className="flex items-center justify-between p-2 hover:bg-gray-50 rounded-lg transition-colors">
                        <div className="flex items-center">
                          <div className={`w-3 h-3 rounded-full ${category.color} mr-3`}></div>
                          <span className="text-sm text-gray-700">{category.name}</span>
                        </div>
                        <span className="text-xs font-medium bg-gray-100 text-gray-700 px-2 py-1 rounded">
                          {category.count}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Acciones rápidas */}
                <div className="bg-white rounded-xl border border-gray-200 p-6">
                  <h3 className="font-semibold text-gray-900 mb-4">Acciones Rápidas</h3>
                  <div className="space-y-2">
                    <button className="w-full flex items-center p-3 text-left hover:bg-gray-50 rounded-lg transition-colors group">
                      <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center mr-3 group-hover:bg-blue-200 transition-colors">
                        <svg className="w-4 h-4 text-blue-600" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M19,13H13V19H11V13H5V11H11V5H13V11H19V13Z" />
                        </svg>
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">Subir Documento</p>
                        <p className="text-xs text-gray-500">Agregar nuevo archivo</p>
                      </div>
                    </button>
                    <button className="w-full flex items-center p-3 text-left hover:bg-gray-50 rounded-lg transition-colors group">
                      <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center mr-3 group-hover:bg-green-200 transition-colors">
                        <svg className="w-4 h-4 text-green-600" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M17,9H7V7H17M17,13H7V11H17M14,17H7V15H14M12,3A1,1 0 0,1 13,4A1,1 0 0,1 12,5A1,1 0 0,1 11,4A1,1 0 0,1 12,3M19,3H14.82C14.4,1.84 13.3,1 12,1C10.7,1 9.6,1.84 9.18,3H5A2,2 0 0,0 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V5A2,2 0 0,0 19,3Z" />
                        </svg>
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">Nueva Carpeta</p>
                        <p className="text-xs text-gray-500">Organizar documentos</p>
                      </div>
                    </button>
                  </div>
                </div>

                {/* Información del sistema */}
                <div className="bg-gradient-to-br from-primary/5 to-primary/10 rounded-xl border border-primary/20 p-6">
                  <div className="flex items-start mb-3">
                    <Shield className="w-5 h-5 text-primary mr-2 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold text-gray-900">Sistema Seguro</h4>
                      <p className="text-xs text-gray-600 mt-1">
                        Todos los documentos están protegidos con encriptación de nivel empresarial.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center text-xs text-gray-500">
                    <div className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></div>
                    Sistema sincronizado y operativo
                  </div>
                </div>
              </div>

              {/* Vista principal de Google Drive */}
              <div className="lg:col-span-3">
                <div className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm">
                  {/* Header del visualizador */}
                  <div className="p-6 border-b border-gray-200">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                      <div>
                        <h2 className="text-xl font-bold text-gray-900">Explorador de Documentos</h2>
                        <p className="text-sm text-gray-600 mt-1">
                          Visualización en tiempo real de la carpeta: <span className="font-medium">Avances Ambientales</span>
                        </p>
                      </div>
                      <div className="flex items-center space-x-3">
                        <div className="flex bg-gray-100 rounded-lg p-1">
                          <button
                            onClick={() => setActiveView('grid')}
                            className={`px-3 py-1.5 rounded text-sm font-medium transition-colors ${activeView === 'grid' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-600'}`}
                          >
                            Cuadrícula
                          </button>
                          <button
                            onClick={() => setActiveView('list')}
                            className={`px-3 py-1.5 rounded text-sm font-medium transition-colors ${activeView === 'list' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-600'}`}
                          >
                            Lista
                          </button>
                        </div>
                        <div className="hidden sm:block h-6 w-px bg-gray-300"></div>
                        <button
                          onClick={handleOpenInNewTab}
                          className="px-4 py-2 text-sm border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors flex items-center"
                        >
                          <Download className="w-4 h-4 mr-2" />
                          Exportar
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Vista de Google Drive */}
                  <div className="relative">
                    <div className="absolute top-4 left-4 z-10">
                      <div className="bg-white/95 backdrop-blur-sm rounded-lg px-3 py-2 shadow-sm border border-gray-200">
                        <div className="flex items-center text-sm text-gray-700">
                          <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                          <span>Conectado a Google Drive</span>
                        </div>
                      </div>
                    </div>

                    <iframe
                      src={driveFolderUrl}
                      className="w-full h-[600px] sm:h-[700px] md:h-[800px]"
                      frameBorder="0"
                      title="Google Drive - Avances Ambientales"
                      allow="autoplay; fullscreen"
                      allowFullScreen
                    />

                    {/* Overlay de información */}
                    <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2">
                      <div className="bg-black/80 backdrop-blur-sm text-white text-sm rounded-lg px-4 py-2 flex items-center space-x-4">
                        <span className="flex items-center">
                          <FileText className="w-4 h-4 mr-2" />
                          Documentos compartidos
                        </span>
                        <div className="h-4 w-px bg-white/30"></div>
                        <button
                          onClick={handleOpenInNewTab}
                          className="text-blue-300 hover:text-white flex items-center transition-colors"
                        >
                          <ExternalLink className="w-4 h-4 mr-1" />
                          Acceso completo
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Footer informativo */}
                  <div className="p-6 bg-gray-50/50 border-t border-gray-200">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <div className="flex items-start space-x-3">
                        <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                          <svg className="w-5 h-5 text-blue-600" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M12,20A8,8 0 0,1 4,12A8,8 0 0,1 12,4A8,8 0 0,1 20,12A8,8 0 0,1 12,20M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M12,12.5A1.5,1.5 0 0,1 10.5,11A1.5,1.5 0 0,1 12,9.5A1.5,1.5 0 0,1 13.5,11A1.5,1.5 0 0,1 12,12.5M12,7.2C9.9,7.2 8.2,8.9 8.2,11C8.2,14 12,17.5 12,17.5C12,17.5 15.8,14 15.8,11C15.8,8.9 14.1,7.2 12,7.2Z" />
                          </svg>
                        </div>
                        <div>
                          <h4 className="font-medium text-gray-900">Ubicación Centralizada</h4>
                          <p className="text-sm text-gray-600 mt-1">
                            Todos los documentos ambientales en un solo lugar accesible.
                          </p>
                        </div>
                      </div>
                      <div className="flex items-start space-x-3">
                        <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                          <svg className="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M12,2C6.5,2 2,6.5 2,12C2,17.5 6.5,22 12,22C17.5,22 22,17.5 22,12C22,6.5 17.5,2 12,2M12,4C16.4,4 20,7.6 20,12C20,16.4 16.4,20 12,20C7.6,20 4,16.4 4,12C4,7.6 7.6,4 12,4M16.2,9.3L10.4,15.1L7.8,12.5L6.4,13.9L10.4,17.9L17.6,10.7L16.2,9.3Z" />
                          </svg>
                        </div>
                        <div>
                          <h4 className="font-medium text-gray-900">Actualización Automática</h4>
                          <p className="text-sm text-gray-600 mt-1">
                            Los cambios se reflejan instantáneamente para todos los usuarios.
                          </p>
                        </div>
                      </div>
                      <div className="flex items-start space-x-3">
                        <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0">
                          <svg className="w-5 h-5 text-purple-600" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M12,15C12.81,15 13.5,14.7 14.11,14.11C14.7,13.5 15,12.81 15,12C15,11.19 14.7,10.5 14.11,9.89C13.5,9.3 12.81,9 12,9C11.19,9 10.5,9.3 9.89,9.89C9.3,10.5 9,11.19 9,12C9,12.81 9.3,13.5 9.89,14.11C10.5,14.7 11.19,15 12,15M12,2C14.75,2 17.1,3 19.05,4.95C21,6.9 22,9.25 22,12C22,14.75 21,17.1 19.05,19.05C17.1,21 14.75,22 12,22C9.25,22 6.9,21 4.95,19.05C3,17.1 2,14.75 2,12C2,9.25 3,6.9 4.95,4.95C6.9,3 9.25,2 12,2Z" />
                          </svg>
                        </div>
                        <div>
                          <h4 className="font-medium text-gray-900">Colaboración en Tiempo Real</h4>
                          <p className="text-sm text-gray-600 mt-1">
                            Múltiples usuarios pueden trabajar simultáneamente.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Nota informativa */}
                <div className="mt-6 p-4 bg-blue-50 border border-blue-100 rounded-lg">
                  <div className="flex items-start">
                    <svg className="w-5 h-5 text-blue-600 mr-3 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M13,9H11V7H13M13,17H11V11H13M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2Z" />
                    </svg>
                    <div>
                      <p className="text-sm text-blue-800">
                        <strong>Nota:</strong> Esta plataforma proporciona acceso de solo lectura a los documentos compartidos. 
                        Para editar archivos o modificar permisos, acceda directamente a Google Drive con credenciales autorizadas.
                      </p>
                    </div>
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
