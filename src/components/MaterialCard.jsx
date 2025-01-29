const MaterialCard = ({ material, onClick }) => {
  return (
    <div
    style={{
      backgroundColor: "#f3f3f3",
      borderRadius: "0.5rem",
      padding: "1rem",
      cursor: "pointer",
      height: "100%",
      width: '100%',  
    }}
      onClick={() => onClick(material.publicUrl)}
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
  );
};

export default MaterialCard;
