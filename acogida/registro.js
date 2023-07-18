//var endpoint="localhost:7001/CasaLAco";
//var endpoint = "http://172.21.21.27:9073/part1/CasaLAco"; //  /acogida

$(document).ready(function () {

    if(!sessionStorage.getItem("validacion")){
        location.href="/index.html";
    }
    const valores1 = window.location.search;
    console.log(valores1)
    const urlParams = new URLSearchParams(valores1);
    var numero = urlParams.get("numeroDocumento");
    //var fechaExpedicion=urlParams.get("fecha_expedicion");
    //var fechaNacimiento=urlParams.get("fecha_nacimiento");

    



    $("#registro").click(function () {
        var fechaExpedicion=$("#fecha_expedicion").val();
        window.location = 'registro.html?numeroDocumento=' + numero + '&fecha_expedicion=' + fechaExpedicion;
    })

    $("#datos_dem").click(function () {
        var fechaExpedicion=$("#fecha_expedicion").val();
        window.location = 'datos_demograficos.html?numeroDocumento=' + numero + '&fecha_expedicion=' + fechaExpedicion;
    })

    $("#vivienda").click(function () {
        var fechaExpedicion=$("#fecha_expedicion").val();
        window.location = 'vivienda.html?numeroDocumento=' + numero + '&fecha_expedicion=' + fechaExpedicion; 
    })

    $("#antecedente").click(function () {
        var fechaExpedicion=$("#fecha_expedicion").val();
        window.location = 'antecedentes.html?numeroDocumento=' + numero + '&fecha_expedicion=' + fechaExpedicion;
    })

    $("#programa").click(function () {
        var fechaExpedicion=$("#fecha_expedicion").val();
        window.location = 'programas.html?numeroDocumento=' + numero + '&fecha_expedicion=' + fechaExpedicion;
    })

    $("#formato").click(function () {
        var fechaExpedicion=$("#fecha_expedicion").val();
        window.location = 'formatos.html?numeroDocumento=' + numero + '&fecha_expedicion=' + fechaExpedicion;
    })


    $("#boton_aumentar").click(function () {

        var ventana_ancho = $("#cuerpo").width();
        var ventana_alto = $("#cuerpo").height();

        console.log(ventana_ancho);
        console.log(ventana_alto);

        nuevoAncho = 1.2 * ventana_ancho;
        nuevoAlto = 1.2 * ventana_alto;

        $("#cuerpo").width(nuevoAncho)
        $("#cuerpo").height(nuevoAlto)


    })

    $("#boton_disminuir").click(function () {

        var ventana_ancho = $("#cuerpo").width();
        var ventana_alto = $("#cuerpo").height();

        console.log(ventana_ancho);
        console.log(ventana_alto);

        nuevoAncho = ventana_ancho / 1.2;
        nuevoAlto = ventana_alto / 1.2;

        $("#cuerpo").width(nuevoAncho)
        $("#cuerpo").height(nuevoAlto)

    })


    
    $("#radio2A").click(function () {

        deshabilitarCampos();
    })

    $("#radio1A").click(function () {

        habilitarCampos();
    })

    mostrarInformacion(numero);


    $("#seleccione_guardar").click(function () {

        if ($("#radio1A").prop("checked") == false && $("#radio2A").prop("checked") == false) {
            alert("seleccionar condiciones para ser beneficiario del programa");
        }
        else if ($("#radio1A").prop("checked") == true) {
            validarCampos(numero);
        }

    })
    $("#button_guarda").click(function () {

        if ($("#radio1A").prop("checked") == false && $("#radio2A").prop("checked") == false) {
            alert("seleccionar condiciones para ser beneficiario del programa");
        }
        else if ($("#radio1A").prop("checked") == false) {
            validarCamposMinimos();
        }

    })

    //BLUR CON FECHA NACIMIENTO OJO AQUI SE NECESITA VER SI FECHA NACIMIENTO = NULL O ""
    $("#fecha_expedicion").blur(function(){
        var fechaExpedicion=$("#fecha_expedicion").val();
        //fechaNac=new Date(fechaNacimiento);
        fechaExp=new Date(fechaExpedicion);
        fechaActual= new Date();

        if(fechaExp.getFullYear()>fechaActual.getFullYear()){
            alert("fecha expedición erronea");
        }
        else if(fechaExp.getFullYear()==fechaActual.getFullYear()){
            if(fechaExp.getMonth()>fechaActual.getMonth()){
                alert("fecha expedición erronea");
            }else if(fechaExp.getDate()>=fechaActual.getDate()){
                alert("fecha expedidión erronea");
            }
        }

        /*else if(fechaNac.getFullYear()>fechaExp.getFullYear()){
            alert("Revisar fecha de nacimiento en Datos Demográficos y fecha expedición documento en Registro. Una de las dos está errada!! ")
        }
        else if(fechaNac.getFullYear()==fechaExp.getFullYear()){
            if(fechaNac.getMonth()>fechaExp.getMonth()){
                alert("Revisar fecha de nacimiento en Datos Demográficos y fecha expedición documento en Registro. Una de las dos está errada!! ")
            }else if(fechaNac.getDate()>=fechaExp.getDate()){
                alert("Revisar fecha de nacimiento en Datos Demográficos y fecha expedición documento en Registro. Una de las dos está errada!! ")
            }    
        
    }*/
    })

    $("#calle").blur(function () {
        var cal = $("#calle").val();
        $("#direccion").val(cal);
        $("#8").val("");
        $("#A").val("");
        $("#BIS").val("");
        $("#AA").val("");
        $("#SUR").val("");
        $("#9").val("");
        $("#AAA").val();
        $("#25").val("");
        $("#ESTE").val("");
        $("#info_complementaria").val("");

    })


    $("#8").blur(function () {
        var cal = $("#calle").val();
        var nu = $("#8").val().trim();
        $("#A").val("");
        $("#BIS").val("");
        $("#AA").val("");
        $("#SUR").val("");
        $("#9").val("");
        $("#AAA").val();
        $("#25").val("");
        $("#ESTE").val("");
        $("#info_complementaria").val("");
        if(isNaN(nu)){
            alert("casilla 8 solo acepta números");
            $("#8").val("");
        }else{
        $("#direccion").val(cal + " " + nu);
        }
    })

    $("#A").blur(function () {
        var cal = $("#calle").val();
        var nu = $("#8").val().trim();
        var som = $("#A").val();
        $("#BIS").val("");
        $("#AA").val("");
        $("#SUR").val("");
        $("#9").val("");
        $("#AAA").val();
        $("#25").val("");
        $("#ESTE").val("");
        $("#info_complementaria").val("");
        $("#direccion").val(cal + " " + nu + " " + som);

    })

    $("#BIS").blur(function () {
        var cal = $("#calle").val();
        var nu = $("#8").val().trim();
        var som = $("#A").val();
        var bis = $("#BIS").val();
        $("#AA").val("");
        $("#SUR").val("");
        $("#9").val("");
        $("#AAA").val();
        $("#25").val("");
        $("#ESTE").val("");
        $("#info_complementaria").val("");
        $("#direccion").val(cal + " " + nu + " " + som + " " + bis);

    })

    $("#AA").blur(function () {
        var cal = $("#calle").val();
        var nu = $("#8").val().trim();
        var som = $("#A").val();
        var bis = $("#BIS").val();
        var aa = $("#AA").val();
        $("#SUR").val("");
        $("#9").val("");
        $("#AAA").val();
        $("#25").val("");
        $("#ESTE").val("");
        $("#info_complementaria").val("");
        $("#direccion").val(cal + " " + nu + " " + som + " " + bis + " " + aa);

    })

    $("#SUR").blur(function () {
        var cal = $("#calle").val();
        var nu = $("#8").val().trim();
        var som = $("#A").val();
        var bis = $("#BIS").val();
        var aa = $("#AA").val();
        var sur = $("#SUR").val();
        $("#9").val("");
        $("#AAA").val();
        $("#25").val("");
        $("#ESTE").val("");
        $("#info_complementaria").val("");
        $("#direccion").val(cal + " " + nu + " " + som + " " + bis + " " + aa + " " + sur);

    })

    $("#9").blur(function () {
        var cal = $("#calle").val();
        var nu = $("#8").val().trim();
        var som = $("#A").val();
        var bis = $("#BIS").val();
        var aa = $("#AA").val();
        var sur = $("#SUR").val();
        var me = $("#9").val().trim();
        $("#AAA").val();
        $("#25").val("");
        $("#ESTE").val("");
        $("#info_complementaria").val("");
        if(isNaN(me)){
            alert("casilla 9 solo acepta números");
            $("#9").val("");
        }else{
        $("#direccion").val(cal + " " + nu + " " + som + " " + bis + " " + aa + " " + sur + " # " + me);
        }   
    })

    $("#AAA").blur(function () {
        var cal = $("#calle").val();
        var nu = $("#8").val().trim();
        var som = $("#A").val();
        var bis = $("#BIS").val();
        var aa = $("#AA").val();
        var sur = $("#SUR").val();
        var me = $("#9").val().trim();
        var aaa = $("#AAA").val();
        $("#25").val("");
        $("#ESTE").val("");
        $("#info_complementaria").val("");
        $("#direccion").val(cal + " " + nu + " " + som + " " + bis + " " + aa + " " + sur + " # " + me + " " + aaa);

    })

    $("#25").blur(function () {
        var cal = $("#calle").val();
        var nu = $("#8").val().trim();
        var som = $("#A").val();
        var bis = $("#BIS").val();
        var aa = $("#AA").val();
        var sur = $("#SUR").val();
        var me = $("#9").val().trim();
        var aaa = $("#AAA").val();
        var mal = $("#25").val().trim();
        $("#ESTE").val("");
        $("#info_complementaria").val("");
        if(isNaN(mal)){
            alert("casilla 25 solo acepta números")
            $("#25").val("");
        }else{
        $("#direccion").val(cal + " " + nu + " " + som + " " + bis + " " + aa + " " + sur + " # " + me + " " + aaa + " - " + mal);
        }
    })

    $("#ESTE").blur(function () {
        var cal = $("#calle").val();
        var nu = $("#8").val().trim();
        var som = $("#A").val();
        var bis = $("#BIS").val();
        var aa = $("#AA").val();
        var sur = $("#SUR").val();
        var me = $("#9").val().trim();
        var aaa = $("#AAA").val();
        var mal = $("#25").val().trim();
        var este = $("#ESTE").val();
        $("#info_complementaria").val("");
        $("#direccion").val(cal + " " + nu + " " + som + " " + bis + " " + aa + " " + sur + " # " + me + " " + aaa + " - " + mal + "  " + este);

    })

    $("#info_complementaria").blur(function () {
        var cal = $("#calle").val();
        var nu = $("#8").val().trim();
        var som = $("#A").val();
        var bis = $("#BIS").val();
        var aa = $("#AA").val();
        var sur = $("#SUR").val();
        var me = $("#9").val().trim();
        var aaa = $("#AAA").val();
        var mal = $("#25").val().trim();
        var este = $("#ESTE").val();
        var info = $("#info_complementaria").val();

        $("#direccion").val(cal + " " + nu + " " + som + " " + bis + " " + aa + " " + sur + " # " + me + " " + aaa + " - " + mal + "  " + este + "   " + info);

    })

    function validarCampos(numero) {

        if ($("#canal_atencion").val() == "0") {
            alert("seleccione canal de atención")
        }
        else if ($("#radio1B").prop("checked") == false && $("#radio2B").prop("checked") == false) {
            alert("seleccione aceptación términos y condiciones");
        }
        else if ($("#fecha_expedicion").val() == "") {
            alert("Selleccionar fecha expedición documento")
        }
        else if ($("#calle").val() == "0" && $("#direccion").val()=="") {
            alert("Seleccione opción en desplegable dirección ")
        }
        else if ($("#8").val().trim() == "" && $("#direccion").val()=="") {
            alert("llenar casilla 8*")
        }
        else if ($("#9").val().trim() == "" && $("#direccion").val()=="") {
            alert("llenar casilla 9*")
        }
        else if ($("#25").val().trim() == "" && $("#direccion").val()=="") {
            alert("llenar casilla 25*")
        }
        else if ($("#info_complementaria").val().trim() == "" && $("#direccion").val()=="") {
            alert("Llenar casilla Información Complementaria")
        }
        else if ($("#localidad").val() == "0") {
            alert("Seleccione opción en Localidad")
        }
        else if ($("#barrio").val().trim() == "") {
            alert("Llenar casilla Barrio de Residencia")
        }
        else if ($("#estrato").val() == "0") {
            alert("Seleccione opción Estrato Socioeconómico")
        }
        else if($("#tel_fijo").val().trim()!="" && $("#tel_fijo").val().trim().length != 10){
            alert("Teléfono Fijo debe ser de 10 dígitos")
        }
        else if($("#celular_1").val().trim()!="" && $("#celular_1").val().trim().length != 10){
            alert("Teléfono Celular 1 debe ser de 10 dígitos")
        }
        else if($("#celular_2").val().trim()!="" && $("#celular_2").val().trim().length != 10){
            alert("Teléfono Celular 2 debe ser de 10 dígitos")
        }
        else if ($("#email").val().trim() != "") {
            validarCorreo($("#email").val().trim())
        }
        else if ($("#nom_cont_usu").val().trim() == "") {
            alert("Llenar casilla Nombre Contacto Usuario")
        }
        else if ($("#prim_apell").val().trim() == "") {
            alert("Llenar casilla Primer Apellido")
        }
        else if ($("#cel_numero").val().trim() != "" && $("#cel_numero").val().trim().length != 10) {
            alert("Celular Contacto debe ser de 10 dígitos")
        }
        else {
    
            guardarInformacion(numero)
            //var fechaExpedicion=$("#fecha_expedicion").val();
            //borrar()
            //window.location = 'datos_demograficos.html?numeroDocumento=' + numero + '&fecha_expedicion=' + fechaExpedicion +'&fecha_nacimiento='+fechaNacimiento +'&nombres=' + nombres + '&primerApellido=' + primerApellido + '&segundoApellido=' + segundoApellido;

            //window.location = 'datos_demograficos.html?numeroDocumento=' + numero + '&fecha_expedicion=' + fechaExpedicion  +'&nombres=' + nombres + '&primerApellido=' + primerApellido + '&segundoApellido=' + segundoApellido;
    
        }
    
    }
    

    function guardarInformacion(numero) {

        if ($("#radio1A").prop("checked")) { condiciones = "s" } else { condiciones = "n" };
        if ($("#radio1B").prop("checked")) { aceptacion = "s" } else { aceptacion = "n" };
    
        let registro = {
            numero_documento: $("#numero_documento").val().trim(),
            condiciones_programa: condiciones,
            canal_atencion: $("#canal_atencion").val(),
            aceptacion_terminos: aceptacion,
            tipo_documento: $("#tipo_documento").val(),
            num_documento: $("#numero_documento").val().trim(),
            nombres: $("#nombres").val().trim(),
            primer_apellido: $("#primer_apellido").val().trim(),
            segundo_apellido: $("#segundo_apellido").val().trim(),
            fecha_expedicion: $("#fecha_expedicion").val(),
            direccion: $("#calle").val(),
            info_complementaria: $("#info_complementaria").val().trim(),
            verificacion_direccion: $("#direccion").val().trim(),
            localidad: $("#localidad").val(),
            barrio: $("#barrio").val().trim(),
            estrato: $("#estrato").val(),
            tel_fijo: $("#tel_fijo").val().trim(),
            cel_1: $("#celular_1").val().trim(),
            cel_2: $("#celular_2").val().trim(),
            correo: $("#email").val().trim(),
            nombre_contacto: $("#nom_cont_usu").val().trim(),
            primer_apellido_cont: $("#prim_apell").val().trim(),
            segundo_apellido_cont: $("#seg_apell").val().trim(),
            cel_contacto: $("#cel_numero").val().trim(),
            parentesco: $("#parentesco").val().trim(),
            observaciones: null
            //observaciones:$("#observaciones").val(null)-----------------------------------------
        }
        $.ajax({
    
            url:"http://172.21.21.27:9073/part1/CasaLAco/registro/save",
            type:'POST',
            data:JSON.stringify(registro),
            dataType:'json',
            contentType:"application/json",
            //cache:false,
            timeout:600000,
            complete: function(data) {
                console.log(data.status)
                if (data.status == "201") {
                    var fechaExpedicion=$("#fecha_expedicion").val();
                    alert("guardo registro con exito")
                    window.location = 'datos_demograficos.html?numeroDocumento=' + numero + '&fecha_expedicion=' + fechaExpedicion;
                } else {
                    alert("problemas al guardar en base datos consulte con el administrador")
                }
            }
        })
    }

    function deshabilitarCampos() {
        $(".hab").attr('disabled', true);
        $("#observaciones").attr('disabled', false);
        $("#seleccione_guardar").attr('disabled', true);
        $("#button_guarda").attr('disabled', false);
    }
    
    function habilitarCampos() {
        $(".hab").attr('disabled', false);
        $("#observaciones").attr('disabled', true);
        $("#seleccione_guardar").attr('disabled', false);
        $("#button_guarda").attr('disabled', true);
    }
    
    function mostrarInformacion(numeroDocumento) {
        $.ajax({
            url:"http://172.21.21.27:9073/part1/CasaLAco/registro/consulta?numeroDocumento=" + numeroDocumento,
            type:"GET",
            dataType:"json",
            success: function(respuesta) {
                console.log(respuesta);
                pintarRespuesta(respuesta)
            }
        })
    }
    
    function pintarRespuesta(items) {
    
        if (items.condiciones_programa === null) { $("#radio1A").attr("checked", false); $("#radio2A").attr("checked", false) };
        if (items.condiciones_programa === "s") { $("#radio1A").attr("checked", true); $("#radio2A").attr("checked", false) };
        if (items.condiciones_programa === "n") { $("#radio2A").attr("checked", true); $("#radio1A").attr("checked", false) };
        if (items.canal_atencion_acogida === null) { $("#canal_atencion").val("0") } else { $("#canal_atencion").val(items.canal_atencion_acogida) };
        if (items.aceptacion_terminos === null) { $("#radio1B").attr("checked", false); $("#radio2B").attr("checked", false) };
        if (items.aceptacion_terminos === "s") { $("#radio1B").attr("checked", true); $("#radio2B").attr("checked", false) };
        if (items.aceptacion_terminos === "n") { $("#radio2B").attr("checked", true); $("#radio1B").attr("checked", false) };
        $("#tipo_documento").val(items.tipo_documento);
        $("#numero_documento").val(items.num_documento);
        $("#nombres").val(items.nombres);
        $("#primer_apellido").val(items.primer_apellido);
        if (items.segundo_apellido === null) { $("#segundo_apellido").val("") } else { $("#segundo_apellido").val(items.segundo_apellido) };
        if (items.fecha_expedicion !== null) {
            fecha = new Date(items.fecha_expedicion)
            let dia = fecha.getDate()
            let mes = fecha.getMonth() + 1
            let annio = fecha.getFullYear()
            if (mes < 10) {
                mes = "0" + mes;
            }else{
                mes=mes;
            }
            if (dia < 10) {
                dia = "0" + dia;
            }else{
                dia=dia;
            }
            calen = annio+"-"+mes+"-"+dia;
            $("#fecha_expedicion").val(annio+"-"+mes+"-"+dia);
            console.log(calen)
        } else {
            $("#fecha_expedicion").val("")
        };
        if (items.direccion !== null) { $("#calle").val(items.direccion) } else { $("#calle").val("0") };
        if (items.info_complementaria !== null) { $("#info_complementaria").val(items.info_complementaria) } else { $("#info_complementaria").val("") };
        if (items.verificacion_direccion === null) { $("#direccion").val("") } else { $("#direccion").val(items.verificacion_direccion) };
        if (items.localidad === null) {$("#localidad").val("0")} else {$("#localidad").val(items.localidad)};
        if (items.barrio === null) { $("#barrio").val("") } else { $("#barrio").val(items.barrio) };
        if (items.estrato !== null) {$("#estrato").val(items.estrato)} else {$("#estrato").val("0")};
        if (items.tel_fijo === 0) { $("#tel_fijo").val("") } else { $("#tel_fijo").val(items.tel_fijo) };
        $("#celular_1").val(items.cel_1);
        if (items.cel_2 === 0) { $("#celular_2").val("") } else { $("#celular_2").val(items.cel_2) };
        if (items.correo === null) { $("#email").val("") } else { $("#email").val(items.correo) };
        if (items.nombre_contacto === null) { $("#nom_cont_usu").val("") } else { $("#nom_cont_usu").val(items.nombre_contacto) };
        if (items.primer_apellido_cont === null) { $("#prim_apell").val("") } else { $("#prim_apell").val(items.primer_apellido_cont) };
        if (items.segundo_apellido_cont === null) { $("#seg_apell").val("") } else { $("#seg_apell").val(items.segundo_apellido_cont) };
        if (items.cel_contacto === null) { $("#cel_numero").val("") } else { $("#cel_numero").val(items.cel_contacto) };
        if (items.parentesco === null) { $("#parentesco").val("") } else { $("#parentesco").val(items.parentesco) };
        if (items.observaciones === null) { $("#observaciones").val("") } else { $("#observaciones").val(items.observaciones) }
        if ($("#radio1A").prop("checked") == false) {
            deshabilitarCampos();
        } else {
            habilitarCampos()
        }
    }
    
    
    
    function validarCorreo(email) {
        var expReg = /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/;
        var esValido = expReg.test(email);
        if (esValido == false) {
            alert("Correo no es válido!!!")
        }
    }

    function validarCamposMinimos() {

        if ($("#canal_atencion").val() == "0") {
            alert("seleccione canal de atención")
        }
        else if ($("#radio1B").prop("checked") == false && $("#radio2B").prop("checked") == false) {
            alert("seleccione aceptación términos y condiciones");
        }
        else if ($("#observaciones").val() == "") {
            alert("Ecsriba las obsevaciones pertinentes");
        }
        else {
            guardarFormulario();
            //location.href = "/introduccion.html";
    
        }
    
    
    }
    
    function guardarFormulario() {
    
        if ($("#radio1A").prop("checked")) { condiciones = "s" } else { condiciones = "n" };
        if ($("#radio1B").prop("checked")) { aceptacion = "s" } else { aceptacion = "n" };
    
        let registro = {
            numero_documento: $("#numero_documento").val(),
            condiciones_programa: condiciones,
            canal_atencion: $("#canal_atencion").val(),
            aceptacion_terminos: aceptacion,
            tipo_documento: $("#tipo_documento").val(),
            num_documento: $("#numero_documento").val(),
            nombres: $("#nombres").val(),
            primer_apellido: $("#primer_apellido").val(),
            segundo_apellido: $("#segundo_apellido").val(),
            fecha_expedicion: null,
            direccion: null,
            info_complementaria: null,
            verificacion_direccion: null,
            localidad: null,
            barrio: null,
            estrato: null,
            tel_fijo: 0,
            cel_1: $("#celular_1").val(),
            cel_2: $("#celular_2").val(),
            correo: null,
            nombre_contacto: null,
            primer_apellido_cont: null,
            segundo_apellido_cont: null,
            cel_contacto: null,
            parentesco: null,
            observaciones: $("#observaciones").val()
        }
    
        $.ajax({
    
            url:"http://172.21.21.27:9073/part1/CasaLAco/registro/save",
            type:'POST',
            data:JSON.stringify(registro),
            dataType:'json',
            contentType:"application/json",
            complete: function(data) {
                console.log(data.status)
                if (data.status == "201") {
                    alert("guardo registro con exito")
                    location.href = "/introduccion.html";
                } else {
                    alert("problemas al guardar en base datos consulte con el administrador")
                }
            }
        })
    }

})
