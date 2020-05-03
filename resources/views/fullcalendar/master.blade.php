<!DOCTYPE html>
<html>
<head>
<meta charset='utf-8' />
<link href='{{asset('assets/fullcalendar/packages/core/main.css')}}' rel='stylesheet' />
<link href='{{asset('assets/fullcalendar/packages/daygrid/main.css')}}' rel='stylesheet' />
<link href='{{asset('assets/fullcalendar/packages/timegrid/main.css')}}' rel='stylesheet' />
<link href='{{asset('assets/fullcalendar/packages/list/main.css')}}' rel='stylesheet' />
<link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css">


<link href='{{asset('assets/fullcalendar/css/style.css')}}' rel='stylesheet' />

<meta name="csrf-token" content="{{ csrf_token() }}">

</head>
<body>

@include('fullcalendar.modal-calendar')
@include('fullcalendar.modal-fast-event-calendar')
  <div id='wrap'>

    <div id='external-events'>
      <h4>Draggable Events</h4>

      <div id='external-events-list'>
        @if($fastEvents)
          @foreach ($fastEvents as $fastEvent)
      <div class='fc-event' style="background-color:{{$fastEvent->color}}; border-color:{{$fastEvent->color}}; padding:1px;" data-event='{"id":"{{$fastEvent->id}}","title":"{{$fastEvent->title}}","color":"{{$fastEvent->color}}","start":"{{$fastEvent->start}}","end":"{{$fastEvent->end}}"}'>{{$fastEvent->title}}</div>
          @endforeach
        @endif
      </div>

      <p>
        <input type='checkbox' id='drop-remove' />
        <label for='drop-remove'>remove after drop</label>
      </p>
        <button class="btn btn-sm btn-success mb-2" id="newFastEvent">Create new fast event</button>
    </div>

    <div id='calendar'
  data-routeLoadEvents="{{ route('load.events') }}"
  data-routeUpdateEvent="{{ route('update.event') }}"
  data-routeStoreEvent="{{ route('store.event') }}"
  data-routeDeleteEvent="{{ route('destroy.event') }}"
  data-routeDeleteFastEvent="{{ route('destroy.fastevent') }}"
  data-routeStoreFastEvent="{{ route('store.fastevent') }}"
  data-routeUpdateFastEvent="{{ route('update.fastevent') }}"
    ></div>

    <div style='clear:both'></div>

  </div>

<script src='{{asset('assets/fullcalendar/packages/core/main.js')}}'></script>
<script src='{{asset('assets/fullcalendar/packages/interaction/main.js')}}'></script>
<script src='{{asset('assets/fullcalendar/packages/daygrid/main.js')}}'></script>
<script src='{{asset('assets/fullcalendar/packages/timegrid/main.js')}}'></script>
<script src='{{asset('assets/fullcalendar/packages/list/main.js')}}'></script>
<script src='{{asset('assets/fullcalendar/packages/core/locales-all.js')}}'></script>
<script src="https://code.jquery.com/jquery-3.4.1.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/jquery.mask/1.14.16/jquery.mask.min.js"></script>

<script src="https://cdn.jsdelivr.net/npm/popper.js@1.16.0/dist/umd/popper.min.js"></script>
<script src="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/js/bootstrap.min.js"></script>

<script src="https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.24.0/moment-with-locales.min.js"></script>
<script src='{{asset('assets/fullcalendar/js/script.js')}}'></script>
<script src='{{asset('assets/fullcalendar/js/calendar.js')}}'></script>

</body>
</html>
