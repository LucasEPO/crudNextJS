import { useEffect, useState } from "react";
import ColecaoCliente from "../backend/db/ColecaoCliente";
import Botao from "../components/Botao";
import Formulario from "../components/Formulario";
import Layout from "../components/Layout";
import Tabela from "../components/Tabela";
import Cliente from "../core/Cliente";
import ClienteRepositorio from "../core/ClienteRepositorio";

export default function Home() {

  const repo: ClienteRepositorio = new ColecaoCliente();

  const [cliente, setCliente] = useState<Cliente>(Cliente.vazio());
  const [clientes, setClientes] = useState<Cliente[]>([]);
  const [visivel, setVisivel] = useState<'tabela' | 'form'>('tabela');

  //verifica o repositorio na inicializacao do componente
  useEffect(getAll, []);

  function getAll() {
    repo.getAll().then(clientes => {
      setClientes(clientes);
      setVisivel('tabela');
    });
  }

  function clientSelected(cliente: Cliente) {
    setCliente(cliente);
    setVisivel('form');
  }
  
  function newClient() {
    setCliente(Cliente.vazio());
    setVisivel('form');
  }

  async function clientExcluded(cliente: Cliente) {
    await repo.Exclude(cliente);
    getAll();
  }

  async function clientSave(cliente: Cliente) {
    await repo.save(cliente);
    getAll();
  }

  return (
    <div className={`
      flex justify-center items-center h-screen
      bg-gradient-to-r from-blue-500 to-purple-500
      text-white
    `}>
      <Layout titulo="Cadastro Simples">
        {visivel === 'tabela' ? (
          <>
            <div className="flex justify-end">
              <Botao 
                color="green" 
                className="mb-4"
                onClick={newClient}
              >
                Novo Cliente
              </Botao>
            </div>
            <Tabela 
              clientes={clientes}
              clientSelected={clientSelected}
              clientExcluded={clientExcluded}
            />
          </>

        ) : (
          <Formulario 
            cliente={cliente}
            changeClient={clientSave} 
            cancel={() => setVisivel('tabela')}
          />

        )}
      </Layout>
    </div>
  )
}
