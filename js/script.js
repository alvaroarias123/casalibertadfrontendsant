var endpoint = "http://172.21.21.27:9073/part1";

$(document).ready(function(){


    $("#boton_enviar").click(function(){
        validarCampos();
    })


    function validarCampos(){
        if($("#uname").val().trim() == ""){
            alert("Llenar campo usuario");
        }
        else if($("#pwd").val()==""){
            alert("introducir password");
        }else{
            enviarInformacion();
            
        }
    }

    
    /*function validarCampos(){

        if ($("#uname").val().trim() != ""){
            var expReg = /[a-z]+\.[a-z]/;
            var esValido = expReg.test($("#uname").val().trim());
            if (esValido == false) {
                alert("Usuario no es válido!!!")
            }
        }else if($("#pwd").val()==""){
            alert("introducir password");
        }else{
            enviarInformacion();
        }
    }*/

    function enviarInformacion(){

        let registro={
            usuario: $("#uname").val().trim(),
            claveUsuario: $("#pwd").val() 
        }

        $.ajax({
            url: endpoint + "/aut/usuario/admin", 
            type: "POST",
            data: JSON.stringify(registro),
            dataType: "json",
            contentType: "application/json",
            success: function (respuesta) {
                console.log(respuesta);
                let mens = ""
                if(respuesta.mensaje=="ok"){
                    //var token=respuesta.data.token;
                    //se supone que aquí envío token al backend!!
                    limpiarCajaLogging();
                    location.href = "/introduccion.html";
                }else{
                    mens="Usuario no registrado!!!";
                    alert(mens);
                    console.log(mens)
                }
                
                
            }  
        })
    }

    function limpiarCajaLogging(){
        $("#uname").val("");
        $("#pwd").val("")
    }


})