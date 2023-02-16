$(function(){
	//Pesquisar os cursos sem refresh na página
	$("#search_inscricao").keyup(function(){
		console.log( "window loaded 1" );

		var pesquisa_inscricao = $(this).val();
		var limite = $("#limite").val();
		console.log(limite);
		//Verificar se há algo digitado
		if(pesquisa_inscricao != ''){
			var dados = {
				palavra : pesquisa_inscricao
				//,limite : limite
			}		
			$.post('./view/inscricao/busca_inscricao.php', dados, function(retorna){
				//Mostra dentro da ul os resultado obtidos 
				$(".resultado").html(retorna);
			});
		}else{
			//$(".resultado").html('');
			var dados = {
				palavra : pesquisa_inscricao
				//,limite : limite
			}		
			$.post('./view/inscricao/busca_inscricao.php', dados, function(retorna){
				//Mostra dentro da ul os resultado obtidos 
				$(".resultado").html(retorna);
			});
		}		
	});
	
	
});
