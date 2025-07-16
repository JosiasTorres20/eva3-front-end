import {db} from "../../firebase";
import {addDoc, collection} from "firebase/firestore";
import {Proyecto} from "../interfaces/Proyecto";



export const crearProyecto = async (proyecto:Proyecto): Promise<string> => {
    try{
        const nuevoDocumento = await addDoc(collection(db, "proyectos"), proyecto);
        return nuevoDocumento.id
    }catch (error){
        throw error;
    }
}