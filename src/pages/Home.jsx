import InputTarea from "../componentes/InputTarea";
import Lista from "../componentes/Lista";  
import { useEffect, useState } from "react";
import { getData } from "../servios/Servicios";
import FormularioRegistro from "../componentes/FormularioRegistro";
function Home() {
  const [tareas, setTareas] = useState([]);
  useEffect (()=>{
    async function cargarTareas(){
        try {
            const datos = await getData("tareas");
            setTareas(datos);
        } catch (error) {
            console.error("Error al cargar tareas:", error);
        }
    }
    cargarTareas();
}, [tareas]);
  return (
    <div>
      <InputTarea/>
      <Lista listaTareas={tareas} />
    </div>
  );
}

export default Home;

  
    //El valor de ese estado pasarlo a la prop de Lista 
    