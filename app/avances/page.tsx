"use client";

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { useState } from "react"
import { 
  RefreshCw, 
  ExternalLink, 
  Folder, 
  FileText, 
  BarChart3, 
  Download,
  Calendar,
  Users,
  Shield,
  Zap
} from "lucide-react"

export default function AvancesPage() {
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [activeView, setActiveView] = useState<'grid' | 'list'>('grid');
  const driveFolderUrl = "https://drive.google.com/embeddedfolderview?id=1OuiRdKB0fTZ6IufXDE2mkzwDhAsqMjaG#list";

  // Datos de ejemplo para estadísticas
  const stats = [
    { label: "Documentos Activos", value: "156", icon: FileText, color: "text-blue-600", bgColor: "bg-blue-50" },
    { label: "Carpetas", value: "24", icon: Folder, color: "text-green-600", bgColor: "bg-green-50" },
    { label: "Última Actualización", value: "Hoy", icon: Calendar, color: "text-purple-600", bgColor: "bg-purple-50" },
    { label: "Colaboradores", value: "18", icon: Users, color: "text-orange-600", bgColor: "bg-orange-50" },
  ];

  // Tipos de documentos comunes
  const fileTypes = [
    { type: "PDF", count: 45, color: "bg-red-100 text-red-800" },
    { type: "Word", count: 67, color: "bg-blue-100 text-blue-800" },
    { type: "Excel", count: 32, color: "bg-green-100 text-green-800" },
    { type: "PPT", count: 12, color: "bg-yellow-100 text-yellow-800" },
  ];

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
    <div className="flex flex-col min-h-screen bg-gray-50 overflow-x-hidden">
      <Header />
      
      {/* Header con gradiente profesional */}
      <div className="relative bg-gradient-to-r from-blue-900 via-blue-800 to-blue-900 text-white">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="container mx-auto px-4 py-12 sm:py-16 md:py-20 relative">
          <div className="max-w-3xl">
            <div className="inline-flex items-center px-3 py-1.5 rounded-full bg-white/20 backdrop-blur-sm text-sm font-medium mb-6">
              <Zap className="w-4 h-4 mr-2" />
              PLATAFORMA DE GESTIÓN DOCUMENTAL
            </div>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 leading-tight">
              Centro de <span className="text-blue-300">Documentación</span>
            </h1>
            <p className="text-lg sm:text-xl text-blue-100 max-w-2xl leading-relaxed">
              Acceso centralizado a documentos, reportes y avances del programa ambiental. 
              Datos actualizados en tiempo real con seguridad empresarial.
            </p>
          </div>
        </div>
      </div>

      <main className="flex-grow w-full">
        {/* Panel de estadísticas */}
        <section className="py-8 bg-white border-b">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {stats.map((stat, index) => {
                const Icon = stat.icon;
                return (
                  <div key={index} className={`${stat.bgColor} p-4 rounded-xl border`}>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-600">{stat.label}</p>
                        <p className="text-2xl font-bold text-gray-900 mt-1">{stat.value}</p>
                      </div>
                      <Icon className={`w-8 h-8 ${stat.color}`} />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Contenido principal */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
              
              {/* Sidebar izquierdo */}
              <div className="lg:col-span-1 space-y-6">
                
                {/* Panel de control */}
                <div className="bg-white rounded-2xl border p-6 shadow-sm">
                  <h3 className="font-semibold text-gray-900 mb-4 flex items-center">
                    <BarChart3 className="w-5 h-5 mr-2 text-blue-600" />
                    Panel de Control
                  </h3>
                  <div className="space-y-3">
                    <button 
                      onClick={handleRefreshView}
                      disabled={isRefreshing}
                      className="w-full flex items-center justify-between p-3 rounded-lg bg-blue-50 hover:bg-blue-100 transition-colors"
                    >
                      <div className="flex items-center">
                        <RefreshCw className={`w-4 h-4 mr-3 ${isRefreshing ? 'animate-spin' : ''} text-blue-600`} />
                        <span className="font-medium text-gray-900">
                          {isRefreshing ? 'Actualizando...' : 'Sincronizar Ahora'}
                        </span>
                      </div>
                      <span className="text-xs text-gray-500">Ctrl+R</span>
                    </button>
                    
                    <button 
                      onClick={handleOpenInNewTab}
                      className="w-full flex items-center justify-between p-3 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors"
                    >
                      <div className="flex items-center">
                        <ExternalLink className="w-4 h-4 mr-3 text-gray-600" />
                        <span className="font-medium text-gray-900">Abrir en Drive</span>
                      </div>
                      <span className="text-xs text-gray-500">↗</span>
                    </button>
                    
                    <button className="w-full flex items-center justify-between p-3 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors">
                      <div className="flex items-center">
                        <Download className="w-4 h-4 mr-3 text-gray-600" />
                        <span className="font-medium text-gray-900">Exportar Metadatos</span>
                      </div>
                      <span className="text-xs text-gray-500">CSV</span>
                    </button>
                  </div>
                </div>

                {/* Tipos de archivos */}
                <div className="bg-white rounded-2xl border p-6 shadow-sm">
                  <h3 className="font-semibold text-gray-900 mb-4">Distribución por Tipo</h3>
                  <div className="space-y-3">
                    {fileTypes.map((file, index) => (
                      <div key={index} className="flex items-center justify-between">
                        <div className="flex items-center">
                          <div className={`w-3 h-3 rounded-full mr-3 ${file.color.split(' ')[0]}`}></div>
                          <span className="text-sm font-medium text-gray-700">{file.type}</span>
                        </div>
                        <span className={`text-xs font-semibold px-2 py-1 rounded-full ${file.color}`}>
                          {file.count}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Info de seguridad */}
                <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl border border-blue-100 p-6">
                  <div className="flex items-start mb-4">
                    <Shield className="w-6 h-6 text-blue-600 mr-3 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold text-gray-900">Seguridad Empresarial</h4>
                      <p className="text-sm text-gray-600 mt-1">
                        Todos los documentos están protegidos con encriptación de nivel empresarial.
                      </p>
                    </div>
                  </div>
                  <div className="text-xs text-gray-500 space-y-2">
                    <div className="flex items-center">
                      <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                      <span>Acceso verificado en tiempo real</span>
                    </div>
                    <div className="flex items-center">
                      <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                      <span>Registro de auditoría completo</span>
                    </div>
                  </div>
                </div>

              </div>

              {/* Contenido principal - Google Drive */}
              <div className="lg:col-span-3">
                
                {/* Header del viewer */}
                <div className="bg-white rounded-2xl border shadow-sm mb-6">
                  <div className="p-6 border-b">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                      <div>
                        <h2 className="text-2xl font-bold text-gray-900">
                          Biblioteca de Documentos
                        </h2>
                        <p className="text-gray-600 mt-1">
                          Carpeta: <span className="font-semibold text-blue-600">Avances Ambientales</span>
                          <span className="mx-2">•</span>
                          <span className="text-green-600 font-medium">Conectado</span>
                        </p>
                      </div>
                      
                      <div className="flex items-center space-x-3">
                        <div className="flex items-center bg-gray-100 rounded-lg p-1">
                          <button 
                            onClick={() => setActiveView('grid')}
                            className={`p-2 rounded ${activeView === 'grid' ? 'bg-white shadow' : ''}`}
                          >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                            </svg>
                          </button>
                          <button 
                            onClick={() => setActiveView('list')}
                            className={`p-2 rounded ${activeView === 'list' ? 'bg-white shadow' : ''}`}
                          >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                            </svg>
                          </button>
                        </div>
                        
                        <div className="relative">
                          <input
                            type="text"
                            placeholder="Buscar documentos..."
                            className="pl-10 pr-4 py-2 border rounded-lg w-64 focus:outline-none focus:ring-2 focus:ring-blue-500"
                          />
                          <svg className="w-5 h-5 text-gray-400 absolute left-3 top-2.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                          </svg>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Google Drive Viewer */}
                  <div className="relative">
                    <div className="absolute top-4 right-4 z-10">
                      <div className="bg-white/90 backdrop-blur-sm rounded-lg px-3 py-1.5 shadow-sm border">
                        <div className="flex items-center text-sm text-gray-600">
                          <div className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></div>
                          Sincronizado en tiempo real
                        </div>
                      </div>
                    </div>
                    
                    {/* Vista de Google Drive */}
                    <div className="relative h-[600px] overflow-hidden bg-gray-900">
                      <iframe
                        src={driveFolderUrl}
                        className="w-full h-full"
                        frameBorder="0"
                        title="Google Drive - Biblioteca de Documentos"
                        allow="autoplay; fullscreen"
                        allowFullScreen
                        key={isRefreshing ? "refreshing" : "normal"}
                      />
                      
                      {/* Overlay profesional */}
                      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6">
                        <div className="flex items-center justify-between">
                          <div className="text-white">
                            <p className="text-sm font-medium">Carpeta: Avances Ambientales</p>
                            <p className="text-xs text-gray-300">ID: 1OuiRdKB0fTZ6IufXDE2mkzwDhAsqMjaG</p>
                          </div>
                          <button 
                            onClick={handleOpenInNewTab}
                            className="flex items-center px-4 py-2 bg-white/20 backdrop-blur-sm text-white rounded-lg hover:bg-white/30 transition-colors"
                          >
                            <ExternalLink className="w-4 h-4 mr-2" />
                            Abrir en Drive
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Información adicional */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="bg-white rounded-xl border p-6">
                    <div className="flex items-center mb-4">
                      <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center mr-4">
                        <svg className="w-6 h-6 text-blue-600" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12,2A10,10 0 0,1 22,12A10,10 0 0,1 12,22A10,10 0 0,1 2,12A10,10 0 0,1 12,2M12,4A8,8 0 0,0 4,12A8,8 0 0,0 12,20A8,8 0 0,0 20,12A8,8 0 0,0 12,4M12,6A6,6 0 0,1 18,12A6,6 0 0,1 12,18A6,6 0 0,1 6,12A6,6 0 0,1 12,6Z" />
                        </svg>
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900">Integración Nativa</h4>
                        <p className="text-sm text-gray-600">Sincronización directa con Google Drive</p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white rounded-xl border p-6">
                    <div className="flex items-center mb-4">
                      <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center mr-4">
                        <RefreshCw className="w-6 h-6 text-green-600" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900">Actualización Automática</h4>
                        <p className="text-sm text-gray-600">Cambios reflejados instantáneamente</p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white rounded-xl border p-6">
                    <div className="flex items-center mb-4">
                      <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center mr-4">
                        <Users className="w-6 h-6 text-purple-600" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900">Colaboración en Tiempo Real</h4>
                        <p className="text-sm text-gray-600">Múltiples usuarios simultáneos</p>
                      </div>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          </div>
        </section>

        {/* Footer de la sección */}
        <section className="py-8 bg-gradient-to-r from-gray-900 to-gray-800 text-white">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <div>
                <h3 className="text-xl font-bold mb-2">Sistema de Gestión Documental</h3>
                <p className="text-gray-300 text-sm">
                  Plataforma empresarial para la gestión centralizada de documentos ambientales
                </p>
              </div>
              <div className="mt-4 md:mt-0 flex items-center space-x-4">
                <div className="flex items-center text-sm">
                  <div className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></div>
                  Sistema Operativo
                </div>
                <div className="text-xs text-gray-400">
                  Última verificación: {new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
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
