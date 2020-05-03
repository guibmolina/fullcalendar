document.addEventListener('DOMContentLoaded', function() {
    var Calendar = FullCalendar.Calendar;
    var Draggable = FullCalendarInteraction.Draggable

    /* initialize the external events
    -----------------------------------------------------------------*/

    var containerEl = document.getElementById('external-events-list');
    new Draggable(containerEl, {
      itemSelector: '.fc-event',
      eventData: function(eventEl) {
        return {
          title: eventEl.innerText.trim()
        }
      }
    });

    //// the individual way to do it
    // var containerEl = document.getElementById('external-events-list');
    // var eventEls = Array.prototype.slice.call(
    //   containerEl.querySelectorAll('.fc-event')
    // );
    // eventEls.forEach(function(eventEl) {
    //   new Draggable(eventEl, {
    //     eventData: {
    //       title: eventEl.innerText.trim(),
    //     }
    //   });
    // });

    /* initialize the calendar
    -----------------------------------------------------------------*/

    var calendarEl = document.getElementById('calendar');
    var calendar = new Calendar(calendarEl, {
      plugins: [ 'interaction', 'dayGrid', 'timeGrid', 'list' ],
      header: {
        left: 'prev,next today',
        center: 'title',
        right: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek'
      },
      locale: 'pt-br',
      navLinks: true,//transform day numbers in clickable
      eventLimit: true,//put limmit of events in a day layout(4 events per day )
      selectable: true,//select more than one day in calendar
      editable: true,
      droppable: true, // this allows things to be dropped onto the calendar
      drop: function(element) {

        let Event = JSON.parse(element.draggedEl.dataset.event);
        // is the "remove after drop" checkbox checked?
        if (document.getElementById('drop-remove').checked) {
          // if so, remove the element from the "Draggable Events" list
          element.draggedEl.parentNode.removeChild(element.draggedEl);
          Event._method = 'DELETE';
          sendEvent(routeEvents('routedeletefastevent'), Event);
        }

        let start = moment(`${element.dateStr} ${Event.start}`).format("YYYY-MM-DD HH:mm:ss");
        let end = moment(`${element.dateStr} ${Event.end}`).format("YYYY-MM-DD HH:mm:ss");

        delete Event._method;
        delete Event.id;
        Event.start = start;
        Event.end = end;

        sendEvent(routeEvents('routestoreevent'), Event);
      },
      eventDrop: function(element) {
          //change element day to another day
          let start = moment(element.event.start).format("YYYY-MM-DD HH:mm:ss");
          let end = moment(element.event.end).format("YYYY-MM-DD HH:mm:ss");

          let newEvent = {
            _method:'PUT',
            title: element.event.title,
            id: element.event.id,
            start: start,
            end: end
          };
          sendEvent(routeEvents('routeupdateevent'), newEvent);
      },
      eventClick: function(element) {
        //click on event day in calendar
      clearMessage(".message");

        resetForm('#formEvent');//reset informations of form

        $("#modalCalendar").modal('show');
        $("#modalCalendar #titleModal").text('Alterar Evento');
        $("#modalCalendar button.deleteEvent").css("display", "flex");

        let id = element.event.id;
        $("#modalCalendar input[name='id']").val(id);

        let title = element.event.title;
        $("#modalCalendar input[name='title']").val(title);

        let start = moment(element.event.start).format("DD/MM/YYYY HH:mm:ss");
        $("#modalCalendar input[name='start']").val(start);

        let end = moment(element.event.end).format("DD/MM/YYYY HH:mm:ss");
        $("#modalCalendar input[name='end']").val(end);

        let color = element.event.backgroundColor;
        $("#modalCalendar input[name='color']").val(color);

        let description = element.event.extendedProps.description;
        $("#modalCalendar textarea[name='description']").val(description);

    },
    eventResize: function(element) {
        //resize event to more days in calenndar
        let start = moment(element.event.start).format("YYYY-MM-DD HH:mm:ss");
        let end = moment(element.event.end).format("YYYY-MM-DD HH:mm:ss");

        let newEvent = {
          _method:'PUT',
          title: element.event.title,
          id: element.event.id,
          start: start,
          end: end
        };
        sendEvent(routeEvents('routeupdateevent'), newEvent);
    },
    select: function(element) {
        //click on day
        clearMessage(".message");
        resetForm('#formEvent');

        $("#modalCalendar").modal('show');
        $("#modalCalendar #titleModal").text('Inserir Novo Evento');
        $("#modalCalendar button.deleteEvent").css("display", "none");

        let start = moment(element.start).format("DD/MM/YYYY HH:mm:ss");
        $("#modalCalendar input[name='start']").val(start);

        let end = moment(element.end).format("DD/MM/YYYY HH:mm:ss");
        $("#modalCalendar input[name='end']").val(end);

        let color = '#0040ff' ;
        $("#modalCalendar input[name='color']").val(color);

        calendar.unselect();

    },
   events:routeEvents('routeloadevents'), //render events with ajax population get a json with events
    });
    calendar.render();

  });
