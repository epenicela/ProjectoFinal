import api from './api';


export default{
    listar:() =>{
        return api.get('atendimentos');
    },
    salvar:(atendimento) =>{
        return api.post('atendimentos',atendimento)
    },
    editar:(atendimento) =>{
        return api.put('atendimento/'+atendimento.id,atendimento)
    },
    apagar:(atendimento) =>{
        return api.delete('atendimento/'+atendimento.id)
    } 
}