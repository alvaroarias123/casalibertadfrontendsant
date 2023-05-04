//var endpoint="localhost:7001"
var endpoint="http://172.21.21.27:9073";

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

        var numeroDocum =$("#numero_documento").val().trim()

        if($("#tipo_documento").val()=="0"){
            alert("Seleccione Tipo de Documento");
        }
        else if(numeroDocum==""){
            alert("Ingrese numero de documento")
        }
        else if($("#tipo_documento").val()!= 4 && isNaN(numeroDocum)){
            alert("Por favor introduce solo numeros en Numero de Documento");
        }
        else if($("#tipo_documento").val()==1 && numeroDocum.length>=11){
            alert("el campo Numero de Documento acepta máximo 10 dígitos")
        }
        else if($("#tipo_documento").val()==2 && numeroDocum.length>=7){
            alert("Cedula de extranjería debe ser máximo de 6 dígitos")
        }
        else if($("#tipo_documento").val()==3 && numeroDocum.length>=11){
            alert("Tarjeta de Identidad debe ser máximo de 10 dígitos")
        }
        else if($("#tipo_documento").val()==4 && numeroDocum.length>=17){
            alert("Pasaporte debe ser máximo de 16 dígitos")
        }
        else if($("#tipo_documento").val()==4 && !isNaN(numeroDocum)){
            alert("Pasaporte debe ser alfanumérico")
        }
        else{
            var numeroDocumento =$("#numero_documento").val().trim()
            var tipoDocumento = $("#tipo_documento").val()

            borrar()

            window.location='recepcion3.html?numeroDocumento='+numeroDocumento+'&tipo_documento='+tipoDocumento

        }    
    })

})