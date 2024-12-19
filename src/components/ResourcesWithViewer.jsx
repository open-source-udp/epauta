import { useState } from "react";
import PDFViewer from "./PDFViewer.jsx";
import MaterialCard from "./MaterialCard.jsx";

const ResourcesWithViewer = ({ recursos }) => {
  const [selectedUrl, setSelectedUrl] = useState();

  return (
    <div
      style={{
        display: "grid",
        marginTop: "30px",
        gridTemplateColumns: "1fr 1fr",
        gap: "1rem",
        minHeight: "80vh",
      }}
    >
      <div
        style={{
          overflowY: "auto",
        }}
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
            gap: "1rem",
          }}
        >
          {recursos &&
            recursos.map((recurso) => (
              <MaterialCard
                key={recurso.name}
                material={{
                  nombre: recurso.name,
                  publicUrl: recurso.publicUrl,
                }}
                onClick={(url) => setSelectedUrl(url)}
              />
            ))}
        </div>
      </div>

      <div>
        {selectedUrl ? (
          <div className="pdf-viewer-container" style={{ height: "100%" }}>
            <PDFViewer fileUrl={selectedUrl} />
          </div>
        ) : (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "1rem",
              height: "100%",
            }}
          >
            <div
              style={{
                flex: 1,
                background: "#eee",
                borderRadius: "4px",
                animation: "pulse 1.5s infinite",
              }}
            >
              <p
                style={{
                  padding: "1rem",
                  margin: 0,
                  fontSize: "1.5rem",
                  color: "#fff",
                  borderTopLeftRadius: "4px",
                  borderTopRightRadius: "4px",
                }}
              >
                <p
                  style={{
                    fontSize: "1rem",
                    fontWeight: "normal",
                    margin: 0,
                  }}
                >
                  Archivo PDF no seleccionado
                </p>
              </p>
            </div>
          </div>
        )}
      </div>

      <style>{`
        @keyframes pulse {
          0% {
            background-color: #D04444;
          }
          50% {
            background-color: #C24444 ;
          }
          100% {
            background-color: #D04444;
          }
        }
      `}</style>
    </div>
  );
};

export default ResourcesWithViewer;
