import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { patchData } from '../servios/Servicios';
import "../estilos/ComponenteModal.css"

function ComponenteModal({mostrar,ocultar}) {
    const [textoTitulo,setTextoTitulo] = useState("")
    const [textoDescripcion,setTextoDescripcion] = useState("")
    
    async function editarTarea(id) {
         const objEditar = {
            titulo: textoTitulo,
            descripcion: textoDescripcion
         }
         await patchData("tareas",objEditar,id)
    }

  return (
    <>
      <Modal show={mostrar} onHide={ocultar}>
        <Modal.Header closeButton>
          <Modal.Title>Edición tarea</Modal.Title>
        </Modal.Header>
        <Modal.Body>
                <input type="text" placeholder='Titulo tarea' onChange={(e)=>setTextoTitulo(e.target.value)} />
                <input type="text" placeholder='Descripción tarea' onChange={(e)=>setTextoDescripcion(e.target.value)}/>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={ocultar}>
            Close
          </Button>
          <Button variant="primary" onClick={()=>{
            editarTarea(localStorage.getItem("idTarea"))
          }}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ComponenteModal;