//const endpoint="localhost:7001";
var endpoint="http://172.21.21.27:9073/part1/CasaLAco";
//var endpoint="http://172.21.21.27:9073/part1/CasaLAco"; //  /acogida


$(document).ready(function () {

    var m = 0;
    var z;
    getTurnos(m);

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



    $("#btn_siguiente").click(function () {
        borrarTabla();
        m = m + 1;
        getTurnos(m);
    })

    $("#btn_anterior").click(function () {
        borrarTabla();
        m = m - 1;
        if (m) {
            getTurnos(m);
        }
    })

    $("#btn_primero").click(function () {
        borrarTabla();
        m = 0;
        getTurnos(m);
    })

    $("#btn_ultimo").click(function () {
        borrarTabla();
        m = Math.floor(z / 10)
        getTurnos(m);
    })



    function getTurnos(m) {

        $.ajax({

            url: endpoint + "/bandaco/consulta",
            type: "GET",
            dataType: "json",
            success: function (respuesta) {

                console.log(respuesta);
                pintarRespuesta(respuesta, m)  //pintarRespuesta(respuesta.items, m)
            }
        })
    }


    function pintarRespuesta(respuesta, m) {  //cambié items po respuesta

        z = respuesta.length;  //cambié items por respuesta
        let registro = "";

        var i = m * 10;

        if (i >= 0) {

            if (respuesta.length > i) {

                if (respuesta.length < ((m * 10) + 10)) {
                    var part = respuesta.length;  // en todas las respuesta antes estaba items
                } else {
                    //var part = i + 10;// no es debería ser repsuesta.length
                    var part=respuesta.length;
                    i=i+10;
                }

                for (i; i < part; i++) {   //ojo aqui puede ser error porque sería respuesta.items
                    if (respuesta.items[i+1].accion === 's') {  //agregué respuesta
                        registro += "<tr>";
                        registro += "<td>" + respuesta.items[i+1].uniqid + "</td>";  // agregué respuesta
                        registro += "<td>" + respuesta.items[i+1].numeroDocumento + "</td>";//agregué respuesta
                        registro += "<td>" + respuesta.items[i+1].nombres + "</td>";// agregué respuesta
                        registro += "<td>" + respuesta.items[i+1].primerApellido + "</td>";//agregué respuesta
                        registro += "<td>" + respuesta.items[i+1].segundoApellido + "</td>";//agregué respuesta
                        registro += "<td class='text-center bot1'><button onclick='atender(" + respuesta.items[i+1].numeroDocumento + ")' class='btn' type='button' style='background-color:#9F2257; color: white;'>ATENDER</button></td>";
                        registro += "</tr>"
                    } else {
                        registro += "<tr>";
                        registro += "<td>" + respuesta.items[i+1].uniqid + "</td>";//agregué respuesta--respuesta.value.uniqid
                        registro += "<td>" + respuesta.items[i+1].numeroDocumento + "</td>";//respuesta.value.numeroDocumento
                        registro += "<td>" + respuesta.items[i+1].nombres + "</td>"; //respuesta.value.nombres
                        registro += "<td>" + respuesta.items[i+1].primerApellido + "</td>";  //respuesta.value.primerApellido
                        registro += "<td>" + respuesta.items[i+1].segundoApellido + "</td>"; //respuesta.value.segundoApellido
                        registro += "<td class='text-center bot2'><button onclick='atendiendo(" + respuesta.items[i].numeroDocumento + ")' class='btn btn-warning' type='button'  style='color: white'>ATENDIENDO</button></td>";
                        registro += "</tr>";
                    }
                }
                $("#tbody").html(registro)
            }
        }

    }



    function atender(idElemento) {

        let info = {
            numeroDocumento: idElemento,
            accion: 'n'
        }
        $.ajax({

            url: endpoint + "/bandaco/actualizar",
            type: "PUT",
            data: JSON.stringify(info),
            dataType: 'json',
            contentType: "application/json",
            complete: function (data) {
                console.log(data.status)
                let mensaje = ""
                mensaje = "guardo accion con exito"
                console.log(mensaje)
            }
        })

        window.location = 'registro.html?numeroDocumento=' + idElemento;

    }


    function atendiendo(idElemento) {

        window.location = 'registro.html?numeroDocumento=' + idElemento;

    }

    function borrarTabla() {
        let registro="";
        for (i=0; i <10 ; i++) {

                        registro += "<tr>";
                        registro += "<td>" + "" + "</td>";
                        registro += "<td>" + "" + "</td>";
                        registro += "<td>" + "" + "</td>";
                        registro += "<td>" + "" + "</td>";
                        registro += "<td>" + "" + "</td>";
                        registro += "<td>" + "" + "</td>";
                        registro += "</tr>"

        }
        $("#tbody").html(registro)

    }


})