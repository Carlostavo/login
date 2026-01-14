// app/avances/page.tsx
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import GoogleDriveViewer from "@/components/google-drive-viewer";
import { FileText, TrendingUp, BarChart, RefreshCw } from 'lucide-react';

export default function AvancesPage() {
  return (
    <div className="flex flex-col min-h-screen bg-background overflow-x-hidden">
      <Header />
      
      <main className="flex-grow w-full">
        {/* Hero Section */}
        <section className="gradient-eco text-white py-12 sm:py-16 md:py-20 lg:py-28 relative overflow-hidden">
          <div className="absolute inset-0 bg-black/5"></div>
          <div className="absolute top-10 right-10 opacity-10">
            <FileText className="w-48 h-48" />
          </div>
          <div className="container-safe relative z-10">
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/15 text-white text-sm font-medium mb-4">
              <RefreshCw className="w-4 h-4" />
              ACTUALIZACIÓN EN TIEMPO REAL
            </span>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-6 text-balance leading-tight">
              Documentos y Avances
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-white/90 max-w-2xl text-balance leading-relaxed">
              Accede a los documentos, reportes y archivos compartidos desde Google Drive.
              Toda la información se actualiza automáticamente.
            </p>
            
            {/* Estadísticas rápidas */}
            <div className="flex flex-wrap gap-4 mt-8">
              <div className="flex items-center gap-2 px-4 py-2 bg-white/10 rounded-lg backdrop-blur-sm">
                <TrendingUp className="w-5 h-5" />
                <span className="text-sm">Sincronización en vivo</span>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 bg-white/10 rounded-lg backdrop-blur-sm">
                <BarChart className="w-5 h-5" />
                <span className="text-sm">Acceso inmediato</span>
              </div>
            </div>
          </div>
        </section>

        {/* Sección principal con Google Drive */}
        <section className="py-12 sm:py-16 md:py-20 lg:py-24 bg-background">
          <div className="container-safe">
            {/* Tarjetas informativas superiores */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
              <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 bg-blue-50 rounded-lg">
                    <FileText className="w-6 h-6 text-blue-600" />
                  </div>
                  <h3 className="font-semibold text-gray-900">Documentos Actualizados</h3>
                </div>
                <p className="text-gray-600 text-sm">
                  Todos los archivos se sincronizan automáticamente desde Google Drive
                </p>
              </div>
              
              <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 bg-green-50 rounded-lg">
                    <RefreshCw className="w-6 h-6 text-green-600" />
                  </div>
                  <h3 className="font-semibold text-gray-900">Actualización Automática</h3>
                </div>
                <p className="text-gray-600 text-sm">
                  Los cambios en Drive se reflejan en tiempo real en esta página
                </p>
              </div>
              
              <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 bg-purple-50 rounded-lg">
                    <BarChart className="w-6 h-6 text-purple-600" />
                  </div>
                  <h3 className="font-semibold text-gray-900">Acceso Directo</h3>
                </div>
                <p className="text-gray-600 text-sm">
                  Visualiza y descarga documentos sin necesidad de iniciar sesión
                </p>
              </div>
            </div>

            {/* Componente de Google Drive */}
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-200">
              <div className="px-8 py-6 bg-gradient-to-r from-gray-50 to-white border-b border-gray-200">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                  <div>
                    <span className="inline-block px-4 py-1.5 rounded-full bg-accent-lighter text-accent font-medium text-xs mb-3">
                      GOOGLE DRIVE INTEGRADO
                    </span>
                    <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">
                      Archivos Compartidos
                    </h2>
                    <p className="text-gray-600 mt-2 max-w-2xl">
                      Explora los documentos, reportes y archivos almacenados en la carpeta compartida de Google Drive.
                      Cada modificación se actualiza automáticamente.
                    </p>
                  </div>
                  <a
                    href="https://drive.google.com/drive/folders/1OuiRdKB0fTZ6IufXDE2mkzwDhAsqMjaG"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-5 py-3 bg-accent text-white rounded-lg hover:bg-accent/90 transition-colors whitespace-nowrap"
                  >
                    <svg className="w-5 h-5" viewBox="0 0 24 24">
                      <path fill="currentColor" d="M10 9.75v4.5h4v-4.5zM3 9.75v4.5h4v-4.5zm14 0v4.5h4v-4.5zM10 6v4.5h4V6zM3 6v4.5h4V6zm14 0v4.5h4V6zM10 13.5v4.5h4v-4.5zM3 13.5v4.5h4v-4.5zm14 0v4.5h4v-4.5z"/>
                    </svg>
                    Abrir Drive
                  </a>
                </div>
              </div>
              
              <div className="p-6 sm:p-8">
                <GoogleDriveViewer />
              </div>
            </div>

            {/* Información adicional */}
            <div className="mt-10 bg-gradient-to-r from-gray-50 to-blue-50 rounded-2xl p-8">
              <div className="max-w-3xl mx-auto text-center">
                <h3 className="text-xl font-bold text-gray-900 mb-4">
                  ¿Necesitas subir o modificar archivos?
                </h3>
                <p className="text-gray-700 mb-6">
                  Para agregar nuevos documentos o modificar los existentes, accede directamente a la carpeta de Google Drive.
                  Los cambios se reflejarán automáticamente en esta página.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <a
                    href="https://drive.google.com/drive/folders/1OuiRdKB0fTZ6IufXDE2mkzwDhAsqMjaG"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-6 py-3 bg-accent text-white rounded-lg hover:bg-accent/90 transition-colors font-medium"
                  >
                    Agregar archivos a Drive
                  </a>
                  <button
                    onClick={() => window.location.reload()}
                    className="px-6 py-3 bg-white text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors font-medium"
                  >
                    Actualizar página
                  </button>
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
