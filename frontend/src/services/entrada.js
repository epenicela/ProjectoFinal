import api from './api';


export default{
    listar:() =>{
        return api.get('entradas');
    },
    salvar:(entrada) =>{
        return api.post('entradas',entrada)
    },
    editar:(entrada) =>{
        return api.put('entrada/'+entrada.id,entrada)
    },
    apagar:(entrada) =>{
        return api.delete('entrada/'+entrada.id)
    } 
}