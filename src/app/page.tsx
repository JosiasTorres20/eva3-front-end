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


  return (
    <main>
      <Formulario
        proyecto={initialStateProyecto}
        handleProyecto={() => {}}
        handleRegistrar={() => {}}
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