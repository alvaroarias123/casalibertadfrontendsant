const endpoint="localhost:7001/bandejarec"

$(document).ready(function(){

    getTurnos();


    function getTurnos(){

        $.ajax({

            url:endpoint+"/all",
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

            if(items[i].accion=='s'){
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

        let info ={
            numeroDocumento:idElemento,
            accion:'n'
        }
        $.ajax({

            url:endpoint+"/actualizar",
            type:"PUT",
            data:JSON.stringify(info),
            dataType:'json',
            contentType:"application/json",
            complete:function(data){
                console.log(data.status)
                let mensaje=""
                if(data.status=="201"){
                    mensaje="guardo accion con exito"
                }
                else{
                    mensaje="problemas al guardar en base datos"
                }
                console.log(mensaje)
            }
        })

        window.location='registro.html?numeroDocumento='+idElemento;

    }


    function atendiendo(idElemento){

        window.location='registro.html?numeroDocumento='+idElemento;

    }






})



 //Codigo para DEMO!!!
    /*function pasarAcogida(){
    
        location.href="registro.html"
    }

    $(".bot1").click(function(){
        pasarAcogida();
    })*/

    /*$(".bot2").click(function(){

        
        $(".bot2").html('<button onclick="pasarAcogida()" class="btn" type="button" style="background-color:#9F2257; color: white;">ATENDER</button>')
    })*/

    