import { useState } from "react";
import Botao from "../components/Botao";
import Formulario from "../components/Formulario";
import Layout from "../components/Layout";
import Tabela from "../components/Tabela";
import Cliente from "../core/Cliente";

export default function Home() {

  const [cliente, setCliente] = useState<Cliente>(Cliente.vazio());
  const [visivel, setVisivel] = useState<'tabela' | 'form'>('tabela');

  const clientes = [
    new Cliente('Ana',34,'1'),
    new Cliente('Bia',43,'2'),
    new Cliente('Carlos',23,'3'),
    new Cliente('Pedro',54,'4'),
  ];

  function clientSelected(cliente: Cliente) {
    setCliente(cliente);
    setVisivel('form');
  }
  
  function newClient() {
    setCliente(Cliente.vazio());
    setVisivel('form');
  }

  function clientExcluded(cliente: Cliente) {
    console.log(`Excluir... ${cliente.nome}`);
  }

  function clientSave(cliente: Cliente) {
    console.log(cliente);
    setVisivel('tabela');
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
