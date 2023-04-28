var endpoint="localhost:7001"

$(document).ready(function(){

    //$("body").hide().fadeIn(1000);


    const valores=window.location.search;
    console.log(valores)
    const urlParams = new URLSearchParams(valores);
    var numero=urlParams.get("numeroDocumento");
    var tipo=urlParams.get("tipo_documento");
    
    


    $("#numero_documento").val(numero);
    $("#tipo_documento").val(tipo);

    getUsuario(numero,tipo)

    $("#radio1").click(function(){
        missing()
    })

    $("#radio2").click(function(){
        desaparecido()
    })

    $("#razon").click(function(){
        habilitarCampos()    
    })
    

    $("#guardar_recepcion3").click(function(){ 

        validarCampos();
        //borrar();
        //location.href=" ";
    })




    function habilitarCampos(){

        $("#modulo").attr('disabled',true);
        $("#otra_razon").attr('disabled',true);
        
        if($("#razon").val()=="13"){
            $("#otra_razon").attr('disabled',false);
        }
        else if($("#razon").val()=="3")
            $("#modulo").attr('disabled',false);

    }

    function missing(){
        //document.getElementById('aceptacion').style.display='none';
        $("#aceptacion").hide();
    }
    
    function desaparecido(){
        //document.getElementById('aceptacion').style.display='block';
        $("#aceptacion").show()
    }

    function validarCampos(){

        if($("#radio1").prop("checked")==false && $("#radio2").prop("checked")==false ){
            alert("seleccionar autorización de tratamiento de datos");
        }
        else if($("#tipo_documento").val()=="0"){
            alert("Seleccionar 'Tipo de Documento'");
        }
        else if($("#numero_documento").val()==""){
            alert("Llenar campo 'Número de Documento'");
        }
        else if($("#nombres").val()==""){
            alert("Llenar campo 'Nombres'");
        }
        else if($("#primer_apellido").val()==""){
            alert("Llenar campo 'Primer apellido'");
        }
        else if($("#cel_1").val()==""){
            alert("Llenar campo 'Telefono 1'");
        }
        else if($("#razon").val()=="0"){
            alert("Seleccionar 'razón visitas");
        }
        else if($("#canal").val()=="0"){
            alert("Seleccionar 'Canal de atención");
        }else{

            guardarVisita()

            guardarBandejaRec()

            borrar()
            
            location.href="recepcion.html"
            
        }

    }

    function getUsuario(num,tipos){

        var numeroDocumento = numero;
        var documentoTipo=tipo;

        $.ajax({

            url:endpoint+"/recepcion/consultar?numeroDocumento="+num+"&documentoTipo="+tipos,
            type:'GET',
            dataType:'json',
            success:function(data){
                console.log(data)
                pintarRespuesta(data.items)
            }
        })
    }

    function guardarVisita(){

        if($("#radio1").prop("checked")){consentimiento="s"}else{consentimiento="n"};
        if($("#segundo_apellido").val()==""){segundoApellido = null}else{segundoApellido=$("#segundo_apellido").val()};
        if($("#cel_2").val()==""){cel2=0}else{cel2=$("#cel_2").val()};
        if($("#otra_razon").val()==""){otraRazon=null}else{otraRazon=$("#otra_razon").val()};
        if($("#modulo").val()=="0"){citaDimension=0}else{citaDimension=$("#modulo").val()};
        

        var numeroDocumento=$("#numero_documento").val();

        let visita={
            consentimiento_proces_datos:consentimiento,
            tipo_documento:$("#tipo_documento").val(),
            num_documento:$("#numero_documento").val(),
            nombres:$("#nombres").val(),
            primer_apellido:$("#primer_apellido").val(),
            segundo_apellido:segundoApellido,
            cel_1:$("#cel_1").val(),
            cel_2:cel2,
            razon_visitas_uniqid:$("#razon").val(),
            otra_razon:otraRazon,
            citas_solicitadas_uniqid:citaDimension,
            canal_de_atencion_uniqid:$("#canal").val()
        }

        $.ajax({

            url:endpoint+"/recepcion/save?numeroDocumento="+numeroDocumento,
            type:'POST',
            data:JSON.stringify(visita),
            dataType:'json',
            contentType:"application/json",
            complete:function(data){
                console.log(data.status)
                let mensaje=""
                if(data.status=="201"){
                    mensaje="guardo visitante con exito"
                    alert("Visita guardada")
                }
                else{
                    mensaje="problemas al guardar en base datos"
                    alert("Ups... la visita no se guardó en basa datos!!!")
                }
                console.log(mensaje)
            }
        })
    }

    function guardarBandejaRec(){

        if($("#segundo_apellido").val()==""){segApellido = null}else{segApellido=$("#segundo_apellido").val()};

        let bandeja={
            numeroDocumento:numero,
            nombres:$("#nombres").val(),
            primer_apellido:$("#primer_apellido").val(),
            segundoApellido:segApellido,
            accion:"Si"
        }

        $.ajax({

            url:endpoint+"/bandejarec/save",
            type:"POST",
            data:JSON.stringify(bandeja),
            dataType:'json',
            contentType:"application/json",
            complete:function(data){
                console.log(data.status)
                let mensaje =""
                if(data.status=="201"){
                    mensaje="guardo visitante con exito"
                    alert("Turno para acogida creado")
                }
                else{
                    mensaje="problemas al guardar en base datos"
                    alert("Ups... el turno no fué creado en base datos!!!!")
                }
                console.log(mensaje)
            }
        })
        
    }

    function borrar(){
        $("#radio1").prop("checked",false);
        $("#radio2").prop("checked",false);
        $("#numero_documento").val("");
        $("#tipo_documento").val("0");
        $("#nombres").val("");
        $("#primer_apellido").val("");
        $("#segundo_apellido").val("");
        $("#cel_1").val("");
        $("#cel_2").val("");
        $("#razon").val("0");
        $("#otra_razon").val("");
        $("#modulo").val("0");
        $("#canal").val("0");
    }

    function pintarRespuesta(items){

        if(items.nombres!=null){
            $("#nombres").val(items.nombres);
            $("#primer_apellido").val(items.primer_apellido);
            $("#segundo_apellido").val(items.segundo_apellido);
            $("#cel_1").val(items.cel_1);
            $("#cel_2").val(items.cel_2);
            $("#razon").val(items.razon_visitas_uniqid);
            $("#otra_razon").val(items.otra_razon);
            $("#modulo").val(items.citas_solicitadas_uniqid);
            $("#canal").val(items.canal_de_atencion_uniqid);
        }else{
            alert("No hay visitas guardadas");
        }

        /*for(i=0;i<items.length;i++){

            if(items[i].nombres!=null){
                $("#nombres").val(items[i].nombres)
                $("#primer_apellido").val(items[i].primer_apellido)
                $("#segundo_apellido").val(items[i].segundo_apellido)
                $("#cel_1").val(items[i].cel_1)
                $("#cel_2").val(items[i].cel_2)
                $("#razon").val(items[i].razon_visitas_uniqid)
                $("#otra_razon").val(items[i].otra_razon)
                $("#modulo").val(items[i].citas_solicitadas_uniqid)
                $("#canal").val(items[i].canal_de_atencion_uniqid)
            }else{
                alert("No hay visitas guardadas")
            }
        }*/

    }


})

    
    
    

   // <location.href="/acogida/bandeja.html";
