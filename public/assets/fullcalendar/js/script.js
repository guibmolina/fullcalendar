$(function () {

    $('.date-time').mask('00/00/0000 00:00:00');
    $('.time').mask('00:00:00');

    $.ajaxSetup({
        headers: {
            'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
        }
    });

    $('.fc-event').click(function () {
        clearMessage('.message');
        resetForm('#formFastEvent');

        let Event = JSON.parse($(this).attr('data-event'));

        $('#modalFastEvent').modal('show');
        $("#modalFastEvent #titleModal").text('Update Fast Event');
        $("#modalFastEvent button.deleteFastEvent").css("display","flex");

        $("#modalFastEvent input[name = 'id']").val(Event.id);
        $("#modalFastEvent input[name = 'title']").val(Event.title);
        $("#modalFastEvent input[name = 'start']").val(Event.start);
        $("#modalFastEvent input[name = 'end']").val(Event.end);
        $("#modalFastEvent input[name = 'color']").val(Event.color);
    });

    $("#newFastEvent").click(function () {
        clearMessage('.message');
       resetForm('#formFastEvent');

        $('#modalFastEvent').modal('show');
        $("#modalFastEvent #titleModal").text('Create new');
        $("#modalFastEvent button.deleteFastEvent").css("display","none");
    });

    $('.saveFastEvent').click(function () {
        let id = $("#modalFastEvent input[name = 'id']").val();
        let title = $("#modalFastEvent input[name = 'title']").val();
        let start = $("#modalFastEvent input[name = 'start']").val();
        let end = $("#modalFastEvent input[name = 'end']").val();
        let color = $("#modalFastEvent input[name = 'color']").val();

        let Event = {
            title: title,
            start: start,
            end: end,
            color: color,
        };
        if (id === '') {
            route = routeEvents('routestorefastevent');
        } else {
            route = routeEvents('routeupdatefastevent');
            Event.id = id; //create more propriety on object
            Event._method = 'PUT';
        }
        sendEvent(route, Event);
    });


    $('.deleteFastEvent').click(function () {
        let id = $("#modalFastEvent input[name='id']").val();
        let Event = {
            id: id,
            _method: 'DELETE',
        }
        route = routeEvents('routedeletefastevent');
        sendEvent(route, Event);
    });

    $('.deleteEvent').click(function () {
        let id = $("#modalCalendar input[name='id']").val();
        let Event = {
            id: id,
            _method: 'DELETE',
        }
        route = routeEvents('routedeleteevent');
        sendEvent(route, Event);
    });

    $('.saveEvent').click(function () {
        let id = $("#modalCalendar input[name='id']").val();

        let title = $("#modalCalendar input[name='title']").val();

        let start = moment($("#modalCalendar input[name='start']").val(), "DD/MM/YYYY HH:mm:ss").format("YYYY-MM-DD HH:mm:ss");

        let end = moment($("#modalCalendar input[name='end']").val(), "DD/MM/YYYY HH:mm:ss").format("YYYY-MM-DD HH:mm:ss");

        let color = $("#modalCalendar input[name='color']").val();

        let description = $("#modalCalendar textarea[name='description']").val();

        let Event = {
            title: title,
            start: start,
            end: end,
            color: color,
            description: description,
        };
        if (id === '') {
            route = routeEvents('routestoreevent');
        } else {
            route = routeEvents('routeupdateevent');
            Event.id = id; //create more propriety on object
            Event._method = 'PUT';
        }
        sendEvent(route, Event);
    });

});

function sendEvent(route, data_) {

    $.ajax({
        url: route,
        data: data_,
        method: 'POST',
        dataType: 'json',
        success: function (json) {
            if (json) {
                location.reload();
            }
        },
        error: function (json) {
            let responseJSON = json.responseJSON.errors;
            $('.message').html(loadErrors(responseJSON));
        }
    })
}

function loadErrors(response) {
    console.log(response);
    let boxAlert = `<div class="alert alert-danger">`;
    for (let fields in response) {
        boxAlert += `<span>${response[fields]}</span><br/>`;
    }
    boxAlert += `</div>`;

    return boxAlert.replace(/\,/g, "<br/>");
}

function clearMessage(element) {
    $(element).text("");
}

function routeEvents(route) {
    //return value in data-routeLoadEvent in  div calendar on master.blade (route)
    return document.getElementById('calendar').dataset[route]
}

function resetForm(form) {
    $(form)[0].reset();
}
