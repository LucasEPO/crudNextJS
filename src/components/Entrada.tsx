interface InputProps {
    //parametros obrigatorios
    text: string;
    value: any;

    //parametros opcionais
    classname?: string;
    type?: 'text' | 'number';
    readOnly?: boolean;
    changeValue?: (value: any) => void;
}

export default function Entrada(props: InputProps) {
    return (
        <div className={`flex flex-col ${props.classname}`}>
            <label className="mb-2">{props.text}</label>
            <input 
                type={props.type ?? 'text'}
                value={props.value}
                readOnly={props.readOnly}
                onChange={e => props.changeValue?.(e.target.value)}
                className={`
                    border border-purple-500 rounded-lg
                    focus: outline-none bg-gray-100
                    ${props.readOnly ? '' : 'focus:bg-white'}
                    px-4 py-2
                `}
            />
        </div>
    );
}