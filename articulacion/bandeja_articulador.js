//const endpoint="localhost:7001/CasaLAco";
var endpoint="http://172.21.21.27:9073/part1/CasaLAco"; // /acogida  //Aquí por el momento está en Acogida, no en articulación pues todavía no hay url

$(document).ready(function(){

    getTurnos();

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

    function getTurnos(){

        $.ajax({

            url:endpoint+"/bandejaArtic/consulta",
            type:"GET",
            dataType:"json",
            success:function(respuesta){

                console.log(respuesta);

                pintarRespuesta(respuesta.items)

            }
        })
    }

    function pintarRespuesta(items){

        let registro="";

        for(i=0;i<items.length;i++){

            if(items[i].accion==='s'){
                registro+="<tr>";
                registro+="<td>"+items[i].uniqid+"</td>";
                registro+="<td>"+items[i].numeroDocumento+"</td>";
                registro+="<td>"+items[i].nombres+"</td>";
                registro+="<td>"+items[i].primerApellido+"</td>";
                registro+="<td>"+items[i].segundoApellido+"</td>";
                registro+="<td class='text-center bot1'><button onclick='atender("+items[i].numeroDocumento+")' class='btn' type='button' style='background-color:#9F2257; color: white;'>ATENDER</button></td>";
                registro+="</tr>"
            }else{
                registro+="<tr>";
                registro+="<td>"+value.uniqid+"</td>";
                registro+="<td>"+value.numeroDocumento+"</td>";
                registro+="<td>"+value.nombres+"</td>";
                registro+="<td>"+value.primerApellido+"</td>";
                registro+="<td>"+value.segundoApellido+"</td>";
                registro+="<td class='text-center bot2'><button onclick='atendiendo("+items[i].numeroDocumento+")' class='btn btn-warning' type='button'  style='color: white'>ATENDIENDO</button></td>";
                registro+="</tr>";
            }
        }
    }

    function atender(idElemento){

        alert("Módulo Articulación en construcción!!!")
        location.href="/introduccion.html";
    }


    function atendiendo(idElemento){

        alert("Módulo Articulación en construcción!!!")
        location.href="/introduccion.html";
    }
})