import api from './api';


export default{
    listar:() =>{
        return api.get('saidas');
    },
    salvar:(saida) =>{
        return api.post('saidas',saida)
    },
    editar:(saida) =>{
        return api.put('saida/'+saida.id,saida)
    },
    apagar:(saida) =>{
        return api.delete('saida/'+saida.id)
    } 
}