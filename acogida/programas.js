var endpoint="localhost:7001";

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

    $("#btn_anterior").click(function(){
        validarCampos2();
    })

    $("#btn_siguiente").click(function(){
        validarCampos1();
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
            $("#otr-medio-conoc").attr('disabled',false);
        }else{
            $("#otr-medio-conoc").attr('disabled',true);
        }
    }

    function validarCampos2(){
        if($("#medio").val()=="0"){
            alert("seleccione ¿donde o por quién se enteró de Casa Libertad?")
        }
        else if($("#medio").val()=="8" && $("#otr-medio-conoc").val()=="" ){
            alert("Seleccione Especifique")
        }
        else if($("#expectativa").val()=="0"){
            alert("Seleccione ¿Expectativas del Programa?")
        }
        else if($("#nombre_funcionario").val()=="0"){
            alert("Seleccione Funcionario que registró")
        }
        else if($("#nombre_funcionario").val()=="3" && $("#nombres_otro_func").val()=="" ){
            alert("Seleccione Especifique")
        }
        else{
            guardarProgramas(numero);
            alert("Se ha guardado Programas")
            window.location='antecedentes.html?numeroDocumento='+numero+'&nombres='+nombres+'&primerApellido='+primerApellido+'&segundoApellido='+segundoApellido;

        }
    }

    function validarCampos1(){

        if($("#medio").val()=="0"){
            alert("seleccione ¿donde o por quién se enteró de Casa Libertad?")
        }
        else if($("#medio").val()=="8" && $("#otr-medio-conoc").val()=="" ){
            alert("Seleccione Especifique")
        }
        else if($("#expectativa").val()=="0"){
            alert("Seleccione ¿Expectativas del Programa?")
        }
        else if($("#nombre_funcionario").val()=="0"){
            alert("Seleccione Funcionario que registró")
        }
        else if($("#nombre_funcionario").val()=="3" && $("#nombres_otro_func").val()=="" ){
            alert("Seleccione Especifique")
        }
        else{
            guardarProgramas(numero);
            alert("Se ha guardado Programas")
            window.location='formatos.html?numeroDocumento='+numero+'&nombres='+nombres+'&primerApellido='+primerApellido+'&segundoApellido='+segundoApellido;
        }        
    }


    function traerProgramas(){

        $.ajax({
            url:endpoint+"/programas/consulta?numeroDocumento="+numero,
            type:"GET",
            dataType:"json",
            success:function(respuesta){
                console.log(respuesta);
                pintarRespuesta(respuesta.items)
            }
        })
    }



    function guardarProgramas(){

            let informacion={
                otr_medio_conoc:$("#medio").val(), 
                nombres_otro_func:$("#otr-medio-conoc").val(), 
                medios_conoc_uniqid:$("#expectativa").val(), 
                expectativas_uniqid:$("#nombre_funcionario").val(),
                funcs_registro_uniqid:$("#nombres_otro_func").val() 
            }

            $.ajax({

                url:endpoint+"/programas/save?numeroDocumento="+numero,
                type:'POST',
                data:JSON.stringify(informacion),
                dataType:'json',
                contentType:"application/json",
                complete:function(data){
                    console.log(data.status)
                    let mensaje=""
                    if(data.status=="201"){
                        mensaje="guardo Programas con exito"
                    }
                    else{
                        mensaje="problemas al guardar en base datos"
                    }
                    console.log(mensaje)
                }
            })
    }
})