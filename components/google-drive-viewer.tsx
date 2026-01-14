// components/google-drive-viewer.tsx
"use client";

import { useState, useEffect } from 'react';
import { File, Folder, Download, Eye, Calendar, FileText } from 'lucide-react';

interface DriveItem {
  id: string;
  name: string;
  mimeType: string;
  webViewLink: string;
  iconLink: string;
  modifiedTime: string;
  size?: string;
  thumbnailLink?: string;
}

export default function GoogleDriveViewer() {
  const [files, setFiles] = useState<DriveItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [lastUpdated, setLastUpdated] = useState<string>('');

  const FOLDER_ID = process.env.NEXT_PUBLIC_DRIVE_FOLDER_ID || '1OuiRdKB0fTZ6IufXDE2mkzwDhAsqMjaG';
  const API_KEY = process.env.NEXT_PUBLIC_GOOGLE_API_KEY || 'AIzaSyBOjhZA12tdkDmPVTXjsFBpMqkIN68oKPU';

  useEffect(() => {
    fetchDriveFiles();
    // Actualizar cada 5 minutos
    const interval = setInterval(fetchDriveFiles, 300000);
    return () => clearInterval(interval);
  }, []);

  const fetchDriveFiles = async () => {
    try {
      setLoading(true);
      const response = await fetch(
        `https://www.googleapis.com/drive/v3/files?q='${FOLDER_ID}'+in+parents+and+trashed=false&key=${API_KEY}&fields=files(id,name,mimeType,webViewLink,iconLink,modifiedTime,size,thumbnailLink)&orderBy=modifiedTime+desc`
      );

      if (!response.ok) throw new Error('Error al cargar archivos');

      const data = await response.json();
      setFiles(data.files || []);
      setLastUpdated(new Date().toLocaleTimeString());
      setError(null);
    } catch (err: any) {
      setError(err.message);
      console.error('Error fetching Google Drive files:', err);
    } finally {
      setLoading(false);
    }
  };

  const getFileIcon = (mimeType: string, name: string) => {
    if (mimeType.includes('folder')) return <Folder className="w-6 h-6 text-blue-500" />;
    if (mimeType.includes('pdf')) return <FileText className="w-6 h-6 text-red-500" />;
    if (mimeType.includes('image')) return <FileText className="w-6 h-6 text-green-500" />;
    if (mimeType.includes('word') || mimeType.includes('document')) return <FileText className="w-6 h-6 text-blue-600" />;
    if (mimeType.includes('spreadsheet') || mimeType.includes('excel')) return <FileText className="w-6 h-6 text-green-600" />;
    return <File className="w-6 h-6 text-gray-500" />;
  };

  const formatFileSize = (bytes?: string) => {
    if (!bytes) return '';
    const size = parseInt(bytes);
    if (size < 1024) return size + ' B';
    if (size < 1048576) return (size / 1024).toFixed(1) + ' KB';
    return (size / 1048576).toFixed(1) + ' MB';
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('es-ES', {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    });
  };

  if (loading && files.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-accent mb-4"></div>
        <p className="text-gray-600">Cargando archivos de Google Drive...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header con estadísticas */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <div>
          <h3 className="text-2xl font-bold text-gray-900">Archivos Compartidos</h3>
          <p className="text-gray-600 mt-1">
            {files.length} {files.length === 1 ? 'archivo disponible' : 'archivos disponibles'}
          </p>
        </div>
        <div className="flex items-center gap-4 text-sm text-gray-500">
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4" />
            <span>Actualizado: {lastUpdated}</span>
          </div>
          <button
            onClick={fetchDriveFiles}
            className="px-4 py-2 text-sm bg-accent/10 text-accent rounded-lg hover:bg-accent/20 transition-colors"
          >
            Actualizar
          </button>
        </div>
      </div>

      {/* Mensaje de error */}
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
          <p className="font-medium">Error al cargar archivos</p>
          <p className="text-sm mt-1">{error}</p>
          <p className="text-sm mt-2">
            Puedes acceder directamente desde{' '}
            <a 
              href={`https://drive.google.com/drive/folders/${FOLDER_ID}`}
              target="_blank"
              rel="noopener noreferrer"
              className="underline font-medium"
            >
              Google Drive
            </a>
          </p>
        </div>
      )}

      {/* Grid de archivos */}
      {files.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {files.map((file) => (
            <div
              key={file.id}
              className="bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
            >
              {/* Header de la tarjeta */}
              <div className="p-5 border-b border-gray-100">
                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0">
                    {getFileIcon(file.mimeType, file.name)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-semibold text-gray-900 truncate">
                      {file.name}
                    </h4>
                    <div className="flex items-center gap-3 mt-2 text-xs text-gray-500">
                      {file.size && (
                        <span>{formatFileSize(file.size)}</span>
                      )}
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        {formatDate(file.modifiedTime)}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Acciones */}
              <div className="p-4 bg-gray-50">
                <div className="flex justify-between items-center">
                  <a
                    href={file.webViewLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <Eye className="w-4 h-4" />
                    Ver
                  </a>
                  {!file.mimeType.includes('folder') && (
                    <a
                      href={`https://drive.google.com/uc?export=download&id=${file.id}`}
                      className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-accent rounded-lg hover:bg-accent/90 transition-colors"
                    >
                      <Download className="w-4 h-4" />
                      Descargar
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : !loading && !error ? (
        <div className="text-center py-12 bg-gray-50 rounded-xl">
          <File className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h4 className="text-lg font-semibold text-gray-700 mb-2">No hay archivos disponibles</h4>
          <p className="text-gray-500 mb-4">La carpeta de Google Drive está vacía</p>
          <a
            href={`https://drive.google.com/drive/folders/${FOLDER_ID}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 bg-accent text-white rounded-lg hover:bg-accent/90 transition-colors"
          >
            <Folder className="w-5 h-5" />
            Abrir Google Drive
          </a>
        </div>
      ) : null}

      {/* Footer informativo */}
      <div className="mt-8 pt-6 border-t border-gray-200">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <p className="text-sm text-gray-600">
              📁 Todos los archivos se actualizan automáticamente desde Google Drive
            </p>
            <p className="text-sm text-gray-500 mt-1">
              La información se sincroniza en tiempo real con la carpeta compartida
            </p>
          </div>
          <a
            href={`https://drive.google.com/drive/folders/${FOLDER_ID}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm text-accent hover:text-accent/80 font-medium"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path fill="currentColor" d="M10 9.75v4.5h4v-4.5zM3 9.75v4.5h4v-4.5zm14 0v4.5h4v-4.5zM10 6v4.5h4V6zM3 6v4.5h4V6zm14 0v4.5h4V6zM10 13.5v4.5h4v-4.5zM3 13.5v4.5h4v-4.5zm14 0v4.5h4v-4.5z"/>
            </svg>
            Ver vista completa en Google Drive
          </a>
        </div>
      </div>
    </div>
  );
}
