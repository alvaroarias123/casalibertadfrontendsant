//var endpoint="localhost:7001";
var endpoint="http://172.21.21.27:9073/part1/casa_libertad_aco";
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

    traerFormatos(numero);

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
        validarFormulario(sitio);
        //guardarBandejaArticulacion();
        //alert("Se guardo info en Bandeja Articulación");
        //window.location='programas.html?numeroDocumento='+numero+'&nombres='+nombres+'&primerApellido='+primerApellido+'&segundoApellido='+segundoApellido;
    })

    $("#btn_guardar").click(function(){
        var sitio=1;
        validarFormulario(sitio);
        //guardarBandejaArticulacion();
        //location.href="/introduccion.html";
    })

    function validarFormulario(sitio){   

        if($("#consentimiento_firma").val()=="0"){
            alert("Seleccione opción ¿Usuario firmó consentimiento informado");
        }
        else if($("#consentimiento_firma").val()=="si" || $("#consentimiento_firma").val()=="no"){
            alert("Adjuntar Consentimiento Informado");
        }
        else if($("#consentimiento_firma_habeas").val()=="0"){
            alert("Seleccione opción ¿Usuario firmó Autorización Tratamiento Datos Personales Habeas Data?");
        }
        else if($("#consentimiento_firma_habeas").val()=="si" || $("#consentimiento_firma_habeas").val()=="no"){
            alert("Adjuntar Autorización Tratamiento Datos Personales");
        }
        else if($("#consentimiento_uso_imagen").val()=="0"){
            alert("Seleccionar ¿Usuario firmó Autorización de uso de Imagen?")
        }
        else if($("#consentimiento_uso_imagen").val()=="si" || $("#consentimiento_uso_imagen").val()=="no"){
            alert("Adjuntar Autorización Uso de Imagen");
        }
        else if($("#medio_att_no_presencial").val()=="0"){
            alert("Seleccione ¿El ciudadano dispone de los siguientes elementos para realizar la atención no presencial?")
        }
        else if($("#estado").val()=="0"){
        }
        else{
            guardarFormatos(numero,sitio);
            //alert("Se guardo Formatos");

        }
    }

    function traerFormatos(numero){

        $.ajax({
            url:endpoint+"/formatos/consulta?numeroDocumento="+numero,
            type:"GET",
            dataType:"json",
            success:function(respuesta){
                console.log(respuesta);
                pintarRespuesta(respuesta.items)
            }
        })
    }

    function pintarRespuesta(items){
        if(items.consentimiento_firma==null){$("#consentimiento_firma").val("0")}else{$("#consentimiento_firma").val(items.consentimiento_firma);}
        if(items.trat_datos_firma==null){$("#consentimiento_firma_habeas").val("0")}else{$("#consentimiento_firma_habeas").val(items.trat_datos_firma)}
        if(items.autoriz_imagen_firma==null){$("#consentimiento_uso_imagen").val("0")}else{$("#consentimiento_uso_imagen").val(items.autoriz_imagen_firma)}
        if(items.adjunto_concentimiento!=null){
            $("#adjunto_concentimiento_firma").val(items.adjunto_concentimiento);
        }else{$("#adjunto_concentimiento_firma").val("");}
        if(items.adjunto_trat_datos!=null){
            $("#adjunto_datos_habeas").val(items.adjunto_trat_datos);
        }else{$("#adjunto_datos_habeas").val("");}
        if(items.adjunto_uso_imagen!=null){
            $("#adjunto_uso_imagen").val(items.adjunto_uso_imagen);
        }else{$("#adjunto_uso_imagen").val("");}
        if(items.medio_att_no_presencial==null){$("#medio_att_no_presencial").val("0")}else{$("#medio_att_no_presencial").val(items.medio_att_no_presencial);}
        if(items.estado==null){$("#estado").val("0")}else{$("#estado").val(items.estado)}
        
    }

    function guardarFormatos(numero,sitio){

        let informacion={
            consentimiento_firma:$("#consentimiento_firma").val(),
            trat_datos_firma:$("#consentimiento_firma_habeas").val(),
            autoriz_imagen_firma:$("#consentimiento_uso_imagen").val(),
            adjunto_concentimiento:$("#adjunto_concentimiento_firma").val(),
            adjunto_trat_datos:$("#adjunto_datos_habeas").val(),
            adjunto_uso_imagen:$("#adjunto_uso_imagen").val(),
            medio_att_no_presencial:$("#medio_att_no_presencial").val(),
            estado:$("#estado").val()  
        }

        $.ajax({

            url:endpoint+"/formatos/save?numeroDocumento="+numero,
            type:'POST',
            data:JSON.stringify(informacion),
            dataType:'json',
            contentType:"application/json",
            complete:function(data){
                console.log(data.status)
                let mensaje=""
                if(data.status=="201"){
                    mensaje="guardo Formatos con exito"
                    alert("Se guardó Formatos con éxito!!")
                    guardarBandejaArticulacion(sitio);
                    
                }
                else{
                    mensaje="problemas al guardar en base datos"
                    alert("Ups... No se ha guardado Formatos en base datos!!")
                }
                console.log(mensaje)
            }
        })
    }

    function guardarBandejaArticulacion(sitio){

        let bandeja={
            numeroDocumento:numero,
            nombres:nombres,
            primer_apellido:primerApellido,
            segundoApellido:segundoApellido,
            accion:"Si"
        }

        $.ajax({

            url:endpoint+"/bandejaArtic/save",
            type:"POST",
            data:JSON.stringify(bandeja),
            dataType:'json',
            contentType:"application/json",
            complete:function(data){
                console.log(data.status)
                let mensaje =""
                if(data.status=="201"){
                    mensaje="guardo visitante con exito"
                    alert("Se creó turno en articulación con éxito!!")
                    if(sitio==1){
                        location.href="/introduccion.html";
                    }else{
                        window.location='programas.html?numeroDocumento='+numero+'&nombres='+nombres+'&primerApellido='+primerApellido+'&segundoApellido='+segundoApellido;
                    }
                }
                else{
                    mensaje="problemas al guardar en base datos"
                    alert("Ups... No se ha guardado turno en Articulación. Comuníquese con el Administrador!!!")
                }
                console.log(mensaje)
            }
        })
    }











})