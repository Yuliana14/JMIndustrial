$(document).ready(function() {

    loadDirectory();

    //datetimepicker
    $("#js_datePicker").datetimepicker({
        format: 'YYYY-MM-DD',
        locale: 'es',
        widgetPositioning: {
            horizontal: "auto",
            vertical: "auto"
        }
    })


});


//append input
$("#js_append").click(function() {
    $("#js_moreContact").show('slow');
    $("#js_moreContact").show('1000');
    $("#js_hideBtn").show('slow');
    $("#js_append").hide('slow');
});
$("#js_hideBtn").click(function() {
    $("#js_moreContact").hide('slow');
    $("#js_moreContact").hide('1000');
    $("#js_hideBtn").hide('slow');
    $("#js_append").show('slow');
})


var contactsArray = [];
//add contact
$("#js_saveComp").click(function() {
    var nameCompany = $("#js_namecomp").val();
    var address = $("#js_address").val();
    var phone = $("#js_phone").val()

    contactsArray.push({
        "nameContact": $("#js_mainlyNContact").val(),
        "mailContact": $("#js_mainlyEContact").val(),
        "phoneContact": $("#js_mainlyPContact").val()
    });

    if ($("#js_ftsNCntc").val() != "" || $("#js_ftsECntc").val() != "" || $("#js_ftsPCntc").val()) {
        contactsArray.push({
            "nameContact": $("#js_ftsNCntc").val(),
            "mailContact": $("#js_ftsECntc").val(),
            "phoneContact": $("#js_ftsPCntc").val()
        });
    }

    if ($("#js_scdNCntc").val() != "" || $("#js_scdsECntc").val() != "" || $("#js_scdPCntc").val()) {
        contactsArray.push({
            "nameContact": $("#js_scdNCntc").val(),
            "mailContact": $("#js_scdsECntc").val(),
            "phoneContact": $("#js_scdPCntc").val()
        });
    }

    var jsonContacts = JSON.stringify(contactsArray);
    if (!$("#js_namecomp").val() || !$("#js_address").val() || !$("#js_phone").val() || !$("#js_mainlyNContact").val() || !$("#js_mainlyEContact").val()) {
        swal({
            title: "",
            text: "Existen campos vacios, por favor verifica, para que puedas pasar al siguiente paso",
            type: "warning"
        }, function() {
            contactsArray = [];
        });
    } else {
        var form = new FormData();

        form.append('IDCASE', '1');
        form.append('NAME', nameCompany);
        form.append('ADDRESS', address);
        form.append('PHONE', phone);
        form.append('CONTACTS', jsonContacts);

        $.ajax({
            url: 'apis/custom.php',
            data: form,
            type: 'POST',
            contentType: false, // NEEDED, DON'T OMIT THIS (requires jQuery 1.6+)
            processData: false, // NEEDED, DON'T OMIT THIS
            success: function(data) {

                console.log(data);
                if (data > 0) {
                    swal({
                        title: "Exito!",
                        text: "Tu registro se realizó satisfactoriamente",
                        type: "success",
                        confirmButtonText: "Aceptar"
                    }, function() {
                        $('.modal').hide();
                        contactsArray = [];
                        location.reload();
                    });
                } else if (data == 2 || data == 3) {
                    swal({
                        title: "Ops!",
                        text: "Algo salió mal",
                        type: "warning",
                        confirmButtonText: "Aceptar"
                    }, function() {
                        $('.modal').hide();
                        contactsArray = [];
                        location.reload();
                    });
                }
            }
        }); //end ajax 

    }



});

//save contact and call
$("#js_saveCompCall").click(function() {
    contactsArray.push({
        "nameContact": $("#js_mainlyNContact").val(),
        "mailContact": $("#js_mainlyEContact").val(),
        "phoneContact": $("#js_mainlyPContact").val()
    });

    if ($("#js_ftsNCntc").val() != "" || $("#js_ftsECntc").val() != "" || $("#js_ftsPCntc").val()) {
        contactsArray.push({
            "nameContact": $("#js_ftsNCntc").val(),
            "mailContact": $("#js_ftsECntc").val(),
            "phoneContact": $("#js_ftsPCntc").val()
        });
    }

    if ($("#js_scdNCntc").val() != "" || $("#js_scdsECntc").val() != "" || $("#js_scdPCntc").val()) {
        contactsArray.push({
            "nameContact": $("#js_scdNCntc").val(),
            "mailContact": $("#js_scdsECntc").val(),
            "phoneContact": $("#js_scdPCntc").val()
        });
    }

    var jsonContacts = JSON.stringify(contactsArray);

    if (!$("#js_namecomp").val() || !$("#js_address").val() || !$("#js_phone").val() || !$("#js_mainlyNContact").val() || !$("#js_mainlyEContact").val()) {
        swal({
            title: "",
            text: "Existen campos vacios, por favor verifica, para que puedas pasar al siguiente paso",
            type: "warning"
        }, function() {
            contactsArray = [];
        });
    } else {
        var nameCompany = $("#js_namecomp").val();
        var address = $("#js_address").val();
        var phone = $("#js_phone").val()

        var form = new FormData();

        form.append('IDCASE', '1');
        form.append('NAME', nameCompany);
        form.append('ADDRESS', address);
        form.append('PHONE', phone);
        form.append('CONTACTS', jsonContacts);

        $.ajax({
            url: 'apis/custom.php',
            data: form,
            type: 'POST',
            contentType: false, // NEEDED, DON'T OMIT THIS (requires jQuery 1.6+)
            processData: false, // NEEDED, DON'T OMIT THIS
            success: function(data) {

                console.log(data);
                if (data > 0) {
                    $("#js_modalAddComp").modal('toggle');
                    $("#js_modalCall").modal('show');

                    $(".saveCall").click(function() {

                        var companyCall = parseInt(data);
                        var dateCall = $("#js_datePicker").val();
                        var commentCall = $("#js_commentCall").val();
                        var statusCall = $("#js_selectStatus").val();
                        $.post("apis/custom.php", {
                            "IDCASE": "3",
                            "DATECALL": dateCall,
                            "COMMENT": commentCall,
                            "STATUS": statusCall,
                            "COMPANY": companyCall
                        }).done(function(resp) {
                            if (resp == 1) {
                                swal({
                                    title: "Exito!",
                                    text: "Tu registro se realizó satisfactoriamente",
                                    type: "success",
                                    confirmButtonText: "Aceptar"
                                }, function() {
                                    $('.modal').hide();
                                    contactsArray = [];
                                    location.reload();
                                });
                            } else {
                                swal({
                                    title: "Ops!",
                                    text: "Algo salió mal",
                                    type: "warning",
                                    confirmButtonText: "Aceptar"
                                }, function() {
                                    $('.modal').hide();
                                    contactsArray = [];
                                    location.reload();
                                });
                            }

                        }); //end post call
                    });


                } else {
                    swal({
                        title: "Ops!",
                        text: "Algo salió mal",
                        type: "warning",
                        confirmButtonText: "Aceptar"
                    }, function() {
                        $('.modal').hide();
                        contactsArray = [];
                        location.reload();
                    });

                }

            }
        }); //end ajax

    } // end else

});

$("#js_saveCall").click(function() {
    addCommentCall()
});




function loadDirectory() {

    var temp = {};
    temp["IDCASE"] = "2";
    // table
    var table = $('#js_directoryTable').dataTable({
        "dom": 'lfrt<"info"i<"#active">>p',
        "searching": true,
        "bProcessing": false,
        "destroy": true,
        "ordering": false,
        "ajax": {
            "url": "apis/custom.php",
            "type": "POST",
            "data": temp,
        },
        "bPaginate": true,
        "iDisplayLength": 5,
        "bLengthChange": true,
        "aoColumns": [{
                "mRender": function(data, type, row) {
                    return '<center><text>' + row.id + '</text></center>';
                }
            },
            {
                "mRender": function(data, type, row) {
                    return '<center><text>' + row.name + '</text></center>';
                }
            },
            {
                "mRender": function(data, type, row) {
                    return '<center><text>' + row.phone + '</text></center>';
                }
            },
            {
                "mRender": function(data, type, row) {
                    return '<center><text>' + row.address + '</text></center>';
                }
            },
            {
                "mRender": function(data, type, row) {
                    return '<center><button class="btn btn-primary btn-xs" onclick="openModalCommentCall(' + row.id + ')" style="margin-right:1%">Registrar Llamada</button><button class="btn btn-primary btn-xs" data-toggle="modal" data-target="#js_modalCallRecord" onclick="loadComments(' + row.id + ')">Ver Llamadas</button></center>';
                }
            }
        ]
    }); // end dataTable
}

function loadComments(ndx) {
    var temp = {};
    temp["IDCASE"] = "4";
    temp["FKCOMP"] = ndx;
    // table
    var table = $('#js_commentsCall').dataTable({
        "dom": 'lfrt<"info"i<"#active">>p',
        "searching": true,
        "bProcessing": false,
        "destroy": true,
        "ordering": false,
        "ajax": {
            "url": "apis/custom.php",
            "type": "POST",
            "data": temp,
        },
        "bPaginate": true,
        "iDisplayLength": 4,
        "bLengthChange": true,
        "aoColumns": [{
                "mRender": function(data, type, row) {
                    return '<center><text>' + row.dateCall + '</text></center>';
                }
            },
            {
                "mRender": function(data, type, row) {
                    return '<center><text>' + row.commentCall + '</text></center>';
                }
            },
            {
                "mRender": function(data, type, row) {
                    return '<center><text>' + row.nameCompany + '</text></center>';
                }
            },
            {
                "mRender": function(data, type, row) {
                    return '<center><text>' + row.statusCall + '</text></center>';
                }
            }
            /*{
                "mRender": function(data, type, row) {
                    return '<center><button class="btn btn-primary btn-xs" onclick="openModalCommentCall('+row.id+')" style="margin-right:1%">Registrar Llamada</button><button class="btn btn-primary btn-xs" data-toggle="modal" data-target="#js_modalCallRecord" onclick="openModalDetails('+row.id+')">Ver Llamadas</button></center>';
                }
            }*/
        ]
    }); // end dataTable
}

function openModalCommentCall(ndx) {
    $("#js_fkComp").text(ndx);
    $("#js_modalCall").modal('show');
}

function addCommentCall() {
    //get values for comment
    var companyCall = parseInt($("#js_fkComp").text());
    var dateCall = $("#js_datePicker").val();
    var commentCall = $("#js_commentCall").val();
    var statusCall = $("#js_selectStatus").val();
    $.post("apis/custom.php", {
        "IDCASE": "3",
        "DATECALL": dateCall,
        "COMMENT": commentCall,
        "STATUS": statusCall,
        "COMPANY": companyCall
    }).done(function(resp) {
        if (resp == 1) {
            swal({
                title: "Exito!",
                text: "Tu registro se realizó satisfactoriamente",
                type: "success",
                confirmButtonText: "Aceptar"
            }, function() {
                $('.modal').hide();
                contactsArray = [];
                location.reload();
            });
        } else {
            swal({
                title: "Ops!",
                text: "Algo salió mal",
                type: "warning",
                confirmButtonText: "Aceptar"
            }, function() {
                $('.modal').hide();
                contactsArray = [];
                location.reload();
            });
        }

    }); //end post call
}