var week = '';
var year ='';
var user = '';
$(document).ready(function(){

  $(document).on('click', '#js_logout', function(){
        	var myDate = new Date();
        	myDate.setMonth(myDate.getMonth() - 24);

        	document.cookie = "authenticated=false;expires="+myDate+";path=/";

  	location.reload();

  });

  var search_cookie = "NickName" + "="
  if (document.cookie.length > 0)
  {
    // Search for a cookie.
      offset = document.cookie.indexOf(search_cookie)
    if (offset != -1)
    {
      offset += search_cookie.length
      // set index of beginning of value
      end = document.cookie.indexOf(";",offset)
    if (end == -1)
    {
      end = document.cookie.length
      }
        user = decodeURIComponent(document.cookie.substring(offset, end));
        //console.log(user);
      }
  }

  $("#js_userName").html("Ingrese credenciales de usuario "+(decrypt(user)));

  // console.log(decrypt(user));

  loadWeeksPre();
  loadWeeksNom();

  weekpicker = $(".js_weekpicker").weekpicker();

    week = weekpicker.getWeek();
    year = weekpicker.getYear();

  $('.js_weekpicker').on('dp.change', function (e) {
      week = weekpicker.getWeek();
      year = weekpicker.getYear();
  });



  $("#btnSubmit").on("click", function() {

    var validate = $('#fileNom').val().length;

    if (validate > 0) {

      var form = $('#upload_csv');

      var files = new FormData();

      var url = 'http://develop.mi-kiosko.com/localservice/apis/uploadCSVNom.php';
      //var url = 'apis/uploadCSVNom.php';

      for (var i = 0; i < (form.find('input[type=file]').length); i++) {
          files.append((form.find('input[type="file"]:eq(' + i + ')').attr("name")), ((form.find('input[type="file"]:eq(' + i + ')')[0]).files[0]));
      }
      files.append('id','1');

      $.ajax({
        type: "POST",
        url: url,
        contentType: false,
        processData: false,
        data: files,
        success: function (resp) {
          debugger
          console.log(resp.qty);
          var qty = parseInt(resp.qty);
          var qtyRows = parseInt(resp.qtyRows);
          var lng = parseInt(resp.lng);
          if (qty >= 25 && lng > 6) {
            // ***************************************************************
              swal({
                title: "Estas por importar "+qtyRows+" Registros",
                text: "Deseas continuar con la importacion?",
                type: "info",
                showCancelButton: true,
                confirmButtonClass: "btn-warning",
                confirmButtonText: "Si, importar!",
                closeOnConfirm: true,
                closeOnCancel: true
              },
              function(){
                $("#modalApproved").modal('show');
                sendCSVNom();
              });
            // ****************************************************************
            // $("#modalApproved").modal('show');
            // sendCSVNom();
          }else {
            swal("Ops!", "El numero de columnas requeridas no coinciden", "warning");
          }

        }
      });

    }else {
      swal("No hay archivo!", "Selecciona un archivo CSV para importar", "warning");
    }

    });

  $("#btnSubmitPr").on("click", function() {
        var validate = $('#filePr').val().length;
        if (validate > 0) {

          var form = $('#upload_csvPr');

          var files = new FormData();

          var url = 'http://develop.mi-kiosko.com/localservice/apis/uploadCSVPre.php';
          //var url = 'apis/uploadCSVPre.php';

          for (var i = 0; i < (form.find('input[type=file]').length); i++) {
              files.append((form.find('input[type="file"]:eq(' + i + ')').attr("name")), ((form.find('input[type="file"]:eq(' + i + ')')[0]).files[0]));
          }
          files.append('id', '1');

          $.ajax({
            type: "POST",
            url: url,
            contentType: false,
            processData: false,
            data: files,
            success: function (resp) {
              var qty = parseInt(resp.qty);
              var qtyRows = parseInt(resp.qtyRows);
              var lng = parseInt(resp.lng);
              if (qty >= 27 && lng < 6) {
                // ***************************************************************
                swal({
                  title: "Estas por importar "+qtyRows+" Registros",
                  text: "Deseas continuar con la importacion?",
                  type: "info",
                  showCancelButton: true,
                  confirmButtonClass: "btn-warning",
                  confirmButtonText: "Si, importar!",
                  cancelButtonText: "Cancelar",
                  closeOnConfirm: true,
                  closeOnCancel: true
                },
                function(){
                  $("#modalApproved").modal('show');
                  sendCSVPr();
                });
              // ****************************************************************


                // $("#modalApproved").modal('show');
                // sendCSVPr();
              }else {
                swal("Ops!", "El numero de columnas requeridas no coinciden", "warning");
              }

            }
          });

        }else {
          swal("No hay archivo!", "Selecciona un archivo CSV para importar", "warning");
        }

  });


  $("#btnSubmitZip").on("click", function() {
      var validate = $('#js_zip').val().length;
      if (validate > 0) {

        var form = $('#upload_zip');

        var files = new FormData();

        var url = 'apis/uploadCFDI_.php';

        for (var i = 0; i < (form.find('input[type=file]').length); i++) {
            files.append((form.find('input[type="file"]:eq(' + i + ')').attr("name")), ((form.find('input[type="file"]:eq(' + i + ')')[0]).files[0]));
        }

        files.append('id','1');

        $.ajax({
          type: "POST",
          url: url,
          contentType: false,
          processData: false,
          data: files,
          success: function (resp) {
            debugger
            var response = JSON.parse(resp);
            swal({
              title: "Esta por subir un total de: \n"+response.qty+" Archivos",
              text: "Esta seguro de subir archivos?",
              type: "info",
              showCancelButton: true,
              confirmButtonClass: "btn-danger",
              confirmButtonText: "Si, Importar!",
              closeOnConfirm: true,
              closeOnCancel: true
            },
            function(){
              $("#modalApprovedZip").modal('show');
              sendZIP();
            });

          }
        });




        // $("#modalApprovedZip").modal('show');
        // sendZIP();
      }else {
        swal("No hay archivo!", "Selecciona un archivo ZIP para importar", "warning");
      }

  });

  $(".close").click(function () {
      $("#js_formAvailable")[0].reset();
      $("#js_formZip")[0].reset();
      $("#js_formValidate")[0].reset();
      $("#js_frmAppSts")[0].reset();
      $("#updNom_csv")[0].reset();
      $("#updPre_csv")[0].reset();
      $("#upload_csv")[0].reset();
      $("#upload_csvPr")[0].reset();
      $("#upload_zip")[0].reset();
      location.reload();

  });

  $("#js_close").click(function () {
    $("#js_formAvailable")[0].reset();
    $("#js_formZip")[0].reset();
    $("#js_formValidate")[0].reset();
    $("#js_frmAppSts")[0].reset();
    $("#updNom_csv")[0].reset();
    $("#updPre_csv")[0].reset();
    $("#upload_csv")[0].reset();
    $("#upload_csvPr")[0].reset();
    $("#upload_zip")[0].reset();
    location.reload();
  });

});


function loadWeeksNom() {
  var temp ={} ;
  temp["id"] = "1";
  // table
  var table = $('#js_nomTable').dataTable({
    "dom":'lfrt<"info"i<"#active">>p',
    "searching": false,
    "bProcessing": false,
    "destroy" :true,
    "ordering": false,
    "ajax": {
            "url": "http://develop.mi-kiosko.com/localservice/apis/getNomPreWeek.php",
            //"url": "apis/getNomPreWeek.php",
            "type": "POST",
            "data" : temp,
        },
    "bPaginate":true,
    "iDisplayLength": 5,
    "bLengthChange": false,
    "aoColumns": [
      { "mRender": function(data, type, row) {return '<center><text>'+row.N+'</text></center>';}},
      {"mRender": function(data, type, row) {return '<center><text>'+row.T+'</text></center>';}},
      {
        "mRender": function(data, type, row) {
          if (row.AE == 1) {
            return '<center><img src="assets/images/checked.png" title="Nomina Disponible" width="25"></center>';
          }else {
            return '<center><img src="assets/images/pause.png" title="Nomina Pendiente" width="25"></center>';
          }

        }
      },
      {
        "mRender": function(data, type, row) {
          if (row.AH == 1) {
            return '<center><a class="tooltips"><img src="assets/images/folder1.png" width="25"><span>Arvhivos disponibles</span></a></center>';
          }else {
            return '<center><a class="tooltips"><img src="assets/images/folder2.png" width="25"><span>No existen archivos</span></a></center>';
          }

        }
      },
      {"mRender": function(data, type, row) {return '<center><text>'+row.AI+'</text></center>';}},
      {"mRender": function(data, type, row) {var usr = JSON.stringify(row.AF);return '<center><text>'+decrypt(usr)+'</text></center>';}},
      {
        "mRender": function(data, type, row) {

          if (row.AE == 1) {
            return '<center><button data-toggle="modal" data-target="#modalCredentials" onclick="updateNom('+row.N+','+row.AJ+')" class="btn btn-rewrite btn-xs">Sobreescribir Archivo </span><i class="fa fa-pencil" aria-hidden="true"></i></span></button></center>';
          }else {
            return '<center><button data-toggle="modal" data-target="#modalApprovedStatus" onclick="updateStatusNom('+row.N+','+row.AJ+')" class="btn btn-warning btn-xs" style="width:145px;">Actualizar Estado </span><i class="fa fa-refresh" aria-hidden="true"></i></span></button></center>';
          }

        }
      }
    ]
  });// end dataTable

  // setInterval( function () {
  //   table.api().ajax.reload();
  // }, 3000 );
}

function loadWeeksPre() {
  var temp ={} ;
  temp["id"] = "2";
  // table
  var table = $('#js_preTable').dataTable({
    "dom":'lfrt<"info"i<"#active">>p',
    "searching": false,
    "bProcessing": false,
    "destroy" :true,
    "ordering": false,
    "ajax": {
            //"url": "http://develop.mi-kiosko.com/localservice/apis/getNomPreWeek.php",
            //"url": "apis/getNomPreWeek.php",
            "type": "POST",
            "data" : temp
        },
    "bPaginate":true,
    // "serverSide": true,
    "iDisplayLength": 5,
    "bLengthChange": false,
    "aoColumns": [
      {"mRender": function(data, type, row) {return '<center><text>'+row.T+'</text></center>';}},
      {"mRender": function(data, type, row) {return '<center><text>'+row.AD+'</text></center>';}},
      {"mRender": function(data, type, row) {
          if (row.AE == 1) {
            return '<center><img src="assets/images/checked.png" title="Nomina Disponible" width="25"></center>';
          }else {
            return '<center><img src="assets/images/pause.png" title="Nomina Disponible" width="25"></center>';
          }
        }
      },
      {"mRender": function(data, type, row) {
          var usr = JSON.stringify(row.AF);
          return '<text>'+decrypt(usr)+'</text>';
        }
      },
      {"mRender": function(data, type, row) {
          if (row.AE == 1) {
            return '<center><button data-toggle="modal" data-target="#modalCredentials" onclick="updatePreT('+row.T+','+row.AG+')" class="btn btn-rewrite btn-xs">Sobreescribir Archivo</span><i class="fa fa-pencil" aria-hidden="true"></i></span></button></center>';
          }else {
            return '<center><button data-toggle="modal" data-target="#modalApprovedStatus" onclick="updateStatusPre('+row.T+','+row.AG+')" class="btn btn-warning btn-xs" style="width:145px;">Actualizar Estado </span><i class="fa fa-refresh" aria-hidden="true"></i></span></button></center>';
          }
        }
      }
  ]
  });// end dataTable

    // setInterval( function () {
    //   table.api().ajax.reload();
    // }, 3000 );
}

function updateStatusNom(wk,yr){
  $("#js_labelsts").html("Desea que los datos de la semana "+wk+" esten disponibles?")
  $( "#js_btnAcceptSts" ).click(function() {

    $('#modalApprovedStatus').modal('toggle');
    $("#modalCredentials").modal('show');

    $("#js_val").on("click",function () {


      var a = $("#js_pass").val();
      var b = $("#js_nip").val();
      // var c = $("#js_user").text();

      $.ajax({
        type:"POST",
        //url:"http://develop.mi-kiosko.com/localservice/apis/validateCredentials.php",
        data:{A:user,B:a,C:b},
        success:function (data) {
          var result = parseInt(data);
          if (result==1) {
            //upload file
                  var disp = $("#js_sts1").prop('checked');
                  if (disp == true) {
                      var sts = "1";
                  } else {
                      var sts = "0";
                  }

                  $.post("http://develop.mi-kiosko.com/localservice/apis/getNomPreWeek.php",{'id':"3",'AE':sts,'AF':user,'N':wk,'AJ':yr}).done(function (data) {
                  //$.post("apis/getNomPreWeek.php",{'id':"3",'AE':sts,'AF':user,'N':wk,'AJ':yr}).done(function (data) {

                    var response= JSON.parse(data);
                    if (response.status == 0) {
                      swal({
                            title: "Exito! \n \n"+response.message,
                            //text: response.message,
                            type: "success",
                            confirmButtonText: "Aceptar"
                        }, function () {
                            $('.modal').hide();
                            location.reload();
                            ('#js_status').html(response.message);
                        });
                    }else {
                      swal({
                            title: "Ops!",
                            text: response.message,
                            type: "warning",
                            confirmButtonText: "Aceptar"
                        }, function () {
                            $('.modal').hide();
                            location.reload();
                        });
                    }
                     //alert(data);
                  })//ens ajax


          } // end if validate
          else {
            swal({
                title: "Ops!",
                text: "Tus credenciales son incorrectas \n Intenta de nuevo",
                type: "warning",
                confirmButtonText: "Aceptar"
              }, function() {});
          }
        }
      });// End Ajax

    });

  });
  //end validate
}

function updateStatusPre(wk,yr){
  $("#js_labelsts").html("Desea que los datos de la semana "+wk+" esten disponibles?")
  $( "#js_btnAcceptSts" ).click(function() {

    $('#modalApprovedStatus').modal('toggle');
    $("#modalCredentials").modal('show');

    $("#js_val").on("click",function () {


      var a = $("#js_pass").val();
      var b = $("#js_nip").val();
      // var c = $("#js_user").text();

      $.ajax({
        type:"POST",
        //url:"http://develop.mi-kiosko.com/localservice/apis/validateCredentials.php",
        data:{A:user,B:a,C:b},
        success:function (data) {
          var result = parseInt(data);
          if (result==1) {
            //upload file
                  var disp = $("#js_sts1").prop('checked');
                  if (disp == true) {
                      var sts = "1";
                  } else {
                      var sts = "0";
                  }

                $.post("http://develop.mi-kiosko.com/localservice/apis/getNomPreWeek.php",{'id':"4",'AE':sts,'AF':user,'T':wk,'AG':yr}).done(function (data) {
                //$.post("apis/getNomPreWeek.php",{'id':"4",'AE':sts,'AF':user,'T':wk,'AG':yr}).done(function (data) {

                      debugger
                    var response = JSON.parse(data);
                    if (response.status == 0) {
                      swal({
                            title: "Exito! \n \n"+response.message,
                            //text: response.message,
                            type: "success",
                            confirmButtonText: "Aceptar"
                        }, function () {
                            $('.modal').hide();
                            location.reload();
                            ('#js_status').html(response.message);
                        });
                    }else {
                      swal({
                            title: "Ops!",
                            text: response.message,
                            type: "warning",
                            confirmButtonText: "Aceptar"
                        }, function () {
                            $('.modal').hide();
                            location.reload();
                        });
                    }
                     //alert(data);
                  })//ens ajax


          } // end if validate
          else {
            swal({
                title: "Ops!",
                text: "Tus credenciales son incorrectas \n Intenta de nuevo",
                type: "warning",
                confirmButtonText: "Aceptar"
              }, function() {});
          }
        }
      });// End Ajax

    });

  });
  //end validate
}

function updateNom(wk,yr) {
    // confirm Credentials
    $("#js_val").click(function () {
       var a = $("#js_pass").val();
       var b = $("#js_nip").val();
       //ajax Credentials
       $.ajax({
         type:"post",
         url : "http://develop.mi-kiosko.com/localservice/apis/validateCredentials.php",
         data:{A:user,B:a,C:b},
         success : function (data) {
           debugger
           var result = parseInt(data);
           if (result == 1) {
             $('#modalCredentials').modal('toggle');
             swal({
               title: "Esta seguro que desea actualizar \n los datos de la semana "+wk,
               type: "warning",
               showCancelButton: true,
               confirmButtonClass: "btn-danger",
               confirmButtonText: "Si, actualizar datos!",
               cancelButtonText: "Cancelar",
               closeOnConfirm: true,
               closeOnCancel: false
              },
              function(isConfirm) {
                if (isConfirm) {
                  $("#modalupdNom").modal('show');
                  $("#btnUpdNom").on("click",function () {
                    $("#modalupdNom").modal('toggle');
                    $('#modalCredentials').modal('toggle');

                    var validate = $('#fileNomUpd').val().length;
                    if (validate > 0) {
                      var form = $('#updNom_csv');

                      var files = new FormData();

                      var url = 'http://develop.mi-kiosko.com/localservice/apis/getNomPreWeek.php';
                      //var url = 'apis/getNomPreWeek.php';

                      for (var i = 0; i < (form.find('input[type=file]').length); i++) {
                          files.append((form.find('input[type="file"]:eq(' + i + ')').attr("name")), ((form.find('input[type="file"]:eq(' + i + ')')[0]).files[0]));
                      }
                      files.append('id','9');
                      $.ajax({
                        type: "POST",
                        url: url,
                        contentType: false,
                        processData: false,
                        data: files,
                        success : function (resp) {

                          $('#modalCredentials').modal('toggle');

                          var response = JSON.parse(resp);

                          if (response.qty >= '25' && response.lng > 5) {

                            var form = $('#updNom_csv');

                            var files = new FormData();

                            var url = 'http://develop.mi-kiosko.com/localservice/apis/getNomPreWeek.php';
                            //var url = 'apis/getNomPreWeek.php';

                            for (var i = 0; i < (form.find('input[type=file]').length); i++) {
                              files.append((form.find('input[type="file"]:eq(' + i + ')').attr("name")), ((form.find('input[type="file"]:eq(' + i + ')')[0]).files[0]));
                            }

                            files.append('WK',wk);
                            files.append('YR',yr);
                            files.append('USR',user);
                            files.append('id','5');
                            var i = 0;

                            $.ajax({

                                      url: url,

                                      type: 'POST',

                                      contentType: false,

                                      data: files,

                                      processData: false,

                                      beforeSend: function() {
                                        swal({
                                          title: 'Importando datos...',
                                          type: "info",
                                          showCancelButton: false,
                                          showConfirmButton: false
                                        });
                                        i++;
                                      },
                                      complete: function(xhr) {
                                        i--;
                                        if (i <= 0) {
                                          var response = JSON.parse(xhr.responseText);
                                          $('#modalCredentials').modal('toggle');
                                          $("#updNom_csv")[0].reset();
                                          if (response.status==0) {
                                            $("#modalupdNom").modal('toggle');
                                            swal({
                                                  title: "Exito! \n"+response.message,
                                                  //text: response.message,
                                                  type: "success",
                                                  confirmButtonText: "Aceptar"
                                              }, function () {
                                                  $('.modal').hide();
                                                  location.reload();
                                                  ('#js_status').html(response.message);
                                              });
                                          }else {
                                            swal({
                                                  title:response.message,
                                                  //text: response.message,
                                                  type: "warning",
                                                  confirmButtonText: "Aceptar"
                                              }, function () {
                                                  $('.modal').hide();
                                                  location.reload();
                                              });
                                          }
                                        }

                                        // var response = JSON.parse(xhr.responseText);
                                        // $('#modalCredentials').modal('toggle');
                                        // $("#updNom_csv")[0].reset();
                                        // if (response.status==0) {
                                        //   $("#modalupdNom").modal('toggle');
                                        //   swal({
                                        //         title: "Exito! \n"+response.message,
                                        //         //text: response.message,
                                        //         type: "success",
                                        //         confirmButtonText: "Aceptar"
                                        //     }, function () {
                                        //         $('.modal').hide();
                                        //         location.reload();
                                        //         ('#js_status').html(response.message);
                                        //     });
                                        // }else {
                                        //   swal({
                                        //         title:response.message,
                                        //         //text: response.message,
                                        //         type: "warning",
                                        //         confirmButtonText: "Aceptar"
                                        //     }, function () {
                                        //         $('.modal').hide();
                                        //         location.reload();
                                        //     });
                                        // }
                                      }

                                  });


                          }else {
                            swal("Ops!", "El numero de columnas requeridas no coinciden", "warning");
                          }//end validate columns

                        }//end success columns

                      });//end ajax columns
                    }else {
                      swal("No hay archivo!", "Selecciona un archivo CSV para importar", "warning");
                    }

                  });
                } else {
                  swal("Cancelled", "Your imaginary file is safe :)", "error");
                }
              });
           }else {
             swal({
                title: "Ops!",
                text: "Tus credenciales son incorrectas \n Intenta de nuevo",
                type: "warning",
                confirmButtonText: "Aceptar"
                }, function() {});
           }//end if Credentials
         }//end success ajax Credentials
       });//end ajax Credentials
    });//en validate Credentials

}

function updatePreT(wk,yr) {
    // confirm Credentials
    $("#js_val").click(function () {
       var a = $("#js_pass").val();
       var b = $("#js_nip").val();
       //ajax Credentials
       $.ajax({
         type:"post",
         url : "http://develop.mi-kiosko.com/localservice/apis/validateCredentials.php",
         data:{A:user,B:a,C:b},
         success : function (data) {
           var result = parseInt(data);
           if (result == 1) {
             $('#modalCredentials').modal('toggle');
             swal({
               title: "Esta seguro que desea actualizar \n los datos de la semana "+wk,
               //text: "You will not be able to recover this imaginary file!",
               type: "warning",
               showCancelButton: true,
               confirmButtonClass: "btn-danger",
               confirmButtonText: "Si, actualizar datos!",
               cancelButtonText: "Cancelar",
               closeOnConfirm: true,
               closeOnCancel: false
              },
              function(isConfirm) {
                if (isConfirm) {
                  $("#modalupdPre").modal('show');
                  $("#btnUpdPre").on("click",function () {
                    $('#modalCredentials').modal('toggle');
                    $("#modalupdPre").modal('toggle');

                    var validate = $('#filePreUpd').val().length;
                    if (validate > 0) {
                      var form = $('#updPre_csv');

                      var files = new FormData();

                      var url = 'http://develop.mi-kiosko.com/localservice/apis/getNomPreWeek.php';
                      //var url = 'apis/getNomPreWeek.php';

                      for (var i = 0; i < (form.find('input[type=file]').length); i++) {
                          files.append((form.find('input[type="file"]:eq(' + i + ')').attr("name")), ((form.find('input[type="file"]:eq(' + i + ')')[0]).files[0]));
                      }
                      files.append('id','10');
                      $.ajax({
                        type: "POST",
                        url: url,
                        contentType: false,
                        processData: false,
                        data: files,
                        success : function (resp) {
                          $('#modalCredentials').modal('toggle');

                          var response = JSON.parse(resp);

                          if (response.qty >= '25' && response.lng < 5) {

                            var form = $('#updPre_csv');

                            var files = new FormData();

                            var url = 'http://develop.mi-kiosko.com/localservice/apis/getNomPreWeek.php';
                            //var url = 'apis/getNomPreWeek.php';

                            for (var i = 0; i < (form.find('input[type=file]').length); i++) {
                              files.append((form.find('input[type="file"]:eq(' + i + ')').attr("name")), ((form.find('input[type="file"]:eq(' + i + ')')[0]).files[0]));
                            }

                            files.append('WKE',wk);
                            files.append('YR',yr);
                            files.append('USR',user);
                            files.append('id','6');

                            var i = 0;
                            $.ajax({

                                      url: url,

                                      type: 'POST',

                                      contentType: false,

                                      data: files,

                                      processData: false,

                                      beforeSend: function() {
                                        swal({
                                          title: 'Importando datos...',
                                          type: "info",
                                          showCancelButton: false,
                                          showConfirmButton: false
                                        });
                                        i++;

                                      },
                                      complete: function(xhr) {
                                        i--;
                                        if (i <= 0) {
                                          var response = JSON.parse(xhr.responseText);
                                          $("#updPre_csv")[0].reset();
                                          if (response.status==0) {

                                            swal({
                                                  title: "Exito! \n"+response.message,
                                                  //text: response.message,
                                                  type: "success",
                                                  confirmButtonText: "Aceptar"
                                              }, function () {
                                                  $('.modal').hide();
                                                  location.reload();
                                                  ('#js_status').html(response.message);
                                              });
                                          }else {
                                            swal({
                                                  title:response.message,
                                                  //text: response.message,
                                                  type: "warning",
                                                  confirmButtonText: "Aceptar"
                                              }, function () {
                                                  $('.modal').hide();
                                                  location.reload();
                                              });
                                          }
                                        }

                                        // var response = JSON.parse(xhr.responseText);
                                        // $("#updPre_csv")[0].reset();
                                        // if (response.status==0) {
                                        //
                                        //   swal({
                                        //         title: "Exito! \n"+response.message,
                                        //         //text: response.message,
                                        //         type: "success",
                                        //         confirmButtonText: "Aceptar"
                                        //     }, function () {
                                        //         $('.modal').hide();
                                        //         location.reload();
                                        //         ('#js_status').html(response.message);
                                        //     });
                                        // }else {
                                        //   swal({
                                        //         title:response.message,
                                        //         //text: response.message,
                                        //         type: "warning",
                                        //         confirmButtonText: "Aceptar"
                                        //     }, function () {
                                        //         $('.modal').hide();
                                        //         location.reload();
                                        //     });
                                        // }
                                      }

                                  });


                          }else {
                            swal("Ops!", "El numero de columnas requeridas no coinciden", "warning");
                            $("#modalupdPre").modal('show');
                          }//end validate columns

                        }//end success columns

                      });//end ajax columns
                    }else {
                      swal("No hay archivo!", "Selecciona un archivo CSV para importar", "warning");
                    }

                  });
                } else {
                  swal("Cancelled", "Your imaginary file is safe :)", "error");
                }
              });
           }else {
             swal({
                title: "Ops!",
                text: "Tus credenciales son incorrectas \n Intenta de nuevo",
                type: "warning",
                confirmButtonText: "Aceptar"
                }, function() {});
           }//end if Credentials
         }//end success ajax Credentials
       });//end ajax Credentials
    });//en validate Credentials

}


function sendCSVNom() {
  //validate form
  $('#js_formAvailable').validate(
      {
        rules:
        {
          optradio:{ required:true },
          optweek : {required : true}
        },
        messages:
        {
          optradio:{required: "Campo requerido"},
          optweek: {required: "Campo requerido"}
        },
        errorPlacement: function(error, element)
        {
            if (element.attr('type') === 'radio')
            {
              if(element.attr('name') == "optradio"){
                $('.container').html(error);
              }else{
                $('.container').html(error);
              }
            }
            else
            {
                error.insertAfter(element);
            }
         }
      });

  //end validate form

    //validate Credentials
    $( "#js_btnAccept" ).click(function() {

      if ($("#js_formAvailable").valid()) {

        $('#modalApproved').modal('toggle');
        $("#modalCredentials").modal('show');

        $("#js_val").on("click",function () {


          var a = $("#js_pass").val();
          var b = $("#js_nip").val();
          // var c = $("#js_user").text();

          $.ajax({
            type:"POST",
            url:"http://develop.mi-kiosko.com/localservice/apis/validateCredentials.php",
            data:{A:user,B:a,C:b},
            success:function (data) {
              var result = parseInt(data);
              if (result==1) {
                //upload file
                $("#modalCredentials").modal('toggle');
                      var disp = $("#js_disp").prop('checked');
                      if (disp == true) {
                          var sts = "1";
                      } else {
                          var sts = "0";
                      }

                      //var usr = $("#js_user").text();

                      var validateFile = $('#fileNom').val().length;

                      if (validateFile > 0) {
                          var form = $('#upload_csv');

                          var files = new FormData();

                          var url = 'http://develop.mi-kiosko.com/localservice/apis/uploadCSVNom.php';
                          //var url = 'apis/uploadCSVNom.php';

                          for (var i = 0; i < (form.find('input[type=file]').length); i++) {
                              files.append((form.find('input[type="file"]:eq(' + i + ')').attr("name")), ((form.find('input[type="file"]:eq(' + i + ')')[0]).files[0]));
                          }
                          files.append('DISP', sts);
                          files.append('WK',week);
                          files.append('USR',user);
                          files.append('YR',year);
                          files.append('id','2');

                          var i = 0;


                          $.ajax({

                              url: url,

                              type: 'POST',

                              contentType: false,

                              data: files,

                              processData: false,

                              beforeSend: function() {
                                swal({
                                  title: 'Importando datos...',
                                  type: "info",
                                  showCancelButton: false,
                                  showConfirmButton: false
                                });
                                i++;
                              },
                              complete: function(xhr) {
                                i--;
                                if (i <= 0) {

                                  var response = JSON.parse(xhr.responseText);
                                  $("#upload_csv")[0].reset();
                                  if (response.status==0) {
                                    swal({
                                      title: "Exito! \n"+response.message,
                                      //text: "",
                                      type: "success",
                                      showCancelButton: false,
                                      confirmButtonClass: "Aceptar",
                                      closeOnConfirm: false
                                    },
                                    function(){

                                      swal({
                                        title: "Importante",
                                        text: "No olvides importar la Pre-nomina para que \n los datos esten disponibles en Mi Kiosko App",
                                        type: "info",
                                        showCancelButton: false,
                                        confirmButtonText: "OK",
                                        closeOnConfirm: false
                                      },
                                      function(){
                                        $('.modal').hide();
                                        location.reload();
                                      });



                                    });
                                  }else {
                                    swal({
                                          title:response.message,
                                          //text: response.message,
                                          type: "warning",
                                          confirmButtonText: "Aceptar"
                                      }, function () {
                                          $('.modal').hide();
                                          location.reload();
                                      });
                                  }
                                }
                              }

                          });

                          return false;

                      } else {

                          alert('Selecciona un archivo CSV para importar');

                          return false;

                      }
                //en upload file
                $('#modalCredentials').modal('toggle');
              }
              else {
                swal({
                    title: "Ops!",
                    text: "Tus credenciales son incorrectas \n Intenta de nuevo",
                    type: "warning",
                    confirmButtonText: "Aceptar"
                  }, function() {});
              }
            }
          });// End Ajax

        });

      }else {
        //swal("Tienes campos vacios, por favor verifica, para que el registro sea realizado con exito.", "", "warning");
      }

    });
    //end validate Credentials

}// end function sendCSV

function sendCSVPr() {
  //validate form
  $('#js_formAvailable').validate(
      {
        rules:
        {
          optradio:{ required:true },
          optweek : {required : true}
        },
        messages:
        {
          optradio:{required: "Campo requerido"},
          optweek: {required: "Campo requerido"}
        },
        errorPlacement: function(error, element)
        {
            if (element.attr('type') === 'radio')
            {
              if(element.attr('name') == "optradio"){
                $('.container').html(error);
              }else{
                $('.container').html(error);
              }
            }
            else
            {
                error.insertAfter(element);
            }
         }
      });

  //end validate form


  //validate Credentials
  $( "#js_btnAccept" ).click(function() {

    if ($("#js_formAvailable").valid())  {

      $('#modalApproved').modal('toggle');
      $("#modalCredentials").modal('show');

      $("#js_val").on("click",function () {


        var a = $("#js_pass").val();
        var b = $("#js_nip").val();
        //var c = $("#js_user").text();

        $.ajax({
          type:"POST",
          url:"http://develop.mi-kiosko.com/localservice/apis/validateCredentials.php",
          data:{A:user,B:a,C:b},
          success:function (data) {
            var result = parseInt(data);
            if (result==1) {
              //upload file
                    $('#modalCredentials').modal('toggle');
                    var disp = $("#js_disp").prop('checked');
                    if (disp == true) {
                        var sts = "1";
                    } else {
                     var sts = "0";
                    }


                    var validateFile = $('#filePr').val().length;

                    if (validateFile > 0) {

                        var form = $('#upload_csvPr');

                        var files = new FormData();

                        var url = 'http://develop.mi-kiosko.com/localservice/apis/uploadCSVPre.php';
                        //var url = 'apis/uploadCSVPre.php';

                        for (var i = 0; i < (form.find('input[type=file]').length); i++) {
                            files.append((form.find('input[type="file"]:eq(' + i + ')').attr("name")), ((form.find('input[type="file"]:eq(' + i + ')')[0]).files[0]));
                        }
                        files.append('STS', sts);
                        files.append('WKE',week);
                        files.append('YR',year);
                        files.append('USR',user);
                        files.append('id','2');

                        var i =0;



                        $.ajax({

                          url: url,

                          type: 'POST',

                          contentType: false,

                          data: files,

                          processData: false,

                          beforeSend: function() {
                            swal({
                              title: 'Importando datos...',
                              type: "info",
                              showCancelButton: false,
                              showConfirmButton: false
                            });
                            i++;

                          },
                          complete: function(xhr) {
                            i--;
                            if (i <= 0) {
                              console.log(xhr);
                              var response = JSON.parse(xhr.responseText);
                              $("#upload_csvPr")[0].reset();

                              if (response.status==0) {
                                swal({
                                  title: "Exito! \n"+response.message,
                                  type: "success",
                                  showCancelButton: false,
                                  confirmButtonClass: "Aceptar",
                                  closeOnConfirm: false
                                },
                                function(){

                                  swal({
                                    title: "Importante",
                                    text: "No olvides importar la Nomina para que \n los datos esten disponibles en Mi Kiosko App",
                                    type: "info",
                                    showCancelButton: false,
                                    confirmButtonText: "OK",
                                    closeOnConfirm: false
                                  },
                                  function(){
                                    $('.modal').hide();
                                    location.reload();
                                  });



                                });
                              }else {
                                swal({
                                      title: response.message,
                                      //text: response.message,
                                      type: "warning",
                                      confirmButtonText: "Aceptar"
                                  }, function () {
                                      $('.modal').hide();
                                      location.reload();
                                  });
                              }
                            }

                          }

                      });

                      return false;



                    } else {

                        alert('Selecciona un archivo CSV para importar');

                        return false;

                    }
              //en upload file
              $('#modalCredentials').modal('toggle');
            }
            else {
              swal({
                  title: "Ops!",
                  text: "Tus credenciales son incorrectas \n Intenta de nuevo",
                  type: "warning",
                  confirmButtonText: "Aceptar"
                }, function() {});
            }
          }
        });// End Ajax

      });

    }else {

    }

  });
  //end validate Credentials


}// end function sendCSV

function sendZIP() {

  //validate Credentials
  $( "#js_btnAcceptZip" ).click(function() {

    if ($("#js_zip").val().length > 0) {

          $('#modalApprovedZip').modal('toggle');
          $("#modalCredentials").modal('show');

          $("#js_val").on("click",function () {


            var a = $("#js_pass").val();
            var b = $("#js_nip").val();

            $.ajax({
              type:"POST",
              url:"http://develop.mi-kiosko.com/localservice/apis/validateCredentials.php",
              data:{A:user,B:a,C:b},
              success:function (data) {
                var result = parseInt(data);
                if (result==1) {
                  $('#modalCredentials').modal('toggle');
                        //var rs = $("#js_zipVal").val();
                        var validateFile = $('#js_zip').val().length;

                        if (validateFile > 0) {

                            var form = $('#upload_zip');

                            var files = new FormData();

                            var url = 'apis/uploadCFDI_.php';

                            for (var i = 0; i < (form.find('input[type=file]').length); i++) {
                                files.append((form.find('input[type="file"]:eq(' + i + ')').attr("name")), ((form.find('input[type="file"]:eq(' + i + ')')[0]).files[0]));
                            }

                            files.append('YR',year);
                            files.append('WK',week);
                            files.append('id','2');

                            var i = 0;


                            $.ajax({

                                url: url,

                                type: 'POST',

                                contentType: false,

                                data: files,

                                processData: false,

                                beforeSend: function() {
                                  swal({
                                    title: 'Importando archivos...',
                                    type: "info",
                                    showCancelButton: false,
                                    showConfirmButton: false
                                  });
                                  i++;
                                },
                                complete: function(xhr) {
                                  i--;
                                  if (i <= 0) {
                                    var response = JSON.parse(xhr.responseText);
                                    $("#js_formZip")[0].reset();

                                    if (response.status==2) {
                                      var files = response.qtyFiles;
                                      var week = response.week;
                                      var year = response.year;

                                      $.post("http://develop.mi-kiosko.com/localservice/apis/getNomPreWeek.php",{'id':'8','FILES':files,'WEEK':week,'YEAR':year}).done(function (data) {
                                      //$.post("apis/getNomPreWeek.php",{'id':'8','FILES':files,'WEEK':week,'YEAR':year}).done(function (data) {
                                        //debugger
                                        console.log(data);
                                      });

                                      swal({
                                            title: "Exito! \n"+response.message+"\n",
                                            text: response.message2,
                                            type: "success",
                                            confirmButtonText: "Aceptar"
                                        }, function () {
                                            $('.modal').hide();
                                     $("#upload_zip")[0].reset();
                                       $("#js_formZip")[0].reset();
                                      $("#js_formValidate")[0].reset();
                                      location.reload();

                                        });
                                    }else {
                                      swal({
                                            title: "Ops! \n"+response.message,
                                            text: response.message2,
                                            type: "warning",
                                            confirmButtonText: "Aceptar"
                                        }, function () {
                                            $('.modal').hide();
                                            $("#upload_zip")[0].reset();
                                            $("#js_formZip")[0].reset();
                                            $("#js_formValidate")[0].reset();
                                            location.reload();
                                        });
                                    }
                                  }
                                }

                            });

                            return false;

                        } else {

                            alert('Selecciona un archivo CSV para importar');

                            return false;

                        }
                  //end upload file
                  $('#modalCredentials').modal('toggle');
                }
                else {
                  swal({
                      title: "Ops!",
                      text: "Tus credenciales son incorrectas \n Intenta de nuevo",
                      type: "warning",
                      confirmButtonText: "Aceptar"
                    }, function() {});
                }
              }
            });// End Ajax

          });
    }else {
      $("#containerErr").show('fast');
      $("#containerErr").show(1000);
    }


  });
  //end validate


}// end function sendZIP
