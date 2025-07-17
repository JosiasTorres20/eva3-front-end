import {Proyecto } from "../interfaces/Proyecto";
import { crearProyecto, verProyecto, actualizarProyecto, eliminarProyecto } from "../services/proyecto";

export const revisarYSincronizar = async () : Promise<void> =>{
    if(!navigator.onLine) return;
    try{
        const proyectosLocal = JSON.parse( localStorage.getItem("proyectos") || "[]");
        if (!proyectosLocal) return;

        const proyectosFirebase = await verProyecto();
        const mapeoFirebase = new Map<string, Proyecto>();
        proyectosFirebase.forEach(proyecto => mapeoFirebase.set(proyecto.id, proyecto));
    

        for (const proyectoLocal of proyectosLocal ) {

            const idLocal = proyectoLocal.id;
            if (idLocal && mapeoFirebase.has( idLocal)) {
                const proyectoEnFirebase = mapeoFirebase.get(idLocal);
                if (proyectoEnFirebase &&
                    (
                        proyectoEnFirebase.nombre !== proyectoLocal.nombre ||
                        proyectoEnFirebase.presupuesto !== proyectoLocal.presupuesto ||
                        proyectoEnFirebase.tipo!== proyectoLocal.tipo ||
                        proyectoEnFirebase.objetivo !== proyectoLocal.objetivo ||
                        proyectoEnFirebase.fecha !==proyectoLocal.fecha
                    )
                )
                await actualizarProyecto(idLocal, proyectoLocal);
                mapeoFirebase.delete(idLocal);
            }else {
                await crearProyecto(proyectoLocal);
            }
        }
        for (const [idRestante] of mapeoFirebase) {
            await eliminarProyecto(idRestante);
        }
        }catch (error) {
            console.error("Error al sincronizar proyectos:", error);
        }
};