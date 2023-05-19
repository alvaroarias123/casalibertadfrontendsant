//const endpoint="localhost:7001";
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

    //alert("Hola")

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

    traerPaises();
    traerDatosDemograficos(numero);

    $("#nacionalidad").click(function(){
        habilitarCajaPais();
    })

    $("#etnia").click(function(){
        habilitarCampos()    
    })

    $("#disc1").click(function(){
        habilitarCajaDiscapacidad()    
    })

    $("#disc2").click(function(){
        deshabilitarCajaDiscapacidad()    
    })

    $("#ayuda_movilidad1").click(function(){
        $("#ayuda_movilidad2").prop('checked',false)
    })

    $("#ayuda_movilidad2").click(function(){
        $("#ayuda_movilidad1").prop('checked',false)
    })

    $("#ayuda_lectoescritura1").click(function(){
        $("#ayuda_lectoescritura2").prop('checked',false)
    })

    $("#ayuda_lectoescritura2").click(function(){
        $("#ayuda_lectoescritura1").prop('checked',false)
    })

    $("#ayuda_traduccion1").click(function(){
        $("#ayuda_traduccion2").prop('checked',false)
    })

    $("#ayuda_traduccion2").click(function(){
        $("#ayuda_traduccion1").prop('checked',false)
    })

    $("#btn_siguiente").click(function(){
        var sitio=1;
        validarCampos1(sitio);
    })

    $("#btn_anterior").click(function(){
        var sitio=2;
        validarCampos2(sitio);
    })

    function deshabilitarCajaDiscapacidad(){

        $("#ayuda_movilidad1").prop('checked',false)
        $("#ayuda_lectoescritura1").prop('checked',false)
        $("#ayuda_traduccion1").prop('checked',false)
        $("#ayuda_movilidad2").prop('checked',true)
        $("#ayuda_lectoescritura2").prop('checked',true)
        $("#ayuda_traduccion2").prop('checked',true)
        $(".cajaDisc").attr('disabled',true)
        
    }

    function habilitarCajaDiscapacidad(){

        $(".cajaDisc").attr('disabled',false)
    }


    function habilitarCajaPais(){

        if($("#nacionalidad").val()=="2"){
            $("#pais").attr('disabled',false);
        }else{
            $("#pais").attr('disabled',true);
        }

    }


    function habilitarCampos(){

        if($("#etnia").val()=="7"){
            $("#otra_etnia").attr('disabled',false);
        }else{
            $("#otra_etnia").attr('disabled',true);
        }
    }



    function validarCampos1(sitio){

        if($("#fecha_nacimiento").val()==""){
            alert("seleccione Fecha de Nacimiento")
        }
        else if($("#nacionalidad").val()=="0"){
            alert("seleccione Nacionalidad")
        }
        else if($("#nacionalidad").val()=="2" && $("#pais").val()==""){
            alert("Seleccione Pais Origen")
        }
        else if($("#estado").val()=="0"){
            alert("seleccione Estado Civil")
        }
        else if($("#etnia").val()=="0"){
            alert("seleccione Etnia")
        }
        else if($("#etnia").val()=="7" && $("#otra_etnia").val().trim()=="" ){
            alert("Seleccione Especifique")
        }
        else if($("#sexo").val()=="0"){
            alert("seleccione Sexo")
        }
        else if($("#identidad").val()=="0"){
            alert("Seleccione Identidad de género")
        }
        else if($("#orientacion").val()=="0"){
            alert("Seleccione Orientación Sexual")
        }
        else if($("#disc1").prop("checked")==false && $("#disc2").prop("checked")==false ){
            alert("seleccionar si se encuentra en condición de discapacidad");
        }
        else if($("#radio1").prop("checked")==false && $("#radio2").prop("checked")==false ){
            alert("seleccionar si se considera victima del conflicto armado");
        }       
        else{
            guardarFormularioDatosDem(numero,sitio);
            //alert("Se ha guardado Datos Demográficos")
            //window.location='vivienda.html?numeroDocumento='+numero+'&nombres='+nombres+'&primerApellido='+primerApellido+'&segundoApellido='+segundoApellido;
            
            
    
        }


    }

    function validarCampos2(sitio){

        if($("#fecha_nacimiento").val()==""){
            alert("seleccione Fecha de Nacimiento")
        }
        else if($("#nacionalidad").val()=="0"){
            alert("seleccione Nacionalidad")
        }
        else if($("#nacionalidad").val()=="2" && $("#pais").val()==""){
            alert("Seleccione Pais Origen")
        }
        else if($("#estado").val()=="0"){
            alert("seleccione Estado Civil")
        }
        else if($("#etnia").val()=="0"){
            alert("seleccione Etnia")
        }
        else if($("#etnia").val()=="7" && $("#otra_etnia").val().trim()=="" ){
            alert("Seleccione Especifique")
        }
        else if($("#sexo").val()=="0"){
            alert("seleccione Sexo")
        }
        else if($("#identidad").val()=="0"){
            alert("Seleccione Identidad de género")
        }
        else if($("#orientacion").val()=="0"){
            alert("Seleccione Orientación Sexual")
        }
        else if($("#disc1").prop("checked")==false && $("#disc2").prop("checked")==false ){
            alert("seleccionar si se encuentra en condición de discapacidad");
        }
        else if($("#radio1").prop("checked")==false && $("#radio2").prop("checked")==false ){
            alert("seleccionar si se considera victima del conflicto armado");
        }       
        else{
            guardarFormularioDatosDem(numero,sitio);
            //alert("Se ha guardado Datos Demográficos")
            //window.location='registro.html?numeroDocumento='+numero;
            
        }
    }

    function guardarFormularioDatosDem(numero,sitio){
        if($("#pais").val()==""){pais="Colombia"}else{pais=$("#pais").val()};
        if($("#otra_etnia").val().trim()==""){especif=null}else(especif=$("#otra_etnia").val().trim());
        if($("#radio1").prop("checked")==true){victima="si"}else{victima="no"};
        if($("#disc2").prop("checked")==true){ayuda_mov="no";ayuda_lect="no";ayuda_trad="no"};//ojo 
        if($("#disc1").prop("checked")==true){discapac="si"}else{discapac="no"};
        if($("#disc1").prop("checked")==true){
            if($("#ayuda_movilidad1").prop("checked")==true){
                ayuda_mov="si"
            }else{
                ayuda_mov="no"
            }
            if($("#ayuda_lectoescritura1").prop("checked")==true){
                ayuda_lect="si"
            }else{
                ayuda_lect="no"
            }
            if($("#ayuda_traduccion1").prop("checked")==true){
                ayuda_trad="si"
            }else{
                ayuda_trad="no"
            }
        }

        let formulario={
            fecha_nacimiento:$("#fecha_nacimiento").val(),
            nacionalidad:$("#nacionalidad").val(),
            pais_origen:pais,
            estado_civil:$("#estado").val(),
            etnia:$("#etnia").val(),
            especifique:especif,
            sexo:$("#sexo").val(),
            identidad_genero:$("#identidad").val(),
            orientacion_sexual:$("#orientacion").val(),
            discapacitado:discapac,
            ayuda_movilidad:ayuda_mov,
            ayuda_lectoescritura:ayuda_lect,
            ayuda_traduccion:ayuda_trad,
            vict_conf_arma:victima
        }

        $.ajax({

            url:endpoint+"/datos_demog/save?numeroDocumento="+numero,
            type:'POST',
            data:JSON.stringify(formulario),
            dataType:'json',
            contentType:"application/json",
            complete:function(data){
                console.log(data.status)
                let mensaje=""
                if(data.status=="200"){
                    mensaje="guardo datos demográficos con exito"
                    alert("Se guardó Datos Demográficos con éxito!!!")
                    if(sitio==1){
                        window.location='vivienda.html?numeroDocumento='+numero+'&nombres='+nombres+'&primerApellido='+primerApellido+'&segundoApellido='+segundoApellido;
                    }
                    else{
                        window.location='registro.html?numeroDocumento='+numero;
                    }
                }
                else{
                    mensaje="problemas al guardar en base datos"
                    alert("Ups... No se guardaron Datos Demográficos en base datos!!! Comuníquese con el Administrador")
                }
                console.log(mensaje)
            }
        })
    }

    function traerDatosDemograficos(numeros){

        $.ajax({
            url:endpoint+"/datos_demog/consulta?numeroDocumento="+numeros,
            type:"GET",
            dataType:"json",
            success:function(resultado){
                console.log(resultado);
                pintarResultado(resultado.items)
            }
        })
    }

    function pintarResultado(items){   

        if(items.fecha_nacimiento===null){$("#fecha_nacimiento").val("")}else{$("#fecha_nacimiento").val(items.fecha_nacimiento)};
        if(items.nacionalidad===null){$("#nacionalidad").val("0")}else{$("#nacionalidad").val(items.nacionalidad)};
        if(items.pais_origen===null){$("#pais").val("")}else{$("#pais").val(items.pais_origen)};
        if(items.estado_civil===null){$("#estado").val("0")}else{$("#estado").val(items.estado_civil)};
        if(items.etnia===null){$("#etnia").val("0")}else{$("#etnia").val(items.etnia)};
        if(items.especifique===null){$("#otra_etnia").val("")}else{$("#otra_etnia").val(items.especifique)};
        if(items.sexo===null){$("#sexo").val("0")}else{$("#sexo").val(items.sexo)};
        if(items.identidad_genero===null){$("#identidad").val("0")}else{$("#identidad").val(items.identidad_genero)};
        if(items.orientacion_sexual===null){$("#orientacion").val("0")}else{$("#orientacion").val(items.orientacion_sexual)};
        if(items.discapacitado===null){$("#disc1").attr('checked',false);$("#disc2").attr('checked',false)};
        if(items.discapacitado==="si"){$("#disc1").attr('checked',true);$("#disc2").attr('checked',false)};
        if(items.discapacitado==="no"){$("#disc2").attr('checked',true);$("#disc1").attr('checked',false)};
        if(items.ayuda_movilidad===null){$("#ayuda_movilidad1").attr('checked',false);$("#ayuda_movilidad2").attr('checked',true)};
        if(items.ayuda_movilidad==="si"){$("#ayuda_movilidad1").attr('checked',true);$("#ayuda_movilidad2").attr('checked',false)};
        if(items.ayuda_movilidad==="no"){$("#ayuda_movilidad1").attr('checked',false);$("#ayuda_movilidad2").attr('checked',true)};
        if(items.ayuda_lectoescritura===null){$("#ayuda_lectoescritura1").attr('checked',false);$("#ayuda_lectoescritura2").attr('checked',true)};
        if(items.ayuda_lectoescritura==="si"){$("#ayuda_lectoescritura1").attr('checked',true);$("#ayuda_lectoescritura2").attr('checked',false)};
        if(items.ayuda_lectoescritura==="no"){$("#ayuda_lectoescritura1").attr('checked',false);$("#ayuda_lectoescritura2").attr('checked',true)};
        if(items.ayuda_traduccion===null){$("#ayuda_traduccion1").attr('checked',false);$("#ayuda_traduccion2").attr('checked',true)};
        if(items.ayuda_traduccion==="si"){$("#ayuda_traduccion1").attr('checked',true);$("#ayuda_traduccion2").attr('checked',false)};
        if(items.ayuda_traduccion==="no"){$("#ayuda_traduccion1").attr('checked',false);$("#ayuda_traduccion2").attr('checked',true)};
        if(items.vict_conf_arma===null){$("#radio1").attr('checked',false);$("#radio2").attr('checked',false)};
        if(items.vict_conf_arma==="si"){$("#radio1").attr('checked',true);$("#radio2").attr('checked',false)};
        if(items.vict_conf_arma==="no"){$("#radio1").attr('checked',false);$("#radio2").attr('checked',true)};

    } 


    function traerPaises(){

        $.ajax({
            url:endpoint+"/paises/all",
            type:"GET",
            dataType:"json",
            success:function(respuesta){
                console.log(respuesta);
                pintarRespuesta(respuesta.items)
            }
        })
    }

    function pintarRespuesta(items){

        let registro='<option value="0">SELECCIONE</option>';
        for(i=0;i<items.length;i++){
            registro+='<option value="'+items[i].uniqid+'">'+items[i].pais+'</option>';
        }
        $("#pais").html(registro);
    }
    


})




