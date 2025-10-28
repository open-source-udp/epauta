import { useState } from "react";
import { Viewer, Worker } from "@react-pdf-viewer/core";
import { defaultLayoutPlugin } from "@react-pdf-viewer/default-layout";

import "@react-pdf-viewer/full-screen/lib/styles/index.css";
import "@react-pdf-viewer/core/lib/styles/index.css";
import "@react-pdf-viewer/default-layout/lib/styles/index.css";
import "@react-pdf-viewer/toolbar/lib/styles/index.css";

const FileViewer = ({ fileUrl, fileName }) => {
  const defaultLayoutPluginInstance = defaultLayoutPlugin();
  const [zoomLevel, setZoomLevel] = useState(1);

  // Detectar el tipo de archivo basado en la extensión
  const getFileExtension = (url) => {
    if (!url) return '';
    const urlWithoutParams = url.split('?')[0];
    const parts = urlWithoutParams.split('.');
    // Si no tiene extensión o solo tiene el nombre, retornar 'pdf' por defecto
    if (parts.length === 1) return 'pdf';
    return parts.pop().toLowerCase();
  };

  const extension = getFileExtension(fileUrl || fileName);

  // Funciones de zoom
  const handleZoomIn = () => {
    setZoomLevel(prev => Math.min(prev + 0.25, 3));
  };

  const handleZoomOut = () => {
    setZoomLevel(prev => Math.max(prev - 0.25, 0.5));
  };

  const handleResetZoom = () => {
    setZoomLevel(1);
  };

  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = fileUrl;
    link.download = fileName || 'archivo';
    link.target = '_blank';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Toolbar universal
  const Toolbar = () => (
    <div style={{
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      padding: "0.5rem 1rem",
      backgroundColor: "#fff",
      borderBottom: "1px solid #e5e7eb",
      gap: "0.5rem",
      position: "sticky",
      top: 0,
      zIndex: 10
    }}>
      <div style={{
        fontSize: "0.875rem",
        color: "#6b7280",
        fontWeight: "500",
        maxWidth: "60%",
        overflow: "hidden",
        textOverflow: "ellipsis",
        whiteSpace: "nowrap"
      }}>
        {fileName || "Archivo"}
      </div>

      <div style={{
        display: "flex",
        gap: "0.25rem"
      }}>
        <button
          onClick={handleZoomOut}
          style={{
            padding: "0.5rem 0.75rem",
            backgroundColor: "#f3f4f6",
            border: "1px solid #e5e7eb",
            borderRadius: "0.25rem",
            cursor: "pointer",
            fontSize: "1rem",
            fontWeight: "bold",
            color: "#374151",
            transition: "all 0.2s"
          }}
          onMouseOver={(e) => {
            e.target.style.backgroundColor = "#e5e7eb";
          }}
          onMouseOut={(e) => {
            e.target.style.backgroundColor = "#f3f4f6";
          }}
          title="Zoom Out"
        >
          −
        </button>

        <button
          onClick={handleResetZoom}
          style={{
            padding: "0.5rem 0.75rem",
            backgroundColor: "#f3f4f6",
            border: "1px solid #e5e7eb",
            borderRadius: "0.25rem",
            cursor: "pointer",
            fontSize: "0.75rem",
            color: "#374151",
            transition: "all 0.2s",
            minWidth: "3rem"
          }}
          onMouseOver={(e) => {
            e.target.style.backgroundColor = "#e5e7eb";
          }}
          onMouseOut={(e) => {
            e.target.style.backgroundColor = "#f3f4f6";
          }}
          title="Reset Zoom"
        >
          {Math.round(zoomLevel * 100)}%
        </button>

        <button
          onClick={handleZoomIn}
          style={{
            padding: "0.5rem 0.75rem",
            backgroundColor: "#f3f4f6",
            border: "1px solid #e5e7eb",
            borderRadius: "0.25rem",
            cursor: "pointer",
            fontSize: "1rem",
            fontWeight: "bold",
            color: "#374151",
            transition: "all 0.2s"
          }}
          onMouseOver={(e) => {
            e.target.style.backgroundColor = "#e5e7eb";
          }}
          onMouseOut={(e) => {
            e.target.style.backgroundColor = "#f3f4f6";
          }}
          title="Zoom In"
        >
          +
        </button>

        <div style={{
          width: "1px",
          backgroundColor: "#e5e7eb",
          margin: "0 0.25rem"
        }} />

        <button
          onClick={handleDownload}
          style={{
            padding: "0.5rem 0.75rem",
            backgroundColor: "#ef4444",
            border: "1px solid #ef4444",
            borderRadius: "0.25rem",
            cursor: "pointer",
            fontSize: "1rem",
            color: "#fff",
            transition: "all 0.2s"
          }}
          onMouseOver={(e) => {
            e.target.style.backgroundColor = "#dc2626";
          }}
          onMouseOut={(e) => {
            e.target.style.backgroundColor = "#ef4444";
          }}
          title="Descargar"
        >
          Descargar
        </button>
      </div>
    </div>
  );

  // Renderizar según el tipo de archivo
  const renderViewer = () => {
    // PDFs (incluyendo archivos sin extensión) - Sin toolbar personalizada
    if (extension === 'pdf' || !extension) {
      return (
        <div style={{ height: "80vh", border: "1px solid #ccc" }}>
          <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.4.120/build/pdf.worker.min.js">
            <Viewer fileUrl={fileUrl} plugins={[defaultLayoutPluginInstance]} />
          </Worker>
        </div>
      );
    }

    // Imágenes (JPEG, JPG, PNG, GIF, WEBP)
    if (['jpg', 'jpeg', 'png', 'gif', 'webp'].includes(extension)) {
      return (
        <div style={{ height: "80vh", border: "1px solid #ccc", display: "flex", flexDirection: "column" }}>
          <Toolbar />
          <div style={{
            flex: 1,
            backgroundColor: "#f5f5f5",
            overflow: "auto",
            padding: "1rem"
          }}>
            <div style={{
              display: "inline-block",
              minWidth: "100%",
              textAlign: "center"
            }}>
              <img
                src={fileUrl}
                alt={fileName || "Archivo"}
                style={{
                  display: "inline-block",
                  maxWidth: "none",
                  width: `calc(100% * ${zoomLevel})`,
                  height: "auto",
                  transition: "width 0.2s ease",
                  verticalAlign: "middle"
                }}
              />
            </div>
          </div>
        </div>
      );
    }

    // Documentos de Office (DOC, DOCX, XLS, XLSX, PPT, PPTX)
    if (['doc', 'docx', 'xls', 'xlsx', 'ppt', 'pptx'].includes(extension)) {
      // Usar Google Docs Viewer para documentos de Office
      const viewerUrl = `https://docs.google.com/viewer?url=${encodeURIComponent(fileUrl)}&embedded=true`;

      return (
        <div style={{ height: "80vh", border: "1px solid #ccc", display: "flex", flexDirection: "column" }}>
          <Toolbar />
          <div style={{
            flex: 1,
            overflow: "hidden",
            transform: `scale(${zoomLevel})`,
            transformOrigin: "top left",
            transition: "transform 0.2s ease",
            width: `${100 / zoomLevel}%`,
            height: `${100 / zoomLevel}%`
          }}>
            <iframe
              src={viewerUrl}
              style={{
                width: "100%",
                height: "100%",
                border: "none"
              }}
              title={fileName || "Documento"}
            />
          </div>
        </div>
      );
    }

    // Tipo de archivo no soportado
    return (
      <div style={{ height: "80vh", border: "1px solid #ccc", display: "flex", flexDirection: "column" }}>
        <Toolbar />
        <div style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "2rem",
          textAlign: "center",
          backgroundColor: "#f9f9f9"
        }}>
          <div style={{
            fontSize: "3rem",
            marginBottom: "1rem",
            color: "#999"
          }}>
            📄
          </div>
          <h3 style={{
            color: "#333",
            marginBottom: "0.5rem"
          }}>
            Vista previa no disponible
          </h3>
          <p style={{
            color: "#999",
            fontSize: "0.875rem"
          }}>
            Usa el botón de descarga en la barra superior
          </p>
        </div>
      </div>
    );
  };

  return renderViewer();
};

export default FileViewer;
