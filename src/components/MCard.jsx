const MaterialCard = ({ material }) => {
    return (
      <a href={material.publicUrl} target="_blank">
        <div
          style={{
            backgroundColor: "#f3f3f3",
            borderRadius: "0.5rem",
            padding: "1rem",
            cursor: "pointer",
            height: "100%",
            width: '100%',  
          }}
        >
          <h3
            style={{
              fontSize: "15px",
              textTransform: "uppercase",
              margin: 0,
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis", 
              maxWidth: "100%",  
            }}
          >
            {material.nombre}
          </h3>
        </div>
      </a>
    );
  };
  
  export default MaterialCard;
  