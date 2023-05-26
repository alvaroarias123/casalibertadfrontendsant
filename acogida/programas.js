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


    //alert("Funciona");

    traerProgramas();

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

    $("#btn_anterior").click(function(){
        var sitio=2;
        validarCampos2(sitio);
    })

    $("#btn_siguiente").click(function(){
        var sitio=1;
        validarCampos1(sitio);
    })

    $("#medio").click(function(){
        habilitarCampos()    
    })

    $("#nombre_funcionario").click(function(){
        habilitarCampos1()    
    })

    function habilitarCampos1(){

        if($("#nombre_funcionario").val()=="3"){
            $("#nombres_otro_func").attr('disabled',false);
        }else{
            $("#nombres_otro_func").attr('disabled',true);
        }
    }

    function habilitarCampos(){

        if($("#medio").val()=="8"){
            $("#otr_medio_conoc").attr('disabled',false);
        }else{
            $("#otr_medio_conoc").attr('disabled',true);
        }
    }

    function validarCampos2(sitio){
        if($("#medio").val()=="0"){
            alert("seleccione ¿donde o por quién se enteró de Casa Libertad?")
        }
        else if($("#medio").val()=="8" && $("#otr_medio_conoc").val().trim()=="" ){
            alert("Seleccione Especifique")
        }
        else if($("#expectativa").val()=="0"){
            alert("Seleccione ¿Expectativas del Programa?")
        }
        else if($("#nombre_funcionario").val()=="0"){
            alert("Seleccione Funcionario que registró")
        }
        else if($("#nombre_funcionario").val()=="3" && $("#nombres_otro_func").val().trim()=="" ){
            alert("Seleccione Especifique")
        }
        else{
            guardarProgramas();
            alert("Se guardó programas con éxito!!!")
            if(sitio==1){
                window.location='formatos.html?numeroDocumento='+numero+'&nombres='+nombres+'&primerApellido='+primerApellido+'&segundoApellido='+segundoApellido;
            }else{
                window.location='antecedentes.html?numeroDocumento='+numero+'&nombres='+nombres+'&primerApellido='+primerApellido+'&segundoApellido='+segundoApellido;
            }
        }
    }

    function validarCampos1(sitio){

        if($("#medio").val()=="0"){
            alert("seleccione ¿donde o por quién se enteró de Casa Libertad?")
        }
        else if($("#medio").val()=="8" && $("#otr_medio_conoc").val().trim()=="" ){
            alert("Seleccione Especifique")
        }
        else if($("#expectativa").val()=="0"){
            alert("Seleccione ¿Expectativas del Programa?")
        }
        else if($("#nombre_funcionario").val()=="0"){
            alert("Seleccione Funcionario que registró")
        }
        else if($("#nombre_funcionario").val()=="3" && $("#nombres_otro_func").val().trim()=="" ){
            alert("Seleccione Especifique")
        }
        else{
            guardarProgramas();
            alert("Se guardó programas con éxito!!!")
            if(sitio==1){
                window.location='formatos.html?numeroDocumento='+numero+'&nombres='+nombres+'&primerApellido='+primerApellido+'&segundoApellido='+segundoApellido;
            }else{
                window.location='antecedentes.html?numeroDocumento='+numero+'&nombres='+nombres+'&primerApellido='+primerApellido+'&segundoApellido='+segundoApellido;
            }
        }        
    }


    function traerProgramas(){

        $.ajax({
            url:endpoint+"/programas/consulta?numeroDocumento="+numero,
            type:"GET",
            dataType:"json",
            success:function(respuesta){
                console.log(respuesta);
                pintarRespuesta(respuesta)
            }
        })
    }



    function guardarProgramas(){

            let informacion={
                otr_medio_conoc:$("#otr_medio_conoc").val().trim(),
                nombres_otro_func:$("#nombres_otro_func").val().trim(), 
                medios_conoc_uniqid:$("#medio").val(), 
                expectativas_uniqid:$("#expectativa").val(),
                funcs_registro_uniqid:$("#nombre_funcionario").val() 
            }

            $.ajax({

                url:endpoint+"/programas/save?numeroDocumento="+numero,
                type:'POST',
                data:JSON.stringify(informacion),
                dataType:'json',
                contentType:"application/json",
                complete:function(data){
                    console.log(data)
                    let mensaje=""
                    mensaje="guardo Programas con exito"
                    console.log(mensaje)
                }
            })
    }

    function pintarRespuesta(items){


        if(items.otr_medio_conoc===null){$("#otr_medio_conoc").val("")}else{$("#otr_medio_conoc".val(items.otr_medio_conoc))}
        if(items.nombres_otro_func===null){$("#nombres_otro_func").val("")}else{$("#nombres_otro_func").val(items.nombres_otro_func)}
        if(items.medios_conoc_uniqid===null){$("#medio").val("0")}else($("#medio").val(items.medios_conoc_uniqid))
        if(items.expectativas_uniqid===null){$("#expectativa").val("0")}else{$("#expectativa".val(items.expectativas_uniqid))}
        if(items.funcs_registro_uniqid===null){$("#nombre_funcionario").val("0")}else{$("#nombre_funcionario").val(items.funcs_registro_uniqid)}
    }
})