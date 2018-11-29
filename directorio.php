<!DOCTYPE html>
<html>
   <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Directorio</title>
      <link rel="shortcut icon" href="assets/images/favicon.png">
      <!-- <link rel="shortcut icon" href="img/PC-favicon.ico"> -->
      <link href="assets/css/bootstrap.min.css" rel="stylesheet">
      <link href="font-awesome/css/font-awesome.min.css" rel="stylesheet">
      <link href="assets/css/animate.css" rel="stylesheet">
      <link href="assets/css/style.css" rel="stylesheet">
      <link href="assets/css/plugins/awesome-bootstrap-checkbox.css" rel="stylesheet">
      <link rel="stylesheet" href="assets/css/plugins/sweetalert/sweetalert.css">
      <link href="assets/css/plugins/chosen/bootstrap-chosen.css" rel="stylesheet">
      <link rel="stylesheet" href="assets/css/plugins/dataTables/datatables.min.css">
      <link rel="stylesheet" href="assets/css/plugins/jasny/jasny-bootstrap.min.css">
      <link rel="stylesheet" href="assets/css/plugins/datapicker/bootstrap-datetimepicker.min.css">
      <style media="screen">
         /*.modal-footer{
         border-top: 1px solid transparent !important;
         }*/
         #input-group {
         position: relative;
         border-collapse: separate;
         display: flex;
         }
         .arrowRight{
         margin-left: 10px;
         }
         .arrowLeft {
         margin-right: 10px;: 10px;
         }
         .content,
         .content1,.ibox-content {
         background-color: #fff;
         color: inherit;
         border-color: #e7eaec;
         border-style: solid solid none;
         border-width: 1px 0;
         box-shadow: 3px 3px 3px 1px #6f6f6f3d;
         border-image: none;
         position: relative
         }
         .content {
         padding: 15px 20px 1px;
         height: 400px
         }
         .content1 {
         padding: 15px 20px 1px;
         height: 400px
         }
         .swal-text {
         background-color: #FEFAE3;
         padding: 17px;
         border: 1px solid #F0E1A1;
         display: block;
         margin: 22px;
         text-align: center;
         color: #61534e;
         }
         .error
         {
         color:red;
         font-family:verdana, Helvetica;
         }
      </style>
   </head>
   <body>
      <div id="wrapper">
         <!-- Start side bar -->
         <?php include 'WebParts/sideBar.php'; ?>
         <!-- Ends side bar -->
         <div id="page-wrapper" class="gray-bg dashbard-1">
            <!-- Start top bar -->
            <?php include 'WebParts/topBar.php';  ?>
            <!-- End top bar -->
            <!-- Start View title -->
            <div class="row">
               <div class="col-lg-10 white-bg">
                  <h4>
                     Directorio
                  </h4>
               </div>
               <div class="col-lg-2 white-bg">
                  <button class="btn btn-primary btn-sm" data-toggle="modal" data-target="#js_modalAddComp">Nuevo registro</button>
               </div>
            </div>
            <!-- End View title -->
            <!-- Start container -->
            <div id="main-load" class="wrapper wrapper-content">
               <div class="row">
                  <!-- start grid contact -->
                  <div class="col-lg-12">
                     <div class="ibox float-e-margins">
                        <div class="ibox-title">
                           <h4>Listado de empresas</h4>
                        </div>
                        <div class="content1">
                           <div class="table-responsive">
                              <table id="js_directoryTable" class="table table-bordered">
                                 <thead>
                                    <tr>
                                      <th><center>#</center></th>
                                      <th><center>Compañía</center></th>
                                      <th><center>Telefono</center></th>
                                      <th><center>Dirección</center></th>
                                      <th><center>Acción</center></th>
                                    </tr>
                                 </thead>
                              </table>
                           </div>
                        </div>
                     </div>
                  </div>
                  <!-- end grid contact -->
               </div>
            </div>
            <!-- End container -->
         </div>
      </div>
      <!-- modal add Contact -->
      <div class="modal fade" id="js_modalAddComp" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
         <div class="modal-dialog" role="document" style="width: 75%">
            <div class="modal-content">
               <div class="modal-header">
                  <h3 class="modal-title" id="exampleModalLabel">Nuevo Registro</h3>
                  <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                  </button>
               </div>
               <div class="modal-body">
                  <form id="js_addForm" class="form-horizontal" role="form">
                     <div class="form-group">
                        <div class="col-lg-6">
                           <label for="example-text-input" class="col-form-label">Nombre de la compañía</label>
                           <div class="">
                              <input class="form-control" name="formNameComp" type="text" placeholder="Ingrese nombre de la compañía" id="js_namecomp">
                           </div>
                        </div>
                        <div class="col-lg-6">
                           <label for="example-text-input" class="col-2 col-form-label">Teléfono</label>
                           <div class="col-10">
                              <input class="form-control" name="formPhoneComp" type="text" placeholder="Ingrese teléfono de la compañía" id="js_phone">
                           </div>
                        </div>
                     </div>
                     <div class="form-group">
                        <div class="col-lg-12">
                           <label for="example-text-input" class="col-form-label">Dirección</label>
                           <div class="">
                              <input class="form-control" name="formAddComp" type="text" placeholder="Ingrese dirección de la compañía" id="js_address">
                           </div>
                        </div>
                     </div>
                     <div class="form-group">
                        <div class="col-lg-4">
                           <label class="col-form-label">Contacto Principal</label>
                           <input type="text" name="formContactMain" class="form-control" id="js_mainlyNContact"  placeholder="Nombre de Contacto">
                        </div>
                        <div class="col-lg-4">
                           <label class="col-form-label">Correo</label>
                           <input type="email" name="formMailMain" class="form-control" id="js_mainlyEContact" placeholder="Correo de Contacto">
                        </div>
                        <div class="col-lg-4">
                           <label class="col-form-label">Telefono</label>
                           <input type="text" name="formPhoneMain" class="form-control" id="js_mainlyPContact" placeholder="Telefono de Contacto">
                        </div>
                     </div>
                     <div class="form-groupo">
                        <div class="col-lg-12">
                           <input type="button" name="" id="js_append" class="btn btn-primary btn-sm" value="Agregar otro Contacto" style="margin-top: 1%"></input><input type="button" name="" id="js_hideBtn" class="btn btn-primary btn-sm" value="Ocultar" style="margin-top: 1%;display: none;"></input>
                        </div>
                     </div>
                     <div class="form-group" id="js_moreContact" style="display: none">
                        <div class="form-group">
                           <div class="col-lg-4">
                              <label class="col-form-label">Contacto 2</label>
                              <input type="text" name="" class="form-control" id="js_ftsNCntc" placeholder="Nombre de Contacto">
                           </div>
                           <div class="col-lg-4">
                              <label class="col-form-label">Correo</label>
                              <input type="email" name="" class="form-control" id="js_ftsECntc" placeholder="Correo de Contacto">
                           </div>
                           <div class="col-lg-4">
                              <label class="col-form-label">Telefono</label>
                              <input type="text" name="" class="form-control" id="js_ftsPCntc" placeholder="Telefono de Contacto">
                           </div>
                        </div>
                        <div class="form-group">
                           <div class="col-lg-4">
                              <label class="col-form-label">Contacto Principal</label>
                              <input type="text" name="" class="form-control" id="js_scdNCntc" placeholder="Nombre de Contacto">
                           </div>
                           <div class="col-lg-4">
                              <label class="col-form-label">Correo</label>
                              <input type="email" name="" class="form-control" id="js_scdsECntc" placeholder="Correo de Contacto">
                           </div>
                           <div class="col-lg-4">
                              <label class="col-form-label">Telefono</label>
                              <input type="text" name="" class="form-control" id="js_scdPCntc" placeholder="Telefono de Contacto">
                           </div>
                        </div>
                     </div>
                  </form>
                  <div class="modal-footer">
                     <button type="button" class="btn btn-secondary btn-sm" data-dismiss="modal">Close</button>
                     <button type="button" class="btn btn-primary btn-sm" id="js_saveComp">Guardar Solo Registro</button>
                     <button type="button" class="btn btn-primary btn-sm saveCall" id="js_saveCompCall">Guardar Registro y registrar llamada</button>
                  </div>
               </div>
            </div>
         </div>
      </div>
      <!-- end modal add contact -->
      <!-- modal call contact -->
      <div class="modal fade" id="js_modalCall" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
         <div class="modal-dialog" role="document">
            <div class="modal-content">
               <div class="modal-header">
                  <h3 class="modal-title" id="exampleModalLabel">Registro de LLamada</h3>
                  <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                  </button>
               </div>
               <div class="modal-body">
                  <form  class="form-horizontal" role="form">
                    <span hidden="hidden" id="js_fkComp"></span>
                     <div class="form-group">
                        <div class="col-lg-6">
                           <label>Seleccione la fecha de llamada</label>
                           <div class='input-group date'>
                              <input type='text' class="form-control" id="js_datePicker" placeholder="Seleccione una fecha" />
                              <span class="input-group-addon">
                              <span class="glyphicon glyphicon-calendar"></span>
                              </span>
                           </div>
                        </div>

                        <div class="col-lg-6">
                          <label>Selecione el estado de la llamada</label>
                         <select class="form-control" id="js_selectStatus">
                           <option value="Pendiente">Pendiente</option>
                           <option value="Cerrado">Cerrado</option>
                           <option value="En Espera">En Espera</option>
                         </select>
                       </div>
                     </div>

                     <div class="form-group">
                       <div class="col-lg-12">
                           <label>Ingrese un comentario</label>
                           <div>
                              <textarea class="form-control" cols="15" rows="10" style="resize: none;" placeholder="Aqui comentario" id="js_commentCall"></textarea>
                           </div>
                       </div>
                     </div>
                  </form>
                  <div class="modal-footer">
                     <button type="button" class="btn btn-secondary" data-dismiss="modal">Cancelar</button>
                     <button type="button" class="btn btn-primary" id="js_saveCall">Guardar Cambios</button>
                  </div>
               </div>
            </div>
         </div>
      </div>
      <!-- end modal call contact -->

      <!-- modal call contact -->
      <div class="modal fade" id="js_modalCallRecord" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
         <div class="modal-dialog" role="document">
            <div class="modal-content">
               <div class="modal-header">
                  <h3 class="modal-title" id="exampleModalLabel">Registro de LLamada</h3>
                  <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                  </button>
               </div>
               <div class="modal-body">
                     <div class="table-responsive">
                       <table id="js_commentsCall" class="table table-bordered" style="font-size: 8pt;">
                         <thead>
                           <tr>
                             <th><center>Fecha</center></th>
                             <th><center>Comentario</center></th>
                             <th><center>Empresa</center></th>
                             <th><center>Estado de LLamada</center></th>
                           </tr>
                         </thead>
                       </table>
                     </div>
               </div>
               <div class="modal-footer">
                     <button type="button" class="btn btn-secondary" data-dismiss="modal">Cancelar</button>
                     <button type="button" class="btn btn-primary" id="js_saveCall">Guardar Cambios</button>
                </div>
            </div>
         </div>
      </div>
      <!-- end modal call contact -->

   </body>
   <!-- Mainly scripts -->
   <script type="text/javascript" src="assets/js/jquery-3.1.1.min.js"></script>
   <script type="text/javascript" src="assets/js/bootstrap.min.js"></script>
   <script type="text/javascript" src="assets/js/plugins/metisMenu/jquery.metisMenu.js"></script>
   <script src="assets/js/plugins/slimscroll/jquery.slimscroll.min.js"></script>
   <script type="text/javascript" src="assets/js/inspinia.js"></script>
   <script type="text/javascript" src="assets/js/plugins/validate/jquery.validate.min.js"></script>
   <script type="text/javascript" src="assets/js/plugins/sweetalert/sweetalert.min.js"></script>
   <script type="text/javascript" src="assets/js/plugins/chosen/chosen.jquery.js" ></script>
   <script type="text/javascript" src="assets/js/plugins/jasny/jasny-bootstrap.min.js"></script>
   <script type="text/javascript" src="assets/js/plugins/moment/moment.min.js"></script>
   <script type="text/javascript" src="assets/js/plugins/moment/moment-with-locales.min.js"></script>
   <script type="text/javascript" src="assets/js/plugins/datapicker/bootstrap-datetimepicker.min.js"></script>
   <script type="text/javascript" src="assets/js/plugins/datapicker/bootstrap-weekpicker.js"></script>
   <script type="text/javascript" src="assets/js/plugins/datapicker/popper.min.js"></script>
   <script type="text/javascript" src="assets/js/plugins/dataTables/datatables.min.js"></script>
   <!-- Upload Files -->
   <script type="text/javascript" src="assets/js/custom.js"></script>
</html>