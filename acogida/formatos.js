//var endpoint="localhost:7001/CasaLAco";
var endpoint="http://172.21.21.27:9073/part1/CasaLAco"; //  /acogida

$(document).ready(function(){

    const valores1=window.location.search;
    console.log(valores1)
    const urlParams = new URLSearchParams(valores1);
    var numero=urlParams.get("numeroDocumento");
    //var fechaExpedicion=urlParams.get("fecha_expedicion");
    //var fechaNacimiento=urlParams.get("fecha_nacimiento");
    var nombres=urlParams.get("nombres");
    var primerApellido=urlParams.get("primerApellido");
    var segundoApellido=urlParams.get("segundoApellido");


    //alert("Funciona");

    traerFormatos();

    $("#registro").click(function(){
        //window.location='registro.html?numeroDocumento='+numero+'&fecha_expedicion=' + fechaExpedicion +'&fecha_nacimiento=' + fechaNacimiento+'&nombres='+nombres+'&primerApellido='+primerApellido+'&segundoApellido='+segundoApellido;

        window.location='registro.html?numeroDocumento='+numero+'&nombres='+nombres+'&primerApellido='+primerApellido+'&segundoApellido='+segundoApellido;
    })
    $("#datos_dem").click(function(){
    
        //window.location='datos_demograficos.html?numeroDocumento='+numero+'&fecha_expedicion=' + fechaExpedicion +'&fecha_nacimiento=' + fechaNacimiento+'&nombres='+nombres+'&primerApellido='+primerApellido+'&segundoApellido='+segundoApellido;

        window.location='datos_demograficos.html?numeroDocumento='+numero+'&nombres='+nombres+'&primerApellido='+primerApellido+'&segundoApellido='+segundoApellido;
    })
    
    $("#vivienda").click(function(){
        //window.location='vivienda.html?numeroDocumento='+numero+'&fecha_expedicion=' + fechaExpedicion +'&fecha_nacimiento=' + fechaNacimiento+'&nombres='+nombres+'&primerApellido='+primerApellido+'&segundoApellido='+segundoApellido;

        window.location='vivienda.html?numeroDocumento='+numero+'&nombres='+nombres+'&primerApellido='+primerApellido+'&segundoApellido='+segundoApellido;
    })
    
    $("#antecedente").click(function(){
        //window.location='antecedentes.html?numeroDocumento='+numero+'&fecha_expedicion=' + fechaExpedicion +'&fecha_nacimiento=' + fechaNacimiento+'&nombres='+nombres+'&primerApellido='+primerApellido+'&segundoApellido='+segundoApellido;

        window.location='antecedentes.html?numeroDocumento='+numero+'&nombres='+nombres+'&primerApellido='+primerApellido+'&segundoApellido='+segundoApellido;
    })
    
    $("#programa").click(function(){
        //window.location='programas.html?numeroDocumento='+numero+'&fecha_expedicion=' + fechaExpedicion +'&fecha_nacimiento=' + fechaNacimiento+'&nombres='+nombres+'&primerApellido='+primerApellido+'&segundoApellido='+segundoApellido;

        window.location='programas.html?numeroDocumento='+numero+'&nombres='+nombres+'&primerApellido='+primerApellido+'&segundoApellido='+segundoApellido;
    })
    
    $("#formato").click(function(){
        //window.location='formatos.html?numeroDocumento='+numero+'&fecha_expedicion=' + fechaExpedicion +'&fecha_nacimiento=' + fechaNacimiento+'&nombres='+nombres+'&primerApellido='+primerApellido+'&segundoApellido='+segundoApellido;

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
        
    })

    $("#btn_guardar").click(function(){
        var sitio=1;
        validarFormulario(sitio);
        
    })

    function validarFormulario(sitio) {

        if ($("#consentimiento_firma").val() == "0") {
            alert("Seleccione opción ¿Usuario firmó consentimiento informado");
        }
        /*else if($("#consentimiento_firma").val()=="si" || $("#consentimiento_firma").val()=="no"){
            alert("Adjuntar Consentimiento Informado");
        }*/
        else if ($("#adjunto_concentimiento_firma").val() == false) {
            alert(("Adjuntar Consentimiento Informado"))
        }
        else if ($("#consentimiento_firma_habeas").val() == "0") {
            alert("Seleccione opción ¿Usuario firmó Autorización Tratamiento Datos Personales Habeas Data?");
        }
        /*else if($("#consentimiento_firma_habeas").val()=="si" || $("#consentimiento_firma_habeas").val()=="no"){
            alert("Adjuntar Autorización Tratamiento Datos Personales");
        }*/
        else if ($("#adjunto_datos_habeas").val() == false) {
            alert("Adjuntar Autorización Tratamiento Datos Personales");
        }
        else if ($("#consentimiento_uso_imagen").val() == "0") {
            alert("Seleccionar ¿Usuario firmó Autorización de uso de Imagen?")
        }
        /*else if($("#consentimiento_uso_imagen").val()=="si" || $("#consentimiento_uso_imagen").val()=="no"){
            alert("Adjuntar Autorización Uso de Imagen");
        }*/
        /*else if($("#adjunto_uso_imagen").val()==false){
            alert("Adjuntar Autorización Uso de Imagen")
        }*/
        else if ($("#medio_att_no_presencial").val() == "0") {
            alert("Seleccione ¿El ciudadano dispone de los siguientes elementos para realizar la atención no presencial?")
        }
        else if ($("#estado").val() == "0") {
            alert("Seleccione Estado")
        }
        else {
            guardarFormatos();

            if ($("#consentimiento_uso_imagen").val()==="si") { 
                //guardarBandejaArticulacion(); SE ELIMINA POR EL MOMENTO HASTA CONSTRUCCIÖN DEL MÖDULO ARTICULACIÖN   
                eliminarTurno();  
            } else {
                alert("Se guardaron Formatos")
            }

            if (sitio == 1) {
                location.href = "/introduccion.html";
            } else {
                //window.location = 'programas.html?numeroDocumento=' + numero + '&fecha_expedicion=' + fechaExpedicion + '&nombres=' + nombres + '&primerApellido=' + primerApellido + '&segundoApellido=' + segundoApellido;

                window.location = 'programas.html?numeroDocumento=' + numero  + '&nombres=' + nombres + '&primerApellido=' + primerApellido + '&segundoApellido=' + segundoApellido;
            }
            
        }
    }

    function guardarFormatos(){
            let consentFirma=$("#consentimiento_firma").val();
            let tratDatosFirma=$("#consentimiento_firma_habeas").val();
            let autorizacionImagenFirma=$("#consentimiento_uso_imagen").val(); 
            let medioAttNoPresencial=$("#medio_att_no_presencial").val();
            let estad=$("#estado").val();


            var formdata= new FormData();
            formdata.append("numeroDocumento",numero);
            formdata.append("consentimientoFirma",consentFirma);
            formdata.append("tratamientoDatosFirma",tratDatosFirma);
            formdata.append("autorizImagenFirma",autorizacionImagenFirma);
            formdata.append("mediosAttNoPresenc",medioAttNoPresencial);
            formdata.append("estado",estad);


            var imagen1=$("#adjunto_concentimiento_firma").val();
            if(imagen1!=""){
                var file_data1=$('input[name="consentimiento"]')[0].files;
                for(var i=0;i<file_data1.length;i++){
                    formdata.append("consentimiento",file_data1[i]);
                }
            }
            
            var imagen2=$("#adjunto_datos_habeas").val();
            if(imagen2!=""){
                var file_data2=$('input[name="autorTratamDatos"]')[0].files;
                for(var j=0;j<file_data2.length;j++){
                    formdata.append("autorTratamDatos",file_data2[j]);
                }
            }

            var imagen3=$("#adjunto_uso_imagen").val();
            if(imagen3!=""){
                var file_data3=$('input[name="autorUsoImagen"]')[0].files;
                for(var k=0;k<file_data3.length;k++){
                    formdata.append("autorUsoImagen",file_data3[k]);
                }
            }

            $.ajax({

                url:endpoint+"/formatos/save",
                type:'POST',
                data:formdata,
                dataType:"json",
                contentType:false,
                processData:false,
                //contentType:"multipart/form-data",
                cache:false,
                timeout:600000,
                enctype:"multipart/form-data",
                complete:function(data){
                    console.log(data.status)
                        let mensaje = ""
                        if (data.status == "201") {
                            mensaje = "guardo Formatos con exito"
                        } else {
                            mensaje = "problemas al guardar en base datos consulte con el administrador"
                            alert(mensaje)
                        }
                        console.log(mensaje)
                        
                    
                    
                }
            })
    }

    function guardarBandejaArticulacion(){

        let bandeja={
            numeroDocumento:numero,
            nombres:nombres,
            primer_apellido:primerApellido,
            segundoApellido:segundoApellido,
            accion:"s"
        }

        $.ajax({

            url:endpoint+"/bandejaArtic/save",
            type:"POST",
            data:JSON.stringify(bandeja),
            dataType:'json',
            contentType:"application/json",
            complete:function(data){
                console.log(data.status)
                let mensaje=""
                if(data.status=="201"){
                    mensaje="se guardo bandeja articulación"
                }else{
                    mensaje="problemas al guardar bandeja articulación en base datos consulte con el administrador"
                    alert(mensaje);
                }
                console.log(mensaje)
            }
        })
    }

    function eliminarTurno(){
        let bandeja={
            numeroDocumento:numero
        }
        $.ajax({

            url:endpoint+"/bandaco/delete",
            type:"DELETE",
            data:JSON.stringify(bandeja),
            dataType:'json',
            contentType:"application/json",
            complete:function(data){
                console.log(data.status)
                let mensaje=""
                if(data.status=="204"){
                    mensaje="eliminó turno y guardo Formatos con exito"
                }else{
                    mensaje="problemas al eliminar en base datos consulte con el administrador"
                    
                }
                alert(mensaje);
                console.log(mensaje)
            }
        })


    }

    function traerFormatos(){  

        $.ajax({
            url:endpoint+"/formatos/consulta?numeroDocumento="+numero,
            type:"GET",
            dataType:"json",
            success:function(respuesta){
                console.log(respuesta);
                pintarRespuesta(respuesta)
            }
        })
    }
    
    function pintarRespuesta(items){
        if(items.consentimiento_firma!==null){$("#consentimiento_firma").val(items.consentimiento_firma)}else{$("#consentimiento_firma").val("0")}
        if(items.trat_datos_firma===null){$("#consentimiento_firma_habeas").val("0")}else{$("#consentimiento_firma_habeas").val(items.trat_datos_firma)}
        if(items.autoriz_imagen_firma===null){$("#consentimiento_uso_imagen").val("0")}else{$("#consentimiento_uso_imagen").val(items.autoriz_imagen_firma)}
        if(items.medio_att_no_presencial===null){$("#medio_att_no_presencial").val("0")}else{$("#medio_att_no_presencial").val(items.medio_att_no_presencial);}
        if(items.estado===null){$("#estado").val("registrado")}else{$("#estado").val(items.estado)}
        if(items.adjunto_concentimiento!==null){
            $("#adjunto_concentimiento_firma").val(items.adjunto_concentimiento.name);//items.adjunto_concentimiento   .getOriginalFilename
        }else{$("#adjunto_concentimiento_firma").val("")}
        if(items.adjunto_trat_datos!==null){
            $("#adjunto_datos_habeas").val(items.adjunto_trat_datos.name);//items.adjunto_trat_datos.name    getOriginalFilename
        }else{$("#adjunto_datos_habeas").val("")}
        if(items.adjunto_uso_imagen!==null){
            $("#adjunto_uso_imagen").val(items.adjunto_uso_imagen.name);//items.adjunto_uso_imagen.name    getOriginalFilename
        }else{$("#adjunto_uso_imagen").val("")}

        
    }

})


