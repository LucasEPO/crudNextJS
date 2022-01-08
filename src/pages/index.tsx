import Layout from "../components/Layout";
import Tabela from "../components/Tabela";
import Cliente from "../core/Cliente";

export default function Home() {

  const clientes = [
    new Cliente('Ana',34,'1'),
    new Cliente('Bia',43,'2'),
    new Cliente('Carlos',23,'3'),
    new Cliente('Pedro',54,'4'),
  ];

  function clientSelected(cliente: Cliente) {
    console.log(cliente.nome);
  }
  function clientExcluded(cliente: Cliente) {
    console.log(`Excluir... ${cliente.nome}`);
  }
  return (
    <div className={`
      flex justify-center items-center h-screen
      bg-gradient-to-r from-blue-500 to-purple-500
      text-white
    `}>
      <Layout titulo="Cadastro Simples">
        <Tabela 
          clientes={clientes}
          clientSelected={clientSelected}
          clientExcluded={clientExcluded}
        ></Tabela>
      </Layout>
    </div>
  )
}
