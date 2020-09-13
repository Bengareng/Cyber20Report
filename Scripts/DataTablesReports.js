


var reports = [];

//Init();

function Init() {
    setTimeout(function () {
        GetReporters(1, 500);
    }, 2000);
}


var dataTableObject = {
    //ajax: {
    //    url: window.location.href + "/Home/GetAllCyberReports",
    //    dataSrc: '',
    //    data: function (res, callback, settings) {
    //        return JSON.stringify(res);
    //    },
    //    complete: function (json, type) {
    //        if (type == "success") {
    //            reports = json.responseJSON;
    //        }
    //    },
    //    error: function (xhr, jqAjaxError, thrown) {
    //        console.log(thrown);
    //    }
    //},
    //serverSide: true,
    //data: reports,
    processing: true,
    pagingType: "full_numbers",
    responsive: false,
    columns: [
        { "data": "ApplicationName", name: 'ApplicationName', title: 'Application Executable' },
        { "data": "DisplayName", name: 'DisplayName', title: 'Display Name' },
        { "data": "ApplicationVersion", name: 'ApplicationVersion', title: 'Application Version' },
        { "data": "Status", name: 'Status', title: 'Status' },
        { "data": "NumOfEnginesDetected", name: 'NumOfEnginesDetected', title: 'Positives' },
        { "data": "ComputerName", name: 'ComputerName', title: "Computer's Name" },
        { "data": "ClientGroup", name: 'ClientGroup', title: "Group" },
        {
            "data": "RequestTime", name: 'RequestTime' , title: 'Discovery date'
        },
        { "data": "ApplicationMD5", name: 'ApplicationMD5', title: 'MD5' },
        { "data": "ScanLinks", name: 'ScanLinks', title: 'Link' }
    ],
    order: [[0, 'asc']],
    scrollY: "70%",
    scrollX: true,
    ordering: true,
    scrollCollapse: true,
    dom: 'Bfrtip',
    buttons: [
        {
            extend: 'excelHtml5',
            title: 'Data export',
            filename: function () {
                var date = new Date();
                return 'Cyber20 Report -' + ($('#ageFltr').find(":selected").val() != "" ? $('#ageFltr').find(":selected").text() : moment(moment.now()).format("DD/MM/YYYY"));
            }
        },
        {
            extend: 'csvHtml5',
            title: 'Data export'
        },
        {
            extend: 'copyHtml5',
            title: 'Data export'
        },
        {
            extend: 'print',
            title: 'Print'
        }



    ],
    columnDefs: [
        { width: 200, targets: 0 }
    ],
    fixedColumns: true,
    initComplete: function () {
        this.api().columns([6]).every(function () {
            var column = this;
            var select = $("#ageFltr");
            select.append("<option value=''>Select Group</option>");
            column.data().unique().sort().each(function (d, j) {
                select.append('<option value="' + d + '">' + d + '</option>')
            });
        });
    }
}


var table = $('#example').DataTable(dataTableObject);

$(function () {
    $('#ageFltr').on('change', function () {
        var search = [];

        $.each($('#ageFltr option:selected'), function () {
            search.push($(this).val());
        });

        search = search.join('|');
        table.column(6).search(search, true, false).draw();
    });


    $('.msg-box button').click(function () {
        $('.msg-box').hide(true);
        $('.table-example').show(true);
    });


});

reports = table.rows().data();


$('input[name="datetimes"]').daterangepicker({
    autoUpdateInput: false,
    maxDate: new Date(),
    locale: {
        cancelLabel: 'Clear'
    }
});


$('input[name="datetimes"]').on('apply.daterangepicker', function (ev, picker) {

    var min = moment(picker.startDate).toDate();
    var max = moment(picker.endDate).toDate();
    var data = [];
    for (var i = 0; i < reports.length; i++) {
        var val = moment(reports[i].RequestTime).toDate();

        if (min <= val && max >= val) {
            data.push(reports[i]);
        }
    }
    table.clear().rows.add(data).draw();



    $(this).val(picker.startDate.format('MM/DD/YYYY') + ' - ' + picker.endDate.format('MM/DD/YYYY'));
});

$('input[name="datetimes"]').on('cancel.daterangepicker', function (ev, picker) {
    $(this).val('');
    table.clear().rows.add(reports).draw();
});


function GetReporters(index, totalrow) {
    $.ajax({
        url: window.location.href + "/Home/GetAllCyberReports",
        type: 'GET',
        cache: false,
        dataType: 'json', // added data type
        success: function (res) {
            for (var i = 0; i < res.length; i++) {

            }
            reports = res;
        },
        data: { index: index, totalrow: totalrow },
        error: function (xhr, ajaxOptions, thrownError) {
            var msg = '';
            if (jqXHR.status === 0) {
                msg = 'Not connect.\n Verify Network.';
            } else if (jqXHR.status == 404) {
                msg = 'Requested page not found. [404]';
            } else if (jqXHR.status == 500) {
                msg = 'Internal Server Error [500].';
            } else if (exception === 'parsererror') {
                msg = 'Requested JSON parse failed.';
            } else if (exception === 'timeout') {
                msg = 'Time out error.';
            } else if (exception === 'abort') {
                msg = 'Ajax request aborted.';
            } else {
                msg = 'Uncaught Error.\n' + jqXHR.responseText;
            }
            console.log(msg);
        }
    });

}