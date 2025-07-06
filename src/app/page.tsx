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


  useEffect(() => {
    const buscaProyectos = localStorage.getItem("proyectos");
    if (buscaProyectos !== null) {
      const proyectosEncotrados = JSON.parse(buscaProyectos);
      setProyectos(proyectosEncotrados);
    }
  }, [])

  const handleProyecto = (name: string, value: string) => {
    setProyecto({ ...proyecto, [ name]: value});
  }
  const getProyecto = (proyectoSeleccionado: Proyecto, index:number) => {
    setProyecto(proyectoSeleccionado);
    setIndiceEditar(index);
    setEnEdicion(true);
  }


  const guardarProyecto = () => {

    if(proyecto.nombre.trim() === ""){
      alert("Porfavor Ingrese un Nombre para su Proyecto");
      return;
    }

    if (proyecto.presupuesto <= 0){
      alert("Ingrese el Presupuesto para su Proyecto");
      return;
    }

    if (proyecto.tipo.trim() === ""){
      alert("Ingrese el Tipo de Proyecto")
      return;
    }
    if ( proyecto.objetivo.length < 10){
      alert("Ingrese un Objetivo para su Proyecto con mas de 10 Caracteres")
      return;
    }

    if ( proyecto.fecha.trim() === ""){
      alert("Ingrese un Objetivo para su Proyecto con mas de 10 Caracteres")
      return;
    }

    const nuevos = [...proyectos];

    if (enEdicion && indiceEditar !== null) {
      nuevos[indiceEditar] = proyecto;
    }else{
      nuevos.push(proyecto);
    }
    localStorage.setItem("proyectos" , JSON.stringify(nuevos));
    setProyectos(nuevos);
    setProyecto(initialStateProyecto);
    setEnEdicion(false);
    setIndiceEditar(null);
  }

  const eliminarProyecto = (index:number) => {
    const nuevaLista = proyectos.filter((_, i) => i !== index)
    setProyectos(nuevaLista) 
    localStorage.setItem("proyectos" , JSON.stringify(nuevaLista));
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