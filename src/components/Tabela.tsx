import Cliente from "../core/Cliente";
import { IconEdit, IconTrash } from "./Icones";

//Exige receber um array de clientes como parametro
interface TableProps {
    clientes: Cliente[];

    //parametros opcionais
    clientSelected?: (cliente: Cliente) => void;
    clientExcluded?: (cliente: Cliente) => void;
}

export default function Tabela(props: TableProps) {

    //verdadeiro quando um dos parametro existir
    const showActions = props.clientSelected || props.clientExcluded;

    //funcao ue cria o cabacalho da tabela
    function renderHeader() {
        return (
            <tr>
                <th className="text-left p-4">ID</th>
                <th className="text-left p-4">Nome</th>
                <th className="text-left p-4">Idade</th>
                {/* Mostra as acoes apenas quando existir um dos parametros */}
                {showActions ? <th className="p-4">Ações</th> : false}
            </tr>
        );
    }

    //funcao q cria o corpo da tabela com os dados
    function renderData() {
        return props.clientes?.map((cliente, i) => {
            return (

                //pelo indice define a classe para alternar as cores das linhas
                <tr key={cliente.id} className={`
                    ${i % 2 === 0 ? 'bg-purple-200' : 'bg-purple-100' }
                `}>
                    <td className="text-left p-4">{cliente.id}</td>
                    <td className="text-left p-4">{cliente.nome}</td>
                    <td className="text-left p-4">{cliente.idade}</td>
                    {/* Mostra as acoes apenas quando existir um dos parametros */}
                    {showActions ? renderActions(cliente) : false}
                </tr>
            );
        });
    }

    function renderActions(cliente: Cliente) {
        return (
            <td className="flex justify-center">
                {props.clientSelected ? (
                    <button onClick={() => props.clientSelected?.(cliente)} className={`
                        flex justify-center items-center
                        text-green-600 rounded-full p-2 m-1
                        hover:bg-purple-50
                    `}>
                        {IconEdit}
                    </button>

                ) : false}

                {props.clientExcluded ? (

                    <button onClick={() => props.clientExcluded?.(cliente)} className={`
                        flex justify-center items-center
                        text-red-500 rounded-full p-2 m-1
                        hover:bg-purple-50
                    `}>
                        {IconTrash}
                    </button>
                ): false}

            </td>
        );
    }

    //chama as funcoes e retorna a tabela completa
    return (
        <table className="w-full rounded-xl overflow-hidden">
            <thead className={`
                text-gray-100
                bg-gradient-to-r from-purple-600 to-purple-800
            `}>
                {renderHeader()}
            </thead>
            <tbody>
                {renderData()}
            </tbody>
        </table>
    )
}