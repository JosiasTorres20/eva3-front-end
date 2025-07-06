'use client'
import { useState, useEffect } from "react";
import {Proyecto} from "./interfaces/Proyecto"
import Formulario from "./components/Formulario";
import Tabla from "./components/Tabla";


const initialStateProyecto: Proyecto = {
  nombre: '',
  presupuesto: 0,
  tipo: '',
  objetivo: '',
  fecha: '',
}

export default function Principal(){

  const [proyecto, setProyecto] = useState<Proyecto>(initialStateProyecto);
  const [proyectos, setProyectos]= useState<Proyecto[]>([]);


  const handleProyecto = (name: string, value: string) => {
    setProyecto({ ...proyecto, [ name]: value});
  }

  const guardarProyecto = () => {
    const nuevos = [...proyectos, proyecto]
    setProyectos(nuevos)
    setProyecto(initialStateProyecto)
  }

  return (
    <main>
      <Formulario 
        proyecto={proyecto}
        handleProyecto={handleProyecto}
        handleRegistrar={guardarProyecto}
        enEdicion={false}
      />

      <Tabla
        proyectos={proyectos}
        getProyecto={() =>{}}
        eliminarProyecto={() => {}}
      />
    </main>
  )

  
}