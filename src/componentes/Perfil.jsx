import { useState } from "react";
import "../estilos/Perfil.css";

function Perfil({ usuario, tareas = [] }) {
    const completadas = tareas.filter((t) => t.completada).length;
    const [foto, setFoto] = useState(usuario?.foto);

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
                src={foto}
                alt="Foto perfil"
                className="perfil-foto"
                onClick={(e) => handleFotoChange(e)}
            />
            <input
                type="file"
                accept="image/*"
                onChange={handleFotoChange}
                className="perfil-input"
            />


            <h2 className="perfil-nombre">
                {usuario?.nombre || "Nombre de usuario"}
            </h2>

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
