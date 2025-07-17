import {db} from "../../firebase";
import {addDoc, collection, getDocs, updateDoc, deleteDoc, doc} from "firebase/firestore";
import {Proyecto} from "../interfaces/Proyecto";



export const crearProyecto = async (proyecto:Proyecto): Promise<string> => {
    try{
        const nuevoDocumento = await addDoc(collection(db, "proyectos"), proyecto);
        const idGenerado = nuevoDocumento.id
        
        const proyectos = JSON.parse(localStorage.getItem("proyectos") || "[]");
        const proyectosActualizados = proyectos.map((p: Proyecto) => {
            const esIgual = !p.id &&
                p.nombre === proyecto.nombre &&
                p.presupuesto === proyecto.presupuesto &&
                p.tipo === proyecto.tipo &&
                p.objetivo === proyecto.objetivo &&
                p.fecha === proyecto.fecha;

            return esIgual ? { ...p, id: idGenerado } : p;
        });
        localStorage.setItem("proyectos", JSON.stringify(proyectosActualizados));

        return idGenerado;
    }catch (error){
        throw error;
    }
}

export const verProyecto = async ()=> {
    const datos = await getDocs(collection(db, "proyectos"));
    const proyectos = datos.docs.map(doc => {
        const informacion = doc.data();
        return {
            id: doc.id,
            nombre: informacion.nombre,
            presupuesto: informacion.presupuesto,
            tipo: informacion.tipo,
            objetivo: informacion.objetivo,
            fecha: informacion.fecha
        };
    });
    return proyectos;
}

export const actualizarProyecto = async (proyectoId:string, datosActualizados:Proyecto) => {
    const proyectos = doc(db, "proyectos", proyectoId);
    await updateDoc(proyectos, {
        nombre: datosActualizados.nombre,
        presupuesto: datosActualizados.presupuesto,
        tipo: datosActualizados.tipo,
        objetivo: datosActualizados.objetivo,
        fecha: datosActualizados.fecha
    })
}

export const eliminarProyecto = async (proyectoId: string) => {
    const proyectos = doc(db, "proyectos", proyectoId);
    await deleteDoc(proyectos)
}


