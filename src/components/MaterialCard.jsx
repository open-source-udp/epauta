const MaterialCard = ({ material, onClick }) => {
  return (
    <div
      style={{
        backgroundColor: "#f3f3f3",
        borderRadius: "0.5rem",
        padding: "1rem",
        cursor: "pointer",
      }}
      onClick={() => onClick(material.publicUrl)}
    >
      <h3
        style={{
          fontSize: "15px",
          textTransform: "uppercase",
          margin: 0,
        }}
      >
        {material.nombre}
      </h3>
    </div>
  );
};

export default MaterialCard;
