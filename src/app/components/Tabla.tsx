import { Proyecto} from "@/app/interfaces/Proyecto"

export default function Lista(props: {
    proyectos: Proyecto[];
    getProyecto: (p: Proyecto, index: number) => void;
    eliminarProyecto: (index: number) => void;

}) {
    const {proyectos, getProyecto, eliminarProyecto} = props


    return (
        <div style={{ padding: 50, gap: 15, display:"flex", flexDirection:"column"}}>
            <h1>Lista de Proyecto</h1>

            <table>
                <thead>
                    <tr>
                        <th>Nombre</th>
                        <th>Presupuesto</th>
                        <th>Tipo de Proyecto</th>
                        <th>Objetivo</th>
                        <th>Fecha de Inicio</th>
                        <th>Acciones</th>
                    </tr>
                </thead>

                <tbody>
                    {proyectos.map((proyecto, index) => (
                        <tr>
                            <td>{proyecto.nombre}</td>
                            <td>{proyecto.presupuesto}</td>
                            <td>{proyecto.tipo}</td>
                            <td>{proyecto.objetivo}</td>
                            <td>{proyecto.fecha}</td>

                            <td>
                                <button onClick={() => getProyecto(proyecto, index)}>Editar</button>
                                <button onClick={() => eliminarProyecto(index)}>Eliminar</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}


