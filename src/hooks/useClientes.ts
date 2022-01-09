import { useEffect, useState } from "react";
import ColecaoCliente from "../backend/db/ColecaoCliente";
import Cliente from "../core/Cliente";
import ClienteRepositorio from "../core/ClienteRepositorio";
import useTabelaOuForm from "./useTabelaOuForm";

export default function useClientes() {
    const repo: ClienteRepositorio = new ColecaoCliente();

    const { tabelaVisivel, formularioVisivel, exibirTabela, exibirForm } = useTabelaOuForm();

    const [cliente, setCliente] = useState<Cliente>(Cliente.vazio());
    const [clientes, setClientes] = useState<Cliente[]>([]);
  

    //verifica o repositorio na inicializacao do componente
    useEffect(getAll, []);

    //funcao que obten a lista de clientes do firebase
    function getAll() {
        repo.getAll().then(clientes => {
            setClientes(clientes);
            exibirTabela();
        });
    }

    //funcao que chama o formulario com os dados do cliente a ser alterado
    function clientSelected(cliente: Cliente) {
        setCliente(cliente);
        exibirForm();
    }
    
    //funcao que chama o formulario para criar novo cliente
    function newClient() {
        setCliente(Cliente.vazio());
        exibirForm();
    }

    //funcao que exclui cliente do repositorio no firebase
    async function clientExclude(cliente: Cliente) {
        await repo.Exclude(cliente);
        getAll();
    }

    //funcao que salva/altera cliente no repositorio no firebase
    async function clientSave(cliente: Cliente) {
        await repo.save(cliente);
        getAll();
    }

    return {
        cliente,
        clientes,
        tabelaVisivel,
        formularioVisivel,
        clientSelected,
        newClient,
        clientExclude,
        clientSave,
        getAll,
        exibirTabela
    }

}