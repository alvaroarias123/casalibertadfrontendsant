//var endpoint="localhost:7001";
var endpoint="http://172.21.21.27:9073/part1/CasaLAco";
//var endpoint="http://172.21.21.27:9073/part1/CasaLAco"; //  /acogida

$(document).ready(function(){

    const valores1=window.location.search;
    console.log(valores1)
    const urlParams = new URLSearchParams(valores1);
    var numero=urlParams.get("numeroDocumento");
    var nombres=urlParams.get("nombres");
    var primerApellido=urlParams.get("primerApellido");
    var segundoApellido=urlParams.get("segundoApellido");

    //alert("okkk")

    $("#registro").click(function(){
        window.location='registro.html?numeroDocumento='+numero+'&nombres='+nombres+'&primerApellido='+primerApellido+'&segundoApellido='+segundoApellido;
    })
    $("#datos_dem").click(function(){
    
        window.location='datos_demograficos.html?numeroDocumento='+numero+'&nombres='+nombres+'&primerApellido='+primerApellido+'&segundoApellido='+segundoApellido;
    })
    
    $("#vivienda").click(function(){
        window.location='vivienda.html?numeroDocumento='+numero+'&nombres='+nombres+'&primerApellido='+primerApellido+'&segundoApellido='+segundoApellido;
    })
    
    $("#antecedente").click(function(){
        window.location='antecedentes.html?numeroDocumento='+numero+'&nombres='+nombres+'&primerApellido='+primerApellido+'&segundoApellido='+segundoApellido;
    })
    
    $("#programa").click(function(){
        window.location='programas.html?numeroDocumento='+numero+'&nombres='+nombres+'&primerApellido='+primerApellido+'&segundoApellido='+segundoApellido;
    })
    
    $("#formato").click(function(){
        window.location='formatos.html?numeroDocumento='+numero+'&nombres='+nombres+'&primerApellido='+primerApellido+'&segundoApellido='+segundoApellido;
    })

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

    traerVivienda(numero);

    $("#btn_anterior").click(function(){
        var sitio=2;
        validarCampos2(sitio);
    })

    $("#btn_siguiente").click(function(){
        var sitio=1;
        validarCampos1(sitio);
    })

    function validarCampos2(sitio){
        if($("#tipo_vivienda").val()=="0"){
            alert("seleccione en que tipo de vivienda duerme actualmente")
        }else{
            guardarViviendas();
            alert("Se ha guardado viviendas")
            if(sitio===1){
                window.location='antecedentes.html?numeroDocumento='+numero+'&nombres='+nombres+'&primerApellido='+primerApellido+'&segundoApellido='+segundoApellido;
            }else{
                window.location='datos_demograficos.html?numeroDocumento='+numero+'&nombres='+nombres+'&primerApellido='+primerApellido+'&segundoApellido='+segundoApellido;
            }
        }
    }

    function validarCampos1(sitio){
        if($("#tipo_vivienda").val()=="0"){
            alert("seleccione en que tipo de vivienda duerme actualmente")
        }else{
            guardarViviendas();
            alert("Se guardó viviendas con éxito!!");
            if(sitio===1){
                window.location='antecedentes.html?numeroDocumento='+numero+'&nombres='+nombres+'&primerApellido='+primerApellido+'&segundoApellido='+segundoApellido;
            }else{
                window.location='datos_demograficos.html?numeroDocumento='+numero+'&nombres='+nombres+'&primerApellido='+primerApellido+'&segundoApellido='+segundoApellido;
            }
        }        
    }

    function guardarViviendas(){

        let tipo=$("#tipo_vivienda").val();

        $.ajax({
            url:endpoint+"/vivienda/save?numeroDocumento="+numero+"&tipo="+tipo,
            type:'POST',
            data:JSON.stringify(tipo),
            dataType:'json',
            contentType:"application/json",
            complete:function(data){
                console.log(data)
                let mensaje=""
                mensaje="guardo viviendas con exito"
                console.log(mensaje)
            }
        })
    }

    function traerVivienda(numeros){

        $.ajax({
            url:endpoint+"/vivienda/consulta?numeroDocumento="+numeros,
            type:"GET",
            dataType:"json",
            success:function(respuesta){
                console.log(respuesta);
                pintarRespuesta(respuesta)
            }
        })


    }

    function pintarRespuesta(items){

        if(items.uniqid===null){$("#tipo_vivienda").val("0")}else{$("#tipo_vivienda").val(items.uniqid)};
    }

})