import { Proyecto} from "@/app/interfaces/Proyecto";

export default function Formulario(props: {
    proyecto: Proyecto,
    handleProyecto: (name: string, value:string) => void;
    handleRegistrar: () => void;
    enEdicion: boolean
}) {
    const { proyecto, handleProyecto, handleRegistrar, enEdicion} = props

    const registro = () => {
        handleRegistrar()
    }

    return (
        <form>
            <h1>{enEdicion ? "Editar" : "Crear"}</h1>

            <label>Nombre</label>
            <input
                name = "nombre"
                placeholder="Nombre del Proyecto"
                value={proyecto.nombre}
                onChange = {(e) =>  handleProyecto(
                    e.currentTarget.name, 
                    e.currentTarget.value
                )}
            />

            <label>Presupuesto</label>
            <input
                name = "presupuesto"
                placeholder="Presupuesto del Proyecto"
                value={proyecto.presupuesto}
                onChange = {(e) =>  handleProyecto(
                    e.currentTarget.name, 
                    e.currentTarget.value
                )}
            />

            <label>Tipo de Proyecto</label>
            <select

                name = "tipo"
                value={proyecto.tipo}
                onChange = {(e) =>  handleProyecto(
                    e.currentTarget.name, 
                    e.currentTarget.value
                )}
            >
                <option>Elije un Tipo</option>
                <option value= "Educacion" >Educacion</option>
                <option value= "Salud" >Salud</option>
                <option value= "Contruccion" >Contruccion</option>
            </select>


            <label>Objetivo del Proyecto</label>
            <textarea
                name = "objetivo"
                placeholder="Describe el objetivo del proyecto"
                value = {proyecto.objetivo}
                onChange = {(e) =>  handleProyecto(
                    e.currentTarget.name, 
                    e.currentTarget.value
                )}
            
            >
            </textarea>

            <label>Fecha de Inicio del Proyecto</label>
            <input
                name = "fecha"
                type="date"
                value={proyecto.fecha}
                onChange = {(e) =>  handleProyecto(
                    e.currentTarget.name, 
                    e.currentTarget.value
                )}
            />

            <button onClick={registro}>
                {enEdicion ? "Actualizar" : "Crear"}
            </button>

        </form>
    )
}



