//var endpoint = "http://172.21.21.27:9073/part1";

$(document).ready(function () {

    $("#boton_enviar").click(function () {
        validarCampos();
    })


    function validarCampos() {
        if ($("#uname").val().trim() == "") {
            alert("Llenar campo usuario");
        }
        else if ($("#pwd").val() == "") {
            alert("introducir password");
        } else {
            enviarInformacion();

        }
    }

    function enviarInformacion() {

        const nombre = $("#uname").val();
        const password = $("#pwd").val();


        if (nombre == "admin" && password == "Prueba123456") {
            var validacion = "si";
            sessionStorage.setItem("validacion", validacion);
            location.href = "/introduccion.html"
        } else {
            alert("Usuario no autorizado");
            limpiarCajaLogging();

        }
    }

    function limpiarCajaLogging() {
        $("#uname").val("");
        $("#pwd").val("")
    }


    

    

    /*$("#uname").blur(function(){
        comprobarUsuario();
    })

    function comprobarUsuario(){
        if ($("#uname").val().trim() != ""){
            var expReg = /[a-z]+\.[a-z]/;
            var esValido = expReg.test($("#uname").val().trim());
            if (esValido == false) {
                alert("Usuario no es válido!!!")
            }
        }
    }

    $("#boton_enviar").click(function () {
        validarCampos2();
    })

    function validarCampos2(){

        if ($("#uname").val().trim() == ""){
            alert("llenar campo Usuario");
        }
        else if($("#pwd").val()==""){
            alert("introducir password");
        }
        else{
            enviarInformacion2();
        }
    }

    function enviarInformacion2() {

        let registro = {
            usuario: $("#uname").val().trim(),
            claveUsuario: $("#pwd").val()
        }

        $.ajax({
            url: "http://172.21.21.27:9073/part1/aut/usuario/admin",
            type: "POST",
            data: JSON.stringify(registro),
            dataType: "json",
            contentType: "application/json",
            //cache:false,
            //timeout:600000,
            complete: function (respuesta) {
                console.log(respuesta);
                let mens = ""
                if (respuesta.mensaje == "ok") {
                    var token=respuesta.data.token;
                    console.log(token);
                    //se supone que aquí guardo token (con sessionStorage) para envío token al backend!!//headers: {'Authorization': 'Bearer xxxxxxxxxxxxx'},esto para enviar cabeceras al backend!!
                    limpiarCajaLogging();
                    var validacion="si";
                    sessionStorage.setItem("validacion",validacion);
                    location.href = "/introduccion.html";
                } else {
                    mens = "Usuario no registrado!!!";
                    alert(mens);
                    console.log(mens)
                }
            }
        })
    }*/

    


})