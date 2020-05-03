<?php

namespace App\Http\Controllers;

use App\Event;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use App\Http\Requests\EventRequest;
use App\Http\Controllers\Controller;

class EventController extends Controller
{
    /**
     *
     * @return jsonResponse
     */
    public function loadEvents(): JsonResponse
    {
        //in the future create a business rule to get a only specific events(NOT GET ALL)
        $events = Event::all();
        return response()->json($events);
    }

    public function storeEvent(EventRequest $request)
    {
        Event::create($request->all());
        return response()->json();
    }

    public function updateEvent(EventRequest $request)
    {
        $event = Event::where('id', $request->id)->first();

        $event->fill($request->all());

        $event->save();

        return response()->json();
    }

    public function destroyEvent(Request $request)
    {
        Event::where('id', $request->id)->delete();

        return response()->json();
    }
}
