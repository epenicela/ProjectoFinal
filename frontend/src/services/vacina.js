import api from './api';


export default{
    listar:() =>{
        return api.get('vacinas');
    },
    salvar:(vacina) =>{
        return api.post('vacinas',vacina)
    },
    editar:(vacina) =>{
        return api.put('vacina/'+vacina.id,vacina)
    },
    apagar:(vacina) =>{
        return api.delete('vacina/'+vacina.id)
    } 
}