 import "../estilos/Trofeos.css";

function Trofeos({ tareas }) {
  const completadas = tareas.filter((t) => t.completada).length;
  const trofeos = [
    { id: 1, nombre: "Primer paso", descripcion: "Completa tu primera tarea", desbloqueado: completadas >= 1 },
    { id: 2, nombre: "En racha", descripcion: "Completa 5 tareas", desbloqueado: completadas >= 5 },
    { id: 3, nombre: "Productividad total", descripcion: "Completa 10 tareas", desbloqueado: completadas >= 10 },
  ];

  return (
    <div className="trofeos-container">
      <h2 className="trofeos-titulo">🏆 Trofeos</h2>
      <div className="trofeos-lista">
        {trofeos.map((trofeo) => (
          <div
            key={trofeo.id}
            className={`trofeo ${trofeo.desbloqueado ? "desbloqueado" : "bloqueado"}`}
          >
            <h3>{trofeo.nombre}</h3>
            <p>{trofeo.descripcion}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Trofeos;
