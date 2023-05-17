//const endpoint="localhost:7001";
//var endpoint="http://172.21.21.27:9073/casa_libertad_aco";
var endpoint="http://172.21.21.27:9073/part1/CasaLAco"; //  /acogida


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
                pintarRespuesta(respuesta.items, m)

            }
        })
    }


    function pintarRespuesta(items, m) {

        z = items.length;
        let registro = "";

        var i = m * 10;

        if (i >= 0) {

            if (items.length > i) {

                if (items.length < ((m * 10) + 10)) {
                    var part = items.length;
                } else {
                    var part = i + 10;
                }

                for (i; i < part; i++) {
                    if (items[i].accion == 's') {
                        registro += "<tr>";
                        registro += "<td>" + items[i].uniqid + "</td>";
                        registro += "<td>" + items[i].numeroDocumento + "</td>";
                        registro += "<td>" + items[i].nombres + "</td>";
                        registro += "<td>" + items[i].primerApellido + "</td>";
                        registro += "<td>" + items[i].segundoApellido + "</td>";
                        registro += "<td class='text-center bot1'><button onclick='atender(" + items[i].numeroDocumento + ")' class='btn' type='button' style='background-color:#9F2257; color: white;'>ATENDER</button></td>";
                        registro += "</tr>"
                    } else {
                        registro += "<tr>";
                        registro += "<td>" + value.uniqid + "</td>";
                        registro += "<td>" + value.numeroDocumento + "</td>";
                        registro += "<td>" + value.nombres + "</td>";
                        registro += "<td>" + value.primerApellido + "</td>";
                        registro += "<td>" + value.segundoApellido + "</td>";
                        registro += "<td class='text-center bot2'><button onclick='atendiendo(" + items[i].numeroDocumento + ")' class='btn btn-warning' type='button'  style='color: white'>ATENDIENDO</button></td>";
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
                if (data.status == "201") {
                    mensaje = "guardo accion con exito"
                    alert("Se guardó cambio de status correctamente!!")
                }
                else {
                    mensaje = "problemas al guardar en base datos"
                    alert("Ups... No se guardó el cambio de status (de atender a atendiendo)!!!")
                }
                console.log(mensaje)
            }
        })

        window.location = 'registro.html?numeroDocumento=' + idElemento;

    }


    function atendiendo(idElemento) {

        window.location = 'registro.html?numeroDocumento=' + idElemento;

    }

    function borrarTabla() {

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