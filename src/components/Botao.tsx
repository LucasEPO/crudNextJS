interface ButtonProps {
    //parametro obrigatoirio
    children: any;

    //parametro opicional
    color?: 'green' | 'blue' | 'gray';
    className?: string
}

export default function Botao(props: ButtonProps) {
    
    //se tiver recebido parametro pegar cor do parametro se nao usa cinza como default
    const color = props.color ?? 'gray';

    return (
        <button className={`
            bg-gradient-to-r from-${color}-400 to-${color}-700
            text-white px-4 py-2 rounded-md
            ${props.className}
        `}>
            {props.children}
        </button>
    );
}