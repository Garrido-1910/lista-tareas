import { useState, useRef } from "react";
import "../estilos/Perfil.css";

function Perfil({ usuario, tareas = [] }) {
  const completadas = tareas.filter((t) => t.completada).length;
  const [foto, setFoto] = useState(usuario?.foto);
  const [nombre, setNombre] = useState(usuario?.nombre || "");
  const inputRef = useRef(null);
  const handleFotoClick = () => {
    inputRef.current.click();
  };

  const handleFotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setFoto(url);
    }
  };

  return (
    <div className="perfil-container">
      <img
        src={foto || "https://via.placeholder.com/120"}
        alt="Foto perfil"
        className="perfil-foto"
        onClick={handleFotoClick}
      />
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        onChange={handleFotoChange}
        style={{ display: "none" }}
      />
      <input
        type="text"
        className="perfil-nombre-input"
        value={nombre}
        onChange={(e) => setNombre(e.target.value)}
        placeholder="Nombre de usuario"
      />

      <div className="perfil-estadisticas">
        <p className="perfil-total">
          <b>Total:</b> {tareas.length}
        </p>
        <p className="perfil-completadas">
          <b>Completadas:</b> {completadas}
        </p>
      </div>
    </div>
  );
}

export default Perfil;
