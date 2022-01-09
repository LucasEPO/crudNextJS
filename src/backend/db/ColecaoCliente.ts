import firebase from "../config";
import Cliente from "../../core/Cliente";
import ClienteRepositorio from "../../core/ClienteRepositorio";

export default class ColecaoCliente implements ClienteRepositorio {
    
    #conversor = {
        toFirestore(cliente: Cliente) {
            return {
                nome: cliente.nome,
                idade: cliente.idade,
            }
        },
        fromFirestore(snapshot: firebase.firestore.QueryDocumentSnapshot, options: firebase.firestore.SnapshotOptions): Cliente{
            const dados = snapshot.data(options);
            return new Cliente(dados.nome, dados.idade, snapshot.id);
        }
    }
    
    async save(cliente: Cliente): Promise<Cliente> {
        if(cliente?.id) {
            //caso de alteracao
            await this.collection().doc(cliente.id).set(cliente);
            return cliente
        } else {
            //caso de novo cliente
            const docRef = await this.collection().add(cliente);
            const doc = await docRef.get();
            return doc.data();
        }
        
    }

    async Exclude(cliente: Cliente): Promise<void> {
        return this.collection().doc(cliente.id).delete();
    }

    async getAll(): Promise<Cliente[]> {
        const query = await this.collection().get(); 
        return query.docs.map(doc => doc.data()) ?? [];
    }

    private collection() {
        return firebase.firestore().collection('clientes').withConverter(this.#conversor);
    }
}