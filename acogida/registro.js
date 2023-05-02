var endpoint="localhost:7001";

$(document).ready(function(){

    const valores1=window.location.search;
    console.log(valores1)
    const urlParams = new URLSearchParams(valores1);
    var numero=urlParams.get("numeroDocumento");
    

//alert("prueba")

var nombres = $("#nombres").val();
var primerApellido = $("#primer_apellido").val();
var segundoApellido = $("#segundo_apellido").val();

$("#radio2A").click(function(){

    deshabilitarCampos();
})

$("#radio1A").click(function(){

    habilitarCampos();
})

mostrarInformacion(numero);

$("#seleccione_guardar").click(function(){

    if($("#radio1A").prop("checked")==false && $("#radio2A").prop("checked")==false ){
        alert("seleccionar condiciones para ser beneficiario del programa");
    }
    else if($("#radio1A").prop("checked")==true){
        validarCampos();
    }

})
$("#button_guarda").click(function(){

    if($("#radio1A").prop("checked")==false && $("#radio2A").prop("checked")==false ){
        alert("seleccionar condiciones para ser beneficiario del programa");
    }
    else if($("#radio1A").prop("checked")==false){
        validarCamposMinimos();
    }
    
})


function validarCamposMinimos(){   

    if($("#canal_atencion").val()=="0"){
        alert("seleccione canal de atención")
    }
    else if($("#radio1B").prop("checked")==false && $("#radio2B").prop("checked")==false ){
        alert("seleccione aceptación términos y condiciones");
    }
    else if($("#observaciones").val()==""){
        alert("Ecsriba las obsevaciones pertinentes")
    }
    else{
        guardarFormulario();
        location.href="/introduccion.html";

    }


}

function guardarFormulario(){

    if($("#radio1A").prop("checked")){condiciones="s"}else{condiciones="n"};
    if($("#radio1B").prop("checked")){aceptacion="s"}else{aceptacion="n"};

    let registro={
        numero_documento:$("#numero_documento").val(),
        condiciones_programa:condiciones,
        canal_atencion:$("#canal_atencion").val(),
        aceptacion_terminos:aceptacion,
        tipo_documento:$("#tipo_documento").val(),
        num_documento:$("#numero_documento").val(),
        nombres:$("#nombres").val(),
        primer_apellido:$("#primer_apellido").val(),
        segundo_apellido:$("#segundo_apellido").val(),
        fecha_expedicion:null,
        direccion:null,
        info_complementaria:null,
        verificacion_direccion:null,
        localidad:null,
        barrio:null,
        estrato:null,
        tel_fijo:null,
        cel_1:$("#celular_1").val(),
        cel_2:$("#celular_2").val(),
        correo:null,
        nombre_contacto:null,
        primer_apellido_cont:null,
        segundo_apellido_cont:null,
        cel_contacto:null,
        parentesco:null,
        observaciones:$("#observaciones").val()
    }

    $.ajax({

        url:endpoint+"/registro/save",
        type:'POST',
        data:JSON.stringify(registro),
        dataType:'json',
        contentType:"application/json",
        complete:function(data){
            console.log(data.status)
            let mensaje=""
            if(data.status=="201"){
                mensaje="guardo registro con exito"
                alert("Se guardó registro con éxito!!")
            }
            else{
                mensaje="problemas al guardar en base datos"
                alert("Ups... Problemas!! No se guardó registro en la base datos!!")
            }
            console.log(mensaje)
        }
    })
}


function validarCampos(){

    if($("#canal_atencion").val()=="0"){
        alert("seleccione canal de atención")
    }
    else if($("#radio1B").prop("checked")==false && $("#radio2B").prop("checked")==false ){
        alert("seleccione aceptación términos y condiciones");
    }
    else if($("#fecha_expedicion").val==""){
        alert("Selleccionar fecha expedición documento")
    }
    else if($("#calle").val()=="0"){
        alert("Seleccione opción en desplegable dirección ")
    }
    else if($("#8").val()==""){
        alert("llenar casilla 8*")
    }
    else if($("#SUR").val()=="0"){
        alert("Seleccione opción en desplegable sur")
    }
    else if($("#9").val()==""){
        alert("llenar casilla 9*")
    }
    else if($("#25").val()==""){
        alert("llenar casilla 25*")
    }
    else if($("#ESTE").val()=="0"){
        alert("Seleccione opción en desplegable ESTE")
    }
    else if($("#info_complementaria").val()==""){
        alert("Llenar casilla Información Complementaria")
    }
    else if($("#localidad").val()=="0"){
        alert("Seleccione opción en Localidad")
    }
    else if($("#barrio").val()==""){
        alert("Llenar casilla Barrio de Residencia")
    }
    else if($("#estrato").val()=="0"){
        alert("Seleccione opción Estrato Socioeconómico")
    }
    else if($("#tel_fijo").val()==""){
        alert("Llenar casilla Telefono Fijo")
    }
    else if($("#email").val()==""){
        alert("Llenar casilla Correo Electrónico")
    }
    else if($("#nom_cont_usu").val()==""){
        alert("Llenar casilla Nombre Contacto Usuario")
    }
    else if($("#prim_apell").val()==""){
        alert("Llenar casilla Primer Apellido")
    }else if($("#seg_apell").val()==""){
        alert("Llenar casilla Segundo Apellido")
    }
    else if($("#cel_numero").val()==""){
        alert("Llenar casilla Celular Contacto")
    }else if($("#parentesco").val()==""){
        alert("Seleccionar casilla Parentesco")
    }
    else{
        
        guardarInformacion()
        //alert("Información guardada")
        //borrar()
        window.location='datos_demograficos.html?numeroDocumento='+numero+'&nombres='+nombres+'&primerApellido='+primerApellido+'&segundoApellido='+segundoApellido;
        
    }

}

function deshabilitarCampos(){
    $(".hab").attr('disabled',true);
    $("#observaciones").attr('disabled',false);
    $("#seleccione_guardar").attr('disabled',true);
    $("#button_guarda").attr('disabled',false);
}

function habilitarCampos(){
    $(".hab").attr('disabled',false);
    $("#observaciones").attr('disabled',true);
    $("#seleccione_guardar").attr('disabled',false);
    $("#button_guarda").attr('disabled',true);
}

function mostrarInformacion(numeroDocumento){
    $.ajax({
        url:endpoint+"/registro/consulta?numeroDocumento="+numeroDocumento,
        type:"GET",
        dataType:"json",
        success:function(respuesta){
            console.log(respuesta);
            pintarRespuesta(respuesta.items)
        }
    })
}

function pintarRespuesta(items){

    if(items.condiciones_programa==null){$("#radio1A").attr("checked",false);$("#radio2A").attr("checked",false)};
    if(items.condiciones_programa=="s"){$("#radio1A").attr("checked",true);$("#radio2A").attr("checked",false)};
    if(items.condiciones_programa=="n"){$("#radio2A").attr("checked",true);$("#radio1A").attr("checked",false)};
    if(items.canal_atencion_acogida==null){$("#canal_atencion").val("0")}else{$("#canal_atencion").val(items.canal_atencion_acogida)};
    if(items.aceptacion_terminos==null){$("#radio1B").attr("checked",false);$("#radio2B").attr("checked",false)};
    if(items.aceptacion_terminos=="s"){$("#radio1B").attr("checked",true);$("#radio2B").attr("checked",false)};
    if(items.aceptacion_terminos=="n"){$("#radio2B").attr("checked",true);$("#radio1B").attr("checked",false)};
    $("#tipo_documento").val(items.tipo_documento);
    $("#numero_documento").val(items.num_documento);
    $("#nombres").val(items.nombres);
    $("#primer_apellido").val(items.primer_apellido);
    if(items.segundo_apellido==null){$("#segundo_apellido").val("")}else{$("#segundo_apellido").val(items.segundo_apellido)};
    if(items.fecha_expedicion!=null){$("#fecha_expedicion").val(items.fecha_expedicion)}else{$("#fecha_expedicion").val("")};
    if(items.direccion!=null){$("#calle").val(items.direccion)}else{$("#calle").val("0")};
    if(items.info_complementaria!=null){$("#info_complementaria").val(items.info_complementaria)}else{$("#info_complementaria").val("")};
    if(items.verificacion_direccion==null){$("#direccion").val("")}else{$("#direccion").val(items.verificacion_direccion)};
    if(items.localidad==null){$("#localidad").val("0")}else{$("#localidad").val(items.localidad)};
    if(items.barrio==null){$("#barrio").val("")}else{$("#barrio").val(items.barrio)};
    if(items.estrato==null){$("#estrato").val("0")}else{$("#estrato").val(items.estrato)};
    if(items.tel_fijo==0){$("#tel_fijo").val("")}else{$("#tel_fijo").val(items.tel_fijo)};
    $("#celular_1").val(items.cel_1);
    if(items.cel_2==0){$("#celular_2").val("")}else{$("#celular_2").val(items.cel_2)};
    if(items.correo==null){$("#email").val("")}else{$("#email").val(items.correo)};
    if(items.nombre_contacto==null){$("#nom_cont_usu").val("")}else{$("#nom_cont_usu").val(items.nombre_contacto)};
    if(items.primer_apellido_cont==null){$("#prim_apell").val("")}else{$("#prim_apell").val(items.primer_apellido_cont)};
    if(items.segundo_apellido_cont==null){$("#seg_apell").val("")}else{$("#seg_apell").val(items.segundo_apellido_cont)};
    if(items.cel_contacto==0){$("#cel_numero").val("")}else{$("#cel_numero").val(items.cel_contacto)};
    if(items.parentesco==null){$("#parentesco").val("")}else{$("#parentesco").val(items.parentesco)};
    if(items.observaciones==null){$("#observaciones").val("")}else{$("#observaciones").val(items.observaciones)}
}


function guardarInformacion(){

    if($("#radio1A").prop("checked")){condiciones="s"}else{condiciones="n"};
    if($("#radio1B").prop("checked")){aceptacion="s"}else{aceptacion="n"};

    let registro={
        numero_documento:$("#numero_documento").val(),
        condiciones_programa:condiciones,
        canal_atencion:$("#canal_atencion").val(),
        aceptacion_terminos:aceptacion,
        tipo_documento:$("#tipo_documento").val(),
        num_documento:$("#numero_documento").val(),
        nombres:$("#nombres").val(),
        primer_apellido:$("#primer_apellido").val(),
        segundo_apellido:$("#segundo_apellido").val(),
        fecha_expedicion:$("#fecha_expedicion").val(),
        direccion:$("#calle").val(),
        info_complementaria:$("#info_complementaria").val(),
        verificacion_direccion:$("#direccion").val(),
        localidad:$("#localidad").val(),
        barrio:$("#barrio").val(),
        estrato:$("#estrato").val(),
        tel_fijo:$("#tel_fijo").val(),
        cel_1:$("#celular_1").val(),
        cel_2:$("#celular_2").val(),
        correo:$("#email").val(),
        nombre_contacto:$("#nom_cont_usu").val(),
        primer_apellido_cont:$("#prim_apell").val(),
        segundo_apellido_cont:$("#seg_apell").val(),
        cel_contacto:$("#cel_numero").val(),
        parentesco:$("#parentesco").val(),
        observaciones:null
        //observaciones:$("#observaciones").val(null)-----------------------------------------
    }
    $.ajax({

        url:endpoint+"/registro/save",
        type:'POST',
        data:JSON.stringify(registro),
        dataType:'json',
        contentType:"application/json",
        complete:function(data){
            console.log(data.status)
            let mensaje=""
            if(data.status=="201"){
                mensaje="guardo registro con exito"
                alert("Se guardó registro con éxito!!")
            }
            else{
                mensaje="problemas al guardar en base datos"
                alert("Ups... Problemas!! No se guardó registro en la base datos!!")
            }
            console.log(mensaje)
        }
    })

}


})
