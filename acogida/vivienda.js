var endpoint="localhost:7001";

$(document).ready(function(){

    const valores1=window.location.search;
    console.log(valores1)
    const urlParams = new URLSearchParams(valores1);
    var numero=urlParams.get("numeroDocumento");
    var nombres=urlParams.get("nombres");
    var primerApellido=urlParams.get("primerApellido");
    var segundoApellido=urlParams.get("segundoApellido");

    //alert("okkk")

    traerVivienda(numero);

    $("#btn_anterior").click(function(){
        validarCampos2();
    })

    $("#btn_siguiente").click(function(){
        validarCampos1();
    })

    function validarCampos2(){
        if($("#tipo_vivienda").val()=="0"){
            alert("seleccione en que tipo de vivienda duerme actualmente")
        }else{
            guardarViviendas();
            //alert("Se ha guardado viviendas")
            window.location='datos_demograficos.html?numeroDocumento='+numero+'&nombres='+nombres+'&primerApellido='+primerApellido+'&segundoApellido='+segundoApellido;

        }
    }

    function validarCampos1(){

        if($("#tipo_vivienda").val()=="0"){
            alert("seleccione en que tipo de vivienda duerme actualmente")
        }else{
            guardarViviendas();
            //alert("Se ha guardado viviendas")
            window.location='antecedentes.html?numeroDocumento='+numero+'&nombres='+nombres+'&primerApellido='+primerApellido+'&segundoApellido='+segundoApellido;

        }        
    }

    function guardarViviendas(){

        let tipo=$("#tipo_vivienda").val();

        $.ajax({
            url:endpoint+"/vivienda/save?numeroDocumento="+numeros+"&tipo="+tipo,
            type:'POST',
            data:JSON.stringify(tipo),
            dataType:'json',
            contentType:"application/json",
            complete:function(data){
                console.log(data.status)
                let mensaje=""
                if(data.status=="201"){
                    mensaje="guardo viviendas con exito"
                    alert("Se guardó viviendas con éxito!!")
                }
                else{
                    mensaje="problemas al guardar en base datos"
                    alert("Ups... Problemas!! no se guardó viviendas en base datos!!")
                }
                console.log(mensaje)
            }



        })
    }

    function traerVivienda(numeros){

        $.ajax({
            url:endpoint+"/vivienda/consulta?numeroDocumento="+numeros,
            type:"GET",
            dataType:"json",
            success:function(respuesta){
                console.log(respuesta);
                pintarRespuesta(respuesta.items)
            }
        })


    }

    function pintarRespuesta(items){

        if(items.uniqid==null){$("#tipo_vivienda").val("0")}else{$("#tipo_vivienda").val(items.uniqid)};
    }

})