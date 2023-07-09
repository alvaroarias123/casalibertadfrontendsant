//var endpoint="localhost:7001/CasaLRec";
//var endpoint="localhost:8085";
var endpoint="http://172.21.21.27:9073/part1/CasaLRec"; 


$(document).ready(function(){

    $("#boton_aumentar").click(function(){

        var ventana_ancho=$("#cuerpo").width();
        var ventana_alto=$("#cuerpo").height();

        console.log(ventana_ancho);
        console.log(ventana_alto);

        nuevoAncho=1.2*ventana_ancho;
        nuevoAlto=1.2*ventana_alto;

        $("#cuerpo").width(nuevoAncho)
        $("#cuerpo").height(nuevoAlto)
        

    })

    $("#boton_disminuir").click(function(){

        var ventana_ancho=$("#cuerpo").width();
        var ventana_alto=$("#cuerpo").height();

        console.log(ventana_ancho);
        console.log(ventana_alto);

        nuevoAncho=ventana_ancho/1.2;
        nuevoAlto=ventana_alto/1.2;

        $("#cuerpo").width(nuevoAncho)
        $("#cuerpo").height(nuevoAlto)

    })

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

        if($("#radio1").prop("checked")==false && $("#radio2").prop("checked")==false ){
            alert("seleccionar autorización de tratamiento de datos");
        }
        else if($("#tipo_documento").val()=="0"){
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
            var radio1=$("#radio1").prop("checked")

            borrar()

            window.location='recepcion3.html?numeroDocumento='+numeroDocumento+'&tipo_documento='+tipoDocumento+'&radio1='+radio1

        }    
    })

})