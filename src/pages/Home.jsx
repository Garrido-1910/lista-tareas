import InputTarea from "../componentes/InputTarea";
import Lista from "../componentes/Lista";  
import { useEffect, useState } from "react";
import { getData } from "../servios/Servicios";
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
}, []);
  return (
    <div>
      <h1>Tareas</h1>
      <InputTarea/>
      <Lista listaTareas={tareas} />
    </div>
  );
}

export default Home;

  
    //El valor de ese estado pasarlo a la prop de Lista 
    