//var endpoint="localhost:7001/recepcion/consultar"
//var endpoint="localhost:8085/recepcion/consultar"
var endpoint="localhost:8085/gente"
$(document).ready(function(){



    $("#verificar").click(function(){
        getVisita();
    })






    function getVisita(){

        /*let documentoTipo=$("#tipo_documento").val();
        let numeroDocumento=$("#numero_documento").val();
        console.log(documentoTipo);
        console.log(numeroDocumento);

        $.ajax({

            //url:endpoint+"?documentNumber="+numeroDocumento,
            url:endpoint,+"/saludo",
            type:"GET",
            dataType:"json",
            complete:function(data){
                console.log(data)
                alert("entró la data")
                
            },error:function(xhr,status){
                
                alert("ha sucedido un problema nuevo:"+status)
            },
            complete(xhr,status){
                alert("peticion realizada:"+status)
            }

            




        })*/

        let documentoTipo=$("#tipo_documento").val();
        let numeroDocumento=$("#numero_documento").val();
        console.log(documentoTipo);
        console.log(numeroDocumento);


        $.ajax({

            url:endpoint,
            type:"GET",
            dataType:"json",
            success:function(data){
                console.log(data)
                alert("entró la data")
                
            },error:function(xhr,status){
                
                alert("ha sucedido un problema nuevo:"+status)
            },
            complete(xhr,status){
                alert("peticion realizada:"+status)
            }

            




        })




    }



    










})