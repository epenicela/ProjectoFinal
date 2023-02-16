$(function(){
	//Pesquisar os cursos sem refresh na página
	$("#search").keyup(function(){
		console.log( "window loaded 1" );

		var pesquisa_matricula = $(this).val();
		var limite = $("#limite").val();
		console.log(limite);
		//Verificar se há algo digitado
		if(pesquisa_matricula != ''){
			var dados = {
				palavra : pesquisa_matricula
				//,limite : limite
			}		
			$.post('./view/matricula/busca_matricula.php', dados, function(retorna){
				//Mostra dentro da ul os resultado obtidos 
				$(".resultado").html(retorna);
			});
		}else{
			//$(".resultado").html('');
			var dados = {
				palavra : pesquisa_matricula
				//,limite : limite
			}		
			$.post('./view/matricula/busca_matricula.php', dados, function(retorna){
				//Mostra dentro da ul os resultado obtidos 
				$(".resultado").html(retorna);
			});
		}		
	});
	
	
});
