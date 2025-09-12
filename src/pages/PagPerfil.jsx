import React from 'react'
import Perfil from '../componentes/perfil'
import { useNavigate } from 'react-router-dom'

const PagPerfil = () => {
    const navigate = useNavigate()
  return (
    <div>   
            <button onClick={()=>navigate("/principal")}>pa tras</button>
        <Perfil/>
    </div>
  )
}

export default PagPerfil
