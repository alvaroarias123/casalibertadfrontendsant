//var endpoint="localhost:7001/CasaLRec";
//var endpoint="localhost:8085";
var endpoint="http://172.21.21.27:9073/part1/CasaLRec";// /recepcion


$(document).ready(function(){

    //$("body").hide().fadeIn(1000);

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


    const valores=window.location.search;
    console.log(valores)
    const urlParams = new URLSearchParams(valores);
    var numero=urlParams.get("numeroDocumento");
    var tipo=urlParams.get("tipo_documento");
    var radio1=urlParams.get("radio1")
    
    

    $("#numero_documento").val(numero);
    $("#tipo_documento").val(tipo);
    if(radio1=="true"){
        $("#radio1").attr("checked",true)
        $("#radio2").attr("checked",false)
        document.getElementById('aceptacion').style.display='none';
    }else{
        $("#radio1").attr("checked",false)
        $("#radio2").attr("checked",true)
    }
    //$("#radio1").val();
    //$("radio2").prop("checked")=radio2;

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
        if($("#razon").val()=="3")
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

    $("#razon").blur(function(){
        if($("#razon").val()!="13"){
            $("#otra_razon").val("");
        }
        if($("#razon").val()!="3"){
            $("#modulo").val("0");
        }
    })

    function validarCampos(){

        if($("#radio1").prop("checked")==false && $("#radio2").prop("checked")==false ){
            alert("seleccionar autorización de tratamiento de datos");
        }
        else if($("#tipo_documento").val()=="0"){
            alert("Seleccionar 'Tipo Documento'");
        }
        else if($("#numero_documento").val().trim()==""){
            alert("Llenar campo 'Número de Documento'");
        }
        else if($("#nombres").val().trim()==""){
            alert("Llenar campo 'Nombres'");
        }
        else if($("#primer_apellido").val().trim()==""){
            alert("Llenar campo 'Primer apellido'");
        }
        else if($("#cel_1").val().trim()==""){
            alert("Llenar campo 'Telefono 1'");
        }
        else if($("#cel_1").val().trim().length!=10){
            alert("Teléfono 1 debe ser de 10 dígitos")
        }
        else if($("#cel_2").val().trim()!="" && $("#cel_2").val().trim().length!=10){
            alert("Teléfono 2 debe ser de 10 dígitos")
        }
        else if($("#razon").val()=="0"){
            alert("Seleccionar 'razón visitas");
        }
        else if($("#razon").val()=="13" && $("#otra_razon").val().trim()==""){
            alert("especifique otra razón")
        }
        else if($("#razon").val()=="3" && $("#modulo").val()=="0"){
            alert("Seleccione con cual Dimensión tiene cita/Taller")
        }
        else if($("#canal").val()=="0"){
            alert("Seleccionar 'Canal de atención");
        }else{

            guardarVisita()

            //getUsuario(numero,tipo) // de esta manera traigo a usuario con la data y la guardo en variable info
            //if(info.citas_solicitadas_uniqid==2){    //cambié === por ==
            if($("#modulo").val()=="2"){ 
                console.log("escogió 2")
                guardarBandejaRec(numero)
                alert("Visita guardada") 
            }
            console.log("No escogió 2")
            alert("Visita guardada")
            borrar()
            location.href="recepcion.html"
            
        }

    }
    //var info;

    function getUsuario(num,tipos){

        $.ajax({

            url:endpoint+"/recepcion/consultar?numeroDocumento="+num+"&documentoTipo="+tipos,
            type:'GET',
            dataType:'json',
            success:function(data){
                //info=data
                console.log(data)
                pintarRespuesta(data)
            }
        })
    }

    function guardarVisita(){

        if($("#radio1").prop("checked")){consentimiento="s"}else{consentimiento="n"};
        if($("#segundo_apellido").val().trim()==""){segundoApellido = null}else{segundoApellido=$("#segundo_apellido").val().trim()};
        if($("#cel_2").val().trim()==""){cel2=0}else{cel2=$("#cel_2").val().trim()};
        if($("#otra_razon").val()==""){otraRazon=null}else{otraRazon=$("#otra_razon").val()};
        if($("#modulo").val()=="0"){citaDimension=0}else{citaDimension=$("#modulo").val()};
        

        var numeroDocumento=$("#numero_documento").val();

        let visita={
            consentimiento_proces_datos:consentimiento,
            tipo_documento:$("#tipo_documento").val(),
            num_documento:$("#numero_documento").val(),
            nombres:$("#nombres").val().trim(),
            primer_apellido:$("#primer_apellido").val().trim(),
            segundo_apellido:segundoApellido,
            cel_1:$("#cel_1").val().trim(),
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
                }else{
                    mensaje="problemas al guardar en base datos consulte con el administrador"
                }
                console.log(mensaje)
                
            }
        })
    }

    
    
    function pintarRespuesta(items){

        if(items.nombres!==null){
            $("#nombres").val(items.nombres);
            $("#primer_apellido").val(items.primer_apellido);
            if(items.segundo_apellido!==null){
                $("#segundo_apellido").val(items.segundo_apellido);
            }else{
                $("#segundo_apellido").val("");
            }       
            $("#cel_1").val(items.cel_1);
            if(items.cel_2!==0){
                $("#cel_2").val(items.cel_2);
            }else{
                $("#cel_2").val("");
            }
            $("#razon").val("0");
            $("#otra_razon").val("");
            $("#modulo").val("0");
            $("#canal").val("0");
        }else{
            alert("No hay visitas guardadas");
        }
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

    function guardarBandejaRec(numero){

        if($("#segundo_apellido").val().trim()==""){segApellido = null}else{segApellido=$("#segundo_apellido").val().trim()};
    
        let bandeja={
            numeroDocumento:numero,
            nombres:$("#nombres").val().trim(),
            primerApellido:$("#primer_apellido").val().trim(), // es primerApellido
            segundoApellido:segApellido,
            accion:"s"
        }
    
        $.ajax({
    
            url:endpoint+"/bandejarec/save",
            type:"POST",
            data:JSON.stringify(bandeja),
            dataType:'json',
            contentType:"application/json",
            complete:function(data){
                console.log(data.status)
                let mensaje=""
                if(data.status=="201"){
                    mensaje="guardo turno bandeja acogida con exito"
                }else{
                    mensaje="problemas al guardar en base datos consulte con el administrador"
                }   
                console.log(mensaje)
            }
        })
        
    }

})
   // <location.href="/acogida/bandeja.html";
