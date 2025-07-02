import { useState, useEffect } from "react";
import {Proyecto} from "./interfaces/Proyecto"


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

  
}