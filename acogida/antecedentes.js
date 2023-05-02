var endpoint="localhost:7001";

$(document).ready(function(){

    const valores1=window.location.search;
    console.log(valores1)
    const urlParams = new URLSearchParams(valores1);
    var numero=urlParams.get("numeroDocumento");
    var numero=urlParams.get("numeroDocumento");
    var nombres=urlParams.get("nombres");
    var primerApellido=urlParams.get("primerApellido");
    var segundoApellido=urlParams.get("segundoApellido");


    traerAntecedentes(numero);

    $("#btn_anterior").click(function(){
        validarCampos()
        window.location='vivienda.html?numeroDocumento='+numero+'&nombres='+nombres+'&primerApellido='+primerApellido+'&segundoApellido='+segundoApellido;
    })

    $("#btn_siguiente").click(function(){
        validarCampos();
        window.location='programas.html?numeroDocumento='+numero+'&nombres='+nombres+'&primerApellido='+primerApellido+'&segundoApellido='+segundoApellido;
    })



    $("#personeria1").click(function(){
        $("#personeria2").prop('checked',false);
        $("#personeria3").prop('checked',false);
    })
    $("#personeria2").click(function(){
        $("#personeria1").prop('checked',false);
        $("#personeria3").prop('checked',false);
    })
    $("#personeria3").click(function(){
        $("#personeria2").prop('checked',false);
        $("#personeria1").prop('checked',false);
    })
    $("#procuraduria1").click(function(){
        $("#procuraduria2").prop('checked',false);
        $("#procuraduria3").prop('checked',false);
    })
    $("#procuraduria2").click(function(){
        $("#procuraduria1").prop('checked',false);
        $("#procuraduria3").prop('checked',false);
    })
    $("#procuraduria3").click(function(){
        $("#procuraduria1").prop('checked',false);
        $("#procuraduria2").prop('checked',false);
    })
    $("#contraloria1").click(function(){
        $("#contraloria2").prop('checked',false);
        $("#contraloria3").prop('checked',false);
    })
    $("#contraloria2").click(function(){
        $("#contraloria1").prop('checked',false);
        $("#contraloria3").prop('checked',false);
    })
    $("#contraloria3").click(function(){
        $("#contraloria1").prop('checked',false);
        $("#contraloria2").prop('checked',false);
    })
    $("#rama_judicial1").click(function(){
        $("#rama_judicial2").prop('checked',false);
        $("#rama_judicial3").prop('checked',false);
    })
    $("#rama_judicial2").click(function(){
        $("#rama_judicial1").prop('checked',false);
        $("#rama_judicial3").prop('checked',false);
    })
    $("#rama_judicial3").click(function(){
        $("#rama_judicial1").prop('checked',false);
        $("#rama_judicial2").prop('checked',false);
    })
    $("#policia1").click(function(){
        $("#policia2").prop('checked',false);
        $("#policia3").prop('checked',false);
    })
    $("#policia2").click(function(){
        $("#policia1").prop('checked',false);
        $("#policia3").prop('checked',false);
    })
    $("#policia3").click(function(){
        $("#policia2").prop('checked',false);
        $("#policia1").prop('checked',false);
    })
    $("#codigo_seguridad1").click(function(){
        $("#codigo_seguridad2").prop('checked',false);
        $("#codigo_seguridad3").prop('checked',false);
    })
    $("#codigo_seguridad2").click(function(){
        $("#codigo_seguridad1").prop('checked',false);
        $("#codigo_seguridad3").prop('checked',false);
    })
    $("#codigo_seguridad3").click(function(){
        $("#codigo_seguridad2").prop('checked',false);
        $("#codigo_seguridad1").prop('checked',false);
    })
    $("#sisipec1").click(function(){
        $("#sisipec2").prop('checked',false);
        $("#sisipec3").prop('checked',false);
    })
    $("#sisipec2").click(function(){
        $("#sisipec1").prop('checked',false);
        $("#sisipec3").prop('checked',false);
    })
    $("#sisipec3").click(function(){
        $("#sisipec2").prop('checked',false);
        $("#sisipec1").prop('checked',false);
    })

    function validarCampos(){ 

        if(($("#personeria1").prop('checked') || $("#personeria2").prop('checked') || $("#personeria3").prop('checked')) !=true){
            alert("Seleccione una casilla de Personería");
        }
        else if(($("#procuraduria1").prop('checked') || $("#procuraduria2").prop('checked') || $("#procuraduria3").prop('checked')) !=true){
            alert("seleccione una opción de Procuraduría");
        }
        else if(($("#contraloria1").prop('checked') || $("#contraloria2").prop('checked') || $("#contraloria3").prop('checked')) !=true){
            alert("seleccione una opción de Contraloría");
        }
        else if(($("#rama_judicial1").prop('checked') || $("#rama_judicial2").prop('checked') || $("#rama_judicial3").prop('checked')) !=true){
            alert("seleccione una opción de Rama Judicial (Antecedentes Judiciales)");
        }
        else if(($("#policia1").prop('checked') || $("#policia2").prop('checked') || $("#policia3").prop('checked')) !=true){
            alert("seleccione una opción de Policia Nacional (Antecedentes Penales)");
        }
        else if(($("#codigo_seguridad1").prop('checked') || $("#codigo_seguridad2").prop('checked') || $("#codigo_seguridad3").prop('checked')) !=true){
            alert("seleccione una opción de Código de Seguridad");
        }
        else if(($("#sisipec1").prop('checked') || $("#sisipec2").prop('checked') || $("#sisipec3").prop('checked')) !=true){
            alert("seleccione una opción de Sisipec");
        }
        else if($("#info_ultimo_proceso").val()==""){
            alert("llene casilla Información del último proceso");
        }
        else if($("#fecha_libertad").val()==""){
            alert("Seleccione Fecha de Libertad");
        }else if($("#meses_condena").val()==""){
            alert("Llene ¿Cuanto tiempo duró privado de la Libertad?")
        }
        else if($("#establecimiento").val()=="0"){
            alert("Seleccione opción de ¿En que establecimiento fué retenido(a)?")
        }
        else if($("#situacion").val()=="0"){
            alert("Seleccione opción de ¿Cual es su situación Jurídica?")
        }
        else if($("#aprehend_adolesc").val()=="100"){
            alert("Seleccione opción de ¿Cuantas veces fué aprehendido(a) siendo aún adolescente")
        }
        else if($("#aprehend_mayor").val()=="100"){
            alert("Seleccione opción ¿Cuantas veces ha ingresado a prisión siendo mayor de 18 años?")
        }
        else if($("#delito").val()==""){
            alert("Seleccione opción ¿Por que delito fué privado de la libertad la última vez?")
        }
        else if($("#proceso_actual1").prop("checked")==false && $("#proceso_actual2").prop("checked")==false ){
            alert("seleccionar si actualmente tiene un proceso en su contra");
        }
        else{
            guardarAntecedentes();
            //alert("Se ha guardado Antecedentes");
        }
    }



    function traerAntecedentes(numeros){

        $.ajax({
            url:endpoint+"/antecedentes/consultar?numeroDocumento="+numeros,
            type:"GET",
            dataType:"json",
            success:function(respuesta){
                console.log(respuesta);
                pintarRespuesta(respuesta.items)
            }
        })
    }

    function pintarRespuesta(items){

        $("#fecha_libertad").val(items.fecha_libertad);
        $("#meses_condena").val(items.meses_condena);
        $("#info_ultimo_proceso").val(items.ultimoProceso);
        $("#aprehend_adolesc").val(items.aprehend_adolesc);
        $("#aprehend_mayor").val(items.aprehend_mayor);
        if(items.proceso_actual=="si"){$("#proceso_actual1").attr('checked',true)};
        if(items.proceso_actual=="no"){$("#proceso_actual2").attr('checked',true)};
        if(items.personeria=="si"){$("#personeria1").attr('checked',true)}else if(items.personeria=="no"){$("#personeria2").attr('checked',true)}else{$("#personeria3").attr('checked',true)};
        if(items.procuraduria=="si"){$("#procuraduria1").attr('checked',true)}else if(items.procuraduria=="no"){$("#procuraduria2").attr('checked',true)}else{$("#procuraduria3").attr('checked',true)};
        if(items.contraloria=="si"){$("#contraloria1").attr('checked',true)}else if(items.contraloria=="no"){$("#contraloria2").attr('checked',true)}else{$("#contraloria3").attr('checked',true)};
        if(items.rama_judicial=="si"){$("#rama_judicial1").attr('checked',true)}else if(items.rama_judicial=="no"){$("#rama_judicial2").attr('checked',true)}else{$("#rama_judicial3").attr('checked',true)};
        if(items.policia=="si"){$("#policia1").attr('checked',true)}else if(items.policia=="no"){$("#policia2").attr('checked',true)}else{$("#policia3").attr('checked',true)};
        if(items.codigo_seguridad=="si"){$("#codigo_seguridad1").attr('checked',true)}else if(items.codigo_seguridad=="no"){$("#codigo_seguridad2").attr('checked',true)}else{$("#codigo_seguridad3").attr('checked',true)};
        if(items.sisipec=="si"){$("#sisipec1").attr('checked',true)}else if(items.sisipec=="no"){$("#sisipec2").attr('checked',true)}else{$("#sisipec3").attr('checked',true)};
        $("#info_ultimo_proceso").val(items.ultimoProceso)
        $("#establecimiento").val(items.estab_carcs_uniqid)
        $("#situacion").val(items.sit_jurid_uniqid)
        $("#delito").val(items.delitos_uniqid)
    }




    function guardarAntecedentes(){

        if($("#proceso_actual1").prop('checked')){procesoAct="si"}else{procesoAct="no"};
        if($("#personeria1").prop('checked')){person="si"}else if($("#personeria2").prop('checked')){person="no"}else{person="no fue posible verificar"}
        if($("#procuraduria1").prop('checked')){procurad="si"}else if($("#procuraduria2").prop('checked')){procurad="no"}else{procurad="no fue posible verificar"}
        if($("#contraloria1").prop('checked')){contralor="si"}else if($("#contraloria2").prop('checked')){contralor="no"}else{contralor="no fue posible verificar"}
        if($("#rama_judicial1").prop('checked')){rama="si"}else if($("#rama_judicial2").prop('checked')){rama="no"}else{rama="no fue posible verificar"}
        if($("#policia1").prop('checked')){pol="si"}else if($("#policia2").prop('checked')){pol="no"}else{pol="no fue posible verificar"}
        if($("#codigo_seguridad1").prop('checked')){codSeg="si"}else if($("#codigo_seguridad2").prop('checked')){codSeg="no"}else{codSeg="no fue posible verificar"}
        if($("#sisipec1").prop('checked')){sisip="si"}else if($("#sisipec2").prop('checked')){sisip="no"}else{sisip="no fue posible verificar"}


        let informacion={
            fecha_libertad:$("#fecha_libertad").val(),
            meses_condena:$("#meses_condena").val(),
            ultimoProceso:$("#info_ultimo_proceso").val(),
            aprehend_adolesc:$("#aprehend_adolesc").val(),
            aprehend_mayor:$("#aprehend_mayor").val(),
            proceso_actual:procesoAct,
            delitos_uniqid:$("#delito").val(),
            estab_carcs_uniqid:$("#establecimiento").val(),
            sit_jurid_uniqid:$("#situacion").val(),
            personeria:person,
            procuraduria:procurad,
            contraloria:contralor,
            rama_judicial:rama,
            policia:pol,
            codigo_seguridad:codSeg,
            sisipec:sisip
        }

        $.ajax({

            url:endpoint+"/antecedentes/save?numeroDocumento="+numero,
            type:'POST',
            data:JSON.stringify(informacion),
            dataType:'json',
            contentType:"application/json",
            complete:function(data){
                console.log(data.status)
                let mensaje=""
                if(data.status=="201"){
                    mensaje="guardo antecedentes con exito"
                    alert("Se guardó Antecedentes con éxito!!")
                }
                else{
                    mensaje="problemas al guardar en base datos"
                    alert("Ups... No se guardó Antecedentes en base datos!!!")
                }
                console.log(mensaje)
            }
        })
    }
})