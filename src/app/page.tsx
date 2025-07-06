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
  const [enEdicion, setEnEdicion] = useState<boolean>(false);
  const [indiceEditar, setIndiceEditar] = useState<number | null>(null);


  const handleProyecto = (name: string, value: string) => {
    setProyecto({ ...proyecto, [ name]: value});
  }
  const getProyecto = (proyectoSeleccionado: Proyecto, index:number) => {
    setProyecto(proyectoSeleccionado);
    setIndiceEditar(index);
    setEnEdicion(true);
  }


  const guardarProyecto = () => {
    const nuevos = [...proyectos];

    if (enEdicion && indiceEditar !== null) {
      nuevos[indiceEditar] = proyecto;
    }else{
      nuevos.push(proyecto);
    }

    setProyectos(nuevos);
    setProyecto(initialStateProyecto);
    setEnEdicion(false);
    setIndiceEditar(null);
  }
  const eliminarProyecto = (index:number) => {
    const nuevaLista = proyectos.filter((_, i) => i !== index)
    setProyectos(nuevaLista) 
  }

  
  return (
    <main>
      <Formulario 
        proyecto={proyecto}
        handleProyecto={handleProyecto}
        handleRegistrar={guardarProyecto}
        enEdicion={enEdicion}
      />

      <Tabla
        proyectos={proyectos}
        getProyecto={getProyecto}
        eliminarProyecto={eliminarProyecto}
      />
    </main>
  )

  
}