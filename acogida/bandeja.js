//const endpoint="localhost:7001/CasaLAco";
//var endpoint="http://172.21.21.27:9073/part1/CasaLAco"; 


$(document).ready(function () {

    if(!sessionStorage.getItem("validacion")){
        location.href="/index.html";
    }

    sessionStorage.removeItem("numero");
    sessionStorage.removeItem("nombre");
    sessionStorage.removeItem("primerApellido");
    sessionStorage.removeItem("segundoApellido");

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


    $("#btn_primero").click(function () {
        borrarTabla();
        m = 0;
        getTurnos(m);
    })

    $("#btn_anterior").click(function () {
        if(m>0){
            borrarTabla();
            m = m - 1;
            if (m>=0) {
                getTurnos(m);
            }
        }
    })

    $("#btn_siguiente").click(function () {
        if(z>10){
            borrarTabla();
            m = m + 1;
            getTurnos(m);
        }
    })

    $("#btn_ultimo").click(function () {
        borrarTabla();
        m = Math.floor(z / 10)
        getTurnos(m);
    })

    function getTurnos(m) {

        $.ajax({
    
            // url:"http://localhost:9073/part1/CasaLAco/bandaco/consulta",
            url:"http://localhost:9073/bandaco/consulta",
            type:"GET",
            dataType:"json",
            success: function (respuesta) {
                z=respuesta.length;
                console.log(respuesta);
                pintarRespuesta(respuesta, m)  
            }
        })
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

    function pintarRespuesta(respuesta, m) {  

        z = respuesta.length;  
        let registro = "";
    
        var i = m * 10;
    
        if (i >= 0) {
    
            if (respuesta.length > i) {
    
                if (respuesta.length < ((m * 10) + 10)) {
                    var part = respuesta.length;  
                } else {
                    var part=(i*10)+10;
                }
                for (var j=i; j < part; j++) {   
    
                    if(respuesta[j].accion === 's'){
                        registro += "<tr>";
                        if(j<9){
                        registro += "<td>"+ "00" + ((respuesta[j].id)+1) + "</td>";
                        }else{
                            registro += "<td>"+ "0" + ((respuesta[j].id)+1) + "</td>";
                        }
                        registro += "<td>" + respuesta[j].numeroDocumento + "</td>";
                        registro += "<td>" + respuesta[j].nombres + "</td>";
                        registro += "<td>" + respuesta[j].primerApellido + "</td>";
                        if(respuesta[j].segundoApellido!=null){
                            registro += "<td>" + respuesta[j].segundoApellido + "</td>";
                        }else{
                            registro += "<td>" + " " + "</td>";
                        }
                        registro += "<td class='text-center bot1'><button onclick='atender(" + respuesta[j].numeroDocumento + ")' class='btn' type='button' style='background-color:#9F2257; color: white;'>ATENDER</button></td>";
                        registro += "</tr>"
                    } else {
                        registro += "<tr>";
                        if(j<9){
                        registro += "<td>"+ "00" + ((respuesta[j].id)+1) + "</td>";
                        }else{
                            registro += "<td>"+ "0" + ((respuesta[j].id)+1) + "</td>";
                        }
                        registro += "<td>" + respuesta[j].numeroDocumento + "</td>";
                        registro += "<td>" + respuesta[j].nombres + "</td>"; 
                        registro += "<td>" + respuesta[j].primerApellido + "</td>";
                        if(respuesta[j].segundoApellido!=null){
                                registro += "<td>" + respuesta[j].segundoApellido + "</td>";
                            }else{
                                registro += "<td>" + " " + "</td>";
                            }   
                        registro += "<td class='text-center bot2'><button onclick='atendiendo(" + respuesta[j].numeroDocumento  + ")' class='btn btn-warning' type='button'  style='color: white'>ATENDIENDO</button></td>";
                        registro += "</tr>";
                    }
                }
                $("#tbody").html(registro)
            }
        }
    }
    
})

function atender(idElemento) {


    let info = {
        numeroDocumento: idElemento,
        accion: 'n'
    };
    $.ajax({

        url:"http://172.21.21.27:9073/part1/CasaLAco/bandaco/actualizar",
        type:"PUT",
        data:JSON.stringify(info),
        dataType:'json',
        contentType:"application/json",
        cache:false,
        timeout:600000,
        complete: function (data) {
            console.log(data)
            if(data.status=="201"){
            let mensaje = ""
            mensaje = "guardo accion con exito"
            console.log(mensaje)
            window.location = 'registro.html?numeroDocumento=' + idElemento;
            }else{
                alert("no guardo acción. consulte con el administrador")
            }
        } 
    })
}

function atendiendo(idElemento) {

    window.location = 'registro.html?numeroDocumento=' + idElemento;

}