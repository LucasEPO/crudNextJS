import Titulo from "./Titulo";

//Exige que seja passado esses props na chamada desse componente
interface LayoutProps {
    titulo: string;
    children: any;
}

export default function Layout(props: LayoutProps) {
    return (
        <div className={`
            flex flex-col w-2/3 rounded-md
            bg-white text-gray-800
        `}>
            <Titulo>{props.titulo}</Titulo>
            <div className="p-6">
                {props.children}
            </div>
        </div>
    )
}