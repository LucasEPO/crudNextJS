import { useState } from "react";
import Cliente from "../core/Cliente";
import Botao from "./Botao";
import Entrada from "./Entrada";

interface FormProps {
    cliente: Cliente;
    changeClient: (cliente: Cliente) => void;
    cancel: () => void;
}

export default function Formulario(props: FormProps) {
    //pega o id se tiver recebido cliente
    const id = props.cliente?.id;

    //se receber cliente coloca campos recebidos, se não fica vazio
    const [nome, setNome] = useState(props.cliente?.nome ?? '');
    const [idade, setIdade] = useState(props.cliente?.idade ?? 0);

    return (
        <div className="bg-gray-200 rounded-md p-4">
            
            {/* mostra campo com id se tiver recebido */}
            {id ? (
                <Entrada 
                    text="Código" 
                    value={id}
                    classname="mb-4"
                    readOnly
                />
            ): false }

            <Entrada 
                text="Nome" 
                value={nome}
                changeValue={setNome}
                classname="mb-4"
            />

            <Entrada 
                text="Idade" 
                type="number" 
                value={idade}
                changeValue={setIdade}
            />

            <div className="flex justify-end mt-7">
                <Botao 
                    color="blue" 
                    className="mr-2"
                    onClick={() => props.changeClient?.(new Cliente(nome, +idade, id))}
                >
                    {id ? 'Alterar' : 'Salvar'}
                </Botao>
                <Botao onClick={props.cancel}>
                    Cancelar
                </Botao>
            </div>
        </div>
    );
}