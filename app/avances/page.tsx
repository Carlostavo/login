import { Header } from "@/components/header";
import { Footer } from "@/components/footer";

export default function AvancesPage() {
  const driveFolderUrl = "https://drive.google.com/embeddedfolderview?id=1OuiRdKB0fTZ6IufXDE2mkzwDhAsqMjaG#list";

  return (
    <div className="flex flex-col min-h-screen bg-background overflow-x-hidden">
      <Header />
      <main className="flex-grow w-full">
        <section className="gradient-eco text-white py-12 sm:py-16 md:py-20 lg:py-28 relative overflow-hidden">
          {/* ... (tu código existente) */}
        </section>

        {/* Sección de visualización de Google Drive */}
        <section className="py-12 sm:py-16 md:py-20 lg:py-28 bg-background">
          <div className="container-safe">
            <span className="inline-block px-3 py-1 rounded-full bg-accent-lighter text-accent font-medium text-xs mb-6">
              ARCHIVOS EN TIEMPO REAL
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-primary-text mb-6 sm:mb-8">
              Documentos y Reportes
            </h2>
            
            <div className="card-elevated p-4 sm:p-6 overflow-hidden">
              <div className="mb-4">
                <p className="text-secondary-text mb-4">
                  Explorá los documentos, carpetas y archivos compartidos de Google Drive:
                </p>
              </div>
              
              {/* Contenedor del iframe con dimensiones responsivas */}
              <div className="relative w-full overflow-hidden rounded-lg border border-gray-200">
                <iframe
                  src={driveFolderUrl}
                  className="w-full h-[500px] sm:h-[600px] md:h-[700px]"
                  frameBorder="0"
                  title="Google Drive Folder"
                  allow="autoplay; fullscreen"
                />
              </div>
              
              <div className="mt-4 text-sm text-gray-500">
                <p>📁 Los archivos se actualizan automáticamente desde Google Drive.</p>
                <p>🔗 <a 
                  href="https://drive.google.com/drive/folders/1OuiRdKB0fTZ6IufXDE2mkzwDhAsqMjaG" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-accent hover:underline"
                >
                  Abrir en Google Drive
                </a></p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
