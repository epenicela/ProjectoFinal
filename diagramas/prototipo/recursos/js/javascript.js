$("#formCadastroCurso").on('submit',function (event){
    event.preventDefault();
    var dados=$(this).serialize();
    $.ajax({
        url: 'controler/ControlerCurso.php',
        type: 'POST',
        dataType: 'html',
        data: dados,
        success: function(datos) {
            $('.Resultado').show().html(dados);
        }
    })
});

/*Confirmar antes de remover*/
$('.remover').on('click',function (event){
    event.preventDefault();
    
    var link=$(this).attr('href');
    if (confirm("Deseja mesmo remover esse registo?")){
        window.location.href=link;
    }else{
        return false;
    }
});
