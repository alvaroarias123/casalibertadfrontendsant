endpoint="localhost:7001";

$(document).ready(function(){

    function pasarArticulacion(){
    

        location.href="/articulacion/bandeja_articulador.html";
    }


    $("#guarda_general").click(function(){


        pasarArticulacion();
    })


})