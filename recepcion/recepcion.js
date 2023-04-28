//var endpoint="localhost:7001"

$(document).ready(function(){

    function missing(){
        document.getElementById('aceptacion').style.display='none';
    }
    
    function desaparecido(){
        document.getElementById('aceptacion').style.display='block';
    }
    
    
    function borrar(){
        $("#radio1").prop("checked",false)
        $("#radio2").prop("checked",false)
        $("#numero_documento").val("");
        $("#tipo_documento").val("0");
    
    }
    
    $("#radio1").click(function(){
        missing()
    })

    $("#radio2").click(function(){
        desaparecido()
    })


    $("#verificar").click(function(){

        if($("#tipo_documento").val()=="0"){
            alert("Seleccione Tipo de Documento")
        }
        else if($("#numero_documento").val()==""){
            alert("Ingrese numero de documento")
        }else{
            var numeroDocumento =$("#numero_documento").val()
            var tipoDocumento = $("#tipo_documento").val()

            borrar()

            window.location='recepcion3.html?numeroDocumento='+numeroDocumento+'&tipo_documento='+tipoDocumento

        }    
    })

})