import { Viewer, Worker } from "@react-pdf-viewer/core";
import { defaultLayoutPlugin } from "@react-pdf-viewer/default-layout";

import "@react-pdf-viewer/full-screen/lib/styles/index.css";
import "@react-pdf-viewer/core/lib/styles/index.css";
import "@react-pdf-viewer/default-layout/lib/styles/index.css";
import "@react-pdf-viewer/toolbar/lib/styles/index.css";

const FileViewer = ({ fileUrl, fileName }) => {
  const defaultLayoutPluginInstance = defaultLayoutPlugin();

  // Detectar el tipo de archivo basado en la extensión
  const getFileExtension = (url) => {
    if (!url) return '';
    const urlWithoutParams = url.split('?')[0];
    return urlWithoutParams.split('.').pop().toLowerCase();
  };

  const extension = getFileExtension(fileUrl || fileName);

  // Renderizar según el tipo de archivo
  const renderViewer = () => {
    // PDFs
    if (extension === 'pdf') {
      return (
        <div style={{ height: "80vh", border: "1px solid #ccc" }}>
          <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.4.120/build/pdf.worker.min.js">
            <Viewer fileUrl={fileUrl} plugins={[defaultLayoutPluginInstance]} />
          </Worker>
        </div>
      );
    }

    // Imágenes (JPEG, JPG, PNG)
    if (['jpg', 'jpeg', 'png', 'gif', 'webp'].includes(extension)) {
      return (
        <div style={{
          height: "80vh",
          border: "1px solid #ccc",
          backgroundColor: "#f5f5f5",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          overflow: "auto",
          padding: "1rem"
        }}>
          <img
            src={fileUrl}
            alt={fileName || "Archivo"}
            style={{
              maxWidth: "100%",
              maxHeight: "100%",
              objectFit: "contain"
            }}
          />
        </div>
      );
    }

    // Documentos de Office (DOC, DOCX, XLS, XLSX, PPT, PPTX)
    if (['doc', 'docx', 'xls', 'xlsx', 'ppt', 'pptx'].includes(extension)) {
      // Usar Google Docs Viewer para documentos de Office
      const viewerUrl = `https://docs.google.com/viewer?url=${encodeURIComponent(fileUrl)}&embedded=true`;

      return (
        <div style={{ height: "80vh", border: "1px solid #ccc" }}>
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
      );
    }

    // Tipo de archivo no soportado
    return (
      <div style={{
        height: "80vh",
        border: "1px solid #ccc",
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
          Tipo de archivo no soportado
        </h3>
        <p style={{
          color: "#666",
          marginBottom: "1rem"
        }}>
          Extensión: .{extension}
        </p>
        <a
          href={fileUrl}
          download={fileName}
          style={{
            padding: "0.75rem 1.5rem",
            backgroundColor: "#ef4444",
            color: "white",
            textDecoration: "none",
            borderRadius: "0.25rem",
            fontWeight: "500",
            transition: "background-color 0.2s"
          }}
          onMouseOver={(e) => e.target.style.backgroundColor = "#dc2626"}
          onMouseOut={(e) => e.target.style.backgroundColor = "#ef4444"}
        >
          Descargar archivo
        </a>
      </div>
    );
  };

  return renderViewer();
};

export default FileViewer;
